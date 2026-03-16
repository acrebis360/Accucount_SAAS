// app/dashboard/custom-dashboards/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard,
  Plus,
  Edit,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Settings,
  Download,
  Upload,
  Share2,
  Printer,
  Grid,
  List,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  X,
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  Package,
  DollarSign,
  Users,
  Target,
  Activity,
  Gauge,
  Cpu,
  Home,
  Lock,
  Globe,
  Warehouse,
  Truck,

} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const CustomDashboardsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOwner, setSelectedOwner] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [cloneDialogOpen, setCloneDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for dashboards
  const dashboards = [
    {
      id: 1,
      name: 'Executive Overview',
      description: 'High-level KPIs and metrics for executive leadership',
      category: 'executive',
      owner: 'John Smith',
      ownerAvatar: '/avatars/01.png',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-03-10T14:20:00Z',
      views: 1245,
      stars: 89,
      shares: 34,
      tags: ['kpi', 'executive', 'overview'],
      thumbnail: '/dashboards/executive.jpg',
      isPublic: true,
      isStarred: true,
      isFavorite: true,
      widgets: 12,
      collaborators: 5,
      lastViewed: '2024-03-15T09:30:00Z',
      status: 'published',
      version: '2.1.0'
    },
    {
      id: 2,
      name: 'Inventory Performance',
      description: 'Real-time inventory metrics, turnover rates, and stock analysis',
      category: 'inventory',
      owner: 'Sarah Johnson',
      ownerAvatar: '/avatars/02.png',
      createdAt: '2024-02-01T11:15:00Z',
      updatedAt: '2024-03-12T16:45:00Z',
      views: 892,
      stars: 56,
      shares: 23,
      tags: ['inventory', 'performance', 'analytics'],
      thumbnail: '/dashboards/inventory.jpg',
      isPublic: true,
      isStarred: false,
      isFavorite: true,
      widgets: 8,
      collaborators: 3,
      lastViewed: '2024-03-14T11:20:00Z',
      status: 'published',
      version: '1.5.0'
    },
    {
      id: 3,
      name: 'Warehouse Operations',
      description: 'Warehouse efficiency, utilization, and operational metrics',
      category: 'operations',
      owner: 'Mike Wilson',
      ownerAvatar: '/avatars/03.png',
      createdAt: '2024-01-20T09:45:00Z',
      updatedAt: '2024-03-11T13:30:00Z',
      views: 567,
      stars: 42,
      shares: 18,
      tags: ['warehouse', 'operations', 'efficiency'],
      thumbnail: '/dashboards/warehouse.jpg',
      isPublic: false,
      isStarred: false,
      isFavorite: false,
      widgets: 10,
      collaborators: 4,
      lastViewed: '2024-03-13T15:40:00Z',
      status: 'published',
      version: '2.0.0'
    },
    {
      id: 4,
      name: 'Supply Chain Analytics',
      description: 'End-to-end supply chain visibility and performance tracking',
      category: 'supply-chain',
      owner: 'Emily Chen',
      ownerAvatar: '/avatars/04.png',
      createdAt: '2024-02-15T14:20:00Z',
      updatedAt: '2024-03-13T10:15:00Z',
      views: 423,
      stars: 38,
      shares: 15,
      tags: ['supply-chain', 'logistics', 'analytics'],
      thumbnail: '/dashboards/supply-chain.jpg',
      isPublic: true,
      isStarred: true,
      isFavorite: true,
      widgets: 15,
      collaborators: 6,
      lastViewed: '2024-03-15T10:30:00Z',
      status: 'published',
      version: '1.8.0'
    },
    {
      id: 5,
      name: 'Financial Dashboard',
      description: 'Financial metrics, cost analysis, and revenue tracking',
      category: 'financial',
      owner: 'David Brown',
      ownerAvatar: '/avatars/05.png',
      createdAt: '2024-01-10T08:30:00Z',
      updatedAt: '2024-03-14T09:45:00Z',
      views: 734,
      stars: 67,
      shares: 28,
      tags: ['financial', 'revenue', 'costs'],
      thumbnail: '/dashboards/financial.jpg',
      isPublic: false,
      isStarred: false,
      isFavorite: true,
      widgets: 9,
      collaborators: 3,
      lastViewed: '2024-03-14T16:20:00Z',
      status: 'published',
      version: '3.0.0'
    },
    {
      id: 6,
      name: 'Quality Control Metrics',
      description: 'Quality assurance metrics, defect rates, and compliance',
      category: 'quality',
      owner: 'Lisa Taylor',
      ownerAvatar: '/avatars/06.png',
      createdAt: '2024-02-20T13:45:00Z',
      updatedAt: '2024-03-12T11:30:00Z',
      views: 312,
      stars: 29,
      shares: 12,
      tags: ['quality', 'compliance', 'metrics'],
      thumbnail: '/dashboards/quality.jpg',
      isPublic: true,
      isStarred: false,
      isFavorite: false,
      widgets: 7,
      collaborators: 2,
      lastViewed: '2024-03-12T14:15:00Z',
      status: 'draft',
      version: '0.9.0'
    },
    {
      id: 7,
      name: 'IoT Device Monitoring',
      description: 'Real-time IoT device status, health, and performance',
      category: 'iot',
      owner: 'Tom Anderson',
      ownerAvatar: '/avatars/07.png',
      createdAt: '2024-03-01T10:00:00Z',
      updatedAt: '2024-03-15T08:30:00Z',
      views: 189,
      stars: 23,
      shares: 8,
      tags: ['iot', 'devices', 'monitoring'],
      thumbnail: '/dashboards/iot.jpg',
      isPublic: true,
      isStarred: true,
      isFavorite: true,
      widgets: 11,
      collaborators: 4,
      lastViewed: '2024-03-15T09:15:00Z',
      status: 'published',
      version: '1.2.0'
    },
    {
      id: 8,
      name: 'Employee Performance',
      description: 'Team performance metrics, productivity, and efficiency',
      category: 'hr',
      owner: 'Rachel Green',
      ownerAvatar: '/avatars/08.png',
      createdAt: '2024-02-10T15:30:00Z',
      updatedAt: '2024-03-13T14:20:00Z',
      views: 278,
      stars: 31,
      shares: 14,
      tags: ['hr', 'performance', 'productivity'],
      thumbnail: '/dashboards/hr.jpg',
      isPublic: false,
      isStarred: false,
      isFavorite: false,
      widgets: 6,
      collaborators: 3,
      lastViewed: '2024-03-13T16:45:00Z',
      status: 'published',
      version: '1.1.0'
    }
  ];

  // Categories data
  const categories = [
    { id: 'all', name: 'All Dashboards', count: 24, icon: LayoutDashboard },
    { id: 'executive', name: 'Executive', count: 4, icon: Gauge },
    { id: 'inventory', name: 'Inventory', count: 5, icon: Package },
    { id: 'operations', name: 'Operations', count: 3, icon: Activity },
    { id: 'supply-chain', name: 'Supply Chain', count: 3, icon: Truck },
    { id: 'financial', name: 'Financial', count: 2, icon: DollarSign },
    { id: 'quality', name: 'Quality', count: 2, icon: Target },
    { id: 'iot', name: 'IoT', count: 3, icon: Cpu },
    { id: 'hr', name: 'HR', count: 2, icon: Users }
  ];

  // Owners data
  const owners = [
    { id: 'all', name: 'All Owners' },
    { id: 'john-smith', name: 'John Smith' },
    { id: 'sarah-johnson', name: 'Sarah Johnson' },
    { id: 'mike-wilson', name: 'Mike Wilson' },
    { id: 'emily-chen', name: 'Emily Chen' },
    { id: 'david-brown', name: 'David Brown' }
  ];

  // Tags data
  const availableTags = [
    'kpi', 'executive', 'inventory', 'warehouse', 'operations',
    'supply-chain', 'financial', 'quality', 'iot', 'hr',
    'performance', 'analytics', 'monitoring', 'compliance', 'revenue'
  ];

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: 'view',
      user: 'You',
      action: 'viewed',
      target: 'Executive Overview',
      time: '2 minutes ago',
      icon: Eye
    },
    {
      id: 2,
      type: 'edit',
      user: 'Sarah Johnson',
      action: 'updated',
      target: 'Inventory Performance',
      time: '15 minutes ago',
      icon: Edit
    },
    {
      id: 3,
      type: 'share',
      user: 'Mike Wilson',
      action: 'shared',
      target: 'Warehouse Operations',
      time: '1 hour ago',
      icon: Share2
    },
    {
      id: 4,
      type: 'star',
      user: 'Emily Chen',
      action: 'starred',
      target: 'Supply Chain Analytics',
      time: '3 hours ago',
      icon: Star
    },
    {
      id: 5,
      type: 'create',
      user: 'David Brown',
      action: 'created',
      target: 'Financial Dashboard',
      time: '5 hours ago',
      icon: Plus
    }
  ];

  // Template data
  const templates = [
    {
      id: 1,
      name: 'Blank Dashboard',
      description: 'Start from scratch with a blank canvas',
      icon: LayoutDashboard,
      widgets: 0
    },
    {
      id: 2,
      name: 'Executive Summary',
      description: 'Pre-built executive KPIs and metrics',
      icon: Gauge,
      widgets: 6
    },
    {
      id: 3,
      name: 'Inventory Overview',
      description: 'Complete inventory management dashboard',
      icon: Package,
      widgets: 8
    },
    {
      id: 4,
      name: 'Warehouse Operations',
      description: 'Warehouse efficiency and operations',
      icon: Warehouse,
      widgets: 7
    },
    {
      id: 5,
      name: 'Financial Analytics',
      description: 'Financial performance and metrics',
      icon: DollarSign,
      widgets: 5
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleCreateDashboard = () => {
    setCreateDialogOpen(false);
    // Add creation logic here
  };

  const handleEditDashboard = (dashboard) => {
    setSelectedDashboard(dashboard);
    setEditDialogOpen(true);
  };

  const handleDeleteDashboard = (dashboard) => {
    setSelectedDashboard(dashboard);
    setDeleteDialogOpen(true);
  };

  const handleShareDashboard = (dashboard) => {
    setSelectedDashboard(dashboard);
    setShareDialogOpen(true);
  };

  const handleCloneDashboard = (dashboard) => {
    setSelectedDashboard(dashboard);
    setCloneDialogOpen(true);
  };

  const handleExportDashboard = (dashboard) => {
    setSelectedDashboard(dashboard);
    setExportDialogOpen(true);
  };

  const handleImportDashboard = () => {
    setImportDialogOpen(true);
  };

  const handleSettings = () => {
    setSettingsDialogOpen(true);
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : LayoutDashboard;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredDashboards = dashboards.filter(dashboard => {
    // Category filter
    if (selectedCategory !== 'all' && dashboard.category !== selectedCategory) return false;
    
    // Owner filter
    if (selectedOwner !== 'all') {
      const ownerName = dashboard.owner.toLowerCase().replace(' ', '-');
      if (ownerName !== selectedOwner) return false;
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return dashboard.name.toLowerCase().includes(query) ||
             dashboard.description.toLowerCase().includes(query) ||
             dashboard.tags.some(tag => tag.toLowerCase().includes(query));
    }
    
    // Tags filter
    if (selectedTags.length > 0) {
      return selectedTags.some(tag => dashboard.tags.includes(tag));
    }
    
    return true;
  });

  const sortedDashboards = [...filteredDashboards].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortBy === 'updated') {
      return sortOrder === 'asc'
        ? new Date(a.updatedAt) - new Date(b.updatedAt)
        : new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    if (sortBy === 'views') {
      return sortOrder === 'asc' ? a.views - b.views : b.views - a.views;
    }
    if (sortBy === 'stars') {
      return sortOrder === 'asc' ? a.stars - b.stars : b.stars - a.stars;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F5EEE9]">
      {/* Header */}
      <div className="bg-white border-b border-[#F5EEE9] sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
                  <Home className="h-5 w-5" />
                </Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-black">Custom Dashboards</span>
              </div>
              <Badge className="bg-red-50 text-red-600 border-red-200 ml-2">
                {filteredDashboards.length} Dashboards
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search dashboards..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-[300px] border-[#F5EEE9] focus:border-red-600"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center border border-[#F5EEE9] rounded-lg bg-white">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "rounded-l-lg rounded-r-none px-3",
                    viewMode === 'grid' ? "bg-red-50 text-red-600" : "text-gray-500"
                  )}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "rounded-r-lg rounded-l-none px-3",
                    viewMode === 'list' ? "bg-red-50 text-red-600" : "text-gray-500"
                  )}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px] border-[#F5EEE9]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">Last Updated</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="stars">Most Starred</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="border-[#F5EEE9]"
              >
                {sortOrder === 'asc' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4 rotate-180" />
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "border-[#F5EEE9]",
                  showFilters && "bg-red-50 text-red-600 border-red-200"
                )}
              >
                <Filter className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                className="border-[#F5EEE9]"
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              </Button>

              <Button
                onClick={() => setCreateDialogOpen(true)}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Dashboard
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-[#F5EEE9] rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-black">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedOwner('all');
                    setSelectedTags([]);
                    setDateRange({ from: null, to: null });
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <Label className="text-xs text-gray-500">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="mt-1 bg-white border-[#F5EEE9]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Owner Filter */}
                <div>
                  <Label className="text-xs text-gray-500">Owner</Label>
                  <Select value={selectedOwner} onValueChange={setSelectedOwner}>
                    <SelectTrigger className="mt-1 bg-white border-[#F5EEE9]">
                      <SelectValue placeholder="All Owners" />
                    </SelectTrigger>
                    <SelectContent>
                      {owners.map(owner => (
                        <SelectItem key={owner.id} value={owner.id}>
                          {owner.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags Filter */}
                <div>
                  <Label className="text-xs text-gray-500">Tags</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mt-1 justify-between bg-white border-[#F5EEE9]"
                      >
                        {selectedTags.length > 0 
                          ? `${selectedTags.length} selected` 
                          : 'Select tags'}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-2">
                      <div className="space-y-2">
                        {availableTags.map(tag => (
                          <div key={tag} className="flex items-center space-x-2">
                            <Checkbox
                              id={tag}
                              checked={selectedTags.includes(tag)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedTags([...selectedTags, tag]);
                                } else {
                                  setSelectedTags(selectedTags.filter(t => t !== tag));
                                }
                              }}
                            />
                            <Label htmlFor={tag} className="text-sm capitalize">
                              {tag}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Date Range */}
                <div>
                  <Label className="text-xs text-gray-500">Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mt-1 justify-between bg-white border-[#F5EEE9]"
                      >
                        {dateRange.from ? (
                          dateRange.to ? (
                            `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                          ) : (
                            dateRange.from.toLocaleDateString()
                          )
                        ) : (
                          'Select range'
                        )}
                        <Calendar className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Categories Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-white border border-[#F5EEE9] p-1">
            {categories.map(category => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
                <Badge 
                  variant="secondary" 
                  className="ml-2 bg-[#F5EEE9] text-gray-600"
                >
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Dashboards</p>
                  <h3 className="text-2xl font-bold text-black mt-1">24</h3>
                  <p className="text-xs text-green-600 mt-1">+3 this month</p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <LayoutDashboard className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Views</p>
                  <h3 className="text-2xl font-bold text-black mt-1">4.6K</h3>
                  <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Stars</p>
                  <h3 className="text-2xl font-bold text-black mt-1">375</h3>
                  <p className="text-xs text-amber-600 mt-1">45 new this week</p>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Star className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Active Collaborators</p>
                  <h3 className="text-2xl font-bold text-black mt-1">28</h3>
                  <p className="text-xs text-purple-600 mt-1">across all dashboards</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-black">Start with a Template</h2>
            <Button variant="link" className="text-red-600">
              View All Templates
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {templates.map(template => (
              <Card 
                key={template.id}
                className="border-[#F5EEE9] hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCreateDashboard()}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-red-50 rounded-lg mb-3">
                      <template.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="font-medium text-black text-sm">{template.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                    <Badge variant="outline" className="mt-2 border-[#F5EEE9]">
                      {template.widgets} widgets
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dashboards Grid/List View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedDashboards.map(dashboard => (
              <ContextMenu key={dashboard.id}>
                <ContextMenuTrigger>
                  <Card className="border-[#F5EEE9] hover:shadow-lg transition-shadow group">
                    <CardHeader className="p-0">
                      <div className="relative h-32 bg-gradient-to-r from-red-50 to-red-100 rounded-t-lg overflow-hidden">
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          <Badge 
                            variant="secondary"
                            className={cn(
                              "bg-white/90 backdrop-blur-sm",
                              dashboard.status === 'published' ? 'text-green-600' : 'text-amber-600'
                            )}
                          >
                            {dashboard.status === 'published' ? 'Published' : 'Draft'}
                          </Badge>
                          {dashboard.isPublic ? (
                            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                              <Globe className="h-3 w-3 mr-1" />
                              Public
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                              <Lock className="h-3 w-3 mr-1" />
                              Private
                            </Badge>
                          )}
                        </div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1">
                          {dashboard.tags.slice(0, 2).map(tag => (
                            <Badge 
                              key={tag}
                              variant="secondary"
                              className="bg-white/90 backdrop-blur-sm text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {dashboard.tags.length > 2 && (
                            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs">
                              +{dashboard.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-black">{dashboard.name}</h3>
                            {dashboard.isStarred && (
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {dashboard.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={dashboard.ownerAvatar} />
                          <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                            {dashboard.owner.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{dashboard.owner}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          v{dashboard.version}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{dashboard.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{dashboard.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="h-3 w-3" />
                            <span>{dashboard.shares}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(dashboard.updatedAt)}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 border-t border-[#F5EEE9] mt-2">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-[#F5EEE9]">
                            {dashboard.widgets} widgets
                          </Badge>
                          <Badge variant="outline" className="border-[#F5EEE9]">
                            {dashboard.collaborators} collaborators
                          </Badge>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditDashboard(dashboard)}>
                              <Edit className="h-4 w-4 mr-2 text-red-600" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCloneDashboard(dashboard)}>
                              <Copy className="h-4 w-4 mr-2 text-blue-600" />
                              Clone
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareDashboard(dashboard)}>
                              <Share2 className="h-4 w-4 mr-2 text-green-600" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportDashboard(dashboard)}>
                              <Download className="h-4 w-4 mr-2 text-purple-600" />
                              Export
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <EyeOff className="h-4 w-4 mr-2 text-gray-600" />
                              Hide
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="h-4 w-4 mr-2 text-amber-600" />
                              {dashboard.isStarred ? 'Unstar' : 'Star'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2 text-gray-600" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteDashboard(dashboard)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardFooter>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Open Dashboard
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        ) : (
          // List View
          <Card className="border-[#F5EEE9]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F5EEE9]">
                  <TableHead className="w-[300px]">Dashboard</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Widgets</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Stars</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedDashboards.map(dashboard => (
                  <TableRow key={dashboard.id} className="hover:bg-[#F5EEE9]">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 rounded">
                          <LayoutDashboard className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium text-black flex items-center gap-2">
                            {dashboard.name}
                            {dashboard.isStarred && (
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {dashboard.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-[#F5EEE9] capitalize">
                        {dashboard.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                            {dashboard.owner.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{dashboard.owner}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={cn(
                          dashboard.status === 'published' 
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-amber-100 text-amber-700 border-amber-200'
                        )}
                      >
                        {dashboard.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {dashboard.isPublic ? (
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                          <Globe className="h-3 w-3 mr-1" />
                          Public
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                          <Lock className="h-3 w-3 mr-1" />
                          Private
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{dashboard.widgets}</TableCell>
                    <TableCell>{dashboard.views.toLocaleString()}</TableCell>
                    <TableCell>{dashboard.stars}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{formatDate(dashboard.updatedAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditDashboard(dashboard)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCloneDashboard(dashboard)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Clone
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareDashboard(dashboard)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteDashboard(dashboard)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Recent Activity Sidebar */}
        <div className="mt-8">
          <Card className="border-[#F5EEE9]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-1.5 bg-[#F5EEE9] rounded">
                      <activity.icon className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-black">{activity.user}</span>
                        <span className="text-gray-600"> {activity.action} </span>
                        <span className="font-medium text-black">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Dashboard Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Dashboard</DialogTitle>
            <DialogDescription>
              Create a custom dashboard to visualize your data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Dashboard Name</Label>
              <Input 
                id="name" 
                placeholder="e.g., Executive Overview" 
                className="border-[#F5EEE9] focus:border-red-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the purpose of this dashboard..."
                className="border-[#F5EEE9] focus:border-red-600"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger className="border-[#F5EEE9]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="template">Start from Template</Label>
                <Select>
                  <SelectTrigger className="border-[#F5EEE9]">
                    <SelectValue placeholder="Blank dashboard" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id.toString()}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup defaultValue="private" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    Private
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    Public
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {availableTags.slice(0, 6).map(tag => (
                  <Badge 
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateDashboard} className="bg-red-600 hover:bg-red-700">
              Create Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dashboard Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share Dashboard</DialogTitle>
            <DialogDescription>
              Share this dashboard with team members or make it public.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Share with people</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter email addresses..." 
                  className="border-[#F5EEE9] focus:border-red-600"
                />
                <Button className="bg-red-600 hover:bg-red-700">Add</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>People with access</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-[#F5EEE9] rounded">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Smith</p>
                      <p className="text-xs text-gray-500">john.smith@company.com</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Owner</Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-[#F5EEE9] rounded">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">sarah.j@company.com</p>
                    </div>
                  </div>
                  <Select defaultValue="editor">
                    <SelectTrigger className="w-[120px] border-0 bg-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Public access</Label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch id="public-access" />
                  <Label htmlFor="public-access">Anyone with the link can view</Label>
                </div>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Dashboard</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this dashboard? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDashboard && (
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-600">{selectedDashboard.name}</p>
              <p className="text-sm text-gray-600 mt-1">{selectedDashboard.description}</p>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>
              Delete Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Actions Floating Button */}
      <div className="fixed bottom-6 right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg">
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2 text-red-600" />
              New Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleImportDashboard}>
              <Upload className="h-4 w-4 mr-2 text-blue-600" />
              Import Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LayoutDashboard className="h-4 w-4 mr-2 text-green-600" />
              Browse Templates
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettings}>
              <Settings className="h-4 w-4 mr-2 text-gray-600" />
              Dashboard Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CustomDashboardsPage;