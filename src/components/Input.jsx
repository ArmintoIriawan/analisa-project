import React, { useState } from 'react';
import { Send, Beaker } from 'lucide-react';

const Input = ({ addEntry }) => {
  const [content, setContent] = useState('');

  const handlePublish = () => {
    if (content.trim() === '') return;
    addEntry(content);
    setContent('');
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full animate-in fade-in duration-500">
      
      {/* Editor Area */}
      <div className="flex-1 glass-panel rounded-xl overflow-hidden flex flex-col mb-6 border border-charcoal-border focus-within:border-neon-green/50 transition-colors shadow-2xl relative">
        <div className="absolute top-4 right-4 text-neon-green/20 pointer-events-none">
          <Beaker className="w-24 h-24" />
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Initiate analysis protocol. Awaiting input..."
          className="flex-1 w-full bg-transparent text-gray-200 p-6 lg:p-8 resize-none focus:outline-none font-sans text-lg lg:text-xl leading-relaxed placeholder:text-gray-600 custom-scrollbar z-10"
          autoFocus
        />
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end items-center">
        <span className="text-gray-500 text-sm font-mono mr-6">
          {content.length} CHARACTERS
        </span>
        <button
          onClick={handlePublish}
          disabled={content.trim() === ''}
          className={`neon-button px-8 py-4 rounded-xl font-bold tracking-widest flex items-center gap-3 text-sm lg:text-base ${
            content.trim() === '' ? 'opacity-50 cursor-not-allowed text-gray-500 border-gray-600 shadow-none hover:bg-transparent hover:text-gray-500 hover:shadow-none' : ''
          }`}
        >
          PUBLISH ANALYSIS <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export default Input;
