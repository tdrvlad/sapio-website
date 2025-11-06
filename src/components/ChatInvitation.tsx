"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ChatInvitation() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mx-auto max-w-[900px] px-6"
    >
      <div className="rounded-2xl border hover:scale-105 transition duration-300 border-black/10 dark:border-white/10 bg-foreground/2 p-8 sm:p-10 text-center hover:shadow-md transition duration-300">
        <h2 className="text-xl sm:text-2xl hover:scale-110 transition duration-300 font-semibold mb-2">
          {t("chatInvitation.title")}
          <p className="text-foreground/70 mb-6 text-sm font-semibold sm:text-base">
          {t("chatInvitation.des")}
        </p>
        </h2>
        
        <Link
          href="/chatbot"
          className="inline-block rounded-full bg-foreground text-background px-6 py-3 text-m font-semibold hover:scale-110 hover:opacity-90 transition duration-300"
        >
          {t("chatInvitation.ask")}
        </Link>
      </div>
    </motion.div>
  );
}


