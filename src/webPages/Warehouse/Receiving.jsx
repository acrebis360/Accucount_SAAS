// app/dashboard/receiving/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowDownCircle,
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
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,

  Move,

  PackageCheck,
  PackagePlus,
  Building,
  Activity,
  Scan,
  ArrowLeftRight,
 
  ToggleLeft as ToggleLeftIcon,
  ToggleRight as ToggleRightIcon,
  ArrowLeftRight as ArrowLeftRightIcon,
  ArrowUpDown as ArrowUpDownIcon,
  MoveHorizontal as MoveHorizontalIcon,
  MoveVertical as MoveVerticalIcon,
  GripVertical as GripVerticalIcon,
  GripHorizontal as GripHorizontalIcon,
  ShoppingCart,
  TruckIcon as TruckIconCustom,

  PackageIcon as PackageIconCustom,
  
  WeightIcon as WeightIconCustom,
  RulerIcon as RulerIconCustom,
  PackagePlusIcon as PackagePlusIconCustom,
  PackageMinusIcon as PackageMinusIconCustom,
  PackageCheckIcon as PackageCheckIconCustom,
  PackageXIcon as PackageXIconCustom,
  PackageSearchIcon as PackageSearchIconCustom,
  CrateIcon as CrateIconCustom,
  ContainerIcon as ContainerIconCustom,
  PrinterIcon as PrinterIconCustom,
  BoxSelect,
  BoxesIcon as BoxesIconCustom,

  LayoutGridIcon as LayoutGridIconCustom,
  Grid3x3Icon as Grid3x3IconCustom,
  ShipIcon as ShipIconCustom,
  PlaneIcon as PlaneIconCustom,
  TrainIcon as TrainIconCustom,
  BikeIcon as BikeIconCustom,
  BusIcon as BusIconCustom,
  CarIcon as CarIconCustom,

  MapIcon as MapIconCustom,
  MapPinIcon as MapPinIconCustom,
  NavigationIcon as NavigationIconCustom,
  CompassIcon as CompassIconCustom,
  RouteIcon as RouteIconCustom,
  WaypointsIcon as WaypointsIconCustom,
  
  TrackingIcon as TrackingIconCustom,
  RotateCcw,
  PaintBucket,
  
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

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ReceivingPage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);
  const [showInspectDialog, setShowInspectDialog] = useState(false);
  const [showQualityDialog, setShowQualityDialog] = useState(false);
  const [showPutawayDialog, setShowPutawayDialog] = useState(false);
  const [showASNDialog, setShowASNDialog] = useState(false);
  const [showPODialog, setShowPODialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample receiving data
  const receipts = [
    {
      id: 'REC-001',
      receiptNumber: 'REC-2024-001',
      asnNumber: 'ASN-2024-001',
      poNumber: 'PO-2024-001',
      supplier: 'Tech Supplies Inc',
      supplierId: 'SUP-001',
      status: 'received',
      type: 'purchase_order',
      priority: 'high',
      warehouse: 'Warehouse A',
      zone: 'Receiving Zone',
      dock: 'Dock 1',
      scheduledDate: '2024-03-15',
      scheduledTime: '09:00',
      receivedDate: '2024-03-15',
      receivedTime: '09:30',
      completedDate: '2024-03-15',
      completedTime: '11:45',
      carrier: 'UPS',
      trackingNumber: '1Z999AA10123456784',
      bolNumber: 'BOL-001',
      containerNumber: 'CONT-001',
      sealNumber: 'SEAL-001',
      totalItems: 12,
      totalQuantity: 450,
      totalPallets: 3,
      totalCartons: 25,
      totalWeight: 1250.5,
      weightUnit: 'kg',
      totalValue: 15625.00,
      receivedBy: 'John Doe',
      receivedById: 'USR-001',
      inspectedBy: 'Jane Smith',
      inspectedById: 'USR-002',
      inspectionStatus: 'passed',
      qualityStatus: 'passed',
      putawayStatus: 'completed',
      items: [
        { id: 1, sku: 'SKU-001', name: 'Premium Wireless Headphones', expectedQty: 200, receivedQty: 200, unit: 'pcs', status: 'received', location: 'A-01-01', batch: 'BATCH-001', expiryDate: '2026-03-15' },
        { id: 2, sku: 'SKU-002', name: 'Organic Protein Powder', expectedQty: 150, receivedQty: 150, unit: 'containers', status: 'received', location: 'A-01-04', batch: 'BATCH-002', expiryDate: '2025-02-28' },
        { id: 3, sku: 'SKU-003', name: 'Industrial Lubricant', expectedQty: 100, receivedQty: 100, unit: 'drums', status: 'received', location: 'B-04-03', batch: 'BATCH-003', expiryDate: '2025-09-10' },
      ],
      documents: ['asn.pdf', 'po.pdf', 'packing-slip.pdf', 'bol.pdf'],
      notes: 'All items received in good condition',
      tags: ['complete', 'urgent', 'supplier-a'],
      createdBy: 'Purchasing System',
      createdAt: '2024-03-10',
      history: [
        { timestamp: '2024-03-15 11:45', action: 'Putaway Completed', user: 'System' },
        { timestamp: '2024-03-15 10:30', action: 'Quality Check Passed', user: 'Jane Smith' },
        { timestamp: '2024-03-15 09:30', action: 'Received', user: 'John Doe' },
        { timestamp: '2024-03-15 08:00', action: 'Scheduled', user: 'System' },
        { timestamp: '2024-03-10', action: 'ASN Created', user: 'Purchasing System' },
      ],
    },
    {
      id: 'REC-002',
      receiptNumber: 'REC-2024-002',
      asnNumber: 'ASN-2024-002',
      poNumber: 'PO-2024-002',
      supplier: 'Office Furniture Co',
      supplierId: 'SUP-002',
      status: 'in_progress',
      type: 'purchase_order',
      priority: 'medium',
      warehouse: 'Warehouse A',
      zone: 'Receiving Zone',
      dock: 'Dock 2',
      scheduledDate: '2024-03-16',
      scheduledTime: '10:00',
      receivedDate: '2024-03-16',
      receivedTime: '10:15',
      completedDate: null,
      completedTime: null,
      carrier: 'FedEx Freight',
      trackingNumber: '794657894322',
      bolNumber: 'BOL-002',
      proNumber: 'PRO-002',
      totalItems: 8,
      totalQuantity: 120,
      totalPallets: 2,
      totalCartons: 15,
      totalWeight: 850.0,
      weightUnit: 'kg',
      totalValue: 8750.00,
      receivedBy: 'Mike Johnson',
      receivedById: 'USR-003',
      inspectedBy: null,
      inspectedById: null,
      inspectionStatus: 'pending',
      qualityStatus: 'pending',
      putawayStatus: 'pending',
      items: [
        { id: 1, sku: 'SKU-004', name: 'Ergonomic Office Chair', expectedQty: 20, receivedQty: 18, unit: 'pcs', status: 'discrepancy', location: null, batch: 'BATCH-004', notes: '2 units damaged' },
        { id: 2, sku: 'SKU-008', name: 'Standing Desk', expectedQty: 10, receivedQty: 10, unit: 'pcs', status: 'received', location: null, batch: 'BATCH-008' },
        { id: 3, sku: 'SKU-012', name: 'Office Chair', expectedQty: 30, receivedQty: 30, unit: 'pcs', status: 'received', location: null, batch: 'BATCH-012' },
      ],
      discrepancies: [
        { sku: 'SKU-004', expected: 20, received: 18, reason: 'Damaged in transit' },
      ],
      documents: ['asn.pdf', 'po.pdf', 'packing-slip.pdf'],
      notes: '2 chairs damaged, filing claim with carrier',
      tags: ['damaged', 'claim', 'inspection-pending'],
      createdBy: 'Purchasing System',
      createdAt: '2024-03-12',
      history: [
        { timestamp: '2024-03-16 10:15', action: 'Received', user: 'Mike Johnson', notes: '2 units damaged' },
        { timestamp: '2024-03-16 08:00', action: 'Scheduled', user: 'System' },
        { timestamp: '2024-03-12', action: 'ASN Created', user: 'Purchasing System' },
      ],
    },
    {
      id: 'REC-003',
      receiptNumber: 'REC-2024-003',
      asnNumber: 'ASN-2024-003',
      poNumber: 'PO-2024-003',
      supplier: 'Fashion Textiles Inc',
      supplierId: 'SUP-003',
      status: 'scheduled',
      type: 'purchase_order',
      priority: 'high',
      warehouse: 'Warehouse A',
      zone: 'Receiving Zone',
      dock: 'Dock 3',
      scheduledDate: '2024-03-17',
      scheduledTime: '13:00',
      receivedDate: null,
      receivedTime: null,
      completedDate: null,
      completedTime: null,
      carrier: 'Trucking Co',
      trackingNumber: 'TRK-003',
      bolNumber: 'BOL-003',
      totalItems: 15,
      totalQuantity: 2500,
      totalPallets: 5,
      totalCartons: 40,
      totalWeight: 1850.0,
      weightUnit: 'kg',
      totalValue: 12500.00,
      receivedBy: null,
      receivedById: null,
      inspectedBy: null,
      inspectedById: null,
      inspectionStatus: 'pending',
      qualityStatus: 'pending',
      putawayStatus: 'pending',
      items: [
        { id: 1, sku: 'SKU-005', name: 'Cotton T-Shirt (White, L)', expectedQty: 1000, receivedQty: 0, unit: 'pcs', status: 'expected' },
        { id: 2, sku: 'SKU-006', name: 'Cotton T-Shirt (Black, L)', expectedQty: 1000, receivedQty: 0, unit: 'pcs', status: 'expected' },
        { id: 3, sku: 'SKU-007', name: 'Cotton T-Shirt (Blue, L)', expectedQty: 500, receivedQty: 0, unit: 'pcs', status: 'expected' },
      ],
      documents: ['asn.pdf', 'po.pdf'],
      notes: 'Large shipment, need additional staff',
      tags: ['scheduled', 'large-shipment'],
      createdBy: 'Purchasing System',
      createdAt: '2024-03-14',
      history: [
        { timestamp: '2024-03-14', action: 'Scheduled', user: 'System' },
        { timestamp: '2024-03-13', action: 'ASN Created', user: 'Purchasing System' },
      ],
    },
    {
      id: 'REC-004',
      receiptNumber: 'REC-2024-004',
      asnNumber: 'ASN-2024-004',
      poNumber: 'PO-2024-004',
      supplier: 'Organic Food Co',
      supplierId: 'SUP-004',
      status: 'in_quality',
      type: 'purchase_order',
      priority: 'high',
      warehouse: 'Warehouse C',
      zone: 'Cold Storage',
      dock: 'Dock 1',
      scheduledDate: '2024-03-15',
      scheduledTime: '08:00',
      receivedDate: '2024-03-15',
      receivedTime: '08:30',
      completedDate: null,
      completedTime: null,
      carrier: 'Refrigerated Transport',
      trackingNumber: 'REF-004',
      bolNumber: 'BOL-004',
      containerNumber: 'REEFER-001',
      sealNumber: 'SEAL-004',
      temperature: '2-4°C',
      temperatureLog: [2.3, 2.5, 2.8, 3.0, 2.7],
      totalItems: 6,
      totalQuantity: 350,
      totalPallets: 2,
      totalCartons: 18,
      totalWeight: 420.0,
      weightUnit: 'kg',
      totalValue: 2850.00,
      receivedBy: 'Emma Watson',
      receivedById: 'USR-005',
      inspectedBy: 'Quality Team',
      inspectedById: 'USR-008',
      inspectionStatus: 'in_progress',
      qualityStatus: 'sampling',
      putawayStatus: 'pending',
      items: [
        { id: 1, sku: 'SKU-009', name: 'Fresh Dairy Milk', expectedQty: 100, receivedQty: 100, unit: 'gallons', status: 'in_quality', location: null, batch: 'BATCH-009', expiryDate: '2024-03-24', temperature: '2.5°C' },
        { id: 2, sku: 'SKU-010', name: 'Fresh Vegetables Box', expectedQty: 150, receivedQty: 150, unit: 'boxes', status: 'in_quality', location: null, batch: 'BATCH-010', expiryDate: '2024-03-19', temperature: '3.0°C' },
        { id: 3, sku: 'SKU-011', name: 'Greek Yogurt', expectedQty: 100, receivedQty: 100, unit: 'cups', status: 'in_quality', location: null, batch: 'BATCH-011', expiryDate: '2024-03-18', temperature: '2.8°C' },
      ],
      documents: ['asn.pdf', 'po.pdf', 'temperature-log.pdf', 'packing-slip.pdf'],
      notes: 'Temperature maintained throughout transit',
      tags: ['cold-chain', 'quality-check', 'perishable'],
      createdBy: 'Purchasing System',
      createdAt: '2024-03-12',
      history: [
        { timestamp: '2024-03-15 09:15', action: 'Quality Check Started', user: 'Quality Team' },
        { timestamp: '2024-03-15 08:30', action: 'Received', user: 'Emma Watson' },
        { timestamp: '2024-03-15 08:00', action: 'Scheduled', user: 'System' },
        { timestamp: '2024-03-12', action: 'ASN Created', user: 'Purchasing System' },
      ],
    },
    {
      id: 'REC-005',
      receiptNumber: 'REC-2024-005',
      asnNumber: null,
      poNumber: 'PO-2024-005',
      supplier: 'Industrial Supplies Co',
      supplierId: 'SUP-005',
      status: 'expected',
      type: 'purchase_order',
      priority: 'medium',
      warehouse: 'Warehouse B',
      zone: 'Receiving Zone',
      dock: 'Dock 2',
      scheduledDate: '2024-03-18',
      scheduledTime: '10:00',
      receivedDate: null,
      receivedTime: null,
      completedDate: null,
      completedTime: null,
      carrier: 'Freight Carrier',
      trackingNumber: 'FRT-005',
      bolNumber: 'BOL-005',
      totalItems: 8,
      totalQuantity: 200,
      totalPallets: 4,
      totalCartons: 20,
      totalWeight: 3200.0,
      weightUnit: 'kg',
      totalValue: 8750.00,
      receivedBy: null,
      receivedById: null,
      inspectedBy: null,
      inspectedById: null,
      inspectionStatus: 'pending',
      qualityStatus: 'pending',
      putawayStatus: 'pending',
      items: [
        { id: 1, sku: 'SKU-013', name: 'Heavy Duty Gloves', expectedQty: 100, receivedQty: 0, unit: 'pairs', status: 'expected' },
        { id: 2, sku: 'SKU-014', name: 'Safety Goggles', expectedQty: 50, receivedQty: 0, unit: 'pcs', status: 'expected' },
        { id: 3, sku: 'SKU-015', name: 'Hard Hats', expectedQty: 50, receivedQty: 0, unit: 'pcs', status: 'expected' },
      ],
      documents: ['po.pdf'],
      notes: 'No ASN received yet',
      tags: ['expected', 'no-asn'],
      createdBy: 'Purchasing System',
      createdAt: '2024-03-15',
      history: [
        { timestamp: '2024-03-15', action: 'Created', user: 'Purchasing System' },
      ],
    },
    {
      id: 'REC-006',
      receiptNumber: 'REC-2024-006',
      asnNumber: 'ASN-2024-006',
      poNumber: 'PO-2024-006',
      supplier: 'ChemCorp Industries',
      supplierId: 'SUP-006',
      status: 'quality_failed',
      type: 'purchase_order',
      priority: 'high',
      warehouse: 'Warehouse B',
      zone: 'Hazardous Materials Zone',
      dock: 'Dock 3',
      scheduledDate: '2024-03-14',
      scheduledTime: '11:00',
      receivedDate: '2024-03-14',
      receivedTime: '11:30',
      completedDate: null,
      completedTime: null,
      carrier: 'Hazmat Transport',
      trackingNumber: 'HZM-006',
      bolNumber: 'BOL-006',
      containerNumber: 'HAZ-001',
      sealNumber: 'SEAL-006',
      totalItems: 4,
      totalQuantity: 80,
      totalPallets: 2,
      totalCartons: 8,
      totalWeight: 950.0,
      weightUnit: 'kg',
      totalValue: 12500.00,
      receivedBy: 'Richard Harris',
      receivedById: 'USR-007',
      inspectedBy: 'Safety Officer',
      inspectedById: 'USR-009',
      inspectionStatus: 'failed',
      qualityStatus: 'failed',
      putawayStatus: 'quarantine',
      items: [
        { id: 1, sku: 'SKU-016', name: 'Chemical Solvent A', expectedQty: 40, receivedQty: 40, unit: 'drums', status: 'quarantine', location: 'QUAR-01', batch: 'BATCH-016', qualityStatus: 'failed', reason: 'Label damaged, unknown contents' },
        { id: 2, sku: 'SKU-017', name: 'Chemical Solvent B', expectedQty: 40, receivedQty: 40, unit: 'drums', status: 'quarantine', location: 'QUAR-01', batch: 'BATCH-017', qualityStatus: 'pending' },
      ],
      qualityIssues: [
        { sku: 'SKU-016', issue: 'Damaged labels, cannot verify contents' },
      ],
      documents: ['asn.pdf', 'po.pdf', 'msds.pdf', 'safety-data.pdf'],
      notes: 'Quarantined - labels damaged on 40 drums',
      tags: ['hazardous', 'quarantine', 'quality-failed'],
      createdBy: 'Purchasing System',
      createdAt: '2024-03-10',
      history: [
        { timestamp: '2024-03-14 13:00', action: 'Quality Failed', user: 'Safety Officer', notes: 'Labels damaged' },
        { timestamp: '2024-03-14 12:30', action: 'Quarantined', user: 'System' },
        { timestamp: '2024-03-14 11:30', action: 'Received', user: 'Richard Harris' },
        { timestamp: '2024-03-14 11:00', action: 'Scheduled', user: 'System' },
        { timestamp: '2024-03-10', action: 'ASN Created', user: 'Purchasing System' },
      ],
    },
    {
      id: 'REC-007',
      receiptNumber: 'REC-2024-007',
      asnNumber: 'ASN-2024-007',
      poNumber: 'PO-2024-007',
      supplier: 'Medical Supplies Inc',
      supplierId: 'SUP-007',
      status: 'putaway_completed',
      type: 'purchase_order',
      priority: 'high',
      warehouse: 'Store B',
      zone: 'Pharmacy',
      dock: 'Dock 1',
      scheduledDate: '2024-03-15',
      scheduledTime: '14:00',
      receivedDate: '2024-03-15',
      receivedTime: '14:15',
      completedDate: '2024-03-15',
      completedTime: '15:30',
      carrier: 'Medical Express',
      trackingNumber: 'MED-007',
      bolNumber: 'BOL-007',
      totalItems: 10,
      totalQuantity: 500,
      totalPallets: 1,
      totalCartons: 10,
      totalWeight: 120.0,
      weightUnit: 'kg',
      totalValue: 4250.00,
      receivedBy: 'Anna Taylor',
      receivedById: 'USR-006',
      inspectedBy: 'Pharmacy Manager',
      inspectedById: 'USR-010',
      inspectionStatus: 'passed',
      qualityStatus: 'passed',
      putawayStatus: 'completed',
      items: [
        { id: 1, sku: 'SKU-018', name: 'First Aid Kit - Professional', expectedQty: 100, receivedQty: 100, unit: 'kits', status: 'received', location: 'P-01-05', batch: 'BATCH-018', expiryDate: '2026-02-01' },
        { id: 2, sku: 'SKU-019', name: 'Pain Reliever', expectedQty: 200, receivedQty: 200, unit: 'boxes', status: 'received', location: 'P-01-06', batch: 'BATCH-019', expiryDate: '2025-12-01' },
        { id: 3, sku: 'SKU-020', name: 'Antiseptic Wipes', expectedQty: 200, receivedQty: 200, unit: 'packs', status: 'received', location: 'P-01-07', batch: 'BATCH-020', expiryDate: '2025-10-01' },
      ],
      documents: ['asn.pdf', 'po.pdf', 'packing-slip.pdf', 'pharmacy-receipt.pdf'],
      notes: 'All items verified and put away',
      tags: ['medical', 'pharmacy', 'complete'],
      createdBy: 'Purchasing System',
      createdAt: '2024-03-12',
      history: [
        { timestamp: '2024-03-15 15:30', action: 'Putaway Completed', user: 'Anna Taylor' },
        { timestamp: '2024-03-15 14:45', action: 'Quality Check Passed', user: 'Pharmacy Manager' },
        { timestamp: '2024-03-15 14:15', action: 'Received', user: 'Anna Taylor' },
        { timestamp: '2024-03-15 14:00', action: 'Scheduled', user: 'System' },
        { timestamp: '2024-03-12', action: 'ASN Created', user: 'Purchasing System' },
      ],
    },
    {
      id: 'REC-008',
      receiptNumber: 'REC-2024-008',
      asnNumber: 'ASN-2024-008',
      poNumber: null,
      supplier: 'Various Suppliers',
      supplierId: null,
      status: 'in_progress',
      type: 'cross_dock',
      priority: 'high',
      warehouse: 'Warehouse A',
      zone: 'Cross-Dock Zone',
      dock: 'Dock 4',
      scheduledDate: '2024-03-16',
      scheduledTime: '08:00',
      receivedDate: '2024-03-16',
      receivedTime: '08:30',
      completedDate: null,
      completedTime: null,
      carrier: 'Multiple',
      trackingNumber: 'XD-008',
      totalItems: 25,
      totalQuantity: 1200,
      totalPallets: 8,
      totalCartons: 45,
      totalWeight: 2800.0,
      weightUnit: 'kg',
      totalValue: 18500.00,
      receivedBy: 'Sarah Wilson',
      receivedById: 'USR-004',
      inspectedBy: null,
      inspectedById: null,
      inspectionStatus: 'not_applicable',
      qualityStatus: 'not_applicable',
      putawayStatus: 'cross_dock',
      items: [
        { id: 1, sku: 'SKU-021', name: 'Store A - Electronics', expectedQty: 400, receivedQty: 400, unit: 'pcs', status: 'cross_dock', destinationStore: 'Store A' },
        { id: 2, sku: 'SKU-022', name: 'Store B - Apparel', expectedQty: 500, receivedQty: 500, unit: 'pcs', status: 'cross_dock', destinationStore: 'Store B' },
        { id: 3, sku: 'SKU-023', name: 'Store C - Home Goods', expectedQty: 300, receivedQty: 300, unit: 'pcs', status: 'cross_dock', destinationStore: 'Store C' },
      ],
      outboundShipments: ['SHP-1001', 'SHP-1002', 'SHP-1003'],
      documents: ['manifest.pdf', 'cross-dock-schedule.pdf'],
      notes: 'Immediate transfer to outbound docks',
      tags: ['cross-dock', 'transfer', 'urgent'],
      createdBy: 'Logistics System',
      createdAt: '2024-03-15',
      history: [
        { timestamp: '2024-03-16 08:30', action: 'Received', user: 'Sarah Wilson' },
        { timestamp: '2024-03-16 08:00', action: 'Scheduled', user: 'System' },
        { timestamp: '2024-03-15', action: 'Created', user: 'Logistics System' },
      ],
    },
    {
      id: 'REC-009',
      receiptNumber: 'REC-2024-009',
      asnNumber: null,
      poNumber: 'RMA-001',
      supplier: 'Customer Return',
      supplierId: null,
      status: 'in_inspection',
      type: 'return',
      priority: 'medium',
      warehouse: 'Warehouse A',
      zone: 'Returns Zone',
      dock: 'Dock 5',
      scheduledDate: '2024-03-15',
      scheduledTime: null,
      receivedDate: '2024-03-15',
      receivedTime: '16:30',
      completedDate: null,
      completedTime: null,
      carrier: 'USPS',
      trackingNumber: '94055102008290723567',
      rmaNumber: 'RMA-001',
      customerName: 'John Smith',
      customerId: 'CUST-001',
      totalItems: 3,
      totalQuantity: 3,
      totalValue: 450.00,
      receivedBy: 'Tom Brown',
      receivedById: 'USR-007',
      inspectedBy: 'Returns Team',
      inspectedById: 'USR-011',
      inspectionStatus: 'in_progress',
      qualityStatus: 'pending',
      putawayStatus: 'pending',
      items: [
        { id: 1, sku: 'SKU-001', name: 'Premium Wireless Headphones', expectedQty: 1, receivedQty: 1, unit: 'pcs', status: 'in_inspection', condition: 'used', returnReason: 'Defective' },
        { id: 2, sku: 'SKU-004', name: 'Ergonomic Office Chair', expectedQty: 1, receivedQty: 1, unit: 'pcs', status: 'in_inspection', condition: 'used', returnReason: 'Wrong size' },
        { id: 3, sku: 'SKU-007', name: 'Smart LED TV 55"', expectedQty: 1, receivedQty: 1, unit: 'pcs', status: 'in_inspection', condition: 'used', returnReason: 'Damaged screen' },
      ],
      documents: ['rma-form.pdf', 'return-label.pdf'],
      notes: 'Customer returns - inspection pending',
      tags: ['return', 'rma', 'inspection'],
      createdBy: 'Returns System',
      createdAt: '2024-03-14',
      history: [
        { timestamp: '2024-03-15 16:30', action: 'Received', user: 'Tom Brown' },
        { timestamp: '2024-03-15 16:35', action: 'Inspection Started', user: 'Returns Team' },
        { timestamp: '2024-03-14', action: 'RMA Created', user: 'Customer Service' },
      ],
    },
    {
      id: 'REC-010',
      receiptNumber: 'REC-2024-010',
      asnNumber: 'ASN-2024-010',
      poNumber: 'PO-2024-010',
      supplier: 'Dairy Fresh Co',
      supplierId: 'SUP-008',
      status: 'delayed',
      type: 'purchase_order',
      priority: 'high',
      warehouse: 'Warehouse C',
      zone: 'Cold Storage',
      dock: 'Dock 2',
      scheduledDate: '2024-03-15',
      scheduledTime: '07:00',
      receivedDate: null,
      receivedTime: null,
      completedDate: null,
      completedTime: null,
      carrier: 'Refrigerated Transport',
      trackingNumber: 'REF-010',
      delayReason: 'Truck breakdown',
      estimatedArrival: '2024-03-16 10:00',
      totalItems: 8,
      totalQuantity: 600,
      totalPallets: 4,
      totalCartons: 30,
      totalWeight: 780.0,
      weightUnit: 'kg',
      totalValue: 3200.00,
      receivedBy: null,
      receivedById: null,
      inspectedBy: null,
      inspectedById: null,
      inspectionStatus: 'pending',
      qualityStatus: 'pending',
      putawayStatus: 'pending',
      items: [
        { id: 1, sku: 'SKU-009', name: 'Fresh Dairy Milk', expectedQty: 200, receivedQty: 0, unit: 'gallons', status: 'expected' },
        { id: 2, sku: 'SKU-011', name: 'Greek Yogurt', expectedQty: 200, receivedQty: 0, unit: 'cups', status: 'expected' },
        { id: 3, sku: 'SKU-024', name: 'Fresh Cream', expectedQty: 200, receivedQty: 0, unit: 'cartons', status: 'expected' },
      ],
      documents: ['asn.pdf', 'po.pdf', 'delay-notice.pdf'],
      notes: 'Delayed due to mechanical issues',
      tags: ['delayed', 'cold-chain', 'urgent'],
      createdBy: 'Purchasing System',
      createdAt: '2024-03-13',
      history: [
        { timestamp: '2024-03-15 07:30', action: 'Delay Reported', user: 'Carrier', reason: 'Truck breakdown' },
        { timestamp: '2024-03-13', action: 'ASN Created', user: 'Purchasing System' },
      ],
    },
  ];

  // Suppliers
  const suppliers = [
    { id: 'SUP-001', name: 'Tech Supplies Inc', count: 1 },
    { id: 'SUP-002', name: 'Office Furniture Co', count: 1 },
    { id: 'SUP-003', name: 'Fashion Textiles Inc', count: 1 },
    { id: 'SUP-004', name: 'Organic Food Co', count: 1 },
    { id: 'SUP-005', name: 'Industrial Supplies Co', count: 1 },
    { id: 'SUP-006', name: 'ChemCorp Industries', count: 1 },
    { id: 'SUP-007', name: 'Medical Supplies Inc', count: 1 },
    { id: 'SUP-008', name: 'Dairy Fresh Co', count: 1 },
  ];

  // Receiving types
  const receivingTypes = [
    { id: 'purchase_order', name: 'Purchase Order', icon: ShoppingCart },
    { id: 'return', name: 'Return', icon: RotateCcw },
    { id: 'cross_dock', name: 'Cross-Dock', icon: ArrowLeftRight },
    { id: 'transfer', name: 'Transfer', icon: Move },
    { id: 'drop_ship', name: 'Drop Ship', icon: Package },
  ];

  // Status configuration
  const statusConfig = {
    expected: { label: 'Expected', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    scheduled: { label: 'Scheduled', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Calendar },
    in_progress: { label: 'In Progress', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Activity },
    received: { label: 'Received', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    in_quality: { label: 'In Quality', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Scan },
    quality_failed: { label: 'Quality Failed', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
    putaway_completed: { label: 'Putaway Complete', color: 'bg-green-50 text-green-700 border-green-200', icon: PackageCheck },
    delayed: { label: 'Delayed', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertCircle },
    in_inspection: { label: 'In Inspection', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Scan },
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
  };

  const inspectionStatusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
    in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
    passed: { label: 'Passed', color: 'bg-green-100 text-green-700' },
    failed: { label: 'Failed', color: 'bg-red-100 text-red-700' },
    not_applicable: { label: 'N/A', color: 'bg-gray-100 text-gray-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Package;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-100 text-gray-700';
  };

  const getInspectionStatusColor = (status) => {
    return inspectionStatusConfig[status]?.color || 'bg-gray-100 text-gray-700';
  };

  const filteredReceipts = receipts.filter(receipt => {
    const matchesStatus = selectedStatus === 'all' || receipt.status === selectedStatus;
    const matchesSupplier = selectedSupplier === 'all' || receipt.supplier === selectedSupplier;
    const matchesType = selectedType === 'all' || receipt.type === selectedType;
    const matchesWarehouse = selectedWarehouse === 'all' || receipt.warehouse === selectedWarehouse;
    const matchesSearch = receipt.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.poNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.asnNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSupplier && matchesType && matchesWarehouse && matchesSearch;
  });

  const stats = {
    total: receipts.length,
    expected: receipts.filter(r => r.status === 'expected' || r.status === 'scheduled').length,
    inProgress: receipts.filter(r => r.status === 'in_progress' || r.status === 'in_quality' || r.status === 'in_inspection').length,
    received: receipts.filter(r => r.status === 'received' || r.status === 'putaway_completed').length,
    delayed: receipts.filter(r => r.status === 'delayed').length,
    qualityFailed: receipts.filter(r => r.status === 'quality_failed').length,
    totalItems: receipts.reduce((sum, r) => sum + r.totalItems, 0),
    totalQuantity: receipts.reduce((sum, r) => sum + r.totalQuantity, 0),
    totalPallets: receipts.reduce((sum, r) => sum + (r.totalPallets || 0), 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Receiving</h1>
            <p className="text-black/50 mt-1">Manage incoming shipments, ASNs, and receiving operations</p>
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
                  Print Receiving Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowASNDialog(true)}
            >
              <FileText size={16} />
              View ASNs
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowScheduleDialog(true)}
            >
              <Calendar size={16} />
              Schedule
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create Receiving
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-8 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Receipts</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <ArrowDownCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Expected</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.expected}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Clock size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">In Progress</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.inProgress}</p>
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
                  <p className="text-xs text-black/50">Received</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.received}</p>
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
                  <p className="text-xs text-black/50">Delayed</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.delayed}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <AlertCircle size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Quality Failed</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.qualityFailed}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertTriangle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Items</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalItems}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Package size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Pallets</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalPallets}</p>
                </div>
                <div className="p-2 bg-indigo-50 rounded-full">
                  <PaintBucket size={18} className="text-indigo-600" />
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
              placeholder="Search by receipt #, PO #, ASN #, supplier, tracking..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="expected">Expected</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="in_quality">In Quality</SelectItem>
              <SelectItem value="quality_failed">Quality Failed</SelectItem>
              <SelectItem value="putaway_completed">Putaway Complete</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="in_inspection">In Inspection</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suppliers</SelectItem>
              {suppliers.map(supplier => (
                <SelectItem key={supplier.id} value={supplier.name}>{supplier.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {receivingTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              <SelectItem value="Warehouse A">Warehouse A</SelectItem>
              <SelectItem value="Warehouse B">Warehouse B</SelectItem>
              <SelectItem value="Warehouse C">Warehouse C</SelectItem>
              <SelectItem value="Store B">Store B</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
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

      {/* Receipts Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredReceipts.map((receipt) => {
            const StatusIcon = statusConfig[receipt.status]?.icon || Package;
            
            return (
              <Card key={receipt.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(receipt.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {receipt.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(receipt.priority))}>
                            {receipt.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            {receipt.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{receipt.receiptNumber}</h3>
                        <p className="text-xs text-black/50">PO: {receipt.poNumber || '—'} • ASN: {receipt.asnNumber || '—'}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedReceipt(receipt);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {receipt.status === 'expected' || receipt.status === 'scheduled' ? (
                            <DropdownMenuItem onClick={() => {
                              setSelectedReceipt(receipt);
                              setShowReceiveDialog(true);
                            }}>
                              <ArrowDownCircle className="mr-2 h-4 w-4" />
                              Start Receiving
                            </DropdownMenuItem>
                          ) : receipt.status === 'in_progress' ? (
                            <DropdownMenuItem onClick={() => {
                              setSelectedReceipt(receipt);
                              setShowReceiveDialog(true);
                            }}>
                              <PackagePlus className="mr-2 h-4 w-4" />
                              Continue Receiving
                            </DropdownMenuItem>
                          ) : null}
                          {receipt.status === 'received' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedReceipt(receipt);
                              setShowInspectDialog(true);
                            }}>
                              <Scan className="mr-2 h-4 w-4" />
                              Inspect
                            </DropdownMenuItem>
                          )}
                          {receipt.status === 'in_quality' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedReceipt(receipt);
                              setShowQualityDialog(true);
                            }}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Quality Check
                            </DropdownMenuItem>
                          )}
                          {receipt.status === 'received' || receipt.status === 'in_quality' ? (
                            <DropdownMenuItem onClick={() => {
                              setSelectedReceipt(receipt);
                              setShowPutawayDialog(true);
                            }}>
                              <PackageCheck className="mr-2 h-4 w-4" />
                              Putaway
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Print Documents
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
                    {/* Supplier */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Building size={12} className="text-gray-600" />
                        <span className="text-xs font-medium">{receipt.supplier}</span>
                      </div>
                      {receipt.carrier && (
                        <Badge variant="outline" className="text-[10px] border-[#F5EEE9]">
                          {receipt.carrier}
                        </Badge>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-2 mb-2 text-[10px]">
                      <div>
                        <span className="text-black/50">Scheduled:</span>
                        <span className="ml-1 font-medium">{receipt.scheduledDate}</span>
                      </div>
                      {receipt.receivedDate && (
                        <div>
                          <span className="text-black/50">Received:</span>
                          <span className="ml-1 font-medium">{receipt.receivedDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Tracking */}
                    {receipt.trackingNumber && (
                      <div className="mb-2 p-2 bg-[#F5EEE9]/50 rounded-lg">
                        <p className="text-[10px] text-black/50">Tracking #</p>
                        <p className="text-xs font-mono font-medium">{receipt.trackingNumber}</p>
                      </div>
                    )}

                    {/* Delay Info */}
                    {receipt.delayReason && (
                      <div className="mb-2 p-2 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-1">
                          <AlertCircle size={10} className="text-orange-600" />
                          <span className="text-[10px] text-orange-700">Delayed: {receipt.delayReason}</span>
                        </div>
                        <p className="text-[8px] text-orange-600 mt-1">ETA: {receipt.estimatedArrival}</p>
                      </div>
                    )}

                    {/* Quantity Summary */}
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Items</p>
                        <p className="text-xs font-bold">{receipt.totalItems}</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Qty</p>
                        <p className="text-xs font-bold">{receipt.totalQuantity}</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Pallets</p>
                        <p className="text-xs font-bold">{receipt.totalPallets || 0}</p>
                      </div>
                    </div>

                    {/* Inspection/Quality Status */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={cn("text-[10px]", getInspectionStatusColor(receipt.inspectionStatus))}>
                        Inspection: {receipt.inspectionStatus}
                      </Badge>
                      {receipt.qualityStatus !== 'pending' && receipt.qualityStatus !== 'not_applicable' && (
                        <Badge className={cn("text-[10px]", 
                          receipt.qualityStatus === 'passed' ? 'bg-green-100 text-green-700' : 
                          receipt.qualityStatus === 'failed' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'
                        )}>
                          Quality: {receipt.qualityStatus}
                        </Badge>
                      )}
                    </div>

                    {/* Discrepancy Alert */}
                    {receipt.discrepancies && receipt.discrepancies.length > 0 && (
                      <div className="mb-2 p-2 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-1">
                          <AlertTriangle size={10} className="text-red-600" />
                          <span className="text-[10px] text-red-700">{receipt.discrepancies.length} discrepancies</span>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {receipt.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] border-[#F5EEE9] bg-[#F5EEE9]/30">
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
                  <TableHead className="text-black/50">Receipt #</TableHead>
                  <TableHead className="text-black/50">PO #</TableHead>
                  <TableHead className="text-black/50">ASN #</TableHead>
                  <TableHead className="text-black/50">Supplier</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Scheduled</TableHead>
                  <TableHead className="text-black/50">Received</TableHead>
                  <TableHead className="text-black/50 text-right">Items</TableHead>
                  <TableHead className="text-black/50 text-right">Quantity</TableHead>
                  <TableHead className="text-black/50">Carrier</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">{receipt.receiptNumber}</TableCell>
                    <TableCell className="font-mono text-xs">{receipt.poNumber || '—'}</TableCell>
                    <TableCell className="font-mono text-xs">{receipt.asnNumber || '—'}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{receipt.supplier}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(receipt.status))}>
                        {receipt.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(receipt.priority))}>
                        {receipt.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {receipt.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{receipt.scheduledDate}</TableCell>
                    <TableCell>{receipt.receivedDate || '—'}</TableCell>
                    <TableCell className="text-right">{receipt.totalItems}</TableCell>
                    <TableCell className="text-right">{receipt.totalQuantity}</TableCell>
                    <TableCell className="max-w-[100px] truncate">{receipt.carrier || '—'}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedReceipt(receipt);
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
                Showing {filteredReceipts.length} of {receipts.length} receipts
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

      {/* Create Receiving Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Receiving Record</DialogTitle>
            <DialogDescription>
              Create a new receiving record from PO or ASN
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="po">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="po">From Purchase Order</TabsTrigger>
                <TabsTrigger value="asn">From ASN</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>

              <TabsContent value="po" className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Purchase Order</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose PO" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PO-2024-001">PO-2024-001 - Tech Supplies Inc</SelectItem>
                      <SelectItem value="PO-2024-002">PO-2024-002 - Office Furniture Co</SelectItem>
                      <SelectItem value="PO-2024-003">PO-2024-003 - Fashion Textiles Inc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Supplier</Label>
                  <Input value="Tech Supplies Inc" disabled />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expected Items</Label>
                    <Input value="12" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected Quantity</Label>
                    <Input value="450" disabled />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="asn" className="space-y-4">
                <div className="space-y-2">
                  <Label>Select ASN</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose ASN" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ASN-2024-001">ASN-2024-001 - Tech Supplies Inc</SelectItem>
                      <SelectItem value="ASN-2024-002">ASN-2024-002 - Office Furniture Co</SelectItem>
                      <SelectItem value="ASN-2024-003">ASN-2024-003 - Fashion Textiles Inc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Carrier</Label>
                  <Input placeholder="Carrier name" />
                </div>

                <div className="space-y-2">
                  <Label>Tracking Number</Label>
                  <Input placeholder="Tracking #" />
                </div>
              </TabsContent>

              <TabsContent value="manual" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Receipt Number</Label>
                    <Input placeholder="REC-2024-011" />
                  </div>
                  <div className="space-y-2">
                    <Label>Supplier</Label>
                    <Input placeholder="Supplier name" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>PO Number</Label>
                    <Input placeholder="PO number" />
                  </div>
                  <div className="space-y-2">
                    <Label>ASN Number</Label>
                    <Input placeholder="ASN number" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Carrier</Label>
                    <Input placeholder="Carrier" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tracking Number</Label>
                    <Input placeholder="Tracking #" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Total Items</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Quantity</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Total Pallets</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Weight (kg)</Label>
                    <Input type="number" step="0.1" placeholder="0.0" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label>Scheduled Date</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Warehouse</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                  <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                  <SelectItem value="Warehouse C">Warehouse C</SelectItem>
                  <SelectItem value="Store B">Store B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Receiving Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receive Dialog */}
      <Dialog open={showReceiveDialog} onOpenChange={setShowReceiveDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Receive Shipment</DialogTitle>
            <DialogDescription>
              Record receipt of items
            </DialogDescription>
          </DialogHeader>

          {selectedReceipt && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-[#F5EEE9] rounded-lg">
                <p className="font-medium">{selectedReceipt.receiptNumber}</p>
                <p className="text-xs text-black/50">PO: {selectedReceipt.poNumber} • Supplier: {selectedReceipt.supplier}</p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-[#F5EEE9]">
                    <TableHead className="text-black/50">SKU</TableHead>
                    <TableHead className="text-black/50">Product</TableHead>
                    <TableHead className="text-black/50 text-right">Expected</TableHead>
                    <TableHead className="text-black/50 text-right">Received</TableHead>
                    <TableHead className="text-black/50">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedReceipt.items.map((item) => (
                    <TableRow key={item.id} className="border-[#F5EEE9]">
                      <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.expectedQty}</TableCell>
                      <TableCell className="text-right">
                        <Input type="number" className="w-20 h-8 text-right" defaultValue={item.receivedQty || 0} />
                      </TableCell>
                      <TableCell>
                        {item.status === 'received' && <CheckCircle size={14} className="text-green-600" />}
                        {item.status === 'discrepancy' && <AlertTriangle size={14} className="text-red-600" />}
                        {item.status === 'expected' && <Clock size={14} className="text-yellow-600" />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="space-y-2">
                <Label>Receiving Notes</Label>
                <Textarea placeholder="Any issues or notes about this receipt" rows={3} />
              </div>

              <div className="space-y-2">
                <Label>Documents</Label>
                <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-4 text-center">
                  <Upload size={24} className="mx-auto text-black/30 mb-2" />
                  <p className="text-sm text-black/50">Upload packing slip, BOL, etc.</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReceiveDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Complete Receiving
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Inspect Dialog */}
      <Dialog open={showInspectDialog} onOpenChange={setShowInspectDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Inspect Shipment</DialogTitle>
            <DialogDescription>
              Record inspection results
            </DialogDescription>
          </DialogHeader>

          {selectedReceipt && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-[#F5EEE9] rounded-lg">
                <p className="font-medium">{selectedReceipt.receiptNumber}</p>
                <p className="text-xs text-black/50">Supplier: {selectedReceipt.supplier}</p>
              </div>

              <div className="space-y-2">
                <Label>Inspection Status</Label>
                <RadioGroup defaultValue="passed" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="passed" id="passed" />
                    <Label htmlFor="passed">Passed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="failed" id="failed" />
                    <Label htmlFor="failed">Failed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="partial" />
                    <Label htmlFor="partial">Partial</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Inspection Checklist</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="damage" />
                    <Label htmlFor="damage">No visible damage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="quantity" />
                    <Label htmlFor="quantity">Quantity matches</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="labels" />
                    <Label htmlFor="labels">Labels intact</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="expiry" />
                    <Label htmlFor="expiry">Expiry dates valid</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Inspection Notes</Label>
                <Textarea placeholder="Any issues found during inspection" rows={3} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInspectDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Submit Inspection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quality Dialog */}
      <Dialog open={showQualityDialog} onOpenChange={setShowQualityDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Quality Check</DialogTitle>
            <DialogDescription>
              Perform quality control checks
            </DialogDescription>
          </DialogHeader>

          {selectedReceipt && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-[#F5EEE9] rounded-lg">
                <p className="font-medium">{selectedReceipt.receiptNumber}</p>
                <p className="text-xs text-black/50">Type: {selectedReceipt.type}</p>
              </div>

              {selectedReceipt.type === 'cold-chain' && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">Temperature Log</p>
                  <div className="flex items-center gap-2 mt-2">
                    {selectedReceipt.temperatureLog?.map((temp, i) => (
                      <Badge key={i} className="bg-blue-100 text-blue-700">
                        {temp}°C
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Quality Status</Label>
                <RadioGroup defaultValue="passed" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="passed" id="q-passed" />
                    <Label htmlFor="q-passed">Passed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="failed" id="q-failed" />
                    <Label htmlFor="q-failed">Failed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sampling" id="sampling" />
                    <Label htmlFor="sampling">Sampling</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Quality Notes</Label>
                <Textarea placeholder="Quality control findings" rows={3} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQualityDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Submit Quality Check
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
            <TooltipContent side="left">Create Receiving</TooltipContent>
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
            <TooltipContent side="left">Scan Item</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowASNDialog(true)}
              >
                <FileText size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">View ASNs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ReceivingPage;