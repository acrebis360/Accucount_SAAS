// Update LiveDashboard.js - Add the useSidebar import and use it
"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Calendar,
  Users,
  Store,
  Building,
  Hash,
  PlayCircle,
  CalendarClock,
  History,
  Scan,
  CheckSquare,
  ClipboardCheck,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";


// Dummy Dashboard Stats
const DUMMY_DASHBOARD_STATS = {
  cards: {
    currentEvents: 3,
    upcomingEvents: 5,
    completedEvents: 12,
    totalScanned: 12450
  }
};

// Dummy Events Data
const DUMMY_EVENTS = {
  live: [
    {
      id: "evt-001",
      uniqueId: "EVT-2024-001",
      title: "Annual Inventory Count 2024",
      status: "Live",
      datetime: "2024-03-25T09:00:00Z",
      location: "Singapore",
      customer: { cus_name: "Apple Singapore" },
      store: { store_name: "Orchard Road Store" },
      _count: { userRoles: 12, tags: 156 },
      completedTags: 78,
      userRoles: [
        { user: { id: "usr-1", name: "John Doe", phone: "+65 9123 4567" }, role: { name: "Counter" }, pinCode: "1234" },
        { user: { id: "usr-2", name: "Jane Smith", phone: "+65 9234 5678" }, role: { name: "Auditor" }, pinCode: "5678" }
      ]
    },
    {
      id: "evt-002",
      uniqueId: "EVT-2024-002",
      title: "Electronics Quarterly Audit",
      status: "Live",
      datetime: "2024-03-20T10:00:00Z",
      location: "Singapore",
      customer: { cus_name: "Samsung Electronics" },
      store: { store_name: "Jurong East Store" },
      _count: { userRoles: 8, tags: 89 },
      completedTags: 45,
      userRoles: [
        { user: { id: "usr-3", name: "Mike Johnson", phone: "+65 9345 6789" }, role: { name: "Counter" }, pinCode: "2345" }
      ]
    },
    {
      id: "evt-003",
      uniqueId: "EVT-2024-003",
      title: "Clothing Store Inventory",
      status: "Live",
      datetime: "2024-03-22T11:30:00Z",
      location: "Singapore",
      customer: { cus_name: "Zara Retail" },
      store: { store_name: "VivoCity Store" },
      _count: { userRoles: 6, tags: 134 },
      completedTags: 134,
      userRoles: [
        { user: { id: "usr-4", name: "Sarah Williams", phone: "+65 9456 7890" }, role: { name: "Counter" }, pinCode: "3456" }
      ]
    }
  ],
  upcoming: [
    {
      id: "evt-004",
      uniqueId: "EVT-2024-004",
      title: "Furniture Warehouse Audit",
      status: "Upcoming",
      datetime: "2024-04-05T08:00:00Z",
      location: "Singapore",
      customer: { cus_name: "IKEA Singapore" },
      store: { store_name: "Tampines Store" },
      _count: { userRoles: 10, tags: 95 },
      completedTags: 0,
      userRoles: []
    },
    {
      id: "evt-005",
      uniqueId: "EVT-2024-005",
      title: "Sports Equipment Stock Take",
      status: "Upcoming",
      datetime: "2024-04-10T09:00:00Z",
      location: "Singapore",
      customer: { cus_name: "Decathlon" },
      store: { store_name: "Sports Hub" },
      _count: { userRoles: 7, tags: 67 },
      completedTags: 0,
      userRoles: []
    },
    {
      id: "evt-006",
      uniqueId: "EVT-2024-006",
      title: "Grocery Store Count",
      status: "Upcoming",
      datetime: "2024-04-15T10:00:00Z",
      location: "Singapore",
      customer: { cus_name: "FairPrice" },
      store: { store_name: "Jurong Point" },
      _count: { userRoles: 15, tags: 112 },
      completedTags: 0,
      userRoles: []
    },
    {
      id: "evt-007",
      uniqueId: "EVT-2024-007",
      title: "Electronics Restock Audit",
      status: "Upcoming",
      datetime: "2024-04-20T11:00:00Z",
      location: "Singapore",
      customer: { cus_name: "Best Denki" },
      store: { store_name: "Suntec City" },
      _count: { userRoles: 5, tags: 45 },
      completedTags: 0,
      userRoles: []
    },
    {
      id: "evt-008",
      uniqueId: "EVT-2024-008",
      title: "Books & Stationery Count",
      status: "Upcoming",
      datetime: "2024-04-25T09:30:00Z",
      location: "Singapore",
      customer: { cus_name: "Popular Bookstore" },
      store: { store_name: "Bras Basah" },
      _count: { userRoles: 4, tags: 78 },
      completedTags: 0,
      userRoles: []
    }
  ],
  completed: [
    {
      id: "evt-009",
      uniqueId: "EVT-2023-001",
      title: "Year-End Inventory 2023",
      status: "Completed",
      datetime: "2023-12-15T09:00:00Z",
      location: "Singapore",
      customer: { cus_name: "Apple Singapore" },
      store: { store_name: "Orchard Road Store" },
      _count: { userRoles: 12, tags: 156 },
      completedTags: 156,
      userRoles: [
        { user: { id: "usr-1", name: "John Doe", phone: "+65 9123 4567" }, role: { name: "Counter" }, pinCode: "1234" }
      ]
    },
    {
      id: "evt-010",
      uniqueId: "EVT-2023-002",
      title: "Quarterly Electronics Review",
      status: "Completed",
      datetime: "2023-11-10T10:00:00Z",
      location: "Singapore",
      customer: { cus_name: "Samsung Electronics" },
      store: { store_name: "Jurong East Store" },
      _count: { userRoles: 8, tags: 89 },
      completedTags: 89,
      userRoles: []
    },
    {
      id: "evt-011",
      uniqueId: "EVT-2023-003",
      title: "Holiday Season Stock Take",
      status: "Completed",
      datetime: "2023-12-20T09:00:00Z",
      location: "Singapore",
      customer: { cus_name: "Zara Retail" },
      store: { store_name: "VivoCity Store" },
      _count: { userRoles: 6, tags: 134 },
      completedTags: 134,
      userRoles: []
    },
    {
      id: "evt-012",
      uniqueId: "EVT-2024-009",
      title: "Sports Hub Inventory",
      status: "Completed",
      datetime: "2024-01-15T08:00:00Z",
      location: "Singapore",
      customer: { cus_name: "Decathlon" },
      store: { store_name: "Sports Hub" },
      _count: { userRoles: 7, tags: 67 },
      completedTags: 67,
      userRoles: []
    }
  ]
};

