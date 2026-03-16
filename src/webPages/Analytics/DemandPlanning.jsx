// app/dashboard/demand-planning/page.js
'use client';

import { useState } from 'react';
import { 

  Package,
  DollarSign,
  Users,
  Target,
  Clock,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Download,
  Upload,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Settings,
  BarChart3,
  Plus,
  ArrowUp,
  User,
  Cpu,
  FileText,
  ClipboardList,
  Armchair,
  Shirt,
  Apple,
  Pill,
  Watch,
  Ban,
 
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

import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DemandPlanningPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('q2-2024');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showAdjustDialog, setShowAdjustDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);

  // Sample demand planning data
  const demandPlans = [
    {
      id: 'PLAN-001',
      planName: 'Q2 2024 Demand Plan',
      period: 'q2-2024',
      status: 'approved',
      version: '2.0',
      createdBy: 'John Smith',
      createdAt: '2024-03-15',
      approvedBy: 'Sarah Wilson',
      approvedAt: '2024-03-16',
      categories: [
        { name: 'Electronics', forecast: 125000, actual: 0, variance: 0 },
        { name: 'Furniture', forecast: 85000, actual: 0, variance: 0 },
        { name: 'Apparel', forecast: 95000, actual: 0, variance: 0 },
        { name: 'Food', forecast: 110000, actual: 0, variance: 0 },
      ],
      totalForecast: 415000,
      totalActual: 0,
      totalVariance: 0,
      confidence: 92,
      assumptions: [
        'Seasonal demand increase of 15%',
        'New product launches in Electronics',
        'Marketing campaign in Q2',
        'Supplier lead times stable',
      ],
      risks: [
        'Potential supply chain disruptions',
        'Economic uncertainty',
        'Competitor promotions',
      ],
      adjustments: [
        { date: '2024-03-10', type: 'increase', amount: 15000, reason: 'Marketing campaign confirmed' },
      ],
      history: [
        { date: '2024-03-16', action: 'Approved', user: 'Sarah Wilson' },
        { date: '2024-03-15', action: 'Created', user: 'John Smith' },
      ],
      tags: ['quarterly', 'approved', 'q2'],
    },
    {
      id: 'PLAN-002',
      planName: 'Q2 2024 - Electronics Revised',
      period: 'q2-2024',
      status: 'pending',
      version: '2.1',
      createdBy: 'Jane Doe',
      createdAt: '2024-03-14',
      approvedBy: null,
      approvedAt: null,
      categories: [
        { name: 'Electronics', forecast: 135000, actual: 0, variance: 0 },
        { name: 'Accessories', forecast: 45000, actual: 0, variance: 0 },
      ],
      totalForecast: 180000,
      totalActual: 0,
      totalVariance: 0,
      confidence: 88,
      assumptions: [
        'New product launch in Electronics',
        'Increased marketing spend',
      ],
      risks: [
        'Component shortages',
        'Longer lead times',
      ],
      adjustments: [],
      tags: ['electronics', 'pending', 'revision'],
      history: [
        { date: '2024-03-14', action: 'Created', user: 'Jane Doe' },
      ],
    },
    {
      id: 'PLAN-003',
      planName: 'June 2024 Monthly Forecast',
      period: 'june-2024',
      status: 'draft',
      version: '1.0',
      createdBy: 'Mike Johnson',
      createdAt: '2024-03-13',
      approvedBy: null,
      approvedAt: null,
      categories: [
        { name: 'Electronics', forecast: 42000, actual: 0, variance: 0 },
        { name: 'Furniture', forecast: 28000, actual: 0, variance: 0 },
        { name: 'Apparel', forecast: 31000, actual: 0, variance: 0 },
        { name: 'Food', forecast: 36000, actual: 0, variance: 0 },
      ],
      totalForecast: 137000,
      totalActual: 0,
      totalVariance: 0,
      confidence: 85,
      assumptions: [
        'Summer sales event',
        'New inventory system',
      ],
      risks: [
        'Weather impact on demand',
      ],
      adjustments: [],
      tags: ['monthly', 'draft', 'june'],
      history: [
        { date: '2024-03-13', action: 'Created', user: 'Mike Johnson' },
      ],
    },
    {
      id: 'PLAN-004',
      planName: 'Q3 2024 Preliminary',
      period: 'q3-2024',
      status: 'draft',
      version: '0.5',
      createdBy: 'Sarah Wilson',
      createdAt: '2024-03-12',
      approvedBy: null,
      approvedAt: null,
      categories: [
        { name: 'Electronics', forecast: 140000, actual: 0, variance: 0 },
        { name: 'Furniture', forecast: 90000, actual: 0, variance: 0 },
        { name: 'Apparel', forecast: 100000, actual: 0, variance: 0 },
        { name: 'Food', forecast: 115000, actual: 0, variance: 0 },
        { name: 'Medical', forecast: 75000, actual: 0, variance: 0 },
      ],
      totalForecast: 520000,
      totalActual: 0,
      totalVariance: 0,
      confidence: 78,
      assumptions: [
        'Back-to-school season',
        'New warehouse opening',
      ],
      risks: [
        'Economic uncertainty',
        'Labor shortages',
      ],
      adjustments: [],
      tags: ['quarterly', 'draft', 'q3'],
      history: [
        { date: '2024-03-12', action: 'Created', user: 'Sarah Wilson' },
      ],
    },
    {
      id: 'PLAN-005',
      planName: 'May 2024 Forecast',
      period: 'may-2024',
      status: 'approved',
      version: '1.2',
      createdBy: 'Tom Brown',
      createdAt: '2024-03-10',
      approvedBy: 'Sarah Wilson',
      approvedAt: '2024-03-11',
      categories: [
        { name: 'Electronics', forecast: 38000, actual: 0, variance: 0 },
        { name: 'Furniture', forecast: 25000, actual: 0, variance: 0 },
        { name: 'Apparel', forecast: 28000, actual: 0, variance: 0 },
        { name: 'Food', forecast: 32000, actual: 0, variance: 0 },
      ],
      totalForecast: 123000,
      totalActual: 0,
      totalVariance: 0,
      confidence: 90,
      assumptions: [
        'Memorial Day sales',
        'Spring promotions',
      ],
      risks: [
        'Weather impact',
      ],
      adjustments: [
        { date: '2024-03-05', type: 'increase', amount: 8000, reason: 'Marketing campaign' },
      ],
      tags: ['monthly', 'approved', 'may'],
      history: [
        { date: '2024-03-11', action: 'Approved', user: 'Sarah Wilson' },
        { date: '2024-03-10', action: 'Created', user: 'Tom Brown' },
      ],
    },
    {
      id: 'PLAN-006',
      planName: 'Electronics Q2 Forecast',
      period: 'q2-2024',
      status: 'approved',
      version: '3.0',
      createdBy: 'Lisa Chen',
      createdAt: '2024-03-08',
      approvedBy: 'John Smith',
      approvedAt: '2024-03-09',
      categories: [
        { name: 'Smartphones', forecast: 45000, actual: 0, variance: 0 },
        { name: 'Laptops', forecast: 38000, actual: 0, variance: 0 },
        { name: 'Accessories', forecast: 32000, actual: 0, variance: 0 },
        { name: 'Audio', forecast: 28000, actual: 0, variance: 0 },
      ],
      totalForecast: 143000,
      totalActual: 0,
      totalVariance: 0,
      confidence: 94,
      assumptions: [
        'New product launches',
        'Strong demand in gaming',
      ],
      risks: [
        'Chip shortage',
        'Competition',
      ],
      adjustments: [],
      tags: ['electronics', 'quarterly', 'approved'],
      history: [
        { date: '2024-03-09', action: 'Approved', user: 'John Smith' },
        { date: '2024-03-08', action: 'Created', user: 'Lisa Chen' },
      ],
    },
  ];

  // Planning periods
  const periods = [
    { id: 'q2-2024', name: 'Q2 2024', count: 3 },
    { id: 'q3-2024', name: 'Q3 2024', count: 1 },
    { id: 'may-2024', name: 'May 2024', count: 1 },
    { id: 'june-2024', name: 'June 2024', count: 1 },
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Categories', count: demandPlans.length },
    { id: 'electronics', name: 'Electronics', count: demandPlans.filter(p => 
      p.categories.some(c => c.name.includes('Electronics') || c.name.includes('Smartphones'))).length },
    { id: 'furniture', name: 'Furniture', count: demandPlans.filter(p => 
      p.categories.some(c => c.name === 'Furniture')).length },
    { id: 'apparel', name: 'Apparel', count: demandPlans.filter(p => 
      p.categories.some(c => c.name === 'Apparel')).length },
    { id: 'food', name: 'Food', count: demandPlans.filter(p => 
      p.categories.some(c => c.name === 'Food')).length },
    { id: 'medical', name: 'Medical', count: demandPlans.filter(p => 
      p.categories.some(c => c.name === 'Medical')).length },
  ];

  // Status configuration
  const statusConfig = {
    draft: { label: 'Draft', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: FileText },
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    approved: { label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || FileText;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getCategoryIcon = (categoryName) => {
    if (categoryName.includes('Electronics') || categoryName.includes('Smartphones') || categoryName.includes('Laptops') || categoryName.includes('Audio')) {
      return <Cpu size={14} className="text-blue-600" />;
    } else if (categoryName === 'Furniture') {
      return <Armchair size={14} className="text-orange-600" />;
    } else if (categoryName === 'Apparel') {
      return <Shirt size={14} className="text-purple-600" />;
    } else if (categoryName === 'Food') {
      return <Apple size={14} className="text-green-600" />;
    } else if (categoryName === 'Medical') {
      return <Pill size={14} className="text-red-600" />;
    } else if (categoryName === 'Accessories') {
      return <Watch size={14} className="text-pink-600" />;
    }
    return <Package size={14} className="text-gray-600" />;
  };

  const filteredPlans = demandPlans.filter(plan => {
    const matchesPeriod = selectedPeriod === 'all' || plan.period === selectedPeriod;
    const matchesStatus = selectedStatus === 'all' || plan.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || plan.categories.some(c => 
      c.name.toLowerCase().includes(selectedCategory.toLowerCase()));
    const matchesSearch = plan.planName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesPeriod && matchesStatus && matchesCategory && matchesSearch;
  });

  const stats = {
    total: demandPlans.length,
    approved: demandPlans.filter(p => p.status === 'approved').length,
    pending: demandPlans.filter(p => p.status === 'pending').length,
    draft: demandPlans.filter(p => p.status === 'draft').length,
    totalForecast: demandPlans.reduce((sum, p) => sum + p.totalForecast, 0),
    avgConfidence: Math.round(demandPlans.reduce((sum, p) => sum + p.confidence, 0) / demandPlans.length),
  };

  const handleSelectAll = () => {
    if (selectedPlans.length === filteredPlans.length) {
      setSelectedPlans([]);
    } else {
      setSelectedPlans(filteredPlans.map(p => p.id));
    }
  };

  const handleSelectPlan = (id) => {
    if (selectedPlans.includes(id)) {
      setSelectedPlans(selectedPlans.filter(p => p !== id));
    } else {
      setSelectedPlans([...selectedPlans, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Demand Planning</h1>
            <p className="text-black/50 mt-1">Create and manage demand forecasts and plans</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[150px] border-[#F5EEE9]">
                <SelectValue placeholder="Planning Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                {periods.map(period => (
                  <SelectItem key={period.id} value={period.id}>{period.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

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
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              New Plan
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Plans</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
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
                  <p className="text-xs text-black/50">Approved</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.approved}</p>
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
                  <p className="text-xs text-black/50">Pending</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
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
                  <p className="text-xs text-black/50">Total Forecast</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">${(stats.totalForecast / 1000).toFixed(0)}k</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <DollarSign size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Confidence</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.avgConfidence}%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Target size={18} className="text-purple-600" />
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
              placeholder="Search by plan name, creator, or tags..."
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </SelectItem>
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

      {/* Bulk Actions Bar */}
      {selectedPlans.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedPlans.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedPlans([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <CheckCircle size={14} className="mr-2" />
              Approve
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Edit size={14} className="mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Demand Plans Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredPlans.map((plan) => {
            const StatusIcon = statusConfig[plan.status]?.icon || FileText;
            
            return (
              <Card key={plan.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(plan.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {plan.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            v{plan.version}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{plan.planName}</h3>
                        <p className="text-xs text-black/50 mt-1">{plan.period}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedPlan(plan);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {plan.status === 'draft' && (
                            <>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedPlan(plan);
                                setShowApproveDialog(true);
                              }}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Submit for Approval
                              </DropdownMenuItem>
                            </>
                          )}
                          {plan.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => {
                                setSelectedPlan(plan);
                                setShowApproveDialog(true);
                              }}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedPlan(plan);
                                setShowRejectDialog(true);
                              }}>
                                <Ban className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {plan.status === 'approved' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedPlan(plan);
                              setShowAdjustDialog(true);
                            }}>
                              <ArrowUp className="mr-2 h-4 w-4" />
                              Adjust Forecast
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
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
                    {/* Forecast Summary */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Total Forecast</span>
                        <span className="text-sm font-bold text-green-600">${plan.totalForecast.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Categories Preview */}
                    <div className="space-y-2 mb-3">
                      {plan.categories.slice(0, 3).map((category, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            {getCategoryIcon(category.name)}
                            <span>{category.name}</span>
                          </div>
                          <span className="font-medium">${category.forecast.toLocaleString()}</span>
                        </div>
                      ))}
                      {plan.categories.length > 3 && (
                        <p className="text-[10px] text-black/50 text-center">
                          +{plan.categories.length - 3} more categories
                        </p>
                      )}
                    </div>

                    {/* Confidence */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Confidence</span>
                        <span className="text-xs font-medium">{plan.confidence}%</span>
                      </div>
                      <Progress 
                        value={plan.confidence} 
                        className="h-1.5 bg-[#F5EEE9]"
                        style={{ 
                          '--progress-background': 
                            plan.confidence >= 90 ? '#22c55e' :
                            plan.confidence >= 80 ? '#3b82f6' :
                            plan.confidence >= 70 ? '#eab308' :
                            '#ef4444'
                        }}
                      />
                    </div>

                    {/* Created By */}
                    <div className="flex items-center gap-1 mb-2">
                      <User size={10} className="text-black/30" />
                      <span className="text-[10px] text-black/70">{plan.createdBy}</span>
                      <span className="text-[10px] text-black/30">•</span>
                      <span className="text-[10px] text-black/70">{plan.createdAt}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {plan.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                      <span>Version {plan.version}</span>
                      {plan.approvedBy && (
                        <span>Approved: {plan.approvedBy}</span>
                      )}
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
                    <Checkbox 
                      checked={selectedPlans.length === filteredPlans.length && filteredPlans.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Plan Name</TableHead>
                  <TableHead className="text-black/50">Period</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Version</TableHead>
                  <TableHead className="text-black/50 text-right">Forecast</TableHead>
                  <TableHead className="text-black/50">Confidence</TableHead>
                  <TableHead className="text-black/50">Created By</TableHead>
                  <TableHead className="text-black/50">Created</TableHead>
                  <TableHead className="text-black/50">Approved</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan) => (
                  <TableRow key={plan.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedPlans.includes(plan.id)}
                        onCheckedChange={() => handleSelectPlan(plan.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{plan.planName}</TableCell>
                    <TableCell className="text-xs">{plan.period}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(plan.status))}>
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{plan.version}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      ${plan.totalForecast.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={plan.confidence} className="w-16 h-2 bg-[#F5EEE9]" />
                        <span className="text-xs">{plan.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{plan.createdBy}</TableCell>
                    <TableCell className="text-xs">{plan.createdAt}</TableCell>
                    <TableCell className="text-xs">{plan.approvedBy || '—'}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedPlan(plan);
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
                Showing {filteredPlans.length} of {demandPlans.length} plans
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

      {/* Create Plan Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Demand Plan</DialogTitle>
            <DialogDescription>
              Create a new demand forecast plan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Plan Name</Label>
                    <Input placeholder="e.g., Q2 2024 Demand Plan" />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q2-2024">Q2 2024</SelectItem>
                        <SelectItem value="q3-2024">Q3 2024</SelectItem>
                        <SelectItem value="may-2024">May 2024</SelectItem>
                        <SelectItem value="june-2024">June 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Plan description" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Version</Label>
                  <Input placeholder="1.0" />
                </div>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Category name" />
                          <Input type="number" placeholder="Forecast amount" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus size={14} className="mr-2" />
                    Add Category
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="assumptions" className="space-y-4">
                <div className="space-y-2">
                  <Label>Key Assumptions</Label>
                  <Textarea placeholder="List key assumptions" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Risks</Label>
                  <Textarea placeholder="List potential risks" rows={3} />
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
              Create Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Plan Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Demand Plan Details</DialogTitle>
          </DialogHeader>

          {selectedPlan && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                  <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedPlan.planName}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedPlan.period} • v{selectedPlan.version}</p>
                    </div>
                    <Badge className={cn("text-xs border-0", getStatusColor(selectedPlan.status))}>
                      {selectedPlan.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Total Forecast</p>
                      <p className="text-2xl font-bold text-green-600">${selectedPlan.totalForecast.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Confidence</p>
                      <p className="text-2xl font-bold">{selectedPlan.confidence}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Created By</p>
                      <p className="text-sm">{selectedPlan.createdBy}</p>
                      <p className="text-xs text-black/50">{selectedPlan.createdAt}</p>
                    </div>
                    {selectedPlan.approvedBy && (
                      <div>
                        <p className="text-xs text-black/50">Approved By</p>
                        <p className="text-sm">{selectedPlan.approvedBy}</p>
                        <p className="text-xs text-black/50">{selectedPlan.approvedAt}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedPlan.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="categories" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#F5EEE9]">
                        <TableHead className="text-black/50">Category</TableHead>
                        <TableHead className="text-black/50 text-right">Forecast</TableHead>
                        <TableHead className="text-black/50 text-right">Actual</TableHead>
                        <TableHead className="text-black/50 text-right">Variance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPlan.categories.map((category, idx) => (
                        <TableRow key={idx} className="border-[#F5EEE9]">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(category.name)}
                              {category.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">${category.forecast.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${category.actual.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            {category.variance !== 0 ? (
                              <span className={cn(
                                "text-xs",
                                category.variance > 0 ? 'text-green-600' : 'text-red-600'
                              )}>
                                {category.variance > 0 ? '+' : ''}{category.variance}%
                              </span>
                            ) : (
                              <span className="text-black/30">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="assumptions" className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-2">Key Assumptions</p>
                      <ul className="space-y-2">
                        {selectedPlan.assumptions.map((assumption, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle size={14} className="text-green-600 mt-0.5" />
                            <span>{assumption}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-2">Risks</p>
                      <ul className="space-y-2">
                        {selectedPlan.risks.map((risk, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <AlertTriangle size={14} className="text-yellow-600 mt-0.5" />
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {selectedPlan.adjustments && selectedPlan.adjustments.length > 0 && (
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-4">
                        <p className="text-sm font-medium mb-2">Adjustments</p>
                        <div className="space-y-2">
                          {selectedPlan.adjustments.map((adj, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-black/50">{adj.date}</span>
                                <Badge className={adj.type === 'increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                                  {adj.type === 'increase' ? '+' : '-'}${adj.amount}
                                </Badge>
                              </div>
                              <span className="text-black/70">{adj.reason}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedPlan.history.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          {item.action === 'Created' && <Plus size={12} className="text-green-600 mt-0.5" />}
                          {item.action === 'Approved' && <CheckCircle size={12} className="text-green-600 mt-0.5" />}
                          {item.action === 'Rejected' && <AlertCircle size={12} className="text-red-600 mt-0.5" />}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedPlan?.status === 'draft' && (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowApproveDialog(true);
              }}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Submit for Approval
              </Button>
            )}
            {selectedPlan?.status === 'pending' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowApproveDialog(true);
              }}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Plan
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
                <ClipboardList size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">New Plan</TooltipContent>
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
            <TooltipContent side="left">Reports</TooltipContent>
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

export default DemandPlanningPage;