import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Toaster, toast } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Basement } from "@/pages/Basement";
import { Tools } from "@/pages/Tools";
import { CodeBlockGenerator } from "@/pages/CodeBlockGenerator";
import { Footer } from "@/components/Footer";

export function App() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            toast.error("Right click is disabled", {
                duration: 2000,
            });
        };

        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/basement" element={<Basement />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/tools/codeblock-generator" element={<CodeBlockGenerator />} />
                </Routes>
                <Footer />
                <Toaster position="top-center" />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;