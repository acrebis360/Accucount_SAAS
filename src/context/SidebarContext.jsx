'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const pathname = usePathname();

  const [isSecondarySidebarOpen, setIsSecondarySidebarOpen] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);

  // ✅ 1. Auto-open sidebar based on URL
useEffect(() => {
  if (pathname.startsWith('/dashboard/live')) {
    setIsSecondarySidebarOpen(true);
  } else {
    setIsSecondarySidebarOpen(false);
    setSelectedEventData(null);
  }
}, [pathname]);



  const openSecondarySidebar = (eventData) => {
    console.log("Opening sidebar with data:", eventData);
    setSelectedEventData(eventData);
    setIsSecondarySidebarOpen(true);
  };

  const closeSecondarySidebar = () => {
    console.log("Closing sidebar");

    // ❗ Prevent closing if user is on /dashboard/live
    if (pathname.startsWith('/dashboard/live')) return;

    setIsSecondarySidebarOpen(false);
    setSelectedEventData(null);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSecondarySidebarOpen,
        selectedEventData,
        openSecondarySidebar,
        closeSecondarySidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};