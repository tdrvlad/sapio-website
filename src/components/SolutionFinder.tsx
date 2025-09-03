"use client";

import { useMemo, useState } from "react";
import { getChallengesForIndustry, getIndustries, getSolution } from "@/constants/industrySolutions";

export function SolutionFinder() {
	const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>(undefined);
	const [selectedChallenge, setSelectedChallenge] = useState<string | undefined>(undefined);

	const industries = useMemo(() => getIndustries(), []);
	const challenges = useMemo(() => getChallengesForIndustry(selectedIndustry), [selectedIndustry]);
	const solution = useMemo(() => getSolution(selectedIndustry, selectedChallenge), [selectedIndustry, selectedChallenge]);

	function handleSelectIndustry(ind: string) {
		setSelectedIndustry((prev) => (prev === ind ? undefined : ind));
		setSelectedChallenge(undefined);
	}

	function handleSelectChallenge(ch: string) {
		setSelectedChallenge((prev) => (prev === ch ? undefined : ch));
	}

	return (
		<section className="mx-auto max-w-[1280px] px-6 py-20">
			<h2 className="text-2xl font-semibold mb-6">Find your AI solution</h2>
			{/* Step 1: Industry */}
			<div className="rounded-lg border border-black/10 dark:border-white/10 p-5">
				<div className="font-medium mb-3">1. Select your industry</div>
				<div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
					{industries.map((ind) => {
						const active = ind === selectedIndustry;
						return (
							<button
								key={ind}
								onClick={() => handleSelectIndustry(ind)}
								className={`text-left rounded-lg border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-foreground/40 ${active ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}
								aria-pressed={active}
							>
								{ind}
							</button>
						);
					})}
				</div>
			</div>

			{/* Step 2: Challenges (progressive disclosure) */}
			{selectedIndustry && (
				<div className="mt-6 rounded-lg border border-black/10 dark:border-white/10 p-5">
					<div className="font-medium mb-3">2. Choose your challenge in {selectedIndustry}</div>
					<div className="flex flex-wrap gap-2">
						{challenges.map((ch) => {
							const active = ch === selectedChallenge;
							return (
								<button
									key={ch}
									onClick={() => handleSelectChallenge(ch)}
									className={`text-xs rounded-full border px-3 py-1 transition focus:outline-none focus:ring-2 focus:ring-foreground/40 ${active ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}
									aria-pressed={active}
								>
									{ch}
								</button>
							);
						})}
					</div>
				</div>
			)}

			{/* Step 3: Solution (progressive disclosure) */}
			{selectedIndustry && selectedChallenge && (
				<div className="mt-6 rounded-lg border border-black/10 dark:border-white/10 p-6">
					<div className="text-sm text-foreground/60 mb-2">3. Recommended solution</div>
					<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
						<div>
							<div className="text-lg font-semibold">{selectedIndustry} → {selectedChallenge} → {solution?.type}</div>
							<p className="text-sm text-foreground/70 mt-2">{solution?.description}</p>
						</div>
						<div className="flex items-center gap-3">
							<a href="/contact" className="rounded-full bg-foreground text-background px-4 py-2 text-sm">Talk to us</a>
							<button
								onClick={() => setSelectedChallenge(undefined)}
								className="rounded-full border px-4 py-2 text-sm hover:bg-foreground/10"
							>
								See other challenges
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}


