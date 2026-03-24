"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  X,
  Check,
  Merge,
  Trash2,
  AlertCircle,
  Barcode,
  Tag,
  User,
  Calendar,
  ChevronDown,
  Eye,
  Download,
  RefreshCw,
  EyeClosedIcon,
  Maximize2,
  Minimize2,
  MapPin,
  Wrench,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useToast from "@/components/ui/toast/useToast";


// Dummy Zones Data
const DUMMY_ZONES = [
  { id: "1", uniqueId: "ZONE-A-001", name: "Electronics Section", description: "Electronics and gadgets" },
  { id: "2", uniqueId: "ZONE-B-002", name: "Clothing Section", description: "Apparel and accessories" },
  { id: "3", uniqueId: "ZONE-C-003", name: "Grocery Section", description: "Fresh produce and groceries" },
  { id: "4", uniqueId: "ZONE-D-004", name: "Furniture Section", description: "Home furniture" },
  { id: "5", uniqueId: "ZONE-E-005", name: "Toys Section", description: "Children's toys and games" }
];

// Dummy Duplicate Tags Data
const DUMMY_DUPLICATE_TAGS = [
  {
    tagId: "dup-1",
    barcode: "TAG-001",
    status: "pending",
    zoneId: "1",
    zoneName: "Electronics Section",
    scannedBy: [
      {
        userId: "user-1",
        userName: "John Doe",
        scannedAt: "2024-01-15T10:30:00Z",
        items: [
          { itemId: "item-1", itemBarcode: "BAR-001", sku: "SKU-001", quantity: 25, mode: "BULK" },
          { itemId: "item-2", itemBarcode: "BAR-002", sku: "SKU-002", quantity: 15, mode: "SINGLE" }
        ]
      },
      {
        userId: "user-2",
        userName: "Jane Smith",
        scannedAt: "2024-01-15T11:45:00Z",
        items: [
          { itemId: "item-3", itemBarcode: "BAR-001", sku: "SKU-001", quantity: 25, mode: "BULK" },
          { itemId: "item-4", itemBarcode: "BAR-003", sku: "SKU-003", quantity: 8, mode: "SINGLE" }
        ]
      }
    ]
  },
  {
    tagId: "dup-2",
    barcode: "TAG-002",
    status: "pending",
    zoneId: "2",
    zoneName: "Clothing Section",
    scannedBy: [
      {
        userId: "user-3",
        userName: "Mike Johnson",
        scannedAt: "2024-01-16T09:15:00Z",
        items: [
          { itemId: "item-5", itemBarcode: "BAR-004", sku: "SKU-004", quantity: 30, mode: "BULK" },
          { itemId: "item-6", itemBarcode: "BAR-005", sku: "SKU-005", quantity: 12, mode: "SINGLE" }
        ]
      },
      {
        userId: "user-4",
        userName: "Sarah Williams",
        scannedAt: "2024-01-16T10:20:00Z",
        items: [
          { itemId: "item-7", itemBarcode: "BAR-004", sku: "SKU-004", quantity: 28, mode: "BULK" }
        ]
      }
    ]
  },
  {
    tagId: "dup-3",
    barcode: "TAG-003",
    status: "pending",
    zoneId: "3",
    zoneName: "Grocery Section",
    scannedBy: [
      {
        userId: "user-5",
        userName: "David Brown",
        scannedAt: "2024-01-17T14:30:00Z",
        items: [
          { itemId: "item-8", itemBarcode: "BAR-006", sku: "SKU-006", quantity: 5, mode: "SINGLE" }
        ]
      },
      {
        userId: "user-6",
        userName: "Emily Davis",
        scannedAt: "2024-01-17T15:45:00Z",
        items: [
          { itemId: "item-9", itemBarcode: "BAR-006", sku: "SKU-006", quantity: 7, mode: "SINGLE" }
        ]
      }
    ]
  },
  {
    tagId: "dup-4",
    barcode: "TAG-004",
    status: "resolved",
    zoneId: "4",
    zoneName: "Furniture Section",
    scannedBy: [
      {
        userId: "user-7",
        userName: "Chris Wilson",
        scannedAt: "2024-01-18T11:00:00Z",
        items: [
          { itemId: "item-10", itemBarcode: "BAR-007", sku: "SKU-007", quantity: 20, mode: "BULK" }
        ]
      },
      {
        userId: "user-8",
        userName: "Amanda Taylor",
        scannedAt: "2024-01-18T12:15:00Z",
        items: [
          { itemId: "item-11", itemBarcode: "BAR-007", sku: "SKU-007", quantity: 18, mode: "BULK" }
        ]
      }
    ]
  }
];

