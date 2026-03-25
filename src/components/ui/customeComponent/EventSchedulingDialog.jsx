// components/EventSchedulingDialog.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Minimize2,
  Maximize2,
  EyeClosedIcon,
  Calendar,
  Users,
  Store,
  Clock,
  User,
  ChevronDown,
  Search,
  X,
  Check,
  Radio,
  CalendarDays,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function EventSchedulingDialog({
  open,
  onOpenChange,
  defaultEvent,
  customers = [],
  onSave,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [showSupervisorDropdown, setShowSupervisorDropdown] = useState(false);
  const [showManagerDropdown, setShowManagerDropdown] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [storeSearch, setStoreSearch] = useState("");
  const [supervisorSearch, setSupervisorSearch] = useState("");
  const [managerSearch, setManagerSearch] = useState("");
  const searchRef = useRef(null);
  const [eventName, setEventName] = useState("");

  const [formData, setFormData] = useState({
    customerId: "",
    stockDateTime: "",
    storeId: "",
    accountSupervisorId: "",
    outletManagerId: "",
    auditMode: "rescan",
  });

  // Sample customers data
  const sampleCustomers = [
    { id: 1, name: "TechCorp Solutions", email: "contact@techcorp.com" },
    { id: 2, name: "Global Retail Inc.", email: "info@globalretail.com" },
    { id: 3, name: "EcoFood Distributors", email: "sales@ecofood.com" },
    { id: 4, name: "MediCare Pharmaceuticals", email: "support@medicarepharma.com" },
    { id: 5, name: "AutoMotive Parts Co.", email: "orders@automotiveparts.com" },
  ];

  // Sample stores data (grouped by customer)
  const sampleStores = [
    { id: 1, customerId: 1, name: "TechCorp Downtown Store", address: "123 Tech Street, San Francisco" },
    { id: 2, customerId: 1, name: "TechCorp Innovation Hub", address: "456 Innovation Drive, San Jose" },
    { id: 3, customerId: 2, name: "Global Retail - Main Branch", address: "789 Market Ave, New York" },
    { id: 4, customerId: 3, name: "EcoFood - North District", address: "321 Green Blvd, Portland" },
    { id: 5, customerId: 4, name: "MediCare Pharmacy - Downtown", address: "654 Health Lane, Boston" },
  ];

  // Sample supervisors and managers
  const sampleSupervisors = [
    { id: 1, name: "John Smith", email: "john.smith@company.com" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@company.com" },
    { id: 3, name: "Michael Chen", email: "michael.c@company.com" },
    { id: 4, name: "Lisa Williams", email: "lisa.w@company.com" },
  ];

  const sampleManagers = [
    { id: 1, name: "Robert Wilson", phone: "+1 (555) 123-4567" },
    { id: 2, name: "Emily Davis", phone: "+1 (555) 987-6543" },
    { id: 3, name: "David Kim", phone: "+1 (555) 456-7890" },
    { id: 4, name: "Maria Garcia", phone: "+1 (555) 234-5678" },
  ];

  // Use provided data or sample data
  const displayCustomers = customers.length > 0 ? customers : sampleCustomers;
  const displayStores = sampleStores;
  const displaySupervisors = sampleSupervisors;
  const displayManagers = sampleManagers;

  // Filter data based on search
  const filteredCustomers = customerSearch 
    ? displayCustomers.filter(customer =>
        customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        customer.email.toLowerCase().includes(customerSearch.toLowerCase())
      )
    : displayCustomers;

  const filteredStores = formData.customerId 
    ? displayStores
        .filter(store => store.customerId.toString() === formData.customerId)
        .filter(store =>
          storeSearch ? store.name.toLowerCase().includes(storeSearch.toLowerCase()) : true
        )
    : [];

  const filteredSupervisors = supervisorSearch
    ? displaySupervisors.filter(supervisor =>
        supervisor.name.toLowerCase().includes(supervisorSearch.toLowerCase()) ||
        supervisor.email.toLowerCase().includes(supervisorSearch.toLowerCase())
      )
    : displaySupervisors;

  const filteredManagers = managerSearch
    ? displayManagers.filter(manager =>
        manager.name.toLowerCase().includes(managerSearch.toLowerCase()) ||
        manager.phone.includes(managerSearch)
      )
    : displayManagers;

  // Get selected objects
  const selectedCustomer = displayCustomers.find(c => c.id.toString() === formData.customerId);
  const selectedStore = displayStores.find(s => s.id.toString() === formData.storeId);
  const selectedSupervisor = displaySupervisors.find(s => s.id.toString() === formData.accountSupervisorId);
  const selectedManager = displayManagers.find(m => m.id.toString() === formData.outletManagerId);

  // Initialize form with default event data
  useEffect(() => {
    if (defaultEvent) {
      setFormData({
        customerId: defaultEvent.customerId || "",
        stockDateTime: defaultEvent.stockDateTime || "",
        storeId: defaultEvent.storeId || "",
        accountSupervisorId: defaultEvent.accountSupervisorId || "",
        outletManagerId: defaultEvent.outletManagerId || "",
        auditMode: defaultEvent.auditMode || "rescan",
      });
      setEventName(defaultEvent.name || "");
    } else {
      // Reset to defaults
      setFormData({
        customerId: "",
        stockDateTime: "",
        storeId: "",
        accountSupervisorId: "",
        outletManagerId: "",
        auditMode: "rescan",
      });
      setEventName("");
    }
  }, [defaultEvent, open]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowCustomerDropdown(false);
        setShowStoreDropdown(false);
        setShowSupervisorDropdown(false);
        setShowManagerDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear dependent fields when customer changes
    if (field === "customerId" && value !== formData.customerId) {
      setFormData(prev => ({
        ...prev,
        storeId: "",
        accountSupervisorId: "",
        outletManagerId: "",
      }));
    }
  };

  const handleSelectCustomer = (customer) => {
    handleInputChange("customerId", customer.id.toString());
    setShowCustomerDropdown(false);
    setCustomerSearch("");
  };

  const handleSelectStore = (store) => {
    handleInputChange("storeId", store.id.toString());
    setShowStoreDropdown(false);
    setStoreSearch("");
  };

  const handleSelectSupervisor = (supervisor) => {
    handleInputChange("accountSupervisorId", supervisor.id.toString());
    setShowSupervisorDropdown(false);
    setSupervisorSearch("");
  };

  const handleSelectManager = (manager) => {
    handleInputChange("outletManagerId", manager.id.toString());
    setShowManagerDropdown(false);
    setManagerSearch("");
  };

  const clearField = (field) => {
    handleInputChange(field, "");
  };

  const handleSubmit = async () => {
    if (!eventName.trim()) {
      toast.error("Please enter an event name");
      return;
    }

    if (!formData.customerId) {
      toast.error("Please select a customer");
      return;
    }

    if (!formData.stockDateTime) {
      toast.error("Please select stock date & time");
      return;
    }

    if (!formData.storeId) {
      toast.error("Please select a store");
      return;
    }

    if (!formData.accountSupervisorId) {
      toast.error("Please select an account supervisor");
      return;
    }

    if (!formData.outletManagerId) {
      toast.error("Please select an outlet manager");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Scheduling event...");

    try {
      // Prepare event data
      const eventData = {
        ...formData,
        name: eventName,
        customerName: selectedCustomer?.name || "",
        storeName: selectedStore?.name || "",
        accountSupervisorName: selectedSupervisor?.name || "",
        outletManagerName: selectedManager?.name || "",
        createdAt: new Date().toISOString(),
        status: "scheduled",
        uniqueId: `EVT-${Date.now()}`,
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Call the onSave callback if provided
      if (onSave) {
        await onSave(eventData);
      }

      toast.success("Event scheduled successfully!", { id: toastId });

      // Reset form
      setFormData({
        customerId: "",
        stockDateTime: "",
        storeId: "",
        accountSupervisorId: "",
        outletManagerId: "",
        auditMode: "rescan",
      });
      setEventName("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error scheduling event:", error);
      toast.error("Failed to schedule event. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearAll = () => {
    setFormData({
      customerId: "",
      stockDateTime: "",
      storeId: "",
      accountSupervisorId: "",
      outletManagerId: "",
      auditMode: "rescan",
    });
    setEventName("");
    setCustomerSearch("");
    setStoreSearch("");
    setSupervisorSearch("");
    setManagerSearch("");
    toast.success("Form cleared");
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];
  
  // Get next year for max date
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const maxDate = nextYear.toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${
            isFullscreen
              ? "w-full h-full max-w-none max-h-none rounded-none"
              : "!w-[80vw] !max-w-[95vw] max-h-[90vh] mx-auto my-0"
          }
          overflow-hidden flex flex-col p-0
        `}
      >
        {/* Dialog Header */}
        <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  {defaultEvent ? "Edit Event Schedule" : "Schedule New Event"}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <span className="text-xs bg-gray-100 text-gray-800 bg-purple-200 px-2 py-1 rounded-lg mt-1">
                    Event ID: {defaultEvent?.uniqueId || "EVT-2024-001"}
                  </span>
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="h-8 w-8 p-0"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0"
              >
                <EyeClosedIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Dialog Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Removed max-w-4xl container to make content full width */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Event Scheduling Details
                </h3>
                <div className="text-sm text-gray-500">
                  Required fields are marked with *
                </div>
              </div>

              <div className="space-y-6">
                {/* Event Name */}
                <div className="space-y-2">
                  <label htmlFor="eventName" className="text-sm font-medium flex items-center gap-1">
                    Event Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="eventName"
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="Enter event name (e.g., Q1 Inventory Audit)"
                      className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Customer Dropdown - Full width */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    Customer <span className="text-red-500">*</span>
                  </label>
                  <div className="relative" ref={searchRef}>
                    <div 
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none flex items-center justify-between cursor-pointer hover:bg-gray-50"
                      onClick={() => setShowCustomerDropdown(true)}
                    >
                      {selectedCustomer ? (
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900">{selectedCustomer.name}</div>
                            <div className="text-xs text-gray-600">{selectedCustomer.email}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500">Select a customer...</span>
                      )}
                      <div className="flex items-center gap-2">
                        {selectedCustomer && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearField("customerId");
                            }}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showCustomerDropdown ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Customer Dropdown */}
                    {showCustomerDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search customers..."
                              value={customerSearch}
                              onChange={(e) => setCustomerSearch(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              autoFocus
                            />
                          </div>
                        </div>

                        <div className="py-1">
                          {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => (
                              <div
                                key={customer.id}
                                className={`px-4 py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${formData.customerId === customer.id.toString() ? 'bg-blue-50' : ''}`}
                                onClick={() => handleSelectCustomer(customer)}
                              >
                                <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                  <Users className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 truncate">{customer.name}</div>
                                  <div className="text-xs text-gray-600 truncate">{customer.email}</div>
                                </div>
                                {formData.customerId === customer.id.toString() && (
                                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center">
                              <Users className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                              <p className="text-gray-500">No customers found</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stock Date & Time - Full width */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    Stock Date & Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      value={formData.stockDateTime}
                      onChange={(e) => handleInputChange("stockDateTime", e.target.value)}
                      min={today}
                      max={maxDate}
                      className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <div className="absolute right-3 top-3">
                      <CalendarDays className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Store Dropdown - Full width */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    Store <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div 
                      className={`w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none flex items-center justify-between cursor-pointer ${!formData.customerId ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                      onClick={() => formData.customerId && setShowStoreDropdown(true)}
                    >
                      {selectedStore ? (
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                            <Store className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900">{selectedStore.name}</div>
                            <div className="text-xs text-gray-600">{selectedStore.address}</div>
                          </div>
                        </div>
                      ) : (
                        <span className={`${!formData.customerId ? 'text-gray-400' : 'text-gray-500'}`}>
                          {!formData.customerId ? "Select a customer first" : "Select a store..."}
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        {selectedStore && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearField("storeId");
                            }}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                        <ChevronDown className={`h-4 w-4 ${!formData.customerId ? 'text-gray-300' : 'text-gray-400'} transition-transform ${showStoreDropdown ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Store Dropdown */}
                    {showStoreDropdown && formData.customerId && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search stores..."
                              value={storeSearch}
                              onChange={(e) => setStoreSearch(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              autoFocus
                            />
                          </div>
                        </div>

                        <div className="py-1">
                          {filteredStores.length > 0 ? (
                            filteredStores.map((store) => (
                              <div
                                key={store.id}
                                className={`px-4 py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${formData.storeId === store.id.toString() ? 'bg-blue-50' : ''}`}
                                onClick={() => handleSelectStore(store)}
                              >
                                <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                  <Store className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 truncate">{store.name}</div>
                                  <div className="text-xs text-gray-600 truncate">{store.address}</div>
                                </div>
                                {formData.storeId === store.id.toString() && (
                                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center">
                              <Store className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                              <p className="text-gray-500">No stores found for this customer</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Supervisor Dropdown - Full width */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    ACCOUNT Supervisor <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div 
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none flex items-center justify-between cursor-pointer hover:bg-gray-50"
                      onClick={() => setShowSupervisorDropdown(true)}
                    >
                      {selectedSupervisor ? (
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900">{selectedSupervisor.name}</div>
                            <div className="text-xs text-gray-600">{selectedSupervisor.email}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500">Select ACCOUNT supervisor...</span>
                      )}
                      <div className="flex items-center gap-2">
                        {selectedSupervisor && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearField("accountSupervisorId");
                            }}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showSupervisorDropdown ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Supervisor Dropdown */}
                    {showSupervisorDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search supervisors..."
                              value={supervisorSearch}
                              onChange={(e) => setSupervisorSearch(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              autoFocus
                            />
                          </div>
                        </div>

                        <div className="py-1">
                          {filteredSupervisors.length > 0 ? (
                            filteredSupervisors.map((supervisor) => (
                              <div
                                key={supervisor.id}
                                className={`px-4 py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${formData.accountSupervisorId === supervisor.id.toString() ? 'bg-blue-50' : ''}`}
                                onClick={() => handleSelectSupervisor(supervisor)}
                              >
                                <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                  <User className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 truncate">{supervisor.name}</div>
                                  <div className="text-xs text-gray-600 truncate">{supervisor.email}</div>
                                </div>
                                {formData.accountSupervisorId === supervisor.id.toString() && (
                                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center">
                              <User className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                              <p className="text-gray-500">No supervisors found</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Outlet Manager Dropdown - Full width */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    Outlet Manager <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div 
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none flex items-center justify-between cursor-pointer hover:bg-gray-50"
                      onClick={() => setShowManagerDropdown(true)}
                    >
                      {selectedManager ? (
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-amber-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900">{selectedManager.name}</div>
                            <div className="text-xs text-gray-600">{selectedManager.phone}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500">Select outlet manager...</span>
                      )}
                      <div className="flex items-center gap-2">
                        {selectedManager && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearField("outletManagerId");
                            }}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showManagerDropdown ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Manager Dropdown */}
                    {showManagerDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search managers..."
                              value={managerSearch}
                              onChange={(e) => setManagerSearch(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              autoFocus
                            />
                          </div>
                        </div>

                        <div className="py-1">
                          {filteredManagers.length > 0 ? (
                            filteredManagers.map((manager) => (
                              <div
                                key={manager.id}
                                className={`px-4 py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${formData.outletManagerId === manager.id.toString() ? 'bg-blue-50' : ''}`}
                                onClick={() => handleSelectManager(manager)}
                              >
                                <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                  <User className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 truncate">{manager.name}</div>
                                  <div className="text-xs text-gray-600 truncate">{manager.phone}</div>
                                </div>
                                {formData.outletManagerId === manager.id.toString() && (
                                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center">
                              <User className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                              <p className="text-gray-500">No managers found</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview Card - Full width */}
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <h4 className="font-medium text-sm text-gray-700 mb-4">
                      Event Preview
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            {eventName || (formData.customerId ? `${selectedCustomer?.name} Audit` : "New Audit Event")}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {formData.stockDateTime ? (
                              `Scheduled for ${new Date(formData.stockDateTime).toLocaleString()}`
                            ) : (
                              "No date selected"
                            )}
                          </div>
                          <div className="flex flex-wrap gap-3 mt-3">
                            {formData.storeId && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Store className="h-3 w-3 mr-1" />
                                {selectedStore?.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Assigned Personnel */}
                      {(selectedSupervisor || selectedManager) && (
                        <div className="pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedSupervisor && (
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Account Supervisor</div>
                                <div className="text-sm font-medium flex items-center gap-2">
                                  <User className="h-3 w-3 text-purple-500" />
                                  {selectedSupervisor.name}
                                </div>
                              </div>
                            )}
                            {selectedManager && (
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Outlet Manager</div>
                                <div className="text-sm font-medium flex items-center gap-2">
                                  <User className="h-3 w-3 text-amber-500" />
                                  {selectedManager.name}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                {defaultEvent ? "Edit Event" : "New Event Schedule"}
              </span>
              <span className="mx-2">•</span>
              {eventName && formData.customerId && formData.stockDateTime && formData.storeId && formData.accountSupervisorId && formData.outletManagerId ? (
                <span className="text-green-600">Ready to schedule</span>
              ) : (
                <span className="text-red-600">Required fields missing</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  handleClearAll();
                }}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={handleClearAll}
                disabled={isSubmitting}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white gap-2"
                onClick={handleSubmit}
                disabled={isSubmitting || !eventName || !formData.customerId || !formData.stockDateTime || !formData.storeId || !formData.accountSupervisorId || !formData.outletManagerId}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    {defaultEvent ? "Update Schedule" : "Schedule Event"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}