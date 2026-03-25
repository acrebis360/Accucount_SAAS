"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  FileText,
  BarChart3,
  ClipboardCheck,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  Calendar,
  Maximize2,
  Minimize2,
  Undo2,
  Save,
  EyeClosedIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useToast from "@/components/ui/toast/useToast";


// Dummy Audit Validation Data
const DUMMY_VALIDATE_TAGS = {
  mode: "Global Audit",
  summary: {
    totalTags: 12,
    auditedTags: 10,
    matchingTags: 6,
    mismatchedTags: 4,
    pendingTags: 2,
    auditProgress: 83,
    auditDate: "2024-03-25",
    auditor: "John Smith",
  },
  tags: [
    {
      id: "tag-001",
      tagId: "tag-001",
      barcode: "TAG-001",
      tagNumber: "TAG-001",
      zone: "Electronics Section",
      zoneCode: "ZONE-A-001",
      zoneName: "Electronics Section",
      countQuantity: 150,
      auditQuantity: 150,
      status: "matched",
      auditTime: "2024-03-25T10:30:00Z",
      auditor: "John Smith",
      scannedTagId: "scan-001",
      skuDetails: [
        {
          id: "sku-001",
          barcode: "BAR-001",
          description: "Wireless Bluetooth Headphones",
          countQty: 25,
          auditQty: 25,
          match: true,
          scannedTagId: "scan-001",
        },
        {
          id: "sku-002",
          barcode: "BAR-002",
          description: "USB-C Charging Cable",
          countQty: 30,
          auditQty: 30,
          match: true,
          scannedTagId: "scan-001",
        },
        {
          id: "sku-003",
          barcode: "BAR-003",
          description: "Smart Watch",
          countQty: 45,
          auditQty: 45,
          match: true,
          scannedTagId: "scan-001",
        },
        {
          id: "sku-004",
          barcode: "BAR-004",
          description: "Wireless Charger",
          countQty: 25,
          auditQty: 25,
          match: true,
          scannedTagId: "scan-001",
        },
        {
          id: "sku-005",
          barcode: "BAR-005",
          description: "Bluetooth Speaker",
          countQty: 25,
          auditQty: 25,
          match: true,
          scannedTagId: "scan-001",
        },
      ],
    },
    {
      id: "tag-002",
      tagId: "tag-002",
      barcode: "TAG-002",
      tagNumber: "TAG-002",
      zone: "Clothing Section",
      zoneCode: "ZONE-B-002",
      zoneName: "Clothing Section",
      countQuantity: 98,
      auditQuantity: 98,
      status: "matched",
      auditTime: "2024-03-25T11:15:00Z",
      auditor: "John Smith",
      scannedTagId: "scan-002",
      skuDetails: [
        {
          id: "sku-006",
          barcode: "BAR-006",
          description: "Cotton T-Shirt",
          countQty: 50,
          auditQty: 50,
          match: true,
          scannedTagId: "scan-002",
        },
        {
          id: "sku-007",
          barcode: "BAR-007",
          description: "Jeans",
          countQty: 30,
          auditQty: 30,
          match: true,
          scannedTagId: "scan-002",
        },
        {
          id: "sku-008",
          barcode: "BAR-008",
          description: "Jacket",
          countQty: 18,
          auditQty: 18,
          match: true,
          scannedTagId: "scan-002",
        },
      ],
    },
    {
      id: "tag-003",
      tagId: "tag-003",
      barcode: "TAG-003",
      tagNumber: "TAG-003",
      zone: "Grocery Section",
      zoneCode: "ZONE-C-003",
      zoneName: "Grocery Section",
      countQuantity: 210,
      auditQuantity: 195,
      status: "mismatched",
      auditTime: "2024-03-25T09:45:00Z",
      auditor: "Jane Smith",
      scannedTagId: "scan-003",
      skuDetails: [
        {
          id: "sku-009",
          barcode: "BAR-009",
          description: "Rice 5kg",
          countQty: 50,
          auditQty: 48,
          match: false,
          scannedTagId: "scan-003",
        },
        {
          id: "sku-010",
          barcode: "BAR-010",
          description: "Cooking Oil",
          countQty: 40,
          auditQty: 40,
          match: true,
          scannedTagId: "scan-003",
        },
        {
          id: "sku-011",
          barcode: "BAR-011",
          description: "Sugar 1kg",
          countQty: 60,
          auditQty: 55,
          match: false,
          scannedTagId: "scan-003",
        },
        {
          id: "sku-012",
          barcode: "BAR-012",
          description: "Salt 500g",
          countQty: 30,
          auditQty: 30,
          match: true,
          scannedTagId: "scan-003",
        },
        {
          id: "sku-013",
          barcode: "BAR-013",
          description: "Flour 1kg",
          countQty: 30,
          auditQty: 22,
          match: false,
          scannedTagId: "scan-003",
        },
      ],
    },
    {
      id: "tag-004",
      tagId: "tag-004",
      barcode: "TAG-004",
      tagNumber: "TAG-004",
      zone: "Furniture Section",
      zoneCode: "ZONE-D-004",
      zoneName: "Furniture Section",
      countQuantity: 85,
      auditQuantity: 85,
      status: "matched",
      auditTime: "2024-03-25T14:20:00Z",
      auditor: "Mike Johnson",
      scannedTagId: "scan-004",
      skuDetails: [
        {
          id: "sku-014",
          barcode: "BAR-014",
          description: "Coffee Table",
          countQty: 15,
          auditQty: 15,
          match: true,
          scannedTagId: "scan-004",
        },
        {
          id: "sku-015",
          barcode: "BAR-015",
          description: "Dining Chair",
          countQty: 30,
          auditQty: 30,
          match: true,
          scannedTagId: "scan-004",
        },
        {
          id: "sku-016",
          barcode: "BAR-016",
          description: "Bookshelf",
          countQty: 20,
          auditQty: 20,
          match: true,
          scannedTagId: "scan-004",
        },
        {
          id: "sku-017",
          barcode: "BAR-017",
          description: "Desk Lamp",
          countQty: 20,
          auditQty: 20,
          match: true,
          scannedTagId: "scan-004",
        },
      ],
    },
    {
      id: "tag-005",
      tagId: "tag-005",
      barcode: "TAG-005",
      tagNumber: "TAG-005",
      zone: "Toys Section",
      zoneCode: "ZONE-E-005",
      zoneName: "Toys Section",
      countQuantity: 145,
      auditQuantity: 132,
      status: "mismatched",
      auditTime: "2024-03-25T13:00:00Z",
      auditor: "Sarah Williams",
      scannedTagId: "scan-005",
      skuDetails: [
        {
          id: "sku-018",
          barcode: "BAR-018",
          description: "Action Figure",
          countQty: 50,
          auditQty: 48,
          match: false,
          scannedTagId: "scan-005",
        },
        {
          id: "sku-019",
          barcode: "BAR-019",
          description: "Board Game",
          countQty: 25,
          auditQty: 25,
          match: true,
          scannedTagId: "scan-005",
        },
        {
          id: "sku-020",
          barcode: "BAR-020",
          description: "Plush Toy",
          countQty: 40,
          auditQty: 38,
          match: false,
          scannedTagId: "scan-005",
        },
        {
          id: "sku-021",
          barcode: "BAR-021",
          description: "Puzzle",
          countQty: 30,
          auditQty: 21,
          match: false,
          scannedTagId: "scan-005",
        },
      ],
    },
    {
      id: "tag-006",
      tagId: "tag-006",
      barcode: "TAG-006",
      tagNumber: "TAG-006",
      zone: "Sports Section",
      zoneCode: "ZONE-F-006",
      zoneName: "Sports Section",
      countQuantity: 210,
      auditQuantity: 210,
      status: "matched",
      auditTime: "2024-03-25T15:30:00Z",
      auditor: "David Brown",
      scannedTagId: "scan-006",
      skuDetails: [
        {
          id: "sku-022",
          barcode: "BAR-022",
          description: "Basketball",
          countQty: 50,
          auditQty: 50,
          match: true,
          scannedTagId: "scan-006",
        },
        {
          id: "sku-023",
          barcode: "BAR-023",
          description: "Soccer Ball",
          countQty: 60,
          auditQty: 60,
          match: true,
          scannedTagId: "scan-006",
        },
        {
          id: "sku-024",
          barcode: "BAR-024",
          description: "Tennis Racket",
          countQty: 40,
          auditQty: 40,
          match: true,
          scannedTagId: "scan-006",
        },
        {
          id: "sku-025",
          barcode: "BAR-025",
          description: "Yoga Mat",
          countQty: 35,
          auditQty: 35,
          match: true,
          scannedTagId: "scan-006",
        },
        {
          id: "sku-026",
          barcode: "BAR-026",
          description: "Dumbbell Set",
          countQty: 25,
          auditQty: 25,
          match: true,
          scannedTagId: "scan-006",
        },
      ],
    },
    {
      id: "tag-007",
      tagId: "tag-007",
      barcode: "TAG-007",
      tagNumber: "TAG-007",
      zone: "Books Section",
      zoneCode: "ZONE-G-007",
      zoneName: "Books Section",
      countQuantity: 320,
      auditQuantity: 315,
      status: "mismatched",
      auditTime: "2024-03-25T12:15:00Z",
      auditor: "Emily Davis",
      scannedTagId: "scan-007",
      skuDetails: [
        {
          id: "sku-027",
          barcode: "BAR-027",
          description: "Fiction Books",
          countQty: 150,
          auditQty: 148,
          match: false,
          scannedTagId: "scan-007",
        },
        {
          id: "sku-028",
          barcode: "BAR-028",
          description: "Non-Fiction Books",
          countQty: 100,
          auditQty: 100,
          match: true,
          scannedTagId: "scan-007",
        },
        {
          id: "sku-029",
          barcode: "BAR-029",
          description: "Children's Books",
          countQty: 70,
          auditQty: 67,
          match: false,
          scannedTagId: "scan-007",
        },
      ],
    },
    {
      id: "tag-008",
      tagId: "tag-008",
      barcode: "TAG-008",
      tagNumber: "TAG-008",
      zone: "Beauty Section",
      zoneCode: "ZONE-H-008",
      zoneName: "Beauty Section",
      countQuantity: 95,
      auditQuantity: 0,
      status: "pending",
      auditTime: null,
      auditor: "---",
      scannedTagId: "scan-008",
      skuDetails: [
        {
          id: "sku-030",
          barcode: "BAR-030",
          description: "Lipstick",
          countQty: 40,
          auditQty: 0,
          match: false,
          scannedTagId: "scan-008",
        },
        {
          id: "sku-031",
          barcode: "BAR-031",
          description: "Foundation",
          countQty: 30,
          auditQty: 0,
          match: false,
          scannedTagId: "scan-008",
        },
        {
          id: "sku-032",
          barcode: "BAR-032",
          description: "Mascara",
          countQty: 25,
          auditQty: 0,
          match: false,
          scannedTagId: "scan-008",
        },
      ],
    },
    {
      id: "tag-009",
      tagId: "tag-009",
      barcode: "TAG-009",
      tagNumber: "TAG-009",
      zone: "Automotive Section",
      zoneCode: "ZONE-I-009",
      zoneName: "Automotive Section",
      countQuantity: 0,
      auditQuantity: 0,
      status: "pending",
      auditTime: null,
      auditor: "---",
      scannedTagId: "scan-009",
      skuDetails: [],
    },
  ],
};

