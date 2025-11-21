import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";

export default function ArticlesListPage() {
  const articles = [
    {
      id: "ml",
      title: "Introduction to Machine Learning",
      excerpt: "Learn the basics of ML and how to apply algorithms effectively."
    },
    {
      id: "visualization",
      title: "Data viz with Python",
      excerpt: "Explore matplotlib, seaborn, and plotly for storytelling with data."
    },
    {
      id: "deep-learning",
      title: "Deep Learning Essentials",
      excerpt: "Dive into neural networks, TensorFlow, and PyTorch applications."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-16 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-yellow-400">
        All Articles
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {articles.map(article => (
          <Card key={article.id} className="bg-gray-700 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-4">{article.title}</h4>
              <p className="text-gray-300 mb-4">{article.excerpt}</p>
              <Link
                to={`/articles/${article.id}`}
                className="text-yellow-400 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
