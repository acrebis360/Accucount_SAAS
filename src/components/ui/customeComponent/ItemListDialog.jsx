"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Package,
    Search,
    Maximize2,
    Minimize2,
    X,
    RefreshCw,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    EyeClosedIcon
} from "lucide-react";
import { toast } from "react-hot-toast";

/* ---------------- DEBOUNCE ---------------- */
function useDebounce(value, delay = 400) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}

/* ---------------- EDIT DIALOG ---------------- */
const EditItemDialog = ({ open, onOpenChange, item, onSave, isSaving }) => {
    const [formData, setFormData] = useState({ sku: "", barcode: "", description: "" });

    useEffect(() => {
        if (item) {
            setFormData({
                sku: item.sku || "",
                barcode: item.barcode || "",
                description: item.description || ""
            });
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Edit Item</DialogTitle>
                <DialogDescription>Update the item details below.</DialogDescription>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">SKU</label>
                        <Input
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Barcode</label>
                        <Input
                            value={formData.barcode}
                            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? "Saving..." : "Update Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

/* ---------------- ROW ---------------- */
const TableRow = ({ item, onEdit, onDelete, isDeleting }) => (
    <div className="flex items-center px-4 py-3 border-b hover:bg-gray-50 text-sm">
        <div className="flex-1 font-mono">{item.sku || "-"}</div>
        <div className="flex-1">{item.barcode || "-"}</div>
        <div className="flex-1 truncate">{item.description}</div>
        <div className="w-24 flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                <Pencil className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(item)}
                disabled={isDeleting}
            >
                <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
        </div>
    </div>
);

/* ---------------- MAIN ---------------- */
export default function ItemsListDialog({
    open,
    onOpenChange,
    eventId,
}) {
    const pageSize = 50;

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [editingItem, setEditingItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    const debouncedSearch = useDebounce(search);

    /* Dummy items data */
    const generateDummyItems = () => {
        const dummyItems = [];
        for (let i = 1; i <= 150; i++) {
            dummyItems.push({
                id: i,
                sku: `SKU-${String(i).padStart(5, '0')}`,
                barcode: `BAR-${String(i).padStart(6, '0')}`,
                description: `Item description for product ${i} - High quality inventory item`,
                category: i % 3 === 0 ? "Electronics" : i % 3 === 1 ? "Clothing" : "Groceries",
            });
        }
        return dummyItems;
    };

    const allDummyItems = generateDummyItems();
    const totalItems = allDummyItems.length;

    /* Reset page on search */
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    /* Fetch items with filtering and pagination */
    useEffect(() => {
        if (open) {
            setIsLoading(true);
            setIsFetching(true);
            
            // Simulate API call
            setTimeout(() => {
                let filteredItems = [...allDummyItems];
                
                // Apply search filter
                if (debouncedSearch) {
                    const searchLower = debouncedSearch.toLowerCase();
                    filteredItems = filteredItems.filter(item =>
                        item.sku.toLowerCase().includes(searchLower) ||
                        item.barcode.toLowerCase().includes(searchLower) ||
                        item.description.toLowerCase().includes(searchLower)
                    );
                }
                
                // Apply pagination
                const startIndex = (page - 1) * pageSize;
                const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);
                
                setItems(paginatedItems);
                setTotal(filteredItems.length);
                setIsLoading(false);
                setIsFetching(false);
            }, 300);
        }
    }, [open, page, debouncedSearch]);

    const handleRefresh = () => {
        setIsFetching(true);
        const toastId = toast.loading("Refreshing items...");
        
        setTimeout(() => {
            // Re-fetch current page
            let filteredItems = [...allDummyItems];
            
            if (debouncedSearch) {
                const searchLower = debouncedSearch.toLowerCase();
                filteredItems = filteredItems.filter(item =>
                    item.sku.toLowerCase().includes(searchLower) ||
                    item.barcode.toLowerCase().includes(searchLower) ||
                    item.description.toLowerCase().includes(searchLower)
                );
            }
            
            const startIndex = (page - 1) * pageSize;
            const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);
            
            setItems(paginatedItems);
            setTotal(filteredItems.length);
            setIsFetching(false);
            toast.success("Items refreshed", { id: toastId });
        }, 500);
    };

    const handleDelete = (item) => {
        if (confirm("Delete this item?")) {
            const toastId = toast.loading("Deleting item...");
            setIsDeleting(true);
            
            setTimeout(() => {
                // Remove item from local state
                const updatedItems = items.filter(i => i.id !== item.id);
                setItems(updatedItems);
                setTotal(prev => prev - 1);
                toast.success("Item deleted successfully", { id: toastId });
                setIsDeleting(false);
            }, 500);
        }
    };

    const handleUpdate = (formData) => {
        const toastId = toast.loading("Updating item...");
        setIsUpdating(true);
        
        setTimeout(() => {
            // Update item in local state
            const updatedItems = items.map(item =>
                item.id === editingItem.id
                    ? { ...item, ...formData }
                    : item
            );
            setItems(updatedItems);
            toast.success("Item updated successfully", { id: toastId });
            setEditingItem(null);
            setIsUpdating(false);
        }, 500);
    };

    const totalPages = Math.ceil(total / pageSize);

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    showCloseButton={false}
                    className={`p-0 flex flex-col transition-all duration-300 ${isFullscreen
                        ? "w-screen h-screen max-w-none rounded-none"
                        : "sm:max-w-[95vw] w-[95vw] h-[95vh] rounded-xl"
                        }`}
                >

                    {/* HEADER */}
                    <div className="flex justify-between items-center p-6 border-b">
                        <div className="flex gap-4 items-center">
                            <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Package className="text-orange-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold">
                                    Item Master List
                                </DialogTitle>
                                <DialogDescription>
                                    Browse & search event items
                                </DialogDescription>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={handleRefresh}>
                                <RefreshCw className={isFetching ? "animate-spin" : ""} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsFullscreen((v) => !v)}
                            >
                                {isFullscreen ? <Minimize2 /> : <Maximize2 />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onOpenChange(false)}
                            >
                                <EyeClosedIcon />
                            </Button>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 p-6 flex flex-col overflow-hidden">
                        {/* SEARCH */}
                        <div className="mb-4 relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                className="pl-10"
                                placeholder="Search SKU / Barcode / Description"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* TABLE */}
                        <div className="flex-1 border rounded-lg overflow-hidden flex flex-col">
                            <div className="flex px-4 py-3 bg-gray-50 border-b text-xs font-semibold">
                                <div className="flex-1">SKU</div>
                                <div className="flex-1">Barcode</div>
                                <div className="flex-1">Description</div>
                                <div className="w-24">Action</div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                {isLoading ? (
                                    <div className="h-full flex items-center justify-center text-sm text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-8 w-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
                                            <span>Loading items...</span>
                                        </div>
                                    </div>
                                ) : items.length ? (
                                    items.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            item={item}
                                            onEdit={setEditingItem}
                                            onDelete={handleDelete}
                                            isDeleting={isDeleting}
                                        />
                                    ))
                                ) : (
                                    <div className="h-full flex items-center justify-center text-sm text-gray-500">
                                        <div className="text-center">
                                            <Package className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                                            <p>No items found</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Try adjusting your search
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PAGINATION */}
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                                Page {page} of {totalPages || 1} • {total} items
                            </p>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1 || isFetching}
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Prev
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setPage((p) => Math.min(totalPages, p + 1))
                                    }
                                    disabled={page >= totalPages || isFetching}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <EditItemDialog
                open={!!editingItem}
                onOpenChange={(open) => !open && setEditingItem(null)}
                item={editingItem}
                onSave={handleUpdate}
                isSaving={isUpdating}
            />
        </>
    );
}