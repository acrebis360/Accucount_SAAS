// app/dashboard/serial-numbers/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Hash,
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
  Download,
  Upload,
  Grid,
  List,
  X,
  ChevronDown,
  ChevronRight,
  Check,
  Ban,
  QrCode,
  Barcode,
  Scan,
  Camera,
  MapPin,
  Truck,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  RotateCcw,
  DollarSign
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
import { ScrollArea } from '@/components/ui/scroll-area';

import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SerialNumbersPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedSerial, setSelectedSerial] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [showBarcodeDialog, setShowBarcodeDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSerials, setSelectedSerials] = useState([]);

  // Sample serial numbers data
  const serialNumbers = [
    {
      id: 'SN-001',
      serialNumber: 'SN240315-001',
      productId: 'PRD-001',
      productName: 'Premium Wireless Headphones',
      sku: 'SKU-001',
      batchNumber: 'BATCH-001',
      status: 'in_stock',
      condition: 'new',
      location: 'Warehouse A',
      zone: 'Zone 2',
      bin: 'A-02-08',
      receivedDate: '2024-03-15',
      manufacturedDate: '2024-02-10',
      expiryDate: '2026-03-15',
      warrantyExpiry: '2025-03-15',
      supplier: 'AudioTech Manufacturing',
      customer: null,
      orderId: null,
      price: 89.99,
      cost: 45.50,
      tags: ['premium', 'wireless'],
      lastScan: '2024-03-15 14:30',
      lastScanBy: 'John Doe',
      notes: 'First batch serial',
      qrCode: 'SN240315-001',
      barcode: '123456789012',
      history: [
        { date: '2024-03-15', action: 'Received', location: 'Warehouse A', user: 'John Doe' },
        { date: '2024-03-15', action: 'Quality Check', location: 'Warehouse A', user: 'Jane Smith', result: 'Passed' },
      ],
    },
    {
      id: 'SN-002',
      serialNumber: 'SN240315-002',
      productId: 'PRD-001',
      productName: 'Premium Wireless Headphones',
      sku: 'SKU-001',
      batchNumber: 'BATCH-001',
      status: 'in_stock',
      condition: 'new',
      location: 'Warehouse A',
      zone: 'Zone 2',
      bin: 'A-02-08',
      receivedDate: '2024-03-15',
      manufacturedDate: '2024-02-10',
      expiryDate: '2026-03-15',
      warrantyExpiry: '2025-03-15',
      supplier: 'AudioTech Manufacturing',
      customer: null,
      orderId: null,
      price: 89.99,
      cost: 45.50,
      tags: ['premium', 'wireless'],
      lastScan: '2024-03-15 14:31',
      lastScanBy: 'John Doe',
      notes: null,
      qrCode: 'SN240315-002',
      barcode: '123456789013',
      history: [
        { date: '2024-03-15', action: 'Received', location: 'Warehouse A', user: 'John Doe' },
      ],
    },
    {
      id: 'SN-003',
      serialNumber: 'SN240315-003',
      productId: 'PRD-001',
      productName: 'Premium Wireless Headphones',
      sku: 'SKU-001',
      batchNumber: 'BATCH-001',
      status: 'reserved',
      condition: 'new',
      location: 'Warehouse A',
      zone: 'Zone 2',
      bin: 'A-02-08',
      receivedDate: '2024-03-15',
      manufacturedDate: '2024-02-10',
      expiryDate: '2026-03-15',
      warrantyExpiry: '2025-03-15',
      supplier: 'AudioTech Manufacturing',
      customer: 'John Smith',
      orderId: 'ORD-1234',
      price: 89.99,
      cost: 45.50,
      tags: ['premium', 'wireless', 'reserved'],
      lastScan: '2024-03-15 15:45',
      lastScanBy: 'Sarah Wilson',
      notes: 'Reserved for online order',
      qrCode: 'SN240315-003',
      barcode: '123456789014',
      history: [
        { date: '2024-03-15', action: 'Received', location: 'Warehouse A', user: 'John Doe' },
        { date: '2024-03-15', action: 'Reserved', location: 'Warehouse A', user: 'Sarah Wilson', order: 'ORD-1234' },
      ],
    },
    {
      id: 'SN-004',
      serialNumber: 'SN240314-004',
      productId: 'PRD-004',
      productName: 'Ergonomic Office Chair',
      sku: 'SKU-004',
      batchNumber: 'BATCH-004',
      status: 'sold',
      condition: 'new',
      location: 'Customer Location',
      zone: null,
      bin: null,
      receivedDate: '2024-03-10',
      manufacturedDate: '2024-02-20',
      expiryDate: null,
      warrantyExpiry: '2026-03-10',
      supplier: 'Office Furniture Co',
      customer: 'Acme Corp',
      orderId: 'ORD-1230',
      price: 299.99,
      cost: 210.00,
      tags: ['furniture', 'ergonomic'],
      lastScan: '2024-03-14 10:15',
      lastScanBy: 'Mike Johnson',
      notes: 'Shipped to customer',
      qrCode: 'SN240314-004',
      barcode: '123456789015',
      history: [
        { date: '2024-03-10', action: 'Received', location: 'Warehouse B', user: 'Sarah Wilson' },
        { date: '2024-03-12', action: 'Quality Check', location: 'Warehouse B', user: 'Tom Brown', result: 'Passed' },
        { date: '2024-03-14', action: 'Shipped', location: 'Warehouse B', user: 'Mike Johnson', order: 'ORD-1230' },
        { date: '2024-03-14', action: 'Delivered', location: 'Acme Corp', user: 'Mike Johnson' },
      ],
    },
    {
      id: 'SN-005',
      serialNumber: 'SN240314-005',
      productId: 'PRD-007',
      productName: 'Smart LED TV 55"',
      sku: 'SKU-007',
      batchNumber: 'BATCH-007',
      status: 'in_stock',
      condition: 'new',
      location: 'Warehouse A',
      zone: 'Zone 1',
      bin: 'A-01-22',
      receivedDate: '2024-03-09',
      manufacturedDate: '2024-02-10',
      expiryDate: null,
      warrantyExpiry: '2026-03-09',
      supplier: 'Electronics World',
      customer: null,
      orderId: null,
      price: 599.99,
      cost: 425.00,
      tags: ['electronics', 'tv', 'premium'],
      lastScan: '2024-03-09 11:20',
      lastScanBy: 'David Lee',
      notes: 'Display model',
      qrCode: 'SN240314-005',
      barcode: '123456789016',
      history: [
        { date: '2024-03-09', action: 'Received', location: 'Warehouse A', user: 'David Lee' },
        { date: '2024-03-09', action: 'Quality Check', location: 'Warehouse A', user: 'David Lee', result: 'Passed' },
      ],
    },
    {
      id: 'SN-006',
      serialNumber: 'SN240314-006',
      productId: 'PRD-007',
      productName: 'Smart LED TV 55"',
      sku: 'SKU-007',
      batchNumber: 'BATCH-007',
      status: 'damaged',
      condition: 'damaged',
      location: 'Warehouse A',
      zone: 'Zone 5',
      bin: 'Quarantine',
      receivedDate: '2024-03-09',
      manufacturedDate: '2024-02-10',
      expiryDate: null,
      warrantyExpiry: null,
      supplier: 'Electronics World',
      customer: null,
      orderId: null,
      price: 599.99,
      cost: 425.00,
      tags: ['electronics', 'tv', 'damaged'],
      lastScan: '2024-03-09 14:30',
      lastScanBy: 'David Lee',
      notes: 'Damaged during transit',
      qrCode: 'SN240314-006',
      barcode: '123456789017',
      history: [
        { date: '2024-03-09', action: 'Received', location: 'Warehouse A', user: 'David Lee' },
        { date: '2024-03-09', action: 'Quality Check', location: 'Warehouse A', user: 'David Lee', result: 'Failed - Damaged' },
        { date: '2024-03-09', action: 'Moved to Quarantine', location: 'Quarantine', user: 'David Lee' },
      ],
    },
    {
      id: 'SN-007',
      serialNumber: 'SN240313-007',
      productId: 'PRD-002',
      productName: 'Organic Protein Powder',
      sku: 'SKU-002',
      batchNumber: 'BATCH-002',
      status: 'in_stock',
      condition: 'new',
      location: 'Warehouse C',
      zone: 'Zone 5',
      bin: 'C-05-12',
      receivedDate: '2024-03-08',
      manufacturedDate: '2024-02-28',
      expiryDate: '2025-02-28',
      warrantyExpiry: null,
      supplier: 'NutriHealth Labs',
      customer: null,
      orderId: null,
      price: 42.99,
      cost: 28.75,
      tags: ['organic', 'protein'],
      lastScan: '2024-03-08 09:45',
      lastScanBy: 'Emma Watson',
      notes: null,
      qrCode: 'SN240313-007',
      barcode: '123456789018',
      history: [
        { date: '2024-03-08', action: 'Received', location: 'Warehouse C', user: 'Emma Watson' },
        { date: '2024-03-08', action: 'Quality Check', location: 'Warehouse C', user: 'Emma Watson', result: 'Passed' },
      ],
    },
    {
      id: 'SN-008',
      serialNumber: 'SN240313-008',
      productId: 'PRD-005',
      productName: 'Cotton T-Shirt (White, L)',
      sku: 'SKU-005',
      batchNumber: 'BATCH-005',
      status: 'sold',
      condition: 'new',
      location: 'Customer Location',
      zone: null,
      bin: null,
      receivedDate: '2024-03-05',
      manufacturedDate: '2024-03-01',
      expiryDate: null,
      warrantyExpiry: null,
      supplier: 'Fashion Textiles Inc',
      customer: 'Jane Doe',
      orderId: 'ORD-1245',
      price: 19.99,
      cost: 6.50,
      tags: ['apparel', 'cotton'],
      lastScan: '2024-03-07 16:20',
      lastScanBy: 'Anna Taylor',
      notes: null,
      qrCode: 'SN240313-008',
      barcode: '123456789019',
      history: [
        { date: '2024-03-05', action: 'Received', location: 'Warehouse A', user: 'Emma Watson' },
        { date: '2024-03-06', action: 'Quality Check', location: 'Warehouse A', user: 'Emma Watson', result: 'Passed' },
        { date: '2024-03-07', action: 'Shipped', location: 'Warehouse A', user: 'Anna Taylor', order: 'ORD-1245' },
      ],
    },
    {
      id: 'SN-009',
      serialNumber: 'SN240312-009',
      productId: 'PRD-003',
      productName: 'Industrial Lubricant - Grade A',
      sku: 'SKU-003',
      batchNumber: 'BATCH-003',
      status: 'quarantine',
      condition: 'pending',
      location: 'Warehouse B',
      zone: 'Zone 4',
      bin: 'Quarantine',
      receivedDate: '2024-03-12',
      manufacturedDate: '2024-03-10',
      expiryDate: '2025-09-10',
      warrantyExpiry: null,
      supplier: 'ChemCorp Industries',
      customer: null,
      orderId: null,
      price: 275.00,
      cost: 185.00,
      tags: ['industrial', 'chemical'],
      lastScan: '2024-03-12 13:15',
      lastScanBy: 'Mike Johnson',
      notes: 'Awaiting quality test results',
      qrCode: 'SN240312-009',
      barcode: '123456789020',
      history: [
        { date: '2024-03-12', action: 'Received', location: 'Warehouse B', user: 'Mike Johnson' },
        { date: '2024-03-12', action: 'Quarantined', location: 'Quarantine', user: 'Mike Johnson', reason: 'Pending tests' },
      ],
    },
    {
      id: 'SN-010',
      serialNumber: 'SN240311-010',
      productId: 'PRD-008',
      productName: 'First Aid Kit - Professional',
      sku: 'SKU-008',
      batchNumber: 'BATCH-008',
      status: 'in_stock',
      condition: 'new',
      location: 'Store B',
      zone: 'Pharmacy',
      bin: 'P-01-05',
      receivedDate: '2024-03-08',
      manufacturedDate: '2024-02-01',
      expiryDate: '2026-02-01',
      warrantyExpiry: null,
      supplier: 'MediSupply Inc',
      customer: null,
      orderId: null,
      price: 49.99,
      cost: 32.50,
      tags: ['medical', 'first-aid'],
      lastScan: '2024-03-08 10:30',
      lastScanBy: 'Anna Taylor',
      notes: null,
      qrCode: 'SN240311-010',
      barcode: '123456789021',
      history: [
        { date: '2024-03-08', action: 'Received', location: 'Store B', user: 'Anna Taylor' },
        { date: '2024-03-08', action: 'Quality Check', location: 'Store B', user: 'Anna Taylor', result: 'Passed' },
      ],
    },
  ];

  // Products for filtering
  const products = [
    { id: 'PRD-001', name: 'Premium Wireless Headphones', count: 3 },
    { id: 'PRD-002', name: 'Organic Protein Powder', count: 1 },
    { id: 'PRD-003', name: 'Industrial Lubricant - Grade A', count: 1 },
    { id: 'PRD-004', name: 'Ergonomic Office Chair', count: 1 },
    { id: 'PRD-005', name: 'Cotton T-Shirt (White, L)', count: 1 },
    { id: 'PRD-007', name: 'Smart LED TV 55"', count: 2 },
    { id: 'PRD-008', name: 'First Aid Kit - Professional', count: 1 },
  ];

  // Batches for filtering
  const batches = [
    { id: 'BATCH-001', name: 'BATCH-001', count: 3 },
    { id: 'BATCH-002', name: 'BATCH-002', count: 1 },
    { id: 'BATCH-003', name: 'BATCH-003', count: 1 },
    { id: 'BATCH-004', name: 'BATCH-004', count: 1 },
    { id: 'BATCH-005', name: 'BATCH-005', count: 1 },
    { id: 'BATCH-007', name: 'BATCH-007', count: 2 },
    { id: 'BATCH-008', name: 'BATCH-008', count: 1 },
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', count: 5 },
    { id: 'wh-b', name: 'Warehouse B', count: 2 },
    { id: 'wh-c', name: 'Warehouse C', count: 1 },
    { id: 'store-b', name: 'Store B', count: 1 },
    { id: 'customer', name: 'Customer Location', count: 2 },
  ];

  // Status configuration
  const statusConfig = {
    in_stock: { label: 'In Stock', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    reserved: { label: 'Reserved', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    sold: { label: 'Sold', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: CheckCircle },
    damaged: { label: 'Damaged', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
    quarantine: { label: 'Quarantine', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertCircle },
    returned: { label: 'Returned', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: RotateCcw},
    expired: { label: 'Expired', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
  };

  const conditionConfig = {
    new: { label: 'New', color: 'bg-green-100 text-green-700' },
    used: { label: 'Used', color: 'bg-blue-100 text-blue-700' },
    refurbished: { label: 'Refurbished', color: 'bg-purple-100 text-purple-700' },
    damaged: { label: 'Damaged', color: 'bg-red-100 text-red-700' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Package;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getConditionColor = (condition) => {
    return conditionConfig[condition]?.color || 'bg-gray-100 text-gray-700';
  };

  const filteredSerials = serialNumbers.filter(serial => {
    const matchesProduct = selectedProduct === 'all' || serial.productId === selectedProduct;
    const matchesStatus = selectedStatus === 'all' || serial.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || serial.location === selectedLocation;
    const matchesBatch = selectedBatch === 'all' || serial.batchNumber === selectedBatch;
    const matchesSearch = serial.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         serial.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         serial.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (serial.customer && serial.customer.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (serial.orderId && serial.orderId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesProduct && matchesStatus && matchesLocation && matchesBatch && matchesSearch;
  });

  const stats = {
    total: serialNumbers.length,
    inStock: serialNumbers.filter(s => s.status === 'in_stock').length,
    reserved: serialNumbers.filter(s => s.status === 'reserved').length,
    sold: serialNumbers.filter(s => s.status === 'sold').length,
    damaged: serialNumbers.filter(s => s.status === 'damaged').length,
    quarantine: serialNumbers.filter(s => s.status === 'quarantine').length,
    totalValue: serialNumbers.reduce((sum, s) => sum + (s.status === 'in_stock' || s.status === 'reserved' ? s.cost : 0), 0),
  };

  const handleSelectAll = () => {
    if (selectedSerials.length === filteredSerials.length) {
      setSelectedSerials([]);
    } else {
      setSelectedSerials(filteredSerials.map(s => s.id));
    }
  };

  const handleSelectSerial = (id) => {
    if (selectedSerials.includes(id)) {
      setSelectedSerials(selectedSerials.filter(s => s !== id));
    } else {
      setSelectedSerials([...selectedSerials, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Serial Numbers</h1>
            <p className="text-black/50 mt-1">Track and manage individual serialized inventory items</p>
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
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR Codes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Add Serial
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Serials</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Hash size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">In Stock</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.inStock}</p>
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
                  <p className="text-xs text-black/50">Sold</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.sold}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <CheckCircle size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Damaged</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.damaged}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertTriangle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Inventory Value</p>
                  <p className="text-xl font-bold text-black mt-1">${stats.totalValue.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <DollarSign size={18} className="text-yellow-600" />
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
              placeholder="Search by serial number, product, SKU, customer, or order..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              {products.map(product => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name} ({product.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
              <SelectItem value="quarantine">Quarantine</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
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

          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              {batches.map(batch => (
                <SelectItem key={batch.id} value={batch.id}>
                  {batch.name} ({batch.count})
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
      {selectedSerials.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedSerials.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedSerials([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-white bg-white">
              <QrCode size={14} className="mr-2" />
              Generate QR
            </Button>
            <Button variant="outline" size="sm" className="border-white bg-white">
              <Barcode size={14} className="mr-2" />
              Generate Barcode
            </Button>
            <Button variant="outline" size="sm" className="border-white bg-white">
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Serial Numbers Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredSerials.map((serial) => {
            const StatusIcon = statusConfig[serial.status]?.icon || Package;
            
            return (
              <Card key={serial.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <Checkbox 
                          checked={selectedSerials.includes(serial.id)}
                          onCheckedChange={() => handleSelectSerial(serial.id)}
                          className="mt-1"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs border-0", getStatusColor(serial.status))}>
                              <StatusIcon className="mr-1" size={10} />
                              {serial.status.replace('_', ' ')}
                            </Badge>
                            <Badge className={cn("text-xs", getConditionColor(serial.condition))}>
                              {serial.condition}
                            </Badge>
                          </div>
                          <h3 className="font-mono text-sm font-bold text-black">{serial.serialNumber}</h3>
                          <p className="text-sm text-black mt-1">{serial.productName}</p>
                          <p className="text-xs text-black/50">{serial.sku}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedSerial(serial);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedSerial(serial);
                            setShowTransferDialog(true);
                          }}>
                            <Truck className="mr-2 h-4 w-4" />
                            Transfer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedSerial(serial);
                            setShowHistoryDialog(true);
                          }}>
                            <Clock className="mr-2 h-4 w-4" />
                            History
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <QrCode className="mr-2 h-4 w-4" />
                            Generate QR
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Barcode className="mr-2 h-4 w-4" />
                            Generate Barcode
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setSelectedSerial(serial);
                            setShowEditDialog(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                            setSelectedSerial(serial);
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
                    {/* Location */}
                    <div className="p-3 bg-[#F5EEE9]/50 rounded-lg mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Location</span>
                        <span className="text-xs font-medium">{serial.bin || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-red-600" />
                        <span>{serial.location} {serial.zone && `• ${serial.zone}`}</span>
                      </div>
                    </div>

                    {/* Batch and Supplier */}
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Batch</span>
                        <span className="font-mono text-xs font-medium">{serial.batchNumber}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Supplier</span>
                        <span className="text-xs">{serial.supplier}</span>
                      </div>
                    </div>

                    {/* Customer/Order if sold or reserved */}
                    {(serial.status === 'sold' || serial.status === 'reserved') && (
                      <div className="p-2 bg-blue-50 rounded-lg mb-3">
                        <div className="flex items-center gap-2 text-xs">
                          <Package size={12} className="text-blue-600" />
                          <span className="font-medium text-blue-700">{serial.customer}</span>
                          <span className="text-blue-600/50">•</span>
                          <span className="text-blue-600">{serial.orderId}</span>
                        </div>
                      </div>
                    )}

                    {/* Price Info */}
                    <div className="flex items-center justify-between text-sm border-t border-[#F5EEE9] pt-3">
                      <div>
                        <p className="text-xs text-black/50">Cost</p>
                        <p className="font-medium">${serial.cost.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-black/50">Price</p>
                        <p className="font-medium text-green-600">${serial.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Last Scan */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F5EEE9] text-xs">
                      <div className="flex items-center gap-1 text-black/50">
                        <Scan size={12} />
                        {serial.lastScan}
                      </div>
                      <span className="text-black/50">by {serial.lastScanBy}</span>
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
                      checked={selectedSerials.length === filteredSerials.length && filteredSerials.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Serial Number</TableHead>
                  <TableHead className="text-black/50">Product</TableHead>
                  <TableHead className="text-black/50">SKU</TableHead>
                  <TableHead className="text-black/50">Batch</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Condition</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50">Customer/Order</TableHead>
                  <TableHead className="text-black/50 text-right">Cost</TableHead>
                  <TableHead className="text-black/50 text-right">Price</TableHead>
                  <TableHead className="text-black/50">Last Scan</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSerials.map((serial) => (
                  <TableRow key={serial.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedSerials.includes(serial.id)}
                        onCheckedChange={() => handleSelectSerial(serial.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">{serial.serialNumber}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{serial.productName}</p>
                        <p className="text-xs text-black/50">{serial.productId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{serial.sku}</TableCell>
                    <TableCell className="font-mono text-xs">{serial.batchNumber}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(serial.status))}>
                        {serial.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getConditionColor(serial.condition))}>
                        {serial.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>{serial.bin || serial.location}</TableCell>
                    <TableCell>
                      {serial.customer ? (
                        <div className="text-xs">
                          <p>{serial.customer}</p>
                          <p className="text-black/50">{serial.orderId}</p>
                        </div>
                      ) : (
                        <span className="text-black/50">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">${serial.cost.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-green-600">${serial.price.toFixed(2)}</TableCell>
                    <TableCell className="text-xs">
                      <div>{serial.lastScan}</div>
                      <div className="text-black/50">{serial.lastScanBy}</div>
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
                Showing {filteredSerials.length} of {serialNumbers.length} serial numbers
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

      {/* Create Serial Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Serial Number</DialogTitle>
            <DialogDescription>
              Add a new serialized item to inventory
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Serial Number</Label>
              <Input placeholder="e.g., SN240315-001" />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label>Batch</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map(batch => (
                      <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="in_stock">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_stock">In Stock</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label>Bin</Label>
                <Input placeholder="e.g., A-01-01" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cost ($)</Label>
                <Input type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input type="number" step="0.01" placeholder="0.00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes" rows={2} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Add Serial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Serial Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Serial Number Details</DialogTitle>
          </DialogHeader>

          {selectedSerial && (
            <div className="py-4">
              <Tabs defaultValue="details">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="codes">Codes</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black/50">Serial Number</p>
                      <p className="font-mono font-medium">{selectedSerial.serialNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Product</p>
                      <p className="font-medium">{selectedSerial.productName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">SKU</p>
                      <p className="font-mono">{selectedSerial.sku}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Batch</p>
                      <p className="font-mono">{selectedSerial.batchNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Status</p>
                      <Badge className={cn("text-xs", getStatusColor(selectedSerial.status))}>
                        {selectedSerial.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Condition</p>
                      <Badge className={cn("text-xs", getConditionColor(selectedSerial.condition))}>
                        {selectedSerial.condition}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Location</p>
                      <p>{selectedSerial.location} {selectedSerial.zone && `- ${selectedSerial.zone}`}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Bin</p>
                      <p>{selectedSerial.bin || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Received</p>
                      <p>{selectedSerial.receivedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Manufactured</p>
                      <p>{selectedSerial.manufacturedDate}</p>
                    </div>
                    {selectedSerial.expiryDate && (
                      <div>
                        <p className="text-sm text-black/50">Expiry</p>
                        <p>{selectedSerial.expiryDate}</p>
                      </div>
                    )}
                    {selectedSerial.warrantyExpiry && (
                      <div>
                        <p className="text-sm text-black/50">Warranty</p>
                        <p>{selectedSerial.warrantyExpiry}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-black/50">Supplier</p>
                      <p>{selectedSerial.supplier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Cost/Price</p>
                      <p>${selectedSerial.cost} / ${selectedSerial.price}</p>
                    </div>
                  </div>

                  {selectedSerial.notes && (
                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                      <p className="text-sm text-black/50">Notes</p>
                      <p className="text-sm">{selectedSerial.notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedSerial.history.map((event, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-1">
                            {event.action === 'Received' && <Package size={14} className="text-green-600" />}
                            {event.action === 'Quality Check' && <CheckCircle size={14} className="text-blue-600" />}
                            {event.action === 'Reserved' && <Clock size={14} className="text-yellow-600" />}
                            {event.action === 'Shipped' && <Truck size={14} className="text-purple-600" />}
                            {event.action === 'Delivered' && <Check size={14} className="text-green-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{event.action}</p>
                              <span className="text-xs text-black/50">{event.date}</span>
                            </div>
                            <p className="text-xs text-black/50">
                              {event.location} • {event.user}
                            </p>
                            {event.result && (
                              <Badge className={cn(
                                "text-xs mt-1",
                                event.result === 'Passed' && "bg-green-100 text-green-700",
                                event.result === 'Failed' && "bg-red-100 text-red-700",
                              )}>
                                {event.result}
                              </Badge>
                            )}
                            {event.order && (
                              <p className="text-xs text-blue-600 mt-1">Order: {event.order}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="codes">
                  <div className="space-y-4">
                    <div className="p-4 bg-[#F5EEE9] rounded-lg text-center">
                      <QrCode size={120} className="mx-auto mb-2 text-black" />
                      <p className="text-sm font-mono">{selectedSerial.qrCode}</p>
                      <p className="text-xs text-black/50 mt-1">QR Code</p>
                    </div>
                    <div className="p-4 bg-[#F5EEE9] rounded-lg text-center">
                      <Barcode size={120} className="mx-auto mb-2 text-black" />
                      <p className="text-sm font-mono">{selectedSerial.barcode}</p>
                      <p className="text-xs text-black/50 mt-1">Barcode (UPC)</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <QrCode className="mr-2 h-4 w-4" />
              Print Label
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Transfer Serial Number</DialogTitle>
            <DialogDescription>
              Move this item to another location
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="text-sm font-medium">{selectedSerial?.serialNumber}</p>
              <p className="text-xs text-black/50">{selectedSerial?.productName}</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <MapPin size={14} className="text-red-600" />
                <span>{selectedSerial?.location} • {selectedSerial?.bin}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Destination Location</Label>
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
              <Label>Destination Bin</Label>
              <Input placeholder="e.g., B-03-15" />
            </div>

            <div className="space-y-2">
              <Label>Reason</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="replenishment">Replenishment</SelectItem>
                  <SelectItem value="transfer">Stock Transfer</SelectItem>
                  <SelectItem value="customer">Customer Order</SelectItem>
                  <SelectItem value="return">Return to Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes" rows={2} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scan Dialog */}
      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Scan Serial Number</DialogTitle>
            <DialogDescription>
              Use camera or scanner to identify item
            </DialogDescription>
          </DialogHeader>

          <div className="py-8">
            <Tabs defaultValue="camera">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>

              <TabsContent value="camera" className="text-center">
                <div className="w-48 h-48 bg-[#F5EEE9] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Camera size={48} className="text-black/30" />
                </div>
                <p className="text-sm text-black/50 mb-4">
                  Position QR code or barcode in front of camera
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Badge className="bg-red-600 text-white">QR Code</Badge>
                  <Badge className="bg-black text-white">Barcode</Badge>
                </div>
              </TabsContent>

              <TabsContent value="manual">
                <div className="space-y-4">
                  <Input placeholder="Enter serial number manually" />
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Search size={16} className="mr-2" />
                    Lookup
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScanDialog(false)}>
              Cancel
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
            <TooltipContent side="left">Scan Serial</TooltipContent>
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
            <TooltipContent side="left">Add Serial</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowBulkDialog(true)}
              >
                <Copy size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Bulk Actions</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SerialNumbersPage;