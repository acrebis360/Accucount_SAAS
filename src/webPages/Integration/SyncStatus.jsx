// app/dashboard/sync-status/page.js
'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Database,
  Cloud,
  Server,
  Wifi,
  WifiOff,
  Activity,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  RefreshCcw,
  Play,
  Pause,
  StopCircle,
  History,
  Filter,
  Search,
  Server as ServerIcon,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Wifi as WifiIcon,
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { Switch } from '@/components/ui/switch';

const SyncStatusPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [selectedSync, setSelectedSync] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  // Mock Sync Jobs Data
  const syncJobs = [
    {
      id: 'sync_001',
      name: 'SAP Production Sync',
      type: 'erp',
      status: 'success',
      lastSync: '2024-12-20T15:30:00Z',
      nextSync: '2024-12-20T16:30:00Z',
      duration: '2m 34s',
      itemsSynced: 12450,
      itemsFailed: 3,
      successRate: 99.8,
      source: 'SAP ECC 6.0',
      destination: 'AccuCount Cloud',
      direction: 'bidirectional',
      schedule: 'hourly',
      connection: 'SAP Production',
      errors: [
        { code: 'ERR-001', message: 'Item SKU-123 not found', timestamp: '2024-12-20T15:31:00Z' }
      ],
      warnings: [
        { code: 'WARN-001', message: 'Rate limit approaching', timestamp: '2024-12-20T15:32:00Z' }
      ],
      logs: [
        { level: 'info', message: 'Sync started', timestamp: '2024-12-20T15:30:00Z' },
        { level: 'info', message: 'Connected to SAP', timestamp: '2024-12-20T15:30:05Z' },
        { level: 'info', message: 'Fetching inventory data', timestamp: '2024-12-20T15:30:10Z' },
        { level: 'warning', message: 'Rate limit approaching', timestamp: '2024-12-20T15:32:00Z' },
        { level: 'error', message: 'Item SKU-123 not found', timestamp: '2024-12-20T15:31:00Z' },
        { level: 'info', message: 'Sync completed', timestamp: '2024-12-20T15:32:34Z' },
      ]
    },
    {
      id: 'sync_002',
      name: 'Oracle NetSuite Sync',
      type: 'erp',
      status: 'success',
      lastSync: '2024-12-20T14:15:00Z',
      nextSync: '2024-12-20T15:15:00Z',
      duration: '1m 45s',
      itemsSynced: 8750,
      itemsFailed: 0,
      successRate: 100,
      source: 'NetSuite 2024.2',
      destination: 'AccuCount Cloud',
      direction: 'inbound',
      schedule: 'hourly',
      connection: 'Oracle NetSuite',
      errors: [],
      warnings: [],
      logs: [
        { level: 'info', message: 'Sync started', timestamp: '2024-12-20T14:15:00Z' },
        { level: 'info', message: 'Connected to NetSuite', timestamp: '2024-12-20T14:15:05Z' },
        { level: 'info', message: 'Fetching inventory data', timestamp: '2024-12-20T14:15:10Z' },
        { level: 'info', message: 'Sync completed', timestamp: '2024-12-20T14:16:45Z' },
      ]
    },
    {
      id: 'sync_003',
      name: 'Microsoft Dynamics Sync',
      type: 'erp',
      status: 'error',
      lastSync: '2024-12-20T13:00:00Z',
      nextSync: '2024-12-20T14:00:00Z',
      duration: '3m 12s',
      itemsSynced: 5420,
      itemsFailed: 12,
      successRate: 95.2,
      source: 'Dynamics 365',
      destination: 'AccuCount Cloud',
      direction: 'outbound',
      schedule: 'hourly',
      connection: 'Microsoft Dynamics',
      errors: [
        { code: 'ERR-002', message: 'Authentication token expired', timestamp: '2024-12-20T13:02:00Z' },
        { code: 'ERR-003', message: 'Connection timeout', timestamp: '2024-12-20T13:02:30Z' },
      ],
      warnings: [],
      logs: [
        { level: 'info', message: 'Sync started', timestamp: '2024-12-20T13:00:00Z' },
        { level: 'info', message: 'Connecting to Dynamics', timestamp: '2024-12-20T13:00:05Z' },
        { level: 'error', message: 'Authentication token expired', timestamp: '2024-12-20T13:02:00Z' },
        { level: 'error', message: 'Connection timeout', timestamp: '2024-12-20T13:02:30Z' },
        { level: 'info', message: 'Sync failed', timestamp: '2024-12-20T13:03:12Z' },
      ]
    },
    {
      id: 'sync_004',
      name: 'IoT Gateway Sync',
      type: 'iot',
      status: 'in_progress',
      lastSync: '2024-12-20T15:28:00Z',
      nextSync: '2024-12-20T15:33:00Z',
      duration: null,
      itemsSynced: 3420,
      itemsFailed: 0,
      successRate: null,
      source: 'IoT Gateways',
      destination: 'AccuCount Edge',
      direction: 'inbound',
      schedule: 'continuous',
      connection: 'Warehouse Gateways',
      errors: [],
      warnings: [],
      logs: [
        { level: 'info', message: 'Sync started', timestamp: '2024-12-20T15:28:00Z' },
        { level: 'info', message: 'Connected to Gateway-01', timestamp: '2024-12-20T15:28:05Z' },
        { level: 'info', message: 'Receiving RFID data', timestamp: '2024-12-20T15:28:10Z' },
        { level: 'info', message: 'Processing batch 1/5', timestamp: '2024-12-20T15:29:00Z' },
      ]
    },
    {
      id: 'sync_005',
      name: 'QuickBooks Online Sync',
      type: 'erp',
      status: 'success',
      lastSync: '2024-12-20T15:45:00Z',
      nextSync: '2024-12-20T16:45:00Z',
      duration: '45s',
      itemsSynced: 3250,
      itemsFailed: 0,
      successRate: 100,
      source: 'QuickBooks Online',
      destination: 'AccuCount Cloud',
      direction: 'inbound',
      schedule: 'hourly',
      connection: 'QuickBooks',
      errors: [],
      warnings: [],
      logs: [
        { level: 'info', message: 'Sync started', timestamp: '2024-12-20T15:45:00Z' },
        { level: 'info', message: 'Connected to QuickBooks', timestamp: '2024-12-20T15:45:05Z' },
        { level: 'info', message: 'Sync completed', timestamp: '2024-12-20T15:45:45Z' },
      ]
    },
    {
      id: 'sync_006',
      name: 'RFID Scanner Sync',
      type: 'iot',
      status: 'warning',
      lastSync: '2024-12-20T15:20:00Z',
      nextSync: '2024-12-20T15:25:00Z',
      duration: '1m 12s',
      itemsSynced: 1250,
      itemsFailed: 8,
      successRate: 99.4,
      source: 'RFID Scanners',
      destination: 'AccuCount Edge',
      direction: 'inbound',
      schedule: 'continuous',
      connection: 'RFID Network',
      errors: [],
      warnings: [
        { code: 'WARN-002', message: 'Low signal strength on Scanner-01', timestamp: '2024-12-20T15:21:00Z' },
      ],
      logs: [
        { level: 'info', message: 'Sync started', timestamp: '2024-12-20T15:20:00Z' },
        { level: 'warning', message: 'Low signal strength on Scanner-01', timestamp: '2024-12-20T15:21:00Z' },
        { level: 'info', message: 'Sync completed', timestamp: '2024-12-20T15:21:12Z' },
      ]
    },
  ];

  // Sync History Data
  const syncHistory = [
    { id: 1, date: '2024-12-20T15:30:00Z', job: 'SAP Production Sync', status: 'success', items: 12450, duration: '2m 34s', errors: 3 },
    { id: 2, date: '2024-12-20T14:30:00Z', job: 'SAP Production Sync', status: 'success', items: 12448, duration: '2m 28s', errors: 2 },
    { id: 3, date: '2024-12-20T13:30:00Z', job: 'SAP Production Sync', status: 'success', items: 12450, duration: '2m 42s', errors: 0 },
    { id: 4, date: '2024-12-20T12:30:00Z', job: 'SAP Production Sync', status: 'error', items: 8230, duration: '1m 15s', errors: 5 },
    { id: 5, date: '2024-12-20T11:30:00Z', job: 'SAP Production Sync', status: 'success', items: 12450, duration: '2m 31s', errors: 0 },
    { id: 6, date: '2024-12-20T14:15:00Z', job: 'Oracle NetSuite Sync', status: 'success', items: 8750, duration: '1m 45s', errors: 0 },
    { id: 7, date: '2024-12-20T13:00:00Z', job: 'Microsoft Dynamics Sync', status: 'error', items: 5420, duration: '3m 12s', errors: 12 },
  ];

  // Sync Trend Data
  const syncTrendData = [
    { hour: '00:00', success: 12, failed: 1, items: 12450 },
    { hour: '02:00', success: 10, failed: 0, items: 10800 },
    { hour: '04:00', success: 8, failed: 2, items: 8950 },
    { hour: '06:00', success: 15, failed: 1, items: 16200 },
    { hour: '08:00', success: 28, failed: 3, items: 28450 },
    { hour: '10:00', success: 32, failed: 2, items: 34500 },
    { hour: '12:00', success: 35, failed: 1, items: 37800 },
    { hour: '14:00', success: 38, failed: 4, items: 41200 },
    { hour: '16:00', success: 36, failed: 2, items: 38900 },
    { hour: '18:00', success: 30, failed: 1, items: 32400 },
    { hour: '20:00', success: 22, failed: 0, items: 23700 },
    { hour: '22:00', success: 15, failed: 1, items: 16200 },
  ];

  const syncTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'erp', label: 'ERP Sync', icon: Database },
    { id: 'iot', label: 'IoT Sync', icon: Wifi },
    { id: 'api', label: 'API Sync', icon: Cloud },
  ];

  const statusConfig = {
    success: { label: 'Success', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    error: { label: 'Error', color: 'bg-red-100 text-red-700', icon: XCircle },
    in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: RefreshCw },
    warning: { label: 'Warning', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle },
    pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700', icon: Clock },
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={10} className={status === 'in_progress' ? 'animate-spin' : ''} />
        {config.label}
      </Badge>
    );
  };

  const getTypeIcon = (type) => {
    const config = syncTypes.find(t => t.id === type);
    const Icon = config?.icon || Database;
    return <Icon size={14} className="text-red-600" />;
  };

  // Filter sync jobs
  const filteredJobs = syncJobs.filter(job => {
    const matchesSearch = 
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.connection.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    totalSyncs: syncJobs.length,
    successfulSyncs: syncJobs.filter(j => j.status === 'success').length,
    failedSyncs: syncJobs.filter(j => j.status === 'error').length,
    inProgressSyncs: syncJobs.filter(j => j.status === 'in_progress').length,
    totalItemsSynced: syncJobs.reduce((sum, j) => sum + (j.itemsSynced || 0), 0),
    avgSuccessRate: Math.round(syncJobs.filter(j => j.successRate).reduce((sum, j) => sum + j.successRate, 0) / syncJobs.filter(j => j.successRate).length),
    syncsToday: syncHistory.filter(h => new Date(h.date).toDateString() === new Date().toDateString()).length,
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
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

  const handleSyncNow = (jobId) => {
    setIsSyncing(true);
    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Sync Status</h1>
            <p className="text-black/50 text-sm mt-1">
              Monitor and manage data synchronization across all integrations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Auto-refresh</Label>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>
            <Button 
              variant="outline" 
              className="border-[#F5EEE9] gap-2"
              onClick={handleRefresh}
            >
              <RefreshCw size={16} className={cn(autoRefresh && "animate-spin")} />
              Refresh
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
              <Download size={16} />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Sync Jobs</p>
                  <p className="text-xl font-bold text-black">{stats.totalSyncs}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <RefreshCw size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Successful</p>
                  <p className="text-xl font-bold text-green-600">{stats.successfulSyncs}</p>
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
                  <p className="text-xs text-black/50">Failed</p>
                  <p className="text-xl font-bold text-red-600">{stats.failedSyncs}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <XCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">In Progress</p>
                  <p className="text-xl font-bold text-blue-600">{stats.inProgressSyncs}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Activity size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Items Synced</p>
                  <p className="text-xl font-bold text-purple-600">{stats.totalItemsSynced.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Database size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg. Success Rate</p>
                  <p className="text-xl font-bold text-emerald-600">{stats.avgSuccessRate}%</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-full">
                  <TrendingUp size={18} className="text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Last Refresh Indicator */}
        <div className="flex items-center justify-end mt-2">
          <p className="text-xs text-black/40">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#F5EEE9] mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Sync Jobs</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Sync Trend Chart */}
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Sync Performance Trend</CardTitle>
                <CardDescription>Hourly sync success rates and items processed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={syncTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hour" stroke="#888888" />
                      <YAxis yAxisId="left" stroke="#888888" />
                      <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                      <ReTooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="success" fill="#22c55e" name="Successful Syncs" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="left" dataKey="failed" fill="#ef4444" name="Failed Syncs" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="items" stroke="#eab308" strokeWidth={2} name="Items Synced (K)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Current Sync Status Grid */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>Active Sync Jobs</CardTitle>
                  <CardDescription>Currently running synchronizations</CardDescription>
                </CardHeader>
                <CardContent>
                  {syncJobs.filter(j => j.status === 'in_progress').map(job => (
                    <div key={job.id} className="mb-4 last:mb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(job.type)}
                          <span className="font-medium">{job.name}</span>
                        </div>
                        {getStatusBadge(job.status)}
                      </div>
                      <Progress value={65} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs text-black/50">
                        <span>Processing {job.itemsSynced.toLocaleString()} items</span>
                        <span>65% complete</span>
                      </div>
                    </div>
                  ))}
                  {syncJobs.filter(j => j.status === 'in_progress').length === 0 && (
                    <p className="text-center text-black/50 py-8">No active sync jobs</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>Recent Sync Issues</CardTitle>
                  <CardDescription>Latest errors and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {syncJobs.filter(j => j.errors?.length > 0 || j.warnings?.length > 0).slice(0, 3).map(job => (
                      <div key={job.id} className="p-3 bg-[#F5EEE9] rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{job.name}</span>
                          {job.errors?.length > 0 ? (
                            <Badge className="bg-red-100 text-red-700">Error</Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-700">Warning</Badge>
                          )}
                        </div>
                        {job.errors?.slice(0, 1).map((err, idx) => (
                          <p key={idx} className="text-xs text-red-600">{err.message}</p>
                        ))}
                        {job.warnings?.slice(0, 1).map((warn, idx) => (
                          <p key={idx} className="text-xs text-yellow-600">{warn.message}</p>
                        ))}
                        <p className="text-xs text-black/40 mt-1">{formatDate(job.lastSync)}</p>
                      </div>
                    ))}
                    {syncJobs.filter(j => j.errors?.length > 0 || j.warnings?.length > 0).length === 0 && (
                      <p className="text-center text-black/50 py-8">No issues detected</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Scheduled Syncs */}
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Upcoming Syncs</CardTitle>
                <CardDescription>Scheduled synchronizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {syncJobs.slice(0, 4).map(job => (
                    <div key={job.id} className="p-3 border border-[#F5EEE9] rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(job.type)}
                        <span className="font-medium text-sm">{job.name}</span>
                      </div>
                      <p className="text-xs text-black/50">Next: {formatDate(job.nextSync)}</p>
                      <p className="text-xs text-black/50">Schedule: {job.schedule}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            {/* Filters */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
                  <Input
                    placeholder="Search sync jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-[#F5EEE9] focus:border-red-600"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[130px] border-[#F5EEE9]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {syncTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[130px] border-[#F5EEE9]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                  <Filter size={16} />
                </Button>
              </div>
            </div>

            {/* Sync Jobs Table */}
            <Card className="border-[#F5EEE9]">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5EEE9]/30">
                      <TableHead>Job Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Next Sync</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Duration</TableHead>
                      <TableHead className="text-center">Success Rate</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.map((job) => (
                      <TableRow key={job.id} className="hover:bg-[#F5EEE9]/30 cursor-pointer" onClick={() => {
                        setSelectedSync(job);
                        setShowDetailsDialog(true);
                      }}>
                        <TableCell className="font-medium">{job.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(job.type)}
                            <span className="capitalize">{job.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(job.status)}</TableCell>
                        <TableCell className="text-sm">{formatDate(job.lastSync)}</TableCell>
                        <TableCell className="text-sm">{formatDate(job.nextSync)}</TableCell>
                        <TableCell className="text-right text-sm">{job.itemsSynced.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-sm">{job.duration || '—'}</TableCell>
                        <TableCell className="text-center">
                          {job.successRate ? (
                            <div className="flex items-center justify-center gap-1">
                              <span className={job.successRate >= 99 ? 'text-green-600' : job.successRate >= 95 ? 'text-yellow-600' : 'text-red-600'}>
                                {job.successRate}%
                              </span>
                              <Progress value={job.successRate} className="w-16 h-1" />
                            </div>
                          ) : '—'}
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleSyncNow(job.id)}>
                                    <Play size={14} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Sync Now</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                                    setSelectedSync(job);
                                    setShowHistoryDialog(true);
                                  }}>
                                    <History size={14} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>View History</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {syncJobs.map(job => (
                      <SelectItem key={job.id} value={job.id}>{job.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="7days">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="border-[#F5EEE9]">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5EEE9]/30">
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Job Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Items Synced</TableHead>
                      <TableHead className="text-right">Duration</TableHead>
                      <TableHead className="text-right">Errors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {syncHistory.map((history) => (
                      <TableRow key={history.id} className="hover:bg-[#F5EEE9]/30">
                        <TableCell className="text-sm">{new Date(history.date).toLocaleString()}</TableCell>
                        <TableCell className="font-medium">{history.job}</TableCell>
                        <TableCell>
                          <Badge className={history.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {history.status === 'success' ? 'Success' : 'Failed'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-sm">{history.items.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-sm">{history.duration}</TableCell>
                        <TableCell className="text-right text-sm text-red-600">{history.errors}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>Success Rate by Job</CardTitle>
                  <CardDescription>Individual job performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {syncJobs.map(job => (
                      <div key={job.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{job.name}</span>
                          <span className={job.successRate >= 99 ? 'text-green-600' : job.successRate >= 95 ? 'text-yellow-600' : 'text-red-600'}>
                            {job.successRate}%
                          </span>
                        </div>
                        <Progress value={job.successRate} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>Sync Volume by Type</CardTitle>
                  <CardDescription>Items processed by integration type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['ERP Sync', 'IoT Sync', 'API Sync'].map((type, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{type}</span>
                          <span className="font-medium">{(Math.random() * 50000 + 20000).toFixed(0)} items</span>
                        </div>
                        <Progress value={Math.random() * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Sync Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Avg. Sync Duration</p>
                    <p className="text-xl font-bold">2m 18s</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingDown size={12} className="text-green-600" />
                      <span className="text-xs text-green-600">-12%</span>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Peak Throughput</p>
                    <p className="text-xl font-bold">12.4K/min</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingUp size={12} className="text-green-600" />
                      <span className="text-xs text-green-600">+8%</span>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Error Rate</p>
                    <p className="text-xl font-bold text-red-600">2.3%</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingDown size={12} className="text-green-600" />
                      <span className="text-xs text-green-600">-5%</span>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">API Latency</p>
                    <p className="text-xl font-bold">234ms</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingDown size={12} className="text-green-600" />
                      <span className="text-xs text-green-600">-8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sync Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedSync && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedSync.name}</span>
                  {getStatusBadge(selectedSync.status)}
                </DialogTitle>
                <DialogDescription>
                  {selectedSync.connection} • {selectedSync.direction} sync
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Source</p>
                    <p className="font-medium">{selectedSync.source}</p>
                  </div>
                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Destination</p>
                    <p className="font-medium">{selectedSync.destination}</p>
                  </div>
                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Last Sync</p>
                    <p className="font-medium">{formatDate(selectedSync.lastSync)}</p>
                  </div>
                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Duration</p>
                    <p className="font-medium">{selectedSync.duration || 'In progress'}</p>
                  </div>
                </div>

                {selectedSync.errors?.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <XCircle size={14} className="text-red-600" />
                      Errors
                    </h4>
                    <div className="space-y-2">
                      {selectedSync.errors.map((err, idx) => (
                        <div key={idx} className="p-2 bg-red-50 rounded-lg">
                          <p className="text-sm text-red-700">{err.message}</p>
                          <p className="text-xs text-red-600/70">{formatDate(err.timestamp)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSync.warnings?.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle size={14} className="text-yellow-600" />
                      Warnings
                    </h4>
                    <div className="space-y-2">
                      {selectedSync.warnings.map((warn, idx) => (
                        <div key={idx} className="p-2 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-yellow-700">{warn.message}</p>
                          <p className="text-xs text-yellow-600/70">{formatDate(warn.timestamp)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Sync Logs</h4>
                  <ScrollArea className="h-[200px] border border-[#F5EEE9] rounded-lg p-3">
                    <div className="space-y-2">
                      {selectedSync.logs?.map((log, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className={cn(
                            "w-16 text-xs",
                            log.level === 'error' ? "text-red-600" :
                            log.level === 'warning' ? "text-yellow-600" :
                            "text-black/50"
                          )}>
                            {log.level.toUpperCase()}
                          </span>
                          <span className="text-xs text-black/70">{log.message}</span>
                          <span className="text-xs text-black/40 ml-auto">{formatDate(log.timestamp)}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleSyncNow(selectedSync.id)}>
                  <RefreshCw size={14} className="mr-2" />
                  Sync Now
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Sync in Progress Dialog */}
      {isSyncing && (
        <Dialog open={isSyncing} onOpenChange={setIsSyncing}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Sync in Progress</DialogTitle>
              <DialogDescription>Please wait while data is being synchronized</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span>Synchronizing data...</span>
                <span>{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
              <p className="text-xs text-black/50 text-center">
                This may take a few minutes depending on the volume of data
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SyncStatusPage;