// app/dashboard/api-keys/page.js
'use client';

import { useState, useMemo } from 'react';
import {
  Key,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Download,

  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Activity,
  Shield,
  RefreshCcw,
  Edit,
  Link2,
  Copy as CopyIcon,
  Check,

  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Zap,

  Database as DatabaseIcon,

  BookOpen,

} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Checkbox } from '@/components/ui/checkbox';

const ApiKeysPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);
  const [showUsageDialog, setShowUsageDialog] = useState(false);
  const [showDocsDialog, setShowDocsDialog] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState(null);
  const [showKeyValue, setShowKeyValue] = useState({});
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState(['read']);
  const [newKeyExpiry, setNewKeyExpiry] = useState('30');
  const [generatedKey, setGeneratedKey] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Mock API Keys Data
  const apiKeys = [
    {
      id: 'key_1a2b3c4d5e',
      name: 'Production API Key',
      key: 'accu_live_8f7g6h5j4k3l2m1n',
      maskedKey: 'accu_live_••••••••••••••',
      status: 'active',
      createdAt: '2024-12-01T10:00:00Z',
      lastUsed: '2024-12-20T15:30:00Z',
      expiresAt: '2025-12-01T10:00:00Z',
      permissions: ['read', 'write', 'delete'],
      environments: ['production'],
      rateLimit: 1000,
      rateLimitUsed: 342,
      rateLimitRemaining: 658,
      totalCalls: 15420,
      lastIp: '192.168.1.100',
      userAgent: 'ERP Integration v2.0',
      description: 'Main production API key for ERP integration',
      webhookUrl: 'https://api.accucount.com/webhook/prod',
      createdAt: '2024-12-01',
    },
    {
      id: 'key_2b3c4d5e6f',
      name: 'Staging API Key',
      key: 'accu_staging_9h8g7f6d5s4a3z2x',
      maskedKey: 'accu_staging_••••••••••••••',
      status: 'active',
      createdAt: '2024-11-15T14:30:00Z',
      lastUsed: '2024-12-19T11:20:00Z',
      expiresAt: '2025-11-15T14:30:00Z',
      permissions: ['read', 'write'],
      environments: ['staging'],
      rateLimit: 500,
      rateLimitUsed: 89,
      rateLimitRemaining: 411,
      totalCalls: 3420,
      lastIp: '192.168.1.101',
      userAgent: 'Development Testing',
      description: 'Staging environment for testing',
      webhookUrl: 'https://api.accucount.com/webhook/staging',
      createdAt: '2024-11-15',
    },
    {
      id: 'key_3c4d5e6f7g',
      name: 'Mobile App Key',
      key: 'accu_mobile_7y6u5t4r3e2w1q',
      maskedKey: 'accu_mobile_••••••••••••••',
      status: 'active',
      createdAt: '2024-10-20T09:15:00Z',
      lastUsed: '2024-12-20T14:45:00Z',
      expiresAt: '2025-10-20T09:15:00Z',
      permissions: ['read'],
      environments: ['production'],
      rateLimit: 2000,
      rateLimitUsed: 1245,
      rateLimitRemaining: 755,
      totalCalls: 45670,
      lastIp: '203.0.113.45',
      userAgent: 'AccuCount Mobile App v3.2',
      description: 'Mobile application integration',
      webhookUrl: null,
      createdAt: '2024-10-20',
    },
    {
      id: 'key_4d5e6f7g8h',
      name: 'Analytics Integration',
      key: 'accu_analytics_4r3e2w1q0p9o8i',
      maskedKey: 'accu_analytics_••••••••••••••',
      status: 'expired',
      createdAt: '2024-01-15T11:00:00Z',
      lastUsed: '2024-12-01T08:30:00Z',
      expiresAt: '2024-12-15T11:00:00Z',
      permissions: ['read'],
      environments: ['production'],
      rateLimit: 5000,
      rateLimitUsed: 0,
      rateLimitRemaining: 0,
      totalCalls: 123450,
      lastIp: '198.51.100.78',
      userAgent: 'Analytics Dashboard v1.0',
      description: 'Integration with external analytics platform',
      webhookUrl: 'https://analytics.company.com/webhook',
      createdAt: '2024-01-15',
    },
    {
      id: 'key_5e6f7g8h9i',
      name: 'Testing Key',
      key: 'accu_test_8u7y6t5r4e3w2q1',
      maskedKey: 'accu_test_••••••••••••••',
      status: 'revoked',
      createdAt: '2024-09-10T16:20:00Z',
      lastUsed: '2024-11-30T22:15:00Z',
      expiresAt: '2025-09-10T16:20:00Z',
      permissions: ['read', 'write'],
      environments: ['development'],
      rateLimit: 100,
      rateLimitUsed: 0,
      rateLimitRemaining: 0,
      totalCalls: 2340,
      lastIp: '192.168.1.200',
      userAgent: 'Automated Testing',
      description: 'Automated testing - revoked due to security review',
      webhookUrl: null,
      createdAt: '2024-09-10',
    },
    {
      id: 'key_6f7g8h9i0j',
      name: 'Warehouse Scanner API',
      key: 'accu_scanner_7u6y5t4r3e2w1q0',
      maskedKey: 'accu_scanner_••••••••••••••',
      status: 'active',
      createdAt: '2024-12-05T08:00:00Z',
      lastUsed: '2024-12-20T16:30:00Z',
      expiresAt: '2025-12-05T08:00:00Z',
      permissions: ['read', 'write'],
      environments: ['production'],
      rateLimit: 3000,
      rateLimitUsed: 234,
      rateLimitRemaining: 2766,
      totalCalls: 8760,
      lastIp: '10.0.0.45',
      userAgent: 'Warehouse Scanner v1.5',
      description: 'API key for warehouse barcode scanners',
      webhookUrl: 'https://scanner.warehouse.local/webhook',
      createdAt: '2024-12-05',
    },
  ];

  // Permission options
  const permissionOptions = [
    { id: 'read', label: 'Read', description: 'View data and resources' },
    { id: 'write', label: 'Write', description: 'Create and modify resources' },
    { id: 'delete', label: 'Delete', description: 'Remove resources' },
    { id: 'admin', label: 'Admin', description: 'Full administrative access' },
  ];

  const environmentOptions = [
    { id: 'development', label: 'Development', color: 'bg-gray-100 text-gray-700' },
    { id: 'staging', label: 'Staging', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'production', label: 'Production', color: 'bg-green-100 text-green-700' },
  ];

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    expired: { label: 'Expired', color: 'bg-red-100 text-red-700', icon: XCircle },
    revoked: { label: 'Revoked', color: 'bg-gray-100 text-gray-700', icon: AlertCircle },
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={10} />
        {config.label}
      </Badge>
    );
  };

  const getPermissionBadges = (permissions) => {
    return permissions.map(perm => (
      <Badge key={perm} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        {perm}
      </Badge>
    ));
  };

  const getEnvironmentBadge = (environments) => {
    return environments.map(env => {
      const config = environmentOptions.find(e => e.id === env);
      return (
        <Badge key={env} className={cn("border-0", config?.color)}>
          {config?.label || env}
        </Badge>
      );
    });
  };

  const toggleShowKey = (keyId) => {
    setShowKeyValue(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const handleCopyKey = async (keyValue) => {
    await navigator.clipboard.writeText(keyValue);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleCreateKey = () => {
    // Mock key generation
    const newKey = {
      id: `key_${Math.random().toString(36).substring(2, 15)}`,
      name: newKeyName,
      key: `accu_${Math.random().toString(36).substring(2, 20)}`,
      maskedKey: `accu_••••••••••••••`,
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + parseInt(newKeyExpiry) * 24 * 60 * 60 * 1000).toISOString(),
      permissions: newKeyPermissions,
      environments: ['production'],
      rateLimit: 1000,
      rateLimitUsed: 0,
      rateLimitRemaining: 1000,
      totalCalls: 0,
      description: `API key for ${newKeyName}`,
    };
    setGeneratedKey(newKey);
    setShowCreateDialog(false);
  };

  const handleRegenerateKey = () => {
    // Mock key regeneration
    const regeneratedKey = {
      ...selectedApiKey,
      key: `accu_${Math.random().toString(36).substring(2, 20)}`,
      maskedKey: `accu_••••••••••••••`,
      regeneratedAt: new Date().toISOString(),
    };
    setGeneratedKey(regeneratedKey);
    setShowRegenerateDialog(false);
  };

  // Filter API keys
  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = 
      key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || key.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalKeys: apiKeys.length,
    activeKeys: apiKeys.filter(k => k.status === 'active').length,
    totalCalls: apiKeys.reduce((sum, k) => sum + k.totalCalls, 0),
    avgRateLimit: Math.round(apiKeys.reduce((sum, k) => sum + k.rateLimitRemaining, 0) / apiKeys.length),
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">API Keys</h1>
            <p className="text-black/50 text-sm mt-1">
              Manage API keys for integrating with external applications and services
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#F5EEE9] gap-2"
              onClick={() => setShowDocsDialog(true)}
            >
              <BookOpen size={16} />
              Documentation
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create API Key
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total API Keys</p>
                  <p className="text-xl font-bold text-black">{stats.totalKeys}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Key size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Keys</p>
                  <p className="text-xl font-bold text-green-600">{stats.activeKeys}</p>
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
                  <p className="text-xs text-black/50">Total API Calls</p>
                  <p className="text-xl font-bold text-blue-600">{stats.totalCalls.toLocaleString()}</p>
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
                  <p className="text-xs text-black/50">Avg. Rate Limit Left</p>
                  <p className="text-xl font-bold text-purple-600">{stats.avgRateLimit.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Zap size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
              <Input
                placeholder="Search API keys by name or description..."
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
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
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

        {/* API Keys List */}
        <div className="space-y-4">
          {filteredKeys.map((apiKey) => (
            <Card key={apiKey.id} className="border-[#F5EEE9] hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <Key size={18} className="text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-lg">{apiKey.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          {getStatusBadge(apiKey.status)}
                          {getEnvironmentBadge(apiKey.environments)}
                          <span className="text-xs text-black/40 font-mono">{apiKey.id}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-black/70 mb-3">{apiKey.description}</p>

                    {/* API Key Display */}
                    <div className="bg-[#F5EEE9] rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          <code className="text-sm font-mono text-black/80">
                            {showKeyValue[apiKey.id] ? apiKey.key : apiKey.maskedKey}
                          </code>
                        </div>
                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => toggleShowKey(apiKey.id)}
                                >
                                  {showKeyValue[apiKey.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>{showKeyValue[apiKey.id] ? 'Hide' : 'Show'}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleCopyKey(apiKey.key)}
                                >
                                  {copySuccess ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Copy key</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>

                    {/* Key Details Grid */}
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-black/50">Created</p>
                        <div className="flex items-center gap-1 mt-1">
                          <CalendarIcon size={12} className="text-black/40" />
                          <span>{formatDate(apiKey.createdAt)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Expires</p>
                        <div className="flex items-center gap-1 mt-1">
                          <ClockIcon size={12} className="text-black/40" />
                          <span>{formatDate(apiKey.expiresAt)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Last Used</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Activity size={12} className="text-black/40" />
                          <span>{formatDate(apiKey.lastUsed)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Total Calls</p>
                        <p className="font-medium mt-1">{apiKey.totalCalls.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Rate Limit Progress */}
                    {apiKey.status === 'active' && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-black/50">Rate Limit Usage</span>
                          <span className="text-black/70">
                            {apiKey.rateLimitUsed} / {apiKey.rateLimit} ({Math.round((apiKey.rateLimitUsed / apiKey.rateLimit) * 100)}%)
                          </span>
                        </div>
                        <Progress 
                          value={(apiKey.rateLimitUsed / apiKey.rateLimit) * 100} 
                          className="h-1.5"
                        />
                      </div>
                    )}

                    {/* Permissions */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {getPermissionBadges(apiKey.permissions)}
                    </div>

                    {apiKey.webhookUrl && (
                      <div className="mt-3 text-xs text-black/50 flex items-center gap-1">
                        <Link2 size={10} />
                        <span>Webhook: {apiKey.webhookUrl}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-start gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedApiKey(apiKey);
                          setShowUsageDialog(true);
                        }}>
                          <Activity size={14} className="mr-2" />
                          View Usage
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedApiKey(apiKey);
                          setShowEditDialog(true);
                        }}>
                          <Edit size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedApiKey(apiKey);
                          setShowRegenerateDialog(true);
                        }}>
                          <RefreshCcw size={14} className="mr-2" />
                          Regenerate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => {
                          setSelectedApiKey(apiKey);
                          setShowDeleteDialog(true);
                        }}>
                          <Trash2 size={14} className="mr-2" />
                          Revoke
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredKeys.length === 0 && (
            <Card className="border-[#F5EEE9]">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Key size={48} className="text-black/20 mb-3" />
                <p className="text-black/50">No API keys found</p>
                <p className="text-xs text-black/40 mt-1">Create your first API key to start integrating</p>
                <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setShowCreateDialog(true)}>
                  <Plus size={14} className="mr-2" />
                  Create API Key
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create API Key Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>
              Generate a new API key for integrating with external applications
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Key Name *</Label>
              <Input
                placeholder="e.g., Production API Key, Mobile App Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe what this API key will be used for"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="flex flex-wrap gap-3">
                {permissionOptions.map(perm => (
                  <div key={perm.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`perm-${perm.id}`}
                      checked={newKeyPermissions.includes(perm.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewKeyPermissions([...newKeyPermissions, perm.id]);
                        } else {
                          setNewKeyPermissions(newKeyPermissions.filter(p => p !== perm.id));
                        }
                      }}
                    />
                    <Label htmlFor={`perm-${perm.id}`} className="text-sm">
                      {perm.label}
                      <span className="text-xs text-black/50 ml-1">({perm.description})</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Expires In</Label>
              <Select value={newKeyExpiry} onValueChange={setNewKeyExpiry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-blue-600" />
                <span className="text-sm text-blue-700">Security Tip</span>
              </div>
              <p className="text-xs text-blue-600/70 mt-1">
                Store your API key securely. You won't be able to see it again after closing this dialog.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleCreateKey}
              disabled={!newKeyName}
            >
              <Plus size={14} className="mr-2" />
              Generate Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generated Key Dialog */}
      <Dialog open={!!generatedKey} onOpenChange={() => setGeneratedKey(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>API Key Generated</DialogTitle>
            <DialogDescription>
              Your new API key has been created. Copy it now - you won't be able to see it again!
            </DialogDescription>
          </DialogHeader>

          {generatedKey && (
            <div className="space-y-4 py-4">
              <div className="bg-[#F5EEE9] rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono break-all">{generatedKey.key}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={() => handleCopyKey(generatedKey.key)}
                  >
                    {copySuccess ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black/50">Name</span>
                  <span className="font-medium">{generatedKey.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black/50">Permissions</span>
                  <span className="font-medium">{generatedKey.permissions.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black/50">Expires</span>
                  <span className="font-medium">{formatDate(generatedKey.expiresAt)}</span>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-yellow-600" />
                  <span className="text-sm text-yellow-700">Important</span>
                </div>
                <p className="text-xs text-yellow-600/70 mt-1">
                  Make sure to copy your API key now. For security reasons, it won't be shown again.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setGeneratedKey(null)}>
              I've Copied the Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Usage Dialog */}
      <Dialog open={showUsageDialog} onOpenChange={setShowUsageDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedApiKey && (
            <>
              <DialogHeader>
                <DialogTitle>API Key Usage: {selectedApiKey.name}</DialogTitle>
                <DialogDescription>
                  Usage statistics and call history
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Total Calls</p>
                    <p className="text-xl font-bold">{selectedApiKey.totalCalls.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Rate Limit</p>
                    <p className="text-xl font-bold">{selectedApiKey.rateLimit}/day</p>
                  </div>
                  <div className="text-center p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs text-black/50">Remaining</p>
                    <p className="text-xl font-bold text-green-600">{selectedApiKey.rateLimitRemaining}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Recent Activity</Label>
                  <div className="border border-[#F5EEE9] rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Last Used</span>
                      <span>{formatDate(selectedApiKey.lastUsed)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Last IP Address</span>
                      <code className="text-xs">{selectedApiKey.lastIp}</code>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>User Agent</span>
                      <span className="text-xs truncate max-w-[200px]">{selectedApiKey.userAgent}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Info size={14} className="text-blue-600" />
                    <span className="text-sm text-blue-700">Usage Tips</span>
                  </div>
                  <p className="text-xs text-blue-600/70 mt-1">
                    Monitor your API usage to ensure you don't exceed rate limits. Consider implementing caching for frequently accessed data.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowUsageDialog(false)}>
                  Close
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Download size={14} className="mr-2" />
                  Export Usage Report
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Regenerate Dialog */}
      <Dialog open={showRegenerateDialog} onOpenChange={setShowRegenerateDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Regenerate API Key</DialogTitle>
            <DialogDescription>
              This will invalidate the current key and generate a new one.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-3 bg-orange-50 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-orange-600" />
                <span className="text-sm text-orange-700">Warning</span>
              </div>
              <p className="text-xs text-orange-600/70 mt-1">
                Any applications using this key will lose access until updated with the new key.
              </p>
            </div>
            <p className="text-sm text-black/70">
              Are you sure you want to regenerate <strong>{selectedApiKey?.name}</strong>?
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRegenerateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleRegenerateKey}>
              <RefreshCcw size={14} className="mr-2" />
              Regenerate Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Revoke API Key</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The API key will be permanently revoked.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-black/70">
              Are you sure you want to revoke <strong>{selectedApiKey?.name}</strong>?
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>
              <Trash2 size={14} className="mr-2" />
              Revoke Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Documentation Dialog */}
      <Dialog open={showDocsDialog} onOpenChange={setShowDocsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>API Documentation</DialogTitle>
            <DialogDescription>
              Learn how to integrate with AccuCount API
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="p-4 bg-[#F5EEE9] rounded-lg">
                <h3 className="font-semibold mb-2">Base URL</h3>
                <code className="text-sm bg-white px-3 py-1 rounded">https://api.accucount.com/v1</code>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Rate Limits</h3>
                <p className="text-sm text-black/70">Rate limits vary by API key type:</p>
                <ul className="list-disc list-inside text-sm text-black/70 space-y-1">
                  <li>Production keys: 1,000 requests per minute</li>
                  <li>Staging keys: 500 requests per minute</li>
                  <li>Development keys: 100 requests per minute</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Response Format</h3>
                <p className="text-sm text-black/70">All responses are returned in JSON format.</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                  {`{
  "status": "success",
  "data": {
    "id": "inv_123",
    "sku": "SKU-001",
    "quantity": 100
  }
}`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Authentication Header</h3>
                <p className="text-sm text-black/70">Include your API key in the Authorization header:</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs">
                  Authorization: Bearer YOUR_API_KEY
                </pre>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">Example curl request:</p>
                <pre className="mt-2 text-xs bg-white p-2 rounded overflow-x-auto">
                  curl -X GET https://api.accucount.com/v1/inventory \
                    -H "Authorization: Bearer accu_live_8f7g6h5j4k3l2m1n"
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="border border-[#F5EEE9] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-100 text-green-700">GET</Badge>
                    <code>/inventory</code>
                  </div>
                  <p className="text-sm text-black/70">Retrieve inventory items</p>
                </div>
                <div className="border border-[#F5EEE9] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-100 text-blue-700">POST</Badge>
                    <code>/inventory/stocktake</code>
                  </div>
                  <p className="text-sm text-black/70">Create a new stocktake</p>
                </div>
                <div className="border border-[#F5EEE9] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-100 text-yellow-700">PUT</Badge>
                    <code>/inventory/{`{id}`}</code>
                  </div>
                  <p className="text-sm text-black/70">Update inventory item</p>
                </div>
                <div className="border border-[#F5EEE9] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-red-100 text-red-700">DELETE</Badge>
                    <code>/inventory/{`{id}`}</code>
                  </div>
                  <p className="text-sm text-black/70">Delete inventory item</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h3 className="font-semibold">Get Inventory Items</h3>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                  {`// JavaScript Example
fetch('https://api.accucount.com/v1/inventory', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                </pre>
                
                <h3 className="font-semibold mt-4">Create Stocktake</h3>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                  {`// Python Example
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

data = {
    'name': 'December Count',
    'location': 'Warehouse A',
    'items': ['SKU-001', 'SKU-002']
}

response = requests.post(
    'https://api.accucount.com/v1/inventory/stocktake',
    headers=headers,
    json=data
)`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowDocsDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Download size={14} className="mr-2" />
              Download Full Docs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Actions FAB */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Create API Key</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowDocsDialog(true)}
              >
                <BookOpen size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Documentation</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ApiKeysPage;