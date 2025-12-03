"use client";

import { useEffect, useState } from "react";

type ConsoleBootLoaderProps = {
    language: string;
    translations: unknown;
};

export function ConsoleBootLoader({ language, translations }: ConsoleBootLoaderProps) {
    const [bootLogs, setBootLogs] = useState<string[]>([]);
    const [bootComplete, setBootComplete] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const sequence = translations[language].home.sapioConsole.bootLogs || [];
        setBootLogs([]);

        if (!sequence.length) {
            setBootComplete(true);
            return;
        }

        setBootComplete(false);

        let index = 0;
        const timer = setInterval(() => {
            setBootLogs(prev => [...prev, sequence[index]]);
            index += 1;

            if (index >= sequence.length) {
                clearInterval(timer);
                setTimeout(() => setBootComplete(true), 220);
            }
        }, 240);

        return () => clearInterval(timer);
    }, [language, translations]);

    return (
        <>
            <div className="space-y-2 text-xs text-[#006beb]/70">
                {bootLogs.map((log, index) => (
                    <div key={`boot-${index}`} className="text-xs">
                        {log}
                    </div>
                ))}
            </div>

            {/* Expose boot completion state via attribute for parent */}
            <span
                data-boot-status={bootComplete ? "complete" : "pending"}
                style={{ display: "none" }}
            />
        </>
    );
}
