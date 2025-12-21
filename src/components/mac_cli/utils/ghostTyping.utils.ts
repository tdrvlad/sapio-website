import { GHOST_TYPING_CONFIG } from "../constants";
import type { InputState, GhostTypingAction } from "../types";

export const getNextText = (
  currentText: string,
  targetText: string,
  isDeleting: boolean
): string => {
  return isDeleting
    ? targetText.slice(0, currentText.length - 1)
    : targetText.slice(0, currentText.length + 1);
};

export const shouldSkipAnimation = (
  inputState: InputState,
  suggestions: readonly string[]
): boolean => {
  return inputState.isFocused || inputState.value.length > 0 || suggestions.length === 0;
};

export const getTypingDelay = (isDeleting: boolean): number => {
  return isDeleting 
    ? GHOST_TYPING_CONFIG.DELETING_DELAY 
    : GHOST_TYPING_CONFIG.TYPING_DELAY;
};

export const isTypingComplete = (
  text: string,
  targetText: string,
  isDeleting: boolean
): boolean => {
  return !isDeleting && text === targetText;
};

export const isFullyDeleted = (text: string, isDeleting: boolean): boolean => {
  return isDeleting && text === "";
};

export const scheduleHoldPhase = (
  dispatch: React.Dispatch<GhostTypingAction>
): (() => void) => {
  const timer = setTimeout(() => {
    dispatch({ type: "START_DELETING" });
  }, GHOST_TYPING_CONFIG.HOLD_DURATION);
  
  return () => clearTimeout(timer);
};

export const scheduleNextSuggestion = (
  dispatch: React.Dispatch<GhostTypingAction>,
  totalSuggestions: number
): (() => void) => {
  const timer = setTimeout(() => {
    dispatch({ type: "NEXT_SUGGESTION", totalSuggestions });
  }, GHOST_TYPING_CONFIG.NEXT_SUGGESTION_DELAY);
  
  return () => clearTimeout(timer);
};

export const scheduleTextUpdate = (
  dispatch: React.Dispatch<GhostTypingAction>,
  currentText: string,
  targetText: string,
  isDeleting: boolean
): (() => void) => {
  const delay = getTypingDelay(isDeleting);
  const timer = setTimeout(() => {
    const nextText = getNextText(currentText, targetText, isDeleting);
    dispatch({ type: "UPDATE_TEXT", text: nextText, isDeleting });
  }, delay);
  
  return () => clearTimeout(timer);
};

