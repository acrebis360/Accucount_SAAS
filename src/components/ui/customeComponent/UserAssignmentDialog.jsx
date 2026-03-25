// components/UserAssignmentDialog.jsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Minimize2,
  Maximize2,
  EyeClosedIcon,
  Users,
  User,
  Download,
  Save,
  X,
  ChevronDown,
  Building,
  UserCircle,
  PlayCircle,
  Trash2,
  Edit2,
  RefreshCw,
  MoreVertical,
  Check
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function UserAssignmentDialog({
  open,
  onOpenChange,
  eventData,
  eventId = 1,
  uniqueId,
  onAssignComplete,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  // User count controls
  const [roleCounts, setRoleCounts] = useState(() => {
    // Initial dummy counts
    return { Counter: 2, Auditor: 1, Supervisor: 1, Customer: 1 };
  });

  // Table data
  const [tableData, setTableData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Dummy users data
  const dummyUsersData = {
    event: {
      userRoles: [
        {
          id: 1,
          userId: 101,
          roleType: "Counter",
          role: { name: "Counter" },
          user: { name: "John Doe", phone: "+1234567890" },
          pinCode: "1234",
          authCode: "AUTH001"
        },
        {
          id: 2,
          userId: 102,
          roleType: "Auditor",
          role: { name: "Auditor" },
          user: { name: "Jane Smith", phone: "+9876543210" },
          pinCode: "5678",
          authCode: "AUTH002"
        },
        {
          id: 3,
          userId: 103,
          roleType: "Supervisor",
          role: { name: "Supervisor" },
          user: { name: "Bob Johnson", phone: "+5551234567" },
          pinCode: "9012",
          authCode: "AUTH003"
        }
      ]
    }
  };

  // Helper to map API user roles to table data structure
  const mapApiUsersToTable = (apiUsers) => {
    if (!Array.isArray(apiUsers)) return [];

    const roleCounts = { Counter: 0, Auditor: 0, Supervisor: 0, Customer: 0 };
    return apiUsers.map((u, index) => {
      // Extract data from nested structures (handles both string and object role/user)
      const rawRole = u.roleType || u.role;
      const roleName = typeof rawRole === 'object' ? rawRole?.name : rawRole;
      const userName = u.user?.name || u.name || "";
      const userPhone = u.user?.phone || u.phone || "";
      const pin = u.pinCode || u.pin || "";
      const authCode = u.authCode || "";

      // Normalize roleName to match our controls (e.g., "Counter", "Auditor")
      let normalizedRole = "Counter";
      const rn = (roleName || "").toString().toLowerCase();
      if (rn.includes("counter")) normalizedRole = "Counter";
      else if (rn.includes("auditor")) normalizedRole = "Auditor";
      else if (rn.includes("supervisor")) normalizedRole = "Supervisor";
      else if (rn.includes("customer")) normalizedRole = "Customer";

      // Increment count for this role to generate label
      roleCounts[normalizedRole] = (roleCounts[normalizedRole] || 0) + 1;
      const currentRoleIndex = u.roleIndex || roleCounts[normalizedRole];

      return {
        id: index + 1,
        userId: u.id || u.userId || u.user?.id,
        role: `${normalizedRole} ${currentRoleIndex}`,
        roleType: normalizedRole,
        name: userName,
        phone: userPhone,
        authCode: authCode,
        pin: pin,
        isSaved: true,
        loading: false
      };
    });
  };

  const updateCountsFromData = (data) => {
    if (!Array.isArray(data)) return;

    const counts = { Counter: 0, Auditor: 0, Supervisor: 0, Customer: 0 };
    data.forEach(u => {
      const rawRole = u.roleType || u.role;
      const roleName = typeof rawRole === 'object' ? rawRole?.name : rawRole;
      const rn = (roleName || "").toString().toLowerCase();

      if (rn.includes("counter")) counts.Counter++;
      else if (rn.includes("auditor")) counts.Auditor++;
      else if (rn.includes("supervisor")) counts.Supervisor++;
      else if (rn.includes("customer")) counts.Customer++;
    });

    setRoleCounts(prev => ({
      Counter: Math.max(prev.Counter, counts.Counter),
      Auditor: Math.max(prev.Auditor, counts.Auditor),
      Supervisor: Math.max(prev.Supervisor, counts.Supervisor),
      Customer: Math.max(prev.Customer, counts.Customer)
    }));
  };

  // Sync with props and prepopulate existing data
  useEffect(() => {
    if (eventData && open) {
      console.log("Syncing with eventData prop:", eventData);
      setSelectedEvent(eventData.title || "Q1 Inventory Audit - Spring 2024");
      setSelectedCustomer(eventData.store?.store_name || eventData.store?.name || eventData.location || "TechCorp Downtown Store");

      const roles = eventData.userRoles || eventData.users || [];
      if (roles.length > 0) {
        console.log("Setting initial users from props:", roles);
        updateCountsFromData(roles);
      }
    }
  }, [eventData, open]);

  // Simulate fetching users data
  useEffect(() => {
    if (open && !isLoading) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const data = dummyUsersData?.event?.userRoles || dummyUsersData?.userRoles || (Array.isArray(dummyUsersData) ? dummyUsersData : (dummyUsersData?.data || []));
        console.log("Syncing with usersData fetch:", data);

        if (Array.isArray(data)) {
          updateCountsFromData(data);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [open]);

  const handleRefresh = async () => {
    const toastId = toast.loading("Refreshing user data...");
    setIsFetching(true);
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("User data updated", { id: toastId });
    } catch (error) {
      console.error('Refresh error:', error);
      toast.error("Failed to refresh data", { id: toastId });
    } finally {
      setIsFetching(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Remove access for ${userName || 'this user'}?`)) {
      const toastId = toast.loading("Removing user...");
      setIsDeleting(true);
      try {
        // Simulate delete API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove from table data
        setTableData(prev => prev.filter(row => row.userId !== userId));
        
        // Update role counts
        const remainingRows = tableData.filter(row => row.userId !== userId);
        const newCounts = { Counter: 0, Auditor: 0, Supervisor: 0, Customer: 0 };
        remainingRows.forEach(row => {
          newCounts[row.roleType]++;
        });
        setRoleCounts(newCounts);
        
        toast.success("User assignment removed", { id: toastId });
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete user", { id: toastId });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleUpdateUser = async (userId, updatedData) => {
    const toastId = toast.loading("Updating user...");
    setIsUpdating(true);
    try {
      // Simulate update API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update table data
      setTableData(prev => prev.map(row => 
        row.userId === userId 
          ? { ...row, ...updatedData, isSaved: true }
          : row
      ));
      
      toast.success("User details updated", { id: toastId });
      setEditingId(null);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update user", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const customerStores = [
    { id: 1, store_name: "Downtown Superstore" },
    { id: 2, store_name: "Westgate Mall" },
    { id: 3, store_name: "Northside Retail Center" }
  ];

  const isActivated = eventData?.status?.toLowerCase() === "active" ||
    eventData?.status?.toLowerCase() === "live" ||
    eventData?.status?.toLowerCase() === "completed";

  // Initialize/Update table data when counts or server data change while preserving existing data
  useEffect(() => {
    // Only synchronize if the dialog is open
    if (!open) return;

    setTableData(prev => {
      // Use dummy data
      const apiDataRaw = dummyUsersData?.event?.userRoles || dummyUsersData?.userRoles || (Array.isArray(dummyUsersData) ? dummyUsersData : (dummyUsersData?.data || []));

      // Determine if we actually have a fresh, successful response from the API
      const hasApiData = true; // Always true for dummy data
      const apiRows = hasApiData ? mapApiUsersToTable(apiDataRaw) : [];

      const existingData = [...prev];
      const newData = [];
      let idCounter = 1;

      const roles = [
        { type: 'Counter', count: roleCounts.Counter },
        { type: 'Auditor', count: roleCounts.Auditor },
        { type: 'Supervisor', count: roleCounts.Supervisor },
        { type: 'Customer', count: roleCounts.Customer }
      ];

      roles.forEach(roleInfo => {
        for (let i = 0; i < roleInfo.count; i++) {
          const roleLabel = `${roleInfo.type} ${i + 1}`;

          const apiMatch = apiRows.find(item => item.role === roleLabel);
          const localMatch = existingData.find(item => item.role === roleLabel);

          if (apiMatch) {
            // Priority 1: Data from server (always trust server for saved items)
            newData.push({ ...apiMatch, id: idCounter++ });
          } else if (localMatch) {
            // Priority 2: Local data (pending/unsaved)
            if (localMatch.isSaved && hasApiData) {
              newData.push({
                id: idCounter++,
                role: roleLabel,
                roleType: roleInfo.type,
                name: "",
                phone: "",
                authCode: "",
                pin: "",
                isSaved: false,
                loading: false
              });
            } else {
              newData.push({ ...localMatch, id: idCounter++ });
            }
          } else {
            // Priority 3: New empty row
            newData.push({
              id: idCounter++,
              role: roleLabel,
              roleType: roleInfo.type,
              name: "",
              phone: "",
              authCode: "",
              pin: "",
              isSaved: false,
              loading: false
            });
          }
        }
      });

      return newData;
    });
  }, [roleCounts, open]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleNameChange = (id, value) => {
    setTableData(prev => prev.map(item =>
      item.id === id ? { ...item, name: value } : item
    ));
  };

  const handlePhoneChange = (id, value) => {
    setTableData(prev => prev.map(item =>
      item.id === id ? { ...item, phone: value } : item
    ));
  };

  const handleSaveRow = async (id) => {
    const row = tableData.find(r => r.id === id);
    if (!row) return;

    const setRowLoading = (id, loading) => {
      setTableData(prev => prev.map(item =>
        item.id === id ? { ...item, loading } : item
      ));
    };

    try {
      setRowLoading(id, true);

      const rolePart = row.role.split(' ').pop();
      const roleIndex = parseInt(rolePart) || 1;
      const payload = {
        eventId: eventData?.id || eventId,
        role: row.roleType,
        roleIndex: roleIndex,
        name: row.name,
        phone: row.phone,
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = { success: true, data: { id: Math.floor(Math.random() * 1000), authCode: `AUTH${Math.floor(Math.random() * 10000)}`, pinCode: Math.floor(Math.random() * 10000).toString() } };

      if (response && response.success) {
        const { authCode, pinCode } = response.data || {};
        const newUserId = response.data?.id || response.data?.userId || response.data?.user?.id;

        setTableData(prev => prev.map(item =>
          item.id === id ? {
            ...item,
            userId: newUserId || item.userId,
            authCode: authCode || item.authCode,
            pin: pinCode || item.pin,
            isSaved: true
          } : item
        ));

        toast.success(`Successfully assigned ${row.name || "user"}`);

        // Simulate setEventUpcoming
        if (!isActivated) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    } catch (error) {
      console.error("Failed to assign user:", error);
      toast.error("Failed to save assignment");
    } finally {
      setRowLoading(id, false);
    }
  };

  const handleDownload = () => {
    if (tableData.length === 0) return;

    // Prepare data for download
    const downloadData = tableData.map(row => ({
      'Event': selectedEvent,
      'Customer': selectedCustomer,
      'Role': row.role,
      'Name': row.name,
      'Phone': row.phone,
      'Auth Code': row.authCode,
      'PIN': row.pin,
      'Status': row.isSaved ? 'Saved' : 'Pending'
    }));

    // Convert to CSV
    const headers = Object.keys(downloadData[0]).join(',');
    const rows = downloadData.map(row =>
      Object.values(row).map(val =>
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    );
    const csv = [headers, ...rows].join('\n');

    // Create and trigger download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assignment_${selectedEvent.replace(/\s+/g, '_')}_${selectedCustomer.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success("CSV downloaded successfully");
  };

  const handleDownloadPDF = async () => {
    const toastId = toast.loading("Downloading PDF report...");
    try {
      // Simulate PDF download
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a dummy PDF (actually a text file for simulation)
      const blob = new Blob(["Dummy PDF Report Content"], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `event_users_report_${eventData?.uniqueId || uniqueId || eventId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF Report downloaded successfully", { id: toastId });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download PDF report", { id: toastId });
    }
  };

  const handleSaveAll = async () => {
    // Save all rows that have name and phone filled
    const rowsToSave = tableData.filter(row => row.name && row.phone && !row.isSaved);

    if (rowsToSave.length === 0) {
      toast.error("No pending assignments with name and phone to save.");
      return;
    }

    // Save sequentially to avoid race conditions or heavy load
    for (const row of rowsToSave) {
      await handleSaveRow(row.id);
    }

    if (onAssignComplete) {
      onAssignComplete({
        event: selectedEvent,
        customer: selectedCustomer,
        users: tableData
      });
    }

    toast.success(`Successfully saved ${rowsToSave.length} users`);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const getRoleColor = (roleType) => {
    switch (roleType) {
      case 'Counter': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Auditor': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Supervisor': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Customer': return 'bg-amber-100 text-amber-800 border border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${isFullscreen
            ? "w-full h-full max-w-none max-h-none rounded-none"
            : "!w-[95vw] !max-w-[95vw] max-h-[90vh] mx-auto my-0"
          } overflow-hidden flex flex-col p-0`}
      >
        {/* Dialog Header */}
        <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  Assign Users to Event
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <span className="text-xs bg-gray-100 text-gray-800 bg-purple-200 px-2 py-1 rounded-lg mt-1">
                    Event ID: {eventData?.uniqueId || eventId}
                  </span>
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              </Button>
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

        {/* Dialog Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Event and Customer Selection */}
            <Card className="border-blue-100">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Event and Customer in two columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Name
                      </label>
                      <div className="relative">
                        {eventData?.title || "Q1 Inventory Audit - Spring 2024"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Customer Store
                        </div>
                      </label>
                      <div className="relative">
                        {eventData?.store?.store_name || "TechCorp Downtown Store"}
                      </div>
                    </div>
                  </div>

                  {/* Users for Event Heading */}
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Users for Event
                    </h3>

                    {/* Role Controls - 4 columns grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/30">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="font-medium text-gray-700">Counter</span>
                            <div className="text-xs text-gray-500 mt-1">Count items</div>
                          </div>
                          <span className="text-2xl font-bold text-blue-600">{roleCounts.Counter}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRoleCounts(prev => ({ ...prev, Counter: Math.max(0, prev.Counter - 1) }))}
                            className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-100"
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="0"
                            max="50"
                            value={roleCounts.Counter}
                            onChange={(e) => setRoleCounts(prev => ({ ...prev, Counter: Math.min(50, Math.max(0, parseInt(e.target.value) || 0)) }))}
                            className="text-center border-blue-200"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRoleCounts(prev => ({ ...prev, Counter: Math.min(50, prev.Counter + 1) }))}
                            className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-100"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="border border-green-200 rounded-lg p-4 bg-green-50/30">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="font-medium text-gray-700">Auditor</span>
                            <div className="text-xs text-gray-500 mt-1">Verify counts</div>
                          </div>
                          <span className="text-2xl font-bold text-green-600">{roleCounts.Auditor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRoleCounts(prev => ({ ...prev, Auditor: Math.max(0, prev.Auditor - 1) }))}
                            className="h-8 w-8 p-0 border-green-200 hover:bg-green-100"
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="0"
                            max="50"
                            value={roleCounts.Auditor}
                            onChange={(e) => setRoleCounts(prev => ({ ...prev, Auditor: Math.min(50, Math.max(0, parseInt(e.target.value) || 0)) }))}
                            className="text-center border-green-200"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRoleCounts(prev => ({ ...prev, Auditor: Math.min(50, prev.Auditor + 1) }))}
                            className="h-8 w-8 p-0 border-green-200 hover:bg-green-100"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/30">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="font-medium text-gray-700">Supervisor</span>
                            <div className="text-xs text-gray-500 mt-1">Oversee operations</div>
                          </div>
                          <span className="text-2xl font-bold text-purple-600">{roleCounts.Supervisor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRoleCounts(prev => ({ ...prev, Supervisor: Math.max(0, prev.Supervisor - 1) }))}
                            className="h-8 w-8 p-0 border-purple-200 hover:bg-purple-100"
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="0"
                            max="50"
                            value={roleCounts.Supervisor}
                            onChange={(e) => setRoleCounts(prev => ({ ...prev, Supervisor: Math.min(50, Math.max(0, parseInt(e.target.value) || 0)) }))}
                            className="text-center border-purple-200"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRoleCounts(prev => ({ ...prev, Supervisor: Math.min(50, prev.Supervisor + 1) }))}
                            className="h-8 w-8 p-0 border-purple-200 hover:bg-purple-100"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="border border-amber-200 rounded-lg p-4 bg-amber-50/30">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="font-medium text-gray-700">Customer</span>
                            <div className="text-xs text-gray-500 mt-1">Store representatives</div>
                          </div>
                          <span className="text-2xl font-bold text-amber-600">{roleCounts.Customer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRoleCounts(prev => ({ ...prev, Customer: Math.max(0, prev.Customer - 1) }))}
                            className="h-8 w-8 p-0 border-amber-200 hover:bg-amber-100"
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="0"
                            max="50"
                            value={roleCounts.Customer}
                            onChange={(e) => setRoleCounts(prev => ({ ...prev, Customer: Math.min(50, Math.max(0, parseInt(e.target.value) || 0)) }))}
                            className="text-center border-amber-200"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRoleCounts(prev => ({ ...prev, Customer: Math.min(50, prev.Customer + 1) }))}
                            className="h-8 w-8 p-0 border-amber-200 hover:bg-amber-100"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Table */}
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-blue-100 rounded-xl bg-blue-50/20">
                        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-blue-700 font-semibold animate-pulse">Syncing user data...</p>
                        <p className="text-xs text-blue-400 mt-2 italic">Connecting to inventory server</p>
                      </div>
                    ) : tableData.length > 0 ? (
                      <div className="border rounded-lg overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                              <tr>
                                <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                  Role
                                </th>
                                <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                  Name
                                </th>
                                <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                  Phone
                                </th>
                                <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                  Action
                                </th>
                                <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                  Auth Code
                                </th>
                                <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                  PIN
                                </th>
                                <th className="py-3 px-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap text-center">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {tableData.map((row) => (
                                <tr key={row.id} className="hover:bg-blue-50/30 transition-colors">
                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${getRoleColor(row.roleType)} shadow-sm`}>
                                      {row.role}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <Input
                                      type="text"
                                      placeholder="Full name"
                                      value={row.name}
                                      onChange={(e) => handleNameChange(row.id, e.target.value)}
                                      className="w-full min-w-[180px] bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-500"
                                      disabled={(row.isSaved && editingId !== row.id) || row.loading}
                                    />
                                  </td>
                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <Input
                                      type="tel"
                                      placeholder="Contact number"
                                      value={row.phone}
                                      onChange={(e) => handlePhoneChange(row.id, e.target.value)}
                                      className="w-full min-w-[150px] bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-500"
                                      disabled={(row.isSaved && editingId !== row.id) || row.loading}
                                    />
                                  </td>
                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <Button
                                      size="sm"
                                      onClick={() => handleSaveRow(row.id)}
                                      disabled={!row.name || !row.phone || row.isSaved || row.loading}
                                      className={`gap-2 min-w-[90px] font-bold shadow-sm ${row.isSaved
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                    >
                                      {row.loading ? (
                                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                      ) : row.isSaved ? (
                                        <Check className="h-4 w-4" />
                                      ) : (
                                        <Save className="h-3.5 w-3.5" />
                                      )}
                                      {row.isSaved ? 'Saved' : row.loading ? 'Saving' : 'Save'}
                                    </Button>
                                  </td>
                                  <td className="py-4 px-4 whitespace-nowrap">
                                    {row.isSaved ? (
                                      <div className="flex items-center gap-2 group">
                                        <code className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-sm font-mono font-bold border border-slate-200">
                                          {row.authCode}
                                        </code>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => {
                                            navigator.clipboard.writeText(row.authCode);
                                            toast.success("Auth Code copied");
                                          }}
                                          className="h-7 w-7"
                                          title="Copy code"
                                        >
                                          📋
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-1.5 text-slate-400 italic text-sm">
                                        <div className="h-2 w-2 rounded-full bg-slate-300 animate-pulse" />
                                        Pending
                                      </div>
                                    )}
                                  </td>
                                  <td className="py-4 px-4 whitespace-nowrap">
                                    {row.isSaved ? (
                                      <div className="flex items-center gap-2 group">
                                        <code className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-sm font-mono font-bold border border-slate-200">
                                          {row.pin}
                                        </code>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => {
                                            navigator.clipboard.writeText(row.pin);
                                            toast.success("PIN copied");
                                          }}
                                          className="h-7 w-7"
                                          title="Copy PIN"
                                        >
                                          📋
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-1.5 text-slate-400 italic text-sm">
                                        <div className="h-2 w-2 rounded-full bg-slate-300 animate-pulse" />
                                        Pending
                                      </div>
                                    )}
                                  </td>
                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-1.5">
                                      {row.isSaved && (
                                        <>
                                          {editingId === row.id ? (
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() => handleUpdateUser(row.userId, { name: row.name, phone: row.phone })}
                                              className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                                              disabled={isUpdating}
                                              title="Save Updates"
                                            >
                                              {isUpdating ? (
                                                <RefreshCw className="h-4 w-4 animate-spin" />
                                              ) : (
                                                <Check className="h-4 w-4" />
                                              )}
                                            </Button>
                                          ) : (
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() => setEditingId(row.id)}
                                              className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:bg-amber-50 border-amber-200"
                                              title="Modify User"
                                            >
                                              <Edit2 className="h-3.5 w-3.5" />
                                            </Button>
                                          )}
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDeleteUser(row.userId, row.name)}
                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                                            disabled={isDeleting}
                                            title="Remove User"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                        <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 border border-gray-100">
                          <Users className="h-8 w-8 text-gray-300" />
                        </div>
                        <h4 className="text-gray-900 font-bold text-lg mb-1">No assignments yet</h4>
                        <p className="text-gray-500 text-sm max-w-[280px] text-center">
                          Configure your staff requirements above to start assigning counters and auditors.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            {tableData.length > 0 && (
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{tableData.length}</div>
                      <div className="text-sm text-gray-600">Total Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {tableData.filter(r => r.roleType === 'Counter').length}
                      </div>
                      <div className="text-sm text-gray-600">Counters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {tableData.filter(r => r.roleType === 'Auditor').length}
                      </div>
                      <div className="text-sm text-gray-600">Auditors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {tableData.filter(r => r.roleType === 'Supervisor').length}
                      </div>
                      <div className="text-sm text-gray-600">Supervisors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-600">
                        {tableData.filter(r => r.roleType === 'Customer').length}
                      </div>
                      <div className="text-sm text-gray-600">Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {tableData.filter(r => r.isSaved).length}
                      </div>
                      <div className="text-sm text-gray-600">Saved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">
                  Event: {selectedEvent}
                </span>
                <span className="mx-1">•</span>
                <span className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {selectedCustomer}
                </span>
                <span className="mx-1">•</span>
                <span className="text-blue-600">
                  {tableData.length} user{tableData.length !== 1 ? 's' : ''}
                </span>
                {tableData.length > 0 && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="text-green-600">
                      {tableData.filter(r => r.isSaved).length} saved
                    </span>
                    <span className="mx-1">•</span>
                    <span className="text-yellow-600">
                      {tableData.filter(r => !r.isSaved).length} pending
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={handleDownload}
                disabled={tableData.length === 0}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadPDF}
                disabled={!eventId && !eventData?.id}
                className="gap-2 text-green-600 border-green-200 hover:bg-green-50"
              >
                <Download className="h-4 w-4" />
                PDF Report
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}