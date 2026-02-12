"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: (string | undefined | null | false)[]) {
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

// --- Data ---
const features = [
  {
    id: 1,
    title: "Farm-to-Shelf Freshness",
    description:
      "We partner directly with local farms in Al-Qassim and Al-Ahsa. Your vegetables arrive at our store within 24 hours of harvest, ensuring peak nutrition and taste.",
  },
  {
    id: 2,
    title: "Exclusive Global Imports",
    description:
      "Craving authentic flavors? We stock over 500+ exclusive international brands from Europe, Asia, and the Americas that you won't find anywhere else in the Kingdom.",
  },
  {
    id: 3,
    title: "Express Riyadh Delivery",
    description:
      "Order before 2 PM and enjoy same-day delivery across Riyadh. Our temperature-controlled fleet ensures your frozen goods stay frozen and greens stay crisp.",
  },
];

export default function WhyUsSection() {
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const ref = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(ref, "-100px");

  return (
    <section
      ref={ref}
      className="w-full bg-white py-16 md:py-24 overflow-hidden border-t-2 border-black font-sans relative"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-[#bce201] border-2 border-black text-xs font-bold tracking-widest uppercase shadow-[4px_4px_0px_0px_#bce201] transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <Star size={14} className="fill-[#bce201]" /> Why Choose Zendo?
          </div>

          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-black text-black uppercase leading-[0.95] tracking-tight transition-all duration-700 delay-100",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            Redefining <br className="hidden md:block" />
            <span className="relative inline-block px-2">
              The Supermarket
              <span className="absolute bottom-2 left-0 w-full h-4 bg-[#bce201] -z-10 opacity-60 transform -skew-x-12" />
            </span>
          </h2>

          <p
            className={cn(
              "text-gray-600 text-lg font-medium leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            More than just a grocery store. Zendo is a community hub connecting
            Saudi families with the finest local produce and global treasures.
          </p>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Image */}
          <div
            className={cn(
              "relative group transition-all duration-1000 ease-out delay-300",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full overflow-hidden rounded-xl border-2 border-black shadow-[12px_12px_0px_0px_#000]">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
                alt="Zendo Fresh Produce Aisle"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-[#bce201] text-black border-2 border-black px-4 py-3 rounded-lg font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#000]">
                Since 2010
              </div>
            </div>

            {/* Decorative Element behind */}
            <div className="absolute -z-10 top-6 -right-6 w-full h-full border-2 border-black rounded-xl bg-[#bce201] hidden md:block" />
          </div>

          {/* Right Column: Accordion Features */}
          <div className="space-y-6 pt-4">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={cn(
                  "transition-all duration-700 ease-out",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12"
                )}
                style={{ transitionDelay: `${index * 150 + 300}ms` }}
              >
                <button
                  onClick={() => setActiveFeature(feature.id)}
                  className={cn(
                    "w-full text-left group relative border-2 border-black rounded-xl overflow-hidden transition-all duration-300",
                    activeFeature === feature.id
                      ? "bg-black text-white shadow-[8px_8px_0px_0px_#bce201] -translate-y-1"
                      : "bg-white text-black hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1"
                  )}
                >
                  <div className="p-6 flex items-center justify-between">
                    <h3 className="text-xl font-black uppercase tracking-wide flex items-center gap-3">
                      <span
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm transition-colors",
                          activeFeature === feature.id
                            ? "border-[#bce201] text-[#bce201]"
                            : "border-black text-black"
                        )}
                      >
                        {index + 1}
                      </span>
                      {feature.title}
                    </h3>
                    <div
                      className={cn(
                        "p-1 rounded border-2 transition-colors",
                        activeFeature === feature.id
                          ? "border-[#bce201] text-[#bce201]"
                          : "border-black text-black"
                      )}
                    >
                      {activeFeature === feature.id ? (
                        <Minus size={16} />
                      ) : (
                        <Plus size={16} />
                      )}
                    </div>
                  </div>

                  {/* Accordion Content */}
                  <div
                    className={cn(
                      "overflow-hidden transition-[max-height] duration-500 ease-in-out",
                      activeFeature === feature.id ? "max-h-48" : "max-h-0"
                    )}
                  >
                    <div className="px-6 pb-6 pt-0 pl-[4.5rem]">
                      <p
                        className={cn(
                          "text-lg leading-relaxed font-medium",
                          activeFeature === feature.id
                            ? "text-gray-300"
                            : "text-gray-600"
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}

            {/* CTA Button */}
            <div
              className={cn(
                "pt-8 transition-all duration-700 delay-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <button className="w-full sm:w-auto bg-[#bce201] hover:bg-white text-black px-8 py-4 rounded-xl font-bold text-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex items-center justify-center gap-2 group">
                Start Shopping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
