import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
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
      // fallback
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
    <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-2 border-b border-white/[0.08] pb-6">
        <div className="font-mono text-xs text-[#85858b]">
          Publications & research
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium text-[#ededed] tracking-tight font-heading">
          Technical guides and papers
        </h1>
        <p className="text-xs sm:text-sm text-[#a1a1a6] max-w-2xl">
          Empirical benchmarks, parameter-efficient adaptation, and production inference architectures.
        </p>
      </div>

      {/* Featured Lead Article Banner */}
      {!searchQuery && selectedCategory === 'All' && featuredArticle && (
        <div className="p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-[#19191b] space-y-4">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#85858b]">
              <span className="text-[#4cc38a] font-medium">
                Featured publication
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#85858b]" /> {featuredArticle.readTime}
              </span>
              <span>•</span>
              <span>{featuredArticle.publishedDate}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-medium text-[#ededed] font-heading leading-snug">
              {featuredArticle.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#a1a1a6] leading-relaxed">
              {featuredArticle.excerpt}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {featuredArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#232325] text-[#85858b] border border-white/[0.06]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to={`/articles/${featuredArticle.slug}`}
                className="btn-primary"
              >
                <span>Read paper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Filter, Search & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-2.5 bg-[#19191b] rounded-lg border border-white/[0.08]">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 w-full md:w-auto font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#232325] text-[#ededed] border border-white/[0.08]'
                  : 'text-[#85858b] hover:text-[#ededed] hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2.5 w-full md:w-auto font-mono text-xs">
          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#85858b]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full bg-[#141415] border border-white/[0.08] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#ededed] placeholder-[#85858b] focus:outline-none focus:border-white/[0.2]"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort articles"
            className="bg-[#141415] border border-white/[0.08] rounded-md px-3 py-1.5 text-xs text-[#a1a1a6] focus:outline-none"
          >
            <option value="newest">Latest</option>
            <option value="popular">Most read</option>
            <option value="readTime">In-depth</option>
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const isLiked = likedArticles[article.slug];
          const isBookmarked = bookmarkedSlugs.includes(article.slug);
          const likeCount = article.initialLikes + (isLiked ? 1 : 0);

          return (
            <SpotlightCard
              key={article.slug}
              className="p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#85858b]">
                  <span>{article.category}</span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-[#85858b]" /> {article.readTime}
                  </span>
                </div>

                <div>
                  <Link to={`/articles/${article.slug}`}>
                    <h3 className="text-sm font-medium text-[#ededed] hover:text-white transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#a1a1a6] mt-1.5 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#232325] text-[#85858b] border border-white/[0.06]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] text-xs font-mono text-[#85858b]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Eye className="w-3.5 h-3.5 text-[#85858b]" />
                    {article.views.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => toggleLike(e, article.slug)}
                    className={`flex items-center gap-1 text-[11px] transition-colors ${
                      isLiked ? 'text-[#e5484d] font-medium' : 'text-[#85858b] hover:text-[#ededed]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#e5484d]' : ''}`} />
                    {likeCount}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(e, article.slug)}
                    className={`p-1.5 rounded-md border transition-colors ${
                      isBookmarked
                        ? 'bg-[#232325] text-[#4cc38a] border-white/[0.12]'
                        : 'bg-[#19191b] text-[#85858b] border-white/[0.08] hover:text-[#ededed]'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#4cc38a]' : ''}`} />
                  </button>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="text-xs text-[#ededed] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
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
