'use client'
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import "@/components/comp.css";
import { useState } from "react";
import AIProductsSection from "@/components/sections/AIProductsSection";
import { SolutionFinder } from '@/components/sections/SolutionFinder';

type ServiceType = 'audit' | 'software' | 'workshops';

type ServicesPageProps = {
    techLogos: string[];
};

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

export default function ServicesPage({ techLogos }: ServicesPageProps) {
    const { t } = useLanguage();
    const [selectedService, setSelectedService] = useState<ServiceType>('audit');

    const services: ServiceType[] = ['audit', 'software', 'workshops'];

    const toAlt = (src: string) => {
        const base = src.split("/").pop() || "logo";
        const name = base.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
        return `${name} logo`;
    };

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
         
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12 sm:py-20">
                <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                    {services.map((key) => {
                        const service = getServiceData(key);
                        const isActive = selectedService === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setSelectedService(key)}
                                className={`flex flex-col items-center text-center rounded-2xl border p-8 h-[180px] transition-all duration-300 ${
                                    isActive
                                        ? "border-foreground bg-foreground/10 shadow-2xl"
                                        : "border-black/10 dark:border-white/10 hover:border-foreground/50 hover:shadow-xl"
                                }`}
                            >
                                <div className="flex-1 flex items-center justify-center">
                                    <h3 className="text-xl sm:text-2xl font-semibold">{service.title}</h3>
                                </div>
                            </button>
                        );
                    })}
                </div>
                
                {/* Expanded Description Below - Centered */}
                {selectedService && (
                    <div className="mt-8 overflow-hidden">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="rounded-2xl border border-foreground/20 bg-foreground/5 p-8">
                                <h4 className="text-2xl font-semibold mb-4">{getServiceData(selectedService).title}</h4>
                                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                                    {getServiceData(selectedService).description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <AIProductsSection/>

            <SolutionFinder/>

            {/* Technologies logos */}
            {techLogos.length > 0 && (
                <section className="py-8 sm:py-12">
                    <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
                        <div className="mb-3 text-xs sm:text-sm uppercase tracking-wide text-foreground/60 text-center">
                            {t("home.technologies.heading")}
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
                                            <a
                                                key={`tech-a-${i}`}
                                                href="#tech"
                                                className="inline-flex items-center justify-center mr-6 sm:mr-10 md:mr-14"
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`Technology: ${toAlt(src)}`}
                                                    width={200}
                                                    height={80}
                                                    className="h-16 sm:h-20 md:h-28 w-auto grayscale hover:grayscale-0 hover:scale-105 transition duration-300"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                    <div className="flex items-center">
                                        {techLogos.map((src: string, i: number) => (
                                            <a
                                                key={`tech-b-${i}`}
                                                href="#tech"
                                                className="inline-flex items-center justify-center mr-6 sm:mr-10 md:mr-14"
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`Technology: ${toAlt(src)}`}
                                                    width={200}
                                                    height={80}
                                                    className="h-16 sm:h-20 md:h-28 w-auto grayscale hover:grayscale-0 hover:scale-105 transition duration-300"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <div className="section-divider"/>
            {/* CTA */}
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24 text-center">
                <h2
                    className="text-2xl sm:text-3xl font-semibold"
                >
                    {t('servicesPage.cta.title')}
                </h2>
                <p
                    className="text-foreground/70 mt-3 text-sm sm:text-base"
                >
                    {t('servicesPage.cta.description')}
                </p>
                <div
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
                </div>
            </section>
        </div>
    );
}

