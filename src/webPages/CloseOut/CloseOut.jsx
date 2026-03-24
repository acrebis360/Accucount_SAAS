"use client";
import React, { useState } from "react";
import {
  AlertCircle,
  Wrench,
  FileCheck,
  ExternalLink,
  CheckCircle,
  Search,
  Filter,
  RefreshCw,
  Download,
  ChevronDown,
  Tag,
  Barcode,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { getStatusBadge } from "@/components/ui/utils/BadgeStatus";
import useToast from "@/components/ui/toast/useToast";


// Dummy Data
const DUMMY_NOT_STARTED_TAGS = [
  {
    id: "tag-001",
    barcode: "TAG-001",
    status: "not-started",
    zoneId: "zone-1",
    zoneName: "Electronics Section",
    zone: { id: "zone-1", name: "Electronics Section" }
  },
  {
    id: "tag-002",
    barcode: "TAG-002",
    status: "not-started",
    zoneId: "zone-2",
    zoneName: "Clothing Section",
    zone: { id: "zone-2", name: "Clothing Section" }
  },
  {
    id: "tag-003",
    barcode: "TAG-003",
    status: "not-started",
    zoneId: "zone-3",
    zoneName: "Grocery Section",
    zone: { id: "zone-3", name: "Grocery Section" }
  }
];

const DUMMY_OPEN_TAGS = [
  {
    id: "tag-004",
    barcode: "TAG-004",
    status: "in-progress",
    ScannedTag: [
      {
        id: "scan-001",
        eventUserRole: {
          user: { name: "John Doe" }
        }
      }
    ]
  },
  {
    id: "tag-005",
    barcode: "TAG-005",
    status: "in-progress",
    ScannedTag: [
      {
        id: "scan-002",
        eventUserRole: {
          user: { name: "Jane Smith" }
        }
      }
    ]
  }
];

const DUMMY_FIX_TAGS = [
  {
    id: "tag-006",
    barcode: "TAG-006",
    status: "fix",
    ScannedTag: [
      {
        id: "scan-003",
        eventUserRole: {
          user: { name: "Mike Johnson" }
        }
      }
    ]
  },
  {
    id: "tag-007",
    barcode: "TAG-007",
    status: "fix",
    ScannedTag: [
      {
        id: "scan-004",
        eventUserRole: {
          user: { name: "Sarah Williams" }
        }
      }
    ]
  }
];

const DUMMY_AUDIT_PENDING_TAGS = [
  {
    id: "tag-008",
    barcode: "TAG-008",
    status: "audit_in_progress",
    eventUserRole: {
      user: { name: "David Brown" }
    }
  },
  {
    id: "tag-009",
    barcode: "TAG-009",
    status: "audit_in_progress",
    eventUserRole: {
      user: { name: "Emily Davis" }
    }
  }
];

const DUMMY_COUNTED_TAGS = [
  {
    id: "tag-010",
    barcode: "TAG-010",
    status: "counted",
    ScannedTag: [
      {
        id: "scan-005",
        eventUserRole: {
          user: { name: "John Doe" }
        }
      }
    ]
  },
  {
    id: "tag-011",
    barcode: "TAG-011",
    status: "counted",
    ScannedTag: [
      {
        id: "scan-006",
        eventUserRole: {
          user: { name: "Jane Smith" }
        }
      }
    ]
  }
];

const CloseOutDashboard = () => {
  const [activeTab, setActiveTab] = useState("open");
  const [isNoAudit, setIsNoAudit] = useState(false);
  const [eventStatus, setEventStatus] = useState("Live");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Dummy data states
  const [notStartedTags, setNotStartedTags] = useState(DUMMY_NOT_STARTED_TAGS);
  const [openTags, setOpenTags] = useState(DUMMY_OPEN_TAGS);
  const [fixRequiredTags, setFixRequiredTags] = useState(DUMMY_FIX_TAGS);
  const [auditPendingTags, setAuditPendingTags] = useState(DUMMY_AUDIT_PENDING_TAGS);
  const [countedTags, setCountedTags] = useState(DUMMY_COUNTED_TAGS);

  // Loading states
  const [isTagsLoading, setIsTagsLoading] = useState(false);
  const [isAuditLoading, setIsAuditLoading] = useState(false);
  const [isFixLoading, setIsFixLoading] = useState(false);
  const [isCountedLoading, setIsCountedLoading] = useState(false);
  const [isNotStartedLoading, setIsNotStartedLoading] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsTagsLoading(true);
    setIsAuditLoading(true);
    setIsFixLoading(true);
    setIsCountedLoading(true);
    setIsNotStartedLoading(true);
    
    setTimeout(() => {
      // Simulate data refresh with same dummy data
      setNotStartedTags(DUMMY_NOT_STARTED_TAGS);
      setOpenTags(DUMMY_OPEN_TAGS);
      setFixRequiredTags(DUMMY_FIX_TAGS);
      setAuditPendingTags(DUMMY_AUDIT_PENDING_TAGS);
      setCountedTags(DUMMY_COUNTED_TAGS);
      
      setIsRefreshing(false);
      setIsTagsLoading(false);
      setIsAuditLoading(false);
      setIsFixLoading(false);
      setIsCountedLoading(false);
      setIsNotStartedLoading(false);
      toast("Refreshing data...", { type: "info" });
      setTimeout(() => {
        toast("Data refreshed successfully", { type: "success" });
      }, 500);
    }, 1000);
  };

  const handleCloseEvent = () => {
    const nextStatus = eventStatus === "Completed" ? "Live" : "Completed";
    
    setIsClosing(true);
    setTimeout(() => {
      setEventStatus(nextStatus);
      setIsClosing(false);
      toast(`Event updated to ${nextStatus} successfully`, { type: "success" });
    }, 1000);
  };

  const canCloseProject =
    !isTagsLoading &&
    !isAuditLoading &&
    !isFixLoading &&
    !isCountedLoading &&
    !isNotStartedLoading &&
    openTags.length === 0 &&
    fixRequiredTags.length === 0 &&
    auditPendingTags.length === 0 &&
    countedTags.length === 0 &&
    notStartedTags.length === 0;

  const handleTagClick = (tagId) => {
    toast(`Opening tag ${tagId} to resolve...`, { type: "info" });
  };

  const activeTabStyle = {
    red: {
      button: "border-red-500 ring-4 ring-red-50 bg-red-100",
      icon: "bg-red-200 text-red-600",
      count: "text-red-600"
    },
    blue: {
      button: "border-blue-500 ring-4 ring-blue-50 bg-blue-100",
      icon: "bg-blue-200 text-blue-600",
      count: "text-blue-600"
    },
    green: {
      button: "border-green-500 ring-4 ring-green-50 bg-green-100",
      icon: "bg-green-200 text-green-600",
      count: "text-green-600"
    },
    gray: {
      button: "border-gray-500 ring-4 ring-gray-100 bg-gray-200",
      icon: "bg-gray-300 text-gray-700",
      count: "text-gray-700"
    }
  };

  const tabs = [
    {
      id: "not-started",
      label: "Not Started",
      count: notStartedTags.length,
      icon: AlertCircle,
      color: "gray",
      loading: isNotStartedLoading,
    },
    {
      id: "open",
      label: "Open Tags",
      count: openTags.length,
      icon: AlertCircle,
      color: "blue",
      loading: isTagsLoading,
    },
    {
      id: "fix",
      label: "Fix Required",
      count: fixRequiredTags.length,
      icon: Tag,
      color: "red",
      loading: isFixLoading,
    },
    {
      id: "audit",
      label: isNoAudit ? "Pending Completion" : "Audit Pending",
      count: isNoAudit ? countedTags.length : auditPendingTags.length,
      icon: Barcode,
      color: "green",
      loading: isNoAudit ? isCountedLoading : isAuditLoading,
    },
  ];

  const renderTable = () => {
    const isLoading = isTagsLoading || isAuditLoading || isFixLoading;

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
          <Loader2 className="w-10 h-10 text-slate-400 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Fetching pending items...</p>
        </div>
      );
    }

    switch (activeTab) {
      case "not-started":
        return (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-[24px] font-bold text-slate-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-gray-500" /> Not Started Tags List
              </h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200 hover:bg-gray-300">
                  <TableHead className="font-bold text-slate-700">Tag ID</TableHead>
                  <TableHead className="font-bold text-slate-700">Zone</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notStartedTags.length > 0 ? (
                  notStartedTags.map((tag) => (
                    <TableRow key={tag.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="font-bold text-slate-900">
                        {tag.barcode || tag.id}
                      </TableCell>
                      <TableCell className="text-slate-700 font-medium">
                        {tag.zone?.name || tag.zoneName || "N/A"}
                      </TableCell>
                      <TableCell className="text-slate-500 text-center">
                        {getStatusBadge(tag.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => router.push(`/accucount/count/tags?zone=${tag.zoneId || tag.zone?.id}`)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-500"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-slate-400 italic">
                      No tags in 'Not Started' state.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        );
      case "open":
        return (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-[24px] font-bold text-slate-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" /> Open Tags List
              </h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200 hover:bg-gray-300">
                  <TableHead className="font-bold text-slate-700">Tag ID</TableHead>
                  <TableHead className="font-bold text-slate-700">Counter</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openTags.length > 0 ? (
                  openTags.map((tag) => (
                    <TableRow key={tag.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="font-bold text-slate-900">
                        {tag.barcode || tag.id}
                      </TableCell>
                      <TableCell className="text-slate-700 font-medium">
                        {tag.ScannedTag?.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {tag.ScannedTag.map((scan, idx) => (
                              <span key={scan.id}>
                                {scan.eventUserRole?.user?.name}
                                {idx < tag.ScannedTag.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">No Counter Info</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-500 text-center">
                        {getStatusBadge(tag.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => router.push(`/accucount/count/skus?id=${tag.ScannedTag?.[0]?.id || tag.id}`)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-red-500"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-slate-400 italic">
                      No open tags pending.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        );
      case "fix":
        return (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-[24px] font-bold text-slate-800 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-500" /> Tags Requiring Fix
              </h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200 hover:bg-gray-300">
                  <TableHead className="font-bold text-slate-700">Tag ID</TableHead>
                  <TableHead className="font-bold text-slate-700">Counter</TableHead>
                  <TableHead className="font-bold  text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fixRequiredTags.length > 0 ? (
                  fixRequiredTags.map((tag) => (
                    <TableRow key={tag.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="font-bold text-slate-900">
                        {tag.barcode || tag.id}
                      </TableCell>
                      <TableCell className="text-slate-700 font-medium">
                        {tag.ScannedTag?.[0]?.eventUserRole?.user?.name || (
                          <span className="text-slate-400 italic">No User Info</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(tag.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => router.push(`/accucount/audit-fix?id=${tag.ScannedTag?.[0]?.id || tag.id}`)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-500"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-slate-400 italic">
                      No fixes required.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        );
      case "audit":
        return (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-[24px] font-bold text-slate-800 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-500" /> {isNoAudit ? "Completion Pending" : "Audits Pending"}
              </h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200 hover:bg-gray-300">
                  <TableHead className="font-bold text-slate-700">Tag ID</TableHead>
                  <TableHead className="font-bold text-slate-700">{isNoAudit ? "Counter" : "Auditor"}</TableHead>
                  <TableHead className="font-bold  text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(isNoAudit ? countedTags : auditPendingTags).length > 0 ? (
                  (isNoAudit ? countedTags : auditPendingTags).map((tag) => (
                    <TableRow key={tag.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="font-bold text-slate-900">
                        {tag.barcode || tag.id}
                      </TableCell>
                      <TableCell className="text-slate-700 font-medium">
                        {isNoAudit
                          ? (tag.ScannedTag?.[0]?.eventUserRole?.user?.name || <span className="text-slate-400 italic">No User Info</span>)
                          : (tag.eventUserRole?.user?.name || <span className="text-slate-400 italic">No Auditor</span>)
                        }
                      </TableCell>
                      <TableCell className='text-center'>
                        {getStatusBadge(tag.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => router.push(isNoAudit ? `/accucount/count/skus?id=${tag.ScannedTag?.[0]?.id}` : `/accucount/validation`)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-500"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-slate-400 italic">
                      No {isNoAudit ? "completion items" : "audits"} pending.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        );
      case "counted":
        return (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-[24px] font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" /> Counted Tags (Ready for Audit)
              </h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200 hover:bg-gray-300">
                  <TableHead className="text-md font-bold text-gray-700">Tag ID</TableHead>
                  <TableHead className="text-md font-bold text-gray-700">Counter</TableHead>
                  <TableHead className="text-md  font-bold text-gray-700">Status</TableHead>
                  <TableHead className="text-right text-md font-bold text-gray-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {countedTags.length > 0 ? (
                  countedTags.map((tag) => (
                    <TableRow key={tag.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="font-bold text-slate-900">
                        {tag.barcode || tag.id}
                      </TableCell>
                      <TableCell className="text-slate-700 font-medium">
                        {tag.ScannedTag?.[0]?.eventUserRole?.user?.name || (
                          <span className="text-slate-400 italic">No User Info</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(tag.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => router.push(`/accucount/count/skus?id=${tag.id}`)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-green-500"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-slate-400 italic">
                      No counted tags pending.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-6 border-none rounded-2xl">
      <div className="max-w-8xl mx-auto space-y-4">
        {/* Header - EXACT font sizes from original */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold theme-text-primary">
                Event Close-Out Gate
              </h1>
            </div>
            <p className="text-lg text-slate-500">
              All parameters must be{" "}
              <span className="font-bold text-green-600 underline underline-offset-4">ZERO</span> to proceed
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-5 h-5 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Tab Cards - EXACT style from image */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-5 rounded-2xl border-2 transition-all duration-200 text-left shadow-sm hover:shadow-md ${isActive
                  ? activeTabStyle[tab.color].button
                  : "border-slate-100 hover:border-slate-300 bg-white"
                  }`}
              >
                <div className={`p-2 rounded-xl mr-5 ${isActive ? activeTabStyle[tab.color].icon : "bg-slate-50 text-slate-400"}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-grow">
                  <p className={`font-semibold ${isActive ? "text-slate-900" : "text-slate-700"}`}>
                    {tab.label}
                  </p>
                </div>
                <div className={`text-2xl font-bold ml-4 ${isActive ? activeTabStyle[tab.color].count : "text-slate-700"}`}>
                  {tab.loading ? "..." : tab.count}
                </div>
              </button>
            );
          })}
        </div>

        {/* Filter Bar - Matches Image */}
        <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tags, barcodes, or products"
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all w-[240px]"
              />
            </div>
          </div>
        </div>

        {/* Selected Tab Content */}
        <div className="pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTable()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Final Sign-off Section */}
        <AnimatePresence>
          {canCloseProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border-2 border-green-500/20 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-green-900/5 mt-12"
            >
              <div className="flex items-center gap-6">
                <div className="bg-green-500 p-4 rounded-3xl shadow-lg shadow-green-500/30">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-green-900">All Parameters Verified</p>
                </div>
              </div>

              <button
                onClick={handleCloseEvent}
                disabled={isClosing}
                className="px-12 py-5 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl shadow-green-600/20 active:scale-95 flex items-center gap-3 disabled:bg-green-400 disabled:cursor-not-allowed"
              >
                {isClosing && <Loader2 className="w-6 h-6 animate-spin" />}
                {eventStatus === "Completed" ? "RE-OPEN EVENT" : "CLOSE EVENT"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Locked State Bottom Bar */}
        {!canCloseProject && (
          <div className="text-center pt-12 pb-24 border-t border-slate-200 mt-12">
            <p className="text-lg text-slate-500 mb-6 font-medium">
              Resolve all pending items shown above to unlock the Close-Out Gate.
            </p>
            <button
              disabled
              className="px-16 py-6 bg-slate-200 text-slate-400 text-xl font-bold rounded-2xl cursor-not-allowed border-2 border-slate-100"
            >
              CLOSE-OUT LOCKED
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CloseOutDashboard;