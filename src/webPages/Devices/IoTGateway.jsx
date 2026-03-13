// app/dashboard/iot-gateway-status/page.js
'use client';

import { useState } from 'react';
import { 
  Wifi,
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
  Clock,
  Download,
  Grid,
  List,
  Ban,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  MapPin,
  Factory,
  Wrench,
  Activity,
  Zap,
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
  BoxesIcon as BoxesIconCustom,
  LayoutGridIcon as LayoutGridIconCustom,
  Grid3x3Icon as Grid3x3IconCustom,
  ShipIcon as ShipIconCustom,
  PlaneIcon as PlaneIconCustom,
  TrainIcon as TrainIconCustom,
  BikeIcon as BikeIconCustom,
  BusIcon as BusIconCustom,
  CarIcon as CarIconCustom,
  Globe,
  MapIcon as MapIconCustom,
  MapPinIcon as MapPinIconCustom,
  NavigationIcon as NavigationIconCustom,
  CompassIcon as CompassIconCustom,
  RouteIcon as RouteIconCustom,
  WaypointsIcon as WaypointsIconCustom,
  TrackingIcon as TrackingIconCustom,
  Cpu,
  Printer as PrinterDevice,
  Camera as CameraDevice,
  RadioTower,
  Server,
  Database as DatabaseIcon,
  Bluetooth,
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
  NavigationIcon as NavigationIconCustom2,
  MapPinIcon as MapPinIconCustom2,
  GaugeIcon as GaugeIconCustom2,
  GaugeCircleIcon as GaugeCircleIconCustom,
  Waypoints ,

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

const IoTGatewayStatusPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProtocol, setSelectedProtocol] = useState('all');
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
  const [showNetworkDialog, setShowNetworkDialog] = useState(false);
  const [showProtocolDialog, setShowProtocolDialog] = useState(false);
  const [showClientsDialog, setShowClientsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample IoT gateway data
  const gateways = [
    {
      id: 'GTW-001',
      gatewayId: 'GTW-MAIN-01',
      name: 'Main IoT Gateway - Warehouse A',
      type: 'enterprise',
      model: 'Cisco IR829',
      manufacturer: 'Cisco',
      serialNumber: 'CSC-2024-001',
      macAddress: '00:1A:2B:3C:4D:01',
      ipAddress: '192.168.1.1',
      firmwareVersion: '15.2(4)M7',
      hardwareVersion: '2.0',
      status: 'online',
      uptime: '120d 8h 45m',
      lastSeen: '2024-03-17 10:30:45',
      lastRestart: '2024-01-15 08:00:00',
      location: 'Warehouse A',
      zone: 'Server Room',
      room: 'Network Closet',
      rack: 'Rack A',
      position: '1U',
      temperature: 42,
      cpuUsage: 32,
      memoryUsage: 456,
      storageUsage: 1024,
      networkInterfaces: [
        { name: 'GigabitEthernet0/0', type: 'wan', ip: '192.168.1.1', status: 'up', speed: '1 Gbps', rx: '1.2 GB', tx: '0.8 GB' },
        { name: 'GigabitEthernet0/1', type: 'lan', ip: '10.0.1.1', status: 'up', speed: '1 Gbps', rx: '3.4 GB', tx: '2.1 GB' },
        { name: 'Cellular0', type: 'cellular', ip: '10.200.1.1', status: 'standby', speed: '100 Mbps', rx: '0.1 GB', tx: '0.05 GB' },
      ],
      protocols: [
        { name: 'MQTT', status: 'active', port: 1883, connections: 45, messages: 1234567 },
        { name: 'CoAP', status: 'active', port: 5683, connections: 12, messages: 234567 },
        { name: 'HTTP/REST', status: 'active', port: 8080, connections: 8, messages: 45678 },
        { name: 'WebSocket', status: 'active', port: 8081, connections: 15, messages: 78901 },
      ],
      connectedDevices: 45,
      deviceTypes: {
        sensors: 23,
        scanners: 12,
        rfid: 5,
        cameras: 3,
        robots: 2,
      },
      messageRate: 1250,
      peakRate: 3500,
      totalMessages: 4567890,
      bandwidth: 100,
      bandwidthUsage: 35,
      latency: 12,
      jitter: 2,
      packetLoss: 0.01,
      errorRate: 0.001,
      securityLevel: 'high',
      firewall: true,
      vpn: true,
      certificates: ['valid'],
      lastBackup: '2024-03-16 02:00',
      nextBackup: '2024-03-17 02:00',
      lastFirmwareUpdate: '2024-02-15',
      nextFirmwareUpdate: '2024-05-15',
      tags: ['main', 'primary', 'enterprise'],
      notes: 'Main gateway for all IoT devices',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
        { timestamp: '2024-03-16 02:00', action: 'Backup Completed', user: 'System', size: '256 MB' },
      ],
    },
    {
      id: 'GTW-002',
      gatewayId: 'GTW-EDGE-01',
      name: 'Edge Gateway - Cold Storage',
      type: 'edge',
      model: 'Dell Edge Gateway 5000',
      manufacturer: 'Dell',
      serialNumber: 'DEL-2024-001',
      macAddress: '00:1A:2B:3C:4D:02',
      ipAddress: '192.168.2.1',
      firmwareVersion: '2.5.3',
      hardwareVersion: '1.2',
      status: 'online',
      uptime: '45d 12h 30m',
      lastSeen: '2024-03-17 10:29:30',
      lastRestart: '2024-02-20 09:15:00',
      location: 'Warehouse C',
      zone: 'Cold Storage',
      room: 'Temperature Controlled',
      temperature: -5,
      cpuUsage: 28,
      memoryUsage: 256,
      storageUsage: 512,
      networkInterfaces: [
        { name: 'eth0', type: 'lan', ip: '192.168.2.1', status: 'up', speed: '1 Gbps', rx: '0.8 GB', tx: '0.6 GB' },
        { name: 'wlan0', type: 'wifi', ip: '192.168.2.2', status: 'up', speed: '300 Mbps', rx: '0.2 GB', tx: '0.1 GB' },
      ],
      protocols: [
        { name: 'MQTT', status: 'active', port: 1883, connections: 23, messages: 789012 },
        { name: 'Modbus', status: 'active', port: 502, connections: 8, messages: 23456 },
      ],
      connectedDevices: 23,
      deviceTypes: {
        sensors: 18,
        scanners: 2,
        rfid: 3,
      },
      messageRate: 450,
      peakRate: 890,
      totalMessages: 1234567,
      bandwidth: 100,
      bandwidthUsage: 22,
      latency: 18,
      jitter: 3,
      packetLoss: 0.02,
      errorRate: 0.002,
      securityLevel: 'high',
      firewall: true,
      vpn: true,
      certificates: ['valid'],
      lastBackup: '2024-03-16 03:00',
      nextBackup: '2024-03-17 03:00',
      lastFirmwareUpdate: '2024-02-10',
      nextFirmwareUpdate: '2024-05-10',
      temperatureRating: '-20 to +50°C',
      tags: ['edge', 'cold-storage', 'temperature-rated'],
      notes: 'Edge gateway for cold storage monitoring',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'GTW-003',
      gatewayId: 'GTW-LOR-01',
      name: 'LoRaWAN Gateway - Yard',
      type: 'lorawan',
      model: 'Multitech Conduit',
      manufacturer: 'Multitech',
      serialNumber: 'MTX-2024-001',
      macAddress: '00:1A:2B:3C:4D:03',
      ipAddress: '192.168.3.1',
      firmwareVersion: '4.2.1',
      hardwareVersion: '2.0',
      status: 'online',
      uptime: '60d 4h 15m',
      lastSeen: '2024-03-17 10:28:15',
      lastRestart: '2024-02-01 10:30:00',
      location: 'Warehouse A',
      zone: 'Outdoor Yard',
      room: 'Equipment Shed',
      temperature: 28,
      cpuUsage: 35,
      memoryUsage: 189,
      storageUsage: 256,
      networkInterfaces: [
        { name: 'eth0', type: 'wan', ip: '192.168.3.1', status: 'up', speed: '100 Mbps', rx: '0.3 GB', tx: '0.2 GB' },
        { name: 'cellular0', type: 'cellular', ip: '10.0.0.1', status: 'standby', speed: '50 Mbps' },
      ],
      protocols: [
        { name: 'LoRaWAN', status: 'active', port: 1680, connections: 156, messages: 234567 },
        { name: 'MQTT', status: 'active', port: 1883, connections: 5, messages: 45678 },
      ],
      connectedDevices: 156,
      deviceTypes: {
        sensors: 145,
        trackers: 11,
      },
      messageRate: 120,
      peakRate: 450,
      totalMessages: 890123,
      bandwidth: 100,
      bandwidthUsage: 15,
      latency: 45,
      jitter: 8,
      packetLoss: 0.05,
      errorRate: 0.01,
      frequency: '868 MHz',
      region: 'EU868',
      subBands: ['868.1', '868.3', '868.5'],
      dutyCycle: '1%',
      maxEIRP: 16,
      securityLevel: 'medium',
      firewall: true,
      vpn: false,
      certificates: ['valid'],
      lastBackup: '2024-03-16 04:00',
      nextBackup: '2024-03-17 04:00',
      lastFirmwareUpdate: '2024-02-20',
      nextFirmwareUpdate: '2024-05-20',
      tags: ['lorawan', 'outdoor', 'yard'],
      notes: 'Covers outdoor yard area',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'GTW-004',
      gatewayId: 'GTW-ZGB-01',
      name: 'Zigbee Gateway - Lighting',
      type: 'zigbee',
      model: 'Philips Hue Bridge',
      manufacturer: 'Philips',
      serialNumber: 'PHL-2024-001',
      macAddress: '00:1A:2B:3C:4D:04',
      ipAddress: '192.168.4.1',
      firmwareVersion: '2.4.0',
      hardwareVersion: '1.0',
      status: 'online',
      uptime: '30d 6h 20m',
      lastSeen: '2024-03-17 10:27:45',
      lastRestart: '2024-02-25 14:20:00',
      location: 'Warehouse A',
      zone: 'Lighting Control',
      room: 'Electrical Room',
      temperature: 35,
      cpuUsage: 22,
      memoryUsage: 128,
      storageUsage: 256,
      networkInterfaces: [
        { name: 'eth0', type: 'lan', ip: '192.168.4.1', status: 'up', speed: '100 Mbps', rx: '0.1 GB', tx: '0.1 GB' },
      ],
      protocols: [
        { name: 'Zigbee', status: 'active', channel: 15, panId: '0x1234', devices: 45, messages: 23456 },
        { name: 'HTTP/REST', status: 'active', port: 80, connections: 3, messages: 1234 },
      ],
      connectedDevices: 45,
      deviceTypes: {
        lights: 38,
        sensors: 7,
      },
      messageRate: 25,
      peakRate: 80,
      totalMessages: 234567,
      bandwidth: 100,
      bandwidthUsage: 5,
      latency: 25,
      jitter: 2,
      packetLoss: 0.01,
      errorRate: 0.005,
      frequency: '2.4 GHz',
      channel: 15,
      panId: '0x1234',
      networkKey: 'encrypted',
      securityLevel: 'medium',
      firewall: false,
      vpn: false,
      certificates: [],
      lastBackup: '2024-03-16 05:00',
      nextBackup: '2024-03-17 05:00',
      lastFirmwareUpdate: '2024-03-01',
      nextFirmwareUpdate: '2024-06-01',
      tags: ['zigbee', 'lighting', 'building-automation'],
      notes: 'Controls warehouse lighting',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'GTW-005',
      gatewayId: 'GTW-MOB-01',
      name: 'Cellular Gateway - Mobile',
      type: 'cellular',
      model: 'Cradlepoint IBR900',
      manufacturer: 'Cradlepoint',
      serialNumber: 'CP-2024-001',
      macAddress: '00:1A:2B:3C:4D:05',
      ipAddress: '10.0.0.2',
      firmwareVersion: '7.2.1',
      hardwareVersion: '2.0',
      status: 'online',
      uptime: '15d 8h 30m',
      lastSeen: '2024-03-17 10:26:30',
      lastRestart: '2024-03-02 09:00:00',
      location: 'Mobile Unit',
      zone: 'Fleet',
      vehicle: 'Truck 101',
      temperature: 38,
      cpuUsage: 25,
      memoryUsage: 189,
      storageUsage: 256,
      networkInterfaces: [
        { name: 'LTE', type: 'cellular', carrier: 'Verizon', ip: '10.0.0.2', status: 'up', speed: '50 Mbps', signal: 85, rx: '2.1 GB', tx: '1.8 GB' },
        { name: 'wlan0', type: 'wifi', ip: '192.168.5.1', status: 'up', speed: '300 Mbps', rx: '0.3 GB', tx: '0.2 GB' },
      ],
      protocols: [
        { name: 'MQTT', status: 'active', port: 1883, connections: 8, messages: 45678 },
        { name: 'HTTP/REST', status: 'active', port: 8080, connections: 2, messages: 1234 },
      ],
      connectedDevices: 12,
      deviceTypes: {
        trackers: 8,
        sensors: 4,
      },
      messageRate: 45,
      peakRate: 120,
      totalMessages: 345678,
      bandwidth: 50,
      bandwidthUsage: 30,
      latency: 65,
      jitter: 12,
      packetLoss: 0.1,
      errorRate: 0.02,
      cellular: {
        carrier: 'Verizon',
        signal: 85,
        band: 'B4',
        rsrp: -95,
        rsrq: -10,
        sinr: 15,
      },
      securityLevel: 'medium',
      firewall: true,
      vpn: true,
      certificates: ['valid'],
      lastBackup: '2024-03-16 06:00',
      nextBackup: '2024-03-17 06:00',
      lastFirmwareUpdate: '2024-02-28',
      nextFirmwareUpdate: '2024-05-28',
      tags: ['cellular', 'mobile', 'fleet'],
      notes: 'Gateway installed in delivery truck',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'GTW-006',
      gatewayId: 'GTW-IND-01',
      name: 'Industrial Gateway - Manufacturing',
      type: 'industrial',
      model: 'Siemens IOT2050',
      manufacturer: 'Siemens',
      serialNumber: 'SIE-2024-001',
      macAddress: '00:1A:2B:3C:4D:06',
      ipAddress: '192.168.6.1',
      firmwareVersion: '3.1.2',
      hardwareVersion: '1.5',
      status: 'online',
      uptime: '90d 2h 15m',
      lastSeen: '2024-03-17 10:25:15',
      lastRestart: '2024-01-10 11:30:00',
      location: 'Manufacturing',
      zone: 'Production Line',
      room: 'Control Room',
      temperature: 45,
      cpuUsage: 45,
      memoryUsage: 512,
      storageUsage: 1024,
      networkInterfaces: [
        { name: 'eth0', type: 'lan', ip: '192.168.6.1', status: 'up', speed: '1 Gbps', rx: '5.6 GB', tx: '4.2 GB' },
        { name: 'eth1', type: 'lan', ip: '192.168.6.2', status: 'up', speed: '1 Gbps', rx: '3.4 GB', tx: '2.8 GB' },
        { name: 'profinet0', type: 'profinet', ip: '192.168.7.1', status: 'up', speed: '100 Mbps' },
      ],
      protocols: [
        { name: 'PROFINET', status: 'active', devices: 12, messages: 2345678 },
        { name: 'Modbus TCP', status: 'active', port: 502, connections: 8, messages: 456789 },
        { name: 'OPC UA', status: 'active', port: 4840, connections: 5, messages: 123456 },
        { name: 'MQTT', status: 'active', port: 1883, connections: 3, messages: 45678 },
      ],
      connectedDevices: 28,
      deviceTypes: {
        plcs: 12,
        drives: 8,
        sensors: 5,
        robots: 3,
      },
      messageRate: 3500,
      peakRate: 8500,
      totalMessages: 12345678,
      bandwidth: 1000,
      bandwidthUsage: 45,
      latency: 5,
      jitter: 1,
      packetLoss: 0.001,
      errorRate: 0.0001,
      securityLevel: 'high',
      firewall: true,
      vpn: true,
      certificates: ['valid'],
      lastBackup: '2024-03-16 01:00',
      nextBackup: '2024-03-17 01:00',
      lastFirmwareUpdate: '2024-02-05',
      nextFirmwareUpdate: '2024-05-05',
      tags: ['industrial', 'manufacturing', 'automation'],
      notes: 'Connects manufacturing equipment',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'GTW-007',
      gatewayId: 'GTW-BTH-01',
      name: 'Bluetooth Gateway - Asset Tracking',
      type: 'bluetooth',
      model: 'Minew G1',
      manufacturer: 'Minew',
      serialNumber: 'MIN-2024-001',
      macAddress: '00:1A:2B:3C:4D:07',
      ipAddress: '192.168.7.1',
      firmwareVersion: '2.1.3',
      hardwareVersion: '1.0',
      status: 'warning',
      uptime: '8d 4h 20m',
      lastSeen: '2024-03-17 10:24:00',
      lastRestart: '2024-03-09 06:15:00',
      location: 'Warehouse A',
      zone: 'Asset Tracking',
      room: 'Storage Area',
      temperature: 32,
      cpuUsage: 65,
      memoryUsage: 178,
      storageUsage: 128,
      networkInterfaces: [
        { name: 'eth0', type: 'lan', ip: '192.168.7.1', status: 'up', speed: '100 Mbps', rx: '0.5 GB', tx: '0.4 GB' },
      ],
      protocols: [
        { name: 'Bluetooth LE', status: 'active', scanInterval: '100ms', devices: 45, messages: 34567 },
        { name: 'MQTT', status: 'active', port: 1883, connections: 2, messages: 12345 },
      ],
      connectedDevices: 45,
      deviceTypes: {
        beacons: 32,
        tags: 13,
      },
      messageRate: 180,
      peakRate: 350,
      totalMessages: 456789,
      bandwidth: 100,
      bandwidthUsage: 28,
      latency: 35,
      jitter: 5,
      packetLoss: 0.5,
      errorRate: 0.3,
      bluetooth: {
        version: '5.2',
        scanInterval: 100,
        txPower: 4,
        range: 50,
      },
      alerts: ['High CPU usage', 'Packet loss detected'],
      securityLevel: 'medium',
      firewall: false,
      vpn: false,
      certificates: [],
      lastBackup: '2024-03-15 02:00',
      nextBackup: '2024-03-18 02:00',
      lastFirmwareUpdate: '2024-02-15',
      nextFirmwareUpdate: '2024-05-15',
      tags: ['bluetooth', 'asset-tracking', 'warning'],
      notes: 'CPU usage high - investigate',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Warning', user: 'System', reason: 'High CPU usage' },
        { timestamp: '2024-03-17 07:30', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'GTW-008',
      gatewayId: 'GTW-BK-01',
      name: 'Backup Gateway - Warehouse B',
      type: 'enterprise',
      model: 'Cisco IR829',
      manufacturer: 'Cisco',
      serialNumber: 'CSC-2024-002',
      macAddress: '00:1A:2B:3C:4D:08',
      ipAddress: '192.168.8.1',
      firmwareVersion: '15.2(4)M7',
      hardwareVersion: '2.0',
      status: 'standby',
      uptime: '90d 0h 0m',
      lastSeen: '2024-03-17 10:23:30',
      lastRestart: '2024-01-15 08:00:00',
      location: 'Warehouse B',
      zone: 'Server Room',
      room: 'Network Closet',
      temperature: 38,
      cpuUsage: 8,
      memoryUsage: 89,
      storageUsage: 256,
      networkInterfaces: [
        { name: 'GigabitEthernet0/0', type: 'wan', ip: '192.168.8.1', status: 'up', speed: '1 Gbps', rx: '0.1 GB', tx: '0.05 GB' },
        { name: 'GigabitEthernet0/1', type: 'lan', ip: '10.0.8.1', status: 'up', speed: '1 Gbps', rx: '0.2 GB', tx: '0.1 GB' },
      ],
      protocols: [
        { name: 'MQTT', status: 'standby', port: 1883, connections: 0, messages: 0 },
        { name: 'CoAP', status: 'standby', port: 5683, connections: 0, messages: 0 },
      ],
      connectedDevices: 0,
      messageRate: 0,
      peakRate: 0,
      totalMessages: 0,
      bandwidth: 100,
      bandwidthUsage: 1,
      latency: 0,
      jitter: 0,
      packetLoss: 0,
      errorRate: 0,
      securityLevel: 'high',
      firewall: true,
      vpn: true,
      certificates: ['valid'],
      lastBackup: '2024-03-16 02:00',
      nextBackup: '2024-03-17 02:00',
      lastFirmwareUpdate: '2024-02-15',
      nextFirmwareUpdate: '2024-05-15',
      tags: ['backup', 'standby', 'redundant'],
      notes: 'Standby gateway for failover',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Standby', user: 'System' },
      ],
    },
    {
      id: 'GTW-009',
      gatewayId: 'GTW-OFF-01',
      name: 'Office Gateway - Admin Building',
      type: 'enterprise',
      model: 'Ubiquiti UniFi Gateway',
      manufacturer: 'Ubiquiti',
      serialNumber: 'UBQ-2024-001',
      macAddress: '00:1A:2B:3C:4D:09',
      ipAddress: '192.168.9.1',
      firmwareVersion: '3.2.1',
      hardwareVersion: '1.0',
      status: 'online',
      uptime: '45d 8h 30m',
      lastSeen: '2024-03-17 10:22:45',
      lastRestart: '2024-02-20 09:00:00',
      location: 'Office A',
      zone: 'Admin Building',
      room: 'IT Closet',
      temperature: 30,
      cpuUsage: 18,
      memoryUsage: 256,
      storageUsage: 512,
      networkInterfaces: [
        { name: 'WAN', type: 'wan', ip: '192.168.9.1', status: 'up', speed: '1 Gbps', rx: '2.3 GB', tx: '1.8 GB' },
        { name: 'LAN1', type: 'lan', ip: '10.0.9.1', status: 'up', speed: '1 Gbps', rx: '1.2 GB', tx: '0.9 GB' },
        { name: 'LAN2', type: 'lan', ip: '10.0.9.2', status: 'up', speed: '1 Gbps', rx: '0.8 GB', tx: '0.6 GB' },
      ],
      protocols: [
        { name: 'HTTP/REST', status: 'active', port: 80, connections: 15, messages: 45678 },
        { name: 'HTTPS', status: 'active', port: 443, connections: 25, messages: 78901 },
        { name: 'DNS', status: 'active', port: 53, queries: 234567 },
        { name: 'DHCP', status: 'active', port: 67, leases: 45 },
      ],
      connectedDevices: 45,
      deviceTypes: {
        computers: 25,
        printers: 5,
        phones: 10,
        accessPoints: 5,
      },
      messageRate: 450,
      peakRate: 1200,
      totalMessages: 2345678,
      bandwidth: 1000,
      bandwidthUsage: 25,
      latency: 8,
      jitter: 1,
      packetLoss: 0.005,
      errorRate: 0.001,
      securityLevel: 'high',
      firewall: true,
      vpn: true,
      ids: true,
      ips: true,
      certificates: ['valid'],
      lastBackup: '2024-03-16 03:00',
      nextBackup: '2024-03-17 03:00',
      lastFirmwareUpdate: '2024-02-28',
      nextFirmwareUpdate: '2024-05-28',
      tags: ['office', 'network', 'enterprise'],
      notes: 'Main office gateway',
      history: [
        { timestamp: '2024-03-17 08:00', action: 'Online', user: 'System' },
      ],
    },
    {
      id: 'GTW-010',
      gatewayId: 'GTW-OFF-02',
      name: 'Office Gateway - Backup',
      type: 'enterprise',
      model: 'Ubiquiti UniFi Gateway',
      manufacturer: 'Ubiquiti',
      serialNumber: 'UBQ-2024-002',
      macAddress: '00:1A:2B:3C:4D:10',
      ipAddress: '192.168.10.1',
      firmwareVersion: '3.2.1',
      hardwareVersion: '1.0',
      status: 'offline',
      uptime: '0s',
      lastSeen: '2024-03-16 23:45:00',
      lastRestart: '2024-03-16 23:45:00',
      location: 'Office A',
      zone: 'Admin Building',
      room: 'IT Closet',
      temperature: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      storageUsage: 0,
      networkInterfaces: [
        { name: 'WAN', type: 'wan', ip: '—', status: 'down' },
        { name: 'LAN1', type: 'lan', ip: '—', status: 'down' },
      ],
      protocols: [],
      connectedDevices: 0,
      messageRate: 0,
      totalMessages: 0,
      bandwidth: 0,
      bandwidthUsage: 0,
      latency: 0,
      jitter: 0,
      packetLoss: 0,
      errorRate: 0,
      securityLevel: 'unknown',
      alerts: ['Power failure', 'Network unreachable'],
      lastBackup: '2024-03-15 03:00',
      tags: ['office', 'backup', 'offline'],
      notes: 'Power outage - awaiting investigation',
      history: [
        { timestamp: '2024-03-16 23:45', action: 'Offline', user: 'System', reason: 'Power failure' },
      ],
    },
  ];

  // Gateway types
  const gatewayTypes = [
    { id: 'enterprise', name: 'Enterprise Gateway', icon: Server, color: 'bg-blue-100 text-blue-700' },
    { id: 'edge', name: 'Edge Gateway', icon: Cpu, color: 'bg-green-100 text-green-700' },
    { id: 'lorawan', name: 'LoRaWAN Gateway', icon: RadioTower, color: 'bg-purple-100 text-purple-700' },
    { id: 'zigbee', name: 'Zigbee Gateway', icon: Zap, color: 'bg-orange-100 text-orange-700' },
    { id: 'cellular', name: 'Cellular Gateway', icon: Signal, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'industrial', name: 'Industrial Gateway', icon: Factory, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'bluetooth', name: 'Bluetooth Gateway', icon: Bluetooth, color: 'bg-pink-100 text-pink-700' },
  ];

  // Protocols
  const protocols = [
    'MQTT', 'CoAP', 'HTTP/REST', 'WebSocket', 'Modbus', 'PROFINET', 'OPC UA', 
    'LoRaWAN', 'Zigbee', 'Bluetooth LE', 'PROFINET', 'EtherNet/IP'
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', count: 4 },
    { id: 'wh-b', name: 'Warehouse B', count: 1 },
    { id: 'wh-c', name: 'Warehouse C', count: 1 },
    { id: 'office', name: 'Office A', count: 2 },
    { id: 'manufacturing', name: 'Manufacturing', count: 1 },
    { id: 'mobile', name: 'Mobile Unit', count: 1 },
  ];

  // Status configuration
  const statusConfig = {
    online: { label: 'Online', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    offline: { label: 'Offline', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    warning: { label: 'Warning', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    error: { label: 'Error', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    standby: { label: 'Standby', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    maintenance: { label: 'Maintenance', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Wrench },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getGatewayTypeColor = (type) => {
    const found = gatewayTypes.find(t => t.id === type);
    return found?.color || 'bg-gray-100 text-gray-700';
  };

  const getGatewayTypeIcon = (type) => {
    const found = gatewayTypes.find(t => t.id === type);
    const Icon = found?.icon || Server;
    return Icon;
  };

  const filteredGateways = gateways.filter(gateway => {
    const matchesType = selectedType === 'all' || gateway.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || gateway.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || gateway.location === selectedLocation;
    const matchesProtocol = selectedProtocol === 'all' || gateway.protocols?.some(p => p.name === selectedProtocol);
    const matchesSearch = gateway.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gateway.gatewayId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gateway.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gateway.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gateway.ipAddress?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesLocation && matchesProtocol && matchesSearch;
  });

  const stats = {
    total: gateways.length,
    online: gateways.filter(g => g.status === 'online').length,
    offline: gateways.filter(g => g.status === 'offline').length,
    warning: gateways.filter(g => g.status === 'warning').length,
    error: gateways.filter(g => g.status === 'error').length,
    standby: gateways.filter(g => g.status === 'standby').length,
    totalDevices: gateways.reduce((sum, g) => sum + (g.connectedDevices || 0), 0),
    totalMessages: gateways.reduce((sum, g) => sum + (g.totalMessages || 0), 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">IoT Gateway Status</h1>
            <p className="text-black/50 mt-1">Monitor and manage IoT gateway infrastructure</p>
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
              onClick={() => setShowMetricsDialog(true)}
            >
              <Activity size={16} />
              Metrics
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Add Gateway
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Gateways</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Waypoints  size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Standby</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.standby}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Clock size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Connected Devices</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalDevices}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Cpu size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Messages</p>
                  <p className="text-xl font-bold text-black mt-1">{(stats.totalMessages / 1e6).toFixed(1)}M</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Activity size={18} className="text-orange-600" />
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
              <SelectValue placeholder="Gateway Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {gatewayTypes.map(type => (
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
              <SelectItem value="standby">Standby</SelectItem>
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

          <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Protocol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Protocols</SelectItem>
              {protocols.map(proto => (
                <SelectItem key={proto} value={proto}>{proto}</SelectItem>
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

      {/* Gateways Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredGateways.map((gateway) => {
            const StatusIcon = statusConfig[gateway.status]?.icon || CheckCircle;
            const TypeIcon = getGatewayTypeIcon(gateway.type);
            
            return (
              <Card key={gateway.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={cn("p-4 rounded-t-lg border-b border-[#F5EEE9]", getGatewayTypeColor(gateway.type))}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/30 rounded-lg backdrop-blur-sm">
                          <TypeIcon size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs border-0", getStatusColor(gateway.status))}>
                              <StatusIcon className="mr-1" size={10} />
                              {gateway.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-white/30 text-white bg-white/20">
                              {gateway.type}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-white">{gateway.name}</h3>
                          <p className="text-xs text-white/80 mt-0.5">{gateway.gatewayId}</p>
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
                            setSelectedGateway(gateway);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedGateway(gateway);
                            setShowDiagnosticDialog(true);
                          }}>
                            <Activity className="mr-2 h-4 w-4" />
                            Run Diagnostic
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedGateway(gateway);
                            setShowClientsDialog(true);
                          }}>
                            <Cpu className="mr-2 h-4 w-4" />
                            Connected Devices
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedGateway(gateway);
                            setShowProtocolDialog(true);
                          }}>
                            <Network className="mr-2 h-4 w-4" />
                            Protocols
                          </DropdownMenuItem>
                          {gateway.status === 'online' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedGateway(gateway);
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
                    {/* Model & Location */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-black/50">{gateway.model}</span>
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                        {gateway.manufacturer}
                      </Badge>
                    </div>

                    {/* IP & Location */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Wifi size={12} className="text-blue-600" />
                        <span className="text-xs">{gateway.ipAddress}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-red-600" />
                        <span className="text-xs">{gateway.zone || gateway.location}</span>
                      </div>
                    </div>

                    {/* Uptime */}
                    <div className="mb-2 p-2 bg-[#F5EEE9]/50 rounded-lg">
                      <p className="text-[10px] text-black/50">Uptime</p>
                      <p className="text-xs font-medium">{gateway.uptime}</p>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Devices</p>
                        <p className="text-xs font-bold">{gateway.connectedDevices}</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Msg/s</p>
                        <p className="text-xs font-bold">{gateway.messageRate}</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">CPU</p>
                        <p className="text-xs font-bold">{gateway.cpuUsage}%</p>
                      </div>
                    </div>

                    {/* Protocol Icons */}
                    <div className="flex items-center gap-1 mb-2">
                      {gateway.protocols?.slice(0, 3).map((proto, idx) => (
                        <Badge key={idx} className="text-[8px] h-4 bg-blue-100 text-blue-700">
                          {proto.name}
                        </Badge>
                      ))}
                      {gateway.protocols?.length > 3 && (
                        <Badge className="text-[8px] h-4 bg-gray-100 text-gray-700">
                          +{gateway.protocols.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Alerts */}
                    {gateway.alerts && gateway.alerts.length > 0 && (
                      <div className="mb-2 p-2 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-1">
                          <AlertCircle size={10} className="text-red-600" />
                          <span className="text-[10px] text-red-700">{gateway.alerts[0]}</span>
                        </div>
                      </div>
                    )}

                    {/* Last Seen */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
                      <span>Last seen: {gateway.lastSeen.split(' ')[1]}</span>
                      <span>Temp: {gateway.temperature}°C</span>
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
                  <TableHead className="text-black/50">Gateway</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">IP Address</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50 text-right">Devices</TableHead>
                  <TableHead className="text-black/50 text-right">Msg/s</TableHead>
                  <TableHead className="text-black/50 text-right">CPU</TableHead>
                  <TableHead className="text-black/50">Uptime</TableHead>
                  <TableHead className="text-black/50">Protocols</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGateways.map((gateway) => {
                  const TypeIcon = getGatewayTypeIcon(gateway.type);
                  
                  return (
                    <TableRow key={gateway.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn("p-1 rounded", getGatewayTypeColor(gateway.type))}>
                            <TypeIcon size={14} />
                          </div>
                          <div>
                            <p className="font-medium">{gateway.name}</p>
                            <p className="text-xs text-black/50">{gateway.gatewayId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {gateway.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(gateway.status))}>
                          {gateway.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{gateway.ipAddress}</TableCell>
                      <TableCell>{gateway.zone || gateway.location}</TableCell>
                      <TableCell className="text-right">{gateway.connectedDevices}</TableCell>
                      <TableCell className="text-right">{gateway.messageRate}</TableCell>
                      <TableCell className="text-right">{gateway.cpuUsage}%</TableCell>
                      <TableCell className="text-xs">{gateway.uptime}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {gateway.protocols?.slice(0, 2).map((p, i) => (
                            <Badge key={i} className="text-[8px] bg-blue-100 text-blue-700">
                              {p.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            setSelectedGateway(gateway);
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
                Showing {filteredGateways.length} of {gateways.length} gateways
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

      {/* Gateway Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Gateway Details</DialogTitle>
          </DialogHeader>

          {selectedGateway && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="network">Network</TabsTrigger>
                  <TabsTrigger value="protocols">Protocols</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", getGatewayTypeColor(selectedGateway.type))}>
                      {(() => {
                        const Icon = getGatewayTypeIcon(selectedGateway.type);
                        return <Icon size={24} className="text-white" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedGateway.name}</h3>
                      <p className="text-sm text-black/50">{selectedGateway.model} • {selectedGateway.manufacturer}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Gateway ID</p>
                      <p className="text-sm font-mono">{selectedGateway.gatewayId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Serial Number</p>
                      <p className="text-sm font-mono">{selectedGateway.serialNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-xs border-0", getStatusColor(selectedGateway.status))}>
                      {selectedGateway.status}
                    </Badge>
                    <Badge className={cn("text-xs", getGatewayTypeColor(selectedGateway.type))}>
                      {selectedGateway.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-3 bg-[#F5EEE9] rounded-lg">
                    <div>
                      <p className="text-xs text-black/50">Location</p>
                      <p className="text-sm font-medium">{selectedGateway.location} • {selectedGateway.zone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Uptime</p>
                      <p className="text-sm font-medium">{selectedGateway.uptime}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Firmware</p>
                      <p className="text-sm">v{selectedGateway.firmwareVersion}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Hardware</p>
                      <p className="text-sm">v{selectedGateway.hardwareVersion}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <p className="text-xs text-black/50">Connected Devices</p>
                        <p className="text-lg font-bold">{selectedGateway.connectedDevices}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <p className="text-xs text-black/50">Message Rate</p>
                        <p className="text-lg font-bold">{selectedGateway.messageRate}/s</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <p className="text-xs text-black/50">Total Messages</p>
                        <p className="text-lg font-bold">{(selectedGateway.totalMessages / 1e6).toFixed(1)}M</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-black/50">CPU Usage</p>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-[#F5EEE9] rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              selectedGateway.cpuUsage > 80 ? 'bg-red-500' :
                              selectedGateway.cpuUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            )}
                            style={{ width: `${selectedGateway.cpuUsage}%` }}
                          />
                        </div>
                        <span className="text-sm">{selectedGateway.cpuUsage}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Memory Usage</p>
                      <p className="text-sm">{selectedGateway.memoryUsage} MB</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedGateway.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedGateway.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedGateway.notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="network" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">IP Address</p>
                      <p className="text-sm font-mono">{selectedGateway.ipAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">MAC Address</p>
                      <p className="text-sm font-mono">{selectedGateway.macAddress}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Network Interfaces</p>
                    {selectedGateway.networkInterfaces.map((iface, idx) => (
                      <Card key={idx} className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {iface.type === 'wan' && <Globe size={14} className="text-blue-600" />}
                              {iface.type === 'lan' && <Network size={14} className="text-green-600" />}
                              {iface.type === 'wifi' && <Wifi size={14} className="text-purple-600" />}
                              {iface.type === 'cellular' && <Signal size={14} className="text-orange-600" />}
                              <p className="font-medium">{iface.name}</p>
                            </div>
                            <Badge className={cn(
                              "text-xs",
                              iface.status === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            )}>
                              {iface.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                            <div>
                              <p className="text-xs text-black/50">IP</p>
                              <p className="text-xs font-mono">{iface.ip}</p>
                            </div>
                            <div>
                              <p className="text-xs text-black/50">Speed</p>
                              <p className="text-xs">{iface.speed}</p>
                            </div>
                            <div>
                              <p className="text-xs text-black/50">Traffic</p>
                              <p className="text-xs">RX: {iface.rx} / TX: {iface.tx}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Bandwidth</p>
                      <p className="text-sm">{selectedGateway.bandwidth} Mbps</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Usage</p>
                      <p className="text-sm">{selectedGateway.bandwidthUsage}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Latency</p>
                      <p className="text-sm">{selectedGateway.latency} ms</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Packet Loss</p>
                      <p className="text-sm text-red-600">{selectedGateway.packetLoss}%</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="protocols" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedGateway.protocols.map((proto, idx) => (
                      <Card key={idx} className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{proto.name}</p>
                            <Badge className={cn(
                              "text-xs",
                              proto.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            )}>
                              {proto.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {proto.port && (
                              <div>
                                <p className="text-xs text-black/50">Port</p>
                                <p className="text-sm">{proto.port}</p>
                              </div>
                            )}
                            {proto.connections !== undefined && (
                              <div>
                                <p className="text-xs text-black/50">Connections</p>
                                <p className="text-sm">{proto.connections}</p>
                              </div>
                            )}
                            {proto.messages !== undefined && (
                              <div>
                                <p className="text-xs text-black/50">Messages</p>
                                <p className="text-sm">{proto.messages.toLocaleString()}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedGateway.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-0.5">
                            {item.action === 'Online' && <CheckCircle size={12} className="text-green-600" />}
                            {item.action === 'Offline' && <Ban size={12} className="text-red-600" />}
                            {item.action === 'Warning' && <AlertTriangle size={12} className="text-yellow-600" />}
                            {item.action === 'Backup Completed' && <Download size={12} className="text-blue-600" />}
                            {item.action === 'Standby' && <Clock size={12} className="text-blue-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.timestamp}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
                            {item.reason && <p className="text-[10px] text-black/70">Reason: {item.reason}</p>}
                            {item.size && <p className="text-[10px] text-black/70">Size: {item.size}</p>}
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
            {selectedGateway?.status === 'online' && (
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
            <TooltipContent side="left">Add Gateway</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowNetworkDialog(true)}
              >
                <Network size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Network Map</TooltipContent>
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

export default IoTGatewayStatusPage;