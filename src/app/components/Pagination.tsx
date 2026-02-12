import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-3 mt-8 w-full">
      
      {/* Back Arrow */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="group flex items-center justify-center w-10 h-10 rounded-lg border-2 border-black bg-white transition-all duration-200
          hover:bg-[#bce201] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 
          active:translate-y-0 active:shadow-none
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:translate-y-0 disabled:hover:shadow-none"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 text-black" strokeWidth={3} />
      </button>

      {/* Page Numbers (Scrollable on mobile if many pages) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none px-1 py-2">
        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1
          const isActive = page === currentPage
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg border-2 border-black font-black text-sm transition-all duration-200
                ${isActive
                  ? "bg-black text-[#bce201] translate-y-0 shadow-none" // Active State
                  : "bg-white text-black hover:bg-[#bce201] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 active:translate-y-0 active:shadow-none" // Default State
                }
              `}
            >
              {page}
            </button>
          )
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="group flex items-center justify-center w-10 h-10 rounded-lg border-2 border-black bg-white transition-all duration-200
          hover:bg-[#bce201] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 
          active:translate-y-0 active:shadow-none
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:translate-y-0 disabled:hover:shadow-none"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-black" strokeWidth={3} />
      </button>
    </div>
  )
}

export default Pagination