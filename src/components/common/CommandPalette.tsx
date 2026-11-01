import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Cpu, User, Mail, Home, ArrowRight, X, Sliders } from 'lucide-react';
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
    { label: 'Home', path: '/', icon: <Home className="w-4 h-4 text-[#85858b]" /> },
    { label: 'Articles & publications', path: '/articles', icon: <BookOpen className="w-4 h-4 text-[#85858b]" /> },
    { label: 'Production projects', path: '/projects', icon: <Cpu className="w-4 h-4 text-[#85858b]" /> },
    { label: 'Interactive lab', path: '/playground', icon: <Sliders className="w-4 h-4 text-[#85858b]" /> },
    { label: 'About & background', path: '/about', icon: <User className="w-4 h-4 text-[#85858b]" /> },
    { label: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4 text-[#85858b]" /> },
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    onClose();
    setQuery('');
    navigate(path);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          className="w-full max-w-xl bg-[#19191b] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden text-[#ededed]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3 border-b border-white/[0.08] gap-3">
            <Search className="w-4 h-4 text-[#85858b] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, projects, benchmarks..."
              autoFocus
              className="w-full bg-transparent text-[#ededed] placeholder-[#85858b] focus:outline-none text-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#85858b] hover:text-[#ededed] text-xs px-2 py-0.5 bg-[#232325] rounded"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-[#85858b] hover:text-[#ededed] rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-3">
            {/* Navigation */}
            {navItems.length > 0 && (
              <div>
                <p className="text-[11px] font-mono text-[#85858b] px-3 py-1">
                  Navigation
                </p>
                <div className="space-y-0.5">
                  {navItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleSelect(item.path)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#232325] text-left transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 text-xs text-[#a1a1a6] group-hover:text-[#ededed]">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#85858b] group-hover:text-[#ededed] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Articles */}
            {filteredArticles.length > 0 && (
              <div>
                <p className="text-[11px] font-mono text-[#85858b] px-3 py-1">
                  Articles
                </p>
                <div className="space-y-0.5">
                  {filteredArticles.map((article) => (
                    <button
                      key={article.slug}
                      onClick={() => handleSelect(`/articles/${article.slug}`)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#232325] text-left transition-colors group"
                    >
                      <div className="pr-2">
                        <p className="text-xs text-[#ededed]">
                          {article.title}
                        </p>
                        <p className="text-[11px] text-[#85858b] line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-[#85858b] shrink-0">
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
                <p className="text-[11px] font-mono text-[#85858b] px-3 py-1">
                  Projects
                </p>
                <div className="space-y-0.5">
                  {filteredProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleSelect('/projects')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#232325] text-left transition-colors group"
                    >
                      <div>
                        <p className="text-xs text-[#ededed]">
                          {project.title}
                        </p>
                        <p className="text-[11px] text-[#85858b] line-clamp-1">
                          {project.subtitle}
                        </p>
                      </div>
                      <div className="flex gap-1 shrink-0 ml-3 font-mono">
                        {project.techStack.slice(0, 2).map((t) => (
                          <span key={t} className="text-[10px] text-[#85858b] bg-[#232325] px-1.5 py-0.5 rounded">
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
              <div className="text-center py-6 text-[#85858b] text-xs">
                No matching results found for "{query}".
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-[#141415] border-t border-white/[0.08] flex items-center justify-between text-[11px] text-[#85858b] font-mono">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1 py-0.5 bg-[#232325] text-[#ededed] rounded text-[10px]">↑</kbd> <kbd className="px-1 py-0.5 bg-[#232325] text-[#ededed] rounded text-[10px]">↓</kbd> navigate</span>
              <span><kbd className="px-1 py-0.5 bg-[#232325] text-[#ededed] rounded text-[10px]">ESC</kbd> close</span>
            </div>
            <span>Press Enter to select</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
