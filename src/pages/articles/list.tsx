import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Eye, 
  Heart, 
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { ARTICLES_DATA } from '../../data/articles';
import SpotlightCard from '../../components/ui/SpotlightCard';

export default function ArticlesListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'readTime'>('newest');
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bookmarked_articles') || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const categories = [
    'All', 
    'Machine Learning', 
    'Deep Learning', 
    'MLOps', 
    'LLMs & NLP', 
    'Data Visualization',
    ...(bookmarkedSlugs.length > 0 ? ['Saved Articles'] : [])
  ];

  const toggleLike = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedArticles((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const toggleBookmark = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    const isSaved = bookmarkedSlugs.includes(slug);
    const updated = isSaved ? bookmarkedSlugs.filter((s) => s !== slug) : [...bookmarkedSlugs, slug];
    setBookmarkedSlugs(updated);
    try {
      localStorage.setItem('bookmarked_articles', JSON.stringify(updated));
    } catch {
      // localStorage error fallback
    }
  };

  const filteredArticles = ARTICLES_DATA.filter((article) => {
    const matchesCategory = 
      selectedCategory === 'All' 
        ? true 
        : selectedCategory === 'Saved Articles'
          ? bookmarkedSlugs.includes(article.slug)
          : article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.views - a.views;
    if (sortBy === 'readTime') {
      const aTime = parseInt(a.readTime) || 0;
      const bTime = parseInt(b.readTime) || 0;
      return bTime - aTime;
    }
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

  const featuredArticle = ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];

  return (
    <div className="min-h-screen py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#c8f135]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f135] animate-pulse shadow-[0_0_8px_#c8f135]" />
          <BookOpen className="w-3.5 h-3.5" />
          <span>[RESEARCH_PUBLICATIONS // INDEX]</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
          Technical Field Guides & <span className="font-serif-italic text-[#c8f135] font-normal">Research</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-base font-mono">
          Mathematical foundations, empirical benchmarks, and production architectures across Deep Learning and MLOps.
        </p>
      </div>

      {/* Featured Lead Article Banner (if no search active) */}
      {!searchQuery && selectedCategory === 'All' && featuredArticle && (
        <SpotlightCard
          cornerTag="FEATURED_PAPER"
          showCrosshairs={true}
          spotlightColor="rgba(200, 241, 53, 0.15)"
          className="p-6 sm:p-10 border-[#c8f135]/30"
        >
          <div className="max-w-3xl space-y-4 font-mono">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#c8f135] bg-[#c8f135]/10 border border-[#c8f135]/40 px-3 py-0.5 rounded-full text-[10px]">
                ✦ Primary Research Paper
              </span>
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c8f135]" /> {featuredArticle.readTime}
              </span>
              <span className="text-slate-500">
                {featuredArticle.publishedDate}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading leading-snug">
              {featuredArticle.title}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
              {featuredArticle.excerpt}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {featuredArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-3">
              <Link
                to={`/articles/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c8f135] hover:bg-[#d9ff43] text-black text-xs font-bold font-mono transition shadow-[0_0_20px_rgba(200,241,53,0.3)]"
              >
                <span>Read Full Publication</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </SpotlightCard>
      )}

      {/* Filter, Search & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 bg-black/40 rounded-2xl border border-white/10 backdrop-blur-md">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-[#c8f135] text-black font-bold shadow-md shadow-[#c8f135]/20'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto font-mono text-xs">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, tags..."
              className="w-full bg-black/50 border border-white/10 rounded-full pl-9 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#c8f135] transition"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort articles"
            className="bg-black/50 border border-white/10 rounded-full px-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#c8f135]"
          >
            <option value="newest">Latest Date</option>
            <option value="popular">Most Read</option>
            <option value="readTime">In-Depth</option>
          </select>
        </div>
      </div>

      {/* Articles Grid with SpotlightCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, idx) => {
          const isLiked = likedArticles[article.slug];
          const isBookmarked = bookmarkedSlugs.includes(article.slug);
          const likeCount = article.initialLikes + (isLiked ? 1 : 0);

          return (
            <SpotlightCard
              key={article.slug}
              cornerTag={`DOC_${idx + 1}`}
              showCrosshairs={true}
              spotlightColor="rgba(200, 241, 53, 0.15)"
              className="p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-[#c8f135] bg-[#c8f135]/10 border border-[#c8f135]/30 px-2.5 py-0.5 rounded-full text-[10px]">
                    {article.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-[#c8f135]" /> {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <Link to={`/articles/${article.slug}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-[#c8f135] transition-colors line-clamp-2 font-heading leading-snug">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed font-sans">
                    {article.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    {article.views.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => toggleLike(e, article.slug)}
                    className={`flex items-center gap-1 text-[11px] transition ${
                      isLiked ? 'text-rose-400 font-semibold' : 'text-slate-500 hover:text-rose-400'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                    {likeCount}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(e, article.slug)}
                    className={`p-1.5 rounded-full border transition ${
                      isBookmarked
                        ? 'bg-[#c8f135]/20 text-[#c8f135] border-[#c8f135]/40'
                        : 'bg-white/[0.04] text-slate-400 border-white/5 hover:text-white'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark publication'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#c8f135]' : ''}`} />
                  </button>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="font-bold text-[#c8f135] hover:text-[#d9ff43] text-xs flex items-center gap-1"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
