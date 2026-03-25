// app/dashboard/stocktake-scheduler/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  CheckCircle,
  Users,
  Store,
  Package,
  Download,
  Printer,
  Mail,
  List,
  ChevronRight,
  ChevronLeft,
  Ban,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Calendar as CalendarIcon,
  CalendarPlus,
  CalendarSync,
  Clock as ClockIcon,
  PlayCircle,
  Target,
  FileCheck
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
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const StocktakeSchedulerPage = () => {
  const [viewMode, setViewMode] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('month');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showRecurringDialog, setShowRecurringDialog] = useState(false);
  const [showConflictDialog, setShowConflictDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample scheduled stocktakes
  const scheduledStocktakes = [
    {
      id: 'STK-2024-001',
      name: 'Monthly Warehouse A Count',
      type: 'full',
      status: 'scheduled',
      priority: 'high',
      location: 'Warehouse A',
      zone: 'Zone 1-5',
      startDate: '2024-03-20',
      startTime: '09:00',
      endDate: '2024-03-20',
      endTime: '17:00',
      estimatedDuration: '8 hours',
      assignedTo: [
        { id: 1, name: 'John Doe', avatar: null, initials: 'JD' },
        { id: 2, name: 'Jane Smith', avatar: null, initials: 'JS' },
      ],
      createdBy: 'Sarah Wilson',
      createdAt: '2024-03-15',
      recurring: false,
      tags: ['monthly', 'warehouse-a', 'full-count'],
    },
    {
      id: 'STK-2024-002',
      name: 'Store B Weekly Cycle Count',
      type: 'cycle',
      status: 'scheduled',
      priority: 'medium',
      location: 'Store B',
      zone: 'All Zones',
      startDate: '2024-03-21',
      startTime: '14:00',
      endDate: '2024-03-21',
      endTime: '16:00',
      estimatedDuration: '2 hours',
      assignedTo: [
        { id: 3, name: 'Mike Johnson', avatar: null, initials: 'MJ' },
      ],
      createdBy: 'John Doe',
      createdAt: '2024-03-14',
      recurring: true,
      recurringPattern: 'Weekly on Thursday',
      tags: ['cycle-count', 'store-b', 'weekly'],
    },
    {
      id: 'STK-2024-003',
      name: 'Warehouse C Spot Check',
      type: 'spot',
      status: 'completed',
      priority: 'low',
      location: 'Warehouse C',
      zone: 'Zone 7',
      startDate: '2024-03-15',
      startTime: '10:00',
      endDate: '2024-03-15',
      endTime: '12:00',
      estimatedDuration: '2 hours',
      assignedTo: [
        { id: 4, name: 'Sarah Wilson', avatar: null, initials: 'SW' },
        { id: 5, name: 'Tom Brown', avatar: null, initials: 'TB' },
      ],
      createdBy: 'Jane Smith',
      createdAt: '2024-03-10',
      recurring: false,
      tags: ['spot-check', 'warehouse-c'],
    },
    {
      id: 'STK-2024-004',
      name: 'Quarterly Full Inventory',
      type: 'full',
      status: 'scheduled',
      priority: 'high',
      location: 'All Locations',
      zone: 'All Zones',
      startDate: '2024-04-01',
      startTime: '08:00',
      endDate: '2024-04-07',
      endTime: '17:00',
      estimatedDuration: '7 days',
      assignedTo: [],
      createdBy: 'Admin',
      createdAt: '2024-03-01',
      recurring: true,
      recurringPattern: 'Quarterly',
      tags: ['quarterly', 'full-count', 'all-locations'],
    },
    {
      id: 'STK-2024-005',
      name: 'Electronics Department Audit',
      type: 'audit',
      status: 'in_progress',
      priority: 'high',
      location: 'Store A',
      zone: 'Electronics',
      startDate: '2024-03-18',
      startTime: '09:00',
      endDate: '2024-03-19',
      endTime: '17:00',
      estimatedDuration: '2 days',
      assignedTo: [
        { id: 2, name: 'Jane Smith', avatar: null, initials: 'JS' },
        { id: 6, name: 'Lisa Chen', avatar: null, initials: 'LC' },
      ],
      createdBy: 'Mike Johnson',
      createdAt: '2024-03-16',
      recurring: false,
      tags: ['electronics', 'audit', 'store-a'],
    },
    {
      id: 'STK-2024-006',
      name: 'Furniture Section Count',
      type: 'cycle',
      status: 'scheduled',
      priority: 'medium',
      location: 'Warehouse B',
      zone: 'Furniture',
      startDate: '2024-03-22',
      startTime: '13:00',
      endDate: '2024-03-22',
      endTime: '16:00',
      estimatedDuration: '3 hours',
      assignedTo: [
        { id: 7, name: 'David Lee', avatar: null, initials: 'DL' },
      ],
      createdBy: 'Sarah Wilson',
      createdAt: '2024-03-17',
      recurring: true,
      recurringPattern: 'Bi-weekly on Friday',
      tags: ['furniture', 'warehouse-b', 'cycle'],
    },
    {
      id: 'STK-2024-007',
      name: 'Perishables Daily Check',
      type: 'spot',
      status: 'scheduled',
      priority: 'high',
      location: 'Store C',
      zone: 'Perishables',
      startDate: '2024-03-19',
      startTime: '08:30',
      endDate: '2024-03-19',
      endTime: '09:30',
      estimatedDuration: '1 hour',
      assignedTo: [
        { id: 8, name: 'Emma Watson', avatar: null, initials: 'EW' },
      ],
      createdBy: 'Tom Brown',
      createdAt: '2024-03-18',
      recurring: true,
      recurringPattern: 'Daily',
      tags: ['perishables', 'daily', 'store-c'],
    },
    {
      id: 'STK-2024-008',
      name: 'Receiving Area Verification',
      type: 'audit',
      status: 'scheduled',
      priority: 'medium',
      location: 'Warehouse A',
      zone: 'Receiving',
      startDate: '2024-03-23',
      startTime: '10:00',
      endDate: '2024-03-23',
      endTime: '14:00',
      estimatedDuration: '4 hours',
      assignedTo: [
        { id: 1, name: 'John Doe', avatar: null, initials: 'JD' },
        { id: 9, name: 'Anna Taylor', avatar: null, initials: 'AT' },
      ],
      createdBy: 'Jane Smith',
      createdAt: '2024-03-19',
      recurring: false,
      tags: ['receiving', 'verification', 'warehouse-a'],
    },
  ];

  // Sample recurring templates
  const recurringTemplates = [
    {
      id: 'TMP-001',
      name: 'Daily Perishables Check',
      type: 'spot',
      location: 'Store C',
      frequency: 'Daily',
      time: '08:30',
      duration: '1 hour',
      assignedTo: ['Emma Watson'],
      active: true,
    },
    {
      id: 'TMP-002',
      name: 'Weekly Store Cycle Count',
      type: 'cycle',
      location: 'Store B',
      frequency: 'Weekly on Thursday',
      time: '14:00',
      duration: '2 hours',
      assignedTo: ['Mike Johnson'],
      active: true,
    },
    {
      id: 'TMP-003',
      name: 'Monthly Warehouse Count',
      type: 'full',
      location: 'Warehouse A',
      frequency: 'Monthly on 20th',
      time: '09:00',
      duration: '8 hours',
      assignedTo: ['John Doe', 'Jane Smith'],
      active: true,
    },
    {
      id: 'TMP-004',
      name: 'Quarterly Full Inventory',
      type: 'full',
      location: 'All Locations',
      frequency: 'Quarterly',
      time: '08:00',
      duration: '7 days',
      assignedTo: [],
      active: true,
    },
    {
      id: 'TMP-005',
      name: 'Bi-weekly Furniture Count',
      type: 'cycle',
      location: 'Warehouse B',
      frequency: 'Bi-weekly on Friday',
      time: '13:00',
      duration: '3 hours',
      assignedTo: ['David Lee'],
      active: false,
    },
  ];

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A', color: 'bg-blue-100 text-blue-700' },
    { id: 'wh-b', name: 'Warehouse B', color: 'bg-green-100 text-green-700' },
    { id: 'wh-c', name: 'Warehouse C', color: 'bg-purple-100 text-purple-700' },
    { id: 'store-a', name: 'Store A', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'store-b', name: 'Store B', color: 'bg-orange-100 text-orange-700' },
    { id: 'store-c', name: 'Store C', color: 'bg-pink-100 text-pink-700' },
  ];

  // Team members
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Stocktake Lead', avatar: null, initials: 'JD', availability: 'available' },
    { id: 2, name: 'Jane Smith', role: 'Counter', avatar: null, initials: 'JS', availability: 'busy' },
    { id: 3, name: 'Mike Johnson', role: 'Counter', avatar: null, initials: 'MJ', availability: 'available' },
    { id: 4, name: 'Sarah Wilson', role: 'Supervisor', avatar: null, initials: 'SW', availability: 'available' },
    { id: 5, name: 'Tom Brown', role: 'Counter', avatar: null, initials: 'TB', availability: 'off' },
    { id: 6, name: 'Lisa Chen', role: 'Counter', avatar: null, initials: 'LC', availability: 'available' },
    { id: 7, name: 'David Lee', role: 'Counter', avatar: null, initials: 'DL', availability: 'busy' },
    { id: 8, name: 'Emma Watson', role: 'Counter', avatar: null, initials: 'EW', availability: 'available' },
    { id: 9, name: 'Anna Taylor', role: 'Counter', avatar: null, initials: 'AT', availability: 'available' },
  ];

  // Status configuration
  const statusConfig = {
    scheduled: { label: 'Scheduled', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: CalendarIcon },
    in_progress: { label: 'In Progress', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: PlayCircle },
    completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: Ban },
  };

  const priorityConfig = {
    high: { label: 'High', color: 'bg-red-50 text-red-700' },
    medium: { label: 'Medium', color: 'bg-yellow-50 text-yellow-700' },
    low: { label: 'Low', color: 'bg-green-50 text-green-700' },
  };

  const typeConfig = {
    full: { label: 'Full Count', icon: Package, color: 'bg-purple-100 text-purple-700' },
    cycle: { label: 'Cycle Count', icon: RefreshCw, color: 'bg-blue-100 text-blue-700' },
    spot: { label: 'Spot Check', icon: Target, color: 'bg-green-100 text-green-700' },
    audit: { label: 'Audit', icon: FileCheck, color: 'bg-orange-100 text-orange-700' },
  };

  // Generate calendar events for the month
  const generateCalendarEvents = () => {
    const events = [];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = scheduledStocktakes.filter(s => s.startDate === dateStr);
      
      if (dayEvents.length > 0) {
        events.push({
          date: dateStr,
          day,
          events: dayEvents,
          count: dayEvents.length,
        });
      }
    }
    return events;
  };

  const calendarEvents = generateCalendarEvents();

  // Get events for selected date
  const getSelectedDateEvents = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return scheduledStocktakes.filter(s => s.startDate === dateStr);
  };

  const selectedDateEvents = getSelectedDateEvents();

  // Navigate calendar
  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CalendarIcon;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-50 text-gray-700';
  };

  const getTypeColor = (type) => {
    return typeConfig[type]?.color || 'bg-gray-100 text-gray-700';
  };

  const getAvailabilityColor = (availability) => {
    switch(availability) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'busy': return 'bg-yellow-100 text-yellow-700';
      case 'off': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTemplates = recurringTemplates.filter(template => {
    const matchesLocation = selectedLocation === 'all' || template.location === selectedLocation;
    const matchesType = selectedType === 'all' || template.type === selectedType;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Stock Take Scheduler</h1>
            <p className="text-black/50 mt-1">Plan, schedule, and manage inventory counting operations</p>
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
                  Print Schedule
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Schedule
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#F5EEE9]">
                  <CalendarPlus size={16} />
                  Add
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowCreateDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Single Stocktake
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowRecurringDialog(true)}>
                  <CalendarSync className="mr-2 h-4 w-4" />
                  Recurring Schedule
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowTemplateDialog(true)}>
                  <FileText className="mr-2 h-4 w-4" />
                  From Template
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowBatchDialog(true)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Batch Create
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <CalendarPlus size={16} />
              Schedule Stocktake
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Scheduled</p>
                  <p className="text-xl font-bold text-black mt-1">
                    {scheduledStocktakes.filter(s => s.status === 'scheduled').length}
                  </p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <CalendarIcon size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">In Progress</p>
                  <p className="text-xl font-bold text-black mt-1">
                    {scheduledStocktakes.filter(s => s.status === 'in_progress').length}
                  </p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <PlayCircle size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Completed</p>
                  <p className="text-xl font-bold text-black mt-1">
                    {scheduledStocktakes.filter(s => s.status === 'completed').length}
                  </p>
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
                  <p className="text-xs text-black/50">Recurring</p>
                  <p className="text-xl font-bold text-black mt-1">
                    {scheduledStocktakes.filter(s => s.recurring).length}
                  </p>
                </div>
                <div className="p-2 bg-[#F5EEE9] rounded-full">
                  <CalendarSync size={18} className="text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Hours</p>
                  <p className="text-xl font-bold text-black mt-1">124</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <ClockIcon size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* View Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="mb-6">
        <TabsList className="bg-[#F5EEE9]">
          <TabsTrigger value="calendar" className="data-[state=active]:bg-white">
            <CalendarIcon size={16} className="mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="list" className="data-[state=active]:bg-white">
            <List size={16} className="mr-2" />
            List View
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-white">
            <FileText size={16} className="mr-2" />
            Recurring Templates
          </TabsTrigger>
          <TabsTrigger value="availability" className="data-[state=active]:bg-white">
            <Users size={16} className="mr-2" />
            Team Availability
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="flex gap-6">
          {/* Calendar Grid */}
          <div className="flex-1">
            <Card className="border-[#F5EEE9]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMonth(-1)}
                      className="h-8 w-8 border-[#F5EEE9]"
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <h2 className="text-lg font-semibold text-black">
                      {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMonth(1)}
                      className="h-8 w-8 border-[#F5EEE9]"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={selectedView === 'month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedView('month')}
                      className={selectedView === 'month' ? 'bg-red-600 hover:bg-red-700' : 'border-[#F5EEE9]'}
                    >
                      Month
                    </Button>
                    <Button
                      variant={selectedView === 'week' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedView('week')}
                      className={selectedView === 'week' ? 'bg-red-600 hover:bg-red-700' : 'border-[#F5EEE9]'}
                    >
                      Week
                    </Button>
                    <Button
                      variant={selectedView === 'day' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedView('day')}
                      className={selectedView === 'day' ? 'bg-red-600 hover:bg-red-700' : 'border-[#F5EEE9]'}
                    >
                      Day
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-px bg-[#F5EEE9] border border-[#F5EEE9] rounded-lg overflow-hidden">
                  {/* Weekday headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="bg-white p-2 text-center text-sm font-medium text-black/50">
                      {day}
                    </div>
                  ))}

                  {/* Calendar days */}
                  {Array.from({ length: 35 }).map((_, index) => {
                    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
                    const day = index - firstDay + 1;
                    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                    const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const dateStr = date.toISOString().split('T')[0];
                    const dayEvents = scheduledStocktakes.filter(s => s.startDate === dateStr);
                    
                    return (
                      <div
                        key={index}
                        className={cn(
                          "min-h-24 p-2 border-b border-r border-[#F5EEE9] bg-white",
                          !isCurrentMonth && "bg-[#F5EEE9]/30 text-black/30",
                          isToday && "bg-red-50"
                        )}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={cn(
                            "text-sm font-medium",
                            isToday && "text-red-600"
                          )}>
                            {day > 0 && day <= new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate() ? day : ''}
                          </span>
                          {dayEvents.length > 0 && (
                            <Badge className="bg-red-600 text-white border-0 text-xs">
                              {dayEvents.length}
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className="text-[10px] p-1 rounded bg-blue-50 text-blue-700 truncate"
                            >
                              {event.name}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-[10px] text-black/50">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Date Events */}
          <div className="w-80">
            <Card className="border-[#F5EEE9] sticky top-20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-black">
                  {selectedDate.toLocaleDateString('default', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
                <CardDescription className="text-black/50">
                  {selectedDateEvents.length} scheduled stocktakes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  {selectedDateEvents.length === 0 ? (
                    <div className="text-center py-8">
                      <CalendarIcon size={32} className="mx-auto text-black/30 mb-2" />
                      <p className="text-sm text-black/50">No stocktakes scheduled</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => setShowCreateDialog(true)}
                      >
                        <Plus size={14} className="mr-2" />
                        Schedule
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedDateEvents.map((event) => {
                        const TypeIcon = typeConfig[event.type]?.icon || Package;
                        
                        return (
                          <div
                            key={event.id}
                            className="p-3 border border-[#F5EEE9] rounded-lg hover:shadow-md cursor-pointer"
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowDetailsDialog(true);
                            }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <Badge className={cn("text-xs border-0", getStatusColor(event.status))}>
                                {statusConfig[event.status]?.label}
                              </Badge>
                              <Badge className={cn("text-xs border-0", getPriorityColor(event.priority))}>
                                {priorityConfig[event.priority]?.label}
                              </Badge>
                            </div>
                            
                            <h4 className="font-medium text-black text-sm mb-1">{event.name}</h4>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <TypeIcon size={12} className="text-red-600" />
                              <span className="text-xs capitalize">{event.type}</span>
                              <span className="text-xs text-black/30">•</span>
                              <span className="text-xs text-black/50">{event.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-black/50 mb-2">
                              <ClockIcon size={12} />
                              <span>{event.startTime} - {event.endTime}</span>
                              <span className="text-black/30">•</span>
                              <span>{event.estimatedDuration}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center -space-x-2">
                                {event.assignedTo.slice(0, 3).map((user) => (
                                  <Avatar key={user.id} className="h-5 w-5 border-2 border-white">
                                    <AvatarFallback className="text-[8px] bg-red-600 text-white">
                                      {user.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {event.assignedTo.length > 3 && (
                                  <div className="h-5 w-5 rounded-full bg-[#F5EEE9] flex items-center justify-center text-[8px] font-medium border-2 border-white">
                                    +{event.assignedTo.length - 3}
                                  </div>
                                )}
                              </div>
                              {event.recurring && (
                                <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                                  <CalendarSync size={10} className="mr-1" />
                                  Recurring
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t border-[#F5EEE9] p-3">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  size="sm"
                  onClick={() => setShowCreateDialog(true)}
                >
                  <Plus size={14} className="mr-2" />
                  Schedule Stocktake
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="border-[#F5EEE9]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-black">All Scheduled Stocktakes</CardTitle>
                <CardDescription className="text-black/50">
                  Manage all your inventory counting schedules
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
                  <Input
                    placeholder="Search schedules..."
                    className="pl-9 h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[150px] h-9">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(loc => (
                      <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[130px] h-9">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full">Full Count</SelectItem>
                    <SelectItem value="cycle">Cycle Count</SelectItem>
                    <SelectItem value="spot">Spot Check</SelectItem>
                    <SelectItem value="audit">Audit</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="h-9 w-9 border-[#F5EEE9]">
                  <Filter size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
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
                  <TableHead className="text-black/50">Date</TableHead>
                  <TableHead className="text-black/50">Time</TableHead>
                  <TableHead className="text-black/50">Duration</TableHead>
                  <TableHead className="text-black/50">Assignees</TableHead>
                  <TableHead className="text-black/50">Recurring</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledStocktakes.map((stocktake) => {
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
                          {statusConfig[stocktake.status]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getPriorityColor(stocktake.priority))}>
                          {priorityConfig[stocktake.priority]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{stocktake.location}</TableCell>
                      <TableCell>{stocktake.startDate}</TableCell>
                      <TableCell>{stocktake.startTime}</TableCell>
                      <TableCell>{stocktake.estimatedDuration}</TableCell>
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
                        {stocktake.recurring ? (
                          <Badge className="bg-purple-50 text-purple-700 border-0">
                            <CalendarSync size={10} className="mr-1" />
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-[#F5EEE9]">No</Badge>
                        )}
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              Start Now
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CalendarSync className="mr-2 h-4 w-4" />
                              Make Recurring
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
                Showing {scheduledStocktakes.length} scheduled stocktakes
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

      {/* Templates View */}
      {viewMode === 'templates' && (
        <Card className="border-[#F5EEE9]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-black">Recurring Templates</CardTitle>
                <CardDescription className="text-black/50">
                  Manage automated recurring stocktake schedules
                </CardDescription>
              </div>
              <Button
                className="gap-2 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setShowRecurringDialog(true)}
              >
                <Plus size={16} />
                New Template
              </Button>
            </div>
          </CardHeader>
       <CardContent>
  <div className="grid grid-cols-3 gap-4">
    {filteredTemplates.map((template) => {
      // Get the icon component from typeConfig
      const TypeIcon = typeConfig[template.type]?.icon;
      
      return (
        <Card key={template.id} className="border-[#F5EEE9] hover:shadow-lg transition-all">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-lg",
                  typeConfig[template.type]?.color
                )}>
                  {TypeIcon && <TypeIcon size={16} />}
                </div>
                <div>
                  <h3 className="font-medium text-black">{template.name}</h3>
                  <p className="text-xs text-black/50">{template.id}</p>
                </div>
              </div>
              <Switch checked={template.active} />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Store size={14} className="text-black/30" />
                <span>{template.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarSync size={14} className="text-black/30" />
                <span>{template.frequency}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon size={14} className="text-black/30" />
                <span>{template.time} ({template.duration})</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-black/30" />
                <span>{template.assignedTo.join(', ') || 'Unassigned'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F5EEE9]">
              <div className="flex items-center gap-2">
                <Badge className={cn("text-xs", typeConfig[template.type]?.color)}>
                  {typeConfig[template.type]?.label}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Edit size={14} />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Copy size={14} />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    })}
  </div>
</CardContent>
        </Card>
      )}

      {/* Team Availability View */}
      {viewMode === 'availability' && (
        <div className="grid grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="border-[#F5EEE9] hover:shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-red-600 text-white">{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-black">{member.name}</h3>
                    <p className="text-xs text-black/50">{member.role}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-black/50">Availability</span>
                    <Badge className={cn("text-xs", getAvailabilityColor(member.availability))}>
                      {member.availability}
                    </Badge>
                  </div>

                  <Separator className="bg-[#F5EEE9]" />

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-black">This Week's Schedule</p>
                    <div className="grid grid-cols-7 gap-1">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-6 w-6 rounded-full flex items-center justify-center text-[10px]",
                            i < 5 ? "bg-green-100 text-green-700" : "bg-[#F5EEE9] text-black/50"
                          )}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-black">Current Assignments</p>
                    <div className="text-xs text-black/50">
                      {scheduledStocktakes
                        .filter(s => s.assignedTo.some(a => a.id === member.id))
                        .slice(0, 2)
                        .map(s => s.name)
                        .join(', ') || 'No assignments'}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#F5EEE9]">
                  <Button variant="outline" size="sm" className="w-full border-[#F5EEE9]">
                    View Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Schedule Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule Stocktake</DialogTitle>
            <DialogDescription>
              Plan and schedule a new inventory counting session
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
                    <SelectItem value="zone3">Zone 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start border-[#F5EEE9]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Select date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input type="time" defaultValue="09:00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start border-[#F5EEE9]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Select date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input type="time" defaultValue="17:00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Assign Team Members</Label>
              <div className="border border-[#F5EEE9] rounded-lg p-3">
                <div className="grid grid-cols-2 gap-2">
                  {teamMembers.slice(0, 6).map((member) => (
                    <div key={member.id} className="flex items-center space-x-2">
                      <Checkbox id={`schedule-member-${member.id}`} />
                      <Label htmlFor={`schedule-member-${member.id}`} className="text-sm">
                        {member.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Recurring Schedule</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="isRecurring" />
                <Label htmlFor="isRecurring">Repeat this stocktake</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <RadioGroup defaultValue="medium" className="flex gap-4">
                {['High', 'Medium', 'Low'].map((priority) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <RadioGroupItem value={priority.toLowerCase()} id={`schedule-${priority}`} />
                    <Label htmlFor={`schedule-${priority}`}>{priority}</Label>
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
              Schedule Stocktake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Recurring Schedule Dialog */}
      <Dialog open={showRecurringDialog} onOpenChange={setShowRecurringDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Recurring Schedule</DialogTitle>
            <DialogDescription>
              Set up automated recurring stocktakes
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Template Name</Label>
              <Input placeholder="e.g., Weekly Store Count" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select defaultValue="cycle">
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
              <div className="space-y-2">
                <Label>Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(loc => (
                      <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Frequency</Label>
              <RadioGroup defaultValue="weekly" className="grid grid-cols-2 gap-4">
                {['Daily', 'Weekly', 'Monthly', 'Quarterly'].map((freq) => (
                  <div key={freq} className="flex items-center space-x-2">
                    <RadioGroupItem value={freq.toLowerCase()} id={`freq-${freq}`} />
                    <Label htmlFor={`freq-${freq}`}>{freq}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Day of Week</Label>
              <Select defaultValue="monday">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input type="time" defaultValue="09:00" />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select defaultValue="2hours">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="2hours">2 hours</SelectItem>
                    <SelectItem value="4hours">4 hours</SelectItem>
                    <SelectItem value="8hours">8 hours</SelectItem>
                    <SelectItem value="1day">1 day</SelectItem>
                    <SelectItem value="2days">2 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Assign Team Members</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team members" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map(member => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRecurringDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Template
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
                <CalendarPlus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Schedule Stocktake</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowRecurringDialog(true)}
              >
                <CalendarSync size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Create Recurring</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setSelectedDate(new Date())}
              >
                <CalendarIcon size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Today</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default StocktakeSchedulerPage;