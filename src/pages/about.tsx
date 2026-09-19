import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, 
  Award, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Activity,
  X,
  Mail
} from 'lucide-react';
import profileLarge from '../assets/images/profile-optimized-large.jpg';
import profileMedium from '../assets/images/profile-optimized-medium.jpg';
import profileSmall from '../assets/images/profile-optimized-small.jpg';
import { useToast } from '../components/ui/toast';

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
(LoRA/QLoRA), reducing inference latency to <15ms via ONNX/TensorRT, and leading
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
- Engineered real-time feature streaming and low-latency inference microservices serving 12M+ monthly predictions at <15ms p99.
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
      { name: 'PyTorch & Deep Learning', level: 95, note: 'CNNs, Transformers, LoRA/PEFT' },
      { name: 'Python & Scientific Stack', level: 98, note: 'NumPy, Pandas, SciPy, Numba' },
      { name: 'Scikit-Learn & Classical ML', level: 95, note: 'Ensembles, Clustering, GLMs' },
      { name: 'XGBoost, LightGBM & SHAP', level: 92, note: 'TreeSHAP, Feature Attribution' },
      { name: 'NLP & HuggingFace', level: 90, note: 'Tokenizers, Embeddings, SFT' },
      { name: 'Computer Vision (YOLO/U-Net)', level: 88, note: '3D Segmentation, Object Detection' },
    ],
    mlops: [
      { name: 'FastAPI & Async IO', level: 95, note: 'Sub-15ms Real-Time Inference' },
      { name: 'ONNX Runtime & TensorRT', level: 90, note: 'INT8/FP16 Model Compilation' },
      { name: 'Docker & Containerization', level: 92, note: 'Multi-stage lean builds' },
      { name: 'Apache Kafka & Redis', level: 88, note: 'Streaming event queues & cache' },
      { name: 'AWS Cloud & S3/EC2', level: 85, note: 'SageMaker, ECS, Lambda' },
      { name: 'CI/CD & Git Actions', level: 90, note: 'Automated testing & linting' },
    ],
    fullstack: [
      { name: 'TypeScript & React 19', level: 92, note: 'Modern hooks, state, animations' },
      { name: 'Tailwind CSS & Styling', level: 95, note: 'Glassmorphism, custom design systems' },
      { name: 'PostgreSQL & SQL Analytics', level: 90, note: 'Window functions, PostGIS, indexing' },
      { name: 'REST & GraphQL APIs', level: 92, note: 'Type-safe contracts, schema design' },
      { name: 'Polars & Rust Analytics', level: 88, note: 'High-speed columnar analytics' },
      { name: 'Linux / POSIX Systems', level: 92, note: 'Bash scripting, server telemetry' },
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
            <User className="w-3.5 h-3.5" /> Engineer Profile & Technical Background
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Davis <span className="gradient-text-gold">Ochieng</span>
          </h1>

          <p className="text-xl text-slate-300 font-light">
            Senior Machine Learning Engineer & Data Scientist based in Nairobi, Kenya.
          </p>

          <div className="text-slate-400 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              I bridge the critical divide between theoretical Machine Learning mathematics and resilient, scalable software systems. Having engineered systems handling millions of daily predictive inferences, my focus centers on low-latency deployment, model interpretability, and robust end-to-end data architectures.
            </p>
            <p>
              When not training neural networks or writing deep-dive technical publications, I collaborate with forward-thinking engineering teams to productionize AI capabilities from research prototypes into high-throughput microservices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setShowResumeModal(true)}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </button>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider border border-slate-700 flex items-center gap-2 transition"
            >
              <Mail className="w-4 h-4" />
              Schedule Consultation
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 rounded-3xl blur-2xl transform translate-x-4 translate-y-4" />
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
                className="w-full max-w-sm rounded-3xl border-2 border-slate-700 shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500 object-cover"
              />
            </picture>
          </div>
        </motion.div>
      </section>

      {/* Interactive Skills Matrix */}
      <section className="space-y-8 glass-card p-8 sm:p-10 rounded-3xl border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Technical Competencies & Proficiencies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Evaluated across production deployments, research implementations, and system scale.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSkillCategory('ml')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeSkillCategory === 'ml'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Machine Learning
            </button>
            <button
              onClick={() => setActiveSkillCategory('mlops')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeSkillCategory === 'mlops'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MLOps & Infra
            </button>
            <button
              onClick={() => setActiveSkillCategory('fullstack')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeSkillCategory === 'fullstack'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Full-Stack & Systems
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {skillsData[activeSkillCategory].map((skill, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white text-sm">{skill.name}</span>
                <span className="font-mono text-amber-400 font-bold">{skill.level}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.05 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                />
              </div>
              <p className="text-[11px] text-slate-400 font-medium">{skill.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Career Timeline */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
          Career Trajectory & Milestones
        </h2>

        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-slate-800">
          {/* Role 1 */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between group">
            <div className="w-full sm:w-[45%] glass-card p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition space-y-2 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                2023 - Present
              </span>
              <h3 className="text-lg font-bold text-white">Senior Machine Learning & Software Engineer</h3>
              <p className="text-xs text-amber-300 font-medium">Enterprise AI & Microservices</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Architected high-throughput inference engines in FastAPI and ONNX. Reduced model p99 serving latency from 85ms down to 14ms while scaling to 2.5k requests/sec.
              </p>
            </div>
            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-lg">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="hidden sm:block w-[45%]" />
          </div>

          {/* Role 2 */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between group">
            <div className="hidden sm:block w-[45%]" />
            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg">
              <Activity className="w-4 h-4" />
            </div>
            <div className="w-full sm:w-[45%] glass-card p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition space-y-2 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                2021 - 2023
              </span>
              <h3 className="text-lg font-bold text-white">Data Scientist & Analytics Engineer</h3>
              <p className="text-xs text-cyan-300 font-medium">Predictive Intelligence & ETL</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built churn prediction and survival models with XGBoost & SHAP. Automated ETL pipelines across multi-terabyte datasets and designed executive visual dashboards.
              </p>
            </div>
          </div>

          {/* Role 3 */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between group">
            <div className="w-full sm:w-[45%] glass-card p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition space-y-2 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                2017 - 2021
              </span>
              <h3 className="text-lg font-bold text-white">BSc. in Computer Science</h3>
              <p className="text-xs text-emerald-300 font-medium">University Honours Graduate</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Focused on Artificial Intelligence, distributed algorithms, and computational mathematics. Capstone thesis on Natural Language Processing architectures.
              </p>
            </div>
            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="hidden sm:block w-[45%]" />
          </div>
        </div>
      </section>

      {/* Certifications & Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Certifications */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Professional Certifications
          </h3>

          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                  <p className="text-xs text-slate-400">{cert.issuer} • {cert.year}</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                  {cert.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Philosophy */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Core Engineering Philosophy
          </h3>

          <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Pragmatic Simplicity:</strong> The best ML model is the simplest one that solves the business problem reliably.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Interpretability Matters:</strong> A prediction without transparent feature attribution (SHAP) is a liability in production.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Latency is User Experience:</strong> Optimize inference via ONNX/TensorRT and asynchronous queues from Day 1.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">Davis Ochieng - Resume Summary</h3>
                  <p className="text-xs text-amber-400">Senior Machine Learning Engineer & Data Scientist</p>
                </div>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-base">Executive Summary</h4>
                  <p className="leading-relaxed">
                    Senior Data Scientist and ML Systems Engineer with 5+ years of experience engineering production AI architectures. Specialized in Deep Learning, PyTorch, LoRA fine-tuning, ONNX optimization, and low-latency microservice orchestration.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <h5 className="font-bold text-white mb-2">Core Tech</h5>
                    <p className="text-xs text-slate-400">Python, PyTorch, TensorFlow, Scikit-learn, XGBoost, FastAPI, Docker, ONNX, Kafka, React 19, TypeScript</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <h5 className="font-bold text-white mb-2">Education & Certs</h5>
                    <p className="text-xs text-slate-400">BSc. Computer Science (Honours), AWS Certified ML Specialist, DL.AI Specialization</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={handleDownloadResume}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  Download Complete CV (PDF)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
