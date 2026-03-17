// app/dashboard/administration/roles/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  ChevronRight,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  Settings,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserPlus,
  Shield,
  Key,
  RefreshCw,
  Eye,
  Star,
  Target,
  UserCog,
  Grid,
  List,
  
  ShieldCheck,
  ShieldHalf,
 
  History,
  Ban,
  AlertTriangle,
  Info,
  ShieldPlus,
  Package,
  LayoutDashboard,
  BarChart3,
  DollarSign,
  Layers,
  FileSpreadsheet,
  FileJson,
  File,
  Building2
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
  DialogTrigger,
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

const RolesPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [assignUsersDialogOpen, setAssignUsersDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedRoleItem, setSelectedRoleItem] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for roles
  const roles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions. Can manage users, roles, settings, and all modules.',
      type: 'system',
      status: 'active',
      usersCount: 1,
      permissionsCount: 187,
      createdAt: '2018-01-15T10:30:00Z',
      updatedAt: '2024-03-15T09:30:00Z',
      color: 'purple',
      icon: ShieldCheck,
      level: 1,
      isDefault: true,
      isSystem: true,
      users: [
        { id: 1, name: 'John Smith', avatar: '/avatars/01.png' }
      ],
      permissions: [
        { module: 'Dashboard', actions: ['view', 'create', 'edit', 'delete', 'export'] },
        { module: 'Inventory', actions: ['view', 'create', 'edit', 'delete', 'export', 'import', 'adjust'] },
        { module: 'Warehouse', actions: ['view', 'create', 'edit', 'delete', 'manage'] },
        { module: 'Users', actions: ['view', 'create', 'edit', 'delete', 'manage', 'permissions'] },
        { module: 'Roles', actions: ['view', 'create', 'edit', 'delete', 'permissions'] },
        { module: 'Reports', actions: ['view', 'create', 'edit', 'delete', 'export', 'schedule'] },
        { module: 'Settings', actions: ['view', 'edit', 'manage'] }
      ],
      modules: [
        { name: 'Dashboard', access: 'full' },
        { name: 'Inventory', access: 'full' },
        { name: 'Warehouse', access: 'full' },
        { name: 'Users', access: 'full' },
        { name: 'Roles', access: 'full' },
        { name: 'Reports', access: 'full' },
        { name: 'Settings', access: 'full' }
      ],
      history: [
        { date: '2024-03-15T09:30:00Z', action: 'Updated permissions', user: 'System' },
        { date: '2024-01-10T14:20:00Z', action: 'Role modified', user: 'John Smith' },
        { date: '2018-01-15T10:30:00Z', action: 'Role created', user: 'System' }
      ]
    },
    {
      id: 2,
      name: 'Admin',
      description: 'Administrative access with ability to manage most modules except system settings.',
      type: 'system',
      status: 'active',
      usersCount: 3,
      permissionsCount: 124,
      createdAt: '2018-01-15T10:30:00Z',
      updatedAt: '2024-03-14T14:20:00Z',
      color: 'red',
      icon: Shield,
      level: 2,
      isDefault: true,
      isSystem: true,
      users: [
        { id: 2, name: 'Sarah Johnson', avatar: '/avatars/02.png' },
        { id: 7, name: 'Tom Anderson', avatar: '/avatars/07.png' },
        { id: 8, name: 'Rachel Green', avatar: '/avatars/08.png' }
      ],
      permissions: [
        { module: 'Dashboard', actions: ['view', 'create', 'edit', 'export'] },
        { module: 'Inventory', actions: ['view', 'create', 'edit', 'delete', 'export', 'adjust'] },
        { module: 'Warehouse', actions: ['view', 'create', 'edit', 'manage'] },
        { module: 'Users', actions: ['view', 'create', 'edit', 'manage'] },
        { module: 'Reports', actions: ['view', 'create', 'edit', 'export', 'schedule'] },
        { module: 'Settings', actions: ['view'] }
      ],
      modules: [
        { name: 'Dashboard', access: 'full' },
        { name: 'Inventory', access: 'full' },
        { name: 'Warehouse', access: 'full' },
        { name: 'Users', access: 'manage' },
        { name: 'Reports', access: 'full' },
        { name: 'Settings', access: 'view' }
      ],
      history: [
        { date: '2024-03-14T14:20:00Z', action: 'Permissions updated', user: 'John Smith' },
        { date: '2024-02-05T11:30:00Z', action: 'Role modified', user: 'John Smith' },
        { date: '2018-01-15T10:30:00Z', action: 'Role created', user: 'System' }
      ]
    },
    {
      id: 3,
      name: 'Manager',
      description: 'Management access with ability to oversee operations and approve requests.',
      type: 'system',
      status: 'active',
      usersCount: 2,
      permissionsCount: 86,
      createdAt: '2019-03-20T09:15:00Z',
      updatedAt: '2024-03-13T16:20:00Z',
      color: 'blue',
      icon: ShieldHalf,
      level: 3,
      isDefault: true,
      isSystem: true,
      users: [
        { id: 3, name: 'Mike Wilson', avatar: '/avatars/03.png' }
      ],
      permissions: [
        { module: 'Dashboard', actions: ['view', 'export'] },
        { module: 'Inventory', actions: ['view', 'create', 'edit', 'export', 'adjust'] },
        { module: 'Warehouse', actions: ['view', 'create', 'edit', 'manage'] },
        { module: 'Users', actions: ['view'] },
        { module: 'Reports', actions: ['view', 'create', 'export'] }
      ],
      modules: [
        { name: 'Dashboard', access: 'full' },
        { name: 'Inventory', access: 'manage' },
        { name: 'Warehouse', access: 'manage' },
        { name: 'Users', access: 'view' },
        { name: 'Reports', access: 'create' }
      ],
      history: [
        { date: '2024-03-13T16:20:00Z', action: 'Permissions updated', user: 'Sarah Johnson' },
        { date: '2024-01-15T10:30:00Z', action: 'Role modified', user: 'Sarah Johnson' },
        { date: '2019-03-20T09:15:00Z', action: 'Role created', user: 'System' }
      ]
    },
    {
      id: 4,
      name: 'User',
      description: 'Basic user access for day-to-day operations. Limited to assigned modules.',
      type: 'system',
      status: 'active',
      usersCount: 5,
      permissionsCount: 42,
      createdAt: '2019-03-20T09:15:00Z',
      updatedAt: '2024-03-12T11:30:00Z',
      color: 'green',
      icon: UserCog,
      level: 4,
      isDefault: true,
      isSystem: true,
      users: [
        { id: 4, name: 'Emily Chen', avatar: '/avatars/04.png' },
        { id: 5, name: 'David Brown', avatar: '/avatars/05.png' },
        { id: 6, name: 'Lisa Taylor', avatar: '/avatars/06.png' },
        { id: 9, name: 'James Wilson', avatar: '/avatars/09.png' },
        { id: 10, name: 'Patricia Lee', avatar: '/avatars/10.png' }
      ],
      permissions: [
        { module: 'Dashboard', actions: ['view'] },
        { module: 'Inventory', actions: ['view'] },
        { module: 'Warehouse', actions: ['view'] },
        { module: 'Reports', actions: ['view'] }
      ],
      modules: [
        { name: 'Dashboard', access: 'view' },
        { name: 'Inventory', access: 'view' },
        { name: 'Warehouse', access: 'view' },
        { name: 'Reports', access: 'view' }
      ],
      history: [
        { date: '2024-03-12T11:30:00Z', action: 'Permissions updated', user: 'Sarah Johnson' },
        { date: '2023-11-10T09:45:00Z', action: 'Role modified', user: 'Sarah Johnson' },
        { date: '2019-03-20T09:15:00Z', action: 'Role created', user: 'System' }
      ]
    },
    {
      id: 5,
      name: 'Warehouse Operator',
      description: 'Specialized role for warehouse staff with focus on inventory operations.',
      type: 'custom',
      status: 'active',
      usersCount: 8,
      permissionsCount: 34,
      createdAt: '2020-06-10T14:45:00Z',
      updatedAt: '2024-03-10T10:15:00Z',
      color: 'orange',
      icon: Package,
      level: 4,
      isDefault: false,
      isSystem: false,
      users: [],
      permissions: [
        { module: 'Dashboard', actions: ['view'] },
        { module: 'Inventory', actions: ['view', 'adjust'] },
        { module: 'Warehouse', actions: ['view', 'edit', 'manage'] },
        { module: 'Reports', actions: ['view'] }
      ],
      modules: [
        { name: 'Dashboard', access: 'view' },
        { name: 'Inventory', access: 'manage' },
        { name: 'Warehouse', access: 'full' },
        { name: 'Reports', access: 'view' }
      ],
      history: [
        { date: '2024-03-10T10:15:00Z', action: 'Role modified', user: 'Sarah Johnson' },
        { date: '2023-12-05T14:30:00Z', action: 'Permissions updated', user: 'Sarah Johnson' },
        { date: '2020-06-10T14:45:00Z', action: 'Role created', user: 'John Smith' }
      ]
    },
    {
      id: 6,
      name: 'Inventory Specialist',
      description: 'Focused on inventory management with ability to perform counts and adjustments.',
      type: 'custom',
      status: 'active',
      usersCount: 5,
      permissionsCount: 28,
      createdAt: '2021-02-05T11:20:00Z',
      updatedAt: '2024-03-09T13:45:00Z',
      color: 'teal',
      icon: Package,
      level: 4,
      isDefault: false,
      isSystem: false,
      users: [],
      permissions: [
        { module: 'Dashboard', actions: ['view'] },
        { module: 'Inventory', actions: ['view', 'edit', 'adjust', 'count'] },
        { module: 'Reports', actions: ['view', 'create'] }
      ],
      modules: [
        { name: 'Dashboard', access: 'view' },
        { name: 'Inventory', access: 'full' },
        { name: 'Reports', access: 'create' }
      ],
      history: [
        { date: '2024-03-09T13:45:00Z', action: 'Permissions updated', user: 'Mike Wilson' },
        { date: '2024-01-20T11:30:00Z', action: 'Role modified', user: 'Mike Wilson' },
        { date: '2021-02-05T11:20:00Z', action: 'Role created', user: 'Sarah Johnson' }
      ]
    },
    {
      id: 7,
      name: 'Quality Auditor',
      description: 'Access to quality control modules and inspection tools.',
      type: 'custom',
      status: 'active',
      usersCount: 3,
      permissionsCount: 22,
      createdAt: '2021-08-15T13:30:00Z',
      updatedAt: '2024-03-08T09:30:00Z',
      color: 'purple',
      icon: Target,
      level: 4,
      isDefault: false,
      isSystem: false,
      users: [],
      permissions: [
        { module: 'Dashboard', actions: ['view'] },
        { module: 'Quality', actions: ['view', 'create', 'edit', 'approve'] },
        { module: 'Reports', actions: ['view', 'create'] }
      ],
      modules: [
        { name: 'Dashboard', access: 'view' },
        { name: 'Quality', access: 'full' },
        { name: 'Reports', access: 'create' }
      ],
      history: [
        { date: '2024-03-08T09:30:00Z', action: 'Role modified', user: 'Mike Wilson' },
        { date: '2023-11-15T10:20:00Z', action: 'Permissions updated', user: 'Mike Wilson' },
        { date: '2021-08-15T13:30:00Z', action: 'Role created', user: 'Sarah Johnson' }
      ]
    },
    {
      id: 8,
      name: 'Financial Analyst',
      description: 'Access to financial reports and cost analysis modules.',
      type: 'custom',
      status: 'inactive',
      usersCount: 0,
      permissionsCount: 18,
      createdAt: '2022-01-20T09:45:00Z',
      updatedAt: '2024-02-28T16:20:00Z',
      color: 'yellow',
      icon: DollarSign,
      level: 4,
      isDefault: false,
      isSystem: false,
      users: [],
      permissions: [
        { module: 'Dashboard', actions: ['view'] },
        { module: 'Finance', actions: ['view', 'export'] },
        { module: 'Reports', actions: ['view', 'create', 'export'] }
      ],
      modules: [
        { name: 'Dashboard', access: 'view' },
        { name: 'Finance', access: 'view' },
        { name: 'Reports', access: 'full' }
      ],
      history: [
        { date: '2024-02-28T16:20:00Z', action: 'Role deactivated', user: 'Sarah Johnson' },
        { date: '2023-10-10T14:15:00Z', action: 'Permissions updated', user: 'Sarah Johnson' },
        { date: '2022-01-20T09:45:00Z', action: 'Role created', user: 'John Smith' }
      ]
    }
  ];

  // Module definitions
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'warehouse', name: 'Warehouse', icon: Building2 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'roles', name: 'Roles', icon: Shield },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'quality', name: 'Quality', icon: Target },
    { id: 'finance', name: 'Finance', icon: DollarSign }
  ];

  // Action definitions
  const actions = [
    { id: 'view', name: 'View', description: 'Can view records' },
    { id: 'create', name: 'Create', description: 'Can create new records' },
    { id: 'edit', name: 'Edit', description: 'Can edit existing records' },
    { id: 'delete', name: 'Delete', description: 'Can delete records' },
    { id: 'export', name: 'Export', description: 'Can export data' },
    { id: 'import', name: 'Import', description: 'Can import data' },
    { id: 'approve', name: 'Approve', description: 'Can approve requests' },
    { id: 'manage', name: 'Manage', description: 'Full management access' }
  ];

  const roleTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'system', name: 'System Roles', color: 'purple' },
    { id: 'custom', name: 'Custom Roles', color: 'blue' }
  ];

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active', color: 'green' },
    { id: 'inactive', name: 'Inactive', color: 'gray' }
  ];

  const getRoleIcon = (role) => {
    const Icon = role.icon || Shield;
    return <Icon size={16} className={`text-${role.color}-600`} />;
  };

  const getRoleBadge = (role) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      teal: 'bg-teal-100 text-teal-700 border-teal-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    
    return (
      <Badge className={`${colors[role.color] || 'bg-gray-100 text-gray-700'} px-2 py-0.5 text-xs`}>
        {role.type === 'system' ? 'System' : 'Custom'}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-200 px-2 py-0.5 text-xs">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 px-2 py-0.5 text-xs">Inactive</Badge>;
      default:
        return <Badge variant="outline" className="text-xs px-2 py-0.5">{status}</Badge>;
    }
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

  const filteredRoles = roles.filter(role => {
    if (selectedRole !== 'all' && role.type !== selectedRole) return false;
    if (selectedStatus !== 'all' && role.status !== selectedStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return role.name.toLowerCase().includes(query) ||
             role.description.toLowerCase().includes(query) ||
             role.type.toLowerCase().includes(query);
    }
    return true;
  });

  const stats = {
    total: roles.length,
    system: roles.filter(r => r.type === 'system').length,
    custom: roles.filter(r => r.type === 'custom').length,
    active: roles.filter(r => r.status === 'active').length,
    inactive: roles.filter(r => r.status === 'inactive').length,
    totalUsers: roles.reduce((sum, r) => sum + r.usersCount, 0)
  };

  const handleSelectAll = () => {
    if (selectedRoles.length === filteredRoles.length) {
      setSelectedRoles([]);
    } else {
      setSelectedRoles(filteredRoles.map(r => r.id));
    }
  };

  const handleSelectRole = (id) => {
    if (selectedRoles.includes(id)) {
      setSelectedRoles(selectedRoles.filter(r => r !== id));
    } else {
      setSelectedRoles([...selectedRoles, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
            <p className="text-gray-500 mt-1 text-sm">Define and manage user roles and permissions</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[150px] border-gray-200 bg-white h-9">
                <SelectValue placeholder="Role Type" />
              </SelectTrigger>
              <SelectContent>
                {roleTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
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
              variant="outline"
              className="gap-2 border-gray-200 h-9"
              onClick={() => setImportDialogOpen(true)}
            >
              <Upload size={16} />
              Import
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white h-9"
              onClick={() => setCreateDialogOpen(true)}
            >
              <ShieldPlus size={16} />
              Create Role
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Roles</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Shield size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">System Roles</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.system}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <ShieldCheck size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Custom Roles</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.custom}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <ShieldHalf size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Active Roles</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.active}</p>
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
                  <p className="text-xs text-gray-500">Total Users</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.totalUsers}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Users size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {roles.filter(r => r.type === 'system').map(role => {
          const percentage = (role.usersCount / stats.totalUsers * 100).toFixed(0);
          
          return (
            <Card key={role.id} className="border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${role.color}-600`}></div>
                    <span className="text-sm font-medium">{role.name}</span>
                  </div>
                  <span className="text-sm font-bold">{role.usersCount} users</span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-1.5 bg-gray-100" 
                  style={{ '--progress-background': `var(--${role.color}-600)` }}
                />
                <p className="text-xs text-gray-500 mt-1">{percentage}% of users</p>
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
              placeholder="Search roles by name or description..."
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
              {statusOptions.map(status => (
                <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
              ))}
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
      {selectedRoles.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white px-2 py-0.5">{selectedRoles.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedRoles([])} className="h-7 text-xs">
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <CheckCircle size={14} className="mr-2" />
              Activate
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Ban size={14} className="mr-2" />
              Deactivate
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Edit size={14} className="mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Copy size={14} className="mr-2" />
              Duplicate
            </Button>
          </div>
        </div>
      )}

      {/* Roles Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredRoles.map((role) => {
            const Icon = role.icon || Shield;
            
            return (
              <ContextMenu key={role.id}>
                <ContextMenuTrigger>
                  <Card 
                    className="border-gray-200 hover:shadow-lg transition-all group cursor-pointer"
                    onClick={() => {
                      setSelectedRoleItem(role);
                      setViewDetailsDialogOpen(true);
                    }}
                  >
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className={`p-4 border-b border-gray-200 bg-gradient-to-r from-${role.color}-50 to-transparent`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-${role.color}-600 text-white rounded-lg`}>
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getRoleBadge(role)}
                                {role.isSystem && (
                                  <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                                    <Shield size={10} className="mr-1" />
                                    System
                                  </Badge>
                                )}
                                {role.isDefault && (
                                  <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                                    <Star size={10} className="mr-1 text-yellow-600" />
                                    Default
                                  </Badge>
                                )}
                              </div>
                              <h3 className="font-semibold text-gray-900 text-base">{role.name}</h3>
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
                                setSelectedRoleItem(role);
                                setViewDetailsDialogOpen(true);
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoleItem(role);
                                setEditDialogOpen(true);
                              }}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoleItem(role);
                                setPermissionsDialogOpen(true);
                              }}>
                                <Key className="mr-2 h-4 w-4" />
                                Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoleItem(role);
                                setAssignUsersDialogOpen(true);
                              }}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Assign Users
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              {!role.isSystem && (
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRoleItem(role);
                                    setDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="space-y-3">
                          {/* Description */}
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {role.description}
                          </p>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <Users size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-700">{role.usersCount} users</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Key size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-700">{role.permissionsCount} permissions</span>
                            </div>
                          </div>

                          {/* Level */}
                          <div className="flex items-center gap-1">
                            <Layers size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-700">Level {role.level}</span>
                          </div>

                          {/* Module Access Preview */}
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500">Module Access</p>
                            <div className="flex flex-wrap gap-1">
                              {role.modules.slice(0, 4).map(module => (
                                <Badge key={module.name} variant="outline" className="text-xs px-1.5 py-0.5 border-gray-200">
                                  {module.name}: {module.access}
                                </Badge>
                              ))}
                              {role.modules.length > 4 && (
                                <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-gray-200">
                                  +{role.modules.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Users Preview */}
                          {role.users.length > 0 && (
                            <div className="flex items-center gap-1">
                              <div className="flex -space-x-2">
                                {role.users.slice(0, 3).map(user => (
                                  <Avatar key={user.id} className="h-6 w-6 border-2 border-white">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="text-xs bg-red-100 text-red-600">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              {role.users.length > 3 && (
                                <span className="text-xs text-gray-500 ml-1">
                                  +{role.users.length - 3} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>Updated {formatDate(role.updatedAt)}</span>
                            </div>
                            {getStatusBadge(role.status)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem onClick={() => {
                    setSelectedRoleItem(role);
                    setViewDetailsDialogOpen(true);
                  }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => {
                    setSelectedRoleItem(role);
                    setPermissionsDialogOpen(true);
                  }}>
                    <Key className="mr-2 h-4 w-4" />
                    Manage Permissions
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => {
                    setSelectedRoleItem(role);
                    setAssignUsersDialogOpen(true);
                  }}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Assign Users
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate Role
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
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
                      checked={selectedRoles.length === filteredRoles.length && filteredRoles.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Role</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Type</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Users</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Permissions</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Level</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Status</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Last Updated</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Default</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => {
                  const Icon = role.icon || Shield;
                  
                  return (
                    <TableRow 
                      key={role.id} 
                      className="border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedRoleItem(role);
                        setViewDetailsDialogOpen(true);
                      }}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedRoles.includes(role.id)}
                          onCheckedChange={() => handleSelectRole(role.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 bg-${role.color}-100 rounded`}>
                            <Icon size={14} className={`text-${role.color}-600`} />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-900">{role.name}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">{role.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(role)}</TableCell>
                      <TableCell className="text-sm font-medium">{role.usersCount}</TableCell>
                      <TableCell className="text-sm">{role.permissionsCount}</TableCell>
                      <TableCell className="text-sm">Level {role.level}</TableCell>
                      <TableCell>{getStatusBadge(role.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-sm">{formatDate(role.updatedAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {role.isDefault ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : (
                          <XCircle size={16} className="text-gray-300" />
                        )}
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
                              setSelectedRoleItem(role);
                              setViewDetailsDialogOpen(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedRoleItem(role);
                              setEditDialogOpen(true);
                            }}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedRoleItem(role);
                              setPermissionsDialogOpen(true);
                            }}>
                              <Key className="mr-2 h-4 w-4" />
                              Permissions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {!role.isSystem && (
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedRoleItem(role);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-500">
                Showing {filteredRoles.length} of {roles.length} roles
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
          {selectedRoleItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <div className={`p-2 bg-${selectedRoleItem.color}-100 rounded-lg`}>
                    {selectedRoleItem.icon && <selectedRoleItem.icon size={20} className={`text-${selectedRoleItem.color}-600`} />}
                  </div>
                  <div>
                    <span>{selectedRoleItem.name}</span>
                    <DialogDescription className="text-sm">
                      {selectedRoleItem.type === 'system' ? 'System Role' : 'Custom Role'} • Level {selectedRoleItem.level}
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid grid-cols-4 bg-gray-100">
                  <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
                  <TabsTrigger value="permissions" className="text-sm">Permissions</TabsTrigger>
                  <TabsTrigger value="users" className="text-sm">Users</TabsTrigger>
                  <TabsTrigger value="history" className="text-sm">History</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-sm">{selectedRoleItem.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="text-sm">{selectedRoleItem.type === 'system' ? 'System Role' : 'Custom Role'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Status</p>
                      <div>{getStatusBadge(selectedRoleItem.status)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Users Assigned</p>
                      <p className="text-xl font-bold text-gray-900">{selectedRoleItem.usersCount}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Total Permissions</p>
                      <p className="text-xl font-bold text-gray-900">{selectedRoleItem.permissionsCount}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Created</p>
                      <p className="text-sm">{new Date(selectedRoleItem.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Last Updated</p>
                      <p className="text-sm">{new Date(selectedRoleItem.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {selectedRoleItem.isDefault && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <Info size={14} className="text-blue-600" />
                      <AlertTitle className="text-xs font-medium text-blue-700">Default Role</AlertTitle>
                      <AlertDescription className="text-xs text-blue-600/70">
                        This is a default system role that is automatically assigned to new users.
                      </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>

                <TabsContent value="permissions" className="space-y-4 mt-4">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedRoleItem.permissions.map((perm, idx) => (
                        <Card key={idx} className="border-gray-200">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-medium">{perm.module}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {perm.actions.map(action => (
                                    <Badge key={action} className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-0.5">
                                      {action}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-0.5">
                                {perm.actions.length} actions
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="users" className="space-y-4 mt-4">
                  {selectedRoleItem.users.length > 0 ? (
                    <div className="space-y-2">
                      {selectedRoleItem.users.map(user => (
                        <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{user.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            View Profile
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Users size={32} className="mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No users assigned to this role</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history" className="space-y-4 mt-4">
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {selectedRoleItem.history.map((item, idx) => (
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
                <Button 
                  className="bg-red-600 hover:bg-red-700 h-9"
                  onClick={() => {
                    setViewDetailsDialogOpen(false);
                    setEditDialogOpen(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Role
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Role Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Create New Role</DialogTitle>
            <DialogDescription className="text-sm">
              Define a new role with specific permissions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4 bg-gray-100">
                <TabsTrigger value="basic" className="text-sm">Basic Info</TabsTrigger>
                <TabsTrigger value="permissions" className="text-sm">Permissions</TabsTrigger>
                <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Role Name</Label>
                  <Input placeholder="e.g., Warehouse Manager" className="h-9" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Description</Label>
                  <Textarea placeholder="Describe the role and its responsibilities" rows={3} className="text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Role Level</Label>
                    <Select defaultValue="3">
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Level 1 (Highest)</SelectItem>
                        <SelectItem value="2">Level 2</SelectItem>
                        <SelectItem value="3">Level 3</SelectItem>
                        <SelectItem value="4">Level 4</SelectItem>
                        <SelectItem value="5">Level 5 (Lowest)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Color Theme</Label>
                    <Select defaultValue="blue">
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="teal">Teal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="permissions" className="space-y-4">
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {modules.map(module => (
                      <Card key={module.id} className="border-gray-200">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <module.icon size={14} className="text-red-600" />
                              <span className="text-sm font-medium">{module.name}</span>
                            </div>
                            <Select defaultValue="none">
                              <SelectTrigger className="w-[100px] h-7 text-xs">
                                <SelectValue placeholder="Access" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No Access</SelectItem>
                                <SelectItem value="view">View Only</SelectItem>
                                <SelectItem value="edit">Edit</SelectItem>
                                <SelectItem value="full">Full Access</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {actions.map(action => (
                              <div key={action.id} className="flex items-center space-x-1 mr-2">
                                <Checkbox id={`${module.id}-${action.id}`} />
                                <Label htmlFor={`${module.id}-${action.id}`} className="text-xs">
                                  {action.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Status</Label>
                  <RadioGroup defaultValue="active" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="create-active" />
                      <Label htmlFor="create-active" className="text-sm">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id="create-inactive" />
                      <Label htmlFor="create-inactive" className="text-sm">Inactive</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Role Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isDefault" />
                      <Label htmlFor="isDefault" className="text-sm">Set as default role for new users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isSystem" />
                      <Label htmlFor="isSystem" className="text-sm">System role (cannot be deleted)</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Auto-assignment</Label>
                  <Select defaultValue="none">
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select rule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No auto-assignment</SelectItem>
                      <SelectItem value="department">Assign by department</SelectItem>
                      <SelectItem value="location">Assign by location</SelectItem>
                      <SelectItem value="position">Assign by position</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Edit Role</DialogTitle>
            <DialogDescription className="text-sm">
              Update role information and permissions
            </DialogDescription>
          </DialogHeader>

          {selectedRoleItem && (
            <div className="space-y-4 py-4">
              <Tabs defaultValue="basic">
                <TabsList className="grid grid-cols-3 mb-4 bg-gray-100">
                  <TabsTrigger value="basic" className="text-sm">Basic Info</TabsTrigger>
                  <TabsTrigger value="permissions" className="text-sm">Permissions</TabsTrigger>
                  <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Role Name</Label>
                    <Input defaultValue={selectedRoleItem.name} className="h-9" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Description</Label>
                    <Textarea defaultValue={selectedRoleItem.description} rows={3} className="text-sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Role Level</Label>
                      <Select defaultValue={selectedRoleItem.level.toString()}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Level 1 (Highest)</SelectItem>
                          <SelectItem value="2">Level 2</SelectItem>
                          <SelectItem value="3">Level 3</SelectItem>
                          <SelectItem value="4">Level 4</SelectItem>
                          <SelectItem value="5">Level 5 (Lowest)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Color Theme</Label>
                      <Select defaultValue={selectedRoleItem.color}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="orange">Orange</SelectItem>
                          <SelectItem value="teal">Teal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="permissions" className="space-y-4">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {modules.map(module => (
                        <Card key={module.id} className="border-gray-200">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <module.icon size={14} className="text-red-600" />
                                <span className="text-sm font-medium">{module.name}</span>
                              </div>
                              <Select defaultValue="full">
                                <SelectTrigger className="w-[100px] h-7 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">No Access</SelectItem>
                                  <SelectItem value="view">View Only</SelectItem>
                                  <SelectItem value="edit">Edit</SelectItem>
                                  <SelectItem value="full">Full Access</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {actions.map(action => (
                                <div key={action.id} className="flex items-center space-x-1 mr-2">
                                  <Checkbox id={`edit-${module.id}-${action.id}`} defaultChecked />
                                  <Label htmlFor={`edit-${module.id}-${action.id}`} className="text-xs">
                                    {action.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Status</Label>
                    <RadioGroup defaultValue={selectedRoleItem.status} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="active" id="edit-active" />
                        <Label htmlFor="edit-active" className="text-sm">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inactive" id="edit-inactive" />
                        <Label htmlFor="edit-inactive" className="text-sm">Inactive</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Role Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="edit-isDefault" defaultChecked={selectedRoleItem.isDefault} />
                        <Label htmlFor="edit-isDefault" className="text-sm">Set as default role for new users</Label>
                      </div>
                      {!selectedRoleItem.isSystem && (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="edit-isSystem" />
                          <Label htmlFor="edit-isSystem" className="text-sm">Make system role (cannot be deleted)</Label>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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

      {/* Permissions Dialog */}
      <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Manage Permissions</DialogTitle>
            <DialogDescription className="text-sm">
              Configure detailed permissions for this role
            </DialogDescription>
          </DialogHeader>

          {selectedRoleItem && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className={`p-2 bg-${selectedRoleItem.color}-100 rounded`}>
                  {selectedRoleItem.icon && <selectedRoleItem.icon size={16} className={`text-${selectedRoleItem.color}-600`} />}
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedRoleItem.name}</p>
                  <p className="text-xs text-gray-500">Current Level: {selectedRoleItem.level}</p>
                </div>
              </div>

              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {modules.map(module => (
                    <Card key={module.id} className="border-gray-200">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <module.icon size={14} className="text-red-600" />
                            <span className="text-sm font-medium">{module.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 text-xs">
                            Select All
                          </Button>
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {actions.map(action => (
                            <div key={action.id} className="flex items-center space-x-1">
                              <Checkbox id={`perm-${module.id}-${action.id}`} defaultChecked />
                              <Label htmlFor={`perm-${module.id}-${action.id}`} className="text-xs">
                                {action.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPermissionsDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Save Permissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Users Dialog */}
      <Dialog open={assignUsersDialogOpen} onOpenChange={setAssignUsersDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Assign Users to Role</DialogTitle>
            <DialogDescription className="text-sm">
              Select users to assign to this role
            </DialogDescription>
          </DialogHeader>

          {selectedRoleItem && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className={`p-2 bg-${selectedRoleItem.color}-100 rounded`}>
                  {selectedRoleItem.icon && <selectedRoleItem.icon size={16} className={`text-${selectedRoleItem.color}-600`} />}
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedRoleItem.name}</p>
                  <p className="text-xs text-gray-500">Currently {selectedRoleItem.usersCount} users assigned</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Search Users</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                  <Input placeholder="Search by name or email..." className="pl-9 h-9" />
                </div>
              </div>

              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {users?.filter(u => u.status === 'active').map(user => (
                    <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`user-${user.id}`} />
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="text-xs bg-red-100 text-red-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Label htmlFor={`user-${user.id}`} className="text-xs font-medium">
                            {user.name}
                          </Label>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Badge className="text-xs px-2 py-0.5">{user.department}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Selected: 0 users</span>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Select All
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignUsersDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Assign Users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Delete Role</DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to delete this role? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedRoleItem && (
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-${selectedRoleItem.color}-100 rounded`}>
                  {selectedRoleItem.icon && <selectedRoleItem.icon size={16} className={`text-${selectedRoleItem.color}-600`} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600">{selectedRoleItem.name}</p>
                  <p className="text-xs text-gray-500">{selectedRoleItem.usersCount} users assigned</p>
                </div>
              </div>
              <div className="flex items-start gap-1 text-xs text-amber-600">
                <AlertTriangle size={12} className="mt-0.5" />
                <span>Users with this role will need to be reassigned to another role.</span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)} className="h-9">
              Delete Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Export Roles</DialogTitle>
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
              <Label className="text-sm">Include</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-all" defaultChecked />
                  <Label htmlFor="include-all" className="text-sm">All roles</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-permissions" defaultChecked />
                  <Label htmlFor="include-permissions" className="text-sm">Permissions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-users" defaultChecked />
                  <Label htmlFor="include-users" className="text-sm">Assigned users</Label>
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

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Import Roles</DialogTitle>
            <DialogDescription className="text-sm">
              Upload a file to import roles
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <Upload size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium mb-1">Drop your file here</p>
              <p className="text-xs text-gray-500 mb-3">or click to browse</p>
              <Input type="file" className="hidden" id="file-upload" />
              <Button variant="outline" size="sm" onClick={() => document.getElementById('file-upload').click()} className="h-8 text-xs">
                Choose File
              </Button>
              <p className="text-xs text-gray-400 mt-2">Supported formats: .xlsx, .csv, .json (max 10MB)</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Import Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-existing" />
                  <Label htmlFor="update-existing" className="text-sm">Update existing roles</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skip-duplicates" defaultChecked />
                  <Label htmlFor="skip-duplicates" className="text-sm">Skip duplicates</Label>
                </div>
              </div>
            </div>

            <Alert className="bg-gray-50 border-0">
              <Info size={14} />
              <AlertTitle className="text-xs font-medium">Sample Format</AlertTitle>
              <AlertDescription className="text-xs text-gray-500">
                Download a sample template to see the required format.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Role Settings</DialogTitle>
            <DialogDescription className="text-sm">
              Configure role management options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="display">
                <AccordionTrigger className="text-sm">Display Settings</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show system roles</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show inactive roles</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Compact view</Label>
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

              <AccordionItem value="permissions">
                <AccordionTrigger className="text-sm">Permission Defaults</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Auto-approve permission changes</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Require admin approval for new roles</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Default permission level</Label>
                    <Select defaultValue="view">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Access</SelectItem>
                        <SelectItem value="view">View Only</SelectItem>
                        <SelectItem value="edit">Edit</SelectItem>
                        <SelectItem value="full">Full Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="audit">
                <AccordionTrigger className="text-sm">Audit & Logging</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Log all role changes</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Send notifications on role changes</Label>
                    <Switch defaultChecked />
                  </div>
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
                <ShieldPlus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Create Role</TooltipContent>
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
            <TooltipContent side="left" className="text-sm">Export Roles</TooltipContent>
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

export default RolesPage;