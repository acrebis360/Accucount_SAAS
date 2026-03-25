// app/dashboard/stocktake-history/page.js
'use client';

import { useState } from 'react';
import { 
  Calendar,
  ClipboardList,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Printer,
  Mail,
  Share2,
  Grid,
  List,
  CheckCircle,
  AlertTriangle,
  Clock,
  XCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  FileText,
  User,
  MapPin,
  Package,
  AlertCircle,
  Settings,
  FileSpreadsheet,
  FileJson,
  File,
  Camera,
  QrCode,
  Scan,
  Radio,
  Boxes,
  Truck,
  Database,
  Cloud,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  PlusCircle,
  MinusCircle,
  Info,
  Flag,
  Users,
  Building2,
  Layers,
  Activity,
  CalendarDays,
  Timer,
  Target,
  Percent,
  BarChart,
  PieChart,
  LineChart,
  Filter as FilterIcon,
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
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const StocktakeHistoryPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStocktake, setSelectedStocktake] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [showAdjustmentsDialog, setShowAdjustmentsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedItems, setSelectedItems] = useState([]);

  const itemsPerPage = 6;

  // Sample stocktake history data
  const stocktakeHistory = [
    {
      id: 'ST-2024-001',
      name: 'Year-End Physical Count',
      description: 'Annual full warehouse inventory count',
      date: '2024-12-15',
      time: '09:00 AM',
      status: 'completed',
      type: 'full',
      location: 'Main Warehouse',
      zone: 'All Zones',
      initiatedBy: 'John Anderson',
      initiatedById: 'user-001',
      team: ['John Anderson', 'Sarah Chen', 'Mike Roberts', 'Emily Watson'],
      totalItems: 12450,
      countedItems: 12450,
      expectedQuantity: 12450,
      actualQuantity: 12363,
      varianceCount: 87,
      varianceValue: 12450.50,
      variancePercentage: 0.7,
      accuracy: 99.3,
      duration: '4h 32m',
      startTime: '09:00 AM',
      endTime: '01:32 PM',
      discrepancies: [
        { sku: 'PROD-1001', name: 'Product A', expected: 250, actual: 245, variance: -5, value: 62.50 },
        { sku: 'PROD-1002', name: 'Product B', expected: 100, actual: 108, variance: +8, value: 1200.00 },
        { sku: 'PROD-1003', name: 'Product C', expected: 500, actual: 498, variance: -2, value: 17.00 },
      ],
      adjustments: [
        { id: 'ADJ-001', date: '2024-12-16', type: 'write_off', quantity: 5, reason: 'Damaged', approvedBy: 'Manager' },
        { id: 'ADJ-002', date: '2024-12-16', type: 'write_in', quantity: 8, reason: 'Found in receiving', approvedBy: 'Manager' },
      ],
      notes: 'All items counted successfully. Minor discrepancies resolved with adjustments.',
      attachments: ['report.pdf', 'count_sheets.xlsx'],
      createdBy: 'System',
      createdAt: '2024-12-01',
    },
    {
      id: 'ST-2024-002',
      name: 'Zone A - Electronics',
      description: 'Cycle count for electronics section',
      date: '2024-12-10',
      time: '10:30 AM',
      status: 'completed',
      type: 'zone',
      location: 'Main Warehouse',
      zone: 'Zone A',
      initiatedBy: 'Sarah Chen',
      initiatedById: 'user-002',
      team: ['Sarah Chen', 'David Kim'],
      totalItems: 3450,
      countedItems: 3450,
      expectedQuantity: 3450,
      actualQuantity: 3427,
      varianceCount: 23,
      varianceValue: 4320.75,
      variancePercentage: 0.67,
      accuracy: 99.33,
      duration: '1h 45m',
      startTime: '10:30 AM',
      endTime: '12:15 PM',
      discrepancies: [
        { sku: 'ELEC-500', name: 'Wireless Headphones', expected: 500, actual: 495, variance: -5, value: 225.00 },
        { sku: 'ELEC-501', name: 'Smart Watch', expected: 150, actual: 152, variance: +2, value: 500.00 },
      ],
      adjustments: [
        { id: 'ADJ-003', date: '2024-12-11', type: 'write_off', quantity: 5, reason: 'Missing', approvedBy: 'Supervisor' },
      ],
      notes: 'Electronics section count completed. Found 5 missing headphones.',
      attachments: ['zone_a_report.pdf'],
      createdBy: 'Sarah Chen',
      createdAt: '2024-12-05',
    },
    {
      id: 'ST-2024-003',
      name: 'Cycle Count - High Value',
      description: 'Monthly cycle count for high-value items',
      date: '2024-12-05',
      time: '08:00 AM',
      status: 'completed',
      type: 'cycle',
      location: 'Vault Section',
      zone: 'Secure Area',
      initiatedBy: 'Michael Roberts',
      initiatedById: 'user-003',
      team: ['Michael Roberts', 'Lisa Wong'],
      totalItems: 520,
      countedItems: 520,
      expectedQuantity: 520,
      actualQuantity: 518,
      varianceCount: 2,
      varianceValue: 12500.00,
      variancePercentage: 0.38,
      accuracy: 99.62,
      duration: '45m',
      startTime: '08:00 AM',
      endTime: '08:45 AM',
      discrepancies: [],
      adjustments: [],
      notes: 'All high-value items accounted for. No discrepancies found.',
      attachments: ['high_value_report.pdf'],
      createdBy: 'Michael Roberts',
      createdAt: '2024-12-01',
    },
    {
      id: 'ST-2024-004',
      name: 'Quarterly Stock Adjustment',
      description: 'Quarterly full inventory reconciliation',
      date: '2024-11-28',
      time: '07:00 AM',
      status: 'completed',
      type: 'full',
      location: 'All Warehouses',
      zone: 'All Zones',
      initiatedBy: 'Emily Watson',
      initiatedById: 'user-004',
      team: ['Emily Watson', 'John Anderson', 'Sarah Chen', 'Tom Brown', 'Lisa Chen'],
      totalItems: 18750,
      countedItems: 18750,
      expectedQuantity: 18750,
      actualQuantity: 18594,
      varianceCount: 156,
      varianceValue: 28450.25,
      variancePercentage: 0.83,
      accuracy: 99.17,
      duration: '6h 15m',
      startTime: '07:00 AM',
      endTime: '01:15 PM',
      discrepancies: [
        { sku: 'RAW-789', name: 'Raw Materials', expected: 1000, actual: 980, variance: -20, value: 5000.00 },
        { sku: 'FIN-456', name: 'Finished Goods', expected: 350, actual: 365, variance: +15, value: 2250.00 },
        { sku: 'PKG-123', name: 'Packaging', expected: 2000, actual: 1995, variance: -5, value: 125.00 },
      ],
      adjustments: [
        { id: 'ADJ-004', date: '2024-11-29', type: 'write_off', quantity: 20, reason: 'Damaged in storage', approvedBy: 'Manager' },
        { id: 'ADJ-005', date: '2024-11-29', type: 'write_in', quantity: 15, reason: 'Unrecorded returns', approvedBy: 'Manager' },
      ],
      notes: 'Quarterly count completed. Several discrepancies found and adjusted.',
      attachments: ['quarterly_report.pdf', 'adjustments.xlsx'],
      createdBy: 'System',
      createdAt: '2024-11-15',
    },
    {
      id: 'ST-2024-005',
      name: 'Perishables Audit',
      description: 'Audit of perishable goods with expiry tracking',
      date: '2024-11-20',
      time: '06:30 AM',
      status: 'completed',
      type: 'category',
      location: 'Cold Storage',
      zone: 'Temperature Controlled',
      initiatedBy: 'David Kim',
      initiatedById: 'user-005',
      team: ['David Kim', 'Anna Taylor'],
      totalItems: 890,
      countedItems: 890,
      expectedQuantity: 890,
      actualQuantity: 878,
      varianceCount: 12,
      varianceValue: 850.30,
      variancePercentage: 1.35,
      accuracy: 98.65,
      duration: '2h 10m',
      startTime: '06:30 AM',
      endTime: '08:40 AM',
      discrepancies: [
        { sku: 'FOOD-001', name: 'Dairy Products', expected: 300, actual: 295, variance: -5, value: 125.00 },
        { sku: 'FOOD-002', name: 'Fresh Produce', expected: 200, actual: 193, variance: -7, value: 350.00 },
      ],
      adjustments: [
        { id: 'ADJ-006', date: '2024-11-21', type: 'write_off', quantity: 12, reason: 'Expired', approvedBy: 'Quality Manager' },
      ],
      notes: 'Perishable audit completed. Found 12 items past expiry date.',
      attachments: ['perishable_audit.pdf', 'expiry_report.xlsx'],
      createdBy: 'David Kim',
      createdAt: '2024-11-15',
    },
    {
      id: 'ST-2024-006',
      name: 'Rapid Cycle - Fast Movers',
      description: 'Weekly cycle count for fast-moving items',
      date: '2024-12-18',
      time: '01:00 PM',
      status: 'in_progress',
      type: 'cycle',
      location: 'Picking Zone',
      zone: 'Fast Movers Area',
      initiatedBy: 'System Scheduler',
      initiatedById: 'system',
      team: ['Team A', 'Team B'],
      totalItems: 2500,
      countedItems: 1450,
      expectedQuantity: 2500,
      actualQuantity: 1442,
      varianceCount: 8,
      varianceValue: 1250.00,
      variancePercentage: 0.55,
      accuracy: 99.45,
      duration: 'In Progress',
      startTime: '01:00 PM',
      endTime: null,
      discrepancies: [],
      adjustments: [],
      notes: 'Count in progress. Currently at 58% completion.',
      attachments: [],
      createdBy: 'System Scheduler',
      createdAt: '2024-12-17',
    },
    {
      id: 'ST-2024-007',
      name: 'December Cycle Count',
      description: 'Scheduled monthly cycle count',
      date: '2024-12-20',
      time: '09:00 AM',
      status: 'scheduled',
      type: 'cycle',
      location: 'Zone B & C',
      zone: 'Zones B and C',
      initiatedBy: 'Auto Schedule',
      initiatedById: 'system',
      team: ['To be assigned'],
      totalItems: 4200,
      countedItems: 0,
      expectedQuantity: 4200,
      actualQuantity: 0,
      varianceCount: 0,
      varianceValue: 0,
      variancePercentage: 0,
      accuracy: 0,
      duration: 'Pending',
      startTime: '09:00 AM',
      endTime: null,
      discrepancies: [],
      adjustments: [],
      notes: 'Scheduled for December 20th. Team assignment pending.',
      attachments: [],
      createdBy: 'System',
      createdAt: '2024-12-01',
    },
    {
      id: 'ST-2024-008',
      name: 'Holiday Season Prep Count',
      description: 'Pre-holiday inventory verification',
      date: '2024-12-22',
      time: '08:00 AM',
      status: 'scheduled',
      type: 'full',
      location: 'All Locations',
      zone: 'All Zones',
      initiatedBy: 'Operations Manager',
      initiatedById: 'user-006',
      team: ['Full team'],
      totalItems: 25000,
      countedItems: 0,
      expectedQuantity: 25000,
      actualQuantity: 0,
      varianceCount: 0,
      varianceValue: 0,
      variancePercentage: 0,
      accuracy: 0,
      duration: 'Scheduled',
      startTime: '08:00 AM',
      endTime: null,
      discrepancies: [],
      adjustments: [],
      notes: 'Pre-holiday count to ensure accurate stock levels for peak season.',
      attachments: [],
      createdBy: 'Operations Manager',
      createdAt: '2024-12-10',
    },
  ];

  // Status configuration
  const statusConfig = {
    completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    in_progress: { label: 'In Progress', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: RefreshCw },
    scheduled: { label: 'Scheduled', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
  };

  // Type configuration
  const typeConfig = {
    full: { label: 'Full Count', color: 'bg-red-100 text-red-700', icon: Layers },
    zone: { label: 'Zone Count', color: 'bg-blue-100 text-blue-700', icon: MapPin },
    cycle: { label: 'Cycle Count', color: 'bg-green-100 text-green-700', icon: RefreshCw },
    category: { label: 'Category Count', color: 'bg-purple-100 text-purple-700', icon: Package },
  };

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'main-warehouse', name: 'Main Warehouse' },
    { id: 'vault', name: 'Vault Section' },
    { id: 'cold-storage', name: 'Cold Storage' },
    { id: 'picking-zone', name: 'Picking Zone' },
  ];

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.completed;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={12} />
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    const config = typeConfig[type] || typeConfig.full;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={12} />
        {config.label}
      </Badge>
    );
  };

  // Filter logic
  const filteredStocktakes = stocktakeHistory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
    return matchesSearch && matchesStatus && matchesType && matchesLocation;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStocktakes.length / itemsPerPage);
  const paginatedData = filteredStocktakes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = {
    totalStocktakes: stocktakeHistory.length,
    completed: stocktakeHistory.filter(s => s.status === 'completed').length,
    inProgress: stocktakeHistory.filter(s => s.status === 'in_progress').length,
    scheduled: stocktakeHistory.filter(s => s.status === 'scheduled').length,
    totalItemsCounted: stocktakeHistory.reduce((sum, s) => sum + s.countedItems, 0),
    totalDiscrepancies: stocktakeHistory.reduce((sum, s) => sum + s.varianceCount, 0),
    totalVarianceValue: stocktakeHistory.reduce((sum, s) => sum + s.varianceValue, 0),
    avgAccuracy: stocktakeHistory
      .filter(s => s.status === 'completed')
      .reduce((acc, s, _, arr) => acc + s.accuracy / arr.length, 0)
      .toFixed(1),
    totalDuration: '14h 27m',
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Stocktake History</h1>
            <p className="text-black/50 mt-1">Track and analyze all physical inventory counts across your organization</p>
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
                  Print Summary
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              New Stocktake
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Stocktakes</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalStocktakes}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <ClipboardList size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Completed</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.completed}</p>
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
                  <p className="text-xs text-black/50">Scheduled</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.scheduled}</p>
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
                  <p className="text-xs text-black/50">Avg. Accuracy</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.avgAccuracy}%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Target size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Discrepancies</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.totalDiscrepancies}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <AlertTriangle size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Variance Value</p>
                  <p className="text-xl font-bold text-red-600 mt-1">${stats.totalVarianceValue.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <DollarSign size={18} className="text-red-600" />
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
              placeholder="Search by name, ID, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[160px] border-[#F5EEE9]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(loc => (
                <SelectItem key={loc.id} value={loc.id === 'all' ? 'all' : loc.name}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[140px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[140px] border-[#F5EEE9]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full">Full Count</SelectItem>
              <SelectItem value="zone">Zone Count</SelectItem>
              <SelectItem value="cycle">Cycle Count</SelectItem>
              <SelectItem value="category">Category Count</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px] border-[#F5EEE9]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="border-[#F5EEE9]">
            <FilterIcon size={16} />
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

      {/* Stocktake Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {paginatedData.map((stocktake) => {
            const StatusIcon = statusConfig[stocktake.status]?.icon || CheckCircle;
            const TypeIcon = typeConfig[stocktake.type]?.icon || Package;
            
            return (
              <Card key={stocktake.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(stocktake.status)}
                          {getTypeBadge(stocktake.type)}
                        </div>
                        <h3 className="font-semibold text-black">{stocktake.name}</h3>
                        <p className="text-xs text-black/50 mt-1">{stocktake.id}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedStocktake(stocktake);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Generate Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            Print Summary
                          </DropdownMenuItem>
                          {stocktake.status === 'scheduled' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Cancel
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="space-y-3">
                      {/* Date and Location */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-black/50">
                          <Calendar size={14} />
                          <span>{new Date(stocktake.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-black/50">
                          <MapPin size={14} />
                          <span>{stocktake.location}</span>
                        </div>
                      </div>

                      {/* Progress for in-progress */}
                      {stocktake.status === 'in_progress' && (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-black/50">Progress</span>
                            <span className="font-medium">
                              {Math.round((stocktake.countedItems / stocktake.totalItems) * 100)}%
                            </span>
                          </div>
                          <Progress 
                            value={(stocktake.countedItems / stocktake.totalItems) * 100} 
                            className="h-2 bg-[#F5EEE9]"
                          />
                          <p className="text-xs text-black/50 mt-1">
                            {stocktake.countedItems.toLocaleString()} / {stocktake.totalItems.toLocaleString()} items
                          </p>
                        </div>
                      )}

                      {/* Stats for completed */}
                      {stocktake.status === 'completed' && (
                        <>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-2 bg-[#F5EEE9] rounded-lg">
                              <p className="text-xs text-black/50">Items Counted</p>
                              <p className="text-sm font-bold text-black">{stocktake.countedItems.toLocaleString()}</p>
                            </div>
                            <div className="text-center p-2 bg-[#F5EEE9] rounded-lg">
                              <p className="text-xs text-black/50">Duration</p>
                              <p className="text-sm font-bold text-black">{stocktake.duration}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Target size={14} className="text-black/40" />
                              <span className="text-sm text-black/50">Accuracy:</span>
                              <span className={stocktake.accuracy >= 99 ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                                {stocktake.accuracy}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <AlertTriangle size={14} className="text-black/40" />
                              <span className="text-sm text-black/50">Variance:</span>
                              <span className={stocktake.varianceCount > 0 ? 'text-orange-600 font-medium' : 'text-green-600 font-medium'}>
                                {stocktake.varianceCount}
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Scheduled info */}
                      {stocktake.status === 'scheduled' && (
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-yellow-600" />
                            <span className="text-sm text-yellow-700">Scheduled for {new Date(stocktake.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-yellow-600/70 mt-1">{stocktake.totalItems.toLocaleString()} items to count</p>
                        </div>
                      )}
                    </div>

                    {/* Team */}
                    <div className="mt-4 pt-3 border-t border-[#F5EEE9]">
                      <div className="flex items-center gap-2">
                        <Users size={12} className="text-black/40" />
                        <span className="text-xs text-black/50">Team:</span>
                        <div className="flex items-center gap-1">
                          {stocktake.team.slice(0, 3).map((member, idx) => (
                            <TooltipProvider key={idx}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs bg-[#F5EEE9] text-black">
                                      {member.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>{member}</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                          {stocktake.team.length > 3 && (
                            <span className="text-xs text-black/50">+{stocktake.team.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F5EEE9]">
                      <div className="flex items-center gap-1 text-xs text-black/50">
                        <User size={12} />
                        {stocktake.initiatedBy}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          setSelectedStocktake(stocktake);
                          setShowDetailsDialog(true);
                        }}
                      >
                        View Details
                        <Eye size={12} className="ml-1" />
                      </Button>
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
                  <TableHead className="text-black/50">ID / Name</TableHead>
                  <TableHead className="text-black/50">Date</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50 text-right">Items Counted</TableHead>
                  <TableHead className="text-black/50 text-right">Accuracy</TableHead>
                  <TableHead className="text-black/50 text-right">Variance</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Initiated By</TableHead>
                  <TableHead className="text-black/50">Duration</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((stocktake) => (
                  <TableRow key={stocktake.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-black">{stocktake.id}</div>
                        <div className="text-xs text-black/50">{stocktake.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(stocktake.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getTypeBadge(stocktake.type)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-black/40" />
                        <span className="text-sm">{stocktake.location}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {stocktake.countedItems.toLocaleString()} / {stocktake.totalItems.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {stocktake.accuracy >= 99 ? (
                          <TrendingUp size={12} className="text-green-600" />
                        ) : (
                          <TrendingDown size={12} className="text-red-600" />
                        )}
                        <span className={stocktake.accuracy >= 99 ? 'text-green-600' : 'text-orange-600'}>
                          {stocktake.accuracy}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={stocktake.varianceCount > 0 ? 'text-orange-600' : 'text-green-600'}>
                        {stocktake.varianceCount}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(stocktake.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User size={12} className="text-black/40" />
                        <span className="text-sm">{stocktake.initiatedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Timer size={12} className="text-black/40" />
                        <span className="text-sm">{stocktake.duration}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedStocktake(stocktake);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Generate Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Data
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-[#F5EEE9] p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-black/50">
                Showing {paginatedData.length} of {filteredStocktakes.length} stocktakes
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={14} />
                  Previous
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? 'bg-red-600 text-white' : ''}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && <span className="text-black/50">...</span>}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* New Stocktake Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Stocktake</DialogTitle>
            <DialogDescription>
              Create a new physical inventory count
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Stocktake Name</Label>
              <Input placeholder="e.g., Year-End Physical Count" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Count</SelectItem>
                    <SelectItem value="zone">Zone Count</SelectItem>
                    <SelectItem value="cycle">Cycle Count</SelectItem>
                    <SelectItem value="category">Category Count</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Warehouse</SelectItem>
                    <SelectItem value="vault">Vault Section</SelectItem>
                    <SelectItem value="cold">Cold Storage</SelectItem>
                    <SelectItem value="picking">Picking Zone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Schedule Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input type="time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Team Members</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team1">John Anderson, Sarah Chen</SelectItem>
                  <SelectItem value="team2">Mike Roberts, Emily Watson</SelectItem>
                  <SelectItem value="team3">David Kim, Lisa Wong</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Enter description for this stocktake" rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Items to Count</Label>
              <div className="border border-[#F5EEE9] rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black/50">Total Items</span>
                  <span className="font-medium">12,450</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-black/50">Estimated Duration</span>
                  <span className="font-medium">~4-5 hours</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Schedule Stocktake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stocktake Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedStocktake && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedStocktake.name}</span>
                  {getStatusBadge(selectedStocktake.status)}
                </DialogTitle>
                <DialogDescription>
                  Stocktake ID: {selectedStocktake.id} | Initiated by: {selectedStocktake.initiatedBy}
                </DialogDescription>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="discrepancies">Discrepancies</TabsTrigger>
                  <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
                  <TabsTrigger value="notes">Notes & Activity</TabsTrigger>
                </TabsList>

                <div className="mt-4">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-[#F5EEE9] p-3">
                          <Label className="text-xs text-black/50">Date & Time</Label>
                          <p className="font-medium">
                            {new Date(selectedStocktake.date).toLocaleDateString()} at {selectedStocktake.startTime}
                          </p>
                        </div>
                        <div className="rounded-lg bg-[#F5EEE9] p-3">
                          <Label className="text-xs text-black/50">Location / Zone</Label>
                          <p className="font-medium">{selectedStocktake.location} - {selectedStocktake.zone}</p>
                        </div>
                        <div className="rounded-lg bg-[#F5EEE9] p-3">
                          <Label className="text-xs text-black/50">Duration</Label>
                          <p className="font-medium">{selectedStocktake.duration}</p>
                        </div>
                        <div className="rounded-lg bg-[#F5EEE9] p-3">
                          <Label className="text-xs text-black/50">Team Size</Label>
                          <p className="font-medium">{selectedStocktake.team.length} members</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <Label className="text-sm text-black/50">Total Items</Label>
                          <p className="text-2xl font-bold text-black">{selectedStocktake.totalItems.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <Label className="text-sm text-black/50">Counted Items</Label>
                          <p className="text-2xl font-bold text-black">{selectedStocktake.countedItems.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <Label className="text-sm text-black/50">Accuracy</Label>
                          <p className={cn("text-2xl font-bold", selectedStocktake.accuracy >= 99 ? 'text-green-600' : 'text-orange-600')}>
                            {selectedStocktake.accuracy}%
                          </p>
                        </div>
                      </div>

                      <Progress 
                        value={selectedStocktake.accuracy} 
                        className="h-2 bg-[#F5EEE9]"
                        style={{ '--progress-background': selectedStocktake.accuracy >= 99 ? '#22c55e' : '#eab308' }}
                      />

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-black/50">Variance Count</span>
                            <span className={selectedStocktake.varianceCount > 0 ? 'text-orange-600 font-bold' : 'text-green-600 font-bold'}>
                              {selectedStocktake.varianceCount}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-black/50">Variance Value</span>
                            <span className={selectedStocktake.varianceValue > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                              ${selectedStocktake.varianceValue.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-[#F5EEE9] rounded-lg">
                        <Label className="text-xs text-black/50">Team Members</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedStocktake.team.map((member, idx) => (
                            <Badge key={idx} variant="outline" className="bg-white">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Discrepancies Tab */}
                  {activeTab === 'discrepancies' && (
                    <div>
                      {selectedStocktake.discrepancies.length === 0 ? (
                        <div className="flex h-48 flex-col items-center justify-center text-center">
                          <CheckCircle size={48} className="text-green-500 mb-3" />
                          <p className="text-black/50">No discrepancies found in this stocktake</p>
                          <p className="text-xs text-black/40 mt-1">All items matched expected quantities</p>
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>SKU</TableHead>
                              <TableHead>Product Name</TableHead>
                              <TableHead className="text-right">Expected</TableHead>
                              <TableHead className="text-right">Actual</TableHead>
                              <TableHead className="text-right">Variance</TableHead>
                              <TableHead className="text-right">Value Impact</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedStocktake.discrepancies.map((disc, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-mono text-xs">{disc.sku}</TableCell>
                                <TableCell>{disc.name}</TableCell>
                                <TableCell className="text-right">{disc.expected.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{disc.actual.toLocaleString()}</TableCell>
                                <TableCell className={cn("text-right font-medium", disc.variance > 0 ? 'text-green-600' : 'text-red-600')}>
                                  {disc.variance > 0 ? `+${disc.variance}` : disc.variance}
                                </TableCell>
                                <TableCell className={cn("text-right", disc.value > 0 ? 'text-green-600' : 'text-red-600')}>
                                  ${Math.abs(disc.value).toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  )}

                  {/* Adjustments Tab */}
                  {activeTab === 'adjustments' && (
                    <div>
                      {selectedStocktake.adjustments.length === 0 ? (
                        <div className="flex h-48 flex-col items-center justify-center text-center">
                          <Settings size={48} className="text-black/30 mb-3" />
                          <p className="text-black/50">No adjustments were made</p>
                          <p className="text-xs text-black/40 mt-1">All discrepancies resolved without adjustments</p>
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Adjustment ID</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead className="text-right">Quantity</TableHead>
                              <TableHead>Reason</TableHead>
                              <TableHead>Approved By</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedStocktake.adjustments.map((adj, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-mono text-xs">{adj.id}</TableCell>
                                <TableCell>{adj.date}</TableCell>
                                <TableCell>
                                  <Badge className={adj.type === 'write_off' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}>
                                    {adj.type === 'write_off' ? 'Write Off' : 'Write In'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">{adj.quantity}</TableCell>
                                <TableCell>{adj.reason}</TableCell>
                                <TableCell>{adj.approvedBy}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  )}

                  {/* Notes Tab */}
                  {activeTab === 'notes' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#F5EEE9] rounded-lg">
                        <Label className="text-sm font-medium">Notes</Label>
                        <p className="mt-2 text-black/70">{selectedStocktake.notes}</p>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-sm font-medium mb-2 block">Activity Log</Label>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 rounded-full">
                              <CheckCircle size={14} className="text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm">
                                <span className="font-medium">{selectedStocktake.initiatedBy}</span> initiated stocktake
                              </p>
                              <p className="text-xs text-black/40">{selectedStocktake.createdAt}</p>
                            </div>
                          </div>
                          {selectedStocktake.status === 'completed' && (
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-blue-50 rounded-full">
                                <CheckCircle size={14} className="text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm">
                                  Stocktake completed with <span className="font-medium">{selectedStocktake.varianceCount}</span> discrepancies
                                </p>
                                <p className="text-xs text-black/40">{selectedStocktake.date}</p>
                              </div>
                            </div>
                          )}
                          {selectedStocktake.adjustments.length > 0 && (
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-orange-50 rounded-full">
                                <Settings size={14} className="text-orange-600" />
                              </div>
                              <div>
                                <p className="text-sm">
                                  {selectedStocktake.adjustments.length} adjustment(s) applied
                                </p>
                                <p className="text-xs text-black/40">Post-stocktake reconciliation</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedStocktake.attachments.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Attachments</Label>
                            <div className="flex flex-wrap gap-2">
                              {selectedStocktake.attachments.map((file, idx) => (
                                <Button key={idx} variant="outline" size="sm" className="gap-2">
                                  <FileText size={14} />
                                  {file}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </Tabs>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Download size={16} className="mr-2" />
                  Export Report
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Actions FAB */}
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
            <TooltipContent side="left">New Stocktake</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowReportDialog(true)}
              >
                <BarChart3 size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Generate Report</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowScheduleDialog(true)}
              >
                <Calendar size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Schedule Stocktake</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default StocktakeHistoryPage;