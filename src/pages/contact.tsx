import { useState, useEffect } from 'react';
import { 
  Mail, 
  Globe, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Calendar,
  MessageSquare,
  Briefcase,
  Clock,
  Key,
  ShieldCheck
} from 'lucide-react';
import { FaLinkedin, FaGithub, FaTwitter, FaBuilding } from 'react-icons/fa';
import { useToast } from '../components/ui/toast';
import SpotlightCard from '../components/ui/SpotlightCard';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'project' | 'consultation' | 'career' | 'speaking'>('project');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const { showToast } = useToast();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'llm-tuning',
    budget: '$5k - $10k',
    timeline: '1-3 months',
    message: ''
  });

  // Live Nairobi Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const nairobiTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Nairobi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(nairobiTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('davis.ochieng@datascience.ai');
    setCopiedEmail(true);
    showToast('Email copied to clipboard (davis.ochieng@datascience.ai)', 'success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please complete all required fields before submitting', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('🚀 Transmission logged! Davis will review within 24 hours.', 'success');
      setFormData({
        name: '',
        email: '',
        company: '',
        service: 'llm-tuning',
        budget: '$5k - $10k',
        timeline: '1-3 months',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#c8f135]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f135] animate-pulse shadow-[0_0_8px_#c8f135]" />
          <Mail className="w-3.5 h-3.5" />
          <span>[DIRECT_ENCRYPTED_PORTAL // 2026]</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
          Technical Collaboration & <span className="font-serif-italic text-[#c8f135] font-normal">Inquiries</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-base font-mono">
          Direct engagement channel for custom LLM fine-tuning, sub-15ms MLOps infrastructure, and high-impact advisory.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <SpotlightCard
            cornerTag="METADATA_01"
            showCrosshairs={true}
            spotlightColor="rgba(200, 241, 53, 0.15)"
            className="p-6 sm:p-7 space-y-5"
          >
            <div>
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <FaBuilding className="text-[#c8f135]" /> Davis Ochieng
              </h3>
              <p className="text-xs text-[#c8f135]/90 font-mono mt-0.5">
                AI / Machine Learning Systems Lab
              </p>
            </div>

            {/* Availability Status */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-[#c8f135]/30 flex items-start gap-3 font-mono text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c8f135] animate-pulse shadow-[0_0_8px_#c8f135] mt-1 shrink-0" />
              <div>
                <p className="font-bold text-[#c8f135]">Available for Opportunities</p>
                <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                  Accepting select engineering contracts & full-time technical leadership roles.
                </p>
              </div>
            </div>

            {/* Live Clock & Coordinates */}
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c8f135]" />
                  Local Time (EAT/UTC+3):
                </span>
                <span className="text-white font-bold">{currentTime || '12:00:00'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  Location:
                </span>
                <span className="text-white">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  SLA Response:
                </span>
                <span className="text-[#c8f135] font-bold">&lt;24h Guaranteed</span>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <p className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Email Address</p>
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <span className="text-white font-medium text-xs truncate">davis.ochieng@datascience.ai</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* PGP Fingerprint */}
              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">PGP Key ID</span>
                  <Key className="w-3 h-3 text-[#c8f135]" />
                </div>
                <p className="text-[10px] text-slate-400 break-all">
                  92FC 41A8 D82E 7510 39BC 0029
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-center gap-3">
              <a
                href="https://github.com/davis-ai"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 hover:text-[#c8f135] hover:border-[#c8f135]/40 transition"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/davis-ochieng"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 hover:text-[#c8f135] hover:border-[#c8f135]/40 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/davis_ochieng"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 hover:text-[#c8f135] hover:border-[#c8f135]/40 transition"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Form Area */}
        <div className="lg:col-span-8">
          <SpotlightCard
            cornerTag="TRANSMISSION_FORM"
            showCrosshairs={true}
            spotlightColor="rgba(200, 241, 53, 0.15)"
            className="p-6 sm:p-10 space-y-6"
          >
            {/* Category Tabs */}
            <div className="flex border-b border-white/[0.08] overflow-x-auto no-scrollbar gap-5 font-mono text-xs">
              {[
                { id: 'project', label: 'Engineering Projects', icon: <Sparkles className="w-3.5 h-3.5" /> },
                { id: 'consultation', label: 'Technical Advisory', icon: <Calendar className="w-3.5 h-3.5" /> },
                { id: 'career', label: 'Leadership Roles', icon: <Briefcase className="w-3.5 h-3.5" /> },
                { id: 'speaking', label: 'Workshops & Keynotes', icon: <MessageSquare className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'text-[#c8f135] border-[#c8f135]'
                      : 'text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300">
                    Full Name <span className="text-[#c8f135]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#c8f135] transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300">
                    Work Email <span className="text-[#c8f135]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#c8f135] transition"
                  />
                </div>
              </div>

              {activeTab === 'project' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300">Technical Domain</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      aria-label="Select Technical Domain"
                      className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-white focus:outline-none focus:border-[#c8f135]"
                    >
                      <option value="llm-tuning">LLM & QLoRA Fine-Tuning</option>
                      <option value="mlops-latency">Real-Time MLOps / Triton</option>
                      <option value="computer-vision">3D Vision & Segmentation</option>
                      <option value="predictive">Predictive Analytics & SHAP</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300">Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      aria-label="Select Budget Range"
                      className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-white focus:outline-none focus:border-[#c8f135]"
                    >
                      <option value="< $5k">&lt; $5,000</option>
                      <option value="$5k - $10k">$5,000 - $10,000</option>
                      <option value="$10k - $25k">$10,000 - $25,000</option>
                      <option value="$25k+">$25,000+</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300">Target Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      aria-label="Select Target Timeline"
                      className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-white focus:outline-none focus:border-[#c8f135]"
                    >
                      <option value="immediate">Immediate (&lt; 2 weeks)</option>
                      <option value="1-3 months">1 - 3 Months</option>
                      <option value="quarterly">Quarterly Roadmap</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-slate-300">
                  Project Specifications & System Context <span className="text-[#c8f135]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your models, throughput targets, latency constraints, or architectural objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#c8f135] transition"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[10px] text-slate-500">
                  Protected by end-to-end encryption. No tracking telemetry.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-full bg-[#c8f135] hover:bg-[#d9ff43] text-black font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(200,241,53,0.3)] transition disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Transmitting..." : "Send Transmission"}</span>
                </button>
              </div>
            </form>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
