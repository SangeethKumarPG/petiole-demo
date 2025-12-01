import type { Metadata } from "next";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";

import { Quicksand } from "next/font/google";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
// import { get } from "http";
// import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://petiolefashion.com"),
  title: {
    default: "Petiole Fashion | Online Women's Fashion Boutique",
    template: "%s | Petiole Fashion",
  },
  description:
    "Petiole Fashion is a modern women's fashion boutique offering dresses, co-ords, tops and party wear outfits online in India. Discover stylish, comfortable looks for every occasion.",
  keywords: [
    "Petiole Fashion",
    "online fashion boutique",
    "women's clothing boutique",
    "women's dresses online",
    "co-ord sets for women",
    "party wear dresses",
    "western wear for women",
    "fashion boutique in India",
  ],
  openGraph: {
    title: "Petiole Fashion | Online Women's Fashion Boutique",
    description:
      "Shop trendy dresses, co-ords, tops and party wear outfits at Petiole Fashion. Stylish women's clothing boutique with curated collections for every occasion.",
    url: "https://petiolefashion.com",
    siteName: "Petiole Fashion",
    images: [
      {
        url: "/Petiole.png", 
        width: 1200,
        height: 630,
        alt: "Petiole Fashion boutique banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Petiole Fashion | Online Women's Fashion Boutique",
    description:
      "Discover trendy women's outfits, dresses and co-ords at Petiole Fashion.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const categories = await getAllCategories();
  return (
    <ClerkProvider dynamic>
      <html lang="en" className={quicksand.variable}>
        <body className="font-sans">
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}

          <main>
            <Header />
            {children}
          </main>
          <footer>
            <Footer />  
          </footer>
          <SanityLive />
          <ChatWidget/>
        </body>
      </html>
    </ClerkProvider>
  );
}
