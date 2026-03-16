// app/dashboard/performance-metrics/page.js
'use client';

import { useState } from 'react';
import { 
  Gauge,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  Target,
  Award,
  Download,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  MoreVertical,
  Eye,
  Copy,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Settings,
  BarChart3,
  Activity,
  Lightbulb,
  Building,
  Truck,
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
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PerformanceMetricsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showTargetDialog, setShowTargetDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showDashboardDialog, setShowDashboardDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  // Sample performance metrics data
  const metrics = [
    {
      id: 'METRIC-001',
      name: 'Inventory Turnover',
      category: 'inventory',
      value: 8.5,
      target: 7.5,
      unit: 'turns',
      status: 'above',
      change: '+0.8',
      trend: 'up',
      description: 'Number of times inventory is sold or used over a period',
      historical: [
        { date: 'Jan', value: 7.2 },
        { date: 'Feb', value: 7.5 },
        { date: 'Mar', value: 7.8 },
        { date: 'Apr', value: 8.1 },
        { date: 'May', value: 8.3 },
        { date: 'Jun', value: 8.5 },
      ],
      forecast: [
        { date: 'Jul', value: 8.7 },
        { date: 'Aug', value: 8.9 },
        { date: 'Sep', value: 9.1 },
      ],
      insights: [
        'Inventory turnover exceeds target by 13.3%',
        'Improvement of 0.8 turns over last month',
        'Projected to reach 9.1 turns by Q3',
      ],
      recommendations: [
        'Monitor fast-moving items for stockouts',
        'Consider increasing reorder quantities for top sellers',
      ],
      tags: ['inventory', 'efficiency', 'kpi'],
      lastUpdated: '2024-03-15',
    },
    {
      id: 'METRIC-002',
      name: 'Order Fulfillment Rate',
      category: 'operations',
      value: 97.2,
      target: 98.0,
      unit: '%',
      status: 'below',
      change: '-0.5',
      trend: 'down',
      description: 'Percentage of orders fulfilled without issues',
      historical: [
        { date: 'Jan', value: 98.5 },
        { date: 'Feb', value: 98.2 },
        { date: 'Mar', value: 97.9 },
        { date: 'Apr', value: 97.6 },
        { date: 'May', value: 97.4 },
        { date: 'Jun', value: 97.2 },
      ],
      forecast: [
        { date: 'Jul', value: 97.0 },
        { date: 'Aug', value: 96.8 },
        { date: 'Sep', value: 96.5 },
      ],
      insights: [
        'Fulfillment rate below target by 0.8%',
        'Declining trend over last 3 months',
        'Main issues: picking errors, shipping delays',
      ],
      recommendations: [
        'Review picking accuracy',
        'Investigate carrier performance',
        'Consider additional quality checks',
      ],
      tags: ['operations', 'fulfillment', 'quality'],
      lastUpdated: '2024-03-15',
    },
    {
      id: 'METRIC-003',
      name: 'Inventory Accuracy',
      category: 'inventory',
      value: 98.5,
      target: 99.0,
      unit: '%',
      status: 'below',
      change: '-0.2',
      trend: 'down',
      description: 'Accuracy of physical inventory vs system records',
      historical: [
        { date: 'Jan', value: 99.1 },
        { date: 'Feb', value: 98.9 },
        { date: 'Mar', value: 98.8 },
        { date: 'Apr', value: 98.7 },
        { date: 'May', value: 98.6 },
        { date: 'Jun', value: 98.5 },
      ],
      forecast: [
        { date: 'Jul', value: 98.4 },
        { date: 'Aug', value: 98.3 },
        { date: 'Sep', value: 98.2 },
      ],
      insights: [
        'Slight decline in accuracy over last 3 months',
        'Discrepancies mainly in high-velocity items',
        'Cycle counting effectiveness needs review',
      ],
      recommendations: [
        'Increase cycle count frequency',
        'Review receiving procedures',
        'Conduct targeted audits',
      ],
      tags: ['inventory', 'accuracy', 'quality'],
      lastUpdated: '2024-03-15',
    },
    {
      id: 'METRIC-004',
      name: 'Stockout Rate',
      category: 'inventory',
      value: 2.3,
      target: 2.0,
      unit: '%',
      status: 'below',
      change: '+0.3',
      trend: 'up',
      description: 'Percentage of time items are out of stock',
      historical: [
        { date: 'Jan', value: 1.8 },
        { date: 'Feb', value: 1.9 },
        { date: 'Mar', value: 2.0 },
        { date: 'Apr', value: 2.1 },
        { date: 'May', value: 2.2 },
        { date: 'Jun', value: 2.3 },
      ],
      forecast: [
        { date: 'Jul', value: 2.4 },
        { date: 'Aug', value: 2.5 },
        { date: 'Sep', value: 2.6 },
      ],
      insights: [
        'Stockout rate above target by 0.3%',
        'Increasing trend over last 6 months',
        'Most stockouts in electronics category',
      ],
      recommendations: [
        'Review reorder points for electronics',
        'Increase safety stock levels',
        'Monitor supplier lead times',
      ],
      tags: ['inventory', 'stockout', 'service-level'],
      lastUpdated: '2024-03-15',
    },
    {
      id: 'METRIC-005',
      name: 'On-Time Delivery',
      category: 'operations',
      value: 95.8,
      target: 96.0,
      unit: '%',
      status: 'below',
      change: '-0.2',
      trend: 'down',
      description: 'Percentage of orders delivered on time',
      historical: [
        { date: 'Jan', value: 96.5 },
        { date: 'Feb', value: 96.2 },
        { date: 'Mar', value: 96.0 },
        { date: 'Apr', value: 95.9 },
        { date: 'May', value: 95.8 },
        { date: 'Jun', value: 95.8 },
      ],
      forecast: [
        { date: 'Jul', value: 95.7 },
        { date: 'Aug', value: 95.6 },
        { date: 'Sep', value: 95.5 },
      ],
      insights: [
        'Slightly below target at 95.8%',
        'Carrier performance issues in Midwest',
        'Weather delays impacting deliveries',
      ],
      recommendations: [
        'Review carrier contracts',
        'Add buffer time for weather-prone regions',
        'Consider alternative carriers',
      ],
      tags: ['operations', 'delivery', 'customer-service'],
      lastUpdated: '2024-03-15',
    },
    {
      id: 'METRIC-006',
      name: 'Warehouse Capacity Utilization',
      category: 'warehouse',
      value: 78.5,
      target: 80.0,
      unit: '%',
      status: 'below',
      change: '-1.5',
      trend: 'down',
      description: 'Percentage of warehouse capacity used',
      historical: [
        { date: 'Jan', value: 82.0 },
        { date: 'Feb', value: 81.2 },
        { date: 'Mar', value: 80.5 },
        { date: 'Apr', value: 79.8 },
        { date: 'May', value: 79.0 },
        { date: 'Jun', value: 78.5 },
      ],
      forecast: [
        { date: 'Jul', value: 78.0 },
        { date: 'Aug', value: 77.5 },
        { date: 'Sep', value: 77.0 },
      ],
      insights: [
        'Utilization below target by 1.5%',
        'Decreasing trend due to improved processes',
        'Room for additional inventory',
      ],
      recommendations: [
        'Consider consolidating slow-moving items',
        'Optimize slotting for efficiency',
        'Evaluate storage layout',
      ],
      tags: ['warehouse', 'capacity', 'space'],
      lastUpdated: '2024-03-15',
    },
    {
      id: 'METRIC-007',
      name: 'Pick Accuracy',
      category: 'operations',
      value: 99.2,
      target: 99.5,
      unit: '%',
      status: 'below',
      change: '-0.2',
      trend: 'down',
      description: 'Percentage of picks performed correctly',
      historical: [
        { date: 'Jan', value: 99.7 },
        { date: 'Feb', value: 99.6 },
        { date: 'Mar', value: 99.5 },
        { date: 'Apr', value: 99.4 },
        { date: 'May', value: 99.3 },
        { date: 'Jun', value: 99.2 },
      ],
      forecast: [
        { date: 'Jul', value: 99.1 },
        { date: 'Aug', value: 99.0 },
        { date: 'Sep', value: 98.9 },
      ],
      insights: [
        'Pick accuracy declining slightly',
        'New pickers need additional training',
        'Scanner issues at Station 3',
      ],
      recommendations: [
        'Provide refresher training',
        'Check scanner calibration',
        'Review pick path optimization',
      ],
      tags: ['operations', 'picking', 'quality'],
      lastUpdated: '2024-03-15',
    },
    {
      id: 'METRIC-008',
      name: 'Return Rate',
      category: 'quality',
      value: 2.8,
      target: 3.0,
      unit: '%',
      status: 'above',
      change: '-0.2',
      trend: 'down',
      description: 'Percentage of orders returned',
      historical: [
        { date: 'Jan', value: 3.2 },
        { date: 'Feb', value: 3.1 },
        { date: 'Mar', value: 3.0 },
        { date: 'Apr', value: 2.9 },
        { date: 'May', value: 2.8 },
        { date: 'Jun', value: 2.8 },
      ],
      forecast: [
        { date: 'Jul', value: 2.7 },
        { date: 'Aug', value: 2.6 },
        { date: 'Sep', value: 2.5 },
      ],
      insights: [
        'Return rate below target at 2.8%',
        'Improving trend over last 6 months',
        'Most returns due to sizing issues',
      ],
      recommendations: [
        'Improve size guides on website',
        'Add more product images',
        'Monitor return reasons by category',
      ],
      tags: ['quality', 'returns', 'customer-satisfaction'],
      lastUpdated: '2024-03-15',
    },
    {
      id: 'METRIC-009',
      name: 'Average Order Value',
      category: 'sales',
      value: 145.50,
      target: 140.00,
      unit: '$',
      status: 'above',
      change: '+5.50',
      trend: 'up',
      description: 'Average value per order',
      historical: [
        { date: 'Jan', value: 135.20 },
        { date: 'Feb', value: 137.50 },
        { date: 'Mar', value: 139.80 },
        { date: 'Apr', value: 141.20 },
        { date: 'May', value: 143.60 },
        { date: 'Jun', value: 145.50 },
      ],
      forecast: [
        { date: 'Jul', value: 147.30 },
        { date: 'Aug', value: 149.10 },
        { date: 'Sep', value: 151.00 },
      ],
      insights: [
        'AOV exceeds target by $5.50',
        'Upselling strategies working well',
        'Bundled products driving higher value',
      ],
      recommendations: [
        'Continue product bundling',
        'Promote complementary items',
        'Analyze high-value customer segments',
      ],
      tags: ['sales', 'revenue', 'customer'],
      lastUpdated: '2024-03-15',
    },
    {
      id: 'METRIC-010',
      name: 'Carrier Performance Score',
      category: 'logistics',
      value: 92.5,
      target: 95.0,
      unit: 'pts',
      status: 'below',
      change: '-1.2',
      trend: 'down',
      description: 'Overall carrier performance rating',
      historical: [
        { date: 'Jan', value: 94.8 },
        { date: 'Feb', value: 94.2 },
        { date: 'Mar', value: 93.8 },
        { date: 'Apr', value: 93.2 },
        { date: 'May', value: 92.8 },
        { date: 'Jun', value: 92.5 },
      ],
      forecast: [
        { date: 'Jul', value: 92.0 },
        { date: 'Aug', value: 91.5 },
        { date: 'Sep', value: 91.0 },
      ],
      insights: [
        'Carrier performance below target',
        'Regional carrier issues in South',
        'UPS performance stable, FedEx declining',
      ],
      recommendations: [
        'Review carrier scorecards',
        'Consider alternative carriers in South',
        'Negotiate service level agreements',
      ],
      tags: ['logistics', 'carrier', 'shipping'],
      lastUpdated: '2024-03-15',
    },
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Categories', count: metrics.length },
    { id: 'inventory', name: 'Inventory', count: metrics.filter(m => m.category === 'inventory').length },
    { id: 'operations', name: 'Operations', count: metrics.filter(m => m.category === 'operations').length },
    { id: 'warehouse', name: 'Warehouse', count: metrics.filter(m => m.category === 'warehouse').length },
    { id: 'quality', name: 'Quality', count: metrics.filter(m => m.category === 'quality').length },
    { id: 'sales', name: 'Sales', count: metrics.filter(m => m.category === 'sales').length },
    { id: 'logistics', name: 'Logistics', count: metrics.filter(m => m.category === 'logistics').length },
  ];

  // Time ranges
  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '60d', label: '60 Days' },
    { value: '90d', label: '90 Days' },
    { value: '180d', label: '6 Months' },
    { value: '365d', label: '1 Year' },
  ];

  const getStatusConfig = (status) => {
    switch(status) {
      case 'above':
        return { label: 'Above Target', color: 'bg-green-100 text-green-700', icon: TrendingUp };
      case 'on-target':
        return { label: 'On Target', color: 'bg-blue-100 text-blue-700', icon: Target };
      case 'below':
        return { label: 'Below Target', color: 'bg-yellow-100 text-yellow-700', icon: TrendingDown };
      case 'critical':
        return { label: 'Critical', color: 'bg-red-100 text-red-700', icon: AlertCircle };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-700', icon: Activity };
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return <TrendingUp size={14} className="text-green-600" />;
    } else if (trend === 'down') {
      return <TrendingDown size={14} className="text-red-600" />;
    }
    return null;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'inventory': return <Package size={14} className="text-blue-600" />;
      case 'operations': return <Activity size={14} className="text-orange-600" />;
      case 'warehouse': return <Building size={14} className="text-purple-600" />;
      case 'quality': return <Award size={14} className="text-green-600" />;
      case 'sales': return <DollarSign size={14} className="text-emerald-600" />;
      case 'logistics': return <Truck size={14} className="text-cyan-600" />;
      default: return <Gauge size={14} className="text-gray-600" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'inventory': return 'bg-blue-100 text-blue-700';
      case 'operations': return 'bg-orange-100 text-orange-700';
      case 'warehouse': return 'bg-purple-100 text-purple-700';
      case 'quality': return 'bg-green-100 text-green-700';
      case 'sales': return 'bg-emerald-100 text-emerald-700';
      case 'logistics': return 'bg-cyan-100 text-cyan-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressColor = (value, target, status) => {
    const percentage = (value / target) * 100;
    if (status === 'above') {
      return percentage >= 120 ? 'bg-purple-500' : 'bg-green-500';
    } else if (status === 'below') {
      return percentage >= 90 ? 'bg-yellow-500' : 'bg-red-500';
    }
    return 'bg-blue-500';
  };

  const filteredMetrics = metrics.filter(metric => {
    const matchesCategory = selectedCategory === 'all' || metric.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || metric.status === selectedStatus;
    const matchesSearch = metric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         metric.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         metric.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const stats = {
    total: metrics.length,
    above: metrics.filter(m => m.status === 'above').length,
    onTarget: metrics.filter(m => m.status === 'on-target').length,
    below: metrics.filter(m => m.status === 'below').length,
    critical: metrics.filter(m => m.status === 'critical').length,
    avgPerformance: Math.round((metrics.filter(m => m.status === 'above' || m.status === 'on-target').length / metrics.length) * 100),
  };

  const handleSelectAll = () => {
    if (selectedMetrics.length === filteredMetrics.length) {
      setSelectedMetrics([]);
    } else {
      setSelectedMetrics(filteredMetrics.map(m => m.id));
    }
  };

  const handleSelectMetric = (id) => {
    if (selectedMetrics.includes(id)) {
      setSelectedMetrics(selectedMetrics.filter(m => m !== id));
    } else {
      setSelectedMetrics([...selectedMetrics, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Performance Metrics</h1>
            <p className="text-black/50 mt-1">Track and monitor key performance indicators</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-[120px] border-[#F5EEE9]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
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
              onClick={() => setShowDashboardDialog(true)}
            >
              <Gauge size={16} />
              Dashboard
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowTargetDialog(true)}
            >
              <Target size={16} />
              Set Targets
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Metrics</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Gauge size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Above Target</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.above}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <TrendingUp size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">On Target</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.onTarget}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Target size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Below Target</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.below}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <TrendingDown size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Performance</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.avgPerformance}%</p>
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
              placeholder="Search by metric name or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

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

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[140px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="above">Above Target</SelectItem>
              <SelectItem value="on-target">On Target</SelectItem>
              <SelectItem value="below">Below Target</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
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
      {selectedMetrics.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedMetrics.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedMetrics([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <Target size={14} className="mr-2" />
              Set Targets
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <BarChart3 size={14} className="mr-2" />
              Compare
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Metrics Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredMetrics.map((metric) => {
            const statusConfig = getStatusConfig(metric.status);
            const StatusIcon = statusConfig.icon;
            const progressPercentage = (metric.value / metric.target) * 100;
            
            return (
              <Card key={metric.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs", getCategoryColor(metric.category))}>
                            {getCategoryIcon(metric.category)}
                            <span className="ml-1">{metric.category}</span>
                          </Badge>
                          <Badge className={cn("text-xs", statusConfig.color)}>
                            <StatusIcon size={10} className="mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{metric.name}</h3>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedMetric(metric);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Chart
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Target className="mr-2 h-4 w-4" />
                            Adjust Target
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Current Value */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-black/50">Current</p>
                        <p className="text-2xl font-bold">{metric.value}{metric.unit === '%' ? '%' : ''}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-black/50">Target</p>
                        <p className="text-lg">{metric.target}{metric.unit === '%' ? '%' : ''}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Progress</span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(metric.trend)}
                          <span className={cn("text-xs font-medium", getTrendColor(metric.trend))}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-[#F5EEE9] rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", getProgressColor(metric.value, metric.target, metric.status))}
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="h-12 mb-3 flex items-end justify-between">
                      {metric.historical.slice(-5).map((point, idx) => (
                        <div
                          key={idx}
                          className="w-6 bg-blue-500 rounded-t"
                          style={{ height: `${(point.value / Math.max(...metric.historical.map(p => p.value))) * 40}px` }}
                        />
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {metric.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                      <span>Last updated: {metric.lastUpdated}</span>
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
                      checked={selectedMetrics.length === filteredMetrics.length && filteredMetrics.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Metric</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50 text-right">Current</TableHead>
                  <TableHead className="text-black/50 text-right">Target</TableHead>
                  <TableHead className="text-black/50 text-right">Progress</TableHead>
                  <TableHead className="text-black/50">Change</TableHead>
                  <TableHead className="text-black/50">Trend</TableHead>
                  <TableHead className="text-black/50">Last Updated</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMetrics.map((metric) => {
                  const statusConfig = getStatusConfig(metric.status);
                  const progressPercentage = ((metric.value / metric.target) * 100).toFixed(1);
                  
                  return (
                    <TableRow key={metric.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox 
                          checked={selectedMetrics.includes(metric.id)}
                          onCheckedChange={() => handleSelectMetric(metric.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{metric.name}</TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getCategoryColor(metric.category))}>
                          {metric.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", statusConfig.color)}>
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {metric.value}{metric.unit === '%' ? '%' : ''}
                      </TableCell>
                      <TableCell className="text-right">
                        {metric.target}{metric.unit === '%' ? '%' : ''}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2">
                          <Progress value={progressPercentage} className="w-16 h-2 bg-[#F5EEE9]" />
                          <span className="text-xs">{progressPercentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          "text-xs font-medium",
                          metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        )}>
                          {metric.change}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getTrendIcon(metric.trend)}
                      </TableCell>
                      <TableCell className="text-xs">{metric.lastUpdated}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            setSelectedMetric(metric);
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
                Showing {filteredMetrics.length} of {metrics.length} metrics
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

      {/* Metric Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Performance Metric Details</DialogTitle>
          </DialogHeader>

          {selectedMetric && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="forecast">Forecast</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedMetric.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={cn("text-xs", getCategoryColor(selectedMetric.category))}>
                          {selectedMetric.category}
                        </Badge>
                        <Badge className={cn("text-xs", getStatusConfig(selectedMetric.status).color)}>
                          {getStatusConfig(selectedMetric.status).label}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-black/50">Current Value</p>
                      <p className="text-3xl font-bold">{selectedMetric.value}{selectedMetric.unit === '%' ? '%' : ''}</p>
                    </div>
                  </div>

                  <p className="text-sm text-black/70">{selectedMetric.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Target</p>
                        <p className="text-xl font-bold">{selectedMetric.target}{selectedMetric.unit === '%' ? '%' : ''}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Variance</p>
                        <p className={cn(
                          "text-xl font-bold",
                          selectedMetric.status === 'above' ? 'text-green-600' : 'text-red-600'
                        )}>
                          {((selectedMetric.value - selectedMetric.target) / selectedMetric.target * 100).toFixed(1)}%
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedMetric.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#F5EEE9]">
                        <TableHead className="text-black/50">Period</TableHead>
                        <TableHead className="text-black/50 text-right">Value</TableHead>
                        <TableHead className="text-black/50 text-right">Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedMetric.historical.map((point, idx, arr) => {
                        const prevValue = idx > 0 ? arr[idx - 1].value : point.value;
                        const change = ((point.value - prevValue) / prevValue * 100).toFixed(1);
                        return (
                          <TableRow key={idx} className="border-[#F5EEE9]">
                            <TableCell>{point.date}</TableCell>
                            <TableCell className="text-right font-medium">
                              {point.value}{selectedMetric.unit === '%' ? '%' : ''}
                            </TableCell>
                            <TableCell className="text-right">
                              {idx > 0 ? (
                                <span className={cn(
                                  "text-xs",
                                  change.startsWith('-') ? 'text-red-600' : 'text-green-600'
                                )}>
                                  {change.startsWith('-') ? '' : '+'}{change}%
                                </span>
                              ) : (
                                <span className="text-black/30">—</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Key Insights</p>
                      <ul className="space-y-2">
                        {selectedMetric.insights.map((insight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Lightbulb size={14} className="text-yellow-600 mt-0.5" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Recommendations</p>
                      <ul className="space-y-2">
                        {selectedMetric.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Target size={14} className="text-blue-600 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="forecast" className="space-y-4">
                  <p className="text-sm font-medium">Next 3 Months Forecast</p>
                  <div className="space-y-3">
                    {selectedMetric.forecast.map((point, idx) => (
                      <Card key={idx} className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{point.date}</span>
                            <span className="text-lg font-bold text-blue-600">
                              {point.value}{selectedMetric.unit === '%' ? '%' : ''}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      Forecast based on historical trends and seasonal patterns.
                      Confidence interval: ±5%
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Target className="mr-2 h-4 w-4" />
              Adjust Target
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Set Targets Dialog */}
      <Dialog open={showTargetDialog} onOpenChange={setShowTargetDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Set Performance Targets</DialogTitle>
            <DialogDescription>
              Adjust target values for selected metrics
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Metric</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose metric" />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map(metric => (
                    <SelectItem key={metric.id} value={metric.id}>{metric.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Current Value</Label>
              <Input type="number" placeholder="Current value" readOnly />
            </div>

            <div className="space-y-2">
              <Label>Target Value</Label>
              <Input type="number" placeholder="New target" />
            </div>

            <div className="space-y-2">
              <Label>Target Date</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <RadioGroup defaultValue="medium">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">High Priority</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium Priority</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Low Priority</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Reason for target adjustment" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTargetDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Save Target
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
                onClick={() => setShowDashboardDialog(true)}
              >
                <Gauge size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowTargetDialog(true)}
              >
                <Target size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Set Targets</TooltipContent>
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

export default PerformanceMetricsPage;