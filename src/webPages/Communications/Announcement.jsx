// app/dashboard/announcements/page.js
'use client';

import { useState } from 'react';
import { 
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
  CheckCircle,
  MoreVertical,
  Plus,
  User,
  Heart,
  Award,
  MessageCircle,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Settings,
  History,
  BarChart3,
  EyeIcon as EyeIconCustom,
  PrinterIcon as PrinterIconCustom,
  GraduationCap,
  Sparkles,
  Cake,
  Shield,
  
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AnnouncementsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample announcements data
  const announcements = [
    {
      id: 'ANN-001',
      title: 'Company Picnic 2024',
      summary: 'Annual company picnic at Riverside Park - food, games, and fun for all!',
      content: 'Join us for our annual company picnic on Saturday, June 15th from 11am to 4pm at Riverside Park. We will have BBQ lunch, games, music, and activities for all ages. Families are welcome! Please RSVP by June 1st so we can plan accordingly. Transportation will be provided from the office at 10am.',
      type: 'event',
      audience: 'all',
      status: 'published',
      pinned: true,
      author: 'HR Department',
      authorRole: 'HR Manager',
      department: 'HR',
      publishedAt: '2024-05-15 09:00',
      eventDate: '2024-06-15 11:00',
      eventEndDate: '2024-06-15 16:00',
      location: 'Riverside Park',
      views: 456,
      likes: 89,
      comments: 23,
      rsvpCount: 134,
      attachments: [
        { name: 'picnic-flyer.pdf', size: '2.1 MB', type: 'pdf' },
        { name: 'map-directions.pdf', size: '1.2 MB', type: 'pdf' },
      ],
      image: '/images/picnic.jpg',
      tags: ['social', 'family', 'outdoor'],
      readBy: 234,
      totalTarget: 312,
      acknowledged: 156,
      urgent: false,
      history: [
        { timestamp: '2024-05-15 09:00', action: 'Published', user: 'HR Department' },
      ],
    },
    {
      id: 'ANN-002',
      title: 'Employee of the Month: Sarah Johnson',
      summary: 'Congratulations to Sarah Johnson from the Inventory Team for being selected as Employee of the Month for May!',
      content: 'We are thrilled to announce Sarah Johnson as our Employee of the Month for May 2024. Sarah has demonstrated exceptional performance, including: 100% inventory accuracy for the past 3 months, implemented a new organization system that saved 15% in picking time, and trained 4 new team members. Sarah will receive a $500 bonus and a reserved parking spot for the month. Please join us in congratulating Sarah!',
      type: 'recognition',
      audience: 'all',
      status: 'published',
      pinned: true,
      author: 'HR Department',
      authorRole: 'HR Manager',
      department: 'HR',
      publishedAt: '2024-05-14 10:30',
      views: 389,
      likes: 156,
      comments: 45,
      attachments: [],
      image: null,
      tags: ['recognition', 'employee-of-the-month', 'award'],
      readBy: 278,
      totalTarget: 312,
      acknowledged: 245,
      urgent: false,
      history: [
        { timestamp: '2024-05-14 10:30', action: 'Published', user: 'HR Department' },
      ],
    },
    {
      id: 'ANN-003',
      title: 'New Wellness Program Launch',
      summary: 'Introducing our new employee wellness program with gym discounts, mental health resources, and wellness challenges!',
      content: 'We are excited to announce the launch of our new employee wellness program, "Healthy You, Healthy Us". Starting June 1st, all employees will have access to: discounted gym memberships (20% off at participating fitness centers), free mental health counseling sessions (up to 6 sessions per year), quarterly wellness challenges with prizes, and monthly wellness webinars. Visit the HR portal to enroll and learn more.',
      type: 'program',
      audience: 'all',
      status: 'published',
      pinned: false,
      author: 'HR Department',
      authorRole: 'Wellness Coordinator',
      department: 'HR',
      publishedAt: '2024-05-13 14:15',
      views: 312,
      likes: 67,
      comments: 18,
      attachments: [
        { name: 'wellness-brochure.pdf', size: '3.4 MB', type: 'pdf' },
        { name: 'gym-discounts.pdf', size: '1.8 MB', type: 'pdf' },
      ],
      tags: ['wellness', 'health', 'benefits'],
      readBy: 189,
      totalTarget: 312,
      acknowledged: 134,
      urgent: false,
      history: [
        { timestamp: '2024-05-13 14:15', action: 'Published', user: 'HR Department' },
      ],
    },
    {
      id: 'ANN-004',
      title: 'Warehouse Expansion Complete',
      summary: 'Warehouse B expansion project is now complete with 50% more storage capacity!',
      content: 'We are pleased to announce that the Warehouse B expansion project has been successfully completed. The expansion adds 50,000 square feet of storage space, increasing our total capacity by 50%. New features include: 20 additional loading docks, automated storage and retrieval system, improved lighting and ventilation, and expanded break room for warehouse staff. A ribbon-cutting ceremony will be held on May 20th at 10am.',
      type: 'facility',
      audience: 'warehouse',
      status: 'published',
      pinned: true,
      author: 'Operations Department',
      authorRole: 'Operations Director',
      department: 'Operations',
      publishedAt: '2024-05-12 11:00',
      views: 267,
      likes: 45,
      comments: 12,
      attachments: [
        { name: 'expansion-photos.pdf', size: '5.2 MB', type: 'pdf' },
        { name: 'new-layout.pdf', size: '2.3 MB', type: 'pdf' },
      ],
      image: null,
      tags: ['warehouse', 'expansion', 'facility'],
      readBy: 178,
      totalTarget: 187,
      acknowledged: 145,
      urgent: false,
      history: [
        { timestamp: '2024-05-12 11:00', action: 'Published', user: 'Operations Department' },
      ],
    },
    {
      id: 'ANN-005',
      title: 'Holiday Schedule: Memorial Day',
      summary: 'Office and warehouse hours for Memorial Day weekend',
      content: 'Please note the following schedule for Memorial Day weekend (May 25-27): Friday, May 24: Normal operations, Saturday, May 25: Warehouse closed, office closed, Sunday, May 26: Closed, Monday, May 27: Closed for holiday. Operations resume normal hours on Tuesday, May 28. Please plan your work accordingly.',
      type: 'holiday',
      audience: 'all',
      status: 'published',
      pinned: false,
      author: 'Administration',
      authorRole: 'Office Manager',
      department: 'Admin',
      publishedAt: '2024-05-11 09:45',
      views: 412,
      likes: 23,
      comments: 8,
      attachments: [],
      tags: ['holiday', 'schedule', 'memorial-day'],
      readBy: 289,
      totalTarget: 312,
      acknowledged: 245,
      urgent: false,
      history: [
        { timestamp: '2024-05-11 09:45', action: 'Published', user: 'Administration' },
      ],
    },
    {
      id: 'ANN-006',
      title: 'New ERP System Training',
      summary: 'Mandatory training sessions for the new ERP system starting June 3rd',
      content: 'As part of our digital transformation initiative, we will be implementing a new ERP system starting July 1st. All employees who use inventory, purchasing, or accounting systems must attend training. Sessions will be held: June 3-7 (Warehouse Staff), June 10-14 (Inventory Team), June 17-21 (Purchasing & Accounting). Please sign up via the training portal. Training is mandatory.',
      type: 'training',
      audience: 'operations',
      status: 'published',
      pinned: true,
      author: 'IT Department',
      authorRole: 'IT Training Manager',
      department: 'IT',
      publishedAt: '2024-05-10 13:30',
      views: 345,
      likes: 34,
      comments: 21,
      attachments: [
        { name: 'training-schedule.pdf', size: '1.5 MB', type: 'pdf' },
        { name: 'erp-quick-guide.pdf', size: '2.1 MB', type: 'pdf' },
      ],
      tags: ['training', 'erp', 'mandatory'],
      readBy: 234,
      totalTarget: 267,
      acknowledged: 189,
      urgent: true,
      history: [
        { timestamp: '2024-05-10 13:30', action: 'Published', user: 'IT Department' },
      ],
    },
    {
      id: 'ANN-007',
      title: 'Summer Hours Begin June 1',
      summary: 'Summer hours schedule: Early release on Fridays starting June 1',
      content: 'We are pleased to announce that summer hours will begin on June 1st and run through August 30th. During this period, employees may leave at 2:00 PM on Fridays, provided that all work is completed and business needs are met. This applies to all departments. Please coordinate with your supervisor to ensure coverage.',
      type: 'policy',
      audience: 'all',
      status: 'scheduled',
      pinned: false,
      author: 'HR Department',
      authorRole: 'HR Director',
      department: 'HR',
      publishedAt: '2024-05-28 08:00',
      views: 0,
      likes: 0,
      comments: 0,
      attachments: [],
      tags: ['summer', 'hours', 'policy'],
      readBy: 0,
      totalTarget: 312,
      acknowledged: 0,
      urgent: false,
      history: [
        { timestamp: '2024-05-09 15:20', action: 'Scheduled', user: 'HR Department' },
      ],
    },
    {
      id: 'ANN-008',
      title: 'Charity Food Drive',
      summary: 'Annual food drive for local food bank - May 20-31',
      content: 'Our annual food drive to support the Community Food Bank will run from May 20-31. Please bring non-perishable food items to the collection bins in the main lobby. Most needed items include: canned vegetables, canned fruit, peanut butter, rice, pasta, cereal, and baby food. The department with the most donations wins a pizza party! Let\'s show our community spirit!',
      type: 'community',
      audience: 'all',
      status: 'published',
      pinned: false,
      author: 'Community Committee',
      authorRole: 'Committee Lead',
      department: 'CSR',
      publishedAt: '2024-05-08 10:00',
      views: 278,
      likes: 67,
      comments: 15,
      attachments: [
        { name: 'food-drive-flyer.pdf', size: '1.8 MB', type: 'pdf' },
      ],
      tags: ['charity', 'community', 'food-drive'],
      readBy: 198,
      totalTarget: 312,
      acknowledged: 156,
      urgent: false,
      history: [
        { timestamp: '2024-05-08 10:00', action: 'Published', user: 'Community Committee' },
      ],
    },
    {
      id: 'ANN-009',
      title: 'IT System Maintenance: May 18',
      summary: 'Scheduled maintenance for inventory systems on May 18 (8pm - midnight)',
      content: 'The inventory management system will undergo scheduled maintenance on Saturday, May 18 from 8:00 PM to midnight. During this time, the system will be unavailable. Please ensure all transactions are completed before 7:30 PM. The system will be upgraded to version 3.5 with new features including improved reporting and mobile access.',
      type: 'system',
      audience: 'all',
      status: 'published',
      pinned: false,
      author: 'IT Department',
      authorRole: 'Systems Administrator',
      department: 'IT',
      publishedAt: '2024-05-07 14:45',
      views: 423,
      likes: 12,
      comments: 9,
      attachments: [],
      tags: ['maintenance', 'system', 'downtime'],
      readBy: 267,
      totalTarget: 312,
      acknowledged: 234,
      urgent: false,
      history: [
        { timestamp: '2024-05-07 14:45', action: 'Published', user: 'IT Department' },
      ],
    },
    {
      id: 'ANN-010',
      title: 'Welcome New Hires - May 2024',
      summary: 'Please welcome our newest team members joining this month!',
      content: 'Please join us in welcoming our new team members for May 2024: Warehouse Associates: Michael Chen, David Williams, Lisa Garcia, Inventory Specialists: Jennifer Lee, Robert Taylor, IT Support: Amanda Martinez, Customer Service: Kevin Johnson. They will be completing orientation this week. Please introduce yourselves and help them feel welcome!',
      type: 'welcome',
      audience: 'all',
      status: 'published',
      pinned: false,
      author: 'HR Department',
      authorRole: 'Recruiting Manager',
      department: 'HR',
      publishedAt: '2024-05-06 09:15',
      views: 512,
      likes: 134,
      comments: 42,
      attachments: [],
      tags: ['welcome', 'new-hires', 'onboarding'],
      readBy: 298,
      totalTarget: 312,
      acknowledged: 267,
      urgent: false,
      history: [
        { timestamp: '2024-05-06 09:15', action: 'Published', user: 'HR Department' },
      ],
    },
    {
      id: 'ANN-011',
      title: 'Safety Milestone: 365 Days Without Lost-Time Injury',
      summary: 'Congratulations to all employees for reaching 365 days without a lost-time injury!',
      content: 'We are proud to announce that we have reached a significant safety milestone: 365 days without a lost-time injury! This achievement is a testament to everyone\'s commitment to safety. To celebrate, we will be hosting a safety celebration lunch on May 24th at noon in the cafeteria. All employees are invited. Thank you for making safety a priority every day!',
      type: 'recognition',
      audience: 'all',
      status: 'published',
      pinned: true,
      author: 'Safety Department',
      authorRole: 'Safety Director',
      department: 'Safety',
      publishedAt: '2024-05-05 11:30',
      views: 389,
      likes: 178,
      comments: 34,
      attachments: [],
      tags: ['safety', 'milestone', 'celebration'],
      readBy: 289,
      totalTarget: 312,
      acknowledged: 267,
      urgent: false,
      history: [
        { timestamp: '2024-05-05 11:30', action: 'Published', user: 'Safety Department' },
      ],
    },
    {
      id: 'ANN-012',
      title: 'Quarterly Bonus Payout',
      summary: 'Q2 bonus payouts will be included in the June 15 paycheck',
      content: 'We are pleased to announce that Q2 bonus payouts will be included in the June 15 paycheck. Bonuses are based on company performance and individual contributions. Please review your bonus statement in the HR portal. If you have any questions, please contact HR. Congratulations on a successful quarter!',
      type: 'financial',
      audience: 'all',
      status: 'draft',
      pinned: false,
      author: 'Finance Department',
      authorRole: 'Finance Director',
      department: 'Finance',
      publishedAt: null,
      views: 0,
      likes: 0,
      comments: 0,
      attachments: [],
      tags: ['bonus', 'financial', 'compensation'],
      readBy: 0,
      totalTarget: 312,
      acknowledged: 0,
      urgent: false,
      history: [
        { timestamp: '2024-05-04 16:20', action: 'Draft Created', user: 'Finance Department' },
      ],
    },
  ];

  // Announcement types
  const announcementTypes = [
    { id: 'event', name: 'Event', icon: Calendar, color: 'bg-blue-100 text-blue-700' },
    { id: 'recognition', name: 'Recognition', icon: Award, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'program', name: 'Program', icon: Sparkles, color: 'bg-purple-100 text-purple-700' },
    { id: 'facility', name: 'Facility', icon: Building2, color: 'bg-green-100 text-green-700' },
    { id: 'holiday', name: 'Holiday', icon: Cake, color: 'bg-pink-100 text-pink-700' },
    { id: 'training', name: 'Training', icon: GraduationCap, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'policy', name: 'Policy', icon: FileText, color: 'bg-orange-100 text-orange-700' },
    { id: 'community', name: 'Community', icon: Heart, color: 'bg-red-100 text-red-700' },
    { id: 'system', name: 'System', icon: Settings, color: 'bg-gray-100 text-gray-700' },
    { id: 'welcome', name: 'Welcome', icon: Users, color: 'bg-teal-100 text-teal-700' },
    { id: 'financial', name: 'Financial', icon: Award, color: 'bg-emerald-100 text-emerald-700' },
    { id: 'safety', name: 'Safety', icon: Shield, color: 'bg-cyan-100 text-cyan-700' },
  ];

  // Audience types
  const audienceTypes = [
    { id: 'all', name: 'All Employees', count: 8 },
    { id: 'warehouse', name: 'Warehouse Staff', count: 1 },
    { id: 'operations', name: 'Operations', count: 1 },
    { id: 'office', name: 'Office Staff', count: 1 },
    { id: 'managers', name: 'Managers', count: 1 },
  ];

  // Status configuration
  const statusConfig = {
    published: { label: 'Published', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    scheduled: { label: 'Scheduled', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    draft: { label: 'Draft', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: FileText },
    archived: { label: 'Archived', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: History },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getAnnouncementTypeColor = (type) => {
    const found = announcementTypes.find(t => t.id === type);
    return found?.color || 'bg-gray-100 text-gray-700';
  };

  const getAnnouncementTypeIcon = (type) => {
    const found = announcementTypes.find(t => t.id === type);
    const Icon = found?.icon || Megaphone;
    return Icon;
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesType = selectedType === 'all' || announcement.type === selectedType;
    const matchesAudience = selectedAudience === 'all' || announcement.audience === selectedAudience;
    const matchesStatus = selectedStatus === 'all' || announcement.status === selectedStatus;
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesType && matchesAudience && matchesStatus && matchesSearch;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.pinned);

  const stats = {
    total: announcements.length,
    published: announcements.filter(a => a.status === 'published').length,
    pinned: announcements.filter(a => a.pinned).length,
    scheduled: announcements.filter(a => a.status === 'scheduled').length,
    totalViews: announcements.reduce((sum, a) => sum + a.views, 0),
    totalLikes: announcements.reduce((sum, a) => sum + a.likes, 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Announcements</h1>
            <p className="text-black/50 mt-1">Company news, events, and important updates</p>
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
              onClick={() => setShowReportDialog(true)}
            >
              <BarChart3 size={16} />
              Analytics
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create Announcement
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Announcements</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Megaphone size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Published</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.published}</p>
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
                  <p className="text-xs text-black/50">Scheduled</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.scheduled}</p>
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
                  <p className="text-xs text-black/50">Total Views</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalViews}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Eye size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Likes</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.totalLikes}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Heart size={18} className="text-red-600" />
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

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {announcementTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedAudience} onValueChange={setSelectedAudience}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Audiences</SelectItem>
              {audienceTypes.map(audience => (
                <SelectItem key={audience.id} value={audience.id}>{audience.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
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

      {/* Pinned Announcements Section */}
      {pinnedAnnouncements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
            <Pin size={16} className="text-blue-600" />
            Pinned Announcements
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {pinnedAnnouncements.map((announcement) => (
              <AnnouncementCard 
                key={announcement.id} 
                announcement={announcement} 
                onView={() => {
                  setSelectedAnnouncement(announcement);
                  setShowDetailsDialog(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Announcements Section */}
      <div>
        <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
          <Megaphone size={16} className="text-red-600" />
          All Announcements
        </h2>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {regularAnnouncements.map((announcement) => (
              <AnnouncementCard 
                key={announcement.id} 
                announcement={announcement} 
                onView={() => {
                  setSelectedAnnouncement(announcement);
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
                    <TableHead className="text-black/50">Type</TableHead>
                    <TableHead className="text-black/50">Audience</TableHead>
                    <TableHead className="text-black/50">Status</TableHead>
                    <TableHead className="text-black/50">Author</TableHead>
                    <TableHead className="text-black/50">Published</TableHead>
                    <TableHead className="text-black/50 text-right">Views</TableHead>
                    <TableHead className="text-black/50 text-right">Likes</TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regularAnnouncements.map((announcement) => (
                    <TableRow key={announcement.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {announcement.pinned && <Pin size={12} className="text-blue-600" />}
                          <span>{announcement.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getAnnouncementTypeColor(announcement.type))}>
                          {announcement.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {announcement.audience}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(announcement.status))}>
                          {announcement.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{announcement.author}</TableCell>
                      <TableCell className="text-xs">{announcement.publishedAt?.split(' ')[0] || '—'}</TableCell>
                      <TableCell className="text-right">{announcement.views}</TableCell>
                      <TableCell className="text-right">{announcement.likes}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            setSelectedAnnouncement(announcement);
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
                  Showing {regularAnnouncements.length} of {announcements.length} announcements
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

      {/* Create Announcement Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Announcement</DialogTitle>
            <DialogDescription>
              Create a new company announcement
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="content">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Enter announcement title" />
                </div>

                <div className="space-y-2">
                  <Label>Summary</Label>
                  <Input placeholder="Brief summary of the announcement" />
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea placeholder="Enter full announcement content" rows={6} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {announcementTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="warehouse">Warehouse</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
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
                    <Upload size={24} className="mx-auto text-black/30 mb-2" />
                    <p className="text-sm text-black/50">Drag files or click to upload</p>
                    <p className="text-xs text-black/30">Support: PDF, DOC, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="audience" className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <RadioGroup defaultValue="all">
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All Employees</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="warehouse" id="warehouse" />
                      <Label htmlFor="warehouse">Warehouse Staff</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="operations" id="operations" />
                      <Label htmlFor="operations">Operations Team</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="office" id="office" />
                      <Label htmlFor="office">Office Staff</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="managers" id="managers" />
                      <Label htmlFor="managers">Managers</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Require Acknowledgment</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="acknowledge" />
                    <Label htmlFor="acknowledge">Employees must acknowledge receipt</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <RadioGroup defaultValue="draft">
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="draft" id="draft" />
                      <Label htmlFor="draft">Save as Draft</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="schedule" id="schedule" />
                      <Label htmlFor="schedule">Schedule for Later</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
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

                <div className="space-y-2">
                  <Label>Expiry Date (Optional)</Label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <Label>Pin Announcement</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="pin" />
                    <Label htmlFor="pin">Pin to top of announcements</Label>
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
              Create Announcement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Announcement Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Announcement Details</DialogTitle>
          </DialogHeader>

          {selectedAnnouncement && (
            <div className="py-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedAnnouncement.title}</h3>
                  <p className="text-sm text-black/50 mt-1">{selectedAnnouncement.summary}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedAnnouncement.pinned && <Pin size={16} className="text-blue-600" />}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={cn("text-xs", getAnnouncementTypeColor(selectedAnnouncement.type))}>
                  {selectedAnnouncement.type}
                </Badge>
                <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                  {selectedAnnouncement.audience}
                </Badge>
                <Badge className={cn("text-xs border-0", getStatusColor(selectedAnnouncement.status))}>
                  {selectedAnnouncement.status}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User size={14} className="text-black/50" />
                  <span>{selectedAnnouncement.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 size={14} className="text-black/50" />
                  <span>{selectedAnnouncement.department}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F5EEE9] rounded-lg whitespace-pre-wrap">
                {selectedAnnouncement.content}
              </div>

              {selectedAnnouncement.eventDate && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-black/50">Event Date</p>
                    <p className="text-sm">{selectedAnnouncement.eventDate}</p>
                  </div>
                  {selectedAnnouncement.eventEndDate && (
                    <div>
                      <p className="text-xs text-black/50">Event End</p>
                      <p className="text-sm">{selectedAnnouncement.eventEndDate}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedAnnouncement.location && (
                <div>
                  <p className="text-xs text-black/50">Location</p>
                  <p className="text-sm">{selectedAnnouncement.location}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Published</p>
                  <p className="text-sm">{selectedAnnouncement.publishedAt || 'Not published'}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-2 text-center">
                    <Eye size={14} className="mx-auto text-black/50 mb-1" />
                    <p className="text-lg font-bold">{selectedAnnouncement.views}</p>
                    <p className="text-xs text-black/50">Views</p>
                  </CardContent>
                </Card>
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-2 text-center">
                    <Heart size={14} className="mx-auto text-black/50 mb-1" />
                    <p className="text-lg font-bold">{selectedAnnouncement.likes}</p>
                    <p className="text-xs text-black/50">Likes</p>
                  </CardContent>
                </Card>
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-2 text-center">
                    <MessageCircle size={14} className="mx-auto text-black/50 mb-1" />
                    <p className="text-lg font-bold">{selectedAnnouncement.comments}</p>
                    <p className="text-xs text-black/50">Comments</p>
                  </CardContent>
                </Card>
              </div>

              {selectedAnnouncement.rsvpCount !== undefined && (
                <div>
                  <p className="text-xs text-black/50 mb-1">RSVP Count</p>
                  <p className="text-lg font-bold">{selectedAnnouncement.rsvpCount}</p>
                </div>
              )}

              <div>
                <p className="text-xs text-black/50 mb-1">Read Receipts</p>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(selectedAnnouncement.readBy / selectedAnnouncement.totalTarget) * 100} 
                    className="flex-1 h-2 bg-[#F5EEE9]" 
                  />
                  <span className="text-sm font-medium">
                    {selectedAnnouncement.readBy}/{selectedAnnouncement.totalTarget}
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">{selectedAnnouncement.acknowledged} acknowledged</p>
              </div>

              {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                <div>
                  <p className="text-xs text-black/50 mb-2">Attachments</p>
                  <div className="space-y-2">
                    {selectedAnnouncement.attachments.map((file, idx) => (
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
                  {selectedAnnouncement.tags.map((tag) => (
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
              <Heart size={14} />
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
            <TooltipContent side="left">Create Announcement</TooltipContent>
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

// Announcement Card Component
const AnnouncementCard = ({ announcement, onView }) => {
  const getTypeIcon = (type) => {
    switch(type) {
      case 'event': return <Calendar size={14} className="text-blue-600" />;
      case 'recognition': return <Award size={14} className="text-yellow-600" />;
      case 'program': return <Sparkles size={14} className="text-purple-600" />;
      case 'facility': return <Building2 size={14} className="text-green-600" />;
      case 'holiday': return <Cake size={14} className="text-pink-600" />;
      case 'training': return <GraduationCap size={14} className="text-indigo-600" />;
      case 'policy': return <FileText size={14} className="text-orange-600" />;
      case 'community': return <Heart size={14} className="text-red-600" />;
      case 'system': return <Settings size={14} className="text-gray-600" />;
      case 'welcome': return <Users size={14} className="text-teal-600" />;
      case 'financial': return <Award size={14} className="text-emerald-600" />;
      case 'safety': return <Shield size={14} className="text-cyan-600" />;
      default: return <Megaphone size={14} className="text-red-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'event': return 'bg-blue-100 text-blue-700';
      case 'recognition': return 'bg-yellow-100 text-yellow-700';
      case 'program': return 'bg-purple-100 text-purple-700';
      case 'facility': return 'bg-green-100 text-green-700';
      case 'holiday': return 'bg-pink-100 text-pink-700';
      case 'training': return 'bg-indigo-100 text-indigo-700';
      case 'policy': return 'bg-orange-100 text-orange-700';
      case 'community': return 'bg-red-100 text-red-700';
      case 'system': return 'bg-gray-100 text-gray-700';
      case 'welcome': return 'bg-teal-100 text-teal-700';
      case 'financial': return 'bg-emerald-100 text-emerald-700';
      case 'safety': return 'bg-cyan-100 text-cyan-700';
      default: return 'bg-red-100 text-red-700';
    }
  };

  return (
    <Card className="border-[#F5EEE9] hover:shadow-lg transition-all group">
      <CardContent className="p-0">
        {/* Header */}
        <div className={cn("p-4 rounded-t-lg border-b border-[#F5EEE9]", getTypeColor(announcement.type))}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/30 rounded-lg backdrop-blur-sm">
                {getTypeIcon(announcement.type)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs border-white/30 text-white bg-white/20">
                    {announcement.type}
                  </Badge>
                  {announcement.pinned && (
                    <Pin size={12} className="text-white" />
                  )}
                </div>
                <h3 className="font-semibold text-white">{announcement.title}</h3>
                <p className="text-xs text-white/80 mt-1 line-clamp-1">{announcement.summary}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
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
            <span>{announcement.author}</span>
            <span>•</span>
            <Calendar size={12} />
            <span>{announcement.publishedAt?.split(' ')[0] || 'Draft'}</span>
          </div>

          {/* Audience Badge */}
          <div className="mb-2">
            <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
              {announcement.audience}
            </Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <Eye size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{announcement.views}</p>
            </div>
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <Heart size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{announcement.likes}</p>
            </div>
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <MessageCircle size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{announcement.comments}</p>
            </div>
          </div>

          {/* Read Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-black/50">Read by</span>
              <span className="text-xs font-medium">
                {Math.round((announcement.readBy / announcement.totalTarget) * 100)}%
              </span>
            </div>
            <Progress 
              value={(announcement.readBy / announcement.totalTarget) * 100} 
              className="h-2 bg-[#F5EEE9]"
            />
          </div>

          {/* Attachments */}
          {announcement.attachments && announcement.attachments.length > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <Paperclip size={12} className="text-black/30" />
              <span className="text-xs text-black/50">{announcement.attachments.length} files</span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {announcement.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] border-[#F5EEE9]">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          {announcement.eventDate && (
            <div className="flex items-center gap-1 text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
              <Calendar size={10} />
              <span>Event: {announcement.eventDate.split(' ')[0]}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementsPage;