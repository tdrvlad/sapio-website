'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import "@/components/comp.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactContent() {
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
    
    const cta = {
        title: t('contactPage.cta.title'),
        description: t('contactPage.cta.description'),
    };
    
    return (
        <div className="font-sans">
  

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

                <div className="flex justify-center max-w-4xl mx-auto">
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
                        className="bg-white dark:bg-white/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-300 p-8 border border-black/5 dark:border-white/10 text-center max-w-md w-full"
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
                </motion.div>
                
            </section>  
        </div>
    );
}
