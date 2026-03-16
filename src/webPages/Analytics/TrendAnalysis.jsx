// app/dashboard/trend-analysis/page.js
'use client';

import { useState } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Package,
  Target,
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

  Brain,
  Cpu,
  Lightbulb,
  Shirt,
  Apple,
  Pill,
  Factory,

} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TrendAnalysisPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('90d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showForecastDialog, setShowForecastDialog] = useState(false);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [showInsightsDialog, setShowInsightsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTrends, setSelectedTrends] = useState([]);

  // Sample trend analysis data
  const trends = [
    {
      id: 'TREND-001',
      name: 'Electronics Sales Trend',
      category: 'electronics',
      metric: 'sales',
      period: '90d',
      current: 245000,
      previous: 215000,
      change: '+14.0%',
      trend: 'up',
      confidence: 94,
      seasonality: 'high',
      volatility: 'medium',
      insights: [
        'Strong growth in premium headphones',
        'New product launches driving sales',
        'Seasonal peak expected in Q4',
      ],
      recommendations: [
        'Increase inventory for top sellers',
        'Plan marketing campaigns around new releases',
      ],
      dataPoints: [
        { date: '2024-01', value: 75000 },
        { date: '2024-02', value: 72000 },
        { date: '2024-03', value: 78000 },
        { date: '2024-04', value: 81000 },
        { date: '2024-05', value: 85000 },
        { date: '2024-06', value: 82000 },
        { date: '2024-07', value: 88000 },
        { date: '2024-08', value: 92000 },
        { date: '2024-09', value: 95000 },
        { date: '2024-10', value: 98000 },
        { date: '2024-11', value: 102000 },
        { date: '2024-12', value: 110000 },
      ],
      forecast: [
        { date: '2024-01', value: 115000 },
        { date: '2024-02', value: 118000 },
        { date: '2024-03', value: 122000 },
      ],
      tags: ['electronics', 'sales', 'growth'],
    },
    {
      id: 'TREND-002',
      name: 'Furniture Demand Trend',
      category: 'furniture',
      metric: 'demand',
      period: '90d',
      current: 185000,
      previous: 165000,
      change: '+12.1%',
      trend: 'up',
      confidence: 91,
      seasonality: 'high',
      volatility: 'low',
      insights: [
        'Ergonomic chairs showing strong growth',
        'Office furniture demand steady',
        'Home office segment expanding',
      ],
      recommendations: [
        'Expand ergonomic product line',
        'Maintain safety stock for popular items',
      ],
      dataPoints: [
        { date: '2024-01', value: 52000 },
        { date: '2024-02', value: 53000 },
        { date: '2024-03', value: 55000 },
        { date: '2024-04', value: 57000 },
        { date: '2024-05', value: 59000 },
        { date: '2024-06', value: 61000 },
        { date: '2024-07', value: 63000 },
        { date: '2024-08', value: 65000 },
        { date: '2024-09', value: 67000 },
        { date: '2024-10', value: 69000 },
        { date: '2024-11', value: 71000 },
        { date: '2024-12', value: 73000 },
      ],
      forecast: [
        { date: '2024-01', value: 75000 },
        { date: '2024-02', value: 77000 },
        { date: '2024-03', value: 79000 },
      ],
      tags: ['furniture', 'demand', 'stable'],
    },
    {
      id: 'TREND-003',
      name: 'Apparel Sales Trend',
      category: 'apparel',
      metric: 'sales',
      period: '90d',
      current: 165000,
      previous: 148000,
      change: '+11.5%',
      trend: 'up',
      confidence: 89,
      seasonality: 'very high',
      volatility: 'high',
      insights: [
        'Seasonal patterns driving sales',
        'Summer collection performing well',
        'Sportswear segment growing',
      ],
      recommendations: [
        'Plan for seasonal inventory',
        'Increase marketing for new collections',
      ],
      dataPoints: [
        { date: '2024-01', value: 48000 },
        { date: '2024-02', value: 46000 },
        { date: '2024-03', value: 50000 },
        { date: '2024-04', value: 52000 },
        { date: '2024-05', value: 55000 },
        { date: '2024-06', value: 58000 },
        { date: '2024-07', value: 60000 },
        { date: '2024-08', value: 62000 },
        { date: '2024-09', value: 59000 },
        { date: '2024-10', value: 57000 },
        { date: '2024-11', value: 54000 },
        { date: '2024-12', value: 56000 },
      ],
      forecast: [
        { date: '2024-01', value: 58000 },
        { date: '2024-02', value: 60000 },
        { date: '2024-03', value: 62000 },
      ],
      tags: ['apparel', 'sales', 'seasonal'],
    },
    {
      id: 'TREND-004',
      name: 'Food Category Trend',
      category: 'food',
      metric: 'sales',
      period: '90d',
      current: 210000,
      previous: 198000,
      change: '+6.1%',
      trend: 'up',
      confidence: 96,
      seasonality: 'medium',
      volatility: 'low',
      insights: [
        'Steady growth in organic products',
        'Consistent demand for staples',
        'New product introductions successful',
      ],
      recommendations: [
        'Expand organic product line',
        'Optimize inventory levels',
      ],
      dataPoints: [
        { date: '2024-01', value: 65000 },
        { date: '2024-02', value: 66000 },
        { date: '2024-03', value: 68000 },
        { date: '2024-04', value: 69000 },
        { date: '2024-05', value: 70000 },
        { date: '2024-06', value: 72000 },
        { date: '2024-07', value: 73000 },
        { date: '2024-08', value: 74000 },
        { date: '2024-09', value: 75000 },
        { date: '2024-10', value: 76000 },
        { date: '2024-11', value: 77000 },
        { date: '2024-12', value: 78000 },
      ],
      forecast: [
        { date: '2024-01', value: 79000 },
        { date: '2024-02', value: 80000 },
        { date: '2024-03', value: 81000 },
      ],
      tags: ['food', 'stable', 'growth'],
    },
    {
      id: 'TREND-005',
      name: 'Medical Supplies Trend',
      category: 'medical',
      metric: 'demand',
      period: '90d',
      current: 125000,
      previous: 132000,
      change: '-5.3%',
      trend: 'down',
      confidence: 88,
      seasonality: 'low',
      volatility: 'medium',
      insights: [
        'Post-pandemic demand normalization',
        'PPE orders decreasing',
        'Core medical supplies stable',
      ],
      recommendations: [
        'Adjust inventory levels for PPE',
        'Focus on core medical products',
      ],
      dataPoints: [
        { date: '2024-01', value: 44000 },
        { date: '2024-02', value: 43000 },
        { date: '2024-03', value: 42000 },
        { date: '2024-04', value: 41000 },
        { date: '2024-05', value: 40000 },
        { date: '2024-06', value: 39000 },
        { date: '2024-07', value: 38000 },
        { date: '2024-08', value: 37000 },
        { date: '2024-09', value: 36000 },
        { date: '2024-10', value: 35000 },
        { date: '2024-11', value: 34000 },
        { date: '2024-12', value: 33000 },
      ],
      forecast: [
        { date: '2024-01', value: 32000 },
        { date: '2024-02', value: 31000 },
        { date: '2024-03', value: 30000 },
      ],
      tags: ['medical', 'declining', 'ppe'],
    },
    {
      id: 'TREND-006',
      name: 'Industrial Products Trend',
      category: 'industrial',
      metric: 'sales',
      period: '90d',
      current: 175000,
      previous: 168000,
      change: '+4.2%',
      trend: 'up',
      confidence: 92,
      seasonality: 'low',
      volatility: 'low',
      insights: [
        'Steady industrial growth',
        'Maintenance supplies increasing',
        'Tool demand consistent',
      ],
      recommendations: [
        'Maintain stable inventory',
        'Monitor supply chain for raw materials',
      ],
      dataPoints: [
        { date: '2024-01', value: 54000 },
        { date: '2024-02', value: 55000 },
        { date: '2024-03', value: 56000 },
        { date: '2024-04', value: 57000 },
        { date: '2024-05', value: 58000 },
        { date: '2024-06', value: 59000 },
        { date: '2024-07', value: 60000 },
        { date: '2024-08', value: 61000 },
        { date: '2024-09', value: 62000 },
        { date: '2024-10', value: 63000 },
        { date: '2024-11', value: 64000 },
        { date: '2024-12', value: 65000 },
      ],
      forecast: [
        { date: '2024-01', value: 66000 },
        { date: '2024-02', value: 67000 },
        { date: '2024-03', value: 68000 },
      ],
      tags: ['industrial', 'stable', 'growth'],
    },
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Categories', count: trends.length },
    { id: 'electronics', name: 'Electronics', count: trends.filter(t => t.category === 'electronics').length },
    { id: 'furniture', name: 'Furniture', count: trends.filter(t => t.category === 'furniture').length },
    { id: 'apparel', name: 'Apparel', count: trends.filter(t => t.category === 'apparel').length },
    { id: 'food', name: 'Food', count: trends.filter(t => t.category === 'food').length },
    { id: 'medical', name: 'Medical', count: trends.filter(t => t.category === 'medical').length },
    { id: 'industrial', name: 'Industrial', count: trends.filter(t => t.category === 'industrial').length },
  ];

  // Metrics
  const metrics = [
    { id: 'sales', name: 'Sales' },
    { id: 'demand', name: 'Demand' },
    { id: 'inventory', name: 'Inventory' },
    { id: 'orders', name: 'Orders' },
  ];

  // Time ranges
  const timeRanges = [
    { value: '30d', label: '30 Days' },
    { value: '60d', label: '60 Days' },
    { value: '90d', label: '90 Days' },
    { value: '180d', label: '6 Months' },
    { value: '365d', label: '1 Year' },
    { value: '3y', label: '3 Years' },
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return <TrendingUp size={16} className="text-green-600" />;
    } else if (trend === 'down') {
      return <TrendingDown size={16} className="text-red-600" />;
    }
    return null;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 80) return 'bg-blue-500';
    if (confidence >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'electronics': return <Cpu size={14} className="text-blue-600" />;
      case 'furniture': return <Armchair size={14} className="text-orange-600" />;
      case 'apparel': return <Shirt size={14} className="text-purple-600" />;
      case 'food': return <Apple size={14} className="text-green-600" />;
      case 'medical': return <Pill size={14} className="text-red-600" />;
      case 'industrial': return <Factory size={14} className="text-gray-600" />;
      default: return <Package size={14} className="text-gray-600" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'electronics': return 'bg-blue-100 text-blue-700';
      case 'furniture': return 'bg-orange-100 text-orange-700';
      case 'apparel': return 'bg-purple-100 text-purple-700';
      case 'food': return 'bg-green-100 text-green-700';
      case 'medical': return 'bg-red-100 text-red-700';
      case 'industrial': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTrends = trends.filter(trend => {
    const matchesCategory = selectedCategory === 'all' || trend.category === selectedCategory;
    const matchesMetric = selectedMetric === 'all' || trend.metric === selectedMetric;
    const matchesSearch = trend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trend.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trend.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesMetric && matchesSearch;
  });

  const stats = {
    total: trends.length,
    up: trends.filter(t => t.trend === 'up').length,
    down: trends.filter(t => t.trend === 'down').length,
    avgConfidence: Math.round(trends.reduce((sum, t) => sum + t.confidence, 0) / trends.length),
    totalCurrent: trends.reduce((sum, t) => sum + t.current, 0),
    totalPrevious: trends.reduce((sum, t) => sum + t.previous, 0),
  };

  const handleSelectAll = () => {
    if (selectedTrends.length === filteredTrends.length) {
      setSelectedTrends([]);
    } else {
      setSelectedTrends(filteredTrends.map(t => t.id));
    }
  };

  const handleSelectTrend = (id) => {
    if (selectedTrends.includes(id)) {
      setSelectedTrends(selectedTrends.filter(t => t !== id));
    } else {
      setSelectedTrends([...selectedTrends, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Trend Analysis</h1>
            <p className="text-black/50 mt-1">Analyze sales and demand trends across categories</p>
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
              onClick={() => setShowForecastDialog(true)}
            >
              <Brain size={16} />
              Forecast
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowInsightsDialog(true)}
            >
              <Lightbulb size={16} />
              Insights
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Trends</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <TrendingUp size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Upward Trends</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.up}</p>
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
                  <p className="text-xs text-black/50">Downward Trends</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.down}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <TrendingDown size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Confidence</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.avgConfidence}%</p>
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
                  <p className="text-xs text-black/50">Total Change</p>
                  <p className="text-xl font-bold text-green-600 mt-1">
                    +{(((stats.totalCurrent - stats.totalPrevious) / stats.totalPrevious) * 100).toFixed(1)}%
                  </p>
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
              placeholder="Search by name, category, or tags..."
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

          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metrics</SelectItem>
              {metrics.map(metric => (
                <SelectItem key={metric.id} value={metric.id}>{metric.name}</SelectItem>
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
      {selectedTrends.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedTrends.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedTrends([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <BarChart3 size={14} className="mr-2" />
              Compare
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Brain size={14} className="mr-2" />
              Forecast
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Trends Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredTrends.map((trend) => (
            <Card key={trend.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={cn("text-xs", getCategoryColor(trend.category))}>
                          {getCategoryIcon(trend.category)}
                          <span className="ml-1">{trend.category}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {trend.metric}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-black">{trend.name}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedTrend(trend);
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
                          <Brain className="mr-2 h-4 w-4" />
                          Generate Forecast
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
                  {/* Current vs Previous */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-black/50">Current</p>
                      <p className="text-lg font-bold">${trend.current.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-black/50">Previous</p>
                      <p className="text-lg font-bold">${trend.previous.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Change Indicator */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {getTrendIcon(trend.trend)}
                    <span className={cn("text-lg font-bold", getTrendColor(trend.trend))}>
                      {trend.change}
                    </span>
                  </div>

                  {/* Mini Chart */}
                  <div className="h-12 mb-3 flex items-end justify-between">
                    {trend.dataPoints.slice(-7).map((point, idx) => (
                      <div
                        key={idx}
                        className="w-6 bg-blue-500 rounded-t"
                        style={{ height: `${(point.value / Math.max(...trend.dataPoints.slice(-7).map(p => p.value))) * 40}px` }}
                      />
                    ))}
                  </div>

                  {/* Confidence & Volatility */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-[8px] text-black/50">Confidence</p>
                      <div className="flex items-center gap-1">
                        <div className={cn("w-2 h-2 rounded-full", getConfidenceColor(trend.confidence))} />
                        <span className="text-xs font-medium">{trend.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] text-black/50">Volatility</p>
                      <span className="text-xs capitalize">{trend.volatility}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {trend.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                    <span>Seasonality: {trend.seasonality}</span>
                    <span>{trend.period}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-[#F5EEE9]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                  <TableHead className="w-8">
                    <Checkbox 
                      checked={selectedTrends.length === filteredTrends.length && filteredTrends.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Trend Name</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Metric</TableHead>
                  <TableHead className="text-black/50 text-right">Current</TableHead>
                  <TableHead className="text-black/50 text-right">Previous</TableHead>
                  <TableHead className="text-black/50">Change</TableHead>
                  <TableHead className="text-black/50">Confidence</TableHead>
                  <TableHead className="text-black/50">Volatility</TableHead>
                  <TableHead className="text-black/50">Seasonality</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrends.map((trend) => (
                  <TableRow key={trend.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedTrends.includes(trend.id)}
                        onCheckedChange={() => handleSelectTrend(trend.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{trend.name}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getCategoryColor(trend.category))}>
                        {trend.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{trend.metric}</TableCell>
                    <TableCell className="text-right">${trend.current.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${trend.previous.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(trend.trend)}
                        <span className={cn("text-xs font-medium", getTrendColor(trend.trend))}>
                          {trend.change}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", getConfidenceColor(trend.confidence))} />
                        <span className="text-xs">{trend.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{trend.volatility}</TableCell>
                    <TableCell className="capitalize">{trend.seasonality}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedTrend(trend);
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
                Showing {filteredTrends.length} of {trends.length} trends
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

      {/* Trend Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Trend Analysis Details</DialogTitle>
          </DialogHeader>

          {selectedTrend && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="forecast">Forecast</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedTrend.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={cn("text-xs", getCategoryColor(selectedTrend.category))}>
                          {selectedTrend.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {selectedTrend.metric}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(selectedTrend.trend)}
                      <span className={cn("text-lg font-bold", getTrendColor(selectedTrend.trend))}>
                        {selectedTrend.change}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Current Period</p>
                        <p className="text-xl font-bold">${selectedTrend.current.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Previous Period</p>
                        <p className="text-xl font-bold">${selectedTrend.previous.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-black/50">Confidence</p>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", getConfidenceColor(selectedTrend.confidence))} />
                        <span className="text-sm font-medium">{selectedTrend.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Volatility</p>
                      <span className="text-sm capitalize">{selectedTrend.volatility}</span>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Seasonality</p>
                      <span className="text-sm capitalize">{selectedTrend.seasonality}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTrend.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="data" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#F5EEE9]">
                        <TableHead className="text-black/50">Date</TableHead>
                        <TableHead className="text-black/50 text-right">Value</TableHead>
                        <TableHead className="text-black/50 text-right">Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTrend.dataPoints.map((point, idx, arr) => {
                        const prevValue = idx > 0 ? arr[idx - 1].value : point.value;
                        const change = ((point.value - prevValue) / prevValue * 100).toFixed(1);
                        return (
                          <TableRow key={idx} className="border-[#F5EEE9]">
                            <TableCell>{point.date}</TableCell>
                            <TableCell className="text-right font-medium">${point.value.toLocaleString()}</TableCell>
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
                        {selectedTrend.insights.map((insight, idx) => (
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
                        {selectedTrend.recommendations.map((rec, idx) => (
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
                    {selectedTrend.forecast.map((point, idx) => (
                      <Card key={idx} className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{point.date}</span>
                            <span className="text-lg font-bold text-blue-600">${point.value.toLocaleString()}</span>
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
              <Brain className="mr-2 h-4 w-4" />
              Generate Forecast
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Forecast Dialog */}
      <Dialog open={showForecastDialog} onOpenChange={setShowForecastDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Forecast</DialogTitle>
            <DialogDescription>
              Create AI-powered forecast based on trend analysis
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Forecast Model</Label>
              <Select defaultValue="ensemble">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ensemble">Ensemble (Recommended)</SelectItem>
                  <SelectItem value="arima">ARIMA</SelectItem>
                  <SelectItem value="prophet">Prophet</SelectItem>
                  <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Forecast Period</Label>
              <RadioGroup defaultValue="90d">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="30d" id="30d" />
                  <Label htmlFor="30d">30 Days</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="60d" id="60d" />
                  <Label htmlFor="60d">60 Days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="90d" id="90d" />
                  <Label htmlFor="90d">90 Days</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Include Seasonality</Label>
              <div className="flex items-center space-x-2">
                <Switch id="seasonality" defaultChecked />
                <Label htmlFor="seasonality">Adjust for seasonal patterns</Label>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                This will generate forecasts for all selected trends using historical data and machine learning models.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForecastDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Brain className="mr-2 h-4 w-4" />
              Generate Forecast
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
                onClick={() => setShowForecastDialog(true)}
              >
                <Brain size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Generate Forecast</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowInsightsDialog(true)}
              >
                <Lightbulb size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">AI Insights</TooltipContent>
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

export default TrendAnalysisPage;