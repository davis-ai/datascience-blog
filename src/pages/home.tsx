import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Activity, 
  Github,
  Terminal as TerminalIcon,
  Cpu,
  Layers,
  Zap,
  Copy,
  Check,
  Code2
} from "lucide-react";
import { FaPython, FaDocker, FaAws } from "react-icons/fa";
import { SiPytorch, SiFastapi, SiScikitlearn, SiApachekafka, SiReact } from "react-icons/si";
import profileSmall from "../assets/images/profile-optimized-small.jpg";
import { ARTICLES_DATA } from "../data/articles";
import { PROJECTS_DATA } from "../data/projects";
import SpotlightCard from "../components/ui/SpotlightCard";
import TextScramble from "../components/common/TextScramble";
import TechTicker from "../components/common/TechTicker";
import ModelTelemetryChart from "../components/common/ModelTelemetryChart";
import AttentionVisualizer from "../components/common/AttentionVisualizer";
import TerminalConsole from "../components/common/TerminalConsole";
import { useToast } from "../components/ui/toast";

export default function HomePage() {
  const { showToast } = useToast();
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  // In-browser interactive mini gradient descent simulator state
  const [simLearningRate, setSimLearningRate] = useState<number>(0.05);
  const simSteps = 24;

  // Compute simulated loss and weights based on interactive learning rate
  const simulatedLoss = Math.max(0.0018, (0.45 * Math.exp(-simLearningRate * simSteps * 1.5) + (simLearningRate > 0.08 ? (simLearningRate - 0.08) * 4 : 0))).toFixed(4);
  const isDiverging = simLearningRate > 0.12;

  const copyBibtex = () => {
    const bibtex = `@article{ochieng2025qlora,
  title={Rank Allocation Dynamics in Quantized Low-Rank Adaptation of Mixture-of-Experts Models},
  author={Ochieng, Davis},
  journal={arXiv preprint arXiv:2501.08492},
  year={2025}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    showToast("BibTeX citation copied to clipboard!", "success");
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const metricsStats = [
    { 
      tag: "SYS_01", 
      label: "Production Inference", 
      val: "<13ms", 
      desc: "p99 latency with TensorRT & Triton Server", 
      accent: "text-amber-400" 
    },
    { 
      tag: "SYS_02", 
      label: "Peak LLM Throughput", 
      val: "142 tok/s", 
      desc: "4-bit AWQ quantized Llama-3-8B on A100", 
      accent: "text-cyan-400" 
    },
    { 
      tag: "SYS_03", 
      label: "Deployed Architectures", 
      val: "15+ Models", 
      desc: "Vision, LLM fine-tunes & Real-time Classifiers", 
      accent: "text-emerald-400" 
    },
    { 
      tag: "SYS_04", 
      label: "Research Audience", 
      val: "50k+ Readers", 
      desc: "Engineers reading deep-dive technical guides", 
      accent: "text-purple-400" 
    },
  ];

  const techCategories = [
    {
      title: "Deep Learning & LLM Fine-Tuning",
      items: [
        { name: "PyTorch 2.5", icon: <SiPytorch className="text-red-500" />, note: "Distributed DDP, FSDP" },
        { name: "HuggingFace PEFT", icon: <Layers className="text-yellow-400" />, note: "LoRA, QLoRA, DoRA" },
        { name: "FlashAttention-2", icon: <Zap className="text-cyan-400" />, note: "Tiled IO kernel acceleration" },
        { name: "vLLM / Triton", icon: <Cpu className="text-emerald-400" />, note: "Continuous batching & PagedAttention" },
      ]
    },
    {
      title: "High-Throughput Systems & MLOps",
      items: [
        { name: "FastAPI Async", icon: <SiFastapi className="text-teal-400" />, note: "Sub-15ms non-blocking endpoints" },
        { name: "Apache Kafka", icon: <SiApachekafka className="text-red-400" />, note: "Real-time 20k msg/s streaming" },
        { name: "Docker & K8s", icon: <FaDocker className="text-blue-400" />, note: "GPU-accelerated orchestrations" },
        { name: "AWS Cloud / SageMaker", icon: <FaAws className="text-amber-400" />, note: "Multi-node training clusters" },
      ]
    },
    {
      title: "Data Engineering & Analytics",
      items: [
        { name: "Python 3.12", icon: <FaPython className="text-yellow-300" />, note: "Vectorized scientific compute" },
        { name: "Scikit-Learn", icon: <SiScikitlearn className="text-cyan-400" />, note: "Gradient boosted ensembles" },
        { name: "SHAP / TreeExplainer", icon: <Activity className="text-pink-400" />, note: "Feature attribution & interpretability" },
        { name: "React 19 / TS", icon: <SiReact className="text-cyan-300" />, note: "High-craft WebGL & research UI" },
      ]
    }
  ];

  const featuredProjects = PROJECTS_DATA.slice(0, 3);
  const featuredArticles = ARTICLES_DATA.slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      {/* Top Technical Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Technical Identity & Editorial Bio */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold">DAVIS OCHIENG</span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-400">ML SYSTEMS ARCHITECT</span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] font-heading">
                Scalable Machine Learning & Production <span className="gradient-text-gold">AI Architectures</span>
              </h1>
              
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1.5 rounded-lg w-fit">
                <span>&gt;</span>
                <TextScramble 
                  text="LoRA / QLoRA • 3D Computer Vision • Sub-15ms Real-Time Inference" 
                  speed={20}
                />
              </div>
            </div>

            {/* Narrative description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              I bridge mathematical deep learning research with robust production systems. Specializing in high-throughput inference optimization, low-rank LLM parameter adaptation, and distributed ML pipelines serving millions of predictions.
            </p>

            {/* Quick Profile Badge with verified credentials */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center gap-4 max-w-md">
              <div className="relative">
                <img
                  src={profileSmall}
                  alt="Davis Ochieng"
                  width="54"
                  height="54"
                  className="w-13 h-13 rounded-xl object-cover border border-amber-500/40 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0c121e]" />
              </div>
              <div className="text-xs space-y-0.5 font-mono">
                <div className="text-white font-bold flex items-center gap-1.5">
                  Davis Ochieng
                  <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-500/30">
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Senior ML Systems Engineer</p>
                <p className="text-[10px] text-slate-500">BSc. Comp Sci (First Class) • AWS Certified ML</p>
              </div>
            </div>

            {/* Magnetic CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/playground"
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                Launch ML Lab
              </Link>
              <Link
                to="/projects"
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs font-mono border border-white/10 flex items-center gap-2 transition"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                Explore Projects
              </Link>
              <Link
                to="/articles"
                className="px-4 py-3 rounded-xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-amber-400 font-mono text-xs transition flex items-center gap-1"
              >
                <BookOpen className="w-4 h-4" />
                Read Papers →
              </Link>
            </div>
          </div>

          {/* Right Column: Live Telemetry Console (ApexCharts powered) */}
          <div className="lg:col-span-6">
            <SpotlightCard 
              showCrosshairs={true}
              cornerTag="TELEMETRY_01"
              className="p-5 sm:p-6 shadow-2xl"
            >
              <ModelTelemetryChart />
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Infinite Hardware & Stack Ticker Tape (Basement Studio style) */}
      <TechTicker />

      {/* 4 High-Precision Telemetry Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricsStats.map((metric) => (
            <SpotlightCard
              key={metric.tag}
              cornerTag={metric.tag}
              showCrosshairs={true}
              className="p-5"
            >
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  {metric.label}
                </span>
                <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${metric.accent}`}>
                  {metric.val}
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  {metric.desc}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Deep Architecture Bento Grid (Aceternity UI + Book of Shapes style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <Layers className="w-4 h-4" />
              <span>Interactive Architecture Lattice</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-heading mt-1">
              Deep Engineering Modules
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-sm">
            Live interactive simulations, attention weight maps, and real-time model telemetry directly in your browser.
          </p>
        </div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Module 1: Multi-Head Attention Visualizer (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard
              cornerTag="ATTN_LATTICE"
              showCrosshairs={true}
              className="p-6 h-full flex flex-col justify-between"
            >
              <AttentionVisualizer />
            </SpotlightCard>
          </div>

          {/* Module 2: Hacker Terminal Console (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard
              cornerTag="CLI_SHELL"
              showCrosshairs={true}
              className="p-5 h-full flex flex-col justify-between"
            >
              <div className="space-y-3 pb-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-amber-400" />
                    Interactive Cluster Terminal
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    LIVE_SESSION
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Execute live system queries against the simulated model deployment cluster.
                </p>
              </div>
              <TerminalConsole />
            </SpotlightCard>
          </div>

          {/* Module 3: In-Browser Gradient Descent Optimizer (4 cols) */}
          <div className="lg:col-span-4">
            <SpotlightCard
              cornerTag="SGD_SIMULATOR"
              showCrosshairs={true}
              className="p-6 space-y-4"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Live Gradient Descent Optimizer
                </span>
                <p className="text-xs text-slate-400">
                  Tweak the learning rate (α) and observe empirical loss convergence.
                </p>
              </div>

              {/* Parabolic Loss Curve Representation */}
              <div className="h-32 bg-black/40 rounded-xl border border-white/5 relative p-3 flex flex-col justify-between overflow-hidden">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 20 100 Q 150 15 280 100"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />
                  {/* Current gradient descent ball */}
                  <circle
                    cx={isDiverging ? 260 : Math.max(30, 150 - (0.1 - simLearningRate) * 1100)}
                    cy={isDiverging ? 90 : Math.max(35, 100 - (1 - parseFloat(simulatedLoss)) * 60)}
                    r="6"
                    fill={isDiverging ? "#ef4444" : "#10b981"}
                    className="transition-all duration-300 shadow-lg"
                  />
                </svg>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 relative z-10">
                  <span>θ_init</span>
                  <span className={isDiverging ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                    {isDiverging ? "DIVERGING!" : "MINIMA // J(θ*)"}
                  </span>
                  <span>θ_opt</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono relative z-10 pt-8">
                  <span className="text-slate-400">Current MSE:</span>
                  <span className={`font-bold ${isDiverging ? "text-red-400" : "text-emerald-400"}`}>
                    {simulatedLoss}
                  </span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Learning Rate (α):</span>
                  <span className="text-amber-400 font-bold">{simLearningRate.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.005"
                  max="0.15"
                  step="0.005"
                  value={simLearningRate}
                  onChange={(e) => setSimLearningRate(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0.005 (Slow)</span>
                  <span>0.050 (Optimal)</span>
                  <span>0.150 (Overshoot)</span>
                </div>
              </div>

              <Link
                to="/playground"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 font-mono text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-1.5 transition"
              >
                <span>Full 4-Tab ML Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </SpotlightCard>
          </div>

          {/* Module 4: High-Throughput Pipeline Blueprint (4 cols) */}
          <div className="lg:col-span-4">
            <SpotlightCard
              cornerTag="MLOPS_PIPELINE"
              showCrosshairs={true}
              className="p-6 space-y-4"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Sub-15ms Pipeline Architecture
                </span>
                <p className="text-xs text-slate-400">
                  End-to-end low-latency asynchronous microservice anatomy.
                </p>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Kafka Ingestion
                  </span>
                  <span className="text-[10px] text-slate-500">0.8ms (Zero-Copy)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Polars Preprocessing
                  </span>
                  <span className="text-[10px] text-slate-500">1.2ms (SIMD Arrow)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <span className="text-amber-300 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    TensorRT-LLM Kernel
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold">8.4ms (FP8 GEMM)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Redis Semantic Cache
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">98.4% Hit Rate</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Total Round-Trip:</span>
                <span className="text-white font-bold">&lt;11.2ms p99</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Module 5: arXiv Research Preprint Dossier (4 cols) */}
          <div className="lg:col-span-4">
            <SpotlightCard
              cornerTag="ARXIV_PREPRINT"
              showCrosshairs={true}
              className="p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-purple-400 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded">
                    arXiv:2501.08492 [cs.LG]
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Jan 2025</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">
                  Rank Allocation Dynamics in Quantized Low-Rank Adaptation (QLoRA)
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3">
                  Investigating optimal intrinsic rank distribution across attention projection matrices versus feed-forward layers in sparse mixture-of-experts architectures.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="p-2 rounded bg-black/40 border border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Author:</span>
                  <span className="text-white font-semibold">Davis Ochieng</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyBibtex}
                    className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-mono text-xs border border-white/10 flex items-center justify-center gap-1.5 transition"
                  >
                    {copiedBibtex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{copiedBibtex ? "Copied!" : "Copy BibTeX"}</span>
                  </button>
                  <Link
                    to="/articles/qlora-rank-adaptation"
                    className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-xs border border-amber-500/30 transition flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Featured Production AI Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest">
              <Cpu className="w-4 h-4" />
              <span>Production Deployments</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-heading mt-1">
              Featured Machine Learning Systems
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group"
          >
            <span>View All Production Systems</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => (
            <SpotlightCard
              key={project.id}
              cornerTag={`PRJ_${idx + 1}`}
              showCrosshairs={true}
              className="p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {project.metrics[0].label}: <strong className="text-white">{project.metrics[0].value}</strong>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Architecture Point */}
                {project.architectureHighlights[0] && (
                  <div className="p-2 rounded bg-black/30 border border-white/5 text-[11px] font-mono text-slate-400 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✦</span>
                    <span className="line-clamp-2">{project.architectureHighlights[0]}</span>
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
                <Link
                  to="/projects"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  Architecture Deep-Dive →
                </Link>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Featured Technical Publications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <BookOpen className="w-4 h-4" />
              <span>Research & Guides</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-heading mt-1">
              Technical Publications
            </h2>
          </div>
          <Link
            to="/articles"
            className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            <span>Browse All Publications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article, idx) => (
            <SpotlightCard
              key={article.slug}
              cornerTag={`PUB_${idx + 1}`}
              showCrosshairs={true}
              className="p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded text-[10px]">
                    {article.category}
                  </span>
                  <span className="text-slate-400 text-[11px]">{article.readTime}</span>
                </div>

                <Link to={`/articles/${article.slug}`}>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500">{article.publishedDate}</span>
                <Link
                  to={`/articles/${article.slug}`}
                  className="font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  Read Paper →
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Categorized Technical Ecosystem Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest">
            <Code2 className="w-4 h-4" />
            <span>Infrastructure Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading mt-1">
            Engineered Tooling & Infrastructure
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Core stack utilized in architecting, testing, and scaling production AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techCategories.map((cat, idx) => (
            <SpotlightCard
              key={cat.title}
              cornerTag={`STACK_${idx + 1}`}
              showCrosshairs={true}
              className="p-6 space-y-4"
            >
              <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase text-amber-400/90 pb-2 border-b border-white/[0.06]">
                {cat.title}
              </h3>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between hover:border-amber-500/30 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="text-xl">{item.icon}</div>
                      <div>
                        <p className="text-xs font-bold text-white">{item.name}</p>
                        <p className="text-[10px] font-mono text-slate-400">{item.note}</p>
                      </div>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
}
