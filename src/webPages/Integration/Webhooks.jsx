// app/dashboard/webhooks/page.js
'use client';

import { useState, useMemo } from 'react';
import {
  Webhook,
  Plus,
  Trash2,
  Edit,
  Eye,
  MoreVertical,
  Search,
  Filter,
  RefreshCw,
  Play,
  Pause,
  StopCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Download,
  Upload,
  Settings,
  Copy,
  Check,
  Send,
  Mail,
  Bell,
  Zap,
  Shield,
  Lock,
  Unlock,
  Key,
  Globe,
  Server,
  Database,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  History,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Info,
  HelpCircle,
  ExternalLink,
  Link2,
  Unlink,
  Code,
  Terminal,
  BookOpen,
  TestTube,
  Flask,
  Bug,
  EyeOff,
  Eye as EyeIcon,
  Save,
  X,
  PlusCircle,
  MinusCircle,
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
  MoreHorizontal,
  WebhookIcon,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

const WebhooksPage = () => {
  const [activeTab, setActiveTab] = useState('webhooks');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showLogsDialog, setShowLogsDialog] = useState(false);
  const [showSecretDialog, setShowSecretDialog] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState(null);
  const [testPayload, setTestPayload] = useState('');
  const [testResponse, setTestResponse] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  // Mock Webhooks Data
  const webhooks = [
    {
      id: 'wh_001',
      name: 'Inventory Sync Webhook',
      url: 'https://api.myapp.com/webhooks/inventory',
      secret: 'whsec_abc123def456ghi789jkl',
      status: 'active',
      events: ['inventory.updated', 'inventory.created', 'inventory.deleted'],
      deliveryCount: 12450,
      successRate: 99.2,
      lastDelivery: '2024-12-20T15:30:00Z',
      lastError: null,
      createdAt: '2024-11-01T10:00:00Z',
      updatedAt: '2024-12-15T14:20:00Z',
      retryCount: 3,
      timeout: 5000,
      format: 'json',
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'webhook-001',
      },
      deliveries: [
        { id: 1, status: 'success', timestamp: '2024-12-20T15:30:00Z', duration: '234ms' },
        { id: 2, status: 'success', timestamp: '2024-12-20T14:30:00Z', duration: '198ms' },
        { id: 3, status: 'failed', timestamp: '2024-12-20T13:30:00Z', duration: '5000ms', error: 'Timeout' },
      ],
    },
    {
      id: 'wh_002',
      name: 'Stocktake Completion Webhook',
      url: 'https://api.myapp.com/webhooks/stocktake',
      secret: 'whsec_mno789pqr012stu345vwx',
      status: 'active',
      events: ['stocktake.completed', 'stocktake.started', 'stocktake.cancelled'],
      deliveryCount: 3420,
      successRate: 98.5,
      lastDelivery: '2024-12-20T14:15:00Z',
      lastError: 'Connection timeout',
      createdAt: '2024-11-15T14:30:00Z',
      updatedAt: '2024-12-18T09:15:00Z',
      retryCount: 3,
      timeout: 10000,
      format: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      deliveries: [
        { id: 1, status: 'success', timestamp: '2024-12-20T14:15:00Z', duration: '156ms' },
        { id: 2, status: 'success', timestamp: '2024-12-20T13:15:00Z', duration: '178ms' },
        { id: 3, status: 'failed', timestamp: '2024-12-20T12:15:00Z', duration: '10000ms', error: 'Connection timeout' },
      ],
    },
    {
      id: 'wh_003',
      name: 'Discrepancy Alert Webhook',
      url: 'https://alerts.company.com/webhook',
      secret: 'whsec_yza456bcd789efg012hij',
      status: 'inactive',
      events: ['discrepancy.created', 'discrepancy.resolved'],
      deliveryCount: 890,
      successRate: 100,
      lastDelivery: '2024-12-19T16:45:00Z',
      lastError: null,
      createdAt: '2024-12-01T09:00:00Z',
      updatedAt: '2024-12-19T16:45:00Z',
      retryCount: 5,
      timeout: 3000,
      format: 'json',
      headers: {
        'Content-Type': 'application/json',
        'X-Priority': 'high',
      },
      deliveries: [
        { id: 1, status: 'success', timestamp: '2024-12-19T16:45:00Z', duration: '89ms' },
        { id: 2, status: 'success', timestamp: '2024-12-19T15:45:00Z', duration: '92ms' },
      ],
    },
    {
      id: 'wh_004',
      name: 'Analytics Export Webhook',
      url: 'https://analytics.company.com/webhook/export',
      secret: 'whsec_klm345nop678qrs901tuv',
      status: 'error',
      events: ['analytics.export.completed', 'analytics.report.generated'],
      deliveryCount: 456,
      successRate: 85.5,
      lastDelivery: '2024-12-20T10:00:00Z',
      lastError: 'SSL certificate expired',
      createdAt: '2024-12-05T11:20:00Z',
      updatedAt: '2024-12-20T10:00:00Z',
      retryCount: 3,
      timeout: 15000,
      format: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      deliveries: [
        { id: 1, status: 'failed', timestamp: '2024-12-20T10:00:00Z', duration: '15000ms', error: 'SSL certificate expired' },
        { id: 2, status: 'success', timestamp: '2024-12-19T10:00:00Z', duration: '234ms' },
      ],
    },
    {
      id: 'wh_005',
      name: 'IoT Device Events Webhook',
      url: 'https://iot.company.com/webhook/events',
      secret: 'whsec_wxy678zab901cde234fgh',
      status: 'active',
      events: ['iot.device.connected', 'iot.device.disconnected', 'iot.device.error'],
      deliveryCount: 5670,
      successRate: 99.7,
      lastDelivery: '2024-12-20T15:45:00Z',
      lastError: null,
      createdAt: '2024-12-10T08:00:00Z',
      updatedAt: '2024-12-20T08:00:00Z',
      retryCount: 3,
      timeout: 5000,
      format: 'json',
      headers: {
        'Content-Type': 'application/json',
        'X-Source': 'accucount-iot',
      },
      deliveries: [
        { id: 1, status: 'success', timestamp: '2024-12-20T15:45:00Z', duration: '123ms' },
        { id: 2, status: 'success', timestamp: '2024-12-20T14:45:00Z', duration: '145ms' },
      ],
    },
  ];

  // Event types available for webhooks
  const eventTypes = [
    { id: 'inventory', label: 'Inventory Events', events: [
      { name: 'inventory.created', description: 'When a new inventory item is created' },
      { name: 'inventory.updated', description: 'When an inventory item is updated' },
      { name: 'inventory.deleted', description: 'When an inventory item is deleted' },
      { name: 'inventory.low_stock', description: 'When stock level falls below threshold' },
    ]},
    { id: 'stocktake', label: 'Stocktake Events', events: [
      { name: 'stocktake.started', description: 'When a stocktake is started' },
      { name: 'stocktake.completed', description: 'When a stocktake is completed' },
      { name: 'stocktake.cancelled', description: 'When a stocktake is cancelled' },
      { name: 'stocktake.in_progress', description: 'Stocktake progress updates' },
    ]},
    { id: 'discrepancy', label: 'Discrepancy Events', events: [
      { name: 'discrepancy.created', description: 'When a discrepancy is detected' },
      { name: 'discrepancy.resolved', description: 'When a discrepancy is resolved' },
      { name: 'discrepancy.updated', description: 'When a discrepancy is updated' },
    ]},
    { id: 'iot', label: 'IoT Events', events: [
      { name: 'iot.device.connected', description: 'When an IoT device connects' },
      { name: 'iot.device.disconnected', description: 'When an IoT device disconnects' },
      { name: 'iot.device.error', description: 'When an IoT device reports an error' },
      { name: 'iot.device.data', description: 'When IoT device sends data' },
    ]},
    { id: 'analytics', label: 'Analytics Events', events: [
      { name: 'analytics.export.completed', description: 'When an analytics export completes' },
      { name: 'analytics.report.generated', description: 'When a report is generated' },
    ]},
  ];

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-700', icon: Pause },
    error: { label: 'Error', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  };

  const deliveryStatusConfig = {
    success: { label: 'Success', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: XCircle },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={10} />
        {config.label}
      </Badge>
    );
  };

  const getDeliveryStatusBadge = (status) => {
    const config = deliveryStatusConfig[status] || deliveryStatusConfig.pending;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={10} />
        {config.label}
      </Badge>
    );
  };

  // Filter webhooks
  const filteredWebhooks = webhooks.filter(webhook => {
    const matchesSearch = 
      webhook.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webhook.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || webhook.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalWebhooks: webhooks.length,
    activeWebhooks: webhooks.filter(w => w.status === 'active').length,
    totalDeliveries: webhooks.reduce((sum, w) => sum + w.deliveryCount, 0),
    avgSuccessRate: Math.round(webhooks.reduce((sum, w) => sum + w.successRate, 0) / webhooks.length),
    failedDeliveries: webhooks.reduce((sum, w) => sum + w.deliveries.filter(d => d.status === 'failed').length, 0),
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

  const handleCopySecret = (secret) => {
    navigator.clipboard.writeText(secret);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleTestWebhook = () => {
    setIsTesting(true);
    setTimeout(() => {
      setTestResponse({
        status: 200,
        message: 'Webhook delivered successfully',
        duration: '234ms',
        timestamp: new Date().toISOString(),
      });
      setIsTesting(false);
    }, 1500);
  };

  const samplePayload = {
    event: 'inventory.updated',
    timestamp: new Date().toISOString(),
    data: {
      id: 'inv_123',
      sku: 'SKU-001',
      name: 'Wireless Headphones',
      quantity: 250,
      previous_quantity: 245,
      location: 'Warehouse A',
    }
  };

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Webhooks</h1>
            <p className="text-black/50 text-sm mt-1">
              Configure and manage webhooks for real-time event notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#F5EEE9] gap-2"
              onClick={() => setShowTestDialog(true)}
            >
              <TestTube size={16} />
              Test Tool
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create Webhook
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Webhooks</p>
                  <p className="text-xl font-bold text-black">{stats.totalWebhooks}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Webhook size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active</p>
                  <p className="text-xl font-bold text-green-600">{stats.activeWebhooks}</p>
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
                  <p className="text-xs text-black/50">Total Deliveries</p>
                  <p className="text-xl font-bold text-blue-600">{stats.totalDeliveries.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Send size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Success Rate</p>
                  <p className="text-xl font-bold text-emerald-600">{stats.avgSuccessRate}%</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-full">
                  <TrendingUp size={18} className="text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Failed Deliveries</p>
                  <p className="text-xl font-bold text-red-600">{stats.failedDeliveries}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <XCircle size={18} className="text-red-600" />
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
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="deliveries">Delivery Logs</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="webhooks" className="space-y-4">
            {/* Filters */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
                  <Input
                    placeholder="Search webhooks..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                  <Filter size={16} />
                </Button>
                <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                  <RefreshCw size={16} />
                </Button>
              </div>
            </div>

            {/* Webhooks Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredWebhooks.map((webhook) => (
                <Card key={webhook.id} className="border-[#F5EEE9] hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <Webhook size={20} className="text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{webhook.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(webhook.status)}
                            <span className="text-xs text-black/40 font-mono">{webhook.id}</span>
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
                            setSelectedWebhook(webhook);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye size={14} className="mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedWebhook(webhook);
                            setShowEditDialog(true);
                          }}>
                            <Edit size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedWebhook(webhook);
                            setShowTestDialog(true);
                          }}>
                            <TestTube size={14} className="mr-2" />
                            Test
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                            setSelectedWebhook(webhook);
                            setShowDeleteDialog(true);
                          }}>
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-black/50 mb-1">Endpoint URL</p>
                        <code className="text-xs bg-[#F5EEE9] p-1.5 rounded block truncate">
                          {webhook.url}
                        </code>
                      </div>

                      <div>
                        <p className="text-xs text-black/50 mb-1">Events</p>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.slice(0, 3).map((event, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                          {webhook.events.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{webhook.events.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-black/50">Deliveries</p>
                          <p className="font-medium">{webhook.deliveryCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Success Rate</p>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "font-medium",
                              webhook.successRate >= 99 ? "text-green-600" : 
                              webhook.successRate >= 95 ? "text-yellow-600" : "text-red-600"
                            )}>
                              {webhook.successRate}%
                            </span>
                            <Progress value={webhook.successRate} className="h-1.5 w-16" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-black/50">
                        <div className="flex items-center gap-1">
                          <ClockIcon size={12} />
                          <span>Last: {formatDate(webhook.lastDelivery)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity size={12} />
                          <span>Timeout: {webhook.timeout}ms</span>
                        </div>
                      </div>

                      {webhook.lastError && (
                        <div className="p-2 bg-red-50 rounded-lg flex items-start gap-2">
                          <AlertCircle size={12} className="text-red-600 mt-0.5" />
                          <p className="text-xs text-red-600">{webhook.lastError}</p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedWebhook(webhook);
                            setShowLogsDialog(true);
                          }}
                        >
                          <History size={12} className="mr-1" />
                          View Logs
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedWebhook(webhook);
                            setShowTestDialog(true);
                          }}
                        >
                          <TestTube size={12} className="mr-1" />
                          Test
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredWebhooks.length === 0 && (
              <Card className="border-[#F5EEE9]">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Webhook size={48} className="text-black/20 mb-3" />
                  <p className="text-black/50">No webhooks configured</p>
                  <p className="text-xs text-black/40 mt-1">Create your first webhook to start receiving events</p>
                  <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setShowCreateDialog(true)}>
                    <Plus size={14} className="mr-2" />
                    Create Webhook
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Available Events</CardTitle>
                <CardDescription>
                  Select which events trigger your webhooks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {eventTypes.map((category) => (
                    <AccordionItem key={category.id} value={category.id}>
                      <AccordionTrigger className="hover:bg-[#F5EEE9]/30 px-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-red-50 rounded">
                            <Bell size={14} className="text-red-600" />
                          </div>
                          <span className="font-medium">{category.label}</span>
                          <Badge variant="outline" className="ml-2">
                            {category.events.length} events
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pl-6">
                          {category.events.map((event) => (
                            <div key={event.name} className="flex items-start justify-between p-3 hover:bg-[#F5EEE9]/30 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <code className="text-sm font-mono text-red-600">{event.name}</code>
                                  <Badge variant="outline" className="text-xs">Webhook</Badge>
                                </div>
                                <p className="text-xs text-black/50 mt-1">{event.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" className="h-7 text-xs">
                                  <Eye size={12} className="mr-1" />
                                  Example
                                </Button>
                                <Switch />
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Sample Payload</CardTitle>
                <CardDescription>Example webhook payload structure</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                  {JSON.stringify(samplePayload, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deliveries" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select webhook" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Webhooks</SelectItem>
                    {webhooks.map(w => (
                      <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
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
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="border-[#F5EEE9]">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5EEE9]/30">
                      <TableHead>Time</TableHead>
                      <TableHead>Webhook</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Response</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {webhooks.flatMap(w => 
                      w.deliveries.map(d => ({
                        ...d,
                        webhookName: w.name,
                        webhookId: w.id,
                      }))
                    ).slice(0, 10).map((delivery, idx) => (
                      <TableRow key={idx} className="hover:bg-[#F5EEE9]/30">
                        <TableCell className="text-sm">{formatDate(delivery.timestamp)}</TableCell>
                        <TableCell className="font-medium">{delivery.webhookName}</TableCell>
                        <TableCell className="text-sm text-black/70">inventory.updated</TableCell>
                        <TableCell>{getDeliveryStatusBadge(delivery.status)}</TableCell>
                        <TableCell className="text-sm">{delivery.duration}</TableCell>
                        <TableCell>
                          {delivery.error ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <AlertCircle size={14} className="text-red-500 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>{delivery.error}</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <Badge className="bg-green-100 text-green-700">200 OK</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Webhook Security</CardTitle>
                <CardDescription>Best practices for securing your webhooks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-[#F5EEE9] rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield size={16} className="text-red-600" />
                    Verify Signatures
                  </h3>
                  <p className="text-sm text-black/70 mb-3">
                    All webhook payloads include a signature header that you can use to verify the request originated from AccuCount.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                    {`# Python example
import hmac
import hashlib

def verify_signature(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)`}
                  </pre>
                </div>

                <div className="p-4 bg-[#F5EEE9] rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Key size={16} className="text-red-600" />
                    Webhook Secrets
                  </h3>
                  <p className="text-sm text-black/70 mb-3">
                    Each webhook has a unique secret used to sign payloads. Keep this secret secure and never expose it in client-side code.
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="bg-white px-3 py-2 rounded text-sm font-mono flex-1">
                      whsec_••••••••••••••••••••••••••
                    </code>
                    <Button variant="outline" size="sm">
                      <Key size={14} className="mr-1" />
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-[#F5EEE9] rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Lock size={16} className="text-red-600" />
                    IP Whitelisting
                  </h3>
                  <p className="text-sm text-black/70 mb-3">
                    Our webhooks originate from the following IP addresses. Whitelist these in your firewall.
                  </p>
                  <div className="space-y-1">
                    <code className="block text-sm font-mono">34.120.45.123</code>
                    <code className="block text-sm font-mono">34.120.45.124</code>
                    <code className="block text-sm font-mono">34.120.45.125</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create/Edit Webhook Dialog */}
      <Dialog open={showCreateDialog || showEditDialog} onOpenChange={(open) => {
        if (!open) {
          setShowCreateDialog(false);
          setShowEditDialog(false);
        }
      }}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{showCreateDialog ? 'Create Webhook' : 'Edit Webhook'}</DialogTitle>
            <DialogDescription>
              Configure webhook endpoint and event subscriptions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Webhook Name</Label>
              <Input placeholder="e.g., Inventory Sync Webhook" />
            </div>

            <div className="space-y-2">
              <Label>Endpoint URL</Label>
              <Input placeholder="https://api.yourdomain.com/webhook" />
              <p className="text-xs text-black/50">Must be HTTPS for production use</p>
            </div>

            <div className="space-y-2">
              <Label>Events to Subscribe</Label>
              <ScrollArea className="h-[200px] border border-[#F5EEE9] rounded-lg p-2">
                {eventTypes.map((category) => (
                  <div key={category.id} className="mb-3">
                    <p className="font-medium text-sm mb-2">{category.label}</p>
                    <div className="space-y-1 pl-2">
                      {category.events.map((event) => (
                        <div key={event.name} className="flex items-center gap-2">
                          <Checkbox id={event.name} />
                          <Label htmlFor={event.name} className="text-sm cursor-pointer">
                            <code className="text-xs">{event.name}</code>
                            <span className="text-xs text-black/50 ml-2">{event.description}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Retry Attempts</Label>
                <Select defaultValue="3">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 attempt</SelectItem>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                    <SelectItem value="10">10 attempts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Timeout (ms)</Label>
                <Input type="number" defaultValue="5000" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Active</Label>
              <Switch defaultChecked />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowCreateDialog(false);
              setShowEditDialog(false);
            }}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              {showCreateDialog ? 'Create Webhook' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Webhook Dialog */}
      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Test Webhook</DialogTitle>
            <DialogDescription>
              {selectedWebhook ? `Testing: ${selectedWebhook.name}` : 'Send a test payload to your webhook endpoint'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedWebhook && (
              <div className="p-3 bg-[#F5EEE9] rounded-lg">
                <p className="text-sm font-medium mb-1">Endpoint</p>
                <code className="text-xs break-all">{selectedWebhook.url}</code>
              </div>
            )}

            <div className="space-y-2">
              <Label>Select Event Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inventory.created">inventory.created</SelectItem>
                  <SelectItem value="inventory.updated">inventory.updated</SelectItem>
                  <SelectItem value="stocktake.completed">stocktake.completed</SelectItem>
                  <SelectItem value="discrepancy.created">discrepancy.created</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Custom Payload (Optional)</Label>
              <Textarea
                rows={6}
                placeholder="Enter custom JSON payload"
                value={testPayload}
                onChange={(e) => setTestPayload(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            {testResponse && (
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-100 text-green-700">Status: {testResponse.status}</Badge>
                  <span className="text-xs text-green-600">{testResponse.duration}</span>
                </div>
                <p className="text-sm text-green-700">{testResponse.message}</p>
                <p className="text-xs text-green-600/70 mt-1">{formatDate(testResponse.timestamp)}</p>
              </div>
            )}

            <Button 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleTestWebhook}
              disabled={isTesting}
            >
              {isTesting ? (
                <>
                  <RefreshCw size={14} className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={14} className="mr-2" />
                  Send Test
                </>
              )}
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTestDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Webhook Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
          {selectedWebhook && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedWebhook.name}</span>
                  {getStatusBadge(selectedWebhook.status)}
                </DialogTitle>
                <DialogDescription>
                  {selectedWebhook.id} • Created {formatDate(selectedWebhook.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Endpoint URL</p>
                    <code className="text-xs break-all">{selectedWebhook.url}</code>
                  </div>
                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Secret</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono flex-1">••••••••••••••••</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowSecretDialog(true)}>
                        <Eye size={12} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-black/50 mb-2">Subscribed Events</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedWebhook.events.map((event, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-700">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Deliveries</p>
                    <p className="text-lg font-bold">{selectedWebhook.deliveryCount.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-2 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Success Rate</p>
                    <p className="text-lg font-bold text-green-600">{selectedWebhook.successRate}%</p>
                  </div>
                  <div className="text-center p-2 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Timeout</p>
                    <p className="text-lg font-bold">{selectedWebhook.timeout}ms</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Headers</p>
                  <div className="space-y-1">
                    {Object.entries(selectedWebhook.headers).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2 text-sm">
                        <code className="text-xs bg-[#F5EEE9] px-2 py-1 rounded">{key}</code>
                        <span>:</span>
                        <code className="text-xs">{value}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Recent Deliveries</p>
                  <div className="space-y-2">
                    {selectedWebhook.deliveries.slice(0, 5).map((delivery, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-[#F5EEE9] rounded-lg">
                        <div className="flex items-center gap-2">
                          {delivery.status === 'success' ? (
                            <CheckCircle size={12} className="text-green-600" />
                          ) : (
                            <XCircle size={12} className="text-red-600" />
                          )}
                          <span className="text-xs">{formatDate(delivery.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{delivery.duration}</span>
                          {delivery.error && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <AlertCircle size={12} className="text-red-500" />
                                </TooltipTrigger>
                                <TooltipContent>{delivery.error}</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => {
                  setShowDetailsDialog(false);
                  setShowTestDialog(true);
                }}>
                  <TestTube size={14} className="mr-2" />
                  Test Webhook
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Webhook</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The webhook will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-black/70">
              Are you sure you want to delete <strong>{selectedWebhook?.name}</strong>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>
              <Trash2 size={14} className="mr-2" />
              Delete Webhook
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Secret Dialog */}
      <Dialog open={showSecretDialog} onOpenChange={setShowSecretDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Webhook Secret</DialogTitle>
            <DialogDescription>
              Use this secret to verify webhook signatures
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <code className="text-sm font-mono break-all">{selectedWebhook?.secret}</code>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-3"
              onClick={() => handleCopySecret(selectedWebhook?.secret)}
            >
              {copiedSecret ? <Check size={14} className="mr-2" /> : <Copy size={14} className="mr-2" />}
              {copiedSecret ? 'Copied!' : 'Copy Secret'}
            </Button>
            <div className="p-3 bg-yellow-50 rounded-lg mt-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-yellow-600" />
                <span className="text-sm text-yellow-700">Security Warning</span>
              </div>
              <p className="text-xs text-yellow-600/70 mt-1">
                Keep this secret secure. Do not expose it in client-side code or public repositories.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSecretDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebhooksPage;