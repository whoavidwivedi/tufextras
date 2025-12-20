import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Hourglass } from "lucide-react";
import { Link } from "react-router-dom";

export function Tools() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="container mx-auto py-12 px-4 flex-1 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <Link to="/basement">
                        <Button variant="ghost" size="sm" className="gap-2 pl-0 hover:bg-transparent hover:text-primary cursor-pointer">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Basement
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold tracking-tight">Tools</h1>
                    <p className="text-muted-foreground">A collection of utilities to speed up your workflow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* CodeBlock Generator Tool */}
                    <Link to="/tools/codeblock-generator" className="group">
                        <Card className="h-full border-muted/60 hover:border-primary/50 transition-colors cursor-pointer bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <Code2 className="h-8 w-8 mb-4 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                                <CardTitle>CodeBlock Generator</CardTitle>
                                <CardDescription>Create beautiful, accessible code snippets.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>

                    {/* Coming Soon Cards */}
                    {[1, 2].map((i) => (
                        <Card key={i} className="h-full border-muted/40 bg-muted/5 opacity-70">
                            <CardHeader>
                                <Hourglass className="h-8 w-8 mb-4 text-muted-foreground/40" />
                                <CardTitle className="text-muted-foreground">Coming Soon...</CardTitle>
                                <CardDescription className="text-muted-foreground/60">More tools are being built.</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}

                </div>
            </main>
        </div>
    );
}
