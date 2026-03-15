// app/dashboard/defect-tracking/page.js
'use client';

import { useState } from 'react';
import { 
  AlertTriangle,
  Bug,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  User,
  Package,
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
  Thermometer,
  Cpu,
  Shield,
  Wrench,
  Activity,
  Plus,
  Ban,
  Hammer,
  Info,
  MapPin,
  Paperclip,

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
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DefectTrackingPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDefect, setSelectedDefect] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAssignee, setSelectedAssignee] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const [showReopenDialog, setShowReopenDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDefects, setSelectedDefects] = useState([]);

  // Sample defects data
  const defects = [
    {
      id: 'DEF-001',
      title: 'Conveyor belt misalignment - Zone B',
      description: 'Conveyor belt in Zone B is running off-center, causing products to jam at transfer points.',
      category: 'equipment',
      type: 'mechanical',
      severity: 'high',
      priority: 'high',
      status: 'in-progress',
      source: 'inspection',
      inspectionId: 'IR-004',
      inspectionName: 'Monthly Equipment Inspection',
      location: 'Warehouse A',
      zone: 'Packing Zone',
      equipmentId: 'CONV-002',
      equipmentName: 'Main Conveyor Belt',
      reportedBy: 'Mike Johnson',
      reportedById: 'USR-003',
      reportedDate: '2024-03-15 09:30',
      assignedTo: 'Maintenance Team',
      assignedToId: 'USR-005',
      assignedDate: '2024-03-15 10:15',
      dueDate: '2024-03-18',
      resolvedDate: null,
      rootCause: 'Worn bearing on drive roller',
      resolution: null,
      impact: 'Causes 2-3 jams per hour, reduces throughput by 15%',
      occurrences: 12,
      affectedProducts: ['All products on conveyor'],
      attachments: [
        { name: 'conveyor-photo.jpg', size: '1.2 MB' },
        { name: 'inspection-report.pdf', size: '2.4 MB' },
      ],
      comments: [
        { id: 1, user: 'Mike Johnson', date: '2024-03-15 09:35', text: 'Belt is visibly off-center by about 2 inches' },
        { id: 2, user: 'Maintenance Team', date: '2024-03-15 10:20', text: 'Ordered replacement bearing, ETA 3 days' },
      ],
      history: [
        { date: '2024-03-15 10:15', action: 'Assigned', user: 'Supervisor', details: 'Assigned to Maintenance Team' },
        { date: '2024-03-15 09:30', action: 'Reported', user: 'Mike Johnson', details: 'Defect created' },
      ],
      tags: ['conveyor', 'mechanical', 'high-priority'],
    },
    {
      id: 'DEF-002',
      title: 'Scanner intermittently failing - Station 3',
      description: 'Barcode scanner at packing station 3 intermittently fails to read labels, requiring 2-3 attempts.',
      category: 'equipment',
      type: 'electronic',
      severity: 'medium',
      priority: 'medium',
      status: 'pending',
      source: 'user-report',
      location: 'Warehouse A',
      zone: 'Packing Station 3',
      equipmentId: 'SCN-003',
      equipmentName: 'Zebra DS3608 Scanner',
      reportedBy: 'Sarah Wilson',
      reportedById: 'USR-004',
      reportedDate: '2024-03-14 14:20',
      assignedTo: null,
      assignedToId: null,
      assignedDate: null,
      dueDate: '2024-03-19',
      resolvedDate: null,
      rootCause: null,
      resolution: null,
      impact: 'Slows down packing operations, causes frustration',
      occurrences: 8,
      affectedProducts: ['All products scanned at Station 3'],
      attachments: [],
      comments: [
        { id: 1, user: 'Sarah Wilson', date: '2024-03-14 14:25', text: 'Cleaned lens, still having issues' },
      ],
      history: [
        { date: '2024-03-14 14:20', action: 'Reported', user: 'Sarah Wilson', details: 'Defect created' },
      ],
      tags: ['scanner', 'electronic', 'intermittent'],
    },
    {
      id: 'DEF-003',
      title: 'Hydraulic leak - Forklift FL-004',
      description: 'Forklift FL-004 has a slow hydraulic leak near the lift cylinder. Fluid on floor after use.',
      category: 'equipment',
      type: 'mechanical',
      severity: 'critical',
      priority: 'critical',
      status: 'resolved',
      source: 'inspection',
      inspectionId: 'IR-002',
      inspectionName: 'Equipment Inspection',
      location: 'Warehouse A',
      zone: 'Equipment Bay',
      equipmentId: 'FL-004',
      equipmentName: 'Forklift FL-004',
      reportedBy: 'Tom Brown',
      reportedById: 'USR-007',
      reportedDate: '2024-03-13 11:00',
      assignedTo: 'Maintenance Team',
      assignedToId: 'USR-005',
      assignedDate: '2024-03-13 11:30',
      dueDate: '2024-03-14',
      resolvedDate: '2024-03-14 15:45',
      rootCause: 'Worn seal on lift cylinder',
      resolution: 'Replaced hydraulic seal, refilled fluid, tested operation',
      impact: 'Forklift out of service for 2 days, reduced picking capacity',
      occurrences: 1,
      affectedProducts: ['N/A - equipment only'],
      attachments: [
        { name: 'repair-report.pdf', size: '1.8 MB' },
        { name: 'parts-receipt.pdf', size: '0.5 MB' },
      ],
      comments: [
        { id: 1, user: 'Tom Brown', date: '2024-03-13 11:05', text: 'Leak is significant - about 1 drop per minute' },
        { id: 2, user: 'Maintenance Team', date: '2024-03-13 13:20', text: 'Parts ordered, will repair tomorrow' },
        { id: 3, user: 'Maintenance Team', date: '2024-03-14 15:50', text: 'Repair complete, forklift operational' },
      ],
      history: [
        { date: '2024-03-14 15:45', action: 'Resolved', user: 'Maintenance Team', details: 'Repair completed' },
        { date: '2024-03-13 11:30', action: 'Assigned', user: 'Supervisor', details: 'Assigned to Maintenance Team' },
        { date: '2024-03-13 11:00', action: 'Reported', user: 'Tom Brown', details: 'Defect created' },
      ],
      tags: ['forklift', 'hydraulic', 'leak', 'critical'],
    },
    {
      id: 'DEF-004',
      title: 'Battery not charging - Scanner SCN-007',
      description: 'Handheld scanner battery will not charge when placed in charging cradle.',
      category: 'equipment',
      type: 'electronic',
      severity: 'medium',
      priority: 'medium',
      status: 'in-progress',
      source: 'user-report',
      location: 'Warehouse B',
      zone: 'Picking Zone',
      equipmentId: 'SCN-007',
      equipmentName: 'Zebra TC57 Scanner',
      reportedBy: 'Emma Watson',
      reportedById: 'USR-005',
      reportedDate: '2024-03-14 09:15',
      assignedTo: 'IT Support',
      assignedToId: 'USR-008',
      assignedDate: '2024-03-14 10:00',
      dueDate: '2024-03-17',
      resolvedDate: null,
      rootCause: null,
      resolution: null,
      impact: 'Scanner unusable, need replacement for shift',
      occurrences: 1,
      affectedProducts: ['N/A'],
      attachments: [],
      comments: [
        { id: 1, user: 'Emma Watson', date: '2024-03-14 09:20', text: 'Tried different cradle, still not charging' },
        { id: 2, user: 'IT Support', date: '2024-03-14 10:15', text: 'Testing battery - may need replacement' },
      ],
      history: [
        { date: '2024-03-14 10:00', action: 'Assigned', user: 'Supervisor', details: 'Assigned to IT Support' },
        { date: '2024-03-14 09:15', action: 'Reported', user: 'Emma Watson', details: 'Defect created' },
      ],
      tags: ['scanner', 'battery', 'charging'],
    },
    {
      id: 'DEF-005',
      title: 'Damaged product labels - Batch BATCH-011',
      description: 'Multiple products in batch BATCH-011 have smudged or partially missing labels.',
      category: 'quality',
      type: 'cosmetic',
      severity: 'medium',
      priority: 'high',
      status: 'pending-review',
      source: 'quality-check',
      qualityCheckId: 'QC-008',
      qualityCheckName: 'Label Inspection',
      productId: 'PRD-002',
      productName: 'Organic Protein Powder',
      sku: 'SKU-002',
      batchNumber: 'BATCH-011',
      location: 'Warehouse C',
      zone: 'Quality Hold Area',
      reportedBy: 'Lisa Chen',
      reportedById: 'USR-010',
      reportedDate: '2024-03-13 13:45',
      assignedTo: 'Quality Team',
      assignedToId: 'USR-009',
      assignedDate: '2024-03-13 14:30',
      dueDate: '2024-03-18',
      resolvedDate: null,
      rootCause: 'Printer calibration issue during production',
      resolution: 'Under investigation',
      impact: '45 units quarantined, potential customer returns',
      occurrences: 45,
      affectedProducts: ['SKU-002 - Batch BATCH-011'],
      attachments: [
        { name: 'defect-photos.zip', size: '4.2 MB' },
        { name: 'inspection-report.pdf', size: '1.5 MB' },
      ],
      comments: [
        { id: 1, user: 'Lisa Chen', date: '2024-03-13 13:50', text: 'Labels are smudged - not readable by scanner' },
        { id: 2, user: 'Quality Team', date: '2024-03-13 15:20', text: 'Investigating root cause with production' },
      ],
      history: [
        { date: '2024-03-13 14:30', action: 'Assigned', user: 'Quality Manager', details: 'Assigned to Quality Team' },
        { date: '2024-03-13 13:45', action: 'Reported', user: 'Lisa Chen', details: 'Defect created from QC check' },
      ],
      tags: ['quality', 'label', 'batch-issue'],
    },
    {
      id: 'DEF-006',
      title: 'Temperature out of range - Cold Storage Zone C',
      description: 'Temperature in Cold Storage Zone C exceeded acceptable range for 2 hours.',
      category: 'environmental',
      type: 'temperature',
      severity: 'high',
      priority: 'high',
      status: 'resolved',
      source: 'monitoring',
      monitoringId: 'MON-003',
      monitoringName: 'Temperature Monitoring',
      location: 'Warehouse C',
      zone: 'Cold Storage Zone C',
      reportedBy: 'System Alert',
      reportedById: 'SYSTEM',
      reportedDate: '2024-03-12 08:30',
      assignedTo: 'Facilities Team',
      assignedToId: 'USR-011',
      assignedDate: '2024-03-12 08:45',
      dueDate: '2024-03-13',
      resolvedDate: '2024-03-12 14:20',
      rootCause: 'HVAC unit malfunction',
      resolution: 'HVAC unit repaired, temperature restored to normal',
      impact: 'Perishable items moved to backup storage as precaution',
      occurrences: 1,
      affectedProducts: ['Perishable items in Zone C'],
      attachments: [
        { name: 'temperature-log.pdf', size: '1.2 MB' },
        { name: 'repair-report.pdf', size: '0.8 MB' },
      ],
      comments: [
        { id: 1, user: 'System Alert', date: '2024-03-12 08:30', text: 'Temperature exceeded 5°C for 30 minutes' },
        { id: 2, user: 'Facilities Team', date: '2024-03-12 09:15', text: 'HVAC unit diagnosed - refrigerant leak' },
        { id: 3, user: 'Facilities Team', date: '2024-03-12 14:30', text: 'Repair complete, temperature stable at 3°C' },
      ],
      history: [
        { date: '2024-03-12 14:20', action: 'Resolved', user: 'Facilities Team', details: 'Repair completed' },
        { date: '2024-03-12 08:45', action: 'Assigned', user: 'System', details: 'Auto-assigned to Facilities Team' },
        { date: '2024-03-12 08:30', action: 'Reported', user: 'System', details: 'Alert triggered' },
      ],
      tags: ['temperature', 'cold-storage', 'alert'],
    },
    {
      id: 'DEF-007',
      title: 'Broken pallet - damaged goods',
      description: 'Pallet in aisle C-12 collapsed, causing product damage.',
      category: 'safety',
      type: 'structural',
      severity: 'medium',
      priority: 'medium',
      status: 'resolved',
      source: 'incident',
      location: 'Warehouse A',
      zone: 'Aisle C-12',
      reportedBy: 'David Lee',
      reportedById: 'USR-006',
      reportedDate: '2024-03-11 10:30',
      assignedTo: 'Warehouse Team',
      assignedToId: 'USR-012',
      assignedDate: '2024-03-11 11:00',
      dueDate: '2024-03-12',
      resolvedDate: '2024-03-11 16:30',
      rootCause: 'Pallet weakened by forklift impact',
      resolution: 'Area cleared, damaged goods disposed, new pallet placed',
      impact: '8 cases of product damaged, cleanup time 2 hours',
      occurrences: 1,
      affectedProducts: ['SKU-005 (8 cases)'],
      attachments: [
        { name: 'incident-photos.zip', size: '3.5 MB' },
        { name: 'damage-report.pdf', size: '1.2 MB' },
      ],
      comments: [
        { id: 1, user: 'David Lee', date: '2024-03-11 10:35', text: 'Pallet completely collapsed - product scattered' },
        { id: 2, user: 'Warehouse Team', date: '2024-03-11 13:20', text: 'Cleanup in progress' },
      ],
      history: [
        { date: '2024-03-11 16:30', action: 'Resolved', user: 'Warehouse Team', details: 'Area cleared and restocked' },
        { date: '2024-03-11 11:00', action: 'Assigned', user: 'Supervisor', details: 'Assigned to Warehouse Team' },
        { date: '2024-03-11 10:30', action: 'Reported', user: 'David Lee', details: 'Defect created' },
      ],
      tags: ['safety', 'pallet', 'damage'],
    },
    {
      id: 'DEF-008',
      title: 'Software bug - Inventory count screen',
      description: 'Inventory count screen shows incorrect totals when scanning items.',
      category: 'software',
      type: 'functional',
      severity: 'medium',
      priority: 'medium',
      status: 'pending',
      source: 'user-report',
      location: 'All Locations',
      zone: 'Software',
      reportedBy: 'Jane Smith',
      reportedById: 'USR-002',
      reportedDate: '2024-03-10 15:20',
      assignedTo: null,
      assignedToId: null,
      assignedDate: null,
      dueDate: '2024-03-20',
      resolvedDate: null,
      rootCause: null,
      resolution: null,
      impact: 'Counts may be inaccurate, requires manual verification',
      occurrences: 5,
      affectedProducts: ['All inventory items'],
      attachments: [
        { name: 'screenshot.png', size: '0.3 MB' },
        { name: 'error-log.txt', size: '0.1 MB' },
      ],
      comments: [
        { id: 1, user: 'Jane Smith', date: '2024-03-10 15:25', text: 'Totals are off by about 5-10%' },
      ],
      history: [
        { date: '2024-03-10 15:20', action: 'Reported', user: 'Jane Smith', details: 'Defect created' },
      ],
      tags: ['software', 'bug', 'inventory'],
    },
    {
      id: 'DEF-009',
      title: 'Emergency exit door stuck - Door 3B',
      description: 'Emergency exit door 3B is stuck and will not open from inside.',
      category: 'safety',
      type: 'structural',
      severity: 'critical',
      priority: 'critical',
      status: 'in-progress',
      source: 'inspection',
      inspectionId: 'IR-005',
      inspectionName: 'Fire Safety Inspection',
      location: 'Warehouse A',
      zone: 'Exit Door 3B',
      reportedBy: 'Richard Harris',
      reportedById: 'USR-008',
      reportedDate: '2024-03-09 11:00',
      assignedTo: 'Facilities Team',
      assignedToId: 'USR-011',
      assignedDate: '2024-03-09 11:30',
      dueDate: '2024-03-12',
      resolvedDate: null,
      rootCause: 'Rust in door track',
      resolution: 'Door track being cleaned and lubricated',
      impact: 'Exit route compromised - door marked as out of service',
      occurrences: 1,
      affectedProducts: ['N/A'],
      attachments: [
        { name: 'door-photo.jpg', size: '1.5 MB' },
      ],
      comments: [
        { id: 1, user: 'Richard Harris', date: '2024-03-09 11:05', text: 'Door will not budge - safety hazard' },
        { id: 2, user: 'Facilities Team', date: '2024-03-09 13:20', text: 'Working on repair, temporary signs posted' },
      ],
      history: [
        { date: '2024-03-09 11:30', action: 'Assigned', user: 'Safety Officer', details: 'Assigned to Facilities Team' },
        { date: '2024-03-09 11:00', action: 'Reported', user: 'Richard Harris', details: 'Defect created from inspection' },
      ],
      tags: ['safety', 'exit-door', 'critical'],
    },
    {
      id: 'DEF-010',
      title: 'Spill kit missing - Hazmat Area',
      description: 'Spill kit in hazardous materials area is missing absorbent materials.',
      category: 'safety',
      type: 'supply',
      severity: 'medium',
      priority: 'high',
      status: 'resolved',
      source: 'inspection',
      inspectionId: 'IR-010',
      inspectionName: 'Chemical Storage Inspection',
      location: 'Warehouse B',
      zone: 'Hazmat Area',
      reportedBy: 'Safety Officer',
      reportedById: 'USR-009',
      reportedDate: '2024-03-08 09:45',
      assignedTo: 'Safety Team',
      assignedToId: 'USR-009',
      assignedDate: '2024-03-08 10:00',
      dueDate: '2024-03-09',
      resolvedDate: '2024-03-08 15:30',
      rootCause: 'Kit used in previous spill not restocked',
      resolution: 'Spill kit restocked with new absorbent materials',
      impact: 'Unable to respond to spills effectively',
      occurrences: 1,
      affectedProducts: ['N/A'],
      attachments: [
        { name: 'inspection-report.pdf', size: '1.2 MB' },
      ],
      comments: [
        { id: 1, user: 'Safety Officer', date: '2024-03-08 09:50', text: 'Kit is empty - need restock immediately' },
        { id: 2, user: 'Safety Team', date: '2024-03-08 14:20', text: 'New supplies ordered and received' },
      ],
      history: [
        { date: '2024-03-08 15:30', action: 'Resolved', user: 'Safety Team', details: 'Spill kit restocked' },
        { date: '2024-03-08 10:00', action: 'Assigned', user: 'Safety Officer', details: 'Assigned to Safety Team' },
        { date: '2024-03-08 09:45', action: 'Reported', user: 'Safety Officer', details: 'Defect created' },
      ],
      tags: ['safety', 'spill-kit', 'supplies'],
    },
  ];

  // Defect categories
  const categories = [
    { id: 'all', name: 'All Categories', count: defects.length },
    { id: 'equipment', name: 'Equipment', count: defects.filter(d => d.category === 'equipment').length, icon: Wrench },
    { id: 'quality', name: 'Quality', count: defects.filter(d => d.category === 'quality').length, icon: CheckCircle },
    { id: 'safety', name: 'Safety', count: defects.filter(d => d.category === 'safety').length, icon: Shield },
    { id: 'environmental', name: 'Environmental', count: defects.filter(d => d.category === 'environmental').length, icon: Thermometer },
    { id: 'software', name: 'Software', count: defects.filter(d => d.category === 'software').length, icon: Cpu },
  ];

  // Severity levels
  const severityConfig = {
    critical: { label: 'Critical', color: 'bg-red-600 text-white border-red-600', icon: AlertCircle, score: 5 },
    high: { label: 'High', color: 'bg-orange-500 text-white border-orange-500', icon: AlertTriangle, score: 4 },
    medium: { label: 'Medium', color: 'bg-yellow-500 text-white border-yellow-500', icon: AlertTriangle, score: 3 },
    low: { label: 'Low', color: 'bg-green-500 text-white border-green-500', icon: Info, score: 2 },
    trivial: { label: 'Trivial', color: 'bg-blue-500 text-white border-blue-500', icon: Info, score: 1 },
  };

  // Status configuration
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    'in-progress': { label: 'In Progress', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Activity },
    'pending-review': { label: 'Pending Review', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Eye },
    resolved: { label: 'Resolved', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    closed: { label: 'Closed', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
  };

  const priorityConfig = {
    critical: { label: 'Critical', color: 'bg-red-100 text-red-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
  };

  const getSeverityIcon = (severity) => {
    const config = severityConfig[severity];
    const Icon = config?.icon || AlertTriangle;
    return <Icon size={14} />;
  };

  const getSeverityColor = (severity) => {
    return severityConfig[severity]?.color || 'bg-gray-500 text-white';
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Clock;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'equipment': return <Wrench size={16} className="text-orange-600" />;
      case 'quality': return <CheckCircle size={16} className="text-green-600" />;
      case 'safety': return <Shield size={16} className="text-red-600" />;
      case 'environmental': return <Thermometer size={16} className="text-blue-600" />;
      case 'software': return <Cpu size={16} className="text-purple-600" />;
      default: return <Bug size={16} className="text-red-600" />;
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'mechanical': return <Wrench size={12} className="text-orange-600" />;
      case 'electronic': return <Cpu size={12} className="text-purple-600" />;
      case 'cosmetic': return <Eye size={12} className="text-blue-600" />;
      case 'temperature': return <Thermometer size={12} className="text-red-600" />;
      case 'structural': return <Hammer size={12} className="text-gray-600" />;
      case 'functional': return <Activity size={12} className="text-green-600" />;
      case 'supply': return <Package size={12} className="text-yellow-600" />;
      default: return <AlertTriangle size={12} className="text-red-600" />;
    }
  };

  const filteredDefects = defects.filter(defect => {
    const matchesStatus = selectedStatus === 'all' || defect.status === selectedStatus;
    const matchesSeverity = selectedSeverity === 'all' || defect.severity === selectedSeverity;
    const matchesCategory = selectedCategory === 'all' || defect.category === selectedCategory;
    const matchesAssignee = selectedAssignee === 'all' || 
      (defect.assignedTo === selectedAssignee) || 
      (selectedAssignee === 'unassigned' && !defect.assignedTo);
    const matchesSearch = defect.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         defect.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         defect.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         defect.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSeverity && matchesCategory && matchesAssignee && matchesSearch;
  });

  const stats = {
    total: defects.length,
    open: defects.filter(d => d.status === 'pending' || d.status === 'in-progress' || d.status === 'pending-review').length,
    inProgress: defects.filter(d => d.status === 'in-progress').length,
    resolved: defects.filter(d => d.status === 'resolved').length,
    critical: defects.filter(d => d.severity === 'critical').length,
    high: defects.filter(d => d.severity === 'high').length,
    unassigned: defects.filter(d => !d.assignedTo).length,
  };

  const handleSelectAll = () => {
    if (selectedDefects.length === filteredDefects.length) {
      setSelectedDefects([]);
    } else {
      setSelectedDefects(filteredDefects.map(d => d.id));
    }
  };

  const handleSelectDefect = (id) => {
    if (selectedDefects.includes(id)) {
      setSelectedDefects(selectedDefects.filter(d => d !== id));
    } else {
      setSelectedDefects([...selectedDefects, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Defect Tracking</h1>
            <p className="text-black/50 mt-1">Track and manage defects, issues, and non-conformities</p>
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
              Analytics
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
              Report Defect
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Defects</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Bug size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Open</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.open}</p>
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
                  <p className="text-xs text-black/50">Resolved</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.resolved}</p>
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
                  <p className="text-xs text-black/50">Critical</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.critical}</p>
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
                  <p className="text-xs text-black/50">Unassigned</p>
                  <p className="text-xl font-bold text-gray-600 mt-1">{stats.unassigned}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-full">
                  <User size={18} className="text-gray-600" />
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
              placeholder="Search by title, ID, description, or tags..."
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
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending-review">Pending Review</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="trivial">Trivial</SelectItem>
            </SelectContent>
          </Select>

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

          <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="Maintenance Team">Maintenance Team</SelectItem>
              <SelectItem value="IT Support">IT Support</SelectItem>
              <SelectItem value="Quality Team">Quality Team</SelectItem>
              <SelectItem value="Facilities Team">Facilities Team</SelectItem>
              <SelectItem value="Safety Team">Safety Team</SelectItem>
              <SelectItem value="Warehouse Team">Warehouse Team</SelectItem>
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
      {selectedDefects.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedDefects.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedDefects([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <User size={14} className="mr-2" />
              Assign
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <CheckCircle size={14} className="mr-2" />
              Resolve
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-red-600">
              <Trash2 size={14} className="mr-2" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Defects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredDefects.map((defect) => {
            const StatusIcon = statusConfig[defect.status]?.icon || Clock;
            const SeverityIcon = severityConfig[defect.severity]?.icon || AlertTriangle;
            
            return (
              <Card key={defect.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9]">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(defect.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {defect.status}
                          </Badge>
                          <Badge className={cn("text-xs text-white", getSeverityColor(defect.severity))}>
                            <SeverityIcon className="mr-1" size={10} />
                            {defect.severity}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{defect.title}</h3>
                        <p className="text-xs text-black/50 mt-1">{defect.id}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedDefect(defect);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {defect.status !== 'resolved' && defect.status !== 'closed' && (
                            <>
                              {!defect.assignedTo && (
                                <DropdownMenuItem onClick={() => {
                                  setSelectedDefect(defect);
                                  setShowAssignDialog(true);
                                }}>
                                  <User className="mr-2 h-4 w-4" />
                                  Assign
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => {
                                setSelectedDefect(defect);
                                setShowResolveDialog(true);
                              }}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Resolve
                              </DropdownMenuItem>
                            </>
                          )}
                          {defect.status === 'resolved' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedDefect(defect);
                              setShowReopenDialog(true);
                            }}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Reopen
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
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
                    {/* Description */}
                    <p className="text-xs text-black/60 line-clamp-2 mb-3">
                      {defect.description}
                    </p>

                    {/* Category & Type */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9] flex items-center gap-1">
                        {getCategoryIcon(defect.category)}
                        {defect.category}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9] flex items-center gap-1">
                        {getTypeIcon(defect.type)}
                        {defect.type}
                      </Badge>
                    </div>

                    {/* Location & Equipment */}
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={12} className="text-black/30" />
                      <span className="text-xs text-black/70">{defect.location}</span>
                      {defect.zone && (
                        <>
                          <span className="text-xs text-black/30">•</span>
                          <span className="text-xs text-black/70">{defect.zone}</span>
                        </>
                      )}
                    </div>

                    {defect.equipmentName && (
                      <div className="flex items-center gap-2 mb-2">
                        <Wrench size={12} className="text-black/30" />
                        <span className="text-xs text-black/70">{defect.equipmentName}</span>
                      </div>
                    )}

                    {/* Assignee & Date */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <User size={12} className="text-black/50" />
                        <span className="text-xs text-black/70">{defect.assignedTo || 'Unassigned'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-black/50" />
                        <span className="text-xs text-black/70">{defect.reportedDate.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Impact Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="p-2 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[10px] text-black/50">Occurrences</p>
                        <p className="text-sm font-bold">{defect.occurrences}</p>
                      </div>
                      <div className="p-2 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[10px] text-black/50">Comments</p>
                        <p className="text-sm font-bold">{defect.comments?.length || 0}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {defect.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
                      <span>Reported: {defect.reportedDate.split(' ')[1]}</span>
                      {defect.attachments && defect.attachments.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Paperclip size={10} />
                          <span>{defect.attachments.length}</span>
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
                    <Checkbox 
                      checked={selectedDefects.length === filteredDefects.length && filteredDefects.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">ID</TableHead>
                  <TableHead className="text-black/50">Title</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Severity</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Assignee</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50">Reported</TableHead>
                  <TableHead className="text-black/50 text-right">Occurrences</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDefects.map((defect) => (
                  <TableRow key={defect.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedDefects.includes(defect.id)}
                        onCheckedChange={() => handleSelectDefect(defect.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs">{defect.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{defect.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {defect.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs text-white", getSeverityColor(defect.severity))}>
                        {defect.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(defect.status))}>
                        {defect.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(defect.priority))}>
                        {defect.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{defect.assignedTo || '—'}</TableCell>
                    <TableCell className="max-w-[100px] truncate">{defect.location}</TableCell>
                    <TableCell className="text-xs">{defect.reportedDate.split(' ')[0]}</TableCell>
                    <TableCell className="text-right">{defect.occurrences}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedDefect(defect);
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
                Showing {filteredDefects.length} of {defects.length} defects
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

      {/* Create Defect Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Report Defect</DialogTitle>
            <DialogDescription>
              Create a new defect or issue report
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="assignment">Assignment</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="e.g., Conveyor belt misalignment" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="quality">Quality</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
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
                        <SelectItem value="mechanical">Mechanical</SelectItem>
                        <SelectItem value="electronic">Electronic</SelectItem>
                        <SelectItem value="cosmetic">Cosmetic</SelectItem>
                        <SelectItem value="functional">Functional</SelectItem>
                        <SelectItem value="structural">Structural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="user-report">User Report</SelectItem>
                        <SelectItem value="quality-check">Quality Check</SelectItem>
                        <SelectItem value="monitoring">Monitoring</SelectItem>
                        <SelectItem value="incident">Incident</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the defect" rows={3} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="e.g., Warehouse A" />
                  </div>
                  <div className="space-y-2">
                    <Label>Zone/Area</Label>
                    <Input placeholder="e.g., Packing Zone" />
                  </div>
                </div>

                {selectedCategory === 'equipment' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Equipment ID</Label>
                      <Input placeholder="e.g., CONV-002" />
                    </div>
                    <div className="space-y-2">
                      <Label>Equipment Name</Label>
                      <Input placeholder="e.g., Main Conveyor" />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="trivial">Trivial</SelectItem>
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
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Impact</Label>
                  <Textarea placeholder="Describe the business impact" rows={2} />
                </div>

                <div className="space-y-2">
                  <Label>Occurrences</Label>
                  <Input type="number" placeholder="Number of occurrences" defaultValue={1} />
                </div>

                <div className="space-y-2">
                  <Label>Affected Products (optional)</Label>
                  <Input placeholder="Enter product IDs or SKUs" />
                </div>

                <div className="space-y-2">
                  <Label>Attachments</Label>
                  <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                    <Upload size={24} className="mx-auto text-black/30 mb-2" />
                    <p className="text-sm text-black/50">Drag files or click to upload</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assignment" className="space-y-4">
                <div className="space-y-2">
                  <Label>Assign To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      <SelectItem value="Maintenance Team">Maintenance Team</SelectItem>
                      <SelectItem value="IT Support">IT Support</SelectItem>
                      <SelectItem value="Quality Team">Quality Team</SelectItem>
                      <SelectItem value="Facilities Team">Facilities Team</SelectItem>
                      <SelectItem value="Safety Team">Safety Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <Label>Initial Comments</Label>
                  <Textarea placeholder="Add any initial comments" rows={3} />
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
              Report Defect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Defect Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Defect Details</DialogTitle>
          </DialogHeader>

          {selectedDefect && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="impact">Impact</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedDefect.title}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedDefect.id} • {selectedDefect.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cn("text-xs border-0", getStatusColor(selectedDefect.status))}>
                        {selectedDefect.status}
                      </Badge>
                      <Badge className={cn("text-xs text-white", getSeverityColor(selectedDefect.severity))}>
                        {selectedDefect.severity}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <p className="text-sm">{selectedDefect.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Type</p>
                      <p className="text-sm font-medium capitalize">{selectedDefect.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Source</p>
                      <p className="text-sm font-medium capitalize">{selectedDefect.source.replace('-', ' ')}</p>
                    </div>
                  </div>

                  {selectedDefect.inspectionName && (
                    <div>
                      <p className="text-xs text-black/50">Source Inspection</p>
                      <p className="text-sm">{selectedDefect.inspectionName}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50">Location</p>
                    <p className="text-sm">{selectedDefect.location} • {selectedDefect.zone}</p>
                  </div>

                  {selectedDefect.equipmentName && (
                    <div>
                      <p className="text-xs text-black/50">Equipment</p>
                      <p className="text-sm">{selectedDefect.equipmentName} ({selectedDefect.equipmentId})</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Reported By</p>
                      <p className="text-sm font-medium">{selectedDefect.reportedBy}</p>
                      <p className="text-xs text-black/50">{selectedDefect.reportedDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Assigned To</p>
                      <p className="text-sm font-medium">{selectedDefect.assignedTo || 'Unassigned'}</p>
                      {selectedDefect.assignedDate && (
                        <p className="text-xs text-black/50">Since {selectedDefect.assignedDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Due Date</p>
                      <p className="text-sm">{selectedDefect.dueDate || 'Not set'}</p>
                    </div>
                    {selectedDefect.resolvedDate && (
                      <div>
                        <p className="text-xs text-black/50">Resolved Date</p>
                        <p className="text-sm">{selectedDefect.resolvedDate}</p>
                      </div>
                    )}
                  </div>

                  {selectedDefect.rootCause && (
                    <div>
                      <p className="text-xs text-black/50">Root Cause</p>
                      <p className="text-sm">{selectedDefect.rootCause}</p>
                    </div>
                  )}

                  {selectedDefect.resolution && (
                    <div>
                      <p className="text-xs text-black/50">Resolution</p>
                      <p className="text-sm">{selectedDefect.resolution}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedDefect.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="impact" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Occurrences</p>
                        <p className="text-2xl font-bold">{selectedDefect.occurrences}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Affected Items</p>
                        <p className="text-2xl font-bold">{selectedDefect.affectedProducts?.length || 0}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Impact Description</p>
                    <p className="text-sm mt-1">{selectedDefect.impact}</p>
                  </div>

                  {selectedDefect.affectedProducts && selectedDefect.affectedProducts.length > 0 && (
                    <div>
                      <p className="text-xs text-black/50 mb-2">Affected Products</p>
                      <div className="space-y-2">
                        {selectedDefect.affectedProducts.map((product, idx) => (
                          <div key={idx} className="p-2 border border-[#F5EEE9] rounded-lg">
                            <p className="text-sm">{product}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDefect.attachments && selectedDefect.attachments.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-medium mb-2">Attachments</p>
                      <div className="space-y-2">
                        {selectedDefect.attachments.map((file, idx) => (
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
                </TabsContent>

                <TabsContent value="comments" className="space-y-4">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedDefect.comments && selectedDefect.comments.length > 0 ? (
                        selectedDefect.comments.map((comment) => (
                          <div key={comment.id} className="p-3 border border-[#F5EEE9] rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-medium">{comment.user}</p>
                              <span className="text-xs text-black/50">{comment.date}</span>
                            </div>
                            <p className="text-sm">{comment.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-black/50 text-center py-4">No comments</p>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input placeholder="Add a comment..." />
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Send size={14} className="mr-2" />
                      Post
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedDefect.history.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          {item.action === 'Reported' && <Plus size={12} className="text-green-600 mt-0.5" />}
                          {item.action === 'Assigned' && <User size={12} className="text-blue-600 mt-0.5" />}
                          {item.action === 'Resolved' && <CheckCircle size={12} className="text-green-600 mt-0.5" />}
                          {item.action === 'Reopened' && <RefreshCw size={12} className="text-yellow-600 mt-0.5" />}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
                            {item.details && <p className="text-[10px] text-black/70 mt-1">{item.details}</p>}
                          </div>
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
            {selectedDefect?.status !== 'resolved' && selectedDefect?.status !== 'closed' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowResolveDialog(true);
              }}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Resolve
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
                <Bug size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Report Defect</TooltipContent>
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
            <TooltipContent side="left">Analytics</TooltipContent>
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

export default DefectTrackingPage;