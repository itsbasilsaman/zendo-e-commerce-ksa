"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, Heart, Phone, Truck } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux";

// --- Utility ---
function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const cartCount = isMounted ? totalQuantity : 0;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Why Us", href: "/why-us" },
    { label: "Contact", href: "/contact-us" },
  ];

  // --- Animation Variants ---
  const menuVariants = {
    closed: { x: "100%", opacity: 1 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
  };

  const linkVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <>
      {/* --- CSS for Marquee --- */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* --- Promotional Ticker (Lime Background, Black Text) --- */}
      <div className="bg-[#bce201] text-black border-b-2 border-black overflow-hidden py-2.5 relative z-60">
        <div className="whitespace-nowrap overflow-hidden flex">
          <div className="animate-marquee-infinite flex gap-8 items-center font-black text-xs md:text-sm tracking-widest uppercase px-4">
            {/* Duplicate content for seamless loop */}
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  GRAND OPENING SALE
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black border border-black rounded-full"></span>
                  FRESH SUKARI DATES ARRIVED
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  FREE DELIVERY ON ORDERS OVER 200 SAR
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* --- Main Header --- */}
      <header
        className={cn(
          "sticky top-0 w-full z-50 transition-all duration-300 border-b-2 border-black",
          scrolled ? "bg-white/95 backdrop-blur-sm py-2" : "bg-white py-4"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* 1. Left: Logo */}
            <Link href="/" className="relative group shrink-0">
              <div className="flex items-center gap-1">
                <Image
                  src="/logo.png"
                  alt="Zendo Market Logo"
                  width={100}
                  height={40}
                />
              </div>
            </Link>

            {/* 2. Center: Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative font-bold text-sm uppercase tracking-wider text-black hover:text-[#bce201] transition-colors duration-200 group py-2"
                >
                  {item.label}
                  {/* Underline effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-black transition-all duration-300 group-hover:w-full group-hover:bg-[#bce201]" />
                </a>
              ))}
            </nav>

            {/* 3. Right: Actions & Contact */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Desktop Contact Info (New Enhancement) */}
              <div className="hidden xl:flex flex-col items-end mr-2">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                  <Phone size={10} /> Support
                </div>
                <a
                  href="tel:+96612345678"
                  className="text-sm font-black text-black hover:text-[#bce201] transition-colors"
                >
                  +966 12 345 6789
                </a>
              </div>

              <div className="flex items-center gap-3">
                {/* Track Order (Desktop) */}
                <button
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border-2 border-black bg-white text-black hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_#000]"
                  title="Track Order"
                >
                  <Truck size={18} />
                </button>

                {/* Wishlist - Updated Colors */}
                <Link href="/wishlist" className="relative">
                  <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border-2 border-black bg-[#bce201] text-black hover:bg-black hover:text-[#bce201] transition-all hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_#000]">
                    <Heart size={18} />
                  </button>
                </Link>

                {/* Cart */}
                <Link href="/cart" className="relative">
                  <button className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-black bg-black text-[#bce201] hover:bg-[#bce201] hover:text-black transition-all hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_#000]">
                    <ShoppingCart size={18} />
                    {isMounted && totalQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black shadow-sm">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden p-1 text-black hover:text-[#bce201] transition-colors"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu size={32} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60"
            />

            {/* Drawer */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-[85%] sm:w-[400px] bg-white z-70 border-l-2 border-black shadow-[-8px_0px_0px_0px_rgba(0,0,0,0.1)] flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b-2 border-black flex items-center justify-between bg-[#bce201]">
                <span className="text-xl font-black italic text-black">
                  MENU
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-white text-black border-2 border-black rounded-full hover:rotate-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Links */}
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i}
                      variants={linkVariants}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-black uppercase text-black hover:text-[#bce201] transition-colors flex items-center gap-3 group"
                      >
                        {item.label}
                        <span className="h-0.5 flex-1 bg-gray-200 group-hover:bg-[#bce201] transition-colors"></span>
                      </a>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Utilities */}
                <div className="space-y-4 pt-4 border-t-2 border-dashed border-gray-200">
                  <div className="flex items-center gap-4 text-black">
                    <Phone size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">
                        Customer Support
                      </p>
                      <p className="font-bold text-lg">+966 12 345 6789</p>
                    </div>
                  </div>

                  <button className="w-full py-4 border-2 border-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors bg-gray-50 text-black">
                    <Truck size={20} /> Track My Order
                  </button>

                  <button className="w-full py-4 border-2 border-black rounded-xl font-bold flex items-center justify-center gap-2 bg-black text-white hover:bg-[#bce201] hover:text-black hover:border-black transition-all shadow-[4px_4px_0px_0px_#bce201]">
                    <User size={20} /> My Account
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t-2 border-black bg-gray-50 text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                <p>&copy; 2024 Zendo Market</p>
                <p className="mt-1">Riyadh, Saudi Arabia</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
