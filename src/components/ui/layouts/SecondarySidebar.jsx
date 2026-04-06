// components/ui/layouts/SecondarySidebar.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckCircle, 
  Eye, 
  CheckSquare,
  RefreshCw,
  X
} from 'lucide-react';
import { 
  Calculator,
  WrenchIcon,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import * as Tooltip from '@radix-ui/react-tooltip';

const SecondarySidebar = ({ isOpen, onClose, eventData }) => {
  const pathname = usePathname();
  const { closeSecondarySidebar } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick = () => {
    // Handle navigation
    if (onClose) onClose();
  };

  const menuItems = [
    { label: 'Event Dashboard', icon: LayoutDashboard, path: '/dashboard/live/event-dashboard/2', category: 'Execute' },
    { label: 'Count', icon: Calculator, path: '/dashboard/live/count/2', category: 'Execute' },
    { label: 'Fix', icon: WrenchIcon, path: '/dashboard/live/audit-fix', category: 'Execute' },
    { label: 'Validation', icon: CheckCircle, path: '/dashboard/live/validation', category: 'Execute' },
    { label: 'Close Out', icon: CheckCircle2, path: '/dashboard/live/closeout', category: 'Execute' },
    { label: 'Team Productivity', icon: Users, path: '/dashboard/team-productivity', category: 'Review' },
    { label: 'Discrepancy Dashboard', icon: AlertTriangle, path: '/dashboard/discrepancy-dashboard', category: 'Review' },
    { label: 'Event Reports', icon: FileText, path: '/dashboard/event-reports', category: 'Review' },
    { label: 'Reconciliation Workspace', icon: LayoutDashboard, path: '/dashboard/reconciliation-workspace', category: 'Reconciliation' },
    { label: 'Adjustment Preview', icon: Eye, path: '/dashboard/adjustment-preview', category: 'Reconciliation' },
    { label: 'Approval Workflow', icon: CheckSquare, path: '/dashboard/approval-workflow', category: 'Reconciliation' },
    { label: 'Inventory Adjustment Posting', icon: RefreshCw, path: '/dashboard/adjustment-posting', category: 'Reconciliation' }
  ];

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Execute': return 'text-red-600';
      case 'Review': return 'text-blue-600';
      case 'Reconciliation': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isActive = pathname === item.path || pathname.startsWith(item.path);
    
    return (
      <Tooltip.Provider key={item.path} delayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Link href={item.path} onClick={handleLinkClick}>
              <div className={cn(
                "flex items-center justify-center rounded-lg p-2.5 transition-all duration-200 ease-in-out cursor-pointer",
                isActive 
                  ? "bg-red-600 text-white shadow-md"
                  : "text-black hover:bg-[#F5EEE9] hover:text-black hover:shadow-md"
              )}>
                <Icon size={20} className={cn(
                  "transition-all duration-200 flex-shrink-0",
                  isActive 
                    ? "text-white"
                    : getCategoryColor(item.category),
                  !isActive && "hover:scale-110 hover:rotate-3"
                )} />
              </div>
            </Link>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="z-[100] px-2.5 py-1.5 bg-gray-900 text-white text-sm rounded-md shadow-lg border border-gray-700 animate-in fade-in zoom-in-95 duration-200"
              side="right"
              sideOffset={8}
            >
              {item.label}
              <Tooltip.Arrow className="fill-gray-900" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  };

  // Group items by category for visual separation
  const groupedItems = {
    Execute: menuItems.filter(item => item.category === 'Execute'),
    Review: menuItems.filter(item => item.category === 'Review'),
    Reconciliation: menuItems.filter(item => item.category === 'Reconciliation')
  };

  // Don't render anything on the server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  if (!isOpen) return null;

  return (
    <aside className="relative h-screen bg-white text-black flex flex-col w-14">
      {/* Header Section */}
      <div className="flex h-14 items-center justify-center flex-shrink-0 border-b border-[#F5EEE9] bg-black relative">
        <div className="flex items-center justify-center w-full">
        
        </div>
        
      
      </div>

      {/* Navigation Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <ScrollArea className="flex-1 h-full">
          <div className="py-3 space-y-4">
            {/* Execute Section */}
            <div className="space-y-1">
              <div className="px-2">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              </div>
              <div className="space-y-1">
                {groupedItems.Execute.map(item => renderMenuItem(item))}
              </div>
            </div>

            {/* Review Section */}
            <div className="space-y-1">
              <div className="px-2">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              </div>
              <div className="space-y-1">
                {groupedItems.Review.map(item => renderMenuItem(item))}
              </div>
            </div>

            {/* Reconciliation Section */}
            <div className="space-y-1">
              <div className="px-2">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              </div>
              <div className="space-y-1">
                {groupedItems.Reconciliation.map(item => renderMenuItem(item))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-[#F5EEE9] flex justify-center">
          <div className="h-1 w-6 bg-red-600 rounded-full"></div>
        </div>
      </div>
    </aside>
  );
};

export default SecondarySidebar;