"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChatWidgetState } from "@/types/chat";

export const useChatWidget = () => {
  const [state, setState] = useState<ChatWidgetState>({
    isOpen: false,
    message: "",
    isVisible: false,
    showGreeting: false,
    showPing: false,
    greetingIndex: 0,
    hasInteracted: false,
  });

  const [shouldWobble, setShouldWobble] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, isVisible: true }));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.isVisible && !state.hasInteracted) {
      const interval = setInterval(() => {
        setShouldWobble(true);
        setTimeout(() => setShouldWobble(false), 600);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [state.isVisible, state.hasInteracted]);

  const toggleWidget = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      hasInteracted: true,
      showPing: false,
    }));
  }, []);

  const handleQuickPrompt = useCallback(
    (prompt: string) => {
      setState((prev) => ({ ...prev, hasInteracted: true }));
      const params = new URLSearchParams({ message: prompt });
      router.push(`/chatbot?${params.toString()}`);
    },
    [router]
  );

  const sendMessageFromWidget = useCallback(() => {
    if (state.message.trim()) {
      setState((prev) => ({ ...prev, hasInteracted: true }));
      const params = new URLSearchParams({ message: state.message });
      router.push(`/chatbot?${params.toString()}`);
    }
  }, [state.message, router]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessageFromWidget();
      }
    },
    [sendMessageFromWidget]
  );

  const setMessage = useCallback((message: string) => {
    setState((prev) => ({ ...prev, message }));
  }, []);

  return {
    isOpen: state.isOpen,
    message: state.message,
    isVisible: state.isVisible,
    showGreeting: false,
    showPing: state.showPing,
    shouldWobble,
    currentGreeting: "",
    toggleWidget,
    handleQuickPrompt,
    sendMessageFromWidget,
    handleKeyPress,
    setMessage,
  };
};


