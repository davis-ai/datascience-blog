import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Cpu, Sparkles, User, Mail, Home, ArrowRight, X } from 'lucide-react';
import { ARTICLES_DATA } from '../../data/articles';
import { PROJECTS_DATA } from '../../data/projects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredArticles = ARTICLES_DATA.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const navItems = [
    { label: 'Home Page', path: '/', icon: <Home className="w-4 h-4 text-[#c8f135]" /> },
    { label: 'All Articles & Tutorials', path: '/articles', icon: <BookOpen className="w-4 h-4 text-emerald-400" /> },
    { label: 'Featured AI Projects', path: '/projects', icon: <Cpu className="w-4 h-4 text-[#c8f135]" /> },
    { label: 'Interactive ML Playground', path: '/playground', icon: <Sparkles className="w-4 h-4 text-teal-400" /> },
    { label: 'About & Career Journey', path: '/about', icon: <User className="w-4 h-4 text-lime-400" /> },
    { label: 'Contact & Consultation', path: '/contact', icon: <Mail className="w-4 h-4 text-emerald-400" /> },
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    onClose();
    setQuery('');
    navigate(path);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-[#080d08]/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-slate-200 backdrop-blur-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="flex items-center px-5 py-4 border-b border-white/[0.08] gap-3">
            <Search className="w-5 h-5 text-[#c8f135] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, projects, ML tools, or architecture docs..."
              autoFocus
              className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-base"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 bg-white/5 rounded-full"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-3.5 space-y-4">
            {/* Quick Navigation */}
            {navItems.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5 font-mono">
                  Navigation
                </p>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleSelect(item.path)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/5 text-left transition group"
                    >
                      <div className="flex items-center gap-3 text-sm text-slate-200 group-hover:text-[#c8f135]">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-[#c8f135] transition" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Articles */}
            {filteredArticles.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5 font-mono">
                  Articles & Tutorials
                </p>
                <div className="space-y-1">
                  {filteredArticles.map((article) => (
                    <button
                      key={article.slug}
                      onClick={() => handleSelect(`/articles/${article.slug}`)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/5 text-left transition group"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-100 group-hover:text-[#c8f135]">
                          {article.title}
                        </p>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-[#c8f135] bg-[#c8f135]/10 border border-[#c8f135]/25 px-2.5 py-0.5 rounded-full shrink-0 ml-3">
                        {article.readTime}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5 font-mono">
                  AI Projects
                </p>
                <div className="space-y-1">
                  {filteredProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleSelect('/projects')}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/5 text-left transition group"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-100 group-hover:text-[#c8f135]">
                          {project.title}
                        </p>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {project.subtitle}
                        </p>
                      </div>
                      <div className="flex gap-1 shrink-0 ml-3 font-mono">
                        {project.techStack.slice(0, 2).map((t) => (
                          <span key={t} className="text-[10px] text-slate-300 bg-white/5 px-2 py-0.5 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredArticles.length === 0 && filteredProjects.length === 0 && navItems.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">
                No matching results found for "{query}".
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-3 bg-black/50 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 bg-white/5 text-slate-300 rounded text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white/5 text-slate-300 rounded text-[10px]">↓</kbd> to navigate</span>
              <span><kbd className="px-1.5 py-0.5 bg-white/5 text-slate-300 rounded text-[10px]">ESC</kbd> to close</span>
            </div>
            <span className="text-[#c8f135]">Davis Ochieng ML Systems</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