// Dummy Fixed Tags Data (Manual Tags)
const DUMMY_FIXED_TAGS = [
  {
    id: "tag-1",
    _id: "tag-1",
    barcode: "TAG-MANUAL-001",
    uniqueId: "MT-001",
    eventId: "EVT-001",
    zoneId: "1",
    zone: { id: "1", description: "Electronics Section" },
    udc: "ELEC-001",
    status: "FIX",
    createdAt: "2024-01-20T09:00:00Z",
    enteredAt: "2024-01-20T09:00:00Z"
  },
  {
    id: "tag-2",
    _id: "tag-2",
    barcode: "TAG-MANUAL-002",
    uniqueId: "MT-002",
    eventId: "EVT-001",
    zoneId: "2",
    zone: { id: "2", description: "Clothing Section" },
    udc: "CLTH-001",
    status: "pending",
    createdAt: "2024-01-21T10:30:00Z",
    enteredAt: "2024-01-21T10:30:00Z"
  },
  {
    id: "tag-3",
    _id: "tag-3",
    barcode: "TAG-MANUAL-003",
    uniqueId: "MT-003",
    eventId: "EVT-001",
    zoneId: "3",
    zone: { id: "3", description: "Grocery Section" },
    udc: "GRC-001",
    status: "FIX",
    createdAt: "2024-01-22T14:15:00Z",
    enteredAt: "2024-01-22T14:15:00Z"
  },
  {
    id: "tag-4",
    _id: "tag-4",
    barcode: "TAG-MANUAL-004",
    uniqueId: "MT-004",
    eventId: "EVT-001",
    zoneId: "4",
    zone: { id: "4", description: "Furniture Section" },
    udc: "FRN-001",
    status: "approved",
    createdAt: "2024-01-23T16:45:00Z",
    enteredAt: "2024-01-23T16:45:00Z"
  }
];

// Dummy Fixed Items Data (Manual Barcodes)
const DUMMY_FIXED_ITEMS = [
  {
    id: "item-1",
    _id: "item-1",
    barcode: "BAR-MANUAL-001",
    productName: "Wireless Headphones",
    status: "PENDING",
    reason: "Product not found in master file",
    enteredBy: "John Doe",
    createdAt: "2024-01-24T11:20:00Z",
    enteredAt: "2024-01-24T11:20:00Z",
    item: {
      barcode: "BAR-MANUAL-001",
      description: "Wireless Bluetooth Headphones",
      sku: "",
      category: ""
    },
    tag: {
      barcode: "TAG-001",
      zone: {
        uniqueId: "ZONE-A-001",
        name: "Electronics Section",
        description: "Electronics and gadgets"
      }
    },
    eventUserRole: {
      user: { name: "John Doe" }
    }
  },
  {
    id: "item-2",
    _id: "item-2",
    barcode: "BAR-MANUAL-002",
    productName: "USB-C Cable",
    status: "PENDING",
    reason: "Barcode not recognized",
    enteredBy: "Jane Smith",
    createdAt: "2024-01-24T13:45:00Z",
    enteredAt: "2024-01-24T13:45:00Z",
    item: {
      barcode: "BAR-MANUAL-002",
      description: "USB-C Charging Cable 2m",
      sku: "",
      category: ""
    },
    tag: {
      barcode: "TAG-002",
      zone: {
        uniqueId: "ZONE-B-002",
        name: "Clothing Section",
        description: "Apparel and accessories"
      }
    },
    eventUserRole: {
      user: { name: "Jane Smith" }
    }
  },
  {
    id: "item-3",
    _id: "item-3",
    barcode: "BAR-MANUAL-003",
    productName: "Smart Watch",
    status: "PENDING",
    reason: "SKU missing from inventory",
    enteredBy: "Mike Johnson",
    createdAt: "2024-01-25T09:30:00Z",
    enteredAt: "2024-01-25T09:30:00Z",
    item: {
      barcode: "BAR-MANUAL-003",
      description: "Smart Watch Fitness Tracker",
      sku: "",
      category: ""
    },
    tag: {
      barcode: "TAG-003",
      zone: {
        uniqueId: "ZONE-C-003",
        name: "Grocery Section",
        description: "Fresh produce and groceries"
      }
    },
    eventUserRole: {
      user: { name: "Mike Johnson" }
    }
  },
  {
    id: "item-4",
    _id: "item-4",
    barcode: "BAR-MANUAL-004",
    productName: "Wireless Charger",
    status: "APPROVED",
    reason: "New product addition",
    enteredBy: "Sarah Williams",
    createdAt: "2024-01-25T15:20:00Z",
    enteredAt: "2024-01-25T15:20:00Z",
    item: {
      barcode: "BAR-MANUAL-004",
      description: "Wireless Charging Pad",
      sku: "SKU-004",
      category: "Electronics"
    },
    tag: {
      barcode: "TAG-004",
      zone: {
        uniqueId: "ZONE-D-004",
        name: "Furniture Section",
        description: "Home furniture"
      }
    },
    eventUserRole: {
      user: { name: "Sarah Williams" }
    }
  }
];

