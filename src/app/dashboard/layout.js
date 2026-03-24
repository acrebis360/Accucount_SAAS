// components/layouts/AdminLayout.js
'use client'
import { useState } from 'react';
import { cn } from '@/lib/utils';
import MainSidebar from '@/components/ui/layouts/MainSidebar';
import Header from '@/components/ui/layouts/Header';

const AdminLayout = ({ children }) => {
  const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Main Sidebar */}
        <MainSidebar
          isOpen={isMainSidebarOpen} 
          onToggle={() => setIsMainSidebarOpen(!isMainSidebarOpen)}
        />

        {/* Main Content Area */}
        <div className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          !isMainSidebarOpen && "md:ml-0"
        )}>
          <Header 
            onToggleMainSidebar={() => setIsMainSidebarOpen(!isMainSidebarOpen)}
            isMainSidebarOpen={isMainSidebarOpen}
          />
          
          <main className="flex-1 overflow-y-auto p-6 bg-[#F5EEE9]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;