import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaMapMarkerAlt, FaGlobe, FaBuilding, FaPhoneAlt } from 'react-icons/fa';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("support");

  const tabs = [
    { id: "support", label: "Support" },
    { id: "general", label: "General Inquiries" },
    { id: "press", label: "Press & Media" },
    { id: "careers", label: "Careers" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-24 font-sans">

      {/* HEADER SECTION - Outside the card */}
      <div className="absolute top-28 text-center w-full z-10 pointer-events-none">
        <h6 className="text-yellow-500 tracking-widest uppercase text-xs font-bold mb-2">Contacts</h6>
        <p className="text-gray-400 text-sm">Compact and perfect contact form. Easy to switch between issues.</p>
      </div>

      {/* OUTER CARD */}
      <div className="relative max-w-7xl w-full bg-gray-900/50 backdrop-blur-md border border-gray-800 shadow-2xl rounded-sm overflow-hidden flex flex-col md:grid md:grid-cols-12 mt-12 min-h-[700px]">

        {/* LEFT SIDEBAR */}
        <div className="md:col-span-4 p-12 flex flex-col justify-between border-r border-gray-800 bg-gray-900/60 relative">

          {/* LOGO AREA */}
          <div>
            <h2 className="text-xl font-bold text-white tracking-widest mb-1 flex items-center gap-2">
              <FaBuilding className="text-yellow-500" /> DAVIS STUDIO
            </h2>
            <div className="w-8 h-1 bg-yellow-500 mb-12"></div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-yellow-500" /> Nairobi Studio
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Westlands, Nairobi<br />
                  Kenya
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                  <FaPhoneAlt className="text-yellow-500" /> Phone
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  +254 700 000 000<br />
                  Mon-Fri, 9am - 5pm
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                  <FaGlobe className="text-yellow-500" /> Remote Hub
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Available for global<br />
                  Remote collaborations
                </p>
              </div>
            </div>
          </div>

          {/* FOOTER LINKS */}
          <div className="mt-12 flex gap-4 text-[10px] uppercase tracking-wider text-gray-500">
            <a href="#" className="hover:text-yellow-500 transition-colors">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-yellow-500 transition-colors">Privacy Policy</a>
          </div>

          {/* DECORATIVE ELEMENT */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500/20 to-transparent"></div>
        </div>

        {/* RIGHT CONTENT - TABS & FORM */}
        <div className="md:col-span-8 p-12 bg-gray-800/20">

          {/* TABS HEADER */}
          <div className="flex border-b border-gray-700 mb-10 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "mr-8 pb-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-yellow-500 border-yellow-500"
                    : "text-gray-500 border-transparent hover:text-gray-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* FORM AREA */}
          {activeTab === "support" && (
            <form className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1 group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Full Name</label>
                  <Input
                    placeholder="Davis Ochieng"
                    className="bg-transparent border-input border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm h-11 text-gray-200 placeholder:text-gray-600 transition-colors"
                  />
                </div>
                <div className="space-y-1 group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Email</label>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    className="bg-transparent border-input border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm h-11 text-gray-200 placeholder:text-gray-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1 group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Service</label>
                  <Select>
                    <SelectTrigger className="bg-transparent border-gray-700 focus:ring-0 focus:border-yellow-500 rounded-sm h-11 text-gray-200 data-[placeholder]:text-gray-600">
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                      <SelectItem value="web-dev">Web Development</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="design">UI/UX Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Budget</label>
                  <Select>
                    <SelectTrigger className="bg-transparent border-gray-700 focus:ring-0 focus:border-yellow-500 rounded-sm h-11 text-gray-200 data-[placeholder]:text-gray-600">
                      <SelectValue placeholder="Select Range" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                      <SelectItem value="low">&lt; $1k</SelectItem>
                      <SelectItem value="medium">$1k - $5k</SelectItem>
                      <SelectItem value="high">5k - $10k</SelectItem>
                      <SelectItem value="enterprise">10k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1 group">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">How can we help you?</label>
                <Textarea
                  className="bg-transparent border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm min-h-[120px] resize-none text-gray-200"
                />
              </div>

              <div className="flex justify-between items-center pt-6">
                <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">F.A.Q.</a>
                <Button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 h-10 rounded-sm uppercase tracking-wider text-xs transition-transform active:scale-95"
                >
                  Submit Request
                </Button>
              </div>
            </form>
          )}

          {activeTab === "general" && (
            <form className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Subject</label>
                <Input
                  placeholder="General Inquiry"
                  className="bg-transparent border-input border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm h-11 text-gray-200 placeholder:text-gray-600 transition-colors"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1 group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Full Name</label>
                  <Input
                    placeholder="Your Name"
                    className="bg-transparent border-input border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm h-11 text-gray-200 placeholder:text-gray-600 transition-colors"
                  />
                </div>
                <div className="space-y-1 group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Email</label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    className="bg-transparent border-input border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm h-11 text-gray-200 placeholder:text-gray-600 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Message</label>
                <Textarea
                  className="bg-transparent border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm min-h-[150px] resize-none text-gray-200"
                  placeholder="How can we help?"
                />
              </div>
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 h-10 rounded-sm uppercase tracking-wider text-xs transition-transform active:scale-95"
                >
                  Send Message
                </Button>
              </div>
            </form>
          )}

          {activeTab === "press" && (
            <form className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1 group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Media Organization</label>
                  <Input
                    placeholder="Company / Publication"
                    className="bg-transparent border-input border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm h-11 text-gray-200 placeholder:text-gray-600 transition-colors"
                  />
                </div>
                <div className="space-y-1 group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Contact Person</label>
                  <Input
                    placeholder="Full Name"
                    className="bg-transparent border-input border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm h-11 text-gray-200 placeholder:text-gray-600 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Topic</label>
                <Select>
                  <SelectTrigger className="bg-transparent border-gray-700 focus:ring-0 focus:border-yellow-500 rounded-sm h-11 text-gray-200 data-[placeholder]:text-gray-600">
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectItem value="interview">Interview Request</SelectItem>
                    <SelectItem value="press-release">Press Release</SelectItem>
                    <SelectItem value="partnership">Media Partnership</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Details</label>
                <Textarea
                  className="bg-transparent border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm min-h-[150px] resize-none text-gray-200"
                />
              </div>
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 h-10 rounded-sm uppercase tracking-wider text-xs transition-transform active:scale-95"
                >
                  Submit Request
                </Button>
              </div>
            </form>
          )}

          {activeTab === "careers" && (
            <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Available for Hire</h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  I am currently open to new opportunities in Software Engineering and Data Science.
                  If you think I'd be a good fit for your team, please get in touch.
                </p>

                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-1 group">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Company Name</label>
                      <Input
                        placeholder="Company Name"
                        className="bg-transparent border-input border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm h-11 text-gray-200 placeholder:text-gray-600 transition-colors"
                      />
                    </div>
                    <div className="space-y-1 group">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Role</label>
                      <Input
                        placeholder="Role Title"
                        className="bg-transparent border-input border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm h-11 text-gray-200 placeholder:text-gray-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 group">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Job Type</label>
                    <Select>
                      <SelectTrigger className="bg-transparent border-gray-700 focus:ring-0 focus:border-yellow-500 rounded-sm h-11 text-gray-200 data-[placeholder]:text-gray-600">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 group">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-yellow-500 transition-colors">Description</label>
                    <Textarea
                      placeholder="Job Description / Details"
                      className="bg-transparent border-gray-700 focus-visible:ring-0 focus-visible:border-yellow-500 rounded-sm min-h-[150px] resize-none text-gray-200"
                    />
                  </div>
                  <div className="flex justify-end pt-6">
                    <Button
                      type="submit"
                      className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 h-10 rounded-sm uppercase tracking-wider text-xs transition-transform active:scale-95"
                    >
                      Send Inquiry
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
