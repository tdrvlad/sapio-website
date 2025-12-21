"use client";

import './comp.css';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import HeroVideo from '@/components/HeroVideo';
import { CLI } from '@/components/mac_cli';
import { SolutionFinder } from '@/components/sections/SolutionFinder';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSendMessage } from '@/hooks/useSendMessage';
import Transition from './Transition';

type HomeContentProps = {
  clientLogos: string[];
  techLogos: string[];
};

type CLIMessage = {
  type: "command" | "output" | "error" | "info" | "banner";
  content: string;
  timestamp?: string;
};

// Horizontal Scroll Projects Component
function HorizontalScrollProjects({ t }: { t: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollAccumulator = useRef(0);

  // Check if section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle horizontal scrolling with wheel with smooth accumulation
  useEffect(() => {
    if (!isInView) return;

    let timeoutId: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // If currently transitioning, ignore wheel events
      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      // If at the last project and scrolling down, allow normal scroll
      if (currentIndex === 1 && e.deltaY > 20) {
        scrollAccumulator.current = 0;
        return;
      }
      
      // If at the first project and scrolling up, allow normal scroll
      if (currentIndex === 0 && e.deltaY < -20) {
        scrollAccumulator.current = 0;
        return;
      }
      
      e.preventDefault();
      
      // Accumulate scroll delta for smoother feel
      scrollAccumulator.current += e.deltaY;

      // Clear existing timeout
      clearTimeout(timeoutId);

      // Threshold for triggering navigation (increased for smoother feel)
      const threshold = 100;

      if (Math.abs(scrollAccumulator.current) >= threshold) {
        setIsTransitioning(true);
        
        if (scrollAccumulator.current > 0) {
          // Scrolling down -> next project
          setCurrentIndex((prev) => {
            const next = Math.min(prev + 1, 1);
            return next;
          });
        } else {
          // Scrolling up -> previous project
          setCurrentIndex((prev) => {
            const next = Math.max(prev - 1, 0);
            return next;
          });
        }

        scrollAccumulator.current = 0;

        // Allow new transitions after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 800);
      } else {
        // Reset accumulator if user stops scrolling
        timeoutId = setTimeout(() => {
          scrollAccumulator.current = 0;
        }, 150);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(timeoutId);
    };
  }, [isInView, currentIndex, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    if (!isInView || isTransitioning) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentIndex < 1) {
          setIsTransitioning(true);
          setCurrentIndex(1);
          setTimeout(() => setIsTransitioning(false), 800);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentIndex > 0) {
          setIsTransitioning(true);
          setCurrentIndex(0);
          setTimeout(() => setIsTransitioning(false), 800);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInView, currentIndex, isTransitioning]);

  const x1 = currentIndex === 0 ? "0%" : "-100%";
  const x2 = currentIndex === 0 ? "100%" : "0%";

  const projects = [
    {
      id: 1,
      title: t("home.projects.aiAflat.title"),
      description: t("home.projects.aiAflat.description"),
      image: "/brand/ai-aflat_thumbnail.png",
      visitLink: "https://ai-aflat.ro",
      visitLabel: t("home.projects.aiAflat.visit"),
      caseStudyLink: "/projects/ai-aflat",
      caseStudyLabel: t("home.projects.aiAflat.caseStudy"),
    },
    {
      id: 2,
      title: t("home.projects.knowledgeAssistant.title"),
      description: t("home.projects.knowledgeAssistant.description"),
      image: "/brand/knowledge-assistant_thumbnail.png",
      visitLink: "https://assistant.sapio.ro",
      visitLabel: t("home.projects.knowledgeAssistant.explore"),
      caseStudyLink: "/projects/knowledge-assistant",
      caseStudyLabel: t("home.projects.knowledgeAssistant.caseStudy"),
    }
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative h-screen bg-background"
    >
      <div className="h-screen overflow-hidden flex items-center">
        {/* Scroll indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          <div className="flex gap-2">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'w-8 bg-[#006beb]' 
                    : 'w-2 bg-foreground/20 hover:bg-foreground/40'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Scroll hint */}
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-sm text-foreground/60 flex items-center gap-2"
          >
            <span>Scroll to navigate</span>
            <span className="animate-bounce">↓</span>
          </motion.div>
        )}

        <div className="relative w-full">
          {/* Project 1 */}
          <motion.div
            animate={{ x: x1 }}
            transition={{ 
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 1
            }}
            className="absolute inset-0 w-full flex items-center justify-center px-4 sm:px-6"
          >
            <div className="mx-auto max-w-[1100px] w-full">
              <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 sm:p-8 shadow-lg bg-background">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-square rounded bg-foreground/10 relative overflow-hidden">
                    <Image
                      src={projects[0].image}
                      alt={projects[0].title}
                      fill
                      className="object-contain"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      {projects[0].title}
                    </h3>
                    <p className="text-base sm:text-lg text-foreground/70">
                      {projects[0].description}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <a
                        href={projects[0].visitLink}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4 decoration-[#006beb] decoration-2 hover:text-[#006beb] transition-colors"
                      >
                        {projects[0].visitLabel} →
                      </a>
                      <Link
                        href={projects[0].caseStudyLink}
                        className="underline underline-offset-4 decoration-[#006beb] decoration-2 hover:text-[#006beb] transition-colors"
                      >
                        {projects[0].caseStudyLabel} →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div
            animate={{ x: x2 }}
            transition={{ 
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 1
            }}
            className="absolute inset-0 w-full flex items-center justify-center px-4 sm:px-6"
          >
            <div className="mx-auto max-w-[1100px] w-full">
              <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 sm:p-8 shadow-lg bg-background">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-square rounded bg-foreground/10 relative overflow-hidden">
                    <Image
                      src={projects[1].image}
                      alt={projects[1].title}
                      fill
                      className="object-contain"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      {projects[1].title}
                    </h3>
                    <p className="text-base sm:text-lg text-foreground/70">
                      {projects[1].description}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <a
                        href={projects[1].visitLink}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4 decoration-[#006beb] decoration-2 hover:text-[#006beb] transition-colors"
                      >
                        {projects[1].visitLabel} →
                      </a>
                      <Link
                        href={projects[1].caseStudyLink}
                        className="underline underline-offset-4 decoration-[#006beb] decoration-2 hover:text-[#006beb] transition-colors"
                      >
                        {projects[1].caseStudyLabel} →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HomeContent({
  clientLogos,
  techLogos,
}: HomeContentProps) {
  const { t, language } = useLanguage();
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [cliMessages, setCliMessages] = useState<CLIMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [pendingAnimationId, setPendingAnimationId] = useState<string | null>(null);

  // Initialize CLI messages on client side only to avoid hydration errors
  useEffect(() => {
    setCliMessages([
      {
        type: "banner",
        content: "Sapio AI",
        timestamp: new Date().toLocaleTimeString(),
      },
      {
        type: "info",
        content: t("home.sapioConsole.systemMessage"),
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, [t]);

  const toAlt = (src: string) => {
    const base = src.split("/").pop() || "logo";
    const name = base.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
    return `${name} logo`;
  };

  const { sendMessage } = useSendMessage({
    conversationId,
    setConversationId,
    t,
    setMessages: setChatMessages,
    setPendingAnimationId,
  });

  const suggestions = language === 'ro' ? [
    "Cu ce tipuri de soluții AI lucrați?",
    "Puteți integra soluții on-premise, fără cloud?",
    "Arată-mi un proiect Sapio din zona legal tech.",
    "Cât de repede poate fi dezvoltat un MVP?",
    "Cum decurge un audit tehnic?",
  ] : [
    "What kind of AI solutions do you build?",
    "Can you integrate with on-premise systems?",
    "Show me a Sapio project in legal tech.",
    "How fast can an MVP be developed?",
    "How does a technical audit work?",
  ];

  const handleCommand = async (command: string) => {
    // Add command to CLI messages
    setCliMessages(prev => [...prev, {
      type: "command",
      content: command,
      timestamp: new Date().toLocaleTimeString(),
    }]);

    try {
      await sendMessage(command);
    } catch (error) {
      setCliMessages(prev => [...prev, {
        type: "error",
        content: t("home.sapioConsole.errorMessage"),
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }
  };

  // Update CLI messages when chat messages change
  useEffect(() => {
    if (chatMessages.length > 0) {
      const lastMessage = chatMessages[chatMessages.length - 1];
      if (lastMessage.role === 'assistant' && lastMessage.id !== 'sapio-system') {
        setCliMessages(prev => {
          // Check if this message is already added
          const alreadyExists = prev.some(msg => 
            msg.type === 'output' && msg.content === lastMessage.content
          );
          if (alreadyExists) return prev;
          
          return [...prev, {
            type: "output",
            content: lastMessage.content,
            timestamp: new Date().toLocaleTimeString(),
            animated: true,
          }];
        });
      }
    }
  }, [chatMessages]);

  return (
    <div className="font-sans">
      <HeroVideo />

      <Transition></Transition>
      
      {/* CLI Section */}
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
          <CLI
            messages={cliMessages}
            suggestions={suggestions}
            onCommand={handleCommand}
            maxHeight="640px"
            accentColor="#006beb"
          />
        </div>
      </section>

      {/* Flagship projects - Horizontal Scroll */}
      <HorizontalScrollProjects t={t} />

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
