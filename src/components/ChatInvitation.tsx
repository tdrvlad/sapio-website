"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBox from "@/components/ChatBox";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ChatInvitation() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="hover:scale-105 rounded-2xl border border-black/10 dark:border-white/10 p-6 transition duration-300">
      <AnimatePresence initial={false} mode="wait">
        {!open ? (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="text-center hover:scale-105 transition duration-300"
          >
            <div className="text-lg text-foreground/80 ">{t("chatInvitation.title")}</div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-4 rounded-full bg-foreground text-background px-6 py-4 text-base font-semibold hover:opacity-90 hover:scale-110 transition duration-300"
            >
              {t("chatInvitation.ask")}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-medium">Sapio AI Assistant</div>
              <button type="button" onClick={() => setOpen(false)} className="text-sm underline underline-offset-4">Close chat</button>
            </div>
            <ChatBox
              greeting={"Hi, I’m Sapio’s AI Assistant. Ask me about our services, projects, or how we can help your business."}
              quickPrompts={[
                "What services do you offer?",
                "Can you build a chatbot for my business?",
                "How do I start a project with Sapio?",
              ]}
              heightClass="h-[460px]"
              footerCTA={<span>Prefer a call? → <a href="/contact" className="underline underline-offset-4">Book a consultation</a></span>}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


