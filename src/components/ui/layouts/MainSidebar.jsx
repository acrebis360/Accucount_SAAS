// components/ui/layouts/MainSidebar.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  // Original icons
  LayoutDashboard, 
  Home,
  Activity,
  Briefcase,
  MessageSquare,
  Settings,
  Users,
  Link2,
  Building2,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  FileText,
  BarChart,
  ClipboardList,
  Calendar,
  Store,
  Database,
  Repeat,
  Bell,
  BookOpen,
  Library,
  Bot,
  Building,
  User,
  Key,
  FileCode,
  RefreshCw,
  Crown,
  FileCheck,
  UsersRound,
  CreditCard as BillingIcon,
  Wrench,
  DollarSign,
  Layers,
  Users2,
  GraduationCap,
  Receipt,
  
  // New icons for Inventory Management
  Package,
  Hash,
  Sliders,
  
  // New icons for Warehouse Management
  Warehouse,
  Grid,
  Map,
  ArrowDown,
  List,
  Truck,
  ArrowDownCircle,
  
  // New icons for IoT & Devices
  Cpu,
  Radio,
  Scan,
  Wifi,
  Battery,
  Download,
  
  // New icons for Communications
  Megaphone,
  Mail,
  
  // New icons for Learning Management
  Award,
  
  // New icons for Quality Control
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  
  // New icons for Supplier Management
  TrendingUp,
  
  // New icons for Analytics
  BarChart3,
  LineChart,
  
  // New icons for Integration
  Webhook,
  
  // New icons for Audit & Compliance
  Book,
  
  // Additional icons
  FileText as FileTextIcon,
  Settings as SettingsIcon,
  Activity as ActivityIcon,
  Users as UsersIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MainSidebar = ({ isOpen, onToggle }) => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState({});
  const [hoveredSection, setHoveredSection] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Auto-expand section if any of its children is active
  useEffect(() => {
    const newExpandedSections = { ...expandedSections };
    menuSections.forEach(section => {
      const hasActiveChild = section.items.some(item => pathname === item.path);
      if (hasActiveChild && !newExpandedSections[section.title]) {
        newExpandedSections[section.title] = true;
      }
    });
    setExpandedSections(newExpandedSections);
  }, [pathname]);

  // Menu structure exactly as you specified
