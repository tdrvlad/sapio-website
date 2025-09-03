import Link from "next/link";
import { SolutionFinder } from "@/components/SolutionFinder";
import HeroVideo from "@/components/HeroVideo";
import ChatBox from "@/components/ChatBox";

export default function Home() {
	return (
		<div className="font-sans">
			<HeroVideo />

			{/* Flagship projects */}
			<section id="projects" className="mx-auto max-w-[1280px] px-6 py-20 grid gap-10 md:grid-cols-2">
				<div className="rounded-lg border border-black/10 dark:border-white/10 p-6 hover:shadow-lg transition">
					<div className="aspect-video rounded bg-foreground/10 mb-5" />
					<h3 className="text-xl font-semibold">ai-aflat.ro</h3>
					<p className="text-foreground/70 mt-2">AI-powered legal assistant for Romanian legislation. Semantic search across ~500k texts with verifiable sources.</p>
					<div className="mt-4 flex gap-4 text-sm">
						<a href="https://ai-aflat.ro" target="_blank" rel="noreferrer" className="underline underline-offset-4">Visit ai-aflat.ro</a>
						<Link href="/projects/ai-aflat" className="underline underline-offset-4">View case study</Link>
					</div>
				</div>
				<div className="rounded-lg border border-black/10 dark:border-white/10 p-6 hover:shadow-lg transition">
					<div className="aspect-video rounded bg-foreground/10 mb-5" />
					<h3 className="text-xl font-semibold">Knowledge Assistant</h3>
					<p className="text-foreground/70 mt-2">Configurable proprietary chatbot integrating business knowledge for instant answers and support.</p>
					<div className="mt-4 flex gap-4 text-sm">
						<a href="https://assistant.sapio.ro" target="_blank" rel="noreferrer" className="underline underline-offset-4">Explore the Assistant</a>
						<Link href="/projects/knowledge-assistant" className="underline underline-offset-4">View case study</Link>
					</div>
				</div>
			</section>

			{/* Capabilities */}
			<section className="mx-auto max-w-[1280px] px-6 py-12">
				<h2 className="text-2xl font-semibold mb-6">Capabilities</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{["Computer Vision","Audio Processing","Natural Language","Data Science","System Agents","Training AI Models"].map((cap) => (
						<div key={cap} className="rounded-lg border border-black/10 dark:border-white/10 p-5 hover:shadow-md transition">
							<div className="h-10 w-10 rounded bg-foreground/10 mb-4" />
							<div className="font-semibold">{cap}</div>
							<p className="text-sm text-foreground/70 mt-1">Brief description about {cap.toLowerCase()} and typical use cases.</p>
						</div>
					))}
				</div>
			</section>

			<SolutionFinder />

			{/* Social proof marquees (placeholder rows) */}
			<section className="py-16 border-y border-black/10 dark:border-white/10 bg-background/60">
				<div className="overflow-hidden">
					<div className="flex gap-10 whitespace-nowrap animate-[marquee_30s_linear_infinite] px-6">
						{Array.from({ length: 12 }).map((_, i) => (
							<div key={i} className="h-8 w-28 bg-foreground/10 rounded" />
						))}
					</div>
				</div>
				<div className="overflow-hidden mt-6">
					<div className="flex gap-10 whitespace-nowrap animate-[marqueeReverse_30s_linear_infinite] px-6">
						{Array.from({ length: 14 }).map((_, i) => (
							<div key={i} className="h-8 w-28 bg-foreground/10 rounded" />
						))}
					</div>
				</div>
			</section>

			{/* Chat demo */}
			<section className="mx-auto max-w-[900px] px-6 py-20">
				<h2 className="text-2xl font-semibold mb-6">Talk to our AI</h2>
				<ChatBox />
			</section>

			{/* Process */}
			<section className="mx-auto max-w-[1280px] px-6 py-20 grid gap-8 md:grid-cols-3">
				{[
					{ t: "Understanding the problem", d: "Define objectives, constraints, and solution architecture." },
					{ t: "Iterative development", d: "Modular code, periodic deliverables, contextual validation." },
					{ t: "Integration & support", d: "Smooth deploy, documentation, and long-term maintenance." }
				].map((x) => (
					<div key={x.t} className="rounded-lg border border-black/10 dark:border-white/10 p-6">
						<div className="h-10 w-10 rounded bg-foreground/10 mb-4" />
						<div className="font-semibold">{x.t}</div>
						<p className="text-sm text-foreground/70 mt-1">{x.d}</p>
					</div>
				))}
			</section>

			{/* Final CTA */}
			<section className="mx-auto max-w-[1280px] px-6 py-24 text-center">
				<h2 className="text-3xl font-semibold">Let’s build your solution</h2>
				<p className="text-foreground/70 mt-3">Do you want to see what an AI solution tailored for your business would look like? Let’s talk.</p>
				<div className="mt-6">
					<Link href="/contact" className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium">Get a free consultation</Link>
				</div>
				<div className="mt-4 text-sm text-foreground/60">Contact: Vlad Tudor — Manager, Sapio AI</div>
			</section>
		</div>
	);
}
