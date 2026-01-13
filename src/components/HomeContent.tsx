"use client";

import './comp.css';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import HeroVideo from '@/components/HeroVideo';
import { CLI } from '@/components/mac_cli';
import { SolutionFinder } from '@/components/sections/SolutionFinder';
import { useLanguage } from '@/contexts/LanguageContext';
import { Capabilities } from './sections/Capabilities';

type HomeContentProps = {
  clientLogos: string[];
  techLogos: string[];
};

export default function HomeContent({
  clientLogos,
  techLogos,
}: HomeContentProps) {
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
        className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12 sm:py-20 grid gap-6 sm:gap-10 md:grid-cols-2"
      >
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            scale: { type: "spring", stiffness: 280, damping: 24 },
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.04 }}
        >
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 hover:shadow-lg transition">
            <div className="aspect-square rounded bg-foreground/10 mb-5 relative overflow-hidden">
              <Image
                src="/brand/ai-aflat_thumbnail.png"
                alt="ai-aflat thumbnail"
                fill
                className="object-contain"
                sizes="(min-width: 1280px) 600px, 100vw"
              />
            </div>
            <h3 className="text-xl font-semibold">
              {t("home.projects.aiAflat.title")}
            </h3>
            <p className="text-foreground/70 mt-2">
              {t("home.projects.aiAflat.description")}
            </p>
            <div className="mt-4 flex gap-4 text-sm">
              <a
                href="https://ai-aflat.ro"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {t("home.projects.aiAflat.visit")}
              </a>
              <Link
                href="/projects/ai-aflat"
                className="underline underline-offset-4"
              >
                {t("home.projects.aiAflat.caseStudy")}
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            scale: { type: "spring", stiffness: 280, damping: 24 },
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.04 }}
        >
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 hover:shadow-lg transition">
            <div className="aspect-square rounded bg-foreground/10 mb-5 relative overflow-hidden">
              <Image
                src="/brand/knowledge-assistant_thumbnail.png"
                alt="Knowledge Assistant thumbnail"
                fill
                className="object-contain"
                sizes="(min-width: 1280px) 600px, 100vw"
              />
            </div>
            <h3 className="text-xl font-semibold">
              {t("home.projects.knowledgeAssistant.title")}
            </h3>
            <p className="text-foreground/70 mt-2">
              {t("home.projects.knowledgeAssistant.description")}
            </p>
            <div className="mt-4 flex gap-4 text-sm">
              <a
                href="https://assistant.sapio.ro"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {t("home.projects.knowledgeAssistant.explore")}
              </a>
              <Link
                href="/projects/knowledge-assistant"
                className="underline underline-offset-4"
              >
                {t("home.projects.knowledgeAssistant.caseStudy")}
              </Link>
            </div>
          </div>
        </motion.div>
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
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <SolutionFinder />
      </motion.div>
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
                    {techLogos.map((src, i) => (
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
                    {techLogos.map((src, i) => (
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