import { useCallback, useRef, useState } from 'react';

const QUICK_COMMANDS = [
    "System status check",
    "Optimize memory",
    "CPU breakdown",
    "Network diagnostics",
    "Kill idle processes",
    "Temperature report",
];

export default function ChatPanel() {
    const [messages, setMessages] = useState([
        {
            id: "0",
            role: "assistant",
            content: "ARIA online. I have full visibility into your system - 7 processes monitored, all sensors active. How can I assist you?",
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    


    const send = useCallback((text) => {
        if (!text.trim() || isThinking)
            return;
        const userMsg = {
            id: Date.now().toString(),
            role: "user",
            content: text.trim(),
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        setTimeout(() => {
            const aiMsg = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: '',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsThinking(false);
        }, 900 + Math.random() * 600);
    }, [isThinking]);
    
    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b flex-shrink-0" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{background: "var(--color-success)", boxShadow: "0 0 6px var(--color-success)"}}></div>
                        <span style={{fontFamily: "var(--color-display)", color: "var(--color-text)"}} className="text-sm font-semibold tracking-wide">AURA</span>
                    </div>
                    <span style={{fontFamily: "var(--font-mono)"}} className="text-[10px] text-slate-600 tracking-wide">AI SYSTEM ASSISTANT</span>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                    <div style={{ fontFamily: "var(--font-mono)" }} className="flex items-center gap-3 text-[10px]">
                        <span style={{color: "var(--color-primary)"}}>CPU {}</span>
                        <span style={{color: "#00d4aa"}}>RAM {}</span>
                    </div>
                </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                        {/* Avatar */}
                        <div className='flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5'
                            style={{
                                background: msg.role === "assistant" ? "#4f9eff1a" : "#00d4aa1a",
                                border: `1px solid ${msg.role === "assistant" ? "#4f9eff33" : "#00d4aa33"}`,
                            }}>
                            <span className='text-xs' style={{color: msg.role === "assistant" ? "var(--color-primary)" : "#00d4aa"}}>
                                {msg.role === "assistant" ? "◈" : "◉"}
                            </span>
                        </div>
                        
                        {/* Bubble */}
                        <div className={'max-w-[60%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1'}>
                            <div
                                className='rounded-xl px-4 py-2.5 text-sm leading-relaxed'
                                style={{
                                    background: msg.role === "assistant" ? "var(--color-panel)" : "#00d4aa1a",
                                    border: `1px solid ${msg.role === "assistant" ? "var(--color-border)" : "#00d4aa33"}`,
                                    color: msg.role === "assistant" ? "#cbd5e1" : "#e2e8f0",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                {msg.content}
                            </div>
                            <span className='text-[9px] text-slate-700 px-1' style={{fontFamily: "var(--font-mono)"}}>
                                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit"})}
                            </span>
                        </div>
                    </div>
                    
                ))}
            </div>
            {/* Quick Commands */}
            <div className="px-5 pb-3 flex gap-2 flex-wrap">
                {QUICK_COMMANDS.slice(0, 4).map((cmd) => (
                    <button
                        key={cmd}
                        disabled={isThinking}
                        onClick={() => send(cmd)}
                        className="text-[10px] px-2.5 py-1 rounded-full border transition-all duration-150 hover:border-blue-500 hover:text-blue-400 disabled:opacity-30"
                        style={{
                            fontFamily: "var(--font-mono)",
                            borderColor: "var(--color-border)",
                            color: "var(--color-text-muted)",
                            background: "transparent",
                        }}
                    >
                        {cmd}
                    </button>
                ))}
            </div>
            {/* Input */}
            <div className='px-5 pb-4 flex-shrink-0'>
                <div className='flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all duration-150 focus-within:border-blue-500/50' style={{background: "var(--color-panel)", borderColor: "var(--color-border)"}}>
                    <input
                        ref={useRef(null)}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && send(input)}
                        placeholder='Issue a command or ask about your system...'
                        disabled={isThinking}
                        className='flex-1 bg-transparent text-sm outline-none placeholder:text-slate-700 disabled:opacity-50'
                        style={{ fontFamily: "var(--font-body)", color: "#e2e8f0" }}
                    >
                    </input>
                    <button
                        onClick={() => send(input)}
                        disabled={!input.trim() || isThinking}
                        className='flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-150 disabled:opacity-20'
                        style={{ background: input.trim() ? "var(--color-primary)" : "transparent", color: input.trim() ? "#fff" : "var(--color-primary)"}}
                    >
                        <span className='text-xs leading-none'>↵</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
