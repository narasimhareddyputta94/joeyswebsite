"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Scale,
  Gavel,
  Building2,
  Stethoscope,
  FileText,
  ChevronRight,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";

const CAL_URL = "https://calendly.com/narasimhareddyputta999/15min";

/** Dispatch global 'open-book' for the right-side drawer listeners; fallback to Calendly tab */
function openBook() {
  try {
    const evt = new CustomEvent("open-book", { cancelable: true, detail: {} });
    const notPrevented = window.dispatchEvent(evt);
    if (notPrevented) {
      // if no page-level listener is mounted, open Calendly in a new tab
      window.open(CAL_URL, "_blank", "noopener,noreferrer");
    }
  } catch {
    window.open(CAL_URL, "_blank", "noopener,noreferrer");
  }
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    // padding-bottom uses the sticky offset only when the sticky is present
    <footer
      className="mt-16 border-t bg-white text-slate-700"
      style={{ paddingBottom: "var(--sticky-offset, 0px)" }}
    >
      {/* Top */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand + Value */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2" aria-label="Cumberland Brooks, LLC — Home">
              <div className="relative h-9 w-9">
                <Image
                  src="/logo.png"
                  alt="Cumberland Brooks Logo"
                  fill
                  sizes="36px"
                  priority
                  className="object-contain"
                />
              </div>
              <p className="font-serif text-xl text-slate-900">Cumberland Brooks, LLC</p>
            </Link>

            <p className="mt-3 text-sm leading-relaxed">
              Results-driven advocacy in medical bill reductions, property tax appeals, and collections.
              <span className="ml-1 font-medium text-slate-900">
                You only pay when we save you money.
              </span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                <ShieldCheck className="h-4 w-4" aria-hidden /> No upfront fees
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700">
                <Scale className="h-4 w-4" aria-hidden /> Ethical &amp; transparent
              </span>
            </div>

            {/* Contact quick actions */}
            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-indigo-600" aria-hidden />
                <a className="hover:text-slate-900" href="tel:+13124889775" aria-label="Call (312) 488-9775">
                  (312) 488-9775
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-600" aria-hidden />
                <a
                  className="hover:text-slate-900"
                  href="mailto:info@cumberlandbrooks.com"
                  aria-label="Email info@cumberlandbrooks.com"
                >
                  info@cumberlandbrooks.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-600" aria-hidden />
                <span>752 S. 6th St., Ste. R, Las Vegas, NV 89101</span>
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild className="rounded-full">
                <Link href="/contact" aria-label="Contact our team">Contact us</Link>
              </Button>

              {/* Changed to a real button that opens the right-side drawer (or Calendly fallback) */}
              <Button
                variant="outline"
                className="rounded-full inline-flex items-center"
                onClick={openBook}
                aria-label="Book a free consultation"
              >
                Book free consult <ChevronRight className="ml-1 h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="mb-3 font-medium text-slate-900">Services</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/medical-bills" className="flex items-center gap-2 hover:text-slate-900">
                  <Stethoscope className="h-4 w-4 text-slate-400" aria-hidden /> Medical Bills &amp; Healthcare
                </Link>
              </li>
              <li>
                <Link href="/services/property-tax" className="flex items-center gap-2 hover:text-slate-900">
                  <Building2 className="h-4 w-4 text-slate-400" aria-hidden /> Property Tax Appeals
                </Link>
              </li>
              <li>
                <Link href="/services/collections" className="flex items-center gap-2 hover:text-slate-900">
                  <Gavel className="h-4 w-4 text-slate-400" aria-hidden /> Credit &amp; Collections
                </Link>
              </li>
              <li>
                <Link href="/services/contracts" className="flex items-center gap-2 hover:text-slate-900">
                  <FileText className="h-4 w-4 text-slate-400" aria-hidden /> Contracts &amp; Commercial
                </Link>
              </li>
              <li>
                <Link href="/services/real-estate" className="flex items-center gap-2 hover:text-slate-900">
                  <Building2 className="h-4 w-4 text-slate-400" aria-hidden /> Real Estate &amp; Leasing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-3 font-medium text-slate-900">Company</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-slate-900">About</Link></li>
              <li><Link href="/results" className="hover:text-slate-900">Results</Link></li>
              <li><Link href="/services" className="hover:text-slate-900">All Services</Link></li>
              <li><Link href="/faq" className="hover:text-slate-900">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-slate-900">Contact</Link></li>
            </ul>

            {/* Social */}
            <div className="mt-4 flex gap-3">
              <Link
                aria-label="LinkedIn"
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border p-2 transition-colors hover:bg-slate-50"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                aria-label="Twitter (X)"
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border p-2 transition-colors hover:bg-slate-50"
              >
                <Twitter className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                aria-label="Facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border p-2 transition-colors hover:bg-slate-50"
              >
                <Facebook className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                aria-label="YouTube"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border p-2 transition-colors hover:bg-slate-50"
              >
                <Youtube className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Newsletter / Compliance */}
          <div>
            <p className="mb-3 font-medium text-slate-900">Stay in the loop</p>
            <p className="text-sm">
              Occasional updates on appeals windows, billing rules, and practical savings tactics.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex items-center gap-2"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Email address"
                required
                inputMode="email"
                autoComplete="email"
              />
              <Button type="submit" className="rounded-lg">Join</Button>
            </form>
            <p className="mt-2 text-xs text-slate-500">No spam — unsubscribe anytime.</p>

            <div className="mt-6 space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden />
                HIPAA/PCI-aware workflows
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden />
                Data encrypted in transit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom legal bar */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-slate-500 md:flex-row md:px-6">
          <p>© {year} Cumberland Brooks, LLC. All rights reserved.</p>
          <nav className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="hover:text-slate-800">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-800">Terms</Link>
            <Link href="/accessibility" className="hover:text-slate-800">Accessibility</Link>
            <Link href="/disclaimer" className="hover:text-slate-800">Disclaimer</Link>
            <Link href="/compliance" className="hover:text-slate-800">Compliance</Link>
            <Link href="/sitemap" className="hover:text-slate-800">Sitemap</Link>
          </nav>
        </div>

        {/* Compliance note */}
        <div className="mx-auto max-w-7xl px-4 pb-8 text-[11px] leading-relaxed text-slate-500 md:px-6">
          <p>
            Cumberland Brooks, LLC is not a law firm and does not provide legal advice. Information on this site is for general informational purposes only and may not reflect the latest regulatory changes. Results vary and are not guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}
