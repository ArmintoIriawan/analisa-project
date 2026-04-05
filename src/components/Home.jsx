import React, { useState } from 'react';
import { Clock, ArrowUpRight, X } from 'lucide-react';
import { format } from 'date-fns';

const Home = ({ entries }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  if (!entries || entries.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <div className="w-24 h-24 mb-6 rounded-full border border-dashed border-gray-600 flex items-center justify-center">
          <Clock className="w-10 h-10 opacity-50" />
        </div>
        <p className="text-xl tracking-wider">NO DATA SUBMITTED YET</p>
        <p className="text-sm mt-2 font-mono">Awaiting primary input sequence...</p>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {entries.map((entry) => (
          <div key={entry.id} className="glass-panel rounded-xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300">
            {/* Header */}
            <div className="p-4 border-b border-charcoal-border bg-black/20 flex justify-between items-center">
              <span className="text-xs font-mono text-electric-blue">
                {format(new Date(entry.timestamp), 'MMM dd, yyyy HH:mm')}
              </span>
              <div className="w-2 h-2 rounded-full bg-electric-blue/50"></div>
            </div>
            
            {/* Content Preview */}
            <div className="p-5 flex-1 line-clamp-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </div>
            
            {/* Action */}
            <div className="p-4 pt-0 mt-auto">
              <button 
                onClick={() => setSelectedEntry(entry)}
                className="w-full py-2 flex items-center justify-center gap-2 text-sm text-neon-green border border-neon-green/30 rounded hover:bg-neon-green/10 transition-colors"
              >
                READ MORE <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Read More */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedEntry(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-6 lg:p-8 border-b border-charcoal-border bg-black/20">
              <h2 className="text-xl font-bold tracking-widest text-electric-blue flex items-center gap-3">
                <span className="block w-3 h-3 bg-neon-green rounded-full animate-pulse text-transparent">~</span> 
                ANALYSIS LOG
              </h2>
              <p className="text-sm font-mono text-gray-500 mt-2">
                TIMESTAMP: {format(new Date(selectedEntry.timestamp), 'PPpp')}
              </p>
            </div>
            
            <div className="p-6 lg:p-8 overflow-y-auto text-gray-200 leading-relaxed whitespace-pre-wrap font-sans text-base lg:text-lg custom-scrollbar">
              {selectedEntry.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
