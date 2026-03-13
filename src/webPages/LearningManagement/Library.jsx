// app/dashboard/library/page.js
'use client';

import { useState } from 'react';
import { 
  Library,
  FileText,
  FileSpreadsheet,
  FileJson,
  Image,
  Video,
  Archive,
  Download,
  Upload,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  MoreVertical,
  Eye,
  Trash2,
  Copy,
  Share2,
  Star,
  Folder,
  Printer,
  Settings,
  History,
  File,
  FolderPlus,
  UploadCloud,
  Presentation,
  HardDrive,
  Move,
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

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const LibraryPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [showCopyDialog, setShowCopyDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample library data
  const libraryItems = [
    // Documents
    {
      id: 'LIB-001',
      name: 'Employee Handbook 2024.pdf',
      title: 'Employee Handbook 2024',
      description: 'Complete employee handbook with policies, procedures, and benefits information for 2024.',
      type: 'pdf',
      category: 'document',
      folder: 'HR Documents',
      size: '2.4 MB',
      pages: 124,
      author: 'HR Department',
      uploadedBy: 'Sarah Wilson',
      uploadedAt: '2024-03-15 10:30',
      modifiedAt: '2024-03-15 10:30',
      version: '1.0',
      tags: ['hr', 'handbook', 'policies'],
      starred: true,
      downloads: 234,
      views: 567,
      shares: 45,
      url: '/library/employee-handbook-2024.pdf',
      thumbnail: null,
    },
    {
      id: 'LIB-002',
      name: 'Safety Procedures Manual.pdf',
      title: 'Safety Procedures Manual',
      description: 'Comprehensive safety procedures for warehouse operations, including emergency protocols and PPE requirements.',
      type: 'pdf',
      category: 'document',
      folder: 'Safety Documents',
      size: '3.1 MB',
      pages: 86,
      author: 'Safety Department',
      uploadedBy: 'Mike Johnson',
      uploadedAt: '2024-03-14 14:15',
      modifiedAt: '2024-03-14 14:15',
      version: '2.1',
      tags: ['safety', 'warehouse', 'procedures'],
      starred: true,
      downloads: 456,
      views: 892,
      shares: 67,
      url: '/library/safety-procedures.pdf',
      thumbnail: null,
    },
    {
      id: 'LIB-003',
      name: 'Inventory SOP v3.2.docx',
      title: 'Inventory Standard Operating Procedures v3.2',
      description: 'Standard operating procedures for inventory management, including cycle counting, receiving, and putaway.',
      type: 'docx',
      category: 'document',
      folder: 'Operations',
      size: '1.8 MB',
      pages: 52,
      author: 'Operations Team',
      uploadedBy: 'John Smith',
      uploadedAt: '2024-03-13 09:45',
      modifiedAt: '2024-03-13 09:45',
      version: '3.2',
      tags: ['sop', 'inventory', 'operations'],
      starred: false,
      downloads: 189,
      views: 345,
      shares: 23,
      url: '/library/inventory-sop-v3.2.docx',
      thumbnail: null,
    },
    {
      id: 'LIB-004',
      name: 'Training Schedule Q2.xlsx',
      title: 'Q2 2024 Training Schedule',
      description: 'Training schedule for Q2 2024 including dates, times, locations, and registration links.',
      type: 'xlsx',
      category: 'spreadsheet',
      folder: 'Training',
      size: '0.8 MB',
      sheets: 3,
      author: 'Training Department',
      uploadedBy: 'Emma Watson',
      uploadedAt: '2024-03-12 11:20',
      modifiedAt: '2024-03-12 11:20',
      version: '1.0',
      tags: ['training', 'schedule', 'q2'],
      starred: false,
      downloads: 134,
      views: 278,
      shares: 15,
      url: '/library/training-schedule-q2.xlsx',
      thumbnail: null,
    },
    {
      id: 'LIB-005',
      name: 'Equipment Maintenance Log.xlsx',
      title: 'Equipment Maintenance Log',
      description: 'Log for tracking equipment maintenance, repairs, and inspections.',
      type: 'xlsx',
      category: 'spreadsheet',
      folder: 'Maintenance',
      size: '2.2 MB',
      sheets: 5,
      author: 'Facilities Team',
      uploadedBy: 'David Lee',
      uploadedAt: '2024-03-11 15:30',
      modifiedAt: '2024-03-11 15:30',
      version: '2.0',
      tags: ['maintenance', 'equipment', 'log'],
      starred: true,
      downloads: 267,
      views: 423,
      shares: 34,
      url: '/library/equipment-maintenance-log.xlsx',
      thumbnail: null,
    },
    {
      id: 'LIB-006',
      name: 'Q1 Inventory Report.pdf',
      title: 'Q1 2024 Inventory Report',
      description: 'Quarterly inventory report for Q1 2024 including counts, discrepancies, and analysis.',
      type: 'pdf',
      category: 'report',
      folder: 'Reports',
      size: '3.5 MB',
      pages: 42,
      author: 'Inventory Team',
      uploadedBy: 'Jane Smith',
      uploadedAt: '2024-03-10 16:45',
      modifiedAt: '2024-03-10 16:45',
      version: '1.0',
      tags: ['report', 'q1', 'inventory'],
      starred: true,
      downloads: 389,
      views: 678,
      shares: 56,
      url: '/library/q1-inventory-report.pdf',
      thumbnail: null,
    },
    {
      id: 'LIB-007',
      name: 'New Hire Onboarding.pptx',
      title: 'New Hire Onboarding Presentation',
      description: 'Presentation slides for new hire onboarding covering company culture, policies, and introductions.',
      type: 'pptx',
      category: 'presentation',
      folder: 'HR Documents',
      size: '5.2 MB',
      slides: 45,
      author: 'HR Department',
      uploadedBy: 'Sarah Wilson',
      uploadedAt: '2024-03-09 13:15',
      modifiedAt: '2024-03-09 13:15',
      version: '2.3',
      tags: ['onboarding', 'presentation', 'hr'],
      starred: false,
      downloads: 156,
      views: 289,
      shares: 42,
      url: '/library/new-hire-onboarding.pptx',
      thumbnail: null,
    },
    {
      id: 'LIB-008',
      name: 'Warehouse Layout Map.pdf',
      title: 'Warehouse Layout Map',
      description: 'Detailed map of warehouse layout including zones, aisles, and emergency exits.',
      type: 'pdf',
      category: 'document',
      folder: 'Facilities',
      size: '4.2 MB',
      pages: 1,
      author: 'Facilities Department',
      uploadedBy: 'Tom Brown',
      uploadedAt: '2024-03-08 10:00',
      modifiedAt: '2024-03-08 10:00',
      version: '1.5',
      tags: ['warehouse', 'map', 'layout'],
      starred: true,
      downloads: 423,
      views: 789,
      shares: 78,
      url: '/library/warehouse-layout-map.pdf',
      thumbnail: null,
    },
    {
      id: 'LIB-009',
      name: 'Training Video - Forklift Safety.mp4',
      title: 'Forklift Safety Training Video',
      description: 'Video training on forklift safety procedures, operation, and maintenance.',
      type: 'mp4',
      category: 'video',
      folder: 'Training Videos',
      size: '156 MB',
      duration: '15:30',
      resolution: '1080p',
      author: 'Safety Department',
      uploadedBy: 'Mike Johnson',
      uploadedAt: '2024-03-07 14:20',
      modifiedAt: '2024-03-07 14:20',
      version: '1.0',
      tags: ['video', 'training', 'forklift'],
      starred: false,
      downloads: 267,
      views: 456,
      shares: 34,
      url: '/library/forklift-safety.mp4',
      thumbnail: '/thumbnails/forklift.jpg',
    },
    {
      id: 'LIB-010',
      name: 'Safety Inspection Checklist.xlsx',
      title: 'Safety Inspection Checklist',
      description: 'Checklist for conducting safety inspections in warehouse and office areas.',
      type: 'xlsx',
      category: 'spreadsheet',
      folder: 'Safety Documents',
      size: '1.2 MB',
      sheets: 2,
      author: 'Safety Department',
      uploadedBy: 'Lisa Chen',
      uploadedAt: '2024-03-06 09:30',
      modifiedAt: '2024-03-06 09:30',
      version: '3.0',
      tags: ['safety', 'inspection', 'checklist'],
      starred: true,
      downloads: 345,
      views: 567,
      shares: 45,
      url: '/library/safety-inspection-checklist.xlsx',
      thumbnail: null,
    },
    {
      id: 'LIB-011',
      name: 'Product Catalog 2024.pdf',
      title: 'Product Catalog 2024',
      description: 'Complete product catalog with specifications, pricing, and availability.',
      type: 'pdf',
      category: 'catalog',
      folder: 'Product Information',
      size: '8.5 MB',
      pages: 256,
      author: 'Marketing Team',
      uploadedBy: 'Anna Taylor',
      uploadedAt: '2024-03-05 11:45',
      modifiedAt: '2024-03-05 11:45',
      version: '2024.1',
      tags: ['catalog', 'products', 'pricing'],
      starred: false,
      downloads: 567,
      views: 890,
      shares: 89,
      url: '/library/product-catalog-2024.pdf',
      thumbnail: null,
    },
    {
      id: 'LIB-012',
      name: 'Emergency Response Plan.pdf',
      title: 'Emergency Response Plan',
      description: 'Detailed emergency response plan covering fire, medical, and natural disaster procedures.',
      type: 'pdf',
      category: 'document',
      folder: 'Safety Documents',
      size: '2.8 MB',
      pages: 64,
      author: 'Safety Department',
      uploadedBy: 'Richard Harris',
      uploadedAt: '2024-03-04 13:50',
      modifiedAt: '2024-03-04 13:50',
      version: '2.2',
      tags: ['emergency', 'safety', 'plan'],
      starred: true,
      downloads: 412,
      views: 734,
      shares: 56,
      url: '/library/emergency-response-plan.pdf',
      thumbnail: null,
    },
    {
      id: 'LIB-013',
      name: 'Inventory Training Module 1.mp4',
      title: 'Inventory Management Training - Module 1',
      description: 'Training video covering inventory fundamentals, cycle counting, and best practices.',
      type: 'mp4',
      category: 'video',
      folder: 'Training Videos',
      size: '210 MB',
      duration: '25:45',
      resolution: '1080p',
      author: 'Training Department',
      uploadedBy: 'Emma Watson',
      uploadedAt: '2024-03-03 15:20',
      modifiedAt: '2024-03-03 15:20',
      version: '1.0',
      tags: ['training', 'inventory', 'video'],
      starred: false,
      downloads: 189,
      views: 345,
      shares: 23,
      url: '/library/inventory-training-module1.mp4',
      thumbnail: '/thumbnails/inventory-training.jpg',
    },
    {
      id: 'LIB-014',
      name: 'Company Policies.zip',
      title: 'Company Policies Archive',
      description: 'ZIP archive containing all company policy documents.',
      type: 'zip',
      category: 'archive',
      folder: 'Archives',
      size: '45 MB',
      files: 23,
      author: 'HR Department',
      uploadedBy: 'Sarah Wilson',
      uploadedAt: '2024-03-02 10:00',
      modifiedAt: '2024-03-02 10:00',
      version: '2024',
      tags: ['policies', 'archive', 'hr'],
      starred: false,
      downloads: 156,
      views: 267,
      shares: 12,
      url: '/library/company-policies.zip',
      thumbnail: null,
    },
    {
      id: 'LIB-015',
      name: 'RFID Implementation Guide.pdf',
      title: 'RFID Implementation Guide',
      description: 'Guide for implementing RFID technology in warehouse operations.',
      type: 'pdf',
      category: 'document',
      folder: 'Technology',
      size: '3.2 MB',
      pages: 48,
      author: 'IT Department',
      uploadedBy: 'Chris Evans',
      uploadedAt: '2024-03-01 14:30',
      modifiedAt: '2024-03-01 14:30',
      version: '1.0',
      tags: ['rfid', 'technology', 'guide'],
      starred: true,
      downloads: 234,
      views: 456,
      shares: 34,
      url: '/library/rfid-implementation-guide.pdf',
      thumbnail: null,
    },
  ];

  // Folders
  const folders = [
    { id: 'all', name: 'All Items', count: libraryItems.length, icon: Library },
    { id: 'hr-documents', name: 'HR Documents', count: 2, icon: Folder },
    { id: 'safety-documents', name: 'Safety Documents', count: 3, icon: Folder },
    { id: 'operations', name: 'Operations', count: 1, icon: Folder },
    { id: 'training', name: 'Training', count: 1, icon: Folder },
    { id: 'training-videos', name: 'Training Videos', count: 2, icon: Folder },
    { id: 'maintenance', name: 'Maintenance', count: 1, icon: Folder },
    { id: 'reports', name: 'Reports', count: 1, icon: Folder },
    { id: 'facilities', name: 'Facilities', count: 1, icon: Folder },
    { id: 'product-information', name: 'Product Information', count: 1, icon: Folder },
    { id: 'technology', name: 'Technology', count: 1, icon: Folder },
    { id: 'archives', name: 'Archives', count: 1, icon: Folder },
  ];

  // File types
  const fileTypes = [
    { id: 'all', name: 'All Files', icon: File, count: libraryItems.length },
    { id: 'pdf', name: 'PDF', icon: File, count: libraryItems.filter(i => i.type === 'pdf').length },
    { id: 'docx', name: 'Word', icon: FileText, count: libraryItems.filter(i => i.type === 'docx').length },
    { id: 'xlsx', name: 'Excel', icon: FileSpreadsheet, count: libraryItems.filter(i => i.type === 'xlsx').length },
    { id: 'pptx', name: 'PowerPoint', icon: Presentation, count: libraryItems.filter(i => i.type === 'pptx').length },
    { id: 'mp4', name: 'Video', icon: Video, count: libraryItems.filter(i => i.type === 'mp4').length },
    { id: 'zip', name: 'Archive', icon: Archive, count: libraryItems.filter(i => i.type === 'zip').length },
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Categories', count: libraryItems.length },
    { id: 'document', name: 'Documents', count: libraryItems.filter(i => i.category === 'document').length },
    { id: 'spreadsheet', name: 'Spreadsheets', count: libraryItems.filter(i => i.category === 'spreadsheet').length },
    { id: 'presentation', name: 'Presentations', count: libraryItems.filter(i => i.category === 'presentation').length },
    { id: 'report', name: 'Reports', count: libraryItems.filter(i => i.category === 'report').length },
    { id: 'video', name: 'Videos', count: libraryItems.filter(i => i.category === 'video').length },
    { id: 'catalog', name: 'Catalogs', count: libraryItems.filter(i => i.category === 'catalog').length },
    { id: 'archive', name: 'Archives', count: libraryItems.filter(i => i.category === 'archive').length },
  ];

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <File size={20} className="text-red-600" />;
      case 'docx': return <FileText size={20} className="text-blue-600" />;
      case 'xlsx': return <FileSpreadsheet size={20} className="text-green-600" />;
      case 'pptx': return <Presentation size={20} className="text-orange-600" />;
      case 'mp4': return <Video size={20} className="text-purple-600" />;
      case 'zip': return <Archive size={20} className="text-yellow-600" />;
      default: return <File size={20} className="text-gray-600" />;
    }
  };

  const getFileTypeColor = (type) => {
    switch(type) {
      case 'pdf': return 'bg-red-100 text-red-700';
      case 'docx': return 'bg-blue-100 text-blue-700';
      case 'xlsx': return 'bg-green-100 text-green-700';
      case 'pptx': return 'bg-orange-100 text-orange-700';
      case 'mp4': return 'bg-purple-100 text-purple-700';
      case 'zip': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatFileSize = (size) => {
    if (typeof size === 'string') return size;
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    if (size < 1024 * 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + ' MB';
    return (size / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const filteredItems = libraryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.includes(searchQuery.toLowerCase())) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesFolder && matchesSearch;
  });

  const starredItems = filteredItems.filter(i => i.starred);
  const regularItems = filteredItems.filter(i => !i.starred);

  const stats = {
    total: libraryItems.length,
    documents: libraryItems.filter(i => i.category === 'document').length,
    spreadsheets: libraryItems.filter(i => i.category === 'spreadsheet').length,
    presentations: libraryItems.filter(i => i.category === 'presentation').length,
    videos: libraryItems.filter(i => i.category === 'video').length,
    reports: libraryItems.filter(i => i.category === 'report').length,
    totalSize: libraryItems.reduce((sum, i) => {
      const sizeStr = i.size;
      if (sizeStr.includes('MB')) return sum + parseFloat(sizeStr) * 1024 * 1024;
      if (sizeStr.includes('KB')) return sum + parseFloat(sizeStr) * 1024;
      return sum;
    }, 0),
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(i => i.id));
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Library</h1>
            <p className="text-black/50 mt-1">Manage documents, resources, and training materials</p>
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

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowCreateFolderDialog(true)}
            >
              <FolderPlus size={16} />
              New Folder
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
              onClick={() => setShowUploadDialog(true)}
            >
              <Upload size={16} />
              Upload
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Items</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Library size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Documents</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.documents}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <FileText size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Spreadsheets</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.spreadsheets}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <FileSpreadsheet size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Presentations</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.presentations}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Presentation size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Videos</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.videos}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Video size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Size</p>
                  <p className="text-xl font-bold text-black mt-1">
                    {(stats.totalSize / (1024 * 1024)).toFixed(1)} MB
                  </p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <HardDrive size={18} className="text-yellow-600" />
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
                    </button>
                  );
                })}
              </div>
            </CardContent>

            <Separator className="my-4 bg-[#F5EEE9]" />

            <CardContent>
              <h3 className="text-sm font-medium text-black mb-3">File Types</h3>
              <div className="space-y-2">
                {fileTypes.slice(1).map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedType === type.id
                          ? "bg-red-600 text-white"
                          : "text-black hover:bg-[#F5EEE9]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} />
                        <span>{type.name}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "border-0",
                          selectedType === type.id
                            ? "bg-white/20 text-white"
                            : "bg-[#F5EEE9] text-black"
                        )}
                      >
                        {type.count}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </CardContent>

            <Separator className="my-4 bg-[#F5EEE9]" />

            <CardContent>
              <h3 className="text-sm font-medium text-black mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.slice(1).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors",
                      selectedCategory === cat.id
                        ? "bg-red-600 text-white"
                        : "text-black hover:bg-[#F5EEE9]"
                    )}
                  >
                    <span>{cat.name}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "border-0",
                        selectedCategory === cat.id
                          ? "bg-white/20 text-white"
                          : "bg-[#F5EEE9] text-black"
                      )}
                    >
                      {cat.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Library Area */}
        <div className="flex-1">
          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
                <Input
                  placeholder="Search by name, description, author, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#F5EEE9] focus:border-red-600"
                />
              </div>
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
          {selectedItems.length > 0 && (
            <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-red-600 text-white">{selectedItems.length} selected</Badge>
                <Button variant="ghost" size="sm" onClick={() => setSelectedItems([])}>
                  Clear
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8">
                  <Download size={14} className="mr-2" />
                  Download
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <Copy size={14} className="mr-2" />
                  Copy
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <Move size={14} className="mr-2" />
                  Move
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-red-600">
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Starred Items Section */}
          {starredItems.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
                <Star size={16} className="text-yellow-600 fill-yellow-600" />
                Starred Items
              </h2>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-3 gap-4">
                  {starredItems.map((item) => (
                    <LibraryCard 
                      key={item.id} 
                      item={item} 
                      onView={() => {
                        setSelectedItem(item);
                        setShowDetailsDialog(true);
                      }}
                      selected={selectedItems.includes(item.id)}
                      onSelect={() => handleSelectItem(item.id)}
                    />
                  ))}
                </div>
              ) : (
                <LibraryList 
                  items={starredItems} 
                  selectedItems={selectedItems}
                  onSelectItem={handleSelectItem}
                  onViewItem={(item) => {
                    setSelectedItem(item);
                    setShowDetailsDialog(true);
                  }}
                />
              )}
            </div>
          )}

          {/* All Items Section */}
          <div>
            <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
              <Library size={16} className="text-red-600" />
              All Items
            </h2>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-3 gap-4">
                {regularItems.map((item) => (
                  <LibraryCard 
                    key={item.id} 
                    item={item} 
                    onView={() => {
                      setSelectedItem(item);
                      setShowDetailsDialog(true);
                    }}
                    selected={selectedItems.includes(item.id)}
                    onSelect={() => handleSelectItem(item.id)}
                  />
                ))}
              </div>
            ) : (
              <LibraryList 
                items={regularItems} 
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                onViewItem={(item) => {
                  setSelectedItem(item);
                  setShowDetailsDialog(true);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Upload documents, videos, or other resources to the library
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-8 text-center">
              <UploadCloud size={48} className="mx-auto text-black/30 mb-4" />
              <p className="text-sm text-black/50 mb-2">Drag and drop files here or click to browse</p>
              <p className="text-xs text-black/30">Supports: PDF, DOCX, XLSX, PPTX, MP4, ZIP (Max 500MB)</p>
              <Button variant="outline" size="sm" className="mt-4 border-[#F5EEE9]">
                <Upload size={14} className="mr-2" />
                Browse Files
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Folder</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    {folders.slice(1).map(folder => (
                      <SelectItem key={folder.id} value={folder.name}>{folder.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Enter tags separated by commas" />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Enter file description" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Folder Dialog */}
      <Dialog open={showCreateFolderDialog} onOpenChange={setShowCreateFolderDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Create a new folder to organize your files
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Folder Name</Label>
              <Input placeholder="e.g., Training Materials" />
            </div>

            <div className="space-y-2">
              <Label>Parent Folder (Optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select parent folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">Root</SelectItem>
                  {folders.slice(1).map(folder => (
                    <SelectItem key={folder.id} value={folder.name}>{folder.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Folder description" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateFolderDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <FolderPlus className="mr-2 h-4 w-4" />
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Item Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="py-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className={cn("p-3 rounded-lg", getFileTypeColor(selectedItem.type))}>
                  {getFileIcon(selectedItem.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedItem.title}</h3>
                  <p className="text-sm text-black/50 mt-1">{selectedItem.name}</p>
                </div>
                {selectedItem.starred && (
                  <Star size={16} className="text-yellow-600 fill-yellow-600" />
                )}
              </div>

              <div className="p-4 bg-[#F5EEE9] rounded-lg">
                <p className="text-sm">{selectedItem.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Type</p>
                  <p className="text-sm font-medium">{selectedItem.type.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Size</p>
                  <p className="text-sm font-medium">{selectedItem.size}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Folder</p>
                  <p className="text-sm font-medium">{selectedItem.folder}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Version</p>
                  <p className="text-sm font-medium">{selectedItem.version}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Author</p>
                  <p className="text-sm font-medium">{selectedItem.author}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Uploaded By</p>
                  <p className="text-sm font-medium">{selectedItem.uploadedBy}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-black/50">Uploaded</p>
                  <p className="text-sm">{selectedItem.uploadedAt}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Modified</p>
                  <p className="text-sm">{selectedItem.modifiedAt}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-2 text-center">
                    <Download size={14} className="mx-auto text-black/50 mb-1" />
                    <p className="text-lg font-bold">{selectedItem.downloads}</p>
                    <p className="text-xs text-black/50">Downloads</p>
                  </CardContent>
                </Card>
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-2 text-center">
                    <Eye size={14} className="mx-auto text-black/50 mb-1" />
                    <p className="text-lg font-bold">{selectedItem.views}</p>
                    <p className="text-xs text-black/50">Views</p>
                  </CardContent>
                </Card>
                <Card className="border-[#F5EEE9]">
                  <CardContent className="p-2 text-center">
                    <Share2 size={14} className="mx-auto text-black/50 mb-1" />
                    <p className="text-lg font-bold">{selectedItem.shares}</p>
                    <p className="text-xs text-black/50">Shares</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <p className="text-xs text-black/50 mb-1">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {selectedItem.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button className="flex-1 bg-red-600 hover:bg-red-700" asChild>
                  <a href={selectedItem.url} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
                <Button variant="outline" className="border-[#F5EEE9]" onClick={() => setShowShareDialog(true)}>
                  <Share2 size={16} />
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
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
                onClick={() => setShowUploadDialog(true)}
              >
                <Upload size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Upload Files</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowCreateFolderDialog(true)}
              >
                <FolderPlus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">New Folder</TooltipContent>
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

// Library Card Component
const LibraryCard = ({ item, onView, selected, onSelect }) => {
  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <File size={24} className="text-red-600" />;
      case 'docx': return <FileText size={24} className="text-blue-600" />;
      case 'xlsx': return <FileSpreadsheet size={24} className="text-green-600" />;
      case 'pptx': return <Presentation size={24} className="text-orange-600" />;
      case 'mp4': return <Video size={24} className="text-purple-600" />;
      case 'zip': return <Archive size={24} className="text-yellow-600" />;
      default: return <File size={24} className="text-gray-600" />;
    }
  };

  const getFileTypeColor = (type) => {
    switch(type) {
      case 'pdf': return 'bg-red-100';
      case 'docx': return 'bg-blue-100';
      case 'xlsx': return 'bg-green-100';
      case 'pptx': return 'bg-orange-100';
      case 'mp4': return 'bg-purple-100';
      case 'zip': return 'bg-yellow-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <Card className="border-[#F5EEE9] hover:shadow-lg transition-all group">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <Checkbox 
              checked={selected}
              onCheckedChange={onSelect}
              onClick={(e) => e.stopPropagation()}
              className="mt-1"
            />
            <div className={cn("p-3 rounded-lg flex-shrink-0", getFileTypeColor(item.type))}>
              {getFileIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-black truncate">{item.title}</h3>
                  <p className="text-xs text-black/50 mt-1">{item.name}</p>
                </div>
                {item.starred && (
                  <Star size={14} className="text-yellow-600 fill-yellow-600 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-black/60 line-clamp-2 mt-3 px-2">
            {item.description}
          </p>

          <div className="flex items-center gap-2 mt-3 px-2">
            <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
              {item.type.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
              {item.size}
            </Badge>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F5EEE9]">
            <div className="flex items-center gap-2 text-xs text-black/50">
              <Folder size={12} />
              <span className="truncate max-w-[100px]">{item.folder}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onView}>
                <Eye size={14} />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Download size={14} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreVertical size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Move className="mr-2 h-4 w-4" />
                    Move
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
        </div>
      </CardContent>
    </Card>
  );
};

// Library List Component
const LibraryList = ({ items, selectedItems, onSelectItem, onViewItem }) => {
  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <File size={16} className="text-red-600" />;
      case 'docx': return <FileText size={16} className="text-blue-600" />;
      case 'xlsx': return <FileSpreadsheet size={16} className="text-green-600" />;
      case 'pptx': return <Presentation size={16} className="text-orange-600" />;
      case 'mp4': return <Video size={16} className="text-purple-600" />;
      case 'zip': return <Archive size={16} className="text-yellow-600" />;
      default: return <File size={16} className="text-gray-600" />;
    }
  };

  return (
    <Card className="border-[#F5EEE9]">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
              <TableHead className="w-8">
                <Checkbox 
                  checked={items.length > 0 && selectedItems.length === items.length}
                  onCheckedChange={() => {
                    if (selectedItems.length === items.length) {
                      items.forEach(i => onSelectItem(i.id));
                    } else {
                      items.forEach(i => {
                        if (!selectedItems.includes(i.id)) {
                          onSelectItem(i.id);
                        }
                      });
                    }
                  }}
                />
              </TableHead>
              <TableHead className="text-black/50">Name</TableHead>
              <TableHead className="text-black/50">Type</TableHead>
              <TableHead className="text-black/50">Size</TableHead>
              <TableHead className="text-black/50">Folder</TableHead>
              <TableHead className="text-black/50">Modified</TableHead>
              <TableHead className="text-black/50">Downloads</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30 cursor-pointer" onClick={() => onViewItem(item)}>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => onSelectItem(item.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getFileIcon(item.type)}
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-black/50">{item.name}</p>
                    </div>
                    {item.starred && (
                      <Star size={12} className="text-yellow-600 fill-yellow-600" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                    {item.type.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.folder}</TableCell>
                <TableCell className="text-xs">{item.modifiedAt}</TableCell>
                <TableCell className="text-right">{item.downloads}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreVertical size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LibraryPage;