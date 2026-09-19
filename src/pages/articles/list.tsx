import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Eye, 
  Heart, 
  Sparkles, 
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { ARTICLES_DATA } from '../../data/articles';

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide">
          <BookOpen className="w-3.5 h-3.5" /> Technical Research & Field Guides
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Data Science <span className="gradient-text-cyan">Articles & Insights</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          In-depth technical tutorials, mathematical breakdowns, and production architectures across Machine Learning, MLOps, and Deep Neural Networks.
        </p>
      </div>

      {/* Featured Article Banner (if no search query active) */}
      {!searchQuery && selectedCategory === 'All' && featuredArticle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden glass-card border border-amber-500/30 p-8 sm:p-10 shadow-2xl group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/70 border border-amber-500/40 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" /> Featured Publication
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
              </span>
              <span className="text-xs text-slate-400">
                {featuredArticle.publishedDate}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
              {featuredArticle.title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {featuredArticle.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {featuredArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-700/60"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to={`/articles/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20"
              >
                Read Full Deep-Dive
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filter, Search & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, tags..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort articles"
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="readTime">Longest Read</option>
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => {
          const isLiked = likedArticles[article.slug];
          const likeCount = article.initialLikes + (isLiked ? 1 : 0);

          return (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle top glow */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${article.coverGradient} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              <div className="space-y-4 relative z-10">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
                    {article.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <Link to={`/articles/${article.slug}`}>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-800/80 text-xs text-slate-400 relative z-10">
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
                    title="Like article"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                    {likeCount}
                  </button>
                  <button
                    onClick={(e) => toggleBookmark(e, article.slug)}
                    className={`flex items-center gap-1 text-[11px] transition ${
                      bookmarkedSlugs.includes(article.slug) ? 'text-amber-400 font-semibold' : 'text-slate-500 hover:text-amber-400'
                    }`}
                    title={bookmarkedSlugs.includes(article.slug) ? "Remove bookmark" : "Save article"}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarkedSlugs.includes(article.slug) ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/articles/${article.slug}`}
                  className="font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Read →
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 text-slate-400 glass-card rounded-3xl p-8 border border-slate-800">
          <p className="text-lg font-semibold text-white">No articles match your query</p>
          <p className="text-xs text-slate-400 mt-1">Try searching for other terms like "PyTorch", "FastAPI", or "XGBoost".</p>
        </div>
      )}
    </div>
  );
}
