import { Outlet, NavLink } from "react-router-dom";
import { Linkedin, Twitter, Github } from "lucide-react";

export default function Layout() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-yellow-400 font-semibold"
      : "hover:text-yellow-400";

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6 max-w-6xl mx-auto fixed top-0 left-0 right-0 bg-gray-900 z-50 shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-400">DS Blog</h1>
        <nav className="space-x-6 hidden md:flex">
          <NavLink to="/" end className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/articles" className={linkClasses}>
            Articles
          </NavLink>
          <NavLink to="/about" className={linkClasses}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClasses}>
            Contact
          </NavLink>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 max-w-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-10 text-center border-t border-gray-700">
        <h4 className="text-lg font-semibold mb-4">Connect with Me</h4>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-yellow-400"><Linkedin /></a>
          <a href="#" className="hover:text-yellow-400"><Twitter /></a>
          <a href="#" className="hover:text-yellow-400"><Github /></a>
        </div>
        <p className="text-gray-500">
          © {new Date().getFullYear()} Davis Ochieng. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
