// app/dashboard/certifications/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Award,
  Certificate,
  GraduationCap,
  Clock,
  Calendar,
  Users,
  User,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Star,
  Sparkles,
  Target,
  Flag,
  Download,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,

  Eye,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,

  History,
  BarChart3,
  TrendingUp,
  Package,
  Truck,
  Wrench,
  Cpu,
  Plus,
 
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CertificationsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCert, setExpandedCert] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showIssueDialog, setShowIssueDialog] = useState(false);
  const [showRenewDialog, setShowRenewDialog] = useState(false);
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample certifications data
  const certifications = [
    {
      id: 'CERT-001',
      name: 'Certified Inventory Specialist',
      code: 'CIS-2024',
      description: 'Professional certification for inventory management specialists covering fundamentals, cycle counting, valuation, and best practices.',
      longDescription: 'The Certified Inventory Specialist (CIS) certification validates expertise in inventory management. Candidates demonstrate knowledge of inventory types, valuation methods, cycle counting procedures, stock control techniques, warehouse organization, and inventory reporting. This certification is ideal for inventory team members seeking professional recognition.',
      category: 'inventory',
      level: 'intermediate',
      status: 'active',
      validityPeriod: 2,
      validityUnit: 'years',
      creditHours: 40,
      passingScore: 80,
      examFormat: 'Online',
      examDuration: 120,
      questions: 100,
      price: 299,
      currency: 'USD',
      enrolled: 345,
      certified: 289,
      passRate: 92,
      rating: 4.8,
      reviews: 156,
      skills: ['Inventory Management', 'Cycle Counting', 'Valuation Methods', 'Stock Control', 'Warehouse Organization'],
      prerequisites: ['6 months inventory experience', 'Basic inventory training'],
      renewalRequirements: ['20 continuing education credits every 2 years'],
      issuedBy: 'Professional Inventory Association',
      accreditation: 'IAOP Certified',
      image: '/images/cert-inventory.jpg',
      tags: ['inventory', 'professional', 'specialist'],
      featured: true,
      popular: true,
      badge: 'CIS',
      color: 'bg-blue-600',
      recentIssuances: [
        { id: 1, name: 'John Smith', date: '2024-03-15', expiry: '2026-03-15', status: 'active' },
        { id: 2, name: 'Sarah Wilson', date: '2024-03-14', expiry: '2026-03-14', status: 'active' },
        { id: 3, name: 'Mike Johnson', date: '2024-03-12', expiry: '2026-03-12', status: 'active' },
      ],
    },
    {
      id: 'CERT-002',
      name: 'Certified Warehouse Professional',
      code: 'CWP-2024',
      description: 'Comprehensive certification for warehouse operations including receiving, putaway, picking, packing, and shipping.',
      longDescription: 'The Certified Warehouse Professional (CWP) certification demonstrates mastery of warehouse operations. Topics include receiving procedures, putaway strategies, picking methods, packing techniques, shipping processes, safety protocols, and warehouse management systems. This certification is essential for warehouse supervisors and leads.',
      category: 'warehouse',
      level: 'intermediate',
      status: 'active',
      validityPeriod: 3,
      validityUnit: 'years',
      creditHours: 60,
      passingScore: 85,
      examFormat: 'Online + Practical',
      examDuration: 180,
      questions: 150,
      price: 399,
      currency: 'USD',
      enrolled: 567,
      certified: 412,
      passRate: 88,
      rating: 4.7,
      reviews: 234,
      skills: ['Receiving', 'Putaway', 'Picking', 'Packing', 'Shipping', 'Safety', 'WMS'],
      prerequisites: ['1 year warehouse experience', 'Safety training'],
      renewalRequirements: ['30 continuing education credits every 3 years'],
      issuedBy: 'Warehouse Operations Institute',
      accreditation: 'IWO Certified',
      image: '/images/cert-warehouse.jpg',
      tags: ['warehouse', 'operations', 'professional'],
      featured: true,
      popular: true,
      badge: 'CWP',
      color: 'bg-green-600',
      recentIssuances: [
        { id: 4, name: 'Emma Watson', date: '2024-03-13', expiry: '2027-03-13', status: 'active' },
        { id: 5, name: 'Tom Brown', date: '2024-03-11', expiry: '2027-03-11', status: 'active' },
      ],
    },
    {
      id: 'CERT-003',
      name: 'Certified Safety Professional',
      code: 'CSP-2024',
      description: 'Advanced safety certification covering OSHA standards, risk assessment, incident investigation, and safety management.',
      longDescription: 'The Certified Safety Professional (CSP) certification is the gold standard for safety professionals. It covers OSHA regulations, hazard identification, risk assessment, incident investigation, emergency response, safety training, and safety program management. Required for safety officers and managers.',
      category: 'safety',
      level: 'advanced',
      status: 'active',
      validityPeriod: 3,
      validityUnit: 'years',
      creditHours: 80,
      passingScore: 75,
      examFormat: 'In-person',
      examDuration: 240,
      questions: 200,
      price: 599,
      currency: 'USD',
      enrolled: 234,
      certified: 178,
      passRate: 76,
      rating: 4.9,
      reviews: 98,
      skills: ['OSHA Standards', 'Risk Assessment', 'Incident Investigation', 'Emergency Response', 'Safety Management'],
      prerequisites: ['3 years safety experience', 'OSHA 30 certification'],
      renewalRequirements: ['40 continuing education credits every 3 years', 'Current CPR certification'],
      issuedBy: 'Board of Certified Safety Professionals',
      accreditation: 'ANSI Accredited',
      image: '/images/cert-safety.jpg',
      tags: ['safety', 'professional', 'advanced'],
      featured: true,
      popular: false,
      badge: 'CSP',
      color: 'bg-red-600',
      recentIssuances: [
        { id: 6, name: 'David Lee', date: '2024-03-10', expiry: '2027-03-10', status: 'active' },
        { id: 7, name: 'Lisa Chen', date: '2024-03-08', expiry: '2027-03-08', status: 'active' },
      ],
    },
    {
      id: 'CERT-004',
      name: 'Certified Forklift Operator',
      code: 'CFO-2024',
      description: 'Essential certification for forklift operators covering safety, operation, and maintenance.',
      longDescription: 'The Certified Forklift Operator (CFO) certification validates competency in forklift operation. Training covers pre-operation inspections, safe operating procedures, load handling, maneuvering, refueling/recharging, and basic maintenance. Required for all forklift operators.',
      category: 'equipment',
      level: 'beginner',
      status: 'active',
      validityPeriod: 3,
      validityUnit: 'years',
      creditHours: 20,
      passingScore: 90,
      examFormat: 'Practical',
      examDuration: 60,
      questions: 50,
      price: 149,
      currency: 'USD',
      enrolled: 890,
      certified: 845,
      passRate: 95,
      rating: 4.9,
      reviews: 423,
      skills: ['Forklift Safety', 'Pre-op Inspection', 'Load Handling', 'Maneuvering', 'Basic Maintenance'],
      prerequisites: ['None'],
      renewalRequirements: ['Refresher training every 3 years'],
      issuedBy: 'Equipment Safety Council',
      accreditation: 'OSHA Recognized',
      image: '/images/cert-forklift.jpg',
      tags: ['forklift', 'equipment', 'operator'],
      featured: false,
      popular: true,
      badge: 'CFO',
      color: 'bg-orange-600',
      recentIssuances: [
        { id: 8, name: 'Anna Taylor', date: '2024-03-09', expiry: '2027-03-09', status: 'active' },
        { id: 9, name: 'Richard Harris', date: '2024-03-07', expiry: '2027-03-07', status: 'active' },
        { id: 10, name: 'Patricia Young', date: '2024-03-05', expiry: '2027-03-05', status: 'active' },
      ],
    },
    {
      id: 'CERT-005',
      name: 'Certified Quality Inspector',
      code: 'CQI-2024',
      description: 'Professional certification for quality control inspectors covering inspection methods, SPC, and quality systems.',
      longDescription: 'The Certified Quality Inspector (CQI) certification demonstrates proficiency in quality inspection. Topics include inspection planning, measurement tools, sampling techniques, statistical process control, documentation, and quality management systems. Ideal for quality assurance staff.',
      category: 'quality',
      level: 'intermediate',
      status: 'active',
      validityPeriod: 3,
      validityUnit: 'years',
      creditHours: 50,
      passingScore: 82,
      examFormat: 'Online',
      examDuration: 150,
      questions: 125,
      price: 349,
      currency: 'USD',
      enrolled: 267,
      certified: 198,
      passRate: 89,
      rating: 4.7,
      reviews: 87,
      skills: ['Inspection Methods', 'Measurement Tools', 'Sampling', 'SPC', 'Quality Documentation'],
      prerequisites: ['1 year quality experience', 'Basic math skills'],
      renewalRequirements: ['25 continuing education credits every 3 years'],
      issuedBy: 'Quality Assurance Institute',
      accreditation: 'IAF Certified',
      image: '/images/cert-quality.jpg',
      tags: ['quality', 'inspection', 'professional'],
      featured: false,
      popular: false,
      badge: 'CQI',
      color: 'bg-purple-600',
      recentIssuances: [
        { id: 11, name: 'Charles Lewis', date: '2024-03-06', expiry: '2027-03-06', status: 'active' },
        { id: 12, name: 'Nancy Thompson', date: '2024-03-04', expiry: '2027-03-04', status: 'active' },
      ],
    },
    {
      id: 'CERT-006',
      name: 'Certified RFID Professional',
      code: 'CRP-2024',
      description: 'Specialized certification for RFID technology implementation and management.',
      longDescription: 'The Certified RFID Professional (CRP) certification validates expertise in RFID technology. Covers RFID fundamentals, hardware selection, antenna placement, system integration, data management, and troubleshooting. Essential for IT and operations staff implementing RFID.',
      category: 'technology',
      level: 'advanced',
      status: 'active',
      validityPeriod: 2,
      validityUnit: 'years',
      creditHours: 45,
      passingScore: 85,
      examFormat: 'Online',
      examDuration: 120,
      questions: 100,
      price: 449,
      currency: 'USD',
      enrolled: 123,
      certified: 89,
      passRate: 86,
      rating: 4.6,
      reviews: 42,
      skills: ['RFID Fundamentals', 'Hardware Selection', 'Antenna Placement', 'System Integration', 'Data Management'],
      prerequisites: ['Basic IT knowledge', 'RFID experience'],
      renewalRequirements: ['30 continuing education credits every 2 years'],
      issuedBy: 'RFID Professional Association',
      accreditation: 'IOT Certified',
      image: '/images/cert-rfid.jpg',
      tags: ['rfid', 'technology', 'professional'],
      featured: true,
      popular: false,
      badge: 'CRP',
      color: 'bg-cyan-600',
      recentIssuances: [
        { id: 13, name: 'Chris Evans', date: '2024-03-03', expiry: '2026-03-03', status: 'active' },
      ],
    },
    {
      id: 'CERT-007',
      name: 'Certified Supply Chain Professional',
      code: 'CSCP-2024',
      description: 'Comprehensive certification for supply chain management professionals.',
      longDescription: 'The Certified Supply Chain Professional (CSCP) certification covers the entire supply chain from sourcing to delivery. Topics include supply chain design, planning, execution, monitoring, and optimization. Ideal for supply chain managers and analysts.',
      category: 'supply-chain',
      level: 'advanced',
      status: 'upcoming',
      validityPeriod: 3,
      validityUnit: 'years',
      creditHours: 100,
      passingScore: 80,
      examFormat: 'In-person',
      examDuration: 240,
      questions: 200,
      price: 699,
      currency: 'USD',
      enrolled: 0,
      certified: 0,
      passRate: 0,
      rating: 0,
      reviews: 0,
      skills: ['Supply Chain Design', 'Planning', 'Execution', 'Monitoring', 'Optimization'],
      prerequisites: ['3 years supply chain experience', 'Bachelor\'s degree'],
      renewalRequirements: ['50 continuing education credits every 3 years'],
      issuedBy: 'Supply Chain Council',
      accreditation: 'ANSI Accredited',
      image: '/images/cert-supply-chain.jpg',
      tags: ['supply-chain', 'professional', 'advanced'],
      featured: false,
      popular: false,
      badge: 'CSCP',
      color: 'bg-indigo-600',
      recentIssuances: [],
      startDate: '2024-04-01',
    },
    {
      id: 'CERT-008',
      name: 'Certified Lean Six Sigma Green Belt',
      code: 'LSSGB-2024',
      description: 'Certification in Lean Six Sigma methodology for process improvement.',
      longDescription: 'The Lean Six Sigma Green Belt certification provides knowledge of process improvement methodologies. Covers DMAIC, statistical tools, waste reduction, and project management. Ideal for process improvement specialists and team leads.',
      category: 'quality',
      level: 'intermediate',
      status: 'active',
      validityPeriod: 3,
      validityUnit: 'years',
      creditHours: 60,
      passingScore: 83,
      examFormat: 'Online',
      examDuration: 180,
      questions: 150,
      price: 499,
      currency: 'USD',
      enrolled: 178,
      certified: 134,
      passRate: 90,
      rating: 4.8,
      reviews: 67,
      skills: ['DMAIC', 'Statistical Tools', 'Waste Reduction', 'Process Mapping', 'Project Management'],
      prerequisites: ['Basic statistics knowledge', 'Process improvement experience'],
      renewalRequirements: ['30 continuing education credits every 3 years'],
      issuedBy: 'Lean Six Sigma Institute',
      accreditation: 'IASSC Accredited',
      image: '/images/cert-sixsigma.jpg',
      tags: ['six-sigma', 'lean', 'process-improvement'],
      featured: false,
      popular: true,
      badge: 'LSSGB',
      color: 'bg-emerald-600',
      recentIssuances: [
        { id: 14, name: 'William Jones', date: '2024-03-02', expiry: '2027-03-02', status: 'active' },
        { id: 15, name: 'Elizabeth Davis', date: '2024-02-28', expiry: '2027-02-28', status: 'active' },
      ],
    },
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Certifications', count: certifications.length, icon: Award },
    { id: 'inventory', name: 'Inventory', count: certifications.filter(c => c.category === 'inventory').length, icon: Package },
    { id: 'warehouse', name: 'Warehouse', count: certifications.filter(c => c.category === 'warehouse').length, icon: Truck },
    { id: 'safety', name: 'Safety', count: certifications.filter(c => c.category === 'safety').length, icon: AlertTriangle },
    { id: 'equipment', name: 'Equipment', count: certifications.filter(c => c.category === 'equipment').length, icon: Wrench },
    { id: 'quality', name: 'Quality', count: certifications.filter(c => c.category === 'quality').length, icon: CheckCircle },
    { id: 'technology', name: 'Technology', count: certifications.filter(c => c.category === 'technology').length, icon: Cpu },
    { id: 'supply-chain', name: 'Supply Chain', count: certifications.filter(c => c.category === 'supply-chain').length, icon: Truck },
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
    expired: { label: 'Expired', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: AlertCircle },
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

  const getCategoryColor = (category) => {
    const found = categories.find(c => c.id === category);
    return found?.color || 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'inventory': return <Package size={16} className="text-blue-600" />;
      case 'warehouse': return <Truck size={16} className="text-green-600" />;
      case 'safety': return <AlertTriangle size={16} className="text-red-600" />;
      case 'equipment': return <Wrench size={16} className="text-orange-600" />;
      case 'quality': return <CheckCircle size={16} className="text-purple-600" />;
      case 'technology': return <Cpu size={16} className="text-cyan-600" />;
      case 'supply-chain': return <Truck size={16} className="text-indigo-600" />;
      default: return <Award size={16} className="text-red-600" />;
    }
  };

  const filteredCerts = certifications.filter(cert => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || cert.level === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || cert.status === selectedStatus;
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesStatus && matchesSearch;
  });

  const featuredCerts = filteredCerts.filter(c => c.featured);
  const popularCerts = filteredCerts.filter(c => c.popular);
  const regularCerts = filteredCerts.filter(c => !c.featured && !c.popular);

  const stats = {
    total: certifications.length,
    active: certifications.filter(c => c.status === 'active').length,
    upcoming: certifications.filter(c => c.status === 'upcoming').length,
    totalCertified: certifications.reduce((sum, c) => sum + c.certified, 0),
    totalEnrolled: certifications.reduce((sum, c) => sum + c.enrolled, 0),
    avgPassRate: Math.round(certifications.reduce((sum, c) => sum + c.passRate, 0) / certifications.length),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Certifications</h1>
            <p className="text-black/50 mt-1">Professional certifications and credentials</p>
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
              Add Certification
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Certifications</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Award size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Certified</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.totalCertified}</p>
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
                  <p className="text-xs text-black/50">Enrolled</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.totalEnrolled}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <GraduationCap size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Pass Rate</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.avgPassRate}%</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <Target size={18} className="text-green-600" />
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
              placeholder="Search by name, code, or tags..."
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
              <SelectItem value="expired">Expired</SelectItem>
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
      {featuredCerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-600" />
            Featured Certifications
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {featuredCerts.map((cert) => (
              <CertificationCard 
                key={cert.id} 
                cert={cert} 
                onView={() => {
                  setSelectedCert(cert);
                  setShowDetailsDialog(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Popular Section */}
      {popularCerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-green-600" />
            Popular Certifications
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {popularCerts.map((cert) => (
              <CertificationCard 
                key={cert.id} 
                cert={cert} 
                onView={() => {
                  setSelectedCert(cert);
                  setShowDetailsDialog(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Certifications Section */}
      <div>
        <h2 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
          <Award size={16} className="text-red-600" />
          All Certifications
        </h2>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {regularCerts.map((cert) => (
              <CertificationCard 
                key={cert.id} 
                cert={cert} 
                onView={() => {
                  setSelectedCert(cert);
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
                    <TableHead className="text-black/50">Certification</TableHead>
                    <TableHead className="text-black/50">Code</TableHead>
                    <TableHead className="text-black/50">Category</TableHead>
                    <TableHead className="text-black/50">Level</TableHead>
                    <TableHead className="text-black/50">Status</TableHead>
                    <TableHead className="text-black/50 text-right">Certified</TableHead>
                    <TableHead className="text-black/50 text-right">Pass Rate</TableHead>
                    <TableHead className="text-black/50">Validity</TableHead>
                    <TableHead className="text-black/50">Price</TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regularCerts.map((cert) => (
                    <TableRow key={cert.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-xs text-black/50 line-clamp-1">{cert.description}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{cert.code}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {cert.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getLevelColor(cert.level))}>
                          {cert.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(cert.status))}>
                          {cert.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{cert.certified}</TableCell>
                      <TableCell className="text-right">{cert.passRate}%</TableCell>
                      <TableCell>{cert.validityPeriod} {cert.validityUnit}</TableCell>
                      <TableCell>${cert.price}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            setSelectedCert(cert);
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
                  Showing {regularCerts.length} of {certifications.length} certifications
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

      {/* Create Certification Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Certification</DialogTitle>
            <DialogDescription>
              Create a new professional certification
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Certification Name</Label>
                    <Input placeholder="e.g., Certified Inventory Specialist" />
                  </div>
                  <div className="space-y-2">
                    <Label>Code</Label>
                    <Input placeholder="e.g., CIS-2024" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Brief description" rows={2} />
                </div>

                <div className="space-y-2">
                  <Label>Long Description</Label>
                  <Textarea placeholder="Detailed description" rows={4} />
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issued By</Label>
                    <Input placeholder="e.g., Professional Inventory Association" />
                  </div>
                  <div className="space-y-2">
                    <Label>Accreditation</Label>
                    <Input placeholder="e.g., IAOP Certified" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Validity Period</Label>
                    <Input type="number" placeholder="2" />
                  </div>
                  <div className="space-y-2">
                    <Label>Validity Unit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">Years</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Credit Hours</Label>
                    <Input type="number" placeholder="40" />
                  </div>
                  <div className="space-y-2">
                    <Label>Passing Score (%)</Label>
                    <Input type="number" placeholder="80" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Exam Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="in-person">In-person</SelectItem>
                        <SelectItem value="practical">Practical</SelectItem>
                        <SelectItem value="online+practical">Online + Practical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Exam Duration (min)</Label>
                    <Input type="number" placeholder="120" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Questions</Label>
                    <Input type="number" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label>Price ($)</Label>
                    <Input type="number" placeholder="299" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Skills (comma separated)</Label>
                  <Input placeholder="e.g., Inventory Management, Cycle Counting" />
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-4">
                <div className="space-y-2">
                  <Label>Prerequisites</Label>
                  <Textarea placeholder="Enter prerequisites (one per line)" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Renewal Requirements</Label>
                  <Textarea placeholder="Enter renewal requirements (one per line)" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
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
              Create Certification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Certification Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Certification Details</DialogTitle>
          </DialogHeader>

          {selectedCert && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="holders">Holders</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedCert.name}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedCert.code} • {selectedCert.category}</p>
                    </div>
                    <Badge className={cn("text-xs border-0", getStatusColor(selectedCert.status))}>
                      {selectedCert.status}
                    </Badge>
                  </div>

                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <p className="text-sm">{selectedCert.longDescription}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Issued By</p>
                      <p className="text-sm font-medium">{selectedCert.issuedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Accreditation</p>
                      <p className="text-sm font-medium">{selectedCert.accreditation}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Award size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedCert.certified}</p>
                        <p className="text-xs text-black/50">Certified</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <GraduationCap size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedCert.enrolled}</p>
                        <p className="text-xs text-black/50">Enrolled</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Target size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedCert.passRate}%</p>
                        <p className="text-xs text-black/50">Pass Rate</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Star size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedCert.rating}</p>
                        <p className="text-xs text-black/50">Rating</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Level</p>
                      <Badge className={cn("text-xs mt-1", getLevelColor(selectedCert.level))}>
                        {selectedCert.level}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Validity</p>
                      <p className="text-sm">{selectedCert.validityPeriod} {selectedCert.validityUnit}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCert.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Credit Hours</p>
                      <p className="text-lg font-bold">{selectedCert.creditHours}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Passing Score</p>
                      <p className="text-lg font-bold">{selectedCert.passingScore}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Exam Format</p>
                      <p className="text-sm">{selectedCert.examFormat}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Duration</p>
                      <p className="text-sm">{selectedCert.examDuration} minutes</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Questions</p>
                      <p className="text-sm">{selectedCert.questions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Price</p>
                      <p className="text-lg font-bold text-green-600">${selectedCert.price}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium mb-2">Skills Covered</p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedCert.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          <CheckCircle size={14} className="text-green-600" />
                          <span className="text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-4">
                  <div>
                    <p className="text-xs font-medium mb-2">Prerequisites</p>
                    <ul className="space-y-2">
                      {selectedCert.prerequisites.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertCircle size={14} className="text-blue-600 mt-0.5" />
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-medium mb-2">Renewal Requirements</p>
                    <ul className="space-y-2">
                      {selectedCert.renewalRequirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <RefreshCw size={14} className="text-green-600 mt-0.5" />
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="holders" className="space-y-4">
                  <p className="text-sm font-medium">Recent Certificate Holders</p>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedCert.recentIssuances.map((holder) => (
                        <div key={holder.id} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-red-600 text-white text-xs">
                                {holder.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{holder.name}</p>
                              <div className="flex items-center gap-2 text-xs text-black/50">
                                <Calendar size={10} />
                                <span>Issued: {holder.date}</span>
                                <Clock size={10} />
                                <span>Expires: {holder.expiry}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        </div>
                      ))}
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
            {selectedCert?.status === 'active' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowIssueDialog(true);
              }}>
                <Award className="mr-2 h-4 w-4" />
                Issue Certificate
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
            <TooltipContent side="left">Add Certification</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowIssueDialog(true)}
              >
                <Award size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Issue Certificate</TooltipContent>
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
            <TooltipContent side="left">Reports</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

// Certification Card Component
const CertificationCard = ({ cert, onView }) => {
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'inventory': return <Package size={16} className="text-blue-600" />;
      case 'warehouse': return <Truck size={16} className="text-green-600" />;
      case 'safety': return <AlertTriangle size={16} className="text-red-600" />;
      case 'equipment': return <Wrench size={16} className="text-orange-600" />;
      case 'quality': return <CheckCircle size={16} className="text-purple-600" />;
      case 'technology': return <Cpu size={16} className="text-cyan-600" />;
      case 'supply-chain': return <Truck size={16} className="text-indigo-600" />;
      default: return <Award size={16} className="text-red-600" />;
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
      case 'expired': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="border-[#F5EEE9] hover:shadow-lg transition-all group">
      <CardContent className="p-0">
        {/* Header */}
        <div className="h-24 bg-gradient-to-br from-red-600 to-black rounded-t-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Badge */}
          <div className="absolute top-3 left-3 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
            <span className={cn("text-sm font-bold text-white w-8 h-8 rounded-full flex items-center justify-center", cert.color)}>
              {cert.badge}
            </span>
          </div>

          {/* Featured/Popular Badges */}
          <div className="absolute top-3 right-3 flex gap-1">
            {cert.featured && (
              <Badge className="bg-yellow-100 text-yellow-700 border-0 text-[10px]">
                <Sparkles size={10} className="mr-1" />
                Featured
              </Badge>
            )}
            {cert.popular && (
              <Badge className="bg-green-100 text-green-700 border-0 text-[10px]">
                <TrendingUp size={10} className="mr-1" />
                Popular
              </Badge>
            )}
          </div>

          {/* Title */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-semibold text-white text-sm line-clamp-1">{cert.name}</h3>
            <p className="text-xs text-white/80 mt-0.5">{cert.code}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Level */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              {getCategoryIcon(cert.category)}
              <span className="text-xs capitalize">{cert.category}</span>
            </div>
            <Badge className={cn("text-[10px]", getLevelColor(cert.level))}>
              {cert.level}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-xs text-black/60 line-clamp-2 mb-3">
            {cert.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <Users size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{cert.certified}</p>
              <p className="text-[8px] text-black/50">Certified</p>
            </div>
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <Target size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{cert.passRate}%</p>
              <p className="text-[8px] text-black/50">Pass Rate</p>
            </div>
            <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
              <Star size={12} className="mx-auto text-black/50" />
              <p className="text-xs font-bold mt-1">{cert.rating}</p>
              <p className="text-[8px] text-black/50">Rating</p>
            </div>
          </div>

          {/* Price & Validity */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
              {cert.validityPeriod} {cert.validityUnit}
            </Badge>
            <span className="text-sm font-bold text-green-600">${cert.price}</span>
          </div>

          {/* Action Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-[#F5EEE9]"
            onClick={onView}
          >
            <Eye size={12} className="mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationsPage;