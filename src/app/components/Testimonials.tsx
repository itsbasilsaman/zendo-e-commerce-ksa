"use client";

import React, { useState } from "react";
import { Quote, Star, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

// --- Data: Zendo Market Reviews ---
const testimonials = [
  {
    id: 1,
    quote:
      "The fresh dates section is absolutely unmatched in Riyadh. The quality of the Sukari dates is just perfect every single time.",
    name: "Ahmed Al-Sayed",
    handle: "@ahmed_eats",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 2,
    quote:
      "Finally, a supermarket that actually understands 'fresh'. The vegetables look like they were picked an hour ago. Zendo is my go-to.",
    name: "Sarah Jenkins",
    handle: "@sarah.j_lifestyle",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 3,
    quote:
      "Great prices on imported goods. I found all the spices I needed for my restaurant here. Highly recommended for bulk buying.",
    name: "Chef Omar",
    handle: "@chef_omar_k",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 4,
    quote:
      "The staff is incredibly helpful and the aisles are wide and clean. Shopping here is actually a relaxing experience.",
    name: "Layla Hassan",
    handle: "@layla_designs",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 5,
    quote:
      "Zendo's bakery is a hidden gem. Their fresh samoon bread in the morning is the best way to start the day.",
    name: "Fahad Al-Otaibi",
    handle: "@fahad_fitness",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
  },
];

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate array for seamless infinite loop
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden font-sans relative border-t-2 border-black">
      {/* CSS for Animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scroll 40s linear infinite;
        }
        .paused {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-4 mb-12 text-center relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-[#bce201] text-black border-2 border-black text-xs font-bold tracking-widest uppercase mb-4 shadow-[4px_4px_0px_0px_#000]">
          Community Love
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter">
          Trusted by Families <br /> Across the Kingdom
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 md:w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 md:w-32 bg-gradient-to-l from-white to-transparent" />

        <div
          className={cn(
            "flex gap-6 md:gap-8 w-max px-4",
            "animate-marquee",
            isPaused && "paused"
          )}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {doubledTestimonials.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={cn(
                "group relative flex flex-col justify-between",
                "w-[300px] md:w-[400px] p-6 md:p-8",
                "bg-white border-2 border-black rounded-xl",
                "shadow-[6px_6px_0px_0px_#bce201]", // Hard lime shadow
                "transition-all duration-300 ease-out",
                "hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#bce201]" // Pop effect
              )}
            >
              {/* Quote Icon */}
              <div className="mb-6 relative">
                <div className="absolute -top-4 -left-2 text-[#bce201] opacity-20 transform -scale-x-100">
                  <Quote size={60} fill="currentColor" stroke="none" />
                </div>
                <Quote size={32} className="text-black relative z-10" />
              </div>

              {/* Quote Text */}
              <blockquote className="flex-grow mb-6 relative z-10">
                <p className="text-lg font-medium text-gray-800 leading-relaxed">
                  &ldquo;{item.quote}&ldquo;
                </p>
              </blockquote>

              {/* Footer: Author & Rating */}
              <div className="flex items-center justify-between border-t-2 border-black/5 pt-4 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-black leading-none">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold mt-1">
                      {item.handle}
                    </span>
                  </div>
                </div>

                <div className="flex gap-0.5 text-[#bce201]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="currentColor"
                      stroke="black"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
              </div>

              {/* Verified Badge */}
              <div className="absolute top-4 right-4 text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                <CheckCircle2 size={10} /> Verified
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
