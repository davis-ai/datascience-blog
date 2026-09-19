import { useState } from 'react';
import { 
  Mail, 
  Globe, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Calendar,
  MessageSquare,
  Briefcase
} from 'lucide-react';
import { FaLinkedin, FaGithub, FaTwitter, FaBuilding } from 'react-icons/fa';
import { useToast } from '../components/ui/toast';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'project' | 'consultation' | 'career' | 'speaking'>('project');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
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
      showToast('🚀 Message received! Davis will respond within 24 hours.', 'success');
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
          <Mail className="w-3.5 h-3.5" /> Direct Contact & Collaboration Portal
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something <span className="gradient-text-gold">Intelligent</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Whether you need enterprise AI architecture, custom LLM fine-tuning, high-throughput MLOps systems, or technical consultation.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaBuilding className="text-amber-400" /> Davis Ochieng
              </h3>
              <p className="text-xs text-amber-400 font-semibold mt-0.5">
                AI / Machine Learning Studio
              </p>
            </div>

            {/* Availability Status */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mt-1 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-300">Available for Opportunities</p>
                <p className="text-[11px] text-emerald-400/80 mt-0.5">
                  Accepting select engineering contracts & full-time technical leadership roles.
                </p>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Email Address</p>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-white font-mono font-medium text-xs">davis.ochieng@datascience.ai</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Physical Studio</p>
                <p className="text-white font-medium">Westlands, Nairobi, Kenya</p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-amber-400" /> Available for worldwide remote collaboration
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Timezone & Hours</p>
                <p className="text-white font-medium">East Africa Time (EAT, UTC+3)</p>
                <p className="text-[11px] text-slate-500">Mon - Fri: 08:30 – 18:00 EAT</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-4">
              <a
                href="https://github.com/davis-ai"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 transition"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/davis-ochieng"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/davis_ochieng"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 transition"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="lg:col-span-8">
          <div className="glass-card p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
            {/* Category Tabs */}
            <div className="flex border-b border-slate-800 overflow-x-auto no-scrollbar gap-6">
              {[
                { id: 'project', label: 'Project Inquiries', icon: <Sparkles className="w-3.5 h-3.5" /> },
                { id: 'consultation', label: 'Technical Advisory', icon: <Calendar className="w-3.5 h-3.5" /> },
                { id: 'career', label: 'Hiring & Roles', icon: <Briefcase className="w-3.5 h-3.5" /> },
                { id: 'speaking', label: 'Speaking / Workshops', icon: <MessageSquare className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'text-amber-400 border-amber-400'
                      : 'text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Your Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Work Email <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
              </div>

              {activeTab === 'project' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Service Area</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      aria-label="Select Service Area"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="llm-tuning">LLM & LoRA Fine-Tuning</option>
                      <option value="mlops-latency">Real-Time MLOps / Low Latency</option>
                      <option value="computer-vision">3D Vision & Segmentation</option>
                      <option value="predictive">Predictive Analytics & SHAP</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      aria-label="Select Estimated Budget"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="< $5k">&lt; $5,000</option>
                      <option value="$5k - $10k">$5,000 - $10,000</option>
                      <option value="$10k - $25k">$10,000 - $25,000</option>
                      <option value="$25k+">$25,000+</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Target Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      aria-label="Select Target Timeline"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="immediate">Immediate (&lt; 2 weeks)</option>
                      <option value="1-3 months">1 - 3 months</option>
                      <option value="flexible">Flexible / Planning</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'career' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Company Name & Role Details</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme AI Labs - Staff Machine Learning Engineer"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">
                  Project Description or Message <span className="text-amber-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Outline your project scope, dataset size, deployment target, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none leading-relaxed transition"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <p className="text-[11px] text-slate-500">
                  🔒 Your data and intellectual property are treated with strict confidentiality.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
