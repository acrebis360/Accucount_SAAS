// app/team/page.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Filter,
  Users,
  RefreshCw,
  FileDown,
  Trash2,
  Download
} from "lucide-react";
import { useRouter } from "next/navigation";
import useToast from "../../components/ui/toast/useToast";

// Dummy Team Performance Data
const DUMMY_TEAM_DATA = {
  summary: {
    totalMembers: 8,
    avgAccuracy: 97.5,
    totalQuantity: 12450,
    avgDowntime: 8.3
  },
  members: [
    {
      id: "user-1",
      name: "John Doe",
      role: "Senior Counter",
      items: 156,
      quantity: 2450,
      aph: 98.5,
      downTimeMinutes: 45,
      downTimePercent: 5.2,
      accuracy: 98.5,
      tags: [
        { barcode: "TAG-001", quantity: 25, openTime: "2024-01-15T09:00:00", closeTime: "2024-01-15T10:30:00" },
        { barcode: "TAG-002", quantity: 30, openTime: "2024-01-15T10:45:00", closeTime: "2024-01-15T12:15:00" }
      ]
    },
    {
      id: "user-2",
      name: "Jane Smith",
      role: "Counter",
      items: 142,
      quantity: 2180,
      aph: 92.3,
      downTimeMinutes: 52,
      downTimePercent: 6.8,
      accuracy: 96.2,
      tags: [
        { barcode: "TAG-003", quantity: 20, openTime: "2024-01-15T09:15:00", closeTime: "2024-01-15T10:45:00" },
        { barcode: "TAG-004", quantity: 28, openTime: "2024-01-15T11:00:00", closeTime: "2024-01-15T12:30:00" }
      ]
    },
    {
      id: "user-3",
      name: "Mike Johnson",
      role: "Auditor",
      items: 98,
      quantity: 1650,
      aph: 105.2,
      downTimeMinutes: 28,
      downTimePercent: 3.5,
      accuracy: 99.2,
      tags: [
        { barcode: "TAG-005", quantity: 35, openTime: "2024-01-15T08:30:00", closeTime: "2024-01-15T10:00:00" },
        { barcode: "TAG-006", quantity: 22, openTime: "2024-01-15T10:15:00", closeTime: "2024-01-15T11:45:00" }
      ]
    },
    {
      id: "user-4",
      name: "Sarah Williams",
      role: "Senior Auditor",
      items: 112,
      quantity: 1890,
      aph: 101.8,
      downTimeMinutes: 35,
      downTimePercent: 4.2,
      accuracy: 98.8,
      tags: [
        { barcode: "TAG-007", quantity: 32, openTime: "2024-01-15T09:00:00", closeTime: "2024-01-15T10:30:00" }
      ]
    },
    {
      id: "user-5",
      name: "David Brown",
      role: "Counter",
      items: 88,
      quantity: 1240,
      aph: 86.5,
      downTimeMinutes: 68,
      downTimePercent: 9.1,
      accuracy: 94.5,
      tags: []
    },
    {
      id: "user-6",
      name: "Emily Davis",
      role: "Auditor",
      items: 134,
      quantity: 2040,
      aph: 96.2,
      downTimeMinutes: 42,
      downTimePercent: 5.8,
      accuracy: 97.3,
      tags: [
        { barcode: "TAG-008", quantity: 28, openTime: "2024-01-15T09:30:00", closeTime: "2024-01-15T11:00:00" },
        { barcode: "TAG-009", quantity: 31, openTime: "2024-01-15T11:15:00", closeTime: "2024-01-15T12:45:00" }
      ]
    },
    {
      id: "user-7",
      name: "Chris Wilson",
      role: "Team Lead",
      items: 45,
      quantity: 890,
      aph: 110.2,
      downTimeMinutes: 15,
      downTimePercent: 1.8,
      accuracy: 99.8,
      tags: [
        { barcode: "TAG-010", quantity: 45, openTime: "2024-01-15T08:00:00", closeTime: "2024-01-15T09:30:00" }
      ]
    },
    {
      id: "user-8",
      name: "Amanda Taylor",
      role: "Counter",
      items: 76,
      quantity: 1110,
      aph: 89.7,
      downTimeMinutes: 58,
      downTimePercent: 7.5,
      accuracy: 95.2,
      tags: []
    }
  ]
};

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const itemsPerPage = 5;

  const router = useRouter();
  const toast = useToast();

  // Use dummy data instead of API
  const performanceData = DUMMY_TEAM_DATA;
  const summary = performanceData.summary;
  const teamData = performanceData.members;

  const handleDownloadUserActivity = async (e, member) => {
    e.stopPropagation();
    if (!member.id) {
      toast.error("User ID not found");
      return;
    }

    try {
      toast.info(`Generating activity PDF for ${member.name}...`);
      
      // Simulate PDF generation with delay
      setTimeout(() => {
        // Create a dummy PDF blob
        const dummyContent = `Team Performance Report for ${member.name}\n\nItems: ${member.items}\nQuantity: ${member.quantity}\nAccuracy: ${member.accuracy}%\nAPH: ${member.aph}`;
        const blob = new Blob([dummyContent], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `User_Tag_Activity_${member.name.replace(/\s+/g, "_")}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        
        toast.success("PDF downloaded successfully");
      }, 1000);
    } catch (error) {
      console.error("Failed to download PDF:", error);
      toast.error("Failed to download activity report");
    }
  };

  const handleDownloadCSV = async () => {
    try {
      toast.info("Generating Team Performance CSV...");

      // Prepare CSV content from dummy data
      const headers = ["User Name", "Role", "Tag Barcode", "Quantity", "Open Time", "Close Time"];
      const rows = [];

      teamData.forEach(user => {
        if (user.tags && user.tags.length > 0) {
          user.tags.forEach(tag => {
            rows.push([
              user.name,
              user.role || "N/A",
              tag.barcode || "N/A",
              tag.quantity || 0,
              tag.openTime ? new Date(tag.openTime).toLocaleString() : "N/A",
              tag.closeTime ? new Date(tag.closeTime).toLocaleString() : "N/A"
            ]);
          });
        } else {
          rows.push([
            user.name,
            user.role || "N/A",
            "N/A",
            0,
            "N/A",
            "N/A"
          ]);
        }
      });

      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Team_Performance_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("CSV downloaded successfully");
    } catch (error) {
      console.error("Failed to download CSV:", error);
      toast.error("Failed to generate CSV export");
    }
  };

  const handleRefetch = async () => {
    setIsLoading(true);
    try {
      toast.info("Refreshing team performance data...");
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Data refreshed successfully");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to refresh data");
    }
  };

  const handleVoidTags = async (e, member) => {
    e.stopPropagation();
    if (!member.id) {
      toast.error("User ID not found");
      return;
    }

    if (!confirm(`Are you sure you want to void all tags for ${member.name}? This action cannot be undone.`)) {
      return;
    }

    try {
      toast.info(`Voiding tags for ${member.name}...`);
      setTimeout(() => {
        toast.success(`Successfully voided all tags for ${member.name}`);
      }, 1000);
    } catch (err) {
      toast.error(`Failed to void tags for ${member.name}`);
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 98) return "text-green-400";
    if (accuracy >= 96) return "text-yellow-400";
    return "text-red-400";
  };

  const getPiecesPerCountColor = (piecesPerCount) => {
    if (piecesPerCount >= 27.5) return "text-green-400";
    if (piecesPerCount >= 26.5) return "text-yellow-400";
    return "text-red-400";
  };

  const getDownTimeColor = (downTimePercentage) => {
    if (downTimePercentage <= 5) return "text-green-400";
    if (downTimePercentage <= 15) return "text-yellow-400";
    return "text-red-400";
  };

  const handleMemberClick = (memberId) => {
    router.push(`/team/${memberId}`);
  };

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  // Filter data based on search
  let filteredData = teamData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.role && item.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sorting
  if (sortConfig.key) {
    filteredData = [...filteredData].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }

      return sortConfig.direction === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <span className="text-gray-400 text-xs ml-1">▲▼</span>;
    }

    return (
      <span className="text-gray-700 text-xs ml-1">
        {sortConfig.direction === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  return (
    <div className="mx-auto py-8 p-10 border-2 border-blue-200 shadow-lg rounded-2xl theme-bg-primary">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold theme-text-primary">Team Performance</h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefetch} disabled={isLoading}>
              <RefreshCw className={`h-6 w-6 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          <div>
            <Button
              variant="outline"
              className="theme-border hover:theme-bg-hover text-black"
              onClick={handleDownloadCSV}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 theme-text-secondary w-4 h-4" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 theme-border theme-text-primary theme-bg-card w-full sm:w-64 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-blue-200 rounded-xl p-4 shadow-lg">
          <div className="text-sm theme-text-secondary mb-1">
            Total Team Members
          </div>
          <div className="text-2xl font-bold theme-text-primary">
            {summary.totalMembers || 0}
          </div>
          <div className="text-xs theme-text-secondary mt-1">
            Active: {teamData.filter((m) => m.role).length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-blue-200 rounded-xl p-4 shadow-lg">
          <div className="text-sm theme-text-secondary mb-1">Avg Accuracy</div>
          <div className="text-2xl font-bold theme-text-primary">
            {Math.round(summary.avgAccuracy || 0)}%
          </div>
          <div className="text-xs theme-text-secondary mt-1">
            Overall performance
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-blue-200 rounded-xl p-4 shadow-lg">
          <div className="text-sm theme-text-secondary mb-1">
            Quantity
          </div>
          <div className="text-2xl font-bold theme-text-primary">
            {(summary.totalQuantity || 0).toLocaleString()}
          </div>
          <div className="text-xs theme-text-secondary mt-1">Today</div>
        </div>
        <div className="bg-gradient-to-br from-sky-50 to-sky-100 border-blue-200 rounded-xl p-4 shadow-lg">
          <div className="text-sm theme-text-secondary mb-1">Avg Downtime</div>
          <div className="text-2xl font-bold theme-text-primary">
            {(summary.avgDowntime || 0).toFixed(1)}%
          </div>
          <div className="text-xs theme-text-secondary mt-1">Of total time</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="theme-bg-card rounded-2xl theme-shadow border theme-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-md font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 border-b theme-border">
              <TableHead
                onClick={() => handleSort("name")}
                className="text-md font-bold text-gray-700 cursor-pointer"
              >
                Team Member <SortIcon column="name" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("items")}
                className="text-md font-bold text-gray-700 cursor-pointer"
              >
                Items <SortIcon column="items" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("quantity")}
                className="text-md font-bold text-gray-700 cursor-pointer"
              >
                Quantity <SortIcon column="quantity" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("aph")}
                className="text-md font-bold text-gray-700 cursor-pointer"
              >
                APH(Avg Per Hour) <SortIcon column="aph" />
              </TableHead>

              <TableHead
                onClick={() => handleSort("downTimePercent")}
                className="text-md font-bold text-gray-700 cursor-pointer"
              >
                Down Time <SortIcon column="downTimePercent" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("accuracy")}
                className="text-md font-bold text-gray-700 cursor-pointer"
              >
                Accuracy <SortIcon column="accuracy" />
              </TableHead>
              <TableHead className="text-md font-bold text-gray-700">
                Report
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={index}
                className="hover:theme-bg-hover cursor-pointer border-b theme-border"
                onClick={() => handleMemberClick(item.id || index)}
              >
                {/* Team Member - Clickable */}
                <TableCell className="font-medium theme-text-accent hover:theme-text-primary hover:underline transition-colors duration-200">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.role}</div>
                  </div>
                </TableCell>

                <TableCell className="theme-text-primary font-semibold">
                  {item.items || 0}
                </TableCell>
                <TableCell className="theme-text-primary">
                  {(item.quantity || 0).toLocaleString()}
                </TableCell>

                <TableCell className="theme-text-primary font-semibold">
                  {item.aph || "-"}
                </TableCell>

                <TableCell className="theme-text-primary">
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.downTimeMinutes}m</span>
                    <span
                      className={`text-xs ${getDownTimeColor(
                        item.downTimePercent
                      )}`}
                    >
                      ({item.downTimePercent}%)
                    </span>
                  </div>
                </TableCell>

                <TableCell
                  className={`font-semibold theme-text-secondary ${getAccuracyColor(
                    item.accuracy
                  )}`}
                >
                  {item.accuracy}%
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-blue-50 text-blue-600"
                      onClick={(e) => handleDownloadUserActivity(e, item)}
                    >
                      <FileDown className="h-5 w-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {paginatedData.length === 0 && (
          <div className="text-center py-12">
            <div className="theme-text-secondary mb-2">
              No team members found
            </div>
            <div className="theme-text-secondary text-sm">
              Try adjusting your search or filters
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="theme-text-secondary text-sm">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} team members
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={`theme-text-primary hover:theme-bg-hover ${currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }`}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                      className={
                        currentPage === page
                          ? "theme-bg-active text-white hover:theme-bg-active"
                          : "theme-text-primary hover:theme-bg-hover"
                      }
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                  className={`theme-text-primary hover:theme-bg-hover ${currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                    }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}