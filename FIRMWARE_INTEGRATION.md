# Topology GUI - Firmware Integration Guide

This document describes the data contracts, OpenWrt/SmartOS data sources, and JUCI framework integration needed to move the Topology GUI from mock data to live router data.

The UI mockup uses hardcoded mock data in `app.js`. This guide maps each mock field to the real data source on the router and describes what firmware engineers need to implement.

---

## 1. Data Source Overview

The Topology GUI consumes a single JSON blob (`topology.json`) that SmartOS already produces via ubus. This blob contains the full mesh tree: gateway, satellites, and clients with WiFi stats, QoE scores, and usage counters.

### Primary Data Source

- **topology daemon**: `ubus call topology dump` - returns the full mesh state
- **Poll interval**: Every 30 seconds (configurable)
- The parser function `parseTopologyJson(raw)` in `app.js` transforms the raw SmartOS JSON into the UI's internal data model

### Current topology.json Structure (top level)

```json
{
  "Uplink": "wan",
  "MFG_MODEL": "SDG-8733v",
  "MFG_MAC": "38:F8:F6:75:94:C0",
  "MFG_SERIAL": "8733vA02400000016",
  "SAT-count": 4,
  "Role": "HUB",
  "Qoe": { "Score": 96, "WanScore": 100, ... },
  "Hosts": [ ... ]
}
```

---

## 2. Host Object Schema (topology.json Hosts array)

Each device (gateway, satellite, or client) appears as a Host entry. The `Role` field determines how the UI treats it.

### Role Types

| Role | UI Treatment |
|------|-------------|
| `HUB` | Gateway device (root of the tree) |
| `SAT` | Satellite/mesh node (intermediate node) |
| `Client` | End-user device (leaf node) |

### Common Host Fields

```json
{
  "MAC": "string - device MAC address (primary key)",
  "Hostname": "string - user-visible name",
  "Role": "'HUB' | 'SAT' | 'Client'",
  "State": "'Active' | 'Inactive'",
  "StatusColor": "'green' | 'orange' | 'red'",
  "Address": "string - primary IP",
  "UpHost": "string - MAC of parent device (empty for HUB)",
  "Hops": "integer - hop count from gateway",
  "WifiHops": "integer - wireless hop count",
  "OUI": "string - manufacturer name from OUI database",
  "Duplex": "integer - ethernet link speed in Mbps (0 if wireless)",
  "Interface": "string - interface name this device connects through on its parent",
  "Hosts": [{ "Address": "string", "State": "string", "SecondsAgo": "integer" }],
  "Subordinates": [{ "Interface": "string", "MAC": "string" }],
  "Usage": {
    "Fifteen": { "RxBytes": "integer", "TxBytes": "integer", "TotalBytes": "integer" },
    "Hour": { ... },
    "Day": { ... },
    "Week": { ... }
  },
  "fingerprint": {
    "class": "string - device class (phone, laptop, tv, speaker, etc.)",
    "vendor": "string - device manufacturer",
    "model": "string - device model"
  }
}
```

### WiFi-Specific Fields (present when device connects wirelessly)

```json
{
  "WiFi": {
    "Band": "string - '2.4GHz' | '5GHz' | '6GHz'",
    "Channel": "integer",
    "PrimaryChannel": "integer",
    "SecondaryChannel": "integer",
    "Width": "string - '20Mhz' | '40Mhz' | '80Mhz' | '160Mhz' | '320Mhz'",
    "Signal": "integer - RSSI in dBm (e.g., -48)",
    "Noise": "integer - noise floor in dBm (e.g., -92)",
    "SNR": "integer - signal-to-noise ratio in dB",
    "WirelessType": "string - '802.11n' | '802.11ac' | '802.11ax' | '802.11be'",
    "TxPhyRateMbps": "integer - TX PHY rate",
    "RxPhyRateMbps": "integer - RX PHY rate",
    "TxMCS": "string - MCS index (e.g., 'HE-MCS9')",
    "RxMCS": "string",
    "TxNSS": "integer - spatial streams",
    "RxNSS": "integer",
    "SSID": "string",
    "Capabilities": {
      "Mode": "string - 'he' | 'eht' | 'vht' | 'ht'",
      "Streams": "integer",
      "BtmCapable": "string - '802.11v' support",
      "IotDevice": "string"
    },
    "Qoe": {
      "Score": "integer - overall QoE (0-100)",
      "SnrScore": "integer",
      "SnrAvg": "string - average SNR",
      "PhyRateScore": "integer",
      "PhyRateAvg": "string - average PHY rate",
      "PhyRateUnit": "string - 'Mbps'",
      "StabilityScore": "integer"
    },
    "Steering": {
      "State": "string - band steering state",
      "LastRoamTrigger": "string",
      "BtmAttempts": "string",
      "BandSteerEligible": "string"
    }
  }
}
```

