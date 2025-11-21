/**
 * Sapio console section – terminal-inspired chat experience.
 */
"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useRecaptchaV3 } from '@/components/GoogleRecaptchaV3';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

type ConsoleMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  tone?: "system" | "error";
};

const SUGGESTIONS: Record<string, string[]> = {
  en: [
    "What kind of AI solutions do you build?",
    "Can you integrate with on-premise systems?",
    "Show me a Sapio project in legal tech.",
    "How fast can an MVP be developed?",
    "How does a technical audit work?",
  ],
  ro: [
    "Cu ce tipuri de soluții AI lucrați?",
    "Puteți integra soluții on-premise, fără cloud?",
    "Arată-mi un proiect Sapio din zona legal tech.",
    "Cât de repede poate fi dezvoltat un MVP?",
    "Cum decurge un audit tehnic?",
  ],
};

const SAPIO_API_URL =
  process.env.NEXT_PUBLIC_SAPIO_ASSISTANT_URL?.replace(/\/$/, "") ||
  "https://assistant.sapio.ro/api";
const SAPIO_WIDGET_API_KEY = process.env.NEXT_PUBLIC_WIDGET_API_KEY;
const SAPIO_RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_WIDGET_RECAPTCHA_KEY;

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export function SapioConsoleSection() {
  const { language, t } = useLanguage();
  const accentHex = "#006beb";
  const eyebrowText = t("home.sapioConsole.eyebrow");
  const subtitleText = t("home.sapioConsole.subtitle");

  const { executeRecaptcha, isLoaded: isRecaptchaLoaded } = useRecaptchaV3(
    SAPIO_RECAPTCHA_SITE_KEY || ""
  );

  const [messages, setMessages] = useState<ConsoleMessage[]>(() => [
    {
      id: "sapio-system",
      role: "assistant",
      content: t("home.sapioConsole.systemMessage"),
      tone: "system",
    },
  ]);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [ghostPhase, setGhostPhase] = useState<"typing" | "hold" | "fade">(
    "typing"
  );
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [pendingAnimationId, setPendingAnimationId] = useState<string | null>(null);
  const [animatedLine, setAnimatedLine] = useState<{ id: string; text: string }>({
    id: "",
    text: "",
  });

  const messageContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const localeSuggestions = useMemo(
    () => SUGGESTIONS[language] || SUGGESTIONS.en,
    [language]
  );

  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === "sapio-system"
          ? { ...msg, content: t("home.sapioConsole.systemMessage") }
          : msg
      )
    );
  }, [t]);

  useEffect(() => {
    const sequence = translations[language].home.sapioConsole.bootLogs || [];
    setBootLogs([]);
    if (!sequence.length) {
      setBootComplete(true);
      return;
    }
    setBootComplete(false);
    let index = 0;
    const timer = setInterval(() => {
      setBootLogs((prev) => [...prev, sequence[index]]);
      index += 1;
      if (index >= sequence.length) {
        clearInterval(timer);
        setTimeout(() => setBootComplete(true), 220);
      }
    }, 240);
    return () => clearInterval(timer);
  }, [language]);

  useEffect(() => {
    if (isInputFocused) {
      return;
    }

    const currentSuggestion =
      localeSuggestions[typewriterIndex % localeSuggestions.length] || "";

    const delay = isDeleting ? 40 : 70;
    let timer: NodeJS.Timeout;

    if (!isDeleting && typewriterText === currentSuggestion) {
      setGhostPhase("hold");
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && typewriterText === "") {
      setGhostPhase("typing");
      timer = setTimeout(() => {
        setIsDeleting(false);
        setTypewriterIndex((prev) => (prev + 1) % localeSuggestions.length);
      }, 420);
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? currentSuggestion.slice(0, typewriterText.length - 1)
          : currentSuggestion.slice(0, typewriterText.length + 1);
        setTypewriterText(nextText);
        if (isDeleting) {
          setGhostPhase("fade");
        }
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [
    typewriterText,
    isDeleting,
    typewriterIndex,
    localeSuggestions,
    isInputFocused,
  ]);

  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking, bootLogs]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
        if (entry.boundingClientRect.top < -120) {
          setHasScrolledPast(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setTypewriterText("");
    setTypewriterIndex(0);
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    if (!pendingAnimationId) {
      return;
    }
    const target = messages.find((message) => message.id === pendingAnimationId);
    if (!target) {
      return;
    }

    let index = 0;
    setAnimatedLine({ id: pendingAnimationId, text: "" });
    const step = Math.max(1, Math.round(target.content.length / 90));
    const interval = setInterval(() => {
      index += step;
      setAnimatedLine({
        id: pendingAnimationId,
        text: target.content.slice(0, Math.min(index, target.content.length)),
      });
      if (index >= target.content.length) {
        clearInterval(interval);
        setAnimatedLine({ id: "", text: "" });
        setPendingAnimationId(null);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [pendingAnimationId, messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isThinking) {
      return;
    }

    if (!SAPIO_RECAPTCHA_SITE_KEY) {
      const errorMessage: ConsoleMessage = {
        id: createId(),
        role: "assistant",
        content: "reCAPTCHA not configured. Please contact support.",
        tone: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    if (!isRecaptchaLoaded) {
      const errorMessage: ConsoleMessage = {
        id: createId(),
        role: "assistant",
        content: "Security verification loading. Please wait a moment.",
        tone: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    const text = inputValue.trim();
    setInputValue("");

    const userMessage: ConsoleMessage = {
      id: createId(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    try {
      let recaptchaToken: string;
      try {
        recaptchaToken = await executeRecaptcha("sapio_console_chat");
      } catch {
        throw new Error(
          "Failed to verify you are human. Please refresh the page and try again."
        );
      }

      const response = await fetch(`${SAPIO_API_URL}/widget/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SAPIO_WIDGET_API_KEY}`,
        },
        body: JSON.stringify({
          message: text,
          conversation_id: conversationId,
          recaptcha_token: recaptchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error(`Sapio API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ConsoleMessage = {
        id: createId(),
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setConversationId(data.conversation_id);
      setPendingAnimationId(assistantMessage.id);
    } catch (error) {
      console.error(error);
      const assistantMessage: ConsoleMessage = {
        id: createId(),
        role: "assistant",
        content: t("home.sapioConsole.errorMessage"),
        tone: "error",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setPendingAnimationId(assistantMessage.id);
    } finally {
      setIsThinking(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => setIsInputFocused(false);

  const scrollToConsole = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => inputRef.current?.focus(), 520);
  };

  const showStickyPrompt = hasScrolledPast && !isSectionVisible;

  const statusLine = `${t("home.sapioConsole.systemPrefix")} ${t("home.sapioConsole.statusLinePrefix")} ${t("home.sapioConsole.statusLine")}`;

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-[#030405] px-4 py-20 sm:px-6 sm:py-24"
        aria-labelledby="sapio-console-title"
      >
        <div className="mx-auto w-full max-w-[1100px] space-y-6 text-left">
          <div className="space-y-3">
            {eyebrowText && eyebrowText.trim().length > 0 && (
              <p
                className="font-mono text-xs uppercase tracking-[0.45em]"
                style={{ color: accentHex }}
              >
                {eyebrowText}
              </p>
            )}
            <h2
              id="sapio-console-title"
              className="text-3xl font-semibold text-white sm:text-4xl"
            >
              {t("home.sapioConsole.title")}
            </h2>
            {subtitleText && subtitleText.trim().length > 0 && (
              <p className="max-w-3xl font-mono text-[15px] leading-relaxed text-white/70">
                {subtitleText}
              </p>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0.65 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
            viewport={{ once: true }}
            className="terminal-shell scanline-overlay relative w-full bg-[#050506] font-mono text-[15px] tracking-[0.02em] text-white"
          >
            <div className="flex items-center justify-between border-b border-white/5 bg-[#040405] px-6 py-3 text-[11px] uppercase tracking-[0.4em] text-white/70">
              <span>{t("home.sapioConsole.consoleLabel")}</span>
              <span className="tracking-[0.2em] text-white/40">
                {bootComplete ? "ready" : "booting"}
              </span>
            </div>

            <div
              className="border-b border-white/10 bg-black/30 px-6 py-2 text-[12px]"
              style={{ color: accentHex }}
            >
              {statusLine}
            </div>

            <div
              ref={messageContainerRef}
              role="log"
              aria-live="polite"
              className="custom-scrollbar max-h-[640px] min-h-[520px] overflow-y-auto px-6 py-6 text-left text-[15px] leading-7"
            >
              <div className="space-y-2 text-xs text-[#006beb]/70">
                {bootLogs.map((log, index) => (
                  <div key={`boot-${index}`} className="text-xs">
                    {log}
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-3 text-white">
                {messages.map((message) => (
                  <ConsoleLine
                    key={message.id}
                    message={message}
                    accent={t("home.sapioConsole.sapioLabel")}
                    userLabel={t("home.sapioConsole.userLabel")}
                    accentColor={accentHex}
                    isAnimating={animatedLine.id === message.id}
                    animatedText={
                      animatedLine.id === message.id ? animatedLine.text : undefined
                    }
                  />
                ))}

                {!isInputFocused && typewriterText.length > 0 && (
                  <GhostLine
                    text={typewriterText}
                    phase={ghostPhase}
                    userLabel={t("home.sapioConsole.userLabel")}
                  />
                )}

                {isThinking && (
                  <ThinkingLine
                    label={t("home.sapioConsole.sapioLabel")}
                    text={t("home.sapioConsole.typingLabel")}
                    accentColor={accentHex}
                  />
                )}
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#020203] px-6 py-4">
              <div className="flex items-center gap-3 text-base text-white">
                <span className="text-[#006beb]">[ask]</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("home.sapioConsole.inputPlaceholder")}
                  aria-label={t("home.sapioConsole.inputPlaceholder")}
                  className="flex-1 bg-transparent text-[15px] text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showStickyPrompt && (
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            onClick={scrollToConsole}
            className="fixed bottom-5 left-1/2 z-40 flex w-[92vw] max-w-3xl -translate-x-1/2 items-center justify-between border border-white/10 bg-[#030306]/95 px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] text-white/70 shadow-[0_15px_30px_rgba(3,4,20,0.65)] sm:left-auto sm:right-8 sm:translate-x-0"
          >
            <span>{t("home.sapioConsole.stickyPrompt")}</span>
            <span className="text-[#006beb]">⮐</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

type ConsoleLineProps = {
  message: ConsoleMessage;
  accent: string;
  userLabel: string;
  accentColor: string;
  isAnimating: boolean;
  animatedText?: string;
};

function ConsoleLine({
  message,
  accent,
  userLabel,
  accentColor,
  isAnimating,
  animatedText,
}: ConsoleLineProps) {
  const isUser = message.role === "user";
  const normalizedLabel = isUser
    ? userLabel.toLowerCase()
    : accent.toLowerCase();

  const content =
    isAnimating && animatedText !== undefined ? animatedText : message.content;

  const contentStyle =
    message.tone === "system"
      ? { color: accentColor }
      : undefined;

  const contentClass =
    message.tone === "error" ? "text-red-300" : "text-white/85";

  return (
    <div className="text-[15px] leading-7">
      <span className="mr-3" style={{ color: accentColor }}>
        [{normalizedLabel}]
      </span>
      <span className={contentClass} style={contentStyle}>
        {content}
      </span>
    </div>
  );
}

type GhostLineProps = {
  text: string;
  phase: "typing" | "hold" | "fade";
  userLabel: string;
};

function GhostLine({ text, phase, userLabel }: GhostLineProps) {
  const opacityClass =
    phase === "typing" ? "opacity-70" : phase === "hold" ? "opacity-50" : "opacity-30";
  const normalizedUserLabel = userLabel.toLowerCase();

  return (
    <div className={`text-[15px] leading-7 text-slate-300 ${opacityClass}`}>
      <span className="mr-3 text-slate-500">[{normalizedUserLabel}]</span>
      <span className="border-r border-white/40 pr-1">{text || " "}</span>
    </div>
  );
}

type ThinkingLineProps = {
  label: string;
  text: string;
  accentColor: string;
};

function ThinkingLine({ label, text, accentColor }: ThinkingLineProps) {
  const normalizedLabel = label.toLowerCase();
  return (
    <div className="text-[15px] leading-7 text-white/85">
      <span className="mr-3" style={{ color: accentColor }}>
        [{normalizedLabel}]
      </span>
      <span className="flex items-center gap-2 text-white/85">
        <span>{text}</span>
        <span className="flex gap-1">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:120ms]"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:240ms]"
            style={{ backgroundColor: accentColor }}
          />
        </span>
      </span>
    </div>
  );
}



