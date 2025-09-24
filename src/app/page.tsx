"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@googlemaps/js-api-loader";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Scale, ShieldCheck, Gavel, MessageSquare, Phone, Users2, Clock4, Sparkles,
  ChevronRight, CheckCircle2, Award, Briefcase, FileCheck2, Mail, MapPin, Menu,
  X, Star, Quote, Plus, Minus, Loader2, DollarSign, Building2, Building, Handshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* ========================= animation helpers ========================= */
const container = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.6, ease: "easeOut" } },
};
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
function cn(...a: (string | undefined | false)[]) { return a.filter(Boolean).join(" "); }

/* ========================= BOOK DRAWER (Calendly) ========================= */
function BookDrawer({
  open, onOpenChange, prefill,
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
  // Prefill
  if (prefill?.name) url.searchParams.set("name", prefill.name);
  if (prefill?.email) url.searchParams.set("email", prefill.email);
  // If you set up custom questions in Calendly, you can read a1/a2 there
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
          <button aria-label="Close" onClick={() => onOpenChange(false)}><X /></button>
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

/* ========================= NAVBAR ========================= */
function Navbar({ onOpenBook }: { onOpenBook: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={cn("fixed inset-x-0 top-0 z-50 transition-all", scrolled ? "backdrop-blur bg-white/70 shadow-sm" : "bg-transparent")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500" />
          <span className="font-serif text-xl tracking-tight text-slate-900">Cumberland Brooks, LLC</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/services" className="text-slate-700 hover:text-slate-900">Services</Link>
          <Link href="/results" className="text-slate-700 hover:text-slate-900">Results</Link>
          <Link href="/faq" className="text-slate-700 hover:text-slate-900">FAQ</Link>
          <Link href="/contact" className="text-slate-700 hover:text-slate-900">Contact</Link>
        </nav>
        <div className="hidden md:block">
          <Button className="rounded-full px-5" onClick={onOpenBook}>Book Free Consultation</Button>
        </div>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((s) => !s)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white/90 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/results" onClick={() => setOpen(false)}>Results</Link>
            <Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Button className="rounded-full" onClick={onOpenBook}>Free Consultation</Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========== ADDRESS ESTIMATOR (hero widget with lead capture) ========== */
function AddressEstimator({
  onBook,
}: {
  onBook: (prefill: { email?: string; address?: string; name?: string; ptype: "residential" | "commercial" }) => void;
}) {
  const [ptype, setPtype] = useState<"residential" | "commercial">("residential");
  const [address, setAddress] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [result, setResult] = useState<null | {
    addressNormalized: string;
    estimatedSavings: number;
    inputs: { marketValue: number; assessedValue: number; taxRate: number };
    disclaimer: string;
  }>(null);

  // lead fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);

  // Google Places Autocomplete
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key || !inputRef.current) return;
    const loader = new Loader({ apiKey: key, libraries: ["places"] });
    loader.load().then(() => {
      const ac = new google.maps.places.Autocomplete(inputRef.current!, { types: ["address"], fields: ["formatted_address"] });
      ac.addListener("place_changed", () => {
        const p = ac.getPlace();
        setAddress(p?.formatted_address || inputRef.current!.value);
      });
    });
  }, []);

  async function estimate() {
    if (!address) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const r = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, propertyType: ptype }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Failed to estimate");
      setResult(data);
      setStep(2);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function submitLead() {
    if (!email || !address) return;
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, address, ptype, estimate: result, consent, middleName: "" }),
      });
      setStep(3);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* property tabs */}
      <div className="mb-2 flex gap-2">
        {(["residential", "commercial"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setPtype(t)}
            className={`rounded-full border px-3 py-1 text-sm ${ptype === t ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 hover:bg-slate-50"}`}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Step 1: address input */}
      {step === 1 && (
        <>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex w-full items-stretch gap-2 rounded-full border bg-white p-1 shadow-md">
            <div className="flex items-center pl-3 text-slate-500"><MapPin className="h-5 w-5" /></div>
            <input
              ref={inputRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              className="w-full rounded-full px-3 py-3 outline-none"
            />
            <Button onClick={estimate} className="rounded-full px-5">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Savings Estimate"}
            </Button>
          </motion.div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </>
      )}

      {/* Step 2: estimate + lead capture */}
      {step === 2 && result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mt-3 rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{result.addressNormalized}</p>
            <div className="mt-2 flex items-end gap-3">
              <DollarSign className="h-9 w-9 text-emerald-600" />
              <div>
                <p className="text-2xl font-semibold text-emerald-700">~${result.estimatedSavings.toLocaleString()} / yr</p>
                <p className="text-xs text-slate-600">Estimated property tax savings</p>
              </div>
            </div>
            <div className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
              <div className="rounded-xl border bg-slate-50 p-3">
                <p className="text-slate-500">Assessed value</p>
                <p className="font-medium">${Math.round(result.inputs.assessedValue).toLocaleString()}</p>
              </div>
              <div className="rounded-xl border bg-slate-50 p-3">
                <p className="text-slate-500">Market value</p>
                <p className="font-medium">${Math.round(result.inputs.marketValue).toLocaleString()}</p>
              </div>
              <div className="rounded-xl border bg-slate-50 p-3">
                <p className="text-slate-500">Tax rate</p>
                <p className="font-medium">{(result.inputs.taxRate * 100).toFixed(2)}%</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">{result.disclaimer}</p>

            {/* lead fields */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-white p-2">
                  <input
                    type="email"
                    placeholder="Email to send full report"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
                <div className="rounded-lg border bg-white p-2">
                  <input type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full outline-none" />
                </div>
                <input type="text" name="middleName" style={{ display: "none" }} onChange={() => {}} />
                <label className="col-span-2 mt-1 flex items-center gap-2 text-xs text-slate-600">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  I agree to be contacted about my estimate. No spam—just results.
                </label>
              </div>
              <div className="flex items-start justify-end">
                <Button onClick={submitLead} className="rounded-full px-5" disabled={!email || loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Email me the full report"}
                </Button>
              </div>
            </div>

            {/* book now CTA */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                <ShieldCheck className="h-4 w-4" /> No upfront fees
              </span>
              <Button variant="outline" className="rounded-full" onClick={() => onBook({ email, address, ptype })}>
                Book Free Consultation
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: thanks → push to book */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mt-3 rounded-2xl border bg-white p-5 shadow-sm">
            <p className="font-serif text-lg">Report on the way ✅</p>
            <p className="mt-1 text-slate-600">Want to fast-track results? Book a free call.</p>
            <div className="mt-3 flex gap-2">
              <Button className="rounded-full" onClick={() => onBook({ email, address, ptype })}>Book Free Consultation</Button>
              <Button variant="outline" className="rounded-full" onClick={() => setStep(1)}>Check another address</Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ========================= HERO ========================= */
function Hero({ onOpenBook }: { onOpenBook: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-24">
      {/* BG Visual */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_-10%,rgba(59,130,246,0.35),transparent),radial-gradient(50%_50%_at_20%_10%,rgba(99,102,241,0.35),transparent)]" />
        <Image
          src="https://images.unsplash.com/photo-1549921296-3a6b05c8c147?q=80&w=1600&auto=format&fit=crop"
          alt="Conference room"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <motion.div style={{ y }} className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-28 md:grid-cols-2 md:px-6">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-3 font-medium text-indigo-600">You only pay when we save you money</motion.p>
          <motion.h1 variants={item} className="font-serif text-4xl leading-tight text-slate-900 md:text-5xl">
            Expert Negotiators. Real Savings.
          </motion.h1>
          <motion.p variants={item} className="mt-4 max-w-xl text-lg text-slate-700">
            We cut medical bills, reduce property taxes, and resolve collections—backed by transparent fees and a results-first mindset.
          </motion.p>
          <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
            <Button className="rounded-full px-6" onClick={onOpenBook}>
              Book Free Consult <ChevronRight className="ml-1" />
            </Button>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/services">Explore Services</Link>
            </Button>
          </motion.div>

          {/* Estimator */}
          <motion.div variants={item} className="mt-6 max-w-xl">
            <AddressEstimator
              onBook={(prefill) => {
                window.dispatchEvent(new CustomEvent("open-book", { detail: prefill }));
              }}
            />
          </motion.div>

          <motion.div variants={item} className="mt-8 grid w-full max-w-xl grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> No upfront fees</div>
            <div className="flex items-center gap-2"><FileCheck2 className="h-5 w-5" /> HIPAA / PCI aware</div>
            <div className="flex items-center gap-2"><Clock4 className="h-5 w-5" /> Avg. resolution in weeks</div>
            <div className="flex items-center gap-2"><Handshake className="h-5 w-5" /> You only pay from savings</div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative h-[480px] w-full overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=1500&auto=format&fit=crop"
            alt="Attorney at work"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/70 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-4 left-4 rounded-xl bg-white/80 p-4 backdrop-blur">
            <p className="text-sm text-slate-600">Our brand vision</p>
            <p className="font-serif text-xl text-slate-900">Relentless advocacy. Transparent results.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* trust bar */}
      <div className="border-t bg-white/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 py-4 sm:grid-cols-3 md:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-600"><Award className="h-4 w-4" /> Top-rated client satisfaction</div>
          <div className="flex items-center gap-2 text-sm text-slate-600"><Briefcase className="h-4 w-4" /> Corporate & individual matters</div>
          <div className="flex items-center gap-2 text-sm text-slate-600"><Users2 className="h-4 w-4" /> 10k+ billed cases reviewed</div>
        </div>
      </div>
    </section>
  );
}

/* ===================== PRACTICE AREAS SNAPSHOT ===================== */
const AREAS = [
  { icon: <Gavel className="h-6 w-6" />, title: "Credit Card Debt & Collections", desc: "We fight inaccurate reporting, inflated fees, and aggressive collectors—so you regain control.", href: "/services/collections" },
  { icon: <Scale className="h-6 w-6" />, title: "Property Tax Appeals (Resi & Commercial)", desc: "From valuation to hearings—our analysts secure the maximum savings.", href: "/services/property-tax" },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Medical Bills & Healthcare Costs", desc: "Audits for errors, overcharges, and duplicate fees. We negotiate with providers.", href: "/services/medical-bills" },
];

function PracticeAreas() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">What we do</p>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Discover our services</h2>
          <p className="mt-3 text-slate-600">Precise analysis. Aggressive negotiation. Ethical practice.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a, i) => (
            <motion.a key={i} href={a.href} whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_20%_-10%,rgba(99,102,241,.15),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">{a.icon}</div>
              <h3 className="mt-4 font-serif text-xl text-slate-900">{a.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{a.desc}</p>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600">Learn more <ChevronRight className="ml-1 h-4 w-4" /></div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild className="rounded-full px-6">
            <Link href="/services">See all services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ===================== RESULTS HIGHLIGHTS ===================== */
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
            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" /> {r.k} — {r.t}
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
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-2"><Marquee /></div>
      </div>
    </section>
  );
}

/* ========================= TESTIMONIALS ========================= */
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
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
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

/* ======================= PROCESS + INDUSTRIES ======================= */
function Process() {
  const steps = [
    { icon: <Phone className="h-5 w-5" />, t: "Free case review", d: "Share documents securely; we assess opportunities fast." },
    { icon: <MessageSquare className="h-5 w-5" />, t: "Strategy & authorization", d: "Clear plan; you approve before we act." },
    { icon: <ShieldCheck className="h-5 w-5" />, t: "Negotiate & resolve", d: "We coordinate with agencies, hospitals, and tax bodies." },
    { icon: <Sparkles className="h-5 w-5" />, t: "You save", d: "Pay only from realized savings. No surprises." },
  ];
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">How it works</p>
          <h2 className="font-serif text-3xl text-slate-900">Simple, secure, effective</h2>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={i} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">{s.icon}</div>
              <p className="font-medium text-slate-900">{i + 1}. {s.t}</p>
              <p className="mt-2 text-sm text-slate-600">{s.d}</p>
            </li>
          ))}
        </ol>

        {/* Industries we help */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <Building className="h-5 w-5" />, title: "Homeowners & HOAs", text: "Primary residences, second homes, investment properties." },
            { icon: <Building2 className="h-5 w-5" />, title: "Commercial Owners", text: "Retail, hospitality, healthcare, industrial & office." },
            { icon: <Handshake className="h-5 w-5" />, title: "Startups & SMBs", text: "Cash-flow friendly fee model aligned to savings." },
          ].map((b, i) => (
            <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">{b.icon}</div>
              <p className="font-medium text-slate-900">{b.title}</p>
              <p className="mt-2 text-sm text-slate-600">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================= TEAM (snapshot) ========================= */
function Team() {
  const people = [
    { name: "Alexandra Brooks, Esq.", role: "Managing Partner", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" },
    { name: "Jordan Lee", role: "Senior Case Analyst", img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=800&auto=format&fit=crop" },
    { name: "Samir Patel", role: "Negotiations Lead", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop" },
  ];
  return (
    <section id="team" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">Meet your team</p>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Experienced. Precise. Human.</h2>
          <p className="mt-3 text-slate-600">A cross-functional crew of attorneys, analysts, and negotiators on your side.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p, i) => (
            <Card key={i} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative h-56 w-full"><Image src={p.img} alt={p.name} fill className="object-cover" /></div>
              <CardContent className="p-5">
                <p className="font-serif text-lg text-slate-900">{p.name}</p>
                <p className="text-sm text-slate-600">{p.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="rounded-full"><Link href="/contact">Talk to our team</Link></Button>
        </div>
      </div>
    </section>
  );
}

/* ========================= FAQ PREVIEW ========================= */
function FAQPreview() {
  const faqs = [
    { q: "Do I pay anything upfront?", a: "No. Our fee comes only from the savings we secure for you. If we don’t save you money, you owe us nothing." },
    { q: "How long does a typical case take?", a: "Most matters resolve in weeks, not months. Complex cases can take longer, but we keep you updated at every step." },
    { q: "Is my data secure?", a: "Yes. We operate with HIPAA/PCI-aware workflows, encrypted intake, and least-privilege access controls." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">Questions</p>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">FAQ</h2>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="overflow-hidden rounded-xl border bg-white">
                <button className="flex w-full items-center justify-between px-4 py-4 text-left" onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="font-medium text-slate-900">{f.q}</span>
                  {isOpen ? <Minus className="h-5 w-5 text-slate-500" /> : <Plus className="h-5 w-5 text-slate-500" />}
                </button>
                {isOpen && <div className="px-4 pb-4 text-slate-600">{f.a}</div>}
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Button asChild className="rounded-full"><Link href="/faq">See all FAQs</Link></Button>
        </div>
      </div>
    </section>
  );
}

/* ========================= CONTACT SNAPSHOT ========================= */
function Contact() {
  return (
    <section className="relative bg-white py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 md:grid-cols-2 md:px-6">
        <div>
          <p className="kicker text-indigo-600">Contact us</p>
          <h2 className="font-serif text-3xl text-slate-900">Have questions or ready to start saving?</h2>
          <p className="mt-3 text-slate-600">Reach out—no pressure, no upfront fees. Just honest guidance and real results.</p>

          <div className="mt-8 grid gap-4 text-slate-700">
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-indigo-600" /> (312) 488-9775</div>
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-indigo-600" /> info@cumberlandbrooks.com</div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-indigo-600" /> 752 S. 6th St., Ste. R, Las Vegas, NV 89101</div>
          </div>

          <div className="mt-6">
            <Button asChild className="rounded-full"><Link href="/contact">Open contact page</Link></Button>
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



/* ========================= STICKY CTA ========================= */
function StickyCTA({ onOpenBook }: { onOpenBook: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
      <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border bg-white/90 p-2 shadow-lg backdrop-blur">
        <div className="px-3 text-sm text-slate-700">No upfront fees. Average resolution in weeks.</div>
        <div className="flex items-center gap-2">
          <a href="tel:+13124889775" className="hidden rounded-full border px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 sm:block">
            <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4" /> (312) 488-9775</span>
          </a>
          <Button onClick={onOpenBook} className="rounded-full">Book Free Consultation</Button>
        </div>
      </div>
    </div>
  );
}

/* ========================= PAGE ========================= */
export default function Page() {
  const [drawer, setDrawer] = useState(false);
  const [prefill, setPrefill] = useState<{ name?: string; email?: string; address?: string; ptype?: "residential" | "commercial"; }>();

  useEffect(() => {
    const handler = (e: any) => { setPrefill(e.detail); setDrawer(true); };
    window.addEventListener("open-book" as any, handler);
    return () => window.removeEventListener("open-book" as any, handler);
  }, []);

  return (
    <main className="text-slate-800">
      <Hero onOpenBook={() => setDrawer(true)} />
      <PracticeAreas />
      <ResultsStrip />
      <Testimonials />
      <Process />
      <Team />
      <FAQPreview />
      <Contact />
      <StickyCTA onOpenBook={() => setDrawer(true)} />
      <BookDrawer open={drawer} onOpenChange={setDrawer} prefill={prefill} />
    </main>
  );
}
