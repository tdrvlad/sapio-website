"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Capability = {
  id: string;
  title: string;
  description: string;
  icon: () => JSX.Element;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground/90">
    <path {...strokeProps} d="M1.5 12S5.5 5.5 12 5.5 22.5 12 22.5 12 18.5 18.5 12 18.5 1.5 12 1.5 12Z" />
    <circle {...strokeProps} cx="12" cy="12" r="3.5" />
  </svg>
);

const WaveIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground/90">
    <path {...strokeProps} d="M2 12c2.5 0 2.5-6 5-6s2.5 6 5 6 2.5-6 5-6 2.5 6 5 6" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground/90">
    <path {...strokeProps} d="M20 15.5a4.5 4.5 0 0 0 1.5-3.3V8A4.5 4.5 0 0 0 17 3.5H7A4.5 4.5 0 0 0 2.5 8v4.2A4.5 4.5 0 0 0 7 16.7h6.5L19 20v-3.2" />
    <path {...strokeProps} d="M8.5 9.5h7" />
    <path {...strokeProps} d="M8.5 12.5h4" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground/90">
    <path {...strokeProps} d="M3.5 20.5h17" />
    <path {...strokeProps} d="M6.5 17.5v-6" />
    <path {...strokeProps} d="M12 17.5v-10" />
    <path {...strokeProps} d="M17.5 17.5v-3.5" />
  </svg>
);

const AgentIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground/90">
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
  <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground/90">
    <rect {...strokeProps} x="9" y="4" width="6" height="10" rx="3" />
    <path {...strokeProps} d="M5 11a7 7 0 0 0 14 0" />
    <path {...strokeProps} d="M12 18v2.5" />
  </svg>
);

const CAPABILITIES: Capability[] = [
  {
    id: "vision",
    title: "Computer Vision",
    description:
      "Image and video understanding: detection, segmentation, OCR, quality inspection, and medical imaging pipelines. From on-device to cloud-scale processing.",
    icon: EyeIcon,
  },
  {
    id: "audio",
    title: "Audio & Speech",
    description:
      "ASR/TTS, call analytics, speaker diarization, and wake-word detection. Real-time and batch processing with multilingual support.",
    icon: MicIcon,
  },
  {
    id: "nlp",
    title: "Natural Language",
    description:
      "RAG chat, summarization, document understanding, and information extraction — grounded answers with citations over your knowledge.",
    icon: ChatIcon,
  },
  {
    id: "data-science",
    title: "Data Science",
    description:
      "Forecasting, anomaly detection, ranking, and personalization. Build interpretable models that drive tangible business outcomes.",
    icon: ChartIcon,
  },
  {
    id: "agents",
    title: "System Agents",
    description:
      "Workflow agents that integrate with your stack: ticketing, CRMs, and ops tools. Guarded actions with human-in-the-loop.",
    icon: AgentIcon,
  },
  {
    id: "training",
    title: "Model Training",
    description:
      "Fine-tuning and domain adaptation. Data pipelines, evaluation harnesses, and monitoring for reliable deployments.",
    icon: WaveIcon,
  },
];

export function Capabilities() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-20">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-center leading-tight">What we can build</h2>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((cap) => {
          const Icon = cap.icon;
          const isOpen = expandedId === cap.id;
          return (
            <motion.div
              key={cap.id}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className={`group rounded-lg border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5 ${
                isOpen ? "ring-1 ring-foreground/10 bg-white/90 dark:bg-white/10" : ""
              }`}
            >
              <motion.button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`cap-panel-${cap.id}`}
                onClick={() => setExpandedId((prev) => (prev === cap.id ? null : cap.id))}
                className="w-full text-left"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    aria-hidden
                    className="h-10 w-10 rounded-lg bg-foreground/10 flex items-center justify-center"
                    whileHover={{ rotate: 3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 380, damping: 20 }}
                  >
                    <Icon />
                  </motion.div>
                  <div>
                    <div className="text-xl font-semibold">{cap.title}</div>
                    <div className="text-sm text-foreground/70">Tap to learn more</div>
                  </div>
                </div>
              </motion.button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`cap-panel-${cap.id}`}
                    key="content"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="mt-4 text-base leading-relaxed text-foreground/80 max-w-prose"
                  >
                    <p>{cap.description}</p>
                    <div className="mt-4">
                      <Link
                        href="/projects"
                        className="rounded-full border px-5 py-2 text-base font-medium hover:bg-foreground/10"
                      >
                        See projects using this capability
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default Capabilities;


