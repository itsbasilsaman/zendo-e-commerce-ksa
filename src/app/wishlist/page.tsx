"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  ArrowRight,
  PackageX,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RootState } from "@/src/redux";
import { toggleWishlist, clearWishlist } from "@/src/redux/wishlist/slice";
import { addToCart } from "@/src/redux/cart/slice";
import { useLanguage } from "@/src/context/LanguageContext";

// --- Utility ---
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function WishlistPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items } = useSelector((state: RootState) => state.wishlist);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const { t, getLocalizedName } = useLanguage();

  const handleRemoveFromWishlist = (product: any) => {
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ product, quantity: 1 }));
    setAddedToCart([...addedToCart, product._id]);
    
    setTimeout(() => {
      setAddedToCart(addedToCart.filter((id) => id !== product._id));
    }, 2000);
  };

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishlist());
    }
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      dispatch(addToCart({ product: item, quantity: 1 }));
    });
    setAddedToCart(items.map((item) => item._id));
    
    setTimeout(() => {
      setAddedToCart([]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans border-t-2 border-black selection:bg-[#bce201] selection:text-black relative">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <main className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 border-b-2 border-black pb-6 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Heart className="w-10 h-10 fill-[#bce201] text-black" />
              {t("wishlist.title")}
            </h1>
            <p className="text-gray-600 font-bold mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#bce201] rounded-full border border-black"></span>
              {items.length} {items.length === 1 ? t("wishlist.item") : t("wishlist.itemsSaved")}
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddAllToCart}
                className="flex items-center gap-2 px-4 py-2.5 bg-black text-white font-bold uppercase tracking-wider text-sm rounded-lg border-2 border-black hover:bg-[#bce201] hover:text-black transition-all shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-y-1"
              >
                <ShoppingCart className="w-4 h-4" />
                {t("wishlist.addAllToCart")}
              </button>
              <button
                onClick={handleClearWishlist}
                className="flex items-center gap-2 px-4 py-2.5 text-red-500 font-bold uppercase tracking-wider text-sm hover:bg-red-50 rounded-lg transition-colors border-2 border-red-200"
              >
                <Trash2 className="w-4 h-4" />
                {t("wishlist.clearAll")}
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items */}
        <AnimatePresence mode="popLayout" initial={false}>
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl border-2 border-dashed border-black/30 p-16 text-center flex flex-col items-center justify-center gap-6"
            >
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                <PackageX className="w-12 h-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase">
                  {t("wishlist.emptyTitle")}
                </h3>
                <p className="text-gray-500 font-medium">
                  {t("wishlist.emptyMessage")}
                </p>
              </div>
              <button
                onClick={() => router.push("/")}
                className="mt-4 px-6 py-3 bg-black text-white font-bold uppercase tracking-wider rounded-lg border-2 border-black hover:bg-[#bce201] hover:text-black transition-all shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-y-1 flex items-center gap-2"
              >
                {t("wishlist.continueShopping")} <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4 sm:space-y-6 flex flex-col">
              {items.map((product) => (
                <motion.div
                  layout
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  className="group bg-white rounded-xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#bce201] transition-all duration-200"
                >
                  <div className="flex flex-row gap-3 sm:gap-6">
                    {/* Image Section */}
                    <div
                      className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-auto md:w-40 aspect-square rounded-lg border-2 border-black overflow-hidden bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      <Image
                        src={
                          product.image?.startsWith("http")
                            ? product.image
                            : "/" + product.image.replace(/^\//, "")
                        }
                        alt={getLocalizedName(product.name) || t("products.product")}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover p-2 sm:p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Discount Badge */}
                      {product.discount && (
                        <div className="absolute top-1 left-1 sm:top-2 sm:left-2 px-1 py-0.5 sm:px-2 sm:py-0.5 text-[8px] sm:text-[10px] uppercase tracking-wide font-black bg-[#bce201] text-black border border-black rounded-sm max-w-[calc(100%-8px)] truncate text-center leading-none flex items-center justify-center">
                          {product.discount}% {t("detail.off")}
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-between min-h-[96px] sm:min-h-[120px]">
                      <div>
                        {/* Header Row: Title & Remove Button */}
                        <div className="flex justify-between items-start gap-2 sm:gap-4">
                          <div>
                            {/* Brand */}
                            <p className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5 sm:mb-1">
                              {getLocalizedName(product.brandId?.name) || t("products.brand")}
                            </p>

                            {/* Product Name */}
                            <h3
                              className="font-black text-sm sm:text-lg md:text-xl text-black leading-tight line-clamp-2 cursor-pointer hover:text-[#bce201] transition-colors"
                              onClick={() => router.push(`/product/${product._id}`)}
                            >
                              {getLocalizedName(product.name) || t("detail.productName")}
                            </h3>
                          </div>
                          
                          {/* Remove Button (Mobile visible, Desktop mapped below or here) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromWishlist(product);
                            }}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1 sm:p-2 sm:hidden shrink-0 -mt-1 -mr-1"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        {/* Category */}
                        <p className="text-xs font-bold text-gray-500 mt-1">
                          {getLocalizedName(product.categoryId?.name)}
                          {product.categoryId?.subCategories?.[0]?.name &&
                            ` / ${getLocalizedName(product.categoryId.subCategories[0].name)}`}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2">
                          <div className="flex text-[#bce201]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-3.5 h-3.5",
                                  i < (product.rating || 0)
                                    ? "fill-current stroke-black stroke-[1.5px]"
                                    : "text-gray-200 fill-gray-200 stroke-gray-300"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Controls Row */}
                      <div className="flex flex-row items-end justify-between mt-2 sm:mt-4 gap-2 sm:gap-4">
                        <div className="flex items-center gap-4 sm:gap-6">
                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={cn(
                              "h-8 sm:h-10 px-4 sm:px-6 rounded-lg font-bold text-[10px] sm:text-sm uppercase tracking-wider border-2 border-black transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]",
                              addedToCart.includes(product._id)
                                ? "bg-[#bce201] text-black translate-y-0 shadow-none"
                                : "bg-black text-white hover:bg-[#bce201] hover:text-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-0 active:shadow-none"
                            )}
                          >
                            {addedToCart.includes(product._id) ? (
                              <>{t("wishlist.addedCheck")}</>
                            ) : (
                              <>
                                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline-block">{t("products.addToCart")}</span><span className="sm:hidden block">Add</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromWishlist(product);
                            }}
                            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-wide group/delete"
                          >
                            <Trash2 className="w-4 h-4 group-hover/delete:rotate-12 transition-transform" />
                            <span className="hidden md:inline-block">{t("cart.remove") || "Remove"}</span>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {product.originalPrice && product.originalPrice > product.price && (
                            <div className="text-[10px] sm:text-xs text-gray-400 line-through mb-0.5 font-bold decoration-2 decoration-red-500">
                              {product.originalPrice.toFixed(2)} SAR
                            </div>
                          )}
                          <div className="text-base sm:text-xl font-black text-black">
                            {product.price?.toFixed(2)}{" "}
                            <span className="text-[10px] sm:text-sm text-[#bce201]">SAR</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Continue Shopping CTA */}
        {items.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-lg border-2 border-black hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-y-1"
            >
              {t("wishlist.continueShopping")} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}