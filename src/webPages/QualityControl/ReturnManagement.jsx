// app/dashboard/return-management/page.js
'use client';

import { useState } from 'react';
import { 
  RotateCcw,
  Package,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  Calendar,
  Users,
  User,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  MoreVertical,
  Eye,
  Trash2,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Settings,
  History,
  BarChart3,
  Plus,
 
  CreditCard,
 
  DollarSign,
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

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ReturnManagementPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedReason, setSelectedReason] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showInspectDialog, setShowInspectDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [showCreditDialog, setShowCreditDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReturns, setSelectedReturns] = useState([]);

  // Sample returns data
  const returns = [
    {
      id: 'RMA-001',
      rmaNumber: 'RMA-2024-001',
      orderNumber: 'ORD-1234',
      customerName: 'John Smith',
      customerId: 'CUST-001',
      customerEmail: 'john.smith@email.com',
      customerPhone: '555-0123',
      returnDate: '2024-03-15',
      receivedDate: '2024-03-17',
      processedDate: null,
      completedDate: null,
      status: 'pending',
      type: 'customer',
      priority: 'high',
      reason: 'defective',
      reasonDetails: 'Product does not power on',
      resolution: 'pending',
      items: [
        { id: 1, sku: 'SKU-001', name: 'Premium Wireless Headphones', quantity: 1, unitPrice: 89.99, totalPrice: 89.99, condition: 'defective', inspected: false, accepted: false, restock: false },
      ],
      totalItems: 1,
      totalQuantity: 1,
      subtotal: 89.99,
      tax: 7.20,
      shipping: 0,
      totalRefund: 97.19,
      refundMethod: 'original',
      refundStatus: 'pending',
      trackingNumber: '1Z999AA10123456784',
      carrier: 'UPS',
      labels: ['RMA-001.pdf'],
      images: ['defect-photo1.jpg'],
      documents: ['receipt.pdf', 'rma-form.pdf'],
      notes: 'Customer reports product dead on arrival',
      internalNotes: 'Testing required before approval',
      tags: ['defective', 'electronics', 'urgent'],
      assignedTo: 'John Doe',
      assignedToId: 'USR-001',
      createdBy: 'Customer Service',
      createdAt: '2024-03-15 09:30',
      updatedAt: '2024-03-15 09:30',
      history: [
        { date: '2024-03-15 09:30', action: 'Created', user: 'Customer Service', details: 'RMA created' },
      ],
    },
    {
      id: 'RMA-002',
      rmaNumber: 'RMA-2024-002',
      orderNumber: 'ORD-1240',
      customerName: 'Acme Corporation',
      customerId: 'CUST-010',
      customerEmail: 'orders@acme.com',
      customerPhone: '555-0456',
      returnDate: '2024-03-14',
      receivedDate: '2024-03-16',
      processedDate: '2024-03-16',
      completedDate: null,
      status: 'approved',
      type: 'customer',
      priority: 'medium',
      reason: 'damaged',
      reasonDetails: 'Shipping damage - crushed box',
      resolution: 'replace',
      items: [
        { id: 1, sku: 'SKU-004', name: 'Ergonomic Office Chair', quantity: 2, unitPrice: 299.99, totalPrice: 599.98, condition: 'damaged', inspected: true, accepted: true, restock: false },
      ],
      totalItems: 1,
      totalQuantity: 2,
      subtotal: 599.98,
      tax: 48.00,
      shipping: 25.00,
      totalRefund: 0,
      refundMethod: 'none',
      refundStatus: 'na',
      replacementOrder: 'ORD-1290',
      trackingNumber: '1Z87654321987654321',
      carrier: 'UPS',
      images: ['damage-photo1.jpg', 'damage-photo2.jpg'],
      documents: ['shipping-label.pdf', 'damage-report.pdf'],
      notes: 'Customer requested replacement',
      internalNotes: 'Expedite replacement due to business customer',
      tags: ['damaged', 'furniture', 'replacement'],
      assignedTo: 'Jane Smith',
      assignedToId: 'USR-002',
      createdBy: 'Customer Service',
      createdAt: '2024-03-14 11:15',
      updatedAt: '2024-03-16 14:30',
      history: [
        { date: '2024-03-16 14:30', action: 'Approved', user: 'Jane Smith', details: 'Replacement approved' },
        { date: '2024-03-16 10:15', action: 'Received', user: 'Receiving', details: 'Items received' },
        { date: '2024-03-14 11:15', action: 'Created', user: 'Customer Service', details: 'RMA created' },
      ],
    },
    {
      id: 'RMA-003',
      rmaNumber: 'RMA-2024-003',
      orderNumber: 'ORD-1245',
      customerName: 'Tech Solutions Inc',
      customerId: 'CUST-015',
      customerEmail: 'purchasing@techsolutions.com',
      customerPhone: '555-0789',
      returnDate: '2024-03-13',
      receivedDate: '2024-03-15',
      processedDate: '2024-03-16',
      completedDate: '2024-03-16',
      status: 'completed',
      type: 'customer',
      priority: 'low',
      reason: 'wrong-item',
      reasonDetails: 'Received wrong color',
      resolution: 'refund',
      items: [
        { id: 1, sku: 'SKU-005', name: 'Cotton T-Shirt (White, L)', quantity: 5, unitPrice: 19.99, totalPrice: 99.95, condition: 'new', inspected: true, accepted: true, restock: true },
      ],
      totalItems: 1,
      totalQuantity: 5,
      subtotal: 99.95,
      tax: 8.00,
      shipping: 5.99,
      totalRefund: 113.94,
      refundMethod: 'original',
      refundStatus: 'completed',
      refundDate: '2024-03-16',
      trackingNumber: '94055102008290723567',
      carrier: 'USPS',
      images: [],
      documents: ['refund-receipt.pdf'],
      notes: 'Customer received wrong color, correct items shipped separately',
      internalNotes: 'Items restocked',
      tags: ['wrong-item', 'apparel', 'refunded'],
      assignedTo: 'Mike Johnson',
      assignedToId: 'USR-003',
      createdBy: 'Customer Service',
      createdAt: '2024-03-13 14:45',
      updatedAt: '2024-03-16 11:20',
      history: [
        { date: '2024-03-16 11:20', action: 'Completed', user: 'Mike Johnson', details: 'Refund processed' },
        { date: '2024-03-16 10:30', action: 'Approved', user: 'Mike Johnson', details: 'Refund approved' },
        { date: '2024-03-15 09:45', action: 'Received', user: 'Receiving', details: 'Items received' },
        { date: '2024-03-13 14:45', action: 'Created', user: 'Customer Service', details: 'RMA created' },
      ],
    },
    {
      id: 'RMA-004',
      rmaNumber: 'RMA-2024-004',
      orderNumber: 'ORD-1250',
      customerName: 'Wholesale Distributors',
      customerId: 'CUST-020',
      customerEmail: 'orders@wholesale.com',
      customerPhone: '555-0234',
      returnDate: '2024-03-12',
      receivedDate: '2024-03-14',
      processedDate: '2024-03-15',
      completedDate: null,
      status: 'inspection',
      type: 'wholesale',
      priority: 'high',
      reason: 'quality',
      reasonDetails: 'Inconsistent quality across batch',
      resolution: 'pending',
      items: [
        { id: 1, sku: 'SKU-002', name: 'Organic Protein Powder', quantity: 20, unitPrice: 42.99, totalPrice: 859.80, condition: 'defective', inspected: false, accepted: false, restock: false, batchNumber: 'BATCH-011' },
        { id: 2, sku: 'SKU-006', name: 'Canned Organic Soup', quantity: 48, unitPrice: 3.99, totalPrice: 191.52, condition: 'defective', inspected: false, accepted: false, restock: false, batchNumber: 'BATCH-009' },
      ],
      totalItems: 2,
      totalQuantity: 68,
      subtotal: 1051.32,
      tax: 84.11,
      shipping: 45.00,
      totalRefund: 0,
      refundMethod: 'pending',
      refundStatus: 'pending',
      trackingNumber: 'FRT-1250',
      carrier: 'Freight Carrier',
      documents: ['quality-report.pdf', 'batch-records.pdf'],
      notes: 'Quality control samples taken',
      internalNotes: 'Awaiting lab results',
      tags: ['quality', 'wholesale', 'investigation'],
      assignedTo: 'Quality Team',
      assignedToId: 'USR-009',
      createdBy: 'Customer Service',
      createdAt: '2024-03-12 10:30',
      updatedAt: '2024-03-15 09:20',
      history: [
        { date: '2024-03-15 09:20', action: 'Inspection Started', user: 'Quality Team', details: 'Samples sent to lab' },
        { date: '2024-03-14 13:45', action: 'Received', user: 'Receiving', details: 'Items received' },
        { date: '2024-03-12 10:30', action: 'Created', user: 'Customer Service', details: 'RMA created' },
      ],
    },
    {
      id: 'RMA-005',
      rmaNumber: 'RMA-2024-005',
      orderNumber: 'ORD-1255',
      customerName: 'Retail Store B',
      customerId: 'CUST-030',
      customerEmail: 'storeb@retailchain.com',
      customerPhone: '555-0567',
      returnDate: '2024-03-11',
      receivedDate: '2024-03-13',
      processedDate: '2024-03-14',
      completedDate: null,
      status: 'rejected',
      type: 'retail',
      priority: 'medium',
      reason: 'expired',
      reasonDetails: 'Products past expiration date',
      resolution: 'reject',
      items: [
        { id: 1, sku: 'SKU-009', name: 'Fresh Dairy Milk', quantity: 24, unitPrice: 4.99, totalPrice: 119.76, condition: 'expired', inspected: true, accepted: false, restock: false, expiryDate: '2024-03-01' },
      ],
      totalItems: 1,
      totalQuantity: 24,
      subtotal: 119.76,
      tax: 9.58,
      shipping: 0,
      totalRefund: 0,
      refundMethod: 'none',
      refundStatus: 'rejected',
      documents: ['expiry-report.pdf'],
      notes: 'Products expired before receipt',
      internalNotes: 'Rejected - return to vendor',
      tags: ['expired', 'dairy', 'rejected'],
      assignedTo: 'Quality Team',
      assignedToId: 'USR-009',
      createdBy: 'Store Manager',
      createdAt: '2024-03-11 16:20',
      updatedAt: '2024-03-14 10:45',
      history: [
        { date: '2024-03-14 10:45', action: 'Rejected', user: 'Quality Team', details: 'Products expired' },
        { date: '2024-03-13 11:30', action: 'Received', user: 'Receiving', details: 'Items received' },
        { date: '2024-03-11 16:20', action: 'Created', user: 'Store Manager', details: 'RMA created' },
      ],
    },
    {
      id: 'RMA-006',
      rmaNumber: 'RMA-2024-006',
      orderNumber: 'ORD-1260',
      customerName: 'Healthcare Supply Co',
      customerId: 'CUST-040',
      customerEmail: 'orders@healthcaresupply.com',
      customerPhone: '555-0890',
      returnDate: '2024-03-10',
      receivedDate: '2024-03-12',
      processedDate: '2024-03-13',
      completedDate: '2024-03-13',
      status: 'completed',
      type: 'business',
      priority: 'high',
      reason: 'recall',
      reasonDetails: 'Manufacturer recall - lot #BATCH-015',
      resolution: 'credit',
      items: [
        { id: 1, sku: 'SKU-015', name: 'Medical Gloves', quantity: 100, unitPrice: 12.99, totalPrice: 1299.00, condition: 'recalled', inspected: true, accepted: false, restock: false, batchNumber: 'BATCH-015' },
      ],
      totalItems: 1,
      totalQuantity: 100,
      subtotal: 1299.00,
      tax: 103.92,
      shipping: 0,
      totalRefund: 0,
      refundMethod: 'credit',
      refundStatus: 'completed',
      creditAmount: 1299.00,
      creditNoteNumber: 'CN-2024-001',
      documents: ['recall-notice.pdf', 'credit-note.pdf'],
      notes: 'Recall initiated by manufacturer',
      internalNotes: 'Full credit issued',
      tags: ['recall', 'medical', 'credit'],
      assignedTo: 'Customer Service',
      assignedToId: 'USR-001',
      createdBy: 'Quality Team',
      createdAt: '2024-03-10 08:45',
      updatedAt: '2024-03-13 15:30',
      history: [
        { date: '2024-03-13 15:30', action: 'Completed', user: 'Customer Service', details: 'Credit issued' },
        { date: '2024-03-13 10:15', action: 'Approved', user: 'Quality Team', details: 'Recall confirmed' },
        { date: '2024-03-12 14:20', action: 'Received', user: 'Receiving', details: 'Items received' },
        { date: '2024-03-10 08:45', action: 'Created', user: 'Quality Team', details: 'RMA created' },
      ],
    },
    {
      id: 'RMA-007',
      rmaNumber: 'RMA-2024-007',
      orderNumber: 'ORD-1265',
      customerName: 'Construction Supply Co',
      customerId: 'CUST-050',
      customerEmail: 'orders@constructionsupply.com',
      customerPhone: '555-0127',
      returnDate: '2024-03-09',
      receivedDate: null,
      processedDate: null,
      completedDate: null,
      status: 'pending-approval',
      type: 'business',
      priority: 'medium',
      reason: 'damaged',
      reasonDetails: 'Tools damaged in transit',
      resolution: 'pending',
      items: [
        { id: 1, sku: 'SKU-016', name: 'Power Drill Set', quantity: 3, unitPrice: 149.99, totalPrice: 449.97, condition: 'damaged', inspected: false, accepted: false, restock: false },
        { id: 2, sku: 'SKU-017', name: 'Circular Saw', quantity: 2, unitPrice: 189.99, totalPrice: 379.98, condition: 'damaged', inspected: false, accepted: false, restock: false },
      ],
      totalItems: 2,
      totalQuantity: 5,
      subtotal: 829.95,
      tax: 66.40,
      shipping: 35.00,
      totalRefund: 0,
      refundMethod: 'pending',
      refundStatus: 'pending',
      images: ['damage-photo3.jpg', 'damage-photo4.jpg'],
      notes: 'Customer sent photos of damaged items',
      internalNotes: 'Awaiting manager approval',
      tags: ['damaged', 'tools', 'pending'],
      assignedTo: null,
      assignedToId: null,
      createdBy: 'Customer Service',
      createdAt: '2024-03-09 13:20',
      updatedAt: '2024-03-09 13:20',
      history: [
        { date: '2024-03-09 13:20', action: 'Created', user: 'Customer Service', details: 'RMA created' },
      ],
    },
    {
      id: 'RMA-008',
      rmaNumber: 'RMA-2024-008',
      orderNumber: 'ORD-1270',
      customerName: 'Online Customer - Jane Doe',
      customerId: 'CUST-060',
      customerEmail: 'jane.doe@email.com',
      customerPhone: '555-0345',
      returnDate: '2024-03-08',
      receivedDate: '2024-03-10',
      processedDate: '2024-03-11',
      completedDate: '2024-03-11',
      status: 'completed',
      type: 'customer',
      priority: 'low',
      reason: 'changed-mind',
      reasonDetails: 'No longer needed',
      resolution: 'refund',
      items: [
        { id: 1, sku: 'SKU-012', name: 'Book - Inventory Management', quantity: 1, unitPrice: 45.99, totalPrice: 45.99, condition: 'new', inspected: true, accepted: true, restock: true },
      ],
      totalItems: 1,
      totalQuantity: 1,
      subtotal: 45.99,
      tax: 3.68,
      shipping: 0,
      totalRefund: 49.67,
      refundMethod: 'original',
      refundStatus: 'completed',
      refundDate: '2024-03-11',
      trackingNumber: '94055102008290723568',
      carrier: 'USPS',
      documents: ['refund-receipt.pdf'],
      notes: 'Customer changed mind, item returned in new condition',
      internalNotes: 'Restocked',
      tags: ['changed-mind', 'book', 'refunded'],
      assignedTo: 'Mike Johnson',
      assignedToId: 'USR-003',
      createdBy: 'Customer Service',
      createdAt: '2024-03-08 15:45',
      updatedAt: '2024-03-11 14:20',
      history: [
        { date: '2024-03-11 14:20', action: 'Completed', user: 'Mike Johnson', details: 'Refund processed' },
        { date: '2024-03-11 10:30', action: 'Approved', user: 'Mike Johnson', details: 'Refund approved' },
        { date: '2024-03-10 09:45', action: 'Received', user: 'Receiving', details: 'Items received' },
        { date: '2024-03-08 15:45', action: 'Created', user: 'Customer Service', details: 'RMA created' },
      ],
    },
    {
      id: 'RMA-009',
      rmaNumber: 'RMA-2024-009',
      orderNumber: 'ORD-1275',
      customerName: 'Electronics Retailer',
      customerId: 'CUST-070',
      customerEmail: 'returns@electronicsretailer.com',
      customerPhone: '555-0678',
      returnDate: '2024-03-07',
      receivedDate: '2024-03-09',
      processedDate: '2024-03-10',
      completedDate: null,
      status: 'approved',
      type: 'retail',
      priority: 'high',
      reason: 'defective',
      reasonDetails: 'Multiple units with same defect',
      resolution: 'credit',
      items: [
        { id: 1, sku: 'SKU-007', name: 'Smart LED TV 55"', quantity: 5, unitPrice: 599.99, totalPrice: 2999.95, condition: 'defective', inspected: true, accepted: true, restock: false, defectDetails: 'Power supply failure' },
      ],
      totalItems: 1,
      totalQuantity: 5,
      subtotal: 2999.95,
      tax: 240.00,
      shipping: 0,
      totalRefund: 0,
      refundMethod: 'credit',
      refundStatus: 'pending',
      creditAmount: 2999.95,
      creditNoteNumber: 'CN-2024-002',
      documents: ['defect-analysis.pdf', 'credit-memo.pdf'],
      notes: 'Known manufacturing defect',
      internalNotes: 'Credit approved - charge back to vendor',
      tags: ['defective', 'electronics', 'credit'],
      assignedTo: 'Quality Team',
      assignedToId: 'USR-009',
      createdBy: 'Customer Service',
      createdAt: '2024-03-07 11:30',
      updatedAt: '2024-03-10 16:15',
      history: [
        { date: '2024-03-10 16:15', action: 'Approved', user: 'Quality Team', details: 'Credit approved' },
        { date: '2024-03-09 13:20', action: 'Received', user: 'Receiving', details: 'Items received' },
        { date: '2024-03-07 11:30', action: 'Created', user: 'Customer Service', details: 'RMA created' },
      ],
    },
    {
      id: 'RMA-010',
      rmaNumber: 'RMA-2024-010',
      orderNumber: 'ORD-1280',
      customerName: 'Grocery Chain',
      customerId: 'CUST-080',
      customerEmail: 'returns@grocerychain.com',
      customerPhone: '555-0789',
      returnDate: '2024-03-06',
      receivedDate: '2024-03-08',
      processedDate: '2024-03-08',
      completedDate: '2024-03-08',
      status: 'completed',
      type: 'retail',
      priority: 'medium',
      reason: 'short-dated',
      reasonDetails: 'Products received with short shelf life',
      resolution: 'credit',
      items: [
        { id: 1, sku: 'SKU-009', name: 'Fresh Dairy Milk', quantity: 50, unitPrice: 4.99, totalPrice: 249.50, condition: 'short-dated', inspected: true, accepted: true, restock: false, expiryDate: '2024-03-15' },
        { id: 2, sku: 'SKU-011', name: 'Greek Yogurt', quantity: 40, unitPrice: 3.99, totalPrice: 159.60, condition: 'short-dated', inspected: true, accepted: true, restock: false, expiryDate: '2024-03-14' },
      ],
      totalItems: 2,
      totalQuantity: 90,
      subtotal: 409.10,
      tax: 32.73,
      shipping: 0,
      totalRefund: 0,
      refundMethod: 'credit',
      refundStatus: 'completed',
      creditAmount: 409.10,
      creditNoteNumber: 'CN-2024-003',
      documents: ['credit-note.pdf'],
      notes: 'Products had less than 7 days shelf life',
      internalTags: ['short-dated', 'grocery', 'credit'],
      assignedTo: 'Customer Service',
      assignedToId: 'USR-001',
      createdBy: 'Store Manager',
      createdAt: '2024-03-06 09:15',
      updatedAt: '2024-03-08 14:30',
      history: [
        { date: '2024-03-08 14:30', action: 'Completed', user: 'Customer Service', details: 'Credit issued' },
        { date: '2024-03-08 10:45', action: 'Approved', user: 'Customer Service', details: 'Credit approved' },
        { date: '2024-03-08 09:20', action: 'Received', user: 'Receiving', details: 'Items received' },
        { date: '2024-03-06 09:15', action: 'Created', user: 'Store Manager', details: 'RMA created' },
      ],
    },
  ];

  // Return types
  const returnTypes = [
    { id: 'all', name: 'All Types', count: returns.length },
    { id: 'customer', name: 'Customer', count: returns.filter(r => r.type === 'customer').length },
    { id: 'wholesale', name: 'Wholesale', count: returns.filter(r => r.type === 'wholesale').length },
    { id: 'retail', name: 'Retail', count: returns.filter(r => r.type === 'retail').length },
    { id: 'business', name: 'Business', count: returns.filter(r => r.type === 'business').length },
  ];

  // Return reasons
  const returnReasons = [
    { id: 'defective', name: 'Defective', count: returns.filter(r => r.reason === 'defective').length },
    { id: 'damaged', name: 'Damaged', count: returns.filter(r => r.reason === 'damaged').length },
    { id: 'wrong-item', name: 'Wrong Item', count: returns.filter(r => r.reason === 'wrong-item').length },
    { id: 'quality', name: 'Quality', count: returns.filter(r => r.reason === 'quality').length },
    { id: 'expired', name: 'Expired', count: returns.filter(r => r.reason === 'expired').length },
    { id: 'recall', name: 'Recall', count: returns.filter(r => r.reason === 'recall').length },
    { id: 'changed-mind', name: 'Changed Mind', count: returns.filter(r => r.reason === 'changed-mind').length },
    { id: 'short-dated', name: 'Short Dated', count: returns.filter(r => r.reason === 'short-dated').length },
  ];

  // Status configuration
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    'pending-approval': { label: 'Pending Approval', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertTriangle },
    approved: { label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    inspection: { label: 'In Inspection', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Eye },
    completed: { label: 'Completed', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: CheckCircle },
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    critical: { label: 'Critical', color: 'bg-red-100 text-red-700' },
  };

  const resolutionConfig = {
    pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700' },
    refund: { label: 'Refund', color: 'bg-blue-100 text-blue-700', icon: DollarSign },
    replace: { label: 'Replace', color: 'bg-green-100 text-green-700', icon: RotateCcw },
    credit: { label: 'Credit', color: 'bg-purple-100 text-purple-700', icon: CreditCard },
    reject: { label: 'Reject', color: 'bg-red-100 text-red-700', icon: Ban },
  };

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

  const getResolutionIcon = (resolution) => {
    const config = resolutionConfig[resolution];
    const Icon = config?.icon || Clock;
    return Icon;
  };

  const getResolutionColor = (resolution) => {
    return resolutionConfig[resolution]?.color || 'bg-gray-100 text-gray-700';
  };

  const getReasonIcon = (reason) => {
    switch(reason) {
      case 'defective': return <AlertCircle size={14} className="text-red-600" />;
      case 'damaged': return <AlertTriangle size={14} className="text-orange-600" />;
      case 'wrong-item': return <Package size={14} className="text-purple-600" />;
      case 'quality': return <CheckCircle size={14} className="text-yellow-600" />;
      case 'expired': return <Clock size={14} className="text-gray-600" />;
      case 'recall': return <AlertTriangle size={14} className="text-red-600" />;
      case 'changed-mind': return <User size={14} className="text-blue-600" />;
      case 'short-dated': return <Calendar size={14} className="text-orange-600" />;
      default: return <Package size={14} className="text-gray-600" />;
    }
  };

  const filteredReturns = returns.filter(ret => {
    const matchesStatus = selectedStatus === 'all' || ret.status === selectedStatus;
    const matchesType = selectedType === 'all' || ret.type === selectedType;
    const matchesReason = selectedReason === 'all' || ret.reason === selectedReason;
    const matchesCustomer = selectedCustomer === 'all' || ret.customerName === selectedCustomer;
    const matchesSearch = ret.rmaNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ret.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ret.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ret.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ret.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesType && matchesReason && matchesCustomer && matchesSearch;
  });

  const stats = {
    total: returns.length,
    pending: returns.filter(r => r.status === 'pending' || r.status === 'pending-approval').length,
    approved: returns.filter(r => r.status === 'approved').length,
    completed: returns.filter(r => r.status === 'completed').length,
    inspection: returns.filter(r => r.status === 'inspection').length,
    totalItems: returns.reduce((sum, r) => sum + r.totalItems, 0),
    totalQuantity: returns.reduce((sum, r) => sum + r.totalQuantity, 0),
    totalValue: returns.reduce((sum, r) => sum + r.subtotal, 0),
  };

  const handleSelectAll = () => {
    if (selectedReturns.length === filteredReturns.length) {
      setSelectedReturns([]);
    } else {
      setSelectedReturns(filteredReturns.map(r => r.id));
    }
  };

  const handleSelectReturn = (id) => {
    if (selectedReturns.includes(id)) {
      setSelectedReturns(selectedReturns.filter(r => r !== id));
    } else {
      setSelectedReturns([...selectedReturns, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Return Management</h1>
            <p className="text-black/50 mt-1">Manage RMA requests, returns, and refunds</p>
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
              Create RMA
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Returns</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <RotateCcw size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Completed</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.completed}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <CheckCircle size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">In Inspection</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.inspection}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Eye size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Items</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalItems}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Package size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Value</p>
                  <p className="text-xl font-bold text-green-600 mt-1">${stats.totalValue.toFixed(2)}</p>
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
              placeholder="Search by RMA #, order #, customer, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[140px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="pending-approval">Pending Approval</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="inspection">In Inspection</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {returnTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name} ({type.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedReason} onValueChange={setSelectedReason}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reasons</SelectItem>
              {returnReasons.map(reason => (
                <SelectItem key={reason.id} value={reason.id}>
                  {reason.name} ({reason.count})
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
      {selectedReturns.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedReturns.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedReturns([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <CheckCircle size={14} className="mr-2" />
              Approve
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Eye size={14} className="mr-2" />
              Inspect
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <PrinterIcon size={14} className="mr-2" />
              Print Labels
            </Button>
          </div>
        </div>
      )}

      {/* Returns Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredReturns.map((ret) => {
            const StatusIcon = statusConfig[ret.status]?.icon || Clock;
            const ResolutionIcon = getResolutionIcon(ret.resolution);
            
            return (
              <Card key={ret.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(ret.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {ret.status}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(ret.priority))}>
                            {ret.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{ret.rmaNumber}</h3>
                        <p className="text-xs text-black/50 mt-1">Order: {ret.orderNumber}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedReturn(ret);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {ret.status === 'pending' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedReturn(ret);
                              setShowApproveDialog(true);
                            }}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {ret.status === 'approved' && (
                            <>
                              <DropdownMenuItem onClick={() => {
                                setSelectedReturn(ret);
                                setShowInspectDialog(true);
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                Inspect
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedReturn(ret);
                                setShowRefundDialog(true);
                              }}>
                                <DollarSign className="mr-2 h-4 w-4" />
                                Process Refund
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedReturn(ret);
                                setShowReplaceDialog(true);
                              }}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Create Replacement
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedReturn(ret);
                                setShowCreditDialog(true);
                              }}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Issue Credit
                              </DropdownMenuItem>
                            </>
                          )}
                          {ret.status === 'inspection' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedReturn(ret);
                              setShowInspectDialog(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              Continue Inspection
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <PrinterIcon className="mr-2 h-4 w-4" />
                            Print Label
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
                    {/* Customer */}
                    <div className="flex items-center gap-2 mb-2">
                      <User size={12} className="text-blue-600" />
                      <span className="text-sm font-medium">{ret.customerName}</span>
                    </div>

                    {/* Reason & Resolution */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9] flex items-center gap-1">
                        {getReasonIcon(ret.reason)}
                        {ret.reason}
                      </Badge>
                      <Badge className={cn("text-[10px]", getResolutionColor(ret.resolution))}>
                        <ResolutionIcon size={10} className="mr-1" />
                        {ret.resolution}
                      </Badge>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={10} className="text-black/30" />
                        <span className="text-[10px] text-black/70">Request: {ret.returnDate}</span>
                      </div>
                      {ret.receivedDate && (
                        <div className="flex items-center gap-1">
                          <Package size={10} className="text-black/30" />
                          <span className="text-[10px] text-black/70">Received: {ret.receivedDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Items Summary */}
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[8px] text-black/50">Items</p>
                        <p className="text-xs font-bold">{ret.totalItems}</p>
                      </div>
                      <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[8px] text-black/50">Quantity</p>
                        <p className="text-xs font-bold">{ret.totalQuantity}</p>
                      </div>
                      <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[8px] text-black/50">Value</p>
                        <p className="text-xs font-bold text-green-600">${ret.subtotal}</p>
                      </div>
                    </div>

                    {/* Tracking */}
                    {ret.trackingNumber && (
                      <div className="mb-2 p-1 bg-[#F5EEE9]/50 rounded">
                        <p className="text-[8px] text-black/50">Tracking</p>
                        <p className="text-[10px] font-mono truncate">{ret.trackingNumber}</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {ret?.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                      <span>Assigned: {ret.assignedTo || 'Unassigned'}</span>
                      {ret.documents && ret.documents.length > 0 && (
                        <div className="flex items-center gap-1">
                          <FileText size={8} />
                          <span>{ret.documents.length}</span>
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
                      checked={selectedReturns.length === filteredReturns.length && filteredReturns.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">RMA #</TableHead>
                  <TableHead className="text-black/50">Order #</TableHead>
                  <TableHead className="text-black/50">Customer</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Reason</TableHead>
                  <TableHead className="text-black/50">Resolution</TableHead>
                  <TableHead className="text-black/50 text-right">Items</TableHead>
                  <TableHead className="text-black/50 text-right">Value</TableHead>
                  <TableHead className="text-black/50">Request Date</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturns.map((ret) => (
                  <TableRow key={ret.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedReturns.includes(ret.id)}
                        onCheckedChange={() => handleSelectReturn(ret.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs">{ret.rmaNumber}</TableCell>
                    <TableCell className="font-mono text-xs">{ret.orderNumber}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{ret.customerName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {ret.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(ret.status))}>
                        {ret.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(ret.priority))}>
                        {ret.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{ret.reason}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getResolutionColor(ret.resolution))}>
                        {ret.resolution}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{ret.totalItems}</TableCell>
                    <TableCell className="text-right">${ret.subtotal.toFixed(2)}</TableCell>
                    <TableCell className="text-xs">{ret.returnDate}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedReturn(ret);
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
                Showing {filteredReturns.length} of {returns.length} returns
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

      {/* Create RMA Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create RMA</DialogTitle>
            <DialogDescription>
              Create a new return merchandise authorization
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="customer">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="customer">Customer Info</TabsTrigger>
                <TabsTrigger value="items">Return Items</TabsTrigger>
                <TabsTrigger value="details">Return Details</TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Order Number</Label>
                    <Input placeholder="e.g., ORD-1234" />
                  </div>
                  <div className="space-y-2">
                    <Label>Customer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="jane">Jane Doe</SelectItem>
                        <SelectItem value="acme">Acme Corporation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="customer@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="555-0123" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Return Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="items" className="space-y-4">
                <div className="space-y-3">
                  {[1].map((i) => (
                    <Card key={i} className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select SKU" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SKU-001">SKU-001 - Headphones</SelectItem>
                              <SelectItem value="SKU-002">SKU-002 - Protein Powder</SelectItem>
                              <SelectItem value="SKU-003">SKU-003 - Lubricant</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input type="number" placeholder="Quantity" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Reason" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="defective">Defective</SelectItem>
                              <SelectItem value="damaged">Damaged</SelectItem>
                              <SelectItem value="wrong-item">Wrong Item</SelectItem>
                              <SelectItem value="quality">Quality</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="used">Used</SelectItem>
                              <SelectItem value="defective">Defective</SelectItem>
                              <SelectItem value="damaged">Damaged</SelectItem>
                            </SelectContent>
                          </Select>
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
                    <Label>Reason</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="defective">Defective</SelectItem>
                        <SelectItem value="damaged">Damaged</SelectItem>
                        <SelectItem value="wrong-item">Wrong Item</SelectItem>
                        <SelectItem value="quality">Quality</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                        <SelectItem value="recall">Recall</SelectItem>
                        <SelectItem value="changed-mind">Changed Mind</SelectItem>
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
                  <Label>Reason Details</Label>
                  <Textarea placeholder="Provide details about the return reason" rows={2} />
                </div>

                <div className="space-y-2">
                  <Label>Resolution Requested</Label>
                  <RadioGroup defaultValue="refund">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="refund" id="refund" />
                        <Label htmlFor="refund">Refund</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="replace" id="replace" />
                        <Label htmlFor="replace">Replace</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit">Store Credit</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes" rows={3} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create RMA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Return Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Return Details</DialogTitle>
          </DialogHeader>

          {selectedReturn && (
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
                      <h3 className="text-lg font-semibold">{selectedReturn.rmaNumber}</h3>
                      <p className="text-sm text-black/50 mt-1">Order: {selectedReturn.orderNumber}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cn("text-xs border-0", getStatusColor(selectedReturn.status))}>
                        {selectedReturn.status}
                      </Badge>
                      <Badge className={cn("text-xs", getPriorityColor(selectedReturn.priority))}>
                        {selectedReturn.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Customer</p>
                      <p className="text-sm font-medium">{selectedReturn.customerName}</p>
                      <p className="text-xs text-black/50">{selectedReturn.customerEmail}</p>
                      <p className="text-xs text-black/50">{selectedReturn.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Type</p>
                      <p className="text-sm font-medium capitalize">{selectedReturn.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Return Date</p>
                      <p className="text-sm">{selectedReturn.returnDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Received Date</p>
                      <p className="text-sm">{selectedReturn.receivedDate || 'Not received'}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs font-medium mb-1">Reason</p>
                    <div className="flex items-center gap-2">
                      <Badge className="capitalize">{selectedReturn.reason}</Badge>
                      <span className="text-sm">{selectedReturn.reasonDetails}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Resolution</p>
                    <Badge className={cn("text-xs mt-1", getResolutionColor(selectedReturn.resolution))}>
                      {selectedReturn.resolution}
                    </Badge>
                  </div>

                  {selectedReturn.trackingNumber && (
                    <div>
                      <p className="text-xs text-black/50">Tracking</p>
                      <p className="text-sm font-mono">{selectedReturn.trackingNumber}</p>
                      <p className="text-xs text-black/50">Carrier: {selectedReturn.carrier}</p>
                    </div>
                  )}

                  {selectedReturn.notes && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">{selectedReturn.notes}</p>
                    </div>
                  )}

                  {selectedReturn.internalNotes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">Internal: {selectedReturn.internalNotes}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedReturn.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-black/50">Assigned To</p>
                      <p className="text-sm">{selectedReturn.assignedTo || 'Unassigned'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Created By</p>
                      <p className="text-sm">{selectedReturn.createdBy}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="items" className="space-y-4">
                  <div className="space-y-3">
                    {selectedReturn.items.map((item) => (
                      <Card key={item.id} className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-black/50">SKU: {item.sku}</p>
                            </div>
                            <Badge className={cn(
                              "text-xs",
                              item.condition === 'new' && 'bg-green-100 text-green-700',
                              item.condition === 'used' && 'bg-yellow-100 text-yellow-700',
                              item.condition === 'defective' && 'bg-red-100 text-red-700',
                              item.condition === 'damaged' && 'bg-orange-100 text-orange-700',
                            )}>
                              {item.condition}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <p className="text-xs text-black/50">Quantity</p>
                              <p className="font-medium">{item.quantity}</p>
                            </div>
                            <div>
                              <p className="text-xs text-black/50">Unit Price</p>
                              <p className="font-medium">${item.unitPrice}</p>
                            </div>
                            <div>
                              <p className="text-xs text-black/50">Total</p>
                              <p className="font-medium">${item.totalPrice}</p>
                            </div>
                          </div>
                          {item.batchNumber && (
                            <p className="text-xs text-black/50 mt-2">Batch: {item.batchNumber}</p>
                          )}
                          {item.defectDetails && (
                            <p className="text-xs text-red-600 mt-2">{item.defectDetails}</p>
                          )}
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
                          <span className="text-sm font-medium">${selectedReturn.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Tax</span>
                          <span className="text-sm font-medium">${selectedReturn.tax?.toFixed(2) || '0.00'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Shipping</span>
                          <span className="text-sm font-medium">${selectedReturn.shipping?.toFixed(2) || '0.00'}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total Refund</span>
                          <span className="text-lg font-bold text-green-600">${selectedReturn.totalRefund?.toFixed(2) || '0.00'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Refund Details</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Method</span>
                          <span className="text-sm font-medium capitalize">{selectedReturn.refundMethod}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Status</span>
                          <Badge className={cn(
                            "text-xs",
                            selectedReturn.refundStatus === 'completed' && 'bg-green-100 text-green-700',
                            selectedReturn.refundStatus === 'pending' && 'bg-yellow-100 text-yellow-700',
                            selectedReturn.refundStatus === 'rejected' && 'bg-red-100 text-red-700',
                          )}>
                            {selectedReturn.refundStatus}
                          </Badge>
                        </div>
                        {selectedReturn.refundDate && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-black/50">Date</span>
                            <span className="text-sm">{selectedReturn.refundDate}</span>
                          </div>
                        )}
                        {selectedReturn.creditNoteNumber && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-black/50">Credit Note</span>
                            <span className="text-sm font-mono">{selectedReturn.creditNoteNumber}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {selectedReturn.documents && selectedReturn.documents.length > 0 && (
                    <div>
                      <p className="text-xs font-medium mb-2">Documents</p>
                      <div className="space-y-2">
                        {selectedReturn.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 border border-[#F5EEE9] rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText size={14} className="text-blue-600" />
                              <span className="text-sm">{doc}</span>
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
                      {selectedReturn.history.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          {item.action === 'Created' && <Plus size={12} className="text-green-600 mt-0.5" />}
                          {item.action === 'Approved' && <CheckCircle size={12} className="text-green-600 mt-0.5" />}
                          {item.action === 'Rejected' && <AlertCircle size={12} className="text-red-600 mt-0.5" />}
                          {item.action === 'Received' && <Package size={12} className="text-blue-600 mt-0.5" />}
                          {item.action === 'Completed' && <CheckCircle size={12} className="text-blue-600 mt-0.5" />}
                          {item.action === 'Inspection Started' && <Eye size={12} className="text-purple-600 mt-0.5" />}
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
            {selectedReturn?.status === 'approved' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowRefundDialog(true);
              }}>
                <DollarSign className="mr-2 h-4 w-4" />
                Process Refund
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
                <RotateCcw size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Create RMA</TooltipContent>
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

export default ReturnManagementPage;