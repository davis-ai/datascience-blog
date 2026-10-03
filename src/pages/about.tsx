import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Briefcase, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  X, 
  Mail, 
  Cpu 
} from 'lucide-react';
import profileLarge from '../assets/images/profile-optimized-large.jpg';
import profileMedium from '../assets/images/profile-optimized-medium.jpg';
import profileSmall from '../assets/images/profile-optimized-small.jpg';
import { useToast } from '../components/ui/toast';
import SpotlightCard from '../components/ui/SpotlightCard';
import TextScramble from '../components/common/TextScramble';

export default function AboutPage() {
  const [activeSkillCategory, setActiveSkillCategory] = useState<'ml' | 'mlops' | 'fullstack'>('ml');
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const { showToast } = useToast();

  const handleDownloadResume = () => {
    const resumeText = `=====================================================
DAVIS OCHIENG
Senior Machine Learning Engineer & Data Scientist
Nairobi, Kenya • davis.ochieng@datascience.ai
GitHub: github.com/davis-ai • LinkedIn: linkedin.com/in/davis-ochieng
Portfolio: davis-ochieng.ai
=====================================================

EXECUTIVE SUMMARY
Senior Data Scientist and ML Systems Engineer with 5+ years of experience
architecting and deploying scalable machine learning models and high-throughput
inference pipelines. Proven track record optimizing transformer architectures
(LoRA/QLoRA), reducing inference latency to <13ms via ONNX/TensorRT, and leading
cross-functional AI initiatives.

CORE COMPETENCIES
- Machine Learning: PyTorch, TensorFlow, Scikit-learn, XGBoost, LightGBM, SHAP
- NLP & LLMs: HuggingFace Transformers, PEFT, LoRA/QLoRA, FlashAttention-2, vLLM
- Computer Vision: YOLOv8, 3D U-Net, PyTorch Video, OpenCV, Image Segmentation
- MLOps & Systems: FastAPI, Docker, Kubernetes, Apache Kafka, Redis, ONNX Runtime
- Cloud & Data: AWS (SageMaker, S3, ECS, Lambda), PostgreSQL, Polars, Vector DBs
- Frontend / Full-Stack: React 19, TypeScript, Tailwind CSS, REST / GraphQL

PROFESSIONAL EXPERIENCE

Senior Machine Learning Engineer | NeuralScale AI (2023 - Present)
- Architected enterprise LLM fine-tuning pipelines using QLoRA and FlashAttention-2, reducing compute expenditure by 65%.
- Engineered real-time feature streaming and low-latency inference microservices serving 12M+ monthly predictions at <13ms p99.
- Built automated evaluation pipelines measuring model drift, perplexity, and hallucination bounds.

Machine Learning Engineer | Apex Data Labs (2021 - 2023)
- Deployed end-to-end computer vision models for automated defect detection with 99.2% precision.
- Spearheaded model compression initiative utilizing FP16 and INT8 quantization via TensorRT.
- Collaborated with engineering teams to integrate ML microservices into production Kubernetes clusters.

Data Scientist | FinMetric Analytics (2019 - 2021)
- Developed survival analysis and churn prediction models, increasing client retention by 22%.
- Created interpretability dashboards using SHAP and TreeExplainer for compliance audits.

EDUCATION & CERTIFICATIONS
- BSc. Computer Science (First Class Honours)
- AWS Certified Machine Learning - Specialty (Amazon Web Services, 2024)
- Deep Learning Specialization (DeepLearning.AI / Andrew Ng, 2023)
- TensorRT & Edge AI Acceleration (NVIDIA Deep Learning Institute, 2023)
=====================================================`;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Davis_Ochieng_Data_Science_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded Davis Ochieng - Data Science Resume!', 'success');
  };

  const skillsData = {
    ml: [
      { name: 'PyTorch & Deep Learning', level: 95, note: 'CNNs, Transformers, LoRA/PEFT, FlashAttention' },
      { name: 'Python & Scientific Stack', level: 98, note: 'NumPy, Pandas, SciPy, Numba, SIMD Vectorization' },
      { name: 'Scikit-Learn & Classical ML', level: 95, note: 'Ensembles, Clustering, GLMs, Survival Analysis' },
      { name: 'XGBoost, LightGBM & SHAP', level: 92, note: 'TreeSHAP, Global & Local Feature Attribution' },
      { name: 'NLP & HuggingFace', level: 90, note: 'Tokenizers, Embeddings, SFT, DPO, vLLM' },
      { name: 'Computer Vision (YOLO/U-Net)', level: 88, note: '3D Volumetric Segmentation, Object Detection' },
    ],
    mlops: [
      { name: 'FastAPI & Async IO', level: 95, note: 'Sub-13ms Real-Time Non-blocking Inference' },
      { name: 'ONNX Runtime & TensorRT', level: 90, note: 'INT8/FP16/FP8 Quantization & Compilation' },
      { name: 'Docker & Containerization', level: 92, note: 'Multi-stage lean GPU builds, distroless' },
      { name: 'Apache Kafka & Redis', level: 88, note: 'Streaming 20k msg/s queues & semantic cache' },
      { name: 'AWS Cloud & S3/EC2', level: 85, note: 'SageMaker, ECS, Lambda, Spot Clusters' },
      { name: 'CI/CD & Git Actions', level: 90, note: 'Automated testing, evaluation & regression tracking' },
    ],
    fullstack: [
      { name: 'TypeScript & React 19', level: 92, note: 'High-craft interfaces, interactive WebGL, shaders' },
      { name: 'Tailwind CSS & Styling', level: 95, note: 'Custom design systems, dark brutalist aesthetics' },
      { name: 'PostgreSQL & SQL Analytics', level: 90, note: 'Window functions, PostGIS, pgvector indexing' },
      { name: 'REST & GraphQL APIs', level: 92, note: 'Type-safe contracts, schema-first design' },
      { name: 'Polars & Columnar Engine', level: 88, note: 'Zero-copy Arrow memory processing' },
      { name: 'Linux / POSIX Systems', level: 92, note: 'Bash scripting, server telemetry, CUDA driver config' },
    ]
  };

  const certifications = [
    {
      title: 'AWS Certified Machine Learning - Specialty',
      issuer: 'Amazon Web Services',
      year: '2024',
      badge: 'AWS-MLS'
    },
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI / Andrew Ng',
      year: '2023',
      badge: 'DL.AI'
    },
    {
      title: 'TensorRT & Edge AI Acceleration',
      issuer: 'NVIDIA Deep Learning Institute',
      year: '2023',
      badge: 'NVIDIA'
    }
  ];

  return (
    <div className="min-h-screen py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>[PROFILE_DOSSIER // DO-01]</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Davis <span className="gradient-text-gold">Ochieng</span>
          </h1>

          <div className="font-mono text-xs sm:text-sm text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1.5 rounded-lg w-fit">
            &gt; <TextScramble text="Senior Machine Learning Systems Engineer & Data Scientist" />
          </div>

          <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              I bridge the critical divide between theoretical Machine Learning mathematics and resilient, scalable software systems. Having engineered systems handling millions of daily predictive inferences, my focus centers on low-latency deployment, model interpretability, and robust end-to-end data architectures.
            </p>
            <p className="text-slate-400">
              When not training neural networks or writing deep-dive technical publications, I collaborate with forward-thinking engineering teams to productionize AI capabilities from research prototypes into high-throughput microservices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            <button
              onClick={() => setShowResumeModal(true)}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition hover:scale-[1.02]"
            >
              <FileText className="w-4 h-4" />
              <span>Inspect CV Document</span>
            </button>
            <Link
              to="/contact"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold uppercase tracking-wider border border-white/10 flex items-center gap-2 transition"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Direct Consultation</span>
            </Link>
          </div>
        </motion.div>

        {/* Profile Image with Technical Border & Corner Crosshairs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-5 flex justify-center"
        >
          <SpotlightCard
            cornerTag="ID: 0x4B2"
            showCrosshairs={true}
            className="p-4 relative group"
          >
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <picture>
                <source srcSet={profileLarge} media="(min-width: 1024px)" width="384" height="384" />
                <source srcSet={profileMedium} media="(min-width: 768px)" width="384" height="384" />
                <img
                  src={profileSmall}
                  alt="Davis Ochieng"
                  width="384"
                  height="384"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full max-w-sm rounded-xl grayscale hover:grayscale-0 transition-all duration-700 object-cover"
                />
              </picture>
            </div>
            
            <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Location: Nairobi, KE [UTC+3]
              </span>
              <span className="text-amber-400">BSc. Comp Sci (Honours)</span>
            </div>
          </SpotlightCard>
        </motion.div>
      </section>

      {/* Interactive Skills Matrix with SpotlightCard */}
      <section className="space-y-6">
        <SpotlightCard
          cornerTag="SKILL_PROFICIENCY"
          showCrosshairs={true}
          className="p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest">
                <Cpu className="w-4 h-4" />
                <span>Technical Benchmarks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
                Competencies & System Proficiencies
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10 font-mono text-xs">
              <button
                onClick={() => setActiveSkillCategory('ml')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeSkillCategory === 'ml'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Deep Learning
              </button>
              <button
                onClick={() => setActiveSkillCategory('mlops')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeSkillCategory === 'mlops'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                MLOps & Infra
              </button>
              <button
                onClick={() => setActiveSkillCategory('fullstack')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeSkillCategory === 'fullstack'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full-Stack Systems
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono">
            {skillsData[activeSkillCategory].map((skill, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{skill.name}</span>
                  <span className="text-amber-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-sans">{skill.note}</p>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </section>

      {/* Career Trajectory & Milestones */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Chronological Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Engineering Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Milestone 1 */}
          <SpotlightCard
            cornerTag="2023 - PRESENT"
            showCrosshairs={true}
            className="p-6 space-y-4"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
              NeuralScale AI // Senior
            </span>
            <h3 className="text-base font-bold text-white">
              Senior Machine Learning Engineer
            </h3>
            <p className="text-xs font-mono text-amber-400/90">
              Low-Latency Inference & LLM Fine-Tuning
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Architected high-throughput inference engines in FastAPI and ONNX. Reduced model p99 serving latency from 85ms down to 13ms while scaling to 2.5k requests/sec.
            </p>
          </SpotlightCard>

          {/* Milestone 2 */}
          <SpotlightCard
            cornerTag="2021 - 2023"
            showCrosshairs={true}
            className="p-6 space-y-4"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
              Apex Data Labs // Lead
            </span>
            <h3 className="text-base font-bold text-white">
              Machine Learning Engineer
            </h3>
            <p className="text-xs font-mono text-cyan-400/90">
              Predictive Intelligence & Computer Vision
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built churn prediction and survival models with XGBoost & SHAP. Automated ETL pipelines across multi-terabyte datasets and deployed medical defect classification.
            </p>
          </SpotlightCard>

          {/* Milestone 3 */}
          <SpotlightCard
            cornerTag="2017 - 2021"
            showCrosshairs={true}
            className="p-6 space-y-4"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              University Honours
            </span>
            <h3 className="text-base font-bold text-white">
              BSc. in Computer Science
            </h3>
            <p className="text-xs font-mono text-emerald-400/90">
              First Class Honours Graduate
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Focused on Artificial Intelligence, distributed algorithms, and computational mathematics. Capstone thesis on Natural Language Processing architectures.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* Certifications & Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certifications */}
        <SpotlightCard
          cornerTag="CERTIFIED"
          showCrosshairs={true}
          className="p-6 sm:p-8 space-y-5"
        >
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <Award className="w-5 h-5 text-amber-400" />
            Verified Certifications
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">{cert.title}</h4>
                  <p className="text-[11px] text-slate-400">{cert.issuer} • {cert.year}</p>
                </div>
                <span className="font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded text-[10px]">
                  {cert.badge}
                </span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Engineering Philosophy */}
        <SpotlightCard
          cornerTag="PHILOSOPHY"
          showCrosshairs={true}
          className="p-6 sm:p-8 space-y-5"
        >
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Core Engineering Tenets
          </h3>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-3 p-2.5 rounded-lg bg-black/30 border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Pragmatic Simplicity:</strong> The best ML model is the simplest one that solves the business problem reliably with minimal complexity.</span>
            </li>
            <li className="flex items-start gap-3 p-2.5 rounded-lg bg-black/30 border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Interpretability Matters:</strong> A prediction without transparent feature attribution (SHAP) is a liability in production.</span>
            </li>
            <li className="flex items-start gap-3 p-2.5 rounded-lg bg-black/30 border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Latency is User Experience:</strong> Optimize inference via ONNX/TensorRT, zero-copy memory, and asynchronous queues from Day 1.</span>
            </li>
          </ul>
        </SpotlightCard>
      </section>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-[#090e18] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 max-h-[85vh] overflow-y-auto font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">Davis Ochieng - Resume Summary</h3>
                  <p className="text-amber-400 font-mono text-xs">Senior Machine Learning Engineer & Data Scientist</p>
                </div>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-white/10"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-slate-300">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <h4 className="font-bold text-white text-sm">Executive Summary</h4>
                  <p className="leading-relaxed text-slate-400">
                    Senior Data Scientist and ML Systems Engineer with 5+ years of experience engineering production AI architectures. Specialized in Deep Learning, PyTorch, LoRA fine-tuning, ONNX optimization, and low-latency microservice orchestration.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <h5 className="font-bold text-white text-xs">Core Tech Stack</h5>
                    <p className="text-slate-400 text-[11px]">Python, PyTorch, HuggingFace, FastAPI, Docker, ONNX, Kafka, React 19, TypeScript</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <h5 className="font-bold text-white text-xs">Education & Certs</h5>
                    <p className="text-slate-400 text-[11px]">BSc. Computer Science (Honours), AWS Certified ML Specialist, DL.AI Specialization</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold border border-white/5"
                >
                  Close
                </button>
                <button
                  onClick={handleDownloadResume}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  Download Complete Resume (.txt)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
