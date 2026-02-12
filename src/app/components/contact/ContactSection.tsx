/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Instagram, Heart, MessageCircle } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// --- Hook for Scroll Animation ---
function useOnScreen(ref: any, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

// --- Data ---
const socialImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
    alt: "Zendo Cafe Latte Art",
    likes: "2.4k",
    comments: "142",
    caption: "Morning brew at Zendo Cafe ☕️ #RiyadhMorning",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=1000&auto=format&fit=crop",
    alt: "Fresh Bakery Items",
    likes: "1.8k",
    comments: "98",
    caption: "Fresh from the oven! 🥐 #ZendoBakery",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1553530979-7ee52a2670c4?q=80&w=1000&auto=format&fit=crop",
    alt: "Iced Matcha Latte",
    likes: "3.1k",
    comments: "215",
    caption: "Beat the heat with our Iced Matcha 🍵 #ZendoFresh",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, "-100px");

  // Duplicate images multiple times to ensure seamless infinite scrolling on wider screens
  // We create a long list so the animation loop is smooth
  const loopImages = [
    ...socialImages,
    ...socialImages,
    ...socialImages,
    ...socialImages,
  ];

  return (
    <section
      ref={ref}
      className="w-full bg-white py-16 md:py-24 overflow-hidden border-t-2 border-black relative"
    >
      {/* --- CSS for Infinite Scroll Animation --- */}
      <style>{`
        @keyframes social-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-social-scroll {
          animation: social-scroll 40s linear infinite;
        }
        /* Pause animation on hover for better UX */
        .animate-social-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#bce201] rounded-full blur-[100px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* --- Left Column: Text --- */}
          <div
            className={cn(
              "w-full lg:w-1/3 space-y-8 text-center lg:text-left transition-all duration-1000 ease-out",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-[#bce201] border-2 border-black text-xs font-bold tracking-widest uppercase shadow-[4px_4px_0px_0px_#bce201]">
                <Instagram size={14} /> @ZendoMarket
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black uppercase leading-[0.9]">
                Capture The <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bce201] to-black">
                  Moment
                </span>
              </h2>
            </div>

            <p className="text-gray-600 text-lg font-medium leading-relaxed">
              Join our community of food lovers! Tag us in your daily grocery
              hauls, cafe moments, and culinary creations for a chance to be
              featured.
            </p>

            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#bce201] text-black font-bold text-lg rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
              Follow Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* --- Right Column: Images Marquee --- */}
          <div
            className={cn(
              "w-full lg:w-2/3 overflow-hidden relative",
              "transition-opacity duration-1000",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Fade Gradients for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />

            {/* Animated Container */}
            <div className="flex gap-6 w-max animate-social-scroll px-4 py-4">
              {loopImages.map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className="relative flex-shrink-0 w-[280px] sm:w-[320px] group"
                >
                  {/* Card Wrapper (Polaroid Style) */}
                  <div className="bg-white p-3 pb-4 border-2 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] group-hover:shadow-[10px_10px_0px_0px_#bce201] group-hover:-translate-y-2 transition-all duration-300">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-black mb-3 bg-gray-100">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2">
                        <Instagram size={32} />
                        <span className="font-bold text-sm tracking-wider">
                          View Post
                        </span>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex justify-between items-center px-1">
                      <div className="flex gap-3 text-xs font-bold text-gray-500">
                        <span className="flex items-center gap-1 group-hover:text-red-500 transition-colors">
                          <Heart size={14} className="fill-current" />{" "}
                          {image.likes}
                        </span>
                        <span className="flex items-center gap-1 group-hover:text-[#bce201] transition-colors">
                          <MessageCircle size={14} className="fill-current" />{" "}
                          {image.comments}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-xs font-medium text-black line-clamp-1 px-1">
                      {image.caption}
                    </p>
                  </div>

                  {/* Cute Pin/Tape Effect */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#bce201] border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotate-3 shadow-sm z-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
