// app/dashboard/connected-devices/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Radio,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Download,
  Grid,
  List,

  Ban,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Wrench,
  Tool,
  Settings2,
  Sliders,
  Activity,
  Scale,
  Scan,
  Camera,
  Network,
  Power,
  ToggleLeft as ToggleLeftIcon,
  ToggleRight as ToggleRightIcon,
  ArrowLeftRight as ArrowLeftRightIcon,
  ArrowUpDown as ArrowUpDownIcon,
  MoveHorizontal as MoveHorizontalIcon,
  MoveVertical as MoveVerticalIcon,
  GripVertical as GripVerticalIcon,
  GripHorizontal as GripHorizontalIcon,
  TruckIcon as TruckIconCustom,
  PackageIcon as PackageIconCustom,
  WeightIcon as WeightIconCustom,
  RulerIcon as RulerIconCustom,
  PackagePlusIcon as PackagePlusIconCustom,
  PackageMinusIcon as PackageMinusIconCustom,
  PackageCheckIcon as PackageCheckIconCustom,
  PackageXIcon as PackageXIconCustom,
  PackageSearchIcon as PackageSearchIconCustom,
  CrateIcon as CrateIconCustom,
  PalletIcon as PalletIconCustom,
  ContainerIcon as ContainerIconCustom,
  PrinterIcon as PrinterIconCustom,
  BoxSelect,
  BoxesIcon as BoxesIconCustom,
  LayoutGridIcon as LayoutGridIconCustom,
  Grid3x3Icon as Grid3x3IconCustom,
  ShipIcon as ShipIconCustom,
  PlaneIcon as PlaneIconCustom,
  TrainIcon as TrainIconCustom,
  BikeIcon as BikeIconCustom,
  BusIcon as BusIconCustom,
  CarIcon as CarIconCustom,

  MapIcon as MapIconCustom,
  MapPinIcon as MapPinIconCustom,
  NavigationIcon as NavigationIconCustom,
  CompassIcon as CompassIconCustom,
  RouteIcon as RouteIconCustom,
  WaypointsIcon as WaypointsIconCustom,
  TrackingIcon as TrackingIconCustom,
  Cpu,
  Monitor,
  Smartphone,
  Printer as PrinterDevice,
  Camera as CameraDevice,
  Drone,
  Router,
  Database as DatabaseIcon,
  Wifi,
  Bluetooth,
  Battery,
  BatteryCharging,
  BatteryWarning,
  BatteryMedium,
  BatteryFull,

  PowerIcon as PowerIconCustom,
  PowerOffIcon as PowerOffIconCustom,
  Signal,
  UsbIcon as UsbIconCustom,
  PrinterIcon as PrinterDeviceIcon,
  SwitchIcon as SwitchIconCustom,
  DatabaseIcon as DatabaseIconCustom,
  GaugeIcon as GaugeIconCustom,
  ActivityIcon as ActivityIconCustom,
  ZapIcon as ZapIconCustom,
  Thermometer,
  NavigationIcon as NavigationIconCustom2,
  MapPinIcon as MapPinIconCustom2,
  GaugeIcon as GaugeIconCustom2,
  GaugeCircleIcon as GaugeCircleIconCustom,
  EthernetPort,
  Bot,
  Watch
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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

import { ScrollArea } from '@/components/ui/scroll-area';

