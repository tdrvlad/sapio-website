"use client";

import { motion } from "framer-motion";
import ChatBox from "@/components/ChatBox";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ChatInvitation() {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mx-auto max-w-[1000px] px-4 sm:px-6 py-6 sm:py-8"
    >
      <div className="relative rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-background via-foreground/5 to-background shadow-lg overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/10 pointer-events-none" />
        
        {/* Header Section */}
        <div className="relative px-6 sm:px-10 pt-8 sm:pt-10 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/10 border border-foreground/20 mb-4">
            <div className="h-2 w-2 rounded-full bg-foreground animate-pulse" />
            <span className="text-xs font-medium text-foreground/80">AI Assistant</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 leading-tight">
            {t("chatInvitation.title")}
          </h2>
          <p className="text-foreground/70 text-sm sm:text-base max-w-2xl mx-auto">
            {t("chatInvitation.des")}
          </p>
        </div>

        {/* Chat Section */}
        <div className="relative px-4 sm:px-6 pb-6 sm:pb-8">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-background/50 backdrop-blur-sm shadow-inner">
            <div className="px-4 sm:px-6 pt-4 pb-2 flex items-center gap-2 border-b border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-foreground animate-pulse" />
                <div className="text-sm font-semibold">Sapio AI Assistant</div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <ChatBox
                greeting="Hi, I'm Sapio's AI Assistant. Ask me about our services, projects, or how we can help your business."
                quickPrompts={[
                  "What services do you offer?",
                  "Can you build a chatbot for my business?",
                  "How do I start a project with Sapio?",
                ]}
                heightClass="h-[520px]"
                footerCTA={
                  <span className="text-xs sm:text-sm">
                    Prefer a call? →{" "}
                    <a href="/contact" className="underline underline-offset-4 hover:opacity-70 transition font-medium">
                      Book a consultation
                    </a>
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}


