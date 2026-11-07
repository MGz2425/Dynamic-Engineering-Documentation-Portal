
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
  User,
  Book,
  FileText,
  MessageSquare
} from 'lucide-react';
import { DocCategory } from './types.ts';
import { SAMPLE_DOCS } from './constants.tsx';

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
  const [bioContent, setBioContent] = useState<string>('');
  const [sermonContent, setSermonContent] = useState<string>('');
  const [activeSermon, setActiveSermon] = useState<string | null>(null);

  const currentDoc = useMemo(() => 
    SAMPLE_DOCS.find(d => d.id === selectedDocId) || SAMPLE_DOCS[0],
    [selectedDocId]
  );

  useEffect(() => {
    if (currentDoc.category === DocCategory.BIOGRAPHY) {
      fetch('/static/info.txt')
        .then(res => res.text())
        .then(text => setBioContent(text))
        .catch(() => setBioContent('H.E. Metropolitan Pachomius is the Metropolitan of Beheira, Matrouh and Pentapolis. He served as the Locum Tenens of the Coptic Orthodox Church in 2012.'));
    }
  }, [currentDoc.id]);

  const sermons = [
    {title:"العظة الأولى", file:"sermon1.txt"},
    {title:"العظة الثانية", file:"sermon2.txt"},
    {title:"العظة الثالثة", file:"sermon3.txt"}
  ];

  const loadSermon = (file: string) => {
    fetch(`/static/sermons/${file}`)
      .then(res => res.text())
      .then(text => {
        setSermonContent(text);
        setActiveSermon(file);
      })
      .catch(() => setSermonContent('Sermon content unavailable.'));
  };

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
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
            <img src="/static/images/anba_pachomius.jpg" alt="Anba Pachomius" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-blue-600 flex items-center justify-center"><span class="text-white font-bold">AP</span></div>'; }} />
          </div>
          <span className="font-bold text-lg tracking-tight">Anba Pachomius</span>
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
              <div className="w-8 h-8 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center overflow-hidden">
                <img src="/static/images/anba_pachomius.jpg" alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-xs font-bold text-[#a1a1aa]">AP</span>'; }} />
              </div>
              <span className="text-xs font-medium">Official Archive</span>
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
              <span>Search archive...</span>
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
              {currentDoc.category === DocCategory.BIOGRAPHY && (
                <div className="space-y-6">
                  <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8 border border-[#27272a]">
                    <img
                      src="/static/images/anba_pachomius.jpg"
                      alt="Anba Pachomius Biography"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'; }}
                    />
                  </div>
                  <div className="whitespace-pre-wrap font-sans leading-relaxed text-[#e4e4e7] text-lg">
                    {bioContent || currentDoc.content.trim()}
                  </div>
                </div>
              )}

              {currentDoc.category === DocCategory.SERMONS && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {sermons.map((sermon, idx) => (
                      <button
                        key={idx}
                        onClick={() => loadSermon(sermon.file)}
                        className={`p-4 rounded-lg border transition-all text-center font-medium ${
                          activeSermon === sermon.file
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-[#09090b] border-[#27272a] text-[#a1a1aa] hover:border-blue-600/50 hover:text-white'
                        }`}
                      >
                        <MessageSquare className="w-5 h-5 mx-auto mb-2 opacity-50" />
                        {sermon.title}
                      </button>
                    ))}
                  </div>
                  {sermonContent && (
                    <div className="mt-8 p-6 bg-[#09090b] rounded-lg border border-[#27272a] animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="whitespace-pre-wrap font-sans leading-relaxed text-[#e4e4e7] text-lg">
                        {sermonContent}
                      </div>
                    </div>
                  )}
                  {!sermonContent && (
                    <div className="text-center py-12 text-[#52525b]">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>Select a sermon from the list above to read its content.</p>
                    </div>
                  )}
                </div>
              )}

              {currentDoc.category === DocCategory.ARTICLES && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-6 rounded-xl bg-[#09090b] border border-[#27272a] group">
                      <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                        <FileText className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Theological Article {i}</h3>
                      <p className="text-[#a1a1aa] text-sm mb-4 line-clamp-2">Exploring deep theological concepts and spiritual insights from H.E. Metropolitan Pachomius...</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#18181b] text-[#52525b] border border-[#27272a]">
                        Coming Soon
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {currentDoc.category === DocCategory.BOOKS && (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="space-y-3">
                        <div className="aspect-[3/4] bg-[#09090b] border border-[#27272a] rounded-lg flex items-center justify-center relative group overflow-hidden">
                          <Book className="w-12 h-12 text-[#27272a] group-hover:scale-110 transition-transform" />
                          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors" />
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm font-bold text-white mb-1">Book Title {i}</h4>
                          <button disabled className="w-full mt-2 px-3 py-1.5 bg-[#18181b] text-[#52525b] rounded text-[10px] font-bold uppercase cursor-not-allowed">
                            Download PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-lg bg-blue-600/5 border border-blue-600/20 text-center text-blue-400 text-sm">
                    Books will be added soon.
                  </div>
                </div>
              )}
            </div>
          </article>

          <div className="mt-12 pt-8 border-t border-[#18181b] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#09090b] border border-[#18181b]">
              <div className="flex items-center gap-2 text-[#52525b] text-[10px] font-bold uppercase mb-2">
                <Database className="w-3 h-3" />
                Digital Archive
              </div>
              <div className="text-sm text-white mono">beheira-diocese-vault</div>
            </div>
            <div className="p-4 rounded-xl bg-[#09090b] border border-[#18181b]">
              <div className="flex items-center gap-2 text-[#52525b] text-[10px] font-bold uppercase mb-2">
                <ShieldCheck className="w-3 h-3" />
                Ecclesiastical Approval
              </div>
              <div className="text-sm text-white">Verified by Holy Synod</div>
            </div>
            <div className="p-4 rounded-xl bg-[#09090b] border border-[#18181b]">
              <div className="flex items-center gap-2 text-[#52525b] text-[10px] font-bold uppercase mb-2">
                <Activity className="w-3 h-3" />
                Last Updated
              </div>
              <div className="text-sm text-white">Today</div>
            </div>
          </div>
        </div>
      </main>

      <GlobalKeyHandler onSearch={() => setIsSearchOpen(true)} />
    </div>
  );
};

export default App;