const menuSections = [
  {
    title: 'Home',
    icon: Home,
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { label: 'Reports', icon: FileText, path: '/dashboard/reports' },
      { label: 'Report Builder', icon: BarChart, path: '/dashboard/report-builder' },
    ]
  },
  {
    title: 'Activities',
    icon: Activity,
    items: [
      { label: 'Manage Stocktake', icon: ClipboardList, path: '/dashboard/manage-stocktake' },
      { label: 'Stock Take Scheduler', icon: Calendar, path: '/dashboard/stocktake-scheduler' },
      { label: 'Manage User Group', icon: Users2, path: '/dashboard/manage-user-group' },
      { label: 'Manage Store Group', icon: Store, path: '/dashboard/manage-store-group' },
    ]
  },
  {
    title: 'Inventory Management',
    icon: Package,
    items: [
      { label: 'Physical Inventory', icon: ClipboardList, path: '/dashboard/physical-inventory' },
      { label: 'Stock Levels', icon: Package, path: '/dashboard/stock-levels' },
      { label: 'Real-time Sync Monitor', icon: RefreshCw, path: '/dashboard/sync-monitor' },
      { label: 'Batch Tracking', icon: Layers, path: '/dashboard/batch-tracking' },
      { label: 'Serial Numbers', icon: Hash, path: '/dashboard/serial-numbers' },
      { label: 'Expiry Management', icon: Calendar, path: '/dashboard/expiry-management' },
      { label: 'Inventory Adjustments', icon: Sliders, path: '/dashboard/inventory-adjustments' },
    ]
  },
  {
    title: 'Asset Management',
    icon: Briefcase,
    items: [
      { label: 'Asset Depository', icon: Database, path: '/dashboard/asset-depository' },
      { label: 'Asset Transfers', icon: Repeat, path: '/dashboard/asset-transfers' },
    ]
  },
  {
    title: 'Warehouse Management',
    icon: Warehouse,
    items: [
      { label: 'Warehouse Zones', icon: Grid, path: '/dashboard/warehouse-zones' },
      { label: 'Bin Locations', icon: Map, path: '/dashboard/bin-locations' },
      { label: 'Putaway Rules', icon: ArrowDown, path: '/dashboard/putaway-rules' },
      { label: 'Picking Lists', icon: List, path: '/dashboard/picking-lists' },
      { label: 'Packing Stations', icon: Package, path: '/dashboard/packing-stations' },
      { label: 'Shipping Management', icon: Truck, path: '/dashboard/shipping' },
      { label: 'Receiving', icon: ArrowDownCircle, path: '/dashboard/receiving' },
    ]
  },
  {
    title: 'IoT & Devices',
    icon: Cpu,
    items: [
      { label: 'Connected Devices', icon: Radio, path: '/dashboard/connected-devices' },
      { label: 'RFID Scanners', icon: Scan, path: '/dashboard/rfid-scanners' },
      { label: 'IoT Gateway Status', icon: Wifi, path: '/dashboard/iot-gateway' },
      { label: 'Device Health', icon: Activity, path: '/dashboard/device-health' },
      { label: 'Battery Status', icon: Battery, path: '/dashboard/battery-status' },
      { label: 'Firmware Updates', icon: Download, path: '/dashboard/firmware-updates' },
    ]
  },
  {
    title: 'Communications',
    icon: MessageSquare,
    items: [
      { label: 'Notice Board', icon: Bell, path: '/dashboard/notice-board' },
      { label: 'Announcements', icon: Megaphone, path: '/dashboard/announcements' },
      { label: 'Messages', icon: Mail, path: '/dashboard/messages' },
      { label: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    ]
  },
  {
    title: 'Learning Management',
    icon: BookOpen,
    items: [
      { label: 'Trainings', icon: GraduationCap, path: '/dashboard/trainings' },
      { label: 'Library', icon: Library, path: '/dashboard/library' },
      { label: 'AI Bot / FAQ', icon: Bot, path: '/dashboard/ai-bot' },
      { label: 'Learning Paths', icon: Map, path: '/dashboard/learning-paths' },
      { label: 'Certifications', icon: Award, path: '/dashboard/certifications' },
    ]
  },
  {
    title: 'Quality Control',
    icon: ShieldCheck,
    items: [
      { label: 'Quality Checks', icon: CheckCircle, path: '/dashboard/quality-checks' },
      { label: 'Inspection Reports', icon: FileText, path: '/dashboard/inspection-reports' },
      { label: 'Defect Tracking', icon: AlertTriangle, path: '/dashboard/defect-tracking' },
      { label: 'Return Management', icon: RotateCcw, path: '/dashboard/returns' },
      { label: 'RMA Processing', icon: RefreshCw, path: '/dashboard/rma-processing' },
    ]
  },
  {
    title: 'Supplier Management',
    icon: Truck,
    items: [
      { label: 'Vendors', icon: Building, path: '/dashboard/vendors' },
      { label: 'Purchase Orders', icon: FileText, path: '/dashboard/purchase-orders' },
      { label: 'Supplier Performance', icon: TrendingUp, path: '/dashboard/supplier-performance' },
      { label: 'Contract Management', icon: FileCheck, path: '/dashboard/contracts' },
      { label: 'Reorder Automation', icon: Repeat, path: '/dashboard/reorder-automation' },
    ]
  },
  {
    title: 'Analytics & Insights',
    icon: BarChart3,
    items: [
      { label: 'Inventory Forecasting', icon: TrendingUp, path: '/dashboard/forecasting' },
      { label: 'Demand Planning', icon: Calendar, path: '/dashboard/demand-planning' },
      { label: 'Trend Analysis', icon: LineChart, path: '/dashboard/trend-analysis' },
      { label: 'Performance Metrics', icon: BarChart, path: '/dashboard/performance-metrics' },
      { label: 'AI Predictions', icon: Bot, path: '/dashboard/ai-predictions' },
      { label: 'Custom Dashboards', icon: LayoutDashboard, path: '/dashboard/custom-dashboards' },
    ]
  },
  {
    title: 'Administration',
    icon: Settings,
    items: [
      { label: 'Organization', icon: Building, path: '/dashboard/organization' },
      { label: 'Users', icon: Users, path: '/dashboard/users' },
      { label: 'Roles', icon: User, path: '/dashboard/roles' },
      { label: 'Masters', icon: Layers, path: '/dashboard/masters' },
      { label: 'My Requests', icon: FileCheck, path: '/dashboard/my-requests' },
      { label: 'My Subscriptions', icon: Crown, path: '/dashboard/my-subscriptions' },
      { label: 'My Billing History', icon: Receipt, path: '/dashboard/my-billing' },
      { label: 'Audit Logs', icon: FileText, path: '/dashboard/audit-logs' },
    ]
  },
  {
    title: 'Integration',
    icon: Link2,
    items: [
      { label: 'My API Keys', icon: Key, path: '/dashboard/api-keys' },
      { label: 'API Documentation', icon: FileCode, path: '/dashboard/api-docs' },
      { label: 'ERP Integration', icon: RefreshCw, path: '/dashboard/erp-integration' },
      { label: 'IOT Integration', icon: Wifi, path: '/dashboard/iot-integration' },
      { label: 'Sync Status', icon: RefreshCw, path: '/dashboard/sync-status' },
      { label: 'Webhooks', icon: Webhook, path: '/dashboard/webhooks' },
    ]
  },
  {
    title: 'Tenant Administration',
    icon: Building2,
    items: [
      { label: 'Clients', icon: UsersRound, path: '/dashboard/clients' },
      { label: 'Client Admins', icon: User, path: '/dashboard/client-admins' },
      { label: 'Requests', icon: FileCheck, path: '/dashboard/tenant-requests' },
      { label: 'Subscriptions', icon: Crown, path: '/dashboard/tenant-subscriptions' },
      { label: 'Billing & Payments', icon: BillingIcon, path: '/dashboard/billing' },
      { label: 'Services', icon: Wrench, path: '/dashboard/services' },
      { label: 'Pricing', icon: DollarSign, path: '/dashboard/pricing' },
      { label: 'Usage Analytics', icon: BarChart, path: '/dashboard/usage-analytics' },
    ]
  },
  {
    title: 'Super Administration',
    icon: Shield,
    items: [
      { label: 'Tenants', icon: Building2, path: '/dashboard/tenants' },
      { label: 'Tenant Admins', icon: User, path: '/dashboard/tenant-admins' },
      { label: 'Platform Settings', icon: Settings, path: '/dashboard/platform-settings' },
      { label: 'System Health', icon: Activity, path: '/dashboard/system-health' },
      { label: 'Global Audit', icon: FileCheck, path: '/dashboard/global-audit' },
    ]
  },
  {
    title: 'Audit & Compliance',
    icon: Shield,
    items: [
      { label: 'Audit Trail', icon: FileText, path: '/dashboard/audit-trail' },
      { label: 'Compliance Reports', icon: FileCheck, path: '/dashboard/compliance-reports' },
      { label: 'Regulatory Docs', icon: FileText, path: '/dashboard/regulatory-docs' },
      { label: 'Policy Management', icon: Book, path: '/dashboard/policies' },
      { label: 'Certification Tracking', icon: Award, path: '/dashboard/certifications' },
      { label: 'Audit Schedule', icon: Calendar, path: '/dashboard/audit-schedule' },
    ]
  }
];

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isActive = pathname === item.path;

    return (
      <Link href={item.path} key={item.path} className="block w-full">
        <div className={cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer group w-full",
          isActive 
            ? "bg-red-600 text-white shadow-md" // Changed to red-600 for active items
            : "text-black hover:bg-[#F5EEE9] hover:text-black hover:shadow-md",
          !isOpen && "justify-center px-2"
        )}>
          <Icon size={18} className={cn(
            "transition-transform duration-200 flex-shrink-0",
            isActive 
              ? "text-white" // White icon on red background
              : "text-red-600", // Red-600 icons for non-active items
            !isActive && "group-hover:rotate-3 group-hover:scale-110"
          )} />
          {isOpen && (
            <span className={cn(
              "flex-1 text-sm truncate transition-all duration-200",
              !isActive && "group-hover:translate-x-0.5"
            )}>
              {item.label}
            </span>
          )}
        </div>
      </Link>
    );
  };

  const renderSection = (section) => {
    const SectionIcon = section.icon;
    const isExpanded = expandedSections[section.title];
    const isHovered = hoveredSection === section.title;
    const hasActiveChild = section.items.some(item => pathname === item.path);

    return (
      <div key={section.title} className="mb-2 w-full">
        {/* Section Header */}
        <div
          onClick={() => isOpen && toggleSection(section.title)}
          onMouseEnter={() => setHoveredSection(section.title)}
          onMouseLeave={() => setHoveredSection(null)}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer w-[90%]",
            "text-black hover:bg-[#F5EEE9] hover:shadow-sm", // Changed to #F5EEE9 on hover
            !isOpen && "justify-center px-2",
            hasActiveChild && !isExpanded && "bg-[#F5EEE9]" // Using #F5EEE9 for active parent
          )}
        >
          <SectionIcon size={18} className={cn(
            "transition-all duration-200 flex-shrink-0 text-red-600", // All section icons red-600
            isHovered && "scale-110",
            hasActiveChild && !isExpanded && "text-red-600"
          )} />
          {isOpen && (
            <>
              <span className={cn(
                "flex-1 text-sm font-semibold tracking-wide transition-all duration-200 truncate",
                hasActiveChild && !isExpanded && "text-red-600" // Changed to red-600 for active parent
              )}>
                {section.title}
              </span>
              <div className={cn(
                "transition-all duration-300 ease-in-out flex-shrink-0 ml-1",
                isExpanded ? "rotate-180" : "rotate-0"
              )}>
                {isExpanded ? (
                  <ChevronDown size={14} className="text-black" /> // Changed to black
                ) : (
                  <ChevronRightIcon size={14} className="text-black" /> // Changed to black
                )}
              </div>
            </>
          )}
        </div>

        {/* Section Items with animation - Fixed overflow */}
        {isOpen && (
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out w-[90%] ",
            isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
          )}>
            <div className="pl-4 pr-2 space-y-1 w-full">
              {section.items.map(item => renderMenuItem(item))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <aside className={cn(
      "relative h-screen bg-white text-black transition-all duration-300 ease-in-out flex flex-col border-r border-[#F5EEE9]", // Changed border to #F5EEE9
      isOpen ? "w-75" : "w-14"
    )}>
      {/* Header Section with animation */}
      <div className={cn(
        "flex h-14 items-center flex-shrink-0 border-b border-[#F5EEE9] transition-all duration-300 bg-black", // Changed border to #F5EEE9
        isOpen ? "justify-between px-4" : "justify-center"
      )}>
        {isOpen && (
          <span className="text-3xl font-semibold tracking-tight animate-in fade-in slide-in-from-left-2 duration-300 truncate">
            <span className="text-red-600">ACCU</span>
            <span className="text-white">COUNT</span>
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "text-black hover:bg-[#F5EEE9] transition-all duration-200 hover:scale-110 hover:rotate-3 h-7 w-7 flex-shrink-0", // Changed hover to #F5EEE9
            !isOpen && "mx-auto"
          )}
        >
          <div className={cn(
            "transition-transform duration-300",
            isOpen ? "rotate-0" : "rotate-180"
          )}>
            {isOpen ? <ChevronLeft size={16} className="text-red-600" /> : <ChevronRight size={16} className="text-red-600" />} {/* Chevrons red-600 */}
          </div>
        </Button>
      </div>

      {/* Navigation Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <TooltipProvider delayDuration={0}>
          <ScrollArea className="flex-1 h-full">
            <div className="py-2 px-2 space-y-2">
              {menuSections.map((section) => (
                <Tooltip key={section.title}>
                  <TooltipTrigger asChild>
                    <div className="w-full">
                      {renderSection(section)}
                    </div>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent 
                      side="right" 
                      className="animate-in fade-in slide-in-from-left-1 duration-200 text-sm bg-black text-white border-none" // Black background for tooltips
                    >
                      <span className="font-semibold">{section.title}</span>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </div>
          </ScrollArea>
        </TooltipProvider>

        {/* Footer with animation */}
        {isOpen && (
          <div className="p-3 border-t border-[#F5EEE9] animate-in fade-in slide-in-from-bottom-2 duration-300 flex-shrink-0"> {/* Changed border to #F5EEE9 */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-black">v2.0.0</span>
              <span className="text-red-600">Updated</span> {/* Changed to red-600 */}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default MainSidebar;