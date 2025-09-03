"use client";

import React, { useEffect } from "react";
import { useChat } from "@/hooks/useChat";

type Props = {
  initialMessage?: string;
  className?: string;
  heightClass?: string;
};

export default function ChatBox({ initialMessage, className, heightClass }: Props) {
  const { messages, inputValue, setInputValue, isLoading, recaptchaError, sendMessage, handleKeyPress } = useChat();

  useEffect(() => {
    if (initialMessage) {
      // set and send initial message
      setInputValue(initialMessage);
    }
    // We intentionally do not auto-send to avoid triggering recaptcha without user intent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  return (
    <div className={`rounded-xl border border-black/10 dark:border-white/10 p-4 flex flex-col ${heightClass || "h-[460px]"} ${className || ""}`}>
      <div className="flex-1 overflow-auto space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`${m.isUser ? "self-end bg-foreground text-background" : "self-start bg-foreground/10"} max-w-[75%] rounded-lg px-3 py-2 text-sm`}
          >
            {m.text}
          </div>
        ))}
        {recaptchaError && (
          <div className="self-start max-w-[75%] rounded-lg bg-red-100 dark:bg-red-950 px-3 py-2 text-xs text-red-700 dark:text-red-200">
            {recaptchaError}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          className="flex-1 rounded border px-3 py-2 text-sm bg-transparent"
          placeholder="Ask about Sapio…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
        />
        <button
          className="rounded bg-foreground text-background px-4 py-2 text-sm disabled:opacity-50"
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? "Sending…" : "Send"}
        </button>
      </div>
      <div className="mt-2 text-xs text-foreground/60">
        Prefer a full view? <a href="/chatbot" className="underline underline-offset-4">Open the chatbot</a>
      </div>
    </div>
  );
}


