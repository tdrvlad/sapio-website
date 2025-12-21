import type { GhostTypingState } from "./types";

export const DEFAULT_PROMPT = "$" as const;
export const DEFAULT_ACCENT_COLOR = "#006beb" as const;
export const DEFAULT_MAX_HEIGHT = "600px" as const;

export const DEFAULT_SUGGESTIONS = [
  "What kind of AI solutions do you build?",
  "Can you integrate with on-premise systems?",
  "Show me a Sapio project in legal tech.",
  "How fast can an MVP be developed?",
  "How does a technical audit work?",
] as const;

export const GHOST_TYPING_CONFIG = {
  TYPING_DELAY: 70,
  DELETING_DELAY: 40,
  HOLD_DURATION: 1800,
  NEXT_SUGGESTION_DELAY: 420,
  OPACITY: {
    TYPING: 0.8,
    HOLD: 0.7,
    FADE: 0.6,
  },
} as const;

export const MESSAGE_TYPING_CONFIG = {
  TYPING_DELAY: 20,
  CURSOR_BLINK_CLASS: "animate-pulse",
} as const;

export const SAPIO_ASCII_LOGO = `╔════════════════════════════════════════════════════════════════════╗
║            XXX                ███████╗ █████╗ ██████╗ ██╗ ██████╗  ║                 
║           X   X               ██╔════╝██╔══██╗██╔══██╗██║██╔═══██╗ ║                 
║  XXX       XXX       XXX      ███████╗███████║██████╔╝██║██║   ██║ ║                 
║ X   X               X   X     ╚════██║██╔══██║██╔═══╝ ██║██║   ██║ ║                 
║  XXX                 XXX      ███████║██║  ██║██║     ██║╚██████╔╝ ║                 
║            XXX                ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝  ║                 
║           X   X                                                    ║                 
║            XXX                         █████╗ ██╗                  ║                 
║  XXX                 XXX              ██╔══██╗██║                  ║                 
║ X   X               X   X             ███████║██║                  ║                 
║  XXX       XXX       XXX              ██╔══██║██║                  ║                 
║           X   X                       ██║  ██║██║                  ║                 
║            XXX                        ╚═╝  ╚═╝╚═╝                  ║                 
╚════════════════════════════════════════════════════════════════════╝` as const;

export const INITIAL_GHOST_STATE: GhostTypingState = {
  text: "",
  index: 0,
  isDeleting: false,
  phase: "typing",
};

