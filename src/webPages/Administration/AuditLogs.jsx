// app/dashboard/administration/audit-logs/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  History,
  Clock,
  Calendar,
  User,
  Users,
  Building2,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Key,
  KeyRound,
  Lock,
  Unlock,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  Camera,
  Video,
  Image,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Folder,
  FolderOpen,
  FolderTree,
  Files,
  Copy,
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  ClipboardX,
  Settings,
  Sliders,
  Wrench,
  Hammer,
  Drill,
  Screwdriver,
  Saw,
  Axe,
  Pickaxe,
  Shovel,
  Rake,
  Hoe,
  Scythe,
  Shears,
  Pliers,
  Wire,
  Cable,
  Plug,
  Battery,
  BatteryCharging,
  BatteryWarning,
  Power,
  PowerOff,
  Wifi,
  Bluetooth,
  Usb,
  Disc,
  Radio,
  Headphones,
  Speaker,
  Microphone,
  Guitar,
  Piano,
  Drum,
  Trumpet,
  Saxophone,
  Violin,
  Music,
  Film,
  Clapperboard,
  Projector,
  Screen,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Star,
  Flag,
  Bookmark,
  BookmarkCheck,
  BookmarkX,
  BookmarkPlus,
  BookmarkMinus,
  Bell,
  Volume1,
  Volume2,
  VolumeX,
  Vibrate,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Camera as CameraIcon,
  CameraOff,
  Image as ImageIcon,
  ImageOff,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Percent,
  DollarSign,
  Home,
  ChevronRight,
  X,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  Download,

  Eye,
  EyeOff,
  Edit,
  Trash2,
  Copy as CopyIcon,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Activity,
  Globe,
  LogIn,
} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

