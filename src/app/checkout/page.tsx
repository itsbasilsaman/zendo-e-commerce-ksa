"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  MapPin,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux";
import { clearCart } from "@/src/redux/cart/slice";
import api from "@/src/services/api";
import toast from "react-hot-toast";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    // Contact Info
    fullName: "",
    email: "",
    phone: "",

    // Address
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Payment
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const cartItems = useSelector((s: RootState) => s.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    }

    if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
      if (!formData.country.trim()) newErrors.country = "Country is required";
    }

    if (currentStep === 3) {
      if (!formData.cardNumber.trim())
        newErrors.cardNumber = "Card number is required";
      if (!formData.cardName.trim())
        newErrors.cardName = "Cardholder name is required";
      if (!formData.expiryDate.trim())
        newErrors.expiryDate = "Expiry date is required";
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }

    if (!validateStep(3)) return;

    setIsProcessing(true);

    try {
      const payload = {
        contact: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        items: cartItems.map(({ product, quantity }) => ({
          productId: product._id,
          name: product.name.en,
          price: product.price,
          quantity,
          image: product.image,
        })),
        subtotal,
        shippingCost: shipping,
        tax,
        total,
      };

      const res = await api.post("/order", payload);

      dispatch(clearCart());

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
      });
      setStep(1);

      toast.success("Order placed successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.error?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { number: 1, title: "Contact", icon: User },
    { number: 2, title: "Address", icon: MapPin },
    { number: 3, title: "Payment", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans border-t-2 border-black selection:bg-[#bce201] selection:text-black relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-[#bce201] rounded-full border border-black"></span>
            Complete your order
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center font-black transition-all duration-300",
                      step >= s.number
                        ? "bg-[#bce201] border-black shadow-[3px_3px_0px_0px_#000]"
                        : "bg-white border-gray-300 text-gray-400"
                    )}
                  >
                    {step > s.number ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <s.icon className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs md:text-sm font-bold mt-2 uppercase tracking-wide",
                      step >= s.number ? "text-black" : "text-gray-400"
                    )}
                  >
                    {s.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2 transition-all duration-300",
                      step > s.number ? "bg-[#bce201]" : "bg-gray-300"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 xl:gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-xl border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_#000]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#bce201] rounded-lg border-2 border-black flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black uppercase">
                      Contact Information
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={cn(
                          "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                          errors.fullName ? "border-red-500" : "border-black"
                        )}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={cn(
                          "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                          errors.email ? "border-red-500" : "border-black"
                        )}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={cn(
                          "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                          errors.phone ? "border-red-500" : "border-black"
                        )}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Shipping Address */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-xl border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_#000]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#bce201] rounded-lg border-2 border-black flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black uppercase">
                      Shipping Address
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={cn(
                          "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                          errors.address ? "border-red-500" : "border-black"
                        )}
                        placeholder="123 Main Street, Apt 4B"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                            errors.city ? "border-red-500" : "border-black"
                          )}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs font-bold mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                            errors.state ? "border-red-500" : "border-black"
                          )}
                          placeholder="NY"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs font-bold mt-1">
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                            errors.zipCode ? "border-red-500" : "border-black"
                          )}
                          placeholder="10001"
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-xs font-bold mt-1">
                            {errors.zipCode}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Country *
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                            errors.country ? "border-red-500" : "border-black"
                          )}
                          placeholder="United States"
                        />
                        {errors.country && (
                          <p className="text-red-500 text-xs font-bold mt-1">
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-xl border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_#000]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#bce201] rounded-lg border-2 border-black flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black uppercase">
                      Payment Details
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={cn(
                          "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                          errors.cardNumber ? "border-red-500" : "border-black"
                        )}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={cn(
                          "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                          errors.cardName ? "border-red-500" : "border-black"
                        )}
                        placeholder="John Doe"
                      />
                      {errors.cardName && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.cardName}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                            errors.expiryDate
                              ? "border-red-500"
                              : "border-black"
                          )}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-500 text-xs font-bold mt-1">
                            {errors.expiryDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#bce201] transition-all",
                            errors.cvv ? "border-red-500" : "border-black"
                          )}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-xs font-bold mt-1">
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#bce201] shrink-0 mt-0.5" />
                      <p className="text-xs font-medium text-gray-600">
                        Your payment information is encrypted and secure. We
                        never store your full card details.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="flex-1 h-12 bg-white text-black font-bold uppercase tracking-wider rounded-lg border-2 border-black hover:bg-gray-50 transition-all shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-y-1 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 h-12 bg-black text-white font-bold uppercase tracking-wider rounded-lg border-2 border-black hover:bg-[#bce201] hover:text-black transition-all shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-y-1 flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="flex-1 h-12 bg-black text-white font-bold uppercase tracking-wider rounded-lg border-2 border-black hover:bg-[#bce201] hover:text-black transition-all shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Place Order <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#bce201] overflow-hidden">
                <div className="bg-black p-4 border-b-2 border-black">
                  <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Package className="text-[#bce201]" /> Order Summary
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  {/* Cart Items */}
                  <div className="space-y-4">
                    {cartItems.map(({ product, quantity }) => (
                      <div key={product._id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg border-2 border-black overflow-hidden bg-gray-100 shrink-0">
                          <img
                            src={product.image}
                            alt={product.name.en}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm">
                            {product.name.en}
                          </h3>
                          <p className="text-xs text-gray-500 font-medium">
                            Qty: {quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-black">
                            SAR {(product.price * quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-black/10 border-t-2 border-dashed border-gray-300" />

                  {/* Price Breakdown */}
                  <div className="space-y-3 text-sm font-medium">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold text-black">
                        SAR{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-bold text-black">
                        SAR{shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-bold text-black">
                        SAR{tax.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-black/10 border-t-2 border-dashed border-gray-300" />

                  {/* Total */}
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
                      SAR{total.toFixed(2)}
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 flex items-center justify-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                    <Truck className="w-4 h-4 text-black" />
                    Free shipping on orders over SAR 200
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
