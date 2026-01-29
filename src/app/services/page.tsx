'use client'
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import "@/components/comp.css";
import { useState } from "react";
import AIProductsSection from "@/components/sections/AIProductsSection";

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