import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ConnectedDevicesPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedManufacturer, setSelectedManufacturer] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDiagnosticDialog, setShowDiagnosticDialog] = useState(false);
  const [showFirmwareDialog, setShowFirmwareDialog] = useState(false);
  const [showRebootDialog, setShowRebootDialog] = useState(false);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [showLogsDialog, setShowLogsDialog] = useState(false);
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  const [showPairDialog, setShowPairDialog] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showNetworkDialog, setShowNetworkDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample connected devices data
  const devices = [
    {
      id: 'DEV-001',
      deviceId: 'SCN-001',
      name: 'Warehouse Scanner A1',
      type: 'barcode_scanner',
      category: 'scanning',
      model: 'Zebra DS3608',
      manufacturer: 'Zebra Technologies',
      serialNumber: 'ZBR-2024-001',
      macAddress: '00:1A:2B:3C:4D:5E',
      ipAddress: '192.168.1.101',
      firmwareVersion: '2.1.5',
      hardwareVersion: '1.0',
      status: 'online',
      connection: 'wifi',
      wifi: { ssid: 'Warehouse-Net', signal: 85, band: '5GHz' },
      batteryLevel: 78,
      batteryStatus: 'charging',
      location: 'Warehouse A',
      zone: 'Picking Zone',
      assignedTo: 'John Doe',
      lastSeen: '2024-03-17 10:23:45',
      lastActivity: 'Scan - SKU-001',
      uptime: '15d 4h 23m',
      temperature: 32,
      cpuUsage: 23,
      memoryUsage: 156,
      storageUsage: 256,
      ip: '192.168.1.101',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8', '8.8.4.4'],
      certificates: ['valid'],
      securityLevel: 'high',
      lastFirmwareUpdate: '2024-02-15',
      nextFirmwareUpdate: '2024-05-15',
      scanCount: 15234,
      scanRate: 45,
      errorRate: 0.2,
      avgResponseTime: 120,
      tags: ['scanner', 'handheld', 'warehouse'],
      notes: 'Primary scanner for picking operations',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
        { timestamp: '2024-03-16 23:00', action: 'Battery Charged', user: 'System' },
      ],
    },
    {
      id: 'DEV-002',
      deviceId: 'PRN-001',
      name: 'Label Printer - Packing Station 1',
      type: 'printer',
      category: 'printing',
      model: 'Zebra ZT410',
      manufacturer: 'Zebra Technologies',
      serialNumber: 'ZBR-2024-002',
      macAddress: '00:1A:2B:3C:4D:5F',
      ipAddress: '192.168.1.102',
      firmwareVersion: '3.2.1',
      hardwareVersion: '2.0',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Packing Zone',
      assignedTo: 'Packing Station 1',
      lastSeen: '2024-03-17 10:25:12',
      lastActivity: 'Print - Label SHP-001',
      uptime: '45d 2h 12m',
      temperature: 38,
      cpuUsage: 12,
      memoryUsage: 89,
      storageUsage: 128,
      ip: '192.168.1.102',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8'],
      certificates: ['valid'],
      securityLevel: 'medium',
      lastFirmwareUpdate: '2024-01-20',
      nextFirmwareUpdate: '2024-04-20',
      printCount: 45678,
      printSpeed: 12,
      mediaRemaining: 75,
      ribbonRemaining: 60,
      errorRate: 0.1,
      tags: ['printer', 'label', 'packing'],
      notes: 'Main label printer for packing station',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-003',
      deviceId: 'RDR-001',
      name: 'RFID Gate - Shipping',
      type: 'rfid_reader',
      category: 'rfid',
      model: 'Impinj xArray',
      manufacturer: 'Impinj',
      serialNumber: 'IMP-2024-001',
      macAddress: '00:1A:2B:3C:4D:60',
      ipAddress: '192.168.1.103',
      firmwareVersion: '5.1.2',
      hardwareVersion: '3.0',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Shipping Zone',
      assignedTo: 'Shipping Gate 1',
      lastSeen: '2024-03-17 10:24:30',
      lastActivity: 'Read - 45 tags',
      uptime: '60d 8h 45m',
      temperature: 35,
      cpuUsage: 45,
      memoryUsage: 234,
      storageUsage: 512,
      ip: '192.168.1.103',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8'],
      certificates: ['valid'],
      securityLevel: 'high',
      lastFirmwareUpdate: '2024-02-01',
      nextFirmwareUpdate: '2024-05-01',
      readCount: 1234567,
      readRate: 150,
      tagCount: 45,
      antennaCount: 4,
      antennaStatus: ['online', 'online', 'online', 'online'],
      errorRate: 0.05,
      tags: ['rfid', 'gate', 'shipping'],
      notes: 'Automated RFID gate for outbound scanning',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-004',
      deviceId: 'SCL-001',
      name: 'Floor Scale - Receiving',
      type: 'scale',
      category: 'weighing',
      model: 'Mettler Toledo IND570',
      manufacturer: 'Mettler Toledo',
      serialNumber: 'MT-2024-001',
      macAddress: '00:1A:2B:3C:4D:61',
      ipAddress: '192.168.1.104',
      firmwareVersion: '4.0.3',
      hardwareVersion: '2.1',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Receiving Zone',
      assignedTo: 'Dock 1',
      lastSeen: '2024-03-17 10:22:15',
      lastActivity: 'Weigh - 450kg',
      uptime: '120d 3h 30m',
      temperature: 28,
      cpuUsage: 8,
      memoryUsage: 45,
      storageUsage: 64,
      ip: '192.168.1.104',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8'],
      certificates: ['valid'],
      securityLevel: 'medium',
      lastCalibration: '2024-03-01',
      nextCalibration: '2024-06-01',
      lastFirmwareUpdate: '2024-01-10',
      nextFirmwareUpdate: '2024-04-10',
      weighCount: 3456,
      maxWeight: 1000,
      accuracy: 0.1,
      errorRate: 0.01,
      tags: ['scale', 'receiving', 'weighing'],
      notes: 'Floor scale for receiving department',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-005',
      deviceId: 'GAT-001',
      name: 'IoT Gateway - Warehouse A',
      type: 'gateway',
      category: 'network',
      model: 'Cisco IR829',
      manufacturer: 'Cisco',
      serialNumber: 'CSC-2024-001',
      macAddress: '00:1A:2B:3C:4D:62',
      ipAddress: '192.168.1.1',
      firmwareVersion: '15.2(4)M7',
      hardwareVersion: '2.0',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Server Room',
      assignedTo: 'Network Team',
      lastSeen: '2024-03-17 10:26:00',
      lastActivity: 'Routing',
      uptime: '90d 12h 15m',
      temperature: 42,
      cpuUsage: 32,
      memoryUsage: 456,
      storageUsage: 1024,
      ip: '192.168.1.1',
      gateway: '192.168.1.254',
      dns: ['8.8.8.8', '8.8.4.4'],
      certificates: ['valid'],
      securityLevel: 'high',
      lastFirmwareUpdate: '2024-02-15',
      nextFirmwareUpdate: '2024-05-15',
      connectedDevices: 45,
      bandwidth: 100,
      bandwidthUsage: 35,
      packetsSent: 4567890,
      packetsReceived: 4567890,
      errorRate: 0.001,
      tags: ['gateway', 'network', 'iot'],
      notes: 'Main IoT gateway for Warehouse A',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-006',
      deviceId: 'BAT-001',
      name: 'Battery Management System',
      type: 'battery_station',
      category: 'power',
      model: 'PowerSafe BMS-2000',
      manufacturer: 'PowerSafe',
      serialNumber: 'PS-2024-001',
      macAddress: '00:1A:2B:3C:4D:63',
      ipAddress: '192.168.1.105',
      firmwareVersion: '2.3.1',
      hardwareVersion: '1.5',
      status: 'online',
      connection: 'wifi',
      wifi: { ssid: 'Warehouse-Net', signal: 92, band: '2.4GHz' },
      location: 'Warehouse A',
      zone: 'Charging Station',
      assignedTo: 'Fleet Management',
      lastSeen: '2024-03-17 10:21:30',
      lastActivity: 'Charging - 4 devices',
      uptime: '30d 6h 45m',
      temperature: 31,
      cpuUsage: 15,
      memoryUsage: 78,
      storageUsage: 128,
      ip: '192.168.1.105',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8'],
      certificates: ['valid'],
      securityLevel: 'medium',
      lastFirmwareUpdate: '2024-02-20',
      nextFirmwareUpdate: '2024-05-20',
      totalBatteries: 12,
      chargingBatteries: 4,
      chargedBatteries: 6,
      dischargedBatteries: 2,
      batteryLevels: [85, 92, 78, 45, 23, 67, 89, 95, 34, 56, 72, 88],
      tags: ['battery', 'charging', 'power'],
      notes: 'Manages forklift battery charging',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-007',
      deviceId: 'CAM-001',
      name: 'Security Camera - Receiving',
      type: 'camera',
      category: 'security',
      model: 'Axis P1448-LE',
      manufacturer: 'Axis Communications',
      serialNumber: 'AXS-2024-001',
      macAddress: '00:1A:2B:3C:4D:64',
      ipAddress: '192.168.1.106',
      firmwareVersion: '9.80.1',
      hardwareVersion: '1.0',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Receiving Zone',
      assignedTo: 'Security',
      lastSeen: '2024-03-17 10:25:45',
      lastActivity: 'Recording',
      uptime: '180d 2h 30m',
      temperature: 38,
      cpuUsage: 45,
      memoryUsage: 234,
      storageUsage: 2048,
      ip: '192.168.1.106',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8'],
      certificates: ['valid'],
      securityLevel: 'high',
      lastFirmwareUpdate: '2024-01-05',
      nextFirmwareUpdate: '2024-04-05',
      resolution: '1080p',
      fps: 30,
      recording: true,
      motionDetected: false,
      tags: ['camera', 'security', 'surveillance'],
      notes: 'Overlooks receiving dock area',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-008',
      deviceId: 'SEN-001',
      name: 'Temperature Sensor - Cold Storage',
      type: 'sensor',
      category: 'environmental',
      model: 'Sensaphone 1400',
      manufacturer: 'Sensaphone',
      serialNumber: 'SEN-2024-001',
      macAddress: '00:1A:2B:3C:4D:65',
      ipAddress: '192.168.1.107',
      firmwareVersion: '1.8.2',
      hardwareVersion: '2.0',
      status: 'online',
      connection: 'wifi',
      wifi: { ssid: 'ColdStorage-Net', signal: 78, band: '2.4GHz' },
      location: 'Warehouse C',
      zone: 'Cold Storage',
      assignedTo: 'Quality Team',
      lastSeen: '2024-03-17 10:24:15',
      lastActivity: 'Reading - 2.5°C',
      uptime: '45d 12h 30m',
      temperature: 22,
      cpuUsage: 5,
      memoryUsage: 23,
      storageUsage: 32,
      ip: '192.168.1.107',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8'],
      certificates: ['valid'],
      securityLevel: 'medium',
      lastFirmwareUpdate: '2024-02-10',
      nextFirmwareUpdate: '2024-05-10',
      sensorType: 'temperature',
      reading: 2.5,
      unit: '°C',
      minReading: 2.0,
      maxReading: 4.0,
      alerts: [],
      batteryLevel: 95,
      tags: ['sensor', 'temperature', 'cold-storage'],
      notes: 'Monitors cold storage temperature',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-009',
      deviceId: 'RBT-001',
      name: 'AGV - Unit 01',
      type: 'robot',
      category: 'automation',
      model: 'Fetch Freight 1500',
      manufacturer: 'Fetch Robotics',
      serialNumber: 'FTC-2024-001',
      macAddress: '00:1A:2B:3C:4D:66',
      ipAddress: '192.168.1.108',
      firmwareVersion: '4.5.2',
      hardwareVersion: '2.1',
      status: 'online',
      connection: 'wifi',
      wifi: { ssid: 'Robot-Net', signal: 88, band: '5GHz' },
      location: 'Warehouse A',
      zone: 'Storage Zone A',
      assignedTo: 'Automation Team',
      lastSeen: '2024-03-17 10:23:00',
      lastActivity: 'Moving to location A-01-01',
      uptime: '15d 8h 20m',
      temperature: 35,
      cpuUsage: 45,
      memoryUsage: 512,
      storageUsage: 1024,
      ip: '192.168.1.108',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8'],
      certificates: ['valid'],
      securityLevel: 'high',
      lastFirmwareUpdate: '2024-03-01',
      nextFirmwareUpdate: '2024-06-01',
      batteryLevel: 67,
      batteryStatus: 'discharging',
      speed: 1.2,
      distanceTraveled: 1250,
      missionsCompleted: 234,
      payload: 450,
      maxPayload: 1500,
      position: { x: 45, y: 23 },
      destination: 'A-01-01',
      tags: ['robot', 'agv', 'automation'],
      notes: 'Automated guided vehicle for material transport',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-010',
      deviceId: 'KIO-001',
      name: 'Kiosk - Receiving',
      type: 'kiosk',
      category: 'interface',
      model: 'Elo 2202L',
      manufacturer: 'Elo Touch',
      serialNumber: 'ELO-2024-001',
      macAddress: '00:1A:2B:3C:4D:67',
      ipAddress: '192.168.1.109',
      firmwareVersion: '1.2.3',
      hardwareVersion: '1.0',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Receiving Zone',
      assignedTo: 'Receiving Team',
      lastSeen: '2024-03-17 10:22:45',
      lastActivity: 'User logged in',
      uptime: '60d 4h 15m',
      temperature: 32,
      cpuUsage: 18,
      memoryUsage: 256,
      storageUsage: 512,
      ip: '192.168.1.109',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8'],
      certificates: ['valid'],
      securityLevel: 'medium',
      lastFirmwareUpdate: '2024-02-05',
      nextFirmwareUpdate: '2024-05-05',
      screenSize: '22"',
      touchType: 'capacitive',
      sessions: 45,
      avgSessionTime: 180,
      tags: ['kiosk', 'interface', 'receiving'],
      notes: 'Touch screen kiosk for receiving operations',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-011',
      deviceId: 'WLD-001',
      name: 'Wearable - Scanner Ring',
      type: 'wearable',
      category: 'scanning',
      model: 'ProGlove MARK 2',
      manufacturer: 'ProGlove',
      serialNumber: 'PGL-2024-001',
      macAddress: '00:1A:2B:3C:4D:68',
      ipAddress: '192.168.1.110',
      firmwareVersion: '3.4.1',
      hardwareVersion: '2.0',
      status: 'online',
      connection: 'bluetooth',
      bluetooth: { paired: true, signal: 75 },
      location: 'Warehouse A',
      zone: 'Picking Zone',
      assignedTo: 'Mike Johnson',
      lastSeen: '2024-03-17 10:26:30',
      lastActivity: 'Scan - SKU-004',
      uptime: '8h 45m',
      temperature: 31,
      cpuUsage: 12,
      memoryUsage: 45,
      storageUsage: 64,
      batteryLevel: 82,
      batteryStatus: 'discharging',
      scanCount: 345,
      scanRate: 38,
      gestures: 23,
      tags: ['wearable', 'scanner', 'ring'],
      notes: 'Worn by pickers for hands-free scanning',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-012',
      deviceId: 'DRN-001',
      name: 'Inventory Drone',
      type: 'drone',
      category: 'automation',
      model: 'Flytbase Inventory Drone',
      manufacturer: 'Flytbase',
      serialNumber: 'FLY-2024-001',
      macAddress: '00:1A:2B:3C:4D:69',
      ipAddress: '192.168.1.111',
      firmwareVersion: '2.1.0',
      hardwareVersion: '1.5',
      status: 'charging',
      connection: 'wifi',
      wifi: { ssid: 'Drone-Net', signal: 95, band: '5GHz' },
      location: 'Warehouse B',
      zone: 'Charging Station',
      assignedTo: 'Inventory Team',
      lastSeen: '2024-03-17 10:20:00',
      lastActivity: 'Inventory scan complete',
      uptime: '2h 15m',
      temperature: 28,
      cpuUsage: 5,
      memoryUsage: 128,
      storageUsage: 256,
      batteryLevel: 95,
      batteryStatus: 'charging',
      flightTime: 45,
      distanceFlown: 3500,
      scansCompleted: 12,
      accuracy: 99.2,
      position: { x: 0, y: 0 },
      tags: ['drone', 'inventory', 'automation'],
      notes: 'Automated inventory scanning drone',
      history: [
        { timestamp: '2024-03-17 09:45', action: 'Returned', user: 'System' },
        { timestamp: '2024-03-17 08:00', action: 'Launched', user: 'System' },
      ],
    },
    {
      id: 'DEV-013',
      deviceId: 'GWT-001',
      name: 'Smart Watch - Supervisor',
      type: 'smartwatch',
      category: 'wearable',
      model: 'Apple Watch Ultra',
      manufacturer: 'Apple',
      serialNumber: 'APL-2024-001',
      macAddress: '00:1A:2B:3C:4D:70',
      ipAddress: '192.168.1.112',
      firmwareVersion: '10.3',
      hardwareVersion: '2.0',
      status: 'online',
      connection: 'bluetooth',
      bluetooth: { paired: true, signal: 85 },
      location: 'Warehouse A',
      zone: 'Mobile',
      assignedTo: 'Jane Smith',
      lastSeen: '2024-03-17 10:25:00',
      lastActivity: 'Alert acknowledged',
      uptime: '12h 30m',
      temperature: 30,
      cpuUsage: 15,
      memoryUsage: 67,
      storageUsage: 128,
      batteryLevel: 73,
      batteryStatus: 'discharging',
      heartRate: 72,
      steps: 4567,
      notifications: 23,
      apps: ['Inventory', 'Alerts', 'Messages'],
      tags: ['watch', 'wearable', 'supervisor'],
      notes: 'Worn by shift supervisor for alerts',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'DEV-014',
      deviceId: 'THS-001',
      name: 'Temperature/Humidity Sensor',
      type: 'sensor',
      category: 'environmental',
      model: 'Sensirion SHT30',
      manufacturer: 'Sensirion',
      serialNumber: 'SEN-2024-002',
      macAddress: '00:1A:2B:3C:4D:71',
      ipAddress: '192.168.1.113',
      firmwareVersion: '1.2.1',
      hardwareVersion: '1.0',
      status: 'warning',
      connection: 'wifi',
      wifi: { ssid: 'Warehouse-Net', signal: 65, band: '2.4GHz' },
      location: 'Warehouse A',
      zone: 'Storage Zone B',
      assignedTo: 'Facilities',
      lastSeen: '2024-03-17 10:23:30',
      lastActivity: 'Reading - 28°C, 75%',
      uptime: '120d 8h 15m',
      temperature: 28,
      cpuUsage: 4,
      memoryUsage: 18,
      storageUsage: 32,
      batteryLevel: 12,
      batteryStatus: 'low',
      sensorType: 'temperature_humidity',
      temperatureReading: 28.5,
      humidityReading: 75,
      minTemp: 18,
      maxTemp: 26,
      minHumidity: 40,
      maxHumidity: 60,
      alerts: ['High humidity', 'Low battery'],
      tags: ['sensor', 'temperature', 'humidity'],
      notes: 'Battery low - needs replacement',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Warning', user: 'System', reason: 'High humidity' },
      ],
    },
    {
      id: 'DEV-015',
      deviceId: 'RDR-002',
      name: 'RFID Reader - Door 3',
      type: 'rfid_reader',
      category: 'rfid',
      model: 'Impinj R700',
      manufacturer: 'Impinj',
      serialNumber: 'IMP-2024-002',
      macAddress: '00:1A:2B:3C:4D:72',
      ipAddress: '192.168.1.114',
      firmwareVersion: '5.2.0',
      hardwareVersion: '2.0',
      status: 'offline',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Exit Door 3',
      assignedTo: 'Security',
      lastSeen: '2024-03-16 23:45:00',
      lastActivity: 'Last read - 12 tags',
      uptime: '0s',
      temperature: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      storageUsage: 0,
      ip: '192.168.1.114',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8'],
      certificates: ['expired'],
      securityLevel: 'low',
      lastFirmwareUpdate: '2023-12-01',
      nextFirmwareUpdate: '2024-03-01',
      readCount: 234567,
      lastReadTags: ['RFID-001', 'RFID-002', 'RFID-003'],
      tags: ['rfid', 'security', 'offline'],
      notes: 'Network connection lost',
      history: [
        { timestamp: '2024-03-16 23:45', action: 'Offline', user: 'System', reason: 'Network timeout' },
      ],
    },
  ];

  // Device types
  const deviceTypes = [
    { id: 'barcode_scanner', name: 'Barcode Scanner', icon: Scan, color: 'bg-blue-100 text-blue-700' },
    { id: 'printer', name: 'Printer', icon: Printer, color: 'bg-green-100 text-green-700' },
    { id: 'rfid_reader', name: 'RFID Reader', icon: Radio, color: 'bg-purple-100 text-purple-700' },
    { id: 'scale', name: 'Scale', icon: Scale, color: 'bg-orange-100 text-orange-700' },
    { id: 'gateway', name: 'Gateway', icon: Router, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'battery_station', name: 'Battery Station', icon: Battery, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'camera', name: 'Camera', icon: Camera, color: 'bg-pink-100 text-pink-700' },
    { id: 'sensor', name: 'Sensor', icon: Thermometer, color: 'bg-teal-100 text-teal-700' },
    { id: 'robot', name: 'Robot', icon: Bot, color: 'bg-gray-100 text-gray-700' },
    { id: 'kiosk', name: 'Kiosk', icon: Monitor, color: 'bg-cyan-100 text-cyan-700' },
    { id: 'wearable', name: 'Wearable', icon: Watch, color: 'bg-amber-100 text-amber-700' },
    { id: 'drone', name: 'Drone', icon: Drone, color: 'bg-violet-100 text-violet-700' },
    { id: 'smartwatch', name: 'Smart Watch', icon: Smartphone, color: 'bg-lime-100 text-lime-700' },
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', count: 10 },
    { id: 'wh-b', name: 'Warehouse B', count: 2 },
    { id: 'wh-c', name: 'Warehouse C', count: 2 },
    { id: 'store-b', name: 'Store B', count: 1 },
  ];

  // Manufacturers
  const manufacturers = [
    'Zebra Technologies',
    'Impinj',
    'Cisco',
    'Mettler Toledo',
    'PowerSafe',
    'Axis Communications',
    'Sensaphone',
    'Fetch Robotics',
    'Elo Touch',
    'ProGlove',
    'Flytbase',
    'Apple',
    'Sensirion',
  ];

  // Status configuration
  const statusConfig = {
    online: { label: 'Online', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    offline: { label: 'Offline', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    warning: { label: 'Warning', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    error: { label: 'Error', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    charging: { label: 'Charging', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: BatteryCharging },
    maintenance: { label: 'Maintenance', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Wrench },
  };

  const connectionConfig = {
    wifi: { label: 'WiFi', icon: Wifi, color: 'bg-blue-100 text-blue-700' },
    ethernet: { label: 'Ethernet', icon: EthernetPort, color: 'bg-green-100 text-green-700' },
    bluetooth: { label: 'Bluetooth', icon: Bluetooth, color: 'bg-purple-100 text-purple-700' },
    cellular: { label: 'Cellular', icon: Signal, color: 'bg-orange-100 text-orange-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getDeviceTypeColor = (type) => {
    const found = deviceTypes.find(t => t.id === type);
    return found?.color || 'bg-gray-100 text-gray-700';
  };

  const getDeviceTypeIcon = (type) => {
    const found = deviceTypes.find(t => t.id === type);
    const Icon = found?.icon || Cpu;
    return Icon;
  };

  const getConnectionIcon = (connection) => {
    const config = connectionConfig[connection];
    const Icon = config?.icon || Wifi;
    return Icon;
  };

  const filteredDevices = devices.filter(device => {
    const matchesType = selectedType === 'all' || device.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || device.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || device.location === selectedLocation;
    const matchesManufacturer = selectedManufacturer === 'all' || device.manufacturer === selectedManufacturer;
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.ipAddress?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesLocation && matchesManufacturer && matchesSearch;
  });

  const stats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    warning: devices.filter(d => d.status === 'warning').length,
    error: devices.filter(d => d.status === 'error').length,
    charging: devices.filter(d => d.status === 'charging').length,
    maintenance: devices.filter(d => d.status === 'maintenance').length,
    batteryLow: devices.filter(d => d.batteryLevel && d.batteryLevel < 20).length,
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Connected Devices</h1>
            <p className="text-black/50 mt-1">Monitor and manage IoT devices, sensors, and equipment</p>
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
              onClick={() => setShowNetworkDialog(true)}
            >
              <Network size={16} />
              Network Map
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowScanDialog(true)}
            >
              <Scan size={16} />
              Discover
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Add Device
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-8 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Devices</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Radio size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Online</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.online}</p>
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
                  <p className="text-xs text-black/50">Error</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.error}</p>
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
                  <p className="text-xs text-black/50">Maintenance</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.maintenance}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Wrench size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Low Battery</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.batteryLow}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <BatteryWarning size={18} className="text-red-600" />
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
              placeholder="Search by name, ID, model, serial, or IP..."
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
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="charging">Charging</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
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

          <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Manufacturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Manufacturers</SelectItem>
              {manufacturers.map(mfg => (
                <SelectItem key={mfg} value={mfg}>{mfg}</SelectItem>
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
            const TypeIcon = getDeviceTypeIcon(device.type);
            const ConnectionIcon = getConnectionIcon(device.connection);
            
            return (
              <Card key={device.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={cn("p-4 rounded-t-lg border-b border-[#F5EEE9]", getDeviceTypeColor(device.type))}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/30 rounded-lg backdrop-blur-sm">
                          <TypeIcon size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs border-0", getStatusColor(device.status))}>
                              <StatusIcon className="mr-1" size={10} />
                              {device.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-white/30 text-white bg-white/20">
                              {device.type.replace('_', ' ')}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-white">{device.name}</h3>
                          <p className="text-xs text-white/80 mt-0.5">{device.deviceId}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
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
                          {device.status === 'online' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedDevice(device);
                              setShowRebootDialog(true);
                            }}>
                              <Power className="mr-2 h-4 w-4" />
                              Reboot
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => {
                            setSelectedDevice(device);
                            setShowFirmwareDialog(true);
                          }}>
                            <Settings2 className="mr-2 h-4 w-4" />
                            Firmware Update
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedDevice(device);
                            setShowConfigDialog(true);
                          }}>
                            <Sliders className="mr-2 h-4 w-4" />
                            Configure
                          </DropdownMenuItem>
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
                    {/* Model & Manufacturer */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-black/50">{device.model}</span>
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                        {device.manufacturer}
                      </Badge>
                    </div>

                    {/* Connection & Location */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <ConnectionIcon size={12} className="text-blue-600" />
                        <span className="text-xs">{device.connection}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-red-600" />
                        <span className="text-xs">{device.zone || device.location}</span>
                      </div>
                    </div>

                    {/* IP/MAC */}
                    <div className="mb-2 p-2 bg-[#F5EEE9]/50 rounded-lg">
                      <p className="text-[10px] text-black/50">IP Address</p>
                      <p className="text-xs font-mono font-medium">{device.ipAddress || 'N/A'}</p>
                      <p className="text-[8px] text-black/50 mt-1">MAC: {device.macAddress}</p>
                    </div>

                    {/* Battery & Signal (for applicable devices) */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {device.batteryLevel !== undefined && (
                        <div className="flex items-center gap-1">
                          {device.batteryLevel > 50 ? (
                            <BatteryFull size={14} className="text-green-600" />
                          ) : device.batteryLevel > 20 ? (
                            <BatteryMedium size={14} className="text-yellow-600" />
                          ) : (
                            <BatteryWarning size={14} className="text-red-600" />
                          )}
                          <span className="text-xs">{device.batteryLevel}%</span>
                          <Badge className="text-[8px] h-4 bg-blue-100 text-blue-700">
                            {device.batteryStatus}
                          </Badge>
                        </div>
                      )}
                      {device.wifi && (
                        <div className="flex items-center gap-1">
                          <Wifi size={14} className="text-blue-600" />
                          <span className="text-xs">{device.wifi.signal}%</span>
                        </div>
                      )}
                    </div>

                    {/* Last Activity */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
                      <span>Last: {device.lastActivity}</span>
                      <span>{device.lastSeen.split(' ')[1]}</span>
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
                  <TableHead className="text-black/50">Connection</TableHead>
                  <TableHead className="text-black/50">IP Address</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50">Battery</TableHead>
                  <TableHead className="text-black/50">Last Seen</TableHead>
                  <TableHead className="text-black/50">Uptime</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => {
                  const TypeIcon = getDeviceTypeIcon(device.type);
                  
                  return (
                    <TableRow key={device.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn("p-1 rounded", getDeviceTypeColor(device.type))}>
                            <TypeIcon size={14} />
                          </div>
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
                        <div className="flex items-center gap-1">
                          {device.connection === 'wifi' && <Wifi size={12} className="text-blue-600" />}
                          {device.connection === 'ethernet' && <EthernetPort size={12} className="text-green-600" />}
                          {device.connection === 'bluetooth' && <Bluetooth size={12} className="text-purple-600" />}
                          <span className="text-xs">{device.connection}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{device.ipAddress || '—'}</TableCell>
                      <TableCell>{device.zone || device.location}</TableCell>
                      <TableCell>
                        {device.batteryLevel !== undefined ? (
                          <div className="flex items-center gap-1">
                            {device.batteryLevel > 50 ? (
                              <BatteryFull size={14} className="text-green-600" />
                            ) : device.batteryLevel > 20 ? (
                              <BatteryMedium size={14} className="text-yellow-600" />
                            ) : (
                              <BatteryWarning size={14} className="text-red-600" />
                            )}
                            <span className="text-xs">{device.batteryLevel}%</span>
                          </div>
                        ) : (
                          '—'
                        )}
                      </TableCell>
                      <TableCell className="text-xs">{device.lastSeen}</TableCell>
                      <TableCell className="text-xs">{device.uptime}</TableCell>
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
                  );
                })}
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
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Device Details</DialogTitle>
          </DialogHeader>

          {selectedDevice && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="network">Network</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", getDeviceTypeColor(selectedDevice.type))}>
                      {(() => {
                        const Icon = getDeviceTypeIcon(selectedDevice.type);
                        return <Icon size={24} className="text-white" />;
                      })()}
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
                      <p className="text-xs text-black/50">Serial Number</p>
                      <p className="text-sm font-mono">{selectedDevice.serialNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-xs border-0", getStatusColor(selectedDevice.status))}>
                      {selectedDevice.status}
                    </Badge>
                    <Badge className={cn("text-xs", getDeviceTypeColor(selectedDevice.type))}>
                      {selectedDevice.type.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-3 bg-[#F5EEE9] rounded-lg">
                    <div>
                      <p className="text-xs text-black/50">Location</p>
                      <p className="text-sm font-medium">{selectedDevice.location} • {selectedDevice.zone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Assigned To</p>
                      <p className="text-sm font-medium">{selectedDevice.assignedTo || 'Unassigned'}</p>
                    </div>
                  </div>

                  {selectedDevice.batteryLevel !== undefined && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-black/50">Battery Level</p>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-[#F5EEE9] rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
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
                      {selectedDevice.wifi && (
                        <div>
                          <p className="text-xs text-black/50">WiFi Signal</p>
                          <div className="flex items-center gap-2">
                            <Wifi size={16} className="text-blue-600" />
                            <span className="text-sm">{selectedDevice.wifi.signal}%</span>
                            <span className="text-xs text-black/50">{selectedDevice.wifi.band}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50">Firmware</p>
                    <p className="text-sm">v{selectedDevice.firmwareVersion} • Last: {selectedDevice.lastFirmwareUpdate}</p>
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Uptime</p>
                    <p className="text-sm">{selectedDevice.uptime}</p>
                  </div>

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

                  {selectedDevice.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedDevice.notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="network" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">IP Address</p>
                      <p className="text-sm font-mono">{selectedDevice.ipAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">MAC Address</p>
                      <p className="text-sm font-mono">{selectedDevice.macAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Gateway</p>
                      <p className="text-sm font-mono">{selectedDevice.gateway}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">DNS</p>
                      <p className="text-sm font-mono">{selectedDevice.dns?.join(', ')}</p>
                    </div>
                  </div>

                  {selectedDevice.wifi && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs font-medium text-blue-700">WiFi Details</p>
                      <p className="text-sm mt-1">SSID: {selectedDevice.wifi.ssid}</p>
                      <p className="text-sm">Signal: {selectedDevice.wifi.signal}%</p>
                      <p className="text-sm">Band: {selectedDevice.wifi.band}</p>
                    </div>
                  )}

                  {selectedDevice.bluetooth && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs font-medium text-purple-700">Bluetooth Details</p>
                      <p className="text-sm mt-1">Paired: {selectedDevice.bluetooth.paired ? 'Yes' : 'No'}</p>
                      <p className="text-sm">Signal: {selectedDevice.bluetooth.signal}%</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50">Certificates</p>
                    <p className="text-sm">{selectedDevice.certificates?.join(', ')}</p>
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Security Level</p>
                    <Badge className={cn(
                      "text-xs",
                      selectedDevice.securityLevel === 'high' && 'bg-green-100 text-green-700',
                      selectedDevice.securityLevel === 'medium' && 'bg-yellow-100 text-yellow-700',
                      selectedDevice.securityLevel === 'low' && 'bg-red-100 text-red-700',
                    )}>
                      {selectedDevice.securityLevel}
                    </Badge>
                  </div>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">CPU Usage</p>
                        <p className="text-lg font-bold">{selectedDevice.cpuUsage}%</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Memory</p>
                        <p className="text-lg font-bold">{selectedDevice.memoryUsage} MB</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Storage</p>
                        <p className="text-lg font-bold">{selectedDevice.storageUsage} MB</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Temperature</p>
                        <p className="text-lg font-bold">{selectedDevice.temperature}°C</p>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedDevice.type === 'barcode_scanner' && (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-2 text-center">
                            <p className="text-xs text-black/50">Scan Count</p>
                            <p className="text-base font-bold">{selectedDevice.scanCount}</p>
                          </CardContent>
                        </Card>
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-2 text-center">
                            <p className="text-xs text-black/50">Scan Rate</p>
                            <p className="text-base font-bold">{selectedDevice.scanRate}/min</p>
                          </CardContent>
                        </Card>
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-2 text-center">
                            <p className="text-xs text-black/50">Error Rate</p>
                            <p className="text-base font-bold text-red-600">{selectedDevice.errorRate}%</p>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}

                  {selectedDevice.type === 'printer' && (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-2 text-center">
                            <p className="text-xs text-black/50">Print Count</p>
                            <p className="text-base font-bold">{selectedDevice.printCount}</p>
                          </CardContent>
                        </Card>
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-2 text-center">
                            <p className="text-xs text-black/50">Media Remaining</p>
                            <p className="text-base font-bold">{selectedDevice.mediaRemaining}%</p>
                          </CardContent>
                        </Card>
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-2 text-center">
                            <p className="text-xs text-black/50">Ribbon</p>
                            <p className="text-base font-bold">{selectedDevice.ribbonRemaining}%</p>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}

                  {selectedDevice.type === 'rfid_reader' && (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-2 text-center">
                            <p className="text-xs text-black/50">Read Count</p>
                            <p className="text-base font-bold">{selectedDevice.readCount}</p>
                          </CardContent>
                        </Card>
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-2 text-center">
                            <p className="text-xs text-black/50">Read Rate</p>
                            <p className="text-base font-bold">{selectedDevice.readRate}/min</p>
                          </CardContent>
                        </Card>
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-2 text-center">
                            <p className="text-xs text-black/50">Tags</p>
                            <p className="text-base font-bold">{selectedDevice.tagCount}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-2">Antennas</p>
                        <div className="flex gap-2">
                          {selectedDevice.antennaStatus?.map((status, i) => (
                            <Badge key={i} className={cn(
                              "text-xs",
                              status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            )}>
                              Antenna {i + 1}: {status}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedDevice.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-0.5">
                            {item.action === 'Online' && <CheckCircle size={12} className="text-green-600" />}
                            {item.action === 'Offline' && <Ban size={12} className="text-red-600" />}
                            {item.action === 'Warning' && <AlertTriangle size={12} className="text-yellow-600" />}
                            {item.action === 'Battery Charged' && <BatteryCharging size={12} className="text-blue-600" />}
                            {item.action === 'Returned' && <ArrowLeft size={12} className="text-purple-600" />}
                            {item.action === 'Launched' && <ArrowRight size={12} className="text-blue-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.timestamp}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
                            {item.reason && <p className="text-[10px] text-black/70">Reason: {item.reason}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedDevice?.status === 'online' && (
              <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowRebootDialog(true);
              }}>
                <Power className="mr-2 h-4 w-4" />
                Reboot
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reboot Dialog */}
      <Dialog open={showRebootDialog} onOpenChange={setShowRebootDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Reboot Device</DialogTitle>
            <DialogDescription>
              Confirm reboot of {selectedDevice?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Power className="text-orange-600 mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-medium text-orange-700">Warning</p>
                  <p className="text-xs text-orange-600/70">
                    Rebooting will temporarily disconnect the device. Any ongoing operations will be interrupted.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedDevice?.name}</p>
              <p className="text-xs text-black/50">Status: {selectedDevice?.status}</p>
              <p className="text-xs text-black/50">Uptime: {selectedDevice?.uptime}</p>
            </div>

            <div className="space-y-2">
              <Label>Reason (optional)</Label>
              <Textarea placeholder="Enter reason for reboot" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRebootDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Reboot Device
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Firmware Update Dialog */}
      <Dialog open={showFirmwareDialog} onOpenChange={setShowFirmwareDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Firmware Update</DialogTitle>
            <DialogDescription>
              Update firmware for {selectedDevice?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedDevice?.name}</p>
              <p className="text-xs text-black/50">Current Version: v{selectedDevice?.firmwareVersion}</p>
              <p className="text-xs text-black/50">Hardware: {selectedDevice?.hardwareVersion}</p>
            </div>

            <div className="space-y-2">
              <Label>Available Version</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2.2.0">v2.2.0 (latest)</SelectItem>
                  <SelectItem value="2.1.5">v2.1.5 (current)</SelectItem>
                  <SelectItem value="2.1.0">v2.1.0</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Release Notes</Label>
              <div className="p-3 bg-blue-50 rounded-lg text-xs">
                <p className="font-medium text-blue-700">v2.2.0</p>
                <ul className="list-disc list-inside text-blue-600 mt-1">
                  <li>Security enhancements</li>
                  <li>Bug fixes</li>
                  <li>Performance improvements</li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-xs text-yellow-700">
                Device will reboot after update. Estimated time: 2-3 minutes.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFirmwareDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Update Firmware
            </Button>
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
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Add Device</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowScanDialog(true)}
              >
                <Scan size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Discover Devices</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowNetworkDialog(true)}
              >
                <Network size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Network Map</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ConnectedDevicesPage;