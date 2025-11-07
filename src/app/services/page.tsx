'use client'
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import "@/components/comp.css";

export default function ServicesPage() {
    const { t } = useLanguage();

    return (
        <div className="font-sans">
            {/* Hero */}
            <section className="mx-auto min-h-[750px] max-w-[1280px] px-6 pt-[300px] pb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25}}
                    className="text-3xl md:text-4xl font-semibold"
                >
                    {t('services.title')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.05 }}
                    className="mt-3 font-semibold text-foreground/70"
                >
                    {t('services.title2')}
                </motion.p>
            </section>

            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.8}} className="section-divider" />

            {/* CTA */}
            <section className="mx-auto max-w-[1280px] px-6 py-20 text-center">
                <motion.h2 initial={{opacity: 0, y: -20}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.6}} viewport={{once: true}} className="text-2xl font-semibold">
                    {t('home.cta.title')}
                </motion.h2>
                <motion.p initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.15}} viewport={{once: true}} className="text-foreground/70 mt-3">
                    {t('home.cta.description')}
                </motion.p>
                <motion.div initial={{opacity: 0, y: 20}} whileHover={{scale: 1.10}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.25, duration: 0.3, scale:{duration: 0.3}}} viewport={{once: true}} className="mt-6">
                    <Link href="/contact" className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium">{t('home.cta.button')}</Link>
                </motion.div>
            </section>
        </div>
    );
}

