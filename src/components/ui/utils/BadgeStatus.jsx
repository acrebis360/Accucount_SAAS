import {
    CheckCircle,
    Clock,
    PlayCircle,
    AlertCircle,
} from 'lucide-react'
import { Badge } from '../badge';


export const getStatusBadge = (status) => {
    const statusConfig = {
        "not-started": {
            label: "Not Started",
            variant: "secondary",
            color: "bg-gray-300 text-gray-800",
            icon: Clock,
        },
        "not started": {
            label: "Not Started",
            variant: "secondary",
            color: "bg-gray-300 text-gray-800",
            icon: Clock,
        },
        counted: {
            label: "Counted",
            variant: "success",
            color: "bg-green-300 text-green-800",
            icon: CheckCircle,
        },
        completed: {
            label: "Completed",
            variant: "success",
            color: "bg-yellow-100 text-black",
            icon: CheckCircle,
        },
        "in progress": {
            label: "In Progress",
            variant: "default",
            color: "bg-blue-100 text-blue-800",
            icon: PlayCircle,
        },
        "in-progress": {
            label: "In Progress",
            variant: "default",
            color: "bg-blue-100 text-blue-800",
            icon: PlayCircle,
        },
        "inprogress": {
            label: "In Progress",
            variant: "default",
            color: "bg-blue-100 text-blue-800",
            icon: PlayCircle,
        },
        fix: {
            label: "Fix",
            variant: "destructive",
            color: "bg-red-100 text-red-800",
            icon: AlertCircle,
        },
        "audit in progress": {
            label: "Audit In Progress",
            variant: "default",
            color: "bg-purple-100 text-purple-800",
            icon: PlayCircle,
        },
        "audited": {
            label: "Audited",
            variant: "success",
            color: "bg-teal-500 text-white",
            icon: CheckCircle,
        },
        "available": {
            label: "Available",
            variant: "success",
            color: "bg-green-100 text-green-800",
            icon: CheckCircle,
        },
        "not available": {
            label: "Not Available",
            variant: "destructive",
            color: "bg-red-100 text-red-800",
            icon: AlertCircle,
        },
        "generating": {
            label: "Generating",
            variant: "default",
            color: "bg-blue-100 text-blue-800",
            icon: Clock,
        },
        "pending": {
            label: "Pending",
            variant: "warning",
            color: "bg-amber-100 text-amber-800",
            icon: AlertCircle,
        },
    };

    // Normalize: to lowercase and replace underscores and dashes with spaces
    const normalizedStatus = status?.toLowerCase()?.replace(/[_-]/g, ' ');
    const config = statusConfig[normalizedStatus] ||
        statusConfig[status?.toLowerCase()] ||
        statusConfig["not started"];
    const Icon = config.icon || Clock;

    return (
        <Badge className={`${config.color} flex items-center gap-1 border-0 font-medium`}>
            <Icon className="h-3 w-3" />
            {config.label}
        </Badge>
    );
};