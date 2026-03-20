/* ============================================
   Intellifi Topology – Application
   ============================================ */

// ── Mock Data ──────────────────────────────────────
const TOPOLOGY = {
    wans: [
        {
            id: 'wan1',
            type: 'internet',
            name: 'Internet',
            ip: 'WAN',
            wanIp: '72.168.14.201',
            isp: 'Frontier FiOS',
            downloadSpeed: 940,
            uploadSpeed: 880,
            latency: 4,
            status: 'offline',
            uptime: '34d 7h 22m',
            wanType: '10GbE WAN',
            wanMode: 'failover',
            role: 'primary',
        },
        {
            id: 'wan2',
            type: 'internet',
            name: 'Internet',
            ip: 'WAN',
            wanIp: '100.24.67.88',
            isp: 'AT&T Wireless',
            downloadSpeed: 75,
            uploadSpeed: 25,
            latency: 38,
            status: 'online',
            uptime: '2h 14m',
            wanType: '4G LTE',
            wanMode: 'failover',
            role: 'secondary',
            interface: 'USB',
        },
    ],
    gateway: {
        id: 'gateway',
        type: 'gateway',
        name: 'LAUNDRY_8733',
        model: 'SDG-8733',
        modelDesc: 'Gateway',
        mac: 'A8:13:74:8D:87:33',
        ip: '192.168.0.1',
        firmware: 'SmartOS 4.2.1',
        cpu: 12,
        memory: 38,
        temperature: 52,
        uptime: '34d 7h 22m',
        status: 'online',
        clients: 0, // computed
        throughput: { down: 247.3, up: 84.1 }, // Mbps
        interfaces: [
            { name: 'WAN', speed: '1 Gbps', status: 'active', utilization: 33, rx: 247.3, tx: 84.1 },
            { name: 'LAN1', speed: '1 Gbps', status: 'active', utilization: 18, rx: 52.1, tx: 28.4 },
            { name: 'LAN2', speed: '1 Gbps', status: 'active', utilization: 8, rx: 14.2, tx: 6.8 },
            { name: 'LAN3', speed: '1 Gbps', status: 'inactive', utilization: 0, rx: 0, tx: 0 },
            { name: 'LAN4', speed: '1 Gbps', status: 'inactive', utilization: 0, rx: 0, tx: 0 },
        ],
        wifiRadios: [
            { band: '2.4 GHz', channel: 6, clients: 3, utilization: 24, streams: '4x4' },
            { band: '5 GHz', channel: 149, clients: 8, utilization: 41, streams: '4x4' },
            { band: '6 GHz', channel: 5, clients: 4, utilization: 18, streams: '4x5', channelWidth: '320 MHz' },
        ],
    },
    satellites: [
        // Hop 1: Kitchen ← gateway (Wi-Fi 7 6 GHz mesh, 320MHz, SNR 19 = orange/warning)
        {
            id: 'sat-kitchen',
            type: 'satellite',
            name: 'KITCHEN_AP',
            model: 'SDG-8733A',
            modelDesc: 'Satellite',
            mac: 'A8:13:74:9A:12:05',
            ip: '192.168.0.2',
            firmware: 'SmartOS 4.2.1',
            parentId: 'gateway',
            hops: 1,
            connectionType: 'wireless',
            backhaulBand: '6 GHz',
            backhaul: { speed: '5765 Mbps', utilization: 38, rssi: -58, snr: 19, channel: 37, wifiVersion: '7', channelWidth: '320 MHz' },
            statusColor: 'orange',
            uptime: '34d 7h 18m',
            status: 'online',
            cpu: 14,
            memory: 42,
            temperature: 52,
            throughput: { down: 142.8, up: 51.3 },
            wifiRadios: [
                { band: '2.4 GHz', channel: 1, clients: 2, utilization: 18, streams: '2x2' },
                { band: '5 GHz', channel: 36, clients: 4, utilization: 31, streams: '3x3' },
                { band: '6 GHz', channel: 37, clients: 3, utilization: 16, streams: '3x3', channelWidth: '320 MHz' },
            ],
        },
        // Hop 2: Dining ← kitchen (6 GHz mesh, SNR 43 = green)
        {
            id: 'sat-dining',
            type: 'satellite',
            name: 'DINING_AP',
            model: 'SDG-8632',
            modelDesc: 'Satellite',
            mac: 'A8:13:74:B2:45:9C',
            ip: '192.168.0.3',
            firmware: 'SmartOS 4.2.1',
            parentId: 'sat-kitchen',
            hops: 2,
            connectionType: 'wireless',
            backhaulBand: '6 GHz',
            backhaul: { speed: '2402 Mbps', utilization: 14, rssi: -38, snr: 43, channel: 37, wifiVersion: '6E' },
            statusColor: 'green',
            uptime: '34d 7h 15m',
            status: 'online',
            cpu: 6,
            memory: 28,
            temperature: 44,
            throughput: { down: 46.4, up: 12.1 },
            wifiRadios: [
                { band: '2.4 GHz', channel: 11, clients: 1, utilization: 8 },
                { band: '5 GHz', channel: 48, clients: 3, utilization: 22 },
                { band: '6 GHz', channel: 5, clients: 2, utilization: 10 },
            ],
        },
        // Hop 1: Living Room ← gateway (10GbE ethernet backhaul)
        {
            id: 'sat-living',
            type: 'satellite',
            name: 'LIVING_ROOM_AP',
            model: 'SDG-8733A',
            modelDesc: 'Satellite',
            mac: 'A8:13:74:C1:33:77',
            ip: '192.168.0.5',
            firmware: 'SmartOS 4.2.1',
            parentId: 'gateway',
            hops: 1,
            connectionType: 'ethernet',
            backhaul: { speed: '10000 Mbps', utilization: 12 },
            statusColor: 'green',
            uptime: '34d 7h 12m',
            status: 'online',
            cpu: 8,
            memory: 31,
            temperature: 47,
            throughput: { down: 86.4, up: 32.1 },
            wifiRadios: [
                { band: '2.4 GHz', channel: 1, clients: 4, utilization: 31 },
                { band: '5 GHz', channel: 36, clients: 6, utilization: 52 },
                { band: '6 GHz', channel: 5, clients: 3, utilization: 18 },
            ],
        },
        // Hop 2: Upstairs ← livingroom (Wi-Fi 7 6 GHz mesh, 320MHz, SNR 38 = green)
        {
            id: 'sat-upstairs',
            type: 'satellite',
            name: 'UPSTAIRS_AP',
            model: 'SDG-8733A',
            modelDesc: 'Satellite',
            mac: 'A8:13:74:C4:67:2E',
            ip: '192.168.0.6',
            firmware: 'SmartOS 4.2.1',
            parentId: 'sat-living',
            hops: 2,
            connectionType: 'wireless',
            backhaulBand: '6 GHz',
            backhaul: { speed: '5765 Mbps', utilization: 14, rssi: -42, snr: 38, channel: 37, wifiVersion: '7', channelWidth: '320 MHz' },
            statusColor: 'green',
            uptime: '34d 7h 10m',
            status: 'online',
            cpu: 6,
            memory: 28,
            temperature: 44,
            throughput: { down: 124.8, up: 48.2 },
            wifiRadios: [
                { band: '2.4 GHz', channel: 6, clients: 2, utilization: 12, streams: '2x2' },
                { band: '5 GHz', channel: 149, clients: 3, utilization: 18, streams: '3x3' },
                { band: '6 GHz', channel: 37, clients: 4, utilization: 22, streams: '3x3', channelWidth: '320 MHz' },
            ],
        },
    ],
    clients: [
        // Gateway direct clients
        { id: 'c1', name: 'Desktop-PC', mac: '4C:CC:6A:12:34:56', ip: '192.168.0.100', parentId: 'gateway', band: '5 GHz', rssi: -34, rxRate: 2882, txRate: 2882, activity: { down: 42.1, up: 18.7 }, type: 'desktop', status: 'online', connectedSince: '2d 14h', wifiVersion: '7' },
        { id: 'c2', name: 'NAS-Synology', mac: '00:11:32:AB:CD:EF', ip: '192.168.0.10', parentId: 'gateway', connection: 'ethernet', lanPort: 'LAN1', rxRate: 1000, txRate: 1000, activity: { down: 0, up: 0 }, type: 'server', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c18', name: 'Pi-Hole DNS', mac: 'B8:27:EB:11:22:33', ip: '192.168.0.7', parentId: 'gateway', connection: 'ethernet', lanPort: 'LAN1', rxRate: 1000, txRate: 1000, activity: { down: 0, up: 0 }, type: 'server', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c19', name: 'UniFi Switch', mac: 'F0:9F:C2:44:55:66', ip: '192.168.0.8', parentId: 'gateway', connection: 'ethernet', lanPort: 'LAN2', rxRate: 1000, txRate: 1000, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c20', name: 'Gaming-PC', mac: '70:85:C2:77:88:99', ip: '192.168.0.101', parentId: 'gateway', band: '6 GHz', rssi: -28, rxRate: 5765, txRate: 5765, activity: { down: 78.3, up: 24.1 }, type: 'desktop', status: 'online', connectedSince: '5h 33m', qoeBreakdown: { snr: 98, phyRate: 100, stability: 88, retransmission: 92, airtime: 95 }, wifiVersion: '7' },
        { id: 'c21', name: 'Hue Bridge', mac: '00:17:88:AA:BB:CC', ip: '192.168.0.9', parentId: 'gateway', connection: 'ethernet', lanPort: 'LAN2', rxRate: 100, txRate: 100, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c71', name: 'Ring Doorbell', mac: '6C:AB:31:11:22:33', ip: '192.168.0.104', parentId: 'gateway', band: '2.4 GHz', rssi: -55, rxRate: 72, txRate: 72, activity: { down: 0.2, up: 0.8 }, type: 'iot', status: 'online', connectedSince: '34d 7h', qoeBreakdown: { snr: 58, phyRate: 40, stability: 72, retransmission: 35, airtime: 48 } },
        { id: 'c74', name: 'MacBook M4', mac: '3C:22:FB:44:55:66', ip: '192.168.0.107', parentId: 'gateway', band: '6 GHz', rssi: -32, rxRate: 5765, txRate: 5765, activity: { down: 95.2, up: 42.7 }, type: 'laptop', status: 'online', connectedSince: '4h 15m', qoeBreakdown: { snr: 95, phyRate: 100, stability: 98, retransmission: 97, airtime: 90 }, wifiVersion: '7' },

        // Kitchen satellite clients (hop 1)
        { id: 'c22', name: 'Shield TV Pro', mac: '00:04:4B:DD:EE:FF', ip: '192.168.0.102', parentId: 'sat-kitchen', band: '5 GHz', rssi: -36, rxRate: 2882, txRate: 2882, activity: { down: 35.1, up: 0.8 }, type: 'streaming', status: 'online', connectedSince: '1d 8h', wifiVersion: '7' },
        { id: 'c72', name: 'Echo Dot', mac: 'F0:F0:A4:22:33:44', ip: '192.168.0.105', parentId: 'sat-kitchen', band: '2.4 GHz', rssi: -52, rxRate: 72, txRate: 72, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '12d 5h', idle: true },
        { id: 'c8', name: 'Nest Thermostat', mac: '18:B4:30:77:88:99', ip: '192.168.0.115', parentId: 'sat-kitchen', band: '2.4 GHz', rssi: -58, rxRate: 54, txRate: 54, activity: { down: 2.4, up: 5.8 }, type: 'iot', status: 'online', connectedSince: '34d 7h' },
        { id: 'c11', name: 'HP LaserJet', mac: '30:E1:71:11:22:33', ip: '192.168.0.142', parentId: 'sat-kitchen', band: '2.4 GHz', rssi: -49, rxRate: 72, txRate: 72, activity: { down: 1.8, up: 3.2 }, type: 'printer', status: 'online', connectedSince: '34d 7h', idle: true },

        // Dining satellite clients (hop 2, via kitchen)
        { id: 'c9', name: 'MacBook-Pro', mac: '3C:22:FB:AA:BB:CC', ip: '192.168.0.140', parentId: 'sat-dining', band: '6 GHz', rssi: -29, rxRate: 2402, txRate: 2402, activity: { down: 34.6, up: 22.8 }, type: 'laptop', status: 'online', connectedSince: '8h 44m', qoeBreakdown: { snr: 100, phyRate: 100, stability: 100, retransmission: 100, airtime: 98 } },
        { id: 'c12', name: "Sarah's iPhone", mac: 'E4:42:A6:44:55:66', ip: '192.168.0.143', parentId: 'sat-dining', band: '5 GHz', rssi: -41, rxRate: 573, txRate: 573, activity: { down: 8.2, up: 4.1 }, type: 'phone', status: 'online', connectedSince: '4h 38m' },
        { id: 'c17', name: 'Sonos One', mac: '48:A6:B8:EE:FF:00', ip: '192.168.0.146', parentId: 'sat-dining', band: '2.4 GHz', rssi: -54, rxRate: 65, txRate: 65, activity: { down: 0, up: 0 }, type: 'speaker', status: 'online', connectedSince: '14d 2h', idle: true },
        { id: 'c40', name: 'Brother Printer', mac: '00:80:77:77:88:99', ip: '192.168.0.149', parentId: 'sat-dining', band: '2.4 GHz', rssi: -52, rxRate: 72, txRate: 72, activity: { down: 0, up: 0 }, type: 'printer', status: 'online', connectedSince: '34d 7h', idle: true },

        // Living Room satellite clients (hop 2, via kitchen)
        { id: 'c3', name: 'LG-OLED-TV', mac: 'A8:23:FE:11:22:33', ip: '192.168.0.110', parentId: 'sat-living', band: '5 GHz', rssi: -30, rxRate: 2882, txRate: 2882, activity: { down: 52.3, up: 1.2 }, type: 'tv', status: 'online', connectedSince: '6h 42m', wifiVersion: '7' },
        { id: 'c4', name: "Chad's iPhone 16", mac: 'BC:D0:74:AA:BB:CC', ip: '192.168.0.111', parentId: 'sat-living', band: '6 GHz', rssi: -34, rxRate: 5765, txRate: 5765, activity: { down: 14.8, up: 8.2 }, type: 'phone', status: 'online', connectedSince: '1d 3h', wifiVersion: '7' },
        { id: 'c5', name: 'HomePod Mini', mac: 'F0:B3:EC:DD:EE:FF', ip: '192.168.0.112', parentId: 'sat-living', band: '2.4 GHz', rssi: -52, rxRate: 72, txRate: 72, activity: { down: 0, up: 0 }, type: 'speaker', status: 'online', connectedSince: '12d 8h', idle: true },
        { id: 'c6', name: 'PS5', mac: 'A4:FC:77:11:22:33', ip: '192.168.0.113', parentId: 'sat-living', band: '6 GHz', rssi: -30, rxRate: 5765, txRate: 5765, activity: { down: 62.4, up: 14.1 }, type: 'console', status: 'online', connectedSince: '3h 17m', qoeBreakdown: { snr: 95, phyRate: 100, stability: 95, retransmission: 96, airtime: 88 }, wifiVersion: '7' },
        { id: 'c7', name: 'Ring Doorbell', mac: '6C:56:97:44:55:66', ip: '192.168.0.114', parentId: 'sat-living', band: '2.4 GHz', rssi: -61, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'camera', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c14', name: 'iPad Pro M4', mac: 'DC:A9:04:88:99:AA', ip: '192.168.0.116', parentId: 'sat-living', band: '6 GHz', rssi: -32, rxRate: 5765, txRate: 5765, activity: { down: 12.1, up: 4.3 }, type: 'tablet', status: 'online', connectedSince: '5h 11m', wifiVersion: '7' },
        { id: 'c24', name: 'Samsung Frame', mac: '8C:79:F5:44:55:66', ip: '192.168.0.118', parentId: 'sat-living', band: '5 GHz', rssi: -42, rxRate: 573, txRate: 573, activity: { down: 28.4, up: 0.6 }, type: 'tv', status: 'online', connectedSince: '12h 4m' },
        { id: 'c27', name: 'Roomba i7', mac: '50:14:79:DD:EE:FF', ip: '192.168.0.121', parentId: 'sat-living', band: '2.4 GHz', rssi: -63, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '7d 3h', idle: true },
        { id: 'c35', name: "Dad's Phone", mac: '20:3C:AE:77:88:99', ip: '192.168.0.129', parentId: 'sat-living', band: '5 GHz', rssi: -45, rxRate: 573, txRate: 573, activity: { down: 11.2, up: 5.8 }, type: 'phone', status: 'online', connectedSince: '6h 30m' },
        { id: 'c36', name: 'Fire Stick 4K', mac: '34:D2:70:AA:BB:CC', ip: '192.168.0.130', parentId: 'sat-living', band: '5 GHz', rssi: -36, rxRate: 2882, txRate: 2882, activity: { down: 22.1, up: 0.4 }, type: 'streaming', status: 'online', connectedSince: '4h 15m', wifiVersion: '7' },

        // Upstairs satellite clients (hop 2, via livingroom — Wi-Fi 7 SDG-8733A)
        { id: 'c46', name: 'Office iMac', mac: '3C:07:54:AA:BB:CC', ip: '192.168.0.155', parentId: 'sat-upstairs', band: '6 GHz', rssi: -30, rxRate: 5765, txRate: 5765, activity: { down: 82.4, up: 36.8 }, type: 'desktop', status: 'online', connectedSince: '1d 2h', qoeBreakdown: { snr: 95, phyRate: 100, stability: 92, retransmission: 94, airtime: 91 }, wifiVersion: '7' },
        { id: 'c41', name: 'ThinkPad X1', mac: '54:E1:AD:AA:BB:CC', ip: '192.168.0.150', parentId: 'sat-upstairs', band: '6 GHz', rssi: -36, rxRate: 2882, txRate: 2882, activity: { down: 44.1, up: 22.3 }, type: 'laptop', status: 'online', connectedSince: '7h 15m', wifiVersion: '7' },
        { id: 'c43', name: "Tom's Pixel 9", mac: 'DC:E5:5B:11:22:33', ip: '192.168.0.152', parentId: 'sat-upstairs', band: '6 GHz', rssi: -40, rxRate: 2882, txRate: 2882, activity: { down: 12.4, up: 5.8 }, type: 'phone', status: 'online', connectedSince: '2h 55m', wifiVersion: '7' },
        { id: 'c49', name: 'Nest Protect', mac: '18:B4:30:44:55:66', ip: '192.168.0.158', parentId: 'sat-upstairs', band: '2.4 GHz', rssi: -62, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c50', name: 'Galaxy Tab S10', mac: 'CC:3A:61:77:88:99', ip: '192.168.0.159', parentId: 'sat-upstairs', band: '6 GHz', rssi: -42, rxRate: 2882, txRate: 2882, activity: { down: 18.2, up: 4.6 }, type: 'tablet', status: 'online', connectedSince: '1h 30m', wifiVersion: '7' },

        // ── Additional clients (to reach 70+) ──────────────
        // Gateway extras
        { id: 'c51', name: 'Work Laptop', mac: '4C:CC:6A:22:33:44', ip: '192.168.0.160', parentId: 'gateway', band: '5 GHz', rssi: -34, rxRate: 2882, txRate: 2882, activity: { down: 28.4, up: 14.2 }, type: 'laptop', status: 'online', connectedSince: '3h 22m', wifiVersion: '7' },
        { id: 'c52', name: 'Sonos Beam', mac: '48:A6:B8:33:44:55', ip: '192.168.0.161', parentId: 'gateway', connection: 'ethernet', lanPort: 'LAN1', rxRate: 1000, txRate: 1000, activity: { down: 4.2, up: 0.1 }, type: 'speaker', status: 'online', connectedSince: '12d 3h' },
        { id: 'c53', name: 'TP-Link Plug', mac: '98:DA:C4:11:22:33', ip: '192.168.0.162', parentId: 'gateway', band: '2.4 GHz', rssi: -58, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '28d 4h', idle: true },
        { id: 'c54', name: 'Wyze Cam v3', mac: '2C:AA:8E:44:55:66', ip: '192.168.0.163', parentId: 'gateway', band: '2.4 GHz', rssi: -64, rxRate: 54, txRate: 54, activity: { down: 0.1, up: 2.4 }, type: 'camera', status: 'online', connectedSince: '34d 7h' },
        { id: 'c55', name: 'iMac Studio', mac: '3C:07:54:DD:EE:FF', ip: '192.168.0.164', parentId: 'gateway', band: '6 GHz', rssi: -28, rxRate: 5765, txRate: 5765, activity: { down: 112.5, up: 48.3 }, type: 'desktop', status: 'online', connectedSince: '6h 10m', wifiVersion: '7' },
        { id: 'c56', name: 'HP Printer', mac: '30:E1:71:55:66:77', ip: '192.168.0.165', parentId: 'gateway', band: '2.4 GHz', rssi: -50, rxRate: 72, txRate: 72, activity: { down: 0, up: 0 }, type: 'printer', status: 'offline', connectedSince: '0' },
        { id: 'c57', name: 'Guest iPad', mac: 'DC:A9:04:CC:DD:EE', ip: '192.168.0.166', parentId: 'gateway', band: '5 GHz', rssi: -48, rxRate: 573, txRate: 573, activity: { down: 0, up: 0 }, type: 'tablet', status: 'offline', connectedSince: '0' },

        // Kitchen extras
        { id: 'c58', name: 'Kitchen iPad', mac: 'DC:A9:04:11:AA:BB', ip: '192.168.0.167', parentId: 'sat-kitchen', band: '6 GHz', rssi: -32, rxRate: 5765, txRate: 5765, activity: { down: 8.4, up: 1.2 }, type: 'tablet', status: 'online', connectedSince: '2h 45m', wifiVersion: '7' },
        { id: 'c59', name: 'Meross Plug', mac: '48:E1:E9:22:33:44', ip: '192.168.0.168', parentId: 'sat-kitchen', band: '2.4 GHz', rssi: -60, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '20d 1h', idle: true },
        { id: 'c60', name: 'Aqara Hub', mac: '54:EF:44:55:66:77', ip: '192.168.0.169', parentId: 'sat-kitchen', band: '2.4 GHz', rssi: -56, rxRate: 65, txRate: 65, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c61', name: 'LG Fridge', mac: 'CC:2D:E0:88:99:AA', ip: '192.168.0.170', parentId: 'sat-kitchen', band: '2.4 GHz', rssi: -65, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c62', name: 'Eufy Doorbell', mac: '90:8D:6C:AA:BB:CC', ip: '192.168.0.171', parentId: 'sat-kitchen', band: '2.4 GHz', rssi: -67, rxRate: 54, txRate: 54, activity: { down: 0.1, up: 1.8 }, type: 'camera', status: 'online', connectedSince: '34d 7h' },
        { id: 'c63', name: 'Echo Show 8', mac: 'F0:F0:A4:DD:EE:FF', ip: '192.168.0.172', parentId: 'sat-kitchen', band: '6 GHz', rssi: -38, rxRate: 2882, txRate: 2882, activity: { down: 5.2, up: 0.8 }, type: 'iot', status: 'online', connectedSince: '8d 5h', wifiVersion: '7' },

        // Dining extras
        { id: 'c64', name: "Mom's iPhone", mac: 'E4:42:A6:FF:00:11', ip: '192.168.0.173', parentId: 'sat-dining', band: '5 GHz', rssi: -38, rxRate: 866, txRate: 866, activity: { down: 12.4, up: 6.8 }, type: 'phone', status: 'online', connectedSince: '5h 12m' },
        { id: 'c65', name: 'Chromecast', mac: '6C:AD:F8:22:33:44', ip: '192.168.0.174', parentId: 'sat-dining', band: '5 GHz', rssi: -43, rxRate: 573, txRate: 573, activity: { down: 18.2, up: 0.3 }, type: 'streaming', status: 'online', connectedSince: '3h 40m' },
        { id: 'c66', name: 'Dyson Fan', mac: '18:FE:34:55:66:77', ip: '192.168.0.175', parentId: 'sat-dining', band: '2.4 GHz', rssi: -59, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '14d 8h', idle: true },
        { id: 'c67', name: 'Pixel Watch', mac: 'DC:E5:5B:88:99:AA', ip: '192.168.0.176', parentId: 'sat-dining', band: '2.4 GHz', rssi: -62, rxRate: 54, txRate: 54, activity: { down: 0.1, up: 0.1 }, type: 'iot', status: 'online', connectedSince: '4h 38m' },
        { id: 'c68', name: 'Surface Pro', mac: '28:18:78:BB:CC:DD', ip: '192.168.0.177', parentId: 'sat-dining', band: '6 GHz', rssi: -35, rxRate: 2402, txRate: 2402, activity: { down: 0, up: 0 }, type: 'laptop', status: 'offline', connectedSince: '0' },

        // Living Room extras
        { id: 'c69', name: 'Nintendo Switch', mac: '98:41:5C:11:22:33', ip: '192.168.0.178', parentId: 'sat-living', band: '5 GHz', rssi: -46, rxRate: 573, txRate: 573, activity: { down: 0, up: 0 }, type: 'console', status: 'offline', connectedSince: '0' },
        { id: 'c70', name: 'Nest Cam IQ', mac: '18:B4:30:CC:DD:EE', ip: '192.168.0.179', parentId: 'sat-living', band: '2.4 GHz', rssi: -58, rxRate: 72, txRate: 72, activity: { down: 0.1, up: 3.2 }, type: 'camera', status: 'online', connectedSince: '34d 7h' },
        { id: 'c75', name: 'Apple TV 4K', mac: 'F0:B3:EC:11:22:33', ip: '192.168.0.180', parentId: 'sat-living', band: '6 GHz', rssi: -28, rxRate: 5765, txRate: 5765, activity: { down: 42.8, up: 1.1 }, type: 'streaming', status: 'online', connectedSince: '2d 6h', wifiVersion: '7' },
        { id: 'c76', name: "Kid's iPad", mac: 'DC:A9:04:22:33:44', ip: '192.168.0.181', parentId: 'sat-living', band: '5 GHz', rssi: -42, rxRate: 573, txRate: 573, activity: { down: 6.4, up: 1.8 }, type: 'tablet', status: 'online', connectedSince: '1h 50m' },
        { id: 'c77', name: 'Yale Lock', mac: '00:1A:22:55:66:77', ip: '192.168.0.182', parentId: 'sat-living', band: '2.4 GHz', rssi: -66, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c78', name: 'Ecobee Sensor', mac: '44:61:32:88:99:AA', ip: '192.168.0.183', parentId: 'sat-living', band: '2.4 GHz', rssi: -70, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c79', name: 'Nanoleaf Panels', mac: '60:D0:A9:CC:DD:EE', ip: '192.168.0.184', parentId: 'sat-living', band: '2.4 GHz', rssi: -54, rxRate: 72, txRate: 72, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '14d 11h', idle: true },
        { id: 'c80', name: 'Roku Ultra', mac: 'D8:31:34:FF:00:11', ip: '192.168.0.185', parentId: 'sat-living', band: '5 GHz', rssi: -39, rxRate: 866, txRate: 866, activity: { down: 0, up: 0 }, type: 'streaming', status: 'offline', connectedSince: '0' },

        // Upstairs extras
        { id: 'c81', name: 'Ring Cam', mac: '6C:56:97:AA:BB:CC', ip: '192.168.0.186', parentId: 'sat-upstairs', band: '2.4 GHz', rssi: -63, rxRate: 54, txRate: 54, activity: { down: 0.1, up: 2.8 }, type: 'camera', status: 'online', connectedSince: '34d 7h' },
        { id: 'c82', name: "Ella's MacBook", mac: '3C:22:FB:FF:00:11', ip: '192.168.0.187', parentId: 'sat-upstairs', band: '6 GHz', rssi: -34, rxRate: 5765, txRate: 5765, activity: { down: 64.2, up: 28.4 }, type: 'laptop', status: 'online', connectedSince: '2h 8m', wifiVersion: '7' },
        { id: 'c83', name: 'Hatch Rest+', mac: '00:17:88:DD:EE:FF', ip: '192.168.0.188', parentId: 'sat-upstairs', band: '2.4 GHz', rssi: -59, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '28d 6h', idle: true },
        { id: 'c84', name: 'Kindle PW', mac: 'F0:27:2D:11:22:33', ip: '192.168.0.189', parentId: 'sat-upstairs', band: '5 GHz', rssi: -51, rxRate: 400, txRate: 400, activity: { down: 0, up: 0 }, type: 'tablet', status: 'online', connectedSince: '12h 30m', idle: true },
        { id: 'c85', name: 'Bose Speaker', mac: '04:52:C7:44:55:66', ip: '192.168.0.190', parentId: 'sat-upstairs', band: '2.4 GHz', rssi: -55, rxRate: 72, txRate: 72, activity: { down: 3.1, up: 0.2 }, type: 'speaker', status: 'online', connectedSince: '6d 14h' },
        { id: 'c86', name: 'Smart Plug 1', mac: '98:DA:C4:66:77:88', ip: '192.168.0.191', parentId: 'sat-upstairs', band: '2.4 GHz', rssi: -68, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'offline', connectedSince: '0' },
        { id: 'c87', name: 'Smart Plug 2', mac: '98:DA:C4:99:AA:BB', ip: '192.168.0.192', parentId: 'sat-upstairs', band: '2.4 GHz', rssi: -69, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'offline', connectedSince: '0' },
        { id: 'c88', name: "Ben's iPhone 16", mac: 'E4:42:A6:CC:DD:EE', ip: '192.168.0.193', parentId: 'sat-upstairs', band: '6 GHz', rssi: -38, rxRate: 2882, txRate: 2882, activity: { down: 22.4, up: 8.6 }, type: 'phone', status: 'online', connectedSince: '3h 15m', wifiVersion: '7' },
        { id: 'c89', name: 'Epson Printer', mac: '00:26:AB:FF:00:11', ip: '192.168.0.194', parentId: 'sat-upstairs', band: '2.4 GHz', rssi: -57, rxRate: 72, txRate: 72, activity: { down: 0, up: 0 }, type: 'printer', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c90', name: 'Levoit Air', mac: '7C:49:EB:22:33:44', ip: '192.168.0.195', parentId: 'sat-upstairs', band: '2.4 GHz', rssi: -61, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '14d 2h', idle: true },
        { id: 'c91', name: 'Wemo Mini', mac: '94:10:3E:11:22:33', ip: '192.168.0.196', parentId: 'gateway', band: '2.4 GHz', rssi: -62, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '21d 5h', idle: true },
        { id: 'c92', name: 'Roku Express', mac: 'D8:31:34:44:55:66', ip: '192.168.0.197', parentId: 'sat-kitchen', band: '5 GHz', rssi: -42, rxRate: 2882, txRate: 2882, activity: { down: 14.2, up: 0.3 }, type: 'streaming', status: 'online', connectedSince: '5h 20m', wifiVersion: '7' },
        { id: 'c93', name: 'Withings Scale', mac: '00:24:E4:77:88:99', ip: '192.168.0.198', parentId: 'sat-dining', band: '2.4 GHz', rssi: -60, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c94', name: 'August Lock', mac: '00:1A:22:AA:BB:CC', ip: '192.168.0.199', parentId: 'sat-living', band: '2.4 GHz', rssi: -68, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
    ],
};

// Auto-generate qoeBreakdown for wireless clients that don't have one
TOPOLOGY.clients.forEach(c => {
    if (c.qoeBreakdown || c.connection === 'ethernet' || !c.band) return;
    // Derive plausible factor scores from RSSI and link rate
    const rssiNorm = c.rssi ? Math.max(0, Math.min(1, (c.rssi + 85) / 55)) : 0.5;
    const rateMax = 5765;
    const rateNorm = Math.min(1, (c.rxRate || 0) / rateMax);
    const snr = Math.round(rssiNorm * 100);
    const phyRate = Math.round(rateNorm * 100);
    const uptime = c.connectedSince || '';
    const stability = uptime.includes('d') ? 85 + Math.round(Math.random() * 15) :
        uptime.includes('h') ? 55 + Math.round(Math.random() * 30) : 30 + Math.round(Math.random() * 25);
    const retransmission = Math.round(50 + rssiNorm * 40 + (Math.random() - 0.5) * 20);
    const airtime = Math.round(40 + rateNorm * 30 + rssiNorm * 20 + (Math.random() - 0.5) * 15);
    c.qoeBreakdown = {
        snr: Math.max(0, Math.min(100, snr)),
        phyRate: Math.max(0, Math.min(100, phyRate)),
        stability: Math.max(0, Math.min(100, stability)),
        retransmission: Math.max(0, Math.min(100, retransmission)),
        airtime: Math.max(0, Math.min(100, airtime)),
    };
});

// Sparkline history data (last 20 data points)
function generateSparkline(base, variance, points = 20) {
    return Array.from({ length: points }, () => Math.max(0, base + (Math.random() - 0.5) * variance * 2));
}

// ── Phosphor Icon Classes ──────────────────────────
// Using Phosphor Icons (duotone weight for lively look)
const ICONS = {
    internet:  '<i class="ph-duotone ph-globe-hemisphere-west"></i>',
    gateway:   '<i class="ph-duotone ph-share-network"></i>',
    satellite: '<i class="ph-duotone ph-broadcast"></i>',
    desktop:   '<i class="ph-duotone ph-desktop-tower"></i>',
    laptop:    '<i class="ph-duotone ph-laptop"></i>',
    phone:     '<i class="ph-duotone ph-device-mobile"></i>',
    tablet:    '<i class="ph-duotone ph-device-tablet"></i>',
    tv:        '<i class="ph-duotone ph-television-simple"></i>',
    server:    '<i class="ph-duotone ph-hard-drives"></i>',
    speaker:   '<i class="ph-duotone ph-speaker-high"></i>',
    camera:    '<i class="ph-duotone ph-security-camera"></i>',
    printer:   '<i class="ph-duotone ph-printer"></i>',
    iot:       '<i class="ph-duotone ph-cpu"></i>',
    console:   '<i class="ph-duotone ph-game-controller"></i>',
    streaming: '<i class="ph-duotone ph-screencast"></i>',
};

// ── Utilities ──────────────────────────────────────
function formatBandwidth(mbps) {
    if (mbps >= 1000) return (mbps / 1000).toFixed(1) + ' Gbps';
    if (mbps >= 1) return mbps.toFixed(1) + ' Mbps';
    if (mbps >= 0.001) return (mbps * 1000).toFixed(0) + ' Kbps';
    return '0 bps';
}

function rssiToQuality(rssi) {
    if (rssi >= -30) return 'Excellent';
    if (rssi >= -50) return 'Good';
    if (rssi >= -60) return 'Fair';
    if (rssi >= -70) return 'Weak';
    return 'Poor';
}

function rssiToPercent(rssi) {
    return Math.max(0, Math.min(100, (rssi + 90) * (100 / 60)));
}

// QoE score: 0-100 based on signal, link rate, and activity health
function computeQoE(device) {
    if (device.connection === 'ethernet') {
        // Wired clients: high base score, slight penalty if link is slow
        const linkScore = device.rxRate >= 1000 ? 98 : device.rxRate >= 100 ? 85 : 70;
        return linkScore;
    }
    if (!device.rssi) return 50; // unknown

    // Signal component (0-40 points)
    const rssiNorm = Math.max(0, Math.min(1, (device.rssi + 85) / 55)); // -85=0, -30=1
    const signalScore = rssiNorm * 40;

    // Link rate component (0-35 points)
    const maxRate = 5765; // Wi-Fi 7 EHT 320MHz 2SS max
    const rateNorm = Math.min(1, (device.rxRate || 0) / maxRate);
    const rateScore = rateNorm * 35;

    // Stability component (0-25 points) — higher if connected longer
    const uptime = device.connectedSince || '';
    let stabilityScore = 15; // default
    if (uptime.includes('d')) stabilityScore = 25;
    else if (uptime.includes('h')) {
        const hrs = parseInt(uptime);
        stabilityScore = hrs > 6 ? 22 : hrs > 1 ? 18 : 12;
    }

    return Math.round(signalScore + rateScore + stabilityScore);
}

function qoeColor(score) {
    if (score >= 70) return 'var(--accent-green)';
    if (score >= 40) return 'var(--accent-amber)';
    return 'var(--accent-red)';
}

function qoeLabel(score) {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Poor';
    return 'Critical';
}

// ── QoE History (mock, structured for future netdata replacement) ──
const qoeHistories = {};

function generateQoEHistory(device) {
    if (qoeHistories[device.id]) return qoeHistories[device.id];

    const currentQoe = computeQoE(device);
    const points = 60; // 1 per minute, last hour
    const scores = [];
    let val = currentQoe;

    // Walk backwards from "now", creating a plausible wander
    for (let i = 0; i < points; i++) {
        scores.unshift(Math.max(0, Math.min(100, Math.round(val))));
        // Random walk biased toward current score
        val += (Math.random() - 0.5) * 8;
        val += (currentQoe - val) * 0.08; // mean-revert
    }
    // Ensure last point matches current score
    scores[points - 1] = currentQoe;

    // Generate timestamps (1 per minute, ending at "now")
    const now = Math.floor(Date.now() / 1000);
    const timestamps = [];
    for (let i = 0; i < points; i++) {
        timestamps.push(now - (points - 1 - i) * 60);
    }

    const history = { scores, timestamps };

    // Factor histories if breakdown exists
    if (device.qoeBreakdown) {
        history.factors = {};
        for (const [key, current] of Object.entries(device.qoeBreakdown)) {
            const fScores = [];
            let fv = current;
            for (let i = 0; i < points; i++) {
                fScores.unshift(Math.max(0, Math.min(100, Math.round(fv))));
                fv += (Math.random() - 0.5) * 6;
                fv += (current - fv) * 0.1;
            }
            fScores[points - 1] = current;
            history.factors[key] = fScores;
        }
    }

    qoeHistories[device.id] = history;
    return history;
}

// Zone index for a QoE value: 0=good, 1=fair, 2=poor
function qoeZone(v) {
    if (v == null) return 2;
    if (v >= 70) return 0;
    if (v >= 40) return 1;
    return 2;
}

const QOE_ZONE_COLORS = [
    { stroke: 'rgba(45, 206, 137, 1)',  fill: 'rgba(45, 206, 137, 0.18)' },  // good
    { stroke: 'rgba(251, 175, 64, 1)',  fill: 'rgba(251, 175, 64, 0.18)' },  // fair
    { stroke: 'rgba(255, 69, 58, 1)',   fill: 'rgba(255, 69, 58, 0.18)' },   // poor
];

const QOE_HEATMAP_FILLS = [
    'rgba(45, 206, 137, 0.5)',   // good
    'rgba(251, 175, 64, 0.55)',  // fair
    'rgba(255, 69, 58, 0.55)',   // poor
];

/**
 * Render a QoE sparkline as an SVG string.
 * @param {object} history - { scores: number[], factors?: { snr, phyRate, stability } }
 * @param {number} width - SVG viewBox width
 * @param {number} height - SVG viewBox height (sparkline area; heatmap adds below)
 * @param {object} opts - { showThresholds, showHeatmap, showTimeLabels }
 */
function renderQoESparklineSVG(history, width, height, opts = {}) {
    const { showThresholds = true, showHeatmap = false, showTimeLabels = false } = opts;
    const scores = history.scores || [];
    if (scores.length < 2) return '';

    const pad = 4;
    const hmRowH = 6, hmGap = 2, hmMargin = 4;
    const factorKeys = ['snr', 'phyRate', 'stability', 'retransmission', 'airtime'];
    const factorLabels = ['SNR', 'PHY', 'Stab', 'Ret', 'Air'];
    const hasFactors = showHeatmap && history.factors && Object.keys(history.factors).length > 0;
    const hmHeight = hasFactors ? (hmRowH * factorKeys.length + hmGap * (factorKeys.length - 1) + hmMargin) : 0;
    const totalH = height + hmHeight + (showTimeLabels ? 10 : 0);

    const yFor = (v) => pad + (1 - v / 100) * (height - pad * 2);
    const xFor = (i) => pad + (i / (scores.length - 1)) * (width - pad * 2);

    let svg = `<svg class="qoe-sparkline-svg" viewBox="0 0 ${width} ${totalH}" preserveAspectRatio="none" width="100%" height="100%">`;

    // Threshold lines
    if (showThresholds) {
        [70, 40].forEach(t => {
            const ty = yFor(t);
            svg += `<line x1="${pad}" y1="${ty}" x2="${width - pad}" y2="${ty}" stroke="rgba(255,255,255,0.12)" stroke-dasharray="3,2" stroke-width="0.5"/>`;
        });
    }

    // Build zone-colored segments (mirroring JUCI flush_run approach)
    let runStart = 0;
    let curZone = qoeZone(scores[0]);

    const flushRun = (start, end, zone) => {
        const colors = QOE_ZONE_COLORS[zone];
        // Filled area
        let fillPath = `M${xFor(start)},${height - pad}`;
        for (let j = start; j <= end; j++) fillPath += ` L${xFor(j)},${yFor(scores[j])}`;
        fillPath += ` L${xFor(end)},${height - pad}Z`;
        svg += `<path d="${fillPath}" fill="${colors.fill}" stroke="none"/>`;
        // Stroke line
        let linePath = `M${xFor(start)},${yFor(scores[start])}`;
        for (let j = start + 1; j <= end; j++) linePath += ` L${xFor(j)},${yFor(scores[j])}`;
        svg += `<path d="${linePath}" fill="none" stroke="${colors.stroke}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    };

    for (let i = 1; i < scores.length; i++) {
        const z = qoeZone(scores[i]);
        if (z !== curZone) {
            flushRun(runStart, i, curZone);
            runStart = i - 1; // overlap by 1 for continuity
            curZone = z;
        }
    }
    flushRun(runStart, scores.length - 1, curZone);

    // Factor heatmap
    if (hasFactors) {
        const hmY0 = height + hmMargin;
        factorKeys.forEach((key, row) => {
            const fdata = history.factors[key];
            if (!fdata) return;
            const ry = hmY0 + row * (hmRowH + hmGap);
            const step = (width - pad * 2) / scores.length;
            for (let i = 0; i < fdata.length; i++) {
                svg += `<rect x="${pad + i * step}" y="${ry}" width="${step + 0.5}" height="${hmRowH}" fill="${QOE_HEATMAP_FILLS[qoeZone(fdata[i])]}" rx="0.5"/>`;
            }
        });
    }

    // Time labels
    if (showTimeLabels) {
        const labelY = totalH - 1;
        svg += `<text x="${pad}" y="${labelY}" fill="rgba(255,255,255,0.35)" font-size="3" font-family="var(--font-mono, monospace)">60m ago</text>`;
        svg += `<text x="${width - pad}" y="${labelY}" fill="rgba(255,255,255,0.35)" font-size="3" font-family="var(--font-mono, monospace)" text-anchor="end">now</text>`;
    }

    svg += '</svg>';
    return svg;
}

// ── Detail Sparkline Hover ────────────────────────
function bindDetailSparklineHover(device) {
    const container = document.querySelector(`.detail-qoe-sparkline[data-device-id="${device.id}"]`);
    if (!container) return;

    const svg = container.querySelector('.qoe-sparkline-svg');
    const hoverLine = container.querySelector('.qoe-hover-line');
    const hoverDot = container.querySelector('.qoe-hover-dot');
    const hoverTip = container.querySelector('.qoe-hover-tooltip');
    if (!svg || !hoverLine || !hoverDot || !hoverTip) return;

    const history = qoeHistories[device.id];
    if (!history || !history.scores || history.scores.length < 2) return;

    const scores = history.scores;
    const timestamps = history.timestamps;
    const factors = history.factors;
    const hasFactors = factors && Object.keys(factors).length > 0;
    const pad = 4;

    // Factor labels matching the sparkline renderer keys
    const factorDefs = [
        { key: 'snr', abbr: 'SNR' },
        { key: 'phyRate', abbr: 'PHY' },
        { key: 'stability', abbr: 'Stab' },
        { key: 'retransmission', abbr: 'Ret' },
        { key: 'airtime', abbr: 'Air' },
    ];

    container.addEventListener('mousemove', (e) => {
        const rect = svg.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const w = rect.width;

        // Calculate data index from mouse position
        const ratio = (mx - pad) / (w - pad * 2);
        const idx = Math.max(0, Math.min(scores.length - 1, Math.round(ratio * (scores.length - 1))));
        const score = scores[idx];
        if (score == null) return;

        // X/Y position as percentage of container for absolute positioning
        const xPct = (pad + (idx / (scores.length - 1)) * (w - pad * 2)) / w * 100;
        // SVG viewBox: height 64, pad 4, so yFor = pad + (1 - score/100) * (height - pad*2)
        const svgH = 64; // matches renderQoESparklineSVG height param
        const yNorm = pad + (1 - score / 100) * (svgH - pad * 2);
        const yPct = yNorm / svg.getBoundingClientRect().height * svg.getBoundingClientRect().height;

        // Position elements using px from container
        const xPx = (xPct / 100) * rect.width;
        const containerRect = container.getBoundingClientRect();
        const sparkH = rect.height;
        // The SVG has viewBox height = totalH (64 + heatmap + time labels)
        // We need the sparkline portion only (first 64 units of the viewBox)
        const viewBoxH = parseFloat(svg.getAttribute('viewBox').split(' ')[3]);
        const yPx = (yNorm / viewBoxH) * sparkH;

        // Zone color
        const zoneColors = ['rgba(45,206,137,1)', 'rgba(251,175,64,1)', 'rgba(255,69,58,1)'];
        const zone = qoeZone(score);
        const dotColor = zoneColors[zone];

        // Show vertical line
        hoverLine.style.display = 'block';
        hoverLine.style.left = xPx + 'px';
        hoverLine.style.top = '0';
        hoverLine.style.height = sparkH + 'px';

        // Show dot
        hoverDot.style.display = 'block';
        hoverDot.style.left = (xPx - 4) + 'px';
        hoverDot.style.top = (yPx - 4) + 'px';
        hoverDot.style.background = dotColor;
        hoverDot.style.boxShadow = `0 0 4px ${dotColor}`;

        // Format time
        const ts = timestamps ? timestamps[idx] : null;
        let timeStr = '';
        if (ts) {
            const d = new Date(ts * 1000);
            timeStr = d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
        }

        // Build tooltip content
        let tipHtml = `<span class="qoe-ht-score" style="color:${dotColor}">${score}</span>`;
        if (timeStr) tipHtml += `<span class="qoe-ht-time">${timeStr}</span>`;

        if (hasFactors) {
            tipHtml += '<span class="qoe-ht-factors">';
            factorDefs.forEach(f => {
                const fv = factors[f.key]?.[idx];
                if (fv != null) {
                    const fc = zoneColors[qoeZone(fv)];
                    tipHtml += `<span class="qoe-ht-factor"><span class="qoe-ht-flabel">${f.abbr}</span><span style="color:${fc}">${fv}</span></span>`;
                }
            });
            tipHtml += '</span>';
        }

        hoverTip.innerHTML = tipHtml;
        hoverTip.style.display = 'flex';

        // Position tooltip: to the right of the dot, or left if near right edge
        const tipW = hoverTip.offsetWidth;
        const containerW = containerRect.width;
        if (xPx + 12 + tipW > containerW) {
            hoverTip.style.left = (xPx - tipW - 8) + 'px';
        } else {
            hoverTip.style.left = (xPx + 12) + 'px';
        }
        hoverTip.style.top = Math.max(0, yPx - hoverTip.offsetHeight / 2) + 'px';
    });

    container.addEventListener('mouseleave', () => {
        hoverLine.style.display = 'none';
        hoverDot.style.display = 'none';
        hoverTip.style.display = 'none';
    });
}

// ── State ──────────────────────────────────────────
let selectedDeviceId = null;
let animationFrameId = null;
let connections = []; // { fromEl, toEl, fromId, toId, traffic }
let simplifiedView = false;
let userToggledView = false; // true if user manually toggled, prevents auto-override
let layoutGraph = null; // LayoutGraph with computed positions

// ── ISP Resolution ────────────────────────────────
async function resolveIsp(device) {
    if (!device || !device.wanIp || device.isp) return;
    try {
        const resp = await fetch(`http://ip-api.com/json/${device.wanIp}?fields=status,isp,org`);
        const data = await resp.json();
        if (data.status === 'success' && (data.isp || data.org)) {
            device.isp = data.isp || data.org;
            // Update DOM if already rendered
            const card = document.querySelector('.device-card.internet .device-name');
            if (card) card.textContent = device.isp;
        }
    } catch (e) {
        console.warn('ISP lookup failed:', e);
    }
}

// ── Layout Engine ────────────────────────────────
// Simple graph for storing node positions and parent→child edges (replaces dagre)
class LayoutGraph {
    constructor() { this._nodes = {}; this._edges = []; this._adj = {}; }
    setNode(id, data) { this._nodes[id] = data; if (!this._adj[id]) this._adj[id] = []; }
    node(id) { return this._nodes[id]; }
    nodes() { return Object.keys(this._nodes); }
    setEdge(from, to) { this._edges.push({ from, to }); if (!this._adj[from]) this._adj[from] = []; this._adj[from].push(to); }
    successors(id) { return this._adj[id] || []; }
}

let bandGroupPositions = {};

// Band ordering constant
const BAND_ORDER = ['Ethernet', '5 GHz', '2.4 GHz', '6 GHz'];
function sortBands(bands) {
    return [...bands].sort((a, b) =>
        (BAND_ORDER.indexOf(a) === -1 ? 99 : BAND_ORDER.indexOf(a)) -
        (BAND_ORDER.indexOf(b) === -1 ? 99 : BAND_ORDER.indexOf(b))
    );
}

// Group clients by band for a device
function getClientBandGroups(topology, deviceId) {
    const clients = topology.clients.filter(c => c.parentId === deviceId);
    const groups = {};
    clients.forEach(c => {
        const band = c.connection === 'ethernet' ? 'Ethernet' : (c.band || '5 GHz');
        if (!groups[band]) groups[band] = [];
        groups[band].push(c);
    });
    return groups;
}

function renderTopologyGraph() {
    const container = document.getElementById('topologyNodes');
    container.innerHTML = '';
    bandGroupPositions = {};

    // Layout spacing constants (design intent — not element measurements)
    const BAND_GAP = 20;      // horizontal gap between band-group columns
    const CLIENT_GAP = 50;    // vertical gap between device card bottom and client pills top
    const SUBTREE_GAP = 30;   // horizontal gap between sibling subtrees
    const RANK_GAP = 60;      // vertical gap between a device's client pills and its sub-satellite
    const INET_GAP = 38;      // vertical gap between internet wrapper bottom and gateway top (produces ~50px card-to-card, matching bus spacing)
    const MARGIN = 40;

    // ── Step 1: Create all DOM elements hidden in container for measurement ──
    // Elements are placed directly in the container (not a detached box) so they
    // inherit proper CSS context for accurate measurement.
    const deviceEls = {};
    const wanIds = TOPOLOGY.wans.map(w => w.id);
    const allDeviceIds = [...wanIds, 'gateway', ...TOPOLOGY.satellites.map(s => s.id)];
    allDeviceIds.forEach(id => {
        const deviceData = TOPOLOGY.wans.find(w => w.id === id) ||
            (id === 'gateway' ? TOPOLOGY.gateway : null) ||
            TOPOLOGY.satellites.find(s => s.id === id);
        if (!deviceData) return;
        const el = createDeviceNode(deviceData);
        el.style.position = 'absolute';
        el.style.visibility = 'hidden';
        container.appendChild(el);
        deviceEls[id] = el;
    });

    // Create band-group elements
    const bandGroupEls = {};
    const bandGroupData = {}; // { groupId: { band, clients, parentDevice } }
    allDeviceIds.forEach(deviceId => {
        if (wanIds.includes(deviceId)) return;
        const groups = getClientBandGroups(TOPOLOGY, deviceId);
        const bands = sortBands(Object.keys(groups));
        bands.forEach(band => {
            const groupId = `${deviceId}::${band}`;
            const data = { band, clients: groups[band], parentDevice: deviceId };
            bandGroupData[groupId] = data;
            if (!simplifiedView) {
                const el = createBandGroupEl(groupId, data);
                el.style.position = 'absolute';
                el.style.visibility = 'hidden';
                container.appendChild(el);
                bandGroupEls[groupId] = el;
            }
        });
    });

    // ── Step 2: Measure actual rendered sizes ──
    // Measure both wrapper and card-within-wrapper to get internal offsets
    const measured = {}; // { id: { w, h, cardTop, cardBottom, cardCxOffset } }
    Object.entries(deviceEls).forEach(([id, el]) => {
        const card = el.querySelector('.device-card') || el;
        const elRect = el.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        measured[id] = {
            w: elRect.width,    // wrapper width (for positioning)
            h: elRect.height,   // wrapper height (for spacing)
            cardOffsetTop: cardRect.top - elRect.top,       // card top within wrapper
            cardH: cardRect.height,                          // card height
            cardW: cardRect.width,                           // card width
            cardCxOffset: (cardRect.left + cardRect.width / 2) - (elRect.left + elRect.width / 2) // card center offset from wrapper center
        };
    });
    const measuredGroups = {}; // { groupId: { w, h } }
    Object.entries(bandGroupEls).forEach(([groupId, el]) => {
        measuredGroups[groupId] = { w: el.offsetWidth, h: el.offsetHeight };
    });

    // ── Step 3: Compute layout using real measurements ──

    // Per-device info: band groups, total client row width/height
    const deviceInfo = {};
    allDeviceIds.forEach(deviceId => {
        if (wanIds.includes(deviceId)) return;
        const groups = getClientBandGroups(TOPOLOGY, deviceId);
        const bands = sortBands(Object.keys(groups));
        let clientsWidth = 0;
        let tallestGroup = 0;
        bands.forEach((band, i) => {
            const gid = `${deviceId}::${band}`;
            const gm = measuredGroups[gid] || { w: 140, h: 28 };
            clientsWidth += gm.w + (i > 0 ? BAND_GAP : 0);
            if (gm.h > tallestGroup) tallestGroup = gm.h;
        });
        const m = measured[deviceId];
        const wrapperH = m ? m.h : 140;
        const cardH = m ? (m.cardOffsetTop + m.cardH) : 140; // from wrapper top to card bottom
        const clientsHeight = bands.length > 0 ? CLIENT_GAP + tallestGroup : 0;
        deviceInfo[deviceId] = {
            bands,
            groups,
            cardW: m ? m.w : 230,
            cardH,
            wrapperH,
            clientsWidth,
            clientsHeight,
            fullHeight: cardH + clientsHeight,
            ownWidth: Math.max(measured[deviceId] ? measured[deviceId].w : 230, clientsWidth)
        };
    });

    // Recursive subtree width
    // Clients and sub-satellite subtrees are placed side-by-side (not overlapping)
    function subtreeWidth(deviceId) {
        const info = deviceInfo[deviceId];
        if (!info) return 230;
        const childSats = TOPOLOGY.satellites.filter(s => s.parentId === deviceId);
        if (childSats.length === 0) return info.ownWidth;
        const childSatW = childSats.reduce((sum, s) => sum + subtreeWidth(s.id), 0)
            + (childSats.length - 1) * SUBTREE_GAP;
        // Child row: clients on left, sub-satellite subtrees on right
        const rowW = info.clientsWidth
            + (info.bands.length > 0 && childSats.length > 0 ? SUBTREE_GAP : 0)
            + childSatW;
        return Math.max(info.cardW, rowW);
    }

    // Gateway row width: band-group columns + satellite subtrees in one row
    const gwInfo = deviceInfo['gateway'];
    const rootSats = TOPOLOGY.satellites.filter(s => s.parentId === 'gateway');
    const totalSatW = rootSats.reduce((sum, s) => sum + subtreeWidth(s.id), 0)
        + (rootSats.length > 0 ? rootSats.length * SUBTREE_GAP : 0);
    const totalRowW = (gwInfo ? gwInfo.clientsWidth : 0)
        + (gwInfo && gwInfo.bands.length > 0 && rootSats.length > 0 ? SUBTREE_GAP : 0)
        + totalSatW;
    const canvasW = Math.max(totalRowW, 230) + MARGIN * 2;

    // Positions: { id: { left, top, w, h, cardTop, cardBottom, cardCx } }
    // left/top/w/h = wrapper element position (for DOM placement)
    // cardTop/cardBottom/cardCx = actual card edges (for connection drawing)
    const pos = {};

    function makePos(id, left, top) {
        const m = measured[id] || { w: 230, h: 140, cardOffsetTop: 0, cardH: 140, cardW: 230, cardCxOffset: 0 };
        const cx = left + m.w / 2;
        return {
            left, top, w: m.w, h: m.h, cx,
            cardTop: top + m.cardOffsetTop,
            cardBottom: top + m.cardOffsetTop + m.cardH,
            cardCx: cx + m.cardCxOffset
        };
    }

    // Primary WAN (wan1) — centered above gateway
    const wan1 = TOPOLOGY.wans[0];
    const wan1M = measured[wan1.id] || { w: 250, h: 125 };
    const inetTop = MARGIN;
    pos[wan1.id] = makePos(wan1.id, canvasW / 2 - wan1M.w / 2, inetTop);

    // Gateway
    const gwM = measured['gateway'] || { w: 230, h: 142 };
    const gwTop = pos[wan1.id].top + pos[wan1.id].h + INET_GAP;
    pos['gateway'] = makePos('gateway', canvasW / 2 - gwM.w / 2, gwTop);

    // Secondary WANs (wan2+) — positioned to the right of the primary cloud
    for (let i = 1; i < TOPOLOGY.wans.length; i++) {
        const wan = TOPOLOGY.wans[i];
        const wanM = measured[wan.id] || { w: 250, h: 125 };
        // Place to the right: gateway right edge + gap
        const wan2Left = canvasW / 2 + gwM.w / 2 + 60;
        pos[wan.id] = makePos(wan.id, wan2Left, inetTop);
    }

    // Children row: band-groups + satellite subtrees
    const childrenY = pos['gateway'].cardBottom + CLIENT_GAP;
    let cursorX = canvasW / 2 - totalRowW / 2;

    // Place gateway band-group columns
    if (gwInfo) {
        gwInfo.bands.forEach(band => {
            const gid = `gateway::${band}`;
            const gm = measuredGroups[gid] || { w: 140, h: 100 };
            bandGroupPositions[gid] = {
                x: cursorX + gm.w / 2, y: childrenY,
                width: gm.w, height: gm.h,
                band, parentDevice: 'gateway'
            };
            cursorX += gm.w + BAND_GAP;
        });
        if (gwInfo.bands.length > 0) cursorX += SUBTREE_GAP - BAND_GAP;
    }

    // Place satellite subtrees recursively
    // Clients go on the left of the child row, sub-satellite subtrees on the right
    function placeSatelliteSubtree(sat, left, top) {
        const info = deviceInfo[sat.id];
        if (!info) return;
        const stW = subtreeWidth(sat.id);
        const cx = left + stW / 2;
        const m = measured[sat.id] || { w: 230, h: 124 };

        pos[sat.id] = makePos(sat.id, cx - m.w / 2, top);

        const childSats = TOPOLOGY.satellites.filter(s => s.parentId === sat.id);
        const hasBoth = info.bands.length > 0 && childSats.length > 0;

        // Compute child row width (clients + gap + sub-sat subtrees)
        const childSatW = childSats.reduce((sum, cs) => sum + subtreeWidth(cs.id), 0)
            + (childSats.length > 0 ? (childSats.length - 1) * SUBTREE_GAP : 0);
        const rowW = info.clientsWidth
            + (hasBoth ? SUBTREE_GAP : 0)
            + childSatW;

        // Child row starts centered under parent
        const childrenY = pos[sat.id].cardBottom + CLIENT_GAP;
        let cursor = cx - rowW / 2;

        // Place client band-groups (left side of child row)
        if (info.bands.length > 0) {
            info.bands.forEach(band => {
                const gid = `${sat.id}::${band}`;
                const gm = measuredGroups[gid] || { w: 140, h: 100 };
                bandGroupPositions[gid] = {
                    x: cursor + gm.w / 2, y: childrenY,
                    width: gm.w, height: gm.h,
                    band, parentDevice: sat.id
                };
                cursor += gm.w + BAND_GAP;
            });
            if (hasBoth) cursor += SUBTREE_GAP - BAND_GAP;
        }

        // Place sub-satellite subtrees (right side of child row)
        if (childSats.length > 0) {
            const subTop = top + info.fullHeight + RANK_GAP;
            childSats.forEach(cs => {
                placeSatelliteSubtree(cs, cursor, subTop);
                cursor += subtreeWidth(cs.id) + SUBTREE_GAP;
            });
        }
    }

    rootSats.forEach(sat => {
        placeSatelliteSubtree(sat, cursorX, childrenY);
        cursorX += subtreeWidth(sat.id) + SUBTREE_GAP;
    });

    // ── Step 4: Center parents over children (bottom-up, computed) ──
    function shiftPos(p, dx) {
        p.left += dx; p.cx += dx; p.cardCx += dx;
    }

    function centerOverChildren(deviceId) {
        const childSats = TOPOLOGY.satellites.filter(s => s.parentId === deviceId);
        childSats.forEach(sat => centerOverChildren(sat.id));

        const p = pos[deviceId];
        if (!p) return;

        const childCenters = [];
        Object.entries(bandGroupPositions).forEach(([gid, gp]) => {
            if (gp.parentDevice === deviceId) childCenters.push(gp.x);
        });
        childSats.forEach(sat => {
            if (pos[sat.id]) childCenters.push(pos[sat.id].cardCx);
        });

        if (childCenters.length === 0) return;
        const targetCx = (Math.min(...childCenters) + Math.max(...childCenters)) / 2;
        const shift = targetCx - p.cardCx;
        if (Math.abs(shift) > 1) shiftPos(p, shift);
    }
    centerOverChildren('gateway');

    // Center primary WAN over Gateway (align card centers)
    const wan1Pos = pos[TOPOLOGY.wans[0]?.id];
    if (wan1Pos && pos['gateway']) {
        const shift = pos['gateway'].cardCx - wan1Pos.cardCx;
        if (Math.abs(shift) > 1) shiftPos(wan1Pos, shift);
    }

    // ── Step 5: Position elements from computed layout ──

    // Compute canvas size
    let maxRight = 0, maxBottom = 0;
    Object.values(pos).forEach(p => {
        const r = p.left + p.w;
        if (r > maxRight) maxRight = r;
        if (p.cardBottom > maxBottom) maxBottom = p.cardBottom;
    });
    Object.values(bandGroupPositions).forEach(p => {
        const r = p.x + p.width / 2;
        const b = p.y + p.height;
        if (r > maxRight) maxRight = r;
        if (b > maxBottom) maxBottom = b;
    });
    container.style.width = (maxRight + MARGIN) + 'px';
    container.style.height = (maxBottom + MARGIN) + 'px';

    // Place device cards at final positions
    Object.entries(deviceEls).forEach(([id, el]) => {
        const p = pos[id];
        if (!p) return;
        el.style.left = p.left + 'px';
        el.style.top = p.top + 'px';
        el.style.visibility = 'visible';
        container.appendChild(el);
    });

    // Place band-group elements
    if (!simplifiedView) {
        Object.entries(bandGroupEls).forEach(([groupId, el]) => {
            const p = bandGroupPositions[groupId];
            if (!p) return;
            el.style.left = (p.x - p.width / 2) + 'px';
            el.style.top = p.y + 'px';
            el.style.visibility = 'visible';
            container.appendChild(el);
        });
    }

    // ── Step 6: Build layout graph for layoutConnections() ──
    const g = new LayoutGraph();
    // Store positions using the actual final positions
    const wanIdSet = new Set(TOPOLOGY.wans.map(w => w.id));
    Object.entries(pos).forEach(([id, p]) => {
        g.setNode(id, { x: p.cardCx, top: p.cardTop, bottom: p.cardBottom, wrapperBottom: p.top + p.h, width: p.w, height: p.h, type: wanIdSet.has(id) ? 'internet' : 'device' });
    });
    TOPOLOGY.wans.forEach(w => g.setEdge(w.id, 'gateway'));
    function addEdges(parentId) {
        TOPOLOGY.satellites.filter(s => s.parentId === parentId).forEach(sat => {
            g.setEdge(parentId, sat.id);
            addEdges(sat.id);
        });
    }
    addEdges('gateway');
    layoutGraph = g;
}

function createBandGroupEl(groupId, nodeData) {
    const { band, clients, parentDevice } = nodeData;

    const group = document.createElement('div');
    group.className = 'band-group';
    group.dataset.band = band;
    group.dataset.parentDevice = parentDevice;
    group.dataset.groupId = groupId;

    const pillsContainer = document.createElement('div');
    pillsContainer.className = 'band-group-pills';

    const sorted = [...clients].sort((a, b) => {
        // Priority: active online > idle online > offline
        const aOff = a.status === 'offline' ? 2 : (a.idle ? 1 : 0);
        const bOff = b.status === 'offline' ? 2 : (b.idle ? 1 : 0);
        if (aOff !== bOff) return aOff - bOff;
        return (a.name || '').localeCompare(b.name || '');
    });

    sorted.forEach(client => {
        pillsContainer.appendChild(createClientPill(client));
    });

    group.appendChild(pillsContainer);
    return group;
}

// ── Rendering ──────────────────────────────────────
function init() {
    renderTopologyGraph();
    renderLegend();
    layoutConnections();
    updateClientActivityPulses();
    startAnimations();
    updateStats();
    bindEvents();
    TOPOLOGY.wans.forEach(w => resolveIsp(w));
    // Auto-center topology horizontally if content overflows
    requestAnimationFrame(() => {
        const container = document.getElementById('topologyContainer');
        if (container && container.scrollWidth > container.clientWidth) {
            container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
        }
    });
    window.addEventListener('resize', debounce(() => {
        layoutConnections();
    }, 100));
}

function createViewToggle() {
    const topBarRight = document.querySelector('.top-bar-right');
    if (!topBarRight) return;

    const btn = document.createElement('button');
    btn.className = 'view-toggle-btn';
    btn.id = 'viewToggle';
    btn.innerHTML = `<i class="ph-duotone ph-eye"></i> <span>Detailed</span>`;
    btn.addEventListener('click', () => {
        userToggledView = true;
        setSimplifiedView(!simplifiedView);
    });
    topBarRight.insertBefore(btn, topBarRight.firstChild);
}

function setSimplifiedView(enabled) {
    simplifiedView = enabled;
    const container = document.getElementById('topologyContainer');
    if (!container) return;

    container.classList.toggle('simplified', simplifiedView);

    // Update button
    const btn = document.getElementById('viewToggle');
    if (btn) {
        btn.innerHTML = simplifiedView
            ? `<i class="ph-duotone ph-eye-slash"></i> <span>Simplified</span>`
            : `<i class="ph-duotone ph-eye"></i> <span>Detailed</span>`;
        btn.classList.toggle('active', simplifiedView);
    }

    // Re-draw SVG (rate labels depend on state)
    layoutConnections();
}

function checkAutoSimplify() {
    if (userToggledView) return; // respect manual choice

    const hasOverlaps = detectOverlaps();
    if (hasOverlaps && !simplifiedView) {
        setSimplifiedView(true);
    } else if (!hasOverlaps && simplifiedView) {
        // Try switching back to detailed — but verify it fits
        setSimplifiedView(false);
        requestAnimationFrame(() => {
            if (detectOverlaps() && !userToggledView) {
                setSimplifiedView(true);
            }
        });
    }
}

function detectOverlaps() {
    const container = document.getElementById('topologyContainer');
    if (!container) return false;

    // 1. Horizontal overflow
    if (container.scrollWidth > container.clientWidth + 2) return true;

    // 2. Check device cards for overlap
    const cards = document.querySelectorAll('.device-card');
    const cardRects = Array.from(cards).map(c => c.getBoundingClientRect()).filter(r => r.width > 0);
    for (let i = 0; i < cardRects.length; i++) {
        for (let j = i + 1; j < cardRects.length; j++) {
            const a = cardRects[i], b = cardRects[j];
            if (a.right > b.left && b.right > a.left && a.bottom > b.top && b.bottom > a.top) {
                return true;
            }
        }
    }

    return false;
}


function createDeviceNode(device) {
    const node = document.createElement('div');
    node.className = 'device-node';
    node.dataset.id = device.id;

    const iconType = device.type === 'internet' ? 'internet' :
                     device.type === 'gateway' ? 'gateway' :
                     device.type === 'satellite' ? 'satellite' :
                     device.type || 'iot';

    const isManaged = device.type === 'gateway' || device.type === 'satellite';
    const isClient = !isManaged && device.type !== 'internet';
    const card = document.createElement('div');
    card.className = `device-card ${device.type}${isClient ? ' client' : ''}`;
    if (device.status === 'offline') {
        card.classList.add('offline-device');
    }

    // Set cloud stroke/glow color based on WAN status
    if (device.type === 'internet') {
        const wanColor = device.status === 'offline' ? 'var(--accent-red)' :
            device.status === 'standby' ? 'var(--accent-amber)' : 'var(--accent-green)';
        card.style.setProperty('--wan-stroke', device.status === 'offline'
            ? 'rgba(248, 113, 113, 0.45)' : device.status === 'standby'
            ? 'rgba(251, 191, 36, 0.45)' : 'rgba(52, 211, 153, 0.45)');
        card.style.setProperty('--wan-glow', device.status === 'offline'
            ? 'rgba(248, 113, 113, 0.2)' : device.status === 'standby'
            ? 'rgba(251, 191, 36, 0.2)' : 'rgba(52, 211, 153, 0.2)');
    }

    if (device.type === 'satellite') {
        // Satellite: backhaul bar at top, then same layout as gateway below
        if (device.backhaul) {
            const backhaulBar = document.createElement('div');
            backhaulBar.className = 'backhaul-bar';
            const isEthBackhaul = device.connectionType === 'ethernet';
            const statusVar = device.statusColor === 'green' ? 'var(--accent-green)' : device.statusColor === 'orange' ? 'var(--accent-amber)' : 'var(--accent-red)';

            if (isEthBackhaul) {
                const speedNum = parseInt(device.backhaul.speed) || 0;
                const speedLabel = speedNum >= 10000 ? '10Gbps' : speedNum >= 1000 ? '1Gbps' : device.backhaul.speed;
                backhaulBar.innerHTML = `<div class="bh-line-top"><span class="bh-label">Uplink:</span> <span class="bh-speed">${speedLabel}</span><span class="bh-health"><span class="bh-health-dot" style="background:${statusVar}"></span><span class="bh-snr" style="color:${statusVar}">Wired</span></span></div><div class="bh-line-bottom"><span class="bh-throughput">↓${formatBandwidth(device.throughput.down)}</span> <span class="bh-throughput">↑${formatBandwidth(device.throughput.up)}</span></div>`;
            } else {
                const band = device.backhaulBand || '5 GHz';
                const bandShort = band.includes('6') ? '6G' : band.includes('2.4') ? '2.4G' : '5G';
                const bhWifiVer = device.backhaul.wifiVersion || getWifiGen(device) || '';
                backhaulBar.innerHTML = `<div class="bh-line-top"><span class="bh-label">Uplink:</span> <span class="bh-band">${bandShort}</span> <span class="bh-speed">${device.backhaul.speed}</span>${bhWifiVer ? `<span class="bh-wifi-ver">Wi-Fi ${bhWifiVer}</span>` : ''}<span class="bh-health"><span class="bh-health-dot" style="background:${statusVar}"></span><span class="bh-snr" style="color:${statusVar}">SNR ${device.backhaul.snr}</span></span></div><div class="bh-line-bottom"><span class="bh-throughput">↓${formatBandwidth(device.throughput.down)}</span> <span class="bh-throughput">↑${formatBandwidth(device.throughput.up)}</span></div>`;
            }
            card.appendChild(backhaulBar);
        }

        // Same layout as gateway: status, type tag, managed badge (absolute positioned)
        const status = document.createElement('div');
        status.className = `device-status ${device.status}`;
        status.textContent = device.status === 'online' ? 'ONLINE' : 'OFFLINE';
        card.appendChild(status);

        if (device.modelDesc) {
            const desc = document.createElement('div');
            desc.className = 'device-type-tag';
            desc.textContent = device.modelDesc.toUpperCase();
            card.appendChild(desc);
        }

        const managedBadge = document.createElement('div');
        managedBadge.className = 'managed-badge';
        managedBadge.innerHTML = `
            <img src="adtran-logo-white.svg" alt="Adtran">
            <span class="model-number">${device.model || ''}</span>
        `;
        card.appendChild(managedBadge);
    } else {
        // Gateway + Internet: original absolute-positioned layout
        const status = document.createElement('div');
        status.className = `device-status ${device.status}`;
        status.textContent = device.status === 'online' ? 'ONLINE' : 'OFFLINE';
        card.appendChild(status);

        if (isManaged && device.modelDesc) {
            const desc = document.createElement('div');
            desc.className = 'device-type-tag';
            desc.textContent = device.modelDesc.toUpperCase();
            card.appendChild(desc);
        }

        if (isManaged) {
            const managedBadge = document.createElement('div');
            managedBadge.className = 'managed-badge';
            managedBadge.innerHTML = `
                <img src="adtran-logo-white.svg" alt="Adtran">
                <span class="model-number">${device.model || ''}</span>
            `;
            card.appendChild(managedBadge);
        }
    }

    // Icon — only for client devices (not internet, not managed gateway/satellite)
    if (!isManaged && device.type !== 'internet') {
        const icon = document.createElement('div');
        icon.className = 'device-icon';
        icon.innerHTML = ICONS[iconType] || ICONS.iot;
        card.appendChild(icon);
    }

    // Name
    const name = document.createElement('div');
    name.className = 'device-name';
    name.textContent = (device.type === 'internet' && device.isp) ? device.isp : device.name;
    card.appendChild(name);

    // IP
    if (device.ip) {
        const ip = document.createElement('div');
        ip.className = 'device-ip';
        ip.textContent = device.type === 'internet' ? device.wanIp : device.ip;
        card.appendChild(ip);
    }

    // Meta info (varies by type)
    const meta = document.createElement('div');
    meta.className = 'device-meta';

    if (device.type === 'internet') {
        meta.innerHTML = `
            <div class="device-meta-item"><span>↓</span> <span class="value">${device.downloadSpeed} Mbps</span></div>
            <div class="device-meta-item"><span>↑</span> <span class="value">${device.uploadSpeed} Mbps</span></div>
            <div class="device-meta-item"><span>RTT</span> <span class="value">${device.latency}ms</span></div>
        `;
    } else if (device.type === 'gateway') {
        const totalClients = TOPOLOGY.clients.length;
        meta.innerHTML = `
            <div class="device-meta-item"><span>↓</span> <span class="value">${formatBandwidth(device.throughput.down)}</span></div>
            <div class="device-meta-item"><span>↑</span> <span class="value">${formatBandwidth(device.throughput.up)}</span></div>
            <div class="device-meta-item"><span>CPU</span> <span class="value">${device.cpu}%</span></div>
        `;
        // Client count badge
        const badge = document.createElement('div');
        badge.className = 'client-count-badge';
        badge.textContent = `${totalClients} CLIENTS`;
        card.appendChild(badge);

        // WAN failover badge (if any WAN is down and failover mode active)
        const downWans = TOPOLOGY.wans.filter(w => w.status === 'offline');
        const hasFailover = TOPOLOGY.wans.some(w => w.wanMode === 'failover') && downWans.length > 0 && downWans.length < TOPOLOGY.wans.length;
        if (hasFailover) {
            const foBadge = document.createElement('div');
            foBadge.className = 'wan-failover-badge';
            foBadge.textContent = 'FAILOVER';
            card.appendChild(foBadge);
        }
    } else if (device.type === 'satellite') {
        const satClients = TOPOLOGY.clients.filter(c => c.parentId === device.id).length;
        // Throughput is now shown in backhaul bar at top — no meta needed
        const badge = document.createElement('div');
        badge.className = 'client-count-badge';
        badge.textContent = `${satClients} CLIENTS`;
        card.appendChild(badge);
    } else {
        // Client device
        const down = device.activity?.down || 0;
        const up = device.activity?.up || 0;
        if (down > 0 || up > 0) {
            meta.innerHTML = `
                <div class="device-meta-item"><span>↓</span> <span class="value">${formatBandwidth(down)}</span></div>
                <div class="device-meta-item"><span>↑</span> <span class="value">${formatBandwidth(up)}</span></div>
            `;
        }
        if (device.rssi) {
            meta.innerHTML += `<div class="device-meta-item"><span>RSSI</span> <span class="value">${device.rssi} dBm</span></div>`;
        }
    }

    card.appendChild(meta);

    node.appendChild(card);

    // Hover handler — highlight related connections
    node.addEventListener('mouseenter', () => {
        document.querySelectorAll('.connection-group').forEach(g => {
            if (g.dataset.from === device.id || g.dataset.to === device.id) {
                g.classList.add('device-hover');
            }
        });
    });
    node.addEventListener('mouseleave', () => {
        document.querySelectorAll('.connection-group.device-hover').forEach(g => {
            g.classList.remove('device-hover');
        });
    });

    // Click handler
    node.addEventListener('click', (e) => {
        e.stopPropagation();
        selectDevice(device.id);
    });

    return node;
}

// ── WiFi Generation Helper ────────────────────────
function getWifiGen(device) {
    if (device.connection === 'ethernet') return null;
    if (device.wifiVersion === '7') return '7';
    if (device.wifiVersion) return device.wifiVersion;
    if (device.band && device.band.includes('6')) return '6E';
    if (device.rxRate >= 1200) return '6';
    if (device.rxRate >= 400) return '5';
    return '4';
}

// ── Client Pills ──────────────────────────────────
function createClientPill(device) {
    const node = document.createElement('div');
    node.className = 'device-node client-node';
    node.dataset.id = device.id;

    const pill = document.createElement('div');
    const pillState = device.status === 'offline' ? ' offline' : (device.idle ? ' idle' : '');
    pill.className = 'client-pill' + pillState;

    // RSSI-based border color
    pill.style.borderColor = getRssiColor(device);

    // Icon + name
    const iconType = device.type || 'iot';
    const iconHtml = ICONS[iconType] || ICONS.iot;
    let badge;
    if (device.status === 'offline') {
        badge = `<span class="pill-wifi-badge pill-offline-badge">OFFLINE</span>`;
    } else {
        const wifiGen = getWifiGen(device);
        badge = wifiGen ? `<span class="pill-wifi-badge wifi-${wifiGen.toLowerCase()}"><span class="pill-wifi-prefix">Wi-Fi </span>${wifiGen}</span>` : '';
    }
    pill.innerHTML = `<span class="pill-icon">${iconHtml}</span><span class="pill-name">${device.name}</span>${badge}`;

    node.appendChild(pill);

    // Click handler — opens detail panel
    node.addEventListener('click', (e) => {
        e.stopPropagation();
        selectDevice(device.id);
    });

    // Hover handler — highlight related connections + tooltip
    node.addEventListener('mouseenter', () => {
        document.querySelectorAll('.connection-group').forEach(g => {
            if (g.dataset.from === device.id || g.dataset.to === device.id) {
                g.classList.add('device-hover');
            }
        });
        showClientTooltip(device, pill);
    });
    node.addEventListener('mouseleave', () => {
        document.querySelectorAll('.connection-group.device-hover').forEach(g => {
            g.classList.remove('device-hover');
        });
        scheduleHideTooltip();
    });

    return node;
}

// ── Client Tooltip ───────────────────────────────
let tooltipEl = null;
let tooltipShowTimer = null;
let tooltipHideTimer = null;
let currentTooltipTarget = null;

function getOrCreateTooltip() {
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'client-tooltip';
        tooltipEl.addEventListener('mouseenter', () => {
            clearTimeout(tooltipHideTimer);
        });
        tooltipEl.addEventListener('mouseleave', () => {
            scheduleHideTooltip();
        });
        document.body.appendChild(tooltipEl);
    }
    return tooltipEl;
}

function showClientTooltip(device, pillEl) {
    clearTimeout(tooltipHideTimer);

    // If switching to a different pill, show instantly
    const isSwitch = currentTooltipTarget && currentTooltipTarget !== pillEl && tooltipEl?.classList.contains('visible');

    clearTimeout(tooltipShowTimer);
    currentTooltipTarget = pillEl;

    const delay = isSwitch ? 0 : 180;

    tooltipShowTimer = setTimeout(() => {
        const tip = getOrCreateTooltip();
        const isWired = device.connection === 'ethernet';
        const band = isWired ? 'Ethernet' : (device.band || '—');
        const rssiText = device.rssi ? `${device.rssi} dBm` : '—';
        const signalLabel = device.rssi ? rssiToQuality(device.rssi) : '';
        const signalColor = device.rssi
            ? (device.rssi >= -50 ? 'var(--accent-green)' : device.rssi >= -60 ? 'var(--accent-amber)' : 'var(--accent-red)')
            : 'var(--text-muted)';
        const down = device.activity?.down || 0;
        const up = device.activity?.up || 0;
        const qoe = computeQoE(device);
        const qColor = qoeColor(qoe);
        const qLabel = qoeLabel(qoe);

        // Band badge color
        const bandColor = isWired ? 'var(--accent-cyan)' :
            band.includes('6') ? 'var(--accent-green)' :
            band.includes('2.4') ? 'var(--accent-amber)' : 'var(--accent-purple)';

        tip.innerHTML = `
            <div class="tt-header">
                <span class="tt-name">${device.name}</span>
                <span class="tt-type">${device.type || 'device'}</span>
            </div>
            <div class="tt-qoe">
                <span class="tt-qoe-score" style="color:${qColor}">${qoe}</span>
                <span class="tt-qoe-details">
                    <span class="tt-qoe-label" style="color:${qColor}">${qLabel}</span>
                    <span class="tt-qoe-sub">QoE Score</span>
                </span>
                <span class="tt-band-badge" style="border-color:${bandColor};color:${bandColor}">${isWired ? 'Ethernet' : (getWifiGen(device) ? `Wi-Fi ${getWifiGen(device)}` : band)}</span>
            </div>
            ${device.qoeBreakdown ? `<div class="tt-qoe-breakdown">
                ${['SNR', 'PHY', 'Stab', 'Ret', 'Air'].map((label, i) => {
                    const val = [device.qoeBreakdown.snr, device.qoeBreakdown.phyRate, device.qoeBreakdown.stability, device.qoeBreakdown.retransmission, device.qoeBreakdown.airtime][i];
                    if (val == null) return '';
                    const c = val >= 70 ? 'var(--accent-green)' : val >= 40 ? 'var(--accent-amber)' : 'var(--accent-red)';
                    return `<div class="tt-bar-item"><span class="tt-bar-label">${label}</span><span class="tt-bar-track"><span class="tt-bar-fill" style="width:${val}%;background:${c}"></span></span><span class="tt-bar-val" style="color:${c}">${val}</span></div>`;
                }).join('')}
            </div>` : ''}
            <div class="tt-qoe-sparkline">
                <span class="tt-qoe-sparkline-label">QoE · 1hr</span>
                ${renderQoESparklineSVG(generateQoEHistory(device), 200, 32, { showThresholds: true, showHeatmap: false })}
            </div>
            <div class="tt-grid">
                <span class="tt-label">IP</span><span class="tt-value">${device.ip || '—'}</span>
                <span class="tt-label">MAC</span><span class="tt-value">${device.mac || '—'}</span>
                ${!isWired ? `<span class="tt-label">RSSI</span><span class="tt-value"><span style="color:${signalColor}">${rssiText}</span> · ${signalLabel}</span>` : ''}
                ${isWired && device.lanPort ? `<span class="tt-label">Port</span><span class="tt-value">${device.lanPort}</span>` : ''}
                <span class="tt-label">Rate</span><span class="tt-value">↓${device.rxRate || 0} / ↑${device.txRate || 0} Mbps</span>
                <span class="tt-label">Traffic</span><span class="tt-value">${down > 0 || up > 0 ? `<span style="color:var(--accent-cyan)">↓${formatBandwidth(down)}</span> <span style="color:var(--accent-purple)">↑${formatBandwidth(up)}</span>` : '<span style="color:var(--text-muted)">Idle</span>'}</span>
                <span class="tt-label">Uptime</span><span class="tt-value">${device.connectedSince || '—'}</span>
            </div>
        `;

        // Position centered above the pill
        const pillRect = pillEl.getBoundingClientRect();
        const container = document.querySelector('.topology-container');
        const containerRect = container.getBoundingClientRect();

        tip.style.visibility = 'hidden';
        tip.classList.add('visible');

        // Measure tooltip
        const tipRect = tip.getBoundingClientRect();
        let left = pillRect.left + pillRect.width / 2 - tipRect.width / 2;
        let top = pillRect.top - tipRect.height - 8;

        // Clamp to viewport
        if (left < containerRect.left + 4) left = containerRect.left + 4;
        if (left + tipRect.width > containerRect.right - 4) left = containerRect.right - 4 - tipRect.width;
        if (top < containerRect.top + 4) {
            top = pillRect.bottom + 8; // flip below if no room above
            tip.classList.add('below');
        } else {
            tip.classList.remove('below');
        }

        tip.style.left = left + 'px';
        tip.style.top = top + 'px';
        tip.style.visibility = '';
    }, delay);
}

function scheduleHideTooltip() {
    clearTimeout(tooltipShowTimer);
    tooltipHideTimer = setTimeout(() => {
        if (tooltipEl) {
            tooltipEl.classList.remove('visible');
            currentTooltipTarget = null;
        }
    }, 300);
}

function getRssiColor(device) {
    if (device.connection === 'ethernet') return 'var(--accent-green)';
    const rssi = device.rssi;
    if (!rssi) return 'var(--border-color)';
    if (rssi >= -40) return 'var(--accent-green)';    // Excellent
    if (rssi >= -50) return 'var(--accent-green)';    // Good
    if (rssi >= -60) return 'var(--accent-amber)';    // Fair
    if (rssi >= -70) return '#f97316';                 // Weak (orange)
    return 'var(--accent-red)';                        // Poor
}

// ── Connection type colors ────────────────────────
const CONN_COLORS = {
    ethernet: '#22d3ee',  // cyan
    'wifi-5': '#a78bfa',  // purple
    'wifi-24': '#fbbf24', // amber
    'wifi-6': '#34d399',  // green
};

// ── Connection Lines (bus connectors, infrastructure only) ────────
function layoutConnections() {
    const svg = document.getElementById('topologySvg');
    const nodesEl = document.getElementById('topologyNodes');

    svg.style.width = nodesEl.scrollWidth + 'px';
    svg.style.height = nodesEl.scrollHeight + 'px';

    // Clear all existing
    svg.querySelectorAll('.bus-group').forEach(g => g.remove());
    connections = [];

    if (!layoutGraph) return;
    const graph = layoutGraph;

    const master = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    master.classList.add('bus-group');

    // Helper: draw a line segment (returns the SVG element)
    function line(x1, y1, x2, y2, color, width) {
        const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l.setAttribute('x1', x1); l.setAttribute('y1', y1);
        l.setAttribute('x2', x2); l.setAttribute('y2', y2);
        l.style.stroke = color;
        l.style.strokeWidth = width || 2;
        l.classList.add('infra-line');
        master.appendChild(l);
        return l;
    }

    // Helper: draw a band label tag (colored rect + text) on the bus
    function bandTag(cx, cy, label, color) {
        const tg = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        tg.classList.add('bus-tag');

        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.setAttribute('x', cx);
        textEl.setAttribute('y', cy);
        textEl.setAttribute('text-anchor', 'middle');
        textEl.setAttribute('dominant-baseline', 'central');
        textEl.setAttribute('font-size', '9');
        textEl.setAttribute('font-family', 'var(--font-mono)');
        textEl.setAttribute('font-weight', '600');
        textEl.textContent = label;

        const tw = label.length * 5.5 + 12;
        const th = 16;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', cx - tw / 2);
        rect.setAttribute('y', cy - th / 2);
        rect.setAttribute('width', tw);
        rect.setAttribute('height', th);
        rect.setAttribute('rx', 8);
        rect.style.fill = '#000';
        rect.style.stroke = color;
        rect.style.strokeWidth = '1.5';

        textEl.style.fill = color;

        tg.appendChild(rect);
        tg.appendChild(textEl);
        master.appendChild(tg);
    }

    // Helper: get connection color info for a satellite
    function satConnInfo(sat) {
        if (sat.connectionType === 'ethernet') return { connType: 'ethernet', label: '10GbE' };
        const band = sat.backhaulBand || '5 GHz';
        if (band.includes('6')) return { connType: 'wifi-6', label: '6GHZ-MESH' };
        if (band.includes('2.4')) return { connType: 'wifi-24', label: '2.4GHZ-MESH' };
        return { connType: 'wifi-5', label: '5GHZ-MESH' };
    }

    // INFRA LINE CONTRACT: busY = nearestChildTop - 34 → three 9px gaps (trunk, bus-to-tag, tag-to-element).
    // tagY = childTop - 17 (tag height 16px centered → bottom at childTop-9 → 9px gap to child).
    function drawParentBus(parentCx, parentBottom, dests) {
        if (dests.length === 0) return;

        const nearestY = Math.min(...dests.map(d => d.y));
        const busY = Math.max(nearestY - 34, parentBottom + 4);

        // Vertical trunk
        line(parentCx, parentBottom, parentCx, busY, '#4b5563', 1.5);

        // Horizontal bus
        const allX = dests.map(d => d.x);
        const minX = Math.min(...allX);
        const maxX = Math.max(...allX);
        if (maxX > minX) line(minX, busY, maxX, busY, '#4b5563', 1.5);

        // Drops + tags
        dests.forEach(d => {
            const color = CONN_COLORS[d.connType] || CONN_COLORS.ethernet;
            line(d.x, busY, d.x, d.y, color, 2);
            const tagY = d.y - 17;
            bandTag(d.x, tagY, d.label, color);
        });
    }

    // === 1. WAN → Gateway connections ===
    const gwNode = graph.node('gateway');
    if (gwNode) {
        // Compute shared tag Y from primary WAN (all tags at same height)
        const wan1Node = graph.node(TOPOLOGY.wans[0]?.id);
        const sharedTagY = wan1Node ? (wan1Node.wrapperBottom + gwNode.top) / 2 : gwNode.top - 20;

        TOPOLOGY.wans.forEach((wan, idx) => {
            const wanNode = graph.node(wan.id);
            if (!wanNode) return;

            const isDown = wan.status === 'offline';
            // Status-based WAN colors: green=active, amber=standby, red=down
            const color = isDown ? 'var(--accent-red)' :
                wan.status === 'standby' ? 'var(--accent-amber)' :
                'var(--accent-green)';

            if (idx === 0) {
                // Primary WAN: vertical line from cloud bottom to gateway top
                const l = line(wanNode.x, wanNode.bottom, gwNode.x, gwNode.top, color);
                if (isDown) { l.style.strokeDasharray = '6 4'; l.style.opacity = '0.5'; }
                bandTag(wanNode.x, sharedTagY, wan.wanType || 'WAN', color);
            } else {
                // Secondary WAN: right-angle elbow from gateway right edge up to cloud
                const gwCardRight = gwNode.x + gwNode.width / 2;
                const gwMidY = (gwNode.top + gwNode.bottom) / 2;
                const elbowX = wanNode.x; // cloud center X
                // Horizontal segment: gateway card right edge → elbow
                const h = line(gwCardRight, gwMidY, elbowX, gwMidY, color);
                // Vertical segment: elbow up → cloud bottom
                const v = line(elbowX, gwMidY, elbowX, wanNode.bottom, color);
                if (isDown) {
                    [h, v].forEach(seg => { seg.style.strokeDasharray = '6 4'; seg.style.opacity = '0.5'; });
                }
                // Tag at same height as primary WAN tag
                bandTag(elbowX, sharedTagY, wan.wanType || 'WAN', color);
            }
        });
    }

    // === 2. Recursive device bus drawing ===
    function drawDeviceBus(deviceId) {
        const deviceNode = graph.node(deviceId);
        if (!deviceNode) return;

        const parentCx = deviceNode.x;
        const cardBottom = deviceNode.bottom;

        // Satellite children
        const satDests = [];
        const successors = graph.successors(deviceId) || [];
        successors.forEach(childId => {
            const childNode = graph.node(childId);
            if (!childNode || childNode.type !== 'device') return;
            const sat = TOPOLOGY.satellites.find(s => s.id === childId);
            if (sat) {
                const ci = satConnInfo(sat);
                satDests.push({ x: childNode.x, y: childNode.top, connType: ci.connType, label: ci.label });
            }
        });

        // Client band-group children
        const clientDests = [];
        if (!simplifiedView) {
            Object.keys(bandGroupPositions).forEach(groupId => {
                const pos = bandGroupPositions[groupId];
                if (pos.parentDevice !== deviceId) return;
                const bandText = pos.band === 'Ethernet' ? 'LAN' : pos.band;
                const connType = pos.band === 'Ethernet' ? 'ethernet' :
                    pos.band.includes('2.4') ? 'wifi-24' :
                    pos.band.includes('6') ? 'wifi-6' : 'wifi-5';
                clientDests.push({ x: pos.x, y: pos.y, connType, label: bandText });
            });
        }

        // All children share one bus
        const allDests = [...satDests, ...clientDests];
        if (allDests.length > 0) drawParentBus(parentCx, cardBottom, allDests);

        // Recurse into satellite children
        successors.forEach(childId => {
            const childNode = graph.node(childId);
            if (childNode && childNode.type === 'device') {
                drawDeviceBus(childId);
            }
        });
    }

    drawDeviceBus('gateway');

    svg.appendChild(master);

    // Verify connection integrity
    verifyConnections(svg, nodesEl);
}

// Checks that every SVG infra-line endpoint connects to an element edge or another line.
// Logs warnings to console for any disconnected endpoints (gap > tolerance).
function verifyConnections(svg, nodesEl) {
    const container = nodesEl.closest('.topology-container');
    if (!container) return;
    const lines = Array.from(svg.querySelectorAll('.infra-line'));
    if (lines.length === 0) return;

    const T = 5; // tolerance in px

    function getR(el) {
        const r = el.getBoundingClientRect();
        const cr = container.getBoundingClientRect();
        return {
            l: r.left - cr.left + container.scrollLeft,
            t: r.top - cr.top + container.scrollTop,
            r: r.right - cr.left + container.scrollLeft,
            b: r.bottom - cr.top + container.scrollTop
        };
    }

    // Collect element edges (device cards + band groups)
    const edges = [];
    nodesEl.querySelectorAll('.device-node').forEach(n => {
        const card = n.querySelector('.device-card');
        if (!card) return;
        const r = getR(card);
        edges.push({ id: n.dataset.id, ...r });
    });
    nodesEl.querySelectorAll('.band-group').forEach(bg => {
        const r = getR(bg);
        edges.push({ id: bg.dataset.groupId, ...r });
    });

    function matchesEdge(x, y) {
        for (const e of edges) {
            if (Math.abs(y - e.t) < T && x >= e.l - T && x <= e.r + T) return true; // top edge
            if (Math.abs(y - e.b) < T && x >= e.l - T && x <= e.r + T) return true; // bottom edge
            if (Math.abs(x - e.l) < T && y >= e.t - T && y <= e.b + T) return true; // left edge
            if (Math.abs(x - e.r) < T && y >= e.t - T && y <= e.b + T) return true; // right edge
        }
        return false;
    }

    function matchesLine(x, y, skipIdx) {
        for (let j = 0; j < lines.length; j++) {
            if (j === skipIdx) continue;
            const ox1 = lines[j].x1.baseVal.value, oy1 = lines[j].y1.baseVal.value;
            const ox2 = lines[j].x2.baseVal.value, oy2 = lines[j].y2.baseVal.value;
            if (oy1 === oy2) { // horizontal
                const mn = Math.min(ox1, ox2), mx = Math.max(ox1, ox2);
                if (Math.abs(y - oy1) < 2 && x >= mn - 1 && x <= mx + 1) return true;
            }
            if (ox1 === ox2) { // vertical
                const mn = Math.min(oy1, oy2), mx = Math.max(oy1, oy2);
                if (Math.abs(x - ox1) < 2 && y >= mn - 1 && y <= mx + 1) return true;
            }
        }
        return false;
    }

    let issues = 0;
    lines.forEach((line, i) => {
        const x1 = line.x1.baseVal.value, y1 = line.y1.baseVal.value;
        const x2 = line.x2.baseVal.value, y2 = line.y2.baseVal.value;
        if (!matchesEdge(x1, y1) && !matchesLine(x1, y1, i)) {
            console.warn(`[ConnCheck] Line ${i} endpoint1 (${x1},${y1}) disconnected`);
            issues++;
        }
        if (!matchesEdge(x2, y2) && !matchesLine(x2, y2, i)) {
            console.warn(`[ConnCheck] Line ${i} endpoint2 (${x2},${y2}) disconnected`);
            issues++;
        }
    });
    // Check for diagonal lines (all lines must be strictly horizontal or vertical)
    lines.forEach((line, i) => {
        const x1 = line.x1.baseVal.value, y1 = line.y1.baseVal.value;
        const x2 = line.x2.baseVal.value, y2 = line.y2.baseVal.value;
        if (Math.abs(x1 - x2) > 1 && Math.abs(y1 - y2) > 1) {
            console.warn(`[ConnCheck] Line ${i} is DIAGONAL: (${x1},${y1})→(${x2},${y2})`);
            issues++;
        }
    });

    if (issues > 0) {
        console.warn(`[ConnCheck] ${issues} issue(s) found in ${lines.length} lines`);
    }
}

// ── Animations ─────────────────────────────────────
let liveAnimationInterval = null;

function startAnimations() {
    stopAnimations(); // clear any existing interval
    // CSS handles the flow animation via stroke-dashoffset
    // We add subtle "pulse" randomization to traffic values
    liveAnimationInterval = setInterval(() => {
        // Slightly randomize traffic for liveliness
        TOPOLOGY.clients.forEach(client => {
            if (client.idle) {
                client.activity.down = 0;
                client.activity.up = 0;
                return;
            }
            if (client.activity) {
                const base = client._baseActivity || (client._baseActivity = { ...client.activity });
                client.activity.down = Math.max(0, base.down + (Math.random() - 0.5) * base.down * 0.2);
                client.activity.up = Math.max(0, base.up + (Math.random() - 0.5) * base.up * 0.2);
            }
        });
        // Re-aggregate gateway/satellite throughput (bottom-up for multi-hop)
        // Process leaves first by sorting satellites by descending hop count
        const sortedSats = [...TOPOLOGY.satellites].sort((a, b) => (b.hops || 1) - (a.hops || 1));
        sortedSats.forEach(sat => {
            const directClients = TOPOLOGY.clients.filter(c => c.parentId === sat.id);
            const childSats = TOPOLOGY.satellites.filter(s => s.parentId === sat.id);
            sat.throughput.down = directClients.reduce((s, c) => s + (c.activity?.down || 0), 0)
                               + childSats.reduce((s, cs) => s + (cs.throughput?.down || 0), 0);
            sat.throughput.up = directClients.reduce((s, c) => s + (c.activity?.up || 0), 0)
                              + childSats.reduce((s, cs) => s + (cs.throughput?.up || 0), 0);
        });
        const gwDirectClients = TOPOLOGY.clients.filter(c => c.parentId === 'gateway');
        const gwRootSats = TOPOLOGY.satellites.filter(s => s.parentId === 'gateway');
        TOPOLOGY.gateway.throughput.down = gwDirectClients.reduce((s, c) => s + (c.activity?.down || 0), 0)
                                         + gwRootSats.reduce((s, sat) => s + (sat.throughput?.down || 0), 0);
        TOPOLOGY.gateway.throughput.up = gwDirectClients.reduce((s, c) => s + (c.activity?.up || 0), 0)
                                        + gwRootSats.reduce((s, sat) => s + (sat.throughput?.up || 0), 0);

        updateStats();
        updateConnectionLabels();
        updateClientActivityPulses();
        if (currentView === 'clients') updateClientsTableThroughput();
    }, 3000);
}

function stopAnimations() {
    if (liveAnimationInterval) {
        clearInterval(liveAnimationInterval);
        liveAnimationInterval = null;
    }
}

function updateClientActivityPulses() {
    // Activity pulse animations removed — kept as no-op for call compatibility
}

function updateConnectionLabels() {
    document.querySelectorAll('.connection-group').forEach(g => {
        const fromId = g.dataset.from;
        const toId = g.dataset.to;
        const label = g.querySelector('.bandwidth-label');
        const flowLine = g.querySelector('.flow-line');
        if (!label || !flowLine) return;

        let down = 0, up = 0;
        // Find traffic for this connection
        if (toId === 'gateway') {
            down = TOPOLOGY.gateway.throughput.down;
            up = TOPOLOGY.gateway.throughput.up;
        } else {
            const sat = TOPOLOGY.satellites.find(s => s.id === toId);
            if (sat) {
                down = sat.throughput.down;
                up = sat.throughput.up;
            } else {
                const client = TOPOLOGY.clients.find(c => c.id === toId);
                if (client) {
                    down = client.activity?.down || 0;
                    up = client.activity?.up || 0;
                }
            }
        }

        label.textContent = `↓${formatBandwidth(down)} ↑${formatBandwidth(up)}`;

        // Update direction
        const isDownstream = down >= up;
        flowLine.classList.toggle('downstream', isDownstream);
        flowLine.classList.toggle('upstream', !isDownstream);

        // Update width
        const totalTraffic = down + up;
        const maxTraffic = 300;
        const lineWidth = Math.max(1.5, Math.min(6, (totalTraffic / maxTraffic) * 6));
        flowLine.style.strokeWidth = lineWidth;

        const speed = Math.max(0.5, 3 - (totalTraffic / maxTraffic) * 2.5);
        flowLine.style.animationDuration = speed + 's';
    });
}

// ── Stats ──────────────────────────────────────────
function updateStats() {
    const deviceCount = 1 + TOPOLOGY.satellites.length; // gateway + satellites
    const clientCount = TOPOLOGY.clients.length;
    const totalDown = TOPOLOGY.gateway.throughput.down;
    const totalUp = TOPOLOGY.gateway.throughput.up;

    document.getElementById('deviceCount').textContent = deviceCount;
    document.getElementById('clientCount').textContent = clientCount;
    document.getElementById('totalThroughput').textContent = `↓${formatBandwidth(totalDown)} ↑${formatBandwidth(totalUp)}`;

    // Update system status badge based on WAN state
    const statusEl = document.getElementById('systemStatus');
    if (statusEl) {
        const downWans = TOPOLOGY.wans.filter(w => w.status === 'offline');
        const allDown = downWans.length === TOPOLOGY.wans.length;
        const hasFailover = TOPOLOGY.wans.some(w => w.wanMode === 'failover') && downWans.length > 0 && !allDown;

        statusEl.classList.remove('badge-online', 'badge-warning', 'badge-error');
        if (allDown) {
            statusEl.textContent = 'WAN Offline';
            statusEl.classList.add('badge-error');
        } else if (hasFailover) {
            statusEl.textContent = 'WAN Failover Active';
            statusEl.classList.add('badge-warning');
        } else {
            statusEl.textContent = 'All Systems Online';
            statusEl.classList.add('badge-online');
        }
    }
}

// ── Detail Panel ───────────────────────────────────
function selectDevice(id) {
    selectedDeviceId = id;
    const panel = document.getElementById('detailPanel');
    const title = document.getElementById('detailTitle');
    const body = document.getElementById('detailBody');

    // Find device
    let device = TOPOLOGY.wans.find(w => w.id === id);
    if (!device) device = id === 'gateway' ? TOPOLOGY.gateway :
        (TOPOLOGY.satellites.find(s => s.id === id) || TOPOLOGY.clients.find(c => c.id === id));

    if (!device) return;

    // Highlight selected
    document.querySelectorAll('.device-node').forEach(n => n.classList.remove('selected'));
    const nodeEl = document.querySelector(`.device-node[data-id="${id}"]`);
    if (nodeEl) nodeEl.classList.add('selected');
    // Also highlight in clients table
    document.querySelectorAll('.clients-row').forEach(r => r.classList.remove('selected'));
    const rowEl = document.querySelector(`.clients-row[data-id="${id}"]`);
    if (rowEl) rowEl.classList.add('selected');

    title.textContent = device.name;
    body.innerHTML = renderDeviceDetail(device);
    panel.classList.add('open');
    bindDetailSparklineHover(device);
}

function closeDetail() {
    document.getElementById('detailPanel').classList.remove('open');
    document.querySelectorAll('.device-node').forEach(n => n.classList.remove('selected'));
    selectedDeviceId = null;
}

function renderDeviceDetail(device) {
    let html = '';

    // About section
    html += '<div class="detail-section">';
    html += '<div class="detail-section-title">About</div>';

    const aboutRows = [];
    if (device.model) aboutRows.push(['Model', device.model]);
    if (device.mac) aboutRows.push(['MAC', device.mac]);
    if (device.ip) aboutRows.push(['IP Address', device.type === 'internet' ? device.wanIp : device.ip]);
    if (device.firmware) aboutRows.push(['Firmware', device.firmware]);
    if (device.isp) aboutRows.push(['ISP', device.isp]);
    if (device.uptime) aboutRows.push(['Uptime', device.uptime]);
    if (device.connectedSince) aboutRows.push(['Connected', device.connectedSince]);
    if (device.status) aboutRows.push(['Status', `<span style="color: ${device.status === 'online' ? 'var(--accent-green)' : 'var(--accent-red)'}">${device.status}</span>`]);

    aboutRows.forEach(([label, value]) => {
        html += `<div class="detail-row"><span class="label">${label}</span><span class="value">${value}</span></div>`;
    });
    html += '</div>';

    // WAN info for internet-type devices
    if (device.type === 'internet') {
        html += '<div class="detail-section">';
        html += '<div class="detail-section-title">WAN</div>';
        if (device.wanType) html += `<div class="detail-row"><span class="label">Type</span><span class="value">${device.wanType}</span></div>`;
        if (device.role) html += `<div class="detail-row"><span class="label">Role</span><span class="value" style="text-transform:capitalize">${device.role}</span></div>`;
        if (device.wanMode) html += `<div class="detail-row"><span class="label">Mode</span><span class="value" style="text-transform:capitalize">${device.wanMode}</span></div>`;
        if (device.interface) html += `<div class="detail-row"><span class="label">Interface</span><span class="value">${device.interface}</span></div>`;
        html += '</div>';
    }

    // Connection info for clients
    if (device.band || device.connection) {
        html += '<div class="detail-section">';
        html += '<div class="detail-section-title">Connection</div>';
        if (device.connection === 'ethernet') {
            html += '<div class="detail-row"><span class="label">Type</span><span class="value">Ethernet</span></div>';
            if (device.lanPort) html += `<div class="detail-row"><span class="label">Port</span><span class="value">${device.lanPort}</span></div>`;
        } else {
            if (device.band) html += `<div class="detail-row"><span class="label">Band</span><span class="value">${device.band}</span></div>`;
            if (device.rssi) {
                html += `<div class="detail-row"><span class="label">RSSI</span><span class="value">${device.rssi} dBm (${rssiToQuality(device.rssi)})</span></div>`;
            }
        }
        if (device.rxRate) html += `<div class="detail-row"><span class="label">Rx Rate</span><span class="value">${device.rxRate} Mbps</span></div>`;
        if (device.txRate) html += `<div class="detail-row"><span class="label">Tx Rate</span><span class="value">${device.txRate} Mbps</span></div>`;
        html += '</div>';
    }

    // QoE History for clients
    if (device.band || device.connection) {
        const history = generateQoEHistory(device);
        const hasFactors = !!device.qoeBreakdown;
        html += '<div class="detail-section">';
        html += '<div class="detail-section-title">QoE History <span class="detail-section-sub">Last hour</span></div>';
        html += `<div class="detail-qoe-sparkline" data-device-id="${device.id}">`;
        if (hasFactors) {
            const fKeys = ['snr', 'phyRate', 'stability', 'retransmission', 'airtime'];
            const fLabels = ['SNR', 'PHY', 'Stab', 'Ret', 'Air'];
            const activeFLabels = fKeys.map((k, i) => history.factors?.[k] ? fLabels[i] : null).filter(Boolean);
            html += '<div class="qoe-hm-labels">';
            activeFLabels.forEach(l => { html += `<span class="qoe-hm-label">${l}</span>`; });
            html += '</div>';
        }
        html += '<div class="qoe-sparkline-wrap">';
        html += renderQoESparklineSVG(history, 260, 64, { showThresholds: true, showHeatmap: hasFactors, showTimeLabels: false });
        html += '<div class="qoe-time-labels"><span>60m ago</span><span>now</span></div>';
        html += '</div>';
        html += '<div class="qoe-hover-tooltip"></div>';
        html += '<div class="qoe-hover-line"></div>';
        html += '<div class="qoe-hover-dot"></div>';
        html += '</div>';
        html += '</div>';
    }

    // WiFi connection for satellites
    if (device.type === 'satellite' && device.connectionType) {
        html += '<div class="detail-section">';
        html += '<div class="detail-section-title">Backhaul</div>';
        html += `<div class="detail-row"><span class="label">Type</span><span class="value">${device.connectionType}</span></div>`;
        html += `<div class="detail-row"><span class="label">Speed</span><span class="value">${device.backhaul.speed}</span></div>`;
        html += `<div class="detail-row"><span class="label">Utilization</span><span class="value">${device.backhaul.utilization}%</span></div>`;
        if (device.backhaul.rssi) {
            html += `<div class="detail-row"><span class="label">RSSI</span><span class="value">${device.backhaul.rssi} dBm</span></div>`;
        }
        html += '</div>';
    }

    // Throughput / Activity
    if (device.throughput || device.activity) {
        const t = device.throughput || device.activity;
        html += '<div class="detail-section">';
        html += '<div class="detail-section-title">Traffic</div>';

        // Sparklines
        const downData = generateSparkline(t.down, t.down * 0.3);
        const upData = generateSparkline(t.up, t.up * 0.3);

        html += '<div class="sparkline-container">';
        html += renderSparklineRow('Download', downData, t.down, 'var(--accent-cyan)');
        html += renderSparklineRow('Upload', upData, t.up, 'var(--accent-amber)');
        html += '</div>';
        html += '</div>';
    }

    // System stats for gateway/satellite
    if (device.cpu !== undefined) {
        html += '<div class="detail-section">';
        html += '<div class="detail-section-title">System</div>';
        html += `<div class="detail-row"><span class="label">CPU</span><span class="value">${device.cpu}%</span></div>`;
        html += `<div class="detail-row"><span class="label">Memory</span><span class="value">${device.memory}%</span></div>`;
        if (device.temperature) html += `<div class="detail-row"><span class="label">Temperature</span><span class="value">${device.temperature}°C</span></div>`;
        html += '</div>';
    }

    // Interfaces (gateway)
    if (device.interfaces) {
        html += '<div class="detail-section">';
        html += '<div class="detail-section-title">Interfaces</div>';
        html += '<div class="port-grid">';
        device.interfaces.forEach(iface => {
            const utilClass = iface.utilization > 70 ? 'critical' : iface.utilization > 40 ? 'high' : '';
            html += `
                <div class="port-item ${iface.status}">
                    <div class="port-number">${iface.name}</div>
                    <div class="port-speed">${iface.speed}</div>
                    <div class="port-utilization">
                        <div class="port-utilization-bar ${utilClass}" style="width: ${iface.utilization}%"></div>
                    </div>
                </div>`;
        });
        html += '</div>';
        html += '</div>';
    }

    // WiFi radios
    if (device.wifiRadios) {
        html += '<div class="detail-section">';
        html += '<div class="detail-section-title">WiFi Radios</div>';
        device.wifiRadios.forEach(radio => {
            html += `<div class="detail-row"><span class="label">${radio.band} (Ch ${radio.channel})</span><span class="value">${radio.clients} clients · ${radio.utilization}% util</span></div>`;
        });
        html += '</div>';
    }

    return html;
}

function renderSparklineRow(label, data, currentValue, color) {
    const max = Math.max(...data, 0.1);
    const width = 160;
    const height = 24;
    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (v / max) * height;
        return `${x},${y}`;
    }).join(' ');

    return `
        <div class="sparkline-row">
            <span class="sparkline-label">${label}</span>
            <svg class="sparkline-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                <polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.7"/>
            </svg>
            <span class="sparkline-value">${formatBandwidth(currentValue)}</span>
        </div>`;
}

// ── Legend ─────────────────────────────────────────
function renderLegend() {
    const container = document.getElementById('topologyContainer');

    // Remove existing legend
    const existing = container.querySelector('.topology-legend');
    if (existing) existing.remove();

    const legend = document.createElement('div');
    legend.className = 'topology-legend';
    legend.innerHTML = `
        <div class="legend-section">
            <div class="legend-title">Connection</div>
            <div class="legend-item">
                <span class="legend-line" style="background:#22d3ee;height:2px;"></span>
                <span class="legend-label">Ethernet</span>
            </div>
            <div class="legend-item">
                <span class="legend-line" style="background:#a78bfa;height:2px;"></span>
                <span class="legend-label">5 GHz</span>
            </div>
            <div class="legend-item">
                <span class="legend-line" style="background:#fbbf24;height:2px;"></span>
                <span class="legend-label">2.4 GHz</span>
            </div>
            <div class="legend-item">
                <span class="legend-line" style="background:#34d399;height:2px;"></span>
                <span class="legend-label">6 GHz</span>
            </div>
        </div>
        <div class="legend-section">
            <div class="legend-title">Signal</div>
            <div class="legend-item">
                <span class="legend-dot" style="border-color:var(--accent-green);background:rgba(52,211,153,0.1);"></span>
                <span class="legend-label">Strong</span>
            </div>
            <div class="legend-item">
                <span class="legend-dot" style="border-color:var(--accent-amber);background:rgba(251,191,36,0.1);"></span>
                <span class="legend-label">Fair</span>
            </div>
            <div class="legend-item">
                <span class="legend-dot" style="border-color:var(--accent-red);background:rgba(248,113,113,0.1);"></span>
                <span class="legend-label">Weak</span>
            </div>
        </div>
    `;

    container.appendChild(legend);
}

// ── Connection Popup ──────────────────────────────
function showConnectionPopup(e, fromId, toId) {
    // Remove existing popup
    closeConnectionPopup();

    const client = TOPOLOGY.clients.find(c => c.id === toId);
    const fromDevice = fromId === 'gateway' ? TOPOLOGY.gateway :
                       TOPOLOGY.satellites.find(s => s.id === fromId);
    const toDevice = client || TOPOLOGY.satellites.find(s => s.id === toId) || TOPOLOGY.gateway;

    if (!fromDevice || !toDevice) return;

    const traffic = client ? client.activity : toDevice.throughput;

    const popup = document.createElement('div');
    popup.className = 'connection-popup';
    popup.id = 'connectionPopup';

    let actionsHtml = '';
    if (client) {
        actionsHtml = `
            <div class="connection-popup-actions">
                <button class="connection-action-btn" onclick="alert('Would band-steer ${client.name}')">
                    <i class="ph-duotone ph-arrows-left-right"></i> Band Steer
                </button>
                <button class="connection-action-btn danger" onclick="alert('Would kick ${client.name}')">
                    <i class="ph-duotone ph-prohibit"></i> Kick Client
                </button>
            </div>
        `;
    }

    popup.innerHTML = `
        <div class="connection-popup-header">
            ${fromDevice.name} → ${toDevice.name}
        </div>
        <div class="connection-popup-stats">
            <span>↓ <span class="value">${formatBandwidth(traffic?.down || 0)}</span></span>
            <span>↑ <span class="value">${formatBandwidth(traffic?.up || 0)}</span></span>
        </div>
        ${actionsHtml}
    `;

    const container = document.getElementById('topologyContainer');
    const containerRect = container.getBoundingClientRect();
    popup.style.left = (e.clientX - containerRect.left + container.scrollLeft + 10) + 'px';
    popup.style.top = (e.clientY - containerRect.top + container.scrollTop - 20) + 'px';

    container.appendChild(popup);

    // Highlight the connection
    const connGroup = e.target.closest('.connection-group');
    if (connGroup) connGroup.classList.add('highlighted');
}

function closeConnectionPopup() {
    const existing = document.getElementById('connectionPopup');
    if (existing) existing.remove();
    document.querySelectorAll('.connection-group.highlighted').forEach(g => g.classList.remove('highlighted'));
}

// ── Events ─────────────────────────────────────────
function bindEvents() {
    // Close detail panel
    document.getElementById('detailClose').addEventListener('click', closeDetail);
    document.getElementById('topologyContainer').addEventListener('click', (e) => {
        // Close connection popup when clicking elsewhere
        if (!e.target.closest('.connection-group') && !e.target.closest('.connection-popup')) {
            closeConnectionPopup();
        }
        if (e.target === e.currentTarget || !e.target.closest('.device-node')) {
            if (!e.target.closest('.device-node') && !e.target.closest('.band-group')) closeDetail();
        }
    });

    // Connection click — attach to SVG (delegated)
    document.getElementById('topologySvg').addEventListener('click', (e) => {
        const group = e.target.closest('.connection-group');
        if (group) {
            e.stopPropagation();
            showConnectionPopup(e, group.dataset.from, group.dataset.to);
        }
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    });
}

// ── Helpers ────────────────────────────────────────
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// ── Clients Table View ────────────────────────────
let currentView = 'topology';
let clientsSort = { column: 'name', direction: 'asc' };
let clientsSearchTerm = '';
let clientsFilters = {
    status: new Set(),   // empty = all
    type: new Set(),
    parent: new Set(),
    band: new Set(),
    wifi: new Set()
};

function getParentName(parentId) {
    if (parentId === 'gateway') return TOPOLOGY.gateway.name;
    const sat = TOPOLOGY.satellites.find(s => s.id === parentId);
    return sat ? sat.name : parentId;
}

function getClientStatus(client) {
    if (client.status === 'offline') return 'offline';
    if (client.idle) return 'idle';
    return 'active';
}

function parseUptime(str) {
    if (!str || str === '0') return 0;
    let mins = 0;
    const d = str.match(/(\d+)d/);
    const h = str.match(/(\d+)h/);
    const m = str.match(/(\d+)m/);
    if (d) mins += parseInt(d[1]) * 1440;
    if (h) mins += parseInt(h[1]) * 60;
    if (m) mins += parseInt(m[1]);
    return mins;
}

function getFilteredSortedClients() {
    let list = [...TOPOLOGY.clients];

    // Search filter
    if (clientsSearchTerm) {
        const q = clientsSearchTerm.toLowerCase();
        list = list.filter(c =>
            (c.name || '').toLowerCase().includes(q) ||
            (c.mac || '').toLowerCase().includes(q) ||
            (c.ip || '').toLowerCase().includes(q)
        );
    }

    // Status filter
    if (clientsFilters.status.size) {
        list = list.filter(c => clientsFilters.status.has(getClientStatus(c)));
    }

    // Type filter
    if (clientsFilters.type.size) {
        list = list.filter(c => clientsFilters.type.has(c.type || ''));
    }

    // Parent AP filter
    if (clientsFilters.parent.size) {
        list = list.filter(c => clientsFilters.parent.has(c.parentId));
    }

    // Band filter
    if (clientsFilters.band.size) {
        list = list.filter(c => {
            if (clientsFilters.band.has('ethernet') && c.connection === 'ethernet') return true;
            if (c.connection === 'ethernet') return false;
            return clientsFilters.band.has(c.band);
        });
    }

    // Wi-Fi version filter
    if (clientsFilters.wifi.size) {
        list = list.filter(c => {
            const gen = getWifiGen(c);
            return gen && clientsFilters.wifi.has(gen.toLowerCase().replace(' ', ''));
        });
    }

    // Sort
    const { column, direction } = clientsSort;
    const dir = direction === 'asc' ? 1 : -1;

    list.sort((a, b) => {
        let va, vb;
        switch (column) {
            case 'status':
                const order = { active: 0, idle: 1, offline: 2 };
                va = order[getClientStatus(a)]; vb = order[getClientStatus(b)];
                break;
            case 'name':
                va = (a.name || '').toLowerCase(); vb = (b.name || '').toLowerCase();
                return dir * va.localeCompare(vb);
            case 'type':
                va = (a.type || '').toLowerCase(); vb = (b.type || '').toLowerCase();
                return dir * va.localeCompare(vb);
            case 'parent':
                va = getParentName(a.parentId).toLowerCase(); vb = getParentName(b.parentId).toLowerCase();
                return dir * va.localeCompare(vb);
            case 'band':
                va = a.connection === 'ethernet' ? 'zzz' : (a.band || '');
                vb = b.connection === 'ethernet' ? 'zzz' : (b.band || '');
                return dir * va.localeCompare(vb);
            case 'qoe':
                va = computeQoE(a); vb = computeQoE(b);
                break;
            case 'wifi':
                va = getWifiGen(a) || ''; vb = getWifiGen(b) || '';
                return dir * va.localeCompare(vb);
            case 'throughput':
                va = (a.activity?.down || 0) + (a.activity?.up || 0);
                vb = (b.activity?.down || 0) + (b.activity?.up || 0);
                break;
            case 'since':
                va = parseUptime(a.connectedSince); vb = parseUptime(b.connectedSince);
                break;
            default:
                va = 0; vb = 0;
        }
        return dir * (va - vb);
    });

    return list;
}

function renderClientsTable() {
    const tbody = document.getElementById('clientsTableBody');
    if (!tbody) return;

    const clients = getFilteredSortedClients();
    if (clients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="clients-empty">No clients match filters</td></tr>';
        return;
    }

    const rows = clients.map(c => {
        const status = getClientStatus(c);
        const icon = ICONS[c.type] || ICONS.iot;
        const parentName = getParentName(c.parentId);
        const isWired = c.connection === 'ethernet';
        const band = isWired ? 'Ethernet' : (c.band || '\u2014');
        const bandClass = isWired ? 'band-ethernet' :
            (c.band || '').includes('6') ? 'band-6ghz' :
            (c.band || '').includes('2.4') ? 'band-2-4ghz' : 'band-5ghz';
        const bandBadge = band !== '\u2014' ? `<span class="cl-badge ${bandClass}">${band}</span>` : '\u2014';
        const qoe = computeQoE(c);
        const qColor = qoeColor(qoe);
        const qLabel = qoeLabel(qoe);
        const wifi = getWifiGen(c);
        const wifiClass = wifi ? `wifi-${wifi.toLowerCase().replace(' ', '')}` : '';
        const wifiBadge = wifi ? `<span class="cl-badge ${wifiClass}">Wi-Fi ${wifi}</span>` : '\u2014';
        const typeClass = `type-${c.type || 'default'}`;
        const typeBadge = c.type ? `<span class="cl-badge ${typeClass}">${c.type}</span>` : '\u2014';
        const down = formatBandwidth(c.activity?.down || 0);
        const up = formatBandwidth(c.activity?.up || 0);
        const since = c.connectedSince || '\u2014';
        const sel = c.id === selectedDeviceId ? ' selected' : '';

        return `<tr class="clients-row${sel}" data-id="${c.id}">
            <td class="col-status"><span class="cl-status-dot st-${status}"></span></td>
            <td class="col-name"><span class="cl-icon">${icon}</span>${c.name}</td>
            <td class="col-type">${typeBadge}</td>
            <td class="col-parent">${parentName}</td>
            <td class="col-band">${bandBadge}</td>
            <td class="col-qoe" style="color:${qColor}">${qoe} <span style="opacity:0.6;font-size:10px">${qLabel}</span></td>
            <td class="col-wifi">${wifiBadge}</td>
            <td class="col-throughput"><span class="cl-throughput-down">\u2193${down}</span><span class="cl-throughput-up">\u2191${up}</span></td>
            <td class="col-since">${since}</td>
        </tr>`;
    });

    tbody.innerHTML = rows.join('');
}

function updateClientsTableThroughput() {
    const tbody = document.getElementById('clientsTableBody');
    if (!tbody) return;
    tbody.querySelectorAll('.clients-row').forEach(row => {
        const id = row.dataset.id;
        const client = TOPOLOGY.clients.find(c => c.id === id);
        if (!client) return;
        const td = row.querySelector('.col-throughput');
        if (td) {
            const down = formatBandwidth(client.activity?.down || 0);
            const up = formatBandwidth(client.activity?.up || 0);
            td.innerHTML = `<span class="cl-throughput-down">\u2193${down}</span><span class="cl-throughput-up">\u2191${up}</span>`;
        }
    });
}

function switchView(viewName) {
    // If leaving Time Machine via Map click
    if (timeMachineActive && viewName !== 'time-machine') {
        deactivateTimeMachine();
        // Update nav active states
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const navItem = document.querySelector(`.nav-item[data-view="${viewName}"]`);
        if (navItem) navItem.classList.add('active');
        if (viewName === currentView) return;
    }

    if (viewName === currentView) return;

    // If entering Time Machine from another view
    if (viewName === 'time-machine') {
        if (currentView === 'clients' || currentView === 'client-history') {
            document.getElementById('clientsContainer').style.display = 'none';
            const hc = document.getElementById('clientHistoryContainer');
            if (hc) hc.style.display = 'none';
            document.getElementById('topologyContainer').style.display = '';
            const heading = document.querySelector('.top-bar-left h1');
            if (heading) heading.textContent = 'Network Topology';
            currentView = 'topology';
        }
        // Update nav active states
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById('tmNavItem')?.classList.add('active');
        activateTimeMachine();
        return;
    }

    const topoContainer = document.getElementById('topologyContainer');
    const clientsContainer = document.getElementById('clientsContainer');
    const heading = document.querySelector('.top-bar-left h1');

    const historyContainer = document.getElementById('clientHistoryContainer');

    // Hide all view containers
    topoContainer.style.display = 'none';
    clientsContainer.style.display = 'none';
    if (historyContainer) historyContainer.style.display = 'none';

    if (viewName === 'topology') {
        topoContainer.style.display = '';
        if (heading) heading.textContent = 'Network Topology';
    } else if (viewName === 'clients') {
        clientsContainer.style.display = '';
        if (heading) heading.textContent = 'Client Devices';
        renderClientsTable();
    } else if (viewName === 'client-history') {
        if (historyContainer) historyContainer.style.display = '';
        if (heading) heading.textContent = 'Client Activity History';
        initClientHistory();
    }

    // Update nav active states
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-view="${viewName}"]`);
    if (navItem) navItem.classList.add('active');

    currentView = viewName;
}

// ── Multi-select filter widget ─────────────────────
function initMultiFilter(containerId, filterKey, options) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const label = container.dataset.label;

    // Build button + menu
    const btn = document.createElement('div');
    btn.className = 'cf-multi-btn';
    btn.textContent = `All ${label}`;

    const menu = document.createElement('div');
    menu.className = 'cf-multi-menu';

    // Clear link at top of menu
    const clearRow = document.createElement('div');
    clearRow.className = 'cf-multi-clear';
    clearRow.textContent = 'Clear';
    clearRow.style.display = 'none';
    menu.appendChild(clearRow);

    options.forEach(opt => {
        const item = document.createElement('label');
        item.className = 'cf-multi-item';
        item.innerHTML = `<input type="checkbox" value="${opt.value}"> ${opt.text}`;
        menu.appendChild(item);
    });

    container.appendChild(btn);
    container.appendChild(menu);

    function updateClearVisibility() {
        clearRow.style.display = clientsFilters[filterKey].size > 0 ? '' : 'none';
    }

    clearRow.addEventListener('click', (e) => {
        e.stopPropagation();
        clientsFilters[filterKey].clear();
        menu.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
            cb.closest('.cf-multi-item').classList.remove('checked');
        });
        btn.innerHTML = `All ${label}`;
        updateClearVisibility();
        renderClientsTable();
    });

    // Toggle open/close
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other open menus
        document.querySelectorAll('.cf-multi.open').forEach(m => {
            if (m !== container) m.classList.remove('open');
        });
        container.classList.toggle('open');
    });

    // Checkbox changes
    menu.addEventListener('change', (e) => {
        const cb = e.target;
        if (cb.type !== 'checkbox') return;
        const filterSet = clientsFilters[filterKey];
        if (cb.checked) {
            filterSet.add(cb.value);
        } else {
            filterSet.delete(cb.value);
        }
        cb.closest('.cf-multi-item').classList.toggle('checked', cb.checked);
        // Update button label
        if (filterSet.size === 0) {
            btn.innerHTML = `All ${label}`;
        } else if (filterSet.size === 1) {
            const sel = options.find(o => filterSet.has(o.value));
            btn.innerHTML = `${sel ? sel.text : label} <span class="cf-count">1</span>`;
        } else {
            btn.innerHTML = `${label} <span class="cf-count">${filterSet.size}</span>`;
        }
        updateClearVisibility();
        renderClientsTable();
    });

    // Prevent menu click from closing
    menu.addEventListener('click', (e) => e.stopPropagation());
}

function populateClientFilterOptions() {
    const clients = TOPOLOGY.clients;

    // Status
    initMultiFilter('clientsStatusFilter', 'status', [
        { value: 'active', text: 'Active' },
        { value: 'idle', text: 'Idle' },
        { value: 'offline', text: 'Offline' }
    ]);

    // Type
    const types = [...new Set(clients.map(c => c.type).filter(Boolean))].sort();
    initMultiFilter('clientsTypeFilter', 'type',
        types.map(t => ({ value: t, text: t.charAt(0).toUpperCase() + t.slice(1) }))
    );

    // Parent AP
    const parentIds = [...new Set(clients.map(c => c.parentId).filter(Boolean))];
    const parents = parentIds.map(id => ({ id, name: getParentName(id) })).sort((a, b) => a.name.localeCompare(b.name));
    initMultiFilter('clientsParentFilter', 'parent',
        parents.map(p => ({ value: p.id, text: p.name }))
    );

    // Band
    initMultiFilter('clientsBandFilter', 'band', [
        { value: '2.4 GHz', text: '2.4 GHz' },
        { value: '5 GHz', text: '5 GHz' },
        { value: '6 GHz', text: '6 GHz' },
        { value: 'ethernet', text: 'Ethernet' }
    ]);

    // Wi-Fi version
    const gens = [...new Set(clients.map(c => getWifiGen(c)).filter(Boolean))];
    const order = ['7', '6E', '6', '5', '4'];
    gens.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    initMultiFilter('clientsWifiFilter', 'wifi',
        gens.map(g => ({ value: g.toLowerCase().replace(' ', ''), text: `Wi-Fi ${g}` }))
    );

    // Search autocomplete datalist
    const datalist = document.getElementById('clientsSearchList');
    if (datalist) {
        const names = [...new Set(clients.map(c => c.name).filter(Boolean))].sort();
        datalist.innerHTML = names.map(n => `<option value="${n}">`).join('');
    }
}

function bindClientsEvents() {
    // Nav item clicks for Map and Clients
    document.querySelectorAll('.nav-item').forEach(item => {
        const view = item.dataset.view;
        if (view === 'time-machine') return; // handled separately
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(view);
        });
    });

    // Column header sort
    document.querySelectorAll('.clients-table th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const col = th.dataset.sort;
            if (clientsSort.column === col) {
                clientsSort.direction = clientsSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                clientsSort.column = col;
                clientsSort.direction = 'asc';
            }
            // Update sort indicators
            document.querySelectorAll('.clients-table th').forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });
            th.classList.add(clientsSort.direction === 'asc' ? 'sort-asc' : 'sort-desc');
            renderClientsTable();
        });
    });

    // Search with autocomplete
    const searchEl = document.getElementById('clientsSearch');
    if (searchEl) {
        searchEl.addEventListener('input', debounce(() => {
            clientsSearchTerm = searchEl.value.trim();
            renderClientsTable();
        }, 200));
    }

    // Populate multi-select filters and datalist
    populateClientFilterOptions();

    // Close filter menus on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.cf-multi.open').forEach(m => m.classList.remove('open'));
    });

    // Row click delegation
    const tbody = document.getElementById('clientsTableBody');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const row = e.target.closest('.clients-row');
            if (row) selectDevice(row.dataset.id);
        });
    }
}

// ── Time Machine ──────────────────────────────────
let timeMachineActive = false;
let tmSnapshots = [];          // array of full TOPOLOGY snapshots
let tmCurrentIndex = 0;
let tmPlayInterval = null;
let tmPlaySpeed = 1;           // 1x, 2x, 4x
let tmSampleInterval = 60;     // seconds between snapshots (default 60s)
let tmOriginalTopology = null; // deep clone of live TOPOLOGY for restoration
let tmWasPlayingBeforeScrub = false;

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Generate mock snapshots over 24 hours at the configured sample interval
function generateMockSnapshots() {
    const base = deepClone(TOPOLOGY);
    const snapshots = [];
    const now = new Date();
    const durationMs = 24 * 60 * 60 * 1000; // 24 hours
    const intervalMs = tmSampleInterval * 1000;
    const totalSnapshots = Math.floor(durationMs / intervalMs);
    const startTime = new Date(now.getTime() - durationMs);

    for (let i = 0; i < totalSnapshots; i++) {
        const snap = deepClone(base);
        const t = new Date(startTime.getTime() + i * intervalMs);
        snap._timestamp = t.toISOString();

        // Time-of-day traffic curve (0-1): low at night, peak afternoon
        const hour = t.getHours() + t.getMinutes() / 60;
        const curve = Math.max(0.05, Math.sin((hour - 6) / 24 * Math.PI * 2) * 0.5 + 0.5);

        // Apply traffic variations to clients
        snap.clients.forEach(client => {
            if (client.idle) {
                client.activity = { down: 0, up: 0 };
                return;
            }
            const baseDown = base.clients.find(c => c.id === client.id)?.activity?.down || 0;
            const baseUp = base.clients.find(c => c.id === client.id)?.activity?.up || 0;
            const jitter = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
            client.activity = {
                down: Math.max(0, baseDown * curve * jitter),
                up: Math.max(0, baseUp * curve * jitter),
            };
        });

        // ── Roaming & topology events ──
        snap._events = [];

        // Event windows (as fractions of total snapshots)
        const pct = i / totalSnapshots;

        // 1. Client AP-to-AP roam: Sarah's iPhone roams dining→kitchen (hour 8-9, pct 0.33-0.38)
        const c12 = snap.clients.find(c => c.id === 'c12');
        if (c12) {
            if (pct >= 0.33 && pct < 0.38) {
                c12.parentId = 'sat-kitchen';
                c12.rssi = -44;
                if (pct >= 0.33 && pct < 0.335) snap._events.push({ clientId: 'c12', type: 'roam', detail: 'KITCHEN_AP' });
            } else if (pct >= 0.38 && pct < 0.385) {
                snap._events.push({ clientId: 'c12', type: 'roam', detail: 'DINING_AP' });
            }
        }

        // 2. Client AP-to-AP roam: Dad's Phone roams living→kitchen (hour 14-15, pct 0.58-0.63)
        const c35 = snap.clients.find(c => c.id === 'c35');
        if (c35) {
            if (pct >= 0.58 && pct < 0.63) {
                c35.parentId = 'sat-kitchen';
                c35.rssi = -48;
                if (pct >= 0.58 && pct < 0.585) snap._events.push({ clientId: 'c35', type: 'roam', detail: 'KITCHEN_AP' });
            } else if (pct >= 0.63 && pct < 0.635) {
                snap._events.push({ clientId: 'c35', type: 'roam', detail: 'LIVING_ROOM_AP' });
            }
        }

        // 3. Client band-to-band roam: Shield TV Pro 5GHz→2.4GHz→5GHz on kitchen (hour 6-7, pct 0.25-0.29)
        const c22 = snap.clients.find(c => c.id === 'c22');
        if (c22) {
            if (pct >= 0.25 && pct < 0.29) {
                c22.band = '2.4 GHz';
                c22.rssi = -50;
                c22.rxRate = 72; c22.txRate = 72;
                if (pct >= 0.25 && pct < 0.255) snap._events.push({ clientId: 'c22', type: 'band', detail: '2.4 GHz' });
            } else if (pct >= 0.29 && pct < 0.295) {
                snap._events.push({ clientId: 'c22', type: 'band', detail: '5 GHz' });
            }
        }

        // 4. Client band roam: Tom's Pixel 9 6GHz→5GHz on upstairs (hour 18-19, pct 0.75-0.79)
        const c43 = snap.clients.find(c => c.id === 'c43');
        if (c43 && c43.status === 'online') {
            if (pct >= 0.75 && pct < 0.79) {
                c43.band = '5 GHz';
                c43.rssi = -46;
                c43.rxRate = 573; c43.txRate = 573;
                if (pct >= 0.75 && pct < 0.755) snap._events.push({ clientId: 'c43', type: 'band', detail: '5 GHz' });
            } else if (pct >= 0.79 && pct < 0.795) {
                snap._events.push({ clientId: 'c43', type: 'band', detail: '6 GHz' });
            }
        }

        // 5. Satellite topology change: dining reconnects gateway→kitchen (hour 20-21, pct 0.83-0.88)
        const satDining = snap.satellites.find(s => s.id === 'sat-dining');
        if (satDining) {
            if (pct >= 0.83 && pct < 0.88) {
                satDining.parentId = 'gateway';
                satDining.hops = 1;
                if (pct >= 0.83 && pct < 0.835) snap._events.push({ clientId: 'sat-dining', type: 'topology', detail: 'Direct → Gateway' });
            } else if (pct >= 0.88 && pct < 0.885) {
                snap._events.push({ clientId: 'sat-dining', type: 'topology', detail: 'Via KITCHEN_AP' });
            }
        }

        // 6. Satellite offline + client roaming: upstairs goes offline (hour 10-12, pct 0.42-0.50)
        //    Some clients roam to living room, others go offline
        const outageStart = Math.floor(totalSnapshots * 0.42);
        const outageEnd = Math.floor(totalSnapshots * 0.50);
        snap.satellites.forEach(sat => {
            if (sat.id === 'sat-upstairs' && i >= outageStart && i <= outageEnd) {
                sat.status = 'offline';
                sat.throughput = { down: 0, up: 0 };
                // Roam some clients to living room, others go offline
                snap.clients.forEach(cl => {
                    if (cl.parentId === 'sat-upstairs') {
                        if (['c41', 'c43', 'c88'].includes(cl.id)) {
                            // These clients roam to living room
                            cl.parentId = 'sat-living';
                            cl.rssi = cl.rssi - 8;
                            if (i === outageStart) snap._events.push({ clientId: cl.id, type: 'roam', detail: 'LIVING_ROOM_AP' });
                        } else {
                            cl.status = 'offline';
                            cl.activity = { down: 0, up: 0 };
                            if (i === outageStart) snap._events.push({ clientId: cl.id, type: 'offline', detail: 'AP offline' });
                        }
                    }
                });
                if (i === outageStart) snap._events.push({ clientId: 'sat-upstairs', type: 'offline', detail: 'Node offline' });
            } else if (sat.id === 'sat-upstairs') {
                sat.status = 'online';
                if (i === outageEnd + 1) {
                    snap._events.push({ clientId: 'sat-upstairs', type: 'online', detail: 'Node online' });
                    // Clients return from living room
                    snap.clients.forEach(cl => {
                        if (['c41', 'c43', 'c88'].includes(cl.id)) {
                            snap._events.push({ clientId: cl.id, type: 'roam', detail: 'UPSTAIRS_AP' });
                        }
                    });
                }
            }
        });

        // RSSI drift ±5 dBm
        snap.clients.forEach(client => {
            if (client.rssi) {
                client.rssi = client.rssi + Math.round((Math.random() - 0.5) * 10);
            }
        });

        // Recompute throughput aggregates (bottom-up for multi-hop)
        const snapSortedSats = [...snap.satellites].sort((a, b) => (b.hops || 1) - (a.hops || 1));
        snapSortedSats.forEach(sat => {
            if (sat.status === 'offline') return;
            const directClients = snap.clients.filter(c => c.parentId === sat.id);
            const childSats = snap.satellites.filter(s => s.parentId === sat.id);
            sat.throughput = {
                down: directClients.reduce((s, c) => s + (c.activity?.down || 0), 0)
                    + childSats.reduce((s, cs) => s + (cs.throughput?.down || 0), 0),
                up: directClients.reduce((s, c) => s + (c.activity?.up || 0), 0)
                    + childSats.reduce((s, cs) => s + (cs.throughput?.up || 0), 0),
            };
        });
        const snapGwClients = snap.clients.filter(c => c.parentId === 'gateway');
        const snapRootSats = snap.satellites.filter(s => s.parentId === 'gateway');
        snap.gateway.throughput = {
            down: snapGwClients.reduce((s, c) => s + (c.activity?.down || 0), 0)
                + snapRootSats.reduce((s, sat) => s + (sat.throughput?.down || 0), 0),
            up: snapGwClients.reduce((s, c) => s + (c.activity?.up || 0), 0)
                + snapRootSats.reduce((s, sat) => s + (sat.throughput?.up || 0), 0),
        };

        snapshots.push(snap);
    }
    return snapshots;
}

let tmPrevSnap = null; // track previous snapshot for diffing
let tmEventMarkers = []; // [{index, pct, events, severity}]
let tmEventClusters = []; // [{startIndex, endIndex, startPct, endPct, severity}]

function buildTmEventMarkers() {
    tmEventMarkers = [];
    tmEventClusters = [];
    const total = tmSnapshots.length;
    if (total < 2) return;
    const severityOrder = { critical: 0, warn: 1, info: 2, ok: 3 };
    const typeToSeverity = { offline: 'critical', topology: 'critical', roam: 'info', band: 'warn', online: 'ok' };

    tmSnapshots.forEach((snap, i) => {
        if (!snap._events || snap._events.length === 0) return;
        let severity = 'ok';
        snap._events.forEach(evt => {
            const s = typeToSeverity[evt.type] || 'info';
            if (severityOrder[s] < severityOrder[severity]) severity = s;
        });
        tmEventMarkers.push({
            index: i,
            pct: i / (total - 1),
            events: snap._events,
            severity,
            timestamp: snap._timestamp
        });
    });

    // Build clusters — consecutive markers (gap <= 2) grouped together
    if (tmEventMarkers.length === 0) return;
    let cluster = { startIndex: tmEventMarkers[0].index, endIndex: tmEventMarkers[0].index, severity: tmEventMarkers[0].severity };
    const severityMax = (a, b) => severityOrder[a] <= severityOrder[b] ? a : b;
    for (let i = 1; i < tmEventMarkers.length; i++) {
        if (tmEventMarkers[i].index - tmEventMarkers[i - 1].index <= 2) {
            cluster.endIndex = tmEventMarkers[i].index;
            cluster.severity = severityMax(cluster.severity, tmEventMarkers[i].severity);
        } else {
            cluster.startPct = cluster.startIndex / (total - 1);
            cluster.endPct = cluster.endIndex / (total - 1);
            tmEventClusters.push(cluster);
            cluster = { startIndex: tmEventMarkers[i].index, endIndex: tmEventMarkers[i].index, severity: tmEventMarkers[i].severity };
        }
    }
    cluster.startPct = cluster.startIndex / (total - 1);
    cluster.endPct = cluster.endIndex / (total - 1);
    tmEventClusters.push(cluster);
}

function renderTmMarkers() {
    const timeline = document.querySelector('.tm-timeline');
    if (!timeline) return;
    // Remove existing
    timeline.querySelector('.tm-markers')?.remove();

    const container = document.createElement('div');
    container.className = 'tm-markers';

    const severityLabels = { critical: 'Offline', warn: 'Band', info: 'Roam', ok: 'Online' };

    // Render cluster bars instead of individual dots
    tmEventClusters.forEach(c => {
        const bar = document.createElement('div');
        bar.className = `tm-marker severity-${c.severity}`;
        const leftPct = (c.startPct * 100).toFixed(2);
        const widthPct = Math.max(0.4, ((c.endPct - c.startPct) * 100)).toFixed(2);
        bar.style.left = `${leftPct}%`;
        bar.style.width = `${widthPct}%`;
        bar.dataset.index = Math.max(0, c.startIndex - 1); // lead-in frame

        // Label centered above bar
        const label = document.createElement('span');
        label.className = 'tm-marker-label';
        label.textContent = severityLabels[c.severity] || '';
        bar.appendChild(label);

        // Tooltip from first marker in cluster
        const firstMarker = tmEventMarkers.find(m => m.index === c.startIndex);
        if (firstMarker) {
            const time = new Date(firstMarker.timestamp);
            const timeStr = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
            bar.title = `${timeStr} — ${severityLabels[c.severity] || 'Event'}`;
        }

        container.appendChild(bar);
    });

    // Click-to-jump (jump to lead-in frame)
    container.addEventListener('click', (e) => {
        const marker = e.target.closest('.tm-marker');
        if (!marker) return;
        const idx = parseInt(marker.dataset.index);
        const slider = document.getElementById('tmSlider');
        if (slider) slider.value = idx;
        applySnapshot(idx);
    });

    timeline.appendChild(container);
}

function tmSkipToNextEvent() {
    // Find next cluster we haven't reached yet (beyond the current cluster's end)
    const next = tmEventClusters.find(c => c.endIndex >= tmCurrentIndex && c.startIndex > tmCurrentIndex)
        || tmEventClusters.find(c => c.startIndex > tmCurrentIndex + 1);
    if (!next) return;
    // Jump 1 frame before cluster start so the transition animation plays
    const target = Math.max(0, next.startIndex - 1);
    if (target === tmCurrentIndex) {
        // Already at lead-in, jump to next cluster instead
        const nextNext = tmEventClusters.find(c => c.startIndex > next.endIndex);
        if (!nextNext) return;
        const t2 = Math.max(0, nextNext.startIndex - 1);
        const slider = document.getElementById('tmSlider');
        if (slider) slider.value = t2;
        applySnapshot(t2);
        return;
    }
    const slider = document.getElementById('tmSlider');
    if (slider) slider.value = target;
    applySnapshot(target);
}

function tmSkipToPrevEvent() {
    // Find previous cluster whose lead-in is strictly before current position
    for (let i = tmEventClusters.length - 1; i >= 0; i--) {
        const c = tmEventClusters[i];
        const leadIn = Math.max(0, c.startIndex - 1);
        if (leadIn < tmCurrentIndex) {
            const slider = document.getElementById('tmSlider');
            if (slider) slider.value = leadIn;
            applySnapshot(leadIn);
            return;
        }
    }
}

function clearTmMarkers() {
    document.querySelector('.tm-markers')?.remove();
}
let tmIsFirstSnapshot = true;

function applySnapshot(index) {
    if (index < 0 || index >= tmSnapshots.length) return;
    const prevIndex = tmCurrentIndex;
    tmCurrentIndex = index;

    const snap = tmSnapshots[index];
    // Replace TOPOLOGY fields
    TOPOLOGY.wans = snap.wans || [snap.internet];
    TOPOLOGY.gateway = snap.gateway;
    TOPOLOGY.satellites = snap.satellites;
    TOPOLOGY.clients = snap.clients;

    // Use incremental update if we already have a rendered view and not scrubbing far
    const canIncremental = timeMachineActive && !tmIsFirstSnapshot &&
        Math.abs(index - prevIndex) <= 3;

    if (canIncremental) {
        // Labels linger naturally — no need to clear; updateEventLabels (after FLIP) manages lifecycle
        // applySnapshotIncremental handles stats internally;
        // returns true if topology changed (full rebuild happened)
        const layoutChanged = applySnapshotIncremental(snap, snap._events || []);
        if (layoutChanged) {
            layoutConnections();
        }
    } else {
        tmLayoutSignature = ''; // reset — full rebuild
        renderTopologyGraph();
        layoutConnections();
        updateStats();
        updateClientActivityPulses();
        updateEventLabels([]);
    }

    tmIsFirstSnapshot = false;
    tmPrevSnap = snap;

    // Update slider and timestamp
    const slider = document.getElementById('tmSlider');
    if (slider) slider.value = index;

    const tsEl = document.getElementById('tmTimestamp');
    if (tsEl && snap._timestamp) {
        const d = new Date(snap._timestamp);
        tsEl.textContent = d.toLocaleString('en-US', {
            month: 'short', day: 'numeric',
            hour: 'numeric', minute: '2-digit',
            hour12: true
        });
    }

    // Update client count in badge
    updateTmBadge();
}

// ── Incremental DOM update for Time Machine (WAAPI) ──
// Uses Web Animations API for compositor-thread animations.
// WAAPI-based FLIP animation for Time Machine.
// Animations run on compositor thread — no main-thread layout thrashing.
let tmFlipAnimations = []; // active WAAPI Animation objects
let tmLayoutSignature = ''; // topology layout fingerprint to skip redundant rebuilds

function tmCancelAnimations() {
    tmFlipAnimations.forEach(a => a.cancel());
    tmFlipAnimations = [];
}

// Build a string signature of the topology layout.
// If this matches between frames, the DOM layout is identical and we can skip rebuilding.
function tmBuildLayoutSignature(snap) {
    // Layout depends on: which devices exist, which clients connect where, and which band
    const parts = [];
    // Satellites (presence + order)
    if (snap.satellites) parts.push(snap.satellites.map(s => s.id + ':' + s.status).join(','));
    // Clients: id → parentDevice + band determines placement
    if (snap.clients) {
        const sorted = [...snap.clients].sort((a, b) => a.id.localeCompare(b.id));
        sorted.forEach(c => parts.push(`${c.id}@${c.connectedTo || ''}:${c.band || ''}`));
    }
    return parts.join('|');
}

function applySnapshotIncremental(snap, pendingEvents) {
    const container = document.getElementById('topologyNodes');
    const newSig = tmBuildLayoutSignature(snap);

    // ── Fast path: topology layout unchanged — let animations run uninterrupted ──
    if (newSig === tmLayoutSignature && tmFlipAnimations.length > 0) {
        // Just update stats text in-place (no DOM rebuild, no layout reads)
        updateStats();
        updateClientActivityPulses();
        return false; // no layout change
    }
    tmLayoutSignature = newSig;

    // ── Full FLIP path: topology changed, animate to new positions ──

    // Capture current VISUAL positions BEFORE cancelling animations
    // (getBoundingClientRect returns mid-animation position while WAAPI is active)
    const oldRects = {};
    container.querySelectorAll('.device-node, .band-group, .client-node').forEach(el => {
        const id = el.dataset.id || el.dataset.groupId;
        if (id) oldRects[id] = el.getBoundingClientRect();
    });

    // NOW cancel in-flight animations (elements snap to layout positions)
    tmCancelAnimations();

    // Full DOM rebuild
    renderTopologyGraph();

    // FLIP: compute deltas and animate with WAAPI
    const flipEls = container.querySelectorAll('.device-node, .band-group, .client-node');
    const SPEED = 400;       // px/s for devices & groups
    const SPEED_CLIENT = 200; // px/s for client pills (band changes)
    const animations = [];

    // First pass: find the longest client-node animation duration (the roaming pill)
    let maxClientDur = 0;
    flipEls.forEach(el => {
        if (!el.classList.contains('client-node')) return;
        const id = el.dataset.id;
        const oldRect = id ? oldRects[id] : null;
        if (!oldRect) return;
        const newRect = el.getBoundingClientRect();
        const dx = oldRect.left - newRect.left;
        const dy = oldRect.top - newRect.top;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 100) { // cross-group move
            const dur = Math.min(3000, Math.max(300, (dist / SPEED_CLIENT) * 1000));
            if (dur > maxClientDur) maxClientDur = dur;
        }
    });

    // Second pass: create FLIP animations
    flipEls.forEach(el => {
        const id = el.dataset.id || el.dataset.groupId;
        const oldRect = id ? oldRects[id] : null;
        if (!oldRect) {
            // New element — fade in via WAAPI
            const a = el.animate(
                [{ opacity: 0 }, { opacity: 1 }],
                { duration: 200, easing: 'ease-out', fill: 'none' }
            );
            animations.push(a);
            return;
        }
        const newRect = el.getBoundingClientRect();
        const dx = oldRect.left - newRect.left;
        const dy = oldRect.top - newRect.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

        const dist = Math.sqrt(dx * dx + dy * dy);
        const isClient = el.classList.contains('client-node');
        const speed = isClient ? SPEED_CLIENT : SPEED;
        let dur = Math.min(3000, Math.max(300, (dist / speed) * 1000));

        // Short-distance client shuffles: stretch to match the incoming pill's duration
        // so the stack opens gradually as the pill travels, not all at once
        if (isClient && dist < 100 && maxClientDur > 0) {
            dur = maxClientDur;
        }

        const a = el.animate(
            [
                { transform: `translate(${dx}px, ${dy}px)` },
                { transform: 'translate(0, 0)' }
            ],
            {
                duration: dur,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'none'
            }
        );
        animations.push(a);
    });

    tmFlipAnimations = animations;

    // Show event labels after ALL animations finish
    if (pendingEvents && pendingEvents.length > 0 && animations.length > 0) {
        const allDone = Promise.all(animations.map(a => a.finished.catch(() => {})));
        allDone.then(() => {
            // Only show if these animations are still the current set
            if (tmFlipAnimations === animations) {
                updateEventLabels(pendingEvents);
            }
        });
    } else if (pendingEvents && pendingEvents.length > 0) {
        // No animations — show labels immediately
        updateEventLabels(pendingEvents);
    }
    return true; // layout changed
}

// ── Event labels (persistent overlay, outside FLIP tree) ──
let tmEventLabelMap = new Map(); // key → {el, clientId, lingerTimeout}
const TM_LABEL_LINGER_MS = 3000; // how long labels stay visible after appearing

function ensureEventOverlay() {
    let overlay = document.getElementById('tmEventOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'tmEventOverlay';
        overlay.className = 'tm-event-overlay';
        document.getElementById('topologyContainer').appendChild(overlay);
    }
    return overlay;
}

function updateEventLabels(events) {
    const overlay = ensureEventOverlay();
    const nodesContainer = document.getElementById('topologyNodes');
    const containerRect = document.getElementById('topologyContainer').getBoundingClientRect();

    const typeLabels = { roam: 'Roam →', band: 'Band →', offline: '', online: '', topology: '' };
    const newKeys = new Set(events.map(e => `${e.clientId}:${e.type}`));

    // Start fading labels no longer in current events (don't remove yet — they linger)
    for (const [key, entry] of tmEventLabelMap) {
        if (!newKeys.has(key) && !entry.fading) {
            startLabelFadeout(key, entry);
        }
    }

    // Track per-target stacking offset
    const targetOffsets = {};

    // Add or reposition labels
    events.forEach(evt => {
        const key = `${evt.clientId}:${evt.type}`;
        const target = nodesContainer.querySelector(`[data-id="${evt.clientId}"]`);
        if (!target) return;

        const targetRect = target.getBoundingClientRect();
        const x = targetRect.left + targetRect.width / 2 - containerRect.left;
        const stackIdx = targetOffsets[evt.clientId] || 0;
        targetOffsets[evt.clientId] = stackIdx + 1;
        const y = targetRect.top - containerRect.top - 18 - (stackIdx * 20);

        let entry = tmEventLabelMap.get(key);
        if (entry && entry.fading) {
            // Re-activate a fading label (event reappeared)
            clearTimeout(entry.lingerTimeout);
            clearTimeout(entry.fadeTimeout);
            entry.fading = false;
            entry.el.classList.remove('tm-label-fading');
        }
        if (!entry || entry.fading) {
            // Create new label
            const prefix = typeLabels[evt.type] ?? '';
            const text = prefix ? `${prefix} ${evt.detail}` : evt.detail;
            const label = document.createElement('div');
            label.className = `tm-event-label tm-event-${evt.type}`;
            label.textContent = text;
            overlay.appendChild(label);
            // Fade in via WAAPI (doesn't interfere with CSS pulse animation)
            label.animate(
                [{ opacity: 0, transform: 'translateX(-50%) translateY(4px)' },
                 { opacity: 1, transform: 'translateX(-50%) translateY(0)' }],
                { duration: 400, easing: 'ease-out', fill: 'none' }
            );
            entry = { el: label, clientId: evt.clientId, fading: false };
            tmEventLabelMap.set(key, entry);
        }

        // Schedule linger timeout — label fades out after TM_LABEL_LINGER_MS
        if (entry.lingerTimeout) clearTimeout(entry.lingerTimeout);
        entry.lingerTimeout = setTimeout(() => {
            startLabelFadeout(key, entry);
        }, TM_LABEL_LINGER_MS);

        // Position (no transition — instant, zero overhead)
        entry.el.style.left = `${x}px`;
        entry.el.style.top = `${y}px`;
    });
}

function startLabelFadeout(key, entry) {
    if (entry.fading) return;
    entry.fading = true;
    entry.el.classList.add('tm-label-fading');
    // Remove from DOM after fade animation (600ms)
    entry.fadeTimeout = setTimeout(() => {
        entry.el.remove();
        tmEventLabelMap.delete(key);
    }, 600);
}

function clearEventLabels(immediate) {
    if (immediate) {
        // Hard clear — TM deactivation
        for (const [, entry] of tmEventLabelMap) {
            if (entry.lingerTimeout) clearTimeout(entry.lingerTimeout);
            if (entry.fadeTimeout) clearTimeout(entry.fadeTimeout);
        }
        const overlay = document.getElementById('tmEventOverlay');
        if (overlay) overlay.innerHTML = '';
        tmEventLabelMap.clear();
    }
    // Non-immediate: do nothing — let labels linger and fade naturally
}

// No-ops for freeze/unfreeze since labels are now static
function tmFreezeEventLabels() {}
function tmUnfreezeEventLabels() {}

function updateTmBadge() {
    const badge = document.querySelector('.badge');
    if (timeMachineActive && badge) {
        const snap = tmSnapshots[tmCurrentIndex];
        const onlineCount = snap ? snap.clients.filter(c => c.status === 'online').length : 0;
        const offlineSats = snap ? snap.satellites.filter(s => s.status === 'offline').length : 0;
        if (offlineSats > 0) {
            badge.className = 'badge badge-tm-warning';
            badge.textContent = `Time Machine · ${offlineSats} node${offlineSats > 1 ? 's' : ''} offline`;
        } else {
            badge.className = 'badge badge-tm';
            badge.textContent = 'Time Machine';
        }
    }
}

function activateTimeMachine() {
    if (timeMachineActive) return;
    timeMachineActive = true;

    // Save live state
    tmOriginalTopology = deepClone(TOPOLOGY);
    stopAnimations();

    // Generate mock snapshots
    tmSnapshots = generateMockSnapshots();
    tmIsFirstSnapshot = true;
    tmPrevSnap = null;

    // Build and render event markers on timeline
    buildTmEventMarkers();

    // Update UI
    document.body.classList.add('time-machine-active');
    const bar = document.getElementById('tmPlaybackBar');
    if (bar) bar.classList.add('visible');

    const slider = document.getElementById('tmSlider');
    if (slider) {
        slider.max = tmSnapshots.length - 1;
        slider.value = 0;
    }

    // Render event markers on timeline
    renderTmMarkers();

    // Update badge
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.className = 'badge badge-tm';
        badge.textContent = 'Time Machine';
    }

    // Highlight sidebar
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tmNavItem')?.classList.add('active');

    // Apply first snapshot
    applySnapshot(0);
}

function deactivateTimeMachine() {
    if (!timeMachineActive) return;
    timeMachineActive = false;

    // Stop playback
    tmPause();

    // Clear event markers
    clearTmMarkers();
    tmEventMarkers = [];

    // Restore live state
    TOPOLOGY.wans = tmOriginalTopology.wans || [tmOriginalTopology.internet];
    TOPOLOGY.gateway = tmOriginalTopology.gateway;
    TOPOLOGY.satellites = tmOriginalTopology.satellites;
    TOPOLOGY.clients = tmOriginalTopology.clients;

    // Re-render
    renderTopologyGraph();
    layoutConnections();
    updateStats();
    updateClientActivityPulses();

    // Restart live animations
    startAnimations();

    // Update UI
    document.body.classList.remove('time-machine-active');
    const bar = document.getElementById('tmPlaybackBar');
    if (bar) bar.classList.remove('visible');

    const badge = document.querySelector('.badge');
    if (badge) {
        badge.className = 'badge badge-online';
        badge.textContent = 'All Systems Online';
    }

    // Restore sidebar
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('[data-view="topology"]')?.classList.add('active');

    // Clean up
    tmSnapshots = [];
    tmOriginalTopology = null;
    tmCurrentIndex = 0;
    tmPrevSnap = null;
    tmIsFirstSnapshot = true;

    // Cancel animations and remove event labels overlay
    tmCancelAnimations();
    tmLayoutSignature = '';
    clearEventLabels(true);
    document.getElementById('tmEventOverlay')?.remove();
}

function tmPlay() {
    if (tmPlayInterval) return; // already playing
    const btn = document.getElementById('tmPlayPause');
    if (btn) btn.innerHTML = '<i class="ph-bold ph-pause"></i>';

    // Unfreeze any frozen labels
    tmUnfreezeEventLabels();

    const interval = 1000 / tmPlaySpeed;
    tmPlayInterval = setInterval(() => {
        if (tmCurrentIndex >= tmSnapshots.length - 1) {
            tmPause();
            return;
        }
        applySnapshot(tmCurrentIndex + 1);
    }, interval);
}

function tmPause() {
    if (tmPlayInterval) {
        clearInterval(tmPlayInterval);
        tmPlayInterval = null;
    }
    const btn = document.getElementById('tmPlayPause');
    if (btn) btn.innerHTML = '<i class="ph-bold ph-play"></i>';

    // Freeze any visible event labels
    tmFreezeEventLabels();
}

function tmTogglePlayPause() {
    tmPlayInterval ? tmPause() : tmPlay();
}

function tmCycleSpeed() {
    const speeds = [1, 2, 4];
    const idx = speeds.indexOf(tmPlaySpeed);
    tmPlaySpeed = speeds[(idx + 1) % speeds.length];
    const btn = document.getElementById('tmSpeed');
    if (btn) btn.textContent = `${tmPlaySpeed}×`;

    // If playing, restart with new speed
    if (tmPlayInterval) {
        tmPause();
        tmPlay();
    }
}

function tmCycleInterval() {
    const intervals = [15, 30, 60, 120, 300]; // seconds
    const idx = intervals.indexOf(tmSampleInterval);
    tmSampleInterval = intervals[(idx + 1) % intervals.length];
    const btn = document.getElementById('tmInterval');
    if (btn) btn.textContent = tmSampleInterval >= 60
        ? `${tmSampleInterval / 60}m`
        : `${tmSampleInterval}s`;

    // Regenerate snapshots with new interval and re-apply
    tmPause();
    tmSnapshots = generateMockSnapshots();
    buildTmEventMarkers();
    const slider = document.getElementById('tmSlider');
    if (slider) {
        slider.max = tmSnapshots.length - 1;
        // Keep proportional position
        tmCurrentIndex = Math.min(tmCurrentIndex, tmSnapshots.length - 1);
        slider.value = tmCurrentIndex;
    }
    renderTmMarkers();
    applySnapshot(tmCurrentIndex);
}

function bindTimeMachineEvents() {
    // Sidebar activation
    document.getElementById('tmNavItem')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (timeMachineActive) {
            deactivateTimeMachine();
        } else {
            switchView('time-machine');
        }
    });

    // Playback controls
    document.getElementById('tmPlayPause')?.addEventListener('click', tmTogglePlayPause);
    document.getElementById('tmStepBack')?.addEventListener('click', () => {
        tmPause();
        applySnapshot(Math.max(0, tmCurrentIndex - 1));
    });
    document.getElementById('tmStepFwd')?.addEventListener('click', () => {
        tmPause();
        applySnapshot(Math.min(tmSnapshots.length - 1, tmCurrentIndex + 1));
    });
    document.getElementById('tmSkipStart')?.addEventListener('click', () => {
        tmPause();
        applySnapshot(0);
    });
    document.getElementById('tmSkipEnd')?.addEventListener('click', () => {
        tmPause();
        applySnapshot(tmSnapshots.length - 1);
    });
    document.getElementById('tmPrevEvent')?.addEventListener('click', tmSkipToPrevEvent);
    document.getElementById('tmNextEvent')?.addEventListener('click', tmSkipToNextEvent);
    document.getElementById('tmSpeed')?.addEventListener('click', tmCycleSpeed);
    document.getElementById('tmInterval')?.addEventListener('click', tmCycleInterval);
    document.getElementById('tmExit')?.addEventListener('click', deactivateTimeMachine);

    // Slider scrubbing — resume playback on release if was playing
    const slider = document.getElementById('tmSlider');
    if (slider) {
        slider.addEventListener('mousedown', () => {
            tmWasPlayingBeforeScrub = !!tmPlayInterval;
            tmPause();
        });
        slider.addEventListener('touchstart', () => {
            tmWasPlayingBeforeScrub = !!tmPlayInterval;
            tmPause();
        }, { passive: true });
        slider.addEventListener('input', () => {
            applySnapshot(parseInt(slider.value));
        });
        slider.addEventListener('change', () => {
            if (tmWasPlayingBeforeScrub) {
                tmWasPlayingBeforeScrub = false;
                tmPlay();
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (!timeMachineActive) return;
        if (e.target.tagName === 'INPUT' && e.target.type !== 'range') return;
        switch(e.key) {
            case ' ':
                e.preventDefault();
                tmTogglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                tmPause();
                applySnapshot(Math.max(0, tmCurrentIndex - 1));
                break;
            case 'ArrowRight':
                e.preventDefault();
                tmPause();
                applySnapshot(Math.min(tmSnapshots.length - 1, tmCurrentIndex + 1));
                break;
            case 'Escape':
                deactivateTimeMachine();
                break;
            case '[':
                e.preventDefault();
                tmSkipToPrevEvent();
                break;
            case ']':
                e.preventDefault();
                tmSkipToNextEvent();
                break;
        }
    });
}

// ── SmartOS topology.json Parser ──────────────────
// Transforms raw SmartOS topology.json into the TOPOLOGY render model.
// TODO: wire into UI with fetch('topology.json')
function parseTopologyJson(raw) {
    const hosts = raw.Hosts || [];
    const macToId = new Map();
    const satellites = [];
    const clients = [];
    let gateway = null;

    // First pass: identify gateway and satellites, build MAC→ID map
    const hub = hosts.find(h => h.Role === 'HUB');
    if (hub) {
        const gwId = 'gateway';
        macToId.set(hub.MAC, gwId);
        gateway = {
            id: gwId,
            type: 'gateway',
            name: hub.Hostname || hub.MFG_MODEL || 'Gateway',
            model: hub.MFG_MODEL || raw.MFG_MODEL || '',
            modelDesc: 'Gateway',
            mac: hub.MAC,
            ip: hub.Hosts?.[0]?.Address || hub.Address || '',
            firmware: '',
            status: hub.State === 'Active' ? 'online' : 'offline',
            statusColor: hub.StatusColor || 'green',
            throughput: { down: 0, up: 0 },
            clients: 0,
            wifiRadios: [],
        };
    }

    // Build satellite list and collect all MACs
    const sats = hosts.filter(h => h.Role === 'SAT');
    const satMacs = new Set(sats.map(s => s.MAC));

    // Map gateway subordinate MACs (lowest priority)
    if (hub && hub.Subordinates) {
        hub.Subordinates.forEach(sub => macToId.set(sub.MAC, 'gateway'));
    }

    // Map satellite subordinate MACs (medium priority — but skip if MAC belongs to another satellite)
    sats.forEach((s, i) => {
        const satId = `sat-${i}`;
        if (s.Subordinates) {
            s.Subordinates.forEach(sub => {
                if (!satMacs.has(sub.MAC)) {
                    macToId.set(sub.MAC, satId);
                }
            });
        }
    });

    // Map satellite own MACs last (highest priority — always wins)
    sats.forEach((s, i) => {
        macToId.set(s.MAC, `sat-${i}`);
    });

    sats.forEach((s, i) => {
        const satId = `sat-${i}`;
        const wifi = s.WiFi || {};
        const qoe = wifi.Qoe || {};
        const parentId = macToId.get(s.UpHost) || 'gateway';
        const band = wifi.Band || s.Band || '';
        const bandFormatted = band.replace('GHz', ' GHz');

        satellites.push({
            id: satId,
            type: 'satellite',
            name: s.Hostname || s.MFG_MODEL || `Satellite ${i + 1}`,
            model: s.MFG_MODEL || '',
            modelDesc: 'Satellite',
            mac: s.MAC,
            ip: s.Hosts?.[0]?.Address || s.Address || '',
            firmware: '',
            parentId,
            hops: s.WifiHops || s.Hops || 1,
            connectionType: 'wireless',
            backhaulBand: bandFormatted,
            backhaul: {
                speed: `${wifi.TxPhyRateMbps || 0} Mbps`,
                utilization: 0,
                rssi: wifi.Signal || 0,
                snr: wifi.SNR || s.SNR || 0,
                channel: wifi.Channel || s.Channel || 0,
            },
            statusColor: s.StatusColor || 'green',
            status: s.State === 'Active' ? 'online' : 'offline',
            throughput: { down: 0, up: 0 },
            wifiRadios: [],
            qoeBreakdown: qoe.Score != null ? {
                snr: qoe.SnrScore || 0,
                phyRate: qoe.PhyRateScore || 0,
                stability: qoe.StabilityScore || 0,
                retransmission: qoe.RetransmissionScore || 0,
                airtime: qoe.AirtimeScore || 0,
            } : undefined,
        });
    });

    // Third pass: clients
    const clientHosts = hosts.filter(h => h.Role === 'Client');
    clientHosts.forEach((c, i) => {
        const wifi = c.WiFi || {};
        const qoe = wifi.Qoe || {};
        const isWifi = !!wifi.Band;
        const parentId = c.UpHost ? (macToId.get(c.UpHost) || 'gateway') : 'gateway';
        const band = wifi.Band || '';
        const bandFormatted = band.replace('GHz', ' GHz');
        const isActive = c.State === 'Active';

        // Convert 15-min byte counts to approximate Mbps
        const usage15 = c.Usage?.Fifteen || {};
        const downMbps = ((usage15.RxBytes || 0) * 8) / (15 * 60) / 1e6;
        const upMbps = ((usage15.TxBytes || 0) * 8) / (15 * 60) / 1e6;

        // Derive device type from fingerprint or OUI
        const fp = c.fingerprint || {};
        let deviceType = 'iot';
        if (fp.class === 'phone' || fp.class === 'smartphone') deviceType = 'phone';
        else if (fp.class === 'laptop' || fp.class === 'notebook') deviceType = 'laptop';
        else if (fp.class === 'desktop' || fp.class === 'computer') deviceType = 'desktop';
        else if (fp.class === 'tablet') deviceType = 'tablet';
        else if (fp.class === 'tv' || fp.class === 'television') deviceType = 'tv';
        else if (fp.class === 'speaker') deviceType = 'speaker';
        else if (fp.class === 'printer') deviceType = 'printer';
        else if (fp.class === 'camera') deviceType = 'camera';
        else if (fp.class === 'access-point') return; // skip APs listed as clients
        else if (fp.class === 'streaming') deviceType = 'streaming';
        else if (fp.class === 'console' || fp.class === 'game-console') deviceType = 'console';
        else if (fp.class === 'server') deviceType = 'server';

        const client = {
            id: `client-${i}`,
            name: c.Hostname || fp.vendor || c.OUI || c.MAC,
            mac: c.MAC,
            ip: c.Hosts?.[0]?.Address || c.Address || '',
            parentId,
            status: isActive ? 'online' : 'offline',
            type: deviceType,
            connectedSince: '',
            idle: !isActive || (downMbps < 0.01 && upMbps < 0.01),
            activity: { down: Math.round(downMbps * 100) / 100, up: Math.round(upMbps * 100) / 100 },
        };

        if (isWifi) {
            client.band = bandFormatted;
            client.rssi = wifi.Signal || 0;
            client.rxRate = wifi.RxPhyRateMbps || c.RxPhyRateMbps || 0;
            client.txRate = wifi.TxPhyRateMbps || c.TxPhyRateMbps || 0;
        } else {
            client.connection = 'ethernet';
            client.rxRate = c.Duplex || 1000;
            client.txRate = c.Duplex || 1000;
            // Derive LAN port from parent's Subordinates interface mapping
            const parentHost = hosts.find(h => h.MAC === c.UpHost) || hub;
            if (parentHost?.Subordinates) {
                const sub = parentHost.Subordinates.find(s => s.MAC === c.MAC);
                if (sub?.Interface) {
                    client.lanPort = sub.Interface.toUpperCase().replace(/^ETH/, 'LAN');
                }
            }
        }

        if (qoe.Score != null) {
            client.qoeBreakdown = {
                snr: qoe.SnrScore || 0,
                phyRate: qoe.PhyRateScore || 0,
                stability: qoe.StabilityScore || 0,
                retransmission: qoe.RetransmissionScore || 0,
                airtime: qoe.AirtimeScore || 0,
            };
        }

        clients.push(client);
    });

    // Compute gateway client count
    if (gateway) {
        gateway.clients = clients.length;
    }

    // Build WAN list — check for multi-WAN fields in topology.json
    const wans = [{
        id: 'wan1',
        type: 'internet',
        name: 'Internet',
        ip: 'WAN',
        wanIp: '',
        isp: '',
        downloadSpeed: 0,
        uploadSpeed: 0,
        latency: 0,
        status: 'online',
        uptime: '',
        wanType: raw.Uplink === 'wan' ? 'Ethernet WAN' : (raw.Uplink || 'WAN'),
        role: 'primary',
    }];

    // Check for secondary WAN (future SmartOS support)
    // Possible fields: raw.SecondaryWAN, raw.WAN2, hub.WWAN, etc.
    const secondaryWan = raw.SecondaryWAN || raw.WAN2 || (hub && hub.WWAN);
    if (secondaryWan) {
        wans.push({
            id: 'wan2',
            type: 'internet',
            name: 'Internet',
            ip: 'WAN',
            wanIp: secondaryWan.Address || '',
            isp: secondaryWan.ISP || secondaryWan.Carrier || '',
            downloadSpeed: secondaryWan.DownloadSpeed || 0,
            uploadSpeed: secondaryWan.UploadSpeed || 0,
            latency: secondaryWan.Latency || 0,
            status: secondaryWan.State === 'Active' ? 'online' : 'offline',
            uptime: '',
            wanType: secondaryWan.Type || 'WWAN',
            wanMode: secondaryWan.Mode || 'failover',
            role: 'secondary',
            interface: secondaryWan.Interface || 'USB',
        });
    }

    return {
        wans,
        gateway,
        satellites,
        clients,
    };
}

// ── Client History ──────────────────────────────────
const CH_NETDATA_BASE = 'http://192.168.0.1:19999';
const CH_BUCKETS = 96;           // 15-min buckets over 24h
const CH_CACHE_TTL = 5 * 60000;  // 5 minutes
let chCachedClients = null;
let chCachedHeatmap = null;
let chLastFetchTime = 0;
let chSelectedMac = null;
let chTooltipEl = null;
let chDetailCache = {};
let chBandFilter = new Set();
let chUsingMock = false;

function chMacClean(mac) { return mac.replace(/:/g, '').toUpperCase(); }
function chMacFormat(clean) {
    return clean.match(/.{2}/g).join(':').toUpperCase();
}

// Band color helper
function chBandColor(band) {
    if (!band) return 'var(--text-muted)';
    const b = band.toUpperCase();
    if (b.includes('6')) return 'var(--accent-purple)';
    if (b.includes('5')) return 'var(--accent-cyan)';
    return 'var(--accent-amber)';
}
function chBandLabel(band) {
    if (!band) return '?';
    const b = band.toUpperCase();
    if (b.includes('6')) return '6 GHz';
    if (b.includes('5')) return '5 GHz';
    if (b.includes('2') || b.includes('24')) return '2.4 GHz';
    return band;
}

// ── Data Layer ──
async function chFetchJson(url, timeoutMs = 5000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
        const r = await fetch(url, { signal: ctrl.signal });
        if (!r.ok) return null;
        return await r.json();
    } catch { return null; }
    finally { clearTimeout(timer); }
}

async function chDiscoverClients() {
    const charts = await chFetchJson(`${CH_NETDATA_BASE}/api/v1/charts`);
    if (!charts?.charts) return null;
    const clients = [];
    const bandMap = {};
    // Collect band info from signal_quality charts
    Object.entries(charts.charts).forEach(([k, v]) => {
        if (!k.startsWith('clientdevice.signal_quality.') || k.includes('wifi_clients')) return;
        const mac = k.split('.')[2];
        bandMap[mac] = {
            band: v.chart_labels?.srg_band || null,
            hostname: v.chart_labels?.srg_client_hostname || null,
        };
    });
    // Build client list from QoE charts
    Object.entries(charts.charts).forEach(([k, v]) => {
        if (!k.startsWith('clientdevice.qoe.')) return;
        const mac = k.split('.')[2];
        if (mac === 'wifi_clients') return;
        const chartType = v.chart_labels?.srg_chart_type;
        if (chartType === 'ethernet') return; // WiFi only
        const sig = bandMap[mac] || {};
        const hostname = sig.hostname || v.chart_labels?.srg_client_hostname || null;
        const displayName = (hostname && hostname !== '[none]') ? hostname : chMacFormat(mac);
        clients.push({
            mac,
            macFormatted: chMacFormat(mac),
            hostname: displayName,
            band: sig.band || null,
            chartId: k,
            hasSignal: !!bandMap[mac],
        });
    });
    return clients;
}

async function chFetchHeatmapData(clients) {
    const results = new Map();
    const semaphore = { active: 0, max: 10, queue: [] };
    const acquire = () => new Promise(resolve => {
        if (semaphore.active < semaphore.max) { semaphore.active++; resolve(); }
        else semaphore.queue.push(resolve);
    });
    const release = () => {
        semaphore.active--;
        if (semaphore.queue.length) { semaphore.active++; semaphore.queue.shift()(); }
    };

    await Promise.all(clients.map(async (client) => {
        await acquire();
        try {
            const url = `${CH_NETDATA_BASE}/api/v1/data?chart=${client.chartId}&after=-86400&points=${CH_BUCKETS}&format=json`;
            const data = await chFetchJson(url, 8000);
            if (!data?.data) return;
            // dims: [time, score, snr, retrans, phy, airtime, stab]
            const scores = [];
            const active = [];
            const times = [];
            // netdata returns newest first, reverse for chronological
            const rows = [...data.data].reverse();
            rows.forEach(r => {
                times.push(r[0]);
                scores.push(r[1]);
                active.push(r[3] !== null); // retrans non-null = active
            });
            results.set(client.mac, {
                scores, active, times,
                band: client.band,
                hostname: client.hostname,
                mac: client.mac,
                totalActive: active.filter(Boolean).length,
                avgScore: scores.filter((s, i) => active[i] && s !== null).reduce((a, b) => a + b, 0) /
                           (scores.filter((s, i) => active[i] && s !== null).length || 1),
            });
        } finally { release(); }
    }));
    return results;
}

function chGenerateMockData() {
    const clients = TOPOLOGY.clients.filter(c => c.connection !== 'ethernet' && c.status !== 'offline');
    const results = new Map();
    clients.forEach(c => {
        const scores = [];
        const active = [];
        const times = [];
        const now = Math.floor(Date.now() / 1000);
        let val = computeQoE ? computeQoE(c) : 75;
        for (let i = 0; i < CH_BUCKETS; i++) {
            const t = now - (CH_BUCKETS - i) * 900;
            times.push(t);
            const hour = new Date(t * 1000).getHours();
            // Activity pattern based on device type
            let actProb = 0.3;
            if (c.type === 'streaming' || c.type === 'tv') actProb = hour >= 19 && hour <= 23 ? 0.9 : 0.1;
            else if (c.type === 'laptop' || c.type === 'desktop') actProb = hour >= 8 && hour <= 18 ? 0.8 : 0.1;
            else if (c.type === 'phone') actProb = hour >= 7 && hour <= 23 ? 0.5 : 0.05;
            else if (c.type === 'iot' || c.type === 'camera') actProb = 0.15;
            else if (c.type === 'speaker') actProb = hour >= 17 && hour <= 22 ? 0.7 : 0.1;
            const isActive = Math.random() < actProb;
            active.push(isActive);
            val += (Math.random() - 0.5) * 12;
            val = Math.max(20, Math.min(100, val * 0.9 + (computeQoE ? computeQoE(c) : 75) * 0.1));
            scores.push(Math.round(val));
        }
        const mac = chMacClean(c.mac || c.id);
        results.set(mac, {
            scores, active, times,
            band: c.band?.replace(' GHz', 'G') || null,
            hostname: c.name,
            mac,
            totalActive: active.filter(Boolean).length,
            avgScore: scores.filter((s, i) => active[i]).reduce((a, b) => a + b, 0) /
                       (active.filter(Boolean).length || 1),
        });
    });
    return results;
}

// ── Network Pulse SVG ──
// Pulse band colors — match Map legend: 6G=purple, 5G=cyan, 2.4G=amber
const CH_BAND_FILLS = { '6G': 'rgba(168,85,247,0.55)', '5G': 'rgba(0,210,190,0.55)',  '2G': 'rgba(245,158,11,0.50)' };
const CH_BAND_STROKES = { '6G': 'rgba(168,85,247,0.9)', '5G': 'rgba(0,210,190,0.9)', '2G': 'rgba(245,158,11,0.7)' };
const CH_BAND_LABELS = { '6G': '6 GHz', '5G': '5 GHz', '2G': '2.4 GHz' };
let chPulseCounts = null; // cached for tooltip

function renderNetworkPulse(container, heatmapData) {
    const W = 1400, H = 72, PAD_L = 0, PAD_R = 0, PAD_T = 2, PAD_B = 2;
    const plotW = W - PAD_L - PAD_R;
    const plotH = H - PAD_T - PAD_B;

    const bands = ['6G', '5G', '2G'];
    const counts = bands.map(() => new Array(CH_BUCKETS).fill(0));
    let maxCount = 1;
    // Collect first timestamp for time display
    let firstTimestamp = null;
    for (const [, d] of heatmapData) {
        if (!firstTimestamp && d.times?.length) firstTimestamp = d.times[0];
        const b = (d.band || '').toUpperCase();
        let idx = b.includes('6') ? 0 : b.includes('5') ? 1 : 2;
        for (let i = 0; i < CH_BUCKETS; i++) {
            if (d.active[i]) counts[idx][i]++;
        }
    }
    chPulseCounts = { bands, counts, firstTimestamp };

    const stacked = bands.map((_, bi) => {
        const row = new Array(CH_BUCKETS);
        for (let i = 0; i < CH_BUCKETS; i++) {
            let sum = 0;
            for (let j = 0; j <= bi; j++) sum += counts[j][i];
            row[i] = sum;
        }
        return row;
    });
    for (const s of stacked[stacked.length - 1]) if (s > maxCount) maxCount = s;

    const x = i => PAD_L + (i / (CH_BUCKETS - 1)) * plotW;
    const y = v => PAD_T + plotH - (v / maxCount) * plotH;

    let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="none" style="display:block">`;

    // Grid lines
    for (let g = 0; g <= maxCount; g += Math.max(1, Math.ceil(maxCount / 4))) {
        svg += `<line x1="0" y1="${y(g)}" x2="${W}" y2="${y(g)}" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>`;
    }

    // Stacked areas (bottom-up)
    for (let bi = bands.length - 1; bi >= 0; bi--) {
        const top = stacked[bi];
        const bottom = bi > 0 ? stacked[bi - 1] : new Array(CH_BUCKETS).fill(0);
        let path = `M${x(0)},${y(top[0])}`;
        for (let i = 1; i < CH_BUCKETS; i++) path += ` L${x(i)},${y(top[i])}`;
        for (let i = CH_BUCKETS - 1; i >= 0; i--) path += ` L${x(i)},${y(bottom[i])}`;
        path += 'Z';
        svg += `<path d="${path}" fill="${CH_BAND_FILLS[bands[bi]]}" stroke="${CH_BAND_STROKES[bands[bi]]}" stroke-width="1"/>`;
    }

    // Crosshair line inside SVG (vertical lines render fine with preserveAspectRatio="none")
    svg += `<line id="chPulseCrossLine" x1="0" y1="0" x2="0" y2="${H}" stroke="rgba(255,255,255,0.3)" stroke-width="1" display="none"/>`;
    svg += '</svg>';

    // Y-axis labels as HTML (won't distort)
    const yLabels = [];
    for (let g = 0; g <= maxCount; g += Math.max(1, Math.ceil(maxCount / 4))) {
        const pct = 100 - ((g / maxCount) * 100);
        yLabels.push(`<span style="position:absolute;left:2px;top:${pct}%;transform:translateY(-50%);font-size:9px;font-family:var(--font-mono);color:var(--text-muted)">${g}</span>`);
    }

    container.innerHTML = `
        <div class="ch-pulse-label">Active Clients</div>
        <div class="ch-pulse-legend">
            <span><span class="ch-pulse-legend-dot" style="background:${CH_BAND_FILLS['6G']}"></span>6 GHz</span>
            <span><span class="ch-pulse-legend-dot" style="background:${CH_BAND_FILLS['5G']}"></span>5 GHz</span>
            <span><span class="ch-pulse-legend-dot" style="background:${CH_BAND_FILLS['2G']}"></span>2.4 GHz</span>
        </div>
        <div class="ch-pulse-chart" style="position:relative;padding-left:18px">${yLabels.join('')}${svg}</div>`;

    // Crosshair + tooltip
    const chartDiv = container.querySelector('.ch-pulse-chart');
    const svgEl = chartDiv.querySelector('svg');
    const crossLine = svgEl?.querySelector('#chPulseCrossLine');
    // HTML dot (SVG circles distort with preserveAspectRatio="none")
    const pDot = document.createElement('div');
    pDot.className = 'ch-crosshair-dot';
    pDot.style.cssText = 'display:none;position:absolute;width:7px;height:7px;border-radius:50%;background:white;box-shadow:0 0 4px rgba(255,255,255,0.6);pointer-events:none;z-index:3;transform:translate(-50%,-50%)';
    chartDiv.appendChild(pDot);

    chartDiv.addEventListener('mousemove', e => {
        if (!svgEl) return;
        const svgRect = svgEl.getBoundingClientRect();
        const svgXFrac = (e.clientX - svgRect.left) / svgRect.width;
        const idx = Math.min(CH_BUCKETS - 1, Math.max(0, Math.floor(svgXFrac * CH_BUCKETS)));
        if (!chPulseCounts) return;
        const { bands: b, counts: c, firstTimestamp } = chPulseCounts;
        const t = firstTimestamp ? new Date((firstTimestamp + idx * 900) * 1000) : null;
        const timeStr = t ? t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
        const total = b.reduce((sum, _, bi) => sum + c[bi][idx], 0);
        let html = `<b>${timeStr}</b> — ${total} active<br>`;
        b.forEach((band, bi) => {
            if (c[bi][idx] > 0) html += `<span style="color:${CH_BAND_STROKES[band]}">${CH_BAND_LABELS[band]}: ${c[bi][idx]}</span><br>`;
        });
        chShowTooltip(e, html);

        // SVG crosshair line
        const dataX = x(idx);
        if (crossLine) {
            crossLine.setAttribute('x1', dataX);
            crossLine.setAttribute('x2', dataX);
            crossLine.setAttribute('display', '');
        }

        // HTML dot via getScreenCTM — converts SVG coords to screen coords accurately
        const topCount = stacked[stacked.length - 1][idx];
        const dataY = y(topCount);
        const ctm = svgEl.getScreenCTM();
        if (ctm) {
            const screenX = ctm.a * dataX + ctm.e;
            const screenY = ctm.d * dataY + ctm.f;
            const chartRect = chartDiv.getBoundingClientRect();
            pDot.style.display = '';
            pDot.style.left = (screenX - chartRect.left) + 'px';
            pDot.style.top = (screenY - chartRect.top) + 'px';
        }
    });
    chartDiv.addEventListener('mouseleave', () => {
        chHideTooltip();
        if (crossLine) crossLine.setAttribute('display', 'none');
        pDot.style.display = 'none';
    });
}


// ── Heatmap Grid ──
function renderHeatmapGrid(container, heatmapData) {
    // Sort: most active first, then by avg QoE descending
    let entries = [...heatmapData.values()];
    if (chBandFilter.size > 0) {
        entries = entries.filter(d => {
            const b = chBandLabel(d.band);
            return chBandFilter.has(b);
        });
    }
    entries.sort((a, b) => b.totalActive - a.totalActive || b.avgScore - a.avgScore);

    // Time axis — place labels at correct grid columns
    let html = '<div class="ch-time-axis" id="chTimeAxis"><div></div>';
    for (let h = 0; h < 24; h += 3) {
        const col = Math.round((h / 24) * 96) + 2; // +2 for 1-indexed grid + label column
        html += `<div class="ch-time-label" style="grid-column:${col}">${String(h).padStart(2, '0')}:00</div>`;
    }
    html += '</div>';

    // Rows
    entries.forEach(d => {
        html += `<div class="ch-row${chSelectedMac === d.mac ? ' ch-row-selected' : ''}" data-mac="${d.mac}">`;
        html += `<div class="ch-row-label"><span class="ch-band-dot" style="background:${chBandColor(d.band)}"></span>${escapeHtml(d.hostname)}</div>`;
        for (let i = 0; i < CH_BUCKETS; i++) {
            const score = d.scores[i];
            const isActive = d.active[i];
            let cls = 'ch-cell-idle';
            if (score === null || score === undefined) cls = 'ch-cell-nodata';
            else if (isActive) {
                if (score >= 70) cls = 'ch-cell-good';
                else if (score >= 40) cls = 'ch-cell-fair';
                else cls = 'ch-cell-poor';
            }
            const t = d.times[i];
            const timeStr = t ? new Date(t * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
            html += `<div class="ch-cell ${cls}" data-idx="${i}" data-score="${score ?? ''}" data-active="${isActive}" data-time="${timeStr}"></div>`;
        }
        html += '</div>';
    });

    container.innerHTML = html;
}

function escapeHtml(s) {
    if (!s) return '';
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Tooltip ──
function chShowTooltip(e, html) {
    if (!chTooltipEl) {
        chTooltipEl = document.createElement('div');
        chTooltipEl.className = 'ch-tooltip';
        document.body.appendChild(chTooltipEl);
    }
    chTooltipEl.innerHTML = html;
    chTooltipEl.style.display = 'block';
    // Flip to left side if near right edge
    const tipWidth = chTooltipEl.offsetWidth || 150;
    if (e.clientX + tipWidth + 20 > window.innerWidth) {
        chTooltipEl.style.left = (e.clientX - tipWidth - 12) + 'px';
    } else {
        chTooltipEl.style.left = (e.clientX + 12) + 'px';
    }
    chTooltipEl.style.top = (e.clientY - 30) + 'px';
}
function chHideTooltip() {
    if (chTooltipEl) chTooltipEl.style.display = 'none';
}

// ── Detail Drawer ──
async function openDetailDrawer(mac) {
    chSelectedMac = mac;
    const drawer = document.getElementById('chDetailDrawer');
    drawer.classList.add('open');
    // Highlight selected row
    document.querySelectorAll('.ch-row').forEach(r => r.classList.toggle('ch-row-selected', r.dataset.mac === mac));

    const clientInfo = chCachedHeatmap?.get(mac);
    const name = clientInfo?.hostname || chMacFormat(mac);
    const band = clientInfo?.band;

    drawer.innerHTML = `<div class="ch-detail-header">
        <div><span class="ch-detail-client-name">${escapeHtml(name)}</span>
        <span class="ch-detail-client-meta">${chBandLabel(band)} / ${chMacFormat(mac)}</span></div>
        <button class="ch-detail-close" id="chDetailClose">&times;</button>
    </div><div class="ch-detail-charts"><div class="ch-loading">Loading detail data</div></div>`;

    document.getElementById('chDetailClose').addEventListener('click', closeDetailDrawer);

    // Fetch high-res data
    const detail = await chFetchDetailData(mac);
    if (chSelectedMac !== mac) return; // user clicked another

    renderDetailCharts(drawer, detail, name, band);
}

async function chFetchDetailData(mac) {
    if (chDetailCache[mac]) return chDetailCache[mac];

    if (chUsingMock) {
        // Generate mock detail
        const d = chCachedHeatmap?.get(mac);
        const points = 1440;
        const now = Math.floor(Date.now() / 1000);
        const scores = [], signal = [], throughput = [], retrans = [], times = [];
        let val = d?.avgScore || 75, sig = -45, tp = 0, rt = 5;
        for (let i = 0; i < points; i++) {
            const t = now - (points - i) * 60;
            times.push(t);
            const hour = new Date(t * 1000).getHours();
            const isActive = d ? d.active[Math.floor(i / 15)] : Math.random() > 0.5;
            val += (Math.random() - 0.5) * 6;
            val = Math.max(15, Math.min(100, val));
            scores.push(isActive ? Math.round(val) : null);
            sig += (Math.random() - 0.5) * 2;
            sig = Math.max(-75, Math.min(-30, sig));
            signal.push(Math.round(sig));
            tp = isActive ? Math.max(0, tp + (Math.random() - 0.4) * 20) : 0;
            throughput.push(Math.round(tp * 10) / 10);
            rt = isActive ? Math.max(0, Math.min(60, rt + (Math.random() - 0.5) * 4)) : 0;
            retrans.push(Math.round(rt * 10) / 10);
        }
        const result = { scores, signal, throughput, retrans, times };
        chDetailCache[mac] = result;
        return result;
    }

    // Real netdata fetch
    const qoeUrl = `${CH_NETDATA_BASE}/api/v1/data?chart=clientdevice.qoe.${mac}&after=-86400&points=1440&format=json`;
    const qoeData = await chFetchJson(qoeUrl, 10000);

    const sigUrl = `${CH_NETDATA_BASE}/api/v1/data?chart=clientdevice.signal_quality.${mac}&after=-86400&points=1440&format=json`;
    const sigData = await chFetchJson(sigUrl, 10000);

    const retUrl = `${CH_NETDATA_BASE}/api/v1/data?chart=clientdevice.retrans_rate.${mac}&after=-86400&points=1440&format=json`;
    const retData = await chFetchJson(retUrl, 10000);

    const tpUrl = `${CH_NETDATA_BASE}/api/v1/data?chart=clientdevice.throughput_l2.${mac}&after=-86400&points=1440&format=json`;
    const tpData = await chFetchJson(tpUrl, 10000);

    const parse = (d, idx) => d?.data ? [...d.data].reverse().map(r => r[idx]) : null;
    const parseTimes = d => d?.data ? [...d.data].reverse().map(r => r[0]) : null;

    const result = {
        scores: parse(qoeData, 1),       // score
        signal: parse(sigData, 1),        // rx_signal
        throughput: parse(tpData, 1),     // download
        retrans: parse(retData, 1),       // retrans (may be from column index 1 or 2 depending on chart)
        times: parseTimes(qoeData) || parseTimes(sigData) || [],
    };
    chDetailCache[mac] = result;
    return result;
}

function renderDetailCharts(drawer, detail, name, band) {
    const chartsDiv = drawer.querySelector('.ch-detail-charts');
    if (!chartsDiv) return;

    const charts = [
        { title: 'QoE Score', data: detail.scores, color: null, isQoE: true, unit: '', yMin: 0, yMax: 100 },
        { title: 'Signal (dBm)', data: detail.signal, color: 'var(--accent-cyan)', unit: ' dBm', yMin: -80, yMax: -20 },
        { title: 'Throughput (Mbps)', data: detail.throughput, color: 'var(--accent-green)', unit: ' Mbps', yMin: 0 },
        { title: 'Retransmission (%)', data: detail.retrans, color: 'var(--accent-amber)', unit: ' %', yMin: 0, yMax: 60 },
    ];

    let html = '';
    charts.forEach((chart, ci) => {
        const { svgStr, computedMin, computedMax } = renderMiniChart(chart);
        // Y-axis labels as HTML overlay
        let yLabels = '';
        if (computedMin !== undefined) {
            const fmt = v => Number.isInteger(v) ? v : v.toFixed(0);
            yLabels = `<span class="ch-detail-y-label" style="top:2px">${fmt(computedMax)}</span>
                       <span class="ch-detail-y-label" style="bottom:0">${fmt(computedMin)}</span>`;
        }
        html += `<div class="ch-detail-chart" data-chart-idx="${ci}">
            <div class="ch-detail-chart-title">${chart.title}</div>
            <div class="ch-detail-chart-body">${yLabels}${svgStr}</div>
        </div>`;
    });
    chartsDiv.innerHTML = html;

    // Hover tooltips + crosshair
    const miniW = 300, miniH = 80, miniPAD = 4;
    const miniPlotW = miniW - miniPAD * 2, miniPlotH = miniH - miniPAD * 2;

    chartsDiv.querySelectorAll('.ch-detail-chart-body').forEach(body => {
        const svgEl = body.querySelector('svg');
        const crossLine = svgEl?.querySelector('.ch-mini-cross-line');
        // HTML dot (SVG circles distort)
        const hDot = document.createElement('div');
        hDot.style.cssText = 'display:none;position:absolute;width:6px;height:6px;border-radius:50%;pointer-events:none;z-index:3;transform:translate(-50%,-50%);box-shadow:0 0 3px currentColor';
        body.appendChild(hDot);

        body.addEventListener('mousemove', e => {
            const ci = parseInt(body.parentElement.dataset.chartIdx);
            const chart = charts[ci];
            if (!chart?.data?.length || !svgEl) return;
            const svgRect = svgEl.getBoundingClientRect();
            const svgXFrac = Math.max(0, Math.min(1, (e.clientX - svgRect.left) / svgRect.width));
            const idx = Math.min(chart.data.length - 1, Math.floor(svgXFrac * chart.data.length));
            const val = chart.data[idx];
            const t = detail.times?.[idx];
            const timeStr = t ? new Date(t * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
            const valStr = val !== null && val !== undefined ? `${Math.round(val * 10) / 10}${chart.unit}` : 'No data';
            chShowTooltip(e, `<b>${timeStr}</b> ${chart.title}: ${valStr}`);

            // SVG crosshair line
            const dataX = miniPAD + (idx / (chart.data.length - 1)) * miniPlotW;
            if (crossLine) {
                crossLine.setAttribute('x1', dataX);
                crossLine.setAttribute('x2', dataX);
                crossLine.setAttribute('display', '');
            }

            // HTML dot via getScreenCTM
            if (val !== null && val !== undefined) {
                const cMin = chart.yMin ?? Math.min(...chart.data.filter(v => v !== null));
                const cMax = chart.yMax ?? Math.max(...chart.data.filter(v => v !== null));
                const range = cMax - cMin || 1;
                const dataY = miniPAD + miniPlotH - ((val - cMin) / range) * miniPlotH;
                const ctm = svgEl.getScreenCTM();
                if (ctm) {
                    const screenX = ctm.a * dataX + ctm.e;
                    const screenY = ctm.d * dataY + ctm.f;
                    const bodyRect = body.getBoundingClientRect();
                    const dotColor = chart.isQoE
                        ? (val >= 70 ? 'rgba(45,206,137,1)' : val >= 40 ? 'rgba(251,175,64,1)' : 'rgba(255,69,58,1)')
                        : chart.color === 'var(--accent-cyan)' ? 'rgba(0,210,190,1)'
                        : chart.color === 'var(--accent-green)' ? 'rgba(0,210,100,1)'
                        : chart.color === 'var(--accent-amber)' ? 'rgba(245,158,11,1)'
                        : 'white';
                    hDot.style.display = '';
                    hDot.style.left = (screenX - bodyRect.left) + 'px';
                    hDot.style.top = (screenY - bodyRect.top) + 'px';
                    hDot.style.background = dotColor;
                    hDot.style.color = dotColor;
                }
            } else {
                hDot.style.display = 'none';
            }
        });
        body.addEventListener('mouseleave', () => {
            chHideTooltip();
            if (crossLine) crossLine.setAttribute('display', 'none');
            hDot.style.display = 'none';
        });
    });
}

function renderMiniChart({ data, color, isQoE, yMin, yMax }) {
    if (!data || data.length === 0) return { svgStr: '<div class="ch-loading" style="font-size:9px">No data</div>' };

    const W = 300, H = 80, PAD = 4;
    const plotW = W - PAD * 2, plotH = H - PAD * 2;
    const vals = data.map(v => v ?? null);
    const nonNull = vals.filter(v => v !== null);
    if (nonNull.length === 0) return { svgStr: '<div class="ch-loading" style="font-size:9px">No data</div>' };

    const min = yMin ?? Math.min(...nonNull);
    const max = yMax ?? Math.max(...nonNull);
    const range = max - min || 1;
    const x = i => PAD + (i / (vals.length - 1)) * plotW;
    const y = v => PAD + plotH - ((v - min) / range) * plotH;

    let svg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">`;

    // Axis lines
    svg += `<line x1="${PAD}" y1="${H - PAD}" x2="${W - PAD}" y2="${H - PAD}" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>`;
    svg += `<line x1="${PAD}" y1="${PAD}" x2="${PAD}" y2="${H - PAD}" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>`;

    if (isQoE) {
        // Zone-colored QoE chart
        const zones = [
            { min: 70, fill: 'rgba(45,206,137,0.15)', stroke: 'rgba(45,206,137,0.8)' },
            { min: 40, fill: 'rgba(251,175,64,0.15)', stroke: 'rgba(251,175,64,0.8)' },
            { min: 0,  fill: 'rgba(255,69,58,0.15)',  stroke: 'rgba(255,69,58,0.8)' },
        ];
        // Draw threshold lines
        [70, 40].forEach(t => {
            const ty = y(t);
            svg += `<line x1="${PAD}" y1="${ty}" x2="${W - PAD}" y2="${ty}" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" stroke-dasharray="3,3"/>`;
        });
        // Draw colored segments
        let segStart = null;
        let segZone = -1;
        const flush = (start, end, zone) => {
            if (start === null || start >= end) return;
            const z = zones[zone] || zones[2];
            let fill = `M${x(start)},${y(0)}`;
            let line = `M${x(start)},${y(vals[start])}`;
            for (let j = start; j <= end; j++) {
                if (vals[j] === null) continue;
                fill += ` L${x(j)},${y(vals[j])}`;
                line += ` L${x(j)},${y(vals[j])}`;
            }
            fill += ` L${x(end)},${y(0)}Z`;
            svg += `<path d="${fill}" fill="${z.fill}"/>`;
            svg += `<path d="${line}" fill="none" stroke="${z.stroke}" stroke-width="1.2"/>`;
        };
        for (let i = 0; i < vals.length; i++) {
            if (vals[i] === null) { flush(segStart, i - 1, segZone); segStart = null; continue; }
            const z = vals[i] >= 70 ? 0 : vals[i] >= 40 ? 1 : 2;
            if (z !== segZone && segStart !== null) { flush(segStart, i - 1, segZone); segStart = i; }
            if (segStart === null) segStart = i;
            segZone = z;
        }
        flush(segStart, vals.length - 1, segZone);
    } else {
        // Simple line chart
        let path = '';
        let areaPath = '';
        let started = false;
        for (let i = 0; i < vals.length; i++) {
            if (vals[i] === null) { started = false; continue; }
            if (!started) {
                path += `M${x(i)},${y(vals[i])}`;
                areaPath += `M${x(i)},${y(min)} L${x(i)},${y(vals[i])}`;
                started = true;
            } else {
                path += ` L${x(i)},${y(vals[i])}`;
                areaPath += ` L${x(i)},${y(vals[i])}`;
            }
        }
        // Close area
        for (let i = vals.length - 1; i >= 0; i--) {
            if (vals[i] !== null) { areaPath += ` L${x(i)},${y(min)}Z`; break; }
        }
        const fillColor = color ? color.replace(')', ',0.12)').replace('var(', '').replace(')', '') : 'rgba(255,255,255,0.05)';
        // Use a simpler approach for fill
        svg += `<path d="${areaPath}" fill="${color === 'var(--accent-cyan)' ? 'rgba(0,210,190,0.1)' :
                    color === 'var(--accent-green)' ? 'rgba(0,210,100,0.1)' :
                    color === 'var(--accent-amber)' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)'}"/>`;
        svg += `<path d="${path}" fill="none" stroke="${color || 'var(--text-secondary)'}" stroke-width="1.2"/>`;
    }

    // Crosshair elements inside SVG
    svg += `<line class="ch-mini-cross-line" x1="0" y1="0" x2="0" y2="${H}" stroke="rgba(255,255,255,0.3)" stroke-width="0.5" display="none"/>`;
    svg += `<circle class="ch-mini-cross-dot" cx="0" cy="0" r="3" fill="white" stroke="rgba(0,0,0,0.4)" stroke-width="0.5" display="none"/>`;
    svg += '</svg>';
    return { svgStr: svg, computedMin: min, computedMax: max };
}

function closeDetailDrawer() {
    chSelectedMac = null;
    const drawer = document.getElementById('chDetailDrawer');
    drawer.classList.remove('open');
    document.querySelectorAll('.ch-row.ch-row-selected').forEach(r => r.classList.remove('ch-row-selected'));
}

// ── Init & Events ──
async function initClientHistory(forceRefresh = false) {
    const now = Date.now();
    if (!forceRefresh && chCachedHeatmap && (now - chLastFetchTime) < CH_CACHE_TTL) {
        // Re-render from cache
        renderNetworkPulse(document.getElementById('chPulseHeader'), chCachedHeatmap);
        renderHeatmapGrid(document.getElementById('chHeatmapGrid'), chCachedHeatmap);
        return;
    }

    const grid = document.getElementById('chHeatmapGrid');
    const pulse = document.getElementById('chPulseHeader');
    grid.innerHTML = '<div class="ch-loading">Fetching client history</div>';
    pulse.innerHTML = '';

    // Try real netdata
    chUsingMock = false;
    const clients = await chDiscoverClients();
    const badge = document.getElementById('chDataBadge');

    if (clients && clients.length > 0) {
        chCachedClients = clients;
        chCachedHeatmap = await chFetchHeatmapData(clients);
        if (badge) badge.style.display = 'none';
    } else {
        // Fallback to mock
        chUsingMock = true;
        chCachedHeatmap = chGenerateMockData();
        if (badge) { badge.style.display = ''; badge.textContent = 'MOCK DATA'; }
    }

    chLastFetchTime = Date.now();
    chDetailCache = {};
    renderNetworkPulse(pulse, chCachedHeatmap);
    renderHeatmapGrid(grid, chCachedHeatmap);
}

function bindClientHistoryEvents() {
    const grid = document.getElementById('chHeatmapGrid');
    if (!grid) return;

    // Row click → detail drawer
    grid.addEventListener('click', e => {
        const row = e.target.closest('.ch-row');
        if (row?.dataset.mac) openDetailDrawer(row.dataset.mac);
    });

    // Cell hover → tooltip
    grid.addEventListener('mouseover', e => {
        if (!e.target.classList.contains('ch-cell')) return;
        const time = e.target.dataset.time;
        const score = e.target.dataset.score;
        const active = e.target.dataset.active === 'true';
        if (!time) return;
        const status = active ? `QoE: ${Math.round(parseFloat(score))}` : 'Idle';
        chShowTooltip(e, `${time} — ${status}`);
    });
    grid.addEventListener('mouseout', e => {
        if (e.target.classList.contains('ch-cell')) chHideTooltip();
    });
    grid.addEventListener('mousemove', e => {
        if (e.target.classList.contains('ch-cell') && chTooltipEl) {
            chTooltipEl.style.left = (e.clientX + 12) + 'px';
            chTooltipEl.style.top = (e.clientY - 30) + 'px';
        }
    });

    // Refresh button
    document.getElementById('chRefresh')?.addEventListener('click', () => initClientHistory(true));

    // Escape to close drawer
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && chSelectedMac) closeDetailDrawer();
    });

    // Band filter (simple standalone, not coupled to clientsFilters)
    const bfContainer = document.getElementById('chBandFilter');
    if (bfContainer) {
        const label = bfContainer.dataset.label || 'Band';
        const opts = [{ value: '6 GHz', text: '6 GHz' }, { value: '5 GHz', text: '5 GHz' }, { value: '2.4 GHz', text: '2.4 GHz' }];
        const btn = document.createElement('div');
        btn.className = 'cf-multi-btn';
        btn.textContent = `All ${label}`;
        const menu = document.createElement('div');
        menu.className = 'cf-multi-menu';
        opts.forEach(o => {
            const item = document.createElement('label');
            item.className = 'cf-multi-item';
            item.innerHTML = `<input type="checkbox" value="${o.value}"> ${o.text}`;
            menu.appendChild(item);
        });
        bfContainer.appendChild(btn);
        bfContainer.appendChild(menu);
        btn.addEventListener('click', e => {
            e.stopPropagation();
            document.querySelectorAll('.cf-multi.open').forEach(m => { if (m !== bfContainer) m.classList.remove('open'); });
            bfContainer.classList.toggle('open');
        });
        menu.addEventListener('change', () => {
            chBandFilter.clear();
            menu.querySelectorAll('input:checked').forEach(cb => chBandFilter.add(cb.value));
            btn.textContent = chBandFilter.size === 0 ? `All ${label}` : [...chBandFilter].join(', ');
            if (chCachedHeatmap) {
                renderHeatmapGrid(document.getElementById('chHeatmapGrid'), chCachedHeatmap);
            }
        });
        document.addEventListener('click', () => bfContainer.classList.remove('open'));
    }
}

// ── Init ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    init();
    bindTimeMachineEvents();
    bindClientsEvents();
    bindClientHistoryEvents();
    // Auto-switch view via URL param (e.g., ?view=clients)
    const urlView = new URLSearchParams(location.search).get('view');
    if (urlView) switchView(urlView);
});
