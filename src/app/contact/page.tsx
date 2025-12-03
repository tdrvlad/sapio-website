'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import "@/components/comp.css";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
    const { t } = useLanguage();
    
    const hero = {
        title: t('contactPage.hero.title'),
        subtitle: t('contactPage.hero.subtitle'),
    };
    
    const infoTitle = t('contactPage.infoTitle');
    
    const linkedin = {
        title: t('contactPage.linkedin.title'),
        description: t('contactPage.linkedin.description'),
        cta: t('contactPage.linkedin.cta'),
    };
    
    const email = {
        title: t('contactPage.email.title'),
        description: t('contactPage.email.description'),
    };
    
    const cta = {
        title: t('contactPage.cta.title'),
        description: t('contactPage.cta.description'),
    };
    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative isolate min-h-[70vh] overflow-hidden flex items-center">
                <motion.div 
                    className="absolute inset-0"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                        duration: 3,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 0
                    }}
                >
                    <Image
                        src="/videos/processed/writing_and_robot-poster.jpg"
                        alt="Contact"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
                
                <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 py-24 text-center w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight mb-8"
                    >
                        {hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto"
                    >
                        {hero.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Contact Options */}
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl font-semibold mb-12 text-center"
                >
                    {infoTitle}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* LinkedIn Card */}
                    <motion.a
                        href="https://www.linkedin.com/in/vlad-tudor-18090a1a2/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white dark:bg-white/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-300 p-8 border border-black/5 dark:border-white/10 text-center"
                    >
                        <div className="h-16 w-16 rounded-full bg-[#0077B5] flex items-center justify-center mx-auto mb-4">
                            <Linkedin className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">{linkedin.title}</h3>
                        <p className="text-foreground/70 mb-4">
                            {linkedin.description}
                        </p>
                        <span className="text-sm font-medium text-foreground/60">
                            {linkedin.cta}
                        </span>
                    </motion.a>

                    {/* Email Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white dark:bg-white/5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-8 border border-black/5 dark:border-white/10 text-center"
                    >
                        <div className="h-16 w-16 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-4">
                            <Mail className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">{email.title}</h3>
                        <p className="text-foreground/70 mb-4">
                            {email.description}
                        </p>
                        <a 
                            href="mailto:vlad.tudor@sapio.ro"
                            className="text-sm font-medium text-foreground hover:underline"
                        >
                            vlad.tudor@sapio.ro
                        </a>
                    </motion.div>
                </div>
            </section>

            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.8}} viewport={{once: true}} className="section-divider" />

            {/* Additional Info */}
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-semibold mb-4"
                >
                    {cta.title}
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="text-foreground/70 text-sm sm:text-base max-w-2xl mx-auto"
                >
                    {cta.description}
                    <motion.div
                initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="text-foreground/70 text-sm sm:text-base py-5 max-w-2xl mx-auto">
                    <Link
            href="/contact"
            className="inline-block rounded-full bg-foreground hover:scale-110 text-background px-6 py-3 text-sm font-medium transition duration-300"
          >
            {t("contactPage.cta.button")}
          </Link>
                </motion.div>
                </motion.div>
                
            </section>  
        </div>
    );
}

