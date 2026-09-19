import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Menu, 
  X, 
  Search, 
  Sparkles, 
  ArrowUp, 
  Send,
  BookOpen,
  Cpu,
  User,
  Mail,
  Home
} from "lucide-react";
import { FaKaggle } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import CommandPalette from "../common/CommandPalette";
import { ToastProvider, useToast } from "../ui/toast";

function LayoutContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const { showToast } = useToast();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    showToast("🎉 Thank you for subscribing to the Data Science Dispatch!", "success");
    setEmailInput("");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { to: "/articles", label: "Articles", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/projects", label: "Projects", icon: <Cpu className="w-4 h-4" /> },
    { to: "/playground", label: "ML Lab", icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { to: "/about", label: "About", icon: <User className="w-4 h-4" /> },
    { to: "/contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Global Command Palette */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Glassmorphic Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#090d16]/80 border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Status Badge */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              DO
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors flex items-center gap-2">
                Davis Ochieng
                <span className="hidden sm:inline-block text-xs font-medium text-amber-400/90 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  AI / Data Science
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Available for high-impact projects
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "text-slate-950 font-semibold bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/20"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-amber-500/40 px-3.5 py-2 rounded-full transition shadow-sm"
              title="Search anything (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Search...</span>
              <kbd className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-2.5 rounded-xl bg-slate-900 border border-white/10 text-amber-400 hover:bg-slate-800"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:text-white hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 bg-[#090d16]/95 backdrop-blur-2xl overflow-hidden"
            >
              <div className="px-6 py-6 space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition ${
                        isActive
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-24 relative z-10">
        <Outlet />
      </main>

      {/* Back to top floating button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950 shadow-xl backdrop-blur-md transition-all hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Premium Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#060910] pt-16 pb-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
            {/* Brand Column */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-base">
                  DO
                </div>
                <span className="font-bold text-xl text-white">Davis Ochieng</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Computer Scientist & Senior ML Engineer building state-of-the-art predictive architectures, LLM systems, and data platforms.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/davis-ai"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/davis-ochieng"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/davis_ochieng"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://kaggle.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition"
                  aria-label="Kaggle"
                >
                  <FaKaggle className="w-4 h-4" />
                </a>
                <a
                  href="https://huggingface.co"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition"
                  aria-label="Hugging Face"
                >
                  <SiHuggingface className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Explore Platform
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to="/articles" className="hover:text-amber-400 transition">
                    Data Science Articles & Guides
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-amber-400 transition">
                    Featured AI / ML Projects
                  </Link>
                </li>
                <li>
                  <Link to="/playground" className="hover:text-amber-400 transition flex items-center gap-1.5 text-amber-300/90 font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> Interactive ML Playground
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-amber-400 transition">
                    About & Technical Resume
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-amber-400 transition">
                    Contact & Collaboration
                  </Link>
                </li>
              </ul>
            </div>

            {/* Featured Domains */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Core Specializations
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Large Language Models & PEFT
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Real-Time MLOps & Fast Inference
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Computer Vision & 3D Segmentation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Interpretable AI & Survival Analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  Full-Stack Scalable Web Architecture
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Data Science Dispatch
              </h4>
              <p className="text-xs text-slate-400">
                Get monthly deep-dives on machine learning architectures, code notebooks, and MLOps strategies. No spam, ever.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your work email..."
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 pr-10 transition"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-semibold flex items-center justify-center transition"
                    aria-label="Subscribe to newsletter"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  Join 1,800+ engineers, researchers, and data leaders.
                </p>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Davis Ochieng. Built for high-performance Machine Learning & Data Engineering.</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                React 19 + TypeScript + Tailwind
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Layout() {
  return (
    <ToastProvider>
      <LayoutContent />
    </ToastProvider>
  );
}
