"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Calendar,
  Users,
  Store,
  MapPin,
  Clock,
  Upload,
  UserPlus,
  Tag,
  Layers,
  BarChart,
  Download,
  CheckCircle,
  Settings,
  ArrowRight,
  Plus,
  Eye,
  Package,
  AlertCircle,
  X,
  RefreshCw,
  Tags,
  UserCheck,
  Power,
  Sliders,
  PlayCircle,
  Printer,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import TagsListDialog from "@/components/ui/customeComponent/TagListDialog";
import ZonesListDialog from "@/components/ui/customeComponent/ZoneListDialog";
import ItemsListDialog from "@/components/ui/customeComponent/ItemListDialog";
import { AuditManageDialog } from "@/components/ui/customeComponent/AuditManageDialog";
import EventReportsDialog from "@/components/ui/customeComponent/EventReportDialog";
import CreateItemDialog from "@/components/ui/customeComponent/CreateItemDialog";
import CreateTagDialog from "@/components/ui/customeComponent/CreateTagDialog";
import CreateZoneDialog from "@/components/ui/customeComponent/CreateZoneDialog";
import UserAssignmentDialog from "@/components/ui/customeComponent/UserAssignmentDialog";

const EventMasterSetup = () => {
  const { id } = useParams();

  const [userAssignDialogOpen, setUserAssignDialogOpen] = useState(false);
  const [isZoneDialogOpen, setIsZoneDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [itemMasterDialogOpen, setItemMasterDialogOpen] = useState(false);
  const [reportsDialogOpen, setReportsDialogOpen] = useState(false);
  const [auditDialogOpen, setAuditDialogOpen] = useState(false);
  const [itemsListOpen, setItemsListOpen] = useState(false);
  const [zonesListOpen, setZonesListOpen] = useState(false);
  const [tagsListOpen, setTagsListOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dummy event data
  const dummyEventData = {
    event: {
      id: id || "EVT-2024-001",
      uniqueId: "EVT-2024-001",
      title: "Q1 Inventory Audit - Spring 2024",
      status: "upcoming",
      datetime: "2024-03-25T09:00:00",
      customer: {
        cus_name: "TechCorp Solutions",
        cus_address: "123 Tech Street, San Francisco, CA 94107"
      },
      location: "123 Tech Street, San Francisco, CA 94107",
      stats: {
        totalSKUs: 145,
        totalZones: 6,
        totalTags: 892,
      },
      assignedUsers: 8,
      audit: {
        name: "Standard Audit Method"
      },
      _count: {
        items: 145,
        zones: 6,
        tags: 892,
        userRoles: 8,
        reports: 2
      }
    }
  };

  const dummySettedAuditData = {
    audit: {
      name: "Standard Audit Method"
    }
  };

  const [eventData, setEventData] = useState(dummyEventData?.event);
  const [settedAuditData, setSettedAuditData] = useState(dummySettedAuditData);
  const [isFetching, setIsFetching] = useState(false);

  const handleRefresh = async () => {
    const toastId = toast.loading("Refreshing event status...");
    setIsRefreshing(true);
    setIsFetching(true);
    setTimeout(() => {
      toast.success("Status refreshed Successfully", { id: toastId });
      setIsRefreshing(false);
      setIsFetching(false);
    }, 1000);
  };

  const showItemsList = () => {
    setItemsListOpen(true);
  };
  const showZonesList = () => {
    setZonesListOpen(true);
  };
  const showTagsList = () => {
    setTagsListOpen(true);
  };

  const showUserAssignDialog = () => {
    setUserAssignDialogOpen(true);
  };
  const showZoneDialog = () => {
    setIsZoneDialogOpen(true);
  };
  const showTagDialog = () => {
    setTagDialogOpen(true);
  };

  const showItemMasterDialog = () => {
    setItemMasterDialogOpen(true);
  };

  const showReportsDialog = () => {
    setReportsDialogOpen(true);
  };

  const showAuditDialog = () => {
    setAuditDialogOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const counts = {
    items: eventData?.stats?.totalSKUs || eventData?.totalSKUs || eventData?.totalSkus || eventData?._count?.items || 145,
    zones: eventData?.stats?.totalZones || eventData?.totalZones || eventData?._count?.zones || 6,
    tags: eventData?.stats?.totalTags || eventData?.totalTags || eventData?._count?.tags || 892,
    userRoles: eventData?.assignedUsers || eventData?._count?.userRoles || 8,
    reports: (Array.isArray(eventData?.reports) ? eventData?.reports?.length : eventData?.reports) || eventData?._count?.reports || 2,
  };
  const isActivated =
    eventData?.status?.toLowerCase() === "live" ||
    eventData?.status?.toLowerCase() === "completed";

  // Event Status Card
  const eventCards = [
    {
      title: "Item Master Creation",
      icon: Package,
      buttonText: "Upload Item List",
      buttonIcon: Upload,
      status: counts.items > 0 ? "completed" : "pending",
      onClick: showItemMasterDialog,
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
      hoverColor: "hover:bg-gradient-to-br hover:from-orange-100 hover:to-orange-200",
    },
    {
      title: "User Assignment",
      icon: UserCheck,
      buttonText: "Assign Users",
      buttonIcon: UserPlus,
      status: counts.userRoles > 0 ? "completed" : "pending",
      onClick: () => showUserAssignDialog(),
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
      iconColor: "text-amber-600",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
      hoverColor: "hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-200",
    },
    {
      title: "Zone Master Creation",
      icon: MapPin,
      buttonText: "Create Zone",
      buttonIcon: Plus,
      status: counts.zones > 0 ? "completed" : "pending",
      onClick: () => showZoneDialog(),
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
      hoverColor: "hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200",
    },
    {
      title: "Tag Master Creation",
      icon: Tags,
      buttonText: "Create Tag",
      buttonIcon: Tag,
      status: counts.tags > 0 ? "completed" : "pending",
      onClick: () => showTagDialog(),
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200",
      iconColor: "text-emerald-600",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
      hoverColor: "hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200",
    },
    {
      title: "Audit Management",
      icon: Calendar,
      buttonText: "Schedule Event",
      buttonIcon: Calendar,
      status: (eventData?.audit || settedAuditData?.audit || settedAuditData?.data || settedAuditData?.name) ? "completed" : "pending",
      onClick: () => showAuditDialog(),
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
      hoverColor: "hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200",
    },
    {
      title: "Reports & Setting",
      icon: Settings,
      buttonText: "Configure",
      buttonIcon: Settings,
      status: counts.reports > 0 ? "completed" : "pending",
      onClick: showReportsDialog,
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      borderColor: "border-indigo-200",
      iconColor: "text-indigo-600",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
      hoverColor: "hover:bg-gradient-to-br hover:from-indigo-100 hover:to-indigo-200",
    },
  ];

  // Configuration Checklist
  const configurationChecklist = [
    { label: "Event Scheduled", status: "completed", icon: CheckCircle },
    { label: "Item Master Uploaded", status: counts.items > 0 ? "completed" : "pending", icon: counts.items > 0 ? CheckCircle : AlertCircle },
    { label: "Zones Defined", status: counts.zones > 0 ? "completed" : "pending", icon: counts.zones > 0 ? CheckCircle : AlertCircle },
    { label: "Tags Generated", status: counts.tags > 0 ? "completed" : "pending", icon: counts.tags > 0 ? CheckCircle : AlertCircle },
    { label: "Users Assigned", status: counts.userRoles > 0 ? "completed" : "pending", icon: counts.userRoles > 0 ? CheckCircle : AlertCircle },
    { label: "Audit Methods", status: (eventData?.audit || settedAuditData?.audit || settedAuditData?.data || settedAuditData?.name) ? "completed" : "pending", icon: (eventData?.audit || settedAuditData?.audit || settedAuditData?.data || settedAuditData?.name) ? CheckCircle : AlertCircle },
    { label: "Reports & Settings", status: counts.reports > 0 ? "completed" : "pending", icon: counts.reports > 0 ? CheckCircle : AlertCircle },
  ];

  const completedSteps = configurationChecklist.filter(item => item.status === "completed").length;
  const totalSteps = configurationChecklist.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  const StatusBadge = ({ status = "setup" }) => {
    const s = status.toLowerCase();
    const config = {
      setup: {
        color: "bg-yellow-100 text-yellow-800",
        icon: Settings,
        label: "Setup Mode",
      },
      planned: {
        color: "bg-yellow-100 text-yellow-800",
        icon: Calendar,
        label: "Planned",
      },
      upcoming: {
        color: "bg-blue-100 text-blue-800",
        icon: Clock,
        label: "Upcoming",
      },
      active: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        label: "Activated",
      },
      live: {
        color: "bg-green-100 text-green-800",
        icon: PlayCircle,
        label: "Live Now",
      },
      completed: {
        color: "bg-gray-100 text-gray-800",
        icon: CheckCircle,
        label: "Completed",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: X,
        label: "Cancelled",
      },
    }[s] || {
      color: "bg-gray-100 text-gray-800",
      icon: AlertCircle,
      label: status,
    };
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm border ${config.color}`}
      >
        <Icon className="h-3.5 w-3.5 mr-2" />
        {config.label}
      </span>
    );
  };

  // Step Status Badge
  const StepStatusBadge = ({ status }) => {
    const config = {
      completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      pending: { color: "bg-red-100 text-red-800", icon: Clock },
    }[status];
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon className="h-3 w-3 mr-1" />
        {status === "completed"
          ? "Done"
          : "Pending"}
      </span>
    );
  };

  const handleActivateEvent = async () => {
    try {
      const toastId = toast.loading("Activating event...");
      setTimeout(() => {
        toast.success("Event activated successfully!", { id: toastId });
        setEventData(prev => ({ ...prev, status: "live" }));
      }, 1000);
    } catch (error) {
      console.error("Activation failed:", error);
      toast.error("Failed to activate event");
    }
  };

  const exportToCSV = (data, fileName) => {
    if (!data || !data.length) {
      toast.error("No data to export");
      return;
    }

    const firstRow = data[0];
    if (typeof firstRow !== 'object' || firstRow === null) {
      toast.error("Invalid data format for export");
      return;
    }

    const headers = Object.keys(firstRow);

    const csvContent = [
      headers.join(","),
      ...data.map(row => headers.map(header => {
        let cell = row[header];
        if (cell === null || cell === undefined) return '';

        if (typeof cell === 'object') {
          if (Array.isArray(cell)) return `"${cell.join(',').replace(/"/g, '""')}"`;
          cell = cell.name || cell.label || cell.id || JSON.stringify(cell);
        }

        cell = cell.toString().replace(/"/g, '""');
        if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
        return cell;
      }).join(","))
    ].join("\n");

    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${fileName}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Blob/Download creation failed:", err);
      toast.error("Failed to generate file");
    }
  };

  const handleDownloadCSV = async (type) => {
    const toastId = toast.loading(`Preparing ${type} CSV...`);
    try {
      let dataToExport = [];
      let fileName = "";

      setTimeout(() => {
        if (type === 'items') {
          dataToExport = [
            { "Item Code": "ITEM001", "Item Name": "Laptop", "Category": "Electronics", "Unit": "pcs" },
            { "Item Code": "ITEM002", "Item Name": "Mouse", "Category": "Electronics", "Unit": "pcs" },
            { "Item Code": "ITEM003", "Item Name": "Keyboard", "Category": "Electronics", "Unit": "pcs" },
          ];
          fileName = `items_${eventData?.uniqueId || id}`;
        } else if (type === 'zones') {
          dataToExport = [
            { "Zone Name": "Zone A - Entrance", "Zone Description": "Main entrance and lobby area" },
            { "Zone Name": "Zone B - Electronics", "Zone Description": "Electronics department" },
            { "Zone Name": "Zone C - Apparel", "Zone Description": "Clothing and accessories" },
          ];
          fileName = `zones_${eventData?.uniqueId || id}`;
        } else if (type === 'tags') {
          dataToExport = [
            { barcode: "TAG001", udc: "UDC001", zone: "Zone A", zone_description: "Main entrance area" },
            { barcode: "TAG002", udc: "UDC002", zone: "Zone B", zone_description: "Electronics department" },
            { barcode: "TAG003", udc: "UDC003", zone: "Zone C", zone_description: "Apparel section" },
          ];
          fileName = `tags_${eventData?.uniqueId || id}`;
        }

        exportToCSV(dataToExport, fileName);
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} exported successfully`, { id: toastId });
      }, 500);
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export data", { id: toastId });
    }
  };

  const handleDownloadReport = async () => {
    const toastId = toast.loading("Generating Full-Page Summary...");
    try {
      const eventUniqueId = eventData?.uniqueId || id;

      const preparedEventData = {
        ...eventData,
        audit: {
          name: settedAuditData?.audit?.name || settedAuditData?.name || eventData?.audit?.name || "Standard Audit"
        }
      };

      const reportHtml = getEventSetupReportHTML({
        eventData: preparedEventData,
        counts,
        configurationChecklist,
        progressPercentage
      });

      const blob = new Blob([reportHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const reportWindow = window.open(url, '_blank');

      if (reportWindow) {
        toast.success("Ready for full-page summary print", { id: toastId });
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Setup_Summary_${eventUniqueId}.html`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Report downloaded (Pop-ups blocked)", { id: toastId });
      }

      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
      console.error("Report generation error:", error);
      toast.error("Failed to generate expanded summary", { id: toastId });
    }
  };

  const handlePrintUsers = async () => {
    const toastId = toast.loading("Preparing report...");
    try {
      setTimeout(() => {
        toast.success("Report opened for printing", { id: toastId });
        window.open('#', '_blank');
      }, 500);
    } catch (error) {
      console.error("Print failed:", error);
      toast.error("Failed to generate report", { id: toastId });
    }
  };

  const handlePrintMasterReport = async (type) => {
    const toastId = toast.loading(`Preparing ${type} report...`);
    try {
      setTimeout(() => {
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} report opened for printing`, { id: toastId });
        window.open('#', '_blank');
      }, 500);
    } catch (error) {
      console.error("Print failed:", error);
      toast.error("Failed to generate report", { id: toastId });
    }
  };

  const handleZoneSave = async (zoneData) => {
    const toastId = toast.loading("Saving zone...");
    setTimeout(() => {
      setEventData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          totalZones: (prev.stats?.totalZones || 0) + (zoneData.zones ? zoneData.zones.length : 1)
        },
        _count: {
          ...prev._count,
          zones: (prev._count?.zones || 0) + (zoneData.zones ? zoneData.zones.length : 1)
        }
      }));
      toast.success("Zones processed successfully", { id: toastId });
      setIsZoneDialogOpen(false);
    }, 500);
  };

  const handleTagSave = async (tagData) => {
    const toastId = toast.loading("Saving tags...");
    setTimeout(() => {
      setEventData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          totalTags: (prev.stats?.totalTags || 0) + (tagData.tags ? tagData.tags.length : 1)
        },
        _count: {
          ...prev._count,
          tags: (prev._count?.tags || 0) + (tagData.tags ? tagData.tags.length : 1)
        }
      }));
      toast.success("Tags processed successfully", { id: toastId });
      setTagDialogOpen(false);
    }, 500);
  };

  const handleItemSave = async (itemData) => {
    const toastId = toast.loading("Saving item...");
    setTimeout(() => {
      setEventData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          totalSKUs: (prev.stats?.totalSKUs || 0) + 1
        },
        _count: {
          ...prev._count,
          items: (prev._count?.items || 0) + 1
        }
      }));
      toast.success("Item created successfully", { id: toastId });
      setItemMasterDialogOpen(false);
    }, 500);
  };

  const handleItemsUpload = async (itemsData) => {
    const toastId = toast.loading(`Uploading ${itemsData.length} items...`);
    setTimeout(() => {
      setEventData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          totalSKUs: (prev.stats?.totalSKUs || 0) + itemsData.length
        },
        _count: {
          ...prev._count,
          items: (prev._count?.items || 0) + itemsData.length
        }
      }));
      toast.success(`Uploaded ${itemsData.length} items successfully`, { id: toastId });
      setItemMasterDialogOpen(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 rounded-md">
      <div className="max-w-9xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-3xl font-bold text-gray-900 mb-3">
                Event Master Setup
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content: 35% Event Details Left, 65% Event Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Event Details (35%) - 4.2/12 ≈ 35% */}
          <div className="lg:col-span-4">
            <Card className="border-2 border-blue-200 shadow-xl h-full">
              <CardContent className="px-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl border-1 border-blue-600 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {eventData?.title || "Q1 Inventory Audit - Spring 2024"}
                        </h2>
                        <div className="flex items-center gap-3 mt-2">
                          <StatusBadge status={eventData?.status || "setup"} />
                          <span className="text-sm text-gray-600">
                            ID: {eventData?.uniqueId || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefresh}
                      className="gap-2"
                    >
                      <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Date & Time
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{formatDate(eventData?.datetime)}</span>
                      </div>
                      <div className="text-sm text-gray-700 ml-6">
                        {formatTime(eventData?.datetime)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Customer
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="font-medium ">
                          {eventData?.customer?.cus_name || "TechCorp Solutions"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="ml-6" >
                          {eventData?.customer?.cus_address || "123 Tech Street, San Francisco, CA 94107"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Location</div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span className="font-medium">
                          {eventData?.location || "123 Tech Street, San Francisco, CA 94107"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Event Counts
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">
                          {counts.items || 0} Items
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 ml-6">
                        {counts.userRoles || 0} Team Members
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Setup Cards (65%) - 7.8/12 ≈ 65% */}
          <div className="lg:col-span-8">
            <Card className="border-gray-200 shadow-lg overflow-hidden flex-grow flex flex-col">
              <div className="mb-2 px-6">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <div className="h-12 w-12 rounded-xl border-1 border-blue-600 flex items-center justify-center">
                      <Settings className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 ml-4">
                      Setup Configuration
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefresh}
                      className="gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="flex-grow p-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full p-6">
                  {eventCards.map((card, index) => {
                    const IconComponent = card.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{
                          scale: 1.05,
                          y: -4,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 blur transition duration-500 rounded-xl" />
                        <Button
                          variant="ghost"
                          className={`relative w-full h-full min-h-[120px] flex flex-col items-center justify-center p-4 ${card.bgColor} ${card.hoverColor} border ${card.borderColor} rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group overflow-hidden cursor-pointer`}
                          onClick={card.onClick}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div
                            className={`relative mb-3 p-3 rounded-full ${card.bgColor} border ${card.borderColor} group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent
                              className={`h-6 w-6 ${card.iconColor}`}
                            />
                          </div>
                          <div className="relative flex flex-col items-center justify-center text-center z-10 space-y-1">
                            <div className="font-semibold text-gray-900 text-sm mb-1.5 group-hover:text-opacity-90 transition-colors">
                              {card.title}
                            </div>
                            <StepStatusBadge status={card.status} />
                          </div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Setup Summary & Next Steps
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Card: Configuration Summary */}
            <Card className="border-gray-200 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex">
                  <div className="h-12 w-12 rounded-xl border-1 border-blue-600 flex items-center justify-center">
                    <Sliders className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 ml-4">
                    Configuration Summary
                  </CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                </Button>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Configuration Counts Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-700">
                            1
                          </div>
                          <div className="text-sm font-medium text-blue-800">
                            Event Scheduled
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-blue-600">Completed</div>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <Package className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-orange-700">
                              {counts.items || 0}
                            </div>
                            <div className="text-sm font-medium text-orange-800">
                              Items Created
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => showItemsList()}
                            className="h-8 w-8 text-orange-600 hover:bg-orange-100 transition-colors"
                            title="View Items"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadCSV('items')}
                            className="h-8 w-8 text-orange-600 hover:bg-orange-100 transition-colors"
                            title="Download CSV"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-orange-600">
                        Event Item Master
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-amber-700">
                              {counts.userRoles || 0}
                            </div>
                            <div className="text-sm font-medium text-amber-800">
                              Users Assigned
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => showUserAssignDialog()}
                            className="h-8 w-8 text-amber-600 hover:bg-amber-100 transition-colors"
                            title="View / Assign Users"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handlePrintUsers}
                            className="h-8 w-8 text-amber-600 hover:bg-amber-100 transition-colors"
                            title="Print Users Report"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-amber-600">
                        Assigned Team
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-700">
                              {counts.zones || 0}
                            </div>
                            <div className="text-sm font-medium text-purple-800">
                              Zones Created
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => showZonesList()}
                            className="h-8 w-8 text-purple-600 hover:bg-purple-100 transition-colors"
                            title="View Zones"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadCSV('zones')}
                            className="h-8 w-8 text-purple-600 hover:bg-purple-100 transition-colors"
                            title="Download CSV"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePrintMasterReport('zones')}
                            className="h-8 w-8 text-purple-600 hover:bg-purple-100 transition-colors"
                            title="Print Zones Report"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-purple-600">
                        Defined Areas
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Tags className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-emerald-700">
                              {counts.tags || 0}
                            </div>
                            <div className="text-sm font-medium text-emerald-800">
                              Tags Created
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => showTagsList()}
                            className="h-8 w-8 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            title="View Tags"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadCSV('tags')}
                            className="h-8 w-8 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            title="Download CSV"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePrintMasterReport('tags')}
                            className="h-8 w-8 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            title="Print Tags Report"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-emerald-600">
                        Inventory Tags
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <Settings className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-indigo-700">
                            {counts.reports || 0}
                          </div>
                          <div className="text-sm font-medium text-indigo-800">
                            Reports Configured
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-indigo-600">In Progress</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Overall Setup Progress
                      </span>
                      <span className="text-sm font-bold text-purple-600">
                        {progressPercentage}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Setup Started</span>
                      <span>Halfway</span>
                      <span>Ready</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Card: Checklist & Activation */}
            <Card className="border-gray-200 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex">
                  <div className="h-12 w-12 rounded-xl border-1 border-blue-600 flex items-center justify-center">
                    <Power className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 ml-4">
                    Configuration & Activation
                  </CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Configuration Checklist */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Configuration Checklist
                    </h3>
                    <div className="space-y-2">
                      {configurationChecklist.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${item.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : item.status === "in-progress"
                                  ? "bg-amber-100 text-amber-600"
                                  : "bg-red-100 text-red-600"
                                }`}
                            >
                              {item.status === "completed" ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : item.status === "in-progress" ? (
                                <Clock className="h-3 w-3" />
                              ) : (
                                <AlertCircle className="h-3 w-3" />
                              )}
                            </div>
                            <span
                              className={`text-sm ${item.status === "completed"
                                ? "text-green-700"
                                : item.status === "in-progress"
                                  ? "text-amber-700"
                                  : "text-red-700"
                                }`}
                            >
                              {item.label}
                            </span>
                          </div>
                          <StepStatusBadge status={item.status} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activation Buttons */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Event Activation
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        onClick={handleDownloadReport}
                        className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-100 hover:to-gray-200 text-white border border-gray-200 gap-2 py-6"
                        size="lg"
                      >
                        <Download className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-semibold">
                            Download Setup Report
                          </div>
                        </div>
                      </Button>
                      <Button
                        onClick={handleActivateEvent}
                        className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white gap-2 py-6"
                        size="lg"
                        disabled={isActivated}
                      >
                        <CheckCircle className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-semibold">
                            {isActivated ? "Event Activated" : "Activate Event"}
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <UserAssignmentDialog
        open={userAssignDialogOpen}
        onOpenChange={setUserAssignDialogOpen}
        eventId={id}
        eventData={eventData || {}}
      />
      <CreateZoneDialog
        open={isZoneDialogOpen}
        onOpenChange={setIsZoneDialogOpen}
        eventId={id}
        eventData={eventData || {}}
        onSave={handleZoneSave}
      />
      <CreateTagDialog
        open={tagDialogOpen}
        onOpenChange={setTagDialogOpen}
        eventId={id}
        eventData={eventData || {}}
        onSave={handleTagSave}
      />
      <CreateItemDialog
        open={itemMasterDialogOpen}
        onOpenChange={setItemMasterDialogOpen}
        eventId={id}
        eventData={eventData || {}}
        onSave={handleItemSave}
        onUpload={handleItemsUpload}
      />
      <EventReportsDialog
        open={reportsDialogOpen}
        onOpenChange={setReportsDialogOpen}
        eventId={id}
        eventData={eventData || {}}
      />
      <AuditManageDialog
        open={auditDialogOpen}
        onOpenChange={setAuditDialogOpen}
        eventId={id}
        uniqueId={eventData?.uniqueId}
      />
      <ItemsListDialog
        open={itemsListOpen}
        onOpenChange={setItemsListOpen}
        eventId={id}
      />
      <ZonesListDialog
        open={zonesListOpen}
        onOpenChange={setZonesListOpen}
        eventId={id}
      />
      <TagsListDialog
        open={tagsListOpen}
        onOpenChange={setTagsListOpen}
        eventId={id}
      />
    </div>
  );
};

export default EventMasterSetup;