// app/dashboard/trainings/page.js
'use client';

import { useState } from 'react';
import { 
  GraduationCap,
  Calendar,
  Clock,
  Users,
  User,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  Star,
  Award,
  Crown,
  Video,
  Mic,
  Play,
  Settings,
  History,
  BarChart3,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  PrinterIcon as PrinterIconCustom,
  
  Monitor,
  Package,
  Wrench,
  Cpu,
  BookOpen,
  Layers,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

const TrainingsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample trainings data
  const trainings = [
    {
      id: 'TRN-001',
      title: 'Inventory Management Fundamentals',
      description: 'Learn the basics of inventory management including cycle counting, stock control, and warehouse organization.',
      longDescription: 'This comprehensive course covers all aspects of inventory management including: inventory types, valuation methods, cycle counting procedures, stock control techniques, warehouse organization strategies, and inventory reporting. Perfect for new inventory team members and those seeking to refresh their knowledge.',
      category: 'inventory',
      type: 'course',
      format: 'video',
      level: 'beginner',
      status: 'active',
      duration: 120,
      durationUnit: 'minutes',
      lessons: 8,
      quizzes: 2,
      enrolled: 45,
      capacity: 100,
      completed: 32,
      inProgress: 13,
      rating: 4.8,
      reviews: 87,
      instructor: {
        name: 'John Smith',
        title: 'Senior Inventory Manager',
        avatar: null,
        initials: 'JS',
        department: 'Operations',
      },
      startDate: '2024-03-01',
      endDate: '2024-04-30',
      schedule: 'Self-paced',
      location: 'Online',
      prerequisites: ['None'],
      skills: ['Cycle Counting', 'Stock Control', 'Warehouse Organization', 'Inventory Reporting'],
      materials: [
        { name: 'Course Handbook.pdf', size: '2.4 MB', type: 'pdf' },
        { name: 'Inventory Templates.xlsx', size: '1.2 MB', type: 'excel' },
        { name: 'Quick Reference Guide.pdf', size: '0.8 MB', type: 'pdf' },
      ],
      videos: [
        { title: 'Introduction to Inventory Management', duration: '15:30', watched: true },
        { title: 'Types of Inventory', duration: '12:45', watched: true },
        { title: 'Valuation Methods', duration: '18:20', watched: false },
        { title: 'Cycle Counting Procedures', duration: '22:15', watched: false },
        { title: 'Stock Control Techniques', duration: '16:40', watched: false },
        { title: 'Warehouse Organization', duration: '14:50', watched: false },
        { title: 'Inventory Reporting', duration: '11:30', watched: false },
        { title: 'Course Summary & Quiz', duration: '8:15', watched: false },
      ],
      tags: ['inventory', 'fundamentals', 'beginner'],
      image: '/images/training-inventory.jpg',
      certificateAvailable: true,
      certifiedUsers: 28,
      progress: 25,
      createdAt: '2024-02-15',
      updatedAt: '2024-03-01',
      createdBy: 'HR Department',
    },
    {
      id: 'TRN-002',
      title: 'Safety in the Workplace',
      description: 'Essential safety training for all warehouse and office personnel.',
      longDescription: 'This mandatory safety training covers OSHA requirements, emergency procedures, proper lifting techniques, hazard communication, PPE usage, and workplace safety culture. All employees must complete this training annually.',
      category: 'safety',
      type: 'certification',
      format: 'interactive',
      level: 'all',
      status: 'active',
      duration: 90,
      durationUnit: 'minutes',
      lessons: 6,
      quizzes: 3,
      enrolled: 187,
      capacity: 300,
      completed: 156,
      inProgress: 31,
      rating: 4.9,
      reviews: 234,
      instructor: {
        name: 'Sarah Wilson',
        title: 'Safety Officer',
        avatar: null,
        initials: 'SW',
        department: 'Safety',
      },
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      schedule: 'Self-paced',
      location: 'Online + In-person',
      prerequisites: ['None'],
      skills: ['OSHA Compliance', 'Emergency Procedures', 'PPE Usage', 'Hazard Communication'],
      materials: [
        { name: 'Safety Handbook.pdf', size: '3.2 MB', type: 'pdf' },
        { name: 'Emergency Procedures.pdf', size: '1.5 MB', type: 'pdf' },
        { name: 'PPE Guide.pdf', size: '2.1 MB', type: 'pdf' },
      ],
      videos: [
        { title: 'Introduction to Workplace Safety', duration: '12:20', watched: true },
        { title: 'OSHA Requirements', duration: '18:45', watched: true },
        { title: 'Emergency Procedures', duration: '15:30', watched: true },
        { title: 'Proper Lifting Techniques', duration: '14:15', watched: true },
        { title: 'PPE Usage', duration: '16:40', watched: true },
        { title: 'Safety Culture', duration: '12:30', watched: false },
      ],
      tags: ['safety', 'osha', 'mandatory'],
      image: '/images/training-safety.jpg',
      certificateAvailable: true,
      certifiedUsers: 156,
      progress: 85,
      createdAt: '2024-01-01',
      updatedAt: '2024-03-10',
      createdBy: 'Safety Department',
      mandatory: true,
    },
    {
      id: 'TRN-003',
      title: 'Forklift Operation Certification',
      description: 'Comprehensive training for safe forklift operation and certification.',
      longDescription: 'This certification course covers forklift operation fundamentals, safety procedures, load handling, maneuvering, and maintenance. Successful completion leads to forklift operator certification valid for 3 years. Includes both classroom and practical components.',
      category: 'equipment',
      type: 'certification',
      format: 'blended',
      level: 'intermediate',
      status: 'active',
      duration: 240,
      durationUnit: 'minutes',
      lessons: 10,
      quizzes: 2,
      practicalSessions: 2,
      enrolled: 34,
      capacity: 50,
      completed: 28,
      inProgress: 6,
      rating: 4.7,
      reviews: 42,
      instructor: {
        name: 'Mike Johnson',
        title: 'Certified Trainer',
        avatar: null,
        initials: 'MJ',
        department: 'Warehouse',
      },
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      schedule: 'Weekdays 9am-12pm',
      location: 'Warehouse Training Center',
      prerequisites: ['Basic Safety Training'],
      skills: ['Forklift Operation', 'Load Handling', 'Safety Procedures', 'Basic Maintenance'],
      materials: [
        { name: 'Forklift Manual.pdf', size: '4.5 MB', type: 'pdf' },
        { name: 'Safety Checklist.pdf', size: '1.2 MB', type: 'pdf' },
        { name: 'Practical Guide.pdf', size: '2.3 MB', type: 'pdf' },
      ],
      tags: ['forklift', 'equipment', 'certification'],
      image: '/images/training-forklift.jpg',
      certificateAvailable: true,
      certifiedUsers: 28,
      progress: 0,
      createdAt: '2024-02-20',
      updatedAt: '2024-03-01',
      createdBy: 'Operations Department',
      spotsRemaining: 16,
    },
    {
      id: 'TRN-004',
      title: 'Inventory Software Training',
      description: 'Learn to use the new inventory management system effectively.',
      longDescription: 'This hands-on training covers all features of our new inventory management system including: navigation, item management, batch operations, reporting, and troubleshooting. Designed for all inventory team members.',
      category: 'software',
      type: 'course',
      format: 'interactive',
      level: 'beginner',
      status: 'active',
      duration: 180,
      durationUnit: 'minutes',
      lessons: 12,
      quizzes: 3,
      enrolled: 89,
      capacity: 150,
      completed: 67,
      inProgress: 22,
      rating: 4.6,
      reviews: 78,
      instructor: {
        name: 'IT Training Team',
        title: 'Software Trainers',
        avatar: null,
        initials: 'IT',
        department: 'IT',
      },
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      schedule: 'Self-paced',
      location: 'Online',
      prerequisites: ['Basic Computer Skills'],
      skills: ['System Navigation', 'Item Management', 'Batch Operations', 'Reporting'],
      materials: [
        { name: 'User Guide.pdf', size: '5.2 MB', type: 'pdf' },
        { name: 'Quick Reference.pdf', size: '1.8 MB', type: 'pdf' },
        { name: 'Video Tutorials.zip', size: '45 MB', type: 'zip' },
      ],
      videos: [
        { title: 'System Overview', duration: '10:15', watched: true },
        { title: 'Navigation Basics', duration: '15:30', watched: true },
        { title: 'Item Management', duration: '22:45', watched: false },
        { title: 'Batch Operations', duration: '18:20', watched: false },
        { title: 'Reporting Features', duration: '20:15', watched: false },
        { title: 'Troubleshooting', duration: '12:40', watched: false },
      ],
      tags: ['software', 'inventory', 'system'],
      image: '/images/training-software.jpg',
      certificateAvailable: true,
      certifiedUsers: 67,
      progress: 25,
      createdAt: '2024-02-10',
      updatedAt: '2024-03-05',
      createdBy: 'IT Department',
    },
    {
      id: 'TRN-005',
      title: 'Leadership Development Program',
      description: 'Develop essential leadership skills for current and aspiring managers.',
      longDescription: 'This comprehensive program covers team leadership, communication, conflict resolution, performance management, and strategic thinking. Ideal for current supervisors and those preparing for management roles.',
      category: 'leadership',
      type: 'program',
      format: 'live',
      level: 'advanced',
      status: 'active',
      duration: 480,
      durationUnit: 'minutes',
      sessions: 8,
      enrolled: 24,
      capacity: 30,
      completed: 18,
      inProgress: 6,
      rating: 4.9,
      reviews: 21,
      instructor: {
        name: 'Dr. Robert Chen',
        title: 'Leadership Coach',
        avatar: null,
        initials: 'RC',
        department: 'External',
      },
      startDate: '2024-04-01',
      endDate: '2024-05-20',
      schedule: 'Mondays & Wednesdays, 2-4pm',
      location: 'Conference Room A',
      prerequisites: ['Supervisor Experience'],
      skills: ['Team Leadership', 'Communication', 'Conflict Resolution', 'Performance Management'],
      materials: [
        { name: 'Leadership Handbook.pdf', size: '3.8 MB', type: 'pdf' },
        { name: 'Case Studies.pdf', size: '2.4 MB', type: 'pdf' },
        { name: 'Workbook.pdf', size: '1.9 MB', type: 'pdf' },
      ],
      tags: ['leadership', 'management', 'development'],
      image: '/images/training-leadership.jpg',
      certificateAvailable: true,
      certifiedUsers: 18,
      progress: 40,
      createdAt: '2024-03-01',
      updatedAt: '2024-03-12',
      createdBy: 'HR Department',
      spotsRemaining: 6,
    },
    {
      id: 'TRN-006',
      title: 'Hazardous Materials Handling',
      description: 'Specialized training for handling hazardous materials safely.',
      longDescription: 'This advanced course covers hazardous material identification, proper handling procedures, storage requirements, spill response, and regulatory compliance. Required for all staff working with hazardous materials.',
      category: 'safety',
      type: 'certification',
      format: 'blended',
      level: 'advanced',
      status: 'active',
      duration: 180,
      durationUnit: 'minutes',
      lessons: 8,
      quizzes: 2,
      practicalSessions: 1,
      enrolled: 28,
      capacity: 40,
      completed: 22,
      inProgress: 6,
      rating: 4.8,
      reviews: 25,
      instructor: {
        name: 'James Wilson',
        title: 'Hazmat Specialist',
        avatar: null,
        initials: 'JW',
        department: 'Safety',
      },
      startDate: '2024-03-20',
      endDate: '2024-03-27',
      schedule: 'Tue & Thu, 1-4pm',
      location: 'Training Room B',
      prerequisites: ['Basic Safety Training'],
      skills: ['Hazmat Identification', 'Spill Response', 'Storage Requirements', 'Regulatory Compliance'],
      materials: [
        { name: 'Hazmat Handbook.pdf', size: '4.2 MB', type: 'pdf' },
        { name: 'Emergency Response Guide.pdf', size: '2.1 MB', type: 'pdf' },
        { name: 'Regulatory Reference.pdf', size: '3.5 MB', type: 'pdf' },
      ],
      tags: ['hazmat', 'safety', 'chemical'],
      image: '/images/training-hazmat.jpg',
      certificateAvailable: true,
      certifiedUsers: 22,
      progress: 30,
      createdAt: '2024-02-25',
      updatedAt: '2024-03-10',
      createdBy: 'Safety Department',
      mandatory: true,
      spotsRemaining: 12,
    },
    {
      id: 'TRN-007',
      title: 'Customer Service Excellence',
      description: 'Enhance your customer service skills for internal and external interactions.',
      longDescription: 'This course covers effective communication, problem-solving, conflict resolution, and service excellence principles. Applicable for all roles that interact with customers or internal stakeholders.',
      category: 'soft-skills',
      type: 'course',
      format: 'video',
      level: 'all',
      status: 'active',
      duration: 90,
      durationUnit: 'minutes',
      lessons: 6,
      quizzes: 2,
      enrolled: 78,
      capacity: 200,
      completed: 56,
      inProgress: 22,
      rating: 4.7,
      reviews: 63,
      instructor: {
        name: 'Lisa Garcia',
        title: 'Customer Service Manager',
        avatar: null,
        initials: 'LG',
        department: 'Customer Service',
      },
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      schedule: 'Self-paced',
      location: 'Online',
      prerequisites: ['None'],
      skills: ['Communication', 'Problem Solving', 'Conflict Resolution', 'Service Excellence'],
      materials: [
        { name: 'Service Handbook.pdf', size: '2.8 MB', type: 'pdf' },
        { name: 'Role Play Scenarios.pdf', size: '1.5 MB', type: 'pdf' },
      ],
      videos: [
        { title: 'Introduction to Customer Service', duration: '12:20', watched: true },
        { title: 'Effective Communication', duration: '15:45', watched: true },
        { title: 'Problem Solving Techniques', duration: '18:30', watched: false },
        { title: 'Conflict Resolution', duration: '16:15', watched: false },
        { title: 'Service Excellence', duration: '14:40', watched: false },
        { title: 'Course Summary', duration: '12:30', watched: false },
      ],
      tags: ['customer-service', 'soft-skills'],
      image: '/images/training-customer-service.jpg',
      certificateAvailable: true,
      certifiedUsers: 56,
      progress: 30,
      createdAt: '2024-02-01',
      updatedAt: '2024-02-15',
      createdBy: 'Customer Service Dept',
    },
    {
      id: 'TRN-008',
      title: 'First Aid & CPR Certification',
      description: 'Essential first aid and CPR training for workplace safety.',
      longDescription: 'This certification course covers basic first aid, CPR techniques, AED usage, and emergency response. Certification valid for 2 years. Hands-on practice included.',
      category: 'safety',
      type: 'certification',
      format: 'live',
      level: 'all',
      status: 'active',
      duration: 240,
      durationUnit: 'minutes',
      sessions: 2,
      enrolled: 45,
      capacity: 50,
      completed: 38,
      inProgress: 7,
      rating: 4.9,
      reviews: 41,
      instructor: {
        name: 'Red Cross Instructor',
        title: 'Certified Trainer',
        avatar: null,
        initials: 'RC',
        department: 'External',
      },
      startDate: '2024-03-25',
      endDate: '2024-03-26',
      schedule: '9am-5pm (two days)',
      location: 'Training Center',
      prerequisites: ['None'],
      skills: ['First Aid', 'CPR', 'AED Usage', 'Emergency Response'],
      materials: [
        { name: 'First Aid Manual.pdf', size: '5.2 MB', type: 'pdf' },
        { name: 'CPR Reference Card.pdf', size: '0.8 MB', type: 'pdf' },
      ],
      tags: ['first-aid', 'cpr', 'safety'],
      image: '/images/training-firstaid.jpg',
      certificateAvailable: true,
      certifiedUsers: 38,
      progress: 0,
      createdAt: '2024-02-28',
      updatedAt: '2024-03-05',
      createdBy: 'Safety Department',
      spotsRemaining: 5,
    },
    {
      id: 'TRN-009',
      title: 'Quality Control Fundamentals',
      description: 'Learn quality control principles and inspection techniques.',
      longDescription: 'This course covers quality control fundamentals, inspection methods, defect identification, documentation, and continuous improvement. Essential for quality team members.',
      category: 'quality',
      type: 'course',
      format: 'video',
      level: 'beginner',
      status: 'draft',
      duration: 120,
      durationUnit: 'minutes',
      lessons: 8,
      quizzes: 2,
      enrolled: 0,
      capacity: 75,
      completed: 0,
      inProgress: 0,
      rating: 0,
      reviews: 0,
      instructor: {
        name: 'David Lee',
        title: 'Quality Manager',
        avatar: null,
        initials: 'DL',
        department: 'Quality',
      },
      startDate: '2024-04-01',
      endDate: '2024-05-31',
      schedule: 'Self-paced',
      location: 'Online',
      prerequisites: ['None'],
      skills: ['Quality Control', 'Inspection Methods', 'Defect Identification', 'Documentation'],
      materials: [],
      videos: [],
      tags: ['quality', 'inspection', 'fundamentals'],
      image: '/images/training-quality.jpg',
      certificateAvailable: true,
      certifiedUsers: 0,
      progress: 0,
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15',
      createdBy: 'Quality Department',
      status: 'draft',
    },
    {
      id: 'TRN-010',
      title: 'RFID Technology Workshop',
      description: 'Hands-on workshop on RFID technology implementation and usage.',
      longDescription: 'This workshop covers RFID fundamentals, tag types, readers, antenna placement, system integration, and troubleshooting. Ideal for team members involved in RFID implementation.',
      category: 'technology',
      type: 'workshop',
      format: 'live',
      level: 'intermediate',
      status: 'upcoming',
      duration: 180,
      durationUnit: 'minutes',
      sessions: 1,
      enrolled: 18,
      capacity: 25,
      completed: 0,
      inProgress: 0,
      rating: 0,
      reviews: 0,
      instructor: {
        name: 'Tech Team',
        title: 'RFID Specialists',
        avatar: null,
        initials: 'TT',
        department: 'IT',
      },
      startDate: '2024-04-10',
      endDate: '2024-04-10',
      schedule: '10am-1pm',
      location: 'Tech Lab',
      prerequisites: ['Basic RFID Knowledge'],
      skills: ['RFID Fundamentals', 'Tag Types', 'Reader Setup', 'Integration'],
      materials: [
        { name: 'Workshop Slides.pdf', size: '3.2 MB', type: 'pdf' },
        { name: 'Setup Guide.pdf', size: '2.1 MB', type: 'pdf' },
      ],
      tags: ['rfid', 'technology', 'workshop'],
      image: '/images/training-rfid.jpg',
      certificateAvailable: false,
      certifiedUsers: 0,
      progress: 0,
      createdAt: '2024-03-10',
      updatedAt: '2024-03-12',
      createdBy: 'IT Department',
      spotsRemaining: 7,
    },
  ];

  // Training categories
  const categories = [
    { id: 'all', name: 'All Categories', count: trainings.length },
    { id: 'inventory', name: 'Inventory', count: trainings.filter(t => t.category === 'inventory').length, icon: Package },
    { id: 'safety', name: 'Safety', count: trainings.filter(t => t.category === 'safety').length, icon: AlertTriangle },
    { id: 'equipment', name: 'Equipment', count: trainings.filter(t => t.category === 'equipment').length, icon: Wrench },
    { id: 'software', name: 'Software', count: trainings.filter(t => t.category === 'software').length, icon: Monitor },
    { id: 'leadership', name: 'Leadership', count: trainings.filter(t => t.category === 'leadership').length, icon: Crown },
    { id: 'soft-skills', name: 'Soft Skills', count: trainings.filter(t => t.category === 'soft-skills').length, icon: Users },
    { id: 'quality', name: 'Quality', count: trainings.filter(t => t.category === 'quality').length, icon: CheckCircle },
    { id: 'technology', name: 'Technology', count: trainings.filter(t => t.category === 'technology').length, icon: Cpu },
  ];

  // Training types
  const trainingTypes = [
    { id: 'course', name: 'Course', icon: BookOpen },
    { id: 'certification', name: 'Certification', icon: Award },
    { id: 'program', name: 'Program', icon: GraduationCap },
    { id: 'workshop', name: 'Workshop', icon: Users },
  ];

  // Formats
  const formats = [
    { id: 'video', name: 'Video', icon: Video },
    { id: 'interactive', name: 'Interactive', icon: Monitor },
    { id: 'blended', name: 'Blended', icon: Layers },
    { id: 'live', name: 'Live', icon: Users },
  ];

  // Levels
  const levels = [
    { id: 'beginner', name: 'Beginner', color: 'bg-green-100 text-green-700' },
    { id: 'intermediate', name: 'Intermediate', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'advanced', name: 'Advanced', color: 'bg-red-100 text-red-700' },
    { id: 'all', name: 'All Levels', color: 'bg-blue-100 text-blue-700' },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    upcoming: { label: 'Upcoming', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Calendar },
    draft: { label: 'Draft', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: FileText },
    completed: { label: 'Completed', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: CheckCircle },
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
    const found = levels.find(l => l.id === level);
    return found?.color || 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'inventory': return <Package size={16} className="text-blue-600" />;
      case 'safety': return <AlertTriangle size={16} className="text-red-600" />;
      case 'equipment': return <Wrench size={16} className="text-orange-600" />;
      case 'software': return <Monitor size={16} className="text-purple-600" />;
      case 'leadership': return <Crown size={16} className="text-yellow-600" />;
      case 'soft-skills': return <Users size={16} className="text-green-600" />;
      case 'quality': return <CheckCircle size={16} className="text-indigo-600" />;
      case 'technology': return <Cpu size={16} className="text-cyan-600" />;
      default: return <GraduationCap size={16} className="text-red-600" />;
    }
  };

  const filteredTrainings = trainings.filter(training => {
    const matchesCategory = selectedCategory === 'all' || training.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || training.status === selectedStatus;
    const matchesType = selectedType === 'all' || training.type === selectedType;
    const matchesSearch = training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesType && matchesSearch;
  });

  const stats = {
    total: trainings.length,
    active: trainings.filter(t => t.status === 'active').length,
    upcoming: trainings.filter(t => t.status === 'upcoming').length,
    enrolled: trainings.reduce((sum, t) => sum + (t.enrolled || 0), 0),
    completed: trainings.reduce((sum, t) => sum + (t.completed || 0), 0),
    certified: trainings.reduce((sum, t) => sum + (t.certifiedUsers || 0), 0),
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Trainings</h1>
            <p className="text-black/50 mt-1">Manage training programs, courses, and certifications</p>
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
              Create Training
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Trainings</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <GraduationCap size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Upcoming</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.upcoming}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Calendar size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Enrolled</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.enrolled}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Users size={18} className="text-purple-600" />
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
                  <CheckCircle size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Certified</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.certified}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Award size={18} className="text-yellow-600" />
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
              placeholder="Search by title, instructor, or tags..."
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

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {trainingTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
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
              <SelectItem value="draft">Draft</SelectItem>
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

      {/* Trainings Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredTrainings.map((training) => {
            const StatusIcon = statusConfig[training.status]?.icon || CheckCircle;
            
            return (
              <Card key={training.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="h-32 bg-gradient-to-br from-red-600 to-black rounded-t-lg relative overflow-hidden">
                    {training.image && (
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${training.image})` }} />
                    )}
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={cn("text-xs border-0", getStatusColor(training.status))}>
                        <StatusIcon className="mr-1" size={10} />
                        {training.status}
                      </Badge>
                    </div>

                    {/* Category Icon */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                      {getCategoryIcon(training.category)}
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-semibold text-white line-clamp-2">{training.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Instructor & Duration */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <User size={12} className="text-black/50" />
                        <span className="text-xs text-black/70">{training.instructor.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-black/50" />
                        <span className="text-xs text-black/70">{training.duration} min</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-black/60 line-clamp-2 mb-3">
                      {training.description}
                    </p>

                    {/* Level & Type */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={cn("text-[10px]", getLevelColor(training.level))}>
                        {training.level}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                        {training.type}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                        {training.format}
                      </Badge>
                    </div>

                    {/* Progress (if enrolled) */}
                    {training.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-black/50">Your Progress</span>
                          <span className="text-xs font-medium">{training.progress}%</span>
                        </div>
                        <Progress 
                          value={training.progress} 
                          className="h-2 bg-[#F5EEE9]"
                        />
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <Users size={12} className="mx-auto text-black/50" />
                        <p className="text-xs font-bold mt-1">{training.enrolled}</p>
                        <p className="text-[8px] text-black/50">Enrolled</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <CheckCircle size={12} className="mx-auto text-black/50" />
                        <p className="text-xs font-bold mt-1">{training.completed}</p>
                        <p className="text-[8px] text-black/50">Completed</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <Star size={12} className="mx-auto text-black/50" />
                        <p className="text-xs font-bold mt-1">{training.rating}</p>
                        <p className="text-[8px] text-black/50">Rating</p>
                      </div>
                    </div>

                    {/* Date & Location */}
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={12} className="text-black/30" />
                      <span className="text-xs text-black/50">
                        {training.startDate} {training.endDate && `- ${training.endDate}`}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {training.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                      {training.tags.length > 2 && (
                        <Badge variant="outline" className="text-[8px] border-[#F5EEE9]">
                          +{training.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#F5EEE9]">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs flex-1"
                        onClick={() => {
                          setSelectedTraining(training);
                          setShowDetailsDialog(true);
                        }}
                      >
                        <Eye size={12} className="mr-1" />
                        Details
                      </Button>
                      {training.status === 'active' && training.spotsRemaining > 0 && (
                        <Button 
                          size="sm" 
                          className="h-7 text-xs flex-1 bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => {
                            setSelectedTraining(training);
                            setShowEnrollDialog(true);
                          }}
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
                  <TableHead className="text-black/50">Training</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Level</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Instructor</TableHead>
                  <TableHead className="text-black/50 text-right">Enrolled</TableHead>
                  <TableHead className="text-black/50 text-right">Completed</TableHead>
                  <TableHead className="text-black/50 text-right">Rating</TableHead>
                  <TableHead className="text-black/50">Start Date</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrainings.map((training) => (
                  <TableRow key={training.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{training.title}</p>
                        <p className="text-xs text-black/50 line-clamp-1">{training.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {training.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {training.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getLevelColor(training.level))}>
                        {training.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(training.status))}>
                        {training.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{training.instructor.name}</TableCell>
                    <TableCell className="text-right">{training.enrolled}/{training.capacity}</TableCell>
                    <TableCell className="text-right">{training.completed}</TableCell>
                    <TableCell className="text-right">{training.rating || '—'}</TableCell>
                    <TableCell className="text-xs">{training.startDate}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedTraining(training);
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
                Showing {filteredTrainings.length} of {trainings.length} trainings
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

      {/* Create Training Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Training</DialogTitle>
            <DialogDescription>
              Create a new training program or course
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="Enter training title" />
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
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {trainingTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map(format => (
                          <SelectItem key={format.id} value={format.id}>{format.name}</SelectItem>
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
                        <SelectItem value="all">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input type="number" placeholder="Max participants" />
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
                  <Input placeholder="e.g., Basic Safety Training" />
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label>Skills Taught</Label>
                  <Input placeholder="Enter skills separated by commas" />
                </div>

                <div className="space-y-2">
                  <Label>Lessons/Sessions</Label>
                  <Input type="number" placeholder="Number of lessons" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quizzes</Label>
                    <Input type="number" placeholder="Number of quizzes" />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (minutes)</Label>
                    <Input type="number" placeholder="Total duration" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Materials</Label>
                  <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                    <Upload size={24} className="mx-auto text-black/30 mb-2" />
                    <p className="text-sm text-black/50">Drag files or click to upload</p>
                    <p className="text-xs text-black/30">Support: PDF, DOC, XLS, MP4 (Max 100MB)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Certificate Available</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="certificate" />
                    <Label htmlFor="certificate">Issue certificate upon completion</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Schedule</Label>
                  <Input placeholder="e.g., Self-paced, Weekdays 9am-12pm" />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="e.g., Online, Training Room B" />
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
                      <SelectItem value="david">David Lee</SelectItem>
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

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Training
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Training Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Training Details</DialogTitle>
          </DialogHeader>

          {selectedTraining && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedTraining.title}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedTraining.category} • {selectedTraining.type}</p>
                    </div>
                    <Badge className={cn("text-xs border-0", getStatusColor(selectedTraining.status))}>
                      {selectedTraining.status}
                    </Badge>
                  </div>

                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <p className="text-sm">{selectedTraining.longDescription || selectedTraining.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Instructor</p>
                      <p className="text-sm font-medium">{selectedTraining.instructor.name}</p>
                      <p className="text-xs text-black/50">{selectedTraining.instructor.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Level</p>
                      <Badge className={cn("text-xs mt-1", getLevelColor(selectedTraining.level))}>
                        {selectedTraining.level}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Clock size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedTraining.duration}</p>
                        <p className="text-xs text-black/50">Minutes</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Users size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedTraining.enrolled}/{selectedTraining.capacity}</p>
                        <p className="text-xs text-black/50">Enrolled</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Star size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedTraining.rating || 'N/A'}</p>
                        <p className="text-xs text-black/50">Rating</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Start Date</p>
                      <p className="text-sm">{selectedTraining.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">End Date</p>
                      <p className="text-sm">{selectedTraining.endDate || 'Ongoing'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Schedule</p>
                      <p className="text-sm">{selectedTraining.schedule}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Location</p>
                      <p className="text-sm">{selectedTraining.location}</p>
                    </div>
                  </div>

                  {selectedTraining.prerequisites && (
                    <div>
                      <p className="text-xs text-black/50">Prerequisites</p>
                      <p className="text-sm">{selectedTraining.prerequisites.join(', ')}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50 mb-2">Skills You'll Learn</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTraining.skills.map((skill) => (
                        <Badge key={skill} className="bg-blue-100 text-blue-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedTraining.tags && (
                    <div>
                      <p className="text-xs text-black/50 mb-1">Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedTraining.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4">
                  <div className="space-y-3">
                    {selectedTraining.videos && selectedTraining.videos.length > 0 ? (
                      selectedTraining.videos.map((video, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-2 rounded-full",
                              video.watched ? 'bg-green-100' : 'bg-gray-100'
                            )}>
                              {video.watched ? (
                                <CheckCircle size={14} className="text-green-600" />
                              ) : (
                                <Play size={14} className="text-gray-600" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{video.title}</p>
                              <p className="text-xs text-black/50">Duration: {video.duration}</p>
                            </div>
                          </div>
                          {!video.watched && (
                            <Button variant="ghost" size="sm" className="h-7">
                              <Play size={12} className="mr-1" />
                              Watch
                            </Button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-black/50 text-center py-4">No curriculum available</p>
                    )}
                  </div>

                  {selectedTraining.quizzes > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm font-medium text-yellow-700">Quizzes</p>
                      <p className="text-xs text-yellow-600 mt-1">This training includes {selectedTraining.quizzes} quizzes to test your knowledge.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="materials" className="space-y-4">
                  {selectedTraining.materials && selectedTraining.materials.length > 0 ? (
                    selectedTraining.materials.map((material, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">{material.name}</p>
                            <p className="text-xs text-black/50">{material.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7">
                          <Download size={14} />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-black/50 text-center py-4">No materials available</p>
                  )}
                </TabsContent>

                <TabsContent value="students" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium">Enrolled Students ({selectedTraining.enrolled})</p>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(selectedTraining.completed / selectedTraining.enrolled) * 100} 
                        className="w-24 h-2 bg-[#F5EEE9]" 
                      />
                      <span className="text-xs">{selectedTraining.completed} completed</span>
                    </div>
                  </div>

                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {Array.from({ length: Math.min(selectedTraining.enrolled, 8) }).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-red-600 text-white text-xs">
                                {String.fromCharCode(65 + idx)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">Student {idx + 1}</p>
                              <p className="text-xs text-black/50">Enrolled: {selectedTraining.startDate}</p>
                            </div>
                          </div>
                          <div>
                            <Badge className={cn(
                              "text-xs",
                              idx < 3 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            )}>
                              {idx < 3 ? 'Completed' : 'In Progress'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {selectedTraining.enrolled > 8 && (
                        <p className="text-xs text-black/50 text-center py-2">
                          +{selectedTraining.enrolled - 8} more students
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
            {selectedTraining?.status === 'active' && selectedTraining?.spotsRemaining > 0 && (
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

      {/* Enroll Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Enroll in Training</DialogTitle>
            <DialogDescription>
              Confirm enrollment in {selectedTraining?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedTraining?.title}</p>
              <p className="text-xs text-black/50">Instructor: {selectedTraining?.instructor.name}</p>
              <p className="text-xs text-black/50 mt-2">Duration: {selectedTraining?.duration} minutes</p>
              <p className="text-xs text-black/50">Spots available: {selectedTraining?.spotsRemaining}</p>
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <p className="text-sm">{selectedTraining?.startDate}</p>
            </div>

            <div className="space-y-2">
              <Label>Commitment</Label>
              <p className="text-sm">By enrolling, you commit to completing this training by the end date.</p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                You will receive a certificate upon successful completion.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEnrollDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Confirm Enrollment
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
            <TooltipContent side="left">Create Training</TooltipContent>
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

export default TrainingsPage;