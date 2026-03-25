// components/ui/layouts/SecondarySidebar.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, X, ChevronLeft, Package, LayoutDashboard, Settings, Users, FileText, Calendar, CheckCircle, Eye, GitBranch, Play, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { 
  Calculator,
  WrenchIcon,
  CheckCircle2,
  AlertTriangle,
  CheckSquare,
  RefreshCw
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

const SecondarySidebar = ({ isOpen, onClose, onCollapse, eventData }) => {
  const pathname = usePathname();
  const { closeSecondarySidebar } = useSidebar();
  const [expandedMenus, setExpandedMenus] = useState({
    execute: true,
    review: true,
    reconciliation: true
  });
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-expand if any child is active and set default active for Event Dashboard
  useEffect(() => {
    const newExpanded = { ...expandedMenus };
    const executePaths = [
      '/dashboard/event-dashboard',
      '/dashboard/count',
      '/dashboard/audit-fix',
      '/dashboard/validation',
      '/dashboard/closeout',
      '/dashboard/live/event-dashboard/2',
      '/dashboard/live/count/2',
      '/dashboard/live/audit-fix',
      '/dashboard/live/validation',
      '/dashboard/live/closeout'
    ];
    const reviewPaths = [
      '/dashboard/team-productivity',
      '/dashboard/discrepancy-dashboard',
      '/dashboard/event-reports'
    ];
    const reconciliationPaths = [
      '/dashboard/reconciliation-workspace',
      '/dashboard/adjustment-preview',
      '/dashboard/approval-workflow',
      '/dashboard/adjustment-posting'
    ];

    if (executePaths.includes(pathname)) newExpanded.execute = true;
    if (reviewPaths.includes(pathname)) newExpanded.review = true;
    if (reconciliationPaths.includes(pathname)) newExpanded.reconciliation = true;

    setExpandedMenus(newExpanded);
  }, [pathname]);

  const toggleMenu = (menu) => {
    if (!isCollapsed) {
      setExpandedMenus(prev => ({
        ...prev,
        [menu]: !prev[menu]
      }));
    }
  };

  const handleLinkClick = () => {
    // Keep sidebar open on navigation
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (onCollapse) {
      onCollapse(!isCollapsed);
    }
  };

  const menuItems = {
    execute: {
      title: 'Execute (LIVE)',
      icon: Play,
      iconColor: "text-red-600",
      items: [
        { label: 'Event Dashboard', icon: LayoutDashboard, path: '/dashboard/live/event-dashboard/2' },
        { label: 'Count', icon: Calculator, path: '/dashboard/live/count/2' },
        { label: 'Fix', icon: WrenchIcon, path: '/dashboard/live/audit-fix' },
        { label: 'Validation', icon: CheckCircle, path: '/dashboard/live/validation' },
        { label: 'Close Out', icon: CheckCircle2, path: '/dashboard/live/closeout' },
      ]
    },
    review: {
      title: 'Review & Control',
      icon: Eye,
      iconColor: "text-blue-600",
      items: [
        { label: 'Team Productivity', icon: Users, path: '/dashboard/team-productivity' },
        { label: 'Discrepancy Dashboard', icon: AlertTriangle, path: '/dashboard/discrepancy-dashboard' },
        { label: 'Event Reports', icon: FileText, path: '/dashboard/event-reports' },
      ]
    },
    reconciliation: {
      title: 'Reconciliation',
      icon: GitBranch,
      iconColor: "text-purple-600",
      items: [
        { label: 'Reconciliation Workspace', icon: LayoutDashboard, path: '/dashboard/reconciliation-workspace' },
        { label: 'Adjustment Preview', icon: Eye, path: '/dashboard/adjustment-preview' },
        { label: 'Approval Workflow', icon: CheckSquare, path: '/dashboard/approval-workflow' },
        { label: 'Inventory Adjustment Posting', icon: RefreshCw, path: '/dashboard/adjustment-posting' },
      ]
    }
  };

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isActive = pathname === item.path;
    
    return (
      <TooltipProvider key={item.path} delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={item.path} className="block w-full" onClick={handleLinkClick}>
              <div className={cn(
                "flex items-center gap-2.5 rounded-lg px-2 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer group",
                isCollapsed ? "justify-center" : "w-[90%]",
                isActive 
                  ? "bg-red-600 text-white shadow-md"
                  : "text-black hover:bg-[#F5EEE9] hover:text-black hover:shadow-md"
              )}>
                <Icon size={18} className={cn(
                  "transition-transform duration-200 flex-shrink-0",
                  isActive 
                    ? "text-white"
                    : "text-red-600",
                  !isActive && "group-hover:rotate-3 group-hover:scale-110"
                )} />
                {!isCollapsed && (
                  <span className={cn(
                    "flex-1 text-sm truncate transition-all duration-200",
                    !isActive && "group-hover:translate-x-0.5"
                  )}>
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent 
              side="right" 
              className="animate-in fade-in slide-in-from-left-1 duration-200 truncate text-sm bg-black text-white border-none z-50"
            >
              <span className="font-medium">{item.label}</span>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderMenuSection = (menuKey, menu) => {
    const isExpanded = expandedMenus[menuKey];
    const isHovered = hoveredSection === menuKey;
    const Icon = menu.icon;
    
    // Check if any child is active
    const hasActiveChild = menu.items.some(item => pathname === item.path);
    
    return (
      <div key={menuKey} className="mb-2 w-full">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => toggleMenu(menuKey)}
                onMouseEnter={() => setHoveredSection(menuKey)}
                onMouseLeave={() => setHoveredSection(null)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-1 py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer",
                  isCollapsed ? "justify-center" : "w-[90%]",
                  "text-black hover:bg-[#F5EEE9] hover:shadow-sm",
                  hasActiveChild && !isExpanded && "bg-[#F5EEE9]"
                )}
              >
                <Icon size={18} className={cn(
                  "transition-all duration-200 flex-shrink-0",
                  menu.iconColor || "text-red-600",
                  isHovered && "scale-110",
                  hasActiveChild && !isExpanded && "text-red-600"
                )} />
                {!isCollapsed && (
                  <>
                    <span className={cn(
                      "flex-1 text-sm font-semibold tracking-wide transition-all duration-200 truncate",
                      hasActiveChild && !isExpanded && "text-red-600"
                    )}>
                      {menu.title}
                    </span>
                    <div className={cn(
                      "transition-all duration-300 ease-in-out flex-shrink-0 ml-1",
                      isExpanded ? "rotate-180" : "rotate-0"
                    )}>
                      {isExpanded ? (
                        <ChevronDown size={14} className="text-black" />
                      ) : (
                        <ChevronRight size={14} className="text-black" />
                      )}
                    </div>
                  </>
                )}
              </div>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent 
                side="right" 
                className="animate-in fade-in slide-in-from-left-1 duration-200 text-sm bg-black text-white border-none"
              >
                <span className="font-medium">{menu.title}</span>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        {!isCollapsed && isExpanded && (
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out w-full",
            isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
          )}>
            <div className="pl-4 pr-2 space-y-1 w-full">
              {menu.items.map(item => renderMenuItem(item))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!mounted) return null;
  if (!isOpen) return null;

  return (
    <aside className={cn(
      "relative h-screen bg-white text-black transition-all duration-300 ease-in-out flex flex-col border-l border-[#F5EEE9]",
      isCollapsed ? "w-14" : "w-60"
    )}>
      {/* Header Section with animation */}
      <div className={cn(
        "flex h-14 items-center flex-shrink-0 border-b border-[#F5EEE9] transition-all duration-300 bg-black",
        isCollapsed ? "justify-center" : "justify-between px-3"
      )}>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold tracking-tight animate-in fade-in slide-in-from-left-2 duration-300 block truncate">
              <span className="text-red-600">STOCK TAKE</span>
              <span className="text-white"> ACTIONS</span>
            </span>
            {eventData && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-white/70 text-xs mt-0.5 truncate cursor-pointer">
                      {eventData.name} • {eventData.uniqueId}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="animate-in fade-in slide-in-from-top-1 duration-200 text-sm bg-black text-white border-none"
                  >
                    <div>
                      <p className="font-medium">{eventData.name}</p>
                      <p className="text-xs text-gray-300 mt-1">ID: {eventData.uniqueId}</p>
                      {eventData.customerName && (
                        <p className="text-xs text-gray-300">Customer: {eventData.customerName}</p>
                      )}
                      {eventData.storeName && (
                        <p className="text-xs text-gray-300">Store: {eventData.storeName}</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
        
        {isCollapsed && eventData && (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-full">
                  <span className="text-xs font-bold text-red-600 animate-in fade-in duration-300">
                    ST
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="animate-in fade-in slide-in-from-left-1 duration-200 text-sm bg-black text-white border-none"
              >
                <div>
                  <p className="font-medium">{eventData.name}</p>
                  <p className="text-xs text-gray-300">ID: {eventData.uniqueId}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={handleCollapse}
          className={cn(
            "text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 hover:rotate-3 h-7 w-7 flex-shrink-0",
            isCollapsed && "mx-auto"
          )}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronsRight size={16} className="text-white" />
          ) : (
            <ChevronsLeft size={16} className="text-white" />
          )}
        </Button>
      </div>

      {/* Navigation Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <TooltipProvider delayDuration={0}>
          <ScrollArea className="flex-1 h-full">
            <div className={cn(
              "py-2 space-y-2",
              isCollapsed ? "px-2" : "px-2"
            )}>
              {Object.entries(menuItems).map(([key, menu]) => (
                <div key={key} className="w-full">
                  {renderMenuSection(key, menu)}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TooltipProvider>

        {/* Footer with animation */}
        {!isCollapsed && (
          <div className="p-3 border-t border-[#F5EEE9] animate-in fade-in slide-in-from-bottom-2 duration-300 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-black truncate">Event Actions</span>
              <span className="text-red-600 flex-shrink-0">Ready</span>
            </div>
          </div>
        )}
        
        {isCollapsed && (
          <div className="p-2 border-t border-[#F5EEE9] flex justify-center">
            <div className="h-1 w-6 bg-red-600 rounded-full"></div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SecondarySidebar;