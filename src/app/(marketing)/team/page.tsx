export default function TeamPage() {
	const team = [
		{ name: "Vlad Tudor", title: "Manager, Sapio AI" },
		{ name: "Team Member", title: "AI Engineer" },
		{ name: "Team Member", title: "ML Researcher" },
		{ name: "Team Member", title: "Product Designer" },
	];

	return (
		<div className="mx-auto max-w-[1280px] px-6 py-16">
			<h1 className="text-3xl font-semibold">Team</h1>
			<p className="text-foreground/70 mt-2">The minds behind the problem-solving.</p>
			<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{team.map((m) => (
					<div key={m.name} className="rounded-lg border border-black/10 dark:border-white/10 p-5">
						<div className="aspect-square rounded bg-foreground/10 mb-4" />
						<div className="font-semibold">{m.name}</div>
						<div className="text-sm text-foreground/70">{m.title}</div>
					</div>
				))}
			</div>
		</div>
	);
}