const AuditValidationPage = () => {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [expandedTag, setExpandedTag] = useState(null);
  const [mismatchDialogOpen, setMismatchDialogOpen] = useState(false);
  const [selectedTagForMismatch, setSelectedTagForMismatch] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editingRows, setEditingRows] = useState({});
  const [isLoadingValidateTags, setIsLoadingValidateTags] = useState(false);

  const { success, error: toastError } = useToast();

  // Use dummy data instead of API
  const validateTags = DUMMY_VALIDATE_TAGS;

  const handleRefresh = async () => {
    setIsLoadingValidateTags(true);
    setTimeout(() => {
      setIsLoadingValidateTags(false);
      success("Success", { description: "Validation data refreshed" });
    }, 1000);
  };

  const handleConfirmTag = async (tagId) => {
    try {
      success("Success", { description: "Tag confirmed successfully" });
    } catch (error) {
      console.error("Failed to confirm tag:", error);
      toastError("Error", { description: "Failed to confirm tag" });
    }
  };

  // Process audit data from dummy data
  const auditDataFromApi = useMemo(() => {
    if (!validateTags || !validateTags.tags) {
      return {
        summary: {
          totalTags: 0,
          auditedTags: 0,
          matchingTags: 0,
          mismatchedTags: 0,
          pendingTags: 0,
          auditProgress: 0,
          auditDate: "---",
          auditor: "---",
        },
        tags: [],
      };
    }

    const rawTags = validateTags.tags || [];
    const rawSummary = validateTags.summary;
    const auditMode = validateTags.mode || "Global Audit";

    const tags = rawTags.map((tag) => {
      const tagId = tag.tagId || tag.id || tag._id;
      const skuDetails = (tag.skuDetails || []).map((sku) => {
        const cQty = sku.countQty ?? 0;
        const aQty = sku.auditQty ?? 0;
        const skuId = sku.id || sku.itemId || sku.barcode || `temp-${Math.random()}`;
        return {
          ...sku,
          id: skuId,
          barcode: sku.barcode || "---",
          description: sku.description || "---",
          countQty: cQty,
          auditQty: aQty,
          match: sku.match ?? (cQty === aQty),
          scannedTagId: sku.scannedTagId || tag.scanId || tag.scannedTagId || tag.id,
        };
      });

      const totalCountQty = skuDetails.reduce((sum, item) => sum + item.countQty, 0);
      const totalAuditQty = tag.auditQuantity ?? skuDetails.reduce((sum, item) => sum + item.auditQty, 0);

      let mappedStatus = "pending";
      const apiStatus = tag.status?.toUpperCase();

      if (apiStatus === "MISMATCHED") mappedStatus = "mismatched";
      else if (apiStatus === "MATCHED") mappedStatus = "matched";
      else if (apiStatus === "PENDING") mappedStatus = "pending";
      else if (tag.status === "matched") mappedStatus = "matched";
      else if (tag.status === "mismatched") mappedStatus = "mismatched";
      else if (tag.status === "pending") mappedStatus = "pending";
      else if (!apiStatus && skuDetails.length > 0) {
        const hasMismatch = skuDetails.some(s => !s.match);
        const allVerified = skuDetails.every(s => s.match);
        if (hasMismatch) mappedStatus = "mismatched";
        else if (allVerified && skuDetails.length > 0) mappedStatus = "matched";
      }

      return {
        ...tag,
        id: tagId,
        tagNumber: tag.barcode || tag.tagNumber || "---",
        zone: tag.zone || tag.zoneName || "---",
        zoneCode: tag.zoneCode || tag.zone || "---",
        countQuantity: totalCountQty,
        auditQuantity: totalAuditQty,
        status: mappedStatus,
        auditTime: tag.auditTime ? new Date(tag.auditTime).toLocaleString() : null,
        auditor: tag.auditor || "---",
        skuDetails: skuDetails,
        mode: auditMode
      };
    });

    const summary = {
      totalTags: rawSummary?.totalTags || tags.length,
      auditedTags: rawSummary?.auditedTags || tags.filter((t) => t.status !== "pending").length,
      matchingTags: rawSummary?.matchingTags || tags.filter((t) => t.status === "matched").length,
      mismatchedTags: rawSummary?.mismatchedTags || tags.filter((t) => t.status === "mismatched").length,
      pendingTags: rawSummary?.pendingTags || tags.filter((t) => t.status === "pending").length,
      auditProgress: rawSummary?.auditProgress || (tags.length > 0 ? Math.round((tags.filter((t) => t.status !== "pending").length / tags.length) * 100) : 0),
      auditDate: rawSummary?.auditDate || new Date().toLocaleDateString(),
      auditor: rawSummary?.auditor || "---",
    };

    return { summary, tags, mode: auditMode };
  }, [validateTags]);

  const auditData = auditDataFromApi;

  // Filter tags based on search and filters
  const filteredTags = useMemo(() => {
    let filtered = auditData?.tags || [];

    if (searchQuery) {
      filtered = filtered.filter(
        (tag) =>
          tag.tagNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tag.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tag.zoneCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((tag) => tag.status === statusFilter);
    }

    if (zoneFilter !== "all") {
      filtered = filtered.filter((tag) => tag.zoneCode === zoneFilter);
    }

    return filtered;
  }, [auditData?.tags, searchQuery, statusFilter, zoneFilter]);

  // Get unique zones for filter
  const uniqueZones = useMemo(() => {
    const zones = (auditData?.tags || []).map((tag) => ({
      code: tag.zoneCode,
      name: tag.zone,
    }));
    return Array.from(new Set(zones.map((z) => z.code))).map((code) => {
      const zone = zones.find((z) => z.code === code);
      return { code, name: zone.name };
    });
  }, [auditData?.tags]);

  // Get status counts
  const statusCounts = useMemo(() => {
    const counts = {
      matched: (auditData?.tags || []).filter((t) => t.status === "matched").length,
      mismatched: (auditData?.tags || []).filter((t) => t.status === "mismatched").length,
      pending: (auditData?.tags || []).filter((t) => t.status === "pending").length,
    };
    return counts;
  }, [auditData?.tags]);

  const handleTagClick = (tagId) => {
    if (expandedTag === tagId) {
      setExpandedTag(null);
    } else {
      setExpandedTag(tagId);
    }
  };

  const handleEditQuantity = (skuId, field, value) => {
    setEditingRows((prev) => ({
      ...prev,
      [skuId]: {
        ...prev[skuId],
        [field]: value,
      },
    }));
  };

  const handleConfirmAll = async () => {
    const tag = selectedTagForMismatch;
    if (!tag) return;
    try {
      setTimeout(() => {
        success("Success", { description: "All audit values accepted" });
        setMismatchDialogOpen(false);
      }, 500);
    } catch (err) {
      console.error("Failed to confirm all:", err);
      toastError("Error", { description: "Failed to accept all audit values" });
    }
  };

  const handleCountAll = async () => {
    const tag = selectedTagForMismatch;
    if (!tag) return;
    try {
      setTimeout(() => {
        success("Success", { description: "All count values accepted" });
        setMismatchDialogOpen(false);
      }, 500);
    } catch (err) {
      console.error("Failed to accept count all:", err);
      toastError("Error", { description: "Failed to accept all count values" });
    }
  };

  const handleSaveChanges = async (skuId) => {
    const actualSkuId = typeof skuId === 'string' || typeof skuId === 'number' ? skuId : null;
    const rowsToSave = actualSkuId ? { [actualSkuId]: editingRows[actualSkuId] } : editingRows;
    const tag = selectedTagForMismatch;
    if (!tag || Object.keys(rowsToSave).length === 0) return;

    try {
      setTimeout(() => {
        success("Success", { description: "Changes saved successfully" });
        setEditingRows({});
        setMismatchDialogOpen(false);
      }, 500);
    } catch (err) {
      console.error("Failed to save changes:", err);
      toastError("Error", { description: "Failed to save changes" });
    }
  };

  const handleDiscardChanges = () => {
    setEditingRows({});
  };

  const handleDeleteSKURecord = async (skuId) => {
    if (window.confirm("Are you sure you want to delete this SKU record?")) {
      try {
        setTimeout(() => {
          success("Success", { description: "SKU record deleted successfully" });
        }, 500);
      } catch (err) {
        console.error("Failed to delete SKU:", err);
        toastError("Error", { description: "Failed to delete SKU record" });
      }
    }
  };

  const handleViewMismatch = (tag) => {
    setSelectedTagForMismatch(tag);
    setMismatchDialogOpen(true);
  };

  const handleReauditTag = async (tagId) => {
    try {
      setTimeout(() => {
        success("Success", { description: "Tag marked for re-audit" });
      }, 500);
    } catch (err) {
      console.error("Failed to re-audit tag:", err);
      toastError("Error", { description: "Failed to re-audit tag" });
    }
  };

  const handleConfirmSKU = async (tag, skuId) => {
    const sku = (tag.skuDetails || []).find(s => s.id === skuId);
    try {
      setTimeout(() => {
        success("Success", { description: "SKU confirmed successfully" });
      }, 500);
    } catch (err) {
      console.error("Failed to confirm SKU:", err);
      toastError("Error", { description: "Failed to confirm SKU" });
    }
  };

  const handleReauditSKU = async (tag, skuId) => {
    try {
      setTimeout(() => {
        success("Success", { description: "SKU marked for re-audit" });
      }, 500);
    } catch (err) {
      console.error("Failed to re-audit SKU:", err);
      toastError("Error", { description: "Failed to mark SKU for re-audit" });
    }
  };

  const handleCloseAudit = () => {
    console.log("Closing audit...");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "matched":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Matched
          </Badge>
        );
      case "mismatched":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Mismatched
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 border-2 border-blue-200 shadow-lg rounded-2xl min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold theme-text-primary">Audit Validation</h1>
            {auditData.mode && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                {auditData.mode}
              </Badge>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Review and validate scan results against auditor counts
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isLoadingValidateTags}
            className="h-10 w-10 flex-shrink-0 border-blue-200 hover:bg-blue-50 text-blue-600 shadow-sm"
            title="Refresh validation data"
          >
            <RefreshCw className={`h-4 w-4 ${isLoadingValidateTags ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-green-100 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {auditData.summary.matchingTags}
                </div>
                <div className="text-sm text-gray-600">Completed Tags</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">
                  {Math.round(
                    (auditData.summary.matchingTags /
                      auditData.summary.auditedTags) *
                      100
                  )}
                  % match rate
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {auditData.summary.auditedTags}
                </div>
                <div className="text-sm text-gray-600">Audited Tags</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ClipboardCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">
                  {auditData.summary.auditProgress}%
                </span>
              </div>
              <Progress
                value={auditData.summary.auditProgress}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100 bg-gradient-to-br from-red-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {auditData.summary.mismatchedTags}
                </div>
                <div className="text-sm text-gray-600">Mismatched Tags</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">
                  {Math.round(
                    (auditData.summary.mismatchedTags /
                      auditData.summary.auditedTags) *
                      100
                  )}
                  % mismatch rate
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-2xl font-bold theme-text-primary">
                  Audited Tags List
                </CardTitle>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
              <div className="relative flex-1 sm:flex-none sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="matched">Matched</SelectItem>
                  <SelectItem value="mismatched">Mismatched</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-semibold">Tag Details</TableHead>
                  <TableHead className="font-semibold text-center">
                    Count Qty
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Audit Qty
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Audit Info</TableHead>
                  <TableHead className="font-semibold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTags.map((tag) => (
                  <React.Fragment key={tag.id}>
                    <TableRow
                      className={`group ${tag.status === "pending" ? "bg-gray-50" : ""
                        }`}
                    >
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTagClick(tag.id)}
                          className="h-8 w-8 p-0"
                        >
                          {expandedTag === tag.id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full ${tag.status === "matched"
                                  ? "bg-green-500"
                                  : tag.status === "mismatched"
                                    ? "bg-red-500"
                                    : "hidden"
                                }`}
                            ></div>
                            <span className="font-semibold text-gray-900">
                              {tag.tagNumber}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {tag.zone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="font-bold text-gray-900">
                          {tag.countQuantity}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div
                          className={`font-bold ${tag.status === "matched"
                              ? "text-green-600"
                              : tag.status === "mismatched"
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                        >
                          {tag.auditQuantity}
                        </div>
                        {tag.status === "mismatched" && (
                          <div className="text-xs text-red-500 mt-1">
                            Δ{Math.abs(tag.countQuantity - tag.auditQuantity)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(tag.status)}</TableCell>
                      <TableCell>
                        {tag.status !== "pending" ? (
                          <div className="space-y-1">
                            <div className="text-sm text-gray-900">
                              {tag.auditTime}
                            </div>
                            <div className="text-xs text-gray-500">
                              by {tag.auditor}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            Not audited yet
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          {tag.status === "matched" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleConfirmTag(tag.tagId)}
                            >
                              <Check className="h-4 w-4" />
                              Confirm
                            </Button>
                          )}
                          {tag.status === "mismatched" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => handleViewMismatch(tag)}
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 gap-1 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                onClick={() => handleReauditTag(tag.id)}
                              >
                                <RefreshCw className="h-4 w-4" />
                                Re-audit
                              </Button>
                            </>
                          )}
                          {tag.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                            >
                              <AlertTriangle className="h-4 w-4" />
                              Start Audit
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Expanded SKU Details */}
                    {expandedTag === tag.id && tag.skuDetails.length > 0 && (
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={7}>
                          <div className="p-4">
                            <div className="mb-3">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                SKU Details for {tag.tagNumber}
                              </h4>
                              <div className="bg-white rounded-lg border overflow-hidden">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="font-medium">
                                        Barcode
                                      </TableHead>
                                      <TableHead className="font-medium">
                                        Description
                                      </TableHead>
                                      <TableHead className="font-medium text-center">
                                        Count Quantity
                                      </TableHead>
                                      <TableHead className="font-medium text-center">
                                        Audit Quantity
                                      </TableHead>
                                      <TableHead className="font-medium text-center">
                                        Status
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {tag.skuDetails.map((sku, index) => (
                                      <TableRow key={index}>
                                        <TableCell className="font-mono text-sm">
                                          {sku.barcode}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                          {sku.description}
                                        </TableCell>
                                        <TableCell className="text-center font-medium">
                                          {sku.countQty}
                                        </TableCell>
                                        <TableCell className="text-center font-medium">
                                          <span
                                            className={
                                              sku.match
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }
                                          >
                                            {sku.auditQty}
                                          </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {sku.match ? (
                                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                                              <Check className="h-3 w-3 mr-1" />
                                              Match
                                            </Badge>
                                          ) : (
                                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
                                              <X className="h-3 w-3 mr-1" />
                                              Mismatch
                                            </Badge>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                            {tag.status === "mismatched" && (
                              <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                  <AlertTriangle className="h-4 w-4 inline mr-1 text-orange-500" />
                                  Discrepancy found in{" "}
                                  {
                                    tag.skuDetails.filter((s) => !s.match)
                                      .length
                                  }{" "}
                                  SKUs
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewMismatch(tag)}
                                >
                                  Review Mismatch
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTags.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No tags found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No audit tags match your current filters. Try adjusting your
                search criteria.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t p-4">
          <div className="text-sm text-gray-600">
            Showing {filteredTags.length} of {auditData.tags.length} tags
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* SKU Mismatch Details Dialog */}
      <Dialog
        open={mismatchDialogOpen}
        onOpenChange={setMismatchDialogOpen}
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
          {/* Dialog Header */}
          <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">
                    SKU Mismatch Details
                  </DialogTitle>
                  <DialogDescription>
                    Review and resolve mismatches between count and audit
                    quantities
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
                  onClick={() => setMismatchDialogOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <EyeClosedIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Dialog Content - Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedTagForMismatch && (
              <div className="space-y-6">
                {/* Tag Header Card */}
                <Card className="border-red-100 bg-gradient-to-r from-red-50/50 to-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            {selectedTagForMismatch.tagNumber}
                          </Badge>
                          <h3 className="font-semibold text-gray-900">
                            {selectedTagForMismatch.zone}
                          </h3>
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedTagForMismatch.zoneCode} • Audited by{" "}
                          {selectedTagForMismatch.auditor} at{" "}
                          {selectedTagForMismatch.auditTime}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 min-w-[300px]">
                        <div className="bg-white p-3 rounded-lg border text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {selectedTagForMismatch.countQuantity}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Original Count
                          </div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {selectedTagForMismatch.auditQuantity}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Audit Count
                          </div>
                          <div className="text-xs text-red-500 font-medium mt-1">
                            Difference:{" "}
                            {Math.abs(
                              selectedTagForMismatch.countQuantity -
                              selectedTagForMismatch.auditQuantity
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mismatch Table Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      SKU Mismatch Table
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCountAll}
                        className="gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Accept All Count Values
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleConfirmAll}
                        className="gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Accept All Audit Values
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border overflow-hidden w-full">
                    <div className="overflow-x-auto w-full min-w-0">
                      <Table className="w-full">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="whitespace-nowrap px-4 py-3 min-w-[100px]">
                              <div className="font-semibold">Tag</div>
                            </TableHead>
                            <TableHead className="whitespace-nowrap px-4 py-3 min-w-[150px]">
                              <div className="font-semibold">Barcode</div>
                            </TableHead>
                            <TableHead className="whitespace-nowrap px-4 py-3 min-w-[250px]">
                              <div className="font-semibold">Description</div>
                            </TableHead>
                            <TableHead className="whitespace-nowrap px-4 py-3 min-w-[120px]">
                              <div className="font-semibold text-center">
                                Count Quantity
                              </div>
                            </TableHead>
                            <TableHead className="whitespace-nowrap px-4 py-3 min-w-[120px]">
                              <div className="font-semibold text-center">
                                Audit Quantity
                              </div>
                            </TableHead>
                            <TableHead className="whitespace-nowrap px-4 py-3 min-w-[120px]">
                              <div className="font-semibold text-center">
                                Difference
                              </div>
                            </TableHead>
                            <TableHead className="whitespace-nowrap px-4 py-3 min-w-[150px]">
                              <div className="font-semibold text-center">
                                Confirm / Edit / Delete
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedTagForMismatch.skuDetails
                            .filter((sku) => !sku.match)
                            .map((sku) => {
                              const difference = sku.auditQty - sku.countQty;
                              const isEditing = editingRows[sku.id];
                              const editedCount =
                                isEditing?.countQty ?? sku.countQty;
                              const editedAudit =
                                isEditing?.auditQty ?? sku.auditQty;

                              return (
                                <TableRow
                                  key={sku.id}
                                  className="hover:bg-gray-50"
                                >
                                  <TableCell className="px-4 py-3">
                                    <div className="font-medium">
                                      {selectedTagForMismatch.tagNumber}
                                    </div>
                                  </TableCell>
                                  <TableCell className="px-4 py-3">
                                    <div className="font-mono text-sm bg-gray-50 p-2 rounded">
                                      {sku.barcode}
                                    </div>
                                  </TableCell>
                                  <TableCell className="px-4 py-3">
                                    <div className="text-sm line-clamp-2">
                                      {sku.description}
                                    </div>
                                  </TableCell>
                                  <TableCell className="px-4 py-3">
                                    {isEditing ? (
                                      <Input
                                        type="number"
                                        value={editedCount}
                                        onChange={(e) =>
                                          handleEditQuantity(
                                            sku.id,
                                            "countQty",
                                            parseInt(e.target.value) || 0
                                          )
                                        }
                                        className="w-20 text-center"
                                      />
                                    ) : (
                                      <div className="text-center font-medium">
                                        {sku.countQty}
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell className="px-4 py-3">
                                    {isEditing ? (
                                      <Input
                                        type="number"
                                        value={editedAudit}
                                        onChange={(e) =>
                                          handleEditQuantity(
                                            sku.id,
                                            "auditQty",
                                            parseInt(e.target.value) || 0
                                          )
                                        }
                                        className="w-20 text-center"
                                      />
                                    ) : (
                                      <div className="text-center font-medium text-red-600">
                                        {sku.auditQty}
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell className="px-4 py-3">
                                    <div
                                      className={`text-center font-medium ${difference > 0
                                          ? "text-green-600"
                                          : difference < 0
                                            ? "text-red-600"
                                            : "text-gray-600"
                                        }`}
                                    >
                                      {difference > 0 ? "+" : ""}
                                      {difference}
                                    </div>
                                  </TableCell>
                                  <TableCell className="px-4 py-3">
                                    <div className="flex justify-center gap-2">
                                      {!isEditing ? (
                                        <>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                                            onClick={() => handleConfirmSKU(selectedTagForMismatch, sku.id)}
                                            title="Confirm Audit Value"
                                          >
                                            <Check className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            onClick={() =>
                                              setEditingRows((prev) => ({
                                                ...prev,
                                                [sku.id]: {
                                                  countQty: sku.countQty,
                                                  auditQty: sku.auditQty,
                                                },
                                              }))
                                            }
                                            title="Edit Values"
                                          >
                                            <Edit className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 gap-1 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                            onClick={() => handleReauditSKU(selectedTagForMismatch, sku.id)}
                                            title="Re-audit SKU"
                                          >
                                            <RefreshCw className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDeleteSKURecord(sku.id)}
                                            title="Delete Record"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                                            onClick={() => handleSaveChanges(sku.id)}
                                            title="Save Changes"
                                          >
                                            <Save className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 gap-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                                            onClick={() =>
                                              handleDiscardChanges()
                                            }
                                            title="Discard Changes"
                                          >
                                            <Undo2 className="h-3 w-3" />
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                {/* Summary Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mismatch Analysis Summary</CardTitle>
                    <CardDescription>
                      Detailed breakdown for{" "}
                      {selectedTagForMismatch?.tagNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">
                            Total Mismatches
                          </div>
                          <div className="text-2xl font-bold">
                            {
                              selectedTagForMismatch.skuDetails.filter(
                                (s) => !s.match
                              ).length
                            }
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">
                            Total Difference
                          </div>
                          <div className="text-2xl font-bold text-red-600">
                            {selectedTagForMismatch.auditQuantity -
                              selectedTagForMismatch.countQuantity}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">
                            Edited Items
                          </div>
                          <div className="text-2xl font-bold text-blue-600">
                            {Object.keys(editingRows).length}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Status</div>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Pending Resolution
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">
                            Items Counted Higher
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            {
                              selectedTagForMismatch.skuDetails.filter(
                                (s) => !s.match && s.countQty > s.auditQty
                              ).length
                            }
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Count greater than Audit
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">
                            Items Audited Higher
                          </div>
                          <div className="text-2xl font-bold text-red-600">
                            {
                              selectedTagForMismatch.skuDetails.filter(
                                (s) => !s.match && s.auditQty > s.countQty
                              ).length
                            }
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Audit greater than Count
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">
                            Perfect Matches
                          </div>
                          <div className="text-2xl font-bold text-blue-600">
                            {
                              selectedTagForMismatch.skuDetails.filter(
                                (s) => s.match
                              ).length
                            }
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Count equals Audit
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Bulk Actions Footer */}
          <div className="sticky bottom-0 bg-white border-t p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">
                  {selectedTagForMismatch?.skuDetails?.filter((s) => !s.match)
                    ?.length || 0}{" "}
                  mismatches
                </span>{" "}
                • {Object.keys(editingRows).length} items being edited
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setMismatchDialogOpen(false)}
                >
                  Close Analysis
                </Button>
                <Button
                  variant="outline"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50 gap-2"
                  onClick={() => {
                    handleReauditTag(selectedTagForMismatch?.id);
                    setMismatchDialogOpen(false);
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Re-audit Entire Tag
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 gap-2"
                  onClick={() => setMismatchDialogOpen(false)}
                >
                  <CheckCircle className="h-4 w-4" />
                  Finalize Audit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuditValidationPage;