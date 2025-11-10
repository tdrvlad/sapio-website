"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getProjects = (t: any) => [
    {
        id: "ai-aflat",
        title: "ai-aflat.ro",
        subtitle: t('projectsPage.projects.aiAflat.subtitle'),
        logo: "/brand/ai-aflat_thumbnail.png",
        shortDescription: t('projectsPage.projects.aiAflat.shortDescription'),
        fullDescription: t('projectsPage.projects.aiAflat.fullDescription'),
        technologies: ["Azure OpenAI", "Python", "Next.js", "PostgreSQL"],
        metrics: ["500k+ documents", "<2s response time", "70% time saved"],
        link: "/projects/ai-aflat"
    },
    {
        id: "healthcare",
        title: t('projectsPage.projects.healthcare.title'),
        subtitle: t('projectsPage.projects.healthcare.subtitle'),
        logo: "/videos/processed/face_detection-poster.jpg",
        shortDescription: t('projectsPage.projects.healthcare.shortDescription'),
        fullDescription: t('projectsPage.projects.healthcare.fullDescription'),
        technologies: ["TensorFlow", "Python", "React", "AWS"],
        metrics: ["95% accuracy", "HIPAA compliant", "10k+ records/day"],
        link: "#"
    },
    {
        id: "personal-assistant",
        title: t('projectsPage.projects.personalAssistant.title'),
        subtitle: t('projectsPage.projects.personalAssistant.subtitle'),
        logo: "/videos/processed/gpt_agent-poster.jpg",
        shortDescription: t('projectsPage.projects.personalAssistant.shortDescription'),
        fullDescription: t('projectsPage.projects.personalAssistant.fullDescription'),
        technologies: ["GPT-4", "LangChain", "React Native", "Firebase"],
        metrics: ["50% productivity gain", "Natural language", "Multi-platform"],
        link: "#"
    },
    {
        id: "public-tenders",
        title: t('projectsPage.projects.publicTenders.title'),
        subtitle: t('projectsPage.projects.publicTenders.subtitle'),
        logo: "/videos/processed/traffic_detection-poster.jpg",
        shortDescription: t('projectsPage.projects.publicTenders.shortDescription'),
        fullDescription: t('projectsPage.projects.publicTenders.fullDescription'),
        technologies: ["Python", "BeautifulSoup", "FastAPI", "MongoDB"],
        metrics: ["100+ sources", "Real-time alerts", "85% match accuracy"],
        link: "#"
    }
];

export default function ProjectsSection() {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    
    const PROJECTS = getProjects(t);
    const selectedProjectData = PROJECTS.find(p => p.id === selectedProject);

    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative isolate min-h-[70vh] overflow-hidden flex items-center">
                <div className="absolute inset-0">
                    <Image
                        src="/videos/processed/eniac_1-poster.jpg"
                        alt="AI Infrastructure"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
                
                <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 py-24 text-center w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight mb-8"
                    >
                        {t('projectsPage.hero.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-12"
                    >
                        {t('projectsPage.hero.subtitle')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
                    >
                        <Link
                            href="/projects/ai-aflat"
                            className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 text-sm font-medium hover:bg-white/20 transition-all"
                        >
                            {t('projectsPage.hero.featuredButton')}
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-all"
                        >
                            {t('projectsPage.hero.startButton')}
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Case Studies Section */}
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl font-semibold mb-12 text-center"
                >
                    {t('projectsPage.caseStudies.title')}
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PROJECTS.map((project, idx) => (
                        <motion.button
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            onClick={() => setSelectedProject(project.id)}
                            className="bg-white dark:bg-white/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-black/5 dark:border-white/10 text-left cursor-pointer"
                        >
                            <div className="relative h-48 bg-foreground/5">
                                <Image
                                    src={project.logo}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-sm text-foreground/60 mb-4">{project.subtitle}</p>
                                <p className="text-base text-foreground/80 leading-relaxed">
                                    {project.shortDescription}
                                </p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* Modal Popup */}
            <AnimatePresence>
                {selectedProject && selectedProjectData && (
                    <>
                        {/* Dark Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                            onClick={() => setSelectedProject(null)}
                        />
                        
                        {/* Modal Content */}
                        <div 
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full border border-foreground/10 relative max-h-[85vh] overflow-auto"
                            >
                                {/* Project Image */}
                                <div className="relative h-48 sm:h-56 rounded-t-2xl overflow-hidden bg-foreground/5">
                                    {/* Close Button - Top Left - Above Image */}
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-all z-20 text-white"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                    <Image
                                        src={selectedProjectData.logo}
                                        alt={selectedProjectData.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 sm:p-8">
                                    <h2 className="text-2xl sm:text-3xl font-semibold mb-2">{selectedProjectData.title}</h2>
                                    <p className="text-base text-foreground/60 mb-4">{selectedProjectData.subtitle}</p>
                                    
                                    <div className="mb-6">
                                        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                                            {selectedProjectData.fullDescription}
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <h3 className="text-base font-semibold mb-2">{t('projectsPage.modal.technologies')}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProjectData.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 rounded-full bg-foreground/10 text-xs sm:text-sm font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="mb-6">
                                        <h3 className="text-base font-semibold mb-2">{t('projectsPage.modal.metrics')}</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            {selectedProjectData.metrics.map((metric) => (
                                                <div
                                                    key={metric}
                                                    className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 text-center"
                                                >
                                                    <p className="text-xs sm:text-sm font-semibold">{metric}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {selectedProjectData.link !== "#" && (
                                            <Link
                                                href={selectedProjectData.link}
                                                className="flex-1 rounded-full bg-foreground text-background px-5 py-2.5 text-sm text-center font-medium hover:opacity-90 transition"
                                            >
                                                {t('projectsPage.modal.viewButton')}
                                            </Link>
                                        )}
                                        <Link
                                            href="/contact"
                                            className="flex-1 rounded-full border border-foreground px-5 py-2.5 text-sm text-center font-medium hover:bg-foreground/10 transition"
                                        >
                                            {t('projectsPage.modal.startButton')}
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
