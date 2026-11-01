import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Menu, 
  X, 
  Search, 
  ArrowUp, 
  Send,
  BookOpen,
  Cpu,
  User,
  Mail,
  Home,
  Sliders
} from "lucide-react";
import { FaKaggle } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
import CommandPalette from "../common/CommandPalette";
import { ToastProvider, useToast } from "../ui/toast";

function LayoutContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const { showToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    showToast("Subscribed to research dispatches", "success");
    setEmailInput("");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { to: "/articles", label: "Articles", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/projects", label: "Projects", icon: <Cpu className="w-4 h-4" /> },
    { to: "/playground", label: "Lab", icon: <Sliders className="w-4 h-4" /> },
    { to: "/about", label: "About", icon: <User className="w-4 h-4" /> },
    { to: "/contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#141415] text-[#ededed]">
      {/* Global Command Palette */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#141415]/95 border-b border-white/[0.08] backdrop-blur-sm">
        {/* Top quiet metadata bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-1.5 bg-[#0f0f10] border-b border-white/[0.04] text-[11px] font-mono text-[#85858b]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#ededed]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cc38a]" />
              Inference node active
            </span>
            <span>•</span>
            <span>A100-SXM4-80GB</span>
            <span>•</span>
            <span>p99 latency 12.8ms</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Preprint: arXiv:2501.08492</span>
            <span>Nairobi [UTC+3]</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Brand & Wordmark */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#232325] border border-white/[0.1] flex items-center justify-center font-mono text-xs font-medium text-[#ededed]">
              DO
            </div>
            <div>
              <span className="font-medium text-sm text-[#ededed] tracking-tight">
                Davis Ochieng
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-[#85858b]">
                ML Systems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#19191b] p-1 rounded-lg border border-white/[0.08]">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#232325] text-[#ededed] border border-white/[0.08]"
                      : "text-[#a1a1a6] hover:text-[#ededed] hover:bg-white/[0.04]"
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Search Button & CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 text-xs text-[#a1a1a6] bg-[#19191b] hover:bg-[#232325] border border-white/[0.08] hover:border-white/[0.14] px-2.5 py-1.5 rounded-md transition-colors"
              title="Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#85858b]" />
              <span>Search</span>
              <kbd className="text-[10px] font-mono bg-[#232325] text-[#85858b] px-1.5 py-0.5 rounded border border-white/[0.08]">
                ⌘K
              </kbd>
            </button>

            <Link
              to="/playground"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#ededed] hover:bg-white text-[#0f0f10] text-xs font-medium transition-colors"
            >
              <span>Launch lab</span>
            </Link>

            <button
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-2 rounded-md bg-[#19191b] border border-white/[0.08] text-[#a1a1a6]"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md bg-[#19191b] border border-white/[0.08] text-[#a1a1a6]"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
              className="md:hidden border-b border-white/[0.08] bg-[#19191b] overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-[#232325] text-[#ededed]"
                          : "text-[#a1a1a6] hover:bg-white/[0.04] hover:text-[#ededed]"
                      }`
                    }
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-2.5 rounded-lg bg-[#232325] border border-white/[0.08] text-[#a1a1a6] hover:text-[#ededed] hover:border-white/[0.14] transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#0f0f10] pt-14 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/[0.08]">
            {/* Brand Column */}
            <div className="md:col-span-1 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#232325] border border-white/[0.1] flex items-center justify-center font-mono text-xs font-medium text-[#ededed]">
                  DO
                </div>
                <span className="font-medium text-sm text-[#ededed]">Davis Ochieng</span>
              </div>
              <p className="text-xs text-[#a1a1a6] leading-relaxed">
                Machine learning systems engineer working on low-rank adaptation, model quantization, and low-latency inference services.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://github.com/davis-ai"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-md bg-[#19191b] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] hover:border-white/[0.14] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com/in/davis-ochieng"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-md bg-[#19191b] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] hover:border-white/[0.14] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://twitter.com/davis_ochieng"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-md bg-[#19191b] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] hover:border-white/[0.14] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://kaggle.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-md bg-[#19191b] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] hover:border-white/[0.14] transition-colors"
                  aria-label="Kaggle"
                >
                  <FaKaggle className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://huggingface.co"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-md bg-[#19191b] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] hover:border-white/[0.14] transition-colors"
                  aria-label="Hugging Face"
                >
                  <SiHuggingface className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-[#ededed]">
                Platform
              </h4>
              <ul className="space-y-2 text-xs text-[#a1a1a6]">
                <li>
                  <Link to="/articles" className="hover:text-[#ededed] transition-colors">
                    Articles & research guides
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-[#ededed] transition-colors">
                    Production systems
                  </Link>
                </li>
                <li>
                  <Link to="/playground" className="hover:text-[#ededed] transition-colors">
                    Interactive ML lab
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#ededed] transition-colors">
                    Background & curriculum
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#ededed] transition-colors">
                    Contact & advisory
                  </Link>
                </li>
              </ul>
            </div>

            {/* Focus Domains */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-[#ededed]">
                Specializations
              </h4>
              <ul className="space-y-2 text-xs text-[#a1a1a6]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cc38a]" />
                  PEFT parameter allocation (LoRA/QLoRA)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#85858b]" />
                  High-throughput inference with vLLM and TensorRT
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#85858b]" />
                  3D volumetric segmentation and medical vision
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#85858b]" />
                  Asynchronous stream processing with Kafka
                </li>
              </ul>
            </div>

            {/* Research Dispatch */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-[#ededed]">
                Research dispatch
              </h4>
              <p className="text-xs text-[#a1a1a6]">
                Occasional technical notes on kernel optimization, distributed training, and benchmark results.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Work email address"
                    className="w-full bg-[#19191b] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-[#ededed] placeholder-[#85858b] focus:outline-none focus:border-white/[0.2] pr-10 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 p-1.5 bg-[#232325] hover:bg-[#2f2f32] text-[#ededed] rounded border border-white/[0.08] transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#85858b] gap-3">
            <p>© {new Date().getFullYear()} Davis Ochieng • Machine learning systems engineering</p>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span>React 19</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>Tailwind</span>
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
