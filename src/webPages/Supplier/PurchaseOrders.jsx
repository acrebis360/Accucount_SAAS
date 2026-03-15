// app/dashboard/purchase-orders/page.js
'use client';

import { useState } from 'react';
import { 
  ShoppingCart,
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  User,
  FileText,
  Download,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  History,
  BarChart3,
  DollarSign,
  Building,
  Send,
  Plus,
  Ban,

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
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PurchaseOrdersPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPO, setSelectedPO] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPOs, setSelectedPOs] = useState([]);

  // Sample purchase orders data
  const purchaseOrders = [
    {
      id: 'PO-001',
      poNumber: 'PO-2024-001',
      vendorId: 'VEN-001',
      vendorName: 'Tech Supplies Inc',
      orderDate: '2024-03-15',
      expectedDate: '2024-03-22',
      deliveredDate: null,
      status: 'pending',
      priority: 'high',
      paymentTerms: 'Net 30',
      currency: 'USD',
      subtotal: 12500.00,
      tax: 1000.00,
      shipping: 250.00,
      total: 13750.00,
      paid: 0,
      balance: 13750.00,
      items: [
        { id: 1, sku: 'SKU-001', description: 'Premium Wireless Headphones', quantity: 50, unitPrice: 89.99, total: 4499.50 },
        { id: 2, sku: 'SKU-002', description: 'Bluetooth Speakers', quantity: 30, unitPrice: 129.99, total: 3899.70 },
        { id: 3, sku: 'SKU-003', description: 'USB-C Cables (6ft)', quantity: 200, unitPrice: 12.99, total: 2598.00 },
      ],
      totalItems: 3,
      totalQuantity: 280,
      requestedBy: 'John Doe',
      approvedBy: null,
      notes: 'Rush order for electronics',
      internalNotes: 'Pending vendor confirmation',
      attachments: ['RFQ-001.pdf'],
      tags: ['electronics', 'rush'],
      history: [
        { date: '2024-03-15 09:30', action: 'Created', user: 'John Doe' },
      ],
    },
    {
      id: 'PO-002',
      poNumber: 'PO-2024-002',
      vendorId: 'VEN-004',
      vendorName: 'Organic Food Co',
      orderDate: '2024-03-14',
      expectedDate: '2024-03-19',
      deliveredDate: null,
      status: 'approved',
      priority: 'medium',
      paymentTerms: 'Net 15',
      currency: 'USD',
      subtotal: 8750.50,
      tax: 700.04,
      shipping: 150.00,
      total: 9600.54,
      paid: 0,
      balance: 9600.54,
      items: [
        { id: 1, sku: 'SKU-009', description: 'Fresh Dairy Milk', quantity: 100, unitPrice: 4.99, total: 499.00 },
        { id: 2, sku: 'SKU-010', description: 'Organic Eggs (dozen)', quantity: 200, unitPrice: 5.99, total: 1198.00 },
        { id: 3, sku: 'SKU-011', description: 'Greek Yogurt', quantity: 150, unitPrice: 3.99, total: 598.50 },
      ],
      totalItems: 3,
      totalQuantity: 450,
      requestedBy: 'Jane Smith',
      approvedBy: 'Mike Johnson',
      approvedDate: '2024-03-14 14:30',
      notes: 'Weekly grocery order',
      internalNotes: 'Approved - send to vendor',
      tags: ['food', 'perishable'],
      history: [
        { date: '2024-03-14 14:30', action: 'Approved', user: 'Mike Johnson' },
        { date: '2024-03-14 10:15', action: 'Created', user: 'Jane Smith' },
      ],
    },
    {
      id: 'PO-003',
      poNumber: 'PO-2024-003',
      vendorId: 'VEN-002',
      vendorName: 'Office Furniture Co',
      orderDate: '2024-03-13',
      expectedDate: '2024-03-25',
      deliveredDate: null,
      status: 'sent',
      priority: 'low',
      paymentTerms: 'Net 45',
      currency: 'USD',
      subtotal: 15400.00,
      tax: 1232.00,
      shipping: 450.00,
      total: 17082.00,
      paid: 0,
      balance: 17082.00,
      items: [
        { id: 1, sku: 'SKU-004', description: 'Ergonomic Office Chair', quantity: 10, unitPrice: 299.99, total: 2999.90 },
        { id: 2, sku: 'SKU-005', description: 'Standing Desk', quantity: 5, unitPrice: 599.99, total: 2999.95 },
        { id: 3, sku: 'SKU-006', description: 'Bookshelf', quantity: 8, unitPrice: 199.99, total: 1599.92 },
      ],
      totalItems: 3,
      totalQuantity: 23,
      requestedBy: 'Sarah Wilson',
      approvedBy: 'Tom Brown',
      approvedDate: '2024-03-13 11:20',
      notes: 'Office renovation order',
      internalNotes: 'Vendor confirmed',
      attachments: ['quotation.pdf'],
      tags: ['furniture', 'office'],
      history: [
        { date: '2024-03-13 15:45', action: 'Sent', user: 'System' },
        { date: '2024-03-13 11:20', action: 'Approved', user: 'Tom Brown' },
        { date: '2024-03-13 09:00', action: 'Created', user: 'Sarah Wilson' },
      ],
    },
    {
      id: 'PO-004',
      poNumber: 'PO-2024-004',
      vendorId: 'VEN-008',
      vendorName: 'ChemCorp Industries',
      orderDate: '2024-03-12',
      expectedDate: '2024-03-20',
      deliveredDate: null,
      status: 'approved',
      priority: 'high',
      paymentTerms: 'Net 45',
      currency: 'USD',
      subtotal: 22350.00,
      tax: 1788.00,
      shipping: 550.00,
      total: 24688.00,
      paid: 0,
      balance: 24688.00,
      items: [
        { id: 1, sku: 'SKU-016', description: 'Industrial Solvent', quantity: 50, unitPrice: 89.99, total: 4499.50 },
        { id: 2, sku: 'SKU-017', description: 'Lubricant - Grade A', quantity: 40, unitPrice: 129.99, total: 5199.60 },
        { id: 3, sku: 'SKU-018', description: 'Cleaning Solution', quantity: 100, unitPrice: 24.99, total: 2499.00 },
      ],
      totalItems: 3,
      totalQuantity: 190,
      requestedBy: 'David Lee',
      approvedBy: 'Lisa Chen',
      approvedDate: '2024-03-12 16:20',
      notes: 'Monthly chemical order',
      internalNotes: 'Approved - hazmat shipping',
      tags: ['chemical', 'hazmat'],
      history: [
        { date: '2024-03-12 16:20', action: 'Approved', user: 'Lisa Chen' },
        { date: '2024-03-12 13:45', action: 'Created', user: 'David Lee' },
      ],
    },
    {
      id: 'PO-005',
      poNumber: 'PO-2024-005',
      vendorId: 'VEN-006',
      vendorName: 'Medical Supplies Inc',
      orderDate: '2024-03-11',
      expectedDate: '2024-03-18',
      deliveredDate: '2024-03-17',
      status: 'received',
      priority: 'high',
      paymentTerms: 'Net 30',
      currency: 'USD',
      subtotal: 18900.00,
      tax: 1512.00,
      shipping: 0.00,
      total: 20412.00,
      paid: 0,
      balance: 20412.00,
      items: [
        { id: 1, sku: 'SKU-019', description: 'Medical Gloves (box)', quantity: 200, unitPrice: 12.99, total: 2598.00 },
        { id: 2, sku: 'SKU-020', description: 'Face Masks (box)', quantity: 500, unitPrice: 8.99, total: 4495.00 },
        { id: 3, sku: 'SKU-021', description: 'Hand Sanitizer', quantity: 150, unitPrice: 5.99, total: 898.50 },
      ],
      totalItems: 3,
      totalQuantity: 850,
      requestedBy: 'Richard Harris',
      approvedBy: 'Sarah Wilson',
      approvedDate: '2024-03-11 14:30',
      receivedBy: 'Receiving Dept',
      receivedDate: '2024-03-17 10:15',
      notes: 'PPE supplies',
      internalNotes: 'Received - quality check passed',
      tags: ['medical', 'ppe'],
      history: [
        { date: '2024-03-17 10:15', action: 'Received', user: 'Receiving Dept' },
        { date: '2024-03-11 14:30', action: 'Approved', user: 'Sarah Wilson' },
        { date: '2024-03-11 09:45', action: 'Created', user: 'Richard Harris' },
      ],
    },
    {
      id: 'PO-006',
      poNumber: 'PO-2024-006',
      vendorId: 'VEN-009',
      vendorName: 'Packaging Solutions Inc',
      orderDate: '2024-03-10',
      expectedDate: '2024-03-17',
      deliveredDate: '2024-03-16',
      status: 'received',
      priority: 'medium',
      paymentTerms: 'Net 30',
      currency: 'USD',
      subtotal: 5600.00,
      tax: 448.00,
      shipping: 125.00,
      total: 6173.00,
      paid: 0,
      balance: 6173.00,
      items: [
        { id: 1, sku: 'SKU-022', description: 'Cardboard Boxes (12x12)', quantity: 500, unitPrice: 2.99, total: 1495.00 },
        { id: 2, sku: 'SKU-023', description: 'Packing Tape', quantity: 200, unitPrice: 1.99, total: 398.00 },
        { id: 3, sku: 'SKU-024', description: 'Bubble Wrap', quantity: 100, unitPrice: 4.99, total: 499.00 },
      ],
      totalItems: 3,
      totalQuantity: 800,
      requestedBy: 'Tom Holland',
      approvedBy: 'Mike Johnson',
      approvedDate: '2024-03-10 11:30',
      receivedBy: 'Warehouse Team',
      receivedDate: '2024-03-16 14:20',
      notes: 'Packaging supplies',
      internalNotes: 'Inventory restocked',
      tags: ['packaging', 'supplies'],
      history: [
        { date: '2024-03-16 14:20', action: 'Received', user: 'Warehouse Team' },
        { date: '2024-03-10 11:30', action: 'Approved', user: 'Mike Johnson' },
        { date: '2024-03-10 09:00', action: 'Created', user: 'Tom Holland' },
      ],
    },
    {
      id: 'PO-007',
      poNumber: 'PO-2024-007',
      vendorId: 'VEN-003',
      vendorName: 'Fashion Textiles Inc',
      orderDate: '2024-03-09',
      expectedDate: '2024-03-23',
      deliveredDate: null,
      status: 'pending',
      priority: 'medium',
      paymentTerms: 'Net 30',
      currency: 'USD',
      subtotal: 8900.00,
      tax: 712.00,
      shipping: 200.00,
      total: 9812.00,
      paid: 0,
      balance: 9812.00,
      items: [
        { id: 1, sku: 'SKU-025', description: 'Cotton Fabric (yard)', quantity: 500, unitPrice: 5.99, total: 2995.00 },
        { id: 2, sku: 'SKU-026', description: 'Polyester Fabric (yard)', quantity: 300, unitPrice: 4.99, total: 1497.00 },
      ],
      totalItems: 2,
      totalQuantity: 800,
      requestedBy: 'Emma Watson',
      approvedBy: null,
      notes: 'Fabric for uniforms',
      internalNotes: 'Awaiting budget approval',
      tags: ['textiles', 'pending'],
      history: [
        { date: '2024-03-09 13:45', action: 'Created', user: 'Emma Watson' },
      ],
    },
    {
      id: 'PO-008',
      poNumber: 'PO-2024-008',
      vendorId: 'VEN-005',
      vendorName: 'Industrial Supplies Co',
      orderDate: '2024-03-08',
      expectedDate: '2024-03-22',
      deliveredDate: null,
      status: 'cancelled',
      priority: 'low',
      paymentTerms: 'Net 60',
      currency: 'USD',
      subtotal: 12500.00,
      tax: 1000.00,
      shipping: 350.00,
      total: 13850.00,
      paid: 0,
      balance: 0,
      items: [
        { id: 1, sku: 'SKU-027', description: 'Power Tools Set', quantity: 5, unitPrice: 899.99, total: 4499.95 },
        { id: 2, sku: 'SKU-028', description: 'Industrial Vacuum', quantity: 2, unitPrice: 1299.99, total: 2599.98 },
      ],
      totalItems: 2,
      totalQuantity: 7,
      requestedBy: 'Chris Evans',
      approvedBy: 'Tom Brown',
      approvedDate: '2024-03-08 15:20',
      cancelledBy: 'Tom Brown',
      cancelledDate: '2024-03-09 10:30',
      cancellationReason: 'Budget cut',
      notes: 'Tools for maintenance',
      internalNotes: 'Cancelled due to budget constraints',
      tags: ['tools', 'cancelled'],
      history: [
        { date: '2024-03-09 10:30', action: 'Cancelled', user: 'Tom Brown', details: 'Budget cut' },
        { date: '2024-03-08 15:20', action: 'Approved', user: 'Tom Brown' },
        { date: '2024-03-08 11:00', action: 'Created', user: 'Chris Evans' },
      ],
    },
    {
      id: 'PO-009',
      poNumber: 'PO-2024-009',
      vendorId: 'VEN-010',
      vendorName: 'Logistics Partners LLC',
      orderDate: '2024-03-07',
      expectedDate: '2024-03-14',
      deliveredDate: '2024-03-13',
      status: 'invoiced',
      priority: 'medium',
      paymentTerms: 'Net 30',
      currency: 'USD',
      subtotal: 3500.00,
      tax: 280.00,
      shipping: 0.00,
      total: 3780.00,
      paid: 0,
      balance: 3780.00,
      items: [
        { id: 1, description: 'Freight Services - March', quantity: 1, unitPrice: 3500.00, total: 3500.00 },
      ],
      totalItems: 1,
      totalQuantity: 1,
      requestedBy: 'Zendaya',
      approvedBy: 'Mike Johnson',
      approvedDate: '2024-03-07 14:30',
      receivedBy: 'Logistics Dept',
      receivedDate: '2024-03-13 09:45',
      invoiceNumber: 'INV-2024-089',
      invoiceDate: '2024-03-14',
      invoiceAmount: 3780.00,
      notes: 'Monthly freight services',
      internalNotes: 'Invoice received - pending payment',
      tags: ['logistics', 'services'],
      history: [
        { date: '2024-03-14 11:20', action: 'Invoiced', user: 'System', details: 'Invoice INV-2024-089' },
        { date: '2024-03-13 09:45', action: 'Received', user: 'Logistics Dept' },
        { date: '2024-03-07 14:30', action: 'Approved', user: 'Mike Johnson' },
        { date: '2024-03-07 10:15', action: 'Created', user: 'Zendaya' },
      ],
    },
    {
      id: 'PO-010',
      poNumber: 'PO-2024-010',
      vendorId: 'VEN-001',
      vendorName: 'Tech Supplies Inc',
      orderDate: '2024-03-06',
      expectedDate: '2024-03-20',
      deliveredDate: null,
      status: 'approved',
      priority: 'high',
      paymentTerms: 'Net 30',
      currency: 'USD',
      subtotal: 18750.00,
      tax: 1500.00,
      shipping: 300.00,
      total: 20550.00,
      paid: 0,
      balance: 20550.00,
      items: [
        { id: 1, sku: 'SKU-001', description: 'Premium Wireless Headphones', quantity: 100, unitPrice: 89.99, total: 8999.00 },
        { id: 2, sku: 'SKU-002', description: 'Bluetooth Speakers', quantity: 50, unitPrice: 129.99, total: 6499.50 },
        { id: 3, sku: 'SKU-029', description: 'Laptop Docking Station', quantity: 25, unitPrice: 149.99, total: 3749.75 },
      ],
      totalItems: 3,
      totalQuantity: 175,
      requestedBy: 'John Doe',
      approvedBy: 'Jane Smith',
      approvedDate: '2024-03-06 16:45',
      notes: 'Q2 electronics order',
      internalNotes: 'Bulk order - vendor confirmed',
      tags: ['electronics', 'bulk'],
      history: [
        { date: '2024-03-06 16:45', action: 'Approved', user: 'Jane Smith' },
        { date: '2024-03-06 11:30', action: 'Created', user: 'John Doe' },
      ],
    },
  ];

  // Status configuration
  const statusConfig = {
    draft: { label: 'Draft', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: FileText },
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    sent: { label: 'Sent', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Send },
    approved: { label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    received: { label: 'Received', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Package },
    invoiced: { label: 'Invoiced', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: FileText },
    cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    critical: { label: 'Critical', color: 'bg-red-100 text-red-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || FileText;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-100 text-gray-700';
  };

  const filteredPOs = purchaseOrders.filter(po => {
    const matchesStatus = selectedStatus === 'all' || po.status === selectedStatus;
    const matchesVendor = selectedVendor === 'all' || po.vendorName === selectedVendor;
    const matchesPriority = selectedPriority === 'all' || po.priority === selectedPriority;
    const matchesSearch = po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         po.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         po.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesVendor && matchesPriority && matchesSearch;
  });

  const stats = {
    total: purchaseOrders.length,
    pending: purchaseOrders.filter(p => p.status === 'pending').length,
    approved: purchaseOrders.filter(p => p.status === 'approved').length,
    received: purchaseOrders.filter(p => p.status === 'received').length,
    totalValue: purchaseOrders.reduce((sum, p) => sum + p.total, 0),
    pendingValue: purchaseOrders.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.total, 0),
  };

  const handleSelectAll = () => {
    if (selectedPOs.length === filteredPOs.length) {
      setSelectedPOs([]);
    } else {
      setSelectedPOs(filteredPOs.map(p => p.id));
    }
  };

  const handleSelectPO = (id) => {
    if (selectedPOs.includes(id)) {
      setSelectedPOs(selectedPOs.filter(p => p !== id));
    } else {
      setSelectedPOs([...selectedPOs, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Purchase Orders</h1>
            <p className="text-black/50 mt-1">Manage and track purchase orders</p>
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
                  <PrinterIcon className="mr-2 h-4 w-4" />
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
              Create PO
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total POs</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <ShoppingCart size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Received</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.received}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Package size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Value</p>
                  <p className="text-xl font-bold text-green-600 mt-1">${stats.totalValue.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <DollarSign size={18} className="text-green-600" />
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
              placeholder="Search by PO #, vendor, or tags..."
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="invoiced">Invoiced</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
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
      {selectedPOs.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedPOs.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedPOs([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <CheckCircle size={14} className="mr-2" />
              Approve
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Package size={14} className="mr-2" />
              Receive
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-red-600">
              <Ban size={14} className="mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* POs Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredPOs.map((po) => {
            const StatusIcon = statusConfig[po.status]?.icon || FileText;
            
            return (
              <Card key={po.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(po.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {po.status}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(po.priority))}>
                            {po.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{po.poNumber}</h3>
                        <p className="text-xs text-black/50 mt-1">{po.vendorName}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedPO(po);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {po.status === 'pending' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedPO(po);
                              setShowApproveDialog(true);
                            }}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {po.status === 'approved' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedPO(po);
                              setShowReceiveDialog(true);
                            }}>
                              <Package className="mr-2 h-4 w-4" />
                              Receive
                            </DropdownMenuItem>
                          )}
                          {po.status === 'received' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedPO(po);
                              setShowInvoiceDialog(true);
                            }}>
                              <FileText className="mr-2 h-4 w-4" />
                              Process Invoice
                            </DropdownMenuItem>
                          )}
                          {(po.status === 'pending' || po.status === 'approved') && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedPO(po);
                              setShowCancelDialog(true);
                            }}>
                              <Ban className="mr-2 h-4 w-4" />
                              Cancel
                            </DropdownMenuItem>
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
                    {/* Dates */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={10} className="text-black/30" />
                        <span className="text-[10px] text-black/70">Order: {po.orderDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={10} className="text-black/30" />
                        <span className="text-[10px] text-black/70">Due: {po.expectedDate}</span>
                      </div>
                    </div>

                    {/* Items Summary */}
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[8px] text-black/50">Items</p>
                        <p className="text-xs font-bold">{po.totalItems}</p>
                      </div>
                      <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[8px] text-black/50">Quantity</p>
                        <p className="text-xs font-bold">{po.totalQuantity}</p>
                      </div>
                      <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[8px] text-black/50">Total</p>
                        <p className="text-xs font-bold text-green-600">${po.total.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Vendor & Requester */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Building size={10} className="text-black/30" />
                        <span className="text-[10px] text-black/70 truncate max-w-[100px]">{po.vendorName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={10} className="text-black/30" />
                        <span className="text-[10px] text-black/70">{po.requestedBy}</span>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 mb-2">
                      <span>Terms: {po.paymentTerms}</span>
                      <span>Balance: ${po.balance.toLocaleString()}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {po.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                      <span>Created: {po.orderDate}</span>
                      {po.attachments && po.attachments.length > 0 && (
                        <div className="flex items-center gap-1">
                          <FileText size={8} />
                          <span>{po.attachments.length}</span>
                        </div>
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
                      checked={selectedPOs.length === filteredPOs.length && filteredPOs.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">PO #</TableHead>
                  <TableHead className="text-black/50">Vendor</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Order Date</TableHead>
                  <TableHead className="text-black/50">Expected</TableHead>
                  <TableHead className="text-black/50 text-right">Items</TableHead>
                  <TableHead className="text-black/50 text-right">Quantity</TableHead>
                  <TableHead className="text-black/50 text-right">Total</TableHead>
                  <TableHead className="text-black/50">Requested By</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPOs.map((po) => (
                  <TableRow key={po.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedPOs.includes(po.id)}
                        onCheckedChange={() => handleSelectPO(po.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs">{po.poNumber}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{po.vendorName}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(po.status))}>
                        {po.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(po.priority))}>
                        {po.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{po.orderDate}</TableCell>
                    <TableCell className="text-xs">{po.expectedDate}</TableCell>
                    <TableCell className="text-right">{po.totalItems}</TableCell>
                    <TableCell className="text-right">{po.totalQuantity}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">${po.total.toLocaleString()}</TableCell>
                    <TableCell>{po.requestedBy}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedPO(po);
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
                Showing {filteredPOs.length} of {purchaseOrders.length} POs
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

      {/* Create PO Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
            <DialogDescription>
              Create a new purchase order
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Label>Vendor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VEN-001">Tech Supplies Inc</SelectItem>
                      <SelectItem value="VEN-002">Office Furniture Co</SelectItem>
                      <SelectItem value="VEN-004">Organic Food Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Order Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected Date</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Payment Terms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net15">Net 15</SelectItem>
                        <SelectItem value="net30">Net 30</SelectItem>
                        <SelectItem value="net45">Net 45</SelectItem>
                        <SelectItem value="net60">Net 60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Requested By</Label>
                  <Input placeholder="Your name" />
                </div>
              </TabsContent>

              <TabsContent value="items" className="space-y-4">
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <Card key={i} className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SKU-001">SKU-001 - Headphones</SelectItem>
                              <SelectItem value="SKU-002">SKU-002 - Speakers</SelectItem>
                              <SelectItem value="SKU-003">SKU-003 - Cables</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input type="number" placeholder="Quantity" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="number" placeholder="Unit Price" />
                          <Input type="number" placeholder="Total" readOnly />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus size={14} className="mr-2" />
                    Add Item
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Subtotal</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tax (%)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Shipping</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Total</Label>
                    <Input type="number" placeholder="0.00" readOnly />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Order notes" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Internal Notes</Label>
                  <Textarea placeholder="Internal notes" rows={3} />
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
              Create PO
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PO Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Purchase Order Details</DialogTitle>
          </DialogHeader>

          {selectedPO && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="items">Items</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedPO.poNumber}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedPO.vendorName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cn("text-xs border-0", getStatusColor(selectedPO.status))}>
                        {selectedPO.status}
                      </Badge>
                      <Badge className={cn("text-xs", getPriorityColor(selectedPO.priority))}>
                        {selectedPO.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Order Date</p>
                      <p className="text-sm">{selectedPO.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Expected Date</p>
                      <p className="text-sm">{selectedPO.expectedDate}</p>
                    </div>
                  </div>

                  {selectedPO.deliveredDate && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-black/50">Delivered Date</p>
                        <p className="text-sm">{selectedPO.deliveredDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Received By</p>
                        <p className="text-sm">{selectedPO.receivedBy}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Payment Terms</p>
                      <p className="text-sm">{selectedPO.paymentTerms}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Currency</p>
                      <p className="text-sm">{selectedPO.currency}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Requested By</p>
                      <p className="text-sm">{selectedPO.requestedBy}</p>
                    </div>
                    {selectedPO.approvedBy && (
                      <div>
                        <p className="text-xs text-black/50">Approved By</p>
                        <p className="text-sm">{selectedPO.approvedBy}</p>
                        <p className="text-xs text-black/50">{selectedPO.approvedDate}</p>
                      </div>
                    )}
                  </div>

                  {selectedPO.invoiceNumber && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-black/50">Invoice #</p>
                        <p className="text-sm">{selectedPO.invoiceNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Invoice Date</p>
                        <p className="text-sm">{selectedPO.invoiceDate}</p>
                      </div>
                    </div>
                  )}

                  {selectedPO.cancellationReason && (
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-xs text-red-700">Cancellation Reason: {selectedPO.cancellationReason}</p>
                    </div>
                  )}

                  {selectedPO.notes && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">{selectedPO.notes}</p>
                    </div>
                  )}

                  {selectedPO.internalNotes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">Internal: {selectedPO.internalNotes}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedPO.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="items" className="space-y-4">
                  <div className="space-y-3">
                    {selectedPO.items.map((item) => (
                      <Card key={item.id} className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">{item.description}</p>
                              <p className="text-xs text-black/50">SKU: {item.sku}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-sm">
                            <div>
                              <p className="text-xs text-black/50">Quantity</p>
                              <p className="font-medium">{item.quantity}</p>
                            </div>
                            <div>
                              <p className="text-xs text-black/50">Unit Price</p>
                              <p className="font-medium">${item.unitPrice.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-black/50">Total</p>
                              <p className="font-medium">${item.total.toFixed(2)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="financial" className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Financial Summary</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Subtotal</span>
                          <span className="text-sm font-medium">${selectedPO.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Tax</span>
                          <span className="text-sm font-medium">${selectedPO.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Shipping</span>
                          <span className="text-sm font-medium">${selectedPO.shipping.toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total</span>
                          <span className="text-lg font-bold text-green-600">${selectedPO.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Payment Status</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Total Amount</span>
                          <span className="text-sm font-medium">${selectedPO.total.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Paid</span>
                          <span className="text-sm font-medium text-green-600">${selectedPO.paid.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Balance</span>
                          <span className="text-sm font-medium text-red-600">${selectedPO.balance.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedPO.attachments && selectedPO.attachments.length > 0 && (
                    <div>
                      <p className="text-xs font-medium mb-2">Attachments</p>
                      <div className="space-y-2">
                        {selectedPO.attachments.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 border border-[#F5EEE9] rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText size={14} className="text-blue-600" />
                              <span className="text-sm">{file}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-7">
                              <Download size={14} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedPO.history.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          {item.action === 'Created' && <Plus size={12} className="text-green-600 mt-0.5" />}
                          {item.action === 'Approved' && <CheckCircle size={12} className="text-green-600 mt-0.5" />}
                          {item.action === 'Sent' && <Send size={12} className="text-blue-600 mt-0.5" />}
                          {item.action === 'Received' && <Package size={12} className="text-purple-600 mt-0.5" />}
                          {item.action === 'Invoiced' && <FileText size={12} className="text-indigo-600 mt-0.5" />}
                          {item.action === 'Cancelled' && <AlertCircle size={12} className="text-red-600 mt-0.5" />}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
                            {item.details && <p className="text-[10px] text-black/70 mt-1">{item.details}</p>}
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
            {selectedPO?.status === 'pending' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowApproveDialog(true);
              }}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            )}
            {selectedPO?.status === 'approved' && (
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowReceiveDialog(true);
              }}>
                <Package className="mr-2 h-4 w-4" />
                Receive
              </Button>
            )}
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
                <ShoppingCart size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Create PO</TooltipContent>
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
                onClick={() => setShowHistoryDialog(true)}
              >
                <History size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">History</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PurchaseOrdersPage;