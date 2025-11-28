type ThinkingLineProps = {
    label: string;
    text: string;
    accentColor: string;
};


function ThinkingLine({label, text, accentColor}: ThinkingLineProps) {
    const normalizedLabel = label.toLowerCase();
    return (
        <div className="text-[15px] leading-7 text-white/85">
      <span className="mr-3" style={{color: accentColor}}>
        [{normalizedLabel}]
      </span>
            <span className="flex items-center gap-2 text-white/85">
        <span>{text}</span>
        <span className="flex gap-1">
          <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{backgroundColor: accentColor}}
          />
          <span
              className="h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:120ms]"
              style={{backgroundColor: accentColor}}
          />
          <span
              className="h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:240ms]"
              style={{backgroundColor: accentColor}}
          />
        </span>
      </span>
        </div>
    );
}

export default ThinkingLine