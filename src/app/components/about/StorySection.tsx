"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Clock, Star, Award, Leaf, Users } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

// --- Hook for Scroll Animation (Reused for consistency) ---
function useOnScreen(
  ref: React.RefObject<HTMLElement | null>,
  rootMargin: string = "0px"
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
    // Fix: use a variable for cleanup
    const current = ref.current;
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

export default function StorySection() {
  const ref = useRef<HTMLElement | null>(null);
  const isVisible = useOnScreen(ref, "-100px");

  return (
    <section
      ref={ref}
      className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-white text-black"
    >
      {/* Decorative Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px]" />

      <div className="container max-w-8xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- Image Column --- */}
          <div
            className={cn(
              "relative group transition-all duration-1000 ease-out",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            {/* Main Image Card */}
            <div className="relative z-10 bg-white border-2 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_#bce201]">
              <div className="aspect-4/3 relative overflow-hidden">
                {/* Placeholder Image - Replace src with your actual image */}
                <img
                  src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Matcha pastry"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            </div>

            {/* Floating "Rating" Badge */}
            <div
              className={cn(
                "absolute -bottom-6 -right-4 md:-right-8 bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 max-w-[220px] flex items-center gap-4 transition-all duration-700 delay-300",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <div className="bg-[#bce201] p-3 rounded-lg border-2 border-black shrink-0">
                <Star className="w-6 h-6 text-black fill-black" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                  Customer Rating
                </p>
                <p className="text-lg font-black">4.9/5.0</p>
              </div>
            </div>

            {/* Decorative Element behind */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-black/10 rounded-xl -z-10 hidden md:block" />
          </div>

          {/* --- Text Column --- */}
          <div className="flex flex-col justify-center space-y-8 md:pl-8 pt-8 lg:pt-0">
            {/* Label */}
            <div
              className={cn(
                "transition-all duration-700 delay-100",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-[#bce201] text-xs font-bold tracking-widest uppercase border-2 border-transparent hover:border-[#bce201] transition-colors cursor-default">
                <Leaf size={12} />
                Our Story
              </span>
            </div>

            {/* Heading */}
            <h2
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] transition-all duration-700 delay-200",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              It started <br className="hidden lg:block" />
              <span className="relative inline-block px-2">
                <span className="relative z-10">4 years ago</span>
                {/* Highlight Effect */}
                <span className="absolute inset-0 bg-[#bce201] h-1/2 bottom-1 z-0 opacity-60 transform -skew-x-12 translate-y-1"></span>
              </span>
            </h2>

            {/* Paragraph */}
            <p
              className={cn(
                "text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg font-medium border-l-4 border-[#bce201] pl-6 transition-all duration-700 delay-300",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              We began with a simple mission: to bring authentic flavors to your
              table. Every pastry, every loaf is crafted with passion, using
              only the finest natural ingredients sourced directly from local
              farmers.
            </p>

            {/* Buttons */}
            <div
              className={cn(
                "flex flex-col sm:flex-row gap-4 pt-2 transition-all duration-700 delay-400",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <button className="group relative px-8 py-4 bg-black text-white font-bold text-lg rounded-lg overflow-hidden shadow-[4px_4px_0px_0px_#bce201] hover:shadow-[2px_2px_0px_0px_#bce201] hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                <span className="relative z-10 flex items-center gap-2">
                  Order Now{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="px-8 py-4 bg-white text-black border-2 border-black font-bold text-lg rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                Full History
              </button>
            </div>

            {/* Stats Row */}
            <div
              className={cn(
                "grid grid-cols-3 gap-4 mt-8 pt-8 border-t-2 border-dashed border-black/20 transition-all duration-700 delay-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#bce201] mb-1">
                  <Users size={16} className="text-black" />
                </div>
                <p className="text-3xl font-black tracking-tight">15k+</p>
                <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                  Orders Served
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#bce201] mb-1">
                  <Leaf size={16} className="text-black" />
                </div>
                <p className="text-3xl font-black tracking-tight">100%</p>
                <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                  Natural
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#bce201] mb-1">
                  <Award size={16} className="text-black" />
                </div>
                <p className="text-3xl font-black tracking-tight">25+</p>
                <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                  Awards Won
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
