"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Phone, ShieldCheck, Sparkles, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

function cn(...a: (string | false | undefined)[]) {
  return a.filter(Boolean).join(" ");
}

const services = [
  { title: "Property Tax Appeals", href: "/services/property-tax", desc: "Lower assessed value for residential & commercial properties." },
  { title: "Medical Bills & Healthcare", href: "/services/medical-bills", desc: "Audit errors & negotiate reductions with providers." },
  { title: "Credit Card Debt & Collections", href: "/services/collections", desc: "Dispute inaccuracies, remove junk fees, stop aggressive collectors." },
  { title: "Business & Startup Counsel", href: "/services/business", desc: "Formation, contracts, governance & on-call counsel." },
  { title: "Contracts & Commercial Agreements", href: "/services/contracts", desc: "Drafting, review, redlines & negotiation." },
  { title: "Real Estate & Leasing", href: "/services/real-estate", desc: "Purchase/sale, leases, diligence & closings." },
  { title: "Mediation & Dispute Resolution", href: "/services/mediation", desc: "Pragmatic settlements that save time & money." },
  { title: "Regulatory & Compliance", href: "/services/compliance", desc: "Policies, training, and risk-based programs." },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openBook = () => window.dispatchEvent(new CustomEvent("open-book", { detail: {} }));

  return (
    <header className={cn("sticky top-0 z-50 border-b transition-all", scrolled ? "backdrop-blur bg-white/80" : "bg-white/95")}>
      {/* Trust mini-bar */}
      

      {/* Main row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg">
            <Image
              src="/logo.svg"
              alt="Cumberland Brooks"
              fill
              className="object-contain"
              onError={({ currentTarget }) => {
                (currentTarget.parentNode as HTMLElement).innerHTML =
                  '<div class="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500"></div>';
              }}
            />
          </div>
          <span className="font-serif text-lg tracking-tight text-slate-900">Cumberland Brooks, LLC</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {/* Services mega-menu */}
          <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50" aria-haspopup="true" aria-expanded={mega}>
              Services <ChevronDown className="h-4 w-4" />
            </button>
            {mega && (
              <div className="absolute left-0 top-full w-[680px] rounded-2xl border bg-white p-4 shadow-xl">
                <div className="grid grid-cols-2 gap-3">
                  {services.map((s) => (
                    <Link key={s.href} href={s.href} className="rounded-xl p-3 hover:bg-slate-50">
                      <p className="font-medium text-slate-900">{s.title}</p>
                      <p className="mt-1 text-xs text-slate-600">{s.desc}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t pt-3 text-right">
                  <Link href="/services" className="text-sm font-medium text-indigo-600 hover:underline">View all services →</Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/results" className="rounded-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Results</Link>
          <Link href="/about" className="rounded-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">About</Link>
          <Link href="/contact" className="rounded-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Contact</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button className="rounded-full px-5" onClick={openBook}>Book a Free Consultation</Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((s) => !s)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="border-t bg-white px-4 py-3 md:hidden">
          <details className="group rounded-xl border p-3">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="text-slate-900">Services</span>
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-2 grid gap-2">
              {services.slice(0, 6).map((s) => (
                <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="rounded-lg p-2 text-sm text-slate-700 hover:bg-slate-50">
                  {s.title}
                </Link>
              ))}
              <Link href="/services" onClick={() => setOpen(false)} className="rounded-lg p-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                View all →
              </Link>
            </div>
          </details>

          <div className="mt-2 grid gap-1">
            <Link href="/results" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">Results</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">About</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">Contact</Link>
            <a href="tel:+13124889775" className="mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-50">
              <Phone className="h-4 w-4" /> (312) 488-9775
            </a>
            <Button
              onClick={() => {
                setOpen(false);
                openBook();
              }}
              className="mt-2 w-full rounded-full"
            >
              Book Free Consultation
            </Button>
          </div>

          <div className="mt-3 grid gap-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-600" /> No upfront fees — you pay from savings</span>
            <span className="inline-flex items-center gap-1"><Gauge className="h-4 w-4 text-indigo-600" /> Avg. kickoff in ~1 week</span>
            <span className="inline-flex items-center gap-1"><Sparkles className="h-4 w-4 text-violet-600" /> HIPAA/PCI-aware intake</span>
          </div>
        </div>
      )}
    </header>
  );
}
