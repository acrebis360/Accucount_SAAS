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
  Settings,
  FileText,
  Zap,
  Bell,
  Wallet,
  MessageCircle,
  PlusCircle,
  MapPin,
  Shield,
  Grid,
  MessageSquare,
  Video,
  FileShare,
  Users2,
  Sparkles,
  Send,
  Paperclip,
  Smile,
  X,
  ThumbsUp,
  Phone,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

// Mock Data
const MOCK_DATA = {
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

  eventWallet: {
    totalCredits: 24,
    usedCredits: 15,
    remainingCredits: 9,
    subscriptions: [
      { id: 1, name: 'Basic Plan', totalEvents: 10, usedEvents: 6, expiryDate: '2024-12-31' },
      { id: 2, name: 'Premium Add-on', totalEvents: 8, usedEvents: 4, expiryDate: '2024-11-30' },
      { id: 3, name: 'One-time Pack', totalEvents: 6, usedEvents: 5, expiryDate: '2025-01-15' },
    ]
  },

  locations: [
    { id: 1, name: 'Warehouse A', type: 'Warehouse', address: '123 Storage Rd', status: 'active', itemCount: 12450, categories: 12 },
    { id: 2, name: 'Warehouse B', type: 'Warehouse', address: '456 Logistics Ave', status: 'active', itemCount: 8920, categories: 8 },
    { id: 3, name: 'Orchard Store', type: 'Retail', address: 'Orchard Road', status: 'active', itemCount: 3450, categories: 15 },
    { id: 4, name: 'Jurong Facility', type: 'Distribution', address: 'Jurong East', status: 'inactive', itemCount: 0, categories: 0 },
  ],
  teams: [
    { id: 1, name: 'Inventory Team A', members: 8, lead: 'John Smith', activeTasks: 3, completedTasks: 12 },
    { id: 2, name: 'Stocktake Crew B', members: 12, lead: 'Sarah Johnson', activeTasks: 5, completedTasks: 18 },
    { id: 3, name: 'Audit Specialists', members: 5, lead: 'Mike Chen', activeTasks: 2, completedTasks: 9 },
    { id: 4, name: 'Quality Control', members: 6, lead: 'Lisa Wong', activeTasks: 4, completedTasks: 15 },
  ],
  inventory: {
    totalSKUs: 15420,
    categories: 24,
    lowStockItems: 12,
    outOfStockItems: 5,
    recentAdditions: 342,
    totalValue: 125430,
    totalItems: 38420,
  },

  teamCollaboration: {
    teamMembers: [
      { id: 1, name: 'John Smith', role: 'Team Lead', status: 'online', avatar: 'JS', department: 'Operations', tasks: 5 },
      { id: 2, name: 'Sarah Johnson', role: 'Senior Auditor', status: 'online', avatar: 'SJ', department: 'Audit', tasks: 3 },
      { id: 3, name: 'Mike Chen', role: 'Inventory Specialist', status: 'away', avatar: 'MC', department: 'Inventory', tasks: 7 },
      { id: 4, name: 'Lisa Wong', role: 'Quality Manager', status: 'online', avatar: 'LW', department: 'Quality', tasks: 4 },
      { id: 5, name: 'David Kumar', role: 'Scanner Operator', status: 'offline', avatar: 'DK', department: 'Operations', tasks: 2 },
      { id: 6, name: 'Emma Davis', role: 'Data Analyst', status: 'online', avatar: 'ED', department: 'Analytics', tasks: 6 },
    ],
    recentActivity: [
      { id: 1, user: 'John Smith', action: 'completed inventory count for Section A', time: '5 min ago', event: 'Annual Inventory' },
      { id: 2, user: 'Sarah Johnson', action: 'reviewed discrepancies in Electronics', time: '15 min ago', event: 'Electronics Audit' },
      { id: 3, user: 'Mike Chen', action: 'uploaded scanner data', time: '1 hour ago', event: 'Warehouse Count' },
      { id: 4, user: 'Lisa Wong', action: 'approved stock adjustments', time: '2 hours ago', event: 'Clothing Inventory' },
      { id: 5, user: 'Emma Davis', action: 'generated accuracy report', time: '3 hours ago', event: 'Monthly Report' },
    ],
    pendingTasks: [
      { id: 1, title: 'Verify Section A counts', assignee: 'John Smith', priority: 'high', dueDate: '2024-04-05' },
      { id: 2, title: 'Review scanner calibration', assignee: 'Mike Chen', priority: 'medium', dueDate: '2024-04-06' },
      { id: 3, title: 'Update inventory database', assignee: 'Emma Davis', priority: 'high', dueDate: '2024-04-04' },
      { id: 4, title: 'Prepare audit report', assignee: 'Sarah Johnson', priority: 'low', dueDate: '2024-04-07' },
    ],
    teamStats: {
      totalTasks: 27,
      completedToday: 12,
      pendingReviews: 6,
      accuracy: 98.5,
    }
  },

  teamChat: {
    activeChats: [
      {
        id: 1,
        name: 'Annual Inventory Count',
        eventId: 'evt-001',
        lastMessage: 'John: Just completed section A',
        time: '5 min ago',
        unread: 3,
        participants: ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Lisa Wong'],
        messages: [
          { id: 1, user: 'John Smith', message: 'Just completed section A', time: '10:30 AM', avatar: 'JS' },
          { id: 2, user: 'Sarah Johnson', message: 'Great! Section B is 50% done', time: '10:35 AM', avatar: 'SJ' },
          { id: 3, user: 'Mike Chen', message: 'Found some discrepancies in row 5', time: '10:42 AM', avatar: 'MC' },
          { id: 4, user: 'Lisa Wong', message: "I'll review those discrepancies", time: '10:45 AM', avatar: 'LW' },
        ]
      },
      {
        id: 2,
        name: 'Electronics Quarterly Audit',
        eventId: 'evt-002',
        lastMessage: 'Sarah: Need assistance with scanners',
        time: '15 min ago',
        unread: 5,
        participants: ['Sarah Johnson', 'Mike Chen', 'John Smith'],
        messages: [
          { id: 1, user: 'Sarah Johnson', message: 'Need assistance with scanners', time: '11:00 AM', avatar: 'SJ' },
          { id: 2, user: 'Mike Chen', message: "I'll help you with that", time: '11:05 AM', avatar: 'MC' },
        ]
      },
      {
        id: 3,
        name: 'Clothing Store Inventory',
        eventId: 'evt-003',
        lastMessage: 'Lisa: All counts verified',
        time: '1 hour ago',
        unread: 0,
        participants: ['Lisa Wong', 'John Smith'],
        messages: [
          { id: 1, user: 'Lisa Wong', message: 'All counts verified', time: '9:00 AM', avatar: 'LW' },
        ]
      },
    ],
  },

  upcomingEventsOnly: [
    { id: "evt-004", uniqueId: "EVT-2024-004", name: "Furniture Warehouse Annual Mega Audit 2026", status: "upcoming", startDate: "2026-04-05T08:00:00Z", customerName: "IKEA Singapore", storeName: "Tampines Store", location: "Singapore", totalUsers: 10, progress: 0 },
    { id: "evt-005", uniqueId: "EVT-2024-005", name: "Sports Equipment Stock Take", status: "upcoming", startDate: "2026-04-12T09:00:00Z", customerName: "Decathlon", storeName: "Sports Hub", location: "Singapore", totalUsers: 7, progress: 0 },
    { id: "evt-006", uniqueId: "EVT-2024-006", name: "Grocery Store Comprehensive Count", status: "upcoming", startDate: "2026-03-30T10:00:00Z", customerName: "FairPrice", storeName: "Jurong Point", location: "Singapore", totalUsers: 15, progress: 0 },
    { id: "evt-007", uniqueId: "EVT-2024-007", name: "Pharmacy Inventory Check", status: "upcoming", startDate: "2024-04-18T09:00:00Z", customerName: "Guardian", storeName: "Raffles City", location: "Singapore", totalUsers: 5, progress: 0 },
    { id: "evt-008", uniqueId: "EVT-2024-008", name: "Electronics Mega Stocktake", status: "upcoming", startDate: "2024-04-22T08:00:00Z", customerName: "Best Denki", storeName: "VivoCity", location: "Singapore", totalUsers: 12, progress: 0 },
    { id: "evt-009", uniqueId: "EVT-2024-009", name: "Warehouse Monthly Audit", status: "upcoming", startDate: "2024-04-25T08:30:00Z", customerName: "Ninja Van", storeName: "Changi Warehouse", location: "Singapore", totalUsers: 20, progress: 0 },
    { id: "evt-010", uniqueId: "EVT-2024-010", name: "Retail Store Inventory", status: "upcoming", startDate: "2024-05-02T09:00:00Z", customerName: "Uniqlo", storeName: "Orchard Central", location: "Singapore", totalUsers: 12, progress: 0 },
    { id: "evt-011", uniqueId: "EVT-2024-011", name: "Electronics Stock Check", status: "upcoming", startDate: "2024-05-10T10:00:00Z", customerName: "Challenger", storeName: "Funan Mall", location: "Singapore", totalUsers: 8, progress: 0 },
  ],

  activeStocktakeEvents: [
    { id: "evt-001", uniqueId: "EVT-2024-001", name: "Annual Inventory Count 2024", status: "live", startDate: "2024-03-25T09:00:00Z", customerName: "Apple Singapore", storeName: "Orchard Road Store", location: "Singapore", totalUsers: 12, progress: 50 },
    { id: "evt-002", uniqueId: "EVT-2024-002", name: "Electronics Quarterly Audit", status: "live", startDate: "2024-03-20T10:00:00Z", customerName: "Samsung Electronics", storeName: "Jurong East Store", location: "Singapore", totalUsers: 8, progress: 51 },
    { id: "evt-003", uniqueId: "EVT-2024-003", name: "Clothing Store Inventory", status: "live", startDate: "2024-03-22T11:30:00Z", customerName: "Zara Retail", storeName: "VivoCity Store", location: "Singapore", totalUsers: 6, progress: 100 },
  ],

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
  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Filter upcoming events (only future events)
  const getFilteredUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return MOCK_DATA.upcomingEventsOnly
      .filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate >= today;
      })
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  // Get events for the current month
  const getEventsForMonth = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    return getFilteredUpcomingEvents().filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate >= startOfMonth && eventDate <= endOfMonth;
    });
  };

  // Get days in month with events
  const getDaysWithEvents = () => {
    const eventsInMonth = getEventsForMonth(currentMonth);
    const daysMap = {};
    
    eventsInMonth.forEach(event => {
      const day = new Date(event.startDate).getDate();
      daysMap[day] = daysMap[day] || [];
      daysMap[day].push(event);
    });
    
    return daysMap;
  };

  const daysWithEvents = getDaysWithEvents();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

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

  const handleGoToEvent = (event) => {
    if (event.status === 'live') {
      router.push(`/dashboard/live/event-dashboard/${event.id}`);
    } else {
      router.push(`/dashboard/events/${event.id}/setup`);
    }
  };

  const handleOpenChat = (event) => {
    const chat = MOCK_DATA.teamChat.activeChats.find(c => c.eventId === event.id);
    if (chat) {
      setSelectedChat(chat);
      setIsChatDialogOpen(true);
    }
  };
  
  const handleOpenTeamChat = (member) => {
    const mockChat = {
      id: `chat-${member.id}`,
      name: `Chat with ${member.name}`,
      participants: [member.name, 'You'],
      messages: [
        { id: 1, user: member.name, message: `Hi! How can I help you with the inventory tasks?`, time: 'Just now', avatar: member.avatar }
      ]
    };
    setSelectedChat(mockChat);
    setIsChatDialogOpen(true);
  };

  const handleSetupNewStocktake = () => {
    router.push('/dashboard/events/new');
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      console.log(`Sending message to ${selectedChat.name}: ${newMessage}`);
      setNewMessage("");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const upcomingEvents = getFilteredUpcomingEvents();
  const currentMonthEvents = getEventsForMonth(currentMonth);
  const onlineMembers = MOCK_DATA.teamCollaboration.teamMembers.filter(m => m.status === 'online').length;

  const truncateText = (text, maxLength = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 rounded-md">
        {/* Header */}
        <div className="z-10 border-b border-gray-200 px-6 py-4">
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
                <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
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
          {/* Event Wallet Section */}
          <Card className="border-gray-200 overflow-hidden bg-gradient-to-br from-blue-50/50 to-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Wallet className="h-4 w-4 text-blue-600" />
                  </div>
                  <CardTitle className="text-base font-semibold">Event Wallet</CardTitle>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                  {MOCK_DATA.eventWallet.remainingCredits} Credits Remaining
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white rounded-lg p-2 border border-gray-200 shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Total Credits</p>
                  <p className="text-xl font-bold text-gray-900">{MOCK_DATA.eventWallet.totalCredits}</p>
                  <Progress value={(MOCK_DATA.eventWallet.usedCredits / MOCK_DATA.eventWallet.totalCredits) * 100} className="h-1 mt-1 bg-gray-100" />
                  <p className="text-xs text-gray-500 mt-1">{MOCK_DATA.eventWallet.usedCredits} used</p>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200 shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Used Credits</p>
                  <p className="text-xl font-bold text-gray-900">{MOCK_DATA.eventWallet.usedCredits}</p>
                  <p className="text-xs text-amber-600 mt-1">62.5% utilization</p>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200 shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Remaining Credits</p>
                  <p className="text-xl font-bold text-green-600">{MOCK_DATA.eventWallet.remainingCredits}</p>
                  <p className="text-xs text-green-600 mt-1">Available for new events</p>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <p className="text-xs font-medium text-gray-700 mb-1">Active Subscriptions</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {MOCK_DATA.eventWallet.subscriptions.map((sub) => (
                    <div key={sub.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900 text-xs">{sub.name}</p>
                        <p className="text-xs text-gray-500">Expires: {new Date(sub.expiryDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-gray-900">{sub.usedEvents}/{sub.totalEvents}</p>
                        <p className="text-xs text-gray-500">events</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area - Fixed Heights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side: Active Stocktake Events Table - Fixed Height */}
            <div className="lg:col-span-2">
              <Card className="border-gray-200 h-[532px] flex flex-col bg-gradient-to-br from-blue-50/50 to-white">
                <CardHeader className="pb-2 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <PlayCircle className="h-4 w-4 text-green-600" />
                        Active Stocktake Events
                      </CardTitle>
                      <CardDescription className="text-xs">Currently live stock counting events</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                      {MOCK_DATA.activeStocktakeEvents.length} Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pt-0 overflow-hidden">
                  {MOCK_DATA.activeStocktakeEvents.length > 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col">
                      <div className="flex-1 overflow-y-auto">
                        <Table>
                          <TableHeader className="sticky top-0 bg-gray-50">
                            <TableRow className="bg-gray-50">
                              <TableHead className="font-medium text-xs py-2">Event Name</TableHead>
                              <TableHead className="font-medium text-xs py-2">Status</TableHead>
                              <TableHead className="font-medium text-xs py-2">Start Date</TableHead>
                              <TableHead className="font-medium text-xs py-2 text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {MOCK_DATA.activeStocktakeEvents.map((event) => (
                              <TableRow key={event.id} className="hover:bg-gray-50 transition-colors">
                                <TableCell className="py-2">
                                  <div className="font-medium text-gray-900 text-sm">{event.name}</div>
                                  <div className="text-xs text-gray-500 mt-0.5">{event.customerName} • {event.storeName}</div>
                                </TableCell>
                                <TableCell className="py-2">{getStatusBadge(event.status)}</TableCell>
                                <TableCell className="py-2">
                                  <div className="text-sm text-gray-900">{formatDate(event.startDate)}</div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </TableCell>
                                <TableCell className="py-2 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-7 px-2 text-blue-600 border-blue-200 hover:bg-blue-50 text-xs"
                                      onClick={() => handleGoToEvent(event)}
                                    >
                                      <PlayCircle size={12} className="mr-1" />
                                      Go
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-7 px-2 text-purple-600 border-purple-200 hover:bg-purple-50 text-xs"
                                      onClick={() => handleOpenChat(event)}
                                    >
                                      <MessageCircle size={12} className="mr-1" />
                                      Chat
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                      <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">No Active Events</h4>
                      <p className="text-gray-600 text-xs">There are currently no live stocktake events.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Side: Calendar and Upcoming Events - Fixed Height */}
            <div className="lg:col-span-1">
              {/* New Event Button */}
              <div className="mb-4">
                <Button
                  className="w-full bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-0 text-black shadow-md"
                  onClick={handleSetupNewStocktake}
                >
                  <PlusCircle size={16} className="mr-2" />
                  Set Up New Stock Take
                </Button>
              </div>

              {/* Calendar and Upcoming Events Combined Card - Fixed Height */}
              <Card className="border-gray-200 bg-gradient-to-br from-blue-50/50 to-white h-[480px] flex flex-col">
                <CardHeader className="pb-2 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Upcoming Events
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-blue-100"
                        onClick={goToPreviousMonth}
                      >
                        <ChevronLeft size={14} />
                      </Button>
                      <span className="text-xs font-medium text-gray-700 min-w-[100px] text-center">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-blue-100"
                        onClick={goToNextMonth}
                      >
                        <ChevronRightIcon size={14} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto pt-0">
                  {/* Week Days Header */}
                  <div className="grid grid-cols-7 gap-0.5 mb-2">
                    {weekDays.map(day => (
                      <div key={day} className="text-center text-[10px] font-medium text-gray-500 py-1">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-0.5 mb-4">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square rounded-full" />
                    ))}
                    
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const hasEvents = daysWithEvents[day] && daysWithEvents[day].length > 0;
                      const events = daysWithEvents[day] || [];
                      
                      return (
                        <Tooltip key={day}>
                          <TooltipTrigger asChild>
                            <div className={cn(
                              "aspect-square flex items-center justify-center text-xs rounded-full transition-all cursor-pointer",
                              hasEvents 
                                ? "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-semibold hover:from-blue-200 hover:to-blue-300 shadow-sm" 
                                : "hover:bg-gray-100 text-gray-700"
                            )}>
                              {day}
                            </div>
                          </TooltipTrigger>
                          {hasEvents && (
                            <TooltipContent side="top" className="max-w-xs">
                              <div className="space-y-1">
                                <p className="text-xs font-semibold">{events.length} event(s)</p>
                                {events.slice(0, 2).map(e => (
                                  <p key={e.id} className="text-xs truncate">{e.name}</p>
                                ))}
                                {events.length > 2 && <p className="text-xs text-gray-500">+{events.length - 2} more</p>}
                              </div>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      );
                    })}
                  </div>

                  {/* Upcoming Events List */}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <CalendarClock className="h-3 w-3 text-blue-600" />
                        Upcoming Events
                      </h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-1.5">
                        {upcomingEvents.length}
                      </Badge>
                    </div>

                    {upcomingEvents.length > 0 ? (
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 upcoming-events-scroll">
                        {upcomingEvents.map((event) => (
                          <div key={event.id} className="p-2 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all hover:border-blue-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <p className="font-medium text-gray-900 text-xs truncate cursor-help">
                                      {truncateText(event.name, 35)}
                                    </p>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs">
                                    <p className="text-xs">{event.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center gap-1 mt-0.5 cursor-help">
                                      <Building size={10} className="text-gray-400 flex-shrink-0" />
                                      <p className="text-xs text-gray-500 truncate">
                                        {truncateText(`${event.customerName} • ${event.storeName}`, 40)}
                                      </p>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs">
                                    <p className="text-xs">{event.customerName} • {event.storeName}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-1.5 text-blue-600 border-blue-200 hover:bg-blue-50 text-xs ml-2 flex-shrink-0"
                                onClick={() => handleGoToEvent(event)}
                              >
                                <PlayCircle size={10} className="mr-0.5" />
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 bg-white rounded-lg border border-gray-200">
                        <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">No upcoming events</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Master Setup & Administration + Team Collaboration Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
             {/* Master Setup & Administration Card */}
            <Card className="border-gray-200 bg-gradient-to-br from-blue-50/50 to-white flex flex-col">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-100 rounded-lg">
                      <Settings className="h-4 w-4 text-purple-600" />
                    </div>
                    <CardTitle className="text-base font-semibold">Master Setup & Administration</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-xs">Configure locations, teams, and inventory settings</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                  {/* Locations Card */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3 flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-100 rounded-lg">
                            <MapPin className="h-3.5 w-3.5 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-sm text-gray-900">Locations</h3>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Total Locations</span>
                          <span className="font-semibold text-gray-900">{MOCK_DATA.locations.length}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Total Items</span>
                          <span className="font-semibold text-gray-900">{MOCK_DATA.locations.reduce((sum, l) => sum + l.itemCount, 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Categories</span>
                          <span className="font-semibold text-gray-900">{MOCK_DATA.locations.reduce((sum, l) => sum + (l.categories || 0), 0)}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 text-xs mt-auto"
                      onClick={() => router.push('/dashboard/setup/locations')}
                    >
                      Manage Locations →
                    </Button>
                  </div>

                  {/* Teams Card */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3 flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-green-100 rounded-lg">
                            <Users className="h-3.5 w-3.5 text-green-600" />
                          </div>
                          <h3 className="font-semibold text-sm text-gray-900">Teams</h3>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Total Members</span>
                          <span className="font-semibold text-gray-900">{MOCK_DATA.teams.reduce((sum, t) => sum + t.members, 0)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Active Tasks</span>
                          <span className="font-semibold text-gray-900">{MOCK_DATA.teams.reduce((sum, t) => sum + t.activeTasks, 0)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Completed Tasks</span>
                          <span className="font-semibold text-green-600">{MOCK_DATA.teams.reduce((sum, t) => sum + (t.completedTasks || 0), 0)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Productivity Rate</span>
                          <span className="font-semibold text-gray-900">87%</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-2 mb-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">Team Leads:</p>
                        <div className="flex -space-x-2">
                          {MOCK_DATA.teamCollaboration?.teamMembers?.slice(0, 3).map((member, idx) => (
                            <div key={idx} className="relative">
                              <Avatar className="h-6 w-6 border-2 border-white">
                                <AvatarFallback className="text-[10px] bg-indigo-100 text-indigo-700">
                                  {member.avatar}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          ))}
                          {MOCK_DATA.teamCollaboration?.teamMembers?.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                              <span className="text-[10px] font-medium text-gray-600">
                                +{MOCK_DATA.teamCollaboration.teamMembers.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-green-600 border-green-200 hover:bg-green-50 text-xs mt-auto"
                      onClick={() => router.push('/dashboard/setup/teams')}
                    >
                      Manage Teams →
                    </Button>
                  </div>

                  {/* Inventory Card */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3 flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-orange-100 rounded-lg">
                            <Package className="h-3.5 w-3.5 text-orange-600" />
                          </div>
                          <h3 className="font-semibold text-sm text-gray-900">Inventory</h3>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Categories</span>
                          <span className="font-semibold text-gray-900">{MOCK_DATA.inventory.categories}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Total Stock Value</span>
                          <span className="font-semibold text-gray-900">${MOCK_DATA.inventory.totalValue?.toLocaleString() || '125,430'}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Low Stock Alert</span>
                          <span className="font-semibold text-red-600">{MOCK_DATA.inventory.lowStockItems}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Out of Stock</span>
                          <span className="font-semibold text-red-600">{MOCK_DATA.inventory.outOfStockItems || 3}</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-2 mb-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">Stock Status:</p>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-green-500 h-1.5 rounded-full"
                            style={{ width: `${((MOCK_DATA.inventory.totalItems - MOCK_DATA.inventory.lowStockItems) / MOCK_DATA.inventory.totalItems) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                          <span>Healthy</span>
                          <span>Low Stock</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 text-xs mt-auto"
                      onClick={() => router.push('/dashboard/setup/inventory')}
                    >
                      Manage Inventory →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Collaboration Card - With Chat Buttons */}
            <Card className="border-gray-200 bg-gradient-to-br from-blue-50/50 to-white flex flex-col">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-100 rounded-lg">
                      <Users2 className="h-4 w-4 text-indigo-600" />
                    </div>
                    <CardTitle className="text-base font-semibold">Team Collaboration</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    {onlineMembers} Online Now
                  </Badge>
                </div>
                <CardDescription className="text-xs">Stay connected with your team members</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                {/* Team Members with Chat Buttons */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <Users className="h-3 w-3 text-indigo-600" />
                      Team Members
                    </h3>
                    <Button variant="link" size="sm" className="text-xs p-0 h-auto text-indigo-600">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {MOCK_DATA.teamCollaboration.teamMembers.map((member) => (
                      <div key={member.id} className="bg-white rounded-lg p-2 border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700">
                                {member.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className={cn(
                              "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white",
                              member.status === 'online' ? "bg-green-500" :
                                member.status === 'away' ? "bg-yellow-500" : "bg-gray-400"
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs bg-gray-50 hidden sm:flex">
                            {member.tasks} tasks
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                            onClick={() => handleOpenTeamChat(member)}
                          >
                            <MessageCircle size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Dialog */}
        <Dialog open={isChatDialogOpen} onOpenChange={setIsChatDialogOpen}>
          <DialogContent className="sm:max-w-[600px] h-[600px] flex flex-col p-0">
            {selectedChat && (
              <>
                <DialogHeader className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <DialogTitle className="text-lg font-semibold">{selectedChat.name}</DialogTitle>
                      <DialogDescription className="text-xs">
                        {selectedChat.participants.length} participants • Event Chat
                      </DialogDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Video size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setIsChatDialogOpen(false)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                </DialogHeader>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedChat.messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700">
                          {message.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-medium text-sm text-gray-900">{message.user}</span>
                          <span className="text-xs text-gray-400">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paperclip size={16} />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 h-9 text-sm"
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Smile size={16} />
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <Send size={14} className="mr-1" />
                      Send
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <style jsx global>{`
          /* Custom scrollbar for upcoming events */
          .upcoming-events-scroll {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
          }
          .upcoming-events-scroll::-webkit-scrollbar {
            width: 4px;
          }
          .upcoming-events-scroll::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }
          .upcoming-events-scroll::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }
          .upcoming-events-scroll::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}</style>
      </div>
    </TooltipProvider>
  );
};

export default DashboardPage;