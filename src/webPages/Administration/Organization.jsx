// app/dashboard/administration/organization/page.js
'use client';

import { useState } from 'react';
import {
  Building2,
  Globe,
  Building,
  Briefcase,
  Users,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  XCircle,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  Settings,
  Home,
  ChevronRight,
  TrendingUp,

  Info,
  Trash as TrashIcon,
  Trash2,
  
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
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const OrganizationPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for organization units
  const organizationUnits = [
    {
      id: 1,
      name: 'ACCUCOUNT Headquarters',
      type: 'headquarters',
      code: 'HQ-001',
      parent: null,
      level: 1,
      employees: 245,
      departments: 12,
      locations: 3,
      status: 'active',
      email: 'hq@accucount.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, Suite 100',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      zipCode: '94105',
      website: 'www.accucount.com',
      founded: '2018',
      taxId: '12-3456789',
      registrationNumber: 'REG-12345',
      logo: '/logos/hq.png',
      createdAt: '2018-01-15T10:30:00Z',
      updatedAt: '2024-03-10T14:20:00Z',
      contacts: [
        { name: 'John Smith', role: 'CEO', email: 'john.smith@accucount.com', phone: '+1 (555) 123-4568' },
        { name: 'Sarah Johnson', role: 'COO', email: 'sarah.j@accucount.com', phone: '+1 (555) 123-4569' }
      ],
      metrics: {
        revenue: '$45.2M',
        growth: '+12.5%',
        satisfaction: '94%',
        retention: '89%'
      }
    },
    {
      id: 2,
      name: 'North America Region',
      type: 'region',
      code: 'NA-001',
      parent: 'HQ-001',
      level: 2,
      employees: 120,
      departments: 8,
      locations: 5,
      status: 'active',
      email: 'na@accucount.com',
      phone: '+1 (555) 234-5678',
      address: '456 Park Avenue',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10022',
      website: 'www.accucount.com/na',
      founded: '2019',
      taxId: '23-4567890',
      registrationNumber: 'REG-23456',
      logo: '/logos/na.png',
      createdAt: '2019-03-20T09:15:00Z',
      updatedAt: '2024-03-12T11:30:00Z',
      contacts: [
        { name: 'Mike Wilson', role: 'Regional Director', email: 'mike.wilson@accucount.com', phone: '+1 (555) 234-5679' }
      ],
      metrics: {
        revenue: '$18.5M',
        growth: '+15.2%',
        satisfaction: '92%',
        retention: '87%'
      }
    },
    {
      id: 3,
      name: 'Europe Region',
      type: 'region',
      code: 'EU-001',
      parent: 'HQ-001',
      level: 2,
      employees: 95,
      departments: 7,
      locations: 4,
      status: 'active',
      email: 'eu@accucount.com',
      phone: '+44 20 1234 5678',
      address: '10 Downing Street',
      city: 'London',
      state: 'England',
      country: 'UK',
      zipCode: 'SW1A 2AA',
      website: 'www.accucount.com/eu',
      founded: '2020',
      taxId: 'GB-34567890',
      registrationNumber: 'REG-34567',
      logo: '/logos/eu.png',
      createdAt: '2020-06-10T14:45:00Z',
      updatedAt: '2024-03-11T16:20:00Z',
      contacts: [
        { name: 'Emma Thompson', role: 'Regional Director', email: 'emma.t@accucount.com', phone: '+44 20 1234 5679' }
      ],
      metrics: {
        revenue: '$12.8M',
        growth: '+18.3%',
        satisfaction: '95%',
        retention: '91%'
      }
    },
    {
      id: 4,
      name: 'Asia Pacific Region',
      type: 'region',
      code: 'AP-001',
      parent: 'HQ-001',
      level: 2,
      employees: 88,
      departments: 6,
      locations: 4,
      status: 'active',
      email: 'ap@accucount.com',
      phone: '+65 6789 0123',
      address: '1 Raffles Place',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore',
      zipCode: '048616',
      website: 'www.accucount.com/ap',
      founded: '2021',
      taxId: 'SG-45678901',
      registrationNumber: 'REG-45678',
      logo: '/logos/ap.png',
      createdAt: '2021-02-05T11:20:00Z',
      updatedAt: '2024-03-13T09:45:00Z',
      contacts: [
        { name: 'James Chen', role: 'Regional Director', email: 'james.chen@accucount.com', phone: '+65 6789 0124' }
      ],
      metrics: {
        revenue: '$9.2M',
        growth: '+22.1%',
        satisfaction: '93%',
        retention: '88%'
      }
    },
    {
      id: 5,
      name: 'San Francisco Office',
      type: 'office',
      code: 'SF-001',
      parent: 'NA-001',
      level: 3,
      employees: 45,
      departments: 5,
      locations: 1,
      status: 'active',
      email: 'sf@accucount.com',
      phone: '+1 (555) 345-6789',
      address: '789 Market Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      zipCode: '94103',
      website: 'www.accucount.com/sf',
      founded: '2019',
      taxId: '56-7890123',
      registrationNumber: 'REG-56789',
      logo: '/logos/sf.png',
      createdAt: '2019-08-15T13:30:00Z',
      updatedAt: '2024-03-14T10:15:00Z',
      contacts: [
        { name: 'Lisa Chen', role: 'Office Manager', email: 'lisa.chen@accucount.com', phone: '+1 (555) 345-6790' }
      ],
      metrics: {
        revenue: '$6.8M',
        growth: '+10.2%',
        satisfaction: '91%',
        retention: '86%'
      }
    },
    {
      id: 6,
      name: 'New York Office',
      type: 'office',
      code: 'NY-001',
      parent: 'NA-001',
      level: 3,
      employees: 52,
      departments: 6,
      locations: 1,
      status: 'active',
      email: 'ny@accucount.com',
      phone: '+1 (555) 456-7890',
      address: '321 Broadway',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10007',
      website: 'www.accucount.com/ny',
      founded: '2019',
      taxId: '67-8901234',
      registrationNumber: 'REG-67890',
      logo: '/logos/ny.png',
      createdAt: '2019-09-20T10:45:00Z',
      updatedAt: '2024-03-12T14:30:00Z',
      contacts: [
        { name: 'David Brown', role: 'Office Manager', email: 'david.brown@accucount.com', phone: '+1 (555) 456-7891' }
      ],
      metrics: {
        revenue: '$7.2M',
        growth: '+12.8%',
        satisfaction: '93%',
        retention: '89%'
      }
    },
    {
      id: 7,
      name: 'London Office',
      type: 'office',
      code: 'LD-001',
      parent: 'EU-001',
      level: 3,
      employees: 48,
      departments: 5,
      locations: 1,
      status: 'active',
      email: 'london@accucount.com',
      phone: '+44 20 2345 6789',
      address: '221B Baker Street',
      city: 'London',
      state: 'England',
      country: 'UK',
      zipCode: 'NW1 6XE',
      website: 'www.accucount.com/london',
      founded: '2020',
      taxId: 'GB-78901234',
      registrationNumber: 'REG-78901',
      logo: '/logos/london.png',
      createdAt: '2020-07-01T15:20:00Z',
      updatedAt: '2024-03-13T11:45:00Z',
      contacts: [
        { name: 'Sarah Wilson', role: 'Office Manager', email: 'sarah.wilson@accucount.com', phone: '+44 20 2345 6790' }
      ],
      metrics: {
        revenue: '$6.5M',
        growth: '+14.5%',
        satisfaction: '94%',
        retention: '90%'
      }
    },
    {
      id: 8,
      name: 'Singapore Office',
      type: 'office',
      code: 'SG-001',
      parent: 'AP-001',
      level: 3,
      employees: 42,
      departments: 4,
      locations: 1,
      status: 'active',
      email: 'singapore@accucount.com',
      phone: '+65 7890 1234',
      address: '2 Shenton Way',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore',
      zipCode: '068804',
      website: 'www.accucount.com/singapore',
      founded: '2021',
      taxId: 'SG-89012345',
      registrationNumber: 'REG-89012',
      logo: '/logos/singapore.png',
      createdAt: '2021-03-10T09:30:00Z',
      updatedAt: '2024-03-14T15:20:00Z',
      contacts: [
        { name: 'Wong Li Ming', role: 'Office Manager', email: 'liming.wong@accucount.com', phone: '+65 7890 1235' }
      ],
      metrics: {
        revenue: '$5.1M',
        growth: '+16.8%',
        satisfaction: '92%',
        retention: '87%'
      }
    },
    {
      id: 9,
      name: 'Tokyo Office',
      type: 'office',
      code: 'TK-001',
      parent: 'AP-001',
      level: 3,
      employees: 15,
      departments: 3,
      locations: 1,
      status: 'pending',
      email: 'tokyo@accucount.com',
      phone: '+81 3 1234 5678',
      address: '1-2-3 Marunouchi',
      city: 'Tokyo',
      state: 'Tokyo',
      country: 'Japan',
      zipCode: '100-0005',
      website: 'www.accucount.com/tokyo',
      founded: '2024',
      taxId: 'JP-12345678',
      registrationNumber: 'REG-90123',
      logo: '/logos/tokyo.png',
      createdAt: '2024-02-20T11:30:00Z',
      updatedAt: '2024-03-15T09:20:00Z',
      contacts: [
        { name: 'Yuki Tanaka', role: 'Office Manager', email: 'yuki.tanaka@accucount.com', phone: '+81 3 1234 5679' }
      ],
      metrics: {
        revenue: '$1.2M',
        growth: '+45.2%',
        satisfaction: '88%',
        retention: '95%'
      }
    }
  ];

  // Department data
  const departments = [
    { id: 1, name: 'Executive', employees: 8, head: 'John Smith', office: 'Headquarters' },
    { id: 2, name: 'Operations', employees: 45, head: 'Sarah Johnson', office: 'Headquarters' },
    { id: 3, name: 'Engineering', employees: 78, head: 'Mike Chen', office: 'San Francisco' },
    { id: 4, name: 'Sales', employees: 52, head: 'Lisa Wong', office: 'New York' },
    { id: 5, name: 'Marketing', employees: 34, head: 'Emma Thompson', office: 'London' },
    { id: 6, name: 'Customer Support', employees: 28, head: 'James Wilson', office: 'Singapore' },
    { id: 7, name: 'Finance', employees: 18, head: 'David Brown', office: 'Headquarters' },
    { id: 8, name: 'HR', employees: 15, head: 'Rachel Green', office: 'Headquarters' }
  ];

  // Locations data
  const locations = [
    { id: 1, name: 'San Francisco', type: 'office', units: 1, employees: 45 },
    { id: 2, name: 'New York', type: 'office', units: 1, employees: 52 },
    { id: 3, name: 'London', type: 'office', units: 1, employees: 48 },
    { id: 4, name: 'Singapore', type: 'office', units: 1, employees: 42 },
    { id: 5, name: 'Tokyo', type: 'office', units: 1, employees: 15 },
    { id: 6, name: 'Sydney', type: 'remote', units: 1, employees: 12 },
    { id: 7, name: 'Berlin', type: 'remote', units: 1, employees: 10 },
    { id: 8, name: 'Paris', type: 'remote', units: 1, employees: 8 }
  ];

  // Unit types
  const unitTypes = [
    { id: 'all', name: 'All Types', icon: Building2 },
    { id: 'headquarters', name: 'Headquarters', icon: Building2, color: 'red' },
    { id: 'region', name: 'Region', icon: Globe, color: 'blue' },
    { id: 'office', name: 'Office', icon: Building, color: 'green' },
    { id: 'department', name: 'Department', icon: Briefcase, color: 'purple' }
  ];

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active', color: 'green' },
    { id: 'inactive', name: 'Inactive', color: 'gray' },
    { id: 'pending', name: 'Pending', color: 'yellow' }
  ];

  const getUnitIcon = (type) => {
    switch(type) {
      case 'headquarters':
        return Building2;
      case 'region':
        return Globe;
      case 'office':
        return Building;
      case 'department':
        return Briefcase;
      default:
        return Building2;
    }
  };

  const getUnitColor = (type) => {
    switch(type) {
      case 'headquarters':
        return 'red';
      case 'region':
        return 'blue';
      case 'office':
        return 'green';
      case 'department':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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

  const filteredUnits = organizationUnits.filter(unit => {
    if (selectedDepartment !== 'all' && unit.type !== selectedDepartment) return false;
    if (selectedLocation !== 'all' && unit.city !== selectedLocation) return false;
    if (selectedStatus !== 'all' && unit.status !== selectedStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return unit.name.toLowerCase().includes(query) ||
             unit.code.toLowerCase().includes(query) ||
             unit.city.toLowerCase().includes(query) ||
             unit.country.toLowerCase().includes(query) ||
             unit.email.toLowerCase().includes(query);
    }
    return true;
  });

  const stats = {
    total: organizationUnits.length,
    active: organizationUnits.filter(u => u.status === 'active').length,
    pending: organizationUnits.filter(u => u.status === 'pending').length,
    totalEmployees: organizationUnits.reduce((sum, u) => sum + u.employees, 0),
    totalDepartments: organizationUnits.reduce((sum, u) => sum + u.departments, 0),
    totalLocations: organizationUnits.reduce((sum, u) => sum + u.locations, 0)
  };

  const handleSelectAll = () => {
    if (selectedUnits.length === filteredUnits.length) {
      setSelectedUnits([]);
    } else {
      setSelectedUnits(filteredUnits.map(u => u.id));
    }
  };

  const handleSelectUnit = (id) => {
    if (selectedUnits.includes(id)) {
      setSelectedUnits(selectedUnits.filter(u => u !== id));
    } else {
      setSelectedUnits([...selectedUnits, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
    
            <h1 className="text-2xl font-bold text-black">Organization Structure</h1>
            <p className="text-black/50 mt-1">Manage your organizational units, departments, and locations</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[150px] border-[#F5EEE9]">
                <SelectValue placeholder="Unit Type" />
              </SelectTrigger>
              <SelectContent>
                {unitTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#F5EEE9]">
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
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setImportDialogOpen(true)}
            >
              <Upload size={16} />
              Import
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setCreateDialogOpen(true)}
            >
              <Plus size={16} />
              Add Unit
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Units</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Building2 size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Units</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.active}</p>
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
                  <p className="text-xs text-black/50">Pending</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Clock size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Employees</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.totalEmployees}</p>
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
                  <p className="text-xs text-black/50">Departments</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.totalDepartments}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Briefcase size={18} className="text-purple-600" />
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
              placeholder="Search by name, code, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(status => (
                <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
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

      {/* Bulk Actions Bar */}
      {selectedUnits.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedUnits.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedUnits([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <CheckCircle size={14} className="mr-2" />
              Activate
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Edit size={14} className="mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Organization Chart View (only in grid mode) */}
      {viewMode === 'grid' && (
        <div className="mb-6">
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black flex items-center gap-2">
                <Building2 size={16} className="text-red-600" />
                Organization Hierarchy
              </CardTitle>
              <CardDescription className="text-xs text-black/50">
                Visual representation of your organization structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative p-4 bg-gradient-to-b from-[#F5EEE9]/30 to-transparent rounded-lg min-h-[200px]">
                <div className="flex flex-col items-center">
                  {/* Headquarters */}
                  <div className="relative mb-8">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200 shadow-sm">
                      <div className="p-2 bg-red-600 text-white rounded-lg">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-sm">ACCUCOUNT Headquarters</h3>
                        <p className="text-xs text-black/50">San Francisco • 245 employees</p>
                      </div>
                      <Badge className="ml-2 bg-red-100 text-red-700 border-red-200 text-[10px]">Level 1</Badge>
                    </div>
                    
                    {/* Connector line */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-px h-6 bg-gradient-to-b from-red-200 to-transparent"></div>
                    </div>
                  </div>

                  {/* Regions */}
                  <div className="grid grid-cols-3 gap-6 w-full mb-8">
                    {organizationUnits.filter(u => u.type === 'region').map((region, idx) => (
                      <div key={region.id} className="relative">
                        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
                          <div className="p-1.5 bg-blue-600 text-white rounded">
                            <Globe size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-black text-xs truncate">{region.name}</p>
                            <p className="text-[10px] text-black/50">{region.employees} emp</p>
                          </div>
                        </div>

                        {/* Connector to offices */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                          <div className="w-px h-4 bg-gradient-to-b from-blue-200 to-transparent"></div>
                        </div>

                        {/* Offices under region */}
                        <div className="mt-4 space-y-2">
                          {organizationUnits.filter(u => u.parent === region.code).map(office => (
                            <div key={office.id} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200 shadow-sm">
                              <div className="p-1 bg-green-600 text-white rounded">
                                <Building size={12} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-black text-[10px] truncate">{office.name}</p>
                                <p className="text-[8px] text-black/50">{office.employees} emp</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 text-[10px] text-black/50">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-600"></div>
                      <span>Headquarters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <span>Regions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      <span>Offices</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Unit Type Distribution (only in grid mode) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {unitTypes.filter(t => t.id !== 'all').map(type => {
            const count = organizationUnits.filter(u => u.type === type.id).length;
            const percentage = (count / stats.total * 100).toFixed(0);
            
            return (
              <Card key={type.id} className="border-[#F5EEE9]">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${type.color}-600`}></div>
                      <span className="text-xs">{type.name}</span>
                    </div>
                    <span className="text-xs font-bold">{count}</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-1 bg-[#F5EEE9]" 
                    style={{ '--progress-background': `var(--${type.color}-600)` }}
                  />
                  <p className="text-[10px] text-black/50 mt-1">{percentage}% of total</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Organization Units Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredUnits.map((unit) => {
            const UnitIcon = getUnitIcon(unit.type);
            const color = getUnitColor(unit.type);
            
            return (
              <ContextMenu key={unit.id}>
                <ContextMenuTrigger>
                  <Card 
                    className="border-[#F5EEE9] hover:shadow-lg transition-all group cursor-pointer"
                    onClick={() => {
                      setSelectedUnit(unit);
                      setViewDetailsDialogOpen(true);
                    }}
                  >
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className={`p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-${color}-50 to-transparent`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-${color}-600 text-white rounded-lg`}>
                              <UnitIcon size={18} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={cn(
                                  "text-xs border-0",
                                  unit.type === 'headquarters' ? "bg-red-100 text-red-700" :
                                  unit.type === 'region' ? "bg-blue-100 text-blue-700" :
                                  unit.type === 'office' ? "bg-green-100 text-green-700" :
                                  "bg-purple-100 text-purple-700"
                                )}>
                                  {unit.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                                  {unit.code}
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-black">{unit.name}</h3>
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
                                setSelectedUnit(unit);
                                setViewDetailsDialogOpen(true);
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUnit(unit);
                                setEditDialogOpen(true);
                              }}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Unit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedUnit(unit);
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
                          {/* Location */}
                          <div className="flex items-center gap-2 text-xs">
                            <MapPin size={12} className="text-black/40" />
                            <span className="text-black/70">{unit.city}, {unit.country}</span>
                          </div>

                          {/* Contact */}
                          <div className="flex items-center gap-2 text-xs">
                            <Mail size={12} className="text-black/40" />
                            <span className="text-black/70 truncate">{unit.email}</span>
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <Users size={12} className="text-black/40" />
                              <span className="text-xs text-black/70">{unit.employees} employees</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase size={12} className="text-black/40" />
                              <span className="text-xs text-black/70">{unit.departments} depts</span>
                            </div>
                          </div>

                          {/* Parent */}
                          {unit.parent && (
                            <div className="flex items-center gap-1 text-[10px] text-black/50">
                              <span>Parent:</span>
                              <span className="font-medium text-black/70">{unit.parent}</span>
                            </div>
                          )}

                          {/* Status and Level */}
                          <div className="flex items-center justify-between">
                            {getStatusBadge(unit.status)}
                            <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                              Level {unit.level}
                            </Badge>
                          </div>

                          {/* Contact Person */}
                          <div className="flex items-center gap-2 pt-2 border-t border-[#F5EEE9]">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className={`bg-${color}-100 text-${color}-600 text-[10px]`}>
                                {unit.contacts[0].name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-xs font-medium">{unit.contacts[0].name}</p>
                              <p className="text-[10px] text-black/50">{unit.contacts[0].role}</p>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Mail size={10} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Email contact</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between text-[10px] text-black/50 pt-1">
                            <div className="flex items-center gap-1">
                              <Clock size={10} />
                              <span>Updated {formatDate(unit.updatedAt)}</span>
                            </div>
                            {unit.metrics && (
                              <div className="flex items-center gap-1">
                                <TrendingUp size={10} className="text-green-600" />
                                <span className="text-green-600">{unit.metrics.growth}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem onClick={() => {
                    setSelectedUnit(unit);
                    setViewDetailsDialogOpen(true);
                  }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    View Employees
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Briefcase className="mr-2 h-4 w-4" />
                    View Departments
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </div>
      ) : (
        // List View
        <Card className="border-[#F5EEE9]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                  <TableHead className="w-8">
                    <Checkbox 
                      checked={selectedUnits.length === filteredUnits.length && filteredUnits.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Unit</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Code</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50">Employees</TableHead>
                  <TableHead className="text-black/50">Departments</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Parent</TableHead>
                  <TableHead className="text-black/50">Last Updated</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnits.map((unit) => {
                  const UnitIcon = getUnitIcon(unit.type);
                  const color = getUnitColor(unit.type);
                  
                  return (
                    <TableRow 
                      key={unit.id} 
                      className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30 cursor-pointer"
                      onClick={() => {
                        setSelectedUnit(unit);
                        setViewDetailsDialogOpen(true);
                      }}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedUnits.includes(unit.id)}
                          onCheckedChange={() => handleSelectUnit(unit.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 bg-${color}-100 rounded`}>
                            <UnitIcon size={14} className={`text-${color}-600`} />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{unit.name}</div>
                            <div className="text-xs text-black/50">{unit.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "text-xs border-0",
                          unit.type === 'headquarters' ? "bg-red-100 text-red-700" :
                          unit.type === 'region' ? "bg-blue-100 text-blue-700" :
                          unit.type === 'office' ? "bg-green-100 text-green-700" :
                          "bg-purple-100 text-purple-700"
                        )}>
                          {unit.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs font-mono">{unit.code}</TableCell>
                      <TableCell className="text-xs">{unit.city}, {unit.country}</TableCell>
                      <TableCell className="text-xs font-medium">{unit.employees}</TableCell>
                      <TableCell className="text-xs">{unit.departments}</TableCell>
                      <TableCell>{getStatusBadge(unit.status)}</TableCell>
                      <TableCell className="text-xs">{unit.parent || '—'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-black/30" />
                          <span className="text-xs">{formatDate(unit.updatedAt)}</span>
                        </div>
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
                              setSelectedUnit(unit);
                              setViewDetailsDialogOpen(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedUnit(unit);
                              setEditDialogOpen(true);
                            }}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => {
                                setSelectedUnit(unit);
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
          <CardFooter className="border-t border-[#F5EEE9] p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-black/50">
                Showing {filteredUnits.length} of {organizationUnits.length} units
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

      {/* View Details Dialog */}
      <Dialog open={viewDetailsDialogOpen} onOpenChange={setViewDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedUnit && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className={`p-2 bg-${getUnitColor(selectedUnit.type)}-100 rounded-lg`}>
                    {selectedUnit.type === 'headquarters' && <Building2 size={20} className={`text-${getUnitColor(selectedUnit.type)}-600`} />}
                    {selectedUnit.type === 'region' && <Globe size={20} className={`text-${getUnitColor(selectedUnit.type)}-600`} />}
                    {selectedUnit.type === 'office' && <Building size={20} className={`text-${getUnitColor(selectedUnit.type)}-600`} />}
                  </div>
                  <div>
                    <span>{selectedUnit.name}</span>
                    <DialogDescription className="text-sm">
                      {selectedUnit.code} • {selectedUnit.type}
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid grid-cols-4 bg-[#F5EEE9]">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-black/50">Email</p>
                      <p className="text-sm flex items-center gap-1">
                        <Mail size={14} className="text-black/30" />
                        {selectedUnit.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-black/50">Phone</p>
                      <p className="text-sm flex items-center gap-1">
                        <Phone size={14} className="text-black/30" />
                        {selectedUnit.phone}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-black/50">Address</p>
                    <p className="text-sm flex items-center gap-1">
                      <MapPin size={14} className="text-black/30" />
                      {selectedUnit.address}, {selectedUnit.city}, {selectedUnit.state} {selectedUnit.zipCode}, {selectedUnit.country}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-black/50">Website</p>
                      <p className="text-sm flex items-center gap-1">
                        <Globe size={14} className="text-black/30" />
                        {selectedUnit.website}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-black/50">Founded</p>
                      <p className="text-sm flex items-center gap-1">
                        <Calendar size={14} className="text-black/30" />
                        {selectedUnit.founded}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-black/50">Tax ID</p>
                      <p className="text-sm">{selectedUnit.taxId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-black/50">Registration No.</p>
                      <p className="text-sm">{selectedUnit.registrationNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-black/50">Status</p>
                      <div>{getStatusBadge(selectedUnit.status)}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-black/50">Level</p>
                      <Badge variant="outline" className="border-[#F5EEE9]">Level {selectedUnit.level}</Badge>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contacts" className="space-y-4 mt-4">
                  {selectedUnit.contacts.map((contact, idx) => (
                    <Card key={idx} className="border-[#F5EEE9]">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className={`bg-${getUnitColor(selectedUnit.type)}-100 text-${getUnitColor(selectedUnit.type)}-600`}>
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-black/50">{contact.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">{contact.email}</p>
                            <p className="text-sm text-black/50">{contact.phone}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4 mt-4">
                  {selectedUnit.metrics && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-4">
                            <p className="text-xs text-black/50">Revenue</p>
                            <p className="text-2xl font-bold text-green-600">{selectedUnit.metrics.revenue}</p>
                          </CardContent>
                        </Card>
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-4">
                            <p className="text-xs text-black/50">Growth</p>
                            <p className="text-2xl font-bold text-blue-600">{selectedUnit.metrics.growth}</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-4">
                            <p className="text-xs text-black/50">Satisfaction</p>
                            <p className="text-2xl font-bold text-purple-600">{selectedUnit.metrics.satisfaction}</p>
                          </CardContent>
                        </Card>
                        <Card className="border-[#F5EEE9]">
                          <CardContent className="p-4">
                            <p className="text-xs text-black/50">Retention</p>
                            <p className="text-2xl font-bold text-yellow-600">{selectedUnit.metrics.retention}</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Unit Statistics</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-[#F5EEE9] rounded flex items-center justify-between">
                            <span className="text-xs">Employees</span>
                            <span className="text-sm font-bold">{selectedUnit.employees}</span>
                          </div>
                          <div className="p-2 bg-[#F5EEE9] rounded flex items-center justify-between">
                            <span className="text-xs">Departments</span>
                            <span className="text-sm font-bold">{selectedUnit.departments}</span>
                          </div>
                          <div className="p-2 bg-[#F5EEE9] rounded flex items-center justify-between">
                            <span className="text-xs">Locations</span>
                            <span className="text-sm font-bold">{selectedUnit.locations}</span>
                          </div>
                          <div className="p-2 bg-[#F5EEE9] rounded flex items-center justify-between">
                            <span className="text-xs">Level</span>
                            <span className="text-sm font-bold">{selectedUnit.level}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="hierarchy" className="space-y-4 mt-4">
                  <div className="relative pl-4 border-l-2 border-[#F5EEE9]">
                    {/* Parent */}
                    {selectedUnit.parent && (
                      <div className="mb-4">
                        <p className="text-xs text-black/50 mb-1">Parent Unit</p>
                        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                          <Globe size={14} className="text-blue-600" />
                          <span className="text-sm font-medium">{selectedUnit.parent}</span>
                        </div>
                      </div>
                    )}

                    {/* Current Unit */}
                    <div className="mb-4">
                      <p className="text-xs text-black/50 mb-1">Current Unit</p>
                      <div className={`flex items-center gap-2 p-2 bg-${getUnitColor(selectedUnit.type)}-50 rounded-lg border border-${getUnitColor(selectedUnit.type)}-200`}>
                        {selectedUnit.type === 'headquarters' && <Building2 size={14} className={`text-${getUnitColor(selectedUnit.type)}-600`} />}
                        {selectedUnit.type === 'region' && <Globe size={14} className={`text-${getUnitColor(selectedUnit.type)}-600`} />}
                        {selectedUnit.type === 'office' && <Building size={14} className={`text-${getUnitColor(selectedUnit.type)}-600`} />}
                        <span className="text-sm font-medium">{selectedUnit.name}</span>
                      </div>
                    </div>

                    {/* Child Units */}
                    <div>
                      <p className="text-xs text-black/50 mb-1">Child Units</p>
                      <div className="space-y-2">
                        {organizationUnits.filter(u => u.parent === selectedUnit.code).length > 0 ? (
                          organizationUnits.filter(u => u.parent === selectedUnit.code).map(child => (
                            <div key={child.id} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                              <Building size={14} className="text-green-600" />
                              <span className="text-sm font-medium">{child.name}</span>
                              <Badge className="ml-auto bg-green-100 text-green-700 text-[10px]">
                                {child.employees} emp
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-black/50">No child units</p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setViewDetailsDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setViewDetailsDialogOpen(false);
                    setEditDialogOpen(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Unit
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Unit Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Organization Unit</DialogTitle>
            <DialogDescription>
              Add a new organizational unit to your hierarchy
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Unit Name</Label>
                    <Input placeholder="e.g., North America Region" />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit Code</Label>
                    <Input placeholder="e.g., NA-001" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="headquarters">Headquarters</SelectItem>
                        <SelectItem value="region">Region</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="department">Department</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Parent Unit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hq">ACCUCOUNT Headquarters</SelectItem>
                        <SelectItem value="na">North America Region</SelectItem>
                        <SelectItem value="eu">Europe Region</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Brief description of the unit" rows={2} />
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="unit@accucount.com" />
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input placeholder="Street address" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="City" />
                  <Input placeholder="State" />
                  <Input placeholder="ZIP Code" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Website" />
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Founded Year</Label>
                    <Input placeholder="2024" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tax ID</Label>
                    <Input placeholder="12-3456789" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Registration Number</Label>
                  <Input placeholder="REG-12345" />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <RadioGroup defaultValue="active" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <Label htmlFor="active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id="inactive" />
                      <Label htmlFor="inactive">Inactive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pending" id="pending" />
                      <Label htmlFor="pending">Pending</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Unit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Unit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Organization Unit</DialogTitle>
            <DialogDescription>
              Update the details of this organizational unit
            </DialogDescription>
          </DialogHeader>

          {selectedUnit && (
            <div className="space-y-4 py-4">
              <Tabs defaultValue="basic">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Unit Name</Label>
                      <Input defaultValue={selectedUnit.name} />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit Code</Label>
                      <Input defaultValue={selectedUnit.code} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select defaultValue={selectedUnit.type}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="headquarters">Headquarters</SelectItem>
                          <SelectItem value="region">Region</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="department">Department</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Parent Unit</Label>
                      <Select defaultValue={selectedUnit.parent}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HQ-001">ACCUCOUNT Headquarters</SelectItem>
                          <SelectItem value="NA-001">North America Region</SelectItem>
                          <SelectItem value="EU-001">Europe Region</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue={selectedUnit.email} />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue={selectedUnit.phone} />
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input defaultValue={selectedUnit.address} />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Input defaultValue={selectedUnit.city} />
                    <Input defaultValue={selectedUnit.state} />
                    <Input defaultValue={selectedUnit.zipCode} />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Select defaultValue={selectedUnit.country}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="Singapore">Singapore</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input defaultValue={selectedUnit.website} />
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Founded Year</Label>
                      <Input defaultValue={selectedUnit.founded} />
                    </div>
                    <div className="space-y-2">
                      <Label>Tax ID</Label>
                      <Input defaultValue={selectedUnit.taxId} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Registration Number</Label>
                    <Input defaultValue={selectedUnit.registrationNumber} />
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <RadioGroup defaultValue={selectedUnit.status} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="active" id="edit-active" />
                        <Label htmlFor="edit-active">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inactive" id="edit-inactive" />
                        <Label htmlFor="edit-inactive">Inactive</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pending" id="edit-pending" />
                        <Label htmlFor="edit-pending">Pending</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Organization Unit</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this unit? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedUnit && (
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-${getUnitColor(selectedUnit.type)}-100 rounded`}>
                  {selectedUnit.type === 'headquarters' && <Building2 size={16} className={`text-${getUnitColor(selectedUnit.type)}-600`} />}
                  {selectedUnit.type === 'region' && <Globe size={16} className={`text-${getUnitColor(selectedUnit.type)}-600`} />}
                  {selectedUnit.type === 'office' && <Building size={16} className={`text-${getUnitColor(selectedUnit.type)}-600`} />}
                </div>
                <div>
                  <p className="font-medium text-red-600">{selectedUnit.name}</p>
                  <p className="text-xs text-black/50">{selectedUnit.code}</p>
                </div>
              </div>
              <div className="flex items-start gap-1 text-xs text-amber-600">
                <AlertTriangle size={12} className="mt-0.5" />
                <span>This will also delete all associated departments and child units.</span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>
              Delete Unit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Export Organization Data</DialogTitle>
            <DialogDescription>
              Choose export format and options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Export Format</Label>
              <RadioGroup defaultValue="excel">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel" className="flex items-center gap-2">
                    <FileSpreadsheet size={16} className="text-green-600" />
                    Excel (.xlsx)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="json" id="json" />
                  <Label htmlFor="json" className="flex items-center gap-2">
                    <FileJson size={16} className="text-blue-600" />
                    JSON (.json)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="flex items-center gap-2">
                    <File size={16} className="text-gray-600" />
                    CSV (.csv)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Include</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-all" defaultChecked />
                  <Label htmlFor="include-all">All units</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-departments" defaultChecked />
                  <Label htmlFor="include-departments">Departments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-contacts" defaultChecked />
                  <Label htmlFor="include-contacts">Contact information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-metrics" />
                  <Label htmlFor="include-metrics">Performance metrics</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select defaultValue="all">
                <SelectTrigger>
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
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
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
            <DialogTitle>Import Organization Data</DialogTitle>
            <DialogDescription>
              Upload a file to import organization units
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-6 text-center">
              <Upload size={24} className="mx-auto mb-2 text-black/30" />
              <p className="text-sm font-medium mb-1">Drop your file here</p>
              <p className="text-xs text-black/50 mb-3">or click to browse</p>
              <Input type="file" className="hidden" id="file-upload" />
              <Button variant="outline" size="sm" onClick={() => document.getElementById('file-upload').click()}>
                Choose File
              </Button>
              <p className="text-[10px] text-black/30 mt-2">Supported formats: .xlsx, .csv, .json (max 10MB)</p>
            </div>

            <div className="space-y-2">
              <Label>Import Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-existing" />
                  <Label htmlFor="update-existing">Update existing units</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skip-duplicates" defaultChecked />
                  <Label htmlFor="skip-duplicates">Skip duplicates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="send-notifications" />
                  <Label htmlFor="send-notifications">Send notifications</Label>
                </div>
              </div>
            </div>

            <Alert className="bg-[#F5EEE9] border-0">
              <Info size={14} />
              <AlertTitle className="text-xs font-medium">Sample Format</AlertTitle>
              <AlertDescription className="text-[10px] text-black/50">
                Download a sample template to see the required format.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
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
            <DialogTitle>Organization Settings</DialogTitle>
            <DialogDescription>
              Configure organization display and management options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="display">
                <AccordionTrigger>Display Settings</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label>Show hierarchy chart</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show unit metrics</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Compact view</Label>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label>Default view</Label>
                    <Select defaultValue="grid">
                      <SelectTrigger>
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
                <AccordionTrigger>Notifications</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label>New unit created</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Unit status changes</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Contact updates</Label>
                    <Switch />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="access">
                <AccordionTrigger>Access Control</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label>Allow unit creation</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Allow unit deletion</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Require approval</Label>
                    <Switch />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
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
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Add Unit</TooltipContent>
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
            <TooltipContent side="left">Export</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setSettingsDialogOpen(true)}
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

export default OrganizationPage;