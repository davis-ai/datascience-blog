import { Input } from "@/components/ui/input";
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
              <div className="w-12 h-1 bg-blue-400 mt-4"></div>
            </h1>
            <p className="text-white leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              quisque lacinia eu ut laoreet dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Adderit</h3>
              <p className="text-gray-600">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Pilora</h3>
              <p className="text-gray-600">Av. et seq. 30-31/24</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Email</h3>
              <p className="text-gray-600">info@contactsdeputum</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Contact Form */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold relative">
            GET IN TOUCH
            <div className="w-12 h-1 bg-blue-600 mt-3"></div>
          </h2>

          <form className="space-y-6">
            {/* Name - Two inputs side by side */}
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-2 block">
                Name
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 focus:border-blue-600 focus:ring-0 transition-colors"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 focus:border-blue-600 focus:ring-0 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-2 block">
                Email
              </label>
              <Input
                type="email"
                className="bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 focus:border-blue-600 focus:ring-0 transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-2 block">
                Phone number
              </label>
              <Input
                type="tel"
                className="bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 focus:border-blue-600 focus:ring-0 transition-colors"
              />
            </div>

            {/* Manager */}
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-2 block">
                Manager
              </label>
              <Input
                type="text"
                className="bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 focus:border-blue-600 focus:ring-0 transition-colors"
              />
            </div>

            {/* Send Message Button */}
            <Button
              type="submit" 
              className="w-full"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}