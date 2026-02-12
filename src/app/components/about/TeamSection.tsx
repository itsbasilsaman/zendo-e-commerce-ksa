"use client";

import React, { useState, useEffect, useRef } from "react";
import { Linkedin, Twitter, Mail, ArrowUpRight, Users } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

// --- Hook for Scroll Animation ---
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

// --- Data: Zendo Market Team ---
const teamMembers = [
  {
    id: "1",
    name: "Abdullah Al-Rashid",
    role: "CEO & Founder",
    description:
      "Visionary leader focused on revolutionizing the grocery experience in the Kingdom with technology and tradition.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
  },
  {
    id: "2",
    name: "Noura Al-Jaber",
    role: "Head of Sourcing",
    description:
      "Expert in building relationships with local farmers in Al-Qassim and Al-Ahsa to ensure the freshest produce daily.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
  },
  {
    id: "3",
    name: "Faisal Al-Saud",
    role: "Logistics Director",
    description:
      "Optimizing our supply chain to ensure products move from farm to shelf in under 24 hours.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
  },
  {
    id: "4",
    name: "Layla Mahmoud",
    role: "Marketing Director",
    description:
      "Connecting with our community through authentic stories and celebrating Saudi culinary culture.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
  },
  {
    id: "5",
    name: "Omar Hassan",
    role: "Store Operations",
    description:
      "Ensuring every Zendo branch maintains world-class hygiene standards and customer service excellence.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
  },
  {
    id: "6",
    name: "Sarah Jenkins",
    role: "Import Specialist",
    description:
      "Curating the finest international products to bring global flavors to Saudi tables.",
    image:
      "https://images.unsplash.com/photo-1598550832450-8eb6675b3724?w=400&h=400&fit=crop&crop=faces",
  },
];

// --- Card Component ---
interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
  showAnimation: boolean;
}

function TeamCard({ member, index, showAnimation }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative transition-all duration-700 ease-out",
        showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div
        className={cn(
          "relative h-full bg-white border-2 border-black rounded-xl overflow-hidden",
          "transition-all duration-300 ease-out",
          isHovered
            ? "shadow-[8px_8px_0px_0px_#bce201] -translate-y-1"
            : "shadow-[4px_4px_0px_0px_#000]"
        )}
      >
        {/* Top Pattern */}
        <div className="h-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#bce201_2px,transparent_2px)] bg-size-[8px_8px]" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white to-transparent" />
        </div>

        {/* Profile Image Wrapper */}
        <div className="relative px-6 -mt-12 mb-4 flex justify-between items-end">
          <div
            className={cn(
              "relative w-24 h-24 rounded-xl overflow-hidden border-2 border-black bg-white transition-transform duration-500",
              isHovered && "scale-105 rotate-2"
            )}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Social Links (Slide in on hover) */}
          <div className="flex gap-2 mb-1">
            {[Linkedin, Twitter, Mail].map((Icon, i) => (
              <button
                key={i}
                className={cn(
                  "p-2 rounded-lg border-2 border-black bg-white hover:bg-[#bce201] transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_#000]",
                  // Staggered entrance
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4 pointer-events-none"
                )}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 space-y-3">
          <div>
            <h3 className="text-xl font-black text-black leading-tight group-hover:text-gray-800 transition-colors">
              {member.name}
            </h3>
            <p className="text-xs font-bold uppercase tracking-wider text-[#bce201] bg-black inline-block px-2 py-0.5 mt-1 rounded-sm">
              {member.role}
            </p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            {member.description}
          </p>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="text-[#bce201]" size={24} />
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isVisible = useOnScreen(ref, "-50px");

  return (
    <section
      ref={ref}
      className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t-2 border-black font-sans"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px]" />

      <div className="mx-auto max-w-8xl relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div
            className={cn(
              "space-y-4 transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#bce201] text-black border-2 border-black text-xs font-bold tracking-widest uppercase shadow-[4px_4px_0px_0px_#000]">
              <Users size={14} /> Our Team
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-none text-black uppercase">
              The Faces <br />
              <span className="relative inline-block">
                Behind Freshness
                <span className="absolute inset-x-0 bottom-2 h-3 bg-[#bce201] -z-10 opacity-60 transform -skew-x-12" />
              </span>
            </h2>
          </div>

          <p
            className={cn(
              "max-w-md text-base md:text-lg leading-relaxed text-gray-600 font-medium border-l-4 border-black pl-6 transition-all duration-700 delay-100",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            )}
          >
            Meet the passionate individuals driving Zendo&lsquo;s success. A
            diverse team bridging tradition with modern retail to serve the
            Kingdom.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              showAnimation={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
