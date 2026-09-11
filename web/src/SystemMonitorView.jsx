import Card from "./Card";

export default function SystemMonitorView() {
    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b flex-shrink-0" style={{borderColor: "var(--color-border)"}}>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide" style={{fontFamily: "var(--color-display)", color: "var(--color-text)"}}>
                    System Monitor
                    </span>
                    <span style={{fontFamily: "var(--font-mono)"}} className="text-[10px] text-slate-600 tracking-wide">
                        Real-Time Telemetry
                    </span>
                </div>
            </div>
            {/* Main Content */}
            <div className="grid grid-cols-3 gap-4 px-10 py-10">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>

            <div className="px-10 h-full">
                <div className="border h-fit rounded-xl py-2 px-2" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
                    <div className="px-3">
                        <span className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>TOP CPU CONSUMERS</span>
                    </div>
                    
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-start items-center gap-7">
                            <span className="px-3 text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>chrome</span>
                            <div className="flex-1 h-1.5 rounded-full bg-slate-800">
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: 100, background: "var(--color-primary)", boxShadow: `0 0 8px var(--color-primary)` }}></div>
                            </div>
                            <span className="text-[10px] px-3" style={{fontFamily: "var(--font-mono)", color: "var(--color-text-muted)"}}>95%</span>
                        </div>
                        <div className="flex justify-start items-center gap-7">
                            <span className="px-3 text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>chrome</span>
                            <div className="flex-1 h-1.5 rounded-full bg-slate-800">
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: 100, background: "var(--color-primary)", boxShadow: `0 0 8px var(--color-primary)` }}></div>
                            </div>
                            <span className="text-[10px] px-3" style={{fontFamily: "var(--font-mono)", color: "var(--color-text-muted)"}}>95%</span>
                        </div>
                        <div className="flex justify-start items-center gap-7">
                            <span className="px-3 text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>chrome</span>
                            <div className="flex-1 h-1.5 rounded-full bg-slate-800">
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: 100, background: "var(--color-primary)", boxShadow: `0 0 8px var(--color-primary)` }}></div>
                            </div>
                            <span className="text-[10px] px-3" style={{fontFamily: "var(--font-mono)", color: "var(--color-text-muted)"}}>95%</span>
                        </div>
                        <div className="flex justify-start items-center gap-7">
                            <span className="px-3 text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>chrome</span>
                            <div className="flex-1 h-1.5 rounded-full bg-slate-800">
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: 100, background: "var(--color-primary)", boxShadow: `0 0 8px var(--color-primary)` }}></div>
                            </div>
                            <span className="text-[10px] px-3" style={{fontFamily: "var(--font-mono)", color: "var(--color-text-muted)"}}>95%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}