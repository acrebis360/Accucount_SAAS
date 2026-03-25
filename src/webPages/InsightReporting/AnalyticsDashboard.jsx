// app/dashboard/analytics-dashboard/page.js
'use client';

import { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  DollarSign,
  Users,
  Boxes,
  Activity,
  PieChart,
  LineChart,
  Download,
  RefreshCw,
  Filter,
  MoreVertical,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Percent,
  Award,
  FileText,
  MapPin,
  Layers,
  CalendarDays,
  Timer,
  Shield,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Maximize2,
  Minimize2,
  Settings,
  Share2,
  Printer,
  Mail,
  ExternalLink,
  Star,
  StarOff,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart,

} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  AreaChart as ReAreaChart,
  Area,
  BarChart as ReBarChart,
  Bar,
  LineChart as ReLineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadialBarChart,
  RadialBar,
  Treemap,
} from 'recharts';

const AnalyticsDashboardPage = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('accuracy');
  const [chartView, setChartView] = useState('trend');
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  // Mock Analytics Data
  const stocktakeTrendData = [
    { month: 'Jan', completed: 12, accuracy: 98.2, discrepancies: 45, value: 1250000, items: 12450 },
    { month: 'Feb', completed: 15, accuracy: 98.5, discrepancies: 52, value: 1320000, items: 13100 },
    { month: 'Mar', completed: 18, accuracy: 98.8, discrepancies: 48, value: 1450000, items: 14200 },
    { month: 'Apr', completed: 20, accuracy: 99.0, discrepancies: 55, value: 1520000, items: 14800 },
    { month: 'May', completed: 22, accuracy: 99.1, discrepancies: 42, value: 1680000, items: 16200 },
    { month: 'Jun', completed: 25, accuracy: 99.3, discrepancies: 38, value: 1750000, items: 17100 },
    { month: 'Jul', completed: 28, accuracy: 99.4, discrepancies: 35, value: 1890000, items: 18400 },
    { month: 'Aug', completed: 30, accuracy: 99.5, discrepancies: 32, value: 1980000, items: 19200 },
    { month: 'Sep', completed: 32, accuracy: 99.6, discrepancies: 28, value: 2120000, items: 20600 },
    { month: 'Oct', completed: 35, accuracy: 99.7, discrepancies: 25, value: 2250000, items: 21900 },
    { month: 'Nov', completed: 38, accuracy: 99.8, discrepancies: 22, value: 2410000, items: 23400 },
    { month: 'Dec', completed: 42, accuracy: 99.9, discrepancies: 18, value: 2580000, items: 25100 },
  ];

  const locationPerformanceData = [
    { name: 'Warehouse A', accuracy: 99.2, efficiency: 94, value: 1250000, items: 12450, discrepancies: 8 },
    { name: 'Warehouse B', accuracy: 98.8, efficiency: 92, value: 980000, items: 9850, discrepancies: 12 },
    { name: 'Warehouse C', accuracy: 99.5, efficiency: 96, value: 1450000, items: 14200, discrepancies: 5 },
    { name: 'Store A', accuracy: 98.5, efficiency: 88, value: 450000, items: 4520, discrepancies: 7 },
    { name: 'Store B', accuracy: 98.2, efficiency: 85, value: 320000, items: 3280, discrepancies: 6 },
    { name: 'Cold Storage', accuracy: 99.1, efficiency: 91, value: 680000, items: 6850, discrepancies: 4 },
  ];

  const categoryDistributionData = [
    { name: 'Electronics', value: 35, count: 4350, accuracy: 99.3, color: '#ef4444' },
    { name: 'Furniture', value: 20, count: 2480, accuracy: 98.7, color: '#f97316' },
    { name: 'Apparel', value: 18, count: 2230, accuracy: 98.9, color: '#eab308' },
    { name: 'Food', value: 15, count: 1860, accuracy: 99.5, color: '#22c55e' },
    { name: 'Medical', value: 7, count: 870, accuracy: 99.8, color: '#06b6d4' },
    { name: 'Others', value: 5, count: 620, accuracy: 98.5, color: '#8b5cf6' },
  ];

  const teamPerformanceData = [
    { name: 'Team Alpha', completed: 45, accuracy: 99.2, efficiency: 94, itemsCounted: 12500 },
    { name: 'Team Beta', completed: 38, accuracy: 98.8, efficiency: 91, itemsCounted: 10800 },
    { name: 'Team Gamma', completed: 52, accuracy: 99.5, efficiency: 96, itemsCounted: 14200 },
    { name: 'Team Delta', completed: 32, accuracy: 98.5, efficiency: 88, itemsCounted: 8900 },
    { name: 'Team Epsilon', completed: 28, accuracy: 99.1, efficiency: 92, itemsCounted: 7800 },
  ];

  const discrepancyTrendData = [
    { week: 'Week 1', total: 24, resolved: 20, pending: 4, value: 12500 },
    { week: 'Week 2', total: 28, resolved: 24, pending: 4, value: 14200 },
    { week: 'Week 3', total: 22, resolved: 20, pending: 2, value: 11800 },
    { week: 'Week 4', total: 18, resolved: 17, pending: 1, value: 9500 },
    { week: 'Week 5', total: 15, resolved: 14, pending: 1, value: 8200 },
    { week: 'Week 6', total: 12, resolved: 12, pending: 0, value: 6500 },
  ];

  const forecastData = [
    { month: 'Jan', forecast: 12500, actual: 12450, lower: 12000, upper: 13000 },
    { month: 'Feb', forecast: 13200, actual: 13100, lower: 12700, upper: 13700 },
    { month: 'Mar', forecast: 14000, actual: 14200, lower: 13500, upper: 14500 },
    { month: 'Apr', forecast: 14800, actual: 14800, lower: 14300, upper: 15300 },
    { month: 'May', forecast: 15500, actual: 16200, lower: 15000, upper: 16000 },
    { month: 'Jun', forecast: 16300, actual: 17100, lower: 15800, upper: 16800 },
    { month: 'Jul', forecast: 17200, actual: 18400, lower: 16700, upper: 17700 },
    { month: 'Aug', forecast: 18200, actual: 19200, lower: 17700, upper: 18700 },
    { month: 'Sep', forecast: 19300, actual: 20600, lower: 18800, upper: 19800 },
    { month: 'Oct', forecast: 20500, actual: 21900, lower: 20000, upper: 21000 },
    { month: 'Nov', forecast: 21800, actual: 23400, lower: 21300, upper: 22300 },
    { month: 'Dec', forecast: 23200, actual: 25100, lower: 22700, upper: 23700 },
  ];

  const efficiencyMetrics = {
    overallAccuracy: 99.2,
    accuracyTrend: '+1.8',
    avgStocktakeTime: 2.4,
    timeTrend: '-0.3',
    itemsPerHour: 425,
    itemsTrend: '+12',
    discrepancyResolution: 92,
    resolutionTrend: '+5.5',
    teamUtilization: 87,
    utilizationTrend: '+3.2',
  };

  const kpis = {
    totalStocktakes: 142,
    stocktakeGrowth: '+18.5',
    totalItemsCounted: 38420,
    itemsGrowth: '+12.3',
    totalValue: 2580000,
    valueGrowth: '+15.2',
    avgAccuracy: 99.2,
    accuracyGrowth: '+1.8',
    totalDiscrepancies: 18,
    discrepancyReduction: '-23.5',
    activeUsers: 156,
    userGrowth: '+8.5',
  };

  // Filtered data based on date range
  const filteredTrendData = useMemo(() => {
    const monthMap = { week: 4, month: 12, quarter: 3, year: 12 };
    const limit = monthMap[dateRange] || 12;
    return stocktakeTrendData.slice(-limit);
  }, [dateRange]);

  // Statistics calculations
  const statistics = useMemo(() => {
    const totalItems = locationPerformanceData.reduce((sum, l) => sum + l.items, 0);
    const totalValue = locationPerformanceData.reduce((sum, l) => sum + l.value, 0);
    const avgAccuracy = locationPerformanceData.reduce((sum, l) => sum + l.accuracy, 0) / locationPerformanceData.length;
    const totalDiscrepancies = locationPerformanceData.reduce((sum, l) => sum + l.discrepancies, 0);
    
    return {
      totalItems,
      totalValue,
      avgAccuracy: avgAccuracy.toFixed(1),
      totalDiscrepancies,
      bestLocation: locationPerformanceData.reduce((best, l) => l.accuracy > best.accuracy ? l : best, locationPerformanceData[0]),
      worstLocation: locationPerformanceData.reduce((worst, l) => l.accuracy < worst.accuracy ? l : worst, locationPerformanceData[0]),
    };
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const getTrendIcon = (trend) => {
    const isPositive = parseFloat(trend) > 0;
    return isPositive ? 
      <TrendingUp size={14} className="text-green-600" /> : 
      <TrendingDown size={14} className="text-red-600" />;
  };

  const getTrendColor = (trend) => {
    const isPositive = parseFloat(trend) > 0;
    return isPositive ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Analytics Dashboard</h1>
            <p className="text-black/50 text-sm mt-1">
              Comprehensive insights and performance metrics for your inventory operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px] border-[#F5EEE9]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 4 Weeks</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-[150px] border-[#F5EEE9]">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="wh-a">Warehouse A</SelectItem>
                  <SelectItem value="wh-b">Warehouse B</SelectItem>
                  <SelectItem value="wh-c">Warehouse C</SelectItem>
                  <SelectItem value="store-a">Store A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="border-[#F5EEE9]"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw size={18} className={cn(isLoading && "animate-spin")} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-[#F5EEE9] gap-2">
                  <Download size={16} />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
                  <FileText size={14} className="mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart3 size={14} className="mr-2" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download size={14} className="mr-2" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowShareDialog(true)}>
                  <Share2 size={14} className="mr-2" />
                  Share Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-6 gap-4">
          <Card className="border-[#F5EEE9] hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Stocktakes</p>
                  <p className="text-2xl font-bold text-black">{kpis.totalStocktakes}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(kpis.stocktakeGrowth)}
                    <span className={cn("text-xs", getTrendColor(kpis.stocktakeGrowth))}>
                      {kpis.stocktakeGrowth}%
                    </span>
                    <span className="text-xs text-black/40">vs last year</span>
                  </div>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <ClipboardList size={24} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9] hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Items Counted</p>
                  <p className="text-2xl font-bold text-black">{kpis.totalItemsCounted.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(kpis.itemsGrowth)}
                    <span className={cn("text-xs", getTrendColor(kpis.itemsGrowth))}>
                      {kpis.itemsGrowth}%
                    </span>
                    <span className="text-xs text-black/40">growth</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Package size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9] hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Inventory Value</p>
                  <p className="text-2xl font-bold text-green-600">${(kpis.totalValue / 1000000).toFixed(1)}M</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(kpis.valueGrowth)}
                    <span className={cn("text-xs", getTrendColor(kpis.valueGrowth))}>
                      {kpis.valueGrowth}%
                    </span>
                    <span className="text-xs text-black/40">increase</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <DollarSign size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9] hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg. Accuracy</p>
                  <p className="text-2xl font-bold text-emerald-600">{kpis.avgAccuracy}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(kpis.accuracyGrowth)}
                    <span className={cn("text-xs", getTrendColor(kpis.accuracyGrowth))}>
                      {kpis.accuracyGrowth}%
                    </span>
                    <span className="text-xs text-black/40">improvement</span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-full">
                  <Target size={24} className="text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9] hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Discrepancies</p>
                  <p className="text-2xl font-bold text-orange-600">{kpis.totalDiscrepancies}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(kpis.discrepancyReduction)}
                    <span className={cn("text-xs", getTrendColor(kpis.discrepancyReduction))}>
                      {kpis.discrepancyReduction}%
                    </span>
                    <span className="text-xs text-black/40">reduction</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-50 rounded-full">
                  <AlertTriangle size={24} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9] hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Users</p>
                  <p className="text-2xl font-bold text-purple-600">{kpis.activeUsers}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(kpis.userGrowth)}
                    <span className={cn("text-xs", getTrendColor(kpis.userGrowth))}>
                      {kpis.userGrowth}%
                    </span>
                    <span className="text-xs text-black/40">this month</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <Users size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Stocktake Trend Chart */}
          <Card className="border-[#F5EEE9] col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Stocktake Performance Trend</CardTitle>
                  <CardDescription>Monthly completed stocktakes and accuracy metrics</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("h-8", chartView === 'trend' && "bg-red-50 text-red-600")}
                    onClick={() => setChartView('trend')}
                  >
                    <LineChart size={14} className="mr-1" />
                    Trend
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("h-8", chartView === 'bar' && "bg-red-50 text-red-600")}
                    onClick={() => setChartView('bar')}
                  >
                    <BarChart size={14} className="mr-1" />
                    Bar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                {chartView === 'trend' ? (
                  <ComposedChart data={filteredTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888888" />
                    <YAxis yAxisId="left" stroke="#888888" />
                    <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                    <ReTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="completed" fill="#ef4444" name="Stocktakes" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} name="Accuracy %" dot={{ fill: '#22c55e', r: 4 }} />
                  </ComposedChart>
                ) : (
                  <ReBarChart data={filteredTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <ReTooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#ef4444" name="Stocktakes" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="discrepancies" fill="#eab308" name="Discrepancies" radius={[4, 4, 0, 0]} />
                  </ReBarChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Inventory Distribution</CardTitle>
              <CardDescription>By product category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RePieChart>
                  <Pie
                    data={categoryDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ReTooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {categoryDistributionData.map((item) => (
                  <TooltipProvider key={item.name}>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center gap-1 cursor-help">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-xs text-black/70">{item.name}</span>
                          <span className="text-xs font-medium">{item.value}%</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs">
                          <p>Items: {item.count.toLocaleString()}</p>
                          <p>Accuracy: {item.accuracy}%</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row - Performance Metrics */}
        <div className="grid grid-cols-3 gap-6">
          {/* Location Performance */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Location Performance</CardTitle>
              <CardDescription>Accuracy and efficiency by location</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <ReBarChart data={locationPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" domain={[80, 100]} stroke="#888888" />
                  <YAxis type="category" dataKey="name" stroke="#888888" width={100} />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#ef4444" name="Accuracy %" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="efficiency" fill="#22c55e" name="Efficiency %" radius={[0, 4, 4, 0]} />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Team Performance Radar Chart */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Team Performance</CardTitle>
              <CardDescription>Multi-metric team comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={teamPerformanceData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Accuracy" dataKey="accuracy" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                  <Radar name="Efficiency" dataKey="efficiency" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                  <Legend />
                  <ReTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Discrepancy Resolution Trend */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Discrepancy Resolution</CardTitle>
              <CardDescription>Weekly resolution trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <ReBarChart data={discrepancyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="total" stackId="a" fill="#ef4444" name="Total" />
                  <Bar dataKey="resolved" stackId="a" fill="#22c55e" name="Resolved" />
                  <Bar dataKey="pending" stackId="a" fill="#eab308" name="Pending" />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Third Row - Forecast and Efficiency Metrics */}
        <div className="grid grid-cols-2 gap-6">
          {/* Forecast Chart */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Inventory Forecast</CardTitle>
                  <CardDescription>Actual vs forecasted items with confidence bands</CardDescription>
                </div>
                <Badge className="bg-blue-100 text-blue-700">AI Powered</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <ReTooltip />
                  <Legend />
                  <Area type="monotone" dataKey="upper" fill="#fecaca" stroke="#ef4444" fillOpacity={0.3} name="Upper Bound" />
                  <Area type="monotone" dataKey="lower" fill="#fee2e2" stroke="#f97316" fillOpacity={0.3} name="Lower Bound" />
                  <Line type="monotone" dataKey="forecast" stroke="#eab308" strokeWidth={2} name="Forecast" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={2} name="Actual" dot={{ fill: '#ef4444', r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Efficiency Metrics Grid */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Operational Efficiency</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#F5EEE9] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-black/50">Overall Accuracy</span>
                    <Target size={14} className="text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-black">{efficiencyMetrics.overallAccuracy}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(efficiencyMetrics.accuracyTrend)}
                    <span className={cn("text-xs", getTrendColor(efficiencyMetrics.accuracyTrend))}>
                      {efficiencyMetrics.accuracyTrend}%
                    </span>
                  </div>
                  <Progress value={efficiencyMetrics.overallAccuracy} className="h-1.5 mt-2" />
                </div>

                <div className="p-3 bg-[#F5EEE9] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-black/50">Avg. Stocktake Time</span>
                    <Timer size={14} className="text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-black">{efficiencyMetrics.avgStocktakeTime} hrs</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(efficiencyMetrics.timeTrend)}
                    <span className={cn("text-xs", getTrendColor(efficiencyMetrics.timeTrend))}>
                      {Math.abs(efficiencyMetrics.timeTrend)} hrs
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#F5EEE9] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-black/50">Items per Hour</span>
                    <Zap size={14} className="text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-black">{efficiencyMetrics.itemsPerHour}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(efficiencyMetrics.itemsTrend)}
                    <span className={cn("text-xs", getTrendColor(efficiencyMetrics.itemsTrend))}>
                      +{efficiencyMetrics.itemsTrend}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#F5EEE9] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-black/50">Resolution Rate</span>
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{efficiencyMetrics.discrepancyResolution}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(efficiencyMetrics.resolutionTrend)}
                    <span className={cn("text-xs", getTrendColor(efficiencyMetrics.resolutionTrend))}>
                      {efficiencyMetrics.resolutionTrend}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats Section */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-full">
                  <Award size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-black/50">Best Performing Location</p>
                  <p className="font-semibold text-black">{statistics.bestLocation.name}</p>
                  <p className="text-xs text-green-600">{statistics.bestLocation.accuracy}% accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-full">
                  <AlertCircle size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-black/50">Needs Improvement</p>
                  <p className="font-semibold text-black">{statistics.worstLocation.name}</p>
                  <p className="text-xs text-orange-600">{statistics.worstLocation.accuracy}% accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Layers size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-black/50">Total Items Tracked</p>
                  <p className="font-semibold text-black">{statistics.totalItems.toLocaleString()}</p>
                  <p className="text-xs text-black/50">across all locations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-full">
                  <Shield size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-black/50">Data Confidence Score</p>
                  <p className="font-semibold text-green-600">98.5%</p>
                  <p className="text-xs text-black/50">based on accuracy trends</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Summary */}
        <Card className="border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <Zap size={20} className="text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-black mb-1">Key Insights</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-black/50">📈 Accuracy is trending up by <span className="text-green-600 font-medium">1.8%</span> this quarter</p>
                  </div>
                  <div>
                    <p className="text-black/50">🎯 Warehouse C is the top performer with <span className="text-green-600 font-medium">99.5%</span> accuracy</p>
                  </div>
                  <div>
                    <p className="text-black/50">⚠️ Electronics category has the highest discrepancy rate at <span className="text-orange-600 font-medium">0.7%</span></p>
                  </div>
                  <div>
                    <p className="text-black/50">⚡ Team Gamma is the most efficient with <span className="text-green-600 font-medium">96%</span> efficiency</p>
                  </div>
                  <div>
                    <p className="text-black/50">📊 December shows peak performance with <span className="text-green-600 font-medium">42</span> completed stocktakes</p>
                  </div>
                  <div>
                    <p className="text-black/50">🎉 Discrepancy resolution rate improved by <span className="text-green-600 font-medium">23.5%</span></p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-red-600">
                View All Insights
                <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Export Analytics Data</DialogTitle>
            <DialogDescription>
              Choose format and data range for export
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Data Range</Label>
              <Select defaultValue="month">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 4 Weeks</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Include Charts</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="include-charts" defaultChecked />
                  <Label htmlFor="include-charts">Yes</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Download size={14} className="mr-2" />
              Export Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Share Dashboard</DialogTitle>
            <DialogDescription>
              Share analytics dashboard with team members
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Share via Email</Label>
              <Input placeholder="Enter email addresses (comma separated)" />
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
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">Recipients will receive a secure link to view this dashboard</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Mail size={14} className="mr-2" />
              Share Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnalyticsDashboardPage;