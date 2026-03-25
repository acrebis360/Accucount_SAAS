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
  Map as MapIcon,
  Thermometer,
  
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
  Users as UsersIcon,
  
  // Icons for Dashboard submenu
  CalendarDays,
  Calculator,
  Wrench as WrenchIcon,
  CheckCircle2,
  Users as UsersIcon2,
  FileText as FileTextIcon2,
  
  // New icons for new menus
  History,
  AlertCircle,
  MapPin,
  QrCode,
  Play,
  CheckSquare,
  Eye,
  GitBranch,
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  Smartphone,
  Server,
  HardDrive,
  Shield as ShieldIcon,
  Globe,
  BookOpen as BookOpenIcon,
  Users as UsersIcon3,
  CreditCard,
  Lock,
  Server as ServerIcon,
  Database as DatabaseIcon,
  PieChart
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
  const [expandedDashboard, setExpandedDashboard] = useState(false);
  const [expandedStockTakeSetup, setExpandedStockTakeSetup] = useState(false);
  const [expandedStockTakePlan, setExpandedStockTakePlan] = useState(false);
  const [expandedStockTakeExecute, setExpandedStockTakeExecute] = useState(false);
  const [expandedStockTakeReview, setExpandedStockTakeReview] = useState(false);
  const [expandedStockTakeReconciliation, setExpandedStockTakeReconciliation] = useState(false);

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
    
    // Auto-expand Dashboard if any submenu item is active
    const dashboardSubmenuPaths = [
      '/dashboard/event-dashboard',
      '/dashboard/count',
      '/dashboard/audit-fix',
      '/dashboard/closeout',
      '/dashboard/event-report'
    ];
    if (dashboardSubmenuPaths.includes(pathname)) {
      setExpandedDashboard(true);
    }
  }, [pathname]);

  // Dashboard submenu items
  const dashboardSubmenuItems = [
    { label: 'Event Dashboard', icon: CalendarDays, path: '/dashboard/event-dashboard' },
    { label: 'Count', icon: Calculator, path: '/dashboard/count' },
    { label: 'Fix', icon: WrenchIcon, path: '/dashboard/audit-fix' },
    { label: 'Close Out', icon: CheckCircle2, path: '/dashboard/closeout' },
    { label: 'Team', icon: UsersIcon2, path: '/dashboard/team' },
    { label: 'Event Report', icon: FileTextIcon2, path: '/dashboard/event-report' },
  ];

  // Menu structure with all new items added at the start
const menuSections = [
  {
    title: 'HOME',
    icon: Home,
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { label: 'Stock Take History', icon: History, path: '/dashboard/stocktake-history' },
      { label: 'Notifications & Alerts', icon: AlertCircle, path: '/dashboard/notifications' },
    ]
  },
  {
    title: 'INVENTORY',
    icon: Package,
    items: [
      { label: 'Physical Inventory', icon: ClipboardList, path: '/dashboard/physical-inventory' },
      { label: 'Stock Levels', icon: Package, path: '/dashboard/stock-levels' },
      { label: 'Real-time Sync Monitor', icon: RefreshCw, path: '/dashboard/sync-monitor' },
      { label: 'Batch Tracking', icon: Layers, path: '/dashboard/batch-tracking' },
      { label: 'Serial Numbers', icon: Hash, path: '/dashboard/serial-numbers' },
      { label: 'Expiry Management', icon: Calendar, path: '/dashboard/expiry-management' },
      { label: 'Inventory Map', icon: MapIcon, path: '/dashboard/inventory-map' },
    ]
  },
  {
    title: 'STOCK TAKE',
    icon: ClipboardList,
    items: [
      { label: 'Setup', icon: Settings, submenu: [
        { label: 'Locations', icon: MapPin, path: '/dashboard/locations' },
        { label: 'Item Master Management', icon: Database, path: '/dashboard/item-master' },
        { label: 'Report Management', icon: FileText, path: '/dashboard/report-management' },
        { label: 'Bar Code / QR Generator', icon: QrCode, path: '/dashboard/barcode-generator' },
      ]},
      { label: 'Plan', icon: Calendar, submenu: [
        { label: 'Event Scheduling', icon: Calendar, path: '/dashboard/stocktake/event-scheduling' },
        { label: 'Event Setup', icon: Settings, path: '/dashboard/stocktake/event-setup' },
      ]},
      { label: 'Execute (LIVE)', icon: Play, submenu: [
        { label: 'Live & Upcoming Events', icon: LayoutDashboard, path: '/dashboard/live-dashboard' },
      ]},
    ]
  },
  {
    title: 'INSIGHTS & REPORTING',
    icon: BarChart3,
    items: [
      { label: 'Analytics Dashboard', icon: LayoutDashboard, path: '/dashboard/analytics-dashboard' },
      { label: 'Stock Take History', icon: History, path: '/dashboard/stocktake-history-report' },
      { label: 'Custom Reports', icon: FileText, path: '/dashboard/custom-reports' },
    ]
  },
  {
    title: 'DEVICE MANAGEMENT',
    icon: Smartphone,
    items: [
      { label: 'Connected Devices', icon: Radio, path: '/dashboard/connected-devices' },
      { label: 'IoT Gateway Status', icon: Wifi, path: '/dashboard/iot-gateway' },
      { label: 'Device Health', icon: Activity, path: '/dashboard/device-health' },
      { label: 'Battery Status', icon: Battery, path: '/dashboard/battery-status' },
      { label: 'Firmware Updates', icon: Download, path: '/dashboard/firmware-updates' },
    ]
  },
  {
    title: 'INTEGRATION',
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
    title: 'COMMUNICATIONS',
    icon: MessageSquare,
    items: [
      { label: 'Notice Board', icon: Bell, path: '/dashboard/notice-board' },
      { label: 'Announcements', icon: Megaphone, path: '/dashboard/announcements' },
      { label: 'Messages', icon: Mail, path: '/dashboard/messages' },
      { label: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    ]
  },
  {
    title: 'KNOWLEDGE CENTRE',
    icon: BookOpen,
    items: [
      { label: 'Trainings', icon: GraduationCap, path: '/dashboard/trainings' },
      { label: 'Library', icon: Library, path: '/dashboard/library' },
      { label: 'AI Bot / FAQ', icon: Bot, path: '/dashboard/ai-bot' },
      { label: 'Learning Paths', icon: Map, path: '/dashboard/learning-paths' },
    ]
  },
  {
    title: 'ADMINISTRATION',
    icon: Settings,
    items: [
      { label: 'Team & Access', icon: Users, path: '/dashboard/team-access' },
      { label: 'Requests', icon: FileCheck, path: '/dashboard/requests' },
      { label: 'Subscriptions', icon: Crown, path: '/dashboard/subscriptions' },
      { label: 'Billing & Payments', icon: CreditCard, path: '/dashboard/billing-payments' },
      { label: 'Pricing', icon: DollarSign, path: '/dashboard/pricing' },
      { label: 'Usage Analytics', icon: BarChart, path: '/dashboard/usage-analytics' },
      { label: 'Audit Logs', icon: FileText, path: '/dashboard/audit-logs' },
      { label: 'Security Settings', icon: Lock, path: '/dashboard/security-settings' },
    ]
  },
  {
    title: 'SUPER ADMINISTRATION',
    icon: Shield,
    items: [
      { label: 'Tenants', icon: Building2, path: '/dashboard/tenants' },
      { label: 'Tenant Admins', icon: User, path: '/dashboard/tenant-admins' },
      { label: 'Platform Settings', icon: Settings, path: '/dashboard/platform-settings' },
      { label: 'System Health', icon: Activity, path: '/dashboard/system-health' },
      { label: 'System Logs', icon: Server, path: '/dashboard/system-logs' },
      { label: 'Global Usage Dashboard', icon: Globe, path: '/dashboard/global-usage' },
    ]
  },
  
];

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isActive = pathname === item.path;

    return (
      <Link href={item.path} key={item.path} className="block w-full">
        <div className={cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer group w-full",
          isActive 
            ? "bg-red-600 text-white shadow-md"
            : "text-black hover:bg-[#F5EEE9] hover:text-black hover:shadow-md",
          !isOpen && "justify-center px-2"
        )}>
          <Icon size={18} className={cn(
            "transition-transform duration-200 flex-shrink-0",
            isActive 
              ? "text-white"
              : "text-red-600",
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

  const renderSubmenuItems = (items, level = 1) => {
    return (
      <div className={cn("space-y-1", level === 1 ? "pl-4" : "pl-6")}>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link href={item.path} key={item.path} className="block w-full">
              <div className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer group w-full",
                isActive 
                  ? "bg-red-600 text-white shadow-md"
                  : "text-black hover:bg-[#F5EEE9] hover:text-black hover:shadow-md",
              )}>
                <Icon size={level === 1 ? 16 : 14} className={cn(
                  "transition-transform duration-200 flex-shrink-0",
                  isActive 
                    ? "text-white"
                    : "text-red-600",
                  !isActive && "group-hover:rotate-3 group-hover:scale-110"
                )} />
                <span className={cn(
                  "flex-1 text-sm truncate transition-all duration-200",
                  !isActive && "group-hover:translate-x-0.5"
                )}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  const renderSection = (section) => {
    const SectionIcon = section.icon;
    const isExpanded = expandedSections[section.title];
    const isHovered = hoveredSection === section.title;
    const hasActiveChild = section.items.some(item => {
      if (item.submenu) {
        return item.submenu.some(subItem => pathname === subItem.path);
      }
      return pathname === item.path;
    });

    // Special handling for STOCK TAKE section with nested submenus
    if (section.title === 'STOCK TAKE') {
      return (
        <div key={section.title} className="mb-2 w-full">
          {/* Section Header */}
          <div
            onClick={() => isOpen && toggleSection(section.title)}
            onMouseEnter={() => setHoveredSection(section.title)}
            onMouseLeave={() => setHoveredSection(null)}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer w-[100%]",
              "text-black hover:bg-[#F5EEE9] hover:shadow-sm",
              !isOpen && "justify-center px-2",
              hasActiveChild && !isExpanded && "bg-[#F5EEE9]"
            )}
          >
            <SectionIcon size={18} className={cn(
              "transition-all duration-200 flex-shrink-0 text-red-600",
              isHovered && "scale-110",
              hasActiveChild && !isExpanded && "text-red-600"
            )} />
            {isOpen && (
              <>
                <span className={cn(
                  "flex-1 text-sm font-semibold tracking-wide transition-all duration-200 truncate",
                  hasActiveChild && !isExpanded && "text-red-600"
                )}>
                  {section.title}
                </span>
                <div className={cn(
                  "transition-all duration-300 ease-in-out flex-shrink-0 ml-1",
                  isExpanded ? "rotate-180" : "rotate-0"
                )}>
                  {isExpanded ? (
                    <ChevronDown size={14} className="text-black" />
                  ) : (
                    <ChevronRightIcon size={14} className="text-black" />
                  )}
                </div>
              </>
            )}
          </div>

          {/* Stock Take Items with nested submenus */}
          {isOpen && (
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out w-[100%]",
              isExpanded ? "max-h-[800px] opacity-100 mt-1" : "max-h-0 opacity-0"
            )}>
              <div className="pl-2 space-y-2 w-full">
                {section.items.map((item, idx) => {
                  if (item.submenu) {
                    return (
                      <StockTakeSubmenu 
                        key={idx}
                        item={item}
                        pathname={pathname}
                        isOpen={isOpen}
                      />
                    );
                  }
                  return renderMenuItem(item);
                })}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={section.title} className="mb-2 w-full">
        {/* Section Header */}
        <div
          onClick={() => isOpen && toggleSection(section.title)}
          onMouseEnter={() => setHoveredSection(section.title)}
          onMouseLeave={() => setHoveredSection(null)}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer w-[100%]",
            "text-black hover:bg-[#F5EEE9] hover:shadow-sm",
            !isOpen && "justify-center px-2",
            hasActiveChild && !isExpanded && "bg-[#F5EEE9]"
          )}
        >
          <SectionIcon size={18} className={cn(
            "transition-all duration-200 flex-shrink-0 text-red-600",
            isHovered && "scale-110",
            hasActiveChild && !isExpanded && "text-red-600"
          )} />
          {isOpen && (
            <>
              <span className={cn(
                "flex-1 text-sm font-semibold tracking-wide transition-all duration-200 truncate",
                hasActiveChild && !isExpanded && "text-red-600"
              )}>
                {section.title}
              </span>
              <div className={cn(
                "transition-all duration-300 ease-in-out flex-shrink-0 ml-1",
                isExpanded ? "rotate-180" : "rotate-0"
              )}>
                {isExpanded ? (
                  <ChevronDown size={14} className="text-black" />
                ) : (
                  <ChevronRightIcon size={14} className="text-black" />
                )}
              </div>
            </>
          )}
        </div>

        {/* Section Items with animation */}
        {isOpen && (
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out w-[100%]",
            isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
          )}>
            <div className="pl-4 pr-2 space-y-1 w-full">
              {section.items.map(item => {
                // Special handling for Dashboard item in Home section
                if (section.title === 'Home' && item.label === 'Dashboard') {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  
                  return (
                    <div key={item.path}>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedDashboard(!expandedDashboard);
                        }}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer group w-full",
                          isActive 
                            ? "bg-red-600 text-white shadow-md"
                            : "text-black hover:bg-[#F5EEE9] hover:text-black hover:shadow-md",
                        )}
                      >
                        <Icon size={18} className={cn(
                          "transition-transform duration-200 flex-shrink-0",
                          isActive 
                            ? "text-white"
                            : "text-red-600",
                          !isActive && "group-hover:rotate-3 group-hover:scale-110"
                        )} />
                        <span className={cn(
                          "flex-1 text-sm truncate transition-all duration-200",
                          !isActive && "group-hover:translate-x-0.5"
                        )}>
                          {item.label}
                        </span>
                        <div className={cn(
                          "transition-all duration-300 ease-in-out",
                          expandedDashboard ? "rotate-180" : "rotate-0"
                        )}>
                          <ChevronDown size={14} className={isActive ? "text-white" : "text-black"} />
                        </div>
                      </div>
                      
                      {/* Dashboard Submenu Items */}
                      {expandedDashboard && (
                        <div className="mt-1 space-y-1 pl-4">
                          {dashboardSubmenuItems.map(subItem => {
                            const SubIcon = subItem.icon;
                            const isSubActive = pathname === subItem.path;
                            return (
                              <Link href={subItem.path} key={subItem.path} className="block w-full">
                                <div className={cn(
                                  "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer group w-full",
                                  isSubActive 
                                    ? "bg-red-600 text-white shadow-md"
                                    : "text-black hover:bg-[#F5EEE9] hover:text-black hover:shadow-md",
                                )}>
                                  <SubIcon size={16} className={cn(
                                    "transition-transform duration-200 flex-shrink-0",
                                    isSubActive 
                                      ? "text-white"
                                      : "text-red-600",
                                    !isSubActive && "group-hover:rotate-3 group-hover:scale-110"
                                  )} />
                                  <span className={cn(
                                    "flex-1 text-sm truncate transition-all duration-200",
                                    !isSubActive && "group-hover:translate-x-0.5"
                                  )}>
                                    {subItem.label}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                
                // Render other items normally
                return renderMenuItem(item);
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Component for Stock Take submenu items with nested structure
  const StockTakeSubmenu = ({ item, pathname, isOpen }) => {
    const [isSubmenuExpanded, setIsSubmenuExpanded] = useState(false);
    const Icon = item.icon;
    const hasActiveChild = item.submenu.some(subItem => pathname === subItem.path);
    
    useEffect(() => {
      if (hasActiveChild) {
        setIsSubmenuExpanded(true);
      }
    }, [hasActiveChild]);
    
    return (
      <div className="w-full">
        <div
          onClick={() => setIsSubmenuExpanded(!isSubmenuExpanded)}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer group w-full",
            "text-black hover:bg-[#F5EEE9] hover:text-black hover:shadow-md",
          )}
        >
          <Icon size={18} className={cn(
            "transition-transform duration-200 flex-shrink-0 text-red-600",
            "group-hover:rotate-3 group-hover:scale-110"
          )} />
          <span className="flex-1 text-sm truncate transition-all duration-200 group-hover:translate-x-0.5">
            {item.label}
          </span>
          <div className={cn(
            "transition-all duration-300 ease-in-out",
            isSubmenuExpanded ? "rotate-180" : "rotate-0"
          )}>
            <ChevronDown size={14} className="text-black" />
          </div>
        </div>
        
        {isSubmenuExpanded && (
          <div className="mt-1 space-y-1 pl-4">
            {item.submenu.map(subItem => {
              const SubIcon = subItem.icon;
              const isActive = pathname === subItem.path;
              return (
                <Link href={subItem.path} key={subItem.path} className="block w-full">
                  <div className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer group w-full",
                    isActive 
                      ? "bg-red-600 text-white shadow-md"
                      : "text-black hover:bg-[#F5EEE9] hover:text-black hover:shadow-md",
                  )}>
                    <SubIcon size={16} className={cn(
                      "transition-transform duration-200 flex-shrink-0",
                      isActive 
                        ? "text-white"
                        : "text-red-600",
                      !isActive && "group-hover:rotate-3 group-hover:scale-110"
                    )} />
                    <span className={cn(
                      "flex-1 text-sm truncate transition-all duration-200",
                      !isActive && "group-hover:translate-x-0.5"
                    )}>
                      {subItem.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <aside className={cn(
      "relative h-screen bg-white text-black transition-all duration-300 ease-in-out flex flex-col",
      isOpen ? "w-68" : "w-14"
    )}>
      {/* Header Section with animation */}
      <div className={cn(
        "flex h-14 items-center flex-shrink-0 border-b border-[#F5EEE9] transition-all duration-300 bg-black",
        isOpen ? "justify-between px-4" : "justify-center"
      )}>
        {isOpen && (
          <span className="text-3xl font-semibold tracking-tight animate-in fade-in slide-in-from-left-2 duration-300 truncate">
            <span className="text-red-600 tracking-wider">ACREBIS</span>
            {/* <span className="text-white tracking-wider">BIS</span> */}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "text-black hover:bg-[#F5EEE9] transition-all duration-200 hover:scale-110 hover:rotate-3 h-7 w-7 flex-shrink-0",
            !isOpen && "mx-auto"
          )}
        >
          <div className={cn(
            "transition-transform duration-300",
            isOpen ? "rotate-0" : "rotate-180"
          )}>
            {isOpen ? <ChevronLeft size={16} className="text-red-600" /> : <ChevronRight size={16} className="text-red-600" />}
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
                      className="animate-in fade-in slide-in-from-left-1 duration-200 text-sm bg-black text-white border-none"
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
          <div className="p-3 border-t border-[#F5EEE9] animate-in fade-in slide-in-from-bottom-2 duration-300 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-black">v2.0.0</span>
              <span className="text-red-600">Updated</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default MainSidebar;