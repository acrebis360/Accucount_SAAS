// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Package,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  DollarSign,
  Users,
  Boxes,
  Activity,
  Download,
  RefreshCw,
  MoreVertical,
  ChevronRight,
  CalendarDays,
  Timer,
  Target,
  Award,
  Scan,
  Truck,
  Warehouse,
  Search,
  ChevronDown,
  Building,
  Store,
  Hash,
  PlayCircle,
  CalendarClock,
  History,
  CheckSquare,
  ClipboardCheck,
  AlertCircle as AlertCircleIcon,
  Settings, // Add this
  FileText,
  Zap,
  Bell,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart as ReLineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { useRouter } from 'next/navigation';

// Mock Data
const MOCK_DATA = {
  // KPI Data
  kpis: {
    totalInventoryValue: 1250000,
    inventoryValueChange: '+8.5',
    totalItems: 38420,
    itemsChange: '+12.3',
    stocktakeAccuracy: 99.2,
    accuracyChange: '+1.8',
    pendingDiscrepancies: 12,
    discrepanciesChange: '-23.5',
    activeStocktakes: 3,
    stocktakesChange: '+2',
    totalStocktakes: 142,
    stocktakesGrowth: '+18.5',
  },

  // Event Stats
  eventStats: {
    currentEvents: 3,
    upcomingEvents: 5,
    completedEvents: 12,
    totalScanned: 12450
  },

  // Chart Data
  inventoryTrend: [
    { date: 'Dec 15', count: 12450, accuracy: 98.5 },
    { date: 'Dec 16', count: 12480, accuracy: 98.7 },
    { date: 'Dec 17', count: 12520, accuracy: 99.0 },
    { date: 'Dec 18', count: 12560, accuracy: 99.2 },
    { date: 'Dec 19', count: 12580, accuracy: 99.4 },
    { date: 'Dec 20', count: 12600, accuracy: 99.5 },
    { date: 'Dec 21', count: 12650, accuracy: 99.6 },
  ],

  stocktakePerformance: [
    { name: 'Jan', completed: 12, accuracy: 98.2 },
    { name: 'Feb', completed: 15, accuracy: 98.5 },
    { name: 'Mar', completed: 18, accuracy: 98.8 },
    { name: 'Apr', completed: 20, accuracy: 99.0 },
    { name: 'May', completed: 22, accuracy: 99.1 },
    { name: 'Jun', completed: 25, accuracy: 99.3 },
    { name: 'Jul', completed: 28, accuracy: 99.4 },
    { name: 'Aug', completed: 30, accuracy: 99.5 },
    { name: 'Sep', completed: 32, accuracy: 99.6 },
    { name: 'Oct', completed: 35, accuracy: 99.7 },
    { name: 'Nov', completed: 38, accuracy: 99.8 },
    { name: 'Dec', completed: 42, accuracy: 99.9 },
  ],

  inventoryDistribution: [
    { name: 'Electronics', value: 35, color: '#ef4444' },
    { name: 'Furniture', value: 20, color: '#f97316' },
    { name: 'Apparel', value: 18, color: '#eab308' },
    { name: 'Food', value: 15, color: '#22c55e' },
    { name: 'Medical', value: 7, color: '#06b6d4' },
    { name: 'Others', value: 5, color: '#8b5cf6' },
  ],

  locationPerformance: [
    { name: 'Warehouse A', accuracy: 99.2, efficiency: 94 },
    { name: 'Warehouse B', accuracy: 98.8, efficiency: 92 },
    { name: 'Warehouse C', accuracy: 99.5, efficiency: 96 },
    { name: 'Store A', accuracy: 98.5, efficiency: 88 },
    { name: 'Store B', accuracy: 98.2, efficiency: 85 },
    { name: 'Cold Storage', accuracy: 99.1, efficiency: 91 },
  ],

  discrepancyTrend: [
    { date: 'Week 1', resolved: 20, pending: 4 },
    { date: 'Week 2', resolved: 24, pending: 4 },
    { date: 'Week 3', resolved: 20, pending: 2 },
    { date: 'Week 4', resolved: 17, pending: 1 },
    { date: 'Week 5', resolved: 14, pending: 1 },
    { date: 'Week 6', resolved: 12, pending: 0 },
  ],

  recentStocktakes: [
    { id: 'ST-2024-001', name: 'Year-End Physical Count', date: '2024-12-15', status: 'completed', accuracy: 99.3, location: 'Main Warehouse' },
    { id: 'ST-2024-002', name: 'Zone A - Electronics', date: '2024-12-10', status: 'completed', accuracy: 99.33, location: 'Zone A' },
    { id: 'ST-2024-003', name: 'Cycle Count - High Value', date: '2024-12-05', status: 'completed', accuracy: 99.62, location: 'Vault' },
    { id: 'ST-2024-006', name: 'Rapid Cycle - Fast Movers', date: '2024-12-18', status: 'in_progress', accuracy: 99.45, location: 'Picking Zone' },
  ],

  topLocations: [
    { name: 'Warehouse C', accuracy: 99.5, trend: '+2.3%' },
    { name: 'Warehouse A', accuracy: 99.2, trend: '+1.8%' },
    { name: 'Cold Storage', accuracy: 99.1, trend: '+1.2%' },
    { name: 'Warehouse B', accuracy: 98.8, trend: '+0.9%' },
    { name: 'Store A', accuracy: 98.5, trend: '+0.5%' },
  ],

  alerts: [
    { id: 1, title: 'Low Stock Alert', message: 'Product A below reorder point', priority: 'high', time: '10 min ago' },
    { id: 2, title: 'Batch Expiry Warning', message: 'BATCH-005 expires in 10 days', priority: 'medium', time: '1 hour ago' },
    { id: 3, title: 'Sync Failed', message: 'ERP connection timeout', priority: 'critical', time: '2 hours ago' },
    { id: 4, title: 'Device Offline', message: 'RFID Scanner #RF-1042 offline', priority: 'medium', time: '3 hours ago' },
  ],

  events: {
    live: [
      { id: "evt-001", uniqueId: "EVT-2024-001", name: "Annual Inventory Count 2024", status: "live", datetime: "2024-03-25T09:00:00Z", customerName: "Apple Singapore", storeName: "Orchard Road Store", location: "Singapore", totalUsers: 12, progress: 50 },
      { id: "evt-002", uniqueId: "EVT-2024-002", name: "Electronics Quarterly Audit", status: "live", datetime: "2024-03-20T10:00:00Z", customerName: "Samsung Electronics", storeName: "Jurong East Store", location: "Singapore", totalUsers: 8, progress: 51 },
      { id: "evt-003", uniqueId: "EVT-2024-003", name: "Clothing Store Inventory", status: "live", datetime: "2024-03-22T11:30:00Z", customerName: "Zara Retail", storeName: "VivoCity Store", location: "Singapore", totalUsers: 6, progress: 100 },
    ],
    upcoming: [
      { id: "evt-004", uniqueId: "EVT-2024-004", name: "Furniture Warehouse Audit", status: "upcoming", datetime: "2024-04-05T08:00:00Z", customerName: "IKEA Singapore", storeName: "Tampines Store", location: "Singapore", totalUsers: 10, progress: 0 },
      { id: "evt-005", uniqueId: "EVT-2024-005", name: "Sports Equipment Stock Take", status: "upcoming", datetime: "2024-04-10T09:00:00Z", customerName: "Decathlon", storeName: "Sports Hub", location: "Singapore", totalUsers: 7, progress: 0 },
      { id: "evt-006", uniqueId: "EVT-2024-006", name: "Grocery Store Count", status: "upcoming", datetime: "2024-04-15T10:00:00Z", customerName: "FairPrice", storeName: "Jurong Point", location: "Singapore", totalUsers: 15, progress: 0 },
    ],
    completed: [
      { id: "evt-009", uniqueId: "EVT-2023-001", name: "Year-End Inventory 2023", status: "completed", datetime: "2023-12-15T09:00:00Z", customerName: "Apple Singapore", storeName: "Orchard Road Store", location: "Singapore", totalUsers: 12, progress: 100 },
      { id: "evt-010", uniqueId: "EVT-2023-002", name: "Quarterly Electronics Review", status: "completed", datetime: "2023-11-10T10:00:00Z", customerName: "Samsung Electronics", storeName: "Jurong East Store", location: "Singapore", totalUsers: 8, progress: 100 },
    ],
  },

  bottomStats: [
    { icon: Scan, label: "Today's Counts", value: "2,450", color: "text-red-600", bgColor: "bg-red-50" },
    { icon: Truck, label: "Pending Transfers", value: "8", color: "text-blue-600", bgColor: "bg-blue-50" },
    { icon: Users, label: "Active Users", value: "24", color: "text-green-600", bgColor: "bg-green-50" },
    { icon: Boxes, label: "Low Stock Items", value: "12", color: "text-orange-600", bgColor: "bg-orange-50" },
    { icon: Calendar, label: "Upcoming Expiries", value: "45", color: "text-purple-600", bgColor: "bg-purple-50" },
  ]
};

