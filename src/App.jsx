import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Input from './components/Input';
import Report from './components/Report';

function App() {
  const [activeView, setActiveView] = useState('HOME');
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('crypto_analyses');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('crypto_analyses', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (content) => {
    const newEntry = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]); // Newest first
    setActiveView('HOME');
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const renderView = () => {
    switch (activeView) {
      case 'HOME':
        return <Home entries={entries} />;
      case 'INPUT':
        return <Input addEntry={addEntry} />;
      case 'REPORT':
        return <Report entries={entries} deleteEntry={deleteEntry} />;
      default:
        return <Home entries={entries} />;
    }
  };

  return (
    <div className="flex bg-charcoal-base min-h-screen text-gray-100 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header / View Title */}
        <header className="glass-panel border-b border-charcoal-border border-x-0 border-t-0 p-6 flex items-center justify-between z-10 sticky top-0">
          <h1 className="text-2xl font-bold tracking-wider">
            {activeView === 'HOME' && 'DASHBOARD FEED'}
            {activeView === 'INPUT' && 'NEW ANALYSIS'}
            {activeView === 'REPORT' && 'ANALYSIS REPORT'}
          </h1>
          <div className="text-neon-green/50 text-sm font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
            SYSTEM ONLINE
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto h-full w-full">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
