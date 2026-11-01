import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
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
      showToast(`Staging sandbox for "${project.title}" initialized`, 'info');
    }
  };

  return (
    <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-2 border-b border-white/[0.08] pb-6">
        <div className="font-mono text-xs text-[#85858b]">
          Production deployments
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium text-[#ededed] tracking-tight font-heading">
          Machine learning systems
        </h1>
        <p className="text-xs sm:text-sm text-[#a1a1a6] max-w-2xl">
          Deep learning models, low-latency inference pipelines, and automated intelligence engines engineered for production.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-2.5 bg-[#19191b] rounded-lg border border-white/[0.08]">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-1 w-full md:w-auto font-mono text-xs">
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? PROJECTS_DATA.length 
              : PROJECTS_DATA.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-[#232325] text-[#ededed] border border-white/[0.08]'
                    : 'text-[#85858b] hover:text-[#ededed] hover:bg-white/[0.04]'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] text-[#85858b]">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 font-mono text-xs">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#85858b]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack or architecture..."
            className="w-full bg-[#141415] border border-white/[0.08] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#ededed] placeholder-[#85858b] focus:outline-none focus:border-white/[0.2]"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <SpotlightCard
            key={project.id}
            className="p-5 sm:p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3.5">
              {/* Category & Status */}
              <div className="flex items-center justify-between font-mono text-xs text-[#85858b]">
                <span>{project.category}</span>
                {project.featured && (
                  <span className="text-[11px] text-[#4cc38a]">
                    Core deployment
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base sm:text-lg font-medium text-[#ededed] font-heading">
                  {project.title}
                </h3>
                <p className="text-xs text-[#85858b] mt-0.5 font-mono">
                  {project.subtitle}
                </p>
                <p className="text-xs text-[#a1a1a6] mt-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Key Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded-lg bg-[#141415] border border-white/[0.08] font-mono">
                {project.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="text-center">
                    <p className="text-[10px] text-[#85858b]">{m.label}</p>
                    <p className="text-xs font-medium text-[#ededed]">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Architecture Highlights */}
              <div className="space-y-1 font-mono text-xs">
                <p className="text-[10px] text-[#85858b]">
                  Architecture notes:
                </p>
                <ul className="space-y-1">
                  {project.architectureHighlights.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs text-[#a1a1a6] flex items-start gap-2">
                      <span className="text-[#85858b] shrink-0 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#232325] text-[#85858b] border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-white/[0.08] text-xs">
              <button
                onClick={() => setActiveModalProject(project)}
                className="btn-secondary flex-1"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Blueprint</span>
              </button>

              <button
                onClick={() => handleDemoClick(project)}
                className="btn-primary"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Sandbox</span>
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-[#232325] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Blueprint Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-2xl bg-[#19191b] border border-white/[0.08] rounded-xl p-5 sm:p-6 shadow-2xl space-y-5 text-[#ededed] max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <span className="text-[11px] font-mono text-[#85858b]">
                    {activeModalProject.category}
                  </span>
                  <h3 className="text-lg font-medium text-[#ededed] font-heading mt-0.5">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1 rounded text-[#85858b] hover:text-[#ededed]"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1.5">
                  <span className="text-[11px] font-mono text-[#85858b] block">
                    System overview
                  </span>
                  <p className="text-[#a1a1a6] leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#141415] border border-white/[0.06] space-y-2">
                  <span className="text-[11px] font-mono text-[#85858b] block">
                    Architecture & inference pipeline
                  </span>
                  <ul className="space-y-1.5 text-[#a1a1a6]">
                    {activeModalProject.architectureHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#85858b]">•</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                  {activeModalProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-[#141415] border border-white/[0.06] text-center">
                      <span className="text-[10px] text-[#85858b] block">{m.label}</span>
                      <span className="text-[#ededed] font-medium text-xs">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#85858b] hover:text-[#ededed] flex items-center gap-1.5 transition-colors font-mono"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect source</span>
                </a>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
