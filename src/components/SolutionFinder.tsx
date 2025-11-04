"use client";

import { useMemo, useState } from "react";
import { getChallengesForIndustry, getIndustries, getSolution } from "@/constants/industrySolutions";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function SolutionFinder() {
	const { t } = useLanguage();
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

	const isStep2Enabled = Boolean(selectedIndustry);
	const isStep3Enabled = Boolean(selectedIndustry && selectedChallenge);

	return (
		<section className="mx-auto max-w-[1280px] px-6 py-20">
			<h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-center leading-tight">{t("solutionFinder.title")}</h2>

			{/* Stepper */}
			<div className="mb-6 flex items-center justify-center gap-4 text-sm md:static sticky top-16 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 rounded">
				{[t("solutionFinder.step1"), t("solutionFinder.step2"), t("solutionFinder.step3")].map((label, idx) => {
					const step = idx + 1;
					const active = (step === 1 && !selectedIndustry) || (step === 2 && selectedIndustry && !selectedChallenge) || (step === 3 && isStep3Enabled);
					const done = (step === 1 && !!selectedIndustry) || (step === 2 && !!selectedChallenge);
					return (
						<div key={label} className="flex items-center gap-2">
							<div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold ${active ? "bg-foreground text-background" : done ? "bg-foreground/20 text-foreground" : "bg-foreground/10 text-foreground/70"}`}>
								{step}
							</div>
							<div className={`${active ? "text-foreground" : "text-foreground/60"}`}>{label}</div>
							{step < 3 && <div className="mx-2 h-px w-8 bg-foreground/20" />}
						</div>
					);
				})}
			</div>

			{/* Step 1: Industry (always mounted) */}
			<div aria-label="Step 1: Select industry" className="rounded-lg border border-black/10 dark:border-white/10 p-5">
				<div className="font-medium mb-3 text-base">1. {t("solutionFinder.selectIndustry")}</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{industries.map((ind) => {
						const active = ind === selectedIndustry;
						return (
							<button
								key={ind}
								type="button"
								onClick={() => handleSelectIndustry(ind)}
								className={`text-left rounded-lg border px-4 py-3 text-base transition focus:outline-none focus:ring-2 focus:ring-foreground/40 font-medium ${active ? "bg-foreground text-background" : "hover:scale-105 hover:bg-foreground/10 transition duration-300"}`}
								aria-pressed={active}
							>
								{ind}
							</button>
						);
					})}
				</div>
			</div>

			{/* Step 2: Challenges (always mounted, disabled until industry selected) */}
			<motion.div
				aria-label="Step 2: Select challenge"
				className={`mt-6 rounded-lg border border-black/10 dark:border-white/10 p-5 relative ${!isStep2Enabled ? "opacity-60" : ""}`}
				initial={false}
				animate={{ filter: isStep2Enabled ? "none" : "opacity(0)" }}
				transition={{ filter:{duration: 0.3} }}
			>
				<div className="font-medium mb-3 text-base">2. {t("solutionFinder.chooseChallenge")}{selectedIndustry ? ` ${t("solutionFinder.inIndustry")} ${selectedIndustry}` : ""}</div>
				<div className="flex flex-wrap gap-4">
					{challenges.map((ch) => {
						const active = ch === selectedChallenge;
						return (
							<button
								key={ch}
								type="button"
								onClick={() => isStep2Enabled && handleSelectChallenge(ch)}
								disabled={!isStep2Enabled}
								className={`text-sm rounded-full border px-5 py-3.5 transition focus:outline-none focus:ring-2 focus:ring-foreground/40 disabled:cursor-not-allowed ${active ? "bg-foreground text-background" : "hover:scale-105 hover:bg-foreground/10 transition duration-300"}`}
								aria-pressed={active}
							>
								{ch}
							</button>
						);
					})}
				</div>
				{!isStep2Enabled && (
					<div className="pointer-events-none absolute inset-0 rounded-lg" />
				)}
			</motion.div>

			<motion.div
				aria-label="Step 3: See solution"
				className={`mt-6 rounded-lg border border-black/10 dark:border-white/10 p-6 min-h-[140px] relative ${!isStep3Enabled ? "opacity-60" : ""}`}
				initial={false}
				animate={{ filter: isStep3Enabled ? "none" : "opacity(0)" }}
				transition={{ duration: 0.5}}
			>
				<AnimatePresence initial={false} mode="wait">
					(
						<motion.div
							key="solution"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ type: "spring", stiffness: 320, damping: 28 }}
						>
							<div className="text-xl sm:text-2xl font-semibold leading-snug">{selectedIndustry} → {selectedChallenge} → {solution?.type}</div>
							<p className="text-base text-foreground/70 mt-2 leading-relaxed max-w-prose">{solution?.description}</p>
							<div className="flex items-center gap-3">
								<a href="/contact" className="rounded-full bg-foreground text-background px-5 py-2 text-base font-semibold hover:scale-105 transition duration-300">{t("solutionFinder.talkToUs")}</a>
								<button
									type="button"
									onClick={() => setSelectedIndustry(undefined)}
									className="rounded-full border px-5 py-2 text-base font-medium hover:bg-foreground/10 hover:scale-105 transition duration-300"
								>
									{t("solutionFinder.seeOtherChallenges")}
								</button>
							</div>
						</motion.div>
					)
				</AnimatePresence>
			</motion.div>
		</section>
	);
}


