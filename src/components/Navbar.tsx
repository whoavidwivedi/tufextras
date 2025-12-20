import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { DateTimeDisplay } from "@/components/DateTimeDisplay";
import { cn } from "@/lib/utils";

export function Navbar() {
    const location = useLocation();

    return (
        <nav className="flex items-center justify-between p-6 border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity">
                    TUF Extras
                </Link>
                <div className="h-4 w-px bg-border/60" />
                <Link
                    to="/tools"
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        location.pathname === "/tools" ? "text-primary font-bold" : "text-muted-foreground"
                    )}
                >
                    Tools
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <DateTimeDisplay className="hidden sm:block mr-2" />
                <ModeToggle />
            </div>
        </nav>
    );
}
