export default function ProjectsPage() {
	const projects = [
		{ title: "ai-aflat.ro & AI Assistants", tags: ["LegalTech","NLP","RAG"], href: "/projects/ai-aflat" },
		{ title: "Conversational Agent for Retail", tags: ["Retail","Chatbot","LLM"], href: "/projects/retail-agent" },
		{ title: "Reporting Agent for Public Tenders", tags: ["NLP","Ranking"], href: "/projects/tenders-agent" },
		{ title: "Speech-to-Text for Romanian", tags: ["ASR","Audio"], href: "/projects/ro-asr" },
		{ title: "Music Genre Classification", tags: ["Audio","Classification"], href: "/projects/music-genres" },
		{ title: "AI Avatars & Media Generation", tags: ["Media","TTS","Video"], href: "/projects/ai-avatars" },
	];

	return (
		<div className="mx-auto max-w-[1280px] px-6 py-16">
			<h1 className="text-3xl font-semibold">Projects</h1>
			<p className="text-foreground/70 mt-2">Production-ready AI solutions delivering real value.</p>
			<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{projects.map((p) => (
					<a key={p.title} href={p.href} className="rounded-lg border border-black/10 dark:border-white/10 p-5 hover:shadow-md transition">
						<div className="aspect-video rounded bg-foreground/10 mb-4" />
						<div className="font-semibold">{p.title}</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{p.tags.map((t) => (
								<span key={t} className="text-xs rounded-full border px-2 py-0.5">{t}</span>
							))}
						</div>
					</a>
				))}
			</div>
		</div>
	);
}


