// app/dashboard/team-access/page.js
'use client';

import { useState, useMemo } from 'react';
import {
  Users,
  UserPlus,
  UserCog,
  UserMinus,
  UserCheck,
  UserX,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Key,
  Lock,
  Unlock,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Plus,
  RefreshCw,
  Download,
  Upload,
  Printer,
  Mail as MailIcon,
  Send,
  Copy,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ArrowUpDown,
  Settings,
  Building2,
  MapPin,
  Globe,
  Link2,
  ExternalLink,
  Award,
  Star,
  Trophy,
  Users as UsersIcon,
  UserCircle,
  UserRound,
  UserRoundPlus,
  UserRoundX,
  UserCog2,
  ShieldHalf,
  ShieldOff,
  Fingerprint,
  BadgeCheck,
  Crown,
  Sparkles,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  History,
  CalendarDays,
  Timer,
  Target,
  Percent,
  Database,
  Server,
  Cloud,
  Wifi,
  Smartphone,
  Laptop,
  Tablet,
  Monitor,
  Tv,
  Watch,
  Headphones,
  Speaker,
  Mic,
  Camera,
  Image,
  Video,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileCode,
  Folder,
  FolderOpen,
  Archive,
  DownloadCloud,
  UploadCloud,
  Share2,
  Bookmark,
  BookmarkCheck,
  Bell,
  BellRing,
  BellOff,
  MessageSquare,
  MailOpen,
  Inbox,
  Send as SendIcon,
  Reply,
  Forward,
  Paperclip,
  Trash,
  Archive as ArchiveIcon,
  Folder as FolderIcon,
  Tag,
  Hash,
  Filter as FilterIcon,
  List,
  Grid,
  Save,
 
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
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const TeamAccessPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showBulkInviteDialog, setShowBulkInviteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoleConfig, setSelectedRoleConfig] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  // Mock Users Data
  const users = [
    {
      id: 'usr_001',
      name: 'John Anderson',
      email: 'john.anderson@accucount.com',
      avatar: null,
      role: 'admin',
      status: 'active',
      department: 'Management',
      location: 'New York, NY',
      phone: '+1 (212) 555-0123',
      lastActive: '2024-12-20T15:30:00Z',
      joinedAt: '2024-01-15T10:00:00Z',
      permissions: ['all'],
      twoFactorEnabled: true,
      loginCount: 1245,
      lastLoginIP: '192.168.1.100',
      devices: ['desktop', 'mobile'],
      teams: ['Leadership', 'Strategy'],
    },
    {
      id: 'usr_002',
      name: 'Sarah Chen',
      email: 'sarah.chen@accucount.com',
      avatar: null,
      role: 'manager',
      status: 'active',
      department: 'Operations',
      location: 'San Francisco, CA',
      phone: '+1 (415) 555-0456',
      lastActive: '2024-12-20T14:15:00Z',
      joinedAt: '2024-03-20T09:30:00Z',
      permissions: ['read', 'write', 'manage_team'],
      twoFactorEnabled: true,
      loginCount: 876,
      lastLoginIP: '192.168.1.101',
      devices: ['desktop', 'tablet'],
      teams: ['Operations', 'Inventory'],
    },
    {
      id: 'usr_003',
      name: 'Michael Roberts',
      email: 'michael.roberts@accucount.com',
      avatar: null,
      role: 'supervisor',
      status: 'active',
      department: 'Warehouse',
      location: 'Chicago, IL',
      phone: '+1 (312) 555-0789',
      lastActive: '2024-12-20T13:45:00Z',
      joinedAt: '2024-05-10T11:00:00Z',
      permissions: ['read', 'write'],
      twoFactorEnabled: false,
      loginCount: 543,
      lastLoginIP: '192.168.1.102',
      devices: ['handheld_scanner', 'desktop'],
      teams: ['Warehouse A', 'Receiving'],
    },
    {
      id: 'usr_004',
      name: 'Emily Watson',
      email: 'emily.watson@accucount.com',
      avatar: null,
      role: 'analyst',
      status: 'active',
      department: 'Analytics',
      location: 'Austin, TX',
      phone: '+1 (512) 555-0123',
      lastActive: '2024-12-20T11:20:00Z',
      joinedAt: '2024-07-05T14:00:00Z',
      permissions: ['read'],
      twoFactorEnabled: true,
      loginCount: 234,
      lastLoginIP: '192.168.1.103',
      devices: ['desktop'],
      teams: ['Analytics', 'Reporting'],
    },
    {
      id: 'usr_005',
      name: 'David Kim',
      email: 'david.kim@accucount.com',
      avatar: null,
      role: 'technician',
      status: 'active',
      department: 'IT',
      location: 'Seattle, WA',
      phone: '+1 (206) 555-0456',
      lastActive: '2024-12-19T16:30:00Z',
      joinedAt: '2024-09-12T08:00:00Z',
      permissions: ['read', 'write', 'manage_devices'],
      twoFactorEnabled: false,
      loginCount: 167,
      lastLoginIP: '192.168.1.104',
      devices: ['desktop', 'laptop'],
      teams: ['IT Support', 'IoT'],
    },
    {
      id: 'usr_006',
      name: 'Lisa Wong',
      email: 'lisa.wong@accucount.com',
      avatar: null,
      role: 'viewer',
      status: 'inactive',
      department: 'Finance',
      location: 'Boston, MA',
      phone: '+1 (617) 555-0789',
      lastActive: '2024-12-01T09:00:00Z',
      joinedAt: '2024-10-20T10:00:00Z',
      permissions: ['read'],
      twoFactorEnabled: false,
      loginCount: 45,
      lastLoginIP: '192.168.1.105',
      devices: ['desktop'],
      teams: ['Finance'],
    },
    {
      id: 'usr_007',
      name: 'James Wilson',
      email: 'james.wilson@accucount.com',
      avatar: null,
      role: 'admin',
      status: 'suspended',
      department: 'Management',
      location: 'Los Angeles, CA',
      phone: '+1 (323) 555-0123',
      lastActive: '2024-12-15T10:00:00Z',
      joinedAt: '2024-02-01T09:00:00Z',
      permissions: ['all'],
      twoFactorEnabled: true,
      loginCount: 890,
      lastLoginIP: '192.168.1.106',
      devices: ['desktop', 'mobile'],
      teams: ['Leadership'],
    },
    {
      id: 'usr_008',
      name: 'Anna Taylor',
      email: 'anna.taylor@accucount.com',
      avatar: null,
      role: 'manager',
      status: 'active',
      department: 'Operations',
      location: 'Denver, CO',
      phone: '+1 (303) 555-0456',
      lastActive: '2024-12-20T12:00:00Z',
      joinedAt: '2024-08-15T13:00:00Z',
      permissions: ['read', 'write', 'manage_team'],
      twoFactorEnabled: true,
      loginCount: 432,
      lastLoginIP: '192.168.1.107',
      devices: ['desktop', 'mobile'],
      teams: ['Operations', 'Quality'],
    },
  ];

  // Role Definitions
  const roles = [
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      level: 1,
      color: 'bg-red-100 text-red-700',
      icon: Crown,
      userCount: 2,
      permissions: ['all'],
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Manage teams, view reports, and approve requests',
      level: 2,
      color: 'bg-blue-100 text-blue-700',
      icon: ShieldCheck,
      userCount: 2,
      permissions: ['read', 'write', 'manage_team', 'approve_requests', 'view_reports'],
    },
    {
      id: 'supervisor',
      name: 'Supervisor',
      description: 'Oversee operations and manage inventory',
      level: 3,
      color: 'bg-green-100 text-green-700',
      icon: Shield,
      userCount: 1,
      permissions: ['read', 'write', 'manage_inventory', 'view_reports'],
    },
    {
      id: 'analyst',
      name: 'Analyst',
      description: 'View analytics and generate reports',
      level: 4,
      color: 'bg-purple-100 text-purple-700',
      icon: BarChart3,
      userCount: 1,
      permissions: ['read', 'view_reports', 'export_data'],
    },
    {
      id: 'technician',
      name: 'Technician',
      description: 'Manage devices and perform physical counts',
      level: 5,
      color: 'bg-yellow-100 text-yellow-700',
      icon: Smartphone,
      userCount: 1,
      permissions: ['read', 'write', 'manage_devices', 'perform_counts'],
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access to view data',
      level: 6,
      color: 'bg-gray-100 text-gray-700',
      icon: Eye,
      userCount: 1,
      permissions: ['read'],
    },
  ];

  // Permission Categories
  const permissionCategories = [
    {
      name: 'Inventory Management',
      permissions: [
        { id: 'view_inventory', name: 'View Inventory', description: 'View inventory items and details' },
        { id: 'create_inventory', name: 'Create Inventory', description: 'Add new inventory items' },
        { id: 'edit_inventory', name: 'Edit Inventory', description: 'Modify inventory items' },
        { id: 'delete_inventory', name: 'Delete Inventory', description: 'Remove inventory items' },
        { id: 'adjust_inventory', name: 'Adjust Inventory', description: 'Make inventory adjustments' },
      ]
    },
    {
      name: 'Stocktake Management',
      permissions: [
        { id: 'view_stocktake', name: 'View Stocktake', description: 'View stocktake events' },
        { id: 'create_stocktake', name: 'Create Stocktake', description: 'Create new stocktake events' },
        { id: 'edit_stocktake', name: 'Edit Stocktake', description: 'Modify stocktake events' },
        { id: 'execute_stocktake', name: 'Execute Stocktake', description: 'Perform stocktake counts' },
        { id: 'approve_stocktake', name: 'Approve Stocktake', description: 'Approve stocktake results' },
      ]
    },
    {
      name: 'Reports & Analytics',
      permissions: [
        { id: 'view_reports', name: 'View Reports', description: 'Access report viewer' },
        { id: 'create_reports', name: 'Create Reports', description: 'Create custom reports' },
        { id: 'export_reports', name: 'Export Reports', description: 'Export report data' },
        { id: 'schedule_reports', name: 'Schedule Reports', description: 'Schedule automated reports' },
      ]
    },
    {
      name: 'User Management',
      permissions: [
        { id: 'view_users', name: 'View Users', description: 'View user list and details' },
        { id: 'create_users', name: 'Create Users', description: 'Add new users' },
        { id: 'edit_users', name: 'Edit Users', description: 'Modify user details' },
        { id: 'delete_users', name: 'Delete Users', description: 'Remove users' },
        { id: 'manage_roles', name: 'Manage Roles', description: 'Configure roles and permissions' },
      ]
    },
    {
      name: 'System Settings',
      permissions: [
        { id: 'view_settings', name: 'View Settings', description: 'View system settings' },
        { id: 'edit_settings', name: 'Edit Settings', description: 'Modify system settings' },
        { id: 'manage_api_keys', name: 'Manage API Keys', description: 'Create and manage API keys' },
        { id: 'view_audit_logs', name: 'View Audit Logs', description: 'Access audit trail' },
      ]
    },
    {
      name: 'IoT & Devices',
      permissions: [
        { id: 'view_devices', name: 'View Devices', description: 'View IoT devices' },
        { id: 'manage_devices', name: 'Manage Devices', description: 'Add, edit, remove devices' },
        { id: 'configure_gateways', name: 'Configure Gateways', description: 'Manage IoT gateways' },
        { id: 'view_telemetry', name: 'View Telemetry', description: 'View device telemetry data' },
      ]
    },
  ];

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-700', icon: XCircle },
    suspended: { label: 'Suspended', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", config.color)}>
        <Icon size={10} />
        {config.label}
      </Badge>
    );
  };

  const getRoleBadge = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return null;
    const Icon = role.icon;
    return (
      <Badge className={cn("flex items-center gap-1 border-0", role.color)}>
        <Icon size={10} />
        {role.name}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    pendingInvites: 3,
    rolesCount: roles.length,
    onlineNow: users.filter(u => {
      const lastActive = new Date(u.lastActive);
      const now = new Date();
      const diffMinutes = (now - lastActive) / 60000;
      return diffMinutes < 5;
    }).length,
  };

  // Department list for filter
  const departments = [...new Set(users.map(u => u.department))];

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Team & Access</h1>
            <p className="text-black/50 text-sm mt-1">
              Manage users, roles, and permissions for your organization
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#F5EEE9] gap-2"
              onClick={() => setShowInviteDialog(true)}
            >
              <MailIcon size={16} />
              Invite User
            </Button>
            <Button
              variant="outline"
              className="border-[#F5EEE9] gap-2"
              onClick={() => setShowBulkInviteDialog(true)}
            >
              <Upload size={16} />
              Bulk Invite
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
              onClick={() => setShowAddUserDialog(true)}
            >
              <UserPlus size={16} />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Users</p>
                  <p className="text-xl font-bold text-black">{stats.totalUsers}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Users size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Users</p>
                  <p className="text-xl font-bold text-green-600">{stats.activeUsers}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <UserCheck size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Online Now</p>
                  <p className="text-xl font-bold text-blue-600">{stats.onlineNow}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Activity size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Pending Invites</p>
                  <p className="text-xl font-bold text-yellow-600">{stats.pendingInvites}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Mail size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">User Roles</p>
                  <p className="text-xl font-bold text-purple-600">{stats.rolesCount}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Shield size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#F5EEE9] mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="security">Security Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            {/* Filters */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
                  <Input
                    placeholder="Search by name, email, or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-[#F5EEE9] focus:border-red-600"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[140px] border-[#F5EEE9]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[130px] border-[#F5EEE9]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[140px] border-[#F5EEE9]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
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

            {/* Users Grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="border-[#F5EEE9] hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-red-100">
                            <AvatarFallback className="bg-red-100 text-red-600 text-lg">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-black">{user.name}</h3>
                            <p className="text-xs text-black/50">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {getRoleBadge(user.role)}
                              {getStatusBadge(user.status)}
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedUser(user);
                              setShowEditUserDialog(true);
                            }}>
                              <Edit size={14} className="mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key size={14} className="mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MailIcon size={14} className="mr-2" />
                              Resend Invite
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => {
                              setSelectedUser(user);
                              setShowDeleteUserDialog(true);
                            }}>
                              <Trash2 size={14} className="mr-2" />
                              Remove User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-xs text-black/50">Department</p>
                            <p className="font-medium">{user.department}</p>
                          </div>
                          <div>
                            <p className="text-xs text-black/50">Location</p>
                            <p className="font-medium">{user.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={12} className="text-black/40" />
                          <span>{user.phone}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Clock size={10} className="text-black/40" />
                            <span>Last active: {formatDate(user.lastActive)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={10} className="text-black/40" />
                            <span>Joined: {formatDate(user.joinedAt)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          {user.twoFactorEnabled ? (
                            <Badge className="bg-green-100 text-green-700">2FA Enabled</Badge>
                          ) : (
                            <Badge variant="outline" className="text-yellow-600">2FA Disabled</Badge>
                          )}
                          <Badge variant="outline">{user.loginCount} logins</Badge>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageSquare size={12} className="mr-1" />
                            Message
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowPermissionsDialog(true);
                            }}
                          >
                            <Shield size={12} className="mr-1" />
                            Permissions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-[#F5EEE9]">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#F5EEE9]/30">
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>2FA</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-[#F5EEE9]/30">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{user.name}</p>
                                <p className="text-xs text-black/50">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell className="text-sm">{user.department}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell className="text-sm">{formatDate(user.lastActive)}</TableCell>
                          <TableCell>
                            {user.twoFactorEnabled ? (
                              <CheckCircle size={16} className="text-green-600" />
                            ) : (
                              <XCircle size={16} className="text-gray-400" />
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                                      setSelectedUser(user);
                                      setShowEditUserDialog(true);
                                    }}>
                                      <Edit size={14} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                                      setSelectedUser(user);
                                      setShowPermissionsDialog(true);
                                    }}>
                                      <Shield size={14} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Permissions</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <MoreVertical size={14} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Key size={14} className="mr-2" />
                                    Reset Password
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MailIcon size={14} className="mr-2" />
                                    Resend Invite
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 size={14} className="mr-2" />
                                    Remove User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {filteredUsers.length === 0 && (
              <Card className="border-[#F5EEE9]">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users size={48} className="text-black/20 mb-3" />
                  <p className="text-black/50">No users found</p>
                  <p className="text-xs text-black/40 mt-1">Try adjusting your filters or add a new user</p>
                  <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setShowAddUserDialog(true)}>
                    <UserPlus size={14} className="mr-2" />
                    Add User
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <Card key={role.id} className="border-[#F5EEE9] hover:shadow-md transition-all cursor-pointer" onClick={() => {
                    setSelectedRoleConfig(role);
                    setShowRoleDialog(true);
                  }}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className={cn("p-2 rounded-lg", role.color)}>
                          <Icon size={20} />
                        </div>
                        <Badge className={role.color}>
                          {role.userCount} users
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-black">{role.name}</h3>
                      <p className="text-sm text-black/50 mt-1">{role.description}</p>
                      <div className="mt-3 pt-3 border-t border-[#F5EEE9]">
                        <p className="text-xs text-black/50">Permissions: {role.permissions.length}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {role.permissions.slice(0, 3).map((perm, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>User actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: 'John Anderson', action: 'Updated inventory item', time: '5 min ago', icon: Edit },
                    { user: 'Sarah Chen', action: 'Completed stocktake', time: '12 min ago', icon: CheckCircle },
                    { user: 'Michael Roberts', action: 'Logged in from new device', time: '1 hour ago', icon: Laptop },
                    { user: 'Emily Watson', action: 'Generated report', time: '2 hours ago', icon: FileText },
                    { user: 'Admin', action: 'Added new user David Kim', time: '3 hours ago', icon: UserPlus },
                  ].map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 hover:bg-[#F5EEE9] rounded-lg transition-colors">
                        <div className="p-2 bg-red-50 rounded-full">
                          <Icon size={16} className="text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-xs text-black/50">{activity.action}</p>
                        </div>
                        <span className="text-xs text-black/40">{activity.time}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-[#F5EEE9]">
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
                <CardDescription>Configure security settings for your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-black/50">Require 2FA for all users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                  <div>
                    <p className="font-medium">Password Expiry</p>
                    <p className="text-sm text-black/50">Force password change every 90 days</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-black/50">Automatically log out inactive users after 30 minutes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                  <div>
                    <p className="font-medium">IP Whitelisting</p>
                    <p className="text-sm text-black/50">Restrict access to specific IP addresses</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit User Dialog */}
      <Dialog open={showAddUserDialog || showEditUserDialog} onOpenChange={(open) => {
        if (!open) {
          setShowAddUserDialog(false);
          setShowEditUserDialog(false);
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{showAddUserDialog ? 'Add New User' : 'Edit User'}</DialogTitle>
            <DialogDescription>
              {showAddUserDialog ? 'Create a new user account' : 'Update user information'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Enter full name" defaultValue={selectedUser?.name} />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" placeholder="Enter email" defaultValue={selectedUser?.email} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select defaultValue={selectedUser?.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Input placeholder="Department" defaultValue={selectedUser?.department} />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Location" defaultValue={selectedUser?.location} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="Phone number" defaultValue={selectedUser?.phone} />
            </div>
            {showAddUserDialog && (
              <div className="space-y-2">
                <Label>Send Invite Email</Label>
                <Switch defaultChecked />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddUserDialog(false);
              setShowEditUserDialog(false);
            }}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              {showAddUserDialog ? 'Add User' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Details Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedRoleConfig && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className={cn("p-1.5 rounded-lg", selectedRoleConfig.color)}>
                    {selectedRoleConfig.icon && <selectedRoleConfig.icon size={20} />}
                  </div>
                  {selectedRoleConfig.name} Role
                </DialogTitle>
                <DialogDescription>{selectedRoleConfig.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-3 bg-[#F5EEE9] rounded-lg">
                  <p className="text-sm font-medium mb-2">Assigned Users ({selectedRoleConfig.userCount})</p>
                  <div className="space-y-2">
                    {users.filter(u => u.role === selectedRoleConfig.id).map(user => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.name}</span>
                        </div>
                        <span className="text-xs text-black/50">{user.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Permissions</p>
                  <div className="space-y-2">
                    {selectedRoleConfig.permissions.map((perm, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-[#F5EEE9] rounded-lg">
                        <CheckCircle size={14} className="text-green-600" />
                        <span className="text-sm capitalize">{perm.replace(/_/g, ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
                  Close
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Edit size={14} className="mr-2" />
                  Edit Role
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Invite User Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>Send an invitation to join your organization</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input placeholder="user@company.com" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">An invitation email will be sent to the user with setup instructions.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Send size={14} className="mr-2" />
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Invite Dialog */}
      <Dialog open={showBulkInviteDialog} onOpenChange={setShowBulkInviteDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bulk Invite Users</DialogTitle>
            <DialogDescription>Invite multiple users at once</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Email List (one per line)</Label>
              <Textarea
                placeholder="user1@company.com&#10;user2@company.com&#10;user3@company.com"
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label>Default Role</Label>
              <Select defaultValue="viewer">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-yellow-600" />
                <p className="text-sm text-yellow-700">Bulk invites will be sent to all email addresses provided.</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkInviteDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Upload size={14} className="mr-2" />
              Send Invites
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={showPermissionsDialog} onOpenChange={setShowPermissionsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle>User Permissions</DialogTitle>
                <DialogDescription>
                  {selectedUser.name} - Configure access permissions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-3 bg-[#F5EEE9] rounded-lg flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-red-100 text-red-600">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p className="text-sm text-black/50">{selectedUser.email}</p>
                    <p className="text-xs">{getRoleBadge(selectedUser.role)}</p>
                  </div>
                </div>

                <ScrollArea className="h-[400px]">
                  <Accordion type="multiple" className="w-full">
                    {permissionCategories.map((category, idx) => (
                      <AccordionItem key={idx} value={category.name}>
                        <AccordionTrigger className="hover:bg-[#F5EEE9]/30 px-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{category.name}</span>
                            <Badge variant="outline">{category.permissions.length} permissions</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-6 pt-2">
                            {category.permissions.map((perm, pIdx) => (
                              <div key={pIdx} className="flex items-center justify-between p-2 hover:bg-[#F5EEE9]/30 rounded-lg">
                                <div>
                                  <p className="text-sm font-medium">{perm.name}</p>
                                  <p className="text-xs text-black/50">{perm.description}</p>
                                </div>
                                <Checkbox defaultChecked={selectedUser.role === 'admin' || selectedUser.permissions.includes(perm.id)} />
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollArea>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPermissionsDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Save size={14} className="mr-2" />
                  Save Permissions
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={showDeleteUserDialog} onOpenChange={setShowDeleteUserDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Remove User</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The user will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-black/70">
              Are you sure you want to remove <strong>{selectedUser?.name}</strong>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteUserDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteUserDialog(false)}>
              <UserX size={14} className="mr-2" />
              Remove User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamAccessPage;