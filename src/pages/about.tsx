import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { FaCode, FaDatabase, FaTools } from "react-icons/fa";
import profileLarge from "../assets/images/profile-optimized-large.jpg";
import profileMedium from "../assets/images/profile-optimized-medium.jpg";
import profileSmall from "../assets/images/profile-optimized-small.jpg";

export default function AboutPage() {
  const skills = [
    {
      category: "Data Science & AI",
      icon: <FaDatabase className="text-yellow-500 text-3xl mb-4" />,
      items: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NLP", "Computer Vision"],
    },
    {
      category: "Web Development",
      icon: <FaCode className="text-yellow-500 text-3xl mb-4" />,
      items: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "GraphQL"],
    },
    {
      category: "Tools & DevOps",
      icon: <FaTools className="text-yellow-500 text-3xl mb-4" />,
      items: ["Git", "Docker", "AWS", "Linux", "CI/CD", "Jupyter", "VS Code"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900 z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Hello, I'm <span className="text-yellow-500">Davis Ochieng</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              Data Scientist & Software Engineer
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I bridge the gap between complex data and intuitive user experiences.
              With a background in Computer Science, I specialize in building intelligent
              applications that leverage machine learning to solve real-world problems.
              Whether it's training a neural network or architecting a scalable web app,
              I am passionate about writing clean, efficient code.
            </p>
            <div className="flex gap-4">
              <Link to="/contact">
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 py-6 rounded-sm uppercase tracking-wider">
                  Get in Touch
                </Button>
              </Link>
              <Link to="/articles">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:border-white px-8 py-6 rounded-sm uppercase tracking-wider bg-transparent">
                  View Work
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-yellow-500 rounded-full blur-3xl opacity-20 transform translate-x-4 translate-y-4"></div>
            <picture>
              <source srcSet={profileLarge} media="(min-width: 1024px)" />
              <source srcSet={profileMedium} media="(min-width: 768px)" />
              <img
                src={profileSmall}
                alt="Davis Ochieng"
                className="rounded-2xl shadow-2xl border border-gray-700 relative z-10 w-full max-w-md mx-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
            </picture>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-16 text-center tracking-wider uppercase text-gray-200"
          >
            Technical Expertise
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800 p-8 rounded-sm border border-gray-700 hover:border-yellow-500/50 transition-colors group"
              >
                {skill.icon}
                <h3 className="text-xl font-bold mb-6 text-gray-200 group-hover:text-yellow-500 transition-colors">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <span key={idx} className="bg-gray-900 text-gray-400 text-xs px-3 py-1 rounded-full border border-gray-700">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience / Journey Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center tracking-wider uppercase text-gray-200">My Journey</h2>

          <div className="space-y-12 border-l border-gray-800 ml-4 pl-8 relative">
            <div className="relative">
              <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-gray-900 bg-yellow-500"></span>
              <h3 className="text-xl font-bold text-white">Senior Software Engineer</h3>
              <p className="text-yellow-500 text-sm mb-4">2023 - Present</p>
              <p className="text-gray-400 leading-relaxed">
                Leading development of scalable web applications and integrating AI models into production environments.
                Focusing on performance optimization and cleaner architecture.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-gray-900 bg-gray-700"></span>
              <h3 className="text-xl font-bold text-white">Data Scientist</h3>
              <p className="text-yellow-500 text-sm mb-4">2021 - 2023</p>
              <p className="text-gray-400 leading-relaxed">
                Developed predictive models for customer behavior analysis.
                Utilized Python and SQL to extract insights from large datasets and built dashboards for stakeholders.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-gray-900 bg-gray-700"></span>
              <h3 className="text-xl font-bold text-white">BSc. Computer Science</h3>
              <p className="text-yellow-500 text-sm mb-4">Graduated 2021</p>
              <p className="text-gray-400 leading-relaxed">
                Focused on Artificial Intelligence and Software Engineering.
                Completed capstone project on Natural Language Processing for local languages.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
