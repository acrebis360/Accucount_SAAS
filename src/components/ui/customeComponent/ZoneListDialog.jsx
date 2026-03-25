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
import {
    MapPin,
    Search,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Minimize2,
    EyeClosedIcon,
    RefreshCw,
    Pencil,
    Trash2,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ZonesListDialog({ open, onOpenChange, eventId }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [editingZone, setEditingZone] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [zones, setZones] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 20;

    /* ---------------- Dummy Data ---------------- */
    const generateDummyZones = () => {
        const dummyZones = [];
        for (let i = 1; i <= 45; i++) {
            dummyZones.push({
                id: i,
                uniqueId: `ZONE-${String(i).padStart(3, '0')}`,
                name: `Zone ${String.fromCharCode(64 + ((i - 1) % 26) + 1)}${Math.ceil(i / 26)}`,
                description: `Description for zone ${i} - This area covers ${i * 100} square feet and contains various inventory items.`,
            });
        }
        return dummyZones;
    };

    const allDummyZones = generateDummyZones();

    /* ---------------- Fetch Data (Simulated) ---------------- */
    useEffect(() => {
        if (open) {
            setIsLoading(true);
            setIsFetching(true);
            
            setTimeout(() => {
                let filteredZones = [...allDummyZones];
                
                // Apply search filter
                if (search) {
                    const searchLower = search.toLowerCase();
                    filteredZones = filteredZones.filter(zone =>
                        zone.name.toLowerCase().includes(searchLower) ||
                        zone.description.toLowerCase().includes(searchLower) ||
                        zone.uniqueId.toLowerCase().includes(searchLower)
                    );
                }
                
                // Apply pagination
                const startIndex = (page - 1) * pageSize;
                const paginatedZones = filteredZones.slice(startIndex, startIndex + pageSize);
                
                setZones(paginatedZones);
                setTotalItems(filteredZones.length);
                setTotalPages(Math.max(1, Math.ceil(filteredZones.length / pageSize)));
                setIsLoading(false);
                setIsFetching(false);
            }, 300);
        }
    }, [open, page, search]);

    useEffect(() => {
        if (open) {
            setPage(1);
            setSearch("");
            setEditingZone(null);
        }
    }, [open]);

    /* ---------------- Handlers ---------------- */
    const handleRefresh = () => {
        setIsFetching(true);
        const toastId = toast.loading("Refreshing zones...");
        
        setTimeout(() => {
            let filteredZones = [...allDummyZones];
            
            if (search) {
                const searchLower = search.toLowerCase();
                filteredZones = filteredZones.filter(zone =>
                    zone.name.toLowerCase().includes(searchLower) ||
                    zone.description.toLowerCase().includes(searchLower) ||
                    zone.uniqueId.toLowerCase().includes(searchLower)
                );
            }
            
            const startIndex = (page - 1) * pageSize;
            const paginatedZones = filteredZones.slice(startIndex, startIndex + pageSize);
            
            setZones(paginatedZones);
            setTotalItems(filteredZones.length);
            setTotalPages(Math.max(1, Math.ceil(filteredZones.length / pageSize)));
            setIsFetching(false);
            toast.success("Zones refreshed", { id: toastId });
        }, 500);
    };

    const handleDelete = (zoneId, zoneName) => {
        if (window.confirm(`Are you sure you want to delete zone "${zoneName}"?`)) {
            const toastId = toast.loading("Deleting zone...");
            setIsDeleting(true);
            
            setTimeout(() => {
                // Remove zone from local state
                const updatedZones = zones.filter(zone => zone.id !== zoneId);
                setZones(updatedZones);
                setTotalItems(prev => prev - 1);
                setTotalPages(Math.max(1, Math.ceil((totalItems - 1) / pageSize)));
                toast.success("Zone deleted successfully", { id: toastId });
                setIsDeleting(false);
            }, 500);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedName = formData.get("name");
        const updatedDescription = formData.get("description");
        
        const toastId = toast.loading("Updating zone...");
        setIsUpdating(true);
        
        setTimeout(() => {
            // Update zone in local state
            const updatedZones = zones.map(zone =>
                zone.id === editingZone.id
                    ? { ...zone, name: updatedName, description: updatedDescription }
                    : zone
            );
            setZones(updatedZones);
            toast.success("Zone updated successfully", { id: toastId });
            setEditingZone(null);
            setIsUpdating(false);
        }, 500);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className={`bg-white transition-all duration-300 ease-in-out p-0 flex flex-col gap-0 ${isFullscreen
                    ? "max-w-none w-screen h-screen rounded-none"
                    : "sm:max-w-[90vw] w-[90vw] h-[90vh] rounded-xl"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10 rounded-t-xl">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold text-gray-900">
                                Zone Master List
                            </DialogTitle>
                            <DialogDescription className="text-gray-500 mt-1">
                                View and search all zones defined for this event.
                            </DialogDescription>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleRefresh}
                            className="h-9 w-9 text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                        >
                            <RefreshCw className={`h-5 w-5 ${isFetching ? "animate-spin" : ""}`} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="h-9 w-9 text-gray-500 hover:text-purple-600 hover:bg-purple-50 hidden md:flex"
                        >
                            {isFullscreen ? (
                                <Minimize2 className="h-5 w-5" />
                            ) : (
                                <Maximize2 className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onOpenChange(false)}
                            className="h-9 w-9 text-gray-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <EyeClosedIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex flex-col p-6">
                    {/* Search and Filters */}
                    <div className="mb-6 flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by zone name, description, or ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 h-10 border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Zone Name</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                            <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                                            <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                                            <td className="px-4 py-4 text-right"><div className="h-8 w-16 bg-gray-200 rounded ml-auto"></div></td>
                                        </tr>
                                    ))
                                ) : zones.length > 0 ? (
                                    zones.map((zone) => (
                                        <tr key={zone.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4 text-sm font-mono text-gray-500">{zone.uniqueId}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{zone.name}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 truncate max-w-xs" title={zone.description}>
                                                {zone.description || "No description"}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                        onClick={() => setEditingZone(zone)}
                                                        disabled={isFetching}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => handleDelete(zone.id, zone.name)}
                                                        disabled={isDeleting || isFetching}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <MapPin className="h-10 w-10 text-gray-300" />
                                                <p>No zones found</p>
                                                <p className="text-xs text-gray-400">Try adjusting your search</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-between border-t pt-4">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-medium">{zones.length}</span> of <span className="font-medium">{totalItems}</span> results
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || isFetching}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) pageNum = i + 1;
                                        else if (page <= 3) pageNum = i + 1;
                                        else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                                        else pageNum = page - 2 + i;

                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={page === pageNum ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setPage(pageNum)}
                                                className={`h-8 w-8 p-0 ${page === pageNum ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                                                disabled={isLoading}
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    })}
                                    {totalPages > 5 && page < totalPages - 2 && (
                                        <>
                                            <span className="text-gray-400">...</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setPage(totalPages)}
                                                className="h-8 w-8 p-0"
                                                disabled={isLoading}
                                            >
                                                {totalPages}
                                            </Button>
                                        </>
                                    )}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages || isFetching}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Edit Zone Dialog */}
                <Dialog open={!!editingZone} onOpenChange={() => setEditingZone(null)}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Zone</DialogTitle>
                            <DialogDescription>Update the zone name and description.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdate} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Zone Name</label>
                                <Input 
                                    name="name" 
                                    defaultValue={editingZone?.name} 
                                    required 
                                    placeholder="Enter zone name" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Input 
                                    name="description" 
                                    defaultValue={editingZone?.description} 
                                    placeholder="Enter description" 
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => setEditingZone(null)}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="bg-purple-600 hover:bg-purple-700 text-white" 
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? "Updating..." : "Update Zone"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </DialogContent>
        </Dialog>
    );
}