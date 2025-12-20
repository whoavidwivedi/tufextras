import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import { InteractiveHoverText } from "./InteractiveHoverText";

export function Hero() {
    return (
        <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-300">
            {/* Nav / Header Area */}
            <header className="absolute top-0 w-full p-6 flex justify-end items-center z-50">
                <ModeToggle />
            </header>

            <section className="flex flex-col items-center justify-center min-h-[90vh] px-4 text-center">
                <div className="container relative z-10 flex max-w-2xl flex-col items-center gap-8">

                    {/* Minimal Badge */}
                    <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
                        <Badge variant="outline" className="px-3 py-1 text-xs font-normal border-border rounded-full pointer-events-none select-none hover:bg-transparent">
                            Internal Use Only
                        </Badge>
                    </div>

                    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-6 duration-1000">
                        <h1 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl select-none">
                            <span className="mr-3">TUF</span>
                            <InteractiveHoverText text="Extras" />
                        </h1>
                        <p className="mx-auto max-w-[32rem] text-base text-muted-foreground/90 font-light leading-relaxed select-none">
                            A curated collection of utilities for the team. <br className="hidden sm:inline" />
                            Reliable tools, available when needed or internal is down.
                        </p>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 mt-2">
                        <Link to="/basement">
                            <Button
                                className="h-10 px-6 text-sm font-medium rounded-full cursor-pointer bg-primary text-primary-foreground transition-none hover:bg-primary hover:opacity-100 hover:scale-100 shadow-none active:scale-100 focus-visible:ring-0"
                            >
                                Enter TUF Extras
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Decoration - Minimal Dots or Gradient */}
                {/* Keeping it absolutely clean as per minimal request, purely relying on whitespace and typography */}
            </section>
        </div>
    );
}
