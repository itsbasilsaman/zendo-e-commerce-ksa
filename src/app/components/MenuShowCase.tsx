"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Coffee,
  Milk,
  SprayCan as Spray,
  Package,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux";

// --- Utility ---
function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

// --- Hook for Scroll Animation ---
function useOnScreen(
  ref: React.RefObject<HTMLDivElement | null>,
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

// --- Icon Mapping ---
const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number }>
> = {
  coffee: Coffee,
  beverages: Coffee,
  dairy: Milk,
  milk: Milk,
  cleaning: Spray,
  pantry: Package,
  default: Package,
};

// Helper to get icon based on category name
function getCategoryIcon(
  categoryName: string
): React.ComponentType<{ size?: number; strokeWidth?: number }> {
  const normalized = categoryName.toLowerCase();
  return iconMap[normalized] || iconMap.default;
}

// --- Card Component ---
interface FeatureCardProps {
  feature: {
    id: number | string;
    title: string;
    description: string;
    items: string[];
  };
  index: number;
  showAnimation: boolean;
}

function FeatureCard({ feature, index, showAnimation }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = getCategoryIcon(feature.title);

  return (
    <div
      className={cn(
        "relative h-full transition-all duration-700 ease-out transform",
        showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The Card */}
      <div
        className={cn(
          "h-full flex flex-col relative overflow-hidden",
          "border-2 border-black rounded-xl",
          "bg-[#bce201] text-black", // Your specific color
          "transition-all duration-300 ease-out",
          isHovered
            ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -translate-y-1"
            : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        )}
      >
        {/* Decorative pattern overlay (subtle noise/dots) */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[16px_16px]" />

        <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
          {/* Header: Icon & Title */}
          <div className="flex items-start justify-between mb-6">
            <div className="bg-black text-[#bce201] p-3 rounded-lg border-2 border-transparent group-hover:border-black transition-colors">
              <Icon size={28} strokeWidth={2} />
            </div>
            <div
              className={cn(
                "w-8 h-8 rounded-full border-2 border-black flex items-center justify-center transition-transform duration-300",
                isHovered ? "rotate-45 bg-white" : "bg-transparent"
              )}
            >
              <ArrowRight size={16} />
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3 tracking-tight">
            {feature.title}
          </h3>
          <p className="text-black/80 font-medium leading-relaxed mb-6 grow">
            {feature.description}
          </p>
          <div className="space-y-2 border-t-2 border-black/10 pt-4 mt-auto">
            {feature?.items?.map((item: string, i: number) => (
              <div
                key={i}
                className="flex items-center text-xs md:text-sm font-bold uppercase tracking-wider opacity-75"
              >
                <CheckCircle2 size={12} className="mr-2 text-black" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Layout ---
export default function FeatureCardsGrid() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref, "-50px");

  const categories = useSelector((state: RootState) => state.category.data);
  const loading = useSelector((state: RootState) => state.category.loading);

  const displayCategories =
    categories?.slice(0, 4).map((category, index) => ({
      id: index,
      title: category.name.en,
      description: `Explore the best ${category.name.en} products.`,
      items:
        category.subCategories
          ?.flatMap((sub) => sub.items?.map((item) => item.en) || [])
          ?.slice(0, 5) || [],
    })) || [];

  return (
    <div className="min-h-screen w-full bg-white text-black font-sans selection:bg-black selection:text-[#bce201]">
      {/* Spacer for demo purposes */}
      <div className="py-12 md:py-20 px-4 md:px-8 max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block py-1 px-3 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase">
            Catalog 2024
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Shop By{" "}
            <span className="relative inline-block">
              Category
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-[#bce201]"
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
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Explore our curated collection of essentials. Quality products
            delivered to your doorstep with style.
          </p>
        </div>

        {/* Grid Section */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {displayCategories.map((category, index) => (
            <FeatureCard
              key={category.id}
              feature={category}
              index={index}
              showAnimation={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#bce201] hover:text-black transition-colors duration-300 shadow-lg hover:shadow-xl">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
}
