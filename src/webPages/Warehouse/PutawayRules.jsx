// app/dashboard/putaway-rules/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowDown,
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
  ArrowDown as ArrowDownIcon,
  ArrowLeft,
  ArrowRight,
  Move,
  MoveHorizontal,
  MoveVertical,
  Maximize2,
  Minimize2,
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
  ScanBarcode,
  ScanQrCode,
  ScanSearch,
  ScanText,
  ScanEye,
  ScanFace,
  ScanLine,
  Rows3,
  Columns3,
  Grid2x2,
  Grid3x3Icon,
  Grid2x2Check,
  Grid2x2X,
  Grid2x2Plus,
  Grid2x2Minus,
  Grid3x3Check,
  Grid3x3X,
  Grid3x3Plus,
  Grid3x3Minus,
  LayoutGridIcon,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ArrowUpWideNarrow,
  ArrowDownZA,
  ArrowUpAZ,
  ArrowDown10,
  ArrowUp10,
  Grip,
  GripVertical,
  GripHorizontal,
  MoveDown,
  MoveUp,
  MoveLeft,
  MoveRight,
  MoveDiagonal,
  MoveDiagonal2,
  ArrowDownUp,
  ArrowLeftRight,
  Maximize,
  Minimize,
  Expand,
  Shrink,
  Workflow,
  GitBranch,
  GitMerge,
  GitPullRequest,
  GitCommit,
  Waypoints,
  Route,
  Network,
  Share2,
  Link2,
  Link2Off,
  Cable,
  Plug,
  PlugZap,
  PlugOff,
  Power,
  PowerOff,
  ToggleLeft,
  ToggleRight,
  SwitchCamera,
  SwitchIcon,
  Toggle,
  ToggleLeftIcon,
  ToggleRightIcon,
  ArrowLeftRight as ArrowLeftRightIcon,
  ArrowUpDown as ArrowUpDownIcon,
  MoveHorizontal as MoveHorizontalIcon,
  MoveVertical as MoveVerticalIcon,
  GripVertical as GripVerticalIcon,
  GripHorizontal as GripHorizontalIcon,
  Thermometer,
  Shuffle
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

const PutawayRulesPage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedRule, setSelectedRule] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedStrategy, setSelectedStrategy] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCloneDialog, setShowCloneDialog] = useState(false);
  const [showEnableDialog, setShowEnableDialog] = useState(false);
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const [showPriorityDialog, setShowPriorityDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [showSimulationDialog, setShowSimulationDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showOptimizeDialog, setShowOptimizeDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample putaway rules data
  const putawayRules = [
    {
      id: 'RULE-001',
      name: 'Fast-Moving Electronics to Forward Pick',
      description: 'Route fast-moving electronics to forward pick area for efficient picking',
      strategy: 'velocity',
      priority: 1,
      status: 'active',
      warehouse: 'Warehouse A',
      zone: 'Picking Zone',
      binType: 'picking-bin',
      productCategories: ['Electronics'],
      productAttributes: ['fast-moving'],
      conditions: [
        { field: 'turnover_rate', operator: 'greater_than', value: 50 },
        { field: 'category', operator: 'equals', value: 'Electronics' },
      ],
      destination: {
        type: 'zone',
        value: 'Picking Zone',
        binType: 'picking-bin',
        specificBin: null,
      },
      fallbackRule: 'RULE-002',
      executionOrder: 1,
      createdBy: 'John Doe',
      createdAt: '2024-01-15',
      modifiedBy: 'Jane Smith',
      modifiedAt: '2024-02-20',
      appliedCount: 1245,
      successRate: 99.2,
      avgExecutionTime: 45,
      tags: ['electronics', 'fast-moving', 'optimized'],
      notes: 'Optimized for high-velocity electronics',
      history: [
        { date: '2024-02-20', action: 'Modified', user: 'Jane Smith', changes: 'Updated priority' },
        { date: '2024-01-15', action: 'Created', user: 'John Doe' },
      ],
    },
    {
      id: 'RULE-002',
      name: 'Bulk Items to Bulk Storage',
      description: 'Route bulk items to bulk floor storage area',
      strategy: 'size',
      priority: 2,
      status: 'active',
      warehouse: 'Warehouse A',
      zone: 'Storage Zone B',
      binType: 'bulk-floor',
      productCategories: ['Furniture', 'Industrial'],
      productAttributes: ['bulky', 'oversized'],
      conditions: [
        { field: 'volume', operator: 'greater_than', value: 50 },
        { field: 'weight', operator: 'greater_than', value: 100 },
      ],
      destination: {
        type: 'zone',
        value: 'Storage Zone B',
        binType: 'bulk-floor',
        specificBin: null,
      },
      fallbackRule: 'RULE-005',
      executionOrder: 2,
      createdBy: 'Mike Johnson',
      createdAt: '2024-01-10',
      modifiedBy: 'Mike Johnson',
      modifiedAt: '2024-02-15',
      appliedCount: 876,
      successRate: 98.5,
      avgExecutionTime: 32,
      tags: ['bulk', 'oversized', 'furniture'],
      notes: 'Reserve floor space for oversized items',
      history: [
        { date: '2024-02-15', action: 'Modified', user: 'Mike Johnson', changes: 'Updated size thresholds' },
        { date: '2024-01-10', action: 'Created', user: 'Mike Johnson' },
      ],
    },
    {
      id: 'RULE-003',
      name: 'Perishable Goods to Cold Storage',
      description: 'Route perishable items to temperature-controlled zones',
      strategy: 'product-type',
      priority: 1,
      status: 'active',
      warehouse: 'Warehouse C',
      zone: 'Cold Storage Zone',
      binType: 'cold-storage',
      productCategories: ['Food', 'Dairy', 'Produce', 'Meat'],
      productAttributes: ['perishable', 'refrigerated'],
      conditions: [
        { field: 'requires_refrigeration', operator: 'equals', value: true },
        { field: 'category', operator: 'in', value: ['Food', 'Dairy', 'Produce', 'Meat'] },
      ],
      destination: {
        type: 'zone',
        value: 'Cold Storage Zone',
        binType: 'cold-storage',
        specificBin: null,
      },
      temperatureRequirement: '2-4°C',
      executionOrder: 1,
      createdBy: 'Emma Watson',
      createdAt: '2024-01-05',
      modifiedBy: 'Emma Watson',
      modifiedAt: '2024-03-01',
      appliedCount: 2341,
      successRate: 99.8,
      avgExecutionTime: 28,
      tags: ['perishable', 'cold-storage', 'food'],
      notes: 'Maintain cold chain integrity',
      history: [
        { date: '2024-03-01', action: 'Modified', user: 'Emma Watson', changes: 'Added dairy category' },
        { date: '2024-01-05', action: 'Created', user: 'Emma Watson' },
      ],
    },
    {
      id: 'RULE-004',
      name: 'Hazardous Materials to Hazmat Zone',
      description: 'Route hazardous materials to designated hazmat storage area',
      strategy: 'safety',
      priority: 1,
      status: 'active',
      warehouse: 'Warehouse B',
      zone: 'Hazardous Materials Zone',
      binType: 'hazardous',
      productCategories: ['Chemicals', 'Industrial'],
      productAttributes: ['hazardous', 'flammable', 'toxic'],
      conditions: [
        { field: 'hazardous', operator: 'equals', value: true },
        { field: 'hazmat_class', operator: 'not_null', value: null },
      ],
      destination: {
        type: 'zone',
        value: 'Hazardous Materials Zone',
        binType: 'hazardous',
        specificBin: null,
      },
      safetyProtocol: 'HAZMAT-PROTOCOL-001',
      executionOrder: 1,
      createdBy: 'Richard Harris',
      createdAt: '2024-01-20',
      modifiedBy: 'Safety Officer',
      modifiedAt: '2024-02-28',
      appliedCount: 567,
      successRate: 100,
      avgExecutionTime: 52,
      tags: ['hazardous', 'safety', 'chemical'],
      notes: 'Strict compliance with safety regulations',
      history: [
        { date: '2024-02-28', action: 'Modified', user: 'Safety Officer', changes: 'Updated safety protocol' },
        { date: '2024-01-20', action: 'Created', user: 'Richard Harris' },
      ],
    },
    {
      id: 'RULE-005',
      name: 'General Items to Random Storage',
      description: 'Default rule for general items - random available bin',
      strategy: 'random',
      priority: 10,
      status: 'active',
      warehouse: 'All',
      zone: 'Any',
      binType: 'any',
      productCategories: [],
      productAttributes: [],
      conditions: [],
      destination: {
        type: 'random',
        value: 'any',
        binType: 'any',
        specificBin: null,
      },
      fallbackRule: null,
      executionOrder: 10,
      createdBy: 'System',
      createdAt: '2024-01-01',
      modifiedBy: 'System',
      modifiedAt: '2024-01-01',
      appliedCount: 5678,
      successRate: 100,
      avgExecutionTime: 15,
      tags: ['default', 'catch-all'],
      notes: 'Fallback rule when no other rules apply',
      history: [
        { date: '2024-01-01', action: 'Created', user: 'System' },
      ],
    },
    {
      id: 'RULE-006',
      name: 'High-Value Items to Secure Storage',
      description: 'Route high-value items to secure, monitored locations',
      strategy: 'value',
      priority: 1,
      status: 'active',
      warehouse: 'Warehouse A',
      zone: 'Secure Zone',
      binType: 'pallet-rack',
      productCategories: ['Electronics', 'Jewelry', 'Medical'],
      productAttributes: ['high-value', 'secure'],
      conditions: [
        { field: 'unit_cost', operator: 'greater_than', value: 500 },
        { field: 'requires_security', operator: 'equals', value: true },
      ],
      destination: {
        type: 'zone',
        value: 'Secure Zone',
        binType: 'pallet-rack',
        specificBin: null,
      },
      securityLevel: 'high',
      requiresAuthorization: true,
      executionOrder: 2,
      createdBy: 'Security Manager',
      createdAt: '2024-02-01',
      modifiedBy: 'Security Manager',
      modifiedAt: '2024-02-10',
      appliedCount: 234,
      successRate: 100,
      avgExecutionTime: 38,
      tags: ['high-value', 'secure', 'authorization'],
      notes: 'Requires manager approval for putaway',
      history: [
        { date: '2024-02-10', action: 'Modified', user: 'Security Manager', changes: 'Increased value threshold' },
        { date: '2024-02-01', action: 'Created', user: 'Security Manager' },
      ],
    },
    {
      id: 'RULE-007',
      name: 'Frozen Items to Freezer Zone',
      description: 'Route frozen items to freezer storage',
      strategy: 'temperature',
      priority: 1,
      status: 'active',
      warehouse: 'Warehouse C',
      zone: 'Freezer Zone',
      binType: 'freezer',
      productCategories: ['Frozen Food', 'Ice Cream'],
      productAttributes: ['frozen'],
      conditions: [
        { field: 'storage_temperature', operator: 'less_than', value: -18 },
        { field: 'frozen', operator: 'equals', value: true },
      ],
      destination: {
        type: 'zone',
        value: 'Freezer Zone',
        binType: 'freezer',
        specificBin: null,
      },
      temperatureRequirement: '-18 to -22°C',
      executionOrder: 1,
      createdBy: 'Anna Taylor',
      createdAt: '2024-01-25',
      modifiedBy: 'Anna Taylor',
      modifiedAt: '2024-03-05',
      appliedCount: 890,
      successRate: 99.5,
      avgExecutionTime: 25,
      tags: ['frozen', 'freezer', 'temperature'],
      notes: 'Maintain frozen state throughout',
      history: [
        { date: '2024-03-05', action: 'Modified', user: 'Anna Taylor', changes: 'Updated temperature range' },
        { date: '2024-01-25', action: 'Created', user: 'Anna Taylor' },
      ],
    },
    {
      id: 'RULE-008',
      name: 'Fast-Moving Small Items to Flow Rack',
      description: 'Route small, fast-moving items to flow rack for efficient picking',
      strategy: 'velocity-size',
      priority: 2,
      status: 'active',
      warehouse: 'Warehouse A',
      zone: 'Picking Zone',
      binType: 'flow-rack',
      productCategories: ['Electronics', 'Health', 'Office'],
      productAttributes: ['small', 'fast-moving'],
      conditions: [
        { field: 'turnover_rate', operator: 'greater_than', value: 30 },
        { field: 'volume', operator: 'less_than', value: 1 },
      ],
      destination: {
        type: 'zone',
        value: 'Picking Zone',
        binType: 'flow-rack',
        specificBin: null,
      },
      executionOrder: 3,
      createdBy: 'Robert Brown',
      createdAt: '2024-02-15',
      modifiedBy: null,
      modifiedAt: null,
      appliedCount: 456,
      successRate: 97.8,
      avgExecutionTime: 22,
      tags: ['small-items', 'fast-moving', 'flow-rack'],
      notes: 'Optimize for small item picking',
      history: [
        { date: '2024-02-15', action: 'Created', user: 'Robert Brown' },
      ],
    },
    {
      id: 'RULE-009',
      name: 'Returns to Inspection Zone',
      description: 'Route returned items to inspection zone for quality check',
      strategy: 'process',
      priority: 1,
      status: 'active',
      warehouse: 'Warehouse A',
      zone: 'Returns Zone',
      binType: 'returns',
      productCategories: [],
      productAttributes: ['returned'],
      conditions: [
        { field: 'is_return', operator: 'equals', value: true },
      ],
      destination: {
        type: 'zone',
        value: 'Returns Zone',
        binType: 'returns',
        specificBin: null,
      },
      requiresInspection: true,
      executionOrder: 1,
      createdBy: 'Thomas Anderson',
      createdAt: '2024-02-20',
      modifiedBy: null,
      modifiedAt: null,
      appliedCount: 345,
      successRate: 100,
      avgExecutionTime: 18,
      tags: ['returns', 'inspection', 'quality'],
      notes: 'All returns must be inspected before restocking',
      history: [
        { date: '2024-02-20', action: 'Created', user: 'Thomas Anderson' },
      ],
    },
    {
      id: 'RULE-010',
      name: 'Cross-Dock Items to Transit Area',
      description: 'Route cross-dock items to transit area for immediate shipping',
      strategy: 'process',
      priority: 1,
      status: 'active',
      warehouse: 'Warehouse A',
      zone: 'Cross-Dock Zone',
      binType: 'cross-dock',
      productCategories: [],
      productAttributes: ['cross-dock'],
      conditions: [
        { field: 'is_cross_dock', operator: 'equals', value: true },
      ],
      destination: {
        type: 'zone',
        value: 'Cross-Dock Zone',
        binType: 'cross-dock',
        specificBin: null,
      },
      executionOrder: 1,
      createdBy: 'Logistics Manager',
      createdAt: '2024-02-25',
      modifiedBy: null,
      modifiedAt: null,
      appliedCount: 567,
      successRate: 100,
      avgExecutionTime: 12,
      tags: ['cross-dock', 'transit', 'shipping'],
      notes: 'Minimize handling time',
      history: [
        { date: '2024-02-25', action: 'Created', user: 'Logistics Manager' },
      ],
    },
    {
      id: 'RULE-011',
      name: 'Seasonal Items to Overflow',
      description: 'Route seasonal items to overflow during off-season',
      strategy: 'seasonal',
      priority: 5,
      status: 'inactive',
      warehouse: 'Warehouse A',
      zone: 'Overflow Zone',
      binType: 'overflow',
      productCategories: ['Seasonal', 'Holiday'],
      productAttributes: ['seasonal'],
      conditions: [
        { field: 'season', operator: 'not_equals', value: 'current' },
      ],
      destination: {
        type: 'zone',
        value: 'Overflow Zone',
        binType: 'overflow',
        specificBin: null,
      },
      executionOrder: 5,
      createdBy: 'Inventory Manager',
      createdAt: '2024-01-30',
      modifiedBy: 'Inventory Manager',
      modifiedAt: '2024-03-01',
      appliedCount: 0,
      successRate: 0,
      avgExecutionTime: 0,
      tags: ['seasonal', 'overflow', 'inactive'],
      notes: 'Activate during off-season',
      history: [
        { date: '2024-03-01', action: 'Deactivated', user: 'Inventory Manager', reason: 'Seasonal deactivation' },
        { date: '2024-01-30', action: 'Created', user: 'Inventory Manager' },
      ],
    },
    {
      id: 'RULE-012',
      name: 'Hazardous Liquids to Spill-Containment Bins',
      description: 'Route hazardous liquids to spill-containment bins',
      strategy: 'safety',
      priority: 1,
      status: 'active',
      warehouse: 'Warehouse B',
      zone: 'Hazardous Materials Zone',
      binType: 'hazardous',
      productCategories: ['Chemicals', 'Industrial'],
      productAttributes: ['liquid', 'hazardous', 'flammable'],
      conditions: [
        { field: 'hazardous', operator: 'equals', value: true },
        { field: 'physical_state', operator: 'equals', value: 'liquid' },
      ],
      destination: {
        type: 'bin-feature',
        value: 'spill-containment',
        binType: 'hazardous',
        specificBin: null,
      },
      safetyProtocol: 'HAZMAT-PROTOCOL-002',
      executionOrder: 2,
      createdBy: 'Safety Officer',
      createdAt: '2024-02-05',
      modifiedBy: 'Safety Officer',
      modifiedAt: '2024-02-18',
      appliedCount: 123,
      successRate: 100,
      avgExecutionTime: 42,
      tags: ['hazardous', 'liquid', 'spill-containment'],
      notes: 'Must use bins with spill containment',
      history: [
        { date: '2024-02-18', action: 'Modified', user: 'Safety Officer', changes: 'Updated safety requirements' },
        { date: '2024-02-05', action: 'Created', user: 'Safety Officer' },
      ],
    },
  ];

  // Warehouses
  const warehouses = [
    { id: 'wh-a', name: 'Warehouse A', rules: 7 },
    { id: 'wh-b', name: 'Warehouse B', rules: 2 },
    { id: 'wh-c', name: 'Warehouse C', rules: 2 },
    { id: 'all', name: 'All Warehouses', rules: 1 },
  ];

  // Putaway strategies
  const strategies = [
    { id: 'velocity', name: 'Velocity-Based', icon: TrendingUp, description: 'Based on item turnover rate' },
    { id: 'size', name: 'Size-Based', icon: Ruler, description: 'Based on item dimensions/volume' },
    { id: 'product-type', name: 'Product Type', icon: Package, description: 'Based on product category' },
    { id: 'safety', name: 'Safety', icon: AlertTriangle, description: 'Based on safety requirements' },
    { id: 'value', name: 'Value-Based', icon: DollarSign, description: 'Based on item value' },
    { id: 'temperature', name: 'Temperature', icon: Thermometer, description: 'Based on temperature requirements' },
    { id: 'velocity-size', name: 'Velocity & Size', icon: Activity, description: 'Combined velocity and size' },
    { id: 'process', name: 'Process-Based', icon: Workflow, description: 'Based on special processes' },
    { id: 'seasonal', name: 'Seasonal', icon: Calendar, description: 'Based on seasonality' },
    { id: 'random', name: 'Random', icon: Shuffle, description: 'Random available location' },
  ];

  // Product categories
  const categories = [
    'Electronics', 'Furniture', 'Industrial', 'Food', 'Dairy', 'Produce',
    'Meat', 'Chemicals', 'Jewelry', 'Medical', 'Frozen Food', 'Ice Cream',
    'Health', 'Office', 'Seasonal', 'Holiday'
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    draft: { label: 'Draft', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FileText },
    testing: { label: 'Testing', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Activity },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getStrategyIcon = (strategyId) => {
    const found = strategies.find(s => s.id === strategyId);
    const Icon = found?.icon || Package;
    return Icon;
  };

  const filteredRules = putawayRules.filter(rule => {
    const matchesStatus = selectedStatus === 'all' || rule.status === selectedStatus;
    const matchesStrategy = selectedStrategy === 'all' || rule.strategy === selectedStrategy;
    const matchesWarehouse = selectedWarehouse === 'all' || rule.warehouse === selectedWarehouse;
    const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rule.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesStrategy && matchesWarehouse && matchesSearch;
  }).sort((a, b) => a.priority - b.priority);

  const stats = {
    total: putawayRules.length,
    active: putawayRules.filter(r => r.status === 'active').length,
    inactive: putawayRules.filter(r => r.status === 'inactive').length,
    draft: putawayRules.filter(r => r.status === 'draft').length,
    totalApplied: putawayRules.reduce((sum, r) => sum + r.appliedCount, 0),
    avgSuccessRate: Math.round(putawayRules.reduce((sum, r) => sum + r.successRate, 0) / putawayRules.length),
    uniqueStrategies: new Set(putawayRules.map(r => r.strategy)).size,
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Putaway Rules</h1>
            <p className="text-black/50 mt-1">Configure and manage rules for optimal inventory placement</p>
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
              onClick={() => setShowSimulationDialog(true)}
            >
              <Activity size={16} />
              Simulate
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowOptimizeDialog(true)}
            >
              <Workflow size={16} />
              Optimize
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create Rule
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Rules</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Workflow size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Draft</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.draft}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <FileText size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Applied</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalApplied.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <PackageCheck size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Success</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.avgSuccessRate}%</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <Activity size={18} className="text-green-600" />
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
              placeholder="Search by rule name, description, or tags..."
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
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="testing">Testing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Strategies</SelectItem>
              {strategies.map(strategy => (
                <SelectItem key={strategy.id} value={strategy.id}>{strategy.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              {warehouses.map(wh => (
                <SelectItem key={wh.id} value={wh.name}>{wh.name}</SelectItem>
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

      {/* Rules Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredRules.map((rule) => {
            const StatusIcon = statusConfig[rule.status]?.icon || CheckCircle;
            const StrategyIcon = getStrategyIcon(rule.strategy);
            
            return (
              <Card key={rule.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(rule.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {rule.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            Priority {rule.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{rule.name}</h3>
                        <p className="text-xs text-black/50 mt-1 line-clamp-1">{rule.description}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedRule(rule);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedRule(rule);
                            setShowTestDialog(true);
                          }}>
                            <Activity className="mr-2 h-4 w-4" />
                            Test Rule
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedRule(rule);
                            setShowPriorityDialog(true);
                          }}>
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            Adjust Priority
                          </DropdownMenuItem>
                          {rule.status === 'active' ? (
                            <DropdownMenuItem onClick={() => {
                              setSelectedRule(rule);
                              setShowDisableDialog(true);
                            }}>
                              <Ban className="mr-2 h-4 w-4" />
                              Disable
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => {
                              setSelectedRule(rule);
                              setShowEnableDialog(true);
                            }}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Enable
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => {
                            setSelectedRule(rule);
                            setShowCloneDialog(true);
                          }}>
                            <Copy className="mr-2 h-4 w-4" />
                            Clone
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
                    {/* Strategy & Destination */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-[#F5EEE9] rounded">
                        <StrategyIcon size={14} className="text-red-600" />
                      </div>
                      <span className="text-xs font-medium capitalize">{rule.strategy.replace('-', ' ')}</span>
                      <ArrowRight size={12} className="text-black/30" />
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {rule.destination.type}: {rule.destination.value}
                      </Badge>
                    </div>

                    {/* Conditions */}
                    <div className="space-y-1 mb-3">
                      <p className="text-xs text-black/50">Conditions</p>
                      {rule.conditions.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {rule.conditions.map((cond, idx) => (
                            <Badge key={idx} className="bg-[#F5EEE9] text-black text-[10px] font-normal">
                              {cond.field} {cond.operator} {cond.value}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-black/30 italic">No conditions (catch-all)</p>
                      )}
                    </div>

                    {/* Categories */}
                    {rule.productCategories.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-black/50">Categories</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rule.productCategories.slice(0, 3).map((cat) => (
                            <Badge key={cat} variant="outline" className="text-xs border-[#F5EEE9]">
                              {cat}
                            </Badge>
                          ))}
                          {rule.productCategories.length > 3 && (
                            <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                              +{rule.productCategories.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#F5EEE9]">
                      <div className="text-center">
                        <p className="text-[10px] text-black/50">Applied</p>
                        <p className="text-sm font-bold text-black">{rule.appliedCount}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-black/50">Success</p>
                        <p className="text-sm font-bold text-green-600">{rule.successRate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-black/50">Avg Time</p>
                        <p className="text-sm font-bold text-black">{rule.avgExecutionTime}ms</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {rule.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] border-[#F5EEE9] bg-[#F5EEE9]/30">
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
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Rule Name</TableHead>
                  <TableHead className="text-black/50">Strategy</TableHead>
                  <TableHead className="text-black/50">Warehouse</TableHead>
                  <TableHead className="text-black/50">Destination</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50 text-right">Applied</TableHead>
                  <TableHead className="text-black/50 text-right">Success Rate</TableHead>
                  <TableHead className="text-black/50">Categories</TableHead>
                  <TableHead className="text-black/50">Last Modified</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRules.map((rule) => (
                  <TableRow key={rule.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="text-center font-medium">{rule.priority}</TableCell>
                    <TableCell className="font-medium">
                      <div>
                        {rule.name}
                        <p className="text-xs text-black/50 line-clamp-1">{rule.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9] capitalize">
                        {rule.strategy.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{rule.warehouse}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {rule.destination.value}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(rule.status))}>
                        {rule.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{rule.appliedCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className={rule.successRate >= 99 ? 'text-green-600' : rule.successRate >= 95 ? 'text-yellow-600' : 'text-red-600'}>
                        {rule.successRate}%
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[150px]">
                      <div className="flex flex-wrap gap-1">
                        {rule.productCategories.slice(0, 2).map((cat) => (
                          <Badge key={cat} variant="outline" className="text-[10px] border-[#F5EEE9]">
                            {cat}
                          </Badge>
                        ))}
                        {rule.productCategories.length > 2 && (
                          <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                            +{rule.productCategories.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{rule.modifiedAt || rule.createdAt}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedRule(rule);
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
                Showing {filteredRules.length} of {putawayRules.length} rules
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

      {/* Create Rule Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create Putaway Rule</DialogTitle>
            <DialogDescription>
              Define a new rule for automated inventory placement
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="conditions">Conditions</TabsTrigger>
                <TabsTrigger value="destination">Destination</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rule Name</Label>
                    <Input placeholder="e.g., Fast-Moving Electronics to Forward Pick" />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Input type="number" placeholder="1 (highest)" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the purpose of this rule" rows={2} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Strategy</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        {strategies.map(strategy => (
                          <SelectItem key={strategy.id} value={strategy.id}>{strategy.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                </div>

                <div className="space-y-2">
                  <Label>Product Categories</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>
              </TabsContent>

              <TabsContent value="conditions" className="space-y-4">
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="grid grid-cols-3 gap-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="turnover_rate">Turnover Rate</SelectItem>
                          <SelectItem value="volume">Volume</SelectItem>
                          <SelectItem value="weight">Weight</SelectItem>
                          <SelectItem value="unit_cost">Unit Cost</SelectItem>
                          <SelectItem value="category">Category</SelectItem>
                          <SelectItem value="hazardous">Hazardous</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="not_equals">Not Equals</SelectItem>
                          <SelectItem value="greater_than">Greater Than</SelectItem>
                          <SelectItem value="less_than">Less Than</SelectItem>
                          <SelectItem value="in">In</SelectItem>
                          <SelectItem value="not_null">Not Null</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Value" />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus size={14} className="mr-2" />
                    Add Condition
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="destination" className="space-y-4">
                <div className="space-y-2">
                  <Label>Destination Type</Label>
                  <RadioGroup defaultValue="zone" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="zone" id="zone" />
                      <Label htmlFor="zone">Zone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bin-type" id="bin-type" />
                      <Label htmlFor="bin-type">Bin Type</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="specific" id="specific" />
                      <Label htmlFor="specific">Specific Bin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="random" id="random" />
                      <Label htmlFor="random">Random</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Zone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="picking">Picking Zone</SelectItem>
                      <SelectItem value="storage-a">Storage Zone A</SelectItem>
                      <SelectItem value="storage-b">Storage Zone B</SelectItem>
                      <SelectItem value="cold">Cold Storage Zone</SelectItem>
                      <SelectItem value="hazmat">Hazardous Materials Zone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bin Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bin type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pallet-rack">Pallet Rack</SelectItem>
                      <SelectItem value="bulk-floor">Bulk Floor</SelectItem>
                      <SelectItem value="picking-bin">Picking Bin</SelectItem>
                      <SelectItem value="cold-storage">Cold Storage</SelectItem>
                      <SelectItem value="freezer">Freezer</SelectItem>
                      <SelectItem value="hazardous">Hazardous</SelectItem>
                      <SelectItem value="flow-rack">Flow Rack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-2">
                  <Label>Fallback Rule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fallback rule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="RULE-002">Bulk Items to Bulk Storage</SelectItem>
                      <SelectItem value="RULE-005">General Items to Random Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <RadioGroup defaultValue="draft" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <Label htmlFor="active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="draft" id="draft" />
                      <Label htmlFor="draft">Draft</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="testing" id="testing" />
                      <Label htmlFor="testing">Testing</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes" rows={3} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rule Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Putaway Rule Details</DialogTitle>
          </DialogHeader>

          {selectedRule && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="conditions">Conditions</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedRule.name}</h3>
                      <p className="text-sm text-black/50">{selectedRule.description}</p>
                    </div>
                    <Badge className={cn("text-xs border-0", getStatusColor(selectedRule.status))}>
                      {selectedRule.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Priority</p>
                      <p className="text-lg font-bold">{selectedRule.priority}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Strategy</p>
                      <p className="font-medium capitalize">{selectedRule.strategy.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Warehouse</p>
                      <p className="font-medium">{selectedRule.warehouse}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Zone</p>
                      <p className="font-medium">{selectedRule.zone}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs font-medium mb-2">Destination</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-black/50">Type</p>
                        <p className="text-sm">{selectedRule.destination.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Value</p>
                        <p className="text-sm">{selectedRule.destination.value}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Bin Type</p>
                        <p className="text-sm">{selectedRule.destination.binType}</p>
                      </div>
                    </div>
                  </div>

                  {selectedRule.temperatureRequirement && (
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">Temperature: {selectedRule.temperatureRequirement}</p>
                    </div>
                  )}

                  {selectedRule.safetyProtocol && (
                    <div className="p-2 bg-red-50 rounded-lg">
                      <p className="text-xs text-red-700">Safety Protocol: {selectedRule.safetyProtocol}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <p className="text-[10px] text-black/50">Applied</p>
                        <p className="text-base font-bold">{selectedRule.appliedCount}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <p className="text-[10px] text-black/50">Success</p>
                        <p className="text-base font-bold text-green-600">{selectedRule.successRate}%</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <p className="text-[10px] text-black/50">Avg Time</p>
                        <p className="text-base font-bold">{selectedRule.avgExecutionTime}ms</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <p className="text-xs font-medium mb-1">Categories</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedRule.productCategories.map((cat) => (
                        <Badge key={cat} variant="outline" className="text-xs border-[#F5EEE9]">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedRule.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedRule.notes && (
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedRule.notes}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-black/50">Created</p>
                      <p>{selectedRule.createdAt} by {selectedRule.createdBy}</p>
                    </div>
                    {selectedRule.modifiedBy && (
                      <div>
                        <p className="text-black/50">Modified</p>
                        <p>{selectedRule.modifiedAt} by {selectedRule.modifiedBy}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="conditions">
                  <div className="space-y-3">
                    {selectedRule.conditions.length > 0 ? (
                      selectedRule.conditions.map((cond, idx) => (
                        <div key={idx} className="p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <p className="text-xs text-black/50">Field</p>
                              <p className="text-sm">{cond.field}</p>
                            </div>
                            <div>
                              <p className="text-xs text-black/50">Operator</p>
                              <p className="text-sm">{cond.operator}</p>
                            </div>
                            <div>
                              <p className="text-xs text-black/50">Value</p>
                              <p className="text-sm">{cond.value}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-black/50 text-center py-4">No conditions (catch-all rule)</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedRule.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-0.5">
                            {item.action === 'Created' && <Plus size={12} className="text-green-600" />}
                            {item.action === 'Modified' && <Edit size={12} className="text-blue-600" />}
                            {item.action === 'Deactivated' && <Ban size={12} className="text-red-600" />}
                            {item.action === 'Activated' && <CheckCircle size={12} className="text-green-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
                            {item.changes && <p className="text-[10px] text-black/70">Changes: {item.changes}</p>}
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
            <Button className="bg-red-600 hover:bg-red-700">
              <Edit className="mr-2 h-4 w-4" />
              Edit Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Rule Dialog */}
      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Test Putaway Rule</DialogTitle>
            <DialogDescription>
              Simulate rule execution with sample item
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedRule?.name}</p>
              <p className="text-xs text-black/50">Priority: {selectedRule?.priority}</p>
            </div>

            <div className="space-y-2">
              <Label>Select Test Item</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SKU-001">Premium Wireless Headphones</SelectItem>
                  <SelectItem value="SKU-002">Organic Protein Powder</SelectItem>
                  <SelectItem value="SKU-003">Industrial Lubricant</SelectItem>
                  <SelectItem value="SKU-004">Ergonomic Office Chair</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-700 mb-2">Test Result</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-600">Rule Matches:</span>
                  <Badge className="bg-green-100 text-green-700">Yes</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-600">Suggested Destination:</span>
                  <span className="font-medium">{selectedRule?.destination.value}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-600">Estimated Time:</span>
                  <span>{selectedRule?.avgExecutionTime}ms</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTestDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Run Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Priority Dialog */}
      <Dialog open={showPriorityDialog} onOpenChange={setShowPriorityDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Adjust Rule Priority</DialogTitle>
            <DialogDescription>
              Change execution order priority
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedRule?.name}</p>
              <p className="text-xs text-black/50">Current Priority: {selectedRule?.priority}</p>
            </div>

            <div className="space-y-2">
              <Label>New Priority</Label>
              <Input type="number" placeholder="Enter priority (1 = highest)" />
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-xs text-yellow-700">
                Changing priority may affect other rules execution order.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPriorityDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Update Priority
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
            <TooltipContent side="left">Create Rule</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowSimulationDialog(true)}
              >
                <Activity size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Simulate</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowOptimizeDialog(true)}
              >
                <Workflow size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Optimize</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PutawayRulesPage;