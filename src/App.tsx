import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Linkedin, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";
import profileSmall from "./profile-optimized-small.jpg";
import profileMedium from "./profile-optimized-medium.jpg";
import profileLarge from "./profile-optimized-large.jpg";




export default function DataScienceBlog() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-yellow-400">DS Blog</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#home" className="hover:text-yellow-400">Home</a>
          <a href="#about" className="hover:text-yellow-400">About</a>
          <a href="#articles" className="hover:text-yellow-400">Articles</a>
          <a href="#contact" className="hover:text-yellow-400">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
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
          {/* Responsive Optimized Profile Image */}
          <picture>
            <source srcSet={profileLarge} media="(min-width: 1024px)" />
            <source srcSet={profileMedium} media="(min-width: 768px)" />
            <img 
              src={profileSmall} 
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
              <a href="#" className="text-yellow-400 font-semibold">Read More →</a>
            </CardContent>
          </Card>

          <Card className="bg-gray-700 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-4">Data Visualization with Python</h4>
              <p className="text-gray-300 mb-4">Explore matplotlib, seaborn, and plotly for storytelling with data.</p>
              <a href="#" className="text-yellow-400 font-semibold">Read More →</a>
            </CardContent>
          </Card>

          <Card className="bg-gray-700 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-4">Deep Learning Essentials</h4>
              <p className="text-gray-300 mb-4">Dive into neural networks, TensorFlow, and PyTorch applications.</p>
              <a href="#" className="text-yellow-400 font-semibold">Read More →</a>
            </CardContent>
          </Card>
        </div>
      </section>

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
