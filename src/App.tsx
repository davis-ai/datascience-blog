import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./pages/home";
import ArticlePage from "./pages/articles";
import ArticlesListPage from "./pages/articles/list";
import ProjectsPage from "./pages/projects";
import PlaygroundPage from "./pages/playground";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="articles" element={<ArticlesListPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
