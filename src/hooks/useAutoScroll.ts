import { RefObject, useEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement>(
    containerRef: RefObject<T | null>,
    shouldAutoScroll: boolean
) {
    const isUserLocked = useRef(false);

    // Detect if user scrolls up
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const threshold = 40;
            const distanceFromBottom =
                el.scrollHeight - el.scrollTop - el.clientHeight;

            isUserLocked.current = distanceFromBottom > threshold;
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [containerRef]);

    // Auto-scroll when allowed
    useEffect(() => {
        const el = containerRef.current;
        if (!el || isUserLocked.current || !shouldAutoScroll) return;

        requestAnimationFrame(() => {
            el.scrollTo({
                top: el.scrollHeight,
                behavior: "smooth",
            });
        });
    }, [containerRef, shouldAutoScroll]);
}
