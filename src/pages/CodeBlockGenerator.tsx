import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const SUPPORTED_LANGUAGES = [
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "mysql", label: "MySQL" },
    { value: "postgresql", label: "PostgreSQL" },
];

interface CodeSection {
    id: number;
    language: string;
    code: string;
}

export function CodeBlockGenerator() {
    const [numLanguages, setNumLanguages] = useState<number>(1);
    const [sections, setSections] = useState<CodeSection[]>([
        { id: 1, language: "cpp", code: "" }
    ]);

    const handleNumLanguagesChange = (value: string | null) => {
        if (!value) return;
        const num = parseInt(value);
        setNumLanguages(num);

        setSections(prev => {
            const newSections = [...prev];
            if (num > prev.length) {
                // Add more sections
                for (let i = prev.length + 1; i <= num; i++) {
                    const defaultLang = SUPPORTED_LANGUAGES[i - 1]?.value || "cpp";
                    newSections.push({ id: i, language: defaultLang, code: "" });
                }
            } else if (num < prev.length) {
                // Remove excess sections
                newSections.splice(num);
            }
            return newSections;
        });
    };

    const handleLanguageChange = (id: number, lang: string) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, language: lang } : s));
    };

    const handleCodeChange = (id: number, code: string) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, code } : s));
    };

    const [generatedHtml, setGeneratedHtml] = useState<string>("");

    const generateHtmlCode = () => {
        const buttonsHtml = sections.map((s, index) => {
            const activeClass = index === 0 ? "dsa_article_code_active" : "";
            const langLabel = SUPPORTED_LANGUAGES.find(l => l.value === s.language)?.label || s.language;
            return `<button class="code-tab ${activeClass}" data-lang="${s.language}">${langLabel}</button>`;
        }).join('');

        const tabsHtml = `<div>${buttonsHtml}</div>`;

        const contentHtml = sections.map((s, index) => {
            const activeClass = index === 0 ? "dsa_article_code_active" : "";

            // Count lines strictly by splitting on regex to capture all lines vs numbering
            // Using regex to handle different newline types safely
            const lines = s.code.split(/\r\n|\r|\n/);
            const lineCount = lines.length;

            const lineNumbers = Array.from({ length: lineCount }, (_, i) => `<span>${i + 1}</span>`).join('');

            const escapedCode = s.code
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

            return `<div class="code-block ${activeClass}" data-lang="${s.language}"><div class="line-numbers line-num">${lineNumbers}</div><pre class="wp-block-code"><code lang="${s.language}" class="language-${s.language}">${escapedCode}</code></pre></div>`;
        }).join('');

        const finalHtml = `
<div class="code-section secondary-details">
    <div class="code-tabs">
        ${tabsHtml}
        <div class="copy-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            </svg>
        </div>
    </div>
    <div class="code-content">
${contentHtml}
    </div>
</div>`;

        return finalHtml.trim();
    };

    const handleCopyHtml = async () => {
        const html = generateHtmlCode();
        try {
            await navigator.clipboard.writeText(html);
            toast.success("HTML copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy:", err);
            toast.error("Failed to copy to clipboard.");
        }
    };

    const handleGenerate = () => {
        const html = generateHtmlCode();
        setGeneratedHtml(html);
        toast.success("Code block generated successfully!");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="container mx-auto py-12 px-4 flex-1 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <Link to="/tools">
                        <Button variant="ghost" size="sm" className="gap-2 pl-0 hover:bg-transparent hover:text-primary cursor-pointer">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Tools
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold tracking-tight">CodeBlock Generator</h1>
                    <p className="text-muted-foreground">Create code blocks for your documentation.</p>
                </div>

                <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">

                    {/* Controls */}
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Configuration</CardTitle>
                            <CardDescription>Select how many code variations you need.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <Label>Number of Languages</Label>
                                <Select value={numLanguages.toString()} onValueChange={handleNumLanguagesChange}>
                                    <SelectTrigger className="w-full sm:w-[200px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num} {num === 1 ? 'Language' : 'Languages'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Code Sections */}
                    <div className="space-y-6">
                        {sections.map((section, index) => (
                            <Card key={section.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base font-medium flex items-center gap-2">
                                            <div className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs">
                                                {section.id}
                                            </div>
                                            Code Block {section.id}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <Label>Language</Label>
                                            <Select
                                                value={section.language}
                                                onValueChange={(val) => val && handleLanguageChange(section.id, val)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {SUPPORTED_LANGUAGES.map(lang => (
                                                        <SelectItem key={lang.value} value={lang.value}>
                                                            {lang.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Code</Label>
                                            <Textarea
                                                placeholder={`Paste your ${SUPPORTED_LANGUAGES.find(l => l.value === section.language)?.label} code here...`}
                                                className="font-mono text-sm min-h-[200px] resize-none overflow-y-auto"
                                                value={section.code}
                                                onChange={(e) => handleCodeChange(section.id, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Result Preview */}
                    {generatedHtml && (
                        <Card className="bg-card/50 backdrop-blur-sm animate-in fade-in">
                            <CardHeader>
                                <CardTitle>Generated HTML</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    readOnly
                                    value={generatedHtml}
                                    className="font-mono text-xs min-h-[200px]"
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions */}
                    <div className="sticky bottom-6 flex gap-4 p-4 rounded-lg border bg-background/80 backdrop-blur-md shadow-lg justify-end mt-4">
                        {generatedHtml && (
                            <Button variant="outline" className="gap-2 cursor-pointer" onClick={handleCopyHtml}>
                                <Copy className="size-4" />
                                Copy HTML
                            </Button>
                        )}
                        <Button className="gap-2 cursor-pointer" onClick={handleGenerate}>
                            <Code2 className="size-4" />
                            Generate Code Block
                        </Button>
                    </div>

                </div>
            </main>
        </div>
    );
}
