// app/dashboard/supplier-performance/page.js
'use client';

import { useState } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Award,
  Star,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Package,
  DollarSign,
  Truck,
  ShoppingCart,
  Building,
  Download,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  MoreVertical,
  Eye,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  History,
  BarChart3,

  Medal,
  Crown,
  ThumbsUp,
  ThumbsDown,
  BadgeIcon as BadgeIconCustom,
  Factory,
  Mail,
  Cpu,
  Armchair,
  Shirt,
  Apple,
  Pill,
  FlaskConical,

} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

const SupplierPerformancePage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('90d');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample supplier performance data
  const suppliers = [
    {
      id: 'SUP-001',
      name: 'Tech Supplies Inc',
      category: 'electronics',
      tier: 'premium',
      overallRating: 4.8,
      trends: {
        onTimeDelivery: '+2.5%',
        quality: '+1.2%',
        pricing: '-0.5%',
        response: '+5.0%',
      },
      metrics: {
        onTimeDelivery: 98.5,
        quality: 99.2,
        pricing: 4.5,
        responseTime: 2.5,
        fillRate: 99.5,
        returnRate: 0.8,
      },
      historicalData: {
        onTimeDelivery: [97.5, 98.0, 98.2, 98.5],
        quality: [98.5, 99.0, 99.1, 99.2],
        pricing: [4.2, 4.3, 4.4, 4.5],
        responseTime: [3.0, 2.8, 2.6, 2.5],
      },
      purchaseOrders: 156,
      totalSpent: 1250000,
      averageOrder: 8012,
      lastOrder: '2024-03-10',
      nextDelivery: '2024-03-18',
      certifications: ['ISO 9001', 'RoHS'],
      strengths: ['On-time delivery', 'Product quality', 'Communication'],
      weaknesses: ['Premium pricing', 'Limited stock'],
      status: 'active',
      since: '2019-05-15',
      contacts: [
        { name: 'John Smith', role: 'Account Manager' },
      ],
    },
    {
      id: 'SUP-002',
      name: 'Office Furniture Co',
      category: 'furniture',
      tier: 'standard',
      overallRating: 4.2,
      trends: {
        onTimeDelivery: '-1.5%',
        quality: '+0.8%',
        pricing: '-2.0%',
        response: '-3.2%',
      },
      metrics: {
        onTimeDelivery: 92.5,
        quality: 94.8,
        pricing: 4.0,
        responseTime: 4.5,
        fillRate: 95.2,
        returnRate: 2.1,
      },
      historicalData: {
        onTimeDelivery: [94.0, 93.5, 93.0, 92.5],
        quality: [94.0, 94.2, 94.5, 94.8],
        pricing: [3.8, 3.9, 4.0, 4.0],
        responseTime: [4.0, 4.2, 4.3, 4.5],
      },
      purchaseOrders: 89,
      totalSpent: 850000,
      averageOrder: 9550,
      lastOrder: '2024-03-05',
      nextDelivery: '2024-03-20',
      certifications: ['ISO 14001'],
      strengths: ['Competitive pricing', 'Product variety'],
      weaknesses: ['Delivery delays', 'Communication'],
      status: 'active',
      since: '2020-02-10',
      contacts: [
        { name: 'Mike Johnson', role: 'Account Executive' },
      ],
    },
    {
      id: 'SUP-003',
      name: 'Fashion Textiles Inc',
      category: 'apparel',
      tier: 'standard',
      overallRating: 3.8,
      trends: {
        onTimeDelivery: '-3.2%',
        quality: '-1.5%',
        pricing: '+1.8%',
        response: '-5.0%',
      },
      metrics: {
        onTimeDelivery: 88.5,
        quality: 90.2,
        pricing: 3.8,
        responseTime: 6.5,
        fillRate: 91.5,
        returnRate: 3.5,
      },
      historicalData: {
        onTimeDelivery: [91.7, 90.5, 89.2, 88.5],
        quality: [91.7, 91.0, 90.5, 90.2],
        pricing: [3.5, 3.6, 3.7, 3.8],
        responseTime: [5.5, 6.0, 6.2, 6.5],
      },
      purchaseOrders: 67,
      totalSpent: 450000,
      averageOrder: 6716,
      lastOrder: '2024-03-01',
      nextDelivery: '2024-03-22',
      certifications: ['OEKO-TEX'],
      strengths: ['Product quality', 'Material selection'],
      weaknesses: ['Slow delivery', 'Poor communication'],
      status: 'at-risk',
      since: '2021-03-20',
      contacts: [
        { name: 'Sarah Wilson', role: 'Sales Director' },
      ],
    },
    {
      id: 'SUP-004',
      name: 'Organic Food Co',
      category: 'food',
      tier: 'premium',
      overallRating: 4.9,
      trends: {
        onTimeDelivery: '+1.2%',
        quality: '+0.5%',
        pricing: '-0.8%',
        response: '+2.1%',
      },
      metrics: {
        onTimeDelivery: 99.2,
        quality: 99.5,
        pricing: 4.8,
        responseTime: 1.5,
        fillRate: 99.8,
        returnRate: 0.3,
      },
      historicalData: {
        onTimeDelivery: [98.0, 98.5, 99.0, 99.2],
        quality: [99.0, 99.2, 99.3, 99.5],
        pricing: [4.5, 4.6, 4.7, 4.8],
        responseTime: [2.0, 1.8, 1.6, 1.5],
      },
      purchaseOrders: 234,
      totalSpent: 980000,
      averageOrder: 4188,
      lastOrder: '2024-03-12',
      nextDelivery: '2024-03-15',
      certifications: ['USDA Organic', 'Non-GMO', 'Fair Trade'],
      strengths: ['Quality', 'Reliability', 'Communication'],
      weaknesses: ['Limited availability'],
      status: 'active',
      since: '2018-07-12',
      contacts: [
        { name: 'Emma Watson', role: 'Account Manager' },
      ],
    },
    {
      id: 'SUP-005',
      name: 'Industrial Supplies Co',
      category: 'industrial',
      tier: 'standard',
      overallRating: 3.5,
      trends: {
        onTimeDelivery: '-4.5%',
        quality: '-2.0%',
        pricing: '+2.5%',
        response: '-8.0%',
      },
      metrics: {
        onTimeDelivery: 85.5,
        quality: 87.5,
        pricing: 3.2,
        responseTime: 8.5,
        fillRate: 88.5,
        returnRate: 4.8,
      },
      historicalData: {
        onTimeDelivery: [90.0, 88.5, 87.0, 85.5],
        quality: [89.5, 88.5, 88.0, 87.5],
        pricing: [3.0, 3.1, 3.1, 3.2],
        responseTime: [7.0, 7.5, 8.0, 8.5],
      },
      purchaseOrders: 45,
      totalSpent: 620000,
      averageOrder: 13777,
      lastOrder: '2024-02-28',
      nextDelivery: '2024-03-25',
      certifications: ['ISO 9001'],
      strengths: ['Product range', 'Bulk pricing'],
      weaknesses: ['Delivery delays', 'Quality issues'],
      status: 'under-review',
      since: '2020-11-05',
      contacts: [
        { name: 'David Lee', role: 'Industrial Sales' },
      ],
    },
    {
      id: 'SUP-006',
      name: 'Medical Supplies Inc',
      category: 'medical',
      tier: 'premium',
      overallRating: 4.7,
      trends: {
        onTimeDelivery: '+1.8%',
        quality: '+1.0%',
        pricing: '-0.3%',
        response: '+3.5%',
      },
      metrics: {
        onTimeDelivery: 97.8,
        quality: 98.5,
        pricing: 4.4,
        responseTime: 2.8,
        fillRate: 98.5,
        returnRate: 0.9,
      },
      historicalData: {
        onTimeDelivery: [96.0, 96.5, 97.2, 97.8],
        quality: [97.5, 98.0, 98.2, 98.5],
        pricing: [4.2, 4.3, 4.3, 4.4],
        responseTime: [3.2, 3.0, 2.9, 2.8],
      },
      purchaseOrders: 178,
      totalSpent: 890000,
      averageOrder: 5000,
      lastOrder: '2024-03-08',
      nextDelivery: '2024-03-19',
      certifications: ['FDA', 'ISO 13485'],
      strengths: ['Quality', 'Compliance', 'Reliability'],
      weaknesses: ['Higher pricing'],
      status: 'active',
      since: '2019-09-18',
      contacts: [
        { name: 'Richard Harris', role: 'Medical Sales' },
      ],
    },
    {
      id: 'SUP-007',
      name: 'ChemCorp Industries',
      category: 'chemical',
      tier: 'premium',
      overallRating: 4.6,
      trends: {
        onTimeDelivery: '+1.5%',
        quality: '+0.8%',
        pricing: '-1.2%',
        response: '+2.8%',
      },
      metrics: {
        onTimeDelivery: 96.5,
        quality: 97.8,
        pricing: 4.3,
        responseTime: 3.2,
        fillRate: 97.5,
        returnRate: 1.2,
      },
      historicalData: {
        onTimeDelivery: [95.0, 95.5, 96.0, 96.5],
        quality: [97.0, 97.2, 97.5, 97.8],
        pricing: [4.0, 4.1, 4.2, 4.3],
        responseTime: [3.8, 3.6, 3.4, 3.2],
      },
      purchaseOrders: 92,
      totalSpent: 1450000,
      averageOrder: 15760,
      lastOrder: '2024-03-07',
      nextDelivery: '2024-03-21',
      certifications: ['ISO 9001', 'ISO 14001'],
      strengths: ['Quality', 'Safety compliance', 'Reliability'],
      weaknesses: ['Minimum order quantities'],
      status: 'active',
      since: '2018-04-22',
      contacts: [
        { name: 'Chris Evans', role: 'Chemical Sales' },
      ],
    },
    {
      id: 'SUP-008',
      name: 'Packaging Solutions Inc',
      category: 'packaging',
      tier: 'standard',
      overallRating: 4.0,
      trends: {
        onTimeDelivery: '-0.5%',
        quality: '+0.3%',
        pricing: '+1.5%',
        response: '-1.2%',
      },
      metrics: {
        onTimeDelivery: 91.2,
        quality: 93.5,
        pricing: 3.9,
        responseTime: 5.2,
        fillRate: 94.5,
        returnRate: 2.5,
      },
      historicalData: {
        onTimeDelivery: [91.7, 91.5, 91.3, 91.2],
        quality: [93.2, 93.3, 93.4, 93.5],
        pricing: [3.7, 3.8, 3.8, 3.9],
        responseTime: [5.0, 5.1, 5.1, 5.2],
      },
      purchaseOrders: 134,
      totalSpent: 320000,
      averageOrder: 2388,
      lastOrder: '2024-03-09',
      nextDelivery: '2024-03-16',
      certifications: ['FSC Certified'],
      strengths: ['Pricing', 'Product range'],
      weaknesses: ['Delivery consistency'],
      status: 'active',
      since: '2020-08-14',
      contacts: [
        { name: 'Tom Holland', role: 'Packaging Specialist' },
      ],
    },
  ];

  // Supplier categories
  const categories = [
    { id: 'all', name: 'All Categories', count: suppliers.length },
    { id: 'electronics', name: 'Electronics', count: suppliers.filter(s => s.category === 'electronics').length },
    { id: 'furniture', name: 'Furniture', count: suppliers.filter(s => s.category === 'furniture').length },
    { id: 'apparel', name: 'Apparel', count: suppliers.filter(s => s.category === 'apparel').length },
    { id: 'food', name: 'Food', count: suppliers.filter(s => s.category === 'food').length },
    { id: 'industrial', name: 'Industrial', count: suppliers.filter(s => s.category === 'industrial').length },
    { id: 'medical', name: 'Medical', count: suppliers.filter(s => s.category === 'medical').length },
    { id: 'chemical', name: 'Chemical', count: suppliers.filter(s => s.category === 'chemical').length },
    { id: 'packaging', name: 'Packaging', count: suppliers.filter(s => s.category === 'packaging').length },
  ];

  // Tier configuration
  const tierConfig = {
    premium: { label: 'Premium', color: 'bg-purple-100 text-purple-700', icon: Crown },
    standard: { label: 'Standard', color: 'bg-blue-100 text-blue-700', icon: Medal },
    'under-review': { label: 'Under Review', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle },
    'at-risk': { label: 'At Risk', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  };

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700' },
    'at-risk': { label: 'At Risk', color: 'bg-yellow-100 text-yellow-700' },
    'under-review': { label: 'Under Review', color: 'bg-orange-100 text-orange-700' },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-700' },
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTierIcon = (tier) => {
    const config = tierConfig[tier];
    const Icon = config?.icon || Award;
    return Icon;
  };

  const getTierColor = (tier) => {
    return tierConfig[tier]?.color || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'electronics': return <Cpu size={16} className="text-blue-600" />;
      case 'furniture': return <Armchair size={16} className="text-orange-600" />;
      case 'apparel': return <Shirt size={16} className="text-purple-600" />;
      case 'food': return <Apple size={16} className="text-green-600" />;
      case 'industrial': return <Factory size={16} className="text-gray-600" />;
      case 'medical': return <Pill size={16} className="text-red-600" />;
      case 'chemical': return <FlaskConical size={16} className="text-cyan-600" />;
      case 'packaging': return <Package size={16} className="text-pink-600" />;
      default: return <Building size={16} className="text-gray-600" />;
    }
  };

  const getTrendIcon = (trend) => {
    if (trend.startsWith('+')) {
      return <TrendingUp size={12} className="text-green-600" />;
    } else if (trend.startsWith('-')) {
      return <TrendingDown size={12} className="text-red-600" />;
    }
    return null;
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    const matchesTier = selectedTier === 'all' || supplier.tier === selectedTier;
    const matchesRating = selectedRating === 'all' || 
      (selectedRating === 'high' && supplier.overallRating >= 4.5) ||
      (selectedRating === 'medium' && supplier.overallRating >= 3.5 && supplier.overallRating < 4.5) ||
      (selectedRating === 'low' && supplier.overallRating < 3.5);
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTier && matchesRating && matchesSearch;
  });

  const stats = {
    total: suppliers.length,
    premium: suppliers.filter(s => s.tier === 'premium').length,
    standard: suppliers.filter(s => s.tier === 'standard').length,
    atRisk: suppliers.filter(s => s.tier === 'at-risk' || s.status === 'at-risk').length,
    underReview: suppliers.filter(s => s.tier === 'under-review' || s.status === 'under-review').length,
    avgRating: (suppliers.reduce((sum, s) => sum + s.overallRating, 0) / suppliers.length).toFixed(1),
    totalSpent: suppliers.reduce((sum, s) => sum + s.totalSpent, 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Supplier Performance</h1>
            <p className="text-black/50 mt-1">Monitor and evaluate supplier performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px] border-[#F5EEE9]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="60d">Last 60 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="180d">Last 6 Months</SelectItem>
                <SelectItem value="365d">Last Year</SelectItem>
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
              Report
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowReviewDialog(true)}
            >
              <Star size={16} />
              Review Suppliers
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Suppliers</p>
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
                  <p className="text-xs text-black/50">Premium</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.premium}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Crown size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Standard</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.standard}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Medal size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">At Risk</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.atRisk}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <AlertTriangle size={18} className="text-yellow-600" />
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
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
            <Input
              placeholder="Search by supplier name or category..."
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

          <Select value={selectedTier} onValueChange={setSelectedTier}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="at-risk">At Risk</SelectItem>
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

      {/* Performance Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="border-[#F5EEE9]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-black/50">On-Time Delivery</span>
              <Badge className="bg-green-100 text-green-700">Target: 95%</Badge>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-black">94.2%</span>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp size={14} />
                +1.2%
              </span>
            </div>
            <Progress value={94.2} className="h-2 mt-3 bg-[#F5EEE9]" />
          </CardContent>
        </Card>

        <Card className="border-[#F5EEE9]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-black/50">Quality Rating</span>
              <Badge className="bg-green-100 text-green-700">Target: 95%</Badge>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-black">95.8%</span>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp size={14} />
                +0.8%
              </span>
            </div>
            <Progress value={95.8} className="h-2 mt-3 bg-[#F5EEE9]" />
          </CardContent>
        </Card>

        <Card className="border-[#F5EEE9]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-black/50">Fill Rate</span>
              <Badge className="bg-green-100 text-green-700">Target: 97%</Badge>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-black">96.5%</span>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp size={14} />
                +0.5%
              </span>
            </div>
            <Progress value={96.5} className="h-2 mt-3 bg-[#F5EEE9]" />
          </CardContent>
        </Card>

        <Card className="border-[#F5EEE9]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-black/50">Return Rate</span>
              <Badge className="bg-green-100 text-green-700">Target: 2%</Badge>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-black">1.8%</span>
              <span className="text-sm text-red-600 flex items-center gap-1">
                <TrendingDown size={14} />
                +0.3%
              </span>
            </div>
            <Progress value={1.8} max={2} className="h-2 mt-3 bg-[#F5EEE9]" />
          </CardContent>
        </Card>
      </div>

      {/* Suppliers Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredSuppliers.map((supplier) => {
            const TierIcon = getTierIcon(supplier.tier);
            
            return (
              <Card key={supplier.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs", getTierColor(supplier.tier))}>
                            <TierIcon size={10} className="mr-1" />
                            {supplier.tier}
                          </Badge>
                          <Badge className={cn("text-xs", getStatusColor(supplier.status))}>
                            {supplier.status}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{supplier.name}</h3>
                        <p className="text-xs text-black/50 mt-1">{supplier.id}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedSupplier(supplier);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Performance
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedSupplier(supplier);
                            setShowReviewDialog(true);
                          }}>
                            <Star className="mr-2 h-4 w-4" />
                            Submit Review
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Detailed Report
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Contact
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-[10px] border-[#F5EEE9] flex items-center gap-1">
                        {getCategoryIcon(supplier.category)}
                        {supplier.category}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-600 fill-yellow-600" />
                        <span className={cn("text-lg font-bold", getRatingColor(supplier.overallRating))}>
                          {supplier.overallRating}
                        </span>
                      </div>
                      <span className="text-xs text-black/50">Overall Rating</span>
                    </div>

                    {/* Key Metrics */}
                    <div className="space-y-3 mb-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-black/50">On-Time Delivery</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium">{supplier.metrics.onTimeDelivery}%</span>
                            {getTrendIcon(supplier.trends.onTimeDelivery)}
                          </div>
                        </div>
                        <Progress value={supplier.metrics.onTimeDelivery} className="h-1.5 bg-[#F5EEE9]" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-black/50">Quality</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium">{supplier.metrics.quality}%</span>
                            {getTrendIcon(supplier.trends.quality)}
                          </div>
                        </div>
                        <Progress value={supplier.metrics.quality} className="h-1.5 bg-[#F5EEE9]" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-black/50">Response Time</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium">{supplier.metrics.responseTime} days</span>
                            {getTrendIcon(supplier.trends.response)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* POs & Spend */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="p-2 bg-[#F5EEE9]/30 rounded text-center">
                        <ShoppingCart size={12} className="mx-auto text-black/50 mb-1" />
                        <p className="text-xs font-bold">{supplier.purchaseOrders}</p>
                        <p className="text-[8px] text-black/50">POs</p>
                      </div>
                      <div className="p-2 bg-[#F5EEE9]/30 rounded text-center">
                        <DollarSign size={12} className="mx-auto text-black/50 mb-1" />
                        <p className="text-xs font-bold">${(supplier.totalSpent / 1000).toFixed(0)}k</p>
                        <p className="text-[8px] text-black/50">Spent</p>
                      </div>
                    </div>

                    {/* Strengths/Weaknesses */}
                    <div className="space-y-2 mb-3">
                      {supplier.strengths.slice(0, 1).map((strength, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[10px] text-green-600">
                          <ThumbsUp size={10} />
                          <span className="truncate">{strength}</span>
                        </div>
                      ))}
                      {supplier.weaknesses.slice(0, 1).map((weakness, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[10px] text-red-600">
                          <ThumbsDown size={10} />
                          <span className="truncate">{weakness}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                      <span>Since {supplier.since}</span>
                      <span>Last: {supplier.lastOrder}</span>
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
                  <TableHead className="text-black/50">Supplier</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Tier</TableHead>
                  <TableHead className="text-black/50">Rating</TableHead>
                  <TableHead className="text-black/50 text-right">On-Time</TableHead>
                  <TableHead className="text-black/50 text-right">Quality</TableHead>
                  <TableHead className="text-black/50 text-right">Response</TableHead>
                  <TableHead className="text-black/50 text-right">POs</TableHead>
                  <TableHead className="text-black/50 text-right">Spent</TableHead>
                  <TableHead className="text-black/50">Trend</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-xs text-black/50">{supplier.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {supplier.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getTierColor(supplier.tier))}>
                        {supplier.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className={cn("text-xs font-medium", getRatingColor(supplier.overallRating))}>
                          {supplier.overallRating}
                        </span>
                        <Star size={10} className="text-yellow-600 fill-yellow-600" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cn(
                        "text-xs font-medium",
                        supplier.metrics.onTimeDelivery >= 95 ? 'text-green-600' :
                        supplier.metrics.onTimeDelivery >= 90 ? 'text-yellow-600' : 'text-red-600'
                      )}>
                        {supplier.metrics.onTimeDelivery}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cn(
                        "text-xs font-medium",
                        supplier.metrics.quality >= 95 ? 'text-green-600' :
                        supplier.metrics.quality >= 90 ? 'text-yellow-600' : 'text-red-600'
                      )}>
                        {supplier.metrics.quality}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{supplier.metrics.responseTime}d</TableCell>
                    <TableCell className="text-right">{supplier.purchaseOrders}</TableCell>
                    <TableCell className="text-right">${(supplier.totalSpent / 1000).toFixed(0)}k</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(supplier.trends.onTimeDelivery)}
                        {getTrendIcon(supplier.trends.quality)}
                        {getTrendIcon(supplier.trends.pricing)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedSupplier(supplier);
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
                Showing {filteredSuppliers.length} of {suppliers.length} suppliers
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

      {/* Supplier Performance Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Supplier Performance Details</DialogTitle>
          </DialogHeader>

          {selectedSupplier && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedSupplier.name}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedSupplier.id} • {selectedSupplier.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cn("text-xs", getTierColor(selectedSupplier.tier))}>
                        {selectedSupplier.tier}
                      </Badge>
                      <Badge className={cn("text-xs", getStatusColor(selectedSupplier.status))}>
                        {selectedSupplier.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-600 fill-yellow-600" />
                      <span className={cn("text-2xl font-bold", getRatingColor(selectedSupplier.overallRating))}>
                        {selectedSupplier.overallRating}
                      </span>
                    </div>
                    <span className="text-sm text-black/50">Overall Rating</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Since</p>
                      <p className="text-sm">{selectedSupplier.since}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Last Order</p>
                      <p className="text-sm">{selectedSupplier.lastOrder}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <ShoppingCart size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">{selectedSupplier.purchaseOrders}</p>
                        <p className="text-xs text-black/50">POs</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <DollarSign size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">${(selectedSupplier.totalSpent / 1000).toFixed(0)}k</p>
                        <p className="text-xs text-black/50">Total Spent</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-2 text-center">
                        <Package size={14} className="mx-auto text-black/50 mb-1" />
                        <p className="text-lg font-bold">${selectedSupplier.averageOrder}</p>
                        <p className="text-xs text-black/50">Avg Order</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Certifications</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedSupplier.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs border-[#F5EEE9]">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Contact</p>
                      <p className="text-sm">{selectedSupplier.contacts[0].name}</p>
                      <p className="text-xs text-black/50">{selectedSupplier.contacts[0].role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs font-medium text-green-700 mb-2">Strengths</p>
                      <ul className="space-y-1">
                        {selectedSupplier.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-green-600">
                            <ThumbsUp size={12} className="mt-0.5" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-xs font-medium text-red-700 mb-2">Weaknesses</p>
                      <ul className="space-y-1">
                        {selectedSupplier.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-red-600">
                            <ThumbsDown size={12} className="mt-0.5" />
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-4">Performance Metrics</p>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-black/50">On-Time Delivery</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{selectedSupplier.metrics.onTimeDelivery}%</span>
                              {getTrendIcon(selectedSupplier.trends.onTimeDelivery)}
                            </div>
                          </div>
                          <Progress value={selectedSupplier.metrics.onTimeDelivery} className="h-2 bg-[#F5EEE9]" />
                          <p className="text-xs text-green-600 mt-1">Target: 95%</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-black/50">Quality Rating</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{selectedSupplier.metrics.quality}%</span>
                              {getTrendIcon(selectedSupplier.trends.quality)}
                            </div>
                          </div>
                          <Progress value={selectedSupplier.metrics.quality} className="h-2 bg-[#F5EEE9]" />
                          <p className="text-xs text-green-600 mt-1">Target: 95%</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-black/50">Fill Rate</span>
                            <span className="text-sm font-medium">{selectedSupplier.metrics.fillRate}%</span>
                          </div>
                          <Progress value={selectedSupplier.metrics.fillRate} className="h-2 bg-[#F5EEE9]" />
                          <p className="text-xs text-green-600 mt-1">Target: 97%</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-black/50">Return Rate</span>
                            <span className="text-sm font-medium">{selectedSupplier.metrics.returnRate}%</span>
                          </div>
                          <Progress value={selectedSupplier.metrics.returnRate * 50} className="h-2 bg-[#F5EEE9]" />
                          <p className="text-xs text-red-600 mt-1">Target: {'<'}2%</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div>
                            <p className="text-xs text-black/50">Pricing Competitiveness</p>
                            <div className="flex items-center gap-1">
                              <span className="text-lg font-bold">{selectedSupplier.metrics.pricing}</span>
                              <span className="text-xs text-black/50">/5</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-black/50">Response Time</p>
                            <div className="flex items-center gap-1">
                              <span className="text-lg font-bold">{selectedSupplier.metrics.responseTime}</span>
                              <span className="text-xs text-black/50">days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trends" className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-4">Historical Trends (Last 4 Periods)</p>
                      
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs font-medium mb-2">On-Time Delivery Trend</p>
                          <div className="flex items-end justify-between h-16">
                            {selectedSupplier.historicalData.onTimeDelivery.map((value, idx) => (
                              <div key={idx} className="flex flex-col items-center w-1/4">
                                <div 
                                  className="w-full bg-green-500 rounded-t"
                                  style={{ height: `${value}px` }}
                                />
                                <span className="text-[8px] mt-1">P{idx + 1}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium mb-2">Quality Trend</p>
                          <div className="flex items-end justify-between h-16">
                            {selectedSupplier.historicalData.quality.map((value, idx) => (
                              <div key={idx} className="flex flex-col items-center w-1/4">
                                <div 
                                  className="w-full bg-blue-500 rounded-t"
                                  style={{ height: `${value}px` }}
                                />
                                <span className="text-[8px] mt-1">P{idx + 1}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium mb-2">Response Time Trend</p>
                          <div className="flex items-end justify-between h-16">
                            {selectedSupplier.historicalData.responseTime.map((value, idx) => (
                              <div key={idx} className="flex flex-col items-center w-1/4">
                                <div 
                                  className="w-full bg-orange-500 rounded-t"
                                  style={{ height: `${value * 10}px` }}
                                />
                                <span className="text-[8px] mt-1">P{idx + 1}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                        <Package size={12} className="text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Order Received</p>
                            <span className="text-[10px] text-black/50">{selectedSupplier.lastOrder}</span>
                          </div>
                          <p className="text-[10px] text-black/70">PO-2024-045 • On-time delivery</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                        <CheckCircle size={12} className="text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Quality Check Passed</p>
                            <span className="text-[10px] text-black/50">2024-03-10</span>
                          </div>
                          <p className="text-[10px] text-black/70">All items passed inspection</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                        <Award size={12} className="text-purple-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">Quarterly Review</p>
                            <span className="text-[10px] text-black/50">2024-03-01</span>
                          </div>
                          <p className="text-[10px] text-black-700">Rating maintained at {selectedSupplier.overallRating}</p>
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
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
              setShowDetailsDialog(false);
              setShowReviewDialog(true);
            }}>
              <Star className="mr-2 h-4 w-4" />
              Submit Review
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
                onClick={() => setShowReviewDialog(true)}
              >
                <Star size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Review Suppliers</TooltipContent>
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
            <TooltipContent side="left">Generate Report</TooltipContent>
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

export default SupplierPerformancePage;