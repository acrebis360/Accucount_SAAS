"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  RefreshCw,
  Package,
  Barcode,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Search,
  Filter,
  Users,
  Trash2,
  Edit,
  Save,
  X,
  Edit2,
  PencilIcon,
  AlertCircle,
  AlertTriangle,
  Tags,
  Check,
  Plus,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

import TablePagination from "@/components/ui/utils/TablePagination";
import useToast from "@/components/ui/toast/useToast";
import BackButton from "@/components/ui/customeComponent/BackButton";
import ManualEntryDialog from "@/components/ui/dialogs/ManualEntryDialog";

// Dummy SKU Items Data
const DUMMY_SKU_ITEMS = [
  {
    id: "item-1",
    scannedTagId: "scan-1",
    quantity: 25,
    auditQuantity: 25,
    finalQuantity: 25,
    status: "verified",
    isInsert: false,
    item: {
      id: "prod-1",
      barcode: "BAR-001",
      sku: "SKU-001",
      description: "Wireless Bluetooth Headphones",
      category: "Electronics",
      unit: "pcs"
    }
  },
  {
    id: "item-2",
    scannedTagId: "scan-2",
    quantity: 15,
    auditQuantity: 12,
    finalQuantity: 13,
    status: "discrepancy",
    isInsert: false,
    item: {
      id: "prod-2",
      barcode: "BAR-002",
      sku: "SKU-002",
      description: "USB-C Charging Cable 2m",
      category: "Accessories",
      unit: "pcs"
    }
  },
  {
    id: "item-3",
    scannedTagId: "scan-3",
    quantity: 8,
    auditQuantity: 8,
    finalQuantity: 8,
    status: "verified",
    isInsert: false,
    item: {
      id: "prod-3",
      barcode: "BAR-003",
      sku: "SKU-003",
      description: "Smart Watch Fitness Tracker",
      category: "Wearables",
      unit: "pcs"
    }
  },
  {
    id: "item-4",
    scannedTagId: "scan-4",
    quantity: 30,
    auditQuantity: 28,
    finalQuantity: 29,
    status: "discrepancy",
    isInsert: false,
    item: {
      id: "prod-4",
      barcode: "BAR-004",
      sku: "SKU-004",
      description: "Wireless Charging Pad",
      category: "Electronics",
      unit: "pcs"
    }
  },
  {
    id: "item-5",
    scannedTagId: "scan-5",
    quantity: 12,
    auditQuantity: 12,
    finalQuantity: 12,
    status: "verified",
    isInsert: false,
    item: {
      id: "prod-5",
      barcode: "BAR-005",
      sku: "SKU-005",
      description: "Bluetooth Speaker Portable",
      category: "Audio",
      unit: "pcs"
    }
  },
  {
    id: "item-6",
    scannedTagId: "scan-6",
    quantity: 5,
    auditQuantity: 5,
    finalQuantity: 5,
    status: "pending",
    isInsert: false,
    item: {
      id: "prod-6",
      barcode: "BAR-006",
      sku: "SKU-006",
      description: "Phone Stand Adjustable",
      category: "Accessories",
      unit: "pcs"
    }
  },
  {
    id: "item-7",
    scannedTagId: "scan-7",
    quantity: 20,
    auditQuantity: 18,
    finalQuantity: 19,
    status: "discrepancy",
    isInsert: false,
    item: {
      id: "prod-7",
      barcode: "BAR-007",
      sku: "SKU-007",
      description: "Power Bank 10000mAh",
      category: "Electronics",
      unit: "pcs"
    }
  },
  {
    id: "item-8",
    scannedTagId: "scan-8",
    quantity: 10,
    auditQuantity: 10,
    finalQuantity: 10,
    status: "verified",
    isInsert: false,
    item: {
      id: "prod-8",
      barcode: "BAR-008",
      sku: "SKU-008",
      description: "Car Phone Holder",
      category: "Automotive",
      unit: "pcs"
    }
  },
  {
    id: "item-9",
    scannedTagId: "scan-9",
    quantity: 7,
    auditQuantity: 7,
    finalQuantity: 7,
    status: "pending",
    isInsert: false,
    item: {
      id: "prod-9",
      barcode: "BAR-009",
      sku: "SKU-009",
      description: "Screen Protector Tempered Glass",
      category: "Accessories",
      unit: "pcs"
    }
  },
  {
    id: "item-10",
    scannedTagId: "scan-10",
    quantity: 3,
    auditQuantity: 3,
    finalQuantity: 3,
    status: "verified",
    isInsert: true,
    item: {
      id: "prod-10",
      barcode: "BAR-010",
      sku: "SKU-010",
      description: "USB Flash Drive 64GB",
      category: "Storage",
      unit: "pcs"
    }
  }
];