---

## 3. Subordinates and Interface Mapping

The `Subordinates` array on HUB and SAT nodes lists which devices connect through which interface. This is how the UI determines:
- Which LAN port an ethernet client uses
- Which radio interface a wireless client or satellite is on

### Example (Gateway Subordinates)

```json
"Subordinates": [
  { "Interface": "w6gM.sta3", "MAC": "38:F8:F6:75:2A:30" },
  { "Interface": "wifi5g", "MAC": "BE:5C:75:E5:B1:D6" }
]
```

### Interface Name Conventions

| Interface Pattern | Meaning |
|------------------|---------|
| `w6gM.sta*` | 6 GHz mesh backhaul |
| `wifi5g` | 5 GHz radio |
| `wifi2g` | 2.4 GHz radio |
| `wifi6g` | 6 GHz radio (client-facing) |
| `eth0`, `eth1`, etc. | Ethernet LAN ports |
| `lan1`, `lan2`, etc. | Named LAN ports |

### LAN Port Derivation

For ethernet clients, the UI derives the LAN port from the Subordinates interface mapping:

```javascript
// Current parser logic
const parentHost = hosts.find(h => h.MAC === c.UpHost) || hub;
if (parentHost?.Subordinates) {
    const sub = parentHost.Subordinates.find(s => s.MAC === c.MAC);
    if (sub?.Interface) {
        client.lanPort = sub.Interface.toUpperCase().replace(/^ETH/, 'LAN');
    }
}
```

**Firmware requirement**: Ethernet clients MUST appear in the parent's `Subordinates` array with their interface name (e.g., `eth0`, `lan1`). Without this, the UI cannot display which LAN port the client is on.

---

## 4. Multi-WAN Support

The UI supports dual-WAN configurations (failover and load-balance). SmartOS currently reports only the primary WAN via the top-level `Uplink` field.

### Current State

- `raw.Uplink`: `"wan"` - indicates primary WAN is ethernet
- No secondary WAN fields exist in topology.json yet

### Proposed Schema Extension

Add these fields to the top-level topology.json:

```json
{
  "WAN": {
    "primary": {
      "type": "ethernet",
      "interface": "wan",
      "speed": "10GbE",
      "status": "online",
      "ip": "72.168.14.201",
      "isp": "Frontier FiOS",
      "latency": 4,
      "uptime": "34d 7h 22m"
    },
    "secondary": {
      "type": "usb-wwan",
      "interface": "wwan0",
      "speed": "4G LTE",
      "status": "online",
      "ip": "100.24.67.88",
      "isp": "AT&T Wireless",
      "latency": 38,
      "uptime": "2h 14m"
    },
    "mode": "failover",
    "activeWan": "secondary"
  }
}
```

### WAN Mode Values

| Mode | Behavior | UI Display |
|------|----------|------------|
| `failover` | Secondary activates when primary goes down | "WAN FAILOVER ACTIVE" badge when secondary is active |
| `load-balance` | Traffic distributed across both WANs | Both connections shown as active (green) |
| `single` | Only primary WAN (default, current behavior) | Single internet cloud |

### WAN Type Values

| Type | Description | UI Label |
|------|-------------|----------|
| `ethernet` | Standard WAN port (RJ45) | "10GbE WAN", "2.5GbE WAN", "GbE WAN" |
| `usb-wwan` | USB cellular modem | "4G LTE", "5G NR" |
| `sfp` | SFP/SFP+ fiber module | "10GbE SFP+" |

### OpenWrt Data Sources for WAN Status

```bash
# Primary WAN status
ubus call network.interface.wan status
# Returns: { "up": true, "l3_device": "eth0", "ipv4-address": [...] }

# Secondary WAN (if configured)
ubus call network.interface.wan2 status

# USB modem status (via ModemManager or QMI)
ubus call modem info
# Or: mmcli -m 0 --output-json

# Failover/load-balance mode (mwan3)
ubus call mwan3 status
# Returns active interface, mode, and policy
```

---

## 5. Device Detail Fields

The UI detail panel (right-side slide-out) shows extended device information. Some fields are already in topology.json; others need to be added.

### Gateway Detail

