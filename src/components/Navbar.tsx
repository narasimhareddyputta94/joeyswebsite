"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  ShieldCheck,
  Sparkles,
  Gauge,
  Search,
  Clock4,
  Briefcase,
  Building2,
  FileText,
  Gavel,
  Stethoscope,
  Handshake,
  Landmark,
  LandPlot,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function cn(...a: (string | false | undefined)[]) {
  return a.filter(Boolean).join(" ");
}

/** Services config (icon + copy = instant scannability) */
const services = [
  {
    title: "Property Tax Appeals",
    href: "/services/property-tax",
    desc: "Lower assessed value for residential & commercial properties.",
    icon: Building2,
    bullets: ["Aggressive comps", "Hearing representation", "Annual re-checks"],
  },
  {
    title: "Medical Bills & Healthcare",
    href: "/services/medical-bills",
    desc: "Audit CPT codes, catch duplicates & denials, negotiate reductions.",
    icon: Stethoscope,
    bullets: ["CPT/HCPCS review", "Financial aid routing", "Provider negotiations"],
  },
  {
    title: "Credit Card Debt & Collections",
    href: "/services/collections",
    desc: "Dispute inaccuracies, remove junk fees, stop aggressive collectors.",
    icon: Gavel,
    bullets: ["FDCPA/FCRA leverage", "Pay-for-delete (when viable)", "Score recovery path"],
  },
  {
    title: "Business & Startup Counsel",
    href: "/services/business",
    desc: "Formation, contracts, governance & on-call counsel.",
    icon: Briefcase,
    bullets: ["Entity setup", "Cap table basics", "Outside GC retainer"],
  },
  {
    title: "Contracts & Commercial Agreements",
    href: "/services/contracts",
    desc: "Drafting, review, redlines & negotiation.",
    icon: FileText,
    bullets: ["Benchmark pricing", "SLA enforcement", "Exit/renewal strategy"],
  },
  {
    title: "Real Estate & Leasing",
    href: "/services/real-estate",
    desc: "Purchase/sale, leases, diligence & closings.",
    icon: Landmark,
    bullets: ["Lease abstraction", "CAM audits", "Renewal leverage"],
  },
  {
    title: "Mediation & Dispute Resolution",
    href: "/services/mediation",
    desc: "Pragmatic settlements that save time & money.",
    icon: Handshake,
    bullets: ["Neutral facilitation", "Confidential process", "Time/cost control"],
  },
  {
    title: "Regulatory & Compliance",
    href: "/services/compliance",
    desc: "Policies, training, and risk-based programs.",
    icon: ShieldCheck,
    bullets: ["HIPAA/PCI aware", "Policy drafting", "Staff training"],
  },
  {
    title: "Utilities & Telecom Disputes",
    href: "/services/utilities",
    desc: "Back-billing disputes, fee removals, outage credits.",
    icon: LandPlot,
    bullets: ["Back-bill audits", "Fee removals", "Outage credits"],
  },
];

