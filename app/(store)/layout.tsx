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
import WhatsAppButton from "@/components/WhatsappButton";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://petiolefashion.com"),
  title: {
    default: "Best Boutique in Dubai | Petiole Fashion",
    template: "%s | Petiole Fashion",
  },
  description:
    "Petiole Fashion is a leading women's boutique offering stylish dresses, co-ords, tops, party wear, and designer outfits. One of the best boutiques in Dubai for trendy women's clothing.",
  keywords: [
    "Best boutique in Dubai",
    "Dubai ladies boutique",
    "Women’s boutique Dubai",
    "Designer dresses Dubai",
    "Petiole Fashion",
    "Dubai fashion boutique",
    "Ladies clothing Dubai",
    "Boutique online Dubai",
    "Party wear Dubai",
    "Co-ord sets Dubai",
    "Western wear Dubai"
  ],
  openGraph: {
    title: "Best Boutique in Dubai | Petiole Fashion",
    description:
      "Shop premium women's fashion at Petiole Fashion. A top boutique in Dubai offering designer dresses, co-ords, western wear and party wear for all occasions.",
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Boutique in Dubai | Petiole Fashion",
    description:
      "Discover stylish women's outfits, dresses and co-ords from Dubai’s top boutique.",
    images: ["/Petiole.png"],
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
  verification: {
    google: "Em6FMWn8kLlIrHXbeZb6j-VHX5aJCOPGD9DuqgZYaSc",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <ChatWidget />
          <WhatsAppButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
