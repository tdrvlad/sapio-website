/**
 * Sapio console section – terminal-inspired chat experience.
 */
"use client";

import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useMemo, useRef, useState} from 'react';

import {useLanguage} from '@/contexts/LanguageContext';
import {translations} from '@/lib/translations';
import {ConsoleBootLoader} from "@/components/sections/console/ConsoleBootLoader";
import {useAutoScroll} from "@/hooks/useAutoScroll";
import ThinkingLine from "@/components/sections/console/ThinkingLine";
import Typewriter from "@/components/sections/console/Typewriter";
import {ConsoleMessage} from "@/types/chat"
import ConsoleLine from "@/components/sections/console/ConsoleLine";
import {useSendMessage} from "@/hooks/useSendMessage";
import {nothing} from "@/utils/formatters";

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

export function SapioConsoleSection() {
    const {language, t} = useLanguage();
    const accentHex = "#006beb";
    const eyebrowText = t("home.sapioConsole.eyebrow");
    const subtitleText = t("home.sapioConsole.subtitle");

    const [messages, setMessages] = useState<ConsoleMessage[]>(() => [
        {
            id: "sapio-system",
            role: "assistant",
            content: t("home.sapioConsole.systemMessage"),
            tone: "system",
        },
    ]);


    const [conversationId, setConversationId] = useState<string | undefined>();

    const [inputValue, setInputValue] = useState("");

    const [isInputFocused, setIsInputFocused] = useState(false);


    const [pendingAnimationId, setPendingAnimationId] = useState<string | null>(null);
    const [animatedLine, setAnimatedLine] = useState<{ id: string; text: string }>({
        id: "",
        text: "",
    });

    const messageContainerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);


    const { sendMessage, isThinking, inputRef } = useSendMessage({
        conversationId,
        setConversationId,
        t,
        setMessages,
        setPendingAnimationId,
    });


    useAutoScroll(messageContainerRef, !isInputFocused);


    const localeSuggestions = useMemo(
        () => SUGGESTIONS[language] || SUGGESTIONS.en,
        [language]
    );

    useEffect(() => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === "sapio-system"
                    ? {...msg, content: t("home.sapioConsole.systemMessage")}
                    : msg
            )
        );
    }, [t]);


    useEffect(() => {
        const observer = new MutationObserver(() => {
            const node = document.querySelector("[data-boot-status]");
            const ready = node?.getAttribute("data-boot-status") === "complete";

            const el = document.getElementById("boot-status-text");
            if (el) el.textContent = ready ? "ready" : "booting";
        });

        observer.observe(document.body, {
            subtree: true,
            attributes: true,
            attributeFilter: ["data-boot-status"],
        });

        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        if (!pendingAnimationId) {
            return;
        }

        const target = messages.find((message) => message.id === pendingAnimationId);
        if (!target) {
            return;
        }

        let index = 0;
        setAnimatedLine({id: pendingAnimationId, text: ""});
        const step = Math.max(1, Math.round(target.content.length / 90));
        const interval = setInterval(() => {
            index += step;
            setAnimatedLine({
                id: pendingAnimationId,
                text: target.content.slice(0, Math.min(index, target.content.length)),
            });
            if (index >= target.content.length) {
                clearInterval(interval);
                setAnimatedLine({id: "", text: ""});
                setPendingAnimationId(null);
            }
        }, 12);

        return () => clearInterval(interval);
    }, [pendingAnimationId, messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        sendMessage(inputValue);
        setInputValue(nothing);
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
        sectionRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
        setTimeout(() => inputRef.current?.focus(), 520);
    };


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
                                style={{color: accentHex}}
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
                        initial={{opacity: 0.65}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 0.18}}
                        viewport={{once: true}}
                        className="terminal-shell scanline-overlay relative w-full bg-[#050506] font-mono text-[15px] tracking-[0.02em] text-white"
                    >
                        <div
                            className="flex items-center justify-between border-b border-white/5 bg-[#040405] px-6 py-3 text-[11px] uppercase tracking-[0.4em] text-white/70">
                            <span>{t("home.sapioConsole.consoleLabel")}</span>
                            <span className="tracking-[0.2em] text-white/40">
                <span id="boot-status-text">
                    booting
                </span>
              </span>
                        </div>

                        <div
                            className="border-b border-white/10 bg-black/30 px-6 py-2 text-[12px]"
                            style={{color: accentHex}}
                        >
                            {statusLine}
                        </div>

                        <div
                            ref={messageContainerRef}
                            role="log"
                            aria-live="polite"
                            className="custom-scrollbar max-h-[640px] min-h-[520px] overflow-y-auto px-6 py-6 text-left text-[15px] leading-7"
                        >
                            <ConsoleBootLoader language={language} translations={translations}/>

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

                                <Typewriter
                                    suggestions={localeSuggestions}
                                    isInputFocused={isInputFocused}
                                    userLabel={t("home.sapioConsole.userLabel")}
                                />


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
                <motion.button
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 30}}
                    onClick={scrollToConsole}
                    className="fixed bottom-5 left-1/2 z-40 flex w-[92vw] max-w-3xl -translate-x-1/2 items-center justify-between border border-white/10 bg-[#030306]/95 px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] text-white/70 shadow-[0_15px_30px_rgba(3,4,20,0.65)] sm:left-auto sm:right-8 sm:translate-x-0"
                >
                    <span>{t("home.sapioConsole.stickyPrompt")}</span>
                    <span className="text-[#006beb]">⮐</span>
                </motion.button>
            </AnimatePresence>
        </>
    );
}
