"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { TitleBar } from "./components/TitleBar";
import { MessageItem } from "./components/MessageItem";
import { InputArea } from "./components/InputArea";
import { useClientMount } from "./hooks/useClientMount";
import { useGhostTyping } from "./hooks/useGhostTyping";
import { STYLES } from "./styles";
import { useSendMessage } from '@/hooks/useSendMessage';

import {
  DEFAULT_PROMPT,
  DEFAULT_ACCENT_COLOR,
} from "./constants";
import type { InputState, CLIMessage } from "./types";
import { useLanguage } from "@/contexts/LanguageContext";

export function CLI() {
  const { t, language } = useLanguage();
  
  // Configuration
  const prompt = DEFAULT_PROMPT;
  const accentColor = DEFAULT_ACCENT_COLOR;
  const showTimestamp = false;
  const maxHeight = "640px";

  // Suggestions based on language (memoized to prevent reset on every render)
  const suggestions = useMemo(() => language === 'ro' ? [
    "Cu ce tipuri de soluții AI lucrați?",
    "Puteți integra soluții on-premise, fără cloud?",
    "Arată-mi un proiect Sapio din zona legal tech.",
    "Cât de repede poate fi dezvoltat un MVP?",
    "Cum decurge un audit tehnic?",
  ] : [
    "What kind of AI solutions do you build?",
    "Can you integrate with on-premise systems?",
    "Show me a Sapio project in legal tech.",
    "How fast can an MVP be developed?",
    "How does a technical audit work?",
  ], [language]);

  // State management - Single array for all conversation messages
  const [conversationMessages, setConversationMessages] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [pendingAnimationId, setPendingAnimationId] = useState<string | null>(null);

  // Initialize welcome messages once on mount
  useEffect(() => {
    setConversationMessages([
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
  }, []); // Empty deps - only run once

  // Send message hook
  const { sendMessage, isThinking } = useSendMessage({
    conversationId,
    setConversationId,
    t,
    setMessages: setConversationMessages,
    setPendingAnimationId,
  });

  // Input state
  const [inputState, setInputState] = useState<InputState>({
    value: "",
    isFocused: false,
  });

  const isMounted = useClientMount();
  const ghostState = useGhostTyping(
    suggestions as readonly string[],
    inputState
  );

  // Convert conversation messages to CLI display format
  const cliMessages = useMemo<CLIMessage[]>(() => {
    return conversationMessages.map((msg) => {
      // System messages (banner/welcome)
      if (msg.role === 'system') {
        return {
          type: msg.id === 'banner' ? 'banner' : 'info',
          content: msg.content,
          timestamp: msg.timestamp,
        };
      }
      
      // User messages
      if (msg.role === 'user') {
        return {
          type: 'command',
          content: msg.content,
          timestamp: msg.timestamp || new Date().toLocaleTimeString(),
        };
      }
      
      // Assistant messages
      if (msg.role === 'assistant') {
        return {
          type: msg.tone === 'error' ? 'error' : 'output',
          content: msg.content,
          timestamp: msg.timestamp || new Date().toLocaleTimeString(),
          animated: msg.id === pendingAnimationId,
        };
      }
      
      // Fallback
      return {
        type: 'info',
        content: msg.content,
        timestamp: msg.timestamp,
      };
    });
  }, [conversationMessages, pendingAnimationId]);

  // Handle send command
  const handleCommand = useCallback(async (command: string) => {
    if (!command.trim() || isThinking) return;
    
    try {
      await sendMessage(command);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }, [sendMessage, isThinking]);

  // Input handlers
  const updateInputState = useCallback((updates: Partial<InputState>) => {
    setInputState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleInputChange = useCallback((value: string) => {
    updateInputState({ value });
  }, [updateInputState]);

  const handleFocus = useCallback(() => {
    updateInputState({ isFocused: true });
  }, [updateInputState]);

  const handleBlur = useCallback(() => {
    updateInputState({ isFocused: false });
  }, [updateInputState]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        const trimmedValue = inputState.value.trim();
        
        if (trimmedValue) {
          handleCommand(trimmedValue);
          updateInputState({ value: "" });
        }
      }
    },
    [inputState.value, handleCommand, updateInputState]
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
        className={STYLES.cli.classes.messagesContainer}
        style={STYLES.cli.inline.messagesContainer(maxHeight)}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className={STYLES.cli.classes.messagesList}>
          {isMounted && cliMessages.map((message, index) => (
            <MessageItem
              key={`${message.type}-${index}`}
              message={message}
              prompt={prompt}
              accentColor={accentColor}
              showTimestamp={showTimestamp}
            />
          ))}
        </div>

        {isMounted && (
          <InputArea
            inputState={inputState}
            prompt={prompt}
            accentColor={accentColor}
            ghostState={ghostState}
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

CLI.displayName = "CLI";
