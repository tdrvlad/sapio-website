export type GhostLineProps = {
    text: string;
    phase: "typing" | "hold" | "fade";
    userLabel: string;
};

const _styles = {
    container: "text-[15px] leading-7 text-slate-300",
    opacity: {
        typing: "opacity-70",
        hold: "opacity-50",
        fade: "opacity-30",
    },
    userLabel: "mr-3 text-slate-500",
    text: "border-r border-white/40 pr-1",
};

const GhostLine: React.FC<GhostLineProps> = ({text, phase, userLabel}) => (
    <div className={`${_styles.container} ${_styles.opacity[phase]}`}>
        <span className={_styles.userLabel}>[{userLabel.toLowerCase()}]</span>
        <span className={_styles.text}>{text || " "}</span>
    </div>
);

export default GhostLine;
