"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LangToggle } from "@/components/LangToggle";

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 100);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
				scrolled ?
					"backdrop-blur bg-background/70 border-b border-black/10 dark:border-white/10" :
					"bg-transparent"
			}`}
		>
			<div className="mx-auto max-w-[1280px] px-6 py-6 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-3">
					<span className="relative block h-12 w-12">
						<Image src="/brand/logo_icon_light_background.png" alt="Sapio logo" fill className="object-contain dark:hidden" sizes="48px" />
						<Image src="/brand/logo_icon_dark_background.png" alt="Sapio logo" fill className="object-contain hidden dark:block" sizes="48px" />
					</span>
					<span className="text-sm font-semibold tracking-wide">Sapio AI</span>
				</Link>
				<nav className="hidden md:flex items-center gap-6 text-sm">
					<Link href="/services" className="hover:underline underline-offset-4">Solutions</Link>
					<Link href="/projects" className="hover:underline underline-offset-4">Projects</Link>
					<Link href="/team" className="hover:underline underline-offset-4">Team</Link>
					<Link href="/contact" className="hover:underline underline-offset-4">Contact</Link>
				</nav>
				<div className="flex items-center gap-3">
					<LangToggle />
					<Link
						href="/contact"
						className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition"
					>
						Get a consultation
					</Link>
				</div>
			</div>
		</header>
	);
}


