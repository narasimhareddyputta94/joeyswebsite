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
  Users2,
  Handshake,
  Scale,
  Quote,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function MediationServicePage() {
  const TITLE = "Mediation & Dispute Resolution";
  const SUB = "Neutral facilitation to resolve conflicts without costly litigation.";

  // --- your original content ---
  const bullets = [
    "Business partner disputes",
    "Landlord–tenant conflicts",
    "Employment & workplace mediation",
    "Family & community matters",
  ];
  const deliverables = [
    "Neutral mediator guidance",
    "Confidential sessions",
    "Written settlement agreements",
  ];
  const steps = [
    { t: "Intake", d: "We listen to each side’s perspective." },
    { t: "Session", d: "We facilitate structured dialogue and negotiation." },
    { t: "Agreement", d: "We draft clear, binding resolution documents." },
  ];
  // --- end original content ---

  const outcomes = [
    { k: "1–2 sessions", t: "typical resolution" },
    { k: "90%+", t: "agreements reached (eligible matters)" },
    { k: "Days", t: "not months to close" },
  ];

  const useCases = [
    { h: "Co-founder or partner friction", d: "Equity splits, role clarity, and future decision rights that prevent repeat flare-ups." },
    { h: "Commercial contract fallouts", d: "Scope, timeline, and payment compromises that keep the relationship workable." },
    { h: "Housing & rental issues", d: "Repairs, deposits, and realistic timelines with written commitments." },
    { h: "Workplace disagreements", d: "Behavioral standards and restorative frameworks to move forward." },
  ];

  const faqs = [
    {
      q: "Is mediation legally binding?",
      a: "Yes—when parties sign a written settlement agreement. We draft clear, enforceable terms everyone understands.",
    },
    {
      q: "Do both sides have to agree to mediation?",
      a: "Mediation is voluntary, but we often help invite the other party with a neutral, low-pressure outreach.",
    },
    {
      q: "How long does it take?",
      a: "Most matters resolve in one or two sessions scheduled within days. Complex disputes may require follow-ups.",
    },
    {
      q: "Will what I say be confidential?",
      a: "Yes. We confirm confidentiality, outline privilege limits, and protect sensitive information throughout.",
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
              Resolve faster. Spend less. Preserve relationships.
            </div>
            <h1 className="mt-4 font-serif text-4xl text-slate-900 md:text-5xl">{TITLE}</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-700">{SUB}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/contact">
                  Talk to a mediator <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/results">See results</Link>
              </Button>
            </div>

            <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4" /> Confidentiality confirmed before any session begins.
            </p>

            {/* trust stats */}
            <div className="mt-6 grid max-w-xl grid-cols-3 gap-4">
              {outcomes.map((o) => (
                <Stat key={o.t} k={o.k} t={o.t} />
              ))}
            </div>
          </div>

          {/* quick value card */}
          <div className="md:col-span-5">
            <Card className="border-indigo-100 shadow-sm">
              <CardContent className="p-6">
                <p className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Where we help most
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
            <Cred h="Neutral & structured" d="Tight agendas, time-boxed issues, written outcomes." />
            <Cred h="Fair & practical" d="We aim for durable terms both sides can actually follow." />
            <Cred h="Cost-controlled" d="Pay a mediator, not months of litigation." />
          </div>
        </div>
      </section>

      {/* ============== VALUE & DELIVERABLES ============== */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="font-medium text-slate-900">What you get</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {deliverables.map((d, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <Clock4 className="h-4 w-4" /> Most mediations resolve in 1–2 sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="font-medium text-slate-900">Common scenarios we resolve</p>
                <div className="mt-3 grid gap-3">
                  {useCases.map((u, i) => (
                    <div key={i} className="rounded-lg border bg-white px-3 py-3">
                      <p className="font-medium text-slate-900">{u.h}</p>
                      <p className="mt-1 text-sm text-slate-700">{u.d}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* process (kept from your original, visually upgraded) */}
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

          {/* testimonials slice */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Testimonial
              quote="They helped us find middle ground in one afternoon after months of stalemate."
              by="COO, manufacturing"
            />
            <Testimonial
              quote="Clear ground rules and a written agreement the same day—huge relief."
              by="Tenant–landlord mediation"
            />
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

      {/* ============== FAQ ============== */}
      <section className="bg-white pb-16 pt-10">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl text-slate-900">Frequently asked</h2>
            <p className="mt-2 text-slate-600">Short answers so you can move quickly.</p>
          </div>

          <FAQ faqs={faqs} open={open} setOpen={setOpen} />
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
              <h3 className="mt-1 font-serif text-3xl">Resolve it—fairly, quickly, and privately.</h3>
              <p className="mt-2 max-w-2xl text-slate-200">
                We set the agenda, keep emotions in check, and get to signed commitments—so everyone can move forward.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="flex flex-col gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/contact">Talk to a mediator</Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-full bg-white text-slate-900 hover:bg-slate-100"
                >
                  <Link href="/results">See results</Link>
                </Button>
                <p className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-300">
                  <Users2 className="h-4 w-4" /> Hundreds of parties reconciled without litigation
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
          If the dispute looks unsuitable for mediation, we’ll say so and suggest alternatives—no pressure.
        </p>
      </div>
    </div>
  );
}
