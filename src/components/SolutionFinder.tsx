"use client";

import { useMemo, useState } from "react";

const INDUSTRIES = [
	"MedTech","LegalTech","FinTech","E-commerce & Retail","Logistics","Manufacturing","Real Estate","Media","Public Sector","Education","Energy","SaaS","Automotive","Agriculture"
];

const CHALLENGES = [
	"Customer interactions","Operational automation","RAG/knowledge chatbots","Predictive analytics","Computer vision","Speech recognition","Content generation","Data pipelines & MLOps","Multimodal agents","Anomaly/fraud detection"
];

function getSuggestion(industry?: string, challenge?: string) {
	if (!industry || !challenge) return "Select an industry and a challenge to see a tailored suggestion.";
	switch (challenge) {
		case "RAG/knowledge chatbots":
			return `Private RAG assistant for ${industry}: embed your docs, deploy a secure chatbot with sources and admin controls.`;
		case "Predictive analytics":
			return `Forecasting & optimization for ${industry}: time-series models, feature store, what-if scenarios, and dashboards.`;
		case "Computer vision":
			return `Visual QA for ${industry}: defect detection/recognition with edge inference and human-in-the-loop validation.`;
		case "Speech recognition":
			return `Domain-adapted ASR for ${industry}: fine-tuned speech-to-text with custom vocabulary and diarization.`;
		case "Operational automation":
			return `Automate repetitive flows in ${industry}: agents orchestrating APIs/CRMs/ERPs with audit trails and fallbacks.`;
		case "Customer interactions":
			return `CX copilot for ${industry}: omni-channel assistant for FAQs, returns, and routing, integrated with your systems.`;
		case "Content generation":
			return `Brand-safe generation for ${industry}: templates, guardrails, approvals, and analytics.`;
		case "Data pipelines & MLOps":
			return `Data platform for ${industry}: ingestion, cleaning, lineage, training pipelines, and continuous delivery of models.`;
		case "Multimodal agents":
			return `Agents that see, read, and act in ${industry}: combine text, vision, and tools to complete tasks end-to-end.`;
		case "Anomaly/fraud detection":
			return `Risk models for ${industry}: anomaly detection with explainability, alerts, and SOC integrations.`;
		default:
			return `Tailored AI solution for ${industry}: discovery → prototype → production.`;
	}
}

export function SolutionFinder() {
	const [industry, setIndustry] = useState<string | undefined>(undefined);
	const [challenge, setChallenge] = useState<string | undefined>(undefined);
	const suggestion = useMemo(() => getSuggestion(industry, challenge), [industry, challenge]);

	return (
		<section className="mx-auto max-w-[1280px] px-6 py-20">
			<h2 className="text-2xl font-semibold mb-6">Find your AI solution</h2>
			<div className="grid gap-6 sm:grid-cols-2">
				<div className="rounded-lg border border-black/10 dark:border-white/10 p-5">
					<div className="font-medium mb-3">1. Select your industry</div>
					<div className="flex flex-wrap gap-2">
						{INDUSTRIES.map((x) => {
							const active = x === industry;
							return (
								<button
									key={x}
									onClick={() => setIndustry(active ? undefined : x)}
									className={`text-xs rounded-full border px-3 py-1 transition ${active ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}
								>
									{x}
								</button>
							);
						})}
					</div>
				</div>
				<div className="rounded-lg border border-black/10 dark:border-white/10 p-5">
					<div className="font-medium mb-3">2. Choose your challenge</div>
					<div className="flex flex-wrap gap-2">
						{CHALLENGES.map((x) => {
							const active = x === challenge;
							return (
								<button
									key={x}
									onClick={() => setChallenge(active ? undefined : x)}
									className={`text-xs rounded-full border px-3 py-1 transition ${active ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}
								>
									{x}
								</button>
							);
						})}
					</div>
				</div>
			</div>
			<div className="mt-6 rounded-lg border border-black/10 dark:border-white/10 p-6">
				<div className="font-semibold">Suggested solution</div>
				<p className="text-sm text-foreground/70 mt-1">{suggestion}</p>
				<a href="/contact" className="mt-4 inline-block rounded-full bg-foreground text-background px-4 py-2 text-sm">Discuss this solution</a>
			</div>
		</section>
	);
}


