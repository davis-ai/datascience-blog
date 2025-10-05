export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Contact</h2>
      <p className="text-gray-300 text-lg leading-relaxed mb-4">
        Have questions or ideas? Reach out to me!
      </p>
      <ul className="text-gray-400 space-y-2">
        <li>Email: <a href="mailto:davisochieng1@gmail.com" className="text-yellow-400 hover:underline">davisochieng81@gmail.com</a></li>
        <li>Twitter / X: <a href="https://twitter.com" target="_blank" className="text-yellow-400 hover:underline">@davis</a></li>
        <li>LinkedIn: <a href="https://linkedin.https://www.linkedin.com/in/davis-ochieng-621885387/" target="_blank" className="text-yellow-400 hover:underline">DS Blog</a></li>
      </ul>
    </div>
  );
}
