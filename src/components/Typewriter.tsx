"use client";

import { useEffect, useState } from "react";
import GhostLine from "@/components/GhostLine";

type TypewriterProps = {
    suggestions: string[];
    isInputFocused: boolean;
    userLabel: string;
};

export default function Typewriter({
                                       suggestions,
                                       isInputFocused,
                                       userLabel,
                                   }: TypewriterProps) {
    const [typewriterText, setTypewriterText] = useState("");
    const [typewriterIndex, setTypewriterIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const [ghostPhase, setGhostPhase] = useState<"typing" | "hold" | "fade">(
        "typing"
    );

    useEffect(() => {
        if (isInputFocused || suggestions.length === 0) return;

        const current = suggestions[typewriterIndex % suggestions.length];
        const delay = isDeleting ? 40 : 70;
        let timer: NodeJS.Timeout;

        if (!isDeleting && typewriterText === current) {
            setGhostPhase("hold");
            timer = setTimeout(() => setIsDeleting(true), 1800);
        } else if (isDeleting && typewriterText === "") {
            setGhostPhase("typing");
            timer = setTimeout(() => {
                setIsDeleting(false);
                setTypewriterIndex((prev) => (prev + 1) % suggestions.length);
            }, 420);
        } else {
            timer = setTimeout(() => {
                const nextText = isDeleting
                    ? current.slice(0, typewriterText.length - 1)
                    : current.slice(0, typewriterText.length + 1);

                setTypewriterText(nextText);

                if (isDeleting) setGhostPhase("fade");
            }, delay);
        }

        return () => clearTimeout(timer);
    }, [
        typewriterText,
        isDeleting,
        typewriterIndex,
        suggestions,
        isInputFocused,
    ]);

    // When language changes or suggestion set changes:
    useEffect(() => {
        setTypewriterText("");
        setTypewriterIndex(0);
        setIsDeleting(false);
    }, [suggestions]);

    if (isInputFocused || typewriterText.length === 0) return null;

    return (
        <GhostLine
            text={typewriterText}
            phase={ghostPhase}
            userLabel={userLabel}
        />
    );
}
