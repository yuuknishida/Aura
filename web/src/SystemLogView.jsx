export default function SystemLogView() {
    const error = "#ef4444"
    const warn = "#f59e0b";
    const info = "#4f9eff";
    const ok = "#22c55e";
    const time = new Date().toLocaleTimeString();
    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b flex-shrink-0" style={{borderColor: "var(--color-border)"}}>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>System Logs</span>
                    <span className="text-[10px] text-slate-600 tracking-wide" style={{fontFamily: "var(--font-mono)"}}>EVENT LOGS</span>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex flex-col h-full border rounded-xl px-4 py-4" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex flex-col border rounded-xl h-full" style={{borderColor: "var(--color-border)", background: "var(--color-panel)"}}>
                    <div className="flex flex-col h-full px-4 py-4">
                        <div className="flex justify-center items-center w-max gap-4">
                            <span className="text-[10px]" style={{fontFamily: "var(--font-mono)", color: "var(--color-text-muted)"}}>{time}</span>
                            <div className="border rounded-lg flex items-center justify-center w-fit px-1" style={{ borderColor: warn, color: warn }}><span className="text-[10px] font-semibold" style={{fontFamily: "var(--font-mono)"}}>warn</span></div>
                            <div className="border rounded-lg flex items-center justify-center w-fit px-1" style={{ borderColor: error, color: error }}><span className="text-[10px] font-semibold" style={{fontFamily: "var(--font-mono)"}}>error</span></div>
                            <div className="border rounded-lg flex items-center justify-center w-fit px-1" style={{ borderColor: info, color: info }}><span className="text-[10px] font-semibold" style={{fontFamily: "var(--font-mono)"}}>info</span></div>
                            <div className="border rounded-lg flex items-center justify-center w-fit px-1" style={{ borderColor: ok, color: ok }}><span className="text-[10px] font-semibold" style={{fontFamily: "var(--font-mono)"}}>ok</span></div>
                            <span className="text-[10px]" style={{fontFamily: "var(--font-mono)", color: "var(--color-text-muted)"}}>chrome</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}