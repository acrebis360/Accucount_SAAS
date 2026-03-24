import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({ onClick, className = "", showLabel = true, children }) => {
    const router = useRouter();

    const handleBack = () => {
        if (onClick) {
            onClick();
        } else {
            router.back();
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className={`
                group flex items-center gap-2 px-4 h-10 
                rounded-xl border-gray-200 bg-white
                hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 
                transition-all duration-300 shadow-sm 
                font-semibold text-gray-600 
                active:scale-100
                ${className}
            `}
        >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {children ? children : (showLabel && <span>Back</span>)}
        </Button>
    );
};

export default BackButton;
