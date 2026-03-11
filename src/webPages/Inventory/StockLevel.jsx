// app/dashboard/stock-levels/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Download,
  Upload,
  Printer,
  Mail,
  Share2,
  Grid,
  List,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Minus,
  Settings,
  FileSpreadsheet,
  FileJson,
  File,
  ShoppingCart,
  Truck,
  DollarSign,

  Clock as ClockIcon,
  ArrowUp,
  ArrowDown,

  Ban,

  Boxes,
  Box,
  Package as PackageIcon,
  PackageMinus,
  PackagePlus,
 
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
  DialogTrigger,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const StockLevelsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showReorderDialog, setShowReorderDialog] = useState(false);
  const [showBulkReorderDialog, setShowBulkReorderDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showForecastDialog, setShowForecastDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample stock level data
  const stockItems = [
    {
      id: 'STK-001',
      sku: 'SKU-001',
      name: 'Product A - High-End Electronics',
      category: 'Electronics',
      subcategory: 'Components',
      location: 'Warehouse A',
      zone: 'Zone 1',
      bin: 'A-01-01',
      currentStock: 1250,
      reservedStock: 150,
      availableStock: 1100,
      incomingStock: 500,
      outgoingStock: 200,
      unit: 'pcs',
      unitCost: 12.50,
      totalValue: 15625.00,
      reorderPoint: 500,
      reorderQuantity: 1000,
      minStock: 200,
      maxStock: 2000,
      status: 'healthy',
      trend: 'up',
      trendPercentage: 15,
      lastUpdated: '2024-03-15 14:30',
      nextDelivery: '2024-03-20',
      supplier: 'Tech Supplies Inc',
      leadTime: 5,
      demandRate: 150,
      daysUntilReorder: 23,
      turnoverRate: 4.5,
      tags: ['electronic', 'high-value', 'fast-moving'],
      image: null,
    },
    {
      id: 'STK-002',
      sku: 'SKU-002',
      name: 'Product B - Ergonomic Office Chair',
      category: 'Furniture',
      subcategory: 'Chairs',
      location: 'Warehouse B',
      zone: 'Zone 3',
      bin: 'B-03-15',
      currentStock: 45,
      reservedStock: 10,
      availableStock: 35,
      incomingStock: 0,
      outgoingStock: 5,
      unit: 'pcs',
      unitCost: 150.00,
      totalValue: 6750.00,
      reorderPoint: 50,
      reorderQuantity: 100,
      minStock: 20,
      maxStock: 200,
      status: 'low',
      trend: 'down',
      trendPercentage: -12,
      lastUpdated: '2024-03-15 09:15',
      nextDelivery: '2024-03-25',
      supplier: 'Office Furniture Co',
      leadTime: 7,
      demandRate: 8,
      daysUntilReorder: 2,
      turnoverRate: 3.2,
      tags: ['furniture', 'bulky', 'slow-moving'],
      image: null,
    },
    {
      id: 'STK-003',
      sku: 'SKU-003',
      name: 'Product C - Cotton T-Shirt (White, L)',
      category: 'Apparel',
      subcategory: 'Clothing',
      location: 'Store A',
      zone: 'Floor 1',
      bin: 'C-01-01',
      currentStock: 350,
      reservedStock: 45,
      availableStock: 305,
      incomingStock: 200,
      outgoingStock: 30,
      unit: 'pcs',
      unitCost: 8.50,
      totalValue: 2975.00,
      reorderPoint: 200,
      reorderQuantity: 500,
      minStock: 100,
      maxStock: 1000,
      status: 'healthy',
      trend: 'up',
      trendPercentage: 8,
      lastUpdated: '2024-03-14 16:45',
      nextDelivery: '2024-03-18',
      supplier: 'Fashion Wholesale',
      leadTime: 3,
      demandRate: 120,
      daysUntilReorder: 15,
      turnoverRate: 6.8,
      tags: ['apparel', 'clothing', 'fast-moving'],
      image: null,
    },
    {
      id: 'STK-004',
      sku: 'SKU-004',
      name: 'Product D - Wireless Headphones',
      category: 'Electronics',
      subcategory: 'Audio',
      location: 'Warehouse A',
      zone: 'Zone 2',
      bin: 'A-02-08',
      currentStock: 0,
      reservedStock: 0,
      availableStock: 0,
      incomingStock: 150,
      outgoingStock: 0,
      unit: 'pcs',
      unitCost: 45.00,
      totalValue: 0.00,
      reorderPoint: 30,
      reorderQuantity: 100,
      minStock: 10,
      maxStock: 200,
      status: 'out_of_stock',
      trend: 'down',
      trendPercentage: -100,
      lastUpdated: '2024-03-14 11:20',
      nextDelivery: '2024-03-22',
      supplier: 'Audio Tech Ltd',
      leadTime: 6,
      demandRate: 25,
      daysUntilReorder: -5,
      turnoverRate: 8.5,
      tags: ['electronics', 'audio', 'out-of-stock'],
      image: null,
    },
    {
      id: 'STK-005',
      sku: 'SKU-005',
      name: 'Product E - Canned Soup Assortment',
      category: 'Food',
      subcategory: 'Canned Goods',
      location: 'Warehouse C',
      zone: 'Zone 5',
      bin: 'C-05-12',
      currentStock: 2500,
      reservedStock: 300,
      availableStock: 2200,
      incomingStock: 1000,
      outgoingStock: 450,
      unit: 'cans',
      unitCost: 2.25,
      totalValue: 5625.00,
      reorderPoint: 1000,
      reorderQuantity: 2000,
      minStock: 500,
      maxStock: 5000,
      status: 'healthy',
      trend: 'up',
      trendPercentage: 5,
      lastUpdated: '2024-03-14 10:05',
      nextDelivery: '2024-03-19',
      supplier: 'Food Distributors Inc',
      leadTime: 4,
      demandRate: 800,
      daysUntilReorder: 10,
      turnoverRate: 12.5,
      tags: ['food', 'perishable', 'high-volume'],
      image: null,
    },
    {
      id: 'STK-006',
      sku: 'SKU-006',
      name: 'Product F - Industrial Lubricant',
      category: 'Industrial',
      subcategory: 'Lubricants',
      location: 'Warehouse B',
      zone: 'Zone 4',
      bin: 'B-04-03',
      currentStock: 75,
      reservedStock: 15,
      availableStock: 60,
      incomingStock: 50,
      outgoingStock: 10,
      unit: 'gallons',
      unitCost: 18.75,
      totalValue: 1406.25,
      reorderPoint: 50,
      reorderQuantity: 100,
      minStock: 25,
      maxStock: 200,
      status: 'low',
      trend: 'down',
      trendPercentage: -8,
      lastUpdated: '2024-03-13 15:30',
      nextDelivery: '2024-03-24',
      supplier: 'Industrial Supplies Co',
      leadTime: 7,
      demandRate: 12,
      daysUntilReorder: 4,
      turnoverRate: 2.8,
      tags: ['industrial', 'chemical', 'hazardous'],
      image: null,
    },
    {
      id: 'STK-007',
      sku: 'SKU-007',
      name: 'Product G - Smart LED TV 55"',
      category: 'Electronics',
      subcategory: 'TVs',
      location: 'Warehouse A',
      zone: 'Zone 1',
      bin: 'A-01-15',
      currentStock: 23,
      reservedStock: 5,
      availableStock: 18,
      incomingStock: 0,
      outgoingStock: 2,
      unit: 'pcs',
      unitCost: 450.00,
      totalValue: 10350.00,
      reorderPoint: 15,
      reorderQuantity: 30,
      minStock: 5,
      maxStock: 50,
      status: 'critical',
      trend: 'down',
      trendPercentage: -25,
      lastUpdated: '2024-03-13 09:45',
      nextDelivery: '2024-03-28',
      supplier: 'Electronics World',
      leadTime: 10,
      demandRate: 5,
      daysUntilReorder: 1,
      turnoverRate: 2.1,
      tags: ['electronics', 'tv', 'high-value'],
      image: null,
    },
    {
      id: 'STK-008',
      sku: 'SKU-008',
      name: 'Product H - Standing Desk',
      category: 'Furniture',
      subcategory: 'Desks',
      location: 'Warehouse B',
      zone: 'Zone 3',
      bin: 'B-03-22',
      currentStock: 12,
      reservedStock: 3,
      availableStock: 9,
      incomingStock: 20,
      outgoingStock: 1,
      unit: 'pcs',
      unitCost: 350.00,
      totalValue: 4200.00,
      reorderPoint: 10,
      reorderQuantity: 20,
      minStock: 5,
      maxStock: 30,
      status: 'critical',
      trend: 'down',
      trendPercentage: -40,
      lastUpdated: '2024-03-12 14:20',
      nextDelivery: '2024-03-26',
      supplier: 'Office Furniture Co',
      leadTime: 8,
      demandRate: 3,
      daysUntilReorder: -2,
      turnoverRate: 1.5,
      tags: ['furniture', 'office', 'standing'],
      image: null,
    },
    {
      id: 'STK-009',
      sku: 'SKU-009',
      name: 'Product I - First Aid Kit',
      category: 'Medical',
      subcategory: 'Supplies',
      location: 'Store B',
      zone: 'Pharmacy',
      bin: 'P-01-05',
      currentStock: 48,
      reservedStock: 8,
      availableStock: 40,
      incomingStock: 60,
      outgoingStock: 5,
      unit: 'kits',
      unitCost: 25.00,
      totalValue: 1200.00,
      reorderPoint: 30,
      reorderQuantity: 60,
      minStock: 15,
      maxStock: 100,
      status: 'healthy',
      trend: 'up',
      trendPercentage: 12,
      lastUpdated: '2024-03-12 11:10',
      nextDelivery: '2024-03-21',
      supplier: 'Medical Supplies Inc',
      leadTime: 5,
      demandRate: 15,
      daysUntilReorder: 20,
      turnoverRate: 4.2,
      tags: ['medical', 'safety', 'first-aid'],
      image: null,
    },
    {
      id: 'STK-010',
      sku: 'SKU-010',
      name: 'Product J - Bulk Paper Rolls',
      category: 'Office Supplies',
      subcategory: 'Paper',
      location: 'Warehouse C',
      zone: 'Zone 6',
      bin: 'C-06-08',
      currentStock: 150,
      reservedStock: 25,
      availableStock: 125,
      incomingStock: 0,
      outgoingStock: 15,
      unit: 'rolls',
      unitCost: 15.50,
      totalValue: 2325.00,
      reorderPoint: 75,
      reorderQuantity: 150,
      minStock: 30,
      maxStock: 300,
      status: 'healthy',
      trend: 'flat',
      trendPercentage: 0,
      lastUpdated: '2024-03-11 16:30',
      nextDelivery: '2024-04-01',
      supplier: 'Office Supplies Co',
      leadTime: 6,
      demandRate: 40,
      daysUntilReorder: 12,
      turnoverRate: 5.8,
      tags: ['office', 'paper', 'bulk'],
      image: null,
    },
    {
      id: 'STK-011',
      sku: 'SKU-011',
      name: 'Product K - Smartphone Case',
      category: 'Electronics',
      subcategory: 'Accessories',
      location: 'Store A',
      zone: 'Floor 2',
      bin: 'E-02-10',
      currentStock: 320,
      reservedStock: 45,
      availableStock: 275,
      incomingStock: 200,
      outgoingStock: 35,
      unit: 'pcs',
      unitCost: 15.99,
      totalValue: 5116.80,
      reorderPoint: 150,
      reorderQuantity: 300,
      minStock: 75,
      maxStock: 600,
      status: 'healthy',
      trend: 'up',
      trendPercentage: 22,
      lastUpdated: '2024-03-11 10:15',
      nextDelivery: '2024-03-23',
      supplier: 'Mobile Accessories Inc',
      leadTime: 4,
      demandRate: 85,
      daysUntilReorder: 8,
      turnoverRate: 7.5,
      tags: ['electronics', 'accessories', 'fast-moving'],
      image: null,
    },
    {
      id: 'STK-012',
      sku: 'SKU-012',
      name: 'Product L - Protein Powder',
      category: 'Health',
      subcategory: 'Supplements',
      location: 'Store B',
      zone: 'Health',
      bin: 'H-01-03',
      currentStock: 65,
      reservedStock: 12,
      availableStock: 53,
      incomingStock: 100,
      outgoingStock: 8,
      unit: 'containers',
      unitCost: 32.50,
      totalValue: 2112.50,
      reorderPoint: 40,
      reorderQuantity: 80,
      minStock: 20,
      maxStock: 150,
      status: 'healthy',
      trend: 'up',
      trendPercentage: 18,
      lastUpdated: '2024-03-10 13:40',
      nextDelivery: '2024-03-27',
      supplier: 'Health Supplements Co',
      leadTime: 7,
      demandRate: 25,
      daysUntilReorder: 6,
      turnoverRate: 5.2,
      tags: ['health', 'supplements', 'protein'],
      image: null,
    },
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', count: 3 },
    { id: 'wh-b', name: 'Warehouse B', count: 3 },
    { id: 'wh-c', name: 'Warehouse C', count: 2 },
    { id: 'store-a', name: 'Store A', count: 2 },
    { id: 'store-b', name: 'Store B', count: 2 },
  ];

  // Categories
  const categories = [
    { id: 'electronics', name: 'Electronics', count: 3 },
    { id: 'furniture', name: 'Furniture', count: 2 },
    { id: 'apparel', name: 'Apparel', count: 1 },
    { id: 'food', name: 'Food', count: 1 },
    { id: 'industrial', name: 'Industrial', count: 1 },
    { id: 'medical', name: 'Medical', count: 1 },
    { id: 'office', name: 'Office Supplies', count: 1 },
    { id: 'health', name: 'Health', count: 1 },
  ];

  // Suppliers
  const suppliers = [
    'Tech Supplies Inc',
    'Office Furniture Co',
    'Fashion Wholesale',
    'Audio Tech Ltd',
    'Food Distributors Inc',
    'Industrial Supplies Co',
    'Electronics World',
    'Medical Supplies Inc',
    'Office Supplies Co',
    'Mobile Accessories Inc',
    'Health Supplements Co',
  ];

  // Status configuration
  const statusConfig = {
    healthy: { label: 'Healthy', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    low: { label: 'Low Stock', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    critical: { label: 'Critical', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    out_of_stock: { label: 'Out of Stock', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    overstock: { label: 'Overstock', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Package },
  };

  const trendConfig = {
    up: { label: 'Up', color: 'text-green-600', icon: TrendingUp },
    down: { label: 'Down', color: 'text-red-600', icon: TrendingDown },
    flat: { label: 'Flat', color: 'text-gray-600', icon: Minus },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Package;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getTrendIcon = (trend) => {
    const config = trendConfig[trend];
    const Icon = config?.icon || Minus;
    return <Icon size={14} className={config?.color} />;
  };

  const getStockLevelPercentage = (item) => {
    return Math.round((item.currentStock / item.maxStock) * 100);
  };

  const getStockHealthColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const filteredItems = stockItems.filter(item => {
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSupplier = selectedSupplier === 'all' || item.supplier === selectedSupplier;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesLocation && matchesCategory && matchesStatus && matchesSupplier && matchesSearch;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'stock':
        comparison = a.currentStock - b.currentStock;
        break;
      case 'value':
        comparison = a.totalValue - b.totalValue;
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'turnover':
        comparison = a.turnoverRate - b.turnoverRate;
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const stats = {
    totalItems: stockItems.length,
    totalStock: stockItems.reduce((sum, item) => sum + item.currentStock, 0),
    totalValue: stockItems.reduce((sum, item) => sum + item.totalValue, 0),
    healthy: stockItems.filter(i => i.status === 'healthy').length,
    low: stockItems.filter(i => i.status === 'low').length,
    critical: stockItems.filter(i => i.status === 'critical').length,
    outOfStock: stockItems.filter(i => i.status === 'out_of_stock').length,
    overstock: stockItems.filter(i => i.status === 'overstock').length,
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Stock Levels</h1>
            <p className="text-black/50 mt-1">Monitor and manage inventory stock levels across all locations</p>
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

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowForecastDialog(true)}
            >
              <TrendingUp size={16} />
              Forecast
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowBulkReorderDialog(true)}
            >
              <ShoppingCart size={16} />
              Bulk Reorder
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
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
                  <p className="text-xs text-black/50">Total Stock</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalStock.toLocaleString()}</p>
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
                  <p className="text-xs text-black/50">Healthy</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.healthy}</p>
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
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.low}</p>
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
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.critical}</p>
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
                  <p className="text-xs text-black/50">Out of Stock</p>
                  <p className="text-xl font-bold text-gray-600 mt-1">{stats.outOfStock}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-full">
                  <Ban size={18} className="text-gray-600" />
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
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc.id} value={loc.name}>{loc.name} ({loc.count})</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.name}>{cat.name} ({cat.count})</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              <SelectItem value="overstock">Overstock</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suppliers</SelectItem>
              {suppliers.map(supplier => (
                <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
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
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="stock">Stock Level</SelectItem>
              <SelectItem value="value">Value</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="turnover">Turnover</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="border-[#F5EEE9]"
          >
            {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </Button>

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

      {/* Stock Level Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {sortedItems.map((item) => {
            const StatusIcon = statusConfig[item.status]?.icon || Package;
            const stockPercentage = getStockLevelPercentage(item);
            
            return (
              <Card key={item.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={cn("text-xs border-0", getStatusColor(item.status))}>
                          <StatusIcon className="mr-1" size={10} />
                          {statusConfig[item.status]?.label}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs">
                          {getTrendIcon(item.trend)}
                          <span className={trendConfig[item.trend]?.color}>
                            {Math.abs(item.trendPercentage)}%
                          </span>
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
                            setSelectedItem(item);
                            setShowReorderDialog(true);
                          }}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Reorder
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedItem(item);
                            setShowHistoryDialog(true);
                          }}>
                            <Clock className="mr-2 h-4 w-4" />
                            View History
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        item.category === 'Electronics' && 'bg-blue-100',
                        item.category === 'Furniture' && 'bg-orange-100',
                        item.category === 'Apparel' && 'bg-purple-100',
                        item.category === 'Food' && 'bg-green-100',
                        item.category === 'Industrial' && 'bg-gray-100',
                        item.category === 'Medical' && 'bg-red-100',
                        item.category === 'Office Supplies' && 'bg-yellow-100',
                        item.category === 'Health' && 'bg-teal-100',
                      )}>
                        <Package size={20} className={cn(
                          item.category === 'Electronics' && 'text-blue-700',
                          item.category === 'Furniture' && 'text-orange-700',
                          item.category === 'Apparel' && 'text-purple-700',
                          item.category === 'Food' && 'text-green-700',
                          item.category === 'Industrial' && 'text-gray-700',
                          item.category === 'Medical' && 'text-red-700',
                          item.category === 'Office Supplies' && 'text-yellow-700',
                          item.category === 'Health' && 'text-teal-700',
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-black truncate">{item.name}</h3>
                        <p className="text-xs text-black/50">{item.sku}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            {item.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            {item.bin}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stock Information */}
                  <div className="p-4">
                    {/* Stock Level Gauge */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Stock Level</span>
                        <span className="text-xs font-medium">{stockPercentage}%</span>
                      </div>
                      <div className="h-2 bg-[#F5EEE9] rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            getStockHealthColor(stockPercentage)
                          )}
                          style={{ width: `${stockPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-[#F5EEE9]/30 rounded-lg">
                        <p className="text-xs text-black/50">Current</p>
                        <p className="text-lg font-bold text-black">{item.currentStock}</p>
                        <p className="text-xs text-black/50">{item.unit}</p>
                      </div>
                      <div className="text-center p-2 bg-[#F5EEE9]/30 rounded-lg">
                        <p className="text-xs text-black/50">Available</p>
                        <p className="text-lg font-bold text-green-600">{item.availableStock}</p>
                        <p className="text-xs text-black/50">{item.unit}</p>
                      </div>
                      <div className="text-center p-2 bg-[#F5EEE9]/30 rounded-lg">
                        <p className="text-xs text-black/50">Reserved</p>
                        <p className="text-lg font-bold text-orange-600">{item.reservedStock}</p>
                        <p className="text-xs text-black/50">{item.unit}</p>
                      </div>
                    </div>

                    {/* Reorder Information */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Reorder Point</span>
                        <span className="font-medium text-black">{item.reorderPoint}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Min / Max</span>
                        <span className="font-medium text-black">{item.minStock} / {item.maxStock}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Days Until Reorder</span>
                        <span className={cn(
                          "font-medium",
                          item.daysUntilReorder < 0 ? 'text-red-600' : 
                          item.daysUntilReorder < 5 ? 'text-orange-600' : 'text-green-600'
                        )}>
                          {item.daysUntilReorder < 0 ? 'Overdue' : item.daysUntilReorder}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Turnover Rate</span>
                        <span className="font-medium text-black">{item.turnoverRate}/month</span>
                      </div>
                    </div>

                    {/* Incoming/Outgoing */}
                    <div className="mt-4 p-3 bg-[#F5EEE9]/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <PackagePlus size={14} className="text-green-600" />
                          <span className="text-xs text-black/50">Incoming</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">+{item.incomingStock}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <PackageMinus size={14} className="text-red-600" />
                          <span className="text-xs text-black/50">Outgoing</span>
                        </div>
                        <span className="text-sm font-medium text-red-600">-{item.outgoingStock}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F5EEE9]">
                      <div className="flex items-center gap-1 text-xs text-black/50">
                        <Truck size={12} />
                        Next: {item.nextDelivery}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowReorderDialog(true);
                        }}
                      >
                        Reorder
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
                  <TableHead className="text-black/50">SKU</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50 text-right">Current</TableHead>
                  <TableHead className="text-black/50 text-right">Available</TableHead>
                  <TableHead className="text-black/50 text-right">Reserved</TableHead>
                  <TableHead className="text-black/50 text-right">Reorder</TableHead>
                  <TableHead className="text-black/50 text-right">Min/Max</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Trend</TableHead>
                  <TableHead className="text-black/50">Value</TableHead>
                  <TableHead className="text-black/50">Next Delivery</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedItems.map((item) => (
                  <TableRow key={item.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "p-1 rounded",
                          item.category === 'Electronics' && 'bg-blue-100',
                          item.category === 'Furniture' && 'bg-orange-100',
                          item.category === 'Apparel' && 'bg-purple-100',
                        )}>
                          <Package size={14} className={cn(
                            item.category === 'Electronics' && 'text-blue-700',
                            item.category === 'Furniture' && 'text-orange-700',
                            item.category === 'Apparel' && 'text-purple-700',
                          )} />
                        </div>
                        <div>
                          <p className="font-medium text-black">{item.name}</p>
                          <p className="text-xs text-black/50">{item.category}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                    <TableCell>{item.bin}</TableCell>
                    <TableCell className="text-right font-medium">{item.currentStock}</TableCell>
                    <TableCell className="text-right text-green-600">{item.availableStock}</TableCell>
                    <TableCell className="text-right text-orange-600">{item.reservedStock}</TableCell>
                    <TableCell className="text-right">{item.reorderPoint}</TableCell>
                    <TableCell className="text-right">{item.minStock}/{item.maxStock}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(item.status))}>
                        {statusConfig[item.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className={cn("text-xs", trendConfig[item.trend]?.color)}>
                          {Math.abs(item.trendPercentage)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${item.totalValue.toLocaleString()}</TableCell>
                    <TableCell>{item.nextDelivery}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Reorder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-[#F5EEE9] p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-black/50">
                Showing {sortedItems.length} of {stockItems.length} items
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

      {/* Reorder Dialog */}
      <Dialog open={showReorderDialog} onOpenChange={setShowReorderDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reorder Item: {selectedItem?.name}</DialogTitle>
            <DialogDescription>
              Create a purchase order for this item
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-[#F5EEE9] rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Current Stock</p>
                  <p className="text-lg font-bold text-black">{selectedItem?.currentStock}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Reorder Point</p>
                  <p className="text-lg font-bold text-yellow-600">{selectedItem?.reorderPoint}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Min Stock</p>
                  <p className="text-sm font-medium text-black">{selectedItem?.minStock}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Max Stock</p>
                  <p className="text-sm font-medium text-black">{selectedItem?.maxStock}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Reorder Quantity</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    defaultValue={selectedItem?.reorderQuantity} 
                    className="flex-1"
                  />
                  <span className="text-sm text-black/50">{selectedItem?.unit}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Supplier</Label>
                <Select defaultValue={selectedItem?.supplier}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Lead Time (days)</Label>
                  <Input type="number" defaultValue={selectedItem?.leadTime} />
                </div>
                <div className="space-y-2">
                  <Label>Expected Delivery</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <RadioGroup defaultValue="normal" className="flex gap-4">
                  {['High', 'Normal', 'Low'].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <RadioGroupItem value={priority.toLowerCase()} id={`priority-${priority}`} />
                      <Label htmlFor={`priority-${priority}`}>{priority}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Add notes for this order" rows={3} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReorderDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Purchase Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Reorder Dialog */}
      <Dialog open={showBulkReorderDialog} onOpenChange={setShowBulkReorderDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Bulk Reorder</DialogTitle>
            <DialogDescription>
              Create purchase orders for multiple items
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-yellow-50 text-yellow-700">Low Stock: {stats.low}</Badge>
                <Badge className="bg-red-50 text-red-700">Critical: {stats.critical}</Badge>
                <Badge className="bg-gray-50 text-gray-700">Out of Stock: {stats.outOfStock}</Badge>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-[#F5EEE9]">
                    <TableHead className="w-8">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Current</TableHead>
                    <TableHead className="text-right">Reorder Point</TableHead>
                    <TableHead className="text-right">Recommended</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockItems.filter(i => i.status === 'critical' || i.status === 'low').map((item) => (
                    <TableRow key={item.id} className="border-[#F5EEE9]">
                      <TableCell>
                        <Checkbox defaultChecked />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-black/50">{item.sku}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{item.currentStock}</TableCell>
                      <TableCell className="text-right">{item.reorderPoint}</TableCell>
                      <TableCell className="text-right text-green-600">
                        {item.reorderQuantity}
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" defaultValue={item.reorderQuantity} className="w-20 text-right" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="p-4 bg-[#F5EEE9] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Summary</span>
                <span className="text-sm">5 items selected</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-black/50">Total Quantity</span>
                  <span className="font-medium">2,450 units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/50">Estimated Cost</span>
                  <span className="font-medium">$24,500.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/50">Suppliers</span>
                  <span className="font-medium">4</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkReorderDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Purchase Orders
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Forecast Dialog */}
      <Dialog open={showForecastDialog} onOpenChange={setShowForecastDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Stock Level Forecast</DialogTitle>
            <DialogDescription>
              AI-powered demand forecasting and recommendations
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm text-black/50">Projected Demand (30d)</p>
                      <p className="text-2xl font-bold text-black mt-1">15,750 units</p>
                      <p className="text-xs text-green-600 mt-1">↑ 12% vs last month</p>
                    </CardContent>
                  </Card>
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm text-black/50">Stockout Risk</p>
                      <p className="text-2xl font-bold text-red-600 mt-1">8 items</p>
                      <p className="text-xs text-black/50 mt-1">Critical within 7 days</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-[#F5EEE9]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Demand Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 bg-[#F5EEE9] rounded-lg flex items-center justify-center">
                      <BarChart3 size={32} className="text-black/30" />
                      <span className="text-sm text-black/50 ml-2">Forecast chart would appear here</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Top Reorder Recommendations</h4>
                  {stockItems.filter(i => i.status === 'critical' || i.status === 'low').slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-black/50">Current: {item.currentStock} • Min: {item.minStock}</p>
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {statusConfig[item.status]?.label}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations">
                <div className="space-y-3">
                  {stockItems.map(item => (
                    <div key={item.id} className="p-3 border border-[#F5EEE9] rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-black/50">SKU: {item.sku}</p>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {statusConfig[item.status]?.label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-black/50">Current</p>
                          <p className="font-medium">{item.currentStock}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Recommended</p>
                          <p className="font-medium text-green-600">{item.reorderQuantity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Days Until</p>
                          <p className="font-medium">{item.daysUntilReorder}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="insights">
                <div className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="text-green-600 mt-1" size={18} />
                        <div>
                          <p className="font-medium text-black">Fastest Moving Items</p>
                          <p className="text-sm text-black/50 mt-1">Product A, Product C, Product K</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="text-yellow-600 mt-1" size={18} />
                        <div>
                          <p className="font-medium text-black">Slow Moving Items</p>
                          <p className="text-sm text-black/50 mt-1">Product B, Product F, Product H</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <DollarSign className="text-green-600 mt-1" size={18} />
                        <div>
                          <p className="font-medium text-black">High Value Items</p>
                          <p className="text-sm text-black/50 mt-1">Product A, Product G, Product B</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForecastDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Generate Report
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
                onClick={() => setShowBulkReorderDialog(true)}
              >
                <ShoppingCart size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Bulk Reorder</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowForecastDialog(true)}
              >
                <TrendingUp size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Forecast</TooltipContent>
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

export default StockLevelsPage;