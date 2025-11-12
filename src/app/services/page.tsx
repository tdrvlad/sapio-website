'use client'
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import "@/components/comp.css";
import { useState } from "react";
import AIProductsSection from "@/components/AIProductsSection";

type ServiceType = 'audit' | 'software' | 'workshops';

const SERVICE_IMAGES = {
    audit: {
        image: "/servicePhotos/technicalAudit.png",
    },
    software: {
        image: "/servicePhotos/costumAi.png"
    },
    workshops: {
        image: "/servicePhotos/workshops.png"
    },
};

export default function ServicesPage() {
    const { t } = useLanguage();
    const [selectedService, setSelectedService] = useState<ServiceType>('audit');

    const services: ServiceType[] = ['audit', 'software', 'workshops'];

    const getServiceData = (serviceType: ServiceType) => ({
        title: t(`servicesPage.services.${serviceType}.title`),
        description: t(`servicesPage.services.${serviceType}.description`),
        ...SERVICE_IMAGES[serviceType],
    });

    const currentService = getServiceData(selectedService);

    const handlePrevious = () => {
        const currentIndex = services.indexOf(selectedService);
        const prevIndex = currentIndex === 0 ? services.length - 1 : currentIndex - 1;
        setSelectedService(services[prevIndex]);
    };

    const handleNext = () => {
        const currentIndex = services.indexOf(selectedService);
        const nextIndex = currentIndex === services.length - 1 ? 0 : currentIndex + 1;
        setSelectedService(services[nextIndex]);
    };

    return (
        <div className="font-sans">
            {/* Hero Section with Dynamic Background */}
            <section className="relative isolate min-h-[70vh] sm:min-h-[80vh] overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedService}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={currentService.image}
                            alt={currentService.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

                {/* Navigation Buttons */}
                <motion.button
                    onClick={handlePrevious}
                    className="pointer-events-auto absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all group duration-450"
                    aria-label="Previous service"
                >
                    <svg className="h-6 w-6 text-white group-hover:scale-130 transition-transform duratio-450" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.button>
                <motion.button
                    onClick={handleNext}
                    className="pointer-events-auto absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all group duration-450"
                    aria-label="Next service"
                >
                    <svg className="h-6 w-6 text-white group-hover:scale-130 transition-transform duration-450" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.button>

                <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24 text-center w-full">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mb-4"
                    >
                        <span className="text-xs sm:text-[16px] uppercase font-semibold tracking-wider text-white/80">{t('servicesPage.hero.eyebrow')}</span>
                    </motion.div>
                    <motion.div initial={{opacity: 0, scale: 0.60}}
                    transition={{duration: 1.2, delay: 1.0}}
                    whileInView={{opacity: 1, scale: 1.00}}
                    viewport={{once: true}}>
                        <AnimatePresence mode="wait">
                        <motion.h1
                            key={selectedService}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight"
                        >
                            {currentService.title}
                        </motion.h1>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`${selectedService}-desc`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-4 sm:mt-6 text-base sm:text-lg text-white/85 max-w-2xl mx-auto"
                        >
                            {currentService.description}
                        </motion.p>
                    </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.8, delay: 2.0}} viewport={{once: true}} className="section-divider" />
        

            {/* Service Selection Cards - Redesigned */}
         
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12 sm:py-20">
                <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                    {services.map((key) => {
                        const service = getServiceData(key);
                        const isActive = selectedService === key;
                        return (
                            <motion.button
                                key={key}
                                onClick={() => setSelectedService(key)}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`flex flex-col items-center text-center rounded-2xl border p-8 h-[180px] transition-all duration-300 ${
                                    isActive
                                        ? "border-foreground bg-foreground/10 shadow-2xl"
                                        : "border-black/10 dark:border-white/10 hover:border-foreground/50 hover:shadow-xl"
                                }`}
                            >
                                <div className="flex-1 flex items-center justify-center">
                                    <h3 className="text-xl sm:text-2xl font-semibold">{service.title}</h3>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
                
                {/* Expanded Description Below - Centered */}
                <AnimatePresence mode="wait">
                    {selectedService && (
                        <motion.div
                            key={selectedService}
                            initial={{ opacity: 0, y: -20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -20, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="mt-8 overflow-hidden"
                        >
                            <div className="max-w-3xl mx-auto text-center">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                    className="rounded-2xl border border-foreground/20 bg-foreground/5 p-8"
                                >
                                    <h4 className="text-2xl font-semibold mb-4">{getServiceData(selectedService).title}</h4>
                                    <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                                        {getServiceData(selectedService).description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <AIProductsSection/>

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
                    {t('servicesPage.cta.title')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20, scale: 0.60 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1.00 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="text-foreground/70 mt-3 text-sm sm:text-base"
                >
                    {t('servicesPage.cta.description')}
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
                        {t('servicesPage.cta.button')}
                    </Link>
                    <a
                        href="https://linkedin.com/company/sapio-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full border border-foreground px-6 py-3 text-sm font-medium hover:scale-110 hover:bg-foreground/10 transition duration-300"
                    >
                        {t('servicesPage.cta.linkedin')}
                    </a>
                </motion.div>
            </section>
        </div>
    );
}

