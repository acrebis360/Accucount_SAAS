// src/context/SidebarContext.jsx
import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {  // Added 'export' keyword
  const [activeMainMenu, setActiveMainMenu] = useState('inventory');
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(true);

  return (
    <SidebarContext.Provider
      value={{
        activeMainMenu,
        setActiveMainMenu,
        isSecondaryOpen,
        setIsSecondaryOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};