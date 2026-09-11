export default function SystemProcessesView() {
    const activeTasks = 7;
    const running = "#22c55e";
    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b flex-shrink-0" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "var(--color-display)", color: "var(--color-text)" }}>System Processes</span>
                    <span className="text-[10px] text-slate-600 tracking-wide" style={{fontFamily: "var(--font-mono)"}}>{activeTasks} ACTIVE TASKS</span>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex flex-col border rounded-xl h-full px-4 py-4" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex flex-col border rounded-xl h-full" style={{ borderColor: "var(--color-border)", background: "var(--color-panel)" }}>
                    <table className="w-full table-fixed">
                        <colgroup>
                            <col style={{ width: "6%" }}></col>
                            <col style={{ width: "70%" }}></col>
                            <col style={{ width: "6%" }}></col>
                            <col style={{ width: "6%" }}></col>
                            <col style={{ width: "6%" }}></col>
                            <col style={{ width: "6%" }}></col>
                        </colgroup>
                        
                        <thead>
                            <tr className="w-fill">
                                <th key={"PID"} className="border-b p-3 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    PID
                                </th>
                                <th key={"PROCESS"} className="border-b p-3 text-[10px] w-fit text-left" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    PROCESS
                                </th>
                                <th key={"CPU"} className="border-b p-3 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    CPU%
                                </th>
                                <th key={"MEMORY"} className="border-b p-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    MEMORY
                                </th>
                                <th key={"STATUS"} className="border-b p-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    STATUS
                                </th>
                                <th key={""} className="border-b p-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    ACTION
                                </th>
                            </tr>
                            <tr className="w-full">
                                <th key={"PID"} className="border-b px-4 py-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    4502
                                </th>
                                <th key={"PROCESS"} className="border-b px-4 py-4 text-[10px] w-fit text-left" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    chrome
                                </th>
                                <th key={"CPU"} className="border-b px-4 py-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    45%
                                </th>
                                <th key={"MEMORY"} className="border-b px-4 py-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    912 MB
                                </th>
                                <th key={"STATUS"} className="border-b px-4 py-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full" style={{ background: running }}></div>
                                        <span style={{ color: running }}>running</span>
                                    </div>
                                    
                                </th>
                                <th key={"ACTION"} className="border-b px-4 py-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                    <button className="border rounded-sm" style={{ borderColor: "var(--color-border)" }}>
                                        Kill
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}