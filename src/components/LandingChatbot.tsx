"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChat } from "@/hooks/useChat";
import { MessageCircle, Send, Sparkles } from "lucide-react";

const CONVERSATION_STARTERS = [
    "How can I integrate AI in my business?",
    "What's AI all about?",
    "Can you do a Workshop for us?",
    "I don't know what AI is right for me?",
    "What are the costs for a project?",
];

export default function LandingChatbot() {
    const { t } = useLanguage();
    const [showPrompt, setShowPrompt] = useState(false);
    const [selectedStarter, setSelectedStarter] = useState<string | null>(null);
    const { messages, inputValue, setInputValue, isLoading, recaptchaError, sendMessage, handleKeyPress } = useChat();

    // Show prompt bubble after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowPrompt(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Randomly select a conversation starter to highlight
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * CONVERSATION_STARTERS.length);
        setSelectedStarter(CONVERSATION_STARTERS[randomIndex]);
    }, []);

    const handleStarterClick = (starter: string) => {
        setInputValue(starter);
        setTimeout(() => sendMessage(), 100);
    };

    return (
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 py-12 sm:py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
            >
                {/* Floating Prompt Bubble */}
                <AnimatePresence>
                    {showPrompt && messages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", duration: 0.6 }}
                            className="absolute -top-16 left-1/2 -translate-x-1/2 z-10"
                        >
                            <div className="relative bg-foreground text-background px-6 py-3 rounded-2xl shadow-lg">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    <p className="text-sm font-medium">Try asking me something!</p>
                                </div>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-foreground rotate-45" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Chat Container */}
                <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-background/50 backdrop-blur-sm shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-foreground/5 border-b border-black/10 dark:border-white/10 px-6 sm:px-8 py-5">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-foreground/10 flex items-center justify-center">
                                <MessageCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold">Chat with our AI</h2>
                                <p className="text-xs sm:text-sm text-foreground/60">It knows all about what we do and how we can work together</p>
                            </div>
                        </div>
                    </div>

                    {/* Conversation Starters */}
                    {messages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="px-6 sm:px-8 py-6 border-b border-black/5 dark:border-white/5"
                        >
                            <p className="text-sm text-foreground/60 mb-4">Quick questions to get started:</p>
                            <div className="flex flex-wrap gap-3">
                                {CONVERSATION_STARTERS.map((starter, idx) => {
                                    const isHighlighted = starter === selectedStarter;
                                    return (
                                        <motion.button
                                            key={starter}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + idx * 0.1 }}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleStarterClick(starter)}
                                            className={`text-left text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full border transition-all ${
                                                isHighlighted
                                                    ? "border-foreground bg-foreground/10 font-medium animate-pulse"
                                                    : "border-black/10 dark:border-white/10 hover:border-foreground/50 hover:bg-foreground/5"
                                            }`}
                                        >
                                            {starter}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Chat Messages */}
                    <div className="px-6 sm:px-8 py-6 min-h-[350px] max-h-[550px] overflow-auto">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-foreground/40">
                                <p className="text-center">Start a conversation by selecting a question above or typing your own</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                                                message.isUser
                                                    ? "bg-foreground text-background"
                                                    : "bg-foreground/10 text-foreground"
                                            }`}
                                        >
                                            <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-foreground/10 px-4 py-3 rounded-2xl">
                                            <div className="flex gap-1">
                                                <span className="h-2 w-2 rounded-full bg-foreground/70 animate-bounce [animation-delay:-0.3s]" />
                                                <span className="h-2 w-2 rounded-full bg-foreground/70 animate-bounce [animation-delay:-0.15s]" />
                                                <span className="h-2 w-2 rounded-full bg-foreground/70 animate-bounce" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                        {recaptchaError && (
                            <div className="mt-4 p-3 rounded-lg bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-200 text-sm">
                                {recaptchaError}
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="px-6 sm:px-8 py-5 border-t border-black/10 dark:border-white/10 bg-foreground/5">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask about our AI solutions..."
                                disabled={isLoading}
                                className="flex-1 px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:opacity-50 text-sm"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !inputValue.trim()}
                                className="px-5 py-2.5 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send className="h-4 w-4" />
                                <span className="hidden sm:inline text-sm">Send</span>
                            </button>
                        </div>
                        <p className="text-xs text-foreground/50 mt-2 text-center">
                            Protected by reCAPTCHA • Responses are AI-generated
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
