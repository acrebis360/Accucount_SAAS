// app/dashboard/api-docs/page.js
'use client';

import { useState, useMemo } from 'react';
import {
  BookOpen,
  Code,
  Terminal,
  Server,
  Database,
  Shield,
  Key,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Copy,
  Check,
  Play,
  RefreshCw,
  Search,
  Filter,
  Download,
  Printer,
  Mail,
  Share2,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Zap,
  Layers,
  Package,
  ClipboardList,
  Users,
  Settings,
  BarChart3,
  Activity,
  Webhook,
  Link2,
  FileText,
  Mail as MailIcon,
  Phone,
  MapPin,
  Building2,
  User,
  Tag,
  Hash,
  DollarSign,
  Percent,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Trash2,
  Edit,
  Plus,
  Eye,
  EyeOff,
  Info,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  Star,
  StarOff,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

const ApiDocsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [testResponse, setTestResponse] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testParams, setTestParams] = useState({});
  const [copiedCode, setCopiedCode] = useState(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(null);
  const [feedbackComment, setFeedbackComment] = useState('');

  // API Endpoints Data
  const apiEndpoints = [
    {
      id: 'get-inventory',
      name: 'Get Inventory Items',
      method: 'GET',
      path: '/v1/inventory',
      category: 'inventory',
      description: 'Retrieve a list of inventory items with optional filtering',
      authentication: 'required',
      rateLimit: '1000 requests/minute',
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Page number for pagination', default: 1 },
        { name: 'limit', type: 'integer', required: false, description: 'Number of items per page', default: 20, max: 100 },
        { name: 'location', type: 'string', required: false, description: 'Filter by location ID', example: 'LOC-001' },
        { name: 'category', type: 'string', required: false, description: 'Filter by category', example: 'Electronics' },
        { name: 'status', type: 'string', required: false, description: 'Filter by status', enum: ['in_stock', 'low_stock', 'out_of_stock'] },
        { name: 'search', type: 'string', required: false, description: 'Search by SKU or description' },
      ],
      response: {
        success: {
          status: 200,
          example: {
            status: 'success',
            data: {
              items: [
                {
                  id: 'inv_123',
                  sku: 'SKU-001',
                  name: 'Wireless Headphones',
                  quantity: 250,
                  location: 'Warehouse A',
                  category: 'Electronics',
                  status: 'in_stock',
                  createdAt: '2024-12-01T10:00:00Z',
                  updatedAt: '2024-12-20T15:30:00Z',
                }
              ],
              pagination: {
                page: 1,
                limit: 20,
                total: 150,
                pages: 8,
              }
            }
          }
        },
        errors: [
          { status: 401, description: 'Unauthorized - Invalid API key' },
          { status: 429, description: 'Too Many Requests - Rate limit exceeded' },
        ]
      },
      codeExamples: {
        curl: `curl -X GET "https://api.accucount.com/v1/inventory?page=1&limit=20" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
        javascript: `const response = await fetch('https://api.accucount.com/v1/inventory?page=1&limit=20', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const data = await response.json();
console.log(data);`,
        python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

params = {
    'page': 1,
    'limit': 20
}

response = requests.get(
    'https://api.accucount.com/v1/inventory',
    headers=headers,
    params=params
)
data = response.json()
print(data)`,
      }
    },
    {
      id: 'get-inventory-by-id',
      name: 'Get Inventory Item',
      method: 'GET',
      path: '/v1/inventory/{id}',
      category: 'inventory',
      description: 'Retrieve a single inventory item by ID',
      authentication: 'required',
      rateLimit: '1000 requests/minute',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Inventory item ID', example: 'inv_123', in: 'path' },
      ],
      response: {
        success: {
          status: 200,
          example: {
            status: 'success',
            data: {
              id: 'inv_123',
              sku: 'SKU-001',
              name: 'Wireless Headphones',
              description: 'High-quality wireless headphones with noise cancellation',
              quantity: 250,
              unit: 'pcs',
              unitCost: 49.99,
              totalValue: 12497.50,
              location: 'Warehouse A',
              zone: 'Zone 1',
              bin: 'A-01-01',
              category: 'Electronics',
              status: 'in_stock',
              createdAt: '2024-12-01T10:00:00Z',
              updatedAt: '2024-12-20T15:30:00Z',
            }
          }
        }
      },
      codeExamples: {
        curl: `curl -X GET "https://api.accucount.com/v1/inventory/inv_123" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
        javascript: `const response = await fetch('https://api.accucount.com/v1/inventory/inv_123', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const data = await response.json();
console.log(data);`,
      }
    },
    {
      id: 'create-stocktake',
      name: 'Create Stocktake',
      method: 'POST',
      path: '/v1/stocktake',
      category: 'stocktake',
      description: 'Create a new stocktake event',
      authentication: 'required',
      rateLimit: '100 requests/minute',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Stocktake name', example: 'December Cycle Count' },
        { name: 'location', type: 'string', required: true, description: 'Location ID', example: 'LOC-001' },
        { name: 'type', type: 'string', required: true, description: 'Stocktake type', enum: ['full', 'zone', 'cycle'], example: 'cycle' },
        { name: 'scheduledDate', type: 'string', required: false, description: 'Scheduled date (ISO 8601)', example: '2024-12-25T09:00:00Z' },
        { name: 'team', type: 'array', required: false, description: 'Team member IDs', example: ['user_001', 'user_002'] },
      ],
      requestBody: {
        example: {
          name: 'December Cycle Count',
          location: 'LOC-001',
          type: 'cycle',
          scheduledDate: '2024-12-25T09:00:00Z',
          team: ['user_001', 'user_002']
        }
      },
      response: {
        success: {
          status: 201,
          example: {
            status: 'success',
            data: {
              id: 'st_123',
              name: 'December Cycle Count',
              location: 'Warehouse A',
              type: 'cycle',
              status: 'scheduled',
              scheduledDate: '2024-12-25T09:00:00Z',
              createdAt: '2024-12-20T10:00:00Z',
            }
          }
        }
      },
      codeExamples: {
        curl: `curl -X POST "https://api.accucount.com/v1/stocktake" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "December Cycle Count",
    "location": "LOC-001",
    "type": "cycle",
    "scheduledDate": "2024-12-25T09:00:00Z"
  }'`,
        javascript: `const response = await fetch('https://api.accucount.com/v1/stocktake', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'December Cycle Count',
    location: 'LOC-001',
    type: 'cycle',
    scheduledDate: '2024-12-25T09:00:00Z'
  })
});
const data = await response.json();
console.log(data);`,
      }
    },
    {
      id: 'update-inventory',
      name: 'Update Inventory Item',
      method: 'PUT',
      path: '/v1/inventory/{id}',
      category: 'inventory',
      description: 'Update an existing inventory item',
      authentication: 'required',
      rateLimit: '500 requests/minute',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Inventory item ID', in: 'path' },
      ],
      requestBody: {
        example: {
          quantity: 275,
          unitCost: 52.99,
          status: 'low_stock',
        }
      },
      response: {
        success: {
          status: 200,
          example: {
            status: 'success',
            data: {
              id: 'inv_123',
              sku: 'SKU-001',
              quantity: 275,
              unitCost: 52.99,
              totalValue: 14572.25,
              status: 'low_stock',
              updatedAt: '2024-12-20T16:00:00Z',
            }
          }
        }
      },
      codeExamples: {
        curl: `curl -X PUT "https://api.accucount.com/v1/inventory/inv_123" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "quantity": 275,
    "unitCost": 52.99
  }'`,
      }
    },
    {
      id: 'get-stocktake-results',
      name: 'Get Stocktake Results',
      method: 'GET',
      path: '/v1/stocktake/{id}/results',
      category: 'stocktake',
      description: 'Retrieve results of a completed stocktake',
      authentication: 'required',
      rateLimit: '500 requests/minute',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Stocktake ID', in: 'path' },
      ],
      response: {
        success: {
          status: 200,
          example: {
            status: 'success',
            data: {
              id: 'st_123',
              name: 'December Cycle Count',
              status: 'completed',
              totalItems: 1250,
              countedItems: 1250,
              accuracy: 99.2,
              discrepancies: 8,
              varianceValue: 1250.50,
              completedAt: '2024-12-25T15:30:00Z',
              results: [
                {
                  sku: 'SKU-001',
                  expected: 250,
                  actual: 245,
                  variance: -5,
                  value: 62.50,
                }
              ]
            }
          }
        }
      },
      codeExamples: {
        curl: `curl -X GET "https://api.accucount.com/v1/stocktake/st_123/results" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      }
    },
    {
      id: 'create-webhook',
      name: 'Create Webhook',
      method: 'POST',
      path: '/v1/webhooks',
      category: 'webhooks',
      description: 'Register a webhook endpoint for real-time notifications',
      authentication: 'required',
      rateLimit: '50 requests/minute',
      parameters: [
        { name: 'url', type: 'string', required: true, description: 'Webhook URL', example: 'https://your-app.com/webhook' },
        { name: 'events', type: 'array', required: true, description: 'Events to subscribe to', enum: ['stocktake.completed', 'inventory.updated', 'discrepancy.created'] },
        { name: 'secret', type: 'string', required: false, description: 'Secret for signature verification' },
      ],
      requestBody: {
        example: {
          url: 'https://your-app.com/webhook',
          events: ['stocktake.completed', 'inventory.updated'],
          secret: 'your_webhook_secret'
        }
      },
      response: {
        success: {
          status: 201,
          example: {
            status: 'success',
            data: {
              id: 'wh_123',
              url: 'https://your-app.com/webhook',
              events: ['stocktake.completed', 'inventory.updated'],
              createdAt: '2024-12-20T10:00:00Z',
            }
          }
        }
      }
    },
    {
      id: 'get-analytics',
      name: 'Get Analytics Data',
      method: 'GET',
      path: '/v1/analytics',
      category: 'analytics',
      description: 'Retrieve inventory analytics and insights',
      authentication: 'required',
      rateLimit: '200 requests/minute',
      parameters: [
        { name: 'startDate', type: 'string', required: true, description: 'Start date (ISO 8601)', example: '2024-12-01T00:00:00Z' },
        { name: 'endDate', type: 'string', required: true, description: 'End date (ISO 8601)', example: '2024-12-31T23:59:59Z' },
        { name: 'metrics', type: 'array', required: false, description: 'Metrics to include', enum: ['accuracy', 'discrepancies', 'value', 'items'] },
        { name: 'groupBy', type: 'string', required: false, description: 'Group by dimension', enum: ['day', 'week', 'month', 'location', 'category'] },
      ],
      response: {
        success: {
          status: 200,
          example: {
            status: 'success',
            data: {
              metrics: {
                totalStocktakes: 42,
                averageAccuracy: 99.2,
                totalDiscrepancies: 18,
                totalValue: 2580000,
              },
              trends: [
                { date: '2024-12-01', accuracy: 98.5, value: 2450000 },
                { date: '2024-12-08', accuracy: 98.9, value: 2510000 },
                { date: '2024-12-15', accuracy: 99.1, value: 2540000 },
                { date: '2024-12-22', accuracy: 99.4, value: 2580000 },
              ]
            }
          }
        }
      }
    }
  ];

  // Category configuration
  const categories = [
    { id: 'all', label: 'All Endpoints', icon: Layers },
    { id: 'inventory', label: 'Inventory', icon: Package, count: 3 },
    { id: 'stocktake', label: 'Stocktake', icon: ClipboardList, count: 2 },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook, count: 1 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, count: 1 },
  ];

  const methodColors = {
    GET: 'bg-green-100 text-green-700 border-green-200',
    POST: 'bg-blue-100 text-blue-700 border-blue-200',
    PUT: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    DELETE: 'bg-red-100 text-red-700 border-red-200',
    PATCH: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  const getMethodBadge = (method) => {
    return (
      <Badge className={cn("font-mono font-semibold border", methodColors[method] || "bg-gray-100 text-gray-700")}>
        {method}
      </Badge>
    );
  };

  // Filter endpoints
  const filteredEndpoints = apiEndpoints.filter(endpoint => {
    const matchesSearch = 
      endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || endpoint.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyCode = (code, language) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(`${language}-${Date.now()}`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleTestEndpoint = async (endpoint) => {
    setIsTesting(true);
    setTestResponse(null);
    
    // Mock API test - simulate response
    setTimeout(() => {
      setTestResponse({
        status: 200,
        data: {
          status: 'success',
          message: 'Test successful!',
          data: endpoint.response.success.example
        },
        time: Math.random() * 200 + 50,
      });
      setIsTesting(false);
    }, 800);
  };

  const handleSendFeedback = () => {
    console.log('Feedback:', { rating: feedbackRating, comment: feedbackComment });
    setShowFeedbackDialog(false);
    setFeedbackRating(null);
    setFeedbackComment('');
  };

  const apiCategories = [
    { name: 'Authentication', icon: Key, description: 'API key management and authentication' },
    { name: 'Inventory', icon: Package, description: 'Manage inventory items and stock levels' },
    { name: 'Stocktake', icon: ClipboardList, description: 'Create and manage stocktake events' },
    { name: 'Webhooks', icon: Webhook, description: 'Real-time notifications and events' },
    { name: 'Analytics', icon: BarChart3, description: 'Get insights and analytics data' },
    { name: 'Reports', icon: FileText, description: 'Generate and download reports' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={28} className="text-red-600" />
              <h1 className="text-3xl font-bold text-black">API Documentation</h1>
            </div>
            <p className="text-black/60 text-md max-w-2xl">
              Complete reference for the AccuCount API. Integrate inventory management, 
              stocktaking, and analytics into your applications.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-[#F5EEE9] gap-2" onClick={() => window.print()}>
              <Printer size={16} />
              Print
            </Button>
            <Button variant="outline" className="border-[#F5EEE9] gap-2">
              <Download size={16} />
              Download PDF
            </Button>
          </div>
        </div>

        {/* API Key Quick Access */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-[#F5EEE9] shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key size={20} className="text-red-600" />
              <div>
                <h3 className="font-semibold text-black">Test with your API Key</h3>
                <p className="text-xs text-black/50">Use your API key to test endpoints directly</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-80 pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Key size={14} className="mr-2" />
                Get API Key
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-80 border-r border-[#F5EEE9] bg-[#F5EEE9]/20 p-6">
          <div className="space-y-6">
            <div>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={16} />
                <Input
                  placeholder="Search endpoints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-[#F5EEE9]"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all",
                        isActive 
                          ? "bg-red-600 text-white" 
                          : "hover:bg-[#F5EEE9] text-black"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} />
                        <span>{category.label}</span>
                      </div>
                      {category.count && (
                        <Badge className={cn(
                          "text-xs",
                          isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                        )}>
                          {category.count}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-black mb-3">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 text-sm text-black/70 hover:text-red-600 transition-colors">
                  <FileText size={14} />
                  Getting Started
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-black/70 hover:text-red-600 transition-colors">
                  <Shield size={14} />
                  Authentication
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-black/70 hover:text-red-600 transition-colors">
                  <AlertCircle size={14} />
                  Error Codes
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-black/70 hover:text-red-600 transition-colors">
                  <Zap size={14} />
                  Rate Limits
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-black/70 hover:text-red-600 transition-colors">
                  <Webhook size={14} />
                  Webhooks
                </a>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-black mb-3">SDKs & Libraries</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 text-sm text-black/70 hover:text-red-600 transition-colors">
                  <Code size={14} />
                  JavaScript / Node.js
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-black/70 hover:text-red-600 transition-colors">
                  <Terminal size={14} />
                  Python
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-black/70 hover:text-red-600 transition-colors">
                  <Server size={14} />
                  PHP
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-black/70 hover:text-red-600 transition-colors">
                  <Database size={14} />
                  Ruby
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-[#F5EEE9] mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="testing">API Testing</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Quick Start */}
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>
                    Get up and running with the AccuCount API in minutes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <h3 className="font-semibold mb-2">1. Get your API Key</h3>
                    <p className="text-sm text-black/70 mb-3">
                      Navigate to <strong>Settings → API Keys</strong> to generate your API key.
                    </p>
                    <Button variant="outline" size="sm">
                      <Key size={14} className="mr-2" />
                      Generate API Key
                    </Button>
                  </div>
                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <h3 className="font-semibold mb-2">2. Make your first request</h3>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
                      <code>{`curl -X GET "https://api.accucount.com/v1/inventory" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 text-red-600"
                      onClick={() => handleCopyCode(`curl -X GET "https://api.accucount.com/v1/inventory" \\\n  -H "Authorization: Bearer YOUR_API_KEY"`, 'curl')}
                    >
                      {copiedCode?.startsWith('curl') ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                      Copy
                    </Button>
                  </div>
                  <div className="p-4 bg-[#F5EEE9] rounded-lg">
                    <h3 className="font-semibold mb-2">3. Base URL</h3>
                    <code className="text-sm bg-white px-3 py-1 rounded">https://api.accucount.com/v1</code>
                    <p className="text-xs text-black/50 mt-2">All API requests should be made to this base URL.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Authentication */}
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>
                    All API requests require authentication using Bearer tokens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-black/70">
                      Include your API key in the Authorization header:
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm">
                      <code>Authorization: Bearer YOUR_API_KEY</code>
                    </pre>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-yellow-600" />
                        <span className="text-sm text-yellow-700">Security Best Practice</span>
                      </div>
                      <p className="text-xs text-yellow-600/70 mt-1">
                        Never expose your API key in client-side code. Always keep it secure on your backend servers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rate Limits */}
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>Rate Limits</CardTitle>
                  <CardDescription>
                    Understand our rate limiting policies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-[#F5EEE9] rounded-lg">
                      <p className="text-xs text-black/50">Default</p>
                      <p className="text-xl font-bold">1,000</p>
                      <p className="text-xs">requests/minute</p>
                    </div>
                    <div className="text-center p-3 bg-[#F5EEE9] rounded-lg">
                      <p className="text-xs text-black/50">Enterprise</p>
                      <p className="text-xl font-bold">5,000</p>
                      <p className="text-xs">requests/minute</p>
                    </div>
                    <div className="text-center p-3 bg-[#F5EEE9] rounded-lg">
                      <p className="text-xs text-black/50">Burst Limit</p>
                      <p className="text-xl font-bold">100</p>
                      <p className="text-xs">requests/second</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Info size={14} className="text-blue-600" />
                      <span className="text-sm text-blue-700">Rate Limit Headers</span>
                    </div>
                    <p className="text-xs text-blue-600/70 mt-1">
                      Check response headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* API Categories */}
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>API Categories</CardTitle>
                  <CardDescription>
                    Explore our comprehensive API offerings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {apiCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <div key={category.name} className="p-4 border border-[#F5EEE9] rounded-lg hover:shadow-md transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-red-50 rounded-lg">
                              <Icon size={16} className="text-red-600" />
                            </div>
                            <h3 className="font-semibold text-black">{category.name}</h3>
                          </div>
                          <p className="text-xs text-black/50">{category.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-4">
              {filteredEndpoints.map((endpoint) => (
                <Card key={endpoint.id} className="border-[#F5EEE9] overflow-hidden">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setExpandedEndpoint(expandedEndpoint === endpoint.id ? null : endpoint.id)}
                  >
                    <div className="p-4 flex items-center justify-between hover:bg-[#F5EEE9]/30 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        {getMethodBadge(endpoint.method)}
                        <code className="text-sm font-mono text-black">{endpoint.path}</code>
                        <Badge variant="outline" className="bg-gray-50">
                          {endpoint.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-black/50">{endpoint.rateLimit}</span>
                        {expandedEndpoint === endpoint.id ? 
                          <ChevronUp size={16} className="text-black/50" /> : 
                          <ChevronDown size={16} className="text-black/50" />
                        }
                      </div>
                    </div>
                  </div>
                  
                  {expandedEndpoint === endpoint.id && (
                    <div className="border-t border-[#F5EEE9] p-4 space-y-4">
                      <p className="text-sm text-black/70">{endpoint.description}</p>
                      
                      {/* Parameters */}
                      {endpoint.parameters && endpoint.parameters.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Parameters</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-[#F5EEE9]">
                                <tr>
                                  <th className="text-left p-2">Name</th>
                                  <th className="text-left p-2">Type</th>
                                  <th className="text-left p-2">Required</th>
                                  <th className="text-left p-2">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {endpoint.parameters.map((param, idx) => (
                                  <tr key={idx} className="border-b border-[#F5EEE9]">
                                    <td className="p-2 font-mono text-xs">{param.name}</td>
                                    <td className="p-2 text-xs">{param.type}</td>
                                    <td className="p-2">
                                      {param.required ? 
                                        <Badge className="bg-red-100 text-red-700">Required</Badge> : 
                                        <Badge className="bg-gray-100 text-gray-600">Optional</Badge>
                                      }
                                    </td>
                                    <td className="p-2 text-xs text-black/70">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Request Body */}
                      {endpoint.requestBody && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Request Body</h4>
                          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                            {JSON.stringify(endpoint.requestBody.example, null, 2)}
                          </pre>
                        </div>
                      )}

                      {/* Response Example */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Response Example</h4>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                          {JSON.stringify(endpoint.response.success.example, null, 2)}
                        </pre>
                      </div>

                      {/* Code Examples */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Code Examples</h4>
                        <Tabs defaultValue="curl" className="w-full">
                          <TabsList className="bg-[#F5EEE9]">
                            <TabsTrigger value="curl">cURL</TabsTrigger>
                            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                            <TabsTrigger value="python">Python</TabsTrigger>
                          </TabsList>
                          <TabsContent value="curl" className="mt-2">
                            <div className="relative">
                              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                                <code>{endpoint.codeExamples?.curl}</code>
                              </pre>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-7 w-7 bg-gray-800 hover:bg-gray-700"
                                onClick={() => handleCopyCode(endpoint.codeExamples?.curl, 'curl')}
                              >
                                {copiedCode?.startsWith('curl') ? <Check size={14} /> : <Copy size={14} />}
                              </Button>
                            </div>
                          </TabsContent>
                          <TabsContent value="javascript" className="mt-2">
                            <div className="relative">
                              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                                <code>{endpoint.codeExamples?.javascript}</code>
                              </pre>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-7 w-7 bg-gray-800 hover:bg-gray-700"
                                onClick={() => handleCopyCode(endpoint.codeExamples?.javascript, 'js')}
                              >
                                {copiedCode?.startsWith('js') ? <Check size={14} /> : <Copy size={14} />}
                              </Button>
                            </div>
                          </TabsContent>
                          <TabsContent value="python" className="mt-2">
                            <div className="relative">
                              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                                <code>{endpoint.codeExamples?.python}</code>
                              </pre>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-7 w-7 bg-gray-800 hover:bg-gray-700"
                                onClick={() => handleCopyCode(endpoint.codeExamples?.python, 'py')}
                              >
                                {copiedCode?.startsWith('py') ? <Check size={14} /> : <Copy size={14} />}
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      {/* Test Button */}
                      {apiKey && (
                        <div className="pt-2">
                          <Button 
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleTestEndpoint(endpoint)}
                            disabled={isTesting}
                          >
                            {isTesting ? (
                              <>
                                <RefreshCw size={14} className="mr-2 animate-spin" />
                                Testing...
                              </>
                            ) : (
                              <>
                                <Play size={14} className="mr-2" />
                                Test Endpoint
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}

              {filteredEndpoints.length === 0 && (
                <Card className="border-[#F5EEE9]">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Search size={48} className="text-black/20 mb-3" />
                    <p className="text-black/50">No endpoints found</p>
                    <p className="text-xs text-black/40 mt-1">Try adjusting your search or filter</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="testing" className="space-y-6">
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>API Testing Console</CardTitle>
                  <CardDescription>
                    Test API endpoints directly from the documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-[#F5EEE9] rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Key size={14} className="text-red-600" />
                        <span className="text-sm font-medium">API Key Required</span>
                      </div>
                      <p className="text-xs text-black/50">
                        Enter your API key in the header section above to test endpoints.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Select Endpoint to Test</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an endpoint" />
                        </SelectTrigger>
                        <SelectContent>
                          {apiEndpoints.map(endpoint => (
                            <SelectItem key={endpoint.id} value={endpoint.id}>
                              {endpoint.method} {endpoint.path}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Parameters (JSON)</Label>
                      <Textarea
                        placeholder='{"page": 1, "limit": 20}'
                        rows={5}
                        className="font-mono text-sm"
                      />
                    </div>

                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Play size={14} className="mr-2" />
                      Send Request
                    </Button>

                    {testResponse && (
                      <div className="mt-4">
                        <Label>Response</Label>
                        <div className="mt-2 p-3 bg-gray-900 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={testResponse.status === 200 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                              Status: {testResponse.status}
                            </Badge>
                            <span className="text-xs text-gray-400">Time: {testResponse.time.toFixed(0)}ms</span>
                          </div>
                          <pre className="text-gray-100 text-xs overflow-x-auto">
                            {JSON.stringify(testResponse.data, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-6">
              <Card className="border-[#F5EEE9]">
                <CardHeader>
                  <CardTitle>Webhooks Overview</CardTitle>
                  <CardDescription>
                    Real-time notifications for inventory events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-black/70">
                      Webhooks allow you to receive real-time notifications when important events occur in your inventory.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border border-[#F5EEE9] rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">Available Events</h4>
                        <ul className="space-y-1 text-sm text-black/70">
                          <li>• stocktake.completed</li>
                          <li>• inventory.updated</li>
                          <li>• discrepancy.created</li>
                          <li>• low_stock.alert</li>
                          <li>• expiry.warning</li>
                        </ul>
                      </div>
                      <div className="p-3 border border-[#F5EEE9] rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">Webhook Payload</h4>
                        <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
{`{
  "event": "stocktake.completed",
  "timestamp": "2024-12-20T15:30:00Z",
  "data": {
    "id": "st_123",
    "name": "December Count",
    "accuracy": 99.2
  }
}`}
                        </pre>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2 text-blue-700">Setting Up Webhooks</h4>
                      <ol className="list-decimal list-inside text-sm text-blue-700/80 space-y-1">
                        <li>Create a webhook endpoint in your application</li>
                        <li>Register the endpoint via POST /v1/webhooks</li>
                        <li>Verify webhook signatures for security</li>
                        <li>Handle events and respond with 200 OK</li>
                      </ol>
                    </div>

                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Webhook size={14} className="mr-2" />
                      Create Webhook
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Feedback Section */}
          <div className="mt-8 pt-6 border-t border-[#F5EEE9]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-sm text-black/50">Was this documentation helpful?</p>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowFeedbackDialog(true)}>
                    <ThumbsUp size={14} className="mr-1" />
                    Yes
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowFeedbackDialog(true)}>
                    <ThumbsDown size={14} className="mr-1" />
                    No
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Github size={14} className="mr-1" />
                  GitHub
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter size={14} className="mr-1" />
                  Twitter
                </Button>
                <Button variant="ghost" size="sm">
                  <MailIcon size={14} className="mr-1" />
                  Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Share Your Feedback</DialogTitle>
            <DialogDescription>
              Help us improve our API documentation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>How would you rate this documentation?</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={feedbackRating === rating ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFeedbackRating(rating)}
                    className={feedbackRating === rating ? 'bg-red-600' : ''}
                  >
                    {rating}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Additional Comments</Label>
              <Textarea
                placeholder="Tell us what you liked or what could be improved..."
                rows={4}
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleSendFeedback}>
              <Send size={14} className="mr-2" />
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiDocsPage;