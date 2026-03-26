// app/dashboard/erp-integration/page.js
'use client';

import { useState, useMemo } from 'react';
import {
  Database,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Settings,
  Play,
  Pause,
  StopCircle,
  Clock,
  Calendar,
  Download,
  Upload,
  FileText,
  Plus,
  Trash2,
  Edit,
  Eye,
  MoreVertical,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  Link2,
  Unlink,
  Zap,
  Shield,
  Lock,
  Unlock,
  Key,
  Globe,
  Server,
  Cloud,
  HardDrive,
  Network,
  Wifi,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  History,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Mail,
  Bell,
  Webhook,
  Code,
  Terminal,
  BookOpen,
  HelpCircle,
  Info,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  RefreshCcw,
  Save,
  Settings2,
  Loader2,
  DatabaseZap,
  Layers,
  Package,
  ClipboardList,
  Users,
  Building2,
  MapPin,
  DollarSign,
  Percent,
  Tag,
  Hash,
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
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

const ErpIntegrationPage = () => {
  const [activeTab, setActiveTab] = useState('connections');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [showLogsDialog, setShowLogsDialog] = useState(false);
  const [showMappingDialog, setShowMappingDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [newConnection, setNewConnection] = useState({
    name: '',
    type: 'sap',
    url: '',
    username: '',
    password: '',
    apiKey: '',
    syncFrequency: 'hourly',
    syncDirection: 'bidirectional',
    mapping: {},
  });

  // Mock ERP Connections Data
  const erpConnections = [
    {
      id: 'conn_001',
      name: 'SAP Production',
      type: 'sap',
      status: 'connected',
      lastSync: '2024-12-20T15:30:00Z',
      nextSync: '2024-12-20T16:30:00Z',
      syncFrequency: 'hourly',
      syncDirection: 'bidirectional',
      totalSyncs: 1240,
      successRate: 99.2,
      lastSyncDuration: '2m 34s',
      itemsSynced: 12450,
      errors: 3,
      warnings: 12,
      version: 'SAP ECC 6.0',
      url: 'https://sap.enterprise.com:8000',
      credentials: {
        username: 'api_user',
        authType: 'basic',
      },
      mapping: {
        products: 'ZPRODUCTS',
        inventory: 'ZINVENTORY',
        stocktake: 'ZSTOCKTAKE',
      },
      schedule: {
        enabled: true,
        frequency: 'hourly',
        time: '00:00',
        dayOfWeek: null,
      },
    },
    {
      id: 'conn_002',
      name: 'Oracle NetSuite',
      type: 'netsuite',
      status: 'connected',
      lastSync: '2024-12-20T14:15:00Z',
      nextSync: '2024-12-20T15:15:00Z',
      syncFrequency: 'hourly',
      syncDirection: 'inbound',
      totalSyncs: 890,
      successRate: 98.5,
      lastSyncDuration: '1m 45s',
      itemsSynced: 8750,
      errors: 5,
      warnings: 8,
      version: 'NetSuite 2024.2',
      url: 'https://system.netsuite.com',
      credentials: {
        accountId: '1234567',
        consumerKey: '*******',
        authType: 'oauth',
      },
      mapping: {
        products: 'product',
        inventory: 'inventoryitem',
        stocktake: 'customrecord_stocktake',
      },
      schedule: {
        enabled: true,
        frequency: 'hourly',
        time: '15',
        dayOfWeek: null,
      },
    },
    {
      id: 'conn_003',
      name: 'Microsoft Dynamics 365',
      type: 'dynamics',
      status: 'error',
      lastSync: '2024-12-20T13:00:00Z',
      nextSync: '2024-12-20T14:00:00Z',
      syncFrequency: 'hourly',
      syncDirection: 'outbound',
      totalSyncs: 560,
      successRate: 95.2,
      lastSyncDuration: '3m 12s',
      itemsSynced: 5420,
      errors: 12,
      warnings: 5,
      version: 'Dynamics 365 Finance',
      url: 'https://yourorg.crm.dynamics.com',
      credentials: {
        clientId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        tenantId: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy',
        authType: 'oauth2',
      },
      mapping: {
        products: 'products',
        inventory: 'inventories',
        stocktake: 'stocktakes',
      },
      schedule: {
        enabled: true,
        frequency: 'hourly',
        time: '00',
        dayOfWeek: null,
      },
      lastError: 'Authentication token expired',
    },
    {
      id: 'conn_004',
      name: 'SAP Business One',
      type: 'sap',
      status: 'disconnected',
      lastSync: '2024-12-19T10:00:00Z',
      nextSync: null,
      syncFrequency: 'daily',
      syncDirection: 'bidirectional',
      totalSyncs: 320,
      successRate: 97.8,
      lastSyncDuration: '4m 20s',
      itemsSynced: 3850,
      errors: 4,
      warnings: 6,
      version: 'SAP Business One 10.0',
      url: 'https://b1.enterprise.com:50000',
      credentials: {
        username: 'integration',
        authType: 'basic',
      },
      mapping: {
        products: 'OITM',
        inventory: 'OINM',
        stocktake: 'OIGN',
      },
      schedule: {
        enabled: false,
        frequency: 'daily',
        time: '02:00',
        dayOfWeek: null,
      },
    },
    {
      id: 'conn_005',
      name: 'QuickBooks Online',
      type: 'quickbooks',
      status: 'connected',
      lastSync: '2024-12-20T15:45:00Z',
      nextSync: '2024-12-20T16:45:00Z',
      syncFrequency: 'hourly',
      syncDirection: 'inbound',
      totalSyncs: 450,
      successRate: 99.8,
      lastSyncDuration: '45s',
      itemsSynced: 3250,
      errors: 1,
      warnings: 3,
      version: 'QuickBooks Online v3',
      url: 'https://quickbooks.api.intuit.com',
      credentials: {
        clientId: 'xxxxxxxxxxxxxxxxxx',
        clientSecret: '*******',
        realmId: '123456789',
        authType: 'oauth2',
      },
      mapping: {
        products: 'Item',
        inventory: 'Inventory',
        stocktake: 'CustomField',
      },
      schedule: {
        enabled: true,
        frequency: 'hourly',
        time: '45',
        dayOfWeek: null,
      },
    },
  ];

  // Sync history data
  const syncHistory = [
    { id: 1, date: '2024-12-20T15:30:00Z', status: 'success', itemsSynced: 12450, duration: '2m 34s', errors: 0 },
    { id: 2, date: '2024-12-20T14:30:00Z', status: 'success', itemsSynced: 12450, duration: '2m 28s', errors: 0 },
    { id: 3, date: '2024-12-20T13:30:00Z', status: 'success', itemsSynced: 12448, duration: '2m 42s', errors: 2 },
    { id: 4, date: '2024-12-20T12:30:00Z', status: 'error', itemsSynced: 8230, duration: '1m 15s', errors: 5, error: 'Connection timeout' },
    { id: 5, date: '2024-12-20T11:30:00Z', status: 'success', itemsSynced: 12450, duration: '2m 31s', errors: 0 },
  ];

  // ERP Types configuration
  const erpTypes = [
    { id: 'sap', name: 'SAP', icon: Database, color: 'bg-blue-100 text-blue-700' },
    { id: 'netsuite', name: 'Oracle NetSuite', icon: Cloud, color: 'bg-orange-100 text-orange-700' },
    { id: 'dynamics', name: 'Microsoft Dynamics', icon: Server, color: 'bg-green-100 text-green-700' },
    { id: 'quickbooks', name: 'QuickBooks', icon: Database, color: 'bg-purple-100 text-purple-700' },
    { id: 'salesforce', name: 'Salesforce', icon: Cloud, color: 'bg-cyan-100 text-cyan-700' },
    { id: 'custom', name: 'Custom API', icon: Code, color: 'bg-gray-100 text-gray-700' },
  ];

  const statusConfig = {
    connected: { label: 'Connected', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    disconnected: { label: 'Disconnected', color: 'bg-gray-100 text-gray-700', icon: XCircle },
    error: { label: 'Error', color: 'bg-red-100 text-red-700', icon: AlertCircle },
    syncing: { label: 'Syncing', color: 'bg-blue-100 text-blue-700', icon: RefreshCw },
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.disconnected;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={10} />
        {config.label}
      </Badge>
    );
  };

  const getErpTypeBadge = (type) => {
    const config = erpTypes.find(t => t.id === type);
    if (!config) return <Badge variant="outline">{type}</Badge>;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={10} />
        {config.name}
      </Badge>
    );
  };

  // Filter connections
  const filteredConnections = erpConnections.filter(conn => {
    const matchesSearch = 
      conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || conn.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalConnections: erpConnections.length,
    activeConnections: erpConnections.filter(c => c.status === 'connected').length,
    totalSyncsToday: 124,
    successRate: 98.5,
    itemsSyncedToday: 45680,
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

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    // Simulate sync progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setSyncProgress(i);
    }
    
    setIsSyncing(false);
    setSyncProgress(0);
  };

  const handleTestConnection = () => {
    setShowTestDialog(true);
  };

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">ERP Integration</h1>
            <p className="text-black/50 text-sm mt-1">
              Connect and synchronize inventory data with your ERP systems
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#F5EEE9] gap-2"
              onClick={handleTestConnection}
            >
              <Zap size={16} />
              Test Connection
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus size={16} />
              Add Integration
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Connections</p>
                  <p className="text-xl font-bold text-black">{stats.totalConnections}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Database size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Connections</p>
                  <p className="text-xl font-bold text-green-600">{stats.activeConnections}</p>
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
                  <p className="text-xs text-black/50">Total Syncs Today</p>
                  <p className="text-xl font-bold text-blue-600">{stats.totalSyncsToday}</p>
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
                  <p className="text-xs text-black/50">Success Rate</p>
                  <p className="text-xl font-bold text-emerald-600">{stats.successRate}%</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-full">
                  <TrendingUp size={18} className="text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#F5EEE9] mb-6">
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="sync-status">Sync Status</TabsTrigger>
            <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
            <TabsTrigger value="logs">Sync Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="space-y-4">
            {/* Filters */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
                  <Input
                    placeholder="Search connections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-[#F5EEE9] focus:border-red-600"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[130px] border-[#F5EEE9]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="connected">Connected</SelectItem>
                    <SelectItem value="disconnected">Disconnected</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                  <FilterIcon size={16} />
                </Button>
              </div>
            </div>

            {/* Connections Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredConnections.map((connection) => (
                <Card key={connection.id} className="border-[#F5EEE9] hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          connection.type === 'sap' ? "bg-blue-100" :
                          connection.type === 'netsuite' ? "bg-orange-100" :
                          connection.type === 'dynamics' ? "bg-green-100" :
                          "bg-purple-100"
                        )}>
                          <Database size={20} className="text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{connection.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getErpTypeBadge(connection.type)}
                            {getStatusBadge(connection.status)}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedConnection(connection);
                            setShowEditDialog(true);
                          }}>
                            <Edit size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedConnection(connection);
                            setShowSyncDialog(true);
                          }}>
                            <RefreshCw size={14} className="mr-2" />
                            Sync Now
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedConnection(connection);
                            setShowMappingDialog(true);
                          }}>
                            <Settings size={14} className="mr-2" />
                            Field Mapping
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 size={14} className="mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-black/50">Last Sync</p>
                          <div className="flex items-center gap-1 mt-1">
                            <ClockIcon size={12} className="text-black/40" />
                            <span>{formatDate(connection.lastSync)}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Next Sync</p>
                          <div className="flex items-center gap-1 mt-1">
                            <CalendarIcon size={12} className="text-black/40" />
                            <span>{formatDate(connection.nextSync)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-black/50">Sync Direction</p>
                          <Badge variant="outline" className="mt-1">
                            {connection.syncDirection === 'bidirectional' ? '↔️ Bi-directional' :
                             connection.syncDirection === 'inbound' ? '⬇️ Inbound' : '⬆️ Outbound'}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Success Rate</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-medium">{connection.successRate}%</span>
                            <Progress value={connection.successRate} className="h-1.5 flex-1" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Package size={12} className="text-black/40" />
                          <span>{connection.itemsSynced.toLocaleString()} items synced</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon size={12} className="text-black/40" />
                          <span>{connection.lastSyncDuration}</span>
                        </div>
                      </div>

                      {connection.status === 'error' && connection.lastError && (
                        <div className="p-2 bg-red-50 rounded-lg flex items-start gap-2">
                          <AlertCircle size={12} className="text-red-600 mt-0.5" />
                          <p className="text-xs text-red-600">{connection.lastError}</p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedConnection(connection);
                            setShowSyncDialog(true);
                          }}
                        >
                          <RefreshCw size={12} className="mr-1" />
                          Sync Now
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedConnection(connection);
                            setShowLogsDialog(true);
                          }}
                        >
                          <History size={12} className="mr-1" />
                          Logs
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredConnections.length === 0 && (
              <Card className="border-[#F5EEE9]">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Database size={48} className="text-black/20 mb-3" />
                  <p className="text-black/50">No ERP connections found</p>
                  <p className="text-xs text-black/40 mt-1">Add your first ERP integration to get started</p>
                  <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setShowAddDialog(true)}>
                    <Plus size={14} className="mr-2" />
                    Add Integration
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sync-status" className="space-y-6">
            {/* Sync Dashboard */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="border-[#F5EEE9]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Sync Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-green-600 mt-1">All running normally</p>
                </CardContent>
              </Card>
              <Card className="border-[#F5EEE9]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending Syncs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-yellow-600 mt-1">Waiting in queue</p>
                </CardContent>
              </Card>
              <Card className="border-[#F5EEE9]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Failed Syncs (24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-red-600 mt-1">Needs attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Sync Progress */}
            {isSyncing && (
              <Card className="border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <RefreshCw size={16} className="animate-spin text-red-600" />
                      <span className="font-medium">Synchronizing with SAP Production...</span>
                    </div>
                    <span className="text-sm">{syncProgress}%</span>
                  </div>
                  <Progress value={syncProgress} className="h-2" />
                  <p className="text-xs text-black/50 mt-2">Syncing inventory data (12,450 items)</p>
                </CardContent>
              </Card>
            )}

            {/* Connection Sync Status Table */}
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Connection Sync Status</CardTitle>
                <CardDescription>Real-time sync status for all connections</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5EEE9]/30">
                      <TableHead>Connection</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {erpConnections.map((conn) => (
                      <TableRow key={conn.id}>
                        <TableCell className="font-medium">{conn.name}</TableCell>
                        <TableCell>{getErpTypeBadge(conn.type)}</TableCell>
                        <TableCell>{getStatusBadge(conn.status)}</TableCell>
                        <TableCell className="text-sm">{formatDate(conn.lastSync)}</TableCell>
                        <TableCell className="text-sm">{conn.lastSyncDuration}</TableCell>
                        <TableCell className="text-sm">{conn.itemsSynced.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600"
                            onClick={() => {
                              setSelectedConnection(conn);
                              setShowSyncDialog(true);
                            }}
                          >
                            <RefreshCw size={14} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-6">
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Field Mapping Configuration</CardTitle>
                <CardDescription>
                  Map AccuCount fields to your ERP system fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Label>Select Connection</Label>
                    <Select>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Choose ERP connection" />
                      </SelectTrigger>
                      <SelectContent>
                        {erpConnections.map(conn => (
                          <SelectItem key={conn.id} value={conn.id}>
                            {conn.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="border border-[#F5EEE9] rounded-lg p-4">
                      <h3 className="font-semibold mb-3">AccuCount Fields</h3>
                      <div className="space-y-2">
                        {['Product SKU', 'Product Name', 'Quantity', 'Location', 'Category', 'Unit Cost'].map((field, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 hover:bg-[#F5EEE9] rounded">
                            <span className="text-sm">{field}</span>
                            <ArrowRight size={14} className="text-black/40" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border border-[#F5EEE9] rounded-lg p-4">
                      <h3 className="font-semibold mb-3">ERP Fields</h3>
                      <div className="space-y-2">
                        {['ITEMCODE', 'ITEMNAME', 'ONHAND', 'WAREHOUSE', 'ITEMSGROUP', 'PRICE'].map((field, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 hover:bg-[#F5EEE9] rounded">
                            <span className="text-sm font-mono">{field}</span>
                            <Button variant="ghost" size="sm" className="h-6 text-red-600">
                              Map
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Info size={14} className="text-blue-600" />
                      <span className="text-sm text-blue-700">Custom Mapping</span>
                    </div>
                    <p className="text-xs text-blue-600/70 mt-1">
                      Define custom field mappings for advanced synchronization requirements.
                    </p>
                  </div>

                  <Button className="bg-red-600 hover:bg-red-700">
                    <Save size={14} className="mr-2" />
                    Save Mapping Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Connection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Connections</SelectItem>
                    {erpConnections.map(conn => (
                      <SelectItem key={conn.id} value={conn.id}>{conn.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download size={14} className="mr-1" />
                  Export Logs
                </Button>
              </div>
            </div>

            <Card className="border-[#F5EEE9]">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5EEE9]/30">
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Connection</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items Synced</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Errors</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {syncHistory.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm">{new Date(log.date).toLocaleString()}</TableCell>
                        <TableCell>SAP Production</TableCell>
                        <TableCell>
                          <Badge className={log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {log.status === 'success' ? 'Success' : 'Failed'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{log.itemsSynced.toLocaleString()}</TableCell>
                        <TableCell className="text-sm">{log.duration}</TableCell>
                        <TableCell className="text-sm text-red-600">{log.errors}</TableCell>
                        <TableCell>
                          {log.error && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <AlertCircle size={14} className="text-red-500 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>{log.error}</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Connection Dialog */}
      <Dialog open={showAddDialog || showEditDialog} onOpenChange={(open) => {
        if (!open) {
          setShowAddDialog(false);
          setShowEditDialog(false);
        }
      }}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{showAddDialog ? 'Add ERP Integration' : 'Edit ERP Connection'}</DialogTitle>
            <DialogDescription>
              Configure connection settings for your ERP system
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Connection Name</Label>
              <Input placeholder="e.g., SAP Production" defaultValue={selectedConnection?.name} />
            </div>

            <div className="space-y-2">
              <Label>ERP Type</Label>
              <Select defaultValue={selectedConnection?.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ERP system" />
                </SelectTrigger>
                <SelectContent>
                  {erpTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>API URL / Endpoint</Label>
              <Input placeholder="https://your-erp.com/api" defaultValue={selectedConnection?.url} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input placeholder="Username" defaultValue={selectedConnection?.credentials?.username} />
              </div>
              <div className="space-y-2">
                <Label>Password / API Key</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sync Frequency</Label>
              <Select defaultValue={selectedConnection?.syncFrequency || 'hourly'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sync Direction</Label>
              <Select defaultValue={selectedConnection?.syncDirection || 'bidirectional'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbound">Inbound (ERP → AccuCount)</SelectItem>
                  <SelectItem value="outbound">Outbound (AccuCount → ERP)</SelectItem>
                  <SelectItem value="bidirectional">Bi-directional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label>Enable Automatic Sync</Label>
              <Switch defaultChecked={selectedConnection?.schedule?.enabled} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddDialog(false);
              setShowEditDialog(false);
            }}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              {showAddDialog ? 'Add Connection' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sync Dialog */}
      <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Manual Sync</DialogTitle>
            <DialogDescription>
              {selectedConnection?.name} - Start synchronization now
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Info size={14} className="text-blue-600" />
                <span className="text-sm text-blue-700">Sync Details</span>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <p>Direction: {selectedConnection?.syncDirection}</p>
                <p>Items to sync: ~{selectedConnection?.itemsSynced?.toLocaleString()}</p>
                <p>Estimated time: 2-3 minutes</p>
              </div>
            </div>

            {isSyncing ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Syncing...</span>
                  <span className="text-sm">{syncProgress}%</span>
                </div>
                <Progress value={syncProgress} className="h-2" />
              </div>
            ) : (
              <div className="flex gap-3">
                <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleSync}>
                  <RefreshCw size={14} className="mr-2" />
                  Start Sync
                </Button>
                <Button variant="outline" className="flex-1">
                  <Settings size={14} className="mr-2" />
                  Advanced Options
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSyncDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Connection Dialog */}
      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Test Connection</DialogTitle>
            <DialogDescription>
              Verify connectivity to your ERP system
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Connection to Test</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an ERP connection" />
                </SelectTrigger>
                <SelectContent>
                  {erpConnections.map(conn => (
                    <SelectItem key={conn.id} value={conn.id}>{conn.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700">
              <Zap size={14} className="mr-2" />
              Run Test
            </Button>

            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-600" />
                <span className="text-sm text-green-700">Connection Successful</span>
              </div>
              <p className="text-xs text-green-600/70 mt-1">
                Response time: 234ms • API version: 2.0
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTestDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mapping Dialog */}
      <Dialog open={showMappingDialog} onOpenChange={setShowMappingDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Field Mapping</DialogTitle>
            <DialogDescription>
              {selectedConnection?.name} - Configure field mappings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#F5EEE9] rounded-lg p-3">
                <h4 className="font-medium text-sm mb-2">AccuCount Field</h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sku">SKU</SelectItem>
                    <SelectItem value="name">Product Name</SelectItem>
                    <SelectItem value="quantity">Quantity</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border border-[#F5EEE9] rounded-lg p-3">
                <h4 className="font-medium text-sm mb-2">ERP Field</h4>
                <Input placeholder="ERP field name" />
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full">
              <Plus size={14} className="mr-1" />
              Add Mapping
            </Button>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-[#F5EEE9] rounded">
                <span className="text-sm">SKU</span>
                <ArrowRight size={14} className="text-black/40" />
                <span className="text-sm font-mono">ITEMCODE</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-600">
                  <Trash2 size={12} />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#F5EEE9] rounded">
                <span className="text-sm">Product Name</span>
                <ArrowRight size={14} className="text-black/40" />
                <span className="text-sm font-mono">ITEMNAME</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-600">
                  <Trash2 size={12} />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#F5EEE9] rounded">
                <span className="text-sm">Quantity</span>
                <ArrowRight size={14} className="text-black/40" />
                <span className="text-sm font-mono">ONHAND</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-600">
                  <Trash2 size={12} />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMappingDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Save size={14} className="mr-2" />
              Save Mappings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logs Dialog */}
      <Dialog open={showLogsDialog} onOpenChange={setShowLogsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sync Logs</DialogTitle>
            <DialogDescription>
              {selectedConnection?.name} - Recent synchronization history
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            {syncHistory.map((log, idx) => (
              <div key={idx} className="p-3 border border-[#F5EEE9] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {log.status === 'success' ? (
                      <CheckCircle size={14} className="text-green-600" />
                    ) : (
                      <XCircle size={14} className="text-red-600" />
                    )}
                    <span className="font-medium">{new Date(log.date).toLocaleString()}</span>
                  </div>
                  <Badge className={log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {log.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-black/50">Items Synced</p>
                    <p>{log.itemsSynced.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-black/50">Duration</p>
                    <p>{log.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-black/50">Errors</p>
                    <p className="text-red-600">{log.errors}</p>
                  </div>
                </div>
                {log.error && (
                  <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-600">
                    {log.error}
                  </div>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogsDialog(false)}>
              Close
            </Button>
            <Button variant="outline">
              <Download size={14} className="mr-2" />
              Export Logs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ErpIntegrationPage;