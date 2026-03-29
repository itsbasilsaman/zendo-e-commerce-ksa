export type Locale = "en" | "ar";

export const translations: Record<string, Record<Locale, string>> = {
  // --- Navigation ---
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "من نحن" },
  "nav.whyUs": { en: "Why Us", ar: "لماذا نحن" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },

  // --- Header ---
  "header.support": { en: "Support", ar: "الدعم" },
  "header.trackOrder": { en: "Track Order", ar: "تتبع الطلب" },
  "header.myAccount": { en: "My Account", ar: "حسابي" },
  "header.customerSupport": { en: "Customer Support", ar: "دعم العملاء" },
  "header.menu": { en: "MENU", ar: "القائمة" },
  "header.copyright": { en: "© 2024 Zendo Market", ar: "© 2024 زيندو ماركت" },
  "header.location": { en: "Riyadh, Saudi Arabia", ar: "الرياض، المملكة العربية السعودية" },

  // --- Marquee ---
  "marquee.grandOpening": { en: "GRAND OPENING SALE", ar: "تخفيضات الافتتاح الكبير" },
  "marquee.freshDates": { en: "FRESH SUKARI DATES ARRIVED", ar: "وصلت تمور السكري الطازجة" },
  "marquee.freeDelivery": { en: "FREE DELIVERY ON ORDERS OVER 200 SAR", ar: "توصيل مجاني للطلبات فوق 200 ريال" },

  // --- Products ---
  "products.popular": { en: "Popular Products", ar: "المنتجات الشائعة" },
  "products.all": { en: "All", ar: "الكل" },
  "products.loading": { en: "Loading products...", ar: "جاري تحميل المنتجات..." },
  "products.noProducts": { en: "No products found in this category.", ar: "لم يتم العثور على منتجات في هذه الفئة." },
  "products.tryDifferent": { en: "Try selecting a different category or subcategory.", ar: "حاول اختيار فئة أو فئة فرعية مختلفة." },
  "products.addToCart": { en: "Add to Cart", ar: "أضف للسلة" },
  "products.added": { en: "Added", ar: "تمت الإضافة" },
  "products.brand": { en: "Brand", ar: "العلامة التجارية" },
  "products.uncategorized": { en: "Uncategorized", ar: "غير مصنف" },
  "products.product": { en: "Product", ar: "منتج" },
  "products.quickView": { en: "Quick View", ar: "عرض سريع" },
  "products.addToWishlist": { en: "Add to Wishlist", ar: "أضف للمفضلة" },

  // --- Category Showcase ---
  "showcase.catalog": { en: "Catalog 2024", ar: "كتالوج 2024" },
  "showcase.shopBy": { en: "Shop By", ar: "تسوق حسب" },
  "showcase.category": { en: "Category", ar: "الفئة" },
  "showcase.description": {
    en: "Explore our curated collection of essentials. Quality products delivered to your doorstep with style.",
    ar: "استكشف مجموعتنا المختارة من الأساسيات. منتجات عالية الجودة تصل إلى باب منزلك بأناقة.",
  },
  "showcase.viewAll": { en: "View All Products", ar: "عرض جميع المنتجات" },
  "showcase.explore": { en: "Explore the best", ar: "اكتشف أفضل" },
  "showcase.products": { en: "products.", ar: "المنتجات." },

  // --- Carousel ---
  "carousel.dailyDeals": { en: "Daily Deals", ar: "عروض يومية" },
  "carousel.subscribe": { en: "Subscribe", ar: "اشترك" },
  "carousel.emailPlaceholder": { en: "Your email address", ar: "بريدك الإلكتروني" },
  "carousel.onTheList": { en: "You're on the list!", ar: "تم تسجيلك بنجاح!" },
  "carousel.slide1.title": { en: "Fresh Market Big Discount", ar: "خصومات كبيرة على السوق الطازج" },
  "carousel.slide1.subtitle": { en: "Save up to 50% off on your first bulk order.", ar: "وفر حتى 50% على طلبك الأول بالجملة." },
  "carousel.slide1.tag": { en: "Super Sale", ar: "تخفيضات كبرى" },
  "carousel.slide2.title": { en: "Organic Produce Special", ar: "عروض خاصة على المنتجات العضوية" },
  "carousel.slide2.subtitle": { en: "Premium organic vegetables directly from Al-Qassim.", ar: "خضروات عضوية فاخرة مباشرة من القصيم." },
  "carousel.slide2.tag": { en: "100% Organic", ar: "عضوي 100%" },
  "carousel.slide3.title": { en: "Farm Fresh Goodness", ar: "طازج من المزرعة" },
  "carousel.slide3.subtitle": { en: "From the farm to your table in under 24 hours.", ar: "من المزرعة إلى طاولتك في أقل من 24 ساعة." },
  "carousel.slide3.tag": { en: "Local Farms", ar: "مزارع محلية" },

  // --- Testimonials ---
  "testimonials.badge": { en: "Community Love", ar: "حب المجتمع" },
  "testimonials.title1": { en: "Trusted by Families", ar: "موثوق من العائلات" },
  "testimonials.title2": { en: "Across the Kingdom", ar: "في جميع أنحاء المملكة" },
  "testimonials.verified": { en: "Verified", ar: "موثق" },
  "testimonials.q1": {
    en: "The fresh dates section is absolutely unmatched in Riyadh. The quality of the Sukari dates is just perfect every single time.",
    ar: "قسم التمور الطازجة لا مثيل له في الرياض. جودة تمور السكري مثالية في كل مرة.",
  },
  "testimonials.q2": {
    en: "Finally, a supermarket that actually understands 'fresh'. The vegetables look like they were picked an hour ago. Zendo is my go-to.",
    ar: "أخيراً، سوبر ماركت يفهم معنى 'الطازج'. الخضروات تبدو كأنها قُطفت قبل ساعة. زيندو هو خياري الأول.",
  },
  "testimonials.q3": {
    en: "Great prices on imported goods. I found all the spices I needed for my restaurant here. Highly recommended for bulk buying.",
    ar: "أسعار رائعة على البضائع المستوردة. وجدت جميع التوابل التي أحتاجها لمطعمي هنا. أنصح به بشدة للشراء بالجملة.",
  },
  "testimonials.q4": {
    en: "The staff is incredibly helpful and the aisles are wide and clean. Shopping here is actually a relaxing experience.",
    ar: "الموظفون مساعدون بشكل لا يصدق والممرات واسعة ونظيفة. التسوق هنا تجربة مريحة فعلاً.",
  },
  "testimonials.q5": {
    en: "Zendo's bakery is a hidden gem. Their fresh samoon bread in the morning is the best way to start the day.",
    ar: "مخبز زيندو جوهرة مخفية. خبز الصمون الطازج صباحاً هو أفضل طريقة لبدء اليوم.",
  },

  // --- Footer ---
  "footer.freshness": { en: "Freshness", ar: "الطزاجة" },
  "footer.dontMiss": { en: "Don't Miss the", ar: "لا تفوّت" },
  "footer.newsletter": {
    en: "Subscribe to Zendo B2B updates. Get exclusive deals on bulk dates and imported goods directly to your inbox.",
    ar: "اشترك في تحديثات زيندو للأعمال. احصل على عروض حصرية على التمور بالجملة والسلع المستوردة مباشرة في بريدك.",
  },
  "footer.emailPlaceholder": { en: "Enter your email...", ar: "أدخل بريدك الإلكتروني..." },
  "footer.subscribe": { en: "Subscribe", ar: "اشترك" },
  "footer.brandDescription": {
    en: "Leading B2B Hypermarket Solutions in Saudi Arabia. We connect businesses with authentic local produce and seamless global supply chains.",
    ar: "حلول الهايبر ماركت الرائدة للأعمال في المملكة العربية السعودية. نربط الشركات بالمنتجات المحلية الأصيلة وسلاسل التوريد العالمية.",
  },
  "footer.quickLinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.home": { en: "Home", ar: "الرئيسية" },
  "footer.shop": { en: "Shop", ar: "المتجر" },
  "footer.freshDates": { en: "Fresh Dates", ar: "تمور طازجة" },
  "footer.aboutUs": { en: "About Us", ar: "من نحن" },
  "footer.contact": { en: "Contact", ar: "اتصل بنا" },
  "footer.contactUs": { en: "Contact Us", ar: "اتصل بنا" },
  "footer.headquarters": { en: "Headquarters", ar: "المقر الرئيسي" },
  "footer.address": {
    en: "King Fahd Road, Olaya District\nRiyadh 12214, Saudi Arabia",
    ar: "طريق الملك فهد، حي العليا\nالرياض 12214، المملكة العربية السعودية",
  },
  "footer.emailUs": { en: "Email Us", ar: "راسلنا" },
  "footer.callSupport": { en: "Call Support", ar: "اتصل بالدعم" },
  "footer.allRights": { en: "Zendo Hypermarket B2B. All rights reserved.", ar: "زيندو هايبر ماركت للأعمال. جميع الحقوق محفوظة." },
  "footer.privacyPolicy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "footer.termsOfService": { en: "Terms of Service", ar: "شروط الخدمة" },

  // --- Product Detail Page ---
  "detail.shop": { en: "Shop", ar: "المتجر" },
  "detail.category": { en: "Category", ar: "الفئة" },
  "detail.type": { en: "Type", ar: "النوع" },
  "detail.brand": { en: "Brand", ar: "العلامة التجارية" },
  "detail.totalPrice": { en: "Total Price", ar: "السعر الإجمالي" },
  "detail.addToCart": { en: "Add to Cart", ar: "أضف للسلة" },
  "detail.inCart": { en: "In Cart", ar: "في السلة" },
  "detail.verifiedProduct": { en: "(Verified Product)", ar: "(منتج موثق)" },
  "detail.loading": { en: "Loading Product...", ar: "جاري تحميل المنتج..." },
  "detail.off": { en: "OFF", ar: "خصم" },
  "detail.productName": { en: "Product Name", ar: "اسم المنتج" },

  // --- Cart Page ---
  "cart.title": { en: "Your Cart", ar: "سلة التسوق" },
  "cart.itemsReady": { en: "Items ready for checkout", ar: "عناصر جاهزة للدفع" },
  "cart.clearCart": { en: "Clear Cart", ar: "تفريغ السلة" },
  "cart.emptyTitle": { en: "Your cart is empty", ar: "سلتك فارغة" },
  "cart.emptyMessage": { en: "Looks like you haven't added anything yet.", ar: "يبدو أنك لم تضف أي شيء بعد." },
  "cart.remove": { en: "Remove", ar: "حذف" },
  "cart.orderSummary": { en: "Order Summary", ar: "ملخص الطلب" },
  "cart.subtotal": { en: "Subtotal", ar: "المجموع الفرعي" },
  "cart.shipping": { en: "Shipping", ar: "الشحن" },
  "cart.tax": { en: "Tax", ar: "الضريبة" },
  "cart.total": { en: "Total", ar: "الإجمالي" },
  "cart.includingVat": { en: "Including VAT", ar: "شامل الضريبة" },
  "cart.checkout": { en: "Checkout", ar: "الدفع" },
  "cart.processing": { en: "Processing...", ar: "جاري المعالجة..." },
  "cart.freeShipping": { en: "Free shipping on orders over £200", ar: "شحن مجاني للطلبات فوق 200 ريال" },

  // --- Wishlist Page ---
  "wishlist.title": { en: "Your Wishlist", ar: "قائمة المفضلة" },
  "wishlist.itemsSaved": { en: "Items saved", ar: "عناصر محفوظة" },
  "wishlist.item": { en: "Item", ar: "عنصر" },
  "wishlist.addAllToCart": { en: "Add All to Cart", ar: "أضف الكل للسلة" },
  "wishlist.clearAll": { en: "Clear All", ar: "مسح الكل" },
  "wishlist.emptyTitle": { en: "Your wishlist is empty", ar: "قائمة المفضلة فارغة" },
  "wishlist.emptyMessage": { en: "Start adding products you love!", ar: "ابدأ بإضافة المنتجات التي تحبها!" },
  "wishlist.continueShopping": { en: "Continue Shopping", ar: "متابعة التسوق" },
  "wishlist.addedCheck": { en: "Added ✓", ar: "تمت الإضافة ✓" },
};
