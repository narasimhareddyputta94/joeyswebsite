// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASticky from "@/components/CTASticky";
import TrustBar from "@/components/TrustBar";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <body className="text-slate-800 antialiased">
        {/* Accessibility: skip straight to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-indigo-600 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>

        {/* Page shell (sticky footer) */}
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50">
            <Navbar />
            {/* Scrolling message bar directly under the navbar */}
            <TrustBar />
          </header>

          {/* Main content grows */}
          <main id="main-content" className="flex-1">
            {children}
          </main>

          <Footer />
        </div>

        {/* Sticky CTA floats above everything */}
        <CTASticky />

        {/* SEO structured data */}
        <Suspense fallback={null}>
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </Suspense>
      </body>
    </html>
  );
}
