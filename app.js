/* ============================================
   Intellifi Topology – Application
   ============================================ */

// ── Mock Data ──────────────────────────────────────
const TOPOLOGY = {
    internet: {
        id: 'internet',
        type: 'internet',
        name: 'Internet',
        ip: 'WAN',
        wanIp: '72.168.14.201',
        isp: 'Frontier FiOS',
        downloadSpeed: 940,
        uploadSpeed: 880,
        latency: 4,
        status: 'online',
        uptime: '34d 7h 22m',
    },
    gateway: {
        id: 'gateway',
        type: 'gateway',
        name: 'LAUNDRY_8733',
        model: 'SDG-8733',
        modelDesc: 'Gateway',
        mac: 'A8:13:74:8D:87:33',
        ip: '192.168.0.1',
        firmware: 'SmartOS 4.2.1',
        wanType: '10GbE WAN',
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
        { id: 'c2', name: 'NAS-Synology', mac: '00:11:32:AB:CD:EF', ip: '192.168.0.10', parentId: 'gateway', connection: 'ethernet', rxRate: 1000, txRate: 1000, activity: { down: 0, up: 0 }, type: 'server', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c18', name: 'Pi-Hole DNS', mac: 'B8:27:EB:11:22:33', ip: '192.168.0.7', parentId: 'gateway', connection: 'ethernet', rxRate: 1000, txRate: 1000, activity: { down: 0, up: 0 }, type: 'server', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c19', name: 'UniFi Switch', mac: 'F0:9F:C2:44:55:66', ip: '192.168.0.8', parentId: 'gateway', connection: 'ethernet', rxRate: 1000, txRate: 1000, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c20', name: 'Gaming-PC', mac: '70:85:C2:77:88:99', ip: '192.168.0.101', parentId: 'gateway', band: '6 GHz', rssi: -28, rxRate: 5765, txRate: 5765, activity: { down: 78.3, up: 24.1 }, type: 'desktop', status: 'online', connectedSince: '5h 33m', qoeBreakdown: { snr: 98, phyRate: 100, stability: 88 }, wifiVersion: '7' },
        { id: 'c21', name: 'Hue Bridge', mac: '00:17:88:AA:BB:CC', ip: '192.168.0.9', parentId: 'gateway', connection: 'ethernet', rxRate: 100, txRate: 100, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c71', name: 'Ring Doorbell', mac: '6C:AB:31:11:22:33', ip: '192.168.0.104', parentId: 'gateway', band: '2.4 GHz', rssi: -55, rxRate: 72, txRate: 72, activity: { down: 0.2, up: 0.8 }, type: 'iot', status: 'online', connectedSince: '34d 7h', qoeBreakdown: { snr: 58, phyRate: 40, stability: 72 } },
        { id: 'c74', name: 'MacBook M4', mac: '3C:22:FB:44:55:66', ip: '192.168.0.107', parentId: 'gateway', band: '6 GHz', rssi: -32, rxRate: 5765, txRate: 5765, activity: { down: 95.2, up: 42.7 }, type: 'laptop', status: 'online', connectedSince: '4h 15m', qoeBreakdown: { snr: 95, phyRate: 100, stability: 98 }, wifiVersion: '7' },

        // Kitchen satellite clients (hop 1)
        { id: 'c22', name: 'Shield TV Pro', mac: '00:04:4B:DD:EE:FF', ip: '192.168.0.102', parentId: 'sat-kitchen', band: '5 GHz', rssi: -36, rxRate: 2882, txRate: 2882, activity: { down: 35.1, up: 0.8 }, type: 'streaming', status: 'online', connectedSince: '1d 8h', wifiVersion: '7' },
        { id: 'c72', name: 'Echo Dot', mac: 'F0:F0:A4:22:33:44', ip: '192.168.0.105', parentId: 'sat-kitchen', band: '2.4 GHz', rssi: -52, rxRate: 72, txRate: 72, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '12d 5h', idle: true },
        { id: 'c8', name: 'Nest Thermostat', mac: '18:B4:30:77:88:99', ip: '192.168.0.115', parentId: 'sat-kitchen', band: '2.4 GHz', rssi: -58, rxRate: 54, txRate: 54, activity: { down: 2.4, up: 5.8 }, type: 'iot', status: 'online', connectedSince: '34d 7h' },
        { id: 'c11', name: 'HP LaserJet', mac: '30:E1:71:11:22:33', ip: '192.168.0.142', parentId: 'sat-kitchen', band: '2.4 GHz', rssi: -49, rxRate: 72, txRate: 72, activity: { down: 1.8, up: 3.2 }, type: 'printer', status: 'online', connectedSince: '34d 7h', idle: true },

        // Dining satellite clients (hop 2, via kitchen)
        { id: 'c9', name: 'MacBook-Pro', mac: '3C:22:FB:AA:BB:CC', ip: '192.168.0.140', parentId: 'sat-dining', band: '6 GHz', rssi: -29, rxRate: 2402, txRate: 2402, activity: { down: 34.6, up: 22.8 }, type: 'laptop', status: 'online', connectedSince: '8h 44m', qoeBreakdown: { snr: 100, phyRate: 100, stability: 100 } },
        { id: 'c12', name: "Sarah's iPhone", mac: 'E4:42:A6:44:55:66', ip: '192.168.0.143', parentId: 'sat-dining', band: '5 GHz', rssi: -41, rxRate: 573, txRate: 573, activity: { down: 8.2, up: 4.1 }, type: 'phone', status: 'online', connectedSince: '4h 38m' },
        { id: 'c17', name: 'Sonos One', mac: '48:A6:B8:EE:FF:00', ip: '192.168.0.146', parentId: 'sat-dining', band: '2.4 GHz', rssi: -54, rxRate: 65, txRate: 65, activity: { down: 0, up: 0 }, type: 'speaker', status: 'online', connectedSince: '14d 2h', idle: true },
        { id: 'c40', name: 'Brother Printer', mac: '00:80:77:77:88:99', ip: '192.168.0.149', parentId: 'sat-dining', band: '2.4 GHz', rssi: -52, rxRate: 72, txRate: 72, activity: { down: 0, up: 0 }, type: 'printer', status: 'online', connectedSince: '34d 7h', idle: true },

        // Living Room satellite clients (hop 2, via kitchen)
        { id: 'c3', name: 'LG-OLED-TV', mac: 'A8:23:FE:11:22:33', ip: '192.168.0.110', parentId: 'sat-living', band: '5 GHz', rssi: -30, rxRate: 2882, txRate: 2882, activity: { down: 52.3, up: 1.2 }, type: 'tv', status: 'online', connectedSince: '6h 42m', wifiVersion: '7' },
        { id: 'c4', name: "Chad's iPhone 16", mac: 'BC:D0:74:AA:BB:CC', ip: '192.168.0.111', parentId: 'sat-living', band: '6 GHz', rssi: -34, rxRate: 5765, txRate: 5765, activity: { down: 14.8, up: 8.2 }, type: 'phone', status: 'online', connectedSince: '1d 3h', wifiVersion: '7' },
        { id: 'c5', name: 'HomePod Mini', mac: 'F0:B3:EC:DD:EE:FF', ip: '192.168.0.112', parentId: 'sat-living', band: '2.4 GHz', rssi: -52, rxRate: 72, txRate: 72, activity: { down: 0, up: 0 }, type: 'speaker', status: 'online', connectedSince: '12d 8h', idle: true },
        { id: 'c6', name: 'PS5', mac: 'A4:FC:77:11:22:33', ip: '192.168.0.113', parentId: 'sat-living', band: '6 GHz', rssi: -30, rxRate: 5765, txRate: 5765, activity: { down: 62.4, up: 14.1 }, type: 'console', status: 'online', connectedSince: '3h 17m', qoeBreakdown: { snr: 95, phyRate: 100, stability: 95 }, wifiVersion: '7' },
        { id: 'c7', name: 'Ring Doorbell', mac: '6C:56:97:44:55:66', ip: '192.168.0.114', parentId: 'sat-living', band: '2.4 GHz', rssi: -61, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'camera', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c14', name: 'iPad Pro M4', mac: 'DC:A9:04:88:99:AA', ip: '192.168.0.116', parentId: 'sat-living', band: '6 GHz', rssi: -32, rxRate: 5765, txRate: 5765, activity: { down: 12.1, up: 4.3 }, type: 'tablet', status: 'online', connectedSince: '5h 11m', wifiVersion: '7' },
        { id: 'c24', name: 'Samsung Frame', mac: '8C:79:F5:44:55:66', ip: '192.168.0.118', parentId: 'sat-living', band: '5 GHz', rssi: -42, rxRate: 573, txRate: 573, activity: { down: 28.4, up: 0.6 }, type: 'tv', status: 'online', connectedSince: '12h 4m' },
        { id: 'c27', name: 'Roomba i7', mac: '50:14:79:DD:EE:FF', ip: '192.168.0.121', parentId: 'sat-living', band: '2.4 GHz', rssi: -63, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '7d 3h', idle: true },
        { id: 'c35', name: "Dad's Phone", mac: '20:3C:AE:77:88:99', ip: '192.168.0.129', parentId: 'sat-living', band: '5 GHz', rssi: -45, rxRate: 573, txRate: 573, activity: { down: 11.2, up: 5.8 }, type: 'phone', status: 'online', connectedSince: '6h 30m' },
        { id: 'c36', name: 'Fire Stick 4K', mac: '34:D2:70:AA:BB:CC', ip: '192.168.0.130', parentId: 'sat-living', band: '5 GHz', rssi: -36, rxRate: 2882, txRate: 2882, activity: { down: 22.1, up: 0.4 }, type: 'streaming', status: 'online', connectedSince: '4h 15m', wifiVersion: '7' },

        // Upstairs satellite clients (hop 2, via livingroom — Wi-Fi 7 SDG-8733A)
        { id: 'c46', name: 'Office iMac', mac: '3C:07:54:AA:BB:CC', ip: '192.168.0.155', parentId: 'sat-upstairs', band: '6 GHz', rssi: -30, rxRate: 5765, txRate: 5765, activity: { down: 82.4, up: 36.8 }, type: 'desktop', status: 'online', connectedSince: '1d 2h', qoeBreakdown: { snr: 95, phyRate: 100, stability: 92 }, wifiVersion: '7' },
        { id: 'c41', name: 'ThinkPad X1', mac: '54:E1:AD:AA:BB:CC', ip: '192.168.0.150', parentId: 'sat-upstairs', band: '6 GHz', rssi: -36, rxRate: 2882, txRate: 2882, activity: { down: 44.1, up: 22.3 }, type: 'laptop', status: 'online', connectedSince: '7h 15m', wifiVersion: '7' },
        { id: 'c43', name: "Tom's Pixel 9", mac: 'DC:E5:5B:11:22:33', ip: '192.168.0.152', parentId: 'sat-upstairs', band: '6 GHz', rssi: -40, rxRate: 2882, txRate: 2882, activity: { down: 12.4, up: 5.8 }, type: 'phone', status: 'online', connectedSince: '2h 55m', wifiVersion: '7' },
        { id: 'c49', name: 'Nest Protect', mac: '18:B4:30:44:55:66', ip: '192.168.0.158', parentId: 'sat-upstairs', band: '2.4 GHz', rssi: -62, rxRate: 54, txRate: 54, activity: { down: 0, up: 0 }, type: 'iot', status: 'online', connectedSince: '34d 7h', idle: true },
        { id: 'c50', name: 'Galaxy Tab S10', mac: 'CC:3A:61:77:88:99', ip: '192.168.0.159', parentId: 'sat-upstairs', band: '6 GHz', rssi: -42, rxRate: 2882, txRate: 2882, activity: { down: 18.2, up: 4.6 }, type: 'tablet', status: 'online', connectedSince: '1h 30m', wifiVersion: '7' },

        // ── Additional clients (to reach 70+) ──────────────
        // Gateway extras
        { id: 'c51', name: 'Work Laptop', mac: '4C:CC:6A:22:33:44', ip: '192.168.0.160', parentId: 'gateway', band: '5 GHz', rssi: -34, rxRate: 2882, txRate: 2882, activity: { down: 28.4, up: 14.2 }, type: 'laptop', status: 'online', connectedSince: '3h 22m', wifiVersion: '7' },
        { id: 'c52', name: 'Sonos Beam', mac: '48:A6:B8:33:44:55', ip: '192.168.0.161', parentId: 'gateway', connection: 'ethernet', rxRate: 1000, txRate: 1000, activity: { down: 4.2, up: 0.1 }, type: 'speaker', status: 'online', connectedSince: '12d 3h' },
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
    if (score >= 80) return 'var(--accent-green)';
    if (score >= 60) return 'var(--accent-amber)';
    return 'var(--accent-red)';
}

function qoeLabel(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Critical';
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
    const allDeviceIds = ['internet', 'gateway', ...TOPOLOGY.satellites.map(s => s.id)];
    allDeviceIds.forEach(id => {
        const deviceData = id === 'internet' ? TOPOLOGY.internet :
            id === 'gateway' ? TOPOLOGY.gateway :
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
        if (deviceId === 'internet') return;
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
        if (deviceId === 'internet') return;
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

    // Internet
    const inetM = measured['internet'] || { w: 250, h: 125 };
    const inetTop = MARGIN;
    pos['internet'] = makePos('internet', canvasW / 2 - inetM.w / 2, inetTop);

    // Gateway
    const gwM = measured['gateway'] || { w: 230, h: 142 };
    const gwTop = pos['internet'].top + pos['internet'].h + INET_GAP;
    pos['gateway'] = makePos('gateway', canvasW / 2 - gwM.w / 2, gwTop);

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

    // Center Internet over Gateway (align card centers)
    if (pos['internet'] && pos['gateway']) {
        const shift = pos['gateway'].cardCx - pos['internet'].cardCx;
        if (Math.abs(shift) > 1) shiftPos(pos['internet'], shift);
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
    Object.entries(pos).forEach(([id, p]) => {
        g.setNode(id, { x: p.cardCx, top: p.cardTop, bottom: p.cardBottom, wrapperBottom: p.top + p.h, width: p.w, height: p.h, type: id === 'internet' ? 'internet' : 'device' });
    });
    g.setEdge('internet', 'gateway');
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
        if (a.idle !== b.idle) return a.idle ? 1 : -1;
        const aTotal = (a.activity?.down || 0) + (a.activity?.up || 0);
        const bTotal = (b.activity?.down || 0) + (b.activity?.up || 0);
        return bTotal - aTotal;
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
    resolveIsp(TOPOLOGY.internet);
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
    pill.className = 'client-pill' + (device.idle ? ' idle' : '');

    // RSSI-based border color
    pill.style.borderColor = getRssiColor(device);

    // Icon + name
    const iconType = device.type || 'iot';
    const iconHtml = ICONS[iconType] || ICONS.iot;
    const wifiGen = getWifiGen(device);
    const wifiBadge = wifiGen ? `<span class="pill-wifi-badge wifi-${wifiGen.toLowerCase()}"><span class="pill-wifi-prefix">Wi-Fi </span>${wifiGen}</span>` : '';
    pill.innerHTML = `<span class="pill-icon">${iconHtml}</span><span class="pill-name">${device.name}</span>${wifiBadge}`;

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
                ${['SNR', 'PHY', 'Stab'].map((label, i) => {
                    const val = [device.qoeBreakdown.snr, device.qoeBreakdown.phyRate, device.qoeBreakdown.stability][i];
                    const c = val >= 80 ? 'var(--accent-green)' : val >= 50 ? 'var(--accent-amber)' : 'var(--accent-red)';
                    return `<div class="tt-bar-item"><span class="tt-bar-label">${label}</span><span class="tt-bar-track"><span class="tt-bar-fill" style="width:${val}%;background:${c}"></span></span><span class="tt-bar-val" style="color:${c}">${val}</span></div>`;
                }).join('')}
            </div>` : ''}
            <div class="tt-grid">
                <span class="tt-label">IP</span><span class="tt-value">${device.ip || '—'}</span>
                <span class="tt-label">MAC</span><span class="tt-value">${device.mac || '—'}</span>
                ${!isWired ? `<span class="tt-label">RSSI</span><span class="tt-value"><span style="color:${signalColor}">${rssiText}</span> · ${signalLabel}</span>` : ''}
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

    // Helper: draw a line segment
    function line(x1, y1, x2, y2, color, width) {
        const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l.setAttribute('x1', x1); l.setAttribute('y1', y1);
        l.setAttribute('x2', x2); l.setAttribute('y2', y2);
        l.style.stroke = color;
        l.style.strokeWidth = width || 2;
        l.classList.add('infra-line');
        master.appendChild(l);
    }

    // Helper: draw a band label tag (colored rect + text) on the bus
    function bandTag(cx, cy, label, color) {
        const tg = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        tg.classList.add('bus-tag');

        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.setAttribute('x', cx);
        textEl.setAttribute('y', cy + 4);
        textEl.setAttribute('text-anchor', 'middle');
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

    // === 1. Internet → Gateway ===
    const inetNode = graph.node('internet');
    const gwNode = graph.node('gateway');
    if (inetNode && gwNode) {
        const color = CONN_COLORS.ethernet;
        line(inetNode.x, inetNode.bottom, gwNode.x, gwNode.top, color);
        // Center tag visually between Internet wrapper bottom and Gateway card top
        // Nudge up 2px to compensate for text baseline offset inside tag
        const tagY = (inetNode.wrapperBottom + gwNode.top) / 2 - 2;
        bandTag(inetNode.x, tagY, TOPOLOGY.gateway.wanType || '10GbE WAN', color);
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
            if (Math.abs(y - e.t) < T && x >= e.l - T && x <= e.r + T) return true;
            if (Math.abs(y - e.b) < T && x >= e.l - T && x <= e.r + T) return true;
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
    }, 3000);
}

function stopAnimations() {
    if (liveAnimationInterval) {
        clearInterval(liveAnimationInterval);
        liveAnimationInterval = null;
    }
}

function updateClientActivityPulses() {
    TOPOLOGY.clients.forEach(client => {
        const card = document.querySelector(`.device-node[data-id="${client.id}"] .client-pill`) ||
                     document.querySelector(`.device-node[data-id="${client.id}"] .device-card`);
        if (!card) return;

        const down = client.activity?.down || 0;
        const up = client.activity?.up || 0;
        const total = down + up;

        // Remove existing activity classes
        card.classList.remove('activity-idle', 'activity-low', 'activity-medium', 'activity-high');

        // Assign activity level based on total traffic
        if (total < 0.5) {
            card.classList.add('activity-idle');
        } else if (total < 5) {
            card.classList.add('activity-low');
        } else if (total < 30) {
            card.classList.add('activity-medium');
        } else {
            card.classList.add('activity-high');
        }
    });
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
}

// ── Detail Panel ───────────────────────────────────
function selectDevice(id) {
    selectedDeviceId = id;
    const panel = document.getElementById('detailPanel');
    const title = document.getElementById('detailTitle');
    const body = document.getElementById('detailBody');

    // Find device
    let device = null;
    if (id === 'internet') device = TOPOLOGY.internet;
    else if (id === 'gateway') device = TOPOLOGY.gateway;
    else device = TOPOLOGY.satellites.find(s => s.id === id) || TOPOLOGY.clients.find(c => c.id === id);

    if (!device) return;

    // Highlight selected
    document.querySelectorAll('.device-node').forEach(n => n.classList.remove('selected'));
    const nodeEl = document.querySelector(`.device-node[data-id="${id}"]`);
    if (nodeEl) nodeEl.classList.add('selected');

    title.textContent = device.name;
    body.innerHTML = renderDeviceDetail(device);
    panel.classList.add('open');
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

    // Connection info for clients
    if (device.band || device.connection) {
        html += '<div class="detail-section">';
        html += '<div class="detail-section-title">Connection</div>';
        if (device.connection === 'ethernet') {
            html += '<div class="detail-row"><span class="label">Type</span><span class="value">Ethernet</span></div>';
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

// ── Time Machine ──────────────────────────────────
let timeMachineActive = false;
let tmSnapshots = [];          // array of full TOPOLOGY snapshots
let tmCurrentIndex = 0;
let tmPlayInterval = null;
let tmPlaySpeed = 1;           // 1x, 2x, 4x
let tmSampleInterval = 60;     // seconds between snapshots (default 60s)
let tmOriginalTopology = null; // deep clone of live TOPOLOGY for restoration

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

        // Random client churn: remove 0-2 clients, add back 0-2 from base pool
        const churnCount = Math.floor(Math.random() * 3);
        for (let c = 0; c < churnCount && snap.clients.length > 10; c++) {
            const idx = Math.floor(Math.random() * snap.clients.length);
            if (!snap.clients[idx].idle) continue; // only drop idle clients
            snap.clients.splice(idx, 1);
        }

        // Satellite offline event: ~hour 10-12 window — upstairs goes offline (3-hop node)
        const outageStart = Math.floor(totalSnapshots * 0.42);
        const outageEnd = Math.floor(totalSnapshots * 0.50);
        snap.satellites.forEach(sat => {
            if (sat.id === 'sat-upstairs' && i >= outageStart && i <= outageEnd) {
                sat.status = 'offline';
                sat.throughput = { down: 0, up: 0 };
                snap.clients.forEach(cl => {
                    if (cl.parentId === 'sat-upstairs') {
                        cl.status = 'offline';
                        cl.activity = { down: 0, up: 0 };
                    }
                });
            } else if (sat.id === 'sat-upstairs') {
                sat.status = 'online';
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

function applySnapshot(index) {
    if (index < 0 || index >= tmSnapshots.length) return;
    tmCurrentIndex = index;

    const snap = tmSnapshots[index];
    // Replace TOPOLOGY fields
    TOPOLOGY.internet = snap.internet;
    TOPOLOGY.gateway = snap.gateway;
    TOPOLOGY.satellites = snap.satellites;
    TOPOLOGY.clients = snap.clients;

    // Re-render everything
    renderTopologyGraph();
    layoutConnections();
    updateStats();
    updateClientActivityPulses();
    requestAnimationFrame(() => checkAutoSimplify());

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

    // Update UI
    document.body.classList.add('time-machine-active');
    const bar = document.getElementById('tmPlaybackBar');
    if (bar) bar.classList.add('visible');

    const slider = document.getElementById('tmSlider');
    if (slider) {
        slider.max = tmSnapshots.length - 1;
        slider.value = 0;
    }

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

    // Restore live state
    TOPOLOGY.internet = tmOriginalTopology.internet;
    TOPOLOGY.gateway = tmOriginalTopology.gateway;
    TOPOLOGY.satellites = tmOriginalTopology.satellites;
    TOPOLOGY.clients = tmOriginalTopology.clients;

    // Re-render
    renderTopologyGraph();
    layoutConnections();
    updateStats();
    updateClientActivityPulses();
    requestAnimationFrame(() => checkAutoSimplify());

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
}

function tmPlay() {
    if (tmPlayInterval) return; // already playing
    const btn = document.getElementById('tmPlayPause');
    if (btn) btn.innerHTML = '<i class="ph-bold ph-pause"></i>';

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
    const slider = document.getElementById('tmSlider');
    if (slider) {
        slider.max = tmSnapshots.length - 1;
        // Keep proportional position
        tmCurrentIndex = Math.min(tmCurrentIndex, tmSnapshots.length - 1);
        slider.value = tmCurrentIndex;
    }
    applySnapshot(tmCurrentIndex);
}

function bindTimeMachineEvents() {
    // Sidebar activation
    document.getElementById('tmNavItem')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (timeMachineActive) {
            deactivateTimeMachine();
        } else {
            activateTimeMachine();
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
    document.getElementById('tmSpeed')?.addEventListener('click', tmCycleSpeed);
    document.getElementById('tmInterval')?.addEventListener('click', tmCycleInterval);
    document.getElementById('tmExit')?.addEventListener('click', deactivateTimeMachine);

    // Slider scrubbing
    const slider = document.getElementById('tmSlider');
    if (slider) {
        slider.addEventListener('input', () => {
            tmPause();
            applySnapshot(parseInt(slider.value));
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
        }

        if (qoe.Score != null) {
            client.qoeBreakdown = {
                snr: qoe.SnrScore || 0,
                phyRate: qoe.PhyRateScore || 0,
                stability: qoe.StabilityScore || 0,
            };
        }

        clients.push(client);
    });

    // Compute gateway client count
    if (gateway) {
        gateway.clients = clients.length;
    }

    return {
        internet: {
            id: 'internet',
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
        },
        gateway,
        satellites,
        clients,
    };
}

// ── Init ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    init();
    bindTimeMachineEvents();
});
