import { GHOST_TYPING_CONFIG } from "../constants";
import { STYLES } from "../styles";
import type { GhostPhase } from "../types";

interface GhostTextOverlayProps {
  text: string;
  phase: GhostPhase;
}

export const GhostTextOverlay = ({ text, phase }: GhostTextOverlayProps) => {
  const opacity = GHOST_TYPING_CONFIG.OPACITY[phase.toUpperCase() as keyof typeof GHOST_TYPING_CONFIG.OPACITY];

  return (
    <div
      className={STYLES.ghostOverlay.classes.container}
      style={STYLES.ghostOverlay.inline.container(opacity)}
      aria-hidden="true"
    >
      {text}
      <span className={STYLES.ghostOverlay.classes.cursor} />
    </div>
  );
};

