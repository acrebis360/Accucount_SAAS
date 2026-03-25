// components/CreateZoneDialog.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Minimize2,
  Maximize2,
  EyeClosedIcon,
  MapPin,
  Hash,
  FileText,
  Building,
  X,
  Check,
  Trash2,
  Upload,
  FileSpreadsheet,
  Download,
  Plus,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function CreateZoneDialog({
  open,
  onOpenChange,
  eventId,
  uniqueId,
  eventData,
  onSave,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClearingZones, setIsClearingZones] = useState(false);
  const [uploadMode, setUploadMode] = useState("multi"); // "single", "multi", or "file"
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [multiZones, setMultiZones] = useState([{ id: Date.now(), name: "", description: "" }]);
  const [bulkZones, setBulkZones] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const totalZones = eventData?._count?.zones || 5; // Dummy value

  // Simulate clear zones
  const clearZones = async () => {
    const toastId = toast.loading("Clearing zones...");
    setIsClearingZones(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Zones cleared successfully", { id: toastId });
      
      // Optionally refresh event data through callback
      if (onSave) {
        onSave({ cleared: true });
      }
    } catch (error) {
      console.error("Clear zones error:", error);
      toast.error("Failed to clear zones", { id: toastId });
    } finally {
      setIsClearingZones(false);
    }
  };

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      // Generate a default zone name
      const zoneNumber = totalZones + 1;
      setFormData({
        name: `Zone ${zoneNumber}`,
        description: "",
      });
      setMultiZones([{ id: Date.now(), name: `Zone ${zoneNumber}`, description: "" }]);
      setError("");
    } else {
      // Reset form when closing
      setFormData({
        name: "",
        description: "",
      });
      setMultiZones([]);
      setError("");
      setUploadMode("multi");
    }
  }, [open, totalZones]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (uploadMode === "single") {
      if (!formData.name.trim() || !formData.description.trim()) {
        setError("Please enter zone name and description");
        return;
      }

      setIsSubmitting(true);
      try {
        const zoneData = {
          ...formData,
          eventId: Number(eventId),
          createdAt: new Date().toISOString(),
          status: "active",
          totalItems: 0,
          completedItems: 0,
        };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        if (onSave) {
          await onSave(zoneData);
        }

        toast.success(`Zone "${formData.name}" created successfully`);
        setFormData({ name: "", description: "" });
        onOpenChange(false);
      } catch (error) {
        console.error("Error saving zone:", error);
        setError("Failed to save zone. Please try again.");
        toast.error("Failed to create zone");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Multi/Bulk upload mode
      const zonesToProcess = uploadMode === "file" ? bulkZones : multiZones;

      if (zonesToProcess.length === 0) {
        setError(uploadMode === "file" ? "Please upload a CSV file" : "Please add at least one zone");
        return;
      }

      const hasEmptyFields = zonesToProcess.some(zone => !zone.name.trim());
      if (hasEmptyFields) {
        setError("All zones must have a name");
        return;
      }

      setIsSubmitting(true);
      try {
        const zonesData = zonesToProcess.map((zone, index) => ({
          name: zone.name,
          description: zone.description || "",
          eventId: Number(eventId),
          createdAt: new Date().toISOString(),
          status: "active",
          totalItems: 0,
          completedItems: 0,
          order: index + 1,
        }));

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        if (onSave) {
          await onSave({ zones: zonesData });
        }

        toast.success(`${zonesData.length} zone${zonesData.length !== 1 ? 's' : ''} created successfully`);
        setMultiZones([]);
        setBulkZones([]);
        onOpenChange(false);
      } catch (error) {
        console.error("Error saving zones:", error);
        setError("Failed to save zones. Please try again.");
        toast.error("Failed to create zones");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Multi-line functions
  const addMultiZoneRow = () => {
    const newZoneNumber = totalZones + multiZones.length + 1;
    setMultiZones([
      ...multiZones,
      {
        id: Date.now() + Math.random(),
        name: `Zone ${newZoneNumber}`,
        description: "",
      },
    ]);
  };

  const removeMultiZoneRow = (id) => {
    if (multiZones.length > 1) {
      setMultiZones(multiZones.filter(zone => zone.id !== id));
    }
  };

  const updateMultiZoneRow = (id, field, value) => {
    setMultiZones(multiZones.map(zone =>
      zone.id === id ? { ...zone, [field]: value } : zone
    ));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const lines = content.split('\n');
        const zones = [];

        // Skip header row if exists
        const startIndex = lines[0].toLowerCase().includes('name') ? 1 : 0;

        for (let i = startIndex; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const parts = line.split(',');
          if (parts.length >= 1) {
            zones.push({
              id: Date.now() + i,
              name: parts[0].trim(),
              description: parts[1] ? parts[1].trim() : "",
            });
          }
        }

        if (zones.length > 0) {
          setBulkZones(zones);
          setError("");
          toast.success(`Found ${zones.length} zones in the file`);
        } else {
          setError("No valid zones found in the CSV file");
        }
      } catch (err) {
        setError("Error parsing CSV file. Please check the format.");
        console.error("CSV parsing error:", err);
      }
    };

    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const template = "name,description\nZone 1,Description for zone 1\nZone 2,Description for zone 2\nZone 3,Description for zone 3";
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zones_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Template downloaded");
  };

  const handleClearAll = async () => {
    // 1. Clear local state
    if (uploadMode === "single") {
      setFormData({
        name: "",
        description: "",
      });
      toast.success("Form cleared");
    } else if (uploadMode === "file") {
      setBulkZones([]);
      toast.success("Uploaded zones cleared");
    } else {
      setMultiZones([{ id: Date.now(), name: `Zone ${totalZones + 1}`, description: "" }]);
      toast.success("Zone list reset");
    }
    setError("");

    // 2. Check if we should clear DB zones
    if (totalZones > 0) {
      if (window.confirm("Would you also like to clear all existing zones from the database for this event? This action cannot be undone.")) {
        await clearZones();
      }
    }
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
              <div className="h-10 w-10 rounded-lg border-2 border-purple-200 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  Create Zone{uploadMode !== "single" && "s"}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <span className="text-xs bg-gray-100 text-gray-800 bg-purple-200 px-2 py-1 rounded-lg mt-1">
                    Event ID: {uniqueId || eventData?.uniqueId || eventId || "EVT-2024-001"}
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

            {/* Upload Mode Selector - Simple Radio Buttons */}
            <Card className="border-blue-100">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Select Upload Mode
                  </h3>

                  <RadioGroup
                    value={uploadMode}
                    onValueChange={setUploadMode}
                    className="flex flex-wrap gap-6"
                  >

                    {/* Single Zone Radio Option */}
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="single" id="single" />
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Hash className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <Label htmlFor="single" className="font-medium text-gray-900 cursor-pointer">
                            Single Zone
                          </Label>
                          <p className="text-xs text-gray-500">
                            Create one zone
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Multi/Line Wise Radio Option */}
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="multi" id="multi" />
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Plus className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <Label htmlFor="multi" className="font-medium text-gray-900 cursor-pointer">
                            Multi Zone
                          </Label>
                          <p className="text-xs text-gray-500">
                            Add multiple zones manually
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bulk Upload Radio Option */}
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="file" id="file" />
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Upload className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <Label htmlFor="file" className="font-medium text-gray-900 cursor-pointer">
                            CSV Upload
                          </Label>
                          <p className="text-xs text-gray-500">
                            Upload zones via CSV file
                          </p>
                        </div>
                      </div>
                    </div>

                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {/* Single Zone Form */}
            {uploadMode === "single" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Zone Information</h3>
                  <div className="text-sm text-gray-500">
                    Required fields are marked with *
                  </div>
                </div>

                {/* Zone Name Input */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="zoneName" className="text-sm font-medium flex items-center gap-1">
                      Zone Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="zoneName"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter zone name (e.g., Main Aisle, Cold Storage, Rack Area)"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <div className="absolute right-3 top-3">
                        <Hash className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Description Textarea */}
                  <div className="space-y-2">
                    <label htmlFor="zoneDescription" className="text-sm font-medium flex items-center gap-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="zoneDescription"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe this zone's purpose..."
                        rows={4}
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                      <div className="absolute right-3 top-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Multi/Line Wise Form */}
            {uploadMode === "multi" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Multiple Zone Entry</h3>
                  <div className="text-sm text-gray-500">
                    {multiZones.length} zone{multiZones.length !== 1 ? 's' : ''} added
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-[400px]">
                      <table className="w-full">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b w-12">
                              #
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                              Zone Name *
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                              Description
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b w-20">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {multiZones.map((zone, index) => (
                            <tr key={zone.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {index + 1}
                              </td>
                              <td className="py-3 px-4">
                                <Input
                                  type="text"
                                  value={zone.name}
                                  onChange={(e) => updateMultiZoneRow(zone.id, "name", e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && index === multiZones.length - 1 && zone.name.trim()) {
                                      addMultiZoneRow();
                                    }
                                  }}
                                  placeholder="Enter zone name"
                                  className="w-full"
                                />
                              </td>
                              <td className="py-3 px-4">
                                <Input
                                  type="text"
                                  value={zone.description}
                                  onChange={(e) => updateMultiZoneRow(zone.id, "description", e.target.value)}
                                  placeholder="Enter description (optional)"
                                  className="w-full"
                                />
                              </td>
                              <td className="py-3 px-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeMultiZoneRow(zone.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                  disabled={multiZones.length === 1}
                                  title="Remove"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={addMultiZoneRow}
                    className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add More Zone
                  </Button>
                </div>
              </div>
            )}

            {/* CSV File Upload Form */}
            {uploadMode === "file" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">CSV Zone Upload</h3>
                  <div className="text-sm text-gray-500">
                    {bulkZones.length} zone{bulkZones.length !== 1 ? 's' : ''} found
                  </div>
                </div>

                <Card className="border-blue-100">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                        <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Upload CSV File
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Format: name,description (one zone per line)
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept=".csv"
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current.click()}
                          className="gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Choose CSV File
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={downloadTemplate}
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {bulkZones.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-[300px]">
                      <table className="w-full">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b w-12">#</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Zone Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bulkZones.map((zone, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                              <td className="py-3 px-4 text-sm font-medium">{zone.name}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">{zone.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Preview Card */}
            <Card className="border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-4">
                <h4 className="font-medium text-sm text-gray-700 mb-3">
                  Preview
                </h4>
                {uploadMode === "single" ? (
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {formData.name || "Zone Name"}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          {formData.description || "No description provided"}
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            For: {eventData?.title || "Q1 Inventory Audit"}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            Zone #{totalZones + 1}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            Event ID: {uniqueId || eventData?.uniqueId || eventId || "EVT-2024-001"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">
                          {uploadMode === "file" ? bulkZones.length : multiZones.length} Zone{((uploadMode === "file" ? bulkZones.length : multiZones.length) !== 1) ? 's' : ''} Ready
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Will be added to: {eventData?.title || "Q1 Inventory Audit"} (Event ID: {uniqueId || eventData?.uniqueId || eventId || "EVT-2024-001"})
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                        <FileSpreadsheet className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    {(uploadMode === "file" ? bulkZones : multiZones).length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-600 mb-2">Sample zones:</div>
                        <div className="space-y-1">
                          {(uploadMode === "file" ? bulkZones : multiZones).slice(0, 3).map((zone, index) => (
                            <div key={index} className="text-sm text-gray-700 flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                              {zone.name || `Zone ${index + 1}`}
                            </div>
                          ))}
                          {(uploadMode === "file" ? bulkZones : multiZones).length > 3 && (
                            <div className="text-xs text-gray-500">
                              + {(uploadMode === "file" ? bulkZones : multiZones).length - 3} more zone{((uploadMode === "file" ? bulkZones : multiZones).length - 3 !== 1) ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {uploadMode === "single"
                          ? totalZones
                          : totalZones + (uploadMode === "file" ? bulkZones.length : multiZones.length)}
                      </div>
                      <div className="text-sm text-gray-600">Total Zones</div>
                    </div>
                    <MapPin className="h-8 w-8 text-blue-100" />
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
                Creating {uploadMode === "single" ? "1" : (uploadMode === "file" ? bulkZones.length : multiZones.length)} zone{(uploadMode !== "single" && (uploadMode === "file" ? bulkZones.length : multiZones.length) !== 1) ? 's' : ''} for: {eventData?.title || "Q1 Inventory Audit"}
              </span>
              <span className="mx-2">•</span>
              {uploadMode === "single" ? (
                formData.name.trim() ? (
                  <span className="text-green-600">Ready to create</span>
                ) : (
                  <span className="text-red-600">Zone name required</span>
                )
              ) : (
                (uploadMode === "file" ? bulkZones : multiZones).length > 0 ? (
                  <span className="text-green-600">
                    {(uploadMode === "file" ? bulkZones : multiZones).length} zone{((uploadMode === "file" ? bulkZones : multiZones).length !== 1) ? 's' : ''} ready
                  </span>
                ) : (
                  <span className="text-red-600">Add zones or upload CSV</span>
                )
              )}
              <span className="mx-2">•</span>
              <span className="text-gray-500">Event ID: {uniqueId || eventData?.uniqueId || eventId || "EVT-2024-001"}</span>
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
                disabled={isSubmitting || isClearingZones}
                className="gap-2"
              >
                {isClearingZones ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Clear All
              </Button>
              <Button
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white gap-2"
                onClick={handleSubmit}
                disabled={isSubmitting ||
                  (uploadMode === "single"
                    ? !formData.name.trim()
                    : (uploadMode === "file" ? bulkZones.length === 0 : multiZones.length === 0))}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {uploadMode === "single" ? "Creating..." : "Uploading..."}
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    {uploadMode === "single" ? "Create Zone" : `Create ${(uploadMode === "file" ? bulkZones.length : multiZones.length)} Zone${(uploadMode === "file" ? bulkZones.length : multiZones.length) !== 1 ? 's' : ''}`}
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