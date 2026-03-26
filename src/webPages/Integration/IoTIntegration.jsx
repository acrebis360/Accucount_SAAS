// app/dashboard/iot-integration/page.js
'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Radio,
  Scan,
  Cpu,
  Server,
  Database,
  Activity,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Settings,
  Play,
  Pause,
  StopCircle,
  Clock,
  Calendar,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit,
  Eye,
  MoreVertical,
  Search,
  Network,
  Thermometer,
  ThermometerSun,
  ThermometerSnowflake,
  Battery,
  BatteryFull,
  BatteryWarning,
  BatteryCharging,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Router,

  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Info,
  MapPin as MapPinIcon,
  DollarSign,
  Percent,
  Tag,
  Hash,
  Filter as FilterIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, Legend } from 'recharts';

const IotIntegrationPage = () => {
  const [activeTab, setActiveTab] = useState('devices');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showGatewayDialog, setShowGatewayDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showLogsDialog, setShowLogsDialog] = useState(false);
  const [showFirmwareDialog, setShowFirmwareDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [firmwareProgress, setFirmwareProgress] = useState(0);

  // Mock IoT Devices Data
  const iotDevices = [
    {
      id: 'rfid_001',
      name: 'RFID Scanner - Dock A',
      type: 'rfid_scanner',
      status: 'online',
      battery: 87,
      signal: 92,
      location: 'Warehouse A - Loading Dock',
      lastSeen: '2024-12-20T15:30:00Z',
      firmware: 'v2.1.4',
      ipAddress: '192.168.1.101',
      macAddress: '00:1B:44:11:3A:B7',
      model: 'RFID-8000 Pro',
      manufacturer: 'Zebra Technologies',
      readings: 12450,
      errorRate: 0.2,
      temperature: 23.5,
      gateway: 'gateway_01',
      tags: ['high-traffic', 'critical'],
      lastSync: '2024-12-20T15:30:00Z',
      nextSync: '2024-12-20T15:35:00Z',
    },
    {
      id: 'rfid_002',
      name: 'RFID Scanner - Zone B',
      type: 'rfid_scanner',
      status: 'online',
      battery: 92,
      signal: 88,
      location: 'Warehouse A - Zone B',
      lastSeen: '2024-12-20T15:28:00Z',
      firmware: 'v2.1.4',
      ipAddress: '192.168.1.102',
      macAddress: '00:1B:44:11:3A:B8',
      model: 'RFID-8000 Pro',
      manufacturer: 'Zebra Technologies',
      readings: 8750,
      errorRate: 0.1,
      temperature: 22.8,
      gateway: 'gateway_01',
      tags: ['electronics'],
      lastSync: '2024-12-20T15:28:00Z',
      nextSync: '2024-12-20T15:33:00Z',
    },
    {
      id: 'barcode_001',
      name: 'Barcode Scanner - Receiving',
      type: 'barcode_scanner',
      status: 'online',
      battery: 65,
      signal: 95,
      location: 'Receiving Dock',
      lastSeen: '2024-12-20T15:32:00Z',
      firmware: 'v3.0.2',
      ipAddress: '192.168.1.201',
      macAddress: '00:1B:44:22:4C:D9',
      model: 'Symbol LS4278',
      manufacturer: 'Motorola',
      readings: 3420,
      errorRate: 0.05,
      temperature: 24.1,
      gateway: 'gateway_02',
      tags: ['high-volume'],
      lastSync: '2024-12-20T15:32:00Z',
      nextSync: '2024-12-20T15:37:00Z',
    },
    {
      id: 'barcode_002',
      name: 'Barcode Scanner - Packing',
      type: 'barcode_scanner',
      status: 'online',
      battery: 78,
      signal: 91,
      location: 'Packing Station 3',
      lastSeen: '2024-12-20T15:29:00Z',
      firmware: 'v3.0.2',
      ipAddress: '192.168.1.202',
      macAddress: '00:1B:44:22:4C:E0',
      model: 'Symbol LS4278',
      manufacturer: 'Motorola',
      readings: 5680,
      errorRate: 0.08,
      temperature: 23.2,
      gateway: 'gateway_02',
      tags: ['packing'],
      lastSync: '2024-12-20T15:29:00Z',
      nextSync: '2024-12-20T15:34:00Z',
    },
    {
      id: 'sensor_001',
      name: 'Temperature Sensor - Cold Storage',
      type: 'temperature_sensor',
      status: 'online',
      battery: 94,
      signal: 85,
      location: 'Cold Storage - Zone A',
      lastSeen: '2024-12-20T15:31:00Z',
      firmware: 'v1.2.0',
      ipAddress: '192.168.2.101',
      macAddress: '00:1B:44:33:5D:F1',
      model: 'TempGuard Pro',
      manufacturer: 'Sensitech',
      readings: 1250,
      errorRate: 0,
      temperature: -2.5,
      minTemp: -5,
      maxTemp: 2,
      gateway: 'gateway_03',
      tags: ['critical', 'temperature-sensitive'],
      lastSync: '2024-12-20T15:31:00Z',
      nextSync: '2024-12-20T15:36:00Z',
    },
    {
      id: 'sensor_002',
      name: 'Humidity Sensor - Cold Storage',
      type: 'humidity_sensor',
      status: 'warning',
      battery: 45,
      signal: 78,
      location: 'Cold Storage - Zone B',
      lastSeen: '2024-12-20T15:27:00Z',
      firmware: 'v1.2.0',
      ipAddress: '192.168.2.102',
      macAddress: '00:1B:44:33:5D:F2',
      model: 'Humidity Monitor',
      manufacturer: 'Sensitech',
      readings: 1250,
      errorRate: 0,
      humidity: 85,
      minHumidity: 30,
      maxHumidity: 70,
      gateway: 'gateway_03',
      tags: ['warning'],
      lastSync: '2024-12-20T15:27:00Z',
      nextSync: '2024-12-20T15:32:00Z',
    },
    {
      id: 'gateway_01',
      name: 'IoT Gateway - Warehouse A',
      type: 'gateway',
      status: 'online',
      battery: null,
      signal: null,
      location: 'Server Room - Warehouse A',
      lastSeen: '2024-12-20T15:33:00Z',
      firmware: 'v2.0.0',
      ipAddress: '192.168.1.10',
      macAddress: '00:1B:44:AA:BB:CC',
      model: 'Gateway-5000',
      manufacturer: 'Cisco',
      connectedDevices: 2,
      uptime: '14d 6h',
      throughput: '156 Mbps',
      gateway: null,
      tags: ['primary'],
      lastSync: '2024-12-20T15:33:00Z',
      nextSync: '2024-12-20T15:38:00Z',
    },
    {
      id: 'gateway_02',
      name: 'IoT Gateway - Receiving',
      type: 'gateway',
      status: 'online',
      battery: null,
      signal: null,
      location: 'Receiving Office',
      lastSeen: '2024-12-20T15:32:00Z',
      firmware: 'v2.0.0',
      ipAddress: '192.168.1.11',
      macAddress: '00:1B:44:AA:BB:DD',
      model: 'Gateway-5000',
      manufacturer: 'Cisco',
      connectedDevices: 2,
      uptime: '8d 12h',
      throughput: '98 Mbps',
      gateway: null,
      tags: ['receiving'],
      lastSync: '2024-12-20T15:32:00Z',
      nextSync: '2024-12-20T15:37:00Z',
    },
    {
      id: 'gateway_03',
      name: 'IoT Gateway - Cold Storage',
      type: 'gateway',
      status: 'online',
      battery: null,
      signal: null,
      location: 'Cold Storage Control Room',
      lastSeen: '2024-12-20T15:30:00Z',
      firmware: 'v2.0.1',
      ipAddress: '192.168.2.10',
      macAddress: '00:1B:44:AA:BB:EE',
      model: 'Gateway-5000R',
      manufacturer: 'Cisco',
      connectedDevices: 2,
      uptime: '21d 3h',
      throughput: '112 Mbps',
      gateway: null,
      tags: ['critical', 'cold-chain'],
      lastSync: '2024-12-20T15:30:00Z',
      nextSync: '2024-12-20T15:35:00Z',
    },
  ];

  // Mock telemetry data
  const telemetryData = [
    { time: '00:00', readings: 125, errors: 2, signal: 92 },
    { time: '02:00', readings: 98, errors: 1, signal: 90 },
    { time: '04:00', readings: 76, errors: 0, signal: 88 },
    { time: '06:00', readings: 156, errors: 3, signal: 85 },
    { time: '08:00', readings: 342, errors: 5, signal: 82 },
    { time: '10:00', readings: 567, errors: 8, signal: 88 },
    { time: '12:00', readings: 789, errors: 12, signal: 91 },
    { time: '14:00', readings: 876, errors: 10, signal: 93 },
    { time: '16:00', readings: 654, errors: 7, signal: 92 },
    { time: '18:00', readings: 432, errors: 4, signal: 89 },
    { time: '20:00', readings: 298, errors: 2, signal: 87 },
    { time: '22:00', readings: 167, errors: 1, signal: 86 },
  ];

  const deviceTypes = [
    { id: 'all', label: 'All Devices' },
    { id: 'rfid_scanner', label: 'RFID Scanners', icon: Radio },
    { id: 'barcode_scanner', label: 'Barcode Scanners', icon: Scan },
    { id: 'temperature_sensor', label: 'Temperature Sensors', icon: Thermometer },
    { id: 'humidity_sensor', label: 'Humidity Sensors', icon: Droplet },
    { id: 'gateway', label: 'Gateways', icon: Router },
  ];

  const statusConfig = {
    online: { label: 'Online', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    offline: { label: 'Offline', color: 'bg-gray-100 text-gray-700', icon: XCircle },
    warning: { label: 'Warning', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle },
    error: { label: 'Error', color: 'bg-red-100 text-red-700', icon: AlertCircle },
    syncing: { label: 'Syncing', color: 'bg-blue-100 text-blue-700', icon: RefreshCw },
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.offline;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={10} />
        {config.label}
      </Badge>
    );
  };

  const getDeviceTypeIcon = (type) => {
    const config = deviceTypes.find(t => t.id === type);
    const Icon = config?.icon || Cpu;
    return <Icon size={16} className="text-red-600" />;
  };

  const getBatteryIcon = (level) => {
    if (level === null) return null;
    if (level >= 80) return <BatteryFull size={14} className="text-green-600" />;
    if (level >= 30) return <Battery size={14} className="text-yellow-600" />;
    return <BatteryWarning size={14} className="text-red-600" />;
  };

  const getSignalStrength = (strength) => {
    if (strength >= 80) return <SignalHigh size={14} className="text-green-600" />;
    if (strength >= 50) return <SignalMedium size={14} className="text-yellow-600" />;
    return <SignalLow size={14} className="text-red-600" />;
  };

  // Filter devices
  const filteredDevices = iotDevices.filter(device => {
    const matchesSearch = 
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || device.status === selectedStatus;
    const matchesType = selectedType === 'all' || device.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const gateways = iotDevices.filter(d => d.type === 'gateway');
  const sensors = iotDevices.filter(d => d.type === 'temperature_sensor' || d.type === 'humidity_sensor');
  const scanners = iotDevices.filter(d => d.type === 'rfid_scanner' || d.type === 'barcode_scanner');

  const stats = {
    totalDevices: iotDevices.length,
    onlineDevices: iotDevices.filter(d => d.status === 'online').length,
    totalReadings: iotDevices.reduce((sum, d) => sum + (d.readings || 0), 0),
    activeGateways: gateways.filter(g => g.status === 'online').length,
    avgSignal: Math.round(iotDevices.filter(d => d.signal).reduce((sum, d) => sum + (d.signal || 0), 0) / iotDevices.filter(d => d.signal).length),
    lowBatteryDevices: iotDevices.filter(d => d.battery && d.battery < 30).length,
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const handleConnectDevice = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  };

  const handleUpdateFirmware = () => {
    setFirmwareProgress(0);
    const interval = setInterval(() => {
      setFirmwareProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">IoT Integration</h1>
            <p className="text-black/50 text-sm mt-1">
              Manage and monitor IoT devices, gateways, and real-time inventory tracking
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#F5EEE9] gap-2"
              onClick={() => setShowGatewayDialog(true)}
            >
              <Router size={16} />
              Manage Gateways
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus size={16} />
              Add Device
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Devices</p>
                  <p className="text-xl font-bold text-black">{stats.totalDevices}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Cpu size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Online Devices</p>
                  <p className="text-xl font-bold text-green-600">{stats.onlineDevices}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <Wifi size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Readings</p>
                  <p className="text-xl font-bold text-blue-600">{stats.totalReadings.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Activity size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Gateways</p>
                  <p className="text-xl font-bold text-purple-600">{stats.activeGateways}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Router size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg. Signal</p>
                  <p className="text-xl font-bold text-emerald-600">{stats.avgSignal}%</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-full">
                  <SignalHigh size={18} className="text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Low Battery</p>
                  <p className="text-xl font-bold text-orange-600">{stats.lowBatteryDevices}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <BatteryWarning size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#F5EEE9] mb-6">
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="gateways">Gateways</TabsTrigger>
            <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-4">
            {/* Filters */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
                  <Input
                    placeholder="Search devices by name, ID, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-[#F5EEE9] focus:border-red-600"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[150px] border-[#F5EEE9]">
                    <SelectValue placeholder="Device Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviceTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[130px] border-[#F5EEE9]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                  <FilterIcon size={16} />
                </Button>
                <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                  <RefreshCw size={16} />
                </Button>
              </div>
            </div>

            {/* Devices Grid */}
            <div className="grid grid-cols-3 gap-4">
              {filteredDevices.map((device) => (
                <Card key={device.id} className="border-[#F5EEE9] hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          device.type === 'rfid_scanner' ? "bg-blue-100" :
                          device.type === 'barcode_scanner' ? "bg-green-100" :
                          device.type === 'temperature_sensor' ? "bg-cyan-100" :
                          device.type === 'humidity_sensor' ? "bg-teal-100" :
                          "bg-purple-100"
                        )}>
                          {getDeviceTypeIcon(device.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{device.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(device.status)}
                            <span className="text-xs text-black/40 font-mono">{device.id}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedDevice(device);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye size={14} className="mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedDevice(device);
                            setShowEditDialog(true);
                          }}>
                            <Edit size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={handleConnectDevice}>
                            <Wifi size={14} className="mr-2" />
                            {device.status === 'online' ? 'Reconnect' : 'Connect'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedDevice(device);
                            setShowFirmwareDialog(true);
                          }}>
                            <Download size={14} className="mr-2" />
                            Update Firmware
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 size={14} className="mr-2" />
                            Remove Device
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPinIcon size={14} className="text-black/40" />
                        <span className="text-black/70">{device.location}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {device.battery !== null && (
                          <div className="flex items-center gap-2">
                            {getBatteryIcon(device.battery)}
                            <span className="text-sm">Battery: {device.battery}%</span>
                          </div>
                        )}
                        {device.signal !== null && (
                          <div className="flex items-center gap-2">
                            {getSignalStrength(device.signal)}
                            <span className="text-sm">Signal: {device.signal}%</span>
                          </div>
                        )}
                      </div>

                      {device.temperature !== undefined && (
                        <div className="flex items-center gap-2">
                          <Thermometer size={14} className="text-black/40" />
                          <span className="text-sm">Temp: {device.temperature}°C</span>
                          {device.minTemp && device.maxTemp && (
                            <Progress 
                              value={(device.temperature - device.minTemp) / (device.maxTemp - device.minTemp) * 100} 
                              className="h-1.5 w-20"
                            />
                          )}
                        </div>
                      )}

                      {device.humidity !== undefined && (
                        <div className="flex items-center gap-2">
                          <Droplet size={14} className="text-black/40" />
                          <span className="text-sm">Humidity: {device.humidity}%</span>
                          {device.minHumidity && device.maxHumidity && (
                            <Progress 
                              value={(device.humidity - device.minHumidity) / (device.maxHumidity - device.minHumidity) * 100} 
                              className="h-1.5 w-20"
                            />
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-black/50">
                        <div className="flex items-center gap-1">
                          <ClockIcon size={12} />
                          <span>Last seen: {formatDate(device.lastSeen)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity size={12} />
                          <span>{device.readings?.toLocaleString()} readings</span>
                        </div>
                      </div>

                      {device.errorRate > 0 && (
                        <div className="p-2 bg-yellow-50 rounded-lg">
                          <div className="flex items-center gap-1">
                            <AlertTriangle size={12} className="text-yellow-600" />
                            <span className="text-xs text-yellow-600">Error rate: {device.errorRate}%</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#F5EEE9] flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={handleConnectDevice}>
                        <RefreshCw size={12} className={cn("mr-1", isConnecting && "animate-spin")} />
                        {isConnecting ? 'Connecting...' : 'Test Connection'}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Activity size={12} className="mr-1" />
                        Diagnostics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDevices.length === 0 && (
              <Card className="border-[#F5EEE9]">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Cpu size={48} className="text-black/20 mb-3" />
                  <p className="text-black/50">No IoT devices found</p>
                  <p className="text-xs text-black/40 mt-1">Add devices to start monitoring</p>
                  <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setShowAddDialog(true)}>
                    <Plus size={14} className="mr-2" />
                    Add Device
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="gateways" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {gateways.map((gateway) => (
                <Card key={gateway.id} className="border-[#F5EEE9] hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Router size={20} className="text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{gateway.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(gateway.status)}
                            <span className="text-xs text-black/40 font-mono">{gateway.id}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical size={16} />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPinIcon size={14} className="text-black/40" />
                        <span className="text-black/70">{gateway.location}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-black/50">Connected Devices</p>
                          <p className="text-lg font-bold">{gateway.connectedDevices}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Uptime</p>
                          <p className="text-sm">{gateway.uptime}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-black/50">Throughput</p>
                          <p className="text-sm">{gateway.throughput}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Firmware</p>
                          <p className="text-sm">{gateway.firmware}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-black/50">
                        <div className="flex items-center gap-1">
                          <ClockIcon size={12} />
                          <span>Last sync: {formatDate(gateway.lastSync)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Network size={12} />
                          <span>{gateway.ipAddress}</span>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-[#F5EEE9] flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <RefreshCw size={12} className="mr-1" />
                          Sync Gateway
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Settings size={12} className="mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="telemetry" className="space-y-6">
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Device Telemetry</CardTitle>
                <CardDescription>Real-time readings and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={telemetryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="time" stroke="#888888" />
                      <YAxis yAxisId="left" stroke="#888888" />
                      <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                      <ReTooltip />
                      <Legend />
                      <Area yAxisId="left" type="monotone" dataKey="readings" stackId="1" stroke="#ef4444" fill="#fee2e2" name="Readings" />
                      <Area yAxisId="right" type="monotone" dataKey="errors" stackId="2" stroke="#eab308" fill="#fef3c7" name="Errors" />
                      <Area yAxisId="right" type="monotone" dataKey="signal" stackId="3" stroke="#22c55e" fill="#dcfce7" name="Signal %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle className="text-sm">Top Performing Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scanners.slice(0, 3).map(device => (
                      <div key={device.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{device.name}</p>
                          <p className="text-xs text-black/50">{device.readings.toLocaleString()} readings</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">{device.errorRate}% errors</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle className="text-sm">Sensor Readings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sensors.map(sensor => (
                      <div key={sensor.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{sensor.name}</p>
                          <p className="text-xs text-black/50">
                            {sensor.temperature ? `${sensor.temperature}°C` : `${sensor.humidity}% humidity`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(sensor.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>Real-time notifications from IoT devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg flex items-start gap-3">
                    <AlertCircle size={16} className="text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-red-700">Humidity Sensor - High Humidity Alert</p>
                        <span className="text-xs text-red-600/70">5 min ago</span>
                      </div>
                      <p className="text-sm text-red-600/80">Humidity level at 85% exceeds threshold of 70%</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs">Acknowledge</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs">View Details</Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg flex items-start gap-3">
                    <AlertTriangle size={16} className="text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-yellow-700">RFID Scanner - Low Battery</p>
                        <span className="text-xs text-yellow-600/70">15 min ago</span>
                      </div>
                      <p className="text-sm text-yellow-600/80">Battery level at 45% on Barcode Scanner - Receiving</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs">Schedule Replacement</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs">Dismiss</Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg flex items-start gap-3">
                    <Info size={16} className="text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-blue-700">Firmware Update Available</p>
                        <span className="text-xs text-blue-600/70">1 hour ago</span>
                      </div>
                      <p className="text-sm text-blue-600/80">New firmware v2.2.0 available for RFID Scanner - Dock A</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs">Update Now</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs">Remind Later</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Device Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add IoT Device</DialogTitle>
            <DialogDescription>Register a new IoT device to your network</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Device Name</Label>
              <Input placeholder="e.g., RFID Scanner - Dock A" />
            </div>
            <div className="space-y-2">
              <Label>Device Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rfid">RFID Scanner</SelectItem>
                  <SelectItem value="barcode">Barcode Scanner</SelectItem>
                  <SelectItem value="temperature">Temperature Sensor</SelectItem>
                  <SelectItem value="humidity">Humidity Sensor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>MAC Address</Label>
              <Input placeholder="00:1B:44:11:3A:B7" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="Warehouse A - Zone 1" />
            </div>
            <div className="space-y-2">
              <Label>Gateway Assignment</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gateway" />
                </SelectTrigger>
                <SelectContent>
                  {gateways.map(g => (
                    <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button className="bg-red-600 hover:bg-red-700">Add Device</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Firmware Update Dialog */}
      <Dialog open={showFirmwareDialog} onOpenChange={setShowFirmwareDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Update Firmware</DialogTitle>
            <DialogDescription>{selectedDevice?.name} - Firmware update available</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm">Current version: <strong>{selectedDevice?.firmware}</strong></p>
              <p className="text-sm mt-1">New version: <strong>v2.2.0</strong></p>
              <p className="text-xs text-blue-600/70 mt-2">• Improved connection stability<br />• Enhanced battery optimization<br />• New security patches</p>
            </div>
            {firmwareProgress > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Downloading...</span>
                  <span>{firmwareProgress}%</span>
                </div>
                <Progress value={firmwareProgress} className="h-2" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFirmwareDialog(false)}>Cancel</Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleUpdateFirmware}>
              <Download size={14} className="mr-2" />
              Update Firmware
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Additional icon component
const Droplet = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

export default IotIntegrationPage;