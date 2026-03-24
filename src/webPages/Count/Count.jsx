"use client";
import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
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
  Package,
  Tags,
  Users,
  Search,
  Edit,
  Calendar,
  Plus,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  Clock,
  PlayCircle,
  ChevronRight,
  RefreshCw,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import TablePagination from "@/components/ui/utils/TablePagination";
import { useRouter } from "next/navigation";
// import ZoneMasterDialog from "../zone-master/ZoneMasterDialog";

// Dummy data
const DUMMY_ZONES = [
  {
    _id: "1",
    id: "1",
    name: "Zone A - Electronics",
    description: "Electronics section",
    uniqueId: "ZONE-A-001",
    tagRange: "TAG-001 to TAG-050",
    status: "completed",
    createdAt: "2024-01-15T10:30:00Z",
    totalTags: 50,
    completedTags: 50,
    totalQuantity: 150,
    totalAuditQty: 150,
    totalFinalQty: 150,
    assignedUsers: ["user1", "user2"],
    countedItemsCount: 150
  },
  {
    _id: "2",
    id: "2",
    name: "Zone B - Clothing",
    description: "Clothing and accessories",
    uniqueId: "ZONE-B-002",
    tagRange: "TAG-051 to TAG-100",
    status: "in-progress",
    createdAt: "2024-01-16T11:45:00Z",
    totalTags: 50,
    completedTags: 28,
    totalQuantity: 200,
    totalAuditQty: 75,
    totalFinalQty: 120,
    assignedUsers: ["user3", "user4", "user5"],
    countedItemsCount: 120
  },
  {
    _id: "3",
    id: "3",
    name: "Zone C - Grocery",
    description: "Fresh produce and groceries",
    uniqueId: "ZONE-C-003",
    tagRange: "TAG-101 to TAG-150",
    status: "audit-in-progress",
    createdAt: "2024-01-17T09:15:00Z",
    totalTags: 50,
    completedTags: 50,
    totalQuantity: 300,
    totalAuditQty: 150,
    totalFinalQty: 200,
    assignedUsers: ["user6", "user7"],
    countedItemsCount: 200
  },
  {
    _id: "4",
    id: "4",
    name: "Zone D - Furniture",
    description: "Home furniture section",
    uniqueId: "ZONE-D-004",
    tagRange: "TAG-151 to TAG-200",
    status: "not-started",
    createdAt: "2024-01-18T14:20:00Z",
    totalTags: 50,
    completedTags: 0,
    totalQuantity: 80,
    totalAuditQty: 0,
    totalFinalQty: 0,
    assignedUsers: [],
    countedItemsCount: 0
  },
  {
    _id: "5",
    id: "5",
    name: "Zone E - Toys",
    description: "Children's toys and games",
    uniqueId: "ZONE-E-005",
    tagRange: "TAG-201 to TAG-250",
    status: "fix",
    createdAt: "2024-01-19T08:00:00Z",
    totalTags: 50,
    completedTags: 35,
    totalQuantity: 120,
    totalAuditQty: 40,
    totalFinalQty: 85,
    assignedUsers: ["user8", "user9", "user10"],
    countedItemsCount: 85
  },
  {
    _id: "6",
    id: "6",
    name: "Zone F - Sports",
    description: "Sports equipment",
    uniqueId: "ZONE-F-006",
    tagRange: "TAG-251 to TAG-300",
    status: "in-progress",
    createdAt: "2024-01-20T13:10:00Z",
    totalTags: 50,
    completedTags: 42,
    totalQuantity: 180,
    totalAuditQty: 90,
    totalFinalQty: 135,
    assignedUsers: ["user11", "user12"],
    countedItemsCount: 135
  },
  {
    _id: "7",
    id: "7",
    name: "Zone G - Books",
    description: "Books and stationery",
    uniqueId: "ZONE-G-007",
    tagRange: "TAG-301 to TAG-350",
    status: "completed",
    createdAt: "2024-01-21T16:45:00Z",
    totalTags: 50,
    completedTags: 50,
    totalQuantity: 250,
    totalAuditQty: 250,
    totalFinalQty: 250,
    assignedUsers: ["user13"],
    countedItemsCount: 250
  },
  {
    _id: "8",
    id: "8",
    name: "Zone H - Beauty",
    description: "Beauty and cosmetics",
    uniqueId: "ZONE-H-008",
    tagRange: "TAG-351 to TAG-400",
    status: "audit-in-progress",
    createdAt: "2024-01-22T10:30:00Z",
    totalTags: 50,
    completedTags: 50,
    totalQuantity: 90,
    totalAuditQty: 45,
    totalFinalQty: 65,
    assignedUsers: ["user14", "user15"],
    countedItemsCount: 65
  }
];

