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
  }, [article]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const headings = article.sections.map((s) => document.getElementById(s.id));
      for (let i = headings.length - 1; i >= 0; i--) {
        const h = headings[i];
        if (h && h.getBoundingClientRect().top <= 120) {
          setActiveSection(article.sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.sections]);

  const copyCode = (code: string, sectionId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(sectionId);
    showToast('Code copied to clipboard', 'success');
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article URL copied to clipboard', 'success');
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
      showToast('Thanks for the feedback', 'success');
    }
  };

  const handleBookmarkToggle = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('bookmarked_articles') || '[]');
      let updated: string[];
      if (isBookmarked) {
        updated = saved.filter((s: string) => s !== article.slug);
        showToast('Removed from saved articles', 'info');
      } else {
        updated = [...saved, article.slug];
        showToast('Saved to your reading list', 'success');
      }
      localStorage.setItem('bookmarked_articles', JSON.stringify(updated));
      setIsBookmarked(!isBookmarked);
    } catch {
      // fallback
    }
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech not supported in this browser', 'error');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      showToast('Audio playback stopped', 'info');
    } else {
      const fullText = `${article.title}. ${article.subtitle}. Key takeaways: ${article.keyTakeaways.join('. ')}.`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      showToast('Playing audio summary', 'info');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(),
      author: commentAuthor.trim() || 'Anonymous Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      date: 'Just now',
      content: commentText.trim(),
      likes: 0,
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentText('');
    setCommentAuthor('');
    showToast('Comment posted', 'success');
  };

  const relatedArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Reading Progress Line */}
      <div className="fixed top-14 left-0 right-0 h-0.5 bg-transparent z-50">
        <div
          className="h-full bg-[#4cc38a] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#85858b] hover:text-[#ededed] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All articles</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Article Content */}
        <article className="lg:col-span-8 space-y-8">
          {/* Header */}
          <div className="space-y-4 border-b border-white/[0.08] pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#85858b]">
              <span className="px-2 py-0.5 rounded bg-[#232325] text-[#ededed] border border-white/[0.08]">
                {article.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#85858b]" /> {article.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-[#85858b]" /> {article.views.toLocaleString()} reads
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#ededed] tracking-tight leading-tight font-heading">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-[#a1a1a6] leading-relaxed">
              {article.subtitle}
            </p>

            {/* Author Meta & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={profileSmall}
                  alt="Davis Ochieng"
                  className="w-10 h-10 rounded-md border border-white/[0.1] object-cover"
                />
                <div>
                  <p className="text-xs font-medium text-[#ededed]">Davis Ochieng</p>
                  <p className="text-[11px] text-[#85858b] font-mono">
                    Published {article.publishedDate} {article.updatedDate && `• Updated ${article.updatedDate}`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                <button
                  onClick={handleToggleSpeech}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                    isSpeaking
                      ? 'bg-[#232325] text-[#4cc38a] border-white/[0.12]'
                      : 'bg-[#19191b] border-white/[0.08] text-[#85858b] hover:text-[#ededed]'
                  }`}
                  title={isSpeaking ? 'Stop audio' : 'Listen'}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-[#4cc38a]" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                </button>

                <button
                  onClick={handleBookmarkToggle}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                    isBookmarked
                      ? 'bg-[#232325] text-[#4cc38a] border-white/[0.12]'
                      : 'bg-[#19191b] border-white/[0.08] text-[#85858b] hover:text-[#ededed]'
                  }`}
                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#4cc38a] text-[#4cc38a]' : ''}`} />
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                    isLiked
                      ? 'bg-[#232325] border-white/[0.12] text-[#e5484d]'
                      : 'bg-[#19191b] border-white/[0.08] text-[#85858b] hover:text-[#ededed]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#e5484d]' : ''}`} />
                  <span>{likeCount}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#19191b] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] transition-colors"
                  title="Share article URL"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Key Takeaways Callout */}
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#19191b] space-y-3">
            <h3 className="text-xs font-mono font-medium text-[#ededed]">
              Executive summary
            </h3>
            <ul className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#a1a1a6] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#4cc38a] shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <div className="space-y-10">
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-3 scroll-mt-24">
                <h2 className="text-lg sm:text-xl font-medium text-[#ededed] tracking-tight font-heading">
                  {section.title}
                </h2>

                <div className="text-[#a1a1a6] text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-3 font-normal">
                  {section.content}
                </div>

                {/* Callout */}
                {section.callout && (
                  <div
                    className={`p-3.5 rounded-lg border flex items-start gap-2.5 my-3 text-xs leading-relaxed ${
                      section.callout.type === 'tip'
                        ? 'bg-[#19191b] border-white/[0.08] text-[#ededed]'
                        : section.callout.type === 'warning'
                        ? 'bg-[#19191b] border-[#e5484d]/30 text-[#ededed]'
                        : 'bg-[#19191b] border-white/[0.08] text-[#a1a1a6]'
                    }`}
                  >
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#85858b]" />
                    <p className="font-medium">{section.callout.text}</p>
                  </div>
                )}

                {/* Code Snippet Box */}
                {section.codeSnippet && (
                  <div className="rounded-lg bg-[#141415] border border-white/[0.08] overflow-hidden my-4 font-mono text-xs">
                    <div className="flex items-center justify-between px-3.5 py-2 bg-[#19191b] border-b border-white/[0.08]">
                      <span className="text-[#85858b] text-[11px]">
                        {section.codeSnippet.filename || section.codeSnippet.language}
                      </span>
                      <button
                        onClick={() => copyCode(section.codeSnippet!.code, section.id)}
                        className="flex items-center gap-1.5 text-[11px] text-[#85858b] hover:text-[#ededed] transition-colors"
                      >
                        {copiedCodeId === section.id ? (
                          <>
                            <Check className="w-3 h-3 text-[#4cc38a]" />
                            <span className="text-[#4cc38a]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs font-mono text-[#ededed] leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Share & Feedback Footer */}
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#19191b] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#ededed]">Found this deep-dive useful?</p>
              <p className="text-xs text-[#85858b]">Share it with colleagues or leave benchmark notes below.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className="btn-primary"
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-black' : ''}`} />
                <span>{isLiked ? 'Liked' : 'Like'} ({likeCount})</span>
              </button>
              <button
                onClick={handleShare}
                className="btn-secondary"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy link</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            <h3 className="text-base font-medium text-[#ededed] flex items-center gap-2 font-heading">
              <MessageSquare className="w-4 h-4 text-[#85858b]" />
              <span>Discussion ({comments.length})</span>
            </h3>

            {/* Post Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-2.5 p-4 rounded-xl border border-white/[0.08] bg-[#19191b] text-xs">
              <input
                type="text"
                placeholder="Name or role (e.g. Systems Engineer)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full bg-[#141415] border border-white/[0.08] rounded-md px-3 py-1.5 text-xs text-[#ededed] placeholder-[#85858b] focus:outline-none focus:border-white/[0.2]"
              />
              <textarea
                placeholder="Share findings, benchmark variations, or questions..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full bg-[#141415] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-[#ededed] placeholder-[#85858b] focus:outline-none focus:border-white/[0.2] resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-secondary"
                >
                  <Send className="w-3 h-3" />
                  <span>Post comment</span>
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-2.5">
              {comments.map((comment) => (
                <div key={comment.id} className="p-3.5 rounded-lg bg-[#19191b] border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-6 h-6 rounded-md object-cover"
                      />
                      <span className="text-xs font-medium text-[#ededed]">{comment.author}</span>
                    </div>
                    <span className="text-[11px] text-[#85858b] font-mono">{comment.date}</span>
                  </div>
                  <p className="text-xs text-[#a1a1a6] leading-relaxed pl-8">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-20 p-5 rounded-xl border border-white/[0.08] bg-[#19191b] space-y-5 text-xs font-mono">
            <div>
              <h3 className="font-mono text-[11px] text-[#85858b] mb-2">
                Sections
              </h3>
              <nav className="space-y-1">
                {article.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block py-1.5 px-2.5 rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#232325] text-[#ededed] border border-white/[0.08]'
                        : 'text-[#85858b] hover:text-[#ededed] hover:bg-white/[0.03]'
                    }`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Author Profile Bio Card */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2.5">
                <img
                  src={profileSmall}
                  alt="Davis Ochieng"
                  className="w-8 h-8 rounded-md border border-white/[0.1] object-cover"
                />
                <div>
                  <p className="text-xs font-medium text-[#ededed]">Davis Ochieng</p>
                  <p className="text-[10px] text-[#85858b]">Machine learning systems</p>
                </div>
              </div>
              <p className="text-[11px] text-[#a1a1a6] leading-relaxed font-sans">
                Researching and implementing low-rank parameter allocation, model quantization, and high-throughput inference engines.
              </p>
            </div>

            {/* Related Articles */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <h4 className="font-mono text-[11px] text-[#85858b]">
                Related articles
              </h4>
              <div className="space-y-1.5">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/articles/${rel.slug}`}
                    className="block p-2.5 rounded-md bg-[#141415] hover:bg-[#232325] border border-white/[0.06] transition-colors"
                  >
                    <p className="text-xs font-medium text-[#ededed] line-clamp-1">
                      {rel.title}
                    </p>
                    <span className="text-[10px] text-[#85858b] font-mono">{rel.readTime}</span>
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