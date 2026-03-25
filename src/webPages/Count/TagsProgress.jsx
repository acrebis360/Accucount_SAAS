"use client";
import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  MapPin,
  Tags,
  User,
  Trash2,
  Plus,
  Edit,
  Printer,
  ArrowRight,
  Search,
  Filter,
  FileText,
  FileDown,
  Check,
  Users,
  FileBarChart,
  EyeClosedIcon,
  X,
  ClipboardCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { getStatusBadge } from "@/components/ui/utils/BadgeStatus";
import useToast from "@/components/ui/toast/useToast";
import BackButton from "@/components/ui/customeComponent/BackButton";
import TablePagination from "@/components/ui/utils/TablePagination";


// Dummy Tags Data
const DUMMY_TAGS = [
  {
    id: "1",
    _id: "1",
    barcode: "TAG-001",
    udc: "UDC001",
    status: "completed",
    totalQuantity: 25,
    totalAuditQuantity: 25,
    totalFinalQuantity: 25,
    _count: { countedItems: 25 },
    countedBy: "John Doe",
    auditedBy: "Jane Smith",
    assignedTo: { name: "Jane Smith" },
    auditId: "audit-1",
    auditorId: "auditor-1",
    auditorName: "Jane Smith",
    isPrinted: true,
    ScannedTag: [
      {
        id: "st-1",
        eventUserRole: {
          role: { name: "Counter" },
          user: { name: "John Doe" }
        }
      },
      {
        id: "st-2",
        eventUserRole: {
          role: { name: "Audit" },
          user: { name: "Jane Smith" }
        }
      }
    ],
    countedItems: [
      { scannedTagId: "tag-1" }
    ]
  },
  {
    id: "2",
    _id: "2",
    barcode: "TAG-002",
    udc: "UDC002",
    status: "counted",
    totalQuantity: 15,
    totalAuditQuantity: 0,
    totalFinalQuantity: 0,
    _count: { countedItems: 15 },
    countedBy: "John Doe",
    auditedBy: null,
    assignedTo: null,
    auditId: null,
    auditorId: null,
    auditorName: null,
    isPrinted: false,
    ScannedTag: [
      {
        id: "st-3",
        eventUserRole: {
          role: { name: "Counter" },
          user: { name: "John Doe" }
        }
      }
    ],
    countedItems: [
      { scannedTagId: "tag-2" }
    ]
  },
  {
    id: "3",
    _id: "3",
    barcode: "TAG-003",
    udc: "UDC003",
    status: "in-progress",
    totalQuantity: 8,
    totalAuditQuantity: 0,
    totalFinalQuantity: 0,
    _count: { countedItems: 5 },
    countedBy: "John Doe",
    auditedBy: null,
    assignedTo: null,
    auditId: null,
    auditorId: null,
    auditorName: null,
    isPrinted: false,
    ScannedTag: [
      {
        id: "st-4",
        eventUserRole: {
          role: { name: "Counter" },
          user: { name: "John Doe" }
        }
      }
    ],
    countedItems: []
  },
  {
    id: "4",
    _id: "4",
    barcode: "TAG-004",
    udc: "UDC004",
    status: "not-started",
    totalQuantity: 12,
    totalAuditQuantity: 0,
    totalFinalQuantity: 0,
    _count: { countedItems: 0 },
    countedBy: null,
    auditedBy: null,
    assignedTo: null,
    auditId: null,
    auditorId: null,
    auditorName: null,
    isPrinted: false,
    ScannedTag: [],
    countedItems: []
  },
  {
    id: "5",
    _id: "5",
    barcode: "TAG-005",
    udc: "UDC005",
    status: "fix",
    totalQuantity: 20,
    totalAuditQuantity: 10,
    totalFinalQuantity: 15,
    _count: { countedItems: 20 },
    countedBy: "John Doe",
    auditedBy: "Jane Smith",
    assignedTo: { name: "Jane Smith" },
    auditId: "audit-2",
    auditorId: "auditor-2",
    auditorName: "Jane Smith",
    isPrinted: false,
    ScannedTag: [
      {
        id: "st-5",
        eventUserRole: {
          role: { name: "Counter" },
          user: { name: "John Doe" }
        }
      },
      {
        id: "st-6",
        eventUserRole: {
          role: { name: "Audit" },
          user: { name: "Jane Smith" }
        }
      }
    ],
    countedItems: [
      { scannedTagId: "tag-5" }
    ]
  },
  {
    id: "6",
    _id: "6",
    barcode: "TAG-006",
    udc: "UDC006",
    status: "audited",
    totalQuantity: 30,
    totalAuditQuantity: 30,
    totalFinalQuantity: 30,
    _count: { countedItems: 30 },
    countedBy: "John Doe",
    auditedBy: "Jane Smith",
    assignedTo: { name: "Jane Smith" },
    auditId: "audit-3",
    auditorId: "auditor-3",
    auditorName: "Jane Smith",
    isPrinted: true,
    ScannedTag: [
      {
        id: "st-7",
        eventUserRole: {
          role: { name: "Counter" },
          user: { name: "John Doe" }
        }
      },
      {
        id: "st-8",
        eventUserRole: {
          role: { name: "Audit" },
          user: { name: "Jane Smith" }
        }
      }
    ],
    countedItems: [
      { scannedTagId: "tag-6" }
    ]
  },
  {
    id: "7",
    _id: "7",
    barcode: "TAG-007",
    udc: "UDC007",
    status: "counted",
    totalQuantity: 18,
    totalAuditQuantity: 0,
    totalFinalQuantity: 0,
    _count: { countedItems: 18 },
    countedBy: "John Doe",
    auditedBy: null,
    assignedTo: null,
    auditId: null,
    auditorId: null,
    auditorName: null,
    isPrinted: false,
    ScannedTag: [
      {
        id: "st-9",
        eventUserRole: {
          role: { name: "Counter" },
          user: { name: "John Doe" }
        }
      }
    ],
    countedItems: [
      { scannedTagId: "tag-7" }
    ]
  },
  {
    id: "8",
    _id: "8",
    barcode: "TAG-008",
    udc: "UDC008",
    status: "counted",
    totalQuantity: 22,
    totalAuditQuantity: 0,
    totalFinalQuantity: 0,
    _count: { countedItems: 22 },
    countedBy: "John Doe",
    auditedBy: null,
    assignedTo: null,
    auditId: null,
    auditorId: null,
    auditorName: null,
    isPrinted: false,
    ScannedTag: [
      {
        id: "st-10",
        eventUserRole: {
          role: { name: "Counter" },
          user: { name: "John Doe" }
        }
      }
    ],
    countedItems: [
      { scannedTagId: "tag-8" }
    ]
  },
  {
    id: "9",
    _id: "9",
    barcode: "TAG-009",
    udc: "UDC009",
    status: "counted",
    totalQuantity: 14,
    totalAuditQuantity: 0,
    totalFinalQuantity: 0,
    _count: { countedItems: 14 },
    countedBy: "John Doe",
    auditedBy: null,
    assignedTo: null,
    auditId: null,
    auditorId: null,
    auditorName: null,
    isPrinted: false,
    ScannedTag: [
      {
        id: "st-11",
        eventUserRole: {
          role: { name: "Counter" },
          user: { name: "John Doe" }
        }
      }
    ],
    countedItems: [
      { scannedTagId: "tag-9" }
    ]
  },
  {
    id: "10",
    _id: "10",
    barcode: "TAG-010",
    udc: "UDC010",
    status: "counted",
    totalQuantity: 28,
    totalAuditQuantity: 0,
    totalFinalQuantity: 0,
    _count: { countedItems: 28 },
    countedBy: "John Doe",
    auditedBy: null,
    assignedTo: null,
    auditId: null,
    auditorId: null,
    auditorName: null,
    isPrinted: false,
    ScannedTag: [
      {
        id: "st-12",
        eventUserRole: {
          role: { name: "Counter" },
          user: { name: "John Doe" }
        }
      }
    ],
    countedItems: [
      { scannedTagId: "tag-10" }
    ]
  }
];

