// components/EventReportsDialog.jsx
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Minimize2,
  Maximize2,
  EyeClosedIcon,
  FileText,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileSpreadsheet,
  Users,
  Package,
  Tag,
  FileBarChart,
  ClipboardCheck,
  TrendingUp,
  ListChecks,
  X,
  Check,
  Trash2,
  AlertCircle,
  Settings,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function EventReportsDialog({
  open,
  onOpenChange,
  eventId,
  eventData,
  onSave,
}) {

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReports, setIsLoadingReports] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);
  const [error, setError] = useState("");

  // All available reports
  const allReports = [
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
  ];

  // Dummy master reports data
  const dummyMasterReportsData = {
    reports: [
      { reportKey: "interim-tag", title: "Interim TAG Report" },
      { reportKey: "audit", title: "Audit Report" },
      { reportKey: "stock-status", title: "Stock Take Status Report" }
    ]
  };

  // Fetch already assigned reports (simulated)
  useEffect(() => {
    if (open) {
      setIsLoadingReports(true);
      // Simulate API call
      setTimeout(() => {
        if (dummyMasterReportsData?.reports && Array.isArray(dummyMasterReportsData.reports) && dummyMasterReportsData.reports.length > 0) {
          // Auto-select reports from dummy data
          const reportKeys = dummyMasterReportsData.reports.map(r => r.reportKey);
          setSelectedReports(reportKeys);
        } else {
          setSelectedReports([]);
        }
        setIsLoadingReports(false);
      }, 500);
    } else {
      // Reset form when closing
      setSelectedReports([]);
      setError("");
    }
  }, [open]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleReportToggle = (reportId) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAllReports = () => {
    if (selectedReports.length === allReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(allReports.map(report => report.id));
    }
  };

  const handleSubmit = async () => {
    if (selectedReports.length === 0) {
      setError("Please select at least one report");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Saving report configuration...");

    try {
      const reportsToSend = selectedReports.map(id => ({
        reportKey: id,
        title: allReports.find(r => r.id === id)?.name || id
      }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (onSave) {
        await onSave({ reports: reportsToSend });
      }

      toast.success("Event Reports Configured Successfully", { id: toastId });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving reports:", error);
      toast.error("Failed to save configuration", { id: toastId });
      setError("Failed to save configuration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearAll = () => {
    setSelectedReports([]);
    setError("");
    toast.success("Selection cleared");
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${isFullscreen
            ? "w-full h-full max-w-none max-h-none rounded-none"
            : "!w-[95vw] !max-w-[95vw] max-h-[90vh] mx-auto my-0"
          }
          overflow-hidden flex flex-col p-0
        `}
      >
        {/* Dialog Header */}
        <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg border-2 border-blue-200 flex items-center justify-center">
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  Configure Event Reports
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <span className="text-xs bg-gray-100 text-gray-800 bg-purple-200 px-2 py-1 rounded-lg mt-1">
                    Event ID: {eventData?.uniqueId || "EVT-2024-001"}
                  </span>
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
                onClick={handleCancel}
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

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {/* Master Reports Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Reports</h3>
                <div className="flex items-center gap-3">
                  {isLoadingReports && (
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <div className="h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      Fetching...
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    {selectedReports.length} of {allReports.length} selected
                  </div>
                </div>
              </div>

              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold text-gray-700">
                        Select applicable reports for this event
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAllReports}
                        className="text-xs"
                      >
                        {selectedReports.length === allReports.length ? "Deselect All" : "Select All"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {allReports.map((report) => {
                        const Icon = report.icon;
                        const isSelected = selectedReports.includes(report.id);
                        return (
                          <div
                            key={report.id}
                            className={`
                              flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200
                              ${isSelected
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                              }
                            `}
                            onClick={() => handleReportToggle(report.id)}
                          >
                            <Checkbox
                              id={report.id}
                              checked={isSelected}
                              onCheckedChange={() => handleReportToggle(report.id)}
                              className="mt-0.5"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`
                                  h-8 w-8 rounded-lg flex items-center justify-center
                                  ${isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}
                                `}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <Label
                                  htmlFor={report.id}
                                  className="font-medium text-gray-900 cursor-pointer"
                                >
                                  {report.name}
                                </Label>
                              </div>
                              <p className="text-xs text-gray-500 ml-10">
                                {report.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview Card */}
            <Card className="border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-4">
                <h4 className="font-medium text-sm text-gray-700 mb-3">
                  Configuration Preview
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">
                          {selectedReports.length} Report{selectedReports.length !== 1 ? 's' : ''} Selected
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          For event: {eventData?.title || "Q1 Inventory Audit"}
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    {selectedReports.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-600 mb-2">Selected reports:</div>
                        <div className="space-y-1">
                          {selectedReports.slice(0, 3).map((reportId, index) => {
                            const report = allReports.find(r => r.id === reportId);
                            return (
                              <div key={index} className="text-sm text-gray-700 flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                {report?.name}
                              </div>
                            );
                          })}
                          {selectedReports.length > 3 && (
                            <div className="text-xs text-gray-500">
                              + {selectedReports.length - 3} more report{selectedReports.length - 3 !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedReports.length}
                      </div>
                      <div className="text-sm text-gray-600">Reports Selected</div>
                    </div>
                    <FileText className="h-8 w-8 text-blue-100" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {allReports.length}
                      </div>
                      <div className="text-sm text-gray-600">Total Reports</div>
                    </div>
                    <FileSpreadsheet className="h-8 w-8 text-green-100" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round((selectedReports.length / allReports.length) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600">Coverage</div>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-100" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                Configuring reports for: {eventData?.title || "Q1 Inventory Audit"}
              </span>
              <span className="mx-2">•</span>
              {selectedReports.length > 0 ? (
                <span className="text-green-600">
                  {selectedReports.length} report{selectedReports.length !== 1 ? 's' : ''} ready
                </span>
              ) : (
                <span className="text-red-600">Select reports to configure</span>
              )}
              <span className="mx-2">•</span>
              <span className="text-gray-500">Event ID: {eventData?.uniqueId || eventId || "EVT-2024-001"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={handleClearAll}
                disabled={isSubmitting}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
              <Button
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white gap-2"
                onClick={handleSubmit}
                disabled={isSubmitting || selectedReports.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Save Configuration
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}