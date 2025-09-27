import { Link } from 'react-router-dom';

type ArticlePageProps = {
  title: string;
  content: string;
};

export default function ArticlePage({ title, content }: ArticlePageProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">{title}</h2>
      <p className="text-gray-300 text-lg leading-relaxed">{content}</p>
      <div className="mt-8">
        <Link to="/" className="text-yellow-400 hover:underline">← Back to Articles</Link>
      </div>
    </div>
  );
}