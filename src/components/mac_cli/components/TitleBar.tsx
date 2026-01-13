import { memo } from "react";
import { STYLES } from "../styles";

interface TitleBarProps {
  username?: string;
}

export const TitleBar = memo(({ username = "sapio-ai@terminal" }: TitleBarProps) => (
  <div
    className={STYLES.titleBar.classes.container}
    style={STYLES.titleBar.inline.container}
    role="banner"
  >
    <div className={STYLES.titleBar.classes.leftSection}>
      <div className={STYLES.titleBar.classes.controls} role="group" aria-label="Window controls">
        <div className={STYLES.titleBar.classes.closeButton} aria-label="Close" />
        <div className={STYLES.titleBar.classes.minimizeButton} aria-label="Minimize" />
        <div className={STYLES.titleBar.classes.maximizeButton} aria-label="Maximize" />
      </div>
      <span className={STYLES.titleBar.classes.terminalLabel}>Terminal</span>
    </div>
    <span className={STYLES.titleBar.classes.username}>{username}</span>
  </div>
));

TitleBar.displayName = "TitleBar";

