// components/CreateItemDialog.jsx
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
  Tag,
  Hash,
  FileText,
  Barcode,
  Package,
  X,
  Check,
  Trash2,
  Upload,
  FileSpreadsheet,
  Download,
  Plus,
  AlertCircle,
  FolderOpen,
  RefreshCw
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function CreateItemDialog({
  open,
  onOpenChange,
  eventId,
  eventData,
  onSave,
  onUpload,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClearingItems, setIsClearingItems] = useState(false);
  const [uploadMode, setUploadMode] = useState("single"); // "single" or "bulk"
  const [formData, setFormData] = useState({
    category: "",
    barcode: "",
    sku: "",
    description: "",
  });
  const [bulkItems, setBulkItems] = useState([]);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef(null);

  const totalItems = eventData?._count?.items || 145;

  // Simulate clear items
  const clearItems = async () => {
    const toastId = toast.loading("Clearing items...");
    setIsClearingItems(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Items cleared successfully", { id: toastId });
      
      // Optionally refresh event data through callback
      if (onSave) {
        onSave({ cleared: true });
      }
    } catch (error) {
      console.error("Clear items error:", error);
      toast.error("Failed to clear items", { id: toastId });
    } finally {
      setIsClearingItems(false);
    }
  };

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      // Generate default values
      setFormData({
        category: "Electronics",
        barcode: "",
        sku: "",
        description: "",
      });
      setBulkItems([]);
      setError("");
      setUploadProgress({ current: 0, total: 0 });
    } else {
      // Reset form when closing
      setFormData({
        category: "",
        barcode: "",
        sku: "",
        description: "",
      });
      setBulkItems([]);
      setError("");
      setUploadMode("single");
      setUploadProgress({ current: 0, total: 0 });
    }
  }, [open]);

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
      if (!formData.category.trim() || !formData.barcode.trim() || !formData.sku.trim()) {
        setError("Please fill in all required fields");
        return;
      }

      setIsSubmitting(true);
      const toastId = toast.loading("Creating item...");
      
      try {
        const itemData = {
          ...formData,
          eventId: Number(eventId),
          createdAt: new Date().toISOString(),
          status: "active",
          quantity: 1,
          unitPrice: 0,
        };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        if (onSave) {
          await onSave(itemData);
        }

        toast.success(`Item "${formData.barcode}" created successfully`, { id: toastId });
        setFormData({ category: "", barcode: "", sku: "", description: "" });
        onOpenChange(false);
      } catch (error) {
        console.error("Error saving item:", error);
        setError("Failed to save item. Please try again.");
        toast.error("Failed to create item", { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Bulk upload mode
      if (bulkItems.length === 0) {
        setError("Please add items or upload a CSV file");
        return;
      }

      // Filter out rows that are completely empty or missing required fields
      const validBulkItems = bulkItems.filter(item =>
        item.category?.trim() && item.barcode?.trim() && item.sku?.trim()
      );

      if (validBulkItems.length === 0) {
        setError("No valid items found. All items must have category, barcode, and SKU.");
        console.log("Validation failed: No valid items found in", bulkItems);
        return;
      }

      if (validBulkItems.length < bulkItems.length) {
        console.log(`Skipping ${bulkItems.length - validBulkItems.length} invalid or empty items`);
        toast.info(`Skipping ${bulkItems.length - validBulkItems.length} invalid items`);
      }

      console.log("Validation passed. Uploading", validBulkItems.length, "items");

      setIsSubmitting(true);
      setError("");
      const toastId = toast.loading(`Uploading ${validBulkItems.length} items...`);
      
      try {
        const CHUNK_SIZE = 500;
        const totalChunks = Math.ceil(validBulkItems.length / CHUNK_SIZE);
        console.log("Calculated total chunks:", totalChunks);
        setUploadProgress({ current: 0, total: totalChunks });

        for (let i = 0; i < totalChunks; i++) {
          console.log(`Processing chunk index i=${i}`);
          const chunk = validBulkItems.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
          console.log(`Chunk ${i + 1} size: ${chunk.length}`);
          const itemsData = chunk.map((item, index) => ({
            category: item.category,
            barcode: item.barcode,
            sku: item.sku,
            description: item.description || "",
            eventId: Number(eventId),
            status: "active",
            order: (i * CHUNK_SIZE) + index + 1,
          }));

          // Simulate API call for each chunk
          await new Promise(resolve => setTimeout(resolve, 300));

          if (onUpload) {
            console.log(`Uploading chunk ${i + 1}/${totalChunks}...`);
            await onUpload(itemsData);
          }

          setUploadProgress({ current: i + 1, total: totalChunks });
          toast.loading(`Uploading... ${Math.round(((i + 1) / totalChunks) * 100)}%`, { id: toastId });
        }
        console.log("Bulk upload completed successfully");

        toast.success(`${validBulkItems.length} items uploaded successfully`, { id: toastId });
        setBulkItems([]);
        onOpenChange(false);
      } catch (error) {
        console.error("Error saving items:", error);
        setError("Failed to save items. Please try again.");
        toast.error("Failed to upload items", { id: toastId });
      } finally {
        setIsSubmitting(false);
        setUploadProgress({ current: 0, total: 0 });
      }
    }
  };

  // Bulk upload functions
  const addItemRow = () => {
    const timestamp = Date.now().toString().slice(-6);
    setBulkItems([
      ...bulkItems,
      {
        id: Date.now() + Math.random(),
        category: "Electronics",
        barcode: "",
        sku: "",
        description: "",
      },
    ]);
  };

  const removeItemRow = (id) => {
    setBulkItems(bulkItems.filter(item => item.id !== id));
  };

  const updateItemRow = (id, field, value) => {
    setBulkItems(bulkItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
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
        const items = [];

        // Skip header row if exists (check for common header keywords)
        const firstLine = lines[0] ? lines[0].toLowerCase() : "";
        const keywords = ['category', 'barcode', 'sku', 'description', 'itp'];
        const isHeader = keywords.some(keyword => firstLine.includes(keyword));
        const startIndex = isHeader ? 1 : 0;

        let colMap = { category: 0, barcode: 1, sku: 2, description: 3 };

        if (isHeader) {
          console.log("Header detected:", lines[0]);
          const headers = firstLine.split(',').map(h => h.trim().replace(/^"|"$/g, ''));
          
          colMap.category = headers.findIndex(h => h.includes('category') || h.includes('cat'));
          colMap.barcode = headers.findIndex(h => h.includes('barcode') || h.includes('bar') || h.includes('upc') || h.includes('itp'));
          colMap.sku = headers.findIndex(h => h.includes('sku') || h.includes('item'));
          colMap.description = headers.findIndex(h => h.includes('description') || h.includes('desc'));
        }

        for (let i = startIndex; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          // Split line by comma, handling potential quotes
          const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(p => p.trim().replace(/^"|"$/g, ''));
          
          if (parts.length > 0 && parts[colMap.barcode]) {
            items.push({
              id: Date.now() + i,
              category: parts[colMap.category] || "NA",
              barcode: parts[colMap.barcode] || "NA",
              sku: parts[colMap.sku] || "NA",
              description: parts[colMap.description] || "NA",
            });
          }
        }

        if (items.length > 0) {
          setBulkItems(items);
          setError("");
          toast.success(`Found ${items.length} items in the file`);
        } else {
          setError("No valid items found in the CSV file");
          toast.error("No valid items found in the CSV file");
        }
      } catch (err) {
        setError("Error parsing CSV file. Please check the format.");
        console.error("CSV parsing error:", err);
        toast.error("Error parsing CSV file");
      }
    };

    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const template = "category,barcode,sku,description\nElectronics,BAR-001,SKU-001,Smartphone\nClothing,BAR-002,SKU-002,T-shirt\nGroceries,BAR-003,SKU-003,Canned food";
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'items_template.csv';
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
        category: "",
        barcode: "",
        sku: "",
        description: "",
      });
      toast.success("Form cleared");
    } else {
      setBulkItems([]);
      toast.success("Items list cleared");
    }
    setError("");

    // 2. Check if we should clear DB items
    if (totalItems > 0) {
      if (window.confirm("Would you also like to clear all existing items from the database for this event? This action cannot be undone.")) {
        await clearItems();
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
              <div className="h-10 w-10 rounded-lg border-2 border-orange-200 flex items-center justify-center">
                <Package className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  Create Item{uploadMode === "bulk" && "s"}
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

            {/* Upload Mode Selector */}
            <Card className="border-blue-100">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Select Upload Mode
                  </h3>

                  <RadioGroup
                    value={uploadMode}
                    onValueChange={setUploadMode}
                    className="space-y-4"
                  >
                    {/* Single Item Radio Option */}
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="single" id="single" />
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Plus className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <Label htmlFor="single" className="font-medium text-gray-900 cursor-pointer">
                            Single Item
                          </Label>
                          <p className="text-sm text-gray-500">
                            Create one item at a time
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bulk Upload Radio Option */}
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="bulk" id="bulk" />
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Upload className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <Label htmlFor="bulk" className="font-medium text-gray-900 cursor-pointer">
                            Bulk Upload
                          </Label>
                          <p className="text-sm text-gray-500">
                            Upload multiple items via CSV
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

            {/* Upload Progress */}
            {isSubmitting && uploadProgress.total > 1 && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-blue-700">
                      <span>Uploading items...</span>
                      <span>{Math.round((uploadProgress.current / uploadProgress.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-blue-600">
                      Processing chunk {uploadProgress.current} of {uploadProgress.total}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Single Item Form */}
            {uploadMode === "single" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Item Information</h3>
                  <div className="text-sm text-gray-500">
                    Required fields are marked with *
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Barcode Input */}
                  <div className="space-y-2">
                    <label htmlFor="barcode" className="text-sm font-medium flex items-center gap-1">
                      Barcode <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="barcode"
                        type="text"
                        value={formData.barcode}
                        onChange={(e) => handleInputChange("barcode", e.target.value)}
                        placeholder="Enter barcode number"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <div className="absolute right-3 top-3">
                        <Barcode className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* SKU Input */}
                  <div className="space-y-2">
                    <label htmlFor="sku" className="text-sm font-medium flex items-center gap-1">
                      SKU <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="sku"
                        type="text"
                        value={formData.sku}
                        onChange={(e) => handleInputChange("sku", e.target.value)}
                        placeholder="Enter SKU (Stock Keeping Unit)"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <div className="absolute right-3 top-3">
                        <Hash className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Description Textarea */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe this item's features, specifications, condition, or any special handling requirements..."
                        rows={4}
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                      <div className="absolute right-3 top-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Category Input */}
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium flex items-center gap-1">
                      Category
                    </label>
                    <div className="relative">
                      <input
                        id="category"
                        type="text"
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        placeholder="Enter item category (e.g., Electronics, Clothing, Groceries)"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <div className="absolute right-3 top-3">
                        <FolderOpen className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Upload Form */}
            {uploadMode === "bulk" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Bulk Item Upload</h3>
                  <div className="text-sm text-gray-500">
                    {bulkItems.length} item{bulkItems.length !== 1 ? 's' : ''} added
                  </div>
                </div>

                {/* CSV Upload Section */}
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
                        Upload a CSV file with item details
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
                          Download Template
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-4">
                        CSV format: category,barcode,sku,description (one item per line)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Manual Item Entry */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Or Add Items Manually</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addItemRow}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Item
                    </Button>
                  </div>

                  {bulkItems.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b w-12">
                                #
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                                Category *
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                                Barcode *
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                                SKU *
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
                            {bulkItems.slice(0, 100).map((item, index) => (
                              <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  {index + 1}
                                </td>
                                <td className="py-3 px-4">
                                  <Input
                                    type="text"
                                    value={item.category}
                                    onChange={(e) => updateItemRow(item.id, "category", e.target.value)}
                                    placeholder="Category"
                                    className="w-full"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <Input
                                    type="text"
                                    value={item.barcode}
                                    onChange={(e) => updateItemRow(item.id, "barcode", e.target.value)}
                                    placeholder="Barcode"
                                    className="w-full"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <Input
                                    type="text"
                                    value={item.sku}
                                    onChange={(e) => updateItemRow(item.id, "sku", e.target.value)}
                                    placeholder="SKU"
                                    className="w-full"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <Input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => updateItemRow(item.id, "description", e.target.value)}
                                    placeholder="Description"
                                    className="w-full"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItemRow(item.id)}
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
                      {bulkItems.length > 100 && (
                        <div className="bg-gray-50 px-4 py-3 text-center border-t">
                          <p className="text-sm text-gray-600 font-medium">
                            Showing first 100 items. {bulkItems.length - 100} more items are loaded and ready for upload.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                      <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No items added yet</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Add items manually or upload a CSV file
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Preview Card */}
            <Card className="border-gray-200 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-4">
                <h4 className="font-medium text-sm text-gray-700 mb-3">
                  Preview
                </h4>
                {uploadMode === "single" ? (
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-orange-100 flex items-center justify-center">
                        <Package className="h-8 w-8 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {formData.category || "Item Category"}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {formData.barcode || "Barcode"}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {formData.sku || "SKU"}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          {formData.description || "No description provided"}
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            For: {eventData?.title || "Q1 Inventory Audit"}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            Item #{totalItems + 1}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            Event ID: {eventData?.uniqueId || "EVT-2024-001"}
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
                          {bulkItems.length} Item{bulkItems.length !== 1 ? 's' : ''} Ready
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Will be added to: {eventData?.title || "Q1 Inventory Audit"} (Event ID: {eventId || "EVT-2024-001"})
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                        <FileSpreadsheet className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    {bulkItems.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-600 mb-2">Sample items:</div>
                        <div className="space-y-1">
                          {bulkItems.slice(0, 3).map((item, index) => (
                            <div key={index} className="text-sm text-gray-700 flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                              <span className="font-medium">{item.category}</span>
                              <span className="text-xs text-gray-500">({item.barcode})</span>
                            </div>
                          ))}
                          {bulkItems.length > 3 && (
                            <div className="text-xs text-gray-500">
                              + {bulkItems.length - 3} more item{bulkItems.length - 3 !== 1 ? 's' : ''}
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
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-blue-600">
                        {totalItems}
                      </div>
                      <div className="text-sm text-gray-600">Total Items</div>
                    </div>
                    <Package className="h-8 w-8 text-blue-100" />
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
                Creating {uploadMode === "bulk" ? bulkItems.length : "1"} item{uploadMode === "bulk" && bulkItems.length !== 1 ? 's' : ''} for: {eventData?.title || "Q1 Inventory Audit"}
              </span>
              <span className="mx-2">•</span>
              {uploadMode === "single" ? (
                formData.category.trim() && formData.barcode.trim() && formData.sku.trim() ? (
                  <span className="text-green-600">Ready to create</span>
                ) : (
                  <span className="text-red-600">Required fields missing</span>
                )
              ) : (
                bulkItems.length > 0 ? (
                  <span className="text-green-600">
                    {bulkItems.length} item{bulkItems.length !== 1 ? 's' : ''} ready
                  </span>
                ) : (
                  <span className="text-red-600">Add items or upload CSV</span>
                )
              )}
              <span className="mx-2">•</span>
              <span className="text-gray-500">Event ID: {eventData?.uniqueId || "EVT-2024-001"}</span>
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
                disabled={isSubmitting || isClearingItems}
                className="gap-2"
              >
                {isClearingItems ? (
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
                    ? !formData.category.trim() || !formData.barcode.trim() || !formData.sku.trim()
                    : bulkItems.length === 0
                  )}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {uploadMode === "single" ? "Creating..." : "Uploading..."}
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    {uploadMode === "single" ? "Create Item" : `Create ${bulkItems.length} Item${bulkItems.length !== 1 ? 's' : ''}`}
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