"use client";

import Link from "next/link";
import Image from "next/image";
import "@/app/globals.css"
import { useEffect, useState } from "react";
import { LangToggle } from "@/components/LangToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { DarkToggle } from "./DarkToggle";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navbar() {
	const { t } = useLanguage();
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const isHome = pathname === "/";
	const isServices = pathname == "/services";

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 100);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [mobileMenuOpen]);

	return (
		<motion.header
			className={`fixed top-[-15px] inset-x-0 z-50 transition-all duration-425 ${
				scrolled ?
					"backdrop-blur-md top-[0px]" :
					"bg-transparent"
			}`}
		>
			<motion.div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-4 sm:py-6 flex items-center gap-3 sm:gap-6"
				initial={{opacity : 0, y : -20}} animate={{opacity : 1, y : 0}} transition={{duration : 0.8, delay : isHome ? 2.0 : isServices ? 2.0 : 0}}
				>
				<div className="flex-1">
					<div className="px-2 sm:px-4 py-2 rounded-xl">
						<Link href="/" className="flex items-center gap-2 sm:gap-3">
							<span className="relative block h-10 w-10 sm:h-12 sm:w-12">
								<Image src="/brand/logo_icon_light_background.png" alt="Sapio logo" fill className="object-contain dark:hidden" sizes="48px" />
								<Image src="/brand/logo_icon_dark_background.png" alt="Sapio logo" fill className="object-contain hidden dark:block" sizes="48px" />
							</span>	
							<span className="text-sm font-semibold tracking-wide">Sapio AI</span>
						</Link>
					</div>
				</div>
				<nav className="hidden md:flex flex-1 justify-center gap-6 text-sm">
					<Link href="/services" className="hover:underline underline-offset-4">{t("navbar.solutions")}</Link>
					<Link href="/projects" className="hover:underline underline-offset-4">{t("navbar.projects")}</Link>
					
					<Link href="/contact" className="hover:underline underline-offset-4">{t("navbar.contact")}</Link>
				</nav>
				<div className="hidden md:flex flex-1 items-center justify-end gap-3">
					<LangToggle />
					<Link
						href="/contact"
						className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition"
					>
						{t("navbar.consultation")}
					</Link>
					<DarkToggle/>
				</div>
				<div className="flex md:hidden items-center gap-2">
					<LangToggle />
					<DarkToggle/>
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="p-2 rounded-lg hover:bg-foreground/10 transition"
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</motion.div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden backdrop-blur-lg"
					>
						<nav className="mx-auto max-w-[1280px] px-6 py-6 flex flex-col gap-4">
							<Link 
								href="/services" 
								className="text-base py-2 hover:underline underline-offset-4"
								onClick={() => setMobileMenuOpen(false)}
							>
								{t("navbar.solutions")}
							</Link>
							<Link 
								href="/projects" 
								className="text-base py-2 hover:underline underline-offset-4"
								onClick={() => setMobileMenuOpen(false)}
							>
								{t("navbar.projects")}
							</Link>
							
							<Link 
								href="/contact" 
								className="text-base py-2 hover:underline underline-offset-4"
								onClick={() => setMobileMenuOpen(false)}
							>
								{t("navbar.contact")}
							</Link>
							<Link
								href="/contact"
								className="mt-2 rounded-full bg-foreground text-background px-6 py-3 text-base font-medium hover:opacity-90 transition text-center"
								onClick={() => setMobileMenuOpen(false)}
							>
								{t("navbar.consultation")}
							</Link>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
}