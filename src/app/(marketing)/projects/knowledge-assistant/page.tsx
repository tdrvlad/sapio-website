export default function CaseStudyKnowledgeAssistant() {
	return (
		<div className="mx-auto max-w-[900px] px-6 py-16">
			<h1 className="text-3xl font-semibold">Knowledge Assistant — Proprietary Chatbots Over Business Knowledge</h1>
			<p className="text-foreground/70 mt-2">Configurable system that indexes internal documents and data to deliver instant, accurate responses with citations.</p>
			<div className="mt-8 space-y-8">
				<section>
					<h2 className="text-xl font-semibold">The Challenge</h2>
					<p className="text-foreground/80 mt-2">Enable staff and customers to query complex internal knowledge securely and reliably.</p>
				</section>
				<section>
					<h2 className="text-xl font-semibold">Our Solution</h2>
					<p className="text-foreground/80 mt-2">RAG pipeline with embeddings and vector search, guarded generation, source links, and granular access control. Deployable on-prem or in cloud.</p>
					<div className="mt-4 aspect-video rounded bg-foreground/10" />
				</section>
				<section>
					<h2 className="text-xl font-semibold">Outcome</h2>
					<ul className="list-disc pl-6 text-foreground/80 mt-2 space-y-1 text-sm">
						<li>Reduced time-to-answer; consistent, cited responses</li>
						<li>Adaptable to multiple verticals and teams</li>
					</ul>
				</section>
			</div>
		</div>
	);
}


