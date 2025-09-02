"use client";

import { useState } from "react";

export function LangToggle() {
	const [lang, setLang] = useState<"EN" | "RO">("EN");
	return (
		<button
			className="text-xs rounded-full border px-3 py-1 hover:bg-foreground/10"
			onClick={() => setLang((l) => (l === "EN" ? "RO" : "EN"))}
			aria-label="Language toggle"
		>
			{lang}
		</button>
	);
}


