import React from 'react';
import { Home, Edit3, FileText, Activity } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'HOME', icon: Home, label: 'Home' },
    { id: 'INPUT', icon: Edit3, label: 'Input' },
    { id: 'REPORT', icon: FileText, label: 'Report' },
  ];

  return (
    <aside className="w-20 lg:w-64 glass-panel border-r border-charcoal-border border-y-0 h-screen flex flex-col transition-all duration-300">
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center lg:justify-start lg:pl-6 border-b border-charcoal-border">
        <Activity className="w-8 h-8 text-neon-green" />
        <span className="hidden lg:block ml-3 font-bold text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-electric-blue">
          ANALITIC
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 flex flex-col gap-4 px-3 lg:px-4">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center p-3 lg:px-4 lg:py-3 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-neon-green/10 text-neon-green shadow-[inset_2px_0_0_var(--color-neon-green)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <Icon className={`w-6 h-6 lg:w-5 lg:h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className={`hidden lg:block ml-4 font-medium tracking-wide ${isActive ? 'text-neon-green' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer Area */}
      <div className="p-4 border-t border-charcoal-border text-center lg:text-left">
        <div className="w-10 h-10 lg:w-full lg:h-auto rounded-full bg-charcoal-base border border-charcoal-border flex items-center justify-center lg:justify-start lg:px-4 lg:py-2">
          <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse lg:mr-3"></div>
          <span className="hidden lg:block text-xs text-gray-400 font-mono">Sync: Configured</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
