// app/dashboard/inventory-adjustments/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sliders,
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
  Check,
  Ban,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  User,
  Users,
  MapPin,
  DollarSign,
  ArrowUpDown,

  History,
  BarChart3,
  PackageCheck,
  PackageMinus,
  PackagePlus,
  PackageX,
  RotateCcw,

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
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const InventoryAdjustmentsPage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedAdjustment, setSelectedAdjustment] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedReason, setSelectedReason] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample inventory adjustments data
  const adjustments = [
    {
      id: 'ADJ-001',
      reference: 'INV-ADJ-2024-001',
      type: 'positive',
      reason: 'found',
      status: 'approved',
      productId: 'PRD-001',
      productName: 'Premium Wireless Headphones',
      sku: 'SKU-001',
      batchNumber: 'BATCH-001',
      location: 'Warehouse A',
      zone: 'Zone 2',
      bin: 'A-02-08',
      previousQuantity: 500,
      newQuantity: 525,
      quantityChange: 25,
      unit: 'pcs',
      unitCost: 45.50,
      totalValueChange: 1137.50,
      description: 'Found 25 units in overflow bin',
      reasonDetails: 'Discrepancy during cycle count',
      requestedBy: 'John Doe',
      requestedDate: '2024-03-15 09:30',
      approvedBy: 'Jane Smith',
      approvedDate: '2024-03-15 10:15',
      reviewedBy: 'Mike Johnson',
      priority: 'medium',
      tags: ['found', 'cycle-count', 'overflow'],
      attachments: ['count-sheet-001.pdf'],
      notes: 'Items were mislabeled, now corrected',
    },
    {
      id: 'ADJ-002',
      reference: 'INV-ADJ-2024-002',
      type: 'negative',
      reason: 'damage',
      status: 'approved',
      productId: 'PRD-007',
      productName: 'Smart LED TV 55"',
      sku: 'SKU-007',
      batchNumber: 'BATCH-007',
      location: 'Warehouse A',
      zone: 'Zone 1',
      bin: 'A-01-22',
      previousQuantity: 30,
      newQuantity: 28,
      quantityChange: -2,
      unit: 'pcs',
      unitCost: 425.00,
      totalValueChange: -850.00,
      description: '2 units damaged during handling',
      reasonDetails: 'Screen cracked in transit',
      requestedBy: 'David Lee',
      requestedDate: '2024-03-14 14:20',
      approvedBy: 'Sarah Wilson',
      approvedDate: '2024-03-14 15:00',
      reviewedBy: 'Tom Brown',
      priority: 'high',
      tags: ['damage', 'quality-issue', 'urgent'],
      attachments: ['damage-report-002.pdf', 'photo-002.jpg'],
      notes: 'Insurance claim filed',
    },
    {
      id: 'ADJ-003',
      reference: 'INV-ADJ-2024-003',
      type: 'negative',
      reason: 'loss',
      status: 'pending',
      productId: 'PRD-004',
      productName: 'Ergonomic Office Chair',
      sku: 'SKU-004',
      batchNumber: 'BATCH-004',
      location: 'Warehouse B',
      zone: 'Zone 3',
      bin: 'B-03-15',
      previousQuantity: 50,
      newQuantity: 48,
      quantityChange: -2,
      unit: 'pcs',
      unitCost: 210.00,
      totalValueChange: -420.00,
      description: '2 chairs missing from inventory',
      reasonDetails: 'Possible miscount or theft',
      requestedBy: 'Emma Watson',
      requestedDate: '2024-03-14 11:05',
      approvedBy: null,
      approvedDate: null,
      reviewedBy: null,
      priority: 'high',
      tags: ['loss', 'investigation', 'missing'],
      attachments: [],
      notes: 'Security footage being reviewed',
    },
    {
      id: 'ADJ-004',
      reference: 'INV-ADJ-2024-004',
      type: 'positive',
      reason: 'return',
      status: 'approved',
      productId: 'PRD-002',
      productName: 'Organic Protein Powder',
      sku: 'SKU-002',
      batchNumber: 'BATCH-002',
      location: 'Warehouse C',
      zone: 'Zone 5',
      bin: 'C-05-12',
      previousQuantity: 250,
      newQuantity: 260,
      quantityChange: 10,
      unit: 'containers',
      unitCost: 28.75,
      totalValueChange: 287.50,
      description: 'Customer returns processed',
      reasonDetails: '10 units returned from Store B',
      requestedBy: 'Anna Taylor',
      requestedDate: '2024-03-13 16:30',
      approvedBy: 'Mike Johnson',
      approvedDate: '2024-03-13 17:00',
      reviewedBy: 'Lisa Chen',
      priority: 'low',
      tags: ['return', 'customer', 'restock'],
      attachments: ['return-auth-004.pdf'],
      notes: 'All items in sellable condition',
    },
    {
      id: 'ADJ-005',
      reference: 'INV-ADJ-2024-005',
      type: 'positive',
      reason: 'correction',
      status: 'approved',
      productId: 'PRD-005',
      productName: 'Cotton T-Shirt (White, L)',
      sku: 'SKU-005',
      batchNumber: 'BATCH-005',
      location: 'Warehouse A',
      zone: 'Zone 1',
      bin: 'A-01-15',
      previousQuantity: 1000,
      newQuantity: 1025,
      quantityChange: 25,
      unit: 'pcs',
      unitCost: 6.50,
      totalValueChange: 162.50,
      description: 'System correction after audit',
      reasonDetails: 'Inventory count discrepancy resolved',
      requestedBy: 'Tom Brown',
      requestedDate: '2024-03-13 10:15',
      approvedBy: 'Jane Smith',
      approvedDate: '2024-03-13 11:30',
      reviewedBy: 'John Doe',
      priority: 'medium',
      tags: ['correction', 'audit', 'reconciliation'],
      attachments: ['audit-report-005.pdf'],
      notes: 'Quarterly audit adjustment',
    },
    {
      id: 'ADJ-006',
      reference: 'INV-ADJ-2024-006',
      type: 'negative',
      reason: 'expiry',
      status: 'approved',
      productId: 'PRD-014',
      productName: 'Organic Milk',
      sku: 'SKU-014',
      batchNumber: 'BATCH-014',
      location: 'Store B',
      zone: 'Dairy',
      bin: 'Quarantine',
      previousQuantity: 100,
      newQuantity: 0,
      quantityChange: -100,
      unit: 'gallons',
      unitCost: 4.50,
      totalValueChange: -450.00,
      description: 'Expired products removed',
      reasonDetails: '100 gallons past expiry date',
      requestedBy: 'Sarah Wilson',
      requestedDate: '2024-03-12 09:00',
      approvedBy: 'Mike Johnson',
      approvedDate: '2024-03-12 09:30',
      reviewedBy: 'Emma Watson',
      priority: 'high',
      tags: ['expiry', 'disposal', 'perishable'],
      attachments: ['disposal-cert-006.pdf'],
      notes: 'Proper disposal completed',
    },
    {
      id: 'ADJ-007',
      reference: 'INV-ADJ-2024-007',
      type: 'negative',
      reason: 'transfer',
      status: 'pending',
      productId: 'PRD-003',
      productName: 'Industrial Lubricant - Grade A',
      sku: 'SKU-003',
      batchNumber: 'BATCH-003',
      location: 'Warehouse B',
      zone: 'Zone 4',
      bin: 'B-04-03',
      previousQuantity: 100,
      newQuantity: 85,
      quantityChange: -15,
      unit: 'drums',
      unitCost: 185.00,
      totalValueChange: -2775.00,
      description: 'Transfer to Store A',
      reasonDetails: 'Replenishment for retail location',
      requestedBy: 'David Lee',
      requestedDate: '2024-03-12 14:45',
      approvedBy: null,
      approvedDate: null,
      reviewedBy: null,
      priority: 'medium',
      tags: ['transfer', 'replenishment', 'pending'],
      attachments: ['transfer-request-007.pdf'],
      notes: 'Awaiting store confirmation',
    },
    {
      id: 'ADJ-008',
      reference: 'INV-ADJ-2024-008',
      type: 'positive',
      reason: 'receiving',
      status: 'approved',
      productId: 'PRD-008',
      productName: 'First Aid Kit - Professional',
      sku: 'SKU-008',
      batchNumber: 'BATCH-008',
      location: 'Store B',
      zone: 'Pharmacy',
      bin: 'P-01-05',
      previousQuantity: 150,
      newQuantity: 175,
      quantityChange: 25,
      unit: 'kits',
      unitCost: 32.50,
      totalValueChange: 812.50,
      description: 'New shipment received',
      reasonDetails: '25 kits from supplier',
      requestedBy: 'Anna Taylor',
      requestedDate: '2024-03-11 13:20',
      approvedBy: 'Tom Brown',
      approvedDate: '2024-03-11 14:00',
      reviewedBy: 'Lisa Chen',
      priority: 'low',
      tags: ['receiving', 'shipment', 'new-stock'],
      attachments: ['packing-slip-008.pdf', 'invoice-008.pdf'],
      notes: 'All items verified',
    },
    {
      id: 'ADJ-009',
      reference: 'INV-ADJ-2024-009',
      type: 'negative',
      reason: 'quality',
      status: 'pending',
      productId: 'PRD-006',
      productName: 'Canned Organic Soup',
      sku: 'SKU-006',
      batchNumber: 'BATCH-006',
      location: 'Warehouse C',
      zone: 'Zone 6',
      bin: 'Quarantine',
      previousQuantity: 2000,
      newQuantity: 1950,
      quantityChange: -50,
      unit: 'cans',
      unitCost: 2.25,
      totalValueChange: -112.50,
      description: 'Quality check failure',
      reasonDetails: '50 cans with damaged labels',
      requestedBy: 'Emma Watson',
      requestedDate: '2024-03-11 10:30',
      approvedBy: null,
      approvedDate: null,
      reviewedBy: null,
      priority: 'medium',
      tags: ['quality', 'damaged', 'quarantine'],
      attachments: ['quality-report-009.pdf'],
      notes: 'Awaiting supplier response',
    },
    {
      id: 'ADJ-010',
      reference: 'INV-ADJ-2024-010',
      type: 'positive',
      reason: 'recount',
      status: 'approved',
      productId: 'PRD-009',
      productName: 'Fresh Dairy Milk',
      sku: 'SKU-009',
      batchNumber: 'BATCH-009',
      location: 'Store A',
      zone: 'Dairy',
      bin: 'D-01-05',
      previousQuantity: 150,
      newQuantity: 155,
      quantityChange: 5,
      unit: 'gallons',
      unitCost: 3.50,
      totalValueChange: 17.50,
      description: 'Recount correction',
      reasonDetails: 'Manual recount found 5 extra units',
      requestedBy: 'Lisa Chen',
      requestedDate: '2024-03-10 15:45',
      approvedBy: 'John Doe',
      approvedDate: '2024-03-10 16:30',
      reviewedBy: 'Jane Smith',
      priority: 'low',
      tags: ['recount', 'correction', 'dairy'],
      attachments: ['count-sheet-010.pdf'],
      notes: 'Shelf restock completed',
    },
  ];

  // Adjustment types
  const adjustmentTypes = [
    { id: 'positive', name: 'Positive (+)', color: 'bg-green-50 text-green-700', icon: PackagePlus },
    { id: 'negative', name: 'Negative (-)', color: 'bg-red-50 text-red-700', icon: PackageMinus },
  ];

  // Reason types
  const reasonTypes = [
    { id: 'found', name: 'Found', icon: PackagePlus },
    { id: 'damage', name: 'Damage', icon: AlertTriangle },
    { id: 'loss', name: 'Loss', icon: PackageX },
    { id: 'return', name: 'Return', icon: RotateCcw },
    { id: 'correction', name: 'Correction', icon: Check },
    { id: 'expiry', name: 'Expiry', icon: Clock },
    { id: 'transfer', name: 'Transfer', icon: ArrowUpDown },
    { id: 'receiving', name: 'Receiving', icon: PackagePlus },
    { id: 'quality', name: 'Quality', icon: AlertCircle },
    { id: 'recount', name: 'Recount', icon: RefreshCw },
    { id: 'theft', name: 'Theft', icon: AlertTriangle },
    { id: 'other', name: 'Other', icon: FileText },
  ];

  // Status configuration
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    approved: { label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200', icon: Ban },
    cancelled: { label: 'Cancelled', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: X },
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
  };

  // Locations for filter
  const locations = [
    { id: 'wh-a', name: 'Warehouse A' },
    { id: 'wh-b', name: 'Warehouse B' },
    { id: 'wh-c', name: 'Warehouse C' },
    { id: 'store-a', name: 'Store A' },
    { id: 'store-b', name: 'Store B' },
  ];

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Clock;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-100 text-gray-700';
  };

  const getTypeColor = (type) => {
    return type === 'positive' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700';
  };

  const filteredAdjustments = adjustments.filter(adj => {
    const matchesType = selectedType === 'all' || adj.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || adj.status === selectedStatus;
    const matchesReason = selectedReason === 'all' || adj.reason === selectedReason;
    const matchesLocation = selectedLocation === 'all' || adj.location === selectedLocation;
    const matchesSearch = adj.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         adj.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         adj.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         adj.batchNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         adj.requestedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesReason && matchesLocation && matchesSearch;
  });

  const stats = {
    total: adjustments.length,
    pending: adjustments.filter(a => a.status === 'pending').length,
    approved: adjustments.filter(a => a.status === 'approved').length,
    rejected: adjustments.filter(a => a.status === 'rejected').length,
    totalPositive: adjustments.filter(a => a.type === 'positive').reduce((sum, a) => sum + a.quantityChange, 0),
    totalNegative: adjustments.filter(a => a.type === 'negative').reduce((sum, a) => sum + Math.abs(a.quantityChange), 0),
    totalValueChange: adjustments.reduce((sum, a) => sum + a.totalValueChange, 0),
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Inventory Adjustments</h1>
            <p className="text-black/50 mt-1">Manage inventory corrections, damages, returns, and adjustments</p>
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
              onClick={() => setShowReportDialog(true)}
            >
              <BarChart3 size={16} />
              Report
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              New Adjustment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Adjustments</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Sliders size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Pending</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Clock size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Approved</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.approved}</p>
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
                  <p className="text-xs text-black/50">Rejected</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.rejected}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Ban size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Positive Qty</p>
                  <p className="text-xl font-bold text-green-600 mt-1">+{stats.totalPositive}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <PackagePlus size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Negative Qty</p>
                  <p className="text-xl font-bold text-red-600 mt-1">-{stats.totalNegative}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <PackageMinus size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Net Value</p>
                  <p className={cn("text-xl font-bold", stats.totalValueChange >= 0 ? 'text-green-600' : 'text-red-600')}>
                    ${stats.totalValueChange.toLocaleString()}
                  </p>
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
              placeholder="Search by reference, product, SKU, batch, or requester..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="positive">Positive (+)</SelectItem>
              <SelectItem value="negative">Negative (-)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedReason} onValueChange={setSelectedReason}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reasons</SelectItem>
              {reasonTypes.map(reason => (
                <SelectItem key={reason.id} value={reason.id}>
                  {reason.name}
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
                <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
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

      {/* Adjustments Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredAdjustments.map((adj) => {
            const StatusIcon = statusConfig[adj.status]?.icon || Clock;
            const TypeIcon = adj.type === 'positive' ? PackagePlus : PackageMinus;
            
            return (
              <Card key={adj.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={cn(
                    "p-4 border-b border-[#F5EEE9]",
                    adj.type === 'positive' ? 'bg-gradient-to-r from-green-50 to-transparent' : 'bg-gradient-to-r from-red-50 to-transparent'
                  )}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(adj.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {adj.status}
                          </Badge>
                          <Badge className={cn("text-xs border-0", getPriorityColor(adj.priority))}>
                            {adj.priority}
                          </Badge>
                          <Badge className={cn("text-xs", getTypeColor(adj.type))}>
                            <TypeIcon className="mr-1" size={10} />
                            {adj.type}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{adj.reference}</h3>
                        <p className="text-sm text-black mt-1">{adj.productName}</p>
                        <p className="text-xs text-black/50">{adj.sku} • {adj.batchNumber}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedAdjustment(adj);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {adj.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => {
                                setSelectedAdjustment(adj);
                                setShowApproveDialog(true);
                              }}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedAdjustment(adj);
                                setShowRejectDialog(true);
                              }}>
                                <Ban className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
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
                    {/* Quantity Change */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center flex-1">
                        <p className="text-xs text-black/50">Previous</p>
                        <p className="text-lg font-bold text-black">{adj.previousQuantity}</p>
                      </div>
                      <div className="text-center flex-1">
                        <p className="text-xs text-black/50">Change</p>
                        <p className={cn(
                          "text-lg font-bold",
                          adj.quantityChange > 0 ? 'text-green-600' : 'text-red-600'
                        )}>
                          {adj.quantityChange > 0 ? '+' : ''}{adj.quantityChange}
                        </p>
                      </div>
                      <div className="text-center flex-1">
                        <p className="text-xs text-black/50">New</p>
                        <p className="text-lg font-bold text-black">{adj.newQuantity}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Reason</span>
                        <span className="font-medium capitalize">{adj.reason}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Value Change</span>
                        <span className={cn(
                          "font-medium",
                          adj.totalValueChange > 0 ? 'text-green-600' : 'text-red-600'
                        )}>
                          {adj.totalValueChange > 0 ? '+' : ''}${Math.abs(adj.totalValueChange).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mt-3 p-2 bg-[#F5EEE9]/50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-red-600" />
                        <span>{adj.location} • {adj.bin}</span>
                      </div>
                    </div>

                    {/* Requester and Date */}
                    <div className="flex items-center justify-between mt-3 text-xs">
                      <div className="flex items-center gap-1 text-black/50">
                        <User size={12} />
                        {adj.requestedBy}
                      </div>
                      <div className="flex items-center gap-1 text-black/50">
                        <Clock size={12} />
                        {adj.requestedDate.split(' ')[1]}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-black/70 mt-3 line-clamp-2">
                      {adj.description}
                    </p>
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
                  <TableHead className="text-black/50">Reference</TableHead>
                  <TableHead className="text-black/50">Product</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Reason</TableHead>
                  <TableHead className="text-black/50 text-right">Previous</TableHead>
                  <TableHead className="text-black/50 text-right">Change</TableHead>
                  <TableHead className="text-black/50 text-right">New</TableHead>
                  <TableHead className="text-black/50 text-right">Value</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50">Requester</TableHead>
                  <TableHead className="text-black/50">Date</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdjustments.map((adj) => (
                  <TableRow key={adj.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">{adj.reference}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{adj.productName}</p>
                        <p className="text-xs text-black/50">{adj.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getTypeColor(adj.type))}>
                        {adj.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{adj.reason}</TableCell>
                    <TableCell className="text-right">{adj.previousQuantity}</TableCell>
                    <TableCell className={cn(
                      "text-right font-bold",
                      adj.quantityChange > 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {adj.quantityChange > 0 ? '+' : ''}{adj.quantityChange}
                    </TableCell>
                    <TableCell className="text-right">{adj.newQuantity}</TableCell>
                    <TableCell className={cn(
                      "text-right",
                      adj.totalValueChange > 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {adj.totalValueChange > 0 ? '+' : ''}${Math.abs(adj.totalValueChange).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(adj.status))}>
                        {adj.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(adj.priority))}>
                        {adj.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{adj.bin}</TableCell>
                    <TableCell>{adj.requestedBy}</TableCell>
                    <TableCell>{adj.requestedDate.split(' ')[0]}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedAdjustment(adj);
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
                Showing {filteredAdjustments.length} of {adjustments.length} adjustments
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

      {/* Create Adjustment Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Inventory Adjustment</DialogTitle>
            <DialogDescription>
              Create a new inventory adjustment request
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Adjustment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="positive">Positive (+)</SelectItem>
                        <SelectItem value="negative">Negative (-)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {reasonTypes.map(reason => (
                          <SelectItem key={reason.id} value={reason.id}>
                            {reason.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PRD-001">Premium Wireless Headphones</SelectItem>
                        <SelectItem value="PRD-002">Organic Protein Powder</SelectItem>
                        <SelectItem value="PRD-003">Industrial Lubricant - Grade A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Batch/Lot</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BATCH-001">BATCH-001</SelectItem>
                        <SelectItem value="BATCH-002">BATCH-002</SelectItem>
                        <SelectItem value="BATCH-003">BATCH-003</SelectItem>
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
                    <Label>Current Quantity</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Adjustment Quantity</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the reason for adjustment" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <RadioGroup defaultValue="medium" className="flex gap-4">
                    {['Low', 'Medium', 'High', 'Urgent'].map((priority) => (
                      <div key={priority} className="flex items-center space-x-2">
                        <RadioGroupItem value={priority.toLowerCase()} id={`priority-${priority}`} />
                        <Label htmlFor={`priority-${priority}`}>{priority}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Attachments</Label>
                  <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                    <Upload size={24} className="mx-auto text-black/30 mb-2" />
                    <p className="text-sm text-black/50">Drag files or click to upload</p>
                    <p className="text-xs text-black/30">Support: PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes" rows={2} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adjustment Details</DialogTitle>
          </DialogHeader>

          {selectedAdjustment && (
            <div className="py-4 space-y-4">
              <div className="p-4 bg-[#F5EEE9] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{selectedAdjustment.reference}</h3>
                  <Badge className={cn("text-xs border-0", getStatusColor(selectedAdjustment.status))}>
                    {selectedAdjustment.status}
                  </Badge>
                </div>
                <p className="text-sm text-black/70">{selectedAdjustment.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-black/50">Product</p>
                  <p className="font-medium">{selectedAdjustment.productName}</p>
                  <p className="text-xs text-black/50">{selectedAdjustment.sku}</p>
                </div>
                <div>
                  <p className="text-sm text-black/50">Batch</p>
                  <p className="font-mono">{selectedAdjustment.batchNumber || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-[#F5EEE9] rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-black/50">Previous</p>
                  <p className="text-lg font-bold">{selectedAdjustment.previousQuantity}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-black/50">Change</p>
                  <p className={cn(
                    "text-lg font-bold",
                    selectedAdjustment.quantityChange > 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {selectedAdjustment.quantityChange > 0 ? '+' : ''}{selectedAdjustment.quantityChange}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-black/50">New</p>
                  <p className="text-lg font-bold">{selectedAdjustment.newQuantity}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-black/50">Type/Reason</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={cn("text-xs", getTypeColor(selectedAdjustment.type))}>
                      {selectedAdjustment.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs capitalize">
                      {selectedAdjustment.reason}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-black/50">Value Change</p>
                  <p className={cn(
                    "font-medium",
                    selectedAdjustment.totalValueChange > 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {selectedAdjustment.totalValueChange > 0 ? '+' : ''}${Math.abs(selectedAdjustment.totalValueChange).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#F5EEE9] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-red-600" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-sm">{selectedAdjustment.location} • {selectedAdjustment.bin}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-black/50">Requested By</p>
                  <p className="font-medium">{selectedAdjustment.requestedBy}</p>
                  <p className="text-xs text-black/50">{selectedAdjustment.requestedDate}</p>
                </div>
                {selectedAdjustment.approvedBy && (
                  <div>
                    <p className="text-sm text-black/50">Approved By</p>
                    <p className="font-medium">{selectedAdjustment.approvedBy}</p>
                    <p className="text-xs text-black/50">{selectedAdjustment.approvedDate}</p>
                  </div>
                )}
              </div>

              {selectedAdjustment.notes && (
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-700">{selectedAdjustment.notes}</p>
                </div>
              )}

              {selectedAdjustment.attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Attachments</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAdjustment.attachments.map((file, index) => (
                      <Badge key={index} variant="outline" className="border-[#F5EEE9] py-1">
                        <FileText size={12} className="mr-1" />
                        {file}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedAdjustment?.status === 'pending' && (
              <div className="flex gap-2">
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                  setShowDetailsDialog(false);
                  setShowApproveDialog(true);
                }}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => {
                  setShowDetailsDialog(false);
                  setShowRejectDialog(true);
                }}>
                  <Ban className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Approve Adjustment</DialogTitle>
            <DialogDescription>
              Confirm approval of this inventory adjustment
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedAdjustment?.reference}</p>
              <p className="text-sm text-black/50">{selectedAdjustment?.productName}</p>
              <p className="text-sm text-black/50">
                Change: {selectedAdjustment?.quantityChange > 0 ? '+' : ''}{selectedAdjustment?.quantityChange} units
              </p>
            </div>

            <div className="space-y-2">
              <Label>Approval Notes</Label>
              <Textarea placeholder="Add any approval notes" rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Notify Requester</Label>
              <div className="flex items-center space-x-2">
                <Switch id="notify" defaultChecked />
                <Label htmlFor="notify">Send email notification</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Approve Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Reject Adjustment</DialogTitle>
            <DialogDescription>
              Provide reason for rejection
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-red-600 mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-medium text-red-700">Warning</p>
                  <p className="text-xs text-red-600/70">
                    Rejecting this adjustment will require a new request if changes are needed.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rejection Reason</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insufficient">Insufficient Documentation</SelectItem>
                  <SelectItem value="incorrect">Incorrect Information</SelectItem>
                  <SelectItem value="duplicate">Duplicate Request</SelectItem>
                  <SelectItem value="not-approved">Not Approved</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Comments</Label>
              <Textarea placeholder="Provide detailed feedback" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Reject Adjustment
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
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">New Adjustment</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowBulkDialog(true)}
              >
                <Copy size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Bulk Adjustments</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowHistoryDialog(true)}
              >
                <History size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Adjustment History</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default InventoryAdjustmentsPage;