'use client'
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import "@/components/comp.css";
import { useState } from "react";
import AIProductsSection from "@/components/sections/AIProductsSection";
import { SolutionFinder } from '@/components/sections/SolutionFinder';
import { motion, AnimatePresence } from "framer-motion";

type ServiceType = 'audit' | 'software' | 'workshops';

type ServicesPageProps = {
    techLogos: string[];
};

const SERVICE_DATA = {
    audit: {
        title: "AI Technical Audit",
        subtitle: "Comprehensive AI Infrastructure Assessment",
        description: "Our expert team conducts a thorough evaluation of your current AI capabilities, infrastructure, and processes. We identify opportunities for optimization, assess risks, and provide actionable recommendations to enhance your AI initiatives.",
        image: "/servicePhotos/technicalAudit.png",
        features: [
            "Infrastructure analysis & optimization",
            "Model performance evaluation",
            "Data pipeline assessment", 
            "Security & compliance review",
            "ROI analysis & recommendations"
        ],
        process: ["Discovery", "Analysis", "Assessment", "Recommendations", "Roadmap"],
        duration: "2-4 weeks",
        deliverables: ["Technical audit report", "Risk assessment", "Optimization roadmap", "Implementation guide"]
    },
    software: {
        title: "Custom AI Solutions",
        subtitle: "Tailor-Made AI Software Development",
        description: "We design and build bespoke AI solutions that address your specific business challenges. From concept to deployment, our team delivers cutting-edge AI applications that drive real business value and competitive advantage.",
        image: "/servicePhotos/costumAi.png",
        features: [
            "Custom model development",
            "End-to-end solution design",
            "Integration with existing systems",
            "Scalable architecture",
            "Ongoing optimization & support"
        ],
        process: ["Requirements", "Design", "Development", "Testing", "Deployment"],
        duration: "3-6 months",
        deliverables: ["Production-ready AI solution", "Documentation", "Training materials", "Support plan"]
    },
    workshops: {
        title: "AI Training & Workshops",
        subtitle: "Empowering Your Team with AI Knowledge",
        description: "Transform your organization with comprehensive AI training programs. Our hands-on workshops and courses are designed to upskill your teams, from executives to technical practitioners, ensuring successful AI adoption and innovation.",
        image: "/servicePhotos/workshops.png",
        features: [
            "Executive AI strategy sessions",
            "Technical team training",
            "Hands-on workshops",
            "Custom curriculum design",
            "Post-training support"
        ],
        process: ["Assessment", "Curriculum Design", "Training", "Practice", "Evaluation"],
        duration: "1-2 weeks per program",
        deliverables: ["Training materials", "Certificate of completion", "Action plans", "Resources"]
    }
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

    const currentService = SERVICE_DATA[selectedService];

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
                            AI Services That Transform Business
                        </h1>
                        <p className="text-lg sm:text-xl text-foreground/70 mb-8 leading-relaxed">
                            From strategic AI audits to custom solution development and team training, 
                            we provide comprehensive AI services that drive measurable results and sustainable growth.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
                            >
                                Start Your AI Journey
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <button
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-8 py-4 text-lg font-medium hover:bg-foreground/10 transition-all duration-300"
                            >
                                Explore Services
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
                            Choose Your AI Service Path
                        </h2>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            Select the service that best matches your current needs and goals
                        </p>
                    </motion.div>

                    {/* Service Cards */}
                    <div className="grid gap-8 md:grid-cols-3 mb-16">
                        {services.map((serviceType, index) => {
                            const service = SERVICE_DATA[serviceType];
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
                                    <div className={`absolute inset-0 bg-gradient-to-r ${
                                        serviceType === 'audit' ? 'from-blue-500/20 to-cyan-500/20' :
                                        serviceType === 'software' ? 'from-purple-500/20 to-pink-500/20' :
                                        'from-green-500/20 to-emerald-500/20'
                                    } rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />
                                    
                                    <div className={`relative bg-background/80 backdrop-blur-sm border rounded-2xl p-8 h-full ${
                                        isActive 
                                            ? 'border-foreground/30 shadow-2xl' 
                                            : 'border-foreground/10 hover:border-foreground/20 hover:shadow-xl'
                                    }`}>
                                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6 ${
                                            serviceType === 'audit' ? 'from-blue-500 to-cyan-500' :
                                            serviceType === 'software' ? 'from-purple-500 to-pink-500' :
                                            'from-green-500 to-emerald-500'
                                        }`}>
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
                                                    <span className="text-foreground/60">Duration</span>
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
                                                <div className="text-sm text-foreground/60 mb-1">Duration</div>
                                                <div className="font-semibold">{currentService.duration}</div>
                                            </div>
                                            <div className="bg-foreground/5 rounded-xl p-4">
                                                <div className="text-sm text-foreground/60 mb-1">Process Steps</div>
                                                <div className="font-semibold">{currentService.process.length} phases</div>
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
                                <h4 className="text-2xl font-bold mb-8 text-center">Key Features & Benefits</h4>
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
                                                        Comprehensive solution designed to maximize your AI investment and drive business growth.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Process Timeline */}
                            <div>
                                <h4 className="text-2xl font-bold mb-8 text-center">Our Process</h4>
                                <div className="relative">
                                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-foreground/10 transform -translate-x-1/2" />
                                    <div className="space-y-8">
                                        {currentService.process.map((step, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * index }}
                                                className={`flex items-center gap-8 ${
                                                    index % 2 === 0 ? 'flex-row-reverse' : ''
                                                }`}
                                            >
                                                <div className="flex-1" />
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
                                                        {index + 1}
                                                    </div>
                                                </div>
                                                <div className="flex-1 bg-background/50 backdrop-blur-sm border border-foreground/10 rounded-xl p-6">
                                                    <h5 className="font-semibold text-lg mb-2">{step}</h5>
                                                    <p className="text-foreground/60">
                                                        {step === "Discovery" && "We understand your business goals and current challenges"}
                                                        {step === "Analysis" && "Deep dive into your existing systems and requirements"}
                                                        {step === "Assessment" && "Comprehensive evaluation of opportunities and risks"}
                                                        {step === "Requirements" && "Detailed specification of your AI solution needs"}
                                                        {step === "Design" && "Architecture and user experience design"}
                                                        {step === "Development" && "Building and testing your custom AI solution"}
                                                        {step === "Testing" && "Rigorous quality assurance and validation"}
                                                        {step === "Deployment" && "Seamless integration and go-live support"}
                                                        {step === "Recommendations" && "Actionable insights and strategic guidance"}
                                                        {step === "Roadmap" && "Long-term AI strategy and implementation plan"}
                                                        {step === "Curriculum Design" && "Customized learning paths for your team"}
                                                        {step === "Training" && "Hands-on sessions and knowledge transfer"}
                                                        {step === "Practice" && "Real-world exercises and case studies"}
                                                        {step === "Evaluation" && "Assessment of skills and knowledge retention"}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Deliverables */}
                            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
                                <h4 className="text-2xl font-bold mb-6 text-center">What You'll Get</h4>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {currentService.deliverables.map((deliverable, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 * index }}
                                            className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-lg p-4"
                                        >
                                            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium">{deliverable}</span>
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
                            <h3 className="text-2xl font-bold mb-2">Technologies We Work With</h3>
                            <p className="text-foreground/60">Cutting-edge tools and frameworks for powerful AI solutions</p>
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

            {/* Enhanced CTA Section */}
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
                            Ready to Transform Your Business with AI?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Let's discuss how our AI services can help you achieve your goals and drive innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-white text-foreground px-8 py-4 text-lg font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300"
                            >
                                Get Started Today
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
                                Follow Us on LinkedIn
                            </a>
                        </div>
                        
                        <div className="mt-12 grid gap-8 sm:grid-cols-3 text-white">
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-2">50+</div>
                                <div className="text-white/80">AI Projects Delivered</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-2">95%</div>
                                <div className="text-white/80">Client Satisfaction</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-2">24/7</div>
                                <div className="text-white/80">Support Available</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

