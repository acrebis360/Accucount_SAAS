// app/dashboard/device-health/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Activity,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  Calendar,
  Download,
  Upload,
  Grid,
  List,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Power,
  Wrench,
  Cpu,
  Thermometer,
  Battery,
  BatteryCharging,
  BatteryWarning,
  BatteryMedium,
  BatteryFull,
  Wifi,
  Bluetooth,
  EthernetPort,
  Zap,
  Gauge,
  Monitor,
  Smartphone,
  Printer,
  Scan,
  Camera,
  Radio,
  MapPin,
  User,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Ban,
} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DeviceHealthPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedHealth, setSelectedHealth] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  const [showDiagnosticDialog, setShowDiagnosticDialog] = useState(false);
  const [showFirmwareDialog, setShowFirmwareDialog] = useState(false);
  const [showRebootDialog, setShowRebootDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample device health data
  const devices = [
    {
      id: 'DEV-001',
      deviceId: 'SCN-001',
      name: 'Warehouse Scanner A1',
      type: 'barcode_scanner',
      model: 'Zebra DS3608',
      manufacturer: 'Zebra Technologies',
      status: 'healthy',
      health: 98,
      healthStatus: 'excellent',
      location: 'Warehouse A',
      zone: 'Picking Zone',
      assignedTo: 'John Doe',
      lastSeen: '2024-03-17 10:30:45',
      uptime: '15d 4h 23m',
      temperature: 32,
      cpuUsage: 23,
      memoryUsage: 156,
      storageUsage: 256,
      batteryLevel: 78,
      batteryStatus: 'discharging',
      signalStrength: 85,
      connectionType: 'wifi',
      errors: 0,
      warnings: 0,
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-04-01',
      firmwareVersion: '2.1.5',
      metrics: {
        scanCount: 15234,
        scanRate: 45,
        errorRate: 0.2,
        avgResponseTime: 120,
      },
      tags: ['scanner', 'handheld'],
      alerts: [],
    },
    {
      id: 'DEV-002',
      deviceId: 'PRN-001',
      name: 'Label Printer - Packing Station 1',
      type: 'printer',
      model: 'Zebra ZT410',
      manufacturer: 'Zebra Technologies',
      status: 'healthy',
      health: 95,
      healthStatus: 'good',
      location: 'Warehouse A',
      zone: 'Packing Zone',
      assignedTo: 'Packing Station 1',
      lastSeen: '2024-03-17 10:29:30',
      uptime: '45d 2h 12m',
      temperature: 38,
      cpuUsage: 12,
      memoryUsage: 89,
      storageUsage: 128,
      connectionType: 'ethernet',
      errors: 0,
      warnings: 1,
      lastMaintenance: '2024-03-05',
      nextMaintenance: '2024-04-05',
      firmwareVersion: '3.2.1',
      metrics: {
        printCount: 45678,
        printSpeed: 12,
        mediaRemaining: 75,
        ribbonRemaining: 60,
      },
      tags: ['printer', 'label'],
      alerts: ['Media low'],
    },
    {
      id: 'DEV-003',
      deviceId: 'RDR-001',
      name: 'RFID Gate - Shipping',
      type: 'rfid_reader',
      model: 'Impinj xArray',
      manufacturer: 'Impinj',
      status: 'healthy',
      health: 99,
      healthStatus: 'excellent',
      location: 'Warehouse A',
      zone: 'Shipping Zone',
      assignedTo: 'Shipping Gate 1',
      lastSeen: '2024-03-17 10:28:15',
      uptime: '60d 8h 45m',
      temperature: 35,
      cpuUsage: 45,
      memoryUsage: 234,
      storageUsage: 512,
      connectionType: 'ethernet',
      errors: 0,
      warnings: 0,
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-04-10',
      firmwareVersion: '5.1.2',
      metrics: {
        readCount: 1245678,
        readRate: 150,
        tagCount: 45,
        errorRate: 0.05,
      },
      tags: ['rfid', 'gate'],
      alerts: [],
    },
    {
      id: 'DEV-004',
      deviceId: 'RBT-001',
      name: 'AGV - Unit 01',
      type: 'robot',
      model: 'Fetch Freight 1500',
      manufacturer: 'Fetch Robotics',
      status: 'warning',
      health: 72,
      healthStatus: 'fair',
      location: 'Warehouse A',
      zone: 'Storage Zone A',
      assignedTo: 'Automation Team',
      lastSeen: '2024-03-17 10:27:00',
      uptime: '15d 8h 20m',
      temperature: 42,
      cpuUsage: 65,
      memoryUsage: 512,
      storageUsage: 1024,
      batteryLevel: 45,
      batteryStatus: 'discharging',
      signalStrength: 70,
      connectionType: 'wifi',
      errors: 2,
      warnings: 3,
      lastMaintenance: '2024-03-12',
      nextMaintenance: '2024-04-12',
      firmwareVersion: '4.5.2',
      metrics: {
        speed: 1.2,
        distanceTraveled: 1250,
        missionsCompleted: 234,
        payload: 450,
      },
      tags: ['robot', 'agv'],
      alerts: ['High CPU usage', 'Battery low'],
    },
    {
      id: 'DEV-005',
      deviceId: 'SEN-001',
      name: 'Temperature Sensor - Cold Storage',
      type: 'sensor',
      model: 'Sensaphone 1400',
      manufacturer: 'Sensaphone',
      status: 'critical',
      health: 45,
      healthStatus: 'poor',
      location: 'Warehouse C',
      zone: 'Cold Storage',
      assignedTo: 'Quality Team',
      lastSeen: '2024-03-17 10:25:45',
      uptime: '45d 12h 30m',
      temperature: -5,
      cpuUsage: 78,
      memoryUsage: 189,
      storageUsage: 256,
      batteryLevel: 12,
      batteryStatus: 'critical',
      signalStrength: 45,
      connectionType: 'wifi',
      errors: 5,
      warnings: 2,
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-03-15',
      firmwareVersion: '1.8.2',
      metrics: {
        reading: 2.5,
        unit: '°C',
        minReading: 2.0,
        maxReading: 4.0,
      },
      tags: ['sensor', 'temperature'],
      alerts: ['Battery critical', 'High CPU', 'Offline risk'],
    },
    {
      id: 'DEV-006',
      deviceId: 'CAM-001',
      name: 'Security Camera - Receiving',
      type: 'camera',
      model: 'Axis P1448-LE',
      manufacturer: 'Axis Communications',
      status: 'healthy',
      health: 97,
      healthStatus: 'excellent',
      location: 'Warehouse A',
      zone: 'Receiving Zone',
      assignedTo: 'Security',
      lastSeen: '2024-03-17 10:26:30',
      uptime: '180d 2h 30m',
      temperature: 38,
      cpuUsage: 45,
      memoryUsage: 234,
      storageUsage: 2048,
      connectionType: 'ethernet',
      errors: 0,
      warnings: 0,
      lastMaintenance: '2024-03-08',
      nextMaintenance: '2024-04-08',
      firmwareVersion: '9.80.1',
      metrics: {
        resolution: '1080p',
        fps: 30,
        recording: true,
      },
      tags: ['camera', 'security'],
      alerts: [],
    },
    {
      id: 'DEV-007',
      deviceId: 'KIO-001',
      name: 'Kiosk - Receiving',
      type: 'kiosk',
      model: 'Elo 2202L',
      manufacturer: 'Elo Touch',
      status: 'warning',
      health: 68,
      healthStatus: 'fair',
      location: 'Warehouse A',
      zone: 'Receiving Zone',
      assignedTo: 'Receiving Team',
      lastSeen: '2024-03-17 10:24:15',
      uptime: '60d 4h 15m',
      temperature: 42,
      cpuUsage: 78,
      memoryUsage: 512,
      storageUsage: 1024,
      connectionType: 'ethernet',
      errors: 1,
      warnings: 2,
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-04-01',
      firmwareVersion: '1.2.3',
      metrics: {
        screenSize: '22"',
        touchType: 'capacitive',
        sessions: 45,
        avgSessionTime: 180,
      },
      tags: ['kiosk', 'interface'],
      alerts: ['High CPU', 'Storage near limit'],
    },
    {
      id: 'DEV-008',
      deviceId: 'SCL-001',
      name: 'Floor Scale - Receiving',
      type: 'scale',
      model: 'Mettler Toledo IND570',
      manufacturer: 'Mettler Toledo',
      status: 'offline',
      health: 0,
      healthStatus: 'offline',
      location: 'Warehouse A',
      zone: 'Receiving Zone',
      assignedTo: 'Dock 1',
      lastSeen: '2024-03-16 23:45:00',
      uptime: '0s',
      temperature: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      storageUsage: 0,
      connectionType: 'ethernet',
      errors: 1,
      warnings: 0,
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-04-01',
      firmwareVersion: '4.0.3',
      metrics: {
        weighCount: 3456,
        maxWeight: 1000,
        accuracy: 0.1,
      },
      tags: ['scale', 'receiving'],
      alerts: ['Device offline'],
    },
    {
      id: 'DEV-009',
      deviceId: 'HMD-001',
      name: 'Handheld Scanner - Returns',
      type: 'handheld',
      model: 'Zebra TC57',
      manufacturer: 'Zebra Technologies',
      status: 'healthy',
      health: 92,
      healthStatus: 'good',
      location: 'Warehouse A',
      zone: 'Returns Zone',
      assignedTo: 'Tom Brown',
      lastSeen: '2024-03-17 10:23:30',
      uptime: '8h 45m',
      temperature: 31,
      cpuUsage: 32,
      memoryUsage: 256,
      storageUsage: 512,
      batteryLevel: 67,
      batteryStatus: 'discharging',
      signalStrength: 82,
      connectionType: 'wifi',
      errors: 0,
      warnings: 1,
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-04-10',
      firmwareVersion: '8.2.1',
      metrics: {
        scanCount: 1234,
        scanRate: 28,
        appsRunning: 3,
      },
      tags: ['handheld', 'scanner'],
      alerts: ['Battery medium'],
    },
    {
      id: 'DEV-010',
      deviceId: 'UPS-001',
      name: 'UPS - Server Room',
      type: 'power',
      model: 'APC SMT3000',
      manufacturer: 'APC',
      status: 'healthy',
      health: 99,
      healthStatus: 'excellent',
      location: 'Server Room',
      zone: 'IT',
      assignedTo: 'IT Team',
      lastSeen: '2024-03-17 10:22:45',
      uptime: '365d 0h 0m',
      temperature: 28,
      cpuUsage: 5,
      memoryUsage: 64,
      storageUsage: 128,
      batteryLevel: 100,
      batteryStatus: 'charged',
      connectionType: 'ethernet',
      errors: 0,
      warnings: 0,
      lastMaintenance: '2024-03-05',
      nextMaintenance: '2024-06-05',
      firmwareVersion: '3.0.1',
      metrics: {
        load: 35,
        runtime: 45,
        input: '120V',
        output: '120V',
      },
      tags: ['ups', 'power'],
      alerts: [],
    },
  ];

  // Device types
  const deviceTypes = [
    { id: 'barcode_scanner', name: 'Barcode Scanner' },
    { id: 'printer', name: 'Printer' },
    { id: 'rfid_reader', name: 'RFID Reader' },
    { id: 'robot', name: 'Robot' },
    { id: 'sensor', name: 'Sensor' },
    { id: 'camera', name: 'Camera' },
    { id: 'kiosk', name: 'Kiosk' },
    { id: 'scale', name: 'Scale' },
    { id: 'handheld', name: 'Handheld' },
    { id: 'power', name: 'Power' },
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', count: 7 },
    { id: 'wh-c', name: 'Warehouse C', count: 1 },
    { id: 'server', name: 'Server Room', count: 1 },
  ];

  // Status configuration
  const statusConfig = {
    healthy: { label: 'Healthy', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    warning: { label: 'Warning', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    critical: { label: 'Critical', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    offline: { label: 'Offline', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    maintenance: { label: 'Maintenance', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Wrench },
  };

  const healthStatusConfig = {
    excellent: { label: 'Excellent', color: 'bg-green-100 text-green-700', min: 90 },
    good: { label: 'Good', color: 'bg-blue-100 text-blue-700', min: 75 },
    fair: { label: 'Fair', color: 'bg-yellow-100 text-yellow-700', min: 50 },
    poor: { label: 'Poor', color: 'bg-orange-100 text-orange-700', min: 25 },
    critical: { label: 'Critical', color: 'bg-red-100 text-red-700', min: 0 },
    offline: { label: 'Offline', color: 'bg-gray-100 text-gray-700', min: -1 },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getHealthStatusColor = (healthStatus) => {
    return healthStatusConfig[healthStatus]?.color || 'bg-gray-100 text-gray-700';
  };

  const getConnectionIcon = (connection) => {
    switch(connection) {
      case 'wifi': return <Wifi size={12} className="text-blue-600" />;
      case 'ethernet': return <EthernetPort size={12} className="text-green-600" />;
      case 'bluetooth': return <Bluetooth size={12} className="text-purple-600" />;
      default: return <Wifi size={12} className="text-gray-600" />;
    }
  };

  const getBatteryIcon = (level, status) => {
    if (status === 'charging') return <BatteryCharging size={14} className="text-blue-600" />;
    if (level > 80) return <BatteryFull size={14} className="text-green-600" />;
    if (level > 50) return <BatteryMedium size={14} className="text-green-600" />;
    if (level > 20) return <BatteryMedium size={14} className="text-yellow-600" />;
    return <BatteryWarning size={14} className="text-red-600" />;
  };

  const filteredDevices = devices.filter(device => {
    const matchesType = selectedType === 'all' || device.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || device.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || device.location === selectedLocation;
    const matchesHealth = selectedHealth === 'all' || device.healthStatus === selectedHealth;
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesLocation && matchesHealth && matchesSearch;
  });

  const stats = {
    total: devices.length,
    healthy: devices.filter(d => d.status === 'healthy').length,
    warning: devices.filter(d => d.status === 'warning').length,
    critical: devices.filter(d => d.status === 'critical').length,
    offline: devices.filter(d => d.status === 'offline').length,
    avgHealth: Math.round(devices.filter(d => d.health > 0).reduce((sum, d) => sum + d.health, 0) / devices.filter(d => d.health > 0).length),
    alerts: devices.reduce((sum, d) => sum + d.alerts.length, 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Device Health</h1>
            <p className="text-black/50 mt-1">Monitor health and performance of all connected devices</p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#F5EEE9]">
                  <Download size={16} />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <File className="mr-2 h-4 w-4 text-red-600" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileJson className="mr-2 h-4 w-4 text-blue-600" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PrinterIcon className="mr-2 h-4 w-4" />
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowReportDialog(true)}
            >
              <Activity size={16} />
              Health Report
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowMaintenanceDialog(true)}
            >
              <Wrench size={16} />
              Maintenance
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowDiagnosticDialog(true)}
            >
              <Activity size={16} />
              Run Diagnostics
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Devices</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
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
                  <p className="text-xs text-black/50">Healthy</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.healthy}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Warning</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.warning}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <AlertTriangle size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Critical</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.critical}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Offline</p>
                  <p className="text-xl font-bold text-gray-600 mt-1">{stats.offline}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-full">
                  <Ban size={18} className="text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Health</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.avgHealth}%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Gauge size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Alerts</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.alerts}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <AlertTriangle size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
            <Input
              placeholder="Search by name, ID, model, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Device Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {deviceTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedHealth} onValueChange={setSelectedHealth}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Health" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Health</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc.id} value={loc.name}>{loc.name} ({loc.count})</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="border-[#F5EEE9]">
            <Filter size={16} />
          </Button>
          <Button variant="outline" size="icon" className="border-[#F5EEE9]">
            <RefreshCw size={16} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-red-600 hover:bg-red-700' : 'border-[#F5EEE9]'}
          >
            <Grid size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-red-600 hover:bg-red-700' : 'border-[#F5EEE9]'}
          >
            <List size={16} />
          </Button>
        </div>
      </div>

      {/* Devices Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredDevices.map((device) => {
            const StatusIcon = statusConfig[device.status]?.icon || CheckCircle;
            
            return (
              <Card key={device.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#F5EEE9] rounded-lg">
                          {device.type === 'barcode_scanner' && <Scan size={18} className="text-red-600" />}
                          {device.type === 'printer' && <Printer size={18} className="text-red-600" />}
                          {device.type === 'rfid_reader' && <Radio size={18} className="text-red-600" />}
                          {device.type === 'robot' && <Cpu size={18} className="text-red-600" />}
                          {device.type === 'sensor' && <Thermometer size={18} className="text-red-600" />}
                          {device.type === 'camera' && <Camera size={18} className="text-red-600" />}
                          {device.type === 'kiosk' && <Monitor size={18} className="text-red-600" />}
                          {device.type === 'scale' && <Gauge size={18} className="text-red-600" />}
                          {device.type === 'handheld' && <Smartphone size={18} className="text-red-600" />}
                          {device.type === 'power' && <Zap size={18} className="text-red-600" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs border-0", getStatusColor(device.status))}>
                              <StatusIcon className="mr-1" size={10} />
                              {device.status}
                            </Badge>
                            <Badge className={cn("text-xs", getHealthStatusColor(device.healthStatus))}>
                              {device.healthStatus}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-black">{device.name}</h3>
                          <p className="text-xs text-black/50 mt-0.5">{device.deviceId}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedDevice(device);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedDevice(device);
                            setShowDiagnosticDialog(true);
                          }}>
                            <Activity className="mr-2 h-4 w-4" />
                            Run Diagnostic
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedDevice(device);
                            setShowMaintenanceDialog(true);
                          }}>
                            <Wrench className="mr-2 h-4 w-4" />
                            Schedule Maintenance
                          </DropdownMenuItem>
                          {device.status === 'online' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedDevice(device);
                              setShowRebootDialog(true);
                            }}>
                              <Power className="mr-2 h-4 w-4" />
                              Reboot
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Health Score */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Health Score</span>
                        <span className="text-xs font-medium">{device.health}%</span>
                      </div>
                      <Progress 
                        value={device.health} 
                        className="h-2 bg-[#F5EEE9]"
                        style={{ 
                          '--progress-background': 
                            device.health >= 90 ? '#22c55e' :
                            device.health >= 75 ? '#3b82f6' :
                            device.health >= 50 ? '#eab308' :
                            device.health >= 25 ? '#f97316' :
                            '#ef4444'
                        }}
                      />
                    </div>

                    {/* Location & Assignment */}
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={12} className="text-red-600" />
                      <span className="text-xs">{device.location} • {device.zone}</span>
                    </div>
                    {device.assignedTo && (
                      <div className="flex items-center gap-2 mb-2">
                        <User size={12} className="text-blue-600" />
                        <span className="text-xs">{device.assignedTo}</span>
                      </div>
                    )}

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Cpu size={12} className="text-black/50" />
                        <span className="text-xs">CPU: {device.cpuUsage}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Thermometer size={12} className="text-black/50" />
                        <span className="text-xs">{device.temperature}°C</span>
                      </div>
                    </div>

                    {/* Battery & Connection */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {device.batteryLevel !== undefined && getBatteryIcon(device.batteryLevel, device.batteryStatus)}
                        {device.batteryLevel !== undefined && (
                          <span className="text-xs">{device.batteryLevel}%</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {getConnectionIcon(device.connectionType)}
                        {device.signalStrength && (
                          <span className="text-xs">{device.signalStrength}%</span>
                        )}
                      </div>
                    </div>

                    {/* Alerts */}
                    {device.alerts.length > 0 && (
                      <div className="mb-2 p-2 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-1">
                          <AlertCircle size={10} className="text-red-600" />
                          <span className="text-[10px] text-red-700">{device.alerts.length} alerts</span>
                        </div>
                      </div>
                    )}

                    {/* Last Seen */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
                      <span>Last seen: {device.lastSeen.split(' ')[1]}</span>
                      <span>Uptime: {device.uptime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-[#F5EEE9]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                  <TableHead className="w-8">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-black/50">Device</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Health</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50">CPU</TableHead>
                  <TableHead className="text-black/50">Temp</TableHead>
                  <TableHead className="text-black/50">Battery</TableHead>
                  <TableHead className="text-black/50">Uptime</TableHead>
                  <TableHead className="text-black/50">Alerts</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => (
                  <TableRow key={device.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-xs text-black/50">{device.deviceId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {device.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(device.status))}>
                        {device.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={device.health} className="w-16 h-2 bg-[#F5EEE9]" />
                        <span className="text-xs">{device.health}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{device.zone}</TableCell>
                    <TableCell>{device.cpuUsage}%</TableCell>
                    <TableCell>{device.temperature}°C</TableCell>
                    <TableCell>
                      {device.batteryLevel !== undefined ? (
                        <div className="flex items-center gap-1">
                          {getBatteryIcon(device.batteryLevel, device.batteryStatus)}
                          <span className="text-xs">{device.batteryLevel}%</span>
                        </div>
                      ) : '—'}
                    </TableCell>
                    <TableCell className="text-xs">{device.uptime}</TableCell>
                    <TableCell>
                      {device.alerts.length > 0 ? (
                        <Badge className="bg-red-100 text-red-700">{device.alerts.length}</Badge>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedDevice(device);
                          setShowDetailsDialog(true);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-[#F5EEE9] p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-black/50">
                Showing {filteredDevices.length} of {devices.length} devices
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-red-600 text-white border-red-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Device Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Device Health Details</DialogTitle>
          </DialogHeader>

          {selectedDevice && (
            <div className="py-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F5EEE9] rounded-lg">
                  {selectedDevice.type === 'barcode_scanner' && <Scan size={24} className="text-red-600" />}
                  {selectedDevice.type === 'printer' && <Printer size={24} className="text-red-600" />}
                  {selectedDevice.type === 'rfid_reader' && <Radio size={24} className="text-red-600" />}
                  {selectedDevice.type === 'robot' && <Cpu size={24} className="text-red-600" />}
                  {selectedDevice.type === 'sensor' && <Thermometer size={24} className="text-red-600" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedDevice.name}</h3>
                  <p className="text-sm text-black/50">{selectedDevice.model} • {selectedDevice.manufacturer}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Device ID</p>
                  <p className="text-sm font-mono">{selectedDevice.deviceId}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Firmware</p>
                  <p className="text-sm">v{selectedDevice.firmwareVersion}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={cn("text-xs border-0", getStatusColor(selectedDevice.status))}>
                  {selectedDevice.status}
                </Badge>
                <Badge className={cn("text-xs", getHealthStatusColor(selectedDevice.healthStatus))}>
                  {selectedDevice.healthStatus}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 p-3 bg-[#F5EEE9] rounded-lg">
                <div>
                  <p className="text-xs text-black/50">Health Score</p>
                  <p className="text-2xl font-bold">{selectedDevice.health}%</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Uptime</p>
                  <p className="text-sm font-medium">{selectedDevice.uptime}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Location</p>
                  <p className="text-sm">{selectedDevice.location} • {selectedDevice.zone}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Assigned To</p>
                  <p className="text-sm">{selectedDevice.assignedTo || 'Unassigned'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">CPU Usage</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-[#F5EEE9] rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          selectedDevice.cpuUsage > 80 ? 'bg-red-500' :
                          selectedDevice.cpuUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        )}
                        style={{ width: `${selectedDevice.cpuUsage}%` }}
                      />
                    </div>
                    <span className="text-sm">{selectedDevice.cpuUsage}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-black/50">Temperature</p>
                  <p className="text-sm">{selectedDevice.temperature}°C</p>
                </div>
              </div>

              {selectedDevice.batteryLevel !== undefined && (
                <div>
                  <p className="text-xs text-black/50">Battery</p>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-[#F5EEE9] rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          selectedDevice.batteryLevel > 80 ? 'bg-green-500' :
                          selectedDevice.batteryLevel > 50 ? 'bg-green-500' :
                          selectedDevice.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        )}
                        style={{ width: `${selectedDevice.batteryLevel}%` }}
                      />
                    </div>
                    <span className="text-sm">{selectedDevice.batteryLevel}%</span>
                    <Badge className="text-xs bg-blue-100 text-blue-700">
                      {selectedDevice.batteryStatus}
                    </Badge>
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs text-black/50">Maintenance</p>
                <p className="text-sm">Last: {selectedDevice.lastMaintenance}</p>
                <p className="text-sm">Next: {selectedDevice.nextMaintenance}</p>
              </div>

              {selectedDevice.alerts.length > 0 && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-xs font-medium text-red-700 mb-2">Active Alerts</p>
                  {selectedDevice.alerts.map((alert, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-red-600">
                      <AlertCircle size={10} />
                      <span>{alert}</span>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <p className="text-xs text-black/50">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedDevice.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedDevice?.status !== 'offline' && (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowDiagnosticDialog(true);
              }}>
                <Activity className="mr-2 h-4 w-4" />
                Run Diagnostic
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"
                onClick={() => setShowDiagnosticDialog(true)}
              >
                <Activity size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Run Diagnostics</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowMaintenanceDialog(true)}
              >
                <Wrench size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Maintenance</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowReportDialog(true)}
              >
                <Activity size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Health Report</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DeviceHealthPage;