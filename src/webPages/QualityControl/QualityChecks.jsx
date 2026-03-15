// app/dashboard/quality-checks/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  Calendar,
  User,
  Package,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Settings,
  History,
  BarChart3,
 
  Ruler,
  Microscope,
  Activity,
  Plus,
  FlaskConical,

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const QualityChecksPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCheck, setSelectedCheck] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedResult, setSelectedResult] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showPerformDialog, setShowPerformDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample quality checks data
  const qualityChecks = [
    {
      id: 'QC-001',
      name: 'Incoming Raw Materials Inspection',
      description: 'Quality inspection of raw materials received from supplier',
      type: 'incoming',
      status: 'completed',
      result: 'passed',
      priority: 'high',
      category: 'raw-materials',
      productId: 'PRD-001',
      productName: 'Premium Wireless Headphones',
      sku: 'SKU-001',
      batchNumber: 'BATCH-001',
      supplier: 'AudioTech Manufacturing',
      inspector: 'John Doe',
      inspectorId: 'USR-001',
      reviewer: 'Jane Smith',
      reviewerId: 'USR-002',
      scheduledDate: '2024-03-15',
      completedDate: '2024-03-15',
      dueDate: '2024-03-16',
      location: 'Warehouse A',
      zone: 'Receiving Zone',
      sampleSize: 50,
      defectCount: 1,
      defectRate: 2,
      measurements: [
        { name: 'Weight', value: '45.2g', spec: '45g ± 2g', status: 'pass' },
        { name: 'Dimensions', value: '60x40x20mm', spec: '60x40x20mm ±1mm', status: 'pass' },
        { name: 'Material Hardness', value: '85 Shore A', spec: '80-90 Shore A', status: 'pass' },
        { name: 'Color Consistency', value: 'Match', spec: 'Match standard', status: 'pass' },
      ],
      testResults: [
        { name: 'Visual Inspection', result: 'pass', notes: 'No visible defects' },
        { name: 'Functional Test', result: 'pass', notes: 'All functions working' },
        { name: 'Durability Test', result: 'pass', notes: 'Passed 1000 cycles' },
      ],
      attachments: [
        { name: 'inspection-report.pdf', size: '2.4 MB' },
        { name: 'test-results.xlsx', size: '1.2 MB' },
      ],
      notes: 'Minor cosmetic issue on 1 unit - accepted per AQL',
      tags: ['incoming', 'raw-materials', 'completed'],
      createdAt: '2024-03-14',
      updatedAt: '2024-03-15',
    },
    {
      id: 'QC-002',
      name: 'In-Process Quality Check - Assembly Line A',
      description: 'Quality check during assembly process for electronic components',
      type: 'in-process',
      status: 'in-progress',
      result: 'pending',
      priority: 'high',
      category: 'assembly',
      productId: 'PRD-001',
      productName: 'Premium Wireless Headphones',
      sku: 'SKU-001',
      batchNumber: 'BATCH-002',
      inspector: 'Mike Johnson',
      inspectorId: 'USR-003',
      reviewer: null,
      scheduledDate: '2024-03-16',
      completedDate: null,
      dueDate: '2024-03-16',
      location: 'Production Line A',
      zone: 'Assembly Area',
      sampleSize: 25,
      defectCount: 0,
      defectRate: 0,
      measurements: [
        { name: 'Solder Quality', value: 'Good', spec: 'No cold joints', status: 'pass' },
        { name: 'Component Placement', value: 'Correct', spec: 'All components placed', status: 'pass' },
        { name: 'Connection Test', value: 'Pending', spec: 'Continuity check', status: 'pending' },
      ],
      testResults: [
        { name: 'Visual Inspection', result: 'pass', notes: 'Good solder joints' },
        { name: 'Continuity Test', result: 'pending', notes: 'Awaiting results' },
      ],
      attachments: [],
      notes: 'First article inspection in progress',
      tags: ['in-process', 'assembly', 'in-progress'],
      createdAt: '2024-03-15',
      updatedAt: '2024-03-16',
    },
    {
      id: 'QC-003',
      name: 'Finished Goods Inspection - Batch BATCH-003',
      description: 'Final quality inspection of finished products before shipping',
      type: 'final',
      status: 'pending',
      result: 'pending',
      priority: 'high',
      category: 'finished-goods',
      productId: 'PRD-002',
      productName: 'Organic Protein Powder',
      sku: 'SKU-002',
      batchNumber: 'BATCH-003',
      supplier: 'NutriHealth Labs',
      inspector: null,
      reviewer: null,
      scheduledDate: '2024-03-17',
      completedDate: null,
      dueDate: '2024-03-18',
      location: 'Warehouse C',
      zone: 'Quality Lab',
      sampleSize: 30,
      defectCount: 0,
      defectRate: 0,
      measurements: [],
      testResults: [],
      attachments: [],
      notes: 'Awaiting laboratory test results',
      tags: ['final', 'finished-goods', 'pending'],
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15',
    },
    {
      id: 'QC-004',
      name: 'Supplier Quality Audit - Office Furniture Co',
      description: 'Quality audit of supplier manufacturing facility',
      type: 'audit',
      status: 'scheduled',
      result: 'pending',
      priority: 'medium',
      category: 'supplier-audit',
      supplier: 'Office Furniture Co',
      auditor: 'Sarah Wilson',
      auditorId: 'USR-004',
      scheduledDate: '2024-03-20',
      completedDate: null,
      dueDate: '2024-03-22',
      location: 'Supplier Facility',
      zone: 'Manufacturing Plant',
      auditScore: null,
      maxScore: 100,
      findings: [],
      nonConformities: [],
      attachments: [],
      notes: 'Annual supplier quality audit',
      tags: ['audit', 'supplier', 'scheduled'],
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10',
    },
    {
      id: 'QC-005',
      name: 'Temperature Monitoring - Cold Storage',
      description: 'Daily temperature verification in cold storage zones',
      type: 'monitoring',
      status: 'completed',
      result: 'warning',
      priority: 'high',
      category: 'environmental',
      location: 'Warehouse C',
      zone: 'Cold Storage',
      inspector: 'Emma Watson',
      inspectorId: 'USR-005',
      reviewer: 'Tom Brown',
      reviewerId: 'USR-007',
      scheduledDate: '2024-03-16',
      completedDate: '2024-03-16',
      dueDate: '2024-03-16',
      measurements: [
        { name: 'Zone A Temperature', value: '2.8°C', spec: '2-4°C', status: 'pass' },
        { name: 'Zone B Temperature', value: '4.5°C', spec: '2-4°C', status: 'fail' },
        { name: 'Zone C Temperature', value: '3.2°C', spec: '2-4°C', status: 'pass' },
        { name: 'Humidity', value: '68%', spec: '60-70%', status: 'pass' },
      ],
      testResults: [
        { name: 'Temperature Log Review', result: 'warning', notes: 'Zone B exceeded range at 4.5°C' },
      ],
      attachments: [
        { name: 'temperature-log.pdf', size: '1.8 MB' },
      ],
      notes: 'Zone B temperature spike - HVAC maintenance notified',
      tags: ['monitoring', 'temperature', 'cold-chain'],
      createdAt: '2024-03-16',
      updatedAt: '2024-03-16',
    },
    {
      id: 'QC-006',
      name: 'First Article Inspection - New Product',
      description: 'First article inspection for new product design',
      type: 'first-article',
      status: 'in-progress',
      result: 'pending',
      priority: 'high',
      category: 'new-product',
      productId: 'PRD-015',
      productName: 'New Product Prototype',
      sku: 'SKU-015',
      batchNumber: 'PROTO-001',
      inspector: 'David Lee',
      inspectorId: 'USR-006',
      reviewer: null,
      scheduledDate: '2024-03-14',
      completedDate: null,
      dueDate: '2024-03-19',
      location: 'Engineering Lab',
      zone: 'Prototyping',
      sampleSize: 5,
      defectCount: 2,
      defectRate: 40,
      measurements: [
        { name: 'Dimension A', value: '45.2mm', spec: '45.0mm ±0.5mm', status: 'pass' },
        { name: 'Dimension B', value: '30.8mm', spec: '30.0mm ±0.5mm', status: 'fail' },
        { name: 'Weight', value: '125g', spec: '120g ±5g', status: 'pass' },
        { name: 'Material Hardness', value: '82 Shore A', spec: '80-85 Shore A', status: 'pass' },
      ],
      testResults: [
        { name: 'Dimensional Check', result: 'fail', notes: 'Dimension B out of spec' },
        { name: 'Material Test', result: 'pass', notes: 'Material meets spec' },
        { name: 'Functional Test', result: 'pending', notes: 'Awaiting results' },
      ],
      attachments: [
        { name: 'fai-report.pdf', size: '3.2 MB' },
        { name: 'measurements.xlsx', size: '1.5 MB' },
      ],
      notes: 'Dimension B out of spec - engineering review required',
      tags: ['first-article', 'new-product', 'in-progress'],
      createdAt: '2024-03-13',
      updatedAt: '2024-03-15',
    },
    {
      id: 'QC-007',
      name: 'Monthly Quality Audit - Warehouse A',
      description: 'Monthly quality audit of warehouse operations and processes',
      type: 'audit',
      status: 'completed',
      result: 'passed',
      priority: 'medium',
      category: 'warehouse-audit',
      auditor: 'Lisa Chen',
      auditorId: 'USR-008',
      reviewer: 'Mike Johnson',
      reviewerId: 'USR-003',
      scheduledDate: '2024-03-10',
      completedDate: '2024-03-11',
      dueDate: '2024-03-15',
      location: 'Warehouse A',
      zone: 'All Zones',
      auditScore: 94,
      maxScore: 100,
      findings: [
        { area: 'Receiving', finding: 'Missing documentation for 2 shipments', severity: 'minor' },
        { area: 'Picking', finding: 'Pick accuracy 99.2% - meets target', severity: 'positive' },
        { area: 'Storage', finding: 'Some bins need relabeling', severity: 'minor' },
      ],
      nonConformities: [],
      attachments: [
        { name: 'audit-report.pdf', size: '4.2 MB' },
        { name: 'findings-summary.xlsx', size: '1.8 MB' },
      ],
      notes: 'Overall good performance. Minor issues noted for follow-up.',
      tags: ['audit', 'warehouse', 'monthly'],
      createdAt: '2024-03-05',
      updatedAt: '2024-03-11',
    },
    {
      id: 'QC-008',
      name: 'Packaging Integrity Test',
      description: 'Testing packaging integrity for shipping durability',
      type: 'test',
      status: 'completed',
      result: 'failed',
      priority: 'critical',
      category: 'packaging',
      productId: 'PRD-007',
      productName: 'Smart LED TV 55"',
      sku: 'SKU-007',
      batchNumber: 'BATCH-007',
      inspector: 'Tom Brown',
      inspectorId: 'USR-007',
      reviewer: 'Sarah Wilson',
      reviewerId: 'USR-004',
      scheduledDate: '2024-03-12',
      completedDate: '2024-03-13',
      dueDate: '2024-03-14',
      location: 'Testing Lab',
      zone: 'Packaging',
      sampleSize: 10,
      defectCount: 3,
      defectRate: 30,
      measurements: [
        { name: 'Drop Test', value: '3 failures', spec: '0 failures', status: 'fail' },
        { name: 'Vibration Test', value: 'Pass', spec: 'Pass', status: 'pass' },
        { name: 'Compression Test', value: 'Pass', spec: 'Pass', status: 'pass' },
      ],
      testResults: [
        { name: 'Drop Test - 1m', result: 'fail', notes: '3 units showed damage' },
        { name: 'Vibration Test', result: 'pass', notes: 'All units passed' },
        { name: 'Compression Test', result: 'pass', notes: 'Packaging held weight' },
      ],
      attachments: [
        { name: 'test-report.pdf', size: '2.8 MB' },
        { name: 'failure-analysis.pdf', size: '1.9 MB' },
      ],
      notes: 'Packaging redesign required - excessive damage in drop test',
      tags: ['packaging', 'test', 'failed'],
      createdAt: '2024-03-10',
      updatedAt: '2024-03-13',
    },
    {
      id: 'QC-009',
      name: 'Chemical Composition Analysis',
      description: 'Chemical analysis of raw material batch',
      type: 'laboratory',
      status: 'in-progress',
      result: 'pending',
      priority: 'high',
      category: 'chemical',
      productId: 'PRD-003',
      productName: 'Industrial Lubricant - Grade A',
      sku: 'SKU-003',
      batchNumber: 'BATCH-008',
      supplier: 'ChemCorp Industries',
      inspector: 'Lab Technician',
      inspectorId: 'USR-009',
      reviewer: null,
      scheduledDate: '2024-03-15',
      completedDate: null,
      dueDate: '2024-03-20',
      location: 'Analytical Lab',
      zone: 'Chemistry',
      sampleSize: 3,
      defectCount: 0,
      defectRate: 0,
      measurements: [
        { name: 'Viscosity', value: 'Pending', spec: '32-38 cSt', status: 'pending' },
        { name: 'Flash Point', value: 'Pending', spec: '>200°C', status: 'pending' },
        { name: 'Density', value: 'Pending', spec: '0.85-0.89 g/mL', status: 'pending' },
      ],
      testResults: [],
      attachments: [],
      notes: 'Samples sent to external lab for analysis',
      tags: ['laboratory', 'chemical', 'analysis'],
      createdAt: '2024-03-14',
      updatedAt: '2024-03-14',
    },
    {
      id: 'QC-010',
      name: 'Microbiological Testing - Batch BATCH-009',
      description: 'Microbiological testing for food products',
      type: 'laboratory',
      status: 'completed',
      result: 'passed',
      priority: 'critical',
      category: 'microbiology',
      productId: 'PRD-006',
      productName: 'Canned Organic Soup',
      sku: 'SKU-006',
      batchNumber: 'BATCH-009',
      supplier: 'Organic Food Co',
      inspector: 'Lab Technician',
      inspectorId: 'USR-009',
      reviewer: 'Quality Manager',
      reviewerId: 'USR-010',
      scheduledDate: '2024-03-08',
      completedDate: '2024-03-12',
      dueDate: '2024-03-15',
      location: 'Microbiology Lab',
      zone: 'Testing',
      sampleSize: 20,
      defectCount: 0,
      defectRate: 0,
      measurements: [
        { name: 'Total Plate Count', value: '<10 CFU/g', spec: '<100 CFU/g', status: 'pass' },
        { name: 'E. coli', value: 'Not detected', spec: 'Negative', status: 'pass' },
        { name: 'Salmonella', value: 'Not detected', spec: 'Negative', status: 'pass' },
        { name: 'Yeast & Mold', value: '<10 CFU/g', spec: '<50 CFU/g', status: 'pass' },
      ],
      testResults: [
        { name: 'Microbiological Analysis', result: 'pass', notes: 'All tests passed' },
      ],
      attachments: [
        { name: 'lab-report.pdf', size: '3.5 MB' },
        { name: 'certificate-of-analysis.pdf', size: '2.1 MB' },
      ],
      notes: 'Batch released for distribution',
      tags: ['microbiology', 'food-safety', 'laboratory'],
      createdAt: '2024-03-05',
      updatedAt: '2024-03-12',
    },
  ];

  // Quality check types
  const checkTypes = [
    { id: 'all', name: 'All Types', count: qualityChecks.length },
    { id: 'incoming', name: 'Incoming', count: qualityChecks.filter(c => c.type === 'incoming').length },
    { id: 'in-process', name: 'In-Process', count: qualityChecks.filter(c => c.type === 'in-process').length },
    { id: 'final', name: 'Final', count: qualityChecks.filter(c => c.type === 'final').length },
    { id: 'audit', name: 'Audit', count: qualityChecks.filter(c => c.type === 'audit').length },
    { id: 'monitoring', name: 'Monitoring', count: qualityChecks.filter(c => c.type === 'monitoring').length },
    { id: 'first-article', name: 'First Article', count: qualityChecks.filter(c => c.type === 'first-article').length },
    { id: 'test', name: 'Test', count: qualityChecks.filter(c => c.type === 'test').length },
    { id: 'laboratory', name: 'Laboratory', count: qualityChecks.filter(c => c.type === 'laboratory').length },
  ];

  // Status configuration
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    scheduled: { label: 'Scheduled', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Calendar },
    'in-progress': { label: 'In Progress', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Activity },
    completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
  };

  const resultConfig = {
    passed: { label: 'Passed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: AlertCircle },
    warning: { label: 'Warning', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle },
    pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700', icon: Clock },
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    critical: { label: 'Critical', color: 'bg-red-100 text-red-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Clock;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getResultIcon = (result) => {
    const config = resultConfig[result];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getResultColor = (result) => {
    return resultConfig[result]?.color || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-100 text-gray-700';
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'incoming': return <Download size={14} className="text-blue-600" />;
      case 'in-process': return <Activity size={14} className="text-purple-600" />;
      case 'final': return <CheckCircle size={14} className="text-green-600" />;
      case 'audit': return <ClipboardCheck size={14} className="text-orange-600" />;
      case 'monitoring': return <Activity size={14} className="text-cyan-600" />;
      case 'first-article': return <FileText size={14} className="text-indigo-600" />;
      case 'test': return <FlaskConical size={14} className="text-pink-600" />;
      case 'laboratory': return <Microscope size={14} className="text-red-600" />;
      default: return <CheckCircle size={14} className="text-gray-600" />;
    }
  };

  const filteredChecks = qualityChecks.filter(check => {
    const matchesStatus = selectedStatus === 'all' || check.status === selectedStatus;
    const matchesType = selectedType === 'all' || check.type === selectedType;
    const matchesResult = selectedResult === 'all' || check.result === selectedResult;
    const matchesSearch = check.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         check.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         check.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         check.batchNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         check.inspector?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         check.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesType && matchesResult && matchesSearch;
  });

  const stats = {
    total: qualityChecks.length,
    pending: qualityChecks.filter(c => c.status === 'pending' || c.status === 'scheduled').length,
    inProgress: qualityChecks.filter(c => c.status === 'in-progress').length,
    completed: qualityChecks.filter(c => c.status === 'completed').length,
    passed: qualityChecks.filter(c => c.result === 'passed').length,
    failed: qualityChecks.filter(c => c.result === 'failed').length,
    warning: qualityChecks.filter(c => c.result === 'warning').length,
    critical: qualityChecks.filter(c => c.priority === 'critical').length,
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Quality Checks</h1>
            <p className="text-black/50 mt-1">Manage quality inspections, tests, and audits</p>
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
              New Quality Check
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Checks</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <CheckCircle size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">In Progress</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.inProgress}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Activity size={18} className="text-purple-600" />
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
                  <p className="text-xs text-black/50">Passed</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.passed}</p>
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
                  <p className="text-xs text-black/50">Failed</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.failed}</p>
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
                  <p className="text-xs text-black/50">Critical</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.critical}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertTriangle size={18} className="text-red-600" />
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
              placeholder="Search by name, product, batch, or inspector..."
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
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Check Type" />
            </SelectTrigger>
            <SelectContent>
              {checkTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name} ({type.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedResult} onValueChange={setSelectedResult}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              <SelectItem value="passed">Passed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
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

      {/* Quality Checks Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredChecks.map((check) => {
            const StatusIcon = statusConfig[check.status]?.icon || Clock;
            const ResultIcon = resultConfig[check.result]?.icon || CheckCircle;
            
            return (
              <Card key={check.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(check.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {check.status}
                          </Badge>
                          <Badge className={cn("text-xs border-0", getResultColor(check.result))}>
                            <ResultIcon className="mr-1" size={10} />
                            {check.result}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(check.priority))}>
                            {check.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{check.name}</h3>
                        <p className="text-xs text-black/50 mt-1 line-clamp-1">{check.description}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedCheck(check);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {check.status !== 'completed' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedCheck(check);
                              setShowPerformDialog(true);
                            }}>
                              <Activity className="mr-2 h-4 w-4" />
                              Perform Check
                            </DropdownMenuItem>
                          )}
                          {check.status === 'completed' && check.result === 'pending' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedCheck(check);
                              setShowReviewDialog(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              Review Results
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
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
                    {/* Product/Batch Info */}
                    {check.productName && (
                      <div className="flex items-center gap-2 mb-2">
                        <Package size={12} className="text-black/50" />
                        <span className="text-xs font-medium">{check.productName}</span>
                        {check.batchNumber && (
                          <>
                            <span className="text-xs text-black/30">•</span>
                            <span className="text-xs text-black/50">Batch: {check.batchNumber}</span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Inspector & Dates */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <User size={12} className="text-black/50" />
                        <span className="text-xs text-black/70">{check.inspector || 'Unassigned'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-black/50" />
                        <span className="text-xs text-black/70">{check.scheduledDate}</span>
                      </div>
                    </div>

                    {/* Sample Info */}
                    {check.sampleSize && (
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="p-2 bg-[#F5EEE9]/30 rounded text-center">
                          <p className="text-[10px] text-black/50">Sample Size</p>
                          <p className="text-sm font-bold">{check.sampleSize}</p>
                        </div>
                        <div className="p-2 bg-[#F5EEE9]/30 rounded text-center">
                          <p className="text-[10px] text-black/50">Defects</p>
                          <p className="text-sm font-bold text-red-600">{check.defectCount || 0}</p>
                        </div>
                      </div>
                    )}

                    {/* Measurements Preview */}
                    {check.measurements && check.measurements.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1 mb-1">
                          <Ruler size={12} className="text-black/50" />
                          <span className="text-xs text-black/50">Key Measurements</span>
                        </div>
                        <div className="space-y-1">
                          {check.measurements.slice(0, 2).map((m, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <span className="text-black/70">{m.name}:</span>
                              <div className="flex items-center gap-1">
                                <span className="font-medium">{m.value}</span>
                                {m.status === 'pass' && <CheckCircle size={10} className="text-green-600" />}
                                {m.status === 'fail' && <AlertCircle size={10} className="text-red-600" />}
                                {m.status === 'pending' && <Clock size={10} className="text-yellow-600" />}
                              </div>
                            </div>
                          ))}
                          {check.measurements.length > 2 && (
                            <p className="text-[10px] text-black/30">+{check.measurements.length - 2} more</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {check.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                      {check.tags.length > 2 && (
                        <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                          +{check.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
                      <span>Type: {check.type}</span>
                      {check.attachments && check.attachments.length > 0 && (
                        <div className="flex items-center gap-1">
                          <FileText size={10} />
                          <span>{check.attachments.length}</span>
                        </div>
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
                  <TableHead className="text-black/50">Name</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Result</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Product</TableHead>
                  <TableHead className="text-black/50">Inspector</TableHead>
                  <TableHead className="text-black/50">Scheduled</TableHead>
                  <TableHead className="text-black/50 text-right">Sample</TableHead>
                  <TableHead className="text-black/50 text-right">Defects</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChecks.map((check) => (
                  <TableRow key={check.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{check.name}</p>
                        <p className="text-xs text-black/50 line-clamp-1">{check.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {check.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(check.status))}>
                        {check.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getResultColor(check.result))}>
                        {check.result}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(check.priority))}>
                        {check.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">{check.productName || '—'}</TableCell>
                    <TableCell>{check.inspector || '—'}</TableCell>
                    <TableCell className="text-xs">{check.scheduledDate}</TableCell>
                    <TableCell className="text-right">{check.sampleSize || '—'}</TableCell>
                    <TableCell className="text-right text-red-600">{check.defectCount || 0}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedCheck(check);
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
                Showing {filteredChecks.length} of {qualityChecks.length} quality checks
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

      {/* Create Quality Check Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Quality Check</DialogTitle>
            <DialogDescription>
              Create a new quality inspection or test
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="measurements">Measurements</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Check Name</Label>
                    <Input placeholder="e.g., Incoming Raw Materials Inspection" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="incoming">Incoming</SelectItem>
                        <SelectItem value="in-process">In-Process</SelectItem>
                        <SelectItem value="final">Final</SelectItem>
                        <SelectItem value="audit">Audit</SelectItem>
                        <SelectItem value="monitoring">Monitoring</SelectItem>
                        <SelectItem value="first-article">First Article</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="laboratory">Laboratory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the quality check" rows={3} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product (Optional)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PRD-001">Premium Wireless Headphones</SelectItem>
                        <SelectItem value="PRD-002">Organic Protein Powder</SelectItem>
                        <SelectItem value="PRD-003">Industrial Lubricant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Batch/Lot (Optional)</Label>
                    <Input placeholder="e.g., BATCH-001" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Supplier (Optional)</Label>
                    <Input placeholder="Supplier name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="e.g., Warehouse A" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <RadioGroup defaultValue="medium" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="critical" id="critical" />
                      <Label htmlFor="critical">Critical</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="measurements" className="space-y-4">
                <div className="space-y-2">
                  <Label>Sample Size</Label>
                  <Input type="number" placeholder="Number of items to inspect" />
                </div>

                <div className="space-y-2">
                  <Label>Acceptable Quality Level (AQL) %</Label>
                  <Input type="number" placeholder="e.g., 2.5" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Measurement Specifications</Label>
                    <Button variant="outline" size="sm">
                      <Plus size={14} className="mr-2" />
                      Add Measurement
                    </Button>
                  </div>
                  
                  {[1, 2].map((i) => (
                    <div key={i} className="grid grid-cols-3 gap-2">
                      <Input placeholder="Measurement name" />
                      <Input placeholder="Specification" />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm">mm</SelectItem>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="°C">°C</SelectItem>
                          <SelectItem value="%">%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Test Methods</Label>
                  <Textarea placeholder="Describe test methods to be used" rows={3} />
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Scheduled Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Inspector</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign inspector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Doe</SelectItem>
                      <SelectItem value="jane">Jane Smith</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                      <SelectItem value="sarah">Sarah Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <RadioGroup defaultValue="scheduled">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scheduled" id="scheduled" />
                      <Label htmlFor="scheduled">Schedule for later</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pending" id="pending" />
                      <Label htmlFor="pending">Mark as Pending</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes" rows={3} />
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
              Create Quality Check
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quality Check Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Quality Check Details</DialogTitle>
          </DialogHeader>

          {selectedCheck && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="measurements">Measurements</TabsTrigger>
                  <TabsTrigger value="tests">Test Results</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedCheck.name}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedCheck.type} • {selectedCheck.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cn("text-xs border-0", getStatusColor(selectedCheck.status))}>
                        {selectedCheck.status}
                      </Badge>
                      <Badge className={cn("text-xs border-0", getResultColor(selectedCheck.result))}>
                        {selectedCheck.result}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <p className="text-sm">{selectedCheck.description}</p>
                  </div>

                  {selectedCheck.productName && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-black/50">Product</p>
                        <p className="text-sm font-medium">{selectedCheck.productName}</p>
                        <p className="text-xs text-black/50">{selectedCheck.sku}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/50">Batch/Lot</p>
                        <p className="text-sm font-medium">{selectedCheck.batchNumber || 'N/A'}</p>
                      </div>
                    </div>
                  )}

                  {selectedCheck.supplier && (
                    <div>
                      <p className="text-xs text-black/50">Supplier</p>
                      <p className="text-sm font-medium">{selectedCheck.supplier}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Inspector</p>
                      <p className="text-sm font-medium">{selectedCheck.inspector || 'Unassigned'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Reviewer</p>
                      <p className="text-sm font-medium">{selectedCheck.reviewer || 'Not reviewed'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Location</p>
                      <p className="text-sm">{selectedCheck.location} • {selectedCheck.zone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Priority</p>
                      <Badge className={cn("text-xs", getPriorityColor(selectedCheck.priority))}>
                        {selectedCheck.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Calendar size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-xs font-medium">Scheduled</p>
                        <p className="text-sm">{selectedCheck.scheduledDate}</p>
                      </CardContent>
                    </Card>
                    {selectedCheck.completedDate && (
                      <Card className="border-[#F5EEE9]">
                        <CardContent className="p-2 text-center">
                          <CheckCircle size={14} className="mx-auto text-black/50 mb-1" />
                          <p className="text-xs font-medium">Completed</p>
                          <p className="text-sm">{selectedCheck.completedDate}</p>
                        </CardContent>
                      </Card>
                    )}
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Clock size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-xs font-medium">Due</p>
                        <p className="text-sm">{selectedCheck.dueDate}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedCheck.auditScore !== undefined && (
                    <div>
                      <p className="text-xs text-black/50">Audit Score</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(selectedCheck.auditScore / selectedCheck.maxScore) * 100} className="flex-1 h-2 bg-[#F5EEE9]" />
                        <span className="text-sm font-medium">{selectedCheck.auditScore}/{selectedCheck.maxScore}</span>
                      </div>
                    </div>
                  )}

                  {selectedCheck.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedCheck.notes}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCheck.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="measurements" className="space-y-4">
                  {selectedCheck.measurements && selectedCheck.measurements.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCheck.measurements.map((measurement, idx) => (
                        <div key={idx} className="p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{measurement.name}</p>
                            <Badge className={cn(
                              "text-xs",
                              measurement.status === 'pass' && 'bg-green-100 text-green-700',
                              measurement.status === 'fail' && 'bg-red-100 text-red-700',
                              measurement.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                            )}>
                              {measurement.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-xs text-black/50">Value</p>
                              <p className="font-medium">{measurement.value}</p>
                            </div>
                            <div>
                              <p className="text-xs text-black/50">Specification</p>
                              <p className="font-medium">{measurement.spec}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-black/50 text-center py-4">No measurements recorded</p>
                  )}
                </TabsContent>

                <TabsContent value="tests" className="space-y-4">
                  {selectedCheck.testResults && selectedCheck.testResults.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCheck.testResults.map((test, idx) => (
                        <div key={idx} className="p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{test.name}</p>
                            <Badge className={cn(
                              "text-xs",
                              test.result === 'pass' && 'bg-green-100 text-green-700',
                              test.result === 'fail' && 'bg-red-100 text-red-700',
                              test.result === 'warning' && 'bg-yellow-100 text-yellow-700',
                              test.result === 'pending' && 'bg-gray-100 text-gray-700',
                            )}>
                              {test.result}
                            </Badge>
                          </div>
                          {test.notes && (
                            <p className="text-sm text-black/70">{test.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-black/50 text-center py-4">No test results recorded</p>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                        <CheckCircle size={12} className="text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Quality Check Completed</p>
                            <span className="text-[10px] text-black/50">{selectedCheck.completedDate || selectedCheck.updatedAt}</span>
                          </div>
                          <p className="text-[10px] text-black/50">By: {selectedCheck.inspector || 'System'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                        <Activity size={12} className="text-purple-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Quality Check Started</p>
                            <span className="text-[10px] text-black/50">{selectedCheck.scheduledDate}</span>
                          </div>
                          <p className="text-[10px] text-black/50">By: {selectedCheck.inspector || 'System'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                        <Plus size={12} className="text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Quality Check Created</p>
                            <span className="text-[10px] text-black/50">{selectedCheck.createdAt}</span>
                          </div>
                          <p className="text-[10px] text-black/50">By: System</p>
                        </div>
                      </div>
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
            {selectedCheck?.status !== 'completed' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowPerformDialog(true);
              }}>
                <Activity className="mr-2 h-4 w-4" />
                Perform Check
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Perform Quality Check Dialog */}
      <Dialog open={showPerformDialog} onOpenChange={setShowPerformDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Perform Quality Check</DialogTitle>
            <DialogDescription>
              Record results for {selectedCheck?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedCheck?.name}</p>
              <p className="text-xs text-black/50">{selectedCheck?.type} • {selectedCheck?.category}</p>
            </div>

            <div className="space-y-3">
              <Label>Overall Result</Label>
              <RadioGroup defaultValue="pass" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pass" id="result-pass" />
                  <Label htmlFor="result-pass">Pass</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fail" id="result-fail" />
                  <Label htmlFor="result-fail">Fail</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="warning" id="result-warning" />
                  <Label htmlFor="result-warning">Warning</Label>
                </div>
              </RadioGroup>
            </div>

            {selectedCheck?.measurements && selectedCheck.measurements.length > 0 && (
              <div className="space-y-3">
                <Label>Measurements</Label>
                {selectedCheck.measurements.map((measurement, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <p className="text-sm font-medium">{measurement.name}</p>
                      <p className="text-xs text-black/50">Spec: {measurement.spec}</p>
                    </div>
                    <Input placeholder="Value" className="col-span-1" />
                    <Select defaultValue="pass">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pass">Pass</SelectItem>
                        <SelectItem value="fail">Fail</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <Label>Defect Count</Label>
              <Input type="number" placeholder="0" />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Enter observations or notes" rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                <Upload size={24} className="mx-auto text-black/30 mb-2" />
                <p className="text-sm text-black/50">Upload test results or photos</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPerformDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Submit Results
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
            <TooltipContent side="left">New Quality Check</TooltipContent>
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

export default QualityChecksPage;