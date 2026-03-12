// app/dashboard/picking-lists/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  List,
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
  Clock,
  Download,
  Grid,
  List as ListIcon,
  Ban,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  User,
  ArrowRight,
  Boxes,
  PackageCheck,
  PackagePlus,
  Activity,
  Zap,
  Scan,
  Workflow,
  Route,
  ToggleLeftIcon,
  ToggleRightIcon,
  ArrowLeftRight as ArrowLeftRightIcon,
  ArrowUpDown as ArrowUpDownIcon,
  MoveHorizontal as MoveHorizontalIcon,
  MoveVertical as MoveVerticalIcon,
  GripVertical as GripVerticalIcon,
  GripHorizontal as GripHorizontalIcon,
  ClipboardList,
  ShoppingCart,
 
  PackageIcon as PackageIconCustom,
  Snowflake,
  RotateCcw,
  Pause,
  
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
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PickingListsPage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedList, setSelectedList] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedPicker, setSelectedPicker] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showOptimizeDialog, setShowOptimizeDialog] = useState(false);
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample picking lists data
  const pickingLists = [
    {
      id: 'PL-001',
      listNumber: 'PL-2024-001',
      name: 'Morning Store Replenishment',
      type: 'replenishment',
      status: 'in_progress',
      priority: 'high',
      zone: 'Picking Zone',
      warehouse: 'Warehouse A',
      createdDate: '2024-03-15 08:30',
      scheduledDate: '2024-03-15',
      dueDate: '2024-03-15 12:00',
      startedAt: '2024-03-15 09:15',
      completedAt: null,
      picker: 'John Doe',
      pickerId: 'USR-001',
      verifier: null,
      totalItems: 45,
      pickedItems: 28,
      remainingItems: 17,
      skippedItems: 2,
      totalQuantity: 234,
      pickedQuantity: 156,
      accuracy: 98.2,
      completion: 62,
      estimatedTime: 120,
      elapsedTime: 75,
      remainingTime: 45,
      source: 'Store Orders',
      destination: 'Store A',
      orderIds: ['ORD-1234', 'ORD-1235', 'ORD-1236'],
      items: [
        { id: 1, sku: 'SKU-001', name: 'Premium Wireless Headphones', location: 'A-01-01', quantity: 5, picked: 5, status: 'picked' },
        { id: 2, sku: 'SKU-002', name: 'Organic Protein Powder', location: 'A-01-04', quantity: 8, picked: 8, status: 'picked' },
        { id: 3, sku: 'SKU-003', name: 'Industrial Lubricant', location: 'B-04-03', quantity: 2, picked: 2, status: 'picked' },
        { id: 4, sku: 'SKU-004', name: 'Ergonomic Office Chair', location: 'B-03-15', quantity: 3, picked: 2, status: 'pending' },
        { id: 5, sku: 'SKU-005', name: 'Cotton T-Shirt (White, L)', location: 'A-01-15', quantity: 10, picked: 8, status: 'pending' },
        { id: 6, sku: 'SKU-006', name: 'Canned Organic Soup', location: 'C-06-08', quantity: 12, picked: 0, status: 'pending' },
        { id: 7, sku: 'SKU-007', name: 'Smart LED TV 55"', location: 'A-01-22', quantity: 1, picked: 0, status: 'skipped' },
        { id: 8, sku: 'SKU-008', name: 'First Aid Kit', location: 'P-01-05', quantity: 4, picked: 3, status: 'pending' },
      ],
      notes: 'Priority store order',
      tags: ['store', 'morning', 'replenishment'],
      createdBy: 'System',
      assignedBy: 'Jane Smith',
      history: [
        { timestamp: '2024-03-15 09:15', action: 'Started', user: 'John Doe' },
        { timestamp: '2024-03-15 08:30', action: 'Assigned', user: 'Jane Smith' },
        { timestamp: '2024-03-15 08:00', action: 'Created', user: 'System' },
      ],
    },
    {
      id: 'PL-002',
      listNumber: 'PL-2024-002',
      name: 'Customer Order #ORD-1240',
      type: 'customer_order',
      status: 'pending',
      priority: 'high',
      zone: 'Picking Zone',
      warehouse: 'Warehouse A',
      createdDate: '2024-03-15 10:15',
      scheduledDate: '2024-03-15',
      dueDate: '2024-03-15 16:00',
      startedAt: null,
      completedAt: null,
      picker: null,
      pickerId: null,
      verifier: null,
      totalItems: 12,
      pickedItems: 0,
      remainingItems: 12,
      skippedItems: 0,
      totalQuantity: 24,
      pickedQuantity: 0,
      accuracy: 0,
      completion: 0,
      estimatedTime: 45,
      elapsedTime: 0,
      remainingTime: 45,
      source: 'Online Order',
      destination: 'Shipping',
      customer: 'John Smith',
      customerId: 'CUST-001',
      orderIds: ['ORD-1240'],
      items: [
        { id: 1, sku: 'SKU-001', name: 'Premium Wireless Headphones', location: 'A-01-01', quantity: 1, picked: 0, status: 'pending' },
        { id: 2, sku: 'SKU-003', name: 'Industrial Lubricant', location: 'B-04-03', quantity: 2, picked: 0, status: 'pending' },
        { id: 3, sku: 'SKU-008', name: 'First Aid Kit', location: 'P-01-05', quantity: 1, picked: 0, status: 'pending' },
      ],
      notes: 'Express shipping requested',
      tags: ['customer', 'online', 'express'],
      createdBy: 'Order System',
      assignedBy: null,
      history: [
        { timestamp: '2024-03-15 10:15', action: 'Created', user: 'Order System' },
      ],
    },
    {
      id: 'PL-003',
      listNumber: 'PL-2024-003',
      name: 'Bulk Order - Acme Corp',
      type: 'bulk_order',
      status: 'assigned',
      priority: 'medium',
      zone: 'Storage Zone A',
      warehouse: 'Warehouse A',
      createdDate: '2024-03-14 14:30',
      scheduledDate: '2024-03-16',
      dueDate: '2024-03-16 17:00',
      startedAt: null,
      completedAt: null,
      picker: 'Mike Johnson',
      pickerId: 'USR-003',
      verifier: null,
      totalItems: 24,
      pickedItems: 0,
      remainingItems: 24,
      skippedItems: 0,
      totalQuantity: 350,
      pickedQuantity: 0,
      accuracy: 0,
      completion: 0,
      estimatedTime: 180,
      elapsedTime: 0,
      remainingTime: 180,
      source: 'Wholesale Order',
      destination: 'Loading Dock 3',
      customer: 'Acme Corporation',
      customerId: 'CUST-010',
      orderIds: ['ORD-1250'],
      items: [
        { id: 1, sku: 'SKU-002', name: 'Organic Protein Powder', location: 'A-01-04', quantity: 50, picked: 0, status: 'pending' },
        { id: 2, sku: 'SKU-004', name: 'Ergonomic Office Chair', location: 'B-03-15', quantity: 10, picked: 0, status: 'pending' },
        { id: 3, sku: 'SKU-005', name: 'Cotton T-Shirt (White, L)', location: 'A-01-15', quantity: 200, picked: 0, status: 'pending' },
        { id: 4, sku: 'SKU-006', name: 'Canned Organic Soup', location: 'C-06-08', quantity: 90, picked: 0, status: 'pending' },
      ],
      notes: 'Palletized shipping required',
      tags: ['wholesale', 'bulk', 'pallet'],
      createdBy: 'Sales Team',
      assignedBy: 'Jane Smith',
      history: [
        { timestamp: '2024-03-15 09:00', action: 'Assigned', user: 'Jane Smith' },
        { timestamp: '2024-03-14 14:30', action: 'Created', user: 'Sales Team' },
      ],
    },
    {
      id: 'PL-004',
      listNumber: 'PL-2024-004',
      name: 'Express Parcels - Afternoon',
      type: 'express',
      status: 'completed',
      priority: 'high',
      zone: 'Picking Zone',
      warehouse: 'Warehouse A',
      createdDate: '2024-03-15 13:00',
      scheduledDate: '2024-03-15',
      dueDate: '2024-03-15 15:00',
      startedAt: '2024-03-15 13:15',
      completedAt: '2024-03-15 14:45',
      picker: 'Sarah Wilson',
      pickerId: 'USR-004',
      verifier: 'Tom Brown',
      totalItems: 18,
      pickedItems: 18,
      remainingItems: 0,
      skippedItems: 0,
      totalQuantity: 32,
      pickedQuantity: 32,
      accuracy: 100,
      completion: 100,
      estimatedTime: 90,
      elapsedTime: 90,
      remainingTime: 0,
      source: 'Express Orders',
      destination: 'Courier Pickup',
      orderIds: ['ORD-1241', 'ORD-1242', 'ORD-1243'],
      items: [
        { id: 1, sku: 'SKU-001', name: 'Premium Wireless Headphones', location: 'A-01-01', quantity: 2, picked: 2, status: 'picked' },
        { id: 2, sku: 'SKU-003', name: 'Industrial Lubricant', location: 'B-04-03', quantity: 1, picked: 1, status: 'picked' },
        { id: 3, sku: 'SKU-007', name: 'Smart LED TV 55"', location: 'A-01-22', quantity: 1, picked: 1, status: 'picked' },
        { id: 4, sku: 'SKU-008', name: 'First Aid Kit', location: 'P-01-05', quantity: 3, picked: 3, status: 'picked' },
      ],
      notes: 'All items picked and verified',
      tags: ['express', 'completed', 'verified'],
      createdBy: 'System',
      assignedBy: 'Jane Smith',
      verifiedBy: 'Tom Brown',
      verifiedAt: '2024-03-15 14:50',
      history: [
        { timestamp: '2024-03-15 14:45', action: 'Completed', user: 'Sarah Wilson' },
        { timestamp: '2024-03-15 14:50', action: 'Verified', user: 'Tom Brown' },
        { timestamp: '2024-03-15 13:15', action: 'Started', user: 'Sarah Wilson' },
        { timestamp: '2024-03-15 13:05', action: 'Assigned', user: 'Jane Smith' },
        { timestamp: '2024-03-15 13:00', action: 'Created', user: 'System' },
      ],
    },
    {
      id: 'PL-005',
      listNumber: 'PL-2024-005',
      name: 'Store B Replenishment',
      type: 'replenishment',
      status: 'pending',
      priority: 'medium',
      zone: 'Storage Zone B',
      warehouse: 'Warehouse A',
      createdDate: '2024-03-14 09:00',
      scheduledDate: '2024-03-16',
      dueDate: '2024-03-16 10:00',
      startedAt: null,
      completedAt: null,
      picker: null,
      pickerId: null,
      verifier: null,
      totalItems: 32,
      pickedItems: 0,
      remainingItems: 32,
      skippedItems: 0,
      totalQuantity: 180,
      pickedQuantity: 0,
      accuracy: 0,
      completion: 0,
      estimatedTime: 95,
      elapsedTime: 0,
      remainingTime: 95,
      source: 'Store Orders',
      destination: 'Store B',
      orderIds: ['STO-REQ-001'],
      items: [
        { id: 1, sku: 'SKU-002', name: 'Organic Protein Powder', location: 'A-01-04', quantity: 15, picked: 0, status: 'pending' },
        { id: 2, sku: 'SKU-005', name: 'Cotton T-Shirt (White, L)', location: 'A-01-15', quantity: 50, picked: 0, status: 'pending' },
        { id: 3, sku: 'SKU-006', name: 'Canned Organic Soup', location: 'C-06-08', quantity: 100, picked: 0, status: 'pending' },
        { id: 4, sku: 'SKU-009', name: 'Fresh Dairy Milk', location: 'C-01-01', quantity: 15, picked: 0, status: 'pending' },
      ],
      notes: 'Weekly store replenishment',
      tags: ['store', 'replenishment', 'weekly'],
      createdBy: 'Inventory System',
      assignedBy: null,
      history: [
        { timestamp: '2024-03-14 09:00', action: 'Created', user: 'Inventory System' },
      ],
    },
    {
      id: 'PL-006',
      listNumber: 'PL-2024-006',
      name: 'Cold Chain Orders',
      type: 'cold_chain',
      status: 'in_progress',
      priority: 'high',
      zone: 'Cold Storage Zone',
      warehouse: 'Warehouse C',
      createdDate: '2024-03-15 07:30',
      scheduledDate: '2024-03-15',
      dueDate: '2024-03-15 11:00',
      startedAt: '2024-03-15 08:00',
      completedAt: null,
      picker: 'Emma Watson',
      pickerId: 'USR-005',
      verifier: null,
      totalItems: 14,
      pickedItems: 9,
      remainingItems: 5,
      skippedItems: 0,
      totalQuantity: 85,
      pickedQuantity: 52,
      accuracy: 100,
      completion: 64,
      estimatedTime: 75,
      elapsedTime: 48,
      remainingTime: 27,
      source: 'Temperature-Controlled Orders',
      destination: 'Cold Loading',
      temperature: '2-4°C',
      orderIds: ['ORD-1244', 'ORD-1245'],
      items: [
        { id: 1, sku: 'SKU-009', name: 'Fresh Dairy Milk', location: 'C-01-01', quantity: 20, picked: 20, status: 'picked' },
        { id: 2, sku: 'SKU-010', name: 'Fresh Vegetables Box', location: 'C-01-02', quantity: 15, picked: 15, status: 'picked' },
        { id: 3, sku: 'SKU-011', name: 'Greek Yogurt', location: 'C-01-03', quantity: 30, picked: 17, status: 'pending' },
        { id: 4, sku: 'SKU-012', name: 'Chicken Breasts', location: 'C-01-04', quantity: 20, picked: 0, status: 'pending' },
      ],
      notes: 'Maintain cold chain integrity',
      tags: ['cold-chain', 'perishable', 'temperature-sensitive'],
      createdBy: 'Order System',
      assignedBy: 'Jane Smith',
      history: [
        { timestamp: '2024-03-15 08:00', action: 'Started', user: 'Emma Watson' },
        { timestamp: '2024-03-15 07:45', action: 'Assigned', user: 'Jane Smith' },
        { timestamp: '2024-03-15 07:30', action: 'Created', user: 'Order System' },
      ],
    },
    {
      id: 'PL-007',
      listNumber: 'PL-2024-007',
      name: 'Frozen Goods Pick',
      type: 'cold_chain',
      status: 'paused',
      priority: 'medium',
      zone: 'Freezer Zone',
      warehouse: 'Warehouse C',
      createdDate: '2024-03-15 09:30',
      scheduledDate: '2024-03-15',
      dueDate: '2024-03-15 14:00',
      startedAt: '2024-03-15 09:45',
      completedAt: null,
      pausedAt: '2024-03-15 10:30',
      pauseReason: 'Equipment maintenance',
      picker: 'Anna Taylor',
      pickerId: 'USR-006',
      verifier: null,
      totalItems: 8,
      pickedItems: 3,
      remainingItems: 5,
      skippedItems: 0,
      totalQuantity: 45,
      pickedQuantity: 18,
      accuracy: 100,
      completion: 40,
      estimatedTime: 50,
      elapsedTime: 45,
      remainingTime: 5,
      source: 'Frozen Orders',
      destination: 'Freezer Loading',
      temperature: '-18 to -22°C',
      orderIds: ['ORD-1246'],
      items: [
        { id: 1, sku: 'SKU-016', name: 'Frozen Vegetables', location: 'D-01-01', quantity: 25, picked: 10, status: 'picked' },
        { id: 2, sku: 'SKU-017', name: 'Ice Cream', location: 'D-01-02', quantity: 20, picked: 8, status: 'paused' },
      ],
      notes: 'Paused due to freezer maintenance',
      tags: ['frozen', 'paused', 'maintenance'],
      createdBy: 'Order System',
      assignedBy: 'Jane Smith',
      history: [
        { timestamp: '2024-03-15 10:30', action: 'Paused', user: 'Anna Taylor', reason: 'Equipment maintenance' },
        { timestamp: '2024-03-15 09:45', action: 'Started', user: 'Anna Taylor' },
        { timestamp: '2024-03-15 09:35', action: 'Assigned', user: 'Jane Smith' },
        { timestamp: '2024-03-15 09:30', action: 'Created', user: 'Order System' },
      ],
    },
    {
      id: 'PL-008',
      listNumber: 'PL-2024-008',
      name: 'Hazardous Materials Pick',
      type: 'hazardous',
      status: 'assigned',
      priority: 'high',
      zone: 'Hazardous Materials Zone',
      warehouse: 'Warehouse B',
      createdDate: '2024-03-15 11:00',
      scheduledDate: '2024-03-15',
      dueDate: '2024-03-15 16:00',
      startedAt: null,
      completedAt: null,
      picker: 'Richard Harris',
      pickerId: 'USR-007',
      verifier: null,
      totalItems: 6,
      pickedItems: 0,
      remainingItems: 6,
      skippedItems: 0,
      totalQuantity: 12,
      pickedQuantity: 0,
      accuracy: 0,
      completion: 0,
      estimatedTime: 60,
      elapsedTime: 0,
      remainingTime: 60,
      source: 'Industrial Order',
      destination: 'Hazmat Staging',
      safetyProtocol: 'HAZMAT-PROTOCOL-001',
      orderIds: ['ORD-1247'],
      items: [
        { id: 1, sku: 'SKU-003', name: 'Industrial Lubricant - Grade A', location: 'F-01-01', quantity: 4, picked: 0, status: 'pending' },
        { id: 2, sku: 'SKU-018', name: 'Chemical Solvent', location: 'F-01-02', quantity: 8, picked: 0, status: 'pending' },
      ],
      notes: 'Requires hazmat training',
      tags: ['hazardous', 'chemical', 'ppe-required'],
      createdBy: 'Industrial Sales',
      assignedBy: 'Safety Officer',
      history: [
        { timestamp: '2024-03-15 11:15', action: 'Assigned', user: 'Safety Officer' },
        { timestamp: '2024-03-15 11:00', action: 'Created', user: 'Industrial Sales' },
      ],
    },
    {
      id: 'PL-009',
      listNumber: 'PL-2024-009',
      name: 'Returns Inspection Pick',
      type: 'returns',
      status: 'pending',
      priority: 'low',
      zone: 'Returns Zone',
      warehouse: 'Warehouse A',
      createdDate: '2024-03-14 15:30',
      scheduledDate: '2024-03-16',
      dueDate: '2024-03-16 17:00',
      startedAt: null,
      completedAt: null,
      picker: null,
      pickerId: null,
      verifier: null,
      totalItems: 15,
      pickedItems: 0,
      remainingItems: 15,
      skippedItems: 0,
      totalQuantity: 23,
      pickedQuantity: 0,
      accuracy: 0,
      completion: 0,
      estimatedTime: 40,
      elapsedTime: 0,
      remainingTime: 40,
      source: 'Returns Processing',
      destination: 'Inspection Area',
      orderIds: ['RMA-001', 'RMA-002'],
      items: [
        { id: 1, sku: 'SKU-001', name: 'Premium Wireless Headphones', location: 'G-01-01', quantity: 2, picked: 0, status: 'pending' },
        { id: 2, sku: 'SKU-007', name: 'Smart LED TV 55"', location: 'G-01-01', quantity: 1, picked: 0, status: 'pending' },
        { id: 3, sku: 'SKU-004', name: 'Ergonomic Office Chair', location: 'G-01-01', quantity: 1, picked: 0, status: 'pending' },
      ],
      notes: 'Items need inspection before restock',
      tags: ['returns', 'inspection', 'rma'],
      createdBy: 'Returns System',
      assignedBy: null,
      history: [
        { timestamp: '2024-03-14 15:30', action: 'Created', user: 'Returns System' },
      ],
    },
    {
      id: 'PL-010',
      listNumber: 'PL-2024-010',
      name: 'Express - Afternoon Batch',
      type: 'express',
      status: 'completed',
      priority: 'high',
      zone: 'Picking Zone',
      warehouse: 'Warehouse A',
      createdDate: '2024-03-14 14:00',
      scheduledDate: '2024-03-14',
      dueDate: '2024-03-14 17:00',
      startedAt: '2024-03-14 14:15',
      completedAt: '2024-03-14 16:30',
      picker: 'John Doe',
      pickerId: 'USR-001',
      verifier: 'Jane Smith',
      totalItems: 22,
      pickedItems: 22,
      remainingItems: 0,
      skippedItems: 0,
      totalQuantity: 45,
      pickedQuantity: 45,
      accuracy: 100,
      completion: 100,
      estimatedTime: 135,
      elapsedTime: 135,
      remainingTime: 0,
      source: 'Express Orders',
      destination: 'Courier Pickup',
      orderIds: ['ORD-1230', 'ORD-1231', 'ORD-1232'],
      items: [
        { id: 1, sku: 'SKU-001', name: 'Premium Wireless Headphones', location: 'A-01-01', quantity: 3, picked: 3, status: 'picked' },
        { id: 2, sku: 'SKU-002', name: 'Organic Protein Powder', location: 'A-01-04', quantity: 5, picked: 5, status: 'picked' },
        { id: 3, sku: 'SKU-005', name: 'Cotton T-Shirt', location: 'A-01-15', quantity: 12, picked: 12, status: 'picked' },
      ],
      notes: 'All orders picked and verified',
      tags: ['express', 'completed', 'verified'],
      createdBy: 'System',
      assignedBy: 'Jane Smith',
      verifiedBy: 'Jane Smith',
      verifiedAt: '2024-03-14 16:35',
      history: [
        { timestamp: '2024-03-14 16:30', action: 'Completed', user: 'John Doe' },
        { timestamp: '2024-03-14 16:35', action: 'Verified', user: 'Jane Smith' },
        { timestamp: '2024-03-14 14:15', action: 'Started', user: 'John Doe' },
        { timestamp: '2024-03-14 14:05', action: 'Assigned', user: 'Jane Smith' },
        { timestamp: '2024-03-14 14:00', action: 'Created', user: 'System' },
      ],
    },
  ];

  // Pickers/Team members
  const pickers = [
    { id: 'USR-001', name: 'John Doe', activeLists: 1, completedToday: 5, avatar: null, initials: 'JD' },
    { id: 'USR-002', name: 'Jane Smith', activeLists: 0, completedToday: 3, avatar: null, initials: 'JS' },
    { id: 'USR-003', name: 'Mike Johnson', activeLists: 1, completedToday: 2, avatar: null, initials: 'MJ' },
    { id: 'USR-004', name: 'Sarah Wilson', activeLists: 0, completedToday: 4, avatar: null, initials: 'SW' },
    { id: 'USR-005', name: 'Emma Watson', activeLists: 1, completedToday: 1, avatar: null, initials: 'EW' },
    { id: 'USR-006', name: 'Anna Taylor', activeLists: 1, completedToday: 0, avatar: null, initials: 'AT' },
    { id: 'USR-007', name: 'Richard Harris', activeLists: 1, completedToday: 0, avatar: null, initials: 'RH' },
  ];

  // Zones
  const zones = [
    { id: 'picking', name: 'Picking Zone', count: 4 },
    { id: 'storage-a', name: 'Storage Zone A', count: 1 },
    { id: 'storage-b', name: 'Storage Zone B', count: 1 },
    { id: 'cold', name: 'Cold Storage Zone', count: 1 },
    { id: 'freezer', name: 'Freezer Zone', count: 1 },
    { id: 'hazmat', name: 'Hazardous Materials Zone', count: 1 },
    { id: 'returns', name: 'Returns Zone', count: 1 },
  ];

  // List types
  const listTypes = [
    { id: 'replenishment', name: 'Replenishment', icon: PackagePlus },
    { id: 'customer_order', name: 'Customer Order', icon: ShoppingCart },
    { id: 'bulk_order', name: 'Bulk Order', icon: Boxes },
    { id: 'express', name: 'Express', icon: Zap },
    { id: 'cold_chain', name: 'Cold Chain', icon: Snowflake },
    { id: 'hazardous', name: 'Hazardous', icon: AlertTriangle },
    { id: 'returns', name: 'Returns', icon: RotateCcw },
  ];

  // Status configuration
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    assigned: { label: 'Assigned', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: User },
    in_progress: { label: 'In Progress', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Activity },
    paused: { label: 'Paused', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Pause },
    completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: Ban },
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || Clock;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-100 text-gray-700';
  };

  const getTypeIcon = (type) => {
    const found = listTypes.find(t => t.id === type);
    const Icon = found?.icon || Package;
    return Icon;
  };

  const filteredLists = pickingLists.filter(list => {
    const matchesStatus = selectedStatus === 'all' || list.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || list.priority === selectedPriority;
    const matchesType = selectedType === 'all' || list.type === selectedType;
    const matchesZone = selectedZone === 'all' || list.zone === selectedZone;
    const matchesPicker = selectedPicker === 'all' || list.picker === selectedPicker;
    const matchesSearch = list.listNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (list.customer && list.customer.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         list.orderIds?.some(id => id.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesPriority && matchesType && matchesZone && matchesPicker && matchesSearch;
  });

  const stats = {
    total: pickingLists.length,
    pending: pickingLists.filter(l => l.status === 'pending').length,
    assigned: pickingLists.filter(l => l.status === 'assigned').length,
    inProgress: pickingLists.filter(l => l.status === 'in_progress').length,
    paused: pickingLists.filter(l => l.status === 'paused').length,
    completed: pickingLists.filter(l => l.status === 'completed').length,
    totalItems: pickingLists.reduce((sum, l) => sum + l.totalItems, 0),
    pickedItems: pickingLists.reduce((sum, l) => sum + l.pickedItems, 0),
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Picking Lists</h1>
            <p className="text-black/50 mt-1">Manage and track order picking operations</p>
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
              onClick={() => setShowBatchDialog(true)}
            >
              <Copy size={16} />
              Batch Generate
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowOptimizeDialog(true)}
            >
              <Workflow size={16} />
              Optimize Routes
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create List
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-8 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Lists</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <ClipboardList size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Pending</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
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
                  <p className="text-xs text-black/50">Assigned</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.assigned}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <User size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">In Progress</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.inProgress}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Activity size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Paused</p>
                  <p className="text-xl font-bold text-orange-600 mt-1">{stats.paused}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Pause size={18} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Completed</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.completed}</p>
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
                  <p className="text-xs text-black/50">Total Items</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalItems}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-full">
                  <Package size={18} className="text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Picked</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.pickedItems}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <PackageCheck size={18} className="text-green-600" />
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
              placeholder="Search by list number, name, customer, or order ID..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="List Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {listTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map(zone => (
                <SelectItem key={zone.id} value={zone.name}>{zone.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPicker} onValueChange={setSelectedPicker}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Picker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pickers</SelectItem>
              {pickers.map(picker => (
                <SelectItem key={picker.id} value={picker.name}>{picker.name}</SelectItem>
              ))}
              <SelectItem value="unassigned">Unassigned</SelectItem>
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

      {/* Picking Lists Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredLists.map((list) => {
            const StatusIcon = statusConfig[list.status]?.icon || Clock;
            const TypeIcon = getTypeIcon(list.type);
            
            return (
              <Card key={list.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(list.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {list.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(list.priority))}>
                            {list.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                            <TypeIcon className="mr-1" size={10} />
                            {list.type}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{list.listNumber}</h3>
                        <p className="text-sm text-black mt-1">{list.name}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedList(list);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {list.status === 'pending' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedList(list);
                              setShowAssignDialog(true);
                            }}>
                              <User className="mr-2 h-4 w-4" />
                              Assign Picker
                            </DropdownMenuItem>
                          )}
                          {list.status === 'assigned' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedList(list);
                              setShowStartDialog(true);
                            }}>
                              <Play className="mr-2 h-4 w-4" />
                              Start Picking
                            </DropdownMenuItem>
                          )}
                          {list.status === 'in_progress' && (
                            <>
                              <DropdownMenuItem onClick={() => {
                                setSelectedList(list);
                                setShowPauseDialog(true);
                              }}>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedList(list);
                                setShowCompleteDialog(true);
                              }}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Complete
                              </DropdownMenuItem>
                            </>
                          )}
                          {list.status === 'paused' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedList(list);
                              setShowResumeDialog(true);
                            }}>
                              <Play className="mr-2 h-4 w-4" />
                              Resume
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => {
                            setSelectedList(list);
                            setShowPrintDialog(true);
                          }}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print List
                          </DropdownMenuItem>
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
                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-black/50">Progress</span>
                        <span className="text-xs font-medium">{list.completion}%</span>
                      </div>
                      <Progress 
                        value={list.completion} 
                        className="h-2 bg-[#F5EEE9]"
                        style={{ 
                          '--progress-background': 
                            list.completion === 100 ? '#22c55e' :
                            list.completion > 50 ? '#3b82f6' :
                            '#eab308'
                        } }
                      />
                    </div>

                    {/* Items */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-center p-2 bg-[#F5EEE9]/30 rounded-lg">
                        <p className="text-xs text-black/50">Items</p>
                        <p className="text-lg font-bold text-black">{list.pickedItems}/{list.totalItems}</p>
                      </div>
                      <div className="text-center p-2 bg-[#F5EEE9]/30 rounded-lg">
                        <p className="text-xs text-black/50">Quantity</p>
                        <p className="text-lg font-bold text-blue-600">{list.pickedQuantity}/{list.totalQuantity}</p>
                      </div>
                    </div>

                    {/* Picker & Time */}
                    <div className="space-y-2 text-sm mb-3">
                      {list.picker && (
                        <div className="flex items-center justify-between">
                          <span className="text-black/50">Picker</span>
                          <div className="flex items-center gap-1">
                            <User size={12} className="text-black/50" />
                            <span className="font-medium">{list.picker}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Due</span>
                        <span className={cn(
                          "font-medium",
                          new Date(list.dueDate) < new Date() && list.status !== 'completed' ? 'text-red-600' : ''
                        )}>
                          {list.dueDate}
                        </span>
                      </div>
                      {list.status === 'in_progress' && (
                        <div className="flex items-center justify-between">
                          <span className="text-black/50">Time Left</span>
                          <span className="font-medium text-orange-600">{list.remainingTime} min</span>
                        </div>
                      )}
                    </div>

                    {/* Customer/Order Info */}
                    {list.customer && (
                      <div className="p-2 bg-blue-50 rounded-lg mb-2">
                        <p className="text-xs text-blue-700 truncate">Customer: {list.customer}</p>
                      </div>
                    )}

                    {/* Source/Destination */}
                    <div className="flex items-center justify-between text-xs text-black/50">
                      <span>{list.source}</span>
                      <ArrowRight size={10} className="text-red-600" />
                      <span>{list.destination}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {list.tags.slice(0, 2).map((tag) => (
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
                  <TableHead className="text-black/50">List #</TableHead>
                  <TableHead className="text-black/50">Name</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Picker</TableHead>
                  <TableHead className="text-black/50">Zone</TableHead>
                  <TableHead className="text-black/50 text-right">Items</TableHead>
                  <TableHead className="text-black/50 text-right">Progress</TableHead>
                  <TableHead className="text-black/50">Due Date</TableHead>
                  <TableHead className="text-black/50">Customer/Order</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLists.map((list) => (
                  <TableRow key={list.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">{list.listNumber}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{list.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9] capitalize">
                        {list.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(list.status))}>
                        {list.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(list.priority))}>
                        {list.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{list.picker || '—'}</TableCell>
                    <TableCell>{list.zone}</TableCell>
                    <TableCell className="text-right">{list.pickedItems}/{list.totalItems}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2">
                        <Progress value={list.completion} className="w-16 h-2 bg-[#F5EEE9]" />
                        <span className="text-xs">{list.completion}%</span>
                      </div>
                    </TableCell>
                    <TableCell className={cn(
                      new Date(list.dueDate) < new Date() && list.status !== 'completed' ? 'text-red-600 font-medium' : ''
                    )}>
                      {list.dueDate}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {list.customer || list.orderIds?.join(', ') || '-'}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedList(list);
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
                Showing {filteredLists.length} of {pickingLists.length} lists
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

      {/* Create List Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Picking List</DialogTitle>
            <DialogDescription>
              Generate a new picking list from orders
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="orders">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="orders">Select Orders</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="assign">Assignment</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                <div className="space-y-2">
                  <Label>Order Selection</Label>
                  <RadioGroup defaultValue="multiple" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single">Single Order</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="multiple" id="multiple" />
                      <Label htmlFor="multiple">Multiple Orders</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="batch" id="batch" />
                      <Label htmlFor="batch">Batch</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Select Orders</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose orders" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ORD-1234">ORD-1234 - John Smith</SelectItem>
                      <SelectItem value="ORD-1235">ORD-1235 - Acme Corp</SelectItem>
                      <SelectItem value="ORD-1236">ORD-1236 - Store A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>List Type</Label>
                  <Select defaultValue="customer_order">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {listTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="items" className="space-y-4">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#F5EEE9] bg-[#F5EEE9]/30">
                        <TableHead className="w-8"><Checkbox /></TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead>Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell>SKU-001</TableCell>
                        <TableCell>Premium Wireless Headphones</TableCell>
                        <TableCell className="text-right">5</TableCell>
                        <TableCell>A-01-01</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell>SKU-002</TableCell>
                        <TableCell>Organic Protein Powder</TableCell>
                        <TableCell className="text-right">8</TableCell>
                        <TableCell>A-01-04</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="assign" className="space-y-4">
                <div className="space-y-2">
                  <Label>Assign Picker</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select picker" />
                    </SelectTrigger>
                    <SelectContent>
                      {pickers.map(picker => (
                        <SelectItem key={picker.id} value={picker.name}>{picker.name}</SelectItem>
                      ))}
                      <SelectItem value="unassigned">Unassigned</SelectItem>
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
                  <Label>Scheduled Date</Label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional notes" rows={3} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* List Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Picking List Details</DialogTitle>
          </DialogHeader>

          {selectedList && (
            <div className="py-4">
              <Tabs defaultValue="items">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="items">Items</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="items">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Pick Items</h3>
                      <Badge className={cn("text-xs", getStatusColor(selectedList.status))}>
                        {selectedList.status.replace('_', ' ')}
                      </Badge>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow className="border-[#F5EEE9]">
                          <TableHead>Status</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead className="text-right">Qty</TableHead>
                          <TableHead className="text-right">Picked</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedList.items.map((item) => (
                          <TableRow key={item.id} className="border-[#F5EEE9]">
                            <TableCell>
                              {item.status === 'picked' && <CheckCircle size={14} className="text-green-600" />}
                              {item.status === 'pending' && <Clock size={14} className="text-yellow-600" />}
                              {item.status === 'skipped' && <AlertTriangle size={14} className="text-orange-600" />}
                            </TableCell>
                            <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{item.picked}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="progress">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <p className="text-xs text-black/50">Overall Progress</p>
                          <p className="text-2xl font-bold">{selectedList.completion}%</p>
                        </CardContent>
                      </Card>
                      <Card className="border-[#F5EEE9]">
                        <CardContent className="p-3">
                          <p className="text-xs text-black/50">Accuracy</p>
                          <p className="text-2xl font-bold text-green-600">{selectedList.accuracy}%</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-[#F5EEE9] rounded-lg text-center">
                        <p className="text-xs text-black/50">Items</p>
                        <p className="text-lg font-bold">{selectedList.pickedItems}/{selectedList.totalItems}</p>
                      </div>
                      <div className="p-2 bg-[#F5EEE9] rounded-lg text-center">
                        <p className="text-xs text-black/50">Quantity</p>
                        <p className="text-lg font-bold">{selectedList.pickedQuantity}/{selectedList.totalQuantity}</p>
                      </div>
                      <div className="p-2 bg-[#F5EEE9] rounded-lg text-center">
                        <p className="text-xs text-black/50">Skipped</p>
                        <p className="text-lg font-bold text-orange-600">{selectedList.skippedItems}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black/50">Time Progress</span>
                        <span className="text-sm font-medium">
                          {selectedList.elapsedTime}/{selectedList.estimatedTime} min
                        </span>
                      </div>
                      <Progress 
                        value={(selectedList.elapsedTime / selectedList.estimatedTime) * 100} 
                        className="h-2 bg-[#F5EEE9]"
                      />
                    </div>

                    {selectedList.picker && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-700">Picker: {selectedList.picker}</p>
                        {selectedList.verifier && (
                          <p className="text-xs text-blue-700 mt-1">Verifier: {selectedList.verifier}</p>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="orders">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Source Orders</h3>
                    {selectedList.orderIds?.map((orderId) => (
                      <div key={orderId} className="p-3 border border-[#F5EEE9] rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-sm">{orderId}</p>
                          <Badge variant="outline" className="border-[#F5EEE9]">Included</Badge>
                        </div>
                      </div>
                    ))}

                    {selectedList.customer && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-700">Customer: {selectedList.customer}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-black/50">Source</p>
                        <p className="font-medium">{selectedList.source}</p>
                      </div>
                      <div>
                        <p className="text-black/50">Destination</p>
                        <p className="font-medium">{selectedList.destination}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedList.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-0.5">
                            {item.action === 'Created' && <Plus size={12} className="text-green-600" />}
                            {item.action === 'Assigned' && <User size={12} className="text-blue-600" />}
                            {item.action === 'Started' && <Play size={12} className="text-purple-600" />}
                            {item.action === 'Paused' && <Pause size={12} className="text-orange-600" />}
                            {item.action === 'Completed' && <CheckCircle size={12} className="text-green-600" />}
                            {item.action === 'Verified' && <CheckCircle size={12} className="text-green-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{item.action}</p>
                              <span className="text-[10px] text-black/50">{item.timestamp}</span>
                            </div>
                            <p className="text-[10px] text-black/50">By: {item.user}</p>
                            {item.reason && <p className="text-[10px] text-black/70">Reason: {item.reason}</p>}
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
            {selectedList?.status === 'pending' && (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowAssignDialog(true);
              }}>
                <User className="mr-2 h-4 w-4" />
                Assign
              </Button>
            )}
            {selectedList?.status === 'assigned' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                setShowDetailsDialog(false);
                setShowStartDialog(true);
              }}>
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Picker Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Assign Picker</DialogTitle>
            <DialogDescription>
              Assign a picker to this picking list
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedList?.listNumber}</p>
              <p className="text-xs text-black/50">{selectedList?.name}</p>
            </div>

            <div className="space-y-2">
              <Label>Select Picker</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose picker" />
                </SelectTrigger>
                <SelectContent>
                  {pickers.map(picker => (
                    <SelectItem key={picker.id} value={picker.name}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[8px] bg-red-600 text-white">
                            {picker.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span>{picker.name}</span>
                        <span className="text-xs text-black/50">({picker.activeLists} active)</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select defaultValue={selectedList?.priority}>
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
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complete Dialog */}
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Complete Picking List</DialogTitle>
            <DialogDescription>
              Mark this picking list as completed
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-[#F5EEE9] rounded-lg">
              <p className="font-medium">{selectedList?.listNumber}</p>
              <p className="text-xs text-black/50">{selectedList?.name}</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-xs text-black/50">Picked</p>
                  <p className="text-sm font-medium">{selectedList?.pickedItems}/{selectedList?.totalItems} items</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Quantity</p>
                  <p className="text-sm font-medium">{selectedList?.pickedQuantity}/{selectedList?.totalQuantity}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Verification</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select verifier" />
                </SelectTrigger>
                <SelectContent>
                  {pickers.map(picker => (
                    <SelectItem key={picker.id} value={picker.name}>{picker.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Any issues or notes" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Complete List
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
            <TooltipContent side="left">Create List</TooltipContent>
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
                onClick={() => setShowOptimizeDialog(true)}
              >
                <Route size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Optimize Routes</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PickingListsPage;