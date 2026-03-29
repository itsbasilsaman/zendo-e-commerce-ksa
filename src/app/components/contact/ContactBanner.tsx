/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import ThemeInput from "./ThemeInput";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

import { useLanguage } from "@/src/context/LanguageContext";

export default function ContactBanner() {
  const { isArabic } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <section className="min-h-screen bg-white text-black font-sans relative overflow-hidden py-16 md:py-24 border-t-2 border-black">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* --- Left Column: Info --- */}
          <div className="order-1 lg:order-1 space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <span className="inline-block py-1 px-3 rounded-full bg-[#bce201] text-black border-2 border-black text-xs font-bold tracking-widest uppercase shadow-[4px_4px_0px_0px_#000]">
                {isArabic ? "اتصل بالدعم" : "Contact Support"}
              </span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                {isArabic ? "لنتحدث في" : "Let's Talk"} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">
                  {isArabic ? "الأعمال." : "Business."}
                </span>
              </h1>
              <p
                className={cn(
                  "text-lg text-gray-600 font-medium max-w-md border-l-4 border-[#bce201] pl-6 py-2",
                  isArabic ? "border-r-4 border-l-0 pr-6 pl-0" : ""
                )}
              >
                {isArabic ? "هل لديك أسئلة حول طلبات الجملة أو سلاسل التوريد؟ فريقنا المخصص لخدمات الشركات في الرياض جاهز لمساعدتك." : "Have questions about bulk orders or supply chains? Our dedicated B2B team in Riyadh is ready to assist you."}
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#bce201] group-hover:shadow-[2px_2px_0px_0px_#bce201] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase">{isArabic ? "راسلنا" : "Email Us"}</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    {isArabic ? "للاستفسارات العامة" : "For general inquiries"}
                  </p>
                  <a
                    href="mailto:info@zendo.com"
                    dir="ltr"
                    className="text-lg font-bold hover:text-[#bce201] hover:underline transition-colors inline-block"
                  >
                    info@zendohypermarket.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#bce201] group-hover:shadow-[2px_2px_0px_0px_#bce201] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase">{isArabic ? "اتصل بنا" : "Call Us"}</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    {isArabic ? "الاثنين - السبت، 8 صباحاً - 9 مساءً" : "Mon-Sat, 8am - 9pm"}
                  </p>
                  <a
                    href="tel:+96612345678"
                    dir="ltr"
                    className="text-lg font-bold hover:text-[#bce201] hover:underline transition-colors inline-block"
                  >
                    +966 12 345 6789
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#bce201] group-hover:shadow-[2px_2px_0px_0px_#bce201] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase">{isArabic ? "زيارة المقر الرئيسي" : "Visit HQ"}</h3>
                  <p className="text-gray-600 text-sm mb-1">{isArabic ? "حي العليا" : "Olaya District"}</p>
                  <p className="text-lg font-bold">
                    {isArabic ? "طريق الملك فهد، الرياض، المملكة العربية السعودية" : "King Fahd Road, Riyadh, KSA"}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 rounded-lg border-2 border-black bg-black text-white flex items-center justify-center hover:bg-[#bce201] hover:text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000]"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* --- Right Column: Form --- */}
          <div className="order-2 lg:order-2">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 shadow-[12px_12px_0px_0px_#bce201] relative">
              {/* Decorative Corner Icon */}
              <div className="absolute -top-6 -right-6 bg-black text-[#bce201] p-4 rounded-full border-2 border-black hidden md:block">
                <MessageSquare size={32} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ThemeInput
                    id="fullName"
                    name="fullName"
                    label={isArabic ? "الاسم الكامل" : "Full Name"}
                    placeholder={isArabic ? "أحمد محمد" : "John Doe"}
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <ThemeInput
                    id="email"
                    name="email"
                    label={isArabic ? "البريد الإلكتروني" : "Email Address"}
                    type="email"
                    placeholder={isArabic ? "ahmed@example.com" : "john@example.com"}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ThemeInput
                    id="phone"
                    name="phone"
                    label={isArabic ? "رقم الهاتف" : "Phone Number"}
                    type="tel"
                    placeholder="+966..."
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <ThemeInput
                    id="subject"
                    name="subject"
                    label={isArabic ? "الموضوع" : "Subject"}
                    placeholder={isArabic ? "استفسار عن طلب جملة" : "Bulk Order Inquiry"}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2 group">
                  <label
                    htmlFor="message"
                    className={cn("text-sm font-bold uppercase tracking-wider text-black group-focus-within:text-[#bce201] transition-colors", isArabic ? "text-right block w-full" : "")}
                  >
                    {isArabic ? "رسالة" : "Message"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={isArabic ? "أخبرنا عن متطلباتك..." : "Tell us about your requirements..."}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full p-4 bg-white text-black font-medium",
                      "border-2 border-black rounded-lg resize-none",
                      "placeholder:text-gray-400 focus:outline-none",
                      "transition-all duration-200 ease-out",
                      "focus:shadow-[4px_4px_0px_0px_#bce201] focus:-translate-y-1"
                    )}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn("w-full bg-black text-white h-14 rounded-lg font-bold text-lg uppercase tracking-wider border-2 border-black hover:bg-[#bce201] hover:text-black transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 active:translate-y-0 active:shadow-none flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed", isArabic ? "flex-row-reverse" : "")}
                >
                  {isSubmitting ? (
                    <>{isArabic ? "جاري المعالجة..." : "Processing..."}</>
                  ) : (
                    <>
                      {isArabic ? "إرسال رسالة" : "Send Message"} <Send size={20} className={isArabic ? "rotate-180" : ""} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
