// app/dashboard/usage-analytics/page.js
'use client';

import { useState, useMemo } from 'react';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  Database,
  Activity,
  Download,
  RefreshCw,
  Zap,

  Gauge,
  Speedometer,
  Timer,
  Stopwatch,
  Hourglass,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  UserCheck,

  FileText,
  Package,
  ClipboardList,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,

  Activity as ActivityIcon,
  Zap as ZapIcon,
  Flame as FlameIcon,
  Target as TargetIcon,
  Award as AwardIcon,
  Trophy as TrophyIcon,
  Star as StarIcon,
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
import {
  AreaChart,
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
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const UsageAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Mock Usage Data
  const usageTrendData = [
    { date: 'Dec 15', apiCalls: 12450, activeUsers: 45, stocktakes: 12, itemsCounted: 12450 },
    { date: 'Dec 16', apiCalls: 13200, activeUsers: 48, stocktakes: 14, itemsCounted: 13800 },
    { date: 'Dec 17', apiCalls: 14500, activeUsers: 52, stocktakes: 16, itemsCounted: 15200 },
    { date: 'Dec 18', apiCalls: 15800, activeUsers: 56, stocktakes: 18, itemsCounted: 16500 },
    { date: 'Dec 19', apiCalls: 17200, activeUsers: 61, stocktakes: 21, itemsCounted: 17800 },
    { date: 'Dec 20', apiCalls: 18900, activeUsers: 67, stocktakes: 24, itemsCounted: 19400 },
    { date: 'Dec 21', apiCalls: 20100, activeUsers: 72, stocktakes: 28, itemsCounted: 20800 },
  ];

  const userActivityData = [
    { name: 'Active Users', value: 67, color: '#ef4444' },
    { name: 'Inactive Users', value: 23, color: '#e5e7eb' },
    { name: 'New Users', value: 12, color: '#22c55e' },
  ];

  const featureUsageData = [
    { name: 'Inventory Management', usage: 85, color: '#ef4444', count: 12500 },
    { name: 'Stocktaking', usage: 72, color: '#f97316', count: 8900 },
    { name: 'Reports & Analytics', usage: 58, color: '#eab308', count: 7200 },
    { name: 'API Integration', usage: 45, color: '#22c55e', count: 5600 },
    { name: 'IoT Devices', usage: 32, color: '#06b6d4', count: 3900 },
    { name: 'Webhooks', usage: 28, color: '#8b5cf6', count: 3400 },
  ];

  const userGrowthData = [
    { month: 'Jul', users: 124, newUsers: 12 },
    { month: 'Aug', users: 138, newUsers: 14 },
    { month: 'Sep', users: 156, newUsers: 18 },
    { month: 'Oct', users: 178, newUsers: 22 },
    { month: 'Nov', users: 205, newUsers: 27 },
    { month: 'Dec', users: 245, newUsers: 40 },
  ];

  const topUsersData = [
    { name: 'John Anderson', email: 'john@company.com', apiCalls: 12450, actions: 342, lastActive: '2024-12-20T15:30:00Z', role: 'Admin' },
    { name: 'Sarah Chen', email: 'sarah@company.com', apiCalls: 8750, actions: 234, lastActive: '2024-12-20T14:15:00Z', role: 'Manager' },
    { name: 'Michael Roberts', email: 'michael@company.com', apiCalls: 5620, actions: 178, lastActive: '2024-12-20T13:45:00Z', role: 'Supervisor' },
    { name: 'Emily Watson', email: 'emily@company.com', apiCalls: 4340, actions: 145, lastActive: '2024-12-20T11:20:00Z', role: 'Analyst' },
    { name: 'David Kim', email: 'david@company.com', apiCalls: 3210, actions: 98, lastActive: '2024-12-19T16:30:00Z', role: 'Technician' },
  ];

  const apiEndpointUsage = [
    { endpoint: '/api/inventory', calls: 45680, percentage: 34, avgTime: '124ms' },
    { endpoint: '/api/stocktake', calls: 28900, percentage: 22, avgTime: '156ms' },
    { endpoint: '/api/reports', calls: 18700, percentage: 14, avgTime: '234ms' },
    { endpoint: '/api/analytics', calls: 15600, percentage: 12, avgTime: '189ms' },
    { endpoint: '/api/webhooks', calls: 12400, percentage: 9, avgTime: '78ms' },
    { endpoint: '/api/iot', calls: 8900, percentage: 7, avgTime: '98ms' },
  ];

  const dailyUsageData = [
    { hour: '00:00', calls: 1250, users: 12 },
    { hour: '02:00', calls: 890, users: 8 },
    { hour: '04:00', calls: 650, users: 5 },
    { hour: '06:00', calls: 2340, users: 23 },
    { hour: '08:00', calls: 5670, users: 45 },
    { hour: '10:00', calls: 7890, users: 67 },
    { hour: '12:00', calls: 6540, users: 58 },
    { hour: '14:00', calls: 8230, users: 72 },
    { hour: '16:00', calls: 9450, users: 78 },
    { hour: '18:00', calls: 6780, users: 61 },
    { hour: "22:00", calls: 2340, users: 18 },
  ];

  const stats = {
    totalApiCalls: 124580,
    apiCallsGrowth: '+18.5',
    activeUsers: 67,
    activeUsersGrowth: '+12.3',
    avgResponseTime: 156,
    avgResponseTimeChange: '-8.2',
    totalStocktakes: 142,
    stocktakesGrowth: '+15.4',
    storageUsed: 2.4,
    storageUsedGrowth: '+5.2',
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
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
            <h1 className="text-2xl font-bold text-black">Usage Analytics</h1>
            <p className="text-black/50 text-sm mt-1">
              Monitor platform usage, user activity, and API consumption
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
            </div>
            <Button variant="outline" className="border-[#F5EEE9] gap-2" onClick={() => setShowExportDialog(true)}>
              <Download size={16} />
              Export Report
            </Button>
            <Button variant="outline" size="icon" className="border-[#F5EEE9]">
              <RefreshCw size={16} />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total API Calls</p>
                  <p className="text-xl font-bold text-black">{stats.totalApiCalls.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(stats.apiCallsGrowth)}
                    <span className={cn("text-xs", getTrendColor(stats.apiCallsGrowth))}>
                      {stats.apiCallsGrowth}%
                    </span>
                    <span className="text-xs text-black/40">vs last month</span>
                  </div>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Activity size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Users</p>
                  <p className="text-xl font-bold text-green-600">{stats.activeUsers}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(stats.activeUsersGrowth)}
                    <span className={cn("text-xs", getTrendColor(stats.activeUsersGrowth))}>
                      {stats.activeUsersGrowth}%
                    </span>
                    <span className="text-xs text-black/40">this month</span>
                  </div>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <Users size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Response Time</p>
                  <p className="text-xl font-bold text-blue-600">{stats.avgResponseTime}ms</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(stats.avgResponseTimeChange)}
                    <span className={cn("text-xs", getTrendColor(stats.avgResponseTimeChange))}>
                      {stats.avgResponseTimeChange}%
                    </span>
                    <span className="text-xs text-black/40">faster</span>
                  </div>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Gauge size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Stocktakes</p>
                  <p className="text-xl font-bold text-purple-600">{stats.totalStocktakes}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(stats.stocktakesGrowth)}
                    <span className={cn("text-xs", getTrendColor(stats.stocktakesGrowth))}>
                      {stats.stocktakesGrowth}%
                    </span>
                    <span className="text-xs text-black/40">growth</span>
                  </div>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <ClipboardList size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Storage Used</p>
                  <p className="text-xl font-bold text-orange-600">{stats.storageUsed} GB</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(stats.storageUsedGrowth)}
                    <span className={cn("text-xs", getTrendColor(stats.storageUsedGrowth))}>
                      {stats.storageUsedGrowth}%
                    </span>
                    <span className="text-xs text-black/40">this month</span>
                  </div>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Database size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-[#F5EEE9] mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api-usage">API Usage</TabsTrigger>
            <TabsTrigger value="user-activity">User Activity</TabsTrigger>
            <TabsTrigger value="feature-usage">Feature Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Usage Trend Chart */}
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Platform Usage Trend</CardTitle>
                <CardDescription>API calls, active users, and stocktakes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={usageTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#888888" />
                      <YAxis yAxisId="left" stroke="#888888" />
                      <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                      <ReTooltip />
                      <Legend />
                      <Area yAxisId="left" type="monotone" dataKey="apiCalls" fill="#fee2e2" stroke="#ef4444" name="API Calls" />
                      <Line yAxisId="right" type="monotone" dataKey="activeUsers" stroke="#22c55e" strokeWidth={2} name="Active Users" />
                      <Bar yAxisId="left" dataKey="stocktakes" fill="#f97316" name="Stocktakes" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              {/* User Activity Distribution */}
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>User Activity Distribution</CardTitle>
                  <CardDescription>Active vs inactive users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={userActivityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {userActivityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ReTooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {userActivityData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Daily Usage Pattern */}
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>Daily Usage Pattern</CardTitle>
                  <CardDescription>API calls by hour of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={dailyUsageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="hour" stroke="#888888" tick={{ fontSize: 10 }} />
                        <YAxis stroke="#888888" />
                        <ReTooltip />
                        <Bar dataKey="calls" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Users Table */}
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Top Active Users</CardTitle>
                <CardDescription>Most active users by API calls and actions</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5EEE9]/30">
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">API Calls</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                      <TableHead>Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topUsersData.map((user, idx) => (
                      <TableRow key={idx} className="hover:bg-[#F5EEE9]/30 cursor-pointer" onClick={() => {
                        setSelectedDetail(user);
                        setShowDetailsDialog(true);
                      }}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-black/50">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{user.apiCalls.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{user.actions}</TableCell>
                        <TableCell className="text-sm">{formatDate(user.lastActive)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api-usage" className="space-y-6">
            {/* API Endpoint Usage */}
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>API Endpoint Usage</CardTitle>
                <CardDescription>Distribution of API calls by endpoint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpointUsage.map((endpoint, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono text-red-600">{endpoint.endpoint}</code>
                          <Badge variant="outline" className="text-xs">{endpoint.avgTime}</Badge>
                        </div>
                        <span className="text-sm font-medium">{endpoint.calls.toLocaleString()} calls</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={endpoint.percentage} className="h-2 flex-1" />
                        <span className="text-xs text-black/50 w-12">{endpoint.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Performance Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="border-[#F5EEE9]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-black">156ms</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">-8.2%</span>
                    <span className="text-xs text-black/40">vs last month</span>
                  </div>
                  <Progress value={85} className="h-1.5 mt-3" />
                  <p className="text-xs text-black/50 mt-2">95th percentile: 342ms</p>
                </CardContent>
              </Card>
              <Card className="border-[#F5EEE9]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">99.8%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">+0.3%</span>
                    <span className="text-xs text-black/40">improvement</span>
                  </div>
                  <Progress value={99.8} className="h-1.5 mt-3" />
                  <p className="text-xs text-black/50 mt-2">124 failed requests this month</p>
                </CardContent>
              </Card>
              <Card className="border-[#F5EEE9]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Rate Limit Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-black">67%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-orange-600" />
                    <span className="text-xs text-orange-600">+12%</span>
                    <span className="text-xs text-black/40">this week</span>
                  </div>
                  <Progress value={67} className="h-1.5 mt-3" />
                  <p className="text-xs text-black/50 mt-2">Peak: 2,340 requests/min</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="user-activity" className="space-y-6">
            {/* User Growth Chart */}
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Total users and new user acquisition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <ReTooltip />
                      <Legend />
                      <Bar dataKey="users" fill="#ef4444" name="Total Users" />
                      <Bar dataKey="newUsers" fill="#22c55e" name="New Users" />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* User Engagement Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="border-[#F5EEE9]">
                <CardContent className="p-4 text-center">
                  <Users size={24} className="mx-auto text-red-600 mb-2" />
                  <p className="text-2xl font-bold">67</p>
                  <p className="text-xs text-black/50">Daily Active Users</p>
                </CardContent>
              </Card>
              <Card className="border-[#F5EEE9]">
                <CardContent className="p-4 text-center">
                  <UserCheck size={24} className="mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-xs text-black/50">Weekly Retention</p>
                </CardContent>
              </Card>
              <Card className="border-[#F5EEE9]">
                <CardContent className="p-4 text-center">
                  <ClockIcon size={24} className="mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold">2.4hrs</p>
                  <p className="text-xs text-black/50">Avg Session Duration</p>
                </CardContent>
              </Card>
              <Card className="border-[#F5EEE9]">
                <CardContent className="p-4 text-center">
                  <Zap size={24} className="mx-auto text-orange-600 mb-2" />
                  <p className="text-2xl font-bold">342</p>
                  <p className="text-xs text-black/50">Actions per User</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feature-usage" className="space-y-6">
            {/* Feature Usage Distribution */}
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Feature Adoption</CardTitle>
                <CardDescription>Usage percentage of key features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureUsageData.map((feature, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: feature.color }} />
                          <span className="font-medium">{feature.name}</span>
                          <Badge variant="outline" className="text-xs">{feature.count.toLocaleString()} uses</Badge>
                        </div>
                        <span className="text-sm font-medium">{feature.usage}%</span>
                      </div>
                      <Progress value={feature.usage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feature Insights */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-[#F5EEE9] bg-gradient-to-r from-green-50 to-transparent">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <TrendingUp size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Fastest Growing Feature</h3>
                      <p className="text-2xl font-bold text-green-600 mt-1">API Integration</p>
                      <p className="text-sm text-black/60 mt-1">+45% usage growth this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-[#F5EEE9] bg-gradient-to-r from-orange-50 to-transparent">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Zap size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Underutilized Feature</h3>
                      <p className="text-2xl font-bold text-orange-600 mt-1">Webhooks</p>
                      <p className="text-sm text-black/60 mt-1">Only 28% of users have enabled webhooks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Export Usage Analytics</DialogTitle>
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
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="quarter">Last 90 Days</SelectItem>
                  <SelectItem value="year">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Include Charts</Label>
              <Switch defaultChecked />
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

      {/* User Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedDetail && (
            <>
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
                <DialogDescription>
                  {selectedDetail.name} - Activity overview
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 p-3 bg-[#F5EEE9] rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-red-100 text-red-600 text-lg">
                      {selectedDetail.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedDetail.name}</p>
                    <p className="text-sm text-black/50">{selectedDetail.email}</p>
                    <Badge variant="outline" className="mt-1">{selectedDetail.role}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">API Calls</p>
                    <p className="text-xl font-bold">{selectedDetail.apiCalls.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-2 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Actions</p>
                    <p className="text-xl font-bold">{selectedDetail.actions}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recent Activity</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Activity size={12} className="text-green-600" />
                      <span>Performed stocktake at Warehouse A</span>
                      <span className="text-xs text-black/40 ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText size={12} className="text-blue-600" />
                      <span>Generated monthly report</span>
                      <span className="text-xs text-black/40 ml-auto">5 hours ago</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Package size={12} className="text-purple-600" />
                      <span>Updated inventory item SKU-001</span>
                      <span className="text-xs text-black/40 ml-auto">Yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsageAnalyticsPage;