"use client";

import React from "react";
import { Send, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Inline SVG icons from your request (Preserved)
const Icons = {
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Linkedin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  ),
  Whatsapp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  ),
};

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function SocialLink({ href, label, icon: Icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group relative flex items-center justify-center w-10 h-10 bg-white border-2 border-black rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#bce201]"
    >
      <Icon className="w-5 h-5 text-black transition-transform duration-200 group-hover:scale-110" />
    </a>
  );
}


export default function Footer() {
  const [year, setYear] = React.useState("");

  React.useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="w-full bg-white text-black border-t-2 border-black font-sans relative overflow-hidden">
      {/* Decorative Pattern Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Top Banner: Newsletter */}
      <div className="border-b-2 border-black bg-[#bce201]/10">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                Don&#39;t Miss the{" "}
                <span className="inline-block relative">
                  Freshness
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#bce201] -z-10 opacity-60"></span>
                </span>
              </h3>
              <p className="text-gray-700 font-medium max-w-md">
                Subscribe to Zendo B2B updates. Get exclusive deals on bulk
                dates and imported goods directly to your inbox.
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md lg:ml-auto w-full relative z-10">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 px-4 py-3 border-2 border-black rounded-lg font-bold placeholder:font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-white"
              />
              <button
                type="button"
                className="px-6 py-3 bg-black text-white font-bold rounded-lg border-2 border-black hover:bg-[#bce201] hover:text-black hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                Subscribe <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* 1. Brand Section */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Image src="/logo.png" alt="Zendo Market Logo" width={120} height={50} />
            </Link>

            <p className="text-base text-gray-600 font-medium leading-relaxed max-w-sm">
              Leading B2B Hypermarket Solutions in Saudi Arabia. We connect
              businesses with authentic local produce and seamless global supply
              chains.
            </p>

            <div className="flex gap-3">
              <SocialLink href="#" label="Instagram" icon={Icons.Instagram} />
              <SocialLink href="#" label="Twitter" icon={Icons.Twitter} />
              <SocialLink href="#" label="LinkedIn" icon={Icons.Linkedin} />
              <SocialLink href="#" label="WhatsApp" icon={Icons.Whatsapp} />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-black text-lg uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-3">
              {["Home", "Shop", "Fresh Dates", "About Us", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="group flex items-center text-gray-600 hover:text-black font-bold transition-colors w-fit"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#bce201]" />
                    {item}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* 3. Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-black text-lg uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#bce201] rounded border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-bold">Headquarters</p>
                  <p className="text-gray-600 text-sm">
                    King Fahd Road, Olaya District
                    <br />
                    Riyadh 12214, Saudi Arabia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#bce201] rounded border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-bold">Email Us</p>
                  <a
                    href="mailto:info@zendo.com"
                    className="text-gray-600 text-sm hover:underline hover:text-[#bce201] transition-colors"
                  >
                    info@zendohypermarket.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#bce201] rounded border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-bold">Call Support</p>
                  <a
                    href="tel:+96612345678"
                    className="text-gray-600 text-sm hover:underline hover:text-[#bce201] transition-colors"
                  >
                    +966 12 345 6789
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t-2 border-black/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <p>© {year} Zendo Hypermarket B2B. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
