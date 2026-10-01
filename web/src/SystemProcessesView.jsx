import { useState, useEffect } from "react";
import getData from './utils'
// TODO:
// 1. Add processes when fetches and request are complete 
// 2. Get data for PID, PROCESS, CPU%, MEMORY, STATUS, ACTION

export default function SystemProcessesView() {
    const [processes, setProcesses] = useState([]);
    const running = "#22c55e";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData('/processes/all');
                setProcesses(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [processes]);

    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b flex-shrink-0" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>System Processes</span>
                    <span className="text-[10px] text-slate-600 tracking-wide" style={{fontFamily: "var(--font-mono)"}}>{processes.length} ACTIVE TASKS</span>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex flex-col h-full px-4 py-4" style={{ borderColor: "var(--color-border)" }}>
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
                            {processes.map((process) => (
                                <tr className="w-full">
                                    <th key={"PID"} className="border-b px-4 py-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                        {process.pid}
                                    </th>
                                    <th key={"PROCESS"} className="border-b px-4 py-4 text-[10px] w-fit text-left" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                        {process.name}
                                    </th>
                                    <th key={"CPU"} className="border-b px-4 py-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                        {process.cpu_percent}
                                    </th>
                                    <th key={"MEMORY"} className="border-b px-4 py-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                        {process.memory_mb}
                                    </th>
                                    <th key={"STATUS"} className="border-b px-4 py-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full" style={{ background: running }}></div>
                                            <span style={{ color: running }}>{process.status}</span>
                                        </div>
                                        
                                    </th>
                                    <th key={"ACTION"} className="border-b px-4 py-4 text-[10px] w-fit text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                                        <button className="border rounded-sm" style={{ borderColor: "var(--color-border)" }}>
                                            Kill
                                        </button>
                                    </th>
                                </tr>
                            ))}
                            
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}