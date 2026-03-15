// app/dashboard/rma-processing/page.js
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
    X,
    MoreVertical,
    Eye,
    Trash2,
    FileSpreadsheet,
    FileJson,
    File,
    Printer as PrinterIcon,
    Settings,
    BarChart3,
    Activity,
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
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const RMAProcessingPage = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [selectedRMA, setSelectedRMA] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedReason, setSelectedReason] = useState('all');
    const [selectedProcessor, setSelectedProcessor] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedQueue, setSelectedQueue] = useState('all');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [showProcessDialog, setShowProcessDialog] = useState(false);
    const [showInspectDialog, setShowInspectDialog] = useState(false);
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [showRefundDialog, setShowRefundDialog] = useState(false);
    const [showReplaceDialog, setShowReplaceDialog] = useState(false);
    const [showCreditDialog, setShowCreditDialog] = useState(false);
    const [showLabelDialog, setShowLabelDialog] = useState(false);
    const [showReceiptDialog, setShowReceiptDialog] = useState(false);
    const [showExportDialog, setShowExportDialog] = useState(false);
    const [showReportDialog, setShowReportDialog] = useState(false);
    const [showHistoryDialog, setShowHistoryDialog] = useState(false);
    const [showSettingsDialog, setShowSettingsDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRMAs, setSelectedRMAs] = useState([]);

    // Sample RMA data
    const rmas = [
        {
            id: 'RMA-001',
            rmaNumber: 'RMA-2024-001',
            orderNumber: 'ORD-1234',
            customerName: 'John Smith',
            customerId: 'CUST-001',
            customerEmail: 'john.smith@email.com',
            customerPhone: '555-0123',
            requestDate: '2024-03-15',
            receivedDate: '2024-03-17',
            processedDate: null,
            completedDate: null,
            status: 'pending',
            type: 'customer',
            priority: 'high',
            reason: 'defective',
            reasonDetails: 'Product does not power on',
            resolution: 'pending',
            processor: null,
            processorId: null,
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
            documents: ['rma-form.pdf'],
            images: ['defect-photo1.jpg'],
            notes: 'Customer reports product dead on arrival',
            internalNotes: 'Testing required before approval',
            tags: ['defective', 'electronics', 'urgent'],
            queue: 'inspection',
            sla: 48,
            slaRemaining: 32,
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
            requestDate: '2024-03-14',
            receivedDate: '2024-03-16',
            processedDate: '2024-03-16',
            completedDate: null,
            status: 'processing',
            type: 'customer',
            priority: 'medium',
            reason: 'damaged',
            reasonDetails: 'Shipping damage - crushed box',
            resolution: 'replace',
            processor: 'Jane Smith',
            processorId: 'USR-002',
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
            documents: ['damage-report.pdf'],
            images: ['damage-photo1.jpg', 'damage-photo2.jpg'],
            notes: 'Customer requested replacement',
            internalNotes: 'Replacement order created',
            tags: ['damaged', 'furniture', 'replacement'],
            queue: 'processing',
            sla: 48,
            slaRemaining: 24,
            history: [
                { date: '2024-03-16 14:30', action: 'Processing', user: 'Jane Smith', details: 'Replacement order created' },
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
            requestDate: '2024-03-13',
            receivedDate: '2024-03-15',
            processedDate: '2024-03-16',
            completedDate: '2024-03-16',
            status: 'completed',
            type: 'customer',
            priority: 'low',
            reason: 'wrong-item',
            reasonDetails: 'Received wrong color',
            resolution: 'refund',
            processor: 'Mike Johnson',
            processorId: 'USR-003',
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
            documents: ['refund-receipt.pdf'],
            tags: ['wrong-item', 'apparel', 'refunded'],
            queue: 'completed',
            sla: 48,
            slaRemaining: 0,
            history: [
                { date: '2024-03-16 11:20', action: 'Completed', user: 'Mike Johnson', details: 'Refund processed' },
                { date: '2024-03-16 10:30', action: 'Processing', user: 'Mike Johnson', details: 'Refund approved' },
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
            requestDate: '2024-03-12',
            receivedDate: '2024-03-14',
            processedDate: null,
            completedDate: null,
            status: 'inspection',
            type: 'wholesale',
            priority: 'high',
            reason: 'quality',
            reasonDetails: 'Inconsistent quality across batch',
            resolution: 'pending',
            processor: 'Quality Team',
            processorId: 'USR-009',
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
            documents: ['quality-report.pdf'],
            notes: 'Quality control samples taken',
            internalNotes: 'Awaiting lab results',
            tags: ['quality', 'wholesale', 'investigation'],
            queue: 'inspection',
            sla: 72,
            slaRemaining: 48,
            history: [
                { date: '2024-03-15 09:20', action: 'Inspection', user: 'Quality Team', details: 'Samples sent to lab' },
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
            requestDate: '2024-03-11',
            receivedDate: '2024-03-13',
            processedDate: '2024-03-14',
            completedDate: null,
            status: 'rejected',
            type: 'retail',
            priority: 'medium',
            reason: 'expired',
            reasonDetails: 'Products past expiration date',
            resolution: 'reject',
            processor: 'Quality Team',
            processorId: 'USR-009',
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
            documents: ['rejection-notice.pdf'],
            notes: 'Products expired before receipt',
            internalNotes: 'Rejected - return to vendor',
            tags: ['expired', 'rejected'],
            queue: 'completed',
            sla: 48,
            slaRemaining: 0,
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
            requestDate: '2024-03-10',
            receivedDate: '2024-03-12',
            processedDate: '2024-03-13',
            completedDate: '2024-03-13',
            status: 'completed',
            type: 'business',
            priority: 'high',
            reason: 'recall',
            reasonDetails: 'Manufacturer recall - lot #BATCH-015',
            resolution: 'credit',
            processor: 'Customer Service',
            processorId: 'USR-001',
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
            documents: ['credit-note.pdf'],
            tags: ['recall', 'medical', 'credit'],
            queue: 'completed',
            sla: 48,
            slaRemaining: 0,
            history: [
                { date: '2024-03-13 15:30', action: 'Completed', user: 'Customer Service', details: 'Credit issued' },
                { date: '2024-03-13 10:15', action: 'Processing', user: 'Customer Service', details: 'Credit approved' },
                { date: '2024-03-12 14:20', action: 'Received', user: 'Receiving', details: 'Items received' },
                { date: '2024-03-10 08:45', action: 'Created', user: 'Customer Service', details: 'RMA created' },
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
            requestDate: '2024-03-09',
            receivedDate: null,
            processedDate: null,
            completedDate: null,
            status: 'pending-approval',
            type: 'business',
            priority: 'medium',
            reason: 'damaged',
            reasonDetails: 'Tools damaged in transit',
            resolution: 'pending',
            processor: null,
            processorId: null,
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
            queue: 'approval',
            sla: 48,
            slaRemaining: 24,
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
            requestDate: '2024-03-08',
            receivedDate: '2024-03-10',
            processedDate: '2024-03-11',
            completedDate: '2024-03-11',
            status: 'completed',
            type: 'customer',
            priority: 'low',
            reason: 'changed-mind',
            reasonDetails: 'No longer needed',
            resolution: 'refund',
            processor: 'Mike Johnson',
            processorId: 'USR-003',
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
            documents: ['refund-receipt.pdf'],
            tags: ['changed-mind', 'refunded'],
            queue: 'completed',
            sla: 48,
            slaRemaining: 0,
            history: [
                { date: '2024-03-11 14:20', action: 'Completed', user: 'Mike Johnson', details: 'Refund processed' },
                { date: '2024-03-11 10:30', action: 'Processing', user: 'Mike Johnson', details: 'Refund approved' },
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
            requestDate: '2024-03-07',
            receivedDate: '2024-03-09',
            processedDate: '2024-03-10',
            completedDate: null,
            status: 'processing',
            type: 'retail',
            priority: 'high',
            reason: 'defective',
            reasonDetails: 'Multiple units with same defect',
            resolution: 'credit',
            processor: 'Quality Team',
            processorId: 'USR-009',
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
            documents: ['credit-memo.pdf'],
            notes: 'Known manufacturing defect',
            internalNotes: 'Credit approved - charge back to vendor',
            tags: ['defective', 'electronics', 'credit'],
            queue: 'processing',
            sla: 48,
            slaRemaining: 12,
            history: [
                { date: '2024-03-10 16:15', action: 'Processing', user: 'Quality Team', details: 'Credit approved' },
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
            requestDate: '2024-03-06',
            receivedDate: '2024-03-08',
            processedDate: '2024-03-08',
            completedDate: '2024-03-08',
            status: 'completed',
            type: 'retail',
            priority: 'medium',
            reason: 'short-dated',
            reasonDetails: 'Products received with short shelf life',
            resolution: 'credit',
            processor: 'Customer Service',
            processorId: 'USR-001',
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
            tags: ['short-dated', 'grocery', 'credit'],
            queue: 'completed',
            sla: 48,
            slaRemaining: 0,
            history: [
                { date: '2024-03-08 14:30', action: 'Completed', user: 'Customer Service', details: 'Credit issued' },
                { date: '2024-03-08 10:45', action: 'Processing', user: 'Customer Service', details: 'Credit approved' },
                { date: '2024-03-08 09:20', action: 'Received', user: 'Receiving', details: 'Items received' },
                { date: '2024-03-06 09:15', action: 'Created', user: 'Store Manager', details: 'RMA created' },
            ],
        },
    ];

    // Processing queues
    const queues = [
        { id: 'all', name: 'All Queues', count: rmas.length },
        { id: 'approval', name: 'Pending Approval', count: rmas.filter(r => r.queue === 'approval').length },
        { id: 'inspection', name: 'Inspection', count: rmas.filter(r => r.queue === 'inspection').length },
        { id: 'processing', name: 'Processing', count: rmas.filter(r => r.queue === 'processing').length },
        { id: 'completed', name: 'Completed', count: rmas.filter(r => r.queue === 'completed').length },
    ];

    // Status configuration
    const statusConfig = {
        pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
        'pending-approval': { label: 'Pending Approval', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertTriangle },
        processing: { label: 'Processing', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Activity },
        inspection: { label: 'Inspection', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Eye },
        completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
        rejected: { label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
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
        switch (reason) {
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

    const filteredRMAs = rmas.filter(rma => {
        const matchesStatus = selectedStatus === 'all' || rma.status === selectedStatus;
        const matchesType = selectedType === 'all' || rma.type === selectedType;
        const matchesReason = selectedReason === 'all' || rma.reason === selectedReason;
        const matchesProcessor = selectedProcessor === 'all' ||
            (rma.processor === selectedProcessor) ||
            (selectedProcessor === 'unassigned' && !rma.processor);
        const matchesSearch = rma.rmaNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rma.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rma.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rma.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rma.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
        return matchesStatus && matchesType && matchesReason && matchesProcessor && matchesSearch;
    });

    const stats = {
        total: rmas.length,
        pending: rmas.filter(r => r.status === 'pending' || r.status === 'pending-approval').length,
        processing: rmas.filter(r => r.status === 'processing' || r.status === 'inspection').length,
        completed: rmas.filter(r => r.status === 'completed').length,
        approval: rmas.filter(r => r.queue === 'approval').length,
        inspection: rmas.filter(r => r.queue === 'inspection').length,
        slaBreached: rmas.filter(r => r.slaRemaining < 0).length,
    };

    const handleSelectAll = () => {
        if (selectedRMAs.length === filteredRMAs.length) {
            setSelectedRMAs([]);
        } else {
            setSelectedRMAs(filteredRMAs.map(r => r.id));
        }
    };

    const handleSelectRMA = (id) => {
        if (selectedRMAs.includes(id)) {
            setSelectedRMAs(selectedRMAs.filter(r => r !== id));
        } else {
            setSelectedRMAs([...selectedRMAs, id]);
        }
    };

    return (
        <div className="min-h-screen bg-white p-6 rounded-md">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-black">RMA Processing</h1>
                        <p className="text-black/50 mt-1">Process and manage return merchandise authorizations</p>
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

                        <Select value={selectedQueue} onValueChange={setSelectedQueue}>
                            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
                                <SelectValue placeholder="Processing Queue" />
                            </SelectTrigger>
                            <SelectContent>
                                {queues.map(queue => (
                                    <SelectItem key={queue.id} value={queue.id}>
                                        {queue.name} ({queue.count})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            className="gap-2 border-[#F5EEE9]"
                            onClick={() => setShowReportDialog(true)}
                        >
                            <BarChart3 size={16} />
                            Analytics
                        </Button>

                        <Button
                            className="gap-2 bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => setShowCreateDialog(true)}
                        >
                            <Plus size={16} />
                            New RMA
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-6 gap-4 mt-6">
                    <Card className="border-[#F5EEE9]">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-black/50">Total RMAs</p>
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
                                    <p className="text-xs text-black/50">Processing</p>
                                    <p className="text-xl font-bold text-blue-600 mt-1">{stats.processing}</p>
                                </div>
                                <div className="p-2 bg-blue-50 rounded-full">
                                    <Activity size={18} className="text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-black/50">Completed</p>
                                    <p className="text-xl font-bold text-green-600 mt-1">{stats.completed}</p>
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
                                    <p className="text-xs text-black/50">Awaiting Approval</p>
                                    <p className="text-xl font-bold text-orange-600 mt-1">{stats.approval}</p>
                                </div>
                                <div className="p-2 bg-orange-50 rounded-full">
                                    <AlertTriangle size={18} className="text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-black/50">SLA Breached</p>
                                    <p className="text-xl font-bold text-red-600 mt-1">{stats.slaBreached}</p>
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
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="inspection">Inspection</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-[130px] border-[#F5EEE9]">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="customer">Customer</SelectItem>
                            <SelectItem value="wholesale">Wholesale</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={selectedReason} onValueChange={setSelectedReason}>
                        <SelectTrigger className="w-[150px] border-[#F5EEE9]">
                            <SelectValue placeholder="Reason" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Reasons</SelectItem>
                            <SelectItem value="defective">Defective</SelectItem>
                            <SelectItem value="damaged">Damaged</SelectItem>
                            <SelectItem value="wrong-item">Wrong Item</SelectItem>
                            <SelectItem value="quality">Quality</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                            <SelectItem value="recall">Recall</SelectItem>
                            <SelectItem value="changed-mind">Changed Mind</SelectItem>
                            <SelectItem value="short-dated">Short Dated</SelectItem>
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

            {/* Queue Tabs */}
            <Tabs defaultValue="all" className="mb-6">
                <TabsList className="bg-[#F5EEE9]">
                    <TabsTrigger value="all" className="data-[state=active]:bg-white">
                        All RMAs
                    </TabsTrigger>
                    <TabsTrigger value="approval" className="data-[state=active]:bg-white">
                        Pending Approval
                        {stats.approval > 0 && (
                            <Badge className="ml-2 bg-orange-500 text-white">{stats.approval}</Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="inspection" className="data-[state=active]:bg-white">
                        Inspection
                        {stats.inspection > 0 && (
                            <Badge className="ml-2 bg-purple-500 text-white">{stats.inspection}</Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="processing" className="data-[state=active]:bg-white">
                        Processing
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="data-[state=active]:bg-white">
                        Completed
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Bulk Actions Bar */}
            {selectedRMAs.length > 0 && (
                <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge className="bg-red-600 text-white">{selectedRMAs.length} selected</Badge>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedRMAs([])}>
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

            {/* RMAs Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-3 gap-4">
                    {filteredRMAs.map((rma) => {
                        const StatusIcon = statusConfig[rma.status]?.icon || Clock;
                        const slaPercentage = ((rma.sla - rma.slaRemaining) / rma.sla) * 100;

                        return (
                            <Card key={rma.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                                <CardContent className="p-0">
                                    {/* Header */}
                                    <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Badge className={cn("text-xs border-0", getStatusColor(rma.status))}>
                                                        <StatusIcon className="mr-1" size={10} />
                                                        {rma.status}
                                                    </Badge>
                                                    <Badge className={cn("text-xs", getPriorityColor(rma.priority))}>
                                                        {rma.priority}
                                                    </Badge>
                                                    <Badge className="bg-[#F5EEE9] text-black text-xs">
                                                        Queue: {rma.queue}
                                                    </Badge>
                                                </div>
                                                <h3 className="font-semibold text-black">{rma.rmaNumber}</h3>
                                                <p className="text-xs text-black/50 mt-1">Order: {rma.orderNumber}</p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreVertical size={14} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => {
                                                        setSelectedRMA(rma);
                                                        setShowDetailsDialog(true);
                                                    }}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    {rma.queue === 'approval' && (
                                                        <>
                                                            <DropdownMenuItem onClick={() => {
                                                                setSelectedRMA(rma);
                                                                setShowApproveDialog(true);
                                                            }}>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Approve
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => {
                                                                setSelectedRMA(rma);
                                                                setShowRejectDialog(true);
                                                            }}>
                                                                <Ban className="mr-2 h-4 w-4" />
                                                                Reject
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                    {rma.queue === 'inspection' && (
                                                        <DropdownMenuItem onClick={() => {
                                                            setSelectedRMA(rma);
                                                            setShowInspectDialog(true);
                                                        }}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Inspect
                                                        </DropdownMenuItem>
                                                    )}
                                                    {rma.queue === 'processing' && (
                                                        <>
                                                            <DropdownMenuItem onClick={() => {
                                                                setSelectedRMA(rma);
                                                                setShowRefundDialog(true);
                                                            }}>
                                                                <DollarSign className="mr-2 h-4 w-4" />
                                                                Process Refund
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => {
                                                                setSelectedRMA(rma);
                                                                setShowReplaceDialog(true);
                                                            }}>
                                                                <RotateCcw className="mr-2 h-4 w-4" />
                                                                Create Replacement
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => {
                                                                setSelectedRMA(rma);
                                                                setShowCreditDialog(true);
                                                            }}>
                                                                <CreditCard className="mr-2 h-4 w-4" />
                                                                Issue Credit
                                                            </DropdownMenuItem>
                                                        </>
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
                                            <span className="text-sm font-medium">{rma.customerName}</span>
                                        </div>

                                        {/* Reason & Resolution */}
                                        {/* Reason & Resolution */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline" className="text-[10px] border-[#F5EEE9] flex items-center gap-1">
                                                {getReasonIcon(rma.reason)}
                                                {rma.reason}
                                            </Badge>
                                            <Badge className={cn("text-[10px]", getResolutionColor(rma.resolution))}>
                                                {(() => {
                                                    const ResolutionIcon = getResolutionIcon(rma.resolution);
                                                    return ResolutionIcon && <ResolutionIcon size={10} className="mr-1" />;
                                                })()}
                                                {rma.resolution}
                                            </Badge>
                                        </div>

                                        {/* Dates */}
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={10} className="text-black/30" />
                                                <span className="text-[10px] text-black/70">Request: {rma.requestDate}</span>
                                            </div>
                                            {rma.receivedDate && (
                                                <div className="flex items-center gap-1">
                                                    <Package size={10} className="text-black/30" />
                                                    <span className="text-[10px] text-black/70">Received: {rma.receivedDate}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Items Summary */}
                                        <div className="grid grid-cols-3 gap-1 mb-2">
                                            <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                                                <p className="text-[8px] text-black/50">Items</p>
                                                <p className="text-xs font-bold">{rma.totalItems}</p>
                                            </div>
                                            <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                                                <p className="text-[8px] text-black/50">Quantity</p>
                                                <p className="text-xs font-bold">{rma.totalQuantity}</p>
                                            </div>
                                            <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                                                <p className="text-[8px] text-black/50">Value</p>
                                                <p className="text-xs font-bold text-green-600">${rma.subtotal}</p>
                                            </div>
                                        </div>

                                        {/* SLA Progress */}
                                        <div className="mb-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[8px] text-black/50">SLA</span>
                                                <span className={cn(
                                                    "text-[8px] font-medium",
                                                    rma.slaRemaining < 0 ? 'text-red-600' : 'text-green-600'
                                                )}>
                                                    {rma.slaRemaining}h remaining
                                                </span>
                                            </div>
                                            <Progress
                                                value={slaPercentage}
                                                className="h-1 bg-[#F5EEE9]"
                                                style={{
                                                    '--progress-background':
                                                        slaPercentage >= 100 ? '#ef4444' :
                                                            slaPercentage >= 75 ? '#eab308' :
                                                                '#22c55e'
                                                }}
                                            />
                                        </div>

                                        {/* Processor */}
                                        {rma.processor && (
                                            <div className="flex items-center gap-1 mb-2">
                                                <User size={10} className="text-black/30" />
                                                <span className="text-[8px] text-black/70">Processor: {rma.processor}</span>
                                            </div>
                                        )}

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {rma.tags.slice(0, 2).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                                                    #{tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                                            <span>Queue: {rma.queue}</span>
                                            {rma.documents && rma.documents.length > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <FileText size={8} />
                                                    <span>{rma.documents.length}</span>
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
                                            checked={selectedRMAs.length === filteredRMAs.length && filteredRMAs.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="text-black/50">RMA #</TableHead>
                                    <TableHead className="text-black/50">Order #</TableHead>
                                    <TableHead className="text-black/50">Customer</TableHead>
                                    <TableHead className="text-black/50">Queue</TableHead>
                                    <TableHead className="text-black/50">Status</TableHead>
                                    <TableHead className="text-black/50">Priority</TableHead>
                                    <TableHead className="text-black/50">Reason</TableHead>
                                    <TableHead className="text-black/50">Resolution</TableHead>
                                    <TableHead className="text-black/50 text-right">Items</TableHead>
                                    <TableHead className="text-black/50">Request Date</TableHead>
                                    <TableHead className="text-black/50">Processor</TableHead>
                                    <TableHead className="w-8"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRMAs.map((rma) => (
                                    <TableRow key={rma.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedRMAs.includes(rma.id)}
                                                onCheckedChange={() => handleSelectRMA(rma.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">{rma.rmaNumber}</TableCell>
                                        <TableCell className="font-mono text-xs">{rma.orderNumber}</TableCell>
                                        <TableCell className="max-w-[150px] truncate">{rma.customerName}</TableCell>
                                        <TableCell>
                                            <Badge className="bg-[#F5EEE9] text-black text-xs">
                                                {rma.queue}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn("text-xs border-0", getStatusColor(rma.status))}>
                                                {rma.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn("text-xs", getPriorityColor(rma.priority))}>
                                                {rma.priority}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="capitalize">{rma.reason}</TableCell>
                                        <TableCell>
                                            <Badge className={cn("text-xs", getResolutionColor(rma.resolution))}>
                                                {rma.resolution}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{rma.totalItems}</TableCell>
                                        <TableCell className="text-xs">{rma.requestDate}</TableCell>
                                        <TableCell>{rma.processor || '—'}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 text-xs"
                                                onClick={() => {
                                                    setSelectedRMA(rma);
                                                    setShowDetailsDialog(true);
                                                }}
                                            >
                                                Process
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
                                Showing {filteredRMAs.length} of {rmas.length} RMAs
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

            {/* Process RMA Dialog */}
            <Dialog open={showProcessDialog} onOpenChange={setShowProcessDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Process RMA</DialogTitle>
                        <DialogDescription>
                            Process {selectedRMA?.rmaNumber}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="p-3 bg-[#F5EEE9] rounded-lg">
                            <p className="font-medium">{selectedRMA?.customerName}</p>
                            <p className="text-xs text-black/50">{selectedRMA?.rmaNumber} • {selectedRMA?.reason}</p>
                        </div>

                        <div className="space-y-2">
                            <Label>Processing Action</Label>
                            <RadioGroup defaultValue="process">
                                <div className="flex items-center space-x-2 mb-2">
                                    <RadioGroupItem value="process" id="process" />
                                    <Label htmlFor="process">Process normally</Label>
                                </div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <RadioGroupItem value="escalate" id="escalate" />
                                    <Label htmlFor="escalate">Escalate to supervisor</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hold" id="hold" />
                                    <Label htmlFor="hold">Place on hold</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label>Processing Notes</Label>
                            <Textarea placeholder="Enter processing notes" rows={3} />
                        </div>

                        <div className="space-y-2">
                            <Label>Next Steps</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select next step" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inspection">Send to Inspection</SelectItem>
                                    <SelectItem value="approval">Send for Approval</SelectItem>
                                    <SelectItem value="refund">Process Refund</SelectItem>
                                    <SelectItem value="replace">Create Replacement</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowProcessDialog(false)}>
                            Cancel
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Process RMA
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* RMA Details Dialog */}
            <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>RMA Processing Details</DialogTitle>
                    </DialogHeader>

                    {selectedRMA && (
                        <div className="py-4">
                            <Tabs defaultValue="overview">
                                <TabsList className="grid grid-cols-4 mb-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="items">Items</TabsTrigger>
                                    <TabsTrigger value="processing">Processing</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">{selectedRMA.rmaNumber}</h3>
                                            <p className="text-sm text-black/50 mt-1">Order: {selectedRMA.orderNumber}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Badge className={cn("text-xs border-0", getStatusColor(selectedRMA.status))}>
                                                {selectedRMA.status}
                                            </Badge>
                                            <Badge className="bg-[#F5EEE9] text-black text-xs">
                                                Queue: {selectedRMA.queue}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-black/50">Customer</p>
                                            <p className="text-sm font-medium">{selectedRMA.customerName}</p>
                                            <p className="text-xs text-black/50">{selectedRMA.customerEmail}</p>
                                            <p className="text-xs text-black/50">{selectedRMA.customerPhone}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-black/50">Type</p>
                                            <p className="text-sm font-medium capitalize">{selectedRMA.type}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <p className="text-xs text-black/50">Request Date</p>
                                            <p className="text-sm">{selectedRMA.requestDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-black/50">Received Date</p>
                                            <p className="text-sm">{selectedRMA.receivedDate || 'Not received'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-black/50">Processed Date</p>
                                            <p className="text-sm">{selectedRMA.processedDate || 'Not processed'}</p>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                                        <p className="text-xs font-medium mb-1">Reason</p>
                                        <div className="flex items-center gap-2">
                                            <Badge className="capitalize">{selectedRMA.reason}</Badge>
                                            <span className="text-sm">{selectedRMA.reasonDetails}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-black/50">Resolution</p>
                                        <Badge className={cn("text-xs mt-1", getResolutionColor(selectedRMA.resolution))}>
                                            {selectedRMA.resolution}
                                        </Badge>
                                    </div>

                                    {selectedRMA.trackingNumber && (
                                        <div>
                                            <p className="text-xs text-black/50">Tracking</p>
                                            <p className="text-sm font-mono">{selectedRMA.trackingNumber}</p>
                                            <p className="text-xs text-black/50">Carrier: {selectedRMA.carrier}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-black/50">Processor</p>
                                            <p className="text-sm">{selectedRMA.processor || 'Unassigned'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-black/50">SLA Remaining</p>
                                            <p className={cn(
                                                "text-sm font-medium",
                                                selectedRMA.slaRemaining < 0 ? 'text-red-600' : 'text-green-600'
                                            )}>
                                                {selectedRMA.slaRemaining}h
                                            </p>
                                        </div>
                                    </div>

                                    {selectedRMA.notes && (
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <p className="text-xs text-blue-700">{selectedRMA.notes}</p>
                                        </div>
                                    )}

                                    {selectedRMA.internalNotes && (
                                        <div className="p-3 bg-yellow-50 rounded-lg">
                                            <p className="text-xs text-yellow-700">Internal: {selectedRMA.internalNotes}</p>
                                        </div>
                                    )}

                                    <div>
                                        <p className="text-xs text-black/50 mb-1">Tags</p>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedRMA.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                                                    #{tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="items" className="space-y-4">
                                    <div className="space-y-3">
                                        {selectedRMA.items.map((item) => (
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
                                                    <div className="flex items-center gap-4 mt-2 text-xs">
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-black/50">Inspected:</span>
                                                            {item.inspected ? (
                                                                <CheckCircle size={12} className="text-green-600" />
                                                            ) : (
                                                                <X size={12} className="text-red-600" />
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-black/50">Accepted:</span>
                                                            {item.accepted ? (
                                                                <CheckCircle size={12} className="text-green-600" />
                                                            ) : (
                                                                <X size={12} className="text-red-600" />
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-black/50">Restock:</span>
                                                            {item.restock ? (
                                                                <Package size={12} className="text-green-600" />
                                                            ) : (
                                                                <X size={12} className="text-red-600" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    {item.batchNumber && (
                                                        <p className="text-xs text-black/50 mt-2">Batch: {item.batchNumber}</p>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="processing" className="space-y-4">
                                    <Card className="border-[#F5EEE9]">
                                        <CardContent className="p-4">
                                            <p className="text-sm font-medium mb-3">Processing Queue</p>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Current Queue</span>
                                                    <Badge className="bg-[#F5EEE9] text-black">
                                                        {selectedRMA.queue}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Time in Queue</span>
                                                    <span className="text-sm font-medium">
                                                        {selectedRMA.sla - selectedRMA.slaRemaining}h
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">SLA Deadline</span>
                                                    <span className={cn(
                                                        "text-sm font-medium",
                                                        selectedRMA.slaRemaining < 0 ? 'text-red-600' : 'text-green-600'
                                                    )}>
                                                        {selectedRMA.slaRemaining}h remaining
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-[#F5EEE9]">
                                        <CardContent className="p-4">
                                            <p className="text-sm font-medium mb-3">Processing Actions</p>
                                            <div className="space-y-2">
                                                <Button className="w-full justify-start" variant="outline">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Move to Inspection
                                                </Button>
                                                <Button className="w-full justify-start" variant="outline">
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Approve RMA
                                                </Button>
                                                <Button className="w-full justify-start" variant="outline">
                                                    <Ban className="mr-2 h-4 w-4" />
                                                    Reject RMA
                                                </Button>
                                                <Button className="w-full justify-start" variant="outline">
                                                    <DollarSign className="mr-2 h-4 w-4" />
                                                    Process Refund
                                                </Button>
                                                <Button className="w-full justify-start" variant="outline">
                                                    <RotateCcw className="mr-2 h-4 w-4" />
                                                    Create Replacement
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {selectedRMA.documents && selectedRMA.documents.length > 0 && (
                                        <div>
                                            <p className="text-xs font-medium mb-2">Documents</p>
                                            <div className="space-y-2">
                                                {selectedRMA.documents.map((doc, idx) => (
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
                                            {selectedRMA.history.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                                                    {item.action === 'Created' && <Plus size={12} className="text-green-600 mt-0.5" />}
                                                    {item.action === 'Processing' && <Activity size={12} className="text-blue-600 mt-0.5" />}
                                                    {item.action === 'Approved' && <CheckCircle size={12} className="text-green-600 mt-0.5" />}
                                                    {item.action === 'Rejected' && <AlertCircle size={12} className="text-red-600 mt-0.5" />}
                                                    {item.action === 'Received' && <Package size={12} className="text-blue-600 mt-0.5" />}
                                                    {item.action === 'Completed' && <CheckCircle size={12} className="text-blue-600 mt-0.5" />}
                                                    {item.action === 'Inspection' && <Eye size={12} className="text-purple-600 mt-0.5" />}
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
                        {selectedRMA?.queue !== 'completed' && (
                            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                                setShowDetailsDialog(false);
                                setShowProcessDialog(true);
                            }}>
                                <Activity className="mr-2 h-4 w-4" />
                                Process
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
                                <Plus size={20} />
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

export default RMAProcessingPage;