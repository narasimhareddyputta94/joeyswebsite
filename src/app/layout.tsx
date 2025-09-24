// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASticky from "@/components/CTASticky";
import TrustBar from "@/components/TrustBar";

export const metadata: Metadata = {
  title: "Cumberland Brooks, LLC — Expert Negotiators. Real Savings.",
  description:
    "We cut medical bills, reduce property taxes, and resolve collections with no upfront fees. Book a free consultation.",
  openGraph: {
    title: "Cumberland Brooks, LLC — Expert Negotiators. Real Savings.",
    description:
      "We cut medical bills, reduce property taxes, and resolve collections with no upfront fees.",
    url: "https://your-domain.com",
    siteName: "Cumberland Brooks, LLC",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  icons: { icon: "/favicon.ico" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Cumberland Brooks, LLC",
  url: "https://your-domain.com",
  areaServed: "US",
  address: {
    "@type": "PostalAddress",
    streetAddress: "752 S. 6th St., Ste. R",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89101",
    addressCountry: "US",
  },
  telephone: "+1-312-488-9775",
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-slate-800">
        <Navbar />
        <TrustBar /> {/* 👈 the scrolling message bar lives below the navbar */}
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CTASticky />
        <Suspense fallback={null}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </Suspense>
      </body>
    </html>
  );
}