export default function FixPage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [activeSection, setActiveSection] = useState("duplicate");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "today",
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [zoneId, setZoneId] = useState("");
  const [zoneDescription, setZoneDescription] = useState("");
  const [udc, setUdc] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [sku, setSku] = useState("");
  const [showScanDetails, setShowScanDetails] = useState(false);
  const [scanItems, setScanItems] = useState([]);
  const [scanCounterName, setScanCounterName] = useState("");
  const [selectedScans, setSelectedScans] = useState({});
  const [activeZone, setActiveZone] = useState("");
  const [pendingFixDialog, setPendingFixDialog] = useState({
    open: false,
    message: "",
    items: []
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Process duplicate tags data
  const duplicateTags = useMemo(() => {
    return DUMMY_DUPLICATE_TAGS.map(tag => {
      const s1 = tag.scannedBy?.[0] || {};
      const s2 = tag.scannedBy?.[1] || {};

      const q1 = (s1.items || []).reduce((sum, item) => sum + (item.quantity || 0), 0);
      const q2 = (s2.items || []).reduce((sum, item) => sum + (item.quantity || 0), 0);

      const firstItem = (s1.items?.[0] || s2.items?.[0] || {});

      return {
        id: tag.tagId,
        tagNumber: tag.barcode,
        barcode: firstItem.itemBarcode || "N/A",
        productName: firstItem.sku || firstItem.description || "N/A",
        counter1: s1.userName || "N/A",
        counter2: s2.userName || "N/A",
        userId1: s1.userId,
        userId2: s2.userId,
        count1: q1,
        count2: q2,
        scannedTime1: s1.scannedAt ? new Date(s1.scannedAt).toLocaleTimeString() : "N/A",
        scannedTime2: s2.scannedAt ? new Date(s2.scannedAt).toLocaleTimeString() : "N/A",
        location: tag.zoneName || "N/A",
        zoneId: tag.zoneId,
        items1: s1.items || [],
        items2: s2.items || [],
        status: tag.status
      };
    });
  }, []);

  const filteredDuplicateTags = useMemo(() => {
    return duplicateTags.filter(tag => {
      const matchesSearch =
        tag.tagNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.barcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filters.status === "all" || tag.status.toLowerCase() === filters.status.toLowerCase();
      const matchesZone = !activeZone || tag.zoneId?.toString() === activeZone.toString();

      return matchesSearch && matchesStatus && matchesZone;
    });
  }, [duplicateTags, searchQuery, filters.status, activeZone]);

  const filteredFixedTags = useMemo(() => {
    return DUMMY_FIXED_TAGS.filter(tag => {
      const matchesSearch =
        String(tag.barcode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(tag.zoneId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(tag.uniqueId || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filters.status === "all" || String(tag.status || "").toLowerCase() === filters.status.toLowerCase();
      const matchesZone = !activeZone || tag.zoneId?.toString() === activeZone.toString();

      return matchesSearch && matchesStatus && matchesZone;
    });
  }, [searchQuery, filters.status, activeZone]);

  const filteredFixedItems = useMemo(() => {
    return DUMMY_FIXED_ITEMS.filter(item => {
      const matchesSearch =
        String(item.item?.barcode || item.barcode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.tag?.barcode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.productName || item.item?.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.tag?.zone?.uniqueId || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filters.status === "all" || String(item.status || "").toLowerCase() === filters.status.toLowerCase();
      const matchesZone = !activeZone || item.tag?.zone?.id?.toString() === activeZone.toString();

      return matchesSearch && matchesStatus && matchesZone;
    });
  }, [searchQuery, filters.status, activeZone]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const sections = [
    { id: "duplicate", label: "Duplicate Tags", count: filteredDuplicateTags.length, icon: AlertCircle },
    { id: "manualBarcodes", label: "Manual Barcodes", count: filteredFixedItems.length, icon: Barcode },
    { id: "manualTags", label: "Manual Tags", count: filteredFixedTags.length, icon: Tag },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending", color: "bg-yellow-500" },
    { value: "resolved", label: "Resolved", color: "bg-green-500" },
    { value: "approved", label: "Approved", color: "bg-blue-500" },
  ];

  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "custom", label: "Custom Range" },
  ];

  const handleTagAction = (id, action, tagZoneId, userId) => {
    if (action === "reject") {
      if (activeSection === "manualTags") {
        setTimeout(() => {
          toastSuccess("Tag rejected successfully");
          setSearchQuery("");
        }, 500);
      } else if (activeSection === "manualBarcodes") {
        setTimeout(() => {
          toastSuccess("Barcode rejected successfully");
          setSearchQuery("");
        }, 500);
      }
    } else if (action === "merge") {
      setTimeout(() => {
        toastSuccess("Tags merged successfully");
      }, 500);
    } else if (action === "delete") {
      setTimeout(() => {
        toastSuccess("Tags deleted successfully");
      }, 500);
    } else if (action === "confirm") {
      setTimeout(() => {
        toastSuccess("Tag scan confirmed successfully");
      }, 500);
    } else if (action === "void") {
      setTimeout(() => {
        toastSuccess("Tag scan voided successfully");
      }, 500);
    }
    console.log(`Action ${action} on item ${id} in zone ${tagZoneId || activeZone}${userId ? ` for user ${userId}` : ""}`);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action ${action} on tags:`, selectedTags);
    setSelectedTags([]);
    setShowBulkActions(false);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toastSuccess("Data refreshed successfully");
    }, 1000);
  };

  const handleExport = () => {
    toastSuccess("Export started");
  };

  const openTagApprovalDialog = (tag) => {
    setSelectedItem(tag);
    const rawZoneId = tag.zone?.id || tag.zoneId || "";
    const matchedZone = DUMMY_ZONES.find(z =>
      z.id?.toString() === rawZoneId?.toString() ||
      z.uniqueId?.toString() === rawZoneId?.toString()
    );
    const resolvedId = matchedZone?.id?.toString() || rawZoneId?.toString() || "";
    const resolvedDescription = tag.zone?.description || matchedZone?.description || tag.zone_description || "";
    setZoneId(resolvedId);
    setZoneDescription(resolvedDescription);
    setUdc(tag.udc || "");
    setShowApproveDialog(true);
  };

  const openBarcodeApprovalDialog = (item) => {
    setSelectedItem(item);
    setSku(item.item?.sku || item.sku || "");
    setItemDescription(item.item?.description || item.productName || "");
    setUdc(item.udc || item.category || "");
    setShowApproveDialog(true);
  };

  const handleApproveSubmit = () => {
    if (!selectedItem) return;

    if (activeSection === "manualTags") {
      setTimeout(() => {
        toastSuccess("Tag approved successfully");
        setShowApproveDialog(false);
        setSelectedItem(null);
        setZoneId("");
        setZoneDescription("");
        setUdc("");
        setSearchQuery("");
      }, 500);
    } else if (activeSection === "manualBarcodes") {
      setTimeout(() => {
        toastSuccess("Barcode approved successfully");
        setShowApproveDialog(false);
        setSelectedItem(null);
        setSku("");
        setItemDescription("");
        setUdc("");
        setSearchQuery("");
      }, 500);
    }
  };

  const renderDuplicateTags = () => {
    const displayTags = filteredDuplicateTags;

    if (displayTags.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <AlertCircle className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No duplicate tags found</h3>
          <p className="text-gray-500">Your filters didn't match any duplicates.</p>
        </div>
      );
    }

    return (
      <>
        <div className="space-y-4">
          {displayTags.map((tag) => (
            <motion.div
              key={tag.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl border-2 ${tag.status === "pending"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-green-200 bg-green-50"
                } p-4 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {tag.tagNumber}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {tag.barcode} • {tag.productName}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${tag.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                    }`}
                >
                  {tag.status === "pending" ? "NEEDS ACTION" : "RESOLVED"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div
                  onClick={() => setSelectedScans({ ...selectedScans, [tag.id]: tag.userId1 })}
                  className={`p-3 rounded-xl cursor-pointer transition-all border-2 ${selectedScans[tag.id] === tag.userId1
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-100"
                      : "bg-gray-50 border-transparent hover:border-gray-200"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedScans[tag.id] === tag.userId1 ? "border-blue-500 bg-blue-500" : "border-gray-300"
                        }`}>
                        {selectedScans[tag.id] === tag.userId1 && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        Counter 1
                      </span>
                    </div>
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="font-bold text-gray-900">{tag.counter1}</p>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>Qty: <span className="font-bold text-blue-600">{tag.count1}</span></span>
                    <span>{tag.scannedTime1}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setScanItems(tag.items1);
                      setScanCounterName(tag.counter1);
                      setShowScanDetails(true);
                    }}
                    className="mt-3 w-full text-xs bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View Details
                  </button>
                </div>

                <div
                  onClick={() => setSelectedScans({ ...selectedScans, [tag.id]: tag.userId2 })}
                  className={`p-3 rounded-xl cursor-pointer transition-all border-2 ${selectedScans[tag.id] === tag.userId2
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-100"
                      : "bg-gray-50 border-transparent hover:border-gray-200"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedScans[tag.id] === tag.userId2 ? "border-blue-500 bg-blue-500" : "border-gray-300"
                        }`}>
                        {selectedScans[tag.id] === tag.userId2 && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        Counter 2
                      </span>
                    </div>
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="font-bold text-gray-900">{tag.counter2}</p>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>Qty: <span className="font-bold text-blue-600">{tag.count2}</span></span>
                    <span>{tag.scannedTime2}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setScanItems(tag.items2);
                      setScanCounterName(tag.counter2);
                      setShowScanDetails(true);
                    }}
                    className="mt-3 w-full text-xs bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View Details
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Tag className="w-4 h-4" />
                  <span>Location: {tag.location}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTagAction(tag.id, "void", tag.zoneId, selectedScans[tag.id])}
                    disabled={!selectedScans[tag.id]}
                    className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all flex items-center space-x-1 ${selectedScans[tag.id]
                        ? "bg-red-100 text-red-700 hover:bg-red-200 shadow-sm"
                        : "bg-gray-50 text-gray-300 cursor-not-allowed"
                      }`}
                  >
                    <X className="w-4 h-4" />
                    <span>Void Selected</span>
                  </button>
                  <button
                    onClick={() => handleTagAction(tag.id, "merge", tag.zoneId)}
                    className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-medium transition-all flex items-center space-x-1 shadow-sm"
                  >
                    <Merge className="w-4 h-4" />
                    <span>Merge Both</span>
                  </button>
                  <button
                    onClick={() => handleTagAction(tag.id, "delete", tag.zoneId, [tag.userId1, tag.userId2])}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-all flex items-center space-x-1 shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Both</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scanned Items Details Dialog */}
        <Dialog open={showScanDetails} onOpenChange={setShowScanDetails}>
          <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] h-[95vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Scanned Items - {scanCounterName}
              </DialogTitle>
              <DialogDescription>
                Details of all items scanned by {scanCounterName} for this tag.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto mt-4">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                    <tr>
                      <th className="px-4 py-3">Barcode / SKU</th>
                      <th className="px-4 py-3">Mode</th>
                      <th className="px-4 py-3 text-right">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {scanItems.length > 0 ? (
                      scanItems.map((item, idx) => (
                        <tr key={item.itemId || idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{item.itemBarcode || "N/A"}</div>
                            <div className="text-xs text-gray-500">{item.sku || "N/A"}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.mode === "BULK" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                              }`}>
                              {item.mode || "AQ"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-blue-600">
                            {item.quantity}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                          No items found for this scan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="secondary" onClick={() => setShowScanDetails(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderManualTags = () => {
    if (filteredFixedTags.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Manual Tags Found
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Your filters didn't match any manual tags.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="space-y-4">
          {filteredFixedTags.map((tag) => (
            <motion.div
              key={tag.id || tag._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border-2 border-blue-100 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Tag className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {tag.barcode || 'N/A'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {tag.uniqueId ? `${tag.uniqueId} • ` : ''} Event: {tag.eventId} • Zone: {tag.zoneId}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${tag.status === "FIX"
                      ? "bg-red-100 text-red-800"
                      : tag.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                >
                  {tag.status}
                </div>
              </div>

              <div className="mb-4">
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-sm text-gray-600 mb-1">
                    UDC / Info
                  </p>
                  <p className="font-medium">{tag.udc || "No UDC provided"}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Status Code</p>
                    <p className="font-medium flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {tag.status || 'FIX'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Entered At</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {tag.createdAt ? new Date(tag.createdAt).toLocaleTimeString() : tag.enteredAt || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p>Action Required: Confirm tag entry to update master file</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTagAction(tag.id || tag._id, "reject")}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => openTagApprovalDialog(tag)}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors"
                  >
                    Approve Tag
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Zone Approval Dialog */}
        <Dialog
          open={showApproveDialog && activeSection === "manualTags"}
          onOpenChange={setShowApproveDialog}
          className="w-full"
        >
          <DialogContent
            className={`
          ${isFullscreen
                ? "w-full h-full max-w-none max-h-none rounded-none"
                : "!w-[90vw] !max-w-[90vw] max-h-[90vh] mx-auto my-0"
              }
          overflow-hidden flex flex-col p-0
        `}
          >
            <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold">
                      Approve Tag: {selectedItem?.barcode || "N/A"}
                    </DialogTitle>
                    <DialogDescription>
                      Assign a zone ID and description to approve this tag
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
                    onClick={() => setShowApproveDialog(false)}
                    className="h-8 w-8 p-0"
                  >
                    <EyeClosedIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Zone Assignment
                    </h3>
                    <div className="text-sm text-gray-500">
                      Required fields are marked with *
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label htmlFor="zoneId" className="text-sm font-medium flex items-center gap-1">
                        Zone ID <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Select
                          value={zoneId}
                          onValueChange={(value) => {
                            setZoneId(value);
                            const selectedZone = DUMMY_ZONES.find(z => z.id?.toString() === value);
                            if (selectedZone) {
                              setZoneDescription(selectedZone.description || "");
                            }
                          }}
                        >
                          <SelectTrigger className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                            <SelectValue placeholder="Select zone identifier" />
                          </SelectTrigger>
                          <SelectContent>
                            {DUMMY_ZONES.map((zone) => (
                              <SelectItem key={zone.id} value={zone.id?.toString()}>
                                {zone.uniqueId} {zone.name ? `- ${zone.description}` : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-xs text-gray-500">
                        Enter the zone ID where this tag belongs
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="udc" className="text-sm font-medium">
                        UDC
                      </label>
                      <div className="relative">
                        <input
                          id="udc"
                          type="text"
                          value={udc}
                          onChange={(e) => setUdc(e.target.value)}
                          placeholder="Enter UDC (User Defined Code)"
                          className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Optional: User defined code for this tag
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="zoneDescription" className="text-sm font-medium">
                        Zone Description
                      </label>
                      <textarea
                        id="zoneDescription"
                        value={zoneDescription}
                        onChange={(e) => setZoneDescription(e.target.value)}
                        placeholder="Add any notes or description about this zone..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                      <p className="text-xs text-gray-500">
                        Optional: Add details about the zone location or any special instructions
                      </p>
                    </div>

                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm text-gray-700 mb-3">
                          Tag Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Tag Barcode:</span>
                              <span className="font-medium">{selectedItem?.barcode || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Info / Category:</span>
                              <span className="font-medium">{selectedItem?.udc || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Status Code:</span>
                              <span className="font-medium">{selectedItem?.status || 'FIX'}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Event ID:</span>
                              <span className="font-medium">{selectedItem?.eventId || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Entered At:</span>
                              <span className="font-medium">
                                {selectedItem?.createdAt ? new Date(selectedItem.createdAt).toLocaleString() : 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Manual Tag Approval</span>
                  <span className="mx-2">•</span>
                  {zoneId ? (
                    <span className="text-green-600">Zone ID entered</span>
                  ) : (
                    <span className="text-red-600">Zone ID required</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowApproveDialog(false);
                      setZoneId("");
                      setZoneDescription("");
                    }}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-emerald-700"
                    onClick={handleApproveSubmit}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Tag
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderManualBarcodes = () => {
    if (filteredFixedItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <Barcode className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No manual barcodes found</h3>
          <p className="text-gray-500">Your filters didn't match any manual barcodes.</p>
        </div>
      );
    }

    return (
      <>
        <div className="space-y-4">
          {filteredFixedItems.map((item) => (
            <motion.div
              key={item.id || item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border-2 border-purple-100 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Barcode className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-lg text-gray-900">
                        {item.item?.barcode || item.barcode || 'N/A'}
                      </h3>
                      {item.tag?.barcode && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md font-bold text-[10px] uppercase border border-blue-200">
                          TAG: {item.tag.barcode}
                        </span>
                      )}
                      {item.tag?.zone?.uniqueId && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md font-bold text-[10px] uppercase border border-purple-200">
                          {item.tag.zone.uniqueId}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.item?.description || item.productName || 'Manual Barcode Entry'}</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                  {item.status || 'PENDING'}
                </div>
              </div>

              <div className="mb-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Entered By</p>
                    <p className="font-medium flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {item.eventUserRole?.user?.name || item.enteredBy || "Counter"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Entered At</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "---"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg lg:col-span-1 col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="font-medium flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-red-500" />
                      {item.tag?.zone?.name || "Manual Area"}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-sm text-gray-600 mb-1">Manual Entry Value</p>
                  <p className="font-medium text-lg bg-blue-100 inline-block px-1 rounded">{item.item?.barcode || item.barcode || "N/A"}</p>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Reason</p>
                  <p className="font-medium">{item.reason || "Product not found in master file"}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p>Action Required: Confirm barcode entry to update SKU master</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTagAction(item.id || item._id, "reject")}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => openBarcodeApprovalDialog(item)}
                    className="px-3 py-1.5 text-sm bg-purple-600 text-white hover:bg-purple-700 rounded-lg font-medium transition-colors"
                  >
                    Approve Barcode
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barcode Approval Dialog */}
        <Dialog
          open={showApproveDialog && activeSection === "manualBarcodes"}
          onOpenChange={setShowApproveDialog}
          className="w-full"
        >
          <DialogContent
            className={`
          ${isFullscreen
                ? "w-full h-full max-w-none max-h-none rounded-none"
                : "!w-[95vw] !max-w-[1200px] max-h-[90vh] mx-auto my-0"
              }
          overflow-hidden flex flex-col p-0
        `}
          >
            <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Barcode className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold">
                      Approve Barcode: {selectedItem?.barcode || selectedItem?.item?.barcode || "N/A"}
                    </DialogTitle>
                    <DialogDescription>
                      Assign an SKU and description to approve this barcode
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
                    onClick={() => setShowApproveDialog(false)}
                    className="h-8 w-8 p-0"
                  >
                    <EyeClosedIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      SKU Assignment
                    </h3>
                    <div className="text-sm text-gray-500">
                      Required fields are marked with *
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label htmlFor="sku" className="text-sm font-medium flex items-center gap-1">
                        SKU  <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="sku"
                          type="text"
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                          placeholder="Enter SKU code (e.g., NIKE-AM270-BLK)"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                        <Barcode className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500">
                        Enter the official SKU code for this product
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="productDescription" className="text-sm font-medium">
                        Product Description
                      </label>
                      <textarea
                        id="productDescription"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        placeholder="Add product description, features, or specifications..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                      />
                      <p className="text-xs text-gray-500">
                        Optional: Add detailed product description for inventory records
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="itemCategory" className="text-sm font-medium">
                        Category
                      </label>
                      <div className="relative">
                        <input
                          id="itemCategory"
                          type="text"
                          value={udc}
                          onChange={(e) => setUdc(e.target.value)}
                          placeholder="Enter SKU Category"
                          className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm text-gray-700 mb-3">
                          Barcode Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Scanned Barcode:</span>
                              <span className="font-medium text-red-600 font-mono">{selectedItem?.item?.barcode || selectedItem?.barcode || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Target SKU:</span>
                              <span className="font-bold text-purple-700">{sku || 'Not Assigned'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Product / Name:</span>
                              <span className="font-medium">{selectedItem?.productName || selectedItem?.item?.description || 'Manual Entry'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Category / UDC:</span>
                              <span className="font-medium">{selectedItem?.udc || 'N/A'}</span>
                            </div>
                            <div className="pt-3 border-t border-gray-200 mt-3 flex flex-wrap gap-3">
                              <div className="bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-blue-200 shadow-sm">
                                <MapPin className="h-4 w-4 text-blue-600" />
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase tracking-wider text-blue-500 font-bold leading-none">Zone</span>
                                  <span className="text-sm font-bold text-blue-800 line-height-1">
                                    {selectedItem?.tag?.zone?.uniqueId} - {selectedItem?.tag?.zone?.name || 'N/A'}
                                  </span>
                                </div>
                              </div>
                              <div className="bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-emerald-200 shadow-sm">
                                <Tag className="h-4 w-4 text-emerald-600" />
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold leading-none">Tag</span>
                                  <span className="text-sm font-bold text-emerald-800 line-height-1">
                                    {selectedItem?.tag?.barcode || (selectedItem?.barcode?.startsWith('T') ? selectedItem.barcode : 'N/A')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Entered By:</span>
                              <span className="font-medium">{selectedItem?.enteredBy || selectedItem?.eventId || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Entered At:</span>
                              <span className="font-medium">{selectedItem?.enteredAt || selectedItem?.createdAt || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Reason:</span>
                              <span className="font-medium">{selectedItem?.reason || "SKU not in master file"}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Card className="border-blue-100 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-gray-900">
                          Important Information
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                          <li>This SKU will be added to the master inventory file</li>
                          <li>Once approved, this barcode can be used for future scans</li>
                          <li>Ensure the SKU code follows your company's naming convention</li>
                          <li>The product description will help with inventory identification</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Manual Barcode Approval</span>
                  <span className="mx-2">•</span>
                  {sku ? (
                    <span className="text-green-600">SKU code entered</span>
                  ) : (
                    <span className="text-red-600">SKU code required</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowApproveDialog(false);
                      setZoneId("");
                      setZoneDescription("");
                      setUdc("");
                    }}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-emerald-700"
                    onClick={handleApproveSubmit}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Barcode
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "duplicate":
        return renderDuplicateTags();
      case "manualTags":
        return renderManualTags();
      case "manualBarcodes":
        return renderManualBarcodes();
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 rounded-2xl p-4 md:p-6 border-2 border-blue-200 shadow-lg">
        <div className="max-w-8xl mx-auto">
          <div className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Wrench className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold theme-text-primary">
              Fix & Resolve Issues
            </h1>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${activeSection === section.id
                      ? "border-red-500 bg-red-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${activeSection === section.id
                            ? "bg-red-100"
                            : "bg-gray-100"
                          }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${activeSection === section.id
                              ? "text-red-600"
                              : "text-gray-600"
                            }`}
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-800">
                          {section.label}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {section.count} items need attention
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-2xl font-bold ${activeSection === section.id
                          ? "text-red-600"
                          : "text-gray-700"
                        }`}
                    >
                      {section.count}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tags, barcodes, or products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="w-48">
                  <Select value={activeZone} onValueChange={setActiveZone}>
                    <SelectTrigger className="w-full border-gray-300 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <SelectValue placeholder="Select Zone" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {DUMMY_ZONES.map((zone) => (
                        <SelectItem key={zone.id} value={zone.id?.toString()}>
                          {zone.uniqueId || zone.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleRefresh}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
                <button 
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {statusOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setFilters({ ...filters, status: option.value })}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filters.status === option.value ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Range
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {dateRangeOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setFilters({ ...filters, dateRange: option.value })}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${filters.dateRange === option.value ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setFilters({ status: "all", dateRange: "today" });
                          setSearchQuery("");
                        }}
                        className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Selected Items Actions */}
          {selectedTags.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
              <span className="font-semibold text-blue-900">
                {selectedTags.length} items selected
              </span>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleBulkAction("void")}
                  className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium transition-colors"
                >
                  Void Selected
                </button>
                <button
                  onClick={() => handleBulkAction("approve")}
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-colors"
                >
                  Approve Selected
                </button>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2">
                {(() => {
                  const SectionIcon = sections.find((s) => s.id === activeSection)?.icon || AlertCircle;
                  return <SectionIcon className="h-6 w-6 text-blue-600" />;
                })()}
                <h2 className="text-2xl font-bold theme-text-primary">
                  {sections.find((s) => s.id === activeSection)?.label}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">
                  {activeSection === "duplicate" && filteredDuplicateTags.length}
                  {activeSection === "manualTags" && filteredFixedTags.length}
                  {activeSection === "manualBarcodes" && filteredFixedItems.length}
                </span>{" "}
                items
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Eye className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </div>

      {/* Pending FIX Items Diagnostic Dialog */}
      <Dialog open={pendingFixDialog.open} onOpenChange={(open) => setPendingFixDialog(prev => ({ ...prev, open }))}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertCircle className="h-6 w-6" />
              <DialogTitle className="text-xl font-bold">
                Action Blocked
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 font-medium">
              {pendingFixDialog.message}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto my-4 border rounded-xl overflow-hidden bg-gray-50">
            <div className="divide-y divide-gray-200">
              {pendingFixDialog.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setPendingFixDialog(prev => ({ ...prev, open: false }));
                    setActiveSection("manualBarcodes");
                    setSearchQuery(item.item?.barcode || "");
                    const fullItem = DUMMY_FIXED_ITEMS.find(fi => (fi.id || fi._id) === item.id);
                    if (fullItem) {
                      openBarcodeApprovalDialog(fullItem);
                    } else {
                      const fullTag = DUMMY_FIXED_TAGS.find(ft => (ft.id || ft._id) === item.id);
                      if (fullTag) {
                        openTagApprovalDialog(fullTag);
                      }
                    }
                  }}
                  className="p-4 bg-white flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <Barcode className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{item.item?.barcode || "N/A"}</h4>
                      <p className="text-xs text-gray-500">{item.item?.description || "Click to navigate and fix"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 -rotate-90 text-gray-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}