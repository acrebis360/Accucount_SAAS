// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import {
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
  BarChart3,
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
  Truck,
  Warehouse,
  Scan,
  Bell,
  Settings,
  ChevronRight,
  CalendarDays,
  Timer,
  Target,
  Percent,
  Award,
  FileText,
  MapPin,
  Layers,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  AreaChart, 
  Area, 
  BarChart, 
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
  RadialBarChart,
  RadialBar,
  ComposedChart,
  Scatter,
  Treemap
} from 'recharts';

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState('week');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for charts
  const inventoryTrendData = [
    { date: 'Dec 15', count: 12450, value: 245000, accuracy: 98.5 },
    { date: 'Dec 16', count: 12480, value: 247500, accuracy: 98.7 },
    { date: 'Dec 17', count: 12520, value: 249000, accuracy: 99.0 },
    { date: 'Dec 18', count: 12560, value: 251000, accuracy: 99.2 },
    { date: 'Dec 19', count: 12580, value: 252500, accuracy: 99.4 },
    { date: 'Dec 20', count: 12600, value: 254000, accuracy: 99.5 },
    { date: 'Dec 21', count: 12650, value: 256000, accuracy: 99.6 },
  ];

  const stocktakePerformanceData = [
    { name: 'Jan', completed: 12, accuracy: 98.2, discrepancies: 45 },
    { name: 'Feb', completed: 15, accuracy: 98.5, discrepancies: 52 },
    { name: 'Mar', completed: 18, accuracy: 98.8, discrepancies: 48 },
    { name: 'Apr', completed: 20, accuracy: 99.0, discrepancies: 55 },
    { name: 'May', completed: 22, accuracy: 99.1, discrepancies: 42 },
    { name: 'Jun', completed: 25, accuracy: 99.3, discrepancies: 38 },
    { name: 'Jul', completed: 28, accuracy: 99.4, discrepancies: 35 },
    { name: 'Aug', completed: 30, accuracy: 99.5, discrepancies: 32 },
    { name: 'Sep', completed: 32, accuracy: 99.6, discrepancies: 28 },
    { name: 'Oct', completed: 35, accuracy: 99.7, discrepancies: 25 },
    { name: 'Nov', completed: 38, accuracy: 99.8, discrepancies: 22 },
    { name: 'Dec', completed: 42, accuracy: 99.9, discrepancies: 18 },
  ];

  const inventoryDistributionData = [
    { name: 'Electronics', value: 35, color: '#ef4444', count: 4350 },
    { name: 'Furniture', value: 20, color: '#f97316', count: 2480 },
    { name: 'Apparel', value: 18, color: '#eab308', count: 2230 },
    { name: 'Food', value: 15, color: '#22c55e', count: 1860 },
    { name: 'Medical', value: 7, color: '#06b6d4', count: 870 },
    { name: 'Others', value: 5, color: '#8b5cf6', count: 620 },
  ];

  const locationPerformanceData = [
    { name: 'Warehouse A', count: 4250, accuracy: 99.2, efficiency: 94, value: 125000 },
    { name: 'Warehouse B', count: 3850, accuracy: 98.8, efficiency: 92, value: 98000 },
    { name: 'Warehouse C', count: 2950, accuracy: 99.5, efficiency: 96, value: 76000 },
    { name: 'Store A', count: 1850, accuracy: 98.5, efficiency: 88, value: 45000 },
    { name: 'Store B', count: 1450, accuracy: 98.2, efficiency: 85, value: 32000 },
    { name: 'Cold Storage', count: 890, accuracy: 99.1, efficiency: 91, value: 28000 },
  ];

  const discrepancyTrendData = [
    { date: 'Week 1', count: 24, resolved: 20, pending: 4 },
    { date: 'Week 2', count: 28, resolved: 24, pending: 4 },
    { date: 'Week 3', count: 22, resolved: 20, pending: 2 },
    { date: 'Week 4', count: 18, resolved: 17, pending: 1 },
    { date: 'Week 5', count: 15, resolved: 14, pending: 1 },
    { date: 'Week 6', count: 12, resolved: 12, pending: 0 },
  ];

  const recentStocktakes = [
    { id: 'ST-2024-001', name: 'Year-End Physical Count', date: '2024-12-15', status: 'completed', accuracy: 99.3, items: 12450, location: 'Main Warehouse' },
    { id: 'ST-2024-002', name: 'Zone A - Electronics', date: '2024-12-10', status: 'completed', accuracy: 99.33, items: 3450, location: 'Zone A' },
    { id: 'ST-2024-003', name: 'Cycle Count - High Value', date: '2024-12-05', status: 'completed', accuracy: 99.62, items: 520, location: 'Vault' },
    { id: 'ST-2024-006', name: 'Rapid Cycle - Fast Movers', date: '2024-12-18', status: 'in_progress', accuracy: 99.45, items: 2500, location: 'Picking Zone' },
  ];

  const topPerformingLocations = [
    { name: 'Warehouse C', accuracy: 99.5, efficiency: 96, trend: '+2.3%' },
    { name: 'Warehouse A', accuracy: 99.2, efficiency: 94, trend: '+1.8%' },
    { name: 'Cold Storage', accuracy: 99.1, efficiency: 91, trend: '+1.2%' },
    { name: 'Warehouse B', accuracy: 98.8, efficiency: 92, trend: '+0.9%' },
    { name: 'Store A', accuracy: 98.5, efficiency: 88, trend: '+0.5%' },
  ];

  const alerts = [
    { id: 1, title: 'Low Stock Alert', message: 'Product A below reorder point', priority: 'high', time: '10 min ago' },
    { id: 2, title: 'Batch Expiry Warning', message: 'BATCH-005 expires in 10 days', priority: 'medium', time: '1 hour ago' },
    { id: 3, title: 'Sync Failed', message: 'ERP connection timeout', priority: 'critical', time: '2 hours ago' },
    { id: 4, title: 'Device Offline', message: 'RFID Scanner #RF-1042 offline', priority: 'medium', time: '3 hours ago' },
  ];

  const getStatusBadge = (status) => {
    const config = {
      completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
      in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
      scheduled: { label: 'Scheduled', color: 'bg-yellow-100 text-yellow-700' },
    };
    const cfg = config[status] || config.completed;
    return <Badge className={cn("border-0", cfg.color)}>{cfg.label}</Badge>;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // KPI Data
  const kpis = {
    totalInventoryValue: 1250000,
    inventoryValueChange: '+8.5',
    totalItems: 38420,
    itemsChange: '+12.3',
    stocktakeAccuracy: 99.2,
    accuracyChange: '+1.8',
    pendingDiscrepancies: 12,
    discrepanciesChange: '-23.5',
    activeStocktakes: 3,
    stocktakesChange: '+2',
    totalStocktakes: 142,
    stocktakesGrowth: '+18.5',
  };

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#F5EEE9] px-6 py-4 rounded-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Dashboard</h1>
            <p className="text-black/50 text-sm mt-1">
              Welcome back! Here's what's happening with your inventory today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px] border-[#F5EEE9]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                <SelectTrigger className="w-[150px] border-[#F5EEE9]">
                  <SelectValue placeholder="All Warehouses" />
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
              disabled={refreshing}
            >
              <RefreshCw size={18} className={cn(refreshing && "animate-spin")} />
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Download size={16} className="mr-2" />
              Export Report
            </Button>
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
                  <p className="text-xs text-black/50">Total Inventory Value</p>
                  <p className="text-2xl font-bold text-black mt-1">${kpis.totalInventoryValue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{kpis.inventoryValueChange}%</span>
                    <span className="text-xs text-black/40">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <DollarSign size={24} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9] hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Items Counted</p>
                  <p className="text-2xl font-bold text-black mt-1">{kpis.totalItems.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{kpis.itemsChange}%</span>
                    <span className="text-xs text-black/40">vs last month</span>
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
                  <p className="text-xs text-black/50">Stocktake Accuracy</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{kpis.stocktakeAccuracy}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{kpis.accuracyChange}%</span>
                    <span className="text-xs text-black/40">improvement</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <Target size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9] hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Pending Discrepancies</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">{kpis.pendingDiscrepancies}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{kpis.discrepanciesChange}%</span>
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
                  <p className="text-xs text-black/50">Active Stocktakes</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{kpis.activeStocktakes}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{kpis.stocktakesChange}</span>
                    <span className="text-xs text-black/40">active</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <ClipboardList size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9] hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Stocktakes</p>
                  <p className="text-2xl font-bold text-black mt-1">{kpis.totalStocktakes}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{kpis.stocktakesGrowth}%</span>
                    <span className="text-xs text-black/40">YoY growth</span>
                  </div>
                </div>
                <div className="p-3 bg-teal-50 rounded-full">
                  <Activity size={24} className="text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-3 gap-6">
          {/* Inventory Trend Chart */}
          <Card className="border-[#F5EEE9] col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Inventory Trend</CardTitle>
                  <CardDescription>Items counted and accuracy over time</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Export Data</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={inventoryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#888888" />
                  <YAxis yAxisId="left" stroke="#888888" />
                  <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                  <ReTooltip />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="count" fill="#fee2e2" stroke="#ef4444" name="Items Counted" />
                  <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#22c55e" name="Accuracy %" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Inventory Distribution Pie Chart */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Inventory Distribution</CardTitle>
                  <CardDescription>By category</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RePieChart>
                  <Pie
                    data={inventoryDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {inventoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ReTooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {inventoryDistributionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-black/70">{item.name}</span>
                    <span className="text-xs font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-3 gap-6">
          {/* Stocktake Performance */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Stocktake Performance</CardTitle>
              <CardDescription>Monthly completed stocktakes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stocktakePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <ReTooltip />
                  <Bar dataKey="completed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Completed Stocktakes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Accuracy Trend */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Accuracy Trend</CardTitle>
              <CardDescription>Stocktake accuracy over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <ReLineChart data={stocktakePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis domain={[95, 100]} stroke="#888888" />
                  <ReTooltip />
                  <Line type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 4 }} name="Accuracy %" />
                </ReLineChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Current Accuracy</span>
                  <span className="text-2xl font-bold text-green-700">99.2%</span>
                </div>
                <Progress value={99.2} className="h-2 mt-2 bg-green-200" />
                <p className="text-xs text-green-600 mt-2">↑ 1.8% improvement from last quarter</p>
              </div>
            </CardContent>
          </Card>

          {/* Discrepancy Resolution */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Discrepancy Resolution</CardTitle>
              <CardDescription>Weekly discrepancy trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={discrepancyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <ReTooltip />
                  <Bar dataKey="count" stackId="a" fill="#ef4444" name="Total Discrepancies" />
                  <Bar dataKey="resolved" stackId="a" fill="#22c55e" name="Resolved" />
                  <Bar dataKey="pending" stackId="a" fill="#eab308" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-2 gap-6">
          {/* Location Performance */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Location Performance</CardTitle>
                  <CardDescription>Accuracy and efficiency by location</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" domain={[80, 100]} stroke="#888888" />
                  <YAxis type="category" dataKey="name" stroke="#888888" width={100} />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#ef4444" name="Accuracy %" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="efficiency" fill="#22c55e" name="Efficiency %" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Stocktakes */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Recent Stocktakes</CardTitle>
                  <CardDescription>Latest inventory counts</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600">
                  View All
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStocktakes.map((stocktake) => (
                  <div key={stocktake.id} className="flex items-center justify-between p-3 hover:bg-[#F5EEE9] rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        stocktake.status === 'completed' ? "bg-green-100" : "bg-blue-100"
                      )}>
                        {stocktake.status === 'completed' ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : (
                          <RefreshCw size={16} className="text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{stocktake.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-black/40">{stocktake.date}</span>
                          <span className="text-xs text-black/40">•</span>
                          <span className="text-xs text-black/40">{stocktake.location}</span>
                          <span className="text-xs text-black/40">•</span>
                          <span className="text-xs font-medium text-green-600">{stocktake.accuracy}%</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(stocktake.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Top Performing Locations */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Top Performing Locations</CardTitle>
              <CardDescription>Highest accuracy rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingLocations.map((location, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                        <Award size={14} className="text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{location.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-black/50">Accuracy: {location.accuracy}%</span>
                          <span className="text-xs text-black/50">Efficiency: {location.efficiency}%</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">{location.trend}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Active Alerts</CardTitle>
                  <CardDescription>Requires attention</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-2 hover:bg-[#F5EEE9] rounded-lg cursor-pointer">
                    <div className={cn(
                      "p-1.5 rounded-full",
                      alert.priority === 'critical' ? "bg-red-100" : 
                      alert.priority === 'high' ? "bg-orange-100" : "bg-yellow-100"
                    )}>
                      {alert.priority === 'critical' ? (
                        <AlertCircle size={12} className="text-red-600" />
                      ) : (
                        <AlertTriangle size={12} className="text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <span className="text-xs text-black/40">{alert.time}</span>
                      </div>
                      <p className="text-xs text-black/50 mt-0.5">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Insights */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Quick Insights</CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={14} className="text-red-600" />
                      <span className="text-xs text-black/50">Accuracy Goal</span>
                    </div>
                    <p className="text-xl font-bold">99.5%</p>
                    <Progress value={92} className="h-1.5 mt-2" />
                    <p className="text-xs text-green-600 mt-1">0.3% to target</p>
                  </div>
                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} className="text-blue-600" />
                      <span className="text-xs text-black/50">Avg. Stocktake Time</span>
                    </div>
                    <p className="text-xl font-bold">2.4 hrs</p>
                    <p className="text-xs text-green-600 mt-1">↓ 15% faster</p>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-red-50 to-transparent rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Next Scheduled Stocktake</span>
                    <CalendarDays size={14} className="text-red-600" />
                  </div>
                  <p className="text-lg font-bold">December Cycle Count</p>
                  <p className="text-xs text-black/50 mt-1">Scheduled for Dec 20, 2024</p>
                  <Button variant="link" className="p-0 h-auto mt-2 text-red-600">
                    View Details
                    <ChevronRight size={14} className="ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats Bar */}
        <div className="grid grid-cols-5 gap-4 pt-2">
          <div className="flex items-center gap-3 p-3 bg-[#F5EEE9] rounded-lg">
            <Scan size={20} className="text-red-600" />
            <div>
              <p className="text-xs text-black/50">Today's Counts</p>
              <p className="text-lg font-bold">2,450</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F5EEE9] rounded-lg">
            <Truck size={20} className="text-blue-600" />
            <div>
              <p className="text-xs text-black/50">Pending Transfers</p>
              <p className="text-lg font-bold">8</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F5EEE9] rounded-lg">
            <Users size={20} className="text-green-600" />
            <div>
              <p className="text-xs text-black/50">Active Users</p>
              <p className="text-lg font-bold">24</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F5EEE9] rounded-lg">
            <Boxes size={20} className="text-purple-600" />
            <div>
              <p className="text-xs text-black/50">Low Stock Items</p>
              <p className="text-lg font-bold text-orange-600">12</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F5EEE9] rounded-lg">
            <Calendar size={20} className="text-teal-600" />
            <div>
              <p className="text-xs text-black/50">Upcoming Expiries</p>
              <p className="text-lg font-bold">45</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Additional icon component
const AlertCircle = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default DashboardPage;