const Count = ({ eventId, eventName, eventAddress, onRefreshProgress }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isNoAudit } = { isNoAudit: false }; // Mock for audit settings
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingZone, setEditingZone] = useState(null);

  // Calculate summary stats from dummy data
  const summaryStats = useMemo(() => {
    const zonesList = DUMMY_ZONES;
    
    const totalZones = zonesList.length;
    const completedZones = zonesList.filter(zone => zone.status === "completed").length;
    const totalTags = zonesList.reduce((sum, zone) => sum + zone.totalTags, 0);
    const completedTags = zonesList.reduce((sum, zone) => sum + zone.completedTags, 0);
    const countedTags = zonesList.reduce((sum, zone) => sum + zone.completedTags, 0);
    const auditedTags = zonesList.reduce((sum, zone) => sum + (zone.totalAuditQty || 0), 0);
    const totalUsers = zonesList.reduce((sum, zone) => sum + (zone.assignedUsers?.length || 0), 0);
    const totalFinalQuantity = zonesList.reduce((sum, zone) => sum + (zone.totalFinalQty || 0), 0);
    const totalAuditQuantity = zonesList.reduce((sum, zone) => sum + (zone.totalAuditQty || 0), 0);
    const totalSKUs = zonesList.reduce((sum, zone) => sum + (zone.totalQuantity || 0), 0);
    
    return {
      totalZones,
      completedZones,
      totalTags,
      completedTags,
      countedTags,
      auditedTags,
      totalUsers,
      totalFinalQuantity,
      totalAuditQuantity,
      totalSKUs,
    };
  }, []);

  const handleSaveZone = (zoneData) => {
    console.log("Save store:", zoneData);
    setIsDialogOpen(false);
  };

  // Filter zones based on search query
  const filteredZones = useMemo(() => {
    const zonesList = DUMMY_ZONES;
    if (!searchQuery) return zonesList;

    return zonesList.filter(
      (zone) =>
        (zone.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (zone.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (zone.uniqueId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (zone.tagRange || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Calculate overall progress percentages
  const overallProgress = useMemo(() => {
    const zonesProgress = summaryStats.totalZones ? Math.round(
      (summaryStats.completedZones / summaryStats.totalZones) * 100
    ) : 0;
    const tagsProgress = summaryStats.totalTags ? Math.round(
      (summaryStats.completedTags / summaryStats.totalTags) * 100
    ) : 0;
    const skusProgress = summaryStats.totalSKUs ? Math.round(
      (summaryStats.totalSKUs / summaryStats.totalSKUs) * 100
    ) : 0;
    const finalSkuProgress = summaryStats.totalFinalQuantity ? Math.round(
      (summaryStats.totalFinalQuantity / summaryStats.totalSKUs) * 100
    ) : 0;
    const auditProgress = summaryStats.totalTags ? Math.round(
      (summaryStats.auditedTags / summaryStats.totalTags) * 100
    ) : 0;
    const auditSkuProgress = summaryStats.totalSKUs ? Math.round(
      (summaryStats.totalAuditQuantity / summaryStats.totalSKUs) * 100
    ) : 0;
    const overall = summaryStats.totalZones ? Math.round(
      (zonesProgress + tagsProgress + skusProgress) / 3
    ) : 0;

    return {
      zones: zonesProgress,
      tags: tagsProgress,
      skus: skusProgress,
      auditProgress: auditProgress,
      auditSkuProgress: auditSkuProgress,
      finalSkuProgress: finalSkuProgress,
      overall: overall,
    };
  }, [summaryStats]);

  // Calculate pagination values for zones
  const totalPages = Math.ceil(filteredZones.length / pageSize);

  // Get current page data
  const currentZones = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredZones.slice(startIndex, endIndex);
  }, [currentPage, pageSize, filteredZones]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      if (onRefreshProgress) {
        onRefreshProgress(eventId);
      }
    }, 1000);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (zoneId) => {
    router.push(`/dashboard/count/tags?zone=${zoneId}`);
  };

  const handleEditClick = (zoneId, e) => {
    e.stopPropagation();
    console.log("Edit zone:", zoneId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
      "audit-in-progress": {
        bg: "bg-purple-100",
        border: "border-l-4 border-purple-400",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        statusColor: "bg-purple-100 text-purple-800",
      },
      "completed": {
        bg: "bg-green-100",
        border: "border-l-4 border-green-400",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        statusColor: "bg-green-100 text-green-800",
      },
      "fix": {
        bg: "bg-red-100",
        border: "border-l-4 border-red-400",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        statusColor: "bg-red-100 text-red-800",
      },
    };
    return colors[status] || colors["not-started"];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
      case "audit-in-progress":
        return <PlayCircle className="h-4 w-4" />;
      case "fix":
        return <AlertCircle className="h-4 w-4" />;
      case "not-started":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 new-bg">
      {/* Zones Overview */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold theme-text-primary">
                  Zones Overview
                </h1>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6 px-6">
          <div className={`grid grid-cols-1 ${isNoAudit ? 'md:grid-cols-6' : 'md:grid-cols-7'} gap-6 text-center mb-8`}>
            {/* Total Zones */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-3xl font-bold text-gray-800">
                {summaryStats.totalZones}
              </div>
              <div className="text-sm font-medium text-gray-500 mt-1">Total Zones</div>
            </div>

            {/* Completed Zones */}
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <div className="text-3xl font-bold text-green-600">
                {summaryStats.completedZones}
              </div>
              <div className="text-sm font-medium text-green-600 mt-1">Completed Zones</div>
            </div>

            {/* Total Tags */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="text-3xl font-bold text-blue-800">
                {summaryStats.totalTags}
              </div>
              <div className="text-sm font-medium text-blue-600 mt-1">Total Tags</div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
              <div className="text-3xl font-bold text-indigo-600">
                {summaryStats.countedTags}
              </div>
              <div className="text-sm font-medium text-indigo-600 mt-1">Counted Tags</div>
            </div>

            {!isNoAudit && (
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="text-3xl font-bold text-indigo-600">
                  {summaryStats.auditedTags}
                </div>
                <div className="text-sm font-medium text-indigo-600 mt-1">Audited Tags</div>
              </div>
            )}

            {/* Completed Tags */}
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
              <div className="text-3xl font-bold text-indigo-600">
                {summaryStats.completedTags}
              </div>
              <div className="text-sm font-medium text-indigo-600 mt-1">Completed Tags</div>
            </div>

            {/* Assigned Users */}
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
              <div className="text-3xl font-bold text-purple-600">
                {summaryStats.totalUsers}
              </div>
              <div className="text-sm font-medium text-purple-600 mt-1">Assigned Users</div>
            </div>
          </div>

          {DUMMY_ZONES.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-${isNoAudit ? '4' : '5'} gap-4 mt-4`}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Zones Progress</span>
                  <span className="font-bold">{overallProgress.zones}%</span>
                </div>
                <Progress value={overallProgress.zones} className="h-2 bg-gray-100" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tags Progress</span>
                  <span className="font-bold">{overallProgress.tags}%</span>
                </div>
                <Progress value={overallProgress.tags} className="h-2 bg-gray-100" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Count Qty</span>
                  <span className="font-bold">{summaryStats.totalSKUs}</span>
                </div>
                <Progress value={overallProgress.skus} className="h-2 bg-blue-100" />
              </div>

              {!isNoAudit && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Audit Qty</span>
                    <span className="font-bold">{summaryStats.totalAuditQuantity}</span>
                  </div>
                  <Progress value={overallProgress.auditSkuProgress} className="h-2 bg-blue-100" />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Final Qty</span>
                  <span className="font-bold">{summaryStats.totalFinalQuantity}</span>
                </div>
                <Progress value={overallProgress.finalSkuProgress} className="h-2 bg-gray-100" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-2xl font-bold theme-text-primary">
                  Zones Progress
                </CardTitle>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="h-10 w-10 flex-shrink-0 border-blue-200 hover:bg-blue-50 text-blue-600 shadow-sm"
                  title="Refresh Event progress"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                </Button>
                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search zones..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200 hover:bg-gray-300">
                  <TableHead className="text-md font-bold text-gray-700 py-4 px-4">
                    Zone Details
                  </TableHead>
                  <TableHead className="text-md font-bold text-gray-700 py-4 px-4">
                    Tag Ranges
                  </TableHead>
                  <TableHead className="text-md text-center font-bold text-gray-700 py-4 px-4">
                    Tags Progress
                  </TableHead>
                  <TableHead className="text-md text-center font-bold text-gray-700 py-4 px-4">
                    Count Qty
                  </TableHead>
                  {!isNoAudit && (
                    <TableHead className="text-md text-center font-bold text-gray-700 py-4 px-4">
                      Audit Qty
                    </TableHead>
                  )}
                  <TableHead className="text-md text-center font-bold text-gray-700 py-4 px-4">
                    Final Qty
                  </TableHead>
                  <TableHead className="text-md text-center font-bold text-gray-700 py-4 px-4">
                    Status
                  </TableHead>
                  <TableHead className="text-md font-bold text-gray-700 py-4 px-4">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-10 text-center">
                      <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                      <span className="mt-2 block text-gray-500">Loading zones data...</span>
                    </TableCell>
                  </TableRow>
                ) : currentZones.map((zone) => {
                  let normalizedStatus = (zone.status || "not-started").toLowerCase().replace(/_/g, '-');
                  if (normalizedStatus === "inprogress") normalizedStatus = "in-progress";

                  const colors = getStatusColors(normalizedStatus);
                  const totalTags = zone.totalTags || 0;
                  const completedTags = zone.completedTags || 0;
                  const progressPercentage = totalTags > 0
                    ? Math.round((completedTags / totalTags) * 100)
                    : 0;

                  return (
                    <TableRow
                      key={zone._id || zone.id}
                      className={`
                        ${colors.bg} ${colors.border}
                        cursor-pointer transition-all duration-200
                        hover:shadow-md hover:-translate-y-0.5
                        border-b border-gray-200
                      `}
                      onClick={() => handleRowClick(zone._id || zone.id)}
                    >
                      {/* Zone Details */}
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 ${colors.iconBg} rounded-lg`}>
                            <div className={colors.iconColor}>
                              {getStatusIcon(normalizedStatus)}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {zone.name}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {zone.description} ({zone.uniqueId})
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                              <Calendar className="h-3 w-3" />
                              Created: {formatDate(zone.createdAt)}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Tag Ranges */}
                      <TableCell className="py-4 px-4">
                        <div className="w-[220px] bg-white p-3 rounded-lg border">
                          <div className="font-mono text-sm break-words whitespace-normal text-gray-700 leading-relaxed">
                            {zone.tagRange || "N/A"}
                          </div>
                        </div>
                      </TableCell>

                      {/* Tags Progress */}
                      <TableCell className="py-4 px-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-700">
                              Tags
                            </div>
                            <div className="font-bold">
                              {progressPercentage}%
                            </div>
                          </div>
                          <Progress
                            value={progressPercentage}
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Tags className="h-3 w-3" />
                              {completedTags}/{totalTags}
                            </div>
                            <span>
                              {Math.max(0, totalTags - completedTags)} left
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* SKU Progress */}
                      <TableCell className="py-4 px-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 transition-all duration-300 group hover:shadow-md">
                          <div className="flex items-center justify-center">
                            <div className="text-md font-bold text-gray-900">{zone.totalQuantity || 0}</div>
                          </div>
                        </div>
                      </TableCell>

                      {!isNoAudit && (
                        <TableCell className="py-4 px-4">
                          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 transition-all duration-300 group hover:shadow-md">
                            <div className="flex items-center justify-center">
                              <div className="text-md font-bold text-gray-900">{zone.totalAuditQty || 0}</div>
                            </div>
                          </div>
                        </TableCell>
                      )}

                      <TableCell className="py-4 px-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 transition-all duration-300 group hover:shadow-md">
                          <div className="flex items-center justify-center">
                            <div className="text-md font-bold text-gray-900">{zone.totalFinalQty || 0}</div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Badge
                            className={`px-3 py-1.5 font-medium ${colors.statusColor}`}
                          >
                            {(zone.status || "not-started").replace(/[_-]/g, " ").toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-medium transition-colors flex items-center gap-1 border border-black"
                          >
                            <ChevronRight className="h-3 w-3" />
                            <span>View</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredZones.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No zones found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchQuery
                  ? "No zones match your search. Try a different search term."
                  : "No zones have been created yet for this event."}
              </p>
            </div>
          )}
        </CardContent>

        {/* Pagination */}
        {filteredZones.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Card>
      {/* <ZoneMasterDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        zone={editingZone}
        onSave={handleSaveZone}
      /> */}
    </div>
  );
};

export default Count;