import { useState } from 'react';
import './App.css'
import NavSidebar from './NavSidebar';

function App() {
  const [activeNav, setActiveNav] = useState("chat");

  return (
    <div className='flex flex-1 h-full' style={{ backgroundColor: 'var(--color-background)' }}>
      <div className='flex flex-1 overflow-hidden'>
        <NavSidebar active={activeNav} setActive={setActiveNav}></NavSidebar>
      </div>
    </div>
  );
}

export default App
