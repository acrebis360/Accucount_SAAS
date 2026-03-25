// contexts/SidebarContext.js
'use client';
import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [isSecondarySidebarOpen, setIsSecondarySidebarOpen] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);

  const openSecondarySidebar = (eventData) => {
    console.log("Opening sidebar with data:", eventData);
    setSelectedEventData(eventData);
    setIsSecondarySidebarOpen(true);
  };

  const closeSecondarySidebar = () => {
    console.log("Closing sidebar");
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