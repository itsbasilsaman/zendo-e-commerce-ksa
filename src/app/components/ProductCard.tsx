import React from "react";
import { ShoppingCart, Eye, Heart, Check } from "lucide-react";
import { ProductType } from "@/src/redux/product/slice";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux";

interface ProductCardProps {
  product: ProductType;
  hoveredCard: string | null;
  setHoveredCard: (id: string | null) => void;
  addedItems: string[];
  // wishlistItems: string[];
  handleAddToCart: (id: string) => void;
  handleToggleWishlist: (id: string) => void;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hoveredCard,
  setHoveredCard,
  addedItems = [],
  // wishlistItems = [],
  handleAddToCart,
  handleToggleWishlist,
  onClick,
}) => {
  // Guard Clause
  if (!product || !product._id) {
    return null;
  }

  const cartItems = useSelector((s: RootState) => s.cart.items);
  const wishlistItems = useSelector((s: RootState) => s.wishlist.items);

  const isAdded = cartItems.some((item) => item.product._id === product._id);
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const isHovered = hoveredCard === product._id;

   const productName = product.name?.en || "Product";

  const categoryName = product.categoryId?.name?.en || "Uncategorized";

  const brandName = product.brandId?.name?.en || "";

  return (
    <div
      className="group relative flex flex-col bg-white border-2 border-black rounded-lg overflow-hidden h-full cursor-pointer"
      onMouseEnter={() => setHoveredCard(product._id)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={onClick}
    >
      {/* --- Product Image Container --- */}
      <div className="relative aspect-square bg-white border-b-2 border-black overflow-hidden">
        {/* Badges (Simple & Small) */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
          {product.discount && (
            <span className="inline-block bg-[#bce201] text-black text-[10px] font-bold px-1.5 py-0.5 border border-black">
              {product.discount}
            </span>
          )}
          {product.badge && (
            <span className="inline-block bg-black text-white text-[10px] font-bold px-1.5 py-0.5 border border-black">
              {product.badge}
            </span>
          )}
        </div>

        {/* Image */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={productName}
          className={`w-full h-full object-contain p-4 transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Action Overlay */}
        <div
          className={`absolute inset-0 bg-black/5 transition-opacity duration-300 flex items-center justify-center gap-2 z-10 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Quick view:", product._id);
            }}
            className="w-9 h-9 bg-white border-2 border-black rounded flex items-center justify-center text-black hover:bg-black hover:text-[#bce201] transition-colors"
            title="Quick View"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist(product._id);
            }}
            className={`w-9 h-9 border-2 border-black rounded flex items-center justify-center transition-colors ${
              isWishlisted
                ? "bg-[#bce201] text-black"
                : "bg-white text-black hover:bg-[#bce201]"
            }`}
            title="Add to Wishlist"
          >
            <Heart size={18} className={isWishlisted ? "fill-black" : ""} />
          </button>
        </div>
      </div>

      {/* --- Product Details --- */}
      <div className="p-3 flex flex-col flex-grow justify-between">
        <div>
          {/* Category Label */}
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            {categoryName}
          </p>

          {/* Title */}
          <h3 className="text-sm md:text-base font-bold text-black leading-tight mb-2 line-clamp-2 group-hover:text-[#bce201] transition-colors">
            {productName}
          </h3>

          {/* Brand (Optional) */}
          {brandName && (
            <p className="text-[10px] text-gray-500 mb-1">Brand: {brandName}</p>
          )}
        </div>

        {/* Price & Add Button */}
        <div className="mt-2 space-y-3">
          {/* Price Block */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-black">
              {product.price?.toFixed(2) || "0.00"}{" "}
              <span className="text-[10px] font-medium">SAR</span>
            </span>
            {product.originalPrice && (
              <span className="text-xs font-bold text-gray-400 line-through">
                {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button (Full Width) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product._id);
            }}
            className={`w-full py-2.5 rounded border-2 border-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
              isAdded
                ? "bg-[#bce201] text-black"
                : "bg-black text-white hover:bg-[#bce201] hover:text-black"
            }`}
          >
            {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />}
            {isAdded ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
