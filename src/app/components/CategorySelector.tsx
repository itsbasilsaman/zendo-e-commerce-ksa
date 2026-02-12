import { CategoryType } from "@/src/types/category"
import React from "react"
import { BiCategory, BiDrink } from "react-icons/bi"
import { IoFastFoodOutline } from "react-icons/io5"
import { MdOutlineCleaningServices } from "react-icons/md"


interface CategorySelectorProps {
  mainCategories: CategoryType[]
  activeMainCategory: string
  activeSubCategory: string
  expandedCategory: string | null
  handleMainCategoryClick: (id: string, name: string) => void
  handleSubCategoryClick: (name: string) => void
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  mainCategories,
  activeMainCategory,
  activeSubCategory,
  expandedCategory,
  handleMainCategoryClick,
  handleSubCategoryClick,
}) => {
  // Common colors & classes
  const activeBg = "bg-white text-black border-2 border-[#bce201] shadow-md"
  const inactiveBg = "bg-black text-[#bce201] border-2 border-[#bce201] hover:bg-[#bce201] hover:text-black"

  return (
    <div className="flex flex-col gap-4 md:gap-6 mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-black">
          Popular Products
        </h1>
        {/* Desktop Categories - Pill Design */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleMainCategoryClick("All", "All")}
            className={`flex items-center gap-2 text-base font-semibold transition-all duration-300 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md ${
              activeMainCategory === "All" ? activeBg : inactiveBg
            }`}
          >
            <BiCategory className={`w-5 h-5 ${activeMainCategory === "All" ? "text-black" : "text-[#bce201]"}`} />
            All
          </button>
          {mainCategories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleMainCategoryClick(category._id!, category.name.en)}
              className={`flex items-center gap-2 text-base font-semibold transition-all duration-300 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md ${
                activeMainCategory === category.name.en ? activeBg : inactiveBg
              }`}
            >
              {/* <category.icon className={`w-5 h-5 ${activeMainCategory === category.name.en ? "text-black" : "text-[#bce201]"}`} /> */}
              {category.name.en}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:hidden w-full">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handleMainCategoryClick("All", "All")}
            className={`flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 px-3 py-3 rounded-xl shadow-sm active:scale-95 ${
              activeMainCategory === "All" ? activeBg : inactiveBg
            }`}
          >
            <BiCategory className={`w-5 h-5 flex-shrink-0 ${activeMainCategory === "All" ? "text-black" : "text-[#bce201]"}`} />
            <span>All</span>
          </button>
          {mainCategories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleMainCategoryClick(category._id!, category.name.en)}
              className={`flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 px-3 py-3 rounded-xl shadow-sm active:scale-95 ${
                activeMainCategory === category.name.en ? activeBg : inactiveBg
              }`}
            >
              {/* <category.icon className={`w-5 h-5 flex-shrink-0 ${activeMainCategory === category.name.en ? "text-black" : "text-[#bce201]"}`} /> */}
              <span className="text-xs leading-tight">{category.name.en}</span>
            </button>
          ))}
        </div>
      </div>
      {expandedCategory && (
        <div className="w-full animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSubCategoryClick("All")}
              className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full border-2 active:scale-95 ${
                activeSubCategory === "All" ? "bg-white text-black border-[#bce201] shadow-lg" : "bg-black text-[#bce201] border-[#bce201] hover:bg-[#bce201] hover:text-black hover:shadow-sm"
              }`}
            >
              All {expandedCategory}
            </button>
            {(mainCategories.find((cat) => cat.name.en === expandedCategory)?.subCategories ?? []).map((subCat, index) => (
                <button
                  key={subCat._id}
                  onClick={() => handleSubCategoryClick(subCat.name?.en!)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                  className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full border-2 animate-in fade-in slide-in-from-left-2 active:scale-95 ${
                    activeSubCategory === subCat.name?.en
                      ? "bg-white text-black border-[#bce201] shadow-lg"
                      : "bg-black text-[#bce201] border-[#bce201] hover:bg-[#bce201] hover:text-black hover:shadow-sm"
                  }`}
                >
                  {subCat.name?.en}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategorySelector
