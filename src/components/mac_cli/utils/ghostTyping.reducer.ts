import { INITIAL_GHOST_STATE } from "../constants";
import type { GhostTypingState, GhostTypingAction } from "../types";

export function ghostTypingReducer(
  state: GhostTypingState,
  action: GhostTypingAction
): GhostTypingState {
  switch (action.type) {
    case "RESET":
      return INITIAL_GHOST_STATE;
    
    case "START_HOLD":
      return { ...state, phase: "hold" };
    
    case "START_DELETING":
      return { ...state, isDeleting: true };
    
    case "NEXT_SUGGESTION":
      return {
        ...state,
        phase: "typing",
        isDeleting: false,
        index: (state.index + 1) % action.totalSuggestions,
      };
    
    case "UPDATE_TEXT":
      return {
        ...state,
        text: action.text,
        phase: action.isDeleting ? "fade" : state.phase,
      };
    
    default:
      return state;
  }
}

