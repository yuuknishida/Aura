export default function Card(metric_label, metric_value) {
    const label = metric_label
    const value = metric_value;
    
    const danger = value > 80; const warn = value > 60;
    const color = danger ? "var(--color-danger)" : warn ? "var(--color-warn)" : "var(--color-success)";

    return (
        <div className="rounded-xl border p-4 space-y-4"
            style={{ background: "var(--color-panel)", borderColor: "var(--color-border)" }}>
            <div className="flex justify-between w-full">
                <span className="text-[10px] flex items-center" style={{fontFamily: "var(--font-mono)", color: "var(--color-text-muted)"}}>{label}</span>
                <span style={{fontFamily: "var(--font-mono)", color: color}}>{value}<span>%</span></span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, background: color, boxShadow: `0 0 8px ${color}` }}></div>
            </div>
            <div className="flex items-center">
                <span className="text-[10px] flex items-center" style={{fontFamily: "var(--font-mono)", color: "var(--color-text-muted)"}}></span>
            </div>
        </div>
    );
}