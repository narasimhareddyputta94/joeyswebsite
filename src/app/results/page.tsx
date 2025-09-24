"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Timer,
  BarChart3,
  FileSearch,
  Scale,
  Gavel,
  Building2,
  Hospital,
  Home,
  BadgeCheck,
  Trophy,
  Star,
  ChevronRight,
} from "lucide-react";

type Case = {
  amount: string;
  title: string;
  text: string;
  tag: "Medical" | "Commercial" | "Residential" | "Collections";
  icon: JSX.Element;
  details?: string;
};

const CASES: Case[] = [
  {
    amount: "$88,400",
    title: "Hospital overbilling reversed",
    text: "Duplicate CPT entries and out-of-network miscoding eliminated.",
    tag: "Medical",
    icon: <Hospital className="h-4 w-4" />,
    details: "Chargemaster audit, payer policy memo, & clinical review letter.",
  },
  {
    amount: "$41,200",
    title: "Commercial property tax win",
    text: "Income approach comps proved over-assessment vs market.",
    tag: "Commercial",
    icon: <Building2 className="h-4 w-4" />,
    details: "Vacancy, EGI, and cap-rate adjustments sustained at hearing.",
  },
  {
    amount: "$26,300",
    title: "Residential appeal success",
    text: "Sales comps & condition adjustments cut assessment by 18%.",
    tag: "Residential",
    icon: <Home className="h-4 w-4" />,
    details: "Deferred maintenance photos + cost-to-cure estimate accepted.",
  },
  {
    amount: "$9,900",
    title: "Collections fees removed",
    text: "Validation request exposed fee stacking and aging errors.",
    tag: "Collections",
    icon: <Gavel className="h-4 w-4" />,
    details: "FDCPA validation + itemization variance → balance reissued.",
  },
  {
    amount: "$15,600",
    title: "Hospital overcharge reversal",
    text: "Clinical coding memo—provider concession after appeal.",
    tag: "Medical",
    icon: <Hospital className="h-4 w-4" />,
    details: "DRG mismatch and unbundled line items reconciled.",
  },
  {
    amount: "$32,750",
    title: "Retail center assessment cut",
    text: "Board accepted NOI & market vacancy adjustments.",
    tag: "Commercial",
    icon: <Building2 className="h-4 w-4" />,
    details: "Stabilized expenses & cap-rate comps moved final value.",
  },
];

const TAGS = ["All", "Medical", "Commercial", "Residential", "Collections"] as const;

