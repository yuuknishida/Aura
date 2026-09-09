import { useState } from 'react';
import './App.css'
import NavSidebar from './NavSidebar';
import ChatPanel from './ChatPanel';

function App() {
  const [activeNav, setActiveNav] = useState("chat");

  return (
    <div className='flex flex-1 h-full' style={{ backgroundColor: 'var(--color-background)' }}>
      <div className='flex flex-1 overflow-hidden'>
        <NavSidebar active={activeNav} setActive={setActiveNav}></NavSidebar>

        <div className='flex flex-1 overflow-hidden'>
          <div className='flex-1 overflow-hidden relative' style={{ background: "var(--color-background)" }}>
            {activeNav === "chat" && <ChatPanel></ChatPanel>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App
