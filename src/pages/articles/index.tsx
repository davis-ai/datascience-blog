import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  Copy, 
  Check, 
  CheckCircle2, 
  Info, 
  MessageSquare, 
  Sparkles,
  Send,
  Bookmark,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ARTICLES_DATA, type Comment } from '../../data/articles';
import { useToast } from '../../components/ui/toast';
import profileSmall from '../../assets/images/profile-optimized-small.jpg';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { showToast } = useToast();

  const article = ARTICLES_DATA.find((a) => a.slug === slug) || ARTICLES_DATA[0];

  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(article.initialLikes);
  const [activeSection, setActiveSection] = useState<string>(article.sections[0]?.id || '');
  const [comments, setComments] = useState<Comment[]>(article.comments);
  const [commentAuthor, setCommentAuthor] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bookmarked_articles') || '[]');
      return Array.isArray(saved) && saved.includes(article.slug);
    } catch {
      return false;
    }
  });
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Sync state when article slug changes
  useEffect(() => {
    setLikeCount(article.initialLikes);
    setIsLiked(false);
    setComments(article.comments);
    setActiveSection(article.sections[0]?.id || '');
    try {
      const saved = JSON.parse(localStorage.getItem('bookmarked_articles') || '[]');
      setIsBookmarked(Array.isArray(saved) && saved.includes(article.slug));
    } catch {
      setIsBookmarked(false);
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [article.slug]);

  // Scroll Progress and active section spy
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Check active section
      for (const section of article.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    showToast('Code copied to clipboard!', 'success');
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Article URL copied to clipboard!', 'success');
  };

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      showToast('Thank you for liking this article!', 'success');
    } else {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  const handleBookmarkToggle = () => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem('bookmarked_articles') || '[]');
      let updated: string[];
      if (isBookmarked) {
        updated = saved.filter((id) => id !== article.slug);
        setIsBookmarked(false);
        showToast('Article removed from bookmarks', 'info');
      } else {
        updated = [...saved.filter((id) => id !== article.slug), article.slug];
        setIsBookmarked(true);
        showToast('Article bookmarked! Access it anytime.', 'success');
      }
      localStorage.setItem('bookmarked_articles', JSON.stringify(updated));
    } catch {
      showToast('Could not update bookmarks', 'error');
    }
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech is not supported in this browser.', 'error');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      showToast('Audio narration stopped', 'info');
    } else {
      const textToRead = `${article.title}. Summary: ${article.subtitle}. Key takeaways: ${article.keyTakeaways.join('. ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      showToast('Playing audio summary...', 'success');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substring(2, 9),
      author: commentAuthor.trim() || 'Data Scientist Guest',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
      date: 'Just now',
      content: commentText.trim(),
      likes: 1
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentText('');
    setCommentAuthor('');
    showToast('Your comment has been posted!', 'success');
  };

  const relatedArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-20 left-0 right-0 h-1 bg-[#050705] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#c8f135] via-emerald-400 to-[#d9ff43] shadow-[0_0_10px_#c8f135] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back Button */}
      <div className="mb-8">
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-xs font-semibold font-mono text-slate-400 hover:text-[#c8f135] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Articles
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Article Content */}
        <article className="lg:col-span-8 space-y-10">
          {/* Header */}
          <div className="space-y-4 border-b border-white/[0.08] pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c8f135] bg-[#c8f135]/10 border border-[#c8f135]/30 px-3.5 py-1 rounded-full font-mono">
                {article.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#c8f135]" /> {article.readTime}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                <Eye className="w-3.5 h-3.5 text-[#c8f135]" /> {article.views.toLocaleString()} reads
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-heading">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed font-sans">
              {article.subtitle}
            </p>

            {/* Author Meta & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={profileSmall}
                  alt="Davis Ochieng"
                  className="w-11 h-11 rounded-full border-2 border-[#c8f135] object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-white font-sans">Davis Ochieng</p>
                  <p className="text-xs text-slate-400">
                    Published on {article.publishedDate} {article.updatedDate && `• Updated ${article.updatedDate}`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleToggleSpeech}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition ${
                    isSpeaking
                      ? 'bg-[#c8f135]/20 border-[#c8f135] text-[#c8f135] shadow-md shadow-[#c8f135]/20 animate-pulse'
                      : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:border-[#c8f135]/40'
                  }`}
                  title={isSpeaking ? 'Stop audio playback' : 'Listen to audio summary'}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4 text-[#c8f135]" /> : <Volume2 className="w-4 h-4 text-[#c8f135]" />}
                  <span>{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
                </button>

                <button
                  onClick={handleBookmarkToggle}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition ${
                    isBookmarked
                      ? 'bg-[#c8f135]/20 border-[#c8f135] text-[#c8f135] shadow-md shadow-[#c8f135]/20'
                      : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:border-[#c8f135]/40'
                  }`}
                  title={isBookmarked ? 'Remove from bookmarks' : 'Save article for later'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#c8f135] text-[#c8f135]' : 'text-slate-400'}`} />
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition ${
                    isLiked
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/20'
                      : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:border-rose-500/40'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  {likeCount}
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:border-[#c8f135]/40 transition"
                  title="Share article URL"
                >
                  <Share2 className="w-4 h-4 text-[#c8f135]" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Key Takeaways Callout */}
          <div className="glass-card p-6 rounded-3xl border border-[#c8f135]/30 bg-[#c8f135]/5 space-y-3 font-mono">
            <h3 className="text-sm font-bold text-[#c8f135] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c8f135]" />
              Executive Summary & Key Takeaways
            </h3>
            <ul className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#c8f135] shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <div className="space-y-12">
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-white tracking-tight font-heading">
                  {section.title}
                </h2>

                <div className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-normal">
                  {section.content}
                </div>

                {/* Optional Alert Callout */}
                {section.callout && (
                  <div
                    className={`p-4 rounded-2xl border flex items-start gap-3 my-4 ${
                      section.callout.type === 'tip'
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                        : section.callout.type === 'warning'
                        ? 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                        : 'bg-black/40 border-[#c8f135]/30 text-slate-200'
                    }`}
                  >
                    <Info className="w-5 h-5 shrink-0 mt-0.5 text-[#c8f135]" />
                    <p className="text-xs sm:text-sm font-medium">{section.callout.text}</p>
                  </div>
                )}

                {/* Code Snippet Box */}
                {section.codeSnippet && (
                  <div className="rounded-2xl bg-[#050705] border border-white/10 overflow-hidden my-6 shadow-2xl font-mono">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/[0.08] text-xs">
                      <span className="text-slate-400 font-semibold">
                        {section.codeSnippet.filename || section.codeSnippet.language}
                      </span>
                      <button
                        onClick={() => copyCode(section.codeSnippet!.code, section.id)}
                        className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#c8f135] transition"
                      >
                        {copiedCodeId === section.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Share & Like Footer */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div>
              <p className="text-sm font-bold text-white font-sans">Found this technical deep-dive valuable?</p>
              <p className="text-xs text-slate-400">Share it with fellow engineers or drop feedback below.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c8f135] hover:bg-[#d9ff43] text-black text-xs font-bold transition shadow-[0_0_15px_rgba(200,241,53,0.3)]"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-black' : ''}`} />
                {isLiked ? 'Liked' : 'Like Article'} ({likeCount})
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-semibold border border-white/10 transition"
              >
                <Share2 className="w-4 h-4 text-[#c8f135]" />
                Copy Link
              </button>
            </div>
          </div>

          {/* Interactive Comments Section */}
          <div className="space-y-6 pt-6 border-t border-white/[0.08]">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 font-heading">
              <MessageSquare className="w-5 h-5 text-[#c8f135]" />
              Community Discussion ({comments.length})
            </h3>

            {/* Post Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3 glass-card p-4 sm:p-5 rounded-3xl border border-white/10 font-mono text-xs">
              <input
                type="text"
                placeholder="Your name or title (e.g. Alex - ML Engineer)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#c8f135]"
              />
              <textarea
                placeholder="Share your thoughts, benchmarks, or questions..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#c8f135] resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#c8f135] hover:bg-[#d9ff43] text-black text-xs font-bold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(200,241,53,0.3)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-white font-sans">{comment.author}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{comment.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-9 font-sans">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar (Table of Contents & Related) */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Sticky Table of Contents */}
          <div className="sticky top-28 glass-card p-6 rounded-3xl border border-white/10 space-y-4 font-mono text-xs">
            <h3 className="font-bold uppercase tracking-wider text-slate-300">
              Table of Contents
            </h3>
            <nav className="space-y-1.5">
              {article.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block py-1.5 px-3 rounded-xl transition ${
                    activeSection === section.id
                      ? 'bg-[#c8f135]/15 text-[#c8f135] font-bold border-l-2 border-[#c8f135]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {section.title}
                </a>
              ))}
            </nav>

            {/* Author Profile Bio Card */}
            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={profileSmall}
                  alt="Davis Ochieng"
                  className="w-10 h-10 rounded-full border border-[#c8f135] object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-white font-sans">Davis Ochieng</p>
                  <p className="text-[11px] text-[#c8f135]">Data Scientist & ML Engineer</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Writing about scalable deep learning, real-time MLOps architectures, and mathematical fundamentals of AI.
              </p>
            </div>

            {/* Related Articles */}
            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <h4 className="font-bold uppercase tracking-wider text-slate-300">
                Recommended Next
              </h4>
              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/articles/${rel.slug}`}
                    className="block p-3 rounded-2xl bg-black/40 hover:bg-white/[0.04] border border-white/5 transition group"
                  >
                    <p className="text-xs font-bold text-white group-hover:text-[#c8f135] transition-colors line-clamp-1 font-sans">
                      {rel.title}
                    </p>
                    <span className="text-[10px] text-slate-500">{rel.readTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}