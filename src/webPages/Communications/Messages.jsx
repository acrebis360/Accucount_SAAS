// app/dashboard/messages/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Mail,
  Send,
  Inbox,
  Star,
  Archive,
  Trash2,
  Paperclip,
  Image,
  FileText,
  Download,
  Upload,
  Search,
  RefreshCw,
  MoreVertical,
  Plus,
  User,
  Reply,
  ReplyAll,
  Forward,
  Printer as PrinterIcon,
  Settings,
  Sliders,
  History,
  Activity,
  Bell,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedStarred, setSelectedStarred] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);

  // Sample messages data
  const messages = {
    inbox: [
      {
        id: 'MSG-001',
        from: {
          name: 'John Smith',
          email: 'john.smith@company.com',
          avatar: null,
          initials: 'JS',
          department: 'Operations',
        },
        to: [
          { name: 'Current User', email: 'user@company.com' },
        ],
        cc: [],
        bcc: [],
        subject: 'Inventory Count Schedule for March',
        preview: 'Please review the attached inventory count schedule for March. We need to coordinate with the warehouse team to ensure all areas are covered.',
        content: 'Hello Team,\n\nPlease review the attached inventory count schedule for March. We need to coordinate with the warehouse team to ensure all areas are covered.\n\nThe schedule includes:\n- March 15: Warehouse A full count\n- March 18: Warehouse B cycle count\n- March 22: Store A inventory audit\n\nPlease confirm your availability by end of day Friday.\n\nBest regards,\nJohn',
        date: '2024-03-15 10:30',
        read: false,
        starred: true,
        important: true,
        attachments: [
          { name: 'inventory-schedule-march.pdf', size: '1.2 MB', type: 'pdf' },
          { name: 'count-instructions.docx', size: '0.8 MB', type: 'doc' },
        ],
        labels: ['work', 'inventory'],
        thread: [
          {
            id: 'MSG-001-1',
            from: 'Jane Smith',
            date: '2024-03-15 11:45',
            content: 'I can cover Warehouse A on March 15.',
          },
          {
            id: 'MSG-001-2',
            from: 'Mike Johnson',
            date: '2024-03-15 13:20',
            content: 'Store A audit on March 22 works for me.',
          },
        ],
        folder: 'inbox',
      },
      {
        id: 'MSG-002',
        from: {
          name: 'Sarah Wilson',
          email: 'sarah.wilson@company.com',
          avatar: null,
          initials: 'SW',
          department: 'HR',
        },
        to: [
          { name: 'Current User', email: 'user@company.com' },
        ],
        cc: [],
        bcc: [],
        subject: 'Team Meeting - March 20',
        preview: 'Reminder: Monthly team meeting this Wednesday at 10 AM in Conference Room B.',
        content: 'Hi Everyone,\n\nThis is a reminder that our monthly team meeting will be held this Wednesday, March 20 at 10:00 AM in Conference Room B.\n\nAgenda:\n- Project updates\n- Q2 planning\n- Process improvements\n- Open discussion\n\nPlease come prepared with your updates.\n\nThanks,\nSarah',
        date: '2024-03-14 14:15',
        read: true,
        starred: false,
        important: false,
        attachments: [],
        labels: ['meeting'],
        folder: 'inbox',
      },
      {
        id: 'MSG-003',
        from: {
          name: 'IT Support',
          email: 'support@company.com',
          avatar: null,
          initials: 'IT',
          department: 'IT',
        },
        to: [
          { name: 'Current User', email: 'user@company.com' },
        ],
        cc: [],
        bcc: [],
        subject: 'System Maintenance Notification',
        preview: 'Scheduled maintenance for inventory system on March 18 from 2-4 AM.',
        content: 'Dear User,\n\nThe inventory management system will undergo scheduled maintenance on March 18 from 2:00 AM to 4:00 AM. During this time, the system will be unavailable.\n\nPlease ensure all work is saved before this time.\n\nThank you,\nIT Support',
        date: '2024-03-13 09:00',
        read: false,
        starred: false,
        important: true,
        attachments: [],
        labels: ['system', 'maintenance'],
        folder: 'inbox',
      },
      {
        id: 'MSG-004',
        from: {
          name: 'David Lee',
          email: 'david.lee@company.com',
          avatar: null,
          initials: 'DL',
          department: 'Warehouse',
        },
        to: [
          { name: 'Current User', email: 'user@company.com' },
        ],
        cc: [],
        bcc: [],
        subject: 'New Equipment Request',
        preview: 'Requesting approval for new barcode scanners for the warehouse team.',
        content: 'Hi,\n\nI would like to request approval for 5 new barcode scanners for the warehouse team. Our current scanners are over 3 years old and experiencing frequent issues.\n\nEstimated cost: $2,500\n\nPlease let me know if you need any additional information.\n\nThanks,\nDavid',
        date: '2024-03-12 16:45',
        read: true,
        starred: true,
        important: false,
        attachments: [
          { name: 'scanner-quote.pdf', size: '0.5 MB', type: 'pdf' },
        ],
        labels: ['approval', 'equipment'],
        folder: 'inbox',
      },
      {
        id: 'MSG-005',
        from: {
          name: 'Emma Watson',
          email: 'emma.watson@company.com',
          avatar: null,
          initials: 'EW',
          department: 'Training',
        },
        to: [
          { name: 'Current User', email: 'user@company.com' },
        ],
        cc: [],
        bcc: [],
        subject: 'Safety Training Completion',
        preview: 'All team members have completed the required safety training.',
        content: 'Hi,\n\nI am pleased to inform you that all team members have successfully completed the required safety training for Q1.\n\nCertificates are attached for your records.\n\nBest regards,\nEmma',
        date: '2024-03-11 11:30',
        read: true,
        starred: false,
        important: false,
        attachments: [
          { name: 'training-certificates.pdf', size: '3.2 MB', type: 'pdf' },
        ],
        labels: ['training', 'safety'],
        folder: 'inbox',
      },
    ],
    sent: [
      {
        id: 'MSG-101',
        to: [
          { name: 'John Smith', email: 'john.smith@company.com' },
        ],
        cc: [],
        bcc: [],
        subject: 'Re: Inventory Count Schedule for March',
        preview: 'Confirmed availability for March 15 count.',
        content: 'Hi John,\n\nI can confirm my availability for the March 15 count at Warehouse A.\n\nI will coordinate with the team to ensure we have enough staff.\n\nThanks,\n[Your Name]',
        date: '2024-03-15 14:20',
        read: true,
        starred: false,
        attachments: [],
        labels: ['work', 'inventory'],
        folder: 'sent',
      },
      {
        id: 'MSG-102',
        to: [
          { name: 'Sarah Wilson', email: 'sarah.wilson@company.com' },
        ],
        cc: [],
        bcc: [],
        subject: 'Q2 Planning Document',
        preview: 'Attached is the draft Q2 planning document for review.',
        content: 'Hi Sarah,\n\nPlease find attached the draft Q2 planning document for your review. I have included our team\'s goals and resource requirements.\n\nLet me know if you have any questions or suggestions.\n\nBest regards,\n[Your Name]',
        date: '2024-03-10 09:45',
        read: true,
        starred: false,
        attachments: [
          { name: 'q2-planning-draft.xlsx', size: '1.8 MB', type: 'xlsx' },
        ],
        labels: ['planning', 'q2'],
        folder: 'sent',
      },
    ],
    drafts: [
      {
        id: 'MSG-201',
        to: [],
        cc: [],
        bcc: [],
        subject: 'Weekly Report - March 15',
        preview: 'Draft of weekly report for review.',
        content: 'Weekly Report - March 15\n\nHighlights:\n- Inventory accuracy: 99.2%\n- Stockouts: 0\n- Discrepancies resolved: 5\n\nIssues:\n- None to report\n\nNext week focus:\n- Cycle count completion\n- New hire training',
        date: '2024-03-15 08:30',
        read: true,
        starred: false,
        attachments: [],
        labels: ['report', 'draft'],
        folder: 'drafts',
      },
      {
        id: 'MSG-202',
        to: [],
        cc: [],
        bcc: [],
        subject: 'Process Improvement Proposal',
        preview: 'Draft proposal for inventory counting process improvements.',
        content: 'Proposal: Inventory Counting Process Improvements\n\nCurrent Process:\n- Manual counting with paper sheets\n- Double entry in system\n- Prone to errors\n\nProposed Process:\n- Use of barcode scanners\n- Real-time system updates\n- Automated validation\n\nBenefits:\n- 50% time reduction\n- 99.9% accuracy\n- Real-time visibility',
        date: '2024-03-14 16:20',
        read: true,
        starred: true,
        attachments: [],
        labels: ['proposal', 'improvement'],
        folder: 'drafts',
      },
    ],
    archived: [
      {
        id: 'MSG-301',
        from: {
          name: 'Old Notification',
          email: 'notifications@company.com',
          avatar: null,
          initials: 'ON',
        },
        to: [
          { name: 'Current User', email: 'user@company.com' },
        ],
        cc: [],
        bcc: [],
        subject: 'System Update Complete',
        preview: 'The scheduled system update has been completed successfully.',
        content: 'The scheduled system update has been completed successfully. All systems are now operational.',
        date: '2024-03-01 04:30',
        read: true,
        starred: false,
        attachments: [],
        labels: ['system'],
        folder: 'archived',
      },
    ],
    trash: [
      {
        id: 'MSG-401',
        from: {
          name: 'Spam Sender',
          email: 'spam@example.com',
          avatar: null,
          initials: 'SP',
        },
        to: [
          { name: 'Current User', email: 'user@company.com' },
        ],
        cc: [],
        bcc: [],
        subject: 'Special Offer!',
        preview: 'You have won a prize! Click here to claim.',
        content: 'Spam message',
        date: '2024-03-10 08:00',
        read: true,
        starred: false,
        attachments: [],
        labels: [],
        folder: 'trash',
      },
    ],
  };

  // Folders
  const folders = [
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: 5, color: 'text-blue-600' },
    { id: 'sent', name: 'Sent', icon: Send, count: 2, color: 'text-green-600' },
    { id: 'drafts', name: 'Drafts', icon: FileText, count: 2, color: 'text-yellow-600' },
    { id: 'archived', name: 'Archived', icon: Archive, count: 1, color: 'text-purple-600' },
    { id: 'trash', name: 'Trash', icon: Trash2, count: 1, color: 'text-red-600' },
  ];

  // Labels
  const labels = [
    { id: 'work', name: 'Work', color: 'bg-blue-100 text-blue-700' },
    { id: 'inventory', name: 'Inventory', color: 'bg-green-100 text-green-700' },
    { id: 'meeting', name: 'Meeting', color: 'bg-purple-100 text-purple-700' },
    { id: 'system', name: 'System', color: 'bg-orange-100 text-orange-700' },
    { id: 'training', name: 'Training', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'approval', name: 'Approval', color: 'bg-red-100 text-red-700' },
    { id: 'report', name: 'Report', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'proposal', name: 'Proposal', color: 'bg-pink-100 text-pink-700' },
    { id: 'planning', name: 'Planning', color: 'bg-cyan-100 text-cyan-700' },
    { id: 'q2', name: 'Q2', color: 'bg-emerald-100 text-emerald-700' },
  ];

  const getFolderIcon = (folderId) => {
    const folder = folders.find(f => f.id === folderId);
    const Icon = folder?.icon || Mail;
    return Icon;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const currentMessages = messages[selectedFolder] || [];

  const filteredMessages = currentMessages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (message.from?.name && message.from.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (message.to && message.to.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))) ||
                         message.labels.some(label => label.includes(searchQuery.toLowerCase()));
    
    if (selectedStarred) {
      return matchesSearch && message.starred;
    }
    return matchesSearch;
  });

  const stats = {
    inbox: messages.inbox.length,
    unread: messages.inbox.filter(m => !m.read).length,
    starred: messages.inbox.filter(m => m.starred).length + messages.sent.filter(m => m.starred).length + messages.drafts.filter(m => m.starred).length,
    drafts: messages.drafts.length,
    sent: messages.sent.length,
    archived: messages.archived.length,
    trash: messages.trash.length,
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(m => m.id));
    }
  };

  const handleSelectMessage = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter(m => m !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Messages</h1>
            <p className="text-black/50 mt-1">Internal communication and notifications</p>
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
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Sliders className="mr-2 h-4 w-4" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <History className="mr-2 h-4 w-4" />
                  Message History
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Activity className="mr-2 h-4 w-4" />
                  Activity Log
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowComposeDialog(true)}
            >
              <Plus size={16} />
              Compose
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Inbox</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.inbox}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Inbox size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Unread</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.unread}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Mail size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Starred</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.starred}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Star size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Drafts</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.drafts}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <FileText size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Sent</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.sent}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <Send size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Archived</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.archived}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Archive size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Sidebar - Folders */}
        <div className="w-64 flex-shrink-0">
          <Card className="border-[#F5EEE9] sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-black text-base">Folders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 px-3">
                {folders.map((folder) => {
                  const Icon = folder.icon;
                  return (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedFolder(folder.id)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedFolder === folder.id
                          ? "bg-red-600 text-white"
                          : "text-black hover:bg-[#F5EEE9]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} />
                        <span>{folder.name}</span>
                      </div>
                      {folder.count > 0 && (
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "border-0",
                            selectedFolder === folder.id
                              ? "bg-white/20 text-white"
                              : "bg-[#F5EEE9] text-black"
                          )}
                        >
                          {folder.count}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>

            <Separator className="my-4 bg-[#F5EEE9]" />

            <CardContent>
              <h3 className="text-sm font-medium text-black mb-3">Labels</h3>
              <div className="space-y-2">
                {labels.slice(0, 5).map((label) => (
                  <button
                    key={label.id}
                    className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-[#F5EEE9]"
                  >
                    <div className={cn("w-2 h-2 rounded-full", label.color)} />
                    <span className="text-black/70">{label.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>

            <Separator className="my-4 bg-[#F5EEE9]" />

            <CardContent>
              <h3 className="text-sm font-medium text-black mb-3">Quick Filters</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedStarred(!selectedStarred);
                    setSelectedFolder('inbox');
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-[#F5EEE9]"
                >
                  <Star size={14} className={selectedStarred ? 'text-yellow-600 fill-yellow-600' : 'text-black/30'} />
                  <span>Starred</span>
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-[#F5EEE9]">
                  <Paperclip size={14} className="text-black/30" />
                  <span>Has Attachments</span>
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-[#F5EEE9]">
                  <User size={14} className="text-black/30" />
                  <span>Unread</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages List */}
        <div className="flex-1">
          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#F5EEE9] focus:border-red-600"
                />
              </div>
              <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                <RefreshCw size={16} />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-[#F5EEE9]">
                <Archive size={14} className="mr-2" />
                Archive
              </Button>
              <Button variant="outline" size="sm" className="border-[#F5EEE9] text-red-600">
                <Trash2 size={14} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedMessages.length > 0 && (
            <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-red-600 text-white">{selectedMessages.length} selected</Badge>
                <Button variant="ghost" size="sm" onClick={() => setSelectedMessages([])}>
                  Clear
                </Button>
              </div>
              <div className="flex items-center gap-2">
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

          {/* Messages List */}
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-0">
              <div className="divide-y divide-[#F5EEE9]">
                {filteredMessages.length === 0 ? (
                  <div className="p-12 text-center">
                    <Mail size={48} className="mx-auto text-black/20 mb-4" />
                    <p className="text-black/50">No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-3 p-4 hover:bg-[#F5EEE9]/30 cursor-pointer transition-colors",
                        !message.read && "bg-blue-50/30"
                      )}
                      onClick={() => {
                        setSelectedMessage(message);
                        setShowDetailsDialog(true);
                      }}
                    >
                      <Checkbox
                        checked={selectedMessages.includes(message.id)}
                        onCheckedChange={() => handleSelectMessage(message.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1"
                      />
                      
                      <div className="flex-shrink-0">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={cn(
                            "text-white",
                            message.folder === 'inbox' ? 'bg-red-600' : 'bg-gray-600'
                          )}>
                            {message.from?.initials || getInitials(message.from?.name || 'Unknown')}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-black">
                              {message.from?.name || 'To: ' + message.to?.map(t => t.name).join(', ')}
                            </span>
                            {message.important && (
                              <Badge className="bg-red-100 text-red-700 text-[10px]">Important</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {message.starred && (
                              <Star size={14} className="text-yellow-600 fill-yellow-600" />
                            )}
                            <span className="text-xs text-black/50">{formatDate(message.date)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-black">{message.subject}</span>
                          {!message.read && (
                            <Badge className="bg-blue-100 text-blue-700 text-[10px]">New</Badge>
                          )}
                        </div>

                        <p className="text-sm text-black/50 line-clamp-1 mb-2">{message.preview}</p>

                        <div className="flex items-center gap-2">
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Paperclip size={12} className="text-black/30" />
                              <span className="text-xs text-black/50">{message.attachments.length}</span>
                            </div>
                          )}
                          {message.labels.map((labelId) => {
                            const label = labels.find(l => l.id === labelId);
                            return label ? (
                              <Badge key={labelId} className={cn("text-[10px]", label.color)}>
                                {label.name}
                              </Badge>
                            ) : null;
                          })}
                          {message.thread && message.thread.length > 0 && (
                            <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                              {message.thread.length} replies
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compose Dialog */}
      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
            <DialogDescription>
              Send a new message
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>To</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="sarah">Sarah Wilson</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                  <SelectItem value="david">David Lee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="Enter subject" />
            </div>

            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Type your message here..." rows={8} />
            </div>

            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                <Upload size={24} className="mx-auto text-black/30 mb-2" />
                <p className="text-sm text-black/50">Drag files or click to upload</p>
                <p className="text-xs text-black/30">Support: PDF, DOC, JPG, PNG (Max 10MB)</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComposeDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="py-4 space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-red-600 text-white">
                    {selectedMessage.from?.initials || getInitials(selectedMessage.from?.name || 'Unknown')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{selectedMessage.from?.name || 'To: ' + selectedMessage.to?.map(t => t.name).join(', ')}</p>
                      <p className="text-xs text-black/50">{selectedMessage.from?.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedMessage.starred && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star size={16} className="text-yellow-600 fill-yellow-600" />
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Reply className="mr-2 h-4 w-4" />
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ReplyAll className="mr-2 h-4 w-4" />
                            Reply All
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Forward className="mr-2 h-4 w-4" />
                            Forward
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
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
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-black/50">To:</span>
                    <span className="text-xs text-black/70">
                      {selectedMessage.to?.map(t => t.name).join(', ')}
                    </span>
                  </div>
                  <p className="text-xs text-black/50 mt-1">{selectedMessage.date}</p>
                </div>
              </div>

              <div className="p-4 bg-[#F5EEE9] rounded-lg">
                <p className="text-sm font-medium mb-2">{selectedMessage.subject}</p>
                <p className="text-sm whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>

              {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                <div>
                  <p className="text-xs text-black/50 mb-2">Attachments</p>
                  <div className="space-y-2">
                    {selectedMessage.attachments.map((file, idx) => (
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

              {selectedMessage.thread && selectedMessage.thread.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-2">Thread</p>
                  <div className="space-y-3">
                    {selectedMessage.thread.map((reply, idx) => (
                      <div key={idx} className="p-3 border border-[#F5EEE9] rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{reply.from}</span>
                          <span className="text-xs text-black/50">{reply.date}</span>
                        </div>
                        <p className="text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                {selectedMessage.labels.map((labelId) => {
                  const label = labels.find(l => l.id === labelId);
                  return label ? (
                    <Badge key={labelId} className={cn("text-xs", label.color)}>
                      {label.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button variant="outline" className="gap-2">
              <Reply size={14} />
              Reply
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
                onClick={() => setShowComposeDialog(true)}
              >
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Compose</TooltipContent>
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

export default MessagesPage;