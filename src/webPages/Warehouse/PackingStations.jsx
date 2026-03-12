// app/dashboard/packing-stations/page.js
'use client';

import { useState } from 'react';
import { 
  Package,
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
  Calendar,
  Download,
  Upload,
  Grid,
  List,
  Ban,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  User,
  Users,
  MapPin,
  Boxes,
  PackageIcon,
  PackageCheck,
  PackageMinus,
  PackagePlus,
  Wrench,
  Tool,
  Settings2,
  Activity,
  Zap,
  BarChart3,
  Scale,
  Scan,
  Square,
  ToggleLeftIcon,
  ToggleRightIcon,
  ArrowLeftRight as ArrowLeftRightIcon,
  ArrowUpDown as ArrowUpDownIcon,
  MoveHorizontal as MoveHorizontalIcon,
  MoveVertical as MoveVerticalIcon,
  GripVertical as GripVerticalIcon,
  GripHorizontal as GripHorizontalIcon,
  PackageOpen,
  PackageIcon as PackageIconCustom,
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
  Snowflake,
  RotateCcw,
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
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PackingStationsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedOperator, setSelectedOperator] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  const [showRestockDialog, setShowRestockDialog] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample packing stations data
  const packingStations = [
    {
      id: 'PK-001',
      stationNumber: 'PK-001',
      name: 'Main Packing Station 1',
      type: 'standard',
      status: 'active',
      zone: 'Packing Zone',
      warehouse: 'Warehouse A',
      operator: 'John Doe',
      operatorId: 'USR-001',
      shift: 'morning',
      productivity: 98,
      packagesToday: 156,
      packagesHour: 24,
      avgPackingTime: 4.2,
      accuracy: 99.5,
      utilization: 85,
      queueLength: 3,
      waitingOrders: 5,
      supplies: {
        boxes: { small: 245, medium: 180, large: 95, total: 520, lowStock: [] },
        tape: { rolls: 12, low: 3 },
        labels: { sheets: 350, low: 50 },
        bubbleWrap: { rolls: 8, low: 2 },
        voidFill: { bags: 150, low: 30 },
      },
      equipment: {
        scale: { status: 'operational', lastCalibrated: '2024-03-10' },
        printer: { status: 'operational', labelPrinter: 'Zebra ZT410', lastMaintenance: '2024-03-05' },
        scanner: { status: 'operational', model: 'Zebra DS3608' },
        computer: { status: 'operational', model: 'Dell Optiplex' },
        tapeDispenser: { status: 'operational' },
      },
      dimensions: '10ft x 8ft',
      currentOrder: {
        id: 'ORD-1240',
        customer: 'John Smith',
        items: 3,
        weight: 5.2,
        priority: 'high',
        startedAt: '10:30',
      },
      lastOrder: {
        id: 'ORD-1239',
        completedAt: '10:25',
        time: 3.8,
      },
      performance: {
        daily: 156,
        weekly: 1085,
        monthly: 4560,
        accuracy: 99.5,
        avgTime: 4.2,
      },
      issues: [],
      maintenanceStatus: 'good',
      lastMaintenance: '2024-03-12',
      nextMaintenance: '2024-04-12',
      tags: ['high-volume', 'express', 'main-station'],
      notes: 'Primary station for express orders',
      history: [
        { timestamp: '2024-03-15 08:00', action: 'Shift Started', user: 'John Doe' },
        { timestamp: '2024-03-14 17:00', action: 'Shift Ended', user: 'John Doe' },
        { timestamp: '2024-03-12', action: 'Maintenance', user: 'Tech Team', notes: 'Printer cleaned' },
      ],
    },
    {
      id: 'PK-002',
      stationNumber: 'PK-002',
      name: 'Main Packing Station 2',
      type: 'standard',
      status: 'active',
      zone: 'Packing Zone',
      warehouse: 'Warehouse A',
      operator: 'Jane Smith',
      operatorId: 'USR-002',
      shift: 'morning',
      productivity: 92,
      packagesToday: 142,
      packagesHour: 21,
      avgPackingTime: 4.8,
      accuracy: 98.7,
      utilization: 78,
      queueLength: 2,
      waitingOrders: 4,
      supplies: {
        boxes: { small: 320, medium: 210, large: 120, total: 650, lowStock: [] },
        tape: { rolls: 15, low: 3 },
        labels: { sheets: 420, low: 50 },
        bubbleWrap: { rolls: 10, low: 2 },
        voidFill: { bags: 180, low: 30 },
      },
      equipment: {
        scale: { status: 'operational', lastCalibrated: '2024-03-08' },
        printer: { status: 'operational', labelPrinter: 'Zebra ZT410', lastMaintenance: '2024-03-05' },
        scanner: { status: 'operational', model: 'Zebra DS3608' },
        computer: { status: 'operational', model: 'Dell Optiplex' },
        tapeDispenser: { status: 'operational' },
      },
      dimensions: '10ft x 8ft',
      currentOrder: {
        id: 'ORD-1241',
        customer: 'Acme Corp',
        items: 5,
        weight: 8.7,
        priority: 'medium',
        startedAt: '10:28',
      },
      performance: {
        daily: 142,
        weekly: 998,
        monthly: 4230,
        accuracy: 98.7,
        avgTime: 4.8,
      },
      issues: [],
      maintenanceStatus: 'good',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-04-10',
      tags: ['high-volume', 'main-station'],
      notes: 'Second main packing station',
      history: [
        { timestamp: '2024-03-15 08:00', action: 'Shift Started', user: 'Jane Smith' },
      ],
    },
    {
      id: 'PK-003',
      stationNumber: 'PK-003',
      name: 'Express Packing Station',
      type: 'express',
      status: 'active',
      zone: 'Express Zone',
      warehouse: 'Warehouse A',
      operator: 'Mike Johnson',
      operatorId: 'USR-003',
      shift: 'morning',
      productivity: 105,
      packagesToday: 89,
      packagesHour: 18,
      avgPackingTime: 3.2,
      accuracy: 100,
      utilization: 72,
      queueLength: 1,
      waitingOrders: 2,
      supplies: {
        boxes: { small: 180, medium: 95, large: 40, total: 315, lowStock: ['large'] },
        tape: { rolls: 8, low: 2 },
        labels: { sheets: 280, low: 40 },
        bubbleWrap: { rolls: 5, low: 1 },
        voidFill: { bags: 120, low: 20 },
      },
      equipment: {
        scale: { status: 'operational', lastCalibrated: '2024-03-09' },
        printer: { status: 'operational', labelPrinter: 'Zebra ZT230', lastMaintenance: '2024-03-01' },
        scanner: { status: 'operational', model: 'Honeywell 1900' },
        computer: { status: 'operational', model: 'HP EliteDesk' },
        tapeDispenser: { status: 'operational' },
      },
      dimensions: '8ft x 6ft',
      currentOrder: {
        id: 'ORD-1242',
        customer: 'Express Customer',
        items: 1,
        weight: 1.2,
        priority: 'urgent',
        startedAt: '10:32',
      },
      performance: {
        daily: 89,
        weekly: 612,
        monthly: 2670,
        accuracy: 100,
        avgTime: 3.2,
      },
      issues: [],
      maintenanceStatus: 'good',
      lastMaintenance: '2024-03-11',
      nextMaintenance: '2024-04-11',
      tags: ['express', 'fast-moving', 'urgent'],
      notes: 'Dedicated to express/urgent orders',
      history: [
        { timestamp: '2024-03-15 08:00', action: 'Shift Started', user: 'Mike Johnson' },
      ],
    },
    {
      id: 'PK-004',
      stationNumber: 'PK-004',
      name: 'Bulk Packing Station',
      type: 'bulk',
      status: 'active',
      zone: 'Bulk Zone',
      warehouse: 'Warehouse A',
      operator: 'Sarah Wilson',
      operatorId: 'USR-004',
      shift: 'morning',
      productivity: 45,
      packagesToday: 32,
      packagesHour: 6,
      avgPackingTime: 12.5,
      accuracy: 99.2,
      utilization: 65,
      queueLength: 2,
      waitingOrders: 3,
      supplies: {
        boxes: { small: 45, medium: 60, large: 85, xl: 40, total: 230, lowStock: ['xl'] },
        tape: { rolls: 6, low: 2 },
        labels: { sheets: 150, low: 25 },
        bubbleWrap: { rolls: 12, low: 2 },
        voidFill: { bags: 200, low: 40 },
        pallets: { available: 8, low: 2 },
        stretchWrap: { rolls: 5, low: 1 },
      },
      equipment: {
        scale: { status: 'operational', model: 'Floor Scale 1000kg', lastCalibrated: '2024-03-05' },
        printer: { status: 'operational', labelPrinter: 'Zebra ZT610', lastMaintenance: '2024-03-02' },
        scanner: { status: 'operational', model: 'Zebra DS9808' },
        computer: { status: 'operational', model: 'Dell Precision' },
        palletJack: { status: 'operational' },
        stretchWrapMachine: { status: 'operational' },
      },
      dimensions: '15ft x 12ft',
      currentOrder: {
        id: 'ORD-1243',
        customer: 'Wholesale Customer',
        items: 24,
        weight: 350,
        priority: 'medium',
        startedAt: '10:15',
      },
      performance: {
        daily: 32,
        weekly: 210,
        monthly: 890,
        accuracy: 99.2,
        avgTime: 12.5,
      },
      issues: [],
      maintenanceStatus: 'good',
      lastMaintenance: '2024-03-08',
      nextMaintenance: '2024-04-08',
      tags: ['bulk', 'wholesale', 'pallet'],
      notes: 'For large/bulk orders',
      history: [
        { timestamp: '2024-03-15 08:00', action: 'Shift Started', user: 'Sarah Wilson' },
      ],
    },
    {
      id: 'PK-005',
      stationNumber: 'PK-005',
      name: 'Fragile Items Station',
      type: 'specialty',
      status: 'active',
      zone: 'Specialty Zone',
      warehouse: 'Warehouse A',
      operator: 'Emma Watson',
      operatorId: 'USR-005',
      shift: 'morning',
      productivity: 28,
      packagesToday: 22,
      packagesHour: 4,
      avgPackingTime: 8.7,
      accuracy: 100,
      utilization: 55,
      queueLength: 1,
      waitingOrders: 2,
      supplies: {
        boxes: { small: 85, medium: 42, large: 18, total: 145, lowStock: ['large'] },
        tape: { rolls: 5, low: 1 },
        labels: { sheets: 120, low: 20 },
        bubbleWrap: { rolls: 15, low: 2 },
        foamSheets: { sheets: 80, low: 15 },
        peanuts: { bags: 6, low: 1 },
        fragileStickers: { rolls: 3, low: 1 },
      },
      equipment: {
        scale: { status: 'operational', lastCalibrated: '2024-03-07' },
        printer: { status: 'operational', labelPrinter: 'Zebra ZT230' },
        scanner: { status: 'operational' },
        computer: { status: 'operational' },
        foamMachine: { status: 'operational' },
      },
      dimensions: '8ft x 8ft',
      currentOrder: {
        id: 'ORD-1244',
        customer: 'Electronics Order',
        items: 2,
        weight: 3.5,
        priority: 'high',
        startedAt: '10:25',
      },
      performance: {
        daily: 22,
        weekly: 145,
        monthly: 620,
        accuracy: 100,
        avgTime: 8.7,
      },
      issues: [],
      maintenanceStatus: 'good',
      lastMaintenance: '2024-03-09',
      nextMaintenance: '2024-04-09',
      tags: ['fragile', 'glass', 'electronics'],
      notes: 'Special handling for fragile items',
      history: [
        { timestamp: '2024-03-15 08:00', action: 'Shift Started', user: 'Emma Watson' },
      ],
    },
    {
      id: 'PK-006',
      stationNumber: 'PK-006',
      name: 'Cold Chain Packing',
      type: 'cold-chain',
      status: 'active',
      zone: 'Cold Storage',
      warehouse: 'Warehouse C',
      operator: 'Anna Taylor',
      operatorId: 'USR-006',
      shift: 'morning',
      productivity: 35,
      packagesToday: 28,
      packagesHour: 5,
      avgPackingTime: 6.8,
      accuracy: 100,
      utilization: 60,
      queueLength: 1,
      waitingOrders: 2,
      temperature: '2-4°C',
      supplies: {
        boxes: { insulated: 45, regular: 30, total: 75, lowStock: ['insulated'] },
        tape: { rolls: 4, low: 1 },
        labels: { sheets: 90, low: 15 },
        gelPacks: { frozen: 35, chilled: 42, low: 10 },
        foamInserts: { sheets: 25, low: 5 },
        temperatureLoggers: { available: 12, low: 3 },
      },
      equipment: {
        scale: { status: 'operational' },
        printer: { status: 'operational', labelPrinter: 'Zebra ZT230' },
        scanner: { status: 'operational' },
        computer: { status: 'operational' },
        refrigerator: { status: 'operational', temp: '2°C' },
        freezer: { status: 'operational', temp: '-18°C' },
      },
      dimensions: '10ft x 8ft',
      currentOrder: {
        id: 'ORD-1245',
        customer: 'Grocery Order',
        items: 8,
        weight: 12.5,
        priority: 'high',
        startedAt: '10:20',
      },
      performance: {
        daily: 28,
        weekly: 185,
        monthly: 780,
        accuracy: 100,
        avgTime: 6.8,
      },
      issues: [],
      maintenanceStatus: 'good',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-04-10',
      tags: ['cold-chain', 'perishable', 'temperature-sensitive'],
      notes: 'Maintain cold chain integrity',
      history: [
        { timestamp: '2024-03-15 08:00', action: 'Shift Started', user: 'Anna Taylor' },
      ],
    },
    {
      id: 'PK-007',
      stationNumber: 'PK-007',
      name: 'Returns Processing Station',
      type: 'returns',
      status: 'active',
      zone: 'Returns Zone',
      warehouse: 'Warehouse A',
      operator: 'Tom Brown',
      operatorId: 'USR-007',
      shift: 'morning',
      productivity: 42,
      packagesToday: 35,
      packagesHour: 6,
      avgPackingTime: 7.2,
      accuracy: 98.5,
      utilization: 70,
      queueLength: 2,
      waitingOrders: 4,
      supplies: {
        boxes: { small: 65, medium: 42, large: 28, total: 135, lowStock: [] },
        tape: { rolls: 6, low: 1 },
        labels: { sheets: 110, low: 20 },
        bubbleWrap: { rolls: 4, low: 1 },
        returnLabels: { sheets: 45, low: 10 },
      },
      equipment: {
        scale: { status: 'operational' },
        printer: { status: 'operational', labelPrinter: 'Zebra ZT230' },
        scanner: { status: 'operational' },
        computer: { status: 'operational' },
        inspectionStation: { status: 'operational' },
      },
      dimensions: '8ft x 8ft',
      currentOrder: {
        id: 'RMA-001',
        customer: 'Return Processing',
        items: 3,
        weight: 4.2,
        priority: 'medium',
        startedAt: '10:22',
      },
      performance: {
        daily: 35,
        weekly: 245,
        monthly: 1020,
        accuracy: 98.5,
        avgTime: 7.2,
      },
      issues: [],
      maintenanceStatus: 'good',
      lastMaintenance: '2024-03-11',
      nextMaintenance: '2024-04-11',
      tags: ['returns', 'inspection', 'processing'],
      notes: 'Process returns and RMA items',
      history: [
        { timestamp: '2024-03-15 08:00', action: 'Shift Started', user: 'Tom Brown' },
      ],
    },
    {
      id: 'PK-008',
      stationNumber: 'PK-008',
      name: 'Station 8',
      type: 'standard',
      status: 'idle',
      zone: 'Packing Zone',
      warehouse: 'Warehouse A',
      operator: null,
      operatorId: null,
      shift: null,
      productivity: 0,
      packagesToday: 0,
      packagesHour: 0,
      avgPackingTime: 0,
      accuracy: 0,
      utilization: 0,
      queueLength: 0,
      waitingOrders: 0,
      supplies: {
        boxes: { small: 200, medium: 150, large: 100, total: 450, lowStock: [] },
        tape: { rolls: 10, low: 0 },
        labels: { sheets: 300, low: 0 },
        bubbleWrap: { rolls: 8, low: 0 },
        voidFill: { bags: 200, low: 0 },
      },
      equipment: {
        scale: { status: 'operational' },
        printer: { status: 'operational' },
        scanner: { status: 'operational' },
        computer: { status: 'operational' },
        tapeDispenser: { status: 'operational' },
      },
      dimensions: '10ft x 8ft',
      currentOrder: null,
      performance: {
        daily: 0,
        weekly: 0,
        monthly: 0,
        accuracy: 0,
        avgTime: 0,
      },
      issues: [],
      maintenanceStatus: 'good',
      lastMaintenance: '2024-03-13',
      nextMaintenance: '2024-04-13',
      tags: ['idle', 'available'],
      notes: 'Available for assignment',
      history: [
        { timestamp: '2024-03-15 09:00', action: 'Idle', user: 'System' },
      ],
    },
    {
      id: 'PK-009',
      stationNumber: 'PK-009',
      name: 'Station 9',
      type: 'standard',
      status: 'maintenance',
      zone: 'Packing Zone',
      warehouse: 'Warehouse A',
      operator: null,
      operatorId: null,
      shift: null,
      productivity: 0,
      packagesToday: 0,
      packagesHour: 0,
      avgPackingTime: 0,
      accuracy: 0,
      utilization: 0,
      queueLength: 0,
      waitingOrders: 0,
      supplies: {
        boxes: { small: 150, medium: 120, large: 80, total: 350, lowStock: [] },
        tape: { rolls: 8, low: 0 },
        labels: { sheets: 250, low: 0 },
        bubbleWrap: { rolls: 6, low: 0 },
        voidFill: { bags: 150, low: 0 },
      },
      equipment: {
        scale: { status: 'faulty', issue: 'Calibration error' },
        printer: { status: 'operational' },
        scanner: { status: 'operational' },
        computer: { status: 'operational' },
        tapeDispenser: { status: 'operational' },
      },
      dimensions: '10ft x 8ft',
      currentOrder: null,
      performance: {
        daily: 0,
        weekly: 0,
        monthly: 0,
        accuracy: 0,
        avgTime: 0,
      },
      issues: ['Scale calibration needed'],
      maintenanceStatus: 'required',
      maintenanceReason: 'Scale calibration error',
      estimatedRepair: '2024-03-16',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-04-01',
      tags: ['maintenance', 'out-of-service'],
      notes: 'Scale needs calibration',
      history: [
        { timestamp: '2024-03-15 08:30', action: 'Maintenance Required', user: 'Operator', reason: 'Scale error' },
      ],
    },
    {
      id: 'PK-010',
      stationNumber: 'PK-010',
      name: 'Weekend Backup Station',
      type: 'standard',
      status: 'inactive',
      zone: 'Packing Zone',
      warehouse: 'Warehouse A',
      operator: null,
      operatorId: null,
      shift: null,
      productivity: 0,
      packagesToday: 0,
      packagesHour: 0,
      avgPackingTime: 0,
      accuracy: 0,
      utilization: 0,
      queueLength: 0,
      waitingOrders: 0,
      supplies: {
        boxes: { small: 100, medium: 80, large: 50, total: 230, lowStock: [] },
        tape: { rolls: 5, low: 0 },
        labels: { sheets: 150, low: 0 },
        bubbleWrap: { rolls: 4, low: 0 },
        voidFill: { bags: 100, low: 0 },
      },
      equipment: {
        scale: { status: 'operational' },
        printer: { status: 'operational' },
        scanner: { status: 'operational' },
        computer: { status: 'operational' },
        tapeDispenser: { status: 'operational' },
      },
      dimensions: '10ft x 8ft',
      currentOrder: null,
      performance: {
        daily: 0,
        weekly: 0,
        monthly: 0,
        accuracy: 0,
        avgTime: 0,
      },
      issues: [],
      maintenanceStatus: 'good',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-04-10',
      tags: ['backup', 'inactive', 'weekend'],
      notes: 'Used only during peak periods',
      history: [
        { timestamp: '2024-03-14', action: 'Deactivated', user: 'Manager' },
      ],
    },
  ];

  // Station types
  const stationTypes = [
    { id: 'standard', name: 'Standard', icon: Package, color: 'bg-blue-100 text-blue-700' },
    { id: 'express', name: 'Express', icon: Zap, color: 'bg-green-100 text-green-700' },
    { id: 'bulk', name: 'Bulk', icon: Boxes, color: 'bg-purple-100 text-purple-700' },
    { id: 'specialty', name: 'Specialty', icon: PackageOpen, color: 'bg-orange-100 text-orange-700' },
    { id: 'cold-chain', name: 'Cold Chain', icon: Snowflake, color: 'bg-cyan-100 text-cyan-700' },
    { id: 'returns', name: 'Returns', icon: RotateCcw, color: 'bg-yellow-100 text-yellow-700' },
  ];

  // Zones
  const zones = [
    { id: 'packing', name: 'Packing Zone', count: 6 },
    { id: 'express', name: 'Express Zone', count: 1 },
    { id: 'bulk', name: 'Bulk Zone', count: 1 },
    { id: 'specialty', name: 'Specialty Zone', count: 1 },
    { id: 'cold', name: 'Cold Storage', count: 1 },
    { id: 'returns', name: 'Returns Zone', count: 1 },
  ];

  // Operators
  const operators = [
    { id: 'USR-001', name: 'John Doe', station: 'PK-001', active: true, packages: 156, avatar: null, initials: 'JD' },
    { id: 'USR-002', name: 'Jane Smith', station: 'PK-002', active: true, packages: 142, avatar: null, initials: 'JS' },
    { id: 'USR-003', name: 'Mike Johnson', station: 'PK-003', active: true, packages: 89, avatar: null, initials: 'MJ' },
    { id: 'USR-004', name: 'Sarah Wilson', station: 'PK-004', active: true, packages: 32, avatar: null, initials: 'SW' },
    { id: 'USR-005', name: 'Emma Watson', station: 'PK-005', active: true, packages: 22, avatar: null, initials: 'EW' },
    { id: 'USR-006', name: 'Anna Taylor', station: 'PK-006', active: true, packages: 28, avatar: null, initials: 'AT' },
    { id: 'USR-007', name: 'Tom Brown', station: 'PK-007', active: true, packages: 35, avatar: null, initials: 'TB' },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    idle: { label: 'Idle', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    maintenance: { label: 'Maintenance', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Wrench },
    inactive: { label: 'Inactive', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
  };

  const maintenanceStatusConfig = {
    good: { label: 'Good', color: 'bg-green-100 text-green-700' },
    warning: { label: 'Warning', color: 'bg-yellow-100 text-yellow-700' },
    required: { label: 'Required', color: 'bg-red-100 text-red-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getStationTypeColor = (type) => {
    const found = stationTypes.find(t => t.id === type);
    return found?.color || 'bg-gray-100 text-gray-700';
  };

  const getStationTypeIcon = (type) => {
    const found = stationTypes.find(t => t.id === type);
    const Icon = found?.icon || Package;
    return Icon;
  };

  const getMaintenanceStatusColor = (status) => {
    return maintenanceStatusConfig[status]?.color || 'bg-gray-100 text-gray-700';
  };

  const filteredStations = packingStations.filter(station => {
    const matchesStatus = selectedStatus === 'all' || station.status === selectedStatus;
    const matchesZone = selectedZone === 'all' || station.zone === selectedZone;
    const matchesOperator = selectedOperator === 'all' || station.operator === selectedOperator;
    const matchesSearch = station.stationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         station.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (station.operator && station.operator.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesZone && matchesOperator && matchesSearch;
  });

  const stats = {
    total: packingStations.length,
    active: packingStations.filter(s => s.status === 'active').length,
    idle: packingStations.filter(s => s.status === 'idle').length,
    maintenance: packingStations.filter(s => s.status === 'maintenance').length,
    inactive: packingStations.filter(s => s.status === 'inactive').length,
    totalPackages: packingStations.reduce((sum, s) => sum + s.packagesToday, 0),
    avgProductivity: Math.round(packingStations.filter(s => s.status === 'active').reduce((sum, s) => sum + s.productivity, 0) / packingStations.filter(s => s.status === 'active').length) || 0,
    stationsWithIssues: packingStations.filter(s => s.issues && s.issues.length > 0).length,
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Packing Stations</h1>
            <p className="text-black/50 mt-1">Manage and monitor packing station operations</p>
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
              <BarChart3 size={16} />
              Reports
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowSettingsDialog(true)}
            >
              <Settings2 size={16} />
              Settings
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Add Station
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Stations</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Package size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.active}</p>
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
                  <p className="text-xs text-black/50">Idle</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.idle}</p>
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
                  <p className="text-xs text-black/50">Inactive</p>
                  <p className="text-xl font-bold text-gray-600 mt-1">{stats.inactive}</p>
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
                  <p className="text-xs text-black/50">Today's Packed</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalPackages}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <PackageCheck size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Productivity</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.avgProductivity}%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Activity size={18} className="text-purple-600" />
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
              placeholder="Search by station number, name, zone, or operator..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="idle">Idle</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map(zone => (
                <SelectItem key={zone.id} value={zone.name}>{zone.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedOperator} onValueChange={setSelectedOperator}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Operators</SelectItem>
              {operators.map(op => (
                <SelectItem key={op.id} value={op.name}>{op.name}</SelectItem>
              ))}
              <SelectItem value="unassigned">Unassigned</SelectItem>
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

      {/* Stations Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredStations.map((station) => {
            const StatusIcon = statusConfig[station.status]?.icon || CheckCircle;
            const TypeIcon = getStationTypeIcon(station.type);
            
            return (
              <Card key={station.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={cn("p-4 rounded-t-lg border-b border-[#F5EEE9]", getStationTypeColor(station.type))}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/30 rounded-lg backdrop-blur-sm">
                          <TypeIcon size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs border-0", getStatusColor(station.status))}>
                              <StatusIcon className="mr-1" size={10} />
                              {station.status}
                            </Badge>
                            <Badge className="bg-white/30 text-white text-xs border-0">
                              {station.type}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-white">{station.stationNumber}</h3>
                          <p className="text-xs text-white/80 mt-0.5">{station.name}</p>
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
                            setSelectedStation(station);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {station.status === 'active' && station.operator && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedStation(station);
                              setShowRestockDialog(true);
                            }}>
                              <PackagePlus className="mr-2 h-4 w-4" />
                              Request Supplies
                            </DropdownMenuItem>
                          )}
                          {station.status !== 'maintenance' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedStation(station);
                              setShowMaintenanceDialog(true);
                            }}>
                              <Wrench className="mr-2 h-4 w-4" />
                              Report Issue
                            </DropdownMenuItem>
                          )}
                          {station.status === 'idle' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedStation(station);
                              setShowAssignDialog(true);
                            }}>
                              <User className="mr-2 h-4 w-4" />
                              Assign Operator
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            Print Label
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
                    {/* Operator & Zone */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-red-600" />
                        <span className="text-xs">{station.zone}</span>
                      </div>
                      {station.operator ? (
                        <div className="flex items-center gap-1">
                          <User size={12} className="text-blue-600" />
                          <span className="text-xs font-medium">{station.operator}</span>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          Unassigned
                        </Badge>
                      )}
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[10px] text-black/50">Today</p>
                        <p className="text-sm font-bold text-black">{station.packagesToday}</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[10px] text-black/50">Pk/Hr</p>
                        <p className="text-sm font-bold text-blue-600">{station.packagesHour}</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[10px] text-black/50">Avg</p>
                        <p className="text-sm font-bold text-green-600">{station.avgPackingTime}m</p>
                      </div>
                    </div>

                    {/* Current Order */}
                    {station.currentOrder && (
                      <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-blue-700">{station.currentOrder.id}</p>
                          <Badge className={cn(
                            "text-[10px]",
                            station.currentOrder.priority === 'urgent' && 'bg-red-100 text-red-700',
                            station.currentOrder.priority === 'high' && 'bg-orange-100 text-orange-700',
                            station.currentOrder.priority === 'medium' && 'bg-yellow-100 text-yellow-700',
                          )}>
                            {station.currentOrder.priority}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-blue-600 mt-1">
                          Items: {station.currentOrder.items} • Weight: {station.currentOrder.weight}kg
                        </p>
                      </div>
                    )}

                    {/* Queue Info */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-black/30" />
                        <span className="text-black/50">Queue:</span>
                        <span className="font-medium">{station.queueLength}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package size={12} className="text-black/30" />
                        <span className="text-black/50">Waiting:</span>
                        <span className="font-medium">{station.waitingOrders}</span>
                      </div>
                    </div>

                    {/* Supplies Status */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Supplies</span>
                        {station.supplies.boxes.lowStock.length > 0 && (
                          <Badge className="bg-yellow-100 text-yellow-700 text-[10px]">
                            Low: {station.supplies.boxes.lowStock.join(', ')}
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="p-1 bg-[#F5EEE9] rounded text-center">
                                <p className="text-[8px] text-black/50">Boxes</p>
                                <p className="text-xs font-medium">{station.supplies.boxes.total}</p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>S: {station.supplies.boxes.small} M: {station.supplies.boxes.medium} L: {station.supplies.boxes.large}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div className="p-1 bg-[#F5EEE9] rounded text-center">
                          <p className="text-[8px] text-black/50">Tape</p>
                          <p className="text-xs font-medium">{station?.supplies?.tape?.rolls}</p>
                        </div>
                        <div className="p-1 bg-[#F5EEE9] rounded text-center">
                          <p className="text-[8px] text-black/50">Labels</p>
                          <p className="text-xs font-medium">{station?.supplies?.labels?.sheets}</p>
                        </div>
                        <div className="p-1 bg-[#F5EEE9] rounded text-center">
                          <p className="text-[8px] text-black/50">Wrap</p>
                          <p className="text-xs font-medium">{station?.supplies?.bubbleWrap?.rolls}</p>
                        </div>
                      </div>
                    </div>

                    {/* Equipment Status */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Scale size={12} className={station.equipment.scale.status === 'operational' ? 'text-green-600' : 'text-red-600'} />
                        <span className="text-[10px]">Scale</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Printer size={12} className={station.equipment.printer.status === 'operational' ? 'text-green-600' : 'text-red-600'} />
                        <span className="text-[10px]">Printer</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Scan size={12} className={station.equipment.scanner.status === 'operational' ? 'text-green-600' : 'text-red-600'} />
                        <span className="text-[10px]">Scanner</span>
                      </div>
                    </div>

                    {/* Maintenance Status */}
                    <div className="flex items-center justify-between text-xs border-t border-[#F5EEE9] pt-3">
                      <div className="flex items-center gap-1">
                        <Wrench size={12} className="text-black/30" />
                        <Badge className={cn("text-[10px]", getMaintenanceStatusColor(station.maintenanceStatus))}>
                          {station.maintenanceStatus}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-black/50">Next: {station.nextMaintenance}</span>
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
                  <TableHead className="text-black/50">Station</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Zone</TableHead>
                  <TableHead className="text-black/50">Operator</TableHead>
                  <TableHead className="text-black/50 text-right">Today</TableHead>
                  <TableHead className="text-black/50 text-right">Pk/Hr</TableHead>
                  <TableHead className="text-black/50 text-right">Avg Time</TableHead>
                  <TableHead className="text-black/50 text-right">Accuracy</TableHead>
                  <TableHead className="text-black/50">Queue</TableHead>
                  <TableHead className="text-black/50">Current Order</TableHead>
                  <TableHead className="text-black/50">Maintenance</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStations.map((station) => (
                  <TableRow key={station.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{station.stationNumber}</p>
                        <p className="text-xs text-black/50">{station.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getStationTypeColor(station.type))}>
                        {station.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(station.status))}>
                        {station.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{station.zone}</TableCell>
                    <TableCell>{station.operator || '—'}</TableCell>
                    <TableCell className="text-right">{station.packagesToday}</TableCell>
                    <TableCell className="text-right">{station.packagesHour}</TableCell>
                    <TableCell className="text-right">{station.avgPackingTime}m</TableCell>
                    <TableCell className="text-right text-green-600">{station.accuracy}%</TableCell>
                    <TableCell>{station.queueLength}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {station.currentOrder?.id || '—'}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getMaintenanceStatusColor(station.maintenanceStatus))}>
                        {station.maintenanceStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedStation(station);
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
                Showing {filteredStations.length} of {packingStations.length} stations
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

      {/* Create Station Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Packing Station</DialogTitle>
            <DialogDescription>
              Create a new packing station
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="supplies">Initial Supplies</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Station Number</Label>
                    <Input placeholder="e.g., PK-011" />
                  </div>
                  <div className="space-y-2">
                    <Label>Station Name</Label>
                    <Input placeholder="e.g., Standard Station 11" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Station Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {stationTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Zone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {zones.map(zone => (
                          <SelectItem key={zone.id} value={zone.name}>{zone.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dimensions</Label>
                  <Input placeholder="e.g., 10ft x 8ft" />
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes" rows={3} />
                </div>
              </TabsContent>

              <TabsContent value="equipment" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Scale Model</Label>
                    <Input placeholder="e.g., Floor Scale 1000kg" />
                  </div>
                  <div className="space-y-2">
                    <Label>Printer Model</Label>
                    <Input placeholder="e.g., Zebra ZT410" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Scanner Model</Label>
                    <Input placeholder="e.g., Zebra DS3608" />
                  </div>
                  <div className="space-y-2">
                    <Label>Computer Model</Label>
                    <Input placeholder="e.g., Dell Optiplex" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Additional Equipment</Label>
                  <Textarea placeholder="e.g., Tape dispenser, stretch wrap machine" rows={3} />
                </div>
              </TabsContent>

              <TabsContent value="supplies" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Small Boxes</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Medium Boxes</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Large Boxes</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tape Rolls</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Label Sheets</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bubble Wrap Rolls</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Void Fill Bags</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Station
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Station Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Packing Station Details</DialogTitle>
          </DialogHeader>

          {selectedStation && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="supplies">Supplies</TabsTrigger>
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", getStationTypeColor(selectedStation.type))}>
                      {(() => {
                        const Icon = getStationTypeIcon(selectedStation.type);
                        return <Icon size={20} className="text-white" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedStation.stationNumber}</h3>
                      <p className="text-sm text-black/50">{selectedStation.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Status</p>
                      <Badge className={cn("text-xs border-0", getStatusColor(selectedStation.status))}>
                        {selectedStation.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Type</p>
                      <Badge className={cn("text-xs", getStationTypeColor(selectedStation.type))}>
                        {selectedStation.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Zone</p>
                      <p className="text-sm font-medium">{selectedStation.zone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Warehouse</p>
                      <p className="text-sm font-medium">{selectedStation.warehouse}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-[#F5EEE9] rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-black/50">Today</p>
                      <p className="text-lg font-bold">{selectedStation.packagesToday}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-black/50">Productivity</p>
                      <p className="text-lg font-bold text-green-600">{selectedStation.productivity}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-black/50">Accuracy</p>
                      <p className="text-lg font-bold text-blue-600">{selectedStation.accuracy}%</p>
                    </div>
                  </div>

                  {selectedStation.operator && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">Current Operator</p>
                      <p className="text-sm font-medium">{selectedStation.operator}</p>
                      <p className="text-xs text-blue-600">Shift: {selectedStation.shift}</p>
                    </div>
                  )}

                  {selectedStation.currentOrder && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-700">Current Order</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{selectedStation.currentOrder.id}</p>
                        <Badge className={cn(
                          "text-xs",
                          selectedStation.currentOrder.priority === 'urgent' && 'bg-red-100 text-red-700',
                          selectedStation.currentOrder.priority === 'high' && 'bg-orange-100 text-orange-700',
                        )}>
                          {selectedStation.currentOrder.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        Customer: {selectedStation.currentOrder.customer} • Items: {selectedStation.currentOrder.items} • Weight: {selectedStation.currentOrder.weight}kg
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-black/50">Queue Length</p>
                      <p className="text-sm font-medium">{selectedStation.queueLength}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Waiting Orders</p>
                      <p className="text-sm font-medium">{selectedStation.waitingOrders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Avg Pack Time</p>
                      <p className="text-sm font-medium">{selectedStation.avgPackingTime} min</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Packages/Hour</p>
                      <p className="text-sm font-medium">{selectedStation.packagesHour}</p>
                    </div>
                  </div>

                  {selectedStation.issues && selectedStation.issues.length > 0 && (
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-xs font-medium text-red-700 mb-1">Issues</p>
                      {selectedStation.issues.map((issue, idx) => (
                        <p key={idx} className="text-xs text-red-600">• {issue}</p>
                      ))}
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedStation.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedStation.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedStation.notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="supplies" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardHeader className="p-3 pb-0">
                        <CardTitle className="text-sm">Boxes</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-black/50">Small</span>
                            <span className="text-sm font-medium">{selectedStation.supplies.boxes.small}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-black/50">Medium</span>
                            <span className="text-sm font-medium">{selectedStation.supplies.boxes.medium}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-black/50">Large</span>
                            <span className="text-sm font-medium">{selectedStation.supplies.boxes.large}</span>
                          </div>
                          {selectedStation.supplies.boxes.xl && (
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-black/50">XL</span>
                              <span className="text-sm font-medium">{selectedStation.supplies.boxes.xl}</span>
                            </div>
                          )}
                          <Separator className="my-2" />
                          <div className="flex items-center justify-between font-medium">
                            <span className="text-xs">Total</span>
                            <span className="text-sm">{selectedStation.supplies.boxes.total}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-[#F5EEE9]">
                      <CardHeader className="p-3 pb-0">
                        <CardTitle className="text-sm">Packing Materials</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-black/50">Tape Rolls</span>
                            <span className="text-sm font-medium">{selectedStation?.supplies?.tape?.rolls}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-black/50">Label Sheets</span>
                            <span className="text-sm font-medium">{selectedStation?.supplies?.labels?.sheets}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-black/50">Bubble Wrap</span>
                            <span className="text-sm font-medium">{selectedStation?.supplies?.bubbleWrap?.rolls}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-black/50">Void Fill</span>
                            <span className="text-sm font-medium">{selectedStation?.supplies?.voidFill?.bags}</span>
                          </div>
                          {selectedStation.supplies.foamSheets && (
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-black/50">Foam Sheets</span>
                              <span className="text-sm font-medium">{selectedStation.supplies.foamSheets.sheets}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedStation.supplies.lowStock && selectedStation.supplies.lowStock.length > 0 && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs font-medium text-yellow-700">Low Stock Items</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedStation.supplies.lowStock.map((item) => (
                          <Badge key={item} className="bg-yellow-100 text-yellow-700">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button className="w-full" variant="outline" onClick={() => setShowRestockDialog(true)}>
                    <PackagePlus className="mr-2 h-4 w-4" />
                    Request Restock
                  </Button>
                </TabsContent>

                <TabsContent value="equipment" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardHeader className="p-3 pb-0">
                        <CardTitle className="text-sm">Scale</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-black/50">Status</span>
                          <Badge className={cn(
                            "text-xs",
                            selectedStation.equipment.scale.status === 'operational' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          )}>
                            {selectedStation.equipment.scale.status}
                          </Badge>
                        </div>
                        {selectedStation.equipment.scale.lastCalibrated && (
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-black/50">Last Calibrated</span>
                            <span className="text-xs">{selectedStation.equipment.scale.lastCalibrated}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-[#F5EEE9]">
                      <CardHeader className="p-3 pb-0">
                        <CardTitle className="text-sm">Printer</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-black/50">Status</span>
                          <Badge className={cn(
                            "text-xs",
                            selectedStation.equipment.printer.status === 'operational' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          )}>
                            {selectedStation.equipment.printer.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-black/50">Model</span>
                          <span className="text-xs">{selectedStation.equipment.printer.labelPrinter}</span>
                        </div>
                        {selectedStation.equipment.printer.lastMaintenance && (
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-black/50">Last Maintenance</span>
                            <span className="text-xs">{selectedStation.equipment.printer.lastMaintenance}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-[#F5EEE9]">
                      <CardHeader className="p-3 pb-0">
                        <CardTitle className="text-sm">Scanner</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-black/50">Status</span>
                          <Badge className={cn(
                            "text-xs",
                            selectedStation.equipment.scanner.status === 'operational' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          )}>
                            {selectedStation.equipment.scanner.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-black/50">Model</span>
                          <span className="text-xs">{selectedStation.equipment.scanner.model}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-[#F5EEE9]">
                      <CardHeader className="p-3 pb-0">
                        <CardTitle className="text-sm">Computer</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-black/50">Status</span>
                          <Badge className={cn(
                            "text-xs",
                            selectedStation.equipment.computer.status === 'operational' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          )}>
                            {selectedStation.equipment.computer.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-black/50">Model</span>
                          <span className="text-xs">{selectedStation.equipment.computer.model}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedStation.type === 'cold-chain' && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">Temperature: {selectedStation.temperature}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedStation.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-0.5">
                            {item.action === 'Shift Started' && <Play size={12} className="text-green-600" />}
                            {item.action === 'Shift Ended' && <Square size={12} className="text-gray-600" />}
                            {item.action === 'Maintenance' && <Wrench size={12} className="text-orange-600" />}
                            {item.action === 'Maintenance Required' && <AlertTriangle size={12} className="text-red-600" />}
                            {item.action === 'Idle' && <Clock size={12} className="text-yellow-600" />}
                            {item.action === 'Deactivated' && <Ban size={12} className="text-red-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.timestamp}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
                            {item.notes && <p className="text-[10px] text-black/70">{item.notes}</p>}
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
            {selectedStation?.status === 'idle' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowAssignDialog(true);
              }}>
                <User className="mr-2 h-4 w-4" />
                Assign Operator
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restock Dialog */}
      <Dialog open={showRestockDialog} onOpenChange={setShowRestockDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Request Supplies</DialogTitle>
            <DialogDescription>
              Request restock for packing supplies
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedStation?.stationNumber}</p>
              <p className="text-xs text-black/50">{selectedStation?.name}</p>
            </div>

            <div className="space-y-2">
              <Label>Item to Restock</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small-boxes">Small Boxes</SelectItem>
                  <SelectItem value="medium-boxes">Medium Boxes</SelectItem>
                  <SelectItem value="large-boxes">Large Boxes</SelectItem>
                  <SelectItem value="tape">Tape Rolls</SelectItem>
                  <SelectItem value="labels">Label Sheets</SelectItem>
                  <SelectItem value="bubble-wrap">Bubble Wrap</SelectItem>
                  <SelectItem value="void-fill">Void Fill</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input type="number" placeholder="Enter quantity" />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRestockDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Submit Request
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
            <TooltipContent side="left">Add Station</TooltipContent>
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
            <TooltipContent side="left">Scan Package</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowReportDialog(true)}
              >
                <BarChart3 size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Reports</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PackingStationsPage;