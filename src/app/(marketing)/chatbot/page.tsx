export default function ChatbotPage() {
	return (
		<div className="mx-auto max-w-[900px] px-6 py-16">
			<h1 className="text-3xl font-semibold mb-6">Sapio Chatbot</h1>
			<div className="rounded-xl border border-black/10 dark:border-white/10 p-4 h-[70vh] min-h-[520px] flex flex-col">
				<div className="flex-1 overflow-auto space-y-3">
					<div className="self-start max-w-[75%] rounded-lg bg-foreground/10 px-3 py-2 text-sm">Hi! I can answer questions about Sapio’s services, projects, and process.</div>
				</div>
				<div className="mt-3 flex items-center gap-2">
					<input className="flex-1 rounded border px-3 py-2 text-sm bg-transparent" placeholder="Ask about Sapio…" />
					<button className="rounded bg-foreground text-background px-4 py-2 text-sm">Send</button>
				</div>
				<div className="mt-2 text-xs text-foreground/60">This is a demo placeholder. Hook up your API endpoint to enable real responses.</div>
			</div>
		</div>
	);
}