const DashboardPage = () => {
  const router = useRouter();
  const [dateRange, setDateRange] = useState('week');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedEventTypes, setExpandedEventTypes] = useState({
    live: true,
    upcoming: false,
    completed: false,
  });

  const getStatusBadge = (status) => {
    const config = {
      completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: RefreshCw },
      live: { label: 'Live', color: 'bg-green-100 text-green-700', icon: PlayCircle },
      upcoming: { label: 'Upcoming', color: 'bg-blue-100 text-blue-700', icon: CalendarClock },
      scheduled: { label: 'Scheduled', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    };
    const cfg = config[status] || config.completed;
    const Icon = cfg.icon;
    return (
      <Badge className={cn("border-0 flex items-center gap-1", cfg.color)}>
        <Icon size={12} />
        {cfg.label}
      </Badge>
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setSearchQuery("");
      setStatusFilter("all");
    }, 1500);
  };

  const handleEventClick = (event) => {
    if (event.status === 'live') {
      router.push(`/dashboard/live/event-dashboard/${event.id}`);
    }
  };

  const toggleEventType = (type) => {
    setExpandedEventTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Filter events
  const getFilteredEvents = (events) => {
    return events.filter(event => {
      const matchesSearch = searchQuery === "" ||
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.storeName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || event.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  };

  const filteredLiveEvents = getFilteredEvents(MOCK_DATA.events.live);
  const filteredUpcomingEvents = getFilteredEvents(MOCK_DATA.events.upcoming);
  const filteredCompletedEvents = getFilteredEvents(MOCK_DATA.events.completed);

  const eventCategories = [
    { id: 'live', title: 'Live Events', icon: PlayCircle, color: 'text-green-600', bgColor: 'bg-green-100', count: filteredLiveEvents.length, events: filteredLiveEvents, totalUsers: filteredLiveEvents.reduce((sum, e) => sum + e.totalUsers, 0) },
    { id: 'upcoming', title: 'Upcoming Events', icon: CalendarClock, color: 'text-blue-600', bgColor: 'bg-blue-100', count: filteredUpcomingEvents.length, events: filteredUpcomingEvents, totalUsers: filteredUpcomingEvents.reduce((sum, e) => sum + e.totalUsers, 0) },
    { id: 'completed', title: 'Completed Events', icon: CheckCircle, color: 'text-gray-600', bgColor: 'bg-gray-100', count: filteredCompletedEvents.length, events: filteredCompletedEvents, totalUsers: filteredCompletedEvents.reduce((sum, e) => sum + e.totalUsers, 0) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 rounded-md">
      {/* Header */}
      <div className=" z-10  border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back! Here's what's happening with your inventory today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px] shadow-md">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse} >
                <SelectTrigger className="w-[150px] shadow-md">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="wh-a">Warehouse A</SelectItem>
                  <SelectItem value="wh-b">Warehouse B</SelectItem>
                  <SelectItem value="wh-c">Warehouse C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-0 text-black shadow-md"
            >
              <RefreshCw size={18} className={cn(refreshing && "animate-spin")} />
            </Button>
            <Button className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-0 text-black shadow-md">
              <Download size={16} className="mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI Cards Row 1 - Inventory Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="border-gray-200 hover:shadow-md transition-all overflow-hidden relative bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Total Inventory Value</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">${MOCK_DATA.kpis.totalInventoryValue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{MOCK_DATA.kpis.inventoryValueChange}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
      <DollarSign size={120} className="text-red-600" />
    </div> */}
          </Card>

          <Card className="border-gray-200 hover:shadow-md transition-all overflow-hidden relative bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Total Items Counted</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{MOCK_DATA.kpis.totalItems.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{MOCK_DATA.kpis.itemsChange}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
      <Package size={120} className="text-blue-600" />
    </div> */}
          </Card>

          <Card className="border-gray-200 hover:shadow-md transition-all overflow-hidden relative  bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Stocktake Accuracy</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{MOCK_DATA.kpis.stocktakeAccuracy}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{MOCK_DATA.kpis.accuracyChange}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
      <Target size={120} className="text-green-600" />
    </div> */}
          </Card>

          <Card className="border-gray-200 hover:shadow-md transition-all overflow-hidden relative bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Pending Discrepancies</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">{MOCK_DATA.kpis.pendingDiscrepancies}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{MOCK_DATA.kpis.discrepanciesChange}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
      <AlertTriangle size={120} className="text-orange-600" />
    </div> */}
          </Card>

          <Card className="border-gray-200 hover:shadow-md transition-all overflow-hidden relative bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Active Stocktakes</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{MOCK_DATA.kpis.activeStocktakes}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{MOCK_DATA.kpis.stocktakesChange}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
      <ClipboardList size={120} className="text-purple-600" />
    </div> */}
          </Card>

          <Card className="border-gray-200 hover:shadow-md transition-all overflow-hidden relative bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Total Stocktakes</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{MOCK_DATA.kpis.totalStocktakes}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{MOCK_DATA.kpis.stocktakesGrowth}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
      <Activity size={120} className="text-teal-600" />
    </div> */}
          </Card>
        </div>

        {/* KPI Cards Row 2 - Event Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-gray-200 hover:shadow-md transition-all bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Current Events</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{MOCK_DATA.eventStats.currentEvents}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <PlayCircle size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-md transition-all bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Upcoming Events</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{MOCK_DATA.eventStats.upcomingEvents}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <CalendarClock size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-md transition-all bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Completed Events</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{MOCK_DATA.eventStats.completedEvents}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <CheckSquare size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-md transition-all bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Scanned</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{MOCK_DATA.eventStats.totalScanned.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Scan size={24} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section - Single Horizontal Bar */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-gray-200 p-3 shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">Quick Actions:</span>
            </div>

            <div className="flex items-center gap-6">
              <Button variant="ghost" className="h-9 px-3 hover:bg-white/50 rounded-lg gap-2 cursor-pointer">
                <Calendar size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Schedule Event</span>
              </Button>

              <div className="w-px h-6 bg-gray-300"></div>

              <Button variant="ghost" className="h-9 px-3 hover:bg-white/50 rounded-lg gap-2 cursor-pointer">
                <Settings size={16} className="text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Setup</span>
              </Button>

              <div className="w-px h-6 bg-gray-300"></div>

              <Button variant="ghost" className="h-9 px-3 hover:bg-white/50 rounded-lg gap-2 cursor-pointer">
                <PlayCircle size={16} className="text-green-600" />
                <span className="text-sm font-medium text-gray-700">Go Live</span>
              </Button>

              <div className="w-px h-6 bg-gray-300"></div>

              <Button variant="ghost" className="h-9 px-3 hover:bg-white/50 rounded-lg gap-2 cursor-pointer">
                <FileText size={16} className="text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Tutorial</span>
              </Button>
            </div>

            <Button className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-0 text-black shadow-md cursor-pointer">
              Notifications
              <Bell size={14} className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inventory Trend Chart */}
          <Card className="border-gray-200 lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Inventory Trend</CardTitle>
                  <CardDescription>Items counted and accuracy over time</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Export Data</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={MOCK_DATA.inventoryTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis yAxisId="left" stroke="#9ca3af" />
                  <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                  <ReTooltip />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="count" fill="#fee2e2" stroke="#ef4444" name="Items Counted" />
                  <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#22c55e" name="Accuracy %" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Inventory Distribution */}
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Inventory Distribution</CardTitle>
              <CardDescription>By category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RePieChart>
                  <Pie
                    data={MOCK_DATA.inventoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {MOCK_DATA.inventoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ReTooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {MOCK_DATA.inventoryDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-600">{item.name}</span>
                    <span className="text-xs font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Stocktake Performance</CardTitle>
              <CardDescription>Monthly completed stocktakes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={MOCK_DATA.stocktakePerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ReTooltip />
                  <Bar dataKey="completed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Completed Stocktakes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Accuracy Trend</CardTitle>
              <CardDescription>Stocktake accuracy over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <ReLineChart data={MOCK_DATA.stocktakePerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis domain={[95, 100]} stroke="#9ca3af" />
                  <ReTooltip />
                  <Line type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 4 }} name="Accuracy %" />
                </ReLineChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Current Accuracy</span>
                  <span className="text-2xl font-bold text-green-700">99.2%</span>
                </div>
                <Progress value={99.2} className="h-2 mt-2 bg-green-200" />
                <p className="text-xs text-green-600 mt-2">↑ 1.8% improvement from last quarter</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Discrepancy Resolution</CardTitle>
              <CardDescription>Weekly resolution trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={MOCK_DATA.discrepancyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ReTooltip />
                  <Bar dataKey="resolved" fill="#22c55e" name="Resolved" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="#eab308" name="Pending" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Location Performance & Recent Stocktakes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Location Performance</CardTitle>
              <CardDescription>Accuracy and efficiency by location</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={MOCK_DATA.locationPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" domain={[80, 100]} stroke="#9ca3af" />
                  <YAxis type="category" dataKey="name" stroke="#9ca3af" width={100} />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#ef4444" name="Accuracy %" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="efficiency" fill="#22c55e" name="Efficiency %" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Recent Stocktakes</CardTitle>
                  <CardDescription>Latest inventory counts</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600">
                  View All
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_DATA.recentStocktakes.map((stocktake) => (
                  <div key={stocktake.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        stocktake.status === 'completed' ? "bg-green-100" : "bg-blue-100"
                      )}>
                        {stocktake.status === 'completed' ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : (
                          <RefreshCw size={16} className="text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{stocktake.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{stocktake.date}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{stocktake.location}</span>
                          <span className="text-xs font-medium text-green-600">{stocktake.accuracy}%</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(stocktake.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Management Section */}
        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <ClipboardCheck className="h-6 w-6 text-red-600" />
                  Events Management
                </CardTitle>
                <CardDescription className="mt-1">
                  Click on any live event to view stock take actions
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:flex-none sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="live">Live Events</SelectItem>
                    <SelectItem value="upcoming">Upcoming Events</SelectItem>
                    <SelectItem value="completed">Completed Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4">
              {eventCategories.map((category) => (
                <div key={category.id} className="border-b border-gray-100 last:border-0">
                  {/* Category Header */}
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleEventType(category.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {expandedEventTypes[category.id] ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </Button>
                      <div className={cn("p-2 rounded-lg", category.bgColor)}>
                        <category.icon className={cn("h-5 w-5", category.color)} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.title}</h3>
                        <p className="text-sm text-gray-500">
                          {category.id === "live" ? "Currently active events" :
                            category.id === "upcoming" ? "Scheduled future events" :
                              "Completed events"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{category.count}</div>
                        <div className="text-xs text-gray-500">events</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{category.totalUsers}</div>
                        <div className="text-xs text-gray-500">users</div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedEventTypes[category.id] && (
                    <div className="px-4 pb-4">
                      {category.events.length > 0 ? (
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="font-medium">Event ID</TableHead>
                                <TableHead className="font-medium">Event Name</TableHead>
                                <TableHead className="font-medium">Date & Time</TableHead>
                                <TableHead className="font-medium">Customer</TableHead>
                                <TableHead className="font-medium">Store</TableHead>
                                <TableHead className="font-medium">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {category.events.map((event) => (
                                <TableRow
                                  key={event.id}
                                  className={cn(
                                    "transition-colors",
                                    event.status === 'live' && "cursor-pointer hover:bg-green-50"
                                  )}
                                  onClick={() => handleEventClick(event)}
                                >
                                  <TableCell>
                                    <span className="font-mono text-sm">{event.uniqueId}</span>
                                  </TableCell>
                                  <TableCell>
                                    <div className="font-medium text-gray-900">{event.name}</div>
                                    {event.status === 'live' && (
                                      <div className="text-xs text-green-600 mt-1">Click to open actions</div>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <div className="text-sm text-gray-900">
                                      {new Date(event.datetime).toLocaleDateString()}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {new Date(event.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Building className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm text-gray-900">{event.customerName}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Store className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm text-gray-900">{event.storeName}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>{getStatusBadge(event.status)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h4 className="font-semibold text-gray-900 mb-2">No Events Found</h4>
                          <p className="text-gray-600 text-sm">No events match your current search criteria.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-200 p-4">
            <div className="text-sm text-gray-600">
              Showing {eventCategories.reduce((sum, cat) => sum + cat.count, 0)} events across {eventCategories.length} categories
            </div>
          </CardFooter>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performing Locations */}
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Top Performing Locations</CardTitle>
              <CardDescription>Highest accuracy rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_DATA.topLocations.map((location, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                        <Award size={14} className="text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{location.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Accuracy: {location.accuracy}%</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">{location.trend}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Active Alerts</CardTitle>
                  <CardDescription>Requires attention</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_DATA.alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className={cn(
                      "p-1.5 rounded-full",
                      alert.priority === 'critical' ? "bg-red-100" :
                        alert.priority === 'high' ? "bg-orange-100" : "bg-yellow-100"
                    )}>
                      {alert.priority === 'critical' ? (
                        <AlertCircleIcon size={12} className="text-red-600" />
                      ) : (
                        <AlertTriangle size={12} className="text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                        <span className="text-xs text-gray-400">{alert.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Quick Insights</CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={14} className="text-red-600" />
                      <span className="text-xs text-gray-500">Accuracy Goal</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">99.5%</p>
                    <Progress value={92} className="h-1.5 mt-2" />
                    <p className="text-xs text-green-600 mt-1">0.3% to target</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} className="text-blue-600" />
                      <span className="text-xs text-gray-500">Avg. Stocktake Time</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">2.4 hrs</p>
                    <p className="text-xs text-green-600 mt-1">↓ 15% faster</p>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-red-50 to-transparent rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Next Scheduled Stocktake</span>
                    <CalendarDays size={14} className="text-red-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">December Cycle Count</p>
                  <p className="text-xs text-gray-500 mt-1">Scheduled for Dec 20, 2024</p>
                  <Button variant="link" className="p-0 h-auto mt-2 text-red-600">
                    View Details
                    <ChevronRight size={14} className="ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MOCK_DATA.bottomStats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all">
              <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;