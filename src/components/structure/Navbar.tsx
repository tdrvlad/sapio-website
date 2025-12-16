"use client";

import Link from "next/link";
import Image from "next/image";
import "@/app/globals.css"
import { useEffect, useState } from "react";
import { LangToggle } from "@/components/toggle/LangToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { DarkToggle } from "@/components/toggle/DarkToggle";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navbar() {
	const { t } = useLanguage();
	const [scrolled, setScrolled] = useState(false);
	const [visible, setVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const isHome = pathname === "/";
	const isServices = pathname == "/services";

	useEffect(() => {
		const onScroll = () => {
			const currentScrollY = window.scrollY;
			
			// Update scrolled state for styling
			setScrolled(currentScrollY > 100);
			
			// Show navbar if at top of page
			if (currentScrollY < 10) {
				setVisible(true);
			}
			// Hide when scrolling down, show when scrolling up
			else if (currentScrollY > lastScrollY && currentScrollY > 100) {
				// Scrolling down
				setVisible(false);
			} else if (currentScrollY < lastScrollY) {
				// Scrolling up
				setVisible(true);
			}
			
			setLastScrollY(currentScrollY);
		};
		
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [lastScrollY]);

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
			className={`fixed inset-x-0 z-50 transition-all duration-300 border-b border-border/40 bg-background ${
				scrolled ? "top-[0px] shadow-sm" : "top-[-15px]"
			}`}
			style={{
				transform: visible ? "translateY(0)" : "translateY(-100%)",
				transition: "transform 0.3s ease-in-out"
			}}
		>
			<motion.div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center gap-3 sm:gap-6"
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
					<Link href="/services" className="relative group transition-colors">
						<span>{t("navbar.solutions")}</span>
						<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#006beb] group-hover:w-full transition-all duration-300 ease-out" style={{ transform: 'translateY(4px)' }}></span>
					</Link>
					<Link href="/projects" className="relative group transition-colors">
						<span>{t("navbar.projects")}</span>
						<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#006beb] group-hover:w-full transition-all duration-300 ease-out" style={{ transform: 'translateY(4px)' }}></span>
					</Link>
					
					<Link href="/contact" className="relative group transition-colors">
						<span>{t("navbar.contact")}</span>
						<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#006beb] group-hover:w-full transition-all duration-300 ease-out" style={{ transform: 'translateY(4px)' }}></span>
					</Link>
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
						className="md:hidden bg-background border-t border-border/60"
					>
						<nav className="mx-auto max-w-[1280px] px-6 py-6 flex flex-col gap-4">
							<Link 
								href="/services" 
								className="relative group text-base py-2 transition-colors inline-block"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span>{t("navbar.solutions")}</span>
								<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#006beb] group-hover:w-full transition-all duration-300 ease-out" style={{ transform: 'translateY(4px)' }}></span>
							</Link>
							<Link 
								href="/projects" 
								className="relative group text-base py-2 transition-colors inline-block"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span>{t("navbar.projects")}</span>
								<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#006beb] group-hover:w-full transition-all duration-300 ease-out" style={{ transform: 'translateY(4px)' }}></span>
							</Link>
							
							<Link 
								href="/contact" 
								className="relative group text-base py-2 transition-colors inline-block"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span>{t("navbar.contact")}</span>
								<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#006beb] group-hover:w-full transition-all duration-300 ease-out" style={{ transform: 'translateY(4px)' }}></span>
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