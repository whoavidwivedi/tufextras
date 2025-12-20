import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DateTimeDisplayProps {
    className?: string;
}

export function DateTimeDisplay({ className }: DateTimeDisplayProps) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }).format(date);

    return (
        <div className={cn("text-sm font-medium text-muted-foreground select-none", className)}>
            {formattedDate}
        </div>
    );
}
