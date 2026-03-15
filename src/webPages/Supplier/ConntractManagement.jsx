// app/dashboard/contracts/page.js
'use client';

import { useState } from 'react';
import { 
  FileText,
  FileSignature,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  Calendar,
  Building,
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
  Copy,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  History,
  BarChart3,
  Mail,
  Award,
  Target,
  DollarSign,
  Package,
  Handshake,
  Plus,
  Ban,

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
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ContractManagementPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showRenewDialog, setShowRenewDialog] = useState(false);
  const [showTerminateDialog, setShowTerminateDialog] = useState(false);
  const [showAmendDialog, setShowAmendDialog] = useState(false);
  const [showSignDialog, setShowSignDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContracts, setSelectedContracts] = useState([]);

  // Sample contracts data
  const contracts = [
    {
      id: 'CT-001',
      contractNumber: 'CT-2024-001',
      title: 'Electronics Supply Agreement',
      description: 'Master supply agreement for electronic components and accessories',
      type: 'master',
      vendorId: 'VEN-001',
      vendorName: 'Tech Supplies Inc',
      status: 'active',
      priority: 'high',
      value: 1500000,
      currency: 'USD',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      renewalDate: '2024-10-31',
      noticePeriod: 60,
      autoRenew: true,
      renewalTerms: 'Annual renewal with 3% price adjustment',
      paymentTerms: 'Net 30',
      paymentSchedule: 'Monthly',
      billingCycle: 'Monthly',
      signedBy: {
        company: 'John Doe',
        vendor: 'Jane Smith',
      },
      signedDate: '2023-12-15',
      effectiveDate: '2024-01-01',
      expirationDate: '2024-12-31',
      documents: ['contract.pdf', 'sla.pdf'],
      amendments: [],
      milestones: [
        { date: '2024-01-15', description: 'Initial delivery', status: 'completed' },
        { date: '2024-06-30', description: 'Mid-year review', status: 'pending' },
        { date: '2024-12-15', description: 'Final delivery', status: 'pending' },
      ],
      keyClauses: [
        'Confidentiality',
        'Indemnification',
        'Termination for cause',
        'Force majeure',
      ],
      contacts: [
        { name: 'John Smith', role: 'Account Manager', email: 'john@techsupplies.com' },
      ],
      notes: 'Preferred vendor agreement',
      tags: ['electronics', 'preferred', 'annual'],
      createdBy: 'Procurement Dept',
      createdAt: '2023-12-10',
      updatedAt: '2024-01-01',
      history: [
        { date: '2024-01-01', action: 'Activated', user: 'System' },
        { date: '2023-12-15', action: 'Signed', user: 'John Doe, Jane Smith' },
        { date: '2023-12-10', action: 'Created', user: 'Procurement Dept' },
      ],
    },
    {
      id: 'CT-002',
      contractNumber: 'CT-2024-002',
      title: 'Office Furniture Lease',
      description: 'Lease agreement for office furniture and equipment',
      type: 'lease',
      vendorId: 'VEN-002',
      vendorName: 'Office Furniture Co',
      status: 'active',
      priority: 'medium',
      value: 250000,
      currency: 'USD',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      renewalDate: '2024-12-01',
      noticePeriod: 30,
      autoRenew: false,
      renewalTerms: 'Option to purchase at end of lease',
      paymentTerms: 'Net 15',
      paymentSchedule: 'Quarterly',
      billingCycle: 'Quarterly',
      signedBy: {
        company: 'Sarah Wilson',
        vendor: 'Mike Johnson',
      },
      signedDate: '2024-01-20',
      effectiveDate: '2024-02-01',
      expirationDate: '2025-01-31',
      documents: ['lease-agreement.pdf', 'inventory-list.pdf'],
      amendments: [],
      milestones: [
        { date: '2024-02-15', description: 'Delivery complete', status: 'completed' },
        { date: '2024-04-01', description: 'First quarterly payment', status: 'pending' },
        { date: '2025-01-15', description: 'Return inspection', status: 'pending' },
      ],
      keyClauses: [
        'Maintenance responsibilities',
        'Damage clause',
        'Early termination',
        'Purchase option',
      ],
      contacts: [
        { name: 'Mike Johnson', role: 'Account Executive', email: 'mike@officefurniture.com' },
      ],
      notes: 'Lease for new office renovation',
      tags: ['furniture', 'lease', 'office'],
      createdBy: 'Facilities Dept',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-01',
      history: [
        { date: '2024-02-01', action: 'Activated', user: 'System' },
        { date: '2024-01-20', action: 'Signed', user: 'Sarah Wilson, Mike Johnson' },
        { date: '2024-01-15', action: 'Created', user: 'Facilities Dept' },
      ],
    },
    {
      id: 'CT-003',
      contractNumber: 'CT-2024-003',
      title: 'Food Supply Agreement',
      description: 'Annual supply agreement for organic food products',
      type: 'supply',
      vendorId: 'VEN-004',
      vendorName: 'Organic Food Co',
      status: 'active',
      priority: 'high',
      value: 500000,
      currency: 'USD',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      renewalDate: '2025-01-31',
      noticePeriod: 45,
      autoRenew: true,
      renewalTerms: 'Annual renewal with volume discounts',
      paymentTerms: 'Net 15',
      paymentSchedule: 'Weekly',
      billingCycle: 'Weekly',
      signedBy: {
        company: 'Tom Brown',
        vendor: 'Emma Watson',
      },
      signedDate: '2024-02-20',
      effectiveDate: '2024-03-01',
      expirationDate: '2025-02-28',
      documents: ['supply-agreement.pdf', 'price-list.pdf', 'quality-standards.pdf'],
      amendments: [],
      milestones: [
        { date: '2024-03-15', description: 'First delivery', status: 'completed' },
        { date: '2024-06-01', description: 'Quarterly review', status: 'pending' },
        { date: '2025-02-15', description: 'Renewal notice', status: 'pending' },
      ],
      keyClauses: [
        'Quality standards',
        'Delivery schedule',
        'Price adjustment',
        'Safety compliance',
      ],
      contacts: [
        { name: 'Emma Watson', role: 'Account Manager', email: 'emma@organicfood.com' },
      ],
      notes: 'Weekly fresh food deliveries',
      tags: ['food', 'organic', 'weekly'],
      createdBy: 'Procurement Dept',
      createdAt: '2024-02-15',
      updatedAt: '2024-03-01',
      history: [
        { date: '2024-03-01', action: 'Activated', user: 'System' },
        { date: '2024-02-20', action: 'Signed', user: 'Tom Brown, Emma Watson' },
        { date: '2024-02-15', action: 'Created', user: 'Procurement Dept' },
      ],
    },
    {
      id: 'CT-004',
      contractNumber: 'CT-2024-004',
      title: 'Chemical Supply Framework',
      description: 'Framework agreement for industrial chemicals',
      type: 'framework',
      vendorId: 'VEN-008',
      vendorName: 'ChemCorp Industries',
      status: 'active',
      priority: 'high',
      value: 2000000,
      currency: 'USD',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      renewalDate: '2024-11-15',
      noticePeriod: 90,
      autoRenew: false,
      renewalTerms: 'Annual negotiation',
      paymentTerms: 'Net 45',
      paymentSchedule: 'Monthly',
      billingCycle: 'Monthly',
      signedBy: {
        company: 'David Lee',
        vendor: 'Chris Evans',
      },
      signedDate: '2024-01-10',
      effectiveDate: '2024-01-15',
      expirationDate: '2024-12-31',
      documents: ['framework-agreement.pdf', 'pricing-schedule.pdf', 'safety-data.pdf'],
      amendments: [],
      milestones: [
        { date: '2024-03-31', description: 'Q1 review', status: 'pending' },
        { date: '2024-06-30', description: 'Q2 review', status: 'pending' },
        { date: '2024-11-01', description: 'Renewal negotiation', status: 'pending' },
      ],
      keyClauses: [
        'Safety compliance',
        'Environmental standards',
        'Volume pricing',
        'Emergency supply',
      ],
      contacts: [
        { name: 'Chris Evans', role: 'Chemical Sales', email: 'chris@chemcorp.com' },
      ],
      notes: 'Framework for all chemical purchases',
      tags: ['chemical', 'framework', 'industrial'],
      createdBy: 'Procurement Dept',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15',
      history: [
        { date: '2024-01-15', action: 'Activated', user: 'System' },
        { date: '2024-01-10', action: 'Signed', user: 'David Lee, Chris Evans' },
        { date: '2024-01-05', action: 'Created', user: 'Procurement Dept' },
      ],
    },
    {
      id: 'CT-005',
      contractNumber: 'CT-2024-005',
      title: 'Packaging Supply Agreement',
      description: 'Supply agreement for packaging materials',
      type: 'supply',
      vendorId: 'VEN-009',
      vendorName: 'Packaging Solutions Inc',
      status: 'pending',
      priority: 'medium',
      value: 180000,
      currency: 'USD',
      startDate: '2024-04-01',
      endDate: '2025-03-31',
      renewalDate: '2025-02-01',
      noticePeriod: 30,
      autoRenew: true,
      renewalTerms: 'Annual renewal with market adjustment',
      paymentTerms: 'Net 30',
      paymentSchedule: 'Monthly',
      billingCycle: 'Monthly',
      signedBy: null,
      signedDate: null,
      effectiveDate: null,
      expirationDate: null,
      documents: ['draft-agreement.pdf'],
      amendments: [],
      milestones: [
        { date: '2024-03-15', description: 'Review deadline', status: 'pending' },
        { date: '2024-03-25', description: 'Signing deadline', status: 'pending' },
      ],
      keyClauses: [
        'Quality specifications',
        'Delivery schedule',
        'Minimum order quantities',
      ],
      contacts: [
        { name: 'Tom Holland', role: 'Packaging Specialist', email: 'tom@packagingsolutions.com' },
      ],
      notes: 'Under legal review',
      tags: ['packaging', 'pending', 'review'],
      createdBy: 'Procurement Dept',
      createdAt: '2024-02-28',
      updatedAt: '2024-02-28',
      history: [
        { date: '2024-02-28', action: 'Created', user: 'Procurement Dept' },
      ],
    },
    {
      id: 'CT-006',
      contractNumber: 'CT-2023-006',
      title: 'Medical Supplies Agreement',
      description: 'Annual supply agreement for medical supplies and PPE',
      type: 'supply',
      vendorId: 'VEN-006',
      vendorName: 'Medical Supplies Inc',
      status: 'expiring',
      priority: 'high',
      value: 750000,
      currency: 'USD',
      startDate: '2023-04-01',
      endDate: '2024-03-31',
      renewalDate: '2024-02-15',
      noticePeriod: 45,
      autoRenew: false,
      renewalTerms: 'Renegotiation required',
      paymentTerms: 'Net 30',
      paymentSchedule: 'Monthly',
      billingCycle: 'Monthly',
      signedBy: {
        company: 'Richard Harris',
        vendor: 'Sarah Johnson',
      },
      signedDate: '2023-03-20',
      effectiveDate: '2023-04-01',
      expirationDate: '2024-03-31',
      documents: ['supply-agreement.pdf', 'price-list.pdf'],
      amendments: [],
      milestones: [
        { date: '2024-02-15', description: 'Renewal notice sent', status: 'completed' },
        { date: '2024-03-15', description: 'Contract end', status: 'pending' },
      ],
      keyClauses: [
        'Quality standards',
        'Emergency supply',
        'Price protection',
      ],
      contacts: [
        { name: 'Sarah Johnson', role: 'Account Manager', email: 'sarah@medicalsupplies.com' },
      ],
      notes: 'Expiring soon - renewal in progress',
      tags: ['medical', 'expiring', 'urgent'],
      createdBy: 'Procurement Dept',
      createdAt: '2023-03-15',
      updatedAt: '2024-02-15',
      history: [
        { date: '2024-02-15', action: 'Renewal Notice Sent', user: 'System' },
        { date: '2023-04-01', action: 'Activated', user: 'System' },
        { date: '2023-03-20', action: 'Signed', user: 'Richard Harris, Sarah Johnson' },
        { date: '2023-03-15', action: 'Created', user: 'Procurement Dept' },
      ],
    },
    {
      id: 'CT-007',
      contractNumber: 'CT-2023-007',
      title: 'Industrial Tools Framework',
      description: 'Framework agreement for industrial tools and equipment',
      type: 'framework',
      vendorId: 'VEN-005',
      vendorName: 'Industrial Supplies Co',
      status: 'expired',
      priority: 'low',
      value: 500000,
      currency: 'USD',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      renewalDate: '2023-11-01',
      noticePeriod: 60,
      autoRenew: false,
      renewalTerms: 'Not renewed',
      paymentTerms: 'Net 60',
      paymentSchedule: 'Monthly',
      billingCycle: 'Monthly',
      signedBy: {
        company: 'Mike Johnson',
        vendor: 'David Lee',
      },
      signedDate: '2022-12-15',
      effectiveDate: '2023-01-01',
      expirationDate: '2023-12-31',
      documents: ['framework-agreement.pdf'],
      amendments: [],
      milestones: [],
      keyClauses: [
        'Volume discounts',
        'Delivery terms',
      ],
      contacts: [
        { name: 'David Lee', role: 'Industrial Sales', email: 'david@industrialsupplies.com' },
      ],
      notes: 'Not renewed - switched to new vendor',
      tags: ['industrial', 'expired', 'archived'],
      createdBy: 'Procurement Dept',
      createdAt: '2022-12-10',
      updatedAt: '2024-01-01',
      history: [
        { date: '2024-01-01', action: 'Expired', user: 'System' },
        { date: '2023-01-01', action: 'Activated', user: 'System' },
        { date: '2022-12-15', action: 'Signed', user: 'Mike Johnson, David Lee' },
        { date: '2022-12-10', action: 'Created', user: 'Procurement Dept' },
      ],
    },
    {
      id: 'CT-008',
      contractNumber: 'CT-2024-008',
      title: 'Logistics Services Agreement',
      description: 'Annual agreement for freight and logistics services',
      type: 'service',
      vendorId: 'VEN-010',
      vendorName: 'Logistics Partners LLC',
      status: 'active',
      priority: 'medium',
      value: 350000,
      currency: 'USD',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      renewalDate: '2024-10-15',
      noticePeriod: 45,
      autoRenew: true,
      renewalTerms: 'Annual renewal with rate adjustment',
      paymentTerms: 'Net 30',
      paymentSchedule: 'Monthly',
      billingCycle: 'Monthly',
      signedBy: {
        company: 'Zendaya',
        vendor: 'Tom Holland',
      },
      signedDate: '2023-12-20',
      effectiveDate: '2024-01-01',
      expirationDate: '2024-12-31',
      documents: ['service-agreement.pdf', 'sla.pdf', 'rate-card.pdf'],
      amendments: [],
      milestones: [
        { date: '2024-03-31', description: 'Q1 performance review', status: 'pending' },
        { date: '2024-06-30', description: 'Q2 performance review', status: 'pending' },
        { date: '2024-09-30', description: 'Q3 performance review', status: 'pending' },
      ],
      keyClauses: [
        'Service level agreement',
        'Liability limits',
        'Performance penalties',
        'Force majeure',
      ],
      contacts: [
        { name: 'Tom Holland', role: 'Logistics Coordinator', email: 'tom@logisticspartners.com' },
      ],
      notes: 'Primary logistics provider',
      tags: ['logistics', 'service', 'annual'],
      createdBy: 'Logistics Dept',
      createdAt: '2023-12-15',
      updatedAt: '2024-01-01',
      history: [
        { date: '2024-01-01', action: 'Activated', user: 'System' },
        { date: '2023-12-20', action: 'Signed', user: 'Zendaya, Tom Holland' },
        { date: '2023-12-15', action: 'Created', user: 'Logistics Dept' },
      ],
    },
  ];

  // Contract types
  const contractTypes = [
    { id: 'all', name: 'All Types', count: contracts.length },
    { id: 'master', name: 'Master Agreement', count: contracts.filter(c => c.type === 'master').length },
    { id: 'supply', name: 'Supply Agreement', count: contracts.filter(c => c.type === 'supply').length },
    { id: 'framework', name: 'Framework Agreement', count: contracts.filter(c => c.type === 'framework').length },
    { id: 'lease', name: 'Lease Agreement', count: contracts.filter(c => c.type === 'lease').length },
    { id: 'service', name: 'Service Agreement', count: contracts.filter(c => c.type === 'service').length },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    expiring: { label: 'Expiring', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertTriangle },
    expired: { label: 'Expired', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    draft: { label: 'Draft', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: FileText },
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

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-100 text-gray-700';
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'master': return <Award size={14} className="text-purple-600" />;
      case 'supply': return <Package size={14} className="text-blue-600" />;
      case 'framework': return <Grid size={14} className="text-green-600" />;
      case 'lease': return <Building size={14} className="text-orange-600" />;
      case 'service': return <Handshake size={14} className="text-indigo-600" />;
      default: return <FileText size={14} className="text-gray-600" />;
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesStatus = selectedStatus === 'all' || contract.status === selectedStatus;
    const matchesType = selectedType === 'all' || contract.type === selectedType;
    const matchesVendor = selectedVendor === 'all' || contract.vendorName === selectedVendor;
    const matchesPriority = selectedPriority === 'all' || contract.priority === selectedPriority;
    const matchesSearch = contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesType && matchesVendor && matchesPriority && matchesSearch;
  });

  const stats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === 'active').length,
    pending: contracts.filter(c => c.status === 'pending').length,
    expiring: contracts.filter(c => c.status === 'expiring').length,
    expired: contracts.filter(c => c.status === 'expired').length,
    totalValue: contracts.reduce((sum, c) => sum + (c.status === 'active' ? c.value : 0), 0),
    expiringValue: contracts.filter(c => c.status === 'expiring').reduce((sum, c) => sum + c.value, 0),
  };

  const handleSelectAll = () => {
    if (selectedContracts.length === filteredContracts.length) {
      setSelectedContracts([]);
    } else {
      setSelectedContracts(filteredContracts.map(c => c.id));
    }
  };

  const handleSelectContract = (id) => {
    if (selectedContracts.includes(id)) {
      setSelectedContracts(selectedContracts.filter(c => c !== id));
    } else {
      setSelectedContracts([...selectedContracts, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Contract Management</h1>
            <p className="text-black/50 mt-1">Manage and track vendor contracts and agreements</p>
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
              New Contract
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Contracts</p>
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
                  <p className="text-xs text-black/50">Expiring</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.expiring}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <AlertTriangle size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Expired</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.expired}</p>
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
                  <p className="text-xs text-black/50">Total Value</p>
                  <p className="text-xl font-bold text-green-600 mt-1">${(stats.totalValue / 1000000).toFixed(1)}M</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <DollarSign size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Expiry Timeline */}
      <Card className="border-[#F5EEE9] mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Contract Expiry Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-16">
            {/* Timeline bar */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full transform -translate-y-1/2" />
            
            {/* Markers */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-white border-2 border-green-500 rounded-full" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-black/50 whitespace-nowrap">180+ days</span>
            </div>
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-white border-2 border-yellow-500 rounded-full" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-black/50 whitespace-nowrap">90 days</span>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-white border-2 border-orange-500 rounded-full" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-black/50 whitespace-nowrap">30 days</span>
            </div>
            <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-white border-2 border-red-500 rounded-full" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-black/50 whitespace-nowrap">7 days</span>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-white border-2 border-gray-500 rounded-full" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-black/50 whitespace-nowrap">Expired</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
            <Input
              placeholder="Search by contract #, title, vendor, or tags..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="expiring">Expiring</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Contract Type" />
            </SelectTrigger>
            <SelectContent>
              {contractTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name} ({type.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
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
      {selectedContracts.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedContracts.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedContracts([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <FileSignature size={14} className="mr-2" />
              Sign
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <RefreshCw size={14} className="mr-2" />
              Renew
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Contracts Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredContracts.map((contract) => {
            const StatusIcon = statusConfig[contract.status]?.icon || FileText;
            const daysToExpiry = contract.expirationDate ? getDaysUntilExpiry(contract.expirationDate) : null;
            
            return (
              <Card key={contract.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(contract.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {contract.status}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(contract.priority))}>
                            {contract.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            {contract.type}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{contract.title}</h3>
                        <p className="text-xs text-black/50 mt-1">{contract.contractNumber}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedContract(contract);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {contract.status === 'pending' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedContract(contract);
                              setShowSignDialog(true);
                            }}>
                              <FileSignature className="mr-2 h-4 w-4" />
                              Sign
                            </DropdownMenuItem>
                          )}
                          {contract.status === 'active' && (
                            <>
                              <DropdownMenuItem onClick={() => {
                                setSelectedContract(contract);
                                setShowAmendDialog(true);
                              }}>
                                <Edit className="mr-2 h-4 w-4" />
                                Amend
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedContract(contract);
                                setShowRenewDialog(true);
                              }}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Renew
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedContract(contract);
                                setShowTerminateDialog(true);
                              }}>
                                <Ban className="mr-2 h-4 w-4" />
                                Terminate
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
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
                    {/* Vendor */}
                    <div className="flex items-center gap-2 mb-2">
                      <Building size={12} className="text-blue-600" />
                      <span className="text-sm font-medium">{contract.vendorName}</span>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={10} className="text-black/30" />
                        <span className="text-[10px] text-black/70">Start: {contract.startDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={10} className="text-black/30" />
                        <span className="text-[10px] text-black/70">End: {contract.endDate}</span>
                      </div>
                    </div>

                    {/* Value */}
                    <div className="mb-2 p-2 bg-[#F5EEE9]/30 rounded">
                      <p className="text-[10px] text-black/50">Contract Value</p>
                      <p className="text-sm font-bold text-green-600">${contract.value.toLocaleString()}</p>
                    </div>

                    {/* Expiry Warning */}
                    {contract.status === 'expiring' && daysToExpiry && (
                      <div className="mb-2 p-2 bg-orange-50 rounded">
                        <p className="text-[10px] text-orange-700">Expires in {daysToExpiry} days</p>
                      </div>
                    )}

                    {/* Milestones */}
                    {contract.milestones && contract.milestones.length > 0 && (
                      <div className="mb-2">
                        <p className="text-[10px] text-black/50 mb-1">Next Milestone</p>
                        <div className="flex items-center gap-1">
                          <Target size={10} className="text-purple-600" />
                          <span className="text-[10px] text-black/70 truncate">
                            {contract.milestones.find(m => m.status === 'pending')?.description || 'None'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {contract.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                      <span>Signed: {contract.signedDate || 'Pending'}</span>
                      {contract.documents && contract.documents.length > 0 && (
                        <div className="flex items-center gap-1">
                          <FileText size={8} />
                          <span>{contract.documents.length}</span>
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
                      checked={selectedContracts.length === filteredContracts.length && filteredContracts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Contract #</TableHead>
                  <TableHead className="text-black/50">Title</TableHead>
                  <TableHead className="text-black/50">Vendor</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50 text-right">Value</TableHead>
                  <TableHead className="text-black/50">Start Date</TableHead>
                  <TableHead className="text-black/50">End Date</TableHead>
                  <TableHead className="text-black/50">Days Left</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => {
                  const daysToExpiry = contract.expirationDate ? getDaysUntilExpiry(contract.expirationDate) : null;
                  
                  return (
                    <TableRow key={contract.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox 
                          checked={selectedContracts.includes(contract.id)}
                          onCheckedChange={() => handleSelectContract(contract.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs">{contract.contractNumber}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{contract.title}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{contract.vendorName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {contract.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(contract.status))}>
                          {contract.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getPriorityColor(contract.priority))}>
                          {contract.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        ${contract.value.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs">{contract.startDate}</TableCell>
                      <TableCell className="text-xs">{contract.endDate}</TableCell>
                      <TableCell>
                        {daysToExpiry && contract.status !== 'expired' ? (
                          <span className={cn(
                            "text-xs font-medium",
                            daysToExpiry <= 7 ? 'text-red-600' :
                            daysToExpiry <= 30 ? 'text-orange-600' :
                            daysToExpiry <= 90 ? 'text-yellow-600' :
                            'text-green-600'
                          )}>
                            {daysToExpiry}
                          </span>
                        ) : (
                          <span className="text-xs text-black/50">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            setSelectedContract(contract);
                            setShowDetailsDialog(true);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-[#F5EEE9] p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-black/50">
                Showing {filteredContracts.length} of {contracts.length} contracts
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

      {/* Create Contract Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Contract</DialogTitle>
            <DialogDescription>
              Add a new contract or agreement
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Contract Title</Label>
                    <Input placeholder="e.g., Electronics Supply Agreement" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contract Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="master">Master Agreement</SelectItem>
                        <SelectItem value="supply">Supply Agreement</SelectItem>
                        <SelectItem value="framework">Framework Agreement</SelectItem>
                        <SelectItem value="lease">Lease Agreement</SelectItem>
                        <SelectItem value="service">Service Agreement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Vendor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VEN-001">Tech Supplies Inc</SelectItem>
                      <SelectItem value="VEN-002">Office Furniture Co</SelectItem>
                      <SelectItem value="VEN-004">Organic Food Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Contract Value ($)</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Contract description" rows={3} />
                </div>
              </TabsContent>

              <TabsContent value="terms" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Payment Terms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net15">Net 15</SelectItem>
                        <SelectItem value="net30">Net 30</SelectItem>
                        <SelectItem value="net45">Net 45</SelectItem>
                        <SelectItem value="net60">Net 60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Schedule</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Auto Renew</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-renew" />
                      <Label htmlFor="auto-renew">Enable auto-renewal</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notice Period (days)</Label>
                    <Input type="number" placeholder="30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Renewal Terms</Label>
                  <Textarea placeholder="Describe renewal terms" rows={2} />
                </div>

                <div className="space-y-2">
                  <Label>Key Clauses</Label>
                  <Input placeholder="e.g., Confidentiality, Indemnification" />
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

              <TabsContent value="milestones" className="space-y-4">
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <Card key={i} className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <Input type="date" placeholder="Date" />
                          <Input placeholder="Description" />
                        </div>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus size={14} className="mr-2" />
                    Add Milestone
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>

                <div className="space-y-2">
                  <Label>Documents</Label>
                  <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                    <Upload size={24} className="mx-auto text-black/30 mb-2" />
                    <p className="text-sm text-black/50">Upload contract documents</p>
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
              Create Contract
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contract Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Contract Details</DialogTitle>
          </DialogHeader>

          {selectedContract && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="terms">Terms</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedContract.title}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedContract.contractNumber}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cn("text-xs border-0", getStatusColor(selectedContract.status))}>
                        {selectedContract.status}
                      </Badge>
                      <Badge className={cn("text-xs", getPriorityColor(selectedContract.priority))}>
                        {selectedContract.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Vendor</p>
                      <p className="text-sm font-medium">{selectedContract.vendorName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Contract Type</p>
                      <p className="text-sm font-medium capitalize">{selectedContract.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Contract Value</p>
                      <p className="text-lg font-bold text-green-600">${selectedContract.value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Currency</p>
                      <p className="text-sm">{selectedContract.currency}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-black/50">Start Date</p>
                      <p className="text-sm">{selectedContract.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">End Date</p>
                      <p className="text-sm">{selectedContract.endDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Renewal Date</p>
                      <p className="text-sm">{selectedContract.renewalDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Signed By (Company)</p>
                      <p className="text-sm">{selectedContract.signedBy?.company || 'Pending'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Signed By (Vendor)</p>
                      <p className="text-sm">{selectedContract.signedBy?.vendor || 'Pending'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Signed Date</p>
                      <p className="text-sm">{selectedContract.signedDate || 'Not signed'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Effective Date</p>
                      <p className="text-sm">{selectedContract.effectiveDate || 'Pending'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Description</p>
                    <p className="text-sm mt-1">{selectedContract.description}</p>
                  </div>

                  {selectedContract.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedContract.notes}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedContract.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="terms" className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Payment Terms</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-black/50">Terms</p>
                          <p className="text-sm">{selectedContract.paymentTerms}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Schedule</p>
                          <p className="text-sm">{selectedContract.paymentSchedule}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Billing Cycle</p>
                          <p className="text-sm">{selectedContract.billingCycle}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Renewal Information</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Auto Renew</span>
                          <Badge className={selectedContract.autoRenew ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {selectedContract.autoRenew ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Notice Period</span>
                          <span className="text-sm font-medium">{selectedContract.noticePeriod} days</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/50">Renewal Terms</span>
                          <span className="text-sm">{selectedContract.renewalTerms}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Key Clauses</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedContract.keyClauses.map((clause) => (
                          <Badge key={clause} className="bg-[#F5EEE9] text-black">
                            {clause}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {selectedContract.documents && selectedContract.documents.length > 0 && (
                    <div>
                      <p className="text-xs font-medium mb-2">Documents</p>
                      <div className="space-y-2">
                        {selectedContract.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 border border-[#F5EEE9] rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText size={14} className="text-blue-600" />
                              <span className="text-sm">{doc}</span>
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

                <TabsContent value="milestones" className="space-y-4">
                  {selectedContract.milestones && selectedContract.milestones.length > 0 ? (
                    <div className="space-y-3">
                      {selectedContract.milestones.map((milestone, idx) => (
                        <Card key={idx} className="border-[#F5EEE9]">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{milestone.description}</p>
                                <p className="text-xs text-black/50">Due: {milestone.date}</p>
                              </div>
                              <Badge className={milestone.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                                {milestone.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-black/50 text-center py-4">No milestones defined</p>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedContract.history.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          {item.action === 'Created' && <Plus size={12} className="text-green-600 mt-0.5" />}
                          {item.action === 'Activated' && <CheckCircle size={12} className="text-green-600 mt-0.5" />}
                          {item.action === 'Signed' && <FileSignature size={12} className="text-blue-600 mt-0.5" />}
                          {item.action === 'Expired' && <AlertCircle size={12} className="text-red-600 mt-0.5" />}
                          {item.action === 'Renewal Notice Sent' && <Mail size={12} className="text-yellow-600 mt-0.5" />}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
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
            {selectedContract?.status === 'pending' && (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowSignDialog(true);
              }}>
                <FileSignature className="mr-2 h-4 w-4" />
                Sign Contract
              </Button>
            )}
            {selectedContract?.status === 'active' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowRenewDialog(true);
              }}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Renew
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
                <FileText size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">New Contract</TooltipContent>
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

export default ContractManagementPage;