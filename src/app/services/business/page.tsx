"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  CheckCircle2,
  Clock4,
  ShieldCheck,
  FileText,
  Users2,
  Handshake,
  Scale,
  ArrowRight,
  Building2,
} from "lucide-react";

export default function BusinessServicePage() {
  const TITLE = "Business & Startup Counsel";
  const SUB =
    "Practical, on-call counsel for formation, governance, contracts, and deals—built for speed without the surprises.";

  const bullets = [
    "Entity formation (LLC, Corp, Partnership)",
    "Operating agreements, board consents & resolutions",
    "Cap table hygiene and investor documentation",
    "Commercial contracts & vendor MSAs",
  ];

  const deliverables = [
    "Tailored playbooks & templates",
    "Redlines and negotiation support",
    "Flat-fee or subscription options",
  ];

  const steps = [
    { t: "Discovery", d: "You share goals and risk areas. We map priorities and scope." },
    { t: "Docs & negotiation", d: "We draft or redline, keeping business velocity in mind." },
    { t: "Ready to scale", d: "Clean governance and contracts that won’t block the next deal." },
  ];

  const faqs = [
    {
      q: "How do fees work?",
      a: "For routine docs and reviews we offer clear flat fees; for ongoing counsel we provide monthly subscriptions with defined SLAs. No surprise bills.",
    },
    {
      q: "Can you work alongside our existing counsel?",
      a: "Yes. We regularly coordinate with incumbent counsel—handling day-to-day commercial work while they focus on specialty matters.",
    },
    {
      q: "What’s the typical kickoff time?",
      a: "Most engagements start within a week. Urgent negotiations can begin sooner once conflicts are cleared and the engagement letter is signed.",
    },
    {
      q: "Do you support fundraising and investor diligence?",
      a: "Absolutely. We help prepare data rooms, tighten governance, and respond to investor counsel efficiently.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="text-slate-800">
      {/* ======= HERO ======= */}
      <section className="bg-gradient-to-b from-white to-slate-50 pb-10 pt-14 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Briefcase />
          </div>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-slate-900 md:text-5xl">
            {TITLE}
          </h1>
          <p className="mt-3 text-lg text-slate-700">{SUB}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <Link href="/contact">
                Talk to a lawyer <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/results">See results</Link>
            </Button>
          </div>

          <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4" />
            Conflicts are cleared and engagement letters issued before work begins.
          </p>

          {/* quick stats */}
          <div className="mt-8 grid gap-4 rounded-2xl border bg-white p-4 md:grid-cols-3">
            <Stat icon={<Users2 className="h-5 w-5" />} k="150+"
              t="founders & ops teams advised" />
            <Stat icon={<FileText className="h-5 w-5" />} k="1,200+"
              t="contracts drafted & redlined" />
            <Stat icon={<Clock4 className="h-5 w-5" />} k="~1 week"
              t="typical kickoff timeline" />
          </div>
        </div>
      </section>

      {/* ======= CORE VALUE / DELIVERABLES ======= */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <p className="font-medium text-slate-900">Where we add value</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="font-medium text-slate-900">Deliverables & pricing</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {deliverables.map((d, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <Clock4 className="h-4 w-4" /> Typical kickoff within a week.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <p className="text-sm text-slate-500">Step {i + 1}</p>
                  <p className="mt-1 font-serif text-xl text-slate-900">{s.t}</p>
                  <p className="mt-2 text-slate-700">{s.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ======= WHY US STRIP ======= */}
      <section className="border-y bg-slate-50 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 md:px-6">
          <Why icon={<Scale className="h-5 w-5" />} h="Pragmatic risk"
            d="We balance legal precision with business velocity—no boilerplate roadblocks." />
          <Why icon={<Handshake className="h-5 w-5" />} h="Negotiation muscle"
            d="Tight redlines, crisp positions, and practical fallback playbooks." />
          <Why icon={<Building2 className="h-5 w-5" />} h="Built to scale"
            d="Clean governance that won’t break under audits, diligence, or growth." />
        </div>
      </section>

      {/* ======= POPULAR PACKAGES ======= */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="mx-auto mb-6 max-w-2xl text-center">
            <h2 className="font-serif text-3xl text-slate-900">Popular engagement options</h2>
            <p className="mt-2 text-slate-600">
              Transparent scopes with flat-fee or subscription pricing.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Package
              title="Startup Essentials"
              points={["Formation docs", "Operating agreement", "Initial governance kit"]}
              foot="Best for new companies getting the foundation right."
            />
            <Package
              title="Deal Desk"
              points={["Commercial contract playbook", "Redlines & negotiations", "Turnaround SLAs"]}
              foot="Great for sales/vendor cycles that need velocity."
            />
            <Package
              title="Fractional GC"
              points={["Monthly advisory subscription", "Governance & policy upkeep", "Investor and board support"]}
              foot="Ongoing counsel without the full-time overhead."
            />
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">Book a free consultation</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/services">All services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ======= MINI CASE STUDY ======= */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <Card className="overflow-hidden">
            <CardContent className="grid gap-6 p-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-7">
                <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                  Case study
                </p>
                <h3 className="mt-1 font-serif text-2xl text-slate-900">
                  Contract playbook cut cycle times by 43%
                </h3>
                <p className="mt-2 text-slate-700">
                  A B2B SaaS startup struggled with slow vendor redlines and inconsistent
                  positions. We built a lean playbook, tightened fallback language, and handled
                  negotiations for the first 30 deals. Time-to-signature dropped from 21 to 12 days.
                </p>
              </div>
              <div className="md:col-span-5">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    30+ agreements closed in first quarter
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Standard positions accepted by 70% of counterparties
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Sales & procurement teams unblocked
                  </li>
                </ul>
                <Button asChild className="mt-4 w-full rounded-full">
                  <Link href="/results">See more wins</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ======= FAQ ======= */}
      <section className="bg-white pb-16 pt-10">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl text-slate-900">Frequently asked</h2>
            <p className="mt-2 text-slate-600">
              Straight answers to the things founders and ops teams ask most.
            </p>
          </div>

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
          </div>

          <div className="mt-8 flex justify-center">
            <Button asChild className="rounded-full px-6">
              <Link href="/contact">Get tailored recommendations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ======= FINAL CTA ======= */}
      <section className="relative isolate overflow-hidden bg-slate-900 py-14 text-slate-100">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(60% 60% at 50% 0%, #4f46e5, transparent)" }}
        />
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-indigo-300">Ready when you are</p>
              <h3 className="mt-1 font-serif text-3xl">
                Let’s get your governance tight and your deals across the line.
              </h3>
              <p className="mt-2 max-w-2xl text-slate-200">
                Start with a free consult—no pressure, no retainers. We’ll map a smart scope and
                give you clear next steps.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="flex flex-col gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/contact">Book Free Consultation</Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-full bg-white text-slate-900 hover:bg-slate-100"
                >
                  <Link href="/services">Explore Services</Link>
                </Button>
                <p className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="h-4 w-4" /> Conflicts cleared before any work begins
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- tiny helpers ---------- */
function Stat({ icon, k, t }: { icon: React.ReactNode; k: string; t: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-slate-50 p-3">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-700">
        {icon}
      </div>
      <div>
        <p className="text-xl font-semibold text-slate-900">{k}</p>
        <p className="text-xs text-slate-600">{t}</p>
      </div>
    </div>
  );
}

function Why({ icon, h, d }: { icon: React.ReactNode; h: string; d: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex items-center gap-2 text-slate-800">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          {icon}
        </div>
        <p className="font-medium">{h}</p>
      </div>
      <p className="mt-2 text-sm text-slate-600">{d}</p>
    </div>
  );
}

function Package({
  title,
  points,
  foot,
}: {
  title: string;
  points: string[];
  foot: string;
}) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col p-6">
        <p className="font-serif text-xl text-slate-900">{title}</p>
        <ul className="mt-3 flex-1 space-y-2 text-sm text-slate-700">
          {points.map((p, i) => (
            <li key={i} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-slate-500">{foot}</p>
      </CardContent>
    </Card>
  );
}
