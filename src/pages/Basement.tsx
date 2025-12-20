import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Hammer, Hourglass } from "lucide-react";
import { Link } from "react-router-dom";

export function Basement() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="container mx-auto py-12 px-4 flex-1 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <Button variant="ghost" size="sm" className="gap-2 pl-0 hover:bg-transparent hover:text-primary cursor-pointer">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* Tools Card */}
                    <Link to="/tools" className="group">
                        <Card className="h-full border-muted/60 hover:border-primary/50 transition-colors cursor-pointer bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <Hammer className="h-8 w-8 mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                                <CardTitle>Tools</CardTitle>
                                <CardDescription>Essential utilities for your daily tasks.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground/80">Access the suite of internal tools.</p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Coming Soon Cards */}
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="h-full border-muted/40 bg-muted/5 opacity-70">
                            <CardHeader>
                                <Hourglass className="h-8 w-8 mb-4 text-muted-foreground/40" />
                                <CardTitle className="text-muted-foreground">Coming Soon...</CardTitle>
                                <CardDescription className="text-muted-foreground/60">More features are being built.</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}

                </div>
            </main>
        </div>
    );
}
