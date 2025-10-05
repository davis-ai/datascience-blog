import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-gray-100 px-6 py-20 flex items-center justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 bg-[#141416] rounded-2xl p-10 shadow-2xl">
        {/* LEFT SIDE - Contact Information */}
        <div className="space-y-10">
          <div>
            <h1 className="text-5xl font-extrabold mb-6 tracking-wide text-yellow-400 uppercase">
              Contact
            </h1>
            <p className="text-gray-400 leading-relaxed mb-8">
              Feel free to reach out with questions, collaborations, or
              opportunities. I’m always open to new ideas and conversations
              about data, AI, and innovation.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-3">
                Address
              </h3>
              <p className="text-gray-400">
                123 Data Street, AI District, Nairobi, Kenya
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-3">
                Phone
              </h3>
              <p className="text-gray-400">+254 700 123 456</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-3">
                Email
              </h3>
              <a
                href="mailto:davisochieng1@gmail.com"
                className="text-yellow-400 hover:underline"
              >
                davisochieng1@gmail.com
              </a>
            </div>

            <div className="flex space-x-4 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                className="hover:text-yellow-400 transition-colors"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-yellow-400 transition-colors"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                className="hover:text-yellow-400 transition-colors"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Contact Form */}
        <div className="bg-[#1A1A1D] rounded-xl shadow-lg p-8 md:p-10 space-y-8">
          <h2 className="text-2xl font-bold text-yellow-400 uppercase tracking-wider">
            Get In Touch
          </h2>

          <form className="space-y-6">
            {/* Name Fields */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Name
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="bg-transparent border-0 border-b border-gray-600 rounded-none px-0 focus:border-yellow-400 focus:ring-0 transition-colors text-gray-200 placeholder-gray-500"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="bg-transparent border-0 border-b border-gray-600 rounded-none px-0 focus:border-yellow-400 focus:ring-0 transition-colors text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent border-0 border-b border-gray-600 rounded-none px-0 focus:border-yellow-400 focus:ring-0 transition-colors text-gray-200 placeholder-gray-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+254..."
                className="bg-transparent border-0 border-b border-gray-600 rounded-none px-0 focus:border-yellow-400 focus:ring-0 transition-colors text-gray-200 placeholder-gray-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full bg-transparent border-0 border-b border-gray-600 rounded-none px-0 py-2 focus:border-yellow-400 focus:ring-0 transition-colors text-gray-200 placeholder-gray-500"
              ></textarea>
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition-all rounded-md py-3 mt-6 shadow-md"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
