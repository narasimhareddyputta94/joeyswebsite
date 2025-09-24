"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Gavel,
  CheckCircle2,
  ShieldAlert,
  FileWarning,
  Scale,
  Clock4,
  ShieldCheck,
  FileText,
  MessageSquare,
  Ban,
  Users2,
  ArrowRight,
} from "lucide-react";

export default function CollectionsPage() {
  const bullets = [
    "Validate debt and dispute inaccurate reporting",
    "Stop fee stacking and unlawful collection conduct",
    "Negotiate lump-sum or structured settlements",
    "Coordinate deletions/updates with furnishers",
  ];

  const docs = [
    "Collection letters, emails, call logs",
    "Your account statements/contracts (if available)",
    "Any disputes you already sent",
    "Credit report screenshots (if affected)",
  ];

  const steps = [
    { t: "Triage & strategy", d: "We assess liability, SOL, and leverage. You get options before you spend a dime." },
    { t: "Assert rights", d: "We send validation/dispute notices and negotiate from a position of law and evidence." },
    { t: "Resolve & repair", d: "Written terms, fair numbers, and accurate reporting—so you can move forward." },
  ];

  const faqs = [
    {
      q: "Will this hurt my credit?",
      a: "Our goal is the opposite—accurate reporting. If a collector can’t validate or misreported, we push for deletion or correction in writing.",
    },
    {
      q: "Do I have to speak to the collector?",
      a: "No. Once engaged, we handle the communication and formal notices so you don’t have to field calls.",
    },
    {
      q: "How long does this take?",
      a: "Many matters resolve in weeks; litigation varies by venue and facts. We set timelines up front and keep you posted weekly.",
    },
    {
      q: "What are the fees?",
      a: "Clear flat-fee options for disputes/settlements; transparent litigation budgets if needed. No surprise invoices.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="text-slate-800">
      {/* ============== HERO ============== */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop"
            alt="Gavel"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_-10%,rgba(59,130,246,.25),transparent)]" />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        {/* trust ribbon below navbar */}
        <div className="border-b bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2 text-xs text-slate-600 md:px-6">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> No upfront pressure
            </span>
            <span className="inline-flex items-center gap-1">
              <FileText className="h-4 w-4 text-indigo-600" /> Written terms on every deal
            </span>
            <span className="hidden items-center gap-1 sm:inline-flex">
              <Ban className="h-4 w-4 text-rose-600" /> We stop unlawful calls & fee stacking
            </span>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-14 pt-20 md:grid-cols-2 md:px-6">
          <div>
            <p className="kicker text-indigo-600">Debt & Collections Defense</p>
            <h1 className="font-serif text-4xl text-slate-900 md:text-5xl">
              Clamp down on collectors. Fix the record.
            </h1>
            <p className="mt-4 text-slate-700">
              We challenge unlawful practices, negotiate realistic outcomes, and guide credit corrections—so
              you can move forward with confidence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/contact">
                  Free case review <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/results">See results</Link>
              </Button>
            </div>
            <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <ShieldAlert className="h-4 w-4" /> Compliance-driven, ethics-first negotiations
            </p>

            {/* quick stats */}
            <div className="mt-6 grid max-w-xl grid-cols-3 gap-4">
              <Stat k="3–8 wks" t="typical resolution window" />
              <Stat k="74%" t="avg. settlement/reduction*" />
              <Stat k="100%" t="written terms provided" />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              *Illustrative across recent non-litigated matters; outcomes vary by facts and law.
            </p>
          </div>

          <div className="rounded-2xl border bg-white/85 p-6 shadow-sm backdrop-blur">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Gavel />
            </div>
            <p className="font-medium text-slate-900">What we do</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============== PROCESS + CHECKLIST ============== */}
      <section className="bg-white py-14 md:py-16">
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

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="flex items-center gap-2 font-medium text-slate-900">
                  <FileWarning className="h-5 w-5 text-indigo-600" /> Bring these
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {docs.map((d, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="flex items-center gap-2 font-medium text-slate-900">
                  <Scale className="h-5 w-5 text-indigo-600" /> Outcomes & timelines
                </p>
                <p className="mt-2 text-slate-700">
                  Many matters resolve in weeks. Lawsuit defense timelines vary; we set expectations early and
                  keep spend disciplined.
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <Clock4 className="h-4 w-4" /> We pursue deletions/corrections when supported by law and
                  evidence.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">Start my review</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">Try the estimator</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============== CREDIBILITY STRIP ============== */}
      <section className="border-y bg-slate-50 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 md:px-6">
          <Cred icon={<MessageSquare className="h-5 w-5" />} h="We handle the calls"
            d="You won’t have to argue on the phone—formal notices and negotiation in writing." />
          <Cred icon={<FileText className="h-5 w-5" />} h="Paper trail that protects you"
            d="Every settlement or correction is documented and preserved." />
          <Cred icon={<Users2 className="h-5 w-5" />} h="Updates you can trust"
            d="Weekly status notes, clear next steps, and no surprises." />
        </div>
      </section>

      {/* ============== MINI CASE STUDY ============== */}
      <section className="bg-white py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <Card className="overflow-hidden">
            <CardContent className="grid gap-8 p-6 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">Case study</p>
                <h3 className="mt-1 font-serif text-2xl text-slate-900">
                  $9,900 in stacked fees removed; entry corrected
                </h3>
                <p className="mt-2 text-slate-700">
                  Client faced aggressive collection activity and a tradeline that didn’t match the ledger.
                  Validation showed fee stacking and aging errors. We negotiated a realistic settlement and
                  secured a correction to the credit file.
                </p>
              </div>
              <div className="md:col-span-5">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Aggressive calls stopped within 48 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Settlement letter + deletion request on file
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Post-resolution credit monitoring guidance
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

      {/* ============== FAQ ============== */}
      <section className="bg-gradient-to-b from-white to-slate-50 pb-16 pt-10">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl text-slate-900">Frequently asked</h2>
            <p className="mt-2 text-slate-600">Clear answers to help you decide faster.</p>
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
              <Link href="/contact">Start your free review</Link>
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
              <h3 className="mt-1 font-serif text-3xl">
                Let’s stop the noise and fix the numbers—properly.
              </h3>
              <p className="mt-2 max-w-2xl text-slate-200">
                Get a pressure-free review. We’ll map options, costs, and timelines—so you can pick the path that makes sense.
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
                  <Link href="/results">See Results</Link>
                </Button>
                <p className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="h-4 w-4" /> Written terms & weekly updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ----------------- tiny helpers ----------------- */
function Stat({ k, t }: { k: string; t: string }) {
  return (
    <div className="rounded-xl border bg-white p-3 text-center shadow-sm">
      <p className="text-xl font-semibold text-slate-900">{k}</p>
      <p className="text-xs text-slate-600">{t}</p>
    </div>
  );
}

function Cred({ icon, h, d }: { icon: React.ReactNode; h: string; d: string }) {
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
