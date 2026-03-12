// app/dashboard/warehouse-zones/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Grid,
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
  Grid3x3,
  List,
  X,
  ChevronDown,
  ChevronRight,
  Check,
  Ban,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  User,
  Users,
  MapPin,
  Tag,
  Hash,
  DollarSign,
  Percent,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Move,
  MoveHorizontal,
  MoveVertical,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Layers,
  Box,
  Boxes,
  PackageIcon,
  PackageCheck,
  PackageMinus,
  PackagePlus,
  PackageX,
  PackageSearch,
  Crate,
  Pallet,
  Container,
  Warehouse,
  Store,
  Building2,
  Home,
  Factory,
  Briefcase,
  Building,
  Wrench,
  Tool,
  Settings2,
  Sliders,
  Gauge,
  Activity,
  Zap,
  History,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Scale,
  Weight,
  Ruler,
  QrCode,
  Barcode,
  Scan,
  Camera,
  Map,
  MapPinned,
  Navigation,
  Compass,
  Crosshair,
  Target,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Pentagon,
  RectangleHorizontal,
  RectangleVertical,
  Cuboid,
  Cylinder,
  Cone,
  Pyramid,
  Layers3,
  LayoutGrid,
  LayoutList,
  LayoutDashboard,
  Columns,
  Rows,
  Split,
  Combine,
  GridIcon,
  Snowflake,
  Truck,
  Droplet,
  Thermometer
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

const WarehouseZonesPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [showHeatmapDialog, setShowHeatmapDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showOptimizeDialog, setShowOptimizeDialog] = useState(false);
  const [showLayoutDialog, setShowLayoutDialog] = useState(false);
  const [showBinDialog, setShowBinDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample warehouse zones data
  const warehouseZones = [
    {
      id: 'ZN-001',
      name: 'Receiving Zone',
      code: 'REC-01',
      warehouse: 'Warehouse A',
      type: 'receiving',
      status: 'active',
      capacity: 500,
      used: 320,
      unit: 'pallets',
      utilization: 64,
      temperature: 'ambient',
      humidity: '45%',
      floorArea: '5000 sq ft',
      dimensions: '100ft x 50ft',
      height: '30ft',
      volume: '150000 cu ft',
      location: 'North Wing',
      coordinates: { x: 10, y: 20, z: 1 },
      aisles: ['A1', 'A2', 'A3'],
      bins: 150,
      occupiedBins: 98,
      emptyBins: 52,
      reservedBins: 25,
      maintenanceBins: 5,
      quarantineBins: 0,
      zoneManager: 'John Doe',
      contact: 'john.doe@example.com',
      extension: '1234',
      safetyOfficer: 'Jane Smith',
      fireExtinguishers: 4,
      emergencyExits: 2,
      lighting: 'LED',
      powerOutlets: 12,
      wifiCoverage: 'excellent',
      lastAudit: '2024-03-01',
      nextAudit: '2024-06-01',
      auditStatus: 'compliant',
      tags: ['receiving', 'inbound', 'high-traffic'],
      notes: 'Main receiving area for all incoming shipments',
      history: [
        { date: '2024-03-01', action: 'Audit', performedBy: 'Audit Team', result: 'Passed' },
        { date: '2024-02-15', action: 'Maintenance', performedBy: 'Facilities', notes: 'Lighting replaced' },
      ],
    },
    {
      id: 'ZN-002',
      name: 'Storage Zone A',
      code: 'STR-01',
      warehouse: 'Warehouse A',
      type: 'storage',
      subType: 'pallet-racking',
      status: 'active',
      capacity: 5000,
      used: 4250,
      unit: 'pallets',
      utilization: 85,
      temperature: 'ambient',
      humidity: '40%',
      floorArea: '15000 sq ft',
      dimensions: '150ft x 100ft',
      height: '40ft',
      volume: '600000 cu ft',
      location: 'Central Wing',
      coordinates: { x: 20, y: 30, z: 1 },
      aisles: ['B1', 'B2', 'B3', 'B4', 'B5'],
      racks: 250,
      levels: 5,
      bins: 1250,
      occupiedBins: 1062,
      emptyBins: 188,
      reservedBins: 45,
      maintenanceBins: 12,
      quarantineBins: 0,
      zoneManager: 'Mike Johnson',
      contact: 'mike.johnson@example.com',
      extension: '1235',
      safetyOfficer: 'Sarah Wilson',
      fireExtinguishers: 8,
      emergencyExits: 4,
      lighting: 'LED High Bay',
      powerOutlets: 24,
      wifiCoverage: 'excellent',
      lastAudit: '2024-02-28',
      nextAudit: '2024-05-28',
      auditStatus: 'compliant',
      tags: ['storage', 'pallet-racking', 'high-density'],
      notes: 'Main storage area for bulk items',
      history: [
        { date: '2024-02-28', action: 'Audit', performedBy: 'Audit Team', result: 'Passed' },
        { date: '2024-02-10', action: 'Inventory Count', performedBy: 'Inventory Team', notes: 'Cycle count completed' },
      ],
    },
    {
      id: 'ZN-003',
      name: 'Storage Zone B',
      code: 'STR-02',
      warehouse: 'Warehouse A',
      type: 'storage',
      subType: 'bulk-storage',
      status: 'active',
      capacity: 3000,
      used: 2100,
      unit: 'pallets',
      utilization: 70,
      temperature: 'ambient',
      humidity: '42%',
      floorArea: '10000 sq ft',
      dimensions: '100ft x 100ft',
      height: '30ft',
      volume: '300000 cu ft',
      location: 'East Wing',
      coordinates: { x: 30, y: 40, z: 1 },
      aisles: ['C1', 'C2', 'C3'],
      floorPositions: 200,
      bins: 200,
      occupiedBins: 140,
      emptyBins: 60,
      reservedBins: 15,
      maintenanceBins: 0,
      quarantineBins: 0,
      zoneManager: 'Lisa Chen',
      contact: 'lisa.chen@example.com',
      extension: '1236',
      safetyOfficer: 'Tom Brown',
      fireExtinguishers: 6,
      emergencyExits: 3,
      lighting: 'LED',
      powerOutlets: 16,
      wifiCoverage: 'good',
      lastAudit: '2024-03-05',
      nextAudit: '2024-06-05',
      auditStatus: 'compliant',
      tags: ['storage', 'bulk', 'floor-storage'],
      notes: 'Bulk storage area for oversized items',
      history: [
        { date: '2024-03-05', action: 'Audit', performedBy: 'Audit Team', result: 'Passed' },
      ],
    },
    {
      id: 'ZN-004',
      name: 'Cold Storage Zone',
      code: 'CLD-01',
      warehouse: 'Warehouse C',
      type: 'cold-storage',
      subType: 'refrigerated',
      status: 'active',
      capacity: 800,
      used: 680,
      unit: 'pallets',
      utilization: 85,
      temperature: '2-4°C',
      humidity: '65%',
      floorArea: '4000 sq ft',
      dimensions: '80ft x 50ft',
      height: '20ft',
      volume: '80000 cu ft',
      location: 'South Wing',
      coordinates: { x: 40, y: 50, z: 1 },
      aisles: ['D1', 'D2'],
      racks: 80,
      levels: 4,
      bins: 320,
      occupiedBins: 272,
      emptyBins: 48,
      reservedBins: 10,
      maintenanceBins: 0,
      quarantineBins: 5,
      zoneManager: 'Emma Watson',
      contact: 'emma.watson@example.com',
      extension: '1237',
      safetyOfficer: 'David Lee',
      fireExtinguishers: 4,
      emergencyExits: 2,
      lighting: 'LED Cold Rated',
      powerOutlets: 8,
      backupGenerator: true,
      temperatureAlarm: true,
      lastAudit: '2024-03-10',
      nextAudit: '2024-04-10',
      auditStatus: 'warning',
      tags: ['cold-storage', 'refrigerated', 'perishable'],
      notes: 'Temperature-sensitive items, daily monitoring required',
      alerts: ['Temperature fluctuation detected on 2024-03-14'],
      history: [
        { date: '2024-03-14', action: 'Alert', performedBy: 'System', notes: 'Temperature fluctuation' },
        { date: '2024-03-10', action: 'Audit', performedBy: 'Audit Team', result: 'Warning - temperature log inconsistency' },
        { date: '2024-03-01', action: 'Maintenance', performedBy: 'HVAC Team', notes: 'Cooling system serviced' },
      ],
    },
    {
      id: 'ZN-005',
      name: 'Freezer Zone',
      code: 'FRZ-01',
      warehouse: 'Warehouse C',
      type: 'freezer',
      subType: 'frozen',
      status: 'active',
      capacity: 400,
      used: 320,
      unit: 'pallets',
      utilization: 80,
      temperature: '-18 to -22°C',
      humidity: '70%',
      floorArea: '2000 sq ft',
      dimensions: '50ft x 40ft',
      height: '20ft',
      volume: '40000 cu ft',
      location: 'South Wing',
      coordinates: { x: 50, y: 60, z: 1 },
      aisles: ['E1'],
      racks: 40,
      levels: 4,
      bins: 160,
      occupiedBins: 128,
      emptyBins: 32,
      reservedBins: 5,
      maintenanceBins: 0,
      quarantineBins: 0,
      zoneManager: 'Anna Taylor',
      contact: 'anna.taylor@example.com',
      extension: '1238',
      safetyOfficer: 'Chris Evans',
      fireExtinguishers: 2,
      emergencyExits: 2,
      lighting: 'LED Cold Rated',
      powerOutlets: 4,
      backupGenerator: true,
      temperatureAlarm: true,
      lastAudit: '2024-03-08',
      nextAudit: '2024-04-08',
      auditStatus: 'compliant',
      tags: ['freezer', 'frozen', 'perishable'],
      notes: 'Frozen goods storage',
      history: [
        { date: '2024-03-08', action: 'Audit', performedBy: 'Audit Team', result: 'Passed' },
      ],
    },
    {
      id: 'ZN-006',
      name: 'Picking Zone',
      code: 'PCK-01',
      warehouse: 'Warehouse A',
      type: 'picking',
      subType: 'forward-pick',
      status: 'active',
      capacity: 1000,
      used: 850,
      unit: 'bins',
      utilization: 85,
      temperature: 'ambient',
      humidity: '45%',
      floorArea: '3000 sq ft',
      dimensions: '60ft x 50ft',
      height: '20ft',
      volume: '60000 cu ft',
      location: 'Front Wing',
      coordinates: { x: 60, y: 70, z: 1 },
      aisles: ['F1', 'F2', 'F3'],
      pickingStations: 8,
      bins: 500,
      occupiedBins: 425,
      emptyBins: 75,
      reservedBins: 20,
      maintenanceBins: 0,
      quarantineBins: 0,
      zoneManager: 'Robert Brown',
      contact: 'robert.brown@example.com',
      extension: '1239',
      safetyOfficer: 'Patricia Miller',
      fireExtinguishers: 4,
      emergencyExits: 2,
      lighting: 'LED High Output',
      powerOutlets: 16,
      wifiCoverage: 'excellent',
      conveyorBelts: true,
      pickToLight: true,
      lastAudit: '2024-03-12',
      nextAudit: '2024-06-12',
      auditStatus: 'compliant',
      tags: ['picking', 'order-fulfillment', 'high-velocity'],
      notes: 'Forward pick area for fast-moving items',
      history: [
        { date: '2024-03-12', action: 'Audit', performedBy: 'Audit Team', result: 'Passed' },
        { date: '2024-03-05', action: 'Replenishment', performedBy: 'Inventory Team', notes: 'High-volume items restocked' },
      ],
    },
    {
      id: 'ZN-007',
      name: 'Packing Zone',
      code: 'PKG-01',
      warehouse: 'Warehouse A',
      type: 'packing',
      subType: 'shipping-prep',
      status: 'active',
      capacity: 300,
      used: 200,
      unit: 'orders',
      utilization: 67,
      temperature: 'ambient',
      humidity: '45%',
      floorArea: '2000 sq ft',
      dimensions: '40ft x 50ft',
      height: '20ft',
      volume: '40000 cu ft',
      location: 'Front Wing',
      coordinates: { x: 70, y: 80, z: 1 },
      packingStations: 12,
      packingTables: 12,
      scales: 4,
      labelPrinters: 6,
      tapeDispensers: 8,
      zoneManager: 'William Jones',
      contact: 'william.jones@example.com',
      extension: '1240',
      safetyOfficer: 'Elizabeth Davis',
      fireExtinguishers: 3,
      emergencyExits: 2,
      lighting: 'LED',
      powerOutlets: 24,
      wifiCoverage: 'excellent',
      lastAudit: '2024-03-14',
      nextAudit: '2024-06-14',
      auditStatus: 'compliant',
      tags: ['packing', 'shipping', 'fulfillment'],
      notes: 'Order packing and preparation area',
      history: [
        { date: '2024-03-14', action: 'Audit', performedBy: 'Audit Team', result: 'Passed' },
      ],
    },
    {
      id: 'ZN-008',
      name: 'Shipping Zone',
      code: 'SHP-01',
      warehouse: 'Warehouse A',
      type: 'shipping',
      subType: 'outbound',
      status: 'active',
      capacity: 400,
      used: 300,
      unit: 'pallets',
      utilization: 75,
      temperature: 'ambient',
      humidity: '45%',
      floorArea: '3000 sq ft',
      dimensions: '60ft x 50ft',
      height: '30ft',
      volume: '90000 cu ft',
      location: 'South Wing',
      coordinates: { x: 80, y: 90, z: 1 },
      loadingDocks: 8,
      dockLevelers: 8,
      truckSpaces: 8,
      stagingLanes: 4,
      zoneManager: 'Joseph Martin',
      contact: 'joseph.martin@example.com',
      extension: '1241',
      safetyOfficer: 'Margaret White',
      fireExtinguishers: 6,
      emergencyExits: 4,
      lighting: 'LED High Bay',
      powerOutlets: 16,
      wifiCoverage: 'good',
      lastAudit: '2024-03-11',
      nextAudit: '2024-06-11',
      auditStatus: 'compliant',
      tags: ['shipping', 'outbound', 'loading-docks'],
      notes: 'Outbound shipping and staging area',
      history: [
        { date: '2024-03-11', action: 'Audit', performedBy: 'Audit Team', result: 'Passed' },
      ],
    },
    {
      id: 'ZN-009',
      name: 'Returns Zone',
      code: 'RTN-01',
      warehouse: 'Warehouse A',
      type: 'returns',
      subType: 'inspection',
      status: 'active',
      capacity: 200,
      used: 150,
      unit: 'items',
      utilization: 75,
      temperature: 'ambient',
      humidity: '45%',
      floorArea: '1500 sq ft',
      dimensions: '30ft x 50ft',
      height: '20ft',
      volume: '30000 cu ft',
      location: 'North Wing',
      coordinates: { x: 90, y: 100, z: 1 },
      inspectionStations: 6,
      quarantineBins: 30,
      returnBins: 100,
      zoneManager: 'Thomas Anderson',
      contact: 'thomas.anderson@example.com',
      extension: '1242',
      safetyOfficer: 'Nancy Thompson',
      fireExtinguishers: 2,
      emergencyExits: 2,
      lighting: 'LED',
      powerOutlets: 12,
      wifiCoverage: 'good',
      lastAudit: '2024-03-09',
      nextAudit: '2024-06-09',
      auditStatus: 'compliant',
      tags: ['returns', 'inspection', 'reverse-logistics'],
      notes: 'Returns processing and inspection area',
      history: [
        { date: '2024-03-09', action: 'Audit', performedBy: 'Audit Team', result: 'Passed' },
      ],
    },
    {
      id: 'ZN-010',
      name: 'Hazardous Materials Zone',
      code: 'HAZ-01',
      warehouse: 'Warehouse B',
      type: 'hazardous',
      subType: 'chemical',
      status: 'active',
      capacity: 100,
      used: 65,
      unit: 'pallets',
      utilization: 65,
      temperature: 'cool',
      humidity: '35%',
      floorArea: '1000 sq ft',
      dimensions: '25ft x 40ft',
      height: '20ft',
      volume: '20000 cu ft',
      location: 'Isolated Wing',
      coordinates: { x: 100, y: 110, z: 1 },
      aisles: ['H1'],
      bins: 50,
      occupiedBins: 32,
      emptyBins: 18,
      reservedBins: 3,
      maintenanceBins: 0,
      quarantineBins: 2,
      ventilation: 'explosion-proof',
      spillContainment: true,
      eyewashStations: 2,
      safetyShowers: 2,
      fireSuppression: 'foam',
      hazmatSuitStorage: true,
      zoneManager: 'Richard Harris',
      contact: 'richard.harris@example.com',
      extension: '1243',
      safetyOfficer: 'Susan Clark',
      fireExtinguishers: 6,
      emergencyExits: 2,
      lighting: 'Explosion-proof LED',
      powerOutlets: 4,
      wifiCoverage: 'limited',
      lastAudit: '2024-03-07',
      nextAudit: '2024-04-07',
      auditStatus: 'compliant',
      tags: ['hazardous', 'chemical', 'safety'],
      notes: 'Strict safety protocols required',
      history: [
        { date: '2024-03-07', action: 'Audit', performedBy: 'Safety Team', result: 'Passed' },
        { date: '2024-02-28', action: 'Safety Inspection', performedBy: 'OSHA', result: 'Compliant' },
      ],
    },
    {
      id: 'ZN-011',
      name: 'Maintenance Zone',
      code: 'MNT-01',
      warehouse: 'Warehouse B',
      type: 'maintenance',
      subType: 'equipment-service',
      status: 'active',
      capacity: 50,
      used: 30,
      unit: 'equipment',
      utilization: 60,
      temperature: 'ambient',
      humidity: '45%',
      floorArea: '1200 sq ft',
      dimensions: '30ft x 40ft',
      height: '20ft',
      volume: '24000 cu ft',
      location: 'Service Wing',
      coordinates: { x: 110, y: 120, z: 1 },
      serviceBays: 4,
      toolCribs: 2,
      partsStorage: true,
      zoneManager: 'Charles Lewis',
      contact: 'charles.lewis@example.com',
      extension: '1244',
      safetyOfficer: 'Patricia Young',
      fireExtinguishers: 3,
      emergencyExits: 2,
      lighting: 'LED',
      powerOutlets: 20,
      compressedAir: true,
      weldingStation: true,
      lastAudit: '2024-03-13',
      nextAudit: '2024-06-13',
      auditStatus: 'compliant',
      tags: ['maintenance', 'repair', 'service'],
      notes: 'Equipment maintenance and repair area',
      history: [
        { date: '2024-03-13', action: 'Audit', performedBy: 'Audit Team', result: 'Passed' },
      ],
    },
    {
      id: 'ZN-012',
      name: 'Quality Control Zone',
      code: 'QC-01',
      warehouse: 'Warehouse B',
      type: 'quality',
      subType: 'inspection-lab',
      status: 'active',
      capacity: 30,
      used: 20,
      unit: 'samples',
      utilization: 67,
      temperature: 'controlled',
      humidity: '40%',
      floorArea: '800 sq ft',
      dimensions: '20ft x 40ft',
      height: '15ft',
      volume: '12000 cu ft',
      location: 'East Wing',
      coordinates: { x: 120, y: 130, z: 1 },
      workstations: 6,
      testEquipment: 12,
      sampleStorage: true,
      zoneManager: 'Daniel Robinson',
      contact: 'daniel.robinson@example.com',
      extension: '1245',
      safetyOfficer: 'Karen Walker',
      fireExtinguishers: 2,
      emergencyExits: 2,
      lighting: 'LED',
      powerOutlets: 16,
      fumeHoods: 2,
      eyewashStations: 2,
      lastAudit: '2024-03-15',
      nextAudit: '2024-06-15',
      auditStatus: 'compliant',
      tags: ['quality', 'inspection', 'lab'],
      notes: 'Quality control testing and inspection',
      history: [
        { date: '2024-03-15', action: 'Audit', performedBy: 'QA Team', result: 'Passed' },
      ],
    },
  ];

  // Warehouses
  const warehouses = [
    { id: 'wh-a', name: 'Warehouse A', zones: 7 },
    { id: 'wh-b', name: 'Warehouse B', zones: 3 },
    { id: 'wh-c', name: 'Warehouse C', zones: 2 },
  ];

  // Zone types
  const zoneTypes = [
    { id: 'receiving', name: 'Receiving', icon: PackagePlus, color: 'bg-blue-100 text-blue-700' },
    { id: 'storage', name: 'Storage', icon: Boxes, color: 'bg-green-100 text-green-700' },
    { id: 'cold-storage', name: 'Cold Storage', icon: Snowflake, color: 'bg-cyan-100 text-cyan-700' },
    { id: 'freezer', name: 'Freezer', icon: Snowflake, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'picking', name: 'Picking', icon: PackageCheck, color: 'bg-purple-100 text-purple-700' },
    { id: 'packing', name: 'Packing', icon: Package, color: 'bg-pink-100 text-pink-700' },
    { id: 'shipping', name: 'Shipping', icon: Truck, color: 'bg-orange-100 text-orange-700' },
    { id: 'returns', name: 'Returns', icon: RotateCcw, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'hazardous', name: 'Hazardous', icon: AlertTriangle, color: 'bg-red-100 text-red-700' },
    { id: 'maintenance', name: 'Maintenance', icon: Wrench, color: 'bg-gray-100 text-gray-700' },
    { id: 'quality', name: 'Quality', icon: CheckCircle, color: 'bg-teal-100 text-teal-700' },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    maintenance: { label: 'Maintenance', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Wrench },
    full: { label: 'Full', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
  };

  const auditStatusConfig = {
    compliant: { label: 'Compliant', color: 'bg-green-100 text-green-700' },
    warning: { label: 'Warning', color: 'bg-yellow-100 text-yellow-700' },
    critical: { label: 'Critical', color: 'bg-red-100 text-red-700' },
    pending: { label: 'Pending', color: 'bg-blue-100 text-blue-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getAuditStatusColor = (status) => {
    return auditStatusConfig[status]?.color || 'bg-gray-100 text-gray-700';
  };

  const getZoneTypeColor = (type) => {
    const found = zoneTypes.find(t => t.id === type);
    return found?.color || 'bg-gray-100 text-gray-700';
  };

  const getZoneTypeIcon = (type) => {
    const found = zoneTypes.find(t => t.id === type);
    const Icon = found?.icon || Grid;
    return Icon;
  };

  const filteredZones = warehouseZones.filter(zone => {
    const matchesWarehouse = selectedWarehouse === 'all' || zone.warehouse === selectedWarehouse;
    const matchesType = selectedType === 'all' || zone.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || zone.status === selectedStatus;
    const matchesSearch = zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         zone.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         zone.warehouse.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         zone.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesWarehouse && matchesType && matchesStatus && matchesSearch;
  });

  const stats = {
    total: warehouseZones.length,
    active: warehouseZones.filter(z => z.status === 'active').length,
    maintenance: warehouseZones.filter(z => z.status === 'maintenance').length,
    full: warehouseZones.filter(z => z.status === 'full').length,
    totalCapacity: warehouseZones.reduce((sum, z) => sum + z.capacity, 0),
    totalUsed: warehouseZones.reduce((sum, z) => sum + z.used, 0),
    avgUtilization: Math.round(warehouseZones.reduce((sum, z) => sum + z.utilization, 0) / warehouseZones.length),
    totalBins: warehouseZones.reduce((sum, z) => sum + (z.bins || 0), 0),
    occupiedBins: warehouseZones.reduce((sum, z) => sum + (z.occupiedBins || 0), 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Warehouse Zones</h1>
            <p className="text-black/50 mt-1">Manage warehouse zones, locations, and capacity utilization</p>
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
              onClick={() => setShowMapDialog(true)}
            >
              <Map size={16} />
              View Map
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowHeatmapDialog(true)}
            >
              <Activity size={16} />
              Heatmap
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Add Zone
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Zones</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Grid size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Maintenance</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.maintenance}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Wrench size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Full</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.full}</p>
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
                  <p className="text-xs text-black/50">Total Capacity</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalCapacity.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Boxes size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Utilization</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.avgUtilization}%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Activity size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Bins</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalBins.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-indigo-50 rounded-full">
                  <LayoutGrid size={18} className="text-indigo-600" />
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
              placeholder="Search by zone name, code, warehouse, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              {warehouses.map(wh => (
                <SelectItem key={wh.id} value={wh.name}>{wh.name} ({wh.zones})</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Zone Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {zoneTypes.map(type => (
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="full">Full</SelectItem>
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

      {/* Zones Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredZones.map((zone) => {
            const StatusIcon = statusConfig[zone.status]?.icon || CheckCircle;
            const TypeIcon = getZoneTypeIcon(zone.type);
            
            return (
              <Card key={zone.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={cn("p-4 rounded-t-lg border-b border-[#F5EEE9]", getZoneTypeColor(zone.type))}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/30 rounded-lg backdrop-blur-sm">
                          <TypeIcon size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs border-0", getStatusColor(zone.status))}>
                              <StatusIcon className="mr-1" size={10} />
                              {zone.status}
                            </Badge>
                            <Badge className="bg-white/30 text-white text-xs border-0">
                              {zone.warehouse}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-white">{zone.name}</h3>
                          <p className="text-xs text-white/80 mt-0.5">{zone.code}</p>
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
                            setSelectedZone(zone);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedZone(zone);
                            setShowMapDialog(true);
                          }}>
                            <Map className="mr-2 h-4 w-4" />
                            View on Map
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedZone(zone);
                            setShowBinDialog(true);
                          }}>
                            <LayoutGrid className="mr-2 h-4 w-4" />
                            Manage Bins
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedZone(zone);
                            setShowOptimizeDialog(true);
                          }}>
                            <Activity className="mr-2 h-4 w-4" />
                            Optimize Layout
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
                    {/* Utilization */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Utilization</span>
                        <span className="text-xs font-medium">{zone.utilization}%</span>
                      </div>
                      <Progress 
                        value={zone.utilization} 
                        className="h-2 bg-[#F5EEE9]"
                        style={{ 
                          '--progress-background': 
                            zone.utilization > 90 ? '#ef4444' :
                            zone.utilization > 75 ? '#eab308' :
                            zone.utilization > 50 ? '#3b82f6' :
                            '#22c55e'
                        }}
                      />
                    </div>

                    {/* Capacity */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-center p-2 bg-[#F5EEE9]/30 rounded-lg">
                        <p className="text-xs text-black/50">Capacity</p>
                        <p className="text-lg font-bold text-black">{zone.capacity.toLocaleString()}</p>
                        <p className="text-xs text-black/50">{zone.unit}</p>
                      </div>
                      <div className="text-center p-2 bg-[#F5EEE9]/30 rounded-lg">
                        <p className="text-xs text-black/50">Used</p>
                        <p className="text-lg font-bold text-blue-600">{zone.used.toLocaleString()}</p>
                        <p className="text-xs text-black/50">{zone.unit}</p>
                      </div>
                    </div>

                    {/* Bins Info */}
                    {zone.bins && (
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-black/50">Bins</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{zone.occupiedBins}/{zone.bins}</span>
                          <div className="flex gap-1">
                            <Badge className="bg-green-100 text-green-700 text-[10px] px-1">
                              {zone.emptyBins} empty
                            </Badge>
                            {zone.quarantineBins > 0 && (
                              <Badge className="bg-red-100 text-red-700 text-[10px] px-1">
                                {zone.quarantineBins} Q
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    <div className="p-3 bg-[#F5EEE9]/50 rounded-lg mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-red-600" />
                        <span>{zone.location} • {zone.dimensions}</span>
                      </div>
                    </div>

                    {/* Temperature/Humidity */}
                    {(zone.temperature !== 'ambient' || zone.humidity) && (
                      <div className="flex items-center gap-3 text-sm mb-3">
                        {zone.temperature !== 'ambient' && (
                          <div className="flex items-center gap-1">
                            <Thermometer size={14} className="text-blue-600" />
                            <span>{zone.temperature}</span>
                          </div>
                        )}
                        {zone.humidity && (
                          <div className="flex items-center gap-1">
                            <Droplet size={14} className="text-blue-400" />
                            <span>{zone.humidity}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Manager */}
                    <div className="flex items-center gap-2 text-xs text-black/50 mb-3">
                      <User size={12} />
                      <span>Manager: {zone.zoneManager}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {zone.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9] bg-[#F5EEE9]/30">
                          {tag}
                        </Badge>
                      ))}
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
                  <TableHead className="text-black/50">Zone</TableHead>
                  <TableHead className="text-black/50">Code</TableHead>
                  <TableHead className="text-black/50">Warehouse</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50 text-right">Capacity</TableHead>
                  <TableHead className="text-black/50 text-right">Used</TableHead>
                  <TableHead className="text-black/50 text-right">Utilization</TableHead>
                  <TableHead className="text-black/50">Temperature</TableHead>
                  <TableHead className="text-black/50">Bins</TableHead>
                  <TableHead className="text-black/50">Manager</TableHead>
                  <TableHead className="text-black/50">Last Audit</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredZones.map((zone) => (
                  <TableRow key={zone.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{zone.name}</TableCell>
                    <TableCell className="font-mono text-xs">{zone.code}</TableCell>
                    <TableCell>{zone.warehouse}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getZoneTypeColor(zone.type))}>
                        {zone.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(zone.status))}>
                        {zone.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{zone.capacity.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{zone.used.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className={cn(
                        "font-medium",
                        zone.utilization > 90 ? 'text-red-600' :
                        zone.utilization > 75 ? 'text-yellow-600' :
                        'text-green-600'
                      )}>
                        {zone.utilization}%
                      </span>
                    </TableCell>
                    <TableCell>{zone.temperature}</TableCell>
                    <TableCell>{zone.bins || 0}</TableCell>
                    <TableCell>{zone.zoneManager}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{zone.lastAudit}</span>
                        <Badge className={cn("text-xs", getAuditStatusColor(zone.auditStatus))}>
                          {zone.auditStatus}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedZone(zone);
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
                Showing {filteredZones.length} of {warehouseZones.length} zones
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

      {/* Create Zone Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Warehouse Zone</DialogTitle>
            <DialogDescription>
              Add a new zone to warehouse layout
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                <TabsTrigger value="safety">Safety & Staff</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Zone Name</Label>
                    <Input placeholder="e.g., Receiving Zone" />
                  </div>
                  <div className="space-y-2">
                    <Label>Zone Code</Label>
                    <Input placeholder="e.g., REC-01" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Warehouse</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehouses.map(wh => (
                          <SelectItem key={wh.id} value={wh.name}>{wh.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Zone Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {zoneTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input type="number" placeholder="e.g., 500" />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit</Label>
                    <Select defaultValue="pallets">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pallets">Pallets</SelectItem>
                        <SelectItem value="bins">Bins</SelectItem>
                        <SelectItem value="items">Items</SelectItem>
                        <SelectItem value="orders">Orders</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location Description</Label>
                  <Input placeholder="e.g., North Wing" />
                </div>
              </TabsContent>

              <TabsContent value="dimensions" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Floor Area (sq ft)</Label>
                    <Input placeholder="e.g., 5000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Dimensions</Label>
                    <Input placeholder="e.g., 100ft x 50ft" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Height (ft)</Label>
                    <Input placeholder="e.g., 30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Volume (cu ft)</Label>
                    <Input placeholder="e.g., 150000" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>X Coordinate</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Y Coordinate</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Z Level</Label>
                    <Input type="number" placeholder="1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Aisles</Label>
                  <Input placeholder="e.g., A1, A2, A3 (comma separated)" />
                </div>
              </TabsContent>

              <TabsContent value="safety" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Zone Manager</Label>
                    <Input placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Extension</Label>
                    <Input placeholder="e.g., 1234" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Safety Officer</Label>
                    <Input placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Fire Extinguishers</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Emergency Exits</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Lighting Type</Label>
                    <Input placeholder="e.g., LED" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Zone Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Zone Details</DialogTitle>
          </DialogHeader>

          {selectedZone && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="safety">Safety</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={cn("p-3 rounded-lg", getZoneTypeColor(selectedZone.type))}>
                      {(() => {
                        const Icon = getZoneTypeIcon(selectedZone.type);
                        return <Icon size={24} className="text-white" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedZone.name}</h3>
                      <p className="text-sm text-black/50">{selectedZone.code} • {selectedZone.warehouse}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black/50">Zone Type</p>
                      <Badge className={cn("text-xs mt-1", getZoneTypeColor(selectedZone.type))}>
                        {selectedZone.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Status</p>
                      <Badge className={cn("text-xs border-0 mt-1", getStatusColor(selectedZone.status))}>
                        {selectedZone.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-[#F5EEE9] rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-black/50">Capacity</p>
                      <p className="text-lg font-bold">{selectedZone.capacity.toLocaleString()}</p>
                      <p className="text-xs text-black/50">{selectedZone.unit}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-black/50">Used</p>
                      <p className="text-lg font-bold text-blue-600">{selectedZone.used.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-black/50">Utilization</p>
                      <p className={cn(
                        "text-lg font-bold",
                        selectedZone.utilization > 90 ? 'text-red-600' :
                        selectedZone.utilization > 75 ? 'text-yellow-600' :
                        'text-green-600'
                      )}>
                        {selectedZone.utilization}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black/50">Location</p>
                      <p className="font-medium">{selectedZone.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Dimensions</p>
                      <p className="font-medium">{selectedZone.dimensions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Height</p>
                      <p className="font-medium">{selectedZone.height}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Volume</p>
                      <p className="font-medium">{selectedZone.volume}</p>
                    </div>
                  </div>

                  {selectedZone.aisles && (
                    <div>
                      <p className="text-sm font-medium mb-1">Aisles</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedZone.aisles.map((aisle) => (
                          <Badge key={aisle} variant="outline" className="text-xs border-[#F5EEE9]">
                            {aisle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedZone.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedZone.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-700">{selectedZone.notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="inventory" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Total Bins</p>
                        <p className="text-lg font-bold">{selectedZone.bins || 0}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Occupied Bins</p>
                        <p className="text-lg font-bold text-blue-600">{selectedZone.occupiedBins || 0}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Empty Bins</p>
                        <p className="text-lg font-bold text-green-600">{selectedZone.emptyBins || 0}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Reserved Bins</p>
                        <p className="text-lg font-bold text-yellow-600">{selectedZone.reservedBins || 0}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Maintenance Bins</p>
                        <p className="text-lg font-bold text-orange-600">{selectedZone.maintenanceBins || 0}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Quarantine Bins</p>
                        <p className="text-lg font-bold text-red-600">{selectedZone.quarantineBins || 0}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedZone.racks && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-black/50">Racks</p>
                        <p className="font-medium">{selectedZone.racks}</p>
                      </div>
                      <div>
                        <p className="text-sm text-black/50">Levels</p>
                        <p className="font-medium">{selectedZone.levels}</p>
                      </div>
                    </div>
                  )}

                  {selectedZone.floorPositions && (
                    <div>
                      <p className="text-sm text-black/50">Floor Positions</p>
                      <p className="font-medium">{selectedZone.floorPositions}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="safety" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black/50">Zone Manager</p>
                      <p className="font-medium">{selectedZone.zoneManager}</p>
                      <p className="text-xs text-black/50">Ext: {selectedZone.extension}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Safety Officer</p>
                      <p className="font-medium">{selectedZone.safetyOfficer}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black/50">Fire Extinguishers</p>
                      <p className="font-medium">{selectedZone.fireExtinguishers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Emergency Exits</p>
                      <p className="font-medium">{selectedZone.emergencyExits}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black/50">Lighting</p>
                      <p className="font-medium">{selectedZone.lighting}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Power Outlets</p>
                      <p className="font-medium">{selectedZone.powerOutlets}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-black/50">Wifi Coverage</p>
                    <Badge className={cn(
                      "text-xs",
                      selectedZone.wifiCoverage === 'excellent' && 'bg-green-100 text-green-700',
                      selectedZone.wifiCoverage === 'good' && 'bg-blue-100 text-blue-700',
                      selectedZone.wifiCoverage === 'limited' && 'bg-yellow-100 text-yellow-700',
                    )}>
                      {selectedZone.wifiCoverage}
                    </Badge>
                  </div>

                  {selectedZone.hazmatSuitStorage && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm font-medium text-yellow-700">Hazardous Materials Zone</p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Ventilation: {selectedZone.ventilation} • Spill Containment: Yes • Eyewash Stations: {selectedZone.eyewashStations}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black/50">Last Audit</p>
                      <p className="font-medium">{selectedZone.lastAudit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Next Audit</p>
                      <p className="font-medium">{selectedZone.nextAudit}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-black/50">Audit Status</p>
                    <Badge className={cn("text-xs mt-1", getAuditStatusColor(selectedZone.auditStatus))}>
                      {selectedZone.auditStatus}
                    </Badge>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedZone.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-1">
                            {item.action === 'Audit' && <CheckCircle size={14} className="text-green-600" />}
                            {item.action === 'Maintenance' && <Wrench size={14} className="text-yellow-600" />}
                            {item.action === 'Inventory Count' && <Package size={14} className="text-blue-600" />}
                            {item.action === 'Alert' && <AlertTriangle size={14} className="text-red-600" />}
                            {item.action === 'Replenishment' && <PackagePlus size={14} className="text-purple-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{item.action}</p>
                              <span className="text-xs text-black/50">{item.date}</span>
                            </div>
                            <p className="text-xs text-black/50">By: {item.performedBy}</p>
                            {item.result && (
                              <Badge className={cn(
                                "text-xs mt-1",
                                item.result === 'Passed' && 'bg-green-100 text-green-700',
                                item.result === 'Warning' && 'bg-yellow-100 text-yellow-700',
                                item.result === 'Failed' && 'bg-red-100 text-red-700',
                              )}>
                                {item.result}
                              </Badge>
                            )}
                            {item.notes && <p className="text-xs text-black/70 mt-1">{item.notes}</p>}
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
            <Button className="bg-red-600 hover:bg-red-700">
              <Edit className="mr-2 h-4 w-4" />
              Edit Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Map Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Warehouse Layout Map</DialogTitle>
            <DialogDescription>
              Interactive warehouse zone visualization
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="h-80 bg-[#F5EEE9] rounded-lg flex items-center justify-center relative">
              {/* Simplified warehouse map visualization */}
              <div className="absolute inset-4 border-2 border-dashed border-red-200 rounded-lg">
                {/* Zone blocks */}
                <div className="absolute top-4 left-4 w-20 h-20 bg-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-700">
                  REC-01
                </div>
                <div className="absolute top-4 left-28 w-32 h-20 bg-green-200 rounded flex items-center justify-center text-xs font-medium text-green-700">
                  STR-01
                </div>
                <div className="absolute top-4 left-64 w-32 h-20 bg-green-200 rounded flex items-center justify-center text-xs font-medium text-green-700">
                  STR-02
                </div>
                <div className="absolute top-28 left-4 w-20 h-20 bg-purple-200 rounded flex items-center justify-center text-xs font-medium text-purple-700">
                  PCK-01
                </div>
                <div className="absolute top-28 left-28 w-20 h-20 bg-pink-200 rounded flex items-center justify-center text-xs font-medium text-pink-700">
                  PKG-01
                </div>
                <div className="absolute top-28 left-52 w-20 h-20 bg-orange-200 rounded flex items-center justify-center text-xs font-medium text-orange-700">
                  SHP-01
                </div>
                <div className="absolute top-52 left-4 w-20 h-20 bg-yellow-200 rounded flex items-center justify-center text-xs font-medium text-yellow-700">
                  RTN-01
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-2 left-2 bg-white/90 p-2 rounded-lg text-xs">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded"></div>
                    <span>Receiving</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded"></div>
                    <span>Storage</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded"></div>
                    <span>Picking</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-pink-400 rounded"></div>
                    <span>Packing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded"></div>
                    <span>Shipping</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded"></div>
                    <span>Returns</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-[#F5EEE9]">
                  <ZoomIn size={14} className="mr-1" />
                  Zoom In
                </Button>
                <Button variant="outline" size="sm" className="border-[#F5EEE9]">
                  <ZoomOut size={14} className="mr-1" />
                  Zoom Out
                </Button>
              </div>
              <Select defaultValue="warehouse-a">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                  <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                  <SelectItem value="warehouse-c">Warehouse C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMapDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Download className="mr-2 h-4 w-4" />
              Export Map
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Heatmap Dialog */}
      <Dialog open={showHeatmapDialog} onOpenChange={setShowHeatmapDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Zone Activity Heatmap</DialogTitle>
            <DialogDescription>
              Visual representation of zone utilization
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="h-80 bg-[#F5EEE9] rounded-lg flex items-center justify-center relative">
              {/* Simplified heatmap visualization */}
              <div className="absolute inset-4 grid grid-cols-3 gap-2">
                <div className="bg-green-200 rounded-lg flex items-center justify-center text-xs font-medium">
                  64%
                </div>
                <div className="bg-yellow-200 rounded-lg flex items-center justify-center text-xs font-medium">
                  85%
                </div>
                <div className="bg-green-200 rounded-lg flex items-center justify-center text-xs font-medium">
                  70%
                </div>
                <div className="bg-red-200 rounded-lg flex items-center justify-center text-xs font-medium">
                  95%
                </div>
                <div className="bg-green-200 rounded-lg flex items-center justify-center text-xs font-medium">
                  67%
                </div>
                <div className="bg-yellow-200 rounded-lg flex items-center justify-center text-xs font-medium">
                  75%
                </div>
                <div className="bg-orange-200 rounded-lg flex items-center justify-center text-xs font-medium">
                  85%
                </div>
                <div className="bg-green-200 rounded-lg flex items-center justify-center text-xs font-medium">
                  65%
                </div>
                <div className="bg-green-200 rounded-lg flex items-center justify-center text-xs font-medium">
                  60%
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-lg text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded"></div>
                    <span>&lt; 70% - Good</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded"></div>
                    <span>70-85% - Moderate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded"></div>
                    <span>85-95% - High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-400 rounded"></div>
                    <span>&gt; 95% - Critical</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Select defaultValue="utilization">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utilization">Utilization Rate</SelectItem>
                  <SelectItem value="velocity">Pick Velocity</SelectItem>
                  <SelectItem value="errors">Error Rate</SelectItem>
                  <SelectItem value="temperature">Temperature</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHeatmapDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Download className="mr-2 h-4 w-4" />
              Export Data
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
            <TooltipContent side="left">Add Zone</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowOptimizeDialog(true)}
              >
                <Activity size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Optimize Layout</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowMapDialog(true)}
              >
                <Map size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">View Map</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default WarehouseZonesPage;