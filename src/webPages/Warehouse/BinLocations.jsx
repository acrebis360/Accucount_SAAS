// app/dashboard/bin-locations/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Grid,
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
  List,

  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  User,
  Users,
  MapPin,

  Move,

  RotateCcw,
  PackageCheck,
  PackageMinus,
  PackagePlus,
  Wrench,
  Activity,
  QrCode,
  Barcode,
  Scan,
  Camera,
  Map,
  Square,
  
  Snowflake,
  ArrowLeftRight
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

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BinLocationsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBin, setSelectedBin] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [showBarcodeDialog, setShowBarcodeDialog] = useState(false);
  const [showInventoryDialog, setShowInventoryDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample bin locations data
  const binLocations = [
    {
      id: 'BIN-001',
      binCode: 'A-01-01',
      name: 'Aisle A - Bay 01 - Level 01',
      warehouse: 'Warehouse A',
      zone: 'Storage Zone A',
      zoneId: 'ZN-002',
      type: 'pallet-rack',
      subType: 'standard-pallet',
      status: 'occupied',
      condition: 'good',
      capacity: 1,
      unit: 'pallet',
      currentItem: 'Premium Wireless Headphones',
      currentSku: 'SKU-001',
      currentBatch: 'BATCH-001',
      currentQuantity: 1,
      maxWeight: 1000,
      currentWeight: 450,
      weightUnit: 'kg',
      maxVolume: 100,
      currentVolume: 45,
      volumeUnit: 'cu ft',
      dimensions: '48" x 40" x 60"',
      position: { rack: 'A', bay: 1, level: 1, side: 'left' },
      coordinates: { x: 10, y: 20, z: 5 },
      lastAssigned: '2024-03-10',
      lastActivity: '2024-03-15 14:30',
      lastCounted: '2024-03-15',
      countAccuracy: 100,
      assignedBy: 'John Doe',
      tags: ['high-value', 'electronics'],
      notes: 'Store at ambient temperature',
      history: [
        { date: '2024-03-15', action: 'Inventory Count', user: 'John Doe', result: 'Matched' },
        { date: '2024-03-10', action: 'Assigned', user: 'Jane Smith', item: 'SKU-001' },
      ],
    },
    {
      id: 'BIN-002',
      binCode: 'A-01-02',
      name: 'Aisle A - Bay 01 - Level 02',
      warehouse: 'Warehouse A',
      zone: 'Storage Zone A',
      zoneId: 'ZN-002',
      type: 'pallet-rack',
      subType: 'standard-pallet',
      status: 'occupied',
      condition: 'good',
      capacity: 1,
      unit: 'pallet',
      currentItem: 'Premium Wireless Headphones',
      currentSku: 'SKU-001',
      currentBatch: 'BATCH-001',
      currentQuantity: 1,
      maxWeight: 1000,
      currentWeight: 450,
      weightUnit: 'kg',
      maxVolume: 100,
      currentVolume: 45,
      volumeUnit: 'cu ft',
      dimensions: '48" x 40" x 60"',
      position: { rack: 'A', bay: 1, level: 2, side: 'left' },
      coordinates: { x: 10, y: 30, z: 5 },
      lastAssigned: '2024-03-10',
      lastActivity: '2024-03-15 14:30',
      lastCounted: '2024-03-15',
      countAccuracy: 100,
      assignedBy: 'John Doe',
      tags: ['high-value', 'electronics'],
      notes: 'Store at ambient temperature',
      history: [
        { date: '2024-03-15', action: 'Inventory Count', user: 'John Doe', result: 'Matched' },
      ],
    },
    {
      id: 'BIN-003',
      binCode: 'A-01-03',
      name: 'Aisle A - Bay 01 - Level 03',
      warehouse: 'Warehouse A',
      zone: 'Storage Zone A',
      zoneId: 'ZN-002',
      type: 'pallet-rack',
      subType: 'standard-pallet',
      status: 'empty',
      condition: 'good',
      capacity: 1,
      unit: 'pallet',
      currentItem: null,
      currentSku: null,
      currentBatch: null,
      currentQuantity: 0,
      maxWeight: 1000,
      currentWeight: 0,
      weightUnit: 'kg',
      maxVolume: 100,
      currentVolume: 0,
      volumeUnit: 'cu ft',
      dimensions: '48" x 40" x 60"',
      position: { rack: 'A', bay: 1, level: 3, side: 'left' },
      coordinates: { x: 10, y: 40, z: 5 },
      lastAssigned: null,
      lastActivity: '2024-03-14 09:20',
      lastCounted: '2024-03-14',
      countAccuracy: 100,
      assignedBy: null,
      tags: ['empty', 'available'],
      notes: 'Ready for assignment',
      history: [
        { date: '2024-03-14', action: 'Inventory Count', user: 'Jane Smith', result: 'Empty' },
      ],
    },
    {
      id: 'BIN-004',
      binCode: 'A-02-01',
      name: 'Aisle A - Bay 02 - Level 01',
      warehouse: 'Warehouse A',
      zone: 'Storage Zone A',
      zoneId: 'ZN-002',
      type: 'pallet-rack',
      subType: 'standard-pallet',
      status: 'occupied',
      condition: 'good',
      capacity: 1,
      unit: 'pallet',
      currentItem: 'Organic Protein Powder',
      currentSku: 'SKU-002',
      currentBatch: 'BATCH-002',
      currentQuantity: 1,
      maxWeight: 800,
      currentWeight: 320,
      weightUnit: 'kg',
      maxVolume: 80,
      currentVolume: 35,
      volumeUnit: 'cu ft',
      dimensions: '48" x 40" x 48"',
      position: { rack: 'A', bay: 2, level: 1, side: 'left' },
      coordinates: { x: 20, y: 20, z: 5 },
      lastAssigned: '2024-03-12',
      lastActivity: '2024-03-14 11:15',
      lastCounted: '2024-03-14',
      countAccuracy: 100,
      assignedBy: 'Mike Johnson',
      tags: ['health', 'supplements'],
      notes: 'Store in cool, dry place',
      history: [
        { date: '2024-03-14', action: 'Inventory Count', user: 'Mike Johnson', result: 'Matched' },
        { date: '2024-03-12', action: 'Assigned', user: 'Mike Johnson', item: 'SKU-002' },
      ],
    },
    {
      id: 'BIN-005',
      binCode: 'B-01-01',
      name: 'Aisle B - Bay 01 - Level 01',
      warehouse: 'Warehouse A',
      zone: 'Storage Zone B',
      zoneId: 'ZN-003',
      type: 'bulk-floor',
      subType: 'floor-storage',
      status: 'occupied',
      condition: 'good',
      capacity: 10,
      unit: 'pallets',
      currentItem: 'Canned Organic Soup',
      currentSku: 'SKU-006',
      currentBatch: 'BATCH-006',
      currentQuantity: 8,
      maxWeight: 5000,
      currentWeight: 1800,
      weightUnit: 'kg',
      maxVolume: 500,
      currentVolume: 200,
      volumeUnit: 'cu ft',
      dimensions: '120" x 120" x 60"',
      position: { area: 'B', row: 1, column: 1 },
      coordinates: { x: 30, y: 20, z: 1 },
      lastAssigned: '2024-03-08',
      lastActivity: '2024-03-15 10:30',
      lastCounted: '2024-03-15',
      countAccuracy: 100,
      assignedBy: 'Sarah Wilson',
      tags: ['food', 'bulk', 'canned'],
      notes: 'Floor storage area',
      history: [
        { date: '2024-03-15', action: 'Inventory Count', user: 'Sarah Wilson', result: 'Matched' },
        { date: '2024-03-08', action: 'Assigned', user: 'Sarah Wilson', item: 'SKU-006' },
      ],
    },
    {
      id: 'BIN-006',
      binCode: 'C-01-01',
      name: 'Cold Storage - Rack 01 - Level 01',
      warehouse: 'Warehouse C',
      zone: 'Cold Storage Zone',
      zoneId: 'ZN-004',
      type: 'cold-storage',
      subType: 'refrigerated-rack',
      status: 'occupied',
      condition: 'good',
      capacity: 1,
      unit: 'pallet',
      currentItem: 'Fresh Dairy Milk',
      currentSku: 'SKU-009',
      currentBatch: 'BATCH-009',
      currentQuantity: 1,
      maxWeight: 600,
      currentWeight: 350,
      weightUnit: 'kg',
      maxVolume: 70,
      currentVolume: 45,
      volumeUnit: 'cu ft',
      dimensions: '40" x 48" x 72"',
      temperature: '2-4°C',
      humidity: '65%',
      position: { rack: 'C', bay: 1, level: 1, side: 'left' },
      coordinates: { x: 40, y: 20, z: 6 },
      lastAssigned: '2024-03-13',
      lastActivity: '2024-03-15 08:45',
      lastCounted: '2024-03-15',
      countAccuracy: 100,
      assignedBy: 'Emma Watson',
      tags: ['cold-storage', 'dairy', 'perishable'],
      notes: 'Maintain temperature 2-4°C',
      history: [
        { date: '2024-03-15', action: 'Inventory Count', user: 'Emma Watson', result: 'Matched' },
        { date: '2024-03-13', action: 'Assigned', user: 'Emma Watson', item: 'SKU-009' },
      ],
    },
    {
      id: 'BIN-007',
      binCode: 'D-01-01',
      name: 'Freezer - Rack 01 - Level 01',
      warehouse: 'Warehouse C',
      zone: 'Freezer Zone',
      zoneId: 'ZN-005',
      type: 'freezer',
      subType: 'frozen-rack',
      status: 'occupied',
      condition: 'good',
      capacity: 1,
      unit: 'pallet',
      currentItem: 'Frozen Vegetables',
      currentSku: 'SKU-016',
      currentBatch: 'BATCH-016',
      currentQuantity: 1,
      maxWeight: 500,
      currentWeight: 280,
      weightUnit: 'kg',
      maxVolume: 60,
      currentVolume: 40,
      volumeUnit: 'cu ft',
      dimensions: '40" x 48" x 60"',
      temperature: '-18 to -22°C',
      humidity: '70%',
      position: { rack: 'D', bay: 1, level: 1, side: 'left' },
      coordinates: { x: 50, y: 20, z: 7 },
      lastAssigned: '2024-03-11',
      lastActivity: '2024-03-14 16:20',
      lastCounted: '2024-03-14',
      countAccuracy: 100,
      assignedBy: 'Anna Taylor',
      tags: ['freezer', 'frozen', 'vegetables'],
      notes: 'Maintain temperature below -18°C',
      history: [
        { date: '2024-03-14', action: 'Inventory Count', user: 'Anna Taylor', result: 'Matched' },
        { date: '2024-03-11', action: 'Assigned', user: 'Anna Taylor', item: 'SKU-016' },
      ],
    },
    {
      id: 'BIN-008',
      binCode: 'E-01-01',
      name: 'Picking - Bin 01',
      warehouse: 'Warehouse A',
      zone: 'Picking Zone',
      zoneId: 'ZN-006',
      type: 'picking-bin',
      subType: 'forward-pick',
      status: 'occupied',
      condition: 'good',
      capacity: 50,
      unit: 'units',
      currentItem: 'Premium Wireless Headphones',
      currentSku: 'SKU-001',
      currentBatch: 'BATCH-001',
      currentQuantity: 35,
      maxWeight: 100,
      currentWeight: 35,
      weightUnit: 'kg',
      maxVolume: 10,
      currentVolume: 7,
      volumeUnit: 'cu ft',
      dimensions: '24" x 18" x 12"',
      position: { rack: 'E', bay: 1, shelf: 1, bin: 1 },
      coordinates: { x: 60, y: 20, z: 8 },
      lastAssigned: '2024-03-14',
      lastActivity: '2024-03-15 13:15',
      lastCounted: '2024-03-15',
      countAccuracy: 100,
      assignedBy: 'Robert Brown',
      tags: ['picking', 'fast-moving', 'replenish'],
      notes: 'Replenish when below 10 units',
      minThreshold: 10,
      maxThreshold: 50,
      reorderPoint: 15,
      history: [
        { date: '2024-03-15', action: 'Inventory Count', user: 'Robert Brown', result: 'Matched' },
        { date: '2024-03-14', action: 'Assigned', user: 'Robert Brown', item: 'SKU-001' },
        { date: '2024-03-14', action: 'Replenished', user: 'Inventory Team', quantity: 25 },
      ],
    },
    {
      id: 'BIN-009',
      binCode: 'F-01-01',
      name: 'Hazardous - Bin 01',
      warehouse: 'Warehouse B',
      zone: 'Hazardous Materials Zone',
      zoneId: 'ZN-010',
      type: 'hazardous',
      subType: 'chemical-storage',
      status: 'occupied',
      condition: 'good',
      capacity: 4,
      unit: 'drums',
      currentItem: 'Industrial Lubricant - Grade A',
      currentSku: 'SKU-003',
      currentBatch: 'BATCH-003',
      currentQuantity: 2,
      maxWeight: 800,
      currentWeight: 370,
      weightUnit: 'kg',
      maxVolume: 80,
      currentVolume: 40,
      volumeUnit: 'cu ft',
      dimensions: '48" x 48" x 48"',
      ventilation: 'explosion-proof',
      spillContainment: true,
      hazmatType: 'flammable',
      position: { rack: 'F', bay: 1, level: 1 },
      coordinates: { x: 70, y: 20, z: 9 },
      lastAssigned: '2024-03-09',
      lastActivity: '2024-03-13 11:30',
      lastCounted: '2024-03-13',
      countAccuracy: 100,
      assignedBy: 'Richard Harris',
      tags: ['hazardous', 'chemical', 'flammable'],
      notes: 'Store away from ignition sources',
      safetyInfo: 'Use PPE when handling',
      history: [
        { date: '2024-03-13', action: 'Inventory Count', user: 'Richard Harris', result: 'Matched' },
        { date: '2024-03-09', action: 'Assigned', user: 'Richard Harris', item: 'SKU-003' },
      ],
    },
    {
      id: 'BIN-010',
      binCode: 'G-01-01',
      name: 'Returns - Bin 01',
      warehouse: 'Warehouse A',
      zone: 'Returns Zone',
      zoneId: 'ZN-009',
      type: 'returns',
      subType: 'inspection-bin',
      status: 'occupied',
      condition: 'inspection',
      capacity: 20,
      unit: 'units',
      currentItem: 'Smart LED TV 55"',
      currentSku: 'SKU-007',
      currentBatch: 'BATCH-007',
      currentQuantity: 3,
      maxWeight: 150,
      currentWeight: 75,
      weightUnit: 'kg',
      maxVolume: 30,
      currentVolume: 15,
      volumeUnit: 'cu ft',
      dimensions: '60" x 40" x 10"',
      position: { rack: 'G', bay: 1, shelf: 1 },
      coordinates: { x: 80, y: 20, z: 10 },
      lastAssigned: '2024-03-15',
      lastActivity: '2024-03-15 09:45',
      lastCounted: '2024-03-15',
      countAccuracy: 100,
      assignedBy: 'Thomas Anderson',
      tags: ['returns', 'inspection', 'electronics'],
      notes: 'Awaiting quality inspection',
      inspectionStatus: 'pending',
      history: [
        { date: '2024-03-15', action: 'Assigned', user: 'Thomas Anderson', item: 'SKU-007' },
        { date: '2024-03-15', action: 'Status Update', user: 'System', status: 'Inspection Pending' },
      ],
    },
    {
      id: 'BIN-011',
      binCode: 'A-03-01',
      name: 'Aisle A - Bay 03 - Level 01',
      warehouse: 'Warehouse A',
      zone: 'Storage Zone A',
      zoneId: 'ZN-002',
      type: 'pallet-rack',
      subType: 'standard-pallet',
      status: 'reserved',
      condition: 'good',
      capacity: 1,
      unit: 'pallet',
      currentItem: null,
      currentSku: null,
      currentBatch: null,
      currentQuantity: 0,
      reservedItem: 'Ergonomic Office Chair',
      reservedSku: 'SKU-004',
      reservedFor: 'Incoming Shipment',
      expectedArrival: '2024-03-18',
      maxWeight: 1000,
      currentWeight: 0,
      weightUnit: 'kg',
      maxVolume: 100,
      currentVolume: 0,
      volumeUnit: 'cu ft',
      dimensions: '48" x 40" x 60"',
      position: { rack: 'A', bay: 3, level: 1, side: 'left' },
      coordinates: { x: 30, y: 20, z: 5 },
      lastAssigned: null,
      lastActivity: '2024-03-16 10:00',
      lastCounted: '2024-03-16',
      countAccuracy: 100,
      assignedBy: 'Lisa Chen',
      tags: ['reserved', 'furniture', 'pending'],
      notes: 'Reserved for incoming shipment',
      history: [
        { date: '2024-03-16', action: 'Reserved', user: 'Lisa Chen', item: 'SKU-004' },
      ],
    },
    {
      id: 'BIN-012',
      binCode: 'A-01-04',
      name: 'Aisle A - Bay 01 - Level 04',
      warehouse: 'Warehouse A',
      zone: 'Storage Zone A',
      zoneId: 'ZN-002',
      type: 'pallet-rack',
      subType: 'standard-pallet',
      status: 'maintenance',
      condition: 'damaged',
      capacity: 1,
      unit: 'pallet',
      currentItem: null,
      currentSku: null,
      currentBatch: null,
      currentQuantity: 0,
      maxWeight: 1000,
      currentWeight: 0,
      weightUnit: 'kg',
      maxVolume: 100,
      currentVolume: 0,
      volumeUnit: 'cu ft',
      dimensions: '48" x 40" x 60"',
      position: { rack: 'A', bay: 1, level: 4, side: 'left' },
      coordinates: { x: 10, y: 50, z: 5 },
      lastAssigned: null,
      lastActivity: '2024-03-15 11:30',
      lastCounted: '2024-03-15',
      countAccuracy: 100,
      assignedBy: null,
      maintenanceReason: 'Damaged beam',
      estimatedRepair: '2024-03-20',
      tags: ['maintenance', 'damaged', 'repair'],
      notes: 'Out of service until repair',
      history: [
        { date: '2024-03-15', action: 'Maintenance Required', user: 'Safety Officer', reason: 'Damaged beam' },
      ],
    },
    {
      id: 'BIN-013',
      binCode: 'H-01-01',
      name: 'Overflow - Area 01',
      warehouse: 'Warehouse A',
      zone: 'Overflow Zone',
      type: 'overflow',
      subType: 'temporary',
      status: 'occupied',
      condition: 'good',
      capacity: 15,
      unit: 'pallets',
      currentItem: 'Mixed Items',
      currentSku: 'MIXED',
      currentBatch: 'VARIOUS',
      currentQuantity: 8,
      maxWeight: 6000,
      currentWeight: 2400,
      weightUnit: 'kg',
      maxVolume: 600,
      currentVolume: 240,
      volumeUnit: 'cu ft',
      dimensions: '200" x 150" x 60"',
      position: { area: 'H', section: 1 },
      coordinates: { x: 90, y: 20, z: 1 },
      lastAssigned: '2024-03-14',
      lastActivity: '2024-03-15 15:45',
      lastCounted: '2024-03-15',
      countAccuracy: 95,
      assignedBy: 'William Jones',
      tags: ['overflow', 'temporary', 'mixed'],
      notes: 'Temporary overflow area - organize by end of week',
      history: [
        { date: '2024-03-15', action: 'Inventory Count', user: 'William Jones', result: 'Partial match' },
        { date: '2024-03-14', action: 'Assigned', user: 'William Jones', item: 'Mixed' },
      ],
    },
    {
      id: 'BIN-014',
      binCode: 'I-01-01',
      name: 'Quarantine - Bin 01',
      warehouse: 'Warehouse B',
      zone: 'Quality Control Zone',
      type: 'quarantine',
      subType: 'isolation',
      status: 'occupied',
      condition: 'quarantine',
      capacity: 5,
      unit: 'pallets',
      currentItem: 'Canned Organic Soup',
      currentSku: 'SKU-006',
      currentBatch: 'BATCH-006',
      currentQuantity: 2,
      maxWeight: 1000,
      currentWeight: 225,
      weightUnit: 'kg',
      maxVolume: 100,
      currentVolume: 22.5,
      volumeUnit: 'cu ft',
      dimensions: '48" x 40" x 60"',
      quarantineReason: 'Quality test failure',
      quarantineDate: '2024-03-14',
      estimatedResolution: '2024-03-21',
      position: { rack: 'I', bay: 1, level: 1 },
      coordinates: { x: 100, y: 20, z: 11 },
      lastAssigned: '2024-03-14',
      lastActivity: '2024-03-14 14:30',
      lastCounted: '2024-03-14',
      countAccuracy: 100,
      assignedBy: 'Daniel Robinson',
      tags: ['quarantine', 'quality-issue', 'hold'],
      notes: 'Awaiting quality review',
      history: [
        { date: '2024-03-14', action: 'Quarantined', user: 'QA Team', reason: 'Test failure' },
        { date: '2024-03-14', action: 'Assigned', user: 'Daniel Robinson', item: 'SKU-006' },
      ],
    },
    {
      id: 'BIN-015',
      binCode: 'J-01-01',
      name: 'Cross-Dock - Bin 01',
      warehouse: 'Warehouse A',
      zone: 'Receiving Zone',
      zoneId: 'ZN-001',
      type: 'cross-dock',
      subType: 'transit',
      status: 'occupied',
      condition: 'good',
      capacity: 10,
      unit: 'pallets',
      currentItem: 'Incoming Electronics',
      currentSku: 'MIXED',
      currentBatch: 'INBOUND-001',
      currentQuantity: 6,
      maxWeight: 4000,
      currentWeight: 1200,
      weightUnit: 'kg',
      maxVolume: 400,
      currentVolume: 120,
      volumeUnit: 'cu ft',
      dimensions: '120" x 120" x 60"',
      position: { area: 'J', lane: 1 },
      coordinates: { x: 110, y: 20, z: 1 },
      lastAssigned: '2024-03-16',
      lastActivity: '2024-03-16 09:15',
      lastCounted: '2024-03-16',
      countAccuracy: 100,
      assignedBy: 'Receiving Team',
      expectedDeparture: '2024-03-17',
      destination: 'Store A',
      tags: ['cross-dock', 'transit', 'inbound'],
      notes: 'To be shipped to Store A tomorrow',
      history: [
        { date: '2024-03-16', action: 'Assigned', user: 'Receiving Team', item: 'Inbound shipment' },
      ],
    },
  ];

  // Warehouses
  const warehouses = [
    { id: 'wh-a', name: 'Warehouse A', bins: 9 },
    { id: 'wh-b', name: 'Warehouse B', bins: 2 },
    { id: 'wh-c', name: 'Warehouse C', bins: 2 },
  ];

  // Zones by warehouse
  const zones = [
    { id: 'ZN-002', name: 'Storage Zone A', warehouse: 'Warehouse A', bins: 5 },
    { id: 'ZN-003', name: 'Storage Zone B', warehouse: 'Warehouse A', bins: 1 },
    { id: 'ZN-006', name: 'Picking Zone', warehouse: 'Warehouse A', bins: 1 },
    { id: 'ZN-009', name: 'Returns Zone', warehouse: 'Warehouse A', bins: 1 },
    { id: 'ZN-001', name: 'Receiving Zone', warehouse: 'Warehouse A', bins: 1 },
    { id: 'Overflow', name: 'Overflow Zone', warehouse: 'Warehouse A', bins: 1 },
    { id: 'ZN-010', name: 'Hazardous Materials Zone', warehouse: 'Warehouse B', bins: 1 },
    { id: 'Quality', name: 'Quality Control Zone', warehouse: 'Warehouse B', bins: 1 },
    { id: 'ZN-004', name: 'Cold Storage Zone', warehouse: 'Warehouse C', bins: 1 },
    { id: 'ZN-005', name: 'Freezer Zone', warehouse: 'Warehouse C', bins: 1 },
  ];

  // Bin types
  const binTypes = [
    { id: 'pallet-rack', name: 'Pallet Rack', icon: Grid, color: 'bg-blue-100 text-blue-700' },
    { id: 'bulk-floor', name: 'Bulk Floor', icon: Square, color: 'bg-green-100 text-green-700' },
    { id: 'cold-storage', name: 'Cold Storage', icon: Snowflake, color: 'bg-cyan-100 text-cyan-700' },
    { id: 'freezer', name: 'Freezer', icon: Snowflake, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'picking-bin', name: 'Picking Bin', icon: PackageCheck, color: 'bg-purple-100 text-purple-700' },
    { id: 'hazardous', name: 'Hazardous', icon: AlertTriangle, color: 'bg-red-100 text-red-700' },
    { id: 'returns', name: 'Returns', icon: RotateCcw, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'overflow', name: 'Overflow', icon: PackagePlus, color: 'bg-orange-100 text-orange-700' },
    { id: 'quarantine', name: 'Quarantine', icon: AlertCircle, color: 'bg-red-100 text-red-700' },
    { id: 'cross-dock', name: 'Cross-Dock', icon: ArrowLeftRight, color: 'bg-teal-100 text-teal-700' },
  ];

  // Status configuration
  const statusConfig = {
    empty: { label: 'Empty', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    occupied: { label: 'Occupied', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Package },
    reserved: { label: 'Reserved', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    maintenance: { label: 'Maintenance', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Wrench },
    quarantine: { label: 'Quarantine', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
  };

  const conditionConfig = {
    good: { label: 'Good', color: 'bg-green-100 text-green-700' },
    fair: { label: 'Fair', color: 'bg-yellow-100 text-yellow-700' },
    damaged: { label: 'Damaged', color: 'bg-red-100 text-red-700' },
    inspection: { label: 'Inspection', color: 'bg-purple-100 text-purple-700' },
    quarantine: { label: 'Quarantine', color: 'bg-red-100 text-red-700' },
  };

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

  const getBinTypeColor = (type) => {
    const found = binTypes.find(t => t.id === type);
    return found?.color || 'bg-gray-100 text-gray-700';
  };

  const getBinTypeIcon = (type) => {
    const found = binTypes.find(t => t.id === type);
    const Icon = found?.icon || Grid;
    return Icon;
  };

  const filteredBins = binLocations.filter(bin => {
    const matchesWarehouse = selectedWarehouse === 'all' || bin.warehouse === selectedWarehouse;
    const matchesZone = selectedZone === 'all' || bin.zone === selectedZone;
    const matchesType = selectedType === 'all' || bin.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || bin.status === selectedStatus;
    const matchesSearch = bin.binCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bin.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (bin.currentSku && bin.currentSku.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (bin.currentItem && bin.currentItem.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesWarehouse && matchesZone && matchesType && matchesStatus && matchesSearch;
  });

  const stats = {
    total: binLocations.length,
    empty: binLocations.filter(b => b.status === 'empty').length,
    occupied: binLocations.filter(b => b.status === 'occupied').length,
    reserved: binLocations.filter(b => b.status === 'reserved').length,
    maintenance: binLocations.filter(b => b.status === 'maintenance').length,
    quarantine: binLocations.filter(b => b.status === 'quarantine').length,
    totalCapacity: binLocations.reduce((sum, b) => sum + b.capacity, 0),
    totalUtilization: Math.round((binLocations.filter(b => b.status === 'occupied' || b.status === 'reserved').length / binLocations.length) * 100),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Bin Locations</h1>
            <p className="text-black/50 mt-1">Manage warehouse bin locations and inventory assignments</p>
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

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowMapDialog(true)}
            >
              <Map size={16} />
              View Map
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowScanDialog(true)}
            >
              <Scan size={16} />
              Scan Bin
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Add Bin
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Bins</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Grid size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Empty</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.empty}</p>
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
                  <p className="text-xs text-black/50">Occupied</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.occupied}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Package size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Reserved</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.reserved}</p>
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
                  <p className="text-xs text-black/50">Maintenance</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.maintenance}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Wrench size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Quarantine</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.quarantine}</p>
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
                  <p className="text-xs text-black/50">Utilization</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.totalUtilization}%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Activity size={18} className="text-purple-600" />
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
              placeholder="Search by bin code, name, zone, SKU, or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              {warehouses.map(wh => (
                <SelectItem key={wh.id} value={wh.name}>{wh.name} ({wh.bins})</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map(zone => (
                <SelectItem key={zone.id} value={zone.name}>{zone.name} ({zone.bins})</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Bin Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {binTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="empty">Empty</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="quarantine">Quarantine</SelectItem>
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

      {/* Bins Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredBins.map((bin) => {
            const StatusIcon = statusConfig[bin.status]?.icon || Package;
            const TypeIcon = getBinTypeIcon(bin.type);
            
            return (
              <Card key={bin.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={cn("p-3 rounded-t-lg border-b border-[#F5EEE9]", getBinTypeColor(bin.type))}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white/30 rounded-lg">
                          <TypeIcon size={14} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1 mb-0.5">
                            <Badge className={cn("text-[10px] border-0 py-0 h-4", getStatusColor(bin.status))}>
                              <StatusIcon className="mr-0.5" size={8} />
                              {bin.status}
                            </Badge>
                            <Badge className={cn("text-[10px] border-0 py-0 h-4", getConditionColor(bin.condition))}>
                              {bin.condition}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-white text-sm">{bin.binCode}</h3>
                          <p className="text-[10px] text-white/80 truncate max-w-[150px]">{bin.name}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/20">
                            <MoreVertical size={12} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedBin(bin);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-3 w-3" />
                            <span className="text-xs">View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedBin(bin);
                            setShowAssignDialog(true);
                          }}>
                            <PackagePlus className="mr-2 h-3 w-3" />
                            <span className="text-xs">Assign Item</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedBin(bin);
                            setShowMoveDialog(true);
                          }}>
                            <Move className="mr-2 h-3 w-3" />
                            <span className="text-xs">Move Item</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedBin(bin);
                            setShowQrDialog(true);
                          }}>
                            <QrCode className="mr-2 h-3 w-3" />
                            <span className="text-xs">Generate QR</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-3 w-3" />
                            <span className="text-xs">Edit Bin</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-3 w-3" />
                            <span className="text-xs">Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    {/* Warehouse & Zone */}
                    <div className="flex items-center gap-1 text-[10px] text-black/50 mb-2">
                      <MapPin size={10} className="text-red-600" />
                      <span>{bin.warehouse} • {bin.zone}</span>
                    </div>

                    {/* Current Item (if occupied) */}
                    {bin.status === 'occupied' && bin.currentItem && (
                      <div className="mb-2 p-1.5 bg-blue-50 rounded">
                        <p className="text-[10px] font-medium text-blue-700 truncate">{bin.currentItem}</p>
                        <div className="flex items-center justify-between text-[8px] text-blue-600">
                          <span>{bin.currentSku}</span>
                          <span>Qty: {bin.currentQuantity}</span>
                        </div>
                      </div>
                    )}

                    {/* Reserved Info */}
                    {bin.status === 'reserved' && bin.reservedItem && (
                      <div className="mb-2 p-1.5 bg-yellow-50 rounded">
                        <p className="text-[10px] font-medium text-yellow-700 truncate">Reserved: {bin.reservedItem}</p>
                        <div className="flex items-center justify-between text-[8px] text-yellow-600">
                          <span>{bin.reservedSku}</span>
                          <span>ETA: {bin.expectedArrival}</span>
                        </div>
                      </div>
                    )}

                    {/* Maintenance/Quarantine Info */}
                    {bin.status === 'maintenance' && (
                      <div className="mb-2 p-1.5 bg-orange-50 rounded">
                        <p className="text-[10px] font-medium text-orange-700">Maintenance Required</p>
                        <p className="text-[8px] text-orange-600">Repair by: {bin.estimatedRepair}</p>
                      </div>
                    )}

                    {bin.status === 'quarantine' && (
                      <div className="mb-2 p-1.5 bg-red-50 rounded">
                        <p className="text-[10px] font-medium text-red-700">Quarantined</p>
                        <p className="text-[8px] text-red-600">Reason: {bin.quarantineReason}</p>
                      </div>
                    )}

                    {/* Capacity Utilization */}
                    {bin.status !== 'empty' && bin.status !== 'reserved' && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-[8px]">
                          <span className="text-black/50">Utilization</span>
                          <span className="font-medium">{Math.round((bin.currentQuantity / bin.capacity) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(bin.currentQuantity / bin.capacity) * 100} 
                          className="h-1 bg-[#F5EEE9]"
                        />
                      </div>
                    )}

                    {/* Capacity Info */}
                    <div className="grid grid-cols-2 gap-1 text-[8px] mb-2">
                      <div>
                        <span className="text-black/50">Capacity</span>
                        <p className="font-medium text-black">{bin.capacity} {bin.unit}</p>
                      </div>
                      {bin.maxWeight && (
                        <div>
                          <span className="text-black/50">Weight</span>
                          <p className="font-medium text-black">{bin.currentWeight}/{bin.maxWeight}kg</p>
                        </div>
                      )}
                    </div>

                    {/* Last Activity */}
                    <div className="flex items-center justify-between text-[8px] text-black/50 border-t border-[#F5EEE9] pt-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Clock size={8} />
                        <span>{bin.lastActivity}</span>
                      </div>
                      <span>Accuracy: {bin.countAccuracy}%</span>
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
                  <TableHead className="text-black/50">Bin Code</TableHead>
                  <TableHead className="text-black/50">Name</TableHead>
                  <TableHead className="text-black/50">Warehouse</TableHead>
                  <TableHead className="text-black/50">Zone</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Condition</TableHead>
                  <TableHead className="text-black/50">Current Item</TableHead>
                  <TableHead className="text-black/50 text-right">Capacity</TableHead>
                  <TableHead className="text-black/50 text-right">Used</TableHead>
                  <TableHead className="text-black/50">Last Activity</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBins.map((bin) => (
                  <TableRow key={bin.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">{bin.binCode}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{bin.name}</TableCell>
                    <TableCell>{bin.warehouse}</TableCell>
                    <TableCell className="max-w-[120px] truncate">{bin.zone}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getBinTypeColor(bin.type))}>
                        {bin.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(bin.status))}>
                        {bin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getConditionColor(bin.condition))}>
                        {bin.condition}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {bin.currentItem || bin.reservedItem || '-'}
                    </TableCell>
                    <TableCell className="text-right">{bin.capacity}</TableCell>
                    <TableCell className="text-right">{bin.currentQuantity || 0}</TableCell>
                    <TableCell className="text-xs">{bin.lastActivity}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-[10px] px-2"
                        onClick={() => {
                          setSelectedBin(bin);
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
                Showing {filteredBins.length} of {binLocations.length} bins
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

      {/* Create Bin Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Bin Location</DialogTitle>
            <DialogDescription>
              Add a new bin location to warehouse
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bin Code</Label>
                    <Input placeholder="e.g., A-01-01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bin Name</Label>
                    <Input placeholder="e.g., Aisle A - Bay 01 - Level 01" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Warehouse</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehouses.map(wh => (
                          <SelectItem key={wh.id} value={wh.name}>{wh.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Zone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {zones.map(zone => (
                          <SelectItem key={zone.id} value={zone.name}>{zone.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bin Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {binTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select defaultValue="empty">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="empty">Empty</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input type="number" placeholder="e.g., 1" />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit</Label>
                    <Select defaultValue="pallet">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pallet">Pallet</SelectItem>
                        <SelectItem value="unit">Unit</SelectItem>
                        <SelectItem value="box">Box</SelectItem>
                        <SelectItem value="drum">Drum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dimensions" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Dimensions</Label>
                    <Input placeholder="e.g., 48&quot; x 40&quot; x 60&quot;" />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Weight (kg)</Label>
                    <Input type="number" placeholder="e.g., 1000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Max Volume (cu ft)</Label>
                    <Input type="number" placeholder="e.g., 100" />
                  </div>
                  <div className="space-y-2">
                    <Label>Temperature</Label>
                    <Input placeholder="e.g., Ambient, 2-4°C" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Rack/Area</Label>
                    <Input placeholder="A" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bay/Row</Label>
                    <Input placeholder="1" />
                  </div>
                  <div className="space-y-2">
                    <Label>Level/Shelf</Label>
                    <Input placeholder="1" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>X Coordinate</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Y Coordinate</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Z Level</Label>
                    <Input type="number" placeholder="0" />
                  </div>
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
              Create Bin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bin Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Bin Location Details</DialogTitle>
          </DialogHeader>

          {selectedBin && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", getBinTypeColor(selectedBin.type))}>
                      {(() => {
                        const Icon = getBinTypeIcon(selectedBin.type);
                        return <Icon size={20} className="text-white" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedBin.binCode}</h3>
                      <p className="text-sm text-black/50">{selectedBin.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Warehouse</p>
                      <p className="text-sm font-medium">{selectedBin.warehouse}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Zone</p>
                      <p className="text-sm font-medium">{selectedBin.zone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-xs border-0", getStatusColor(selectedBin.status))}>
                      {selectedBin.status}
                    </Badge>
                    <Badge className={cn("text-xs", getConditionColor(selectedBin.condition))}>
                      {selectedBin.condition}
                    </Badge>
                    <Badge className={cn("text-xs", getBinTypeColor(selectedBin.type))}>
                      {selectedBin.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-3 bg-[#F5EEE9] rounded-lg">
                    <div>
                      <p className="text-xs text-black/50">Capacity</p>
                      <p className="text-lg font-bold">{selectedBin.capacity} {selectedBin.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Current</p>
                      <p className="text-lg font-bold text-blue-600">{selectedBin.currentQuantity || 0}</p>
                    </div>
                    {selectedBin.maxWeight && (
                      <>
                        <div>
                          <p className="text-xs text-black/50">Max Weight</p>
                          <p className="text-sm font-medium">{selectedBin.maxWeight} {selectedBin.weightUnit}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Current Weight</p>
                          <p className="text-sm font-medium">{selectedBin.currentWeight || 0} {selectedBin.weightUnit}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Dimensions</p>
                    <p className="text-sm">{selectedBin.dimensions}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-black/50">Rack/Area</p>
                      <p className="text-sm">{selectedBin.position.rack || selectedBin.position.area || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Bay/Row</p>
                      <p className="text-sm">{selectedBin.position.bay || selectedBin.position.row || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Level/Shelf</p>
                      <p className="text-sm">{selectedBin.position.level || selectedBin.position.shelf || '-'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-black/50">X</p>
                      <p className="text-sm">{selectedBin.coordinates.x}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Y</p>
                      <p className="text-sm">{selectedBin.coordinates.y}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Z</p>
                      <p className="text-sm">{selectedBin.coordinates.z}</p>
                    </div>
                  </div>

                  {selectedBin.temperature && (
                    <div>
                      <p className="text-xs text-black/50">Temperature</p>
                      <p className="text-sm">{selectedBin.temperature}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-black/50">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedBin.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedBin.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedBin.notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="inventory" className="space-y-4">
                  {selectedBin.status === 'occupied' && selectedBin.currentItem ? (
                    <>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-700 mb-2">Current Item</p>
                        <p className="text-lg font-semibold">{selectedBin.currentItem}</p>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-blue-600/70">SKU</p>
                            <p className="text-sm font-medium">{selectedBin.currentSku}</p>
                          </div>
                          <div>
                            <p className="text-xs text-blue-600/70">Batch</p>
                            <p className="text-sm font-medium">{selectedBin.currentBatch}</p>
                          </div>
                          <div>
                            <p className="text-xs text-blue-600/70">Quantity</p>
                            <p className="text-sm font-medium">{selectedBin.currentQuantity}</p>
                          </div>
                          <div>
                            <p className="text-xs text-blue-600/70">Assigned</p>
                            <p className="text-sm font-medium">{selectedBin.lastAssigned}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium mb-2">Weight & Volume</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-black/50">Weight</p>
                            <p className="text-sm">{selectedBin.currentWeight}/{selectedBin.maxWeight} {selectedBin.weightUnit}</p>
                          </div>
                          <div>
                            <p className="text-xs text-black/50">Volume</p>
                            <p className="text-sm">{selectedBin.currentVolume}/{selectedBin.maxVolume} {selectedBin.volumeUnit}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : selectedBin.status === 'reserved' && selectedBin.reservedItem ? (
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm font-medium text-yellow-700 mb-2">Reserved Item</p>
                      <p className="text-lg font-semibold">{selectedBin.reservedItem}</p>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-yellow-600/70">SKU</p>
                          <p className="text-sm font-medium">{selectedBin.reservedSku}</p>
                        </div>
                        <div>
                          <p className="text-xs text-yellow-600/70">Reserved For</p>
                          <p className="text-sm font-medium">{selectedBin.reservedFor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-yellow-600/70">Expected Arrival</p>
                          <p className="text-sm font-medium">{selectedBin.expectedArrival}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Package size={32} className="mx-auto text-black/30 mb-2" />
                      <p className="text-sm text-black/50">No items assigned to this bin</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => {
                          setShowDetailsDialog(false);
                          setShowAssignDialog(true);
                        }}
                      >
                        <PackagePlus size={14} className="mr-2" />
                        Assign Item
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedBin.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-0.5">
                            {item.action === 'Inventory Count' && <CheckCircle size={12} className="text-green-600" />}
                            {item.action === 'Assigned' && <PackagePlus size={12} className="text-blue-600" />}
                            {item.action === 'Replenished' && <PackagePlus size={12} className="text-purple-600" />}
                            {item.action === 'Maintenance Required' && <Wrench size={12} className="text-orange-600" />}
                            {item.action === 'Quarantined' && <AlertCircle size={12} className="text-red-600" />}
                            {item.action === 'Reserved' && <Clock size={12} className="text-yellow-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
                            {item.result && (
                              <Badge className={cn(
                                "text-[8px] h-4 mt-1",
                                item.result === 'Matched' && 'bg-green-100 text-green-700',
                                item.result === 'Empty' && 'bg-blue-100 text-blue-700',
                                item.result === 'Partial match' && 'bg-yellow-100 text-yellow-700',
                              )}>
                                {item.result}
                              </Badge>
                            )}
                            {item.item && <p className="text-[10px] text-black/70 mt-1">Item: {item.item}</p>}
                            {item.reason && <p className="text-[10px] text-black/70 mt-1">Reason: {item.reason}</p>}
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
            {selectedBin?.status === 'empty' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowAssignDialog(true);
              }}>
                <PackagePlus className="mr-2 h-4 w-4" />
                Assign Item
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Item Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Assign Item to Bin</DialogTitle>
            <DialogDescription>
              Assign inventory to this bin location
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedBin?.binCode}</p>
              <p className="text-xs text-black/50">{selectedBin?.name}</p>
              <p className="text-xs text-black/50 mt-1">Capacity: {selectedBin?.capacity} {selectedBin?.unit}</p>
            </div>

            <div className="space-y-2">
              <Label>Select Item</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SKU-001">Premium Wireless Headphones</SelectItem>
                  <SelectItem value="SKU-002">Organic Protein Powder</SelectItem>
                  <SelectItem value="SKU-003">Industrial Lubricant - Grade A</SelectItem>
                  <SelectItem value="SKU-004">Ergonomic Office Chair</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Batch/Lot</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BATCH-001">BATCH-001</SelectItem>
                  <SelectItem value="BATCH-002">BATCH-002</SelectItem>
                  <SelectItem value="BATCH-003">BATCH-003</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input type="number" placeholder="Enter quantity" max={selectedBin?.capacity} />
            </div>

            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input type="number" placeholder="0" />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes" rows={2} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Assign Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scan Dialog */}
      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Scan Bin Location</DialogTitle>
            <DialogDescription>
              Scan barcode or QR code to identify bin
            </DialogDescription>
          </DialogHeader>

          <div className="py-8">
            <Tabs defaultValue="camera">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>

              <TabsContent value="camera" className="text-center">
                <div className="w-48 h-48 bg-[#F5EEE9] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Camera size={48} className="text-black/30" />
                </div>
                <p className="text-sm text-black/50 mb-4">
                  Position QR code or barcode in front of camera
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Badge className="bg-red-600 text-white">QR Code</Badge>
                  <Badge className="bg-black text-white">Barcode</Badge>
                </div>
              </TabsContent>

              <TabsContent value="manual">
                <div className="space-y-4">
                  <Input placeholder="Enter bin code manually" />
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Search size={16} className="mr-2" />
                    Find Bin
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScanDialog(false)}>
              Close
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
            <TooltipContent side="left">Add Bin</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowScanDialog(true)}
              >
                <Scan size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Scan Bin</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowMapDialog(true)}
              >
                <Map size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">View Map</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default BinLocationsPage;