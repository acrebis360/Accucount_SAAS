"use client";
import { useState, useEffect, Fragment } from "react";
import jsPDF from "jspdf";
import { addReportLogos, addEventTable, generateFeedbackForm } from "../../lib/pdfGenerator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useToast from "../../components/ui/toast/useToast";

import {
  Search,
  Download,
  RefreshCw,
  FileText,
  BarChart3,
  Clock,
  CheckCircle,
  TrendingUp,
  Package,
  FileSpreadsheet,
  Tag,
  FileBarChart,
  ClipboardCheck,
  Eye,
  Printer,
  Share2,
  FileDown,
  Settings
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStatusBadge } from "@/components/ui/utils/BadgeStatus";

// Dummy Event Data
const DUMMY_EVENT_DATA = {
  data: {
    _id: "evt-001",
    uniqueId: "EVT-2024-001",
    title: "Annual Inventory Count 2024",
    status: "Live",
    createdAt: "2024-01-15T09:00:00Z",
    manager: "John Doe",
    customer: {
      cus_name: "Apple Singapore",
      cus_logo: null
    },
    store: {
      store_name: "Orchard Road Store",
      store_address: "370 Orchard Road Singapore"
    },
    totalQuantity: 12500,
    totalAudits: 5,
    reports: [
      { reportKey: "interim-tag", title: "Interim TAG Report", status: "completed" },
      { reportKey: "audit", title: "Audit Report", status: "completed" },
      { reportKey: "stock-status", title: "Stock Take Status Report", status: "pending" }
    ]
  }
};

// Dummy Master Reports Data
const DUMMY_MASTER_REPORTS = {
  data: {
    reports: [
      { _id: "rep-1", reportKey: "interim-tag", title: "Interim TAG Report", description: "Shows tag status during audit progress", createdAt: "2024-01-20", status: "completed", format: "PDF", fileSize: "1.2 MB" },
      { _id: "rep-2", reportKey: "audit", title: "Audit Report", description: "Comprehensive audit findings and results", createdAt: "2024-01-21", status: "completed", format: "PDF", fileSize: "2.1 MB" },
      { _id: "rep-3", reportKey: "stock-status", title: "Stock Take Status Report", description: "Real-time stock counting progress", createdAt: "2024-01-22", status: "pending", format: "PDF", fileSize: "0.8 MB" },
      { _id: "rep-4", reportKey: "fixes-corrections", title: "Fixes & Correction Report", description: "Issues identified and corrections made", createdAt: "2024-01-23", status: "completed", format: "PDF", fileSize: "1.5 MB" },
      { _id: "rep-5", reportKey: "productivity", title: "Productivity Report", description: "Auditor performance and efficiency metrics", createdAt: "2024-01-24", status: "pending", format: "PDF", fileSize: "0.9 MB" },
      { _id: "rep-6", reportKey: "all-product", title: "All Product Report", description: "Complete product inventory listing", createdAt: "2024-01-25", status: "completed", format: "PDF", fileSize: "3.2 MB" },
      { _id: "rep-7", reportKey: "sku-barcode", title: "SKUBARCODE Report", description: "SKU to barcode mapping and details", createdAt: "2024-01-26", status: "pending", format: "PDF", fileSize: "1.1 MB" },
      { _id: "rep-8", reportKey: "sku-tag", title: "SKUTAG Report", description: "SKU to tag number relationships", createdAt: "2024-01-27", status: "completed", format: "PDF", fileSize: "1.8 MB" },
      { _id: "rep-9", reportKey: "tag-summary", title: "TAG Summary Report", description: "Tag-level summary and statistics", createdAt: "2024-01-28", status: "pending", format: "PDF", fileSize: "1.3 MB" },
      { _id: "rep-10", reportKey: "final-stock", title: "Final Stock Take Report", description: "Final verified stock counts", createdAt: "2024-01-29", status: "completed", format: "PDF", fileSize: "2.5 MB" },
      { _id: "rep-11", reportKey: "members-productivity", title: "Members Productivity Report", description: "Productivity report for members", createdAt: "2024-01-30", status: "pending", format: "PDF", fileSize: "0.7 MB" }
    ]
  }
};

