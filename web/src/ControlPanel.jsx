const panelTab = [
    { id: "monitor", label: "MONITOR" },
    { id: "processes", label: "PROCESSES" },
    { id: "logs", label: "LOGS" },
    { id: "settings", label: "SETTINGS" },
];

export default function ControlPanel({active, setActive}) {
    return (
        <div className="flex flex-col h-full border-1 relative" style={{background: "var(--color-surface)", borderColor: "var(--color-border)"}}>
            <div className="flex border-b flex-shrink-0" style={{borderColor: "var(--color-border)"}}>
                {panelTab.map((panel) => (
                    <button
                        key={panel.id}
                        title={panel.label}
                        onClick={() => setActive(panel.id)}
                        className="flex-1 transition-all duration-150 group relative py-3 text-[10px] uppercase tracking-widest"
                        style={{
                            background: active === panel.id ? "#4f9eff1a" : "transparent",
                            color: active === panel.id ? "#4f7eff" : "#334155",
                            fontFamily: "var(--font-mono)",
                            borderBottom: active === panel.id ? "1px solid #4f9eff" : "1px solid transparent",
                        }}
                    >
                        <span>
                            {panel.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}