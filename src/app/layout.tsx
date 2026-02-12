import type { Metadata } from "next";
import "./globals.css";
import { Wix_Madefor_Display } from "next/font/google";
import Navbar from "@/src/app/components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { ReduxStoreProvider } from "../redux/provider";
import HydrateStore from "../redux/hydrate/hydrateStore";
import { Toaster } from "react-hot-toast";

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
    url: "https://your-domain.com", // Replace with your actual domain
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
    site: "@zendohypermarket", // Replace with your Twitter handle
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

const wixMadeforDisplay = Wix_Madefor_Display({
  subsets: ["latin"],
  variable: "--font-wix-madefor-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
        <meta property="og:url" content="https://your-domain.com" />
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
      <body className={`antialiased ${wixMadeforDisplay.variable}  `}>
        <ReduxStoreProvider>
          <HydrateStore />
          <Navbar />
          <Toaster position="top-right" reverseOrder={false} />
          {children}
          <Footer />
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
