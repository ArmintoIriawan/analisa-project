import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, Eye, Trash2, X, Download } from 'lucide-react';

const Report = ({ entries, deleteEntry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const filteredEntries = entries.filter((entry) => 
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadMarkdown = (entry) => {
    const filename = `analysis_report_${format(new Date(entry.timestamp), 'yyyyMMdd_HHmmss')}.md`;
    const blob = new Blob([entry.content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col h-full animate-in fade-in duration-500">
      
      {/* Search Header */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="input-field pl-10 h-12 w-full text-sm font-mono focus:border-electric-blue focus:ring-electric-blue border-charcoal-border bg-black/40 backdrop-blur-sm"
            placeholder="Search telemetry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm font-mono text-gray-500">
          MATCHES: {filteredEntries.length}
        </div>
      </div>

      {/* Table Area */}
      <div className="glass-panel w-full rounded-xl flex-1 overflow-hidden flex flex-col border border-charcoal-border">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-charcoal-border bg-black/40 text-xs font-mono text-gray-400 tracking-widest sticky top-0">
          <div className="col-span-3 lg:col-span-2">TIMESTAMP</div>
          <div className="col-span-6 lg:col-span-8">CONTENT BLOB</div>
          <div className="col-span-3 lg:col-span-2 text-right">ACTIONS</div>
        </div>
        
        {/* Table Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredEntries.length === 0 ? (
            <div className="h-full flex items-center justify-center p-8 text-gray-500 font-mono text-sm">
              NO MATCHING RECORDS FOUND IN DATABASE
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="grid grid-cols-12 gap-4 p-4 border-b border-charcoal-border/50 items-center hover:bg-white/5 transition-colors group">
                  
                  {/* Timestamp */}
                  <div className="col-span-3 lg:col-span-2 text-sm text-electric-blue font-mono whitespace-nowrap">
                    {format(new Date(entry.timestamp), 'MM/dd/yy HH:mm')}
                  </div>
                  
                  {/* Snippet */}
                  <div className="col-span-6 lg:col-span-8">
                    <p className="text-gray-300 text-sm truncate pr-4">
                      {entry.content}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="col-span-3 lg:col-span-2 flex items-center justify-end gap-3 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => downloadMarkdown(entry)}
                      className="p-2 text-gray-400 hover:text-green-500 transition-colors rounded hover:bg-green-500/10"
                      title="Download MD"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setSelectedEntry(entry)}
                      className="p-2 text-gray-400 hover:text-electric-blue transition-colors rounded hover:bg-electric-blue/10"
                      title="View Record"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded hover:bg-red-500/10"
                      title="Purge Record"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col relative animate-in fade-in zoom-in duration-300">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button 
                onClick={() => downloadMarkdown(selectedEntry)}
                className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-full transition-colors"
                title="Download MD"
              >
                <Download className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setSelectedEntry(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 lg:p-8 border-b border-charcoal-border bg-black/20 text-electric-blue font-mono font-bold tracking-widest flex items-center gap-3">
               <span className="block w-2 h-2 bg-electric-blue rounded-full animate-pulse text-transparent">~</span>
               SYSTEM LOG VISUALIZATION
            </div>
            <div className="p-6 lg:p-8 overflow-y-auto text-gray-200 leading-relaxed font-sans text-base lg:text-lg whitespace-pre-wrap custom-scrollbar">
              {selectedEntry.content}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Report;
