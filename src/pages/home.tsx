import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Activity, 
  Github
} from "lucide-react";
import { FaPython, FaDocker, FaAws } from "react-icons/fa";
import { SiPytorch, SiTensorflow, SiFastapi, SiScikitlearn, SiApachekafka, SiReact } from "react-icons/si";
import profileLarge from "../assets/images/profile-optimized-large.jpg";
import profileMedium from "../assets/images/profile-optimized-medium.jpg";
import profileSmall from "../assets/images/profile-optimized-small.jpg";
import { ARTICLES_DATA } from "../data/articles";
import { PROJECTS_DATA } from "../data/projects";

export default function HomePage() {
  const [typedRoleIndex, setTypedRoleIndex] = useState(0);
  const roles = [
    "Machine Learning Engineer",
    "Data Scientist",
    "Deep Learning Researcher",
    "Scalable AI Systems Architect"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const stats = [
    { label: "Production Models", value: "15+", detail: "Deployed to Kubernetes/Edge" },
    { label: "Article Readers", value: "50k+", detail: "Global Data Science Audience" },
    { label: "Inference Latency", value: "<15ms", detail: "Sub-20ms ONNX/TensorRT" },
    { label: "Open Source Stars", value: "1.2k+", detail: "GitHub Community" },
  ];

  const techEcosystem = [
    { name: "Python", icon: <FaPython className="text-yellow-400 text-3xl" />, category: "Core Language" },
    { name: "PyTorch", icon: <SiPytorch className="text-red-500 text-3xl" />, category: "Deep Learning" },
    { name: "TensorFlow", icon: <SiTensorflow className="text-orange-400 text-3xl" />, category: "Neural Networks" },
    { name: "Scikit-Learn", icon: <SiScikitlearn className="text-cyan-400 text-3xl" />, category: "Classical ML" },
    { name: "FastAPI", icon: <SiFastapi className="text-teal-400 text-3xl" />, category: "Async Inference" },
    { name: "Kafka", icon: <SiApachekafka className="text-red-400 text-3xl" />, category: "Stream Ingestion" },
    { name: "Docker", icon: <FaDocker className="text-blue-400 text-3xl" />, category: "Containerization" },
    { name: "AWS Cloud", icon: <FaAws className="text-amber-400 text-3xl" />, category: "Cloud & MLOps" },
    { name: "React 19", icon: <SiReact className="text-cyan-300 text-3xl" />, category: "Full-Stack UI" },
  ];

  const featuredArticles = ARTICLES_DATA.slice(0, 3);
  const featuredProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> Data Science • Machine Learning • AI Architecture
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Hi, I'm <span className="gradient-text-gold">Davis Ochieng</span>
            </h1>

            <div className="h-8 flex items-center justify-center lg:justify-start">
              <span className="text-lg sm:text-2xl font-mono text-cyan-400 font-semibold">
                &gt; {roles[typedRoleIndex]}
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              I specialize in bridging advanced Machine Learning theory with production-grade software engineering. From training custom Large Language Models and 3D computer vision to building sub-15ms real-time inference microservices.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/articles"
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 transition hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                Read Deep-Dives
              </Link>
              <Link
                to="/playground"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-sm border border-amber-500/40 flex items-center gap-2 transition hover:border-amber-400"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Launch ML Playground
              </Link>
              <Link
                to="/projects"
                className="px-5 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-800 transition"
              >
                View Projects
              </Link>
            </div>
          </motion.div>

          {/* Right Profile & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-cyan-500/20 to-transparent rounded-full blur-3xl" />

            <div className="relative">
              {/* Profile Image with Cyber Ring */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-br from-amber-400 via-slate-800 to-cyan-400 shadow-2xl relative">
                <picture>
                  <source srcSet={profileLarge} media="(min-width: 1024px)" width="320" height="320" />
                  <source srcSet={profileMedium} media="(min-width: 768px)" width="320" height="320" />
                  <img
                    src={profileSmall}
                    alt="Davis Ochieng"
                    width="320"
                    height="320"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover rounded-full filter contrast-105"
                  />
                </picture>
              </div>

              {/* Floating Badge 1: Models */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -left-6 glass-card px-4 py-2 rounded-2xl border border-amber-500/40 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xs">
                  ⚡
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">PEFT / LLMs</p>
                  <p className="text-xs font-bold text-white">LoRA & QLoRA</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Latency */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-2xl border border-cyan-500/40 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs">
                  🚀
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Real-Time MLOps</p>
                  <p className="text-xs font-bold text-white">ONNX & FastAPI</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Verified Metrics Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1 p-2">
              <p className="text-3xl sm:text-4xl font-black text-white font-mono gradient-text-gold">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-200">
                {stat.label}
              </p>
              <p className="text-[11px] text-slate-400">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured AI Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
              Engineered for Production
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              Featured AI & Data Science Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group"
          >
            Explore all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {project.metrics[0].label}: <strong className="text-white">{project.metrics[0].value}</strong>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to="/projects"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  View Details →
                </Link>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive ML Lab Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-card border border-amber-500/40 p-8 sm:p-12 shadow-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-cyan-950/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" /> Real-Time In-Browser Simulator
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Interactive Machine Learning Playground
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Step through live polynomial gradient descent, tweak hyperparameters, test confusion matrix trade-offs, and visualize activation derivatives directly in your browser.
              </p>
              <div className="pt-2">
                <Link
                  to="/playground"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition"
                >
                  <Activity className="w-4 h-4" />
                  Launch Simulator
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 shadow-2xl space-y-3 w-full max-w-sm">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono">MSE Loss:</span>
                  <span className="text-emerald-400 font-mono font-bold">0.00342</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-4/5 h-full bg-emerald-400 rounded-full animate-pulse" />
                </div>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-400 font-mono">Learning Rate (α):</span>
                  <span className="text-amber-400 font-mono font-bold">0.050</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono">F1-Score:</span>
                  <span className="text-cyan-400 font-mono font-bold">96.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
              Latest Insights
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              Recent Technical Publications
            </h2>
          </div>
          <Link
            to="/articles"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <div
              key={article.slug}
              className="glass-card rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
                    {article.category}
                  </span>
                  <span className="text-slate-400 text-[11px]">{article.readTime}</span>
                </div>

                <Link to={`/articles/${article.slug}`}>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">{article.publishedDate}</span>
                <Link
                  to={`/articles/${article.slug}`}
                  className="font-bold text-cyan-400 hover:text-cyan-300"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Ecosystem */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">
            Technical Stack & Ecosystem
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Tools, frameworks, and infrastructure utilized in building production AI systems.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {techEcosystem.map((tech) => (
            <div
              key={tech.name}
              className="glass-card p-5 rounded-2xl border border-slate-800/80 text-center space-y-2 hover:border-amber-500/40 transition group"
            >
              <div className="flex justify-center group-hover:scale-110 transition-transform">
                {tech.icon}
              </div>
              <p className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                {tech.name}
              </p>
              <p className="text-[10px] text-slate-500">{tech.category}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
