export default function ServicesPage() {
	const caps = [
		"Computer Vision",
		"Audio Processing",
		"Natural Language",
		"Data Science",
		"System Agents",
		"Training AI Models",
	];

	return (
		<div className="mx-auto max-w-[1280px] px-6 py-16">
			<h1 className="text-3xl font-semibold">Solutions</h1>
			<p className="text-foreground/70 mt-2">Tailor-made AI technology for your business.</p>
			<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{caps.map((c) => (
					<a key={c} href="#" className="rounded-lg border border-black/10 dark:border-white/10 p-5 hover:shadow-md transition">
						<div className="h-10 w-10 rounded bg-foreground/10 mb-4" />
						<div className="font-semibold">{c}</div>
						<p className="text-sm text-foreground/70 mt-1">Explore patterns, stacks, and timelines for {c.toLowerCase()} projects.</p>
					</a>
				))}
			</div>
		</div>
	);
}


