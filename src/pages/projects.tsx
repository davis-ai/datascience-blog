import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Github, 
  ExternalLink, 
  Sparkles, 
  Search, 
  Layers, 
  X
} from 'lucide-react';
import { PROJECTS_DATA, type Project } from '../data/projects';
import { useToast } from '../components/ui/toast';
import SpotlightCard from '../components/ui/SpotlightCard';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const { showToast } = useToast();

  const categories = ['All', 'Computer Vision', 'NLP & LLMs', 'Predictive Analytics', 'MLOps & Systems'];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDemoClick = (project: Project) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    } else {
      showToast(`Staging sandbox for "${project.title}" initialized in GPU cluster`, 'info');
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-emerald-400">
          <Cpu className="w-3.5 h-3.5" />
          <span>[SYSTEMS_CATALOG // PROD_TIER_A]</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
          Featured Machine Learning <span className="gradient-text-emerald">Systems</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-base font-mono">
          Scalable deep learning models, low-latency inference pipelines, and automated intelligence engines engineered for production.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 bg-black/40 rounded-2xl border border-white/10 backdrop-blur-md">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto font-mono text-xs">
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? PROJECTS_DATA.length 
              : PROJECTS_DATA.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-black/30 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat ? 'bg-slate-950/30 text-slate-950' : 'bg-white/5 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 font-mono text-xs">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack or architecture..."
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition"
          />
        </div>
      </div>

      {/* Projects Grid with SpotlightCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, idx) => (
          <SpotlightCard
            key={project.id}
            cornerTag={`PRJ_NODE_${idx + 1}`}
            showCrosshairs={true}
            className="p-6 sm:p-7 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              {/* Category & Status */}
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded text-[10px]">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded">
                    <Sparkles className="w-3 h-3" /> Core Deployment
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors font-heading">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-mono">
                  {project.subtitle}
                </p>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Key Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 font-mono">
                {project.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="text-center">
                    <p className="text-[9px] text-slate-500 uppercase tracking-tight">{m.label}</p>
                    <p className="text-xs sm:text-sm font-black text-white">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Architecture Highlights */}
              <div className="space-y-1.5 font-mono">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Technical Architecture Highlights:
                </p>
                <ul className="space-y-1">
                  {project.architectureHighlights.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] font-mono text-xs">
              <button
                onClick={() => setActiveModalProject(project)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold border border-white/10 flex items-center justify-center gap-2 transition"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Architecture Blueprint</span>
              </button>

              <button
                onClick={() => handleDemoClick(project)}
                className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 transition shadow"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Sandbox</span>
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Deep Architecture Blueprint Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-[#090e18] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 max-h-[85vh] overflow-y-auto font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                    SYSTEM SPECIFICATION // {activeModalProject.category}
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-white/10"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                    SYSTEM OVERVIEW
                  </span>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {activeModalProject.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                    ARCHITECTURE & INFERENCE PIPELINE
                  </span>
                  <ul className="space-y-2 text-slate-300">
                    {activeModalProject.architectureHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">✦</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                  {activeModalProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-black/30 border border-white/5 text-center">
                      <span className="text-[9px] text-slate-500 block uppercase">{m.label}</span>
                      <span className="text-emerald-400 font-bold text-sm">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold border border-white/5"
                >
                  Close Blueprint
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
