// app/dashboard/administration/my-billing-history/page.js
'use client';

import { useState } from 'react';
import {
  Receipt,
  ReceiptText,
  DollarSign,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  Download,
  Printer,
  Mail,
  Share,
  Copy,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  Home,
  ChevronRight,
  Building2,
  FileSpreadsheet,
  FileJson,
  File,
  Settings,
  
  RotateCcw,
  TrendingUp,
  
} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MyBillingHistoryPage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewInvoiceDialogOpen, setViewInvoiceDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  // Mock data for billing history
  const billingHistory = [
    {
      id: 'INV-2024-001',
      invoiceNumber: 'ACC-2024-001',
      subscriptionName: 'ACCUCOUNT Enterprise Suite',
      subscriptionId: 'SUB-001',
      date: '2024-03-15T10:30:00Z',
      dueDate: '2024-04-14T10:30:00Z',
      amount: 24000,
      currency: 'USD',
      status: 'paid',
      paymentMethod: {
        type: 'credit_card',
        brand: 'Visa',
        last4: '4242'
      },
      paidAt: '2024-03-15T10:35:00Z',
      items: [
        { description: 'Enterprise Plan - Annual Subscription', quantity: 1, unitPrice: 24000, amount: 24000 }
      ],
      subtotal: 24000,
      tax: 0,
      total: 24000,
      billingAddress: {
        line1: '123 Main St',
        line2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      },
      companyInfo: {
        name: 'ACCUCOUNT Inc.',
        vatNumber: '123456789',
        registrationNumber: 'REG-12345'
      },
      pdf: '/invoices/inv-2024-001.pdf'
    },
    {
      id: 'INV-2024-002',
      invoiceNumber: 'ACC-2024-002',
      subscriptionName: 'Premium Support Plan',
      subscriptionId: 'SUB-002',
      date: '2024-03-15T09:20:00Z',
      dueDate: '2024-04-14T09:20:00Z',
      amount: 999,
      currency: 'USD',
      status: 'paid',
      paymentMethod: {
        type: 'credit_card',
        brand: 'Mastercard',
        last4: '1234'
      },
      paidAt: '2024-03-15T09:25:00Z',
      items: [
        { description: 'Premium Support - Monthly', quantity: 1, unitPrice: 999, amount: 999 }
      ],
      subtotal: 999,
      tax: 0,
      total: 999,
      billingAddress: {
        line1: '123 Main St',
        line2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      },
      companyInfo: {
        name: 'ACCUCOUNT Inc.',
        vatNumber: '123456789',
        registrationNumber: 'REG-12345'
      },
      pdf: '/invoices/inv-2024-002.pdf'
    },
    {
      id: 'INV-2024-003',
      invoiceNumber: 'ACC-2024-003',
      subscriptionName: 'Inventory Management Add-on',
      subscriptionId: 'SUB-003',
      date: '2024-03-01T14:15:00Z',
      dueDate: '2024-03-31T14:15:00Z',
      amount: 299,
      currency: 'USD',
      status: 'paid',
      paymentMethod: {
        type: 'paypal',
        email: 'user@example.com'
      },
      paidAt: '2024-03-01T14:20:00Z',
      items: [
        { description: 'Inventory Management - Monthly', quantity: 1, unitPrice: 299, amount: 299 }
      ],
      subtotal: 299,
      tax: 0,
      total: 299,
      billingAddress: {
        line1: '123 Main St',
        line2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      },
      companyInfo: {
        name: 'ACCUCOUNT Inc.',
        vatNumber: '123456789',
        registrationNumber: 'REG-12345'
      },
      pdf: '/invoices/inv-2024-003.pdf'
    },
    {
      id: 'INV-2024-004',
      invoiceNumber: 'ACC-2024-004',
      subscriptionName: 'Team Training Program',
      subscriptionId: 'SUB-004',
      date: '2024-02-15T11:45:00Z',
      dueDate: '2024-03-17T11:45:00Z',
      amount: 1500,
      currency: 'USD',
      status: 'paid',
      paymentMethod: {
        type: 'bank_transfer',
        reference: 'TR-2024-001'
      },
      paidAt: '2024-02-20T09:30:00Z',
      items: [
        { description: 'Team Training - Q1 2024', quantity: 1, unitPrice: 1500, amount: 1500 }
      ],
      subtotal: 1500,
      tax: 0,
      total: 1500,
      billingAddress: {
        line1: '123 Main St',
        line2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      },
      companyInfo: {
        name: 'ACCUCOUNT Inc.',
        vatNumber: '123456789',
        registrationNumber: 'REG-12345'
      },
      pdf: '/invoices/inv-2024-004.pdf'
    },
    {
      id: 'INV-2024-005',
      invoiceNumber: 'ACC-2024-005',
      subscriptionName: 'Implementation Consulting',
      subscriptionId: 'SUB-005',
      date: '2024-02-10T10:00:00Z',
      dueDate: '2024-03-12T10:00:00Z',
      amount: 5000,
      currency: 'USD',
      status: 'paid',
      paymentMethod: {
        type: 'invoice',
        terms: 'Net 30'
      },
      paidAt: '2024-03-05T14:20:00Z',
      items: [
        { description: 'Implementation Consulting - 40 hours', quantity: 40, unitPrice: 125, amount: 5000 }
      ],
      subtotal: 5000,
      tax: 0,
      total: 5000,
      billingAddress: {
        line1: '123 Main St',
        line2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      },
      companyInfo: {
        name: 'ACCUCOUNT Inc.',
        vatNumber: '123456789',
        registrationNumber: 'REG-12345'
      },
      pdf: '/invoices/inv-2024-005.pdf'
    },
    {
      id: 'INV-2024-006',
      invoiceNumber: 'ACC-2024-006',
      subscriptionName: 'Basic Support Plan',
      subscriptionId: 'SUB-006',
      date: '2024-02-01T08:30:00Z',
      dueDate: '2024-03-03T08:30:00Z',
      amount: 199,
      currency: 'USD',
      status: 'paid',
      paymentMethod: {
        type: 'credit_card',
        brand: 'Amex',
        last4: '5678'
      },
      paidAt: '2024-02-01T08:35:00Z',
      items: [
        { description: 'Basic Support - February 2024', quantity: 1, unitPrice: 199, amount: 199 }
      ],
      subtotal: 199,
      tax: 0,
      total: 199,
      billingAddress: {
        line1: '123 Main St',
        line2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      },
      companyInfo: {
        name: 'ACCUCOUNT Inc.',
        vatNumber: '123456789',
        registrationNumber: 'REG-12345'
      },
      pdf: '/invoices/inv-2024-006.pdf'
    },
    {
      id: 'INV-2024-007',
      invoiceNumber: 'ACC-2024-007',
      subscriptionName: 'Data Analytics Pro',
      subscriptionId: 'SUB-007',
      date: '2024-01-15T13:20:00Z',
      dueDate: '2024-02-14T13:20:00Z',
      amount: 399,
      currency: 'USD',
      status: 'paid',
      paymentMethod: {
        type: 'credit_card',
        brand: 'Visa',
        last4: '9999'
      },
      paidAt: '2024-01-15T13:25:00Z',
      items: [
        { description: 'Data Analytics Pro - January 2024', quantity: 1, unitPrice: 399, amount: 399 }
      ],
      subtotal: 399,
      tax: 0,
      total: 399,
      billingAddress: {
        line1: '123 Main St',
        line2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      },
      companyInfo: {
        name: 'ACCUCOUNT Inc.',
        vatNumber: '123456789',
        registrationNumber: 'REG-12345'
      },
      pdf: '/invoices/inv-2024-007.pdf'
    },
    {
      id: 'INV-2024-008',
      invoiceNumber: 'ACC-2024-008',
      subscriptionName: 'Warehouse Management System',
      subscriptionId: 'SUB-008',
      date: '2024-01-01T00:00:00Z',
      dueDate: '2024-01-31T00:00:00Z',
      amount: 18000,
      currency: 'USD',
      status: 'paid',
      paymentMethod: {
        type: 'credit_card',
        brand: 'Visa',
        last4: '8888'
      },
      paidAt: '2024-01-01T00:05:00Z',
      items: [
        { description: 'WMS Enterprise - Annual 2024', quantity: 1, unitPrice: 18000, amount: 18000 }
      ],
      subtotal: 18000,
      tax: 0,
      total: 18000,
      billingAddress: {
        line1: '123 Main St',
        line2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      },
      companyInfo: {
        name: 'ACCUCOUNT Inc.',
        vatNumber: '123456789',
        registrationNumber: 'REG-12345'
      },
      pdf: '/invoices/inv-2024-008.pdf'
    },
    {
      id: 'INV-2023-001',
      invoiceNumber: 'ACC-2023-001',
      subscriptionName: 'ACCUCOUNT Enterprise Suite',
      subscriptionId: 'SUB-001',
      date: '2023-12-15T10:30:00Z',
      dueDate: '2024-01-14T10:30:00Z',
      amount: 24000,
      currency: 'USD',
      status: 'paid',
      paymentMethod: {
        type: 'credit_card',
        brand: 'Visa',
        last4: '4242'
      },
      paidAt: '2023-12-15T10:35:00Z',
      items: [
        { description: 'Enterprise Plan - Annual Renewal 2023', quantity: 1, unitPrice: 24000, amount: 24000 }
      ],
      subtotal: 24000,
      tax: 0,
      total: 24000,
      billingAddress: {
        line1: '123 Main St',
        line2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      },
      companyInfo: {
        name: 'ACCUCOUNT Inc.',
        vatNumber: '123456789',
        registrationNumber: 'REG-12345'
      },
      pdf: '/invoices/inv-2023-001.pdf'
    },
    {
      id: 'INV-2023-002',
      invoiceNumber: 'ACC-2023-002',
      subscriptionName: 'Premium Support Plan',
      subscriptionId: 'SUB-002',
      date: '2023-12-15T09:20:00Z',
      dueDate: '2024-01-14T09:20:00Z',
      amount: 999,
      currency: 'USD',
      status: 'paid',
      paymentMethod: {
        type: 'credit_card',
        brand: 'Mastercard',
        last4: '1234'
      },
      paidAt: '2023-12-15T09:25:00Z',
      items: [
        { description: 'Premium Support - December 2023', quantity: 1, unitPrice: 999, amount: 999 }
      ],
      subtotal: 999,
      tax: 0,
      total: 999,
      billingAddress: {
        line1: '123 Main St',
        line2: 'Suite 100',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      },
      companyInfo: {
        name: 'ACCUCOUNT Inc.',
        vatNumber: '123456789',
        registrationNumber: 'REG-12345'
      },
      pdf: '/invoices/inv-2023-002.pdf'
    }
  ];

  // Years for filter
  const years = [
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' }
  ];

  // Status configuration
  const statusConfig = {
    paid: { label: 'Paid', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    overdue: { label: 'Overdue', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
    cancelled: { label: 'Cancelled', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: XCircle },
    refunded: { label: 'Refunded', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: RotateCcw }
  };

  // Payment method types
  const paymentMethods = [
    { id: 'all', name: 'All Methods' },
    { id: 'credit_card', name: 'Credit Card' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'bank_transfer', name: 'Bank Transfer' },
    { id: 'invoice', name: 'Invoice' }
  ];

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Receipt;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getPaymentMethodIcon = (method) => {
    switch(method) {
      case 'credit_card':
        return <CreditCard size={14} className="text-black/40" />;
      case 'paypal':
        return <DollarSign size={14} className="text-black/40" />;
      case 'bank_transfer':
        return <Building2 size={14} className="text-black/40" />;
      case 'invoice':
        return <Receipt size={14} className="text-black/40" />;
      default:
        return <CreditCard size={14} className="text-black/40" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  const filteredInvoices = billingHistory.filter(invoice => {
    const invoiceYear = new Date(invoice.date).getFullYear().toString();
    if (selectedYear !== 'all' && invoiceYear !== selectedYear) return false;
    if (selectedStatus !== 'all' && invoice.status !== selectedStatus) return false;
    if (selectedPaymentMethod !== 'all' && invoice.paymentMethod.type !== selectedPaymentMethod) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return invoice.invoiceNumber.toLowerCase().includes(query) ||
             invoice.subscriptionName.toLowerCase().includes(query) ||
             invoice.id.toLowerCase().includes(query);
    }
    if (dateRange.from && dateRange.to) {
      const invoiceDate = new Date(invoice.date);
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      if (invoiceDate < fromDate || invoiceDate > toDate) return false;
    }
    return true;
  });

  const stats = {
    totalInvoices: billingHistory.length,
    totalSpent: billingHistory.reduce((sum, inv) => sum + inv.amount, 0),
    paidInvoices: billingHistory.filter(i => i.status === 'paid').length,
    pendingInvoices: billingHistory.filter(i => i.status === 'pending').length,
    averageInvoice: billingHistory.reduce((sum, inv) => sum + inv.amount, 0) / billingHistory.length
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(i => i.id));
    }
  };

  const handleSelectInvoice = (id) => {
    if (selectedInvoices.includes(id)) {
      setSelectedInvoices(selectedInvoices.filter(i => i !== id));
    } else {
      setSelectedInvoices([...selectedInvoices, id]);
    }
  };

  // Monthly spending chart data (simplified)
  const monthlySpending = [
    { month: 'Jan', amount: 24398 },
    { month: 'Feb', amount: 6698 },
    { month: 'Mar', amount: 25298 },
    { month: 'Apr', amount: 0 },
    { month: 'May', amount: 0 },
    { month: 'Jun', amount: 0 },
    { month: 'Jul', amount: 0 },
    { month: 'Aug', amount: 0 },
    { month: 'Sep', amount: 0 },
    { month: 'Oct', amount: 0 },
    { month: 'Nov', amount: 0 },
    { month: 'Dec', amount: 24999 }
  ];

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
          
            <h1 className="text-2xl font-bold text-black">Billing History</h1>
            <p className="text-black/50 mt-1">View and manage your past invoices and payments</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px] border-[#F5EEE9]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year.id} value={year.id}>{year.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#F5EEE9]">
                  <Download size={16} />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileJson className="mr-2 h-4 w-4 text-blue-600" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <File className="mr-2 h-4 w-4 text-red-600" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setExportDialogOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Export Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => window.print()}
            >
              <Printer size={16} />
              Print
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Invoices</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalInvoices}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Receipt size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Spent</p>
                  <p className="text-xl font-bold text-black mt-1">{formatCurrency(stats.totalSpent, 'USD')}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <DollarSign size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Paid Invoices</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.paidInvoices}</p>
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
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.pendingInvoices}</p>
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
                  <p className="text-xs text-black/50">Average Invoice</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{formatCurrency(stats.averageInvoice, 'USD')}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <ReceiptText size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Spending Overview */}
      <Card className="border-[#F5EEE9] mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-black flex items-center gap-2">
            <TrendingUp size={16} className="text-red-600" />
            Monthly Spending - 2024
          </CardTitle>
          <CardDescription className="text-xs text-black/50">
            Your spending pattern over the current year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-24 flex items-end gap-1">
            {monthlySpending.map((month, idx) => {
              const maxAmount = Math.max(...monthlySpending.map(m => m.amount));
              const height = month.amount > 0 ? (month.amount / maxAmount) * 100 : 0;
              
              return (
                <TooltipProvider key={idx}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className="w-full bg-red-600 rounded-t transition-all hover:bg-red-700"
                          style={{ height: `${height}%`, maxHeight: '60px', minHeight: month.amount > 0 ? '4px' : '0' }}
                        />
                        <span className="text-[8px] text-black/50">{month.month}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{month.month}: {formatCurrency(month.amount, 'USD')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
            <Input
              placeholder="Search by invoice number or subscription..."
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
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map(method => (
                <SelectItem key={method.id} value={method.id}>{method.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 border-[#F5EEE9]">
                <Calendar size={16} />
                {dateRange.from ? (
                  dateRange.to ? (
                    `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
                  ) : (
                    formatDate(dateRange.from)
                  )
                ) : (
                  'Date Range'
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3">
                <div className="space-y-2">
                  <Label>From</Label>
                  <Input type="date" onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />
                  <Label>To</Label>
                  <Input type="date" onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />
                  <Button 
                    size="sm" 
                    className="w-full mt-2 bg-red-600 hover:bg-red-700"
                    onClick={() => setDateRange({ from: null, to: null })}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

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
      {selectedInvoices.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedInvoices.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedInvoices([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <Download size={14} className="mr-2" />
              Download PDFs
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Printer size={14} className="mr-2" />
              Print
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Mail size={14} className="mr-2" />
              Email
            </Button>
          </div>
        </div>
      )}

      {/* Invoices Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredInvoices.map((invoice) => {
            const StatusIcon = statusConfig[invoice.status]?.icon || Receipt;
            
            return (
              <ContextMenu key={invoice.id}>
                <ContextMenuTrigger>
                  <Card 
                    className="border-[#F5EEE9] hover:shadow-lg transition-all group cursor-pointer"
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setViewInvoiceDialogOpen(true);
                    }}
                  >
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-600 text-white rounded-lg">
                              <Receipt size={18} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                                  {invoice.invoiceNumber}
                                </Badge>
                                <Badge className={statusConfig[invoice.status]?.color}>
                                  <StatusIcon size={10} className="mr-1" />
                                  {statusConfig[invoice.status]?.label}
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-black line-clamp-1">{invoice.subscriptionName}</h3>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical size={14} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedInvoice(invoice);
                                setViewInvoiceDialogOpen(true);
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                Print
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="space-y-3">
                          {/* Amount */}
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-black">
                              {formatCurrency(invoice.amount, invoice.currency)}
                            </p>
                          </div>

                          {/* Dates */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <Calendar size={12} className="text-black/40" />
                              <span className="text-black/70">Issued: {formatDate(invoice.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Clock size={12} className="text-black/40" />
                              <span className="text-black/70">Due: {formatDate(invoice.dueDate)}</span>
                            </div>
                          </div>

                          {/* Payment Method */}
                          <div className="flex items-center gap-2 text-xs border-t border-[#F5EEE9] pt-2">
                            {getPaymentMethodIcon(invoice.paymentMethod.type)}
                            <span className="text-black/70 capitalize">
                              {invoice.paymentMethod.type === 'credit_card' && 
                                `${invoice.paymentMethod.brand} •••• ${invoice.paymentMethod.last4}`}
                              {invoice.paymentMethod.type === 'paypal' && 
                                `PayPal • ${invoice.paymentMethod.email}`}
                              {invoice.paymentMethod.type === 'bank_transfer' && 
                                `Bank Transfer • Ref: ${invoice.paymentMethod.reference}`}
                              {invoice.paymentMethod.type === 'invoice' && 
                                `Invoice • Terms: ${invoice.paymentMethod.terms}`}
                            </span>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between text-[10px] text-black/50 pt-2 border-t border-[#F5EEE9]">
                            <div className="flex items-center gap-1">
                              <ReceiptText size={10} />
                              <span>{invoice.subscriptionId}</span>
                            </div>
                            {invoice.paidAt && (
                              <span>Paid {formatDate(invoice.paidAt)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem onClick={() => {
                    setSelectedInvoice(invoice);
                    setViewInvoiceDialogOpen(true);
                  }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Invoice
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
          {filteredInvoices.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <Receipt size={48} className="mx-auto mb-4 text-black/20" />
              <h3 className="text-lg font-medium text-black/50">No invoices found</h3>
              <p className="text-sm text-black/30 mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      ) : (
        // List View
        <Card className="border-[#F5EEE9]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                  <TableHead className="w-8">
                    <Checkbox 
                      checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Invoice</TableHead>
                  <TableHead className="text-black/50">Date</TableHead>
                  <TableHead className="text-black/50">Due Date</TableHead>
                  <TableHead className="text-black/50">Amount</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Payment Method</TableHead>
                  <TableHead className="text-black/50">Subscription</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const StatusIcon = statusConfig[invoice.status]?.icon || Receipt;
                  
                  return (
                    <TableRow 
                      key={invoice.id} 
                      className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30 cursor-pointer"
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setViewInvoiceDialogOpen(true);
                      }}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedInvoices.includes(invoice.id)}
                          onCheckedChange={() => handleSelectInvoice(invoice.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-red-100 rounded">
                            <Receipt size={14} className="text-red-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{invoice.invoiceNumber}</div>
                            <div className="text-xs text-black/50">{invoice.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-black/30" />
                          <span className="text-xs">{formatDate(invoice.date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-black/30" />
                          <span className="text-xs">{formatDate(invoice.dueDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(invoice.amount, invoice.currency)}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[invoice.status]?.color}>
                          <StatusIcon size={10} className="mr-1" />
                          {statusConfig[invoice.status]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getPaymentMethodIcon(invoice.paymentMethod.type)}
                          <span className="text-xs capitalize">
                            {invoice.paymentMethod.type === 'credit_card' ? 
                              `${invoice.paymentMethod.brand} •••• ${invoice.paymentMethod.last4}` : 
                              invoice.paymentMethod.type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">{invoice.subscriptionName}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedInvoice(invoice);
                              setViewInvoiceDialogOpen(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredInvoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-black/50">
                      No invoices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-[#F5EEE9] p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-black/50">
                Showing {filteredInvoices.length} of {billingHistory.length} invoices
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

      {/* View Invoice Dialog */}
      <Dialog open={viewInvoiceDialogOpen} onOpenChange={setViewInvoiceDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedInvoice && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Receipt size={20} className="text-red-600" />
                  </div>
                  <div>
                    <span>Invoice {selectedInvoice.invoiceNumber}</span>
                    <DialogDescription className="text-sm">
                      {selectedInvoice.subscriptionName} • {selectedInvoice.id}
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Invoice Status */}
                <div className="flex items-center justify-between">
                  <Badge className={statusConfig[selectedInvoice.status]?.color}>
                    {statusConfig[selectedInvoice.status]?.label}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download size={14} className="mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer size={14} className="mr-2" />
                      Print
                    </Button>
                  </div>
                </div>

                {/* Company Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-black/50">From</p>
                    <p className="text-sm font-medium">{selectedInvoice.companyInfo.name}</p>
                    <p className="text-xs text-black/50">VAT: {selectedInvoice.companyInfo.vatNumber}</p>
                    <p className="text-xs text-black/50">Reg: {selectedInvoice.companyInfo.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-black/50">Bill To</p>
                    <p className="text-sm">{selectedInvoice.billingAddress.line1}</p>
                    {selectedInvoice.billingAddress.line2 && (
                      <p className="text-sm">{selectedInvoice.billingAddress.line2}</p>
                    )}
                    <p className="text-sm">
                      {selectedInvoice.billingAddress.city}, {selectedInvoice.billingAddress.state} {selectedInvoice.billingAddress.postalCode}
                    </p>
                    <p className="text-sm">{selectedInvoice.billingAddress.country}</p>
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-black/50">Invoice Number</p>
                    <p className="text-sm font-medium">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-black/50">Invoice Date</p>
                    <p className="text-sm">{formatDate(selectedInvoice.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-black/50">Due Date</p>
                    <p className="text-sm">{formatDate(selectedInvoice.dueDate)}</p>
                  </div>
                </div>

                {/* Payment Info */}
                {selectedInvoice.paidAt && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Payment Date</p>
                      <p className="text-sm">{formatDateTime(selectedInvoice.paidAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Payment Method</p>
                      <div className="flex items-center gap-1">
                        {getPaymentMethodIcon(selectedInvoice.paymentMethod.type)}
                        <span className="text-sm capitalize">
                          {selectedInvoice.paymentMethod.type === 'credit_card' && 
                            `${selectedInvoice.paymentMethod.brand} •••• ${selectedInvoice.paymentMethod.last4}`}
                          {selectedInvoice.paymentMethod.type === 'paypal' && 
                            `PayPal • ${selectedInvoice.paymentMethod.email}`}
                          {selectedInvoice.paymentMethod.type === 'bank_transfer' && 
                            `Bank Transfer • Ref: ${selectedInvoice.paymentMethod.reference}`}
                          {selectedInvoice.paymentMethod.type === 'invoice' && 
                            `Invoice • Terms: ${selectedInvoice.paymentMethod.terms}`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Invoice Items */}
                <div>
                  <p className="text-sm font-medium mb-2">Invoice Items</p>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                        <TableHead className="text-black/50">Description</TableHead>
                        <TableHead className="text-black/50 text-right">Quantity</TableHead>
                        <TableHead className="text-black/50 text-right">Unit Price</TableHead>
                        <TableHead className="text-black/50 text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item, idx) => (
                        <TableRow key={idx} className="border-[#F5EEE9]">
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.unitPrice, selectedInvoice.currency)}</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(item.amount, selectedInvoice.currency)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Summary */}
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/50">Subtotal</span>
                      <span className="text-sm">{formatCurrency(selectedInvoice.subtotal, selectedInvoice.currency)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/50">Tax</span>
                      <span className="text-sm">{formatCurrency(selectedInvoice.tax, selectedInvoice.currency)}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold">Total</span>
                      <span className="text-base font-bold">{formatCurrency(selectedInvoice.total, selectedInvoice.currency)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setViewInvoiceDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Export Billing History</DialogTitle>
            <DialogDescription>
              Choose export format and options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Export Format</Label>
              <RadioGroup defaultValue="excel">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel" className="flex items-center gap-2">
                    <FileSpreadsheet size={16} className="text-green-600" />
                    Excel (.xlsx)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="json" id="json" />
                  <Label htmlFor="json" className="flex items-center gap-2">
                    <FileJson size={16} className="text-blue-600" />
                    JSON (.json)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="flex items-center gap-2">
                    <File size={16} className="text-gray-600" />
                    CSV (.csv)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="this-year">This year</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                  <SelectItem value="last-90">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Include</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-items" defaultChecked />
                  <Label htmlFor="include-items">Line items</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-payment" defaultChecked />
                  <Label htmlFor="include-payment">Payment details</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-address" defaultChecked />
                  <Label htmlFor="include-address">Billing address</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Billing Settings</DialogTitle>
            <DialogDescription>
              Configure billing and invoice preferences
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="notifications">
                <AccordionTrigger>Notifications</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label>Invoice available</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Payment confirmation</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Upcoming due date</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Reminder days before</Label>
                    <Select defaultValue="7">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="format">
                <AccordionTrigger>Invoice Format</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="USD">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date format</Label>
                    <Select defaultValue="MMM DD, YYYY">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MMM DD, YYYY">Jan 15, 2024</SelectItem>
                        <SelectItem value="DD/MM/YYYY">15/01/2024</SelectItem>
                        <SelectItem value="YYYY-MM-DD">2024-01-15</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tax">
                <AccordionTrigger>Tax Settings</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label>Show tax on invoices</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Tax rate (%)</Label>
                    <Input type="number" defaultValue="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tax ID/VAT number</Label>
                    <Input placeholder="Enter your tax ID" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Save Settings
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
                onClick={() => setExportDialogOpen(true)}
              >
                <Download size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Export</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => window.print()}
              >
                <Printer size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Print</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setSettingsDialogOpen(true)}
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

export default MyBillingHistoryPage;