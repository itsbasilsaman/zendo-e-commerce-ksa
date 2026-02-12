"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  ChevronRight,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux";
import { useAppDispatch } from "@/src/hooks/useDispatch";
import { fetchProductById } from "@/src/redux/product/thunk";
import { addToCart } from "@/src/redux/cart/slice";
import { toggleWishlist } from "@/src/redux/wishlist/slice";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

export default function ProductInnerPage() {
  const params = useParams();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState<number>(1);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    datas: products,
    single,
    loading,
  } = useSelector((state: RootState) => state.product);
  
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const product = products.find((p) => p._id === productId) || single;

  const isInCart = cartItems.some((item) => item.product._id === productId);
  const isWishlisted = wishlistItems.some((item) => item._id === productId);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
      setHasFetched(true);
    }
  }, [dispatch, productId]);

  if (loading && !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-[#bce201] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-bold uppercase tracking-wider">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  if (!loading && hasFetched && !product) {
    return notFound();
  }

  if (!product) {
    return null;
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((q) => Math.max(1, q + delta));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    dispatch(addToCart({ product, quantity }));
    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans border-t-2 border-black selection:bg-[#bce201] selection:text-black relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:16px_16px]" />
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
          <span>Shop</span>
          <ChevronRight size={14} />
          <span>{product.categoryId?.name?.en || "Category"}</span>
          <ChevronRight size={14} />
          <span className="text-black">
            {product.categoryId?.subCategories?.[0]?.name?.en ?? "N/A"}
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Column: Image/Discount */}
          <div className="flex flex-col gap-6 mb-12 lg:mb-0">
            <div className="relative aspect-square w-full bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden group">
              {product.discount && (
                <div
                  className={cn(
                    "absolute top-4 left-4 z-20 text-black border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-widest",
                    product.discountColor || "bg-[#bce201]"
                  )}
                >
                  {product.discount} OFF
                </div>
              )}
              <Image
                src={
                  product.image?.startsWith("http")
                    ? product.image
                    : "/" + product.image.replace(/^\//, "")
                }
                alt={product.name?.en || "Product"}
                width={400}
                height={400}
                className="h-full w-full object-contain p-8 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Info/Actions */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-sm font-bold text-[#bce201] uppercase tracking-widest bg-black inline-block px-2 py-0.5 mb-2">
                    {product.brandId?.name?.en || "Brand"}
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-black uppercase leading-[1.1]">
                    {product.name?.en || "Product Name"}
                  </h1>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={handleToggleWishlist}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    className={cn(
                      "w-10 h-10 flex items-center justify-center border-2 border-black rounded-full transition-all",
                      isWishlisted
                        ? "bg-[#bce201] shadow-[2px_2px_0px_0px_#000]"
                        : "hover:bg-[#bce201] hover:shadow-[2px_2px_0px_0px_#000]"
                    )}
                  >
                    <Heart 
                      className={cn(
                        "w-5 h-5",
                        isWishlisted && "fill-black"
                      )} 
                    />
                  </button>
                  <button
                    aria-label="Share product"
                    className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full hover:bg-[#bce201] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-4 border-b-2 border-black/10 pb-6">
                <div className="flex text-[#bce201] drop-shadow-[1px_1px_0px_black]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5 stroke-black stroke-[1.5]",
                        i < (product.rating ?? 0)
                          ? "fill-current"
                          : "fill-transparent text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-500">
                  (Verified Product)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 bg-black text-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#bce201] w-full sm:w-fit">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                  Total Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">
                    {product.price?.toFixed(2)}{" "}
                    <span className="text-xl text-[#bce201]">SAR</span>
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through decoration-2 decoration-[#bce201]">
                      {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center justify-between border-2 border-black rounded-xl px-2 h-14 w-full sm:w-40 bg-white shadow-[2px_2px_0px_0px_#000]">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-black text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Increase quantity"
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={cn(
                    "flex-1 h-14 rounded-xl font-black text-lg uppercase tracking-widest border-2 border-black transition-all duration-200 flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_#000]",
                    isInCart
                      ? "bg-[#bce201] text-black translate-y-0 shadow-none"
                      : "bg-black text-white hover:bg-[#bce201] hover:text-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-0 active:shadow-none"
                  )}
                >
                  {isInCart ? (
                    <>
                      <Check className="w-6 h-6" /> In Cart
                    </>
                  ) : (
                    <>
                      Add to Cart <ShoppingCart className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Category info */}
            <div className="grid grid-cols-2 gap-4 text-sm font-medium pt-6 border-t-2 border-dashed border-black/20">
              <div>
                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">
                  Category
                </span>
                <span className="text-black font-bold text-lg">
                  {product.categoryId?.name?.en || "-"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">
                  Type
                </span>
                <span className="text-black font-bold text-lg">
                  {product.categoryId?.subCategories?.[0]?.name?.en ?? "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}