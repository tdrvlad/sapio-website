"use client";

import { useState } from "react";

export default function ContactPage() {
	const [sent, setSent] = useState(false);

	return (
		<div className="mx-auto max-w-[800px] px-6 py-16">
			<h1 className="text-3xl font-semibold">Get a free consultation</h1>
			<p className="text-foreground/70 mt-2">Tell us about your challenge and we’ll propose a path forward.</p>

			{sent ? (
				<div className="mt-8 rounded border border-black/10 dark:border-white/10 p-6">
					<p className="font-medium">Thanks! We’ll get back to you shortly.</p>
					<p className="text-sm text-foreground/70 mt-1">You can also book a call via Calendly.</p>
				</div>
			) : (
				<form className="mt-8 grid gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
					<div className="grid sm:grid-cols-2 gap-4">
						<label className="grid gap-1 text-sm">
							<span>Name</span>
							<input required className="rounded border px-3 py-2 bg-transparent" />
						</label>
						<label className="grid gap-1 text-sm">
							<span>Email</span>
							<input required type="email" className="rounded border px-3 py-2 bg-transparent" />
						</label>
					</div>
					<label className="grid gap-1 text-sm">
						<span>Company</span>
						<input className="rounded border px-3 py-2 bg-transparent" />
					</label>
					<label className="grid gap-1 text-sm">
						<span>Project summary</span>
						<textarea rows={5} className="rounded border px-3 py-2 bg-transparent" />
					</label>
					<button className="mt-2 rounded bg-foreground text-background px-5 py-2 text-sm font-medium w-max">Send</button>
				</form>
			)}
		</div>
	);
}


