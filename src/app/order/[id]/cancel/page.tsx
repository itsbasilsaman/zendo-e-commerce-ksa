"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    XCircle,
    Package,
    MapPin,
    User,
    RefreshCw,
    ShoppingCart,
    Truck,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import api from "@/src/services/api";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface OrderItem {
    _id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface Order {
    _id: string;
    contact: { fullName: string; email: string; phone: string };
    shipping: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
}

export default function OrderCancelPage() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retrying, setRetrying] = useState(false);

    useEffect(() => {
        if (!id) return;
        // Sync payment state first, then fetch the updated order
        api
            .get(`/order/${id}/sync-payment`)
            .catch(() => { }) // non-blocking — proceed even if sync fails
            .finally(() => {
                api
                    .get(`/order/${id}`)
                    .then((res) => setOrder(res.data?.data?.order ?? res.data?.data ?? res.data))
                    .catch(() => setError("Could not load order details."))
                    .finally(() => setLoading(false));
            });
    }, [id]);

    const handleRetryPayment = async () => {
        if (!id) return;
        setRetrying(true);
        try {
            const res = await api.post(`/order/${id}/retry-payment`);
            const url = res.data?.data?.checkoutUrl ?? res.data?.checkoutUrl;
            if (url) {
                window.location.href = url;
            } else {
                toast.error("Could not retrieve payment link. Please try again.");
            }
        } catch {
            toast.error("Retry failed. Please contact support.");
        } finally {
            setRetrying(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans border-t-2 border-black selection:bg-[#bce201] selection:text-black relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

            <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl relative z-10">
                {/* Cancel Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-300 border-2 border-black rounded-xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#000] mb-8 flex flex-col sm:flex-row items-center gap-4"
                >
                    <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center shrink-0">
                        <XCircle className="w-9 h-9 text-black" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                            Payment Cancelled
                        </h1>
                        <p className="font-bold text-black/70 mt-1">
                            Your payment was cancelled. You can retry at any time — your order is saved.
                        </p>
                        {id && (
                            <p className="text-xs font-mono font-bold bg-black/10 rounded px-2 py-0.5 mt-2 inline-block">
                                Order ID: {id}
                            </p>
                        )}
                    </div>
                </motion.div>

                {loading && (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                )}

                {error && (
                    <div className="border-2 border-red-400 bg-red-50 rounded-xl p-6 text-red-700 font-bold text-center">
                        {error}
                    </div>
                )}

                {order && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="space-y-6"
                    >
                        {/* Items */}
                        <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
                            <div className="bg-black p-4">
                                <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                                    <Package className="text-[#bce201]" /> Order Items
                                </h2>
                            </div>
                            <div className="divide-y-2 divide-dashed divide-gray-200">
                                {order.items.map((item) => (
                                    <div key={item._id} className="flex gap-4 p-4">
                                        <div className="w-14 h-14 rounded-lg border-2 border-black overflow-hidden bg-gray-100 shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold">{item.name}</h3>
                                            <p className="text-xs text-gray-500 font-medium">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-black text-black whitespace-nowrap">
                                            SAR {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Price breakdown */}
                            <div className="p-4 border-t-2 border-dashed border-gray-200 space-y-2 text-sm font-medium">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-bold">SAR {order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-bold">SAR {order.shippingCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-bold">SAR {order.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t-2 border-black">
                                    <span className="text-lg font-black uppercase">Total</span>
                                    <span className="text-2xl font-black">SAR {order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact & Shipping */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 bg-[#bce201] rounded-lg border-2 border-black flex items-center justify-center">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-black uppercase tracking-wide text-sm">Contact</h3>
                                </div>
                                <p className="font-bold">{order.contact.fullName}</p>
                                <p className="text-sm text-gray-600">{order.contact.email}</p>
                                <p className="text-sm text-gray-600">{order.contact.phone}</p>
                            </div>

                            <div className="bg-white rounded-xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 bg-[#bce201] rounded-lg border-2 border-black flex items-center justify-center">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-black uppercase tracking-wide text-sm">Ships To</h3>
                                </div>
                                <p className="font-bold">{order.shipping.address}</p>
                                <p className="text-sm text-gray-600">
                                    {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                                </p>
                                <p className="text-sm text-gray-600">{order.shipping.country}</p>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleRetryPayment}
                                disabled={retrying}
                                className="flex-1 flex items-center justify-center gap-2 h-12 bg-black text-white font-bold uppercase tracking-wider rounded-lg border-2 border-black hover:bg-[#bce201] hover:text-black transition-all shadow-[4px_4px_0px_0px_#bce201] hover:shadow-none hover:translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {retrying ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Opening Checkout...</>
                                ) : (
                                    <><RefreshCw className="w-5 h-5" /> Retry Payment</>
                                )}
                            </button>
                            <Link
                                href="/cart"
                                className="flex-1 flex items-center justify-center gap-2 h-12 bg-white text-black font-bold uppercase tracking-wider rounded-lg border-2 border-black hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-y-1"
                            >
                                <ShoppingCart className="w-5 h-5" /> Return to Cart
                            </Link>
                        </div>
                    </motion.div>
                )}
            </main>

        </div>
    );
}
