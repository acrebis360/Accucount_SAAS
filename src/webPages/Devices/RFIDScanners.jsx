// app/dashboard/rfid-scanners/page.js
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
  Copy,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Download,
  Upload,
  Grid,
  List,
  Ban,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  MapPin,
  Tag,
  Wrench,
  Tool,
  Settings2,
  Sliders,
  Activity,
  Scan,
  ToggleLeft as ToggleLeftIcon,
  ToggleRight as ToggleRightIcon,
  ArrowLeftRight as ArrowLeftRightIcon,
  ArrowUpDown as ArrowUpDownIcon,
  MoveHorizontal as MoveHorizontalIcon,
  MoveVertical as MoveVerticalIcon,
  GripVertical as GripVerticalIcon,
  GripHorizontal as GripHorizontalIcon,
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
  Monitor,
  Smartphone,
  Printer as PrinterDevice,
  Camera as CameraDevice,
  Antenna,
  RadioTower,
  Database as DatabaseIcon,
  Wifi,
  Bluetooth,
  Usb,
  BatteryCharging,
  BatteryWarning,
  BatteryMedium,
  BatteryFull,
  PowerIcon as PowerIconCustom,
  PowerOffIcon as PowerOffIconCustom,
  UsbIcon as UsbIconCustom,
  PrinterIcon as PrinterDeviceIcon,
  SwitchIcon as SwitchIconCustom,
  DatabaseIcon as DatabaseIconCustom,
  GaugeIcon as GaugeIconCustom,
  ActivityIcon as ActivityIconCustom,
  ZapIcon as ZapIconCustom,
  NavigationIcon as NavigationIconCustom2,
  MapPinIcon as MapPinIconCustom2,
  GaugeIcon as GaugeIconCustom2,
  GaugeCircleIcon as GaugeCircleIconCustom,
  EthernetPort,
  Waypoints,
  Watch,
  Power,
 
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

const RFIDScannersPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedScanner, setSelectedScanner] = useState(null);
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
  const [showCalibrationDialog, setShowCalibrationDialog] = useState(false);
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
  const [showAntennaDialog, setShowAntennaDialog] = useState(false);
  const [showTagDialog, setShowTagDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample RFID scanner data
  const scanners = [
    {
      id: 'RFID-001',
      scannerId: 'RDR-001',
      name: 'Fixed RFID Gate - Shipping',
      type: 'fixed_gate',
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
      powerOutput: 30,
      frequency: '865-868 MHz',
      protocol: 'EPC Gen2',
      antennas: [
        { id: 1, name: 'Antenna 1', status: 'online', reads: 345678, lastRead: '2024-03-17 10:24:30' },
        { id: 2, name: 'Antenna 2', status: 'online', reads: 298765, lastRead: '2024-03-17 10:24:28' },
        { id: 3, name: 'Antenna 3', status: 'online', reads: 312456, lastRead: '2024-03-17 10:24:29' },
        { id: 4, name: 'Antenna 4', status: 'online', reads: 287654, lastRead: '2024-03-17 10:24:27' },
      ],
      readRate: 150,
      tagCount: 45,
      totalReads: 1245678,
      uniqueTags: 8765,
      readRange: 8,
      readZone: 'Shipping Door 1',
      readsPerSecond: 150,
      avgResponseTime: 45,
      errorRate: 0.05,
      duplicateRate: 0.02,
      missedTags: 12,
      inventoryCompleteness: 99.8,
      lastInventory: '2024-03-17 10:00',
      tags: ['fixed', 'gate', 'shipping'],
      notes: 'Main shipping gate reader',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
        { timestamp: '2024-03-16 23:00', action: 'Inventory Complete', user: 'System', tags: 8765 },
      ],
    },
    {
      id: 'RFID-002',
      scannerId: 'RDR-002',
      name: 'Handheld RFID Scanner - Picking',
      type: 'handheld',
      model: 'Zebra RFD8500',
      manufacturer: 'Zebra Technologies',
      serialNumber: 'ZBR-2024-001',
      macAddress: '00:1A:2B:3C:4D:61',
      ipAddress: '192.168.1.104',
      firmwareVersion: '3.2.1',
      hardwareVersion: '2.0',
      status: 'online',
      connection: 'bluetooth',
      bluetooth: { paired: true, signal: 85, device: 'TC52' },
      location: 'Warehouse A',
      zone: 'Picking Zone',
      assignedTo: 'Mike Johnson',
      lastSeen: '2024-03-17 10:25:15',
      lastActivity: 'Read - SKU-001',
      uptime: '8h 23m',
      batteryLevel: 78,
      batteryStatus: 'discharging',
      temperature: 32,
      cpuUsage: 23,
      memoryUsage: 156,
      storageUsage: 256,
      frequency: '865-868 MHz',
      protocol: 'EPC Gen2',
      readRate: 45,
      tagCount: 1,
      totalReads: 34567,
      uniqueTags: 2345,
      readRange: 3,
      readsPerSecond: 45,
      avgResponseTime: 120,
      errorRate: 0.2,
      duplicateRate: 0.05,
      missedTags: 3,
      lastInventory: '2024-03-17 09:30',
      tags: ['handheld', 'mobile', 'picking'],
      notes: 'Used by pickers for location verification',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
        { timestamp: '2024-03-16 23:00', action: 'Battery Charged', user: 'System' },
      ],
    },
    {
      id: 'RFID-003',
      scannerId: 'RDR-003',
      name: 'Fixed RFID Reader - Receiving',
      type: 'fixed',
      model: 'Impinj R700',
      manufacturer: 'Impinj',
      serialNumber: 'IMP-2024-002',
      macAddress: '00:1A:2B:3C:4D:62',
      ipAddress: '192.168.1.105',
      firmwareVersion: '5.2.0',
      hardwareVersion: '2.0',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Receiving Zone',
      assignedTo: 'Dock 1',
      lastSeen: '2024-03-17 10:23:45',
      lastActivity: 'Read - 23 tags',
      uptime: '45d 12h 30m',
      temperature: 38,
      cpuUsage: 32,
      memoryUsage: 189,
      storageUsage: 256,
      powerOutput: 28,
      frequency: '902-928 MHz',
      protocol: 'EPC Gen2',
      antennas: [
        { id: 1, name: 'Antenna 1', status: 'online', reads: 234567, lastRead: '2024-03-17 10:23:45' },
        { id: 2, name: 'Antenna 2', status: 'online', reads: 198765, lastRead: '2024-03-17 10:23:44' },
      ],
      readRate: 85,
      tagCount: 23,
      totalReads: 876543,
      uniqueTags: 4321,
      readRange: 5,
      readZone: 'Receiving Dock 1',
      readsPerSecond: 85,
      avgResponseTime: 65,
      errorRate: 0.08,
      duplicateRate: 0.03,
      missedTags: 5,
      inventoryCompleteness: 99.5,
      lastInventory: '2024-03-17 09:45',
      tags: ['fixed', 'receiving', 'dock'],
      notes: 'Records incoming shipments',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'RFID-004',
      scannerId: 'RDR-004',
      name: 'Portal RFID - Exit Door',
      type: 'portal',
      model: 'Impinj xPortal',
      manufacturer: 'Impinj',
      serialNumber: 'IMP-2024-003',
      macAddress: '00:1A:2B:3C:4D:63',
      ipAddress: '192.168.1.106',
      firmwareVersion: '4.3.1',
      hardwareVersion: '1.5',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Exit Door',
      assignedTo: 'Security',
      lastSeen: '2024-03-17 10:24:00',
      lastActivity: 'Read - 12 tags',
      uptime: '30d 6h 15m',
      temperature: 34,
      cpuUsage: 28,
      memoryUsage: 167,
      storageUsage: 256,
      powerOutput: 32,
      frequency: '865-868 MHz',
      protocol: 'EPC Gen2',
      antennas: [
        { id: 1, name: 'Left Antenna', status: 'online', reads: 156789, lastRead: '2024-03-17 10:24:00' },
        { id: 2, name: 'Right Antenna', status: 'online', reads: 145678, lastRead: '2024-03-17 10:23:59' },
        { id: 3, name: 'Top Antenna', status: 'online', reads: 123456, lastRead: '2024-03-17 10:23:58' },
      ],
      readRate: 95,
      tagCount: 12,
      totalReads: 678901,
      uniqueTags: 2345,
      readRange: 4,
      readZone: 'Exit Portal',
      readsPerSecond: 95,
      avgResponseTime: 55,
      errorRate: 0.03,
      duplicateRate: 0.01,
      missedTags: 2,
      inventoryCompleteness: 99.9,
      lastInventory: '2024-03-17 10:00',
      tags: ['portal', 'security', 'exit'],
      notes: 'Monitors exit for unauthorized items',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'RFID-005',
      scannerId: 'RDR-005',
      name: 'Mobile RFID - Inventory Cart',
      type: 'mobile',
      model: 'Nordic ID Medea',
      manufacturer: 'Nordic ID',
      serialNumber: 'NID-2024-001',
      macAddress: '00:1A:2B:3C:4D:64',
      ipAddress: '192.168.1.107',
      firmwareVersion: '2.4.0',
      hardwareVersion: '1.2',
      status: 'online',
      connection: 'wifi',
      wifi: { ssid: 'Inventory-Net', signal: 78, band: '5GHz' },
      location: 'Warehouse A',
      zone: 'Storage Zone A',
      assignedTo: 'Inventory Team',
      lastSeen: '2024-03-17 10:22:30',
      lastActivity: 'Inventory scan - Aisle 3',
      uptime: '4h 45m',
      batteryLevel: 62,
      batteryStatus: 'discharging',
      temperature: 31,
      cpuUsage: 35,
      memoryUsage: 256,
      storageUsage: 512,
      frequency: '865-868 MHz',
      protocol: 'EPC Gen2',
      readRate: 120,
      tagCount: 45,
      totalReads: 234567,
      uniqueTags: 5678,
      readRange: 6,
      readsPerSecond: 120,
      avgResponseTime: 38,
      errorRate: 0.04,
      duplicateRate: 0.02,
      missedTags: 8,
      inventoryCompleteness: 99.7,
      lastInventory: '2024-03-17 10:00',
      tags: ['mobile', 'inventory', 'cart'],
      notes: 'Used for cycle counting',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'RFID-006',
      scannerId: 'RDR-006',
      name: 'Fixed RFID - Conveyor',
      type: 'fixed',
      model: 'Zebra FX9600',
      manufacturer: 'Zebra Technologies',
      serialNumber: 'ZBR-2024-002',
      macAddress: '00:1A:2B:3C:4D:65',
      ipAddress: '192.168.1.108',
      firmwareVersion: '4.1.3',
      hardwareVersion: '2.1',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Packing Zone',
      assignedTo: 'Conveyor System',
      lastSeen: '2024-03-17 10:24:45',
      lastActivity: 'Read - 8 tags',
      uptime: '120d 4h 20m',
      temperature: 36,
      cpuUsage: 25,
      memoryUsage: 145,
      storageUsage: 256,
      powerOutput: 26,
      frequency: '902-928 MHz',
      protocol: 'EPC Gen2',
      antennas: [
        { id: 1, name: 'Top Antenna', status: 'online', reads: 456789, lastRead: '2024-03-17 10:24:45' },
        { id: 2, name: 'Bottom Antenna', status: 'online', reads: 423456, lastRead: '2024-03-17 10:24:44' },
      ],
      readRate: 60,
      tagCount: 8,
      totalReads: 1123456,
      uniqueTags: 6789,
      readRange: 2,
      readZone: 'Conveyor Belt',
      readsPerSecond: 60,
      avgResponseTime: 42,
      errorRate: 0.02,
      duplicateRate: 0.01,
      missedTags: 1,
      inventoryCompleteness: 99.9,
      lastInventory: '2024-03-17 10:15',
      tags: ['fixed', 'conveyor', 'automated'],
      notes: 'Reads tags on moving packages',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'RFID-007',
      scannerId: 'RDR-007',
      name: 'Handheld UHF - Returns',
      type: 'handheld',
      model: 'Zebra RFD40',
      manufacturer: 'Zebra Technologies',
      serialNumber: 'ZBR-2024-003',
      macAddress: '00:1A:2B:3C:4D:66',
      ipAddress: '192.168.1.109',
      firmwareVersion: '2.8.1',
      hardwareVersion: '1.0',
      status: 'warning',
      connection: 'bluetooth',
      bluetooth: { paired: true, signal: 65, device: 'TC57' },
      location: 'Warehouse A',
      zone: 'Returns Zone',
      assignedTo: 'Tom Brown',
      lastSeen: '2024-03-17 10:20:15',
      lastActivity: 'Read - 3 tags',
      uptime: '6h 30m',
      batteryLevel: 23,
      batteryStatus: 'low',
      temperature: 34,
      cpuUsage: 28,
      memoryUsage: 178,
      storageUsage: 256,
      frequency: '865-868 MHz',
      protocol: 'EPC Gen2',
      readRate: 35,
      tagCount: 3,
      totalReads: 23456,
      uniqueTags: 1234,
      readRange: 2.5,
      readsPerSecond: 35,
      avgResponseTime: 145,
      errorRate: 0.3,
      duplicateRate: 0.08,
      missedTags: 5,
      lastInventory: '2024-03-17 09:15',
      tags: ['handheld', 'returns', 'warning'],
      notes: 'Battery low - needs charging',
      alerts: ['Low battery'],
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
        { timestamp: '2024-03-17 09:30', action: 'Warning', user: 'System', reason: 'Low battery' },
      ],
    },
    {
      id: 'RFID-008',
      scannerId: 'RDR-008',
      name: 'Fixed RFID - Cold Storage',
      type: 'fixed',
      model: 'Impinj R420',
      manufacturer: 'Impinj',
      serialNumber: 'IMP-2024-004',
      macAddress: '00:1A:2B:3C:4D:67',
      ipAddress: '192.168.1.110',
      firmwareVersion: '4.8.2',
      hardwareVersion: '2.0',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse C',
      zone: 'Cold Storage',
      assignedTo: 'Cold Chain',
      lastSeen: '2024-03-17 10:23:00',
      lastActivity: 'Read - 15 tags',
      uptime: '90d 2h 15m',
      temperature: -5,
      cpuUsage: 30,
      memoryUsage: 198,
      storageUsage: 256,
      powerOutput: 28,
      frequency: '865-868 MHz',
      protocol: 'EPC Gen2',
      antennas: [
        { id: 1, name: 'Antenna 1', status: 'online', reads: 345678, lastRead: '2024-03-17 10:23:00' },
        { id: 2, name: 'Antenna 2', status: 'online', reads: 312345, lastRead: '2024-03-17 10:22:59' },
      ],
      readRate: 70,
      tagCount: 15,
      totalReads: 789012,
      uniqueTags: 3456,
      readRange: 4,
      readZone: 'Cold Storage Door',
      readsPerSecond: 70,
      avgResponseTime: 52,
      errorRate: 0.06,
      duplicateRate: 0.02,
      missedTags: 3,
      inventoryCompleteness: 99.6,
      lastInventory: '2024-03-17 09:30',
      temperatureRating: '-20 to +50°C',
      tags: ['fixed', 'cold-storage', 'temperature-rated'],
      notes: 'Rated for cold storage environments',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'RFID-009',
      scannerId: 'RDR-009',
      name: 'RFID Tunnel - Packing',
      type: 'tunnel',
      model: 'Nordic ID Sandus',
      manufacturer: 'Nordic ID',
      serialNumber: 'NID-2024-002',
      macAddress: '00:1A:2B:3C:4D:68',
      ipAddress: '192.168.1.111',
      firmwareVersion: '3.2.0',
      hardwareVersion: '1.8',
      status: 'online',
      connection: 'ethernet',
      location: 'Warehouse A',
      zone: 'Packing Zone',
      assignedTo: 'Packing Line 1',
      lastSeen: '2024-03-17 10:25:30',
      lastActivity: 'Read - 24 tags',
      uptime: '60d 8h 45m',
      temperature: 33,
      cpuUsage: 42,
      memoryUsage: 278,
      storageUsage: 512,
      powerOutput: 34,
      frequency: '865-868 MHz',
      protocol: 'EPC Gen2',
      antennas: [
        { id: 1, name: 'Top Array', status: 'online', reads: 567890, lastRead: '2024-03-17 10:25:30' },
        { id: 2, name: 'Bottom Array', status: 'online', reads: 523456, lastRead: '2024-03-17 10:25:29' },
        { id: 3, name: 'Left Array', status: 'online', reads: 498765, lastRead: '2024-03-17 10:25:28' },
        { id: 4, name: 'Right Array', status: 'online', reads: 512345, lastRead: '2024-03-17 10:25:27' },
      ],
      readRate: 180,
      tagCount: 24,
      totalReads: 2345678,
      uniqueTags: 9876,
      readRange: 2.5,
      readZone: 'Packing Tunnel',
      readsPerSecond: 180,
      avgResponseTime: 28,
      errorRate: 0.01,
      duplicateRate: 0.005,
      missedTags: 0,
      inventoryCompleteness: 100,
      lastInventory: '2024-03-17 10:20',
      tags: ['tunnel', 'packing', 'high-speed'],
      notes: 'High-speed tunnel for packed orders',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'RFID-010',
      scannerId: 'RDR-010',
      name: 'Wearable RFID Ring',
      type: 'wearable',
      model: 'ProGlove RFID Reader',
      manufacturer: 'ProGlove',
      serialNumber: 'PGL-2024-001',
      macAddress: '00:1A:2B:3C:4D:69',
      ipAddress: '192.168.1.112',
      firmwareVersion: '2.1.5',
      hardwareVersion: '1.2',
      status: 'online',
      connection: 'bluetooth',
      bluetooth: { paired: true, signal: 82, device: 'ProGlove Display' },
      location: 'Warehouse A',
      zone: 'Picking Zone',
      assignedTo: 'Jane Smith',
      lastSeen: '2024-03-17 10:24:15',
      lastActivity: 'Read - SKU-002',
      uptime: '7h 15m',
      batteryLevel: 67,
      batteryStatus: 'discharging',
      temperature: 30,
      cpuUsage: 15,
      memoryUsage: 89,
      storageUsage: 128,
      frequency: '865-868 MHz',
      protocol: 'EPC Gen2',
      readRate: 30,
      tagCount: 1,
      totalReads: 12345,
      uniqueTags: 890,
      readRange: 1.5,
      readsPerSecond: 30,
      avgResponseTime: 95,
      errorRate: 0.1,
      duplicateRate: 0.03,
      missedTags: 1,
      lastInventory: '2024-03-17 09:45',
      gestures: 45,
      tags: ['wearable', 'ring', 'hands-free'],
      notes: 'Hands-free RFID scanning',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'RFID-011',
      scannerId: 'RDR-011',
      name: 'Sled RFID - Forklift',
      type: 'mobile',
      model: 'Zebra RFD2000',
      manufacturer: 'Zebra Technologies',
      serialNumber: 'ZBR-2024-004',
      macAddress: '00:1A:2B:3C:4D:70',
      ipAddress: '192.168.1.113',
      firmwareVersion: '3.5.2',
      hardwareVersion: '1.0',
      status: 'offline',
      connection: 'bluetooth',
      bluetooth: { paired: false, signal: 0 },
      location: 'Warehouse A',
      zone: 'Charging Station',
      assignedTo: 'Forklift 3',
      lastSeen: '2024-03-16 23:30:00',
      lastActivity: 'Disconnected',
      uptime: '0s',
      batteryLevel: 0,
      batteryStatus: 'off',
      temperature: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      storageUsage: 0,
      frequency: '902-928 MHz',
      protocol: 'EPC Gen2',
      readRate: 0,
      tagCount: 0,
      totalReads: 45678,
      uniqueTags: 2345,
      readRange: 3,
      lastInventory: '2024-03-16 22:00',
      tags: ['mobile', 'forklift', 'offline'],
      notes: 'Not responding - needs investigation',
      alerts: ['Offline', 'Connection lost'],
      history: [
        { timestamp: '2024-03-16 23:30', action: 'Offline', user: 'System', reason: 'Connection timeout' },
      ],
    },
    {
      id: 'RFID-012',
      scannerId: 'RDR-012',
      name: 'Desktop RFID - Office',
      type: 'desktop',
      model: 'Zebra RFD8500 Desktop',
      manufacturer: 'Zebra Technologies',
      serialNumber: 'ZBR-2024-005',
      macAddress: '00:1A:2B:3C:4D:71',
      ipAddress: '192.168.1.114',
      firmwareVersion: '2.2.3',
      hardwareVersion: '1.0',
      status: 'online',
      connection: 'usb',
      location: 'Office A',
      zone: 'Inventory Office',
      assignedTo: 'Sarah Wilson',
      lastSeen: '2024-03-17 10:23:45',
      lastActivity: 'Tag programming',
      uptime: '15d 4h 30m',
      temperature: 28,
      cpuUsage: 12,
      memoryUsage: 89,
      storageUsage: 128,
      powerOutput: 20,
      frequency: '865-868 MHz',
      protocol: 'EPC Gen2',
      readRate: 20,
      tagCount: 5,
      totalReads: 3456,
      uniqueTags: 456,
      readRange: 0.5,
      readsPerSecond: 20,
      avgResponseTime: 85,
      errorRate: 0.05,
      duplicateRate: 0.01,
      missedTags: 0,
      tags: ['desktop', 'office', 'programming'],
      notes: 'Used for programming new tags',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
  ];

  // Scanner types
  const scannerTypes = [
    { id: 'fixed_gate', name: 'Fixed Gate', icon: Radio, color: 'bg-blue-100 text-blue-700' },
    { id: 'handheld', name: 'Handheld', icon: Scan, color: 'bg-green-100 text-green-700' },
    { id: 'fixed', name: 'Fixed', icon: Radio, color: 'bg-purple-100 text-purple-700' },
    { id: 'portal', name: 'Portal', icon: RadioTower, color: 'bg-orange-100 text-orange-700' },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'tunnel', name: 'Tunnel', icon: Waypoints, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'wearable', name: 'Wearable', icon: Watch, color: 'bg-pink-100 text-pink-700' },
    { id: 'desktop', name: 'Desktop', icon: Monitor, color: 'bg-cyan-100 text-cyan-700' },
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', count: 9 },
    { id: 'wh-c', name: 'Warehouse C', count: 1 },
    { id: 'office', name: 'Office A', count: 1 },
  ];

  // Manufacturers
  const manufacturers = [
    'Impinj',
    'Zebra Technologies',
    'Nordic ID',
    'ProGlove',
  ];

  // Status configuration
  const statusConfig = {
    online: { label: 'Online', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    offline: { label: 'Offline', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    warning: { label: 'Warning', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    error: { label: 'Error', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    maintenance: { label: 'Maintenance', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Wrench },
  };

  const connectionConfig = {
    ethernet: { label: 'Ethernet', icon: EthernetPort, color: 'bg-green-100 text-green-700' },
    wifi: { label: 'WiFi', icon: Wifi, color: 'bg-blue-100 text-blue-700' },
    bluetooth: { label: 'Bluetooth', icon: Bluetooth, color: 'bg-purple-100 text-purple-700' },
    usb: { label: 'USB', icon: Usb, color: 'bg-orange-100 text-orange-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getScannerTypeColor = (type) => {
    const found = scannerTypes.find(t => t.id === type);
    return found?.color || 'bg-gray-100 text-gray-700';
  };

  const getScannerTypeIcon = (type) => {
    const found = scannerTypes.find(t => t.id === type);
    const Icon = found?.icon || Radio;
    return Icon;
  };

  const getConnectionIcon = (connection) => {
    const config = connectionConfig[connection];
    const Icon = config?.icon || Wifi;
    return Icon;
  };

  const filteredScanners = scanners.filter(scanner => {
    const matchesType = selectedType === 'all' || scanner.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || scanner.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || scanner.location === selectedLocation;
    const matchesManufacturer = selectedManufacturer === 'all' || scanner.manufacturer === selectedManufacturer;
    const matchesSearch = scanner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scanner.scannerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scanner.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scanner.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scanner.ipAddress?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesLocation && matchesManufacturer && matchesSearch;
  });

  const stats = {
    total: scanners.length,
    online: scanners.filter(s => s.status === 'online').length,
    offline: scanners.filter(s => s.status === 'offline').length,
    warning: scanners.filter(s => s.status === 'warning').length,
    error: scanners.filter(s => s.status === 'error').length,
    maintenance: scanners.filter(s => s.status === 'maintenance').length,
    totalReads: scanners.reduce((sum, s) => sum + (s.totalReads || 0), 0),
    totalTags: scanners.reduce((sum, s) => sum + (s.uniqueTags || 0), 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">RFID Scanners</h1>
            <p className="text-black/50 mt-1">Monitor and manage RFID scanning devices</p>
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
              onClick={() => setShowMetricsDialog(true)}
            >
              <Activity size={16} />
              Metrics
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowTagDialog(true)}
            >
              <Tag size={16} />
              Tags
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Add Scanner
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Scanners</p>
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
                  <p className="text-xs text-black/50">Total Reads</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalReads.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Radio size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Unique Tags</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.totalTags.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Tag size={18} className="text-purple-600" />
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
              <SelectValue placeholder="Scanner Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {scannerTypes.map(type => (
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

      {/* Scanners Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredScanners.map((scanner) => {
            const StatusIcon = statusConfig[scanner.status]?.icon || CheckCircle;
            const TypeIcon = getScannerTypeIcon(scanner.type);
            const ConnectionIcon = getConnectionIcon(scanner.connection);
            
            return (
              <Card key={scanner.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={cn("p-4 rounded-t-lg border-b border-[#F5EEE9]", getScannerTypeColor(scanner.type))}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/30 rounded-lg backdrop-blur-sm">
                          <TypeIcon size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs border-0", getStatusColor(scanner.status))}>
                              <StatusIcon className="mr-1" size={10} />
                              {scanner.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-white/30 text-white bg-white/20">
                              {scanner.type.replace('_', ' ')}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-white">{scanner.name}</h3>
                          <p className="text-xs text-white/80 mt-0.5">{scanner.scannerId}</p>
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
                            setSelectedScanner(scanner);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedScanner(scanner);
                            setShowDiagnosticDialog(true);
                          }}>
                            <Activity className="mr-2 h-4 w-4" />
                            Run Diagnostic
                          </DropdownMenuItem>
                          {scanner.type !== 'desktop' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedScanner(scanner);
                              setShowCalibrationDialog(true);
                            }}>
                              <Sliders className="mr-2 h-4 w-4" />
                              Calibrate
                            </DropdownMenuItem>
                          )}
                          {scanner.antennas && scanner.antennas.length > 0 && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedScanner(scanner);
                              setShowAntennaDialog(true);
                            }}>
                              <Antenna className="mr-2 h-4 w-4" />
                              Configure Antennas
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => {
                            setSelectedScanner(scanner);
                            setShowFirmwareDialog(true);
                          }}>
                            <Settings2 className="mr-2 h-4 w-4" />
                            Firmware Update
                          </DropdownMenuItem>
                          {scanner.status === 'online' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedScanner(scanner);
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
                    {/* Model & Manufacturer */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-black/50">{scanner.model}</span>
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                        {scanner.manufacturer}
                      </Badge>
                    </div>

                    {/* Connection & Location */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <ConnectionIcon size={12} className="text-blue-600" />
                        <span className="text-xs">{scanner.connection}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-red-600" />
                        <span className="text-xs">{scanner.zone || scanner.location}</span>
                      </div>
                    </div>

                    {/* IP/MAC */}
                    <div className="mb-2 p-2 bg-[#F5EEE9]/50 rounded-lg">
                      <p className="text-[10px] text-black/50">IP Address</p>
                      <p className="text-xs font-mono font-medium">{scanner.ipAddress || 'N/A'}</p>
                      <p className="text-[8px] text-black/50 mt-1">MAC: {scanner.macAddress}</p>
                    </div>

                    {/* Battery (for mobile devices) */}
                    {scanner.batteryLevel !== undefined && (
                      <div className="flex items-center gap-2 mb-2">
                        {scanner.batteryLevel > 50 ? (
                          <BatteryFull size={14} className="text-green-600" />
                        ) : scanner.batteryLevel > 20 ? (
                          <BatteryMedium size={14} className="text-yellow-600" />
                        ) : (
                          <BatteryWarning size={14} className="text-red-600" />
                        )}
                        <span className="text-xs">{scanner.batteryLevel}%</span>
                        <Badge className="text-[8px] h-4 bg-blue-100 text-blue-700">
                          {scanner.batteryStatus}
                        </Badge>
                      </div>
                    )}

                    {/* Read Performance */}
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Reads/s</p>
                        <p className="text-xs font-bold">{scanner.readsPerSecond}</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Tags</p>
                        <p className="text-xs font-bold">{scanner.tagCount}</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Errors</p>
                        <p className="text-xs font-bold text-red-600">{scanner.errorRate}%</p>
                      </div>
                    </div>

                    {/* Antenna Count (if applicable) */}
                    {scanner.antennas && (
                      <div className="flex items-center gap-1 mb-2">
                        <Antenna size={12} className="text-blue-600" />
                        <span className="text-xs">{scanner.antennas.length} antennas</span>
                        <div className="flex gap-1 ml-2">
                          {scanner.antennas.map(a => (
                            <div key={a.id} className={cn(
                              "w-2 h-2 rounded-full",
                              a.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                            )} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Read Range */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 mb-2">
                      <span>Range: {scanner.readRange}m</span>
                      <span>Freq: {scanner.frequency}</span>
                    </div>

                    {/* Last Activity */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
                      <span className="truncate max-w-[150px]">Last: {scanner.lastActivity}</span>
                      <span>{scanner.lastSeen.split(' ')[1]}</span>
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
                  <TableHead className="text-black/50">Scanner</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Connection</TableHead>
                  <TableHead className="text-black/50">IP Address</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50 text-right">Reads/s</TableHead>
                  <TableHead className="text-black/50 text-right">Tags</TableHead>
                  <TableHead className="text-black/50">Antennas</TableHead>
                  <TableHead className="text-black/50">Last Seen</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScanners.map((scanner) => {
                  const TypeIcon = getScannerTypeIcon(scanner.type);
                  
                  return (
                    <TableRow key={scanner.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn("p-1 rounded", getScannerTypeColor(scanner.type))}>
                            <TypeIcon size={14} />
                          </div>
                          <div>
                            <p className="font-medium">{scanner.name}</p>
                            <p className="text-xs text-black/50">{scanner.scannerId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {scanner.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(scanner.status))}>
                          {scanner.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {scanner.connection === 'ethernet' && <EthernetPort size={12} className="text-green-600" />}
                          {scanner.connection === 'wifi' && <Wifi size={12} className="text-blue-600" />}
                          {scanner.connection === 'bluetooth' && <Bluetooth size={12} className="text-purple-600" />}
                          {scanner.connection === 'usb' && <Usb size={12} className="text-orange-600" />}
                          <span className="text-xs">{scanner.connection}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{scanner.ipAddress || '—'}</TableCell>
                      <TableCell>{scanner.zone || scanner.location}</TableCell>
                      <TableCell className="text-right">{scanner.readsPerSecond}</TableCell>
                      <TableCell className="text-right">{scanner.tagCount}</TableCell>
                      <TableCell>
                        {scanner.antennas ? (
                          <div className="flex items-center gap-1">
                            <Antenna size={12} className="text-blue-600" />
                            <span>{scanner.antennas.length}</span>
                          </div>
                        ) : '—'}
                      </TableCell>
                      <TableCell className="text-xs">{scanner.lastSeen}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            setSelectedScanner(scanner);
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
                Showing {filteredScanners.length} of {scanners.length} scanners
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

      {/* Scanner Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Scanner Details</DialogTitle>
          </DialogHeader>

          {selectedScanner && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="antennas">Antennas</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", getScannerTypeColor(selectedScanner.type))}>
                      {(() => {
                        const Icon = getScannerTypeIcon(selectedScanner.type);
                        return <Icon size={24} className="text-white" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedScanner.name}</h3>
                      <p className="text-sm text-black/50">{selectedScanner.model} • {selectedScanner.manufacturer}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Scanner ID</p>
                      <p className="text-sm font-mono">{selectedScanner.scannerId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Serial Number</p>
                      <p className="text-sm font-mono">{selectedScanner.serialNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-xs border-0", getStatusColor(selectedScanner.status))}>
                      {selectedScanner.status}
                    </Badge>
                    <Badge className={cn("text-xs", getScannerTypeColor(selectedScanner.type))}>
                      {selectedScanner.type.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-3 bg-[#F5EEE9] rounded-lg">
                    <div>
                      <p className="text-xs text-black/50">Location</p>
                      <p className="text-sm font-medium">{selectedScanner.location} • {selectedScanner.zone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Assigned To</p>
                      <p className="text-sm font-medium">{selectedScanner.assignedTo || 'Unassigned'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50">RFID Specifications</p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>
                        <p className="text-xs text-black/50">Frequency</p>
                        <p className="text-sm">{selectedScanner.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Protocol</p>
                        <p className="text-sm">{selectedScanner.protocol}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Power Output</p>
                        <p className="text-sm">{selectedScanner.powerOutput || 'N/A'} dBm</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Read Range</p>
                        <p className="text-sm">{selectedScanner.readRange} meters</p>
                      </div>
                    </div>
                  </div>

                  {selectedScanner.batteryLevel !== undefined && (
                    <div>
                      <p className="text-xs text-black/50">Battery</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-24 h-2 bg-[#F5EEE9] rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              selectedScanner.batteryLevel > 50 ? 'bg-green-500' :
                              selectedScanner.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                            )}
                            style={{ width: `${selectedScanner.batteryLevel}%` }}
                          />
                        </div>
                        <span className="text-sm">{selectedScanner.batteryLevel}%</span>
                        <Badge className="text-xs bg-blue-100 text-blue-700">
                          {selectedScanner.batteryStatus}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedScanner.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedScanner.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedScanner.notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="antennas" className="space-y-4">
                  {selectedScanner.antennas ? (
                    <div className="space-y-3">
                      {selectedScanner.antennas.map((antenna) => (
                        <Card key={antenna.id} className="border-[#F5EEE9]">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Antenna size={16} className="text-blue-600" />
                                <p className="font-medium">{antenna.name}</p>
                              </div>
                              <Badge className={cn(
                                "text-xs",
                                antenna.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              )}>
                                {antenna.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                              <div>
                                <p className="text-xs text-black/50">Total Reads</p>
                                <p className="font-medium">{antenna.reads.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-black/50">Last Read</p>
                                <p className="text-xs">{antenna.lastRead}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-black/50 text-center py-4">No antenna information available</p>
                  )}
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Read Rate</p>
                        <p className="text-lg font-bold">{selectedScanner.readsPerSecond}/s</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Avg Response</p>
                        <p className="text-lg font-bold">{selectedScanner.avgResponseTime}ms</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Error Rate</p>
                        <p className="text-lg font-bold text-red-600">{selectedScanner.errorRate}%</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Duplicate Rate</p>
                        <p className="text-lg font-bold">{selectedScanner.duplicateRate}%</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Total Reads</p>
                        <p className="text-lg font-bold">{selectedScanner.totalReads.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Unique Tags</p>
                        <p className="text-lg font-bold">{selectedScanner.uniqueTags.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">Inventory Completeness</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${selectedScanner.inventoryCompleteness || 99.5}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-blue-700">
                        {selectedScanner.inventoryCompleteness || 99.5}%
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Last inventory: {selectedScanner.lastInventory}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-black/50">Missed Tags</p>
                      <p className="text-sm font-medium text-orange-600">{selectedScanner.missedTags}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Read Zone</p>
                      <p className="text-sm font-medium">{selectedScanner.readZone}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedScanner.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-0.5">
                            {item.action === 'Online' && <CheckCircle size={12} className="text-green-600" />}
                            {item.action === 'Offline' && <Ban size={12} className="text-red-600" />}
                            {item.action === 'Warning' && <AlertTriangle size={12} className="text-yellow-600" />}
                            {item.action === 'Inventory Complete' && <CheckCircle size={12} className="text-blue-600" />}
                            {item.action === 'Battery Charged' && <BatteryCharging size={12} className="text-green-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.timestamp}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
                            {item.tags && <p className="text-[10px] text-black/70">Tags: {item.tags}</p>}
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
            {selectedScanner?.status === 'online' && (
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
            <TooltipContent side="left">Add Scanner</TooltipContent>
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
            <TooltipContent side="left">Test Scan</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowMetricsDialog(true)}
              >
                <Activity size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Metrics</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default RFIDScannersPage;