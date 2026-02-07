"use client";

import './comp.css';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import HeroVideo from '@/components/HeroVideo';
import { CLI } from '@/components/mac_cli';
import { useLanguage } from '@/contexts/LanguageContext';
import { Capabilities } from './sections/Capabilities';
import AIProductsSection from "@/components/sections/AIProductsSection";

type HomeContentProps = {
  clientLogos: string[];
  techLogos: string[];
};

export default function HomeContent({
  clientLogos}: HomeContentProps) {
  const { t } = useLanguage();

  const toAlt = (src: string) => {
    const base = src.split("/").pop() || "logo";
    const name = base.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
    return `${name} logo`;
  };

  return (
    <div className="font-sans">
      <HeroVideo />
      <section className="bg-background px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-[1100px] space-y-8">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("home.sapioConsole.title")}
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto">
              {t("home.sapioConsole.subtitle") || "Get instant answers about our services, pricing, and technical capabilities"}
            </p>
          </div>
          <CLI />
        </div>
      </section>
      {/* Flagship projects */}
<section
  id="projects"
  className="bg-background px-4 py-12 sm:px-6 sm:py-20"
>
  <div className="mx-auto w-full max-w-[1100px] space-y-8">
    
    {/* Section title (optional but recommended for parity) */}
    <h2 className="text-3xl font-semibold sm:text-4xl text-center">
      Our flagship project
    </h2>

    <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 hover:shadow-lg transition">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/* Left: Image */}
        <div className="aspect-square rounded bg-foreground/10 relative overflow-hidden">
          <Image
            src="/brand/ai-aflat_thumbnail.png"
            alt="ai-aflat thumbnail"
            fill
            className="object-contain"
            sizes="(min-width: 768px) 500px, 100vw"
          />
        </div>

        {/* Right: Content */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Key Metrics
          </h3>

          <p className="text-foreground/70 mb-4">
            ai-aflat.ro is a flagship civic project launched by Sapio AI as part of our
            <span className="font-medium"> “Tech for Good” </span>
            commitment. We built Romania&apos;s most advanced legal search platform,
            offering free access to legislation through semantic search across over
            500,000 documents. The system democratizes access to complex legal
            information.
          </p>

          <h4 className="text-sm font-semibold uppercase tracking-wide mb-2 text-foreground/80">
            Overview
          </h4>

          <ul className="list-disc list-inside text-foreground/70 text-sm space-y-1">
            <li>Flagship civic project: Free AI legal assistant</li>
            <li>Romanian legislation coverage</li>
            <li>Semantic search across ~500k legal texts</li>
          </ul>

          <div className="mt-4 flex gap-4 text-sm">
            <a
              href="https://ai-aflat.ro"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Visit website
            </a>
            <Link
              href="/projects/ai-aflat"
              className="underline underline-offset-4"
            >
              Case study
            </Link>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>


      {/* Clients logos */}
      {clientLogos.length > 0 && (
        <section className="py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
              <div className="mb-3 text-xs sm:text-sm uppercase tracking-wide text-foreground/60 text-center">
                {t("home.clients.heading")}
              </div>
              <div className="relative rounded-2xl bg-white/90 ring-1 ring-black/5 px-2 sm:px-4 py-3 sm:py-4">
                <div className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-16 bg-gradient-to-r from-gray to-transparent rounded-l-2xl" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-16 bg-gradient-to-l from-gray to-transparent rounded-r-2xl" />
                <div className="overflow-hidden">
                  <div
                    className="marquee-track flex items-center gap-6 sm:gap-10 md:gap-14"
                    style={{ width: "max-content" }}
                  >
                    <div className="flex items-center">
                      {clientLogos.map((src, i) => (
                        <a
                          key={`client-a-${i}`}
                          href="#clients"
                          className="inline-flex items-center justify-center mr-6 sm:mr-10 md:mr-14"
                        >
                          <Image
                            src={src}
                            alt={`Client: ${toAlt(src)}`}
                            width={200}
                            height={80}
                            className="h-16 sm:h-20 md:h-28 w-auto grayscale hover:scale-110 hover:style-spring hover:daping-30 hover:stiffness-100 hover: hover:grayscale-0 transition duration-450"
                          />
                        </a>
                      ))}
                    </div>
                    <div className="flex items-center">
                      {clientLogos.map((src, i) => (
                        <a
                          key={`client-b-${i}`}
                          href="#clients"
                          className="inline-flex items-center justify-center mr-6 sm:mr-10 md:mr-14"
                        >
                          <Image
                            src={src}
                            alt={`Client: ${toAlt(src)}`}
                            width={200}
                            height={80}
                            className="h-16 sm:h-20 md:h-28 w-auto grayscale hover:scale-110 hover:style-spring hover:daping-30 hover:stiffness-100 hover: hover:grayscale-0 transition duration-450"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}
      <Capabilities />

      {/* Our Process Section */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12 sm:py-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-center"
        >
          Our Process
        </motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-foreground/10 transform -translate-x-1/2" />
          <div className="space-y-8">
            {["Discovery", "Analysis", "Design", "Development", "Deployment"].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
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
                    {step === "Design" && "Architecture and user experience design"}
                    {step === "Development" && "Building and testing your custom AI solution"}
                    {step === "Deployment" && "Seamless integration and go-live support"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Get Section */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12 sm:py-20">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            What You Will Get
          </motion.h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Production-ready AI solution",
              "Comprehensive documentation", 
              "Training materials",
              "Ongoing support plan",
              "Technical audit report",
              "Risk assessment",
              "Optimization roadmap",
              "Implementation guide"
            ].map((deliverable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
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
                    <AIProductsSection/>
        
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-semibold px-4"
        >
          {t("home.cta.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-foreground/70 mt-3 text-sm sm:text-base px-4"
        >
          {t("home.cta.description")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3, scale: { duration: 0.3 } }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <Link
            href="/contact"
            className="inline-block rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium"
          >
            {t("home.cta.button")}
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-4 text-xs sm:text-sm text-foreground/60 px-4"
        >
          {t("home.cta.contact")}
        </motion.div>
      </section>
    </div>
  );
}