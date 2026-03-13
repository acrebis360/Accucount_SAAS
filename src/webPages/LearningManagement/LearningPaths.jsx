// app/dashboard/learning-paths/page.js
'use client';

import { useState } from 'react';
import { 
  Map,
  BookOpen,
  Award,
  Clock,
  Calendar,
  Users,
  User,
  CheckCircle,
  AlertTriangle,
  Star,

  Crown,
  Sparkles,
  Plus,

  Trash2,
  Download,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,

  Eye,
  Settings,
  History,
  BarChart3,
  TrendingUp,
 
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,

  Cpu,

  Wrench,

  Circle,
  Package,
  Truck,
  Monitor,
 
} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const LearningPathsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPath, setExpandedPath] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample learning paths data
  const learningPaths = [
    {
      id: 'PATH-001',
      title: 'Inventory Management Specialist',
      description: 'Comprehensive path to become an inventory management specialist, covering fundamentals to advanced techniques.',
      longDescription: 'This learning path is designed for inventory team members who want to become specialists. You\'ll learn inventory fundamentals, cycle counting, valuation methods, warehouse organization, inventory software, and advanced reporting. Upon completion, you\'ll be qualified for senior inventory roles.',
      category: 'inventory',
      level: 'intermediate',
      status: 'active',
      enrolled: 234,
      completed: 98,
      inProgress: 136,
      rating: 4.8,
      reviews: 156,
      duration: 480,
      durationUnit: 'minutes',
      courses: 8,
      estimatedDays: 30,
      skills: ['Cycle Counting', 'Inventory Valuation', 'Warehouse Organization', 'Inventory Software', 'Reporting'],
      prerequisites: ['Basic Inventory Knowledge'],
      certification: 'Inventory Management Specialist Certificate',
      certificateAvailable: true,
      image: '/images/learning-inventory.jpg',
      tags: ['inventory', 'specialist', 'certification'],
      featured: true,
      popular: true,
      instructor: {
        name: 'John Smith',
        title: 'Senior Inventory Manager',
        avatar: null,
        initials: 'JS',
      },
      modules: [
        {
          id: 'MOD-001',
          title: 'Inventory Fundamentals',
          description: 'Learn the basics of inventory management',
          duration: 60,
          courses: 2,
          completed: 1,
          items: [
            { id: 'CRS-001', title: 'Introduction to Inventory Management', type: 'course', duration: 30, completed: true },
            { id: 'CRS-002', title: 'Types of Inventory', type: 'course', duration: 30, completed: false },
          ],
        },
        {
          id: 'MOD-002',
          title: 'Cycle Counting',
          description: 'Master cycle counting procedures and best practices',
          duration: 90,
          courses: 3,
          completed: 0,
          items: [
            { id: 'CRS-003', title: 'Cycle Counting Fundamentals', type: 'course', duration: 30, completed: false },
            { id: 'CRS-004', title: 'Counting Techniques', type: 'course', duration: 30, completed: false },
            { id: 'CRS-005', title: 'Discrepancy Resolution', type: 'course', duration: 30, completed: false },
          ],
        },
        {
          id: 'MOD-003',
          title: 'Inventory Valuation',
          description: 'Understand different inventory valuation methods',
          duration: 90,
          courses: 3,
          completed: 0,
          items: [
            { id: 'CRS-006', title: 'FIFO Method', type: 'course', duration: 30, completed: false },
            { id: 'CRS-007', title: 'LIFO Method', type: 'course', duration: 30, completed: false },
            { id: 'CRS-008', title: 'Weighted Average', type: 'course', duration: 30, completed: false },
          ],
        },
        {
          id: 'MOD-004',
          title: 'Warehouse Organization',
          description: 'Learn optimal warehouse layout and organization',
          duration: 60,
          courses: 2,
          completed: 0,
          items: [
            { id: 'CRS-009', title: 'Warehouse Zones', type: 'course', duration: 30, completed: false },
            { id: 'CRS-010', title: 'Bin Location Systems', type: 'course', duration: 30, completed: false },
          ],
        },
        {
          id: 'MOD-005',
          title: 'Inventory Software',
          description: 'Master the inventory management system',
          duration: 90,
          courses: 3,
          completed: 0,
          items: [
            { id: 'CRS-011', title: 'System Navigation', type: 'course', duration: 30, completed: false },
            { id: 'CRS-012', title: 'Data Entry', type: 'course', duration: 30, completed: false },
            { id: 'CRS-013', title: 'Reporting Features', type: 'course', duration: 30, completed: false },
          ],
        },
        {
          id: 'MOD-006',
          title: 'Advanced Reporting',
          description: 'Create and analyze inventory reports',
          duration: 90,
          courses: 3,
          completed: 0,
          items: [
            { id: 'CRS-014', title: 'Report Types', type: 'course', duration: 30, completed: false },
            { id: 'CRS-015', title: 'Data Analysis', type: 'course', duration: 30, completed: false },
            { id: 'CRS-016', title: 'Performance Metrics', type: 'course', duration: 30, completed: false },
          ],
        },
      ],
      progress: 12,
      startedAt: '2024-03-01',
      lastAccessed: '2024-03-15',
      createdAt: '2024-01-15',
      updatedAt: '2024-03-10',
    },
    {
      id: 'PATH-002',
      title: 'Warehouse Operations Professional',
      description: 'Complete path for warehouse operations including receiving, putaway, picking, packing, and shipping.',
      longDescription: 'This comprehensive path covers all aspects of warehouse operations. You\'ll learn receiving procedures, putaway strategies, picking methods, packing techniques, shipping processes, and safety protocols. Perfect for warehouse associates aiming for supervisor roles.',
      category: 'warehouse',
      level: 'beginner',
      status: 'active',
      enrolled: 567,
      completed: 234,
      inProgress: 333,
      rating: 4.9,
      reviews: 412,
      duration: 720,
      durationUnit: 'minutes',
      courses: 12,
      estimatedDays: 45,
      skills: ['Receiving', 'Putaway', 'Picking', 'Packing', 'Shipping', 'Safety'],
      prerequisites: ['None'],
      certification: 'Warehouse Operations Certificate',
      certificateAvailable: true,
      image: '/images/learning-warehouse.jpg',
      tags: ['warehouse', 'operations', 'certification'],
      featured: true,
      popular: true,
      instructor: {
        name: 'Sarah Wilson',
        title: 'Warehouse Manager',
        avatar: null,
        initials: 'SW',
      },
      modules: [
        {
          id: 'MOD-007',
          title: 'Receiving Fundamentals',
          description: 'Learn proper receiving procedures',
          duration: 90,
          courses: 3,
          completed: 0,
          items: [
            { id: 'CRS-017', title: 'Receiving Process', type: 'course', duration: 30, completed: false },
            { id: 'CRS-018', title: 'Inspection', type: 'course', duration: 30, completed: false },
            { id: 'CRS-019', title: 'Documentation', type: 'course', duration: 30, completed: false },
          ],
        },
        {
          id: 'MOD-008',
          title: 'Putaway Strategies',
          description: 'Master putaway techniques',
          duration: 90,
          courses: 3,
          completed: 0,
          items: [
            { id: 'CRS-020', title: 'Putaway Rules', type: 'course', duration: 30, completed: false },
            { id: 'CRS-021', title: 'Location Assignment', type: 'course', duration: 30, completed: false },
            { id: 'CRS-022', title: 'Putaway Equipment', type: 'course', duration: 30, completed: false },
          ],
        },
        {
          id: 'MOD-009',
          title: 'Picking Methods',
          description: 'Learn various picking techniques',
          duration: 120,
          courses: 4,
          completed: 0,
          items: [
            { id: 'CRS-023', title: 'Piece Picking', type: 'course', duration: 30, completed: false },
            { id: 'CRS-024', title: 'Case Picking', type: 'course', duration: 30, completed: false },
            { id: 'CRS-025', title: 'Pallet Picking', type: 'course', duration: 30, completed: false },
            { id: 'CRS-026', title: 'Zone Picking', type: 'course', duration: 30, completed: false },
          ],
        },
      ],
      progress: 0,
      createdAt: '2024-01-20',
      updatedAt: '2024-03-12',
    },
    {
      id: 'PATH-003',
      title: 'Safety Leadership',
      description: 'Develop skills to lead safety initiatives and promote a culture of safety.',
      longDescription: 'This leadership path focuses on safety management, risk assessment, incident investigation, and safety culture development. Ideal for safety officers, supervisors, and managers responsible for workplace safety.',
      category: 'safety',
      level: 'advanced',
      status: 'active',
      enrolled: 189,
      completed: 67,
      inProgress: 122,
      rating: 4.7,
      reviews: 98,
      duration: 360,
      durationUnit: 'minutes',
      courses: 6,
      estimatedDays: 21,
      skills: ['Risk Assessment', 'Incident Investigation', 'Safety Culture', 'Regulatory Compliance', 'Training'],
      prerequisites: ['Basic Safety Training'],
      certification: 'Safety Leadership Certificate',
      certificateAvailable: true,
      image: '/images/learning-safety.jpg',
      tags: ['safety', 'leadership', 'management'],
      featured: false,
      popular: false,
      instructor: {
        name: 'Mike Johnson',
        title: 'Safety Director',
        avatar: null,
        initials: 'MJ',
      },
      modules: [],
      progress: 0,
      createdAt: '2024-02-01',
      updatedAt: '2024-03-08',
    },
    {
      id: 'PATH-004',
      title: 'RFID Technology Expert',
      description: 'Become an expert in RFID technology implementation and management.',
      longDescription: 'This specialized path covers RFID fundamentals, hardware selection, antenna placement, system integration, data management, and troubleshooting. Perfect for IT staff and operations professionals implementing RFID.',
      category: 'technology',
      level: 'advanced',
      status: 'active',
      enrolled: 78,
      completed: 23,
      inProgress: 55,
      rating: 4.6,
      reviews: 42,
      duration: 540,
      durationUnit: 'minutes',
      courses: 9,
      estimatedDays: 35,
      skills: ['RFID Fundamentals', 'Hardware Selection', 'Antenna Placement', 'System Integration', 'Data Management'],
      prerequisites: ['Basic IT Knowledge'],
      certification: 'RFID Technology Certificate',
      certificateAvailable: true,
      image: '/images/learning-rfid.jpg',
      tags: ['rfid', 'technology', 'iot'],
      featured: true,
      popular: false,
      instructor: {
        name: 'David Lee',
        title: 'RFID Specialist',
        avatar: null,
        initials: 'DL',
      },
      modules: [],
      progress: 0,
      createdAt: '2024-02-10',
      updatedAt: '2024-03-05',
    },
    {
      id: 'PATH-005',
      title: 'Quality Control Professional',
      description: 'Master quality control principles, inspection techniques, and continuous improvement.',
      longDescription: 'This path covers quality fundamentals, inspection methods, statistical process control, root cause analysis, and continuous improvement methodologies. Ideal for quality assurance staff and inspectors.',
      category: 'quality',
      level: 'intermediate',
      status: 'active',
      enrolled: 145,
      completed: 56,
      inProgress: 89,
      rating: 4.8,
      reviews: 87,
      duration: 420,
      durationUnit: 'minutes',
      courses: 7,
      estimatedDays: 28,
      skills: ['Quality Fundamentals', 'Inspection Methods', 'SPC', 'Root Cause Analysis', 'Continuous Improvement'],
      prerequisites: ['Basic Quality Knowledge'],
      certification: 'Quality Control Certificate',
      certificateAvailable: true,
      image: '/images/learning-quality.jpg',
      tags: ['quality', 'inspection', 'improvement'],
      featured: false,
      popular: true,
      instructor: {
        name: 'Lisa Chen',
        title: 'Quality Manager',
        avatar: null,
        initials: 'LC',
      },
      modules: [],
      progress: 0,
      createdAt: '2024-02-15',
      updatedAt: '2024-03-07',
    },
    {
      id: 'PATH-006',
      title: 'Forklift Operations & Safety',
      description: 'Comprehensive training for forklift operators including safety, operation, and maintenance.',
      longDescription: 'This path covers forklift safety regulations, pre-operation inspections, operating techniques, load handling, and basic maintenance. Includes practical exercises and certification exam.',
      category: 'equipment',
      level: 'beginner',
      status: 'active',
      enrolled: 423,
      completed: 345,
      inProgress: 78,
      rating: 4.9,
      reviews: 312,
      duration: 300,
      durationUnit: 'minutes',
      courses: 5,
      estimatedDays: 14,
      skills: ['Forklift Safety', 'Pre-op Inspection', 'Operating Techniques', 'Load Handling', 'Maintenance'],
      prerequisites: ['None'],
      certification: 'Forklift Operator License',
      certificateAvailable: true,
      image: '/images/learning-forklift.jpg',
      tags: ['forklift', 'equipment', 'safety'],
      featured: true,
      popular: true,
      instructor: {
        name: 'Tom Brown',
        title: 'Equipment Trainer',
        avatar: null,
        initials: 'TB',
      },
      modules: [],
      progress: 100,
      completedAt: '2024-03-01',
      createdAt: '2024-01-05',
      updatedAt: '2024-03-01',
    },
    {
      id: 'PATH-007',
      title: 'Inventory Software Superuser',
      description: 'Become a superuser of the inventory management system.',
      longDescription: 'This advanced path prepares you to be a system superuser, capable of training others, troubleshooting issues, and optimizing system usage. Covers all system features, administration, and reporting.',
      category: 'software',
      level: 'advanced',
      status: 'upcoming',
      enrolled: 0,
      completed: 0,
      inProgress: 0,
      rating: 0,
      reviews: 0,
      duration: 360,
      durationUnit: 'minutes',
      courses: 6,
      estimatedDays: 21,
      skills: ['System Administration', 'User Management', 'Reporting', 'Troubleshooting', 'Training'],
      prerequisites: ['Inventory Software Training'],
      certification: 'Superuser Certificate',
      certificateAvailable: true,
      image: '/images/learning-software.jpg',
      tags: ['software', 'superuser', 'admin'],
      featured: false,
      popular: false,
      instructor: {
        name: 'IT Training Team',
        title: 'System Trainers',
        avatar: null,
        initials: 'IT',
      },
      modules: [],
      progress: 0,
      startDate: '2024-04-01',
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10',
    },
    {
      id: 'PATH-008',
      title: 'Leadership Development Program',
      description: 'Develop essential leadership skills for current and aspiring managers.',
      longDescription: 'This comprehensive program covers team leadership, communication, conflict resolution, performance management, and strategic thinking. Includes mentoring sessions and practical projects.',
      category: 'leadership',
      level: 'advanced',
      status: 'active',
      enrolled: 67,
      completed: 23,
      inProgress: 44,
      rating: 4.9,
      reviews: 45,
      duration: 600,
      durationUnit: 'minutes',
      courses: 10,
      estimatedDays: 60,
      skills: ['Team Leadership', 'Communication', 'Conflict Resolution', 'Performance Management', 'Strategic Thinking'],
      prerequisites: ['Supervisor Experience'],
      certification: 'Leadership Certificate',
      certificateAvailable: true,
      image: '/images/learning-leadership.jpg',
      tags: ['leadership', 'management', 'development'],
      featured: true,
      popular: true,
      instructor: {
        name: 'Dr. Robert Chen',
        title: 'Leadership Coach',
        avatar: null,
        initials: 'RC',
      },
      modules: [],
      progress: 35,
      startedAt: '2024-02-15',
      lastAccessed: '2024-03-14',
      createdAt: '2024-02-01',
      updatedAt: '2024-03-12',
    },
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Paths', count: learningPaths.length, icon: Map },
    { id: 'inventory', name: 'Inventory', count: learningPaths.filter(p => p.category === 'inventory').length, icon: Package },
    { id: 'warehouse', name: 'Warehouse', count: learningPaths.filter(p => p.category === 'warehouse').length, icon: Truck },
    { id: 'safety', name: 'Safety', count: learningPaths.filter(p => p.category === 'safety').length, icon: AlertTriangle },
    { id: 'technology', name: 'Technology', count: learningPaths.filter(p => p.category === 'technology').length, icon: Cpu },
    { id: 'quality', name: 'Quality', count: learningPaths.filter(p => p.category === 'quality').length, icon: CheckCircle },
    { id: 'equipment', name: 'Equipment', count: learningPaths.filter(p => p.category === 'equipment').length, icon: Wrench },
    { id: 'software', name: 'Software', count: learningPaths.filter(p => p.category === 'software').length, icon: Monitor },
    { id: 'leadership', name: 'Leadership', count: learningPaths.filter(p => p.category === 'leadership').length, icon: Crown },
  ];

  // Levels
  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    upcoming: { label: 'Upcoming', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Calendar },
    completed: { label: 'Completed', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Award },
  };

  const levelColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getLevelColor = (level) => {
    return levelColors[level] || 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'inventory': return <Package size={16} className="text-blue-600" />;
      case 'warehouse': return <Truck size={16} className="text-green-600" />;
      case 'safety': return <AlertTriangle size={16} className="text-red-600" />;
      case 'technology': return <Cpu size={16} className="text-purple-600" />;
      case 'quality': return <CheckCircle size={16} className="text-yellow-600" />;
      case 'equipment': return <Wrench size={16} className="text-orange-600" />;
      case 'software': return <Monitor size={16} className="text-cyan-600" />;
      case 'leadership': return <Crown size={16} className="text-indigo-600" />;
      default: return <Map size={16} className="text-red-600" />;
    }
  };

  const filteredPaths = learningPaths.filter(path => {
    const matchesCategory = selectedCategory === 'all' || path.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || path.level === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || path.status === selectedStatus;
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         path.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesStatus && matchesSearch;
  });

  const featuredPaths = filteredPaths.filter(p => p.featured);
  const popularPaths = filteredPaths.filter(p => p.popular);
  const regularPaths = filteredPaths.filter(p => !p.featured && !p.popular);

  const stats = {
    total: learningPaths.length,
    enrolled: learningPaths.reduce((sum, p) => sum + p.enrolled, 0),
    completed: learningPaths.reduce((sum, p) => sum + p.completed, 0),
    inProgress: learningPaths.reduce((sum, p) => sum + p.inProgress, 0),
    avgRating: (learningPaths.reduce((sum, p) => sum + p.rating, 0) / learningPaths.length).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Learning Paths</h1>
            <p className="text-black/50 mt-1">Structured learning journeys to develop your skills</p>
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
                  <PrinterIcon className="mr-2 h-4 w-4" />
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowReportDialog(true)}
            >
              <BarChart3 size={16} />
              Reports
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowHistoryDialog(true)}
            >
              <History size={16} />
              History
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create Path
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Paths</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Map size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Enrolled</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.enrolled}</p>
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
                  <p className="text-xs text-black/50">In Progress</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.inProgress}</p>
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
                  <p className="text-xs text-black/50">Completed</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.completed}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <Award size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Rating</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.avgRating}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Star size={18} className="text-purple-600" />
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
              placeholder="Search by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map(level => (
                <SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>
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
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
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

      {/* Featured Section */}
      {featuredPaths.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-600" />
            Featured Paths
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {featuredPaths.map((path) => (
              <LearningPathCard 
                key={path.id} 
                path={path} 
                onView={() => {
                  setSelectedPath(path);
                  setShowDetailsDialog(true);
                }}
                onExpand={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                expanded={expandedPath === path.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Popular Section */}
      {popularPaths.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-green-600" />
            Popular Paths
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {popularPaths.map((path) => (
              <LearningPathCard 
                key={path.id} 
                path={path} 
                onView={() => {
                  setSelectedPath(path);
                  setShowDetailsDialog(true);
                }}
                onExpand={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                expanded={expandedPath === path.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Paths Section */}
      <div>
        <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
          <Map size={16} className="text-red-600" />
          All Learning Paths
        </h2>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {regularPaths.map((path) => (
              <LearningPathCard 
                key={path.id} 
                path={path} 
                onView={() => {
                  setSelectedPath(path);
                  setShowDetailsDialog(true);
                }}
                onExpand={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                expanded={expandedPath === path.id}
              />
            ))}
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
                    <TableHead className="text-black/50">Path</TableHead>
                    <TableHead className="text-black/50">Category</TableHead>
                    <TableHead className="text-black/50">Level</TableHead>
                    <TableHead className="text-black/50">Status</TableHead>
                    <TableHead className="text-black/50 text-right">Enrolled</TableHead>
                    <TableHead className="text-black/50 text-right">Completed</TableHead>
                    <TableHead className="text-black/50 text-right">Rating</TableHead>
                    <TableHead className="text-black/50">Duration</TableHead>
                    <TableHead className="text-black/50">Courses</TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regularPaths.map((path) => (
                    <TableRow key={path.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{path.title}</p>
                          <p className="text-xs text-black/50 line-clamp-1">{path.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {path.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getLevelColor(path.level))}>
                          {path.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(path.status))}>
                          {path.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{path.enrolled}</TableCell>
                      <TableCell className="text-right">{path.completed}</TableCell>
                      <TableCell className="text-right">{path.rating}</TableCell>
                      <TableCell>{path.duration} min</TableCell>
                      <TableCell>{path.courses}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            setSelectedPath(path);
                            setShowDetailsDialog(true);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Path Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Learning Path</DialogTitle>
            <DialogDescription>
              Design a structured learning journey
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Path Title</Label>
                    <Input placeholder="e.g., Inventory Management Specialist" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Days</Label>
                    <Input type="number" placeholder="e.g., 30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Brief description" rows={2} />
                </div>

                <div className="space-y-2">
                  <Label>Long Description</Label>
                  <Textarea placeholder="Detailed description" rows={4} />
                </div>

                <div className="space-y-2">
                  <Label>Prerequisites</Label>
                  <Input placeholder="e.g., Basic Inventory Knowledge" />
                </div>
              </TabsContent>

              <TabsContent value="modules" className="space-y-4">
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Input placeholder={`Module ${i} Title`} className="flex-1 mr-2" />
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <Textarea placeholder="Module description" rows={2} className="mb-2" />
                        <div className="flex items-center gap-2">
                          <Input type="number" placeholder="Courses" className="w-24" />
                          <Input type="number" placeholder="Duration (min)" className="w-32" />
                          <Button variant="outline" size="sm" className="ml-auto">
                            <Plus size={14} className="mr-1" />
                            Add Course
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus size={14} className="mr-2" />
                    Add Module
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-2">
                  <Label>Skills (comma separated)</Label>
                  <Input placeholder="e.g., Cycle Counting, Inventory Valuation" />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>

                <div className="space-y-2">
                  <Label>Certification</Label>
                  <Input placeholder="Certificate name" />
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch id="certificate" />
                    <Label htmlFor="certificate">Issue certificate upon completion</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Instructor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Wilson</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <RadioGroup defaultValue="draft">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="draft" id="draft" />
                      <Label htmlFor="draft">Save as Draft</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <Label htmlFor="active">Publish Now</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upcoming" id="upcoming" />
                      <Label htmlFor="upcoming">Schedule as Upcoming</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" />
                  <Label htmlFor="featured">Mark as Featured</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="popular" />
                  <Label htmlFor="popular">Mark as Popular</Label>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Learning Path
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Path Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Learning Path Details</DialogTitle>
          </DialogHeader>

          {selectedPath && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="modules">Modules</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedPath.title}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedPath.category} • {selectedPath.level}</p>
                    </div>
                    <Badge className={cn("text-xs border-0", getStatusColor(selectedPath.status))}>
                      {selectedPath.status}
                    </Badge>
                  </div>

                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <p className="text-sm">{selectedPath.longDescription || selectedPath.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Instructor</p>
                      <p className="text-sm font-medium">{selectedPath.instructor.name}</p>
                      <p className="text-xs text-black/50">{selectedPath.instructor.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Level</p>
                      <Badge className={cn("text-xs mt-1", getLevelColor(selectedPath.level))}>
                        {selectedPath.level}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Clock size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedPath.duration}</p>
                        <p className="text-xs text-black/50">Minutes</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <BookOpen size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedPath.courses}</p>
                        <p className="text-xs text-black/50">Courses</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Users size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedPath.enrolled}</p>
                        <p className="text-xs text-black/50">Enrolled</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Star size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedPath.rating}</p>
                        <p className="text-xs text-black/50">Rating</p>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedPath.prerequisites && (
                    <div>
                      <p className="text-xs text-black/50">Prerequisites</p>
                      <p className="text-sm">{selectedPath.prerequisites.join(', ')}</p>
                    </div>
                  )}

                  {selectedPath.certificateAvailable && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Certificate Available</p>
                      <p className="text-xs text-green-600 mt-1">{selectedPath.certification}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedPath.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-black/50">Created</p>
                      <p>{selectedPath.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-black/50">Updated</p>
                      <p>{selectedPath.updatedAt}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="modules" className="space-y-4">
                  {selectedPath.modules && selectedPath.modules.length > 0 ? (
                    selectedPath.modules.map((module) => (
                      <Card key={module.id} className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{module.title}</h4>
                                {module.completed > 0 && (
                                  <Badge className="bg-green-100 text-green-700 text-[10px]">
                                    {module.completed}/{module.courses} completed
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-black/50 mt-1">{module.description}</p>
                              <p className="text-xs text-black/50 mt-1">{module.duration} minutes • {module.courses} courses</p>
                              
                              <div className="mt-3 space-y-2">
                                {module.items.map((item) => (
                                  <div key={item.id} className="flex items-center gap-2 text-sm">
                                    {item.completed ? (
                                      <CheckCircle size={14} className="text-green-600" />
                                    ) : (
                                      <Circle size={14} className="text-black/30" />
                                    )}
                                    <span className={item.completed ? 'text-black' : 'text-black/50'}>
                                      {item.title}
                                    </span>
                                    <span className="text-xs text-black/50 ml-auto">{item.duration} min</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-black/50 text-center py-4">No modules defined</p>
                  )}
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {selectedPath.skills.map((skill) => (
                      <Card key={skill} className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-600" />
                            <span className="text-sm">{skill}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="students" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium">Enrolled Students ({selectedPath.enrolled})</p>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(selectedPath.completed / selectedPath.enrolled) * 100} 
                        className="w-24 h-2 bg-[#F5EEE9]" 
                      />
                      <span className="text-xs">{selectedPath.completed} completed</span>
                    </div>
                  </div>

                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {Array.from({ length: Math.min(selectedPath.enrolled, 8) }).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-red-600 text-white text-xs">
                                {String.fromCharCode(65 + idx)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">Student {idx + 1}</p>
                              <p className="text-xs text-black/50">Progress: {Math.floor(Math.random() * 100)}%</p>
                            </div>
                          </div>
                          <div>
                            <Badge className={cn(
                              "text-xs",
                              idx < 3 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            )}>
                              {idx < 3 ? 'On Track' : 'In Progress'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {selectedPath.enrolled > 8 && (
                        <p className="text-xs text-black/50 text-center py-2">
                          +{selectedPath.enrolled - 8} more students
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedPath?.status === 'active' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowEnrollDialog(true);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Enroll Now
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
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Create Path</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowReportDialog(true)}
              >
                <BarChart3 size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Reports</TooltipContent>
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

// Learning Path Card Component
const LearningPathCard = ({ path, onView, onExpand, expanded }) => {
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'inventory': return <Package size={16} className="text-blue-600" />;
      case 'warehouse': return <Truck size={16} className="text-green-600" />;
      case 'safety': return <AlertTriangle size={16} className="text-red-600" />;
      case 'technology': return <Cpu size={16} className="text-purple-600" />;
      case 'quality': return <CheckCircle size={16} className="text-yellow-600" />;
      case 'equipment': return <Wrench size={16} className="text-orange-600" />;
      case 'software': return <Monitor size={16} className="text-cyan-600" />;
      case 'leadership': return <Crown size={16} className="text-indigo-600" />;
      default: return <Map size={16} className="text-red-600" />;
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'upcoming': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="border-[#F5EEE9] hover:shadow-lg transition-all group">
      <CardContent className="p-0">
        {/* Header */}
        <div className="h-32 bg-gradient-to-br from-red-600 to-black rounded-t-lg relative overflow-hidden">
          {path.image && (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${path.image})` }} />
          )}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Category Icon */}
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-lg p-2">
            {getCategoryIcon(path.category)}
          </div>

          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {path.featured && (
              <Badge className="bg-yellow-100 text-yellow-700 border-0">
                <Sparkles size={12} className="mr-1" />
                Featured
              </Badge>
            )}
            {path.popular && (
              <Badge className="bg-green-100 text-green-700 border-0">
                <TrendingUp size={12} className="mr-1" />
                Popular
              </Badge>
            )}
          </div>

          {/* Title */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-semibold text-white line-clamp-2">{path.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Level & Status */}
          <div className="flex items-center justify-between mb-2">
            <Badge className={cn("text-[10px]", getLevelColor(path.level))}>
              {path.level}
            </Badge>
            <Badge className={cn("text-[10px] border-0", getStatusColor(path.status))}>
              {path.status}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-xs text-black/60 line-clamp-2 mb-3">
            {path.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <Users size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{path.enrolled}</p>
              <p className="text-[8px] text-black/50">Enrolled</p>
            </div>
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <Clock size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{path.duration}m</p>
              <p className="text-[8px] text-black/50">Duration</p>
            </div>
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <Star size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{path.rating}</p>
              <p className="text-[8px] text-black/50">Rating</p>
            </div>
          </div>

          {/* Progress (if enrolled) */}
          {path.progress > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-black/50">Your Progress</span>
                <span className="text-xs font-medium">{path.progress}%</span>
              </div>
              <Progress 
                value={path.progress} 
                className="h-2 bg-[#F5EEE9]"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs flex-1"
              onClick={onView}
            >
              <Eye size={12} className="mr-1" />
              Details
            </Button>
            {path.status === 'active' && (
              <Button 
                size="sm" 
                className="h-7 text-xs flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={onExpand}
              >
                <Plus size={12} className="mr-1" />
                Enroll
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningPathsPage;