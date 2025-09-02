export default function CaseStudyAIAflat() {
	return (
		<div className="mx-auto max-w-[900px] px-6 py-16">
			<h1 className="text-3xl font-semibold">ai-aflat.ro — AI Assistant for Romanian Legislation</h1>
			<p className="text-foreground/70 mt-2">Flagship LegalTech assistant with semantic search across ~500k legislative texts and verifiable sources.</p>
			<div className="mt-8 space-y-8">
				<section>
					<h2 className="text-xl font-semibold">The Challenge</h2>
					<p className="text-foreground/80 mt-2">Provide accurate, source-cited legal answers to the general public by indexing and retrieving granular legislation efficiently.</p>
				</section>
				<section>
					<h2 className="text-xl font-semibold">Our Solution</h2>
					<p className="text-foreground/80 mt-2">Custom knowledge base, semantic search, and RAG pipeline with strict citation to legislatie.just.ro. Modular codebase for rapid adaptation to similar domains.</p>
					<div className="mt-4 aspect-video rounded bg-foreground/10" />
				</section>
				<section>
					<h2 className="text-xl font-semibold">Outcome</h2>
					<ul className="list-disc pl-6 text-foreground/80 mt-2 space-y-1 text-sm">
						<li>~90% accuracy on primary legislation queries (internally validated)</li>
						<li>8000+ recurring organic users; media coverage</li>
					</ul>
				</section>
			</div>
		</div>
	);
}


