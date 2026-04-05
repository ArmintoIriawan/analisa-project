import React, { useState } from 'react';
import { Send, Beaker } from 'lucide-react';

const Input = ({ addEntry }) => {
  const [mekanismeLaunch, setMekanismeLaunch] = useState('');
  const [marketing, setMarketing] = useState('');
  const [movementX, setMovementX] = useState('');

  const handlePublish = () => {
    if (!mekanismeLaunch.trim() && !marketing.trim() && !movementX.trim()) return;
    
    // Combine into a formatted markdown string
    const combinedContent = `## Mekanisme Launch\n${mekanismeLaunch.trim() || 'N/A'}\n\n## Marketing\n${marketing.trim() || 'N/A'}\n\n## Movement X\n${movementX.trim() || 'N/A'}`;
    
    addEntry(combinedContent);
    setMekanismeLaunch('');
    setMarketing('');
    setMovementX('');
  };

  const isFormEmpty = !mekanismeLaunch.trim() && !marketing.trim() && !movementX.trim();
  const totalLength = mekanismeLaunch.length + marketing.length + movementX.length;

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full animate-in fade-in duration-500">
      
      {/* Editor Area */}
      <div className="flex-1 glass-panel rounded-xl overflow-y-auto flex flex-col mb-6 border border-charcoal-border p-6 lg:p-8 space-y-6 relative custom-scrollbar shadow-2xl">
        <div className="absolute top-4 right-4 text-neon-green/10 pointer-events-none z-0">
          <Beaker className="w-24 h-24" />
        </div>
        
        <div className="flex flex-col z-10 transition-colors focus-within:text-neon-green">
          <label className="font-mono text-sm mb-2 opacity-80 tracking-widest uppercase">Mekanisme Launch</label>
          <textarea
            value={mekanismeLaunch}
            onChange={(e) => setMekanismeLaunch(e.target.value)}
            placeholder="Initiate launch mechanism details..."
            className="w-full bg-black/40 text-gray-200 p-4 rounded-lg border border-charcoal-border focus:border-neon-green/50 focus:outline-none font-sans text-base leading-relaxed placeholder:text-gray-600 resize-y min-h-[100px]"
            autoFocus
          />
        </div>

        <div className="flex flex-col z-10 transition-colors focus-within:text-electric-blue">
          <label className="font-mono text-sm mb-2 opacity-80 tracking-widest uppercase">Marketing</label>
          <textarea
            value={marketing}
            onChange={(e) => setMarketing(e.target.value)}
            placeholder="Initiate marketing strategy details..."
            className="w-full bg-black/40 text-gray-200 p-4 rounded-lg border border-charcoal-border focus:border-electric-blue/50 focus:outline-none font-sans text-base leading-relaxed placeholder:text-gray-600 resize-y min-h-[100px]"
          />
        </div>

        <div className="flex flex-col z-10 transition-colors focus-within:text-purple-400">
          <label className="font-mono text-sm mb-2 opacity-80 tracking-widest uppercase">Movement X</label>
          <textarea
            value={movementX}
            onChange={(e) => setMovementX(e.target.value)}
            placeholder="Initiate Movement X details..."
            className="w-full bg-black/40 text-gray-200 p-4 rounded-lg border border-charcoal-border focus:border-purple-400/50 focus:outline-none font-sans text-base leading-relaxed placeholder:text-gray-600 resize-y min-h-[100px]"
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end items-center">
        <span className="text-gray-500 text-sm font-mono mr-6">
          {totalLength} CHARACTERS
        </span>
        <button
          onClick={handlePublish}
          disabled={isFormEmpty}
          className={`neon-button px-8 py-4 rounded-xl font-bold tracking-widest flex items-center gap-3 text-sm lg:text-base ${
            isFormEmpty ? 'opacity-50 cursor-not-allowed text-gray-500 border-gray-600 shadow-none hover:bg-transparent hover:text-gray-500 hover:shadow-none' : ''
          }`}
        >
          PUBLISH ANALYSIS <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export default Input;
