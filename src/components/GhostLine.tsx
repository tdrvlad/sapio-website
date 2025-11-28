
type GhostLineProps = {
    text: string;
    phase: "typing" | "hold" | "fade";
    userLabel: string;
};

function GhostLine({ text, phase, userLabel }: GhostLineProps) {
    const opacityClass =
        phase === "typing" ? "opacity-70" : phase === "hold" ? "opacity-50" : "opacity-30";
    const normalizedUserLabel = userLabel.toLowerCase();

    return (
        <div className={`text-[15px] leading-7 text-slate-300 ${opacityClass}`}>
            <span className="mr-3 text-slate-500">[{normalizedUserLabel}]</span>
            <span className="border-r border-white/40 pr-1">{text || " "}</span>
        </div>
    );
}

export default GhostLine