// app/dashboard/asset-transfers/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Repeat,
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
  MapPin,

  ArrowLeft,
  ArrowRight,
  Truck,

  PackageCheck,
  PackagePlus,

  Wrench,
  Activity,
  BarChart3,

  Printer as PrinterIcon,

  Camera as CameraIcon
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

import { Switch } from '@/components/ui/switch';

import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AssetTransfersPage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFromLocation, setSelectedFromLocation] = useState('all');
  const [selectedToLocation, setSelectedToLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showTrackDialog, setShowTrackDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample asset transfer data
  const transfers = [
    {
      id: 'TRF-001',
      reference: 'AST-TRF-2024-001',
      type: 'location',
      status: 'completed',
      priority: 'medium',
      assetId: 'AST-001',
      assetName: 'Forklift - Electric',
      assetTag: 'AST-2024-001',
      category: 'Equipment',
      fromLocation: 'Warehouse A',
      fromZone: 'Zone 1',
      fromBay: 'Bay-05',
      toLocation: 'Warehouse B',
      toZone: 'Zone 3',
      toBay: 'Bay-12',
      fromAssignee: 'John Doe',
      toAssignee: null,
      quantity: 1,
      unit: 'unit',
      requestedBy: 'John Doe',
      requestedDate: '2024-03-14 09:30',
      approvedBy: 'Jane Smith',
      approvedDate: '2024-03-14 10:15',
      completedBy: 'Mike Johnson',
      completedDate: '2024-03-14 14:30',
      carrier: 'Company Transport',
      trackingNumber: 'TRK-001',
      estimatedArrival: '2024-03-14',
      actualArrival: '2024-03-14',
      reason: 'Reallocation to support operations in Warehouse B',
      notes: 'Forklift needed for upcoming inventory count',
      documents: ['transfer-request-001.pdf', 'receipt-001.pdf'],
      tags: ['forklift', 'reallocation', 'urgent'],
      history: [
        { date: '2024-03-14 09:30', action: 'Requested', user: 'John Doe' },
        { date: '2024-03-14 10:15', action: 'Approved', user: 'Jane Smith' },
        { date: '2024-03-14 11:00', action: 'Picked Up', user: 'Mike Johnson' },
        { date: '2024-03-14 14:30', action: 'Delivered', user: 'Mike Johnson' },
      ],
    },
    {
      id: 'TRF-002',
      reference: 'AST-TRF-2024-002',
      type: 'assignment',
      status: 'in_progress',
      priority: 'high',
      assetId: 'AST-003',
      assetName: 'Barcode Scanner - Industrial',
      assetTag: 'AST-2024-003',
      category: 'IT Equipment',
      fromLocation: 'Warehouse A',
      fromZone: 'Zone 2',
      fromBay: 'Station-03',
      toLocation: 'Warehouse A',
      toZone: 'Zone 2',
      toBay: 'Station-05',
      fromAssignee: null,
      toAssignee: 'Jane Smith',
      quantity: 1,
      unit: 'unit',
      requestedBy: 'Sarah Wilson',
      requestedDate: '2024-03-15 08:45',
      approvedBy: 'Mike Johnson',
      approvedDate: '2024-03-15 09:30',
      completedBy: null,
      completedDate: null,
      carrier: null,
      trackingNumber: null,
      estimatedArrival: '2024-03-15',
      actualArrival: null,
      reason: 'Reassign scanner to new inventory team member',
      notes: 'Scanner needs to be configured for new user',
      documents: ['assignment-request-002.pdf'],
      tags: ['scanner', 'reassignment', 'urgent'],
      history: [
        { date: '2024-03-15 08:45', action: 'Requested', user: 'Sarah Wilson' },
        { date: '2024-03-15 09:30', action: 'Approved', user: 'Mike Johnson' },
        { date: '2024-03-15 10:00', action: 'In Progress', user: 'Tech Team' },
      ],
    },
    {
      id: 'TRF-003',
      reference: 'AST-TRF-2024-003',
      type: 'maintenance',
      status: 'pending',
      priority: 'urgent',
      assetId: 'AST-007',
      assetName: 'Conveyor System',
      assetTag: 'AST-2024-007',
      category: 'Equipment',
      fromLocation: 'Warehouse A',
      fromZone: 'Packing Area',
      fromBay: 'Line-01',
      toLocation: 'Maintenance Facility',
      toZone: 'Service Bay',
      toBay: 'Bay-02',
      fromAssignee: null,
      toAssignee: null,
      quantity: 1,
      unit: 'unit',
      requestedBy: 'Mike Johnson',
      requestedDate: '2024-03-15 11:20',
      approvedBy: null,
      approvedDate: null,
      completedBy: null,
      completedDate: null,
      carrier: 'Service Truck',
      trackingNumber: 'SRV-003',
      estimatedArrival: '2024-03-16',
      actualArrival: null,
      reason: 'Conveyor belt malfunction - urgent repair needed',
      notes: 'System has been temporarily shut down',
      documents: ['maintenance-request-003.pdf', 'diagnostic-report-003.pdf'],
      tags: ['conveyor', 'maintenance', 'urgent', 'repair'],
      history: [
        { date: '2024-03-15 11:20', action: 'Requested', user: 'Mike Johnson' },
      ],
    },
    {
      id: 'TRF-004',
      reference: 'AST-TRF-2024-004',
      type: 'loan',
      status: 'approved',
      priority: 'medium',
      assetId: 'AST-008',
      assetName: 'Laptop - Dell Latitude',
      assetTag: 'AST-2024-008',
      category: 'IT Equipment',
      fromLocation: 'IT Department',
      fromZone: 'Storage',
      fromBay: 'Cabinet-03',
      toLocation: 'Field',
      toZone: null,
      toBay: null,
      fromAssignee: 'IT Team',
      toAssignee: 'Sarah Wilson',
      quantity: 1,
      unit: 'unit',
      requestedBy: 'Sarah Wilson',
      requestedDate: '2024-03-14 13:30',
      approvedBy: 'IT Manager',
      approvedDate: '2024-03-14 14:15',
      completedBy: null,
      completedDate: null,
      carrier: null,
      trackingNumber: null,
      estimatedArrival: '2024-03-15',
      actualArrival: null,
      reason: 'Temporary loan for field work (2 weeks)',
      notes: 'Return expected by March 30, 2024',
      expectedReturnDate: '2024-03-30',
      documents: ['loan-agreement-004.pdf'],
      tags: ['laptop', 'loan', 'temporary'],
      history: [
        { date: '2024-03-14 13:30', action: 'Requested', user: 'Sarah Wilson' },
        { date: '2024-03-14 14:15', action: 'Approved', user: 'IT Manager' },
      ],
    },
    {
      id: 'TRF-005',
      reference: 'AST-TRF-2024-005',
      type: 'location',
      status: 'cancelled',
      priority: 'low',
      assetId: 'AST-004',
      assetName: 'Pallet Jack - Manual',
      assetTag: 'AST-2024-004',
      category: 'Equipment',
      fromLocation: 'Warehouse C',
      fromZone: 'Zone 5',
      fromBay: 'Bay-12',
      toLocation: 'Warehouse A',
      toZone: 'Zone 1',
      toBay: 'Bay-08',
      fromAssignee: null,
      toAssignee: null,
      quantity: 1,
      unit: 'unit',
      requestedBy: 'Emma Watson',
      requestedDate: '2024-03-13 10:00',
      approvedBy: 'Mike Johnson',
      approvedDate: '2024-03-13 10:45',
      completedBy: null,
      completedDate: null,
      cancelledBy: 'Jane Smith',
      cancelledDate: '2024-03-13 15:30',
      cancellationReason: 'Asset needed in current location for upcoming project',
      carrier: null,
      trackingNumber: null,
      estimatedArrival: '2024-03-14',
      actualArrival: null,
      reason: 'Consolidate pallet jacks in Warehouse A',
      notes: 'Cancelled due to project requirements',
      documents: ['transfer-request-005.pdf'],
      tags: ['pallet-jack', 'cancelled'],
      history: [
        { date: '2024-03-13 10:00', action: 'Requested', user: 'Emma Watson' },
        { date: '2024-03-13 10:45', action: 'Approved', user: 'Mike Johnson' },
        { date: '2024-03-13 15:30', action: 'Cancelled', user: 'Jane Smith', reason: 'Asset needed in current location' },
      ],
    },
    {
      id: 'TRF-006',
      reference: 'AST-TRF-2024-006',
      type: 'transfer',
      status: 'in_transit',
      priority: 'high',
      assetId: 'AST-010',
      assetName: 'Company Vehicle - Ford Transit',
      assetTag: 'AST-2024-010',
      category: 'Vehicle',
      fromLocation: 'Vehicle Depot',
      fromZone: 'Lot A',
      fromBay: 'Spot-05',
      toLocation: 'Store B',
      toZone: 'Loading Dock',
      toBay: 'Bay-02',
      fromAssignee: 'Delivery Team',
      toAssignee: 'Store B Receiving',
      quantity: 1,
      unit: 'unit',
      requestedBy: 'Logistics Manager',
      requestedDate: '2024-03-14 08:00',
      approvedBy: 'Fleet Manager',
      approvedDate: '2024-03-14 08:30',
      completedBy: null,
      completedDate: null,
      carrier: 'Company Driver',
      trackingNumber: 'TRK-006',
      estimatedArrival: '2024-03-15 10:00',
      actualArrival: null,
      currentLocation: 'Highway I-95, Mile 120',
      lastUpdate: '2024-03-15 08:30',
      reason: 'Transfer vehicle to Store B for deliveries',
      notes: 'Driver: John Smith, Contact: 555-0123',
      documents: ['transfer-manifest-006.pdf', 'vehicle-log-006.pdf'],
      tags: ['vehicle', 'transfer', 'in-transit'],
      history: [
        { date: '2024-03-14 08:00', action: 'Requested', user: 'Logistics Manager' },
        { date: '2024-03-14 08:30', action: 'Approved', user: 'Fleet Manager' },
        { date: '2024-03-14 09:00', action: 'Departed', user: 'John Smith' },
        { date: '2024-03-15 08:30', action: 'Location Update', user: 'GPS System', location: 'Highway I-95, Mile 120' },
      ],
    },
    {
      id: 'TRF-007',
      reference: 'AST-TRF-2024-007',
      type: 'location',
      status: 'pending',
      priority: 'medium',
      assetId: 'AST-005',
      assetName: 'Inventory Management Server',
      assetTag: 'AST-2024-005',
      category: 'IT Equipment',
      fromLocation: 'Data Center',
      fromZone: 'Rack A',
      fromBay: 'Server-01',
      toLocation: 'Data Center',
      toZone: 'Rack C',
      toBay: 'Server-15',
      fromAssignee: 'IT Team',
      toAssignee: null,
      quantity: 1,
      unit: 'unit',
      requestedBy: 'IT Manager',
      requestedDate: '2024-03-15 09:00',
      approvedBy: null,
      approvedDate: null,
      completedBy: null,
      completedDate: null,
      reason: 'Rack reorganization',
      notes: 'Requires network reconfiguration',
      documents: ['server-move-request-007.pdf'],
      tags: ['server', 'reorganization', 'pending'],
      history: [
        { date: '2024-03-15 09:00', action: 'Requested', user: 'IT Manager' },
      ],
    },
    {
      id: 'TRF-008',
      reference: 'AST-TRF-2024-008',
      type: 'assignment',
      status: 'completed',
      priority: 'low',
      assetId: 'AST-006',
      assetName: 'Desktop Computer - Dell Optiplex',
      assetTag: 'AST-2024-006',
      category: 'IT Equipment',
      fromLocation: 'IT Storage',
      fromZone: 'Cabinet',
      fromBay: 'Shelf-02',
      toLocation: 'Office A',
      toZone: 'Floor 1',
      toBay: 'Desk-15',
      fromAssignee: null,
      toAssignee: 'Mike Johnson',
      quantity: 1,
      unit: 'unit',
      requestedBy: 'Mike Johnson',
      requestedDate: '2024-03-12 14:00',
      approvedBy: 'IT Manager',
      approvedDate: '2024-03-12 14:30',
      completedBy: 'IT Team',
      completedDate: '2024-03-12 15:45',
      reason: 'New hire setup',
      notes: 'Computer configured with standard software',
      documents: ['assignment-form-008.pdf', 'setup-checklist-008.pdf'],
      tags: ['desktop', 'new-hire', 'setup'],
      history: [
        { date: '2024-03-12 14:00', action: 'Requested', user: 'Mike Johnson' },
        { date: '2024-03-12 14:30', action: 'Approved', user: 'IT Manager' },
        { date: '2024-03-12 15:45', action: 'Completed', user: 'IT Team' },
      ],
    },
    {
      id: 'TRF-009',
      reference: 'AST-TRF-2024-009',
      type: 'maintenance',
      status: 'scheduled',
      priority: 'medium',
      assetId: 'AST-002',
      assetName: 'Pallet Racking System',
      assetTag: 'AST-2024-002',
      category: 'Infrastructure',
      fromLocation: 'Warehouse B',
      fromZone: 'Zone 3',
      fromBay: 'Aisles A-D',
      toLocation: 'On-site',
      toZone: 'Work Area',
      toBay: 'Temporary',
      fromAssignee: null,
      toAssignee: null,
      quantity: 1,
      unit: 'unit',
      requestedBy: 'Safety Officer',
      requestedDate: '2024-03-10 11:00',
      approvedBy: 'Operations Manager',
      approvedDate: '2024-03-10 11:30',
      scheduledDate: '2024-03-18 08:00',
      reason: 'Annual safety inspection and maintenance',
      notes: 'Will require partial aisle closure',
      documents: ['maintenance-schedule-009.pdf'],
      tags: ['racking', 'inspection', 'scheduled'],
      history: [
        { date: '2024-03-10 11:00', action: 'Requested', user: 'Safety Officer' },
        { date: '2024-03-10 11:30', action: 'Approved', user: 'Operations Manager' },
        { date: '2024-03-10 13:00', action: 'Scheduled', user: 'Maintenance Coordinator', scheduled: '2024-03-18' },
      ],
    },
    {
      id: 'TRF-010',
      reference: 'AST-TRF-2024-010',
      type: 'return',
      status: 'in_progress',
      priority: 'medium',
      assetId: 'AST-008',
      assetName: 'Laptop - Dell Latitude',
      assetTag: 'AST-2024-008',
      category: 'IT Equipment',
      fromLocation: 'Field',
      fromZone: null,
      fromBay: null,
      toLocation: 'IT Department',
      toZone: 'Storage',
      toBay: 'Cabinet-03',
      fromAssignee: 'Sarah Wilson',
      toAssignee: 'IT Team',
      quantity: 1,
      unit: 'unit',
      requestedBy: 'Sarah Wilson',
      requestedDate: '2024-03-15 16:00',
      approvedBy: 'IT Manager',
      approvedDate: '2024-03-15 16:15',
      completedBy: null,
      completedDate: null,
      reason: 'Loan period ended, returning asset',
      notes: 'Asset in good condition, data wiped',
      relatedTransfer: 'TRF-004',
      documents: ['return-receipt-010.pdf'],
      tags: ['laptop', 'return', 'loan-complete'],
      history: [
        { date: '2024-03-15 16:00', action: 'Requested', user: 'Sarah Wilson' },
        { date: '2024-03-15 16:15', action: 'Approved', user: 'IT Manager' },
        { date: '2024-03-15 16:30', action: 'In Transit', user: 'Sarah Wilson' },
      ],
    },
  ];

  // Transfer types
  const transferTypes = [
    { id: 'location', name: 'Location Transfer', icon: MapPin },
    { id: 'assignment', name: 'Assignment Transfer', icon: User },
    { id: 'maintenance', name: 'Maintenance Transfer', icon: Wrench },
    { id: 'loan', name: 'Loan Transfer', icon: Clock },
    { id: 'return', name: 'Return Transfer', icon: ArrowLeft },
    { id: 'transfer', name: 'General Transfer', icon: Repeat },
  ];

  // Status configuration
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    approved: { label: 'Approved', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: CheckCircle },
    in_progress: { label: 'In Progress', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Activity },
    in_transit: { label: 'In Transit', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Truck },
    scheduled: { label: 'Scheduled', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: Calendar },
    completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: Ban },
    rejected: { label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200', icon: X },
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
  };

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A' },
    { id: 'wh-b', name: 'Warehouse B' },
    { id: 'wh-c', name: 'Warehouse C' },
    { id: 'data-center', name: 'Data Center' },
    { id: 'office-a', name: 'Office A' },
    { id: 'it-dept', name: 'IT Department' },
    { id: 'maintenance', name: 'Maintenance Facility' },
    { id: 'vehicle-depot', name: 'Vehicle Depot' },
    { id: 'field', name: 'Field' },
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

  const getTypeIcon = (type) => {
    const found = transferTypes.find(t => t.id === type);
    return found?.icon || Repeat;
  };

  const filteredTransfers = transfers.filter(transfer => {
    const matchesStatus = selectedStatus === 'all' || transfer.status === selectedStatus;
    const matchesType = selectedType === 'all' || transfer.type === selectedType;
    const matchesFromLocation = selectedFromLocation === 'all' || transfer.fromLocation === selectedFromLocation;
    const matchesToLocation = selectedToLocation === 'all' || transfer.toLocation === selectedToLocation;
    const matchesSearch = transfer.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.assetTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (transfer.fromAssignee && transfer.fromAssignee.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (transfer.toAssignee && transfer.toAssignee.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         transfer.requestedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesFromLocation && matchesToLocation && matchesSearch;
  });

  const stats = {
    total: transfers.length,
    pending: transfers.filter(t => t.status === 'pending').length,
    approved: transfers.filter(t => t.status === 'approved').length,
    inProgress: transfers.filter(t => ['in_progress', 'in_transit'].includes(t.status)).length,
    completed: transfers.filter(t => t.status === 'completed').length,
    cancelled: transfers.filter(t => t.status === 'cancelled' || t.status === 'rejected').length,
    totalValue: transfers.reduce((sum, t) => sum + (t.quantity * 1000), 0), // Placeholder value calculation
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Asset Transfers</h1>
            <p className="text-black/50 mt-1">Manage and track asset movements between locations and assignments</p>
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
              New Transfer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Transfers</p>
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
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.approved}</p>
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
                  <p className="text-xs text-black/50">In Progress</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.inProgress}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Truck size={18} className="text-purple-600" />
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
                  <p className="text-xs text-black/50">Cancelled</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.cancelled}</p>
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
                  <p className="text-xs text-black/50">Assets in Transit</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.inProgress}</p>
                </div>
                <div className="p-2 bg-indigo-50 rounded-full">
                  <Package size={18} className="text-indigo-600" />
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
              placeholder="Search by reference, asset, tag, or requester..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Transfer Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {transferTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFromLocation} onValueChange={setSelectedFromLocation}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="From Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedToLocation} onValueChange={setSelectedToLocation}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="To Location" />
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

      {/* Transfers Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredTransfers.map((transfer) => {
            const StatusIcon = statusConfig[transfer.status]?.icon || Clock;
            const TypeIcon = getTypeIcon(transfer.type);
            
            return (
              <Card key={transfer.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(transfer.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {transfer.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(transfer.priority))}>
                            {transfer.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            <TypeIcon className="mr-1" size={10} />
                            {transfer.type}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{transfer.reference}</h3>
                        <p className="text-sm text-black mt-1">{transfer.assetName}</p>
                        <p className="text-xs text-black/50">{transfer.assetTag}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedTransfer(transfer);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {transfer.status === 'in_transit' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedTransfer(transfer);
                              setShowTrackDialog(true);
                            }}>
                              <MapPin className="mr-2 h-4 w-4" />
                              Track
                            </DropdownMenuItem>
                          )}
                          {transfer.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => {
                                setSelectedTransfer(transfer);
                                setShowApproveDialog(true);
                              }}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedTransfer(transfer);
                                setShowRejectDialog(true);
                              }}>
                                <Ban className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {transfer.status === 'approved' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedTransfer(transfer);
                              setShowCompleteDialog(true);
                            }}>
                              <Check className="mr-2 h-4 w-4" />
                              Mark Complete
                            </DropdownMenuItem>
                          )}
                          {(transfer.status === 'pending' || transfer.status === 'approved') && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedTransfer(transfer);
                              setShowCancelDialog(true);
                            }}>
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </DropdownMenuItem>
                          )}
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
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Transfer Path */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center flex-1">
                        <p className="text-xs text-black/50">From</p>
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            {transfer.fromLocation}
                          </Badge>
                          {transfer.fromBay && (
                            <p className="text-xs text-black/50 mt-1">{transfer.fromBay}</p>
                          )}
                        </div>
                        {transfer.fromAssignee && (
                          <p className="text-xs text-black/50 mt-1">Assigned: {transfer.fromAssignee}</p>
                        )}
                      </div>
                      <ArrowRight size={16} className="text-red-600 mx-2" />
                      <div className="text-center flex-1">
                        <p className="text-xs text-black/50">To</p>
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            {transfer.toLocation}
                          </Badge>
                          {transfer.toBay && (
                            <p className="text-xs text-black/50 mt-1">{transfer.toBay}</p>
                          )}
                        </div>
                        {transfer.toAssignee && (
                          <p className="text-xs text-black/50 mt-1">Assigned: {transfer.toAssignee}</p>
                        )}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Requested</span>
                        <span className="font-medium">{transfer.requestedDate.split(' ')[0]}</span>
                      </div>
                      {transfer.estimatedArrival && (
                        <div className="flex items-center justify-between">
                          <span className="text-black/50">Est. Arrival</span>
                          <span className="font-medium">{transfer.estimatedArrival}</span>
                        </div>
                      )}
                      {transfer.trackingNumber && (
                        <div className="flex items-center justify-between">
                          <span className="text-black/50">Tracking</span>
                          <span className="font-mono text-xs">{transfer.trackingNumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Reason */}
                    <p className="text-xs text-black/70 line-clamp-2 mb-3">
                      {transfer.reason}
                    </p>

                    {/* Requester */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-black/50">
                        <User size={12} />
                        {transfer.requestedBy}
                      </div>
                      <div className="flex items-center gap-1 text-black/50">
                        <Clock size={12} />
                        {transfer.requestedDate.split(' ')[1]}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {transfer.tags.slice(0, 3).map((tag) => (
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
                  <TableHead className="text-black/50">Reference</TableHead>
                  <TableHead className="text-black/50">Asset</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">From</TableHead>
                  <TableHead className="text-black/50">To</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Requested By</TableHead>
                  <TableHead className="text-black/50">Requested Date</TableHead>
                  <TableHead className="text-black/50">Est. Arrival</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransfers.map((transfer) => (
                  <TableRow key={transfer.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">{transfer.reference}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transfer.assetName}</p>
                        <p className="text-xs text-black/50">{transfer.assetTag}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {transfer.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{transfer.fromLocation}</p>
                        <p className="text-xs text-black/50">{transfer.fromBay || ''}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{transfer.toLocation}</p>
                        <p className="text-xs text-black/50">{transfer.toBay || ''}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(transfer.status))}>
                        {transfer.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(transfer.priority))}>
                        {transfer.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{transfer.requestedBy}</TableCell>
                    <TableCell>{transfer.requestedDate.split(' ')[0]}</TableCell>
                    <TableCell>{transfer.estimatedArrival || '—'}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedTransfer(transfer);
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
                Showing {filteredTransfers.length} of {transfers.length} transfers
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

      {/* Create Transfer Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Asset Transfer</DialogTitle>
            <DialogDescription>
              Initiate a new asset transfer request
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Transfer Details</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Transfer Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {transferTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Asset</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AST-001">Forklift - Electric (AST-2024-001)</SelectItem>
                        <SelectItem value="AST-003">Barcode Scanner (AST-2024-003)</SelectItem>
                        <SelectItem value="AST-008">Dell Laptop (AST-2024-008)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>From Location</Label>
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
                    <Label>From Bay/Position</Label>
                    <Input placeholder="e.g., Bay-05" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>To Location</Label>
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
                    <Label>To Bay/Position</Label>
                    <Input placeholder="e.g., Bay-12" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>From Assignee</Label>
                    <Input placeholder="Current assignee (if any)" />
                  </div>
                  <div className="space-y-2">
                    <Label>To Assignee</Label>
                    <Input placeholder="New assignee (if applicable)" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label>Reason for Transfer</Label>
                  <Textarea placeholder="Explain why this transfer is needed" rows={3} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Arrival</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Carrier/Transport</Label>
                  <Input placeholder="e.g., Company Truck, Courier" />
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes" rows={2} />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>

                <div className="space-y-2">
                  <Label>Attachments</Label>
                  <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                    <Upload size={24} className="mx-auto text-black/30 mb-2" />
                    <p className="text-sm text-black/50">Drag files or click to upload</p>
                    <p className="text-xs text-black/30">Support: PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Transfer Details</DialogTitle>
          </DialogHeader>

          {selectedTransfer && (
            <div className="py-4 space-y-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedTransfer.reference}</h3>
                      <p className="text-sm text-black/50">{selectedTransfer.assetName} • {selectedTransfer.assetTag}</p>
                    </div>
                    <Badge className={cn("text-sm border-0", getStatusColor(selectedTransfer.status))}>
                      {selectedTransfer.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <p className="text-xs text-black/50 mb-1">From</p>
                        <p className="font-medium">{selectedTransfer.fromLocation}</p>
                        <p className="text-xs text-black/50">{selectedTransfer.fromBay || 'N/A'}</p>
                        {selectedTransfer.fromAssignee && (
                          <p className="text-xs text-black/50 mt-1">Assigned: {selectedTransfer.fromAssignee}</p>
                        )}
                      </div>
                      <ArrowRight size={20} className="text-red-600 mx-4" />
                      <div className="text-center flex-1">
                        <p className="text-xs text-black/50 mb-1">To</p>
                        <p className="font-medium">{selectedTransfer.toLocation}</p>
                        <p className="text-xs text-black/50">{selectedTransfer.toBay || 'N/A'}</p>
                        {selectedTransfer.toAssignee && (
                          <p className="text-xs text-black/50 mt-1">Assigned: {selectedTransfer.toAssignee}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black/50">Requested By</p>
                      <p className="font-medium">{selectedTransfer.requestedBy}</p>
                      <p className="text-xs text-black/50">{selectedTransfer.requestedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Approved By</p>
                      <p className="font-medium">{selectedTransfer.approvedBy || '—'}</p>
                      {selectedTransfer.approvedDate && (
                        <p className="text-xs text-black/50">{selectedTransfer.approvedDate}</p>
                      )}
                    </div>
                  </div>

                  {selectedTransfer.trackingNumber && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-700">Tracking Number</p>
                          <p className="text-sm text-blue-600">{selectedTransfer.trackingNumber}</p>
                        </div>
                        {selectedTransfer.carrier && (
                          <p className="text-sm text-blue-600">Carrier: {selectedTransfer.carrier}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedTransfer.currentLocation && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-700 mb-1">Current Location</p>
                      <p className="text-sm text-purple-600">{selectedTransfer.currentLocation}</p>
                      <p className="text-xs text-purple-500 mt-1">Last updated: {selectedTransfer.lastUpdate}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-1">Reason</p>
                    <p className="text-sm text-black/70">{selectedTransfer.reason}</p>
                  </div>

                  {selectedTransfer.notes && (
                    <div>
                      <p className="text-sm font-medium mb-1">Notes</p>
                      <p className="text-sm text-black/70">{selectedTransfer.notes}</p>
                    </div>
                  )}

                  {selectedTransfer.cancellationReason && (
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-sm font-medium text-red-700 mb-1">Cancellation Reason</p>
                      <p className="text-sm text-red-600">{selectedTransfer.cancellationReason}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTransfer.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedTransfer.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-1">
                            {item.action === 'Requested' && <Clock size={14} className="text-yellow-600" />}
                            {item.action === 'Approved' && <CheckCircle size={14} className="text-green-600" />}
                            {item.action === 'Rejected' && <X size={14} className="text-red-600" />}
                            {item.action === 'Cancelled' && <Ban size={14} className="text-red-600" />}
                            {item.action === 'Completed' && <CheckCircle size={14} className="text-green-600" />}
                            {item.action === 'Departed' && <Truck size={14} className="text-blue-600" />}
                            {item.action === 'Delivered' && <PackageCheck size={14} className="text-green-600" />}
                            {item.action === 'Picked Up' && <PackagePlus size={14} className="text-purple-600" />}
                            {item.action === 'Scheduled' && <Calendar size={14} className="text-blue-600" />}
                            {item.action === 'Location Update' && <MapPin size={14} className="text-indigo-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{item.action}</p>
                              <span className="text-xs text-black/50">{item.date}</span>
                            </div>
                            <p className="text-xs text-black/50">By: {item.user}</p>
                            {item.reason && <p className="text-xs text-black/70 mt-1">{item.reason}</p>}
                            {item.location && <p className="text-xs text-black/50 mt-1">Location: {item.location}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="documents">
                  <div className="space-y-3">
                    {selectedTransfer.documents?.map((doc, index) => (
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
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedTransfer?.status === 'in_transit' && (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowTrackDialog(true);
              }}>
                <MapPin className="mr-2 h-4 w-4" />
                Track
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Approve Transfer</DialogTitle>
            <DialogDescription>
              Confirm approval of this asset transfer
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedTransfer?.reference}</p>
              <p className="text-sm text-black/50">{selectedTransfer?.assetName}</p>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span>From: {selectedTransfer?.fromLocation}</span>
                <ArrowRight size={12} className="text-red-600" />
                <span>To: {selectedTransfer?.toLocation}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Approval Notes</Label>
              <Textarea placeholder="Add any approval notes" rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Estimated Arrival</Label>
              <Input type="date" />
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
              Approve Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Reject Transfer</DialogTitle>
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
                    Rejecting this transfer will cancel the request.
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
                  <SelectItem value="insufficient">Insufficient Information</SelectItem>
                  <SelectItem value="duplicate">Duplicate Request</SelectItem>
                  <SelectItem value="not-available">Asset Not Available</SelectItem>
                  <SelectItem value="location-issue">Location Issue</SelectItem>
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
              Reject Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Track Dialog */}
      <Dialog open={showTrackDialog} onOpenChange={setShowTrackDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Track Transfer</DialogTitle>
            <DialogDescription>
              Real-time tracking information
            </DialogDescription>
          </DialogHeader>

          {selectedTransfer && (
            <div className="py-4 space-y-4">
              <div className="p-3 bg-[#F5EEE9] rounded-lg">
                <p className="font-medium">{selectedTransfer.reference}</p>
                <p className="text-sm text-black/50">{selectedTransfer.assetName}</p>
                <p className="text-xs text-black/50 mt-1">Tracking: {selectedTransfer.trackingNumber || 'N/A'}</p>
              </div>

              <div className="space-y-3">
                {selectedTransfer.history
                  .filter(h => h.action === 'Location Update' || h.action === 'Departed' || h.action === 'Delivered')
                  .map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2",
                        item.action === 'Delivered' ? 'bg-green-500' :
                        item.action === 'Departed' ? 'bg-blue-500' : 'bg-yellow-500'
                      )} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.action}</p>
                          <span className="text-xs text-black/50">{item.date}</span>
                        </div>
                        {item.location && <p className="text-xs text-black/70">{item.location}</p>}
                        <p className="text-xs text-black/50">By: {item.user}</p>
                      </div>
                    </div>
                  ))}
              </div>

              {selectedTransfer.currentLocation && (
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-700">Current Location</p>
                  <p className="text-lg font-bold text-purple-600">{selectedTransfer.currentLocation}</p>
                  <p className="text-xs text-purple-500">Last updated: {selectedTransfer.lastUpdate}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-black/50">Estimated Arrival</p>
                  <p className="font-medium">{selectedTransfer.estimatedArrival || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Carrier</p>
                  <p className="font-medium">{selectedTransfer.carrier || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTrackDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
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
            <TooltipContent side="left">New Transfer</TooltipContent>
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
            <TooltipContent side="left">Bulk Actions</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowTrackDialog(true)}
              >
                <MapPin size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Track All</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default AssetTransfersPage;