const LiveDashboard = () => {
  const router = useRouter();
  const { openSecondarySidebar, isSecondarySidebarOpen } = useSidebar(); // Use the hook
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedEventTypes, setExpandedEventTypes] = useState({
    live: false,
    upcoming: false,
    past: false,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Use dummy data instead of API
  const dashboardStats = DUMMY_DASHBOARD_STATS;
  
  // Transform events from dummy data
  const transformEvents = (apiEvents) => {
    if (!apiEvents) return [];
    return apiEvents.map(evt => ({
      id: evt.id,
      uniqueId: evt.uniqueId,
      name: evt.title,
      customerName: evt.customer?.cus_name || "N/A",
      storeName: evt.store?.store_name || "N/A",
      location: evt.location || "N/A",
      date: evt.datetime ? new Date(evt.datetime).toLocaleDateString() : "N/A",
      startTime: evt.datetime ? new Date(evt.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A",
      endTime: "N/A",
      status: evt.status?.toLowerCase() || "planned",
      totalUsers: evt._count?.userRoles || 0,
      progress: evt._count?.tags > 0 ? Math.round(((evt.completedTags || 0) / evt._count.tags) * 100) : 0,
      users: evt.userRoles?.map(ur => ({
        id: ur.user?.id || "N/A",
        name: ur.user?.name || "Unknown",
        role: ur.role?.name || "Staff",
        status: "active",
        phone: ur.user?.phone || "N/A",
        pin: ur.pinCode || "N/A"
      })) || []
    }));
  };

  const processedLiveEvents = transformEvents(DUMMY_EVENTS.live);
  const processedUpcomingEvents = transformEvents(DUMMY_EVENTS.upcoming);
  const processedPastEvents = transformEvents(DUMMY_EVENTS.completed);

  // Event statistics cards
  const eventStatsCards = [
    {
      title: "Current Events",
      value: dashboardStats?.cards?.currentEvents || 0,
      icon: PlayCircle,
      iconColor: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200",
      gradientBorder: "from-green-400 to-green-200",
      trendColor: "text-green-600",
    },
    {
      title: "Upcoming Events",
      value: dashboardStats?.cards?.upcomingEvents || 0,
      icon: CalendarClock,
      iconColor: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      gradientBorder: "from-blue-400 to-blue-200",
      trendColor: "text-blue-600",
    },
    {
      title: "Completed Events",
      value: dashboardStats?.cards?.completedEvents || 0,
      icon: CheckSquare,
      iconColor: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      gradientBorder: "from-purple-400 to-purple-200",
      trendColor: "text-purple-600",
    },
    {
      title: "Total Scanned",
      value: dashboardStats?.cards?.totalScanned?.toLocaleString() || 0,
      icon: Scan,
      iconColor: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      gradientBorder: "from-orange-400 to-orange-200",
      trendColor: "text-orange-600",
    },
  ];

  const events = [
    {
      id: "live",
      title: "Live Events",
      icon: PlayCircle,
      count: processedLiveEvents.length,
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
      events: processedLiveEvents
    },
    {
      id: "upcoming",
      title: "Upcoming Events",
      icon: CalendarClock,
      count: processedUpcomingEvents.length,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      events: processedUpcomingEvents
    },
    {
      id: "past",
      title: "Past Events",
      icon: History,
      count: processedPastEvents.length,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-200",
      events: processedPastEvents
    }
  ];

  // Filter events within each type based on search and selected filters
  const filteredEvents = events.map(eventType => {
    const filteredList = eventType.events.filter(event => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.uniqueId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || eventType.id === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return {
      ...eventType,
      events: filteredList,
    };
  });

  const handleEventTypeToggle = (eventTypeId) => {
    setExpandedEventTypes(prev => ({
      ...prev,
      [eventTypeId]: !prev[eventTypeId]
    }));
  };

  // Handle event row click
  const handleEventClick = (event) => {
    // Only open sidebar for live/active events
    router.push(`/dashboard/live/event-dashboard/${event.id}`);
    if (event.status === 'live' || event.status === 'active') {
      setSelectedEvent(event);
      const eventData = {
        id: event.id,
        uniqueId: event.uniqueId,
        name: event.name,
        status: event.status,
        customerName: event.customerName,
        storeName: event.storeName,
        location: event.location,
        date: event.date,
        totalUsers: event.totalUsers,
        progress: event.progress
      };
      console.log("Opening sidebar with data:", eventData); // Debug log
      openSecondarySidebar(eventData);
    } else if (event.status !== 'completed') {
      console.log("Event not live, not opening sidebar");
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      active: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
        icon: PlayCircle,
        label: "Live",
      },
      live: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
        icon: PlayCircle,
        label: "Live",
      },
      upcoming: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
        icon: CalendarClock,
        label: "Upcoming",
      },
      planned: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-200",
        icon: AlertCircle,
        label: "Planned",
      },
      pending: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-200",
        icon: AlertCircle,
        label: "Pending",
      },
      completed: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
        icon: CheckCircle,
        label: "Completed",
      },
    };

    const normalizedStatus = status?.toLowerCase();
    const { bg, text, border, icon: Icon, label } = config[normalizedStatus] || config.planned;

    return (
      <Badge className={`${bg} ${text} hover:${bg} ${border} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSearchQuery("");
    setStatusFilter("all");
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Event Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {eventStatsCards.map((card, index) => {
          const IconComponent = card.icon;

          return (
            <div key={index} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradientBorder} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500`}></div>
              <Card className={`relative shadow-xl hover:shadow-2xl transition-all duration-300 ${card.borderColor} ${card.bgColor} border-2 border-opacity-50 rounded-2xl overflow-hidden group-hover:-translate-y-1`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">{card.title}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                        <span className={`text-sm font-medium ${card.trendColor}`}>
                          {card.trend}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/50">
                      <IconComponent className={`h-8 w-8 ${card.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Events Table */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <ClipboardCheck className="h-6 w-6 text-blue-600" />
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
                  <SelectItem value="past">Past Events</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-semibold">Event Type</TableHead>
                  <TableHead className="font-semibold text-center">
                    Total Events
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Total Users
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((eventType) => {
                  const IconComponent = eventType.icon;
                  const totalUsers = eventType.events.reduce((sum, event) => sum + event.totalUsers, 0);

                  return (
                    <React.Fragment key={eventType.id}>
                      <TableRow className="group hover:bg-gray-50">
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEventTypeToggle(eventType.id)}
                            className="h-8 w-8 p-0"
                          >
                            {expandedEventTypes[eventType.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className={`h-10 w-10 rounded-lg ${eventType.bgColor} flex items-center justify-center`}>
                                <IconComponent className={`h-5 w-5 ${eventType.color}`} />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {eventType.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {eventType.id === "live" ? "Currently active events" :
                                    eventType.id === "upcoming" ? "Scheduled future events" :
                                      "Completed events"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-gray-900 text-xl">
                              {eventType.events.length}
                            </span>
                            <span className="text-sm text-gray-600">events</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center gap-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="font-bold text-gray-900">
                                {totalUsers}
                              </span>
                              <span className="text-sm text-gray-600">users</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEventTypeToggle(eventType.id)}
                              title="View All"
                              className="gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              View All
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>

                      {/* Expanded Events Details */}
                      {expandedEventTypes[eventType.id] && (
                        <TableRow className={`${eventType.bgColor} bg-opacity-30`}>
                          <TableCell colSpan={6}>
                            <div className="p-4">
                              <div className="mb-3">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-semibold text-gray-900">
                                    {eventType.title} - Details
                                  </h4>
                                  <div className="text-sm text-gray-600">
                                    {eventType.events.length} events
                                  </div>
                                </div>

                                {eventType.events.length > 0 ? (
                                  <div className="bg-white rounded-lg border overflow-hidden">
                                    <Table>
                                      <TableHeader>
                                        <TableRow className="bg-gray-50">
                                          <TableHead className="font-medium w-24">
                                            Event ID
                                          </TableHead>
                                          <TableHead className="font-medium">
                                            Event Name
                                          </TableHead>
                                          <TableHead className="font-medium">
                                            Date & Time
                                          </TableHead>
                                          <TableHead className="font-medium">
                                            Customer Name
                                          </TableHead>
                                          <TableHead className="font-medium">
                                            Store Name
                                          </TableHead>
                                          <TableHead className="font-medium">
                                            Status
                                          </TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {eventType.events.map((event) => {
                                          const isLive = event.status === 'live' || event.status === 'active';
                                          return (
                                            <TableRow 
                                              key={event.id} 
                                              className={cn(
                                                "transition-colors",
                                                isLive && "cursor-pointer hover:bg-green-50"
                                              )} 
                                              onClick={() => handleEventClick(event)}
                                            >
                                              <TableCell>
                                                <div className="flex items-center gap-2">
                                                  <Hash className="h-3 w-3 text-gray-400" />
                                                  <span className="font-mono text-sm font-medium">
                                                    {event.uniqueId}
                                                  </span>
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                <div className="font-medium text-gray-900">
                                                  {event.name}
                                                </div>
                                                {isLive && (
                                                  <div className="text-xs text-green-600 mt-1">
                                                    Click to open actions
                                                  </div>
                                                )}
                                              </TableCell>
                                              <TableCell>
                                                <div className="space-y-1">
                                                  <div className="text-sm font-medium text-gray-900">
                                                    {event.date}
                                                  </div>
                                                  <div className="text-xs text-gray-500">
                                                    {event.startTime}
                                                  </div>
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                <div className="flex items-center gap-2">
                                                  <Building className="h-4 w-4 text-gray-400" />
                                                  <span className="text-sm text-gray-900">
                                                    {event.customerName}
                                                  </span>
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                <div className="flex items-center gap-2">
                                                  <Store className="h-4 w-4 text-gray-400" />
                                                  <span className="text-sm text-gray-900">
                                                    {event.storeName}
                                                  </span>
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                {getStatusBadge(event.status)}
                                              </TableCell>
                                            </TableRow>
                                          );
                                        })}
                                      </TableBody>
                                    </Table>
                                  </div>
                                ) : (
                                  <div className="text-center py-8 bg-gray-50 rounded-lg border">
                                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                      No Events Found
                                    </h4>
                                    <p className="text-gray-600 max-w-md mx-auto mb-4">
                                      No events match your current search criteria in this category.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredEvents.every(type => type.events.length === 0) && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No events match your current filters. Try adjusting your search
                criteria.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t p-4">
          <div className="text-sm text-gray-600">
            Showing {filteredEvents.reduce((sum, type) => sum + type.events.length, 0)} events across {filteredEvents.length} categories
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Click live events for actions</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Instruction Banner */}
      {processedLiveEvents.length > 0 && !isSecondarySidebarOpen && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <PlayCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">
                Quick Tip: Click on any live event row to access stock take actions
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Execute counts, review progress, and manage reconciliations from the sidebar
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveDashboard;