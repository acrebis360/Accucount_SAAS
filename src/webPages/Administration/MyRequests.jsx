// app/dashboard/administration/my-requests/page.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  FilePlus,

  FileSpreadsheet,
  FileJson,
  File,

  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  Home,
  ChevronRight,
  X,
  User,
  MessageSquare,
  Send,

  ArrowUp,
  ArrowDown,
  Minus,
  Ban,
  History,
  Paperclip,
  Key,
  Shield,
  HardDrive,
  Cpu,
  Monitor,
  DollarSign,
  Calendar as CalendarIcon,
  Settings,
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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MyRequestsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for request types
  const requestTypes = [
    { id: 'all', name: 'All Requests', count: 24, icon: FileText },
    { id: 'access', name: 'Access Requests', count: 5, icon: Key, color: 'purple' },
    { id: 'permission', name: 'Permission Changes', count: 3, icon: Shield, color: 'red' },
    { id: 'asset', name: 'Asset Requests', count: 4, icon: HardDrive, color: 'blue' },
    { id: 'software', name: 'Software Requests', count: 6, icon: Cpu, color: 'green' },
    { id: 'hardware', name: 'Hardware Requests', count: 3, icon: Monitor, color: 'orange' },
    { id: 'leave', name: 'Leave Requests', count: 2, icon: Calendar, color: 'teal' },
    { id: 'expense', name: 'Expense Claims', count: 1, icon: DollarSign, color: 'yellow' }
  ];

  // Mock data for requests
  const requests = [
    {
      id: 'REQ-001',
      type: 'access',
      title: 'Access to Warehouse Management System',
      description: 'Requesting access to the WMS module for inventory tracking and management.',
      status: 'pending',
      priority: 'high',
      createdBy: 'John Smith',
      createdAt: '2024-03-15T09:30:00Z',
      updatedAt: '2024-03-15T09:30:00Z',
      dueDate: '2024-03-20T00:00:00Z',
      assignedTo: 'Sarah Johnson',
      department: 'Operations',
      category: 'System Access',
      attachments: 2,
      comments: 3,
      impact: 'High - Required for daily operations',
      justification: 'Need access to manage inventory levels and process orders',
      approvalChain: [
        { name: 'Sarah Johnson', role: 'Operations Manager', status: 'pending', date: null },
        { name: 'Mike Wilson', role: 'IT Admin', status: 'pending', date: null }
      ],
      history: [
        { date: '2024-03-15T09:30:00Z', action: 'Request Created', user: 'John Smith' }
      ]
    },
    {
      id: 'REQ-002',
      type: 'permission',
      title: 'Elevate Permissions for Inventory Adjustments',
      description: 'Need permission to perform inventory adjustments and cycle counts.',
      status: 'approved',
      priority: 'medium',
      createdBy: 'Emily Chen',
      createdAt: '2024-03-14T14:20:00Z',
      updatedAt: '2024-03-15T10:30:00Z',
      dueDate: '2024-03-18T00:00:00Z',
      assignedTo: 'Mike Wilson',
      department: 'Inventory',
      category: 'Permission Change',
      attachments: 1,
      comments: 2,
      impact: 'Medium - Will improve inventory accuracy',
      justification: 'Currently cannot adjust inventory counts when discrepancies are found',
      approvalChain: [
        { name: 'Mike Wilson', role: 'Warehouse Manager', status: 'approved', date: '2024-03-15T09:15:00Z' },
        { name: 'Sarah Johnson', role: 'Operations Manager', status: 'approved', date: '2024-03-15T10:30:00Z' }
      ],
      history: [
        { date: '2024-03-15T10:30:00Z', action: 'Approved', user: 'Sarah Johnson' },
        { date: '2024-03-15T09:15:00Z', action: 'Approved', user: 'Mike Wilson' },
        { date: '2024-03-14T14:20:00Z', action: 'Request Created', user: 'Emily Chen' }
      ]
    },
    {
      id: 'REQ-003',
      type: 'hardware',
      title: 'New Laptop Request',
      description: 'Requesting a new laptop for the new inventory specialist.',
      status: 'in_progress',
      priority: 'medium',
      createdBy: 'Sarah Johnson',
      createdAt: '2024-03-13T11:30:00Z',
      updatedAt: '2024-03-14T15:45:00Z',
      dueDate: '2024-03-25T00:00:00Z',
      assignedTo: 'IT Department',
      department: 'IT',
      category: 'Hardware',
      attachments: 0,
      comments: 5,
      impact: 'Medium - New hire needs equipment',
      justification: 'New employee starting next week requires company laptop',
      specifications: 'Dell XPS 15, 16GB RAM, 512GB SSD',
      approvalChain: [
        { name: 'Finance Dept', role: 'Budget Approval', status: 'approved', date: '2024-03-14T09:30:00Z' },
        { name: 'IT Dept', role: 'Procurement', status: 'in_progress', date: null }
      ],
      history: [
        { date: '2024-03-14T15:45:00Z', action: 'Comment Added', user: 'IT Dept' },
        { date: '2024-03-14T09:30:00Z', action: 'Budget Approved', user: 'Finance Dept' },
        { date: '2024-03-13T11:30:00Z', action: 'Request Created', user: 'Sarah Johnson' }
      ]
    },
    {
      id: 'REQ-004',
      type: 'software',
      title: 'Adobe Creative Cloud License',
      description: 'Requesting Adobe Creative Cloud license for marketing team.',
      status: 'pending',
      priority: 'low',
      createdBy: 'Rachel Green',
      createdAt: '2024-03-12T16:45:00Z',
      updatedAt: '2024-03-12T16:45:00Z',
      dueDate: '2024-03-26T00:00:00Z',
      assignedTo: 'IT Department',
      department: 'Marketing',
      category: 'Software',
      attachments: 0,
      comments: 1,
      impact: 'Low - Would enhance design capabilities',
      justification: 'Need for creating marketing materials and graphics',
      licenseType: 'Annual subscription',
      users: 3,
      approvalChain: [
        { name: 'Marketing Director', role: 'Department Approval', status: 'pending', date: null },
        { name: 'IT Dept', role: 'Software Approval', status: 'pending', date: null },
        { name: 'Finance Dept', role: 'Budget Approval', status: 'pending', date: null }
      ],
      history: [
        { date: '2024-03-12T16:45:00Z', action: 'Request Created', user: 'Rachel Green' }
      ]
    },
    {
      id: 'REQ-005',
      type: 'access',
      title: 'VPN Access for Remote Work',
      description: 'Requesting VPN access to work from home occasionally.',
      status: 'approved',
      priority: 'medium',
      createdBy: 'David Brown',
      createdAt: '2024-03-11T10:15:00Z',
      updatedAt: '2024-03-13T14:20:00Z',
      dueDate: '2024-03-15T00:00:00Z',
      assignedTo: 'IT Department',
      department: 'Finance',
      category: 'System Access',
      attachments: 0,
      comments: 2,
      impact: 'Medium - Enables remote work flexibility',
      justification: 'Need to access financial systems when working from home',
      approvalChain: [
        { name: 'Finance Manager', role: 'Department Approval', status: 'approved', date: '2024-03-12T09:30:00Z' },
        { name: 'IT Security', role: 'Security Approval', status: 'approved', date: '2024-03-13T14:20:00Z' }
      ],
      history: [
        { date: '2024-03-13T14:20:00Z', action: 'Approved', user: 'IT Security' },
        { date: '2024-03-12T09:30:00Z', action: 'Approved', user: 'Finance Manager' },
        { date: '2024-03-11T10:15:00Z', action: 'Request Created', user: 'David Brown' }
      ]
    },
    {
      id: 'REQ-006',
      type: 'asset',
      title: 'RFID Scanner Replacement',
      description: 'Requesting replacement for faulty RFID scanner in Warehouse A.',
      status: 'rejected',
      priority: 'high',
      createdBy: 'Mike Wilson',
      createdAt: '2024-03-10T09:45:00Z',
      updatedAt: '2024-03-12T11:30:00Z',
      dueDate: '2024-03-14T00:00:00Z',
      assignedTo: 'IT Department',
      department: 'Warehouse',
      category: 'Hardware',
      attachments: 2,
      comments: 4,
      impact: 'High - Scanner is critical for operations',
      justification: 'Current scanner is malfunctioning and causing delays',
      rejectionReason: 'Budget constraints - Please submit in next quarter',
      approvalChain: [
        { name: 'Warehouse Manager', role: 'Department Approval', status: 'approved', date: '2024-03-11T10:30:00Z' },
        { name: 'Finance Dept', role: 'Budget Approval', status: 'rejected', date: '2024-03-12T11:30:00Z' }
      ],
      history: [
        { date: '2024-03-12T11:30:00Z', action: 'Rejected', user: 'Finance Dept' },
        { date: '2024-03-11T10:30:00Z', action: 'Approved', user: 'Warehouse Manager' },
        { date: '2024-03-10T09:45:00Z', action: 'Request Created', user: 'Mike Wilson' }
      ]
    },
    {
      id: 'REQ-007',
      type: 'leave',
      title: 'Annual Leave Request - April 15-20',
      description: 'Requesting 5 days of annual leave.',
      status: 'approved',
      priority: 'low',
      createdBy: 'Lisa Taylor',
      createdAt: '2024-03-09T13:30:00Z',
      updatedAt: '2024-03-11T09:20:00Z',
      dueDate: '2024-04-01T00:00:00Z',
      assignedTo: 'HR Department',
      department: 'Quality',
      category: 'Leave',
      attachments: 0,
      comments: 1,
      impact: 'Low - Team coverage arranged',
      leaveType: 'Annual Leave',
      days: 5,
      startDate: '2024-04-15',
      endDate: '2024-04-20',
      approvalChain: [
        { name: 'Mike Wilson', role: 'Manager', status: 'approved', date: '2024-03-10T14:15:00Z' },
        { name: 'HR Dept', role: 'HR Approval', status: 'approved', date: '2024-03-11T09:20:00Z' }
      ],
      history: [
        { date: '2024-03-11T09:20:00Z', action: 'Approved', user: 'HR Dept' },
        { date: '2024-03-10T14:15:00Z', action: 'Approved', user: 'Mike Wilson' },
        { date: '2024-03-09T13:30:00Z', action: 'Request Created', user: 'Lisa Taylor' }
      ]
    },
    {
      id: 'REQ-008',
      type: 'expense',
      title: 'Travel Expense Reimbursement',
      description: 'Reimbursement for business trip to client site.',
      status: 'pending',
      priority: 'medium',
      createdBy: 'Tom Anderson',
      createdAt: '2024-03-08T15:20:00Z',
      updatedAt: '2024-03-08T15:20:00Z',
      dueDate: '2024-03-22T00:00:00Z',
      assignedTo: 'Finance Department',
      department: 'IT',
      category: 'Expense',
      attachments: 4,
      comments: 0,
      amount: 1250.75,
      currency: 'USD',
      expenseType: 'Travel',
      dateIncurred: '2024-03-05',
      approvalChain: [
        { name: 'IT Manager', role: 'Department Approval', status: 'pending', date: null },
        { name: 'Finance Dept', role: 'Finance Approval', status: 'pending', date: null }
      ],
      history: [
        { date: '2024-03-08T15:20:00Z', action: 'Request Created', user: 'Tom Anderson' }
      ]
    }
  ];

  // Status configuration
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
    in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: RefreshCw },
    cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Ban },
    withdrawn: { label: 'Withdrawn', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: X }
  };

  // Priority configuration
  const priorityConfig = {
    high: { label: 'High', color: 'bg-red-100 text-red-700 border-red-200', icon: ArrowUp },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Minus },
    low: { label: 'Low', color: 'bg-green-100 text-green-700 border-green-200', icon: ArrowDown }
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || FileText;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-100 text-gray-700';
  };

  const getPriorityBadge = (priority) => {
    const config = priorityConfig[priority];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} px-2 py-0.5 text-xs`}>
        <Icon size={10} className="mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getTypeIcon = (type) => {
    const typeInfo = requestTypes.find(t => t.id === type);
    const Icon = typeInfo?.icon || FileText;
    return Icon;
  };

  const getTypeColor = (type) => {
    const typeInfo = requestTypes.find(t => t.id === type);
    return typeInfo?.color || 'gray';
  };

  // Helper function to render type icon
  const renderTypeIcon = (type, size = 16, className = "") => {
    const Icon = getTypeIcon(type);
    return <Icon size={size} className={className} />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredRequests = requests.filter(request => {
    if (selectedType !== 'all' && request.type !== selectedType) return false;
    if (selectedStatus !== 'all' && request.status !== selectedStatus) return false;
    if (selectedPriority !== 'all' && request.priority !== selectedPriority) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return request.title.toLowerCase().includes(query) ||
             request.id.toLowerCase().includes(query) ||
             request.description.toLowerCase().includes(query) ||
             request.department.toLowerCase().includes(query);
    }
    return true;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length
  };

  const handleSelectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(filteredRequests.map(r => r.id));
    }
  };

  const handleSelectRequest = (id) => {
    if (selectedRequests.includes(id)) {
      setSelectedRequests(selectedRequests.filter(r => r !== id));
    } else {
      setSelectedRequests([...selectedRequests, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
            <p className="text-gray-500 mt-1 text-sm">Track and manage all your requests</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px] border-gray-200 bg-white h-9">
                <SelectValue placeholder="Request Type" />
              </SelectTrigger>
              <SelectContent>
                {requestTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name} ({type.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-gray-200 h-9">
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
                  <File className="mr-2 h-4 w-4 text-red-600" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setExportDialogOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Export Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white h-9"
              onClick={() => setCreateDialogOpen(true)}
            >
              <FilePlus size={16} />
              New Request
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Requests</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <FileText size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Pending</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Clock size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Approved</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.approved}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">In Progress</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.inProgress}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <RefreshCw size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Rejected</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.rejected}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <XCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Request Type Distribution */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {requestTypes.filter(t => t.id !== 'all').slice(0, 4).map(type => {
          const Icon = type.icon;
          const percentage = (type.count / stats.total * 100).toFixed(0);
          
          return (
            <Card key={type.id} className="border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1 bg-${type.color}-100 rounded`}>
                    <Icon size={12} className={`text-${type.color}-600`} />
                  </div>
                  <span className="text-sm font-medium flex-1">{type.name}</span>
                  <span className="text-sm font-bold">{type.count}</span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-1.5 bg-gray-100" 
                  style={{ '--progress-background': `var(--${type.color}-600)` }}
                />
                <p className="text-xs text-gray-500 mt-1">{percentage}% of total</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by title, ID, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-red-600 h-9"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-gray-200 h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-[130px] border-gray-200 h-9">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="border-gray-200 h-9 w-9">
            <Filter size={16} />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-200 h-9 w-9">
            <RefreshCw size={16} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-red-600 hover:bg-red-700 h-9 w-9' : 'border-gray-200 h-9 w-9'}
          >
            <Grid size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-red-600 hover:bg-red-700 h-9 w-9' : 'border-gray-200 h-9 w-9'}
          >
            <List size={16} />
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedRequests.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white px-2 py-0.5">{selectedRequests.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedRequests([])} className="h-7 text-xs">
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Download size={14} className="mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Copy size={14} className="mr-2" />
              Duplicate
            </Button>
          </div>
        </div>
      )}

      {/* Requests Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredRequests.map((request) => {
            const typeColor = getTypeColor(request.type);
            const StatusIcon = statusConfig[request.status]?.icon || FileText;
            
            return (
              <ContextMenu key={request.id}>
                <ContextMenuTrigger>
                  <Card 
                    className="border-gray-200 hover:shadow-lg transition-all group cursor-pointer"
                    onClick={() => {
                      setSelectedRequest(request);
                      setViewDetailsDialogOpen(true);
                    }}
                  >
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className={`p-4 border-b border-gray-200 bg-gradient-to-r from-${typeColor}-50 to-transparent`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-${typeColor}-600 text-white rounded-lg`}>
                              {renderTypeIcon(request.type, 18)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                                  {request.id}
                                </Badge>
                                <Badge className={`${statusConfig[request.status]?.color} px-2 py-0.5 text-xs`}>
                                  <StatusIcon size={10} className="mr-1" />
                                  {statusConfig[request.status]?.label}
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-gray-900 text-base line-clamp-1">{request.title}</h3>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical size={14} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRequest(request);
                                setViewDetailsDialogOpen(true);
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {request.status === 'pending' && (
                                <>
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRequest(request);
                                    setEditDialogOpen(true);
                                  }}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRequest(request);
                                    setWithdrawDialogOpen(true);
                                  }}>
                                    <X className="mr-2 h-4 w-4" />
                                    Withdraw
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRequest(request);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="space-y-3">
                          {/* Description */}
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {request.description}
                          </p>

                          {/* Priority and Department */}
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(request.priority)}
                            <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                              {request.department}
                            </Badge>
                          </div>

                          {/* Assigned To */}
                          <div className="flex items-center gap-2 text-sm">
                            <User size={14} className="text-gray-400" />
                            <span className="text-gray-700">Assigned to: {request.assignedTo}</span>
                          </div>

                          {/* Due Date */}
                          {request.dueDate && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="text-gray-700">Due: {new Date(request.dueDate).toLocaleDateString()}</span>
                            </div>
                          )}

                          {/* Attachments and Comments */}
                          <div className="flex items-center gap-3">
                            {request.attachments > 0 && (
                              <div className="flex items-center gap-1">
                                <Paperclip size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-500">{request.attachments}</span>
                              </div>
                            )}
                            {request.comments > 0 && (
                              <div className="flex items-center gap-1">
                                <MessageSquare size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-500">{request.comments}</span>
                              </div>
                            )}
                          </div>

                          {/* Approval Chain Preview */}
                          <div className="flex items-center gap-1 pt-1">
                            {request.approvalChain.map((approver, idx) => (
                              <React.Fragment key={idx}>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center">
                                        <Avatar className="h-6 w-6">
                                          <AvatarFallback className={cn(
                                            "text-xs",
                                            approver.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            approver.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-700'
                                          )}>
                                            {approver.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                        {approver.status === 'approved' && (
                                          <CheckCircle size={8} className="text-green-600 -ml-1 -mt-2" />
                                        )}
                                        {approver.status === 'rejected' && (
                                          <XCircle size={8} className="text-red-600 -ml-1 -mt-2" />
                                        )}
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-sm">{approver.name} - {approver.role}</p>
                                      <p className="text-xs text-gray-500 capitalize">{approver.status}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                {idx < request.approvalChain.length - 1 && (
                                  <ChevronRight size={12} className="text-gray-300" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>Created {formatDate(request.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User size={12} />
                              <span>{request.createdBy}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem onClick={() => {
                    setSelectedRequest(request);
                    setViewDetailsDialogOpen(true);
                  }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </ContextMenuItem>
                  {request.status === 'pending' && (
                    <>
                      <ContextMenuItem onClick={() => {
                        setSelectedRequest(request);
                        setEditDialogOpen(true);
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Request
                      </ContextMenuItem>
                      <ContextMenuItem onClick={() => {
                        setSelectedRequest(request);
                        setWithdrawDialogOpen(true);
                      }}>
                        <X className="mr-2 h-4 w-4" />
                        Withdraw
                      </ContextMenuItem>
                    </>
                  )}
                  <ContextMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
          {filteredRequests.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <FileText size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-500">No requests found</h3>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      ) : (
        // List View
        <Card className="border-gray-200">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 bg-gray-50">
                  <TableHead className="w-8">
                    <Checkbox 
                      checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Request</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Type</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Priority</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Status</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Assigned To</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Created</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Due Date</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Attachments</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => {
                  const typeColor = getTypeColor(request.type);
                  
                  return (
                    <TableRow 
                      key={request.id} 
                      className="border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedRequest(request);
                        setViewDetailsDialogOpen(true);
                      }}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedRequests.includes(request.id)}
                          onCheckedChange={() => handleSelectRequest(request.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 bg-${typeColor}-100 rounded`}>
                            {renderTypeIcon(request.type, 14, `text-${typeColor}-600`)}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-900">{request.title}</div>
                            <div className="text-xs text-gray-500">{request.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-200 capitalize text-xs px-2 py-0.5">
                          {request.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[request.status]?.color} text-xs px-2 py-0.5`}>
                          {statusConfig[request.status]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{request.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-sm">{formatDate(request.createdAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {request.dueDate ? (
                          <div className="flex items-center gap-1">
                            <Calendar size={12} className="text-gray-400" />
                            <span className="text-sm">{new Date(request.dueDate).toLocaleDateString()}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{request.attachments}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedRequest(request);
                              setViewDetailsDialogOpen(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            {request.status === 'pending' && (
                              <DropdownMenuItem onClick={() => {
                                setSelectedRequest(request);
                                setEditDialogOpen(true);
                              }}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => {
                                setSelectedRequest(request);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      No requests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-500">
                Showing {filteredRequests.length} of {requests.length} requests
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled className="h-8 text-xs">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-red-600 text-white border-red-600 h-8 text-xs">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  3
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Next
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* View Details Dialog */}
      <Dialog open={viewDetailsDialogOpen} onOpenChange={setViewDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <div className={`p-2 bg-${getTypeColor(selectedRequest.type)}-100 rounded-lg`}>
                    {renderTypeIcon(selectedRequest.type, 20, `text-${getTypeColor(selectedRequest.type)}-600`)}
                  </div>
                  <div>
                    <span>{selectedRequest.title}</span>
                    <DialogDescription className="text-sm">
                      {selectedRequest.id} • {selectedRequest.type} • {selectedRequest.department}
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid grid-cols-4 bg-gray-100">
                  <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
                  <TabsTrigger value="approval" className="text-sm">Approval Chain</TabsTrigger>
                  <TabsTrigger value="comments" className="text-sm">Comments</TabsTrigger>
                  <TabsTrigger value="history" className="text-sm">History</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-sm">{selectedRequest.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Status</p>
                      <Badge className={`${statusConfig[selectedRequest.status]?.color} text-xs px-2 py-0.5`}>
                        {statusConfig[selectedRequest.status]?.label}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Priority</p>
                      {getPriorityBadge(selectedRequest.priority)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Created By</p>
                      <p className="text-sm">{selectedRequest.createdBy}</p>
                      <p className="text-xs text-gray-500">{formatDate(selectedRequest.createdAt)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Assigned To</p>
                      <p className="text-sm">{selectedRequest.assignedTo}</p>
                    </div>
                  </div>

                  {selectedRequest.dueDate && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p className="text-sm">{new Date(selectedRequest.dueDate).toLocaleDateString()}</p>
                    </div>
                  )}

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Impact</p>
                    <p className="text-sm">{selectedRequest.impact}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Justification</p>
                    <p className="text-sm">{selectedRequest.justification}</p>
                  </div>

                  {selectedRequest.rejectionReason && (
                    <Alert className="bg-red-50 border-red-200">
                      <XCircle size={14} className="text-red-600" />
                      <AlertTitle className="text-xs font-medium text-red-700">Rejection Reason</AlertTitle>
                      <AlertDescription className="text-xs text-red-600/70">
                        {selectedRequest.rejectionReason}
                      </AlertDescription>
                    </Alert>
                  )}

                  {selectedRequest.specifications && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Specifications</p>
                      <p className="text-sm">{selectedRequest.specifications}</p>
                    </div>
                  )}

                  {selectedRequest.amount && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-lg font-bold">{selectedRequest.currency} {selectedRequest.amount.toFixed(2)}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="approval" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    {selectedRequest.approvalChain.map((approver, idx) => (
                      <Card key={idx} className="border-gray-200">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className={cn(
                                  approver.status === 'approved' ? 'bg-green-100 text-green-700' :
                                  approver.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                  'bg-gray-100 text-gray-700',
                                  'text-xs'
                                )}>
                                  {approver.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{approver.name}</p>
                                <p className="text-xs text-gray-500">{approver.role}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={cn(
                                approver.status === 'approved' ? 'bg-green-100 text-green-700' :
                                approver.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700',
                                'text-xs px-2 py-0.5'
                              )}>
                                {approver.status === 'approved' && <CheckCircle size={10} className="mr-1" />}
                                {approver.status === 'rejected' && <XCircle size={10} className="mr-1" />}
                                {approver.status === 'pending' && <Clock size={10} className="mr-1" />}
                                {approver.status.charAt(0).toUpperCase() + approver.status.slice(1)}
                              </Badge>
                              {approver.date && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(approver.date).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="space-y-4 mt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Input placeholder="Add a comment..." className="flex-1 h-9" />
                    <Button className="bg-red-600 hover:bg-red-700 h-9">
                      <Send size={14} className="mr-2" />
                      Post
                    </Button>
                  </div>

                  <ScrollArea className="h-48">
                    <div className="space-y-3">
                      {/* Sample comments - in real app would come from data */}
                      <div className="flex gap-2 p-2 bg-gray-50 rounded">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-red-100 text-red-600 text-xs">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">John Doe</p>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-sm">This request has been reviewed and is pending approval.</p>
                        </div>
                      </div>
                      <div className="flex gap-2 p-2 bg-gray-50 rounded">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">SA</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Sarah Admin</p>
                            <span className="text-xs text-gray-500">5 hours ago</span>
                          </div>
                          <p className="text-sm">Please provide additional justification for this request.</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="history" className="space-y-4 mt-4">
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {selectedRequest.history.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 border border-gray-200 rounded">
                          <History size={12} className="text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                            </div>
                            <p className="text-xs text-gray-500">By: {item.user}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setViewDetailsDialogOpen(false)} className="h-9">
                  Close
                </Button>
                {selectedRequest.status === 'pending' && (
                  <>
                    <Button 
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 h-9"
                      onClick={() => {
                        setViewDetailsDialogOpen(false);
                        setWithdrawDialogOpen(true);
                      }}
                    >
                      <X size={14} className="mr-2" />
                      Withdraw
                    </Button>
                    <Button 
                      className="bg-red-600 hover:bg-red-700 h-9"
                      onClick={() => {
                        setViewDetailsDialogOpen(false);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Edit size={14} className="mr-2" />
                      Edit Request
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Request Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Create New Request</DialogTitle>
            <DialogDescription className="text-sm">
              Submit a new request for approval
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4 bg-gray-100">
                <TabsTrigger value="basic" className="text-sm">Basic Info</TabsTrigger>
                <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
                <TabsTrigger value="attachments" className="text-sm">Attachments</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Request Type</Label>
                  <Select>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="access">Access Request</SelectItem>
                      <SelectItem value="permission">Permission Change</SelectItem>
                      <SelectItem value="asset">Asset Request</SelectItem>
                      <SelectItem value="software">Software Request</SelectItem>
                      <SelectItem value="hardware">Hardware Request</SelectItem>
                      <SelectItem value="leave">Leave Request</SelectItem>
                      <SelectItem value="expense">Expense Claim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Title</Label>
                  <Input placeholder="Brief title for your request" className="h-9" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Description</Label>
                  <Textarea placeholder="Detailed description of your request" rows={3} className="text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Department</Label>
                    <Select>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                        <SelectItem value="warehouse">Warehouse</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Impact</Label>
                  <Textarea placeholder="Describe the impact of this request" rows={2} className="text-sm" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Justification</Label>
                  <Textarea placeholder="Explain why this request is needed" rows={2} className="text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Due Date</Label>
                    <Input type="date" className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Category</Label>
                    <Input placeholder="e.g., Hardware, Software, etc." className="h-9" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="space-y-4">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium mb-1">Drop files here</p>
                  <p className="text-xs text-gray-500 mb-3">or click to browse</p>
                  <Input type="file" className="hidden" id="file-upload" />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById('file-upload').click()} className="h-8 text-xs">
                    Choose Files
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">Max file size: 10MB each</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Additional Notes</Label>
                  <Textarea placeholder="Any additional information" rows={2} className="text-sm" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Request Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Edit Request</DialogTitle>
            <DialogDescription className="text-sm">
              Update your request details
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-sm">Title</Label>
                <Input defaultValue={selectedRequest.title} className="h-9" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Description</Label>
                <Textarea defaultValue={selectedRequest.description} rows={3} className="text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Priority</Label>
                  <Select defaultValue={selectedRequest.priority}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Due Date</Label>
                  <Input type="date" defaultValue={selectedRequest.dueDate?.split('T')[0]} className="h-9" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Justification</Label>
                <Textarea defaultValue={selectedRequest.justification} rows={2} className="text-sm" />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Confirmation Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Withdraw Request</DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to withdraw this request?
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-${getTypeColor(selectedRequest.type)}-100 rounded`}>
                  {renderTypeIcon(selectedRequest.type, 16, `text-${getTypeColor(selectedRequest.type)}-600`)}
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-700">{selectedRequest.title}</p>
                  <p className="text-xs text-gray-500">{selectedRequest.id}</p>
                </div>
              </div>
              <div className="flex items-start gap-1 text-xs text-amber-600">
                <AlertTriangle size={12} className="mt-0.5" />
                <span>This will cancel the request and notify all approvers.</span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setWithdrawDialogOpen(false)} className="h-9">
              Withdraw Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Delete Request</DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to delete this request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-${getTypeColor(selectedRequest.type)}-100 rounded`}>
                  {renderTypeIcon(selectedRequest.type, 16, `text-${getTypeColor(selectedRequest.type)}-600`)}
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600">{selectedRequest.title}</p>
                  <p className="text-xs text-gray-500">{selectedRequest.id}</p>
                </div>
              </div>
              <div className="flex items-start gap-1 text-xs text-amber-600">
                <AlertTriangle size={12} className="mt-0.5" />
                <span>This will permanently remove this request from the system.</span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)} className="h-9">
              Delete Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Export Requests</DialogTitle>
            <DialogDescription className="text-sm">
              Choose export format and options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm">Export Format</Label>
              <RadioGroup defaultValue="excel">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel" className="flex items-center gap-2 text-sm">
                    <FileSpreadsheet size={16} className="text-green-600" />
                    Excel (.xlsx)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="json" id="json" />
                  <Label htmlFor="json" className="flex items-center gap-2 text-sm">
                    <FileJson size={16} className="text-blue-600" />
                    JSON (.json)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="flex items-center gap-2 text-sm">
                    <File size={16} className="text-gray-600" />
                    CSV (.csv)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Date Range</Label>
              <Select defaultValue="all">
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="this-month">This month</SelectItem>
                  <SelectItem value="last-month">Last month</SelectItem>
                  <SelectItem value="this-quarter">This quarter</SelectItem>
                  <SelectItem value="this-year">This year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Include</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-comments" defaultChecked />
                  <Label htmlFor="include-comments" className="text-sm">Comments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-history" defaultChecked />
                  <Label htmlFor="include-history" className="text-sm">History</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-attachments" />
                  <Label htmlFor="include-attachments" className="text-sm">Attachments</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Request Settings</DialogTitle>
            <DialogDescription className="text-sm">
              Configure request management options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="notifications">
                <AccordionTrigger className="text-sm">Notifications</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Email when request is approved</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Email when request is rejected</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Email when comment is added</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Email when status changes</Label>
                    <Switch defaultChecked />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="defaults">
                <AccordionTrigger className="text-sm">Default Values</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Default priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Default department</Label>
                    <Select defaultValue="my">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="my">My Department</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="display">
                <AccordionTrigger className="text-sm">Display Settings</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show archived requests</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Group by type</Label>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Default view</Label>
                    <Select defaultValue="grid">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid View</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Save Settings
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
                onClick={() => setCreateDialogOpen(true)}
              >
                <FilePlus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">New Request</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setExportDialogOpen(true)}
              >
                <Download size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Export</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg"
                onClick={() => setSettingsDialogOpen(true)}
              >
                <Settings size={20} className="text-gray-900" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MyRequestsPage;