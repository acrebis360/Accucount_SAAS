// app/dashboard/physical-inventory/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Package,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Download,
  Upload,
  Printer,
  Mail,
  Share2,
  Grid,
  List,

  Ban,
  AlertCircle,
  Settings,

  FileSpreadsheet,
  FileJson,
  File,
  Camera,
  QrCode,
  Barcode,
  Scan,

  Radio,
  
  Boxes,

  Truck,

  Clock as ClockIcon,
  Database,
  Cloud,
  DollarSign,
  
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PhysicalInventoryPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCountDialog, setShowCountDialog] = useState(false);
  const [showAdjustDialog, setShowAdjustDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showReceivingDialog, setShowReceivingDialog] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showBarcodeDialog, setShowBarcodeDialog] = useState(false);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [showRfidDialog, setShowRfidDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample physical inventory data
  const inventoryItems = [
    {
      id: 'INV-001',
      sku: 'SKU-001',
      name: 'Product A',
      description: 'High-quality electronic component',
      category: 'Electronics',
      subcategory: 'Components',
      location: 'Warehouse A',
      zone: 'Zone 1',
      bin: 'A-01-01',
      quantity: 1250,
      unit: 'pcs',
      unitCost: 12.50,
      totalValue: 15625.00,
      reorderPoint: 500,
      reorderQuantity: 1000,
      maxStock: 2000,
      minStock: 200,
      status: 'in_stock',
      condition: 'new',
      lastCounted: '2024-03-15',
      nextCountDue: '2024-04-15',
      countedBy: 'John Doe',
      accuracy: 100,
      discrepancies: 0,
      tags: ['electronic', 'high-value', 'fast-moving'],
      supplier: 'Tech Supplies Inc',
      batchNumber: 'BATCH-001',
      expiryDate: '2025-12-31',
      serialNumbers: ['SN001', 'SN002', 'SN003'],
      image: null,
    },
    {
      id: 'INV-002',
      sku: 'SKU-002',
      name: 'Product B',
      description: 'Ergonomic office chair',
      category: 'Furniture',
      subcategory: 'Chairs',
      location: 'Warehouse B',
      zone: 'Zone 3',
      bin: 'B-03-15',
      quantity: 45,
      unit: 'pcs',
      unitCost: 150.00,
      totalValue: 6750.00,
      reorderPoint: 50,
      reorderQuantity: 100,
      maxStock: 200,
      minStock: 20,
      status: 'low_stock',
      condition: 'new',
      lastCounted: '2024-03-14',
      nextCountDue: '2024-04-14',
      countedBy: 'Jane Smith',
      accuracy: 98.5,
      discrepancies: 1,
      tags: ['furniture', 'bulky', 'slow-moving'],
      supplier: 'Office Furniture Co',
      batchNumber: 'BATCH-002',
      expiryDate: null,
      serialNumbers: [],
      image: null,
    },
    {
      id: 'INV-003',
      sku: 'SKU-003',
      name: 'Product C',
      description: 'Cotton t-shirt, various sizes',
      category: 'Apparel',
      subcategory: 'Clothing',
      location: 'Store A',
      zone: 'Floor 1',
      bin: 'C-01-01',
      quantity: 350,
      unit: 'pcs',
      unitCost: 8.50,
      totalValue: 2975.00,
      reorderPoint: 200,
      reorderQuantity: 500,
      maxStock: 1000,
      minStock: 100,
      status: 'in_stock',
      condition: 'new',
      lastCounted: '2024-03-13',
      nextCountDue: '2024-04-13',
      countedBy: 'Mike Johnson',
      accuracy: 100,
      discrepancies: 0,
      tags: ['apparel', 'clothing', 'fast-moving'],
      supplier: 'Fashion Wholesale',
      batchNumber: 'BATCH-003',
      expiryDate: null,
      serialNumbers: [],
      image: null,
    },
    {
      id: 'INV-004',
      sku: 'SKU-004',
      name: 'Product D',
      description: 'Wireless headphones',
      category: 'Electronics',
      subcategory: 'Audio',
      location: 'Warehouse A',
      zone: 'Zone 2',
      bin: 'A-02-08',
      quantity: 0,
      unit: 'pcs',
      unitCost: 45.00,
      totalValue: 0.00,
      reorderPoint: 30,
      reorderQuantity: 100,
      maxStock: 200,
      minStock: 10,
      status: 'out_of_stock',
      condition: 'new',
      lastCounted: '2024-03-12',
      nextCountDue: '2024-04-12',
      countedBy: 'Sarah Wilson',
      accuracy: 100,
      discrepancies: 0,
      tags: ['electronics', 'audio', 'out-of-stock'],
      supplier: 'Audio Tech Ltd',
      batchNumber: 'BATCH-004',
      expiryDate: null,
      serialNumbers: [],
      image: null,
    },
    {
      id: 'INV-005',
      sku: 'SKU-005',
      name: 'Product E',
      description: 'Canned food assortment',
      category: 'Food',
      subcategory: 'Canned Goods',
      location: 'Warehouse C',
      zone: 'Zone 5',
      bin: 'C-05-12',
      quantity: 2500,
      unit: 'cans',
      unitCost: 2.25,
      totalValue: 5625.00,
      reorderPoint: 1000,
      reorderQuantity: 2000,
      maxStock: 5000,
      minStock: 500,
      status: 'in_stock',
      condition: 'new',
      lastCounted: '2024-03-11',
      nextCountDue: '2024-04-11',
      countedBy: 'Tom Brown',
      accuracy: 99.5,
      discrepancies: 2,
      tags: ['food', 'perishable', 'high-volume'],
      supplier: 'Food Distributors Inc',
      batchNumber: 'BATCH-005',
      expiryDate: '2024-12-31',
      serialNumbers: [],
      image: null,
    },
    {
      id: 'INV-006',
      sku: 'SKU-006',
      name: 'Product F',
      description: 'Industrial lubricant',
      category: 'Industrial',
      subcategory: 'Lubricants',
      location: 'Warehouse B',
      zone: 'Zone 4',
      bin: 'B-04-03',
      quantity: 75,
      unit: 'gallons',
      unitCost: 18.75,
      totalValue: 1406.25,
      reorderPoint: 50,
      reorderQuantity: 100,
      maxStock: 200,
      minStock: 25,
      status: 'low_stock',
      condition: 'new',
      lastCounted: '2024-03-10',
      nextCountDue: '2024-04-10',
      countedBy: 'Lisa Chen',
      accuracy: 97.8,
      discrepancies: 1,
      tags: ['industrial', 'chemical', 'hazardous'],
      supplier: 'Industrial Supplies Co',
      batchNumber: 'BATCH-006',
      expiryDate: '2025-06-30',
      serialNumbers: [],
      image: null,
    },
    {
      id: 'INV-007',
      sku: 'SKU-007',
      name: 'Product G',
      description: 'Smart LED TV 55"',
      category: 'Electronics',
      subcategory: 'TVs',
      location: 'Warehouse A',
      zone: 'Zone 1',
      bin: 'A-01-15',
      quantity: 23,
      unit: 'pcs',
      unitCost: 450.00,
      totalValue: 10350.00,
      reorderPoint: 15,
      reorderQuantity: 30,
      maxStock: 50,
      minStock: 5,
      status: 'in_stock',
      condition: 'new',
      lastCounted: '2024-03-09',
      nextCountDue: '2024-04-09',
      countedBy: 'David Lee',
      accuracy: 100,
      discrepancies: 0,
      tags: ['electronics', 'tv', 'high-value'],
      supplier: 'Electronics World',
      batchNumber: 'BATCH-007',
      expiryDate: null,
      serialNumbers: ['TV001', 'TV002', 'TV003'],
      image: null,
    },
    {
      id: 'INV-008',
      sku: 'SKU-008',
      name: 'Product H',
      description: 'Office desk, standing',
      category: 'Furniture',
      subcategory: 'Desks',
      location: 'Warehouse B',
      zone: 'Zone 3',
      bin: 'B-03-22',
      quantity: 12,
      unit: 'pcs',
      unitCost: 350.00,
      totalValue: 4200.00,
      reorderPoint: 10,
      reorderQuantity: 20,
      maxStock: 30,
      minStock: 5,
      status: 'critical',
      condition: 'new',
      lastCounted: '2024-03-08',
      nextCountDue: '2024-04-08',
      countedBy: 'Emma Watson',
      accuracy: 95.2,
      discrepancies: 1,
      tags: ['furniture', 'office', 'standing'],
      supplier: 'Office Furniture Co',
      batchNumber: 'BATCH-008',
      expiryDate: null,
      serialNumbers: [],
      image: null,
    },
    {
      id: 'INV-009',
      sku: 'SKU-009',
      name: 'Product I',
      description: 'First aid kit',
      category: 'Medical',
      subcategory: 'Supplies',
      location: 'Store B',
      zone: 'Pharmacy',
      bin: 'P-01-05',
      quantity: 48,
      unit: 'kits',
      unitCost: 25.00,
      totalValue: 1200.00,
      reorderPoint: 30,
      reorderQuantity: 60,
      maxStock: 100,
      minStock: 15,
      status: 'in_stock',
      condition: 'new',
      lastCounted: '2024-03-07',
      nextCountDue: '2024-04-07',
      countedBy: 'Anna Taylor',
      accuracy: 100,
      discrepancies: 0,
      tags: ['medical', 'safety', 'first-aid'],
      supplier: 'Medical Supplies Inc',
      batchNumber: 'BATCH-009',
      expiryDate: '2026-01-31',
      serialNumbers: [],
      image: null,
    },
    {
      id: 'INV-010',
      sku: 'SKU-010',
      name: 'Product J',
      description: 'Bulk paper rolls',
      category: 'Office Supplies',
      subcategory: 'Paper',
      location: 'Warehouse C',
      zone: 'Zone 6',
      bin: 'C-06-08',
      quantity: 150,
      unit: 'rolls',
      unitCost: 15.50,
      totalValue: 2325.00,
      reorderPoint: 75,
      reorderQuantity: 150,
      maxStock: 300,
      minStock: 30,
      status: 'in_stock',
      condition: 'new',
      lastCounted: '2024-03-06',
      nextCountDue: '2024-04-06',
      countedBy: 'Chris Evans',
      accuracy: 100,
      discrepancies: 0,
      tags: ['office', 'paper', 'bulk'],
      supplier: 'Office Supplies Co',
      batchNumber: 'BATCH-010',
      expiryDate: null,
      serialNumbers: [],
      image: null,
    },
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', zones: ['Zone 1', 'Zone 2'] },
    { id: 'wh-b', name: 'Warehouse B', zones: ['Zone 3', 'Zone 4'] },
    { id: 'wh-c', name: 'Warehouse C', zones: ['Zone 5', 'Zone 6'] },
    { id: 'store-a', name: 'Store A', zones: ['Floor 1', 'Floor 2'] },
    { id: 'store-b', name: 'Store B', zones: ['Pharmacy', 'General'] },
  ];

  // Categories
  const categories = [
    'Electronics',
    'Furniture',
    'Apparel',
    'Food',
    'Industrial',
    'Medical',
    'Office Supplies',
    'Automotive',
    'Books',
    'Toys',
    'Sports',
    'Beauty',
    'Home Goods',
    'Pet Supplies',
  ];

  // Status configuration
  const statusConfig = {
    in_stock: { label: 'In Stock', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    low_stock: { label: 'Low Stock', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    critical: { label: 'Critical', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    out_of_stock: { label: 'Out of Stock', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    on_order: { label: 'On Order', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    damaged: { label: 'Damaged', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertTriangle },
    quarantined: { label: 'Quarantined', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: AlertCircle },
  };

  const conditionConfig = {
    new: { label: 'New', color: 'bg-green-50 text-green-700' },
    used: { label: 'Used', color: 'bg-blue-50 text-blue-700' },
    refurbished: { label: 'Refurbished', color: 'bg-purple-50 text-purple-700' },
    damaged: { label: 'Damaged', color: 'bg-red-50 text-red-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getConditionColor = (condition) => {
    return conditionConfig[condition]?.color || 'bg-gray-50 text-gray-700';
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesLocation && matchesStatus && matchesSearch;
  });

  const stats = {
    totalItems: inventoryItems.length,
    totalQuantity: inventoryItems.reduce((sum, item) => sum + item.quantity, 0),
    totalValue: inventoryItems.reduce((sum, item) => sum + item.totalValue, 0),
    lowStock: inventoryItems.filter(i => i.status === 'low_stock').length,
    critical: inventoryItems.filter(i => i.status === 'critical').length,
    outOfStock: inventoryItems.filter(i => i.status === 'out_of_stock').length,
    inStock: inventoryItems.filter(i => i.status === 'in_stock').length,
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Physical Inventory</h1>
            <p className="text-black/50 mt-1">Manage and track physical inventory across all locations</p>
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
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#F5EEE9]">
                  <Upload size={16} />
                  Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Import from Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileJson className="mr-2 h-4 w-4" />
                  Import from CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Database className="mr-2 h-4 w-4" />
                  Import from ERP
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Cloud className="mr-2 h-4 w-4" />
                  Import from Cloud
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Add Item
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Items</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalItems}</p>
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
                  <p className="text-xs text-black/50">Total Quantity</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalQuantity.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Boxes size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Value</p>
                  <p className="text-xl font-bold text-black mt-1">${stats.totalValue.toLocaleString()}</p>
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
                  <p className="text-xs text-black/50">In Stock</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.inStock}</p>
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
                  <p className="text-xs text-black/50">Low Stock</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.lowStock}</p>
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
                  <p className="text-xl font-bold text-black mt-1">{stats.critical}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
            <Input
              placeholder="Search by name, SKU, category, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              <SelectItem value="on_order">On Order</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
              <SelectItem value="quarantined">Quarantined</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
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

      {/* Inventory Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const StatusIcon = statusConfig[item.status]?.icon || Package;
            
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
                            {statusConfig[item.status]?.label}
                          </Badge>
                          <Badge className={cn("text-xs", getConditionColor(item.condition))}>
                            {item.condition}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black mt-1">{item.name}</h3>
                        <p className="text-xs text-black/50">{item.sku}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedInventory(item);
                            setShowCountDialog(true);
                          }}>
                            <Scan className="mr-2 h-4 w-4" />
                            Count Item
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedInventory(item);
                            setShowAdjustDialog(true);
                          }}>
                            <Settings className="mr-2 h-4 w-4" />
                            Adjust Quantity
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedInventory(item);
                            setShowTransferDialog(true);
                          }}>
                            <Truck className="mr-2 h-4 w-4" />
                            Transfer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setSelectedInventory(item);
                            setShowEditDialog(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedInventory(item);
                            setShowHistoryDialog(true);
                          }}>
                            <Clock className="mr-2 h-4 w-4" />
                            History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                            setSelectedInventory(item);
                            setShowDeleteDialog(true);
                          }}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Category</span>
                        <span className="font-medium text-black">{item.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Location</span>
                        <span className="font-medium text-black">{item.bin}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Quantity</span>
                        <span className="font-medium text-black">{item.quantity.toLocaleString()} {item.unit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Unit Cost</span>
                        <span className="font-medium text-black">${item.unitCost.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Total Value</span>
                        <span className="font-medium text-green-600">${item.totalValue.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Stock Level Indicator */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Stock Level</span>
                        <span className="text-xs font-medium">
                          {Math.round((item.quantity / item.maxStock) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(item.quantity / item.maxStock) * 100} 
                        className="h-2 bg-[#F5EEE9]"
                        style={{ 
                          '--progress-background': 
                            item.status === 'critical' ? '#ef4444' :
                            item.status === 'low_stock' ? '#eab308' :
                            '#22c55e'
                        }}
                      />
                    </div>

                    {/* Reorder Info */}
                    <div className="mt-4 p-3 bg-[#F5EEE9]/50 rounded-lg">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-black/50">Reorder Point</span>
                        <span className="font-medium">{item.reorderPoint} {item.unit}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-black/50">Reorder Qty</span>
                        <span className="font-medium">{item.reorderQuantity} {item.unit}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-4">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9] bg-[#F5EEE9]/30">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          +{item.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F5EEE9]">
                      <div className="flex items-center gap-1 text-xs text-black/50">
                        <Clock size={12} />
                        Last: {item.lastCounted}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle size={12} />
                        {item.accuracy}% accuracy
                      </div>
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
                  <TableHead className="text-black/50">SKU</TableHead>
                  <TableHead className="text-black/50">Product Name</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50 text-right">Quantity</TableHead>
                  <TableHead className="text-black/50 text-right">Unit Cost</TableHead>
                  <TableHead className="text-black/50 text-right">Total Value</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Condition</TableHead>
                  <TableHead className="text-black/50">Last Counted</TableHead>
                  <TableHead className="text-black/50 text-right">Accuracy</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => {
                  const StatusIcon = statusConfig[item.status]?.icon || Package;
                  
                  return (
                    <TableRow key={item.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                      <TableCell className="font-medium">
                        <div>
                          {item.name}
                          <p className="text-xs text-black/50">{item.description.substring(0, 30)}...</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.bin}</TableCell>
                      <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${item.unitCost.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        ${item.totalValue.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(item.status))}>
                          <StatusIcon className="mr-1" size={10} />
                          {statusConfig[item.status]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getConditionColor(item.condition))}>
                          {item.condition}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.lastCounted}</TableCell>
                      <TableCell className="text-right">
                        <span className={item.accuracy >= 99 ? 'text-green-600' : 'text-yellow-600'}>
                          {item.accuracy}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-[#F5EEE9] p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-black/50">
                Showing {filteredItems.length} of {inventoryItems.length} items
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

      {/* Add Item Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
            <DialogDescription>
              Add a new item to physical inventory
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>SKU</Label>
                <Input placeholder="e.g., SKU-001" />
              </div>
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input placeholder="Enter product name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Enter product description" rows={2} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subcategory</Label>
                <Input placeholder="e.g., Components" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(loc => (
                      <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Zone/Bin</Label>
                <Input placeholder="e.g., A-01-01" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" defaultValue="0" />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select defaultValue="pcs">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pcs">Pieces</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="lbs">Pounds</SelectItem>
                    <SelectItem value="boxes">Boxes</SelectItem>
                    <SelectItem value="pallets">Pallets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Unit Cost ($)</Label>
                <Input type="number" step="0.01" defaultValue="0.00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Input placeholder="Enter supplier name" />
              </div>
              <div className="space-y-2">
                <Label>Batch Number</Label>
                <Input placeholder="e.g., BATCH-001" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Reorder Point</Label>
                <Input type="number" defaultValue="0" />
              </div>
              <div className="space-y-2">
                <Label>Reorder Quantity</Label>
                <Input type="number" defaultValue="0" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select defaultValue="new">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                    <SelectItem value="refurbished">Refurbished</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Enter tags separated by commas" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Count Item Dialog */}
      <Dialog open={showCountDialog} onOpenChange={setShowCountDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Count Item: {selectedInventory?.name}</DialogTitle>
            <DialogDescription>
              Enter the physical count for this item
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-[#F5EEE9] rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">SKU</p>
                  <p className="text-sm font-medium text-black">{selectedInventory?.sku}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Location</p>
                  <p className="text-sm font-medium text-black">{selectedInventory?.bin}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">System Quantity</p>
                  <p className="text-sm font-medium text-black">{selectedInventory?.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Last Counted</p>
                  <p className="text-sm font-medium text-black">{selectedInventory?.lastCounted}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Physical Count</Label>
                <Input type="number" placeholder="Enter counted quantity" />
              </div>

              <div className="space-y-2">
                <Label>Count Method</Label>
                <RadioGroup defaultValue="manual" className="flex gap-4">
                  {['Manual', 'Scanner', 'Batch'].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.toLowerCase()} id={`method-${method}`} />
                      <Label htmlFor={`method-${method}`}>{method}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Add any notes about this count" rows={3} />
              </div>

              {selectedInventory?.quantity !== 1250 && (
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-700">Count Discrepancy</p>
                      <p className="text-xs text-yellow-600/70 mt-1">
                        The physical count differs from system quantity. This will create an adjustment record.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCountDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Submit Count
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Quantity Dialog */}
      <Dialog open={showAdjustDialog} onOpenChange={setShowAdjustDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adjust Quantity: {selectedInventory?.name}</DialogTitle>
            <DialogDescription>
              Make adjustments to inventory quantity
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-[#F5EEE9] rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Current Quantity</p>
                  <p className="text-lg font-bold text-black">{selectedInventory?.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Unit</p>
                  <p className="text-sm font-medium text-black">{selectedInventory?.unit}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Adjustment Type</Label>
                <RadioGroup defaultValue="add" className="flex gap-4">
                  {['Add', 'Remove', 'Set'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.toLowerCase()} id={`type-${type}`} />
                      <Label htmlFor={`type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" placeholder="Enter quantity" />
              </div>

              <div className="space-y-2">
                <Label>Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="damage">Damage</SelectItem>
                    <SelectItem value="loss">Loss/Theft</SelectItem>
                    <SelectItem value="found">Found Item</SelectItem>
                    <SelectItem value="return">Customer Return</SelectItem>
                    <SelectItem value="quality">Quality Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Add notes about this adjustment" rows={3} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdjustDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Apply Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Transfer Item: {selectedInventory?.name}</DialogTitle>
            <DialogDescription>
              Move inventory to another location
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-[#F5EEE9] rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Current Location</p>
                  <p className="text-sm font-medium text-black">{selectedInventory?.bin}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Quantity</p>
                  <p className="text-sm font-medium text-black">{selectedInventory?.quantity}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Destination Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wh-a-zone1">Warehouse A - Zone 1</SelectItem>
                    <SelectItem value="wh-a-zone2">Warehouse A - Zone 2</SelectItem>
                    <SelectItem value="wh-b-zone3">Warehouse B - Zone 3</SelectItem>
                    <SelectItem value="wh-b-zone4">Warehouse B - Zone 4</SelectItem>
                    <SelectItem value="store-a-floor1">Store A - Floor 1</SelectItem>
                    <SelectItem value="store-a-floor2">Store A - Floor 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quantity to Transfer</Label>
                <Input type="number" placeholder="Enter quantity" max={selectedInventory?.quantity} />
              </div>

              <div className="space-y-2">
                <Label>Transfer Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restock">Restock Store</SelectItem>
                    <SelectItem value="consolidation">Inventory Consolidation</SelectItem>
                    <SelectItem value="customer">Customer Order</SelectItem>
                    <SelectItem value="return">Return to Warehouse</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Expected Arrival</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Add notes about this transfer" rows={3} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Initiate Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scan Dialog */}
      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Scan Barcode/QR Code</DialogTitle>
            <DialogDescription>
              Use scanner or camera to identify items
            </DialogDescription>
          </DialogHeader>

          <div className="py-8">
            <Tabs defaultValue="barcode" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="barcode">Barcode</TabsTrigger>
                <TabsTrigger value="qrcode">QR Code</TabsTrigger>
                <TabsTrigger value="rfid">RFID</TabsTrigger>
              </TabsList>

              <TabsContent value="barcode" className="text-center">
                <div className="w-48 h-48 bg-[#F5EEE9] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Barcode size={80} className="text-black/30" />
                </div>
                <p className="text-sm text-black/50 mb-4">
                  Position barcode in front of camera or use scanner
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="outline" className="border-[#F5EEE9]">
                    <Camera size={16} className="mr-2" />
                    Use Camera
                  </Button>
                  <Button variant="outline" className="border-[#F5EEE9]">
                    <Scan size={16} className="mr-2" />
                    Manual Entry
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="qrcode" className="text-center">
                <div className="w-48 h-48 bg-[#F5EEE9] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <QrCode size={80} className="text-black/30" />
                </div>
                <p className="text-sm text-black/50 mb-4">
                  Position QR code in front of camera
                </p>
                <Button variant="outline" className="border-[#F5EEE9]">
                  <Camera size={16} className="mr-2" />
                  Scan QR Code
                </Button>
              </TabsContent>

              <TabsContent value="rfid" className="text-center">
                <div className="w-48 h-48 bg-[#F5EEE9] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Radio size={80} className="text-black/30" />
                </div>
                <p className="text-sm text-black/50 mb-4">
                  Place RFID tag near scanner
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Badge className="bg-green-100 text-green-700">Ready</Badge>
                  <span className="text-sm text-black/50">Waiting for tag...</span>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-[#F5EEE9] rounded-lg">
              <p className="text-xs text-black/50 text-center">
                Recently Scanned: <span className="text-black font-medium">SKU-001 - Product A</span>
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScanDialog(false)}>
              Close
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
                onClick={() => setShowScanDialog(true)}
              >
                <Scan size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Scan Items</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Add Item</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowReportDialog(true)}
              >
                <BarChart3 size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Generate Report</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PhysicalInventoryPage;