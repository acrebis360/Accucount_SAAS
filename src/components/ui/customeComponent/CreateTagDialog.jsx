// components/TagManagementDialog.jsx
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Minimize2,
  Maximize2,
  EyeClosedIcon,
  Hash,
  Upload,
  Download,
  Plus,
  Trash2,
  X,
  Check,
  Tags,
  RefreshCw
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function CreateTagDialog({
  open,
  onOpenChange,
  eventId,
  uniqueId,
  eventData,
  onSave,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClearingTags, setIsClearingTags] = useState(false);
  const [isLoadingZones, setIsLoadingZones] = useState(false);
  
  // Form states
  const [tagOption, setTagOption] = useState("range");
  const [selectedZone, setSelectedZone] = useState("");
  const [ranges, setRanges] = useState([{ start: "", end: "", udc: "" }]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsedTags, setParsedTags] = useState([]);
  const [stagedConfigs, setStagedConfigs] = useState([]);

  // Dummy zones data
  const dummyZonesData = {
    data: [
      { id: "1", name: "Zone A", description: "Main entrance and lobby area" },
      { id: "2", name: "Zone B", description: "Electronics department" },
      { id: "3", name: "Zone C", description: "Apparel section" },
      { id: "4", name: "Zone D", description: "Grocery section" },
      { id: "5", name: "Zone E", description: "Warehouse storage" }
    ]
  };

  const zones = dummyZonesData?.data || [];
  const dbTagsCount = eventData?._count?.tags || 0;

  // Simulate loading zones data
  useEffect(() => {
    if (open && !isLoadingZones) {
      setIsLoadingZones(true);
      // Simulate API call delay
      setTimeout(() => {
        setIsLoadingZones(false);
      }, 500);
    }
  }, [open]);

  const clearTags = async (zoneId) => {
    const toastId = toast.loading("Clearing tags...");
    setIsClearingTags(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Tags cleared successfully", { id: toastId });
      
      // Update staged configs to remove any tags from this zone
      setStagedConfigs(prev => prev.filter(config => config.zoneId !== zoneId));
      
      // Optionally refresh event data through callback
      if (onSave) {
        onSave({ cleared: true, zoneId });
      }
    } catch (error) {
      console.error("Clear tags error:", error);
      toast.error("Failed to clear tags", { id: toastId });
    } finally {
      setIsClearingTags(false);
    }
  };

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      // Reset to defaults
      setTagOption("range");
      setSelectedZone("");
      setRanges([{ start: "", end: "", udc: "" }]);
      setUploadedFile(null);
      setParsedTags([]);
      setStagedConfigs([]);
    }
  }, [open]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRangeChange = (index, field, value) => {
    const newRanges = [...ranges];
    newRanges[index][field] = value;
    setRanges(newRanges);
  };

  const handleAddRange = () => {
    const lastUDC = ranges.length > 0 ? ranges[ranges.length - 1].udc : "";
    setRanges([...ranges, { start: "", end: "", udc: lastUDC }]);
  };

  const handleRemoveRange = (index) => {
    if (ranges.length > 1) {
      const newRanges = ranges.filter((_, i) => i !== index);
      setRanges(newRanges);
    }
  };

  const addTagRow = () => {
    const lastUDC = parsedTags.length > 0 ? parsedTags[parsedTags.length - 1].udc : "";
    setParsedTags([
      ...parsedTags,
      { id: Date.now().toString() + Math.random().toString(36).substr(2, 9), tagName: "", udc: lastUDC },
    ]);
  };

  const removeTagRow = (id) => {
    setParsedTags(parsedTags.filter((tag) => tag.id !== id));
  };

  const updateTagRow = (id, field, value) => {
    setParsedTags(
      parsedTags.map((tag) => (tag.id === id ? { ...tag, [field]: value } : tag))
    );
  };

  const generateRangeTags = (ranges) => {
    const allTags = [];
    ranges.forEach((range) => {
      const startStr = (range.start || "").trim();
      const endStr = (range.end || "").trim();

      if (!startStr || !endStr) return;

      const startMatch = startStr.match(/^(.*?)([0-9]+)$/);
      const endMatch = endStr.match(/^(.*?)([0-9]+)$/);

      if (startMatch && endMatch && startMatch[1] === endMatch[1]) {
        const prefix = startMatch[1];
        const startNum = parseInt(startMatch[2], 10);
        const endNum = parseInt(endMatch[2], 10);
        const paddingWidth = startMatch[2].length;

        for (let i = startNum; i <= endNum; i++) {
          const barcode = prefix + String(i).padStart(paddingWidth, "0");
          allTags.push({
            barcode,
            zoneId: selectedZone,
            udc: range.udc || "",
          });
        }
      } else if (startStr === endStr) {
        allTags.push({
          barcode: startStr,
          zoneId: selectedZone,
          udc: range.udc || "",
        });
      }
    });
    return allTags;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [".csv"];
      const fileExtension = file.name.substring(file.name.lastIndexOf("."));

      if (!validTypes.includes(fileExtension.toLowerCase())) {
        toast.error("Please upload a CSV file");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }

      setUploadedFile(file);

      // Parse file content
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          const lines = content.split(/\r?\n/).filter(l => l.trim());
          const tags = [];

          if (lines.length > 0) {
            const headerRow = lines[0].toLowerCase().split(",");
            let tagIndex = 0;
            let udcIndex = -1;

            headerRow.forEach((col, idx) => {
              const val = col.trim();
              if (val.includes("tag") && val.includes("id")) tagIndex = idx;
              else if (val.includes("barcode")) tagIndex = idx;
              else if (val.includes("udc")) udcIndex = idx;
            });

            const hasHeader = lines[0].toLowerCase().includes("tag") || lines[0].toLowerCase().includes("id") || lines[0].toLowerCase().includes("udc");
            const startIndex = hasHeader ? 1 : 0;

            for (let i = startIndex; i < lines.length; i++) {
              const parts = lines[i].split(",");
              if (parts[tagIndex]) {
                tags.push({
                  id: Date.now().toString() + Math.random().toString(36).substr(2, 9) + i,
                  tagName: parts[tagIndex].trim(),
                  udc: udcIndex !== -1 ? (parts[udcIndex]?.trim() || "") : ""
                });
              }
            }
          }

          if (tags.length > 0) {
            setParsedTags(tags);
            toast.success(`Found ${tags.length} tags in the file`);
          } else {
            toast.error("No valid tags found in the CSV file");
          }
        } catch (err) {
          console.error("CSV parsing error:", err);
          toast.error("Error parsing CSV file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const downloadTemplate = () => {
    // Create a simple CSV template
    const templateContent = "Tag ID,Tag UDC\nT001,SALES AREA\nT002,STORE ROOM\nT003,OFFICE";
    const blob = new Blob([templateContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tag_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Template downloaded");
  };

  const handleStage = () => {
    if (!selectedZone) {
      toast.error("Please select a zone first");
      return;
    }

    let tagsToStage = [];
    if (tagOption === "range") {
      const hasEmptyRanges = ranges.some(range => !(range.start || "").trim() || !(range.end || "").trim() || !(range.udc || "").trim());
      if (hasEmptyRanges) {
        toast.error("Please fill all range fields before adding to collection");
        return;
      }
      tagsToStage = generateRangeTags(ranges);
    } else {
      if (parsedTags.length === 0) {
        toast.error("No tags found to add");
        return;
      }
      tagsToStage = parsedTags.map((tag) => ({
        barcode: tag.tagName,
        zoneId: selectedZone,
        udc: tag.udc || ""
      }));
    }

    if (tagsToStage.length === 0) {
      toast.error("No tags to add");
      return;
    }

    const zoneName = zones.find(z => String(z.id) === selectedZone)?.name || "Selected Zone";

    setStagedConfigs([
      ...stagedConfigs,
      {
        id: Date.now().toString(),
        zoneId: selectedZone,
        zoneName,
        method: tagOption === "range" ? "Range" : "File/Manual",
        count: tagsToStage.length,
        tags: tagsToStage
      }
    ]);

    // Reset current form for next zone selection
    setSelectedZone("");
    setRanges([{ start: "", end: "", udc: "" }]);
    setParsedTags([]);
    setUploadedFile(null);
    toast.success(`Added ${tagsToStage.length} tags for ${zoneName} to collection`);
  };

  const handleRemoveStaged = (id) => {
    setStagedConfigs(stagedConfigs.filter(config => config.id !== id));
    toast.success("Removed from collection");
  };

  const handleSubmit = async () => {
    if (stagedConfigs.length === 0) {
      toast.error("Your local list is empty. Please add at least one configuration using the 'Add tags to Local List' button.");
      return;
    }

    setIsSubmitting(true);
    try {
      let finalTagsToUpload = [];

      // Add all staged tags from the local list
      stagedConfigs.forEach(config => {
        finalTagsToUpload = [...finalTagsToUpload, ...config.tags];
      });

      const payload = {
        tags: finalTagsToUpload,
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (onSave) {
        await onSave(payload);
      }

      // Successful commit: Reset everything
      setTagOption("range");
      setRanges([{ start: "", end: "", udc: "" }]);
      setUploadedFile(null);
      setParsedTags([]);
      setStagedConfigs([]);
      onOpenChange(false);

      toast.success(`Commit Successful: Created ${finalTagsToUpload.length} tags across ${stagedConfigs.length} zones.`);
    } catch (error) {
      console.error("Error saving tag configuration:", error);
      toast.error("Database commit failed. Please verify your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleClearAll = async () => {
    if (dbTagsCount > 0 && selectedZone) {
      if (window.confirm("Would you also like to clear all existing tags from the database for the selected zone? This action cannot be undone.")) {
        await clearTags(selectedZone);
      }
    } else if (dbTagsCount > 0 && !selectedZone) {
      toast.error("Please select a zone first if you wish to clear existing tags from the database.");
    } else {
      // Clear local form only
      setTagOption("range");
      setSelectedZone("");
      setRanges([{ start: "", end: "", udc: "" }]);
      setUploadedFile(null);
      setParsedTags([]);
      toast.success("Form cleared");
    }
  };

  const calculateTotalTags = () => {
    if (tagOption === "range") {
      let total = 0;
      ranges.forEach(range => {
        const start = (range.start || "").trim();
        const end = (range.end || "").trim();
        if (!start || !end) return;

        const startMatch = start.match(/^(.*?)([0-9]+)$/);
        const endMatch = end.match(/^(.*?)([0-9]+)$/);

        if (startMatch && endMatch && startMatch[1] === endMatch[1]) {
          const startNum = parseInt(startMatch[2], 10);
          const endNum = parseInt(endMatch[2], 10);
          if (startNum <= endNum) {
            total += (endNum - startNum + 1);
          }
        } else if (start === end) {
          total += 1;
        }
      });
      return total;
    } else if (tagOption === "file") {
      return (parsedTags || []).length;
    }
    return 0;
  };

  const totalTags = calculateTotalTags();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${isFullscreen
            ? "w-full h-full max-w-none max-h-none rounded-none"
            : "!w-[95vw] !max-w-[95vw] h-[95vh] !max-h-[95vh] mx-auto my-0"
          }
          overflow-hidden flex flex-col p-0
        `}
      >
        {/* Dialog Header */}
        <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg border-2 border-emerald-200 flex items-center justify-center">
                <Tags className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold mb-1">
                  Configure Tags
                </DialogTitle>
                <DialogDescription className="flex items-center ">
                  <span className="text-xs bg-gray-100 text-gray-800 bg-purple-200 px-2 py-1 rounded-lg mt-1">
                    Event ID: {eventData?.uniqueId || uniqueId || "EVT-2024-001"}
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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Tag Configuration
              </h3>
              <div className="text-sm text-gray-500">
                Required fields are marked with *
              </div>
            </div>
            
            {/* Tag Option Selection */}
            <Card className="border-blue-100">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Tag Configuration Method
                  </h3>

                  <RadioGroup
                    value={tagOption}
                    onValueChange={setTagOption}
                    className="space-y-4"
                  >
                    {/* Tag Range Radio Option */}
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="range" id="range" />
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Hash className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <Label htmlFor="range" className="font-medium text-gray-900 cursor-pointer">
                            Tag Range
                          </Label>
                          <p className="text-sm text-gray-500">
                            Enter start and end tag numbers
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Upload File Radio Option */}
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="file" id="file" />
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Upload className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <Label htmlFor="file" className="font-medium text-gray-900 cursor-pointer">
                            Upload File
                          </Label>
                          <p className="text-sm text-gray-500">
                            Upload CSV or Excel file with tag numbers
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Global Zone Selection */}
            <div className="space-y-2">
              <div className="flex items-end justify-between gap-4">
                <div className="flex-1 w-full">
                  <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">1</span>
                    Select Zone <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={selectedZone}
                    onValueChange={(value) => {
                      const singleValue = Array.isArray(value) ? value[0] : value;
                      setSelectedZone(String(singleValue || ""));
                    }}
                  >
                    <SelectTrigger className="w-full bg-white border-blue-100 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select a zone for these tags" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5}>
                      {zones.length > 0 ? (
                        zones.map((zone) => (
                          <SelectItem key={zone.id} value={String(zone.id)}>
                            {zone.name} - {zone.description}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>No zones available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  onClick={handleStage}
                  disabled={!selectedZone || totalTags === 0}
                  className="bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 gap-2 font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Add Zone to Collection
                </Button>
              </div>
              <p className="text-[10px] text-gray-500 italic">
                {stagedConfigs.some(c => c.zoneId === selectedZone)
                  ? "Note: This zone already exists in your local list. Adding more will append to it."
                  : "All tags configured below will be assigned to this zone."}
              </p>
            </div>

            {/* Dynamic Content based on selection */}
            {tagOption === "range" && (
              <div className="space-y-4">
                <label className="text-sm font-medium">
                  Tag Ranges
                </label>
                {ranges.map((range, index) => (
                  <div key={index} className="flex gap-4 items-end">
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor={`start-${index}`}
                          className="text-xs text-gray-500"
                        >
                          Starting Range
                        </label>
                        <input
                          id={`start-${index}`}
                          placeholder="e.g., T0001"
                          value={range.start}
                          onChange={(e) =>
                            handleRangeChange(index, "start", e.target.value)
                          }
                          className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor={`end-${index}`}
                          className="text-xs text-gray-500"
                        >
                          Ending Range
                        </label>
                        <input
                          id={`end-${index}`}
                          placeholder="e.g., T0050"
                          value={range.end}
                          onChange={(e) =>
                            handleRangeChange(index, "end", e.target.value)
                          }
                          className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500">UDC *</label>
                        <input
                          placeholder="UDC"
                          value={range.udc}
                          onChange={(e) =>
                            handleRangeChange(index, "udc", e.target.value)
                          }
                          className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    <div className="min-w-[40px] flex justify-center mb-1">
                      {ranges.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveRange(index)}
                          className="h-9 w-9 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddRange}
                  className="border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Range
                </Button>
              </div>
            )}

            {tagOption === "file" && (
              <div className="space-y-4">
                <label className="text-sm font-medium">
                  Upload Tag File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <div>
                      <span className="text-gray-700 font-medium">
                        Click to upload
                      </span>
                      <p className="text-gray-500 text-sm">
                        or drag and drop CSV files
                      </p>
                    </div>
                  </label>
                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
                      <p className="text-gray-700 text-sm font-medium">
                        {uploadedFile.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={downloadTemplate}
                    className="text-blue-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Template File
                  </Button>
                </div>

                {/* Manual Tag Entry / Table */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Or Add Tags Manually</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addTagRow}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Tag
                    </Button>
                  </div>

                  {parsedTags.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto max-h-[400px]">
                        <table className="w-full">
                          <thead className="bg-gray-50 sticky top-0">
                            <tr>
                              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b w-12">
                                #
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                                Tag ID *
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                                Tag UDC *
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {parsedTags.slice(0, 100).map((tag, index) => (
                              <tr key={tag.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  {index + 1}
                                </td>
                                <td className="py-3 px-4">
                                  <Input
                                    type="text"
                                    value={tag.tagName}
                                    onChange={(e) => updateTagRow(tag.id, "tagName", e.target.value)}
                                    placeholder="Enter Tag ID"
                                    className="w-full"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <Input
                                    type="text"
                                    value={tag.udc}
                                    onChange={(e) => updateTagRow(tag.id, "udc", e.target.value)}
                                    placeholder="Enter Tag UDC"
                                    className="w-full"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeTagRow(tag.id)}
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
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
                      {parsedTags.length > 100 && (
                        <div className="bg-gray-50 px-4 py-3 text-center border-t">
                          <p className="text-sm text-gray-600 font-medium">
                            Showing first 100 tags. {parsedTags.length - 100} more tags are loaded and ready for configuration.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                      <Tags className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No tags added yet</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Add tags manually or upload a CSV file
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Staged Configurations List */}
            {stagedConfigs.length > 0 && (
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    Collection of Configurations ({stagedConfigs.length})
                  </h4>
                </div>

                <div className="border border-emerald-100 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-emerald-50">
                      <tr>
                        <th className="py-2 px-4 text-left font-semibold text-emerald-800">Zone</th>
                        <th className="py-2 px-4 text-right font-semibold text-emerald-800">Tags</th>
                        <th className="py-2 px-4 text-center font-semibold text-emerald-800">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-50 bg-white">
                      {stagedConfigs.map((config) => (
                        <tr key={config.id} className="hover:bg-emerald-50/30 transition-colors">
                          <td className="py-2.5 px-4 font-medium text-gray-900">{config.zoneName}</td>
                          <td className="py-2.5 px-4 text-right font-bold text-emerald-700">{config.count}</td>
                          <td className="py-2.5 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveStaged(config.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-emerald-50/50 font-bold">
                        <td colSpan="2" className="py-2.5 px-4 text-emerald-800">Total Prepared</td>
                        <td className="py-2.5 px-4 text-right text-emerald-900">
                          {stagedConfigs.reduce((acc, curr) => acc + curr.count, 0)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Preview Card */}
            <div className="border border-gray-200 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
              <h4 className="font-medium text-sm text-gray-700 mb-3">
                Configuration Preview
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Collection Status</div>
                    <div className="text-sm font-medium text-gray-900">
                      {stagedConfigs.length} Zones Prepared
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Current Active</div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedZone ? `1 Zone Selection` : "None"}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-indigo-200">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Prepared Tags</div>
                    <div className="text-sm font-bold text-indigo-700">
                      {stagedConfigs.reduce((acc, curr) => acc + curr.count, 0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Total to Commit</div>
                    <div className="text-sm font-bold text-indigo-900">
                      {stagedConfigs.reduce((acc, curr) => acc + curr.count, 0) + (selectedZone ? totalTags : 0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Configuration Summary */}
              {eventData?.zones && eventData.zones.length > 0 && (
                <div className="mt-4 pt-3 border-t border-emerald-200/50">
                  <h5 className="text-[10px] uppercase tracking-wider font-bold text-emerald-800/60 mb-2 flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" />
                    Last Configuration Summary
                  </h5>
                  <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                    {eventData.zones.map((zone) => (
                      <div key={zone.id} className="flex justify-between items-center bg-white/60 backdrop-blur-sm p-2 rounded-md border border-emerald-100 shadow-sm transition-all hover:bg-white/80">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-gray-800">{zone.description}</span>
                        </div>
                        {zone.tagRange ? (
                          <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                            {zone.tagRange}
                          </div>
                        ) : (
                          <span className="text-[10px] text-gray-400 italic">No Range</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                Configuring tags for {eventData?.title || "Event"}
              </span>
              <span className="mx-2">•</span>
              {totalTags > 0 ? (
                <span className="text-green-600">Ready to configure</span>
              ) : (
                <span className="text-red-600">Enter tag ranges or upload file</span>
              )}
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
                disabled={isSubmitting || isClearingTags}
                className="gap-2"
              >
                {isClearingTags ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Clear All
              </Button>
              <Button
                className="bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white gap-2"
                onClick={handleSubmit}
                disabled={isSubmitting || stagedConfigs.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Configuring...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Configure Tags
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