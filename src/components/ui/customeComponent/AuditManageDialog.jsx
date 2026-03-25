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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Minimize2,
    Maximize2,
    Settings,
    X,
    Check,
    AlertCircle,
    EyeClosed,
    Shield,
    UserCheck,
    EyeClosedIcon,
    PlayCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

export const AuditManageDialog = ({
    open,
    onOpenChange,
    eventId,
    uniqueId,
    onSave,
}) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [auditCategory, setAuditCategory] = useState("no-audit");
    const [auditSubMethod, setAuditSubMethod] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [savedAuditData, setSavedAuditData] = useState(null);

    // Dummy data for saved audit method
    const dummySettedAuditData = {
        audit: {
            name: "Full Audit",
            verficationType: "RESCAN"
        }
    };

    const event = {
        id: eventId || "1234",
        name: "Audit Management Process",
    };

    const auditStructure = [
        { id: "no-audit", name: "No Audit", icon: EyeClosed, description: "No audit process required" },
        {
            id: "full-audit",
            name: "Full Audit",
            icon: Shield,
            description: "Complete verification process",
            children: [
                { id: "rescan", name: "RESCAN" },
                { id: "verify-count", name: "Verify Count" }
            ]
        },
        {
            id: "admin-assigned",
            name: "Admin Assigned Audit",
            icon: UserCheck,
            description: "Tasks assigned by administrator",
            children: [
                { id: "rescan", name: "RESCAN" },
                { id: "verify-count", name: "Verify Count" }
            ]
        },
    ];

    // Simulate loading saved audit data
    useEffect(() => {
        if (open) {
            setIsLoading(true);
            // Simulate API call delay
            setTimeout(() => {
                // Use dummy data - you can modify this to test different scenarios
                // For testing "No Audit", uncomment below:
                // setSavedAuditData({ audit: { name: "No Audit" } });
                
                // For testing with saved data
                setSavedAuditData(dummySettedAuditData);
                setIsLoading(false);
            }, 500);
        } else {
            setSavedAuditData(null);
        }
    }, [open]);

    const savedAudit = savedAuditData?.audit || savedAuditData?.data || savedAuditData;
    const isAuditLocked = !!(savedAudit && savedAudit.name && savedAudit.name !== "No Audit");

    useEffect(() => {
        if (open && savedAuditData && !isLoading) {
            console.log("Syncing with savedAuditData:", savedAuditData);
            const audit = savedAuditData.audit || savedAuditData.data || savedAuditData;

            if (audit && audit.name) {
                // Map Name -> Category ID
                let categoryId = "no-audit";
                if (audit.name === "Full Audit") categoryId = "full-audit";
                else if (audit.name === "Admin Assigned Audit") categoryId = "admin-assigned";

                setAuditCategory(categoryId);

                // Map verificationType -> SubMethod ID
                if (audit.verficationType) {
                    const vt = audit.verficationType;
                    if (vt === "RESCAN") setAuditSubMethod("rescan");
                    else if (vt === "Verify Count") setAuditSubMethod("verify-count");
                    else setAuditSubMethod(vt.toLowerCase());
                } else {
                    setAuditSubMethod("");
                }
            }
        } else if (open && !isLoading && !savedAuditData) {
            // Default when no audit is set
            setAuditCategory("no-audit");
            setAuditSubMethod("");
        }
    }, [open, savedAuditData, isLoading]);

    const isUnchanged = () => {
        if (!savedAuditData) return false;
        const audit = savedAuditData.audit || savedAuditData.data || savedAuditData;

        // If nothing is saved, it's unchanged if the selection is "no-audit"
        if (!audit || !audit.name) return auditCategory === "no-audit";

        let savedCategoryId = "no-audit";
        if (audit.name === "Full Audit") savedCategoryId = "full-audit";
        else if (audit.name === "Admin Assigned Audit") savedCategoryId = "admin-assigned";

        let savedSubMethod = "";
        if (audit.verficationType) {
            if (audit.verficationType === "RESCAN") savedSubMethod = "rescan";
            else if (audit.verficationType === "Verify Count") savedSubMethod = "verify-count";
            else savedSubMethod = audit.verficationType.toLowerCase();
        }

        return auditCategory === savedCategoryId && auditSubMethod === savedSubMethod;
    };

    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    const handleCategoryChange = (value) => {
        if (isAuditLocked) return;
        if (value === auditCategory) return;

        setAuditCategory(value);
        const category = auditStructure.find(c => c.id === value);
        if (category?.children) {
            setAuditSubMethod(category.children[0].id);
        } else {
            setAuditSubMethod("");
        }
    };

    const handleSubmit = async () => {
        const category = auditStructure.find(c => c.id === auditCategory);
        if (category?.children && !auditSubMethod) {
            toast.error("Please select a sub-method");
            return;
        }

        let payload = {};
        if (category.id === "no-audit") {
            payload = { name: category.name };
        } else {
            const subMethod = category.children.find(child => child.id === auditSubMethod);
            payload = {
                name: category.name,
                verficationType: subMethod ? subMethod.name : auditSubMethod
            };
        }

        // Simulate API call
        const toastId = toast.loading("Saving audit configuration...");
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Audit configuration saved successfully", { id: toastId });
            
            // Update local state with new data
            setSavedAuditData({ audit: payload });
            
            if (onSave) onSave(payload);
            onOpenChange(false);
        } catch (error) {
            console.error("Error saving audit method:", error);
            toast.error("Failed to save audit method", { id: toastId });
        }
    };

    const isSaveDisabled =
        isLoading ||
        !auditCategory ||
        (auditStructure.find(c => c.id === auditCategory)?.children && !auditSubMethod) ||
        isUnchanged();

    // Show loading state
    if (isLoading && open) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="overflow-hidden flex flex-col p-0">
                    <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg border-2 border-blue-200 flex items-center justify-center">
                                    <Settings className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <DialogTitle className="text-xl font-bold">
                                        Audit Setup Configuration
                                    </DialogTitle>
                                    <DialogDescription className="flex items-center gap-2">
                                        <span className="text-xs bg-gray-100 text-gray-800 bg-purple-200 px-2 py-1 rounded-lg mt-1">
                                            Event ID: {uniqueId || event.id}
                                        </span>
                                    </DialogDescription>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading audit configuration...</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

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
                {/* Dialog Header - Exact Match to ReportsDialog */}
                <DialogHeader className="sticky top-0 z-50 bg-white border-b p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg border-2 border-blue-200 flex items-center justify-center">
                                <Settings className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold">
                                    Audit Setup Configuration
                                </DialogTitle>
                                <DialogDescription className="flex items-center gap-2">
                                    <span className="text-xs bg-gray-100 text-gray-800 bg-purple-200 px-2 py-1 rounded-lg mt-1">
                                        Event ID: {uniqueId || event.id}
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
                                onClick={() => onOpenChange(false)}
                                className="h-8 w-8 p-0"
                            >
                                <EyeClosedIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Error display handled by toast */}

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Audit Method</h3>
                                <div className="text-sm text-gray-500">Select one method</div>
                            </div>

                            <Card className="border-blue-100">
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-4">
                                            Select audit method for this event
                                        </h4>

                                        <div className="grid grid-cols-1 gap-4">
                                            {auditStructure.map((category) => {
                                                const Icon = category.icon;
                                                const isActive = auditCategory === category.id;

                                                return (
                                                    <div
                                                        key={category.id}
                                                        className={`
                                                            flex flex-col p-4 border rounded-lg transition-all duration-200
                                                            ${isAuditLocked ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}
                                                            ${isActive
                                                                ? "border-blue-500 bg-blue-50"
                                                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                            }
                                                        `}
                                                        onClick={() => !isAuditLocked && handleCategoryChange(category.id)}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className={`
                                                                mt-1 flex items-center justify-center h-4 w-4 rounded-full border border-gray-300
                                                                ${isActive ? "bg-blue-600 border-blue-600" : "bg-white"}
                                                            `}>
                                                                {isActive && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                                            </div>

                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <div className={`
                                                                        h-8 w-8 rounded-lg flex items-center justify-center
                                                                        ${isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}
                                                                    `}>
                                                                        <Icon className="h-4 w-4" />
                                                                    </div>
                                                                    <Label className="font-medium text-gray-900 cursor-pointer">
                                                                        {category.name}
                                                                    </Label>
                                                                </div>
                                                                <p className="text-sm text-gray-500 ml-10">
                                                                    {category.description}
                                                                </p>

                                                                {/* Hierarchical Selection */}
                                                                {isActive && category.children && (
                                                                    <div
                                                                        className="mt-4 ml-10 pl-6 space-y-3 border-l-2 border-blue-200"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        <RadioGroup
                                                                            value={auditSubMethod}
                                                                            onValueChange={setAuditSubMethod}
                                                                            disabled={isAuditLocked}
                                                                            className="space-y-3"
                                                                        >
                                                                            {category.children.map((child) => (
                                                                                <div key={child.id} className="flex items-center space-x-3">
                                                                                    <RadioGroupItem value={child.id} id={`${category.id}-${child.id}`} />
                                                                                    <Label
                                                                                        htmlFor={`${category.id}-${child.id}`}
                                                                                        className="text-sm font-normal text-gray-700 cursor-pointer"
                                                                                    >
                                                                                        {child.name}
                                                                                    </Label>
                                                                                </div>
                                                                            ))}
                                                                        </RadioGroup>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Dialog Footer - Exact match to CreateEventDialog/ReportsDialog */}
                <div className="sticky bottom-0 bg-white border-t p-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <span className="text-gray-500 font-medium">Audit Selection</span>
                                <span className="text-gray-500 font-bold text-xl mb-2">.</span>
                                {isAuditLocked ? (
                                    <span className="text-amber-600 font-medium flex items-center gap-1">
                                        <Shield className="h-3 w-3" />
                                        Audit Method Locked
                                    </span>
                                ) : !isSaveDisabled ? (
                                    <span className="text-green-600 font-medium">Ready to save</span>
                                ) : isUnchanged() ? (
                                    <span className="text-gray-400">No changes made</span>
                                ) : (
                                    <span className="text-red-500">Selection required</span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>Discard</Button>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                                onClick={handleSubmit}
                                disabled={isSaveDisabled}
                            >
                                {isLoading ? "Saving..." : "Save Selection"}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};