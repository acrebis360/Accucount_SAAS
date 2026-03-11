// app/dashboard/manage-user-group/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users2,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  User,
  Shield,
  Settings,
  Download,
  Upload,
  Printer,
  Mail,
  Share2,
  Grid,
  List,
  X,
  ChevronDown,
  ChevronRight,
  Check,
  Ban,
  AlertCircle,
  Info,
  HelpCircle,
  Save,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  UsersRound,
  UserCog,
  UserCircle,
  UserCircle2,
  BadgeCheck,
  BadgeX,
  BadgeAlert,
  BadgeInfo,
  BadgeHelp,
  Award,
  Crown,
  Medal,
  Trophy,
  Star,
  Heart,
  Flag,
  Tag,
  Layers,
  FolderTree,
  TreePine,
  Network,
  GitBranch,
  GitFork,
  GitMerge,
  Workflow,
  Group,
  Ungroup,
  Combine,
  Split,
  MoveHorizontal,
  MoveVertical,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  ArrowUpCircle,
  ArrowDownCircle,
  ArrowLeftCircle,
  ArrowRightCircle,
  Circle,
  CircleDot,
  CircleOff,
  CircleCheck,
  CircleX,
  CircleAlert,
  CircleHelp,
  Square,
  SquareCheck,
  SquareX,
  SquareAlert,
  SquareHelp,
  Diamond,
  DiamondIcon,
  Hexagon,
  Octagon,
  Pentagon,
  Triangle,
  TriangleAlert,
  TriangleRight,
  TriangleLeft,
  TriangleDown,
  TriangleUp,
  Package,
  Warehouse,
  Store,
  FileCheck,
  GraduationCap
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
  DialogTrigger,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ManageUserGroupPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddMembersDialog, setShowAddMembersDialog] = useState(false);
  const [showRemoveMembersDialog, setShowRemoveMembersDialog] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [showSplitDialog, setShowSplitDialog] = useState(false);
  const [showHierarchyDialog, setShowHierarchyDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample user groups data
  const userGroups = [
    {
      id: 'GRP-001',
      name: 'Administrators',
      description: 'Full system access with all permissions',
      type: 'security',
      department: 'IT',
      memberCount: 5,
      maxMembers: 10,
      createdAt: '2024-01-15',
      createdBy: 'System',
      status: 'active',
      visibility: 'private',
      icon: Shield,
      color: 'bg-red-100 text-red-700',
      tags: ['admin', 'super-user', 'full-access'],
      members: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Lead Admin', avatar: null, initials: 'JD' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', avatar: null, initials: 'JS' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin', avatar: null, initials: 'MJ' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Admin', avatar: null, initials: 'SW' },
        { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Admin Trainee', avatar: null, initials: 'TB' },
      ],
      permissions: [
        'user_management',
        'role_management',
        'system_config',
        'audit_logs',
        'report_generation',
        'data_export',
      ],
      recentActivity: '2024-03-15',
    },
    {
      id: 'GRP-002',
      name: 'Stock Managers',
      description: 'Manage inventory, stocktakes, and transfers',
      type: 'functional',
      department: 'Operations',
      memberCount: 12,
      maxMembers: 20,
      createdAt: '2024-01-20',
      createdBy: 'John Doe',
      status: 'active',
      visibility: 'public',
      icon: Package,
      color: 'bg-blue-100 text-blue-700',
      tags: ['inventory', 'stock', 'operations'],
      members: [
        { id: 6, name: 'David Lee', email: 'david@example.com', role: 'Manager', avatar: null, initials: 'DL' },
        { id: 7, name: 'Lisa Chen', email: 'lisa@example.com', role: 'Supervisor', avatar: null, initials: 'LC' },
        { id: 8, name: 'Emma Watson', email: 'emma@example.com', role: 'Stock Clerk', avatar: null, initials: 'EW' },
        { id: 9, name: 'Anna Taylor', email: 'anna@example.com', role: 'Stock Clerk', avatar: null, initials: 'AT' },
      ],
      permissions: [
        'view_inventory',
        'edit_inventory',
        'stocktake_access',
        'transfer_access',
        'report_view',
      ],
      recentActivity: '2024-03-14',
    },
    {
      id: 'GRP-003',
      name: 'Warehouse Staff',
      description: 'Warehouse operations and physical handling',
      type: 'functional',
      department: 'Warehouse',
      memberCount: 25,
      maxMembers: 50,
      createdAt: '2024-02-01',
      createdBy: 'Jane Smith',
      status: 'active',
      visibility: 'public',
      icon: Warehouse,
      color: 'bg-green-100 text-green-700',
      tags: ['warehouse', 'staff', 'operations'],
      members: [
        { id: 10, name: 'Chris Evans', email: 'chris@example.com', role: 'Supervisor', avatar: null, initials: 'CE' },
        { id: 11, name: 'Scarlett Johansson', email: 'scarlett@example.com', role: 'Picker', avatar: null, initials: 'SJ' },
        { id: 12, name: 'Robert Downey', email: 'robert@example.com', role: 'Packer', avatar: null, initials: 'RD' },
      ],
      permissions: [
        'view_inventory',
        'perform_stocktake',
        'scan_items',
        'view_reports',
      ],
      recentActivity: '2024-03-13',
    },
    {
      id: 'GRP-004',
      name: 'Store Managers',
      description: 'Retail store management and operations',
      type: 'functional',
      department: 'Retail',
      memberCount: 8,
      maxMembers: 15,
      createdAt: '2024-02-10',
      createdBy: 'Mike Johnson',
      status: 'active',
      visibility: 'public',
      icon: Store,
      color: 'bg-purple-100 text-purple-700',
      tags: ['retail', 'store', 'management'],
      members: [
        { id: 13, name: 'Tom Holland', email: 'tom@example.com', role: 'Store Manager', avatar: null, initials: 'TH' },
        { id: 14, name: 'Zendaya', email: 'zendaya@example.com', role: 'Assistant Manager', avatar: null, initials: 'ZE' },
      ],
      permissions: [
        'view_inventory',
        'manage_store',
        'staff_scheduling',
        'report_view',
      ],
      recentActivity: '2024-03-12',
    },
    {
      id: 'GRP-005',
      name: 'Auditors',
      description: 'Compliance and audit team',
      type: 'security',
      department: 'Compliance',
      memberCount: 4,
      maxMembers: 8,
      createdAt: '2024-02-15',
      createdBy: 'Sarah Wilson',
      status: 'active',
      visibility: 'private',
      icon: FileCheck,
      color: 'bg-orange-100 text-orange-700',
      tags: ['audit', 'compliance', 'review'],
      members: [
        { id: 15, name: 'Paul Rudd', email: 'paul@example.com', role: 'Lead Auditor', avatar: null, initials: 'PR' },
        { id: 16, name: 'Evangeline Lilly', email: 'evangeline@example.com', role: 'Auditor', avatar: null, initials: 'EL' },
      ],
      permissions: [
        'view_all_data',
        'audit_logs',
        'compliance_reports',
        'export_data',
      ],
      recentActivity: '2024-03-11',
    },
    {
      id: 'GRP-006',
      name: 'Trainees',
      description: 'New employees in training',
      type: 'temporary',
      department: 'HR',
      memberCount: 15,
      maxMembers: 30,
      createdAt: '2024-03-01',
      createdBy: 'HR System',
      status: 'active',
      visibility: 'public',
      icon: GraduationCap,
      color: 'bg-yellow-100 text-yellow-700',
      tags: ['training', 'new-hire', 'learning'],
      members: [
        { id: 17, name: 'New User 1', email: 'new1@example.com', role: 'Trainee', avatar: null, initials: 'NU' },
        { id: 18, name: 'New User 2', email: 'new2@example.com', role: 'Trainee', avatar: null, initials: 'NU' },
      ],
      permissions: [
        'view_basic',
        'training_access',
        'limited_inventory_view',
      ],
      recentActivity: '2024-03-10',
    },
    {
      id: 'GRP-007',
      name: 'External Auditors',
      description: 'Third-party audit and compliance',
      type: 'external',
      department: 'External',
      memberCount: 3,
      maxMembers: 5,
      createdAt: '2024-02-20',
      createdBy: 'Admin',
      status: 'inactive',
      visibility: 'private',
      icon: Users,
      color: 'bg-gray-100 text-gray-700',
      tags: ['external', 'audit', 'third-party'],
      members: [
        { id: 19, name: 'External User', email: 'external@audit.com', role: 'Auditor', avatar: null, initials: 'EU' },
      ],
      permissions: [
        'read_only',
        'audit_access',
        'report_view',
      ],
      recentActivity: '2024-03-05',
    },
    {
      id: 'GRP-008',
      name: 'Project Team Alpha',
      description: 'Special project implementation team',
      type: 'project',
      department: 'Operations',
      memberCount: 7,
      maxMembers: 10,
      createdAt: '2024-02-25',
      createdBy: 'Project Lead',
      status: 'active',
      visibility: 'private',
      icon: GitBranch,
      color: 'bg-pink-100 text-pink-700',
      tags: ['project', 'temporary', 'special'],
      members: [
        { id: 20, name: 'Project Lead', email: 'lead@example.com', role: 'Lead', avatar: null, initials: 'PL' },
        { id: 21, name: 'Team Member 1', email: 'member1@example.com', role: 'Member', avatar: null, initials: 'TM' },
      ],
      permissions: [
        'project_access',
        'limited_inventory',
        'report_generation',
      ],
      recentActivity: '2024-03-09',
    },
  ];

  // All users for member management
  const allUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'IT', role: 'Lead Admin', status: 'active', avatar: null, initials: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'IT', role: 'Admin', status: 'active', avatar: null, initials: 'JS' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', department: 'IT', role: 'Admin', status: 'active', avatar: null, initials: 'MJ' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', department: 'IT', role: 'Admin', status: 'active', avatar: null, initials: 'SW' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', department: 'IT', role: 'Admin Trainee', status: 'active', avatar: null, initials: 'TB' },
    { id: 6, name: 'David Lee', email: 'david@example.com', department: 'Operations', role: 'Manager', status: 'active', avatar: null, initials: 'DL' },
    { id: 7, name: 'Lisa Chen', email: 'lisa@example.com', department: 'Operations', role: 'Supervisor', status: 'active', avatar: null, initials: 'LC' },
    { id: 8, name: 'Emma Watson', email: 'emma@example.com', department: 'Operations', role: 'Stock Clerk', status: 'active', avatar: null, initials: 'EW' },
    { id: 9, name: 'Anna Taylor', email: 'anna@example.com', department: 'Operations', role: 'Stock Clerk', status: 'active', avatar: null, initials: 'AT' },
    { id: 10, name: 'Chris Evans', email: 'chris@example.com', department: 'Warehouse', role: 'Supervisor', status: 'active', avatar: null, initials: 'CE' },
    { id: 11, name: 'Scarlett Johansson', email: 'scarlett@example.com', department: 'Warehouse', role: 'Picker', status: 'active', avatar: null, initials: 'SJ' },
    { id: 12, name: 'Robert Downey', email: 'robert@example.com', department: 'Warehouse', role: 'Packer', status: 'active', avatar: null, initials: 'RD' },
    { id: 13, name: 'Tom Holland', email: 'tom@example.com', department: 'Retail', role: 'Store Manager', status: 'active', avatar: null, initials: 'TH' },
    { id: 14, name: 'Zendaya', email: 'zendaya@example.com', department: 'Retail', role: 'Assistant Manager', status: 'active', avatar: null, initials: 'ZE' },
    { id: 15, name: 'Paul Rudd', email: 'paul@example.com', department: 'Compliance', role: 'Lead Auditor', status: 'active', avatar: null, initials: 'PR' },
    { id: 16, name: 'Evangeline Lilly', email: 'evangeline@example.com', department: 'Compliance', role: 'Auditor', status: 'active', avatar: null, initials: 'EL' },
    { id: 17, name: 'New User 1', email: 'new1@example.com', department: 'HR', role: 'Trainee', status: 'active', avatar: null, initials: 'NU' },
    { id: 18, name: 'New User 2', email: 'new2@example.com', department: 'HR', role: 'Trainee', status: 'active', avatar: null, initials: 'NU' },
    { id: 19, name: 'External User', email: 'external@audit.com', department: 'External', role: 'Auditor', status: 'inactive', avatar: null, initials: 'EU' },
    { id: 20, name: 'Project Lead', email: 'lead@example.com', department: 'Operations', role: 'Lead', status: 'active', avatar: null, initials: 'PL' },
    { id: 21, name: 'Team Member 1', email: 'member1@example.com', department: 'Operations', role: 'Member', status: 'active', avatar: null, initials: 'TM' },
    { id: 22, name: 'Robert Johnson', email: 'robert.j@example.com', department: 'Sales', role: 'Sales Rep', status: 'active', avatar: null, initials: 'RJ' },
    { id: 23, name: 'Maria Garcia', email: 'maria@example.com', department: 'Sales', role: 'Sales Manager', status: 'active', avatar: null, initials: 'MG' },
    { id: 24, name: 'James Wilson', email: 'james@example.com', department: 'Marketing', role: 'Marketing Lead', status: 'active', avatar: null, initials: 'JW' },
    { id: 25, name: 'Patricia Brown', email: 'patricia@example.com', department: 'Finance', role: 'Finance Manager', status: 'active', avatar: null, initials: 'PB' },
  ];

  // Departments
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'IT', name: 'IT' },
    { id: 'Operations', name: 'Operations' },
    { id: 'Warehouse', name: 'Warehouse' },
    { id: 'Retail', name: 'Retail' },
    { id: 'Compliance', name: 'Compliance' },
    { id: 'HR', name: 'HR' },
    { id: 'External', name: 'External' },
    { id: 'Sales', name: 'Sales' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Finance', name: 'Finance' },
  ];

  // Group types
  const groupTypes = [
    { id: 'security', name: 'Security Group', icon: Shield },
    { id: 'functional', name: 'Functional Group', icon: Users },
    { id: 'project', name: 'Project Group', icon: GitBranch },
    { id: 'temporary', name: 'Temporary Group', icon: Clock },
    { id: 'external', name: 'External Group', icon: UsersRound },
  ];

  // Permissions
  const allPermissions = [
    { id: 'view_inventory', name: 'View Inventory', category: 'Inventory' },
    { id: 'edit_inventory', name: 'Edit Inventory', category: 'Inventory' },
    { id: 'stocktake_access', name: 'Stocktake Access', category: 'Inventory' },
    { id: 'transfer_access', name: 'Transfer Access', category: 'Inventory' },
    { id: 'user_management', name: 'User Management', category: 'Administration' },
    { id: 'role_management', name: 'Role Management', category: 'Administration' },
    { id: 'system_config', name: 'System Configuration', category: 'Administration' },
    { id: 'audit_logs', name: 'Audit Logs', category: 'Administration' },
    { id: 'report_generation', name: 'Report Generation', category: 'Reports' },
    { id: 'report_view', name: 'View Reports', category: 'Reports' },
    { id: 'data_export', name: 'Export Data', category: 'Data' },
    { id: 'view_all_data', name: 'View All Data', category: 'Data' },
    { id: 'compliance_reports', name: 'Compliance Reports', category: 'Compliance' },
    { id: 'manage_store', name: 'Manage Store', category: 'Retail' },
    { id: 'staff_scheduling', name: 'Staff Scheduling', category: 'HR' },
    { id: 'perform_stocktake', name: 'Perform Stocktake', category: 'Operations' },
    { id: 'scan_items', name: 'Scan Items', category: 'Operations' },
    { id: 'training_access', name: 'Training Access', category: 'Learning' },
    { id: 'view_basic', name: 'Basic View', category: 'Access' },
    { id: 'read_only', name: 'Read Only', category: 'Access' },
    { id: 'project_access', name: 'Project Access', category: 'Project' },
    { id: 'limited_inventory', name: 'Limited Inventory', category: 'Inventory' },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    suspended: { label: 'Suspended', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
  };

  const visibilityConfig = {
    public: { label: 'Public', color: 'bg-blue-50 text-blue-700' },
    private: { label: 'Private', color: 'bg-purple-50 text-purple-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getVisibilityColor = (visibility) => {
    return visibilityConfig[visibility]?.color || 'bg-gray-50 text-gray-700';
  };

  const filteredGroups = userGroups.filter(group => {
    const matchesDepartment = selectedDepartment === 'all' || group.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || group.status === selectedStatus;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesDepartment && matchesStatus && matchesSearch;
  });

  const stats = {
    total: userGroups.length,
    active: userGroups.filter(g => g.status === 'active').length,
    inactive: userGroups.filter(g => g.status === 'inactive').length,
    totalMembers: userGroups.reduce((sum, g) => sum + g.memberCount, 0),
    security: userGroups.filter(g => g.type === 'security').length,
    functional: userGroups.filter(g => g.type === 'functional').length,
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Manage User Groups</h1>
            <p className="text-black/50 mt-1">Create and manage user groups, permissions, and team structures</p>
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
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#F5EEE9]">
                  <Upload size={16} />
                  Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Import from Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileJson className="mr-2 h-4 w-4" />
                  Import from CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Import from Active Directory
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              New User Group
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Groups</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Users2 size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Groups</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.active}</p>
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
                  <p className="text-xs text-black/50">Total Members</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalMembers}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Users size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Security Groups</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.security}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Shield size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Functional Groups</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.functional}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Users2 size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
            <Input
              placeholder="Search groups by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
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

      {/* Group Cards/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredGroups.map((group) => {
            const GroupIcon = group.icon;
            
            return (
              <Card key={group.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={cn("p-4 rounded-t-lg", group.color)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white/30 rounded-lg backdrop-blur-sm">
                          <GroupIcon size={18} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{group.name}</h3>
                          <p className="text-xs text-white/80 mt-0.5">{group.id}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedGroup(group);
                            setShowEditDialog(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Group
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedGroup(group);
                            setShowAddMembersDialog(true);
                          }}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Members
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedGroup(group);
                            setShowPermissionsDialog(true);
                          }}>
                            <Shield className="mr-2 h-4 w-4" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                            setSelectedGroup(group);
                            setShowDeleteDialog(true);
                          }}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-sm text-black/50 line-clamp-2 mb-3">
                      {group.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Department</span>
                        <span className="font-medium text-black">{group.department}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Type</span>
                        <Badge className={cn("text-xs", groupTypes.find(t => t.id === group.type)?.icon ? 'bg-[#F5EEE9] text-black' : '')}>
                          {group.type}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Members</span>
                        <span className="font-medium text-black">{group.memberCount}/{group.maxMembers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Visibility</span>
                        <Badge className={cn("text-xs", getVisibilityColor(group.visibility))}>
                          {group.visibility}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Status</span>
                        <Badge className={cn("text-xs border-0", getStatusColor(group.status))}>
                          {group.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Members Avatars */}
                    <div className="mt-4">
                      <p className="text-xs text-black/50 mb-2">Team Members</p>
                      <div className="flex items-center -space-x-2">
                        {group.members.slice(0, 5).map((member) => (
                          <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                            <AvatarFallback className="text-xs bg-red-600 text-white">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {group.members.length > 5 && (
                          <div className="h-8 w-8 rounded-full bg-[#F5EEE9] flex items-center justify-center text-xs font-medium border-2 border-white">
                            +{group.members.length - 5}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-4">
                      {group.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9] bg-[#F5EEE9]/30">
                          {tag}
                        </Badge>
                      ))}
                      {group.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          +{group.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F5EEE9]">
                      <div className="flex items-center gap-1 text-xs text-black/50">
                        <Clock size={12} />
                        Updated {group.recentActivity}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedGroup(group);
                          setShowDetailsDialog(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-[#F5EEE9]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                  <TableHead className="w-8">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-black/50">Group</TableHead>
                  <TableHead className="text-black/50">ID</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Department</TableHead>
                  <TableHead className="text-black/50">Members</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Visibility</TableHead>
                  <TableHead className="text-black/50">Created</TableHead>
                  <TableHead className="text-black/50">Last Activity</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map((group) => {
                  const GroupIcon = group.icon;
                  
                  return (
                    <TableRow key={group.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn("p-1.5 rounded-lg", group.color)}>
                            <GroupIcon size={14} className="text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-black">{group.name}</p>
                            <p className="text-xs text-black/50">{group.description.substring(0, 30)}...</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{group.id}</TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", group.color)}>
                          {group.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{group.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{group.memberCount}</span>
                          <span className="text-xs text-black/50">/ {group.maxMembers}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(group.status))}>
                          {group.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getVisibilityColor(group.visibility))}>
                          {group.visibility}
                        </Badge>
                      </TableCell>
                      <TableCell>{group.createdAt}</TableCell>
                      <TableCell>{group.recentActivity}</TableCell>
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
                Showing {filteredGroups.length} of {userGroups.length} groups
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

      {/* Create Group Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create User Group</DialogTitle>
            <DialogDescription>
              Create a new user group with specific permissions and members
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Group Name</Label>
                <Input placeholder="e.g., Warehouse Managers" />
              </div>
              <div className="space-y-2">
                <Label>Group Type</Label>
                <Select defaultValue="functional">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {groupTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.slice(1).map(dept => (
                      <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Visibility</Label>
                <Select defaultValue="public">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe the purpose of this group" rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Members</Label>
                <Input type="number" defaultValue="20" />
              </div>
              <div className="space-y-2">
                <Label>Initial Members</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select members" />
                  </SelectTrigger>
                  <SelectContent>
                    {allUsers.slice(0, 5).map(user => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Enter tags separated by commas" />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup defaultValue="active" className="flex gap-4">
                {['active', 'inactive'].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <RadioGroupItem value={status} id={`create-${status}`} />
                    <Label htmlFor={`create-${status}`} className="capitalize">{status}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Members Dialog */}
      <Dialog open={showAddMembersDialog} onOpenChange={setShowAddMembersDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Members to {selectedGroup?.name}</DialogTitle>
            <DialogDescription>
              Select users to add to this group
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
              <Input placeholder="Search users..." className="pl-10" />
            </div>

            <ScrollArea className="h-96">
              <div className="space-y-2">
                {allUsers.filter(u => !selectedGroup?.members.some(m => m.id === u.id)).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg hover:bg-[#F5EEE9]/30">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-red-600 text-white">{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-black">{user.name}</p>
                        <p className="text-xs text-black/50">{user.email} • {user.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-[#F5EEE9]">
                        {user.role}
                      </Badge>
                      <Checkbox />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMembersDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Add Selected ({selectedGroup?.members.length || 0})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={showPermissionsDialog} onOpenChange={setShowPermissionsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Manage Permissions for {selectedGroup?.name}</DialogTitle>
            <DialogDescription>
              Configure what this group can access and do
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>

              <ScrollArea className="h-80">
                <div className="space-y-4">
                  {allPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                      <div>
                        <p className="font-medium text-black">{permission.name}</p>
                        <p className="text-xs text-black/50">{permission.category}</p>
                      </div>
                      <Switch defaultChecked={selectedGroup?.permissions.includes(permission.id)} />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissionsDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Save Permissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete User Group</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this group? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-medium text-red-700">Warning</p>
                  <p className="text-xs text-red-600/70 mt-1">
                    Deleting "{selectedGroup?.name}" will remove all {selectedGroup?.memberCount} members from this group and revoke their permissions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Delete Group
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
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Create Group</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowBulkDialog(true)}
              >
                <Users2 size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Bulk Actions</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowHierarchyDialog(true)}
              >
                <GitBranch size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Group Hierarchy</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ManageUserGroupPage;