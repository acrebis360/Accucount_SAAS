// app/dashboard/administration/users/page.js
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
  Mail,
  Phone,
  MapPin,
  Building2,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  UserPlus,
  Shield,
  Key,
  Lock,
  Unlock,
  RefreshCw,
  Eye,
  EyeOff,
  Star,
  Award,
  Target,
  Settings,
  Briefcase,
  UserCog,
  UserCheck,
  UserX,
  Grid,
  List,

  User,

  LogIn,
  LogOut,
  History,
  Activity,
  MessageSquare,

  Heart,
  AlertTriangle,
  Info,
  FileSpreadsheet,
  FileJson
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const UsersPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for users
  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@accucount.com',
      role: 'Super Admin',
      department: 'Executive',
      position: 'Chief Executive Officer',
      status: 'active',
      lastActive: '2024-03-15T09:30:00Z',
      joined: '2018-01-15T10:30:00Z',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      avatar: '/avatars/01.png',
      manager: 'Self',
      employeeId: 'EMP-001',
      permissions: ['all'],
      groups: ['Executive Team', 'Board Members'],
      projects: ['Strategic Planning', 'Company Growth', 'Mergers & Acquisitions'],
      skills: ['Leadership', 'Strategy', 'Finance', 'Operations'],
      languages: ['English', 'Spanish'],
      timezone: 'PST (UTC-8)',
      lastLoginIP: '192.168.1.100',
      loginHistory: [
        { date: '2024-03-15T09:30:00Z', ip: '192.168.1.100', device: 'Chrome / Windows', location: 'San Francisco' },
        { date: '2024-03-14T08:45:00Z', ip: '192.168.1.100', device: 'Chrome / Windows', location: 'San Francisco' },
        { date: '2024-03-13T10:15:00Z', ip: '192.168.1.101', device: 'Safari / iPhone', location: 'San Francisco' }
      ],
      metrics: {
        projectsCompleted: 24,
        tasksCompleted: 156,
        loginStreak: 45,
        avgResponseTime: '2.3h',
        satisfaction: '98%'
      },
      badges: ['Top Performer', '5 Year Club', 'Leadership'],
      emergencyContact: {
        name: 'Mary Smith',
        relationship: 'Spouse',
        phone: '+1 (555) 123-4568'
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@accucount.com',
      role: 'Admin',
      department: 'Operations',
      position: 'Chief Operating Officer',
      status: 'active',
      lastActive: '2024-03-15T08:45:00Z',
      joined: '2019-03-20T09:15:00Z',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      avatar: '/avatars/02.png',
      manager: 'John Smith',
      employeeId: 'EMP-002',
      permissions: ['users.manage', 'inventory.view', 'reports.create', 'operations.manage'],
      groups: ['Operations Team', 'Managers', 'Strategy Committee'],
      projects: ['Process Optimization', 'Team Building', 'Cost Reduction'],
      skills: ['Operations', 'Management', 'Logistics', 'Process Improvement'],
      languages: ['English'],
      timezone: 'EST (UTC-5)',
      lastLoginIP: '192.168.2.100',
      loginHistory: [
        { date: '2024-03-15T08:45:00Z', ip: '192.168.2.100', device: 'Firefox / Windows', location: 'New York' },
        { date: '2024-03-14T09:30:00Z', ip: '192.168.2.100', device: 'Firefox / Windows', location: 'New York' }
      ],
      metrics: {
        projectsCompleted: 18,
        tasksCompleted: 142,
        loginStreak: 32,
        avgResponseTime: '1.8h',
        satisfaction: '95%'
      },
      badges: ['Excellence Award', 'Manager of the Year'],
      emergencyContact: {
        name: 'Mike Johnson',
        relationship: 'Spouse',
        phone: '+1 (555) 234-5679'
      }
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@accucount.com',
      role: 'Manager',
      department: 'Warehouse',
      position: 'Warehouse Operations Manager',
      status: 'active',
      lastActive: '2024-03-14T16:20:00Z',
      joined: '2020-06-10T14:45:00Z',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      avatar: '/avatars/03.png',
      manager: 'Sarah Johnson',
      employeeId: 'EMP-003',
      permissions: ['inventory.manage', 'warehouse.view', 'staff.manage', 'reports.view'],
      groups: ['Warehouse Team', 'Managers', 'Safety Committee'],
      projects: ['Inventory Optimization', 'Staff Training', 'Safety Program'],
      skills: ['Warehouse Management', 'Inventory Control', 'Team Leadership', 'Safety Compliance'],
      languages: ['English'],
      timezone: 'CST (UTC-6)',
      lastLoginIP: '192.168.3.100',
      loginHistory: [
        { date: '2024-03-14T16:20:00Z', ip: '192.168.3.100', device: 'Chrome / Windows', location: 'Chicago' },
        { date: '2024-03-14T09:15:00Z', ip: '192.168.3.101', device: 'Mobile App / Android', location: 'Chicago' }
      ],
      metrics: {
        projectsCompleted: 12,
        tasksCompleted: 98,
        loginStreak: 28,
        avgResponseTime: '1.2h',
        satisfaction: '92%'
      },
      badges: ['Safety Champion', 'Team Leader'],
      emergencyContact: {
        name: 'Lisa Wilson',
        relationship: 'Spouse',
        phone: '+1 (555) 345-6790'
      }
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@accucount.com',
      role: 'User',
      department: 'Inventory',
      position: 'Senior Inventory Specialist',
      status: 'active',
      lastActive: '2024-03-15T10:15:00Z',
      joined: '2021-02-05T11:20:00Z',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      avatar: '/avatars/04.png',
      manager: 'Mike Wilson',
      employeeId: 'EMP-004',
      permissions: ['inventory.view', 'stock.adjust', 'reports.view', 'scan.items'],
      groups: ['Inventory Team', 'RFID Users'],
      projects: ['Stock Optimization', 'Cycle Counting', 'RFID Implementation'],
      skills: ['Inventory Management', 'Data Analysis', 'RFID Systems', 'Excel'],
      languages: ['English', 'Mandarin'],
      timezone: 'PST (UTC-8)',
      lastLoginIP: '192.168.4.100',
      loginHistory: [
        { date: '2024-03-15T10:15:00Z', ip: '192.168.4.100', device: 'Chrome / Mac', location: 'Seattle' },
        { date: '2024-03-14T14:30:00Z', ip: '192.168.4.100', device: 'Chrome / Mac', location: 'Seattle' }
      ],
      metrics: {
        projectsCompleted: 8,
        tasksCompleted: 76,
        loginStreak: 15,
        avgResponseTime: '0.8h',
        satisfaction: '96%'
      },
      badges: ['RFID Expert', 'Top Contributor'],
      emergencyContact: {
        name: 'David Chen',
        relationship: 'Spouse',
        phone: '+1 (555) 456-7891'
      }
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@accucount.com',
      role: 'User',
      department: 'Finance',
      position: 'Financial Analyst',
      status: 'inactive',
      lastActive: '2024-03-10T11:30:00Z',
      joined: '2021-08-15T13:30:00Z',
      phone: '+1 (555) 567-8901',
      location: 'Boston, MA',
      avatar: '/avatars/05.png',
      manager: 'Sarah Johnson',
      employeeId: 'EMP-005',
      permissions: ['finance.view', 'reports.create'],
      groups: ['Finance Team'],
      projects: ['Budget Planning', 'Cost Analysis', 'Quarterly Reports'],
      skills: ['Financial Analysis', 'Excel', 'Reporting', 'Budgeting'],
      languages: ['English'],
      timezone: 'EST (UTC-5)',
      lastLoginIP: '192.168.5.100',
      loginHistory: [
        { date: '2024-03-10T11:30:00Z', ip: '192.168.5.100', device: 'Chrome / Windows', location: 'Boston' }
      ],
      metrics: {
        projectsCompleted: 6,
        tasksCompleted: 45,
        loginStreak: 0,
        avgResponseTime: '3.5h',
        satisfaction: '88%'
      },
      badges: ['Finance Expert'],
      emergencyContact: {
        name: 'Emma Brown',
        relationship: 'Spouse',
        phone: '+1 (555) 567-8902'
      }
    },
    {
      id: 6,
      name: 'Lisa Taylor',
      email: 'lisa.taylor@accucount.com',
      role: 'User',
      department: 'Quality',
      position: 'Quality Assurance Specialist',
      status: 'pending',
      lastActive: '2024-03-14T09:45:00Z',
      joined: '2022-01-20T09:45:00Z',
      phone: '+1 (555) 678-9012',
      location: 'Denver, CO',
      avatar: '/avatars/06.png',
      manager: 'Mike Wilson',
      employeeId: 'EMP-006',
      permissions: ['quality.view', 'inspection.create'],
      groups: ['Quality Team'],
      projects: ['Quality Metrics', 'Process Improvement', 'Audit Prep'],
      skills: ['Quality Control', 'Testing', 'Documentation', 'ISO Standards'],
      languages: ['English'],
      timezone: 'MST (UTC-7)',
      lastLoginIP: '192.168.6.100',
      loginHistory: [
        { date: '2024-03-14T09:45:00Z', ip: '192.168.6.100', device: 'Chrome / Windows', location: 'Denver' }
      ],
      metrics: {
        projectsCompleted: 4,
        tasksCompleted: 32,
        loginStreak: 5,
        avgResponseTime: '1.5h',
        satisfaction: '94%'
      },
      badges: ['Quality Focus'],
      emergencyContact: {
        name: 'James Taylor',
        relationship: 'Spouse',
        phone: '+1 (555) 678-9013'
      }
    },
    {
      id: 7,
      name: 'Tom Anderson',
      email: 'tom.anderson@accucount.com',
      role: 'Admin',
      department: 'IT',
      position: 'IT Systems Administrator',
      status: 'active',
      lastActive: '2024-03-15T08:30:00Z',
      joined: '2020-11-01T10:00:00Z',
      phone: '+1 (555) 789-0123',
      location: 'Austin, TX',
      avatar: '/avatars/07.png',
      manager: 'John Smith',
      employeeId: 'EMP-007',
      permissions: ['system.admin', 'users.manage', 'security.manage', 'audit.view'],
      groups: ['IT Team', 'Security Team', 'Infrastructure'],
      projects: ['System Upgrade', 'Security Audit', 'Cloud Migration'],
      skills: ['System Administration', 'Network Security', 'Cloud Services', 'DevOps'],
      languages: ['English'],
      timezone: 'CST (UTC-6)',
      lastLoginIP: '192.168.7.100',
      loginHistory: [
        { date: '2024-03-15T08:30:00Z', ip: '192.168.7.100', device: 'Chrome / Windows', location: 'Austin' },
        { date: '2024-03-14T22:15:00Z', ip: '192.168.7.100', device: 'Chrome / Windows', location: 'Austin' }
      ],
      metrics: {
        projectsCompleted: 15,
        tasksCompleted: 112,
        loginStreak: 60,
        avgResponseTime: '0.5h',
        satisfaction: '99%'
      },
      badges: ['Tech Guru', 'Security Expert', '5 Year Club'],
      emergencyContact: {
        name: 'Sarah Anderson',
        relationship: 'Spouse',
        phone: '+1 (555) 789-0124'
      }
    },
    {
      id: 8,
      name: 'Rachel Green',
      email: 'rachel.green@accucount.com',
      role: 'Manager',
      department: 'HR',
      position: 'Human Resources Manager',
      status: 'active',
      lastActive: '2024-03-14T15:45:00Z',
      joined: '2021-04-12T15:30:00Z',
      phone: '+1 (555) 890-1234',
      location: 'Portland, OR',
      avatar: '/avatars/08.png',
      manager: 'Sarah Johnson',
      employeeId: 'EMP-008',
      permissions: ['hr.view', 'recruitment.manage', 'employee.manage', 'benefits.admin'],
      groups: ['HR Team', 'Managers', 'Culture Committee'],
      projects: ['Recruitment Drive', 'Employee Engagement', 'Benefits Review'],
      skills: ['HR Management', 'Recruitment', 'Employee Relations', 'Benefits Admin'],
      languages: ['English', 'French'],
      timezone: 'PST (UTC-8)',
      lastLoginIP: '192.168.8.100',
      loginHistory: [
        { date: '2024-03-14T15:45:00Z', ip: '192.168.8.100', device: 'Chrome / Windows', location: 'Portland' }
      ],
      metrics: {
        projectsCompleted: 9,
        tasksCompleted: 67,
        loginStreak: 22,
        avgResponseTime: '2.1h',
        satisfaction: '93%'
      },
      badges: ['HR Expert', 'Culture Champion'],
      emergencyContact: {
        name: 'Ross Green',
        relationship: 'Spouse',
        phone: '+1 (555) 890-1235'
      }
    },
    {
      id: 9,
      name: 'James Wilson',
      email: 'james.wilson@accucount.com',
      role: 'User',
      department: 'Sales',
      position: 'Sales Representative',
      status: 'active',
      lastActive: '2024-03-15T11:20:00Z',
      joined: '2022-08-10T09:00:00Z',
      phone: '+1 (555) 901-2345',
      location: 'Los Angeles, CA',
      avatar: '/avatars/09.png',
      manager: 'Sarah Johnson',
      employeeId: 'EMP-009',
      permissions: ['sales.view', 'leads.manage', 'reports.view'],
      groups: ['Sales Team', 'West Region'],
      projects: ['Q2 Sales Goals', 'Client Acquisition'],
      skills: ['Sales', 'Negotiation', 'CRM', 'Communication'],
      languages: ['English', 'Spanish'],
      timezone: 'PST (UTC-8)',
      lastLoginIP: '192.168.9.100',
      loginHistory: [
        { date: '2024-03-15T11:20:00Z', ip: '192.168.9.100', device: 'Chrome / Mac', location: 'Los Angeles' }
      ],
      metrics: {
        projectsCompleted: 3,
        tasksCompleted: 28,
        loginStreak: 12,
        avgResponseTime: '1.1h',
        satisfaction: '91%'
      },
      badges: ['Rising Star'],
      emergencyContact: {
        name: 'Linda Wilson',
        relationship: 'Spouse',
        phone: '+1 (555) 901-2346'
      }
    },
    {
      id: 10,
      name: 'Patricia Lee',
      email: 'patricia.lee@accucount.com',
      role: 'User',
      department: 'Marketing',
      position: 'Marketing Specialist',
      status: 'pending',
      lastActive: '2024-03-14T13:10:00Z',
      joined: '2023-01-15T10:30:00Z',
      phone: '+1 (555) 012-3456',
      location: 'San Diego, CA',
      avatar: '/avatars/10.png',
      manager: 'Sarah Johnson',
      employeeId: 'EMP-010',
      permissions: ['marketing.view', 'campaigns.manage'],
      groups: ['Marketing Team'],
      projects: ['Summer Campaign', 'Brand Refresh'],
      skills: ['Marketing', 'Social Media', 'Content Creation', 'Analytics'],
      languages: ['English', 'Korean'],
      timezone: 'PST (UTC-8)',
      lastLoginIP: '192.168.10.100',
      loginHistory: [
        { date: '2024-03-14T13:10:00Z', ip: '192.168.10.100', device: 'Chrome / Windows', location: 'San Diego' }
      ],
      metrics: {
        projectsCompleted: 2,
        tasksCompleted: 18,
        loginStreak: 8,
        avgResponseTime: '2.3h',
        satisfaction: '89%'
      },
      badges: [],
      emergencyContact: {
        name: 'Kevin Lee',
        relationship: 'Spouse',
        phone: '+1 (555) 012-3457'
      }
    }
  ];

  // Roles data
  const roles = [
    { id: 'all', name: 'All Roles', count: users.length },
    { id: 'super-admin', name: 'Super Admin', count: users.filter(u => u.role === 'Super Admin').length },
    { id: 'admin', name: 'Admin', count: users.filter(u => u.role === 'Admin').length },
    { id: 'manager', name: 'Manager', count: users.filter(u => u.role === 'Manager').length },
    { id: 'user', name: 'User', count: users.filter(u => u.role === 'User').length }
  ];

  // Departments data
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'executive', name: 'Executive' },
    { id: 'operations', name: 'Operations' },
    { id: 'warehouse', name: 'Warehouse' },
    { id: 'inventory', name: 'Inventory' },
    { id: 'finance', name: 'Finance' },
    { id: 'quality', name: 'Quality' },
    { id: 'it', name: 'IT' },
    { id: 'hr', name: 'HR' },
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' }
  ];

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active', color: 'green' },
    { id: 'inactive', name: 'Inactive', color: 'gray' },
    { id: 'pending', name: 'Pending', color: 'yellow' }
  ];

  const getRoleBadge = (role) => {
    switch(role) {
      case 'Super Admin':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-2 py-0.5 text-xs">Super Admin</Badge>;
      case 'Admin':
        return <Badge className="bg-red-100 text-red-700 border-red-200 px-2 py-0.5 text-xs">Admin</Badge>;
      case 'Manager':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-2 py-0.5 text-xs">Manager</Badge>;
      case 'User':
        return <Badge className="bg-green-100 text-green-700 border-green-200 px-2 py-0.5 text-xs">User</Badge>;
      default:
        return <Badge variant="outline" className="text-xs px-2 py-0.5">{role}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-200 px-2 py-0.5 text-xs">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 px-2 py-0.5 text-xs">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 px-2 py-0.5 text-xs">Pending</Badge>;
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

  const filteredUsers = users.filter(user => {
    if (selectedRole !== 'all') {
      const roleMap = {
        'super-admin': 'Super Admin',
        'admin': 'Admin',
        'manager': 'Manager',
        'user': 'User'
      };
      if (user.role !== roleMap[selectedRole]) return false;
    }
    if (selectedDepartment !== 'all' && user.department.toLowerCase() !== selectedDepartment) return false;
    if (selectedStatus !== 'all' && user.status !== selectedStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return user.name.toLowerCase().includes(query) ||
             user.email.toLowerCase().includes(query) ||
             user.position.toLowerCase().includes(query) ||
             user.employeeId.toLowerCase().includes(query) ||
             user.department.toLowerCase().includes(query);
    }
    return true;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    online: users.filter(u => {
      const lastActive = new Date(u.lastActive);
      const now = new Date();
      const diffHours = Math.abs(now - lastActive) / (1000 * 60 * 60);
      return diffHours < 1;
    }).length
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(u => u !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage system users, roles, and permissions</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[150px] border-gray-200 bg-white h-9">
                <SelectValue placeholder="User Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name} ({role.count})
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
              <UserPlus size={16} />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Users</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Users size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Active</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.active}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <UserCheck size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Online Now</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.online}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Activity size={18} className="text-blue-600" />
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
                  <p className="text-xs text-gray-500">Departments</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">11</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Briefcase size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {roles.filter(r => r.id !== 'all').map(role => {
          const color = 
            role.id === 'super-admin' ? 'purple' :
            role.id === 'admin' ? 'red' :
            role.id === 'manager' ? 'blue' : 'green';
          const percentage = (role.count / stats.total * 100).toFixed(0);
          
          return (
            <Card key={role.id} className="border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${color}-600`}></div>
                    <span className="text-sm font-medium">{role.name}</span>
                  </div>
                  <span className="text-sm font-bold">{role.count}</span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-1.5 bg-gray-100" 
                  style={{ '--progress-background': `var(--${color}-600)` }}
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
              placeholder="Search by name, email, department..."
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

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[150px] border-gray-200 h-9">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
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
      {selectedUsers.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white px-2 py-0.5">{selectedUsers.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedUsers([])} className="h-7 text-xs">
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <UserCheck size={14} className="mr-2" />
              Activate
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <UserX size={14} className="mr-2" />
              Deactivate
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Edit size={14} className="mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Users Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredUsers.map((user) => {
            const roleColor = 
              user.role === 'Super Admin' ? 'purple' :
              user.role === 'Admin' ? 'red' :
              user.role === 'Manager' ? 'blue' : 'green';
            
            const lastActive = new Date(user.lastActive);
            const now = new Date();
            const diffHours = Math.abs(now - lastActive) / (1000 * 60 * 60);
            const isOnline = diffHours < 1;
            
            return (
              <ContextMenu key={user.id}>
                <ContextMenuTrigger>
                  <Card 
                    className="border-gray-200 hover:shadow-lg transition-all group cursor-pointer"
                    onClick={() => {
                      setSelectedUser(user);
                      setViewDetailsDialogOpen(true);
                    }}
                  >
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className={`p-4 border-b border-gray-200 bg-gradient-to-r from-${roleColor}-50 to-transparent`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12 border-2 border-white">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className={`bg-${roleColor}-100 text-${roleColor}-600 text-sm`}>
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {isOnline && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getRoleBadge(user.role)}
                                {getStatusBadge(user.status)}
                              </div>
                              <h3 className="font-semibold text-gray-900 text-base">{user.name}</h3>
                              <p className="text-sm text-gray-500">{user.position}</p>
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
                                setSelectedUser(user);
                                setViewDetailsDialogOpen(true);
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser(user);
                                setEditDialogOpen(true);
                              }}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser(user);
                                setPermissionsDialogOpen(true);
                              }}>
                                <Shield className="mr-2 h-4 w-4" />
                                Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser(user);
                                setResetPasswordDialogOpen(true);
                              }}>
                                <Key className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedUser(user);
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
                          {/* Email and Phone */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail size={14} className="text-gray-400" />
                              <span className="text-gray-700 truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone size={14} className="text-gray-400" />
                              <span className="text-gray-700">{user.phone}</span>
                            </div>
                          </div>

                          {/* Department and Location */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <Briefcase size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-700 truncate">{user.department}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-700 truncate">{user.location}</span>
                            </div>
                          </div>

                          {/* Employee ID and Manager */}
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                              ID: {user.employeeId}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">Manager:</span>
                              <span className="text-xs font-medium">{user.manager}</span>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-1">
                            {user.skills.slice(0, 3).map(skill => (
                              <Badge key={skill} variant="outline" className="text-xs px-1.5 py-0.5 border-gray-200">
                                {skill}
                              </Badge>
                            ))}
                            {user.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-gray-200">
                                +{user.skills.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-3 gap-1 pt-2">
                            <div className="text-center">
                              <p className="text-sm font-bold">{user.metrics.projectsCompleted}</p>
                              <p className="text-xs text-gray-500">Projects</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold">{user.metrics.tasksCompleted}</p>
                              <p className="text-xs text-gray-500">Tasks</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold">{user.metrics.loginStreak}</p>
                              <p className="text-xs text-gray-500">Streak</p>
                            </div>
                          </div>

                          {/* Badges */}
                          {user.badges.length > 0 && (
                            <div className="flex items-center gap-1 pt-1">
                              <Award size={12} className="text-yellow-600" />
                              <span className="text-xs text-gray-500 truncate">
                                {user.badges.join(' • ')}
                              </span>
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>Last active {formatDate(user.lastActive)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>Joined {new Date(user.joined).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem onClick={() => {
                    setSelectedUser(user);
                    setViewDetailsDialogOpen(true);
                  }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <History className="mr-2 h-4 w-4" />
                    View Activity Log
                  </ContextMenuItem>
                  <ContextMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Force Logout
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
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">User</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Role</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Department</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Position</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Status</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Last Active</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Employee ID</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Manager</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const lastActive = new Date(user.lastActive);
                  const now = new Date();
                  const diffHours = Math.abs(now - lastActive) / (1000 * 60 * 60);
                  const isOnline = diffHours < 1;
                  
                  return (
                    <TableRow 
                      key={user.id} 
                      className="border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedUser(user);
                        setViewDetailsDialogOpen(true);
                      }}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleSelectUser(user.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {isOnline && (
                              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell className="text-sm">{user.department}</TableCell>
                      <TableCell className="text-sm">{user.position}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-sm">{formatDate(user.lastActive)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-mono">{user.employeeId}</TableCell>
                      <TableCell className="text-sm">{user.manager}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedUser(user);
                              setViewDetailsDialogOpen(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedUser(user);
                              setEditDialogOpen(true);
                            }}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => {
                                setSelectedUser(user);
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
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
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
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className="bg-red-100 text-red-600 text-sm">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-lg font-semibold">{selectedUser.name}</span>
                    <DialogDescription className="text-sm">
                      {selectedUser.position} • {selectedUser.employeeId}
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid grid-cols-5 bg-gray-100">
                  <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
                  <TabsTrigger value="permissions" className="text-sm">Permissions</TabsTrigger>
                  <TabsTrigger value="activity" className="text-sm">Activity</TabsTrigger>
                  <TabsTrigger value="metrics" className="text-sm">Metrics</TabsTrigger>
                  <TabsTrigger value="contact" className="text-sm">Emergency</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm flex items-center gap-1">
                        <Mail size={14} className="text-gray-400" />
                        {selectedUser.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm flex items-center gap-1">
                        <Phone size={14} className="text-gray-400" />
                        {selectedUser.phone}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="text-sm flex items-center gap-1">
                        <Briefcase size={14} className="text-gray-400" />
                        {selectedUser.department}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Manager</p>
                      <p className="text-sm flex items-center gap-1">
                        <User size={14} className="text-gray-400" />
                        {selectedUser.manager}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm flex items-center gap-1">
                      <MapPin size={14} className="text-gray-400" />
                      {selectedUser.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Timezone</p>
                      <p className="text-sm">{selectedUser.timezone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Languages</p>
                      <p className="text-sm">{selectedUser.languages.join(', ')}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedUser.skills.map(skill => (
                        <Badge key={skill} variant="outline" className="border-gray-200 text-xs px-2 py-0.5">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Joined Date</p>
                      <p className="text-sm flex items-center gap-1">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(selectedUser.joined).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Last Active</p>
                      <p className="text-sm flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        {formatDate(selectedUser.lastActive)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Badges</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedUser.badges.map(badge => (
                        <Badge key={badge} className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs px-2 py-0.5">
                          <Award size={10} className="mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="permissions" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Role</p>
                    <div>{getRoleBadge(selectedUser.role)}</div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Permission Groups</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedUser.groups.map(group => (
                        <Badge key={group} className="bg-purple-50 text-purple-700 border-purple-200 text-xs px-2 py-0.5">
                          <Users size={10} className="mr-1" />
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Granted Permissions</p>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {selectedUser.permissions.map(perm => (
                        <div key={perm} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <CheckCircle size={14} className="text-green-600" />
                          <span className="text-sm">{perm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Current Session</p>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Active</span>
                        <span className="text-sm text-gray-500">IP: {selectedUser.lastLoginIP}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Login History</p>
                    <ScrollArea className="h-48">
                      <div className="space-y-2">
                        {selectedUser.loginHistory.map((login, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <LogIn size={12} className="text-green-600" />
                              <div>
                                <p className="text-sm font-medium">{login.device}</p>
                                <p className="text-xs text-gray-500">IP: {login.ip} • {login.location}</p>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">{formatDate(login.date)}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <p className="text-xs text-gray-500">Projects Completed</p>
                        <p className="text-xl font-bold text-gray-900">{selectedUser.metrics.projectsCompleted}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <p className="text-xs text-gray-500">Tasks Completed</p>
                        <p className="text-xl font-bold text-gray-900">{selectedUser.metrics.tasksCompleted}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <p className="text-xs text-gray-500">Login Streak</p>
                        <p className="text-xl font-bold text-green-600">{selectedUser.metrics.loginStreak} days</p>
                      </CardContent>
                    </Card>
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <p className="text-xs text-gray-500">Avg Response Time</p>
                        <p className="text-xl font-bold text-blue-600">{selectedUser.metrics.avgResponseTime}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-500">Satisfaction Rating</p>
                      <p className="text-xl font-bold text-purple-600">{selectedUser.metrics.satisfaction}</p>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Current Projects</p>
                    <div className="space-y-1">
                      {selectedUser.projects.map(project => (
                        <div key={project} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Target size={12} className="text-red-600" />
                          <span className="text-sm">{project}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4 mt-4">
                  {selectedUser.emergencyContact && (
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-red-50 rounded-full">
                            <Heart size={16} className="text-red-600" />
                          </div>
                          <p className="text-sm font-medium">Emergency Contact</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Name</span>
                            <span className="text-sm">{selectedUser.emergencyContact.name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Relationship</span>
                            <span className="text-sm">{selectedUser.emergencyContact.relationship}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Phone</span>
                            <span className="text-sm">{selectedUser.emergencyContact.phone}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
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
                  Edit User
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create User Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Create New User</DialogTitle>
            <DialogDescription className="text-sm">
              Add a new user to the system
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4 bg-gray-100">
                <TabsTrigger value="basic" className="text-sm">Basic Info</TabsTrigger>
                <TabsTrigger value="contact" className="text-sm">Contact</TabsTrigger>
                <TabsTrigger value="account" className="text-sm">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">First Name</Label>
                    <Input placeholder="John" className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Last Name</Label>
                    <Input placeholder="Smith" className="h-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Email</Label>
                  <Input type="email" placeholder="john.smith@accucount.com" className="h-9" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Role</Label>
                    <Select>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">User</SelectItem>
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
                        {departments.filter(d => d.id !== 'all').map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Position</Label>
                  <Input placeholder="e.g., Software Engineer" className="h-9" />
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Phone</Label>
                  <Input placeholder="+1 (555) 123-4567" className="h-9" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Location</Label>
                  <Input placeholder="City, State" className="h-9" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Address</Label>
                  <Input placeholder="Street address" className="h-9" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="City" className="h-9" />
                  <Input placeholder="State" className="h-9" />
                  <Input placeholder="ZIP Code" className="h-9 col-span-2" />
                </div>
              </TabsContent>

              <TabsContent value="account" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Employee ID</Label>
                  <Input placeholder="EMP-001" className="h-9" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Manager</Label>
                  <Select>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-smith">John Smith</SelectItem>
                      <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pending" id="create-pending" />
                      <Label htmlFor="create-pending" className="text-sm">Pending</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Send welcome email</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="welcomeEmail" defaultChecked />
                    <Label htmlFor="welcomeEmail" className="text-sm">Send account setup instructions</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Edit User</DialogTitle>
            <DialogDescription className="text-sm">
              Update user information and settings
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-4">
              <Tabs defaultValue="basic">
                <TabsList className="grid grid-cols-3 mb-4 bg-gray-100">
                  <TabsTrigger value="basic" className="text-sm">Basic Info</TabsTrigger>
                  <TabsTrigger value="contact" className="text-sm">Contact</TabsTrigger>
                  <TabsTrigger value="account" className="text-sm">Account</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedUser.avatar} />
                      <AvatarFallback className="bg-red-100 text-red-600 text-lg">
                        {selectedUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="h-8">
                      Change Photo
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">First Name</Label>
                      <Input defaultValue={selectedUser.name.split(' ')[0]} className="h-9" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Last Name</Label>
                      <Input defaultValue={selectedUser.name.split(' ')[1]} className="h-9" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Email</Label>
                    <Input defaultValue={selectedUser.email} className="h-9" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Role</Label>
                      <Select defaultValue={selectedUser.role.toLowerCase().replace(' ', '-')}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="super-admin">Super Admin</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Department</Label>
                      <Select defaultValue={selectedUser.department.toLowerCase()}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.filter(d => d.id !== 'all').map(dept => (
                            <SelectItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Position</Label>
                    <Input defaultValue={selectedUser.position} className="h-9" />
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Phone</Label>
                    <Input defaultValue={selectedUser.phone} className="h-9" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Location</Label>
                    <Input defaultValue={selectedUser.location} className="h-9" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Address</Label>
                    <Input defaultValue="123 Main Street" className="h-9" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Input defaultValue="San Francisco" className="h-9" />
                    <Input defaultValue="CA" className="h-9" />
                    <Input defaultValue="94105" className="h-9 col-span-2" />
                  </div>
                </TabsContent>

                <TabsContent value="account" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Employee ID</Label>
                    <Input defaultValue={selectedUser.employeeId} className="h-9" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Manager</Label>
                    <Select defaultValue={selectedUser.manager}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Smith">John Smith</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Status</Label>
                    <RadioGroup defaultValue={selectedUser.status} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="active" id="edit-active" />
                        <Label htmlFor="edit-active" className="text-sm">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inactive" id="edit-inactive" />
                        <Label htmlFor="edit-inactive" className="text-sm">Inactive</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pending" id="edit-pending" />
                        <Label htmlFor="edit-pending" className="text-sm">Pending</Label>
                      </div>
                    </RadioGroup>
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

      {/* Reset Password Dialog */}
      <Dialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Reset Password</DialogTitle>
            <DialogDescription className="text-sm">
              Send password reset instructions to the user
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-red-100 text-red-600 text-sm">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{selectedUser.name}</p>
                  <p className="text-xs text-gray-500">{selectedUser.email}</p>
                </div>
              </div>

              <Alert className="bg-yellow-50 border-yellow-200">
                <Key size={14} className="text-yellow-600" />
                <AlertTitle className="text-xs font-medium text-yellow-700">Password Reset</AlertTitle>
                <AlertDescription className="text-xs text-yellow-600/70">
                  A password reset link will be sent to the user's email. The link will expire in 24 hours.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label className="text-sm">Additional Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="forceLogout" />
                    <Label htmlFor="forceLogout" className="text-sm">Force logout from all devices</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="requireChange" defaultChecked />
                    <Label htmlFor="requireChange" className="text-sm">Require password change on next login</Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setResetPasswordDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Send Reset Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Manage Permissions</DialogTitle>
            <DialogDescription className="text-sm">
              Configure user permissions and access levels
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{selectedUser.name}</p>
                  <p className="text-xs text-gray-500">Current Role: {selectedUser.role}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Role Assignment</Label>
                <Select defaultValue={selectedUser.role.toLowerCase().replace(' ', '-')}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm">Module Access</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dashboard</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Inventory Management</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Warehouse Operations</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reports & Analytics</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Administration</span>
                    <Switch defaultChecked={selectedUser.role === 'Super Admin' || selectedUser.role === 'Admin'} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Settings</span>
                    <Switch defaultChecked={selectedUser.role === 'Super Admin'} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm">Special Permissions</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="exportData" defaultChecked />
                    <Label htmlFor="exportData" className="text-sm">Export Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="importData" defaultChecked={selectedUser.role === 'Super Admin'} />
                    <Label htmlFor="importData" className="text-sm">Import Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="deleteData" defaultChecked={selectedUser.role === 'Super Admin'} />
                    <Label htmlFor="deleteData" className="text-sm">Delete Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="manageUsers" defaultChecked={selectedUser.role === 'Super Admin' || selectedUser.role === 'Admin'} />
                    <Label htmlFor="manageUsers" className="text-sm">Manage Users</Label>
                  </div>
                </div>
              </div>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Delete User</DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-red-200 text-red-700 text-sm">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-red-600">{selectedUser.name}</p>
                  <p className="text-xs text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-1 text-xs text-amber-600">
                <AlertTriangle size={12} className="mt-0.5" />
                <span>This will permanently remove the user and all associated data.</span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)} className="h-9">
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Export Users</DialogTitle>
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
                  <Label htmlFor="include-all" className="text-sm">All users</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-contacts" defaultChecked />
                  <Label htmlFor="include-contacts" className="text-sm">Contact information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-permissions" defaultChecked />
                  <Label htmlFor="include-permissions" className="text-sm">Permissions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-metrics" />
                  <Label htmlFor="include-metrics" className="text-sm">Performance metrics</Label>
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
            <DialogTitle className="text-lg">Import Users</DialogTitle>
            <DialogDescription className="text-sm">
              Upload a file to import users
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
                  <Label htmlFor="update-existing" className="text-sm">Update existing users</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skip-duplicates" defaultChecked />
                  <Label htmlFor="skip-duplicates" className="text-sm">Skip duplicates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="send-notifications" defaultChecked />
                  <Label htmlFor="send-notifications" className="text-sm">Send welcome emails</Label>
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
            <DialogTitle className="text-lg">User Settings</DialogTitle>
            <DialogDescription className="text-sm">
              Configure user management options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="display">
                <AccordionTrigger className="text-sm">Display Settings</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show online status</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show user badges</Label>
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

              <AccordionItem value="notifications">
                <AccordionTrigger className="text-sm">Notifications</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">New user created</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">User status changes</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Password reset requests</Label>
                    <Switch defaultChecked />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security">
                <AccordionTrigger className="text-sm">Security</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Require strong passwords</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Enable 2FA</Label>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Session timeout (minutes)</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
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
                <UserPlus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Add User</TooltipContent>
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
            <TooltipContent side="left" className="text-sm">Export Users</TooltipContent>
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

export default UsersPage;