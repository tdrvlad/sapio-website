import {ConsoleMessage} from "@/types/chat"


type ConsoleLineProps = {
    message: ConsoleMessage;
    accent: string;
    userLabel: string;
    accentColor: string;
    isAnimating: boolean;
    animatedText?: string;
};

function ConsoleLine({
                         message,
                         accent,
                         userLabel,
                         accentColor,
                         isAnimating,
                         animatedText,
                     }: ConsoleLineProps) {
    const isUser = message.role === "user";
    const normalizedLabel = isUser
        ? userLabel.toLowerCase()
        : accent.toLowerCase();

    const content =
        isAnimating && animatedText !== undefined ? animatedText : message.content;

    const contentStyle =
        message.tone === "system"
            ? {color: accentColor}
            : undefined;

    const contentClass =
        message.tone === "error" ? "text-red-300" : "text-white/85";

    return (
        <div className="text-[15px] leading-7">
      <span className="mr-3" style={{color: accentColor}}>
        [{normalizedLabel}]
      </span>
            <span className={contentClass} style={contentStyle}>
        {content}
      </span>
        </div>
    );
}


export default ConsoleLine