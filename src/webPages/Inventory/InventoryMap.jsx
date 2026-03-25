// app/dashboard/inventory-map/page.js
'use client';

import { useState } from 'react';
import {
  Map,
  MapPin,
  Navigation,
  Navigation2,
  Package,
  Warehouse,
  Store,
  Building2,
  Layers,
  Search,
  Filter,
  RefreshCw,
  Download,
  Printer,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Compass,
  Layers as LayersIcon,
  Map as MapIcon,
  Grid,
  List,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Boxes,
  DollarSign,
  Percent,
  Target,
  Calendar,
  User,
  Phone,
  Mail as MailIcon,
  ExternalLink,
  Info,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Thermometer,
  ThermometerSun,
  ThermometerSnowflake,
  Wifi,
  WifiOff,
  Battery,
  BatteryFull,
  BatteryWarning,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const InventoryMapPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(10);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showClusters, setShowClusters] = useState(true);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [viewMode, setViewMode] = useState('map');
  const [mapStyle, setMapStyle] = useState('standard');

  // Location data with coordinates
  const locations = [
    {
      id: 'LOC-001',
      name: 'TechMart Downtown',
      type: 'retail',
      customer: 'TechMart Inc.',
      address: '123 Main Street, Downtown, New York, NY 10001',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      manager: 'John Anderson',
      managerPhone: '+1 (212) 555-0123',
      status: 'active',
      inventoryValue: 1250000,
      totalItems: 12450,
      accuracy: 99.2,
      lastStocktake: '2024-12-15',
      nextStocktake: '2025-01-15',
      zoneCount: 4,
      binCount: 48,
      lowStockItems: 8,
      outOfStockItems: 2,
      expiryAlert: 5,
      recentActivity: 'Stocktake completed with 99.2% accuracy',
      image: null,
      operatingHours: '9:00 AM - 9:00 PM',
      timezone: 'EST',
    },
    {
      id: 'LOC-002',
      name: 'TechMart Westside',
      type: 'retail',
      customer: 'TechMart Inc.',
      address: '456 West Avenue, Westside, New York, NY 10024',
      coordinates: { lat: 40.7831, lng: -73.9712 },
      manager: 'Sarah Chen',
      managerPhone: '+1 (212) 555-0456',
      status: 'active',
      inventoryValue: 875000,
      totalItems: 8750,
      accuracy: 98.8,
      lastStocktake: '2024-12-10',
      nextStocktake: '2025-01-10',
      zoneCount: 3,
      binCount: 36,
      lowStockItems: 5,
      outOfStockItems: 1,
      expiryAlert: 2,
      recentActivity: 'Zone A count completed',
      image: null,
      operatingHours: '10:00 AM - 8:00 PM',
      timezone: 'EST',
    },
    {
      id: 'LOC-003',
      name: 'Global Mart - Eastside',
      type: 'warehouse',
      customer: 'Global Retail Group',
      address: '789 East Street, Eastside, Los Angeles, CA 90001',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      manager: 'Michael Roberts',
      managerPhone: '+1 (323) 555-0789',
      status: 'active',
      inventoryValue: 3200000,
      totalItems: 25600,
      accuracy: 99.5,
      lastStocktake: '2024-12-05',
      nextStocktake: '2025-01-05',
      zoneCount: 6,
      binCount: 96,
      lowStockItems: 12,
      outOfStockItems: 3,
      expiryAlert: 8,
      recentActivity: 'Quarterly audit completed',
      image: null,
      operatingHours: '24/7',
      timezone: 'PST',
    },
    {
      id: 'LOC-004',
      name: 'Fresh Foods Warehouse',
      type: 'cold_storage',
      customer: 'Food Distributors Inc.',
      address: '567 Industrial Park, Chicago, IL 60601',
      coordinates: { lat: 41.8781, lng: -87.6298 },
      manager: 'David Kim',
      managerPhone: '+1 (312) 555-0456',
      status: 'active',
      inventoryValue: 1890000,
      totalItems: 8950,
      accuracy: 99.1,
      lastStocktake: '2024-12-12',
      nextStocktake: '2025-01-12',
      zoneCount: 5,
      binCount: 40,
      lowStockItems: 6,
      outOfStockItems: 1,
      expiryAlert: 15,
      recentActivity: 'Temperature monitoring active',
      image: null,
      operatingHours: '6:00 AM - 10:00 PM',
      timezone: 'CST',
    },
    {
      id: 'LOC-005',
      name: 'Fashion Hub - Downtown',
      type: 'retail',
      customer: 'Fashion Wholesale Ltd.',
      address: '890 Fashion Avenue, Downtown, Miami, FL 33101',
      coordinates: { lat: 25.7617, lng: -80.1918 },
      manager: 'Lisa Wong',
      managerPhone: '+1 (305) 555-0789',
      status: 'active',
      inventoryValue: 680000,
      totalItems: 5420,
      accuracy: 98.5,
      lastStocktake: '2024-12-08',
      nextStocktake: '2025-01-08',
      zoneCount: 3,
      binCount: 32,
      lowStockItems: 4,
      outOfStockItems: 0,
      expiryAlert: 0,
      recentActivity: 'New inventory received',
      image: null,
      operatingHours: '10:00 AM - 9:00 PM',
      timezone: 'EST',
    },
    {
      id: 'LOC-006',
      name: 'MediCare Distribution Center',
      type: 'warehouse',
      customer: 'Medical Supplies Inc.',
      address: '456 Health Drive, Dallas, TX 75201',
      coordinates: { lat: 32.7767, lng: -96.7970 },
      manager: 'Robert Taylor',
      managerPhone: '+1 (214) 555-0456',
      status: 'active',
      inventoryValue: 4250000,
      totalItems: 32500,
      accuracy: 99.7,
      lastStocktake: '2024-12-01',
      nextStocktake: '2025-01-01',
      zoneCount: 8,
      binCount: 128,
      lowStockItems: 3,
      outOfStockItems: 0,
      expiryAlert: 12,
      recentActivity: 'Batch tracking active',
      image: null,
      operatingHours: '24/7',
      timezone: 'CST',
    },
    {
      id: 'LOC-007',
      name: 'TechMart Brooklyn',
      type: 'retail',
      customer: 'TechMart Inc.',
      address: '234 Brooklyn Ave, Brooklyn, NY 11201',
      coordinates: { lat: 40.6782, lng: -73.9442 },
      manager: 'James Wilson',
      managerPhone: '+1 (718) 555-0123',
      status: 'pending',
      inventoryValue: 0,
      totalItems: 0,
      accuracy: 0,
      lastStocktake: null,
      nextStocktake: null,
      zoneCount: 2,
      binCount: 24,
      lowStockItems: 0,
      outOfStockItems: 0,
      expiryAlert: 0,
      recentActivity: 'Location setup in progress',
      image: null,
      operatingHours: '10:00 AM - 7:00 PM',
      timezone: 'EST',
    },
    {
      id: 'LOC-008',
      name: 'Global Mart - Northridge',
      type: 'warehouse',
      customer: 'Global Retail Group',
      address: '321 North Boulevard, Northridge, Los Angeles, CA 91324',
      coordinates: { lat: 34.2353, lng: -118.5318 },
      manager: 'Emily Watson',
      managerPhone: '+1 (818) 555-0123',
      status: 'maintenance',
      inventoryValue: 1450000,
      totalItems: 18300,
      accuracy: 97.8,
      lastStocktake: '2024-11-20',
      nextStocktake: '2024-12-20',
      zoneCount: 4,
      binCount: 64,
      lowStockItems: 15,
      outOfStockItems: 5,
      expiryAlert: 3,
      recentActivity: 'System maintenance in progress',
      image: null,
      operatingHours: '8:00 AM - 6:00 PM',
      timezone: 'PST',
    },
  ];

  // Region data for filtering
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'northeast', name: 'Northeast', locations: ['New York'] },
    { id: 'midwest', name: 'Midwest', locations: ['Chicago'] },
    { id: 'south', name: 'South', locations: ['Miami', 'Dallas'] },
    { id: 'west', name: 'West', locations: ['Los Angeles'] },
  ];

  // Type configuration
  const typeConfig = {
    retail: { label: 'Retail Store', color: 'bg-blue-100 text-blue-700', icon: Store },
    warehouse: { label: 'Warehouse', color: 'bg-purple-100 text-purple-700', icon: Warehouse },
    cold_storage: { label: 'Cold Storage', color: 'bg-cyan-100 text-cyan-700', icon: ThermometerSnowflake },
  };

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    pending: { label: 'Pending Setup', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    maintenance: { label: 'Maintenance', color: 'bg-orange-100 text-orange-700', icon: AlertTriangle },
  };

  const getTypeIcon = (type) => {
    const config = typeConfig[type] || typeConfig.retail;
    const Icon = config.icon;
    return <Icon size={16} />;
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

  // Filter locations
  const filteredLocations = locations.filter(location => {
    const matchesSearch = 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || location.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || location.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Statistics
  const stats = {
    totalLocations: locations.length,
    totalInventoryValue: locations.reduce((sum, l) => sum + l.inventoryValue, 0),
    totalItems: locations.reduce((sum, l) => sum + l.totalItems, 0),
    avgAccuracy: (locations.filter(l => l.accuracy > 0).reduce((sum, l) => sum + l.accuracy, 0) / locations.filter(l => l.accuracy > 0).length).toFixed(1),
    lowStockTotal: locations.reduce((sum, l) => sum + l.lowStockItems, 0),
    activeLocations: locations.filter(l => l.status === 'active').length,
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 3));

  // Mock map component (in real app, use react-leaflet or google maps)
  const MapComponent = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      {/* Map Grid Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      
      {/* Map Markers */}
      {filteredLocations.map((location) => {
        // Calculate position relative to zoom level (simplified for demo)
        const centerX = 50;
        const centerY = 50;
        const offsetX = (location.coordinates.lng + 74) * 2;
        const offsetY = (location.coordinates.lat - 40) * 10;
        
        return (
          <div
            key={location.id}
            className="absolute cursor-pointer transition-all hover:scale-110"
            style={{
              left: `${centerX + offsetX}%`,
              top: `${centerY + offsetY}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => {
              setSelectedLocation(location);
              setShowDetailsDialog(true);
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white",
                      location.type === 'retail' ? "bg-blue-500" :
                      location.type === 'warehouse' ? "bg-purple-500" : "bg-cyan-500"
                    )}>
                      {getTypeIcon(location.type)}
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
                    </div>
                    {showClusters && location.lowStockItems > 0 && (
                      <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                        {location.lowStockItems}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="text-xs">
                    <p className="font-semibold">{location.name}</p>
                    <p>Value: ${(location.inventoryValue / 1000).toFixed(0)}K</p>
                    <p>Accuracy: {location.accuracy}%</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button size="icon" variant="secondary" className="bg-white shadow-md" onClick={handleZoomIn}>
          <ZoomIn size={16} />
        </Button>
        <Button size="icon" variant="secondary" className="bg-white shadow-md" onClick={handleZoomOut}>
          <ZoomOut size={16} />
        </Button>
        <Button size="icon" variant="secondary" className="bg-white shadow-md">
          <Compass size={16} />
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <p className="text-xs font-semibold mb-2">Map Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-xs">Retail Store</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500" />
            <span className="text-xs">Warehouse</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-cyan-500" />
            <span className="text-xs">Cold Storage</span>
          </div>
          <Separator className="my-1" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs">Low Stock Alert</span>
          </div>
        </div>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md px-3 py-1 text-xs">
        Zoom: {zoomLevel}x
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Inventory Map</h1>
            <p className="text-black/50 text-sm mt-1">
              Visualize inventory across all locations with interactive mapping
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-[#F5EEE9] gap-2">
              <Download size={16} />
              Export Map
            </Button>
            <Button variant="outline" className="border-[#F5EEE9] gap-2">
              <Printer size={16} />
              Print
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
              <RefreshCw size={16} />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Locations</p>
                  <p className="text-xl font-bold text-black">{stats.totalLocations}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <MapPin size={16} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Inventory Value</p>
                  <p className="text-xl font-bold text-black">${(stats.totalInventoryValue / 1000000).toFixed(1)}M</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <DollarSign size={16} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Items</p>
                  <p className="text-xl font-bold text-black">{stats.totalItems.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Package size={16} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg. Accuracy</p>
                  <p className="text-xl font-bold text-green-600">{stats.avgAccuracy}%</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <Target size={16} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Low Stock Alerts</p>
                  <p className="text-xl font-bold text-orange-600">{stats.lowStockTotal}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <AlertTriangle size={16} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Locations</p>
                  <p className="text-xl font-bold text-black">{stats.activeLocations}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Building2 size={16} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
              <Input
                placeholder="Search by location name, customer, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-[#F5EEE9] focus:border-red-600"
              />
            </div>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[140px] border-[#F5EEE9]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px] border-[#F5EEE9]">
                <SelectValue placeholder="Location Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="retail">Retail Store</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
                <SelectItem value="cold_storage">Cold Storage</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[130px] border-[#F5EEE9]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending Setup</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="border-[#F5EEE9]">
              <Filter size={16} />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-2">
              <span className="text-xs text-black/50">Heatmap</span>
              <Switch checked={showHeatmap} onCheckedChange={setShowHeatmap} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-black/50">Clusters</span>
              <Switch checked={showClusters} onCheckedChange={setShowClusters} />
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-1 bg-[#F5EEE9] rounded-lg p-0.5">
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className={cn("h-8 px-3", viewMode === 'map' && "bg-red-600 text-white hover:bg-red-700")}
              >
                <MapIcon size={14} className="mr-1" />
                Map
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn("h-8 px-3", viewMode === 'list' && "bg-red-600 text-white hover:bg-red-700")}
              >
                <List size={14} className="mr-1" />
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Map Container */}
            <div className="col-span-2">
              <Card className="border-[#F5EEE9] h-[600px] overflow-hidden">
                <CardContent className="p-0 h-full">
                  <MapComponent />
                </CardContent>
              </Card>
            </div>

            {/* Location List Panel */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-black">Nearby Locations</h3>
                <p className="text-xs text-black/50">{filteredLocations.length} locations</p>
              </div>
              {filteredLocations.map((location) => (
                <Card
                  key={location.id}
                  className="border-[#F5EEE9] cursor-pointer hover:shadow-md transition-all"
                  onClick={() => {
                    setSelectedLocation(location);
                    setShowDetailsDialog(true);
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-full",
                          location.type === 'retail' ? "bg-blue-100" :
                          location.type === 'warehouse' ? "bg-purple-100" : "bg-cyan-100"
                        )}>
                          {getTypeIcon(location.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{location.name}</h4>
                            {getStatusBadge(location.status)}
                          </div>
                          <p className="text-xs text-black/50 mt-0.5">{location.customer}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                              <Package size={10} className="text-black/40" />
                              <span className="text-xs">{location.totalItems.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target size={10} className="text-black/40" />
                              <span className="text-xs text-green-600">{location.accuracy}%</span>
                            </div>
                            {location.lowStockItems > 0 && (
                              <div className="flex items-center gap-1">
                                <AlertTriangle size={10} className="text-orange-500" />
                                <span className="text-xs text-orange-600">{location.lowStockItems}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronRight size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredLocations.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MapPin size={48} className="text-black/20 mb-3" />
                  <p className="text-black/50">No locations found</p>
                  <p className="text-xs text-black/40 mt-1">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F5EEE9]/30 border-b border-[#F5EEE9]">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Location</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Type</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Customer</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Address</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-black/50">Items</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-black/50">Value</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-black/50">Accuracy</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-black/50">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLocations.map((location) => (
                      <tr
                        key={location.id}
                        className="border-b border-[#F5EEE9] hover:bg-[#F5EEE9]/30 cursor-pointer"
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowDetailsDialog(true);
                        }}
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-sm">{location.name}</p>
                            <p className="text-xs text-black/40">{location.id}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {getTypeIcon(location.type)}
                            <span className="text-sm">{typeConfig[location.type]?.label}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{location.customer}</td>
                        <td className="py-3 px-4 text-sm max-w-[200px] truncate">{location.address}</td>
                        <td className="py-3 px-4 text-right text-sm">{location.totalItems.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-sm">${(location.inventoryValue / 1000).toFixed(0)}K</td>
                        <td className="py-3 px-4 text-right">
                          <span className={cn("text-sm font-medium", location.accuracy >= 99 ? "text-green-600" : "text-orange-600")}>
                            {location.accuracy}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">{getStatusBadge(location.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLocations.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MapPin size={48} className="text-black/20 mb-3" />
                  <p className="text-black/50">No locations found</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Location Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          {selectedLocation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(selectedLocation.type)}
                    <span>{selectedLocation.name}</span>
                  </div>
                  {getStatusBadge(selectedLocation.status)}
                </DialogTitle>
                <DialogDescription>
                  {selectedLocation.id} | {selectedLocation.customer}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                      <p className="text-xs text-black/50">Total Items</p>
                      <p className="text-xl font-bold">{selectedLocation.totalItems.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                      <p className="text-xs text-black/50">Inventory Value</p>
                      <p className="text-xl font-bold">${(selectedLocation.inventoryValue / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                      <p className="text-xs text-black/50">Zones / Bins</p>
                      <p className="text-xl font-bold">{selectedLocation.zoneCount} / {selectedLocation.binCount}</p>
                    </div>
                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                      <p className="text-xs text-black/50">Stocktake Accuracy</p>
                      <p className="text-xl font-bold text-green-600">{selectedLocation.accuracy}%</p>
                    </div>
                  </div>

                  <div className="p-3 border border-[#F5EEE9] rounded-lg">
                    <p className="text-sm font-medium mb-2">Address</p>
                    <p className="text-sm text-black/70 flex items-start gap-2">
                      <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                      {selectedLocation.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                      <AlertTriangle size={14} className="text-yellow-600" />
                      <div>
                        <p className="text-xs text-black/50">Low Stock Items</p>
                        <p className="font-semibold">{selectedLocation.lowStockItems}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                      <AlertTriangle size={14} className="text-red-600" />
                      <div>
                        <p className="text-xs text-black/50">Out of Stock</p>
                        <p className="font-semibold">{selectedLocation.outOfStockItems}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                      <Calendar size={14} className="text-orange-600" />
                      <div>
                        <p className="text-xs text-black/50">Expiry Alerts</p>
                        <p className="font-semibold">{selectedLocation.expiryAlert}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <Clock size={14} className="text-blue-600" />
                      <div>
                        <p className="text-xs text-black/50">Operating Hours</p>
                        <p className="text-xs font-semibold">{selectedLocation.operatingHours}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="inventory" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-[#F5EEE9] rounded-lg text-center">
                      <p className="text-xs text-black/50">Total SKUs</p>
                      <p className="text-lg font-bold">{(selectedLocation.totalItems * 0.3).toFixed(0)}</p>
                    </div>
                    <div className="p-3 bg-[#F5EEE9] rounded-lg text-center">
                      <p className="text-xs text-black/50">Categories</p>
                      <p className="text-lg font-bold">12</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Stock Level</span>
                      <span className="text-green-600">Good</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex justify-between text-xs text-black/50">
                      <span>Low Stock Threshold: 10%</span>
                      <span>Current: 75%</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <Button className="flex-1 bg-red-600 hover:bg-red-700">
                      <Package size={14} className="mr-2" />
                      View Inventory
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <ClipboardList size={14} className="mr-2" />
                      Start Stocktake
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4 mt-4">
                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 bg-red-100">
                        <AvatarFallback className="bg-red-100 text-red-600">
                          {selectedLocation.manager?.split(' ').map(n => n[0]).join('') || 'M'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedLocation.manager || 'Not Assigned'}</p>
                        <p className="text-xs text-black/50">Outlet Manager</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2">
                      <Phone size={14} className="text-black/40" />
                      <span className="text-sm">{selectedLocation.managerPhone || 'Not provided'}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-2 p-2">
                      <Mail size={14} className="text-black/40" />
                      <span className="text-sm">{selectedLocation.manager?.toLowerCase().replace(' ', '.')}@company.com</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1">
                      <Phone size={14} className="mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Mail size={14} className="mr-2" />
                      Email
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-3 mt-4">
                  <div className="flex items-start gap-3 p-3 bg-[#F5EEE9] rounded-lg">
                    <div className="p-1.5 bg-green-100 rounded-full">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm">Last Stocktake Completed</p>
                      <p className="text-xs text-black/50">{selectedLocation.lastStocktake || 'Never'} • Accuracy: {selectedLocation.accuracy}%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#F5EEE9] rounded-lg">
                    <div className="p-1.5 bg-blue-100 rounded-full">
                      <Calendar size={12} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm">Next Stocktake Scheduled</p>
                      <p className="text-xs text-black/50">{selectedLocation.nextStocktake || 'Not scheduled'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#F5EEE9] rounded-lg">
                    <div className="p-1.5 bg-orange-100 rounded-full">
                      <Activity size={12} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm">Recent Activity</p>
                      <p className="text-xs text-black/50">{selectedLocation.recentActivity}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Navigation size={14} className="mr-2" />
                  Get Directions
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};


export default InventoryMapPage;