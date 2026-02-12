"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  Star,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/src/redux/cart/slice";
import { useRouter } from "next/navigation";

// --- Utility ---
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function OrderSummary() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  const updateQty = (id: string, change: number) => {
    const found = items.find((i) => i.product._id === id);
    if (!found) return;
    const newQty = Math.max(1, found.quantity + change);
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white text-black font-sans border-t-2 border-black selection:bg-[#bce201] selection:text-black relative">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <main className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b-2 border-black pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Your Cart
            </h1>
            <p className="text-gray-600 font-bold mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#bce201] rounded-full border border-black"></span>
              {items.length} Items ready for checkout
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="hidden sm:flex text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 px-3 py-2 rounded transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* --- Left Column: Cart Items --- */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl border-2 border-dashed border-black/30 p-16 text-center flex flex-col items-center justify-center gap-6"
                >
                  <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 font-medium">
                      Looks like you haven&lsquo;t added anything yet.
                    </p>
                  </div>
                </motion.div>
              ) : (
                items.map((product) => (
                  <motion.div
                    layout
                    key={product.product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    className="group bg-white rounded-xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#bce201] transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Image */}
                      <div className="relative shrink-0 w-full sm:w-32 md:w-40 aspect-square rounded-lg border-2 border-black overflow-hidden bg-gray-100">
                        <img
                          src={product.product.image}
                          alt={product.product.name.en}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.product.discount && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] uppercase tracking-wide font-black bg-[#bce201] text-black border border-black">
                            {product.product.discount} OFF
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between min-h-[120px]">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                                {product.product.brandId?.name.en}
                              </p>
                              <h3 className="font-black text-lg sm:text-xl text-black leading-tight">
                                {product.product.name.en}
                              </h3>
                            </div>
                            <button
                              onClick={() => removeItem(product.product._id)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-2 sm:hidden"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <p className="text-xs font-bold text-gray-500 mt-1">
                            {product.product.categoryId?.name.en} /{" "}
                            {
                              product.product.categoryId?.subCategories?.[0]
                                ?.name?.en
                            }
                          </p>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mt-2">
                            <div className="flex text-[#bce201]">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-3.5 h-3.5",
                                    i < product.product.rating! || i < 0
                                      ? "fill-current stroke-black stroke-[1.5px]"
                                      : "text-gray-200 fill-gray-200 stroke-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Controls Row */}
                        <div className="flex flex-wrap items-end justify-between mt-4 gap-4">
                          <div className="flex items-center gap-6">
                            {/* Quantity Stepper */}
                            <div className="flex items-center border-2 border-black rounded-lg bg-white h-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                              <button
                                className="w-8 h-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 border-r-2 border-black transition-colors"
                                onClick={() =>
                                  updateQty(product.product._id, -1)
                                }
                                disabled={product.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-10 text-center text-sm font-black tabular-nums">
                                {product.quantity}
                              </span>
                              <button
                                className="w-8 h-full flex items-center justify-center hover:bg-gray-100 border-l-2 border-black transition-colors"
                                onClick={() =>
                                  updateQty(product.product._id, 1)
                                }
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(product.product._id)}
                              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-wide group/delete"
                            >
                              <Trash2 className="w-4 h-4 group-hover/delete:rotate-12 transition-transform" />
                              Remove
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            {product.product.originalPrice &&
                              product.product.originalPrice >
                                product.product.price && (
                                <div className="text-xs text-gray-400 line-through mb-0.5 font-bold decoration-2 decoration-red-500">
                                  £{product.product.originalPrice.toFixed(2)}
                                </div>
                              )}
                            <div className="text-xl font-black text-black">
                              £
                              {(
                                product.product.price * product.quantity
                              ).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* --- Right Column: Order Summary --- */}
          {items.length > 0 && (
            <div className="lg:col-span-4 sticky top-8">
              <div className="bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#bce201] overflow-hidden">
                {/* Summary Header */}
                <div className="bg-black p-4 border-b-2 border-black">
                  <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="text-[#bce201]" /> Order Summary
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-3 text-sm font-medium">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold text-black">
                        £{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-bold text-black">
                        £{shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-bold text-black">£0.00</span>
                    </div>
                  </div>

                  <div className="h-px bg-black/10 border-t-2 border-dashed border-gray-300 my-4" />

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-black block uppercase">
                        Total
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        Including VAT
                      </span>
                    </div>
                    <div className="text-3xl font-black text-black">
                      £{total.toFixed(2)}
                    </div>
                  </div>

                  <button
                    className="w-full h-14 bg-black text-white font-black text-lg uppercase tracking-widest rounded-lg border-2 border-black hover:bg-[#bce201] hover:text-black transition-all shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => router.push("/checkout")}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Checkout <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </button>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 flex items-center justify-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                    <Truck className="w-4 h-4 text-black" />
                    Free shipping on orders over £200
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
