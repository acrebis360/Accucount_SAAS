// app/dashboard/notifications/page.js
'use client';

import { useState } from 'react';
import { 
  Bell,
  BellRing,
  BellOff,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Clock,
  Users,
  Package,
  Truck,
  ShoppingCart,
  FileText,
  Settings,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Trash2,
  Archive,
  MessageCircle,
  Mail,
 
  History,
  Wrench,

} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Sample notifications data
  const notifications = [
    {
      id: 'NOTIF-001',
      title: 'Inventory Alert: Low Stock',
      message: 'SKU-001 (Premium Wireless Headphones) is below reorder point. Current stock: 45 units, Reorder point: 50 units.',
      type: 'alert',
      category: 'inventory',
      priority: 'high',
      status: 'unread',
      timestamp: '2024-03-17 09:30:00',
      read: false,
      actionable: true,
      actions: [
        { label: 'View Item', link: '/inventory/sku-001' },
        { label: 'Create PO', link: '/purchase-orders/create' },
      ],
      sender: {
        name: 'Inventory System',
        avatar: null,
        icon: Package,
      },
      metadata: {
        sku: 'SKU-001',
        currentStock: 45,
        reorderPoint: 50,
      },
      expiresAt: '2024-03-20',
      tags: ['inventory', 'low-stock', 'urgent'],
    },
    {
      id: 'NOTIF-002',
      title: 'Shipment Delayed: ORD-1240',
      message: 'Shipment for order ORD-1240 is delayed due to weather conditions. Expected delivery: March 19.',
      type: 'alert',
      category: 'shipping',
      priority: 'high',
      status: 'unread',
      timestamp: '2024-03-17 08:45:00',
      read: false,
      actionable: true,
      actions: [
        { label: 'Track Shipment', link: '/shipping/ord-1240' },
        { label: 'Contact Carrier', link: '/shipping/carrier' },
      ],
      sender: {
        name: 'Shipping System',
        avatar: null,
        icon: Truck,
      },
      metadata: {
        orderId: 'ORD-1240',
        carrier: 'UPS',
        delayReason: 'Weather',
      },
      expiresAt: '2024-03-19',
      tags: ['shipping', 'delay', 'order'],
    },
    {
      id: 'NOTIF-003',
      title: 'New Message from John Smith',
      message: 'John Smith sent you a message regarding the inventory count schedule.',
      type: 'message',
      category: 'communication',
      priority: 'medium',
      status: 'unread',
      timestamp: '2024-03-17 10:15:00',
      read: false,
      actionable: true,
      actions: [
        { label: 'View Message', link: '/messages/msg-001' },
        { label: 'Reply', link: '/messages/compose' },
      ],
      sender: {
        name: 'John Smith',
        avatar: null,
        initials: 'JS',
      },
      metadata: {
        messageId: 'MSG-001',
        subject: 'Inventory Count Schedule',
      },
      tags: ['message', 'inventory'],
    },
    {
      id: 'NOTIF-004',
      title: 'System Maintenance Tonight',
      message: 'Scheduled maintenance for inventory system tonight from 2:00 AM to 4:00 AM. System will be unavailable.',
      type: 'info',
      category: 'system',
      priority: 'medium',
      status: 'read',
      timestamp: '2024-03-16 14:00:00',
      read: true,
      actionable: false,
      actions: [],
      sender: {
        name: 'IT Department',
        avatar: null,
        icon: Settings,
      },
      metadata: {
        startTime: '2024-03-18 02:00',
        endTime: '2024-03-18 04:00',
        system: 'Inventory Management',
      },
      expiresAt: '2024-03-18',
      tags: ['system', 'maintenance', 'downtime'],
    },
    {
      id: 'NOTIF-005',
      title: 'Task Assigned: Cycle Count',
      message: 'You have been assigned to complete cycle count for Warehouse A, Zone 3.',
      type: 'task',
      category: 'work',
      priority: 'medium',
      status: 'unread',
      timestamp: '2024-03-17 11:00:00',
      read: false,
      actionable: true,
      actions: [
        { label: 'View Task', link: '/tasks/cycle-count-001' },
        { label: 'Mark Complete', link: '#' },
      ],
      sender: {
        name: 'Sarah Wilson',
        avatar: null,
        initials: 'SW',
      },
      metadata: {
        taskId: 'TSK-001',
        dueDate: '2024-03-18',
        location: 'Warehouse A, Zone 3',
      },
      dueDate: '2024-03-18',
      tags: ['task', 'cycle-count', 'assignment'],
    },
    {
      id: 'NOTIF-006',
      title: 'Purchase Order Approved: PO-2024-001',
      message: 'Your purchase order PO-2024-001 has been approved and sent to supplier.',
      type: 'success',
      category: 'procurement',
      priority: 'low',
      status: 'read',
      timestamp: '2024-03-16 16:30:00',
      read: true,
      actionable: true,
      actions: [
        { label: 'View PO', link: '/purchase-orders/po-2024-001' },
      ],
      sender: {
        name: 'Procurement System',
        avatar: null,
        icon: ShoppingCart,
      },
      metadata: {
        poId: 'PO-2024-001',
        supplier: 'Tech Supplies Inc',
        amount: '$12,450',
      },
      tags: ['po', 'procurement', 'approved'],
    },
    {
      id: 'NOTIF-007',
      title: 'New Comment on Your Report',
      message: 'Mike Johnson commented on your Q1 inventory report: "Great work! Can you add the variance analysis?"',
      type: 'comment',
      category: 'social',
      priority: 'low',
      status: 'unread',
      timestamp: '2024-03-17 09:45:00',
      read: false,
      actionable: true,
      actions: [
        { label: 'View Comment', link: '/reports/q1-inventory' },
        { label: 'Reply', link: '#' },
      ],
      sender: {
        name: 'Mike Johnson',
        avatar: null,
        initials: 'MJ',
      },
      metadata: {
        reportId: 'RPT-001',
        reportName: 'Q1 Inventory Report',
      },
      tags: ['comment', 'report', 'feedback'],
    },
    {
      id: 'NOTIF-008',
      title: 'New User Registered',
      message: 'New user Emma Watson has registered and requires access approval.',
      type: 'info',
      category: 'admin',
      priority: 'medium',
      status: 'unread',
      timestamp: '2024-03-17 08:30:00',
      read: false,
      actionable: true,
      actions: [
        { label: 'Review User', link: '/admin/users/emma-watson' },
        { label: 'Approve Access', link: '#' },
      ],
      sender: {
        name: 'User Management',
        avatar: null,
        icon: Users,
      },
      metadata: {
        userId: 'USR-008',
        email: 'emma.watson@company.com',
        role: 'Inventory Specialist',
      },
      tags: ['user', 'registration', 'pending'],
    },
    {
      id: 'NOTIF-009',
      title: 'Quality Check Failed: Batch BATCH-006',
      message: 'Batch BATCH-006 (Canned Organic Soup) failed quality inspection. 50 units quarantined.',
      type: 'alert',
      category: 'quality',
      priority: 'high',
      status: 'unread',
      timestamp: '2024-03-17 07:15:00',
      read: false,
      actionable: true,
      actions: [
        { label: 'View Batch', link: '/inventory/batch-BATCH-006' },
        { label: 'Review Report', link: '/quality/batch-BATCH-006' },
      ],
      sender: {
        name: 'Quality Control',
        avatar: null,
        icon: AlertTriangle,
      },
      metadata: {
        batchId: 'BATCH-006',
        product: 'Canned Organic Soup',
        quantity: 50,
        reason: 'Label damage',
      },
      tags: ['quality', 'failed', 'quarantine'],
    },
    {
      id: 'NOTIF-010',
      title: 'Weekly Report Ready',
      message: 'Your weekly inventory report for March 10-16 is ready for review.',
      type: 'info',
      category: 'reporting',
      priority: 'low',
      status: 'read',
      timestamp: '2024-03-17 06:00:00',
      read: true,
      actionable: true,
      actions: [
        { label: 'View Report', link: '/reports/weekly' },
        { label: 'Download PDF', link: '#' },
      ],
      sender: {
        name: 'Reporting System',
        avatar: null,
        icon: FileText,
      },
      metadata: {
        reportId: 'RPT-WK-12',
        period: 'March 10-16',
        format: 'PDF',
      },
      tags: ['report', 'weekly', 'automated'],
    },
    {
      id: 'NOTIF-011',
      title: 'Equipment Maintenance Due',
      message: 'Forklift FL-001 is due for scheduled maintenance. Please schedule service.',
      type: 'reminder',
      category: 'maintenance',
      priority: 'medium',
      status: 'unread',
      timestamp: '2024-03-16 23:00:00',
      read: false,
      actionable: true,
      actions: [
        { label: 'View Equipment', link: '/assets/forklift-fl-001' },
        { label: 'Schedule Service', link: '/maintenance/schedule' },
      ],
      sender: {
        name: 'Maintenance System',
        avatar: null,
        icon: Wrench,
      },
      metadata: {
        assetId: 'AST-001',
        assetName: 'Forklift FL-001',
        lastService: '2024-02-16',
        dueDate: '2024-03-16',
      },
      dueDate: '2024-03-16',
      tags: ['maintenance', 'equipment', 'due'],
    },
    {
      id: 'NOTIF-012',
      title: 'Welcome to the Team!',
      message: 'Welcome to the company! Please complete your onboarding tasks.',
      type: 'info',
      category: 'hr',
      priority: 'medium',
      status: 'read',
      timestamp: '2024-03-15 09:00:00',
      read: true,
      actionable: true,
      actions: [
        { label: 'Start Onboarding', link: '/onboarding' },
        { label: 'View Handbook', link: '/handbook' },
      ],
      sender: {
        name: 'HR Department',
        avatar: null,
        icon: Users,
      },
      metadata: {
        employeeId: 'EMP-123',
        startDate: '2024-03-15',
      },
      tags: ['welcome', 'onboarding', 'hr'],
    },
  ];

  // Notification types for filtering
  const notificationTypes = [
    { id: 'all', name: 'All Notifications', icon: Bell, count: notifications.length },
    { id: 'unread', name: 'Unread', icon: BellRing, count: notifications.filter(n => !n.read).length },
    { id: 'alerts', name: 'Alerts', icon: AlertTriangle, count: notifications.filter(n => n.type === 'alert').length },
    { id: 'messages', name: 'Messages', icon: Mail, count: notifications.filter(n => n.type === 'message').length },
    { id: 'tasks', name: 'Tasks', icon: CheckCircle, count: notifications.filter(n => n.type === 'task').length },
    { id: 'info', name: 'Information', icon: Info, count: notifications.filter(n => n.type === 'info').length },
    { id: 'success', name: 'Success', icon: CheckCircle, count: notifications.filter(n => n.type === 'success').length },
    { id: 'reminders', name: 'Reminders', icon: Clock, count: notifications.filter(n => n.type === 'reminder').length },
  ];

  // Priority configuration
  const priorityConfig = {
    high: { label: 'High', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
    medium: { label: 'Medium', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    low: { label: 'Low', color: 'bg-green-50 text-green-700 border-green-200', icon: Info },
  };

  const typeConfig = {
    alert: { label: 'Alert', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
    message: { label: 'Message', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Mail },
    task: { label: 'Task', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: CheckCircle },
    info: { label: 'Info', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Info },
    success: { label: 'Success', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    reminder: { label: 'Reminder', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    comment: { label: 'Comment', color: 'bg-pink-50 text-pink-700 border-pink-200', icon: MessageCircle },
  };

  const getPriorityIcon = (priority) => {
    const config = priorityConfig[priority];
    const Icon = config?.icon || Info;
    return <Icon size={14} />;
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-50 text-gray-700';
  };

  const getTypeIcon = (type) => {
    const config = typeConfig[type];
    const Icon = config?.icon || Bell;
    return Icon;
  };

  const getTypeColor = (type) => {
    return typeConfig[type]?.color || 'bg-gray-50 text-gray-700';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'inventory': return <Package size={16} className="text-blue-600" />;
      case 'shipping': return <Truck size={16} className="text-green-600" />;
      case 'communication': return <MessageCircle size={16} className="text-purple-600" />;
      case 'system': return <Settings size={16} className="text-gray-600" />;
      case 'work': return <CheckCircle size={16} className="text-orange-600" />;
      case 'procurement': return <ShoppingCart size={16} className="text-yellow-600" />;
      case 'social': return <Users size={16} className="text-pink-600" />;
      case 'admin': return <Users size={16} className="text-red-600" />;
      case 'quality': return <AlertTriangle size={16} className="text-red-600" />;
      case 'reporting': return <FileText size={16} className="text-indigo-600" />;
      case 'maintenance': return <Wrench size={16} className="text-orange-600" />;
      case 'hr': return <Users size={16} className="text-teal-600" />;
      default: return <Bell size={16} className="text-red-600" />;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || (selectedStatus === 'unread' ? !notification.read : notification.read);
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'unread') {
      return matchesType && matchesSearch && !notification.read;
    }
    return matchesType && matchesStatus && matchesSearch;
  });

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    alerts: notifications.filter(n => n.type === 'alert').length,
    messages: notifications.filter(n => n.type === 'message').length,
    tasks: notifications.filter(n => n.type === 'task').length,
    highPriority: notifications.filter(n => n.priority === 'high').length,
  };

  const handleMarkAsRead = (id) => {
    // In real app, would update the notification
    console.log('Mark as read:', id);
  };

  const handleMarkAllAsRead = () => {
    // In real app, would update all notifications
    console.log('Mark all as read');
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const handleSelectNotification = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(n => n !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Notifications</h1>
            <p className="text-black/50 mt-1">Stay updated with alerts, messages, and system events</p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#F5EEE9]">
                  <Settings size={16} />
                  Settings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <BellRing className="mr-2 h-4 w-4" />
                  Notification Preferences
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellOff className="mr-2 h-4 w-4" />
                  Mute Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <History className="mr-2 h-4 w-4" />
                  Notification History
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={handleMarkAllAsRead}
            >
              <CheckCircle size={16} />
              Mark All Read
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowSettingsDialog(true)}
            >
              <Bell size={16} />
              Configure
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Bell size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Unread</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.unread}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <BellRing size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Alerts</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.alerts}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertTriangle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Messages</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.messages}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Mail size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Tasks</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.tasks}</p>
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
                  <p className="text-xs text-black/50">High Priority</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.highPriority}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-[#F5EEE9]">
          <TabsTrigger value="all" className="data-[state=active]:bg-white">
            <Bell size={16} className="mr-2" />
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="data-[state=active]:bg-white">
            <BellRing size={16} className="mr-2" />
            Unread
            {stats.unread > 0 && (
              <Badge className="ml-2 bg-red-600 text-white">{stats.unread}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-white">
            <AlertTriangle size={16} className="mr-2" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-white">
            <Mail size={16} className="mr-2" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-white">
            <CheckCircle size={16} className="mr-2" />
            Tasks
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="alert">Alerts</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="task">Tasks</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="reminder">Reminders</SelectItem>
              <SelectItem value="comment">Comments</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="border-[#F5EEE9]">
            <Filter size={16} />
          </Button>
          <Button variant="outline" size="icon" className="border-[#F5EEE9]">
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedNotifications.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedNotifications.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedNotifications([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <CheckCircle size={14} className="mr-2" />
              Mark Read
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Archive size={14} className="mr-2" />
              Archive
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-red-600">
              <Trash2 size={14} className="mr-2" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <Card className="border-[#F5EEE9]">
        <CardContent className="p-0">
          <div className="divide-y divide-[#F5EEE9]">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center">
                <Bell size={48} className="mx-auto text-black/20 mb-4" />
                <p className="text-black/50">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const TypeIcon = getTypeIcon(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 p-4 hover:bg-[#F5EEE9]/30 cursor-pointer transition-colors relative",
                      !notification.read && "bg-blue-50/30"
                    )}
                    onClick={() => {
                      setSelectedNotification(notification);
                      setShowDetailsDialog(true);
                    }}
                  >
                    {/* Selection Checkbox */}
                    <Checkbox
                      checked={selectedNotifications.includes(notification.id)}
                      onCheckedChange={() => handleSelectNotification(notification.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1"
                    />

                    {/* Icon/Avatar */}
                    <div className="flex-shrink-0">
                      {notification.sender.avatar ? (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={notification.sender.avatar} />
                          <AvatarFallback>{notification.sender.initials}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center",
                          notification.type === 'alert' && 'bg-red-100',
                          notification.type === 'message' && 'bg-blue-100',
                          notification.type === 'task' && 'bg-purple-100',
                          notification.type === 'info' && 'bg-gray-100',
                          notification.type === 'success' && 'bg-green-100',
                          notification.type === 'reminder' && 'bg-yellow-100',
                        )}>
                          {notification.sender.icon ? (
                            <notification.sender.icon size={20} className={cn(
                              notification.type === 'alert' && 'text-red-600',
                              notification.type === 'message' && 'text-blue-600',
                              notification.type === 'task' && 'text-purple-600',
                              notification.type === 'info' && 'text-gray-600',
                              notification.type === 'success' && 'text-green-600',
                              notification.type === 'reminder' && 'text-yellow-600',
                            )} />
                          ) : (
                            <span className="text-sm font-medium text-gray-600">
                              {notification.sender.initials}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-black">
                            {notification.sender.name}
                          </span>
                          <Badge className={cn("text-[10px]", getPriorityColor(notification.priority))}>
                            {getPriorityIcon(notification.priority)}
                            <span className="ml-1 capitalize">{notification.priority}</span>
                          </Badge>
                          <Badge className={cn("text-[10px]", getTypeColor(notification.type))}>
                            <TypeIcon size={10} className="mr-1" />
                            {notification.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                          <span className="text-xs text-black/50">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm font-medium text-black mb-1">
                        {notification.title}
                      </p>
                      
                      <p className="text-sm text-black/70 line-clamp-2 mb-2">
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-2">
                        {/* Category Icon */}
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(notification.category)}
                          <span className="text-xs text-black/50 capitalize">
                            {notification.category}
                          </span>
                        </div>

                        {/* Tags */}
                        {notification.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] border-[#F5EEE9]">
                            #{tag}
                          </Badge>
                        ))}

                        {/* Due Date */}
                        {notification.dueDate && (
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-orange-600" />
                            <span className="text-xs text-orange-600">Due {notification.dueDate}</span>
                          </div>
                        )}

                        {/* Actions Indicator */}
                        {notification.actionable && (
                          <Badge className="bg-blue-100 text-blue-700 text-[10px]">
                            Actions available
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!notification.read && (
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id);
                          }}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Read
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t border-[#F5EEE9] p-4">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-black/50">
              Showing {filteredNotifications.length} of {notifications.length} notifications
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

      {/* Notification Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
          </DialogHeader>

          {selectedNotification && (
            <div className="py-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  selectedNotification.type === 'alert' && 'bg-red-100',
                  selectedNotification.type === 'message' && 'bg-blue-100',
                  selectedNotification.type === 'task' && 'bg-purple-100',
                  selectedNotification.type === 'info' && 'bg-gray-100',
                  selectedNotification.type === 'success' && 'bg-green-100',
                )}>
                  {selectedNotification.sender.icon ? (
                    <selectedNotification.sender.icon size={20} className={cn(
                      selectedNotification.type === 'alert' && 'text-red-600',
                      selectedNotification.type === 'message' && 'text-blue-600',
                      selectedNotification.type === 'task' && 'text-purple-600',
                      selectedNotification.type === 'info' && 'text-gray-600',
                      selectedNotification.type === 'success' && 'text-green-600',
                    )} />
                  ) : (
                    <span className="text-sm font-medium text-gray-600">
                      {selectedNotification.sender.initials}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{selectedNotification.sender.name}</p>
                    <span className="text-xs text-black/50">
                      {selectedNotification.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={cn("text-xs border-0", getPriorityColor(selectedNotification.priority))}>
                      {selectedNotification.priority}
                    </Badge>
                    <Badge className={cn("text-xs border-0", getTypeColor(selectedNotification.type))}>
                      {selectedNotification.type}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F5EEE9] rounded-lg">
                <p className="text-sm font-medium mb-2">{selectedNotification.title}</p>
                <p className="text-sm whitespace-pre-wrap">{selectedNotification.message}</p>
              </div>

              {selectedNotification.metadata && Object.keys(selectedNotification.metadata).length > 0 && (
                <div>
                  <p className="text-xs text-black/50 mb-2">Details</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedNotification.metadata).map(([key, value]) => (
                      <div key={key} className="p-2 border border-[#F5EEE9] rounded-lg">
                        <p className="text-xs text-black/50 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-sm font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedNotification.tags && selectedNotification.tags.length > 0 && (
                <div>
                  <p className="text-xs text-black/50 mb-1">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedNotification.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedNotification.expiresAt && (
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-700">
                    Expires: {selectedNotification.expiresAt}
                  </p>
                </div>
              )}

              {selectedNotification.actionable && (
                <div className="flex items-center gap-2">
                  {selectedNotification.actions.map((action, idx) => (
                    <Button key={idx} variant="outline" size="sm" className="border-[#F5EEE9]">
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedNotification && !selectedNotification.read && (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                handleMarkAsRead(selectedNotification.id);
                setShowDetailsDialog(false);
              }}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Read
              </Button>
            )}
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
                onClick={handleMarkAllAsRead}
              >
                <CheckCircle size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Mark All Read</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowHistoryDialog(true)}
              >
                <History size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">History</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowSettingsDialog(true)}
              >
                <Settings size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default NotificationsPage;