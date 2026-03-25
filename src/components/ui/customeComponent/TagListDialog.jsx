"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tags,
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Maximize2,
    Minimize2,
    EyeClosedIcon,
    RefreshCw,
    Pencil,
    Trash2,
} from "lucide-react";
import { toast } from "react-hot-toast";

/* ---------------- Debounce ---------------- */
function useDebounce(value, delay = 400) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}

/* ---------------- Component ---------------- */
export default function TagsListDialog({ open, onOpenChange, eventId }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(25);
    const [filterZone, setFilterZone] = useState("all");
    const [editingTag, setEditingTag] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [tags, setTags] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [zonesList, setZonesList] = useState([]);

    /* ---------------- Dummy Data ---------------- */
    const dummyZones = [
        { id: 1, uniqueId: "ZONE_A", name: "Zone A", description: "Main entrance and lobby area" },
        { id: 2, uniqueId: "ZONE_B", name: "Zone B", description: "Electronics department" },
        { id: 3, uniqueId: "ZONE_C", name: "Zone C", description: "Apparel section" },
        { id: 4, uniqueId: "ZONE_D", name: "Zone D", description: "Grocery section" },
        { id: 5, uniqueId: "ZONE_E", name: "Zone E", description: "Warehouse storage" },
    ];

    const generateDummyTags = () => {
        const dummyTags = [];
        const zones = dummyZones;
        
        for (let i = 1; i <= 150; i++) {
            const zone = zones[(i - 1) % zones.length];
            dummyTags.push({
                id: i,
                barcode: `TAG-${String(i).padStart(6, '0')}`,
                udc: `UDC-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`,
                zone: {
                    id: zone.id,
                    uniqueId: zone.uniqueId,
                    name: zone.name,
                    description: zone.description
                }
            });
        }
        return dummyTags;
    };

    const allDummyTags = generateDummyTags();

    /* ---------------- Fetch Data (Simulated) ---------------- */
    useEffect(() => {
        if (open) {
            // Load zones
            setZonesList(dummyZones);
            
            // Load tags with filters
            setIsLoading(true);
            setIsFetching(true);
            
            setTimeout(() => {
                let filteredTags = [...allDummyTags];
                
                // Apply search filter
                if (debouncedSearch) {
                    const searchLower = debouncedSearch.toLowerCase();
                    filteredTags = filteredTags.filter(tag =>
                        tag.barcode.toLowerCase().includes(searchLower) ||
                        (tag.udc && tag.udc.toLowerCase().includes(searchLower))
                    );
                }
                
                // Apply zone filter
                if (filterZone !== "all") {
                    filteredTags = filteredTags.filter(tag => 
                        tag.zone?.uniqueId === filterZone
                    );
                }
                
                // Apply pagination
                const startIndex = (page - 1) * pageSize;
                const paginatedTags = filteredTags.slice(startIndex, startIndex + pageSize);
                
                setTags(paginatedTags);
                setTotalItems(filteredTags.length);
                setIsLoading(false);
                setIsFetching(false);
            }, 300);
        }
    }, [open, page, pageSize, debouncedSearch, filterZone]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, filterZone]);

    useEffect(() => {
        if (open) {
            setPage(1);
            setSearch("");
            setFilterZone("all");
        }
    }, [open]);

    /* ---------------- Handlers ---------------- */
    const handleRefresh = () => {
        setIsFetching(true);
        const toastId = toast.loading("Refreshing tags...");
        
        setTimeout(() => {
            let filteredTags = [...allDummyTags];
            
            if (debouncedSearch) {
                const searchLower = debouncedSearch.toLowerCase();
                filteredTags = filteredTags.filter(tag =>
                    tag.barcode.toLowerCase().includes(searchLower) ||
                    (tag.udc && tag.udc.toLowerCase().includes(searchLower))
                );
            }
            
            if (filterZone !== "all") {
                filteredTags = filteredTags.filter(tag => 
                    tag.zone?.uniqueId === filterZone
                );
            }
            
            const startIndex = (page - 1) * pageSize;
            const paginatedTags = filteredTags.slice(startIndex, startIndex + pageSize);
            
            setTags(paginatedTags);
            setTotalItems(filteredTags.length);
            setIsFetching(false);
            toast.success("Tags refreshed", { id: toastId });
        }, 500);
    };

    const handleDelete = (zoneId, tagId, barcode) => {
        if (confirm(`Delete tag "${barcode}"?`)) {
            const toastId = toast.loading("Deleting tag...");
            setIsDeleting(true);
            
            setTimeout(() => {
                // Remove tag from local state
                const updatedTags = tags.filter(tag => tag.id !== tagId);
                setTags(updatedTags);
                setTotalItems(prev => prev - 1);
                toast.success("Tag deleted successfully", { id: toastId });
                setIsDeleting(false);
            }, 500);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedBarcode = formData.get("barcode");
        const updatedUdc = formData.get("udc");
        
        const toastId = toast.loading("Updating tag...");
        setIsUpdating(true);
        
        setTimeout(() => {
            // Update tag in local state
            const updatedTags = tags.map(tag =>
                tag.id === editingTag.id
                    ? { ...tag, barcode: updatedBarcode, udc: updatedUdc }
                    : tag
            );
            setTags(updatedTags);
            toast.success("Tag updated successfully", { id: toastId });
            setEditingTag(null);
            setIsUpdating(false);
        }, 500);
    };

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    /* ---------------- UI ---------------- */
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className={`p-0 flex flex-col ${isFullscreen
                    ? "w-screen h-screen max-w-none rounded-none"
                    : "w-[90vw] h-[90vh] sm:max-w-[90vw]"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <div className="flex gap-4">
                        <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                            <Tags className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold">
                                Tag Master List
                            </DialogTitle>
                            <DialogDescription>
                                View and manage event tags
                            </DialogDescription>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleRefresh}>
                            <RefreshCw
                                className={`h-5 w-5 ${isFetching ? "animate-spin" : ""
                                    }`}
                            />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="hidden md:flex"
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

                {/* Filters */}
                <div className="p-6 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search barcode or UDC"
                            className="pl-10"
                        />
                    </div>

                    <Select value={filterZone} onValueChange={setFilterZone}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Zone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Zones</SelectItem>
                            {zonesList.map((z) => (
                                <SelectItem key={z.id} value={z.uniqueId}>
                                    {z.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto px-6">
                    <table className="w-full border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left align-middle text-xs font-semibold text-gray-500 uppercase tracking-wider">Barcode</th>
                                <th className="p-3 text-left align-middle text-xs font-semibold text-gray-500 uppercase tracking-wider">UDC</th>
                                <th className="p-3 text-left align-middle text-xs font-semibold text-gray-500 uppercase tracking-wider">Zone</th>
                                <th className="p-3 text-left align-middle text-xs font-semibold text-gray-500 uppercase tracking-wider">Zone Description</th>
                                <th className="p-3 text-right align-middle text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-6 text-center align-middle">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-sm text-gray-500">Loading tags...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : tags.length ? (
                                tags.map((tag) => (
                                    <tr key={tag.id} className="border-t hover:bg-gray-50 transition-colors">
                                        <td className="p-3 align-middle text-sm font-mono">{tag.barcode}</td>
                                        <td className="p-3 align-middle text-sm">{tag.udc || "—"}</td>
                                        <td className="p-3 align-middle text-sm font-medium">{tag.zone?.name || "—"}</td>
                                        <td className="p-3 align-middle text-sm text-gray-600 truncate max-w-xs" title={tag.zone?.description}>
                                            {tag.zone?.description || "-"}
                                        </td>
                                        <td className="p-3 text-right align-middle">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                    onClick={() => setEditingTag(tag)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() =>
                                                        handleDelete(tag.zone?.id, tag.id, tag.barcode)
                                                    }
                                                    disabled={isDeleting}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-10 text-center text-gray-500 align-middle"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <Tags className="h-12 w-12 text-gray-300" />
                                            <p>No tags found</p>
                                            <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        {totalItems === 0
                            ? "No records"
                            : `Showing ${(page - 1) * pageSize + 1}–${Math.min(
                                page * pageSize,
                                totalItems
                            )} of ${totalItems}`}
                    </p>

                    <div className="flex gap-1">
                        <Button
                            size="icon"
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage(1)}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => setPage(totalPages)}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Edit Tag Dialog */}
                <Dialog open={!!editingTag} onOpenChange={() => setEditingTag(null)}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Tag</DialogTitle>
                            <DialogDescription>
                                Update tag details and assigned zone.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdate} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>Barcode</Label>
                                <Input
                                    name="barcode"
                                    defaultValue={editingTag?.barcode}
                                    required
                                    placeholder="Enter barcode"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>UDC</Label>
                                <Input
                                    name="udc"
                                    defaultValue={editingTag?.udc}
                                    placeholder="Enter UDC"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Zone</Label>
                                <Input
                                    value={editingTag?.zone?.name || "—"}
                                    disabled
                                    className="bg-gray-50 text-gray-500"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditingTag(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? "Updating..." : "Update Tag"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </DialogContent>
        </Dialog>
    );
}