| UI Field | Source | Current Status |
|----------|--------|---------------|
| Model name | `raw.MFG_MODEL` | Available |
| MAC address | `hub.MAC` | Available |
| IP address | `hub.Hosts[0].Address` | Available |
| Firmware version | Not in topology.json | **Needs addition** |
| CPU usage (%) | Not in topology.json | **Needs addition** |
| Memory usage (%) | Not in topology.json | **Needs addition** |
| Temperature (C) | Not in topology.json | **Needs addition** |
| Uptime | Not in topology.json | **Needs addition** |
| LAN interfaces | Not in topology.json | **Needs addition** |
| WiFi radios | Partial (via Subordinates) | **Needs expansion** |
| Throughput (Mbps) | Derivable from Usage | Available |

### Proposed System Stats Extension

```json
{
  "System": {
    "Firmware": "SmartOS 4.2.1",
    "Uptime": "34d 7h 22m",
    "UptimeSeconds": 2964120,
    "CPU": 12,
    "Memory": 38,
    "Temperature": 52,
    "Interfaces": [
      { "Name": "WAN", "Speed": "10 Gbps", "Status": "active", "Rx": 247.3, "Tx": 84.1 },
      { "Name": "LAN1", "Speed": "1 Gbps", "Status": "active", "Rx": 52.1, "Tx": 28.4 },
      { "Name": "LAN2", "Speed": "1 Gbps", "Status": "active", "Rx": 14.2, "Tx": 6.8 },
      { "Name": "LAN3", "Speed": "1 Gbps", "Status": "inactive" },
      { "Name": "LAN4", "Speed": "1 Gbps", "Status": "inactive" }
    ],
    "Radios": [
      { "Band": "2.4 GHz", "Channel": 6, "Clients": 3, "Utilization": 24, "Streams": "4x4" },
      { "Band": "5 GHz", "Channel": 149, "Clients": 8, "Utilization": 41, "Streams": "4x4" },
      { "Band": "6 GHz", "Channel": 5, "Clients": 4, "Utilization": 18, "Streams": "4x5", "ChannelWidth": "320 MHz" }
    ]
  }
}
```

### OpenWrt Commands for System Stats

```bash
# CPU usage
top -bn1 | head -3
# Or: cat /proc/stat

# Memory
free | grep Mem

# Temperature
cat /sys/class/thermal/thermal_zone0/temp
# Returns millidegrees (e.g., 52000 = 52C)

# Uptime
cat /proc/uptime

# Interface stats
ip -s link show eth0
# Or: cat /sys/class/net/eth0/statistics/rx_bytes

# WiFi radio info per band
iwinfo wlan0 info    # 2.4 GHz
iwinfo wlan1 info    # 5 GHz
iwinfo wlan2 info    # 6 GHz

# Radio channel utilization
iwinfo wlan0 survey
```

---

## 6. Satellite Backhaul Fields

Satellite backhaul info is critical for the topology visualization. Most fields are already present in topology.json via the `WiFi` object.

### Field Mapping

| UI Field | topology.json Source | Status |
|----------|---------------------|--------|
| Backhaul speed | `WiFi.TxPhyRateMbps` | Available |
| RSSI | `WiFi.Signal` | Available |
| SNR | `WiFi.SNR` or `WiFi.Noise` + `WiFi.Signal` | Available |
| Channel | `WiFi.Channel` | Available |
| Channel width | `WiFi.Width` | Available |
| WiFi version | `WiFi.WirelessType` + `WiFi.Capabilities.Mode` | Available |
| Band | `WiFi.Band` | Available |
| Spatial streams | `WiFi.TxNSS` / `WiFi.RxNSS` | Available |
| QoE score | `WiFi.Qoe.Score` | Available |
| Connection type (wired/wireless) | `Duplex > 0` = wired | Available |

### WiFi Version Mapping

The UI displays a simplified WiFi version from the `Capabilities.Mode` field:

| Mode | WirelessType | UI Display |
|------|-------------|------------|
| `eht` | `802.11be` | Wi-Fi 7 |
| `he` | `802.11ax` | Wi-Fi 6/6E |
| `vht` | `802.11ac` | Wi-Fi 5 |
| `ht` | `802.11n` | Wi-Fi 4 |

---

## 7. Client Connection Context

### WiFi Clients

WiFi client data comes from the Host's `WiFi` object, same structure as satellites.

Key fields used by the UI:
- `WiFi.Band` - determines which band group the pill appears in
- `WiFi.Signal` - RSSI shown in tooltip and used for signal indicator color
- `WiFi.TxPhyRateMbps` / `WiFi.RxPhyRateMbps` - link speed in tooltip
- `WiFi.Qoe` - QoE breakdown shown in detail panel
- `WiFi.Capabilities.Mode` - determines WiFi generation badge (Wi-Fi 4/5/6/7)

### Ethernet Clients

