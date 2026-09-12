import { useState } from 'react';
import './App.css'
import NavSidebar from './NavSidebar';
import ChatView from './ChatView';
import SystemMonitorView from './SystemMonitorView';
import SystemProcessesView from './SystemProcessesView';
import SystemLogView from './SystemLogView';


function App() {
  const [activeNav, setActiveNav] = useState("chat");

  // const showRightPanel = activeNav === "chat";

  return (
    <div className='flex flex-1 h-full' style={{ backgroundColor: 'var(--color-background)' }}>
      <div className='flex flex-1 overflow-hidden'>
        <NavSidebar active={activeNav} setActive={setActiveNav}></NavSidebar>

        <div className='flex flex-1 overflow-hidden'>
          <div className='flex-1 overflow-hidden relative' style={{ background: "var(--color-background)" }}>
            {activeNav === "chat" && <ChatView></ChatView>}
            {activeNav === "monitor" && <SystemMonitorView></SystemMonitorView>}
            {activeNav === "processes" && <SystemProcessesView></SystemProcessesView>}
            {activeNav === "logs" && <SystemLogView></SystemLogView>}
          </div>
        </div>

        {/* {showRightPanel && (
          <div className='w-72 flex-shrink-0 overflow-hidden'>
          </div>
        )} */}
        

      </div>
    </div>
  );
}

export default App
