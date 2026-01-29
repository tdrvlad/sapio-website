"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "@/components/comp.css"
import { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getProjects = (t: (key: string) => string) => [
    {
        id: "ai-aflat",
        title: "ai-aflat.ro",
        subtitle: t('projectsPage.projects.aiAflat.subtitle'),
        logo: "/brand/ai-aflat_thumbnail.png",
        shortDescription: t('projectsPage.projects.aiAflat.shortDescription'),
        fullDescription: t('projectsPage.projects.aiAflat.fullDescription'),
        technologies: ["Azure OpenAI", "Python", "Next.js", "PostgreSQL"],
        metrics: ["500k+ documents", "<2s response time", "Tech for Good"],
        link: "/projects/ai-aflat"
    },
    {
        id: "public-tenders",
        title: t('projectsPage.projects.publicTenders.title'),
        subtitle: t('projectsPage.projects.publicTenders.subtitle'),
        logo: "/projectsPhotos/public_tenders_project_hero.jpg",
        shortDescription: t('projectsPage.projects.publicTenders.shortDescription'),
        fullDescription: t('projectsPage.projects.publicTenders.fullDescription'),
        technologies: ["Python", "BeautifulSoup", "FastAPI", "MongoDB"],
        metrics: ["100+ sources", "Real-time alerts", "85% match accuracy"],
        link: "/projects/public-tenders"
    },
    {
        id: "healthcare",
        title: t('projectsPage.projects.healthcare.title'),
        subtitle: t('projectsPage.projects.healthcare.subtitle'),
        logo: "/projectsPhotos/medtech_hero.jpg",
        shortDescription: t('projectsPage.projects.healthcare.shortDescription'),
        fullDescription: t('projectsPage.projects.healthcare.fullDescription'),
        technologies: ["TensorFlow", "Python", "React", "AWS"],
        metrics: ["95% accuracy", "HIPAA compliant", "10k+ records/day"],
        link: "/projects/healthcare"
    },
    {
        id: "legaltech",
        title: t('projectsPage.projects.legaltech.title'),
        subtitle: t('projectsPage.projects.legaltech.subtitle'),
        logo: "/projectsPhotos/legaltech_hero.jpg",
        shortDescription: t('projectsPage.projects.legaltech.shortDescription'),
        fullDescription: t('projectsPage.projects.legaltech.fullDescription'),
        technologies: ["NLP", "Transformers", "Python", "Elasticsearch"],
        metrics: ["Contract Analysis", "Compliance Checking", "Risk Assessment"],
        link: "/projects/legaltech"
    },
    {
        id: "media",
        title: t('projectsPage.projects.media.title'),
        subtitle: t('projectsPage.projects.media.subtitle'),
        logo: "/videos/processed/retro_software_development-poster.jpg",
        shortDescription: t('projectsPage.projects.media.shortDescription'),
        fullDescription: t('projectsPage.projects.media.fullDescription'),
        technologies: ["Generative AI", "Avatar Synthesis", "TTS", "Video Processing"],
        metrics: ["Automated News", "Virtual Presenters", "Content Generation"],
        link: "/projects/media"
    },
    {
        id: "audio",
        title: t('projectsPage.projects.audio.title'),
        subtitle: t('projectsPage.projects.audio.subtitle'),
        logo: "/videos/processed/turing_machine-poster.jpg",
        shortDescription: t('projectsPage.projects.audio.shortDescription'),
        fullDescription: t('projectsPage.projects.audio.fullDescription'),
        technologies: ["Audio Analysis", "Signal Processing", "Deep Learning"],
        metrics: ["Music Recognition", "Genre Classification", "Audio Fingerprinting"],
        link: "/projects/audio"
    },
    {
        id: "customer-support",
        title: t('projectsPage.projects.customerSupport.title'),
        subtitle: t('projectsPage.projects.customerSupport.subtitle'),
        logo: "/videos/processed/gpt_agent-poster.jpg",
        shortDescription: t('projectsPage.projects.customerSupport.shortDescription'),
        fullDescription: t('projectsPage.projects.customerSupport.fullDescription'),
        technologies: ["LLMs", "RAG", "Conversational AI", "Integration"],
        metrics: ["24/7 Support", "Instant Responses", "Ticket Automation"],
        link: "/projects/customer-support"
    },
    {
        id: "robotics",
        title: t('projectsPage.projects.robotics.title'),
        subtitle: t('projectsPage.projects.robotics.subtitle'),
        logo: "/videos/processed/writing_and_robot-poster.jpg",
        shortDescription: t('projectsPage.projects.robotics.shortDescription'),
        fullDescription: t('projectsPage.projects.robotics.fullDescription'),
        technologies: ["ROS", "Computer Vision", "Reinforcement Learning"],
        metrics: ["Autonomous Navigation", "Object Manipulation", "Real-time Control"],
        link: "/projects/robotics"
    },
    {
        id: "voice",
        title: t('projectsPage.projects.voice.title'),
        subtitle: t('projectsPage.projects.voice.subtitle'),
        logo: "/videos/processed/andrew_ng-poster.jpg",
        shortDescription: t('projectsPage.projects.voice.shortDescription'),
        fullDescription: t('projectsPage.projects.voice.fullDescription'),
        technologies: ["ASR", "Custom Models", "Speech-to-Text"],
        metrics: ["High Accuracy", "Custom Vocabulary", "Accent Adaptation"],
        link: "/projects/voice"
    },
    {
        id: "semantic-rag",
        title: t('projectsPage.projects.semanticRAG.title'),
        subtitle: t('projectsPage.projects.semanticRAG.subtitle'),
        logo: "/videos/processed/digit_neural_net-poster.jpg",
        shortDescription: t('projectsPage.projects.semanticRAG.shortDescription'),
        fullDescription: t('projectsPage.projects.semanticRAG.fullDescription'),
        technologies: ["Vector Databases", "Embeddings", "Semantic Search"],
        metrics: ["Contextual Search", "Knowledge Retrieval", "Information Extraction"],
        link: "/projects/semantic-rag"
    }
];

export default function ProjectsSection() {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    
    const PROJECTS = getProjects(t);
    const selectedProjectData = PROJECTS.find(p => p.id === selectedProject);

    return (
        <div className="font-sans">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project) => (
                        <motion.button
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3}}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            onClick={() => setSelectedProject(project.id)}
                            className="bg-white dark:bg-white/5 rounded-2xl shadow-lg  overflow-hidden border border-black/5 dark:border-white/10 text-left cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative h-48 bg-foreground/5 w-full">
                                <Image
                                    src={project.logo}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-sm text-foreground/60 mb-4">{project.subtitle}</p>
                                <p className="text-sm text-foreground/80 leading-relaxed flex-1">
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
            
            <div className="section-divider"/>

            {/* CTA */}
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-semibold"
                >
                    {t('projectsPage.cta.title')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20, scale: 0.60 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1.00 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="text-foreground/70 mt-3 text-sm sm:text-base"
                >
                    {t('projectsPage.cta.description')}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/contact"
                        className="inline-block rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:scale-110 hover:opacity-90 transition duration-300"
                    >
                        {t('projectsPage.cta.button')}
                    </Link>
                    <a
                        href="https://linkedin.com/company/sapio-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full border border-foreground px-6 py-3 text-sm font-medium hover:scale-110 hover:bg-foreground/10 transition duration-300"
                    >
                        {t('projectsPage.cta.linkedin')}
                    </a>
                </motion.div>
            </section>
        </div>
    );
}
