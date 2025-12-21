"use client";

import { useState, useCallback, useMemo } from "react";
import { TitleBar } from "./components/TitleBar";
import { MessageItem } from "./components/MessageItem";
import { InputArea } from "./components/InputArea";
import { useClientMount } from "./hooks/useClientMount";
import { useGhostTyping } from "./hooks/useGhostTyping";
import { createDefaultMessages } from "./utils/messages.utils";
import { STYLES } from "./styles";
import {
  DEFAULT_PROMPT,
  DEFAULT_ACCENT_COLOR,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_SUGGESTIONS,
} from "./constants";
import type { CLIProps, InputState } from "./types";

export function CLI({
  messages = [],
  prompt = DEFAULT_PROMPT,
  accentColor = DEFAULT_ACCENT_COLOR,
  showTimestamp = false,
  maxHeight = DEFAULT_MAX_HEIGHT,
  suggestions = DEFAULT_SUGGESTIONS as unknown as string[],
  onCommand,
}: CLIProps) {
  const [inputState, setInputState] = useState<InputState>({
    value: "",
    isFocused: false,
  });

  const isMounted = useClientMount();
  const ghostState = useGhostTyping(
    suggestions as readonly string[],
    inputState
  );

  const displayMessages = useMemo(() => {
    return messages.length > 0 && isMounted 
      ? messages 
      : isMounted 
        ? createDefaultMessages() 
        : [];
  }, [messages, isMounted]);

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
        
        if (trimmedValue && onCommand) {
          onCommand(trimmedValue);
          updateInputState({ value: "" });
        }
      }
    },
    [inputState.value, onCommand, updateInputState]
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
          {isMounted && displayMessages.map((message, index) => (
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

