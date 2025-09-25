"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  FileCheck2,
  Clock4,
  Handshake,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Users2,
  Award,
  Briefcase,
  ClipboardCheck,
  Quote,
  Star,
  Scale,
  Gavel,
  Stethoscope,
  Building2,
  Landmark,
  LandPlot,
  FileCheck2 as FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* ----------------------------- Anim helpers ----------------------------- */
const container = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, duration: 0.5 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

/* ========================== BOOK DRAWER (Calendly) ========================== */
function BookDrawer({
  open,
  onOpenChange,
  prefill,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  prefill?: { name?: string; email?: string; address?: string; ptype?: "residential" | "commercial" };
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onOpenChange]);

  if (!open) return null;

  const calendlyBase = "https://calendly.com/narasimhareddyputta999/15min";
  const url = new URL(calendlyBase);
  if (prefill?.name) url.searchParams.set("name", prefill.name);
  if (prefill?.email) url.searchParams.set("email", prefill.email);
  if (prefill?.address) url.searchParams.set("a1", prefill.address);
  if (prefill?.ptype) url.searchParams.set("a2", prefill.ptype);

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />
      <motion.div
        initial={{ x: 520, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 520, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="absolute inset-y-0 right-0 w-full max-w-lg bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-serif text-xl">Book a Free Consultation</h3>
          <button aria-label="Close" onClick={() => onOpenChange(false)} className="rounded-md p-1 hover:bg-slate-50">
            <ChevronRight className="rotate-180" />
          </button>
        </div>
        <div className="p-4">
          <iframe title="Calendly" src={url.toString()} className="h-[70vh] w-full rounded-md border" />
          <p className="mt-3 text-xs text-slate-500">
            Prefer phone? Call <a className="underline" href="tel:+13124889775">(312) 488-9775</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ========================= ADDRESS ESTIMATOR (mini) ========================= */
function AddressEstimator({
  onBook,
}: {
  onBook: (prefill: { email?: string; address?: string; name?: string; ptype: "residential" | "commercial" }) => void;
}) {
  const [ptype, setPtype] = useState<"residential" | "commercial">("residential");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function runEstimate() {
    if (!address) return;
    setLoading(true);
    try {
      const r = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, propertyType: ptype }),
      });
      const data = await r.json();
      setEstimate(data?.estimatedSavings ?? null);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead() {
    if (!email || !address) return;
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, address, ptype, source: "home-hero" }),
    });
    onBook({ email, address, ptype });
  }

  return (
    <div className="rounded-2xl border bg-white/90 p-4 shadow-sm backdrop-blur">
      <div className="mb-2 flex gap-2">
        {(["residential", "commercial"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setPtype(t)}
            className={`rounded-full border px-3 py-1 text-sm ${
              ptype === t ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <input
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 sm:col-span-2"
        />
        <Button onClick={runEstimate} className="rounded-lg">
          {loading ? "Estimating..." : "Get estimate"}
        </Button>
      </div>
      {estimate !== null && (
        <div className="mt-3 grid items-center gap-2 sm:grid-cols-3">
          <p className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-emerald-700 sm:col-span-2">
            <DollarSign className="h-4 w-4" /> Estimated savings: ~${estimate.toLocaleString()} / yr
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email for full report"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button className="rounded-lg" disabled={!email} onClick={submitLead}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================== HERO (law-themed, no white trust block) ================================== */
function Hero({ onOpenBook }: { onOpenBook: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-6 md:pt-8">
      {/* Background: law-focused image + soft gradients */}
      <div className="absolute inset-0 -z-10">
        <Image
          // Law/meeting background
          src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2000&auto=format&fit=crop"
          alt="Attorney meeting reviewing documents"
          fill
          priority
          className="object-cover"
        />
        {/* keep content legible over image */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/55 to-white/30" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_10%_0%,rgba(79,70,229,.18),transparent),radial-gradient(800px_400px_at_90%_10%,rgba(99,102,241,.16),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/85 to-transparent" />
      </div>

      {/* MAIN */}
      <motion.div
        style={{ y }}
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-3 pb-8 md:grid-cols-2 md:gap-8 md:px-6 md:pb-10"
      >
        {/* LEFT */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-2 text-sm font-medium text-indigo-600 md:text-[15px]">
            You only pay when we save you money
          </motion.p>

          <motion.h1
            variants={item}
            className="font-serif text-[34px] leading-tight text-slate-900 md:text-5xl"
          >
            Expert Negotiators. Real Savings.
          </motion.h1>

          <motion.p variants={item} className="mt-2 max-w-lg text-[15px] text-slate-700 md:mt-3 md:text-lg">
            We cut medical bills, reduce property taxes, and resolve collections—backed by transparent
            fees and a results-first mindset.
          </motion.p>

          <motion.div variants={item} className="mt-4 flex flex-wrap gap-3">
            <Button className="rounded-full px-6" onClick={onOpenBook}>
              Book Free Consult <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/services">Explore Services</Link>
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-4 max-w-lg">
            <AddressEstimator onBook={onOpenBook as any} />
          </motion.div>

          <motion.div
            variants={item}
            className="mt-5 grid w-full max-w-lg grid-cols-2 gap-3 text-sm text-slate-700"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-600" /> No upfront fees
            </div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-5 w-5 text-indigo-600" /> HIPAA / PCI aware
            </div>
            <div className="flex items-center gap-2">
              <Clock4 className="h-5 w-5 text-indigo-600" /> Avg. resolution in weeks
            </div>
            <div className="flex items-center gap-2">
              <Handshake className="h-5 w-5 text-indigo-600" /> You only pay from savings
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: law-appropriate photo card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative h-[340px] w-full overflow-hidden rounded-2xl shadow-lg md:h-[420px]"
        >
          <Image
            // Contract signing close-up (legal vibe)
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1500&auto=format&fit=crop"
            alt="Signing a contract during consultation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/65 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
            <p className="text-xs text-slate-600">Our brand vision</p>
            <p className="font-serif text-lg text-slate-900">Relentless advocacy. Transparent results.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* TRUST STRIP — transparent (no white block) */}
      <div className="border-t">
        <div className="mx-auto max-w-6xl px-3 md:px-6">
          <div className="my-3 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50">
                <Award className="h-4 w-4 text-indigo-600" />
              </span>
              Top-rated client satisfaction
            </div>

            <div className="hidden h-6 w-px shrink-0 bg-slate-200 sm:block" />

            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50">
                <Briefcase className="h-4 w-4 text-indigo-600" />
              </span>
              Corporate &amp; individual matters
            </div>

            <div className="hidden h-6 w-px shrink-0 bg-slate-200 sm:block" />

            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50">
                <Users2 className="h-4 w-4 text-indigo-600" />
              </span>
              10k+ billed cases reviewed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* =================== SERVICES: 3/2/4-at-a-time LOOPING CAROUSEL =================== */
const SERVICES = [
  {
    icon: <Gavel className="h-6 w-6" />,
    title: "Credit Card Debt & Collections",
    desc: "Dispute inaccuracies, stop harassment, negotiate pay-for-delete when viable.",
    href: "/services/collections",
    bullets: ["FDCPA/FCRA leverage", "Charge-off settlements", "Credit repair path"],
  },
  {
    icon: <Scale className="h-6 w-6" />,
    title: "Property Tax Appeals (Resi & Commercial)",
    desc: "Valuation analysis, comps, and hearing prep to reduce assessed value fast.",
    href: "/services/property-tax",
    bullets: ["Aggressive comps", "Hearing representation", "Annual re-checks"],
  },
  {
    icon: <Stethoscope className="h-6 w-6" />,
    title: "Medical Bills & Healthcare Costs",
    desc: "Audit CPT codes, catch duplicates & denials, negotiate direct with providers.",
    href: "/services/medical-bills",
    bullets: ["CPT/HCPCS review", "Financial assistance routing", "Provider negotiations"],
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Real Estate & Leasing",
    desc: "CAM reconciliation, lease abstraction, and renewal negotiation to cut costs.",
    href: "/services/real-estate",
    bullets: ["CAM audits", "Rent comps", "Renewal strategy"],
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Contracts & Commercial",
    desc: "Vendor contracts—pricing benchmarks, scope clarity, termination leverage.",
    href: "/services/contracts",
    bullets: ["Benchmark pricing", "SLA enforcement", "Exit clauses"],
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    title: "Government / Municipal Bills",
    desc: "Parking, tolls, fines—reduce penalties and set realistic payment plans.",
    href: "/services/municipal",
    bullets: ["Penalty reductions", "Plan setup", "Documentation fixes"],
  },
  {
    icon: <LandPlot className="h-6 w-6" />,
    title: "Utilities & Telecom Disputes",
    desc: "Back-billing disputes, fee removals, outage credits—across major providers.",
    href: "/services/utilities",
    bullets: ["Back-bill audits", "Fee removals", "Outage credits"],
  },
];

/* -------- responsive slides-per-view (1 / 2 / 4) -------- */
function useSlidesPerView() {
  const [spv, setSpv] = useState(4); // desktop default
  useEffect(() => {
    const calc = () => {
      if (window.innerWidth < 640) setSpv(1);
      else if (window.innerWidth < 1024) setSpv(2);
      else setSpv(4);
    };
    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);
  return spv;
}


/* =================== SERVICES: continuous “train”, 4-up on desktop =================== */
function ServicesSlider() {
  const spv = useSlidesPerView();        // 1 / 2 / 4 (mobile / tablet / desktop)
  const base = useMemo(() => SERVICES, []);
  const baseLen = base.length;

  /* --- layout math (pixel-perfect widths) --- */
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // tighter visual gaps, wider cards
  const GAP = 16; // px between cards
  const [slideW, setSlideW] = useState(0);

  useEffect(() => {
    const compute = () => {
      const frame = frameRef.current;
      if (!frame) return;
      const fw = frame.clientWidth;
      const w = (fw - GAP * (spv - 1)) / spv;
      setSlideW(w);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (frameRef.current) ro.observe(frameRef.current);
    window.addEventListener("resize", compute, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [spv]);

  /* --- build a long track for seamless wrap --- */
  // twice the list so we can wrap mid-scroll without snapping
  const extended = useMemo(() => [...base, ...base], [base]);

  /* --- continuous motion (requestAnimationFrame) --- */
  // target speed: ~ one card every ~1.6s → px/s = (slideW+GAP)/1.6
  const SPEED_SCALE = 0.3; // feel free to tweak 0.8–1.3
  const speedRef = useRef(1);              // multiplier you can nudge with buttons
  const offsetRef = useRef(0);             // current scroll offset in px
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const totalRealWidth = (slideW + GAP) * baseLen;                 // width of a single full set
  const totalExtendedWidth = (slideW + GAP) * extended.length - GAP;

  const tick = (tNow: number) => {
    const track = trackRef.current;
    if (!track || pausedRef.current || !slideW) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    // compute velocity
    const now = performance.now();
    // remember last time on the track element (avoid extra ref)
    const last = (track as any)._lastTime ?? now;
    (track as any)._lastTime = now;
    const dt = Math.max(0, now - last) / 1000; // seconds

    const pxPerSec = ((slideW + GAP) / 1.6) * SPEED_SCALE * speedRef.current;
    offsetRef.current += pxPerSec * dt;

    // wrap around seamlessly
    if (offsetRef.current >= totalRealWidth) {
      offsetRef.current -= totalRealWidth;
    }

    // apply transform
    track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    // hover pause/resume
    const pause = () => { pausedRef.current = true; };
    const resume = () => { (trackRef.current as any)._lastTime = performance.now(); pausedRef.current = false; };
    frame.addEventListener("mouseenter", pause);
    frame.addEventListener("mouseleave", resume);
    frame.addEventListener("focusin", pause);
    frame.addEventListener("focusout", resume);

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      frame.removeEventListener("mouseenter", pause);
      frame.removeEventListener("mouseleave", resume);
      frame.removeEventListener("focusin", pause);
      frame.removeEventListener("focusout", resume);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideW, baseLen]);

  /* --- controls --- */
  const nudge = (dir: -1 | 1) => {
    // gentle nudge: momentarily speed up / slow down
    speedRef.current = dir === 1 ? 1.75 : 0.35;
    window.setTimeout(() => (speedRef.current = 1), 450);
  };

  /* --- active dot (where the “window start” sits) --- */
  const activeDot = slideW ? Math.floor((offsetRef.current / (slideW + GAP)) % baseLen) : 0;

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">What we do</p>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Discover our services</h2>
          <p className="mt-3 text-slate-600">Precise analysis. Aggressive negotiation. Ethical practice.</p>

          {/* micro-trust bar for this section */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> No upfront fees
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
              <FileCheck2 className="h-3.5 w-3.5 text-indigo-600" /> HIPAA / PCI aware
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
              <Clock4 className="h-3.5 w-3.5 text-slate-700" /> Avg. resolution in weeks
            </span>
          </div>
        </div>

        <div className="relative mx-auto mt-8"> {/* full width of container for bigger cards */}
          {/* controls (top-right) */}
          <div className="pointer-events-none absolute -top-12 right-0 hidden gap-2 sm:flex">
            <button
              onClick={() => nudge(-1)}
              className="pointer-events-auto rounded-full border bg-white p-2 shadow-sm transition hover:bg-slate-50"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => nudge(1)}
              className="pointer-events-auto rounded-full border bg-white p-2 shadow-sm transition hover:bg-slate-50"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* frame (no hard max width so cards can breathe) */}
          <div ref={frameRef} className="overflow-hidden rounded-2xl">
            <div
              ref={trackRef}
              className="flex"
              style={{
                gap: `${GAP}px`,
                width: slideW ? `${(slideW + GAP) * extended.length - GAP}px` : "auto",
                transform: "translate3d(0,0,0)",
                willChange: "transform",
              }}
            >
              {extended.map((a, idx) => (
                <article key={`${a.title}-${idx}`} className="shrink-0" style={{ width: slideW ? `${slideW}px` : undefined }}>
                  <div className="relative h-full rounded-2xl border bg-white p-7 shadow-sm transition-shadow hover:shadow-lg">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_20%_-10%,rgba(99,102,241,.12),transparent)] opacity-0 transition-opacity hover:opacity-100" />
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      {a.icon}
                    </div>
                    <h3 className="mt-4 font-serif text-xl text-slate-900">{a.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{a.desc}</p>
                    {a.bullets && (
                      <ul className="mt-3 space-y-1 text-sm text-slate-600">
                        {a.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-5">
                      <Link href={a.href} className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        Learn more <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* dots (map to the real list, not the clones) */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {Array.from({ length: baseLen }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  // jump the offset near that dot’s start without snapping
                  offsetRef.current = i * (slideW + GAP);
                  // reset last time to avoid velocity spike
                  if (trackRef.current) (trackRef.current as any)._lastTime = performance.now();
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${i === activeDot ? "bg-indigo-600" : "bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>

          {/* CTA row */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild className="rounded-full px-6">
              <Link href="/services">See all services</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/contact">Get help</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================ RESULTS STRIP ============================ */
const RESULTS = [
  { k: "$88,400", t: "Medical bill reduction" },
  { k: "$41,200", t: "Commercial property tax win" },
  { k: "$9,900", t: "Collections fees removed" },
  { k: "$15,600", t: "Hospital overcharge reversal" },
  { k: "$26,300", t: "Residential property appeal" },
];

function Marquee() {
  return (
    <div className="relative overflow-hidden">
      <div className="animate-[marquee_22s_linear_infinite] whitespace-nowrap py-2 text-sm text-slate-600 [--gap:3rem]">
        {[...RESULTS, ...RESULTS].map((r, i) => (
          <span key={i} className="mx-[--gap] inline-flex items-center">
            <ClipboardCheck className="mr-2 h-4 w-4 text-emerald-600" /> {r.k} — {r.t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function ResultsStrip() {
  return (
    <section className="relative isolate bg-slate-900 py-16 text-slate-100">
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(60% 60% at 50% 0%, #4f46e5, transparent)" }} />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-indigo-300">Our impact</p>
            <h2 className="font-serif text-3xl">Real wins our clients can feel</h2>
            <p className="mt-2 max-w-xl text-slate-300">
              We measure success in dollars saved and stress removed. Explore representative outcomes across practice areas.
            </p>
          </div>
          <Button asChild variant="secondary" className="rounded-full bg-white text-slate-900 hover:bg-slate-100">
            <Link href="/results">View detailed results</Link>
          </Button>
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-2">
          <Marquee />
        </div>
      </div>
    </section>
  );
}

/* ================================ TESTIMONIALS ================================ */
function Testimonials() {
  const quotes = [
    { name: "R.M., Chicago", text: "They reduced my hospital bill by more than half and explained every step. Zero pressure, only results." },
    { name: "K.S., Henderson", text: "Our property tax appeal saved us tens of thousands. Professional, precise, and fast." },
    { name: "J.L., Las Vegas", text: "Collections errors removed and my score bounced back. Wish I called sooner." },
  ];
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">What clients say</p>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Proven. Trusted. Human.</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Card key={i} className="relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="absolute -left-2 -top-2 h-10 w-10 rotate-12 text-indigo-200" />
                <div className="mb-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700">{q.text}</p>
                <p className="mt-4 text-sm font-medium text-slate-900">{q.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== “YOUR CASE TEAM, ON DAY ONE” (no photos) ==================== */
function CaseTeam() {
  const blocks = [
    { h: "Attorney-led strategy", d: "Risk-aware game plan aligned to outcomes and jurisdictional rules.", icon: <ShieldCheck className="h-5 w-5" /> },
    { h: "Analyst audit", d: "Line-item review, comps, CPT/HCPCS checks, and valuation models.", icon: <ClipboardCheck className="h-5 w-5" /> },
    { h: "Negotiator on point", d: "Relentless but professional contact with providers, agencies, and boards.", icon: <Handshake className="h-5 w-5" /> },
    { h: "Weekly updates", d: "Transparent timelines; you approve moves before we act.", icon: <Clock4 className="h-5 w-5" /> },
  ];
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">Your team</p>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Your case team, on day one</h2>
          <p className="mt-3 text-slate-600">No headshots. Real roles that move your matter forward—immediately.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {blocks.map((b, i) => (
            <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">{b.icon}</div>
              <p className="font-medium text-slate-900">{b.h}</p>
              <p className="mt-2 text-sm text-slate-600">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================== FAQ (denser, 6 Qs) =================================== */
function FAQSection() {
  const faqs = [
    {
      q: "Do I pay anything upfront?",
      a: "For savings matters (property tax, medical bill reductions, many collections) there are no upfront fees—our compensation comes from the savings we secure. Other engagements use transparent flat or clearly-scoped fees.",
    },
    {
      q: "How long does a typical case take?",
      a: "Many matters resolve within weeks. Appeals tied to government calendars can take longer; we set expectations on day one and provide weekly updates.",
    },
    {
      q: "Will this hurt my credit?",
      a: "Our approach is credit-aware. When supported by law and evidence we pursue deletions or corrected reporting. We never advise steps that jeopardize critical credit goals.",
    },
    {
      q: "Is my information secure?",
      a: "Yes. We use encrypted document intake, least-privilege access, and HIPAA/PCI-aware workflows.",
    },
    {
      q: "Can you work outside my state?",
      a: "We cover many U.S. markets directly and collaborate with local counsel when required by practice rules—seamlessly for you.",
    },
    {
      q: "What happens in the free case review?",
      a: "You share documents securely. We map savings/risk, timelines, and pricing options. You decide if/when to proceed—no pressure.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">Questions</p>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">FAQ</h2>
        </div>
        <div className="mt-6 space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="overflow-hidden rounded-xl border bg-white">
                <button className="flex w-full items-center justify-between px-4 py-3 text-left" onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="font-medium text-slate-900">{f.q}</span>
                  {isOpen ? <ChevronLeft className="h-5 w-5 rotate-90 text-slate-500" /> : <ChevronRight className="h-5 w-5 text-slate-500" />}
                </button>
                {isOpen && <div className="px-4 pb-3 text-slate-600">{f.a}</div>}
              </div>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Button asChild className="rounded-full">
            <Link href="/contact">Still have questions? Talk to us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============================== CONTACT (refined) ============================== */
function ContactSection() {
  return (
    <section className="relative bg-white py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 md:grid-cols-2 md:px-6">
        <div>
          <p className="kicker text-indigo-600">Contact us</p>
          <h2 className="font-serif text-3xl text-slate-900">Have questions or ready to start saving?</h2>
          <p className="mt-3 text-slate-600">Reach out—no pressure, no upfront fees. Just honest guidance and real results.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Call</p>
              <a className="mt-1 block text-lg font-medium text-slate-900" href="tel:+13124889775">
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-indigo-600" /> (312) 488-9775
                </span>
              </a>
              <p className="text-xs text-slate-500">Weekdays 9–6 (CT)</p>
            </div>
            <div className="rounded-2xl border bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Email</p>
              <a className="mt-1 block text-lg font-medium text-slate-900" href="mailto:info@cumberlandbrooks.com">
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-600" /> info@cumberlandbrooks.com
                </span>
              </a>
              <p className="text-xs text-slate-500">Replies within 1 business day</p>
            </div>
            <div className="rounded-2xl border bg-slate-50 p-4 sm:col-span-2">
              <p className="text-sm text-slate-600">Office</p>
              <p className="mt-1 text-slate-900">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-600" /> 752 S. 6th St., Ste. R, Las Vegas, NV 89101
                </span>
              </p>
              <p className="text-xs text-slate-500">By appointment only</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">Open contact page</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/results">See results</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-slate-50/50 p-6 shadow-sm">
          <p className="text-sm text-slate-600">Prefer to pick a time instantly?</p>
          <div className="mt-2 h-[360px] overflow-hidden rounded-md border">
            <iframe
              title="Calendly-inline"
              src="https://calendly.com/narasimhareddyputta999/15min?hide_gdpr_banner=1&background_color=ffffff"
              className="h-full w-full"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">We’ll confirm and send reminders. No spam.</p>
        </div>
      </div>
    </section>
  );
}

/* ========================= STICKY CTA (no Navbar/Footer here) ========================= */
function StickyCTA({ onOpenBook }: { onOpenBook: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3" role="region" aria-label="Quick actions">
      <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border bg-white/90 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="px-3 text-sm text-slate-700">No upfront fees. Average resolution in weeks.</div>
        <div className="flex items-center gap-2">
          <a
            href="tel:+13124889775"
            className="hidden rounded-full border px-4 py-2 text-sm text-slate-800 transition-colors hover:bg-slate-50 sm:block"
            aria-label="Call (312) 488-9775"
          >
            (312) 488-9775
          </a>
          <Button onClick={onOpenBook} className="rounded-full">
            Book Free Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ================================= PAGE ================================= */
export default function Page() {
  const [drawer, setDrawer] = useState(false);
  const [prefill, setPrefill] = useState<{ name?: string; email?: string; address?: string; ptype?: "residential" | "commercial" }>();

  return (
    <main className="text-slate-800">
      <Hero onOpenBook={() => setDrawer(true)} />
      <ServicesSlider />
      <ResultsStrip />
      <Testimonials />
      <CaseTeam />
      <FAQSection />
      <ContactSection />
      <StickyCTA onOpenBook={() => setDrawer(true)} />
      <BookDrawer open={drawer} onOpenChange={setDrawer} prefill={prefill} />
    </main>
  );
}
