import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Briefcase, 
  FileText, 
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
=====================================================

EXECUTIVE SUMMARY
Senior Data Scientist and ML Systems Engineer with experience
architecting and deploying scalable machine learning models and high-throughput
inference pipelines. Proven track record optimizing transformer architectures
(LoRA/QLoRA), reducing inference latency to <13ms via ONNX/TensorRT.

CORE COMPETENCIES
- Machine Learning: PyTorch, Scikit-learn, XGBoost, LightGBM, SHAP
- NLP & LLMs: HuggingFace Transformers, PEFT, LoRA/QLoRA, FlashAttention-2, vLLM
- Computer Vision: 3D U-Net, PyTorch Video, OpenCV, Image Segmentation
- MLOps & Systems: FastAPI, Docker, Kubernetes, Apache Kafka, Redis, ONNX Runtime
- Cloud & Data: AWS (SageMaker, S3, ECS), PostgreSQL, Polars
- Frontend: React 19, TypeScript, Tailwind CSS

EDUCATION & CERTIFICATIONS
- BSc. Computer Science (First Class Honours)
- AWS Certified Machine Learning - Specialty (2024)
- Deep Learning Specialization (DeepLearning.AI, 2023)
=====================================================`;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Davis_Ochieng_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded resume', 'success');
  };

  const skillsData = {
    ml: [
      { name: 'PyTorch & deep learning', level: 95, note: 'CNNs, Transformers, LoRA/PEFT, FlashAttention' },
      { name: 'Python numerical stack', level: 98, note: 'NumPy, Pandas, SciPy, SIMD vectorization' },
      { name: 'Scikit-Learn & classical ML', level: 95, note: 'Ensembles, clustering, GLMs, survival analysis' },
      { name: 'XGBoost, LightGBM & SHAP', level: 92, note: 'TreeSHAP, global and local feature attribution' },
      { name: 'NLP & HuggingFace', level: 90, note: 'Tokenizers, embeddings, SFT, DPO, vLLM' },
      { name: 'Computer vision (YOLO/U-Net)', level: 88, note: '3D volumetric segmentation, object detection' },
    ],
    mlops: [
      { name: 'FastAPI async IO', level: 95, note: 'Sub-13ms non-blocking inference endpoints' },
      { name: 'ONNX Runtime & TensorRT', level: 90, note: 'INT8, FP16 and FP8 quantization kernels' },
      { name: 'Docker & containerization', level: 92, note: 'Lean multi-stage GPU builds' },
      { name: 'Apache Kafka & Redis', level: 88, note: 'Streaming ingestion queues and semantic caching' },
      { name: 'AWS Cloud & SageMaker', level: 85, note: 'SageMaker, ECS, S3, spot cluster training' },
      { name: 'CI/CD & automated evaluation', level: 90, note: 'Regression tracking and automated benchmarking' },
    ],
    fullstack: [
      { name: 'TypeScript & React 19', level: 92, note: 'Precision telemetry interfaces, dashboard systems' },
      { name: 'Tailwind CSS & design systems', level: 95, note: 'Modular design tokens and responsive layouts' },
      { name: 'PostgreSQL & vector indexes', level: 90, note: 'Window functions, pgvector nearest-neighbor search' },
      { name: 'REST & schema design', level: 92, note: 'Type-safe contracts and clean microservice boundaries' },
      { name: 'Polars & Arrow columnar data', level: 88, note: 'Zero-copy memory data processing' },
      { name: 'Linux systems & CUDA tooling', level: 92, note: 'POSIX scripting, node profiling, driver optimization' },
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
      issuer: 'DeepLearning.AI',
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
    <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="font-mono text-xs text-[#85858b]">
            Background & experience
          </div>

          <h1 className="text-2xl sm:text-4xl font-medium text-[#ededed] tracking-tight font-heading">
            Davis Ochieng
          </h1>

          <div className="text-xs font-mono text-[#a1a1a6]">
            Senior machine learning engineer • Nairobi [UTC+3]
          </div>

          <div className="text-[#a1a1a6] text-xs sm:text-sm leading-relaxed space-y-3">
            <p>
              I bridge the divide between theoretical machine learning research and resilient, scalable production software. Having engineered systems handling millions of predictions daily, my work centers on low-latency inference serving, low-rank parameter adaptation, and robust data pipelines.
            </p>
            <p className="text-[#85858b]">
              When not training models or profiling CUDA kernels, I collaborate with engineering teams to turn research prototypes into reliable, observable microservices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs">
            <button
              onClick={() => setShowResumeModal(true)}
              className="btn-primary"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View resume</span>
            </button>
            <Link
              to="/contact"
              className="btn-secondary"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </Link>
          </div>
        </div>

        {/* Profile Image Card */}
        <div className="lg:col-span-5 flex justify-center">
          <SpotlightCard className="p-4 w-full max-w-sm space-y-3">
            <div className="overflow-hidden rounded-lg border border-white/[0.08]">
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
                  className="w-full rounded-lg object-cover"
                />
              </picture>
            </div>
            
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px] text-[#85858b]">
              <span className="flex items-center gap-1.5 text-[#ededed]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cc38a]" />
                Nairobi, Kenya
              </span>
              <span>BSc Comp Sci (First Class)</span>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="space-y-4">
        <SpotlightCard className="p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-medium text-[#ededed] font-heading">
                Technical competencies
              </h2>
              <p className="text-xs text-[#85858b] mt-0.5">
                Core technologies applied in production systems and research workflows.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-1 p-1 bg-[#141415] rounded-md border border-white/[0.08] font-mono text-xs">
              <button
                onClick={() => setActiveSkillCategory('ml')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeSkillCategory === 'ml'
                    ? 'bg-[#232325] text-[#ededed] border border-white/[0.08]'
                    : 'text-[#85858b] hover:text-[#ededed]'
                }`}
              >
                Deep learning
              </button>
              <button
                onClick={() => setActiveSkillCategory('mlops')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeSkillCategory === 'mlops'
                    ? 'bg-[#232325] text-[#ededed] border border-white/[0.08]'
                    : 'text-[#85858b] hover:text-[#ededed]'
                }`}
              >
                MLOps & infra
              </button>
              <button
                onClick={() => setActiveSkillCategory('fullstack')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeSkillCategory === 'fullstack'
                    ? 'bg-[#232325] text-[#ededed] border border-white/[0.08]'
                    : 'text-[#85858b] hover:text-[#ededed]'
                }`}
              >
                Full-stack
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 font-mono text-xs">
            {skillsData[activeSkillCategory].map((skill, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#ededed]">{skill.name}</span>
                  <span className="text-[#85858b]">{skill.level}%</span>
                </div>
                <div className="w-full h-1 rounded bg-[#232325] overflow-hidden">
                  <div
                    style={{ width: `${skill.level}%` }}
                    className="h-full bg-[#4cc38a] rounded"
                  />
                </div>
                <p className="text-[11px] text-[#85858b] font-sans">{skill.note}</p>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </section>

      {/* Career Trajectory & Milestones */}
      <section className="space-y-4">
        <div className="border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-[#85858b]">
            <Briefcase className="w-3.5 h-3.5 text-[#85858b]" />
            <span>Timeline</span>
          </div>
          <h2 className="text-lg sm:text-xl font-medium text-[#ededed] font-heading mt-1">
            Engineering milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Milestone 1 */}
          <SpotlightCard className="p-5 space-y-3">
            <span className="text-[11px] font-mono text-[#85858b]">
              2023 — Present • Senior
            </span>
            <h3 className="text-sm font-medium text-[#ededed]">
              Senior machine learning engineer
            </h3>
            <p className="text-xs font-mono text-[#4cc38a]">
              NeuralScale AI
            </p>
            <p className="text-xs text-[#a1a1a6] leading-relaxed">
              Architected high-throughput inference engines in FastAPI and ONNX. Reduced model p99 serving latency from 85ms down to 13ms while scaling to 2.5k requests/sec.
            </p>
          </SpotlightCard>

          {/* Milestone 2 */}
          <SpotlightCard className="p-5 space-y-3">
            <span className="text-[11px] font-mono text-[#85858b]">
              2021 — 2023 • Lead
            </span>
            <h3 className="text-sm font-medium text-[#ededed]">
              Machine learning engineer
            </h3>
            <p className="text-xs font-mono text-[#a1a1a6]">
              Apex Data Labs
            </p>
            <p className="text-xs text-[#a1a1a6] leading-relaxed">
              Built churn prediction and survival models with XGBoost & SHAP. Automated ETL pipelines across multi-terabyte datasets and deployed medical defect classification.
            </p>
          </SpotlightCard>

          {/* Milestone 3 */}
          <SpotlightCard className="p-5 space-y-3">
            <span className="text-[11px] font-mono text-[#85858b]">
              2017 — 2021 • Honours
            </span>
            <h3 className="text-sm font-medium text-[#ededed]">
              BSc in computer science
            </h3>
            <p className="text-xs font-mono text-[#a1a1a6]">
              First class honours
            </p>
            <p className="text-xs text-[#a1a1a6] leading-relaxed">
              Focused on artificial intelligence, distributed systems, and numerical optimization. Capstone thesis on low-resource sequence adaptation.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* Certifications & Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certifications */}
        <SpotlightCard className="p-5 sm:p-6 space-y-4">
          <h3 className="text-sm font-medium text-[#ededed] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#85858b]" />
            <span>Certifications</span>
          </h3>

          <div className="space-y-2.5 font-mono text-xs">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#ededed]">{cert.title}</h4>
                  <p className="text-[11px] text-[#85858b]">{cert.issuer} • {cert.year}</p>
                </div>
                <span className="text-[#85858b] text-[10px] px-2 py-0.5 rounded bg-[#232325]">
                  {cert.badge}
                </span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Engineering Philosophy */}
        <SpotlightCard className="p-5 sm:p-6 space-y-4">
          <h3 className="text-sm font-medium text-[#ededed] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#85858b]" />
            <span>Engineering tenets</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-[#a1a1a6]">
            <li className="flex items-start gap-2.5 p-3 rounded-lg bg-[#141415] border border-white/[0.06]">
              <CheckCircle2 className="w-4 h-4 text-[#4cc38a] shrink-0 mt-0.5" />
              <span><strong className="text-[#ededed]">Pragmatic simplicity:</strong> The best ML model is the simplest one that solves the business requirement reliably.</span>
            </li>
            <li className="flex items-start gap-2.5 p-3 rounded-lg bg-[#141415] border border-white/[0.06]">
              <CheckCircle2 className="w-4 h-4 text-[#4cc38a] shrink-0 mt-0.5" />
              <span><strong className="text-[#ededed]">Interpretability matters:</strong> A prediction without transparent feature attribution (SHAP) is a liability in production.</span>
            </li>
            <li className="flex items-start gap-2.5 p-3 rounded-lg bg-[#141415] border border-white/[0.06]">
              <CheckCircle2 className="w-4 h-4 text-[#4cc38a] shrink-0 mt-0.5" />
              <span><strong className="text-[#ededed]">Latency is reliability:</strong> Optimize inference via FP8/INT8 kernels, zero-copy memory, and asynchronous queues from day one.</span>
            </li>
          </ul>
        </SpotlightCard>
      </section>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-2xl bg-[#19191b] border border-white/[0.08] rounded-xl p-5 sm:p-6 shadow-2xl space-y-5 text-[#ededed] max-h-[85vh] overflow-y-auto font-mono text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <h3 className="text-base font-medium text-[#ededed] font-heading">Davis Ochieng — Resume</h3>
                  <p className="text-[#85858b] text-[11px]">Senior machine learning engineer</p>
                </div>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-1 rounded text-[#85858b] hover:text-[#ededed]"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-[#a1a1a6]">
                <div className="p-3.5 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1.5">
                  <h4 className="font-medium text-[#ededed] text-xs">Executive summary</h4>
                  <p className="leading-relaxed text-xs">
                    Senior data scientist and ML systems engineer with 5+ years of experience engineering production AI architectures. Specialized in Deep Learning, PyTorch, LoRA fine-tuning, ONNX optimization, and low-latency microservice orchestration.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1">
                    <h5 className="font-medium text-[#ededed] text-xs">Core stack</h5>
                    <p className="text-[11px] text-[#85858b]">Python, PyTorch, HuggingFace, FastAPI, Docker, ONNX, Kafka, React 19, TypeScript</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1">
                    <h5 className="font-medium text-[#ededed] text-xs">Credentials</h5>
                    <p className="text-[11px] text-[#85858b]">BSc Comp Sci (First Class Honours), AWS Certified ML Specialty</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.08]">
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button
                  onClick={handleDownloadResume}
                  className="btn-primary"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download text resume</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
