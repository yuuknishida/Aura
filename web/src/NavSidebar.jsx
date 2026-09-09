const NavItems = [
    { id: "chat", icon: "◈", label: "Assistant" },
    { id: "monitor", icon: "◉", label: "Monitor" },
    { id: "processes", icon: "▦", label: "Processes" },
    { id: "logs", icon: "≡", label: "System Log" },
    { id: "settings", icon: "⊕", label: "Settings" },
];

export default function NavSidebar({active, setActive}) {

    return (
        <>
            <div className="flex flex-col w-16 border-r relative"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}>
                
                <div className="flex items-center justify-center h-16 border-b" style={{ borderColor: "var(--color-border)" }}>
                    <div className="relative w-7 h-7 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border" style={{ borderColor: "#4f9eff44" }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ background: "#4f9eff", boxShadow: "0 0 8px #4f9eff" }}></div>
                    </div>
                </div>
                <nav className="flex flex-col items-center gap-1 p-1 flex-1 pt-4">
                    {NavItems.map((item) => (
                        <button
                            key={item.id}
                            title={item.label}
                            onClick={() => setActive(item.id)}
                            className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150 group relative"
                            style={{
                                backgroundColor: active === item.id ? "#4f9eff1a" : "transparent",
                                color: active === item.id ? '#4f7eff' : "#334155"
                            }}>
                            <span className="">{item.icon}</span>
                        </button>
                    ))}
                </nav>
                <div className="flex items-center justify-center h-12 border-t" style={{ borderColor: "var(--color-border)" }}>
                    <div className="relative h-2 w-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-success)", color: "var(--color-success)" }}></div>
                    </div>
                </div>
            </div>
            
        </>
    );
}
