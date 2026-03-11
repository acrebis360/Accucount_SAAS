// app/dashboard/expiry-management/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar,
  Package,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  Grid,
  List,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  Calendar as CalendarIcon,
  CalendarDays,
  CalendarRange,
  CalendarCheck,
  CalendarX,
  CalendarClock,
  CalendarWarning,
  Clock as ClockIcon,
  Timer,
  Hourglass,
  Sandbox,
  Stopwatch,
  Ban,
  Tag,
  MapPin,
  Truck,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  Bell,
  BellRing,
  BellOff,
  Settings,
  Save,
  Percent,
  DollarSign,
  Boxes,
  PackageIcon,
  PackageCheck,
  PackageX,
  PackageSearch,
  Crate,
  Pallet,
  Container,
  Warehouse,
  Store,
  Building2
} from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ExpiryManagementPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('next30days');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDisposeDialog, setShowDisposeDialog] = useState(false);
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample expiry data
  const expiryItems = [
    {
      id: 'EXP-001',
      batchNumber: 'BATCH-001',
      productId: 'PRD-001',
      productName: 'Premium Wireless Headphones',
      sku: 'SKU-001',
      category: 'Electronics',
      subcategory: 'Audio',
      quantity: 500,
      unit: 'pcs',
      unitCost: 45.50,
      totalValue: 22750.00,
      manufacturingDate: '2024-03-15',
      expiryDate: '2026-03-15',
      daysUntilExpiry: 734,
      status: 'good',
      location: 'Warehouse A',
      zone: 'Zone 2',
      bin: 'A-02-08',
      supplier: 'AudioTech Manufacturing',
      batchNumber: 'BATCH-001',
      storageConditions: 'Ambient, 45% humidity',
      alertThreshold: 90,
      disposalMethod: null,
      discountEligible: false,
      priority: 'low',
      tags: ['electronics', 'long-shelf-life'],
      lastChecked: '2024-03-15',
      checkedBy: 'John Doe',
      notes: null,
    },
    {
      id: 'EXP-002',
      batchNumber: 'BATCH-002',
      productId: 'PRD-002',
      productName: 'Organic Protein Powder',
      sku: 'SKU-002',
      category: 'Health',
      subcategory: 'Supplements',
      quantity: 250,
      unit: 'containers',
      unitCost: 28.75,
      totalValue: 7187.50,
      manufacturingDate: '2024-02-28',
      expiryDate: '2025-02-28',
      daysUntilExpiry: 354,
      status: 'good',
      location: 'Warehouse C',
      zone: 'Zone 5',
      bin: 'C-05-12',
      supplier: 'NutriHealth Labs',
      batchNumber: 'BATCH-002',
      storageConditions: 'Cool, 35% humidity',
      alertThreshold: 60,
      disposalMethod: null,
      discountEligible: false,
      priority: 'low',
      tags: ['organic', 'supplements'],
      lastChecked: '2024-03-14',
      checkedBy: 'Jane Smith',
      notes: null,
    },
    {
      id: 'EXP-003',
      batchNumber: 'BATCH-003',
      productId: 'PRD-003',
      productName: 'Industrial Lubricant - Grade A',
      sku: 'SKU-003',
      category: 'Industrial',
      subcategory: 'Lubricants',
      quantity: 100,
      unit: 'drums',
      unitCost: 185.00,
      totalValue: 18500.00,
      manufacturingDate: '2024-03-10',
      expiryDate: '2025-09-10',
      daysUntilExpiry: 548,
      status: 'good',
      location: 'Warehouse B',
      zone: 'Zone 4',
      bin: 'B-04-03',
      supplier: 'ChemCorp Industries',
      batchNumber: 'BATCH-003',
      storageConditions: 'Ambient, 40% humidity',
      alertThreshold: 90,
      disposalMethod: null,
      discountEligible: false,
      priority: 'low',
      tags: ['industrial', 'chemical'],
      lastChecked: '2024-03-13',
      checkedBy: 'Mike Johnson',
      notes: null,
    },
    {
      id: 'EXP-004',
      batchNumber: 'BATCH-006',
      productId: 'PRD-006',
      productName: 'Canned Organic Soup',
      sku: 'SKU-006',
      category: 'Food',
      subcategory: 'Canned Goods',
      quantity: 2000,
      unit: 'cans',
      unitCost: 2.25,
      totalValue: 4500.00,
      manufacturingDate: '2024-02-15',
      expiryDate: '2025-08-15',
      daysUntilExpiry: 157,
      status: 'warning',
      location: 'Warehouse C',
      zone: 'Zone 6',
      bin: 'C-06-08',
      supplier: 'Organic Food Co',
      batchNumber: 'BATCH-006',
      storageConditions: 'Cool, 40% humidity',
      alertThreshold: 90,
      disposalMethod: null,
      discountEligible: true,
      priority: 'medium',
      tags: ['food', 'organic', 'canned'],
      lastChecked: '2024-03-12',
      checkedBy: 'Tom Brown',
      notes: 'Consider discount promotion',
    },
    {
      id: 'EXP-005',
      batchNumber: 'BATCH-009',
      productId: 'PRD-009',
      productName: 'Fresh Dairy Milk',
      sku: 'SKU-009',
      category: 'Food',
      subcategory: 'Dairy',
      quantity: 150,
      unit: 'gallons',
      unitCost: 3.50,
      totalValue: 525.00,
      manufacturingDate: '2024-03-10',
      expiryDate: '2024-03-24',
      daysUntilExpiry: 13,
      status: 'critical',
      location: 'Store A',
      zone: 'Dairy',
      bin: 'D-01-05',
      supplier: 'Local Dairy Co',
      batchNumber: 'BATCH-009',
      storageConditions: 'Refrigerated, 4°C',
      alertThreshold: 7,
      disposalMethod: 'Donation',
      discountEligible: true,
      priority: 'high',
      tags: ['food', 'dairy', 'perishable'],
      lastChecked: '2024-03-15',
      checkedBy: 'Sarah Wilson',
      notes: 'Urgent - move to discount section',
    },
    {
      id: 'EXP-006',
      batchNumber: 'BATCH-010',
      productId: 'PRD-010',
      productName: 'Fresh Vegetables Box',
      sku: 'SKU-010',
      category: 'Food',
      subcategory: 'Produce',
      quantity: 80,
      unit: 'boxes',
      unitCost: 12.00,
      totalValue: 960.00,
      manufacturingDate: '2024-03-12',
      expiryDate: '2024-03-19',
      daysUntilExpiry: 8,
      status: 'critical',
      location: 'Store A',
      zone: 'Produce',
      bin: 'P-02-03',
      supplier: 'Fresh Farms Inc',
      batchNumber: 'BATCH-010',
      storageConditions: 'Refrigerated, 2°C',
      alertThreshold: 5,
      disposalMethod: 'Discount',
      discountEligible: true,
      priority: 'high',
      tags: ['food', 'produce', 'perishable'],
      lastChecked: '2024-03-15',
      checkedBy: 'Emma Watson',
      notes: '50% discount recommended',
    },
    {
      id: 'EXP-007',
      batchNumber: 'BATCH-011',
      productId: 'PRD-011',
      productName: 'Greek Yogurt (Strawberry)',
      sku: 'SKU-011',
      category: 'Food',
      subcategory: 'Dairy',
      quantity: 200,
      unit: 'cups',
      unitCost: 1.25,
      totalValue: 250.00,
      manufacturingDate: '2024-03-05',
      expiryDate: '2024-03-18',
      daysUntilExpiry: 7,
      status: 'critical',
      location: 'Store B',
      zone: 'Dairy',
      bin: 'D-02-01',
      supplier: 'Dairy Fresh Co',
      batchNumber: 'BATCH-011',
      storageConditions: 'Refrigerated, 4°C',
      alertThreshold: 5,
      disposalMethod: 'Discount',
      discountEligible: true,
      priority: 'high',
      tags: ['food', 'dairy', 'yogurt'],
      lastChecked: '2024-03-15',
      checkedBy: 'Anna Taylor',
      notes: 'BOGO promotion',
    },
    {
      id: 'EXP-008',
      batchNumber: 'BATCH-012',
      productId: 'PRD-012',
      productName: 'Chicken Breasts',
      sku: 'SKU-012',
      category: 'Food',
      subcategory: 'Meat',
      quantity: 60,
      unit: 'packages',
      unitCost: 8.50,
      totalValue: 510.00,
      manufacturingDate: '2024-03-08',
      expiryDate: '2024-03-16',
      daysUntilExpiry: 5,
      status: 'expiring',
      location: 'Store A',
      zone: 'Meat',
      bin: 'M-01-04',
      supplier: 'Quality Meats',
      batchNumber: 'BATCH-012',
      storageConditions: 'Refrigerated, 0°C',
      alertThreshold: 3,
      disposalMethod: 'Discount',
      discountEligible: true,
      priority: 'urgent',
      tags: ['food', 'meat', 'perishable'],
      lastChecked: '2024-03-15',
      checkedBy: 'David Lee',
      notes: 'Mark down 30%',
    },
    {
      id: 'EXP-009',
      batchNumber: 'BATCH-013',
      productId: 'PRD-013',
      productName: 'Fresh Salmon Fillets',
      sku: 'SKU-013',
      category: 'Food',
      subcategory: 'Seafood',
      quantity: 40,
      unit: 'packages',
      unitCost: 12.50,
      totalValue: 500.00,
      manufacturingDate: '2024-03-09',
      expiryDate: '2024-03-15',
      daysUntilExpiry: 4,
      status: 'expiring',
      location: 'Store A',
      zone: 'Seafood',
      bin: 'S-01-02',
      supplier: 'Ocean Fresh',
      batchNumber: 'BATCH-013',
      storageConditions: 'Refrigerated, 0°C',
      alertThreshold: 2,
      disposalMethod: 'Discount',
      discountEligible: true,
      priority: 'urgent',
      tags: ['food', 'seafood', 'perishable'],
      lastChecked: '2024-03-15',
      checkedBy: 'Lisa Chen',
      notes: 'Use today or tomorrow',
    },
    {
      id: 'EXP-010',
      batchNumber: 'BATCH-014',
      productId: 'PRD-014',
      productName: 'Organic Milk',
      sku: 'SKU-014',
      category: 'Food',
      subcategory: 'Dairy',
      quantity: 100,
      unit: 'gallons',
      unitCost: 4.50,
      totalValue: 450.00,
      manufacturingDate: '2024-03-01',
      expiryDate: '2024-03-14',
      daysUntilExpiry: -1,
      status: 'expired',
      location: 'Store B',
      zone: 'Dairy',
      bin: 'Quarantine',
      supplier: 'Organic Dairy Co',
      batchNumber: 'BATCH-014',
      storageConditions: 'Refrigerated, 4°C',
      alertThreshold: 5,
      disposalMethod: 'Disposal',
      discountEligible: false,
      priority: 'urgent',
      tags: ['food', 'dairy', 'expired'],
      lastChecked: '2024-03-15',
      checkedBy: 'Tom Brown',
      notes: 'Quarantined for disposal',
    },
    {
      id: 'EXP-011',
      batchNumber: 'BATCH-015',
      productId: 'PRD-015',
      productName: 'Medication - Pain Reliever',
      sku: 'SKU-015',
      category: 'Pharmacy',
      subcategory: 'Medications',
      quantity: 500,
      unit: 'boxes',
      unitCost: 5.75,
      totalValue: 2875.00,
      manufacturingDate: '2023-06-15',
      expiryDate: '2024-06-15',
      daysUntilExpiry: 96,
      status: 'warning',
      location: 'Store B',
      zone: 'Pharmacy',
      bin: 'P-03-01',
      supplier: 'PharmaCorp',
      batchNumber: 'BATCH-015',
      storageConditions: 'Room temperature',
      alertThreshold: 60,
      disposalMethod: null,
      discountEligible: false,
      priority: 'medium',
      tags: ['pharmacy', 'medication', 'regulated'],
      lastChecked: '2024-03-10',
      checkedBy: 'Dr. Smith',
      notes: 'Monitor closely',
    },
  ];

  // Categories for filtering
  const categories = [
    { id: 'food', name: 'Food', count: 7 },
    { id: 'health', name: 'Health', count: 1 },
    { id: 'pharmacy', name: 'Pharmacy', count: 1 },
    { id: 'electronics', name: 'Electronics', count: 1 },
    { id: 'industrial', name: 'Industrial', count: 1 },
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', count: 2 },
    { id: 'wh-b', name: 'Warehouse B', count: 1 },
    { id: 'wh-c', name: 'Warehouse C', count: 2 },
    { id: 'store-a', name: 'Store A', count: 4 },
    { id: 'store-b', name: 'Store B', count: 2 },
  ];

  // Status configuration
  const statusConfig = {
    good: { label: 'Good', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle, threshold: 90 },
    warning: { label: 'Warning', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertTriangle, threshold: 60 },
    critical: { label: 'Critical', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertCircle, threshold: 30 },
    expiring: { label: 'Expiring', color: 'bg-red-50 text-red-700 border-red-200', icon: Clock, threshold: 7 },
    expired: { label: 'Expired', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban, threshold: 0 },
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Package;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-100 text-gray-700';
  };

  const getDaysUntilExpiryColor = (days) => {
    if (days < 0) return 'text-gray-600';
    if (days <= 7) return 'text-red-600';
    if (days <= 30) return 'text-orange-600';
    if (days <= 90) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredItems = expiryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date range filter
    let matchesDateRange = true;
    if (dateRange === 'next7days') matchesDateRange = item.daysUntilExpiry >= 0 && item.daysUntilExpiry <= 7;
    else if (dateRange === 'next30days') matchesDateRange = item.daysUntilExpiry >= 0 && item.daysUntilExpiry <= 30;
    else if (dateRange === 'next90days') matchesDateRange = item.daysUntilExpiry >= 0 && item.daysUntilExpiry <= 90;
    else if (dateRange === 'expired') matchesDateRange = item.daysUntilExpiry < 0;
    
    return matchesCategory && matchesLocation && matchesStatus && matchesSearch && matchesDateRange;
  });

  const stats = {
    total: expiryItems.length,
    good: expiryItems.filter(i => i.status === 'good').length,
    warning: expiryItems.filter(i => i.status === 'warning').length,
    critical: expiryItems.filter(i => i.status === 'critical').length,
    expiring: expiryItems.filter(i => i.status === 'expiring').length,
    expired: expiryItems.filter(i => i.status === 'expired').length,
    totalValue: expiryItems.reduce((sum, i) => sum + i.totalValue, 0),
    atRiskValue: expiryItems.filter(i => i.status !== 'good' && i.status !== 'expired')
      .reduce((sum, i) => sum + i.totalValue, 0),
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Expiry Management</h1>
            <p className="text-black/50 mt-1">Track and manage expiring inventory items</p>
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowSettingsDialog(true)}
            >
              <Bell size={16} />
              Alert Settings
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowReportDialog(true)}
            >
              <FileText size={16} />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Batches</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Package size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Good</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.good}</p>
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
                  <p className="text-xs text-black/50">Critical</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.critical}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <AlertCircle size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Expiring</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.expiring}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Clock size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Expired</p>
                  <p className="text-xl font-bold text-gray-600 mt-1">{stats.expired}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-full">
                  <Ban size={18} className="text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">At Risk Value</p>
                  <p className="text-xl font-bold text-black mt-1">${stats.atRiskValue.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <DollarSign size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Expiry Timeline */}
      <Card className="border-[#F5EEE9] mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Expiry Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-24">
            {/* Timeline bar */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full transform -translate-y-1/2" />
            
            {/* Markers */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-white border-2 border-green-500 rounded-full" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-black/50 whitespace-nowrap">365+ days</span>
            </div>
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-white border-2 border-yellow-500 rounded-full" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-black/50 whitespace-nowrap">90 days</span>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-white border-2 border-orange-500 rounded-full" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-black/50 whitespace-nowrap">30 days</span>
            </div>
            <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-white border-2 border-red-500 rounded-full" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-black/50 whitespace-nowrap">7 days</span>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-white border-2 border-gray-500 rounded-full" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-black/50 whitespace-nowrap">Expired</span>
            </div>

            {/* Current date indicator */}
            <div className="absolute top-0 left-1/3 transform -translate-x-1/2">
              <div className="w-0.5 h-8 bg-red-600" />
              <div className="mt-1 text-xs font-medium text-red-600">Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
            <Input
              placeholder="Search by product, batch, SKU, or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next7days">Next 7 Days</SelectItem>
              <SelectItem value="next30days">Next 30 Days</SelectItem>
              <SelectItem value="next90days">Next 90 Days</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="all">All Items</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="expiring">Expiring</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc.id} value={loc.name}>
                  {loc.name} ({loc.count})
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

      {/* Expiry Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const StatusIcon = statusConfig[item.status]?.icon || Package;
            const daysUntilExpiry = item.daysUntilExpiry;
            
            return (
              <Card key={item.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(item.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {item.status}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(item.priority))}>
                            {item.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{item.productName}</h3>
                        <p className="text-xs text-black/50">{item.sku} • {item.batchNumber}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedItem(item);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {item.status !== 'expired' && item.discountEligible && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedItem(item);
                              setShowDiscountDialog(true);
                            }}>
                              <Percent className="mr-2 h-4 w-4" />
                              Apply Discount
                            </DropdownMenuItem>
                          )}
                          {item.status === 'expired' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedItem(item);
                              setShowDisposeDialog(true);
                            }}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Dispose
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            Set Alert
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Expiry Countdown */}
                    <div className="text-center mb-4">
                      <div className={cn(
                        "text-3xl font-bold",
                        getDaysUntilExpiryColor(daysUntilExpiry)
                      )}>
                        {daysUntilExpiry >= 0 ? daysUntilExpiry : 'Expired'}
                      </div>
                      <p className="text-xs text-black/50">days remaining</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Shelf Life</span>
                        <span className="text-xs font-medium">
                          {Math.max(0, Math.min(100, Math.round((daysUntilExpiry / 365) * 100)))}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.max(0, Math.min(100, (daysUntilExpiry / 365) * 100))} 
                        className="h-2 bg-[#F5EEE9]"
                        style={{ 
                          '--progress-background': 
                            daysUntilExpiry > 90 ? '#22c55e' :
                            daysUntilExpiry > 30 ? '#eab308' :
                            daysUntilExpiry > 7 ? '#f97316' :
                            daysUntilExpiry >= 0 ? '#ef4444' :
                            '#6b7280'
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Quantity</span>
                        <span className="font-medium">{item.quantity.toLocaleString()} {item.unit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Value</span>
                        <span className="font-medium text-green-600">${item.totalValue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Expiry Date</span>
                        <span className={cn(
                          "font-medium",
                          daysUntilExpiry < 0 ? 'text-gray-600' : 
                          daysUntilExpiry <= 7 ? 'text-red-600' : 
                          daysUntilExpiry <= 30 ? 'text-orange-600' : ''
                        )}>
                          {item.expiryDate}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mt-4 p-3 bg-[#F5EEE9]/50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-red-600" />
                        <span>{item.location} • {item.bin}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-4">
                      {item.discountEligible && item.status !== 'expired' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-[#F5EEE9]"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowDiscountDialog(true);
                          }}
                        >
                          <Percent size={14} className="mr-2" />
                          Discount
                        </Button>
                      )}
                      {item.status === 'expired' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowDisposeDialog(true);
                          }}
                        >
                          <Trash2 size={14} className="mr-2" />
                          Dispose
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-[#F5EEE9]"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowDetailsDialog(true);
                        }}
                      >
                        <Eye size={14} className="mr-2" />
                        Details
                      </Button>
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
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-black/50">Product</TableHead>
                  <TableHead className="text-black/50">Batch</TableHead>
                  <TableHead className="text-black/50">SKU</TableHead>
                  <TableHead className="text-black/50 text-right">Quantity</TableHead>
                  <TableHead className="text-black/50 text-right">Value</TableHead>
                  <TableHead className="text-black/50">Manufacturing</TableHead>
                  <TableHead className="text-black/50">Expiry Date</TableHead>
                  <TableHead className="text-black/50 text-right">Days Left</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell className="font-mono text-xs">{item.batchNumber}</TableCell>
                    <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                    <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600">${item.totalValue.toLocaleString()}</TableCell>
                    <TableCell>{item.manufacturingDate}</TableCell>
                    <TableCell>
                      <span className={cn(
                        item.daysUntilExpiry < 0 ? 'text-gray-600' : 
                        item.daysUntilExpiry <= 7 ? 'text-red-600 font-medium' : 
                        item.daysUntilExpiry <= 30 ? 'text-orange-600' : ''
                      )}>
                        {item.expiryDate}
                      </span>
                    </TableCell>
                    <TableCell className={cn("text-right font-bold", getDaysUntilExpiryColor(item.daysUntilExpiry))}>
                      {item.daysUntilExpiry >= 0 ? item.daysUntilExpiry : 'Expired'}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(item.status))}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(item.priority))}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.bin}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedItem(item);
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
                Showing {filteredItems.length} of {expiryItems.length} items
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

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Expiry Details</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="py-4 space-y-4">
              <div className="p-4 bg-[#F5EEE9] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{selectedItem.productName}</h3>
                  <Badge className={cn("text-xs border-0", getStatusColor(selectedItem.status))}>
                    {selectedItem.status}
                  </Badge>
                </div>
                <p className="text-sm text-black/50">{selectedItem.sku} • {selectedItem.batchNumber}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-black/50">Manufacturing Date</p>
                  <p className="font-medium">{selectedItem.manufacturingDate}</p>
                </div>
                <div>
                  <p className="text-sm text-black/50">Expiry Date</p>
                  <p className="font-medium text-red-600">{selectedItem.expiryDate}</p>
                </div>
                <div>
                  <p className="text-sm text-black/50">Days Remaining</p>
                  <p className={cn("font-bold text-lg", getDaysUntilExpiryColor(selectedItem.daysUntilExpiry))}>
                    {selectedItem.daysUntilExpiry >= 0 ? selectedItem.daysUntilExpiry : 'Expired'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-black/50">Quantity</p>
                  <p className="font-medium">{selectedItem.quantity} {selectedItem.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-black/50">Total Value</p>
                  <p className="font-medium text-green-600">${selectedItem.totalValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-black/50">Unit Cost</p>
                  <p className="font-medium">${selectedItem.unitCost}</p>
                </div>
              </div>

              <div className="p-3 bg-[#F5EEE9] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-red-600" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-sm">{selectedItem.location} • {selectedItem.zone} • {selectedItem.bin}</p>
                <p className="text-xs text-black/50 mt-1">{selectedItem.storageConditions}</p>
              </div>

              <div className="p-3 bg-[#F5EEE9] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Truck size={14} className="text-blue-600" />
                  <span className="text-sm font-medium">Supplier</span>
                </div>
                <p className="text-sm">{selectedItem.supplier}</p>
              </div>

              {selectedItem.notes && (
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-700">{selectedItem.notes}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {selectedItem.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedItem?.discountEligible && selectedItem?.status !== 'expired' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowDiscountDialog(true);
              }}>
                <Percent className="mr-2 h-4 w-4" />
                Apply Discount
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Discount Dialog */}
      <Dialog open={showDiscountDialog} onOpenChange={setShowDiscountDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Apply Discount</DialogTitle>
            <DialogDescription>
              Set discount for expiring items
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedItem?.productName}</p>
              <p className="text-sm text-black/50">Expires: {selectedItem?.expiryDate}</p>
              <p className="text-sm text-black/50">Quantity: {selectedItem?.quantity} {selectedItem?.unit}</p>
            </div>

            <div className="space-y-2">
              <Label>Discount Type</Label>
              <RadioGroup defaultValue="percentage" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage">Percentage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed">Fixed Amount</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Discount Value</Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="20" />
                <span className="text-black/50">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Promotion Type</Label>
              <Select defaultValue="clearance">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clearance">Clearance</SelectItem>
                  <SelectItem value="bogo">BOGO</SelectItem>
                  <SelectItem value="bundle">Bundle Deal</SelectItem>
                  <SelectItem value="flash">Flash Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Add notes about this promotion" rows={2} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDiscountDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Apply Discount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dispose Dialog */}
      <Dialog open={showDisposeDialog} onOpenChange={setShowDisposeDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Dispose Expired Items</DialogTitle>
            <DialogDescription>
              Record disposal of expired inventory
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-red-600 mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-medium text-red-700">Warning</p>
                  <p className="text-xs text-red-600/70">
                    You are about to dispose expired items. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedItem?.productName}</p>
              <p className="text-sm text-black/50">Batch: {selectedItem?.batchNumber}</p>
              <p className="text-sm text-black/50">Quantity: {selectedItem?.quantity} {selectedItem?.unit}</p>
              <p className="text-sm text-black/50">Expiry: {selectedItem?.expiryDate}</p>
            </div>

            <div className="space-y-2">
              <Label>Disposal Method</Label>
              <Select defaultValue="waste">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waste">Waste Management</SelectItem>
                  <SelectItem value="recycle">Recycling</SelectItem>
                  <SelectItem value="donation">Donation</SelectItem>
                  <SelectItem value="return">Return to Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Disposal Date</Label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>

            <div className="space-y-2">
              <Label>Approval</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select approver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Store Manager</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="compliance">Compliance Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Add disposal notes" rows={2} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisposeDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Confirm Disposal
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
                onClick={() => setShowReportDialog(true)}
              >
                <FileText size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Expiry Report</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowSettingsDialog(true)}
              >
                <Bell size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Alert Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setSelectedDate(new Date())}
              >
                <Calendar size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Calendar View</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ExpiryManagementPage;