// Dummy Items for manual entry suggestions
const DUMMY_ITEMS = [
  { id: "prod-1", barcode: "BAR-001", sku: "SKU-001", description: "Wireless Bluetooth Headphones", category: "Electronics" },
  { id: "prod-2", barcode: "BAR-002", sku: "SKU-002", description: "USB-C Charging Cable 2m", category: "Accessories" },
  { id: "prod-3", barcode: "BAR-003", sku: "SKU-003", description: "Smart Watch Fitness Tracker", category: "Wearables" },
  { id: "prod-4", barcode: "BAR-004", sku: "SKU-004", description: "Wireless Charging Pad", category: "Electronics" },
  { id: "prod-5", barcode: "BAR-005", sku: "SKU-005", description: "Bluetooth Speaker Portable", category: "Audio" }
];

const TagSKUsPage = ({
  tagId,
  eventId,
  zoneId,
  eventName,
  zoneName,
  onBack,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTagId = tagId || searchParams.get("tagid");
  const { toast, success, error: toastError, info } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNoAudit, setIsNoAudit] = useState(false);
  
  // Mock mutation states
  const [isMarkingCompleted, setIsMarkingCompleted] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const [isUpdatingItem, setIsUpdatingItem] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isVerifyingItem, setIsVerifyingItem] = useState(false);
  const [currentProcessingId, setCurrentProcessingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [skus, setSkus] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [tempQty, setTempQty] = useState("");

  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [addItemForm, setAddItemForm] = useState({
    tagBarcode: "",
    itemBarcode: "",
    auditQty: ""
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // Dummy tag data
  const tagData = useMemo(() => {
    const totalItems = DUMMY_SKU_ITEMS.length;
    const totalCountedQuantity = DUMMY_SKU_ITEMS.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalFinalQuantity = DUMMY_SKU_ITEMS.reduce((sum, item) => sum + (item.finalQuantity || 0), 0);
    const countedBy = ["John Doe", "Jane Smith"];
    const auditedBy = "Mike Johnson";

    return {
      id: currentTagId || "TAG-001",
      eventId: eventId || "EVT-001",
      eventName: eventName || "Annual Inventory Count 2024",
      zoneId: zoneId || "ZONE-A-001",
      zoneName: zoneName || "Electronics Section",
      totalSKUs: totalItems,
      totalItems: totalItems,
      countedItems: totalItems,
      status: "in-progress",
      skus: DUMMY_SKU_ITEMS,
      quantity: totalItems,
      auditId: "AUDIT-001",
      totalCountedQuantity: totalCountedQuantity,
      totalFinalQuantity: totalFinalQuantity,
      tagId: currentTagId || "TAG-001",
      scanId: "SCAN-001",
      countedBy: countedBy,
      auditedBy: auditedBy
    };
  }, [currentTagId, eventId, eventName, zoneId, zoneName]);

  // Update skus when tagData.skus changes
  useEffect(() => {
    if (tagData.skus) {
      setSkus(tagData.skus);
    }
  }, [tagData.skus]);

  const handleMarkCompleted = async (selected) => {
    try {
      setIsMarkingCompleted(true);
      if (selected) {
        setTimeout(() => {
          success("Tag completed successfully");
          setIsMarkingCompleted(false);
        }, 500);
      } else {
        setTimeout(() => {
          success("Tag unmarked successfully");
          setIsMarkingCompleted(false);
        }, 500);
      }
    } catch (error) {
      console.error("Failed to update tag status:", error);
      toastError("Failed to update tag status");
      setIsMarkingCompleted(false);
    }
  };

  // Filter and search SKUs
  const filteredSKUs = useMemo(() => {
    return skus.filter((sku) => {
      const matchesSearch =
        String(sku.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(sku.item?.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(sku.item?.sku || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(sku.item?.barcode || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(sku.item?.category || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || sku.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, skus]);

  // Calculate progress statistics
  const progressStats = useMemo(() => {
    const totalSKUs = skus.length;
    const verifiedSKUs = skus.filter(
      (sku) => sku.status === "verified"
    ).length;
    const pendingSKUs = skus.filter(
      (sku) => sku.status === "pending"
    ).length;
    const discrepancySKUs = skus.filter(
      (sku) => sku.status === "discrepancy"
    ).length;

    const countedItems = skus.reduce(
      (sum, sku) => sum + (sku.quantity || 0),
      0
    );
    const progressPercentage = Math.round(
      (countedItems / tagData.totalItems) * 100
    );

    return {
      totalSKUs,
      verifiedSKUs,
      pendingSKUs,
      discrepancySKUs,
      countedItems,
      progressPercentage,
      verifiedPercentage: Math.round((verifiedSKUs / totalSKUs) * 100),
      pendingPercentage: Math.round((pendingSKUs / totalSKUs) * 100),
      discrepancyPercentage: Math.round((discrepancySKUs / totalSKUs) * 100),
    };
  }, [skus, tagData.totalItems]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredSKUs.length / pageSize);

  const sortedSKUs = useMemo(() => {
    return [...filteredSKUs].sort((a, b) => {
      const aId = String(a.id || "");
      const bId = String(b.id || "");
      return aId.localeCompare(bId);
    });
  }, [filteredSKUs]);

  // Get current page data
  const currentSKUs = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedSKUs.slice(startIndex, endIndex);
  }, [currentPage, pageSize, sortedSKUs]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleSKUClick = (skuId) => {
    router.push(`/dashboard/live/count/${eventId}/skus/${skuId}`);
  };

  const handleDeleteSKU = async (skuId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this scanned item?")) {
      try {
        setCurrentProcessingId(skuId);
        setIsDeletingItem(true);
        setTimeout(() => {
          setSkus(prev => prev.filter(sku => sku.id !== skuId));
          success("Item deleted successfully");
          setIsDeletingItem(false);
          setCurrentProcessingId(null);
        }, 500);
      } catch (err) {
        console.error("Failed to delete SKU:", err);
        toastError("Failed to delete item");
        setIsDeletingItem(false);
        setCurrentProcessingId(null);
      }
    }
  };

  const handleEditQty = (skuId, field, currentQty, e) => {
    e.stopPropagation();
    setEditingId(skuId);
    setEditingField(field);
    setTempQty(currentQty.toString());
  };

  const handleSaveQty = async (skuId, field, e) => {
    e.stopPropagation();
    const val = parseInt(tempQty) || 0;
    const sku = skus.find(s => s.id === skuId);
    if (!sku) return;

    try {
      setCurrentProcessingId(skuId);
      setIsUpdatingItem(true);
      
      setTimeout(() => {
        setSkus(prev => prev.map(s => {
          if (s.id === skuId) {
            const updatedSku = { ...s };
            if (field === 'auditQuantity') {
              updatedSku.auditQuantity = val;
              updatedSku.variance = (updatedSku.quantity || 0) - val;
            } else if (field === 'finalQuantity') {
              updatedSku.finalQuantity = val;
              updatedSku.variance = (updatedSku.quantity || 0) - val;
            }
            return updatedSku;
          }
          return s;
        }));
        
        success("Quantity updated successfully");
        setIsUpdatingItem(false);
        setCurrentProcessingId(null);
      }, 500);

      setEditingId(null);
      setEditingField(null);
      setTempQty("");
    } catch (err) {
      console.error("Failed to update SKU quantity:", err);
      toastError("Failed to update quantity");
      setIsUpdatingItem(false);
      setCurrentProcessingId(null);
    }
  };

  const handleCancelEdit = (e) => {
    e?.stopPropagation();
    setEditingId(null);
    setEditingField(null);
    setTempQty("");
  };

  const handleQtyChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTempQty(value);
    }
  };

  const handleKeyPress = (e, skuId, field) => {
    if (e.key === "Enter") {
      handleSaveQty(skuId, field, e);
    } else if (e.key === "Escape") {
      handleCancelEdit(e);
    }
  };

  const handleConfirmQty = async (skuId, e) => {
    e.stopPropagation();
    const sku = skus.find((s) => s.id === skuId);
    if (!sku) return;

    try {
      setCurrentProcessingId(skuId);
      setIsVerifyingItem(true);
      
      setTimeout(() => {
        setSkus((prev) =>
          prev.map((s) =>
            s.id === skuId
              ? {
                  ...s,
                  status: "verified",
                }
              : s
          )
        );
        success("Quantity confirmed successfully");
        setIsVerifyingItem(false);
        setCurrentProcessingId(null);
      }, 500);
    } catch (err) {
      console.error("Failed to confirm SKU quantity:", err);
      toastError("Failed to confirm quantity");
      setIsVerifyingItem(false);
      setCurrentProcessingId(null);
    }
  };

  const handleReauditQty = async (skuId, e) => {
    e.stopPropagation();
    const sku = skus.find(s => s.id === skuId);
    if (!sku) return;

    try {
      setCurrentProcessingId(skuId);
      setIsUpdatingItem(true);
      
      setTimeout(() => {
        setSkus(prev => prev.map(s =>
          s.id === skuId ? { ...s, auditQuantity: 0, finalQuantity: 0, status: "pending", variance: s.quantity || 0 } : s
        ));
        success("Marked for re-audit successfully");
        setIsUpdatingItem(false);
        setCurrentProcessingId(null);
      }, 500);
    } catch (err) {
      console.error("Failed to re-audit SKU:", err);
      toastError("Failed to mark for re-audit");
      setIsUpdatingItem(false);
      setCurrentProcessingId(null);
    }
  };

  const handleAddItem = async () => {
    if (!addItemForm.itemBarcode || !addItemForm.auditQty) {
      toastError("Validation Error", {
        description: "Please fill in all required fields"
      });
      return;
    }

    try {
      setIsAddingItem(true);
      info("Saving...", {
        description: "Adding item to tag..."
      });

      setTimeout(() => {
        const newItem = {
          id: `item-${Date.now()}`,
          scannedTagId: `scan-${Date.now()}`,
          quantity: 0,
          auditQuantity: parseInt(addItemForm.auditQty) || 0,
          finalQuantity: parseInt(addItemForm.auditQty) || 0,
          status: "pending",
          isInsert: true,
          item: {
            id: `prod-${Date.now()}`,
            barcode: addItemForm.itemBarcode,
            sku: addItemForm.itemBarcode,
            description: "Manually added item",
            category: "General",
            unit: "pcs"
          }
        };
        
        setSkus(prev => [...prev, newItem]);
        success("Entry Added", {
          description: `Item ${addItemForm.itemBarcode} added successfully`
        });
        setIsAddingItem(false);
        setIsAddItemDialogOpen(false);
      }, 500);
    } catch (err) {
      console.error("Failed to add item to tag:", err);
      toastError("Error", {
        description: err?.message || "Failed to add item to tag"
      });
      setIsAddingItem(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      "not-started": {
        label: "Not Started",
        variant: "secondary",
        color: "bg-gray-300 text-gray-800",
        icon: Clock,
      },
      counted: {
        label: "Counted",
        variant: "success",
        color: "bg-green-300 text-green-800",
        icon: CheckCircle,
      },
      completed: {
        label: "Completed",
        variant: "success",
        color: "bg-emerald-500 text-white",
        icon: CheckCircle,
      },
      "in-progress": {
        label: "In Progress",
        variant: "default",
        color: "bg-blue-100 text-blue-800",
        icon: Clock,
      },
      fix: {
        label: "Fix",
        variant: "destructive",
        color: "bg-red-100 text-red-800",
        icon: AlertCircle,
      },
      "audit_in_progress": {
        label: "Audit In Progress",
        variant: "default",
        color: "bg-purple-100 text-purple-800",
        icon: Clock,
      },
      "audited": {
        label: "Audited",
        variant: "success",
        color: "bg-teal-500 text-white",
        icon: CheckCircle,
      },
      "inprogress": {
        label: "In Progress",
        variant: "default",
        color: "bg-blue-100 text-blue-800",
        icon: Clock,
      },
    };

    const normalizedStatus = status?.toLowerCase()?.replace(/[_-]/g, ' ');

    const config = statusConfig[normalizedStatus] ||
      statusConfig[status?.toLowerCase()] ||
      statusConfig[status?.toLowerCase()?.replace(/_/g, '-')] || {
      label: status,
      variant: "secondary",
      color: "bg-gray-100 text-gray-800",
      icon: Package,
    };

    return (
      <Badge className={`${config.color} flex items-center gap-1 border-0 font-medium px-2 py-0.5 h-6`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 new-bg">
      {/* Tag Overview Header */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Tags className="h-7 w-7" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Tags Details Overview
                </h1>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-6">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${isNoAudit ? "lg:grid-cols-7" : "lg:grid-cols-9"} gap-6`}>
            {/* Zone ID */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Package className="h-4 w-4" />
                <span className="text-sm font-medium">Zone ID</span>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {tagData.zoneId}
              </div>
            </div>

            {/* Tag ID */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Barcode className="h-4 w-4" />
                <span className="text-sm font-medium">Tag ID</span>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {tagData.id}
              </div>
            </div>

            {!isNoAudit && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-sm font-medium">Audited Quantity</span>
                </div>
                <div className="text-lg font-semibold ">{tagData.totalSKUs}</div>
              </div>
            )}

            {/* Total Counted Quantity */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm font-medium">Counted Qty</span>
              </div>
              <div className="text-lg font-semibold text-orange-600">
                {tagData.totalCountedQuantity.toLocaleString()}
              </div>
            </div>

            {/* Total Final Quantity */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm font-medium">Final Qty</span>
              </div>
              <div className="text-lg font-semibold text-blue-600">
                {tagData.totalFinalQuantity.toLocaleString()}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm font-medium">Counted By</span>
              </div>
              <div className="text-lg font-semibold ">{tagData.countedBy.join(" , ") || '-'}</div>
            </div>

            {!isNoAudit && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-sm font-medium">Audited By</span>
                </div>
                <div className="text-lg font-semibold ">{tagData.auditedBy || '-'}</div>
              </div>
            )}

            {/* Real Tag Status */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm font-medium">Status</span>
              </div>
              <div className="flex items-center h-8">
                {getStatusBadge(tagData.status)}
              </div>
            </div>

            {/* Mark as Complete Checkbox */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm font-medium">Mark Completed</span>
              </div>
              <div className="flex items-center h-8">
                {isMarkingCompleted ? (
                  <RefreshCw className="h-5 w-5 animate-spin text-emerald-600" />
                ) : (
                  <Checkbox
                    checked={tagData.status?.toLowerCase() === "completed"}
                    onCheckedChange={handleMarkCompleted}
                    disabled={tagData.status?.toLowerCase() === "completed"}
                    className="h-6 w-6 border-emerald-600 data-[state=checked]:bg-emerald-600"
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <Package className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-2xl font-bold theme-text-primary">
                    Tag Details
                  </CardTitle>
                </div>
              </div>
              <BackButton onClick={handleBack} showLabel={true} className="font-bold" />
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by product, SKU, barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="discrepancy">Discrepancy</SelectItem>
              </SelectContent>
            </Select>

            <div>
              <Button
                className="bg-black text-white"
                disabled={tagData.status?.toLowerCase() === "completed"}
                onClick={() => {
                  setAddItemForm({
                    tagBarcode: tagData.id || "",
                    itemBarcode: "",
                    auditQty: ""
                  });
                  setIsAddItemDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200 hover:bg-gray-300">
                <TableHead className="text-md font-bold text-gray-700 cursor-pointer">
                  Tag ID
                </TableHead>
                <TableHead className="text-md font-bold text-gray-700 cursor-pointer">
                  Barcode
                </TableHead>
                <TableHead className="text-md font-bold text-gray-700 cursor-pointer">
                  Description
                </TableHead>
                <TableHead className="text-md font-bold text-gray-700 cursor-pointer">
                  SKU
                </TableHead>
                <TableHead className="text-md font-bold text-gray-700 cursor-pointer">
                  Category
                </TableHead>
                <TableHead className="text-md font-bold text-gray-700 text-center cursor-pointer">
                  Count Qty
                </TableHead>

                {!isNoAudit && (
                  <>
                    <TableHead className="text-md font-bold text-gray-700 text-center cursor-pointer">
                      Audit Qty
                    </TableHead>
                  </>
                )}

                <TableHead className="text-md font-bold text-gray-700 text-center cursor-pointer">
                  Final Qty
                </TableHead>

                <TableHead className="text-md font-bold text-gray-700 text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && currentSKUs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isNoAudit ? 8 : 9} className="py-20 text-center">
                    <RefreshCw className="h-10 w-10 animate-spin mx-auto text-blue-600 mb-4" />
                    <p className="text-gray-500 font-medium font-bold text-md">Loading SKUs data...</p>
                  </TableCell>
                </TableRow>
              ) : isError && currentSKUs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isNoAudit ? 8 : 9} className="py-20 text-center">
                    <AlertTriangle className="h-10 w-10 mx-auto text-gray-500 mb-4" />
                    <p className="text-gray-500 font-medium font-bold text-md">sku not found</p>
                  </TableCell>
                </TableRow>
              ) : currentSKUs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isNoAudit ? 8 : 9} className="py-20 text-center">
                    <Package className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 font-medium font-bold text-md">No SKUs found matching your filters.</p>
                  </TableCell>
                </TableRow>
              ) : (
                currentSKUs.map((sku) => (
                  <TableRow
                    key={sku.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <TableCell className="font-medium text-gray-900">
                      <div className="space-y-1">
                        <div className="font-semibold text-[14px]">{tagData.id}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-[14px] text-gray-600">
                      {sku.item?.barcode || "-"}
                    </TableCell>
                    <TableCell className="font-semibold text-[14px] text-gray-900">
                      {sku.item?.description || "-"}
                    </TableCell>
                    <TableCell className="font-semibold text-[14px] text-gray-900">
                      {sku.item?.sku || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-[14px] text-gray-600 max-w-xs truncate">
                        {sku.item?.category || "-"}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <span className="font-semibold text-[14px]">
                          {sku.quantity}
                        </span>
                      </div>
                    </TableCell>

                    {!isNoAudit && (
                      <>
                        <TableCell className="text-center">
                          {editingId === sku.id && editingField === 'auditQuantity' ? (
                            <div className="flex items-center gap-1 ">
                              <Input
                                type="text"
                                value={tempQty}
                                onChange={handleQtyChange}
                                onKeyDown={(e) => handleKeyPress(e, sku.id, 'auditQuantity')}
                                className="w-20 h-8 text-right"
                                autoFocus
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => handleSaveQty(sku.id, 'auditQuantity', e)}
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                                disabled={isUpdatingItem && currentProcessingId === sku.id}
                              >
                                {isUpdatingItem && currentProcessingId === sku.id ? (
                                  <RefreshCw className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Save className="h-3 w-3" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCancelEdit}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 justify-center">
                              <span className="font-semibold text-md">
                                {sku.auditQuantity || 0}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={tagData.status?.toLowerCase() === "completed"}
                                onClick={(e) =>
                                  handleEditQty(sku.id, 'auditQuantity', sku.auditQuantity || 0, e)
                                }
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </>
                    )}

                    <TableCell className="text-center">
                      {editingId === sku.id && editingField === 'finalQuantity' ? (
                        <div className="flex items-center gap-1 ">
                          <Input
                            type="text"
                            value={tempQty}
                            onChange={handleQtyChange}
                            onKeyDown={(e) => handleKeyPress(e, sku.id, 'finalQuantity')}
                            className="w-20 h-8 text-right"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => handleSaveQty(sku.id, 'finalQuantity', e)}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                            disabled={isUpdatingItem && currentProcessingId === sku.id}
                          >
                            {isUpdatingItem && currentProcessingId === sku.id ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <Save className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelEdit}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span className="font-semibold text-md">
                            {sku.finalQuantity || 0}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={tagData.status?.toLowerCase() === "completed"}
                            onClick={(e) =>
                              handleEditQty(sku.id, 'finalQuantity', sku.finalQuantity || sku.auditQuantity || sku.quantity || 0, e)
                            }
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDeleteSKU(sku.id, e)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={tagData.status?.toLowerCase() === "completed"}
                        >
                          {isDeletingItem && currentProcessingId === sku.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>

                        {!isNoAudit && (
                          <>
                            <Button
                              size="sm"
                              onClick={(e) => handleConfirmQty(sku.id, e)}
                              className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white"
                              disabled={
                                tagData.status?.toLowerCase() === "completed" || editingId === sku.id
                              }
                              title="Confirm"
                            >
                              {isVerifyingItem && currentProcessingId === sku.id ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleReauditQty(sku.id, e)}
                              className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                              disabled={tagData.status?.toLowerCase() === "completed" || editingId === sku.id}
                              title="Re-audit"
                            >
                              {isUpdatingItem && currentProcessingId === sku.id ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <RefreshCw className="h-4 w-4" />
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {filteredSKUs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No SKUs found matching your criteria
            </div>
          )}
        </CardContent>

        {/* Pagination */}
        {filteredSKUs.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Card>
      {/* Add Manual Item Dialog */}
      <ManualEntryDialog
        open={isAddItemDialogOpen}
        onOpenChange={setIsAddItemDialogOpen}
        tagData={tagData}
        isNoAudit={isNoAudit}
        addItemForm={addItemForm}
        setAddItemForm={setAddItemForm}
        handleAddItem={handleAddItem}
        isPending={isAddingItem}
        allItems={DUMMY_ITEMS}
      />
    </div>
  );
};

export default TagSKUsPage;