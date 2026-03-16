// app/dashboard/ai-predictions/page.js
'use client';

import { useState } from 'react';
import { 
  Brain,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Award,
  Download,
  Search,
  Filter,
  RefreshCw,
  Grid,
  List,
  MoreVertical,
  Copy,
  FileSpreadsheet,
  FileJson,
  File,
  Printer as PrinterIcon,
  Settings,
  BarChart3,
  Activity,
  Sparkles,
  Lightbulb,
  Cpu,
  Zap,
  Eye,
  GitBranch,
  LineChart,

} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AIPredictionsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedConfidence, setSelectedConfidence] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showTrainDialog, setShowTrainDialog] = useState(false);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [showExplainDialog, setShowExplainDialog] = useState(false);
  const [showScenarioDialog, setShowScenarioDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPredictions, setSelectedPredictions] = useState([]);

  // Sample AI predictions data
  const predictions = [
    {
      id: 'PRED-001',
      name: 'Q3 2024 Demand Forecast',
      category: 'demand',
      model: 'ensemble',
      confidence: 94,
      accuracy: 92.5,
      status: 'active',
      horizon: '90d',
      lastRun: '2024-03-15',
      nextRun: '2024-03-22',
      predictions: [
        { period: 'Jul 2024', value: 425000, lower: 408000, upper: 442000 },
        { period: 'Aug 2024', value: 438000, lower: 420000, upper: 456000 },
        { period: 'Sep 2024', value: 452000, lower: 433000, upper: 471000 },
      ],
      features: [
        { name: 'Historical Sales', importance: 0.35 },
        { name: 'Seasonality', importance: 0.28 },
        { name: 'Promotions', importance: 0.18 },
        { name: 'Economic Indicators', importance: 0.12 },
        { name: 'Competitor Pricing', importance: 0.07 },
      ],
      insights: [
        'Demand expected to increase 8.2% in Q3',
        'Peak demand predicted in September',
        'Electronics category showing strongest growth',
      ],
      recommendations: [
        'Increase inventory for electronics by 15%',
        'Plan marketing campaigns for August',
        'Secure additional warehouse space',
      ],
      tags: ['demand', 'quarterly', 'ensemble'],
      createdBy: 'AI System',
      createdAt: '2024-03-15',
    },
    {
      id: 'PRED-002',
      name: 'Electronics Sales Prediction',
      category: 'sales',
      model: 'lstm',
      confidence: 91,
      accuracy: 89.8,
      status: 'active',
      horizon: '30d',
      lastRun: '2024-03-15',
      nextRun: '2024-03-22',
      predictions: [
        { period: 'Week 1', value: 145000, lower: 139000, upper: 151000 },
        { period: 'Week 2', value: 152000, lower: 145000, upper: 159000 },
        { period: 'Week 3', value: 158000, lower: 151000, upper: 165000 },
        { period: 'Week 4', value: 165000, lower: 157000, upper: 173000 },
      ],
      features: [
        { name: 'Historical Electronics Sales', importance: 0.42 },
        { name: 'New Product Launches', importance: 0.23 },
        { name: 'Seasonality', importance: 0.18 },
        { name: 'Marketing Spend', importance: 0.12 },
        { name: 'Competitor Activity', importance: 0.05 },
      ],
      insights: [
        'Electronics sales projected to grow 13.8%',
        'New headphone models driving growth',
        'Gaming category showing strong momentum',
      ],
      recommendations: [
        'Increase stock of gaming accessories',
        'Bundle promotions for new headphones',
        'Monitor competitor pricing',
      ],
      tags: ['electronics', 'sales', 'lstm'],
      createdBy: 'AI System',
      createdAt: '2024-03-15',
    },
    {
      id: 'PRED-003',
      name: 'Inventory Optimization Forecast',
      category: 'inventory',
      model: 'prophet',
      confidence: 96,
      accuracy: 94.2,
      status: 'active',
      horizon: '60d',
      lastRun: '2024-03-14',
      nextRun: '2024-03-21',
      predictions: [
        { period: 'Apr 2024', value: 245000, lower: 238000, upper: 252000 },
        { period: 'May 2024', value: 258000, lower: 250000, upper: 266000 },
        { period: 'Jun 2024', value: 272000, lower: 263000, upper: 281000 },
      ],
      features: [
        { name: 'Historical Inventory Levels', importance: 0.38 },
        { name: 'Sales Velocity', importance: 0.32 },
        { name: 'Lead Times', importance: 0.15 },
        { name: 'Seasonality', importance: 0.10 },
        { name: 'Supplier Performance', importance: 0.05 },
      ],
      insights: [
        'Inventory requirements increasing 15%',
        'Safety stock levels need adjustment',
        'Fast-moving items require 20% more stock',
      ],
      recommendations: [
        'Increase reorder quantities for top 100 SKUs',
        'Review safety stock calculations',
        'Optimize warehouse slotting',
      ],
      tags: ['inventory', 'optimization', 'prophet'],
      createdBy: 'AI System',
      createdAt: '2024-03-14',
    },
    {
      id: 'PRED-004',
      name: 'Seasonal Demand Prediction',
      category: 'demand',
      model: 'ensemble',
      confidence: 88,
      accuracy: 86.5,
      status: 'active',
      horizon: '180d',
      lastRun: '2024-03-13',
      nextRun: '2024-03-20',
      predictions: [
        { period: 'Q3 2024', value: 1250000, lower: 1180000, upper: 1320000 },
        { period: 'Q4 2024', value: 1580000, lower: 1490000, upper: 1670000 },
        { period: 'Q1 2025', value: 1120000, lower: 1050000, upper: 1190000 },
      ],
      features: [
        { name: 'Historical Seasonal Patterns', importance: 0.45 },
        { name: 'Holiday Calendar', importance: 0.25 },
        { name: 'Economic Forecasts', importance: 0.15 },
        { name: 'Consumer Trends', importance: 0.10 },
        { name: 'Weather Patterns', importance: 0.05 },
      ],
      insights: [
        'Strong Q4 peak predicted (+26%)',
        'Holiday season starting earlier',
        'Electronics and gifts driving growth',
      ],
      recommendations: [
        'Plan holiday inventory by August',
        'Increase seasonal staffing',
        'Prepare for Black Friday surge',
      ],
      tags: ['seasonal', 'demand', 'ensemble'],
      createdBy: 'AI System',
      createdAt: '2024-03-13',
    },
    {
      id: 'PRED-005',
      name: 'Stockout Risk Prediction',
      category: 'risk',
      model: 'random-forest',
      confidence: 89,
      accuracy: 87.8,
      status: 'active',
      horizon: '30d',
      lastRun: '2024-03-15',
      nextRun: '2024-03-22',
      predictions: [
        { period: 'Week 1', value: 12, lower: 8, upper: 16 },
        { period: 'Week 2', value: 15, lower: 11, upper: 19 },
        { period: 'Week 3', value: 18, lower: 14, upper: 22 },
        { period: 'Week 4', value: 22, lower: 17, upper: 27 },
      ],
      features: [
        { name: 'Current Stock Levels', importance: 0.48 },
        { name: 'Sales Velocity', importance: 0.32 },
        { name: 'Supplier Lead Times', importance: 0.12 },
        { name: 'Reorder Points', importance: 0.08 },
      ],
      insights: [
        'Stockout risk increasing 83% over next month',
        'Electronics category at highest risk',
        'Critical items need immediate attention',
      ],
      recommendations: [
        'Expedite orders for 25 at-risk SKUs',
        'Review reorder points for electronics',
        'Increase safety stock levels',
      ],
      tags: ['risk', 'stockout', 'random-forest'],
      createdBy: 'AI System',
      createdAt: '2024-03-15',
    },
    {
      id: 'PRED-006',
      name: 'Supplier Performance Prediction',
      category: 'supplier',
      model: 'xgboost',
      confidence: 92,
      accuracy: 90.5,
      status: 'active',
      horizon: '90d',
      lastRun: '2024-03-14',
      nextRun: '2024-03-21',
      predictions: [
        { period: 'Apr 2024', value: 94.2, lower: 92.5, upper: 95.9 },
        { period: 'May 2024', value: 93.8, lower: 92.0, upper: 95.6 },
        { period: 'Jun 2024', value: 93.5, lower: 91.7, upper: 95.3 },
      ],
      features: [
        { name: 'Historical On-Time Delivery', importance: 0.52 },
        { name: 'Quality Scores', importance: 0.28 },
        { name: 'Communication Response', importance: 0.12 },
        { name: 'Lead Time Variability', importance: 0.08 },
      ],
      insights: [
        'Supplier performance expected to decline slightly',
        'Tech Supplies Inc showing best performance',
        'Industrial Supplies Co needs improvement',
      ],
      recommendations: [
        'Schedule performance reviews with Industrial Supplies',
        'Consider alternative for critical components',
        'Monitor ChemCorp quality metrics',
      ],
      tags: ['supplier', 'performance', 'xgboost'],
      createdBy: 'AI System',
      createdAt: '2024-03-14',
    },
    {
      id: 'PRED-007',
      name: 'Pricing Optimization Model',
      category: 'pricing',
      model: 'neural-network',
      confidence: 87,
      accuracy: 85.2,
      status: 'active',
      horizon: '30d',
      lastRun: '2024-03-13',
      nextRun: '2024-03-20',
      predictions: [
        { period: 'Week 1', value: 3.2, lower: 2.8, upper: 3.6 },
        { period: 'Week 2', value: 3.5, lower: 3.1, upper: 3.9 },
        { period: 'Week 3', value: 3.8, lower: 3.3, upper: 4.3 },
        { period: 'Week 4', value: 4.2, lower: 3.7, upper: 4.7 },
      ],
      features: [
        { name: 'Historical Pricing', importance: 0.38 },
        { name: 'Competitor Pricing', importance: 0.32 },
        { name: 'Demand Elasticity', importance: 0.18 },
        { name: 'Cost Changes', importance: 0.12 },
      ],
      insights: [
        'Optimal price increase of 4.2% recommended',
        'Electronics category shows highest elasticity',
        'Bundling opportunities identified',
      ],
      recommendations: [
        'Implement 3-5% price increase on top items',
        'Create bundles for complementary products',
        'Monitor competitor response',
      ],
      tags: ['pricing', 'optimization', 'neural-network'],
      createdBy: 'AI System',
      createdAt: '2024-03-13',
    },
    {
      id: 'PRED-008',
      name: 'Warehouse Capacity Forecast',
      category: 'capacity',
      model: 'time-series',
      confidence: 95,
      accuracy: 93.8,
      status: 'active',
      horizon: '180d',
      lastRun: '2024-03-12',
      nextRun: '2024-03-19',
      predictions: [
        { period: 'Q2 2024', value: 78.5, lower: 76.2, upper: 80.8 },
        { period: 'Q3 2024', value: 82.3, lower: 79.5, upper: 85.1 },
        { period: 'Q4 2024', value: 89.7, lower: 86.5, upper: 92.9 },
      ],
      features: [
        { name: 'Current Utilization', importance: 0.42 },
        { name: 'Inventory Growth', importance: 0.35 },
        { name: 'Seasonal Peaks', importance: 0.15 },
        { name: 'New Product Launches', importance: 0.08 },
      ],
      insights: [
        'Warehouse capacity to reach 89.7% by Q4',
        'Peak utilization expected in November',
        'Warehouse A nearing capacity',
      ],
      recommendations: [
        'Plan warehouse expansion by Q3',
        'Optimize slotting for efficiency',
        'Consider off-site storage for slow-movers',
      ],
      tags: ['warehouse', 'capacity', 'time-series'],
      createdBy: 'AI System',
      createdAt: '2024-03-12',
    },
  ];

  // Models
  const models = [
    { id: 'all', name: 'All Models' },
    { id: 'ensemble', name: 'Ensemble' },
    { id: 'lstm', name: 'LSTM' },
    { id: 'prophet', name: 'Prophet' },
    { id: 'random-forest', name: 'Random Forest' },
    { id: 'xgboost', name: 'XGBoost' },
    { id: 'neural-network', name: 'Neural Network' },
    { id: 'time-series', name: 'Time Series' },
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'demand', name: 'Demand' },
    { id: 'sales', name: 'Sales' },
    { id: 'inventory', name: 'Inventory' },
    { id: 'risk', name: 'Risk' },
    { id: 'supplier', name: 'Supplier' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'capacity', name: 'Capacity' },
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

  const getModelIcon = (model) => {
    switch(model) {
      case 'ensemble': return <Brain size={14} className="text-purple-600" />;
      case 'lstm': return <Cpu size={14} className="text-blue-600" />;
      case 'prophet': return <Sparkles size={14} className="text-yellow-600" />;
      case 'random-forest': return <GitBranch size={14} className="text-green-600" />;
      case 'xgboost': return <Zap size={14} className="text-orange-600" />;
      case 'neural-network': return <Brain size={14} className="text-red-600" />;
      case 'time-series': return <LineChart size={14} className="text-cyan-600" />;
      default: return <Brain size={14} className="text-gray-600" />;
    }
  };

  const getModelColor = (model) => {
    switch(model) {
      case 'ensemble': return 'bg-purple-100 text-purple-700';
      case 'lstm': return 'bg-blue-100 text-blue-700';
      case 'prophet': return 'bg-yellow-100 text-yellow-700';
      case 'random-forest': return 'bg-green-100 text-green-700';
      case 'xgboost': return 'bg-orange-100 text-orange-700';
      case 'neural-network': return 'bg-red-100 text-red-700';
      case 'time-series': return 'bg-cyan-100 text-cyan-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return 'text-green-600';
    if (confidence >= 90) return 'text-blue-600';
    if (confidence >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBg = (confidence) => {
    if (confidence >= 95) return 'bg-green-500';
    if (confidence >= 90) return 'bg-blue-500';
    if (confidence >= 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredPredictions = predictions.filter(pred => {
    const matchesModel = selectedModel === 'all' || pred.model === selectedModel;
    const matchesConfidence = selectedConfidence === 'all' || 
      (selectedConfidence === 'high' && pred.confidence >= 95) ||
      (selectedConfidence === 'medium' && pred.confidence >= 85 && pred.confidence < 95) ||
      (selectedConfidence === 'low' && pred.confidence < 85);
    const matchesSearch = pred.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pred.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pred.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesModel && matchesConfidence && matchesSearch;
  });

  const stats = {
    total: predictions.length,
    highConfidence: predictions.filter(p => p.confidence >= 95).length,
    mediumConfidence: predictions.filter(p => p.confidence >= 85 && p.confidence < 95).length,
    lowConfidence: predictions.filter(p => p.confidence < 85).length,
    avgConfidence: Math.round(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length),
    avgAccuracy: (predictions.reduce((sum, p) => sum + p.accuracy, 0) / predictions.length).toFixed(1),
  };

  const handleSelectAll = () => {
    if (selectedPredictions.length === filteredPredictions.length) {
      setSelectedPredictions([]);
    } else {
      setSelectedPredictions(filteredPredictions.map(p => p.id));
    }
  };

  const handleSelectPrediction = (id) => {
    if (selectedPredictions.includes(id)) {
      setSelectedPredictions(selectedPredictions.filter(p => p !== id));
    } else {
      setSelectedPredictions([...selectedPredictions, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">AI Predictions</h1>
            <p className="text-black/50 mt-1">AI-powered forecasts and predictive analytics</p>
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
              onClick={() => setShowExplainDialog(true)}
            >
              <Lightbulb size={16} />
              Explain
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowTrainDialog(true)}
            >
              <Brain size={16} />
              Train Model
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Models</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Brain size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">High Confidence</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.highConfidence}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <TrendingUp size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Medium Confidence</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.mediumConfidence}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Activity size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Confidence</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.avgConfidence}%</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Target size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Avg Accuracy</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.avgAccuracy}%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Award size={18} className="text-purple-600" />
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
              placeholder="Search by name, category, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

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

          <Select value={selectedConfidence} onValueChange={setSelectedConfidence}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Confidence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Confidence</SelectItem>
              <SelectItem value="high">High (≥95%)</SelectItem>
              <SelectItem value="medium">Medium (85-94%)</SelectItem>
              <SelectItem value="low">Low ({'<'}85%)</SelectItem>
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
      {selectedPredictions.length > 0 && (
        <div className="bg-[#F5EEE9] rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">{selectedPredictions.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedPredictions([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <Brain size={14} className="mr-2" />
              Compare
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Lightbulb size={14} className="mr-2" />
              Explain
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Predictions Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredPredictions.map((pred) => (
            <Card key={pred.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={cn("text-xs", getModelColor(pred.model))}>
                          {getModelIcon(pred.model)}
                          <span className="ml-1">{pred.model}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {pred.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-black">{pred.name}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedPrediction(pred);
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
                          <Brain className="mr-2 h-4 w-4" />
                          Explain
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Retrain
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Predictions Summary */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-black/50">Next Period</span>
                      <span className="text-sm font-bold">${pred.predictions[0].value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-black/50">
                      <span>Range: ${pred.predictions[0].lower.toLocaleString()} - ${pred.predictions[0].upper.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Confidence & Accuracy */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="p-2 bg-[#F5EEE9]/30 rounded">
                      <p className="text-[8px] text-black/50">Confidence</p>
                      <div className="flex items-center gap-1">
                        <div className={cn("w-2 h-2 rounded-full", getConfidenceBg(pred.confidence))} />
                        <span className={cn("text-xs font-medium", getConfidenceColor(pred.confidence))}>
                          {pred.confidence}%
                        </span>
                      </div>
                    </div>
                    <div className="p-2 bg-[#F5EEE9]/30 rounded">
                      <p className="text-[8px] text-black/50">Accuracy</p>
                      <span className="text-xs font-medium">{pred.accuracy}%</span>
                    </div>
                  </div>

                  {/* Horizon */}
                  <div className="flex items-center gap-2 text-[10px] text-black/70 mb-2">
                    <Clock size={10} />
                    <span>Horizon: {pred.horizon}</span>
                    <span className="text-black/30">•</span>
                    <Calendar size={10} />
                    <span>Last: {pred.lastRun}</span>
                  </div>

                  {/* Insights Preview */}
                  <div className="mb-2">
                    <p className="text-[8px] text-black/50 mb-1">Key Insight</p>
                    <p className="text-[10px] text-black/70 line-clamp-1">{pred.insights[0]}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {pred.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[8px] border-[#F5EEE9]">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                    <span>Next run: {pred.nextRun}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-[#F5EEE9]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                  <TableHead className="w-8">
                    <Checkbox 
                      checked={selectedPredictions.length === filteredPredictions.length && filteredPredictions.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-black/50">Prediction</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Model</TableHead>
                  <TableHead className="text-black/50 text-right">Next Period</TableHead>
                  <TableHead className="text-black/50 text-right">Confidence</TableHead>
                  <TableHead className="text-black/50 text-right">Accuracy</TableHead>
                  <TableHead className="text-black/50">Horizon</TableHead>
                  <TableHead className="text-black/50">Last Run</TableHead>
                  <TableHead className="text-black/50">Next Run</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPredictions.map((pred) => (
                  <TableRow key={pred.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox 
                        checked={selectedPredictions.includes(pred.id)}
                        onCheckedChange={() => handleSelectPrediction(pred.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{pred.name}</TableCell>
                    <TableCell className="capitalize">{pred.category}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getModelColor(pred.model))}>
                        {pred.model}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${pred.predictions[0].value.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cn("font-medium", getConfidenceColor(pred.confidence))}>
                        {pred.confidence}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{pred.accuracy}%</TableCell>
                    <TableCell>{pred.horizon}</TableCell>
                    <TableCell className="text-xs">{pred.lastRun}</TableCell>
                    <TableCell className="text-xs">{pred.nextRun}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedPrediction(pred);
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
                Showing {filteredPredictions.length} of {predictions.length} predictions
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

      {/* Prediction Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>AI Prediction Details</DialogTitle>
          </DialogHeader>

          {selectedPrediction && (
            <div className="py-4">
              <Tabs defaultValue="predictions">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="predictions">Predictions</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="explain">Explain</TabsTrigger>
                </TabsList>

                <TabsContent value="predictions" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedPrediction.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={cn("text-xs", getModelColor(selectedPrediction.model))}>
                          {selectedPrediction.model}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          {selectedPrediction.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-black/50">Confidence</p>
                      <p className={cn("text-2xl font-bold", getConfidenceColor(selectedPrediction.confidence))}>
                        {selectedPrediction.confidence}%
                      </p>
                    </div>
                  </div>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Forecast Values</p>
                      <div className="space-y-3">
                        {selectedPrediction.predictions.map((pred, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{pred.period}</span>
                            <div className="text-right">
                              <p className="text-sm font-bold">${pred.value.toLocaleString()}</p>
                              <p className="text-xs text-black/50">
                                Range: ${pred.lower.toLocaleString()} - ${pred.upper.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Model Accuracy</p>
                      <p className="text-lg font-bold">{selectedPrediction.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Horizon</p>
                      <p className="text-lg font-bold">{selectedPrediction.horizon}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                  <p className="text-sm font-medium">Feature Importance</p>
                  <div className="space-y-3">
                    {selectedPrediction.features.map((feature, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{feature.name}</span>
                          <span className="text-sm font-medium">{(feature.importance * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={feature.importance * 100} className="h-2 bg-[#F5EEE9]" />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4">
                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Key Insights</p>
                      <ul className="space-y-2">
                        {selectedPrediction.insights.map((insight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Lightbulb size={14} className="text-yellow-600 mt-0.5" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Recommendations</p>
                      <ul className="space-y-2">
                        {selectedPrediction.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Target size={14} className="text-blue-600 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="explain" className="space-y-4">
                  <Card className="border-[#F5EEE9] bg-blue-50">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-blue-700 mb-2">Model Explanation</p>
                      <p className="text-sm text-blue-600">
                        This {selectedPrediction.model} model analyzes historical data patterns to generate predictions.
                        The model considers multiple factors including seasonality, trends, and external variables.
                        Confidence intervals represent the range where actual values are expected to fall 95% of the time.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F5EEE9]">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Feature Contributions</p>
                      <div className="space-y-2">
                        {selectedPrediction.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-24 text-xs">{feature.name}</div>
                            <div className="flex-1 h-2 bg-[#F5EEE9] rounded-full">
                              <div 
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${feature.importance * 100}%` }}
                              />
                            </div>
                            <div className="w-12 text-xs text-right">{(feature.importance * 100).toFixed(0)}%</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-xs text-yellow-700">
                      This model was last trained on {selectedPrediction.lastRun} and achieves {selectedPrediction.accuracy}% accuracy on historical data.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Brain className="mr-2 h-4 w-4" />
              Retrain Model
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Train Model Dialog */}
      <Dialog open={showTrainDialog} onOpenChange={setShowTrainDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Train AI Model</DialogTitle>
            <DialogDescription>
              Configure and train a new prediction model
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Model Type</Label>
              <Select defaultValue="ensemble">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ensemble">Ensemble (Recommended)</SelectItem>
                  <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                  <SelectItem value="prophet">Prophet</SelectItem>
                  <SelectItem value="random-forest">Random Forest</SelectItem>
                  <SelectItem value="xgboost">XGBoost</SelectItem>
                  <SelectItem value="time-series">Time Series</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Prediction Target</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Training Data Range</Label>
              <Select defaultValue="2y">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                  <SelectItem value="2y">Last 2 Years</SelectItem>
                  <SelectItem value="3y">Last 3 Years</SelectItem>
                  <SelectItem value="5y">Last 5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Features to Include</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="historical" defaultChecked />
                  <Label htmlFor="historical">Historical Sales</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="seasonality" defaultChecked />
                  <Label htmlFor="seasonality">Seasonality</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="promotions" defaultChecked />
                  <Label htmlFor="promotions">Promotions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="economic" />
                  <Label htmlFor="economic">Economic Indicators</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="competitor" />
                  <Label htmlFor="competitor">Competitor Data</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Validation Split</Label>
              <Slider defaultValue={[20]} max={30} step={5} />
              <div className="flex items-center justify-between text-xs text-black/50">
                <span>Training: 80%</span>
                <span>Validation: 20%</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                Training time: Approximately 5-10 minutes depending on data size.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTrainDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Brain className="mr-2 h-4 w-4" />
              Start Training
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
                onClick={() => setShowTrainDialog(true)}
              >
                <Brain size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Train Model</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowExplainDialog(true)}
              >
                <Lightbulb size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Explain</TooltipContent>
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

export default AIPredictionsPage;