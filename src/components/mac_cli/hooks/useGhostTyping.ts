import { useEffect, useReducer } from "react";
import { INITIAL_GHOST_STATE } from "../constants";
import { ghostTypingReducer } from "../utils/ghostTyping.reducer";
import {
  shouldSkipAnimation,
  isTypingComplete,
  isFullyDeleted,
  scheduleHoldPhase,
  scheduleNextSuggestion,
  scheduleTextUpdate,
} from "../utils/ghostTyping.utils";
import type { InputState } from "../types";

export function useGhostTyping(
  suggestions: readonly string[],
  inputState: InputState
) {
  const [state, dispatch] = useReducer(ghostTypingReducer, INITIAL_GHOST_STATE);

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [suggestions]);

  useEffect(() => {
    if (shouldSkipAnimation(inputState, suggestions)) {
      if (state.text !== "") {
        dispatch({ type: "RESET" });
      }
      return;
    }

    const currentSuggestion = suggestions[state.index % suggestions.length];

    if (isTypingComplete(state.text, currentSuggestion, state.isDeleting)) {
      if (state.phase !== "hold") {
        dispatch({ type: "START_HOLD" });
        return;
      }
      return scheduleHoldPhase(dispatch);
    }

    if (isFullyDeleted(state.text, state.isDeleting)) {
      return scheduleNextSuggestion(dispatch, suggestions.length);
    }

    return scheduleTextUpdate(
      dispatch,
      state.text,
      currentSuggestion,
      state.isDeleting
    );
  }, [state.text, state.isDeleting, state.index, state.phase, suggestions, inputState.isFocused, inputState.value]);

  return state;
}

