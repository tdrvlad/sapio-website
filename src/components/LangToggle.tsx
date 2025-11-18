"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LangToggle() {
	const { language, setLanguage } = useLanguage();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// Don't render until client-side to prevent hydration mismatch
	if (!isClient) {
		return (
			<div className="text-xs rounded-full border px-3 py-1 hover:bg-foreground/10">
				EN
			</div>
		);
	}

	return (
		<div className="flex items-center gap-1 rounded-full border px-1 py-0.5">
			<button
				onClick={() => setLanguage("en")}
				className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
					language === "en"
						? "bg-foreground text-background"
						: "text-foreground/70 hover:text-foreground"
				}`}
			>
				EN
			</button>
			<button
				onClick={() => setLanguage("ro")}
				className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
					language === "ro"
						? "bg-foreground text-background"
						: "text-foreground/70 hover:text-foreground"
				}`}
			>
				RO
			</button>
		</div>
	);
}
