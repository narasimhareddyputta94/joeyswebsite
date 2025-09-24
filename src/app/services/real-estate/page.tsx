"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Scale,
  CheckCircle2,
  FileSpreadsheet,
  Building2,
  ShieldCheck,
  Clock4,
  MapPin,
  ArrowRight,
  Quote,
  Users2,
  Sparkles,
} from "lucide-react";

export default function PropertyTaxPage() {
  // --- your original content (preserved) ---
  const bullets = [
    "Market comps & ratio analysis (residential + commercial)",
    "Assessment-to-value audit and error spotting",
    "Appeal filings, hearings, assessor negotiations",
    "Evidence packets: photos, permits, income & vacancy (CRE)",
    "Contingency pricing available (pay from savings)",
  ];

  const docs = [
    "Assessment notice / current tax bill",
    "Any prior appeals or reductions",
    "Recent appraisal or broker opinion (if any)",
    "Rent roll / T-12 / NOI (for commercial)",
    "Photos, permits, insurance claims (if applicable)",
  ];

  const steps = [
    { t: "Free review", d: "You share address and tax docs. We model target valuation and win odds." },
    { t: "File & advocate", d: "We prepare evidence and represent you with the assessor/board." },
    { t: "Decision & savings", d: "On success, your bill drops. Our fee comes from realized savings." },
  ];
  // --- end original content ---

  const outcomes = [
    { k: "5–25%+", t: "typical assessment reduction (eligible files)" },
    { k: "One season", t: "common timeline to decision" },
    { k: "0 upfront", t: "pay from realized savings" },
  ];

  const faqs = [
    {
      q: "Do you handle both residential and commercial?",
      a: "Yes. We prepare market comps for homes and income/expense models for CRE (NOI, vacancy, cap rates) to support valuation arguments.",
    },
    {
      q: "What if I appealed last year?",
      a: "Prior appeals don’t prevent a new one if there’s valuation support or material changes. Send us your last outcome—we’ll advise quickly.",
    },
    {
      q: "How do fees work?",
      a: "Most files are contingency: if we don’t reduce your bill, you don’t pay us. If we win, fees come from the savings—not upfront.",
    },
    {
      q: "Will this affect escrow or mortgage?",
      a: "If your taxes are escrowed, your servicer typically adjusts after the county updates the assessment. We provide documentation you can share.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="text-slate-800">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b?q=80&w=1600&auto=format&fit=crop"
            alt="City skyline"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_-10%,rgba(59,130,246,.25),transparent)]" />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-14 pt-24 md:grid-cols-12 md:px-6">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-600/20">
              <ShieldCheck className="h-4 w-4" />
              Evidence-led appeals • Success-based pricing
            </div>
            <p className="kicker mt-3 text-indigo-600">Property Tax Appeals</p>
            <h1 className="font-serif text-4xl text-slate-900 md:text-5xl">Lower your assessed value. Keep more cash.</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-700">
              We build valuation evidence and handle filings and hearings for homeowners and commercial owners.
              Most matters are success-based—if you don’t save, you don’t pay.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/contact">Book free consult <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/results">See results</Link>
              </Button>
            </div>

            {/* quick stats */}
            <div className="mt-6 grid max-w-xl grid-cols-3 gap-4">
              {outcomes.map((o) => (
                <Stat key={o.t} k={o.k} t={o.t} />
              ))}
            </div>

            <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4" /> Least-privilege data access • Clear written authorizations
            </p>
          </div>

          {/* What we do (your original list, kept) */}
          <div className="md:col-span-5">
            <Card className="border-indigo-100 bg-white/85 backdrop-blur transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Scale />
                </div>
                <p className="font-medium text-slate-900">What we do</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /> {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* credibility strip */}
        <div className="border-t bg-white/80 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-3 text-sm text-slate-700 sm:grid-cols-3 md:px-6">
            <Cred h="Market-grounded" d="Sales comps, cost and income approaches." />
            <Cred h="Hearing-ready" d="Tight packets that withstand scrutiny." />
            <Cred h="Cost-controlled" d="Contingency fee where available." />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (your steps, upgraded) ================= */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker text-indigo-600">How it works</p>
            <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">A clean 3-step path to savings</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Card key={i} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-500">Step {i + 1}</p>
                  <p className="mt-1 font-serif text-xl text-slate-900">{s.t}</p>
                  <p className="mt-2 text-slate-700">{s.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Docs + Timelines (your originals, kept) */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="flex items-center gap-2 font-medium text-slate-900">
                  <FileSpreadsheet className="h-5 w-5 text-indigo-600" /> What we’ll ask for
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {docs.map((d, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="flex items-center gap-2 font-medium text-slate-900">
                  <Building2 className="h-5 w-5 text-indigo-600" /> Typical timelines
                </p>
                <p className="mt-2 text-slate-700">
                  Most appeals resolve in one season. Commercial parcels with board hearings may take longer.
                  We keep you updated at every milestone.
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <Clock4 className="h-4 w-4" /> Fast-track available where deadlines allow.
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" /> Coverage across multiple U.S. markets.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* testimonials */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Testimonial
              quote="They secured a meaningful reduction on our mixed-use building using an income approach that the assessor accepted. Clear packets, smooth hearing."
              by="Commercial owner, downtown district"
            />
            <Testimonial
              quote="We thought our home was fairly assessed—turns out comps supported a 12% cut. The team handled everything; our escrow dropped."
              by="Homeowner, suburban market"
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">Start my appeal</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">Try the savings estimator</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-gradient-to-b from-white to-slate-50 pb-16 pt-10">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl text-slate-900">Frequently asked</h2>
            <p className="mt-2 text-slate-600">Short answers so you can move quickly.</p>
          </div>
          <FAQ faqs={faqs} open={open} setOpen={setOpen} />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative isolate overflow-hidden bg-slate-900 py-14 text-slate-100">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(60% 60% at 50% 0%, #4f46e5, transparent)" }}
        />
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-indigo-300">Ready when you are</p>
              <h3 className="mt-1 font-serif text-3xl">Let’s bring your taxes back to market reality.</h3>
              <p className="mt-2 max-w-2xl text-slate-200">
                We’ll model the valuation, file the appeal, and argue the packet. No upfront fees—just results.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="flex flex-col gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/contact">Book free consult</Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-full bg-white text-slate-900 hover:bg-slate-100"
                >
                  <Link href="/results">See results</Link>
                </Button>
                <p className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-300">
                  <Users2 className="h-4 w-4" /> Thousands of parcels reviewed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============ helpers ============ */
function Stat({ k, t }: { k: string; t: string }) {
  return (
    <div className="rounded-xl border bg-white p-3 text-center shadow-sm">
      <p className="text-xl font-semibold text-slate-900">{k}</p>
      <p className="text-xs text-slate-600">{t}</p>
    </div>
  );
}

function Cred({ h, d }: { h: string; d: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-white px-4 py-3">
      <Scale className="mt-0.5 h-4 w-4 text-indigo-600" />
      <div>
        <p className="font-medium text-slate-900">{h}</p>
        <p className="text-sm text-slate-600">{d}</p>
      </div>
    </div>
  );
}

function Testimonial({ quote, by }: { quote: string; by: string }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="relative p-6">
        <Quote className="absolute -left-2 -top-2 h-10 w-10 rotate-12 text-indigo-200" />
        <p className="text-slate-800">{quote}</p>
        <p className="mt-3 text-sm font-medium text-slate-900">{by}</p>
      </CardContent>
    </Card>
  );
}

function FAQ({
  faqs,
  open,
  setOpen,
}: {
  faqs: { q: string; a: string }[];
  open: number | null;
  setOpen: (v: number | null) => void;
}) {
  return (
    <div className="mt-8 space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="overflow-hidden rounded-xl border bg-white">
            <button
              className="flex w-full items-center justify-between px-4 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-medium text-slate-900">{f.q}</span>
              <span className="text-slate-500">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && <div className="px-4 pb-4 text-slate-700">{f.a}</div>}
          </div>
        );
      })}
      <div className="mx-auto mt-6 max-w-xl rounded-xl border bg-slate-50 p-4 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          If the valuation case isn’t there, we’ll say so—no pressure, just clear guidance.
        </p>
      </div>
    </div>
  );
}
