"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path {...strokeProps} d="M1.5 12S5.5 5.5 12 5.5 22.5 12 22.5 12 18.5 18.5 12 18.5 1.5 12 1.5 12Z" />
    <circle {...strokeProps} cx="12" cy="12" r="3.5" />
  </svg>
);

const WaveIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path {...strokeProps} d="M2 12c2.5 0 2.5-6 5-6s2.5 6 5 6 2.5-6 5-6 2.5 6 5 6" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path {...strokeProps} d="M20 15.5a4.5 4.5 0 0 0 1.5-3.3V8A4.5 4.5 0 0 0 17 3.5H7A4.5 4.5 0 0 0 2.5 8v4.2A4.5 4.5 0 0 0 7 16.7h6.5L19 20v-3.2" />
    <path {...strokeProps} d="M8.5 9.5h7" />
    <path {...strokeProps} d="M8.5 12.5h4" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path {...strokeProps} d="M3.5 20.5h17" />
    <path {...strokeProps} d="M6.5 17.5v-6" />
    <path {...strokeProps} d="M12 17.5v-10" />
    <path {...strokeProps} d="M17.5 17.5v-3.5" />
  </svg>
);

const AgentIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path {...strokeProps} d="M12 2.5v3" />
    <path {...strokeProps} d="M12 18.5v3" />
    <path {...strokeProps} d="M21.5 12h-3" />
    <path {...strokeProps} d="M5.5 12h-3" />
    <circle {...strokeProps} cx="12" cy="12" r="4.5" />
    <path {...strokeProps} d="M8.5 8.5 6.5 6.5" />
    <path {...strokeProps} d="M15.5 8.5 17.5 6.5" />
    <path {...strokeProps} d="M8.5 15.5 6.5 17.5" />
    <path {...strokeProps} d="M15.5 15.5 17.5 17.5" />
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <rect {...strokeProps} x="9" y="4" width="6" height="10" rx="3" />
    <path {...strokeProps} d="M5 11a7 7 0 0 0 14 0" />
    <path {...strokeProps} d="M12 18v2.5" />
  </svg>
);

export function Capabilities() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState("vision");

  const CAPABILITIES = [
    { id: "vision",       title: t("capabilities.vision.title"),      description: t("capabilities.vision.description"),      icon: EyeIcon },
    { id: "audio",        title: t("capabilities.audio.title"),       description: t("capabilities.audio.description"),       icon: MicIcon },
    { id: "nlp",          title: t("capabilities.nlp.title"),         description: t("capabilities.nlp.description"),         icon: ChatIcon },
    { id: "data-science", title: t("capabilities.dataScience.title"), description: t("capabilities.dataScience.description"), icon: ChartIcon },
    { id: "agents",       title: t("capabilities.agents.title"),      description: t("capabilities.agents.description"),      icon: AgentIcon },
    { id: "training",     title: t("capabilities.training.title"),    description: t("capabilities.training.description"),    icon: WaveIcon },
  ];

  const active = CAPABILITIES.find((c) => c.id === activeId) ?? CAPABILITIES[0];

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-14 text-center"
      >
        {t("home.capabilities.title")}
      </motion.h2>

      {/* ── Mobile: accordion ─────────────────────────────── */}
      <div className="sm:hidden flex flex-col gap-2">
        {CAPABILITIES.map((cap) => {
          const Icon = cap.icon;
          const isOpen = activeId === cap.id;
          return (
            <div key={cap.id}>
              <button
                type="button"
                onClick={() => setActiveId((prev) => (prev === cap.id ? "" : cap.id))}
                className={`w-full flex items-center gap-3 text-left rounded-xl border px-4 py-3.5 transition-colors duration-200
                  ${isOpen
                    ? "border-violet-500/40 bg-primary/5 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80"
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                  ${isOpen ? "bg-primary/15 text-primary" : "bg-foreground/8 text-foreground/60"}`}
                >
                  <Icon />
                </div>
                <span className="font-semibold text-sm">{cap.title}</span>
                <svg
                  className={`ml-auto w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pt-3 pb-5 text-sm text-muted-foreground leading-relaxed border-x border-b border-violet-500/20 rounded-b-xl bg-primary/[0.03]">
                      <p>{cap.description}</p>
                      <Link
                        href="/projects"
                        className="inline-block mt-4 text-xs font-semibold text-primary border border-primary/30 rounded-full px-4 py-1.5 hover:bg-primary/5 transition"
                      >
                        {t("home.capabilities.seeProjects")} →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── Desktop: two-panel tab layout ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="hidden sm:grid grid-cols-[260px_1fr] rounded-2xl border border-border overflow-hidden bg-card"
      >
        {/* Left: tab list */}
        <div className="border-r border-border flex flex-col">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            const isActive = activeId === cap.id;
            return (
              <button
                key={cap.id}
                type="button"
                onClick={() => setActiveId(cap.id)}
                className={`group w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-150
                  border-l-2
                  ${isActive
                    ? "bg-primary/5 border-primary text-foreground"
                    : "border-transparent hover:bg-foreground/[0.03] text-muted-foreground hover:text-foreground"
                  }
                  ${i !== 0 ? "border-t border-t-border" : ""}
                `}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-150
                  ${isActive ? "bg-primary/15 text-primary" : "bg-foreground/[0.06] text-foreground/50 group-hover:bg-foreground/10 group-hover:text-foreground/70"}`}
                >
                  <Icon />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-tight truncate">{cap.title}</div>
                  <div className={`text-xs mt-0.5 transition-colors ${isActive ? "text-primary/60" : "text-muted-foreground/60"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18 }}
            className="p-10 lg:p-14 flex flex-col justify-center min-h-[320px]"
          >
            {(() => {
              const Icon = active.icon;
              return (
                <>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <Icon />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">{active.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base mb-8 max-w-lg">
                    {active.description}
                  </p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4 w-fit"
                  >
                    {t("home.capabilities.seeProjects")}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default Capabilities;