// Dummy Auditors Data
const DUMMY_AUDITORS = {
  auditors: [
    { eventUserRoleId: "auditor-1", name: "Jane Smith", phone: "+1 234-567-8901", role: "Lead Auditor" },
    { eventUserRoleId: "auditor-2", name: "Mike Johnson", phone: "+1 234-567-8902", role: "Senior Auditor" },
    { eventUserRoleId: "auditor-3", name: "Sarah Williams", phone: "+1 234-567-8903", role: "Auditor" },
    { eventUserRoleId: "auditor-4", name: "David Brown", phone: "+1 234-567-8904", role: "Junior Auditor" },
    { eventUserRoleId: "auditor-5", name: "Emily Davis", phone: "+1 234-567-8905", role: "Audit Assistant" }
  ]
};

// Dummy Zone Data
const DUMMY_ZONE_DATA = {
  uniqueId: "ZONE-A-001",
  name: "Zone A - Electronics",
  description: "Electronics section",
  tagRange: "TAG-001 to TAG-050",
  totalTags: 50,
  completedTags: 35,
  countedTags: 40,
  pendingTags: 10,
  verifiedTags: 30,
  _count: { items: 192 },
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  tags: DUMMY_TAGS
};

const TagsPage = ({ eventId, zoneId, eventName, zoneName, onRefreshTags }) => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentZoneId = zoneId || searchParams.get("zone");

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isNoAudit, setIsNoAudit] = useState(false);

  // Mock mutation states
  const [isMarkingCompleted, setIsMarkingCompleted] = useState(false);
  const [isDeletingTag, setIsDeletingTag] = useState(false);
  const [isAssigningAuditor, setIsAssigningAuditor] = useState(false);
  const [currentProcessingTagId, setCurrentProcessingTagId] = useState(null);

  const [isAuditorDialogOpen, setIsAuditorDialogOpen] = useState(false);
  const [selectedAuditorId, setSelectedAuditorId] = useState(null);
  const [auditorSearchTerm, setAuditorSearchTerm] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedTagForReport, setSelectedTagForReport] = useState(null);
  const [reportType, setReportType] = useState("scanning");

  // Dummy data
  const tagsData = useMemo(() => {
    return {
      eventId: eventId,
      eventName: eventName,
      zoneId: DUMMY_ZONE_DATA.uniqueId,
      zoneDescription: DUMMY_ZONE_DATA.description,
      zoneName: DUMMY_ZONE_DATA.name,
      tagRange: DUMMY_ZONE_DATA.tagRange,
      totalTags: DUMMY_ZONE_DATA.totalTags,
      completedTags: DUMMY_ZONE_DATA.completedTags,
      countedTags: DUMMY_ZONE_DATA.countedTags,
      pendingTags: DUMMY_ZONE_DATA.pendingTags,
      verifiedTags: DUMMY_ZONE_DATA.verifiedTags,
      totalSKUs: DUMMY_ZONE_DATA._count?.items || 0,
      lastUpdated: DUMMY_ZONE_DATA.updatedAt,
      tags: DUMMY_TAGS,
      isNoAudit,
    };
  }, [eventId, eventName, isNoAudit]);

  // Calculate progress percentages
  const progressStats = useMemo(() => {
    const completedProgress = Math.round(
      (tagsData.completedTags / tagsData.totalTags) * 100
    );
    const verifiedProgress = Math.round(
      (tagsData.verifiedTags / tagsData.totalTags) * 100
    );

    return {
      completed: completedProgress,
      verified: verifiedProgress,
      pending: 100 - completedProgress,
    };
  }, [tagsData]);

  // Filter tags based on search and status
  const filteredTags = useMemo(() => {
    return tagsData.tags.filter((tag) => {
      const matchesSearch =
        String(tag.barcode || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(tag.skuName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(tag.sku || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        String(tag.status || "").toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [tagsData.tags, searchTerm, statusFilter]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredTags.length / pageSize);

  const sortedTags = useMemo(() => {
    if (!sortColumn) return filteredTags;

    return [...filteredTags].sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];

      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredTags, sortColumn, sortDirection]);

  // Get current page data
  const currentTags = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedTags.slice(startIndex, endIndex);
  }, [currentPage, pageSize, sortedTags]);

  const filteredAuditors = useMemo(() => {
    if (!DUMMY_AUDITORS.auditors) return [];
    return DUMMY_AUDITORS.auditors.filter(auditor => {
      const name = auditor?.name?.toLowerCase() || "";
      const phone = auditor?.phone || "";
      const search = auditorSearchTerm.toLowerCase();
      return name.includes(search) || phone.includes(search);
    });
  }, [auditorSearchTerm]);

  // Handle individual tag selection
  const handleTagSelect = (tagId, isChecked) => {
    if (isChecked) {
      setSelectedTags((prev) => [...prev, tagId]);
    } else {
      setSelectedTags((prev) => prev.filter((id) => id !== tagId));
    }
  };

  // Handle select all on current page
  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const countedTagsOnPage = currentTags
        .filter((tag) => tag.status?.toLowerCase() === "counted" && !tag.auditId && !tag.auditorId)
        .map((tag) => tag.id || tag._id || tag.barcode);
      setSelectedTags((prev) => [...new Set([...prev, ...countedTagsOnPage])]);
    } else {
      setSelectedTags((prev) =>
        prev.filter((id) => !currentTags.some((tag) => (tag.id || tag._id || tag.barcode) === id && !tag.auditId && !tag.auditorId))
      );
    }
  };

  const handleBulkDownloadReports = async () => {
    if (selectedTags.length === 0) return;

    try {
      const isAllSelected = selectedTags.length === (tagsData?.tags?.length || 0);

      if (isAllSelected) {
        toast.info("Generating consolidated report for all tags...");
        setTimeout(() => {
          toast.success("Consolidated report generated successfully");
        }, 1500);
        return;
      }

      toast.info(`Generating ${selectedTags.length} report(s)...`);
      setTimeout(() => {
        toast.success("Reports downloaded successfully");
      }, 2000);
    } catch (err) {
      console.error("Bulk download error:", err);
      toast.error("Failed to download some reports");
    }
  };

  const handleDownloadTagReport = (tag, e) => {
    if (e) e.stopPropagation();
    setSelectedTagForReport(tag);
    setIsReportDialogOpen(true);
  };

  const handleConfirmReportGeneration = async () => {
    if (!selectedTagForReport) return;

    try {
      toast.info("Generating report...");
      setTimeout(() => {
        toast.success("Report generated successfully");
        setIsReportDialogOpen(false);
      }, 1500);
    } catch (err) {
      console.error("Critical error generating tag report:", err);
      toast.error("Failed to generate report. Please try again.");
    }
  };

  // Check if all selectable tags on current page are selected
  const isAllCountedTagsSelected = useMemo(() => {
    const selectableTagsOnPage = currentTags.filter(
      (tag) => tag.status?.toLowerCase() === "counted" && !tag.auditId && !tag.auditorId
    );
    return (
      selectableTagsOnPage.length > 0 &&
      selectableTagsOnPage.every((tag) => selectedTags.includes(tag.id || tag._id || tag.barcode))
    );
  }, [currentTags, selectedTags]);

  // Check if some selectable tags on current page are selected
  const isSomeCountedTagsSelected = useMemo(() => {
    const selectableTagsOnPage = currentTags.filter(
      (tag) => tag.status?.toLowerCase() === "counted" && !tag.auditId && !tag.auditorId
    );
    return (
      selectableTagsOnPage.some((tag) => selectedTags.includes(tag.id || tag._id || tag.barcode)) &&
      !isAllCountedTagsSelected
    );
  }, [currentTags, selectedTags, isAllCountedTagsSelected]);

  // Move selected tags to audit
  const handleMoveToAudit = async () => {
    if (selectedTags.length === 0) return;
    setIsAuditorDialogOpen(true);
  };

  // Check if all selectable tags on current page are marked completed
  const isAllMarkedCompleted = useMemo(() => {
    const eligibleTagsOnPage = currentTags.filter(tag =>
      ["counted", "audited", "completed"].includes(tag.status?.toLowerCase())
    );
    return (
      eligibleTagsOnPage.length > 0 &&
      eligibleTagsOnPage.every(tag => tag.status?.toLowerCase() === "completed")
    );
  }, [currentTags]);

  // Check if some selectable tags on current page are marked completed
  const isSomeMarkedCompleted = useMemo(() => {
    const eligibleTagsOnPage = currentTags.filter(tag =>
      ["counted", "audited", "completed"].includes(tag.status?.toLowerCase())
    );
    const completedCount = eligibleTagsOnPage.filter(tag =>
      tag.status?.toLowerCase() === "completed"
    ).length;
    return completedCount > 0 && completedCount < eligibleTagsOnPage.length;
  }, [currentTags, isAllMarkedCompleted]);

  // Handle bulk mark completed on current page
  const handleMarkAllCompleted = async (isChecked) => {
    const eligibleTagsOnPage = currentTags.filter(tag =>
      ["counted", "audited", "completed"].includes(tag.status?.toLowerCase())
    );

    if (eligibleTagsOnPage.length === 0) {
      toast.info("No tags on this page can be marked as completed.");
      return;
    }

    try {
      setIsMarkingCompleted(true);
      toast.info(`${isChecked ? "Marking" : "Unmarking"} tags as completed...`);
      setTimeout(() => {
        toast.success(`Successfully updated tags on this page.`);
        setIsMarkingCompleted(false);
      }, 1500);
    } catch (error) {
      console.error("Bulk mark completed error:", error);
      toast.error("Failed to update some tags. Please try again.");
      setIsMarkingCompleted(false);
    }
  };

  const handleMarkCompleted = async (tagId, selected) => {
    try {
      setCurrentProcessingTagId(tagId);
      setIsMarkingCompleted(true);
      setTimeout(() => {
        toast.success(selected ? "Tag marked as completed" : "Tag unmarked as completed");
        setIsMarkingCompleted(false);
        setCurrentProcessingTagId(null);
      }, 500);
    } catch (error) {
      console.error("Failed to mark tag as completed:", error);
      setIsMarkingCompleted(false);
      setCurrentProcessingTagId(null);
    }
  };

  const handleConfirmAssignment = async () => {
    if (!selectedAuditorId) {
      toast.error("Please select an auditor");
      return;
    }

    try {
      setIsAssigningAuditor(true);
      toast.info(`${selectedTags.length} tag(s) being assigned to audit...`);
      setTimeout(() => {
        toast.success(`${selectedTags.length} tag(s) successfully assigned to audit`);
        setSelectedTags([]);
        setIsAuditorDialogOpen(false);
        setSelectedAuditorId(null);
        setIsAssigningAuditor(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to move tags to audit:", error);
      toast.error("Some tags failed to assign. Please try again.");
      setIsAssigningAuditor(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "counted":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Package className="h-4 w-4" />;
      case "fix":
        return <XCircle className="h-4 w-4" />;
      case "not-started":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      if (onRefreshTags) {
        onRefreshTags(tagsData.zoneId);
      }
    }, 1000);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (tag, tagStatus, e) => {
    const target = e.target;
    if (!target) return;

    if (
      target.closest?.('input[type="checkbox"]') ||
      target.closest?.("button") ||
      target.closest?.("a")
    ) {
      return;
    }

    const identifier = tag?.id;

    if (identifier) {
      router.push(`/dashboard/count/2/skus/${identifier}`);
    }
  };

  const handleVoidCount = async (tagId, e) => {
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this tag? This action cannot be undone.")) {
      try {
        setCurrentProcessingTagId(tagId);
        setIsDeletingTag(true);
        setTimeout(() => {
          toast.success("Tag deleted successfully");
          setIsDeletingTag(false);
          setCurrentProcessingTagId(null);
        }, 500);
      } catch (error) {
        console.error("Failed to delete tag:", error);
        toast.error("Failed to delete tag");
        setIsDeletingTag(false);
        setCurrentProcessingTagId(null);
      }
    }
  };

  const handleEditTag = (tag, e) => {
    e.stopPropagation();
    const identifier = tag.countedItems?.[0]?.scannedTagId || tag.ScannedTag?.[0]?.id || tag.scannedTagId;
    console.log("Edit tag with identifier:", identifier);
    if (identifier) {
      router.push(`/accucount/count/skus?id=${identifier}`);
    }
  };

  const handlePrintTag = (tagId, e) => {
    e.stopPropagation();
    console.log("Print tag:", tagId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) {
      return <span className="opacity-40 text-xs ml-1">▲▼</span>;
    }
    return (
      <span className="opacity-70 text-xs ml-1">
        {sortDirection === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  const getStatusColors = (status) => {
    const colors = {
      "not-started": {
        bg: "bg-gray-100",
        border: "border-l-4 border-gray-400",
        iconBg: "bg-gray-100",
        iconColor: "text-gray-600",
        statusColor: "bg-gray-100 text-gray-800",
      },
      "in-progress": {
        bg: "bg-blue-100",
        border: "border-l-4 border-blue-400",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        statusColor: "bg-blue-100 text-blue-800",
      },
      "counted": {
        bg: "bg-green-100",
        border: "border-l-4 border-green-400",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        statusColor: "bg-green-100 text-green-800",
      },
      "completed": {
        bg: "bg-emerald-50",
        border: "border-l-4 border-emerald-500",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        statusColor: "bg-emerald-500 text-white",
      },
      "fix": {
        bg: "bg-red-100",
        border: "border-l-4 border-red-400",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        statusColor: "bg-red-100 text-red-800",
      },
      "audit_in_progress": {
        bg: "bg-purple-50",
        border: "border-l-4 border-purple-400",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        statusColor: "bg-purple-100 text-purple-800",
      },
      "audited": {
        bg: "bg-teal-50",
        border: "border-l-4 border-teal-500",
        iconBg: "bg-teal-100",
        iconColor: "text-teal-600",
        statusColor: "bg-teal-500 text-white",
      },
    };
    return colors[status] || colors["not-started"];
  };

  return (
    <div className="space-y-6">
      {/* Zone Overview Header */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Tags className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold theme-text-primary">
                  Tags Overview
                </h1>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Zone ID */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Zone ID</span>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {tagsData.zoneId || "---"}
              </div>
            </div>

            {/* Zone Name */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Package className="h-4 w-4" />
                <span className="text-sm font-medium">Zone Description</span>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {tagsData.zoneDescription || "---"}
              </div>
            </div>

            {/* Tag Ranges */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Tags className="h-4 w-4" />
                <span className="text-sm font-medium">Tag Ranges</span>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {tagsData.tagRange}
              </div>
            </div>

            {/* Counted Tags with Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Counted Tags</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {tagsData.countedTags}/{tagsData.totalTags}
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500`}
                  style={{
                    width: `${progressStats.completed}%`,
                    background: `linear-gradient(90deg, #4ade80, #22c55e)`,
                  }}
                />
              </div>

              <div className="text-right text-sm text-gray-500">
                {progressStats.completed}% Complete
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags Table */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <Package className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-2xl font-bold theme-text-primary">
                    Tags Progress
                  </CardTitle>
                </div>
              </div>
              <BackButton showLabel={true} className="font-bold" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by tag number"
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
                  <SelectItem value="COUNTED">Counted</SelectItem>
                  <SelectItem value="INPROGRESS">In-Progress</SelectItem>
                  <SelectItem value="NOTSTARTED">Not Started</SelectItem>
                  <SelectItem value="Fix">Fix</SelectItem>
                </SelectContent>
              </Select>

              {selectedTags.length > 0 && !tagsData.isNoAudit && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleMoveToAudit}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-500 text-white h-10 px-4"
                    disabled={isAssigningAuditor}
                  >
                    {isAssigningAuditor ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    Assign to Audit ({selectedTags.length})
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200 hover:bg-gray-300">
                <TableHead
                  className="text-md font-bold text-gray-700 cursor-pointer"
                  onClick={() => handleSort("barcode")}
                >
                  Tag ID
                  <SortIcon column="barcode" />
                </TableHead>
                <TableHead
                  className="text-md font-bold text-gray-700 text-center cursor-pointer"
                >
                  Tag UDC
                </TableHead>
                <TableHead
                  className="text-md font-bold text-gray-700 text-center cursor-pointer"
                >
                  Items
                </TableHead>

                <TableHead
                  className="text-md font-bold text-gray-700 text-center cursor-pointer"
                >
                  Count Qty
                </TableHead>
                {!tagsData.isNoAudit && (
                  <>
                    <TableHead
                      className="text-md font-bold text-gray-700 text-center cursor-pointer"
                    >
                      Audit Qty
                    </TableHead>
                  </>
                )}
                <TableHead className="text-md font-bold text-gray-700 text-center">
                  Final Qty
                </TableHead>
                <TableHead
                  className="text-md font-bold text-gray-700 text-center cursor-pointer"
                >
                  Status
                </TableHead>

                {!tagsData.isNoAudit && (
                  <TableHead className="w-48 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-md font-bold text-gray-700">Assign to Audit</span>
                      <Checkbox
                        checked={isAllCountedTagsSelected}
                        indeterminate={isSomeCountedTagsSelected ? true : undefined}
                        onCheckedChange={handleSelectAll}
                        disabled={
                          currentTags.filter((tag) => tag.status?.toLowerCase() === "counted").length === 0 ||
                          isMarkingCompleted ||
                          isAssigningAuditor
                        }
                        className="border-gray-600"
                      />
                    </div>
                  </TableHead>
                )}

                <TableHead className="text-md font-bold text-gray-700 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-md font-bold text-gray-700">Mark Completed</span>
                    <Checkbox
                      checked={isAllMarkedCompleted}
                      indeterminate={isSomeMarkedCompleted ? true : undefined}
                      onCheckedChange={handleMarkAllCompleted}
                      disabled={isMarkingCompleted}
                      className="border-emerald-600 data-[state=checked]:bg-emerald-600"
                    />
                  </div>
                </TableHead>

                <TableHead className="text-md font-bold text-gray-700 text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={11} className="py-20 text-center">
                    <RefreshCw className="h-10 w-10 animate-spin mx-auto text-blue-600 mb-4" />
                    <p className="text-gray-500 font-medium">Loading tags data...</p>
                  </TableCell>
                </TableRow>
              ) : currentTags.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="py-20 text-center">
                    <Tags className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 font-medium">No tags found for this zone.</p>
                  </TableCell>
                </TableRow>
              ) : currentTags.map((tag) => {
                const colors = getStatusColors(tag.status?.toLowerCase());

                const scannedTags = tag.ScannedTag || [];

                const counters = scannedTags
                  .filter(st => st.eventUserRole?.role?.name?.toLowerCase().includes("counter"))
                  .map(st => st.eventUserRole?.user?.name)
                  .filter((name, index, self) => name && self.indexOf(name) === index)
                  .join(", ");

                const auditors = scannedTags
                  .filter(st => st.eventUserRole?.role?.name?.toLowerCase().includes("audit"))
                  .map(st => st.eventUserRole?.user?.name)
                  .filter((name, index, self) => name && self.indexOf(name) === index)
                  .join(", ");

                const displayCountedBy = counters || tag.countedBy || tag.counter?.name || tag.counterName;
                const displayAuditedBy = auditors || tag.auditedBy || tag.auditor?.name || tag.auditorName;
                const identifier = tag.countedItems?.[0]?.scannedTagId || tag.ScannedTag?.[0]?.id || tag.scannedTagId;

                return (
                  <TableRow
                    key={tag.id || tag._id || tag.barcode}
                    className={`${identifier ? "cursor-pointer" : "cursor-default opacity-85"} transition-colors group ${colors.bg} !border-l-0 ${selectedTags.includes(tag.id || tag._id || tag.barcode)
                        ? "bg-blue-100 ring-1 ring-blue-500 ring-inset"
                        : ""
                      }`}
                    onClick={(e) => identifier && handleRowClick(tag, tag.status, e)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${colors.iconBg} rounded-lg relative`}>
                          <div className={colors.iconColor}>
                            {getStatusIcon(tag.status)}
                          </div>
                          {tag.auditorStatus === "MISMATCH" && (
                            <div className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-600 rounded-full border-2 border-white shadow-sm animate-pulse" />
                          )}
                          {tag.auditorStatus === "MATCH" && (
                            <div className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-green-600 rounded-full border-2 border-white shadow-sm" />
                          )}
                        </div>
                        <div className="font-bold">
                          {tag.barcode}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      {tag.udc || "-"}
                    </TableCell>

                    <TableCell className="text-center font-medium">
                      {tag._count?.countedItems || 0}
                    </TableCell>

                    <TableCell className="text-center font-semibold">
                      {tag.totalQuantity}
                    </TableCell>

                    {!tagsData.isNoAudit && (
                      <TableCell className="text-center font-semibold">
                        {tag.totalAuditQuantity}
                      </TableCell>
                    )}

                    <TableCell className="text-center">
                      <div className="font-bold text-md text-emerald-700">
                        {tag.totalFinalQuantity || 0}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        {getStatusBadge(tag.status)}
                      </div>
                    </TableCell>

                    {!tagsData.isNoAudit && (
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          {(!!tag.auditId || !!tag.auditorId || !!tag.auditorName || !!tag.assignedTo) && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 py-0 flex items-center gap-1 px-1.5 h-5">
                              <User className="h-2.5 w-2.5" />
                              <span className="max-w-[80px] truncate">
                                {typeof tag.assignedTo === 'string' ? tag.assignedTo : (tag.assignedTo?.name || tag.auditorName || "Assigned")}
                              </span>
                            </Badge>
                          )}
                          <Checkbox
                            checked={selectedTags.includes(tag.id || tag._id || tag.barcode)}
                            onCheckedChange={(checked) => handleTagSelect(tag.id || tag._id || tag.barcode, checked)}
                            disabled={tag.status?.toLowerCase() !== "counted" || !!tag.auditId}
                            className={tag.status?.toLowerCase() === "counted" && !tag.auditId ? "border-gray-600" : "border-gray-300"}
                          />
                        </div>
                      </TableCell>
                    )}

                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        {isMarkingCompleted && currentProcessingTagId === tag.id ? (
                          <RefreshCw className="h-5 w-5 animate-spin text-emerald-600" />
                        ) : (
                          <Checkbox
                            checked={tag.status?.toLowerCase() === "completed"}
                            onCheckedChange={(checked) => handleMarkCompleted(tag.id, checked)}
                            disabled={!["counted", "audited", "completed"].includes(tag.status?.toLowerCase())}
                            className="border-emerald-600 data-[state=checked]:bg-emerald-600 disabled:opacity-50"
                          />
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleDownloadTagReport(tag, e)}
                          className="h-8 px-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                          disabled={!["counted", "completed", "audited"].includes(tag.status?.toLowerCase()) || (isMarkingCompleted && currentProcessingTagId === tag.id)}
                        >
                          {isMarkingCompleted && currentProcessingTagId === tag.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Printer className="h-4 w-4" />
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleVoidCount(tag.id, e)}
                          className="h-8 px-2 bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
                          disabled={tag.status === "not-started" || isDeletingTag}
                        >
                          {isDeletingTag && currentProcessingTagId === tag.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>

                        {tag.isPrinted && tag.status === "COMPLETED" && (
                          <Button className="h-8 px-2 bg-yellow-100 text-black border-white">
                            P
                          </Button>
                        )}

                        {tag.isPrinted && tag.status === "COUNTED" && (
                          <Button className="h-8 px-2 bg-green-500 text-white border-white">
                            P
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {tagsData.tags.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No tags found for this zone
            </div>
          )}
        </CardContent>

        {/* Pagination */}
        {tagsData.tags.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Card>

      <Dialog open={isAuditorDialogOpen} onOpenChange={setIsAuditorDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Auditor</DialogTitle>
            <DialogDescription>
              Choose an auditor to assign the {selectedTags.length} selected tag(s).
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search auditors by name or phone..."
                value={auditorSearchTerm}
                onChange={(e) => setAuditorSearchTerm(e.target.value)}
                className="pl-10 h-10"
              />
            </div>

            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {filteredAuditors.length > 0 ? (
                filteredAuditors.map((auditor, index) => (
                  <div
                    key={auditor?.eventUserRoleId || index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedAuditorId(auditor?.eventUserRoleId);
                    }}
                    className={`
                      relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
                      ${selectedAuditorId === String(auditor?.eventUserRoleId)
                        ? "border-blue-600 bg-blue-50/50 shadow-md transform scale-[1.02]"
                        : "border-gray-50 bg-white hover:border-blue-200 hover:shadow-sm"}
                    `}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedAuditorId(auditor?.eventUserRoleId);
                      }
                    }}
                  >
                    <div className={`
                      h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${selectedAuditorId === String(auditor?.eventUserRoleId)
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-400"}
                    `}>
                      <User className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 truncate">{auditor.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                        {auditor.phone && (
                          <span className="flex items-center gap-1">
                            <span className="opacity-60">{auditor.phone}</span>
                          </span>
                        )}
                        {auditor.role && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-100 text-blue-600">
                            {auditor.role}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {selectedAuditorId === String(auditor?.eventUserRoleId) && (
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <Check className="h-4 w-4 text-blue-600 animate-in zoom-in duration-300" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-medium">No auditors matching your search</p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAuditorDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAssignment}
              disabled={isAssigningAuditor || !selectedAuditorId}
            >
              {isAssigningAuditor ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent
          className="sm:max-w-2xl overflow-hidden flex flex-col p-0 h-[80vh] min-h-[600px] !w-[90vw] !max-w-[90vw] mx-auto my-0"
        >
          {/* Dialog Header */}
          <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg border-2 border-blue-200 flex items-center justify-center">
                  <FileBarChart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold mb-1">
                    Generate Tag Report
                  </DialogTitle>
                  <DialogDescription>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                      Tag: {selectedTagForReport?.barcode}
                    </span>
                  </DialogDescription>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReportDialogOpen(false)}
                className="h-8 w-8 p-0"
              >
                <EyeClosedIcon className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Dialog Content - Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select Report Type
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Scanning Report Option */}
                <div
                  onClick={() => setReportType("scanning")}
                  className={`
                    flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group
                    ${reportType === "scanning"
                      ? "border-blue-600 bg-blue-50/50 shadow-md transform scale-[1.01]"
                      : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm"}
                  `}
                >
                  <div className={`
                    h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${reportType === "scanning" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500"}
                  `}>
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg">Detailed Scan Log</div>
                  </div>
                  {reportType === "scanning" && (
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-blue-600 animate-in zoom-in duration-300" />
                    </div>
                  )}
                </div>

                {/* Summary Report Option */}
                <div
                  onClick={() => setReportType("summary")}
                  className={`
                    flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group
                    ${reportType === "summary"
                      ? "border-blue-600 bg-blue-50/50 shadow-md transform scale-[1.01]"
                      : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm"}
                  `}
                >
                  <div className={`
                    h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${reportType === "summary" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500"}
                  `}>
                    <Barcode className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg">Barcode Summary</div>
                  </div>
                  {reportType === "summary" && (
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-blue-600 animate-in zoom-in duration-300" />
                    </div>
                  )}
                </div>

                {/* Scan Activity Summary Option */}
                <div
                  onClick={() => setReportType("summary_scanning")}
                  className={`
                      flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group
                      ${reportType === "summary_scanning"
                      ? "border-blue-600 bg-blue-50/50 shadow-md transform scale-[1.01]"
                      : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm"}
                    `}
                >
                  <div className={`
                      h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300
                      ${reportType === "summary_scanning" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500"}
                    `}>
                    <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg">Sequential Batch Summary</div>
                  </div>
                  {reportType === "summary_scanning" && (
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-blue-600 animate-in zoom-in duration-300" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dialog Footer */}
          <div className="sticky bottom-0 bg-white border-t p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <span className="font-semibold text-gray-700">
                  Tag ID: {selectedTagForReport?.barcode}
                </span>
                <span className="text-gray-300">•</span>
                {reportType ? (
                  <span className="text-emerald-600 font-medium">Ready to generate report</span>
                ) : (
                  <span className="text-red-500 font-medium">Please select a report type</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsReportDialogOpen(false)}
                  className="px-6 font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmReportGeneration}
                  disabled={!reportType}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 gap-2"
                >
                  <Download className="h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div >
  );

}
export default TagsPage;