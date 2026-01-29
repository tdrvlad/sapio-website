'use client'
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import "@/components/comp.css";
import { translations } from "@/lib/translations";

export default function ProjectPage() {
    const { language, t } = useLanguage();
    const params = useParams();
    const slug = params?.slug as string;

    // Helper to get project data from translations based on slug
    // We need to map the slug to the key in translations
    const getProjectData = () => {
        const projects = translations[language].projectsPage.projects;
        
        // Map slugs to translation keys
        const slugMap: Record<string, keyof typeof projects> = {
            "ai-aflat": "aiAflat",
            "public-tenders": "publicTenders",
            "healthcare": "healthcare",
            "legaltech": "legaltech",
            "media": "media",
            "audio": "audio",
            "customer-support": "customerSupport",
            "robotics": "robotics",
            "voice": "voice",
            "semantic-rag": "semanticRAG"
        };

        const key = slugMap[slug];
        if (!key) return null;

        return projects[key];
    };

    const project = getProjectData();

    if (!project) {
        return notFound();
    }

    // Map slugs to images (since images aren't in translations object usually, or we can use the ones from ProjectsSection logic)
    const getProjectImage = (slug: string) => {
        const imageMap: Record<string, string> = {
            "ai-aflat": "/brand/ai-aflat_thumbnail.png",
            "public-tenders": "/projectsPhotos/public_tenders_project_hero.jpg",
            "healthcare": "/projectsPhotos/medtech_hero.jpg",
            "legaltech": "/projectsPhotos/legaltech_hero.jpg",
            "media": "/videos/processed/retro_software_development-poster.jpg",
            "audio": "/videos/processed/turing_machine-poster.jpg",
            "customer-support": "/videos/processed/gpt_agent-poster.jpg",
            "robotics": "/videos/processed/writing_and_robot-poster.jpg",
            "voice": "/videos/processed/andrew_ng-poster.jpg",
            "semantic-rag": "/videos/processed/digit_neural_net-poster.jpg"
        };
        return imageMap[slug] || "/projectsPhotos/projectsHero.jpg";
    };

    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative isolate min-h-[60vh] overflow-hidden flex items-center">
                <div className="absolute inset-0">
                    <Image
                        src={getProjectImage(slug)}
                        alt={"project.title"}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
                
                <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 py-24 text-center w-full">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white mb-6 backdrop-blur-md">
                            Case Study
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight mb-6">
                            {"project.title"}
                        </h1>
                        <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-light">
                            {project.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="mx-auto max-w-[1000px] px-4 sm:px-6 py-16 sm:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="prose prose-lg dark:prose-invert max-w-none"
                >
                    <div className="bg-foreground/5 rounded-2xl p-8 mb-12 border border-foreground/10">
                        <h3 className="text-2xl font-semibold mb-4">{t('projectsPage.modal.metrics')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {/* We don't have specific metrics in the translation object for all projects yet, 
                                so we'll display the description prominently instead if metrics are missing,
                                or use generic ones if we want to be safe. For now, let's show the full description.
                            */}
                             <div className="col-span-full">
                                <p className="text-lg leading-relaxed text-foreground/90 m-0">
                                    {project.fullDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Overview</h2>
                            <p className="text-xl text-foreground/80 leading-relaxed">
                                {project.shortDescription}
                            </p>
                        </div>

                        {/* If we had more detailed sections in translations, we would map them here. 
                            For now, we rely on the descriptions provided. 
                        */}
                    </div>
                </motion.div>
            </section>

            <div className="section-divider" />

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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
                </motion.div>
            </section>
        </div>
    );
}