const AuditLogsPage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for audit logs
  const auditLogs = [
    {
      id: 'LOG-001',
      timestamp: '2024-03-15T14:32:21Z',
      user: {
        id: 'USR-001',
        name: 'John Smith',
        email: 'john.smith@accucount.com',
        role: 'Super Admin',
        avatar: '/avatars/01.png'
      },
      eventType: 'login',
      action: 'User Login',
      module: 'Authentication',
      description: 'Successful login from IP 192.168.1.100',
      severity: 'info',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      location: 'San Francisco, CA',
      sessionId: 'sess_1234567890',
      details: {
        browser: 'Chrome 122.0.0',
        os: 'Windows 10',
        device: 'Desktop',
        authMethod: 'Password + 2FA'
      },
      changes: null,
      status: 'success'
    },
    {
      id: 'LOG-002',
      timestamp: '2024-03-15T13:45:10Z',
      user: {
        id: 'USR-002',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@accucount.com',
        role: 'Admin',
        avatar: '/avatars/02.png'
      },
      eventType: 'update',
      action: 'User Role Updated',
      module: 'User Management',
      description: 'Changed user role from "User" to "Manager" for Emily Chen',
      severity: 'warning',
      ipAddress: '192.168.2.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'New York, NY',
      sessionId: 'sess_2345678901',
      targetUser: {
        id: 'USR-004',
        name: 'Emily Chen'
      },
      changes: [
        { field: 'role', oldValue: 'User', newValue: 'Manager' }
      ],
      status: 'success'
    },
    {
      id: 'LOG-003',
      timestamp: '2024-03-15T11:20:05Z',
      user: {
        id: 'USR-003',
        name: 'Mike Wilson',
        email: 'mike.wilson@accucount.com',
        role: 'Manager',
        avatar: '/avatars/03.png'
      },
      eventType: 'create',
      action: 'Product Created',
      module: 'Inventory',
      description: 'Created new product: Wireless Headphones Pro (SKU: WHP-001)',
      severity: 'info',
      ipAddress: '192.168.3.100',
      userAgent: 'Mobile App / Android',
      location: 'Chicago, IL',
      sessionId: 'sess_3456789012',
      details: {
        productId: 'PROD-009',
        productName: 'Wireless Headphones Pro',
        sku: 'WHP-001',
        category: 'Electronics',
        price: 129.99
      },
      changes: null,
      status: 'success'
    },
    {
      id: 'LOG-004',
      timestamp: '2024-03-15T09:15:30Z',
      user: {
        id: 'USR-007',
        name: 'Tom Anderson',
        email: 'tom.anderson@accucount.com',
        role: 'Admin',
        avatar: '/avatars/07.png'
      },
      eventType: 'delete',
      action: 'User Deleted',
      module: 'User Management',
      description: 'Deleted inactive user account: david.brown@accucount.com',
      severity: 'critical',
      ipAddress: '192.168.7.100',
      userAgent: 'Chrome / Windows',
      location: 'Austin, TX',
      sessionId: 'sess_4567890123',
      targetUser: {
        id: 'USR-005',
        name: 'David Brown'
      },
      details: {
        reason: 'Inactive account for 90+ days',
        previousData: 'User had no active sessions'
      },
      status: 'success'
    },
    {
      id: 'LOG-005',
      timestamp: '2024-03-14T22:10:45Z',
      user: {
        id: 'SYSTEM',
        name: 'System',
        email: 'system@accucount.com',
        role: 'System',
        avatar: null
      },
      eventType: 'system',
      action: 'Backup Completed',
      module: 'System',
      description: 'Automated database backup completed successfully',
      severity: 'info',
      ipAddress: '127.0.0.1',
      userAgent: 'System Process',
      location: 'Data Center',
      details: {
        backupSize: '2.4 GB',
        backupType: 'Full',
        duration: '15 minutes',
        location: '/backups/2024-03-14/'
      },
      changes: null,
      status: 'success'
    },
    {
      id: 'LOG-006',
      timestamp: '2024-03-14T18:30:22Z',
      user: {
        id: 'USR-008',
        name: 'Rachel Green',
        email: 'rachel.green@accucount.com',
        role: 'Manager',
        avatar: '/avatars/08.png'
      },
      eventType: 'update',
      action: 'Inventory Adjustment',
      module: 'Inventory',
      description: 'Adjusted stock levels for 5 products in Warehouse A',
      severity: 'warning',
      ipAddress: '192.168.8.100',
      userAgent: 'Chrome / Windows',
      location: 'Portland, OR',
      sessionId: 'sess_5678901234',
      details: {
        warehouse: 'Warehouse A',
        adjustments: 5,
        reason: 'Cycle count discrepancy',
        totalValue: '$1,245.00'
      },
      changes: [
        { product: 'PROD-001', oldStock: 45, newStock: 42, change: -3 },
        { product: 'PROD-003', oldStock: 12, newStock: 15, change: 3 }
      ],
      status: 'success'
    },
    {
      id: 'LOG-007',
      timestamp: '2024-03-14T15:45:12Z',
      user: {
        id: 'USR-001',
        name: 'John Smith',
        email: 'john.smith@accucount.com',
        role: 'Super Admin',
        avatar: '/avatars/01.png'
      },
      eventType: 'permission',
      action: 'Permission Changed',
      module: 'Roles & Permissions',
      description: 'Modified permissions for Manager role',
      severity: 'critical',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome / Windows',
      location: 'San Francisco, CA',
      sessionId: 'sess_6789012345',
      targetRole: 'Manager',
      changes: [
        { permission: 'inventory.delete', oldValue: false, newValue: true },
        { permission: 'reports.export', oldValue: false, newValue: true }
      ],
      status: 'success'
    },
    {
      id: 'LOG-008',
      timestamp: '2024-03-14T11:05:33Z',
      user: {
        id: 'USR-006',
        name: 'Lisa Taylor',
        email: 'lisa.taylor@accucount.com',
        role: 'User',
        avatar: '/avatars/06.png'
      },
      eventType: 'login',
      action: 'Failed Login Attempt',
      module: 'Authentication',
      description: 'Failed login attempt with incorrect password',
      severity: 'error',
      ipAddress: '45.67.89.123',
      userAgent: 'Mozilla/5.0 (Unknown)',
      location: 'Unknown',
      sessionId: null,
      details: {
        attempts: 1,
        reason: 'Invalid password',
        accountLocked: false
      },
      status: 'failure'
    },
    {
      id: 'LOG-009',
      timestamp: '2024-03-13T16:20:18Z',
      user: {
        id: 'USR-004',
        name: 'Emily Chen',
        email: 'emily.chen@accucount.com',
        role: 'Manager',
        avatar: '/avatars/04.png'
      },
      eventType: 'export',
      action: 'Data Exported',
      module: 'Reports',
      description: 'Exported inventory valuation report as Excel',
      severity: 'info',
      ipAddress: '192.168.4.100',
      userAgent: 'Chrome / Mac',
      location: 'Seattle, WA',
      sessionId: 'sess_7890123456',
      details: {
        reportType: 'Inventory Valuation',
        format: 'Excel',
        rows: 1245,
        filters: 'Date range: Q1 2024'
      },
      changes: null,
      status: 'success'
    },
    {
      id: 'LOG-010',
      timestamp: '2024-03-13T14:10:05Z',
      user: {
        id: 'USR-009',
        name: 'James Wilson',
        email: 'james.wilson@accucount.com',
        role: 'User',
        avatar: '/avatars/09.png'
      },
      eventType: 'update',
      action: 'Profile Updated',
      module: 'User Profile',
      description: 'Updated personal information and preferences',
      severity: 'info',
      ipAddress: '192.168.9.100',
      userAgent: 'Chrome / Mac',
      location: 'Los Angeles, CA',
      sessionId: 'sess_8901234567',
      changes: [
        { field: 'phone', oldValue: '+1 (555) 901-2345', newValue: '+1 (555) 901-2346' },
        { field: 'notification_preferences', oldValue: 'email', newValue: 'email,sms' }
      ],
      status: 'success'
    },
    {
      id: 'LOG-011',
      timestamp: '2024-03-13T09:30:45Z',
      user: {
        id: 'USR-010',
        name: 'Patricia Lee',
        email: 'patricia.lee@accucount.com',
        role: 'User',
        avatar: '/avatars/10.png'
      },
      eventType: 'login',
      action: 'User Login',
      module: 'Authentication',
      description: 'Successful login from new device',
      severity: 'warning',
      ipAddress: '192.168.10.100',
      userAgent: 'Firefox / Windows',
      location: 'San Diego, CA',
      sessionId: 'sess_9012345678',
      details: {
        browser: 'Firefox 123.0',
        os: 'Windows 11',
        device: 'Desktop',
        isNewDevice: true,
        authMethod: 'Password'
      },
      status: 'success'
    },
    {
      id: 'LOG-012',
      timestamp: '2024-03-12T23:15:30Z',
      user: {
        id: 'SYSTEM',
        name: 'System',
        email: 'system@accucount.com',
        role: 'System',
        avatar: null
      },
      eventType: 'system',
      action: 'Security Scan',
      module: 'Security',
      description: 'Automated security vulnerability scan completed',
      severity: 'info',
      ipAddress: '127.0.0.1',
      userAgent: 'System Process',
      location: 'Data Center',
      details: {
        vulnerabilities: {
          critical: 0,
          high: 0,
          medium: 2,
          low: 5
        },
        duration: '45 minutes',
        scannedServices: 24
      },
      changes: null,
      status: 'success'
    }
  ];

  // Event types for filter
  const eventTypes = [
    { id: 'all', name: 'All Events', count: auditLogs.length },
    { id: 'login', name: 'Login Events', count: auditLogs.filter(l => l.eventType === 'login').length, color: 'blue' },
    { id: 'create', name: 'Create', count: auditLogs.filter(l => l.eventType === 'create').length, color: 'green' },
    { id: 'update', name: 'Update', count: auditLogs.filter(l => l.eventType === 'update').length, color: 'yellow' },
    { id: 'delete', name: 'Delete', count: auditLogs.filter(l => l.eventType === 'delete').length, color: 'red' },
    { id: 'permission', name: 'Permission Changes', count: auditLogs.filter(l => l.eventType === 'permission').length, color: 'purple' },
    { id: 'export', name: 'Exports', count: auditLogs.filter(l => l.eventType === 'export').length, color: 'orange' },
    { id: 'system', name: 'System Events', count: auditLogs.filter(l => l.eventType === 'system').length, color: 'gray' }
  ];

  // Users for filter
  const users = [
    { id: 'all', name: 'All Users' },
    { id: 'USR-001', name: 'John Smith' },
    { id: 'USR-002', name: 'Sarah Johnson' },
    { id: 'USR-003', name: 'Mike Wilson' },
    { id: 'USR-004', name: 'Emily Chen' },
    { id: 'USR-007', name: 'Tom Anderson' },
    { id: 'USR-008', name: 'Rachel Green' },
    { id: 'SYSTEM', name: 'System' }
  ];

  // Modules for filter
  const modules = [
    { id: 'all', name: 'All Modules' },
    { id: 'authentication', name: 'Authentication' },
    { id: 'user-management', name: 'User Management' },
    { id: 'inventory', name: 'Inventory' },
    { id: 'roles', name: 'Roles & Permissions' },
    { id: 'reports', name: 'Reports' },
    { id: 'system', name: 'System' },
    { id: 'security', name: 'Security' }
  ];

  // Severity configuration
  const severityConfig = {
    info: { label: 'Info', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Info },
    warning: { label: 'Warning', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    error: { label: 'Error', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
    critical: { label: 'Critical', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: AlertCircle },
    success: { label: 'Success', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle }
  };

  const getSeverityIcon = (severity) => {
    const config = severityConfig[severity];
    const Icon = config?.icon || Info;
    return <Icon size={14} />;
  };

  const getSeverityColor = (severity) => {
    return severityConfig[severity]?.color || 'bg-gray-100 text-gray-700';
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'login':
        return <LogIn size={14} className="text-blue-600" />;
      case 'create':
        return <Plus size={14} className="text-green-600" />;
      case 'update':
        return <Edit size={14} className="text-yellow-600" />;
      case 'delete':
        return <Trash2 size={14} className="text-red-600" />;
      case 'permission':
        return <Shield size={14} className="text-purple-600" />;
      case 'export':
        return <Download size={14} className="text-orange-600" />;
      case 'system':
        return <Settings size={14} className="text-gray-600" />;
      default:
        return <History size={14} className="text-gray-600" />;
    }
  };

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(t => t.id === type);
    return eventType?.color || 'gray';
  };

  // Helper function to render event type icon
  const renderEventTypeIcon = (type, size = 14, className = "") => {
    return getEventTypeIcon(type);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHour < 24) return `${diffHour} hours ago`;
    if (diffDay < 7) return `${diffDay} days ago`;
    return formatDate(dateString);
  };

  const filteredLogs = auditLogs.filter(log => {
    if (selectedEventType !== 'all' && log.eventType !== selectedEventType) return false;
    if (selectedUser !== 'all' && log.user.id !== selectedUser) return false;
    if (selectedModule !== 'all') {
      const moduleMap = {
        'authentication': 'Authentication',
        'user-management': 'User Management',
        'inventory': 'Inventory',
        'roles': 'Roles & Permissions',
        'reports': 'Reports',
        'system': 'System',
        'security': 'Security'
      };
      if (log.module !== moduleMap[selectedModule]) return false;
    }
    if (selectedSeverity !== 'all' && log.severity !== selectedSeverity) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return log.id.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.description.toLowerCase().includes(query) ||
        log.user.name.toLowerCase().includes(query) ||
        log.user.email.toLowerCase().includes(query);
    }
    if (dateRange.from && dateRange.to) {
      const logDate = new Date(log.timestamp);
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999);
      if (logDate < fromDate || logDate > toDate) return false;
    }
    return true;
  });

  const stats = {
    total: auditLogs.length,
    logins: auditLogs.filter(l => l.eventType === 'login').length,
    changes: auditLogs.filter(l => ['create', 'update', 'delete', 'permission'].includes(l.eventType)).length,
    errors: auditLogs.filter(l => l.severity === 'error' || l.severity === 'critical').length,
    uniqueUsers: new Set(auditLogs.filter(l => l.user.id !== 'SYSTEM').map(l => l.user.id)).size
  };

  const handleSelectAll = () => {
    if (selectedLogs.length === filteredLogs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(filteredLogs.map(l => l.id));
    }
  };

  const handleSelectLog = (id) => {
    if (selectedLogs.includes(id)) {
      setSelectedLogs(selectedLogs.filter(l => l !== id));
    } else {
      setSelectedLogs([...selectedLogs, id]);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Activity timeline data (simplified)
  const activityTimeline = [
    { hour: '00:00', count: 2 },
    { hour: '01:00', count: 0 },
    { hour: '02:00', count: 0 },
    { hour: '03:00', count: 0 },
    { hour: '04:00', count: 0 },
    { hour: '05:00', count: 0 },
    { hour: '06:00', count: 1 },
    { hour: '07:00', count: 3 },
    { hour: '08:00', count: 8 },
    { hour: '09:00', count: 15 },
    { hour: '10:00', count: 22 },
    { hour: '11:00', count: 18 },
    { hour: '12:00', count: 12 },
    { hour: '13:00', count: 14 },
    { hour: '14:00', count: 19 },
    { hour: '15:00', count: 16 },
    { hour: '16:00', count: 11 },
    { hour: '17:00', count: 7 },
    { hour: '18:00', count: 5 },
    { hour: '19:00', count: 3 },
    { hour: '20:00', count: 2 },
    { hour: '21:00', count: 1 },
    { hour: '22:00', count: 1 },
    { hour: '23:00', count: 1 }
  ];

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Home size={16} className="text-gray-400" />
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-sm text-gray-500">Administration</span>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-900">Audit Logs</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
            <p className="text-gray-500 mt-1 text-sm">Track and monitor all system activities and changes</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
              <Clock size={14} className="text-gray-500" />
              <span className="text-xs text-gray-700">Last updated: {formatDateTime(new Date().toISOString())}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
              </Button>
            </div>

            <Select value={selectedEventType} onValueChange={setSelectedEventType}>
              <SelectTrigger className="w-[150px] border-gray-200 bg-white h-9">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map(type => (
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
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setExportDialogOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Export Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Events</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <History size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Login Events</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.logins}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <LogIn size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Data Changes</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.changes}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Edit size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Errors/Critical</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.errors}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Active Users</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.uniqueUsers}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <Users size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Activity Timeline */}
      <Card className="border-gray-200 mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <Activity size={16} className="text-red-600" />
            Activity Timeline - Last 24 Hours
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            System activity distribution by hour
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-20 flex items-end gap-1">
            {activityTimeline.map((hour, idx) => {
              const maxCount = Math.max(...activityTimeline.map(h => h.count));
              const height = hour.count > 0 ? (hour.count / maxCount) * 100 : 0;

              return (
                <TooltipProvider key={idx}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-red-600 rounded-t transition-all hover:bg-red-700"
                          style={{ height: `${height}%`, maxHeight: '50px', minHeight: hour.count > 0 ? '2px' : '0' }}
                        />
                        <span className="text-xs text-gray-500">{hour.hour}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">{hour.hour}: {hour.count} events</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by ID, action, user, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-red-600 h-9"
            />
          </div>

          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-[150px] border-gray-200 h-9">
              <SelectValue placeholder="User" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {users.filter(u => u.id !== 'all').map(user => (
                <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger className="w-[150px] border-gray-200 h-9">
              <SelectValue placeholder="Module" />
            </SelectTrigger>
            <SelectContent>
              {modules.map(module => (
                <SelectItem key={module.id} value={module.id}>{module.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-[130px] border-gray-200 h-9">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="success">Success</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 border-gray-200 h-9">
                <Calendar size={16} />
                {dateRange.from ? (
                  dateRange.to ? (
                    `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
                  ) : (
                    formatDate(dateRange.from)
                  )
                ) : (
                  'Date Range'
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3">
                <div className="space-y-2">
                  <Label className="text-sm">From</Label>
                  <Input
                    type="date"
                    className="h-9"
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  />
                  <Label className="text-sm">To</Label>
                  <Input
                    type="date"
                    className="h-9"
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  />
                  <Button
                    size="sm"
                    className="w-full mt-2 bg-red-600 hover:bg-red-700 h-8 text-xs"
                    onClick={() => setDateRange({ from: null, to: null })}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="icon" className="border-gray-200 h-9 w-9">
            <Filter size={16} />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-200 h-9 w-9" onClick={handleRefresh}>
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label htmlFor="auto-refresh" className="text-sm">Auto-refresh</Label>
          </div>
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
      {selectedLogs.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white px-2 py-0.5">{selectedLogs.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedLogs([])} className="h-7 text-xs">
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Download size={14} className="mr-2" />
              Export Selected
            </Button>
          </div>
        </div>
      )}

      {/* Audit Logs Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredLogs.map((log) => {
            const SeverityIcon = severityConfig[log.severity]?.icon || Info;

            return (
              <ContextMenu key={log.id}>
                <ContextMenuTrigger>
                  <Card
                    className="border-gray-200 hover:shadow-lg transition-all group cursor-pointer"
                    onClick={() => {
                      setSelectedLog(log);
                      setViewDetailsDialogOpen(true);
                    }}
                  >
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className={`p-4 border-b border-gray-200 bg-gradient-to-r from-${getEventTypeColor(log.eventType)}-50 to-transparent`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-${getEventTypeColor(log.eventType)}-600 text-white rounded-lg`}>
                              {getEventTypeIcon(log.eventType)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                                  {log.id}
                                </Badge>
                                <Badge className={`${severityConfig[log.severity]?.color} px-2 py-0.5 text-xs`}>
                                  <SeverityIcon size={10} className="mr-1" />
                                  {severityConfig[log.severity]?.label}
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-gray-900 text-base">{log.action}</h3>
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
                                setSelectedLog(log);
                                setViewDetailsDialogOpen(true);
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Export
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="space-y-3">
                          {/* User Info */}
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              {log.user.avatar ? (
                                <AvatarImage src={log.user.avatar} />
                              ) : (
                                <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                                  {log.user.name === 'System' ? 'SYS' : log.user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{log.user.name}</p>
                              <p className="text-xs text-gray-500">{log.user.email}</p>
                            </div>
                            <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                              {log.user.role}
                            </Badge>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {log.description}
                          </p>

                          {/* Module and IP */}
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                              {log.module}
                            </Badge>
                            <span className="text-xs text-gray-500">IP: {log.ipAddress}</span>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Globe size={12} />
                            <span>{log.location}</span>
                          </div>

                          {/* Changes Preview */}
                          {log.changes && log.changes.length > 0 && (
                            <div className="bg-gray-50 p-2 rounded text-xs">
                              <p className="font-medium mb-1">Changes:</p>
                              {log.changes.slice(0, 1).map((change, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                  <span className="text-gray-500">{change.field}:</span>
                                  <span className="line-through text-red-600">{change.oldValue}</span>
                                  <ArrowRight size={8} />
                                  <span className="text-green-600">{change.newValue}</span>
                                </div>
                              ))}
                              {log.changes.length > 1 && (
                                <p className="text-xs text-gray-500 mt-1">+{log.changes.length - 1} more changes</p>
                              )}
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span title={formatDateTime(log.timestamp)}>
                                {formatRelativeTime(log.timestamp)}
                              </span>
                            </div>
                            <Badge className={log.status === 'success' ? 'bg-green-100 text-green-700 text-xs px-2 py-0.5' : 'bg-red-100 text-red-700 text-xs px-2 py-0.5'}>
                              {log.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem onClick={() => {
                    setSelectedLog(log);
                    setViewDetailsDialogOpen(true);
                  }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
          {filteredLogs.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <History size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-500">No audit logs found</h3>
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
                      checked={selectedLogs.length === filteredLogs.length && filteredLogs.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Timestamp</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Event</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">User</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Action</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Module</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Severity</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">IP Address</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Status</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow
                    key={log.id}
                    className="border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedLog(log);
                      setViewDetailsDialogOpen(true);
                    }}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedLogs.includes(log.id)}
                        onCheckedChange={() => handleSelectLog(log.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-gray-400" />
                        <span className="text-sm" title={formatDateTime(log.timestamp)}>
                          {formatRelativeTime(log.timestamp)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded bg-${getEventTypeColor(log.eventType)}-100`}>
                          {getEventTypeIcon(log.eventType)}
                        </div>
                        <span className="text-sm capitalize">{log.eventType}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          {log.user.avatar ? (
                            <AvatarImage src={log.user.avatar} />
                          ) : (
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {log.user.name === 'System' ? 'SYS' : log.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span className="text-sm">{log.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">
                      {log.action}
                    </TableCell>
                    <TableCell className="text-sm">{log.module}</TableCell>
                    <TableCell>
                      <Badge className={`${severityConfig[log.severity]?.color} text-xs px-2 py-0.5`}>
                        {severityConfig[log.severity]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-mono">{log.ipAddress}</TableCell>
                    <TableCell>
                      <Badge className={log.status === 'success' ? 'bg-green-100 text-green-700 text-xs px-2 py-0.5' : 'bg-red-100 text-red-700 text-xs px-2 py-0.5'}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedLog(log);
                            setViewDetailsDialogOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredLogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-500">
                Showing {filteredLogs.length} of {auditLogs.length} logs
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
          {selectedLog && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <div className={`p-2 bg-${getEventTypeColor(selectedLog.eventType)}-100 rounded-lg`}>
                    {getEventTypeIcon(selectedLog.eventType)}
                  </div>
                  <div>
                    <span>{selectedLog.action}</span>
                    <DialogDescription className="text-sm">
                      {selectedLog.id} • {formatDateTime(selectedLog.timestamp)}
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid grid-cols-3 bg-gray-100">
                  <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
                  <TabsTrigger value="changes" className="text-sm">Changes</TabsTrigger>
                  <TabsTrigger value="raw" className="text-sm">Raw Data</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  {/* User Info */}
                  <Card className="border-gray-200">
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-sm font-medium">User Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          {selectedLog.user.avatar ? (
                            <AvatarImage src={selectedLog.user.avatar} />
                          ) : (
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                              {selectedLog.user.name === 'System' ? 'SYS' : selectedLog.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{selectedLog.user.name}</p>
                          <p className="text-xs text-gray-500">{selectedLog.user.email}</p>
                          <Badge variant="outline" className="mt-1 text-xs px-2 py-0.5 border-gray-200">
                            {selectedLog.user.role}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Event Details */}
                  <Card className="border-gray-200">
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-sm font-medium">Event Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Event Type</p>
                          <p className="text-sm capitalize">{selectedLog.eventType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Module</p>
                          <p className="text-sm">{selectedLog.module}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Severity</p>
                          <Badge className={`${severityConfig[selectedLog.severity]?.color} text-xs px-2 py-0.5`}>
                            {severityConfig[selectedLog.severity]?.label}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <Badge className={selectedLog.status === 'success' ? 'bg-green-100 text-green-700 text-xs px-2 py-0.5' : 'bg-red-100 text-red-700 text-xs px-2 py-0.5'}>
                            {selectedLog.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card className="border-gray-200">
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-sm font-medium">Description</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <p className="text-sm">{selectedLog.description}</p>
                    </CardContent>
                  </Card>

                  {/* Technical Details */}
                  <Card className="border-gray-200">
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-sm font-medium">Technical Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-500">IP Address</p>
                            <p className="text-sm font-mono">{selectedLog.ipAddress}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="text-sm">{selectedLog.location}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">User Agent</p>
                          <p className="text-xs font-mono break-all">{selectedLog.userAgent}</p>
                        </div>
                        {selectedLog.sessionId && (
                          <div>
                            <p className="text-xs text-gray-500">Session ID</p>
                            <p className="text-xs font-mono">{selectedLog.sessionId}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Details */}
                  {selectedLog.details && (
                    <Card className="border-gray-200">
                      <CardHeader className="p-3 pb-0">
                        <CardTitle className="text-sm font-medium">Additional Information</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(selectedLog.details).map(([key, value]) => (
                            <div key={key}>
                              <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              <p className="text-sm">{String(value)}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="changes" className="space-y-4 mt-4">
                  {selectedLog.changes && selectedLog.changes.length > 0 ? (
                    <div className="space-y-2">
                      {selectedLog.changes.map((change, idx) => (
                        <Card key={idx} className="border-gray-200">
                          <CardContent className="p-3">
                            <p className="text-sm font-medium mb-2 capitalize">
                              {change.field?.replace(/([A-Z])/g, ' $1').trim() || 'Field'}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 p-2 bg-red-50 rounded">
                                <p className="text-xs text-gray-500">Old Value</p>
                                <p className="text-sm">{change.oldValue || '<empty>'}</p>
                              </div>
                              <ArrowRight size={16} className="text-gray-400" />
                              <div className="flex-1 p-2 bg-green-50 rounded">
                                <p className="text-xs text-gray-500">New Value</p>
                                <p className="text-sm">{change.newValue || '<empty>'}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">No changes recorded for this event</p>
                  )}
                </TabsContent>

                <TabsContent value="raw" className="space-y-4 mt-4">
                  <Card className="border-gray-200">
                    <CardContent className="p-3">
                      <pre className="text-xs font-mono whitespace-pre-wrap overflow-auto max-h-96">
                        {JSON.stringify(selectedLog, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button variant="outline" onClick={() => setViewDetailsDialogOpen(false)} className="h-9">
                  Close
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 h-9"
                  onClick={() => {
                    setViewDetailsDialogOpen(false);
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Log
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Export Audit Logs</DialogTitle>
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
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last-7">Last 7 days</SelectItem>
                  <SelectItem value="last-30">Last 30 days</SelectItem>
                  <SelectItem value="this-month">This month</SelectItem>
                  <SelectItem value="last-month">Last month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Include</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-changes" defaultChecked />
                  <Label htmlFor="include-changes" className="text-sm">Change details</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-technical" defaultChecked />
                  <Label htmlFor="include-technical" className="text-sm">Technical data (IP, User Agent)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-raw" />
                  <Label htmlFor="include-raw" className="text-sm">Raw JSON data</Label>
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
            <DialogTitle className="text-lg">Audit Log Settings</DialogTitle>
            <DialogDescription className="text-sm">
              Configure audit logging preferences
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="retention">
                <AccordionTrigger className="text-sm">Retention Policy</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Retention period</Label>
                    <Select defaultValue="90">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="0">Forever</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Auto-archive old logs</Label>
                    <Switch defaultChecked />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="events">
                <AccordionTrigger className="text-sm">Events to Log</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Login events</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Data changes (Create/Update/Delete)</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Permission changes</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Export events</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">System events</Label>
                    <Switch defaultChecked />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="notifications">
                <AccordionTrigger className="text-sm">Notifications</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Alert on critical events</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Email summary report</Label>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Notification email</Label>
                    <Input placeholder="admin@accucount.com" className="h-9" />
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
                onClick={() => setExportDialogOpen(true)}
              >
                <Download size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Export Logs</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Refresh</TooltipContent>
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

export default AuditLogsPage;