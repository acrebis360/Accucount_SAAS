// app/dashboard/shipping-management/page.js
'use client';

import { useState } from 'react';
import { 
  Truck,
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
  Grid,
  List,
  Ban,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Printer,
  User,
  Users,
  MapPin,
  DollarSign,
  ArrowRight,

  Scale,
  ToggleLeftIcon,
  ToggleRightIcon,
  ArrowLeftRight as ArrowLeftRightIcon,
  ArrowUpDown as ArrowUpDownIcon,
  MoveHorizontal as MoveHorizontalIcon,
  MoveVertical as MoveVerticalIcon,
  GripVertical as GripVerticalIcon,
  GripHorizontal as GripHorizontalIcon,
  TruckIcon as TruckIconCustom,
  PackageIcon as PackageIconCustom,
  WeightIcon,
  RulerIcon,
  PackagePlusIcon as PackagePlusIconCustom,
  PackageMinusIcon as PackageMinusIconCustom,
  PackageCheckIcon as PackageCheckIconCustom,
  PackageXIcon as PackageXIconCustom,
  PackageSearchIcon as PackageSearchIconCustom,
  CrateIcon as CrateIconCustom,
  PalletIcon as PalletIconCustom,
  ContainerIcon as ContainerIconCustom,

  PrinterIcon as PrinterIconCustom,
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
  
  TrackingIcon as TrackingIconCustom
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

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ShippingManagementPage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCarrier, setSelectedCarrier] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showTrackDialog, setShowTrackDialog] = useState(false);
  const [showLabelDialog, setShowLabelDialog] = useState(false);
  const [showManifestDialog, setShowManifestDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRateDialog, setShowRateDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showCarrierDialog, setShowCarrierDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample shipments data
  const shipments = [
    {
      id: 'SHP-001',
      shipmentNumber: 'SHP-2024-001',
      trackingNumber: '1Z999AA10123456784',
      reference: 'ORD-1234',
      customer: 'John Smith',
      customerId: 'CUST-001',
      status: 'in_transit',
      carrier: 'UPS',
      carrierId: 'CR-001',
      service: 'Ground',
      priority: 'high',
      origin: 'Warehouse A',
      originAddress: '123 Industrial Blvd, Atlanta, GA 30301',
      destination: 'Customer',
      destinationAddress: '456 Oak St, Miami, FL 33101',
      destinationCity: 'Miami',
      destinationState: 'FL',
      destinationZip: '33101',
      destinationCountry: 'USA',
      shipDate: '2024-03-15',
      estimatedDelivery: '2024-03-18',
      actualDelivery: null,
      shipTime: '14:30',
      weight: 15.5,
      weightUnit: 'kg',
      volume: 2.3,
      volumeUnit: 'cu ft',
      packageCount: 3,
      palletCount: 0,
      items: [
        { id: 1, sku: 'SKU-001', name: 'Premium Wireless Headphones', quantity: 2 },
        { id: 2, sku: 'SKU-003', name: 'Industrial Lubricant', quantity: 1 },
      ],
      freightClass: 'Class 70',
      nmfc: '123456',
      declaredValue: 450.00,
      codAmount: null,
      insurance: 500.00,
      shippingCost: 24.50,
      fuelSurcharge: 2.45,
      totalCost: 26.95,
      paymentMethod: 'Prepaid',
      billedTo: 'Shipper',
      documents: ['label.pdf', 'manifest.pdf'],
      currentLocation: 'Columbia, SC',
      lastScan: '2024-03-16 08:30',
      lastScanLocation: 'Columbia, SC Hub',
      estimatedArrival: '2024-03-18 16:00',
      trackingHistory: [
        { timestamp: '2024-03-16 08:30', location: 'Columbia, SC Hub', status: 'Arrived at Hub' },
        { timestamp: '2024-03-15 22:15', location: 'Atlanta, GA', status: 'Departed' },
        { timestamp: '2024-03-15 14:30', location: 'Warehouse A', status: 'Picked Up' },
      ],
      tags: ['express', 'signature-required'],
      notes: 'Customer requested signature',
      createdBy: 'Shipping Clerk',
      createdAt: '2024-03-15',
      history: [
        { timestamp: '2024-03-15 14:30', action: 'Created', user: 'Shipping Clerk' },
        { timestamp: '2024-03-15 14:35', action: 'Label Generated', user: 'System' },
        { timestamp: '2024-03-15 15:00', action: 'Picked Up', user: 'UPS Driver' },
      ],
    },
    {
      id: 'SHP-002',
      shipmentNumber: 'SHP-2024-002',
      trackingNumber: '9405510200829072356789',
      reference: 'ORD-1240',
      customer: 'Acme Corp',
      customerId: 'CUST-010',
      status: 'pending',
      carrier: 'USPS',
      carrierId: 'CR-002',
      service: 'Priority Mail',
      priority: 'medium',
      origin: 'Warehouse A',
      originAddress: '123 Industrial Blvd, Atlanta, GA 30301',
      destination: 'Business',
      destinationAddress: '789 Corporate Dr, Dallas, TX 75201',
      destinationCity: 'Dallas',
      destinationState: 'TX',
      destinationZip: '75201',
      destinationCountry: 'USA',
      shipDate: '2024-03-16',
      estimatedDelivery: '2024-03-19',
      actualDelivery: null,
      shipTime: '09:00',
      weight: 8.2,
      weightUnit: 'kg',
      volume: 1.5,
      volumeUnit: 'cu ft',
      packageCount: 1,
      palletCount: 0,
      items: [
        { id: 1, sku: 'SKU-002', name: 'Organic Protein Powder', quantity: 5 },
      ],
      declaredValue: 175.00,
      insurance: 200.00,
      shippingCost: 12.75,
      totalCost: 12.75,
      paymentMethod: 'Prepaid',
      billedTo: 'Shipper',
      documents: [],
      currentLocation: null,
      lastScan: null,
      trackingHistory: [],
      tags: ['pending', 'label-needed'],
      notes: 'Awaiting pickup',
      createdBy: 'Order System',
      createdAt: '2024-03-16',
      history: [
        { timestamp: '2024-03-16 09:00', action: 'Created', user: 'Order System' },
      ],
    },
    {
      id: 'SHP-003',
      shipmentNumber: 'SHP-2024-003',
      trackingNumber: '794657894321',
      reference: 'ORD-1245',
      customer: 'Tech Solutions Inc',
      customerId: 'CUST-015',
      status: 'delivered',
      carrier: 'FedEx',
      carrierId: 'CR-003',
      service: 'Express Saver',
      priority: 'high',
      origin: 'Warehouse A',
      originAddress: '123 Industrial Blvd, Atlanta, GA 30301',
      destination: 'Business',
      destinationAddress: '321 Tech Park, San Jose, CA 95101',
      destinationCity: 'San Jose',
      destinationState: 'CA',
      destinationZip: '95101',
      destinationCountry: 'USA',
      shipDate: '2024-03-14',
      estimatedDelivery: '2024-03-16',
      actualDelivery: '2024-03-16 14:30',
      shipTime: '10:00',
      weight: 22.0,
      weightUnit: 'kg',
      volume: 4.2,
      volumeUnit: 'cu ft',
      packageCount: 2,
      palletCount: 0,
      items: [
        { id: 1, sku: 'SKU-004', name: 'Ergonomic Office Chair', quantity: 1 },
        { id: 2, sku: 'SKU-007', name: 'Smart LED TV 55"', quantity: 1 },
      ],
      declaredValue: 1250.00,
      insurance: 1500.00,
      shippingCost: 45.80,
      fuelSurcharge: 4.58,
      residentialSurcharge: 5.00,
      totalCost: 55.38,
      paymentMethod: 'Prepaid',
      billedTo: 'Shipper',
      documents: ['label.pdf', 'proof-of-delivery.pdf'],
      currentLocation: 'San Jose, CA',
      lastScan: '2024-03-16 14:30',
      lastScanLocation: 'San Jose, CA',
      deliveredTo: 'RECEPTION',
      signedBy: 'J. Smith',
      trackingHistory: [
        { timestamp: '2024-03-16 14:30', location: 'San Jose, CA', status: 'Delivered', recipient: 'J. Smith' },
        { timestamp: '2024-03-16 10:15', location: 'Oakland, CA', status: 'Out for Delivery' },
        { timestamp: '2024-03-16 06:30', location: 'Oakland, CA Hub', status: 'Arrived at Hub' },
        { timestamp: '2024-03-15 23:45', location: 'Memphis, TN', status: 'Departed' },
        { timestamp: '2024-03-14 10:00', location: 'Warehouse A', status: 'Picked Up' },
      ],
      tags: ['delivered', 'signature'],
      notes: 'Left with reception',
      createdBy: 'Shipping Clerk',
      createdAt: '2024-03-14',
      deliveredBy: 'FedEx Driver',
      deliveryTime: '14:30',
      history: [
        { timestamp: '2024-03-16 14:30', action: 'Delivered', user: 'FedEx Driver' },
        { timestamp: '2024-03-14 10:00', action: 'Created', user: 'Shipping Clerk' },
      ],
    },
    {
      id: 'SHP-004',
      shipmentNumber: 'SHP-2024-004',
      trackingNumber: '1Z87654321987654321',
      reference: 'ORD-1250',
      customer: 'Wholesale Distributors',
      customerId: 'CUST-020',
      status: 'out_for_delivery',
      carrier: 'UPS',
      carrierId: 'CR-001',
      service: 'Ground',
      priority: 'high',
      origin: 'Warehouse A',
      originAddress: '123 Industrial Blvd, Atlanta, GA 30301',
      destination: 'Business',
      destinationAddress: '567 Distribution Way, Chicago, IL 60601',
      destinationCity: 'Chicago',
      destinationState: 'IL',
      destinationZip: '60601',
      destinationCountry: 'USA',
      shipDate: '2024-03-15',
      estimatedDelivery: '2024-03-17',
      actualDelivery: null,
      shipTime: '11:30',
      weight: 350.0,
      weightUnit: 'kg',
      volume: 45.0,
      volumeUnit: 'cu ft',
      packageCount: 5,
      palletCount: 2,
      items: [
        { id: 1, sku: 'SKU-004', name: 'Ergonomic Office Chair', quantity: 4 },
        { id: 2, sku: 'SKU-005', name: 'Cotton T-Shirt (White, L)', quantity: 100 },
        { id: 3, sku: 'SKU-006', name: 'Canned Organic Soup', quantity: 48 },
      ],
      freightClass: 'Class 60',
      nmfc: '654321',
      declaredValue: 3500.00,
      insurance: 4000.00,
      shippingCost: 185.50,
      fuelSurcharge: 18.55,
      liftgateSurcharge: 15.00,
      residentialSurcharge: 0,
      totalCost: 219.05,
      paymentMethod: 'Prepaid',
      billedTo: 'Shipper',
      documents: ['label.pdf', 'manifest.pdf', 'bol.pdf'],
      currentLocation: 'Gary, IN',
      lastScan: '2024-03-17 08:15',
      lastScanLocation: 'Gary, IN Facility',
      estimatedArrival: '2024-03-17 14:00',
      trackingHistory: [
        { timestamp: '2024-03-17 08:15', location: 'Gary, IN Facility', status: 'Out for Delivery' },
        { timestamp: '2024-03-17 06:30', location: 'Gary, IN Hub', status: 'Arrived at Hub' },
        { timestamp: '2024-03-16 23:45', location: 'Indianapolis, IN', status: 'Departed' },
        { timestamp: '2024-03-15 11:30', location: 'Warehouse A', status: 'Picked Up' },
      ],
      tags: ['palletized', 'liftgate-required'],
      notes: 'Liftgate required for delivery',
      createdBy: 'Shipping Manager',
      createdAt: '2024-03-15',
      history: [
        { timestamp: '2024-03-17 08:15', action: 'Out for Delivery', user: 'UPS' },
        { timestamp: '2024-03-15 11:30', action: 'Created', user: 'Shipping Manager' },
      ],
    },
    {
      id: 'SHP-005',
      shipmentNumber: 'SHP-2024-005',
      trackingNumber: '9205590123456789012345',
      reference: 'ORD-1255',
      customer: 'Retail Store B',
      customerId: 'CUST-030',
      status: 'label_created',
      carrier: 'USPS',
      carrierId: 'CR-002',
      service: 'Priority Mail Express',
      priority: 'urgent',
      origin: 'Warehouse A',
      originAddress: '123 Industrial Blvd, Atlanta, GA 30301',
      destination: 'Store',
      destinationAddress: '890 Retail Ave, Los Angeles, CA 90001',
      destinationCity: 'Los Angeles',
      destinationState: 'CA',
      destinationZip: '90001',
      destinationCountry: 'USA',
      shipDate: '2024-03-17',
      estimatedDelivery: '2024-03-18',
      actualDelivery: null,
      shipTime: '09:30',
      weight: 5.8,
      weightUnit: 'kg',
      volume: 1.2,
      volumeUnit: 'cu ft',
      packageCount: 1,
      palletCount: 0,
      items: [
        { id: 1, sku: 'SKU-008', name: 'First Aid Kit', quantity: 10 },
      ],
      declaredValue: 325.00,
      insurance: 350.00,
      shippingCost: 28.50,
      totalCost: 28.50,
      paymentMethod: 'Prepaid',
      billedTo: 'Shipper',
      documents: ['label.pdf'],
      currentLocation: null,
      lastScan: null,
      trackingHistory: [],
      tags: ['express', 'urgent'],
      notes: 'Express shipping required',
      createdBy: 'Store Manager',
      createdAt: '2024-03-17',
      history: [
        { timestamp: '2024-03-17 09:30', action: 'Label Created', user: 'System' },
        { timestamp: '2024-03-17 09:25', action: 'Created', user: 'Store Manager' },
      ],
    },
    {
      id: 'SHP-006',
      shipmentNumber: 'SHP-2024-006',
      trackingNumber: '794657894322',
      reference: 'ORD-1260',
      customer: 'Healthcare Supply Co',
      customerId: 'CUST-040',
      status: 'exception',
      carrier: 'FedEx',
      carrierId: 'CR-003',
      service: 'Ground',
      priority: 'high',
      origin: 'Warehouse A',
      originAddress: '123 Industrial Blvd, Atlanta, GA 30301',
      destination: 'Business',
      destinationAddress: '123 Medical Plaza, Boston, MA 02101',
      destinationCity: 'Boston',
      destinationState: 'MA',
      destinationZip: '02101',
      destinationCountry: 'USA',
      shipDate: '2024-03-14',
      estimatedDelivery: '2024-03-16',
      actualDelivery: null,
      shipTime: '13:00',
      weight: 12.5,
      weightUnit: 'kg',
      volume: 2.8,
      volumeUnit: 'cu ft',
      packageCount: 1,
      palletCount: 0,
      items: [
        { id: 1, sku: 'SKU-009', name: 'Fresh Dairy Milk', quantity: 20 },
      ],
      exception: 'Address correction needed',
      exceptionCode: 'EX-001',
      exceptionDate: '2024-03-16',
      declaredValue: 85.00,
      insurance: 100.00,
      shippingCost: 18.75,
      totalCost: 18.75,
      paymentMethod: 'Prepaid',
      billedTo: 'Shipper',
      documents: ['label.pdf'],
      currentLocation: 'Hartford, CT',
      lastScan: '2024-03-16 14:20',
      lastScanLocation: 'Hartford, CT',
      estimatedResolution: '2024-03-18',
      trackingHistory: [
        { timestamp: '2024-03-16 14:20', location: 'Hartford, CT', status: 'Exception - Address Issue' },
        { timestamp: '2024-03-16 08:30', location: 'New York, NY', status: 'Departed' },
        { timestamp: '2024-03-15 23:45', location: 'Newark, NJ', status: 'Arrived' },
        { timestamp: '2024-03-14 13:00', location: 'Warehouse A', status: 'Picked Up' },
      ],
      tags: ['exception', 'address-issue'],
      notes: 'Customer contacted for correct address',
      createdBy: 'Shipping Clerk',
      createdAt: '2024-03-14',
      history: [
        { timestamp: '2024-03-16 14:20', action: 'Exception', user: 'FedEx', reason: 'Address correction needed' },
        { timestamp: '2024-03-14 13:00', action: 'Created', user: 'Shipping Clerk' },
      ],
    },
    {
      id: 'SHP-007',
      shipmentNumber: 'SHP-2024-007',
      trackingNumber: '1Z55555555123456784',
      reference: 'ORD-1265',
      customer: 'Construction Supply Co',
      customerId: 'CUST-050',
      status: 'pending_pickup',
      carrier: 'UPS',
      carrierId: 'CR-001',
      service: 'Ground',
      priority: 'medium',
      origin: 'Warehouse A',
      originAddress: '123 Industrial Blvd, Atlanta, GA 30301',
      destination: 'Job Site',
      destinationAddress: '456 Construction Way, Denver, CO 80201',
      destinationCity: 'Denver',
      destinationState: 'CO',
      destinationZip: '80201',
      destinationCountry: 'USA',
      shipDate: '2024-03-17',
      estimatedDelivery: '2024-03-20',
      actualDelivery: null,
      shipTime: '10:00',
      weight: 450.0,
      weightUnit: 'kg',
      volume: 60.0,
      volumeUnit: 'cu ft',
      packageCount: 8,
      palletCount: 3,
      items: [
        { id: 1, sku: 'SKU-010', name: 'Industrial Lubricant - Grade A', quantity: 10 },
        { id: 2, sku: 'SKU-011', name: 'Construction Tools Set', quantity: 5 },
      ],
      freightClass: 'Class 65',
      nmfc: '789012',
      declaredValue: 5200.00,
      insurance: 6000.00,
      shippingCost: 245.00,
      fuelSurcharge: 24.50,
      liftgateSurcharge: 15.00,
      residentialSurcharge: 15.00,
      totalCost: 299.50,
      paymentMethod: 'Prepaid',
      billedTo: 'Shipper',
      documents: ['label.pdf', 'bol.pdf'],
      currentLocation: null,
      lastScan: null,
      pickupScheduled: '2024-03-17 14:00',
      trackingHistory: [],
      tags: ['palletized', 'liftgate', 'construction'],
      notes: 'Awaiting carrier pickup',
      createdBy: 'Shipping Manager',
      createdAt: '2024-03-17',
      history: [
        { timestamp: '2024-03-17 10:00', action: 'Created', user: 'Shipping Manager' },
      ],
    },
    {
      id: 'SHP-008',
      shipmentNumber: 'SHP-2024-008',
      trackingNumber: '9205590123456789012346',
      reference: 'ORD-1270',
      customer: 'Online Customer - Jane Doe',
      customerId: 'CUST-060',
      status: 'cancelled',
      carrier: 'USPS',
      carrierId: 'CR-002',
      service: 'Priority Mail',
      priority: 'low',
      origin: 'Warehouse A',
      originAddress: '123 Industrial Blvd, Atlanta, GA 30301',
      destination: 'Residence',
      destinationAddress: '789 Home St, Phoenix, AZ 85001',
      destinationCity: 'Phoenix',
      destinationState: 'AZ',
      destinationZip: '85001',
      destinationCountry: 'USA',
      shipDate: '2024-03-15',
      estimatedDelivery: '2024-03-18',
      actualDelivery: null,
      cancelledDate: '2024-03-16',
      cancellationReason: 'Customer cancelled order',
      weight: 3.2,
      volume: 0.8,
      packageCount: 1,
      items: [
        { id: 1, sku: 'SKU-012', name: 'Book - Inventory Management', quantity: 1 },
      ],
      declaredValue: 45.00,
      insurance: 0,
      shippingCost: 8.50,
      totalCost: 8.50,
      paymentMethod: 'Prepaid',
      billedTo: 'Shipper',
      documents: [],
      tags: ['cancelled'],
      notes: 'Refund processed',
      createdBy: 'Order System',
      createdAt: '2024-03-15',
      cancelledBy: 'Customer Service',
      history: [
        { timestamp: '2024-03-16 11:30', action: 'Cancelled', user: 'Customer Service', reason: 'Customer cancelled order' },
        { timestamp: '2024-03-15 14:00', action: 'Created', user: 'Order System' },
      ],
    },
    {
      id: 'SHP-009',
      shipmentNumber: 'SHP-2024-009',
      trackingNumber: '1Z12345678901234567',
      reference: 'ORD-1275',
      customer: 'Electronics Retailer',
      customerId: 'CUST-070',
      status: 'in_transit',
      carrier: 'UPS',
      carrierId: 'CR-001',
      service: '2nd Day Air',
      priority: 'high',
      origin: 'Warehouse A',
      originAddress: '123 Industrial Blvd, Atlanta, GA 30301',
      destination: 'Business',
      destinationAddress: '555 Tech Blvd, Seattle, WA 98101',
      destinationCity: 'Seattle',
      destinationState: 'WA',
      destinationZip: '98101',
      destinationCountry: 'USA',
      shipDate: '2024-03-16',
      estimatedDelivery: '2024-03-18',
      actualDelivery: null,
      shipTime: '15:30',
      weight: 65.0,
      weightUnit: 'kg',
      volume: 12.5,
      volumeUnit: 'cu ft',
      packageCount: 4,
      palletCount: 1,
      items: [
        { id: 1, sku: 'SKU-007', name: 'Smart LED TV 55"', quantity: 2 },
        { id: 2, sku: 'SKU-013', name: 'Soundbar System', quantity: 2 },
      ],
      declaredValue: 3200.00,
      insurance: 3500.00,
      shippingCost: 98.50,
      fuelSurcharge: 9.85,
      totalCost: 108.35,
      paymentMethod: 'Prepaid',
      billedTo: 'Shipper',
      documents: ['label.pdf', 'manifest.pdf'],
      currentLocation: 'North Platte, NE',
      lastScan: '2024-03-17 09:45',
      lastScanLocation: 'North Platte, NE Hub',
      estimatedArrival: '2024-03-18 12:00',
      trackingHistory: [
        { timestamp: '2024-03-17 09:45', location: 'North Platte, NE Hub', status: 'Arrived at Hub' },
        { timestamp: '2024-03-17 06:30', location: 'Omaha, NE', status: 'Departed' },
        { timestamp: '2024-03-16 23:15', location: 'St Louis, MO', status: 'Departed' },
        { timestamp: '2024-03-16 15:30', location: 'Warehouse A', status: 'Picked Up' },
      ],
      tags: ['electronics', 'fragile', 'signature-required'],
      notes: 'Fragile items - handle with care',
      createdBy: 'Shipping Clerk',
      createdAt: '2024-03-16',
      history: [
        { timestamp: '2024-03-16 15:30', action: 'Created', user: 'Shipping Clerk' },
      ],
    },
    {
      id: 'SHP-010',
      shipmentNumber: 'SHP-2024-010',
      trackingNumber: '9405510200829072356790',
      reference: 'ORD-1280',
      customer: 'Grocery Chain',
      customerId: 'CUST-080',
      status: 'delivered',
      carrier: 'USPS',
      carrierId: 'CR-002',
      service: 'Priority Mail',
      priority: 'medium',
      origin: 'Warehouse A',
      originAddress: '123 Industrial Blvd, Atlanta, GA 30301',
      destination: 'Store',
      destinationAddress: '888 Market St, San Francisco, CA 94101',
      destinationCity: 'San Francisco',
      destinationState: 'CA',
      destinationZip: '94101',
      destinationCountry: 'USA',
      shipDate: '2024-03-13',
      estimatedDelivery: '2024-03-15',
      actualDelivery: '2024-03-15 11:30',
      shipTime: '10:00',
      weight: 28.5,
      volume: 5.2,
      packageCount: 2,
      items: [
        { id: 1, sku: 'SKU-009', name: 'Fresh Dairy Milk', quantity: 24 },
        { id: 2, sku: 'SKU-014', name: 'Organic Eggs', quantity: 12 },
      ],
      declaredValue: 210.00,
      insurance: 250.00,
      shippingCost: 22.50,
      totalCost: 22.50,
      paymentMethod: 'Prepaid',
      billedTo: 'Shipper',
      documents: ['label.pdf', 'proof-of-delivery.pdf'],
      currentLocation: 'San Francisco, CA',
      lastScan: '2024-03-15 11:30',
      lastScanLocation: 'San Francisco, CA',
      deliveredTo: 'STORE',
      signedBy: 'M. Rodriguez',
      trackingHistory: [
        { timestamp: '2024-03-15 11:30', location: 'San Francisco, CA', status: 'Delivered', recipient: 'M. Rodriguez' },
        { timestamp: '2024-03-15 08:45', location: 'Oakland, CA', status: 'Out for Delivery' },
        { timestamp: '2024-03-15 06:30', location: 'Oakland, CA Hub', status: 'Arrived at Hub' },
        { timestamp: '2024-03-14 23:15', location: 'Sacramento, CA', status: 'Departed' },
        { timestamp: '2024-03-13 10:00', location: 'Warehouse A', status: 'Picked Up' },
      ],
      tags: ['delivered', 'perishable'],
      notes: 'Refrigerated items',
      createdBy: 'Shipping Clerk',
      createdAt: '2024-03-13',
      deliveredBy: 'USPS Carrier',
      deliveryTime: '11:30',
      history: [
        { timestamp: '2024-03-15 11:30', action: 'Delivered', user: 'USPS Carrier' },
        { timestamp: '2024-03-13 10:00', action: 'Created', user: 'Shipping Clerk' },
      ],
    },
  ];

  // Carriers
  const carriers = [
    { id: 'CR-001', name: 'UPS', service: ['Ground', '2nd Day Air', 'Next Day Air'], color: 'bg-brown-100 text-brown-700' },
    { id: 'CR-002', name: 'USPS', service: ['Priority Mail', 'Priority Mail Express', 'First Class'], color: 'bg-blue-100 text-blue-700' },
    { id: 'CR-003', name: 'FedEx', service: ['Ground', 'Express Saver', '2Day', 'Standard Overnight'], color: 'bg-purple-100 text-purple-700' },
    { id: 'CR-004', name: 'DHL', service: ['Express', 'Ground'], color: 'bg-yellow-100 text-yellow-700' },
    { id: 'CR-005', name: 'Freight Carrier', service: ['LTL', 'FTL'], color: 'bg-gray-100 text-gray-700' },
  ];

  // Status configuration
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
    label_created: { label: 'Label Created', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FileText },
    pending_pickup: { label: 'Pending Pickup', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Clock },
    in_transit: { label: 'In Transit', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Truck },
    out_for_delivery: { label: 'Out for Delivery', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Truck },
    delivered: { label: 'Delivered', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    exception: { label: 'Exception', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
    cancelled: { label: 'Cancelled', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
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

  const filteredShipments = shipments.filter(shipment => {
    const matchesStatus = selectedStatus === 'all' || shipment.status === selectedStatus;
    const matchesCarrier = selectedCarrier === 'all' || shipment.carrier === selectedCarrier;
    const matchesService = selectedService === 'all' || shipment.service === selectedService;
    const matchesDestination = selectedDestination === 'all' || shipment.destinationState === selectedDestination;
    const matchesSearch = shipment.shipmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.destinationCity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCarrier && matchesService && matchesDestination && matchesSearch;
  });

  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.status === 'pending' || s.status === 'label_created' || s.status === 'pending_pickup').length,
    inTransit: shipments.filter(s => s.status === 'in_transit' || s.status === 'out_for_delivery').length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
    exception: shipments.filter(s => s.status === 'exception').length,
    cancelled: shipments.filter(s => s.status === 'cancelled').length,
    totalPackages: shipments.reduce((sum, s) => sum + s.packageCount, 0),
    totalWeight: shipments.reduce((sum, s) => sum + s.weight, 0).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Shipping Management</h1>
            <p className="text-black/50 mt-1">Manage shipments, tracking, and carrier integration</p>
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
                  Print Manifest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowRateDialog(true)}
            >
              <DollarSign size={16} />
              Rate Calculator
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-[#F5EEE9]"
              onClick={() => setShowBatchDialog(true)}
            >
              <Copy size={16} />
              Batch Create
            </Button>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              Create Shipment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Shipments</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Truck size={18} className="text-red-600" />
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
                  <p className="text-xs text-black/50">In Transit</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.inTransit}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Truck size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Delivered</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.delivered}</p>
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
                  <p className="text-xs text-black/50">Exceptions</p>
                  <p className="text-xl font-bold text-red-600 mt-1">{stats.exception}</p>
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
                  <p className="text-xs text-black/50">Packages</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalPackages}</p>
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
                  <p className="text-xs text-black/50">Total Weight</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalWeight} kg</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Scale size={18} className="text-orange-600" />
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
              placeholder="Search by shipment #, tracking #, order #, customer..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="label_created">Label Created</SelectItem>
              <SelectItem value="pending_pickup">Pending Pickup</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="exception">Exception</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCarrier} onValueChange={setSelectedCarrier}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Carrier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Carriers</SelectItem>
              {carriers.map(carrier => (
                <SelectItem key={carrier.id} value={carrier.name}>{carrier.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="Ground">Ground</SelectItem>
              <SelectItem value="2nd Day Air">2nd Day Air</SelectItem>
              <SelectItem value="Next Day Air">Next Day Air</SelectItem>
              <SelectItem value="Priority Mail">Priority Mail</SelectItem>
              <SelectItem value="Priority Mail Express">Priority Mail Express</SelectItem>
              <SelectItem value="Express Saver">Express Saver</SelectItem>
              <SelectItem value="LTL">LTL</SelectItem>
              <SelectItem value="FTL">FTL</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDestination} onValueChange={setSelectedDestination}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="TX">Texas</SelectItem>
              <SelectItem value="FL">Florida</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="IL">Illinois</SelectItem>
              <SelectItem value="MA">Massachusetts</SelectItem>
              <SelectItem value="CO">Colorado</SelectItem>
              <SelectItem value="WA">Washington</SelectItem>
              <SelectItem value="AZ">Arizona</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[130px] border-[#F5EEE9]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
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

      {/* Shipments Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredShipments.map((shipment) => {
            const StatusIcon = statusConfig[shipment.status]?.icon || Package;
            
            return (
              <Card key={shipment.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("text-xs border-0", getStatusColor(shipment.status))}>
                            <StatusIcon className="mr-1" size={10} />
                            {shipment.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(shipment.priority))}>
                            {shipment.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-black">{shipment.shipmentNumber}</h3>
                        <p className="text-xs text-black/50">Ref: {shipment.reference}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedShipment(shipment);
                            setShowDetailsDialog(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedShipment(shipment);
                            setShowTrackDialog(true);
                          }}>
                            <MapPin className="mr-2 h-4 w-4" />
                            Track
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedShipment(shipment);
                            setShowLabelDialog(true);
                          }}>
                            <FileText className="mr-2 h-4 w-4" />
                            Print Label
                          </DropdownMenuItem>
                          {shipment.status !== 'delivered' && shipment.status !== 'cancelled' && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedShipment(shipment);
                              setShowCancelDialog(true);
                            }} className="text-red-600">
                              <Ban className="mr-2 h-4 w-4" />
                              Cancel Shipment
                            </DropdownMenuItem>
                          )}
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
                    {/* Customer & Carrier */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <User size={12} className="text-blue-600" />
                        <span className="text-xs font-medium">{shipment.customer}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                        {shipment.carrier} - {shipment.service}
                      </Badge>
                    </div>

                    {/* Tracking */}
                    {shipment.trackingNumber && (
                      <div className="mb-2 p-2 bg-[#F5EEE9]/50 rounded-lg">
                        <p className="text-[10px] text-black/50">Tracking #</p>
                        <p className="text-xs font-mono font-medium">{shipment.trackingNumber}</p>
                      </div>
                    )}

                    {/* Origin/Destination */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 text-center">
                        <p className="text-[10px] text-black/50">From</p>
                        <p className="text-xs font-medium truncate">Atlanta, GA</p>
                      </div>
                      <ArrowRight size={12} className="text-red-600" />
                      <div className="flex-1 text-center">
                        <p className="text-[10px] text-black/50">To</p>
                        <p className="text-xs font-medium truncate">{shipment.destinationCity}, {shipment.destinationState}</p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-2 mb-2 text-[10px]">
                      <div>
                        <span className="text-black/50">Shipped:</span>
                        <span className="ml-1 font-medium">{shipment.shipDate}</span>
                      </div>
                      <div>
                        <span className="text-black/50">Est Delivery:</span>
                        <span className="ml-1 font-medium">{shipment.estimatedDelivery}</span>
                      </div>
                    </div>

                    {/* Package Info */}
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Packages</p>
                        <p className="text-xs font-bold">{shipment.packageCount}</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Weight</p>
                        <p className="text-xs font-bold">{shipment.weight}kg</p>
                      </div>
                      <div className="text-center p-1 bg-[#F5EEE9]/30 rounded">
                        <p className="text-[8px] text-black/50">Value</p>
                        <p className="text-xs font-bold">${shipment.declaredValue}</p>
                      </div>
                    </div>

                    {/* Current Location (if in transit) */}
                    {shipment.currentLocation && (
                      <div className="mb-2 p-2 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-1">
                          <MapPin size={10} className="text-blue-600" />
                          <span className="text-[10px] text-blue-700">Current: {shipment.currentLocation}</span>
                        </div>
                        <p className="text-[8px] text-blue-600 mt-1">Last scan: {shipment.lastScan}</p>
                      </div>
                    )}

                    {/* Exception (if any) */}
                    {shipment.exception && (
                      <div className="mb-2 p-2 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-1">
                          <AlertTriangle size={10} className="text-red-600" />
                          <span className="text-[10px] text-red-700">Exception: {shipment.exception}</span>
                        </div>
                      </div>
                    )}

                    {/* Delivery Info (if delivered) */}
                    {shipment.status === 'delivered' && shipment.deliveredTo && (
                      <div className="mb-2 p-2 bg-green-50 rounded-lg">
                        <p className="text-[10px] text-green-700">Delivered to {shipment.deliveredTo}</p>
                        <p className="text-[8px] text-green-600">Signed by: {shipment.signedBy}</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {shipment.tags.slice(0, 2).map((tag) => (
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
                  <TableHead className="text-black/50">Shipment #</TableHead>
                  <TableHead className="text-black/50">Tracking #</TableHead>
                  <TableHead className="text-black/50">Reference</TableHead>
                  <TableHead className="text-black/50">Customer</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Carrier</TableHead>
                  <TableHead className="text-black/50">Destination</TableHead>
                  <TableHead className="text-black/50">Ship Date</TableHead>
                  <TableHead className="text-black/50">Est Delivery</TableHead>
                  <TableHead className="text-black/50 text-right">Packages</TableHead>
                  <TableHead className="text-black/50 text-right">Weight</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">{shipment.shipmentNumber}</TableCell>
                    <TableCell className="font-mono text-xs">{shipment.trackingNumber || '—'}</TableCell>
                    <TableCell className="font-mono text-xs">{shipment.reference}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{shipment.customer}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs border-0", getStatusColor(shipment.status))}>
                        {shipment.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getPriorityColor(shipment.priority))}>
                        {shipment.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{shipment.carrier}</TableCell>
                    <TableCell>{shipment.destinationState}</TableCell>
                    <TableCell>{shipment.shipDate}</TableCell>
                    <TableCell>{shipment.estimatedDelivery}</TableCell>
                    <TableCell className="text-right">{shipment.packageCount}</TableCell>
                    <TableCell className="text-right">{shipment.weight}kg</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedShipment(shipment);
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
                Showing {filteredShipments.length} of {shipments.length} shipments
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

      {/* Create Shipment Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create Shipment</DialogTitle>
            <DialogDescription>
              Create a new shipment and generate shipping label
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="details">Shipment Details</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Order Reference</Label>
                    <Input placeholder="e.g., ORD-1234" />
                  </div>
                  <div className="space-y-2">
                    <Label>Customer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CUST-001">John Smith</SelectItem>
                        <SelectItem value="CUST-010">Acme Corp</SelectItem>
                        <SelectItem value="CUST-015">Tech Solutions Inc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Carrier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select carrier" />
                      </SelectTrigger>
                      <SelectContent>
                        {carriers.map(carrier => (
                          <SelectItem key={carrier.id} value={carrier.name}>{carrier.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Service</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ground">Ground</SelectItem>
                        <SelectItem value="2nd Day Air">2nd Day Air</SelectItem>
                        <SelectItem value="Next Day Air">Next Day Air</SelectItem>
                        <SelectItem value="Priority Mail">Priority Mail</SelectItem>
                        <SelectItem value="Priority Mail Express">Priority Mail Express</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ship Date</Label>
                    <Input type="date" />
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
                </div>

                <div className="space-y-2">
                  <Label>Declared Value ($)</Label>
                  <Input type="number" placeholder="0.00" />
                </div>

                <div className="space-y-2">
                  <Label>Insurance ($)</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
              </TabsContent>

              <TabsContent value="packages" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Package Count</Label>
                    <Input type="number" placeholder="1" />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Weight (kg)</Label>
                    <Input type="number" step="0.1" placeholder="0.0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Pallet Count</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Volume (cu ft)</Label>
                    <Input type="number" step="0.1" placeholder="0.0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Freight Class</Label>
                  <Input placeholder="e.g., Class 70" />
                </div>

                <div className="space-y-2">
                  <Label>NMFC</Label>
                  <Input placeholder="e.g., 123456" />
                </div>
              </TabsContent>

              <TabsContent value="address" className="space-y-4">
                <div className="space-y-2">
                  <Label>Origin Address</Label>
                  <Textarea placeholder="Street address, city, state, zip" rows={2} />
                </div>

                <div className="space-y-2">
                  <Label>Destination Address</Label>
                  <Textarea placeholder="Street address, city, state, zip" rows={2} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Destination City</Label>
                    <Input placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <Label>Destination State</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Destination Zip</Label>
                    <Input placeholder="Zip code" />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input defaultValue="USA" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="options" className="space-y-4">
                <div className="space-y-2">
                  <Label>Special Instructions</Label>
                  <Textarea placeholder="e.g., Signature required, Liftgate needed" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup defaultValue="prepaid" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prepaid" id="prepaid" />
                      <Label htmlFor="prepaid">Prepaid</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="collect" id="collect" />
                      <Label htmlFor="collect">Collect</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="third-party" id="third-party" />
                      <Label htmlFor="third-party">Third Party</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Billed To</Label>
                  <Input placeholder="e.g., Shipper, Customer" />
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
              Create & Generate Label
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Shipment Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Shipment Details</DialogTitle>
          </DialogHeader>

          {selectedShipment && (
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tracking">Tracking</TabsTrigger>
                  <TabsTrigger value="items">Items</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedShipment.shipmentNumber}</h3>
                      <p className="text-sm text-black/50">Ref: {selectedShipment.reference}</p>
                    </div>
                    <Badge className={cn("text-sm border-0", getStatusColor(selectedShipment.status))}>
                      {selectedShipment.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Customer</p>
                      <p className="text-sm font-medium">{selectedShipment.customer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Carrier/Service</p>
                      <p className="text-sm font-medium">{selectedShipment.carrier} - {selectedShipment.service}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/50">Tracking Number</p>
                      <p className="text-sm font-mono">{selectedShipment.trackingNumber || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Priority</p>
                      <Badge className={cn("text-xs", getPriorityColor(selectedShipment.priority))}>
                        {selectedShipment.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-3 bg-[#F5EEE9] rounded-lg">
                    <div>
                      <p className="text-xs text-black/50">Ship Date</p>
                      <p className="text-sm font-medium">{selectedShipment.shipDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Est Delivery</p>
                      <p className="text-sm font-medium">{selectedShipment.estimatedDelivery}</p>
                    </div>
                    {selectedShipment.actualDelivery && (
                      <div>
                        <p className="text-xs text-black/50">Actual Delivery</p>
                        <p className="text-sm font-medium text-green-600">{selectedShipment.actualDelivery}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Origin</p>
                    <p className="text-sm">{selectedShipment.originAddress}</p>
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Destination</p>
                    <p className="text-sm">{selectedShipment.destinationAddress}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-black/50">Packages</p>
                      <p className="text-lg font-bold">{selectedShipment.packageCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Weight</p>
                      <p className="text-lg font-bold">{selectedShipment.weight}kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Value</p>
                      <p className="text-lg font-bold text-green-600">${selectedShipment.declaredValue}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-black/50">Shipping Cost</p>
                      <p className="text-sm font-medium">${selectedShipment.shippingCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/50">Total Cost</p>
                      <p className="text-sm font-medium">${selectedShipment.totalCost.toFixed(2)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-black/50">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedShipment.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedShipment.notes && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">{selectedShipment.notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="tracking">
                  <div className="space-y-4">
                    {selectedShipment.currentLocation && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-700">Current Location</p>
                        <p className="text-sm font-medium">{selectedShipment.currentLocation}</p>
                        <p className="text-xs text-blue-600 mt-1">Last scan: {selectedShipment.lastScan}</p>
                      </div>
                    )}

                    {selectedShipment.exception && (
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-xs text-red-700">Exception: {selectedShipment.exception}</p>
                        <p className="text-xs text-red-600 mt-1">Resolution ETA: {selectedShipment.estimatedResolution}</p>
                      </div>
                    )}

                    <ScrollArea className="h-64">
                      <div className="space-y-3">
                        {selectedShipment.trackingHistory.map((event, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="mt-1">
                              {event.status.includes('Delivered') && <CheckCircle size={12} className="text-green-600" />}
                              {event.status.includes('Out for Delivery') && <Truck size={12} className="text-orange-600" />}
                              {event.status.includes('Arrived') && <MapPin size={12} className="text-blue-600" />}
                              {event.status.includes('Departed') && <Truck size={12} className="text-purple-600" />}
                              {event.status.includes('Picked Up') && <Package size={12} className="text-green-600" />}
                              {event.status.includes('Exception') && <AlertTriangle size={12} className="text-red-600" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-medium">{event.status}</p>
                                <span className="text-[10px] text-black/50">{event.timestamp}</span>
                              </div>
                              <p className="text-[10px] text-black/50">{event.location}</p>
                              {event.recipient && <p className="text-[10px] text-green-600">Recipient: {event.recipient}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>

                <TabsContent value="items">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#F5EEE9]">
                        <TableHead className="text-black/50">SKU</TableHead>
                        <TableHead className="text-black/50">Product</TableHead>
                        <TableHead className="text-black/50 text-right">Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedShipment.items.map((item) => (
                        <TableRow key={item.id} className="border-[#F5EEE9]">
                          <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedShipment.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                          <div className="mt-0.5">
                            {item.action === 'Created' && <Plus size={12} className="text-green-600" />}
                            {item.action === 'Label Created' && <FileText size={12} className="text-blue-600" />}
                            {item.action === 'Picked Up' && <Package size={12} className="text-purple-600" />}
                            {item.action === 'Delivered' && <CheckCircle size={12} className="text-green-600" />}
                            {item.action === 'Exception' && <AlertTriangle size={12} className="text-red-600" />}
                            {item.action === 'Cancelled' && <Ban size={12} className="text-red-600" />}
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
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => {
              setShowDetailsDialog(false);
              setShowLabelDialog(true);
            }}>
              <FileText className="mr-2 h-4 w-4" />
              Print Label
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Track Dialog */}
      <Dialog open={showTrackDialog} onOpenChange={setShowTrackDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Track Shipment</DialogTitle>
            <DialogDescription>
              Real-time tracking information
            </DialogDescription>
          </DialogHeader>

          {selectedShipment && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-[#F5EEE9] rounded-lg">
                <p className="font-medium">{selectedShipment.shipmentNumber}</p>
                <p className="text-xs text-black/50">Tracking: {selectedShipment.trackingNumber}</p>
              </div>

              {selectedShipment.currentLocation && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">Current Location</p>
                  <p className="text-sm font-medium">{selectedShipment.currentLocation}</p>
                  <p className="text-xs text-blue-600 mt-1">Last scan: {selectedShipment.lastScan}</p>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-xs font-medium">Tracking History</h4>
                {selectedShipment.trackingHistory.map((event, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5">
                      {event.status.includes('Delivered') && <CheckCircle size={12} className="text-green-600" />}
                      {event.status.includes('Out for Delivery') && <Truck size={12} className="text-orange-600" />}
                      {event.status.includes('Arrived') && <MapPin size={12} className="text-blue-600" />}
                      {event.status.includes('Departed') && <Truck size={12} className="text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium">{event.status}</p>
                        <span className="text-[10px] text-black/50">{event.timestamp.split(' ')[1]}</span>
                      </div>
                      <p className="text-[10px] text-black/50">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-black/50">Estimated Delivery</p>
                  <p className="text-sm font-medium">{selectedShipment.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50">Carrier</p>
                  <p className="text-sm font-medium">{selectedShipment.carrier}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTrackDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
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
            <TooltipContent side="left">Create Shipment</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowRateDialog(true)}
              >
                <DollarSign size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Rate Calculator</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setShowBatchDialog(true)}
              >
                <Copy size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Batch Create</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ShippingManagementPage;