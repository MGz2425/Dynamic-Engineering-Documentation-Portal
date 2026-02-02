
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Settings, 
  Bell, 
  Database, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  ChevronRight,
  BookOpen,
  Clock,
  ExternalLink,
  History,
  FileCode,
  User
} from 'lucide-react';
import { DocCategory } from './types.ts';
import { SAMPLE_DOCS } from './constants.tsx';
import SearchModal from './components/SearchModal.tsx';
import AIAssistant from './components/AIAssistant.tsx';

// Define helper components outside or before App to ensure clean parsing
const GlobalKeyHandler: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearch]);
  return null;
};

const App: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState<string>(SAMPLE_DOCS[0].id);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentDoc = useMemo(() => 
    SAMPLE_DOCS.find(d => d.id === selectedDocId) || SAMPLE_DOCS[0],
    [selectedDocId]
  );

  const categories = useMemo(() => {
    return Object.values(DocCategory).map(cat => ({
      name: cat,
      docs: SAMPLE_DOCS.filter(d => d.category === cat)
    }));
  }, []);

  return (
    <div className="flex h-screen bg-[#09090b] overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-[#09090b] border-r border-[#18181b] flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-6 border-b border-[#18181b] flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">NEXUS</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8">
          {categories.map((cat, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-bold text-[#52525b] uppercase tracking-widest px-2 mb-3">
                {cat.name}
              </h3>
              <ul className="space-y-1">
                {cat.docs.map(doc => (
                  <li key={doc.id}>
                    <button
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                        selectedDocId === doc.id 
                          ? 'bg-blue-600/10 text-blue-400 font-medium' 
                          : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-white'
                      }`}
                    >
                      <FileCode className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{doc.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-[#18181b]">
          <button className="w-full flex items-center justify-between p-2 rounded-md text-[#52525b] hover:bg-[#18181b] transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center">
                <span className="text-xs font-bold text-[#a1a1aa]">JD</span>
              </div>
              <span className="text-xs font-medium">Engineer #42</span>
            </div>
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-[#18181b] bg-[#09090b]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-[#18181b] rounded-md transition-colors">
              <Menu className="w-5 h-5 text-[#a1a1aa]" />
            </button>
            <div className="flex items-center text-xs text-[#52525b]">
              <span>Documents</span>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="text-white">{currentDoc.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 px-4 py-2 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] rounded-lg text-sm text-[#71717a] transition-all w-80"
            >
              <Search className="w-4 h-4" />
              <span>Search repository...</span>
              <span className="ml-auto text-[10px] font-mono border border-[#3f3f46] px-1 rounded">⌘K</span>
            </button>
            <button className="p-2 hover:bg-[#18181b] rounded-md transition-colors relative">
              <Bell className="w-5 h-5 text-[#a1a1aa]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-[#09090b]"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 bg-blue-600/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-600/20">
                  {currentDoc.category}
                </span>
                <span className="text-xs text-[#52525b] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Revised {currentDoc.lastUpdated}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
                {currentDoc.title}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-center">
                    <History className="w-3 h-3 text-[#a1a1aa]" />
                  </div>
                  <span className="text-xs text-[#a1a1aa]">v{currentDoc.version}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-center">
                    <User className="w-3 h-3 text-[#a1a1aa]" />
                  </div>
                  <span className="text-xs text-[#a1a1aa]">{currentDoc.author}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] rounded-md text-xs font-medium text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-xs font-medium text-white transition-colors shadow-lg shadow-blue-600/10">
                <BookOpen className="w-4 h-4" />
                Mark as Read
              </button>
            </div>
          </div>

          <article className="prose prose-invert prose-blue max-w-none">
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-8 shadow-sm">
              <div className="whitespace-pre-wrap font-sans leading-relaxed text-[#e4e4e7] text-lg">
                {currentDoc.content.trim()}
              </div>
            </div>
          </article>

          <div className="mt-12 pt-8 border-t border-[#18181b] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#09090b] border border-[#18181b]">
              <div className="flex items-center gap-2 text-[#52525b] text-[10px] font-bold uppercase mb-2">
                <Database className="w-3 h-3" />
                Data Source
              </div>
              <div className="text-sm text-white mono">nexus-prod-db-us-east</div>
            </div>
            <div className="p-4 rounded-xl bg-[#09090b] border border-[#18181b]">
              <div className="flex items-center gap-2 text-[#52525b] text-[10px] font-bold uppercase mb-2">
                <ShieldCheck className="w-3 h-3" />
                Compliance
              </div>
              <div className="text-sm text-white">ISO 27001 / SOC2 Type II</div>
            </div>
            <div className="p-4 rounded-xl bg-[#09090b] border border-[#18181b]">
              <div className="flex items-center gap-2 text-[#52525b] text-[10px] font-bold uppercase mb-2">
                <Activity className="w-3 h-3" />
                Last Verified
              </div>
              <div className="text-sm text-white">12 Minutes Ago</div>
            </div>
          </div>
        </div>
      </main>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelect={(doc) => setSelectedDocId(doc.id)} 
      />
      <AIAssistant currentDoc={currentDoc} />

      <GlobalKeyHandler onSearch={() => setIsSearchOpen(true)} />
    </div>
  );
};

export default App;
