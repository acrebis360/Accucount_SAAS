// app/dashboard/asset-depository/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Database,
  Package,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  Calendar,
  Download,
  Upload,
  Grid,
  List,
  X,
  ChevronDown,
  ChevronRight,
  Check,
  Ban,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  User,
  Users,
  MapPin,
  Tag,
  Hash,
  DollarSign,
  Percent,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  PlusCircle,
  MinusCircle,
  Settings,
  Save,
  History,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Scale,
  Weight,
  Ruler,
  Box,
  Boxes,
  PackageCheck,
  PackageMinus,
  PackagePlus,
  PackageX,
  PackageSearch,
  Crate,
  Pallet,
  Container,
  Warehouse,
  Store,
  Building2,
  HardDrive,
  Cpu,
  Microchip,
  CircuitBoard,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Printer as PrinterIcon,
  Scanner,
  Camera,
  Video,
  Mic,
  Speaker,
  Headphones,
  Keyboard,
  Mouse,
  Wrench,
  Tool,
  Settings2,
  Sliders,
  Gauge,
  GaugeCircle,
  Activity,
  Zap,
  Flame,
  Droplet,
  Wind,
  Thermometer,
  Factory,
  Truck,
  Car,
  Bus,
  Bike,
  Train,
  Ship,
  Plane,
  Briefcase,
  Building,
  Home,
  Key,
  Lock,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  BadgeCheck,
  BadgeX,
  BadgeAlert,
  BadgeInfo,
  QrCode,
  Barcode,
  Scan,
  Sofa,
  CreditCard
} from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AssetDepositoryPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  const [showDepreciationDialog, setShowDepreciationDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [showBarcodeDialog, setShowBarcodeDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample asset data
  const assets = [
    {
      id: 'AST-001',
      assetTag: 'AST-2024-001',
      name: 'Forklift - Electric',
      description: 'Electric forklift for warehouse operations',
      category: 'Equipment',
      subcategory: 'Material Handling',
      type: 'Heavy Equipment',
      model: 'FL-5000E',
      manufacturer: 'LiftMaster Inc',
      serialNumber: 'LM-87654-2024',
      barcode: '123456789012',
      qrCode: 'AST-2024-001',
      status: 'active',
      condition: 'excellent',
      location: 'Warehouse A',
      zone: 'Zone 1',
      bay: 'Bay-05',
      assignedTo: 'John Doe',
      assignedDate: '2024-01-15',
      department: 'Operations',
      purchaseDate: '2024-01-10',
      purchaseCost: 35000.00,
      currentValue: 33250.00,
      depreciationMethod: 'Straight Line',
      depreciationRate: '10% per year',
      usefulLife: 10,
      salvageValue: 5000.00,
      warrantyExpiry: '2026-01-10',
      maintenanceInterval: 'Monthly',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-04-01',
      maintenanceStatus: 'upcoming',
      insurancePolicy: 'INS-87654',
      insuranceExpiry: '2024-12-31',
      supplier: 'Industrial Equipment Co',
      manufacturer: 'LiftMaster Inc',
      manufacturerDate: '2023-12-15',
      receivedDate: '2024-01-05',
      documents: ['invoice-001.pdf', 'warranty-001.pdf', 'manual-001.pdf'],
      tags: ['forklift', 'heavy-equipment', 'warehouse'],
      notes: 'New fleet addition',
      lastAudit: '2024-03-15',
      lastAuditBy: 'Audit Team',
      history: [
        { date: '2024-03-01', action: 'Maintenance', performedBy: 'Tech Team', notes: 'Routine check' },
        { date: '2024-02-15', action: 'Inspection', performedBy: 'Safety Officer', notes: 'Passed' },
        { date: '2024-01-15', action: 'Assigned', performedBy: 'John Doe', notes: 'Assigned to operator' },
      ],
    },
    {
      id: 'AST-002',
      assetTag: 'AST-2024-002',
      name: 'Pallet Racking System',
      description: 'Heavy-duty pallet racking for warehouse storage',
      category: 'Infrastructure',
      subcategory: 'Storage Systems',
      type: 'Fixed Asset',
      model: 'PRS-5000',
      manufacturer: 'Storage Solutions Inc',
      serialNumber: 'SSI-98765-2024',
      barcode: '123456789013',
      qrCode: 'AST-2024-002',
      status: 'active',
      condition: 'good',
      location: 'Warehouse B',
      zone: 'Zone 3',
      bay: 'Aisles A-D',
      assignedTo: null,
      assignedDate: null,
      department: 'Operations',
      purchaseDate: '2024-02-01',
      purchaseCost: 25000.00,
      currentValue: 24375.00,
      depreciationMethod: 'Straight Line',
      depreciationRate: '5% per year',
      usefulLife: 20,
      salvageValue: 5000.00,
      warrantyExpiry: '2029-02-01',
      maintenanceInterval: 'Quarterly',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-06-10',
      maintenanceStatus: 'good',
      insurancePolicy: 'INS-87655',
      insuranceExpiry: '2024-12-31',
      supplier: 'Storage Solutions Inc',
      manufacturer: 'Storage Solutions Inc',
      manufacturerDate: '2024-01-15',
      receivedDate: '2024-01-25',
      documents: ['specs-002.pdf', 'installation-002.pdf'],
      tags: ['racking', 'storage', 'infrastructure'],
      notes: 'Installed in Warehouse B',
      lastAudit: '2024-03-10',
      lastAuditBy: 'Audit Team',
      history: [
        { date: '2024-03-10', action: 'Inspection', performedBy: 'Safety Officer', notes: 'All good' },
        { date: '2024-02-01', action: 'Installed', performedBy: 'Install Team', notes: 'Completed' },
      ],
    },
    {
      id: 'AST-003',
      assetTag: 'AST-2024-003',
      name: 'Barcode Scanner - Industrial',
      description: 'Industrial grade barcode scanner for inventory',
      category: 'IT Equipment',
      subcategory: 'Scanning Devices',
      type: 'Electronic',
      model: 'BS-2000-Pro',
      manufacturer: 'ScanTech',
      serialNumber: 'ST-12345-2024',
      barcode: '123456789014',
      qrCode: 'AST-2024-003',
      status: 'active',
      condition: 'excellent',
      location: 'Warehouse A',
      zone: 'Zone 2',
      bay: 'Station-03',
      assignedTo: 'Jane Smith',
      assignedDate: '2024-02-10',
      department: 'Inventory',
      purchaseDate: '2024-02-05',
      purchaseCost: 850.00,
      currentValue: 807.50,
      depreciationMethod: 'Straight Line',
      depreciationRate: '20% per year',
      usefulLife: 5,
      salvageValue: 100.00,
      warrantyExpiry: '2025-02-05',
      maintenanceInterval: 'Quarterly',
      lastMaintenance: '2024-03-05',
      nextMaintenance: '2024-06-05',
      maintenanceStatus: 'good',
      insurancePolicy: null,
      insuranceExpiry: null,
      supplier: 'ScanTech',
      manufacturer: 'ScanTech',
      manufacturerDate: '2024-01-20',
      receivedDate: '2024-02-01',
      documents: ['manual-003.pdf', 'warranty-003.pdf'],
      tags: ['scanner', 'barcode', 'handheld'],
      notes: 'Assigned to inventory team',
      lastAudit: '2024-03-15',
      lastAuditBy: 'Audit Team',
      history: [
        { date: '2024-03-05', action: 'Maintenance', performedBy: 'Tech Team', notes: 'Firmware updated' },
        { date: '2024-02-10', action: 'Assigned', performedBy: 'Jane Smith', notes: 'Assigned to user' },
      ],
    },
    {
      id: 'AST-004',
      assetTag: 'AST-2024-004',
      name: 'Pallet Jack - Manual',
      description: 'Manual pallet jack for warehouse use',
      category: 'Equipment',
      subcategory: 'Material Handling',
      type: 'Light Equipment',
      model: 'PJ-1000M',
      manufacturer: 'LiftMaster Inc',
      serialNumber: 'LM-23456-2024',
      barcode: '123456789015',
      qrCode: 'AST-2024-004',
      status: 'active',
      condition: 'good',
      location: 'Warehouse C',
      zone: 'Zone 5',
      bay: 'Bay-12',
      assignedTo: null,
      assignedDate: null,
      department: 'Operations',
      purchaseDate: '2024-01-20',
      purchaseCost: 1200.00,
      currentValue: 1140.00,
      depreciationMethod: 'Straight Line',
      depreciationRate: '10% per year',
      usefulLife: 10,
      salvageValue: 200.00,
      warrantyExpiry: '2025-01-20',
      maintenanceInterval: 'Quarterly',
      lastMaintenance: '2024-03-12',
      nextMaintenance: '2024-06-12',
      maintenanceStatus: 'good',
      insurancePolicy: null,
      insuranceExpiry: null,
      supplier: 'Industrial Equipment Co',
      manufacturer: 'LiftMaster Inc',
      manufacturerDate: '2024-01-05',
      receivedDate: '2024-01-15',
      documents: ['manual-004.pdf'],
      tags: ['pallet-jack', 'material-handling'],
      notes: 'General use',
      lastAudit: '2024-03-12',
      lastAuditBy: 'Audit Team',
      history: [
        { date: '2024-03-12', action: 'Maintenance', performedBy: 'Tech Team', notes: 'Lubricated' },
      ],
    },
    {
      id: 'AST-005',
      assetTag: 'AST-2024-005',
      name: 'Inventory Management Server',
      description: 'Main server for inventory management system',
      category: 'IT Equipment',
      subcategory: 'Servers',
      type: 'Electronic',
      model: 'PowerEdge R750',
      manufacturer: 'Dell',
      serialNumber: 'DELL-98765-2024',
      barcode: '123456789016',
      qrCode: 'AST-2024-005',
      status: 'active',
      condition: 'excellent',
      location: 'Data Center',
      zone: 'Rack A',
      bay: 'Server-01',
      assignedTo: 'IT Team',
      assignedDate: '2024-01-10',
      department: 'IT',
      purchaseDate: '2024-01-05',
      purchaseCost: 15000.00,
      currentValue: 14250.00,
      depreciationMethod: 'Straight Line',
      depreciationRate: '20% per year',
      usefulLife: 5,
      salvageValue: 2000.00,
      warrantyExpiry: '2026-01-05',
      maintenanceInterval: 'Monthly',
      lastMaintenance: '2024-03-14',
      nextMaintenance: '2024-04-14',
      maintenanceStatus: 'good',
      insurancePolicy: 'INS-87656',
      insuranceExpiry: '2024-12-31',
      supplier: 'Dell Technologies',
      manufacturer: 'Dell',
      manufacturerDate: '2023-12-10',
      receivedDate: '2024-01-02',
      documents: ['specs-005.pdf', 'warranty-005.pdf', 'config-005.pdf'],
      tags: ['server', 'it', 'infrastructure'],
      notes: 'Production server',
      lastAudit: '2024-03-14',
      lastAuditBy: 'IT Audit',
      history: [
        { date: '2024-03-14', action: 'Maintenance', performedBy: 'IT Team', notes: 'Security updates' },
        { date: '2024-02-14', action: 'Maintenance', performedBy: 'IT Team', notes: 'Routine check' },
      ],
    },
    {
      id: 'AST-006',
      assetTag: 'AST-2024-006',
      name: 'Desktop Computer - Dell Optiplex',
      description: 'Desktop computer for office use',
      category: 'IT Equipment',
      subcategory: 'Computers',
      type: 'Electronic',
      model: 'Optiplex 7080',
      manufacturer: 'Dell',
      serialNumber: 'DELL-54321-2024',
      barcode: '123456789017',
      qrCode: 'AST-2024-006',
      status: 'active',
      condition: 'good',
      location: 'Office A',
      zone: 'Floor 1',
      bay: 'Desk-15',
      assignedTo: 'Mike Johnson',
      assignedDate: '2024-02-15',
      department: 'Operations',
      purchaseDate: '2024-02-10',
      purchaseCost: 1200.00,
      currentValue: 1140.00,
      depreciationMethod: 'Straight Line',
      depreciationRate: '20% per year',
      usefulLife: 5,
      salvageValue: 200.00,
      warrantyExpiry: '2026-02-10',
      maintenanceInterval: 'Quarterly',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-06-10',
      maintenanceStatus: 'good',
      insurancePolicy: null,
      insuranceExpiry: null,
      supplier: 'Dell Technologies',
      manufacturer: 'Dell',
      manufacturerDate: '2024-01-15',
      receivedDate: '2024-02-01',
      documents: ['manual-006.pdf'],
      tags: ['desktop', 'computer', 'office'],
      notes: 'Assigned to Mike Johnson',
      lastAudit: '2024-03-10',
      lastAuditBy: 'IT Audit',
      history: [
        { date: '2024-03-10', action: 'Setup', performedBy: 'IT Team', notes: 'User setup completed' },
        { date: '2024-02-15', action: 'Assigned', performedBy: 'Mike Johnson', notes: 'Assigned to user' },
      ],
    },
    {
      id: 'AST-007',
      assetTag: 'AST-2024-007',
      name: 'Conveyor System',
      description: 'Automated conveyor system for warehouse',
      category: 'Equipment',
      subcategory: 'Automation',
      type: 'Heavy Equipment',
      model: 'CS-5000-Auto',
      manufacturer: 'ConveyorTech',
      serialNumber: 'CT-11223-2024',
      barcode: '123456789018',
      qrCode: 'AST-2024-007',
      status: 'maintenance',
      condition: 'fair',
      location: 'Warehouse A',
      zone: 'Packing Area',
      bay: 'Line-01',
      assignedTo: null,
      assignedDate: null,
      department: 'Operations',
      purchaseDate: '2024-01-25',
      purchaseCost: 45000.00,
      currentValue: 42750.00,
      depreciationMethod: 'Straight Line',
      depreciationRate: '10% per year',
      usefulLife: 10,
      salvageValue: 10000.00,
      warrantyExpiry: '2026-01-25',
      maintenanceInterval: 'Weekly',
      lastMaintenance: '2024-03-13',
      nextMaintenance: '2024-03-20',
      maintenanceStatus: 'overdue',
      insurancePolicy: 'INS-87657',
      insuranceExpiry: '2024-12-31',
      supplier: 'ConveyorTech',
      manufacturer: 'ConveyorTech',
      manufacturerDate: '2024-01-10',
      receivedDate: '2024-01-20',
      documents: ['manual-007.pdf', 'warranty-007.pdf'],
      tags: ['conveyor', 'automation', 'maintenance'],
      notes: 'Scheduled for maintenance',
      lastAudit: '2024-03-13',
      lastAuditBy: 'Tech Team',
      history: [
        { date: '2024-03-13', action: 'Maintenance', performedBy: 'Tech Team', notes: 'Belt replacement needed' },
        { date: '2024-03-10', action: 'Inspection', performedBy: 'Safety Officer', notes: 'Issues detected' },
      ],
    },
    {
      id: 'AST-008',
      assetTag: 'AST-2024-008',
      name: 'Laptop - Dell Latitude',
      description: 'Laptop for field operations',
      category: 'IT Equipment',
      subcategory: 'Laptops',
      type: 'Electronic',
      model: 'Latitude 7430',
      manufacturer: 'Dell',
      serialNumber: 'DELL-13579-2024',
      barcode: '123456789019',
      qrCode: 'AST-2024-008',
      status: 'active',
      condition: 'excellent',
      location: 'Field',
      zone: null,
      bay: null,
      assignedTo: 'Sarah Wilson',
      assignedDate: '2024-03-01',
      department: 'Sales',
      purchaseDate: '2024-02-28',
      purchaseCost: 1800.00,
      currentValue: 1755.00,
      depreciationMethod: 'Straight Line',
      depreciationRate: '20% per year',
      usefulLife: 5,
      salvageValue: 300.00,
      warrantyExpiry: '2026-02-28',
      maintenanceInterval: 'Quarterly',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-06-01',
      maintenanceStatus: 'good',
      insurancePolicy: 'INS-87658',
      insuranceExpiry: '2024-12-31',
      supplier: 'Dell Technologies',
      manufacturer: 'Dell',
      manufacturerDate: '2024-02-15',
      receivedDate: '2024-02-25',
      documents: ['manual-008.pdf', 'warranty-008.pdf'],
      tags: ['laptop', 'mobile', 'field'],
      notes: 'Field operations',
      lastAudit: '2024-03-01',
      lastAuditBy: 'IT Audit',
      history: [
        { date: '2024-03-01', action: 'Assigned', performedBy: 'Sarah Wilson', notes: 'Assigned to user' },
        { date: '2024-03-01', action: 'Setup', performedBy: 'IT Team', notes: 'Configured' },
      ],
    },
    {
      id: 'AST-009',
      assetTag: 'AST-2024-009',
      name: 'RFID Gate System',
      description: 'RFID gate for automated inventory tracking',
      category: 'Equipment',
      subcategory: 'RFID',
      type: 'Electronic',
      model: 'RF-Gate-2000',
      manufacturer: 'RFID Solutions',
      serialNumber: 'RFID-24680-2024',
      barcode: '123456789020',
      qrCode: 'AST-2024-009',
      status: 'active',
      condition: 'excellent',
      location: 'Warehouse A',
      zone: 'Shipping',
      bay: 'Gate-01',
      assignedTo: null,
      assignedDate: null,
      department: 'Operations',
      purchaseDate: '2024-02-15',
      purchaseCost: 8500.00,
      currentValue: 8250.00,
      depreciationMethod: 'Straight Line',
      depreciationRate: '15% per year',
      usefulLife: 7,
      salvageValue: 1500.00,
      warrantyExpiry: '2026-02-15',
      maintenanceInterval: 'Monthly',
      lastMaintenance: '2024-03-15',
      nextMaintenance: '2024-04-15',
      maintenanceStatus: 'good',
      insurancePolicy: 'INS-87659',
      insuranceExpiry: '2024-12-31',
      supplier: 'RFID Solutions',
      manufacturer: 'RFID Solutions',
      manufacturerDate: '2024-02-01',
      receivedDate: '2024-02-10',
      documents: ['manual-009.pdf', 'config-009.pdf'],
      tags: ['rfid', 'automation', 'gate'],
      notes: 'Shipping area',
      lastAudit: '2024-03-15',
      lastAuditBy: 'Tech Team',
      history: [
        { date: '2024-03-15', action: 'Calibration', performedBy: 'Tech Team', notes: 'Calibrated' },
        { date: '2024-02-15', action: 'Installed', performedBy: 'Install Team', notes: 'Installation complete' },
      ],
    },
    {
      id: 'AST-010',
      assetTag: 'AST-2024-010',
      name: 'Company Vehicle - Ford Transit',
      description: 'Cargo van for deliveries',
      category: 'Vehicle',
      subcategory: 'Delivery Van',
      type: 'Fleet',
      model: 'Transit 350',
      manufacturer: 'Ford',
      serialNumber: 'FORD-112233-2024',
      barcode: '123456789021',
      qrCode: 'AST-2024-010',
      status: 'active',
      condition: 'good',
      location: 'Vehicle Depot',
      zone: 'Lot A',
      bay: 'Spot-05',
      assignedTo: 'Delivery Team',
      assignedDate: '2024-02-20',
      department: 'Logistics',
      purchaseDate: '2024-02-15',
      purchaseCost: 45000.00,
      currentValue: 43875.00,
      depreciationMethod: 'Straight Line',
      depreciationRate: '15% per year',
      usefulLife: 7,
      salvageValue: 10000.00,
      warrantyExpiry: '2027-02-15',
      maintenanceInterval: 'Monthly',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-04-10',
      maintenanceStatus: 'good',
      insurancePolicy: 'INS-87660',
      insuranceExpiry: '2024-12-31',
      registrationNumber: 'XYZ-1234',
      licensePlate: 'ABC-5678',
      supplier: 'Ford Dealership',
      manufacturer: 'Ford',
      manufacturerDate: '2024-01-20',
      receivedDate: '2024-02-10',
      documents: ['registration-010.pdf', 'insurance-010.pdf', 'manual-010.pdf'],
      tags: ['vehicle', 'fleet', 'delivery'],
      notes: 'Main delivery vehicle',
      lastAudit: '2024-03-10',
      lastAuditBy: 'Fleet Manager',
      history: [
        { date: '2024-03-10', action: 'Maintenance', performedBy: 'Service Center', notes: 'Oil change' },
        { date: '2024-02-20', action: 'Assigned', performedBy: 'Fleet Manager', notes: 'Assigned to delivery team' },
      ],
    },
  ];

  // Asset categories
  const categories = [
    { id: 'equipment', name: 'Equipment', icon: Wrench, count: 4 },
    { id: 'it', name: 'IT Equipment', icon: Monitor, count: 3 },
    { id: 'infrastructure', name: 'Infrastructure', icon: Building2, count: 1 },
    { id: 'vehicle', name: 'Vehicle', icon: Truck, count: 1 },
    { id: 'furniture', name: 'Furniture', icon: Sofa, count: 0 },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    maintenance: { label: 'Maintenance', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Wrench },
    retired: { label: 'Retired', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
    damaged: { label: 'Damaged', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
    lost: { label: 'Lost', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
  };

  const conditionConfig = {
    excellent: { label: 'Excellent', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    good: { label: 'Good', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
    fair: { label: 'Fair', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle },
    poor: { label: 'Poor', color: 'bg-orange-100 text-orange-700', icon: AlertTriangle },
    damaged: { label: 'Damaged', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  };

  const maintenanceStatusConfig = {
    good: { label: 'Good', color: 'bg-green-100 text-green-700' },
    upcoming: { label: 'Upcoming', color: 'bg-blue-100 text-blue-700' },
    overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700' },
  };

  // Locations
  const locations = [
    { id: 'wh-a', name: 'Warehouse A' },
    { id: 'wh-b', name: 'Warehouse B' },
    { id: 'wh-c', name: 'Warehouse C' },
    { id: 'data-center', name: 'Data Center' },
    { id: 'office-a', name: 'Office A' },
    { id: 'field', name: 'Field' },
    { id: 'depot', name: 'Vehicle Depot' },
  ];

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Package;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getConditionColor = (condition) => {
    return conditionConfig[condition]?.color || 'bg-gray-100 text-gray-700';
  };

  const getMaintenanceStatusColor = (status) => {
    return maintenanceStatusConfig[status]?.color || 'bg-gray-100 text-gray-700';
  };

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset.category.toLowerCase().includes(selectedCategory);
    const matchesStatus = selectedStatus === 'all' || asset.status === selectedStatus;
    const matchesCondition = selectedCondition === 'all' || asset.condition === selectedCondition;
    const matchesLocation = selectedLocation === 'all' || asset.location === selectedLocation;
    const matchesSearch = asset.assetTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (assignedTo && asset.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesCondition && matchesLocation && matchesSearch;
  });

  const stats = {
    total: assets.length,
    active: assets.filter(a => a.status === 'active').length,
    maintenance: assets.filter(a => a.status === 'maintenance').length,
    retired: assets.filter(a => a.status === 'retired').length,
    totalValue: assets.reduce((sum, a) => sum + a.currentValue, 0),
    purchaseValue: assets.reduce((sum, a) => sum + a.purchaseCost, 0),
    depreciation: assets.reduce((sum, a) => sum + (a.purchaseCost - a.currentValue), 0),
    maintenanceDue: assets.filter(a => a.maintenanceStatus === 'overdue').length,
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Asset Depository</h1>
            <p className="text-black/50 mt-1">Manage and track all company assets, equipment, and inventory</p>
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
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#F5EEE9]">
                  <Upload size={16} />
                  Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Import from Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileJson className="mr-2 h-4 w-4" />
                  Import from CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Database className="mr-2 h-4 w-4" />
                  Import from ERP
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
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Assets</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Database size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">Maintenance</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.maintenance}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <Wrench size={18} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Current Value</p>
                  <p className="text-xl font-bold text-black mt-1">${stats.totalValue.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <DollarSign size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Purchase Value</p>
                  <p className="text-xl font-bold text-black mt-1">${stats.purchaseValue.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <CreditCard size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Depreciation</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">${stats.depreciation.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <TrendingDown size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Maintenance Due</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.maintenanceDue}</p>
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
              placeholder="Search by asset tag, name, serial, model, or assignee..."
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
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
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
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
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

      {/* Asset Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredAssets.map((asset) => {
            const StatusIcon = statusConfig[asset.status]?.icon || Package;
            const ConditionIcon = conditionConfig[asset.condition]?.icon || CheckCircle;
            
            return (
              <Card key={asset.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          asset.category === 'Equipment' && 'bg-blue-100',
                          asset.category === 'IT Equipment' && 'bg-purple-100',
                          asset.category === 'Infrastructure' && 'bg-green-100',
                          asset.category === 'Vehicle' && 'bg-orange-100',
                        )}>
                          {asset.category === 'Equipment' && <Wrench size={18} className="text-blue-700" />}
                          {asset.category === 'IT Equipment' && <Monitor size={18} className="text-purple-700" />}
                          {asset.category === 'Infrastructure' && <Building2 size={18} className="text-green-700" />}
                          {asset.category === 'Vehicle' && <Truck size={18} className="text-orange-700" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs border-0", getStatusColor(asset.status))}>
                              <StatusIcon className="mr-1" size={10} />
                              {asset.status}
                            </Badge>
                            <Badge className={cn("text-xs", getConditionColor(asset.condition))}>
                              {asset.condition}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-black">{asset.name}</h3>
                          <p className="text-xs text-black/50">{asset.assetTag}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedAsset(asset);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedAsset(asset);
                            setShowTransferDialog(true);
                          }}>
                            <Truck className="mr-2 h-4 w-4" />
                            Transfer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedAsset(asset);
                            setShowMaintenanceDialog(true);
                          }}>
                            <Wrench className="mr-2 h-4 w-4" />
                            Schedule Maintenance
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedAsset(asset);
                            setShowDepreciationDialog(true);
                          }}>
                            <TrendingDown className="mr-2 h-4 w-4" />
                            Depreciation
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <QrCode className="mr-2 h-4 w-4" />
                            Generate QR
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Barcode className="mr-2 h-4 w-4" />
                            Generate Barcode
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setSelectedAsset(asset);
                            setShowEditDialog(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                            setSelectedAsset(asset);
                            setShowDeleteDialog(true);
                          }}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Key Details */}
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Model</span>
                        <span className="font-medium">{asset.model}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Serial</span>
                        <span className="font-mono text-xs">{asset.serialNumber}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Current Value</span>
                        <span className="font-medium text-green-600">${asset.currentValue.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="p-3 bg-[#F5EEE9]/50 rounded-lg mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-red-600" />
                        <span>{asset.location} • {asset.bay || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Assignment */}
                    {asset.assignedTo && (
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <User size={14} className="text-blue-600" />
                        <span>Assigned to: <span className="font-medium">{asset.assignedTo}</span></span>
                      </div>
                    )}

                    {/* Maintenance Status */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="flex items-center gap-1">
                        <Wrench size={12} className="text-black/50" />
                        <span className="text-black/50">Next:</span>
                        <span>{asset.nextMaintenance}</span>
                      </div>
                      <Badge className={cn("text-xs", getMaintenanceStatusColor(asset.maintenanceStatus))}>
                        {asset.maintenanceStatus}
                      </Badge>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {asset.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9] bg-[#F5EEE9]/30">
                          {tag}
                        </Badge>
                      ))}
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
                  <TableHead className="text-black/50">Asset Tag</TableHead>
                  <TableHead className="text-black/50">Name</TableHead>
                  <TableHead className="text-black/50">Category</TableHead>
                  <TableHead className="text-black/50">Model</TableHead>
                  <TableHead className="text-black/50">Serial</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Condition</TableHead>
                  <TableHead className="text-black/50">Location</TableHead>
                  <TableHead className="text-black/50">Assigned To</TableHead>
                  <TableHead className="text-black/50 text-right">Purchase Cost</TableHead>
                  <TableHead className="text-black/50 text-right">Current Value</TableHead>
                  <TableHead className="text-black/50">Next Maintenance</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">{asset.assetTag}</TableCell>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.model}</TableCell>
                    <TableCell className="font-mono text-xs">{asset.serialNumber}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(asset.status))}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getConditionColor(asset.condition))}>
                        {asset.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>{asset.bay || asset.location}</TableCell>
                    <TableCell>{asset.assignedTo || '—'}</TableCell>
                    <TableCell className="text-right">${asset.purchaseCost.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600">${asset.currentValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{asset.nextMaintenance}</span>
                        <Badge className={cn("text-xs", getMaintenanceStatusColor(asset.maintenanceStatus))}>
                          {asset.maintenanceStatus}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedAsset(asset);
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
                Showing {filteredAssets.length} of {assets.length} assets
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

      {/* Create Asset Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>
              Add a new asset to the depository
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Asset Name</Label>
                    <Input placeholder="e.g., Forklift - Electric" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="it">IT Equipment</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input placeholder="e.g., FL-5000E" />
                  </div>
                  <div className="space-y-2">
                    <Label>Manufacturer</Label>
                    <Input placeholder="e.g., LiftMaster Inc" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Serial Number</Label>
                    <Input placeholder="e.g., LM-87654-2024" />
                  </div>
                  <div className="space-y-2">
                    <Label>Asset Tag</Label>
                    <Input placeholder="e.g., AST-2024-001" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the asset" rows={3} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(loc => (
                          <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bay/Position</Label>
                    <Input placeholder="e.g., Bay-05" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Condition</Label>
                    <Select defaultValue="good">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Assigned To</Label>
                    <Input placeholder="e.g., John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input placeholder="e.g., Operations" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Purchase Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Purchase Cost ($)</Label>
                    <Input type="number" step="0.01" placeholder="0.00" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Depreciation Method</Label>
                    <Select defaultValue="straight-line">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="straight-line">Straight Line</SelectItem>
                        <SelectItem value="declining">Declining Balance</SelectItem>
                        <SelectItem value="sum-of-years">Sum of Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Depreciation Rate (%)</Label>
                    <Input type="number" step="0.1" placeholder="10" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Useful Life (years)</Label>
                    <Input type="number" placeholder="5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Salvage Value ($)</Label>
                    <Input type="number" step="0.01" placeholder="0.00" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Supplier</Label>
                    <Input placeholder="e.g., Industrial Equipment Co" />
                  </div>
                  <div className="space-y-2">
                    <Label>Warranty Expiry</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Insurance Policy</Label>
                    <Input placeholder="e.g., INS-87654" />
                  </div>
                  <div className="space-y-2">
                    <Label>Insurance Expiry</Label>
                    <Input type="date" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Maintenance Interval</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Last Maintenance</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes about the asset" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>

                <div className="space-y-2">
                  <Label>Attachments</Label>
                  <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                    <Upload size={24} className="mx-auto text-black/30 mb-2" />
                    <p className="text-sm text-black/50">Drag files or click to upload</p>
                    <p className="text-xs text-black/30">Support: PDF, JPG, PNG (Max 10MB)</p>
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
              Add Asset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Asset Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Asset Details</DialogTitle>
          </DialogHeader>

          {selectedAsset && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      selectedAsset.category === 'Equipment' && 'bg-blue-100',
                      selectedAsset.category === 'IT Equipment' && 'bg-purple-100',
                      selectedAsset.category === 'Infrastructure' && 'bg-green-100',
                      selectedAsset.category === 'Vehicle' && 'bg-orange-100',
                    )}>
                      {selectedAsset.category === 'Equipment' && <Wrench size={24} className="text-blue-700" />}
                      {selectedAsset.category === 'IT Equipment' && <Monitor size={24} className="text-purple-700" />}
                      {selectedAsset.category === 'Infrastructure' && <Building2 size={24} className="text-green-700" />}
                      {selectedAsset.category === 'Vehicle' && <Truck size={24} className="text-orange-700" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedAsset.name}</h3>
                      <p className="text-sm text-black/50">{selectedAsset.assetTag}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black/50">Model</p>
                      <p className="font-medium">{selectedAsset.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Serial Number</p>
                      <p className="font-mono">{selectedAsset.serialNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Manufacturer</p>
                      <p className="font-medium">{selectedAsset.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Manufacturer Date</p>
                      <p>{selectedAsset.manufacturerDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Status</p>
                      <Badge className={cn("text-xs border-0", getStatusColor(selectedAsset.status))}>
                        {selectedAsset.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Condition</p>
                      <Badge className={cn("text-xs", getConditionColor(selectedAsset.condition))}>
                        {selectedAsset.condition}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F5EEE9] rounded-lg">
                    <p className="text-sm font-medium mb-2">Location</p>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={14} className="text-red-600" />
                      <span>{selectedAsset.location} • {selectedAsset.zone || 'N/A'} • {selectedAsset.bay || 'N/A'}</span>
                    </div>
                  </div>

                  {selectedAsset.assignedTo && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">Assignment</p>
                      <div className="flex items-center gap-2 text-sm">
                        <User size={14} className="text-blue-600" />
                        <span>Assigned to: <span className="font-medium">{selectedAsset.assignedTo}</span></span>
                        <span className="text-blue-600/50 mx-2">•</span>
                        <span>Dept: {selectedAsset.department}</span>
                        <span className="text-blue-600/50 mx-2">•</span>
                        <span>Since: {selectedAsset.assignedDate}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedAsset.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedAsset.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-700">{selectedAsset.notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="financial" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Purchase Cost</p>
                        <p className="text-lg font-bold">${selectedAsset.purchaseCost.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Current Value</p>
                        <p className="text-lg font-bold text-green-600">${selectedAsset.currentValue.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Depreciation</p>
                        <p className="text-lg font-bold text-orange-600">
                          ${(selectedAsset.purchaseCost - selectedAsset.currentValue).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Salvage Value</p>
                        <p className="text-lg font-bold">${selectedAsset.salvageValue.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/50">Depreciation Method</span>
                      <span className="font-medium">{selectedAsset.depreciationMethod}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/50">Depreciation Rate</span>
                      <span className="font-medium">{selectedAsset.depreciationRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/50">Useful Life</span>
                      <span className="font-medium">{selectedAsset.usefulLife} years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/50">Purchase Date</span>
                      <span className="font-medium">{selectedAsset.purchaseDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/50">Supplier</span>
                      <span className="font-medium">{selectedAsset.supplier}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/50">Warranty Expiry</span>
                      <span className="font-medium">{selectedAsset.warrantyExpiry}</span>
                    </div>
                    {selectedAsset.insurancePolicy && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black/50">Insurance</span>
                        <span className="font-medium">{selectedAsset.insurancePolicy} (exp: {selectedAsset.insuranceExpiry})</span>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="maintenance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Last Maintenance</p>
                        <p className="text-lg font-bold">{selectedAsset.lastMaintenance}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#F5EEE9]">
                      <CardContent className="p-3">
                        <p className="text-xs text-black/50">Next Maintenance</p>
                        <p className="text-lg font-bold">{selectedAsset.nextMaintenance}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/50">Maintenance Interval</span>
                      <span className="font-medium">{selectedAsset.maintenanceInterval}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/50">Maintenance Status</span>
                      <Badge className={cn("text-xs", getMaintenanceStatusColor(selectedAsset.maintenanceStatus))}>
                        {selectedAsset.maintenanceStatus}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Maintenance History</p>
                    {selectedAsset.history
                      .filter(h => h.action.includes('Maintenance') || h.action.includes('Inspection'))
                      .map((item, index) => (
                        <div key={index} className="p-2 border border-[#F5EEE9] rounded-lg">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{item.action}</p>
                            <span className="text-xs text-black/50">{item.date}</span>
                          </div>
                          <p className="text-xs text-black/50">By: {item.performedBy}</p>
                          <p className="text-xs text-black/70 mt-1">{item.notes}</p>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedAsset.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-1">
                            {item.action.includes('Maintenance') && <Wrench size={14} className="text-yellow-600" />}
                            {item.action.includes('Inspection') && <CheckCircle size={14} className="text-green-600" />}
                            {item.action.includes('Assigned') && <User size={14} className="text-blue-600" />}
                            {item.action.includes('Installed') && <Check size={14} className="text-purple-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{item.action}</p>
                              <span className="text-xs text-black/50">{item.date}</span>
                            </div>
                            <p className="text-xs text-black/50">By: {item.performedBy}</p>
                            {item.notes && <p className="text-xs text-black/70 mt-1">{item.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <QrCode className="mr-2 h-4 w-4" />
              Generate Label
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Transfer Asset</DialogTitle>
            <DialogDescription>
              Move asset to another location or assign to different user
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedAsset?.name}</p>
              <p className="text-sm text-black/50">{selectedAsset?.assetTag}</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <MapPin size={14} className="text-red-600" />
                <span>Current: {selectedAsset?.location} • {selectedAsset?.bay}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Destination Location</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Destination Bay</Label>
              <Input placeholder="e.g., Bay-10" />
            </div>

            <div className="space-y-2">
              <Label>Assign To</Label>
              <Input placeholder="Enter person name" />
            </div>

            <div className="space-y-2">
              <Label>Reason</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relocation">Relocation</SelectItem>
                  <SelectItem value="reassignment">Reassignment</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="loan">Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes" rows={2} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Transfer Asset
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
            <TooltipContent side="left">Add Asset</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowBulkDialog(true)}
              >
                <Copy size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Bulk Actions</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowReportDialog(true)}
              >
                <BarChart3 size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Asset Report</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default AssetDepositoryPage;