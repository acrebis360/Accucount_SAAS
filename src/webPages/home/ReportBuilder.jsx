// app/dashboard/report-builder/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart,
  Save,
  Download,
  Play,
  Eye,
  Trash2,
  Copy,
  Share2,
  Settings,
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Filter,
  Calendar,
  RefreshCw,
  Search,
  MoreVertical,
  FileText,
  PieChart,
  TrendingUp,
  Package,
  DollarSign,
  Users,
  Store,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Columns,
  Rows,
  Table as TableIcon,
  BarChart3,
  LineChart,
  AreaChart,
  ScatterChart,
  PieChart as PieChartIcon,
  Donut,
  Radar,
  Gauge,
  Activity,
  Box,
  Layers,
  Database,
  RefreshCw as RefreshIcon,
  Save as SaveIcon,
  FileOutput,
  FileInput,
  FileJson,
  FileSpreadsheet,
  FileText as FilePdf,
  Mail,
  Printer,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  Eye as EyeIcon,
  EyeOff,
  Lock,
  Unlock,
  Copy as CopyIcon,
  Trash,
  Edit,
  Move,
  PlusCircle,
  MinusCircle,
  Settings as SettingsIcon,
  HelpCircle,
  Info,
  AlertCircle,
  Check,
  Upload,
  Download as DownloadIcon,
  Share,
  Star,
  StarOff,
  History,
  Bookmark,
  BookmarkCheck,
  Code,
  Workflow,
  Layout,
  LayoutGrid,
  LayoutList,
  LayoutDashboard,
  Columns2,
  Columns3,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Split,
  Combine,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  MoveHorizontal,
  MoveVertical,
  RotateCw,
  RotateCcw,
  Undo2,
  Redo2,
  Eraser,
  Paintbrush,
  Palette,
  Sparkles,
  Wand2,
  Brain,
  Bot,
  Calculator,
  Sigma,
  FunctionSquare,
  Variable,
  Hash,
  Percent,
  Divide,
  Plus as PlusIcon,
  Minus,
  Equal,
  GreaterThan,
  LessThan,
  NotEqual,
  And,
  Or,
  If,
  Then,
  Else,
  Case,
  Loop,
  Repeat,
  Infinity,
  Triangle,
  Square,
  Circle,
  Hexagon,
  Octagon,
  Pentagon,
  Rhombus,
  Star as StarIcon,
  Heart,
  Flag,
  Tag,
  PriceTag,
  Award,
  Crown,
  Medal,
  Trophy,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Sad,
  Surprise,
  Zap,
  Flame,
  Droplet,
  Wind,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Umbrella,
  Thermometer,
  Compass,
  Navigation,
  Map as MapIcon,
  MapPin,
  Route,
  Waypoints,
  Locate,
  LocateFixed,
  LocateOff,
  Crosshair,
  Target,
  Bullseye,
  Scope,
  Swords,
  Shield as ShieldIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldAlert,
  ShieldBan,
  ShieldX,
  Sword,
  Axe,
  Hammer,
  Pickaxe,
  Shovel,
  Wrench as WrenchIcon,
  Screwdriver,
  Pliers,
  Saw,
  Drill,
  Tool,
  Toolbox,
  Construction,
  Building as BuildingIcon,
  Factory,
  Warehouse,
  Home as HomeIcon,
  Building2,
  Store as StoreIcon,
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  Wallet,
  Banknote,
  Coins,
  PiggyBank,
  Percent as PercentIcon,
  BadgeDollarSign,
  BadgeEuro,
  BadgePound,
  BadgeJapaneseYen,
  BadgeIndianRupee,
  BadgeRussianRuble,
  BadgeKoreanWon,
  BadgeSwissFranc,
  BadgeCent,
  BadgePercent,
  BadgeInfo,
  BadgeCheck,
  BadgeX,
  BadgeAlert,
  BadgeHelp,
  BadgePlus,
  BadgeMinus,
  BadgeDivide,
  BadgeEqual,
  BadgeNotEqual,
  BadgeGreaterThan,
  BadgeLessThan,
  GripVertical,
  Briefcase,
  Cpu,
  MessageSquare,
  BookOpen,
  ShieldCheck,
  Truck,
  Link2,
  Shield,
  TrendingDown
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ReportBuilderPage = () => {
  const [reportName, setReportName] = useState('Untitled Report');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedModule, setSelectedModule] = useState('inventory');
  const [selectedDataSource, setSelectedDataSource] = useState('all');
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [groupBy, setGroupBy] = useState([]);
  const [chartType, setChartType] = useState('table');
  const [visualizationType, setVisualizationType] = useState('bar');
  const [dateRange, setDateRange] = useState('last30days');
  const [customDateStart, setCustomDateStart] = useState(null);
  const [customDateEnd, setCustomDateEnd] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('fields');
  const [viewMode, setViewMode] = useState('design');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [recentReports, setRecentReports] = useState([]);
  const [savedReports, setSavedReports] = useState([]);
  const [reportTemplates, setReportTemplates] = useState([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const [showMetricSelector, setShowMetricSelector] = useState(false);
  const [showDimensionSelector, setShowDimensionSelector] = useState(false);
  const [showFilterBuilder, setShowFilterBuilder] = useState(false);
  const [showSortBuilder, setShowSortBuilder] = useState(false);
  const [showGroupBuilder, setShowGroupBuilder] = useState(false);
  const [showChartCustomizer, setShowChartCustomizer] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [showFontSelector, setShowFontSelector] = useState(false);
  const [showLayoutSelector, setShowLayoutSelector] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showScheduleOptions, setShowScheduleOptions] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showVersion, setShowVersion] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showFolders, setShowFolders] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [showPinned, setShowPinned] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showTrash, setShowTrash] = useState(false);

  // Available modules from your sidebar
  const modules = [
    { id: 'home', name: 'Home', icon: LayoutDashboard },
    { id: 'activities', name: 'Activities', icon: Activity },
    { id: 'inventory', name: 'Inventory Management', icon: Package },
    { id: 'asset', name: 'Asset Management', icon: Briefcase },
    { id: 'warehouse', name: 'Warehouse Management', icon: Warehouse },
    { id: 'iot', name: 'IoT & Devices', icon: Cpu },
    { id: 'communications', name: 'Communications', icon: MessageSquare },
    { id: 'learning', name: 'Learning Management', icon: BookOpen },
    { id: 'quality', name: 'Quality Control', icon: ShieldCheck },
    { id: 'supplier', name: 'Supplier Management', icon: Truck },
    { id: 'analytics', name: 'Analytics & Insights', icon: BarChart3 },
    { id: 'admin', name: 'Administration', icon: Settings },
    { id: 'integration', name: 'Integration', icon: Link2 },
    { id: 'tenant', name: 'Tenant Administration', icon: Building2 },
    { id: 'super', name: 'Super Administration', icon: Shield },
    { id: 'audit', name: 'Audit & Compliance', icon: Shield },
  ];

  // Data sources based on modules
  const dataSources = {
    home: [
      { id: 'dashboard', name: 'Dashboard Data' },
      { id: 'reports', name: 'Reports Data' },
      { id: 'metrics', name: 'Key Metrics' },
    ],
    activities: [
      { id: 'stocktake', name: 'Stocktake Records' },
      { id: 'scheduler', name: 'Stocktake Schedule' },
      { id: 'user_groups', name: 'User Groups' },
      { id: 'store_groups', name: 'Store Groups' },
    ],
    inventory: [
      { id: 'physical_inventory', name: 'Physical Inventory' },
      { id: 'stock_levels', name: 'Stock Levels' },
      { id: 'batch_tracking', name: 'Batch Tracking' },
      { id: 'serial_numbers', name: 'Serial Numbers' },
      { id: 'expiry_dates', name: 'Expiry Management' },
      { id: 'adjustments', name: 'Inventory Adjustments' },
      { id: 'sync_monitor', name: 'Sync Monitor' },
    ],
    asset: [
      { id: 'asset_depository', name: 'Asset Depository' },
      { id: 'asset_transfers', name: 'Asset Transfers' },
      { id: 'asset_valuation', name: 'Asset Valuation' },
      { id: 'depreciation', name: 'Depreciation' },
    ],
    warehouse: [
      { id: 'zones', name: 'Warehouse Zones' },
      { id: 'bin_locations', name: 'Bin Locations' },
      { id: 'putaway_rules', name: 'Putaway Rules' },
      { id: 'picking_lists', name: 'Picking Lists' },
      { id: 'packing_stations', name: 'Packing Stations' },
      { id: 'shipping', name: 'Shipping Records' },
      { id: 'receiving', name: 'Receiving Records' },
    ],
    iot: [
      { id: 'devices', name: 'Connected Devices' },
      { id: 'rfid_scanners', name: 'RFID Scanners' },
      { id: 'gateway', name: 'IoT Gateway' },
      { id: 'device_health', name: 'Device Health' },
      { id: 'battery_status', name: 'Battery Status' },
      { id: 'firmware', name: 'Firmware Updates' },
    ],
    communications: [
      { id: 'notice_board', name: 'Notice Board' },
      { id: 'announcements', name: 'Announcements' },
      { id: 'messages', name: 'Messages' },
      { id: 'notifications', name: 'Notifications' },
    ],
    learning: [
      { id: 'trainings', name: 'Trainings' },
      { id: 'library', name: 'Library' },
      { id: 'ai_bot', name: 'AI Bot Queries' },
      { id: 'learning_paths', name: 'Learning Paths' },
      { id: 'certifications', name: 'Certifications' },
    ],
    quality: [
      { id: 'quality_checks', name: 'Quality Checks' },
      { id: 'inspections', name: 'Inspection Reports' },
      { id: 'defects', name: 'Defect Tracking' },
      { id: 'returns', name: 'Returns' },
      { id: 'rma', name: 'RMA Processing' },
    ],
    supplier: [
      { id: 'vendors', name: 'Vendors' },
      { id: 'purchase_orders', name: 'Purchase Orders' },
      { id: 'supplier_performance', name: 'Supplier Performance' },
      { id: 'contracts', name: 'Contracts' },
      { id: 'reorder', name: 'Reorder Automation' },
    ],
    analytics: [
      { id: 'forecasting', name: 'Inventory Forecasting' },
      { id: 'demand_planning', name: 'Demand Planning' },
      { id: 'trend_analysis', name: 'Trend Analysis' },
      { id: 'performance', name: 'Performance Metrics' },
      { id: 'ai_predictions', name: 'AI Predictions' },
      { id: 'custom_dashboards', name: 'Custom Dashboards' },
    ],
    admin: [
      { id: 'organization', name: 'Organization' },
      { id: 'users', name: 'Users' },
      { id: 'roles', name: 'Roles' },
      { id: 'masters', name: 'Masters' },
      { id: 'requests', name: 'Requests' },
      { id: 'subscriptions', name: 'Subscriptions' },
      { id: 'billing', name: 'Billing History' },
      { id: 'audit_logs', name: 'Audit Logs' },
    ],
    integration: [
      { id: 'api_keys', name: 'API Keys' },
      { id: 'api_docs', name: 'API Documentation' },
      { id: 'erp_integration', name: 'ERP Integration' },
      { id: 'iot_integration', name: 'IOT Integration' },
      { id: 'sync_status', name: 'Sync Status' },
      { id: 'webhooks', name: 'Webhooks' },
    ],
    tenant: [
      { id: 'clients', name: 'Clients' },
      { id: 'client_admins', name: 'Client Admins' },
      { id: 'tenant_requests', name: 'Requests' },
      { id: 'tenant_subscriptions', name: 'Subscriptions' },
      { id: 'billing', name: 'Billing & Payments' },
      { id: 'services', name: 'Services' },
      { id: 'pricing', name: 'Pricing' },
      { id: 'usage', name: 'Usage Analytics' },
    ],
    super: [
      { id: 'tenants', name: 'Tenants' },
      { id: 'tenant_admins', name: 'Tenant Admins' },
      { id: 'platform_settings', name: 'Platform Settings' },
      { id: 'system_health', name: 'System Health' },
      { id: 'global_audit', name: 'Global Audit' },
    ],
    audit: [
      { id: 'audit_trail', name: 'Audit Trail' },
      { id: 'compliance', name: 'Compliance Reports' },
      { id: 'regulatory', name: 'Regulatory Docs' },
      { id: 'policies', name: 'Policies' },
      { id: 'certifications', name: 'Certifications' },
      { id: 'audit_schedule', name: 'Audit Schedule' },
    ],
  };

  // Available fields based on selected data source
  const availableFields = {
    physical_inventory: [
      { id: 'sku', name: 'SKU', type: 'text', category: 'product' },
      { id: 'product_name', name: 'Product Name', type: 'text', category: 'product' },
      { id: 'category', name: 'Category', type: 'text', category: 'product' },
      { id: 'quantity', name: 'Quantity', type: 'number', category: 'inventory' },
      { id: 'unit_cost', name: 'Unit Cost', type: 'currency', category: 'financial' },
      { id: 'total_value', name: 'Total Value', type: 'currency', category: 'financial' },
      { id: 'location', name: 'Location', type: 'text', category: 'warehouse' },
      { id: 'zone', name: 'Zone', type: 'text', category: 'warehouse' },
      { id: 'bin', name: 'Bin Location', type: 'text', category: 'warehouse' },
      { id: 'last_counted', name: 'Last Counted', type: 'date', category: 'time' },
      { id: 'count_status', name: 'Count Status', type: 'text', category: 'status' },
      { id: 'counted_by', name: 'Counted By', type: 'text', category: 'user' },
    ],
    stock_levels: [
      { id: 'sku', name: 'SKU', type: 'text', category: 'product' },
      { id: 'product_name', name: 'Product Name', type: 'text', category: 'product' },
      { id: 'current_stock', name: 'Current Stock', type: 'number', category: 'inventory' },
      { id: 'minimum_stock', name: 'Minimum Stock', type: 'number', category: 'inventory' },
      { id: 'maximum_stock', name: 'Maximum Stock', type: 'number', category: 'inventory' },
      { id: 'reorder_point', name: 'Reorder Point', type: 'number', category: 'inventory' },
      { id: 'reorder_quantity', name: 'Reorder Quantity', type: 'number', category: 'inventory' },
      { id: 'status', name: 'Status', type: 'text', category: 'status' },
      { id: 'location', name: 'Location', type: 'text', category: 'warehouse' },
    ],
    batch_tracking: [
      { id: 'batch_number', name: 'Batch Number', type: 'text', category: 'tracking' },
      { id: 'sku', name: 'SKU', type: 'text', category: 'product' },
      { id: 'product_name', name: 'Product Name', type: 'text', category: 'product' },
      { id: 'quantity', name: 'Quantity', type: 'number', category: 'inventory' },
      { id: 'manufacturing_date', name: 'Manufacturing Date', type: 'date', category: 'time' },
      { id: 'expiry_date', name: 'Expiry Date', type: 'date', category: 'time' },
      { id: 'supplier', name: 'Supplier', type: 'text', category: 'supplier' },
      { id: 'location', name: 'Location', type: 'text', category: 'warehouse' },
    ],
    stocktake: [
      { id: 'stocktake_id', name: 'Stocktake ID', type: 'text', category: 'id' },
      { id: 'date', name: 'Date', type: 'date', category: 'time' },
      { id: 'location', name: 'Location', type: 'text', category: 'warehouse' },
      { id: 'zone', name: 'Zone', type: 'text', category: 'warehouse' },
      { id: 'total_items', name: 'Total Items', type: 'number', category: 'count' },
      { id: 'counted_items', name: 'Counted Items', type: 'number', category: 'count' },
      { id: 'discrepancies', name: 'Discrepancies', type: 'number', category: 'quality' },
      { id: 'accuracy', name: 'Accuracy %', type: 'percentage', category: 'quality' },
      { id: 'status', name: 'Status', type: 'text', category: 'status' },
      { id: 'assigned_to', name: 'Assigned To', type: 'text', category: 'user' },
      { id: 'completed_by', name: 'Completed By', type: 'text', category: 'user' },
      { id: 'completion_date', name: 'Completion Date', type: 'date', category: 'time' },
    ],
    users: [
      { id: 'user_id', name: 'User ID', type: 'text', category: 'id' },
      { id: 'name', name: 'Name', type: 'text', category: 'personal' },
      { id: 'email', name: 'Email', type: 'text', category: 'contact' },
      { id: 'role', name: 'Role', type: 'text', category: 'access' },
      { id: 'department', name: 'Department', type: 'text', category: 'org' },
      { id: 'location', name: 'Location', type: 'text', category: 'org' },
      { id: 'status', name: 'Status', type: 'text', category: 'status' },
      { id: 'last_login', name: 'Last Login', type: 'date', category: 'time' },
      { id: 'created_at', name: 'Created At', type: 'date', category: 'time' },
    ],
  };

  // Available metrics for calculations
  const availableMetrics = [
    { id: 'sum', name: 'Sum', icon: Calculator },
    { id: 'average', name: 'Average', icon: Calculator },
    { id: 'count', name: 'Count', icon: Calculator },
    { id: 'count_distinct', name: 'Count Distinct', icon: Calculator },
    { id: 'min', name: 'Minimum', icon: Calculator },
    { id: 'max', name: 'Maximum', icon: Calculator },
    { id: 'median', name: 'Median', icon: Calculator },
    { id: 'mode', name: 'Mode', icon: Calculator },
    { id: 'stddev', name: 'Standard Deviation', icon: Calculator },
    { id: 'variance', name: 'Variance', icon: Calculator },
    { id: 'percentile', name: 'Percentile', icon: Calculator },
    { id: 'running_total', name: 'Running Total', icon: Calculator },
    { id: 'moving_average', name: 'Moving Average', icon: Calculator },
    { id: 'year_over_year', name: 'Year over Year', icon: TrendingUp },
    { id: 'month_over_month', name: 'Month over Month', icon: TrendingUp },
    { id: 'quarter_over_quarter', name: 'Quarter over Quarter', icon: TrendingUp },
  ];

  // Available dimensions for grouping
  const availableDimensions = [
    { id: 'date', name: 'Date', icon: Calendar },
    { id: 'month', name: 'Month', icon: Calendar },
    { id: 'quarter', name: 'Quarter', icon: Calendar },
    { id: 'year', name: 'Year', icon: Calendar },
    { id: 'category', name: 'Category', icon: Tag },
    { id: 'location', name: 'Location', icon: MapPin },
    { id: 'zone', name: 'Zone', icon: Grid },
    { id: 'bin', name: 'Bin', icon: Box },
    { id: 'supplier', name: 'Supplier', icon: Truck },
    { id: 'product', name: 'Product', icon: Package },
    { id: 'sku', name: 'SKU', icon: Hash },
    { id: 'batch', name: 'Batch', icon: Layers },
    { id: 'status', name: 'Status', icon: Activity },
    { id: 'user', name: 'User', icon: Users },
    { id: 'role', name: 'Role', icon: User },
    { id: 'department', name: 'Department', icon: Building },
  ];

  // Chart types
  const chartTypes = [
    { id: 'table', name: 'Table', icon: TableIcon },
    { id: 'bar', name: 'Bar Chart', icon: BarChart3 },
    { id: 'line', name: 'Line Chart', icon: LineChart },
    { id: 'area', name: 'Area Chart', icon: AreaChart },
    { id: 'pie', name: 'Pie Chart', icon: PieChartIcon },
    { id: 'donut', name: 'Donut Chart', icon: Donut },
    { id: 'scatter', name: 'Scatter Plot', icon: ScatterChart },
    { id: 'radar', name: 'Radar Chart', icon: Radar },
    { id: 'heatmap', name: 'Heatmap', icon: Grid },
    { id: 'gauge', name: 'Gauge', icon: Gauge },
    { id: 'funnel', name: 'Funnel Chart', icon: TrendingDown },
    { id: 'waterfall', name: 'Waterfall Chart', icon: TrendingDown },
    { id: 'candlestick', name: 'Candlestick', icon: Activity },
    { id: 'boxplot', name: 'Box Plot', icon: Box },
    { id: 'histogram', name: 'Histogram', icon: BarChart },
    { id: 'treemap', name: 'Treemap', icon: Grid },
    { id: 'sunburst', name: 'Sunburst', icon: Circle },
    { id: 'sankey', name: 'Sankey Diagram', icon: Workflow },
    { id: 'parallel', name: 'Parallel Coordinates', icon: Columns },
    { id: 'network', name: 'Network Graph', icon: Share },
  ];

  // Date range options
  const dateRanges = [
    { id: 'today', name: 'Today' },
    { id: 'yesterday', name: 'Yesterday' },
    { id: 'last7days', name: 'Last 7 Days' },
    { id: 'last30days', name: 'Last 30 Days' },
    { id: 'last90days', name: 'Last 90 Days' },
    { id: 'last12months', name: 'Last 12 Months' },
    { id: 'thisMonth', name: 'This Month' },
    { id: 'lastMonth', name: 'Last Month' },
    { id: 'thisQuarter', name: 'This Quarter' },
    { id: 'lastQuarter', name: 'Last Quarter' },
    { id: 'thisYear', name: 'This Year' },
    { id: 'lastYear', name: 'Last Year' },
    { id: 'custom', name: 'Custom Range' },
  ];

  // Filter operators
  const filterOperators = [
    { id: 'equals', name: 'Equals', symbol: '=' },
    { id: 'not_equals', name: 'Not Equals', symbol: '≠' },
    { id: 'contains', name: 'Contains', symbol: 'contains' },
    { id: 'not_contains', name: 'Not Contains', symbol: 'does not contain' },
    { id: 'starts_with', name: 'Starts With', symbol: 'starts with' },
    { id: 'ends_with', name: 'Ends With', symbol: 'ends with' },
    { id: 'greater_than', name: 'Greater Than', symbol: '>' },
    { id: 'greater_than_equal', name: 'Greater Than or Equal', symbol: '≥' },
    { id: 'less_than', name: 'Less Than', symbol: '<' },
    { id: 'less_than_equal', name: 'Less Than or Equal', symbol: '≤' },
    { id: 'between', name: 'Between', symbol: 'between' },
    { id: 'in', name: 'In', symbol: 'in' },
    { id: 'not_in', name: 'Not In', symbol: 'not in' },
    { id: 'is_null', name: 'Is Null', symbol: 'is null' },
    { id: 'is_not_null', name: 'Is Not Null', symbol: 'is not null' },
    { id: 'is_empty', name: 'Is Empty', symbol: 'is empty' },
    { id: 'is_not_empty', name: 'Is Not Empty', symbol: 'is not empty' },
  ];

  // Sample preview data
  const previewData = [
    { id: 1, product: 'Product A', category: 'Electronics', quantity: 150, value: 15000, location: 'Warehouse A', status: 'In Stock' },
    { id: 2, product: 'Product B', category: 'Furniture', quantity: 75, value: 11250, location: 'Warehouse B', status: 'Low Stock' },
    { id: 3, product: 'Product C', category: 'Clothing', quantity: 200, value: 8000, location: 'Warehouse A', status: 'In Stock' },
    { id: 4, product: 'Product D', category: 'Electronics', quantity: 25, value: 3750, location: 'Store A', status: 'Critical' },
    { id: 5, product: 'Product E', category: 'Food', quantity: 500, value: 2500, location: 'Store B', status: 'In Stock' },
    { id: 6, product: 'Product F', category: 'Furniture', quantity: 40, value: 8000, location: 'Warehouse B', status: 'Low Stock' },
    { id: 7, product: 'Product G', category: 'Electronics', quantity: 120, value: 24000, location: 'Warehouse A', status: 'In Stock' },
    { id: 8, product: 'Product H', category: 'Clothing', quantity: 300, value: 9000, location: 'Store A', status: 'In Stock' },
  ];

  const handleAddField = (field) => {
    if (!selectedFields.find(f => f.id === field.id)) {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleRemoveField = (fieldId) => {
    setSelectedFields(selectedFields.filter(f => f.id !== fieldId));
  };

  const handleAddFilter = () => {
    setFilters([...filters, { id: Date.now(), field: '', operator: 'equals', value: '' }]);
  };

  const handleRemoveFilter = (filterId) => {
    setFilters(filters.filter(f => f.id !== filterId));
  };

  const handleUpdateFilter = (filterId, key, value) => {
    setFilters(filters.map(f => f.id === filterId ? { ...f, [key]: value } : f));
  };

  const handleAddSort = () => {
    setSortBy([...sortBy, { id: Date.now(), field: '', direction: 'asc' }]);
  };

  const handleRemoveSort = (sortId) => {
    setSortBy(sortBy.filter(s => s.id !== sortId));
  };

  const handleUpdateSort = (sortId, key, value) => {
    setSortBy(sortBy.map(s => s.id === sortId ? { ...s, [key]: value } : s));
  };

  const handleAddGroup = () => {
    setGroupBy([...groupBy, { id: Date.now(), field: '' }]);
  };

  const handleRemoveGroup = (groupId) => {
    setGroupBy(groupBy.filter(g => g.id !== groupId));
  };

  const handleRunReport = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowPreview(true);
    }, 2000);
  };

  const handleSaveReport = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveDialog(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] bg-white sticky top-0 z-10 rounded-md">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Layout size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <Input
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="border-none text-lg font-semibold w-64 focus-visible:ring-0 px-0"
                placeholder="Report name"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save as Template
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <History className="mr-2 h-4 w-4" />
                    Version History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Badge variant="outline" className="border-[#F5EEE9] bg-[#F5EEE9]/30">
              Draft
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <History size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Version History</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Undo2 size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Redo2 size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator orientation="vertical" className="h-6 mx-2 bg-[#F5EEE9]" />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <EyeIcon size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Preview</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#F5EEE9]">
                  <DownloadIcon size={16} />
                  Export
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FilePdf className="mr-2 h-4 w-4 text-red-600" />
                  PDF Document
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                  Excel Spreadsheet
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileJson className="mr-2 h-4 w-4 text-blue-600" />
                  JSON Data
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  CSV File
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#F5EEE9]">
                  <Share size={16} />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Share with Team
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link2 className="mr-2 h-4 w-4" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Report
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Lock className="mr-2 h-4 w-4" />
                  Permissions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowSaveDialog(true)}
            >
              <SaveIcon size={16} />
              Save
            </Button>

            <Button
              className="gap-2 bg-black hover:bg-black/80 text-white"
              onClick={handleRunReport}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Run Report
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
          <TabsList className="bg-transparent border-b border-[#F5EEE9] rounded-none h-12">
            <TabsTrigger 
              value="fields" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:shadow-none data-[state=active]:text-red-600"
            >
              Fields
            </TabsTrigger>
            <TabsTrigger 
              value="visualization" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:shadow-none data-[state=active]:text-red-600"
            >
              Visualization
            </TabsTrigger>
            <TabsTrigger 
              value="filters" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:shadow-none data-[state=active]:text-red-600"
            >
              Filters
            </TabsTrigger>
            <TabsTrigger 
              value="sorting" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:shadow-none data-[state=active]:text-red-600"
            >
              Sorting
            </TabsTrigger>
            <TabsTrigger 
              value="grouping" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:shadow-none data-[state=active]:text-red-600"
            >
              Grouping
            </TabsTrigger>
            <TabsTrigger 
              value="metrics" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:shadow-none data-[state=active]:text-red-600"
            >
              Metrics
            </TabsTrigger>
            <TabsTrigger 
              value="formatting" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:shadow-none data-[state=active]:text-red-600"
            >
              Formatting
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - Configuration */}
        {sidebarOpen && (
          <div className="w-80 border-r border-[#F5EEE9] bg-white h-[calc(100vh-8rem)] overflow-y-auto">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-6">
                {/* Data Source Selection */}
                <div>
                  <h3 className="text-sm font-medium text-black mb-3">Data Source</h3>
                  <div className="space-y-4">
                    <Select value={selectedModule} onValueChange={setSelectedModule}>
                      <SelectTrigger className="border-[#F5EEE9]">
                        <SelectValue placeholder="Select module" />
                      </SelectTrigger>
                      <SelectContent>
                        {modules.map((module) => {
                          const Icon = module.icon;
                          return (
                            <SelectItem key={module.id} value={module.id}>
                              <div className="flex items-center gap-2">
                                <Icon size={14} className="text-red-600" />
                                {module.name}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                      <SelectTrigger className="border-[#F5EEE9]">
                        <SelectValue placeholder="Select data source" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataSources[selectedModule]?.map((source) => (
                          <SelectItem key={source.id} value={source.id}>
                            {source.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="border-[#F5EEE9]">
                        <SelectValue placeholder="Date range" />
                      </SelectTrigger>
                      <SelectContent>
                        {dateRanges.map((range) => (
                          <SelectItem key={range.id} value={range.id}>
                            {range.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {dateRange === 'custom' && (
                      <div className="grid grid-cols-2 gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="border-[#F5EEE9] justify-start">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {customDateStart ? customDateStart.toLocaleDateString() : 'Start date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={customDateStart}
                              onSelect={setCustomDateStart}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="border-[#F5EEE9] justify-start">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {customDateEnd ? customDateEnd.toLocaleDateString() : 'End date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={customDateEnd}
                              onSelect={setCustomDateEnd}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="bg-[#F5EEE9]" />

                {/* Fields Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-black">Fields</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setShowFieldSelector(true)}
                    >
                      <Plus size={14} className="mr-1" />
                      Add Field
                    </Button>
                  </div>

                  {selectedFields.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-[#F5EEE9] rounded-lg">
                      <Package className="mx-auto h-8 w-8 text-black/30" />
                      <p className="text-sm text-black/50 mt-2">No fields selected</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => setShowFieldSelector(true)}
                      >
                        Add Fields
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedFields.map((field) => (
                        <div
                          key={field.id}
                          className="flex items-center justify-between p-2 bg-[#F5EEE9]/30 rounded-lg group"
                        >
                          <div className="flex items-center gap-2">
                            <GripVertical size={14} className="text-black/30 cursor-move" />
                            <div>
                              <p className="text-sm font-medium text-black">{field.name}</p>
                              <p className="text-xs text-black/50">{field.category}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100"
                            onClick={() => handleRemoveField(field.id)}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator className="bg-[#F5EEE9]" />

                {/* Metrics */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-black">Metrics</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setShowMetricSelector(true)}
                    >
                      <Plus size={14} className="mr-1" />
                      Add Metric
                    </Button>
                  </div>

                  {selectedMetrics.length === 0 ? (
                    <p className="text-sm text-black/50 text-center py-4">No metrics added</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedMetrics.map((metric, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-[#F5EEE9]/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Calculator size={14} className="text-red-600" />
                            <span className="text-sm">{metric}</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <X size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator className="bg-[#F5EEE9]" />

                {/* Dimensions */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-black">Dimensions</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setShowDimensionSelector(true)}
                    >
                      <Plus size={14} className="mr-1" />
                      Add Dimension
                    </Button>
                  </div>

                  {selectedDimensions.length === 0 ? (
                    <p className="text-sm text-black/50 text-center py-4">No dimensions added</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedDimensions.map((dimension, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-[#F5EEE9]/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Layers size={14} className="text-red-600" />
                            <span className="text-sm">{dimension}</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <X size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Main Canvas - Report Preview */}
        <div className="flex-1 p-6 bg-[#F5EEE9]/20">
          {!showPreview ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-[#F5EEE9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 size={32} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">No Preview Available</h3>
                <p className="text-sm text-black/50 mb-4">
                  Configure your report settings and click "Run Report" to generate a preview
                </p>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleRunReport}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="animate-spin mr-2" size={16} />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play size={16} className="mr-2" />
                      Run Report Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Report Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-black">{reportName}</h2>
                  <p className="text-sm text-black/50">
                    Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle size={12} className="mr-1" />
                    {previewData.length} rows
                  </Badge>
                </div>
              </div>

              {/* Chart Type Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {chartTypes.slice(0, 8).map((type) => {
                  const Icon = type.icon;
                  return (
                    <Button
                      key={type.id}
                      variant={visualizationType === type.id ? 'default' : 'outline'}
                      size="sm"
                      className={cn(
                        "gap-2",
                        visualizationType === type.id && "bg-red-600 hover:bg-red-700"
                      )}
                      onClick={() => setVisualizationType(type.id)}
                    >
                      <Icon size={14} />
                      {type.name}
                    </Button>
                  );
                })}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      More Charts
                      <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {chartTypes.slice(8).map((type) => {
                      const Icon = type.icon;
                      return (
                        <DropdownMenuItem key={type.id} onClick={() => setVisualizationType(type.id)}>
                          <Icon className="mr-2 h-4 w-4" />
                          {type.name}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Report Preview */}
              <Card className="border-[#F5EEE9]">
                <CardContent className="p-0">
                  {visualizationType === 'table' ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#F5EEE9] bg-[#F5EEE9]/30">
                            <th className="text-left p-3 text-xs font-medium text-black/50">ID</th>
                            <th className="text-left p-3 text-xs font-medium text-black/50">Product</th>
                            <th className="text-left p-3 text-xs font-medium text-black/50">Category</th>
                            <th className="text-right p-3 text-xs font-medium text-black/50">Quantity</th>
                            <th className="text-right p-3 text-xs font-medium text-black/50">Value</th>
                            <th className="text-left p-3 text-xs font-medium text-black/50">Location</th>
                            <th className="text-left p-3 text-xs font-medium text-black/50">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.map((row) => (
                            <tr key={row.id} className="border-b border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                              <td className="p-3 text-sm">{row.id}</td>
                              <td className="p-3 text-sm font-medium">{row.product}</td>
                              <td className="p-3 text-sm">{row.category}</td>
                              <td className="p-3 text-sm text-right">{row.quantity}</td>
                              <td className="p-3 text-sm text-right">${row.value.toLocaleString()}</td>
                              <td className="p-3 text-sm">{row.location}</td>
                              <td className="p-3 text-sm">
                                <Badge className={cn(
                                  "text-xs",
                                  row.status === 'In Stock' && "bg-green-50 text-green-700",
                                  row.status === 'Low Stock' && "bg-yellow-50 text-yellow-700",
                                  row.status === 'Critical' && "bg-red-50 text-red-700"
                                )}>
                                  {row.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="h-96 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 size={48} className="mx-auto text-black/30 mb-4" />
                        <p className="text-black/50">
                          {visualizationType.charAt(0).toUpperCase() + visualizationType.slice(1)} visualization preview
                        </p>
                        <p className="text-xs text-black/30 mt-2">(Sample data visualization)</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-[#F5EEE9] p-3 text-xs text-black/50">
                  <div className="flex items-center gap-4">
                    <span>Total: ${previewData.reduce((sum, row) => sum + row.value, 0).toLocaleString()}</span>
                    <span>Average: ${(previewData.reduce((sum, row) => sum + row.value, 0) / previewData.length).toFixed(0)}</span>
                  </div>
                </CardFooter>
              </Card>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-3">
                    <p className="text-xs text-black/50">Total Products</p>
                    <p className="text-lg font-bold text-black">{previewData.length}</p>
                  </CardContent>
                </Card>
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-3">
                    <p className="text-xs text-black/50">Total Quantity</p>
                    <p className="text-lg font-bold text-black">
                      {previewData.reduce((sum, row) => sum + row.quantity, 0).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-3">
                    <p className="text-xs text-black/50">Total Value</p>
                    <p className="text-lg font-bold text-black">
                      ${previewData.reduce((sum, row) => sum + row.value, 0).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-3">
                    <p className="text-xs text-black/50">Categories</p>
                    <p className="text-lg font-bold text-black">
                      {new Set(previewData.map(row => row.category)).size}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Report Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Save Report</DialogTitle>
            <DialogDescription>
              Save your report configuration for future use
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Report Name</Label>
              <Input 
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Enter report name"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Enter report description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inventory">Inventory Reports</SelectItem>
                  <SelectItem value="activities">Activities Reports</SelectItem>
                  <SelectItem value="financial">Financial Reports</SelectItem>
                  <SelectItem value="analytics">Analytics Reports</SelectItem>
                  <SelectItem value="custom">Custom Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Enter tags (comma separated)" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="saveAsTemplate" />
              <Label htmlFor="saveAsTemplate">Save as template for reuse</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="scheduleReport" />
              <Label htmlFor="scheduleReport">Schedule this report</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleSaveReport}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Report'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Field Selector Dialog */}
      <Dialog open={showFieldSelector} onOpenChange={setShowFieldSelector}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Select Fields</DialogTitle>
            <DialogDescription>
              Choose fields to include in your report
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
              <Input placeholder="Search fields..." className="pl-10" />
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="product">Product</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>

              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {availableFields[selectedDataSource]?.map((field) => (
                    <div
                      key={field.id}
                      className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg hover:bg-[#F5EEE9]/30 cursor-pointer"
                      onClick={() => {
                        handleAddField(field);
                        setShowFieldSelector(false);
                      }}
                    >
                      <div>
                        <p className="font-medium text-black">{field.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            {field.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            {field.category}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Plus size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFieldSelector(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Report Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Report</DialogTitle>
            <DialogDescription>
              Set up automated report generation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Frequency</Label>
              <RadioGroup defaultValue="daily" className="grid grid-cols-2 gap-4">
                {['Daily', 'Weekly', 'Monthly', 'Quarterly'].map((freq) => (
                  <div key={freq} className="flex items-center space-x-2">
                    <RadioGroupItem value={freq.toLowerCase()} id={freq} />
                    <Label htmlFor={freq}>{freq}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" defaultValue="09:00" />
            </div>

            <div className="space-y-2">
              <Label>Day of Week</Label>
              <Select defaultValue="monday">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Email Recipients</Label>
              <Input placeholder="Enter email addresses (comma separated)" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="includeAttachments" />
              <Label htmlFor="includeAttachments">Include report as attachment</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Save Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportBuilderPage;