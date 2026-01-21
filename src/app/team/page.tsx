'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import "@/components/comp.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TeamPage() {
    const { t } = useLanguage();

    const TEAM_MEMBERS = [
        {
            id: "vlad",
            name: t('teamPage.members.vlad.name'),
            role: t('teamPage.members.vlad.role'),
            image: "/team/pic-Vlad-Tudor.png",
            bio: t('teamPage.members.vlad.bio'),
            linkedin: "https://www.linkedin.com/in/vlad-tudor-18090a1a2/",
            expertise: [
                "Machine Learning", 
                "Product Strategy", 
                "Team Leadership"
            ],
        },
    ];

    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative isolate min-h-[80vh] overflow-hidden flex items-center">
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
                        src="/videos/processed/retro_software_development-poster.jpg"
                        alt="Team"
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
                        {t('teamPage.hero.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto"
                    >
                        {t('teamPage.hero.subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Team Members */}
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl font-semibold mb-12 text-center"
                >
                    {t('teamPage.membersTitle')}
                </motion.h2>

                <div className="flex justify-center">
                    {TEAM_MEMBERS.map((member, idx) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-white/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-black/5 dark:border-white/10 max-w-md w-full"
                        >
                            <div className="relative h-96 bg-foreground/5">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-center"
                                    style={{ objectPosition: 'center 20%' }}
                                />
                            </div>
                            
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                                <p className="text-sm text-foreground/60 mb-4">{member.role}</p>
                                <p className="text-base text-foreground/80 leading-relaxed mb-6">
                                    {member.bio}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {member.expertise.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-full bg-foreground/10 text-xs font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition w-full"
                                >
                                    <Linkedin className="h-4 w-4" />
                                    Connect on LinkedIn
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.8}} viewport={{once: true}} className="section-divider" />

            {/* CTA */}
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-semibold"
                >
                    {t('teamPage.cta.title')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="text-foreground/70 mt-3 text-sm sm:text-base"
                >
                    {t('teamPage.cta.description')}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-6"
                >
                    <Link
                        href="/contact"
                        className="inline-block rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition"
                    >
                        {t('teamPage.cta.button')}
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
