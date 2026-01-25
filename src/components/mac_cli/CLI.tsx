"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { TitleBar } from "./components/TitleBar";
import { MessageItem } from "./components/MessageItem";
import { InputArea } from "./components/InputArea";
import { useClientMount } from "./hooks/useClientMount";
import { useGhostTyping } from "./hooks/useGhostTyping";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { STYLES } from "./styles";
import { useSendMessage } from '@/hooks/useSendMessage';

import {
  DEFAULT_PROMPT,
  DEFAULT_ACCENT_COLOR,
} from "./constants";
import type { InputState, CLIMessage } from "./types";
import { useLanguage } from "@/contexts/LanguageContext";
import { CLIErrorBoundary } from "./ErrorBoundary";
import { ConsoleMessage, ConsoleResponse } from "@/types/chat";
import createId from "@/lib/IdGenerator";

function CLIContent() {

  const INACTIVITY_DELAY = 10000; 
  const { t } = useLanguage();

  const inactivityTimer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const suggestions = useMemo(() => t<string[]>("cli.suggestions"), [ t]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [conversationMessages, setConversationMessages] = useState<any[]>(() => [
    {
      id: 'banner',
      role: 'system',
      content: "Sapio AI",
    },
    {
      id: 'welcome',
      role: 'system',
      content: t("home.sapioConsole.systemMessage"),
    },
  ]);
  const [pendingAnimationId, setPendingAnimationId] = useState<string | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  const [inputState, setInputState] = useState<InputState>({ value: "", isFocused: false, });
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useClientMount();
  const [conversationId, setConversationId] = useState<string | undefined>();

  const onSuccess = (data: ConsoleResponse) => {
    const assistantMessage: ConsoleMessage = {
      id: createId(),
      role: "assistant",
      content: data.response,
    };

    setConversationMessages(prev => [...prev, assistantMessage]);
    setPendingAnimationId(assistantMessage.id);
    setIsAnimationComplete(false);
    setConversationId(data.conversation_id);
    setIsLoading(false);
  }
  const onError = (_: string) => {
    const errorMessage: ConsoleMessage = {
      id: createId(),
      role: "assistant",
      content: t("home.sapioConsole.errorMessage"),
      tone: "error",
    };

    setConversationMessages(prev => [...prev, errorMessage]);
    setPendingAnimationId(errorMessage.id);
    setIsAnimationComplete(false);
    setIsLoading(false);
  }

  const { sendMessage } = useSendMessage({ onSuccess, onError });
  const isMessageAnimating = pendingAnimationId !== null && !isAnimationComplete;
  const ghostState = useGhostTyping(suggestions, inputState, isLoading, isMessageAnimating);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimationComplete(true);
  }, []);

  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);
  useAutoScroll(messagesContainerRef, shouldAutoScroll);

  useEffect(() => {
    setShouldAutoScroll(true);
    const timer = setTimeout(() => setShouldAutoScroll(false), 100);
    return () => clearTimeout(timer);
  }, [conversationMessages.length, pendingAnimationId, isLoading]);

  const triggerInactive = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setInputState((prev) => ({
      ...prev,
      isFocused: false,
    }));
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) {
      window.clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = window.setTimeout(() => {
      triggerInactive();
    }, INACTIVITY_DELAY);
  }, [triggerInactive]);


  const cliMessages = useMemo<CLIMessage[]>(() => {
    return conversationMessages.map((msg) => {
      if (msg.role === 'system') {
        return {
          type: msg.id === 'banner' ? 'banner' : 'info',
          content: msg.content,
          timestamp: msg.timestamp,
        };
      }

      if (msg.role === 'user') {
        return {
          type: 'command',
          content: msg.content,
          timestamp: msg.timestamp || new Date().toLocaleTimeString(),
        };
      }

      if (msg.role === 'assistant') {
        return {
          type: msg.tone === 'error' ? 'error' : 'output',
          content: msg.content,
          timestamp: msg.timestamp || new Date().toLocaleTimeString(),
          animated: msg.id === pendingAnimationId,
        };
      }

      return {
        type: 'info',
        content: msg.content,
        timestamp: msg.timestamp,
      };
    });
  }, [conversationMessages, pendingAnimationId]);

  const handleCommand = useCallback(async (command: string) => {
    if (!command.trim() || isLoading) return;
    try {
      const userMessage: ConsoleMessage = {
        id: createId(),
        role: "user",
        content: command,
      };
      setConversationMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      await sendMessage(command, conversationId);

    } catch (error) {
      setConversationMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        tone: 'error',
      }]);
      setIsLoading(false);
    }
  }, [sendMessage, conversationId, isLoading]);

  const updateInputState = useCallback((updates: Partial<InputState>) => {
    setInputState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleInputChange = useCallback((value: string) => {
    updateInputState({ value });
    resetInactivityTimer();
  }, [updateInputState, resetInactivityTimer]);

  const handleFocus = useCallback(() => {
    updateInputState({ isFocused: true });
    resetInactivityTimer();
  }, [updateInputState, resetInactivityTimer]);

  const handleBlur = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    setInputState((prev) => ({ ...prev, isFocused: false }));
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        const trimmedValue = inputState.value.trim();

        if (trimmedValue) {
          handleCommand(trimmedValue);
          updateInputState({ value: "" });
        }
        resetInactivityTimer();
      }
    },
    [inputState.value, handleCommand, updateInputState, resetInactivityTimer]
  );

  return (
    <div
      className={STYLES.cli.classes.container}
      style={STYLES.cli.inline.container}
      role="region"
      aria-label="Terminal interface"
    >
      <div
        className={STYLES.cli.classes.shineOverlay}
        style={STYLES.cli.inline.shineOverlay}
        aria-hidden="true"
      />

      <TitleBar />

      <div
        ref={messagesContainerRef}
        className={STYLES.cli.classes.messagesContainer}
        style={STYLES.cli.inline.messagesContainer("640px")}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className={STYLES.cli.classes.messagesList}>
          {isMounted && cliMessages.map((message, index) => (
            <MessageItem
              key={`${message.type}-${index}`}
              message={message}
              prompt={DEFAULT_PROMPT}
              accentColor={DEFAULT_ACCENT_COLOR}
              showTimestamp={false}
              onAnimationComplete={message.animated ? handleAnimationComplete : undefined}
            />
          ))}
        </div>

        {isMounted && (
          <InputArea
            ref={inputRef}
            inputState={inputState}
            prompt={DEFAULT_PROMPT}
            accentColor={DEFAULT_ACCENT_COLOR}
            ghostState={ghostState}
            disabled={!isAnimationComplete}
            onInputChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
}

CLIContent.displayName = "CLIContent";

export function CLI() {
  return (
    <CLIErrorBoundary
      fallback={() => (
        <div
          className={STYLES.cli.classes.container}
          style={STYLES.cli.inline.container}
          role="region"
          aria-label="Terminal interface - Error state"
        >
          <div
            className={STYLES.cli.classes.shineOverlay}
            style={STYLES.cli.inline.shineOverlay}
            aria-hidden="true"
          />

          <TitleBar />

          <div
            className={STYLES.cli.classes.messagesContainer}
            style={STYLES.cli.inline.messagesContainer("640px")}
            role="status"
          >
            <div className="space-y-4">
              <div className="text-gray-400 text-sm font-mono leading-relaxed">
                The Sapio assistant is temporarily unavailable due to maintenance. Please check back soon.
              </div>
            </div>
          </div>
        </div>
      )}
    >
      <CLIContent />
    </CLIErrorBoundary>
  );
}

CLI.displayName = "CLI";
