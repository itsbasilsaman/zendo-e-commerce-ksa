"use client";

import React from "react";
import { ShoppingCart, Eye, Heart, Check } from "lucide-react";
import { ProductType } from "@/src/redux/product/slice";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux";
import { useLanguage } from "@/src/context/LanguageContext";

interface ProductCardProps {
  product: ProductType;
  hoveredCard: string | null;
  setHoveredCard: (id: string | null) => void;
  addedItems: string[];
  handleAddToCart: (id: string) => void;
  handleToggleWishlist: (id: string) => void;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hoveredCard,
  setHoveredCard,
  addedItems = [],
  handleAddToCart,
  handleToggleWishlist,
  onClick,
}) => {
  // Guard Clause
  if (!product || !product._id) {
    return null;
  }

  const { t, getLocalizedName } = useLanguage();

  const cartItems = useSelector((s: RootState) => s.cart.items);
  const wishlistItems = useSelector((s: RootState) => s.wishlist.items);

  const isAdded = cartItems.some((item) => item.product._id === product._id);
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const isHovered = hoveredCard === product._id;

  const productName = getLocalizedName(product.name) || t("products.product");
  const categoryName = getLocalizedName(product.categoryId?.name) || t("products.uncategorized");

  return (
    <div
      className="group relative flex flex-col bg-white border-2 border-black rounded-lg overflow-hidden h-full cursor-pointer"
      onMouseEnter={() => setHoveredCard(product._id)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={onClick}
    >
      {/* --- Product Image Container (hero area — takes most of the card) --- */}
      <div className="relative aspect-[4/5] bg-white border-b-2 border-black overflow-hidden">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 z-20">
            <span className="inline-block bg-[#bce201] text-black text-[10px] font-bold px-1.5 py-0.5 border border-black rounded-sm">
              {product.discount}%
            </span>
          </div>
        )}

        {/* Wishlist Button (always visible, top-right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleWishlist(product._id);
          }}
          className={`absolute top-2 right-2 z-20 w-8 h-8 rounded-full border border-black flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? "bg-[#bce201] shadow-[1px_1px_0px_0px_#000]"
              : "bg-[#bce201] hover:shadow-[1px_1px_0px_0px_#000]"
          }`}
          title={t("products.addToWishlist")}
        >
          <Heart size={14} className={isWishlisted ? "fill-black" : ""} />
        </button>

        {/* Image */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={productName}
          className={`w-full h-full object-contain p-6 transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Quick View Overlay (on hover) */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 flex items-end justify-center pb-3 z-10 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Quick view:", product._id);
            }}
            className="px-4 py-1.5 bg-white border-2 border-black rounded-full text-[10px] font-bold uppercase tracking-wider text-black hover:bg-[#bce201] transition-colors"
            title={t("products.quickView")}
          >
            <span className="flex items-center gap-1.5">
              <Eye size={12} />
              {t("products.quickView")}
            </span>
          </button>
        </div>
      </div>

      {/* --- Product Details (compact) --- */}
      <div className="px-3 py-2.5 flex flex-col gap-1.5">
        {/* Category Label */}
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
          {categoryName}
        </p>

        {/* Title */}
        <h3 className="text-sm font-bold text-black leading-snug line-clamp-1 group-hover:text-[#bce201] transition-colors">
          {productName}
        </h3>

        {/* Price + Cart Row — inline layout */}
        <div className="flex items-center justify-between gap-2 mt-1">
          {/* Price Block */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-black">
              {product.price?.toFixed(2) || "0.00"}
            </span>
            <span className="text-[9px] font-semibold text-gray-500">SAR</span>
            {product.originalPrice && (
              <span className="text-[10px] font-bold text-gray-400 line-through">
                {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Icon Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product._id);
            }}
            className={`w-9 h-9 rounded-lg border-2 border-black flex items-center justify-center shrink-0 transition-all duration-200 ${
              isAdded
                ? "bg-[#bce201] text-black"
                : "bg-black text-white hover:bg-[#bce201] hover:text-black"
            }`}
            title={isAdded ? t("products.added") : t("products.addToCart")}
          >
            {isAdded ? <Check size={16} /> : <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
