// app/dashboard/manage-stocktake/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ClipboardList,
  Plus,
  Search,
  Filter,
  Calendar,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Package,
  Download,
  Upload,
  Printer,
  Grid,
  List,
  Ban,
  AlertCircle,
  FileSpreadsheet,
  FileJson,
  F,
  Camera,
  QrCode,
  Barcode,
  Scan,
  MapPin,
  Target,
  File,
  FileCheck,
  Database
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,

} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ManageStocktakePage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedAssignee, setSelectedAssignee] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showBarcodeDialog, setShowBarcodeDialog] = useState(false);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [showRfidDialog, setShowRfidDialog] = useState(false);
  const [showDeviceDialog, setShowDeviceDialog] = useState(false);
  const [selectedStocktake, setSelectedStocktake] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sample stocktake data
  const stocktakes = [
    {
      id: 'STK-2024-001',
      name: 'Monthly Warehouse A Count',
      type: 'full',
      status: 'in_progress',
      priority: 'high',
      location: 'Warehouse A',
      zone: 'Zone 1-5',
      totalItems: 1500,
      countedItems: 845,
      pendingItems: 655,
      discrepancies: 12,
      accuracy: 98.5,
      startDate: '2024-03-15',
      dueDate: '2024-03-20',
      assignedTo: [
        { id: 1, name: 'John Doe', avatar: null, initials: 'JD' },
        { id: 2, name: 'Jane Smith', avatar: null, initials: 'JS' },
      ],
      createdBy: 'Sarah Wilson',
      createdAt: '2024-03-14',
      tags: ['monthly', 'warehouse-a', 'full-count'],
      progress: 56,
    },
    {
      id: 'STK-2024-002',
      name: 'Store B Cycle Count',
      type: 'cycle',
      status: 'scheduled',
      priority: 'medium',
      location: 'Store B',
      zone: 'All Zones',
      totalItems: 450,
      countedItems: 0,
      pendingItems: 450,
      discrepancies: 0,
      accuracy: 0,
      startDate: '2024-03-18',
      dueDate: '2024-03-19',
      assignedTo: [
        { id: 3, name: 'Mike Johnson', avatar: null, initials: 'MJ' },
      ],
      createdBy: 'John Doe',
      createdAt: '2024-03-13',
      tags: ['cycle-count', 'store-b', 'weekly'],
      progress: 0,
    },
    {
      id: 'STK-2024-003',
      name: 'Warehouse C Spot Check',
      type: 'spot',
      status: 'completed',
      priority: 'low',
      location: 'Warehouse C',
      zone: 'Zone 7',
      totalItems: 120,
      countedItems: 120,
      pendingItems: 0,
      discrepancies: 3,
      accuracy: 97.5,
      startDate: '2024-03-12',
      dueDate: '2024-03-12',
      assignedTo: [
        { id: 4, name: 'Sarah Wilson', avatar: null, initials: 'SW' },
        { id: 5, name: 'Tom Brown', avatar: null, initials: 'TB' },
      ],
      createdBy: 'Jane Smith',
      createdAt: '2024-03-11',
      completedAt: '2024-03-12',
      tags: ['spot-check', 'warehouse-c', 'random'],
      progress: 100,
    },
    {
      id: 'STK-2024-004',
      name: 'Quarterly Full Inventory',
      type: 'full',
      status: 'pending',
      priority: 'high',
      location: 'All Locations',
      zone: 'All Zones',
      totalItems: 5200,
      countedItems: 0,
      pendingItems: 5200,
      discrepancies: 0,
      accuracy: 0,
      startDate: '2024-04-01',
      dueDate: '2024-04-07',
      assignedTo: [],
      createdBy: 'Admin',
      createdAt: '2024-03-10',
      tags: ['quarterly', 'full-count', 'all-locations'],
      progress: 0,
    },
    {
      id: 'STK-2024-005',
      name: 'Electronics Department Audit',
      type: 'audit',
      status: 'in_progress',
      priority: 'high',
      location: 'Store A',
      zone: 'Electronics',
      totalItems: 320,
      countedItems: 156,
      pendingItems: 164,
      discrepancies: 5,
      accuracy: 96.8,
      startDate: '2024-03-14',
      dueDate: '2024-03-16',
      assignedTo: [
        { id: 2, name: 'Jane Smith', avatar: null, initials: 'JS' },
        { id: 6, name: 'Lisa Chen', avatar: null, initials: 'LC' },
      ],
      createdBy: 'Mike Johnson',
      createdAt: '2024-03-13',
      tags: ['electronics', 'audit', 'store-a'],
      progress: 49,
    },
    {
      id: 'STK-2024-006',
      name: 'Furniture Section Count',
      type: 'cycle',
      status: 'on_hold',
      priority: 'medium',
      location: 'Warehouse B',
      zone: 'Furniture',
      totalItems: 210,
      countedItems: 98,
      pendingItems: 112,
      discrepancies: 2,
      accuracy: 98.0,
      startDate: '2024-03-10',
      dueDate: '2024-03-15',
      assignedTo: [
        { id: 7, name: 'David Lee', avatar: null, initials: 'DL' },
      ],
      createdBy: 'Sarah Wilson',
      createdAt: '2024-03-09',
      tags: ['furniture', 'warehouse-b', 'cycle'],
      progress: 47,
    },
    {
      id: 'STK-2024-007',
      name: 'Perishables Quick Count',
      type: 'spot',
      status: 'completed',
      priority: 'high',
      location: 'Store C',
      zone: 'Perishables',
      totalItems: 85,
      countedItems: 85,
      pendingItems: 0,
      discrepancies: 1,
      accuracy: 98.8,
      startDate: '2024-03-13',
      dueDate: '2024-03-13',
      assignedTo: [
        { id: 8, name: 'Emma Watson', avatar: null, initials: 'EW' },
      ],
      createdBy: 'Tom Brown',
      createdAt: '2024-03-12',
      completedAt: '2024-03-13',
      tags: ['perishables', 'quick-count', 'store-c'],
      progress: 100,
    },
    {
      id: 'STK-2024-008',
      name: 'Receiving Area Verification',
      type: 'audit',
      status: 'in_progress',
      priority: 'medium',
      location: 'Warehouse A',
      zone: 'Receiving',
      totalItems: 180,
      countedItems: 120,
      pendingItems: 60,
      discrepancies: 4,
      accuracy: 96.7,
      startDate: '2024-03-15',
      dueDate: '2024-03-16',
      assignedTo: [
        { id: 1, name: 'John Doe', avatar: null, initials: 'JD' },
        { id: 9, name: 'Anna Taylor', avatar: null, initials: 'AT' },
      ],
      createdBy: 'Jane Smith',
      createdAt: '2024-03-14',
      tags: ['receiving', 'verification', 'warehouse-a'],
      progress: 67,
    },
  ];

  // Sample stocktake items for details view
  const stocktakeItems = [
    { id: 1, sku: 'PRD-001', name: 'Product A', expectedQty: 150, countedQty: 148, variance: -2, status: 'discrepancy', location: 'A-01-01', category: 'Electronics' },
    { id: 2, sku: 'PRD-002', name: 'Product B', expectedQty: 75, countedQty: 75, variance: 0, status: 'matched', location: 'A-01-02', category: 'Electronics' },
    { id: 3, sku: 'PRD-003', name: 'Product C', expectedQty: 200, countedQty: 200, variance: 0, status: 'matched', location: 'B-02-01', category: 'Furniture' },
    { id: 4, sku: 'PRD-004', name: 'Product D', expectedQty: 25, countedQty: 24, variance: -1, status: 'discrepancy', location: 'C-03-04', category: 'Clothing' },
    { id: 5, sku: 'PRD-005', name: 'Product E', expectedQty: 500, countedQty: 502, variance: +2, status: 'discrepancy', location: 'B-02-05', category: 'Food' },
    { id: 6, sku: 'PRD-006', name: 'Product F', expectedQty: 40, countedQty: 40, variance: 0, status: 'matched', location: 'A-01-06', category: 'Electronics' },
    { id: 7, sku: 'PRD-007', name: 'Product G', expectedQty: 120, countedQty: 120, variance: 0, status: 'matched', location: 'C-03-07', category: 'Clothing' },
    { id: 8, sku: 'PRD-008', name: 'Product H', expectedQty: 300, countedQty: 298, variance: -2, status: 'discrepancy', location: 'B-02-08', category: 'Furniture' },
  ];

  // Team members for assignment
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Stocktake Lead', avatar: null, initials: 'JD', activeCount: 2, completedCount: 15 },
    { id: 2, name: 'Jane Smith', role: 'Counter', avatar: null, initials: 'JS', activeCount: 1, completedCount: 23 },
    { id: 3, name: 'Mike Johnson', role: 'Counter', avatar: null, initials: 'MJ', activeCount: 1, completedCount: 18 },
    { id: 4, name: 'Sarah Wilson', role: 'Supervisor', avatar: null, initials: 'SW', activeCount: 2, completedCount: 31 },
    { id: 5, name: 'Tom Brown', role: 'Counter', avatar: null, initials: 'TB', activeCount: 1, completedCount: 12 },
    { id: 6, name: 'Lisa Chen', role: 'Counter', avatar: null, initials: 'LC', activeCount: 1, completedCount: 8 },
    { id: 7, name: 'David Lee', role: 'Counter', avatar: null, initials: 'DL', activeCount: 1, completedCount: 14 },
    { id: 8, name: 'Emma Watson', role: 'Counter', avatar: null, initials: 'EW', activeCount: 0, completedCount: 6 },
    { id: 9, name: 'Anna Taylor', role: 'Counter', avatar: null, initials: 'AT', activeCount: 1, completedCount: 4 },
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', zones: ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'] },
    { id: 'wh-b', name: 'Warehouse B', zones: ['Zone 1', 'Zone 2', 'Zone 3'] },
    { id: 'wh-c', name: 'Warehouse C', zones: ['Zone 1', 'Zone 2'] },
    { id: 'store-a', name: 'Store A', zones: ['Electronics', 'Clothing', 'Home'] },
    { id: 'store-b', name: 'Store B', zones: ['All Zones'] },
    { id: 'store-c', name: 'Store C', zones: ['Perishables', 'Non-perishables'] },
  ];

  // Status configuration
  const statusConfig = {
    scheduled: { label: 'Scheduled', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertCircle },
    in_progress: { label: 'In Progress', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: RefreshCw },
    on_hold: { label: 'On Hold', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Pause },
    completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: Ban },
  };

  const priorityConfig = {
    high: { label: 'High', color: 'bg-red-50 text-red-700' },
    medium: { label: 'Medium', color: 'bg-yellow-50 text-yellow-700' },
    low: { label: 'Low', color: 'bg-green-50 text-green-700' },
  };

  const typeConfig = {
    full: { label: 'Full Count', icon: Package },
    cycle: { label: 'Cycle Count', icon: RefreshCw },
    spot: { label: 'Spot Check', icon: Target },
    audit: { label: 'Audit', icon: FileCheck },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || AlertCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-50 text-gray-700';
  };

  const filteredStocktakes = stocktakes.filter(stocktake => {
    const matchesStatus = selectedStatus === 'all' || stocktake.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || stocktake.location === selectedLocation;
    const matchesSearch = stocktake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stocktake.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stocktake.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesLocation && matchesSearch;
  });

  const stats = {
    total: stocktakes.length,
    inProgress: stocktakes.filter(s => s.status === 'in_progress').length,
    scheduled: stocktakes.filter(s => s.status === 'scheduled').length,
    completed: stocktakes.filter(s => s.status === 'completed').length,
    pending: stocktakes.filter(s => s.status === 'pending').length,
    totalItems: stocktakes.reduce((sum, s) => sum + s.totalItems, 0),
    countedItems: stocktakes.reduce((sum, s) => sum + s.countedItems, 0),
    discrepancies: stocktakes.reduce((sum, s) => sum + s.discrepancies, 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Manage Stocktake</h1>
            <p className="text-black/50 mt-1">Create, manage, and monitor physical inventory counts</p>
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
              New Stocktake
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Stocktakes</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <ClipboardList size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">In Progress</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.inProgress}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <RefreshCw size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Scheduled</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.scheduled}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Calendar size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Completed</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.completed}</p>
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
                  <p className="text-xs text-black/50">Items Counted</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.countedItems.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-[#F5EEE9] rounded-full">
                  <Package size={18} className="text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Discrepancies</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.discrepancies}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertTriangle size={18} className="text-red-600" />
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
              placeholder="Search stocktakes by name, ID, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

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

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
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

      {/* Stocktake Cards/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredStocktakes.map((stocktake) => {
            const StatusIcon = statusConfig[stocktake.status]?.icon || AlertCircle;
            const TypeIcon = typeConfig[stocktake.type]?.icon || Package;
            
            return (
              <Card key={stocktake.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Badge className={cn("text-xs border-0", getStatusColor(stocktake.status))}>
                          <StatusIcon className="mr-1" size={12} />
                          {statusConfig[stocktake.status]?.label}
                        </Badge>
                        <Badge className={cn("text-xs border-0 ml-2", getPriorityColor(stocktake.priority))}>
                          {priorityConfig[stocktake.priority]?.label}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
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
                          {stocktake.status !== 'completed' && stocktake.status !== 'cancelled' && (
                            <>
                              {stocktake.status === 'scheduled' && (
                                <DropdownMenuItem>
                                  <Play className="mr-2 h-4 w-4" />
                                  Start
                                </DropdownMenuItem>
                              )}
                              {stocktake.status === 'in_progress' && (
                                <DropdownMenuItem>
                                  <Pause className="mr-2 h-4 w-4" />
                                  Pause
                                </DropdownMenuItem>
                              )}
                              {stocktake.status === 'on_hold' && (
                                <DropdownMenuItem>
                                  <Play className="mr-2 h-4 w-4" />
                                  Resume
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Complete
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <h3 className="font-semibold text-black mt-2">{stocktake.name}</h3>
                    <p className="text-xs text-black/50 mt-1">{stocktake.id}</p>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <TypeIcon size={14} className="text-red-600" />
                      <span className="text-xs text-black capitalize">{stocktake.type}</span>
                      <MapPin size={14} className="text-black/30 ml-2" />
                      <span className="text-xs text-black/50">{stocktake.location}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-black/50">Progress</span>
                      <span className="text-xs font-medium text-black">{stocktake.progress}%</span>
                    </div>
                    <Progress 
                      value={stocktake.progress} 
                      className="h-2 bg-[#F5EEE9]"
                      style={{ 
                        '--progress-background': stocktake.progress === 100 ? '#22c55e' : '#ef4444' 
                      } }
                    />
                    
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div>
                        <p className="text-xs text-black/50">Counted</p>
                        <p className="text-sm font-medium text-black">{stocktake.countedItems.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Total</p>
                        <p className="text-sm font-medium text-black">{stocktake.totalItems.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Discrepancies</p>
                        <p className="text-sm font-medium text-red-600">{stocktake.discrepancies}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Accuracy</p>
                        <p className="text-sm font-medium text-green-600">{stocktake.accuracy}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F5EEE9]">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-black/30" />
                        <span className="text-xs text-black/50">Due: {stocktake.dueDate}</span>
                      </div>
                      <div className="flex items-center -space-x-2">
                        {stocktake.assignedTo.slice(0, 3).map((user) => (
                          <Avatar key={user.id} className="h-6 w-6 border-2 border-white">
                            <AvatarFallback className="text-[10px] bg-red-600 text-white">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {stocktake.assignedTo.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-[#F5EEE9] flex items-center justify-center text-[10px] font-medium border-2 border-white">
                            +{stocktake.assignedTo.length - 3}
                          </div>
                        )}
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
                  <TableHead className="text-black/50">ID</TableHead>
                  <TableHead className="text-black/50">Name</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50 text-right">Progress</TableHead>
                  <TableHead className="text-black/50 text-right">Counted</TableHead>
                  <TableHead className="text-black/50 text-right">Total</TableHead>
                  <TableHead className="text-black/50 text-right">Discrepancies</TableHead>
                  <TableHead className="text-black/50">Due Date</TableHead>
                  <TableHead className="text-black/50">Assignees</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocktakes.map((stocktake) => {
                  const StatusIcon = statusConfig[stocktake.status]?.icon || AlertCircle;
                  const TypeIcon = typeConfig[stocktake.type]?.icon || Package;
                  
                  return (
                    <TableRow key={stocktake.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-mono text-xs">{stocktake.id}</TableCell>
                      <TableCell className="font-medium">{stocktake.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TypeIcon size={12} className="text-red-600" />
                          <span className="text-sm capitalize">{stocktake.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(stocktake.status))}>
                          <StatusIcon className="mr-1" size={10} />
                          {statusConfig[stocktake.status]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getPriorityColor(stocktake.priority))}>
                          {priorityConfig[stocktake.priority]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{stocktake.location}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Progress value={stocktake.progress} className="w-16 h-2 bg-[#F5EEE9]" />
                          <span className="text-xs">{stocktake.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{stocktake.countedItems.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{stocktake.totalItems.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={stocktake.discrepancies > 0 ? 'text-red-600 font-medium' : ''}>
                          {stocktake.discrepancies}
                        </span>
                      </TableCell>
                      <TableCell>{stocktake.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center -space-x-2">
                          {stocktake.assignedTo.slice(0, 2).map((user) => (
                            <Avatar key={user.id} className="h-6 w-6 border-2 border-white">
                              <AvatarFallback className="text-[8px] bg-red-600 text-white">
                                {user.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {stocktake.assignedTo.length > 2 && (
                            <div className="h-6 w-6 rounded-full bg-[#F5EEE9] flex items-center justify-center text-[8px] font-medium border-2 border-white">
                              +{stocktake.assignedTo.length - 2}
                            </div>
                          )}
                        </div>
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
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-[#F5EEE9] p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-black/50">
                Showing {filteredStocktakes.length} of {stocktakes.length} stocktakes
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

      {/* Create Stocktake Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Stocktake</DialogTitle>
            <DialogDescription>
              Set up a new physical inventory count
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Stocktake Name</Label>
                <Input placeholder="e.g., Monthly Warehouse Count" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select defaultValue="full">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Count</SelectItem>
                    <SelectItem value="cycle">Cycle Count</SelectItem>
                    <SelectItem value="spot">Spot Check</SelectItem>
                    <SelectItem value="audit">Audit</SelectItem>
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
                      <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Zone</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    <SelectItem value="zone1">Zone 1</SelectItem>
                    <SelectItem value="zone2">Zone 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Assign Team Members</Label>
              <div className="border border-[#F5EEE9] rounded-lg p-3">
                <div className="grid grid-cols-2 gap-2">
                  {teamMembers.slice(0, 6).map((member) => (
                    <div key={member.id} className="flex items-center space-x-2">
                      <Checkbox id={`member-${member.id}`} />
                      <Label htmlFor={`member-${member.id}`} className="text-sm">
                        {member.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <RadioGroup defaultValue="medium" className="flex gap-4">
                {['High', 'Medium', 'Low'].map((priority) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <RadioGroupItem value={priority.toLowerCase()} id={priority} />
                    <Label htmlFor={priority}>{priority}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Add any additional notes or instructions" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Stocktake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Team Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Team Members</DialogTitle>
            <DialogDescription>
              Select team members for this stocktake
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
              <Input placeholder="Search team members..." className="pl-10" />
            </div>

            <ScrollArea className="h-96">
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg hover:bg-[#F5EEE9]/30">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-red-600 text-white">{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-black">{member.name}</p>
                        <p className="text-xs text-black/50">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-[#F5EEE9]">
                        Active: {member.activeCount}
                      </Badge>
                      <Checkbox />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Assign Selected
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scan Dialog */}
      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Scan Items</DialogTitle>
            <DialogDescription>
              Use scanner to count items quickly
            </DialogDescription>
          </DialogHeader>

          <div className="py-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-[#F5EEE9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Scan size={40} className="text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Ready to Scan</h3>
              <p className="text-sm text-black/50 mb-6">
                Position barcode or QR code in front of camera
              </p>
              <div className="flex items-center justify-center gap-4 mb-4">
                <Badge className="bg-[#F5EEE9] text-black">Barcode</Badge>
                <Badge className="bg-[#F5EEE9] text-black">QR Code</Badge>
                <Badge className="bg-[#F5EEE9] text-black">RFID</Badge>
              </div>
              <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-8 mb-4">
                <Camera size={48} className="mx-auto text-black/30" />
                <p className="text-xs text-black/30 mt-2">Camera preview would appear here</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" className="border-[#F5EEE9]">
                  <QrCode size={16} className="mr-2" />
                  QR Code
                </Button>
                <Button variant="outline" className="border-[#F5EEE9]">
                  <Barcode size={16} className="mr-2" />
                  Barcode
                </Button>
                <Button variant="outline" className="border-[#F5EEE9]">
                  <Radio size={16} className="mr-2" />
                  RFID
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScanDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Start Scanning
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Actions Bar */}
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
            <TooltipContent side="left">New Stocktake</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowAssignDialog(true)}
              >
                <Users size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Assign Team</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ManageStocktakePage;