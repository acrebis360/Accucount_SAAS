// app/dashboard/inspection-reports/page.js
'use client';

import { useState } from 'react';
import { 
  FileText,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  Calendar,
  Users,
  User,
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
  Share2,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  History,
  BarChart3,
 
  Thermometer,
  Droplet,
  Shield,
  Wrench,
  Activity,
  Plus,
  MapPin,
 
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

const InspectionReportsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedResult, setSelectedResult] = useState('all');
  const [selectedInspector, setSelectedInspector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showSignDialog, setShowSignDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);

  // Sample inspection reports data
  const inspectionReports = [
    {
      id: 'IR-001',
      reportNumber: 'IR-2024-001',
      title: 'Warehouse A - Monthly Safety Inspection',
      description: 'Comprehensive safety inspection of Warehouse A including equipment, fire safety, and PPE compliance.',
      type: 'safety',
      category: 'warehouse',
      status: 'approved',
      result: 'passed',
      priority: 'high',
      inspector: 'John Doe',
      inspectorId: 'USR-001',
      inspectorSignature: 'signed',
      reviewer: 'Jane Smith',
      reviewerId: 'USR-002',
      reviewerSignature: 'signed',
      inspectionDate: '2024-03-15',
      reportDate: '2024-03-16',
      dueDate: '2024-03-20',
      location: 'Warehouse A',
      zone: 'All Zones',
      findings: 12,
      passedFindings: 10,
      failedFindings: 2,
      criticalFindings: 0,
      score: 92,
      maxScore: 100,
      items: [
        { id: 1, category: 'Fire Safety', item: 'Fire extinguishers checked', status: 'pass', notes: 'All in date' },
        { id: 2, category: 'Fire Safety', item: 'Emergency exits clear', status: 'pass', notes: 'All clear' },
        { id: 3, category: 'Equipment', item: 'Forklift inspection', status: 'pass', notes: 'All operational' },
        { id: 4, category: 'Equipment', item: 'Conveyor safety guards', status: 'fail', notes: 'Guard missing on section B' },
        { id: 5, category: 'PPE', item: 'Hard hats worn', status: 'pass', notes: 'All compliant' },
        { id: 6, category: 'PPE', item: 'Safety vests', status: 'pass', notes: 'All compliant' },
        { id: 7, category: 'Storage', item: 'Aisle clearance', status: 'fail', notes: 'Aisle C blocked' },
        { id: 8, category: 'Storage', item: 'Stack height limits', status: 'pass', notes: 'Within limits' },
        { id: 9, category: 'Electrical', item: 'Cords and cables', status: 'pass', notes: 'No hazards' },
        { id: 10, category: 'Electrical', item: 'Panel access', status: 'pass', notes: 'Clear' },
        { id: 11, category: 'Chemical', item: 'Proper storage', status: 'pass', notes: 'Compliant' },
        { id: 12, category: 'Chemical', item: 'MSDS sheets', status: 'pass', notes: 'Available' },
      ],
      recommendations: [
        'Install missing safety guard on conveyor section B',
        'Clear aisle C of pallets immediately',
      ],
      attachments: [
        { name: 'inspection-photos.zip', size: '12.5 MB' },
        { name: 'inspection-report.pdf', size: '2.4 MB' },
      ],
      notes: 'Follow up required on failed items within 48 hours',
      tags: ['safety', 'monthly', 'warehouse-a'],
      createdBy: 'Safety Department',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-16',
    },
    {
      id: 'IR-002',
      reportNumber: 'IR-2024-002',
      title: 'Equipment Inspection - Forklift Fleet',
      description: 'Quarterly inspection of all forklifts in Warehouse A and B.',
      type: 'equipment',
      category: 'maintenance',
      status: 'pending-review',
      result: 'pending',
      priority: 'medium',
      inspector: 'Mike Johnson',
      inspectorId: 'USR-003',
      inspectorSignature: 'signed',
      reviewer: null,
      reviewerSignature: null,
      inspectionDate: '2024-03-14',
      reportDate: '2024-03-14',
      dueDate: '2024-03-21',
      location: 'Warehouse A & B',
      zone: 'Equipment Bay',
      findings: 8,
      passedFindings: 6,
      failedFindings: 2,
      criticalFindings: 1,
      score: 75,
      maxScore: 100,
      items: [
        { id: 1, category: 'Forklift FL-001', item: 'Pre-op inspection', status: 'pass', notes: 'OK' },
        { id: 2, category: 'Forklift FL-001', item: 'Safety features', status: 'pass', notes: 'Functional' },
        { id: 3, category: 'Forklift FL-002', item: 'Pre-op inspection', status: 'pass', notes: 'OK' },
        { id: 4, category: 'Forklift FL-002', item: 'Safety features', status: 'fail', notes: 'Horn not working' },
        { id: 5, category: 'Forklift FL-003', item: 'Pre-op inspection', status: 'pass', notes: 'OK' },
        { id: 6, category: 'Forklift FL-003', item: 'Safety features', status: 'pass', notes: 'Functional' },
        { id: 7, category: 'Forklift FL-004', item: 'Pre-op inspection', status: 'fail', notes: 'Hydraulic leak' },
        { id: 8, category: 'Forklift FL-004', item: 'Safety features', status: 'pass', notes: 'Functional' },
      ],
      recommendations: [
        'Repair horn on FL-002',
        'Fix hydraulic leak on FL-004 - DO NOT OPERATE',
      ],
      attachments: [
        { name: 'inspection-checklist.xlsx', size: '1.2 MB' },
        { name: 'repair-estimates.pdf', size: '0.8 MB' },
      ],
      notes: 'FL-004 taken out of service pending repairs',
      tags: ['equipment', 'forklift', 'quarterly'],
      createdBy: 'Maintenance Team',
      createdAt: '2024-03-14',
      updatedAt: '2024-03-14',
    },
    {
      id: 'IR-003',
      reportNumber: 'IR-2024-003',
      title: 'Quality Control Inspection - Batch BATCH-010',
      description: 'Quality inspection of finished goods batch BATCH-010 before release.',
      type: 'quality',
      category: 'finished-goods',
      status: 'completed',
      result: 'passed',
      priority: 'high',
      inspector: 'Sarah Wilson',
      inspectorId: 'USR-004',
      inspectorSignature: 'signed',
      reviewer: 'Tom Brown',
      reviewerId: 'USR-007',
      reviewerSignature: 'signed',
      inspectionDate: '2024-03-13',
      reportDate: '2024-03-13',
      dueDate: '2024-03-15',
      location: 'Quality Lab',
      zone: 'Testing Area',
      productId: 'PRD-006',
      productName: 'Canned Organic Soup',
      sku: 'SKU-006',
      batchNumber: 'BATCH-010',
      findings: 15,
      passedFindings: 15,
      failedFindings: 0,
      criticalFindings: 0,
      score: 100,
      maxScore: 100,
      items: [
        { id: 1, category: 'Visual', item: 'Label placement', status: 'pass', notes: 'Correct' },
        { id: 2, category: 'Visual', item: 'Seal integrity', status: 'pass', notes: 'Good' },
        { id: 3, category: 'Visual', item: 'Can condition', status: 'pass', notes: 'No dents' },
        { id: 4, category: 'Measurement', item: 'Weight', status: 'pass', notes: '425g ±2g' },
        { id: 5, category: 'Measurement', item: 'pH level', status: 'pass', notes: '4.2' },
        { id: 6, category: 'Measurement', item: 'Temperature', status: 'pass', notes: '22°C' },
        { id: 7, category: 'Quality', item: 'Appearance', status: 'pass', notes: 'Good' },
        { id: 8, category: 'Quality', item: 'Texture', status: 'pass', notes: 'Consistent' },
      ],
      attachments: [
        { name: 'lab-results.pdf', size: '3.2 MB' },
        { name: 'coa.pdf', size: '1.5 MB' },
        { name: 'photos.zip', size: '8.2 MB' },
      ],
      notes: 'Batch approved for release',
      tags: ['quality', 'finished-goods', 'batch-release'],
      createdBy: 'Quality Team',
      createdAt: '2024-03-13',
      updatedAt: '2024-03-13',
    },
    {
      id: 'IR-004',
      reportNumber: 'IR-2024-004',
      title: 'Environmental Monitoring - Cold Storage',
      description: 'Weekly environmental monitoring of cold storage zones including temperature and humidity.',
      type: 'environmental',
      category: 'monitoring',
      status: 'completed',
      result: 'warning',
      priority: 'high',
      inspector: 'Emma Watson',
      inspectorId: 'USR-005',
      inspectorSignature: 'signed',
      reviewer: 'David Lee',
      reviewerId: 'USR-006',
      reviewerSignature: 'signed',
      inspectionDate: '2024-03-12',
      reportDate: '2024-03-12',
      dueDate: '2024-03-15',
      location: 'Warehouse C',
      zone: 'Cold Storage',
      findings: 6,
      passedFindings: 5,
      failedFindings: 1,
      criticalFindings: 0,
      score: 83,
      maxScore: 100,
      items: [
        { id: 1, category: 'Temperature', item: 'Zone A - Dairy', status: 'pass', value: '3.2°C', spec: '2-4°C' },
        { id: 2, category: 'Temperature', item: 'Zone B - Meat', status: 'pass', value: '1.8°C', spec: '1-3°C' },
        { id: 3, category: 'Temperature', item: 'Zone C - Produce', status: 'warning', value: '5.5°C', spec: '2-5°C', notes: 'Slightly above range' },
        { id: 4, category: 'Humidity', item: 'Zone A', status: 'pass', value: '65%', spec: '60-70%' },
        { id: 5, category: 'Humidity', item: 'Zone B', status: 'pass', value: '68%', spec: '60-70%' },
        { id: 6, category: 'Humidity', item: 'Zone C', status: 'pass', value: '72%', spec: '65-75%' },
      ],
      recommendations: [
        'Check cooling unit in Zone C - temperature trending high',
        'Monitor Zone C closely over next 24 hours',
      ],
      attachments: [
        { name: 'temperature-log.pdf', size: '2.1 MB' },
        { name: 'humidity-log.pdf', size: '1.8 MB' },
      ],
      notes: 'Zone C requires maintenance attention',
      tags: ['environmental', 'cold-storage', 'monitoring'],
      createdBy: 'Facilities Team',
      createdAt: '2024-03-12',
      updatedAt: '2024-03-12',
    },
    {
      id: 'IR-005',
      reportNumber: 'IR-2024-005',
      title: 'Fire Safety Inspection - All Facilities',
      description: 'Quarterly fire safety inspection of all facilities including extinguishers, alarms, and exits.',
      type: 'safety',
      category: 'fire',
      status: 'approved',
      result: 'passed',
      priority: 'high',
      inspector: 'Richard Harris',
      inspectorId: 'USR-008',
      inspectorSignature: 'signed',
      reviewer: 'Safety Officer',
      reviewerId: 'USR-009',
      reviewerSignature: 'signed',
      inspectionDate: '2024-03-10',
      reportDate: '2024-03-11',
      dueDate: '2024-03-25',
      location: 'All Facilities',
      zone: 'All Zones',
      findings: 25,
      passedFindings: 24,
      failedFindings: 1,
      criticalFindings: 0,
      score: 96,
      maxScore: 100,
      items: [
        { id: 1, category: 'Extinguishers', item: 'Location A - Receiving', status: 'pass', notes: 'OK' },
        { id: 2, category: 'Extinguishers', item: 'Location B - Warehouse', status: 'pass', notes: 'OK' },
        { id: 3, category: 'Extinguishers', item: 'Location C - Office', status: 'pass', notes: 'OK' },
        { id: 4, category: 'Alarms', item: 'Pull stations', status: 'pass', notes: 'All accessible' },
        { id: 5, category: 'Alarms', item: 'Horn/strobe', status: 'pass', notes: 'Functional' },
        { id: 6, category: 'Exits', item: 'Exit signs', status: 'pass', notes: 'Illuminated' },
        { id: 7, category: 'Exits', item: 'Emergency lighting', status: 'pass', notes: 'Functional' },
        { id: 8, category: 'Exits', item: 'Exit doors', status: 'fail', notes: 'Door 3B stuck' },
        { id: 9, category: 'Sprinklers', item: 'Water flow', status: 'pass', notes: 'OK' },
        { id: 10, category: 'Sprinklers', item: 'Valves open', status: 'pass', notes: 'OK' },
      ],
      recommendations: [
        'Repair exit door 3B - currently stuck',
        'Schedule annual extinguisher certification',
      ],
      attachments: [
        { name: 'inspection-report.pdf', size: '3.5 MB' },
        { name: 'photos.zip', size: '15.2 MB' },
      ],
      notes: 'Overall good compliance. Door repair required.',
      tags: ['fire', 'safety', 'quarterly'],
      createdBy: 'Safety Department',
      createdAt: '2024-03-10',
      updatedAt: '2024-03-11',
    },
    {
      id: 'IR-006',
      reportNumber: 'IR-2024-006',
      title: 'First Article Inspection - New Product',
      description: 'First article inspection for new product prototype.',
      type: 'quality',
      category: 'first-article',
      status: 'draft',
      result: 'pending',
      priority: 'high',
      inspector: 'Lisa Chen',
      inspectorId: 'USR-010',
      inspectorSignature: null,
      reviewer: null,
      reviewerSignature: null,
      inspectionDate: '2024-03-16',
      reportDate: null,
      dueDate: '2024-03-23',
      location: 'Engineering Lab',
      zone: 'Prototyping',
      productId: 'PRD-015',
      productName: 'New Product Prototype',
      sku: 'SKU-015',
      batchNumber: 'PROTO-002',
      findings: 12,
      passedFindings: 8,
      failedFindings: 4,
      criticalFindings: 1,
      score: 67,
      maxScore: 100,
      items: [
        { id: 1, category: 'Dimensions', item: 'Length', status: 'pass', value: '150.2mm', spec: '150±0.5mm' },
        { id: 2, category: 'Dimensions', item: 'Width', status: 'fail', value: '75.8mm', spec: '75±0.5mm' },
        { id: 3, category: 'Dimensions', item: 'Height', status: 'pass', value: '45.1mm', spec: '45±0.5mm' },
        { id: 4, category: 'Material', item: 'Hardness', status: 'pass', value: '82A', spec: '80-85A' },
        { id: 5, category: 'Material', item: 'Color', status: 'pass', value: 'Match', spec: 'Match' },
        { id: 6, category: 'Function', item: 'Assembly fit', status: 'fail', value: 'Tight', spec: 'Free fit' },
        { id: 7, category: 'Function', item: 'Operation test', status: 'critical', value: 'Intermittent', spec: 'Continuous' },
      ],
      recommendations: [
        'Redesign width dimension to spec',
        'Investigate intermittent operation issue',
        'Schedule design review meeting',
      ],
      attachments: [],
      notes: 'Major issues found - requires redesign',
      tags: ['first-article', 'new-product', 'prototype'],
      createdBy: 'Engineering',
      createdAt: '2024-03-16',
      updatedAt: '2024-03-16',
    },
    {
      id: 'IR-007',
      reportNumber: 'IR-2024-007',
      title: 'Supplier Quality Audit - Tech Supplies Inc',
      description: 'Annual quality audit of supplier Tech Supplies Inc manufacturing facility.',
      type: 'audit',
      category: 'supplier',
      status: 'in-progress',
      result: 'pending',
      priority: 'medium',
      inspector: 'Quality Team',
      inspectorId: 'USR-011',
      inspectorSignature: null,
      reviewer: null,
      reviewerSignature: null,
      inspectionDate: '2024-03-18',
      reportDate: null,
      dueDate: '2024-03-25',
      location: 'Supplier Facility',
      zone: 'Manufacturing Plant',
      supplier: 'Tech Supplies Inc',
      supplierId: 'SUP-001',
      findings: 0,
      passedFindings: 0,
      failedFindings: 0,
      criticalFindings: 0,
      score: 0,
      maxScore: 100,
      items: [],
      recommendations: [],
      attachments: [],
      notes: 'Audit scheduled - team traveling',
      tags: ['audit', 'supplier', 'quality'],
      createdBy: 'Quality Department',
      createdAt: '2024-03-14',
      updatedAt: '2024-03-14',
    },
    {
      id: 'IR-008',
      reportNumber: 'IR-2024-008',
      title: 'Daily Sanitation Inspection - Food Area',
      description: 'Daily sanitation inspection of food preparation and storage areas.',
      type: 'sanitation',
      category: 'food-safety',
      status: 'completed',
      result: 'passed',
      priority: 'high',
      inspector: 'Anna Taylor',
      inspectorId: 'USR-012',
      inspectorSignature: 'signed',
      reviewer: 'Quality Manager',
      reviewerId: 'USR-013',
      reviewerSignature: 'signed',
      inspectionDate: '2024-03-15',
      reportDate: '2024-03-15',
      dueDate: '2024-03-15',
      location: 'Food Processing',
      zone: 'All Areas',
      findings: 8,
      passedFindings: 8,
      failedFindings: 0,
      criticalFindings: 0,
      score: 100,
      maxScore: 100,
      items: [
        { id: 1, category: 'Surfaces', item: 'Countertops', status: 'pass', notes: 'Clean' },
        { id: 2, category: 'Surfaces', item: 'Equipment', status: 'pass', notes: 'Clean' },
        { id: 3, category: 'Utensils', item: 'Knives', status: 'pass', notes: 'Sanitized' },
        { id: 4, category: 'Utensils', item: 'Cutting boards', status: 'pass', notes: 'Sanitized' },
        { id: 5, category: 'Storage', item: 'Refrigerator', status: 'pass', notes: 'Clean, 38°F' },
        { id: 6, category: 'Storage', item: 'Freezer', status: 'pass', notes: 'Clean, 0°F' },
        { id: 7, category: 'Waste', item: 'Bins', status: 'pass', notes: 'Empty, clean' },
        { id: 8, category: 'Waste', item: 'Area', status: 'pass', notes: 'Clean' },
      ],
      recommendations: [],
      attachments: [],
      notes: 'All areas compliant',
      tags: ['sanitation', 'food-safety', 'daily'],
      createdBy: 'Food Safety Team',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15',
    },
    {
      id: 'IR-009',
      reportNumber: 'IR-2024-009',
      title: 'Loading Dock Safety Inspection',
      description: 'Monthly safety inspection of loading dock areas and equipment.',
      type: 'safety',
      category: 'loading-dock',
      status: 'completed',
      result: 'failed',
      priority: 'critical',
      inspector: 'Tom Brown',
      inspectorId: 'USR-007',
      inspectorSignature: 'signed',
      reviewer: 'Safety Officer',
      reviewerId: 'USR-009',
      reviewerSignature: 'signed',
      inspectionDate: '2024-03-14',
      reportDate: '2024-03-14',
      dueDate: '2024-03-21',
      location: 'Warehouse A',
      zone: 'Loading Dock',
      findings: 10,
      passedFindings: 6,
      failedFindings: 4,
      criticalFindings: 2,
      score: 60,
      maxScore: 100,
      items: [
        { id: 1, category: 'Dock Levelers', item: 'Leveler 1', status: 'fail', notes: 'Hydraulic leak' },
        { id: 2, category: 'Dock Levelers', item: 'Leveler 2', status: 'pass', notes: 'OK' },
        { id: 3, category: 'Dock Levelers', item: 'Leveler 3', status: 'fail', notes: 'Not functioning' },
        { id: 4, category: 'Safety', item: 'Wheel chocks', status: 'pass', notes: 'Available' },
        { id: 5, category: 'Safety', item: 'Dock lights', status: 'pass', notes: 'Functional' },
        { id: 6, category: 'Safety', item: 'Restraint system', status: 'critical', notes: 'Not engaging' },
        { id: 7, category: 'Doors', item: 'Sectional door 1', status: 'pass', notes: 'OK' },
        { id: 8, category: 'Doors', item: 'Sectional door 2', status: 'fail', notes: 'Damaged panel' },
        { id: 9, category: 'Floor', item: 'Surface condition', status: 'critical', notes: 'Cracked area' },
        { id: 10, category: 'Floor', item: 'Drainage', status: 'pass', notes: 'OK' },
      ],
      recommendations: [
        'IMMEDIATE: Close dock positions 1,3 - unsafe',
        'Repair restraint system before further use',
        'Schedule floor repair for cracked area',
        'Order replacement door panel',
      ],
      attachments: [
        { name: 'inspection-photos.pdf', size: '5.2 MB' },
        { name: 'repair-orders.pdf', size: '1.2 MB' },
      ],
      notes: 'Critical issues found - dock partially closed',
      tags: ['safety', 'loading-dock', 'critical'],
      createdBy: 'Safety Department',
      createdAt: '2024-03-14',
      updatedAt: '2024-03-14',
    },
    {
      id: 'IR-010',
      reportNumber: 'IR-2024-010',
      title: 'Chemical Storage Inspection',
      description: 'Monthly inspection of hazardous chemical storage areas.',
      type: 'safety',
      category: 'chemical',
      status: 'approved',
      result: 'passed',
      priority: 'high',
      inspector: 'Richard Harris',
      inspectorId: 'USR-008',
      inspectorSignature: 'signed',
      reviewer: 'Safety Officer',
      reviewerId: 'USR-009',
      reviewerSignature: 'signed',
      inspectionDate: '2024-03-13',
      reportDate: '2024-03-13',
      dueDate: '2024-03-20',
      location: 'Warehouse B',
      zone: 'Hazmat Area',
      findings: 15,
      passedFindings: 14,
      failedFindings: 1,
      criticalFindings: 0,
      score: 93,
      maxScore: 100,
      items: [
        { id: 1, category: 'Containers', item: 'Labels', status: 'pass', notes: 'All present' },
        { id: 2, category: 'Containers', item: 'Condition', status: 'pass', notes: 'Good' },
        { id: 3, category: 'Containers', item: 'Secondary containment', status: 'pass', notes: 'Adequate' },
        { id: 4, category: 'Storage', item: 'Segregation', status: 'pass', notes: 'Proper' },
        { id: 5, category: 'Storage', item: 'Temperature', status: 'pass', notes: '22°C' },
        { id: 6, category: 'Storage', item: 'Ventilation', status: 'pass', notes: 'Working' },
        { id: 7, category: 'Safety', item: 'Eyewash station', status: 'pass', notes: 'Tested' },
        { id: 8, category: 'Safety', item: 'Shower', status: 'pass', notes: 'Tested' },
        { id: 9, category: 'Safety', item: 'Spill kit', status: 'fail', notes: 'Missing absorbent' },
        { id: 10, category: 'Documentation', item: 'MSDS sheets', status: 'pass', notes: 'Available' },
      ],
      recommendations: [
        'Restock spill kit with absorbent materials',
      ],
      attachments: [
        { name: 'inspection-report.pdf', size: '2.8 MB' },
      ],
      notes: 'Spill kit needs restocking - ordered',
      tags: ['chemical', 'hazmat', 'monthly'],
      createdBy: 'Safety Department',
      createdAt: '2024-03-13',
      updatedAt: '2024-03-13',
    },
  ];

  // Inspection types
  const inspectionTypes = [
    { id: 'all', name: 'All Types', count: inspectionReports.length },
    { id: 'safety', name: 'Safety', count: inspectionReports.filter(r => r.type === 'safety').length },
    { id: 'equipment', name: 'Equipment', count: inspectionReports.filter(r => r.type === 'equipment').length },
    { id: 'quality', name: 'Quality', count: inspectionReports.filter(r => r.type === 'quality').length },
    { id: 'environmental', name: 'Environmental', count: inspectionReports.filter(r => r.type === 'environmental').length },
    { id: 'audit', name: 'Audit', count: inspectionReports.filter(r => r.type === 'audit').length },
    { id: 'sanitation', name: 'Sanitation', count: inspectionReports.filter(r => r.type === 'sanitation').length },
  ];

  // Status configuration
  const statusConfig = {
    draft: { label: 'Draft', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: FileText },
    'in-progress': { label: 'In Progress', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Activity },
    'pending-review': { label: 'Pending Review', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    completed: { label: 'Completed', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: CheckCircle },
    approved: { label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
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
    const Icon = config?.icon || FileText;
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
      case 'safety': return <Shield size={14} className="text-red-600" />;
      case 'equipment': return <Wrench size={14} className="text-orange-600" />;
      case 'quality': return <CheckCircle size={14} className="text-green-600" />;
      case 'environmental': return <Thermometer size={14} className="text-blue-600" />;
      case 'audit': return <ClipboardCheck size={14} className="text-purple-600" />;
      case 'sanitation': return <Droplet size={14} className="text-cyan-600" />;
      default: return <FileText size={14} className="text-gray-600" />;
    }
  };

  const filteredReports = inspectionReports.filter(report => {
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesResult = selectedResult === 'all' || report.result === selectedResult;
    const matchesInspector = selectedInspector === 'all' || report.inspector === selectedInspector;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reportNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesType && matchesResult && matchesInspector && matchesSearch;
  });

  const stats = {
    total: inspectionReports.length,
    pending: inspectionReports.filter(r => r.status === 'pending-review' || r.status === 'in-progress').length,
    completed: inspectionReports.filter(r => r.status === 'completed' || r.status === 'approved').length,
    passed: inspectionReports.filter(r => r.result === 'passed').length,
    failed: inspectionReports.filter(r => r.result === 'failed').length,
    warning: inspectionReports.filter(r => r.result === 'warning').length,
    critical: inspectionReports.filter(r => r.priority === 'critical').length,
  };

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(r => r.id));
    }
  };

  const handleSelectReport = (id) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter(r => r !== id));
    } else {
      setSelectedReports([...selectedReports, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Inspection Reports</h1>
            <p className="text-black/50 mt-1">Manage and review inspection findings and reports</p>
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
              New Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Reports</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <FileText size={18} className="text-red-600" />
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
              placeholder="Search by title, number, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[140px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending-review">Pending Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Inspection Type" />
            </SelectTrigger>
            <SelectContent>
              {inspectionTypes.map(type => (
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

      {/* Bulk Actions Bar */}
      {selectedReports.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedReports.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedReports([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <Download size={14} className="mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Share2 size={14} className="mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-red-600">
              <Trash2 size={14} className="mr-2" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Inspection Reports Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredReports.map((report) => {
            const StatusIcon = statusConfig[report.status]?.icon || FileText;
            const ResultIcon = resultConfig[report.result]?.icon || CheckCircle;
            
            return (
              <Card key={report.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(report.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {report.status}
                          </Badge>
                          <Badge className={cn("text-xs border-0", getResultColor(report.result))}>
                            <ResultIcon className="mr-1" size={10} />
                            {report.result}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(report.priority))}>
                            {report.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{report.title}</h3>
                        <p className="text-xs text-black/50 mt-1">{report.reportNumber}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedReport(report);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {report.status === 'pending-review' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedReport(report);
                              setShowApproveDialog(true);
                            }}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {report.status === 'draft' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedReport(report);
                              setShowEditDialog(true);
                            }}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {report.status === 'approved' && (
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Certificate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
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
                      {report.description}
                    </p>

                    {/* Inspector & Date */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <User size={12} className="text-black/50" />
                        <span className="text-xs text-black/70">{report.inspector}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-black/50" />
                        <span className="text-xs text-black/70">{report.inspectionDate}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 mb-3">
                      <MapPin size={12} className="text-black/50" />
                      <span className="text-xs text-black/70">{report.location}</span>
                      {report.zone && (
                        <>
                          <span className="text-xs text-black/30">•</span>
                          <span className="text-xs text-black/70">{report.zone}</span>
                        </>
                      )}
                    </div>

                    {/* Findings Summary */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="p-2 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[10px] text-black/50">Findings</p>
                        <p className="text-sm font-bold">{report.findings}</p>
                      </div>
                      <div className="p-2 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[10px] text-black/50">Passed</p>
                        <p className="text-sm font-bold text-green-600">{report.passedFindings}</p>
                      </div>
                      <div className="p-2 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[10px] text-black/50">Failed</p>
                        <p className="text-sm font-bold text-red-600">{report.failedFindings}</p>
                      </div>
                    </div>

                    {/* Score */}
                    {report.score > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-black/50">Compliance Score</span>
                          <span className="text-xs font-medium">{report.score}%</span>
                        </div>
                        <Progress 
                          value={report.score} 
                          className="h-2 bg-[#F5EEE9]"
                          style={{ 
                            '--progress-background': 
                              report.score >= 90 ? '#22c55e' :
                              report.score >= 75 ? '#3b82f6' :
                              report.score >= 60 ? '#eab308' :
                              '#ef4444'
                          } }
                        />
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {report.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                      {report.tags.length > 2 && (
                        <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                          +{report.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-2">
                      <div className="flex items-center gap-1">
                        <FileText size={10} />
                        <span>{report.reportNumber}</span>
                      </div>
                      {report.attachments && report.attachments.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Download size={10} />
                          <span>{report.attachments.length}</span>
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
                      checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Report #</TableHead>
                  <TableHead className="text-black/50">Title</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Result</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Inspector</TableHead>
                  <TableHead className="text-black/50">Date</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50 text-right">Findings</TableHead>
                  <TableHead className="text-black/50 text-right">Score</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={() => handleSelectReport(report.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs">{report.reportNumber}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{report.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {report.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(report.status))}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getResultColor(report.result))}>
                        {report.result}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(report.priority))}>
                        {report.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.inspector}</TableCell>
                    <TableCell className="text-xs">{report.inspectionDate}</TableCell>
                    <TableCell className="max-w-[100px] truncate">{report.location}</TableCell>
                    <TableCell className="text-right">{report.findings}</TableCell>
                    <TableCell className="text-right">
                      <span className={cn(
                        "font-medium",
                        report.score >= 90 ? 'text-green-600' :
                        report.score >= 75 ? 'text-blue-600' :
                        report.score >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      )}>
                        {report.score}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedReport(report);
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
                Showing {filteredReports.length} of {inspectionReports.length} reports
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

      {/* Create Report Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Inspection Report</DialogTitle>
            <DialogDescription>
              Create a new inspection report
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="items">Inspection Items</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Report Title</Label>
                    <Input placeholder="e.g., Monthly Safety Inspection" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="quality">Quality</SelectItem>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="audit">Audit</SelectItem>
                        <SelectItem value="sanitation">Sanitation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the inspection" rows={3} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="e.g., Warehouse A" />
                  </div>
                  <div className="space-y-2">
                    <Label>Zone/Area</Label>
                    <Input placeholder="e.g., All Zones" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Inspection Date</Label>
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
              </TabsContent>

              <TabsContent value="items" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Inspection Items</Label>
                  <Button variant="outline" size="sm">
                    <Plus size={14} className="mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <Input placeholder="Category" defaultValue={`Category ${i}`} />
                          <Input placeholder="Item description" defaultValue={`Inspection item ${i}`} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Select defaultValue="pass">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pass">Pass</SelectItem>
                              <SelectItem value="fail">Fail</SelectItem>
                              <SelectItem value="na">N/A</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input placeholder="Notes" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label>Recommendations</Label>
                  <Textarea placeholder="Enter recommendations" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes" rows={3} />
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

                <div className="space-y-2">
                  <Label>Attachments</Label>
                  <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                    <Upload size={24} className="mx-auto text-black/30 mb-2" />
                    <p className="text-sm text-black/50">Drag files or click to upload</p>
                  </div>
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
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Inspection Report Details</DialogTitle>
          </DialogHeader>

          {selectedReport && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="items">Inspection Items</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedReport.title}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedReport.reportNumber} • {selectedReport.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cn("text-xs border-0", getStatusColor(selectedReport.status))}>
                        {selectedReport.status}
                      </Badge>
                      <Badge className={cn("text-xs border-0", getResultColor(selectedReport.result))}>
                        {selectedReport.result}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <p className="text-sm">{selectedReport.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Inspector</p>
                      <p className="text-sm font-medium">{selectedReport.inspector}</p>
                      {selectedReport.inspectorSignature && (
                        <p className="text-xs text-green-600">✓ Signed</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Reviewer</p>
                      <p className="text-sm font-medium">{selectedReport.reviewer || 'Not assigned'}</p>
                      {selectedReport.reviewerSignature && (
                        <p className="text-xs text-green-600">✓ Signed</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-black/50">Inspection Date</p>
                      <p className="text-sm">{selectedReport.inspectionDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Report Date</p>
                      <p className="text-sm">{selectedReport.reportDate || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Due Date</p>
                      <p className="text-sm">{selectedReport.dueDate}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Location</p>
                    <p className="text-sm">{selectedReport.location} • {selectedReport.zone}</p>
                  </div>

                  {selectedReport.productName && (
                    <div>
                      <p className="text-xs text-black/50">Product</p>
                      <p className="text-sm">{selectedReport.productName} ({selectedReport.sku})</p>
                      <p className="text-xs text-black/50">Batch: {selectedReport.batchNumber}</p>
                    </div>
                  )}

                  {selectedReport.supplier && (
                    <div>
                      <p className="text-xs text-black/50">Supplier</p>
                      <p className="text-sm">{selectedReport.supplier}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Findings</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-green-100 text-green-700">Pass: {selectedReport.passedFindings}</Badge>
                        <Badge className="bg-red-100 text-red-700">Fail: {selectedReport.failedFindings}</Badge>
                        {selectedReport.criticalFindings > 0 && (
                          <Badge className="bg-red-600 text-white">Critical: {selectedReport.criticalFindings}</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Compliance Score</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={selectedReport.score} className="w-24 h-2 bg-[#F5EEE9]" />
                        <span className={cn(
                          "text-sm font-bold",
                          selectedReport.score >= 90 ? 'text-green-600' :
                          selectedReport.score >= 75 ? 'text-blue-600' :
                          selectedReport.score >= 60 ? 'text-yellow-600' :
                          'text-red-600'
                        )}>
                          {selectedReport.score}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedReport.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedReport.notes}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedReport.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="items" className="space-y-4">
                  <div className="space-y-3">
                    {selectedReport.items.map((item) => (
                      <div key={item.id} className="p-3 border border-[#F5EEE9] rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-xs text-black/50">{item.category}</p>
                            <p className="text-sm font-medium">{item.item}</p>
                          </div>
                          <Badge className={cn(
                            "text-xs",
                            item.status === 'pass' && 'bg-green-100 text-green-700',
                            item.status === 'fail' && 'bg-red-100 text-red-700',
                            item.status === 'warning' && 'bg-yellow-100 text-yellow-700',
                            item.status === 'critical' && 'bg-red-600 text-white',
                          )}>
                            {item.status}
                          </Badge>
                        </div>
                        {item.value && (
                          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                            <div>
                              <span className="text-black/50">Value: </span>
                              <span className="font-medium">{item.value}</span>
                            </div>
                            {item.spec && (
                              <div>
                                <span className="text-black/50">Spec: </span>
                                <span className="font-medium">{item.spec}</span>
                              </div>
                            )}
                          </div>
                        )}
                        {item.notes && (
                          <p className="text-xs text-black/70">{item.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  {selectedReport.recommendations && selectedReport.recommendations.length > 0 ? (
                    <div className="space-y-3">
                      {selectedReport.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle size={14} className="text-yellow-600 mt-0.5" />
                            <p className="text-sm">{rec}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-black/50 text-center py-4">No recommendations</p>
                  )}

                  {selectedReport.attachments && selectedReport.attachments.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-medium mb-2">Attachments</p>
                      <div className="space-y-2">
                        {selectedReport.attachments.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 border border-[#F5EEE9] rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText size={14} className="text-blue-600" />
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

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                        <CheckCircle size={12} className="text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Report Approved</p>
                            <span className="text-[10px] text-black/50">{selectedReport.updatedAt}</span>
                          </div>
                          <p className="text-[10px] text-black/50">By: {selectedReport.reviewer || 'System'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                        <FileText size={12} className="text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Report Submitted</p>
                            <span className="text-[10px] text-black/50">{selectedReport.reportDate || selectedReport.inspectionDate}</span>
                          </div>
                          <p className="text-[10px] text-black/50">By: {selectedReport.inspector}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                        <Calendar size={12} className="text-purple-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Inspection Performed</p>
                            <span className="text-[10px] text-black/50">{selectedReport.inspectionDate}</span>
                          </div>
                          <p className="text-[10px] text-black/50">By: {selectedReport.inspector}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                        <Plus size={12} className="text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Report Created</p>
                            <span className="text-[10px] text-black/50">{selectedReport.createdAt}</span>
                          </div>
                          <p className="text-[10px] text-black/50">By: {selectedReport.createdBy}</p>
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
            {selectedReport?.status === 'pending-review' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowApproveDialog(true);
              }}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            )}
            <Button variant="outline" className="gap-2">
              <Download size={14} />
              Download
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
            <TooltipContent side="left">New Report</TooltipContent>
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
                onClick={() => setShowHistoryDialog(true)}
              >
                <History size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">History</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default InspectionReportsPage;