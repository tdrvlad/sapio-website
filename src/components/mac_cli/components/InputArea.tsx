import { memo, forwardRef } from "react";
import { GhostTextOverlay } from "./GhostTextOverlay";
import { STYLES } from "../styles";
import type { InputState, GhostTypingState } from "../types";

interface InputAreaProps {
  inputState: InputState;
  prompt: string;
  accentColor: string;
  ghostState: GhostTypingState;
  onInputChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputArea = memo(forwardRef<HTMLInputElement, InputAreaProps>(({
  inputState,
  prompt,
  accentColor,
  ghostState,
  onInputChange,
  onFocus,
  onBlur,
  onKeyDown,
}, ref) => (
  <div className={STYLES.inputArea.classes.container}>
    <span
      style={STYLES.inputArea.inline.prompt(accentColor)}
      className={STYLES.inputArea.classes.prompt}
      aria-hidden="true"
    >
      {prompt}
    </span>
    <div className={STYLES.inputArea.classes.inputWrapper}>
      <input
        ref={ref}
        type="text"
        value={inputState.value}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        className={STYLES.inputArea.classes.input}
        aria-label="Terminal command input"
        placeholder=""
        autoComplete="off"
        spellCheck="false"
      />
      {!inputState.isFocused && inputState.value.length === 0 && ghostState.text.length > 0 && (
        <GhostTextOverlay text={ghostState.text} phase={ghostState.phase} />
      )}
    </div>
  </div>
)));

InputArea.displayName = "InputArea";

