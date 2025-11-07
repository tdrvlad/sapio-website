"use client";

import Link from "next/link";
import Image from "next/image";
import "@/app/globals.css"
import { useEffect, useState } from "react";
import { LangToggle } from "@/components/LangToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { DarkToggle } from "./DarkToggle";

export function Navbar() {
	const { t } = useLanguage();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 100);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<motion.header
			className={`fixed top-[-15px] inset-x-0 z-50 transition-all duration-425 ${
				scrolled ?
					"backdrop-blur top-[0px] bg-background/0 border-black/10 dark:border-gray/10" :
					"bg-transparent"
			}`}
		>
			<motion.div className="mx-auto max-w-[1280px] px-6 py-6 flex items-center gap-6"
				initial={{opacity : 0, y : -20}} animate={{opacity : 1, y : 0}} transition={{duration : 0.8, delay : 2.0}}
				>
				<div className="flex-1">
					<div className="px-4 py-2 rounded-xl inline-flex">
						<Link href="/" className="flex items-center gap-3">
							<span className="relative block h-12 w-12">
								<Image src="/brand/logo_icon_light_background.png" alt="Sapio logo" fill className="object-contain dark:hidden" sizes="48px" />
								<Image src="/brand/logo_icon_dark_background.png" alt="Sapio logo" fill className="object-contain hidden dark:block" sizes="48px" />
							</span>	
							<span className="text-sm  font-semibold tracking-wide">Sapio AI</span>
						</Link>
					</div>
				</div>
				<nav className="hidden md:flex flex-1  justify-center gap-6 text-sm"
				>
					<Link href="/services" className="hover:underline underline-offset-4">{t("navbar.solutions")}</Link>
					<Link href="/projects" className="hover:underline underline-offset-4">{t("navbar.projects")}</Link>
					<Link href="/team" className="hover:underline underline-offset-4">{t("navbar.team")}
					</Link>
					
					<Link href="/contact" className="hover:underline underline-offset-4">{t("navbar.contact")}</Link>
				</nav>
				<div className="flex-1 flex items-center  justify-end gap-3">
					<LangToggle />
					<Link
						href="/contact"
						className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition"
					>
						{t("navbar.consultation")}
					</Link>
					<DarkToggle/>
				</div>
			</motion.div>
		</motion.header>
	);
}