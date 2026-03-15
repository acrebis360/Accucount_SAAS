// app/dashboard/reorder-automation/page.js
'use client';

import { useState } from 'react';
import { 
  Repeat,
  Package,
  ShoppingCart,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  TrendingDown,
  DollarSign,
  Settings,
  Save,
  Play,
  Pause,
  RefreshCw,
  Download,
  Search,
  Filter,
  Grid,
  List,
  X,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Zap,
  History,
  BarChart3,
  Activity,
  Plus,
  User,
} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ReorderAutomationPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedRule, setSelectedRule] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRules, setSelectedRules] = useState([]);

  // Sample reorder automation rules data
  const reorderRules = [
    {
      id: 'RAR-001',
      name: 'Fast-Moving Electronics',
      description: 'Auto-reorder for high-velocity electronics items',
      priority: 'high',
      status: 'active',
      type: 'automatic',
      category: 'electronics',
      products: 45,
      skus: ['SKU-001', 'SKU-002', 'SKU-007', 'SKU-011'],
      suppliers: ['Tech Supplies Inc', 'Electronics World'],
      reorderPoint: 50,
      reorderQuantity: 100,
      maxStock: 500,
      leadTime: 3,
      safetyStock: 75,
      demandForecast: 150,
      averageDailyDemand: 25,
      currentStock: 320,
      pendingOrders: 0,
      lastOrder: '2024-03-14',
      nextOrder: '2024-03-18',
      orderFrequency: 'weekly',
      orderDay: 'Monday',
      orderTime: '09:00',
      approvalRequired: false,
      approver: null,
      notifications: true,
      notifyOnReorder: true,
      notifyOnLowStock: true,
      notifyOnOverstock: false,
      performance: {
        accuracy: 98.5,
        stockouts: 0,
        overstock: 2,
        costSavings: 12500,
        ordersPlaced: 12,
      },
      history: [
        { date: '2024-03-14', action: 'Order Placed', details: 'PO-2024-045', quantity: 100 },
        { date: '2024-03-07', action: 'Order Placed', details: 'PO-2024-038', quantity: 100 },
      ],
      tags: ['electronics', 'fast-moving', 'automatic'],
      createdBy: 'Inventory Manager',
      createdAt: '2024-01-15',
      updatedAt: '2024-03-01',
    },
    {
      id: 'RAR-002',
      name: 'Office Supplies - Low Stock',
      description: 'Reorder office supplies when below threshold',
      priority: 'medium',
      status: 'active',
      type: 'semi-automatic',
      category: 'office',
      products: 23,
      skus: ['SKU-023', 'SKU-024', 'SKU-025'],
      suppliers: ['Office Supplies Co', 'PaperDirect'],
      reorderPoint: 25,
      reorderQuantity: 50,
      maxStock: 200,
      leadTime: 5,
      safetyStock: 30,
      demandForecast: 40,
      averageDailyDemand: 8,
      currentStock: 18,
      pendingOrders: 0,
      lastOrder: '2024-03-10',
      nextOrder: '2024-03-17',
      orderFrequency: 'bi-weekly',
      orderDay: 'Wednesday',
      orderTime: '10:00',
      approvalRequired: true,
      approver: 'Office Manager',
      notifications: true,
      notifyOnReorder: true,
      notifyOnLowStock: true,
      notifyOnOverstock: false,
      performance: {
        accuracy: 92.0,
        stockouts: 1,
        overstock: 0,
        costSavings: 3400,
        ordersPlaced: 8,
      },
      tags: ['office', 'low-stock', 'approval'],
      createdBy: 'Office Manager',
      createdAt: '2024-02-01',
      updatedAt: '2024-03-10',
    },
    {
      id: 'RAR-003',
      name: 'Perishable Food Items',
      description: 'Just-in-time ordering for fresh food items',
      priority: 'high',
      status: 'active',
      type: 'automatic',
      category: 'food',
      products: 32,
      skus: ['SKU-009', 'SKU-010', 'SKU-011', 'SKU-026'],
      suppliers: ['Organic Food Co', 'Fresh Farms'],
      reorderPoint: 15,
      reorderQuantity: 30,
      maxStock: 100,
      leadTime: 2,
      safetyStock: 20,
      demandForecast: 45,
      averageDailyDemand: 12,
      currentStock: 42,
      pendingOrders: 30,
      lastOrder: '2024-03-15',
      nextOrder: '2024-03-18',
      orderFrequency: 'daily',
      orderDay: null,
      orderTime: '06:00',
      approvalRequired: false,
      approver: null,
      notifications: true,
      notifyOnReorder: true,
      notifyOnLowStock: true,
      notifyOnOverstock: true,
      performance: {
        accuracy: 99.2,
        stockouts: 0,
        overstock: 1,
        costSavings: 8900,
        ordersPlaced: 45,
      },
      tags: ['food', 'perishable', 'daily'],
      createdBy: 'Inventory Manager',
      createdAt: '2024-01-20',
      updatedAt: '2024-03-15',
    },
    {
      id: 'RAR-004',
      name: 'Industrial Chemicals',
      description: 'Quarterly bulk ordering for chemicals',
      priority: 'medium',
      status: 'active',
      type: 'automatic',
      category: 'chemical',
      products: 18,
      skus: ['SKU-016', 'SKU-017', 'SKU-018'],
      suppliers: ['ChemCorp Industries'],
      reorderPoint: 100,
      reorderQuantity: 500,
      maxStock: 2000,
      leadTime: 10,
      safetyStock: 150,
      demandForecast: 300,
      averageDailyDemand: 15,
      currentStock: 450,
      pendingOrders: 0,
      lastOrder: '2024-02-01',
      nextOrder: '2024-05-01',
      orderFrequency: 'quarterly',
      orderDay: null,
      orderTime: '09:00',
      approvalRequired: true,
      approver: 'Chemical Safety Officer',
      notifications: true,
      notifyOnReorder: true,
      notifyOnLowStock: true,
      notifyOnOverstock: false,
      performance: {
        accuracy: 97.5,
        stockouts: 0,
        overstock: 0,
        costSavings: 15600,
        ordersPlaced: 3,
      },
      tags: ['chemical', 'bulk', 'quarterly'],
      createdBy: 'Procurement',
      createdAt: '2024-01-05',
      updatedAt: '2024-02-01',
    },
    {
      id: 'RAR-005',
      name: 'Packaging Materials',
      description: 'Weekly reorder for packaging supplies',
      priority: 'low',
      status: 'active',
      type: 'automatic',
      category: 'packaging',
      products: 28,
      skus: ['SKU-022', 'SKU-023', 'SKU-024'],
      suppliers: ['Packaging Solutions Inc'],
      reorderPoint: 200,
      reorderQuantity: 500,
      maxStock: 2500,
      leadTime: 4,
      safetyStock: 300,
      demandForecast: 450,
      averageDailyDemand: 75,
      currentStock: 680,
      pendingOrders: 0,
      lastOrder: '2024-03-12',
      nextOrder: '2024-03-19',
      orderFrequency: 'weekly',
      orderDay: 'Tuesday',
      orderTime: '14:00',
      approvalRequired: false,
      approver: null,
      notifications: true,
      notifyOnReorder: true,
      notifyOnLowStock: false,
      notifyOnOverstock: true,
      performance: {
        accuracy: 96.8,
        stockouts: 0,
        overstock: 3,
        costSavings: 5600,
        ordersPlaced: 11,
      },
      tags: ['packaging', 'weekly', 'bulk'],
      createdBy: 'Warehouse Manager',
      createdAt: '2024-02-10',
      updatedAt: '2024-03-12',
    },
    {
      id: 'RAR-006',
      name: 'Medical Supplies - Critical',
      description: 'Critical medical supplies with emergency stock',
      priority: 'critical',
      status: 'active',
      type: 'automatic',
      category: 'medical',
      products: 15,
      skus: ['SKU-019', 'SKU-020', 'SKU-021'],
      suppliers: ['Medical Supplies Inc'],
      reorderPoint: 50,
      reorderQuantity: 100,
      maxStock: 300,
      leadTime: 2,
      safetyStock: 75,
      demandForecast: 80,
      averageDailyDemand: 25,
      currentStock: 85,
      pendingOrders: 0,
      lastOrder: '2024-03-14',
      nextOrder: '2024-03-17',
      orderFrequency: 'twice-weekly',
      orderDay: 'Mon,Thu',
      orderTime: '08:00',
      approvalRequired: true,
      approver: 'Medical Director',
      notifications: true,
      notifyOnReorder: true,
      notifyOnLowStock: true,
      notifyOnOverstock: false,
      performance: {
        accuracy: 99.5,
        stockouts: 0,
        overstock: 0,
        costSavings: 12300,
        ordersPlaced: 24,
      },
      tags: ['medical', 'critical', 'emergency'],
      createdBy: 'Medical Director',
      createdAt: '2024-01-10',
      updatedAt: '2024-03-14',
    },
    {
      id: 'RAR-007',
      name: 'Seasonal Items - Q2',
      description: 'Seasonal items with demand forecasting',
      priority: 'medium',
      status: 'pending',
      type: 'semi-automatic',
      category: 'seasonal',
      products: 22,
      skus: ['SKU-032', 'SKU-033', 'SKU-034'],
      suppliers: ['Seasonal Goods Co'],
      reorderPoint: 30,
      reorderQuantity: 80,
      maxStock: 400,
      leadTime: 7,
      safetyStock: 50,
      demandForecast: 120,
      averageDailyDemand: 10,
      currentStock: 65,
      pendingOrders: 0,
      lastOrder: '2024-02-28',
      nextOrder: '2024-03-25',
      orderFrequency: 'monthly',
      orderDay: '25th',
      orderTime: '11:00',
      approvalRequired: true,
      approver: 'Inventory Manager',
      notifications: true,
      notifyOnReorder: true,
      notifyOnLowStock: true,
      notifyOnOverstock: false,
      performance: {
        accuracy: 88.5,
        stockouts: 2,
        overstock: 1,
        costSavings: 2100,
        ordersPlaced: 2,
      },
      tags: ['seasonal', 'pending', 'review'],
      createdBy: 'Planner',
      createdAt: '2024-02-15',
      updatedAt: '2024-02-28',
    },
    {
      id: 'RAR-008',
      name: 'Safety Equipment',
      description: 'PPE and safety gear reorder',
      priority: 'high',
      status: 'inactive',
      type: 'manual',
      category: 'safety',
      products: 12,
      skus: ['SKU-035', 'SKU-036', 'SKU-037'],
      suppliers: ['Safety Supply Co'],
      reorderPoint: 40,
      reorderQuantity: 80,
      maxStock: 250,
      leadTime: 5,
      safetyStock: 60,
      demandForecast: 70,
      averageDailyDemand: 12,
      currentStock: 95,
      pendingOrders: 0,
      lastOrder: '2024-02-20',
      nextOrder: null,
      orderFrequency: 'monthly',
      orderDay: '15th',
      orderTime: '10:00',
      approvalRequired: true,
      approver: 'Safety Officer',
      notifications: true,
      notifyOnReorder: true,
      notifyOnLowStock: true,
      notifyOnOverstock: false,
      performance: {
        accuracy: 94.2,
        stockouts: 0,
        overstock: 2,
        costSavings: 4300,
        ordersPlaced: 6,
      },
      tags: ['safety', 'ppe', 'inactive'],
      createdBy: 'Safety Officer',
      createdAt: '2024-01-25',
      updatedAt: '2024-02-20',
    },
  ];

  // System settings
  const systemSettings = {
    globalEnabled: true,
    defaultLeadTime: 5,
    safetyStockMultiplier: 1.2,
    minReorderQuantity: 10,
    maxOrderQuantity: 1000,
    autoApproveThreshold: 5000,
    notifyProcurement: true,
    notifyInventory: true,
    notifyManagement: false,
    integration: {
      erp: true,
      suppliers: true,
      forecasting: true,
    },
  };

  // Categories
  const categories = [
    { id: 'all', name: 'All Categories', count: reorderRules.length },
    { id: 'electronics', name: 'Electronics', count: reorderRules.filter(r => r.category === 'electronics').length },
    { id: 'office', name: 'Office', count: reorderRules.filter(r => r.category === 'office').length },
    { id: 'food', name: 'Food', count: reorderRules.filter(r => r.category === 'food').length },
    { id: 'chemical', name: 'Chemical', count: reorderRules.filter(r => r.category === 'chemical').length },
    { id: 'packaging', name: 'Packaging', count: reorderRules.filter(r => r.category === 'packaging').length },
    { id: 'medical', name: 'Medical', count: reorderRules.filter(r => r.category === 'medical').length },
    { id: 'seasonal', name: 'Seasonal', count: reorderRules.filter(r => r.category === 'seasonal').length },
    { id: 'safety', name: 'Safety', count: reorderRules.filter(r => r.category === 'safety').length },
  ];

  // Priority configuration
  const priorityConfig = {
    critical: { label: 'Critical', color: 'bg-red-100 text-red-700', icon: AlertCircle },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700', icon: AlertTriangle },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    low: { label: 'Low', color: 'bg-green-100 text-green-700', icon: TrendingDown },
  };

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    inactive: { label: 'Inactive', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: X },
  };

  const typeConfig = {
    automatic: { label: 'Automatic', color: 'bg-blue-100 text-blue-700', icon: Zap },
    'semi-automatic': { label: 'Semi-Automatic', color: 'bg-purple-100 text-purple-700', icon: Settings },
    manual: { label: 'Manual', color: 'bg-gray-100 text-gray-700', icon: User },
  };

  const getPriorityIcon = (priority) => {
    const config = priorityConfig[priority];
    const Icon = config?.icon || AlertTriangle;
    return <Icon size={14} />;
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getTypeIcon = (type) => {
    const config = typeConfig[type];
    const Icon = config?.icon || Repeat;
    return Icon;
  };

  const getTypeColor = (type) => {
    return typeConfig[type]?.color || 'bg-gray-100 text-gray-700';
  };

  const filteredRules = reorderRules.filter(rule => {
    const matchesStatus = selectedStatus === 'all' || rule.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || rule.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory;
    const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rule.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });

  const stats = {
    total: reorderRules.length,
    active: reorderRules.filter(r => r.status === 'active').length,
    pending: reorderRules.filter(r => r.status === 'pending').length,
    totalProducts: reorderRules.reduce((sum, r) => sum + r.products, 0),
    ordersPlaced: reorderRules.reduce((sum, r) => sum + r.performance.ordersPlaced, 0),
    costSavings: reorderRules.reduce((sum, r) => sum + r.performance.costSavings, 0),
    stockouts: reorderRules.reduce((sum, r) => sum + r.performance.stockouts, 0),
  };

  const handleSelectAll = () => {
    if (selectedRules.length === filteredRules.length) {
      setSelectedRules([]);
    } else {
      setSelectedRules(filteredRules.map(r => r.id));
    }
  };

  const handleSelectRule = (id) => {
    if (selectedRules.includes(id)) {
      setSelectedRules(selectedRules.filter(r => r !== id));
    } else {
      setSelectedRules([...selectedRules, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Reorder Automation</h1>
            <p className="text-black/50 mt-1">Automate and manage inventory reordering rules</p>
          </div>
          <div className="flex items-center gap-3">
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
              onClick={() => setShowReportDialog(true)}
            >
              <BarChart3 size={16} />
              Analytics
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowHistoryDialog(true)}
            >
              <History size={16} />
              History
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create Rule
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Rules</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Repeat size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Products</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.totalProducts}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Package size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Orders</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.ordersPlaced}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <ShoppingCart size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Cost Savings</p>
                  <p className="text-xl font-bold text-green-600 mt-1">${stats.costSavings.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <DollarSign size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Stockouts</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.stockouts}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertTriangle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="border-[#F5EEE9] bg-gradient-to-r from-green-50 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-black/50">System Status</p>
                <p className="text-lg font-semibold text-green-600">Active</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Zap size={20} className="text-green-600" />
              </div>
            </div>
            <p className="text-xs text-black/50 mt-2">Next scan: 10:00 AM today</p>
          </CardContent>
        </Card>

        <Card className="border-[#F5EEE9]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-black/50">ERP Integration</p>
              <Badge className="bg-green-100 text-green-700">Connected</Badge>
            </div>
            <p className="text-xs text-black/50">Supplier Portal</p>
            <Badge className="bg-green-100 text-green-700 mt-1">Active</Badge>
          </CardContent>
        </Card>

        <Card className="border-[#F5EEE9]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-black/50">Forecasting</p>
              <Badge className="bg-green-100 text-green-700">AI Powered</Badge>
            </div>
            <p className="text-xs text-black/50">Accuracy: 94.5%</p>
          </CardContent>
        </Card>

        <Card className="border-[#F5EEE9]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-black/50">Auto-Approval</p>
              <Badge className="bg-blue-100 text-blue-700">$5,000 limit</Badge>
            </div>
            <p className="text-xs text-black/50">Pending approvals: 2</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
            <Input
              placeholder="Search by rule name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

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
      {selectedRules.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedRules.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedRules([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <Play size={14} className="mr-2" />
              Run Now
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Pause size={14} className="mr-2" />
              Pause
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Save size={14} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* Rules Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredRules.map((rule) => {
            const StatusIcon = statusConfig[rule.status]?.icon || CheckCircle;
            const TypeIcon = getTypeIcon(rule.type);
            
            return (
              <Card key={rule.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(rule.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {rule.status}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(rule.priority))}>
                            {getPriorityIcon(rule.priority)}
                            <span className="ml-1">{rule.priority}</span>
                          </Badge>
                          <Badge className={cn("text-xs", getTypeColor(rule.type))}>
                            <TypeIcon size={10} className="mr-1" />
                            {rule.type}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{rule.name}</h3>
                        <p className="text-xs text-black/50 mt-1 line-clamp-1">{rule.description}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedRule(rule);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedRule(rule);
                            setShowTestDialog(true);
                          }}>
                            <Activity className="mr-2 h-4 w-4" />
                            Test Rule
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          {rule.status === 'active' ? (
                            <DropdownMenuItem>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Category & Products */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                        {rule.category}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                        {rule.products} products
                      </Badge>
                    </div>

                    {/* Reorder Parameters */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="p-2 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Reorder Point</p>
                        <p className="text-sm font-bold">{rule.reorderPoint}</p>
                      </div>
                      <div className="p-2 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Reorder Qty</p>
                        <p className="text-sm font-bold">{rule.reorderQuantity}</p>
                      </div>
                    </div>

                    {/* Stock Levels */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-black/50">Current Stock</span>
                        <span className="text-[10px] font-medium">{rule.currentStock}</span>
                      </div>
                      <div className="h-1.5 bg-[#F5EEE9] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(rule.currentStock / rule.maxStock) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center gap-2 text-[10px] text-black/70 mb-2">
                      <Clock size={10} />
                      <span>{rule.orderFrequency}</span>
                      {rule.orderDay && (
                        <>
                          <span className="text-black/30">•</span>
                          <span>{rule.orderDay}</span>
                        </>
                      )}
                    </div>

                    {/* Next Order */}
                    {rule.nextOrder && (
                      <div className="mb-2 p-2 bg-blue-50 rounded">
                        <p className="text-[8px] text-blue-700">Next Order</p>
                        <p className="text-xs font-medium text-blue-600">{rule.nextOrder}</p>
                      </div>
                    )}

                    {/* Performance */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <CheckCircle size={10} className="text-green-600" />
                        <span className="text-[8px] text-black/70">{rule.performance.accuracy}% accuracy</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShoppingCart size={10} className="text-purple-600" />
                        <span className="text-[8px] text-black/70">{rule.performance.ordersPlaced} orders</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {rule.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                      <span>Last: {rule.lastOrder}</span>
                      {rule.approvalRequired && (
                        <Badge className="bg-yellow-100 text-yellow-700 text-[6px]">
                          Approval Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-[#F5EEE9]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                  <TableHead className="w-8">
                    <Checkbox 
                      checked={selectedRules.length === filteredRules.length && filteredRules.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Rule Name</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50 text-right">Products</TableHead>
                  <TableHead className="text-black/50 text-right">Reorder Pt</TableHead>
                  <TableHead className="text-black/50 text-right">Reorder Qty</TableHead>
                  <TableHead className="text-black/50 text-right">Current</TableHead>
                  <TableHead className="text-black/50">Next Order</TableHead>
                  <TableHead className="text-black/50">Accuracy</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRules.map((rule) => (
                  <TableRow key={rule.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedRules.includes(rule.id)}
                        onCheckedChange={() => handleSelectRule(rule.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{rule.name}</p>
                        <p className="text-xs text-black/50 line-clamp-1">{rule.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {rule.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(rule.priority))}>
                        {rule.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(rule.status))}>
                        {rule.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getTypeColor(rule.type))}>
                        {rule.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{rule.products}</TableCell>
                    <TableCell className="text-right">{rule.reorderPoint}</TableCell>
                    <TableCell className="text-right">{rule.reorderQuantity}</TableCell>
                    <TableCell className="text-right">{rule.currentStock}</TableCell>
                    <TableCell>{rule.nextOrder || '—'}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "text-xs font-medium",
                        rule.performance.accuracy >= 98 ? 'text-green-600' :
                        rule.performance.accuracy >= 95 ? 'text-blue-600' :
                        rule.performance.accuracy >= 90 ? 'text-yellow-600' :
                        'text-red-600'
                      )}>
                        {rule.performance.accuracy}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedRule(rule);
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
                Showing {filteredRules.length} of {reorderRules.length} rules
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

      {/* Create Rule Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Reorder Rule</DialogTitle>
            <DialogDescription>
              Configure automatic reordering parameters
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rule Name</Label>
                    <Input placeholder="e.g., Fast-Moving Electronics" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Rule description" rows={2} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Rule Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select Products</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Electronics</SelectItem>
                      <SelectItem value="category">By Category</SelectItem>
                      <SelectItem value="manual">Manual Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Suppliers</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select suppliers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tech Supplies Inc</SelectItem>
                      <SelectItem value="office">Office Supplies Co</SelectItem>
                      <SelectItem value="food">Organic Food Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="parameters" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Reorder Point</Label>
                    <Input type="number" placeholder="e.g., 50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Reorder Quantity</Label>
                    <Input type="number" placeholder="e.g., 100" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Max Stock Level</Label>
                    <Input type="number" placeholder="e.g., 500" />
                  </div>
                  <div className="space-y-2">
                    <Label>Safety Stock</Label>
                    <Input type="number" placeholder="e.g., 75" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Lead Time (days)</Label>
                    <Input type="number" placeholder="e.g., 3" />
                  </div>
                  <div className="space-y-2">
                    <Label>Average Daily Demand</Label>
                    <Input type="number" placeholder="e.g., 25" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Demand Forecast</Label>
                  <Input type="number" placeholder="e.g., 150" />
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <div className="space-y-2">
                  <Label>Order Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Order Day</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Order Time</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Approval Required</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="approval" />
                    <Label htmlFor="approval">Require approval before ordering</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-reorder" defaultChecked />
                      <Label htmlFor="notify-reorder">Notify when reorder triggered</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-low" defaultChecked />
                      <Label htmlFor="notify-low">Notify on low stock</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-over" />
                      <Label htmlFor="notify-over">Notify on overstock</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rule Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Reorder Rule Details</DialogTitle>
          </DialogHeader>

          {selectedRule && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="parameters">Parameters</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedRule.name}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedRule.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cn("text-xs border-0", getStatusColor(selectedRule.status))}>
                        {selectedRule.status}
                      </Badge>
                      <Badge className={cn("text-xs", getPriorityColor(selectedRule.priority))}>
                        {selectedRule.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <p className="text-sm">{selectedRule.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Category</p>
                      <p className="text-sm font-medium capitalize">{selectedRule.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Type</p>
                      <p className="text-sm font-medium capitalize">{selectedRule.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Package size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedRule.products}</p>
                        <p className="text-xs text-black/50">Products</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <ShoppingCart size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedRule.performance.ordersPlaced}</p>
                        <p className="text-xs text-black/50">Orders</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <DollarSign size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">${selectedRule.performance.costSavings.toLocaleString()}</p>
                        <p className="text-xs text-black/50">Savings</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Suppliers</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedRule.suppliers.map((supplier) => (
                          <Badge key={supplier} variant="outline" className="text-xs border-[#F5EEE9]">
                            {supplier}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Order Frequency</p>
                      <p className="text-sm">{selectedRule.orderFrequency}</p>
                      {selectedRule.orderDay && (
                        <p className="text-xs text-black/50">on {selectedRule.orderDay}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Last Order</p>
                      <p className="text-sm">{selectedRule.lastOrder}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Next Order</p>
                      <p className="text-sm">{selectedRule.nextOrder || 'Not scheduled'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {selectedRule.approvalRequired ? (
                        <Badge className="bg-yellow-100 text-yellow-700">Approval Required</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700">No Approval Needed</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {selectedRule.notifications && (
                        <Badge className="bg-blue-100 text-blue-700">Notifications On</Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedRule.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="parameters" className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Reorder Parameters</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-black/50">Reorder Point</p>
                          <p className="text-lg font-bold">{selectedRule.reorderPoint}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Reorder Quantity</p>
                          <p className="text-lg font-bold">{selectedRule.reorderQuantity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Max Stock</p>
                          <p className="text-sm">{selectedRule.maxStock}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Safety Stock</p>
                          <p className="text-sm">{selectedRule.safetyStock}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Demand & Lead Time</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-black/50">Lead Time (days)</p>
                          <p className="text-lg font-bold">{selectedRule.leadTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Avg Daily Demand</p>
                          <p className="text-lg font-bold">{selectedRule.averageDailyDemand}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Demand Forecast</p>
                          <p className="text-sm">{selectedRule.demandForecast}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Current Stock</p>
                          <p className="text-sm">{selectedRule.currentStock}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Performance Metrics</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-black/50">Accuracy</p>
                          <p className="text-lg font-bold text-green-600">{selectedRule.performance.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Stockouts</p>
                          <p className="text-lg font-bold text-red-600">{selectedRule.performance.stockouts}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Overstock Events</p>
                          <p className="text-sm">{selectedRule.performance.overstock}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Cost Savings</p>
                          <p className="text-sm text-green-600">${selectedRule.performance.costSavings.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="products" className="space-y-4">
                  <p className="text-sm font-medium">Included SKUs ({selectedRule.skus.length})</p>
                  <div className="space-y-2">
                    {selectedRule.skus.map((sku, idx) => (
                      <Card key={idx} className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm">{sku}</span>
                            <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedRule.history.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          <ShoppingCart size={12} className="text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-black/70">{item.details}</p>
                            <p className="text-[8px] text-black/50">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedRule?.status === 'active' && (
              <Button className="bg-yellow-600 hover:bg-yellow-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowOverrideDialog(true);
              }}>
                <Settings className="mr-2 h-4 w-4" />
                Override
              </Button>
            )}
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
              setShowDetailsDialog(false);
              setShowTestDialog(true);
            }}>
              <Activity className="mr-2 h-4 w-4" />
              Test Rule
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
                onClick={() => setShowCreateDialog(true)}
              >
                <Repeat size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Create Rule</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowReportDialog(true)}
              >
                <BarChart3 size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Analytics</TooltipContent>
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

export default ReorderAutomationPage;