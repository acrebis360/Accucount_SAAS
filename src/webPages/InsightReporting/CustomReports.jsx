// app/dashboard/custom-reports/page.js
'use client';

import { useState, useMemo } from 'react';
import {
  FileText,
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
  Copy,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ClipboardList,
  MapPin,
  DollarSign,
  Settings,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  PlusCircle,
  MinusCircle,
  DragHandle,
  LayoutTemplate,
  FolderOpen,
  Star,
  StarOff,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Filter as FilterIcon,
  Layers,
  Grid,
  List,
  Maximize2,
  Minimize2,
  DownloadCloud,
  Send,
  Bookmark,
  BookmarkCheck,
  History,
  RefreshCcw,
  EyeOff,
  Eye as EyeIcon,
  Play,
  Pause,
  Settings as SettingsIcon,
  Table as TableIcon,
  ChartNoAxesCombined,
  BarChart,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ScatterChart,
  AreaChart,
  Gauge,
  Activity,
  Zap,
  Shield,
  Award,
  Target,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Radar,
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const CustomReportsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [activeTab, setActiveTab] = useState('builder');
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportType, setReportType] = useState('standard');
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedVisualization, setSelectedVisualization] = useState('table');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState('weekly');
  const [scheduleDay, setScheduleDay] = useState('monday');
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [recipients, setRecipients] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');

  // Mock reports data
  const reports = [
    {
      id: 'RPT-001',
      name: 'Stocktake Accuracy Summary',
      description: 'Monthly overview of stocktake accuracy across all locations',
      category: 'accuracy',
      type: 'standard',
      status: 'active',
      createdAt: '2024-12-01',
      lastRun: '2024-12-20',
      schedule: 'Weekly on Mondays',
      recipients: ['admin@accucount.com', 'manager@warehouse.com'],
      format: 'pdf',
      metrics: ['accuracy', 'completed_count', 'discrepancies'],
      dimensions: ['location', 'month'],
      visualization: 'line',
      tags: ['accuracy', 'monthly', 'summary'],
      runs: 24,
      favorites: 12,
    },
    {
      id: 'RPT-002',
      name: 'Inventory Valuation Report',
      description: 'Detailed inventory valuation by category and location',
      category: 'valuation',
      type: 'standard',
      status: 'active',
      createdAt: '2024-11-15',
      lastRun: '2024-12-19',
      schedule: 'Monthly on 1st',
      recipients: ['finance@accucount.com'],
      format: 'excel',
      metrics: ['total_value', 'quantity', 'avg_cost'],
      dimensions: ['category', 'location'],
      visualization: 'bar',
      tags: ['valuation', 'financial', 'inventory'],
      runs: 18,
      favorites: 8,
    },
    {
      id: 'RPT-003',
      name: 'Discrepancy Analysis',
      description: 'Analysis of stocktake discrepancies by type and location',
      category: 'discrepancy',
      type: 'standard',
      status: 'active',
      createdAt: '2024-11-20',
      lastRun: '2024-12-18',
      schedule: 'Daily',
      recipients: ['ops@accucount.com'],
      format: 'pdf',
      metrics: ['discrepancy_count', 'discrepancy_value', 'resolution_rate'],
      dimensions: ['location', 'category', 'type'],
      visualization: 'bar',
      tags: ['discrepancy', 'analysis', 'daily'],
      runs: 32,
      favorites: 15,
    },
    {
      id: 'RPT-004',
      name: 'Team Productivity Report',
      description: 'Performance metrics by team and individual',
      category: 'productivity',
      type: 'custom',
      status: 'active',
      createdAt: '2024-12-05',
      lastRun: '2024-12-20',
      schedule: 'Weekly on Fridays',
      recipients: ['hr@accucount.com', 'managers@accucount.com'],
      format: 'excel',
      metrics: ['items_counted', 'time_spent', 'accuracy', 'efficiency'],
      dimensions: ['team', 'user', 'date'],
      visualization: 'table',
      tags: ['productivity', 'team', 'performance'],
      runs: 16,
      favorites: 22,
    },
    {
      id: 'RPT-005',
      name: 'Expiry Tracking Report',
      description: 'Items approaching expiry date with alerts',
      category: 'expiry',
      type: 'standard',
      status: 'active',
      createdAt: '2024-12-10',
      lastRun: '2024-12-20',
      schedule: 'Daily',
      recipients: ['quality@accucount.com'],
      format: 'pdf',
      metrics: ['expiring_items', 'batch_number', 'expiry_date'],
      dimensions: ['category', 'location', 'batch'],
      visualization: 'table',
      tags: ['expiry', 'alerts', 'quality'],
      runs: 28,
      favorites: 18,
    },
    {
      id: 'RPT-006',
      name: 'Location Performance Dashboard',
      description: 'Comprehensive location-wise performance metrics',
      category: 'performance',
      type: 'custom',
      status: 'draft',
      createdAt: '2024-12-15',
      lastRun: null,
      schedule: null,
      recipients: [],
      format: 'pdf',
      metrics: ['accuracy', 'efficiency', 'items_counted', 'time_taken'],
      dimensions: ['location', 'zone'],
      visualization: 'dashboard',
      tags: ['performance', 'location', 'dashboard'],
      runs: 0,
      favorites: 5,
    },
    {
      id: 'RPT-007',
      name: 'Trend Analysis - Quarterly',
      description: 'Quarterly trend analysis of inventory metrics',
      category: 'trend',
      type: 'standard',
      status: 'archived',
      createdAt: '2024-09-01',
      lastRun: '2024-11-30',
      schedule: null,
      recipients: [],
      format: 'pdf',
      metrics: ['trend', 'growth', 'forecast'],
      dimensions: ['quarter', 'category'],
      visualization: 'line',
      tags: ['trend', 'quarterly', 'analysis'],
      runs: 12,
      favorites: 7,
    },
    {
      id: 'RPT-008',
      name: 'Cost Analysis Report',
      description: 'Inventory cost analysis by SKU and location',
      category: 'cost',
      type: 'custom',
      status: 'active',
      createdAt: '2024-12-08',
      lastRun: '2024-12-19',
      schedule: 'Monthly',
      recipients: ['finance@accucount.com', 'procurement@accucount.com'],
      format: 'excel',
      metrics: ['total_cost', 'avg_cost', 'variance'],
      dimensions: ['sku', 'location', 'category'],
      visualization: 'bar',
      tags: ['cost', 'financial', 'analysis'],
      runs: 14,
      favorites: 11,
    },
  ];

  // Available metrics for report builder
  const availableMetrics = [
    { id: 'total_items', name: 'Total Items', category: 'inventory', type: 'number' },
    { id: 'total_value', name: 'Total Value', category: 'inventory', type: 'currency' },
    { id: 'accuracy', name: 'Accuracy %', category: 'quality', type: 'percentage' },
    { id: 'discrepancy_count', name: 'Discrepancy Count', category: 'quality', type: 'number' },
    { id: 'discrepancy_value', name: 'Discrepancy Value', category: 'quality', type: 'currency' },
    { id: 'completed_stocktakes', name: 'Completed Stocktakes', category: 'activity', type: 'number' },
    { id: 'items_counted', name: 'Items Counted', category: 'activity', type: 'number' },
    { id: 'avg_time', name: 'Average Time', category: 'efficiency', type: 'duration' },
    { id: 'efficiency', name: 'Efficiency %', category: 'efficiency', type: 'percentage' },
    { id: 'team_productivity', name: 'Team Productivity', category: 'people', type: 'number' },
    { id: 'expiring_items', name: 'Expiring Items', category: 'quality', type: 'number' },
    { id: 'low_stock_items', name: 'Low Stock Items', category: 'inventory', type: 'number' },
  ];

  // Available dimensions for grouping
  const availableDimensions = [
    { id: 'location', name: 'Location', type: 'categorical' },
    { id: 'zone', name: 'Zone', type: 'categorical' },
    { id: 'category', name: 'Category', type: 'categorical' },
    { id: 'date', name: 'Date', type: 'temporal' },
    { id: 'month', name: 'Month', type: 'temporal' },
    { id: 'quarter', name: 'Quarter', type: 'temporal' },
    { id: 'year', name: 'Year', type: 'temporal' },
    { id: 'team', name: 'Team', type: 'categorical' },
    { id: 'user', name: 'User', type: 'categorical' },
    { id: 'status', name: 'Status', type: 'categorical' },
    { id: 'batch', name: 'Batch Number', type: 'categorical' },
    { id: 'sku', name: 'SKU', type: 'categorical' },
  ];

  // Category configuration
  const categoryConfig = {
    accuracy: { label: 'Accuracy Reports', color: 'bg-green-100 text-green-700', icon: Target },
    valuation: { label: 'Valuation Reports', color: 'bg-blue-100 text-blue-700', icon: DollarSign },
    discrepancy: { label: 'Discrepancy Reports', color: 'bg-orange-100 text-orange-700', icon: AlertTriangle },
    productivity: { label: 'Productivity Reports', color: 'bg-purple-100 text-purple-700', icon: Users },
    expiry: { label: 'Expiry Reports', color: 'bg-yellow-100 text-yellow-700', icon: Calendar },
    performance: { label: 'Performance Reports', color: 'bg-indigo-100 text-indigo-700', icon: Activity },
    trend: { label: 'Trend Analysis', color: 'bg-cyan-100 text-cyan-700', icon: TrendingUp },
    cost: { label: 'Cost Analysis', color: 'bg-pink-100 text-pink-700', icon: BarChart3 },
  };

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700', icon: FileText },
    archived: { label: 'Archived', color: 'bg-red-100 text-red-700', icon: ArchiveIcon },
  };

  const visualizationConfig = {
    table: { label: 'Table', icon: TableIcon, description: 'Tabular data view' },
    bar: { label: 'Bar Chart', icon: BarChart, description: 'Compare categories' },
    line: { label: 'Line Chart', icon: LineChartIcon, description: 'Show trends over time' },
    pie: { label: 'Pie Chart', icon: PieChartIcon, description: 'Show proportions' },
    area: { label: 'Area Chart', icon: AreaChart, description: 'Show cumulative trends' },
    radar: { label: 'Radar Chart', icon: Radar, description: 'Multi-metric comparison' },
    dashboard: { label: 'Dashboard', icon: LayoutTemplate, description: 'Combined view' },
  };

  const getCategoryBadge = (category) => {
    const config = categoryConfig[category] || categoryConfig.accuracy;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={10} />
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={10} />
        {config.label}
      </Badge>
    );
  };

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddMetric = (metric) => {
    if (!selectedMetrics.find(m => m.id === metric.id)) {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  const handleRemoveMetric = (metricId) => {
    setSelectedMetrics(selectedMetrics.filter(m => m.id !== metricId));
  };

  const handleAddDimension = (dimension) => {
    if (!selectedDimensions.find(d => d.id === dimension.id)) {
      setSelectedDimensions([...selectedDimensions, dimension]);
    }
  };

  const handleRemoveDimension = (dimensionId) => {
    setSelectedDimensions(selectedDimensions.filter(d => d.id !== dimensionId));
  };

  const handleAddFilter = (filter) => {
    setSelectedFilters([...selectedFilters, filter]);
  };

  const handleCreateReport = () => {
    // In real app, API call to create report
    console.log('Creating report:', {
      name: reportName,
      description: reportDescription,
      type: reportType,
      metrics: selectedMetrics,
      dimensions: selectedDimensions,
      visualization: selectedVisualization,
    });
    setShowCreateDialog(false);
    // Reset form
    setReportName('');
    setReportDescription('');
    setSelectedMetrics([]);
    setSelectedDimensions([]);
    setSelectedVisualization('table');
  };

  const handleScheduleReport = () => {
    console.log('Scheduling report:', {
      reportId: selectedReport?.id,
      enabled: scheduleEnabled,
      frequency: scheduleFrequency,
      day: scheduleDay,
      time: scheduleTime,
      recipients,
    });
    setShowScheduleDialog(false);
  };

  const handleRunReport = (reportId) => {
    console.log('Running report:', reportId);
  };

  const handleExport = (reportId, format) => {
    console.log('Exporting report:', reportId, format);
  };

  const stats = {
    totalReports: reports.length,
    activeReports: reports.filter(r => r.status === 'active').length,
    scheduledReports: reports.filter(r => r.schedule).length,
    favorites: reports.reduce((sum, r) => sum + r.favorites, 0),
  };

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Custom Reports</h1>
            <p className="text-black/50 text-sm mt-1">
              Create, manage, and schedule custom reports for your inventory operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#F5EEE9] gap-2"
              onClick={() => setShowTemplateDialog(true)}
            >
              <LayoutTemplate size={16} />
              Templates
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Reports</p>
                  <p className="text-xl font-bold text-black">{stats.totalReports}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <FileText size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Reports</p>
                  <p className="text-xl font-bold text-green-600">{stats.activeReports}</p>
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
                  <p className="text-xs text-black/50">Scheduled Reports</p>
                  <p className="text-xl font-bold text-blue-600">{stats.scheduledReports}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <ClockIcon size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Favorites</p>
                  <p className="text-xl font-bold text-yellow-600">{stats.favorites}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Star size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
              <Input
                placeholder="Search reports by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-[#F5EEE9] focus:border-red-600"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[160px] border-[#F5EEE9]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.label}</SelectItem>
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
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

        {/* Reports Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {filteredReports.map((report) => {
              const CategoryIcon = categoryConfig[report.category]?.icon || FileText;
              
              return (
                <Card key={report.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <CategoryIcon size={16} className="text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{report.name}</h3>
                          <p className="text-xs text-black/50">{report.id}</p>
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
                            setSelectedReport(report);
                            setShowPreviewDialog(true);
                          }}>
                            <Eye size={14} className="mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedReport(report);
                            setShowScheduleDialog(true);
                          }}>
                            <ClockIcon size={14} className="mr-2" />
                            Schedule
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRunReport(report.id)}>
                            <Play size={14} className="mr-2" />
                            Run Now
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Copy size={14} className="mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setShowShareDialog(true)}>
                            <Share2 size={14} className="mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sm text-black/70 mb-3 line-clamp-2">{report.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {getCategoryBadge(report.category)}
                      {getStatusBadge(report.status)}
                      {report.schedule && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <ClockIcon size={10} className="mr-1" />
                          {report.schedule}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-black/50">Last Run</span>
                        <span className="text-black/70">{report.lastRun || 'Never'}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-black/50">Format</span>
                        <span className="text-black/70 uppercase">{report.format}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-black/50">Runs</span>
                        <span className="text-black/70">{report.runs}</span>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-yellow-600 hover:text-yellow-700"
                        >
                          <Star size={14} />
                          <span className="ml-1 text-xs">{report.favorites}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-red-600 hover:text-red-700"
                          onClick={() => handleExport(report.id, report.format)}
                        >
                          <Download size={14} />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleRunReport(report.id)}
                      >
                        <Play size={12} className="mr-1" />
                        Run
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F5EEE9]/30 border-b border-[#F5EEE9]">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Report Name</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Category</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Schedule</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Last Run</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Format</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-black/50">Runs</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-black/50">Favorites</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-black/50">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="border-b border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-black">{report.name}</p>
                            <p className="text-xs text-black/50 truncate max-w-[200px]">{report.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{getCategoryBadge(report.category)}</td>
                        <td className="py-3 px-4">{getStatusBadge(report.status)}</td>
                        <td className="py-3 px-4">
                          {report.schedule ? (
                            <div className="flex items-center gap-1">
                              <ClockIcon size={12} className="text-black/40" />
                              <span className="text-sm">{report.schedule}</span>
                            </div>
                          ) : '—'}
                        </td>
                        <td className="py-3 px-4 text-sm">{report.lastRun || '—'}</td>
                        <td className="py-3 px-4 text-sm uppercase">{report.format}</td>
                        <td className="py-3 px-4 text-center text-sm">{report.runs}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star size={12} className="text-yellow-600" />
                            <span className="text-sm">{report.favorites}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                                    setSelectedReport(report);
                                    setShowPreviewDialog(true);
                                  }}>
                                    <Eye size={14} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Preview</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRunReport(report.id)}>
                                    <Play size={14} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Run Now</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleExport(report.id, report.format)}>
                                    <Download size={14} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Export</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <MoreVertical size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit size={14} className="mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  setSelectedReport(report);
                                  setShowScheduleDialog(true);
                                }}>
                                  <ClockIcon size={14} className="mr-2" />
                                  Schedule
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy size={14} className="mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 size={14} className="mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredReports.length === 0 && (
          <Card className="border-[#F5EEE9]">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText size={48} className="text-black/20 mb-3" />
              <p className="text-black/50">No reports found</p>
              <p className="text-xs text-black/40 mt-1">Try adjusting your filters or create a new report</p>
              <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setShowCreateDialog(true)}>
                <Plus size={14} className="mr-2" />
                Create Report
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Report Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Custom Report</DialogTitle>
            <DialogDescription>
              Design your custom report with metrics, dimensions, and visualizations
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="metrics">Metrics & Dimensions</TabsTrigger>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Report Name *</Label>
                <Input
                  placeholder="Enter report name"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe what this report is about"
                  rows={3}
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Report</SelectItem>
                      <SelectItem value="custom">Custom Report</SelectItem>
                      <SelectItem value="dashboard">Dashboard Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-6">
                {/* Available Metrics */}
                <div>
                  <Label className="mb-2 block">Available Metrics</Label>
                  <ScrollArea className="h-[300px] border border-[#F5EEE9] rounded-lg p-2">
                    <div className="space-y-1">
                      {availableMetrics.map((metric) => (
                        <div
                          key={metric.id}
                          className="flex items-center justify-between p-2 hover:bg-[#F5EEE9] rounded-lg cursor-pointer"
                          onClick={() => handleAddMetric(metric)}
                        >
                          <div>
                            <p className="text-sm font-medium">{metric.name}</p>
                            <p className="text-xs text-black/50">{metric.category} • {metric.type}</p>
                          </div>
                          <PlusCircle size={14} className="text-green-600" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Selected Metrics */}
                <div>
                  <Label className="mb-2 block">Selected Metrics</Label>
                  <ScrollArea className="h-[300px] border border-[#F5EEE9] rounded-lg p-2">
                    {selectedMetrics.length === 0 ? (
                      <p className="text-sm text-black/50 text-center py-8">No metrics selected</p>
                    ) : (
                      <div className="space-y-1">
                        {selectedMetrics.map((metric) => (
                          <div key={metric.id} className="flex items-center justify-between p-2 bg-[#F5EEE9] rounded-lg">
                            <div>
                              <p className="text-sm font-medium">{metric.name}</p>
                              <p className="text-xs text-black/50">{metric.type}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-600"
                              onClick={() => handleRemoveMetric(metric.id)}
                            >
                              <MinusCircle size={14} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-6">
                {/* Available Dimensions */}
                <div>
                  <Label className="mb-2 block">Available Dimensions</Label>
                  <ScrollArea className="h-[200px] border border-[#F5EEE9] rounded-lg p-2">
                    <div className="space-y-1">
                      {availableDimensions.map((dimension) => (
                        <div
                          key={dimension.id}
                          className="flex items-center justify-between p-2 hover:bg-[#F5EEE9] rounded-lg cursor-pointer"
                          onClick={() => handleAddDimension(dimension)}
                        >
                          <div>
                            <p className="text-sm font-medium">{dimension.name}</p>
                            <p className="text-xs text-black/50">{dimension.type}</p>
                          </div>
                          <PlusCircle size={14} className="text-green-600" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Selected Dimensions */}
                <div>
                  <Label className="mb-2 block">Group By</Label>
                  <ScrollArea className="h-[200px] border border-[#F5EEE9] rounded-lg p-2">
                    {selectedDimensions.length === 0 ? (
                      <p className="text-sm text-black/50 text-center py-8">No dimensions selected</p>
                    ) : (
                      <div className="space-y-1">
                        {selectedDimensions.map((dimension) => (
                          <div key={dimension.id} className="flex items-center justify-between p-2 bg-[#F5EEE9] rounded-lg">
                            <p className="text-sm font-medium">{dimension.name}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-600"
                              onClick={() => handleRemoveDimension(dimension.id)}
                            >
                              <MinusCircle size={14} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visualization" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Visualization Type</Label>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(visualizationConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    return (
                      <div
                        key={key}
                        className={cn(
                          "p-3 border rounded-lg cursor-pointer transition-all text-center",
                          selectedVisualization === key
                            ? "border-red-600 bg-red-50"
                            : "border-[#F5EEE9] hover:border-red-300"
                        )}
                        onClick={() => setSelectedVisualization(key)}
                      >
                        <Icon size={24} className={cn(
                          "mx-auto mb-2",
                          selectedVisualization === key ? "text-red-600" : "text-black/50"
                        )} />
                        <p className={cn(
                          "text-sm font-medium",
                          selectedVisualization === key ? "text-red-600" : "text-black"
                        )}>{config.label}</p>
                        <p className="text-xs text-black/50 mt-1">{config.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Label>Enable Scheduling</Label>
                <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
              </div>

              {scheduleEnabled && (
                <>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {scheduleFrequency === 'weekly' && (
                    <div className="space-y-2">
                      <Label>Day of Week</Label>
                      <Select value={scheduleDay} onValueChange={setScheduleDay}>
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
                  )}

                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email Recipients</Label>
                    <Input
                      placeholder="Enter email addresses (comma separated)"
                      value={recipients}
                      onChange={(e) => setRecipients(e.target.value)}
                    />
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleCreateReport}
              disabled={!reportName}
            >
              <Save size={14} className="mr-2" />
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Report Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Schedule Report</DialogTitle>
            <DialogDescription>
              {selectedReport?.name} - Configure automated delivery
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <Label>Enable Auto-Schedule</Label>
              <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
            </div>

            {scheduleEnabled && (
              <>
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <Input placeholder="Email addresses" />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleScheduleReport}>
              <ClockIcon size={14} className="mr-2" />
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle>Report Preview: {selectedReport.name}</DialogTitle>
                <DialogDescription>
                  Preview of the generated report based on current data
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="p-4 bg-[#F5EEE9] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Report Summary</h3>
                    <Badge>{selectedReport.category}</Badge>
                  </div>
                  <p className="text-sm text-black/70">{selectedReport.description}</p>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <p className="text-xs text-black/50">Metrics</p>
                      <p className="text-sm">{selectedReport.metrics?.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Grouped By</p>
                      <p className="text-sm">{selectedReport.dimensions?.join(', ')}</p>
                    </div>
                  </div>
                </div>

                {/* Sample Preview Data */}
                <div className="border border-[#F5EEE9] rounded-lg p-4">
                  <h4 className="font-medium mb-3">Sample Data Preview</h4>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-[#F5EEE9]/50 rounded">
                        <span className="text-sm">Sample Row {i}</span>
                        <span className="text-sm text-green-600">Value {i * 100}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
                  Close
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleRunReport(selectedReport.id)}>
                  <Play size={14} className="mr-2" />
                  Run Report
                </Button>
                <Button variant="outline" onClick={() => handleExport(selectedReport.id, selectedReport.format)}>
                  <Download size={14} className="mr-2" />
                  Export
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Share Report</DialogTitle>
            <DialogDescription>
              Share this report with team members
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Share with</Label>
              <Input placeholder="Enter email addresses" />
            </div>
            <div className="space-y-2">
              <Label>Message (Optional)</Label>
              <Input placeholder="Add a note" />
            </div>
            <div className="space-y-2">
              <Label>Access Level</Label>
              <Select defaultValue="view">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View Only</SelectItem>
                  <SelectItem value="edit">Can Edit</SelectItem>
                  <SelectItem value="full">Full Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Share2 size={14} className="mr-2" />
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Additional icon component
const ArchiveIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="5" rx="1" ry="1" />
    <path d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
    <path d="M9 13h6" />
  </svg>
);

export default CustomReportsPage;