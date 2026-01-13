export type CLIMessageType = "command" | "output" | "error" | "info" | "banner";

export interface CLIMessage {
  type: CLIMessageType;
  content: string;
  timestamp?: string;
  animated?: boolean;
}

export interface CLIProps {
  messages?: CLIMessage[];
  prompt?: string;
  accentColor?: string;
  showTimestamp?: boolean;
  maxHeight?: string;
  suggestions?: string[];
  onCommand?: (command: string) => void;
}

export type GhostPhase = "typing" | "hold" | "fade";

export interface GhostTypingState {
  text: string;
  index: number;
  isDeleting: boolean;
  phase: GhostPhase;
}

export interface InputState {
  value: string;
  isFocused: boolean;
}

export type GhostTypingAction =
  | { type: "RESET" }
  | { type: "START_HOLD" }
  | { type: "START_DELETING" }
  | { type: "NEXT_SUGGESTION"; totalSuggestions: number }
  | { type: "UPDATE_TEXT"; text: string; isDeleting: boolean };

