// app/dashboard/inventory-forecasting/page.js
'use client';

import { useState } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Package,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  ShoppingCart,
  Download,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  MoreVertical,
  Eye,
  Trash2,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Settings,
  BarChart3,
  Activity,

  Target,
  LineChart,
  Brain,
 
} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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

import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const InventoryForecastingPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedModel, setSelectedModel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showModelDialog, setShowModelDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showScenarioDialog, setShowScenarioDialog] = useState(false);
  const [showWhatIfDialog, setShowWhatIfDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Sample inventory forecasting data
  const forecasts = [
    {
      id: 'PRD-001',
      productId: 'PRD-001',
      productName: 'Premium Wireless Headphones',
      sku: 'SKU-001',
      category: 'electronics',
      currentStock: 1250,
      reorderPoint: 500,
      reorderQuantity: 1000,
      averageDailyDemand: 45,
      leadTime: 3,
      safetyStock: 135,
      forecast: {
        next7Days: 315,
        next30Days: 1350,
        next60Days: 2700,
        next90Days: 4050,
      },
      confidence: {
        next7Days: 95,
        next30Days: 92,
        next60Days: 88,
        next90Days: 82,
      },
      seasonality: {
        monday: 48,
        tuesday: 52,
        wednesday: 55,
        thursday: 50,
        friday: 58,
        saturday: 42,
        sunday: 35,
      },
      trends: {
        weekOverWeek: '+5.2%',
        monthOverMonth: '+12.8%',
        yearOverYear: '+45.3%',
      },
      predictedStockout: '2024-04-15',
      recommendedReorder: '2024-03-25',
      recommendedQuantity: 1000,
      model: 'time-series',
      accuracy: 94.5,
      lastUpdated: '2024-03-15',
      alerts: [],
    },
    {
      id: 'PRD-002',
      productId: 'PRD-002',
      productName: 'Organic Protein Powder',
      sku: 'SKU-002',
      category: 'health',
      currentStock: 350,
      reorderPoint: 200,
      reorderQuantity: 500,
      averageDailyDemand: 25,
      leadTime: 4,
      safetyStock: 100,
      forecast: {
        next7Days: 175,
        next30Days: 750,
        next60Days: 1500,
        next90Days: 2250,
      },
      confidence: {
        next7Days: 93,
        next30Days: 90,
        next60Days: 85,
        next90Days: 80,
      },
      seasonality: {
        monday: 22,
        tuesday: 24,
        wednesday: 26,
        thursday: 25,
        friday: 28,
        saturday: 20,
        sunday: 15,
      },
      trends: {
        weekOverWeek: '+3.1%',
        monthOverMonth: '+8.5%',
        yearOverYear: '+22.7%',
      },
      predictedStockout: '2024-04-22',
      recommendedReorder: '2024-03-28',
      recommendedQuantity: 500,
      model: 'ml',
      accuracy: 91.2,
      lastUpdated: '2024-03-15',
      alerts: [],
    },
    {
      id: 'PRD-003',
      productId: 'PRD-003',
      productName: 'Industrial Lubricant - Grade A',
      sku: 'SKU-003',
      category: 'industrial',
      currentStock: 450,
      reorderPoint: 150,
      reorderQuantity: 300,
      averageDailyDemand: 12,
      leadTime: 7,
      safetyStock: 84,
      forecast: {
        next7Days: 84,
        next30Days: 360,
        next60Days: 720,
        next90Days: 1080,
      },
      confidence: {
        next7Days: 96,
        next30Days: 94,
        next60Days: 91,
        next90Days: 87,
      },
      seasonality: {
        monday: 10,
        tuesday: 11,
        wednesday: 12,
        thursday: 13,
        friday: 14,
        saturday: 8,
        sunday: 6,
      },
      trends: {
        weekOverWeek: '+1.8%',
        monthOverMonth: '+4.2%',
        yearOverYear: '+12.5%',
      },
      predictedStockout: null,
      recommendedReorder: null,
      recommendedQuantity: null,
      model: 'time-series',
      accuracy: 95.8,
      lastUpdated: '2024-03-15',
      alerts: [],
    },
    {
      id: 'PRD-004',
      productId: 'PRD-004',
      productName: 'Ergonomic Office Chair',
      sku: 'SKU-004',
      category: 'furniture',
      currentStock: 85,
      reorderPoint: 40,
      reorderQuantity: 50,
      averageDailyDemand: 5,
      leadTime: 10,
      safetyStock: 50,
      forecast: {
        next7Days: 35,
        next30Days: 150,
        next60Days: 300,
        next90Days: 450,
      },
      confidence: {
        next7Days: 91,
        next30Days: 88,
        next60Days: 82,
        next90Days: 75,
      },
      seasonality: {
        monday: 4,
        tuesday: 5,
        wednesday: 6,
        thursday: 5,
        friday: 7,
        saturday: 3,
        sunday: 2,
      },
      trends: {
        weekOverWeek: '+6.2%',
        monthOverMonth: '+15.8%',
        yearOverYear: '+32.4%',
      },
      predictedStockout: '2024-04-10',
      recommendedReorder: '2024-03-20',
      recommendedQuantity: 50,
      model: 'ml',
      accuracy: 89.5,
      lastUpdated: '2024-03-15',
      alerts: ['Low stock warning'],
    },
    {
      id: 'PRD-005',
      productId: 'PRD-005',
      productName: 'Cotton T-Shirt (White, L)',
      sku: 'SKU-005',
      category: 'apparel',
      currentStock: 1200,
      reorderPoint: 500,
      reorderQuantity: 1000,
      averageDailyDemand: 40,
      leadTime: 5,
      safetyStock: 200,
      forecast: {
        next7Days: 280,
        next30Days: 1200,
        next60Days: 2400,
        next90Days: 3600,
      },
      confidence: {
        next7Days: 94,
        next30Days: 91,
        next60Days: 87,
        next90Days: 82,
      },
      seasonality: {
        monday: 38,
        tuesday: 42,
        wednesday: 45,
        thursday: 40,
        friday: 48,
        saturday: 35,
        sunday: 30,
      },
      trends: {
        weekOverWeek: '+4.5%',
        monthOverMonth: '+10.2%',
        yearOverYear: '+28.6%',
      },
      predictedStockout: '2024-05-01',
      recommendedReorder: '2024-04-15',
      recommendedQuantity: 1000,
      model: 'time-series',
      accuracy: 92.8,
      lastUpdated: '2024-03-15',
      alerts: [],
    },
    {
      id: 'PRD-006',
      productId: 'PRD-006',
      productName: 'Canned Organic Soup',
      sku: 'SKU-006',
      category: 'food',
      currentStock: 800,
      reorderPoint: 400,
      reorderQuantity: 800,
      averageDailyDemand: 35,
      leadTime: 3,
      safetyStock: 105,
      forecast: {
        next7Days: 245,
        next30Days: 1050,
        next60Days: 2100,
        next90Days: 3150,
      },
      confidence: {
        next7Days: 96,
        next30Days: 93,
        next60Days: 89,
        next90Days: 84,
      },
      seasonality: {
        monday: 32,
        tuesday: 34,
        wednesday: 36,
        thursday: 38,
        friday: 40,
        saturday: 30,
        sunday: 25,
      },
      trends: {
        weekOverWeek: '+2.8%',
        monthOverMonth: '+6.5%',
        yearOverYear: '+18.2%',
      },
      predictedStockout: '2024-04-28',
      recommendedReorder: '2024-04-10',
      recommendedQuantity: 800,
      model: 'ml',
      accuracy: 94.2,
      lastUpdated: '2024-03-15',
      alerts: [],
    },
    {
      id: 'PRD-007',
      productId: 'PRD-007',
      productName: 'Smart LED TV 55"',
      sku: 'SKU-007',
      category: 'electronics',
      currentStock: 45,
      reorderPoint: 20,
      reorderQuantity: 30,
      averageDailyDemand: 3,
      leadTime: 8,
      safetyStock: 24,
      forecast: {
        next7Days: 21,
        next30Days: 90,
        next60Days: 180,
        next90Days: 270,
      },
      confidence: {
        next7Days: 90,
        next30Days: 86,
        next60Days: 80,
        next90Days: 72,
      },
      seasonality: {
        monday: 2,
        tuesday: 3,
        wednesday: 4,
        thursday: 3,
        friday: 5,
        saturday: 4,
        sunday: 2,
      },
      trends: {
        weekOverWeek: '+8.5%',
        monthOverMonth: '+22.3%',
        yearOverYear: '+65.8%',
      },
      predictedStockout: '2024-03-28',
      recommendedReorder: '2024-03-18',
      recommendedQuantity: 30,
      model: 'ml',
      accuracy: 87.5,
      lastUpdated: '2024-03-15',
      alerts: ['Critical stock', 'High demand'],
    },
    {
      id: 'PRD-008',
      productId: 'PRD-008',
      productName: 'First Aid Kit - Professional',
      sku: 'SKU-008',
      category: 'medical',
      currentStock: 220,
      reorderPoint: 100,
      reorderQuantity: 200,
      averageDailyDemand: 8,
      leadTime: 4,
      safetyStock: 32,
      forecast: {
        next7Days: 56,
        next30Days: 240,
        next60Days: 480,
        next90Days: 720,
      },
      confidence: {
        next7Days: 95,
        next30Days: 92,
        next60Days: 88,
        next90Days: 83,
      },
      seasonality: {
        monday: 7,
        tuesday: 8,
        wednesday: 9,
        thursday: 8,
        friday: 10,
        saturday: 6,
        sunday: 5,
      },
      trends: {
        weekOverWeek: '+3.2%',
        monthOverMonth: '+7.8%',
        yearOverYear: '+24.5%',
      },
      predictedStockout: '2024-04-18',
      recommendedReorder: '2024-04-02',
      recommendedQuantity: 200,
      model: 'time-series',
      accuracy: 93.5,
      lastUpdated: '2024-03-15',
      alerts: [],
    },
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Categories', count: forecasts.length },
    { id: 'electronics', name: 'Electronics', count: forecasts.filter(f => f.category === 'electronics').length },
    { id: 'health', name: 'Health', count: forecasts.filter(f => f.category === 'health').length },
    { id: 'industrial', name: 'Industrial', count: forecasts.filter(f => f.category === 'industrial').length },
    { id: 'furniture', name: 'Furniture', count: forecasts.filter(f => f.category === 'furniture').length },
    { id: 'apparel', name: 'Apparel', count: forecasts.filter(f => f.category === 'apparel').length },
    { id: 'food', name: 'Food', count: forecasts.filter(f => f.category === 'food').length },
    { id: 'medical', name: 'Medical', count: forecasts.filter(f => f.category === 'medical').length },
  ];

  // Forecast models
  const models = [
    { id: 'all', name: 'All Models' },
    { id: 'time-series', name: 'Time Series' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'arima', name: 'ARIMA' },
    { id: 'prophet', name: 'Prophet' },
    { id: 'ensemble', name: 'Ensemble' },
  ];

  // Time ranges
  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '60d', label: '60 Days' },
    { value: '90d', label: '90 Days' },
    { value: '180d', label: '6 Months' },
    { value: '365d', label: '1 Year' },
  ];

  const getTrendIcon = (trend) => {
    if (trend.startsWith('+')) {
      return <TrendingUp size={12} className="text-green-600" />;
    } else if (trend.startsWith('-')) {
      return <TrendingDown size={12} className="text-red-600" />;
    }
    return null;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-blue-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getModelIcon = (model) => {
    switch(model) {
      case 'time-series': return <LineChart size={14} className="text-blue-600" />;
      case 'ml': return <Brain size={14} className="text-purple-600" />;
      default: return <Activity size={14} className="text-gray-600" />;
    }
  };

  const filteredForecasts = forecasts.filter(forecast => {
    const matchesCategory = selectedCategory === 'all' || forecast.category === selectedCategory;
    const matchesModel = selectedModel === 'all' || forecast.model === selectedModel;
    const matchesSearch = forecast.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         forecast.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         forecast.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesModel && matchesSearch;
  });

  const stats = {
    total: forecasts.length,
    lowStock: forecasts.filter(f => f.currentStock <= f.reorderPoint * 1.2).length,
    critical: forecasts.filter(f => f.currentStock <= f.reorderPoint).length,
    stockoutRisk: forecasts.filter(f => f.predictedStockout).length,
    avgAccuracy: Math.round(forecasts.reduce((sum, f) => sum + f.accuracy, 0) / forecasts.length),
    totalDemand: forecasts.reduce((sum, f) => sum + f.forecast.next30Days, 0),
    totalValue: forecasts.reduce((sum, f) => sum + (f.currentStock * 10), 0), // placeholder value calculation
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredForecasts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredForecasts.map(p => p.id));
    }
  };

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Inventory Forecasting</h1>
            <p className="text-black/50 mt-1">AI-powered demand forecasting and inventory planning</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-[120px] border-[#F5EEE9]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
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
              onClick={() => setShowScenarioDialog(true)}
            >
              <Target size={16} />
              Scenarios
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowWhatIfDialog(true)}
            >
              <Activity size={16} />
              What-If
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowModelDialog(true)}
            >
              <Brain size={16} />
              Run Forecast
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Products Tracked</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Package size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Low Stock Risk</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.lowStock}</p>
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
                  <p className="text-xs text-black/50">Critical Stock</p>
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
                  <p className="text-xs text-black/50">Stockout Risk</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.stockoutRisk}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Clock size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Accuracy</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.avgAccuracy}%</p>
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
                  <p className="text-xs text-black/50">30-Day Demand</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.totalDemand.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <TrendingUp size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-[#F5EEE9] bg-gradient-to-br from-blue-50 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-700">Total Projected Demand (30d)</p>
              <Brain size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-700">{stats.totalDemand.toLocaleString()} units</p>
            <p className="text-xs text-blue-600 mt-1">↑ 12.5% vs last period</p>
          </CardContent>
        </Card>

        <Card className="border-[#F5EEE9] bg-gradient-to-br from-green-50 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-green-700">Forecast Accuracy</p>
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-700">{stats.avgAccuracy}%</p>
            <p className="text-xs text-green-600 mt-1">↑ 3.2% improvement</p>
          </CardContent>
        </Card>

        <Card className="border-[#F5EEE9] bg-gradient-to-br from-purple-50 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-purple-700">Recommended Orders</p>
              <ShoppingCart size={20} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-700">{forecasts.filter(f => f.recommendedReorder).length}</p>
            <p className="text-xs text-purple-600 mt-1">Total value: $45,250</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
            <Input
              placeholder="Search by product name, SKU, or category..."
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

          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              {models.map(model => (
                <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
              ))}
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
      {selectedProducts.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedProducts.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedProducts([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <ShoppingCart size={14} className="mr-2" />
              Create Orders
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Target size={14} className="mr-2" />
              Run Scenario
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Download size={14} className="mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      )}

      {/* Forecast Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredForecasts.map((forecast) => {
            const stockLevel = (forecast.currentStock / forecast.reorderPoint) * 100;
            const stockStatus = forecast.currentStock <= forecast.reorderPoint ? 'critical' :
                               forecast.currentStock <= forecast.reorderPoint * 1.5 ? 'low' : 'healthy';
            
            return (
              <Card key={forecast.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            {forecast.category}
                          </Badge>
                          <Badge className={cn(
                            "text-xs",
                            forecast.model === 'ml' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          )}>
                            {getModelIcon(forecast.model)}
                            <span className="ml-1">{forecast.model}</span>
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{forecast.productName}</h3>
                        <p className="text-xs text-black/50 mt-1">{forecast.sku}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedProduct(forecast);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Chart
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Target className="mr-2 h-4 w-4" />
                            Create Scenario
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Create Order
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
                    {/* Stock Level */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Current Stock</span>
                        <span className={cn(
                          "text-xs font-medium",
                          stockStatus === 'critical' ? 'text-red-600' :
                          stockStatus === 'low' ? 'text-yellow-600' : 'text-green-600'
                        )}>
                          {forecast.currentStock} units
                        </span>
                      </div>
                      <Progress 
                        value={stockLevel > 100 ? 100 : stockLevel} 
                        className={cn(
                          "h-2",
                          stockStatus === 'critical' ? 'bg-red-100' :
                          stockStatus === 'low' ? 'bg-yellow-100' : 'bg-green-100'
                        )}
                        style={{ 
                          '--progress-background': 
                            stockStatus === 'critical' ? '#ef4444' :
                            stockStatus === 'low' ? '#eab308' :
                            '#22c55e'
                        }}
                      />
                    </div>

                    {/* Forecast Summary */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="p-2 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Next 7 Days</p>
                        <p className="text-sm font-bold">{forecast.forecast.next7Days}</p>
                        <p className="text-[8px] text-black/50">Conf: {forecast.confidence.next7Days}%</p>
                      </div>
                      <div className="p-2 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Next 30 Days</p>
                        <p className="text-sm font-bold">{forecast.forecast.next30Days}</p>
                        <p className="text-[8px] text-black/50">Conf: {forecast.confidence.next30Days}%</p>
                      </div>
                    </div>

                    {/* Trends */}
                    <div className="grid grid-cols-3 gap-1 mb-3">
                      <div className="flex items-center gap-1">
                        {getTrendIcon(forecast.trends.weekOverWeek)}
                        <span className="text-[8px] text-black/70">7d: {forecast.trends.weekOverWeek}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(forecast.trends.monthOverMonth)}
                        <span className="text-[8px] text-black/70">30d: {forecast.trends.monthOverMonth}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(forecast.trends.yearOverYear)}
                        <span className="text-[8px] text-black/70">1y: {forecast.trends.yearOverYear}</span>
                      </div>
                    </div>

                    {/* Alerts */}
                    {forecast.alerts.length > 0 && (
                      <div className="mb-2 p-2 bg-red-50 rounded">
                        {forecast.alerts.map((alert, idx) => (
                          <p key={idx} className="text-[8px] text-red-600 flex items-center gap-1">
                            <AlertCircle size={8} />
                            {alert}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Stockout Warning */}
                    {forecast.predictedStockout && (
                      <div className="mb-2 p-2 bg-orange-50 rounded">
                        <p className="text-[8px] text-orange-700 flex items-center gap-1">
                          <Clock size={8} />
                          Stockout predicted: {forecast.predictedStockout}
                        </p>
                      </div>
                    )}

                    {/* Reorder Recommendation */}
                    {forecast.recommendedReorder && (
                      <div className="mb-2 p-2 bg-green-50 rounded">
                        <p className="text-[8px] text-green-700 flex items-center gap-1">
                          <ShoppingCart size={8} />
                          Reorder by: {forecast.recommendedReorder}
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                      <span>Accuracy: {forecast.accuracy}%</span>
                      <span>Updated: {forecast.lastUpdated}</span>
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
                      checked={selectedProducts.length === filteredForecasts.length && filteredForecasts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Product</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Model</TableHead>
                  <TableHead className="text-black/50 text-right">Current</TableHead>
                  <TableHead className="text-black/50 text-right">ROP</TableHead>
                  <TableHead className="text-black/50 text-right">7 Day</TableHead>
                  <TableHead className="text-black/50 text-right">30 Day</TableHead>
                  <TableHead className="text-black/50">Trend (W/W)</TableHead>
                  <TableHead className="text-black/50">Accuracy</TableHead>
                  <TableHead className="text-black/50">Stockout</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredForecasts.map((forecast) => (
                  <TableRow key={forecast.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedProducts.includes(forecast.id)}
                        onCheckedChange={() => handleSelectProduct(forecast.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{forecast.productName}</p>
                        <p className="text-xs text-black/50">{forecast.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {forecast.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getModelIcon(forecast.model)}
                        <span className="text-xs capitalize">{forecast.model}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{forecast.currentStock}</TableCell>
                    <TableCell className="text-right">{forecast.reorderPoint}</TableCell>
                    <TableCell className="text-right">{forecast.forecast.next7Days}</TableCell>
                    <TableCell className="text-right">{forecast.forecast.next30Days}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(forecast.trends.weekOverWeek)}
                        <span className="text-xs">{forecast.trends.weekOverWeek}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "text-xs font-medium",
                        getConfidenceColor(forecast.accuracy)
                      )}>
                        {forecast.accuracy}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {forecast.predictedStockout ? (
                        <span className="text-xs text-orange-600">{forecast.predictedStockout}</span>
                      ) : (
                        <span className="text-xs text-black/30">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedProduct(forecast);
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
                Showing {filteredForecasts.length} of {forecasts.length} products
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

      {/* Product Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Forecast Details</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="py-4">
              <Tabs defaultValue="forecast">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="forecast">Forecast</TabsTrigger>
                  <TabsTrigger value="seasonality">Seasonality</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="forecast" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedProduct.productName}</h3>
                      <p className="text-sm text-black/50 mt-1">{selectedProduct.sku}</p>
                    </div>
                    <Badge className={cn(
                      "text-xs",
                      selectedProduct.model === 'ml' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    )}>
                      {selectedProduct.model}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Current Stock</p>
                      <p className="text-2xl font-bold">{selectedProduct.currentStock}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Reorder Point</p>
                      <p className="text-2xl font-bold">{selectedProduct.reorderPoint}</p>
                    </div>
                  </div>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Demand Forecast</p>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="text-center">
                          <p className="text-xs text-black/50">7 Days</p>
                          <p className="text-lg font-bold">{selectedProduct.forecast.next7Days}</p>
                          <p className="text-xs text-green-600">{selectedProduct.confidence.next7Days}% conf</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-black/50">30 Days</p>
                          <p className="text-lg font-bold">{selectedProduct.forecast.next30Days}</p>
                          <p className="text-xs text-blue-600">{selectedProduct.confidence.next30Days}% conf</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-black/50">60 Days</p>
                          <p className="text-lg font-bold">{selectedProduct.forecast.next60Days}</p>
                          <p className="text-xs text-yellow-600">{selectedProduct.confidence.next60Days}% conf</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-black/50">90 Days</p>
                          <p className="text-lg font-bold">{selectedProduct.forecast.next90Days}</p>
                          <p className="text-xs text-orange-600">{selectedProduct.confidence.next90Days}% conf</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Average Daily Demand</p>
                      <p className="text-lg font-bold">{selectedProduct.averageDailyDemand}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Lead Time</p>
                      <p className="text-lg font-bold">{selectedProduct.leadTime} days</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Safety Stock</p>
                      <p className="text-lg font-bold">{selectedProduct.safetyStock}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Model Accuracy</p>
                      <p className="text-lg font-bold text-green-600">{selectedProduct.accuracy}%</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="seasonality" className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Daily Seasonality Pattern</p>
                      <div className="space-y-2">
                        {Object.entries(selectedProduct.seasonality).map(([day, value]) => (
                          <div key={day} className="flex items-center gap-2">
                            <span className="w-20 text-xs capitalize">{day}</span>
                            <div className="flex-1 h-2 bg-[#F5EEE9] rounded-full">
                              <div 
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${(value / Math.max(...Object.values(selectedProduct.seasonality))) * 100}%` }}
                              />
                            </div>
                            <span className="w-10 text-xs text-right">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trends" className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Growth Trends</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Week over Week</span>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(selectedProduct.trends.weekOverWeek)}
                            <span className={cn(
                              "text-sm font-medium",
                              selectedProduct.trends.weekOverWeek.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            )}>
                              {selectedProduct.trends.weekOverWeek}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Month over Month</span>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(selectedProduct.trends.monthOverMonth)}
                            <span className={cn(
                              "text-sm font-medium",
                              selectedProduct.trends.monthOverMonth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            )}>
                              {selectedProduct.trends.monthOverMonth}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Year over Year</span>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(selectedProduct.trends.yearOverYear)}
                            <span className={cn(
                              "text-sm font-medium",
                              selectedProduct.trends.yearOverYear.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            )}>
                              {selectedProduct.trends.yearOverYear}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  {selectedProduct.recommendedReorder ? (
                    <Card className="border-[#F5EEE9] bg-green-50">
                      <CardContent className="p-4">
                        <p className="text-sm font-medium text-green-700 mb-2">Reorder Recommendation</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-green-700">Recommended Date</span>
                            <span className="text-sm font-bold text-green-700">{selectedProduct.recommendedReorder}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-green-700">Recommended Quantity</span>
                            <span className="text-sm font-bold text-green-700">{selectedProduct.recommendedQuantity}</span>
                          </div>
                          <Button className="w-full mt-2 bg-green-600 hover:bg-green-700">
                            <ShoppingCart size={14} className="mr-2" />
                            Create Purchase Order
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <p className="text-sm text-black/50 text-center py-4">No recommendations at this time</p>
                  )}

                  {selectedProduct.predictedStockout && (
                    <Card className="border-[#F5EEE9] bg-orange-50">
                      <CardContent className="p-4">
                        <p className="text-sm font-medium text-orange-700 mb-2">Stockout Warning</p>
                        <p className="text-sm text-orange-600">
                          Predicted stockout on {selectedProduct.predictedStockout}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedProduct?.recommendedReorder && (
              <Button className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Create Order
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Run Forecast Dialog */}
      <Dialog open={showModelDialog} onOpenChange={setShowModelDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Run Forecast Model</DialogTitle>
            <DialogDescription>
              Generate new demand forecasts using AI/ML models
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Forecast Model</Label>
              <Select defaultValue="ensemble">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time-series">Time Series Analysis</SelectItem>
                  <SelectItem value="ml">Machine Learning</SelectItem>
                  <SelectItem value="arima">ARIMA</SelectItem>
                  <SelectItem value="prophet">Prophet</SelectItem>
                  <SelectItem value="ensemble">Ensemble (Recommended)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Forecast Period</Label>
              <RadioGroup defaultValue="90d">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="30d" id="30d" />
                  <Label htmlFor="30d">30 Days</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="60d" id="60d" />
                  <Label htmlFor="60d">60 Days</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="90d" id="90d" />
                  <Label htmlFor="90d">90 Days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="180d" id="180d" />
                  <Label htmlFor="180d">180 Days</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Product Categories</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Include Seasonality</Label>
              <div className="flex items-center space-x-2">
                <Switch id="seasonality" defaultChecked />
                <Label htmlFor="seasonality">Adjust for seasonal patterns</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Include Promotions</Label>
              <div className="flex items-center space-x-2">
                <Switch id="promotions" />
                <Label htmlFor="promotions">Account for upcoming promotions</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModelDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Brain className="mr-2 h-4 w-4" />
              Run Forecast
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* What-If Analysis Dialog */}
      <Dialog open={showWhatIfDialog} onOpenChange={setShowWhatIfDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>What-If Analysis</DialogTitle>
            <DialogDescription>
              Simulate different scenarios and see impact on inventory
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Scenario</Label>
              <Select defaultValue="demand-increase">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demand-increase">Demand Increase (+20%)</SelectItem>
                  <SelectItem value="demand-decrease">Demand Decrease (-15%)</SelectItem>
                  <SelectItem value="lead-time">Lead Time Increase</SelectItem>
                  <SelectItem value="supplier-delay">Supplier Delay</SelectItem>
                  <SelectItem value="promotion">Promotion Impact</SelectItem>
                  <SelectItem value="custom">Custom Parameters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Adjustment Factor</Label>
              <Slider defaultValue={[20]} max={50} step={5} />
              <div className="flex items-center justify-between text-xs text-black/50">
                <span>0%</span>
                <span>20%</span>
                <span>50%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Affected Products</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="category">By Category</SelectItem>
                  <SelectItem value="selected">Selected Products</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">Scenario Impact</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-[10px] text-blue-600">Projected Stockouts</p>
                  <p className="text-lg font-bold text-blue-700">+8</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600">Reorder Requirements</p>
                  <p className="text-lg font-bold text-blue-700">+15</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWhatIfDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Activity className="mr-2 h-4 w-4" />
              Run Analysis
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
                onClick={() => setShowModelDialog(true)}
              >
                <Brain size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Run Forecast</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowWhatIfDialog(true)}
              >
                <Activity size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">What-If Analysis</TooltipContent>
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

export default InventoryForecastingPage;