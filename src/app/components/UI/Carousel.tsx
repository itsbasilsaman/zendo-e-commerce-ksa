"use client"

import React, { useState, useEffect } from "react"
import { Leaf, Zap, ArrowRight, Heart, Check, Star } from "lucide-react"

interface Slide {
  id: number
  title: string
  subtitle: string
  image: string
  tag: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Fresh Market Big Discount",
    subtitle: "Save up to 50% off on your first bulk order.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
    tag: "Super Sale",
  },
  {
    id: 2,
    title: "Organic Produce Special",
    subtitle: "Premium organic vegetables directly from Al-Qassim.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1000&auto=format&fit=crop",
    tag: "100% Organic",
  },
  {
    id: 3,
    title: "Farm Fresh Goodness",
    subtitle: "From the farm to your table in under 24 hours.",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=1000&auto=format&fit=crop",
    tag: "Local Farms",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [email, setEmail] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [liked, setLiked] = useState(false)

  // Auto-advance carousel
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isHovered])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setShowSuccess(true)
      setEmail("")
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className="w-full bg-white py-8 md:py-12 px-4 md:px-6 font-sans border-b-2 border-black">
      
      <div 
        className="max-w-7xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* --- Main Card Container --- */}
        <div className="relative bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_#bce201] transition-all duration-300 h-auto md:h-[500px]">
          
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
          
          {/* Top Right Decorative Label */}
          <div className="absolute top-0 right-0 bg-black text-[#bce201] px-6 py-2 rounded-bl-2xl border-l-2 border-b-2 border-black font-bold text-sm uppercase tracking-widest z-20 hidden md:block">
            Daily Deals
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full">
            
            {/* --- Left Content Section --- */}
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start w-full">
              
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#bce201] border-2 border-black text-xs font-black tracking-widest uppercase mb-6 shadow-[4px_4px_0px_0px_#000] animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Leaf size={14} /> {currentSlideData.tag}
              </div>

              {/* Title with key change animation */}
              <h1 
                key={`title-${currentSlideData.id}`}
                className="text-4xl md:text-5xl lg:text-7xl font-black text-black leading-[0.95] mb-6 tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {currentSlideData.title}
              </h1>

              <p 
                key={`sub-${currentSlideData.id}`}
                className="text-lg text-gray-600 font-medium mb-8 max-w-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-100"
              >
                <Zap className="w-5 h-5 text-[#bce201] fill-black" />
                {currentSlideData.subtitle}
              </p>

              {/* Newsletter Form */}
              <div className="w-full max-w-md relative z-20">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-14 px-5 rounded-xl border-2 border-black bg-white text-black placeholder:text-gray-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_#bce201] transition-shadow font-bold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-14 px-8 bg-black text-white hover:text-[#bce201] rounded-xl border-2 border-black font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_#bce201] hover:shadow-none hover:translate-y-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Subscribe <ArrowRight size={20} />
                  </button>
                </form>

                {/* Success Message */}
                {showSuccess && (
                  <div className="mt-4 flex items-center gap-2 text-green-600 font-bold animate-in fade-in slide-in-from-top-2">
                    <Check size={20} /> You&lsquo;re on the list!
                  </div>
                )}
              </div>
            </div>

            {/* --- Right Image Section --- */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative bg-gray-50 border-t-2 md:border-t-0 md:border-l-2 border-black overflow-hidden group">
              
              {/* Main Image */}
              <img
                key={`img-${currentSlideData.id}`}
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="w-full h-full object-cover animate-in zoom-in-105 duration-1000"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

              {/* Floating Action Button */}
              <button
                onClick={() => setLiked(!liked)}
                className={`absolute top-6 right-6 w-12 h-12 rounded-full border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-0 active:shadow-none z-20 ${
                  liked ? "bg-red-500 text-white" : "bg-white text-black hover:bg-[#bce201]"
                }`}
              >
                <Heart size={24} className={liked ? "fill-current" : ""} />
              </button>

              {/* Spinning Badge Overlay */}
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 hidden sm:block">
                 <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                    {/* Spinning Text */}
                    <div className="absolute inset-0 animate-[spin_10s_linear_infinite] opacity-90">
                       <svg viewBox="0 0 100 100" width="100%" height="100%">
                          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                          <text fontSize="11.5" fontWeight="bold" fill="black" letterSpacing="1.2">
                            <textPath xlinkHref="#circlePath">
                              • FRESH • ORGANIC • TASTY • ZENDO
                            </textPath>
                          </text>
                       </svg>
                    </div>
                    {/* Center Star */}
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#bce201] rounded-full border-2 border-black flex items-center justify-center shadow-sm">
                        <Star className="w-6 h-6 md:w-8 md:h-8 text-black fill-black" />
                    </div>
                 </div>
              </div>

            </div>
          </div>

          {/* --- Slide Indicators --- */}
          <div className="absolute bottom-6 left-8 md:left-12 flex gap-3 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full border-2 border-black transition-all duration-300 ${
                  index === currentSlide 
                    ? "w-8 bg-[#bce201]" 
                    : "w-3 bg-white hover:bg-gray-200"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}