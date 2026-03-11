// app/dashboard/manage-store-group/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Store,
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
  Users,
  MapPin,
  Building2,
  ShoppingBag,
  Download,
  Upload,
  Printer,
  Grid,
  List,
  Ban,
  FileSpreadsheet,
  FileJson,
  File,
  Map,
  Globe,
  Printer as PrinterIcon,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ManageStoreGroupPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddStoresDialog, setShowAddStoresDialog] = useState(false);
  const [showRemoveStoresDialog, setShowRemoveStoresDialog] = useState(false);
  const [showAssignManagerDialog, setShowAssignManagerDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [showSplitDialog, setShowSplitDialog] = useState(false);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample store groups data
  const storeGroups = [
    {
      id: 'SG-001',
      name: 'North Region Stores',
      description: 'All stores in the northern region',
      type: 'regional',
      region: 'North',
      manager: 'John Doe',
      managerId: 1,
      storeCount: 8,
      totalInventory: 125000,
      totalValue: '$5.2M',
      status: 'active',
      priority: 'high',
      createdAt: '2024-01-15',
      createdBy: 'Admin',
      icon: MapPin,
      color: 'bg-blue-100 text-blue-700',
      tags: ['north', 'regional', 'high-volume'],
      stores: [
        { id: 'ST-001', name: 'Northgate Mall', location: 'Seattle, WA', type: 'mall', status: 'active' },
        { id: 'ST-002', name: 'Downtown Seattle', location: 'Seattle, WA', type: 'downtown', status: 'active' },
        { id: 'ST-003', name: 'Bellevue Square', location: 'Bellevue, WA', type: 'mall', status: 'active' },
        { id: 'ST-004', name: 'Redmond Town Center', location: 'Redmond, WA', type: 'shopping-center', status: 'active' },
        { id: 'ST-005', name: 'Everett Mall', location: 'Everett, WA', type: 'mall', status: 'active' },
        { id: 'ST-006', name: 'Lynnwood Plaza', location: 'Lynnwood, WA', type: 'plaza', status: 'inactive' },
        { id: 'ST-007', name: 'Bellingham Store', location: 'Bellingham, WA', type: 'standalone', status: 'active' },
        { id: 'ST-008', name: 'Olympia Center', location: 'Olympia, WA', type: 'downtown', status: 'active' },
      ],
      performance: {
        sales: '+15.2%',
        inventory: '98.5%',
        accuracy: '99.2%',
        satisfaction: '4.8/5',
      },
      recentActivity: '2024-03-15',
    },
    {
      id: 'SG-002',
      name: 'South Region Stores',
      description: 'All stores in the southern region',
      type: 'regional',
      region: 'South',
      manager: 'Jane Smith',
      managerId: 2,
      storeCount: 12,
      totalInventory: 185000,
      totalValue: '$7.8M',
      status: 'active',
      priority: 'high',
      createdAt: '2024-01-20',
      createdBy: 'Admin',
      icon: MapPin,
      color: 'bg-green-100 text-green-700',
      tags: ['south', 'regional', 'high-volume'],
      stores: [
        { id: 'ST-009', name: 'Houston Galleria', location: 'Houston, TX', type: 'mall', status: 'active' },
        { id: 'ST-010', name: 'Austin Downtown', location: 'Austin, TX', type: 'downtown', status: 'active' },
        { id: 'ST-011', name: 'Dallas NorthPark', location: 'Dallas, TX', type: 'mall', status: 'active' },
        { id: 'ST-012', name: 'San Antonio Riverwalk', location: 'San Antonio, TX', type: 'tourist', status: 'active' },
        { id: 'ST-013', name: 'Fort Worth Store', location: 'Fort Worth, TX', type: 'standalone', status: 'active' },
        { id: 'ST-014', name: 'Plano Center', location: 'Plano, TX', type: 'shopping-center', status: 'active' },
        { id: 'ST-015', name: 'Arlington Highlands', location: 'Arlington, TX', type: 'lifestyle', status: 'active' },
        { id: 'ST-016', name: 'Corpus Christi', location: 'Corpus Christi, TX', type: 'beach', status: 'active' },
        { id: 'ST-017', name: 'El Paso Store', location: 'El Paso, TX', type: 'standalone', status: 'active' },
        { id: 'ST-018', name: 'McAllen Mall', location: 'McAllen, TX', type: 'mall', status: 'inactive' },
        { id: 'ST-019', name: 'Lubbock Center', location: 'Lubbock, TX', type: 'plaza', status: 'active' },
        { id: 'ST-020', name: 'Amarillo Store', location: 'Amarillo, TX', type: 'standalone', status: 'active' },
      ],
      performance: {
        sales: '+12.8%',
        inventory: '97.2%',
        accuracy: '98.7%',
        satisfaction: '4.6/5',
      },
      recentActivity: '2024-03-14',
    },
    {
      id: 'SG-003',
      name: 'East Coast Premium',
      description: 'Premium stores on the east coast',
      type: 'premium',
      region: 'East',
      manager: 'Mike Johnson',
      managerId: 3,
      storeCount: 6,
      totalInventory: 95000,
      totalValue: '$8.2M',
      status: 'active',
      priority: 'high',
      createdAt: '2024-02-01',
      createdBy: 'Sarah Wilson',
      icon: Star,
      color: 'bg-purple-100 text-purple-700',
      tags: ['east', 'premium', 'luxury'],
      stores: [
        { id: 'ST-021', name: 'Fifth Avenue NYC', location: 'New York, NY', type: 'flagship', status: 'active' },
        { id: 'ST-022', name: 'Boston Commons', location: 'Boston, MA', type: 'downtown', status: 'active' },
        { id: 'ST-023', name: 'Philadelphia Center', location: 'Philadelphia, PA', type: 'downtown', status: 'active' },
        { id: 'ST-024', name: 'Washington DC Mall', location: 'Washington, DC', type: 'mall', status: 'active' },
        { id: 'ST-025', name: 'Baltimore Harbor', location: 'Baltimore, MD', type: 'tourist', status: 'active' },
        { id: 'ST-026', name: 'Pittsburgh Store', location: 'Pittsburgh, PA', type: 'standalone', status: 'active' },
      ],
      performance: {
        sales: '+22.5%',
        inventory: '99.1%',
        accuracy: '99.5%',
        satisfaction: '4.9/5',
      },
      recentActivity: '2024-03-13',
    },
    {
      id: 'SG-004',
      name: 'West Coast Flagships',
      description: 'Flagship stores on the west coast',
      type: 'flagship',
      region: 'West',
      manager: 'Sarah Wilson',
      managerId: 4,
      storeCount: 5,
      totalInventory: 85000,
      totalValue: '$7.5M',
      status: 'active',
      priority: 'high',
      createdAt: '2024-02-10',
      createdBy: 'John Doe',
      icon: Building2,
      color: 'bg-orange-100 text-orange-700',
      tags: ['west', 'flagship', 'high-end'],
      stores: [
        { id: 'ST-027', name: 'San Francisco Union Square', location: 'San Francisco, CA', type: 'flagship', status: 'active' },
        { id: 'ST-028', name: 'Los Angeles Beverly Hills', location: 'Los Angeles, CA', type: 'flagship', status: 'active' },
        { id: 'ST-029', name: 'San Diego Gaslamp', location: 'San Diego, CA', type: 'downtown', status: 'active' },
        { id: 'ST-030', name: 'Portland Downtown', location: 'Portland, OR', type: 'downtown', status: 'active' },
        { id: 'ST-031', name: 'Seattle Downtown', location: 'Seattle, WA', type: 'flagship', status: 'active' },
      ],
      performance: {
        sales: '+18.3%',
        inventory: '98.8%',
        accuracy: '99.0%',
        satisfaction: '4.7/5',
      },
      recentActivity: '2024-03-12',
    },
    {
      id: 'SG-005',
      name: 'Midwest Region',
      description: 'All stores in the midwest region',
      type: 'regional',
      region: 'Midwest',
      manager: 'Tom Brown',
      managerId: 5,
      storeCount: 10,
      totalInventory: 110000,
      totalValue: '$4.8M',
      status: 'active',
      priority: 'medium',
      createdAt: '2024-02-15',
      createdBy: 'Jane Smith',
      icon: MapPin,
      color: 'bg-yellow-100 text-yellow-700',
      tags: ['midwest', 'regional', 'growing'],
      stores: [
        { id: 'ST-032', name: 'Chicago Michigan Ave', location: 'Chicago, IL', type: 'flagship', status: 'active' },
        { id: 'ST-033', name: 'Detroit Store', location: 'Detroit, MI', type: 'downtown', status: 'active' },
        { id: 'ST-034', name: 'Cleveland Center', location: 'Cleveland, OH', type: 'downtown', status: 'active' },
        { id: 'ST-035', name: 'Columbus Mall', location: 'Columbus, OH', type: 'mall', status: 'active' },
        { id: 'ST-036', name: 'Indianapolis Store', location: 'Indianapolis, IN', type: 'standalone', status: 'active' },
        { id: 'ST-037', name: 'Milwaukee Center', location: 'Milwaukee, WI', type: 'downtown', status: 'active' },
        { id: 'ST-038', name: 'Minneapolis Mall', location: 'Minneapolis, MN', type: 'mall', status: 'active' },
        { id: 'ST-039', name: 'St Louis Store', location: 'St Louis, MO', type: 'standalone', status: 'inactive' },
        { id: 'ST-040', name: 'Kansas City Plaza', location: 'Kansas City, MO', type: 'plaza', status: 'active' },
        { id: 'ST-041', name: 'Omaha Store', location: 'Omaha, NE', type: 'standalone', status: 'active' },
      ],
      performance: {
        sales: '+8.5%',
        inventory: '96.2%',
        accuracy: '97.8%',
        satisfaction: '4.4/5',
      },
      recentActivity: '2024-03-11',
    },
    {
      id: 'SG-006',
      name: 'Outlet Stores',
      description: 'Discount outlet locations',
      type: 'outlet',
      region: 'National',
      manager: 'Lisa Chen',
      managerId: 6,
      storeCount: 15,
      totalInventory: 220000,
      totalValue: '$6.5M',
      status: 'active',
      priority: 'medium',
      createdAt: '2024-02-20',
      createdBy: 'Mike Johnson',
      icon: ShoppingBag,
      color: 'bg-pink-100 text-pink-700',
      tags: ['outlet', 'discount', 'clearance'],
      stores: [
        { id: 'ST-042', name: 'Woodbury Commons', location: 'Central Valley, NY', type: 'outlet', status: 'active' },
        { id: 'ST-043', name: 'Orlando Premium', location: 'Orlando, FL', type: 'outlet', status: 'active' },
        { id: 'ST-044', name: 'Las Vegas North', location: 'Las Vegas, NV', type: 'outlet', status: 'active' },
        { id: 'ST-045', name: 'San Francisco Premium', location: 'Livermore, CA', type: 'outlet', status: 'active' },
        { id: 'ST-046', name: 'Chicago Fashion Outlets', location: 'Rosemont, IL', type: 'outlet', status: 'active' },
        { id: 'ST-047', name: 'Miami International Mall', location: 'Miami, FL', type: 'outlet', status: 'active' },
        { id: 'ST-048', name: 'Dallas/Fort Worth', location: 'Dallas, TX', type: 'outlet', status: 'active' },
        { id: 'ST-049', name: 'Seattle Premium Outlets', location: 'Tulalip, WA', type: 'outlet', status: 'active' },
        { id: 'ST-050', name: 'Boston Wrentham', location: 'Wrentham, MA', type: 'outlet', status: 'inactive' },
        { id: 'ST-051', name: 'Philadelphia Premium', location: 'Limerick, PA', type: 'outlet', status: 'active' },
        { id: 'ST-052', name: 'Atlanta North Georgia', location: 'Dawsonville, GA', type: 'outlet', status: 'active' },
        { id: 'ST-053', name: 'Denver Premium', location: 'Denver, CO', type: 'outlet', status: 'active' },
        { id: 'ST-054', name: 'Phoenix Premium', location: 'Phoenix, AZ', type: 'outlet', status: 'active' },
        { id: 'ST-055', name: 'Portland Premium', location: 'Portland, OR', type: 'outlet', status: 'active' },
        { id: 'ST-056', name: 'Salt Lake City', location: 'Salt Lake City, UT', type: 'outlet', status: 'active' },
      ],
      performance: {
        sales: '+25.5%',
        inventory: '94.5%',
        accuracy: '96.8%',
        satisfaction: '4.3/5',
      },
      recentActivity: '2024-03-10',
    },
    {
      id: 'SG-007',
      name: 'International Stores',
      description: 'Stores outside the US',
      type: 'international',
      region: 'Global',
      manager: 'David Lee',
      managerId: 7,
      storeCount: 7,
      totalInventory: 65000,
      totalValue: '$5.8M',
      status: 'active',
      priority: 'high',
      createdAt: '2024-03-01',
      createdBy: 'Admin',
      icon: Globe,
      color: 'bg-teal-100 text-teal-700',
      tags: ['international', 'global', 'expansion'],
      stores: [
        { id: 'ST-057', name: 'Toronto Eaton Centre', location: 'Toronto, Canada', type: 'flagship', status: 'active' },
        { id: 'ST-058', name: 'Vancouver Store', location: 'Vancouver, Canada', type: 'downtown', status: 'active' },
        { id: 'ST-059', name: 'London Oxford Street', location: 'London, UK', type: 'flagship', status: 'active' },
        { id: 'ST-060', name: 'Paris Champs-Élysées', location: 'Paris, France', type: 'flagship', status: 'active' },
        { id: 'ST-061', name: 'Tokyo Ginza', location: 'Tokyo, Japan', type: 'flagship', status: 'active' },
        { id: 'ST-062', name: 'Sydney Store', location: 'Sydney, Australia', type: 'downtown', status: 'inactive' },
        { id: 'ST-063', name: 'Singapore Orchard', location: 'Singapore', type: 'flagship', status: 'active' },
      ],
      performance: {
        sales: '+30.2%',
        inventory: '97.8%',
        accuracy: '98.2%',
        satisfaction: '4.7/5',
      },
      recentActivity: '2024-03-09',
    },
    {
      id: 'SG-008',
      name: 'Downtown Locations',
      description: 'All downtown/city center stores',
      type: 'urban',
      region: 'National',
      manager: 'Emma Watson',
      managerId: 8,
      storeCount: 9,
      totalInventory: 98000,
      totalValue: '$6.2M',
      status: 'active',
      priority: 'medium',
      createdAt: '2024-02-25',
      createdBy: 'Sarah Wilson',
      icon: Building2,
      color: 'bg-indigo-100 text-indigo-700',
      tags: ['urban', 'downtown', 'city'],
      stores: [
        { id: 'ST-064', name: 'NYC Downtown', location: 'New York, NY', type: 'downtown', status: 'active' },
        { id: 'ST-065', name: 'LA Downtown', location: 'Los Angeles, CA', type: 'downtown', status: 'active' },
        { id: 'ST-066', name: 'Chicago Downtown', location: 'Chicago, IL', type: 'downtown', status: 'active' },
        { id: 'ST-067', name: 'Houston Downtown', location: 'Houston, TX', type: 'downtown', status: 'active' },
        { id: 'ST-068', name: 'Phoenix Downtown', location: 'Phoenix, AZ', type: 'downtown', status: 'active' },
        { id: 'ST-069', name: 'Philadelphia Downtown', location: 'Philadelphia, PA', type: 'downtown', status: 'active' },
        { id: 'ST-070', name: 'San Antonio Downtown', location: 'San Antonio, TX', type: 'downtown', status: 'active' },
        { id: 'ST-071', name: 'San Diego Downtown', location: 'San Diego, CA', type: 'downtown', status: 'inactive' },
        { id: 'ST-072', name: 'Dallas Downtown', location: 'Dallas, TX', type: 'downtown', status: 'active' },
      ],
      performance: {
        sales: '+12.5%',
        inventory: '97.0%',
        accuracy: '98.0%',
        satisfaction: '4.5/5',
      },
      recentActivity: '2024-03-08',
    },
  ];

  // All stores for store management
  const allStores = [
    { id: 'ST-001', name: 'Northgate Mall', location: 'Seattle, WA', type: 'mall', region: 'North', status: 'active', manager: 'John Doe' },
    { id: 'ST-002', name: 'Downtown Seattle', location: 'Seattle, WA', type: 'downtown', region: 'North', status: 'active', manager: 'John Doe' },
    { id: 'ST-003', name: 'Bellevue Square', location: 'Bellevue, WA', type: 'mall', region: 'North', status: 'active', manager: 'John Doe' },
    { id: 'ST-004', name: 'Redmond Town Center', location: 'Redmond, WA', type: 'shopping-center', region: 'North', status: 'active', manager: 'John Doe' },
    { id: 'ST-005', name: 'Everett Mall', location: 'Everett, WA', type: 'mall', region: 'North', status: 'active', manager: 'John Doe' },
    { id: 'ST-006', name: 'Lynnwood Plaza', location: 'Lynnwood, WA', type: 'plaza', region: 'North', status: 'inactive', manager: 'John Doe' },
    { id: 'ST-007', name: 'Bellingham Store', location: 'Bellingham, WA', type: 'standalone', region: 'North', status: 'active', manager: 'John Doe' },
    { id: 'ST-008', name: 'Olympia Center', location: 'Olympia, WA', type: 'downtown', region: 'North', status: 'active', manager: 'John Doe' },
    { id: 'ST-009', name: 'Houston Galleria', location: 'Houston, TX', type: 'mall', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-010', name: 'Austin Downtown', location: 'Austin, TX', type: 'downtown', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-011', name: 'Dallas NorthPark', location: 'Dallas, TX', type: 'mall', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-012', name: 'San Antonio Riverwalk', location: 'San Antonio, TX', type: 'tourist', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-013', name: 'Fort Worth Store', location: 'Fort Worth, TX', type: 'standalone', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-014', name: 'Plano Center', location: 'Plano, TX', type: 'shopping-center', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-015', name: 'Arlington Highlands', location: 'Arlington, TX', type: 'lifestyle', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-016', name: 'Corpus Christi', location: 'Corpus Christi, TX', type: 'beach', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-017', name: 'El Paso Store', location: 'El Paso, TX', type: 'standalone', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-018', name: 'McAllen Mall', location: 'McAllen, TX', type: 'mall', region: 'South', status: 'inactive', manager: 'Jane Smith' },
    { id: 'ST-019', name: 'Lubbock Center', location: 'Lubbock, TX', type: 'plaza', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-020', name: 'Amarillo Store', location: 'Amarillo, TX', type: 'standalone', region: 'South', status: 'active', manager: 'Jane Smith' },
    { id: 'ST-021', name: 'Fifth Avenue NYC', location: 'New York, NY', type: 'flagship', region: 'East', status: 'active', manager: 'Mike Johnson' },
    { id: 'ST-022', name: 'Boston Commons', location: 'Boston, MA', type: 'downtown', region: 'East', status: 'active', manager: 'Mike Johnson' },
    { id: 'ST-023', name: 'Philadelphia Center', location: 'Philadelphia, PA', type: 'downtown', region: 'East', status: 'active', manager: 'Mike Johnson' },
    { id: 'ST-024', name: 'Washington DC Mall', location: 'Washington, DC', type: 'mall', region: 'East', status: 'active', manager: 'Mike Johnson' },
    { id: 'ST-025', name: 'Baltimore Harbor', location: 'Baltimore, MD', type: 'tourist', region: 'East', status: 'active', manager: 'Mike Johnson' },
    { id: 'ST-026', name: 'Pittsburgh Store', location: 'Pittsburgh, PA', type: 'standalone', region: 'East', status: 'active', manager: 'Mike Johnson' },
    { id: 'ST-027', name: 'San Francisco Union Square', location: 'San Francisco, CA', type: 'flagship', region: 'West', status: 'active', manager: 'Sarah Wilson' },
    { id: 'ST-028', name: 'Los Angeles Beverly Hills', location: 'Los Angeles, CA', type: 'flagship', region: 'West', status: 'active', manager: 'Sarah Wilson' },
    { id: 'ST-029', name: 'San Diego Gaslamp', location: 'San Diego, CA', type: 'downtown', region: 'West', status: 'active', manager: 'Sarah Wilson' },
    { id: 'ST-030', name: 'Portland Downtown', location: 'Portland, OR', type: 'downtown', region: 'West', status: 'active', manager: 'Sarah Wilson' },
    { id: 'ST-031', name: 'Seattle Downtown', location: 'Seattle, WA', type: 'flagship', region: 'West', status: 'active', manager: 'Sarah Wilson' },
    { id: 'ST-032', name: 'Chicago Michigan Ave', location: 'Chicago, IL', type: 'flagship', region: 'Midwest', status: 'active', manager: 'Tom Brown' },
    { id: 'ST-033', name: 'Detroit Store', location: 'Detroit, MI', type: 'downtown', region: 'Midwest', status: 'active', manager: 'Tom Brown' },
    { id: 'ST-034', name: 'Cleveland Center', location: 'Cleveland, OH', type: 'downtown', region: 'Midwest', status: 'active', manager: 'Tom Brown' },
    { id: 'ST-035', name: 'Columbus Mall', location: 'Columbus, OH', type: 'mall', region: 'Midwest', status: 'active', manager: 'Tom Brown' },
    { id: 'ST-036', name: 'Indianapolis Store', location: 'Indianapolis, IN', type: 'standalone', region: 'Midwest', status: 'active', manager: 'Tom Brown' },
    { id: 'ST-037', name: 'Milwaukee Center', location: 'Milwaukee, WI', type: 'downtown', region: 'Midwest', status: 'active', manager: 'Tom Brown' },
    { id: 'ST-038', name: 'Minneapolis Mall', location: 'Minneapolis, MN', type: 'mall', region: 'Midwest', status: 'active', manager: 'Tom Brown' },
    { id: 'ST-039', name: 'St Louis Store', location: 'St Louis, MO', type: 'standalone', region: 'Midwest', status: 'inactive', manager: 'Tom Brown' },
    { id: 'ST-040', name: 'Kansas City Plaza', location: 'Kansas City, MO', type: 'plaza', region: 'Midwest', status: 'active', manager: 'Tom Brown' },
    { id: 'ST-041', name: 'Omaha Store', location: 'Omaha, NE', type: 'standalone', region: 'Midwest', status: 'active', manager: 'Tom Brown' },
    { id: 'ST-042', name: 'Woodbury Commons', location: 'Central Valley, NY', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-043', name: 'Orlando Premium', location: 'Orlando, FL', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-044', name: 'Las Vegas North', location: 'Las Vegas, NV', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-045', name: 'San Francisco Premium', location: 'Livermore, CA', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-046', name: 'Chicago Fashion Outlets', location: 'Rosemont, IL', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-047', name: 'Miami International Mall', location: 'Miami, FL', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-048', name: 'Dallas/Fort Worth', location: 'Dallas, TX', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-049', name: 'Seattle Premium Outlets', location: 'Tulalip, WA', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-050', name: 'Boston Wrentham', location: 'Wrentham, MA', type: 'outlet', region: 'National', status: 'inactive', manager: 'Lisa Chen' },
    { id: 'ST-051', name: 'Philadelphia Premium', location: 'Limerick, PA', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-052', name: 'Atlanta North Georgia', location: 'Dawsonville, GA', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-053', name: 'Denver Premium', location: 'Denver, CO', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-054', name: 'Phoenix Premium', location: 'Phoenix, AZ', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-055', name: 'Portland Premium', location: 'Portland, OR', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-056', name: 'Salt Lake City', location: 'Salt Lake City, UT', type: 'outlet', region: 'National', status: 'active', manager: 'Lisa Chen' },
    { id: 'ST-057', name: 'Toronto Eaton Centre', location: 'Toronto, Canada', type: 'flagship', region: 'International', status: 'active', manager: 'David Lee' },
    { id: 'ST-058', name: 'Vancouver Store', location: 'Vancouver, Canada', type: 'downtown', region: 'International', status: 'active', manager: 'David Lee' },
    { id: 'ST-059', name: 'London Oxford Street', location: 'London, UK', type: 'flagship', region: 'International', status: 'active', manager: 'David Lee' },
    { id: 'ST-060', name: 'Paris Champs-Élysées', location: 'Paris, France', type: 'flagship', region: 'International', status: 'active', manager: 'David Lee' },
    { id: 'ST-061', name: 'Tokyo Ginza', location: 'Tokyo, Japan', type: 'flagship', region: 'International', status: 'active', manager: 'David Lee' },
    { id: 'ST-062', name: 'Sydney Store', location: 'Sydney, Australia', type: 'downtown', region: 'International', status: 'inactive', manager: 'David Lee' },
    { id: 'ST-063', name: 'Singapore Orchard', location: 'Singapore', type: 'flagship', region: 'International', status: 'active', manager: 'David Lee' },
    { id: 'ST-064', name: 'NYC Downtown', location: 'New York, NY', type: 'downtown', region: 'National', status: 'active', manager: 'Emma Watson' },
    { id: 'ST-065', name: 'LA Downtown', location: 'Los Angeles, CA', type: 'downtown', region: 'National', status: 'active', manager: 'Emma Watson' },
    { id: 'ST-066', name: 'Chicago Downtown', location: 'Chicago, IL', type: 'downtown', region: 'National', status: 'active', manager: 'Emma Watson' },
    { id: 'ST-067', name: 'Houston Downtown', location: 'Houston, TX', type: 'downtown', region: 'National', status: 'active', manager: 'Emma Watson' },
    { id: 'ST-068', name: 'Phoenix Downtown', location: 'Phoenix, AZ', type: 'downtown', region: 'National', status: 'active', manager: 'Emma Watson' },
    { id: 'ST-069', name: 'Philadelphia Downtown', location: 'Philadelphia, PA', type: 'downtown', region: 'National', status: 'active', manager: 'Emma Watson' },
    { id: 'ST-070', name: 'San Antonio Downtown', location: 'San Antonio, TX', type: 'downtown', region: 'National', status: 'active', manager: 'Emma Watson' },
    { id: 'ST-071', name: 'San Diego Downtown', location: 'San Diego, CA', type: 'downtown', region: 'National', status: 'inactive', manager: 'Emma Watson' },
    { id: 'ST-072', name: 'Dallas Downtown', location: 'Dallas, TX', type: 'downtown', region: 'National', status: 'active', manager: 'Emma Watson' },
  ];

  // Regions
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'North', name: 'North Region' },
    { id: 'South', name: 'South Region' },
    { id: 'East', name: 'East Region' },
    { id: 'West', name: 'West Region' },
    { id: 'Midwest', name: 'Midwest Region' },
    { id: 'National', name: 'National' },
    { id: 'Global', name: 'Global' },
    { id: 'International', name: 'International' },
  ];

  // Group types
  const groupTypes = [
    { id: 'regional', name: 'Regional Group', icon: MapPin },
    { id: 'premium', name: 'Premium Group', icon: Star },
    { id: 'flagship', name: 'Flagship Group', icon: Building2 },
    { id: 'outlet', name: 'Outlet Group', icon: ShoppingBag },
    { id: 'international', name: 'International Group', icon: Globe },
    { id: 'urban', name: 'Urban Group', icon: Building2 },
  ];

  // Managers
  const managers = [
    { id: 1, name: 'John Doe', region: 'North', storeCount: 8, avatar: null, initials: 'JD' },
    { id: 2, name: 'Jane Smith', region: 'South', storeCount: 12, avatar: null, initials: 'JS' },
    { id: 3, name: 'Mike Johnson', region: 'East', storeCount: 6, avatar: null, initials: 'MJ' },
    { id: 4, name: 'Sarah Wilson', region: 'West', storeCount: 5, avatar: null, initials: 'SW' },
    { id: 5, name: 'Tom Brown', region: 'Midwest', storeCount: 10, avatar: null, initials: 'TB' },
    { id: 6, name: 'Lisa Chen', region: 'National', storeCount: 15, avatar: null, initials: 'LC' },
    { id: 7, name: 'David Lee', region: 'International', storeCount: 7, avatar: null, initials: 'DL' },
    { id: 8, name: 'Emma Watson', region: 'National', storeCount: 9, avatar: null, initials: 'EW' },
  ];

  // Status configuration
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Ban },
  };

  const priorityConfig = {
    high: { label: 'High', color: 'bg-red-50 text-red-700' },
    medium: { label: 'Medium', color: 'bg-yellow-50 text-yellow-700' },
    low: { label: 'Low', color: 'bg-green-50 text-green-700' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config?.icon || CheckCircle;
    return <Icon size={14} />;
  };

  const getStatusColor = (status) => {
    return statusConfig[status]?.color || 'bg-gray-50 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    return priorityConfig[priority]?.color || 'bg-gray-50 text-gray-700';
  };

  const filteredGroups = storeGroups.filter(group => {
    const matchesRegion = selectedRegion === 'all' || group.region === selectedRegion;
    const matchesType = selectedType === 'all' || group.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || group.status === selectedStatus;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesType && matchesStatus && matchesSearch;
  });

  const stats = {
    total: storeGroups.length,
    active: storeGroups.filter(g => g.status === 'active').length,
    totalStores: storeGroups.reduce((sum, g) => sum + g.storeCount, 0),
    totalInventory: storeGroups.reduce((sum, g) => sum + g.totalInventory, 0),
    regional: storeGroups.filter(g => g.type === 'regional').length,
    premium: storeGroups.filter(g => g.type === 'premium').length,
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Manage Store Groups</h1>
            <p className="text-black/50 mt-1">Organize and manage store groups, regions, and territories</p>
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
                  <Map className="mr-2 h-4 w-4" />
                  Import from GIS
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus size={16} />
              New Store Group
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Groups</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <Store size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Active Groups</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.active}</p>
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
                  <p className="text-xs text-black/50">Total Stores</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalStores}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Building2 size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Regional Groups</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.regional}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <MapPin size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Premium Groups</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.premium}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-full">
                  <Star size={18} className="text-orange-600" />
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
              placeholder="Search groups by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#F5EEE9] focus:border-red-600"
            />
          </div>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px] border-[#F5EEE9]">
              <SelectValue placeholder="Group Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {groupTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px] border-[#F5EEE9]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
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

      {/* Group Cards/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredGroups.map((group) => {
            const GroupIcon = group.icon;
            
            return (
              <Card key={group.id} className="border-[#F5EEE9] hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={cn("p-4 rounded-t-lg", group.color)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white/30 rounded-lg backdrop-blur-sm">
                          <GroupIcon size={18} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{group.name}</h3>
                          <p className="text-xs text-white/80 mt-0.5">{group.id}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedGroup(group);
                            setShowEditDialog(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Group
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedGroup(group);
                            setShowAddStoresDialog(true);
                          }}>
                            <Store className="mr-2 h-4 w-4" />
                            Add Stores
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedGroup(group);
                            setShowAssignManagerDialog(true);
                          }}>
                            <Users className="mr-2 h-4 w-4" />
                            Assign Manager
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedGroup(group);
                            setShowMapDialog(true);
                          }}>
                            <Map className="mr-2 h-4 w-4" />
                            View on Map
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                            setSelectedGroup(group);
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
                    <p className="text-sm text-black/50 line-clamp-2 mb-3">
                      {group.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Region</span>
                        <span className="font-medium text-black">{group.region}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Manager</span>
                        <span className="font-medium text-black">{group.manager}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Stores</span>
                        <span className="font-medium text-black">{group.storeCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Inventory Value</span>
                        <span className="font-medium text-black">{group.totalValue}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Priority</span>
                        <Badge className={cn("text-xs", getPriorityColor(group.priority))}>
                          {group.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/50">Status</span>
                        <Badge className={cn("text-xs border-0", getStatusColor(group.status))}>
                          {group.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="mt-4 p-3 bg-[#F5EEE9]/50 rounded-lg">
                      <p className="text-xs font-medium text-black mb-2">Performance</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-black/50">Sales</p>
                          <p className="text-sm font-medium text-green-600">{group.performance.sales}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Inventory</p>
                          <p className="text-sm font-medium text-black">{group.performance.inventory}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Accuracy</p>
                          <p className="text-sm font-medium text-blue-600">{group.performance.accuracy}</p>
                        </div>
                        <div>
                          <p className="text-xs text-black/50">Satisfaction</p>
                          <p className="text-sm font-medium text-purple-600">{group.performance.satisfaction}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-4">
                      {group.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9] bg-[#F5EEE9]/30">
                          {tag}
                        </Badge>
                      ))}
                      {group.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs border-[#F5EEE9]">
                          +{group.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F5EEE9]">
                      <div className="flex items-center gap-1 text-xs text-black/50">
                        <Clock size={12} />
                        Updated {group.recentActivity}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedGroup(group);
                          setShowDetailsDialog(true);
                        }}
                      >
                        View Stores
                      </Button>
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
                  <TableHead className="text-black/50">Group</TableHead>
                  <TableHead className="text-black/50">ID</TableHead>
                  <TableHead className="text-black/50">Type</TableHead>
                  <TableHead className="text-black/50">Region</TableHead>
                  <TableHead className="text-black/50">Manager</TableHead>
                  <TableHead className="text-black/50 text-right">Stores</TableHead>
                  <TableHead className="text-black/50 text-right">Inventory Value</TableHead>
                  <TableHead className="text-black/50">Priority</TableHead>
                  <TableHead className="text-black/50">Status</TableHead>
                  <TableHead className="text-black/50">Performance</TableHead>
                  <TableHead className="text-black/50">Last Activity</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map((group) => {
                  const GroupIcon = group.icon;
                  
                  return (
                    <TableRow key={group.id} className="border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn("p-1.5 rounded-lg", group.color)}>
                            <GroupIcon size={14} className="text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-black">{group.name}</p>
                            <p className="text-xs text-black/50">{group.description.substring(0, 30)}...</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{group.id}</TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", group.color)}>
                          {group.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{group.region}</TableCell>
                      <TableCell>{group.manager}</TableCell>
                      <TableCell className="text-right font-medium">{group.storeCount}</TableCell>
                      <TableCell className="text-right font-medium">{group.totalValue}</TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getPriorityColor(group.priority))}>
                          {group.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border-0", getStatusColor(group.status))}>
                          {group.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <span className="text-green-600">{group.performance.sales}</span>
                          <span className="text-black/30 mx-1">•</span>
                          <span className="text-blue-600">{group.performance.accuracy}</span>
                        </div>
                      </TableCell>
                      <TableCell>{group.recentActivity}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-[#F5EEE9] p-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-black/50">
                Showing {filteredGroups.length} of {storeGroups.length} store groups
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

      {/* Create Group Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Store Group</DialogTitle>
            <DialogDescription>
              Create a new group to organize stores by region, type, or other criteria
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Group Name</Label>
                <Input placeholder="e.g., North Region Stores" />
              </div>
              <div className="space-y-2">
                <Label>Group Type</Label>
                <Select defaultValue="regional">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {groupTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Region</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.slice(1).map(region => (
                      <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                    ))}
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
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe the purpose of this store group" rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Assign Manager</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  {managers.map(manager => (
                    <SelectItem key={manager.id} value={manager.id.toString()}>
                      {manager.name} ({manager.region})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Initial Stores</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select stores to add" />
                </SelectTrigger>
                <SelectContent>
                  {allStores.slice(0, 10).map(store => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name} - {store.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Enter tags separated by commas" />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup defaultValue="active" className="flex gap-4">
                {['active', 'inactive'].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <RadioGroupItem value={status} id={`create-${status}`} />
                    <Label htmlFor={`create-${status}`} className="capitalize">{status}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Stores Dialog */}
      <Dialog open={showAddStoresDialog} onOpenChange={setShowAddStoresDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Stores to {selectedGroup?.name}</DialogTitle>
            <DialogDescription>
              Select stores to add to this group
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
              <Input placeholder="Search stores..." className="pl-10" />
            </div>

            <div className="mb-4 flex gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-[#F5EEE9]">All Regions</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-[#F5EEE9]">North</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-[#F5EEE9]">South</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-[#F5EEE9]">East</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-[#F5EEE9]">West</Badge>
            </div>

            <ScrollArea className="h-96">
              <div className="space-y-2">
                {allStores.filter(s => !selectedGroup?.stores.some(store => store.id === s.id)).map((store) => (
                  <div key={store.id} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg hover:bg-[#F5EEE9]/30">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        store.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                      )}>
                        <Store size={16} className={store.status === 'active' ? 'text-green-700' : 'text-gray-700'} />
                      </div>
                      <div>
                        <p className="font-medium text-black">{store.name}</p>
                        <div className="flex items-center gap-2 text-xs text-black/50">
                          <MapPin size={10} />
                          <span>{store.location}</span>
                          <span>•</span>
                          <span>{store.type}</span>
                          <span>•</span>
                          <span>Manager: {store.manager}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={cn("text-xs", store.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700')}>
                        {store.status}
                      </Badge>
                      <Checkbox />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStoresDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Add Selected Stores
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Manager Dialog */}
      <Dialog open={showAssignManagerDialog} onOpenChange={setShowAssignManagerDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Manager to {selectedGroup?.name}</DialogTitle>
            <DialogDescription>
              Select a manager for this store group
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
              <Input placeholder="Search managers..." className="pl-10" />
            </div>

            <ScrollArea className="h-80">
              <div className="space-y-2">
                {managers.map((manager) => (
                  <div key={manager.id} className="flex items-center justify-between p-3 border border-[#F5EEE9] rounded-lg hover:bg-[#F5EEE9]/30">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-red-600 text-white">{manager.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-black">{manager.name}</p>
                        <p className="text-xs text-black/50">
                          {manager.region} • {manager.storeCount} stores
                        </p>
                      </div>
                    </div>
                    <RadioGroup value={selectedGroup?.managerId?.toString()}>
                      <RadioGroupItem value={manager.id.toString()} id={`manager-${manager.id}`} />
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignManagerDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Assign Manager
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Store Group</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this store group? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-medium text-red-700">Warning</p>
                  <p className="text-xs text-red-600/70 mt-1">
                    Deleting "{selectedGroup?.name}" will remove {selectedGroup?.storeCount} stores from this group. The stores themselves will not be deleted.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Delete Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Map View Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Store Locations - {selectedGroup?.name}</DialogTitle>
            <DialogDescription>
              Geographic view of all stores in this group
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="h-[400px] bg-[#F5EEE9] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Map className="mx-auto h-16 w-16 text-black/30 mb-4" />
                <p className="text-black/50">Map view would be integrated here</p>
                <p className="text-xs text-black/30 mt-2">Showing {selectedGroup?.storeCount} store locations</p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <Badge className="bg-blue-500">North Region</Badge>
                  <Badge className="bg-green-500">South Region</Badge>
                  <Badge className="bg-purple-500">East Region</Badge>
                  <Badge className="bg-orange-500">West Region</Badge>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {selectedGroup?.stores.slice(0, 6).map((store) => (
                <div key={store.id} className="flex items-center gap-2 p-2 border border-[#F5EEE9] rounded-lg">
                  <MapPin size={14} className="text-red-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{store.name}</p>
                    <p className="text-xs text-black/50 truncate">{store.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMapDialog(false)}>
              Close
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Export Map
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
            <TooltipContent side="left">Create Group</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setShowBulkDialog(true)}
              >
                <Store size={20} />
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

export default ManageStoreGroupPage;