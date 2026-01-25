import { useState, useEffect } from "react";
import { MESSAGE_TYPING_CONFIG } from "../constants";

export function useMessageTyping(
  fullText: string,
  shouldAnimate: boolean,
  onComplete?: () => void
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(!shouldAnimate);

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayedText(fullText);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
        onComplete?.();
      }
    }, MESSAGE_TYPING_CONFIG.TYPING_DELAY);

    return () => clearInterval(timer);
  }, [fullText, shouldAnimate, onComplete]);

  return { displayedText, isComplete };
}

