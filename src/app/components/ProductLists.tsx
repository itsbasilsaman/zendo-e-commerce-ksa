"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./UI/ProductSkeleton";
import Pagination from "./Pagination";
import CategorySelector from "./CategorySelector";
import { useAppDispatch } from "@/src/hooks/useDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux";
import { fetchCategories } from "@/src/redux/category/thunk";
import { fetchBrands } from "@/src/redux/brand/thunk";
import { fetchProducts } from "@/src/redux/product/thunk";
import { toggleWishlist } from "@/src/redux/wishlist/slice";
import { addToCart } from "@/src/redux/cart/slice";
import { useLanguage } from "@/src/context/LanguageContext";

export default function PopularProducts() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useLanguage();

  const {
    datas: products,
    loading,
    totalPages: totalPage,
  } = useSelector((state: RootState) => state.product);
  const brands = useSelector((state: RootState) => state.brand.data);
  const categories = useSelector((state: RootState) => state.category.data);

  const [activeMainCategory, setActiveMainCategory] = useState<string>("All");
  const [activeCategoryName, setActiveCategoryName] = useState<string>("All");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("All");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    const filters: any = {
      page: currentPage,
      limit: productsPerPage,
    };

    if (activeMainCategory !== "All") {
      filters.categoryId = activeMainCategory;
    }

    if (activeSubCategory !== "All") {
      filters.subCategory = activeSubCategory;
    }

    dispatch(fetchProducts(filters));
  }, [dispatch, currentPage, activeMainCategory, activeSubCategory]);

  const handleAddToCart = (id: string) => {
    const product = products.find((p) => p._id === id);
    if (!product) return;

    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleToggleWishlist = (id: string) => {
    const product = products.find((p) => p._id === id);
    if (!product) return;

    dispatch(toggleWishlist(product));
  };

  const handleMainCategoryClick = (
    categoryId: string,
    categoryName: string
  ) => {
    setActiveMainCategory(categoryId);
    setActiveCategoryName(categoryName);
    setActiveSubCategory("All");
    setCurrentPage(1);
    if (categoryName === "All") {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  const handleSubCategoryClick = (subCategoryName: string) => {
    setActiveSubCategory(subCategoryName);
    setCurrentPage(1);
  };

  const totalPages = totalPage || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const productsList = Array.isArray(products) ? products : [];

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
      {/* Header & Category Selector Section */}
      <CategorySelector
        mainCategories={categories}
        activeMainCategory={activeMainCategory}
        activeSubCategory={activeSubCategory}
        expandedCategory={expandedCategory}
        handleMainCategoryClick={handleMainCategoryClick}
        handleSubCategoryClick={handleSubCategoryClick}
      />

      {/* Loading State Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 mt-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!loading && productsList.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          {productsList.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              addedItems={addedItems}
              handleAddToCart={handleAddToCart}
              handleToggleWishlist={handleToggleWishlist}
              onClick={() => {
                router.push(`/product/${product._id}`);
              }}
            />
          ))}
        </div>
      )}

      {/* No Products Message */}
      {!loading && productsList.length === 0 && (
        <div className="text-center py-16 animate-in fade-in duration-300">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500 text-lg font-medium">
            {t("products.noProducts")}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {t("products.tryDifferent")}
          </p>
        </div>
      )}

      {/* Pagination UI */}
      {!loading && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
