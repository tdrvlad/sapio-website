"use client";

import React, { useEffect } from "react";
import { useChat } from "@/hooks/useChat";

type Props = {
  initialMessage?: string;
  className?: string;
  heightClass?: string;
  greeting?: string;
  quickPrompts?: string[];
  footerCTA?: React.ReactNode;
};

export default function ChatBox({ initialMessage, className, heightClass, greeting, quickPrompts, footerCTA }: Props) {
  const { messages, inputValue, setInputValue, isLoading, recaptchaError, sendMessage, handleKeyPress } = useChat();

  useEffect(() => {
    if (initialMessage) {
      // set and send initial message
      setInputValue(initialMessage);
    }
    // We intentionally do not auto-send to avoid triggering recaptcha without user intent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  const hasMessages = messages.length > 0;

  return (
    <div className={`rounded-xl border border-black/10 dark:border-white/10 p-4 flex flex-col ${heightClass || "h-[460px]"} ${className || ""}`}>
      <div className="flex-1 overflow-auto space-y-3">
        {!hasMessages && greeting && (
          <div className="self-start max-w-[75%] rounded-lg bg-foreground/10 px-3 py-2 text-sm flex items-start gap-2">
            <span aria-hidden>💬</span>
            <span>{greeting}</span>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`${m.isUser ? "self-end bg-foreground text-background" : "self-start bg-foreground/10"} max-w-[75%] rounded-lg px-3 py-2 text-sm`}
          >
            {m.text}
          </div>
        ))}
        {isLoading && (
          <div className="self-start max-w-[60%] rounded-lg bg-foreground/10 px-3 py-2 text-sm">
            <span className="inline-flex gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/70 animate-bounce [animation-delay:-0.2s]" />
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/70 animate-bounce" />
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/70 animate-bounce [animation-delay:0.2s]" />
            </span>
          </div>
        )}
        {recaptchaError && (
          <div className="self-start max-w-[75%] rounded-lg bg-red-100 dark:bg-red-950 px-3 py-2 text-xs text-red-700 dark:text-red-200">
            {recaptchaError}
          </div>
        )}
      </div>
      {!hasMessages && quickPrompts && quickPrompts.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {quickPrompts.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                setInputValue(q);
                setTimeout(() => sendMessage(), 0);
              }}
              className="text-sm rounded-full border px-3 py-1.5 hover:bg-foreground/10"
            >
              {q}
            </button>
          ))}
        </div>
      )}
      <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <input
          className="flex-1 rounded border px-3 py-2 text-base bg-transparent min-w-0"
          placeholder="Ask about Sapio…"
          aria-label="Message input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
        />
        <button
          className="rounded bg-foreground text-background px-5 py-2 text-base font-semibold disabled:opacity-50 whitespace-nowrap"
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? "Sending…" : "Send"}
        </button>
      </div>
      {footerCTA ? (
        <div className="mt-2 text-xs sm:text-sm text-foreground/60">{footerCTA}</div>
      ) : (
        <div className="mt-2 text-xs text-foreground/60">
          Prefer a full view? <a href="/chatbot" className="underline underline-offset-4">Open the chatbot</a>
        </div>
      )}
    </div>
  );
}