// Dummy Products Data for Transfer Dialog
const DUMMY_PRODUCTS = {
  data: [
    { _id: "prod-1", barcode: "BAR-001", sku: "SKU-001", description: "Wireless Headphones", zone: { name: "Electronics", description: "Electronics Section" } },
    { _id: "prod-2", barcode: "BAR-002", sku: "SKU-002", description: "USB-C Cable", zone: { name: "Electronics", description: "Electronics Section" } },
    { _id: "prod-3", barcode: "BAR-003", sku: "SKU-003", description: "Smart Watch", zone: { name: "Wearables", description: "Wearables Section" } },
    { _id: "prod-4", barcode: "BAR-004", sku: "SKU-004", description: "Wireless Charger", zone: { name: "Electronics", description: "Electronics Section" } },
    { _id: "prod-5", barcode: "BAR-005", sku: "SKU-005", description: "Bluetooth Speaker", zone: { name: "Audio", description: "Audio Section" } },
    { _id: "prod-6", barcode: "BAR-006", sku: "SKU-006", description: "Phone Stand", zone: { name: "Accessories", description: "Accessories Section" } },
    { _id: "prod-7", barcode: "BAR-007", sku: "SKU-007", description: "Power Bank", zone: { name: "Electronics", description: "Electronics Section" } },
    { _id: "prod-8", barcode: "BAR-008", sku: "SKU-008", description: "Car Phone Holder", zone: { name: "Automotive", description: "Automotive Section" } },
    { _id: "prod-9", barcode: "BAR-009", sku: "SKU-009", description: "Screen Protector", zone: { name: "Accessories", description: "Accessories Section" } },
    { _id: "prod-10", barcode: "BAR-010", sku: "SKU-010", description: "USB Flash Drive", zone: { name: "Storage", description: "Storage Section" } }
  ]
};

const Reports = () => {
  const toast = useToast();
  const getTagId = (tag, index) => tag?._id || tag?.id || `idx-${index}`;
  const formatQuantity = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReports, setSelectedReports] = useState([]);
  const [expandedReport, setExpandedReport] = useState(null);
  
  // Use dummy data instead of API
  const eventData = DUMMY_EVENT_DATA;
  const masterReportsData = DUMMY_MASTER_REPORTS;
  
  const [showInterimDialog, setShowInterimDialog] = useState(false);
  const [selectedInterimTags, setSelectedInterimTags] = useState([]);
  const [reportSelectionType, setReportSelectionType] = useState("interim");
  const [interimReportType, setInterimReportType] = useState("scanning");
  const [reportSelectionAction, setReportSelectionAction] = useState("download");
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isCatalogLoading, setIsCatalogLoading] = useState(false);
  const allProductsData = DUMMY_PRODUCTS;

  useEffect(() => {
    // Auto-select reports from dummy data
    const eventReports = eventData?.data?.reports || [];
    const masterReports = masterReportsData?.data?.reports || [];
    
    const combinedReports = [...eventReports, ...masterReports];
    
    if (combinedReports.length > 0) {
      const reportKeys = combinedReports
        .map((report) => (report.reportKey || report.key || report.report_key || report.id || "").toString().trim())
        .filter(Boolean);
      
      const uniqueKeys = [...new Set(reportKeys)];
      console.log("SUCCESS: Auto-selecting report keys:", uniqueKeys);
      setSelectedReports(uniqueKeys);
    }
  }, []);

  // Icon mapping for master reports
  const iconMap = {
    "interim-tag": FileText,
    "audit": BarChart3,
    "stock-status": Clock,
    "fixes-corrections": CheckCircle,
    "productivity": TrendingUp,
    "all-product": Package,
    "sku-barcode": FileSpreadsheet,
    "sku-tag": Tag,
    "tag-summary": FileBarChart,
    "final-stock": ClipboardCheck,
    "members-productivity": TrendingUp,
  };

  // Determine the source of reports to show
  const masterReports = masterReportsData?.data?.reports || [];
  const eventReports = eventData?.data?.reports || [];

  // Create a merged list using reportKey as the unique identifier
  const mergedReportsMap = new Map();

  // 1. Add static fallback base (Standardized IDs)
  const allReportsFallback = [
    { id: "interim-tag", name: "Interim TAG Report", icon: FileText, description: "Shows tag status during audit progress" },
    { id: "audit", name: "Audit Report", icon: BarChart3, description: "Comprehensive audit findings and results" },
    { id: "stock-status", name: "Stock Take Status Report", icon: Clock, description: "Real-time stock counting progress" },
    { id: "fixes-corrections", name: "Fixes & Correction Report", icon: CheckCircle, description: "Issues identified and corrections made" },
    { id: "productivity", name: "Productivity Report", icon: TrendingUp, description: "Auditor performance and efficiency metrics" },
    { id: "all-product", name: "All Product Report", icon: Package, description: "Complete product inventory listing" },
    { id: "sku-barcode", name: "SKUBARCODE Report", icon: FileSpreadsheet, description: "SKU to barcode mapping and details" },
    { id: "sku-tag", name: "SKUTAG Report", icon: Tag, description: "SKU to tag number relationships" },
    { id: "tag-summary", name: "TAG Summary Report", icon: FileBarChart, description: "Tag-level summary and statistics" },
    { id: "final-stock", name: "Final Stock Take Report", icon: ClipboardCheck, description: "Final verified stock counts" },
    { id: "post-inventory-quality-audit", name: "Post Inventory Quality Audit", icon: ClipboardCheck, description: "Quality audit after inventory completion" },
    { id: "members-productivity", name: "Members Productivity Report", icon: TrendingUp, description: "Productivity report for members" },
  ];

  allReportsFallback.forEach(r => mergedReportsMap.set(r.id, r));

  // 2. Add/Update with Master Reports from dummy data
  if (Array.isArray(masterReports)) {
    masterReports.forEach(r => {
      const key = (r.reportKey || r.key || "").trim();
      if (key) {
        mergedReportsMap.set(key, {
          id: key,
          name: r.title || r.name,
          icon: iconMap[key] || FileText,
          description: r.description || `Description for ${r.title || r.name}`
        });
      }
    });
  }

  // 3. Ensure any report assigned to the event is ALSO shown
  if (Array.isArray(eventReports)) {
    eventReports.forEach(r => {
      const key = (r.reportKey || r.key || "").trim();
      if (key) {
        mergedReportsMap.set(key, {
          id: key,
          name: r.title || r.name,
          icon: iconMap[key] || FileText,
          description: r.description || `Description for ${r.title || r.name}`
        });
      }
    });
  }

  const allReports = Array.from(mergedReportsMap.values());

  // Derive reports for the table from dummy data
  const reports = masterReports.map(r => {
    const key = (r.reportKey || r.key || "").trim();
    return {
      id: r._id || r.id || key || "N/A",
      name: r.title || r.name || "Untitled Report",
      type: key || "Standard Report",
      eventId: eventData?.data?.uniqueId || "N/A",
      eventName: eventData?.data?.title || "N/A",
      customerName: eventData?.data?.customer?.cus_name || "N/A",
      storeName: eventData?.data?.store?.store_name || "N/A",
      generatedDate: r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      generatedBy: r.createdBy || eventData?.data?.manager || "System",
      fileSize: r.fileSize || "1.2 MB",
      format: r.format || "PDF",
      status: r.status || "pending",
    };
  });

  // Filter reports based on search and status
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status filter options
  const statusOptions = [
    { value: "all", label: "All Reports" },
    { value: "completed", label: "Completed" },
    { value: "generating", label: "Generating" },
    { value: "pending", label: "Pending" },
  ];

  // Toggle report selection
  const handleReportToggle = (reportId) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  // Open specific selection dialog for interim/audit
  const handleOpenSelectionDialog = (reportId, e) => {
    if (e) e.stopPropagation();
    const action = "download";
    if (reportId === "interim-tag") {
      setReportSelectionType("interim");
      setInterimReportType("scanning");
      setReportSelectionAction(action);
      setShowInterimDialog(true);
    } else if (reportId === "audit" || reportId === "audit-tag") {
      setReportSelectionType("audit");
      setInterimReportType("scanning");
      setReportSelectionAction(action);
      setShowInterimDialog(true);
    } else if (reportId === "all-product" || reportId === "all-products") {
      setReportSelectionType("all-product");
      setInterimReportType("count");
      setReportSelectionAction(action);
      setShowInterimDialog(true);
    } else if (reportId === "productivity") {
      handleDownloadReport({ id: reportId, name: "Productivity Report", type: reportId }, action);
    }
  };

  // Select/Deselect all reports
  const handleSelectAllReports = () => {
    if (selectedReports.length === allReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(allReports.map(report => report.id));
    }
  };

  // Handle report expand/collapse
  const handleReportClick = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  // Get format badge
  const getFormatBadge = (format) => {
    const config = {
      PDF: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
    };

    const { bg, text, border } = config[format] || { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" };

    return (
      <Badge className={`${bg} ${text} hover:${bg} ${border}`}>
        {format}
      </Badge>
    );
  };

  const processPdfResponse = async (response, filename, action = "download") => {
    // Mock PDF generation
    setTimeout(() => {
      if (action === "print") {
        toast.info("Print dialog would open here");
      } else if (action === "view") {
        toast.info("Report would open in new tab");
      } else {
        toast.success(`Report downloaded: ${filename}`);
      }
    }, 500);
  };

  // Handle report download
  const handleDownloadReport = async (report, action = "download") => {
    const reportId = report.id;
    const reportType = report.type;
    const reportName = report.name || "";
    const reportKey = reportType || reportId;

    const isStockStatus = reportType === "stock-status" || reportId == 64 || reportId == "64" || reportName.toLowerCase().includes("status");
    const isAllProducts = reportType === "all-product" || reportType === "all-products" || reportId == 68 || reportId == "68" || reportName.toLowerCase().includes("all product");
    const isFinalStock = reportType === "final-stock" || reportId == 66 || reportId == "66" || reportName.toLowerCase().includes("final stock");
    const isInterimTag = reportType === "interim-tag" || reportId == 63 || reportId == "63";
    const isSkuBarcode = reportType === "sku-barcode" || reportType === "item-summary" || reportId == 70 || reportId == "70" || reportName.toLowerCase().includes("barcode") || reportName.toLowerCase().includes("item summary") || reportName.toLowerCase().includes("items summary");
    const isSkuTag = reportType === "sku-tag" || reportId == 65 || reportId == "65" || reportType === "tag-summary" || reportName.toLowerCase().includes("sku tag") || reportName.toLowerCase().includes("tag summary") || reportName.toLowerCase().includes("skutag");
    const isAudit = reportType === "audit" || reportId == 69 || reportId == "69" || reportName.toLowerCase().includes("audit");
    const isProductivity = reportType === "productivity" || reportName.toLowerCase().includes("productivity");

    if (isInterimTag) {
      setReportSelectionType("interim");
      setInterimReportType("scanning");
      setReportSelectionAction(action);
      setShowInterimDialog(true);
      return;
    }
    if (isAudit) {
      setReportSelectionType("audit");
      setInterimReportType("scanning");
      setReportSelectionAction(action);
      setShowInterimDialog(true);
      return;
    }
    if (isAllProducts) {
      toast.info("Generating All Products Report...");
      setTimeout(() => {
        toast.success("All Products Report generated successfully");
      }, 1000);
      return;
    }
    if (isFinalStock) {
      setReportSelectionType("final-stock");
      const isSum = reportName.toLowerCase().includes("summary") || interimReportType === "summary";
      setInterimReportType(isSum ? "summary" : "scanning");
      setReportSelectionAction(action);
      setShowInterimDialog(true);
      return;
    }
    if (isStockStatus) {
      setReportSelectionType("stock-status");
      setInterimReportType("scanning");
      setReportSelectionAction(action);
      setShowInterimDialog(true);
      return;
    }
    if (isSkuBarcode) {
      toast.info("Generating SKU Barcode Report...");
      setTimeout(() => {
        toast.success("SKU Barcode Report generated successfully");
      }, 1000);
      return;
    }
    if (isSkuTag) {
      const isTagSum = reportName.toLowerCase().includes("summary") || reportType === "tag-summary" || reportKey === "tag-summary";
      setReportSelectionType(isTagSum ? "tag-summary" : "sku-tag");
      setInterimReportType("scanning");
      setReportSelectionAction(action);
      setShowInterimDialog(true);
      return;
    }
    if (isProductivity) {
      toast.info("Generating User Productivity Report...");
      setTimeout(() => {
        toast.success("User Productivity Report generated successfully");
      }, 1000);
      return;
    }

    if (reportKey === "post-inventory-quality-audit") {
      toast.info("Generating Post Inventory Quality Audit Form...");
      setTimeout(() => {
        toast.success("Feedback Form generated successfully");
      }, 1000);
      return;
    }
    if (reportKey === "fixes-corrections") {
      toast.info("Generating Fixes & Correction Report...");
      setTimeout(() => {
        toast.success("Fixes & Correction Report generated successfully");
      }, 1000);
      return;
    }
    if (reportKey === "members-productivity") {
      toast.info("Generating Members Productivity Report...");
      setTimeout(() => {
        toast.success("Members Productivity Report generated successfully");
      }, 1000);
      return;
    }
    
    toast.info(`Generating ${reportName}...`);
    setTimeout(() => {
      toast.success(`${reportName} generated successfully`);
    }, 1000);
  };

  const downloadJSONAsCSV = (jsonData, filename, manualHeaders = null) => {
    // Mock CSV download
    toast.info(`Downloading ${filename}...`);
    setTimeout(() => {
      toast.success(`${filename} downloaded successfully`);
    }, 500);
  };

  const handleDownloadCsv = async (report) => {
    const reportId = report.id;
    const reportType = report.type;
    const reportName = report.name || "";
    const reportKey = reportType || reportId;

    toast.info(`Exporting ${reportName} to CSV...`);
    setTimeout(() => {
      toast.success(`${reportName} CSV exported successfully`);
    }, 1000);
  };

  // Handle confirm interim report download with specific tags
  const handleConfirmInterimDownload = async (selectedTags, isAllSelected = false) => {
    console.log(`Generating interim report for ${selectedTags.length} tags`);
    toast.info(`Generating report for ${selectedTags.length} tags...`);
    setTimeout(() => {
      toast.success("Interim report generated successfully");
      setShowInterimDialog(false);
      setSelectedInterimTags([]);
    }, 1000);
  };

  // Handle confirm audit report download with specific tags
  const handleConfirmAuditDownload = async (selectedTags, isAllSelected = false) => {
    console.log(`Generating audit report for ${selectedTags.length} tags`);
    toast.info(`Generating audit report for ${selectedTags.length} tags...`);
    setTimeout(() => {
      toast.success("Audit report generated successfully");
      setShowInterimDialog(false);
      setSelectedInterimTags([]);
    }, 1000);
  };

  const handleConfirmFinalStockDownload = async (selectedTags, isAllSelected = false) => {
    toast.info(`Generating final stock report...`);
    setTimeout(() => {
      toast.success("Final stock report generated successfully");
      setShowInterimDialog(false);
      setSelectedInterimTags([]);
    }, 1000);
  };

  const handleConfirmSkuTagDownload = async (selectedTags, isAllSelected = false) => {
    toast.info(`Generating SKU Tag report...`);
    setTimeout(() => {
      toast.success("SKU Tag report generated successfully");
      setShowInterimDialog(false);
      setSelectedInterimTags([]);
    }, 1000);
  };

  const handleConfirmStockStatusDownload = async (selectedTags, isAllSelected = false) => {
    toast.info(`Generating stock status report...`);
    setTimeout(() => {
      toast.success("Stock status report generated successfully");
      setShowInterimDialog(false);
      setSelectedInterimTags([]);
    }, 1000);
  };

  // Handle report view
  const handleViewReport = (report) => {
    handleDownloadReport(report, "view");
  };

  // Handle report print
  const handlePrintReport = (report) => {
    handleDownloadReport(report, "print");
  };

  // Handle generate new report
  const handleGenerateReport = () => {
    console.log("Generate new report");
  };

  return (
    <div className="min-h-screen  p-4 md:p-6">
      <div className="max-w-9xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <FileBarChart className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold theme-text-primary">
              Reports Management
            </h1>
          </div>
        </div>

        {/* Generated Reports Table */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg border-1 border-blue-600 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Master Reports Configuration
                    </CardTitle>
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-row gap-3 w-full lg:w-auto">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10">
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-left px-4 h-12 text-sm font-semibold text-gray-700">
                      Report Details
                    </TableHead>
                    <TableHead className="text-center px-4 h-12 text-sm font-semibold text-gray-700">
                      Status
                    </TableHead>
                    <TableHead className="text-center px-4 h-12 text-sm font-semibold text-gray-700">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <Fragment key={report.id}>
                      <TableRow className="hover:bg-gray-50 transition-colors">
                        <TableCell className="px-4 py-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{report.name}</div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center">
                          <div className="flex justify-center">
                            {getStatusBadge(report?.status)}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewReport(report)}
                              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              title="View Report"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadReport(report)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Download PDF Report"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePrintReport(report)}
                              className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                              title="Print Report"
                            >
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                toast.info("Share feature coming soon to main reports");
                              }}
                              className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                              title="Share Report"
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadCsv(report)}
                              className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                              title="Download CSV"
                            >
                              <FileDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No reports found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  No reports match your current filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;