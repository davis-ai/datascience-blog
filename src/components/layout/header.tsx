
import { Outlet, Link } from "react-router-dom";

export default function Header() {
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
    </div>);
};



