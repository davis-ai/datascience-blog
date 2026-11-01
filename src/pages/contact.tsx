import { useState, useEffect } from 'react';
import { 
  Globe, 
  Send, 
  Copy, 
  Check, 
  Calendar,
  MessageSquare,
  Briefcase,
  Clock,
  Key,
  Layers
} from 'lucide-react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { useToast } from '../components/ui/toast';
import SpotlightCard from '../components/ui/SpotlightCard';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'project' | 'consultation' | 'career' | 'speaking'>('project');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'llm-tuning',
    budget: '$5k - $10k',
    timeline: '1-3 months',
    message: ''
  });

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
    showToast('Email address copied to clipboard', 'success');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please complete all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Inquiry sent. I will review and reply within 24 hours.', 'success');
      setFormData({
        name: '',
        email: '',
        company: '',
        service: 'llm-tuning',
        budget: '$5k - $10k',
        timeline: '1-3 months',
        message: ''
      });
    }, 800);
  };

  return (
    <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-2 border-b border-white/[0.08] pb-6">
        <div className="font-mono text-xs text-[#85858b]">
          Contact & collaboration
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium text-[#ededed] tracking-tight font-heading">
          Get in touch
        </h1>
        <p className="text-xs sm:text-sm text-[#a1a1a6] max-w-2xl">
          Direct channel for consulting on model fine-tuning, latency optimization, and production pipelines.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Sidebar */}
        <div className="lg:col-span-4 space-y-5">
          <SpotlightCard className="p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-[#ededed]">
                Davis Ochieng
              </h3>
              <p className="text-xs text-[#85858b] font-mono mt-0.5">
                Machine learning systems engineer
              </p>
            </div>

            {/* Availability Status */}
            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.08] flex items-start gap-2.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#4cc38a] mt-1 shrink-0" />
              <div>
                <p className="font-medium text-[#ededed]">Open for advisory & select roles</p>
                <p className="text-[11px] text-[#85858b] mt-0.5">
                  Available for inference optimization and model fine-tuning contracts.
                </p>
              </div>
            </div>

            {/* Live Clock & Coordinates */}
            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-2 font-mono text-xs text-[#85858b]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Time in Nairobi:
                </span>
                <span className="text-[#ededed] font-medium">{currentTime || '12:00:00'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Location:
                </span>
                <span className="text-[#ededed]">Nairobi, Kenya</span>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1">
                <p className="text-[#85858b] text-[10px]">Email</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#ededed] text-xs truncate">davis.ochieng@datascience.ai</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded bg-[#232325] hover:bg-[#2f2f32] text-[#85858b] hover:text-[#ededed] border border-white/[0.08] transition-colors"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#4cc38a]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* PGP Fingerprint */}
              <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between text-[#85858b]">
                  <span className="text-[10px]">PGP key</span>
                  <Key className="w-3 h-3" />
                </div>
                <p className="text-[10px] text-[#85858b] break-all">
                  92FC 41A8 D82E 7510 39BC 0029
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-white/[0.08] flex items-center gap-2">
              <a
                href="https://github.com/davis-ai"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-[#141415] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/davis-ochieng"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-[#141415] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com/davis_ochieng"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-[#141415] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Form Area */}
        <div className="lg:col-span-8">
          <SpotlightCard className="p-5 sm:p-7 space-y-5">
            {/* Category Tabs */}
            <div className="flex border-b border-white/[0.08] overflow-x-auto gap-4 font-mono text-xs">
              {[
                { id: 'project', label: 'Engineering projects', icon: <Layers className="w-3.5 h-3.5" /> },
                { id: 'consultation', label: 'Technical advisory', icon: <Calendar className="w-3.5 h-3.5" /> },
                { id: 'career', label: 'Full-time roles', icon: <Briefcase className="w-3.5 h-3.5" /> },
                { id: 'speaking', label: 'Talks & workshops', icon: <MessageSquare className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2.5 font-medium flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#ededed] border-[#ededed]'
                      : 'text-[#85858b] border-transparent hover:text-[#ededed]'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#a1a1a6]">
                    Name <span className="text-[#e5484d]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Elena Rostova"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#141415] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-[#ededed] placeholder-[#85858b] focus:outline-none focus:border-white/[0.2]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1a6]">
                    Email <span className="text-[#e5484d]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#141415] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-[#ededed] placeholder-[#85858b] focus:outline-none focus:border-white/[0.2]"
                  />
                </div>
              </div>

              {activeTab === 'project' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[#a1a1a6]">Domain</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      aria-label="Select Technical Domain"
                      className="w-full bg-[#141415] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-[#ededed] focus:outline-none"
                    >
                      <option value="llm-tuning">LLM & QLoRA fine-tuning</option>
                      <option value="mlops-latency">Real-time MLOps & Triton</option>
                      <option value="computer-vision">3D vision & segmentation</option>
                      <option value="predictive">Predictive analytics & SHAP</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#a1a1a6]">Budget range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      aria-label="Select Budget Range"
                      className="w-full bg-[#141415] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-[#ededed] focus:outline-none"
                    >
                      <option value="< $5k">&lt; $5,000</option>
                      <option value="$5k - $10k">$5,000 - $10,000</option>
                      <option value="$10k - $25k">$10,000 - $25,000</option>
                      <option value="$25k+">$25,000+</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#a1a1a6]">Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      aria-label="Select Target Timeline"
                      className="w-full bg-[#141415] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-[#ededed] focus:outline-none"
                    >
                      <option value="immediate">&lt; 2 weeks</option>
                      <option value="1-3 months">1 - 3 months</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[#a1a1a6]">
                  Project context & objectives <span className="text-[#e5484d]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your models, throughput targets, latency constraints, or architectural objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#141415] border border-white/[0.08] rounded-md p-3 text-xs text-[#ededed] placeholder-[#85858b] focus:outline-none focus:border-white/[0.2] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-[#85858b] font-mono">
                  Messages are sent directly without tracking telemetry
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Sending..." : "Send message"}</span>
                </button>
              </div>
            </form>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
