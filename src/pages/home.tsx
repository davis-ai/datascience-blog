import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
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
import ModelTelemetryChart from "../components/common/ModelTelemetryChart";
import AttentionVisualizer from "../components/common/AttentionVisualizer";
import TerminalConsole from "../components/common/TerminalConsole";
import { useToast } from "../components/ui/toast";

export default function HomePage() {
  const { showToast } = useToast();
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const copyBibtex = () => {
    const bibtex = `@article{ochieng2025qlora,
  title={Rank Allocation Dynamics in Quantized Low-Rank Adaptation of Mixture-of-Experts Models},
  author={Ochieng, Davis},
  journal={arXiv preprint arXiv:2501.08492},
  year={2025}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    showToast("BibTeX citation copied to clipboard", "success");
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const metricsStats = [
    { 
      label: "Inference latency", 
      val: "<12.8ms", 
      desc: "p99 latency with TensorRT and Triton"
    },
    { 
      label: "Peak LLM throughput", 
      val: "142.1 tok/s", 
      desc: "4-bit AWQ Llama-3-8B on single A100"
    },
    { 
      label: "Adaptation rank", 
      val: "r = 16", 
      desc: "Optimal intrinsic rank for sparse MoE"
    },
    { 
      label: "Continuous uptime", 
      val: "99.98%", 
      desc: "180 days across production cluster"
    },
  ];

  const techCategories = [
    {
      title: "Deep learning & fine-tuning",
      items: [
        { name: "PyTorch 2.5", icon: <SiPytorch className="text-[#a1a1a6]" />, note: "Distributed DDP and FSDP" },
        { name: "HuggingFace PEFT", icon: <Layers className="text-[#a1a1a6]" />, note: "LoRA, QLoRA, DoRA" },
        { name: "FlashAttention-2", icon: <Zap className="text-[#a1a1a6]" />, note: "Tiled IO kernel acceleration" },
        { name: "vLLM & Triton", icon: <Cpu className="text-[#a1a1a6]" />, note: "Continuous batching and PagedAttention" },
      ]
    },
    {
      title: "High-throughput systems & MLOps",
      items: [
        { name: "FastAPI Async", icon: <SiFastapi className="text-[#a1a1a6]" />, note: "Non-blocking REST endpoints" },
        { name: "Apache Kafka", icon: <SiApachekafka className="text-[#a1a1a6]" />, note: "Real-time streaming ingestion" },
        { name: "Docker & K8s", icon: <FaDocker className="text-[#a1a1a6]" />, note: "GPU-orchestrated deployments" },
        { name: "AWS Cloud & SageMaker", icon: <FaAws className="text-[#a1a1a6]" />, note: "Multi-node training clusters" },
      ]
    },
    {
      title: "Numerical compute & interfaces",
      items: [
        { name: "Python 3.12", icon: <FaPython className="text-[#a1a1a6]" />, note: "Vectorized numerical pipelines" },
        { name: "Scikit-Learn", icon: <SiScikitlearn className="text-[#a1a1a6]" />, note: "Gradient boosted ensembles" },
        { name: "SHAP & TreeExplainer", icon: <Cpu className="text-[#a1a1a6]" />, note: "Feature attribution and interpretability" },
        { name: "React 19 & TypeScript", icon: <SiReact className="text-[#a1a1a6]" />, note: "High-precision telemetry interfaces" },
      ]
    }
  ];

  const featuredProjects = PROJECTS_DATA.slice(0, 3);
  const featuredArticles = ARTICLES_DATA.slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="pt-10 sm:pt-14 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Identity & Bio */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#85858b]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cc38a]" />
              <span>Davis Ochieng • Machine Learning Systems</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium text-[#ededed] tracking-tight leading-[1.12] font-heading">
                Machine learning systems engineered for low latency and scale
              </h1>
              <p className="text-sm text-[#a1a1a6] leading-relaxed">
                I design and optimize production deep learning architectures. Focus areas include low-rank parameter adaptation (PEFT), high-throughput inference serving with vLLM, and real-time streaming pipelines.
              </p>
            </div>

            {/* Profile Credentials */}
            <div className="p-3 rounded-lg bg-[#19191b] border border-white/[0.08] flex items-center gap-3 max-w-md">
              <img
                src={profileSmall}
                alt="Davis Ochieng"
                width="44"
                height="44"
                className="w-11 h-11 rounded-md object-cover border border-white/[0.1]"
              />
              <div className="text-xs space-y-0.5">
                <div className="text-[#ededed] font-medium">Davis Ochieng</div>
                <p className="text-[#a1a1a6]">Senior Machine Learning Engineer</p>
                <p className="text-[11px] text-[#85858b]">BSc Comp Sci (First Class) • AWS Certified ML</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/projects"
                className="btn-primary"
              >
                <span>Explore projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/articles"
                className="btn-secondary"
              >
                <span>Read publications</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Live Telemetry Console */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-xl border border-white/[0.08] bg-[#19191b]">
              <ModelTelemetryChart />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Telemetry Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricsStats.map((metric) => (
            <SpotlightCard
              key={metric.label}
              className="p-5"
            >
              <div className="space-y-1.5">
                <span className="text-xs text-[#85858b] block font-mono">
                  {metric.label}
                </span>
                <div className="text-2xl sm:text-3xl font-medium font-mono text-[#ededed] tracking-tight">
                  {metric.val}
                </div>
                <p className="text-xs text-[#a1a1a6] leading-snug">
                  {metric.desc}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Architecture & Telemetry Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-medium text-[#ededed] font-heading">
              System architectures & telemetry
            </h2>
            <p className="text-xs text-[#85858b] mt-0.5">
              Interactive multi-head attention weights, live node console, and pipeline execution budgets.
            </p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Module 1: Multi-Head Attention Visualizer (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-5 h-full flex flex-col justify-between">
              <AttentionVisualizer />
            </SpotlightCard>
          </div>

          {/* Module 2: Terminal Console (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard className="p-5 h-full flex flex-col justify-between space-y-3">
              <div className="space-y-1 pb-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#ededed] flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-[#85858b]" />
                    Interactive cluster terminal
                  </span>
                  <span className="text-[11px] font-mono text-[#85858b]">
                    active session
                  </span>
                </div>
                <p className="text-xs text-[#a1a1a6]">
                  Query simulated cluster hardware specs, throughput tests, and deployed configurations.
                </p>
              </div>
              <TerminalConsole />
            </SpotlightCard>
          </div>

          {/* Module 3: Pipeline Blueprint (6 cols) */}
          <div className="lg:col-span-6">
            <SpotlightCard className="p-5 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-medium text-[#ededed] flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#85858b]" />
                  Inference pipeline execution budget
                </span>
                <p className="text-xs text-[#a1a1a6]">
                  Component latency breakdown for end-to-end asynchronous streaming.
                </p>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-[#141415] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-[#ededed] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#85858b]" />
                    Kafka message ingestion
                  </span>
                  <span className="text-xs text-[#85858b]">0.8ms (zero-copy)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#141415] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-[#ededed] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#85858b]" />
                    Polars vector preprocessing
                  </span>
                  <span className="text-xs text-[#85858b]">1.2ms (SIMD Arrow)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#232325] border border-white/[0.12] flex items-center justify-between">
                  <span className="text-[#4cc38a] font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4cc38a]" />
                    TensorRT-LLM execution
                  </span>
                  <span className="text-xs text-[#4cc38a] font-medium">8.4ms (FP8 GEMM)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#141415] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-[#ededed] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#85858b]" />
                    Redis semantic cache lookup
                  </span>
                  <span className="text-xs text-[#85858b]">0.8ms (98.4% hit rate)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#141415] border border-white/[0.08] text-xs font-mono text-[#a1a1a6] flex items-center justify-between">
                <span>Total round-trip:</span>
                <span className="text-[#ededed] font-medium">&lt;11.2ms p99</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Module 4: arXiv Research Preprint (6 cols) */}
          <div className="lg:col-span-6">
            <SpotlightCard className="p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#85858b]">
                    arXiv:2501.08492 [cs.LG]
                  </span>
                  <span className="text-[11px] font-mono text-[#85858b]">January 2025</span>
                </div>
                <h3 className="text-sm font-medium text-[#ededed] leading-snug">
                  Rank allocation dynamics in quantized low-rank adaptation (QLoRA)
                </h3>
                <p className="text-xs text-[#a1a1a6] leading-relaxed">
                  Investigating optimal intrinsic rank distribution across attention projection matrices versus feed-forward layers in sparse mixture-of-experts architectures.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="p-2.5 rounded-lg bg-[#141415] border border-white/[0.08] font-mono text-xs text-[#85858b] flex items-center justify-between">
                  <span>Author:</span>
                  <span className="text-[#ededed]">Davis Ochieng</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyBibtex}
                    className="btn-secondary flex-1"
                  >
                    {copiedBibtex ? <Check className="w-3.5 h-3.5 text-[#4cc38a]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBibtex ? "Copied" : "Copy BibTeX"}</span>
                  </button>
                  <Link
                    to="/articles/qlora-rank-adaptation"
                    className="btn-secondary"
                  >
                    <span>Read paper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Featured Production Systems */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-medium text-[#ededed] font-heading">
              Featured systems
            </h2>
            <p className="text-xs text-[#85858b] mt-0.5">
              Production architectures engineered for high throughput and reliability.
            </p>
          </div>
          <Link
            to="/projects"
            className="text-xs font-mono text-[#a1a1a6] hover:text-[#ededed] flex items-center gap-1 transition-colors"
          >
            <span>All projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              className="p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#85858b]">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-[#a1a1a6]">
                    {project.metrics[0].label}: <strong className="text-[#ededed] font-medium">{project.metrics[0].value}</strong>
                  </span>
                </div>

                <h3 className="text-sm font-medium text-[#ededed] leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs text-[#a1a1a6] line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {project.architectureHighlights[0] && (
                  <div className="p-2 rounded bg-[#141415] border border-white/[0.08] text-[11px] font-mono text-[#85858b]">
                    {project.architectureHighlights[0]}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#232325] text-[#85858b] border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <Link
                  to="/projects"
                  className="text-xs text-[#ededed] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Architecture review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded bg-[#232325] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] transition-colors"
                  aria-label="GitHub repository"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Featured Technical Publications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-medium text-[#ededed] font-heading">
              Technical publications
            </h2>
            <p className="text-xs text-[#85858b] mt-0.5">
              Deep dives into parameter-efficient fine tuning, quantization, and real-time inference.
            </p>
          </div>
          <Link
            to="/articles"
            className="text-xs font-mono text-[#a1a1a6] hover:text-[#ededed] flex items-center gap-1 transition-colors"
          >
            <span>All articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <SpotlightCard
              key={article.slug}
              className="p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#85858b]">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <Link to={`/articles/${article.slug}`}>
                  <h3 className="text-sm font-medium text-[#ededed] hover:text-white transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-xs text-[#a1a1a6] line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#232325] text-[#85858b] border border-white/[0.06]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-[#85858b] font-mono text-[11px]">{article.publishedDate}</span>
                <Link
                  to={`/articles/${article.slug}`}
                  className="text-xs text-[#ededed] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Read paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Tooling & Infrastructure Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#85858b]">
            <Code2 className="w-4 h-4 text-[#85858b]" />
            <span>Infrastructure stack</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-medium text-[#ededed] font-heading mt-1">
            Tooling & infrastructure
          </h2>
          <p className="text-xs text-[#85858b] mt-0.5">
            Core stack across training, quantization, and real-time serving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techCategories.map((cat) => (
            <SpotlightCard
              key={cat.title}
              className="p-5 space-y-3"
            >
              <h3 className="font-mono text-xs font-medium text-[#ededed] pb-2 border-b border-white/[0.08]">
                {cat.title}
              </h3>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-2.5 rounded-lg bg-[#141415] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="text-lg text-[#85858b]">{item.icon}</div>
                      <div>
                        <p className="text-xs font-medium text-[#ededed]">{item.name}</p>
                        <p className="text-[11px] font-mono text-[#85858b]">{item.note}</p>
                      </div>
                    </div>
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