const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function ResultsPage() {
  const [active, setActive] = useState<(typeof TAGS)[number]>("All");

  // Navbar “Book” behavior → open Calendly directly on this page
  const onOpenBook = () => {
    if (typeof window !== "undefined") {
      window.open("https://calendly.com/narasimhareddyputta999/15min", "_blank", "noopener,noreferrer");
    }
  };

  const filtered = useMemo(() => {
    if (active === "All") return CASES;
    return CASES.filter((c) => c.tag === active);
  }, [active]);

  // subtle entrance
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <main className="bg-gradient-to-b from-white to-slate-50 text-slate-800">

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(79,70,229,0.18),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            <motion.p variants={fadeIn} className="text-indigo-600">Results</motion.p>
            <motion.h1 variants={fadeIn} className="mt-2 font-serif text-4xl text-slate-900 md:text-5xl">
              Wins our clients can <span className="underline decoration-indigo-300 underline-offset-8">feel</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="mt-3 max-w-2xl text-lg text-slate-700">
              We focus on measurable outcomes—lower balances, reduced assessments, and clarity. Below is a sample of recent matters across practice areas.
            </motion.p>
            <motion.div variants={fadeIn} className="mt-6 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    active === t
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* KPI STRIP */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-indigo-100">
              <CardContent className="flex items-center gap-3 p-5">
                <Trophy className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-2xl font-semibold text-slate-900">10k+</p>
                  <p className="text-sm text-slate-600">Billed cases reviewed</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-indigo-100">
              <CardContent className="flex items-center gap-3 p-5">
                <Timer className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-2xl font-semibold text-slate-900">Weeks</p>
                  <p className="text-sm text-slate-600">Typical resolution timeline</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-indigo-100">
              <CardContent className="flex items-center gap-3 p-5">
                <ShieldCheck className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-2xl font-semibold text-slate-900">No upfront</p>
                  <p className="text-sm text-slate-600">You pay from realized savings</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CASE GRID */}
      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
              <Card className="group overflow-hidden border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> {c.amount}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
                      {c.icon} {c.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-xl text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{c.text}</p>
                  {c.details && <p className="mt-2 text-xs text-slate-500">{c.details}</p>}

                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-600">
                    <div className="rounded-lg border bg-slate-50 p-2">
                      <div className="flex items-center gap-1"><FileSearch className="h-4 w-4 text-indigo-600" /><span>Audit</span></div>
                      <p className="mt-1">Records & evidence</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-2">
                      <div className="flex items-center gap-1"><BarChart3 className="h-4 w-4 text-indigo-600" /><span>Analysis</span></div>
                      <p className="mt-1">Valuation / coding</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-2">
                      <div className="flex items-center gap-1"><Scale className="h-4 w-4 text-indigo-600" /><span>Outcome</span></div>
                      <p className="mt-1">Reduced liability</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* METHOD & PROOF */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-indigo-600"><Sparkles className="h-5 w-5" /><p className="font-medium">Our method</p></div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm text-slate-700">
                <div className="rounded-xl border bg-white p-4">
                  <p className="font-semibold text-slate-900">1) Evidence-first</p>
                  <p className="mt-1">Chargemaster/coding audits, comps, NOI models, chain-of-custody docs.</p>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <p className="font-semibold text-slate-900">2) Negotiation</p>
                  <p className="mt-1">Provider & board advocacy with clear remedy & reasonableness anchors.</p>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <p className="font-semibold text-slate-900">3) Resolution</p>
                  <p className="mt-1">You pay from savings; we close the loop with final statements.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-indigo-600"><BadgeCheck className="h-5 w-5" /><p className="font-medium">Why clients choose us</p></div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> No upfront fees</li>
                <li className="flex items-center gap-2"><Timer className="h-4 w-4 text-emerald-600" /> Typical results in weeks</li>
                <li className="flex items-center gap-2"><Scale className="h-4 w-4 text-emerald-600" /> Transparent, ethical advocacy</li>
              </ul>
              <div className="mt-4">
                <Button asChild className="w-full rounded-full">
                  <Link href="/services">Explore services</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TESTIMONIAL SNIPPET */}
        <div className="mt-12 rounded-2xl border bg-white/70 p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "R.M., Chicago", text: "They reduced my hospital bill by more than half and explained every step." },
              { name: "K.S., Henderson", text: "Our property tax appeal saved us tens of thousands. Professional, fast." },
              { name: "J.L., Las Vegas", text: "Collections errors removed and my score bounced back. Wish I called sooner." },
            ].map((q, i) => (
              <div key={i} className="rounded-xl border bg-white p-5">
                <div className="mb-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700">{q.text}</p>
                <p className="mt-3 text-sm font-medium text-slate-900">{q.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-slate-900 p-6 text-slate-100 sm:flex-row">
          <div>
            <p className="font-serif text-2xl">Want similar results?</p>
            <p className="mt-1 text-slate-300">Start with a free, no-pressure consultation. You only pay when we save you money.</p>
          </div>
          <div className="flex gap-2">
            <Button className="rounded-full" onClick={onOpenBook}>
              Book Free Consultation <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button asChild variant="secondary" className="rounded-full bg-white text-slate-900 hover:bg-slate-100">
              <Link href="/contact">Talk to a lawyer</Link>
            </Button>
          </div>
        </div>
      </section>

      
    </main>
  );
}
