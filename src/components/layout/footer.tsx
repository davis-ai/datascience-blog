import { Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <div>
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