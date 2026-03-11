// app/dashboard/batch-tracking/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Layers,
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
  AlertCircle,
  Clock,
  Calendar,
  Clock as ClockIcon,
  Download,
  Upload,
  Printer,
  Mail,
  Share2,
  Grid,
  List,
  Ban,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  QrCode,
  Scan,
  MapPin,
 
  Truck,
  Database,
  PackageX,
  DollarSign,
  Hash,
  Scissors,
  Combine,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BatchTrackingPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showSplitDialog, setShowSplitDialog] = useState(false);
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showQualityDialog, setShowQualityDialog] = useState(false);
  const [showRecallDialog, setShowRecallDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSerialDialog, setShowSerialDialog] = useState(false);
  const [showExpiryDialog, setShowExpiryDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showBarcodeDialog, setShowBarcodeDialog] = useState(false);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample batch data
  const batches = [
    {
      id: 'BATCH-001',
      batchNumber: 'B240315-001',
      productId: 'PRD-001',
      productName: 'Premium Wireless Headphones',
      sku: 'SKU-001',
      category: 'Electronics',
      subcategory: 'Audio',
      quantity: 500,
      unit: 'pcs',
      unitCost: 45.50,
      totalCost: 22750.00,
      manufacturingDate: '2024-03-15',
      expiryDate: '2026-03-15',
      bestBefore: '2026-03-15',
      receivedDate: '2024-03-18',
      supplier: 'AudioTech Manufacturing',
      supplierBatch: 'ATM-2403-001',
      location: 'Warehouse A',
      zone: 'Zone 2',
      bin: 'A-02-08',
      status: 'active',
      qualityStatus: 'passed',
      condition: 'new',
      temperature: 'ambient',
      humidity: '45%',
      lotNumber: 'LOT-2403-001',
      serialNumbers: ['SN001', 'SN002', 'SN003', '...'],
      serialCount: 500,
      documents: ['COA-001.pdf', 'MSDS-001.pdf'],
      certificates: ['ISO-9001', 'CE'],
      tests: [
        { name: 'Audio Quality Test', result: 'passed', date: '2024-03-16' },
        { name: 'Battery Life Test', result: 'passed', date: '2024-03-16' },
        { name: 'Durability Test', result: 'passed', date: '2024-03-17' },
      ],
      notes: 'First batch of new model',
      tags: ['premium', 'wireless', 'new-model'],
      createdBy: 'John Doe',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-18',
    },
    {
      id: 'BATCH-002',
      batchNumber: 'B240314-002',
      productId: 'PRD-002',
      productName: 'Organic Protein Powder',
      sku: 'SKU-002',
      category: 'Health',
      subcategory: 'Supplements',
      quantity: 250,
      unit: 'containers',
      unitCost: 28.75,
      totalCost: 7187.50,
      manufacturingDate: '2024-02-28',
      expiryDate: '2025-02-28',
      bestBefore: '2025-02-28',
      receivedDate: '2024-03-10',
      supplier: 'NutriHealth Labs',
      supplierBatch: 'NHL-2402-028',
      location: 'Warehouse C',
      zone: 'Zone 5',
      bin: 'C-05-12',
      status: 'active',
      qualityStatus: 'passed',
      condition: 'new',
      temperature: 'cool',
      humidity: '35%',
      lotNumber: 'LOT-2402-028',
      serialNumbers: [],
      serialCount: 0,
      documents: ['COA-002.pdf', 'Nutrition-Facts.pdf'],
      certificates: ['FDA', 'Organic-Cert'],
      tests: [
        { name: 'Purity Test', result: 'passed', date: '2024-03-05' },
        { name: 'Microbial Test', result: 'passed', date: '2024-03-06' },
      ],
      notes: 'Organic certified batch',
      tags: ['organic', 'protein', 'supplement'],
      createdBy: 'Jane Smith',
      createdAt: '2024-03-01',
      updatedAt: '2024-03-10',
    },
    {
      id: 'BATCH-003',
      batchNumber: 'B240313-003',
      productId: 'PRD-003',
      productName: 'Industrial Lubricant - Grade A',
      sku: 'SKU-003',
      category: 'Industrial',
      subcategory: 'Lubricants',
      quantity: 100,
      unit: 'drums',
      unitCost: 185.00,
      totalCost: 18500.00,
      manufacturingDate: '2024-03-10',
      expiryDate: '2025-09-10',
      bestBefore: '2025-09-10',
      receivedDate: '2024-03-13',
      supplier: 'ChemCorp Industries',
      supplierBatch: 'CCI-2403-010',
      location: 'Warehouse B',
      zone: 'Zone 4',
      bin: 'B-04-03',
      status: 'active',
      qualityStatus: 'pending',
      condition: 'new',
      temperature: 'ambient',
      humidity: '40%',
      lotNumber: 'LOT-2403-010',
      serialNumbers: [],
      serialCount: 0,
      documents: ['MSDS-003.pdf', 'COA-pending.pdf'],
      certificates: ['ISO-14001'],
      tests: [
        { name: 'Viscosity Test', result: 'pending', date: null },
        { name: 'Chemical Composition', result: 'pending', date: null },
      ],
      notes: 'Awaiting quality approval',
      tags: ['industrial', 'chemical', 'pending'],
      createdBy: 'Mike Johnson',
      createdAt: '2024-03-13',
      updatedAt: '2024-03-13',
    },
    {
      id: 'BATCH-004',
      batchNumber: 'B240312-004',
      productId: 'PRD-004',
      productName: 'Ergonomic Office Chair',
      sku: 'SKU-004',
      category: 'Furniture',
      subcategory: 'Chairs',
      quantity: 50,
      unit: 'pcs',
      unitCost: 210.00,
      totalCost: 10500.00,
      manufacturingDate: '2024-02-20',
      expiryDate: null,
      bestBefore: null,
      receivedDate: '2024-03-12',
      supplier: 'Office Furniture Co',
      supplierBatch: 'OFC-2402-020',
      location: 'Warehouse B',
      zone: 'Zone 3',
      bin: 'B-03-15',
      status: 'active',
      qualityStatus: 'passed',
      condition: 'new',
      temperature: 'ambient',
      humidity: '45%',
      lotNumber: 'LOT-2402-020',
      serialNumbers: ['CH001', 'CH002', 'CH003', '...'],
      serialCount: 50,
      documents: ['Assembly-Guide.pdf', 'Warranty.pdf'],
      certificates: ['BIFMA', 'GREENGUARD'],
      tests: [
        { name: 'Weight Capacity Test', result: 'passed', date: '2024-02-25' },
        { name: 'Durability Test', result: 'passed', date: '2024-02-26' },
        { name: 'Material Safety Test', result: 'passed', date: '2024-02-27' },
      ],
      notes: 'New ergonomic design',
      tags: ['furniture', 'ergonomic', 'office'],
      createdBy: 'Sarah Wilson',
      createdAt: '2024-02-20',
      updatedAt: '2024-03-12',
    },
    {
      id: 'BATCH-005',
      batchNumber: 'B240311-005',
      productId: 'PRD-005',
      productName: 'Cotton T-Shirt (White, L)',
      sku: 'SKU-005',
      category: 'Apparel',
      subcategory: 'Clothing',
      quantity: 1000,
      unit: 'pcs',
      unitCost: 6.50,
      totalCost: 6500.00,
      manufacturingDate: '2024-03-01',
      expiryDate: null,
      bestBefore: null,
      receivedDate: '2024-03-11',
      supplier: 'Fashion Textiles Inc',
      supplierBatch: 'FTI-2403-001',
      location: 'Warehouse A',
      zone: 'Zone 1',
      bin: 'A-01-15',
      status: 'active',
      qualityStatus: 'passed',
      condition: 'new',
      temperature: 'ambient',
      humidity: '50%',
      lotNumber: 'LOT-2403-001',
      serialNumbers: [],
      serialCount: 0,
      documents: ['Fabric-Cert.pdf', 'Care-Instructions.pdf'],
      certificates: ['OEKO-TEX', 'GOTS'],
      tests: [
        { name: 'Color Fastness', result: 'passed', date: '2024-03-05' },
        { name: 'Shrinkage Test', result: 'passed', date: '2024-03-06' },
        { name: 'Fabric Strength', result: 'passed', date: '2024-03-07' },
      ],
      notes: 'Summer collection',
      tags: ['apparel', 'cotton', 'summer'],
      createdBy: 'Emma Watson',
      createdAt: '2024-03-01',
      updatedAt: '2024-03-11',
    },
    {
      id: 'BATCH-006',
      batchNumber: 'B240310-006',
      productId: 'PRD-006',
      productName: 'Canned Organic Soup',
      sku: 'SKU-006',
      category: 'Food',
      subcategory: 'Canned Goods',
      quantity: 2000,
      unit: 'cans',
      unitCost: 2.25,
      totalCost: 4500.00,
      manufacturingDate: '2024-02-15',
      expiryDate: '2025-08-15',
      bestBefore: '2025-08-15',
      receivedDate: '2024-03-10',
      supplier: 'Organic Food Co',
      supplierBatch: 'OFC-2402-015',
      location: 'Warehouse C',
      zone: 'Zone 6',
      bin: 'C-06-08',
      status: 'quarantine',
      qualityStatus: 'failed',
      condition: 'new',
      temperature: 'cool',
      humidity: '40%',
      lotNumber: 'LOT-2402-015',
      serialNumbers: [],
      serialCount: 0,
      documents: ['Recall-Notice.pdf', 'Test-Results-Failed.pdf'],
      certificates: ['Organic', 'Non-GMO'],
      tests: [
        { name: 'Microbiological Test', result: 'failed', date: '2024-03-05' },
        { name: 'pH Level Test', result: 'failed', date: '2024-03-05' },
        { name: 'Preservative Check', result: 'passed', date: '2024-03-06' },
      ],
      notes: 'Quarantined due to failed microbiological tests',
      tags: ['food', 'organic', 'quarantine', 'recall'],
      createdBy: 'Tom Brown',
      createdAt: '2024-02-15',
      updatedAt: '2024-03-10',
    },
    {
      id: 'BATCH-007',
      batchNumber: 'B240309-007',
      productId: 'PRD-007',
      productName: 'Smart LED TV 55"',
      sku: 'SKU-007',
      category: 'Electronics',
      subcategory: 'TVs',
      quantity: 30,
      unit: 'pcs',
      unitCost: 425.00,
      totalCost: 12750.00,
      manufacturingDate: '2024-02-10',
      expiryDate: null,
      bestBefore: null,
      receivedDate: '2024-03-09',
      supplier: 'Electronics World',
      supplierBatch: 'EW-2402-010',
      location: 'Warehouse A',
      zone: 'Zone 1',
      bin: 'A-01-22',
      status: 'reserved',
      qualityStatus: 'passed',
      condition: 'new',
      temperature: 'ambient',
      humidity: '45%',
      lotNumber: 'LOT-2402-010',
      serialNumbers: ['TV001', 'TV002', 'TV003', '...'],
      serialCount: 30,
      documents: ['User-Manual.pdf', 'Warranty-Card.pdf'],
      certificates: ['UL', 'CE', 'Energy-Star'],
      tests: [
        { name: 'Display Test', result: 'passed', date: '2024-02-15' },
        { name: 'Audio Test', result: 'passed', date: '2024-02-15' },
        { name: 'Connectivity Test', result: 'passed', date: '2024-02-16' },
      ],
      notes: 'Reserved for customer orders',
      tags: ['electronics', 'tv', 'reserved'],
      createdBy: 'David Lee',
      createdAt: '2024-02-10',
      updatedAt: '2024-03-09',
    },
    {
      id: 'BATCH-008',
      batchNumber: 'B240308-008',
      productId: 'PRD-008',
      productName: 'First Aid Kit - Professional',
      sku: 'SKU-008',
      category: 'Medical',
      subcategory: 'Supplies',
      quantity: 150,
      unit: 'kits',
      unitCost: 32.50,
      totalCost: 4875.00,
      manufacturingDate: '2024-02-01',
      expiryDate: '2026-02-01',
      bestBefore: '2026-02-01',
      receivedDate: '2024-03-08',
      supplier: 'MediSupply Inc',
      supplierBatch: 'MSI-2402-001',
      location: 'Store B',
      zone: 'Pharmacy',
      bin: 'P-01-05',
      status: 'active',
      qualityStatus: 'passed',
      condition: 'new',
      temperature: 'ambient',
      humidity: '40%',
      lotNumber: 'LOT-2402-001',
      serialNumbers: [],
      serialCount: 0,
      documents: ['FDA-Approval.pdf', 'Contents-List.pdf'],
      certificates: ['FDA', 'ISO-13485'],
      tests: [
        { name: 'Sterility Test', result: 'passed', date: '2024-02-10' },
        { name: 'Package Integrity', result: 'passed', date: '2024-02-11' },
      ],
      notes: 'Hospital grade first aid kits',
      tags: ['medical', 'first-aid', 'professional'],
      createdBy: 'Anna Taylor',
      createdAt: '2024-02-01',
      updatedAt: '2024-03-08',
    },
  ];

  // Products for filtering
  const products = [
    { id: 'PRD-001', name: 'Premium Wireless Headphones' },
    { id: 'PRD-002', name: 'Organic Protein Powder' },
    { id: 'PRD-003', name: 'Industrial Lubricant - Grade A' },
    { id: 'PRD-004', name: 'Ergonomic Office Chair' },
    { id: 'PRD-005', name: 'Cotton T-Shirt (White, L)' },
    { id: 'PRD-006', name: 'Canned Organic Soup' },
    { id: 'PRD-007', name: 'Smart LED TV 55"' },
    { id: 'PRD-008', name: 'First Aid Kit - Professional' },
  ];

  // Suppliers
  const suppliers = [
    'AudioTech Manufacturing',
    'NutriHealth Labs',
    'ChemCorp Industries',
    'Office Furniture Co',
    'Fashion Textiles Inc',
    'Organic Food Co',
    'Electronics World',
    'MediSupply Inc',
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', zones: ['Zone 1', 'Zone 2'] },
    { id: 'wh-b', name: 'Warehouse B', zones: ['Zone 3', 'Zone 4'] },
    { id: 'wh-c', name: 'Warehouse C', zones: ['Zone 5', 'Zone 6'] },
    { id: 'store-b', name: 'Store B', zones: ['Pharmacy'] },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    reserved: { label: 'Reserved', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    quarantine: { label: 'Quarantine', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    recalled: { label: 'Recalled', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    expired: { label: 'Expired', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    depleted: { label: 'Depleted', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: PackageX },
  };

  const qualityStatusConfig = {
    passed: { label: 'Passed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Package;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getQualityColor = (status) => {
    return qualityStatusConfig[status]?.color || 'bg-gray-100 text-gray-700';
  };

  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return null;
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) return { label: 'Expired', color: 'bg-gray-500' };
    if (days <= 30) return { label: 'Critical', color: 'bg-red-500' };
    if (days <= 90) return { label: 'Warning', color: 'bg-yellow-500' };
    return { label: 'Good', color: 'bg-green-500' };
  };

  const filteredBatches = batches.filter(batch => {
    const matchesStatus = selectedStatus === 'all' || batch.status === selectedStatus;
    const matchesProduct = selectedProduct === 'all' || batch.productId === selectedProduct;
    const matchesLocation = selectedLocation === 'all' || batch.location === selectedLocation;
    const matchesSupplier = selectedSupplier === 'all' || batch.supplier === selectedSupplier;
    const matchesSearch = batch.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         batch.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         batch.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         batch.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesProduct && matchesLocation && matchesSupplier && matchesSearch;
  });

  const stats = {
    total: batches.length,
    active: batches.filter(b => b.status === 'active').length,
    reserved: batches.filter(b => b.status === 'reserved').length,
    quarantine: batches.filter(b => b.status === 'quarantine').length,
    recalled: batches.filter(b => b.status === 'recalled').length,
    expired: batches.filter(b => {
      if (!b.expiryDate) return false;
      return getDaysUntilExpiry(b.expiryDate) < 0;
    }).length,
    totalQuantity: batches.reduce((sum, b) => sum + b.quantity, 0),
    totalValue: batches.reduce((sum, b) => sum + b.totalCost, 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Batch Tracking</h1>
            <p className="text-black/50 mt-1">Track and manage inventory batches, lots, and serial numbers</p>
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
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              New Batch
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
                  <Layers size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Reserved</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.reserved}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Clock size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Quarantine</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.quarantine}</p>
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
                  <p className="text-xs text-black/50">Recalled</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.recalled}</p>
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
                  <p className="text-xs text-black/50">Total Value</p>
                  <p className="text-xl font-bold text-black mt-1">${stats.totalValue.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <DollarSign size={18} className="text-purple-600" />
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
              placeholder="Search by batch number, product, SKU, or tags..."
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
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="quarantine">Quarantine</SelectItem>
              <SelectItem value="recalled">Recalled</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="depleted">Depleted</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              {products.map(product => (
                <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
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
                <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
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

      {/* Batch Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredBatches.map((batch) => {
            const StatusIcon = statusConfig[batch.status]?.icon || Package;
            const QualityIcon = qualityStatusConfig[batch.qualityStatus]?.icon || CheckCircle;
            const expiryStatus = getExpiryStatus(batch.expiryDate);
            
            return (
              <Card key={batch.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(batch.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {batch.status}
                          </Badge>
                          <Badge className={cn("text-xs border-0", getQualityColor(batch.qualityStatus))}>
                            <QualityIcon className="mr-1" size={10} />
                            {batch.qualityStatus}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{batch.batchNumber}</h3>
                        <p className="text-sm text-black mt-1">{batch.productName}</p>
                        <p className="text-xs text-black/50">{batch.sku}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedBatch(batch);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedBatch(batch);
                            setShowQualityDialog(true);
                          }}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Quality Check
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedBatch(batch);
                            setShowSerialDialog(true);
                          }}>
                            <Hash className="mr-2 h-4 w-4" />
                            Serial Numbers
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedBatch(batch);
                            setShowTransferDialog(true);
                          }}>
                            <Truck className="mr-2 h-4 w-4" />
                            Transfer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setSelectedBatch(batch);
                            setShowSplitDialog(true);
                          }}>
                            <Scissors className="mr-2 h-4 w-4" />
                            Split Batch
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedBatch(batch);
                            setShowMergeDialog(true);
                          }}>
                            <Combine className="mr-2 h-4 w-4" />
                            Merge Batches
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {batch.status !== 'recalled' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedBatch(batch);
                              setShowRecallDialog(true);
                            }} className="text-red-600">
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Recall Batch
                            </DropdownMenuItem>
                          )}
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
                    {/* Quantity and Value */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="p-2 bg-[#F5EEE9]/30 rounded-lg text-center">
                        <p className="text-xs text-black/50">Quantity</p>
                        <p className="text-lg font-bold text-black">{batch.quantity.toLocaleString()}</p>
                        <p className="text-xs text-black/50">{batch.unit}</p>
                      </div>
                      <div className="p-2 bg-[#F5EEE9]/30 rounded-lg text-center">
                        <p className="text-xs text-black/50">Value</p>
                        <p className="text-lg font-bold text-green-600">${batch.totalCost.toLocaleString()}</p>
                        <p className="text-xs text-black/50">@ ${batch.unitCost}</p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Manufacturing</span>
                        <span className="font-medium text-black">{batch.manufacturingDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Received</span>
                        <span className="font-medium text-black">{batch.receivedDate}</span>
                      </div>
                      {batch.expiryDate && (
                        <div className="flex items-center justify-between">
                          <span className="text-black/50">Expiry</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-black">{batch.expiryDate}</span>
                            {expiryStatus && (
                              <Badge className={cn("text-xs text-white", expiryStatus.color)}>
                                {expiryStatus.label}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="p-3 bg-[#F5EEE9]/50 rounded-lg mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Location</span>
                        <span className="text-xs font-medium">{batch.bin}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-red-600" />
                        <span>{batch.location} • {batch.zone}</span>
                      </div>
                    </div>

                    {/* Supplier */}
                    <div className="flex items-center gap-2 text-sm mb-3">
                      <Truck size={14} className="text-black/30" />
                      <span className="text-black/70">{batch.supplier}</span>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9] ml-auto">
                        {batch.supplierBatch}
                      </Badge>
                    </div>

                    {/* Serial Numbers Indicator */}
                    {batch.serialCount > 0 && (
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <Hash size={14} className="text-blue-600" />
                        <span className="text-black/70">{batch.serialCount} serial numbers</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs ml-auto"
                          onClick={() => {
                            setSelectedBatch(batch);
                            setShowSerialDialog(true);
                          }}
                        >
                          View
                        </Button>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {batch.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9] bg-[#F5EEE9]/30">
                          {tag}
                        </Badge>
                      ))}
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
                  <TableHead className="text-black/50">Batch Number</TableHead>
                  <TableHead className="text-black/50">Product</TableHead>
                  <TableHead className="text-black/50">SKU</TableHead>
                  <TableHead className="text-black/50 text-right">Quantity</TableHead>
                  <TableHead className="text-black/50 text-right">Unit Cost</TableHead>
                  <TableHead className="text-black/50 text-right">Total Value</TableHead>
                  <TableHead className="text-black/50">Manufacturing Date</TableHead>
                  <TableHead className="text-black/50">Expiry Date</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Quality</TableHead>
                  <TableHead className="text-black/50">Supplier</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch) => (
                  <TableRow key={batch.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">{batch.batchNumber}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{batch.productName}</p>
                        <p className="text-xs text-black/50">{batch.category}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{batch.sku}</TableCell>
                    <TableCell className="text-right">{batch.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${batch.unitCost.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      ${batch.totalCost.toLocaleString()}
                    </TableCell>
                    <TableCell>{batch.manufacturingDate}</TableCell>
                    <TableCell>
                      {batch.expiryDate ? (
                        <div className="flex items-center gap-1">
                          <span>{batch.expiryDate}</span>
                          {getExpiryStatus(batch.expiryDate) && (
                            <Badge className={cn("text-xs text-white", getExpiryStatus(batch.expiryDate).color)}>
                              {getExpiryStatus(batch.expiryDate).label}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-black/50">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>{batch.bin}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(batch.status))}>
                        {batch.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getQualityColor(batch.qualityStatus))}>
                        {batch.qualityStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">{batch.supplier}</TableCell>
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
                Showing {filteredBatches.length} of {batches.length} batches
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

      {/* Create Batch Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Batch</DialogTitle>
            <DialogDescription>
              Add a new inventory batch with tracking information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Batch Number</Label>
                <Input placeholder="e.g., BATCH-001" />
              </div>
              <div className="space-y-2">
                <Label>Product</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" placeholder="0" />
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
                <Input type="number" step="0.01" placeholder="0.00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Manufacturing Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Supplier Batch</Label>
                <Input placeholder="e.g., SUP-001" />
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

            <div className="space-y-2">
              <Label>Lot Number</Label>
              <Input placeholder="e.g., LOT-001" />
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
              Create Batch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Batch Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Batch Details: {selectedBatch?.batchNumber}</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="quality">Quality</TabsTrigger>
                <TabsTrigger value="serials">Serial Numbers</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-black/50">Product</p>
                    <p className="font-medium">{selectedBatch?.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">SKU</p>
                    <p className="font-medium">{selectedBatch?.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Category</p>
                    <p className="font-medium">{selectedBatch?.category} / {selectedBatch?.subcategory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Lot Number</p>
                    <p className="font-medium">{selectedBatch?.lotNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Quantity</p>
                    <p className="font-medium">{selectedBatch?.quantity} {selectedBatch?.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Total Value</p>
                    <p className="font-medium text-green-600">${selectedBatch?.totalCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Manufacturing Date</p>
                    <p className="font-medium">{selectedBatch?.manufacturingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Expiry Date</p>
                    <p className="font-medium">{selectedBatch?.expiryDate || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Supplier</p>
                    <p className="font-medium">{selectedBatch?.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Supplier Batch</p>
                    <p className="font-medium">{selectedBatch?.supplierBatch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Location</p>
                    <p className="font-medium">{selectedBatch?.location} - {selectedBatch?.bin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Storage Conditions</p>
                    <p className="font-medium">{selectedBatch?.temperature}, {selectedBatch?.humidity}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="quality">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge className={cn("text-sm", getQualityColor(selectedBatch?.qualityStatus))}>
                      Quality: {selectedBatch?.qualityStatus}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Test Results</h4>
                    {selectedBatch?.tests.map((test, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                        <div>
                          <p className="font-medium">{test.name}</p>
                          <p className="text-xs text-black/50">Date: {test.date || 'Pending'}</p>
                        </div>
                        <Badge className={cn(
                          "text-xs",
                          test.result === 'passed' && "bg-green-100 text-green-700",
                          test.result === 'failed' && "bg-red-100 text-red-700",
                          test.result === 'pending' && "bg-yellow-100 text-yellow-700",
                        )}>
                          {test.result}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="serials">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Total Serial Numbers: {selectedBatch?.serialCount}</p>
                    <Button variant="outline" size="sm" className="border-[#F5EEE9]">
                      <Download size={14} className="mr-2" />
                      Export List
                    </Button>
                  </div>

                  <ScrollArea className="h-64">
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: Math.min(selectedBatch?.serialCount || 0, 30) }).map((_, i) => (
                        <div key={i} className="p-2 border border-[#F5EEE9] rounded-lg text-center">
                          <span className="font-mono text-xs">SN{String(i + 1).padStart(3, '0')}</span>
                        </div>
                      ))}
                      {(selectedBatch?.serialCount || 0) > 30 && (
                        <div className="p-2 border border-[#F5EEE9] rounded-lg text-center text-black/50">
                          +{(selectedBatch?.serialCount || 0) - 30} more
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <div className="space-y-3">
                  {selectedBatch?.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />
                        <span>{doc}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <QrCode className="mr-2 h-4 w-4" />
              Generate Label
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
            <TooltipContent side="left">Scan Batch</TooltipContent>
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
            <TooltipContent side="left">New Batch</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowExpiryDialog(true)}
              >
                <Calendar size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Expiry Calendar</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default BatchTrackingPage;