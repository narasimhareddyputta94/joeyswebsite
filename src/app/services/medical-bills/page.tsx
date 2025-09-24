"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Pill,
  ClipboardList,
  Clock4,
  ArrowRight,
  Quote,
  Users2,
  Sparkles,
  Scale,
} from "lucide-react";

export default function MedicalBillsPage() {
  // --- your original content (preserved) ---
  const bullets = [
    "Line-item audit for duplicate & non-covered charges",
    "CPT/HCPCS code review and medical-necessity flags",
    "Provider & payer negotiations; charity/financial aid routing",
    "Balance reductions, payment plans, and lien resolution",
  ];
  const docs = [
    "Itemized statements & EOBs",
    "Insurance denial letters (if any)",
    "Medical records relevant to the claim",
    "Any prior payment/collection notices",
  ];
  const steps = [
    { t: "Free audit", d: "Upload statements securely. We flag errors and estimate reduction ranges." },
    { t: "Negotiate", d: "We contact billing and payers, escalate when needed, and secure offers in writing." },
    { t: "Resolve", d: "You approve terms. We confirm zero-balance or plan and you pay only from savings." },
  ];
  // --- end original content ---

  const outcomes = [
    { k: "30–60%+", t: "typical reductions on eligible files" },
    { k: "Weeks", t: "not months to resolve" },
    { k: "0 upfront", t: "you pay from savings" },
  ];

  const faqs = [
    {
      q: "Is this the same as debt settlement?",
      a: "No. We start with a coding/coverage audit and policy review, then negotiate based on evidence. When appropriate, we route charity/financial assistance and ensure written confirmations.",
    },
    {
      q: "Will this hurt my credit?",
      a: "Our goal is to prevent or repair negative reporting. We push for accurate updates and zero-balance confirmations where supported.",
    },
    {
      q: "Can you help with insurance denials?",
      a: "Yes. We review plan documents, medical necessity language, and appeal rights to pursue a better outcome.",
    },
    {
      q: "How are fees structured?",
      a: "No upfront fees. Our fee is success-based and paid from realized savings. If we don’t save you money, you owe nothing.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="text-slate-800">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1600&auto=format&fit=crop"
            alt="Hospital"
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
              HIPAA-aware • Encrypted intake • Results-first fees
            </div>
            <h1 className="mt-4 font-serif text-4xl text-slate-900 md:text-5xl">
              Stop overcharges. Get fair healthcare bills.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-700">
              We audit statements, fight coding errors, and negotiate real reductions—often 30–60%+. No pressure, clear outcomes.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/contact">
                  Free bill audit <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
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
          </div>

          {/* What we do (kept, restyled) */}
          <div className="md:col-span-5">
            <Card className="border-indigo-100 bg-white/85 backdrop-blur transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Stethoscope />
                </div>
                <p className="font-medium text-slate-900">What we do</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-slate-500">You approve every move. We confirm outcomes in writing.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* credibility strip */}
        <div className="border-t bg-white/80 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-3 text-sm text-slate-700 sm:grid-cols-3 md:px-6">
            <Cred h="Evidence-led" d="Coding & policy citations, not guesswork." />
            <Cred h="Fair & humane" d="Plans that protect care and stability." />
            <Cred h="Cost-controlled" d="Pay from savings, not up front." />
          </div>
        </div>
      </section>

      {/* ================= PROCESS (your original steps, upgraded) ================= */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker text-indigo-600">How it works</p>
            <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">A simple 3-step path to relief</h2>
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

          {/* What to upload + Typical outcomes (your originals, kept) */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="flex items-center gap-2 font-medium text-slate-900">
                  <ClipboardList className="h-5 w-5 text-indigo-600" /> What to upload
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
                  <FileText className="h-5 w-5 text-indigo-600" /> Typical outcomes
                </p>
                <p className="mt-2 text-slate-700">
                  Coding fixes, charity-care routing, interest/fee waivers, and realistic plans that preserve credit profiles.
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <Pill className="h-4 w-4" /> We never ask you to skip critical care.
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <Clock4 className="h-4 w-4" /> Many files resolve in weeks.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* testimonials */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Testimonial
              quote="They cut my hospital bill by more than half and got collections to close the file. Clear updates the whole way."
              by="Patient, post-surgery billing"
            />
            <Testimonial
              quote="Insurance denied imaging; they appealed and negotiated a fair rate. I could finally breathe."
              by="Parent, pediatric care"
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">Start my audit</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">Try the estimator</Link>
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
              <h3 className="mt-1 font-serif text-3xl">Turn confusing bills into clear savings.</h3>
              <p className="mt-2 max-w-2xl text-slate-200">
                We’ll show you the errors, explain your options, and negotiate written reductions. No upfront fees—ever.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="flex flex-col gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/contact">Free bill audit</Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-full bg-white text-slate-900 hover:bg-slate-100"
                >
                  <Link href="/results">See results</Link>
                </Button>
                <p className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-300">
                  <Users2 className="h-4 w-4" /> Thousands of line items reviewed
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
          If your case isn’t a fit for reductions, we’ll say so and point you to better options—no pressure.
        </p>
      </div>
    </div>
  );
}
