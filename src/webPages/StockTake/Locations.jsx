// app/dashboard/locations/page.js
'use client';

import { useState } from 'react';
import {
  MapPin,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Printer,
  Mail,
  Grid,
  List,
  CheckCircle,
  AlertTriangle,
  Clock,
  Building2,
  User,
  Phone,
  Mail as MailIcon,
  Calendar,
  Package,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Map,
  Navigation,
  Store,
  Users,
  PhoneCall,
  Globe,
  Pin,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Check,
  X,
  AlertCircle,
  Settings,
  FileSpreadsheet,
  FileJson,
  File,
  Layers,
  Activity,
  BarChart3,
  DollarSign,
  Truck,
  Warehouse,
  Scan,
  Bell,
  DownloadCloud,
  UploadCloud,
  Copy,
  ExternalLink,
  Star,
  StarOff,
  Flag,
  Navigation2,
  Home,
  Building,
  Circle,
  PlusCircle,
  MinusCircle,
  Zap,
  Shield,
  Clock as ClockIcon,
  Users as UsersIcon,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const LocationsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showBulkAssignDialog, setShowBulkAssignDialog] = useState(false);
  const [showStocktakeSetupDialog, setShowStocktakeSetupDialog] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const itemsPerPage = 6;

  // Sample location data with all required fields
  const locations = [
    {
      id: 'LOC-001',
      customer: 'TechMart Inc.',
      storeName: 'TechMart Downtown',
      storeAddress: '123 Main Street, Downtown, New York, NY 10001',
      outletManager: 'John Anderson',
      managerPhone: '+1 (212) 555-0123',
      managerEmail: 'john.anderson@techmart.com',
      status: 'active',
      type: 'retail',
      zoneCount: 4,
      binCount: 48,
      lastStocktake: '2024-12-15',
      nextStocktake: '2025-01-15',
      accuracy: 99.2,
      totalItems: 12450,
      createdAt: '2024-01-15',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      operatingHours: '9:00 AM - 9:00 PM',
      timezone: 'EST',
    },
    {
      id: 'LOC-002',
      customer: 'TechMart Inc.',
      storeName: 'TechMart Westside',
      storeAddress: '456 West Avenue, Westside, New York, NY 10024',
      outletManager: 'Sarah Chen',
      managerPhone: '+1 (212) 555-0456',
      managerEmail: 'sarah.chen@techmart.com',
      status: 'active',
      type: 'retail',
      zoneCount: 3,
      binCount: 36,
      lastStocktake: '2024-12-10',
      nextStocktake: '2025-01-10',
      accuracy: 98.8,
      totalItems: 8750,
      createdAt: '2024-02-20',
      coordinates: { lat: 40.7831, lng: -73.9712 },
      operatingHours: '10:00 AM - 8:00 PM',
      timezone: 'EST',
    },
    {
      id: 'LOC-003',
      customer: 'Global Retail Group',
      storeName: 'Global Mart - Eastside',
      storeAddress: '789 East Street, Eastside, Los Angeles, CA 90001',
      outletManager: 'Michael Roberts',
      managerPhone: '+1 (323) 555-0789',
      managerEmail: 'michael.roberts@globalretail.com',
      status: 'active',
      type: 'warehouse',
      zoneCount: 6,
      binCount: 96,
      lastStocktake: '2024-12-05',
      nextStocktake: '2025-01-05',
      accuracy: 99.5,
      totalItems: 25600,
      createdAt: '2024-03-10',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      operatingHours: '24/7',
      timezone: 'PST',
    },
    {
      id: 'LOC-004',
      customer: 'Global Retail Group',
      storeName: 'Global Mart - Northridge',
      storeAddress: '321 North Boulevard, Northridge, Los Angeles, CA 91324',
      outletManager: 'Emily Watson',
      managerPhone: '+1 (818) 555-0123',
      managerEmail: 'emily.watson@globalretail.com',
      status: 'inactive',
      type: 'warehouse',
      zoneCount: 4,
      binCount: 64,
      lastStocktake: '2024-11-20',
      nextStocktake: '2024-12-20',
      accuracy: 97.8,
      totalItems: 18300,
      createdAt: '2024-04-05',
      coordinates: { lat: 34.2353, lng: -118.5318 },
      operatingHours: '8:00 AM - 6:00 PM',
      timezone: 'PST',
    },
    {
      id: 'LOC-005',
      customer: 'Food Distributors Inc.',
      storeName: 'Fresh Foods Warehouse',
      storeAddress: '567 Industrial Park, Chicago, IL 60601',
      outletManager: 'David Kim',
      managerPhone: '+1 (312) 555-0456',
      managerEmail: 'david.kim@fooddist.com',
      status: 'active',
      type: 'cold_storage',
      zoneCount: 5,
      binCount: 40,
      lastStocktake: '2024-12-12',
      nextStocktake: '2025-01-12',
      accuracy: 99.1,
      totalItems: 8950,
      createdAt: '2024-05-18',
      coordinates: { lat: 41.8781, lng: -87.6298 },
      operatingHours: '6:00 AM - 10:00 PM',
      timezone: 'CST',
    },
    {
      id: 'LOC-006',
      customer: 'Fashion Wholesale Ltd.',
      storeName: 'Fashion Hub - Downtown',
      storeAddress: '890 Fashion Avenue, Downtown, Miami, FL 33101',
      outletManager: 'Lisa Wong',
      managerPhone: '+1 (305) 555-0789',
      managerEmail: 'lisa.wong@fashionwholesale.com',
      status: 'active',
      type: 'retail',
      zoneCount: 3,
      binCount: 32,
      lastStocktake: '2024-12-08',
      nextStocktake: '2025-01-08',
      accuracy: 98.5,
      totalItems: 5420,
      createdAt: '2024-06-22',
      coordinates: { lat: 25.7617, lng: -80.1918 },
      operatingHours: '10:00 AM - 9:00 PM',
      timezone: 'EST',
    },
    {
      id: 'LOC-007',
      customer: 'TechMart Inc.',
      storeName: 'TechMart Brooklyn',
      storeAddress: '234 Brooklyn Ave, Brooklyn, NY 11201',
      outletManager: 'James Wilson',
      managerPhone: '+1 (718) 555-0123',
      managerEmail: 'james.wilson@techmart.com',
      status: 'pending',
      type: 'retail',
      zoneCount: 2,
      binCount: 24,
      lastStocktake: null,
      nextStocktake: null,
      accuracy: 0,
      totalItems: 0,
      createdAt: '2024-12-01',
      coordinates: { lat: 40.6782, lng: -73.9442 },
      operatingHours: '10:00 AM - 7:00 PM',
      timezone: 'EST',
    },
    {
      id: 'LOC-008',
      customer: 'Medical Supplies Inc.',
      storeName: 'MediCare Distribution Center',
      storeAddress: '456 Health Drive, Dallas, TX 75201',
      outletManager: 'Robert Taylor',
      managerPhone: '+1 (214) 555-0456',
      managerEmail: 'robert.taylor@medicare.com',
      status: 'active',
      type: 'warehouse',
      zoneCount: 8,
      binCount: 128,
      lastStocktake: '2024-12-01',
      nextStocktake: '2025-01-01',
      accuracy: 99.7,
      totalItems: 32500,
      createdAt: '2024-07-30',
      coordinates: { lat: 32.7767, lng: -96.7970 },
      operatingHours: '24/7',
      timezone: 'CST',
    },
  ];

  // Customer list for filter
  const customers = [
    { id: 'all', name: 'All Customers' },
    { id: 'techmart', name: 'TechMart Inc.' },
    { id: 'global', name: 'Global Retail Group' },
    { id: 'food', name: 'Food Distributors Inc.' },
    { id: 'fashion', name: 'Fashion Wholesale Ltd.' },
    { id: 'medical', name: 'Medical Supplies Inc.' },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle },
    pending: { label: 'Pending Setup', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
    maintenance: { label: 'Maintenance', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: AlertTriangle },
  };

  // Location type configuration
  const typeConfig = {
    retail: { label: 'Retail Store', color: 'bg-blue-100 text-blue-700', icon: Store },
    warehouse: { label: 'Warehouse', color: 'bg-purple-100 text-purple-700', icon: Warehouse },
    cold_storage: { label: 'Cold Storage', color: 'bg-cyan-100 text-cyan-700', icon: Snowflake },
    distribution: { label: 'Distribution Center', color: 'bg-indigo-100 text-indigo-700', icon: Truck },
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={12} />
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    const config = typeConfig[type] || typeConfig.retail;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={cn("flex items-center gap-1", config.color)}>
        <Icon size={12} />
        {config.label}
      </Badge>
    );
  };

  // Filter logic
  const filteredLocations = locations.filter(location => {
    const matchesSearch = 
      location.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.storeAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.outletManager?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || location.status === selectedStatus;
    const matchesCustomer = selectedCustomer === 'all' || location.customer === selectedCustomer;
    return matchesSearch && matchesStatus && matchesCustomer;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const paginatedData = filteredLocations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = {
    totalLocations: locations.length,
    activeLocations: locations.filter(l => l.status === 'active').length,
    pendingSetup: locations.filter(l => l.status === 'pending').length,
    totalZones: locations.reduce((sum, l) => sum + l.zoneCount, 0),
    totalBins: locations.reduce((sum, l) => sum + l.binCount, 0),
    avgAccuracy: (locations.filter(l => l.accuracy > 0).reduce((sum, l) => sum + l.accuracy, 0) / locations.filter(l => l.accuracy > 0).length).toFixed(1),
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredLocations.map(l => l.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Location Management</h1>
            <p className="text-black/50 mt-1">Manage store locations and stocktake setup</p>
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
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileJson className="mr-2 h-4 w-4 text-blue-600" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <File className="mr-2 h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Labels
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
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Add Location
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Locations</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalLocations}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Store size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Locations</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.activeLocations}</p>
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
                  <p className="text-xs text-black/50">Pending Setup</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.pendingSetup}</p>
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
                  <p className="text-xs text-black/50">Total Zones</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalZones}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Layers size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Bins</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalBins}</p>
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
                  <p className="text-xs text-black/50">Avg. Accuracy</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.avgAccuracy}%</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <Target size={18} className="text-green-600" />
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
              placeholder="Search by store name, customer, address, or manager..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map(customer => (
                <SelectItem key={customer.id} value={customer.id === 'all' ? 'all' : customer.name}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[140px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending Setup</SelectItem>
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

      {/* Locations Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {paginatedData.map((location) => {
            const TypeIcon = typeConfig[location.type]?.icon || Store;
            
            return (
              <Card key={location.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(location.status)}
                          {getTypeBadge(location.type)}
                        </div>
                        <h3 className="font-semibold text-black">{location.storeName}</h3>
                        <p className="text-xs text-black/50 mt-1">{location.id}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedLocation(location);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedLocation(location);
                            setShowEditDialog(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Location
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedLocation(location);
                            setShowStocktakeSetupDialog(true);
                          }}>
                            <ClipboardList className="mr-2 h-4 w-4" />
                            Setup Stocktake
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                            setSelectedLocation(location);
                            setShowDeleteDialog(true);
                          }}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-xs text-black/50 mt-2 flex items-center gap-1">
                      <Building2 size={12} />
                      {location.customer}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="space-y-3">
                      {/* Address */}
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-black/40 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-black/70 line-clamp-2">{location.storeAddress}</p>
                      </div>

                      {/* Manager Info */}
                      {location.outletManager && (
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-black/40" />
                          <span className="text-sm text-black/70">{location.outletManager}</span>
                        </div>
                      )}
                      {location.managerPhone && (
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-black/40" />
                          <span className="text-sm text-black/70">{location.managerPhone}</span>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="text-center p-2 bg-[#F5EEE9] rounded-lg">
                          <p className="text-xs text-black/50">Zones</p>
                          <p className="text-lg font-bold text-black">{location.zoneCount}</p>
                        </div>
                        <div className="text-center p-2 bg-[#F5EEE9] rounded-lg">
                          <p className="text-xs text-black/50">Bins</p>
                          <p className="text-lg font-bold text-black">{location.binCount}</p>
                        </div>
                      </div>

                      {/* Stocktake Info */}
                      {location.lastStocktake && (
                        <div className="p-2 bg-[#F5EEE9]/50 rounded-lg">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-black/50">Last Stocktake</span>
                            <span className="font-medium">{location.lastStocktake}</span>
                          </div>
                          {location.accuracy > 0 && (
                            <div className="flex items-center justify-between text-xs mt-1">
                              <span className="text-black/50">Accuracy</span>
                              <span className={cn("font-medium", location.accuracy >= 99 ? "text-green-600" : "text-orange-600")}>
                                {location.accuracy}%
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F5EEE9]">
                      <div className="flex items-center gap-1 text-xs text-black/50">
                        <ClockIcon size={12} />
                        Created: {location.createdAt}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowStocktakeSetupDialog(true);
                        }}
                      >
                        Setup Stocktake
                        <ChevronRight size={12} className="ml-1" />
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
                    <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
                  </TableHead>
                  <TableHead className="text-black/50">Store Name</TableHead>
                  <TableHead className="text-black/50">Customer</TableHead>
                  <TableHead className="text-black/50">Address</TableHead>
                  <TableHead className="text-black/50">Outlet Manager</TableHead>
                  <TableHead className="text-black/50">Manager Phone</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50 text-right">Zones/Bins</TableHead>
                  <TableHead className="text-black/50 text-right">Accuracy</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((location) => (
                  <TableRow key={location.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30 cursor-pointer" onClick={() => {
                    setSelectedLocation(location);
                    setShowDetailsDialog(true);
                  }}>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={selectedItems.includes(location.id)} 
                        onCheckedChange={() => handleSelectItem(location.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-black">{location.storeName}</div>
                        <div className="text-xs text-black/50">{location.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{location.customer}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{location.storeAddress}</TableCell>
                    <TableCell>{location.outletManager || '—'}</TableCell>
                    <TableCell>{location.managerPhone || '—'}</TableCell>
                    <TableCell>{getTypeBadge(location.type)}</TableCell>
                    <TableCell>{getStatusBadge(location.status)}</TableCell>
                    <TableCell className="text-right">{location.zoneCount} / {location.binCount}</TableCell>
                    <TableCell className="text-right">
                      {location.accuracy > 0 ? (
                        <span className={location.accuracy >= 99 ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                          {location.accuracy}%
                        </span>
                      ) : '—'}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedLocation(location);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedLocation(location);
                            setShowEditDialog(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedLocation(location);
                            setShowStocktakeSetupDialog(true);
                          }}>
                            <ClipboardList className="mr-2 h-4 w-4" />
                            Setup Stocktake
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
                Showing {paginatedData.length} of {filteredLocations.length} locations
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={14} />
                  Previous
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? 'bg-red-600 text-white' : ''}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && <span className="text-black/50">...</span>}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Create/Edit Location Dialog */}
      <Dialog open={showCreateDialog || showEditDialog} onOpenChange={(open) => {
        if (!open) {
          setShowCreateDialog(false);
          setShowEditDialog(false);
          setSelectedLocation(null);
        }
      }}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{showCreateDialog ? 'Add New Location' : 'Edit Location'}</DialogTitle>
            <DialogDescription>
              {showCreateDialog ? 'Add a new store location for stocktake setup' : 'Update location information'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Customer Field - Required */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Customer <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue={selectedLocation?.customer}>
                <SelectTrigger className="border-[#F5EEE9]">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TechMart Inc.">TechMart Inc.</SelectItem>
                  <SelectItem value="Global Retail Group">Global Retail Group</SelectItem>
                  <SelectItem value="Food Distributors Inc.">Food Distributors Inc.</SelectItem>
                  <SelectItem value="Fashion Wholesale Ltd.">Fashion Wholesale Ltd.</SelectItem>
                  <SelectItem value="Medical Supplies Inc.">Medical Supplies Inc.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Store Name - Required */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Store Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                placeholder="Enter store name" 
                defaultValue={selectedLocation?.storeName}
              />
            </div>

            {/* Store Address - Required */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Store Address <span className="text-red-500">*</span>
              </Label>
              <Textarea 
                placeholder="Enter complete store address" 
                rows={3}
                defaultValue={selectedLocation?.storeAddress}
              />
            </div>

            {/* Outlet Manager */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Outlet Manager</Label>
              <Input 
                placeholder="Enter manager name" 
                defaultValue={selectedLocation?.outletManager}
              />
            </div>

            {/* Manager Phone */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Manager Phone</Label>
              <Input 
                placeholder="Enter manager phone number" 
                defaultValue={selectedLocation?.managerPhone}
              />
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location Type</Label>
                <Select defaultValue={selectedLocation?.type || 'retail'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="cold_storage">Cold Storage</SelectItem>
                    <SelectItem value="distribution">Distribution Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={selectedLocation?.status || 'active'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending Setup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Number of Zones</Label>
                <Input type="number" defaultValue={selectedLocation?.zoneCount || 0} />
              </div>
              <div className="space-y-2">
                <Label>Number of Bins</Label>
                <Input type="number" defaultValue={selectedLocation?.binCount || 0} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Manager Email (Optional)</Label>
              <Input 
                type="email" 
                placeholder="Enter manager email" 
                defaultValue={selectedLocation?.managerEmail}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Operating Hours</Label>
                <Input placeholder="e.g., 9:00 AM - 9:00 PM" defaultValue={selectedLocation?.operatingHours} />
              </div>
              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select defaultValue={selectedLocation?.timezone || 'EST'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EST">EST (Eastern Time)</SelectItem>
                    <SelectItem value="CST">CST (Central Time)</SelectItem>
                    <SelectItem value="MST">MST (Mountain Time)</SelectItem>
                    <SelectItem value="PST">PST (Pacific Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowCreateDialog(false);
              setShowEditDialog(false);
            }}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              {showCreateDialog ? 'Create Location' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Location Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedLocation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedLocation.storeName}</span>
                  {getStatusBadge(selectedLocation.status)}
                </DialogTitle>
                <DialogDescription>
                  Location ID: {selectedLocation.id} | {selectedLocation.customer}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="stocktake">Stocktake Info</TabsTrigger>
                  <TabsTrigger value="zones">Zones & Bins</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-black/50">Store Address</Label>
                      <p className="text-sm">{selectedLocation.storeAddress}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-black/50">Location Type</Label>
                      <div>{getTypeBadge(selectedLocation.type)}</div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-black/50">Outlet Manager</Label>
                      <p className="text-sm flex items-center gap-2">
                        <User size={14} />
                        {selectedLocation.outletManager || 'Not assigned'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-black/50">Manager Phone</Label>
                      <p className="text-sm flex items-center gap-2">
                        <Phone size={14} />
                        {selectedLocation.managerPhone || 'Not provided'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-black/50">Manager Email</Label>
                      <p className="text-sm flex items-center gap-2">
                        <MailIcon size={14} />
                        {selectedLocation.managerEmail || 'Not provided'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-black/50">Operating Hours</Label>
                      <p className="text-sm">{selectedLocation.operatingHours || 'Not specified'}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stocktake" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                      <Label className="text-xs text-black/50">Last Stocktake</Label>
                      <p className="text-lg font-bold">{selectedLocation.lastStocktake || 'Never'}</p>
                    </div>
                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                      <Label className="text-xs text-black/50">Next Stocktake</Label>
                      <p className="text-lg font-bold">{selectedLocation.nextStocktake || 'Not scheduled'}</p>
                    </div>
                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                      <Label className="text-xs text-black/50">Average Accuracy</Label>
                      <p className="text-lg font-bold text-green-600">{selectedLocation.accuracy || 0}%</p>
                    </div>
                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                      <Label className="text-xs text-black/50">Total Items</Label>
                      <p className="text-lg font-bold">{selectedLocation.totalItems?.toLocaleString() || 0}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <ClipboardList size={16} className="mr-2" />
                    Initiate Stocktake
                  </Button>
                </TabsContent>

                <TabsContent value="zones" className="mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#F5EEE9] rounded-lg">
                      <div>
                        <p className="font-medium">Total Zones</p>
                        <p className="text-2xl font-bold">{selectedLocation.zoneCount}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Bins</p>
                        <p className="text-2xl font-bold">{selectedLocation.binCount}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus size={14} className="mr-1" />
                        Add Zone
                      </Button>
                    </div>
                    <Separator />
                    <p className="text-sm text-black/50 text-center py-4">
                      Use the Warehouse Zones page to manage zones and bins for this location.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-[#F5EEE9] rounded-lg">
                      <div className="p-2 bg-green-100 rounded-full">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Location Created</p>
                        <p className="text-xs text-black/50">{selectedLocation.createdAt}</p>
                      </div>
                    </div>
                    {selectedLocation.lastStocktake && (
                      <div className="flex items-center gap-3 p-3 bg-[#F5EEE9] rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <ClipboardList size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Last Stocktake Completed</p>
                          <p className="text-xs text-black/50">{selectedLocation.lastStocktake} • Accuracy: {selectedLocation.accuracy}%</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => {
                  setShowDetailsDialog(false);
                  setShowEditDialog(true);
                }}>
                  <Edit size={16} className="mr-2" />
                  Edit Location
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Stocktake Setup Dialog */}
      <Dialog open={showStocktakeSetupDialog} onOpenChange={setShowStocktakeSetupDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Setup Stocktake for {selectedLocation?.storeName}</DialogTitle>
            <DialogDescription>
              Configure stocktake settings for this location
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Stocktake Type</Label>
              <Select defaultValue="full">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Count</SelectItem>
                  <SelectItem value="zone">Zone Count</SelectItem>
                  <SelectItem value="cycle">Cycle Count</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Schedule Date</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Assign Team</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team1">John Anderson, Sarah Chen</SelectItem>
                  <SelectItem value="team2">Mike Roberts, Emily Watson</SelectItem>
                  <SelectItem value="team3">David Kim, Lisa Wong</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-yellow-600" />
                <span className="text-sm text-yellow-700">Stocktake Preparation</span>
              </div>
              <p className="text-xs text-yellow-600/70 mt-1">
                Ensure all inventory is organized and accessible before starting the count.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStocktakeSetupDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Schedule Stocktake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Location?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the location
              and all associated stocktake data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>
              Delete Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Actions FAB */}
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
            <TooltipContent side="left">Add Location</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowImportDialog(true)}
              >
                <UploadCloud size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Import Locations</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowBulkAssignDialog(true)}
              >
                <Users size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Bulk Assign</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

// Additional icon components
const XCircle = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const Snowflake = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="19.78" y2="19.78" />
    <line x1="19.78" y1="4.22" x2="4.22" y2="19.78" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const Target = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default LocationsPage;