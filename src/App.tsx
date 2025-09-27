import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import HomePage from "./pages/home";
import ArticlePage from "./pages/articles"; 




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}> 
          <Route index element={<HomePage />} />
          <Route path="articles/ml" element={<ArticlePage title="Introduction to Machine Learning" content="Full content of ML article goes here." />} />
          <Route path="articles/visualization" element={<ArticlePage title="Data Visualization with Python" content="Full content of Visualization article goes here." />} />
          <Route path="articles/deep-learning" element={<ArticlePage title="Deep Learning Essentials" content="Full content of Deep Learning article goes here." />} />
           <Route path="/" element={<Footer />} /> 
        </Route>
       
      </Routes>
    </Router>
  );
}
