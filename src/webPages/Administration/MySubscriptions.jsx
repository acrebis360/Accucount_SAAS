// app/dashboard/administration/my-subscriptions/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  MoreVertical,
  Eye,
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  Home,
  ChevronRight,
  Building2,
  Ban,
  Settings,
  Headphones,
  
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Receipt,
  GraduationCap,
  Briefcase,
  CloudIcon
} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MySubscriptionsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBillingCycle, setSelectedBillingCycle] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [reactivateDialogOpen, setReactivateDialogOpen] = useState(false);
  const [changePlanDialogOpen, setChangePlanDialogOpen] = useState(false);
  const [updatePaymentDialogOpen, setUpdatePaymentDialogOpen] = useState(false);
  const [viewInvoicesDialogOpen, setViewInvoicesDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [activeTab, setActiveTab] = useState('active');

  // Mock data for subscription types
  const subscriptionTypes = [
    { id: 'all', name: 'All Types', count: 8, icon: CreditCard },
    { id: 'saas', name: 'SaaS Products', count: 4, icon: CloudIcon, color: 'blue' },
    { id: 'support', name: 'Support Plans', count: 2, icon: Headphones, color: 'green' },
    { id: 'training', name: 'Training', count: 1, icon: GraduationCap, color: 'purple' },
    { id: 'consulting', name: 'Consulting', count: 1, icon: Briefcase, color: 'orange' }
  ];

  // Mock data for billing cycles
  const billingCycles = [
    { id: 'monthly', name: 'Monthly', count: 5 },
    { id: 'quarterly', name: 'Quarterly', count: 1 },
    { id: 'annual', name: 'Annual', count: 2 }
  ];

  // Mock data for subscriptions
  const subscriptions = [
    {
      id: 'SUB-001',
      name: 'ACCUCOUNT Enterprise Suite',
      type: 'saas',
      plan: 'Enterprise',
      status: 'active',
      billingCycle: 'annual',
      amount: 24000,
      currency: 'USD',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-12-31T23:59:59Z',
      nextBillingDate: '2025-01-01T00:00:00Z',
      lastBillingDate: '2024-01-01T00:00:00Z',
      paymentMethod: {
        type: 'credit_card',
        last4: '4242',
        brand: 'Visa',
        expMonth: 12,
        expYear: 2025
      },
      features: [
        { name: 'Users', limit: 100, used: 45 },
        { name: 'Storage', limit: '1 TB', used: '350 GB' },
        { name: 'API Calls', limit: 1000000, used: 345678 },
        { name: 'Support', level: '24/7 Priority' }
      ],
      invoices: [
        { id: 'INV-001', date: '2024-01-01', amount: 24000, status: 'paid', pdf: '/invoices/inv-001.pdf' }
      ],
      provider: 'ACCUCOUNT Inc.',
      contactSupport: 'enterprise@accucount.com',
      autoRenew: true,
      trial: false,
      discount: 0
    },
    {
      id: 'SUB-002',
      name: 'Premium Support Plan',
      type: 'support',
      plan: 'Premium',
      status: 'active',
      billingCycle: 'monthly',
      amount: 999,
      currency: 'USD',
      startDate: '2024-02-15T00:00:00Z',
      nextBillingDate: '2024-04-15T00:00:00Z',
      lastBillingDate: '2024-03-15T00:00:00Z',
      paymentMethod: {
        type: 'credit_card',
        last4: '1234',
        brand: 'Mastercard',
        expMonth: 8,
        expYear: 2026
      },
      features: [
        { name: 'Response Time', value: '< 1 hour' },
        { name: 'Support Channels', value: 'Phone, Email, Chat' },
        { name: 'Dedicated Manager', value: 'Yes' },
        { name: 'SLA', value: '99.9%' }
      ],
      invoices: [
        { id: 'INV-002', date: '2024-03-15', amount: 999, status: 'paid', pdf: '/invoices/inv-002.pdf' },
        { id: 'INV-003', date: '2024-02-15', amount: 999, status: 'paid', pdf: '/invoices/inv-003.pdf' }
      ],
      provider: 'ACCUCOUNT Support',
      contactSupport: 'support@accucount.com',
      autoRenew: true,
      trial: false,
      discount: 0
    },
    {
      id: 'SUB-003',
      name: 'Inventory Management Add-on',
      type: 'saas',
      plan: 'Professional',
      status: 'active',
      billingCycle: 'monthly',
      amount: 299,
      currency: 'USD',
      startDate: '2024-03-01T00:00:00Z',
      nextBillingDate: '2024-04-01T00:00:00Z',
      lastBillingDate: '2024-03-01T00:00:00Z',
      paymentMethod: {
        type: 'paypal',
        email: 'user@example.com'
      },
      features: [
        { name: 'Products', limit: 10000, used: 3456 },
        { name: 'Warehouses', limit: 5, used: 3 },
        { name: 'Users', limit: 25, used: 12 },
        { name: 'API Access', value: 'Yes' }
      ],
      invoices: [
        { id: 'INV-004', date: '2024-03-01', amount: 299, status: 'paid', pdf: '/invoices/inv-004.pdf' }
      ],
      provider: 'ACCUCOUNT Add-ons',
      contactSupport: 'addons@accucount.com',
      autoRenew: true,
      trial: false,
      discount: 0
    },
    {
      id: 'SUB-004',
      name: 'Team Training Program',
      type: 'training',
      plan: 'Team License',
      status: 'active',
      billingCycle: 'quarterly',
      amount: 1500,
      currency: 'USD',
      startDate: '2024-01-15T00:00:00Z',
      nextBillingDate: '2024-04-15T00:00:00Z',
      lastBillingDate: '2024-01-15T00:00:00Z',
      paymentMethod: {
        type: 'bank_transfer',
        reference: 'TR-2024-001'
      },
      features: [
        { name: 'Seats', limit: 10, used: 7 },
        { name: 'Courses', limit: 'All Basic', value: '15 courses' },
        { name: 'Certifications', value: 'Included' },
        { name: 'Materials', value: 'Digital' }
      ],
      invoices: [
        { id: 'INV-005', date: '2024-01-15', amount: 1500, status: 'paid', pdf: '/invoices/inv-005.pdf' }
      ],
      provider: 'ACCUCOUNT Academy',
      contactSupport: 'academy@accucount.com',
      autoRenew: true,
      trial: false,
      discount: 10
    },
    {
      id: 'SUB-005',
      name: 'Implementation Consulting',
      type: 'consulting',
      plan: 'Standard',
      status: 'expired',
      billingCycle: 'one-time',
      amount: 5000,
      currency: 'USD',
      startDate: '2024-01-10T00:00:00Z',
      endDate: '2024-02-10T00:00:00Z',
      paymentMethod: {
        type: 'invoice',
        terms: 'Net 30'
      },
      features: [
        { name: 'Hours', limit: 40, used: 40 },
        { name: 'Consultants', value: '2' },
        { name: 'Deliverables', value: 'Implementation Guide' }
      ],
      invoices: [
        { id: 'INV-006', date: '2024-01-10', amount: 5000, status: 'paid', pdf: '/invoices/inv-006.pdf' }
      ],
      provider: 'ACCUCOUNT Consulting',
      contactSupport: 'consulting@accucount.com',
      autoRenew: false,
      trial: false,
      discount: 0
    },
    {
      id: 'SUB-006',
      name: 'Basic Support Plan',
      type: 'support',
      plan: 'Basic',
      status: 'cancelled',
      billingCycle: 'monthly',
      amount: 199,
      currency: 'USD',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-02-29T23:59:59Z',
      cancellationDate: '2024-02-15T10:30:00Z',
      cancellationReason: 'Upgraded to Premium',
      paymentMethod: {
        type: 'credit_card',
        last4: '5678',
        brand: 'Amex',
        expMonth: 3,
        expYear: 2025
      },
      features: [
        { name: 'Response Time', value: '< 24 hours' },
        { name: 'Support Channels', value: 'Email only' },
        { name: 'SLA', value: '99%' }
      ],
      invoices: [
        { id: 'INV-007', date: '2024-02-01', amount: 199, status: 'paid', pdf: '/invoices/inv-007.pdf' },
        { id: 'INV-008', date: '2024-01-01', amount: 199, status: 'paid', pdf: '/invoices/inv-008.pdf' }
      ],
      provider: 'ACCUCOUNT Support',
      contactSupport: 'support@accucount.com',
      autoRenew: false,
      trial: false,
      discount: 0
    },
    {
      id: 'SUB-007',
      name: 'Data Analytics Pro',
      type: 'saas',
      plan: 'Professional',
      status: 'trial',
      billingCycle: 'monthly',
      amount: 399,
      currency: 'USD',
      startDate: '2024-03-10T00:00:00Z',
      trialEndDate: '2024-04-10T00:00:00Z',
      nextBillingDate: '2024-04-10T00:00:00Z',
      paymentMethod: null,
      features: [
        { name: 'Users', limit: 5, used: 2 },
        { name: 'Reports', limit: 'Unlimited' },
        { name: 'Data Retention', value: '12 months' },
        { name: 'Export Formats', value: 'PDF, Excel, CSV' }
      ],
      invoices: [],
      provider: 'ACCUCOUNT Analytics',
      contactSupport: 'analytics@accucount.com',
      autoRenew: true,
      trial: true,
      discount: 0
    },
    {
      id: 'SUB-008',
      name: 'Warehouse Management System',
      type: 'saas',
      plan: 'Enterprise',
      status: 'past_due',
      billingCycle: 'annual',
      amount: 18000,
      currency: 'USD',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-12-31T23:59:59Z',
      nextBillingDate: '2025-01-01T00:00:00Z',
      lastBillingDate: '2024-01-01T00:00:00Z',
      paymentMethod: {
        type: 'credit_card',
        last4: '9999',
        brand: 'Visa',
        expMonth: 5,
        expYear: 2024
      },
      features: [
        { name: 'Warehouses', limit: 10, used: 4 },
        { name: 'Users', limit: 50, used: 23 },
        { name: 'Integrations', limit: 'Unlimited' },
        { name: 'Support', level: '24/7 Priority' }
      ],
      invoices: [
        { id: 'INV-009', date: '2024-01-01', amount: 18000, status: 'paid', pdf: '/invoices/inv-009.pdf' }
      ],
      provider: 'ACCUCOUNT WMS',
      contactSupport: 'wms@accucount.com',
      autoRenew: true,
      trial: false,
      discount: 0,
      pastDueAmount: 18000,
      pastDueSince: '2024-01-15T00:00:00Z'
    }
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
    trial: { label: 'Trial', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
    past_due: { label: 'Past Due', color: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle },
    cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle },
    expired: { label: 'Expired', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Ban },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock }
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CreditCard;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-100 text-gray-700';
  };

  const getTypeIcon = (type) => {
    const typeInfo = subscriptionTypes.find(t => t.id === type);
    const Icon = typeInfo?.icon || CreditCard;
    return Icon;
  };

  const getTypeColor = (type) => {
    const typeInfo = subscriptionTypes.find(t => t.id === type);
    return typeInfo?.color || 'gray';
  };

  // Helper function to render type icon
  const renderTypeIcon = (type, size = 16, className = "") => {
    const Icon = getTypeIcon(type);
    return <Icon size={size} className={className} />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (selectedType !== 'all' && sub.type !== selectedType) return false;
    if (selectedStatus !== 'all' && sub.status !== selectedStatus) return false;
    if (selectedBillingCycle !== 'all' && sub.billingCycle !== selectedBillingCycle) return false;
    if (activeTab === 'active' && !['active', 'trial'].includes(sub.status)) return false;
    if (activeTab === 'expired' && !['expired', 'cancelled'].includes(sub.status)) return false;
    if (activeTab === 'past_due' && sub.status !== 'past_due') return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return sub.name.toLowerCase().includes(query) ||
             sub.id.toLowerCase().includes(query) ||
             sub.plan.toLowerCase().includes(query) ||
             sub.provider.toLowerCase().includes(query);
    }
    return true;
  });

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    trial: subscriptions.filter(s => s.status === 'trial').length,
    pastDue: subscriptions.filter(s => s.status === 'past_due').length,
    totalMonthly: subscriptions
      .filter(s => s.status === 'active' && s.billingCycle === 'monthly')
      .reduce((sum, s) => sum + s.amount, 0),
    totalAnnual: subscriptions
      .filter(s => s.status === 'active' && s.billingCycle === 'annual')
      .reduce((sum, s) => sum + (s.amount / 12), 0),
    totalSpend: subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => {
        if (s.billingCycle === 'monthly') return sum + s.amount;
        if (s.billingCycle === 'annual') return sum + (s.amount / 12);
        if (s.billingCycle === 'quarterly') return sum + (s.amount / 3);
        return sum;
      }, 0)
  };

  const handleSelectAll = () => {
    if (selectedSubscriptions.length === filteredSubscriptions.length) {
      setSelectedSubscriptions([]);
    } else {
      setSelectedSubscriptions(filteredSubscriptions.map(s => s.id));
    }
  };

  const handleSelectSubscription = (id) => {
    if (selectedSubscriptions.includes(id)) {
      setSelectedSubscriptions(selectedSubscriptions.filter(s => s !== id));
    } else {
      setSelectedSubscriptions([...selectedSubscriptions, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Subscriptions</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage your active subscriptions and billing</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px] border-gray-200 bg-white h-9">
                <SelectValue placeholder="Subscription Type" />
              </SelectTrigger>
              <SelectContent>
                {subscriptionTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name} ({type.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-gray-200 h-9">
                  <Download size={16} />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileJson className="mr-2 h-4 w-4 text-blue-600" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <File className="mr-2 h-4 w-4 text-red-600" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setExportDialogOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Export Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white h-9"
              onClick={() => window.location.href = '/dashboard/billing/plans'}
            >
              <Plus size={16} />
              Browse Plans
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Subscriptions</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <CreditCard size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Active</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.active}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Trial</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.trial}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Clock size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Past Due</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.pastDue}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Monthly Spend</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalSpend, 'USD')}</p>
                </div>
                <div className="p-2 bg-amber-50 rounded-full">
                  <DollarSign size={18} className="text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subscription Distribution */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {subscriptionTypes.filter(t => t.id !== 'all').slice(0, 4).map(type => {
          const Icon = type.icon;
          const count = subscriptions.filter(s => s.type === type.id).length;
          const percentage = (count / stats.total * 100).toFixed(0);
          
          return (
            <Card key={type.id} className="border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1 bg-${type.color}-100 rounded`}>
                    <Icon size={12} className={`text-${type.color}-600`} />
                  </div>
                  <span className="text-sm font-medium flex-1">{type.name}</span>
                  <span className="text-sm font-bold">{count}</span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-1.5 bg-gray-100" 
                  style={{ '--progress-background': `var(--${type.color}-600)` }}
                />
                <p className="text-xs text-gray-500 mt-1">{percentage}% of total</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="active" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-sm">
            Active & Trial
          </TabsTrigger>
          <TabsTrigger value="past_due" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-sm">
            Past Due
          </TabsTrigger>
          <TabsTrigger value="expired" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-sm">
            Expired & Cancelled
          </TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-sm">
            All Subscriptions
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name, ID, or provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-red-600 h-9"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-gray-200 h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="past_due">Past Due</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedBillingCycle} onValueChange={setSelectedBillingCycle}>
            <SelectTrigger className="w-[130px] border-gray-200 h-9">
              <SelectValue placeholder="Billing Cycle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cycles</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
              <SelectItem value="one-time">One-time</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="border-gray-200 h-9 w-9">
            <Filter size={16} />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-200 h-9 w-9">
            <RefreshCw size={16} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-red-600 hover:bg-red-700 h-9 w-9' : 'border-gray-200 h-9 w-9'}
          >
            <Grid size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-red-600 hover:bg-red-700 h-9 w-9' : 'border-gray-200 h-9 w-9'}
          >
            <List size={16} />
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedSubscriptions.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white px-2 py-0.5">{selectedSubscriptions.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedSubscriptions([])} className="h-7 text-xs">
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Download size={14} className="mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <FileText size={14} className="mr-2" />
              View Invoices
            </Button>
          </div>
        </div>
      )}

      {/* Subscriptions Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredSubscriptions.map((subscription) => {
            const typeColor = getTypeColor(subscription.type);
            const StatusIcon = statusConfig[subscription.status]?.icon || CreditCard;
            
            return (
              <ContextMenu key={subscription.id}>
                <ContextMenuTrigger>
                  <Card 
                    className="border-gray-200 hover:shadow-lg transition-all group cursor-pointer"
                    onClick={() => {
                      setSelectedSubscription(subscription);
                      setViewDetailsDialogOpen(true);
                    }}
                  >
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className={`p-4 border-b border-gray-200 bg-gradient-to-r from-${typeColor}-50 to-transparent`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-${typeColor}-600 text-white rounded-lg`}>
                              {renderTypeIcon(subscription.type, 18)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                                  {subscription.id}
                                </Badge>
                                <Badge className={`${statusConfig[subscription.status]?.color} px-2 py-0.5 text-xs`}>
                                  <StatusIcon size={10} className="mr-1" />
                                  {statusConfig[subscription.status]?.label}
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-gray-900 text-base line-clamp-1">{subscription.name}</h3>
                              <p className="text-sm text-gray-500">{subscription.plan} Plan</p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical size={14} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSubscription(subscription);
                                setViewDetailsDialogOpen(true);
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSubscription(subscription);
                                setViewInvoicesDialogOpen(true);
                              }}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Invoices
                              </DropdownMenuItem>
                              {subscription.status === 'active' && (
                                <>
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedSubscription(subscription);
                                    setChangePlanDialogOpen(true);
                                  }}>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Change Plan
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedSubscription(subscription);
                                    setUpdatePaymentDialogOpen(true);
                                  }}>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Update Payment
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedSubscription(subscription);
                                      setCancelDialogOpen(true);
                                    }}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Cancel Subscription
                                  </DropdownMenuItem>
                                </>
                              )}
                              {subscription.status === 'cancelled' && (
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSubscription(subscription);
                                  setReactivateDialogOpen(true);
                                }}>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Reactivate
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="space-y-3">
                          {/* Amount and Billing */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-lg font-bold text-gray-900">
                                {formatCurrency(subscription.amount, subscription.currency)}
                              </p>
                              <p className="text-sm text-gray-500 capitalize">{subscription.billingCycle}</p>
                            </div>
                            {subscription.discount > 0 && (
                              <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                                {subscription.discount}% off
                              </Badge>
                            )}
                          </div>

                          {/* Dates */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="text-gray-700">Started: {formatDate(subscription.startDate)}</span>
                            </div>
                            {subscription.nextBillingDate && (
                              <div className="flex items-center gap-2 text-sm">
                                <Clock size={14} className="text-gray-400" />
                                <span className="text-gray-700">Next: {formatDate(subscription.nextBillingDate)}</span>
                              </div>
                            )}
                          </div>

                          {/* Features Preview */}
                          <div className="space-y-1">
                            {subscription.features.slice(0, 2).map((feature, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">{feature.name}:</span>
                                <span className="font-medium">
                                  {feature.limit ? 
                                    `${feature.used || 0}/${feature.limit}` : 
                                    feature.value}
                                </span>
                              </div>
                            ))}
                            {subscription.features.length > 2 && (
                              <p className="text-xs text-gray-500 text-center">
                                +{subscription.features.length - 2} more features
                              </p>
                            )}
                          </div>

                          {/* Payment Method */}
                          {subscription.paymentMethod && (
                            <div className="flex items-center gap-2 text-sm border-t border-gray-200 pt-2">
                              {subscription.paymentMethod.type === 'credit_card' && (
                                <>
                                  <CreditCard size={14} className="text-gray-400" />
                                  <span className="text-gray-700">
                                    {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                                  </span>
                                  {subscription.paymentMethod.expYear < 2025 && (
                                    <Badge className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5">
                                      Expires {subscription.paymentMethod.expMonth}/{subscription.paymentMethod.expYear}
                                    </Badge>
                                  )}
                                </>
                              )}
                              {subscription.paymentMethod.type === 'paypal' && (
                                <>
                                  <DollarSign size={14} className="text-gray-400" />
                                  <span className="text-gray-700">PayPal • {subscription.paymentMethod.email}</span>
                                </>
                              )}
                              {subscription.paymentMethod.type === 'bank_transfer' && (
                                <>
                                  <Building2 size={14} className="text-gray-400" />
                                  <span className="text-gray-700">Bank Transfer • Ref: {subscription.paymentMethod.reference}</span>
                                </>
                              )}
                              {subscription.paymentMethod.type === 'invoice' && (
                                <>
                                  <Receipt size={14} className="text-gray-400" />
                                  <span className="text-gray-700">Invoice • Terms: {subscription.paymentMethod.terms}</span>
                                </>
                              )}
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                            <div className="flex items-center gap-1">
                              <Building2 size={12} />
                              <span>{subscription.provider}</span>
                            </div>
                            {subscription.autoRenew && subscription.status === 'active' && (
                              <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                                Auto-renew
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem onClick={() => {
                    setSelectedSubscription(subscription);
                    setViewDetailsDialogOpen(true);
                  }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => {
                    setSelectedSubscription(subscription);
                    setViewInvoicesDialogOpen(true);
                  }}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Invoices
                  </ContextMenuItem>
                  {subscription.status === 'active' && (
                    <>
                      <ContextMenuSeparator />
                      <ContextMenuItem onClick={() => {
                        setSelectedSubscription(subscription);
                        setChangePlanDialogOpen(true);
                      }}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Change Plan
                      </ContextMenuItem>
                      <ContextMenuItem onClick={() => {
                        setSelectedSubscription(subscription);
                        setUpdatePaymentDialogOpen(true);
                      }}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Update Payment
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem 
                        className="text-red-600"
                        onClick={() => {
                          setSelectedSubscription(subscription);
                          setCancelDialogOpen(true);
                        }}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel Subscription
                      </ContextMenuItem>
                    </>
                  )}
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
          {filteredSubscriptions.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <CreditCard size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-500">No subscriptions found</h3>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      ) : (
        // List View
        <Card className="border-gray-200">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 bg-gray-50">
                  <TableHead className="w-8">
                    <Checkbox 
                      checked={selectedSubscriptions.length === filteredSubscriptions.length && filteredSubscriptions.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Subscription</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Type</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Status</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Amount</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Billing Cycle</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Next Billing</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Provider</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => {
                  const typeColor = getTypeColor(subscription.type);
                  
                  return (
                    <TableRow 
                      key={subscription.id} 
                      className="border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedSubscription(subscription);
                        setViewDetailsDialogOpen(true);
                      }}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedSubscriptions.includes(subscription.id)}
                          onCheckedChange={() => handleSelectSubscription(subscription.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 bg-${typeColor}-100 rounded`}>
                            {renderTypeIcon(subscription.type, 14, `text-${typeColor}-600`)}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-900">{subscription.name}</div>
                            <div className="text-xs text-gray-500">{subscription.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-200 capitalize text-xs px-2 py-0.5">
                          {subscription.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[subscription.status]?.color} text-xs px-2 py-0.5`}>
                          {statusConfig[subscription.status]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {formatCurrency(subscription.amount, subscription.currency)}
                      </TableCell>
                      <TableCell className="text-sm capitalize">{subscription.billingCycle}</TableCell>
                      <TableCell>
                        {subscription.nextBillingDate ? (
                          <div className="flex items-center gap-1">
                            <Calendar size={12} className="text-gray-400" />
                            <span className="text-sm">{formatDate(subscription.nextBillingDate)}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{subscription.provider}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedSubscription(subscription);
                              setViewDetailsDialogOpen(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedSubscription(subscription);
                              setViewInvoicesDialogOpen(true);
                            }}>
                              <FileText className="mr-2 h-4 w-4" />
                              Invoices
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredSubscriptions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No subscriptions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-500">
                Showing {filteredSubscriptions.length} of {subscriptions.length} subscriptions
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled className="h-8 text-xs">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-red-600 text-white border-red-600 h-8 text-xs">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  3
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Next
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* View Details Dialog */}
      <Dialog open={viewDetailsDialogOpen} onOpenChange={setViewDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedSubscription && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <div className={`p-2 bg-${getTypeColor(selectedSubscription.type)}-100 rounded-lg`}>
                    {renderTypeIcon(selectedSubscription.type, 20, `text-${getTypeColor(selectedSubscription.type)}-600`)}
                  </div>
                  <div>
                    <span>{selectedSubscription.name}</span>
                    <DialogDescription className="text-sm">
                      {selectedSubscription.id} • {selectedSubscription.plan} Plan
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="grid grid-cols-4 bg-gray-100">
                  <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
                  <TabsTrigger value="features" className="text-sm">Features</TabsTrigger>
                  <TabsTrigger value="invoices" className="text-sm">Invoices</TabsTrigger>
                  <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <Badge className={`${statusConfig[selectedSubscription.status]?.color} text-xs px-2 py-0.5`}>
                        {statusConfig[selectedSubscription.status]?.label}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Billing Cycle</p>
                      <p className="text-sm capitalize">{selectedSubscription.billingCycle}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(selectedSubscription.amount, selectedSubscription.currency)}
                      </p>
                      {selectedSubscription.discount > 0 && (
                        <Badge className="bg-green-100 text-green-700 mt-1 text-xs px-2 py-0.5">
                          {selectedSubscription.discount}% discount applied
                        </Badge>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Provider</p>
                      <p className="text-sm">{selectedSubscription.provider}</p>
                      <p className="text-xs text-gray-500 mt-1">{selectedSubscription.contactSupport}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="text-sm">{formatDate(selectedSubscription.startDate)}</p>
                    </div>
                    {selectedSubscription.endDate && (
                      <div>
                        <p className="text-xs text-gray-500">End Date</p>
                        <p className="text-sm">{formatDate(selectedSubscription.endDate)}</p>
                      </div>
                    )}
                    {selectedSubscription.nextBillingDate && (
                      <div>
                        <p className="text-xs text-gray-500">Next Billing</p>
                        <p className="text-sm">{formatDate(selectedSubscription.nextBillingDate)}</p>
                      </div>
                    )}
                  </div>

                  {selectedSubscription.pastDueAmount && (
                    <Alert className="bg-red-50 border-red-200">
                      <AlertCircle size={14} className="text-red-600" />
                      <AlertTitle className="text-xs font-medium text-red-700">Past Due Amount</AlertTitle>
                      <AlertDescription className="text-xs text-red-600/70">
                        {formatCurrency(selectedSubscription.pastDueAmount, selectedSubscription.currency)} past due since {formatDate(selectedSubscription.pastDueSince)}
                      </AlertDescription>
                    </Alert>
                  )}

                  {selectedSubscription.cancellationReason && (
                    <Alert className="bg-yellow-50 border-yellow-200">
                      <Info size={14} className="text-yellow-600" />
                      <AlertTitle className="text-xs font-medium text-yellow-700">Cancellation Reason</AlertTitle>
                      <AlertDescription className="text-xs text-yellow-600/70">
                        {selectedSubscription.cancellationReason}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Payment Method */}
                  {selectedSubscription.paymentMethod && (
                    <Card className="border-gray-200">
                      <CardHeader className="p-3 pb-0">
                        <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        {selectedSubscription.paymentMethod.type === 'credit_card' && (
                          <div className="flex items-center gap-3">
                            <CreditCard size={24} className="text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">
                                {selectedSubscription.paymentMethod.brand} •••• {selectedSubscription.paymentMethod.last4}
                              </p>
                              <p className="text-xs text-gray-500">
                                Expires {selectedSubscription.paymentMethod.expMonth}/{selectedSubscription.paymentMethod.expYear}
                              </p>
                            </div>
                          </div>
                        )}
                        {selectedSubscription.paymentMethod.type === 'paypal' && (
                          <div className="flex items-center gap-3">
                            <DollarSign size={24} className="text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">PayPal</p>
                              <p className="text-xs text-gray-500">{selectedSubscription.paymentMethod.email}</p>
                            </div>
                          </div>
                        )}
                        {selectedSubscription.paymentMethod.type === 'bank_transfer' && (
                          <div className="flex items-center gap-3">
                            <Building2 size={24} className="text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">Bank Transfer</p>
                              <p className="text-xs text-gray-500">Ref: {selectedSubscription.paymentMethod.reference}</p>
                            </div>
                          </div>
                        )}
                        {selectedSubscription.paymentMethod.type === 'invoice' && (
                          <div className="flex items-center gap-3">
                            <Receipt size={24} className="text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">Invoice</p>
                              <p className="text-xs text-gray-500">Terms: {selectedSubscription.paymentMethod.terms}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="features" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedSubscription.features.map((feature, idx) => (
                      <Card key={idx} className="border-gray-200">
                        <CardContent className="p-3">
                          <p className="text-xs text-gray-500">{feature.name}</p>
                          {feature.limit ? (
                            <>
                              <p className="text-lg font-bold mt-1">
                                {feature.used}/{feature.limit}
                              </p>
                              <Progress 
                                value={(feature.used / feature.limit) * 100} 
                                className="h-1.5 mt-2 bg-gray-100" 
                                style={{ '--progress-background': '#dc2626' }}
                              />
                            </>
                          ) : (
                            <p className="text-lg font-bold mt-1">{feature.value}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="invoices" className="space-y-4 mt-4">
                  {selectedSubscription.invoices.length > 0 ? (
                    <div className="space-y-2">
                      {selectedSubscription.invoices.map((invoice, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium">{invoice.id}</p>
                            <p className="text-xs text-gray-500">{formatDate(invoice.date)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={invoice.status === 'paid' ? 'bg-green-100 text-green-700 text-xs px-2 py-0.5' : 'bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5'}>
                              {invoice.status}
                            </Badge>
                            <span className="font-medium text-sm">{formatCurrency(invoice.amount, selectedSubscription.currency)}</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8">
                              <Download size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">No invoices available</p>
                  )}
                </TabsContent>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Subscription ID</p>
                      <p className="text-sm font-mono">{selectedSubscription.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Plan</p>
                      <p className="text-sm">{selectedSubscription.plan}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="text-sm capitalize">{selectedSubscription.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Auto-renew</p>
                      <p className="text-sm">{selectedSubscription.autoRenew ? 'Yes' : 'No'}</p>
                    </div>
                  </div>

                  {selectedSubscription.trial && (
                    <div>
                      <p className="text-xs text-gray-500">Trial Ends</p>
                      <p className="text-sm">{formatDate(selectedSubscription.trialEndDate)}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500">Support Contact</p>
                    <p className="text-sm">{selectedSubscription.contactSupport}</p>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setViewDetailsDialogOpen(false)} className="h-9">
                  Close
                </Button>
                {selectedSubscription.status === 'active' && (
                  <>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setViewDetailsDialogOpen(false);
                        setUpdatePaymentDialogOpen(true);
                      }}
                      className="h-9"
                    >
                      <CreditCard size={14} className="mr-2" />
                      Update Payment
                    </Button>
                    <Button 
                      className="bg-red-600 hover:bg-red-700 h-9"
                      onClick={() => {
                        setViewDetailsDialogOpen(false);
                        setChangePlanDialogOpen(true);
                      }}
                    >
                      <CreditCard size={14} className="mr-2" />
                      Change Plan
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Cancel Subscription</DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to cancel this subscription?
            </DialogDescription>
          </DialogHeader>

          {selectedSubscription && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 bg-${getTypeColor(selectedSubscription.type)}-100 rounded`}>
                    {renderTypeIcon(selectedSubscription.type, 16, `text-${getTypeColor(selectedSubscription.type)}-600`)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-700">{selectedSubscription.name}</p>
                    <p className="text-xs text-gray-500">{selectedSubscription.id}</p>
                  </div>
                </div>
                <p className="text-sm mb-2">You will lose access to:</p>
                <ul className="space-y-1 mb-3">
                  {selectedSubscription.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-xs flex items-center gap-1">
                      <XCircle size={10} className="text-red-600" />
                      {feature.name}
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-1 text-xs text-amber-600">
                  <AlertTriangle size={12} className="mt-0.5" />
                  <span>This action cannot be undone. Your subscription will be cancelled at the end of the current billing period.</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Reason for cancellation (optional)</Label>
                <Select>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expensive">Too expensive</SelectItem>
                    <SelectItem value="not-using">Not using enough</SelectItem>
                    <SelectItem value="missing-features">Missing features</SelectItem>
                    <SelectItem value="switching">Switching to competitor</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Additional comments</Label>
                <Textarea placeholder="Tell us more..." rows={3} className="text-sm" />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)} className="h-9">
              Keep Subscription
            </Button>
            <Button variant="destructive" onClick={() => setCancelDialogOpen(false)} className="h-9">
              Cancel Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Plan Dialog */}
      <Dialog open={changePlanDialogOpen} onOpenChange={setChangePlanDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Change Plan</DialogTitle>
            <DialogDescription className="text-sm">
              Select a new plan for your subscription
            </DialogDescription>
          </DialogHeader>

          {selectedSubscription && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className={`p-2 bg-${getTypeColor(selectedSubscription.type)}-100 rounded`}>
                  {renderTypeIcon(selectedSubscription.type, 16, `text-${getTypeColor(selectedSubscription.type)}-600`)}
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedSubscription.name}</p>
                  <p className="text-xs text-gray-500">Current Plan: {selectedSubscription.plan}</p>
                </div>
              </div>

              <RadioGroup defaultValue="current">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic" className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Basic Plan</p>
                          <p className="text-xs text-gray-500">Essential features for small teams</p>
                        </div>
                        <p className="text-sm font-bold">$199/mo</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded bg-blue-50">
                    <RadioGroupItem value="current" id="current" />
                    <Label htmlFor="current" className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Professional Plan <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5">Current</Badge></p>
                          <p className="text-xs text-gray-500">Advanced features for growing businesses</p>
                        </div>
                        <p className="text-sm font-bold">$399/mo</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded">
                    <RadioGroupItem value="enterprise" id="enterprise" />
                    <Label htmlFor="enterprise" className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Enterprise Plan</p>
                          <p className="text-xs text-gray-500">Full features with dedicated support</p>
                        </div>
                        <p className="text-sm font-bold">$999/mo</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              <Alert className="bg-blue-50 border-blue-200">
                <Info size={14} className="text-blue-600" />
                <AlertTitle className="text-xs font-medium text-blue-700">Proration</AlertTitle>
                <AlertDescription className="text-xs text-blue-600/70">
                  Changes will be prorated for the remainder of your billing cycle.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setChangePlanDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Confirm Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Payment Dialog */}
      <Dialog open={updatePaymentDialogOpen} onOpenChange={setUpdatePaymentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Update Payment Method</DialogTitle>
            <DialogDescription className="text-sm">
              Change your payment method for this subscription
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="card">
              <TabsList className="grid grid-cols-3 mb-4 bg-gray-100">
                <TabsTrigger value="card" className="text-sm">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal" className="text-sm">PayPal</TabsTrigger>
                <TabsTrigger value="bank" className="text-sm">Bank Transfer</TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" className="h-9" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-2">
                    <Label className="text-sm">Expiration</Label>
                    <Input placeholder="MM/YY" className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">CVC</Label>
                    <Input placeholder="123" className="h-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Name on Card</Label>
                  <Input placeholder="John Smith" className="h-9" />
                </div>
              </TabsContent>

              <TabsContent value="paypal" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">PayPal Email</Label>
                  <Input type="email" placeholder="email@example.com" className="h-9" />
                </div>
                <Button variant="outline" className="w-full h-9">
                  <DollarSign size={16} className="mr-2" />
                  Connect PayPal
                </Button>
              </TabsContent>

              <TabsContent value="bank" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Account Holder</Label>
                  <Input placeholder="John Smith" className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Routing Number</Label>
                  <Input placeholder="123456789" className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Account Number</Label>
                  <Input placeholder="123456789012" className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Bank Name</Label>
                  <Input placeholder="Chase Bank" className="h-9" />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center space-x-2">
              <Checkbox id="default" defaultChecked />
              <Label htmlFor="default" className="text-sm">Set as default payment method</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdatePaymentDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Update Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Invoices Dialog */}
      <Dialog open={viewInvoicesDialogOpen} onOpenChange={setViewInvoicesDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Invoices</DialogTitle>
            <DialogDescription className="text-sm">
              View and download invoices for this subscription
            </DialogDescription>
          </DialogHeader>

          {selectedSubscription && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className={`p-2 bg-${getTypeColor(selectedSubscription.type)}-100 rounded`}>
                  {renderTypeIcon(selectedSubscription.type, 16, `text-${getTypeColor(selectedSubscription.type)}-600`)}
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedSubscription.name}</p>
                  <p className="text-xs text-gray-500">{selectedSubscription.id}</p>
                </div>
              </div>

              {selectedSubscription.invoices.length > 0 ? (
                <div className="space-y-2">
                  {selectedSubscription.invoices.map((invoice, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                      <div className="flex items-center gap-3">
                        <Receipt size={16} className="text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">{invoice.id}</p>
                          <p className="text-xs text-gray-500">{formatDate(invoice.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={invoice.status === 'paid' ? 'bg-green-100 text-green-700 text-xs px-2 py-0.5' : 'bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5'}>
                          {invoice.status}
                        </Badge>
                        <span className="text-sm font-medium">{formatCurrency(invoice.amount, selectedSubscription.currency)}</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8">
                          <Download size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No invoices available</p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewInvoicesDialogOpen(false)} className="h-9">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Export Subscriptions</DialogTitle>
            <DialogDescription className="text-sm">
              Choose export format and options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm">Export Format</Label>
              <RadioGroup defaultValue="excel">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel" className="flex items-center gap-2 text-sm">
                    <FileSpreadsheet size={16} className="text-green-600" />
                    Excel (.xlsx)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="json" id="json" />
                  <Label htmlFor="json" className="flex items-center gap-2 text-sm">
                    <FileJson size={16} className="text-blue-600" />
                    JSON (.json)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="flex items-center gap-2 text-sm">
                    <File size={16} className="text-gray-600" />
                    CSV (.csv)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Include</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-features" defaultChecked />
                  <Label htmlFor="include-features" className="text-sm">Features</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-payment" defaultChecked />
                  <Label htmlFor="include-payment" className="text-sm">Payment details</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-invoices" defaultChecked />
                  <Label htmlFor="include-invoices" className="text-sm">Invoice history</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Subscription Settings</DialogTitle>
            <DialogDescription className="text-sm">
              Configure subscription management options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="notifications">
                <AccordionTrigger className="text-sm">Notifications</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Payment due reminders</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Subscription expiring soon</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Invoice available</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Reminder days before</Label>
                    <Select defaultValue="7">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="defaults">
                <AccordionTrigger className="text-sm">Default Settings</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Auto-renew by default</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Default billing cycle</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="display">
                <AccordionTrigger className="text-sm">Display Settings</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show cancelled subscriptions</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Group by type</Label>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Default view</Label>
                    <Select defaultValue="grid">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid View</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Save Settings
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
                onClick={() => window.location.href = '/dashboard/billing/plans'}
              >
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Browse Plans</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setExportDialogOpen(true)}
              >
                <Download size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Export</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg"
                onClick={() => setSettingsDialogOpen(true)}
              >
                <Settings size={20} className="text-gray-900" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MySubscriptionsPage;