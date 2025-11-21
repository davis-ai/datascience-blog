import { Input } from "../components/ui/input";
import { Button } from "../components/ui/_button";

export default function ContactPage() {
  return (
    <div className="min-h-screen text-gray-900 px-6 py-20 flex items-center justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 bg-gray-800 rounded-2xl p-10">
        {/* LEFT SIDE - Contact Information */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl text-white font-bold mb-6 relative">
              CONTACT
              <div className="w-12 h-1 bg-yellow-500 mt-4"></div>
            </h1>
            <p className="text-gray-300 leading-relaxed mb-8">
              Have a project idea, collaboration, or question? I’d love to hear from you. 
              Feel free to reach out and I’ll get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-200">Office</h3>
              <p className="text-gray-400">
                Nairobi, Kenya — available for remote and local collaborations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-200">Email</h3>
              <p className="text-gray-400">
                <a href="mailto:davisochieng81@gmail.com" className="hover:text-yellow-500">
                  davisochieng81@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-200">Connect</h3>
              <p className="text-gray-400">
                <a
                  href="https://linkedin.com/in/davis-ochieng-621885387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500 transition-colors"
                >
                  LinkedIn
                </a>{" "}
                |{" "}
                <a
                  href="https://twitter.com/davis_ochieng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500 transition-colors"
                >
                  Twitter / X
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Contact Form */}
        <div className="space-y-8">
          <h2 className="text-2xl text-white font-bold relative">
            GET IN TOUCH
            <div className="w-12 h-1 bg-yellow-500 mt-3"></div>
          </h2>

          <form className="space-y-6">
            {/* Name - Two inputs side by side */}
            <div>
              <label className="text-sm font-semibold text-gray-100 mb-2 block">
                Name
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="bg-transparent text-gray-300 border-0 border-b-2 border-gray-600 rounded-none px-0 focus:border-yellow-500 focus:ring-0 transition-colors"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="bg-transparent text-gray-300 border-0 border-b-2 border-gray-600 rounded-none px-0 focus:border-yellow-500 focus:ring-0 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-100 mb-2 block">
                Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent text-gray-300 border-0 border-b-2 border-gray-600 rounded-none px-0 focus:border-yellow-500 focus:ring-0 transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-semibold text-gray-100 mb-2 block">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+254 700 000 000"
                className="bg-transparent text-gray-300 border-0 border-b-2 border-gray-600 rounded-none px-0 focus:border-yellow-500 focus:ring-0 transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold text-gray-100 mb-2 block">
                Message
              </label>
              <Input
                type="text"
                placeholder="Write your message..."
                className="bg-transparent text-gray-300 border-0 border-b-2 border-gray-600 rounded-none px-0 focus:border-yellow-500 focus:ring-0 transition-colors"
              />
            </div>

            {/* Send Message Button */}
            <Button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 font-semibold hover:bg-yellow-600 transition-colors rounded-md py-3 mt-6"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
