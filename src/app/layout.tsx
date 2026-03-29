import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, IBM_Plex_Sans_Arabic } from "next/font/google";
import Navbar from "@/src/app/components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { ReduxStoreProvider } from "../redux/provider";
import HydrateStore from "../redux/hydrate/hydrateStore";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "../context/LanguageContext";
import SmoothScroll from "@/src/app/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Zendo Hypermarket Saudia B2B | Wholesale & Bulk Orders",
  description:
    "Zendo Hypermarket - Leading B2B supplier in Saudi Arabia for wholesale, bulk orders, and supply chain solutions. Contact our Riyadh team for business inquiries.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Zendo Hypermarket Saudia B2B",
    description:
      "Wholesale, bulk orders, and supply chain solutions for businesses in Saudi Arabia. Contact Zendo Hypermarket Riyadh B2B team.",
    url: "https://zendoksa.com",
    siteName: "Zendo Hypermarket Saudia B2B",
    images: [
      {
        url: "/zendo-hypermarket.png",
        width: 1200,
        height: 630,
        alt: "Zendo Hypermarket B2B Saudia",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zendo Hypermarket Saudia B2B",
    description:
      "Wholesale, bulk orders, and supply chain solutions for businesses in Saudi Arabia.",
    images: ["/zendo-hypermarket.png"],
    site: "@zendoksa",
  },
  manifest: "/site.webmanifest",
  keywords: [
    "Zendo Hypermarket",
    "B2B",
    "Wholesale",
    "Bulk Orders",
    "Saudi Arabia",
    "Riyadh",
    "Supply Chain",
    "Business",
    "Supermarket",
    "Distributor",
    "Supplier",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var lang = localStorage.getItem('zendo-lang');
                  if (lang === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.documentElement.setAttribute('lang', 'ar');
                    var s = document.createElement('style');
                    s.id = 'lang-hide';
                    s.textContent = 'body { opacity: 0 !important; }';
                    document.head.appendChild(s);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#bce201" />
        <meta property="og:image" content="/zendo-hypermarket.png" />
        <meta property="og:title" content="Zendo Hypermarket Saudia B2B" />
        <meta
          property="og:description"
          content="Wholesale, bulk orders, and supply chain solutions for businesses in Saudi Arabia. Contact Zendo Hypermarket Riyadh B2B team."
        />
        <meta property="og:url" content="https://zendoksa.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zendo Hypermarket Saudia B2B" />
        <meta
          name="twitter:description"
          content="Wholesale, bulk orders, and supply chain solutions for businesses in Saudi Arabia."
        />
        <meta name="twitter:image" content="/zendo-hypermarket.png" />
        <meta
          name="keywords"
          content="Zendo Hypermarket, B2B, Wholesale, Bulk Orders, Saudi Arabia, Riyadh, Supply Chain, Business, Supermarket, Distributor, Supplier"
        />
      </head>
      <body className={`antialiased ${montserrat.variable} ${ibmPlexSansArabic.variable}`}>
        <SmoothScroll>
          <LanguageProvider>
            <ReduxStoreProvider>
              <HydrateStore />
              <Navbar />
              <Toaster position="top-right" reverseOrder={false} />
              {children}
              <Footer />
            </ReduxStoreProvider>
          </LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
