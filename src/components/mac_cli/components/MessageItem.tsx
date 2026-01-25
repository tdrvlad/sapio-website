import { memo, type FC } from "react";
import { useMessageTyping } from "../hooks/useMessageTyping";
import { SAPIO_ASCII_LOGO } from "../constants";
import { STYLES } from "../styles";
import type { CLIMessage } from "../types";

export interface MessageItemProps {
  message: CLIMessage;
  prompt: string;
  accentColor: string;
  showTimestamp: boolean;
  onAnimationComplete?: () => void;
}

const MessageItemComponent: FC<MessageItemProps> = ({ message, prompt, accentColor, showTimestamp, onAnimationComplete }) => {
  const shouldAnimateContent = message.animated && (message.type === "output" || message.type === "error" || message.type === "info");
  const { displayedText, isComplete } = useMessageTyping(message.content, shouldAnimateContent!, onAnimationComplete);
  const contentToShow = shouldAnimateContent ? displayedText : message.content;

  return (
    <div className={STYLES.messageItem.classes.container}>
      {showTimestamp && message.timestamp && (
        <div className={STYLES.messageItem.classes.timestamp} role="timer">
          {message.timestamp}
        </div>
      )}

      {message.type === "command" && (
        <div className={STYLES.messageItem.classes.command.container}>
          <span 
            style={STYLES.messageItem.inline.prompt(accentColor)} 
            className={STYLES.messageItem.classes.command.prompt}
            aria-hidden="true"
          >
            {prompt}
          </span>
          <span className={STYLES.messageItem.classes.command.text}>{contentToShow}</span>
        </div>
      )}

      {message.type === "output" && (
        <div className={STYLES.messageItem.classes.output}>
          {contentToShow}
          {shouldAnimateContent && !isComplete && (
            <span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse" />
          )}
        </div>
      )}

      {message.type === "error" && (
        <div className={STYLES.messageItem.classes.error} role="alert">
          {contentToShow}
          {shouldAnimateContent && !isComplete && (
            <span className="inline-block w-2 h-4 ml-1 bg-red-400 animate-pulse" />
          )}
        </div>
      )}

      {message.type === "info" && (
        <div 
          className={STYLES.messageItem.classes.info}
          style={STYLES.messageItem.inline.info(accentColor)}
          role="status"
        >
          {contentToShow}
          {shouldAnimateContent && !isComplete && (
            <span 
              className="inline-block w-2 h-4 ml-1 animate-pulse" 
              style={{ backgroundColor: accentColor }}
            />
          )}
        </div>
      )}

      {message.type === "banner" && (
        <div className={STYLES.messageItem.classes.banner.container}>
          <pre
            className={STYLES.messageItem.classes.banner.pre}
            style={STYLES.messageItem.inline.banner(accentColor)}
            aria-label="Sapio AI Logo"
          >
            {SAPIO_ASCII_LOGO}
          </pre>
        </div>
      )}
    </div>
  );
};

export const MessageItem = memo<MessageItemProps>(MessageItemComponent);
MessageItem.displayName = "MessageItem";

