// components/ManualEntryDialog.jsx
"use client";

import { useState, useMemo } from "react";
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
import {
    Minimize2,
    Maximize2,
    X,
    Plus,
    Search,
    Hash,
    Barcode,
    RefreshCw,
    CheckCircle2,
    EyeClosedIcon
} from "lucide-react";

export default function ManualEntryDialog({
    open,
    onOpenChange,
    tagData,
    isNoAudit,
    addItemForm,
    setAddItemForm,
    handleAddItem,
    isPending,
    allItems = [],
}) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredItems = useMemo(() => {
        const term = (addItemForm.itemBarcode || "").toLowerCase();
        if (term.length < 2) return [];
        return allItems.filter(item =>
            String(item.barcode || "").toLowerCase().includes(term) ||
            String(item.sku || "").toLowerCase().includes(term) ||
            String(item.description || "").toLowerCase().includes(term)
        ).slice(0, 10);
    }, [addItemForm.itemBarcode, allItems]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={`
          ${isFullscreen
                        ? "w-full h-full max-w-none max-h-none rounded-none"
                        : "!w-[95vw] !max-w-[95vw] max-h-[90vh] mx-auto my-0"
                    }
          overflow-hidden flex flex-col p-0 border-0 shadow-2xl
        `}
            >
                <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg border-2 border-orange-200 flex items-center justify-center">
                                <Plus className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold">Add Manual Entry</DialogTitle>
                                <DialogDescription className="flex items-center gap-2">
                                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-lg mt-1">
                                        Tag ID: {tagData?.id}
                                    </span>
                                </DialogDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)} className="h-8 w-8 p-0">
                                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-8 w-8 p-0">
                                <EyeClosedIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700">Current Tag Barcode</Label>
                                <div className="relative">
                                    <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        value={addItemForm.tagBarcode}
                                        readOnly
                                        className="pl-11 bg-gray-100 border-gray-200 font-bold text-orange-700 h-12 cursor-default"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 relative">
                                <Label className="text-sm font-semibold text-gray-700">Item Barcode</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        placeholder="Scan or type barcode..."
                                        value={addItemForm.itemBarcode}
                                        autoFocus
                                        onChange={(e) => {
                                            setAddItemForm(prev => ({ ...prev, itemBarcode: e.target.value }));
                                            setShowSuggestions(true);
                                        }}
                                        className="pl-11 h-12 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-lg transition-all"
                                    />
                                </div>
                                {showSuggestions && filteredItems.length > 0 && (
                                    <Card className="absolute z-[100] w-full mt-1 border-gray-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                                        <div className="max-h-[250px] overflow-y-auto">
                                            {filteredItems.map(item => (
                                                <div
                                                    key={item.id}
                                                    className="p-3 hover:bg-orange-50 cursor-pointer border-b last:border-0 transition-colors"
                                                    onClick={() => {
                                                        setAddItemForm(prev => ({ ...prev, itemBarcode: item.barcode }));
                                                        setShowSuggestions(false);
                                                    }}
                                                >
                                                    <div className="flex justify-between font-bold text-gray-900 text-sm">
                                                        <span className="text-orange-700">{item.barcode}</span>
                                                        <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded uppercase">SKU: {item.sku}</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1 truncate">{item.description}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700">
                                    {isNoAudit ? "Quantity" : "Audit Quantity"}
                                </Label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        type="number"
                                        placeholder="Enter quantity..."
                                        value={addItemForm.auditQty}
                                        onChange={(e) => setAddItemForm(prev => ({ ...prev, auditQty: e.target.value }))}
                                        className="pl-11 h-12 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-lg font-semibold"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t p-6 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-lg">
                    <div className="text-sm text-gray-500 italic">
                        Adding to: <strong className="text-orange-700">{tagData?.id}</strong>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none h-11 border-gray-300 font-semibold">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddItem}
                            disabled={isPending || !addItemForm.itemBarcode || !addItemForm.auditQty}
                            className="flex-1 sm:flex-none h-11 bg-orange-600 hover:bg-orange-700 font-bold shadow-lg shadow-orange-200 text-white min-w-[140px]"
                        >
                            {isPending ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : <CheckCircle2 className="mr-2 h-5 w-5" />}
                            {isPending ? "Adding..." : "Save Entry"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
