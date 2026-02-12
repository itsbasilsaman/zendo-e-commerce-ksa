"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

// --- Hook for Scroll Animation ---
function useOnScreen(
  ref: React.RefObject<HTMLElement | null>,
  rootMargin = "0px"
) {
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

export default function AboutBanner() {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(ref, "-100px");

  return (
    <section
      ref={ref}
      className="w-full bg-white py-16 md:py-24 overflow-hidden text-black relative font-sans"
    >
      {/* Abstract decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#bce201] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto max-w-8xl relative z-10">
        {/* --- Text Content --- */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20 max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-black bg-[#bce201] shadow-[4px_4px_0px_0px_#000] transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <MapPin size={14} className="stroke-[3]" />
            <span className="text-sm font-bold uppercase tracking-wider">
              Serving Saudi Arabia Since 2010
            </span>
          </div>

          {/* Heading */}
          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight transition-all duration-700 delay-100",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            Zendo Market: <br />
            <span className="relative inline-block px-2">
              The Kingdom&#39;s
              <svg
                className="absolute w-full h-4 bottom-1 left-0 text-[#bce201] -z-10 opacity-80"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>
            Freshest Choice
          </h2>

          {/* Description */}
          <p
            className={cn(
              "text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl font-medium transition-all duration-700 delay-200",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            From the finest dates of Al-Qassim to daily fresh produce sourced
            directly from local farms. Zendo brings quality, affordability, and
            community spirit to every aisle.
          </p>

          {/* CTA Button */}
          <div
            className={cn(
              "pt-4 transition-all duration-700 delay-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <button className="group relative bg-black text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-black transition-all shadow-[6px_6px_0px_0px_#bce201] hover:shadow-[2px_2px_0px_0px_#bce201] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex items-center gap-3 overflow-hidden">
              <span className="relative z-10">Visit Our Branches</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* --- Image Grid --- */}
        {/* We use a grid that shifts layout on desktop for a dynamic look */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Image 1: Large Feature (Produce) */}
          <div
            className={cn(
              "col-span-1 md:col-span-7 relative h-[300px] md:h-[400px] rounded-xl border-2 border-black overflow-hidden shadow-[8px_8px_0px_0px_#bce201] group transition-all duration-700 delay-300",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
              alt="Fresh Produce Section"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 bg-black text-white px-4 py-2 rounded-tr-xl font-bold text-sm flex items-center gap-2 border-t-2 border-r-2 border-black">
              <ShieldCheck size={16} className="text-[#bce201]" /> Fresh Daily
            </div>
          </div>

          {/* Image 2: Tall Feature (Dates/Spices) */}
          <div
            className={cn(
              "col-span-1 md:col-span-5 relative h-[300px] md:h-[400px] rounded-xl border-2 border-black overflow-hidden shadow-[8px_8px_0px_0px_#000] group transition-all duration-700 delay-400",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <img
              src="https://i.pinimg.com/originals/52/1c/8e/521c8e782e15ac062816229e9e390f68.jpg"
              alt="Spices and Dates"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-[#bce201] text-black border-2 border-black px-3 py-1 rounded-lg font-bold text-xs shadow-sm rotate-3">
              Premium Quality
            </div>
          </div>

          {/* Image 3: Wide Feature (Aisles) */}
          <div
            className={cn(
              "col-span-1 md:col-span-12 relative h-[250px] md:h-[350px] rounded-xl border-2 border-black overflow-hidden shadow-[8px_8px_0px_0px_#bce201] group transition-all duration-700 delay-500",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            )}
          >
            <img
              src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1000&auto=format&fit=crop"
              alt="Supermarket Aisle"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

            {/* Floating Text over image */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white border-2 border-black p-4 md:p-6 rounded-xl max-w-xs shadow-[4px_4px_0px_0px_#000]">
              <p className="font-black text-lg md:text-xl mb-1">
                Everything You Need
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Household essentials, international brands, and local favorites
                under one roof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
