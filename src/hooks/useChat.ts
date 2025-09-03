"use client";

import { useState, useCallback } from "react";
import { useRecaptchaV3 } from "@/components/GoogleRecaptchaV3";
import { Message, ChatHookReturn } from "@/types/chat";
import { API_ENDPOINTS } from "@/constants/app";
import { generateMessageId } from "@/utils/formatters";

export const useChat = (): ChatHookReturn => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text:
        "Hi! I'm Vlad's AI assistant. I can answer questions about his work, experience, and ventures. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_CHAT_RECAPTCHA_KEY as string | undefined;
  const { executeRecaptcha, isLoaded } = useRecaptchaV3(siteKey || "");

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim()) {
      return;
    }

    if (!siteKey) {
      setRecaptchaError(
        "reCAPTCHA site key not configured. Please set NEXT_PUBLIC_CHAT_RECAPTCHA_KEY in your .env.local file."
      );
      return;
    }

    if (!isLoaded) {
      setRecaptchaError("reCAPTCHA is still loading. Please wait a moment and try again.");
      return;
    }

    if (isLoading) {
      return;
    }

    const userMessage: Message = {
      id: generateMessageId(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue("");
    setIsLoading(true);
    setRecaptchaError(null);

    try {
      let recaptchaToken: string;
      try {
        recaptchaToken = await executeRecaptcha("chat_message");
      } catch (error) {
        throw new Error(
          "Failed to verify you are human. Please refresh the page and try again."
        );
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      const apiKey = process.env.NEXT_PUBLIC_CHAT_API_KEY as string | undefined;
      if (apiKey) {
        headers["Authorization"] = `Bearer ${apiKey}`;
      }

      const response = await fetch(API_ENDPOINTS.CHAT, {
        method: "POST",
        headers,
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_CHAT_CLIENT_ID,
          message: messageText,
          conversation_id: conversationId,
          recaptcha_token: recaptchaToken,
        }),
      });

      if (response.status === 429 || response.status === 500) {
        try {
          const errorData = await response.json();
          if (errorData.detail && typeof errorData.detail === "string" && errorData.detail.includes("Rate limit exceeded")) {
            const rateLimitMessage = errorData.detail
              .replace("429: ", "")
              .replace("500: ", "");

            const rateLimitWarning: Message = {
              id: generateMessageId(),
              text: `⚠️ ${rateLimitMessage}\n\nPlease try again next month or contact Vlad directly on LinkedIn for urgent inquiries.`,
              isUser: false,
              timestamp: new Date(),
            };

            setMessages((prev) => [...prev, rateLimitWarning]);
            return;
          }
        } catch {
          // fallthrough
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage: Message = {
        id: generateMessageId(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (data.conversation_id) {
        setConversationId(data.conversation_id);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: generateMessageId(),
        text:
          error instanceof Error
            ? error.message
            : "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      if (error instanceof Error) {
        if (
          error.message.includes("verify you are human") ||
          error.message.includes("refresh the page")
        ) {
          setRecaptchaError(error.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, siteKey, isLoaded, isLoading, executeRecaptcha, conversationId]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    recaptchaError,
    sendMessage,
    handleKeyPress,
  };
};


