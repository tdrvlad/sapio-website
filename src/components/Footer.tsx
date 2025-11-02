"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
	const { t } = useLanguage();
	return (
		<footer className="border-t border-black/10 dark:border-white/10 mt-24">
			<div className="mx-auto max-w-[1280px] px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<span className="relative block h-8 w-8">
							<Image src="/brand/logo_icon_light_background.png" alt="Sapio logo" fill className="object-contain dark:hidden" sizes="32px" />
							<Image src="/brand/logo_icon_dark_background.png" alt="Sapio logo" fill className="object-contain hidden dark:block" sizes="32px" />
						</span>
						<span className="text-base font-semibold">Sapio AI</span>
					</div>
					<p className="text-foreground/70">{t("footer.tagline")}</p>
				</div>
				<div>
					<div className="font-semibold mb-3">{t("footer.company")}</div>
					<ul className="space-y-2">
						<li><Link href="/projects" className="hover:underline">{t("navbar.projects")}</Link></li>
						<li><Link href="/team" className="hover:underline">{t("navbar.team")}</Link></li>
						<li><Link href="/contact" className="hover:underline">{t("navbar.contact")}</Link></li>
					</ul>
				</div>
				<div>
					<div className="font-semibold mb-3">{t("footer.services")}</div>
					<ul className="space-y-2">
						<li><Link href="/services" className="hover:underline">{t("footer.overview")}</Link></li>
						<li><span className="text-foreground/60">{t("footer.chatbots")}</span></li>
						<li><span className="text-foreground/60">{t("footer.vision")}</span></li>
						<li><span className="text-foreground/60">{t("footer.speech")}</span></li>
					</ul>
				</div>
				<div>
					<div className="font-semibold mb-3">{t("footer.connect")}</div>
					<ul className="space-y-2">
						<li><a href="#" className="hover:underline">{t("footer.linkedin")}</a></li>
						<li><a href="#" className="hover:underline">{t("footer.github")}</a></li>
					</ul>
				</div>
			</div>
			<div className="border-t border-black/10 dark:border-white/10">
				<div className="mx-auto max-w-[1280px] px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/60">
					<p>{t("footer.copyright")}</p>
					<Link href="/privacy" className="hover:underline">{t("footer.privacy")}</Link>
				</div>
			</div>
		</footer>
	);
}


