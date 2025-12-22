"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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
import { CLIErrorBoundary } from "./ErrorBoundary";

function CLIContent() {

  const INACTIVITY_DELAY = 2000; // ms (2 seconds)
  const inactivityTimer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
  const [hasError, setHasError] = useState(false);

  // Initialize welcome messages once on mount

  const triggerInactive = useCallback(() => {
    // Actually blur the input element
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
      setHasError(false);
      await sendMessage(command);
          //throw Error("afasdf")

    } catch (error) {
      console.error('Failed to send message:', error);
      setHasError(true);
      
      // Add error message to conversation
      setConversationMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        tone: 'error',
      }]);
    }
  }, [sendMessage, isThinking]);

  // Input handlers
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
            ref={inputRef}
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

CLIContent.displayName = "CLIContent";

// Wrap with Error Boundary
export function CLI() {
  return (
    <CLIErrorBoundary
      fallback={(error, resetError) => (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#0a0a0a',
            border: '2px solid #ff4444',
            borderRadius: '8px',
            color: '#ff4444',
            fontFamily: 'monospace',
            maxWidth: '100%',
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '24px', marginRight: '8px' }}>⚠️</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>CLI Error</span>
          </div>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#1a0a0a',
              borderRadius: '4px',
              marginBottom: '16px',
              fontSize: '14px',
              lineHeight: '1.5',
            }}
          >
            {error.message}
          </div>
          <button
            onClick={resetError}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff4444',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#ff6666';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ff4444';
            }}
          >
            Reset CLI
          </button>
        </div>
      )}
    >
      <CLIContent />
    </CLIErrorBoundary>
  );
}

CLI.displayName = "CLI";
