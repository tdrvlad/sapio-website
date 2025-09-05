"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBox from "@/components/ChatBox";

export default function ChatInvitation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
      <AnimatePresence initial={false} mode="wait">
        {!open ? (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="text-center"
          >
            <div className="text-lg text-foreground/80">Our AI assistant can explain Sapio’s services, projects, and how to get started.</div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-4 rounded-full bg-foreground text-background px-6 py-2 text-base font-semibold hover:opacity-90"
            >
              Ask the AI Assistant
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


