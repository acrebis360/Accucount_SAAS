// app/dashboard/vendors/page.js
'use client';

import { useState } from 'react';
import { 
  Building,
  Package,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
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

  History,
  BarChart3,
  Mail,
  Phone,
  Star,
  MapPin,
  Globe,
  DollarSign,

  Truck,
  ShoppingCart,
  Factory,
  Plus,
  Cpu,
  Armchair,
  Shirt,
  Apple,
  Pill,
  Folder,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const VendorsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showContractDialog, setShowContractDialog] = useState(false);
  const [showPurchaseOrderDialog, setShowPurchaseOrderDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState([]);

  // Sample vendors data
  const vendors = [
    {
      id: 'VEN-001',
      vendorId: 'VEN-001',
      name: 'Tech Supplies Inc',
      legalName: 'Tech Supplies Corporation',
      type: 'manufacturer',
      category: 'electronics',
      status: 'active',
      rating: 4.8,
      tier: 'preferred',
      since: '2019-05-15',
      website: 'www.techsupplies.com',
      email: 'sales@techsupplies.com',
      phone: '+1 (555) 123-4567',
      fax: '+1 (555) 123-4568',
      address: '123 Industrial Blvd, Atlanta, GA 30301',
      city: 'Atlanta',
      state: 'GA',
      zip: '30301',
      country: 'USA',
      paymentTerms: 'Net 30',
      creditLimit: 50000,
      currency: 'USD',
      taxId: '12-3456789',
      duns: '12-345-6789',
      contacts: [
        { id: 1, name: 'John Smith', title: 'Sales Manager', email: 'john@techsupplies.com', phone: '+1 (555) 123-4567', primary: true },
        { id: 2, name: 'Jane Doe', title: 'Customer Service', email: 'jane@techsupplies.com', phone: '+1 (555) 123-4568', primary: false },
      ],
      products: ['Electronics', 'Components', 'Accessories'],
      purchaseOrders: 156,
      totalSpent: 1250000,
      averageOrder: 8012,
      onTimeDelivery: 98,
      qualityRating: 99,
      responseTime: 2.5,
      lastOrder: '2024-03-10',
      nextDelivery: '2024-03-18',
      certifications: ['ISO 9001', 'RoHS'],
      notes: 'Preferred vendor for electronic components',
      tags: ['electronics', 'preferred', 'reliable'],
      history: [
        { date: '2024-03-10', action: 'Order Placed', details: 'PO-2024-001' },
        { date: '2024-02-15', action: 'Payment Sent', details: 'Invoice INV-001' },
      ],
    },
    {
      id: 'VEN-002',
      vendorId: 'VEN-002',
      name: 'Office Furniture Co',
      legalName: 'Office Furniture Manufacturing Inc',
      type: 'manufacturer',
      category: 'furniture',
      status: 'active',
      rating: 4.5,
      tier: 'standard',
      since: '2020-02-10',
      website: 'www.officefurnitureco.com',
      email: 'orders@officefurnitureco.com',
      phone: '+1 (555) 234-5678',
      fax: '+1 (555) 234-5679',
      address: '456 Corporate Dr, Dallas, TX 75201',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      country: 'USA',
      paymentTerms: 'Net 45',
      creditLimit: 75000,
      currency: 'USD',
      taxId: '23-4567890',
      duns: '23-456-7890',
      contacts: [
        { id: 1, name: 'Mike Johnson', title: 'Account Executive', email: 'mike@officefurnitureco.com', phone: '+1 (555) 234-5678', primary: true },
      ],
      products: ['Chairs', 'Desks', 'Cabinets', 'Office Accessories'],
      purchaseOrders: 89,
      totalSpent: 850000,
      averageOrder: 9550,
      onTimeDelivery: 95,
      qualityRating: 96,
      responseTime: 4.0,
      lastOrder: '2024-03-05',
      nextDelivery: '2024-03-20',
      certifications: ['ISO 14001', 'GREENGUARD'],
      notes: 'Good quality furniture, occasional delays',
      tags: ['furniture', 'office', 'reliable'],
      history: [
        { date: '2024-03-05', action: 'Order Placed', details: 'PO-2024-015' },
        { date: '2024-02-28', action: 'Payment Sent', details: 'Invoice INV-015' },
      ],
    },
    {
      id: 'VEN-003',
      vendorId: 'VEN-003',
      name: 'Fashion Textiles Inc',
      legalName: 'Fashion Textiles International',
      type: 'distributor',
      category: 'apparel',
      status: 'active',
      rating: 4.2,
      tier: 'standard',
      since: '2021-03-20',
      website: 'www.fashiontextiles.com',
      email: 'sales@fashiontextiles.com',
      phone: '+1 (555) 345-6789',
      fax: '+1 (555) 345-6780',
      address: '789 Fashion Ave, New York, NY 10001',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
      paymentTerms: 'Net 30',
      creditLimit: 30000,
      currency: 'USD',
      taxId: '34-5678901',
      duns: '34-567-8901',
      contacts: [
        { id: 1, name: 'Sarah Wilson', title: 'Sales Director', email: 'sarah@fashiontextiles.com', phone: '+1 (555) 345-6789', primary: true },
        { id: 2, name: 'Tom Brown', title: 'Customer Service', email: 'tom@fashiontextiles.com', phone: '+1 (555) 345-6790', primary: false },
      ],
      products: ['Fabrics', 'Clothing', 'Accessories'],
      purchaseOrders: 67,
      totalSpent: 450000,
      averageOrder: 6716,
      onTimeDelivery: 92,
      qualityRating: 90,
      responseTime: 6.5,
      lastOrder: '2024-03-01',
      nextDelivery: '2024-03-22',
      certifications: ['OEKO-TEX'],
      notes: 'Good selection, average quality control',
      tags: ['textiles', 'apparel', 'average'],
      history: [
        { date: '2024-03-01', action: 'Order Placed', details: 'PO-2024-028' },
      ],
    },
    {
      id: 'VEN-004',
      vendorId: 'VEN-004',
      name: 'Organic Food Co',
      legalName: 'Organic Food Distributors LLC',
      type: 'distributor',
      category: 'food',
      status: 'active',
      rating: 4.9,
      tier: 'preferred',
      since: '2018-07-12',
      website: 'www.organicfoodco.com',
      email: 'orders@organicfoodco.com',
      phone: '+1 (555) 456-7890',
      fax: '+1 (555) 456-7891',
      address: '101 Farm Rd, Portland, OR 97201',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
      country: 'USA',
      paymentTerms: 'Net 15',
      creditLimit: 25000,
      currency: 'USD',
      taxId: '45-6789012',
      duns: '45-678-9012',
      contacts: [
        { id: 1, name: 'Emma Watson', title: 'Account Manager', email: 'emma@organicfoodco.com', phone: '+1 (555) 456-7890', primary: true },
      ],
      products: ['Organic Produce', 'Dairy', 'Meat', 'Pantry Items'],
      purchaseOrders: 234,
      totalSpent: 980000,
      averageOrder: 4188,
      onTimeDelivery: 99,
      qualityRating: 99,
      responseTime: 1.5,
      lastOrder: '2024-03-12',
      nextDelivery: '2024-03-15',
      certifications: ['USDA Organic', 'Non-GMO', 'Fair Trade'],
      notes: 'Excellent quality, always on time',
      tags: ['food', 'organic', 'preferred'],
      history: [
        { date: '2024-03-12', action: 'Order Placed', details: 'PO-2024-045' },
        { date: '2024-03-10', action: 'Payment Sent', details: 'Invoice INV-032' },
      ],
    },
    {
      id: 'VEN-005',
      vendorId: 'VEN-005',
      name: 'Industrial Supplies Co',
      legalName: 'Industrial Supplies Corporation',
      type: 'manufacturer',
      category: 'industrial',
      status: 'active',
      rating: 4.0,
      tier: 'standard',
      since: '2020-11-05',
      website: 'www.industrialsupplies.com',
      email: 'sales@industrialsupplies.com',
      phone: '+1 (555) 567-8901',
      fax: '+1 (555) 567-8902',
      address: '222 Factory Blvd, Chicago, IL 60601',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA',
      paymentTerms: 'Net 60',
      creditLimit: 100000,
      currency: 'USD',
      taxId: '56-7890123',
      duns: '56-789-0123',
      contacts: [
        { id: 1, name: 'David Lee', title: 'Industrial Sales', email: 'david@industrialsupplies.com', phone: '+1 (555) 567-8901', primary: true },
        { id: 2, name: 'Lisa Chen', title: 'Customer Support', email: 'lisa@industrialsupplies.com', phone: '+1 (555) 567-8903', primary: false },
      ],
      products: ['Tools', 'Machinery', 'Safety Equipment', 'Maintenance Supplies'],
      purchaseOrders: 45,
      totalSpent: 620000,
      averageOrder: 13777,
      onTimeDelivery: 88,
      qualityRating: 85,
      responseTime: 8.0,
      lastOrder: '2024-02-28',
      nextDelivery: '2024-03-25',
      certifications: ['ISO 9001'],
      notes: 'Good for heavy equipment, slow response',
      tags: ['industrial', 'tools', 'slow'],
      history: [
        { date: '2024-02-28', action: 'Order Placed', details: 'PO-2024-052' },
      ],
    },
    {
      id: 'VEN-006',
      vendorId: 'VEN-006',
      name: 'Medical Supplies Inc',
      legalName: 'Medical Supplies & Equipment Co',
      type: 'distributor',
      category: 'medical',
      status: 'active',
      rating: 4.7,
      tier: 'preferred',
      since: '2019-09-18',
      website: 'www.medicalsuppliesinc.com',
      email: 'orders@medicalsuppliesinc.com',
      phone: '+1 (555) 678-9012',
      fax: '+1 (555) 678-9013',
      address: '333 Health Pkwy, Boston, MA 02101',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
      country: 'USA',
      paymentTerms: 'Net 30',
      creditLimit: 40000,
      currency: 'USD',
      taxId: '67-8901234',
      duns: '67-890-1234',
      contacts: [
        { id: 1, name: 'Richard Harris', title: 'Medical Sales', email: 'richard@medicalsuppliesinc.com', phone: '+1 (555) 678-9012', primary: true },
      ],
      products: ['Medical Supplies', 'PPE', 'Equipment', 'Pharmaceuticals'],
      purchaseOrders: 178,
      totalSpent: 890000,
      averageOrder: 5000,
      onTimeDelivery: 97,
      qualityRating: 98,
      responseTime: 2.0,
      lastOrder: '2024-03-08',
      nextDelivery: '2024-03-19',
      certifications: ['FDA', 'ISO 13485'],
      notes: 'Reliable medical supplier',
      tags: ['medical', 'ppe', 'reliable'],
      history: [
        { date: '2024-03-08', action: 'Order Placed', details: 'PO-2024-067' },
        { date: '2024-03-05', action: 'Payment Sent', details: 'Invoice INV-048' },
      ],
    },
    {
      id: 'VEN-007',
      vendorId: 'VEN-007',
      name: 'Office Supplies Co',
      legalName: 'Office Supplies Direct',
      type: 'distributor',
      category: 'office',
      status: 'inactive',
      rating: 3.5,
      tier: 'standard',
      since: '2021-12-01',
      website: 'www.officesuppliesco.com',
      email: 'sales@officesuppliesco.com',
      phone: '+1 (555) 789-0123',
      fax: '+1 (555) 789-0124',
      address: '444 Business Ave, Denver, CO 80201',
      city: 'Denver',
      state: 'CO',
      zip: '80201',
      country: 'USA',
      paymentTerms: 'Net 30',
      creditLimit: 15000,
      currency: 'USD',
      taxId: '78-9012345',
      duns: '78-901-2345',
      contacts: [
        { id: 1, name: 'Anna Taylor', title: 'Office Manager', email: 'anna@officesuppliesco.com', phone: '+1 (555) 789-0123', primary: true },
      ],
      products: ['Paper', 'Pens', 'Folders', 'Office Supplies'],
      purchaseOrders: 23,
      totalSpent: 45000,
      averageOrder: 1956,
      onTimeDelivery: 75,
      qualityRating: 80,
      responseTime: 12.0,
      lastOrder: '2024-01-15',
      nextDelivery: null,
      certifications: [],
      notes: 'Inconsistent delivery, under review',
      tags: ['office', 'inactive', 'review'],
      history: [
        { date: '2024-01-15', action: 'Order Placed', details: 'PO-2024-008' },
        { date: '2024-01-10', action: 'Payment Sent', details: 'Invoice INV-012' },
      ],
    },
    {
      id: 'VEN-008',
      vendorId: 'VEN-008',
      name: 'ChemCorp Industries',
      legalName: 'Chemical Corporation International',
      type: 'manufacturer',
      category: 'chemical',
      status: 'active',
      rating: 4.6,
      tier: 'preferred',
      since: '2018-04-22',
      website: 'www.chemcorp.com',
      email: 'sales@chemcorp.com',
      phone: '+1 (555) 890-1234',
      fax: '+1 (555) 890-1235',
      address: '555 Chemical Ln, Houston, TX 77001',
      city: 'Houston',
      state: 'TX',
      zip: '77001',
      country: 'USA',
      paymentTerms: 'Net 45',
      creditLimit: 120000,
      currency: 'USD',
      taxId: '89-0123456',
      duns: '89-012-3456',
      contacts: [
        { id: 1, name: 'Chris Evans', title: 'Chemical Sales', email: 'chris@chemcorp.com', phone: '+1 (555) 890-1234', primary: true },
        { id: 2, name: 'Scarlett Johansson', title: 'Safety Compliance', email: 'scarlett@chemcorp.com', phone: '+1 (555) 890-1236', primary: false },
      ],
      products: ['Industrial Chemicals', 'Solvents', 'Lubricants', 'Cleaning Agents'],
      purchaseOrders: 92,
      totalSpent: 1450000,
      averageOrder: 15760,
      onTimeDelivery: 96,
      qualityRating: 97,
      responseTime: 3.0,
      lastOrder: '2024-03-07',
      nextDelivery: '2024-03-21',
      certifications: ['ISO 9001', 'ISO 14001', 'OSHA Compliant'],
      notes: 'Excellent chemical supplier, good safety record',
      tags: ['chemical', 'industrial', 'preferred'],
      history: [
        { date: '2024-03-07', action: 'Order Placed', details: 'PO-2024-078' },
        { date: '2024-03-02', action: 'Payment Sent', details: 'Invoice INV-056' },
      ],
    },
    {
      id: 'VEN-009',
      vendorId: 'VEN-009',
      name: 'Packaging Solutions Inc',
      legalName: 'Packaging Solutions Corporation',
      type: 'manufacturer',
      category: 'packaging',
      status: 'active',
      rating: 4.4,
      tier: 'standard',
      since: '2020-08-14',
      website: 'www.packagingsolutions.com',
      email: 'orders@packagingsolutions.com',
      phone: '+1 (555) 901-2345',
      fax: '+1 (555) 901-2346',
      address: '666 Box Way, St Louis, MO 63101',
      city: 'St Louis',
      state: 'MO',
      zip: '63101',
      country: 'USA',
      paymentTerms: 'Net 30',
      creditLimit: 35000,
      currency: 'USD',
      taxId: '90-1234567',
      duns: '90-123-4567',
      contacts: [
        { id: 1, name: 'Tom Holland', title: 'Packaging Specialist', email: 'tom@packagingsolutions.com', phone: '+1 (555) 901-2345', primary: true },
      ],
      products: ['Boxes', 'Tape', 'Labels', 'Bubble Wrap', 'Pallets'],
      purchaseOrders: 134,
      totalSpent: 320000,
      averageOrder: 2388,
      onTimeDelivery: 94,
      qualityRating: 92,
      responseTime: 4.5,
      lastOrder: '2024-03-09',
      nextDelivery: '2024-03-16',
      certifications: ['FSC Certified'],
      notes: 'Good packaging supplier, reasonable prices',
      tags: ['packaging', 'boxes', 'reliable'],
      history: [
        { date: '2024-03-09', action: 'Order Placed', details: 'PO-2024-082' },
      ],
    },
    {
      id: 'VEN-010',
      vendorId: 'VEN-010',
      name: 'Logistics Partners LLC',
      legalName: 'Logistics Partners International',
      type: 'service',
      category: 'logistics',
      status: 'active',
      rating: 4.3,
      tier: 'standard',
      since: '2021-06-30',
      website: 'www.logisticspartners.com',
      email: 'dispatch@logisticspartners.com',
      phone: '+1 (555) 012-3456',
      fax: '+1 (555) 012-3457',
      address: '777 Transport Blvd, Memphis, TN 38101',
      city: 'Memphis',
      state: 'TN',
      zip: '38101',
      country: 'USA',
      paymentTerms: 'Net 30',
      creditLimit: 25000,
      currency: 'USD',
      taxId: '01-2345678',
      duns: '01-234-5678',
      contacts: [
        { id: 1, name: 'Zendaya', title: 'Logistics Coordinator', email: 'zendaya@logisticspartners.com', phone: '+1 (555) 012-3456', primary: true },
      ],
      services: ['Freight', 'Warehousing', 'Distribution', 'Last Mile'],
      purchaseOrders: 67,
      totalSpent: 180000,
      averageOrder: 2686,
      onTimeDelivery: 91,
      qualityRating: 89,
      responseTime: 5.0,
      lastOrder: '2024-03-11',
      nextDelivery: '2024-03-14',
      certifications: ['FMCSA', 'DOT Compliant'],
      notes: 'Good logistics partner, reasonable rates',
      tags: ['logistics', 'shipping', 'freight'],
      history: [
        { date: '2024-03-11', action: 'Order Placed', details: 'PO-2024-089' },
      ],
    },
  ];

  // Vendor categories
  const categories = [
    { id: 'all', name: 'All Categories', count: vendors.length },
    { id: 'electronics', name: 'Electronics', count: vendors.filter(v => v.category === 'electronics').length },
    { id: 'furniture', name: 'Furniture', count: vendors.filter(v => v.category === 'furniture').length },
    { id: 'apparel', name: 'Apparel', count: vendors.filter(v => v.category === 'apparel').length },
    { id: 'food', name: 'Food', count: vendors.filter(v => v.category === 'food').length },
    { id: 'industrial', name: 'Industrial', count: vendors.filter(v => v.category === 'industrial').length },
    { id: 'medical', name: 'Medical', count: vendors.filter(v => v.category === 'medical').length },
    { id: 'office', name: 'Office', count: vendors.filter(v => v.category === 'office').length },
    { id: 'chemical', name: 'Chemical', count: vendors.filter(v => v.category === 'chemical').length },
    { id: 'packaging', name: 'Packaging', count: vendors.filter(v => v.category === 'packaging').length },
    { id: 'logistics', name: 'Logistics', count: vendors.filter(v => v.category === 'logistics').length },
  ];

  // Vendor types
  const vendorTypes = [
    { id: 'manufacturer', name: 'Manufacturer' },
    { id: 'distributor', name: 'Distributor' },
    { id: 'wholesaler', name: 'Wholesaler' },
    { id: 'service', name: 'Service Provider' },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: AlertCircle },
    suspended: { label: 'Suspended', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
  };

  const tierConfig = {
    preferred: { label: 'Preferred', color: 'bg-purple-100 text-purple-700' },
    standard: { label: 'Standard', color: 'bg-blue-100 text-blue-700' },
    bronze: { label: 'Bronze', color: 'bg-amber-100 text-amber-700' },
    silver: { label: 'Silver', color: 'bg-gray-100 text-gray-700' },
    gold: { label: 'Gold', color: 'bg-yellow-100 text-yellow-700' },
    platinum: { label: 'Platinum', color: 'bg-indigo-100 text-indigo-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getTierColor = (tier) => {
    return tierConfig[tier]?.color || 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'electronics': return <Cpu size={16} className="text-blue-600" />;
      case 'furniture': return <Armchair size={16} className="text-orange-600" />;
      case 'apparel': return <Shirt size={16} className="text-purple-600" />;
      case 'food': return <Apple size={16} className="text-green-600" />;
      case 'industrial': return <Factory size={16} className="text-gray-600" />;
      case 'medical': return <Pill size={16} className="text-red-600" />;
      case 'office': return <Folder size={16} className="text-yellow-600" />;
      case 'chemical': return <FlaskConical size={16} className="text-cyan-600" />;
      case 'packaging': return <Package size={16} className="text-pink-600" />;
      case 'logistics': return <Truck size={16} className="text-indigo-600" />;
      default: return <Building size={16} className="text-gray-600" />;
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus;
    const matchesRating = selectedRating === 'all' || 
      (selectedRating === 'high' && vendor.rating >= 4.5) ||
      (selectedRating === 'medium' && vendor.rating >= 3.5 && vendor.rating < 4.5) ||
      (selectedRating === 'low' && vendor.rating < 3.5);
    const matchesLocation = selectedLocation === 'all' || vendor.state === selectedLocation;
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.vendorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesRating && matchesLocation && matchesSearch;
  });

  const stats = {
    total: vendors.length,
    active: vendors.filter(v => v.status === 'active').length,
    inactive: vendors.filter(v => v.status === 'inactive').length,
    preferred: vendors.filter(v => v.tier === 'preferred').length,
    totalSpent: vendors.reduce((sum, v) => sum + v.totalSpent, 0),
    avgRating: (vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1),
  };

  const handleSelectAll = () => {
    if (selectedVendors.length === filteredVendors.length) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(filteredVendors.map(v => v.id));
    }
  };

  const handleSelectVendor = (id) => {
    if (selectedVendors.includes(id)) {
      setSelectedVendors(selectedVendors.filter(v => v !== id));
    } else {
      setSelectedVendors([...selectedVendors, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Vendors</h1>
            <p className="text-black/50 mt-1">Manage suppliers, manufacturers, and service providers</p>
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
              Add Vendor
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6 rounded-md">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Vendors</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Building size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Inactive</p>
                  <p className="text-xl font-bold text-gray-600 mt-1">{stats.inactive}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-full">
                  <AlertCircle size={18} className="text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Preferred</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.preferred}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Star size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Spent</p>
                  <p className="text-xl font-bold text-green-600 mt-1">${(stats.totalSpent / 1000000).toFixed(1)}M</p>
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
                  <p className="text-xs text-black/50">Avg Rating</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.avgRating}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Star size={18} className="text-yellow-600" />
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
              placeholder="Search by name, ID, email, or tags..."
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

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="high">High (4.5+)</SelectItem>
              <SelectItem value="medium">Medium (3.5-4.4)</SelectItem>
              <SelectItem value="low">Low (below 3.5)</SelectItem>
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
      {selectedVendors.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedVendors.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedVendors([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <Mail size={14} className="mr-2" />
              Email
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <FileText size={14} className="mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-red-600">
              <Trash2 size={14} className="mr-2" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Vendors Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredVendors.map((vendor) => {
            const StatusIcon = statusConfig[vendor.status]?.icon || CheckCircle;
            
            return (
              <Card key={vendor.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(vendor.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {vendor.status}
                          </Badge>
                          <Badge className={cn("text-xs", getTierColor(vendor.tier))}>
                            {vendor.tier}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{vendor.name}</h3>
                        <p className="text-xs text-black/50 mt-1">{vendor.vendorId}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedVendor(vendor);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedVendor(vendor);
                            setShowContactDialog(true);
                          }}>
                            <Mail className="mr-2 h-4 w-4" />
                            Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedVendor(vendor);
                            setShowPurchaseOrderDialog(true);
                          }}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Create PO
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedVendor(vendor);
                            setShowRatingDialog(true);
                          }}>
                            <Star className="mr-2 h-4 w-4" />
                            Rate Vendor
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
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
                    {/* Category & Type */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9] flex items-center gap-1">
                        {getCategoryIcon(vendor.category)}
                        {vendor.category}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                        {vendor.type}
                      </Badge>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-1">
                        <Mail size={10} className="text-black/30" />
                        <span className="text-[10px] text-black/70 truncate">{vendor.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone size={10} className="text-black/30" />
                        <span className="text-[10px] text-black/70">{vendor.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={10} className="text-black/30" />
                        <span className="text-[10px] text-black/70 truncate">{vendor.city}, {vendor.state}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            className={cn(
                              star <= Math.floor(vendor.rating) ? 'text-yellow-600 fill-yellow-600' : 'text-gray-300'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium">{vendor.rating}</span>
                      <span className="text-[8px] text-black/50">({vendor.purchaseOrders} orders)</span>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[8px] text-black/50">On-Time</p>
                        <p className="text-xs font-bold text-green-600">{vendor.onTimeDelivery}%</p>
                      </div>
                      <div className="p-1 bg-[#F5EEE9]/30 rounded text-center">
                        <p className="text-[8px] text-black/50">Quality</p>
                        <p className="text-xs font-bold text-blue-600">{vendor.qualityRating}%</p>
                      </div>
                    </div>

                    {/* Payment Terms */}
                    <div className="flex items-center justify-between text-[10px] text-black/50 mb-2">
                      <span>Terms: {vendor.paymentTerms}</span>
                      <span>Credit: ${(vendor.creditLimit / 1000)}k</span>
                    </div>

                    {/* Products/Services */}
                    <div className="mb-2">
                      <p className="text-[8px] text-black/50 mb-1">Products</p>
                      <div className="flex flex-wrap gap-1">
                        {vendor?.products?.slice(0, 2).map((product) => (
                          <Badge key={product} variant="outline" className="text-[8px] border-[#F5EEE9]">
                            {product}
                          </Badge>
                        ))}
                        {vendor?.products?.length > 2 && (
                          <Badge variant="outline" className="text-[8px] border-[#F5EEE9]">
                            +{vendor?.products?.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {vendor.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                      <span>Since {vendor.since}</span>
                      <span>Last: {vendor.lastOrder}</span>
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
                      checked={selectedVendors.length === filteredVendors.length && filteredVendors.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Vendor</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Tier</TableHead>
                  <TableHead className="text-black/50">Rating</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50 text-right">Orders</TableHead>
                  <TableHead className="text-black/50 text-right">Spent</TableHead>
                  <TableHead className="text-black/50">On-Time</TableHead>
                  <TableHead className="text-black/50">Last Order</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedVendors.includes(vendor.id)}
                        onCheckedChange={() => handleSelectVendor(vendor.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{vendor.name}</p>
                        <p className="text-xs text-black/50">{vendor.vendorId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {vendor.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(vendor.status))}>
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getTierColor(vendor.tier))}>
                        {vendor.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium">{vendor.rating}</span>
                        <Star size={12} className="text-yellow-600 fill-yellow-600" />
                      </div>
                    </TableCell>
                    <TableCell>{vendor.state}</TableCell>
                    <TableCell className="text-right">{vendor.purchaseOrders}</TableCell>
                    <TableCell className="text-right">${(vendor.totalSpent / 1000).toFixed(0)}k</TableCell>
                    <TableCell>
                      <span className={cn(
                        "text-xs font-medium",
                        vendor.onTimeDelivery >= 95 ? 'text-green-600' : 
                        vendor.onTimeDelivery >= 90 ? 'text-yellow-600' : 'text-red-600'
                      )}>
                        {vendor.onTimeDelivery}%
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{vendor.lastOrder}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedVendor(vendor);
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
                Showing {filteredVendors.length} of {vendors.length} vendors
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

      {/* Create Vendor Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
            <DialogDescription>
              Add a new vendor to your supplier network
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vendor Name</Label>
                    <Input placeholder="e.g., Tech Supplies Inc" />
                  </div>
                  <div className="space-y-2">
                    <Label>Legal Name</Label>
                    <Input placeholder="Legal entity name" />
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
                        {vendorTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
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
                  <Label>Website</Label>
                  <Input placeholder="www.example.com" />
                </div>

                <div className="space-y-2">
                  <Label>Tax ID</Label>
                  <Input placeholder="12-3456789" />
                </div>

                <div className="space-y-2">
                  <Label>DUNS Number</Label>
                  <Input placeholder="12-345-6789" />
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="contact@vendor.com" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label>Fax</Label>
                    <Input placeholder="+1 (555) 123-4568" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input placeholder="Street address" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input placeholder="State" />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP</Label>
                    <Input placeholder="ZIP code" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input placeholder="USA" />
                </div>

                <div className="space-y-2">
                  <Label>Primary Contact</Label>
                  <Input placeholder="Contact name" />
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
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
                    <Label>Credit Limit ($)</Label>
                    <Input type="number" placeholder="50000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label>Since Date</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Products/Services</Label>
                  <Input placeholder="Comma separated list" />
                </div>

                <div className="space-y-2">
                  <Label>Certifications</Label>
                  <Input placeholder="e.g., ISO 9001, RoHS" />
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
              Add Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vendor Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Vendor Details</DialogTitle>
          </DialogHeader>

          {selectedVendor && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedVendor.name}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedVendor.vendorId} • {selectedVendor.legalName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cn("text-xs border-0", getStatusColor(selectedVendor.status))}>
                        {selectedVendor.status}
                      </Badge>
                      <Badge className={cn("text-xs", getTierColor(selectedVendor.tier))}>
                        {selectedVendor.tier}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Category</p>
                      <p className="text-sm font-medium capitalize">{selectedVendor.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Type</p>
                      <p className="text-sm font-medium capitalize">{selectedVendor.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Tax ID</p>
                      <p className="text-sm">{selectedVendor.taxId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">DUNS</p>
                      <p className="text-sm">{selectedVendor.duns}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-xs font-medium mb-2">Contact Information</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-gray-600" />
                        <span>{selectedVendor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-gray-600" />
                        <span>{selectedVendor.phone}</span>
                      </div>
                      {selectedVendor.fax && (
                        <div className="flex items-center gap-2 text-sm">
                          <PrinterIcon size={14} className="text-gray-600" />
                          <span>{selectedVendor.fax}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Globe size={14} className="text-gray-600" />
                        <a href={`http://${selectedVendor.website}`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          {selectedVendor.website}
                        </a>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin size={14} className="text-gray-600 mt-0.5" />
                        <span>{selectedVendor.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Payment Terms</p>
                      <p className="text-sm font-medium">{selectedVendor.paymentTerms}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Credit Limit</p>
                      <p className="text-sm font-medium">${selectedVendor.creditLimit.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Currency</p>
                      <p className="text-sm font-medium">{selectedVendor.currency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Since</p>
                      <p className="text-sm font-medium">{selectedVendor.since}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50 mb-1">Products/Services</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedVendor.products.map((product) => (
                        <Badge key={product} variant="outline" className="text-xs border-[#F5EEE9]">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50 mb-1">Certifications</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedVendor.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs border-[#F5EEE9]">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedVendor.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedVendor.notes}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50 mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedVendor.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contacts" className="space-y-4">
                  <div className="space-y-3">
                    {selectedVendor.contacts.map((contact) => (
                      <Card key={contact.id} className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-xs text-black/50">{contact.title}</p>
                            </div>
                            {contact.primary && (
                              <Badge className="bg-green-100 text-green-700 text-xs">Primary</Badge>
                            )}
                          </div>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail size={12} className="text-gray-600" />
                              <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline text-xs">
                                {contact.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone size={12} className="text-gray-600" />
                              <span className="text-xs">{contact.phone}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <ShoppingCart size={16} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedVendor.purchaseOrders}</p>
                        <p className="text-xs text-black/50">POs</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <DollarSign size={16} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">${(selectedVendor.totalSpent / 1000).toFixed(0)}k</p>
                        <p className="text-xs text-black/50">Total Spent</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Package size={16} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">${selectedVendor.averageOrder}</p>
                        <p className="text-xs text-black/50">Avg Order</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Performance Metrics</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-black/50">On-Time Delivery</span>
                            <span className={cn(
                              "text-xs font-medium",
                              selectedVendor.onTimeDelivery >= 95 ? 'text-green-600' : 
                              selectedVendor.onTimeDelivery >= 90 ? 'text-yellow-600' : 'text-red-600'
                            )}>
                              {selectedVendor.onTimeDelivery}%
                            </span>
                          </div>
                          <Progress value={selectedVendor.onTimeDelivery} className="h-2 bg-[#F5EEE9]" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-black/50">Quality Rating</span>
                            <span className={cn(
                              "text-xs font-medium",
                              selectedVendor.qualityRating >= 95 ? 'text-green-600' : 
                              selectedVendor.qualityRating >= 90 ? 'text-yellow-600' : 'text-red-600'
                            )}>
                              {selectedVendor.qualityRating}%
                            </span>
                          </div>
                          <Progress value={selectedVendor.qualityRating} className="h-2 bg-[#F5EEE9]" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-black/50">Response Time</span>
                            <span className="text-xs font-medium">{selectedVendor.responseTime} days</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-2">Recent Activity</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-black/50">Last Order</span>
                          <span className="font-medium">{selectedVendor.lastOrder}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-black/50">Next Delivery</span>
                          <span className="font-medium">{selectedVendor.nextDelivery || 'N/A'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedVendor.history.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          {item.action === 'Order Placed' && <ShoppingCart size={12} className="text-blue-600 mt-0.5" />}
                          {item.action === 'Payment Sent' && <DollarSign size={12} className="text-green-600 mt-0.5" />}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-black/70 mt-1">{item.details}</p>
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
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
              setShowDetailsDialog(false);
              setShowContactDialog(true);
            }}>
              <Mail className="mr-2 h-4 w-4" />
              Contact
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
                <Building size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Add Vendor</TooltipContent>
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

export default VendorsPage;