// app/dashboard/notice-board/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Bell,
  Megaphone,
  Calendar,
  Clock,
  Pin,
  Users,
  Building2,
  FileText,
  Image,
  Paperclip,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  Download,
  Upload,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  Plus,
  User,
  Award,
  ThumbsUp,
  MessageCircle,

  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Settings,
  Sliders,
  History,
  BarChart3,

  EyeOff,
  GraduationCap,
  UploadCloud,
 
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
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const NoticeBoardPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample notice board data
  const notices = [
    {
      id: 'NOT-001',
      title: 'Warehouse Safety Training - March 20',
      content: 'Mandatory safety training for all warehouse staff will be held on March 20 at 9:00 AM in the training room. Please bring your safety gear. Topics include: proper lifting techniques, emergency procedures, and new safety protocols for the automated storage system. Attendance is mandatory for all warehouse personnel.',
      summary: 'Mandatory safety training for all warehouse staff',
      category: 'training',
      priority: 'high',
      status: 'active',
      pinned: true,
      author: 'Safety Department',
      authorAvatar: null,
      authorRole: 'Safety Officer',
      department: 'Warehouse',
      targetAudience: ['All Warehouse Staff', 'Supervisors'],
      publishedAt: '2024-03-15 09:00',
      expiresAt: '2024-03-20 17:00',
      updatedAt: '2024-03-15 09:00',
      views: 234,
      likes: 45,
      comments: 12,
      attachments: [
        { name: 'safety-manual.pdf', size: '2.4 MB', type: 'pdf' },
        { name: 'training-schedule.pdf', size: '1.1 MB', type: 'pdf' },
      ],
      image: null,
      tags: ['safety', 'training', 'mandatory'],
      readBy: 156,
      totalTarget: 187,
      acknowledged: 98,
      urgent: true,
      history: [
        { timestamp: '2024-03-15 09:00', action: 'Published', user: 'Safety Department' },
      ],
    },
    {
      id: 'NOT-002',
      title: 'System Maintenance - March 18',
      content: 'The inventory management system will undergo scheduled maintenance on March 18 from 2:00 AM to 4:00 AM. During this time, the system will be unavailable. Please plan your work accordingly. All pending transactions should be completed before the maintenance window. The system will be upgraded to version 3.2.0 with new features including enhanced reporting and improved mobile interface.',
      summary: 'Scheduled system maintenance - downtime expected',
      category: 'system',
      priority: 'medium',
      status: 'active',
      pinned: false,
      author: 'IT Department',
      authorAvatar: null,
      authorRole: 'System Administrator',
      department: 'IT',
      targetAudience: ['All Users'],
      publishedAt: '2024-03-14 14:30',
      expiresAt: '2024-03-18 04:00',
      updatedAt: '2024-03-14 14:30',
      views: 567,
      likes: 23,
      comments: 5,
      attachments: [],
      tags: ['maintenance', 'system', 'downtime'],
      readBy: 234,
      totalTarget: 312,
      acknowledged: 189,
      urgent: false,
      history: [
        { timestamp: '2024-03-14 14:30', action: 'Published', user: 'IT Department' },
      ],
    },
    {
      id: 'NOT-003',
      title: 'New Inventory Procedures Effective April 1',
      content: 'New inventory counting procedures will take effect on April 1. Please review the attached documentation. Key changes include: cycle counting frequency increased to weekly for high-velocity items, new bin location validation requirements, and updated discrepancy reporting process. Training sessions will be held March 25-28. Please sign up for a session.',
      summary: 'Updated inventory procedures starting April 1',
      category: 'policy',
      priority: 'high',
      status: 'active',
      pinned: true,
      author: 'Operations Manager',
      authorAvatar: null,
      authorRole: 'Operations Manager',
      department: 'Operations',
      targetAudience: ['Inventory Team', 'Warehouse Staff', 'Supervisors'],
      publishedAt: '2024-03-13 10:15',
      expiresAt: '2024-04-30 17:00',
      updatedAt: '2024-03-13 10:15',
      views: 345,
      likes: 56,
      comments: 18,
      attachments: [
        { name: 'new-procedures.pdf', size: '3.2 MB', type: 'pdf' },
        { name: 'training-schedule.xlsx', size: '0.8 MB', type: 'excel' },
        { name: 'quick-reference.pdf', size: '1.5 MB', type: 'pdf' },
      ],
      image: null,
      tags: ['inventory', 'procedures', 'policy'],
      readBy: 123,
      totalTarget: 187,
      acknowledged: 87,
      urgent: true,
      history: [
        { timestamp: '2024-03-13 10:15', action: 'Published', user: 'Operations Manager' },
      ],
    },
    {
      id: 'NOT-004',
      title: 'Holiday Schedule - Memorial Day',
      content: 'Warehouse operations will be modified for Memorial Day (May 27). Please review the attached schedule. Receiving will be closed, shipping will operate on reduced hours (8am-12pm), and inventory teams will work normal hours. Please coordinate with your supervisors for specific shift assignments.',
      summary: 'Modified holiday schedule for Memorial Day',
      category: 'announcement',
      priority: 'low',
      status: 'scheduled',
      pinned: false,
      author: 'HR Department',
      authorAvatar: null,
      authorRole: 'HR Manager',
      department: 'HR',
      targetAudience: ['All Employees'],
      publishedAt: '2024-05-20 08:00',
      expiresAt: '2024-05-27 23:59',
      updatedAt: '2024-03-12 16:45',
      views: 0,
      likes: 0,
      comments: 0,
      attachments: [
        { name: 'holiday-schedule.pdf', size: '1.2 MB', type: 'pdf' },
      ],
      tags: ['holiday', 'schedule', 'memorial-day'],
      readBy: 0,
      totalTarget: 312,
      acknowledged: 0,
      urgent: false,
      history: [
        { timestamp: '2024-03-12 16:45', action: 'Scheduled', user: 'HR Department' },
      ],
    },
    {
      id: 'NOT-005',
      title: 'Congratulations to Employee of the Month: John Doe',
      content: 'Please join us in congratulating John Doe from the Inventory Team for being selected as Employee of the Month for March. John has demonstrated exceptional performance, including: 99.8% inventory accuracy, 15% productivity increase, and mentoring three new team members. John will receive a $500 bonus and a reserved parking spot for the month.',
      summary: 'Employee of the Month announcement - John Doe',
      category: 'recognition',
      priority: 'medium',
      status: 'active',
      pinned: false,
      author: 'HR Department',
      authorAvatar: null,
      authorRole: 'HR Manager',
      department: 'HR',
      targetAudience: ['All Employees'],
      publishedAt: '2024-03-11 09:00',
      expiresAt: '2024-04-11 23:59',
      updatedAt: '2024-03-11 09:00',
      views: 423,
      likes: 134,
      comments: 28,
      attachments: [],
      image: null,
      tags: ['recognition', 'employee-of-the-month', 'award'],
      readBy: 289,
      totalTarget: 312,
      acknowledged: 245,
      urgent: false,
      history: [
        { timestamp: '2024-03-11 09:00', action: 'Published', user: 'HR Department' },
      ],
    },
    {
      id: 'NOT-006',
      title: 'Urgent: Forklift Recall Notice',
      content: 'Manufacturer recall for Model FL-5000 forklifts. Please cease use immediately and contact maintenance. Affected units: FL-5000 serial numbers LM-20001 through LM-21000. This recall is due to a potential brake system issue. Replacement parts are expected within 48 hours. Temporary replacements are available from the maintenance department.',
      summary: 'URGENT: Forklift recall for Model FL-5000',
      category: 'alert',
      priority: 'urgent',
      status: 'active',
      pinned: true,
      author: 'Safety Department',
      authorAvatar: null,
      authorRole: 'Safety Officer',
      department: 'Safety',
      targetAudience: ['Warehouse Staff', 'Maintenance Team', 'Supervisors'],
      publishedAt: '2024-03-10 08:30',
      expiresAt: '2024-03-20 17:00',
      updatedAt: '2024-03-10 08:30',
      views: 678,
      likes: 12,
      comments: 45,
      attachments: [
        { name: 'recall-notice.pdf', size: '2.1 MB', type: 'pdf' },
        { name: 'affected-serial-numbers.xlsx', size: '0.5 MB', type: 'excel' },
      ],
      tags: ['urgent', 'recall', 'safety', 'forklift'],
      readBy: 156,
      totalTarget: 187,
      acknowledged: 134,
      urgent: true,
      history: [
        { timestamp: '2024-03-10 08:30', action: 'Published', user: 'Safety Department' },
      ],
    },
    {
      id: 'NOT-007',
      title: 'New Break Room Opening',
      content: 'The new break room in Warehouse A is now open! Features include: new vending machines, microwave ovens, refrigerator, coffee station, and seating for 30 people. Grand opening celebration will be held March 15 at noon with free pizza and drinks. Please stop by and check out the new facility!',
      summary: 'New break room now open in Warehouse A',
      category: 'announcement',
      priority: 'low',
      status: 'active',
      pinned: false,
      author: 'Facilities Department',
      authorAvatar: null,
      authorRole: 'Facilities Manager',
      department: 'Facilities',
      targetAudience: ['Warehouse A Staff'],
      publishedAt: '2024-03-09 13:00',
      expiresAt: '2024-04-09 23:59',
      updatedAt: '2024-03-09 13:00',
      views: 234,
      likes: 78,
      comments: 15,
      attachments: [],
      image: null,
      tags: ['facilities', 'break-room', 'announcement'],
      readBy: 134,
      totalTarget: 187,
      acknowledged: 98,
      urgent: false,
      history: [
        { timestamp: '2024-03-09 13:00', action: 'Published', user: 'Facilities Department' },
      ],
    },
    {
      id: 'NOT-008',
      title: 'Quarterly Town Hall Meeting',
      content: 'Quarterly town hall meeting will be held on March 28 at 10:00 AM in the main conference room. Topics include: company performance update, new initiatives, Q&A session. All employees are encouraged to attend. Remote participation available via Teams. Please submit questions in advance to hr@company.com.',
      summary: 'Quarterly town hall meeting - March 28',
      category: 'event',
      priority: 'medium',
      status: 'active',
      pinned: false,
      author: 'Executive Office',
      authorAvatar: null,
      authorRole: 'CEO',
      department: 'Executive',
      targetAudience: ['All Employees'],
      publishedAt: '2024-03-08 11:30',
      expiresAt: '2024-03-28 12:00',
      updatedAt: '2024-03-08 11:30',
      views: 345,
      likes: 45,
      comments: 8,
      attachments: [
        { name: 'agenda.pdf', size: '0.8 MB', type: 'pdf' },
      ],
      tags: ['town-hall', 'meeting', 'quarterly'],
      readBy: 234,
      totalTarget: 312,
      acknowledged: 156,
      urgent: false,
      history: [
        { timestamp: '2024-03-08 11:30', action: 'Published', user: 'Executive Office' },
      ],
    },
    {
      id: 'NOT-009',
      title: 'Updated PPE Requirements',
      content: 'Effective immediately, all warehouse personnel must wear safety vests in addition to existing PPE requirements. New vests are available at the tool crib. This change follows a safety audit recommendation to improve visibility. Non-compliance will result in disciplinary action.',
      summary: 'New safety vest requirement effective immediately',
      category: 'policy',
      priority: 'high',
      status: 'active',
      pinned: true,
      author: 'Safety Department',
      authorAvatar: null,
      authorRole: 'Safety Officer',
      department: 'Safety',
      targetAudience: ['Warehouse Staff', 'Supervisors'],
      publishedAt: '2024-03-07 14:00',
      expiresAt: '2024-04-07 23:59',
      updatedAt: '2024-03-07 14:00',
      views: 456,
      likes: 23,
      comments: 17,
      attachments: [
        { name: 'ppe-requirements.pdf', size: '1.8 MB', type: 'pdf' },
      ],
      tags: ['safety', 'ppe', 'policy'],
      readBy: 167,
      totalTarget: 187,
      acknowledged: 145,
      urgent: true,
      history: [
        { timestamp: '2024-03-07 14:00', action: 'Published', user: 'Safety Department' },
      ],
    },
    {
      id: 'NOT-010',
      title: 'Inventory System Training',
      content: 'Training sessions for the new inventory system features will be held March 18-22. Sign up now! Sessions cover: new mobile app features, advanced reporting, batch operations, and troubleshooting. Each session is 2 hours. Maximum 10 participants per session. Certification will be provided upon completion.',
      summary: 'Training for new inventory system features',
      category: 'training',
      priority: 'medium',
      status: 'active',
      pinned: false,
      author: 'Training Department',
      authorAvatar: null,
      authorRole: 'Training Coordinator',
      department: 'Training',
      targetAudience: ['Inventory Team', 'Supervisors', 'Managers'],
      publishedAt: '2024-03-06 10:00',
      expiresAt: '2024-03-22 17:00',
      updatedAt: '2024-03-06 10:00',
      views: 234,
      likes: 34,
      comments: 12,
      attachments: [
        { name: 'training-schedule.pdf', size: '1.2 MB', type: 'pdf' },
        { name: 'signup-form.xlsx', size: '0.3 MB', type: 'excel' },
      ],
      tags: ['training', 'inventory', 'system'],
      readBy: 123,
      totalTarget: 156,
      acknowledged: 89,
      urgent: false,
      history: [
        { timestamp: '2024-03-06 10:00', action: 'Published', user: 'Training Department' },
      ],
    },
    {
      id: 'NOT-011',
      title: 'Warehouse A Temperature Alert',
      content: 'Temperature in Warehouse A cold storage zone has exceeded normal range. Maintenance has been notified and is investigating. Perishable items have been moved to backup storage as a precaution. Updates will be provided hourly. Please check email for updates.',
      summary: 'Temperature alert in Warehouse A cold storage',
      category: 'alert',
      priority: 'urgent',
      status: 'archived',
      pinned: false,
      author: 'Facilities Department',
      authorAvatar: null,
      authorRole: 'Facilities Manager',
      department: 'Facilities',
      targetAudience: ['Warehouse A Staff', 'Maintenance Team', 'Quality Team'],
      publishedAt: '2024-03-05 08:15',
      expiresAt: '2024-03-05 23:59',
      archivedAt: '2024-03-06 09:00',
      updatedAt: '2024-03-05 08:15',
      views: 567,
      likes: 5,
      comments: 23,
      attachments: [],
      tags: ['alert', 'temperature', 'cold-storage'],
      readBy: 178,
      totalTarget: 187,
      acknowledged: 156,
      urgent: true,
      history: [
        { timestamp: '2024-03-06 09:00', action: 'Archived', user: 'System' },
        { timestamp: '2024-03-05 08:15', action: 'Published', user: 'Facilities Department' },
      ],
    },
    {
      id: 'NOT-012',
      title: 'Welcome New Team Members',
      content: 'Please welcome our new team members who joined this week: Sarah Johnson (Inventory Specialist), Michael Chen (Warehouse Associate), and David Williams (IT Support). They will be starting their orientation today. Please introduce yourselves when you see them!',
      summary: 'New team members joining this week',
      category: 'announcement',
      priority: 'low',
      status: 'active',
      pinned: false,
      author: 'HR Department',
      authorAvatar: null,
      authorRole: 'HR Manager',
      department: 'HR',
      targetAudience: ['All Employees'],
      publishedAt: '2024-03-04 09:30',
      expiresAt: '2024-03-18 23:59',
      updatedAt: '2024-03-04 09:30',
      views: 234,
      likes: 89,
      comments: 34,
      attachments: [],
      tags: ['welcome', 'new-hires', 'announcement'],
      readBy: 198,
      totalTarget: 312,
      acknowledged: 167,
      urgent: false,
      history: [
        { timestamp: '2024-03-04 09:30', action: 'Published', user: 'HR Department' },
      ],
    },
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Notices', count: notices.length },
    { id: 'announcement', name: 'Announcements', count: 3, icon: Megaphone },
    { id: 'alert', name: 'Alerts', count: 2, icon: AlertCircle },
    { id: 'training', name: 'Training', count: 2, icon: GraduationCap },
    { id: 'policy', name: 'Policy', count: 2, icon: FileText },
    { id: 'event', name: 'Events', count: 1, icon: Calendar },
    { id: 'recognition', name: 'Recognition', count: 1, icon: Award },
    { id: 'system', name: 'System', count: 1, icon: Settings },
  ];

  // Priority configuration
  const priorityConfig = {
    urgent: { label: 'Urgent', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    high: { label: 'High', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertTriangle },
    medium: { label: 'Medium', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    low: { label: 'Low', color: 'bg-green-50 text-green-700 border-green-200', icon: Bell },
  };

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    scheduled: { label: 'Scheduled', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    archived: { label: 'Archived', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: FileText },
    draft: { label: 'Draft', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Edit },
  };

  const getPriorityIcon = (priority) => {
    const config = priorityConfig[priority];
    const Icon = config?.icon || Bell;
    return <Icon size={14} />;
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-50 text-gray-700';
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Bell;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'announcement': return <Megaphone size={16} className="text-red-600" />;
      case 'alert': return <AlertCircle size={16} className="text-red-600" />;
      case 'training': return <GraduationCap size={16} className="text-red-600" />;
      case 'policy': return <FileText size={16} className="text-red-600" />;
      case 'event': return <Calendar size={16} className="text-red-600" />;
      case 'recognition': return <Award size={16} className="text-red-600" />;
      case 'system': return <Settings size={16} className="text-red-600" />;
      default: return <Bell size={16} className="text-red-600" />;
    }
  };

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || notice.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || notice.status === selectedStatus;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesPriority && matchesStatus && matchesSearch;
  });

  const pinnedNotices = filteredNotices.filter(n => n.pinned);
  const regularNotices = filteredNotices.filter(n => !n.pinned);

  const stats = {
    total: notices.length,
    active: notices.filter(n => n.status === 'active').length,
    pinned: notices.filter(n => n.pinned).length,
    urgent: notices.filter(n => n.priority === 'urgent').length,
    unread: notices.reduce((sum, n) => sum + (n.totalTarget - n.readBy), 0),
    totalViews: notices.reduce((sum, n) => sum + n.views, 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Notice Board</h1>
            <p className="text-black/50 mt-1">Company announcements, alerts, and important information</p>
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
              onClick={() => setShowHistoryDialog(true)}
            >
              <History size={16} />
              History
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowSettingsDialog(true)}
            >
              <Settings size={16} />
              Settings
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create Notice
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Notices</p>
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
                  <p className="text-xs text-black/50">Active</p>
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
                  <p className="text-xs text-black/50">Pinned</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.pinned}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Pin size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Urgent</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.urgent}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Unread</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.unread}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <EyeOff size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Views</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalViews}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Eye size={18} className="text-purple-600" />
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
              placeholder="Search by title, content, author, or tags..."
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

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
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

      {/* Pinned Notices Section */}
      {pinnedNotices.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
            <Pin size={16} className="text-blue-600" />
            Pinned Notices
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {pinnedNotices.map((notice) => (
              <NoticeCard 
                key={notice.id} 
                notice={notice} 
                onView={() => {
                  setSelectedNotice(notice);
                  setShowDetailsDialog(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Notices Section */}
      <div>
        <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
          <Bell size={16} className="text-red-600" />
          All Notices
        </h2>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {regularNotices.map((notice) => (
              <NoticeCard 
                key={notice.id} 
                notice={notice} 
                onView={() => {
                  setSelectedNotice(notice);
                  setShowDetailsDialog(true);
                }}
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
                    <TableHead className="text-black/50">Title</TableHead>
                    <TableHead className="text-black/50">Category</TableHead>
                    <TableHead className="text-black/50">Priority</TableHead>
                    <TableHead className="text-black/50">Status</TableHead>
                    <TableHead className="text-black/50">Author</TableHead>
                    <TableHead className="text-black/50">Published</TableHead>
                    <TableHead className="text-black/50">Expires</TableHead>
                    <TableHead className="text-black/50 text-right">Views</TableHead>
                    <TableHead className="text-black/50">Read</TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regularNotices.map((notice) => (
                    <TableRow key={notice.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {notice.pinned && <Pin size={12} className="text-blue-600" />}
                          <span>{notice.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {notice.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getPriorityColor(notice.priority))}>
                          {notice.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(notice.status))}>
                          {notice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{notice.author}</TableCell>
                      <TableCell className="text-xs">{notice.publishedAt.split(' ')[0]}</TableCell>
                      <TableCell className="text-xs">{notice.expiresAt.split(' ')[0]}</TableCell>
                      <TableCell className="text-right">{notice.views}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Progress 
                            value={(notice.readBy / notice.totalTarget) * 100} 
                            className="w-16 h-2 bg-[#F5EEE9]" 
                          />
                          <span className="text-xs">{Math.round((notice.readBy / notice.totalTarget) * 100)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            setSelectedNotice(notice);
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
            <CardFooter className="border-t border-[#F5EEE9] p-4">
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-black/50">
                  Showing {regularNotices.length} of {notices.length} notices
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
      </div>

      {/* Create Notice Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Notice</DialogTitle>
            <DialogDescription>
              Create a new notice for the organization
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="content">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="target">Target Audience</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Enter notice title" />
                </div>

                <div className="space-y-2">
                  <Label>Summary</Label>
                  <Input placeholder="Brief summary of the notice" />
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea placeholder="Enter full notice content" rows={6} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="alert">Alert</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="policy">Policy</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="recognition">Recognition</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>

                <div className="space-y-2">
                  <Label>Attachments</Label>
                  <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                    <UploadCloud size={24} className="mx-auto text-black/30 mb-2" />
                    <p className="text-sm text-black/50">Drag files or click to upload</p>
                    <p className="text-xs text-black/30">Support: PDF, DOC, XLS, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="target" className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Departments</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dept-all" />
                      <Label htmlFor="dept-all">All Departments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dept-warehouse" />
                      <Label htmlFor="dept-warehouse">Warehouse</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dept-inventory" />
                      <Label htmlFor="dept-inventory">Inventory</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dept-operations" />
                      <Label htmlFor="dept-operations">Operations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dept-it" />
                      <Label htmlFor="dept-it">IT</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dept-hr" />
                      <Label htmlFor="dept-hr">HR</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Target Roles</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-all" />
                      <Label htmlFor="role-all">All Employees</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-managers" />
                      <Label htmlFor="role-managers">Managers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-supervisors" />
                      <Label htmlFor="role-supervisors">Supervisors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-staff" />
                      <Label htmlFor="role-staff">Staff</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Require Acknowledgment</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="acknowledgment" />
                    <Label htmlFor="acknowledgment">Users must acknowledge receipt</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <RadioGroup defaultValue="draft" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="draft" id="draft" />
                      <Label htmlFor="draft">Draft</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="schedule" id="schedule" />
                      <Label htmlFor="schedule">Schedule</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="publish" id="publish" />
                      <Label htmlFor="publish">Publish Now</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Publish Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Publish Time</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Time</Label>
                    <Input type="time" defaultValue="17:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Pin Notice</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="pin" />
                    <Label htmlFor="pin">Pin to top of notice board</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Notice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notice Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Notice Details</DialogTitle>
          </DialogHeader>

          {selectedNotice && (
            <div className="py-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedNotice.title}</h3>
                  <p className="text-sm text-black/50 mt-1">{selectedNotice.summary}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedNotice.pinned && <Pin size={16} className="text-blue-600" />}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={cn("text-xs border-0", getPriorityColor(selectedNotice.priority))}>
                  {selectedNotice.priority}
                </Badge>
                <Badge className={cn("text-xs border-0", getStatusColor(selectedNotice.status))}>
                  {selectedNotice.status}
                </Badge>
                <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                  {selectedNotice.category}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User size={14} className="text-black/50" />
                  <span>{selectedNotice.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 size={14} className="text-black/50" />
                  <span>{selectedNotice.department}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F5EEE9] rounded-lg whitespace-pre-wrap">
                {selectedNotice.content}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Published</p>
                  <p className="text-sm">{selectedNotice.publishedAt}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Expires</p>
                  <p className="text-sm">{selectedNotice.expiresAt}</p>
                </div>
              </div>

              {selectedNotice.targetAudience && (
                <div>
                  <p className="text-xs text-black/50 mb-1">Target Audience</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedNotice.targetAudience.map((audience) => (
                      <Badge key={audience} variant="outline" className="text-xs border-[#F5EEE9]">
                        {audience}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-2 text-center">
                    <Eye size={14} className="mx-auto text-black/50 mb-1" />
                    <p className="text-lg font-bold">{selectedNotice.views}</p>
                    <p className="text-xs text-black/50">Views</p>
                  </CardContent>
                </Card>
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-2 text-center">
                    <ThumbsUp size={14} className="mx-auto text-black/50 mb-1" />
                    <p className="text-lg font-bold">{selectedNotice.likes}</p>
                    <p className="text-xs text-black/50">Likes</p>
                  </CardContent>
                </Card>
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-2 text-center">
                    <MessageCircle size={14} className="mx-auto text-black/50 mb-1" />
                    <p className="text-lg font-bold">{selectedNotice.comments}</p>
                    <p className="text-xs text-black/50">Comments</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <p className="text-xs text-black/50 mb-1">Read Receipts</p>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(selectedNotice.readBy / selectedNotice.totalTarget) * 100} 
                    className="flex-1 h-2 bg-[#F5EEE9]" 
                  />
                  <span className="text-sm font-medium">
                    {selectedNotice.readBy}/{selectedNotice.totalTarget}
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">{selectedNotice.acknowledged} acknowledged</p>
              </div>

              {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                <div>
                  <p className="text-xs text-black/50 mb-2">Attachments</p>
                  <div className="space-y-2">
                    {selectedNotice.attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 border border-[#F5EEE9] rounded-lg">
                        <div className="flex items-center gap-2">
                          <Paperclip size={14} className="text-blue-600" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-black/50">({file.size})</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7">
                          <Download size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs text-black/50 mb-1">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {selectedNotice.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button variant="outline" className="gap-2">
              <ThumbsUp size={14} />
              Like
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => {
              setShowDetailsDialog(false);
              setShowShareDialog(true);
            }}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
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
            <TooltipContent side="left">Create Notice</TooltipContent>
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
            <TooltipContent side="left">Notice History</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowReportDialog(true)}
              >
                <BarChart3 size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

// Notice Card Component
const NoticeCard = ({ notice, onView }) => {
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'urgent': return <AlertCircle size={14} className="text-red-600" />;
      case 'high': return <AlertTriangle size={14} className="text-orange-600" />;
      case 'medium': return <Clock size={14} className="text-yellow-600" />;
      default: return <Bell size={14} className="text-green-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'announcement': return <Megaphone size={14} className="text-blue-600" />;
      case 'alert': return <AlertCircle size={14} className="text-red-600" />;
      case 'training': return <GraduationCap size={14} className="text-purple-600" />;
      case 'policy': return <FileText size={14} className="text-orange-600" />;
      case 'event': return <Calendar size={14} className="text-green-600" />;
      case 'recognition': return <Award size={14} className="text-yellow-600" />;
      case 'system': return <Settings size={14} className="text-gray-600" />;
      default: return <Bell size={14} className="text-red-600" />;
    }
  };

  return (
    <Card className="border-[#F5EEE9] hover:shadow-lg transition-all group">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#F5EEE9] rounded-lg">
                {getCategoryIcon(notice.category)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={cn("text-xs border-0", getPriorityColor(notice.priority))}>
                    {getPriorityIcon(notice.priority)}
                    <span className="ml-1 capitalize">{notice.priority}</span>
                  </Badge>
                  {notice.pinned && (
                    <Pin size={12} className="text-blue-600" />
                  )}
                </div>
                <h3 className="font-semibold text-black">{notice.title}</h3>
                <p className="text-xs text-black/50 mt-1 line-clamp-1">{notice.summary}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onView}>
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
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Meta Info */}
          <div className="flex items-center gap-2 text-xs text-black/50 mb-2">
            <User size={12} />
            <span>{notice.author}</span>
            <span>•</span>
            <Calendar size={12} />
            <span>{notice.publishedAt.split(' ')[0]}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <Eye size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{notice.views}</p>
            </div>
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <ThumbsUp size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{notice.likes}</p>
            </div>
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <MessageCircle size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{notice.comments}</p>
            </div>
          </div>

          {/* Read Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-black/50">Read by</span>
              <span className="text-xs font-medium">
                {Math.round((notice.readBy / notice.totalTarget) * 100)}%
              </span>
            </div>
            <Progress 
              value={(notice.readBy / notice.totalTarget) * 100} 
              className="h-2 bg-[#F5EEE9]"
            />
          </div>

          {/* Attachments */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <Paperclip size={12} className="text-black/30" />
              <span className="text-xs text-black/50">{notice.attachments.length} files</span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {notice.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] border-[#F5EEE9]">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
            <span>Expires: {notice.expiresAt.split(' ')[0]}</span>
            {notice.urgent && (
              <Badge className="bg-red-100 text-red-700 text-[8px]">URGENT</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticeBoardPage;