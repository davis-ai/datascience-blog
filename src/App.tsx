import { Linkedin, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

import profileSamll from "./assets/images/profile-optimized-small.jpg";
import profileMedium from "./assets/images/profile-optimized-medium.jpg";
import profileLarge from "./assets/images/profile-optimized-large.jpg";


// Layout with Header & Footer shared across pages
function Layout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Static Header */}
      <header className="flex items-center justify-between p-6 max-w-6xl mx-auto fixed top-0 left-0 right-0 bg-gray-900 z-50 shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-400">DS Blog</h1>
        <nav className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <a href="#about" className="hover:text-yellow-400">About</a>
          <a href="#articles" className="hover:text-yellow-400">Articles</a>
          <a href="#contact" className="hover:text-yellow-400">Contact</a>
        </nav>
      </header>

      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-10 text-center">
        <h4 className="text-lg font-semibold mb-4">Connect with Me</h4>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-yellow-400"><Linkedin /></a>
          <a href="#" className="hover:text-yellow-400"><Twitter /></a>
          <a href="#" className="hover:text-yellow-400"><Github /></a>
        </div>
        <p className="text-gray-500">© {new Date().getFullYear()} Davis Ochieng. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

type ArticlePageProps = {
  title: string;
  content: string;
};

function ArticlePage({ title, content }: ArticlePageProps) {
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

function BlogHome() {
  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="max-w-6xl mx-auto px-6 pt-16 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} transition={{duration:1}}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">I'm <span className="text-yellow-400">Davis Ochieng</span></h2>
          <p className="text-lg text-gray-300 mb-6">
            A Computer Scientist, passionate about data science and sharing insights, tutorials, and real-world projects in machine learning, AI, and analytics.
          </p>
          <div className="flex space-x-4">
            <Button variant="outline">Explore Articles</Button>
            <Button>Contact Me</Button>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0, x:50}} animate={{opacity:1, x:0}} transition={{duration:1}}>
          <picture>
            <source srcSet={profileLarge} media="(min-width: 1024px)" />
            <source srcSet={profileMedium}media="(min-width: 768px)" />
            <img 
              src={profileSamll} 
              alt="Profile of Davis Ochieng" 
              className="rounded-full shadow-lg border-4 border-yellow-400 mx-auto object-cover w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80" 
            />
          </picture>
        </motion.div>
      </section>

      {/* Featured Articles */}
      <section id="articles" className="bg-gray-800 py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-10">Featured Articles</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gray-700 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-4">Introduction to Machine Learning</h4>
              <p className="text-gray-300 mb-4">Learn the basics of ML and how to apply algorithms effectively.</p>
              <Link to="/articles/ml" className="text-yellow-400 font-semibold">Read More →</Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-700 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-4">Data Visualization with Python</h4>
              <p className="text-gray-300 mb-4">Explore matplotlib, seaborn, and plotly for storytelling with data.</p>
              <Link to="/articles/visualization" className="text-yellow-400 font-semibold">Read More →</Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-700 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-4">Deep Learning Essentials</h4>
              <p className="text-gray-300 mb-4">Dive into neural networks, TensorFlow, and PyTorch applications.</p>
              <Link to="/articles/deep-learning" className="text-yellow-400 font-semibold">Read More →</Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<BlogHome />} />
          <Route path="articles/ml" element={<ArticlePage title="Introduction to Machine Learning" content="Full content of ML article goes here." />} />
          <Route path="articles/visualization" element={<ArticlePage title="Data Visualization with Python" content="Full content of Visualization article goes here." />} />
          <Route path="articles/deep-learning" element={<ArticlePage title="Deep Learning Essentials" content="Full content of Deep Learning article goes here." />} />
        </Route>
      </Routes>
    </Router>
  );
}
