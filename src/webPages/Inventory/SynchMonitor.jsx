// app/dashboard/sync-monitor/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  Activity,
  Zap,
  Database,
  Download,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Settings,
  FileText,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Filter,
  Search,
  BarChart3,
  Clock as ClockIcon,
  Gauge,
  Link2,
  PowerOff,
  Radio,
  Warehouse,
  ShoppingCart,
  Truck,
  CreditCard,
  Users,
  
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SyncMonitorPage = () => {
  const [viewMode, setViewMode] = useState('dashboard');
  const [selectedSystem, setSelectedSystem] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showRetryDialog, setShowRetryDialog] = useState(false);
  const [showLogsDialog, setShowLogsDialog] = useState(false);
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [timeRange, setTimeRange] = useState('1h');

  // Sample sync connections data
  const syncConnections = [
    {
      id: 'CONN-001',
      name: 'ERP System - SAP',
      type: 'erp',
      system: 'SAP S/4HANA',
      status: 'active',
      health: 'healthy',
      lastSync: '2024-03-15 14:32:45',
      nextSync: '2024-03-15 14:35:00',
      syncInterval: '5 minutes',
      direction: 'bidirectional',
      protocol: 'REST API',
      version: '2.1.0',
      recordsSynced: 15234,
      pendingRecords: 23,
      failedRecords: 2,
      successRate: 99.8,
      latency: 245,
      throughput: 1250,
      errorCount: 2,
      warningCount: 3,
      connectionString: 'https://sap-prod.example.com/api',
      authentication: 'OAuth 2.0',
      lastError: null,
      tags: ['production', 'erp', 'sap'],
      metrics: {
        avgResponseTime: 187,
        peakThroughput: 2450,
        errorRate: 0.2,
        uptime: 99.95,
      },
    },
    {
      id: 'CONN-002',
      name: 'WMS - Manhattan Associates',
      type: 'wms',
      system: 'Manhattan WMS',
      status: 'active',
      health: 'healthy',
      lastSync: '2024-03-15 14:33:12',
      nextSync: '2024-03-15 14:38:00',
      syncInterval: '5 minutes',
      direction: 'bidirectional',
      protocol: 'SOAP',
      version: '3.0.1',
      recordsSynced: 23456,
      pendingRecords: 45,
      failedRecords: 1,
      successRate: 99.9,
      latency: 312,
      throughput: 890,
      errorCount: 1,
      warningCount: 2,
      connectionString: 'https://wms-prod.example.com/ws',
      authentication: 'Certificate',
      lastError: null,
      tags: ['production', 'wms', 'manhattan'],
      metrics: {
        avgResponseTime: 278,
        peakThroughput: 1870,
        errorRate: 0.1,
        uptime: 99.98,
      },
    },
    {
      id: 'CONN-003',
      name: 'E-Commerce - Shopify',
      type: 'ecommerce',
      system: 'Shopify Plus',
      status: 'active',
      health: 'degraded',
      lastSync: '2024-03-15 14:30:22',
      nextSync: '2024-03-15 14:35:00',
      syncInterval: '5 minutes',
      direction: 'bidirectional',
      protocol: 'GraphQL',
      version: '2024-01',
      recordsSynced: 8765,
      pendingRecords: 156,
      failedRecords: 12,
      successRate: 97.5,
      latency: 1450,
      throughput: 320,
      errorCount: 12,
      warningCount: 8,
      connectionString: 'https://shopify-prod.myshopify.com/api',
      authentication: 'API Key',
      lastError: 'Rate limit exceeded - retrying',
      tags: ['production', 'ecommerce', 'shopify'],
      metrics: {
        avgResponseTime: 890,
        peakThroughput: 1200,
        errorRate: 2.5,
        uptime: 98.5,
      },
    },
    {
      id: 'CONN-004',
      name: 'IoT Gateway - Fleet Trackers',
      type: 'iot',
      system: 'Azure IoT Hub',
      status: 'active',
      health: 'healthy',
      lastSync: '2024-03-15 14:34:01',
      nextSync: '2024-03-15 14:35:30',
      syncInterval: '1 minute',
      direction: 'inbound',
      protocol: 'MQTT',
      version: '3.1.1',
      recordsSynced: 45678,
      pendingRecords: 12,
      failedRecords: 0,
      successRate: 100.0,
      latency: 45,
      throughput: 3400,
      errorCount: 0,
      warningCount: 0,
      connectionString: 'mqtt://iot-hub.azure.net:8883',
      authentication: 'SAS Token',
      lastError: null,
      tags: ['production', 'iot', 'azure'],
      metrics: {
        avgResponseTime: 32,
        peakThroughput: 5600,
        errorRate: 0.0,
        uptime: 99.99,
      },
    },
    {
      id: 'CONN-005',
      name: 'Supplier Portal - Tech Supplies',
      type: 'supplier',
      system: 'EDI Gateway',
      status: 'active',
      health: 'healthy',
      lastSync: '2024-03-15 14:32:55',
      nextSync: '2024-03-15 15:00:00',
      syncInterval: '30 minutes',
      direction: 'outbound',
      protocol: 'SFTP',
      version: '2.0',
      recordsSynced: 3421,
      pendingRecords: 34,
      failedRecords: 0,
      successRate: 100.0,
      latency: 567,
      throughput: 45,
      errorCount: 0,
      warningCount: 1,
      connectionString: 'sftp://supplier.example.com:22/inbound',
      authentication: 'SSH Key',
      lastError: null,
      tags: ['production', 'supplier', 'edi'],
      metrics: {
        avgResponseTime: 423,
        peakThroughput: 120,
        errorRate: 0.0,
        uptime: 99.5,
      },
    },
    {
      id: 'CONN-006',
      name: 'Payment Gateway - Stripe',
      type: 'payment',
      system: 'Stripe API',
      status: 'error',
      health: 'critical',
      lastSync: '2024-03-15 14:25:00',
      nextSync: '2024-03-15 14:35:00',
      syncInterval: '5 minutes',
      direction: 'bidirectional',
      protocol: 'REST API',
      version: '2024-02',
      recordsSynced: 8923,
      pendingRecords: 234,
      failedRecords: 45,
      successRate: 89.5,
      latency: 3250,
      throughput: 0,
      errorCount: 45,
      warningCount: 12,
      connectionString: 'https://api.stripe.com/v1',
      authentication: 'Secret Key',
      lastError: 'Authentication failed: Invalid API key',
      tags: ['production', 'payment', 'stripe'],
      metrics: {
        avgResponseTime: 2340,
        peakThroughput: 890,
        errorRate: 10.5,
        uptime: 85.2,
      },
    },
    {
      id: 'CONN-007',
      name: 'Inventory Database - PostgreSQL',
      type: 'database',
      system: 'PostgreSQL 15',
      status: 'active',
      health: 'healthy',
      lastSync: '2024-03-15 14:34:30',
      nextSync: '2024-03-15 14:35:00',
      syncInterval: '30 seconds',
      direction: 'bidirectional',
      protocol: 'JDBC',
      version: '42.5.0',
      recordsSynced: 56789,
      pendingRecords: 5,
      failedRecords: 0,
      successRate: 100.0,
      latency: 12,
      throughput: 5600,
      errorCount: 0,
      warningCount: 0,
      connectionString: 'jdbc:postgresql://db-prod:5432/inventory',
      authentication: 'Username/Password',
      lastError: null,
      tags: ['production', 'database', 'postgres'],
      metrics: {
        avgResponseTime: 8,
        peakThroughput: 8900,
        errorRate: 0.0,
        uptime: 100.0,
      },
    },
    {
      id: 'CONN-008',
      name: 'CRM - Salesforce',
      type: 'crm',
      system: 'Salesforce',
      status: 'warning',
      health: 'degraded',
      lastSync: '2024-03-15 14:30:15',
      nextSync: '2024-03-15 14:35:00',
      syncInterval: '5 minutes',
      direction: 'bidirectional',
      protocol: 'REST API',
      version: 'v58.0',
      recordsSynced: 12345,
      pendingRecords: 89,
      failedRecords: 3,
      successRate: 98.2,
      latency: 890,
      throughput: 230,
      errorCount: 3,
      warningCount: 7,
      connectionString: 'https://na1.salesforce.com/services/data/v58.0',
      authentication: 'OAuth 2.0',
      lastError: 'API limit approaching (85%)',
      tags: ['production', 'crm', 'salesforce'],
      metrics: {
        avgResponseTime: 670,
        peakThroughput: 450,
        errorRate: 1.8,
        uptime: 97.8,
      },
    },
    {
      id: 'CONN-009',
      name: 'Analytics - BigQuery',
      type: 'analytics',
      system: 'Google BigQuery',
      status: 'active',
      health: 'healthy',
      lastSync: '2024-03-15 14:33:45',
      nextSync: '2024-03-15 14:38:00',
      syncInterval: '5 minutes',
      direction: 'outbound',
      protocol: 'gRPC',
      version: 'v2',
      recordsSynced: 23456,
      pendingRecords: 67,
      failedRecords: 0,
      successRate: 100.0,
      latency: 234,
      throughput: 890,
      errorCount: 0,
      warningCount: 2,
      connectionString: 'bigquery://google-cloud-platform',
      authentication: 'Service Account',
      lastError: null,
      tags: ['production', 'analytics', 'bigquery'],
      metrics: {
        avgResponseTime: 187,
        peakThroughput: 2340,
        errorRate: 0.0,
        uptime: 99.9,
      },
    },
    {
      id: 'CONN-010',
      name: 'Test ERP - SAP Sandbox',
      type: 'erp',
      system: 'SAP S/4HANA',
      status: 'inactive',
      health: 'offline',
      lastSync: '2024-03-14 23:00:00',
      nextSync: 'Never',
      syncInterval: 'Manual',
      direction: 'bidirectional',
      protocol: 'REST API',
      version: '2.0',
      recordsSynced: 2345,
      pendingRecords: 0,
      failedRecords: 0,
      successRate: 100.0,
      latency: 0,
      throughput: 0,
      errorCount: 0,
      warningCount: 0,
      connectionString: 'https://sap-test.example.com/api',
      authentication: 'OAuth 2.0',
      lastError: null,
      tags: ['test', 'erp', 'sap'],
      metrics: {
        avgResponseTime: 0,
        peakThroughput: 0,
        errorRate: 0,
        uptime: 0,
      },
    },
  ];

  // Sync logs
  const syncLogs = [
    {
      id: 'LOG-001',
      connectionId: 'CONN-001',
      connectionName: 'ERP System - SAP',
      timestamp: '2024-03-15 14:32:45',
      status: 'success',
      recordsProcessed: 234,
      duration: 3450,
      message: 'Sync completed successfully',
    },
    {
      id: 'LOG-002',
      connectionId: 'CONN-001',
      connectionName: 'ERP System - SAP',
      timestamp: '2024-03-15 14:27:45',
      status: 'success',
      recordsProcessed: 189,
      duration: 3120,
      message: 'Sync completed successfully',
    },
    {
      id: 'LOG-003',
      connectionId: 'CONN-003',
      connectionName: 'E-Commerce - Shopify',
      timestamp: '2024-03-15 14:30:22',
      status: 'warning',
      recordsProcessed: 156,
      duration: 5890,
      message: 'Rate limit approaching - 85%',
    },
    {
      id: 'LOG-004',
      connectionId: 'CONN-003',
      connectionName: 'E-Commerce - Shopify',
      timestamp: '2024-03-15 14:25:22',
      status: 'error',
      recordsProcessed: 0,
      duration: 2300,
      message: 'Rate limit exceeded - retrying',
    },
    {
      id: 'LOG-005',
      connectionId: 'CONN-006',
      connectionName: 'Payment Gateway - Stripe',
      timestamp: '2024-03-15 14:25:00',
      status: 'error',
      recordsProcessed: 0,
      duration: 4500,
      message: 'Authentication failed: Invalid API key',
    },
    {
      id: 'LOG-006',
      connectionId: 'CONN-008',
      connectionName: 'CRM - Salesforce',
      timestamp: '2024-03-15 14:30:15',
      status: 'warning',
      recordsProcessed: 89,
      duration: 4230,
      message: 'API limit approaching (85%)',
    },
    {
      id: 'LOG-007',
      connectionId: 'CONN-002',
      connectionName: 'WMS - Manhattan Associates',
      timestamp: '2024-03-15 14:33:12',
      status: 'success',
      recordsProcessed: 312,
      duration: 2890,
      message: 'Sync completed successfully',
    },
    {
      id: 'LOG-008',
      connectionId: 'CONN-004',
      connectionName: 'IoT Gateway - Fleet Trackers',
      timestamp: '2024-03-15 14:34:01',
      status: 'success',
      recordsProcessed: 567,
      duration: 1200,
      message: 'Sync completed successfully',
    },
  ];

  // System types
  const systemTypes = [
    { id: 'all', name: 'All Systems' },
    { id: 'erp', name: 'ERP', icon: Database },
    { id: 'wms', name: 'WMS', icon: Warehouse },
    { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingCart },
    { id: 'iot', name: 'IoT', icon: Radio },
    { id: 'supplier', name: 'Supplier', icon: Truck },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'crm', name: 'CRM', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: PowerOff },
    warning: { label: 'Warning', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    error: { label: 'Error', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
  };

  const healthConfig = {
    healthy: { label: 'Healthy', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    degraded: { label: 'Degraded', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle },
    critical: { label: 'Critical', color: 'bg-red-100 text-red-700', icon: AlertCircle },
    offline: { label: 'Offline', color: 'bg-gray-100 text-gray-700', icon: PowerOff },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || PowerOff;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getHealthColor = (health) => {
    return healthConfig[health]?.color || 'bg-gray-100 text-gray-700';
  };

  const getDirectionIcon = (direction) => {
    switch(direction) {
      case 'inbound': return <ArrowDown size={14} className="text-blue-600" />;
      case 'outbound': return <ArrowUp size={14} className="text-green-600" />;
      case 'bidirectional': return <ArrowUpDown size={14} className="text-purple-600" />;
      default: return <RefreshCw size={14} />;
    }
  };

  const filteredConnections = syncConnections.filter(conn => {
    const matchesSystem = selectedSystem === 'all' || conn.type === selectedSystem;
    const matchesStatus = selectedStatus === 'all' || conn.status === selectedStatus;
    const matchesSearch = conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conn.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conn.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesSystem && matchesStatus && matchesSearch;
  });

  const stats = {
    total: syncConnections.length,
    active: syncConnections.filter(c => c.status === 'active').length,
    warning: syncConnections.filter(c => c.status === 'warning').length,
    error: syncConnections.filter(c => c.status === 'error').length,
    inactive: syncConnections.filter(c => c.status === 'inactive').length,
    totalRecords: syncConnections.reduce((sum, c) => sum + c.recordsSynced, 0),
    pendingRecords: syncConnections.reduce((sum, c) => sum + c.pendingRecords, 0),
    failedRecords: syncConnections.reduce((sum, c) => sum + c.failedRecords, 0),
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Real-time Sync Monitor</h1>
            <p className="text-black/50 mt-1">Monitor and manage data synchronization across all integrated systems</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#F5EEE9] rounded-lg px-3 py-1.5">
              <Activity size={16} className="text-red-600" />
              <span className="text-sm font-medium text-black">
                {stats.active} Active / {stats.warning + stats.error} Issues
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
                id="auto-refresh"
              />
              <Label htmlFor="auto-refresh" className="text-sm">Auto-refresh</Label>
            </div>

            <Select value={refreshInterval.toString()} onValueChange={(v) => setRefreshInterval(parseInt(v))}>
              <SelectTrigger className="w-[100px] border-[#F5EEE9]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10s</SelectItem>
                <SelectItem value="30">30s</SelectItem>
                <SelectItem value="60">1m</SelectItem>
                <SelectItem value="300">5m</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="border-[#F5EEE9]"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw size={16} className={cn(isRefreshing && "animate-spin")} />
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowSettingsDialog(true)}
            >
              <Settings size={16} />
              Configure
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Connections</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Link2 size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.active}</p>
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
                  <p className="text-xs text-black/50">Warning</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.warning}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <AlertTriangle size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Error</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.error}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Records Synced</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalRecords.toLocaleString()}</p>
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
                  <p className="text-xs text-black/50">Pending/Failed</p>
                  <p className="text-xl font-bold text-black mt-1">
                    {stats.pendingRecords}/{stats.failedRecords}
                  </p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Clock size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* View Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="mb-6">
        <TabsList className="bg-[#F5EEE9]">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
            <Gauge size={16} className="mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="connections" className="data-[state=active]:bg-white">
            <Link2 size={16} className="mr-2" />
            Connections
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-white">
            <FileText size={16} className="mr-2" />
            Sync Logs
          </TabsTrigger>
          <TabsTrigger value="metrics" className="data-[state=active]:bg-white">
            <BarChart3 size={16} className="mr-2" />
            Metrics
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-white">
            <AlertCircle size={16} className="mr-2" />
            Alerts
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Dashboard View */}
      {viewMode === 'dashboard' && (
        <div className="space-y-6">
          {/* System Health Overview */}
          <div className="grid grid-cols-4 gap-4">
            {['erp', 'wms', 'ecommerce', 'iot'].map((type) => {
              const typeConnections = syncConnections.filter(c => c.type === type);
              const activeCount = typeConnections.filter(c => c.status === 'active').length;
              const warningCount = typeConnections.filter(c => c.status === 'warning').length;
              const errorCount = typeConnections.filter(c => c.status === 'error').length;
              const typeConfig = systemTypes.find(t => t.id === type);
              const Icon = typeConfig?.icon || Database;
              
              return (
                <Card key={type} className="border-[#F5EEE9]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#F5EEE9] rounded-lg">
                        <Icon size={20} className="text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-black">{typeConfig?.name}</p>
                        <p className="text-xs text-black/50">{typeConnections.length} connections</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-black/50">Active</p>
                        <p className="text-lg font-bold text-green-600">{activeCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Warning</p>
                        <p className="text-lg font-bold text-yellow-600">{warningCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Error</p>
                        <p className="text-lg font-bold text-red-600">{errorCount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sync Performance Chart */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Sync Performance (Last 24 Hours)</CardTitle>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[120px] border-[#F5EEE9]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="6h">Last 6 Hours</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-[#F5EEE9] rounded-lg flex items-center justify-center">
                <BarChart3 size={48} className="text-black/30" />
                <span className="text-sm text-black/50 ml-2">Performance chart would appear here</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sync Activity */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-[#F5EEE9]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recent Sync Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {syncLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-2 hover:bg-[#F5EEE9]/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        {log.status === 'success' && <CheckCircle size={16} className="text-green-600" />}
                        {log.status === 'warning' && <AlertTriangle size={16} className="text-yellow-600" />}
                        {log.status === 'error' && <AlertCircle size={16} className="text-red-600" />}
                        <div>
                          <p className="text-sm font-medium text-black">{log.connectionName}</p>
                          <p className="text-xs text-black/50">{log.message}</p>
                        </div>
                      </div>
                      <span className="text-xs text-black/50">{log.timestamp.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#F5EEE9] p-3">
                <Button variant="ghost" size="sm" className="w-full" onClick={() => setViewMode('logs')}>
                  View All Logs
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-[#F5EEE9]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">System Health Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {syncConnections.filter(c => c.status !== 'active').slice(0, 5).map((conn) => (
                    <div key={conn.id} className="flex items-center justify-between p-2 hover:bg-[#F5EEE9]/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        {conn.status === 'warning' && <AlertTriangle size={16} className="text-yellow-600" />}
                        {conn.status === 'error' && <AlertCircle size={16} className="text-red-600" />}
                        {conn.status === 'inactive' && <PowerOff size={16} className="text-gray-600" />}
                        <div>
                          <p className="text-sm font-medium text-black">{conn.name}</p>
                          <p className="text-xs text-black/50">{conn.lastError || `${conn.pendingRecords} pending records`}</p>
                        </div>
                      </div>
                      <Badge className={cn("text-xs", getStatusColor(conn.status))}>
                        {conn.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#F5EEE9] p-3">
                <Button variant="ghost" size="sm" className="w-full" onClick={() => setViewMode('alerts')}>
                  View All Alerts
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {/* Connections View */}
      {viewMode === 'connections' && (
        <>
          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
                <Input
                  placeholder="Search connections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#F5EEE9] focus:border-red-600"
                />
              </div>

              <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                <SelectTrigger className="w-[150px] border-[#F5EEE9]">
                  <SelectValue placeholder="System Type" />
                </SelectTrigger>
                <SelectContent>
                  {systemTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
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
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                <Filter size={16} />
              </Button>
            </div>
          </div>

          {/* Connections Grid */}
          <div className="grid grid-cols-3 gap-4">
            {filteredConnections.map((conn) => {
              const StatusIcon = statusConfig[conn.status]?.icon || PowerOff;
              const HealthIcon = healthConfig[conn.health]?.icon || CheckCircle;
              const TypeIcon = systemTypes.find(t => t.id === conn.type)?.icon || Database;
              
              return (
                <Card key={conn.id} className="border-[#F5EEE9] hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "p-2 rounded-lg",
                          conn.status === 'active' && conn.health === 'healthy' && "bg-green-100",
                          conn.status === 'warning' && "bg-yellow-100",
                          conn.status === 'error' && "bg-red-100",
                          conn.status === 'inactive' && "bg-gray-100",
                        )}>
                          <TypeIcon size={18} className={cn(
                            conn.status === 'active' && conn.health === 'healthy' && "text-green-700",
                            conn.status === 'warning' && "text-yellow-700",
                            conn.status === 'error' && "text-red-700",
                            conn.status === 'inactive' && "text-gray-700",
                          )} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{conn.name}</h3>
                          <p className="text-xs text-black/50">{conn.system}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedConnection(conn);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync Now
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Disable
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Status Badges */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={cn("text-xs border-0", getStatusColor(conn.status))}>
                        <StatusIcon className="mr-1" size={10} />
                        {conn.status}
                      </Badge>
                      <Badge className={cn("text-xs border-0", getHealthColor(conn.health))}>
                        <HealthIcon className="mr-1" size={10} />
                        {conn.health}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-black/50">
                        {getDirectionIcon(conn.direction)}
                        <span className="capitalize">{conn.direction}</span>
                      </div>
                    </div>

                    {/* Sync Info */}
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Last Sync</span>
                        <span className="font-medium text-black">{conn.lastSync.split(' ')[1]}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Next Sync</span>
                        <span className="font-medium text-black">{conn.nextSync.split(' ')[1]}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Interval</span>
                        <span className="font-medium text-black">{conn.syncInterval}</span>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center p-2 bg-[#F5EEE9]/30 rounded-lg">
                        <p className="text-xs text-black/50">Records</p>
                        <p className="text-sm font-bold text-black">{conn.recordsSynced.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2 bg-[#F5EEE9]/30 rounded-lg">
                        <p className="text-xs text-black/50">Pending</p>
                        <p className="text-sm font-bold text-yellow-600">{conn.pendingRecords}</p>
                      </div>
                      <div className="text-center p-2 bg-[#F5EEE9]/30 rounded-lg">
                        <p className="text-xs text-black/50">Failed</p>
                        <p className="text-sm font-bold text-red-600">{conn.failedRecords}</p>
                      </div>
                    </div>

                    {/* Success Rate */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Success Rate</span>
                        <span className="text-xs font-medium">{conn.successRate}%</span>
                      </div>
                      <Progress 
                        value={conn.successRate} 
                        className="h-1.5 bg-[#F5EEE9]"
                        style={{ 
                          '--progress-background': 
                            conn.successRate >= 99 ? '#22c55e' :
                            conn.successRate >= 95 ? '#eab308' :
                            '#ef4444'
                        }}
                      />
                    </div>

                    {/* Error Message */}
                    {conn.lastError && (
                      <div className="p-2 bg-red-50 rounded-lg text-xs text-red-600 flex items-start gap-1">
                        <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
                        <span>{conn.lastError}</span>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {conn.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9] bg-[#F5EEE9]/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Logs View */}
      {viewMode === 'logs' && (
        <Card className="border-[#F5EEE9]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Sync Logs</CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="24h">
                  <SelectTrigger className="w-[120px] border-[#F5EEE9]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="6h">Last 6 Hours</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                  <Download size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                  <TableHead className="text-black/50">Timestamp</TableHead>
                  <TableHead className="text-black/50">Connection</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50 text-right">Records</TableHead>
                  <TableHead className="text-black/50 text-right">Duration</TableHead>
                  <TableHead className="text-black/50">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {syncLogs.map((log) => (
                  <TableRow key={log.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                    <TableCell className="font-medium">{log.connectionName}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "text-xs border-0",
                        log.status === 'success' && "bg-green-50 text-green-700",
                        log.status === 'warning' && "bg-yellow-50 text-yellow-700",
                        log.status === 'error' && "bg-red-50 text-red-700",
                      )}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{log.recordsProcessed}</TableCell>
                    <TableCell className="text-right">{(log.duration / 1000).toFixed(2)}s</TableCell>
                    <TableCell className="max-w-md truncate">{log.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-[#F5EEE9] p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-black/50">Showing {syncLogs.length} logs</p>
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

      {/* Metrics View */}
      {viewMode === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-[#F5EEE9]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Gauge size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Avg Latency</p>
                    <p className="text-2xl font-bold text-black">
                      {Math.round(syncConnections.reduce((sum, c) => sum + c.latency, 0) / syncConnections.length)}ms
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#F5EEE9]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-full">
                    <Zap size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Avg Throughput</p>
                    <p className="text-2xl font-bold text-black">
                      {Math.round(syncConnections.reduce((sum, c) => sum + c.throughput, 0) / syncConnections.length)}/s
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#F5EEE9]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <CheckCircle size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Avg Success Rate</p>
                    <p className="text-2xl font-bold text-black">
                      {(syncConnections.reduce((sum, c) => sum + c.successRate, 0) / syncConnections.length).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle className="text-base">Latency by Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {syncConnections.slice(0, 6).map((conn) => (
                    <div key={conn.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-black">{conn.name}</span>
                        <span className="text-sm font-medium">{conn.latency}ms</span>
                      </div>
                      <Progress 
                        value={(conn.latency / 1000) * 100} 
                        className="h-1.5 bg-[#F5EEE9]"
                        style={{ '--progress-background': conn.latency > 500 ? '#ef4444' : '#22c55e' }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle className="text-base">Throughput by Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {syncConnections.slice(0, 6).map((conn) => (
                    <div key={conn.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-black">{conn.name}</span>
                        <span className="text-sm font-medium">{conn.throughput}/s</span>
                      </div>
                      <Progress 
                        value={(conn.throughput / 5000) * 100} 
                        className="h-1.5 bg-[#F5EEE9]"
                        style={{ '--progress-background': '#3b82f6' }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Alerts View */}
      {viewMode === 'alerts' && (
        <Card className="border-[#F5EEE9]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                  <TableHead className="text-black/50">Severity</TableHead>
                  <TableHead className="text-black/50">Connection</TableHead>
                  <TableHead className="text-black/50">Alert</TableHead>
                  <TableHead className="text-black/50">Time</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {syncConnections.filter(c => c.status === 'warning' || c.status === 'error').map((conn) => (
                  <TableRow key={conn.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Badge className={cn(
                        "text-xs border-0",
                        conn.status === 'error' && "bg-red-50 text-red-700",
                        conn.status === 'warning' && "bg-yellow-50 text-yellow-700",
                      )}>
                        {conn.status === 'error' ? 'Critical' : 'Warning'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{conn.name}</TableCell>
                    <TableCell>{conn.lastError || `${conn.failedRecords} failed records`}</TableCell>
                    <TableCell>{conn.lastSync.split(' ')[1]}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(conn.status))}>
                        {conn.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Eye size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Connection Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Connection Details: {selectedConnection?.name}</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="config">Config</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-black/50">System</p>
                    <p className="font-medium">{selectedConnection?.system}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Type</p>
                    <p className="font-medium capitalize">{selectedConnection?.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Protocol</p>
                    <p className="font-medium">{selectedConnection?.protocol}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Version</p>
                    <p className="font-medium">{selectedConnection?.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Authentication</p>
                    <p className="font-medium">{selectedConnection?.authentication}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Connection String</p>
                    <p className="font-mono text-xs">{selectedConnection?.connectionString}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm text-black/50">Avg Response Time</p>
                      <p className="text-2xl font-bold">{selectedConnection?.metrics.avgResponseTime}ms</p>
                    </CardContent>
                  </Card>
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm text-black/50">Peak Throughput</p>
                      <p className="text-2xl font-bold">{selectedConnection?.metrics.peakThroughput}/s</p>
                    </CardContent>
                  </Card>
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm text-black/50">Error Rate</p>
                      <p className="text-2xl font-bold text-red-600">{selectedConnection?.metrics.errorRate}%</p>
                    </CardContent>
                  </Card>
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm text-black/50">Uptime</p>
                      <p className="text-2xl font-bold text-green-600">{selectedConnection?.metrics.uptime}%</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="logs">
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {syncLogs.filter(l => l.connectionId === selectedConnection?.id).map((log) => (
                      <div key={log.id} className="p-3 border border-[#F5EEE9] rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-black/50">{log.timestamp}</span>
                          <Badge className={cn(
                            "text-xs",
                            log.status === 'success' && "bg-green-50 text-green-700",
                            log.status === 'warning' && "bg-yellow-50 text-yellow-700",
                            log.status === 'error' && "bg-red-50 text-red-700",
                          )}>
                            {log.status}
                          </Badge>
                        </div>
                        <p className="text-sm">{log.message}</p>
                        <p className="text-xs text-black/50 mt-1">
                          {log.recordsProcessed} records • {(log.duration / 1000).toFixed(2)}s
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="config">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black/50">Sync Interval</span>
                    <span className="font-medium">{selectedConnection?.syncInterval}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black/50">Direction</span>
                    <span className="font-medium capitalize">{selectedConnection?.direction}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black/50">Retry Policy</span>
                    <span className="font-medium">3 retries, exponential backoff</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black/50">Timeout</span>
                    <span className="font-medium">30 seconds</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
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
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw size={20} className={cn(isRefreshing && "animate-spin")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Refresh</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowSettingsDialog(true)}
              >
                <Settings size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowLogsDialog(true)}
              >
                <FileText size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">View Logs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SyncMonitorPage;