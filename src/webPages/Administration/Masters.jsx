// app/dashboard/administration/masters/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Database,
  Package,
  Tag,
  Building2,
  Users,
  MapPin,
  Briefcase,
  Scale,
  DollarSign,
  Percent,
  CreditCard,
  Truck,
  Building,
  Layers,
  HardDrive,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Grid,
  List,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  MoreVertical,
  Eye,
  Settings,
  Home,
  ChevronRight,
  X,
  AlertTriangle,
  Info,
  HelpCircle,
  FileSpreadsheet,
  FileJson,
  File,
  Folder,
  Globe,
  Mail,
  Phone,
  Ban,
  ArrowUp,
  ArrowDown,
  Star,
  Heart,
  Shield,
  Key,
  Lock,
  Unlock,
  Wifi,
  Zap,
  Cpu,
  Server,
  Cloud,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Printer,
  Scanner,
  Wrench,
  Hammer,
  Drill,
  Screwdriver,
  Saw,
  Axe,
  Pickaxe,
  Shovel,
  Rake,
  Hoe,
  Scythe,
  Shears,
  Pliers,
  Wire,
  Cable,
  Plug,
  Battery,
  BatteryCharging,
  BatteryWarning,
  Power,
  PowerOff,
  Bluetooth,
  Usb,
  Disc,
  Radio,
  Headphones,
  Speaker,
  Microphone,
  Guitar,
  Piano,
  Drum,
  Trumpet,
  Saxophone,
  Violin,
  Music,
  Film,
  Clapperboard,
  Projector,
  Screen,
  Video,
  Camera,
  Image,
  FileText,
  Folder as FolderIcon,
  FolderOpen,
  FolderTree,
  Files,
  Clipboard,
  ClipboardList,
  ClipboardCheck,
  ClipboardX,
  Pen,
  Pencil,
  Brush,
  Palette,
  Paintbrush,
  Eraser,
  Scissors,
  Ruler,
  Compass,
  Weight,
  Droplet,
  Wind,
  Thermometer,
  Gauge,
  Speedometer,
  Tachometer,
  Timer,
  Hourglass,
  Sandglass,
  Watch,
  AlarmClock,
  Calendar as CalendarIcon,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarRange,
  CalendarDays,
  CalendarClock,
  Sunrise,
  Sunset,
  Moon,
  Cloud as CloudIcon,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  Tornado,
  Hurricane,
  Earthquake,
  Volcano,
  Mountain,
  Tree,
  PalmTree,
  Cactus,
  Flower,
  Leaf,
  Grass,
  Moss,
  Fern,
  Mushroom,
  Seed,
  Sprout,
  Plant,
  Pot,
  Vase,
  Flower2,
  TreePine,
  Wheat,
  Rice,
  Corn,
  Soybean,
  Cotton,
  Wool,
  Silk,
  Leather,
  Wood,
  Metal,
  Plastic,
  Glass,
  Paper,
  Cardboard,
  Fabric,
  Yarn,
  Thread,
  Needle,
  Knife,
  Spoon,
  Fork,
  Plate,
  Bowl,
  Cup,
  Mug,
  Teapot,
  Kettle,
  Pan,
  Pot as PotIcon,
  Oven,
  Microwave,
  Refrigerator,
  Freezer,
  Dishwasher,
  WashingMachine,
  Dryer,
  Iron,
  Vacuum,
  Broom,
  Mop,
  Bucket,
  Trash,
  Recycle,
  Compost,
  LeafyGreen
} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
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
  DialogTrigger,
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

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MastersPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [selectedMasters, setSelectedMasters] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for master categories
  const masterCategories = [
    { id: 'all', name: 'All Masters', count: 156, icon: Database },
    { id: 'products', name: 'Products', count: 1245, icon: Package, color: 'blue' },
    { id: 'categories', name: 'Categories', count: 48, icon: Tag, color: 'green' },
    { id: 'suppliers', name: 'Suppliers', count: 89, icon: Building2, color: 'orange' },
    { id: 'customers', name: 'Customers', count: 567, icon: Users, color: 'purple' },
    { id: 'locations', name: 'Locations', count: 32, icon: MapPin, color: 'red' },
    { id: 'departments', name: 'Departments', count: 15, icon: Briefcase, color: 'teal' },
    { id: 'units', name: 'Units of Measure', count: 24, icon: Scale, color: 'pink' },
    { id: 'currencies', name: 'Currencies', count: 12, icon: DollarSign, color: 'yellow' },
    { id: 'taxes', name: 'Tax Rates', count: 8, icon: Percent, color: 'indigo' },
    { id: 'paymentTerms', name: 'Payment Terms', count: 6, icon: CreditCard, color: 'cyan' },
    { id: 'shippingMethods', name: 'Shipping Methods', count: 9, icon: Truck, color: 'amber' },
    { id: 'warehouses', name: 'Warehouses', count: 7, icon: Building, color: 'lime' },
    { id: 'zones', name: 'Warehouse Zones', count: 24, icon: Layers, color: 'emerald' },
    { id: 'binLocations', name: 'Bin Locations', count: 156, icon: Grid, color: 'violet' },
    { id: 'assetTypes', name: 'Asset Types', count: 18, icon: HardDrive, color: 'fuchsia' },
    { id: 'statusCodes', name: 'Status Codes', count: 14, icon: CheckCircle, color: 'rose' },
    { id: 'reasonCodes', name: 'Reason Codes', count: 32, icon: HelpCircle, color: 'slate' }
  ];

  // Mock data for master records - Products
  const products = [
    { id: 1, code: 'PROD-001', name: 'Wireless Headphones', category: 'Electronics', supplier: 'TechSupply Co.', unit: 'pcs', price: 89.99, cost: 45.00, stock: 345, reorderLevel: 50, status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'PROD-002', name: 'USB-C Cable 2m', category: 'Accessories', supplier: 'CableMaster', unit: 'pcs', price: 12.99, cost: 4.50, stock: 1234, reorderLevel: 200, status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'PROD-003', name: 'Laptop Stand', category: 'Office', supplier: 'ErgoWorks', unit: 'pcs', price: 45.99, cost: 22.00, stock: 89, reorderLevel: 30, status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'PROD-004', name: 'Monitor 24"', category: 'Electronics', supplier: 'DisplayTech', unit: 'pcs', price: 249.99, cost: 180.00, stock: 56, reorderLevel: 20, status: 'active', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'PROD-005', name: 'Mechanical Keyboard', category: 'Electronics', supplier: 'KeyMaster', unit: 'pcs', price: 129.99, cost: 65.00, stock: 78, reorderLevel: 25, status: 'inactive', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Mock data for master records - Categories
  const categories = [
    { id: 1, code: 'CAT-001', name: 'Electronics', description: 'Electronic devices and components', parent: null, products: 345, status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'CAT-002', name: 'Accessories', description: 'Computer and phone accessories', parent: 'Electronics', products: 234, status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'CAT-003', name: 'Office', description: 'Office supplies and furniture', parent: null, products: 156, status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'CAT-004', name: 'Furniture', description: 'Office and home furniture', parent: 'Office', products: 89, status: 'active', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'CAT-005', name: 'Packaging', description: 'Packaging materials', parent: null, products: 67, status: 'inactive', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Mock data for master records - Suppliers
  const suppliers = [
    { id: 1, code: 'SUP-001', name: 'TechSupply Co.', contact: 'John Smith', email: 'john@techsupply.com', phone: '+1 (555) 123-4567', products: 45, status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'SUP-002', name: 'CableMaster', contact: 'Sarah Johnson', email: 'sarah@cablemaster.com', phone: '+1 (555) 234-5678', products: 23, status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'SUP-003', name: 'ErgoWorks', contact: 'Mike Wilson', email: 'mike@ergoworks.com', phone: '+1 (555) 345-6789', products: 12, status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'SUP-004', name: 'DisplayTech', contact: 'Emily Chen', email: 'emily@displaytech.com', phone: '+1 (555) 456-7890', products: 8, status: 'inactive', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'SUP-005', name: 'KeyMaster', contact: 'David Brown', email: 'david@keymaster.com', phone: '+1 (555) 567-8901', products: 15, status: 'active', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Mock data for master records - Locations
  const locations = [
    { id: 1, code: 'LOC-001', name: 'San Francisco HQ', type: 'headquarters', address: '123 Main St', city: 'San Francisco', country: 'USA', status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'LOC-002', name: 'New York Office', type: 'office', address: '456 Park Ave', city: 'New York', country: 'USA', status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'LOC-003', name: 'London Office', type: 'office', address: '10 Downing St', city: 'London', country: 'UK', status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'LOC-004', name: 'Singapore Office', type: 'office', address: '1 Raffles Place', city: 'Singapore', country: 'Singapore', status: 'active', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'LOC-005', name: 'Tokyo Office', type: 'office', address: '1-2-3 Marunouchi', city: 'Tokyo', country: 'Japan', status: 'pending', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Mock data for master records - Units of Measure
  const units = [
    { id: 1, code: 'UNIT-001', name: 'Piece', symbol: 'pcs', type: 'count', status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'UNIT-002', name: 'Kilogram', symbol: 'kg', type: 'weight', status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'UNIT-003', name: 'Liter', symbol: 'L', type: 'volume', status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'UNIT-004', name: 'Meter', symbol: 'm', type: 'length', status: 'active', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'UNIT-005', name: 'Box', symbol: 'box', type: 'packaging', status: 'inactive', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Mock data for master records - Currencies
  const currencies = [
    { id: 1, code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0000, isBase: true, status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'EUR', name: 'Euro', symbol: '€', rate: 0.9200, isBase: false, status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.7900, isBase: false, status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 150.5000, isBase: false, status: 'active', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.3500, isBase: false, status: 'active', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Mock data for master records - Tax Rates
  const taxes = [
    { id: 1, code: 'TAX-001', name: 'Standard VAT', rate: 20.00, type: 'percentage', jurisdiction: 'UK', status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'TAX-002', name: 'Reduced VAT', rate: 5.00, type: 'percentage', jurisdiction: 'UK', status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'TAX-003', name: 'Sales Tax CA', rate: 8.50, type: 'percentage', jurisdiction: 'California', status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'TAX-004', name: 'GST Singapore', rate: 8.00, type: 'percentage', jurisdiction: 'Singapore', status: 'active', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'TAX-005', name: 'Zero Rated', rate: 0.00, type: 'percentage', jurisdiction: 'All', status: 'active', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Mock data for master records - Payment Terms
  const paymentTerms = [
    { id: 1, code: 'PT-001', name: 'Net 30', days: 30, description: 'Payment due within 30 days', status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'PT-002', name: 'Net 60', days: 60, description: 'Payment due within 60 days', status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'PT-003', name: 'Due on Receipt', days: 0, description: 'Payment due immediately', status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'PT-004', name: '2/10 Net 30', days: 30, description: '2% discount if paid within 10 days', status: 'active', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'PT-005', name: 'COD', days: 0, description: 'Cash on delivery', status: 'inactive', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Mock data for master records - Shipping Methods
  const shippingMethods = [
    { id: 1, code: 'SHIP-001', name: 'Standard Shipping', carrier: 'UPS', cost: 5.99, transitDays: 3, status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'SHIP-002', name: 'Express Shipping', carrier: 'FedEx', cost: 12.99, transitDays: 1, status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'SHIP-003', name: 'Overnight Shipping', carrier: 'DHL', cost: 24.99, transitDays: 0, status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'SHIP-004', name: 'International', carrier: 'USPS', cost: 15.99, transitDays: 7, status: 'active', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'SHIP-005', name: 'Pickup', carrier: 'In-Store', cost: 0.00, transitDays: 0, status: 'inactive', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Mock data for master records - Warehouses
  const warehouses = [
    { id: 1, code: 'WH-001', name: 'Main Warehouse', location: 'San Francisco', capacity: 50000, used: 35000, zones: 8, status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'WH-002', name: 'East Coast DC', location: 'New York', capacity: 75000, used: 42000, zones: 12, status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'WH-003', name: 'European DC', location: 'London', capacity: 60000, used: 28000, zones: 10, status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'WH-004', name: 'Asia Pacific DC', location: 'Singapore', capacity: 45000, used: 15000, zones: 6, status: 'active', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'WH-005', name: 'West Coast DC', location: 'Los Angeles', capacity: 55000, used: 0, zones: 0, status: 'pending', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Mock data for master records - Asset Types
  const assetTypes = [
    { id: 1, code: 'AST-001', name: 'RFID Scanner', category: 'Hardware', depreciationRate: 20, usefulLife: 5, status: 'active', lastUpdated: '2024-03-15T09:30:00Z' },
    { id: 2, code: 'AST-002', name: 'Forklift', category: 'Equipment', depreciationRate: 15, usefulLife: 10, status: 'active', lastUpdated: '2024-03-14T14:20:00Z' },
    { id: 3, code: 'AST-003', name: 'Server Rack', category: 'Infrastructure', depreciationRate: 10, usefulLife: 8, status: 'active', lastUpdated: '2024-03-13T11:30:00Z' },
    { id: 4, code: 'AST-004', name: 'Computer', category: 'IT Equipment', depreciationRate: 25, usefulLife: 4, status: 'active', lastUpdated: '2024-03-12T16:45:00Z' },
    { id: 5, code: 'AST-005', name: 'Pallet Jack', category: 'Equipment', depreciationRate: 15, usefulLife: 7, status: 'inactive', lastUpdated: '2024-03-10T10:15:00Z' }
  ];

  // Get current master records based on selected category
  const getCurrentMasters = () => {
    switch(selectedCategory) {
      case 'products':
        return products;
      case 'categories':
        return categories;
      case 'suppliers':
        return suppliers;
      case 'locations':
        return locations;
      case 'units':
        return units;
      case 'currencies':
        return currencies;
      case 'taxes':
        return taxes;
      case 'paymentTerms':
        return paymentTerms;
      case 'shippingMethods':
        return shippingMethods;
      case 'warehouses':
        return warehouses;
      case 'assetTypes':
        return assetTypes;
      default:
        return [];
    }
  };

  const currentMasters = getCurrentMasters();
  const currentCategory = masterCategories.find(c => c.id === selectedCategory) || masterCategories[0];

  const getCategoryIcon = (categoryId) => {
    const category = masterCategories.find(c => c.id === categoryId);
    const Icon = category?.icon || Database;
    return Icon;
  };

  // Helper function to render category icon
  const renderCategoryIcon = (categoryId, size = 16, className = "") => {
    const Icon = getCategoryIcon(categoryId);
    return <Icon size={size} className={className} />;
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-200 px-2 py-0.5 text-xs">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 px-2 py-0.5 text-xs">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 px-2 py-0.5 text-xs">Pending</Badge>;
      default:
        return <Badge variant="outline" className="text-xs px-2 py-0.5">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredMasters = currentMasters.filter(master => {
    if (selectedStatus !== 'all' && master.status !== selectedStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return master.name.toLowerCase().includes(query) ||
             master.code.toLowerCase().includes(query) ||
             (master.description && master.description.toLowerCase().includes(query));
    }
    return true;
  });

  const stats = {
    total: currentMasters.length,
    active: currentMasters.filter(m => m.status === 'active').length,
    inactive: currentMasters.filter(m => m.status === 'inactive').length,
    pending: currentMasters.filter(m => m.status === 'pending').length
  };

  const handleSelectAll = () => {
    if (selectedMasters.length === filteredMasters.length) {
      setSelectedMasters([]);
    } else {
      setSelectedMasters(filteredMasters.map(m => m.id));
    }
  };

  const handleSelectMaster = (id) => {
    if (selectedMasters.includes(id)) {
      setSelectedMasters(selectedMasters.filter(m => m !== id));
    } else {
      setSelectedMasters([...selectedMasters, id]);
    }
  };

  // Render master record based on category
  const renderMasterCard = (master) => {
    const CategoryIcon = getCategoryIcon(selectedCategory);
    
    return (
      <ContextMenu key={master.id}>
        <ContextMenuTrigger>
          <Card 
            className="border-gray-200 hover:shadow-lg transition-all group cursor-pointer"
            onClick={() => {
              setSelectedMaster(master);
              setViewDetailsDialogOpen(true);
            }}
          >
            <CardContent className="p-0">
              {/* Header */}
              <div className={`p-4 border-b border-gray-200 bg-gradient-to-r from-${currentCategory.color || 'red'}-50 to-transparent`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${currentCategory.color || 'red'}-600 text-white rounded-lg`}>
                      <CategoryIcon size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                          {master.code}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-base">{master.name}</h3>
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
                        setSelectedMaster(master);
                        setViewDetailsDialogOpen(true);
                      }}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMaster(master);
                        setEditDialogOpen(true);
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMaster(master);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="space-y-3">
                  {/* Dynamic fields based on category */}
                  {selectedCategory === 'products' && (
                    <>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Tag size={14} className="text-gray-400" />
                          <span className="text-gray-700">{master.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 size={14} className="text-gray-400" />
                          <span className="text-gray-700">{master.supplier}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className="text-gray-400" />
                          <span className="text-gray-700">${master.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package size={14} className="text-gray-400" />
                          <span className="text-gray-700">Stock: {master.stock}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedCategory === 'categories' && (
                    <>
                      <p className="text-sm text-gray-700 line-clamp-2">{master.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Package size={14} className="text-gray-400" />
                          <span className="text-gray-700">{master.products} products</span>
                        </div>
                        {master.parent && (
                          <div className="flex items-center gap-1">
                            <Folder size={14} className="text-gray-400" />
                            <span className="text-gray-700">Parent: {master.parent}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {selectedCategory === 'suppliers' && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={14} className="text-gray-400" />
                          <span className="text-gray-700">{master.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={14} className="text-gray-400" />
                          <span className="text-gray-700">{master.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-700">{master.products} products</span>
                      </div>
                    </>
                  )}

                  {selectedCategory === 'locations' && (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">{master.address}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="text-gray-700">{master.city}, {master.country}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200">
                        {master.type}
                      </Badge>
                    </>
                  )}

                  {selectedCategory === 'units' && (
                    <>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Scale size={14} className="text-gray-400" />
                          <span className="text-gray-700">Symbol: {master.symbol}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag size={14} className="text-gray-400" />
                          <span className="text-gray-700">Type: {master.type}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedCategory === 'currencies' && (
                    <>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className="text-gray-400" />
                          <span className="text-gray-700">Symbol: {master.symbol}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Percent size={14} className="text-gray-400" />
                          <span className="text-gray-700">Rate: {master.rate}</span>
                        </div>
                      </div>
                      {master.isBase && (
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-0.5">
                          Base Currency
                        </Badge>
                      )}
                    </>
                  )}

                  {selectedCategory === 'taxes' && (
                    <>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Percent size={14} className="text-gray-400" />
                          <span className="text-gray-700">{master.rate}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe size={14} className="text-gray-400" />
                          <span className="text-gray-700">{master.jurisdiction}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedCategory === 'paymentTerms' && (
                    <>
                      <p className="text-sm text-gray-700 line-clamp-2">{master.description}</p>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-700">{master.days} days</span>
                      </div>
                    </>
                  )}

                  {selectedCategory === 'shippingMethods' && (
                    <>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Truck size={14} className="text-gray-400" />
                          <span className="text-gray-700">{master.carrier}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className="text-gray-400" />
                          <span className="text-gray-700">${master.cost}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-700">{master.transitDays} days transit</span>
                      </div>
                    </>
                  )}

                  {selectedCategory === 'warehouses' && (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-gray-700">{master.location}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Package size={14} className="text-gray-400" />
                          <span className="text-gray-700">Capacity: {master.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Layers size={14} className="text-gray-400" />
                          <span className="text-gray-700">Zones: {master.zones}</span>
                        </div>
                      </div>
                      <Progress 
                        value={(master.used / master.capacity) * 100} 
                        className="h-1.5 bg-gray-100" 
                        style={{ '--progress-background': '#dc2626' }}
                      />
                    </>
                  )}

                  {selectedCategory === 'assetTypes' && (
                    <>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <HardDrive size={14} className="text-gray-400" />
                          <span className="text-gray-700">{master.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Percent size={14} className="text-gray-400" />
                          <span className="text-gray-700">Depr: {master.depreciationRate}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-700">Life: {master.usefulLife} years</span>
                      </div>
                    </>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>Updated {formatDate(master.lastUpdated)}</span>
                    </div>
                    {getStatusBadge(master.status)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem onClick={() => {
            setSelectedMaster(master);
            setViewDetailsDialogOpen(true);
          }}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </ContextMenuItem>
          <ContextMenuItem onClick={() => {
            setSelectedMaster(master);
            setEditDialogOpen(true);
          }}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </ContextMenuItem>
          <ContextMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  };

  // Render list view row based on category
  const renderListRow = (master) => {
    return (
      <TableRow 
        key={master.id} 
        className="border-gray-200 hover:bg-gray-50 cursor-pointer"
        onClick={() => {
          setSelectedMaster(master);
          setViewDetailsDialogOpen(true);
        }}
      >
        <TableCell onClick={(e) => e.stopPropagation()}>
          <Checkbox 
            checked={selectedMasters.includes(master.id)}
            onCheckedChange={() => handleSelectMaster(master.id)}
          />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 bg-${currentCategory.color || 'red'}-100 rounded`}>
              {selectedCategory === 'products' && <Package size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
              {selectedCategory === 'categories' && <Tag size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
              {selectedCategory === 'suppliers' && <Building2 size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
              {selectedCategory === 'locations' && <MapPin size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
              {selectedCategory === 'units' && <Scale size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
              {selectedCategory === 'currencies' && <DollarSign size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
              {selectedCategory === 'taxes' && <Percent size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
              {selectedCategory === 'paymentTerms' && <CreditCard size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
              {selectedCategory === 'shippingMethods' && <Truck size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
              {selectedCategory === 'warehouses' && <Building size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
              {selectedCategory === 'assetTypes' && <HardDrive size={14} className={`text-${currentCategory.color || 'red'}-600`} />}
            </div>
            <div>
              <div className="font-medium text-sm text-gray-900">{master.name}</div>
              <div className="text-xs text-gray-500">{master.code}</div>
            </div>
          </div>
        </TableCell>
        <TableCell className="text-sm">
          {selectedCategory === 'products' && master.category}
          {selectedCategory === 'categories' && master.parent || '-'}
          {selectedCategory === 'suppliers' && master.contact}
          {selectedCategory === 'locations' && master.city}
          {selectedCategory === 'units' && master.symbol}
          {selectedCategory === 'currencies' && master.symbol}
          {selectedCategory === 'taxes' && `${master.rate}%`}
          {selectedCategory === 'paymentTerms' && `${master.days} days`}
          {selectedCategory === 'shippingMethods' && master.carrier}
          {selectedCategory === 'warehouses' && master.location}
          {selectedCategory === 'assetTypes' && master.category}
        </TableCell>
        <TableCell className="text-sm">
          {selectedCategory === 'products' && `$${master.price}`}
          {selectedCategory === 'categories' && `${master.products} products`}
          {selectedCategory === 'suppliers' && `${master.products} products`}
          {selectedCategory === 'locations' && master.country}
          {selectedCategory === 'units' && master.type}
          {selectedCategory === 'currencies' && master.rate}
          {selectedCategory === 'taxes' && master.jurisdiction}
          {selectedCategory === 'paymentTerms' && master.description}
          {selectedCategory === 'shippingMethods' && `$${master.cost}`}
          {selectedCategory === 'warehouses' && `${master.used}/${master.capacity}`}
          {selectedCategory === 'assetTypes' && `${master.depreciationRate}%`}
        </TableCell>
        <TableCell>{getStatusBadge(master.status)}</TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-gray-400" />
            <span className="text-sm">{formatDate(master.lastUpdated)}</span>
          </div>
        </TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                setSelectedMaster(master);
                setViewDetailsDialogOpen(true);
              }}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setSelectedMaster(master);
                setEditDialogOpen(true);
              }}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => {
                  setSelectedMaster(master);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Master Data Management</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage all master data records across the system</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px] border-gray-200 bg-white h-9">
                <SelectValue placeholder="Select Master" />
              </SelectTrigger>
              <SelectContent>
                {masterCategories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-gray-200 h-9">
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
              className="gap-2 border-gray-200 h-9"
              onClick={() => setImportDialogOpen(true)}
            >
              <Upload size={16} />
              Import
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white h-9"
              onClick={() => setCreateDialogOpen(true)}
            >
              <Plus size={16} />
              Add {currentCategory.name}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Records</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Database size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Active</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.active}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Inactive</p>
                  <p className="text-xl font-bold text-gray-600 mt-1">{stats.inactive}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-full">
                  <XCircle size={18} className="text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Pending</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Clock size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Categories</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{masterCategories.length - 1}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Layers size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {masterCategories.slice(0, 6).map(cat => {
          if (cat.id === 'all') return null;
          const Icon = cat.icon;
          return (
            <Card 
              key={cat.id} 
              className={cn(
                "border-gray-200 cursor-pointer transition-all",
                selectedCategory === cat.id && "ring-2 ring-red-600"
              )}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 bg-${cat.color}-100 rounded`}>
                    <Icon size={14} className={`text-${cat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{cat.name}</p>
                    <p className="text-xs text-gray-500">{cat.count} records</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder={`Search ${currentCategory.name.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-red-600 h-9"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-gray-200 h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="border-gray-200 h-9 w-9">
            <Filter size={16} />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-200 h-9 w-9">
            <RefreshCw size={16} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-red-600 hover:bg-red-700 h-9 w-9' : 'border-gray-200 h-9 w-9'}
          >
            <Grid size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-red-600 hover:bg-red-700 h-9 w-9' : 'border-gray-200 h-9 w-9'}
          >
            <List size={16} />
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedMasters.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white px-2 py-0.5">{selectedMasters.length} selected</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedMasters([])} className="h-7 text-xs">
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <CheckCircle size={14} className="mr-2" />
              Activate
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Ban size={14} className="mr-2" />
              Deactivate
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Edit size={14} className="mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Copy size={14} className="mr-2" />
              Duplicate
            </Button>
          </div>
        </div>
      )}

      {/* Masters Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredMasters.map(master => renderMasterCard(master))}
          {filteredMasters.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <Database size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-500">No records found</h3>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      ) : (
        <Card className="border-gray-200">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 bg-gray-50">
                  <TableHead className="w-8">
                    <Checkbox 
                      checked={selectedMasters.length === filteredMasters.length && filteredMasters.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Name</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">
                    {selectedCategory === 'products' && 'Category'}
                    {selectedCategory === 'categories' && 'Parent'}
                    {selectedCategory === 'suppliers' && 'Contact'}
                    {selectedCategory === 'locations' && 'City'}
                    {selectedCategory === 'units' && 'Symbol'}
                    {selectedCategory === 'currencies' && 'Symbol'}
                    {selectedCategory === 'taxes' && 'Rate'}
                    {selectedCategory === 'paymentTerms' && 'Days'}
                    {selectedCategory === 'shippingMethods' && 'Carrier'}
                    {selectedCategory === 'warehouses' && 'Location'}
                    {selectedCategory === 'assetTypes' && 'Category'}
                  </TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">
                    {selectedCategory === 'products' && 'Price'}
                    {selectedCategory === 'categories' && 'Products'}
                    {selectedCategory === 'suppliers' && 'Products'}
                    {selectedCategory === 'locations' && 'Country'}
                    {selectedCategory === 'units' && 'Type'}
                    {selectedCategory === 'currencies' && 'Rate'}
                    {selectedCategory === 'taxes' && 'Jurisdiction'}
                    {selectedCategory === 'paymentTerms' && 'Description'}
                    {selectedCategory === 'shippingMethods' && 'Cost'}
                    {selectedCategory === 'warehouses' && 'Usage'}
                    {selectedCategory === 'assetTypes' && 'Depreciation'}
                  </TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Status</TableHead>
                  <TableHead className="text-gray-600 text-sm font-medium">Last Updated</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMasters.map(master => renderListRow(master))}
                {filteredMasters.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-500">
                Showing {filteredMasters.length} of {currentMasters.length} records
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled className="h-8 text-xs">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-red-600 text-white border-red-600 h-8 text-xs">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  3
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Next
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Create/Edit Dialog - Simplified for demo */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Add {currentCategory.name}</DialogTitle>
            <DialogDescription className="text-sm">
              Create a new {currentCategory.name.toLowerCase()} record
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Code</Label>
                <Input placeholder={`${currentCategory.name.toUpperCase()}-001`} className="h-9" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Name</Label>
                <Input placeholder="Enter name" className="h-9" />
              </div>
            </div>

            {selectedCategory === 'products' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Category</Label>
                    <Select>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Supplier</Label>
                    <Select>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="techsupply">TechSupply Co.</SelectItem>
                        <SelectItem value="cablemaster">CableMaster</SelectItem>
                        <SelectItem value="ergoworks">ErgoWorks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Price</Label>
                    <Input type="number" placeholder="0.00" className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Cost</Label>
                    <Input type="number" placeholder="0.00" className="h-9" />
                  </div>
                </div>
              </>
            )}

            {selectedCategory === 'categories' && (
              <div className="space-y-2">
                <Label className="text-sm">Description</Label>
                <Textarea placeholder="Enter description" rows={3} className="text-sm" />
              </div>
            )}

            {selectedCategory === 'suppliers' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm">Contact Person</Label>
                  <Input placeholder="Full name" className="h-9" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Email</Label>
                    <Input type="email" placeholder="email@example.com" className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Phone</Label>
                    <Input placeholder="+1 (555) 123-4567" className="h-9" />
                  </div>
                </div>
              </>
            )}

            {selectedCategory === 'locations' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm">Address</Label>
                  <Input placeholder="Street address" className="h-9" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="City" className="h-9" />
                  <Input placeholder="State" className="h-9" />
                  <Input placeholder="ZIP" className="h-9" />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label className="text-sm">Status</Label>
              <RadioGroup defaultValue="active" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="text-sm">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="inactive" />
                  <Label htmlFor="inactive" className="text-sm">Inactive</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              Create Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Delete Record</DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to delete this record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedMaster && (
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-${currentCategory.color || 'red'}-100 rounded`}>
                  {renderCategoryIcon(selectedCategory, 16, `text-${currentCategory.color || 'red'}-600`)}
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600">{selectedMaster.name}</p>
                  <p className="text-xs text-gray-500">{selectedMaster.code}</p>
                </div>
              </div>
              <div className="flex items-start gap-1 text-xs text-amber-600">
                <AlertTriangle size={12} className="mt-0.5" />
                <span>This will permanently remove this record from the system.</span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)} className="h-9">
              Delete Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Import {currentCategory.name}</DialogTitle>
            <DialogDescription className="text-sm">
              Upload a file to import {currentCategory.name.toLowerCase()} records
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <Upload size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium mb-1">Drop your file here</p>
              <p className="text-xs text-gray-500 mb-3">or click to browse</p>
              <Input type="file" className="hidden" id="file-upload" />
              <Button variant="outline" size="sm" onClick={() => document.getElementById('file-upload').click()} className="h-8 text-xs">
                Choose File
              </Button>
              <p className="text-xs text-gray-400 mt-2">Supported formats: .xlsx, .csv, .json (max 10MB)</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Import Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-existing" />
                  <Label htmlFor="update-existing" className="text-sm">Update existing records</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skip-duplicates" defaultChecked />
                  <Label htmlFor="skip-duplicates" className="text-sm">Skip duplicates</Label>
                </div>
              </div>
            </div>

            <Alert className="bg-gray-50 border-0">
              <Info size={14} />
              <AlertTitle className="text-xs font-medium">Sample Format</AlertTitle>
              <AlertDescription className="text-xs text-gray-500">
                Download a sample template to see the required format.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Export {currentCategory.name}</DialogTitle>
            <DialogDescription className="text-sm">
              Choose export format and options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm">Export Format</Label>
              <RadioGroup defaultValue="excel">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel" className="flex items-center gap-2 text-sm">
                    <FileSpreadsheet size={16} className="text-green-600" />
                    Excel (.xlsx)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="json" id="json" />
                  <Label htmlFor="json" className="flex items-center gap-2 text-sm">
                    <FileJson size={16} className="text-blue-600" />
                    JSON (.json)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="flex items-center gap-2 text-sm">
                    <File size={16} className="text-gray-600" />
                    CSV (.csv)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Include</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-all" defaultChecked />
                  <Label htmlFor="include-all" className="text-sm">All records</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-inactive" />
                  <Label htmlFor="include-inactive" className="text-sm">Include inactive</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
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
            <DialogTitle className="text-lg">Master Data Settings</DialogTitle>
            <DialogDescription className="text-sm">
              Configure master data management options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="display">
                <AccordionTrigger className="text-sm">Display Settings</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show inactive records</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show record counts</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Compact view</Label>
                    <Switch />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="validation">
                <AccordionTrigger className="text-sm">Validation Rules</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Require unique codes</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Validate email format</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Check for duplicates</Label>
                    <Switch defaultChecked />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="audit">
                <AccordionTrigger className="text-sm">Audit & Logging</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Log all changes</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Track field history</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Retention period</Label>
                    <Select defaultValue="90">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsDialogOpen(false)} className="h-9">
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-9">
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
                onClick={() => setCreateDialogOpen(true)}
              >
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Add Record</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setImportDialogOpen(true)}
              >
                <Upload size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Import</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg"
                onClick={() => setSettingsDialogOpen(true)}
              >
                <Settings size={20} className="text-gray-900" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-sm">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MastersPage;