Ethernet clients have `WiFi` absent (or empty) and use:
- `Duplex` - link speed (100, 1000, 2500, 10000 Mbps)
- Parent's `Subordinates[].Interface` - which LAN port

**Current gap**: Ethernet clients in the sample topology.json show `Duplex: 0` and no interface mapping in Subordinates. For proper LAN port display, the firmware needs to:

1. Set `Duplex` to the actual negotiated link speed (e.g., 1000 for gigabit)
2. Include ethernet clients in the parent's `Subordinates` array with the physical port name

---

## 8. Fingerprint / Device Classification

The `fingerprint` object on each Host determines the device icon in the UI.

### Supported Device Classes

| fingerprint.class | UI Icon | Example Devices |
|------------------|---------|-----------------|
| `phone`, `smartphone` | Mobile phone | iPhone, Pixel, Galaxy |
| `laptop`, `notebook` | Laptop | MacBook, ThinkPad |
| `desktop`, `computer` | Desktop tower | Gaming PC, iMac |
| `tablet` | Tablet | iPad, Galaxy Tab |
| `tv`, `television` | TV | LG OLED, Samsung Frame |
| `speaker` | Speaker | HomePod, Sonos |
| `camera` | Security camera | Ring, Nest Cam |
| `printer` | Printer | HP LaserJet |
| `streaming` | Streaming device | Roku, Chromecast, Fire Stick |
| `console`, `game-console` | Game console | PS5, Xbox, Switch |
| `server` | Server/NAS | Synology, QNAP |
| `access-point` | (skipped) | APs listed as clients are filtered out |
| `iot` (or unclassified) | Generic IoT chip | Smart plugs, sensors |

### Fingerprint Sources

```bash
# SmartOS device fingerprinting (built-in)
# Combines DHCP fingerprint, OUI lookup, HTTP user-agent, and mDNS

# Manual check
ubus call fingerprint lookup '{"mac": "4C:CC:6A:12:34:56"}'
```

If `fingerprint.class` is empty or absent, the UI defaults to `iot` (generic chip icon).

---

## 9. QoE (Quality of Experience) Scores

SmartOS computes QoE scores for both mesh links and client connections. The UI uses these for:
- Status color indicators (green/orange/red) on satellite backhaul bars
- QoE breakdown in the detail panel

### QoE Score Ranges

| Score | StatusColor | Meaning |
|-------|------------|---------|
| 80-100 | green | Good - no issues |
| 50-79 | orange | Warning - degraded performance |
| 0-49 | red | Critical - poor connection |

### QoE Subscores

| Field | What It Measures |
|-------|-----------------|
| `SnrScore` | Signal-to-noise ratio quality |
| `PhyRateScore` | PHY rate relative to capability |
| `StabilityScore` | Connection stability over time |

---

## 10. JUCI Framework Integration

The Topology GUI is designed as a standalone single-page app that can be embedded into the JUCI web management framework.

### File Placement

```
/www/juci/           (JUCI root)
  plugins/
    topology/
      index.html     (entry point)
      app.js         (application logic)
      styles.css     (styling)
```

### Data Fetching (Replace Mock Data)

Replace the hardcoded `TOPOLOGY` object with a live ubus call:

```javascript
// Current (mock)
const TOPOLOGY = { wans: [...], gateway: {...}, satellites: [...], clients: [...] };

// Production (live data)
async function fetchTopology() {
    const response = await fetch('/ubus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'call',
            params: [sessionId, 'topology', 'dump', {}]
        })
    });
    const data = await response.json();
    const raw = data.result[1];
    return parseTopologyJson(raw);
}

// Poll loop
setInterval(async () => {
    const topology = await fetchTopology();
    updateUI(topology);
}, 30000);
```

### JUCI Session Authentication

JUCI uses session tokens for ubus RPC authentication:

```javascript
// Get session ID from JUCI's auth system
const sessionId = JUCI.session.sid;

// All ubus calls include the session token
params: [sessionId, 'topology', 'dump', {}]
```

### JUCI Menu Registration

Add the topology page to JUCI's navigation:

```json
// /usr/lib/juci/menu.d/50-topology.json
{
  "menu": {
    "status": {
      "topology": {
        "title": "Network Topology",
        "icon": "share-network",
        "page": "status-topology"
      }
    }
  }
}
```

---

## 11. Polling and Performance

### Recommended Poll Intervals

| Data Type | Interval | Reason |
|-----------|----------|--------|
| Full topology | 30 seconds | Balanced between freshness and CPU load |
| Client list changes | 30 seconds | Clients join/leave infrequently |
| Throughput counters | 15 seconds | For sparkline-style activity indicators |
| QoE scores | 60 seconds | QoE is averaged over time, no need for frequent updates |

### Performance Budget

| Resource | Budget | Notes |
|----------|--------|-------|
| DOM elements | ~500-800 | 5 device cards + 71 client pills + SVG lines + tooltips |
| CSS animations | Minimal | Flow line animations use CSS only, low CPU |
| Memory | < 10 MB | Includes all DOM, SVG paths, and JS state |
| ubus call | < 200ms | topology dump is a single JSON blob, not paginated |

### Large Network Considerations

For networks with 100+ clients:
- The UI already groups clients by band, keeping visual density manageable
- Client pills use text truncation for long hostnames
- Consider paginating the client list if > 200 devices
- The SVG layer uses simple straight lines (no force-directed layout), so rendering scales linearly

---

## 12. Fields NOT in topology.json (Need Firmware Work)

These fields are used in the mock UI but have no current source in topology.json:

| Field | Where Used | Suggested Source |
|-------|-----------|-----------------|
| Firmware version | Device detail panel | `ubus call system board` or `/etc/openwrt_release` |
| CPU usage % | Device detail panel | `/proc/stat` or `ubus call system info` |
| Memory usage % | Device detail panel | `ubus call system info` |
| Temperature | Device detail panel | `/sys/class/thermal/thermal_zone0/temp` |
| Device uptime | Device detail panel | `/proc/uptime` per device |
| LAN interface list | Device detail panel | `ip link show` or `ubus call network.device status` |
| LAN port speed | Detail panel, tooltip | `ethtool eth0` or `/sys/class/net/ethX/speed` |
| WAN ISP name | Internet cloud label | Reverse DNS or GeoIP on WAN IP |
| WAN speed test | Internet cloud stats | `ubus call speedtest run` (if available) |
| Multi-WAN config | Dual internet clouds | `ubus call mwan3 status` |
| Client connected-since | Tooltip, detail panel | DHCP lease time or conntrack first-seen |

---

## 13. Feature Flags

Each UI feature can be toggled. Suggested UCI config:

```
config topology 'settings'
    option enabled '1'
    option poll_interval '30'
    option multi_wan '1'
    option qoe_overlay '1'
    option client_fingerprint '1'
    option detail_panel '1'
    option animations '1'
```

If a feature is disabled, the corresponding API fields can be omitted and the UI will gracefully hide the related elements.

---

## 14. Frontend-Only Features (No Firmware Work Needed)

These capabilities are fully client-side and require no backend changes:

| Feature | Description |
|---------|-------------|
| Layout engine | Custom measure-first positioning algorithm, no external libraries |
| SVG connection lines | Straight lines with flow animations, drawn from measured card positions |
| Client band grouping | Clients sorted into 2.4/5/6 GHz and Ethernet columns |
| QoE color coding | Green/orange/red derived from StatusColor field already in topology.json |
| Backhaul quality bars | SNR and speed indicators rendered from existing WiFi fields |
| Detail panel | Slide-out panel with device stats, triggered by click |
| Tooltips | Mouseover client pills for quick info |
| Dark/light theme | CSS custom properties, no backend involvement |
| Connection integrity checker | Debug tool (verifyConnections) validates SVG line placement |
| Multi-WAN visualization | Dual clouds, failover badge, status colors - all client-side rendering |

---

## 15. Quick Start for Development

1. **Verify topology daemon is running:**
   ```bash
   ubus call topology dump | head -20
   # Should return the full mesh JSON with Hosts array
   ```

2. **Check that client fingerprinting is active:**
   ```bash
   ubus call topology dump | jsonfilter -e '@.Hosts[*].fingerprint.class' | sort -u
   # Should show device classes like: phone, laptop, tv, etc.
   ```

3. **Verify Subordinates are populated:**
   ```bash
   ubus call topology dump | jsonfilter -e '@.Hosts[@.Role="HUB"].Subordinates'
   # Should show interface-to-MAC mappings for all directly connected devices
   ```

4. **Start with the UI integration:**
   - Replace the `TOPOLOGY` mock object with a `fetchTopology()` function
   - The `parseTopologyJson()` function handles the transformation
   - Hook into JUCI's session auth for ubus RPC calls

5. **Add system stats second:**
   - Extend topology.json with CPU, memory, temperature, uptime
   - These populate the detail panel but are not required for the main topology view

6. **Multi-WAN last:**
   - Add WAN status object to topology.json
   - Integrate with mwan3 for failover/load-balance state
   - The UI parser already checks for `raw.SecondaryWAN`, `raw.WAN2`, and `hub.WWAN` fields
