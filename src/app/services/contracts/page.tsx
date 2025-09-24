"use client";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckCircle2,
  Clock4,
  ShieldCheck,
  Handshake,
  FileSignature,
  Layers,
  Users2,
  ArrowRight,
} from "lucide-react";

export default function ContractsServicePage() {
  const TITLE = "Contracts & Commercial Agreements";
  const SUB = "Drafting and negotiating agreements that protect your interests—and close deals faster.";

  const bullets = [
    "Vendor & supplier agreements (MSAs, SOWs)",
    "Employment, contractor & equity docs",
    "Partnership, JV & distribution agreements",
    "NDAs, licenses & IP assignments",
  ];

  const deliverables = [
    "Plain-language drafts with fallback positions",
    "Negotiation strategy & redlines",
    "Compliance-focused, enforceable terms",
  ];

  const steps = [
    { t: "Consult", d: "We understand the deal, leverage, and risk tolerance." },
    { t: "Draft/Redline", d: "We prepare agreements or review others’ drafts." },
    { t: "Close", d: "You sign with confidence, knowing terms are fair." },
  ];

  const samples = [
    "Master Service Agreement (MSA) + SOW",
    "Mutual/One-way Non-Disclosure Agreement (NDA)",
    "Employment Offer + IP Assignment + PII",
    "Independent Contractor Agreement",
    "Reseller/Distribution Agreement",
    "Software License / SLA / DPA (awareness)",
    "Term Sheet & LOI",
  ];

  const faqs = [
    {
      q: "How fast can you turn a draft?",
      a: "Simple NDAs and short-form vendor agreements often turn in 1–3 business days. Complex MSAs or multi-document packs typically 5–7 business days.",
    },
    {
      q: "Will you negotiate directly with the other side?",
      a: "Yes. We can lead calls or work behind the scenes with your team, providing redlines, talk-tracks, and fallback positions.",
    },
    {
      q: "Do you offer fixed-fee scopes?",
      a: "Many engagements are flat-fee (per document or bundle). For ongoing support, monthly plans are available.",
    },
    {
      q: "Can you align contract language with compliance needs?",
      a: "Absolutely. We align with privacy, data-security, and operational realities so the contract is enforceable and practical.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="text-slate-800">
      {/* ============== HERO ============== */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-emerald-50" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-14 pt-20 md:grid-cols-12 md:px-6">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-600/20">
              <Handshake className="h-4 w-4" />
              Close with clarity—no hidden traps
            </div>
            <h1 className="mt-4 font-serif text-4xl text-slate-900 md:text-5xl">{TITLE}</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-700">{SUB}</p>

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

            <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4" />
              Conflicts are cleared and engagement letters issued before work begins.
            </p>

            {/* trust stats */}
            <div className="mt-6 grid max-w-xl grid-cols-3 gap-4">
              <Stat k="5–7 days" t="typical turnaround" />
              <Stat k="2–3 rounds" t="avg. redlines" />
              <Stat k="Plain-English" t="drafts + guidance" />
            </div>
          </div>

          {/* quick value card */}
          <div className="md:col-span-5">
            <Card className="border-indigo-100 shadow-sm">
              <CardContent className="p-6">
                <p className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  <FileSignature className="h-5 w-5 text-indigo-600" />
                  What we do
                </p>
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
          </div>
        </div>

        {/* credibility strip under hero */}
        <div className="border-t bg-white/80 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-3 text-sm text-slate-700 sm:grid-cols-3 md:px-6">
            <Cred h="Deal velocity" d="Tight redline loops matched to your timelines." />
            <Cred h="Risk balanced" d="Protection without blowing up the deal." />
            <Cred h="Operator-friendly" d="Readable terms your team can actually follow." />
          </div>
        </div>
      </section>

      {/* ============== VALUE & DELIVERABLES ============== */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="font-medium text-slate-900">Where we add value</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="font-medium text-slate-900">Deliverables & pricing</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {deliverables.map((d, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <Clock4 className="h-4 w-4" /> Typical turnaround 5–7 business days.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* sample catalog */}
          <div className="mt-10 rounded-2xl border bg-white p-6">
            <p className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <Layers className="h-5 w-5 text-indigo-600" />
              Common agreements we handle
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-700">
              {samples.map((x) => (
                <span key={x} className="rounded-full border bg-slate-50 px-3 py-1">
                  {x}
                </span>
              ))}
            </div>
          </div>

          {/* soft “packages” for guidance */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wide text-indigo-600">Start</p>
                <p className="mt-1 font-serif text-xl text-slate-900">NDA & Contractor Pack</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> NDA (mutual/1-way)</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Contractor + IP/PII</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> 1 redline round</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="ring-1 ring-indigo-200 transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wide text-indigo-600">Most Popular</p>
                <p className="mt-1 font-serif text-xl text-slate-900">MSA + SOW Bundle</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> MSA draft or review</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> SOW template + checklist</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> 2 redline rounds</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wide text-indigo-600">Scale</p>
                <p className="mt-1 font-serif text-xl text-slate-900">Deal Desk Support</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> On-call redlines</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Playbooks & fallback positions</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Direct counter-party negotiation</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">Book a free consultation</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/services">All services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============== PROCESS ============== */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
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
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="bg-gradient-to-b from-white to-slate-50 pb-16 pt-10">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl text-slate-900">Frequently asked</h2>
            <p className="mt-2 text-slate-600">Quick answers for fast-moving deals.</p>
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
              <Link href="/contact">Start your agreement</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="relative isolate overflow-hidden bg-slate-900 py-14 text-slate-100">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(60% 60% at 50% 0%, #4f46e5, transparent)" }}
        />
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-indigo-300">Ready when you are</p>
              <h3 className="mt-1 font-serif text-3xl">Close confidently. Protect your position.</h3>
              <p className="mt-2 max-w-2xl text-slate-200">
                We’ll map your leverage, draft in plain English, and negotiate to a fair middle—without stalling the deal.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="flex flex-col gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/contact">Book Free Consultation</Link>
                </Button>
                <Button asChild variant="secondary" className="rounded-full bg-white text-slate-900 hover:bg-slate-100">
                  <Link href="/results">See Results</Link>
                </Button>
                <p className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-300">
                  <Users2 className="h-4 w-4" /> Hundreds of contracts reviewed and negotiated
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------- helpers -------- */
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
      <div className="mt-0.5">
        <FileText className="h-4 w-4 text-indigo-600" />
      </div>
      <div>
        <p className="font-medium text-slate-900">{h}</p>
        <p className="text-sm text-slate-600">{d}</p>
      </div>
    </div>
  );
}
