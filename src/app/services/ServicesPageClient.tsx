'use client'
import Link from "next/link";
import Image from "next/image";
import "@/components/comp.css";
import { useState } from "react";
import AIProductsSection from "@/components/sections/AIProductsSection";
import { SolutionFinder } from '@/components/sections/SolutionFinder';
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type ServiceType = 'audit' | 'software' | 'workshops';

type ServicesPageProps = {
    techLogos: string[];
};

const SERVICE_IMAGES: Record<ServiceType, string> = {
    audit: "/servicePhotos/technicalAudit.png",
    software: "/servicePhotos/costumAi.png",
    workshops: "/servicePhotos/workshops.png",
};

const SERVICE_COLORS: Record<ServiceType, string> = {
    audit: 'from-blue-500/20 to-cyan-500/20',
    software: 'from-purple-500/20 to-pink-500/20',
    workshops: 'from-green-500/20 to-emerald-500/20',
};

const SERVICE_ICON_COLORS: Record<ServiceType, string> = {
    audit: 'from-blue-500 to-cyan-500',
    software: 'from-purple-500 to-pink-500',
    workshops: 'from-green-500 to-emerald-500',
};

export default function ServicesPage({ techLogos }: ServicesPageProps) {
    const { t } = useLanguage();
    const [selectedService, setSelectedService] = useState<ServiceType>('audit');
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    const services: ServiceType[] = ['audit', 'software', 'workshops'];

    const toAlt = (src: string) => {
        const base = src.split("/").pop() || "logo";
        const name = base.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
        return `${name} logo`;
    };

    type ServiceData = {
        title: string;
        subtitle: string;
        description: string;
        image: string;
        features: string[];
        process: string[];
        duration: string;
        deliverables: string[];
    };

    const getService = (type: ServiceType): ServiceData => ({
        title: t(`servicesPage.services.${type}.title`) as string,
        subtitle: t(`servicesPage.services.${type}.subtitle`) as string,
        description: t(`servicesPage.services.${type}.description`) as string,
        image: SERVICE_IMAGES[type],
        features: t(`servicesPage.services.${type}.features`) as unknown as string[],
        process: t(`servicesPage.services.${type}.process`) as unknown as string[],
        duration: t(`servicesPage.services.${type}.duration`) as string,
        deliverables: t(`servicesPage.services.${type}.deliverables`) as unknown as string[],
    });

    const currentService = getService(selectedService);

    return (
        <div className="font-sans bg-gradient-to-b from-background to-background/95">

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 py-20 sm:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            {t('servicesPage.hero.title')}
                        </h1>
                        <p className="text-lg sm:text-xl text-foreground/70 mb-8 leading-relaxed">
                            {t('servicesPage.hero.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
                            >
                                {t('servicesPage.hero.startButton')}
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <button
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-8 py-4 text-lg font-medium hover:bg-foreground/10 transition-all duration-300"
                            >
                                {t('servicesPage.hero.exploreButton')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Selection */}
            <section id="services" className="relative py-20 sm:py-32">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                            {t('servicesPage.chooseService.title')}
                        </h2>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            {t('servicesPage.chooseService.subtitle')}
                        </p>
                    </motion.div>

                    {/* Service Cards */}
                    <div className="grid gap-8 md:grid-cols-3 mb-16">
                        {services.map((serviceType, index) => {
                            const service = getService(serviceType);
                            const isActive = selectedService === serviceType;

                            return (
                                <motion.div
                                    key={serviceType}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedService(serviceType)}
                                    className={`relative cursor-pointer group ${
                                        isActive ? 'scale-105' : 'hover:scale-102'
                                    } transition-all duration-300`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${SERVICE_COLORS[serviceType]} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />

                                    <div className={`relative bg-background/80 backdrop-blur-sm border rounded-2xl p-8 h-full ${
                                        isActive
                                            ? 'border-foreground/30 shadow-2xl'
                                            : 'border-foreground/10 hover:border-foreground/20 hover:shadow-xl'
                                    }`}>
                                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6 ${SERVICE_ICON_COLORS[serviceType]}`}>
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {serviceType === 'audit' && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                )}
                                                {serviceType === 'software' && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                )}
                                                {serviceType === 'workshops' && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                )}
                                            </svg>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                                        <p className="text-foreground/70 mb-6">{service.subtitle}</p>

                                        <div className="space-y-2">
                                            {service.features.slice(0, 3).map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm text-foreground/60">
                                                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="mt-6 pt-6 border-t border-foreground/10"
                                            >
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-foreground/60">{t('servicesPage.serviceDetail.duration')}</span>
                                                    <span className="font-medium">{service.duration}</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Service Detail Section */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedService}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-12"
                        >
                            {/* Main Service Info */}
                            <div className="grid gap-12 lg:grid-cols-2 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-3xl sm:text-4xl font-bold mb-4">{currentService.title}</h3>
                                            <p className="text-foreground/70 text-lg leading-relaxed">
                                                {currentService.description}
                                            </p>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="bg-foreground/5 rounded-xl p-4">
                                                <div className="text-sm text-foreground/60 mb-1">{t('servicesPage.serviceDetail.duration')}</div>
                                                <div className="font-semibold">{currentService.duration}</div>
                                            </div>
                                            <div className="bg-foreground/5 rounded-xl p-4">
                                                <div className="text-sm text-foreground/60 mb-1">{t('servicesPage.serviceDetail.processSteps')}</div>
                                                <div className="font-semibold">{currentService.process.length} {t('servicesPage.serviceDetail.phases')}</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl" />
                                    <div className="relative bg-background/50 backdrop-blur-sm border border-foreground/10 rounded-2xl p-8">
                                        <Image
                                            src={currentService.image}
                                            alt={currentService.title}
                                            width={400}
                                            height={300}
                                            className="w-full h-auto rounded-xl"
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Features Grid */}
                            <div>
                                <h4 className="text-2xl font-bold mb-8 text-center">{t('servicesPage.serviceDetail.keyFeatures')}</h4>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {currentService.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            onMouseEnter={() => setHoveredFeature(index)}
                                            onMouseLeave={() => setHoveredFeature(null)}
                                            className={`relative bg-background/50 backdrop-blur-sm border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                                                hoveredFeature === index
                                                    ? 'border-foreground/30 shadow-xl scale-105'
                                                    : 'border-foreground/10 hover:border-foreground/20'
                                            }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold mb-2">{feature}</h5>
                                                    <p className="text-sm text-foreground/60">
                                                        {t('servicesPage.serviceDetail.featureDescription')}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <AIProductsSection/>

            <SolutionFinder/>

            {/* Technologies logos */}
            {techLogos.length > 0 && (
                <section className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-primary/5">
                    <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
                        <div className="mb-8 text-center">
                            <h3 className="text-2xl font-bold mb-2">{t('servicesPage.techSection.title')}</h3>
                            <p className="text-foreground/60">{t('servicesPage.techSection.description')}</p>
                        </div>
                        <div className="relative rounded-2xl bg-white/95 shadow-sm ring-1 ring-black/5 px-2 sm:px-4 py-3 sm:py-4">
                            <div className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-16 bg-gradient-to-r from-white to-transparent rounded-l-2xl" />
                            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-16 bg-gradient-to-l from-white to-transparent rounded-r-2xl" />
                            <div className="overflow-hidden">
                                <div
                                    className="marquee-track-reverse flex items-center gap-6 sm:gap-10 md:gap-14"
                                    style={{ width: "max-content" }}
                                >
                                    <div className="flex items-center">
                                        {techLogos.map((src: string, i: number) => (
                                            <a key={`tech-a-${i}`} href="#tech" className="inline-flex items-center justify-center mr-6 sm:mr-10 md:mr-14">
                                                <Image src={src} alt={`Technology: ${toAlt(src)}`} width={200} height={80} className="h-16 sm:h-20 md:h-28 w-auto grayscale hover:grayscale-0 hover:scale-105 transition duration-300" />
                                            </a>
                                        ))}
                                    </div>
                                    <div className="flex items-center">
                                        {techLogos.map((src: string, i: number) => (
                                            <a key={`tech-b-${i}`} href="#tech" className="inline-flex items-center justify-center mr-6 sm:mr-10 md:mr-14">
                                                <Image src={src} alt={`Technology: ${toAlt(src)}`} width={200} height={80} className="h-16 sm:h-20 md:h-28 w-auto grayscale hover:grayscale-0 hover:scale-105 transition duration-300" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="relative py-20 sm:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                            {t('servicesPage.cta.title')}
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            {t('servicesPage.cta.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-white text-foreground px-8 py-4 text-lg font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300"
                            >
                                {t('servicesPage.cta.startButton')}
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <a
                                href="https://linkedin.com/company/sapio-ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                            >
                                {t('servicesPage.cta.linkedinButton')}
                            </a>
                        </div>

                        <div className="mt-12 grid gap-8 sm:grid-cols-3 text-white">
                            {(t('servicesPage.cta.stats') as unknown as {value: string; label: string}[]).map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                                    <div className="text-white/80">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
