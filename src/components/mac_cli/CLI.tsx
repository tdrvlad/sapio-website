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
import { ConsoleMessage, ConsoleResponse } from "@/types/chat";
import createId from "@/lib/IdGenerator";

function CLIContent() {

  const INACTIVITY_DELAY = 2000; // ms (2 seconds)
  const inactivityTimer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  const { t, language } = useLanguage();
  const suggestions = useMemo(() => t<string[]>("cli.suggestions"), [language]);

  const [conversationMessages, setConversationMessages] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [pendingAnimationId, setPendingAnimationId] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);



      const onSuccess = (data: ConsoleResponse) => {
        const assistantMessage: ConsoleMessage = {
            id: createId(),
            role: "assistant",
            content: data.response,
        };

        setConversationMessages(prev => [...prev, assistantMessage]);
        setConversationId(data.conversation_id);
        setPendingAnimationId(assistantMessage.id);
    }
    const onError = (_:string) => {
        const errorMessage: ConsoleMessage = {
            id: createId(),
            role: "assistant",
            content: t("home.sapioConsole.errorMessage"),
            tone: "error",
        };

        setConversationMessages(prev => [...prev, errorMessage]);
        setPendingAnimationId(errorMessage.id);
    }



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
  }, []);


  // Send message hook
  const { sendMessage } = useSendMessage({ onSuccess, onError });

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
    if (!command.trim()) return;
    try {
      setHasError(false);

        const userMessage: ConsoleMessage = {
            id: createId(),
            role: "user",
            content: command,
        };
        setConversationMessages(prev => [...prev,userMessage ]);

      await sendMessage(command);

    } catch (error) {
      setHasError(true);

      setConversationMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        tone: 'error',
      }]);
    }
  }, [sendMessage]);

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
