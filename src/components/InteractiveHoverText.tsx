import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InteractiveHoverTextProps {
    text: string;
    className?: string;
}

export function InteractiveHoverText({ text, className }: InteractiveHoverTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [spans, setSpans] = useState<HTMLSpanElement[]>([]);

    // Configuration
    const RADIUS = 200; // localized circular radius of influence in px
    const MAX_WEIGHT = 1000;
    const MIN_WEIGHT = 100;

    useEffect(() => {
        if (containerRef.current) {
            setSpans(Array.from(containerRef.current.querySelectorAll("span")));
        }
    }, [text]);

    useEffect(() => {
        if (spans.length === 0) return;

        const handleMouseMove = (e: MouseEvent) => {
            spans.forEach((span) => {
                const rect = span.getBoundingClientRect();
                const charCenterX = rect.left + rect.width / 2;
                const charCenterY = rect.top + rect.height / 2;

                const dist = Math.sqrt(
                    Math.pow(e.clientX - charCenterX, 2) + Math.pow(e.clientY - charCenterY, 2)
                );

                let weight = MIN_WEIGHT;
                if (dist < RADIUS) {
                    // Normalize distance: 0 at center, 1 at edge of radius
                    const factor = 1 - dist / RADIUS;
                    // Ease the curve (optional) - linear for now
                    weight = MIN_WEIGHT + (MAX_WEIGHT - MIN_WEIGHT) * factor;
                }

                span.style.fontVariationSettings = `'wght' ${Math.floor(weight)}`;
            });
        };

        const handleMouseLeave = () => {
            spans.forEach((span) => {
                span.style.fontVariationSettings = `'wght' ${MIN_WEIGHT}`;
            })
        }

        // Attach event listener to window or specific container? 
        // The user request says "mouse cursor has a circular radius", usually implying it works globally or at least when near. 
        // Attaching to window ensures it works even if you are just outside the text but within radius.
        window.addEventListener("mousemove", handleMouseMove);

        // Reset whenever mouse leaves window or we unmount (cleanup)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [spans]);

    return (
        <div ref={containerRef} className={cn("inline-flex", className)}>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className="transition-all duration-75 will-change-transform inline-block"
                    style={{ fontVariationSettings: `'wght' ${MIN_WEIGHT}` }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </div>
    );
}