/** Brand with safe fallback */
function BrandMark() {
  const [broken, setBroken] = useState(false);
  return (
    <div className="relative h-8 w-8 overflow-hidden rounded-lg" aria-label="Cumberland Brooks">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500" aria-hidden />
      {!broken && (
        <Image
          src="/logo.svg"
          alt="Cumberland Brooks"
          fill
          priority
          sizes="32px"
          className="object-contain"
          onError={() => setBroken(true)}
        />
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [q, setQ] = useState("");
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const openTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // hover intent
  const scheduleOpen = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (openTimer.current) window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setMega(true), 60);
  };
  const scheduleClose = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 120);
  };

  // outside click / Esc
  useEffect(() => {
    if (!mega) return;
    const onDocDown = (e: MouseEvent | PointerEvent) => {
      const t = e.target as Node;
      if (megaRef.current && !megaRef.current.contains(t) && !triggerRef.current?.contains(t)) {
        setMega(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setMega(false);
    document.addEventListener("pointerdown", onDocDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("pointerdown", onDocDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [mega]);

  const openBook = () => window.dispatchEvent(new CustomEvent("open-book", { detail: {} }));

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return services;
    return services.filter((s) => s.title.toLowerCase().includes(t) || s.desc.toLowerCase().includes(t));
  }, [q]);

  return (
    <header className={cn("sticky top-0 z-50 transition-all border-b", scrolled ? "backdrop-blur bg-white/80" : "bg-white/95")}>
      {/* Trust mini-bar */}
      <div className="hidden border-b bg-white/60 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs text-slate-600 md:px-6">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-600" /> No upfront fees — pay from savings</span>
            <span className="hidden sm:inline-flex items-center gap-1"><Gauge className="h-4 w-4 text-indigo-600" /> Avg. kickoff in ~1 week</span>
            <span className="hidden lg:inline-flex items-center gap-1"><Sparkles className="h-4 w-4 text-violet-600" /> HIPAA/PCI-aware intake</span>
          </div>
          <a href="tel:+13124889775" className="inline-flex items-center gap-2 hover:text-slate-800">
            <Phone className="h-4 w-4" /> (312) 488-9775
          </a>
        </div>
      </div>

      {/* Main row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <BrandMark />
          <span className="font-serif text-lg tracking-tight text-slate-900">Cumberland Brooks, LLC</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Services mega-menu */}
          <div className="relative" onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}>
            <button
              ref={triggerRef}
              type="button"
              className={cn("inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm", mega ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50")}
              aria-haspopup="menu"
              aria-expanded={mega}
              aria-controls="mega-services"
              onClick={() => setMega((s) => !s)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") setMega(true);
                if (e.key === "Escape") setMega(false);
              }}
            >
              Services <ChevronDown className={cn("h-4 w-4 transition-transform", mega && "rotate-180")} />
            </button>

            <AnimatePresence>
              {mega && (
                <motion.div
                  id="mega-services"
                  role="menu"
                  ref={megaRef}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 w-[min(94vw,980px)] md:w-[min(90vw,1040px)] rounded-2xl border bg-white/95 p-4 md:p-5 shadow-2xl ring-1 ring-black/5 backdrop-blur"
                >
                  {/* HEADER (search only — removed extra Book button) */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex w-full items-center gap-2 rounded-full border bg-white px-3 py-2">
                      <Search className="h-4 w-4 text-slate-400" />
                      <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search services…"
                        className="w-full text-sm outline-none placeholder:text-slate-400"
                        aria-label="Search services"
                      />
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="mt-4 grid grid-cols-12 gap-4 max-h-[58vh] overflow-y-auto pr-1">
                    {/* Services grid */}
                    <div className="col-span-12 lg:col-span-8">
                      <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                        {filtered.map((s) => {
                          const Icon = s.icon;
                          return (
                            <Link
                              key={s.href}
                              href={s.href}
                              role="menuitem"
                              className="group rounded-xl border p-3 hover:border-slate-300 hover:bg-slate-50"
                              onClick={() => setMega(false)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate font-medium text-slate-900">{s.title}</p>
                                  <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">{s.desc}</p>
                                  {s.bullets && (
                                    <ul className="mt-2 hidden list-disc pl-4 text-[11px] text-slate-600 sm:block">
                                      {s.bullets.slice(0, 2).map((b, i) => <li key={i}>{b}</li>)}
                                    </ul>
                                  )}
                                </div>
                              </div>
                              <div className="mt-2 inline-flex items-center text-xs font-medium text-indigo-600 group-hover:translate-x-0.5">
                                Learn more <ChevronRight className="ml-1 h-3.5 w-3.5" />
                              </div>
                            </Link>
                          );
                        })}
                        {filtered.length === 0 && (
                          <div className="col-span-2 rounded-xl border p-6 text-center text-sm text-slate-600 xl:col-span-3">
                            No matches.{" "}
                            <Link href="/services" className="text-indigo-600 underline" onClick={() => setMega(false)}>
                              See all services
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right rail: outcomes & info */}
                    <div className="col-span-12 lg:col-span-4">
                      <div className="rounded-2xl border bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">Outcomes</p>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li className="flex items-center justify-between gap-3">
                            <span className="text-slate-700">Medical bill reduction</span>
                            <span className="font-semibold text-emerald-700">$88,400</span>
                          </li>
                          <li className="flex items-center justify-between gap-3">
                            <span className="text-slate-700">Commercial tax win</span>
                            <span className="font-semibold text-emerald-700">$41,200</span>
                          </li>
                          <li className="flex items-center justify-between gap-3">
                            <span className="text-slate-700">Collections fees removed</span>
                            <span className="font-semibold text-emerald-700">$9,900</span>
                          </li>
                        </ul>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                          <div className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-600" /> No upfront fees</div>
                          <div className="inline-flex items-center gap-1"><Clock4 className="h-4 w-4 text-indigo-600" /> Avg. weeks to resolve</div>
                        </div>
                        <Button className="mt-4 w-full rounded-full" onClick={openBook}>
                          Book Free Consultation
                        </Button>
                      </div>

                      <div className="mt-3 rounded-2xl border p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">Need a human?</p>
                        <a href="tel:+13124889775" className="mt-2 inline-flex items-center gap-2 text-sm text-slate-800 hover:underline">
                          <Phone className="h-4 w-4" /> (312) 488-9775
                        </a>
                        <p className="mt-1 text-xs text-slate-500">Mon–Fri, 9am–6pm CT</p>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href="/services"
                      className="text-sm font-medium text-indigo-600 hover:underline"
                      onClick={() => setMega(false)}
                    >
                      View all services →
                    </Link>
                    <div className="text-xs text-slate-500">Transparent, ethical, results-driven.</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/results" className="rounded-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Results</Link>
          <Link href="/about" className="rounded-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">About Us</Link>
          <Link href="/contact" className="rounded-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Contact</Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button className="rounded-full px-5" onClick={openBook}>
            Book a Free Consultation
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((s) => !s)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -12, opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="border-t bg-white px-4 py-3 md:hidden"
          >
            {/* Services accordion */}
            <details className="group rounded-xl border p-3">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-slate-900">Services</span>
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2 grid gap-2">
                {services.slice(0, 7).map((s) => (
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
              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-600" /> No upfront fees — pay from savings</span>
              <span className="inline-flex items-center gap-1"><Gauge className="h-4 w-4 text-indigo-600" /> Avg. kickoff in ~1 week</span>
              <span className="inline-flex items-center gap-1"><Sparkles className="h-4 w-4 text-violet-600" /> HIPAA/PCI-aware intake</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
