// app/dashboard/firmware-updates/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  Calendar,
  Grid,
  List,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  DownloadCloud,
  UploadCloud,
  Settings,
  Wrench,
  Cpu,
  HardDrive,
  Server,
  Monitor,
  Smartphone,
  Printer,
  Scan,
  Radio,
  Zap,
  Activity,
  History,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Watch,
} from 'lucide-react';

// Shadcn UI imports
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const FirmwareUpdatesPage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const [showRollbackDialog, setShowRollbackDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showCompatibilityDialog, setShowCompatibilityDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample firmware updates data
  const firmwareUpdates = [
    {
      id: 'FW-001',
      name: 'Zebra Scanner Firmware v2.2.0',
      version: '2.2.0',
      currentVersion: '2.1.5',
      deviceType: 'scanner',
      deviceModel: 'Zebra DS3608',
      manufacturer: 'Zebra Technologies',
      releaseDate: '2024-03-10',
      size: '24.5 MB',
      status: 'available',
      severity: 'recommended',
      compatibility: ['DS3608', 'DS3608-HP', 'DS3608-SR'],
      devices: ['SCN-001', 'SCN-002', 'SCN-003', 'SCN-004', 'SCN-005'],
      compatibleDevices: 45,
      totalDevices: 45,
      devicesUpdated: 0,
      devicesPending: 45,
      devicesFailed: 0,
      releaseNotes: [
        'Improved scan speed by 15%',
        'Fixed connectivity issues with Bluetooth',
        'Enhanced battery management',
        'Security patches',
      ],
      knownIssues: [],
      requirements: 'Minimum hardware revision 2.0',
      estimatedTime: 5,
      changelog: 'v2.2.0 - Added new scan modes, improved stability',
      tags: ['scanner', 'critical', 'performance'],
      uploadedBy: 'Admin',
      uploadedAt: '2024-03-10 14:30',
      lastModified: '2024-03-10 14:30',
    },
    {
      id: 'FW-002',
      name: 'Zebra Printer Firmware v4.2.1',
      version: '4.2.1',
      currentVersion: '4.1.3',
      deviceType: 'printer',
      deviceModel: 'Zebra ZT410',
      manufacturer: 'Zebra Technologies',
      releaseDate: '2024-03-05',
      size: '18.2 MB',
      status: 'available',
      severity: 'optional',
      compatibility: ['ZT410', 'ZT420', 'ZT610'],
      devices: ['PRN-001', 'PRN-002', 'PRN-003'],
      compatibleDevices: 28,
      totalDevices: 28,
      devicesUpdated: 0,
      devicesPending: 28,
      devicesFailed: 0,
      releaseNotes: [
        'Improved print quality at high speeds',
        'Added support for new label formats',
        'Fixed memory leak issue',
        'Network stability improvements',
      ],
      knownIssues: [],
      requirements: 'Minimum 256MB RAM',
      estimatedTime: 8,
      changelog: 'v4.2.1 - Print quality enhancements and bug fixes',
      tags: ['printer', 'optional', 'stability'],
      uploadedBy: 'Admin',
      uploadedAt: '2024-03-05 11:15',
      lastModified: '2024-03-05 11:15',
    },
    {
      id: 'FW-003',
      name: 'Impinj RFID Reader v5.3.0',
      version: '5.3.0',
      currentVersion: '5.1.2',
      deviceType: 'rfid',
      deviceModel: 'Impinj xArray',
      manufacturer: 'Impinj',
      releaseDate: '2024-03-12',
      size: '32.8 MB',
      status: 'available',
      severity: 'critical',
      compatibility: ['xArray', 'xPortal', 'R700'],
      devices: ['RDR-001', 'RDR-003', 'RDR-004'],
      compatibleDevices: 12,
      totalDevices: 12,
      devicesUpdated: 0,
      devicesPending: 12,
      devicesFailed: 0,
      releaseNotes: [
        'Critical security patch for authentication',
        'Improved read rate by 20%',
        'Fixed antenna switching issue',
        'Enhanced tag filtering',
      ],
      knownIssues: [],
      requirements: 'Network connectivity required',
      estimatedTime: 10,
      changelog: 'v5.3.0 - Security update and performance improvements',
      tags: ['rfid', 'critical', 'security'],
      uploadedBy: 'Admin',
      uploadedAt: '2024-03-12 09:45',
      lastModified: '2024-03-12 09:45',
    },
    {
      id: 'FW-004',
      name: 'Fetch Robotics AGV v4.6.0',
      version: '4.6.0',
      currentVersion: '4.5.2',
      deviceType: 'robot',
      deviceModel: 'Fetch Freight 1500',
      manufacturer: 'Fetch Robotics',
      releaseDate: '2024-03-08',
      size: '156.3 MB',
      status: 'available',
      severity: 'recommended',
      compatibility: ['Freight 1500', 'Freight 500'],
      devices: ['RBT-001', 'RBT-002'],
      compatibleDevices: 8,
      totalDevices: 8,
      devicesUpdated: 0,
      devicesPending: 8,
      devicesFailed: 0,
      releaseNotes: [
        'Improved path planning algorithm',
        'Enhanced obstacle detection',
        'Battery optimization',
        'New diagnostic features',
      ],
      knownIssues: ['Requires calibration after update'],
      requirements: 'Must be docked during update',
      estimatedTime: 25,
      changelog: 'v4.6.0 - Navigation improvements and battery optimization',
      tags: ['robot', 'recommended', 'performance'],
      uploadedBy: 'Admin',
      uploadedAt: '2024-03-08 16:20',
      lastModified: '2024-03-08 16:20',
    },
    {
      id: 'FW-005',
      name: 'Siemens Industrial Gateway v3.2.0',
      version: '3.2.0',
      currentVersion: '3.1.2',
      deviceType: 'gateway',
      deviceModel: 'Siemens IOT2050',
      manufacturer: 'Siemens',
      releaseDate: '2024-03-01',
      size: '89.4 MB',
      status: 'available',
      severity: 'recommended',
      compatibility: ['IOT2050', 'IOT2040'],
      devices: ['GTW-IND-01'],
      compatibleDevices: 5,
      totalDevices: 5,
      devicesUpdated: 0,
      devicesPending: 5,
      devicesFailed: 0,
      releaseNotes: [
        'Improved MQTT performance',
        'Added new industrial protocols',
        'Security enhancements',
        'Web interface improvements',
      ],
      knownIssues: [],
      requirements: 'Backup configuration recommended',
      estimatedTime: 15,
      changelog: 'v3.2.0 - New protocols and performance improvements',
      tags: ['gateway', 'industrial', 'recommended'],
      uploadedBy: 'Admin',
      uploadedAt: '2024-03-01 10:30',
      lastModified: '2024-03-01 10:30',
    },
    {
      id: 'FW-006',
      name: 'Cisco IoT Gateway v15.3(1)',
      version: '15.3(1)',
      currentVersion: '15.2(4)M7',
      deviceType: 'gateway',
      deviceModel: 'Cisco IR829',
      manufacturer: 'Cisco',
      releaseDate: '2024-02-28',
      size: '245.8 MB',
      status: 'beta',
      severity: 'optional',
      compatibility: ['IR829', 'IR809'],
      devices: ['GTW-MAIN-01', 'GTW-BK-01'],
      compatibleDevices: 3,
      totalDevices: 3,
      devicesUpdated: 0,
      devicesPending: 3,
      devicesFailed: 0,
      releaseNotes: [
        'New VPN features',
        'Enhanced routing protocols',
        'Security updates',
        'WebUI improvements',
      ],
      knownIssues: ['May cause reboot during upgrade', 'Compatibility issues with older configs'],
      requirements: 'Expert supervision required',
      estimatedTime: 30,
      changelog: 'v15.3(1) - New features and security updates (Beta)',
      tags: ['gateway', 'beta', 'network'],
      uploadedBy: 'Network Team',
      uploadedAt: '2024-02-28 13:45',
      lastModified: '2024-02-28 13:45',
    },
    {
      id: 'FW-007',
      name: 'Sensaphone Sensor v2.0.0',
      version: '2.0.0',
      currentVersion: '1.8.2',
      deviceType: 'sensor',
      deviceModel: 'Sensaphone 1400',
      manufacturer: 'Sensaphone',
      releaseDate: '2024-03-14',
      size: '8.2 MB',
      status: 'available',
      severity: 'critical',
      compatibility: ['1400', '1600'],
      devices: ['SEN-001', 'SEN-002', 'SEN-003'],
      compatibleDevices: 15,
      totalDevices: 15,
      devicesUpdated: 0,
      devicesPending: 15,
      devicesFailed: 0,
      releaseNotes: [
        'Critical temperature reading fix',
        'Improved accuracy',
        'Battery life optimization',
        'New alert thresholds',
      ],
      knownIssues: [],
      requirements: 'Low battery warning - ensure sufficient charge',
      estimatedTime: 3,
      changelog: 'v2.0.0 - Major update with accuracy improvements',
      tags: ['sensor', 'critical', 'accuracy'],
      uploadedBy: 'Admin',
      uploadedAt: '2024-03-14 08:15',
      lastModified: '2024-03-14 08:15',
    },
    {
      id: 'FW-008',
      name: 'Axis Camera v10.1.0',
      version: '10.1.0',
      currentVersion: '9.80.1',
      deviceType: 'camera',
      deviceModel: 'Axis P1448-LE',
      manufacturer: 'Axis Communications',
      releaseDate: '2024-03-07',
      size: '45.6 MB',
      status: 'available',
      severity: 'recommended',
      compatibility: ['P1448-LE', 'P1445-LE'],
      devices: ['CAM-001'],
      compatibleDevices: 8,
      totalDevices: 8,
      devicesUpdated: 0,
      devicesPending: 8,
      devicesFailed: 0,
      releaseNotes: [
        'Improved night vision',
        'Motion detection enhancements',
        'New analytics features',
        'Security patches',
      ],
      knownIssues: [],
      requirements: 'Camera must be idle during update',
      estimatedTime: 12,
      changelog: 'v10.1.0 - Night vision and analytics improvements',
      tags: ['camera', 'security', 'recommended'],
      uploadedBy: 'Security Team',
      uploadedAt: '2024-03-07 14:20',
      lastModified: '2024-03-07 14:20',
    },
    {
      id: 'FW-009',
      name: 'APC UPS Firmware v3.1.0',
      version: '3.1.0',
      currentVersion: '3.0.1',
      deviceType: 'ups',
      deviceModel: 'APC SMT3000',
      manufacturer: 'APC',
      releaseDate: '2024-02-25',
      size: '12.3 MB',
      status: 'available',
      severity: 'recommended',
      compatibility: ['SMT3000', 'SMT2200'],
      devices: ['UPS-001'],
      compatibleDevices: 4,
      totalDevices: 4,
      devicesUpdated: 0,
      devicesPending: 4,
      devicesFailed: 0,
      releaseNotes: [
        'Improved battery management',
        'More accurate runtime estimates',
        'Web interface fixes',
        'SNMP improvements',
      ],
      knownIssues: [],
      requirements: 'UPS must be on mains power',
      estimatedTime: 8,
      changelog: 'v3.1.0 - Battery management enhancements',
      tags: ['ups', 'power', 'recommended'],
      uploadedBy: 'Facilities',
      uploadedAt: '2024-02-25 09:30',
      lastModified: '2024-02-25 09:30',
    },
    {
      id: 'FW-010',
      name: 'Ubiquiti UniFi Gateway v3.3.0',
      version: '3.3.0',
      currentVersion: '3.2.1',
      deviceType: 'gateway',
      deviceModel: 'Ubiquiti UniFi Gateway',
      manufacturer: 'Ubiquiti',
      releaseDate: '2024-03-11',
      size: '67.8 MB',
      status: 'in_progress',
      severity: 'recommended',
      compatibility: ['UGW-3', 'UGW-4'],
      devices: ['GTW-OFF-01'],
      compatibleDevices: 2,
      totalDevices: 2,
      devicesUpdated: 1,
      devicesPending: 1,
      devicesFailed: 0,
      devicesCompleted: [
        { deviceId: 'GTW-OFF-02', completedAt: '2024-03-11 14:30' }
      ],
      devicesInProgress: [
        { deviceId: 'GTW-OFF-01', progress: 45, startedAt: '2024-03-11 15:00' }
      ],
      releaseNotes: [
        'New firewall features',
        'Improved throughput',
        'Enhanced DPI',
        'UI improvements',
      ],
      knownIssues: [],
      requirements: 'Internet connection required',
      estimatedTime: 10,
      changelog: 'v3.3.0 - Firewall and performance improvements',
      tags: ['gateway', 'network', 'in-progress'],
      uploadedBy: 'Network Team',
      uploadedAt: '2024-03-11 10:00',
      lastModified: '2024-03-11 15:30',
    },
    {
      id: 'FW-011',
      name: 'ProGlove Wearable v2.2.0',
      version: '2.2.0',
      currentVersion: '2.1.5',
      deviceType: 'wearable',
      deviceModel: 'ProGlove MARK 2',
      manufacturer: 'ProGlove',
      releaseDate: '2024-03-09',
      size: '5.6 MB',
      status: 'available',
      severity: 'optional',
      compatibility: ['MARK 2'],
      devices: ['WRL-001'],
      compatibleDevices: 12,
      totalDevices: 12,
      devicesUpdated: 0,
      devicesPending: 12,
      devicesFailed: 0,
      releaseNotes: [
        'New gesture recognition',
        'Improved haptic feedback',
        'Battery optimization',
        'Bug fixes',
      ],
      knownIssues: [],
      requirements: 'Must be in charging cradle',
      estimatedTime: 4,
      changelog: 'v2.2.0 - Gesture recognition and battery improvements',
      tags: ['wearable', 'optional', 'features'],
      uploadedBy: 'Admin',
      uploadedAt: '2024-03-09 13:15',
      lastModified: '2024-03-09 13:15',
    },
    {
      id: 'FW-012',
      name: 'Zebra TC57 Firmware v8.3.0',
      version: '8.3.0',
      currentVersion: '8.2.1',
      deviceType: 'handheld',
      deviceModel: 'Zebra TC57',
      manufacturer: 'Zebra Technologies',
      releaseDate: '2024-03-06',
      size: '156.2 MB',
      status: 'available',
      severity: 'critical',
      compatibility: ['TC57', 'TC52'],
      devices: ['HMD-001'],
      compatibleDevices: 25,
      totalDevices: 25,
      devicesUpdated: 0,
      devicesPending: 25,
      devicesFailed: 0,
      releaseNotes: [
        'Critical security patches',
        'Android security update',
        'Improved scanner performance',
        'Battery optimization',
      ],
      knownIssues: ['Requires device reboot'],
      requirements: 'Battery level > 50%',
      estimatedTime: 20,
      changelog: 'v8.3.0 - Security update and performance improvements',
      tags: ['handheld', 'critical', 'security'],
      uploadedBy: 'IT Team',
      uploadedAt: '2024-03-06 11:45',
      lastModified: '2024-03-06 11:45',
    },
  ];

  // Device types
  const deviceTypes = [
    { id: 'scanner', name: 'Scanner' },
    { id: 'printer', name: 'Printer' },
    { id: 'rfid', name: 'RFID Reader' },
    { id: 'robot', name: 'Robot' },
    { id: 'gateway', name: 'Gateway' },
    { id: 'sensor', name: 'Sensor' },
    { id: 'camera', name: 'Camera' },
    { id: 'ups', name: 'UPS' },
    { id: 'handheld', name: 'Handheld' },
    { id: 'wearable', name: 'Wearable' },
  ];

  // Status configuration
  const statusConfig = {
    available: { label: 'Available', color: 'bg-green-50 text-green-700 border-green-200', icon: Download },
    in_progress: { label: 'In Progress', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: RefreshCw },
    completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    failed: { label: 'Failed', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    beta: { label: 'Beta', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: AlertTriangle },
    scheduled: { label: 'Scheduled', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
  };

  const severityConfig = {
    critical: { label: 'Critical', color: 'bg-red-100 text-red-700' },
    recommended: { label: 'Recommended', color: 'bg-blue-100 text-blue-700' },
    optional: { label: 'Optional', color: 'bg-green-100 text-green-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Download;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getSeverityColor = (severity) => {
    return severityConfig[severity]?.color || 'bg-gray-100 text-gray-700';
  };

  const getDeviceIcon = (type) => {
    switch(type) {
      case 'scanner': return <Scan size={16} className="text-red-600" />;
      case 'printer': return <Printer size={16} className="text-red-600" />;
      case 'rfid': return <Radio size={16} className="text-red-600" />;
      case 'robot': return <Cpu size={16} className="text-red-600" />;
      case 'gateway': return <Server size={16} className="text-red-600" />;
      case 'sensor': return <Activity size={16} className="text-red-600" />;
      case 'camera': return <Monitor size={16} className="text-red-600" />;
      case 'ups': return <Zap size={16} className="text-red-600" />;
      case 'handheld': return <Smartphone size={16} className="text-red-600" />;
      case 'wearable': return <Watch size={16} className="text-red-600" />;
      default: return <Cpu size={16} className="text-red-600" />;
    }
  };

  const filteredUpdates = firmwareUpdates.filter(update => {
    const matchesStatus = selectedStatus === 'all' || update.status === selectedStatus;
    const matchesType = selectedType === 'all' || update.deviceType === selectedType;
    const matchesSeverity = selectedSeverity === 'all' || update.severity === selectedSeverity;
    const matchesSearch = update.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         update.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         update.deviceModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         update.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSeverity && matchesSearch;
  });

  const stats = {
    total: firmwareUpdates.length,
    available: firmwareUpdates.filter(f => f.status === 'available').length,
    inProgress: firmwareUpdates.filter(f => f.status === 'in_progress').length,
    completed: firmwareUpdates.filter(f => f.status === 'completed').length,
    critical: firmwareUpdates.filter(f => f.severity === 'critical').length,
    devicesPending: firmwareUpdates.reduce((sum, f) => sum + (f.devicesPending || 0), 0),
    devicesUpdated: firmwareUpdates.reduce((sum, f) => sum + (f.devicesUpdated || 0), 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Firmware Updates</h1>
            <p className="text-black/50 mt-1">Manage and deploy firmware updates across devices</p>
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
              onClick={() => setShowHistoryDialog(true)}
            >
              <History size={16} />
              History
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowSettingsDialog(true)}
            >
              <Settings size={16} />
              Settings
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowUploadDialog(true)}
            >
              <Upload size={16} />
              Upload Firmware
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Updates</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Download size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Available</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.available}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <DownloadCloud size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">In Progress</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.inProgress}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <RefreshCw size={18} className="text-blue-600" />
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
                  <AlertTriangle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Devices Pending</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.devicesPending}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Clock size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Devices Updated</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.devicesUpdated}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <CheckCircle size={18} className="text-green-600" />
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
              placeholder="Search by name, version, model, or manufacturer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="beta">Beta</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>

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

          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="optional">Optional</SelectItem>
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

      {/* Firmware Updates Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredUpdates.map((update) => {
            const StatusIcon = statusConfig[update.status]?.icon || Download;
            
            return (
              <Card key={update.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#F5EEE9] rounded-lg">
                          {getDeviceIcon(update.deviceType)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs border-0", getStatusColor(update.status))}>
                              <StatusIcon className="mr-1" size={10} />
                              {update.status}
                            </Badge>
                            <Badge className={cn("text-xs", getSeverityColor(update.severity))}>
                              {update.severity}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-black">{update.name}</h3>
                          <p className="text-xs text-black/50 mt-0.5">v{update.version}</p>
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
                            setSelectedUpdate(update);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedUpdate(update);
                            setShowDeployDialog(true);
                          }}>
                            <Play className="mr-2 h-4 w-4" />
                            Deploy
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedUpdate(update);
                            setShowScheduleDialog(true);
                          }}>
                            <Clock className="mr-2 h-4 w-4" />
                            Schedule
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedUpdate(update);
                            setShowCompatibilityDialog(true);
                          }}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Check Compatibility
                          </DropdownMenuItem>
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
                    {/* Device Info */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-black/50">{update.deviceModel}</span>
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                        {update.manufacturer}
                      </Badge>
                    </div>

                    {/* Release Date & Size */}
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={12} className="text-black/30" />
                      <span className="text-xs">{update.releaseDate}</span>
                      <span className="text-xs text-black/30">•</span>
                      <Download size={12} className="text-black/30" />
                      <span className="text-xs">{update.size}</span>
                    </div>

                    {/* Version Info */}
                    <div className="mb-2 p-2 bg-[#F5EEE9]/50 rounded-lg">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-black/50">Current</span>
                        <span className="font-mono">{update.currentVersion}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-black/50">New</span>
                        <span className="font-mono font-bold text-green-600">{update.version}</span>
                      </div>
                    </div>

                    {/* Deployment Progress (for in_progress) */}
                    {update.status === 'in_progress' && update.devicesInProgress && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-black/50">Deployment Progress</span>
                          <span className="text-xs font-medium">
                            {update.devicesCompleted?.length || 0}/{update.totalDevices}
                          </span>
                        </div>
                        <Progress 
                          value={(update.devicesCompleted?.length || 0) / update.totalDevices * 100} 
                          className="h-2 bg-[#F5EEE9]"
                        />
                        {update.devicesInProgress.map(d => (
                          <div key={d.deviceId} className="flex items-center gap-2 mt-2">
                            <RefreshCw size={10} className="animate-spin text-blue-600" />
                            <span className="text-xs">{d.deviceId}</span>
                            <span className="text-xs text-black/50 ml-auto">{d.progress}%</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Device Counts */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Compatible</p>
                        <p className="text-xs font-bold">{update.compatibleDevices}</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Pending</p>
                        <p className="text-xs font-bold text-yellow-600">{update.devicesPending}</p>
                      </div>
                    </div>

                    {/* Release Notes Preview */}
                    <div className="mb-2">
                      <p className="text-xs font-medium mb-1">Release Notes</p>
                      <ul className="text-[10px] text-black/70 list-disc list-inside">
                        {update.releaseNotes.slice(0, 2).map((note, idx) => (
                          <li key={idx} className="truncate">{note}</li>
                        ))}
                        {update.releaseNotes.length > 2 && (
                          <li className="text-black/30">+{update.releaseNotes.length - 2} more</li>
                        )}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {update.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Upload Info */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
                      <span>Uploaded: {update.uploadedAt}</span>
                      <span>by {update.uploadedBy}</span>
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
                  <TableHead className="text-black/50">Firmware</TableHead>
                  <TableHead className="text-black/50">Version</TableHead>
                  <TableHead className="text-black/50">Device Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Severity</TableHead>
                  <TableHead className="text-black/50">Release Date</TableHead>
                  <TableHead className="text-black/50 text-right">Compatible</TableHead>
                  <TableHead className="text-black/50 text-right">Pending</TableHead>
                  <TableHead className="text-black/50">Size</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUpdates.map((update) => (
                  <TableRow key={update.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(update.deviceType)}
                        <div>
                          <p className="font-medium">{update.name}</p>
                          <p className="text-xs text-black/50">{update.manufacturer}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{update.version}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {update.deviceType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(update.status))}>
                        {update.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getSeverityColor(update.severity))}>
                        {update.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{update.releaseDate}</TableCell>
                    <TableCell className="text-right">{update.compatibleDevices}</TableCell>
                    <TableCell className="text-right text-yellow-600">{update.devicesPending}</TableCell>
                    <TableCell>{update.size}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedUpdate(update);
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
                Showing {filteredUpdates.length} of {firmwareUpdates.length} updates
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

      {/* Upload Firmware Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Firmware</DialogTitle>
            <DialogDescription>
              Upload new firmware file for distribution
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Firmware File</Label>
              <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-6 text-center">
                <UploadCloud size={32} className="mx-auto text-black/30 mb-2" />
                <p className="text-sm text-black/50">Drag and drop or click to upload</p>
                <p className="text-xs text-black/30 mt-1">Supported: .bin, .img, .zip (Max 500MB)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Device Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviceTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <Input placeholder="e.g., 2.2.0" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Manufacturer</Label>
                <Input placeholder="e.g., Zebra Technologies" />
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Input placeholder="e.g., DS3608" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Release Notes</Label>
              <Textarea placeholder="Enter release notes" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Severity</Label>
              <RadioGroup defaultValue="recommended" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="critical" id="critical" />
                  <Label htmlFor="critical">Critical</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recommended" id="recommended" />
                  <Label htmlFor="recommended">Recommended</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="optional" id="optional" />
                  <Label htmlFor="optional">Optional</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Requirements</Label>
              <Textarea placeholder="Enter any requirements or prerequisites" rows={2} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Upload Firmware
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Firmware Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Firmware Details</DialogTitle>
          </DialogHeader>

          {selectedUpdate && (
            <div className="py-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F5EEE9] rounded-lg">
                  {getDeviceIcon(selectedUpdate.deviceType)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUpdate.name}</h3>
                  <p className="text-sm text-black/50">{selectedUpdate.manufacturer} • {selectedUpdate.deviceModel}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={cn("text-xs border-0", getStatusColor(selectedUpdate.status))}>
                  {selectedUpdate.status}
                </Badge>
                <Badge className={cn("text-xs", getSeverityColor(selectedUpdate.severity))}>
                  {selectedUpdate.severity}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 p-3 bg-[#F5EEE9] rounded-lg">
                <div>
                  <p className="text-xs text-black/50">Current Version</p>
                  <p className="text-sm font-mono">{selectedUpdate.currentVersion}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">New Version</p>
                  <p className="text-sm font-mono font-bold text-green-600">{selectedUpdate.version}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Release Date</p>
                  <p className="text-sm">{selectedUpdate.releaseDate}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">File Size</p>
                  <p className="text-sm">{selectedUpdate.size}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Compatible Devices</p>
                <p className="text-sm mb-1">{selectedUpdate.compatibility.join(', ')}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-black/50">Total Compatible</p>
                    <p className="text-lg font-bold">{selectedUpdate.compatibleDevices}</p>
                  </div>
                  <div>
                    <p className="text-xs text-black/50">Devices Pending</p>
                    <p className="text-lg font-bold text-yellow-600">{selectedUpdate.devicesPending}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Release Notes</p>
                <ScrollArea className="h-32">
                  <ul className="space-y-1">
                    {selectedUpdate.releaseNotes.map((note, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>

              {selectedUpdate.knownIssues && selectedUpdate.knownIssues.length > 0 && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-xs font-medium text-red-700 mb-2">Known Issues</p>
                  <ul className="space-y-1">
                    {selectedUpdate.knownIssues.map((issue, idx) => (
                      <li key={idx} className="text-xs text-red-600 flex items-start gap-2">
                        <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="text-xs text-black/50">Requirements</p>
                <p className="text-sm">{selectedUpdate.requirements}</p>
              </div>

              <div>
                <p className="text-xs text-black/50">Estimated Time</p>
                <p className="text-sm">{selectedUpdate.estimatedTime} minutes per device</p>
              </div>

              <div>
                <p className="text-xs text-black/50">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedUpdate.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-black/50">Uploaded By</p>
                  <p className="font-medium">{selectedUpdate.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-black/50">Uploaded At</p>
                  <p className="font-medium">{selectedUpdate.uploadedAt}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
              setShowDetailsDialog(false);
              setShowDeployDialog(true);
            }}>
              <Play className="mr-2 h-4 w-4" />
              Deploy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deploy Dialog */}
      <Dialog open={showDeployDialog} onOpenChange={setShowDeployDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Deploy Firmware</DialogTitle>
            <DialogDescription>
              Deploy {selectedUpdate?.name} to devices
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedUpdate?.name}</p>
              <p className="text-xs text-black/50">v{selectedUpdate?.version} • {selectedUpdate?.deviceModel}</p>
            </div>

            <div className="space-y-2">
              <Label>Deployment Strategy</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Compatible Devices</SelectItem>
                  <SelectItem value="selected">Select Specific Devices</SelectItem>
                  <SelectItem value="phased">Phased Rollout</SelectItem>
                  <SelectItem value="group">Deploy to Group</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Schedule</Label>
              <RadioGroup defaultValue="now" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="now" id="now" />
                  <Label htmlFor="now">Now</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="schedule" id="schedule" />
                  <Label htmlFor="schedule">Schedule</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Rollback on Failure</Label>
              <div className="flex items-center space-x-2">
                <Switch id="rollback" defaultChecked />
                <Label htmlFor="rollback">Automatically rollback if update fails</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notify Users</Label>
              <div className="flex items-center space-x-2">
                <Switch id="notify" defaultChecked />
                <Label htmlFor="notify">Send notification to device users</Label>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-xs text-yellow-700">
                Estimated time: {selectedUpdate?.estimatedTime * selectedUpdate?.totalDevices} minutes total
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeployDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Start Deployment
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
                onClick={() => setShowUploadDialog(true)}
              >
                <Upload size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Upload Firmware</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowHistoryDialog(true)}
              >
                <History size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Update History</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowSettingsDialog(true)}
              >
                <Settings size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default FirmwareUpdatesPage;