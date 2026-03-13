// app/dashboard/battery-status/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Battery,
  BatteryCharging,
  BatteryWarning,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Zap,
  Clock,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
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
  Settings,
  Wrench,
  Cpu,
  Thermometer,
  Wifi,
  Bluetooth,
  MapPin,
  User,
  Tag,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  Activity,
  Gauge,

  Smartphone,
  Tablet,
  Laptop,
  Scan,
  Watch,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BatteryStatusPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedChargeLevel, setSelectedChargeLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showChargeDialog, setShowChargeDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample battery status data
  const devices = [
    {
      id: 'BAT-001',
      deviceId: 'SCN-001',
      name: 'Warehouse Scanner A1',
      type: 'scanner',
      model: 'Zebra DS3608',
      batteryLevel: 78,
      batteryStatus: 'discharging',
      batteryHealth: 92,
      batteryCycles: 156,
      batteryCapacity: 85,
      batteryTemperature: 32,
      estimatedRuntime: 320,
      timeToFull: 0,
      charging: false,
      pluggedIn: false,
      lastCharge: '2024-03-16 14:30',
      lastFullCharge: '2024-03-16 14:30',
      location: 'Warehouse A',
      zone: 'Picking Zone',
      assignedTo: 'John Doe',
      status: 'good',
      priority: 'normal',
      alerts: [],
      tags: ['scanner', 'handheld'],
    },
    {
      id: 'BAT-002',
      deviceId: 'SCN-002',
      name: 'Warehouse Scanner A2',
      type: 'scanner',
      model: 'Zebra DS3608',
      batteryLevel: 45,
      batteryStatus: 'discharging',
      batteryHealth: 88,
      batteryCycles: 234,
      batteryCapacity: 82,
      batteryTemperature: 31,
      estimatedRuntime: 185,
      timeToFull: 0,
      charging: false,
      pluggedIn: false,
      lastCharge: '2024-03-17 08:15',
      lastFullCharge: '2024-03-16 22:30',
      location: 'Warehouse A',
      zone: 'Picking Zone',
      assignedTo: 'Jane Smith',
      status: 'warning',
      priority: 'medium',
      alerts: ['Battery level below 50%'],
      tags: ['scanner', 'handheld'],
    },
    {
      id: 'BAT-003',
      deviceId: 'SCN-003',
      name: 'Warehouse Scanner A3',
      type: 'scanner',
      model: 'Zebra DS3608',
      batteryLevel: 18,
      batteryStatus: 'critical',
      batteryHealth: 72,
      batteryCycles: 456,
      batteryCapacity: 68,
      batteryTemperature: 35,
      estimatedRuntime: 45,
      timeToFull: 0,
      charging: false,
      pluggedIn: false,
      lastCharge: '2024-03-17 06:30',
      lastFullCharge: '2024-03-16 18:45',
      location: 'Warehouse A',
      zone: 'Picking Zone',
      assignedTo: 'Mike Johnson',
      status: 'critical',
      priority: 'high',
      alerts: ['Battery critical', 'Replace soon'],
      tags: ['scanner', 'handheld'],
    },
    {
      id: 'BAT-004',
      deviceId: 'HMD-001',
      name: 'Handheld Terminal - Receiving',
      type: 'handheld',
      model: 'Zebra TC57',
      batteryLevel: 92,
      batteryStatus: 'charging',
      batteryHealth: 95,
      batteryCycles: 89,
      batteryCapacity: 90,
      batteryTemperature: 28,
      estimatedRuntime: 410,
      timeToFull: 25,
      charging: true,
      pluggedIn: true,
      lastCharge: '2024-03-17 10:15',
      lastFullCharge: '2024-03-17 09:30',
      location: 'Warehouse A',
      zone: 'Charging Station',
      assignedTo: 'Tom Brown',
      status: 'good',
      priority: 'normal',
      alerts: [],
      tags: ['handheld', 'charging'],
    },
    {
      id: 'BAT-005',
      deviceId: 'RBT-001',
      name: 'AGV - Unit 01',
      type: 'robot',
      model: 'Fetch Freight 1500',
      batteryLevel: 67,
      batteryStatus: 'discharging',
      batteryHealth: 84,
      batteryCycles: 312,
      batteryCapacity: 78,
      batteryTemperature: 38,
      estimatedRuntime: 210,
      timeToFull: 0,
      charging: false,
      pluggedIn: false,
      lastCharge: '2024-03-17 08:45',
      lastFullCharge: '2024-03-16 23:30',
      location: 'Warehouse A',
      zone: 'Storage Zone A',
      assignedTo: 'Automation Team',
      status: 'warning',
      priority: 'medium',
      alerts: ['Battery level below 70%'],
      tags: ['robot', 'agv'],
    },
    {
      id: 'BAT-006',
      deviceId: 'RBT-002',
      name: 'AGV - Unit 02',
      type: 'robot',
      model: 'Fetch Freight 1500',
      batteryLevel: 23,
      batteryStatus: 'returning',
      batteryHealth: 65,
      batteryCycles: 567,
      batteryCapacity: 58,
      batteryTemperature: 42,
      estimatedRuntime: 60,
      timeToFull: 0,
      charging: false,
      pluggedIn: false,
      lastCharge: '2024-03-17 07:30',
      lastFullCharge: '2024-03-16 20:15',
      location: 'Warehouse A',
      zone: 'Returning to Charger',
      assignedTo: 'Automation Team',
      status: 'critical',
      priority: 'high',
      alerts: ['Battery critical', 'Returning to charger'],
      tags: ['robot', 'agv'],
    },
    {
      id: 'BAT-007',
      deviceId: 'TAB-001',
      name: 'Inventory Tablet',
      type: 'tablet',
      model: 'Samsung Galaxy Tab Active',
      batteryLevel: 81,
      batteryStatus: 'discharging',
      batteryHealth: 91,
      batteryCycles: 134,
      batteryCapacity: 88,
      batteryTemperature: 30,
      estimatedRuntime: 350,
      timeToFull: 0,
      charging: false,
      pluggedIn: false,
      lastCharge: '2024-03-17 09:00',
      lastFullCharge: '2024-03-16 21:30',
      location: 'Warehouse B',
      zone: 'Inventory Office',
      assignedTo: 'Sarah Wilson',
      status: 'good',
      priority: 'normal',
      alerts: [],
      tags: ['tablet', 'mobile'],
    },
    {
      id: 'BAT-008',
      deviceId: 'LAP-001',
      name: 'Supervisor Laptop',
      type: 'laptop',
      model: 'Dell Latitude 7430',
      batteryLevel: 95,
      batteryStatus: 'charged',
      batteryHealth: 98,
      batteryCycles: 45,
      batteryCapacity: 95,
      batteryTemperature: 29,
      estimatedRuntime: 480,
      timeToFull: 0,
      charging: false,
      pluggedIn: true,
      lastCharge: '2024-03-17 08:30',
      lastFullCharge: '2024-03-17 08:30',
      location: 'Office A',
      zone: 'Supervisor Desk',
      assignedTo: 'Jane Smith',
      status: 'good',
      priority: 'normal',
      alerts: [],
      tags: ['laptop', 'supervisor'],
    },
    {
      id: 'BAT-009',
      deviceId: 'WRL-001',
      name: 'Wearable Scanner - Ring',
      type: 'wearable',
      model: 'ProGlove MARK 2',
      batteryLevel: 34,
      batteryStatus: 'low',
      batteryHealth: 76,
      batteryCycles: 289,
      batteryCapacity: 72,
      batteryTemperature: 33,
      estimatedRuntime: 95,
      timeToFull: 0,
      charging: false,
      pluggedIn: false,
      lastCharge: '2024-03-17 06:45',
      lastFullCharge: '2024-03-16 17:30',
      location: 'Warehouse A',
      zone: 'Picking Zone',
      assignedTo: 'Mike Johnson',
      status: 'warning',
      priority: 'medium',
      alerts: ['Battery level low'],
      tags: ['wearable', 'ring'],
    },
    {
      id: 'BAT-010',
      deviceId: 'UPS-001',
      name: 'UPS - Server Room',
      type: 'ups',
      model: 'APC SMT3000',
      batteryLevel: 100,
      batteryStatus: 'charged',
      batteryHealth: 99,
      batteryCycles: 12,
      batteryCapacity: 98,
      batteryTemperature: 27,
      estimatedRuntime: 720,
      timeToFull: 0,
      charging: false,
      pluggedIn: true,
      lastCharge: '2024-03-17 00:00',
      lastFullCharge: '2024-03-17 00:00',
      location: 'Server Room',
      zone: 'IT',
      assignedTo: 'IT Team',
      status: 'good',
      priority: 'normal',
      alerts: [],
      tags: ['ups', 'power'],
    },
    {
      id: 'BAT-011',
      deviceId: 'BAT-011',
      name: 'Spare Battery Pack 01',
      type: 'spare',
      model: 'Generic Li-Ion',
      batteryLevel: 98,
      batteryStatus: 'storage',
      batteryHealth: 97,
      batteryCycles: 5,
      batteryCapacity: 96,
      batteryTemperature: 24,
      estimatedRuntime: 0,
      timeToFull: 0,
      charging: false,
      pluggedIn: false,
      lastCharge: '2024-03-15 14:30',
      lastFullCharge: '2024-03-15 14:30',
      location: 'Storage Room',
      zone: 'Battery Cabinet',
      assignedTo: null,
      status: 'good',
      priority: 'low',
      alerts: [],
      tags: ['spare', 'storage'],
    },
    {
      id: 'BAT-012',
      deviceId: 'BAT-012',
      name: 'Spare Battery Pack 02',
      type: 'spare',
      model: 'Generic Li-Ion',
      batteryLevel: 45,
      batteryStatus: 'storage',
      batteryHealth: 82,
      batteryCycles: 23,
      batteryCapacity: 78,
      batteryTemperature: 25,
      estimatedRuntime: 0,
      timeToFull: 0,
      charging: false,
      pluggedIn: false,
      lastCharge: '2024-03-10 11:20',
      lastFullCharge: '2024-03-10 11:20',
      location: 'Storage Room',
      zone: 'Battery Cabinet',
      assignedTo: null,
      status: 'warning',
      priority: 'low',
      alerts: ['Should be recharged'],
      tags: ['spare', 'storage'],
    },
  ];

  // Device types
  const deviceTypes = [
    { id: 'scanner', name: 'Scanner' },
    { id: 'handheld', name: 'Handheld' },
    { id: 'robot', name: 'Robot' },
    { id: 'tablet', name: 'Tablet' },
    { id: 'laptop', name: 'Laptop' },
    { id: 'wearable', name: 'Wearable' },
    { id: 'ups', name: 'UPS' },
    { id: 'spare', name: 'Spare Battery' },
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', count: 6 },
    { id: 'wh-b', name: 'Warehouse B', count: 1 },
    { id: 'office', name: 'Office A', count: 1 },
    { id: 'server', name: 'Server Room', count: 1 },
    { id: 'storage', name: 'Storage Room', count: 2 },
  ];

  // Status configuration
  const statusConfig = {
    good: { label: 'Good', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    warning: { label: 'Warning', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    critical: { label: 'Critical', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    charging: { label: 'Charging', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: BatteryCharging },
  };

  const batteryStatusConfig = {
    discharging: { label: 'Discharging', icon: Battery, color: 'bg-gray-100 text-gray-700' },
    charging: { label: 'Charging', icon: BatteryCharging, color: 'bg-blue-100 text-blue-700' },
    charged: { label: 'Charged', icon: BatteryFull, color: 'bg-green-100 text-green-700' },
    critical: { label: 'Critical', icon: BatteryWarning, color: 'bg-red-100 text-red-700' },
    low: { label: 'Low', icon: BatteryLow, color: 'bg-yellow-100 text-yellow-700' },
    returning: { label: 'Returning', icon: Battery, color: 'bg-purple-100 text-purple-700' },
    storage: { label: 'Storage', icon: Battery, color: 'bg-gray-100 text-gray-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getBatteryStatusIcon = (status) => {
    const config = batteryStatusConfig[status];
    const Icon = config?.icon || Battery;
    return Icon;
  };

  const getBatteryStatusColor = (status) => {
    return batteryStatusConfig[status]?.color || 'bg-gray-100 text-gray-700';
  };

  const getBatteryIcon = (level, status) => {
    if (status === 'charging') return <BatteryCharging size={18} className="text-blue-600" />;
    if (status === 'charged') return <BatteryFull size={18} className="text-green-600" />;
    if (level > 80) return <BatteryFull size={18} className="text-green-600" />;
    if (level > 50) return <BatteryMedium size={18} className="text-green-600" />;
    if (level > 20) return <BatteryMedium size={18} className="text-yellow-600" />;
    return <BatteryWarning size={18} className="text-red-600" />;
  };

  const getBatteryLevelColor = (level) => {
    if (level > 80) return 'text-green-600';
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDeviceIcon = (type) => {
    switch(type) {
      case 'scanner': return <Scan size={16} className="text-red-600" />;
      case 'handheld': return <Smartphone size={16} className="text-red-600" />;
      case 'robot': return <Cpu size={16} className="text-red-600" />;
      case 'tablet': return <Tablet size={16} className="text-red-600" />;
      case 'laptop': return <Laptop size={16} className="text-red-600" />;
      case 'wearable': return <Watch size={16} className="text-red-600" />;
      case 'ups': return <Zap size={16} className="text-red-600" />;
      case 'spare': return <Battery size={16} className="text-red-600" />;
      default: return <Battery size={16} className="text-red-600" />;
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesType = selectedType === 'all' || device.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || device.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || device.location === selectedLocation;
    
    let matchesCharge = true;
    if (selectedChargeLevel === 'critical') matchesCharge = device.batteryLevel < 20;
    else if (selectedChargeLevel === 'low') matchesCharge = device.batteryLevel >= 20 && device.batteryLevel < 50;
    else if (selectedChargeLevel === 'medium') matchesCharge = device.batteryLevel >= 50 && device.batteryLevel < 80;
    else if (selectedChargeLevel === 'high') matchesCharge = device.batteryLevel >= 80;
    
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (device.assignedTo && device.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesStatus && matchesLocation && matchesCharge && matchesSearch;
  });

  const stats = {
    total: devices.length,
    critical: devices.filter(d => d.batteryLevel < 20).length,
    low: devices.filter(d => d.batteryLevel >= 20 && d.batteryLevel < 50).length,
    medium: devices.filter(d => d.batteryLevel >= 50 && d.batteryLevel < 80).length,
    high: devices.filter(d => d.batteryLevel >= 80).length,
    charging: devices.filter(d => d.batteryStatus === 'charging').length,
    avgBattery: Math.round(devices.reduce((sum, d) => sum + d.batteryLevel, 0) / devices.length),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Battery Status</h1>
            <p className="text-black/50 mt-1">Monitor battery levels and charging status of all devices</p>
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
                  <Printer className="mr-2 h-4 w-4" />
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
              Battery Report
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowAlertDialog(true)}
            >
              <AlertTriangle size={16} />
              Alerts
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowChargeDialog(true)}
            >
              <Zap size={16} />
              Charge Station
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
                  <Battery size={18} className="text-red-600" />
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
                  <BatteryWarning size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Low</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.low}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <BatteryLow size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Medium</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.medium}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <BatteryMedium size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">High</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.high}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <BatteryFull size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Charging</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.charging}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <BatteryCharging size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Level</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.avgBattery}%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Gauge size={18} className="text-purple-600" />
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
              placeholder="Search by device name, ID, location, or assignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
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
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="charging">Charging</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedChargeLevel} onValueChange={setSelectedChargeLevel}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Charge Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="critical">Critical (&lt;20%)</SelectItem>
              <SelectItem value="low">Low (20-49%)</SelectItem>
              <SelectItem value="medium">Medium (50-79%)</SelectItem>
              <SelectItem value="high">High (80-100%)</SelectItem>
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

      {/* Battery Status Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredDevices.map((device) => {
            const StatusIcon = statusConfig[device.status]?.icon || CheckCircle;
            const BatteryStatusIcon = getBatteryStatusIcon(device.batteryStatus);
            
            return (
              <Card key={device.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#F5EEE9] rounded-lg">
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs border-0", getStatusColor(device.status))}>
                              <StatusIcon className="mr-1" size={10} />
                              {device.status}
                            </Badge>
                            <Badge className={cn("text-xs", getBatteryStatusColor(device.batteryStatus))}>
                              <BatteryStatusIcon size={10} className="mr-1" />
                              {device.batteryStatus}
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
                          {device.batteryStatus !== 'charging' && device.batteryStatus !== 'charged' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedDevice(device);
                              setShowChargeDialog(true);
                            }}>
                              <Zap className="mr-2 h-4 w-4" />
                              Send to Charge
                            </DropdownMenuItem>
                          )}
                          {device.batteryHealth < 70 && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedDevice(device);
                              setShowReplaceDialog(true);
                            }}>
                              <Wrench className="mr-2 h-4 w-4" />
                              Replace Battery
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <History className="mr-2 h-4 w-4" />
                            View History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Battery Level */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getBatteryIcon(device.batteryLevel, device.batteryStatus)}
                          <span className={cn("text-2xl font-bold", getBatteryLevelColor(device.batteryLevel))}>
                            {device.batteryLevel}%
                          </span>
                        </div>
                        {device.charging && (
                          <Badge className="bg-blue-100 text-blue-700">
                            <Zap size={10} className="mr-1" />
                            {device.timeToFull} min left
                          </Badge>
                        )}
                      </div>
                      <Progress 
                        value={device.batteryLevel} 
                        className="h-3 bg-[#F5EEE9]"
                        style={{ 
                          '--progress-background': 
                            device.batteryLevel > 80 ? '#22c55e' :
                            device.batteryLevel > 50 ? '#22c55e' :
                            device.batteryLevel > 20 ? '#eab308' :
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

                    {/* Battery Metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Activity size={12} className="text-black/50" />
                        <span className="text-xs">Health: {device.batteryHealth}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-black/50" />
                        <span className="text-xs">{device.estimatedRuntime} min</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Gauge size={12} className="text-black/50" />
                        <span className="text-xs">Cycles: {device.batteryCycles}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Thermometer size={12} className="text-black/50" />
                        <span className="text-xs">{device.batteryTemperature}°C</span>
                      </div>
                    </div>

                    {/* Alerts */}
                    {device.alerts.length > 0 && (
                      <div className="mt-2 p-2 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-1">
                          <AlertCircle size={10} className="text-red-600" />
                          <span className="text-[10px] text-red-700">{device.alerts[0]}</span>
                        </div>
                      </div>
                    )}

                    {/* Last Charge */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
                      <span>Last charge: {device.lastCharge}</span>
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
                  <TableHead className="text-black/50">Battery</TableHead>
                  <TableHead className="text-black/50">Level</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Health</TableHead>
                  <TableHead className="text-black/50">Runtime</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50">Assignee</TableHead>
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
                        {device.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getBatteryIcon(device.batteryLevel, device.batteryStatus)}
                        <Progress value={device.batteryLevel} className="w-16 h-2 bg-[#F5EEE9]" />
                      </div>
                    </TableCell>
                    <TableCell className={cn("font-bold", getBatteryLevelColor(device.batteryLevel))}>
                      {device.batteryLevel}%
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getBatteryStatusColor(device.batteryStatus))}>
                        {device.batteryStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={device.batteryHealth} className="w-16 h-2 bg-[#F5EEE9]" />
                        <span className="text-xs">{device.batteryHealth}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{device.estimatedRuntime} min</TableCell>
                    <TableCell>{device.zone}</TableCell>
                    <TableCell>{device.assignedTo || '—'}</TableCell>
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Battery Details</DialogTitle>
          </DialogHeader>

          {selectedDevice && (
            <div className="py-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F5EEE9] rounded-lg">
                  {getDeviceIcon(selectedDevice.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedDevice.name}</h3>
                  <p className="text-sm text-black/50">{selectedDevice.model}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={cn("text-xs border-0", getStatusColor(selectedDevice.status))}>
                  {selectedDevice.status}
                </Badge>
                <Badge className={cn("text-xs", getBatteryStatusColor(selectedDevice.batteryStatus))}>
                  {selectedDevice.batteryStatus}
                </Badge>
              </div>

              <div className="p-4 bg-[#F5EEE9] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Level</span>
                  <div className="flex items-center gap-2">
                    {getBatteryIcon(selectedDevice.batteryLevel, selectedDevice.batteryStatus)}
                    <span className={cn("text-2xl font-bold", getBatteryLevelColor(selectedDevice.batteryLevel))}>
                      {selectedDevice.batteryLevel}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={selectedDevice.batteryLevel} 
                  className="h-3 bg-[#F5EEE9]"
                  style={{ 
                    '--progress-background': 
                      selectedDevice.batteryLevel > 80 ? '#22c55e' :
                      selectedDevice.batteryLevel > 50 ? '#22c55e' :
                      selectedDevice.batteryLevel > 20 ? '#eab308' :
                      '#ef4444'
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Battery Health</p>
                  <p className="text-lg font-bold">{selectedDevice.batteryHealth}%</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Charge Cycles</p>
                  <p className="text-lg font-bold">{selectedDevice.batteryCycles}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Capacity</p>
                  <p className="text-lg font-bold">{selectedDevice.batteryCapacity}%</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Temperature</p>
                  <p className="text-lg font-bold">{selectedDevice.batteryTemperature}°C</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Est. Runtime</p>
                  <p className="text-sm font-medium">{selectedDevice.estimatedRuntime} minutes</p>
                </div>
                {selectedDevice.charging && (
                  <div>
                    <p className="text-xs text-black/50">Time to Full</p>
                    <p className="text-sm font-medium">{selectedDevice.timeToFull} minutes</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs text-black/50">Location</p>
                <p className="text-sm">{selectedDevice.location} • {selectedDevice.zone}</p>
              </div>

              {selectedDevice.assignedTo && (
                <div>
                  <p className="text-xs text-black/50">Assigned To</p>
                  <p className="text-sm">{selectedDevice.assignedTo}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-black/50">Last Charge</p>
                  <p>{selectedDevice.lastCharge}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Last Full</p>
                  <p>{selectedDevice.lastFullCharge}</p>
                </div>
              </div>

              {selectedDevice.alerts.length > 0 && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-xs font-medium text-red-700 mb-2">Alerts</p>
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
            {selectedDevice?.batteryStatus !== 'charging' && selectedDevice?.batteryStatus !== 'charged' && (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowChargeDialog(true);
              }}>
                <Zap className="mr-2 h-4 w-4" />
                Send to Charge
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
                onClick={() => setShowChargeDialog(true)}
              >
                <Zap size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Charge Station</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowReplaceDialog(true)}
              >
                <Wrench size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Replace Battery</TooltipContent>
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
            <TooltipContent side="left">Battery Report</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default BatteryStatusPage;